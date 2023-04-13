/**
* DevExtreme (bundles/__internal/grids/grid_core/keyboard_navigation/dom.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
