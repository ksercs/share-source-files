/**
* DevExtreme (cjs/viz/tree_map/tiling.strip.js)
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
function accumulate(total, current, count) {
  return ((count - 1) * total + current) / count;
}
function strip(data) {
  return (0, _tilingSquarified.default)(data, accumulate, true);
}
(0, _tiling.addAlgorithm)('strip', strip);
var _default = strip;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
