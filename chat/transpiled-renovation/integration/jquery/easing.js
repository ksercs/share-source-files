"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
var _easing = require("../../common/core/animation/easing");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports

if (_jquery.default) {
  (0, _easing.setEasing)(_jquery.default.easing);
}