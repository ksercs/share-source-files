/**
* DevExtreme (cjs/__internal/scheduler/appointments/resizing/m_utils.js)
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
exports.normalizeStartDate = exports.normalizeEndDate = void 0;
var normalizeDate = function normalizeDate(options, date, sourceDate, isStartDate) {
  if (!options.considerTime) {
    return date;
  }
  var result = new Date(date);
  result.setHours(sourceDate.getHours(), sourceDate.getMinutes(), sourceDate.getSeconds());
  var startDayHour = options.startDayHour,
    endDayHour = options.endDayHour,
    allDay = options.appointmentSettings.allDay;
  var minDate = new Date(date);
  var maxDate = new Date(date);
  minDate.setHours(startDayHour, 0, 0, 0);
  maxDate.setHours(endDayHour, 0, 0, 0);
  var resultTime = result.getTime();
  var isDateOutInterval = isStartDate ? resultTime < minDate.getTime() || resultTime >= maxDate.getTime() : resultTime <= minDate.getTime() || resultTime > maxDate.getTime();
  if (isDateOutInterval) {
    result = !allDay ? maxDate : minDate;
  }
  return result;
};
var normalizeStartDate = function normalizeStartDate(options, startDate, sourceStartDate) {
  return normalizeDate(options, startDate, sourceStartDate, true);
};
exports.normalizeStartDate = normalizeStartDate;
var normalizeEndDate = function normalizeEndDate(options, endDate, sourceEndDate) {
  return normalizeDate(options, endDate, sourceEndDate, false);
};
exports.normalizeEndDate = normalizeEndDate;
