/**
* DevExtreme (bundles/__internal/scheduler/shaders/m_current_time_shader_horizontal.js)
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
var _position = require("../../../core/utils/position");
var _size = require("../../../core/utils/size");
var _m_current_time_shader = _interopRequireDefault(require("./m_current_time_shader"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var HorizontalCurrentTimeShader = /*#__PURE__*/function (_CurrentTimeShader) {
  _inheritsLoose(HorizontalCurrentTimeShader, _CurrentTimeShader);
  function HorizontalCurrentTimeShader() {
    return _CurrentTimeShader.apply(this, arguments) || this;
  }
  var _proto = HorizontalCurrentTimeShader.prototype;
  _proto.renderShader = function renderShader() {
    var groupCount = this._workSpace._isHorizontalGroupedWorkSpace() ? this._workSpace._getGroupCount() : 1;
    for (var i = 0; i < groupCount; i += 1) {
      var isFirstShader = i === 0;
      var $shader = isFirstShader ? this._$shader : this.createShader();
      if (this._workSpace.isGroupedByDate()) {
        this._customizeGroupedByDateShader($shader, i);
      } else {
        this._customizeShader($shader, i);
      }
      !isFirstShader && this._shader.push($shader);
    }
  };
  _proto._customizeShader = function _customizeShader($shader, groupIndex) {
    var shaderWidth = this._workSpace.getIndicationWidth();
    this._applyShaderWidth($shader, shaderWidth);
    if (groupIndex >= 1) {
      var workSpace = this._workSpace;
      var indicationWidth = workSpace._getCellCount() * workSpace.getCellWidth();
      $shader.css('left', indicationWidth);
    } else {
      $shader.css('left', 0);
    }
  };
  _proto._applyShaderWidth = function _applyShaderWidth($shader, width) {
    var maxWidth = (0, _position.getBoundingRect)(this._$container.get(0)).width;
    if (width > maxWidth) {
      width = maxWidth;
    }
    if (width > 0) {
      (0, _size.setWidth)($shader, width);
    }
  };
  _proto._customizeGroupedByDateShader = function _customizeGroupedByDateShader($shader, groupIndex) {
    var cellCount = this._workSpace.getIndicationCellCount();
    var integerPart = Math.floor(cellCount);
    var fractionPart = cellCount - integerPart;
    var isFirstShaderPart = groupIndex === 0;
    var workSpace = this._workSpace;
    var shaderWidth = isFirstShaderPart ? workSpace.getIndicationWidth() : fractionPart * workSpace.getCellWidth();
    var shaderLeft;
    this._applyShaderWidth($shader, shaderWidth);
    if (isFirstShaderPart) {
      shaderLeft = workSpace._getCellCount() * workSpace.getCellWidth() * groupIndex;
    } else {
      shaderLeft = workSpace.getCellWidth() * integerPart * workSpace._getGroupCount() + groupIndex * workSpace.getCellWidth();
    }
    $shader.css('left', shaderLeft);
  };
  return HorizontalCurrentTimeShader;
}(_m_current_time_shader.default);
var _default = HorizontalCurrentTimeShader;
exports.default = _default;
