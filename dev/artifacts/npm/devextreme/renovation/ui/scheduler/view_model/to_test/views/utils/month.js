/**
* DevExtreme (renovation/ui/scheduler/view_model/to_test/views/utils/month.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.isFirstCellInMonthWithIntervalCount = exports.getViewStartByOptions = exports.getCellText = exports.calculateStartViewDate = exports.calculateCellIndex = void 0;
var _date = _interopRequireDefault(require("../../../../../../../core/utils/date"));
var _date2 = _interopRequireDefault(require("../../../../../../../localization/date"));
var _base = require("./base");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var getViewStartByOptions = function getViewStartByOptions(startDate, currentDate, intervalCount, startViewDate) {
  if (!startDate) {
    return new Date(currentDate);
  }
  var currentStartDate = new Date(startViewDate);
  var validStartViewDate = new Date(startViewDate);
  var diff = currentStartDate.getTime() <= currentDate.getTime() ? 1 : -1;
  var endDate = new Date(new Date(validStartViewDate.setMonth(validStartViewDate.getMonth() + diff * intervalCount)));
  while (!(0, _base.isDateInRange)(currentDate, currentStartDate, endDate, diff)) {
    currentStartDate = new Date(endDate);
    if (diff > 0) {
      currentStartDate.setDate(1);
    }
    endDate = new Date(new Date(endDate.setMonth(endDate.getMonth() + diff * intervalCount)));
  }
  return diff > 0 ? currentStartDate : endDate;
};
exports.getViewStartByOptions = getViewStartByOptions;
var calculateStartViewDate = function calculateStartViewDate(currentDate, startDayHour, startDate, intervalCount, firstDayOfWeekOption) {
  var viewStart = getViewStartByOptions(startDate, currentDate, intervalCount, _date.default.getFirstMonthDate(startDate));
  var firstMonthDate = _date.default.getFirstMonthDate(viewStart);
  var firstDayOfWeek = (0, _base.getCalculatedFirstDayOfWeek)(firstDayOfWeekOption);
  var firstViewDate = _date.default.getFirstWeekDate(firstMonthDate, firstDayOfWeek);
  return (0, _base.setOptionHour)(firstViewDate, startDayHour);
};
exports.calculateStartViewDate = calculateStartViewDate;
var calculateCellIndex = function calculateCellIndex(rowIndex, columnIndex, _, columnCount) {
  return rowIndex * columnCount + columnIndex;
};
exports.calculateCellIndex = calculateCellIndex;
var isFirstCellInMonthWithIntervalCount = function isFirstCellInMonthWithIntervalCount(cellDate, intervalCount) {
  return cellDate.getDate() === 1 && intervalCount > 1;
};
exports.isFirstCellInMonthWithIntervalCount = isFirstCellInMonthWithIntervalCount;
var getCellText = function getCellText(date, intervalCount) {
  if (isFirstCellInMonthWithIntervalCount(date, intervalCount)) {
    var monthName = _date2.default.getMonthNames('abbreviated')[date.getMonth()];
    return [monthName, _date2.default.format(date, 'day')].join(' ');
  }
  return _date2.default.format(date, 'dd');
};
exports.getCellText = getCellText;
