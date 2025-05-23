/**
* DevExtreme (cjs/__internal/scheduler/header/m_utils.js)
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
exports.validateViews = exports.nextWeek = exports.isOneView = exports.getViewType = exports.getViewText = exports.getViewName = exports.getStep = exports.getNextIntervalDate = exports.getCaptionInterval = exports.getCaption = exports.formatViews = void 0;
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _date2 = _interopRequireDefault(require("../../../core/utils/date"));
var _inflector = require("../../../core/utils/inflector");
var _type = require("../../../core/utils/type");
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DAY_FORMAT = 'd';
const DAYS_IN_WORK_WEEK = 5;
const {
  correctDateWithUnitBeginning: getPeriodStart,
  getFirstWeekDate: getWeekStart,
  getLastMonthDay,
  addDateInterval
} = _date2.default;
const {
  format: formatDate
} = _date.default;
const MS_DURATION = {
  milliseconds: 1
};
const DAY_DURATION = {
  days: 1
};
const WEEK_DURATION = {
  days: 7
};
const SATURDAY_INDEX = 6;
const SUNDAY_INDEX = 0;
const subMS = date => addDateInterval(date, MS_DURATION, -1);
const addMS = date => addDateInterval(date, MS_DURATION, 1);
const nextDay = date => addDateInterval(date, DAY_DURATION, 1);
const nextWeek = date => addDateInterval(date, WEEK_DURATION, 1);
exports.nextWeek = nextWeek;
const nextMonth = date => {
  const days = getLastMonthDay(date);
  return addDateInterval(date, {
    days
  }, 1);
};
const isWeekend = date => [SATURDAY_INDEX, SUNDAY_INDEX].includes(date.getDay());
const getWorkWeekStart = firstDayOfWeek => {
  let date = new Date(firstDayOfWeek);
  while (isWeekend(date)) {
    date = nextDay(date);
  }
  return date;
};
const getDateAfterWorkWeek = workWeekStart => {
  let date = new Date(workWeekStart);
  let workDaysCount = 0;
  while (workDaysCount < DAYS_IN_WORK_WEEK) {
    if (!isWeekend(date)) {
      workDaysCount++;
    }
    date = nextDay(date);
  }
  return date;
};
const nextAgendaStart = (date, agendaDuration) => addDateInterval(date, {
  days: agendaDuration
}, 1);
const getIntervalStartDate = options => {
  const {
    date,
    step,
    firstDayOfWeek
  } = options;
  // eslint-disable-next-line default-case
  switch (step) {
    case 'day':
    case 'week':
    case 'month':
      return getPeriodStart(date, step, false, firstDayOfWeek);
    case 'workWeek':
      // eslint-disable-next-line no-case-declarations
      const firstWeekDay = getWeekStart(date, firstDayOfWeek);
      return getWorkWeekStart(firstWeekDay);
    case 'agenda':
      return new Date(date);
  }
};
const getIntervalEndDate = (startDate, options) => {
  const {
    intervalCount,
    step,
    agendaDuration
  } = options;
  let periodStartDate;
  let periodEndDate;
  let nextPeriodStartDate = new Date(startDate);
  for (let i = 0; i < intervalCount; i++) {
    periodStartDate = nextPeriodStartDate;
    periodEndDate = getPeriodEndDate(periodStartDate, step, agendaDuration);
    nextPeriodStartDate = getNextPeriodStartDate(periodEndDate, step);
  }
  return periodEndDate;
};
const getCaptionInterval = options => {
  const startDate = getIntervalStartDate(options);
  const endDate = getIntervalEndDate(startDate, options);
  return {
    startDate,
    endDate
  };
};
exports.getCaptionInterval = getCaptionInterval;
const getPeriodEndDate = (currentPeriodStartDate, step, agendaDuration) => {
  let date;
  // eslint-disable-next-line default-case
  switch (step) {
    case 'day':
      date = nextDay(currentPeriodStartDate);
      break;
    case 'week':
      date = nextWeek(currentPeriodStartDate);
      break;
    case 'month':
      date = nextMonth(currentPeriodStartDate);
      break;
    case 'workWeek':
      date = getDateAfterWorkWeek(currentPeriodStartDate);
      break;
    case 'agenda':
      date = nextAgendaStart(currentPeriodStartDate, agendaDuration);
      break;
  }
  return subMS(date);
};
const getNextPeriodStartDate = (currentPeriodEndDate, step) => {
  let date = addMS(currentPeriodEndDate);
  if (step === 'workWeek') {
    while (isWeekend(date)) {
      date = nextDay(date);
    }
  }
  return date;
};
const getNextIntervalDate = (options, direction) => {
  const {
    date,
    step,
    intervalCount,
    agendaDuration
  } = options;
  let dayDuration;
  // eslint-disable-next-line default-case
  switch (step) {
    case 'day':
      dayDuration = 1 * intervalCount;
      break;
    case 'week':
    case 'workWeek':
      dayDuration = 7 * intervalCount;
      break;
    case 'agenda':
      dayDuration = agendaDuration;
      break;
    case 'month':
      return getNextMonthDate(date, intervalCount, direction);
  }
  return addDateInterval(date, {
    days: dayDuration
  }, direction);
};
exports.getNextIntervalDate = getNextIntervalDate;
const getNextMonthDate = (date, intervalCount, direction) => {
  const currentDate = date.getDate();
  const currentMonthFirstDate = new Date(new Date(date.getTime()).setDate(1));
  const thatMonthFirstDate = new Date(currentMonthFirstDate.setMonth(currentMonthFirstDate.getMonth() + intervalCount * direction));
  const thatMonthDuration = getLastMonthDay(thatMonthFirstDate);
  const minDate = currentDate < thatMonthDuration ? currentDate : thatMonthDuration;
  const currentMonthMinDate = new Date(new Date(date.getTime()).setDate(minDate));
  const thatMonthMinDate = new Date(currentMonthMinDate.setMonth(currentMonthMinDate.getMonth() + intervalCount * direction));
  return thatMonthMinDate;
};
const getDateMonthFormatter = isShort => {
  const monthType = isShort ? 'abbreviated' : 'wide';
  const months = _date.default.getMonthNames(monthType);
  return date => {
    const day = formatDate(date, 'day');
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };
};
const formatMonthYear = date => {
  const months = _date.default.getMonthNames('abbreviated');
  const month = months[date.getMonth()];
  const year = formatDate(date, 'year');
  return `${month} ${year}`;
};
const getDateMonthYearFormatter = isShort => date => {
  const dateMonthFormat = getDateMonthFormatter(isShort);
  const dateMonth = dateMonthFormat(date);
  const year = formatDate(date, 'year');
  return `${dateMonth} ${year}`;
};
const getDifferentYearCaption = (startDate, endDate) => {
  const firstDateText = formatDate(startDate, getDateMonthYearFormatter(true));
  const lastDateDateText = formatDate(endDate, getDateMonthYearFormatter(true));
  return `${firstDateText}-${lastDateDateText}`;
};
const getSameYearCaption = (startDate, endDate, isShort) => {
  const isDifferentMonthDates = startDate.getMonth() !== endDate.getMonth();
  const useShortFormat = isDifferentMonthDates || isShort;
  const firstDateFormat = isDifferentMonthDates ? getDateMonthFormatter(useShortFormat) : DAY_FORMAT;
  const firstDateText = formatDate(startDate, firstDateFormat);
  const lastDateText = formatDate(endDate, getDateMonthYearFormatter(useShortFormat));
  return `${firstDateText}-${lastDateText}`;
};
const getSameDateCaption = (date, step, isShort) => {
  const useShortFormat = step === 'agenda' ? isShort : false;
  const dateMonthFormat = getDateMonthFormatter(useShortFormat);
  const dateMonth = dateMonthFormat(date);
  const year = formatDate(date, 'year');
  return `${dateMonth} ${year}`;
};
const formatCaptionByMonths = (startDate, endDate, isShort) => {
  const isDifferentYears = startDate.getFullYear() !== endDate.getFullYear();
  if (isDifferentYears) {
    return getDifferentYearCaption(startDate, endDate);
  }
  return getSameYearCaption(startDate, endDate, isShort);
};
const formatMonthViewCaption = (startDate, endDate) => {
  if (_date2.default.sameMonth(startDate, endDate)) {
    return String(formatDate(startDate, 'monthandyear') ?? '');
  }
  const isSameYear = _date2.default.sameYear(startDate, endDate);
  const firstDateText = isSameYear ? _date.default.getMonthNames('abbreviated')[startDate.getMonth()] : formatMonthYear(startDate);
  const lastDateText = formatMonthYear(endDate);
  return `${firstDateText}-${lastDateText}`;
};
const getCaptionText = (startDate, endDate, isShort, step) => {
  if (_date2.default.sameDate(startDate, endDate)) {
    return getSameDateCaption(startDate, step, isShort);
  }
  if (step === 'month') {
    return formatMonthViewCaption(startDate, endDate);
  }
  return formatCaptionByMonths(startDate, endDate, isShort);
};
const getCaption = (options, isShort, customizationFunction) => {
  const {
    startDate,
    endDate
  } = getCaptionInterval(options);
  let text = getCaptionText(startDate, endDate, isShort, options.step);
  if ((0, _type.isFunction)(customizationFunction)) {
    text = customizationFunction({
      startDate,
      endDate,
      text
    });
  }
  return {
    startDate,
    endDate,
    text
  };
};
exports.getCaption = getCaption;
const STEP_MAP = {
  day: 'day',
  week: 'week',
  workWeek: 'workWeek',
  month: 'month',
  timelineDay: 'day',
  timelineWeek: 'week',
  timelineWorkWeek: 'workWeek',
  timelineMonth: 'month',
  agenda: 'agenda'
};
const getViewType = view => (0, _type.isObject)(view) ? view.type : view;
exports.getViewType = getViewType;
const getStep = view => {
  const type = getViewType(view);
  return type ? STEP_MAP[type] : undefined;
};
exports.getStep = getStep;
const getViewName = view => {
  if ((0, _type.isObject)(view)) {
    return view.name ?? view.type;
  }
  return view;
};
exports.getViewName = getViewName;
const getViewText = view => {
  if ((0, _type.isObject)(view) && view.name) {
    return view.name;
  }
  const viewName = (0, _inflector.camelize)(getViewType(view), true);
  return _message.default.format(`dxScheduler-switcher${viewName}`);
};
exports.getViewText = getViewText;
const isValidView = view => Boolean(view && Object.values(_constants.VIEWS).includes(view));
const validateViews = function () {
  let views = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  views.forEach(view => {
    const viewType = getViewType(view);
    if (!isValidView(viewType)) {
      _errors.default.log('W0008', viewType);
    }
  });
};
exports.validateViews = validateViews;
const formatViews = function () {
  let views = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  validateViews(views);
  return views.map(view => {
    const text = getViewText(view);
    const type = getViewType(view);
    const name = getViewName(view);
    return {
      text,
      name,
      view: {
        text,
        type,
        name
      }
    };
  });
};
exports.formatViews = formatViews;
const isOneView = (views, selectedView) => views.length === 1 && views[0].name === selectedView;
exports.isOneView = isOneView;
