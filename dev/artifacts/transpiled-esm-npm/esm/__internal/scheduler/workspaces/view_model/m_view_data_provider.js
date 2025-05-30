import _extends from "@babel/runtime/helpers/esm/extends";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import dateUtils from '../../../../core/utils/date';
import { getGroupPanelData } from '../../../../renovation/ui/scheduler/view_model/group_panel/utils';
import { calculateIsGroupedAllDayPanel } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import { isGroupingByDate, isHorizontalGroupingApplied, isVerticalGroupingApplied } from '../../../../renovation/ui/scheduler/workspaces/utils';
import timeZoneUtils from '../../m_utils_time_zone';
import { DateHeaderDataGenerator } from './m_date_header_data_generator';
import { GroupedDataMapProvider } from './m_grouped_data_map_provider';
import { TimePanelDataGenerator } from './m_time_panel_data_generator';
import { getViewDataGeneratorByViewType } from './m_utils';
export default class ViewDataProvider {
  constructor(viewType) {
    this.viewDataGenerator = getViewDataGeneratorByViewType(viewType);
    this.viewData = {};
    this.completeViewDataMap = [];
    this.completeDateHeaderMap = [];
    this.viewDataMap = {};
    this._groupedDataMapProvider = null;
  }
  get groupedDataMap() {
    return this._groupedDataMapProvider.groupedDataMap;
  }
  get hiddenInterval() {
    return this.viewDataGenerator.hiddenInterval;
  }
  isSkippedDate(date) {
    return this.viewDataGenerator.isSkippedDate(date);
  }
  update(options, isGenerateNewViewData) {
    this.viewDataGenerator = getViewDataGeneratorByViewType(options.viewType);
    var {
      viewDataGenerator
    } = this;
    var dateHeaderDataGenerator = new DateHeaderDataGenerator(viewDataGenerator);
    var timePanelDataGenerator = new TimePanelDataGenerator(viewDataGenerator);
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
    this._groupedDataMapProvider = new GroupedDataMapProvider(this.viewDataGenerator, this.viewDataMap, this.completeViewDataMap, {
      isVerticalGrouping: renderOptions.isVerticalGrouping,
      viewType: renderOptions.viewType
    });
    this.dateHeaderData = dateHeaderDataGenerator.generateDateHeaderData(this.completeDateHeaderMap, this.completeViewDataMap, renderOptions);
    if (renderOptions.isGenerateTimePanelData) {
      this.timePanelData = timePanelDataGenerator.generateTimePanelData(this.completeTimePanelMap, renderOptions);
    }
  }
  createGroupedDataMapProvider() {
    this._groupedDataMapProvider = new GroupedDataMapProvider(this.viewDataGenerator, this.viewDataMap, this.completeViewDataMap, {
      isVerticalGrouping: this._options.isVerticalGrouping,
      viewType: this._options.viewType
    });
  }
  updateViewData(options) {
    var renderOptions = this._transformRenderOptions(options);
    this.viewDataMapWithSelection = this.viewDataGenerator.markSelectedAndFocusedCells(this.viewDataMap, renderOptions);
    this.viewData = this.viewDataGenerator.getViewDataFromMap(this.completeViewDataMap, this.viewDataMapWithSelection, renderOptions);
  }
  _transformRenderOptions(renderOptions) {
    var {
        groups,
        groupOrientation,
        groupByDate,
        isAllDayPanelVisible
      } = renderOptions,
      restOptions = __rest(renderOptions, ["groups", "groupOrientation", "groupByDate", "isAllDayPanelVisible"]);
    return _extends(_extends({}, restOptions), {
      startViewDate: this.viewDataGenerator._calculateStartViewDate(renderOptions),
      isVerticalGrouping: isVerticalGroupingApplied(groups, groupOrientation),
      isHorizontalGrouping: isHorizontalGroupingApplied(groups, groupOrientation),
      isGroupedByDate: isGroupingByDate(groups, groupOrientation, groupByDate),
      isGroupedAllDayPanel: calculateIsGroupedAllDayPanel(groups, groupOrientation, isAllDayPanelVisible),
      groups,
      groupOrientation,
      isAllDayPanelVisible
    });
  }
  getGroupPanelData(options) {
    var renderOptions = this._transformRenderOptions(options);
    if (renderOptions.groups.length > 0) {
      var cellCount = this.getCellCount(renderOptions);
      return getGroupPanelData(renderOptions.groups, cellCount, renderOptions.isGroupedByDate, renderOptions.isGroupedByDate ? 1 : cellCount);
    }
    return undefined;
  }
  getGroupStartDate(groupIndex) {
    return this._groupedDataMapProvider.getGroupStartDate(groupIndex);
  }
  getGroupEndDate(groupIndex) {
    return this._groupedDataMapProvider.getGroupEndDate(groupIndex);
  }
  findGroupCellStartDate(groupIndex, startDate, endDate) {
    var isFindByDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    return this._groupedDataMapProvider.findGroupCellStartDate(groupIndex, startDate, endDate, isFindByDate);
  }
  findAllDayGroupCellStartDate(groupIndex, startDate) {
    return this._groupedDataMapProvider.findAllDayGroupCellStartDate(groupIndex, startDate);
  }
  findCellPositionInMap(cellInfo) {
    return this._groupedDataMapProvider.findCellPositionInMap(cellInfo);
  }
  hasAllDayPanel() {
    var {
      viewData
    } = this.viewDataMap;
    var {
      allDayPanel
    } = viewData.groupedData[0];
    return !viewData.isGroupedAllDayPanel && (allDayPanel === null || allDayPanel === void 0 ? void 0 : allDayPanel.length) > 0;
  }
  getCellsGroup(groupIndex) {
    return this._groupedDataMapProvider.getCellsGroup(groupIndex);
  }
  getCompletedGroupsInfo() {
    return this._groupedDataMapProvider.getCompletedGroupsInfo();
  }
  getGroupIndices() {
    return this._groupedDataMapProvider.getGroupIndices();
  }
  getLastGroupCellPosition(groupIndex) {
    return this._groupedDataMapProvider.getLastGroupCellPosition(groupIndex);
  }
  getRowCountInGroup(groupIndex) {
    return this._groupedDataMapProvider.getRowCountInGroup(groupIndex);
  }
  getCellData(rowIndex, columnIndex, isAllDay, rtlEnabled) {
    var row = isAllDay && !this._options.isVerticalGrouping ? this.viewDataMap.allDayPanelMap : this.viewDataMap.dateTableMap[rowIndex];
    var actualColumnIndex = !rtlEnabled ? columnIndex : row.length - 1 - columnIndex;
    var {
      cellData
    } = row[actualColumnIndex];
    return cellData;
  }
  getCellsByGroupIndexAndAllDay(groupIndex, allDay) {
    var rowsPerGroup = this._getRowCountWithAllDayRows();
    var isShowAllDayPanel = this._options.isAllDayPanelVisible;
    var firstRowInGroup = this._options.isVerticalGrouping ? groupIndex * rowsPerGroup : 0;
    var lastRowInGroup = this._options.isVerticalGrouping ? (groupIndex + 1) * rowsPerGroup - 1 : rowsPerGroup;
    var correctedFirstRow = isShowAllDayPanel && !allDay ? firstRowInGroup + 1 : firstRowInGroup;
    var correctedLastRow = allDay ? correctedFirstRow : lastRowInGroup;
    return this.completeViewDataMap.slice(correctedFirstRow, correctedLastRow + 1).map(row => row.filter(_ref => {
      var {
        groupIndex: currentGroupIndex
      } = _ref;
      return groupIndex === currentGroupIndex;
    }));
  }
  getCellCountWithGroup(groupIndex) {
    var rowIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    return dateTableGroupedMap.filter((_, index) => index <= groupIndex).reduce((previous, row) => previous + row[rowIndex].length, 0);
  }
  hasGroupAllDayPanel(groupIndex) {
    var _a, _b;
    if (this._options.isVerticalGrouping) {
      return !!((_a = this.groupedDataMap.dateTableGroupedMap[groupIndex]) === null || _a === void 0 ? void 0 : _a[0][0].cellData.allDay);
    }
    return ((_b = this.groupedDataMap.allDayPanelGroupedMap[groupIndex]) === null || _b === void 0 ? void 0 : _b.length) > 0;
  }
  isGroupIntersectDateInterval(groupIndex, startDate, endDate) {
    var groupStartDate = this.getGroupStartDate(groupIndex);
    var groupEndDate = this.getGroupEndDate(groupIndex);
    return startDate < groupEndDate && endDate > groupStartDate;
  }
  findGlobalCellPosition(date) {
    var groupIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var {
      completeViewDataMap
    } = this;
    var showAllDayPanel = this._options.isAllDayPanelVisible;
    for (var rowIndex = 0; rowIndex < completeViewDataMap.length; rowIndex += 1) {
      var currentRow = completeViewDataMap[rowIndex];
      for (var columnIndex = 0; columnIndex < currentRow.length; columnIndex += 1) {
        var cellData = currentRow[columnIndex];
        var {
          startDate: currentStartDate,
          endDate: currentEndDate,
          groupIndex: currentGroupIndex,
          allDay: currentAllDay
        } = cellData;
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
  }
  _compareDatesAndAllDay(date, cellStartDate, cellEndDate, allDay) {
    var time = date.getTime();
    var trimmedTime = dateUtils.trimTime(date).getTime();
    var cellStartTime = cellStartDate.getTime();
    var cellEndTime = cellEndDate.getTime();
    return !allDay && time >= cellStartTime && time < cellEndTime || allDay && trimmedTime === cellStartTime;
  }
  getSkippedDaysCount(groupIndex, startDate, endDate, daysCount) {
    var {
      dateTableGroupedMap
    } = this._groupedDataMapProvider.groupedDataMap;
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
    var lastCellStart = dateUtils.trimTime(lastCell.startDate);
    var daysAfterView = Math.floor((endDate.getTime() - lastCellStart.getTime()) / dateUtils.dateToMilliseconds('day'));
    var deltaDays = daysAfterView > 0 ? daysAfterView : 0;
    return daysCount - includedDays - deltaDays;
  }
  getColumnsCount() {
    var {
      dateTableMap
    } = this.viewDataMap;
    return dateTableMap ? dateTableMap[0].length : 0;
  }
  getViewEdgeIndices(isAllDayPanel) {
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
  }
  getGroupEdgeIndices(groupIndex, isAllDay) {
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
  }
  isSameCell(firstCellData, secondCellData) {
    var {
      startDate: firstStartDate,
      groupIndex: firstGroupIndex,
      allDay: firstAllDay,
      index: firstIndex
    } = firstCellData;
    var {
      startDate: secondStartDate,
      groupIndex: secondGroupIndex,
      allDay: secondAllDay,
      index: secondIndex
    } = secondCellData;
    return firstStartDate.getTime() === secondStartDate.getTime() && firstGroupIndex === secondGroupIndex && firstAllDay === secondAllDay && firstIndex === secondIndex;
  }
  getLastViewDate() {
    var {
      completeViewDataMap
    } = this;
    var rowsCount = completeViewDataMap.length - 1;
    return completeViewDataMap[rowsCount][completeViewDataMap[rowsCount].length - 1].endDate;
  }
  getStartViewDate() {
    return this._options.startViewDate;
  }
  getIntervalDuration(intervalCount) {
    return this.viewDataGenerator._getIntervalDuration(intervalCount);
  }
  getLastCellEndDate() {
    return new Date(this.getLastViewDate().getTime() - dateUtils.dateToMilliseconds('minute'));
  }
  getLastViewDateByEndDayHour(endDayHour) {
    var lastCellEndDate = this.getLastCellEndDate();
    var endTime = dateUtils.dateTimeFromDecimal(endDayHour);
    var endDateOfLastViewCell = new Date(lastCellEndDate.setHours(endTime.hours, endTime.minutes));
    return this._adjustEndDateByDaylightDiff(lastCellEndDate, endDateOfLastViewCell);
  }
  _adjustEndDateByDaylightDiff(startDate, endDate) {
    var daylightDiff = timeZoneUtils.getDaylightOffsetInMs(startDate, endDate);
    var endDateOfLastViewCell = new Date(endDate.getTime() - daylightDiff);
    return new Date(endDateOfLastViewCell.getTime() - dateUtils.dateToMilliseconds('minute'));
  }
  getCellCountInDay(startDayHour, endDayHour, hoursInterval) {
    return this.viewDataGenerator.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
  }
  getCellCount(options) {
    return this.viewDataGenerator.getCellCount(options);
  }
  getRowCount(options) {
    return this.viewDataGenerator.getRowCount(options);
  }
  getVisibleDayDuration(startDayHour, endDayHour, hoursInterval) {
    return this.viewDataGenerator.getVisibleDayDuration(startDayHour, endDayHour, hoursInterval);
  }
  _getRowCountWithAllDayRows() {
    var allDayRowCount = this._options.isAllDayPanelVisible ? 1 : 0;
    return this.getRowCount(this._options) + allDayRowCount;
  }
  getFirstDayOfWeek(firstDayOfWeekOption) {
    return this.viewDataGenerator.getFirstDayOfWeek(firstDayOfWeekOption);
  }
  setViewOptions(options) {
    this._options = this._transformRenderOptions(options);
  }
  getViewOptions() {
    return this._options;
  }
  getViewPortGroupCount() {
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    return (dateTableGroupedMap === null || dateTableGroupedMap === void 0 ? void 0 : dateTableGroupedMap.length) || 0;
  }
}