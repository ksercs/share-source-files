/**
* DevExtreme (cjs/__internal/grids/pivot_grid/field_chooser/utils.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseSortOrder = void 0;
var const_1 = require("./const");
var reverseSortOrder = function (sortOrder) { return (sortOrder === const_1.SORT_ORDER.descending
    ? const_1.SORT_ORDER.ascending
    : const_1.SORT_ORDER.descending); };
exports.reverseSortOrder = reverseSortOrder;
