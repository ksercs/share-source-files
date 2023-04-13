/**
* DevExtreme (esm/__internal/grids/grid_core/keyboard_navigation/dom.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ATTRIBUTES } from './const';
const isDragCell = ($cell) => $cell.attr(ATTRIBUTES.dragCell) !== undefined;
const getCellToFocus = ($cellElements, columnIndex) => $cellElements
    .filter(`[${ATTRIBUTES.ariaColIndex}="${columnIndex + 1}"]:not([${ATTRIBUTES.dragCell}])`)
    .first();
export const GridCoreKeyboardNavigationDom = {
    isDragCell,
    getCellToFocus,
};
