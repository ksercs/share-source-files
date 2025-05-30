/**
* DevExtreme (renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getAppointmentTakesAllDay = void 0;
var _type = require("../../../../../core/utils/type");
var _date = _interopRequireDefault(require("../../../../../core/utils/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var getAppointmentDurationInHours = function getAppointmentDurationInHours(startDate, endDate) {
  return (endDate.getTime() - startDate.getTime()) / _date.default.dateToMilliseconds('hour');
};
var appointmentHasShortDayDuration = function appointmentHasShortDayDuration(startDate, endDate, viewStartDayHour, viewEndDayHour) {
  var appointmentDurationInHours = getAppointmentDurationInHours(startDate, endDate);
  var viewDurationInHours = viewEndDayHour - viewStartDayHour;
  var startDateHours = startDate.getHours();
  var endDateHours = endDate.getHours();
  return appointmentDurationInHours >= viewDurationInHours && startDateHours === viewStartDayHour && endDateHours === viewEndDayHour;
};
var getAppointmentTakesAllDay = function getAppointmentTakesAllDay(appointmentAdapter, viewStartDayHour, viewEndDayHour, allDayPanelMode) {
  var hasAllDay = function hasAllDay() {
    return appointmentAdapter.allDay;
  };
  switch (allDayPanelMode) {
    case 'hidden':
      return false;
    case 'allDay':
      return hasAllDay();
    case 'all':
    default:
      {
        if (hasAllDay()) {
          return true;
        }
        var endDate = appointmentAdapter.endDate,
          startDate = appointmentAdapter.startDate;
        if (!(0, _type.isDefined)(endDate)) {
          return false;
        }
        var appointmentDurationInHours = getAppointmentDurationInHours(startDate, endDate);
        var dayDuration = 24;
        return appointmentDurationInHours >= dayDuration || appointmentHasShortDayDuration(startDate, endDate, viewStartDayHour, viewEndDayHour);
      }
  }
};
exports.getAppointmentTakesAllDay = getAppointmentTakesAllDay;
