/**
* DevExtreme (cjs/__internal/scheduler/appointments/rendering_strategies/m_strategy_week.js)
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
var _m_strategy_vertical = _interopRequireDefault(require("./m_strategy_vertical"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var WeekAppointmentRenderingStrategy = /*#__PURE__*/function (_VerticalRenderingStr) {
  _inheritsLoose(WeekAppointmentRenderingStrategy, _VerticalRenderingStr);
  function WeekAppointmentRenderingStrategy() {
    return _VerticalRenderingStr.apply(this, arguments) || this;
  }
  var _proto = WeekAppointmentRenderingStrategy.prototype;
  _proto.isApplyCompactAppointmentOffset = function isApplyCompactAppointmentOffset() {
    if (this.isAdaptive && this._getMaxAppointmentCountPerCellByType() === 0) {
      return false;
    }
    return this.supportCompactDropDownAppointments();
  };
  return WeekAppointmentRenderingStrategy;
}(_m_strategy_vertical.default);
var _default = WeekAppointmentRenderingStrategy;
exports.default = _default;
