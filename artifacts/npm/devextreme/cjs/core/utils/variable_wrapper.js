/**
* DevExtreme (cjs/core/utils/variable_wrapper.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _console = require("./console");
var _dependency_injector = _interopRequireDefault(require("./dependency_injector"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _dependency_injector.default)({
  isWrapped: function isWrapped() {
    return false;
  },
  isWritableWrapped: function isWritableWrapped() {
    return false;
  },
  wrap: function wrap(value) {
    return value;
  },
  unwrap: function unwrap(value) {
    return value;
  },
  assign: function assign() {
    _console.logger.error('Method \'assign\' should not be used for not wrapped variables. Use \'isWrapped\' method for ensuring.');
  }
});
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
