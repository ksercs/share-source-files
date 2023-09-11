/**
* DevExtreme (esm/__internal/grids/grid_core/editing/m_editing_form_based.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from '../../../../core/devices';
import Guid from '../../../../core/guid';
import $ from '../../../../core/renderer';
import { equalByValue } from '../../../../core/utils/common';
import { Deferred } from '../../../../core/utils/deferred';
import { isElementInDom } from '../../../../core/utils/dom';
import { extend } from '../../../../core/utils/extend';
import { each } from '../../../../core/utils/iterator';
import { isDefined, isString } from '../../../../core/utils/type';
import eventsEngine from '../../../../events/core/events_engine';
import Button from '../../../../ui/button';
import Form from '../../../../ui/form';
import Popup from '../../../../ui/popup/ui.popup';
import Scrollable from '../../../../ui/scroll_view/ui.scrollable';
import { BUTTON_CLASS, DATA_EDIT_DATA_INSERT_TYPE, EDIT_FORM_ITEM_CLASS, EDIT_MODE_FORM, EDIT_MODE_POPUP, EDIT_POPUP_CLASS, EDIT_POPUP_FORM_CLASS, EDITING_EDITROWKEY_OPTION_NAME, EDITING_FORM_OPTION_NAME, EDITING_POPUP_OPTION_NAME, FOCUSABLE_ELEMENT_CLASS, FOCUSABLE_ELEMENT_SELECTOR, FORM_BUTTONS_CONTAINER_CLASS } from './const';
import { forEachFormItems, getEditorType } from './m_editing_utils';
var editingControllerExtender = Base => class FormBasedEditingControllerExtender extends Base {
  init() {
    this._editForm = null;
    this._updateEditFormDeferred = null;
    super.init();
  }
  isFormOrPopupEditMode() {
    return this.isPopupEditMode() || this.isFormEditMode();
  }
  isPopupEditMode() {
    var editMode = this.option('editing.mode');
    return editMode === EDIT_MODE_POPUP;
  }
  isFormEditMode() {
    var editMode = this.option('editing.mode');
    return editMode === EDIT_MODE_FORM;
  }
  getFirstEditableColumnIndex() {
    var firstFormItem = this._firstFormItem;
    if (this.isFormEditMode() && firstFormItem) {
      var editRowKey = this.option(EDITING_EDITROWKEY_OPTION_NAME);
      var editRowIndex = this._dataController.getRowIndexByKey(editRowKey);
      var $editFormElements = this._rowsView.getCellElements(editRowIndex);
      return this._rowsView._getEditFormEditorVisibleIndex($editFormElements, firstFormItem.column);
    }
    return super.getFirstEditableColumnIndex();
  }
  getEditFormRowIndex() {
    return this.isFormOrPopupEditMode() ? this._getVisibleEditRowIndex() : super.getEditFormRowIndex();
  }
  _isEditColumnVisible() {
    var result = super._isEditColumnVisible();
    var editingOptions = this.option('editing');
    return this.isFormOrPopupEditMode() ? editingOptions.allowUpdating || result : result;
  }
  _handleDataChanged(args) {
    var _a, _b;
    if (this.isPopupEditMode()) {
      var editRowKey = this.option('editing.editRowKey');
      var hasEditRow = (_a = args === null || args === void 0 ? void 0 : args.items) === null || _a === void 0 ? void 0 : _a.some(item => equalByValue(item.key, editRowKey));
      var onlyInsertChanges = ((_b = args.changeTypes) === null || _b === void 0 ? void 0 : _b.length) && args.changeTypes.every(item => item === 'insert');
      if ((args.changeType === 'refresh' || hasEditRow && args.isOptionChanged) && !onlyInsertChanges) {
        this._repaintEditPopup();
      }
    }
    super._handleDataChanged(args);
  }
  getPopupContent() {
    var _a;
    var popupVisible = (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.option('visible');
    if (this.isPopupEditMode() && popupVisible) {
      return this._$popupContent;
    }
  }
  _showAddedRow(rowIndex) {
    if (this.isPopupEditMode()) {
      this._showEditPopup(rowIndex);
    } else {
      super._showAddedRow(rowIndex);
    }
  }
  _cancelEditDataCore() {
    super._cancelEditDataCore();
    if (this.isPopupEditMode()) {
      this._hideEditPopup();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _updateEditRowCore(row, skipCurrentRow, isCustomSetCellValue) {
    var _a;
    var editForm = this._editForm;
    if (this.isPopupEditMode()) {
      if (this.option('repaintChangesOnly')) {
        (_a = row.update) === null || _a === void 0 ? void 0 : _a.call(row, row);
        this._rowsView.renderDelayedTemplates();
      } else if (editForm) {
        // @ts-expect-error
        this._updateEditFormDeferred = new Deferred().done(() => editForm.repaint());
        if (!this._updateLockCount) {
          this._updateEditFormDeferred.resolve();
        }
      }
    } else {
      super._updateEditRowCore(row, skipCurrentRow, isCustomSetCellValue);
    }
  }
  _showEditPopup(rowIndex, repaintForm) {
    var isMobileDevice = devices.current().deviceType !== 'desktop';
    var editPopupClass = this.addWidgetPrefix(EDIT_POPUP_CLASS);
    var popupOptions = extend({
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
    }, this.option(EDITING_POPUP_OPTION_NAME));
    if (!this._editPopup) {
      var $popupContainer = $('<div>').appendTo(this.component.$element()).addClass(editPopupClass);
      // @ts-expect-error
      this._editPopup = this._createComponent($popupContainer, Popup);
      this._editPopup.on('hiding', this._getEditPopupHiddenHandler());
      this._editPopup.on('shown', e => {
        var _a;
        eventsEngine.trigger(e.component.$content().find(FOCUSABLE_ELEMENT_SELECTOR).not(".".concat(FOCUSABLE_ELEMENT_CLASS)).first(), 'focus');
        if (repaintForm) {
          (_a = this._editForm) === null || _a === void 0 ? void 0 : _a.repaint();
        }
      });
    }
    this._editPopup.option(popupOptions);
    this._editPopup.show();
    super._showEditPopup(rowIndex, repaintForm);
  }
  _getPopupEditFormTemplate(rowIndex) {
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
    return container => {
      var formTemplate = this.getEditFormTemplate();
      // @ts-expect-error
      var scrollable = this._createComponent($('<div>').appendTo(container), Scrollable);
      this._$popupContent = $(scrollable.content());
      formTemplate(this._$popupContent, templateOptions, {
        isPopupForm: true
      });
      this._rowsView.renderDelayedTemplates();
      $(container).parent().attr('aria-label', this.localize('dxDataGrid-ariaEditForm'));
    };
  }
  _repaintEditPopup() {
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
  }
  _hideEditPopup() {
    var _a;
    (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.option('visible', false);
  }
  optionChanged(args) {
    if (args.name === 'editing' && this.isFormOrPopupEditMode()) {
      var {
        fullName
      } = args;
      if (fullName.indexOf(EDITING_FORM_OPTION_NAME) === 0) {
        this._handleFormOptionChange(args);
        args.handled = true;
      } else if (fullName.indexOf(EDITING_POPUP_OPTION_NAME) === 0) {
        this._handlePopupOptionChange(args);
        args.handled = true;
      }
    }
    super.optionChanged(args);
  }
  _handleFormOptionChange(args) {
    var _a;
    if (this.isFormEditMode()) {
      var editRowIndex = this._getVisibleEditRowIndex();
      if (editRowIndex >= 0) {
        this._dataController.updateItems({
          changeType: 'update',
          rowIndices: [editRowIndex]
        });
      }
    } else if (((_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.option('visible')) && args.fullName.indexOf(EDITING_FORM_OPTION_NAME) === 0) {
      this._repaintEditPopup();
    }
  }
  _handlePopupOptionChange(args) {
    var editPopup = this._editPopup;
    if (editPopup) {
      var popupOptionName = args.fullName.slice(EDITING_POPUP_OPTION_NAME.length + 1);
      if (popupOptionName) {
        editPopup.option(popupOptionName, args.value);
      } else {
        editPopup.option(args.value);
      }
    }
  }
  renderFormEditorTemplate(detailCellOptions, item, formTemplateOptions, container, isReadOnly) {
    var that = this;
    var $container = $(container);
    var {
      column
    } = item;
    var editorType = getEditorType(item);
    var rowData = detailCellOptions === null || detailCellOptions === void 0 ? void 0 : detailCellOptions.row.data;
    var form = formTemplateOptions.component;
    var {
      label,
      labelMark,
      labelMode
    } = formTemplateOptions.editorOptions || {};
    var cellOptions = extend({}, detailCellOptions, {
      data: rowData,
      cellElement: null,
      isOnForm: true,
      item,
      id: form.getItemID(item.name || item.dataField),
      column: extend({}, column, {
        editorType,
        editorOptions: extend({
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
    this._rowsView.renderTemplate($container, template, cellOptions, !!isElementInDom($container)).done(() => {
      this._rowsView._updateCell($container, cellOptions);
    });
    return cellOptions;
  }
  getFormEditorTemplate(cellOptions, item) {
    var column = this.component.columnOption(item.dataField);
    return (options, container) => {
      var _a, _b;
      var $container = $(container);
      (_b = (_a = cellOptions.row).watch) === null || _b === void 0 ? void 0 : _b.call(_a, () => column.selector(cellOptions.row.data), () => {
        var $editorElement = $container.find('.dx-widget').first();
        var validator = $editorElement.data('dxValidator');
        var validatorOptions = validator === null || validator === void 0 ? void 0 : validator.option();
        $container.contents().remove();
        cellOptions = this.renderFormEditorTemplate.bind(this)(cellOptions, item, options, $container);
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
      cellOptions = this.renderFormEditorTemplate.bind(this)(cellOptions, item, options, $container);
    };
  }
  getEditFormOptions(detailOptions) {
    var _a, _b;
    var editFormOptions = (_b = (_a = this)._getValidationGroupsInForm) === null || _b === void 0 ? void 0 : _b.call(_a, detailOptions);
    var userCustomizeItem = this.option('editing.form.customizeItem');
    var editFormItemClass = this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS);
    var items = this.option('editing.form.items');
    var isCustomEditorType = {};
    if (!items) {
      var columns = this.getController('columns').getColumns();
      items = [];
      each(columns, (_, column) => {
        if (!column.isBand && !column.type) {
          items.push({
            column,
            name: column.name,
            dataField: column.dataField
          });
        }
      });
    } else {
      forEachFormItems(items, item => {
        var itemId = (item === null || item === void 0 ? void 0 : item.name) || (item === null || item === void 0 ? void 0 : item.dataField);
        if (itemId) {
          isCustomEditorType[itemId] = !!item.editorType;
        }
      });
    }
    return extend({}, editFormOptions, {
      items,
      formID: "dx-".concat(new Guid()),
      customizeItem: item => {
        var column;
        var itemId = item.name || item.dataField;
        if (item.column || itemId) {
          column = item.column || this._columnsController.columnOption(item.name ? "name:".concat(item.name) : "dataField:".concat(item.dataField));
        }
        if (column) {
          item.label = item.label || {};
          item.label.text = item.label.text || column.caption;
          if (column.dataType === 'boolean' && item.label.visible === undefined) {
            var labelMode = this.option('editing.form.labelMode');
            if (labelMode === 'floating' || labelMode === 'static') {
              item.label.visible = true;
            }
          }
          item.template = item.template || this.getFormEditorTemplate(detailOptions, item);
          item.column = column;
          item.isCustomEditorType = isCustomEditorType[itemId];
          if (column.formItem) {
            extend(item, column.formItem);
          }
          if (item.isRequired === undefined && column.validationRules) {
            item.isRequired = column.validationRules.some(rule => rule.type === 'required');
            item.validationRules = [];
          }
          var itemVisible = isDefined(item.visible) ? item.visible : true;
          if (!this._firstFormItem && itemVisible) {
            this._firstFormItem = item;
          }
        }
        userCustomizeItem === null || userCustomizeItem === void 0 ? void 0 : userCustomizeItem.call(this, item);
        item.cssClass = isString(item.cssClass) ? "".concat(item.cssClass, " ").concat(editFormItemClass) : editFormItemClass;
      }
    });
  }
  getEditFormTemplate() {
    return ($container, detailOptions, options) => {
      var editFormOptions = this.option(EDITING_FORM_OPTION_NAME);
      var baseEditFormOptions = this.getEditFormOptions(detailOptions);
      var $formContainer = $('<div>').appendTo($container);
      var isPopupForm = options === null || options === void 0 ? void 0 : options.isPopupForm;
      this._firstFormItem = undefined;
      if (isPopupForm) {
        $formContainer.addClass(this.addWidgetPrefix(EDIT_POPUP_FORM_CLASS));
      }
      this._editForm = this._createComponent($formContainer, Form, extend({}, editFormOptions, baseEditFormOptions));
      if (!isPopupForm) {
        var $buttonsContainer = $('<div>').addClass(this.addWidgetPrefix(FORM_BUTTONS_CONTAINER_CLASS)).appendTo($container);
        this._createComponent($('<div>').appendTo($buttonsContainer), Button, this._getSaveButtonConfig());
        this._createComponent($('<div>').appendTo($buttonsContainer), Button, this._getCancelButtonConfig());
      }
      this._editForm.on('contentReady', () => {
        var _a;
        this._rowsView.renderDelayedTemplates();
        (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.repaint();
      });
    };
  }
  getEditForm() {
    return this._editForm;
  }
  _endUpdateCore() {
    var _a;
    (_a = this._updateEditFormDeferred) === null || _a === void 0 ? void 0 : _a.resolve();
  }
  _beforeEndSaving(changes) {
    var _a;
    super._beforeEndSaving(changes);
    if (this.isPopupEditMode()) {
      (_a = this._editPopup) === null || _a === void 0 ? void 0 : _a.hide();
    }
  }
  _processDataItemCore(item, change, key, columns, generateDataValues) {
    var {
      type
    } = change;
    if (this.isPopupEditMode() && type === DATA_EDIT_DATA_INSERT_TYPE) {
      item.visible = false;
    }
    super._processDataItemCore(item, change, key, columns, generateDataValues);
  }
  _editRowFromOptionChangedCore(rowIndices, rowIndex) {
    var isPopupEditMode = this.isPopupEditMode();
    super._editRowFromOptionChangedCore(rowIndices, rowIndex, isPopupEditMode);
    if (isPopupEditMode) {
      this._showEditPopup(rowIndex);
    }
  }
};
export var editingFormBasedModule = {
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
            return editForm.$element().find(".".concat(this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS), ", .").concat(BUTTON_CLASS));
          }
          return $cellElements;
        },
        _getVisibleColumnIndex($cells, rowIndex, columnIdentifier) {
          var editFormRowIndex = this._editingController.getEditFormRowIndex();
          if (editFormRowIndex === rowIndex && isString(columnIdentifier)) {
            var column = this._columnsController.columnOption(columnIdentifier);
            return this._getEditFormEditorVisibleIndex($cells, column);
          }
          return this.callBase.apply(this, arguments);
        },
        _getEditFormEditorVisibleIndex($cells, column) {
          var visibleIndex = -1;
          // @ts-expect-error
          each($cells, (index, cellElement) => {
            var item = $(cellElement).find('.dx-field-item-content').data('dx-form-item');
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
