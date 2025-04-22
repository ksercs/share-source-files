"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dispatcher = _interopRequireDefault(require("./dispatcher"));
var _methods = require("./methods");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  forEach: _methods.macroTaskArrayForEach,
  map: _methods.macroTaskArrayMap,
  dispose: _dispatcher.default.dispose
};