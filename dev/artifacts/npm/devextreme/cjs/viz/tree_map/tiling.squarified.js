/**
* DevExtreme (cjs/viz/tree_map/tiling.squarified.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _tilingSquarified = _interopRequireDefault(require("./tiling.squarified.base"));
var _tiling = require("./tiling");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _max = Math.max;
function accumulate(total, current) {
  return _max(total, current);
}
function squarified(data) {
  return (0, _tilingSquarified.default)(data, accumulate, false);
}
(0, _tiling.addAlgorithm)('squarified', squarified);
var _default = squarified;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
