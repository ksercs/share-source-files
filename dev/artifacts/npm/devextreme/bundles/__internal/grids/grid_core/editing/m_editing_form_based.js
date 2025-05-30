/**
* DevExtreme (bundles/__internal/grids/grid_core/editing/m_editing_form_based.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editingFormBasedModule = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _guid = _interopRequireDefault(require("../../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _dom = require("../../../../core/utils/dom");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _button = _interopRequireDefault(require("../../../../ui/button"));
var _form = _interopRequireDefault(require("../../../../ui/form"));
var _ui = _interopRequireDefault(require("../../../../ui/popup/ui.popup"));
var _ui2 = _interopRequireDefault(require("../../../../ui/scroll_view/ui.scrollable"));
var _const = require("./const");
var _m_editing_utils = require("./m_editing_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var editingControllerExtender = function editingControllerExtender(Base) {
  return /*#__PURE__*/function (_Base) {
    _inheritsLoose(FormBasedEditingControllerExtender, _Base);
    function FormBasedEditingControllerExtender() {
      return _Base.apply(this, arguments) || this;
    }
    var _proto = FormBasedEditingControllerExtender.prototype;
    _proto.init = function init() {
      this._editForm = null;
      this._updateEditFormDeferred = null;
      _Base.prototype.init.call(this);
    };
    _proto.isFormOrPopupEditMode = function isFormOrPopupEditMode() {
      return this.isPopupEditMode() || this.isFormEditMode();
    };
    _proto.isPopupEditMode = function isPopupEditMode() {
      var editMode = this.option('editing.mode');
      return editMode === _const.EDIT_MODE_POPUP;
    };
    _proto.isFormEditMode = function isFormEditMode() {
      var editMode = this.option('editing.mode');
      return editMode === _const.EDIT_MODE_FORM;
    };
    _proto.getFirstEditableColumnIndex = function getFirstEditableColumnIndex() {
      var firstFormItem = this._firstFormItem;
      if (this.isFormEditMode() && firstFormItem) {
        var editRowKey = this.option(_const.EDITING_EDITROWKEY_OPTION_NAME);
        var editRowIndex = this._dataController.getRowIndexByKey(editRowKey);
        var $editFormElements = this._rowsView.getCellElements(editRowIndex);
        return this._rowsView._getEditFormEditorVisibleIndex($editFormElements, firstFormItem.column);
      }
      return _Base.prototype.getFirstEditableColumnIndex.call(this);
    };
    _proto.getEditFormRowIndex = function getEditFormRowIndex() {
      return this.isFormOrPopupEditMode() ? this._getVisibleEditRowIndex() : _Base.prototype.getEditFormRowIndex.call(this);
    };
    _proto._isEditColumnVisible = function _isEditColumnVisible() {
      var result = _Base.prototype._isEditColumnVisible.call(this);
      var editingOptions = this.option('editing');
      return this.isFormOrPopupEditMode() ? editingOptions.allowUpdating || result : result;
    };
    _proto._handleDataChanged = function _handleDataChanged(args) {
      var _a, _b;
      if (this.isPopupEditMode()) {
        var editRowKey = this.option('editing.editRowKey');
        var hasEditRow = (_a = args === null || args === void 0 ? void 0 : args.items) === null || _a === void 0 ? void 0 : _a.some(function (item) {
          return (0, _common.equalByValue)(item.key, editRowKey);
        });
        var onlyInsertChanges = ((_b = args.changeTypes) === null || _b === void 0 ? void 0 : _b.length) && args.changeTypes.every(function (item) {
          return item === 'insert';
        });
        if ((args.changeType === 'refresh' || hasEditRow && args.isOptionChanged) && !onlyInsertChanges) {
          this._repaintEditPopup();
        }
      }
      _Base.prototype._handleDataChanged.call(this, args);
    };
    _proto.getPopupContent = function getPopupContent() {
      var _a;
      var popupVisible = (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.option('visible');
      if (this.isPopupEditMode() && popupVisible) {
        return this._$popupContent;
      }
    };
    _proto._showAddedRow = function _showAddedRow(rowIndex) {
      if (this.isPopupEditMode()) {
        this._showEditPopup(rowIndex);
      } else {
        _Base.prototype._showAddedRow.call(this, rowIndex);
      }
    };
    _proto._cancelEditDataCore = function _cancelEditDataCore() {
      _Base.prototype._cancelEditDataCore.call(this);
      if (this.isPopupEditMode()) {
        this._hideEditPopup();
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ;
    _proto._updateEditRowCore = function _updateEditRowCore(row, skipCurrentRow, isCustomSetCellValue) {
      var _a;
      var editForm = this._editForm;
      if (this.isPopupEditMode()) {
        if (this.option('repaintChangesOnly')) {
          (_a = row.update) === null || _a === void 0 ? void 0 : _a.call(row, row);
          this._rowsView.renderDelayedTemplates();
        } else if (editForm) {
          // @ts-expect-error
          this._updateEditFormDeferred = new _deferred.Deferred().done(function () {
            return editForm.repaint();
          });
          if (!this._updateLockCount) {
            this._updateEditFormDeferred.resolve();
          }
        }
      } else {
        _Base.prototype._updateEditRowCore.call(this, row, skipCurrentRow, isCustomSetCellValue);
      }
    };
    _proto._showEditPopup = function _showEditPopup(rowIndex, repaintForm) {
      var _this = this;
      var isMobileDevice = _devices.default.current().deviceType !== 'desktop';
      var editPopupClass = this.addWidgetPrefix(_const.EDIT_POPUP_CLASS);
      var popupOptions = (0, _extend.extend)({
        showTitle: false,
        fullScreen: isMobileDevice,
        wrapperAttr: {
          class: editPopupClass
        },
        toolbarItems: [{
          toolbar: 'bottom',
          location: 'after',
          widget: 'dxButton',
          options: this._getSaveButtonConfig()
        }, {
          toolbar: 'bottom',
          location: 'after',
          widget: 'dxButton',
          options: this._getCancelButtonConfig()
        }],
        contentTemplate: this._getPopupEditFormTemplate(rowIndex)
      }, this.option(_const.EDITING_POPUP_OPTION_NAME));
      if (!this._editPopup) {
        var $popupContainer = (0, _renderer.default)('<div>').appendTo(this.component.$element()).addClass(editPopupClass);
        // @ts-expect-error
        this._editPopup = this._createComponent($popupContainer, _ui.default);
        this._editPopup.on('hiding', this._getEditPopupHiddenHandler());
        this._editPopup.on('shown', function (e) {
          var _a;
          _events_engine.default.trigger(e.component.$content().find(_const.FOCUSABLE_ELEMENT_SELECTOR).not(".".concat(_const.FOCUSABLE_ELEMENT_CLASS)).first(), 'focus');
          if (repaintForm) {
            (_a = _this._editForm) === null || _a === void 0 ? void 0 : _a.repaint();
          }
        });
      }
      this._editPopup.option(popupOptions);
      this._editPopup.show();
      _Base.prototype._showEditPopup.call(this, rowIndex, repaintForm);
    };
    _proto._getPopupEditFormTemplate = function _getPopupEditFormTemplate(rowIndex) {
      var _this2 = this;
      // @ts-expect-error
      var row = this.component.getVisibleRows()[rowIndex];
      var templateOptions = {
        row,
        values: row.values,
        rowType: row.rowType,
        key: row.key,
        rowIndex
      };
      this._rowsView._addWatchMethod(templateOptions, row);
      return function (container) {
        var formTemplate = _this2.getEditFormTemplate();
        // @ts-expect-error
        var scrollable = _this2._createComponent((0, _renderer.default)('<div>').appendTo(container), _ui2.default);
        _this2._$popupContent = (0, _renderer.default)(scrollable.content());
        formTemplate(_this2._$popupContent, templateOptions, {
          isPopupForm: true
        });
        _this2._rowsView.renderDelayedTemplates();
        (0, _renderer.default)(container).parent().attr('aria-label', _this2.localize('dxDataGrid-ariaEditForm'));
      };
    };
    _proto._repaintEditPopup = function _repaintEditPopup() {
      var _a, _b;
      var rowIndex = this._getVisibleEditRowIndex();
      if (rowIndex >= 0) {
        var defaultAnimation = (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.option('animation');
        (_b = this._editPopup) === null || _b === void 0 ? void 0 : _b.option('animation', null);
        this._showEditPopup(rowIndex, true);
        if (defaultAnimation !== undefined) {
          this._editPopup.option('animation', defaultAnimation);
        }
      }
    };
    _proto._hideEditPopup = function _hideEditPopup() {
      var _a;
      (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.option('visible', false);
    };
    _proto.optionChanged = function optionChanged(args) {
      if (args.name === 'editing' && this.isFormOrPopupEditMode()) {
        var fullName = args.fullName;
        if (fullName.indexOf(_const.EDITING_FORM_OPTION_NAME) === 0) {
          this._handleFormOptionChange(args);
          args.handled = true;
        } else if (fullName.indexOf(_const.EDITING_POPUP_OPTION_NAME) === 0) {
          this._handlePopupOptionChange(args);
          args.handled = true;
        }
      }
      _Base.prototype.optionChanged.call(this, args);
    };
    _proto._handleFormOptionChange = function _handleFormOptionChange(args) {
      var _a;
      if (this.isFormEditMode()) {
        var editRowIndex = this._getVisibleEditRowIndex();
        if (editRowIndex >= 0) {
          this._dataController.updateItems({
            changeType: 'update',
            rowIndices: [editRowIndex]
          });
        }
      } else if (((_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.option('visible')) && args.fullName.indexOf(_const.EDITING_FORM_OPTION_NAME) === 0) {
        this._repaintEditPopup();
      }
    };
    _proto._handlePopupOptionChange = function _handlePopupOptionChange(args) {
      var editPopup = this._editPopup;
      if (editPopup) {
        var popupOptionName = args.fullName.slice(_const.EDITING_POPUP_OPTION_NAME.length + 1);
        if (popupOptionName) {
          editPopup.option(popupOptionName, args.value);
        } else {
          editPopup.option(args.value);
        }
      }
    };
    _proto.renderFormEditorTemplate = function renderFormEditorTemplate(detailCellOptions, item, formTemplateOptions, container, isReadOnly) {
      var _this3 = this;
      var that = this;
      var $container = (0, _renderer.default)(container);
      var column = item.column;
      var editorType = (0, _m_editing_utils.getEditorType)(item);
      var rowData = detailCellOptions === null || detailCellOptions === void 0 ? void 0 : detailCellOptions.row.data;
      var form = formTemplateOptions.component;
      var _ref = formTemplateOptions.editorOptions || {},
        label = _ref.label,
        labelMark = _ref.labelMark,
        labelMode = _ref.labelMode;
      var cellOptions = (0, _extend.extend)({}, detailCellOptions, {
        data: rowData,
        cellElement: null,
        isOnForm: true,
        item,
        id: form.getItemID(item.name || item.dataField),
        column: (0, _extend.extend)({}, column, {
          editorType,
          editorOptions: (0, _extend.extend)({
            label,
            labelMark,
            labelMode
          }, column.editorOptions, item.editorOptions)
        }),
        columnIndex: column.index,
        setValue: !isReadOnly && column.allowEditing && function (value, text) {
          that.updateFieldValue(cellOptions, value, text);
        }
      });
      cellOptions.value = column.calculateCellValue(rowData);
      var template = this._getFormEditItemTemplate.bind(this)(cellOptions, column);
      this._rowsView.renderTemplate($container, template, cellOptions, !!(0, _dom.isElementInDom)($container)).done(function () {
        _this3._rowsView._updateCell($container, cellOptions);
      });
      return cellOptions;
    };
    _proto.getFormEditorTemplate = function getFormEditorTemplate(cellOptions, item) {
      var _this4 = this;
      var column = this.component.columnOption(item.dataField);
      return function (options, container) {
        var _a, _b;
        var $container = (0, _renderer.default)(container);
        (_b = (_a = cellOptions.row).watch) === null || _b === void 0 ? void 0 : _b.call(_a, function () {
          return column.selector(cellOptions.row.data);
        }, function () {
          var $editorElement = $container.find('.dx-widget').first();
          var validator = $editorElement.data('dxValidator');
          var validatorOptions = validator === null || validator === void 0 ? void 0 : validator.option();
          $container.contents().remove();
          cellOptions = _this4.renderFormEditorTemplate.bind(_this4)(cellOptions, item, options, $container);
          $editorElement = $container.find('.dx-widget').first();
          validator = $editorElement.data('dxValidator');
          if (validatorOptions && !validator) {
            $editorElement.dxValidator({
              validationRules: validatorOptions.validationRules,
              validationGroup: validatorOptions.validationGroup,
              dataGetter: validatorOptions.dataGetter
            });
          }
        });
        cellOptions = _this4.renderFormEditorTemplate.bind(_this4)(cellOptions, item, options, $container);
      };
    };
    _proto.getEditFormOptions = function getEditFormOptions(detailOptions) {
      var _this5 = this;
      var _a, _b;
      var editFormOptions = (_b = (_a = this)._getValidationGroupsInForm) === null || _b === void 0 ? void 0 : _b.call(_a, detailOptions);
      var userCustomizeItem = this.option('editing.form.customizeItem');
      var editFormItemClass = this.addWidgetPrefix(_const.EDIT_FORM_ITEM_CLASS);
      var items = this.option('editing.form.items');
      var isCustomEditorType = {};
      if (!items) {
        var columns = this.getController('columns').getColumns();
        items = [];
        (0, _iterator.each)(columns, function (_, column) {
          if (!column.isBand && !column.type) {
            items.push({
              column,
              name: column.name,
              dataField: column.dataField
            });
          }
        });
      } else {
        (0, _m_editing_utils.forEachFormItems)(items, function (item) {
          var itemId = (item === null || item === void 0 ? void 0 : item.name) || (item === null || item === void 0 ? void 0 : item.dataField);
          if (itemId) {
            isCustomEditorType[itemId] = !!item.editorType;
          }
        });
      }
      return (0, _extend.extend)({}, editFormOptions, {
        items,
        formID: "dx-".concat(new _guid.default()),
        customizeItem: function customizeItem(item) {
          var column;
          var itemId = item.name || item.dataField;
          if (item.column || itemId) {
            column = item.column || _this5._columnsController.columnOption(item.name ? "name:".concat(item.name) : "dataField:".concat(item.dataField));
          }
          if (column) {
            item.label = item.label || {};
            item.label.text = item.label.text || column.caption;
            if (column.dataType === 'boolean' && item.label.visible === undefined) {
              var labelMode = _this5.option('editing.form.labelMode');
              if (labelMode === 'floating' || labelMode === 'static') {
                item.label.visible = true;
              }
            }
            item.template = item.template || _this5.getFormEditorTemplate(detailOptions, item);
            item.column = column;
            item.isCustomEditorType = isCustomEditorType[itemId];
            if (column.formItem) {
              (0, _extend.extend)(item, column.formItem);
            }
            if (item.isRequired === undefined && column.validationRules) {
              item.isRequired = column.validationRules.some(function (rule) {
                return rule.type === 'required';
              });
              item.validationRules = [];
            }
            var itemVisible = (0, _type.isDefined)(item.visible) ? item.visible : true;
            if (!_this5._firstFormItem && itemVisible) {
              _this5._firstFormItem = item;
            }
          }
          userCustomizeItem === null || userCustomizeItem === void 0 ? void 0 : userCustomizeItem.call(_this5, item);
          item.cssClass = (0, _type.isString)(item.cssClass) ? "".concat(item.cssClass, " ").concat(editFormItemClass) : editFormItemClass;
        }
      });
    };
    _proto.getEditFormTemplate = function getEditFormTemplate() {
      var _this6 = this;
      return function ($container, detailOptions, options) {
        var editFormOptions = _this6.option(_const.EDITING_FORM_OPTION_NAME);
        var baseEditFormOptions = _this6.getEditFormOptions(detailOptions);
        var $formContainer = (0, _renderer.default)('<div>').appendTo($container);
        var isPopupForm = options === null || options === void 0 ? void 0 : options.isPopupForm;
        _this6._firstFormItem = undefined;
        if (isPopupForm) {
          $formContainer.addClass(_this6.addWidgetPrefix(_const.EDIT_POPUP_FORM_CLASS));
        }
        _this6._editForm = _this6._createComponent($formContainer, _form.default, (0, _extend.extend)({}, editFormOptions, baseEditFormOptions));
        if (!isPopupForm) {
          var $buttonsContainer = (0, _renderer.default)('<div>').addClass(_this6.addWidgetPrefix(_const.FORM_BUTTONS_CONTAINER_CLASS)).appendTo($container);
          _this6._createComponent((0, _renderer.default)('<div>').appendTo($buttonsContainer), _button.default, _this6._getSaveButtonConfig());
          _this6._createComponent((0, _renderer.default)('<div>').appendTo($buttonsContainer), _button.default, _this6._getCancelButtonConfig());
        }
        _this6._editForm.on('contentReady', function () {
          var _a;
          _this6._rowsView.renderDelayedTemplates();
          (_a = _this6._editPopup) === null || _a === void 0 ? void 0 : _a.repaint();
        });
      };
    };
    _proto.getEditForm = function getEditForm() {
      return this._editForm;
    };
    _proto._endUpdateCore = function _endUpdateCore() {
      var _a;
      (_a = this._updateEditFormDeferred) === null || _a === void 0 ? void 0 : _a.resolve();
    };
    _proto._beforeEndSaving = function _beforeEndSaving(changes) {
      var _a;
      _Base.prototype._beforeEndSaving.call(this, changes);
      if (this.isPopupEditMode()) {
        (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.hide();
      }
    };
    _proto._processDataItemCore = function _processDataItemCore(item, change, key, columns, generateDataValues) {
      var type = change.type;
      if (this.isPopupEditMode() && type === _const.DATA_EDIT_DATA_INSERT_TYPE) {
        item.visible = false;
      }
      _Base.prototype._processDataItemCore.call(this, item, change, key, columns, generateDataValues);
    };
    _proto._editRowFromOptionChangedCore = function _editRowFromOptionChangedCore(rowIndices, rowIndex) {
      var isPopupEditMode = this.isPopupEditMode();
      _Base.prototype._editRowFromOptionChangedCore.call(this, rowIndices, rowIndex, isPopupEditMode);
      if (isPopupEditMode) {
        this._showEditPopup(rowIndex);
      }
    };
    return FormBasedEditingControllerExtender;
  }(Base);
};
var editingFormBasedModule = {
  extenders: {
    controllers: {
      editing: editingControllerExtender,
      data: {
        _updateEditItem(item) {
          if (this._editingController.isFormEditMode()) {
            item.rowType = 'detail';
          }
        },
        _getChangedColumnIndices(oldItem, newItem, visibleRowIndex, isLiveUpdate) {
          if (isLiveUpdate === false && newItem.isEditing && this._editingController.isFormEditMode()) {
            return;
          }
          return this.callBase.apply(this, arguments);
        }
      }
    },
    views: {
      rowsView: {
        _renderCellContent($cell, options) {
          if (options.rowType === 'data' && this._editingController.isPopupEditMode() && options.row.visible === false) {
            return;
          }
          this.callBase.apply(this, arguments);
        },
        getCellElements(rowIndex) {
          var $cellElements = this.callBase(rowIndex);
          var editingController = this._editingController;
          var editForm = editingController.getEditForm();
          var editFormRowIndex = editingController.getEditFormRowIndex();
          if (editFormRowIndex === rowIndex && $cellElements && editForm) {
            return editForm.$element().find(".".concat(this.addWidgetPrefix(_const.EDIT_FORM_ITEM_CLASS), ", .").concat(_const.BUTTON_CLASS));
          }
          return $cellElements;
        },
        _getVisibleColumnIndex($cells, rowIndex, columnIdentifier) {
          var editFormRowIndex = this._editingController.getEditFormRowIndex();
          if (editFormRowIndex === rowIndex && (0, _type.isString)(columnIdentifier)) {
            var column = this._columnsController.columnOption(columnIdentifier);
            return this._getEditFormEditorVisibleIndex($cells, column);
          }
          return this.callBase.apply(this, arguments);
        },
        _getEditFormEditorVisibleIndex($cells, column) {
          var visibleIndex = -1;
          // @ts-expect-error
          (0, _iterator.each)($cells, function (index, cellElement) {
            var item = (0, _renderer.default)(cellElement).find('.dx-field-item-content').data('dx-form-item');
            if ((item === null || item === void 0 ? void 0 : item.column) && column && item.column.index === column.index) {
              visibleIndex = index;
              return false;
            }
          });
          return visibleIndex;
        },
        _isFormItem(parameters) {
          var isDetailRow = parameters.rowType === 'detail' || parameters.rowType === 'detailAdaptive';
          var isPopupEditing = parameters.rowType === 'data' && this._editingController.isPopupEditMode();
          return (isDetailRow || isPopupEditing) && parameters.item;
        },
        _updateCell($cell, parameters) {
          if (this._isFormItem(parameters)) {
            this._formItemPrepared(parameters, $cell);
          } else {
            this.callBase($cell, parameters);
          }
        }
      }
    }
  }
};
exports.editingFormBasedModule = editingFormBasedModule;
