/**
* DevExtreme (bundles/__internal/grids/grid_core/editing/m_editing.js)
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
exports.editingModule = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _guid = _interopRequireDefault(require("../../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _dom = require("../../../../core/utils/dom");
var _extend = require("../../../../core/utils/extend");
var iconUtils = _interopRequireWildcard(require("../../../../core/utils/icon"));
var _iterator = require("../../../../core/utils/iterator");
var _object = require("../../../../core/utils/object");
var _type = require("../../../../core/utils/type");
var _array_utils = require("../../../../data/array_utils");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _index = require("../../../../events/utils/index");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _dialog = require("../../../../ui/dialog");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _const = require("./const");
var _m_editing_utils = require("./m_editing_utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } // @ts-expect-error
var EditingControllerImpl = /*#__PURE__*/function (_modules$ViewControll) {
  _inheritsLoose(EditingControllerImpl, _modules$ViewControll);
  function EditingControllerImpl() {
    return _modules$ViewControll.apply(this, arguments) || this;
  }
  var _proto = EditingControllerImpl.prototype;
  _proto.init = function init() {
    this._columnsController = this.getController('columns');
    this._dataController = this.getController('data');
    this._rowsView = this.getView('rowsView');
    this._lastOperation = null;
    // this contains the value of 'editing.changes' option, to check if it has changed in onOptionChanged
    this._changes = [];
    if (this._deferreds) {
      this._deferreds.forEach(function (d) {
        return d.reject('cancel');
      });
    }
    this._deferreds = [];
    if (!this._dataChangedHandler) {
      this._dataChangedHandler = this._handleDataChanged.bind(this);
      this._dataController.changed.add(this._dataChangedHandler);
    }
    if (!this._saveEditorHandler) {
      this.createAction('onInitNewRow', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowInserting', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowInserted', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onEditingStart', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowUpdating', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowUpdated', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowRemoving', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onRowRemoved', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onSaved', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onSaving', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onEditCanceling', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this.createAction('onEditCanceled', {
        excludeValidators: ['disabled', 'readOnly']
      });
    }
    this._updateEditColumn();
    this._updateEditButtons();
    if (!this._internalState) {
      this._internalState = [];
    }
    this.component._optionsByReference[_const.EDITING_EDITROWKEY_OPTION_NAME] = true;
    this.component._optionsByReference[_const.EDITING_CHANGES_OPTION_NAME] = true;
  };
  _proto.getEditMode = function getEditMode() {
    var _a;
    var editMode = (_a = this.option('editing.mode')) !== null && _a !== void 0 ? _a : _const.EDIT_MODE_ROW;
    if (_const.EDIT_MODES.includes(editMode)) {
      return editMode;
    }
    return _const.EDIT_MODE_ROW;
  };
  _proto.isCellBasedEditMode = function isCellBasedEditMode() {
    var editMode = this.getEditMode();
    return _const.CELL_BASED_MODES.includes(editMode);
  };
  _proto._getDefaultEditorTemplate = function _getDefaultEditorTemplate() {
    var _this = this;
    return function (container, options) {
      var $editor = (0, _renderer.default)('<div>').appendTo(container);
      var editorOptions = (0, _extend.extend)({}, options.column, {
        value: options.value,
        setValue: options.setValue,
        row: options.row,
        parentType: 'dataRow',
        width: null,
        readOnly: !options.setValue,
        isOnForm: options.isOnForm,
        id: options.id
      });
      var needLabel = _const.REQUIRED_EDITOR_LABELLEDBY_MODES.includes(_this.getEditMode());
      if (needLabel) {
        editorOptions['aria-labelledby'] = options.column.headerId;
      }
      _this.getController('editorFactory').createEditor($editor, editorOptions);
    };
  };
  _proto._getNewRowPosition = function _getNewRowPosition() {
    var newRowPosition = this.option('editing.newRowPosition');
    var scrollingMode = this.option('scrolling.mode');
    if (scrollingMode === 'virtual') {
      switch (newRowPosition) {
        case _const.PAGE_TOP_NEW_ROW_POSITION:
          return _const.VIEWPORT_TOP_NEW_ROW_POSITION;
        case _const.PAGE_BOTTOM_NEW_ROW_POSITION:
          return _const.VIEWPORT_BOTTOM_NEW_ROW_POSITION;
        default:
          return newRowPosition;
      }
    }
    return newRowPosition;
  };
  _proto.getChanges = function getChanges() {
    return this.option(_const.EDITING_CHANGES_OPTION_NAME);
  };
  _proto.getInsertRowCount = function getInsertRowCount() {
    var changes = this.option(_const.EDITING_CHANGES_OPTION_NAME);
    return changes.filter(function (change) {
      return change.type === 'insert';
    }).length;
  };
  _proto.resetChanges = function resetChanges() {
    var changes = this.getChanges();
    var needReset = changes === null || changes === void 0 ? void 0 : changes.length;
    if (needReset) {
      this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, []);
    }
  };
  _proto._getInternalData = function _getInternalData(key) {
    return this._internalState.filter(function (item) {
      return (0, _common.equalByValue)(item.key, key);
    })[0];
  };
  _proto._addInternalData = function _addInternalData(params) {
    var internalData = this._getInternalData(params.key);
    if (internalData) {
      return (0, _extend.extend)(internalData, params);
    }
    this._internalState.push(params);
    return params;
  };
  _proto._getOldData = function _getOldData(key) {
    var _a;
    return (_a = this._getInternalData(key)) === null || _a === void 0 ? void 0 : _a.oldData;
  };
  _proto.getUpdatedData = function getUpdatedData(data) {
    var key = this._dataController.keyOf(data);
    var changes = this.getChanges();
    var editIndex = _m_utils.default.getIndexByKey(key, changes);
    if (changes[editIndex]) {
      return (0, _array_utils.createObjectWithChanges)(data, changes[editIndex].data);
    }
    return data;
  };
  _proto.getInsertedData = function getInsertedData() {
    return this.getChanges().filter(function (change) {
      return change.data && change.type === _const.DATA_EDIT_DATA_INSERT_TYPE;
    }).map(function (change) {
      return change.data;
    });
  };
  _proto.getRemovedData = function getRemovedData() {
    var _this2 = this;
    return this.getChanges().filter(function (change) {
      return _this2._getOldData(change.key) && change.type === _const.DATA_EDIT_DATA_REMOVE_TYPE;
    }).map(function (change) {
      return _this2._getOldData(change.key);
    });
  };
  _proto._fireDataErrorOccurred = function _fireDataErrorOccurred(arg) {
    if (arg === 'cancel') return;
    var $popupContent = this.getPopupContent();
    this._dataController.dataErrorOccurred.fire(arg, $popupContent);
  };
  _proto._needToCloseEditableCell = function _needToCloseEditableCell($targetElement) {};
  _proto._closeEditItem = function _closeEditItem($targetElement) {};
  _proto._handleDataChanged = function _handleDataChanged(args) {};
  _proto._isDefaultButtonVisible = function _isDefaultButtonVisible(button, options) {
    var result = true;
    // eslint-disable-next-line default-case
    switch (button.name) {
      case 'delete':
        result = this.allowDeleting(options);
        break;
      case 'undelete':
        result = false;
    }
    return result;
  };
  _proto._isButtonVisible = function _isButtonVisible(button, options) {
    var visible = button.visible;
    if (!(0, _type.isDefined)(visible)) {
      return this._isDefaultButtonVisible(button, options);
    }
    return (0, _type.isFunction)(visible) ? visible.call(button, {
      component: options.component,
      row: options.row,
      column: options.column
    }) : visible;
  };
  _proto._isButtonDisabled = function _isButtonDisabled(button, options) {
    var disabled = button.disabled;
    return (0, _type.isFunction)(disabled) ? disabled.call(button, {
      component: options.component,
      row: options.row,
      column: options.column
    }) : !!disabled;
  };
  _proto._getButtonConfig = function _getButtonConfig(button, options) {
    var _this3 = this;
    var config = (0, _type.isObject)(button) ? button : {};
    var buttonName = (0, _m_editing_utils.getButtonName)(button);
    var editingTexts = (0, _m_editing_utils.getEditingTexts)(options);
    var methodName = _const.METHOD_NAMES[buttonName];
    var editingOptions = this.option('editing');
    var actionName = _const.ACTION_OPTION_NAMES[buttonName];
    var allowAction = actionName ? editingOptions[actionName] : true;
    return (0, _extend.extend)({
      name: buttonName,
      text: editingTexts[buttonName],
      cssClass: _const.EDIT_LINK_CLASS[buttonName]
    }, {
      onClick: methodName && function (e) {
        var event = e.event;
        event.stopPropagation();
        event.preventDefault();
        setTimeout(function () {
          options.row && allowAction && _this3[methodName] && _this3[methodName](options.row.rowIndex);
        });
      }
    }, config);
  };
  _proto._getEditingButtons = function _getEditingButtons(options) {
    var _this4 = this;
    var buttonIndex;
    var haveCustomButtons = !!options.column.buttons;
    var buttons = (options.column.buttons || []).slice();
    if (haveCustomButtons) {
      buttonIndex = (0, _m_editing_utils.getButtonIndex)(buttons, 'edit');
      if (buttonIndex >= 0) {
        if ((0, _m_editing_utils.getButtonIndex)(buttons, 'save') < 0) {
          buttons.splice(buttonIndex + 1, 0, 'save');
        }
        if ((0, _m_editing_utils.getButtonIndex)(buttons, 'cancel') < 0) {
          buttons.splice((0, _m_editing_utils.getButtonIndex)(buttons, 'save') + 1, 0, 'cancel');
        }
      }
      buttonIndex = (0, _m_editing_utils.getButtonIndex)(buttons, 'delete');
      if (buttonIndex >= 0 && (0, _m_editing_utils.getButtonIndex)(buttons, 'undelete') < 0) {
        buttons.splice(buttonIndex + 1, 0, 'undelete');
      }
    } else {
      buttons = _const.BUTTON_NAMES.slice();
    }
    return buttons.map(function (button) {
      return _this4._getButtonConfig(button, options);
    });
  };
  _proto._renderEditingButtons = function _renderEditingButtons($container, buttons, options, change) {
    var _this5 = this;
    buttons.forEach(function (button) {
      if (_this5._isButtonVisible(button, options)) {
        _this5._createButton($container, button, options, change);
      }
    });
  };
  _proto._getEditCommandCellTemplate = function _getEditCommandCellTemplate() {
    var _this6 = this;
    return function (container, options, change) {
      var $container = (0, _renderer.default)(container);
      if (options.rowType === 'data') {
        var buttons = _this6._getEditingButtons(options);
        _this6._renderEditingButtons($container, buttons, options, change);
        options.watch && options.watch(function () {
          return buttons.map(function (button) {
            return {
              visible: _this6._isButtonVisible(button, options),
              disabled: _this6._isButtonDisabled(button, options)
            };
          });
        }, function () {
          $container.empty();
          _this6._renderEditingButtons($container, buttons, options);
        });
      } else {
        _m_utils.default.setEmptyText($container);
      }
    };
  };
  _proto.isRowBasedEditMode = function isRowBasedEditMode() {
    var editMode = this.getEditMode();
    return _const.ROW_BASED_MODES.includes(editMode);
  };
  _proto.getFirstEditableColumnIndex = function getFirstEditableColumnIndex() {
    var columnsController = this.getController('columns');
    var columnIndex;
    var visibleColumns = columnsController.getVisibleColumns();
    // @ts-expect-error
    (0, _iterator.each)(visibleColumns, function (index, column) {
      if (column.allowEditing) {
        columnIndex = index;
        return false;
      }
    });
    return columnIndex;
  };
  _proto.getFirstEditableCellInRow = function getFirstEditableCellInRow(rowIndex) {
    var rowsView = this.getView('rowsView');
    var columnIndex = this.getFirstEditableColumnIndex();
    return rowsView === null || rowsView === void 0 ? void 0 : rowsView._getCellElement(rowIndex || 0, columnIndex);
  };
  _proto.getFocusedCellInRow = function getFocusedCellInRow(rowIndex) {
    return this.getFirstEditableCellInRow(rowIndex);
  };
  _proto.getIndexByKey = function getIndexByKey(key, items) {
    return _m_utils.default.getIndexByKey(key, items);
  };
  _proto.hasChanges = function hasChanges(rowIndex) {
    var changes = this.getChanges();
    var result = false;
    for (var i = 0; i < (changes === null || changes === void 0 ? void 0 : changes.length); i++) {
      if (changes[i].type && (!(0, _type.isDefined)(rowIndex) || this._dataController.getRowIndexByKey(changes[i].key) === rowIndex)) {
        result = true;
        break;
      }
    }
    return result;
  };
  _proto.dispose = function dispose() {
    _modules$ViewControll.prototype.dispose.call(this);
    clearTimeout(this._inputFocusTimeoutID);
    _events_engine.default.off(_dom_adapter.default.getDocument(), _pointer.default.up, this._pointerUpEditorHandler);
    _events_engine.default.off(_dom_adapter.default.getDocument(), _pointer.default.down, this._pointerDownEditorHandler);
    _events_engine.default.off(_dom_adapter.default.getDocument(), _click.name, this._saveEditorHandler);
  }
  // @ts-expect-error
  ;
  _proto._silentOption = function _silentOption(name, value) {
    if (name === 'editing.changes') {
      this._changes = (0, _object.deepExtendArraySafe)([], value);
    }
    // @ts-expect-error
    _modules$ViewControll.prototype._silentOption.call(this, name, value);
  };
  _proto.optionChanged = function optionChanged(args) {
    if (args.name === 'editing') {
      var fullName = args.fullName;
      if (fullName === _const.EDITING_EDITROWKEY_OPTION_NAME) {
        this._handleEditRowKeyChange(args);
      } else if (fullName === _const.EDITING_CHANGES_OPTION_NAME) {
        // to prevent render on optionChanged called by two-way binding - T1128881
        var isEqual = (0, _common.equalByValue)(args.value, this._changes, {
          maxDepth: 4
        });
        if (!isEqual) {
          this._changes = (0, _object.deepExtendArraySafe)([], args.value);
          this._handleChangesChange(args);
        }
      } else if (!args.handled) {
        this._columnsController.reinit();
        this.init();
        this.resetChanges();
        this._resetEditColumnName();
        this._resetEditRowKey();
      }
      args.handled = true;
    } else {
      _modules$ViewControll.prototype.optionChanged.call(this, args);
    }
  };
  _proto._handleEditRowKeyChange = function _handleEditRowKeyChange(args) {
    var rowIndex = this._dataController.getRowIndexByKey(args.value);
    var oldRowIndexCorrection = this._getEditRowIndexCorrection();
    var oldRowIndex = this._dataController.getRowIndexByKey(args.previousValue) + oldRowIndexCorrection;
    if ((0, _type.isDefined)(args.value)) {
      if (args.value !== args.previousValue) {
        this._editRowFromOptionChanged(rowIndex, oldRowIndex);
      }
    } else {
      this.cancelEditData();
    }
  };
  _proto._handleChangesChange = function _handleChangesChange(args) {
    var _this7 = this;
    var dataController = this._dataController;
    var changes = args.value;
    if (!args.value.length && !args.previousValue.length) {
      return;
    }
    changes.forEach(function (change) {
      var _a;
      if (change.type === 'insert') {
        _this7._addInsertInfo(change);
      } else {
        var items = dataController.getCachedStoreData() || ((_a = dataController.items()) === null || _a === void 0 ? void 0 : _a.map(function (item) {
          return item.data;
        }));
        var rowIndex = _m_utils.default.getIndexByKey(change.key, items, dataController.key());
        _this7._addInternalData({
          key: change.key,
          oldData: items[rowIndex]
        });
      }
    });
    dataController.updateItems({
      repaintChangesOnly: true,
      isLiveUpdate: false,
      isOptionChanged: true
    });
  };
  _proto.publicMethods = function publicMethods() {
    return ['addRow', 'deleteRow', 'undeleteRow', 'editRow', 'saveEditData', 'cancelEditData', 'hasEditData'];
  };
  _proto.refresh = function refresh() {
    if (!(0, _type.isDefined)(this._pageIndex)) {
      return;
    }
    // @ts-expect-error
    this._refreshCore.apply(this, arguments);
  };
  _proto._refreshCore = function _refreshCore(params) {};
  _proto.isEditing = function isEditing() {
    var isEditRowKeyDefined = (0, _type.isDefined)(this.option(_const.EDITING_EDITROWKEY_OPTION_NAME));
    return isEditRowKeyDefined;
  };
  _proto.isEditRow = function isEditRow(rowIndex) {
    return false;
  };
  _proto._setEditRowKey = function _setEditRowKey(value, silent) {
    if (silent) {
      this._silentOption(_const.EDITING_EDITROWKEY_OPTION_NAME, value);
    } else {
      this.option(_const.EDITING_EDITROWKEY_OPTION_NAME, value);
    }
    if (this._refocusEditCell) {
      this._refocusEditCell = false;
      this._focusEditingCell();
    }
  };
  _proto._setEditRowKeyByIndex = function _setEditRowKeyByIndex(rowIndex, silent) {
    var key = this._dataController.getKeyByRowIndex(rowIndex);
    if (key === undefined) {
      this._dataController.fireError('E1043');
      return;
    }
    this._setEditRowKey(key, silent);
  };
  _proto.getEditRowIndex = function getEditRowIndex() {
    return this._getVisibleEditRowIndex();
  };
  _proto.getEditFormRowIndex = function getEditFormRowIndex() {
    return -1;
  };
  _proto.isEditRowByIndex = function isEditRowByIndex(rowIndex) {
    var key = this._dataController.getKeyByRowIndex(rowIndex);
    // Vitik: performance optimization equalByValue take O(1)
    var isKeyEqual = (0, _type.isDefined)(key) && (0, _common.equalByValue)(this.option(_const.EDITING_EDITROWKEY_OPTION_NAME), key);
    if (isKeyEqual) {
      // Vitik: performance optimization _getVisibleEditRowIndex take O(n)
      return this._getVisibleEditRowIndex() === rowIndex;
    }
    return isKeyEqual;
  };
  _proto.isEditCell = function isEditCell(visibleRowIndex, columnIndex) {
    return this.isEditRowByIndex(visibleRowIndex) && this._getVisibleEditColumnIndex() === columnIndex;
  };
  _proto.getPopupContent = function getPopupContent() {};
  _proto._isProcessedItem = function _isProcessedItem(item) {
    return false;
  };
  _proto._getInsertRowIndex = function _getInsertRowIndex(items, change, isProcessedItems) {
    var _this8 = this;
    var result = -1;
    var dataController = this._dataController;
    var key = this._getInsertAfterOrBeforeKey(change);
    if (!(0, _type.isDefined)(key) && items.length === 0) {
      result = 0;
    } else if ((0, _type.isDefined)(key)) {
      // @ts-expect-error
      // eslint-disable-next-line array-callback-return
      items.some(function (item, index) {
        var isProcessedItem = isProcessedItems || _this8._isProcessedItem(item);
        if ((0, _type.isObject)(item)) {
          if (isProcessedItem || (0, _type.isDefined)(item[_const.INSERT_INDEX])) {
            // @ts-expect-error
            if ((0, _common.equalByValue)(item.key, key)) {
              result = index;
            }
          } else if ((0, _common.equalByValue)(dataController.keyOf(item), key)) {
            result = index;
          }
        }
        if (result >= 0) {
          var nextItem = items[result + 1];
          if (nextItem && (nextItem.rowType === 'detail' || nextItem.rowType === 'detailAdaptive') && (0, _type.isDefined)(change.insertAfterKey)) {
            return;
          }
          if ((0, _type.isDefined)(change.insertAfterKey)) {
            result += 1;
          }
          return true;
        }
      });
    }
    return result;
  };
  _proto._generateNewItem = function _generateNewItem(key) {
    var _a;
    var item = {
      key
    };
    var insertInfo = (_a = this._getInternalData(key)) === null || _a === void 0 ? void 0 : _a.insertInfo;
    if (insertInfo === null || insertInfo === void 0 ? void 0 : insertInfo[_const.INSERT_INDEX]) {
      item[_const.INSERT_INDEX] = insertInfo[_const.INSERT_INDEX];
    }
    return item;
  };
  _proto._getLoadedRowIndex = function _getLoadedRowIndex(items, change, isProcessedItems) {
    var loadedRowIndex = this._getInsertRowIndex(items, change, isProcessedItems);
    var dataController = this._dataController;
    if (loadedRowIndex < 0) {
      var newRowPosition = this._getNewRowPosition();
      var pageIndex = dataController.pageIndex();
      var insertAfterOrBeforeKey = this._getInsertAfterOrBeforeKey(change);
      if (newRowPosition !== _const.LAST_NEW_ROW_POSITION && pageIndex === 0 && !(0, _type.isDefined)(insertAfterOrBeforeKey)) {
        loadedRowIndex = 0;
      } else if (newRowPosition === _const.LAST_NEW_ROW_POSITION && dataController.isLastPageLoaded()) {
        loadedRowIndex = items.length;
      }
    }
    return loadedRowIndex;
  };
  _proto.processItems = function processItems(items, e) {
    var _this9 = this;
    var changeType = e.changeType;
    this.update(changeType);
    var changes = this.getChanges();
    changes.forEach(function (change) {
      var _a;
      var isInsert = change.type === _const.DATA_EDIT_DATA_INSERT_TYPE;
      if (!isInsert) {
        return;
      }
      var key = change.key;
      var insertInfo = (_a = _this9._getInternalData(key)) === null || _a === void 0 ? void 0 : _a.insertInfo;
      if (!(0, _type.isDefined)(key) || !(0, _type.isDefined)(insertInfo)) {
        insertInfo = _this9._addInsertInfo(change);
        key = insertInfo.key;
      }
      var loadedRowIndex = _this9._getLoadedRowIndex(items, change);
      var item = _this9._generateNewItem(key);
      if (loadedRowIndex >= 0) {
        items.splice(loadedRowIndex, 0, item);
      }
    });
    return items;
  };
  _proto.processDataItem = function processDataItem(item, options, generateDataValues) {
    var columns = options.visibleColumns;
    var key = item.data[_const.INSERT_INDEX] ? item.data.key : item.key;
    var changes = this.getChanges();
    var editIndex = _m_utils.default.getIndexByKey(key, changes);
    item.isEditing = false;
    if (editIndex >= 0) {
      this._processDataItemCore(item, changes[editIndex], key, columns, generateDataValues);
    }
  };
  _proto._processDataItemCore = function _processDataItemCore(item, change, key, columns, generateDataValues) {
    var data = change.data,
      type = change.type;
    // eslint-disable-next-line default-case
    switch (type) {
      case _const.DATA_EDIT_DATA_INSERT_TYPE:
        item.isNewRow = true;
        item.key = key;
        item.data = data;
        break;
      case _const.DATA_EDIT_DATA_UPDATE_TYPE:
        item.modified = true;
        item.oldData = item.data;
        item.data = (0, _array_utils.createObjectWithChanges)(item.data, data);
        item.modifiedValues = generateDataValues(data, columns, true);
        break;
      case _const.DATA_EDIT_DATA_REMOVE_TYPE:
        item.removed = true;
        break;
    }
  };
  _proto._initNewRow = function _initNewRow(options) {
    var _this10 = this;
    this.executeAction('onInitNewRow', options);
    if (options.promise) {
      // @ts-expect-error
      var deferred = new _deferred.Deferred();
      (0, _deferred.when)((0, _deferred.fromPromise)(options.promise)).done(deferred.resolve).fail((0, _m_editing_utils.createFailureHandler)(deferred)).fail(function (arg) {
        return _this10._fireDataErrorOccurred(arg);
      });
      return deferred;
    }
  };
  _proto._createInsertInfo = function _createInsertInfo() {
    var insertInfo = {};
    insertInfo[_const.INSERT_INDEX] = this._getInsertIndex();
    return insertInfo;
  };
  _proto._addInsertInfo = function _addInsertInfo(change, parentKey) {
    var _a;
    var insertInfo;
    change.key = this.getChangeKeyValue(change);
    var key = change.key;
    insertInfo = (_a = this._getInternalData(key)) === null || _a === void 0 ? void 0 : _a.insertInfo;
    if (!(0, _type.isDefined)(insertInfo)) {
      var insertAfterOrBeforeKey = this._getInsertAfterOrBeforeKey(change);
      insertInfo = this._createInsertInfo();
      if (!(0, _type.isDefined)(insertAfterOrBeforeKey)) {
        this._setInsertAfterOrBeforeKey(change, parentKey);
      }
    }
    this._addInternalData({
      insertInfo,
      key
    });
    return {
      insertInfo,
      key
    };
  };
  _proto.getChangeKeyValue = function getChangeKeyValue(change) {
    if ((0, _type.isDefined)(change.key)) {
      return change.key;
    }
    var keyExpr = this._dataController.key();
    var keyValue;
    if (change.data && keyExpr && !Array.isArray(keyExpr)) {
      keyValue = change.data[keyExpr];
    }
    if (!(0, _type.isDefined)(keyValue)) {
      keyValue = (0, _m_editing_utils.generateNewRowTempKey)();
    }
    return keyValue;
  };
  _proto._setInsertAfterOrBeforeKey = function _setInsertAfterOrBeforeKey(change, parentKey) {
    var dataController = this._dataController;
    var allItems = dataController.items(true);
    var rowsView = this.getView('rowsView');
    var newRowPosition = this._getNewRowPosition();
    switch (newRowPosition) {
      case _const.FIRST_NEW_ROW_POSITION:
      case _const.LAST_NEW_ROW_POSITION:
        break;
      case _const.PAGE_TOP_NEW_ROW_POSITION:
      case _const.PAGE_BOTTOM_NEW_ROW_POSITION:
        if (allItems.length) {
          var itemIndex = newRowPosition === _const.PAGE_TOP_NEW_ROW_POSITION ? 0 : allItems.length - 1;
          change[itemIndex === 0 ? 'insertBeforeKey' : 'insertAfterKey'] = allItems[itemIndex].key;
        }
        break;
      default:
        {
          var isViewportBottom = newRowPosition === _const.VIEWPORT_BOTTOM_NEW_ROW_POSITION;
          var visibleItemIndex = isViewportBottom ? rowsView === null || rowsView === void 0 ? void 0 : rowsView.getBottomVisibleItemIndex() : rowsView === null || rowsView === void 0 ? void 0 : rowsView.getTopVisibleItemIndex();
          var row = dataController.getVisibleRows()[visibleItemIndex];
          if (row && (!row.isEditing && row.rowType === 'detail' || row.rowType === 'detailAdaptive')) {
            visibleItemIndex++;
          }
          var insertKey = dataController.getKeyByRowIndex(visibleItemIndex);
          if ((0, _type.isDefined)(insertKey)) {
            change.insertBeforeKey = insertKey;
          }
        }
    }
  };
  _proto._getInsertIndex = function _getInsertIndex() {
    var _this11 = this;
    var maxInsertIndex = 0;
    this.getChanges().forEach(function (editItem) {
      var _a;
      var insertInfo = (_a = _this11._getInternalData(editItem.key)) === null || _a === void 0 ? void 0 : _a.insertInfo;
      if ((0, _type.isDefined)(insertInfo) && editItem.type === _const.DATA_EDIT_DATA_INSERT_TYPE && insertInfo[_const.INSERT_INDEX] > maxInsertIndex) {
        maxInsertIndex = insertInfo[_const.INSERT_INDEX];
      }
    });
    return maxInsertIndex + 1;
  };
  _proto._getInsertAfterOrBeforeKey = function _getInsertAfterOrBeforeKey(insertChange) {
    var _a;
    return (_a = insertChange.insertAfterKey) !== null && _a !== void 0 ? _a : insertChange.insertBeforeKey;
  };
  _proto._getPageIndexToInsertRow = function _getPageIndexToInsertRow() {
    var newRowPosition = this._getNewRowPosition();
    var dataController = this._dataController;
    var pageIndex = dataController.pageIndex();
    var lastPageIndex = dataController.pageCount() - 1;
    if (newRowPosition === _const.FIRST_NEW_ROW_POSITION && pageIndex !== 0) {
      return 0;
    }
    if (newRowPosition === _const.LAST_NEW_ROW_POSITION && pageIndex !== lastPageIndex) {
      return lastPageIndex;
    }
    return -1;
  };
  _proto.addRow = function addRow(parentKey) {
    var dataController = this._dataController;
    var store = dataController.store();
    if (!store) {
      dataController.fireError('E1052', this.component.NAME);
      // @ts-expect-error
      return new _deferred.Deferred().reject();
    }
    return this._addRow(parentKey);
  };
  _proto._addRow = function _addRow(parentKey) {
    var _this12 = this;
    var dataController = this._dataController;
    var store = dataController.store();
    var key = store && store.key();
    var param = {
      data: {}
    };
    var oldEditRowIndex = this._getVisibleEditRowIndex();
    // @ts-expect-error
    var deferred = new _deferred.Deferred();
    // @ts-expect-error
    this.refresh({
      allowCancelEditing: true
    });
    if (!this._allowRowAdding()) {
      (0, _deferred.when)(this._navigateToNewRow(oldEditRowIndex)).done(deferred.resolve).fail(deferred.reject);
      return deferred.promise();
    }
    if (!key) {
      param.data.__KEY__ = String(new _guid.default());
    }
    // @ts-expect-error
    (0, _deferred.when)(this._initNewRow(param, parentKey)).done(function () {
      if (_this12._allowRowAdding()) {
        (0, _deferred.when)(_this12._addRowCore(param.data, parentKey, oldEditRowIndex)).done(deferred.resolve).fail(deferred.reject);
      } else {
        deferred.reject('cancel');
      }
    }).fail(deferred.reject);
    return deferred.promise();
  };
  _proto._allowRowAdding = function _allowRowAdding(params) {
    var insertIndex = this._getInsertIndex();
    if (insertIndex > 1) {
      return false;
    }
    return true;
  };
  _proto._addRowCore = function _addRowCore(data, parentKey, initialOldEditRowIndex) {
    var change = {
      data,
      type: _const.DATA_EDIT_DATA_INSERT_TYPE
    };
    var editRowIndex = this._getVisibleEditRowIndex();
    var insertInfo = this._addInsertInfo(change, parentKey);
    var key = insertInfo.key;
    this._setEditRowKey(key, true);
    this._addChange(change);
    return this._navigateToNewRow(initialOldEditRowIndex, change, editRowIndex);
  };
  _proto._navigateToNewRow = function _navigateToNewRow(oldEditRowIndex, change, editRowIndex) {
    var _this13 = this;
    // @ts-expect-error
    var d = new _deferred.Deferred();
    var dataController = this._dataController;
    var focusController = this.getController('focus');
    editRowIndex = editRowIndex !== null && editRowIndex !== void 0 ? editRowIndex : -1;
    change = change !== null && change !== void 0 ? change : this.getChanges().filter(function (c) {
      return c.type === _const.DATA_EDIT_DATA_INSERT_TYPE;
    })[0];
    if (!change) {
      return d.reject('cancel').promise();
    }
    var pageIndexToInsertRow = this._getPageIndexToInsertRow();
    var rowIndex = this._getLoadedRowIndex(dataController.items(), change, true);
    var navigateToRowByKey = function navigateToRowByKey(key) {
      (0, _deferred.when)(focusController === null || focusController === void 0 ? void 0 : focusController.navigateToRow(key)).done(function () {
        rowIndex = dataController.getRowIndexByKey(change.key);
        d.resolve();
      });
    };
    var insertAfterOrBeforeKey = this._getInsertAfterOrBeforeKey(change);
    if (pageIndexToInsertRow >= 0) {
      dataController.pageIndex(pageIndexToInsertRow).done(function () {
        navigateToRowByKey(change.key);
      }).fail(d.reject);
    } else if (rowIndex < 0 && (0, _type.isDefined)(insertAfterOrBeforeKey)) {
      navigateToRowByKey(insertAfterOrBeforeKey);
    } else {
      dataController.updateItems({
        changeType: 'update',
        rowIndices: [oldEditRowIndex, editRowIndex, rowIndex]
      });
      rowIndex = dataController.getRowIndexByKey(change.key);
      if (rowIndex < 0) {
        navigateToRowByKey(change.key);
      } else {
        d.resolve();
      }
    }
    d.done(function () {
      var _a;
      (_a = _this13._rowsView) === null || _a === void 0 ? void 0 : _a.waitAsyncTemplates(true).done(function () {
        _this13._showAddedRow(rowIndex);
        // @ts-expect-error
        _this13._afterInsertRow(change.key);
      });
    });
    return d.promise();
  };
  _proto._showAddedRow = function _showAddedRow(rowIndex) {
    this._focusFirstEditableCellInRow(rowIndex);
  };
  _proto._beforeFocusElementInRow = function _beforeFocusElementInRow(rowIndex) {};
  _proto._focusFirstEditableCellInRow = function _focusFirstEditableCellInRow(rowIndex) {
    var _this14 = this;
    var dataController = this._dataController;
    var keyboardController = this.getController('keyboardNavigation');
    var key = dataController.getKeyByRowIndex(rowIndex);
    var $firstCell = this.getFirstEditableCellInRow(rowIndex);
    keyboardController === null || keyboardController === void 0 ? void 0 : keyboardController.focus($firstCell);
    this.option('focusedRowKey', key);
    this._editCellInProgress = true;
    this._delayedInputFocus($firstCell, function () {
      rowIndex = dataController.getRowIndexByKey(key);
      _this14._editCellInProgress = false;
      _this14._beforeFocusElementInRow(rowIndex);
    });
  };
  _proto._isEditingStart = function _isEditingStart(options) {
    this.executeAction('onEditingStart', options);
    return options.cancel;
  };
  _proto._beforeUpdateItems = function _beforeUpdateItems() {};
  _proto._getVisibleEditColumnIndex = function _getVisibleEditColumnIndex() {
    var editColumnName = this.option(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME);
    if (!(0, _type.isDefined)(editColumnName)) {
      return -1;
    }
    return this._columnsController.getVisibleColumnIndex(editColumnName);
  };
  _proto._setEditColumnNameByIndex = function _setEditColumnNameByIndex(index, silent) {
    var _a;
    var visibleColumns = this._columnsController.getVisibleColumns();
    this._setEditColumnName((_a = visibleColumns[index]) === null || _a === void 0 ? void 0 : _a.name, silent);
  };
  _proto._setEditColumnName = function _setEditColumnName(name, silent) {
    if (silent) {
      this._silentOption(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME, name);
    } else {
      this.option(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME, name);
    }
  };
  _proto._resetEditColumnName = function _resetEditColumnName() {
    this._setEditColumnName(null, true);
  };
  _proto._getEditColumn = function _getEditColumn() {
    var editColumnName = this.option(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME);
    return this._getColumnByName(editColumnName);
  };
  _proto._getColumnByName = function _getColumnByName(name) {
    var visibleColumns = this._columnsController.getVisibleColumns();
    var editColumn;
    // @ts-expect-error
    // eslint-disable-next-line array-callback-return
    (0, _type.isDefined)(name) && visibleColumns.some(function (column) {
      if (column.name === name) {
        editColumn = column;
        return true;
      }
    });
    return editColumn;
  };
  _proto._getVisibleEditRowIndex = function _getVisibleEditRowIndex(columnName) {
    var dataController = this._dataController;
    var editRowKey = this.option(_const.EDITING_EDITROWKEY_OPTION_NAME);
    var rowIndex = dataController.getRowIndexByKey(editRowKey);
    if (rowIndex === -1) {
      return rowIndex;
    }
    return rowIndex + this._getEditRowIndexCorrection(columnName);
  };
  _proto._getEditRowIndexCorrection = function _getEditRowIndexCorrection(columnName) {
    var editColumn = columnName ? this._getColumnByName(columnName) : this._getEditColumn();
    var isColumnHidden = (editColumn === null || editColumn === void 0 ? void 0 : editColumn.visibleWidth) === 'adaptiveHidden';
    return isColumnHidden ? 1 : 0;
  };
  _proto._resetEditRowKey = function _resetEditRowKey() {
    this._refocusEditCell = false;
    this._setEditRowKey(null, true);
  };
  _proto._resetEditIndices = function _resetEditIndices() {
    this._resetEditColumnName();
    this._resetEditRowKey();
  }
  // @ts-expect-error
  ;
  _proto.editRow = function editRow(rowIndex) {
    var _a;
    var dataController = this._dataController;
    var items = dataController.items();
    var item = items[rowIndex];
    var params = {
      data: item && item.data,
      cancel: false
    };
    var oldRowIndex = this._getVisibleEditRowIndex();
    if (!item) {
      return;
    }
    if (rowIndex === oldRowIndex) {
      return true;
    }
    if (item.key === undefined) {
      this._dataController.fireError('E1043');
      return;
    }
    if (!item.isNewRow) {
      params.key = item.key;
    }
    if (this._isEditingStart(params)) {
      return;
    }
    this.resetChanges();
    this.init();
    this._resetEditColumnName();
    this._pageIndex = dataController.pageIndex();
    this._addInternalData({
      key: item.key,
      oldData: (_a = item.oldData) !== null && _a !== void 0 ? _a : item.data
    });
    this._setEditRowKey(item.key);
  };
  _proto._editRowFromOptionChanged = function _editRowFromOptionChanged(rowIndex, oldRowIndex) {
    var rowIndices = [oldRowIndex, rowIndex];
    // @ts-expect-error
    this._beforeUpdateItems(rowIndices, rowIndex, oldRowIndex);
    this._editRowFromOptionChangedCore(rowIndices, rowIndex);
  };
  _proto._editRowFromOptionChangedCore = function _editRowFromOptionChangedCore(rowIndices, rowIndex, preventRendering) {
    this._needFocusEditor = true;
    this._dataController.updateItems({
      changeType: 'update',
      rowIndices,
      cancel: preventRendering
    });
  };
  _proto._focusEditorIfNeed = function _focusEditorIfNeed() {};
  _proto._showEditPopup = function _showEditPopup(rowIndex, repaintForm) {};
  _proto._repaintEditPopup = function _repaintEditPopup() {};
  _proto._getEditPopupHiddenHandler = function _getEditPopupHiddenHandler() {
    var _this15 = this;
    return function (e) {
      if (_this15.isEditing()) {
        _this15.cancelEditData();
      }
    };
  };
  _proto._getPopupEditFormTemplate = function _getPopupEditFormTemplate(rowIndex) {};
  _proto._getSaveButtonConfig = function _getSaveButtonConfig() {
    return {
      text: this.option('editing.texts.saveRowChanges'),
      onClick: this.saveEditData.bind(this)
    };
  };
  _proto._getCancelButtonConfig = function _getCancelButtonConfig() {
    return {
      text: this.option('editing.texts.cancelRowChanges'),
      onClick: this.cancelEditData.bind(this)
    };
  };
  _proto._removeInternalData = function _removeInternalData(key) {
    var internalData = this._getInternalData(key);
    var index = this._internalState.indexOf(internalData);
    if (index > -1) {
      this._internalState.splice(index, 1);
    }
  };
  _proto._updateInsertAfterOrBeforeKeys = function _updateInsertAfterOrBeforeKeys(changes, index) {
    var _this16 = this;
    var removeChange = changes[index];
    changes.forEach(function (change) {
      var insertAfterOrBeforeKey = _this16._getInsertAfterOrBeforeKey(change);
      if ((0, _common.equalByValue)(insertAfterOrBeforeKey, removeChange.key)) {
        change[(0, _type.isDefined)(change.insertAfterKey) ? 'insertAfterKey' : 'insertBeforeKey'] = _this16._getInsertAfterOrBeforeKey(removeChange);
      }
    });
  };
  _proto._removeChange = function _removeChange(index) {
    if (index >= 0) {
      var changes = _toConsumableArray(this.getChanges());
      var key = changes[index].key;
      this._removeInternalData(key);
      this._updateInsertAfterOrBeforeKeys(changes, index);
      changes.splice(index, 1);
      this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, changes);
      if ((0, _common.equalByValue)(this.option(_const.EDITING_EDITROWKEY_OPTION_NAME), key)) {
        this._resetEditIndices();
      }
    }
  };
  _proto.executeOperation = function executeOperation(deferred, func) {
    var _this17 = this;
    this._lastOperation && this._lastOperation.reject();
    this._lastOperation = deferred;
    this.waitForDeferredOperations().done(function () {
      if (deferred.state() === 'rejected') {
        return;
      }
      func();
      _this17._lastOperation = null;
    }).fail(function () {
      deferred.reject();
      _this17._lastOperation = null;
    });
  };
  _proto.waitForDeferredOperations = function waitForDeferredOperations() {
    return _deferred.when.apply(void 0, _toConsumableArray(this._deferreds));
  };
  _proto._processCanceledEditingCell = function _processCanceledEditingCell() {};
  _proto._repaintEditCell = function _repaintEditCell(column, oldColumn, oldEditRowIndex) {
    this._needFocusEditor = true;
    if (!column || !column.showEditorAlways || oldColumn && !oldColumn.showEditorAlways) {
      this._editCellInProgress = true;
      // T316439
      this.getController('editorFactory').loseFocus();
      this._dataController.updateItems({
        changeType: 'update',
        rowIndices: [oldEditRowIndex, this._getVisibleEditRowIndex()]
      });
    } else if (column !== oldColumn) {
      // TODO check this necessity T816039
      this._dataController.updateItems({
        changeType: 'update',
        rowIndices: []
      });
    }
  };
  _proto._delayedInputFocus = function _delayedInputFocus($cell, beforeFocusCallback, callBeforeFocusCallbackAlways) {
    var _this18 = this;
    var inputFocus = function inputFocus() {
      if (beforeFocusCallback) {
        beforeFocusCallback();
      }
      if ($cell) {
        var $focusableElement = $cell.find(_const.FOCUSABLE_ELEMENT_SELECTOR).first();
        _m_utils.default.focusAndSelectElement(_this18, $focusableElement);
      }
      _this18._beforeFocusCallback = null;
    };
    if (_devices.default.real().ios || _devices.default.real().android) {
      inputFocus();
    } else {
      if (this._beforeFocusCallback) this._beforeFocusCallback();
      clearTimeout(this._inputFocusTimeoutID);
      if (callBeforeFocusCallbackAlways) {
        this._beforeFocusCallback = beforeFocusCallback;
      }
      this._inputFocusTimeoutID = setTimeout(inputFocus);
    }
  };
  _proto._focusEditingCell = function _focusEditingCell(beforeFocusCallback, $editCell, callBeforeFocusCallbackAlways) {
    var rowsView = this.getView('rowsView');
    var editColumnIndex = this._getVisibleEditColumnIndex();
    $editCell = $editCell || rowsView && rowsView._getCellElement(this._getVisibleEditRowIndex(), editColumnIndex);
    if ($editCell) {
      this._delayedInputFocus($editCell, beforeFocusCallback, callBeforeFocusCallbackAlways);
    }
  };
  _proto.deleteRow = function deleteRow(rowIndex) {
    this._checkAndDeleteRow(rowIndex);
  };
  _proto._checkAndDeleteRow = function _checkAndDeleteRow(rowIndex) {
    var _this19 = this;
    var editingOptions = this.option('editing');
    var editingTexts = editingOptions === null || editingOptions === void 0 ? void 0 : editingOptions.texts;
    var confirmDelete = editingOptions === null || editingOptions === void 0 ? void 0 : editingOptions.confirmDelete;
    var confirmDeleteMessage = editingTexts === null || editingTexts === void 0 ? void 0 : editingTexts.confirmDeleteMessage;
    var item = this._dataController.items()[rowIndex];
    var allowDeleting = !this.isEditing() || item.isNewRow; // T741746
    if (item && allowDeleting) {
      if (!confirmDelete || !confirmDeleteMessage) {
        this._deleteRowCore(rowIndex);
      } else {
        var confirmDeleteTitle = editingTexts && editingTexts.confirmDeleteTitle;
        var showDialogTitle = (0, _type.isDefined)(confirmDeleteTitle) && confirmDeleteTitle.length > 0;
        // @ts-expect-error
        (0, _dialog.confirm)(confirmDeleteMessage, confirmDeleteTitle, showDialogTitle).done(function (confirmResult) {
          if (confirmResult) {
            _this19._deleteRowCore(rowIndex);
          }
        });
      }
    }
  };
  _proto._deleteRowCore = function _deleteRowCore(rowIndex) {
    var dataController = this._dataController;
    var item = dataController.items()[rowIndex];
    var key = item && item.key;
    var oldEditRowIndex = this._getVisibleEditRowIndex();
    this.refresh();
    var changes = this.getChanges();
    var editIndex = _m_utils.default.getIndexByKey(key, changes);
    if (editIndex >= 0) {
      if (changes[editIndex].type === _const.DATA_EDIT_DATA_INSERT_TYPE) {
        this._removeChange(editIndex);
      } else {
        this._addChange({
          key,
          type: _const.DATA_EDIT_DATA_REMOVE_TYPE
        });
      }
    } else {
      this._addChange({
        key,
        oldData: item.data,
        type: _const.DATA_EDIT_DATA_REMOVE_TYPE
      });
    }
    return this._afterDeleteRow(rowIndex, oldEditRowIndex);
  };
  _proto._afterDeleteRow = function _afterDeleteRow(rowIndex, oldEditRowIndex) {
    return this.saveEditData();
  };
  _proto.undeleteRow = function undeleteRow(rowIndex) {
    var dataController = this._dataController;
    var item = dataController.items()[rowIndex];
    var oldEditRowIndex = this._getVisibleEditRowIndex();
    var key = item && item.key;
    var changes = this.getChanges();
    if (item) {
      var editIndex = _m_utils.default.getIndexByKey(key, changes);
      if (editIndex >= 0) {
        var data = changes[editIndex].data;
        if ((0, _type.isEmptyObject)(data)) {
          this._removeChange(editIndex);
        } else {
          this._addChange({
            key,
            type: _const.DATA_EDIT_DATA_UPDATE_TYPE
          });
        }
        dataController.updateItems({
          changeType: 'update',
          rowIndices: [oldEditRowIndex, rowIndex]
        });
      }
    }
  };
  _proto._fireOnSaving = function _fireOnSaving() {
    var _this20 = this;
    var onSavingParams = {
      cancel: false,
      promise: null,
      changes: _toConsumableArray(this.getChanges())
    };
    this.executeAction('onSaving', onSavingParams);
    // @ts-expect-error
    var d = new _deferred.Deferred();
    (0, _deferred.when)((0, _deferred.fromPromise)(onSavingParams.promise)).done(function () {
      d.resolve(onSavingParams);
    }).fail(function (arg) {
      (0, _m_editing_utils.createFailureHandler)(d);
      _this20._fireDataErrorOccurred(arg);
      d.resolve({
        cancel: true
      });
    });
    return d;
  };
  _proto._executeEditingAction = function _executeEditingAction(actionName, params, func) {
    if (this.component._disposed) {
      return null;
    }
    // @ts-expect-error
    var deferred = new _deferred.Deferred();
    this.executeAction(actionName, params);
    (0, _deferred.when)((0, _deferred.fromPromise)(params.cancel)).done(function (cancel) {
      if (cancel) {
        setTimeout(function () {
          deferred.resolve('cancel');
        });
      } else {
        func(params).done(deferred.resolve).fail((0, _m_editing_utils.createFailureHandler)(deferred));
      }
    }).fail((0, _m_editing_utils.createFailureHandler)(deferred));
    return deferred;
  };
  _proto._processChanges = function _processChanges(deferreds, results, dataChanges, changes) {
    var _this21 = this;
    var store = this._dataController.store();
    (0, _iterator.each)(changes, function (index, change) {
      var oldData = _this21._getOldData(change.key);
      var data = change.data,
        type = change.type;
      var changeCopy = _extends({}, change);
      var deferred;
      var params;
      // @ts-expect-error
      if (_this21._beforeSaveEditData(change, index)) {
        return;
      }
      // eslint-disable-next-line default-case
      switch (type) {
        case _const.DATA_EDIT_DATA_REMOVE_TYPE:
          params = {
            data: oldData,
            key: change.key,
            cancel: false
          };
          deferred = _this21._executeEditingAction('onRowRemoving', params, function () {
            return store.remove(change.key).done(function (key) {
              dataChanges.push({
                type: 'remove',
                key
              });
            });
          });
          break;
        case _const.DATA_EDIT_DATA_INSERT_TYPE:
          params = {
            data,
            cancel: false
          };
          deferred = _this21._executeEditingAction('onRowInserting', params, function () {
            return store.insert(params.data).done(function (data, key) {
              if ((0, _type.isDefined)(key)) {
                changeCopy.key = key;
              }
              if (data && (0, _type.isObject)(data) && data !== params.data) {
                changeCopy.data = data;
              }
              dataChanges.push({
                type: 'insert',
                data,
                index: 0
              });
            });
          });
          break;
        case _const.DATA_EDIT_DATA_UPDATE_TYPE:
          params = {
            newData: data,
            oldData,
            key: change.key,
            cancel: false
          };
          deferred = _this21._executeEditingAction('onRowUpdating', params, function () {
            return store.update(change.key, params.newData).done(function (data, key) {
              if (data && (0, _type.isObject)(data) && data !== params.newData) {
                changeCopy.data = data;
              }
              dataChanges.push({
                type: 'update',
                key,
                data
              });
            });
          });
          break;
      }
      changes[index] = changeCopy;
      if (deferred) {
        // @ts-expect-error
        var doneDeferred = new _deferred.Deferred();
        deferred.always(function (data) {
          results.push({
            key: change.key,
            result: data
          });
        }).always(doneDeferred.resolve);
        deferreds.push(doneDeferred.promise());
      }
    });
  };
  _proto._processRemoveIfError = function _processRemoveIfError(changes, editIndex) {
    var change = changes[editIndex];
    if ((change === null || change === void 0 ? void 0 : change.type) === _const.DATA_EDIT_DATA_REMOVE_TYPE) {
      if (editIndex >= 0) {
        changes.splice(editIndex, 1);
      }
    }
    return true;
  };
  _proto._processRemove = function _processRemove(changes, editIndex, cancel) {
    var change = changes[editIndex];
    if (!cancel || !change || change.type === _const.DATA_EDIT_DATA_REMOVE_TYPE) {
      return this._processRemoveCore(changes, editIndex, !cancel || !change);
    }
  };
  _proto._processRemoveCore = function _processRemoveCore(changes, editIndex, processIfBatch) {
    if (editIndex >= 0) {
      changes.splice(editIndex, 1);
    }
    return true;
  };
  _proto._processSaveEditDataResult = function _processSaveEditDataResult(results) {
    var hasSavedData = false;
    var changes = _toConsumableArray(this.getChanges());
    var changesLength = changes.length;
    for (var i = 0; i < results.length; i++) {
      var arg = results[i].result;
      var cancel = arg === 'cancel';
      var editIndex = _m_utils.default.getIndexByKey(results[i].key, changes);
      var change = changes[editIndex];
      var isError = arg && arg instanceof Error;
      if (isError) {
        if (change) {
          this._addInternalData({
            key: change.key,
            error: arg
          });
        }
        this._fireDataErrorOccurred(arg);
        if (this._processRemoveIfError(changes, editIndex)) {
          break;
        }
      } else if (this._processRemove(changes, editIndex, cancel)) {
        hasSavedData = !cancel;
      }
    }
    if (changes.length < changesLength) {
      this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, changes);
    }
    return hasSavedData;
  };
  _proto._fireSaveEditDataEvents = function _fireSaveEditDataEvents(changes) {
    var _this22 = this;
    (0, _iterator.each)(changes, function (_, _ref) {
      var data = _ref.data,
        key = _ref.key,
        type = _ref.type;
      var internalData = _this22._addInternalData({
        key
      });
      var params = {
        key,
        data
      };
      if (internalData.error) {
        params.error = internalData.error;
      }
      // eslint-disable-next-line default-case
      switch (type) {
        case _const.DATA_EDIT_DATA_REMOVE_TYPE:
          _this22.executeAction('onRowRemoved', (0, _extend.extend)({}, params, {
            data: internalData.oldData
          }));
          break;
        case _const.DATA_EDIT_DATA_INSERT_TYPE:
          _this22.executeAction('onRowInserted', params);
          break;
        case _const.DATA_EDIT_DATA_UPDATE_TYPE:
          _this22.executeAction('onRowUpdated', params);
          break;
      }
    });
    this.executeAction('onSaved', {
      changes
    });
  };
  _proto.saveEditData = function saveEditData() {
    var _this23 = this;
    // @ts-expect-error
    var deferred = new _deferred.Deferred();
    this.waitForDeferredOperations().done(function () {
      if (_this23.isSaving()) {
        _this23._resolveAfterSave(deferred);
        return;
      }
      (0, _deferred.when)(_this23._beforeSaveEditData()).done(function (cancel) {
        if (cancel) {
          // @ts-expect-error
          _this23._resolveAfterSave(deferred, {
            cancel
          });
          return;
        }
        _this23._saving = true;
        _this23._saveEditDataInner().always(function () {
          _this23._saving = false;
          if (_this23._refocusEditCell) {
            _this23._focusEditingCell();
          }
        }).done(deferred.resolve).fail(deferred.reject);
      }).fail(deferred.reject);
    }).fail(deferred.reject);
    return deferred.promise();
  }
  // @ts-expect-error
  ;
  _proto._resolveAfterSave = function _resolveAfterSave(deferred) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      cancel = _ref2.cancel,
      error = _ref2.error;
    // @ts-expect-error
    (0, _deferred.when)(this._afterSaveEditData(cancel)).done(function () {
      deferred.resolve(error);
    }).fail(deferred.reject);
  };
  _proto._saveEditDataInner = function _saveEditDataInner() {
    var _this24 = this;
    // @ts-expect-error
    var result = new _deferred.Deferred();
    var results = [];
    var deferreds = [];
    var dataChanges = [];
    var dataSource = this._dataController.dataSource();
    (0, _deferred.when)(this._fireOnSaving()).done(function (_ref3) {
      var cancel = _ref3.cancel,
        changes = _ref3.changes;
      if (cancel) {
        return result.resolve().promise();
      }
      _this24._processChanges(deferreds, results, dataChanges, changes);
      if (deferreds.length) {
        _this24._refocusEditCell = true;
        dataSource === null || dataSource === void 0 ? void 0 : dataSource.beginLoading();
        _deferred.when.apply(void 0, deferreds).done(function () {
          if (_this24._processSaveEditDataResult(results)) {
            _this24._endSaving(dataChanges, changes, result);
          } else {
            dataSource === null || dataSource === void 0 ? void 0 : dataSource.endLoading();
            result.resolve();
          }
        }).fail(function (error) {
          dataSource === null || dataSource === void 0 ? void 0 : dataSource.endLoading();
          result.resolve(error);
        });
        return result.always(function () {
          _this24._refocusEditCell = true;
        }).promise();
      }
      _this24._cancelSaving(result);
    }).fail(result.reject);
    return result.promise();
  };
  _proto._beforeEndSaving = function _beforeEndSaving(changes) {
    this._resetEditIndices();
  };
  _proto._endSaving = function _endSaving(dataChanges, changes, deferred) {
    var dataSource = this._dataController.dataSource();
    this._beforeEndSaving(changes);
    dataSource === null || dataSource === void 0 ? void 0 : dataSource.endLoading();
    this._refreshDataAfterSave(dataChanges, changes, deferred);
  };
  _proto._cancelSaving = function _cancelSaving(result) {
    this.executeAction('onSaved', {
      changes: []
    });
    this._resolveAfterSave(result);
  };
  _proto._refreshDataAfterSave = function _refreshDataAfterSave(dataChanges, changes, deferred) {
    var _this25 = this;
    var dataController = this._dataController;
    var refreshMode = this.option('editing.refreshMode');
    var isFullRefresh = refreshMode !== 'reshape' && refreshMode !== 'repaint';
    if (!isFullRefresh) {
      dataController.push(dataChanges);
    }
    (0, _deferred.when)(dataController.refresh({
      selection: isFullRefresh,
      reload: isFullRefresh,
      load: refreshMode === 'reshape',
      changesOnly: this.option('repaintChangesOnly')
    })).always(function () {
      _this25._fireSaveEditDataEvents(changes);
    }).done(function () {
      _this25._resolveAfterSave(deferred);
    }).fail(function (error) {
      // @ts-expect-error
      _this25._resolveAfterSave(deferred, {
        error
      });
    });
  };
  _proto.isSaving = function isSaving() {
    return this._saving;
  };
  _proto._updateEditColumn = function _updateEditColumn() {
    var isEditColumnVisible = this._isEditColumnVisible();
    var useIcons = this.option('editing.useIcons');
    var cssClass = _const.COMMAND_EDIT_CLASS + (useIcons ? " ".concat(_const.COMMAND_EDIT_WITH_ICONS_CLASS) : '');
    this._columnsController.addCommandColumn({
      type: 'buttons',
      command: 'edit',
      visible: isEditColumnVisible,
      cssClass,
      width: 'auto',
      alignment: 'center',
      cellTemplate: this._getEditCommandCellTemplate(),
      fixedPosition: 'right'
    });
    this._columnsController.columnOption('command:edit', {
      visible: isEditColumnVisible,
      cssClass
    });
  };
  _proto._isEditColumnVisible = function _isEditColumnVisible() {
    var editingOptions = this.option('editing');
    return editingOptions.allowDeleting;
  };
  _proto._isEditButtonDisabled = function _isEditButtonDisabled() {
    var hasChanges = this.hasChanges();
    var isEditRowDefined = (0, _type.isDefined)(this.option('editing.editRowKey'));
    return !(isEditRowDefined || hasChanges);
  };
  _proto._updateEditButtons = function _updateEditButtons() {
    var headerPanel = this.getView('headerPanel');
    var isButtonDisabled = this._isEditButtonDisabled();
    if (headerPanel) {
      headerPanel.setToolbarItemDisabled('saveButton', isButtonDisabled);
      headerPanel.setToolbarItemDisabled('revertButton', isButtonDisabled);
    }
  };
  _proto._applyModified = function _applyModified($element, options) {
    $element && $element.addClass(_const.CELL_MODIFIED);
  };
  _proto._beforeCloseEditCellInBatchMode = function _beforeCloseEditCellInBatchMode(rowIndices) {};
  _proto.cancelEditData = function cancelEditData() {
    var changes = this.getChanges();
    var params = {
      cancel: false,
      changes
    };
    this.executeAction('onEditCanceling', params);
    if (!params.cancel) {
      this._cancelEditDataCore();
      this.executeAction('onEditCanceled', {
        changes
      });
    }
  };
  _proto._cancelEditDataCore = function _cancelEditDataCore() {
    var rowIndex = this._getVisibleEditRowIndex();
    this._beforeCancelEditData();
    this.init();
    this.resetChanges();
    this._resetEditColumnName();
    this._resetEditRowKey();
    this._afterCancelEditData(rowIndex);
  };
  _proto._afterCancelEditData = function _afterCancelEditData(rowIndex) {
    var dataController = this._dataController;
    dataController.updateItems({
      repaintChangesOnly: this.option('repaintChangesOnly')
    });
  };
  _proto._hideEditPopup = function _hideEditPopup() {};
  _proto.hasEditData = function hasEditData() {
    return this.hasChanges();
  };
  _proto.update = function update(changeType) {
    var dataController = this._dataController;
    if (dataController && this._pageIndex !== dataController.pageIndex()) {
      if (changeType === 'refresh') {
        // @ts-expect-error
        this.refresh({
          isPageChanged: true
        });
      }
      this._pageIndex = dataController.pageIndex();
    }
    this._updateEditButtons();
  };
  _proto._getRowIndicesForCascadeUpdating = function _getRowIndicesForCascadeUpdating(row, skipCurrentRow) {
    return skipCurrentRow ? [] : [row.rowIndex];
  };
  _proto.addDeferred = function addDeferred(deferred) {
    var _this26 = this;
    if (this._deferreds.indexOf(deferred) < 0) {
      this._deferreds.push(deferred);
      deferred.always(function () {
        var index = _this26._deferreds.indexOf(deferred);
        if (index >= 0) {
          _this26._deferreds.splice(index, 1);
        }
      });
    }
  };
  _proto._prepareChange = function _prepareChange(options, value, text) {
    var _this27 = this;
    var _a;
    var newData = {};
    var oldData = (_a = options.row) === null || _a === void 0 ? void 0 : _a.data;
    var rowKey = options.key;
    // @ts-expect-error
    var deferred = new _deferred.Deferred();
    if (rowKey !== undefined) {
      options.value = value;
      var setCellValueResult = (0, _deferred.fromPromise)(options.column.setCellValue(newData, value, (0, _extend.extend)(true, {}, oldData), text));
      setCellValueResult.done(function () {
        deferred.resolve({
          data: newData,
          key: rowKey,
          oldData,
          type: _const.DATA_EDIT_DATA_UPDATE_TYPE
        });
      }).fail((0, _m_editing_utils.createFailureHandler)(deferred)).fail(function (arg) {
        return _this27._fireDataErrorOccurred(arg);
      });
      if ((0, _type.isDefined)(text) && options.column.displayValueMap) {
        options.column.displayValueMap[value] = text;
      }
      this._updateRowValues(options);
      this.addDeferred(deferred);
    }
    return deferred;
  };
  _proto._updateRowValues = function _updateRowValues(options) {
    if (options.values) {
      var dataController = this._dataController;
      var rowIndex = dataController.getRowIndexByKey(options.key);
      var row = dataController.getVisibleRows()[rowIndex];
      if (row) {
        options.row.values = row.values; // T1122209
        options.values = row.values;
      }
      options.values[options.columnIndex] = options.value;
    }
  };
  _proto.updateFieldValue = function updateFieldValue(options, value, text, forceUpdateRow) {
    var _this28 = this;
    var rowKey = options.key;
    // @ts-expect-error
    var deferred = new _deferred.Deferred();
    if (rowKey === undefined) {
      this._dataController.fireError('E1043');
    }
    if (options.column.setCellValue) {
      this._prepareChange(options, value, text).done(function (params) {
        (0, _deferred.when)(_this28._applyChange(options, params, forceUpdateRow)).always(function () {
          deferred.resolve();
        });
      });
    } else {
      deferred.resolve();
    }
    return deferred.promise();
  }
  // @ts-expect-error
  ;
  _proto._focusPreviousEditingCellIfNeed = function _focusPreviousEditingCellIfNeed(options) {
    if (this.hasEditData() && !this.isEditCell(options.rowIndex, options.columnIndex)) {
      this._focusEditingCell();
      this._updateEditRow(options.row, true);
      return true;
    }
  };
  _proto._needUpdateRow = function _needUpdateRow(column) {
    var visibleColumns = this._columnsController.getVisibleColumns();
    if (!column) {
      column = this._getEditColumn();
    }
    var isCustomSetCellValue = column && column.setCellValue !== column.defaultSetCellValue;
    var isCustomCalculateCellValue = visibleColumns.some(function (visibleColumn) {
      return visibleColumn.calculateCellValue !== visibleColumn.defaultCalculateCellValue;
    });
    return isCustomSetCellValue || isCustomCalculateCellValue;
  };
  _proto._applyChange = function _applyChange(options, params, forceUpdateRow) {
    var changeOptions = _extends(_extends({}, options), {
      forceUpdateRow
    });
    this._addChange(params, changeOptions);
    this._updateEditButtons();
    return this._applyChangeCore(options, changeOptions.forceUpdateRow);
  };
  _proto._applyChangeCore = function _applyChangeCore(options, forceUpdateRow) {
    var isCustomSetCellValue = options.column.setCellValue !== options.column.defaultSetCellValue;
    var row = options.row;
    if (row) {
      if (forceUpdateRow || isCustomSetCellValue) {
        this._updateEditRow(row, forceUpdateRow, isCustomSetCellValue);
      } else if (row.update) {
        row.update();
      }
    }
  };
  _proto._updateEditRowCore = function _updateEditRowCore(row, skipCurrentRow, isCustomSetCellValue) {
    this._dataController.updateItems({
      changeType: 'update',
      rowIndices: this._getRowIndicesForCascadeUpdating(row, skipCurrentRow)
    });
  };
  _proto._updateEditRow = function _updateEditRow(row, forceUpdateRow, isCustomSetCellValue) {
    if (forceUpdateRow) {
      this._updateRowImmediately(row, forceUpdateRow, isCustomSetCellValue);
    } else {
      this._updateRowWithDelay(row, isCustomSetCellValue);
    }
  };
  _proto._updateRowImmediately = function _updateRowImmediately(row, forceUpdateRow, isCustomSetCellValue) {
    this._updateEditRowCore(row, !forceUpdateRow, isCustomSetCellValue);
    // @ts-expect-error
    this._validateEditFormAfterUpdate(row, isCustomSetCellValue);
    if (!forceUpdateRow) {
      this._focusEditingCell();
    }
  };
  _proto._updateRowWithDelay = function _updateRowWithDelay(row, isCustomSetCellValue) {
    var _this29 = this;
    // @ts-expect-error
    var deferred = new _deferred.Deferred();
    this.addDeferred(deferred);
    setTimeout(function () {
      var _a;
      // NOTE: if the editForm is enabled then we need to search for focused element in the document root
      // otherwise we need to search for element in the shadow dom
      // @ts-expect-error
      var elementContainer = ((_a = _this29._editForm) === null || _a === void 0 ? void 0 : _a.element()) || _this29.component.$element().get(0);
      var $focusedElement = (0, _renderer.default)(_dom_adapter.default.getActiveElement(elementContainer));
      var columnIndex = _this29._rowsView.getCellIndex($focusedElement, row.rowIndex);
      var focusedElement = $focusedElement.get(0);
      var selectionRange = _m_utils.default.getSelectionRange(focusedElement);
      _this29._updateEditRowCore(row, false, isCustomSetCellValue);
      // @ts-expect-error
      _this29._validateEditFormAfterUpdate(row, isCustomSetCellValue);
      if (columnIndex >= 0) {
        var $focusedItem = _this29._rowsView._getCellElement(row.rowIndex, columnIndex);
        _this29._delayedInputFocus($focusedItem, function () {
          setTimeout(function () {
            var _a;
            // @ts-expect-error
            focusedElement = _dom_adapter.default.getActiveElement((_a = _this29.component.$element()) === null || _a === void 0 ? void 0 : _a.get(0));
            if (selectionRange.selectionStart >= 0) {
              _m_utils.default.setSelectionRange(focusedElement, selectionRange);
            }
          });
        });
      }
      deferred.resolve();
    });
  };
  _proto._validateEditFormAfterUpdate = function _validateEditFormAfterUpdate() {};
  _proto._addChange = function _addChange(changeParams, options) {
    var _a;
    var row = options === null || options === void 0 ? void 0 : options.row;
    var changes = _toConsumableArray(this.getChanges());
    var index = _m_utils.default.getIndexByKey(changeParams.key, changes);
    if (index < 0) {
      index = changes.length;
      this._addInternalData({
        key: changeParams.key,
        oldData: changeParams.oldData
      });
      delete changeParams.oldData;
      changes.push(changeParams);
    }
    var change = _extends({}, changes[index]);
    if (change) {
      if (changeParams.data) {
        change.data = (0, _array_utils.createObjectWithChanges)(change.data, changeParams.data);
      }
      if ((!change.type || !changeParams.data) && changeParams.type) {
        change.type = changeParams.type;
      }
      if (row) {
        row.oldData = this._getOldData(row.key);
        row.data = (0, _array_utils.createObjectWithChanges)(row.data, changeParams.data);
      }
    }
    changes[index] = change;
    this._silentOption(_const.EDITING_CHANGES_OPTION_NAME, changes);
    // T1043517
    if (options && change !== ((_a = this.getChanges()) === null || _a === void 0 ? void 0 : _a[index])) {
      options.forceUpdateRow = true;
    }
    return change;
  };
  _proto._getFormEditItemTemplate = function _getFormEditItemTemplate(cellOptions, column) {
    return column.editCellTemplate || this._getDefaultEditorTemplate();
  };
  _proto.getColumnTemplate = function getColumnTemplate(options) {
    var _this30 = this;
    var _a;
    var column = options.column;
    var rowIndex = options.row && options.row.rowIndex;
    var template;
    var isRowMode = this.isRowBasedEditMode();
    var isRowEditing = this.isEditRow(rowIndex);
    var isCellEditing = this.isEditCell(rowIndex, options.columnIndex);
    var editingStartOptions;
    if ((column.showEditorAlways || column.setCellValue && (isRowEditing && column.allowEditing || isCellEditing)) && (options.rowType === 'data' || options.rowType === 'detailAdaptive') && !column.command) {
      var allowUpdating = this.allowUpdating(options);
      if (((allowUpdating || isRowEditing) && column.allowEditing || isCellEditing) && (isRowEditing || !isRowMode)) {
        if (column.showEditorAlways && !isRowMode) {
          editingStartOptions = {
            cancel: false,
            key: options.row.isNewRow ? undefined : options.row.key,
            data: options.row.data,
            column
          };
          this._isEditingStart(editingStartOptions);
        }
        if (!editingStartOptions || !editingStartOptions.cancel) {
          options.setValue = function (value, text) {
            _this30.updateFieldValue(options, value, text);
          };
        }
      }
      template = column.editCellTemplate || this._getDefaultEditorTemplate();
    } else if (column.command === 'detail' && options.rowType === 'detail' && isRowEditing) {
      template = (_a = this) === null || _a === void 0 ? void 0 : _a.getEditFormTemplate(options);
    }
    return template;
  };
  _proto._createButton = function _createButton($container, button, options, change) {
    var icon = _const.EDIT_ICON_CLASS[button.name];
    var useIcons = this.option('editing.useIcons');
    var useLegacyColumnButtonTemplate = this.option('useLegacyColumnButtonTemplate');
    var $button = (0, _renderer.default)('<a>').attr('href', '#').addClass(_const.LINK_CLASS).addClass(button.cssClass);
    if (button.template && useLegacyColumnButtonTemplate) {
      this._rowsView.renderTemplate($container, button.template, options, true);
    } else {
      if (button.template) {
        $button = (0, _renderer.default)('<span>').addClass(button.cssClass);
      } else if (useIcons && icon || button.icon) {
        icon = button.icon || icon;
        var iconType = iconUtils.getImageSourceType(icon);
        if (iconType === 'image' || iconType === 'svg') {
          // @ts-expect-error
          $button = iconUtils.getImageContainer(icon).addClass(button.cssClass);
        } else {
          $button.addClass("dx-icon".concat(iconType === 'dxIcon' ? '-' : ' ').concat(icon)).attr('title', button.text);
        }
        $button.addClass(_const.LINK_ICON_CLASS);
        $container.addClass(_const.COMMAND_EDIT_WITH_ICONS_CLASS);
        var localizationName = this.getButtonLocalizationNames()[button.name];
        localizationName && $button.attr('aria-label', _message.default.format(localizationName));
      } else {
        $button.text(button.text);
      }
      if ((0, _type.isDefined)(button.hint)) {
        $button.attr('title', button.hint);
      }
      if (this._isButtonDisabled(button, options)) {
        $button.addClass('dx-state-disabled');
      } else if (!button.template || button.onClick) {
        _events_engine.default.on($button, (0, _index.addNamespace)('click', _const.EDITING_NAMESPACE), this.createAction(function (e) {
          var _a;
          (_a = button.onClick) === null || _a === void 0 ? void 0 : _a.call(button, (0, _extend.extend)({}, e, {
            row: options.row,
            column: options.column
          }));
          e.event.preventDefault();
          e.event.stopPropagation();
        }));
      }
      $container.append($button, '&nbsp;');
      if (button.template) {
        options.renderAsync = false;
        this._rowsView.renderTemplate($button, button.template, options, true, change);
      }
    }
  };
  _proto.getButtonLocalizationNames = function getButtonLocalizationNames() {
    return {
      edit: 'dxDataGrid-editingEditRow',
      save: 'dxDataGrid-editingSaveRowChanges',
      delete: 'dxDataGrid-editingDeleteRow',
      undelete: 'dxDataGrid-editingUndeleteRow',
      cancel: 'dxDataGrid-editingCancelRowChanges'
    };
  };
  _proto.prepareButtonItem = function prepareButtonItem(headerPanel, name, methodName, sortIndex) {
    var _this31 = this;
    var _a;
    var editingTexts = (_a = this.option('editing.texts')) !== null && _a !== void 0 ? _a : {};
    var titleButtonTextByClassNames = {
      revert: editingTexts.cancelAllChanges,
      save: editingTexts.saveAllChanges,
      addRow: editingTexts.addRow
    };
    var classNameButtonByNames = {
      revert: 'cancel',
      save: 'save',
      addRow: 'addrow'
    };
    var className = classNameButtonByNames[name];
    var onInitialized = function onInitialized(e) {
      (0, _renderer.default)(e.element).addClass(headerPanel._getToolbarButtonClass("".concat(_const.EDIT_BUTTON_CLASS, " ").concat(_this31.addWidgetPrefix(className), "-button")));
    };
    var hintText = titleButtonTextByClassNames[name];
    var isButtonDisabled = (className === 'save' || className === 'cancel') && this._isEditButtonDisabled();
    return {
      widget: 'dxButton',
      options: {
        onInitialized,
        icon: "edit-button-".concat(className),
        disabled: isButtonDisabled,
        onClick: function onClick() {
          setTimeout(function () {
            _this31[methodName]();
          });
        },
        text: hintText,
        hint: hintText
      },
      showText: 'inMenu',
      name: "".concat(name, "Button"),
      location: 'after',
      locateInMenu: 'auto',
      sortIndex
    };
  };
  _proto.prepareEditButtons = function prepareEditButtons(headerPanel) {
    var _a;
    var editingOptions = (_a = this.option('editing')) !== null && _a !== void 0 ? _a : {};
    var buttonItems = [];
    if (editingOptions.allowAdding) {
      buttonItems.push(this.prepareButtonItem(headerPanel, 'addRow', 'addRow', 20));
    }
    return buttonItems;
  };
  _proto.highlightDataCell = function highlightDataCell($cell, params) {
    this.shouldHighlightCell(params) && $cell.addClass(_const.CELL_MODIFIED);
  };
  _proto._afterInsertRow = function _afterInsertRow() {}
  // @ts-expect-error
  ;
  _proto._beforeSaveEditData = function _beforeSaveEditData(change) {
    if (change && !(0, _type.isDefined)(change.key) && (0, _type.isDefined)(change.type)) {
      return true;
    }
  };
  _proto._afterSaveEditData = function _afterSaveEditData() {};
  _proto._beforeCancelEditData = function _beforeCancelEditData() {};
  _proto._allowEditAction = function _allowEditAction(actionName, options) {
    var allowEditAction = this.option("editing.".concat(actionName));
    if ((0, _type.isFunction)(allowEditAction)) {
      allowEditAction = allowEditAction({
        component: this.component,
        row: options.row
      });
    }
    return allowEditAction;
  };
  _proto.allowUpdating = function allowUpdating(options, eventName) {
    var _a;
    var startEditAction = (_a = this.option('editing.startEditAction')) !== null && _a !== void 0 ? _a : _const.DEFAULT_START_EDIT_ACTION;
    var needCallback = arguments.length > 1 ? startEditAction === eventName || eventName === 'down' : true;
    return needCallback && this._allowEditAction('allowUpdating', options);
  };
  _proto.allowDeleting = function allowDeleting(options) {
    return this._allowEditAction('allowDeleting', options);
  };
  _proto.isCellModified = function isCellModified(parameters) {
    var columnIndex = parameters.columnIndex;
    var modifiedValues = parameters.row && (parameters.row.isNewRow ? parameters.row.values : parameters.row.modifiedValues);
    return !!modifiedValues && modifiedValues[columnIndex] !== undefined;
  };
  _proto.isNewRowInEditMode = function isNewRowInEditMode() {
    var visibleEditRowIndex = this._getVisibleEditRowIndex();
    var rows = this._dataController.items();
    return visibleEditRowIndex >= 0 ? rows[visibleEditRowIndex].isNewRow : false;
  };
  _proto._isRowDeleteAllowed = function _isRowDeleteAllowed() {};
  _proto.shouldHighlightCell = function shouldHighlightCell(parameters) {
    var cellModified = this.isCellModified(parameters);
    return cellModified && parameters.column.setCellValue && (this.getEditMode() !== _const.EDIT_MODE_ROW || !parameters.row.isEditing);
  };
  return EditingControllerImpl;
}(_m_modules.default.ViewController);
var editingModule = {
  defaultOptions() {
    return {
      editing: {
        mode: 'row',
        refreshMode: 'full',
        newRowPosition: _const.VIEWPORT_TOP_NEW_ROW_POSITION,
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
        useIcons: false,
        selectTextOnEditStart: false,
        confirmDelete: true,
        texts: {
          editRow: _message.default.format('dxDataGrid-editingEditRow'),
          saveAllChanges: _message.default.format('dxDataGrid-editingSaveAllChanges'),
          saveRowChanges: _message.default.format('dxDataGrid-editingSaveRowChanges'),
          cancelAllChanges: _message.default.format('dxDataGrid-editingCancelAllChanges'),
          cancelRowChanges: _message.default.format('dxDataGrid-editingCancelRowChanges'),
          addRow: _message.default.format('dxDataGrid-editingAddRow'),
          deleteRow: _message.default.format('dxDataGrid-editingDeleteRow'),
          undeleteRow: _message.default.format('dxDataGrid-editingUndeleteRow'),
          confirmDeleteMessage: _message.default.format('dxDataGrid-editingConfirmDeleteMessage'),
          confirmDeleteTitle: ''
        },
        form: {
          colCount: 2
        },
        popup: {},
        startEditAction: 'click',
        editRowKey: null,
        editColumnName: null,
        changes: []
      },
      useLegacyColumnButtonTemplate: false
    };
  },
  controllers: {
    editing: EditingControllerImpl
  },
  extenders: {
    controllers: {
      data: {
        init() {
          this._editingController = this.getController('editing');
          this.callBase();
        },
        reload(full, repaintChangesOnly) {
          !repaintChangesOnly && this._editingController.refresh();
          return this.callBase.apply(this, arguments);
        },
        repaintRows() {
          if (this.getController('editing').isSaving()) return;
          return this.callBase.apply(this, arguments);
        },
        _updateEditRow(items) {
          var _a;
          var editRowKey = this.option(_const.EDITING_EDITROWKEY_OPTION_NAME);
          var editRowIndex = _m_utils.default.getIndexByKey(editRowKey, items);
          var editItem = items[editRowIndex];
          if (editItem) {
            editItem.isEditing = true;
            (_a = this._updateEditItem) === null || _a === void 0 ? void 0 : _a.call(this, editItem);
          }
        },
        _updateItemsCore(change) {
          this.callBase(change);
          this._updateEditRow(this.items(true));
        },
        _applyChangeUpdate(change) {
          this._updateEditRow(change.items);
          this.callBase(change);
        },
        _applyChangesOnly(change) {
          this._updateEditRow(change.items);
          this.callBase(change);
        },
        _processItems(items, change) {
          items = this._editingController.processItems(items, change);
          return this.callBase(items, change);
        },
        _processDataItem(dataItem, options) {
          this._editingController.processDataItem(dataItem, options, this.generateDataValues);
          return this.callBase(dataItem, options);
        },
        _processItem(item, options) {
          item = this.callBase(item, options);
          if (item.isNewRow) {
            options.dataIndex--;
            delete item.dataIndex;
          }
          return item;
        },
        _getChangedColumnIndices(oldItem, newItem, rowIndex, isLiveUpdate) {
          if (oldItem.isNewRow !== newItem.isNewRow || oldItem.removed !== newItem.removed) {
            return;
          }
          return this.callBase.apply(this, arguments);
        },
        _isCellChanged(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
          var editingController = this.getController('editing');
          var cell = oldRow.cells && oldRow.cells[columnIndex];
          var isEditing = editingController && editingController.isEditCell(visibleRowIndex, columnIndex);
          if (isLiveUpdate && isEditing) {
            return false;
          }
          if (cell && cell.column && !cell.column.showEditorAlways && cell.isEditing !== isEditing) {
            return true;
          }
          return this.callBase.apply(this, arguments);
        },
        needToRefreshOnDataSourceChange(args) {
          var editingController = this.getController('editing');
          var isParasiteChange = Array.isArray(args.value) && args.value === args.previousValue && editingController.isSaving();
          return !isParasiteChange;
        },
        _handleDataSourceChange(args) {
          var _this32 = this;
          var result = this.callBase(args);
          var changes = this.option('editing.changes');
          var dataSource = args.value;
          if (Array.isArray(dataSource) && changes.length) {
            var dataSourceKeys = dataSource.map(function (item) {
              return _this32.keyOf(item);
            });
            var newChanges = changes.filter(function (change) {
              return change.type === 'insert' || dataSourceKeys.some(function (key) {
                return (0, _common.equalByValue)(change.key, key);
              });
            });
            if (newChanges.length !== changes.length) {
              this.option('editing.changes', newChanges);
            }
            var editRowKey = this.option('editing.editRowKey');
            var isEditNewItem = newChanges.some(function (change) {
              return change.type === 'insert' && (0, _common.equalByValue)(editRowKey, change.key);
            });
            if (!isEditNewItem && dataSourceKeys.every(function (key) {
              return !(0, _common.equalByValue)(editRowKey, key);
            })) {
              this.option('editing.editRowKey', null);
            }
          }
          return result;
        }
      }
    },
    views: {
      rowsView: {
        init() {
          this.callBase();
          this._editingController = this.getController('editing');
        },
        getCellIndex($cell, rowIndex) {
          if (!$cell.is('td') && rowIndex >= 0) {
            var $cellElements = this.getCellElements(rowIndex);
            var cellIndex = -1;
            (0, _iterator.each)($cellElements, function (index, cellElement) {
              if ((0, _renderer.default)(cellElement).find($cell).length) {
                // @ts-expect-error
                cellIndex = index;
              }
            });
            return cellIndex;
          }
          return this.callBase.apply(this, arguments);
        },
        publicMethods() {
          return this.callBase().concat(['cellValue']);
        },
        _getCellTemplate(options) {
          var template = this._editingController.getColumnTemplate(options);
          return template || this.callBase(options);
        },
        _createRow(row) {
          var $row = this.callBase.apply(this, arguments);
          if (row) {
            var isRowRemoved = !!row.removed;
            var isRowInserted = !!row.isNewRow;
            var isRowModified = !!row.modified;
            isRowInserted && $row.addClass(_const.ROW_INSERTED);
            isRowModified && $row.addClass(_const.ROW_MODIFIED);
            if (isRowInserted || isRowRemoved) {
              $row.removeClass(_const.ROW_SELECTED);
            }
          }
          return $row;
        },
        _getColumnIndexByElement($element) {
          var $tableElement = $element.closest('table');
          var $tableElements = this.getTableElements();
          while ($tableElement.length && !$tableElements.filter($tableElement).length) {
            $element = $tableElement.closest('td');
            $tableElement = $element.closest('table');
          }
          return this._getColumnIndexByElementCore($element);
        },
        _getColumnIndexByElementCore($element) {
          var $targetElement = $element.closest(".".concat(_const.ROW_CLASS, "> td:not(.dx-master-detail-cell)"));
          return this.getCellIndex($targetElement);
        },
        _editCellByClick(e, eventName) {
          var editingController = this._editingController;
          var $targetElement = (0, _renderer.default)(e.event.target);
          var columnIndex = this._getColumnIndexByElement($targetElement);
          var row = this._dataController.items()[e.rowIndex];
          var allowUpdating = editingController.allowUpdating({
            row
          }, eventName) || row && row.isNewRow;
          var column = this._columnsController.getVisibleColumns()[columnIndex];
          var isEditedCell = editingController.isEditCell(e.rowIndex, columnIndex);
          var allowEditing = allowUpdating && column && (column.allowEditing || isEditedCell);
          var startEditAction = this.option('editing.startEditAction') || 'click';
          var isShowEditorAlways = column && column.showEditorAlways;
          if (isEditedCell) {
            return true;
          }
          if (eventName === 'down') {
            if (_devices.default.real().ios || _devices.default.real().android) {
              (0, _dom.resetActiveElement)();
            }
            return isShowEditorAlways && allowEditing && editingController.editCell(e.rowIndex, columnIndex);
          }
          if (eventName === 'click' && startEditAction === 'dblClick') {
            var isError = false;
            var withoutSaveEditData = row === null || row === void 0 ? void 0 : row.isNewRow;
            editingController.closeEditCell(isError, withoutSaveEditData);
          }
          if (allowEditing && eventName === startEditAction) {
            return editingController.editCell(e.rowIndex, columnIndex) || editingController.isEditRow(e.rowIndex);
          }
        },
        _rowPointerDown(e) {
          var _this33 = this;
          this._pointerDownTimeout = setTimeout(function () {
            _this33._editCellByClick(e, 'down');
          });
        },
        _rowClick(e) {
          var isEditForm = (0, _renderer.default)(e.rowElement).hasClass(this.addWidgetPrefix(_const.EDIT_FORM_CLASS));
          e.event[_const.TARGET_COMPONENT_NAME] = this.component;
          if (!this._editCellByClick(e, 'click') && !isEditForm) {
            this.callBase.apply(this, arguments);
          }
        },
        _rowDblClick(e) {
          if (!this._editCellByClick(e, 'dblClick')) {
            this.callBase.apply(this, arguments);
          }
        },
        _cellPrepared($cell, parameters) {
          var _a;
          var editingController = this._editingController;
          var isCommandCell = !!parameters.column.command;
          var isEditableCell = parameters.setValue;
          var isEditRow = editingController.isEditRow(parameters.rowIndex);
          var isEditing = (0, _m_editing_utils.isEditingCell)(isEditRow, parameters);
          if ((0, _m_editing_utils.isEditingOrShowEditorAlwaysDataCell)(isEditRow, parameters)) {
            var alignment = parameters.column.alignment;
            $cell.toggleClass(this.addWidgetPrefix(_const.READONLY_CLASS), !isEditableCell).toggleClass(_const.CELL_FOCUS_DISABLED_CLASS, !isEditableCell);
            if (alignment) {
              $cell.find(_const.EDITORS_INPUT_SELECTOR).first().css('textAlign', alignment);
            }
          }
          if (isEditing) {
            this._editCellPrepared($cell);
          }
          var hasTemplate = !!((_a = parameters.column) === null || _a === void 0 ? void 0 : _a.cellTemplate);
          if (parameters.column && !isCommandCell && (!hasTemplate || editingController.shouldHighlightCell(parameters))) {
            editingController.highlightDataCell($cell, parameters);
          }
          this.callBase.apply(this, arguments);
        },
        _editCellPrepared: _common.noop,
        _formItemPrepared: _common.noop,
        _getCellOptions(options) {
          var cellOptions = this.callBase(options);
          var columnIndex = options.columnIndex,
            row = options.row;
          cellOptions.isEditing = this._editingController.isEditCell(cellOptions.rowIndex, cellOptions.columnIndex);
          cellOptions.removed = row.removed;
          if (row.modified) {
            cellOptions.modified = row.modifiedValues[columnIndex] !== undefined;
          }
          return cellOptions;
        },
        _setCellAriaAttributes($cell, cellOptions) {
          this.callBase($cell, cellOptions);
          if (cellOptions.removed) {
            this.setAria('roledescription', _message.default.format('dxDataGrid-ariaDeletedCell'), $cell);
          }
          if (cellOptions.modified) {
            this.setAria('roledescription', _message.default.format('dxDataGrid-ariaModifiedCell'), $cell);
          }
          var isEditableCell = cellOptions.column.allowEditing && !cellOptions.removed && !cellOptions.modified && cellOptions.rowType === 'data' && cellOptions.column.calculateCellValue === cellOptions.column.defaultCalculateCellValue && this._editingController.isCellBasedEditMode();
          if (isEditableCell) {
            this.setAria('roledescription', _message.default.format('dxDataGrid-ariaEditableCell'), $cell);
          }
        },
        _createCell(options) {
          var $cell = this.callBase(options);
          var isEditRow = this._editingController.isEditRow(options.rowIndex);
          (0, _m_editing_utils.isEditingOrShowEditorAlwaysDataCell)(isEditRow, options) && $cell.addClass(_const.EDITOR_CELL_CLASS);
          return $cell;
        },
        cellValue(rowIndex, columnIdentifier, value, text) {
          var cellOptions = this.getCellOptions(rowIndex, columnIdentifier);
          if (cellOptions) {
            if (value === undefined) {
              return cellOptions.value;
            }
            this._editingController.updateFieldValue(cellOptions, value, text, true);
          }
        },
        dispose() {
          this.callBase.apply(this, arguments);
          clearTimeout(this._pointerDownTimeout);
        },
        _renderCore() {
          var _this34 = this;
          this.callBase.apply(this, arguments);
          return this.waitAsyncTemplates(true).done(function () {
            _this34._editingController._focusEditorIfNeed();
          });
        }
      },
      headerPanel: {
        _getToolbarItems() {
          var items = this.callBase();
          var editButtonItems = this.getController('editing').prepareEditButtons(this);
          return editButtonItems.concat(items);
        },
        optionChanged(args) {
          var fullName = args.fullName;
          switch (args.name) {
            case 'editing':
              {
                var excludedOptions = [_const.EDITING_POPUP_OPTION_NAME, _const.EDITING_CHANGES_OPTION_NAME, _const.EDITING_EDITCOLUMNNAME_OPTION_NAME, _const.EDITING_EDITROWKEY_OPTION_NAME];
                var shouldInvalidate = fullName && !excludedOptions.some(function (optionName) {
                  return optionName === fullName;
                });
                shouldInvalidate && this._invalidate();
                this.callBase(args);
                break;
              }
            case 'useLegacyColumnButtonTemplate':
              args.handled = true;
              break;
            default:
              this.callBase(args);
          }
        },
        isVisible() {
          var editingOptions = this.getController('editing').option('editing');
          return this.callBase() || (editingOptions === null || editingOptions === void 0 ? void 0 : editingOptions.allowAdding);
        }
      }
    }
  }
};
exports.editingModule = editingModule;
