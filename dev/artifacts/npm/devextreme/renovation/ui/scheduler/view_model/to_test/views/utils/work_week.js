/**
* DevExtreme (renovation/ui/scheduler/view_model/to_test/views/utils/work_week.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.isDataOnWeekend = exports.getWeekendsCount = exports.calculateStartViewDate = void 0;
var _date = _interopRequireDefault(require("../../../../../../../core/utils/date"));
var _base = require("./base");
var _week = require("./week");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var SATURDAY_INDEX = 6;
var SUNDAY_INDEX = 0;
var MONDAY_INDEX = 1;
var DAYS_IN_WEEK = 7;
var isDataOnWeekend = function isDataOnWeekend(date) {
  var day = date.getDay();
  return day === SATURDAY_INDEX || day === SUNDAY_INDEX;
};
exports.isDataOnWeekend = isDataOnWeekend;
var getWeekendsCount = function getWeekendsCount(days) {
  return 2 * Math.floor(days / 7);
};
exports.getWeekendsCount = getWeekendsCount;
var calculateStartViewDate = function calculateStartViewDate(currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeek) {
  var viewStart = (0, _base.getViewStartByOptions)(startDate, currentDate, intervalDuration, (0, _week.getValidStartDate)(startDate, firstDayOfWeek));
  var firstViewDate = _date.default.getFirstWeekDate(viewStart, firstDayOfWeek);
  if (isDataOnWeekend(firstViewDate)) {
    var currentDay = firstViewDate.getDay();
    var distance = (MONDAY_INDEX + DAYS_IN_WEEK - currentDay) % 7;
    firstViewDate.setDate(firstViewDate.getDate() + distance);
  }
  return (0, _base.setOptionHour)(firstViewDate, startDayHour);
};
exports.calculateStartViewDate = calculateStartViewDate;
