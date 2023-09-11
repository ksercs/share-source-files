import timeZoneUtils from '../../../../../../../__internal/scheduler/m_utils_time_zone';
import { getStartViewDateWithoutDST } from './base';
export var getDateForHeaderText = (index, date, options) => {
  if (!timeZoneUtils.isTimezoneChangeInDate(date)) {
    return date;
  }
  var {
    cellCountInDay,
    interval,
    startDayHour,
    startViewDate
  } = options;
  var result = getStartViewDateWithoutDST(startViewDate, startDayHour);
  var validIndex = index % cellCountInDay;
  result.setTime(result.getTime() + validIndex * interval);
  return result;
};