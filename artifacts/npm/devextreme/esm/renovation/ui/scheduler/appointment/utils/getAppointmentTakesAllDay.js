/**
* DevExtreme (esm/renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../../../core/utils/type';
import dateUtils from '../../../../../core/utils/date';
var getAppointmentDurationInHours = (startDate, endDate) => (endDate.getTime() - startDate.getTime()) / dateUtils.dateToMilliseconds('hour');
var appointmentHasShortDayDuration = (startDate, endDate, viewStartDayHour, viewEndDayHour) => {
  var appointmentDurationInHours = getAppointmentDurationInHours(startDate, endDate);
  var viewDurationInHours = viewEndDayHour - viewStartDayHour;
  var startDateHours = startDate.getHours();
  var endDateHours = endDate.getHours();
  return appointmentDurationInHours >= viewDurationInHours && startDateHours === viewStartDayHour && endDateHours === viewEndDayHour;
};
export var getAppointmentTakesAllDay = (appointmentAdapter, viewStartDayHour, viewEndDayHour, allDayPanelMode) => {
  var hasAllDay = () => appointmentAdapter.allDay;
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
        var {
          endDate,
          startDate
        } = appointmentAdapter;
        if (!isDefined(endDate)) {
          return false;
        }
        var appointmentDurationInHours = getAppointmentDurationInHours(startDate, endDate);
        var dayDuration = 24;
        return appointmentDurationInHours >= dayDuration || appointmentHasShortDayDuration(startDate, endDate, viewStartDayHour, viewEndDayHour);
      }
  }
};
