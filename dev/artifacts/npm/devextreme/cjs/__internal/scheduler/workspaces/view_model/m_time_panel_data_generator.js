/**
* DevExtreme (cjs/__internal/scheduler/workspaces/view_model/m_time_panel_data_generator.js)
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
exports.TimePanelDataGenerator = void 0;
var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _week = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/week");
var _utils = require("../../../../renovation/ui/scheduler/workspaces/utils");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var TimePanelDataGenerator = /*#__PURE__*/function () {
  function TimePanelDataGenerator(_viewDataGenerator) {
    this._viewDataGenerator = _viewDataGenerator;
  }
  var _proto = TimePanelDataGenerator.prototype;
  _proto.getCompleteTimePanelMap = function getCompleteTimePanelMap(options, completeViewDataMap) {
    var startViewDate = options.startViewDate,
      cellDuration = options.cellDuration,
      startDayHour = options.startDayHour,
      isVerticalGrouping = options.isVerticalGrouping,
      intervalCount = options.intervalCount,
      currentDate = options.currentDate,
      viewType = options.viewType,
      hoursInterval = options.hoursInterval,
      endDayHour = options.endDayHour;
    var rowCountInGroup = this._viewDataGenerator.getRowCount({
      intervalCount,
      currentDate,
      viewType,
      hoursInterval,
      startDayHour,
      endDayHour
    });
    var cellCountInGroupRow = this._viewDataGenerator.getCellCount({
      intervalCount,
      currentDate,
      viewType,
      hoursInterval,
      startDayHour,
      endDayHour
    });
    var allDayRowsCount = 0;
    return completeViewDataMap.map(function (row, index) {
      var _a = row[0],
        allDay = _a.allDay,
        startDate = _a.startDate,
        endDate = _a.endDate,
        groups = _a.groups,
        groupIndex = _a.groupIndex,
        isFirstGroupCell = _a.isFirstGroupCell,
        isLastGroupCell = _a.isLastGroupCell,
        cellIndex = _a.index,
        restCellProps = __rest(_a, ["allDay", "startDate", "endDate", "groups", "groupIndex", "isFirstGroupCell", "isLastGroupCell", "index"]);
      if (allDay) {
        allDayRowsCount += 1;
      }
      var timeIndex = (index - allDayRowsCount) % rowCountInGroup;
      return _extends(_extends({}, restCellProps), {
        startDate,
        allDay,
        text: (0, _week.getTimePanelCellText)(timeIndex, startDate, startViewDate, cellDuration, startDayHour),
        groups: isVerticalGrouping ? groups : undefined,
        groupIndex: isVerticalGrouping ? groupIndex : undefined,
        isFirstGroupCell: isVerticalGrouping && isFirstGroupCell,
        isLastGroupCell: isVerticalGrouping && isLastGroupCell,
        index: Math.floor(cellIndex / cellCountInGroupRow)
      });
    });
  };
  _proto.generateTimePanelData = function generateTimePanelData(completeTimePanelMap, options) {
    var startRowIndex = options.startRowIndex,
      rowCount = options.rowCount,
      topVirtualRowHeight = options.topVirtualRowHeight,
      bottomVirtualRowHeight = options.bottomVirtualRowHeight,
      isGroupedAllDayPanel = options.isGroupedAllDayPanel,
      isVerticalGrouping = options.isVerticalGrouping,
      isAllDayPanelVisible = options.isAllDayPanelVisible;
    var indexDifference = isVerticalGrouping || !isAllDayPanelVisible ? 0 : 1;
    var correctedStartRowIndex = startRowIndex + indexDifference;
    var displayedRowCount = (0, _base.getDisplayedRowCount)(rowCount, completeTimePanelMap);
    var timePanelMap = completeTimePanelMap.slice(correctedStartRowIndex, correctedStartRowIndex + displayedRowCount);
    var timePanelData = {
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      isGroupedAllDayPanel
    };
    var _this$_generateTimePa = this._generateTimePanelDataFromMap(timePanelMap, isVerticalGrouping),
      groupedData = _this$_generateTimePa.previousGroupedData;
    timePanelData.groupedData = groupedData;
    return timePanelData;
  };
  _proto._generateTimePanelDataFromMap = function _generateTimePanelDataFromMap(timePanelMap, isVerticalGrouping) {
    return timePanelMap.reduce(function (_ref, cellData) {
      var previousGroupIndex = _ref.previousGroupIndex,
        previousGroupedData = _ref.previousGroupedData;
      var currentGroupIndex = cellData.groupIndex;
      if (currentGroupIndex !== previousGroupIndex) {
        previousGroupedData.push({
          dateTable: [],
          isGroupedAllDayPanel: (0, _utils.getIsGroupedAllDayPanel)(!!cellData.allDay, isVerticalGrouping),
          groupIndex: currentGroupIndex,
          key: (0, _utils.getKeyByGroup)(currentGroupIndex, isVerticalGrouping)
        });
      }
      if (cellData.allDay) {
        previousGroupedData[previousGroupedData.length - 1].allDayPanel = cellData;
      } else {
        previousGroupedData[previousGroupedData.length - 1].dateTable.push(cellData);
      }
      return {
        previousGroupIndex: currentGroupIndex,
        previousGroupedData
      };
    }, {
      previousGroupIndex: -1,
      previousGroupedData: []
    });
  };
  return TimePanelDataGenerator;
}();
exports.TimePanelDataGenerator = TimePanelDataGenerator;
