import $ from '../../../../core/renderer';
import browser from '../../../../core/utils/browser';
// @ts-expect-error
import { deferUpdate, equalByValue, getKeyHash } from '../../../../core/utils/common';
// @ts-expect-error
import { Deferred, fromPromise, when } from '../../../../core/utils/deferred';
import { extend } from '../../../../core/utils/extend';
import { each } from '../../../../core/utils/iterator';
import { getOuterHeight, getOuterWidth, getWidth, setHeight } from '../../../../core/utils/size';
import { encodeHtml } from '../../../../core/utils/string';
import { isDefined, isEmptyObject, isObject } from '../../../../core/utils/type';
import { createObjectWithChanges } from '../../../../data/array_utils';
import eventsEngine from '../../../../events/core/events_engine';
import pointerEvents from '../../../../events/pointer';
import messageLocalization from '../../../../localization/message';
import Button from '../../../../ui/button';
import LoadIndicator from '../../../../ui/load_indicator';
import Overlay from '../../../../ui/overlay/ui.overlay';
import ValidationEngine from '../../../../ui/validation_engine';
import Validator from '../../../../ui/validator';
import { focused } from '../../../../ui/widget/selectors';
import errors from '../../../../ui/widget/ui.errors';
import { EDITORS_INPUT_SELECTOR } from '../editing/const';
import modules from '../m_modules';
import gridCoreUtils from '../m_utils';
var INVALIDATE_CLASS = 'invalid';
var REVERT_TOOLTIP_CLASS = 'revert-tooltip';
var INVALID_MESSAGE_CLASS = 'dx-invalid-message';
var INVALID_MESSAGE_ID = 'dxInvalidMessage';
var WIDGET_INVALID_MESSAGE_CLASS = 'invalid-message';
var INVALID_MESSAGE_ALWAYS_CLASS = 'dx-invalid-message-always';
var REVERT_BUTTON_CLASS = 'dx-revert-button';
var REVERT_BUTTON_ID = 'dxRevertButton';
var VALIDATOR_CLASS = 'validator';
var PENDING_INDICATOR_CLASS = 'dx-pending-indicator';
var VALIDATION_PENDING_CLASS = 'dx-validation-pending';
var CONTENT_CLASS = 'content';
var INSERT_INDEX = '__DX_INSERT_INDEX__';
var PADDING_BETWEEN_TOOLTIPS = 2;
var EDIT_MODE_ROW = 'row';
var EDIT_MODE_FORM = 'form';
var EDIT_MODE_BATCH = 'batch';
var EDIT_MODE_CELL = 'cell';
var EDIT_MODE_POPUP = 'popup';
var GROUP_CELL_CLASS = 'dx-group-cell';
var FORM_BASED_MODES = [EDIT_MODE_POPUP, EDIT_MODE_FORM];
var COMMAND_TRANSPARENT = 'transparent';
var VALIDATION_STATUS = {
  valid: 'valid',
  invalid: 'invalid',
  pending: 'pending'
};
var EDIT_DATA_INSERT_TYPE = 'insert';
var EDIT_DATA_REMOVE_TYPE = 'remove';
var VALIDATION_CANCELLED = 'cancel';
var validationResultIsValid = function validationResultIsValid(result) {
  return isDefined(result) && result !== VALIDATION_CANCELLED;
};
var cellValueShouldBeValidated = function cellValueShouldBeValidated(value, rowOptions) {
  return value !== undefined || value === undefined && rowOptions && !rowOptions.isNewRow;
};
var ValidatingController = modules.Controller.inherit(function () {
  return {
    init() {
      this._editingController = this.getController('editing');
      this.createAction('onRowValidating');
      if (!this._validationState) {
        this.initValidationState();
      }
    },
    initValidationState() {
      this._validationState = [];
      this._validationStateCache = {};
    },
    _rowIsValidated(change) {
      var validationData = this._getValidationData(change === null || change === void 0 ? void 0 : change.key);
      return !!validationData && !!validationData.validated;
    },
    _getValidationData(key, create) {
      var keyHash = getKeyHash(key);
      var isObjectKeyHash = isObject(keyHash);
      var validationData;
      if (isObjectKeyHash) {
        // eslint-disable-next-line prefer-destructuring
        validationData = this._validationState.filter(data => equalByValue(data.key, key))[0];
      } else {
        validationData = this._validationStateCache[keyHash];
      }
      if (!validationData && create) {
        validationData = {
          key,
          isValid: true
        };
        this._validationState.push(validationData);
        if (!isObjectKeyHash) {
          this._validationStateCache[keyHash] = validationData;
        }
      }
      return validationData;
    },
    _getBrokenRules(validationData, validationResults) {
      var brokenRules;
      if (validationResults) {
        brokenRules = validationResults.brokenRules || validationResults.brokenRule && [validationResults.brokenRule];
      } else {
        brokenRules = validationData.brokenRules || [];
      }
      return brokenRules;
    },
    _rowValidating(validationData, validationResults) {
      // @ts-expect-error
      var deferred = new Deferred();
      var change = this._editingController.getChangeByKey(validationData === null || validationData === void 0 ? void 0 : validationData.key);
      var brokenRules = this._getBrokenRules(validationData, validationResults);
      var isValid = validationResults ? validationResults.isValid : validationData.isValid;
      var parameters = {
        brokenRules,
        isValid,
        key: change.key,
        newData: change.data,
        oldData: this._editingController._getOldData(change.key),
        promise: null,
        errorText: this.getHiddenValidatorsErrorText(brokenRules)
      };
      this.executeAction('onRowValidating', parameters);
      when(fromPromise(parameters.promise)).always(() => {
        validationData.isValid = parameters.isValid;
        validationData.errorText = parameters.errorText;
        deferred.resolve(parameters);
      });
      return deferred.promise();
    },
    getHiddenValidatorsErrorText(brokenRules) {
      var brokenRulesMessages = [];
      each(brokenRules, (_, brokenRule) => {
        var {
          column
        } = brokenRule;
        var isGroupExpandColumn = column && column.groupIndex !== undefined && !column.showWhenGrouped;
        var isVisibleColumn = column && column.visible;
        if (!brokenRule.validator.$element().parent().length && (!isVisibleColumn || isGroupExpandColumn)) {
          brokenRulesMessages.push(brokenRule.message);
        }
      });
      return brokenRulesMessages.join(', ');
    },
    validate(isFull) {
      var isValid = true;
      var editingController = this._editingController;
      // @ts-expect-error
      var deferred = new Deferred();
      var completeList = [];
      var editMode = editingController.getEditMode();
      isFull = isFull || editMode === EDIT_MODE_ROW;
      if (this._isValidationInProgress) {
        return deferred.resolve(false).promise();
      }
      this._isValidationInProgress = true;
      if (isFull) {
        editingController.addDeferred(deferred);
        var changes = editingController.getChanges();
        each(changes, (index, _ref) => {
          var {
            type,
            key
          } = _ref;
          if (type !== 'remove') {
            var validationData = this._getValidationData(key, true);
            var validationResult = this.validateGroup(validationData);
            completeList.push(validationResult);
            validationResult.done(validationResult => {
              validationData.validated = true;
              isValid = isValid && validationResult.isValid;
            });
          }
        });
      } else if (this._currentCellValidator) {
        var validationResult = this.validateGroup(this._currentCellValidator._findGroup());
        completeList.push(validationResult);
        validationResult.done(validationResult => {
          isValid = validationResult.isValid;
        });
      }
      when(...completeList).done(() => {
        this._isValidationInProgress = false;
        deferred.resolve(isValid);
      });
      return deferred.promise();
    },
    validateGroup(validationData) {
      // @ts-expect-error
      var result = new Deferred();
      var validateGroup = validationData && ValidationEngine.getGroupConfig(validationData);
      var validationResult;
      if (validateGroup === null || validateGroup === void 0 ? void 0 : validateGroup.validators.length) {
        this.resetRowValidationResults(validationData);
        validationResult = ValidationEngine.validateGroup(validationData);
      }
      when((validationResult === null || validationResult === void 0 ? void 0 : validationResult.complete) || validationResult).done(validationResult => {
        when(this._rowValidating(validationData, validationResult)).done(result.resolve);
      });
      return result.promise();
    },
    isRowDataModified(change) {
      return !isEmptyObject(change.data);
    },
    updateValidationState(change) {
      var editMode = this._editingController.getEditMode();
      var {
        key
      } = change;
      var validationData = this._getValidationData(key, true);
      if (!FORM_BASED_MODES.includes(editMode)) {
        if (change.type === EDIT_DATA_INSERT_TYPE && !this.isRowDataModified(change)) {
          validationData.isValid = true;
          return;
        }
        this.setDisableApplyValidationResults(true);
        var groupConfig = ValidationEngine.getGroupConfig(validationData);
        if (groupConfig) {
          var validationResult = ValidationEngine.validateGroup(validationData);
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          when(validationResult.complete || validationResult).done(validationResult => {
            // @ts-expect-error
            validationData.isValid = validationResult.isValid;
            // @ts-expect-error
            validationData.brokenRules = validationResult.brokenRules;
          });
        } else if (!validationData.brokenRules || !validationData.brokenRules.length) {
          validationData.isValid = true;
        }
        this.setDisableApplyValidationResults(false);
      } else {
        validationData.isValid = true;
      }
    },
    setValidator(validator) {
      this._currentCellValidator = validator;
    },
    renderCellPendingIndicator($container) {
      var $indicator = $container.find(".".concat(PENDING_INDICATOR_CLASS));
      if (!$indicator.length) {
        var $indicatorContainer = $container;
        $indicator = $('<div>').appendTo($indicatorContainer).addClass(PENDING_INDICATOR_CLASS);
        this._createComponent($indicator, LoadIndicator);
        $container.addClass(VALIDATION_PENDING_CLASS);
      }
    },
    disposeCellPendingIndicator($container) {
      var $indicator = $container.find(".".concat(PENDING_INDICATOR_CLASS));
      if ($indicator.length) {
        var indicator = LoadIndicator.getInstance($indicator);
        if (indicator) {
          indicator.dispose();
          indicator.$element().remove();
        }
        $container.removeClass(VALIDATION_PENDING_CLASS);
      }
    },
    validationStatusChanged(result) {
      var {
        validator
      } = result;
      var validationGroup = validator.option('validationGroup');
      var {
        column
      } = validator.option('dataGetter')();
      this.updateCellValidationResult({
        rowKey: validationGroup.key,
        columnIndex: column.index,
        validationResult: result
      });
    },
    validatorInitialized(arg) {
      arg.component.on('validating', this.validationStatusChanged.bind(this));
      arg.component.on('validated', this.validationStatusChanged.bind(this));
    },
    validatorDisposing(arg) {
      var validator = arg.component;
      var validationGroup = validator.option('validationGroup');
      var {
        column
      } = validator.option('dataGetter')();
      var result = this.getCellValidationResult({
        rowKey: validationGroup === null || validationGroup === void 0 ? void 0 : validationGroup.key,
        columnIndex: column.index
      });
      if (validationResultIsValid(result) && result.status === VALIDATION_STATUS.pending) {
        this.cancelCellValidationResult({
          change: validationGroup,
          columnIndex: column.index
        });
      }
    },
    applyValidationResult($container, result) {
      var {
        validator
      } = result;
      var validationGroup = validator.option('validationGroup');
      var {
        column
      } = validator.option('dataGetter')();
      result.brokenRules && result.brokenRules.forEach(rule => {
        rule.columnIndex = column.index;
        rule.column = column;
      });
      if ($container) {
        var validationResult = this.getCellValidationResult({
          rowKey: validationGroup.key,
          columnIndex: column.index
        });
        var requestIsDisabled = validationResultIsValid(validationResult) && validationResult.disabledPendingId === result.id;
        if (this._disableApplyValidationResults || requestIsDisabled) {
          return;
        }
        if (result.status === VALIDATION_STATUS.invalid) {
          var $focus = $container.find(':focus');
          if (!focused($focus)) {
            // @ts-expect-error
            eventsEngine.trigger($focus, 'focus');
            // @ts-expect-error
            eventsEngine.trigger($focus, pointerEvents.down);
          }
        }
        var editor = !column.editCellTemplate && this.getController('editorFactory').getEditorInstance($container);
        if (result.status === VALIDATION_STATUS.pending) {
          if (editor) {
            editor.option('validationStatus', VALIDATION_STATUS.pending);
          } else {
            this.renderCellPendingIndicator($container);
          }
        } else if (editor) {
          editor.option('validationStatus', VALIDATION_STATUS.valid);
        } else {
          this.disposeCellPendingIndicator($container);
        }
        $container.toggleClass(this.addWidgetPrefix(INVALIDATE_CLASS), result.status === VALIDATION_STATUS.invalid);
      }
    },
    _syncInternalEditingData(parameters) {
      var _a;
      var editingController = this._editingController;
      var change = editingController.getChangeByKey(parameters.key);
      var oldDataFromState = editingController._getOldData(parameters.key);
      var oldData = (_a = parameters.row) === null || _a === void 0 ? void 0 : _a.oldData;
      if (change && oldData && !oldDataFromState) {
        editingController._addInternalData({
          key: parameters.key,
          oldData
        });
      }
    },
    createValidator(parameters, $container) {
      var _a, _b;
      var editingController = this._editingController;
      var {
        column
      } = parameters;
      var {
        showEditorAlways
      } = column;
      if (isDefined(column.command) || !column.validationRules || !Array.isArray(column.validationRules) || !column.validationRules.length) return;
      var editIndex = editingController.getIndexByKey(parameters.key, editingController.getChanges());
      var needCreateValidator = editIndex > -1;
      if (!needCreateValidator) {
        if (!showEditorAlways) {
          var columnsController = this.getController('columns');
          var visibleColumns = (columnsController === null || columnsController === void 0 ? void 0 : columnsController.getVisibleColumns()) || [];
          showEditorAlways = visibleColumns.some(column => column.showEditorAlways);
        }
        var isEditRow = equalByValue(this.option('editing.editRowKey'), parameters.key);
        var isCellOrBatchEditingAllowed = editingController.isCellOrBatchEditMode() && editingController.allowUpdating({
          row: parameters.row
        });
        needCreateValidator = isEditRow || isCellOrBatchEditingAllowed && showEditorAlways;
        if (isCellOrBatchEditingAllowed && showEditorAlways) {
          editingController._addInternalData({
            key: parameters.key,
            oldData: (_b = (_a = parameters.row) === null || _a === void 0 ? void 0 : _a.oldData) !== null && _b !== void 0 ? _b : parameters.data
          });
        }
      }
      if (needCreateValidator) {
        if ($container && !$container.length) {
          errors.log('E1050');
          return;
        }
        this._syncInternalEditingData(parameters);
        var validationData = this._getValidationData(parameters.key, true);
        var getValue = () => {
          var change = editingController.getChangeByKey(validationData === null || validationData === void 0 ? void 0 : validationData.key);
          var value = column.calculateCellValue((change === null || change === void 0 ? void 0 : change.data) || {});
          return value !== undefined ? value : parameters.value;
        };
        var useDefaultValidator = $container && $container.hasClass('dx-widget');
        $container && $container.addClass(this.addWidgetPrefix(VALIDATOR_CLASS));
        var validator = new Validator($container || $('<div>'), {
          name: column.caption,
          validationRules: extend(true, [], column.validationRules),
          validationGroup: validationData,
          // @ts-expect-error
          adapter: useDefaultValidator ? null : {
            getValue,
            applyValidationResults: result => {
              this.applyValidationResult($container, result);
            }
          },
          dataGetter() {
            var key = validationData === null || validationData === void 0 ? void 0 : validationData.key;
            var change = editingController.getChangeByKey(key);
            var oldData = editingController._getOldData(key);
            return {
              data: createObjectWithChanges(oldData, change === null || change === void 0 ? void 0 : change.data),
              column
            };
          },
          onInitialized: this.validatorInitialized.bind(this),
          onDisposing: this.validatorDisposing.bind(this)
        });
        if (useDefaultValidator) {
          var adapter = validator.option('adapter');
          if (adapter) {
            var originBypass = adapter.bypass;
            var defaultAdapterBypass = () => parameters.row.isNewRow && !this._isValidationInProgress && !editingController.isCellModified(parameters);
            adapter.getValue = getValue;
            adapter.validationRequestsCallbacks = [];
            // @ts-expect-error
            adapter.bypass = () => originBypass.call(adapter) || defaultAdapterBypass();
          }
        }
        return validator;
      }
      return undefined;
    },
    setDisableApplyValidationResults(flag) {
      this._disableApplyValidationResults = flag;
    },
    getDisableApplyValidationResults() {
      return this._disableApplyValidationResults;
    },
    isCurrentValidatorProcessing(_ref2) {
      var {
        rowKey,
        columnIndex
      } = _ref2;
      return this._currentCellValidator && equalByValue(this._currentCellValidator.option('validationGroup').key, rowKey) && this._currentCellValidator.option('dataGetter')().column.index === columnIndex;
    },
    validateCell(validator) {
      var cellParams = {
        rowKey: validator.option('validationGroup').key,
        columnIndex: validator.option('dataGetter')().column.index
      };
      var validationResult = this.getCellValidationResult(cellParams);
      var stateRestored = validationResultIsValid(validationResult);
      var adapter = validator.option('adapter');
      if (!stateRestored) {
        validationResult = validator.validate();
      } else {
        var currentCellValue = adapter.getValue();
        if (!equalByValue(currentCellValue, validationResult.value)) {
          validationResult = validator.validate();
        }
      }
      // @ts-expect-error
      var deferred = new Deferred();
      if (stateRestored && validationResult.status === VALIDATION_STATUS.pending) {
        this.updateCellValidationResult(cellParams);
        adapter.applyValidationResults(validationResult);
      }
      when(validationResult.complete || validationResult).done(validationResult => {
        stateRestored && adapter.applyValidationResults(validationResult);
        deferred.resolve(validationResult);
      });
      return deferred.promise();
    },
    updateCellValidationResult(_ref3) {
      var {
        rowKey,
        columnIndex,
        validationResult
      } = _ref3;
      var validationData = this._getValidationData(rowKey);
      if (!validationData) {
        return;
      }
      if (!validationData.validationResults) {
        validationData.validationResults = {};
      }
      var result;
      if (validationResult) {
        result = extend({}, validationResult);
        validationData.validationResults[columnIndex] = result;
        if (validationResult.status === VALIDATION_STATUS.pending) {
          if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
            // @ts-expect-error
            result.deferred = new Deferred();
            result.complete.always(() => {
              result.deferred.resolve();
            });
            this._editingController.addDeferred(result.deferred);
          }
          if (this._disableApplyValidationResults) {
            result.disabledPendingId = validationResult.id;
            return;
          }
        }
      } else {
        result = validationData.validationResults[columnIndex];
      }
      if (result && result.disabledPendingId) {
        delete result.disabledPendingId;
      }
    },
    getCellValidationResult(_ref4) {
      var {
        rowKey,
        columnIndex
      } = _ref4;
      var _a;
      var validationData = this._getValidationData(rowKey, true);
      return (_a = validationData === null || validationData === void 0 ? void 0 : validationData.validationResults) === null || _a === void 0 ? void 0 : _a[columnIndex];
    },
    removeCellValidationResult(_ref5) {
      var {
        change,
        columnIndex
      } = _ref5;
      var validationData = this._getValidationData(change === null || change === void 0 ? void 0 : change.key);
      if (validationData && validationData.validationResults) {
        this.cancelCellValidationResult({
          change,
          columnIndex
        });
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete validationData.validationResults[columnIndex];
      }
    },
    cancelCellValidationResult(_ref6) {
      var {
        change,
        columnIndex
      } = _ref6;
      var validationData = this._getValidationData(change.key);
      if (change && validationData.validationResults) {
        var result = validationData.validationResults[columnIndex];
        if (result) {
          result.deferred && result.deferred.reject(VALIDATION_CANCELLED);
          validationData.validationResults[columnIndex] = VALIDATION_CANCELLED;
        }
      }
    },
    resetRowValidationResults(validationData) {
      if (validationData) {
        validationData.validationResults && delete validationData.validationResults;
        delete validationData.validated;
      }
    },
    isInvalidCell(_ref7) {
      var {
        rowKey,
        columnIndex
      } = _ref7;
      var result = this.getCellValidationResult({
        rowKey,
        columnIndex
      });
      return validationResultIsValid(result) && result.status === VALIDATION_STATUS.invalid;
    },
    getCellValidator(_ref8) {
      var {
        rowKey,
        columnIndex
      } = _ref8;
      var validationData = this._getValidationData(rowKey);
      var groupConfig = validationData && ValidationEngine.getGroupConfig(validationData);
      var validators = groupConfig && groupConfig.validators;
      return validators && validators.filter(v => {
        var {
          column
        } = v.option('dataGetter')();
        return column ? column.index === columnIndex : false;
      })[0];
    },
    setCellValidationStatus(cellOptions) {
      var validationResult = this.getCellValidationResult({
        rowKey: cellOptions.key,
        columnIndex: cellOptions.column.index
      });
      if (isDefined(validationResult)) {
        cellOptions.validationStatus = validationResult !== VALIDATION_CANCELLED ? validationResult.status : VALIDATION_CANCELLED;
      } else {
        delete cellOptions.validationStatus;
      }
    }
  };
}());
export var validatingModule = {
  defaultOptions() {
    return {
      editing: {
        texts: {
          validationCancelChanges: messageLocalization.format('dxDataGrid-validationCancelChanges')
        }
      }
    };
  },
  controllers: {
    validating: ValidatingController
  },
  extenders: {
    controllers: {
      editing: {
        _addChange(changeParams) {
          var change = this.callBase.apply(this, arguments);
          var validatingController = this.getController('validating');
          if (change && changeParams.type !== EDIT_DATA_REMOVE_TYPE) {
            validatingController.updateValidationState(change);
          }
          return change;
        },
        _handleChangesChange(args) {
          this.callBase.apply(this, arguments);
          var validatingController = this.getController('validating');
          args.value.forEach(change => {
            if (validatingController._getValidationData(change.key) === undefined) {
              validatingController.updateValidationState(change);
            }
          });
        },
        _updateRowAndPageIndices() {
          var that = this;
          var startInsertIndex = that.getView('rowsView').getTopVisibleItemIndex();
          var rowIndex = startInsertIndex;
          each(that.getChanges(), (_, _ref9) => {
            var {
              key,
              type
            } = _ref9;
            var validationData = this.getController('validating')._getValidationData(key);
            if (validationData && !validationData.isValid && validationData.pageIndex !== that._pageIndex) {
              validationData.pageIndex = that._pageIndex;
              if (type === EDIT_DATA_INSERT_TYPE) {
                validationData.rowIndex = startInsertIndex;
              } else {
                validationData.rowIndex = rowIndex;
              }
              rowIndex++;
            }
          });
        },
        _getValidationGroupsInForm(detailOptions) {
          var validatingController = this.getController('validating');
          var validationData = validatingController._getValidationData(detailOptions.key, true);
          return {
            validationGroup: validationData
          };
        },
        _validateEditFormAfterUpdate(row, isCustomSetCellValue) {
          // T816256, T844143
          if (isCustomSetCellValue && this._editForm) {
            this._editForm.validate();
          }
          this.callBase.apply(this, arguments);
        },
        _prepareEditCell(params) {
          var isNotCanceled = this.callBase.apply(this, arguments);
          var validatingController = this.getController('validating');
          if (isNotCanceled && params.column.showEditorAlways) {
            validatingController.updateValidationState({
              key: params.key
            });
          }
          return isNotCanceled;
        },
        processItems(items, changeType) {
          var changes = this.getChanges();
          var dataController = this.getController('data');
          var validatingController = this.getController('validating');
          var getIndexByChange = function getIndexByChange(change, items) {
            var index = -1;
            var isInsert = change.type === EDIT_DATA_INSERT_TYPE;
            var {
              key
            } = change;
            each(items, (i, item) => {
              if (equalByValue(key, isInsert ? item.key : dataController.keyOf(item))) {
                index = i;
                return false;
              }
              return undefined;
            });
            return index;
          };
          items = this.callBase(items, changeType);
          var itemsCount = items.length;
          var addInValidItem = function addInValidItem(change, validationData) {
            var data = {
              key: change.key
            };
            var index = getIndexByChange(change, items);
            if (index >= 0) {
              return;
            }
            validationData.rowIndex = validationData.rowIndex > itemsCount ? validationData.rowIndex % itemsCount : validationData.rowIndex;
            var {
              rowIndex
            } = validationData;
            data[INSERT_INDEX] = 1;
            items.splice(rowIndex, 0, data);
          };
          if (this.getEditMode() === EDIT_MODE_BATCH && changeType !== 'prepend' && changeType !== 'append') {
            changes.forEach(change => {
              var {
                key
              } = change;
              var validationData = validatingController._getValidationData(key);
              if (validationData && change.type && validationData.pageIndex === this._pageIndex && (change === null || change === void 0 ? void 0 : change.pageIndex) !== this._pageIndex) {
                addInValidItem(change, validationData);
              }
            });
          }
          return items;
        },
        processDataItem(item) {
          var isInserted = item.data[INSERT_INDEX];
          var key = isInserted ? item.data.key : item.key;
          var editMode = this.getEditMode();
          if (editMode === EDIT_MODE_BATCH && isInserted && key) {
            var changes = this.getChanges();
            var editIndex = gridCoreUtils.getIndexByKey(key, changes);
            if (editIndex >= 0) {
              var change = changes[editIndex];
              if (change.type !== EDIT_DATA_INSERT_TYPE) {
                var oldData = this._getOldData(change.key);
                item.data = extend(true, {}, oldData, change.data);
                item.key = key;
              }
            }
          }
          this.callBase.apply(this, arguments);
        },
        _createInvisibleColumnValidators(changes) {
          var that = this;
          var validatingController = this.getController('validating');
          var columnsController = this.getController('columns');
          var columns = columnsController.getColumns();
          var invisibleColumns = columnsController.getInvisibleColumns().filter(column => !column.isBand);
          var groupColumns = columnsController.getGroupColumns().filter(column => !column.showWhenGrouped && invisibleColumns.indexOf(column) === -1);
          var invisibleColumnValidators = [];
          var isCellVisible = (column, rowKey) => this._dataController.getRowIndexByKey(rowKey) >= 0 && invisibleColumns.indexOf(column) < 0;
          invisibleColumns.push(...groupColumns);
          if (!FORM_BASED_MODES.includes(this.getEditMode())) {
            each(columns, (_, column) => {
              changes.forEach(change => {
                var data;
                if (isCellVisible(column, change.key)) {
                  return;
                }
                if (change.type === EDIT_DATA_INSERT_TYPE) {
                  data = change.data;
                } else if (change.type === 'update') {
                  var oldData = that._getOldData(change.key);
                  if (!isDefined(oldData)) {
                    return;
                  }
                  data = createObjectWithChanges(oldData, change.data);
                }
                if (data) {
                  var validator = validatingController.createValidator({
                    column,
                    key: change.key,
                    value: column.calculateCellValue(data)
                  });
                  if (validator) {
                    invisibleColumnValidators.push(validator);
                  }
                }
              });
            });
          }
          return function () {
            invisibleColumnValidators.forEach(validator => {
              validator.dispose();
            });
          };
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _beforeSaveEditData(change, editIndex) {
          var result = this.callBase.apply(this, arguments);
          var validatingController = this.getController('validating');
          var validationData = validatingController._getValidationData(change === null || change === void 0 ? void 0 : change.key);
          if (change) {
            var isValid = change.type === 'remove' || validationData.isValid;
            result = result || !isValid;
          } else {
            var disposeValidators = this._createInvisibleColumnValidators(this.getChanges());
            // @ts-expect-error
            result = new Deferred();
            this.executeOperation(result, () => {
              validatingController.validate(true).done(isFullValid => {
                disposeValidators();
                this._updateRowAndPageIndices();
                // eslint-disable-next-line default-case
                switch (this.getEditMode()) {
                  case EDIT_MODE_CELL:
                    if (!isFullValid) {
                      this._focusEditingCell();
                    }
                    break;
                  case EDIT_MODE_BATCH:
                    if (!isFullValid) {
                      this._resetEditRowKey();
                      this._resetEditColumnName();
                      this.getController('data').updateItems();
                    }
                    break;
                }
                result.resolve(!isFullValid);
              });
            });
          }
          return result.promise ? result.promise() : result;
        },
        _beforeEditCell(rowIndex, columnIndex, item) {
          var result = this.callBase(rowIndex, columnIndex, item);
          if (this.getEditMode() === EDIT_MODE_CELL) {
            var $cell = this._rowsView._getCellElement(rowIndex, columnIndex);
            var validator = $cell && $cell.data('dxValidator');
            var rowOptions = $cell && $cell.closest('.dx-row').data('options');
            var value = validator && validator.option('adapter').getValue();
            if (validator && cellValueShouldBeValidated(value, rowOptions)) {
              var validatingController = this.getController('validating');
              // @ts-expect-error
              var deferred = new Deferred();
              when(validatingController.validateCell(validator), result).done((validationResult, result) => {
                deferred.resolve(validationResult.status === VALIDATION_STATUS.valid && result);
              });
              return deferred.promise();
            }
            if (!validator) {
              return result;
            }
          }
        },
        _afterSaveEditData(cancel) {
          var $firstErrorRow;
          var isCellEditMode = this.getEditMode() === EDIT_MODE_CELL;
          each(this.getChanges(), (_, change) => {
            var $errorRow = this._showErrorRow(change);
            $firstErrorRow = $firstErrorRow || $errorRow;
          });
          if ($firstErrorRow) {
            var scrollable = this._rowsView.getScrollable();
            if (scrollable) {
              scrollable.update();
              scrollable.scrollToElement($firstErrorRow);
            }
          }
          if (cancel && isCellEditMode && this._needUpdateRow()) {
            var editRowIndex = this.getEditRowIndex();
            this._dataController.updateItems({
              changeType: 'update',
              rowIndices: [editRowIndex]
            });
            this._focusEditingCell();
          } else if (!cancel) {
            var shouldResetValidationState = true;
            if (isCellEditMode) {
              var columns = this.getController('columns').getColumns();
              var columnsWithValidatingEditors = columns.filter(col => {
                var _a;
                return col.showEditorAlways && ((_a = col.validationRules) === null || _a === void 0 ? void 0 : _a.length) > 0;
              }).length > 0;
              shouldResetValidationState = !columnsWithValidatingEditors;
            }
            if (shouldResetValidationState) {
              this.getController('validating').initValidationState();
            }
          }
        },
        _handleDataChanged(args) {
          var validationState = this.getController('validating')._validationState;
          if (this.option('scrolling.mode') === 'standard') {
            this.resetRowAndPageIndices();
          }
          if (args.changeType === 'prepend') {
            each(validationState, (_, validationData) => {
              validationData.rowIndex += args.items.length;
            });
          }
          this.callBase(args);
        },
        resetRowAndPageIndices() {
          var validationState = this.getController('validating')._validationState;
          each(validationState, (_, validationData) => {
            if (validationData.pageIndex !== this._pageIndex) {
              delete validationData.pageIndex;
              delete validationData.rowIndex;
            }
          });
        },
        _beforeCancelEditData() {
          this.getController('validating').initValidationState();
          this.callBase();
        },
        _showErrorRow(change) {
          var $popupContent;
          var errorHandling = this.getController('errorHandling');
          var items = this.getController('data').items();
          var rowIndex = this.getIndexByKey(change.key, items);
          var validationData = this.getController('validating')._getValidationData(change.key);
          if (!(validationData === null || validationData === void 0 ? void 0 : validationData.isValid) && (validationData === null || validationData === void 0 ? void 0 : validationData.errorText) && rowIndex >= 0) {
            $popupContent = this.getPopupContent();
            return errorHandling && errorHandling.renderErrorRow(validationData === null || validationData === void 0 ? void 0 : validationData.errorText, rowIndex, $popupContent);
          }
        },
        updateFieldValue(e) {
          var validatingController = this.getController('validating');
          // @ts-expect-error
          var deferred = new Deferred();
          validatingController.removeCellValidationResult({
            change: this.getChangeByKey(e.key),
            columnIndex: e.column.index
          });
          this.callBase.apply(this, arguments).done(() => {
            var currentValidator = validatingController.getCellValidator({
              rowKey: e.key,
              columnIndex: e.column.index
            });
            when(currentValidator && validatingController.validateCell(currentValidator)).done(validationResult => {
              this.getController('editorFactory').refocus();
              deferred.resolve(validationResult);
            });
          });
          return deferred.promise();
        },
        highlightDataCell($cell, parameters) {
          this.callBase.apply(this, arguments);
          var validatingController = this.getController('validating');
          validatingController.setCellValidationStatus(parameters);
          var isEditableCell = !!parameters.setValue;
          var cellModified = this.isCellModified(parameters);
          var isValidated = isDefined(parameters.validationStatus);
          var needValidation = cellModified && parameters.column.setCellValue || isEditableCell && !cellModified && !(parameters.row.isNewRow || !isValidated);
          if (needValidation) {
            var validator = $cell.data('dxValidator');
            if (validator) {
              when(this.getController('validating').validateCell(validator)).done(() => {
                validatingController.setCellValidationStatus(parameters);
              });
            }
          }
        },
        getChangeByKey(key) {
          var changes = this.getChanges();
          return changes[gridCoreUtils.getIndexByKey(key, changes)];
        },
        isCellModified(parameters) {
          var cellModified = this.callBase(parameters);
          var change = this.getChangeByKey(parameters.key);
          var isCellInvalid = !!parameters.row && this.getController('validating').isInvalidCell({
            rowKey: parameters.key,
            columnIndex: parameters.column.index
          });
          return cellModified || this.getController('validating')._rowIsValidated(change) && isCellInvalid;
        }
      },
      editorFactory: function () {
        var getWidthOfVisibleCells = function getWidthOfVisibleCells(that, element) {
          var rowIndex = $(element).closest('tr').index();
          var $cellElements = $(that._rowsView.getRowElement(rowIndex)).first().children().filter(':not(.dx-hidden-cell)');
          return that._rowsView._getWidths($cellElements).reduce((w1, w2) => w1 + w2, 0);
        };
        var getBoundaryNonFixedColumnsInfo = function getBoundaryNonFixedColumnsInfo(fixedColumns) {
          var firstNonFixedColumnIndex;
          var lastNonFixedColumnIndex;
          // eslint-disable-next-line array-callback-return
          fixedColumns.some((column, index) => {
            if (column.command === COMMAND_TRANSPARENT) {
              firstNonFixedColumnIndex = index === 0 ? -1 : index;
              lastNonFixedColumnIndex = index === fixedColumns.length - 1 ? -1 : index + column.colspan - 1;
              return true;
            }
            return undefined;
          });
          return {
            startColumnIndex: firstNonFixedColumnIndex,
            endColumnIndex: lastNonFixedColumnIndex
          };
        };
        return {
          _showRevertButton($container) {
            var _a;
            var $tooltipElement = (_a = this._revertTooltip) === null || _a === void 0 ? void 0 : _a.$element();
            if (!$container || !$container.length) {
              $tooltipElement === null || $tooltipElement === void 0 ? void 0 : $tooltipElement.remove();
              this._revertTooltip = undefined;
              return;
            }
            // do not render tooltip if it is already rendered
            if ($container.find($tooltipElement).length) {
              return;
            }
            var $overlayContainer = $container.closest(".".concat(this.addWidgetPrefix(CONTENT_CLASS))).parent();
            var revertTooltipClass = this.addWidgetPrefix(REVERT_TOOLTIP_CLASS);
            $tooltipElement === null || $tooltipElement === void 0 ? void 0 : $tooltipElement.remove();
            $tooltipElement = $('<div>').addClass(revertTooltipClass).appendTo($container);
            var tooltipOptions = {
              animation: null,
              visible: true,
              width: 'auto',
              height: 'auto',
              shading: false,
              container: $overlayContainer,
              propagateOutsideClick: true,
              hideOnOutsideClick: false,
              wrapperAttr: {
                class: revertTooltipClass
              },
              contentTemplate: () => {
                var $buttonElement = $('<div>').addClass(REVERT_BUTTON_CLASS);
                var buttonOptions = {
                  icon: 'revert',
                  hint: this.option('editing.texts.validationCancelChanges'),
                  elementAttr: {
                    id: REVERT_BUTTON_ID,
                    'aria-label': messageLocalization.format('dxDataGrid-ariaRevertButton')
                  },
                  onClick: () => {
                    this._editingController.cancelEditData();
                  }
                };
                // @ts-expect-error
                return new Button($buttonElement, buttonOptions).$element();
              },
              position: {
                my: 'left top',
                at: 'right top',
                offset: '1 0',
                collision: 'flip',
                boundaryOffset: '0 0',
                boundary: this._rowsView.element(),
                of: $container
              },
              onPositioned: this._positionedHandler.bind(this)
            };
            this._revertTooltip = new Overlay($tooltipElement, tooltipOptions);
          },
          _hideFixedGroupCell($cell, overlayOptions) {
            var $nextFixedRowElement;
            var $groupCellElement;
            var isFixedColumns = this._rowsView.isFixedColumns();
            var isFormOrPopupEditMode = this._editingController.isFormOrPopupEditMode();
            if (isFixedColumns && !isFormOrPopupEditMode) {
              var nextRowOptions = $cell.closest('.dx-row').next().data('options');
              if (nextRowOptions && nextRowOptions.rowType === 'group') {
                $nextFixedRowElement = $(this._rowsView.getRowElement(nextRowOptions.rowIndex)).last();
                $groupCellElement = $nextFixedRowElement.find(".".concat(GROUP_CELL_CLASS));
                if ($groupCellElement.length && $groupCellElement.get(0).style.visibility !== 'hidden') {
                  $groupCellElement.css('visibility', 'hidden');
                  overlayOptions.onDisposing = function () {
                    $groupCellElement.css('visibility', '');
                  };
                }
              }
            }
          },
          _positionedHandler(e, isOverlayVisible) {
            if (!e.component.__skipPositionProcessing) {
              var isRevertButton = $(e.element).hasClass(this.addWidgetPrefix(REVERT_TOOLTIP_CLASS));
              var needRepaint = !isRevertButton && this._rowsView.updateFreeSpaceRowHeight();
              var normalizedPosition = this._normalizeValidationMessagePositionAndMaxWidth(e, isRevertButton, isOverlayVisible);
              e.component.__skipPositionProcessing = !!(needRepaint || normalizedPosition);
              if (normalizedPosition) {
                e.component.option(normalizedPosition);
              } else if (needRepaint) {
                e.component.repaint();
              }
            }
          },
          _showValidationMessage($cell, messages, alignment) {
            var _a;
            var editorPopup = $cell.find('.dx-dropdowneditor-overlay').data('dxPopup');
            var isOverlayVisible = editorPopup && editorPopup.option('visible');
            var myPosition = isOverlayVisible ? 'top right' : "top ".concat(alignment);
            var atPosition = isOverlayVisible ? 'top left' : "bottom ".concat(alignment);
            // TODO: Don't forget to remove this code
            //  after refactoring the fixed table position (or implementation).
            var hasFixedColumns = ((_a = this._columnsController.getFixedColumns()) === null || _a === void 0 ? void 0 : _a.length) > 0;
            var $overlayContainer = hasFixedColumns ? this.getView('rowsView').element() : $cell.closest(".".concat(this.addWidgetPrefix(CONTENT_CLASS)));
            var errorMessageText = '';
            messages && messages.forEach(message => {
              errorMessageText += (errorMessageText.length ? '<br/>' : '') + encodeHtml(message);
            });
            var invalidMessageClass = this.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS);
            this._rowsView.element().find(".".concat(invalidMessageClass)).remove();
            var $overlayElement = $('<div>').addClass(INVALID_MESSAGE_CLASS).addClass(INVALID_MESSAGE_ALWAYS_CLASS).addClass(invalidMessageClass).html(errorMessageText).appendTo($cell);
            var overlayOptions = {
              container: $overlayContainer,
              shading: false,
              width: 'auto',
              height: 'auto',
              visible: true,
              animation: false,
              propagateOutsideClick: true,
              hideOnOutsideClick: false,
              wrapperAttr: {
                id: INVALID_MESSAGE_ID,
                class: "".concat(INVALID_MESSAGE_CLASS, " ").concat(INVALID_MESSAGE_ALWAYS_CLASS, " ").concat(invalidMessageClass)
              },
              position: {
                collision: 'flip',
                boundary: this._rowsView.element(),
                boundaryOffset: '0 0',
                offset: {
                  x: 0,
                  // Firefox consider the top row/cell border when calculating a cell offset.
                  y: !isOverlayVisible && browser.mozilla ? -1 : 0
                },
                my: myPosition,
                at: atPosition,
                of: $cell
              },
              onPositioned: e => {
                this._positionedHandler(e, isOverlayVisible);
                this._shiftValidationMessageIfNeed(e.component.$content(), $cell);
              }
            };
            this._hideFixedGroupCell($cell, overlayOptions);
            // eslint-disable-next-line no-new
            new Overlay($overlayElement, overlayOptions);
          },
          _hideValidationMessage() {
            var _a;
            var validationMessages = (_a = this._rowsView.element()) === null || _a === void 0 ? void 0 : _a.find(this._getValidationMessagesSelector());
            validationMessages === null || validationMessages === void 0 ? void 0 : validationMessages.remove();
          },
          _normalizeValidationMessagePositionAndMaxWidth(options, isRevertButton, isOverlayVisible) {
            var fixedColumns = this._columnsController.getFixedColumns();
            if (!fixedColumns || !fixedColumns.length) {
              return;
            }
            var position;
            var visibleTableWidth = !isRevertButton && getWidthOfVisibleCells(this, options.element);
            var $overlayContentElement = options.component.$content();
            var validationMessageWidth = getOuterWidth($overlayContentElement, true);
            var needMaxWidth = !isRevertButton && validationMessageWidth > visibleTableWidth;
            var columnIndex = this._rowsView.getCellIndex($(options.element).closest('td'));
            var boundaryNonFixedColumnsInfo = getBoundaryNonFixedColumnsInfo(fixedColumns);
            if (!isRevertButton && (columnIndex === boundaryNonFixedColumnsInfo.startColumnIndex || needMaxWidth)) {
              position = {
                collision: 'none flip',
                my: 'top left',
                at: isOverlayVisible ? 'top right' : 'bottom left'
              };
            } else if (columnIndex === boundaryNonFixedColumnsInfo.endColumnIndex) {
              position = {
                collision: 'none flip',
                my: 'top right',
                at: isRevertButton || isOverlayVisible ? 'top left' : 'bottom right'
              };
              if (isRevertButton) {
                position.offset = '-1 0';
              }
            }
            return position && {
              position,
              maxWidth: needMaxWidth ? visibleTableWidth - 2 : undefined
            };
          },
          _shiftValidationMessageIfNeed($content, $cell) {
            var $revertContent = this._revertTooltip && this._revertTooltip.$content();
            if (!$revertContent) return;
            var contentOffset = $content.offset();
            var revertContentOffset = $revertContent.offset();
            if (contentOffset.top === revertContentOffset.top && contentOffset.left + getWidth($content) > revertContentOffset.left) {
              var left = getWidth($revertContent) + PADDING_BETWEEN_TOOLTIPS;
              $content.css('left', revertContentOffset.left < $cell.offset().left ? -left : left);
            }
          },
          _getRevertTooltipsSelector() {
            var revertTooltipClass = this.addWidgetPrefix(REVERT_TOOLTIP_CLASS);
            return ".dx-editor-cell .".concat(revertTooltipClass);
          },
          _getValidationMessagesSelector() {
            var invalidMessageClass = this.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS);
            return ".dx-editor-cell .".concat(invalidMessageClass, ", .dx-cell-modified .").concat(invalidMessageClass);
          },
          init() {
            this.callBase();
            this._editingController = this.getController('editing');
            this._columnsController = this.getController('columns');
            this._rowsView = this.getView('rowsView');
          },
          loseFocus(skipValidator) {
            if (!skipValidator) {
              this.getController('validating').setValidator(null);
            }
            this.callBase();
          },
          updateCellState($element, validationResult, isHideBorder) {
            var _a;
            var $focus = $element === null || $element === void 0 ? void 0 : $element.closest(this._getFocusCellSelector());
            var $cell = ($focus === null || $focus === void 0 ? void 0 : $focus.is('td')) ? $focus : null;
            var rowOptions = $focus === null || $focus === void 0 ? void 0 : $focus.closest('.dx-row').data('options');
            var change = rowOptions ? this.getController('editing').getChangeByKey(rowOptions.key) : null;
            var column = $cell && this.getController('columns').getVisibleColumns()[$cell.index()];
            var isCellModified = ((_a = change === null || change === void 0 ? void 0 : change.data) === null || _a === void 0 ? void 0 : _a[column === null || column === void 0 ? void 0 : column.name]) !== undefined && !this._editingController.isSaving();
            var validationDescriptionValues = [];
            if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
              if ((validationResult === null || validationResult === void 0 ? void 0 : validationResult.status) === VALIDATION_STATUS.invalid || isCellModified) {
                this._showRevertButton($focus);
                validationDescriptionValues.push(REVERT_BUTTON_ID);
              } else {
                this._revertTooltip && this._revertTooltip.$element().remove();
              }
            }
            var showValidationMessage = validationResult && validationResult.status === VALIDATION_STATUS.invalid;
            if (showValidationMessage && $cell && column && validationResult && validationResult.brokenRules) {
              var errorMessages = [];
              validationResult.brokenRules.forEach(rule => {
                if (rule.message) {
                  errorMessages.push(rule.message);
                }
              });
              if (errorMessages.length) {
                this._showValidationMessage($focus, errorMessages, column.alignment || 'left');
                validationDescriptionValues.push(INVALID_MESSAGE_ID);
              }
            }
            this._updateAriaValidationAttributes($focus, validationDescriptionValues);
            !isHideBorder && this._rowsView.element() && this._rowsView.updateFreeSpaceRowHeight();
          },
          _updateAriaValidationAttributes($focus, inputDescriptionValues) {
            if (inputDescriptionValues.length === 0) {
              return;
            }
            var editMode = this._editingController.getEditMode();
            var shouldSetValidationAriaAttributes = [EDIT_MODE_CELL, EDIT_MODE_BATCH, EDIT_MODE_ROW].includes(editMode);
            if (shouldSetValidationAriaAttributes) {
              var $focusElement = this._getCurrentFocusElement($focus);
              $focusElement.attr('aria-labelledby', inputDescriptionValues.join(' '));
              $focusElement.attr('aria-invalid', true);
            }
          },
          _getCurrentFocusElement($focus) {
            if (this._editingController.isEditing()) {
              return $focus.find(EDITORS_INPUT_SELECTOR).first();
            }
            return $focus;
          },
          focus($element, isHideBorder) {
            if (!arguments.length) return this.callBase();
            this._hideValidationMessage();
            if (($element === null || $element === void 0 ? void 0 : $element.hasClass('dx-row')) || ($element === null || $element === void 0 ? void 0 : $element.hasClass('dx-master-detail-cell'))) {
              return this.callBase($element, isHideBorder);
            }
            var $focus = $element === null || $element === void 0 ? void 0 : $element.closest(this._getFocusCellSelector());
            var {
              callBase
            } = this;
            var validator = $focus && ($focus.data('dxValidator') || $element.find(".".concat(this.addWidgetPrefix(VALIDATOR_CLASS))).eq(0).data('dxValidator'));
            var rowOptions = $focus && $focus.closest('.dx-row').data('options');
            var editingController = this.getController('editing');
            var change = rowOptions ? editingController.getChangeByKey(rowOptions.key) : null;
            var validatingController = this.getController('validating');
            var validationResult;
            if (validator) {
              validatingController.setValidator(validator);
              var value = validator.option('adapter').getValue();
              if (cellValueShouldBeValidated(value, rowOptions) || validatingController._rowIsValidated(change)) {
                editingController.waitForDeferredOperations().done(() => {
                  when(validatingController.validateCell(validator)).done(result => {
                    validationResult = result;
                    var {
                      column
                    } = validationResult.validator.option('dataGetter')();
                    if (change && column && !validatingController.isCurrentValidatorProcessing({
                      rowKey: change.key,
                      columnIndex: column.index
                    })) {
                      return;
                    }
                    if (validationResult.status === VALIDATION_STATUS.invalid) {
                      isHideBorder = true;
                    }
                    this.updateCellState($element, validationResult, isHideBorder);
                    callBase.call(this, $element, isHideBorder);
                  });
                });
                return this.callBase($element, isHideBorder);
              }
            }
            this.updateCellState($element, validationResult, isHideBorder);
            return this.callBase($element, isHideBorder);
          },
          getEditorInstance($container) {
            var $editor = $container.find('.dx-texteditor').eq(0);
            return gridCoreUtils.getWidgetInstance($editor);
          }
        };
      }(),
      data: {
        _getValidationStatus(validationResult) {
          var validationStatus = validationResultIsValid(validationResult) ? validationResult.status : validationResult;
          return validationStatus || VALIDATION_STATUS.valid;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _isCellChanged(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
          var _a, _b;
          var cell = (_a = oldRow.cells) === null || _a === void 0 ? void 0 : _a[columnIndex];
          var oldValidationStatus = this._getValidationStatus({
            status: cell === null || cell === void 0 ? void 0 : cell.validationStatus
          });
          var validatingController = this.getController('validating');
          var validationResult = validatingController.getCellValidationResult({
            rowKey: oldRow.key,
            columnIndex
          });
          var validationData = validatingController._getValidationData(oldRow.key);
          var newValidationStatus = this._getValidationStatus(validationResult);
          var rowIsModified = JSON.stringify(newRow.modifiedValues) !== JSON.stringify(oldRow.modifiedValues);
          var validationStatusChanged = oldValidationStatus !== newValidationStatus && rowIsModified;
          var cellIsMarkedAsInvalid = $(cell === null || cell === void 0 ? void 0 : cell.cellElement).hasClass(this.addWidgetPrefix(INVALIDATE_CLASS));
          var hasValidationRules = (_b = cell === null || cell === void 0 ? void 0 : cell.column.validationRules) === null || _b === void 0 ? void 0 : _b.length;
          var rowEditStateChanged = oldRow.isEditing !== newRow.isEditing && hasValidationRules;
          var cellValidationStateChanged = validationStatusChanged || validationData.isValid && cellIsMarkedAsInvalid;
          if (rowEditStateChanged || cellValidationStateChanged) {
            return true;
          }
          return this.callBase.apply(this, arguments);
        }
      }
    },
    views: {
      rowsView: {
        updateFreeSpaceRowHeight($table) {
          var that = this;
          var $rowElements;
          var $freeSpaceRowElement;
          var $freeSpaceRowElements;
          var $element = that.element();
          var $tooltipContent = $element && $element.find(".".concat(that.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS), " .dx-overlay-content"));
          that.callBase($table);
          if ($tooltipContent && $tooltipContent.length) {
            $rowElements = that._getRowElements();
            $freeSpaceRowElements = that._getFreeSpaceRowElements($table);
            $freeSpaceRowElement = $freeSpaceRowElements.first();
            if ($freeSpaceRowElement && $rowElements.length === 1 && (!$freeSpaceRowElement.is(':visible') || getOuterHeight($tooltipContent) > getOuterHeight($freeSpaceRowElement))) {
              $freeSpaceRowElements.show();
              setHeight($freeSpaceRowElements, getOuterHeight($tooltipContent));
              return true;
            }
          }
          return undefined;
        },
        _formItemPrepared(cellOptions, $container) {
          this.callBase.apply(this, arguments);
          deferUpdate(() => {
            var $editor = $container.find('.dx-widget').first();
            var isEditorDisposed = $editor.length && !$editor.children().length;
            // T736360
            if (!isEditorDisposed) {
              this.getController('validating').createValidator(cellOptions, $editor);
            }
          });
        },
        _cellPrepared($cell, parameters) {
          if (!this.getController('editing').isFormOrPopupEditMode()) {
            this.getController('validating').createValidator(parameters, $cell);
          }
          this.callBase.apply(this, arguments);
        },
        _restoreErrorRow(contentTable) {
          var editingController = this.getController('editing');
          editingController && editingController.hasChanges() && this._getRowElements(contentTable).each((_, item) => {
            var rowOptions = $(item).data('options');
            if (rowOptions) {
              // @ts-expect-error
              var change = editingController.getChangeByKey(rowOptions.key);
              change && editingController._showErrorRow(change);
            }
          });
        }
      }
    }
  }
};