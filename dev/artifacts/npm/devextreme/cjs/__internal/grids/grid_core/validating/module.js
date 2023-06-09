/**
* DevExtreme (cjs/__internal/grids/grid_core/validating/module.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatingModule = void 0;
var size_1 = require("../../../../core/utils/size");
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var events_engine_1 = __importDefault(require("../../../../events/core/events_engine"));
var array_utils_1 = require("../../../../data/array_utils");
// @ts-expect-error
var common_1 = require("../../../../core/utils/common");
var iterator_1 = require("../../../../core/utils/iterator");
var type_1 = require("../../../../core/utils/type");
var extend_1 = require("../../../../core/utils/extend");
var selectors_1 = require("../../../../ui/widget/selectors");
var message_1 = __importDefault(require("../../../../localization/message"));
var button_1 = __importDefault(require("../../../../ui/button"));
var pointer_1 = __importDefault(require("../../../../events/pointer"));
var validation_engine_1 = __importDefault(require("../../../../ui/validation_engine"));
var validator_1 = __importDefault(require("../../../../ui/validator"));
var ui_overlay_1 = __importDefault(require("../../../../ui/overlay/ui.overlay"));
var ui_errors_1 = __importDefault(require("../../../../ui/widget/ui.errors"));
// @ts-expect-error
var deferred_1 = require("../../../../core/utils/deferred");
var load_indicator_1 = __importDefault(require("../../../../ui/load_indicator"));
var string_1 = require("../../../../core/utils/string");
var browser_1 = __importDefault(require("../../../../core/utils/browser"));
var module_utils_1 = __importDefault(require("../module_utils"));
var modules_1 = __importDefault(require("../modules"));
var INVALIDATE_CLASS = 'invalid';
var REVERT_TOOLTIP_CLASS = 'revert-tooltip';
var INVALID_MESSAGE_CLASS = 'dx-invalid-message';
var WIDGET_INVALID_MESSAGE_CLASS = 'invalid-message';
var INVALID_MESSAGE_ALWAYS_CLASS = 'dx-invalid-message-always';
var REVERT_BUTTON_CLASS = 'dx-revert-button';
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
    pending: 'pending',
};
var EDIT_DATA_INSERT_TYPE = 'insert';
var EDIT_DATA_REMOVE_TYPE = 'remove';
var VALIDATION_CANCELLED = 'cancel';
var validationResultIsValid = function (result) {
    return type_1.isDefined(result) && result !== VALIDATION_CANCELLED;
};
var cellValueShouldBeValidated = function (value, rowOptions) {
    return value !== undefined || (value === undefined && rowOptions && !rowOptions.isNewRow);
};
var ValidatingController = modules_1.default.Controller.inherit((function () {
    return {
        init: function () {
            this._editingController = this.getController('editing');
            this.createAction('onRowValidating');
            if (!this._validationState) {
                this.initValidationState();
            }
        },
        initValidationState: function () {
            this._validationState = [];
            this._validationStateCache = {};
        },
        _rowIsValidated: function (change) {
            var validationData = this._getValidationData(change === null || change === void 0 ? void 0 : change.key);
            return !!validationData && !!validationData.validated;
        },
        _getValidationData: function (key, create) {
            var keyHash = common_1.getKeyHash(key);
            var isObjectKeyHash = type_1.isObject(keyHash);
            var validationData;
            if (isObjectKeyHash) {
                // eslint-disable-next-line prefer-destructuring
                validationData = this._validationState.filter(function (data) { return common_1.equalByValue(data.key, key); })[0];
            }
            else {
                validationData = this._validationStateCache[keyHash];
            }
            if (!validationData && create) {
                validationData = { key: key, isValid: true };
                this._validationState.push(validationData);
                if (!isObjectKeyHash) {
                    this._validationStateCache[keyHash] = validationData;
                }
            }
            return validationData;
        },
        _getBrokenRules: function (validationData, validationResults) {
            var brokenRules;
            if (validationResults) {
                brokenRules = validationResults.brokenRules || validationResults.brokenRule && [validationResults.brokenRule];
            }
            else {
                brokenRules = validationData.brokenRules || [];
            }
            return brokenRules;
        },
        _rowValidating: function (validationData, validationResults) {
            // @ts-expect-error
            var deferred = new deferred_1.Deferred();
            var change = this._editingController.getChangeByKey(validationData === null || validationData === void 0 ? void 0 : validationData.key);
            var brokenRules = this._getBrokenRules(validationData, validationResults);
            var isValid = validationResults ? validationResults.isValid : validationData.isValid;
            var parameters = {
                brokenRules: brokenRules,
                isValid: isValid,
                key: change.key,
                newData: change.data,
                oldData: this._editingController._getOldData(change.key),
                promise: null,
                errorText: this.getHiddenValidatorsErrorText(brokenRules),
            };
            this.executeAction('onRowValidating', parameters);
            deferred_1.when(deferred_1.fromPromise(parameters.promise)).always(function () {
                validationData.isValid = parameters.isValid;
                validationData.errorText = parameters.errorText;
                deferred.resolve(parameters);
            });
            return deferred.promise();
        },
        getHiddenValidatorsErrorText: function (brokenRules) {
            var brokenRulesMessages = [];
            iterator_1.each(brokenRules, function (_, brokenRule) {
                var column = brokenRule.column;
                var isGroupExpandColumn = column && column.groupIndex !== undefined && !column.showWhenGrouped;
                var isVisibleColumn = column && column.visible;
                if (!brokenRule.validator.$element().parent().length && (!isVisibleColumn || isGroupExpandColumn)) {
                    brokenRulesMessages.push(brokenRule.message);
                }
            });
            return brokenRulesMessages.join(', ');
        },
        validate: function (isFull) {
            var _this = this;
            var isValid = true;
            var editingController = this._editingController;
            // @ts-expect-error
            var deferred = new deferred_1.Deferred();
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
                iterator_1.each(changes, function (index, _a) {
                    var type = _a.type, key = _a.key;
                    if (type !== 'remove') {
                        var validationData_1 = _this._getValidationData(key, true);
                        var validationResult = _this.validateGroup(validationData_1);
                        completeList.push(validationResult);
                        validationResult.done(function (validationResult) {
                            validationData_1.validated = true;
                            isValid = isValid && validationResult.isValid;
                        });
                    }
                });
            }
            else if (this._currentCellValidator) {
                var validationResult = this.validateGroup(this._currentCellValidator._findGroup());
                completeList.push(validationResult);
                validationResult.done(function (validationResult) {
                    isValid = validationResult.isValid;
                });
            }
            deferred_1.when.apply(void 0, completeList).done(function () {
                _this._isValidationInProgress = false;
                deferred.resolve(isValid);
            });
            return deferred.promise();
        },
        validateGroup: function (validationData) {
            var _this = this;
            // @ts-expect-error
            var result = new deferred_1.Deferred();
            var validateGroup = validationData && validation_engine_1.default.getGroupConfig(validationData);
            var validationResult;
            if (validateGroup === null || validateGroup === void 0 ? void 0 : validateGroup.validators.length) {
                this.resetRowValidationResults(validationData);
                validationResult = validation_engine_1.default.validateGroup(validationData);
            }
            deferred_1.when((validationResult === null || validationResult === void 0 ? void 0 : validationResult.complete) || validationResult).done(function (validationResult) {
                deferred_1.when(_this._rowValidating(validationData, validationResult)).done(result.resolve);
            });
            return result.promise();
        },
        isRowDataModified: function (change) {
            return !type_1.isEmptyObject(change.data);
        },
        updateValidationState: function (change) {
            var editMode = this._editingController.getEditMode();
            var key = change.key;
            var validationData = this._getValidationData(key, true);
            if (!FORM_BASED_MODES.includes(editMode)) {
                if (change.type === EDIT_DATA_INSERT_TYPE && !this.isRowDataModified(change)) {
                    validationData.isValid = true;
                    return;
                }
                this.setDisableApplyValidationResults(true);
                var groupConfig = validation_engine_1.default.getGroupConfig(validationData);
                if (groupConfig) {
                    var validationResult = validation_engine_1.default.validateGroup(validationData);
                    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                    deferred_1.when(validationResult.complete || validationResult).done(function (validationResult) {
                        // @ts-expect-error
                        validationData.isValid = validationResult.isValid;
                        // @ts-expect-error
                        validationData.brokenRules = validationResult.brokenRules;
                    });
                }
                else if (!validationData.brokenRules || !validationData.brokenRules.length) {
                    validationData.isValid = true;
                }
                this.setDisableApplyValidationResults(false);
            }
            else {
                validationData.isValid = true;
            }
        },
        setValidator: function (validator) {
            this._currentCellValidator = validator;
        },
        renderCellPendingIndicator: function ($container) {
            var $indicator = $container.find("." + PENDING_INDICATOR_CLASS);
            if (!$indicator.length) {
                var $indicatorContainer = $container;
                $indicator = renderer_1.default('<div>').appendTo($indicatorContainer)
                    .addClass(PENDING_INDICATOR_CLASS);
                this._createComponent($indicator, load_indicator_1.default);
                $container.addClass(VALIDATION_PENDING_CLASS);
            }
        },
        disposeCellPendingIndicator: function ($container) {
            var $indicator = $container.find("." + PENDING_INDICATOR_CLASS);
            if ($indicator.length) {
                var indicator = load_indicator_1.default.getInstance($indicator);
                if (indicator) {
                    indicator.dispose();
                    indicator.$element().remove();
                }
                $container.removeClass(VALIDATION_PENDING_CLASS);
            }
        },
        validationStatusChanged: function (result) {
            var validator = result.validator;
            var validationGroup = validator.option('validationGroup');
            var column = validator.option('dataGetter')().column;
            this.updateCellValidationResult({
                rowKey: validationGroup.key,
                columnIndex: column.index,
                validationResult: result,
            });
        },
        validatorInitialized: function (arg) {
            arg.component.on('validating', this.validationStatusChanged.bind(this));
            arg.component.on('validated', this.validationStatusChanged.bind(this));
        },
        validatorDisposing: function (arg) {
            var validator = arg.component;
            var validationGroup = validator.option('validationGroup');
            var column = validator.option('dataGetter')().column;
            var result = this.getCellValidationResult({
                rowKey: validationGroup === null || validationGroup === void 0 ? void 0 : validationGroup.key,
                columnIndex: column.index,
            });
            if (validationResultIsValid(result) && result.status === VALIDATION_STATUS.pending) {
                this.cancelCellValidationResult({
                    change: validationGroup,
                    columnIndex: column.index,
                });
            }
        },
        applyValidationResult: function ($container, result) {
            var validator = result.validator;
            var validationGroup = validator.option('validationGroup');
            var column = validator.option('dataGetter')().column;
            result.brokenRules && result.brokenRules.forEach(function (rule) {
                rule.columnIndex = column.index;
                rule.column = column;
            });
            if ($container) {
                var validationResult = this.getCellValidationResult({
                    rowKey: validationGroup.key,
                    columnIndex: column.index,
                });
                var requestIsDisabled = validationResultIsValid(validationResult) && validationResult.disabledPendingId === result.id;
                if (this._disableApplyValidationResults || requestIsDisabled) {
                    return;
                }
                if (result.status === VALIDATION_STATUS.invalid) {
                    var $focus = $container.find(':focus');
                    if (!selectors_1.focused($focus)) {
                        // @ts-expect-error
                        events_engine_1.default.trigger($focus, 'focus');
                        // @ts-expect-error
                        events_engine_1.default.trigger($focus, pointer_1.default.down);
                    }
                }
                var editor = !column.editCellTemplate && this.getController('editorFactory').getEditorInstance($container);
                if (result.status === VALIDATION_STATUS.pending) {
                    if (editor) {
                        editor.option('validationStatus', VALIDATION_STATUS.pending);
                    }
                    else {
                        this.renderCellPendingIndicator($container);
                    }
                }
                else if (editor) {
                    editor.option('validationStatus', VALIDATION_STATUS.valid);
                }
                else {
                    this.disposeCellPendingIndicator($container);
                }
                $container.toggleClass(this.addWidgetPrefix(INVALIDATE_CLASS), result.status === VALIDATION_STATUS.invalid);
            }
        },
        _syncInternalEditingData: function (parameters) {
            var _a;
            var editingController = this._editingController;
            var change = editingController.getChangeByKey(parameters.key);
            var oldDataFromState = editingController._getOldData(parameters.key);
            var oldData = (_a = parameters.row) === null || _a === void 0 ? void 0 : _a.oldData;
            if (change && oldData && !oldDataFromState) {
                editingController._addInternalData({ key: parameters.key, oldData: oldData });
            }
        },
        createValidator: function (parameters, $container) {
            var _this = this;
            var _a, _b;
            var editingController = this._editingController;
            var column = parameters.column;
            var showEditorAlways = column.showEditorAlways;
            if (type_1.isDefined(column.command) || !column.validationRules || !Array.isArray(column.validationRules) || !column.validationRules.length)
                return;
            var editIndex = editingController.getIndexByKey(parameters.key, editingController.getChanges());
            var needCreateValidator = editIndex > -1;
            if (!needCreateValidator) {
                if (!showEditorAlways) {
                    var columnsController = this.getController('columns');
                    var visibleColumns = (columnsController === null || columnsController === void 0 ? void 0 : columnsController.getVisibleColumns()) || [];
                    showEditorAlways = visibleColumns.some(function (column) { return column.showEditorAlways; });
                }
                var isEditRow = common_1.equalByValue(this.option('editing.editRowKey'), parameters.key);
                var isCellOrBatchEditingAllowed = editingController.isCellOrBatchEditMode() && editingController.allowUpdating({ row: parameters.row });
                needCreateValidator = isEditRow || isCellOrBatchEditingAllowed && showEditorAlways;
                if (isCellOrBatchEditingAllowed && showEditorAlways) {
                    editingController._addInternalData({ key: parameters.key, oldData: (_b = (_a = parameters.row) === null || _a === void 0 ? void 0 : _a.oldData) !== null && _b !== void 0 ? _b : parameters.data });
                }
            }
            if (needCreateValidator) {
                if ($container && !$container.length) {
                    ui_errors_1.default.log('E1050');
                    return;
                }
                this._syncInternalEditingData(parameters);
                var validationData_2 = this._getValidationData(parameters.key, true);
                var getValue = function () {
                    var change = editingController.getChangeByKey(validationData_2 === null || validationData_2 === void 0 ? void 0 : validationData_2.key);
                    var value = column.calculateCellValue((change === null || change === void 0 ? void 0 : change.data) || {});
                    return value !== undefined ? value : parameters.value;
                };
                var useDefaultValidator = $container && $container.hasClass('dx-widget');
                $container && $container.addClass(this.addWidgetPrefix(VALIDATOR_CLASS));
                var validator = new validator_1.default($container || renderer_1.default('<div>'), {
                    name: column.caption,
                    validationRules: extend_1.extend(true, [], column.validationRules),
                    validationGroup: validationData_2,
                    // @ts-expect-error
                    adapter: useDefaultValidator ? null : {
                        getValue: getValue,
                        applyValidationResults: function (result) {
                            _this.applyValidationResult($container, result);
                        },
                    },
                    dataGetter: function () {
                        var key = validationData_2 === null || validationData_2 === void 0 ? void 0 : validationData_2.key;
                        var change = editingController.getChangeByKey(key);
                        var oldData = editingController._getOldData(key);
                        return {
                            data: array_utils_1.createObjectWithChanges(oldData, change === null || change === void 0 ? void 0 : change.data),
                            column: column,
                        };
                    },
                    onInitialized: this.validatorInitialized.bind(this),
                    onDisposing: this.validatorDisposing.bind(this),
                });
                if (useDefaultValidator) {
                    var adapter_1 = validator.option('adapter');
                    if (adapter_1) {
                        var originBypass_1 = adapter_1.bypass;
                        var defaultAdapterBypass_1 = function () { return parameters.row.isNewRow && !_this._isValidationInProgress && !editingController.isCellModified(parameters); };
                        adapter_1.getValue = getValue;
                        adapter_1.validationRequestsCallbacks = [];
                        // @ts-expect-error
                        adapter_1.bypass = function () { return originBypass_1.call(adapter_1) || defaultAdapterBypass_1(); };
                    }
                }
                return validator;
            }
            return undefined;
        },
        setDisableApplyValidationResults: function (flag) {
            this._disableApplyValidationResults = flag;
        },
        getDisableApplyValidationResults: function () {
            return this._disableApplyValidationResults;
        },
        isCurrentValidatorProcessing: function (_a) {
            var rowKey = _a.rowKey, columnIndex = _a.columnIndex;
            return this._currentCellValidator && common_1.equalByValue(this._currentCellValidator.option('validationGroup').key, rowKey)
                && this._currentCellValidator.option('dataGetter')().column.index === columnIndex;
        },
        validateCell: function (validator) {
            var cellParams = {
                rowKey: validator.option('validationGroup').key,
                columnIndex: validator.option('dataGetter')().column.index,
            };
            var validationResult = this.getCellValidationResult(cellParams);
            var stateRestored = validationResultIsValid(validationResult);
            var adapter = validator.option('adapter');
            if (!stateRestored) {
                validationResult = validator.validate();
            }
            else {
                var currentCellValue = adapter.getValue();
                if (!common_1.equalByValue(currentCellValue, validationResult.value)) {
                    validationResult = validator.validate();
                }
            }
            // @ts-expect-error
            var deferred = new deferred_1.Deferred();
            if (stateRestored && validationResult.status === VALIDATION_STATUS.pending) {
                this.updateCellValidationResult(cellParams);
                adapter.applyValidationResults(validationResult);
            }
            deferred_1.when(validationResult.complete || validationResult).done(function (validationResult) {
                stateRestored && adapter.applyValidationResults(validationResult);
                deferred.resolve(validationResult);
            });
            return deferred.promise();
        },
        updateCellValidationResult: function (_a) {
            var rowKey = _a.rowKey, columnIndex = _a.columnIndex, validationResult = _a.validationResult;
            var validationData = this._getValidationData(rowKey);
            if (!validationData) {
                return;
            }
            if (!validationData.validationResults) {
                validationData.validationResults = {};
            }
            var result;
            if (validationResult) {
                result = extend_1.extend({}, validationResult);
                validationData.validationResults[columnIndex] = result;
                if (validationResult.status === VALIDATION_STATUS.pending) {
                    if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
                        // @ts-expect-error
                        result.deferred = new deferred_1.Deferred();
                        result.complete.always(function () {
                            result.deferred.resolve();
                        });
                        this._editingController.addDeferred(result.deferred);
                    }
                    if (this._disableApplyValidationResults) {
                        result.disabledPendingId = validationResult.id;
                        return;
                    }
                }
            }
            else {
                result = validationData.validationResults[columnIndex];
            }
            if (result && result.disabledPendingId) {
                delete result.disabledPendingId;
            }
        },
        getCellValidationResult: function (_a) {
            var _b;
            var rowKey = _a.rowKey, columnIndex = _a.columnIndex;
            var validationData = this._getValidationData(rowKey, true);
            return (_b = validationData === null || validationData === void 0 ? void 0 : validationData.validationResults) === null || _b === void 0 ? void 0 : _b[columnIndex];
        },
        removeCellValidationResult: function (_a) {
            var change = _a.change, columnIndex = _a.columnIndex;
            var validationData = this._getValidationData(change === null || change === void 0 ? void 0 : change.key);
            if (validationData && validationData.validationResults) {
                this.cancelCellValidationResult({ change: change, columnIndex: columnIndex });
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete validationData.validationResults[columnIndex];
            }
        },
        cancelCellValidationResult: function (_a) {
            var change = _a.change, columnIndex = _a.columnIndex;
            var validationData = this._getValidationData(change.key);
            if (change && validationData.validationResults) {
                var result = validationData.validationResults[columnIndex];
                if (result) {
                    result.deferred && result.deferred.reject(VALIDATION_CANCELLED);
                    validationData.validationResults[columnIndex] = VALIDATION_CANCELLED;
                }
            }
        },
        resetRowValidationResults: function (validationData) {
            if (validationData) {
                validationData.validationResults && delete validationData.validationResults;
                delete validationData.validated;
            }
        },
        isInvalidCell: function (_a) {
            var rowKey = _a.rowKey, columnIndex = _a.columnIndex;
            var result = this.getCellValidationResult({
                rowKey: rowKey,
                columnIndex: columnIndex,
            });
            return validationResultIsValid(result) && result.status === VALIDATION_STATUS.invalid;
        },
        getCellValidator: function (_a) {
            var rowKey = _a.rowKey, columnIndex = _a.columnIndex;
            var validationData = this._getValidationData(rowKey);
            var groupConfig = validationData && validation_engine_1.default.getGroupConfig(validationData);
            var validators = groupConfig && groupConfig.validators;
            return validators && validators.filter(function (v) {
                var column = v.option('dataGetter')().column;
                return column ? column.index === columnIndex : false;
            })[0];
        },
        setCellValidationStatus: function (cellOptions) {
            var validationResult = this.getCellValidationResult({
                rowKey: cellOptions.key,
                columnIndex: cellOptions.column.index,
            });
            if (type_1.isDefined(validationResult)) {
                cellOptions.validationStatus = validationResult !== VALIDATION_CANCELLED ? validationResult.status : VALIDATION_CANCELLED;
            }
            else {
                delete cellOptions.validationStatus;
            }
        },
    };
})());
exports.validatingModule = {
    defaultOptions: function () {
        return {
            editing: {
                texts: {
                    validationCancelChanges: message_1.default.format('dxDataGrid-validationCancelChanges'),
                },
            },
        };
    },
    controllers: {
        validating: ValidatingController,
    },
    extenders: {
        controllers: {
            editing: {
                _addChange: function (changeParams) {
                    var change = this.callBase.apply(this, arguments);
                    var validatingController = this.getController('validating');
                    if (change && changeParams.type !== EDIT_DATA_REMOVE_TYPE) {
                        validatingController.updateValidationState(change);
                    }
                    return change;
                },
                _handleChangesChange: function (args) {
                    this.callBase.apply(this, arguments);
                    var validatingController = this.getController('validating');
                    args.value.forEach(function (change) {
                        if (validatingController._getValidationData(change.key) === undefined) {
                            validatingController.updateValidationState(change);
                        }
                    });
                },
                _updateRowAndPageIndices: function () {
                    var _this = this;
                    var that = this;
                    var startInsertIndex = that.getView('rowsView').getTopVisibleItemIndex();
                    var rowIndex = startInsertIndex;
                    iterator_1.each(that.getChanges(), function (_, _a) {
                        var key = _a.key, type = _a.type;
                        var validationData = _this.getController('validating')._getValidationData(key);
                        if (validationData && !validationData.isValid && validationData.pageIndex !== that._pageIndex) {
                            validationData.pageIndex = that._pageIndex;
                            if (type === EDIT_DATA_INSERT_TYPE) {
                                validationData.rowIndex = startInsertIndex;
                            }
                            else {
                                validationData.rowIndex = rowIndex;
                            }
                            rowIndex++;
                        }
                    });
                },
                _getValidationGroupsInForm: function (detailOptions) {
                    var validatingController = this.getController('validating');
                    var validationData = validatingController._getValidationData(detailOptions.key, true);
                    return {
                        validationGroup: validationData,
                    };
                },
                _validateEditFormAfterUpdate: function (row, isCustomSetCellValue) {
                    // T816256, T844143
                    if (isCustomSetCellValue && this._editForm) {
                        this._editForm.validate();
                    }
                    this.callBase.apply(this, arguments);
                },
                _prepareEditCell: function (params) {
                    var isNotCanceled = this.callBase.apply(this, arguments);
                    var validatingController = this.getController('validating');
                    if (isNotCanceled && params.column.showEditorAlways) {
                        validatingController.updateValidationState({ key: params.key });
                    }
                    return isNotCanceled;
                },
                processItems: function (items, changeType) {
                    var _this = this;
                    var changes = this.getChanges();
                    var dataController = this.getController('data');
                    var validatingController = this.getController('validating');
                    var getIndexByChange = function (change, items) {
                        var index = -1;
                        var isInsert = change.type === EDIT_DATA_INSERT_TYPE;
                        var key = change.key;
                        iterator_1.each(items, function (i, item) {
                            if (common_1.equalByValue(key, isInsert ? item.key : dataController.keyOf(item))) {
                                index = i;
                                return false;
                            }
                            return undefined;
                        });
                        return index;
                    };
                    items = this.callBase(items, changeType);
                    var itemsCount = items.length;
                    var addInValidItem = function (change, validationData) {
                        var data = { key: change.key };
                        var index = getIndexByChange(change, items);
                        if (index >= 0) {
                            return;
                        }
                        validationData.rowIndex = validationData.rowIndex > itemsCount ? validationData.rowIndex % itemsCount : validationData.rowIndex;
                        var rowIndex = validationData.rowIndex;
                        data[INSERT_INDEX] = 1;
                        items.splice(rowIndex, 0, data);
                    };
                    if (this.getEditMode() === EDIT_MODE_BATCH && changeType !== 'prepend' && changeType !== 'append') {
                        changes.forEach(function (change) {
                            var key = change.key;
                            var validationData = validatingController._getValidationData(key);
                            if (validationData && change.type && validationData.pageIndex === _this._pageIndex && (change === null || change === void 0 ? void 0 : change.pageIndex) !== _this._pageIndex) {
                                addInValidItem(change, validationData);
                            }
                        });
                    }
                    return items;
                },
                processDataItem: function (item) {
                    var isInserted = item.data[INSERT_INDEX];
                    var key = isInserted ? item.data.key : item.key;
                    var editMode = this.getEditMode();
                    if (editMode === EDIT_MODE_BATCH && isInserted && key) {
                        var changes = this.getChanges();
                        var editIndex = module_utils_1.default.getIndexByKey(key, changes);
                        if (editIndex >= 0) {
                            var change = changes[editIndex];
                            if (change.type !== EDIT_DATA_INSERT_TYPE) {
                                var oldData = this._getOldData(change.key);
                                item.data = extend_1.extend(true, {}, oldData, change.data);
                                item.key = key;
                            }
                        }
                    }
                    this.callBase.apply(this, arguments);
                },
                _createInvisibleColumnValidators: function (changes) {
                    var _this = this;
                    var that = this;
                    var validatingController = this.getController('validating');
                    var columnsController = this.getController('columns');
                    var columns = columnsController.getColumns();
                    var invisibleColumns = columnsController.getInvisibleColumns().filter(function (column) { return !column.isBand; });
                    var groupColumns = columnsController.getGroupColumns().filter(function (column) { return !column.showWhenGrouped && invisibleColumns.indexOf(column) === -1; });
                    var invisibleColumnValidators = [];
                    var isCellVisible = function (column, rowKey) { return _this._dataController.getRowIndexByKey(rowKey) >= 0 && invisibleColumns.indexOf(column) < 0; };
                    invisibleColumns.push.apply(invisibleColumns, groupColumns);
                    if (!FORM_BASED_MODES.includes(this.getEditMode())) {
                        iterator_1.each(columns, function (_, column) {
                            changes.forEach(function (change) {
                                var data;
                                if (isCellVisible(column, change.key)) {
                                    return;
                                }
                                if (change.type === EDIT_DATA_INSERT_TYPE) {
                                    data = change.data;
                                }
                                else if (change.type === 'update') {
                                    var oldData = that._getOldData(change.key);
                                    data = array_utils_1.createObjectWithChanges(oldData, change.data);
                                }
                                if (data) {
                                    var validator = validatingController.createValidator({
                                        column: column,
                                        key: change.key,
                                        value: column.calculateCellValue(data),
                                    });
                                    if (validator) {
                                        invisibleColumnValidators.push(validator);
                                    }
                                }
                            });
                        });
                    }
                    return function () {
                        invisibleColumnValidators.forEach(function (validator) { validator.dispose(); });
                    };
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _beforeSaveEditData: function (change, editIndex) {
                    var _this = this;
                    var result = this.callBase.apply(this, arguments);
                    var validatingController = this.getController('validating');
                    var validationData = validatingController._getValidationData(change === null || change === void 0 ? void 0 : change.key);
                    if (change) {
                        var isValid = change.type === 'remove' || validationData.isValid;
                        result = result || !isValid;
                    }
                    else {
                        var disposeValidators_1 = this._createInvisibleColumnValidators(this.getChanges());
                        // @ts-expect-error
                        result = new deferred_1.Deferred();
                        this.executeOperation(result, function () {
                            validatingController.validate(true).done(function (isFullValid) {
                                disposeValidators_1();
                                _this._updateRowAndPageIndices();
                                // eslint-disable-next-line default-case
                                switch (_this.getEditMode()) {
                                    case EDIT_MODE_CELL:
                                        if (!isFullValid) {
                                            _this._focusEditingCell();
                                        }
                                        break;
                                    case EDIT_MODE_BATCH:
                                        if (!isFullValid) {
                                            _this._resetEditRowKey();
                                            _this._resetEditColumnName();
                                            _this.getController('data').updateItems();
                                        }
                                        break;
                                }
                                result.resolve(!isFullValid);
                            });
                        });
                    }
                    return result.promise ? result.promise() : result;
                },
                _beforeEditCell: function (rowIndex, columnIndex, item) {
                    var result = this.callBase(rowIndex, columnIndex, item);
                    if (this.getEditMode() === EDIT_MODE_CELL) {
                        var $cell = this._rowsView._getCellElement(rowIndex, columnIndex);
                        var validator = $cell && $cell.data('dxValidator');
                        var rowOptions = $cell && $cell.closest('.dx-row').data('options');
                        var value = validator && validator.option('adapter').getValue();
                        if (validator && cellValueShouldBeValidated(value, rowOptions)) {
                            var validatingController = this.getController('validating');
                            // @ts-expect-error
                            var deferred_2 = new deferred_1.Deferred();
                            deferred_1.when(validatingController.validateCell(validator), result).done(function (validationResult, result) {
                                deferred_2.resolve(validationResult.status === VALIDATION_STATUS.valid && result);
                            });
                            return deferred_2.promise();
                        }
                        if (!validator) {
                            return result;
                        }
                    }
                },
                _afterSaveEditData: function (cancel) {
                    var _this = this;
                    var $firstErrorRow;
                    var isCellEditMode = this.getEditMode() === EDIT_MODE_CELL;
                    iterator_1.each(this.getChanges(), function (_, change) {
                        var $errorRow = _this._showErrorRow(change);
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
                            rowIndices: [editRowIndex],
                        });
                        this._focusEditingCell();
                    }
                    else if (!cancel) {
                        var shouldResetValidationState = true;
                        if (isCellEditMode) {
                            var columns = this.getController('columns').getColumns();
                            var columnsWithValidatingEditors = columns.filter(function (col) { var _a; return col.showEditorAlways && ((_a = col.validationRules) === null || _a === void 0 ? void 0 : _a.length) > 0; }).length > 0;
                            shouldResetValidationState = !columnsWithValidatingEditors;
                        }
                        if (shouldResetValidationState) {
                            this.getController('validating').initValidationState();
                        }
                    }
                },
                _handleDataChanged: function (args) {
                    var validationState = this.getController('validating')._validationState;
                    if (this.option('scrolling.mode') === 'standard') {
                        this.resetRowAndPageIndices();
                    }
                    if (args.changeType === 'prepend') {
                        iterator_1.each(validationState, function (_, validationData) {
                            validationData.rowIndex += args.items.length;
                        });
                    }
                    this.callBase(args);
                },
                resetRowAndPageIndices: function () {
                    var _this = this;
                    var validationState = this.getController('validating')._validationState;
                    iterator_1.each(validationState, function (_, validationData) {
                        if (validationData.pageIndex !== _this._pageIndex) {
                            delete validationData.pageIndex;
                            delete validationData.rowIndex;
                        }
                    });
                },
                _beforeCancelEditData: function () {
                    this.getController('validating').initValidationState();
                    this.callBase();
                },
                _showErrorRow: function (change) {
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
                updateFieldValue: function (e) {
                    var _this = this;
                    var validatingController = this.getController('validating');
                    // @ts-expect-error
                    var deferred = new deferred_1.Deferred();
                    validatingController.removeCellValidationResult({
                        change: this.getChangeByKey(e.key),
                        columnIndex: e.column.index,
                    });
                    this.callBase.apply(this, arguments).done(function () {
                        var currentValidator = validatingController.getCellValidator({
                            rowKey: e.key,
                            columnIndex: e.column.index,
                        });
                        deferred_1.when(currentValidator && validatingController.validateCell(currentValidator))
                            .done(function (validationResult) {
                            _this.getController('editorFactory').refocus();
                            deferred.resolve(validationResult);
                        });
                    });
                    return deferred.promise();
                },
                highlightDataCell: function ($cell, parameters) {
                    this.callBase.apply(this, arguments);
                    var validatingController = this.getController('validating');
                    validatingController.setCellValidationStatus(parameters);
                    var isEditableCell = !!parameters.setValue;
                    var cellModified = this.isCellModified(parameters);
                    var isValidated = type_1.isDefined(parameters.validationStatus);
                    var needValidation = (cellModified && parameters.column.setCellValue) || (isEditableCell && !cellModified && !(parameters.row.isNewRow || !isValidated));
                    if (needValidation) {
                        var validator = $cell.data('dxValidator');
                        if (validator) {
                            deferred_1.when(this.getController('validating').validateCell(validator)).done(function () {
                                validatingController.setCellValidationStatus(parameters);
                            });
                        }
                    }
                },
                getChangeByKey: function (key) {
                    var changes = this.getChanges();
                    return changes[module_utils_1.default.getIndexByKey(key, changes)];
                },
                isCellModified: function (parameters) {
                    var cellModified = this.callBase(parameters);
                    var change = this.getChangeByKey(parameters.key);
                    var isCellInvalid = !!parameters.row && this.getController('validating').isInvalidCell({
                        rowKey: parameters.key,
                        columnIndex: parameters.column.index,
                    });
                    return cellModified || (this.getController('validating')._rowIsValidated(change) && isCellInvalid);
                },
            },
            editorFactory: (function () {
                var getWidthOfVisibleCells = function (that, element) {
                    var rowIndex = renderer_1.default(element).closest('tr').index();
                    var $cellElements = renderer_1.default(that._rowsView.getRowElement(rowIndex)).first().children().filter(':not(.dx-hidden-cell)');
                    return that._rowsView._getWidths($cellElements).reduce(function (w1, w2) { return w1 + w2; }, 0);
                };
                var getBoundaryNonFixedColumnsInfo = function (fixedColumns) {
                    var firstNonFixedColumnIndex;
                    var lastNonFixedColumnIndex;
                    // eslint-disable-next-line array-callback-return
                    fixedColumns.some(function (column, index) {
                        if (column.command === COMMAND_TRANSPARENT) {
                            firstNonFixedColumnIndex = index === 0 ? -1 : index;
                            lastNonFixedColumnIndex = index === fixedColumns.length - 1 ? -1 : index + column.colspan - 1;
                            return true;
                        }
                        return undefined;
                    });
                    return {
                        startColumnIndex: firstNonFixedColumnIndex,
                        endColumnIndex: lastNonFixedColumnIndex,
                    };
                };
                return {
                    _showRevertButton: function ($container) {
                        var _this = this;
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
                        var $overlayContainer = $container.closest("." + this.addWidgetPrefix(CONTENT_CLASS));
                        $tooltipElement === null || $tooltipElement === void 0 ? void 0 : $tooltipElement.remove();
                        $tooltipElement = renderer_1.default('<div>')
                            .addClass(this.addWidgetPrefix(REVERT_TOOLTIP_CLASS))
                            .appendTo($container);
                        var tooltipOptions = {
                            animation: null,
                            visible: true,
                            width: 'auto',
                            height: 'auto',
                            shading: false,
                            container: $overlayContainer,
                            propagateOutsideClick: true,
                            hideOnOutsideClick: false,
                            copyRootClassesToWrapper: true,
                            _ignoreCopyRootClassesToWrapperDeprecation: true,
                            contentTemplate: function () {
                                var $buttonElement = renderer_1.default('<div>').addClass(REVERT_BUTTON_CLASS);
                                var buttonOptions = {
                                    icon: 'revert',
                                    hint: _this.option('editing.texts.validationCancelChanges'),
                                    onClick: function () {
                                        _this._editingController.cancelEditData();
                                    },
                                };
                                // @ts-expect-error
                                return new button_1.default($buttonElement, buttonOptions).$element();
                            },
                            position: {
                                my: 'left top',
                                at: 'right top',
                                offset: '1 0',
                                collision: 'flip',
                                boundaryOffset: '0 0',
                                boundary: this._rowsView.element(),
                                of: $container,
                            },
                            onPositioned: this._positionedHandler.bind(this),
                        };
                        this._revertTooltip = new ui_overlay_1.default($tooltipElement, tooltipOptions);
                    },
                    _hideFixedGroupCell: function ($cell, overlayOptions) {
                        var $nextFixedRowElement;
                        var $groupCellElement;
                        var isFixedColumns = this._rowsView.isFixedColumns();
                        var isFormOrPopupEditMode = this._editingController.isFormOrPopupEditMode();
                        if (isFixedColumns && !isFormOrPopupEditMode) {
                            var nextRowOptions = $cell.closest('.dx-row').next().data('options');
                            if (nextRowOptions && nextRowOptions.rowType === 'group') {
                                $nextFixedRowElement = renderer_1.default(this._rowsView.getRowElement(nextRowOptions.rowIndex)).last();
                                $groupCellElement = $nextFixedRowElement.find("." + GROUP_CELL_CLASS);
                                if ($groupCellElement.length && $groupCellElement.get(0).style.visibility !== 'hidden') {
                                    $groupCellElement.css('visibility', 'hidden');
                                    overlayOptions.onDisposing = function () {
                                        $groupCellElement.css('visibility', '');
                                    };
                                }
                            }
                        }
                    },
                    _positionedHandler: function (e, isOverlayVisible) {
                        if (!e.component.__skipPositionProcessing) {
                            var isRevertButton = renderer_1.default(e.element).hasClass(this.addWidgetPrefix(REVERT_TOOLTIP_CLASS));
                            var needRepaint = !isRevertButton && this._rowsView.updateFreeSpaceRowHeight();
                            var normalizedPosition = this._normalizeValidationMessagePositionAndMaxWidth(e, isRevertButton, isOverlayVisible);
                            e.component.__skipPositionProcessing = !!(needRepaint || normalizedPosition);
                            if (normalizedPosition) {
                                e.component.option(normalizedPosition);
                            }
                            else if (needRepaint) {
                                e.component.repaint();
                            }
                        }
                    },
                    _showValidationMessage: function ($cell, messages, alignment) {
                        var _this = this;
                        var editorPopup = $cell.find('.dx-dropdowneditor-overlay').data('dxPopup');
                        var isOverlayVisible = editorPopup && editorPopup.option('visible');
                        var myPosition = isOverlayVisible ? 'top right' : "top " + alignment;
                        var atPosition = isOverlayVisible ? 'top left' : "bottom " + alignment;
                        var $overlayContainer = $cell.closest("." + this.addWidgetPrefix(CONTENT_CLASS));
                        var errorMessageText = '';
                        messages && messages.forEach(function (message) {
                            errorMessageText += (errorMessageText.length ? '<br/>' : '') + string_1.encodeHtml(message);
                        });
                        var invalidMessageClass = this.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS);
                        this._rowsView.element().find("." + invalidMessageClass).remove();
                        var $overlayElement = renderer_1.default('<div>')
                            .addClass(INVALID_MESSAGE_CLASS)
                            .addClass(INVALID_MESSAGE_ALWAYS_CLASS)
                            .addClass(invalidMessageClass)
                            .html(errorMessageText)
                            .appendTo($cell);
                        var overlayOptions = {
                            container: $overlayContainer,
                            shading: false,
                            width: 'auto',
                            height: 'auto',
                            visible: true,
                            animation: false,
                            propagateOutsideClick: true,
                            hideOnOutsideClick: false,
                            copyRootClassesToWrapper: true,
                            _ignoreCopyRootClassesToWrapperDeprecation: true,
                            position: {
                                collision: 'flip',
                                boundary: this._rowsView.element(),
                                boundaryOffset: '0 0',
                                offset: {
                                    x: 0,
                                    // Firefox consider the top row/cell border when calculating a cell offset.
                                    y: !isOverlayVisible && browser_1.default.mozilla ? -1 : 0,
                                },
                                my: myPosition,
                                at: atPosition,
                                of: $cell,
                            },
                            onPositioned: function (e) {
                                _this._positionedHandler(e, isOverlayVisible);
                                _this._shiftValidationMessageIfNeed(e.component.$content(), $cell);
                            },
                        };
                        this._hideFixedGroupCell($cell, overlayOptions);
                        // eslint-disable-next-line no-new
                        new ui_overlay_1.default($overlayElement, overlayOptions);
                    },
                    _hideValidationMessage: function () {
                        var _a;
                        var validationMessages = (_a = this._rowsView.element()) === null || _a === void 0 ? void 0 : _a.find(this._getValidationMessagesSelector());
                        validationMessages === null || validationMessages === void 0 ? void 0 : validationMessages.remove();
                    },
                    _normalizeValidationMessagePositionAndMaxWidth: function (options, isRevertButton, isOverlayVisible) {
                        var fixedColumns = this._columnsController.getFixedColumns();
                        if (!fixedColumns || !fixedColumns.length) {
                            return;
                        }
                        var position;
                        var visibleTableWidth = !isRevertButton && getWidthOfVisibleCells(this, options.element);
                        var $overlayContentElement = options.component.$content();
                        var validationMessageWidth = size_1.getOuterWidth($overlayContentElement, true);
                        var needMaxWidth = !isRevertButton && validationMessageWidth > visibleTableWidth;
                        var columnIndex = this._rowsView.getCellIndex(renderer_1.default(options.element).closest('td'));
                        var boundaryNonFixedColumnsInfo = getBoundaryNonFixedColumnsInfo(fixedColumns);
                        if (!isRevertButton && (columnIndex === boundaryNonFixedColumnsInfo.startColumnIndex || needMaxWidth)) {
                            position = {
                                collision: 'none flip',
                                my: 'top left',
                                at: isOverlayVisible ? 'top right' : 'bottom left',
                            };
                        }
                        else if (columnIndex === boundaryNonFixedColumnsInfo.endColumnIndex) {
                            position = {
                                collision: 'none flip',
                                my: 'top right',
                                at: isRevertButton || isOverlayVisible ? 'top left' : 'bottom right',
                            };
                            if (isRevertButton) {
                                position.offset = '-1 0';
                            }
                        }
                        return position && { position: position, maxWidth: needMaxWidth ? visibleTableWidth - 2 : undefined };
                    },
                    _shiftValidationMessageIfNeed: function ($content, $cell) {
                        var $revertContent = this._revertTooltip && this._revertTooltip.$content();
                        if (!$revertContent)
                            return;
                        var contentOffset = $content.offset();
                        var revertContentOffset = $revertContent.offset();
                        if (contentOffset.top === revertContentOffset.top && contentOffset.left + size_1.getWidth($content) > revertContentOffset.left) {
                            var left = size_1.getWidth($revertContent) + PADDING_BETWEEN_TOOLTIPS;
                            $content.css('left', revertContentOffset.left < $cell.offset().left ? -left : left);
                        }
                    },
                    _getRevertTooltipsSelector: function () {
                        var revertTooltipClass = this.addWidgetPrefix(REVERT_TOOLTIP_CLASS);
                        return ".dx-editor-cell ." + revertTooltipClass;
                    },
                    _getValidationMessagesSelector: function () {
                        var invalidMessageClass = this.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS);
                        return ".dx-editor-cell ." + invalidMessageClass + ", .dx-cell-modified ." + invalidMessageClass;
                    },
                    init: function () {
                        this.callBase();
                        this._editingController = this.getController('editing');
                        this._columnsController = this.getController('columns');
                        this._rowsView = this.getView('rowsView');
                    },
                    loseFocus: function (skipValidator) {
                        if (!skipValidator) {
                            this.getController('validating').setValidator(null);
                        }
                        this.callBase();
                    },
                    updateCellState: function ($element, validationResult, isHideBorder) {
                        var _a;
                        var $focus = $element === null || $element === void 0 ? void 0 : $element.closest(this._getFocusCellSelector());
                        var $cell = ($focus === null || $focus === void 0 ? void 0 : $focus.is('td')) ? $focus : null;
                        var rowOptions = $focus === null || $focus === void 0 ? void 0 : $focus.closest('.dx-row').data('options');
                        var change = rowOptions ? this.getController('editing').getChangeByKey(rowOptions.key) : null;
                        var column = $cell && this.getController('columns').getVisibleColumns()[$cell.index()];
                        var isCellModified = (((_a = change === null || change === void 0 ? void 0 : change.data) === null || _a === void 0 ? void 0 : _a[column === null || column === void 0 ? void 0 : column.name]) !== undefined) && !this._editingController.isSaving();
                        if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
                            if (((validationResult === null || validationResult === void 0 ? void 0 : validationResult.status) === VALIDATION_STATUS.invalid) || isCellModified) {
                                this._showRevertButton($focus);
                            }
                            else {
                                this._revertTooltip && this._revertTooltip.$element().remove();
                            }
                        }
                        var showValidationMessage = validationResult && validationResult.status === VALIDATION_STATUS.invalid;
                        if (showValidationMessage && $cell && column && validationResult && validationResult.brokenRules) {
                            var errorMessages_1 = [];
                            validationResult.brokenRules.forEach(function (rule) {
                                if (rule.message) {
                                    errorMessages_1.push(rule.message);
                                }
                            });
                            if (errorMessages_1.length) {
                                this._showValidationMessage($focus, errorMessages_1, column.alignment || 'left');
                            }
                        }
                        !isHideBorder && this._rowsView.element() && this._rowsView.updateFreeSpaceRowHeight();
                    },
                    focus: function ($element, isHideBorder) {
                        var _this = this;
                        if (!arguments.length)
                            return this.callBase();
                        this._hideValidationMessage();
                        if (($element === null || $element === void 0 ? void 0 : $element.hasClass('dx-row')) || ($element === null || $element === void 0 ? void 0 : $element.hasClass('dx-master-detail-cell'))) {
                            return this.callBase($element, isHideBorder);
                        }
                        var $focus = $element === null || $element === void 0 ? void 0 : $element.closest(this._getFocusCellSelector());
                        var callBase = this.callBase;
                        var validator = $focus && ($focus.data('dxValidator') || $element.find("." + this.addWidgetPrefix(VALIDATOR_CLASS)).eq(0).data('dxValidator'));
                        var rowOptions = $focus && $focus.closest('.dx-row').data('options');
                        var editingController = this.getController('editing');
                        var change = rowOptions ? editingController.getChangeByKey(rowOptions.key) : null;
                        var validatingController = this.getController('validating');
                        var validationResult;
                        if (validator) {
                            validatingController.setValidator(validator);
                            var value = validator.option('adapter').getValue();
                            if (cellValueShouldBeValidated(value, rowOptions) || validatingController._rowIsValidated(change)) {
                                editingController.waitForDeferredOperations().done(function () {
                                    deferred_1.when(validatingController.validateCell(validator)).done(function (result) {
                                        validationResult = result;
                                        var column = validationResult.validator.option('dataGetter')().column;
                                        if (change && column && !validatingController.isCurrentValidatorProcessing({ rowKey: change.key, columnIndex: column.index })) {
                                            return;
                                        }
                                        if (validationResult.status === VALIDATION_STATUS.invalid) {
                                            isHideBorder = true;
                                        }
                                        _this.updateCellState($element, validationResult, isHideBorder);
                                        callBase.call(_this, $element, isHideBorder);
                                    });
                                });
                                return this.callBase($element, isHideBorder);
                            }
                        }
                        this.updateCellState($element, validationResult, isHideBorder);
                        return this.callBase($element, isHideBorder);
                    },
                    getEditorInstance: function ($container) {
                        var $editor = $container.find('.dx-texteditor').eq(0);
                        return module_utils_1.default.getWidgetInstance($editor);
                    },
                };
            }()),
            data: {
                _getValidationStatus: function (validationResult) {
                    var validationStatus = validationResultIsValid(validationResult) ? validationResult.status : validationResult;
                    return validationStatus || VALIDATION_STATUS.valid;
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _isCellChanged: function (oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
                    var _a, _b;
                    var cell = (_a = oldRow.cells) === null || _a === void 0 ? void 0 : _a[columnIndex];
                    var oldValidationStatus = this._getValidationStatus({ status: cell === null || cell === void 0 ? void 0 : cell.validationStatus });
                    var validatingController = this.getController('validating');
                    var validationResult = validatingController.getCellValidationResult({
                        rowKey: oldRow.key,
                        columnIndex: columnIndex,
                    });
                    var validationData = validatingController._getValidationData(oldRow.key);
                    var newValidationStatus = this._getValidationStatus(validationResult);
                    var rowIsModified = JSON.stringify(newRow.modifiedValues) !== JSON.stringify(oldRow.modifiedValues);
                    var validationStatusChanged = oldValidationStatus !== newValidationStatus && rowIsModified;
                    var cellIsMarkedAsInvalid = renderer_1.default(cell === null || cell === void 0 ? void 0 : cell.cellElement).hasClass(this.addWidgetPrefix(INVALIDATE_CLASS));
                    var hasValidationRules = (_b = cell === null || cell === void 0 ? void 0 : cell.column.validationRules) === null || _b === void 0 ? void 0 : _b.length;
                    var rowEditStateChanged = oldRow.isEditing !== newRow.isEditing && hasValidationRules;
                    var cellValidationStateChanged = validationStatusChanged || validationData.isValid && cellIsMarkedAsInvalid;
                    if (rowEditStateChanged || cellValidationStateChanged) {
                        return true;
                    }
                    return this.callBase.apply(this, arguments);
                },
            },
        },
        views: {
            rowsView: {
                updateFreeSpaceRowHeight: function ($table) {
                    var that = this;
                    var $rowElements;
                    var $freeSpaceRowElement;
                    var $freeSpaceRowElements;
                    var $element = that.element();
                    var $tooltipContent = $element && $element.find("." + that.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS) + " .dx-overlay-content");
                    that.callBase($table);
                    if ($tooltipContent && $tooltipContent.length) {
                        $rowElements = that._getRowElements();
                        $freeSpaceRowElements = that._getFreeSpaceRowElements($table);
                        $freeSpaceRowElement = $freeSpaceRowElements.first();
                        if ($freeSpaceRowElement && $rowElements.length === 1 && (!$freeSpaceRowElement.is(':visible') || size_1.getOuterHeight($tooltipContent) > size_1.getOuterHeight($freeSpaceRowElement))) {
                            $freeSpaceRowElements.show();
                            size_1.setHeight($freeSpaceRowElements, size_1.getOuterHeight($tooltipContent));
                            return true;
                        }
                    }
                    return undefined;
                },
                _formItemPrepared: function (cellOptions, $container) {
                    var _this = this;
                    this.callBase.apply(this, arguments);
                    common_1.deferUpdate(function () {
                        var $editor = $container.find('.dx-widget').first();
                        var isEditorDisposed = $editor.length && !$editor.children().length;
                        // T736360
                        if (!isEditorDisposed) {
                            _this.getController('validating').createValidator(cellOptions, $editor);
                        }
                    });
                },
                _cellPrepared: function ($cell, parameters) {
                    if (!this.getController('editing').isFormOrPopupEditMode()) {
                        this.getController('validating').createValidator(parameters, $cell);
                    }
                    this.callBase.apply(this, arguments);
                },
                _restoreErrorRow: function (contentTable) {
                    var editingController = this.getController('editing');
                    editingController && editingController.hasChanges() && this._getRowElements(contentTable).each(function (_, item) {
                        var rowOptions = renderer_1.default(item).data('options');
                        if (rowOptions) {
                            // @ts-expect-error
                            var change = editingController.getChangeByKey(rowOptions.key);
                            change && editingController._showErrorRow(change);
                        }
                    });
                },
            },
        },
    },
};
