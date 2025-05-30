/**
* DevExtreme (esm/renovation/ui/scheduler/view_model/to_test/views/utils/base.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../../../../../ui/widget/ui.errors';
import dateUtils from '../../../../../../../core/utils/date';
import { isDefined } from '../../../../../../../core/utils/type';
import dateLocalization from '../../../../../../../localization/date';
import timeZoneUtils from '../../../../../../../__internal/scheduler/m_utils_time_zone';
import { VERTICAL_GROUP_COUNT_CLASSES } from '../../../../../../../__internal/scheduler/m_classes';
import { VIEWS } from '../../../../../../../__internal/scheduler/m_constants';
import { getGroupCount } from '../../../../../../../__internal/scheduler/resources/m_utils';
import { isVerticalGroupingApplied } from '../../../../workspaces/utils';
import { TIMELINE_VIEWS } from './const';
export var isDateInRange = (date, startDate, endDate, diff) => diff > 0 ? dateUtils.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : dateUtils.dateInRange(date, endDate, startDate, 'date');
export var setOptionHour = (date, optionHour) => {
  var nextDate = new Date(date);
  if (!isDefined(optionHour)) {
    return nextDate;
  }
  nextDate.setHours(optionHour, optionHour % 1 * 60, 0, 0);
  return nextDate;
};
export var getViewStartByOptions = (startDate, currentDate, intervalDuration, startViewDate) => {
  if (!startDate) {
    return new Date(currentDate);
  }
  var currentStartDate = dateUtils.trimTime(startViewDate);
  var diff = currentStartDate.getTime() <= currentDate.getTime() ? 1 : -1;
  var endDate = new Date(currentStartDate.getTime() + intervalDuration * diff);
  while (!isDateInRange(currentDate, currentStartDate, endDate, diff)) {
    currentStartDate = endDate;
    endDate = new Date(currentStartDate.getTime() + intervalDuration * diff);
  }
  return diff > 0 ? currentStartDate : endDate;
};
export var getCalculatedFirstDayOfWeek = firstDayOfWeekOption => isDefined(firstDayOfWeekOption) ? firstDayOfWeekOption : dateLocalization.firstDayOfWeekIndex();
export var calculateViewStartDate = startDateOption => startDateOption;
export var calculateCellIndex = (rowIndex, columnIndex, rowCount) => columnIndex * rowCount + rowIndex;
export var getStartViewDateWithoutDST = (startViewDate, startDayHour) => {
  var newStartViewDate = timeZoneUtils.getDateWithoutTimezoneChange(startViewDate);
  newStartViewDate.setHours(startDayHour);
  return newStartViewDate;
};
export var getHeaderCellText = (headerIndex, date, headerCellTextFormat, getDateForHeaderText, additionalOptions) => {
  var validDate = getDateForHeaderText(headerIndex, date, additionalOptions);
  return dateLocalization.format(validDate, headerCellTextFormat);
};
export var validateDayHours = (startDayHour, endDayHour) => {
  if (startDayHour >= endDayHour) {
    throw errors.Error('E1058');
  }
};
export var getStartViewDateTimeOffset = (startViewDate, startDayHour) => {
  var validStartDayHour = Math.floor(startDayHour);
  var isDSTChange = timeZoneUtils.isTimezoneChangeInDate(startViewDate);
  if (isDSTChange && validStartDayHour !== startViewDate.getHours()) {
    return dateUtils.dateToMilliseconds('hour');
  }
  return 0;
};
export var formatWeekday = date => dateLocalization.getDayNames('abbreviated')[date.getDay()];
export var formatWeekdayAndDay = date => "".concat(formatWeekday(date), " ").concat(dateLocalization.format(date, 'day'));
export var getToday = (indicatorTime, timeZoneCalculator) => {
  var todayDate = indicatorTime !== null && indicatorTime !== void 0 ? indicatorTime : new Date();
  return (timeZoneCalculator === null || timeZoneCalculator === void 0 ? void 0 : timeZoneCalculator.createDate(todayDate, {
    path: 'toGrid'
  })) || todayDate;
};
export var getVerticalGroupCountClass = groups => {
  switch (groups === null || groups === void 0 ? void 0 : groups.length) {
    case 1:
      return VERTICAL_GROUP_COUNT_CLASSES[0];
    case 2:
      return VERTICAL_GROUP_COUNT_CLASSES[1];
    case 3:
      return VERTICAL_GROUP_COUNT_CLASSES[2];
    default:
      return undefined;
  }
};
export var isDateAndTimeView = viewType => viewType !== VIEWS.TIMELINE_MONTH && viewType !== VIEWS.MONTH;
export var isTimelineView = viewType => !!TIMELINE_VIEWS[viewType];
export var getHorizontalGroupCount = (groups, groupOrientation) => {
  var groupCount = getGroupCount(groups) || 1;
  var isVerticalGrouping = isVerticalGroupingApplied(groups, groupOrientation);
  return isVerticalGrouping ? 1 : groupCount;
};
export var calculateIsGroupedAllDayPanel = (groups, groupOrientation, isAllDayPanelVisible) => isVerticalGroupingApplied(groups, groupOrientation) && isAllDayPanelVisible;
export var calculateDayDuration = (startDayHour, endDayHour) => endDayHour - startDayHour;
export var isHorizontalView = viewType => {
  switch (viewType) {
    case VIEWS.TIMELINE_DAY:
    case VIEWS.TIMELINE_WEEK:
    case VIEWS.TIMELINE_WORK_WEEK:
    case VIEWS.TIMELINE_MONTH:
    case VIEWS.MONTH:
      return true;
    default:
      return false;
  }
};
export var getTotalCellCountByCompleteData = completeData => completeData[completeData.length - 1].length;
export var getTotalRowCountByCompleteData = completeData => completeData.length;
export var getDisplayedCellCount = (displayedCellCount, completeData) => displayedCellCount !== null && displayedCellCount !== void 0 ? displayedCellCount : getTotalCellCountByCompleteData(completeData);
export var getDisplayedRowCount = (displayedRowCount, completeData) => displayedRowCount !== null && displayedRowCount !== void 0 ? displayedRowCount : getTotalRowCountByCompleteData(completeData);
export var getCellDuration = (viewType, startDayHour, endDayHour, hoursInterval) => {
  switch (viewType) {
    case 'month':
      return calculateDayDuration(startDayHour, endDayHour) * 3600000;
    case 'timelineMonth':
      return dateUtils.dateToMilliseconds('day');
    default:
      return 3600000 * hoursInterval;
  }
};
