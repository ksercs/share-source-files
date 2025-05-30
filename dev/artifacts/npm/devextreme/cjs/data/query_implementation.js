/**
* DevExtreme (cjs/data/query_implementation.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.queryImpl = void 0;
var _array_query = _interopRequireDefault(require("./array_query"));
var _remote_query = _interopRequireDefault(require("./remote_query"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var queryImpl = {
  array: _array_query.default,
  remote: _remote_query.default
};
exports.queryImpl = queryImpl;
