/**
* DevExtreme (cjs/__internal/grids/grid_core/editing/m_editing_utils.js)
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
exports.getButtonIndex = exports.generateNewRowTempKey = exports.forEachFormItems = exports.createFailureHandler = void 0;
exports.getButtonName = getButtonName;
exports.getEditorType = exports.getEditingTexts = void 0;
exports.isEditable = isEditable;
exports.isNewRowTempKey = exports.isEditingOrShowEditorAlwaysDataCell = exports.isEditingCell = void 0;
var _guid = _interopRequireDefault(require("../../../../core/guid"));
var _type = require("../../../../core/utils/type");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var NEW_ROW_TEMP_KEY_PREFIX = '_DX_KEY_';
var GUID_LENGTH = 36;
var createFailureHandler = function createFailureHandler(deferred) {
  return function (arg) {
    var error = arg instanceof Error ? arg : new Error(arg && String(arg) || 'Unknown error');
    deferred.reject(error);
  };
};
exports.createFailureHandler = createFailureHandler;
var isEditingCell = function isEditingCell(isEditRow, cellOptions) {
  return cellOptions.isEditing || isEditRow && cellOptions.column.allowEditing;
};
exports.isEditingCell = isEditingCell;
var isEditingOrShowEditorAlwaysDataCell = function isEditingOrShowEditorAlwaysDataCell(isEditRow, cellOptions) {
  var isCommandCell = !!cellOptions.column.command;
  var isEditing = isEditingCell(isEditRow, cellOptions);
  var isEditorCell = !isCommandCell && (isEditing || cellOptions.column.showEditorAlways);
  return cellOptions.rowType === 'data' && isEditorCell;
};
exports.isEditingOrShowEditorAlwaysDataCell = isEditingOrShowEditorAlwaysDataCell;
var getEditingTexts = function getEditingTexts(options) {
  var editingTexts = options.component.option('editing.texts') || {};
  return {
    save: editingTexts.saveRowChanges,
    cancel: editingTexts.cancelRowChanges,
    edit: editingTexts.editRow,
    undelete: editingTexts.undeleteRow,
    delete: editingTexts.deleteRow,
    add: editingTexts.addRowToNode
  };
};
exports.getEditingTexts = getEditingTexts;
var generateNewRowTempKey = function generateNewRowTempKey() {
  return "".concat(NEW_ROW_TEMP_KEY_PREFIX).concat(new _guid.default());
};
exports.generateNewRowTempKey = generateNewRowTempKey;
var isNewRowTempKey = function isNewRowTempKey(key) {
  return typeof key === 'string' && key.startsWith(NEW_ROW_TEMP_KEY_PREFIX) && key.length === NEW_ROW_TEMP_KEY_PREFIX.length + GUID_LENGTH;
};
exports.isNewRowTempKey = isNewRowTempKey;
var getButtonIndex = function getButtonIndex(buttons, name) {
  var result = -1;
  // @ts-expect-error
  // eslint-disable-next-line consistent-return, array-callback-return
  buttons.some(function (button, index) {
    if (getButtonName(button) === name) {
      result = index;
      return true;
    }
  });
  return result;
};
exports.getButtonIndex = getButtonIndex;
function getButtonName(button) {
  // @ts-expect-error
  return (0, _type.isObject)(button) ? button.name : button;
}
function isEditable($element) {
  return $element && ($element.is('input') || $element.is('textarea'));
}
var getEditorType = function getEditorType(item) {
  var _a;
  var column = item.column;
  return item.isCustomEditorType ? item.editorType : (_a = column.formItem) === null || _a === void 0 ? void 0 : _a.editorType;
};
exports.getEditorType = getEditorType;
var forEachFormItems = function forEachFormItems(items, callBack) {
  items.forEach(function (item) {
    if (item.items || item.tabs) {
      forEachFormItems(item.items || item.tabs, callBack);
    } else {
      callBack(item);
    }
  });
};
exports.forEachFormItems = forEachFormItems;
