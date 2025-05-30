/**
* DevExtreme (bundles/__internal/scheduler/workspaces/view_model/m_view_data_generator_timeline_month.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewDataGeneratorTimelineMonth = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _month = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/month");
var _timeline_month = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/timeline_month");
var _m_view_data_generator = require("./m_view_data_generator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var DAY_IN_MILLISECONDS = _date.default.dateToMilliseconds('day');
var ViewDataGeneratorTimelineMonth = /*#__PURE__*/function (_ViewDataGenerator) {
  _inheritsLoose(ViewDataGeneratorTimelineMonth, _ViewDataGenerator);
  function ViewDataGeneratorTimelineMonth() {
    return _ViewDataGenerator.apply(this, arguments) || this;
  }
  var _proto = ViewDataGeneratorTimelineMonth.prototype;
  _proto._calculateCellIndex = function _calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount) {
    return (0, _month.calculateCellIndex)(rowIndex, columnIndex, rowCount, columnCount);
  };
  _proto.calculateEndDate = function calculateEndDate(startDate, interval, endDayHour) {
    return (0, _base.setOptionHour)(startDate, endDayHour);
  };
  _proto.getInterval = function getInterval() {
    return DAY_IN_MILLISECONDS;
  };
  _proto._calculateStartViewDate = function _calculateStartViewDate(options) {
    return (0, _timeline_month.calculateStartViewDate)(options.currentDate, options.startDayHour, options.startDate, options.intervalCount);
  };
  _proto.getCellCount = function getCellCount(options) {
    var intervalCount = options.intervalCount,
      currentDate = options.currentDate;
    var cellCount = 0;
    for (var i = 1; i <= intervalCount; i++) {
      cellCount += new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 0).getDate();
    }
    return cellCount;
  };
  _proto.setHiddenInterval = function setHiddenInterval() {
    this.hiddenInterval = 0;
  };
  return ViewDataGeneratorTimelineMonth;
}(_m_view_data_generator.ViewDataGenerator);
exports.ViewDataGeneratorTimelineMonth = ViewDataGeneratorTimelineMonth;
