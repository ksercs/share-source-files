!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.editing_form_based.js"], ["../../core/renderer","../../events/core/events_engine","../../core/guid","../../core/utils/type","../../core/utils/iterator","../../core/utils/extend","../button","../../core/devices","../form","../../core/utils/deferred","../../core/utils/common","../../core/utils/dom","../scroll_view/ui.scrollable","../popup/ui.popup","./ui.grid_core.editing_constants"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.editing_form_based.js", ["../../core/renderer", "../../events/core/events_engine", "../../core/guid", "../../core/utils/type", "../../core/utils/iterator", "../../core/utils/extend", "../button", "../../core/devices", "../form", "../../core/utils/deferred", "../../core/utils/common", "../../core/utils/dom", "../scroll_view/ui.scrollable", "../popup/ui.popup", "./ui.grid_core.editing_constants"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.editingFormBasedModule = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _extend = $__require("../../core/utils/extend");
  var _button = _interopRequireDefault($__require("../button"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _form = _interopRequireDefault($__require("../form"));
  var _deferred = $__require("../../core/utils/deferred");
  var _common = $__require("../../core/utils/common");
  var _dom = $__require("../../core/utils/dom");
  var _ui = _interopRequireDefault($__require("../scroll_view/ui.scrollable"));
  var _ui2 = _interopRequireDefault($__require("../popup/ui.popup"));
  var _uiGrid_core = $__require("./ui.grid_core.editing_constants");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var isRenovatedScrollable = !!_ui.default.IS_RENOVATED_WIDGET;
  var EDIT_FORM_ITEM_CLASS = 'edit-form-item';
  var EDIT_POPUP_CLASS = 'edit-popup';
  var EDIT_POPUP_FORM_CLASS = 'edit-popup-form';
  var FOCUSABLE_ELEMENT_CLASS = isRenovatedScrollable ? 'dx-scrollable' : 'dx-scrollable-container';
  var BUTTON_CLASS = 'dx-button';
  var FORM_BUTTONS_CONTAINER_CLASS = 'form-buttons-container';
  var getEditorType = function getEditorType(item) {
    var _column$formItem;
    var column = item.column;
    return item.isCustomEditorType ? item.editorType : (_column$formItem = column.formItem) === null || _column$formItem === void 0 ? void 0 : _column$formItem.editorType;
  };
  var forEachFormItems = function forEachFormItems(items, callBack) {
    items.forEach(function (item) {
      if (item.items || item.tabs) {
        forEachFormItems(item.items || item.tabs, callBack);
      } else {
        callBack(item);
      }
    });
  };
  var editingFormBasedModule = {
    extenders: {
      controllers: {
        editing: {
          init: function init() {
            this._editForm = null;
            this._updateEditFormDeferred = null;
            this.callBase.apply(this, arguments);
          },
          isFormOrPopupEditMode: function isFormOrPopupEditMode() {
            return this.isPopupEditMode() || this.isFormEditMode();
          },
          isPopupEditMode: function isPopupEditMode() {
            var editMode = this.option('editing.mode');
            return editMode === _uiGrid_core.EDIT_MODE_POPUP;
          },
          isFormEditMode: function isFormEditMode() {
            var editMode = this.option('editing.mode');
            return editMode === _uiGrid_core.EDIT_MODE_FORM;
          },
          getFirstEditableColumnIndex: function getFirstEditableColumnIndex() {
            var firstFormItem = this._firstFormItem;
            if (this.isFormEditMode() && firstFormItem) {
              var editRowKey = this.option(_uiGrid_core.EDITING_EDITROWKEY_OPTION_NAME);
              var editRowIndex = this._dataController.getRowIndexByKey(editRowKey);
              var $editFormElements = this._rowsView.getCellElements(editRowIndex);
              return this._rowsView._getEditFormEditorVisibleIndex($editFormElements, firstFormItem.column);
            }
            return this.callBase.apply(this, arguments);
          },
          getEditFormRowIndex: function getEditFormRowIndex() {
            return this.isFormOrPopupEditMode() ? this._getVisibleEditRowIndex() : this.callBase.apply(this, arguments);
          },
          _isEditColumnVisible: function _isEditColumnVisible() {
            var result = this.callBase.apply(this, arguments);
            var editingOptions = this.option('editing');
            return this.isFormOrPopupEditMode() ? editingOptions.allowUpdating || result : result;
          },
          _handleDataChanged: function _handleDataChanged(args) {
            if (this.isPopupEditMode()) {
              var _args$items, _args$changeTypes;
              var editRowKey = this.option('editing.editRowKey');
              var hasEditRow = args === null || args === void 0 ? void 0 : (_args$items = args.items) === null || _args$items === void 0 ? void 0 : _args$items.some(function (item) {
                return (0, _common.equalByValue)(item.key, editRowKey);
              });
              var onlyInsertChanges = ((_args$changeTypes = args.changeTypes) === null || _args$changeTypes === void 0 ? void 0 : _args$changeTypes.length) && args.changeTypes.every(function (item) {
                return item === 'insert';
              });
              if ((args.changeType === 'refresh' || hasEditRow && args.isOptionChanged) && !onlyInsertChanges) {
                this._repaintEditPopup();
              }
            }
            this.callBase.apply(this, arguments);
          },
          getPopupContent: function getPopupContent() {
            var _this$_editPopup;
            var popupVisible = (_this$_editPopup = this._editPopup) === null || _this$_editPopup === void 0 ? void 0 : _this$_editPopup.option('visible');
            if (this.isPopupEditMode() && popupVisible) {
              return this._$popupContent;
            }
          },
          _showAddedRow: function _showAddedRow(rowIndex) {
            if (this.isPopupEditMode()) {
              this._showEditPopup(rowIndex);
            } else {
              this.callBase.apply(this, arguments);
            }
          },
          _cancelEditDataCore: function _cancelEditDataCore() {
            this.callBase.apply(this, arguments);
            if (this.isPopupEditMode()) {
              this._hideEditPopup();
            }
          },
          _updateEditRowCore: function _updateEditRowCore(row, skipCurrentRow, isCustomSetCellValue) {
            var editForm = this._editForm;
            if (this.isPopupEditMode()) {
              if (this.option('repaintChangesOnly')) {
                var _row$update;
                (_row$update = row.update) === null || _row$update === void 0 ? void 0 : _row$update.call(row, row);
                this._rowsView.renderDelayedTemplates();
              } else if (editForm) {
                this._updateEditFormDeferred = new _deferred.Deferred().done(function () {
                  return editForm.repaint();
                });
                if (!this._updateLockCount) {
                  this._updateEditFormDeferred.resolve();
                }
              }
            } else {
              this.callBase.apply(this, arguments);
            }
          },
          _showEditPopup: function _showEditPopup(rowIndex, repaintForm) {
            var _this = this;
            var isMobileDevice = _devices.default.current().deviceType !== 'desktop';
            var editPopupClass = this.addWidgetPrefix(EDIT_POPUP_CLASS);
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
            }, this.option(_uiGrid_core.EDITING_POPUP_OPTION_NAME));
            if (!this._editPopup) {
              var $popupContainer = (0, _renderer.default)('<div>').appendTo(this.component.$element()).addClass(editPopupClass);
              this._editPopup = this._createComponent($popupContainer, _ui2.default);
              this._editPopup.on('hiding', this._getEditPopupHiddenHandler());
              this._editPopup.on('shown', function (e) {
                _events_engine.default.trigger(e.component.$content().find(_uiGrid_core.FOCUSABLE_ELEMENT_SELECTOR).not(".".concat(FOCUSABLE_ELEMENT_CLASS)).first(), 'focus');
                if (repaintForm) {
                  var _this$_editForm;
                  (_this$_editForm = _this._editForm) === null || _this$_editForm === void 0 ? void 0 : _this$_editForm.repaint();
                }
              });
            }
            this._editPopup.option(popupOptions);
            this._editPopup.show();
            this.callBase.apply(this, arguments);
          },
          _getPopupEditFormTemplate: function _getPopupEditFormTemplate(rowIndex) {
            var _this2 = this;
            var row = this.component.getVisibleRows()[rowIndex];
            var templateOptions = {
              row: row,
              values: row.values,
              rowType: row.rowType,
              key: row.key,
              rowIndex: rowIndex
            };
            this._rowsView._addWatchMethod(templateOptions, row);
            return function (container) {
              var formTemplate = _this2.getEditFormTemplate();
              var scrollable = _this2._createComponent((0, _renderer.default)('<div>').appendTo(container), _ui.default);
              _this2._$popupContent = (0, _renderer.default)(scrollable.content());
              formTemplate(_this2._$popupContent, templateOptions, {
                isPopupForm: true
              });
              _this2._rowsView.renderDelayedTemplates();
            };
          },
          _repaintEditPopup: function _repaintEditPopup() {
            var rowIndex = this._getVisibleEditRowIndex();
            if (rowIndex >= 0) {
              var _this$_editPopup2, _this$_editPopup3;
              var defaultAnimation = (_this$_editPopup2 = this._editPopup) === null || _this$_editPopup2 === void 0 ? void 0 : _this$_editPopup2.option('animation');
              (_this$_editPopup3 = this._editPopup) === null || _this$_editPopup3 === void 0 ? void 0 : _this$_editPopup3.option('animation', null);
              this._showEditPopup(rowIndex, true);
              if (defaultAnimation !== undefined) {
                this._editPopup.option('animation', defaultAnimation);
              }
            }
          },
          _hideEditPopup: function _hideEditPopup() {
            var _this$_editPopup4;
            (_this$_editPopup4 = this._editPopup) === null || _this$_editPopup4 === void 0 ? void 0 : _this$_editPopup4.option('visible', false);
          },
          optionChanged: function optionChanged(args) {
            if (args.name === 'editing' && this.isFormOrPopupEditMode()) {
              var fullName = args.fullName;
              if (fullName.indexOf(_uiGrid_core.EDITING_FORM_OPTION_NAME) === 0) {
                this._handleFormOptionChange(args);
                args.handled = true;
              } else if (fullName.indexOf(_uiGrid_core.EDITING_POPUP_OPTION_NAME) === 0) {
                this._handlePopupOptionChange(args);
                args.handled = true;
              }
            }
            this.callBase.apply(this, arguments);
          },
          _handleFormOptionChange: function _handleFormOptionChange(args) {
            var _this$_editPopup5;
            if (this.isFormEditMode()) {
              var editRowIndex = this._getVisibleEditRowIndex();
              if (editRowIndex >= 0) {
                this._dataController.updateItems({
                  changeType: 'update',
                  rowIndices: [editRowIndex]
                });
              }
            } else if ((_this$_editPopup5 = this._editPopup) !== null && _this$_editPopup5 !== void 0 && _this$_editPopup5.option('visible') && args.fullName.indexOf(_uiGrid_core.EDITING_FORM_OPTION_NAME) === 0) {
              this._repaintEditPopup();
            }
          },
          _handlePopupOptionChange: function _handlePopupOptionChange(args) {
            var editPopup = this._editPopup;
            if (editPopup) {
              var popupOptionName = args.fullName.slice(_uiGrid_core.EDITING_POPUP_OPTION_NAME.length + 1);
              if (popupOptionName) {
                editPopup.option(popupOptionName, args.value);
              } else {
                editPopup.option(args.value);
              }
            }
          },
          renderFormEditorTemplate: function renderFormEditorTemplate(detailCellOptions, item, formTemplateOptions, container, isReadOnly) {
            var _this3 = this;
            var that = this;
            var $container = (0, _renderer.default)(container);
            var column = item.column;
            var editorType = getEditorType(item);
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
              item: item,
              id: form.getItemID(item.name || item.dataField),
              column: (0, _extend.extend)({}, column, {
                editorType: editorType,
                editorOptions: (0, _extend.extend)({
                  label: label,
                  labelMark: labelMark,
                  labelMode: labelMode
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
          },
          getFormEditorTemplate: function getFormEditorTemplate(cellOptions, item) {
            var _this4 = this;
            var column = this.component.columnOption(item.dataField);
            return function (options, container) {
              var _cellOptions$row$watc, _cellOptions$row;
              var $container = (0, _renderer.default)(container);
              (_cellOptions$row$watc = (_cellOptions$row = cellOptions.row).watch) === null || _cellOptions$row$watc === void 0 ? void 0 : _cellOptions$row$watc.call(_cellOptions$row, function () {
                return column.selector(cellOptions.row.data);
              }, function () {
                var _validator;
                var $editorElement = $container.find('.dx-widget').first();
                var validator = $editorElement.data('dxValidator');
                var validatorOptions = (_validator = validator) === null || _validator === void 0 ? void 0 : _validator.option();
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
          },
          getEditFormOptions: function getEditFormOptions(detailOptions) {
            var _this$_getValidationG,
                _this5 = this;
            var editFormOptions = (_this$_getValidationG = this._getValidationGroupsInForm) === null || _this$_getValidationG === void 0 ? void 0 : _this$_getValidationG.call(this, detailOptions);
            var userCustomizeItem = this.option('editing.form.customizeItem');
            var editFormItemClass = this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS);
            var items = this.option('editing.form.items');
            var isCustomEditorType = {};
            if (!items) {
              var columns = this.getController('columns').getColumns();
              items = [];
              (0, _iterator.each)(columns, function (_, column) {
                if (!column.isBand && !column.type) {
                  items.push({
                    column: column,
                    name: column.name,
                    dataField: column.dataField
                  });
                }
              });
            } else {
              forEachFormItems(items, function (item) {
                var itemId = (item === null || item === void 0 ? void 0 : item.name) || (item === null || item === void 0 ? void 0 : item.dataField);
                if (itemId) {
                  isCustomEditorType[itemId] = !!item.editorType;
                }
              });
            }
            return (0, _extend.extend)({}, editFormOptions, {
              items: items,
              formID: 'dx-' + new _guid.default(),
              customizeItem: function customizeItem(item) {
                var column;
                var itemId = item.name || item.dataField;
                if (item.column || itemId) {
                  column = item.column || _this5._columnsController.columnOption(item.name ? 'name:' + item.name : 'dataField:' + item.dataField);
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
                item.cssClass = (0, _type.isString)(item.cssClass) ? item.cssClass + ' ' + editFormItemClass : editFormItemClass;
              }
            });
          },
          getEditFormTemplate: function getEditFormTemplate() {
            var _this6 = this;
            return function ($container, detailOptions, options) {
              var editFormOptions = _this6.option(_uiGrid_core.EDITING_FORM_OPTION_NAME);
              var baseEditFormOptions = _this6.getEditFormOptions(detailOptions);
              var $formContainer = (0, _renderer.default)('<div>').appendTo($container);
              var isPopupForm = options === null || options === void 0 ? void 0 : options.isPopupForm;
              _this6._firstFormItem = undefined;
              if (isPopupForm) {
                $formContainer.addClass(_this6.addWidgetPrefix(EDIT_POPUP_FORM_CLASS));
              }
              _this6._editForm = _this6._createComponent($formContainer, _form.default, (0, _extend.extend)({}, editFormOptions, baseEditFormOptions));
              if (!isPopupForm) {
                var $buttonsContainer = (0, _renderer.default)('<div>').addClass(_this6.addWidgetPrefix(FORM_BUTTONS_CONTAINER_CLASS)).appendTo($container);
                _this6._createComponent((0, _renderer.default)('<div>').appendTo($buttonsContainer), _button.default, _this6._getSaveButtonConfig());
                _this6._createComponent((0, _renderer.default)('<div>').appendTo($buttonsContainer), _button.default, _this6._getCancelButtonConfig());
              }
              _this6._editForm.on('contentReady', function () {
                var _this6$_editPopup;
                _this6._rowsView.renderDelayedTemplates();
                (_this6$_editPopup = _this6._editPopup) === null || _this6$_editPopup === void 0 ? void 0 : _this6$_editPopup.repaint();
              });
            };
          },
          getEditForm: function getEditForm() {
            return this._editForm;
          },
          _endUpdateCore: function _endUpdateCore() {
            var _this$_updateEditForm;
            (_this$_updateEditForm = this._updateEditFormDeferred) === null || _this$_updateEditForm === void 0 ? void 0 : _this$_updateEditForm.resolve();
          },
          _beforeEndSaving: function _beforeEndSaving() {
            this.callBase.apply(this, arguments);
            if (this.isPopupEditMode()) {
              var _this$_editPopup6;
              (_this$_editPopup6 = this._editPopup) === null || _this$_editPopup6 === void 0 ? void 0 : _this$_editPopup6.hide();
            }
          },
          _processDataItemCore: function _processDataItemCore(item, _ref2) {
            var type = _ref2.type;
            if (this.isPopupEditMode() && type === _uiGrid_core.DATA_EDIT_DATA_INSERT_TYPE) {
              item.visible = false;
            }
            this.callBase.apply(this, arguments);
          },
          _editRowFromOptionChangedCore: function _editRowFromOptionChangedCore(rowIndices, rowIndex) {
            var isPopupEditMode = this.isPopupEditMode();
            this.callBase(rowIndices, rowIndex, isPopupEditMode);
            if (isPopupEditMode) {
              this._showEditPopup(rowIndex);
            }
          }
        },
        data: {
          _updateEditItem: function _updateEditItem(item) {
            if (this._editingController.isFormEditMode()) {
              item.rowType = 'detail';
            }
          },
          _getChangedColumnIndices: function _getChangedColumnIndices(oldItem, newItem, visibleRowIndex, isLiveUpdate) {
            if (isLiveUpdate === false && newItem.isEditing && this._editingController.isFormEditMode()) {
              return;
            }
            return this.callBase.apply(this, arguments);
          }
        }
      },
      views: {
        rowsView: {
          _renderCellContent: function _renderCellContent($cell, options) {
            if (options.rowType === 'data' && this._editingController.isPopupEditMode() && options.row.visible === false) {
              return;
            }
            this.callBase.apply(this, arguments);
          },
          getCellElements: function getCellElements(rowIndex) {
            var $cellElements = this.callBase(rowIndex);
            var editingController = this._editingController;
            var editForm = editingController.getEditForm();
            var editFormRowIndex = editingController.getEditFormRowIndex();
            if (editFormRowIndex === rowIndex && $cellElements && editForm) {
              return editForm.$element().find('.' + this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS) + ', .' + BUTTON_CLASS);
            }
            return $cellElements;
          },
          _getVisibleColumnIndex: function _getVisibleColumnIndex($cells, rowIndex, columnIdentifier) {
            var editFormRowIndex = this._editingController.getEditFormRowIndex();
            if (editFormRowIndex === rowIndex && (0, _type.isString)(columnIdentifier)) {
              var column = this._columnsController.columnOption(columnIdentifier);
              return this._getEditFormEditorVisibleIndex($cells, column);
            }
            return this.callBase.apply(this, arguments);
          },
          _getEditFormEditorVisibleIndex: function _getEditFormEditorVisibleIndex($cells, column) {
            var visibleIndex = -1;
            (0, _iterator.each)($cells, function (index, cellElement) {
              var item = (0, _renderer.default)(cellElement).find('.dx-field-item-content').data('dx-form-item');
              if (item !== null && item !== void 0 && item.column && column && item.column.index === column.index) {
                visibleIndex = index;
                return false;
              }
            });
            return visibleIndex;
          },
          _isFormItem: function _isFormItem(parameters) {
            var isDetailRow = parameters.rowType === 'detail' || parameters.rowType === 'detailAdaptive';
            var isPopupEditing = parameters.rowType === 'data' && this._editingController.isPopupEditMode();
            return (isDetailRow || isPopupEditing) && parameters.item;
          },
          _updateCell: function _updateCell($cell, parameters) {
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../events/core/events_engine","../../core/guid","../../core/utils/type","../../core/utils/iterator","../../core/utils/extend","../button","../../core/devices","../form","../../core/utils/deferred","../../core/utils/common","../../core/utils/dom","../scroll_view/ui.scrollable","../popup/ui.popup","./ui.grid_core.editing_constants"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../events/core/events_engine"), require("../../core/guid"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("../button"), require("../../core/devices"), require("../form"), require("../../core/utils/deferred"), require("../../core/utils/common"), require("../../core/utils/dom"), require("../scroll_view/ui.scrollable"), require("../popup/ui.popup"), require("./ui.grid_core.editing_constants"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.editing_form_based.js.map