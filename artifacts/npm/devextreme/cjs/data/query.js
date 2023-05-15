/**
* DevExtreme (cjs/data/query.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _query_implementation = require("./query_implementation");
var query = function query() {
  var impl = Array.isArray(arguments[0]) ? 'array' : 'remote';
  return _query_implementation.queryImpl[impl].apply(this, arguments);
};
var _default = query;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
