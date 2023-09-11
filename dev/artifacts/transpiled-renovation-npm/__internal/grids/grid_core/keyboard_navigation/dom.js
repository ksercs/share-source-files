"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridCoreKeyboardNavigationDom = void 0;
var _const = require("./const");
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

var isDragCell = function isDragCell($cell) {
  return $cell.attr(_const.ATTRIBUTES.dragCell) !== undefined;
};
var getCellToFocus = function getCellToFocus($cellElements, columnIndex) {
  return $cellElements.filter("[".concat(_const.ATTRIBUTES.ariaColIndex, "=\"").concat(columnIndex + 1, "\"]:not([").concat(_const.ATTRIBUTES.dragCell, "])")).first();
};
var GridCoreKeyboardNavigationDom = {
  isDragCell,
  getCellToFocus
};
exports.GridCoreKeyboardNavigationDom = GridCoreKeyboardNavigationDom;