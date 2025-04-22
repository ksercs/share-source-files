/**
* DevExtreme (cjs/__internal/grids/grid_core/keyboard_navigation/dom.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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

const isDragCell = $cell => $cell.attr(_const.ATTRIBUTES.dragCell) !== undefined;
const getFocusableCellSelector = columnIndex => [`[${_const.ATTRIBUTES.ariaColIndex}="${columnIndex + 1}"]`, `:not([${_const.ATTRIBUTES.dragCell}])`, ':not([aria-hidden=true])'].join('');
const getCellToFocus = ($cellElements, columnIndex) => $cellElements.filter(getFocusableCellSelector(columnIndex)).first();
const GridCoreKeyboardNavigationDom = exports.GridCoreKeyboardNavigationDom = {
  isDragCell,
  getCellToFocus
};
