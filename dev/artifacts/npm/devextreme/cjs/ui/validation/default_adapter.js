/**
* DevExtreme (cjs/ui/validation/default_adapter.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DefaultAdapter = _class.default.inherit({
  ctor(editor, validator) {
    var _this = this;
    this.editor = editor;
    this.validator = validator;
    this.validationRequestsCallbacks = [];
    var handler = function handler(args) {
      _this.validationRequestsCallbacks.forEach(function (item) {
        return item(args);
      });
    };
    editor.validationRequest.add(handler);
    editor.on('disposing', function () {
      editor.validationRequest.remove(handler);
    });
  },
  getValue() {
    return this.editor.option('value');
  },
  getCurrentValidationError() {
    return this.editor.option('validationError');
  },
  bypass() {
    return this.editor.option('disabled');
  },
  applyValidationResults(params) {
    this.editor.option({
      validationErrors: params.brokenRules,
      validationStatus: params.status
    });
  },
  reset() {
    this.editor.clear();
  },
  focus() {
    this.editor.focus();
  }
});
var _default = DefaultAdapter;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
