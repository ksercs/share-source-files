"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _query_implementation = require("../../common/data/query_implementation");
const query = function () {
  const impl = Array.isArray(arguments[0]) ? 'array' : 'remote';
  // @ts-expect-error
  return _query_implementation.queryImpl[impl].apply(this, arguments);
};
var _default = exports.default = query;