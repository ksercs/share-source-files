"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCoreKeyboardNavigationDom = void 0;
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var const_1 = require("./const");
var isDragCell = function ($cell) { return $cell.attr(const_1.ATTRIBUTES.dragCell) !== undefined; };
var getCellToFocus = function ($cellElements, columnIndex) { return $cellElements
    .filter("[" + const_1.ATTRIBUTES.ariaColIndex + "=\"" + (columnIndex + 1) + "\"]:not([" + const_1.ATTRIBUTES.dragCell + "])")
    .first(); };
exports.GridCoreKeyboardNavigationDom = {
    isDragCell: isDragCell,
    getCellToFocus: getCellToFocus,
};