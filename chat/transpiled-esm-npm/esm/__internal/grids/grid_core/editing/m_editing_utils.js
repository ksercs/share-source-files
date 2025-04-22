import Guid from '../../../../core/guid';
import { isObject } from '../../../../core/utils/type';
const NEW_ROW_TEMP_KEY_PREFIX = '_DX_KEY_';
const GUID_LENGTH = 36;
export const createFailureHandler = function (deferred) {
  return function (arg) {
    const error = arg instanceof Error ? arg : new Error(arg && String(arg) || 'Unknown error');
    deferred.reject(error);
  };
};
export const isEditingCell = function (isEditRow, cellOptions) {
  return cellOptions.isEditing || isEditRow && cellOptions.column.allowEditing;
};
export const isEditingOrShowEditorAlwaysDataCell = function (isEditRow, cellOptions) {
  const isCommandCell = !!cellOptions.column.command;
  const isEditing = isEditingCell(isEditRow, cellOptions);
  const isEditorCell = !isCommandCell && (isEditing || cellOptions.column.showEditorAlways);
  return cellOptions.rowType === 'data' && isEditorCell;
};
export const getEditingTexts = options => {
  const editingTexts = options.component.option('editing.texts') || {};
  return {
    save: editingTexts.saveRowChanges,
    cancel: editingTexts.cancelRowChanges,
    edit: editingTexts.editRow,
    undelete: editingTexts.undeleteRow,
    delete: editingTexts.deleteRow,
    add: editingTexts.addRowToNode
  };
};
export const generateNewRowTempKey = () => `${NEW_ROW_TEMP_KEY_PREFIX}${new Guid()}`;
export const isNewRowTempKey = key => typeof key === 'string' && key.startsWith(NEW_ROW_TEMP_KEY_PREFIX) && key.length === NEW_ROW_TEMP_KEY_PREFIX.length + GUID_LENGTH;
export const getButtonIndex = (buttons, name) => {
  let result = -1;
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
export const getEditorType = item => {
  var _column$formItem;
  const {
    column
  } = item;
  return item.isCustomEditorType ? item.editorType : (_column$formItem = column.formItem) === null || _column$formItem === void 0 ? void 0 : _column$formItem.editorType;
};
export const forEachFormItems = (items, callBack) => {
  items.forEach(item => {
    if (item.items || item.tabs) {
      forEachFormItems(item.items || item.tabs, callBack);
    } else {
      callBack(item);
    }
  });
};