/**
* DevExtreme (bundles/__internal/grids/grid_core/keyboard_navigation/m_keyboard_navigation_utils.js)
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
exports.isCellInHeaderRow = isCellInHeaderRow;
exports.isDataRow = isDataRow;
exports.isDetailRow = isDetailRow;
exports.isEditorCell = isEditorCell;
exports.isElementDefined = isElementDefined;
exports.isFixedColumnIndexOffsetRequired = isFixedColumnIndexOffsetRequired;
exports.isGroupFooterRow = isGroupFooterRow;
exports.isGroupRow = isGroupRow;
exports.isMobile = isMobile;
exports.isNotFocusedRow = isNotFocusedRow;
exports.shouldPreventScroll = shouldPreventScroll;
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _type = require("../../../../core/utils/type");
var _const = require("../editing/const");
var _const2 = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DATAGRID_GROUP_FOOTER_CLASS = 'dx-datagrid-group-footer';
function isGroupRow($row) {
  return $row && $row.hasClass(_const2.GROUP_ROW_CLASS);
}
function isGroupFooterRow($row) {
  return $row && $row.hasClass(DATAGRID_GROUP_FOOTER_CLASS);
}
function isDetailRow($row) {
  return $row && $row.hasClass(_const2.MASTER_DETAIL_ROW_CLASS);
}
function isDataRow($row) {
  return $row && $row.hasClass(_const2.DATA_ROW_CLASS);
}
function isNotFocusedRow($row) {
  return !$row || $row.hasClass(_const2.FREESPACE_ROW_CLASS) || $row.hasClass(_const2.VIRTUAL_ROW_CLASS);
}
function isEditorCell(that, $cell) {
  return !that._isRowEditMode() && $cell && !$cell.hasClass(_const2.COMMAND_SELECT_CLASS) && $cell.hasClass(_const.EDITOR_CELL_CLASS);
}
function isElementDefined($element) {
  return (0, _type.isDefined)($element) && $element.length > 0;
}
function isMobile() {
  return _devices.default.current().deviceType !== 'desktop';
}
function isCellInHeaderRow($cell) {
  return !!$cell.parent(".".concat(_const2.HEADER_ROW_CLASS)).length;
}
function isFixedColumnIndexOffsetRequired(that, column) {
  var rtlEnabled = that.option('rtlEnabled');
  if (rtlEnabled) {
    return !(column.fixedPosition === 'right' || (0, _type.isDefined)(column.command) && !(0, _type.isDefined)(column.fixedPosition));
  }
  return !(!(0, _type.isDefined)(column.fixedPosition) || column.fixedPosition === 'left');
}
function shouldPreventScroll(that) {
  var keyboardController = that.getController('keyboardNavigation');
  return keyboardController._isVirtualScrolling() ? that.option('focusedRowIndex') === keyboardController.getRowIndex() : false;
}
