import Guid from '../../../../core/guid';
import { isObject } from '../../../../core/utils/type';
var NEW_ROW_TEMP_KEY_PREFIX = '_DX_KEY_';
var GUID_LENGTH = 36;
export var createFailureHandler = function createFailureHandler(deferred) {
  return function (arg) {
    var error = arg instanceof Error ? arg : new Error(arg && String(arg) || 'Unknown error');
    deferred.reject(error);
  };
};
export var isEditingCell = function isEditingCell(isEditRow, cellOptions) {
  return cellOptions.isEditing || isEditRow && cellOptions.column.allowEditing;
};
export var isEditingOrShowEditorAlwaysDataCell = function isEditingOrShowEditorAlwaysDataCell(isEditRow, cellOptions) {
  var isCommandCell = !!cellOptions.column.command;
  var isEditing = isEditingCell(isEditRow, cellOptions);
  var isEditorCell = !isCommandCell && (isEditing || cellOptions.column.showEditorAlways);
  return cellOptions.rowType === 'data' && isEditorCell;
};
export var getEditingTexts = options => {
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
export var generateNewRowTempKey = () => "".concat(NEW_ROW_TEMP_KEY_PREFIX).concat(new Guid());
export var isNewRowTempKey = key => typeof key === 'string' && key.startsWith(NEW_ROW_TEMP_KEY_PREFIX) && key.length === NEW_ROW_TEMP_KEY_PREFIX.length + GUID_LENGTH;
export var getButtonIndex = (buttons, name) => {
  var result = -1;
  // @ts-expect-error
  // eslint-disable-next-line consistent-return, array-callback-return
  buttons.some((button, index) => {
    if (getButtonName(button) === name) {
      result = index;
      return true;
    }
  });
  return result;
};
export function getButtonName(button) {
  // @ts-expect-error
  return isObject(button) ? button.name : button;
}
export function isEditable($element) {
  return $element && ($element.is('input') || $element.is('textarea'));
}
export var getEditorType = item => {
  var _a;
  var {
    column
  } = item;
  return item.isCustomEditorType ? item.editorType : (_a = column.formItem) === null || _a === void 0 ? void 0 : _a.editorType;
};
export var forEachFormItems = (items, callBack) => {
  items.forEach(item => {
    if (item.items || item.tabs) {
      forEachFormItems(item.items || item.tabs, callBack);
    } else {
      callBack(item);
    }
  });
};