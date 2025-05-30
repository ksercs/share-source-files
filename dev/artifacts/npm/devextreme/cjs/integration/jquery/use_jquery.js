/**
* DevExtreme (cjs/integration/jquery/use_jquery.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = _default;
var _jquery = _interopRequireDefault(require("jquery"));
var _config = _interopRequireDefault(require("../../core/config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line no-restricted-imports

var useJQuery = (0, _config.default)().useJQuery;
if (_jquery.default && useJQuery !== false) {
  (0, _config.default)({
    useJQuery: true
  });
}
function _default() {
  return _jquery.default && (0, _config.default)().useJQuery;
}
module.exports = exports.default;
module.exports.default = exports.default;
