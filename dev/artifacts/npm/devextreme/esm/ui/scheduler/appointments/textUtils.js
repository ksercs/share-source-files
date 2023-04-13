/**
* DevExtreme (esm/ui/scheduler/appointments/textUtils.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../core/utils/date';
import dateLocalization from '../../../localization/date';
export var createFormattedDateText = options => {
  var {
    startDate,
    endDate,
    allDay,
    format
  } = options;
  var formatType = format || getFormatType(startDate, endDate, allDay);
  return formatDates(startDate, endDate, formatType);
};
export var getFormatType = (startDate, endDate, isAllDay, isDateAndTimeView) => {
  if (isAllDay) {
    return 'DATE';
  }
  if (isDateAndTimeView && dateUtils.sameDate(startDate, endDate)) {
    return 'TIME';
  }
  return 'DATETIME';
};
export var formatDates = (startDate, endDate, formatType) => {
  var dateFormat = 'monthandday';
  var timeFormat = 'shorttime';
  var isSameDate = startDate.getDate() === endDate.getDate();
  switch (formatType) {
    case 'DATETIME':
      return [dateLocalization.format(startDate, dateFormat), ' ', dateLocalization.format(startDate, timeFormat), ' - ', isSameDate ? '' : dateLocalization.format(endDate, dateFormat) + ' ', dateLocalization.format(endDate, timeFormat)].join('');
    case 'TIME':
      return "".concat(dateLocalization.format(startDate, timeFormat), " - ").concat(dateLocalization.format(endDate, timeFormat));
    case 'DATE':
      return "".concat(dateLocalization.format(startDate, dateFormat)).concat(isSameDate ? '' : ' - ' + dateLocalization.format(endDate, dateFormat));
  }
};
