"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverseSortOrder = void 0;
var _const = require("./const");
var reverseSortOrder = function reverseSortOrder(sortOrder) {
  return sortOrder === _const.SORT_ORDER.descending ? _const.SORT_ORDER.ascending : _const.SORT_ORDER.descending;
};
exports.reverseSortOrder = reverseSortOrder;