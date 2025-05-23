/**
* DevExtreme (cjs/ui/toast/hide_toasts.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var TOAST_CLASS = 'dx-toast';
function hideAllToasts(container) {
  var toasts = (0, _renderer.default)(".".concat(TOAST_CLASS)).toArray();
  if (!arguments.length) {
    toasts.forEach(function (toast) {
      (0, _renderer.default)(toast).dxToast('hide');
    });
    return;
  }
  var containerElement = (0, _renderer.default)(container).get(0);
  toasts.map(function (toast) {
    return (0, _renderer.default)(toast).dxToast('instance');
  }).filter(function (instance) {
    var toastContainerElement = (0, _renderer.default)(instance.option('container')).get(0);
    return containerElement === toastContainerElement && containerElement;
  }).forEach(function (instance) {
    instance.hide();
  });
}
var _default = hideAllToasts;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
