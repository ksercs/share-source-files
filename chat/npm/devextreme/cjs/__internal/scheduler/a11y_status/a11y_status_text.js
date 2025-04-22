/**
* DevExtreme (cjs/__internal/scheduler/a11y_status/a11y_status_text.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getA11yStatusText = void 0;
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const KEYS = {
  dateRange: 'dxScheduler-dateRange',
  label: 'dxScheduler-ariaLabel',
  indicatorPresent: 'dxScheduler-ariaLabel-currentIndicator-present',
  indicatorNotPresent: 'dxScheduler-ariaLabel-currentIndicator-not-present'
};
const viewTypeLocalization = {
  agenda: 'dxScheduler-switcherAgenda',
  day: 'dxScheduler-switcherDay',
  month: 'dxScheduler-switcherMonth',
  week: 'dxScheduler-switcherWeek',
  workWeek: 'dxScheduler-switcherWorkWeek',
  timelineDay: 'dxScheduler-switcherTimelineDay',
  timelineMonth: 'dxScheduler-switcherTimelineMonth',
  timelineWeek: 'dxScheduler-switcherTimelineWeek',
  timelineWorkWeek: 'dxScheduler-switcherTimelineWorkWeek'
};
const localizeMonth = date => String(_date.default.format(date, 'monthAndYear'));
const localizeDate = date => `${_date.default.format(date, 'monthAndDay')}, ${_date.default.format(date, 'year')}`;
const localizeCurrentIndicator = (date, startDate, endDate) => _message.default.format(date >= startDate && date < endDate ? KEYS.indicatorPresent : KEYS.indicatorNotPresent);
const localizeName = (viewName, viewType) => {
  if (viewName) {
    return viewName;
  }
  if (viewType) {
    return _message.default.format(viewTypeLocalization[viewType]);
  }
  return '';
};
const getA11yStatusText = (view, startDate, endDate, appointmentCount, indicatorTime) => {
  const viewType = (0, _type.isObject)(view) ? view.type : view;
  const viewName = (0, _type.isObject)(view) ? view.name : undefined;
  const viewTypeLabel = localizeName(viewName, viewType);
  const isMonth = viewType === 'month' || viewType === 'timelineMonth';
  const startDateText = isMonth ? localizeMonth(startDate) : localizeDate(startDate);
  const endDateText = isMonth ? localizeMonth(endDate) : localizeDate(endDate);
  const intervalText = startDateText === endDateText ? `${startDateText}`
  // @ts-expect-error ts-error
  : _message.default.format(KEYS.dateRange, startDateText, endDateText);
  const statusText = _message.default
  // @ts-expect-error
  .format(KEYS.label, viewTypeLabel, intervalText, appointmentCount);
  if (indicatorTime) {
    const indicatorStatus = localizeCurrentIndicator(indicatorTime, startDate, endDate);
    return `${statusText}. ${indicatorStatus}`;
  }
  return statusText;
};
exports.getA11yStatusText = getA11yStatusText;
