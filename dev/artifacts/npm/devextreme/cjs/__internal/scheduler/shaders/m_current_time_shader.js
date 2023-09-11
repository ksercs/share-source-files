/**
* DevExtreme (cjs/__internal/scheduler/shaders/m_current_time_shader.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DATE_TIME_SHADER_CLASS = 'dx-scheduler-date-time-shader';
var CurrentTimeShader = /*#__PURE__*/function () {
  function CurrentTimeShader(_workSpace) {
    this._workSpace = _workSpace;
    this._$container = this._workSpace._dateTableScrollable.$content();
  }
  var _proto = CurrentTimeShader.prototype;
  _proto.render = function render() {
    var _this = this;
    this.initShaderElements();
    this.renderShader();
    this._shader.forEach(function (shader) {
      _this._$container.append(shader);
    });
  };
  _proto.initShaderElements = function initShaderElements() {
    this._$shader = this.createShader();
    this._shader = [];
    this._shader.push(this._$shader);
  };
  _proto.renderShader = function renderShader() {};
  _proto.createShader = function createShader() {
    return (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_CLASS);
  };
  _proto.clean = function clean() {
    this._$container && this._$container.find(".".concat(DATE_TIME_SHADER_CLASS)).remove();
  };
  return CurrentTimeShader;
}();
var _default = CurrentTimeShader;
exports.default = _default;
