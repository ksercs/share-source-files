/**
* DevExtreme (esm/renovation/ui/scheduler/view_model/appointments/utils/getSkippedHoursInRange.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../../../core/utils/date';
var getSkippedHoursInRange = (startDate, endDate, viewDataProvider) => {
  var msInHour = dateUtils.dateToMilliseconds('hour');
  var startTime = dateUtils.trimTime(startDate).getTime();
  var endTime = dateUtils.setToDayEnd(new Date(endDate.getTime() - 1)).getTime();
  var allDayIntervalDuration = 24 * msInHour;
  var excludedHours = 0;
  for (var time = startTime; time < endTime; time += allDayIntervalDuration) {
    var checkDate = new Date(time);
    if (viewDataProvider.isSkippedDate(checkDate)) {
      excludedHours += 24;
    }
  }
  return excludedHours;
};
export default getSkippedHoursInRange;
