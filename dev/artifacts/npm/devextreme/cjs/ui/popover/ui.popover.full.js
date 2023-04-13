/**
* DevExtreme (cjs/ui/popover/ui.popover.full.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
require("../toolbar");
var _ui = _interopRequireDefault(require("../popover/ui.popover"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _extend = require("../../core/utils/extend");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var PopoverFull = /*#__PURE__*/function (_Popover) {
  _inheritsLoose(PopoverFull, _Popover);
  function PopoverFull() {
    return _Popover.apply(this, arguments) || this;
  }
  var _proto = PopoverFull.prototype;
  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_Popover.prototype._getDefaultOptions.call(this), {
      preventScrollEvents: false
    });
  };
  _proto._getToolbarName = function _getToolbarName() {
    return 'dxToolbar';
  };
  return PopoverFull;
}(_ui.default);
exports.default = PopoverFull;
PopoverFull.defaultOptions = function (rule) {
  _ui.default.defaultOptions(rule);
};
(0, _component_registrator.default)('dxPopover', PopoverFull);
module.exports = exports.default;
module.exports.default = exports.default;
