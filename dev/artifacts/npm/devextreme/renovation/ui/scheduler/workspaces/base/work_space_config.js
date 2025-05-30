/**
* DevExtreme (renovation/ui/scheduler/workspaces/base/work_space_config.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getViewRenderConfigByType = void 0;
var _base = require("../../view_model/to_test/views/utils/base");
var _timeline_week = require("../../view_model/to_test/views/utils/timeline_week");
var _layout = require("../month/date_table/layout");
var _layout2 = require("../timeline/header_panel/layout");
var _layout3 = require("./date_table/layout");
var _layout4 = require("./header_panel/layout");
var _utils = require("./utils");
var _utils2 = require("../utils");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var TIMELINE_CLASS = 'dx-scheduler-timeline';
var verticalViewConfig = {
  headerPanelTemplate: _layout4.HeaderPanelLayout,
  dateTableTemplate: _layout3.DateTableLayoutBase,
  isAllDayPanelSupported: true,
  isProvideVirtualCellsWidth: false,
  isRenderTimePanel: true,
  groupPanelClassName: 'dx-scheduler-work-space-vertical-group-table',
  headerCellTextFormat: _base.formatWeekdayAndDay,
  getDateForHeaderText: _utils.getDateForHeaderText,
  isRenderDateHeader: true,
  isGenerateWeekDaysHeaderData: false,
  isMonthDateHeader: false,
  scrollingDirection: 'vertical',
  className: 'dx-scheduler-work-space-day',
  isCreateCrossScrolling: false,
  defaultGroupOrientation: 'horizontal',
  isUseMonthDateTable: false,
  isUseTimelineHeader: false
};
var timelineViewConfig = {
  headerPanelTemplate: _layout2.TimelineHeaderPanelLayout,
  dateTableTemplate: _layout3.DateTableLayoutBase,
  isAllDayPanelSupported: false,
  isProvideVirtualCellsWidth: true,
  isRenderTimePanel: false,
  groupPanelClassName: 'dx-scheduler-group-table',
  headerCellTextFormat: 'shorttime',
  getDateForHeaderText: _timeline_week.getDateForHeaderText,
  isRenderDateHeader: true,
  isGenerateWeekDaysHeaderData: true,
  scrollingDirection: 'horizontal',
  className: "dx-scheduler-timeline-day ".concat(TIMELINE_CLASS),
  isCreateCrossScrolling: true,
  defaultGroupOrientation: 'vertical',
  isMonthDateHeader: false,
  isUseMonthDateTable: false,
  isUseTimelineHeader: true
};
var getVerticalViewConfig = function getVerticalViewConfig(crossScrollingEnabled) {
  return _extends({}, verticalViewConfig, {
    isCreateCrossScrolling: crossScrollingEnabled
  });
};
var getDayViewConfig = function getDayViewConfig(crossScrollingEnabled, intervalCount) {
  return _extends({}, getVerticalViewConfig(crossScrollingEnabled), {
    isRenderDateHeader: intervalCount > 1
  });
};
var getWeekViewConfig = function getWeekViewConfig(crossScrollingEnabled) {
  return _extends({}, getVerticalViewConfig(crossScrollingEnabled), {
    className: 'dx-scheduler-work-space-week'
  });
};
var getWorkWeekViewConfig = function getWorkWeekViewConfig(crossScrollingEnabled) {
  return _extends({}, getVerticalViewConfig(crossScrollingEnabled), {
    className: 'dx-scheduler-work-space-work-week'
  });
};
var getMonthViewConfig = function getMonthViewConfig(crossScrollingEnabled, _, groups, groupOrientation) {
  return {
    headerPanelTemplate: _layout4.HeaderPanelLayout,
    dateTableTemplate: _layout.MonthDateTableLayout,
    isAllDayPanelSupported: false,
    isProvideVirtualCellsWidth: false,
    isRenderTimePanel: false,
    groupPanelClassName: 'dx-scheduler-work-space-vertical-group-table',
    headerCellTextFormat: _base.formatWeekday,
    getDateForHeaderText: _utils.getDateForHeaderText,
    isRenderDateHeader: true,
    isGenerateWeekDaysHeaderData: false,
    className: 'dx-scheduler-work-space-month',
    scrollingDirection: 'vertical',
    isCreateCrossScrolling: crossScrollingEnabled || (0, _utils2.isVerticalGroupingApplied)(groups, groupOrientation),
    defaultGroupOrientation: 'horizontal',
    isMonthDateHeader: true,
    isUseMonthDateTable: true,
    isUseTimelineHeader: false
  };
};
var getTimelineDayViewConfig = function getTimelineDayViewConfig(_, intervalCount) {
  return _extends({}, timelineViewConfig, {
    isGenerateWeekDaysHeaderData: intervalCount > 1
  });
};
var getTimelineWeekViewConfig = function getTimelineWeekViewConfig() {
  return _extends({}, timelineViewConfig, {
    className: "dx-scheduler-timeline-week ".concat(TIMELINE_CLASS)
  });
};
var getTimelineWorkWeekViewConfig = function getTimelineWorkWeekViewConfig() {
  return _extends({}, timelineViewConfig, {
    className: "dx-scheduler-timeline-work-week ".concat(TIMELINE_CLASS)
  });
};
var getTimelineMonthViewConfig = function getTimelineMonthViewConfig() {
  return _extends({}, timelineViewConfig, {
    className: "dx-scheduler-timeline-month ".concat(TIMELINE_CLASS),
    headerCellTextFormat: _base.formatWeekdayAndDay,
    isGenerateWeekDaysHeaderData: false,
    isMonthDateHeader: true,
    getDateForHeaderText: _utils.getDateForHeaderText
  });
};
var VIEW_CONFIG_GETTERS = {
  day: getDayViewConfig,
  week: getWeekViewConfig,
  workWeek: getWorkWeekViewConfig,
  month: getMonthViewConfig,
  timelineDay: getTimelineDayViewConfig,
  timelineWeek: getTimelineWeekViewConfig,
  timelineWorkWeek: getTimelineWorkWeekViewConfig,
  timelineMonth: getTimelineMonthViewConfig,
  agenda: getWeekViewConfig
};
var getViewRenderConfigByType = function getViewRenderConfigByType(viewType, crossScrollingEnabled, intervalCount, groups, groupOrientation) {
  return VIEW_CONFIG_GETTERS[viewType](crossScrollingEnabled, intervalCount, groups, groupOrientation);
};
exports.getViewRenderConfigByType = getViewRenderConfigByType;
