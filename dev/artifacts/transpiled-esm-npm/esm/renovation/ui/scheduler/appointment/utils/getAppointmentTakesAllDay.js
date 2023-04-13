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