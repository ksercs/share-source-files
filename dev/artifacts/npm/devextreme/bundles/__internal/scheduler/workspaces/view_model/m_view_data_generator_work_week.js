/**
* DevExtreme (bundles/__internal/scheduler/workspaces/view_model/m_view_data_generator_work_week.js)
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
exports.ViewDataGeneratorWorkWeek = void 0;
var _work_week = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/work_week");
var _m_view_data_generator_week = require("./m_view_data_generator_week");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var ViewDataGeneratorWorkWeek = /*#__PURE__*/function (_ViewDataGeneratorWee) {
  _inheritsLoose(ViewDataGeneratorWorkWeek, _ViewDataGeneratorWee);
  function ViewDataGeneratorWorkWeek() {
    var _this;
    _this = _ViewDataGeneratorWee.apply(this, arguments) || this;
    _this.daysInInterval = 5;
    _this.isWorkView = true;
    return _this;
  }
  var _proto = ViewDataGeneratorWorkWeek.prototype;
  _proto.isSkippedDate = function isSkippedDate(date) {
    return (0, _work_week.isDataOnWeekend)(date);
  };
  _proto._calculateStartViewDate = function _calculateStartViewDate(options) {
    return (0, _work_week.calculateStartViewDate)(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), this.getFirstDayOfWeek(options.firstDayOfWeek));
  };
  _proto.getFirstDayOfWeek = function getFirstDayOfWeek(firstDayOfWeekOption) {
    return firstDayOfWeekOption || 0;
  };
  return ViewDataGeneratorWorkWeek;
}(_m_view_data_generator_week.ViewDataGeneratorWeek);
exports.ViewDataGeneratorWorkWeek = ViewDataGeneratorWorkWeek;
