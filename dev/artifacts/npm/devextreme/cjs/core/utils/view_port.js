/**
* DevExtreme (cjs/core/utils/view_port.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.changeCallback = void 0;
exports.originalViewPort = originalViewPort;
exports.value = void 0;
var _renderer = _interopRequireDefault(require("../renderer"));
var _ready_callbacks = _interopRequireDefault(require("./ready_callbacks"));
var _callbacks = _interopRequireDefault(require("./callbacks"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ready = _ready_callbacks.default.add;
var changeCallback = (0, _callbacks.default)();
exports.changeCallback = changeCallback;
var $originalViewPort = (0, _renderer.default)();
var value = function () {
  var $current;
  return function (element) {
    if (!arguments.length) {
      return $current;
    }
    var $element = (0, _renderer.default)(element);
    $originalViewPort = $element;
    var isNewViewportFound = !!$element.length;
    var prevViewPort = value();
    $current = isNewViewportFound ? $element : (0, _renderer.default)('body');
    changeCallback.fire(isNewViewportFound ? value() : (0, _renderer.default)(), prevViewPort);
  };
}();
exports.value = value;
ready(function () {
  value('.dx-viewport');
});
function originalViewPort() {
  return $originalViewPort;
}
