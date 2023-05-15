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
exports.isGroupRow = isGroupRow;
exports.isMobile = isMobile;
exports.isNotFocusedRow = isNotFocusedRow;
exports.shouldPreventScroll = shouldPreventScroll;
var _type = require("../../../../core/utils/type");
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _uiGrid_core = require("../../../../ui/grid_core/ui.grid_core.editing_constants");
var _const = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isGroupRow($row) {
  return $row && $row.hasClass(_const.GROUP_ROW_CLASS);
}
function isDetailRow($row) {
  return $row && $row.hasClass(_const.MASTER_DETAIL_ROW_CLASS);
}
function isDataRow($row) {
  return $row && !isGroupRow($row) && !isDetailRow($row);
}
function isNotFocusedRow($row) {
  return !$row || $row.hasClass(_const.FREESPACE_ROW_CLASS) || $row.hasClass(_const.VIRTUAL_ROW_CLASS);
}
function isEditorCell(that, $cell) {
  return !that._isRowEditMode() && $cell && !$cell.hasClass(_const.COMMAND_SELECT_CLASS) && $cell.hasClass(_uiGrid_core.EDITOR_CELL_CLASS);
}
function isElementDefined($element) {
  return (0, _type.isDefined)($element) && $element.length > 0;
}
function isMobile() {
  return _devices.default.current().deviceType !== 'desktop';
}
function isCellInHeaderRow($cell) {
  return !!$cell.parent(".".concat(_const.HEADER_ROW_CLASS)).length;
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