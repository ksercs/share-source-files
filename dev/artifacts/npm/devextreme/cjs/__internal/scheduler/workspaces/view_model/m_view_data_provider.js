/**
* DevExtreme (cjs/__internal/scheduler/workspaces/view_model/m_view_data_provider.js)
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
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _utils = require("../../../../renovation/ui/scheduler/view_model/group_panel/utils");
var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _utils2 = require("../../../../renovation/ui/scheduler/workspaces/utils");
var _m_utils_time_zone = _interopRequireDefault(require("../../m_utils_time_zone"));
var _m_date_header_data_generator = require("./m_date_header_data_generator");
var _m_grouped_data_map_provider = require("./m_grouped_data_map_provider");
var _m_time_panel_data_generator = require("./m_time_panel_data_generator");
var _m_utils = require("./m_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var ViewDataProvider = /*#__PURE__*/function () {
  function ViewDataProvider(viewType) {
    this.viewDataGenerator = (0, _m_utils.getViewDataGeneratorByViewType)(viewType);
    this.viewData = {};
    this.completeViewDataMap = [];
    this.completeDateHeaderMap = [];
    this.viewDataMap = {};
    this._groupedDataMapProvider = null;
  }
  var _proto = ViewDataProvider.prototype;
  _proto.isSkippedDate = function isSkippedDate(date) {
    return this.viewDataGenerator.isSkippedDate(date);
  };
  _proto.update = function update(options, isGenerateNewViewData) {
    this.viewDataGenerator = (0, _m_utils.getViewDataGeneratorByViewType)(options.viewType);
    var viewDataGenerator = this.viewDataGenerator;
    var dateHeaderDataGenerator = new _m_date_header_data_generator.DateHeaderDataGenerator(viewDataGenerator);
    var timePanelDataGenerator = new _m_time_panel_data_generator.TimePanelDataGenerator(viewDataGenerator);
    var renderOptions = this._transformRenderOptions(options);
    renderOptions.interval = this.viewDataGenerator.getInterval(renderOptions.hoursInterval);
    this._options = renderOptions;
    if (isGenerateNewViewData) {
      this.completeViewDataMap = viewDataGenerator.getCompleteViewDataMap(renderOptions);
      this.completeDateHeaderMap = dateHeaderDataGenerator.getCompleteDateHeaderMap(renderOptions, this.completeViewDataMap);
      if (renderOptions.isGenerateTimePanelData) {
        this.completeTimePanelMap = timePanelDataGenerator.getCompleteTimePanelMap(renderOptions, this.completeViewDataMap);
      }
    }
    this.viewDataMap = viewDataGenerator.generateViewDataMap(this.completeViewDataMap, renderOptions);
    this.updateViewData(renderOptions);
    this._groupedDataMapProvider = new _m_grouped_data_map_provider.GroupedDataMapProvider(this.viewDataGenerator, this.viewDataMap, this.completeViewDataMap, {
      isVerticalGrouping: renderOptions.isVerticalGrouping,
      viewType: renderOptions.viewType
    });
    this.dateHeaderData = dateHeaderDataGenerator.generateDateHeaderData(this.completeDateHeaderMap, this.completeViewDataMap, renderOptions);
    if (renderOptions.isGenerateTimePanelData) {
      this.timePanelData = timePanelDataGenerator.generateTimePanelData(this.completeTimePanelMap, renderOptions);
    }
  };
  _proto.createGroupedDataMapProvider = function createGroupedDataMapProvider() {
    this._groupedDataMapProvider = new _m_grouped_data_map_provider.GroupedDataMapProvider(this.viewDataGenerator, this.viewDataMap, this.completeViewDataMap, {
      isVerticalGrouping: this._options.isVerticalGrouping,
      viewType: this._options.viewType
    });
  };
  _proto.updateViewData = function updateViewData(options) {
    var renderOptions = this._transformRenderOptions(options);
    this.viewDataMapWithSelection = this.viewDataGenerator.markSelectedAndFocusedCells(this.viewDataMap, renderOptions);
    this.viewData = this.viewDataGenerator.getViewDataFromMap(this.completeViewDataMap, this.viewDataMapWithSelection, renderOptions);
  };
  _proto._transformRenderOptions = function _transformRenderOptions(renderOptions) {
    var groups = renderOptions.groups,
      groupOrientation = renderOptions.groupOrientation,
      groupByDate = renderOptions.groupByDate,
      isAllDayPanelVisible = renderOptions.isAllDayPanelVisible,
      restOptions = __rest(renderOptions, ["groups", "groupOrientation", "groupByDate", "isAllDayPanelVisible"]);
    return _extends(_extends({}, restOptions), {
      startViewDate: this.viewDataGenerator._calculateStartViewDate(renderOptions),
      isVerticalGrouping: (0, _utils2.isVerticalGroupingApplied)(groups, groupOrientation),
      isHorizontalGrouping: (0, _utils2.isHorizontalGroupingApplied)(groups, groupOrientation),
      isGroupedByDate: (0, _utils2.isGroupingByDate)(groups, groupOrientation, groupByDate),
      isGroupedAllDayPanel: (0, _base.calculateIsGroupedAllDayPanel)(groups, groupOrientation, isAllDayPanelVisible),
      groups,
      groupOrientation,
      isAllDayPanelVisible
    });
  };
  _proto.getGroupPanelData = function getGroupPanelData(options) {
    var renderOptions = this._transformRenderOptions(options);
    if (renderOptions.groups.length > 0) {
      var cellCount = this.getCellCount(renderOptions);
      return (0, _utils.getGroupPanelData)(renderOptions.groups, cellCount, renderOptions.isGroupedByDate, renderOptions.isGroupedByDate ? 1 : cellCount);
    }
    return undefined;
  };
  _proto.getGroupStartDate = function getGroupStartDate(groupIndex) {
    return this._groupedDataMapProvider.getGroupStartDate(groupIndex);
  };
  _proto.getGroupEndDate = function getGroupEndDate(groupIndex) {
    return this._groupedDataMapProvider.getGroupEndDate(groupIndex);
  };
  _proto.findGroupCellStartDate = function findGroupCellStartDate(groupIndex, startDate, endDate) {
    var isFindByDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    return this._groupedDataMapProvider.findGroupCellStartDate(groupIndex, startDate, endDate, isFindByDate);
  };
  _proto.findAllDayGroupCellStartDate = function findAllDayGroupCellStartDate(groupIndex, startDate) {
    return this._groupedDataMapProvider.findAllDayGroupCellStartDate(groupIndex, startDate);
  };
  _proto.findCellPositionInMap = function findCellPositionInMap(cellInfo) {
    return this._groupedDataMapProvider.findCellPositionInMap(cellInfo);
  };
  _proto.hasAllDayPanel = function hasAllDayPanel() {
    var viewData = this.viewDataMap.viewData;
    var allDayPanel = viewData.groupedData[0].allDayPanel;
    return !viewData.isGroupedAllDayPanel && (allDayPanel === null || allDayPanel === void 0 ? void 0 : allDayPanel.length) > 0;
  };
  _proto.getCellsGroup = function getCellsGroup(groupIndex) {
    return this._groupedDataMapProvider.getCellsGroup(groupIndex);
  };
  _proto.getCompletedGroupsInfo = function getCompletedGroupsInfo() {
    return this._groupedDataMapProvider.getCompletedGroupsInfo();
  };
  _proto.getGroupIndices = function getGroupIndices() {
    return this._groupedDataMapProvider.getGroupIndices();
  };
  _proto.getLastGroupCellPosition = function getLastGroupCellPosition(groupIndex) {
    return this._groupedDataMapProvider.getLastGroupCellPosition(groupIndex);
  };
  _proto.getRowCountInGroup = function getRowCountInGroup(groupIndex) {
    return this._groupedDataMapProvider.getRowCountInGroup(groupIndex);
  };
  _proto.getCellData = function getCellData(rowIndex, columnIndex, isAllDay, rtlEnabled) {
    var row = isAllDay && !this._options.isVerticalGrouping ? this.viewDataMap.allDayPanelMap : this.viewDataMap.dateTableMap[rowIndex];
    var actualColumnIndex = !rtlEnabled ? columnIndex : row.length - 1 - columnIndex;
    var cellData = row[actualColumnIndex].cellData;
    return cellData;
  };
  _proto.getCellsByGroupIndexAndAllDay = function getCellsByGroupIndexAndAllDay(groupIndex, allDay) {
    var rowsPerGroup = this._getRowCountWithAllDayRows();
    var isShowAllDayPanel = this._options.isAllDayPanelVisible;
    var firstRowInGroup = this._options.isVerticalGrouping ? groupIndex * rowsPerGroup : 0;
    var lastRowInGroup = this._options.isVerticalGrouping ? (groupIndex + 1) * rowsPerGroup - 1 : rowsPerGroup;
    var correctedFirstRow = isShowAllDayPanel && !allDay ? firstRowInGroup + 1 : firstRowInGroup;
    var correctedLastRow = allDay ? correctedFirstRow : lastRowInGroup;
    return this.completeViewDataMap.slice(correctedFirstRow, correctedLastRow + 1).map(function (row) {
      return row.filter(function (_ref) {
        var currentGroupIndex = _ref.groupIndex;
        return groupIndex === currentGroupIndex;
      });
    });
  };
  _proto.getCellCountWithGroup = function getCellCountWithGroup(groupIndex) {
    var rowIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
    return dateTableGroupedMap.filter(function (_, index) {
      return index <= groupIndex;
    }).reduce(function (previous, row) {
      return previous + row[rowIndex].length;
    }, 0);
  };
  _proto.hasGroupAllDayPanel = function hasGroupAllDayPanel(groupIndex) {
    var _a, _b;
    if (this._options.isVerticalGrouping) {
      return !!((_a = this.groupedDataMap.dateTableGroupedMap[groupIndex]) === null || _a === void 0 ? void 0 : _a[0][0].cellData.allDay);
    }
    return ((_b = this.groupedDataMap.allDayPanelGroupedMap[groupIndex]) === null || _b === void 0 ? void 0 : _b.length) > 0;
  };
  _proto.isGroupIntersectDateInterval = function isGroupIntersectDateInterval(groupIndex, startDate, endDate) {
    var groupStartDate = this.getGroupStartDate(groupIndex);
    var groupEndDate = this.getGroupEndDate(groupIndex);
    return startDate < groupEndDate && endDate > groupStartDate;
  };
  _proto.findGlobalCellPosition = function findGlobalCellPosition(date) {
    var groupIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var completeViewDataMap = this.completeViewDataMap;
    var showAllDayPanel = this._options.isAllDayPanelVisible;
    for (var rowIndex = 0; rowIndex < completeViewDataMap.length; rowIndex += 1) {
      var currentRow = completeViewDataMap[rowIndex];
      for (var columnIndex = 0; columnIndex < currentRow.length; columnIndex += 1) {
        var cellData = currentRow[columnIndex];
        var currentStartDate = cellData.startDate,
          currentEndDate = cellData.endDate,
          currentGroupIndex = cellData.groupIndex,
          currentAllDay = cellData.allDay;
        if (groupIndex === currentGroupIndex && allDay === !!currentAllDay && this._compareDatesAndAllDay(date, currentStartDate, currentEndDate, allDay)) {
          return {
            position: {
              columnIndex,
              rowIndex: showAllDayPanel && !this._options.isVerticalGrouping ? rowIndex - 1 : rowIndex
            },
            cellData
          };
        }
      }
    }
    return undefined;
  };
  _proto._compareDatesAndAllDay = function _compareDatesAndAllDay(date, cellStartDate, cellEndDate, allDay) {
    var time = date.getTime();
    var trimmedTime = _date.default.trimTime(date).getTime();
    var cellStartTime = cellStartDate.getTime();
    var cellEndTime = cellEndDate.getTime();
    return !allDay && time >= cellStartTime && time < cellEndTime || allDay && trimmedTime === cellStartTime;
  };
  _proto.getSkippedDaysCount = function getSkippedDaysCount(groupIndex, startDate, endDate, daysCount) {
    var dateTableGroupedMap = this._groupedDataMapProvider.groupedDataMap.dateTableGroupedMap;
    var groupedData = dateTableGroupedMap[groupIndex];
    var includedDays = 0;
    for (var rowIndex = 0; rowIndex < groupedData.length; rowIndex += 1) {
      for (var columnIndex = 0; columnIndex < groupedData[rowIndex].length; columnIndex += 1) {
        var cell = groupedData[rowIndex][columnIndex].cellData;
        if (startDate.getTime() < cell.endDate.getTime() && endDate.getTime() > cell.startDate.getTime()) {
          includedDays += 1;
        }
      }
    }
    var lastCell = groupedData[groupedData.length - 1][groupedData[0].length - 1].cellData;
    var lastCellStart = _date.default.trimTime(lastCell.startDate);
    var daysAfterView = Math.floor((endDate.getTime() - lastCellStart.getTime()) / _date.default.dateToMilliseconds('day'));
    var deltaDays = daysAfterView > 0 ? daysAfterView : 0;
    return daysCount - includedDays - deltaDays;
  };
  _proto.getColumnsCount = function getColumnsCount() {
    var dateTableMap = this.viewDataMap.dateTableMap;
    return dateTableMap ? dateTableMap[0].length : 0;
  };
  _proto.getViewEdgeIndices = function getViewEdgeIndices(isAllDayPanel) {
    if (isAllDayPanel) {
      return {
        firstColumnIndex: 0,
        lastColumnIndex: this.viewDataMap.allDayPanelMap.length - 1,
        firstRowIndex: 0,
        lastRowIndex: 0
      };
    }
    return {
      firstColumnIndex: 0,
      lastColumnIndex: this.viewDataMap.dateTableMap[0].length - 1,
      firstRowIndex: 0,
      lastRowIndex: this.viewDataMap.dateTableMap.length - 1
    };
  };
  _proto.getGroupEdgeIndices = function getGroupEdgeIndices(groupIndex, isAllDay) {
    var groupedDataMap = this.groupedDataMap.dateTableGroupedMap[groupIndex];
    var cellsCount = groupedDataMap[0].length;
    var rowsCount = groupedDataMap.length;
    var firstColumnIndex = groupedDataMap[0][0].position.columnIndex;
    var lastColumnIndex = groupedDataMap[0][cellsCount - 1].position.columnIndex;
    if (isAllDay) {
      return {
        firstColumnIndex,
        lastColumnIndex,
        firstRowIndex: 0,
        lastRowIndex: 0
      };
    }
    return {
      firstColumnIndex,
      lastColumnIndex,
      firstRowIndex: groupedDataMap[0][0].position.rowIndex,
      lastRowIndex: groupedDataMap[rowsCount - 1][0].position.rowIndex
    };
  };
  _proto.isSameCell = function isSameCell(firstCellData, secondCellData) {
    var firstStartDate = firstCellData.startDate,
      firstGroupIndex = firstCellData.groupIndex,
      firstAllDay = firstCellData.allDay,
      firstIndex = firstCellData.index;
    var secondStartDate = secondCellData.startDate,
      secondGroupIndex = secondCellData.groupIndex,
      secondAllDay = secondCellData.allDay,
      secondIndex = secondCellData.index;
    return firstStartDate.getTime() === secondStartDate.getTime() && firstGroupIndex === secondGroupIndex && firstAllDay === secondAllDay && firstIndex === secondIndex;
  };
  _proto.getLastViewDate = function getLastViewDate() {
    var completeViewDataMap = this.completeViewDataMap;
    var rowsCount = completeViewDataMap.length - 1;
    return completeViewDataMap[rowsCount][completeViewDataMap[rowsCount].length - 1].endDate;
  };
  _proto.getStartViewDate = function getStartViewDate() {
    return this._options.startViewDate;
  };
  _proto.getIntervalDuration = function getIntervalDuration(intervalCount) {
    return this.viewDataGenerator._getIntervalDuration(intervalCount);
  };
  _proto.getLastCellEndDate = function getLastCellEndDate() {
    return new Date(this.getLastViewDate().getTime() - _date.default.dateToMilliseconds('minute'));
  };
  _proto.getLastViewDateByEndDayHour = function getLastViewDateByEndDayHour(endDayHour) {
    var lastCellEndDate = this.getLastCellEndDate();
    var endTime = _date.default.dateTimeFromDecimal(endDayHour);
    var endDateOfLastViewCell = new Date(lastCellEndDate.setHours(endTime.hours, endTime.minutes));
    return this._adjustEndDateByDaylightDiff(lastCellEndDate, endDateOfLastViewCell);
  };
  _proto._adjustEndDateByDaylightDiff = function _adjustEndDateByDaylightDiff(startDate, endDate) {
    var daylightDiff = _m_utils_time_zone.default.getDaylightOffsetInMs(startDate, endDate);
    var endDateOfLastViewCell = new Date(endDate.getTime() - daylightDiff);
    return new Date(endDateOfLastViewCell.getTime() - _date.default.dateToMilliseconds('minute'));
  };
  _proto.getCellCountInDay = function getCellCountInDay(startDayHour, endDayHour, hoursInterval) {
    return this.viewDataGenerator.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
  };
  _proto.getCellCount = function getCellCount(options) {
    return this.viewDataGenerator.getCellCount(options);
  };
  _proto.getRowCount = function getRowCount(options) {
    return this.viewDataGenerator.getRowCount(options);
  };
  _proto.getVisibleDayDuration = function getVisibleDayDuration(startDayHour, endDayHour, hoursInterval) {
    return this.viewDataGenerator.getVisibleDayDuration(startDayHour, endDayHour, hoursInterval);
  };
  _proto._getRowCountWithAllDayRows = function _getRowCountWithAllDayRows() {
    var allDayRowCount = this._options.isAllDayPanelVisible ? 1 : 0;
    return this.getRowCount(this._options) + allDayRowCount;
  };
  _proto.getFirstDayOfWeek = function getFirstDayOfWeek(firstDayOfWeekOption) {
    return this.viewDataGenerator.getFirstDayOfWeek(firstDayOfWeekOption);
  };
  _proto.setViewOptions = function setViewOptions(options) {
    this._options = this._transformRenderOptions(options);
  };
  _proto.getViewOptions = function getViewOptions() {
    return this._options;
  };
  _proto.getViewPortGroupCount = function getViewPortGroupCount() {
    var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
    return (dateTableGroupedMap === null || dateTableGroupedMap === void 0 ? void 0 : dateTableGroupedMap.length) || 0;
  };
  _createClass(ViewDataProvider, [{
    key: "groupedDataMap",
    get: function get() {
      return this._groupedDataMapProvider.groupedDataMap;
    }
  }, {
    key: "hiddenInterval",
    get: function get() {
      return this.viewDataGenerator.hiddenInterval;
    }
  }]);
  return ViewDataProvider;
}();
exports.default = ViewDataProvider;
