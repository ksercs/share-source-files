/**
* DevExtreme (cjs/ui/html_editor/converterController.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var ConverterController = /*#__PURE__*/function () {
  function ConverterController() {
    this._converters = {};
  }
  var _proto = ConverterController.prototype;
  _proto.addConverter = function addConverter(name, converter) {
    this._converters[name] = converter;
  };
  _proto.getConverter = function getConverter(name) {
    return this._converters[name];
  };
  return ConverterController;
}();
var controller = new ConverterController();
var _default = controller;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
