/**
* DevExtreme (bundles/__internal/scheduler/shaders/m_current_time_shader_vertical.js)
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
var _size = require("../../../core/utils/size");
var _m_current_time_shader = _interopRequireDefault(require("./m_current_time_shader"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var DATE_TIME_SHADER_ALL_DAY_CLASS = 'dx-scheduler-date-time-shader-all-day';
var DATE_TIME_SHADER_TOP_CLASS = 'dx-scheduler-date-time-shader-top';
var DATE_TIME_SHADER_BOTTOM_CLASS = 'dx-scheduler-date-time-shader-bottom';
var VerticalCurrentTimeShader = /*#__PURE__*/function (_CurrentTimeShader) {
  _inheritsLoose(VerticalCurrentTimeShader, _CurrentTimeShader);
  function VerticalCurrentTimeShader() {
    return _CurrentTimeShader.apply(this, arguments) || this;
  }
  var _proto = VerticalCurrentTimeShader.prototype;
  _proto.renderShader = function renderShader() {
    var shaderHeight = this._getShaderHeight();
    var maxHeight = this._getShaderMaxHeight();
    var isSolidShader = shaderHeight > maxHeight;
    if (shaderHeight > maxHeight) {
      shaderHeight = maxHeight;
    }
    (0, _size.setHeight)(this._$shader, shaderHeight);
    var groupCount = this._workSpace._getGroupCount() || 1;
    if (this._workSpace.isGroupedByDate()) {
      this._renderGroupedByDateShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader);
    } else {
      this._renderShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader);
    }
  };
  _proto._renderShaderParts = function _renderShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader) {
    for (var i = 0; i < groupCount; i++) {
      var shaderWidth = this._getShaderWidth(i);
      this._renderTopShader(this._$shader, shaderHeight, shaderWidth, i);
      !isSolidShader && this._renderBottomShader(this._$shader, maxHeight, shaderHeight, shaderWidth, i);
      this._renderAllDayShader(shaderWidth, i);
    }
  };
  _proto._renderGroupedByDateShaderParts = function _renderGroupedByDateShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader) {
    var shaderWidth = this._getShaderWidth(0);
    var bottomShaderWidth = shaderWidth - this._workSpace.getCellWidth();
    if (shaderHeight < 0) {
      shaderHeight = 0;
      bottomShaderWidth = shaderWidth;
    }
    this._renderTopShader(this._$shader, shaderHeight, shaderWidth * groupCount, 0);
    !isSolidShader && this._renderBottomShader(this._$shader, maxHeight, shaderHeight, bottomShaderWidth * groupCount + this._workSpace.getCellWidth(), 0);
    this._renderAllDayShader(shaderWidth * groupCount, 0);
  };
  _proto._renderTopShader = function _renderTopShader($shader, height, width, i) {
    this._$topShader = (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_TOP_CLASS);
    if (width) {
      (0, _size.setWidth)(this._$topShader, width);
    }
    if (height) {
      (0, _size.setHeight)(this._$topShader, height);
    }
    this._$topShader.css('marginTop', this._getShaderTopOffset(i));
    this._$topShader.css('left', this._getShaderOffset(i, width));
    $shader.append(this._$topShader);
  };
  _proto._renderBottomShader = function _renderBottomShader($shader, maxHeight, height, width, i) {
    this._$bottomShader = (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_BOTTOM_CLASS);
    var shaderWidth = height < 0 ? width : width - this._workSpace.getCellWidth();
    var shaderHeight = height < 0 ? maxHeight : maxHeight - height;
    (0, _size.setWidth)(this._$bottomShader, shaderWidth);
    (0, _size.setHeight)(this._$bottomShader, shaderHeight);
    this._$bottomShader.css('left', this._getShaderOffset(i, width - this._workSpace.getCellWidth()));
    $shader.append(this._$bottomShader);
  };
  _proto._renderAllDayShader = function _renderAllDayShader(shaderWidth, i) {
    if (this._workSpace.option('showAllDayPanel')) {
      this._$allDayIndicator = (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_ALL_DAY_CLASS);
      (0, _size.setHeight)(this._$allDayIndicator, this._workSpace.getAllDayHeight());
      (0, _size.setWidth)(this._$allDayIndicator, shaderWidth);
      this._$allDayIndicator.css('left', this._getShaderOffset(i, shaderWidth));
      this._workSpace._$allDayPanel.prepend(this._$allDayIndicator);
    }
  };
  _proto._getShaderOffset = function _getShaderOffset(i, width) {
    return this._workSpace.getGroupedStrategy().getShaderOffset(i, width);
  };
  _proto._getShaderTopOffset = function _getShaderTopOffset(i) {
    return this._workSpace.getGroupedStrategy().getShaderTopOffset(i);
  };
  _proto._getShaderHeight = function _getShaderHeight() {
    return this._workSpace.getGroupedStrategy().getShaderHeight();
  };
  _proto._getShaderMaxHeight = function _getShaderMaxHeight() {
    return this._workSpace.getGroupedStrategy().getShaderMaxHeight();
  };
  _proto._getShaderWidth = function _getShaderWidth(i) {
    return this._workSpace.getGroupedStrategy().getShaderWidth(i);
  };
  _proto.clean = function clean() {
    _CurrentTimeShader.prototype.clean.call(this);
    this._workSpace && this._workSpace._$allDayPanel && this._workSpace._$allDayPanel.find(".".concat(DATE_TIME_SHADER_ALL_DAY_CLASS)).remove();
  };
  return VerticalCurrentTimeShader;
}(_m_current_time_shader.default);
var _default = VerticalCurrentTimeShader;
exports.default = _default;
