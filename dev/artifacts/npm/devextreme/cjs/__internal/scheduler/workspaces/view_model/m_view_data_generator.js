/**
* DevExtreme (cjs/__internal/scheduler/workspaces/view_model/m_view_data_generator.js)
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
exports.ViewDataGenerator = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _utils = require("../../../../renovation/ui/scheduler/workspaces/utils");
var _m_constants = require("../../m_constants");
var _m_utils = require("../../resources/m_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var HOUR_MS = _date.default.dateToMilliseconds('hour');
var DAY_MS = _date.default.dateToMilliseconds('day');
var ViewDataGenerator = /*#__PURE__*/function () {
  function ViewDataGenerator() {
    this.daysInInterval = 1;
    this.isWorkView = false;
    this.tableAllDay = false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var _proto = ViewDataGenerator.prototype;
  _proto.isSkippedDate = function isSkippedDate(date) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._calculateStartViewDate = function _calculateStartViewDate(options) {};
  _proto.getStartViewDate = function getStartViewDate(options) {
    return this._calculateStartViewDate(options);
  };
  _proto.getCompleteViewDataMap = function getCompleteViewDataMap(options) {
    var _viewDataMap;
    var groups = options.groups,
      isGroupedByDate = options.isGroupedByDate,
      isHorizontalGrouping = options.isHorizontalGrouping,
      isVerticalGrouping = options.isVerticalGrouping,
      intervalCount = options.intervalCount,
      currentDate = options.currentDate,
      viewType = options.viewType,
      startDayHour = options.startDayHour,
      endDayHour = options.endDayHour,
      hoursInterval = options.hoursInterval;
    this._setVisibilityDates(options);
    this.setHiddenInterval(startDayHour, endDayHour, hoursInterval);
    var groupsList = (0, _m_utils.getAllGroups)(groups);
    var cellCountInGroupRow = this.getCellCount({
      intervalCount,
      currentDate,
      viewType,
      startDayHour,
      endDayHour,
      hoursInterval
    });
    var rowCountInGroup = this.getRowCount({
      intervalCount,
      currentDate,
      viewType,
      hoursInterval,
      startDayHour,
      endDayHour
    });
    var viewDataMap = [];
    var allDayPanelData = this._generateAllDayPanelData(options, rowCountInGroup, cellCountInGroupRow);
    var viewCellsData = this._generateViewCellsData(options, rowCountInGroup, cellCountInGroupRow);
    allDayPanelData && viewDataMap.push(allDayPanelData);
    (_viewDataMap = viewDataMap).push.apply(_viewDataMap, _toConsumableArray(viewCellsData));
    if (isHorizontalGrouping && !isGroupedByDate) {
      viewDataMap = this._transformViewDataMapForHorizontalGrouping(viewDataMap, groupsList);
    }
    if (isVerticalGrouping) {
      viewDataMap = this._transformViewDataMapForVerticalGrouping(viewDataMap, groupsList);
    }
    if (isGroupedByDate) {
      viewDataMap = this._transformViewDataMapForGroupingByDate(viewDataMap, groupsList);
    }
    var completeViewDataMap = this._addKeysToCells(viewDataMap);
    return completeViewDataMap;
  };
  _proto._transformViewDataMapForHorizontalGrouping = function _transformViewDataMapForHorizontalGrouping(viewDataMap, groupsList) {
    var result = viewDataMap.map(function (row) {
      return row.slice();
    });
    groupsList.slice(1).forEach(function (groups, index) {
      var groupIndex = index + 1;
      viewDataMap.forEach(function (row, rowIndex) {
        var _result$rowIndex;
        var nextGroupRow = row.map(function (cellData) {
          return _extends(_extends({}, cellData), {
            groups,
            groupIndex
          });
        });
        (_result$rowIndex = result[rowIndex]).push.apply(_result$rowIndex, _toConsumableArray(nextGroupRow));
      });
    });
    return result;
  };
  _proto._transformViewDataMapForVerticalGrouping = function _transformViewDataMapForVerticalGrouping(viewDataMap, groupsList) {
    var result = viewDataMap.map(function (row) {
      return row.slice();
    });
    groupsList.slice(1).forEach(function (groups, index) {
      var groupIndex = index + 1;
      var nextGroupMap = viewDataMap.map(function (cellsRow) {
        var nextRow = cellsRow.map(function (cellData) {
          return _extends(_extends({}, cellData), {
            groupIndex,
            groups
          });
        });
        return nextRow;
      });
      result.push.apply(result, _toConsumableArray(nextGroupMap));
    });
    return result;
  };
  _proto._transformViewDataMapForGroupingByDate = function _transformViewDataMapForGroupingByDate(viewDataMap, groupsList) {
    var correctedGroupList = groupsList.slice(1);
    var correctedGroupCount = correctedGroupList.length;
    var result = viewDataMap.map(function (cellsRow) {
      var groupedByDateCellsRow = cellsRow.reduce(function (currentRow, cell) {
        var rowWithCurrentCell = [].concat(_toConsumableArray(currentRow), [_extends(_extends({}, cell), {
          isFirstGroupCell: true,
          isLastGroupCell: correctedGroupCount === 0
        })], _toConsumableArray(correctedGroupList.map(function (groups, index) {
          return _extends(_extends({}, cell), {
            groups,
            groupIndex: index + 1,
            isFirstGroupCell: false,
            isLastGroupCell: index === correctedGroupCount - 1
          });
        })));
        return rowWithCurrentCell;
      }, []);
      return groupedByDateCellsRow;
    });
    return result;
  };
  _proto._addKeysToCells = function _addKeysToCells(viewDataMap) {
    var totalColumnCount = viewDataMap[0].length;
    var _viewDataMap$reduce = viewDataMap.reduce(function (_ref, row, rowIndex) {
        var allDayPanelsCount = _ref.allDayPanelsCount,
          currentViewDataMap = _ref.currentViewDataMap;
        var isAllDay = row[0].allDay;
        var keyBase = (rowIndex - allDayPanelsCount) * totalColumnCount;
        var currentAllDayPanelsCount = isAllDay ? allDayPanelsCount + 1 : allDayPanelsCount;
        currentViewDataMap[rowIndex].forEach(function (cell, columnIndex) {
          cell.key = keyBase + columnIndex;
        });
        return {
          allDayPanelsCount: currentAllDayPanelsCount,
          currentViewDataMap
        };
      }, {
        allDayPanelsCount: 0,
        currentViewDataMap: viewDataMap
      }),
      result = _viewDataMap$reduce.currentViewDataMap;
    return result;
  };
  _proto.generateViewDataMap = function generateViewDataMap(completeViewDataMap, options) {
    var rowCount = options.rowCount,
      startCellIndex = options.startCellIndex,
      startRowIndex = options.startRowIndex,
      cellCount = options.cellCount,
      isVerticalGrouping = options.isVerticalGrouping,
      isAllDayPanelVisible = options.isAllDayPanelVisible;
    var sliceCells = function sliceCells(row, rowIndex, startIndex, count) {
      var sliceToIndex = count !== undefined ? startIndex + count : undefined;
      return row.slice(startIndex, sliceToIndex).map(function (cellData, columnIndex) {
        return {
          cellData,
          position: {
            rowIndex,
            columnIndex
          }
        };
      });
    };
    var correctedStartRowIndex = startRowIndex;
    var allDayPanelMap = [];
    if (this._isStandaloneAllDayPanel(isVerticalGrouping, isAllDayPanelVisible)) {
      correctedStartRowIndex++;
      allDayPanelMap = sliceCells(completeViewDataMap[0], 0, startCellIndex, cellCount);
    }
    var displayedRowCount = (0, _base.getDisplayedRowCount)(rowCount, completeViewDataMap);
    var dateTableMap = completeViewDataMap.slice(correctedStartRowIndex, correctedStartRowIndex + displayedRowCount).map(function (row, rowIndex) {
      return sliceCells(row, rowIndex, startCellIndex, cellCount);
    });
    return {
      allDayPanelMap,
      dateTableMap
    };
  };
  _proto._isStandaloneAllDayPanel = function _isStandaloneAllDayPanel(isVerticalGrouping, isAllDayPanelVisible) {
    return !isVerticalGrouping && isAllDayPanelVisible;
  };
  _proto.getViewDataFromMap = function getViewDataFromMap(completeViewDataMap, viewDataMap, options) {
    var topVirtualRowHeight = options.topVirtualRowHeight,
      bottomVirtualRowHeight = options.bottomVirtualRowHeight,
      leftVirtualCellWidth = options.leftVirtualCellWidth,
      rightVirtualCellWidth = options.rightVirtualCellWidth,
      cellCount = options.cellCount,
      rowCount = options.rowCount,
      startRowIndex = options.startRowIndex,
      startCellIndex = options.startCellIndex,
      isProvideVirtualCellsWidth = options.isProvideVirtualCellsWidth,
      isGroupedAllDayPanel = options.isGroupedAllDayPanel,
      isVerticalGrouping = options.isVerticalGrouping,
      isAllDayPanelVisible = options.isAllDayPanelVisible;
    var allDayPanelMap = viewDataMap.allDayPanelMap,
      dateTableMap = viewDataMap.dateTableMap;
    var _dateTableMap$reduce = dateTableMap.reduce(function (_ref2, cellsRow) {
        var previousGroupIndex = _ref2.previousGroupIndex,
          groupedData = _ref2.groupedData;
        var cellDataRow = cellsRow.map(function (_ref3) {
          var cellData = _ref3.cellData;
          return cellData;
        });
        var firstCell = cellDataRow[0];
        var isAllDayRow = firstCell.allDay;
        var currentGroupIndex = firstCell.groupIndex;
        if (currentGroupIndex !== previousGroupIndex) {
          groupedData.push({
            dateTable: [],
            isGroupedAllDayPanel: (0, _utils.getIsGroupedAllDayPanel)(!!isAllDayRow, isVerticalGrouping),
            groupIndex: currentGroupIndex,
            key: (0, _utils.getKeyByGroup)(currentGroupIndex, isVerticalGrouping)
          });
        }
        if (isAllDayRow) {
          groupedData[groupedData.length - 1].allDayPanel = cellDataRow;
        } else {
          groupedData[groupedData.length - 1].dateTable.push({
            cells: cellDataRow,
            key: cellDataRow[0].key - startCellIndex
          });
        }
        return {
          groupedData,
          previousGroupIndex: currentGroupIndex
        };
      }, {
        previousGroupIndex: -1,
        groupedData: []
      }),
      groupedData = _dateTableMap$reduce.groupedData;
    if (this._isStandaloneAllDayPanel(isVerticalGrouping, isAllDayPanelVisible)) {
      groupedData[0].allDayPanel = allDayPanelMap.map(function (_ref4) {
        var cellData = _ref4.cellData;
        return cellData;
      });
    }
    var totalCellCount = (0, _base.getTotalCellCountByCompleteData)(completeViewDataMap);
    var totalRowCount = (0, _base.getTotalRowCountByCompleteData)(completeViewDataMap);
    var displayedCellCount = (0, _base.getDisplayedCellCount)(cellCount, completeViewDataMap);
    var displayedRowCount = (0, _base.getDisplayedRowCount)(rowCount, completeViewDataMap);
    return {
      groupedData,
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? leftVirtualCellWidth : undefined,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? rightVirtualCellWidth : undefined,
      isGroupedAllDayPanel,
      leftVirtualCellCount: startCellIndex,
      rightVirtualCellCount: cellCount === undefined ? 0 : totalCellCount - startCellIndex - displayedCellCount,
      topVirtualRowCount: startRowIndex,
      bottomVirtualRowCount: totalRowCount - startRowIndex - displayedRowCount
    };
  };
  _proto._generateViewCellsData = function _generateViewCellsData(options, rowCount, cellCountInGroupRow) {
    var viewCellsData = [];
    for (var rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      viewCellsData.push(this._generateCellsRow(options, false, rowIndex, rowCount, cellCountInGroupRow));
    }
    return viewCellsData;
  };
  _proto._generateAllDayPanelData = function _generateAllDayPanelData(options, rowCount, columnCount) {
    if (!options.isAllDayPanelVisible) {
      return null;
    }
    return this._generateCellsRow(options, true, 0, rowCount, columnCount);
  };
  _proto._generateCellsRow = function _generateCellsRow(options, allDay, rowIndex, rowCount, columnCount) {
    var cellsRow = [];
    for (var columnIndex = 0; columnIndex < columnCount; ++columnIndex) {
      var cellDataValue = this.getCellData(rowIndex, columnIndex, options, allDay);
      cellDataValue.index = rowIndex * columnCount + columnIndex;
      cellDataValue.isFirstGroupCell = this._isFirstGroupCell(rowIndex, columnIndex, options, rowCount, columnCount);
      cellDataValue.isLastGroupCell = this._isLastGroupCell(rowIndex, columnIndex, options, rowCount, columnCount);
      cellsRow.push(cellDataValue);
    }
    return cellsRow;
  };
  _proto.getCellData = function getCellData(rowIndex, columnIndex, options, allDay) {
    return allDay ? this.prepareAllDayCellData(options, rowIndex, columnIndex) : this.prepareCellData(options, rowIndex, columnIndex);
  };
  _proto.prepareCellData = function prepareCellData(options, rowIndex, columnIndex) {
    var groups = options.groups,
      startDayHour = options.startDayHour,
      endDayHour = options.endDayHour,
      interval = options.interval,
      hoursInterval = options.hoursInterval;
    var groupsList = (0, _m_utils.getAllGroups)(groups);
    var startDate = this.getDateByCellIndices(options, rowIndex, columnIndex, this.getCellCountInDay(startDayHour, endDayHour, hoursInterval));
    var endDate = this.calculateEndDate(startDate, interval, endDayHour);
    var data = {
      startDate,
      endDate,
      allDay: this.tableAllDay,
      groupIndex: 0
    };
    if (groupsList.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      data.groups = groupsList[0];
    }
    return data;
  };
  _proto.prepareAllDayCellData = function prepareAllDayCellData(options, rowIndex, columnIndex) {
    var data = this.prepareCellData(options, rowIndex, columnIndex);
    var startDate = _date.default.trimTime(data.startDate);
    return _extends(_extends({}, data), {
      startDate,
      endDate: startDate,
      allDay: true
    });
  };
  _proto.getDateByCellIndices = function getDateByCellIndices(options, rowIndex, columnIndex, cellCountInDay) {
    var startViewDate = options.startViewDate;
    var startDayHour = options.startDayHour,
      interval = options.interval,
      firstDayOfWeek = options.firstDayOfWeek,
      intervalCount = options.intervalCount;
    var isStartViewDateDuringDST = startViewDate.getHours() !== Math.floor(startDayHour);
    if (isStartViewDateDuringDST) {
      var dateWithCorrectHours = (0, _base.getStartViewDateWithoutDST)(startViewDate, startDayHour);
      // @ts-expect-error
      startViewDate = new Date(dateWithCorrectHours - _date.default.dateToMilliseconds('day'));
    }
    var columnCountBase = this.getCellCount(options);
    var rowCountBase = this.getRowCount(options);
    var cellIndex = this._calculateCellIndex(rowIndex, columnIndex, rowCountBase, columnCountBase);
    var millisecondsOffset = this.getMillisecondsOffset(cellIndex, interval, cellCountInDay);
    var offsetByCount = this.isWorkView ? this.getTimeOffsetByColumnIndex(columnIndex, this.getFirstDayOfWeek(firstDayOfWeek), columnCountBase, intervalCount) : 0;
    var startViewDateTime = startViewDate.getTime();
    var currentDate = new Date(startViewDateTime + millisecondsOffset + offsetByCount);
    var timeZoneDifference = isStartViewDateDuringDST ? 0 : _date.default.getTimezonesDifference(startViewDate, currentDate);
    currentDate.setTime(currentDate.getTime() + timeZoneDifference);
    return currentDate;
  };
  _proto.getMillisecondsOffset = function getMillisecondsOffset(cellIndex, interval, cellCountInDay) {
    var dayIndex = Math.floor(cellIndex / cellCountInDay);
    var realHiddenInterval = dayIndex * this.hiddenInterval;
    return interval * cellIndex + realHiddenInterval;
  };
  _proto.getTimeOffsetByColumnIndex = function getTimeOffsetByColumnIndex(columnIndex, firstDayOfWeek, columnCount, intervalCount) {
    var firstDayOfWeekDiff = Math.max(0, firstDayOfWeek - 1);
    var columnsInWeek = columnCount / intervalCount;
    var weekendCount = Math.floor((columnIndex + firstDayOfWeekDiff) / columnsInWeek);
    return DAY_MS * weekendCount * 2;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.calculateEndDate = function calculateEndDate(startDate, interval, endDayHour) {
    var result = new Date(startDate);
    result.setMilliseconds(result.getMilliseconds() + Math.round(interval));
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._calculateCellIndex = function _calculateCellIndex(rowIndex, columnIndex, rowCount, columnCountBase) {
    return (0, _base.calculateCellIndex)(rowIndex, columnIndex, rowCount);
  };
  _proto.generateGroupedDataMap = function generateGroupedDataMap(viewDataMap) {
    var allDayPanelMap = viewDataMap.allDayPanelMap,
      dateTableMap = viewDataMap.dateTableMap;
    var _dateTableMap$reduce2 = dateTableMap.reduce(function (previousOptions, cellsRow) {
        var previousGroupedDataMap = previousOptions.previousGroupedDataMap,
          previousRowIndex = previousOptions.previousRowIndex,
          previousGroupIndex = previousOptions.previousGroupIndex;
        var currentGroupIndex = cellsRow[0].cellData.groupIndex;
        var currentRowIndex = currentGroupIndex === previousGroupIndex ? previousRowIndex + 1 : 0;
        cellsRow.forEach(function (cell) {
          var groupIndex = cell.cellData.groupIndex;
          if (!previousGroupedDataMap[groupIndex]) {
            previousGroupedDataMap[groupIndex] = [];
          }
          if (!previousGroupedDataMap[groupIndex][currentRowIndex]) {
            previousGroupedDataMap[groupIndex][currentRowIndex] = [];
          }
          previousGroupedDataMap[groupIndex][currentRowIndex].push(cell);
        });
        return {
          previousGroupedDataMap,
          previousRowIndex: currentRowIndex,
          previousGroupIndex: currentGroupIndex
        };
      }, {
        previousGroupedDataMap: [],
        previousRowIndex: -1,
        previousGroupIndex: -1
      }),
      dateTableGroupedMap = _dateTableMap$reduce2.previousGroupedDataMap;
    var allDayPanelGroupedMap = [];
    allDayPanelMap === null || allDayPanelMap === void 0 ? void 0 : allDayPanelMap.forEach(function (cell) {
      var groupIndex = cell.cellData.groupIndex;
      if (!allDayPanelGroupedMap[groupIndex]) {
        allDayPanelGroupedMap[groupIndex] = [];
      }
      allDayPanelGroupedMap[groupIndex].push(cell);
    });
    return {
      allDayPanelGroupedMap,
      dateTableGroupedMap
    };
  };
  _proto._isFirstGroupCell = function _isFirstGroupCell(rowIndex, columnIndex, options, rowCount, columnCount) {
    var groupOrientation = options.groupOrientation,
      groups = options.groups,
      isGroupedByDate = options.isGroupedByDate;
    var groupCount = (0, _m_utils.getGroupCount)(groups);
    if (isGroupedByDate) {
      return columnIndex % groupCount === 0;
    }
    if (groupOrientation === _m_constants.HORIZONTAL_GROUP_ORIENTATION) {
      return columnIndex % columnCount === 0;
    }
    return rowIndex % rowCount === 0;
  };
  _proto._isLastGroupCell = function _isLastGroupCell(rowIndex, columnIndex, options, rowCount, columnCount) {
    var groupOrientation = options.groupOrientation,
      groups = options.groups,
      isGroupedByDate = options.isGroupedByDate;
    var groupCount = (0, _m_utils.getGroupCount)(groups);
    if (isGroupedByDate) {
      return (columnIndex + 1) % groupCount === 0;
    }
    if (groupOrientation === _m_constants.HORIZONTAL_GROUP_ORIENTATION) {
      return (columnIndex + 1) % columnCount === 0;
    }
    return (rowIndex + 1) % rowCount === 0;
  };
  _proto.markSelectedAndFocusedCells = function markSelectedAndFocusedCells(viewDataMap, renderOptions) {
    var _this = this;
    var selectedCells = renderOptions.selectedCells,
      focusedCell = renderOptions.focusedCell;
    if (!selectedCells && !focusedCell) {
      return viewDataMap;
    }
    var allDayPanelMap = viewDataMap.allDayPanelMap,
      dateTableMap = viewDataMap.dateTableMap;
    var nextDateTableMap = dateTableMap.map(function (row) {
      return _this._markSelectedAndFocusedCellsInRow(row, selectedCells, focusedCell);
    });
    var nextAllDayMap = this._markSelectedAndFocusedCellsInRow(allDayPanelMap, selectedCells, focusedCell);
    return {
      allDayPanelMap: nextAllDayMap,
      dateTableMap: nextDateTableMap
    };
  };
  _proto._markSelectedAndFocusedCellsInRow = function _markSelectedAndFocusedCellsInRow(dataRow, selectedCells, focusedCell) {
    return dataRow.map(function (cell) {
      var _cell$cellData = cell.cellData,
        index = _cell$cellData.index,
        groupIndex = _cell$cellData.groupIndex,
        allDay = _cell$cellData.allDay,
        startDate = _cell$cellData.startDate;
      var indexInSelectedCells = selectedCells.findIndex(function (_ref5) {
        var selectedCellIndex = _ref5.index,
          selectedCellGroupIndex = _ref5.groupIndex,
          selectedCellAllDay = _ref5.allDay,
          selectedCellStartDate = _ref5.startDate;
        return groupIndex === selectedCellGroupIndex && (index === selectedCellIndex || selectedCellIndex === undefined && startDate.getTime() === selectedCellStartDate.getTime()) && !!allDay === !!selectedCellAllDay;
      });
      var isFocused = !!focusedCell && index === focusedCell.cellData.index && groupIndex === focusedCell.cellData.groupIndex && allDay === focusedCell.cellData.allDay;
      if (!isFocused && indexInSelectedCells === -1) {
        return cell;
      }
      return _extends(_extends({}, cell), {
        cellData: _extends(_extends({}, cell.cellData), {
          isSelected: indexInSelectedCells > -1,
          isFocused
        })
      });
    });
  };
  _proto.getInterval = function getInterval(hoursInterval) {
    return hoursInterval * HOUR_MS;
  };
  _proto._getIntervalDuration = function _getIntervalDuration(intervalCount) {
    return _date.default.dateToMilliseconds('day') * intervalCount;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._setVisibilityDates = function _setVisibilityDates(options) {};
  _proto.getCellCountInDay = function getCellCountInDay(startDayHour, endDayHour, hoursInterval) {
    var result = (0, _base.calculateDayDuration)(startDayHour, endDayHour) / hoursInterval;
    return Math.ceil(result);
  };
  _proto.getCellCount = function getCellCount(options) {
    var intervalCount = options.intervalCount,
      viewType = options.viewType,
      startDayHour = options.startDayHour,
      endDayHour = options.endDayHour,
      hoursInterval = options.hoursInterval;
    var cellCountInDay = this.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
    var columnCountInDay = (0, _base.isHorizontalView)(viewType) ? cellCountInDay : 1;
    return this.daysInInterval * intervalCount * columnCountInDay;
  };
  _proto.getRowCount = function getRowCount(options) {
    var viewType = options.viewType,
      startDayHour = options.startDayHour,
      endDayHour = options.endDayHour,
      hoursInterval = options.hoursInterval;
    var cellCountInDay = this.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
    var rowCountInDay = !(0, _base.isHorizontalView)(viewType) ? cellCountInDay : 1;
    return rowCountInDay;
  };
  _proto.setHiddenInterval = function setHiddenInterval(startDayHour, endDayHour, hoursInterval) {
    this.hiddenInterval = DAY_MS - this.getVisibleDayDuration(startDayHour, endDayHour, hoursInterval);
  };
  _proto.getVisibleDayDuration = function getVisibleDayDuration(startDayHour, endDayHour, hoursInterval) {
    var cellCountInDay = this.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
    return hoursInterval * cellCountInDay * HOUR_MS;
  };
  _proto.getFirstDayOfWeek = function getFirstDayOfWeek(firstDayOfWeekOption) {
    return firstDayOfWeekOption;
  };
  return ViewDataGenerator;
}();
exports.ViewDataGenerator = ViewDataGenerator;
