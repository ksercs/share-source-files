"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValidStartDate = exports.getTimePanelCellText = exports.getIntervalDuration = exports.calculateViewStartDate = exports.calculateStartViewDate = void 0;
var _date = _interopRequireDefault(require("../../../../common/core/localization/date"));
var _date2 = _interopRequireDefault(require("../../../../core/utils/date"));
var _base = require("./base");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// T410490: incorrectly displaying time slots on Linux
const getTimePanelCellText = (rowIndex, date, startViewDate, cellDuration, startDayHour, viewOffset) => {
  if (rowIndex % 2 !== 0) {
    return '';
  }
  const validTimeDate = (0, _base.getValidCellDateForLocalTimeFormat)(date, {
    startViewDate,
    startDayHour,
    cellIndexShift: Math.round(cellDuration) * rowIndex,
    viewOffset
  });
  return _date.default.format(validTimeDate, 'shorttime');
};
exports.getTimePanelCellText = getTimePanelCellText;
const getIntervalDuration = intervalCount => _date2.default.dateToMilliseconds('day') * 7 * intervalCount;
exports.getIntervalDuration = getIntervalDuration;
const getValidStartDate = (startDate, firstDayOfWeek) => startDate ? _date2.default.getFirstWeekDate(startDate, firstDayOfWeek) : undefined;
exports.getValidStartDate = getValidStartDate;
const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeekOption) => {
  const firstDayOfWeek = (0, _base.getCalculatedFirstDayOfWeek)(firstDayOfWeekOption);
  const viewStart = (0, _base.getViewStartByOptions)(startDate, currentDate, intervalDuration, getValidStartDate(startDate, firstDayOfWeek));
  const firstViewDate = _date2.default.getFirstWeekDate(viewStart, firstDayOfWeek);
  return (0, _base.setOptionHour)(firstViewDate, startDayHour);
};
exports.calculateStartViewDate = calculateStartViewDate;
const calculateViewStartDate = (startDateOption, firstDayOfWeek) => {
  const validFirstDayOfWeek = firstDayOfWeek ?? _date.default.firstDayOfWeekIndex();
  return _date2.default.getFirstWeekDate(startDateOption, validFirstDayOfWeek);
};
exports.calculateViewStartDate = calculateViewStartDate;