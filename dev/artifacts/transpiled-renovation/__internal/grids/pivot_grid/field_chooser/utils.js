"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseSortOrder = void 0;
var const_1 = require("./const");
var reverseSortOrder = function (sortOrder) { return (sortOrder === const_1.SORT_ORDER.descending
    ? const_1.SORT_ORDER.ascending
    : const_1.SORT_ORDER.descending); };
exports.reverseSortOrder = reverseSortOrder;