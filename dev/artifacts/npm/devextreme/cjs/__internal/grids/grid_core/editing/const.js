/**
* DevExtreme (cjs/__internal/grids/grid_core/editing/const.js)
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
exports.VIEWPORT_TOP_NEW_ROW_POSITION = exports.VIEWPORT_BOTTOM_NEW_ROW_POSITION = exports.TARGET_COMPONENT_NAME = exports.ROW_SELECTED_CLASS = exports.ROW_SELECTED = exports.ROW_REMOVED = exports.ROW_MODIFIED = exports.ROW_INSERTED = exports.ROW_CLASS = exports.ROW_BASED_MODES = exports.REQUIRED_EDITOR_LABELLEDBY_MODES = exports.READONLY_CLASS = exports.PAGE_TOP_NEW_ROW_POSITION = exports.PAGE_BOTTOM_NEW_ROW_POSITION = exports.MODES_WITH_DELAYED_FOCUS = exports.METHOD_NAMES = exports.LINK_ICON_CLASS = exports.LINK_CLASS = exports.LAST_NEW_ROW_POSITION = exports.INSERT_INDEX = exports.FORM_BUTTONS_CONTAINER_CLASS = exports.FOCUS_OVERLAY_CLASS = exports.FOCUSABLE_ELEMENT_SELECTOR = exports.FOCUSABLE_ELEMENT_CLASS = exports.FIRST_NEW_ROW_POSITION = exports.EDIT_ROW = exports.EDIT_POPUP_FORM_CLASS = exports.EDIT_POPUP_CLASS = exports.EDIT_MODE_ROW = exports.EDIT_MODE_POPUP = exports.EDIT_MODE_FORM = exports.EDIT_MODE_CELL = exports.EDIT_MODE_BATCH = exports.EDIT_MODES = exports.EDIT_LINK_CLASS = exports.EDIT_ICON_CLASS = exports.EDIT_FORM_ITEM_CLASS = exports.EDIT_FORM_CLASS = exports.EDIT_BUTTON_CLASS = exports.EDITOR_CELL_CLASS = exports.EDITORS_INPUT_SELECTOR = exports.EDITING_POPUP_OPTION_NAME = exports.EDITING_NAMESPACE = exports.EDITING_FORM_OPTION_NAME = exports.EDITING_EDITROWKEY_OPTION_NAME = exports.EDITING_EDITCOLUMNNAME_OPTION_NAME = exports.EDITING_CHANGES_OPTION_NAME = exports.DROPDOWN_EDITOR_OVERLAY_CLASS = exports.DEFAULT_START_EDIT_ACTION = exports.DATA_ROW_CLASS = exports.DATA_EDIT_DATA_UPDATE_TYPE = exports.DATA_EDIT_DATA_REMOVE_TYPE = exports.DATA_EDIT_DATA_INSERT_TYPE = exports.COMMAND_EDIT_WITH_ICONS_CLASS = exports.COMMAND_EDIT_CLASS = exports.CELL_MODIFIED_CLASS = exports.CELL_MODIFIED = exports.CELL_FOCUS_DISABLED_CLASS = exports.CELL_BASED_MODES = exports.BUTTON_NAMES = exports.BUTTON_CLASS = exports.ADD_ROW_BUTTON_CLASS = exports.ACTION_OPTION_NAMES = void 0;
var _ui = _interopRequireDefault(require("../../../../ui/scroll_view/ui.scrollable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var EDITOR_CELL_CLASS = 'dx-editor-cell';
exports.EDITOR_CELL_CLASS = EDITOR_CELL_CLASS;
var ROW_CLASS = 'dx-row';
exports.ROW_CLASS = ROW_CLASS;
var CELL_MODIFIED_CLASS = 'dx-cell-modified';
exports.CELL_MODIFIED_CLASS = CELL_MODIFIED_CLASS;
var ROW_SELECTED_CLASS = 'dx-selection';
exports.ROW_SELECTED_CLASS = ROW_SELECTED_CLASS;
var EDIT_FORM_CLASS = 'edit-form';
exports.EDIT_FORM_CLASS = EDIT_FORM_CLASS;
var DATA_EDIT_DATA_INSERT_TYPE = 'insert';
exports.DATA_EDIT_DATA_INSERT_TYPE = DATA_EDIT_DATA_INSERT_TYPE;
var DATA_EDIT_DATA_REMOVE_TYPE = 'remove';
exports.DATA_EDIT_DATA_REMOVE_TYPE = DATA_EDIT_DATA_REMOVE_TYPE;
var EDITING_POPUP_OPTION_NAME = 'editing.popup';
exports.EDITING_POPUP_OPTION_NAME = EDITING_POPUP_OPTION_NAME;
var EDITING_FORM_OPTION_NAME = 'editing.form';
exports.EDITING_FORM_OPTION_NAME = EDITING_FORM_OPTION_NAME;
var EDITING_EDITROWKEY_OPTION_NAME = 'editing.editRowKey';
exports.EDITING_EDITROWKEY_OPTION_NAME = EDITING_EDITROWKEY_OPTION_NAME;
var EDITING_EDITCOLUMNNAME_OPTION_NAME = 'editing.editColumnName';
exports.EDITING_EDITCOLUMNNAME_OPTION_NAME = EDITING_EDITCOLUMNNAME_OPTION_NAME;
var TARGET_COMPONENT_NAME = 'targetComponent';
exports.TARGET_COMPONENT_NAME = TARGET_COMPONENT_NAME;
var EDITORS_INPUT_SELECTOR = 'input:not([type=\'hidden\'])';
exports.EDITORS_INPUT_SELECTOR = EDITORS_INPUT_SELECTOR;
var FOCUSABLE_ELEMENT_SELECTOR = "[tabindex]:not([disabled]), ".concat(EDITORS_INPUT_SELECTOR, ":not([disabled])");
exports.FOCUSABLE_ELEMENT_SELECTOR = FOCUSABLE_ELEMENT_SELECTOR;
var EDIT_MODE_BATCH = 'batch';
exports.EDIT_MODE_BATCH = EDIT_MODE_BATCH;
var EDIT_MODE_ROW = 'row';
exports.EDIT_MODE_ROW = EDIT_MODE_ROW;
var EDIT_MODE_CELL = 'cell';
exports.EDIT_MODE_CELL = EDIT_MODE_CELL;
var EDIT_MODE_FORM = 'form';
exports.EDIT_MODE_FORM = EDIT_MODE_FORM;
var EDIT_MODE_POPUP = 'popup';
exports.EDIT_MODE_POPUP = EDIT_MODE_POPUP;
var FIRST_NEW_ROW_POSITION = 'first';
exports.FIRST_NEW_ROW_POSITION = FIRST_NEW_ROW_POSITION;
var LAST_NEW_ROW_POSITION = 'last';
exports.LAST_NEW_ROW_POSITION = LAST_NEW_ROW_POSITION;
var PAGE_BOTTOM_NEW_ROW_POSITION = 'pageBottom';
exports.PAGE_BOTTOM_NEW_ROW_POSITION = PAGE_BOTTOM_NEW_ROW_POSITION;
var PAGE_TOP_NEW_ROW_POSITION = 'pageTop';
exports.PAGE_TOP_NEW_ROW_POSITION = PAGE_TOP_NEW_ROW_POSITION;
var VIEWPORT_BOTTOM_NEW_ROW_POSITION = 'viewportBottom';
exports.VIEWPORT_BOTTOM_NEW_ROW_POSITION = VIEWPORT_BOTTOM_NEW_ROW_POSITION;
var VIEWPORT_TOP_NEW_ROW_POSITION = 'viewportTop';
// eslint-disable-next-line max-len
exports.VIEWPORT_TOP_NEW_ROW_POSITION = VIEWPORT_TOP_NEW_ROW_POSITION;
var EDIT_MODES = [EDIT_MODE_BATCH, EDIT_MODE_ROW, EDIT_MODE_CELL, EDIT_MODE_FORM, EDIT_MODE_POPUP];
exports.EDIT_MODES = EDIT_MODES;
var ROW_BASED_MODES = [EDIT_MODE_ROW, EDIT_MODE_FORM, EDIT_MODE_POPUP];
exports.ROW_BASED_MODES = ROW_BASED_MODES;
var CELL_BASED_MODES = [EDIT_MODE_BATCH, EDIT_MODE_CELL];
exports.CELL_BASED_MODES = CELL_BASED_MODES;
var REQUIRED_EDITOR_LABELLEDBY_MODES = [EDIT_MODE_BATCH, EDIT_MODE_ROW, EDIT_MODE_CELL];
exports.REQUIRED_EDITOR_LABELLEDBY_MODES = REQUIRED_EDITOR_LABELLEDBY_MODES;
var MODES_WITH_DELAYED_FOCUS = [EDIT_MODE_ROW, EDIT_MODE_FORM];
exports.MODES_WITH_DELAYED_FOCUS = MODES_WITH_DELAYED_FOCUS;
var READONLY_CLASS = 'readonly';
exports.READONLY_CLASS = READONLY_CLASS;
var LINK_CLASS = 'dx-link';
exports.LINK_CLASS = LINK_CLASS;
var LINK_ICON_CLASS = 'dx-link-icon';
exports.LINK_ICON_CLASS = LINK_ICON_CLASS;
var ROW_SELECTED = 'dx-selection';
exports.ROW_SELECTED = ROW_SELECTED;
var EDIT_BUTTON_CLASS = 'dx-edit-button';
exports.EDIT_BUTTON_CLASS = EDIT_BUTTON_CLASS;
var COMMAND_EDIT_CLASS = 'dx-command-edit';
exports.COMMAND_EDIT_CLASS = COMMAND_EDIT_CLASS;
var COMMAND_EDIT_WITH_ICONS_CLASS = "".concat(COMMAND_EDIT_CLASS, "-with-icons");
exports.COMMAND_EDIT_WITH_ICONS_CLASS = COMMAND_EDIT_WITH_ICONS_CLASS;
var INSERT_INDEX = '__DX_INSERT_INDEX__';
exports.INSERT_INDEX = INSERT_INDEX;
var ROW_INSERTED = 'dx-row-inserted';
exports.ROW_INSERTED = ROW_INSERTED;
var ROW_MODIFIED = 'dx-row-modified';
exports.ROW_MODIFIED = ROW_MODIFIED;
var CELL_MODIFIED = 'dx-cell-modified';
exports.CELL_MODIFIED = CELL_MODIFIED;
var EDITING_NAMESPACE = 'dxDataGridEditing';
exports.EDITING_NAMESPACE = EDITING_NAMESPACE;
var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
exports.CELL_FOCUS_DISABLED_CLASS = CELL_FOCUS_DISABLED_CLASS;
var DATA_EDIT_DATA_UPDATE_TYPE = 'update';
exports.DATA_EDIT_DATA_UPDATE_TYPE = DATA_EDIT_DATA_UPDATE_TYPE;
var DEFAULT_START_EDIT_ACTION = 'click';
exports.DEFAULT_START_EDIT_ACTION = DEFAULT_START_EDIT_ACTION;
var EDIT_LINK_CLASS = {
  save: 'dx-link-save',
  cancel: 'dx-link-cancel',
  edit: 'dx-link-edit',
  undelete: 'dx-link-undelete',
  delete: 'dx-link-delete',
  add: 'dx-link-add'
};
exports.EDIT_LINK_CLASS = EDIT_LINK_CLASS;
var EDIT_ICON_CLASS = {
  save: 'save',
  cancel: 'revert',
  edit: 'edit',
  undelete: 'revert',
  delete: 'trash',
  add: 'add'
};
exports.EDIT_ICON_CLASS = EDIT_ICON_CLASS;
var METHOD_NAMES = {
  edit: 'editRow',
  delete: 'deleteRow',
  undelete: 'undeleteRow',
  save: 'saveEditData',
  cancel: 'cancelEditData',
  add: 'addRowByRowIndex'
};
exports.METHOD_NAMES = METHOD_NAMES;
var ACTION_OPTION_NAMES = {
  add: 'allowAdding',
  edit: 'allowUpdating',
  delete: 'allowDeleting'
};
exports.ACTION_OPTION_NAMES = ACTION_OPTION_NAMES;
var BUTTON_NAMES = ['edit', 'save', 'cancel', 'delete', 'undelete'];
exports.BUTTON_NAMES = BUTTON_NAMES;
var EDITING_CHANGES_OPTION_NAME = 'editing.changes';
exports.EDITING_CHANGES_OPTION_NAME = EDITING_CHANGES_OPTION_NAME;
var FOCUS_OVERLAY_CLASS = 'focus-overlay';
exports.FOCUS_OVERLAY_CLASS = FOCUS_OVERLAY_CLASS;
var ADD_ROW_BUTTON_CLASS = 'addrow-button';
exports.ADD_ROW_BUTTON_CLASS = ADD_ROW_BUTTON_CLASS;
var DROPDOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
exports.DROPDOWN_EDITOR_OVERLAY_CLASS = DROPDOWN_EDITOR_OVERLAY_CLASS;
var DATA_ROW_CLASS = 'dx-data-row';
exports.DATA_ROW_CLASS = DATA_ROW_CLASS;
var ROW_REMOVED = 'dx-row-removed';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.ROW_REMOVED = ROW_REMOVED;
var isRenovatedScrollable = !!_ui.default.IS_RENOVATED_WIDGET;
var EDIT_FORM_ITEM_CLASS = 'edit-form-item';
exports.EDIT_FORM_ITEM_CLASS = EDIT_FORM_ITEM_CLASS;
var EDIT_POPUP_CLASS = 'edit-popup';
exports.EDIT_POPUP_CLASS = EDIT_POPUP_CLASS;
var EDIT_POPUP_FORM_CLASS = 'edit-popup-form';
exports.EDIT_POPUP_FORM_CLASS = EDIT_POPUP_FORM_CLASS;
var FOCUSABLE_ELEMENT_CLASS = isRenovatedScrollable ? 'dx-scrollable' : 'dx-scrollable-container';
exports.FOCUSABLE_ELEMENT_CLASS = FOCUSABLE_ELEMENT_CLASS;
var BUTTON_CLASS = 'dx-button';
exports.BUTTON_CLASS = BUTTON_CLASS;
var FORM_BUTTONS_CONTAINER_CLASS = 'form-buttons-container';
exports.FORM_BUTTONS_CONTAINER_CLASS = FORM_BUTTONS_CONTAINER_CLASS;
var EDIT_ROW = 'dx-edit-row';
exports.EDIT_ROW = EDIT_ROW;
