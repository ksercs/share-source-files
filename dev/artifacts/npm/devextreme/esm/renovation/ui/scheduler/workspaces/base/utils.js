/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../../core/utils/date';
import { getGroupCount as _getGroupCount } from '../../../../../__internal/scheduler/resources/m_utils';
import { isHorizontalGroupingApplied, isVerticalGroupingApplied } from '../utils';
import { ALL_DAY_PANEL_CELL_CLASS, ALL_DAY_ROW_CLASS, DATE_TABLE_CELL_CLASS, DATE_TABLE_ROW_CLASS } from '../const';
var DAY_MS = dateUtils.dateToMilliseconds('day');
var HOUR_MS = dateUtils.dateToMilliseconds('hour');
export var DATE_TABLE_MIN_CELL_WIDTH = 75;
export var getTotalRowCount = (rowCount, groupOrientation, groups, isAllDayPanelVisible) => {
  var isVerticalGrouping = isVerticalGroupingApplied(groups, groupOrientation);
  var groupCount = _getGroupCount(groups);
  var totalRowCount = isVerticalGrouping ? rowCount * groupCount : rowCount;
  return isAllDayPanelVisible ? totalRowCount + groupCount : totalRowCount;
};
export var getTotalCellCount = (cellCount, groupOrientation, groups) => {
  var isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation);
  var groupCount = _getGroupCount(groups);
  return isHorizontalGrouping ? cellCount * groupCount : cellCount;
};
export var getRowCountWithAllDayRow = (rowCount, isAllDayPanelVisible) => isAllDayPanelVisible ? rowCount + 1 : rowCount;
export var getHiddenInterval = (hoursInterval, cellCountInDay) => {
  var visibleInterval = hoursInterval * cellCountInDay * HOUR_MS;
  return DAY_MS - visibleInterval;
};
export var createCellElementMetaData = (tableRect, cellRect) => {
  var {
    bottom,
    height,
    left,
    right,
    top,
    width,
    x,
    y
  } = cellRect;
  return {
    right,
    bottom,
    left: left - tableRect.left,
    top: top - tableRect.top,
    width,
    height,
    x,
    y
  };
};
export var getDateForHeaderText = (_, date) => date;
export var getDateTableWidth = (scrollableWidth, dateTable, viewDataProvider, workSpaceConfig) => {
  var dateTableCell = dateTable.querySelector('td:not(.dx-scheduler-virtual-cell)');
  var cellWidth = dateTableCell.getBoundingClientRect().width;
  if (cellWidth < DATE_TABLE_MIN_CELL_WIDTH) {
    cellWidth = DATE_TABLE_MIN_CELL_WIDTH;
  }
  var cellCount = viewDataProvider.getCellCount(workSpaceConfig);
  var totalCellCount = getTotalCellCount(cellCount, workSpaceConfig.groupOrientation, workSpaceConfig.groups);
  var minTablesWidth = totalCellCount * cellWidth;
  return scrollableWidth < minTablesWidth ? minTablesWidth : scrollableWidth;
};
export var createVirtualScrollingOptions = options => ({
  getCellHeight: () => options.cellHeight,
  getCellWidth: () => options.cellWidth,
  getCellMinWidth: () => DATE_TABLE_MIN_CELL_WIDTH,
  isRTL: () => options.rtlEnabled,
  getSchedulerHeight: () => options.schedulerHeight,
  getSchedulerWidth: () => options.schedulerWidth,
  getViewHeight: () => options.viewHeight,
  getViewWidth: () => options.viewWidth,
  getScrolling: () => options.scrolling,
  getScrollableOuterWidth: () => options.scrollableWidth,
  getGroupCount: () => _getGroupCount(options.groups),
  isVerticalGrouping: () => options.isVerticalGrouping,
  getTotalRowCount: () => options.completeRowCount,
  getTotalCellCount: () => options.completeColumnCount,
  getWindowHeight: () => options.windowHeight,
  getWindowWidth: () => options.windowWidth
});
export var getCellIndices = cell => {
  var row = cell.closest(".".concat(DATE_TABLE_ROW_CLASS, ", .").concat(ALL_DAY_ROW_CLASS));
  var rowParent = row.parentNode;
  var cellParent = cell.parentNode;
  var columnIndex = [...Array.from(cellParent.children)].filter(child => child.className.includes(DATE_TABLE_CELL_CLASS) || child.className.includes(ALL_DAY_PANEL_CELL_CLASS)).indexOf(cell);
  var rowIndex = [...Array.from(rowParent.children)].filter(child => child.className.includes(DATE_TABLE_ROW_CLASS)).indexOf(row);
  return {
    columnIndex,
    rowIndex
  };
};
export var compareCellsByDateAndIndex = daysAndIndexes => {
  var {
    date,
    firstDate,
    firstIndex,
    index,
    lastDate,
    lastIndex
  } = daysAndIndexes;
  if (firstDate === lastDate) {
    var validFirstIndex = firstIndex;
    var validLastIndex = lastIndex;
    if (validFirstIndex > validLastIndex) {
      [validFirstIndex, validLastIndex] = [validLastIndex, validFirstIndex];
    }
    return firstDate === date && index >= validFirstIndex && index <= validLastIndex;
  }
  return date === firstDate && index >= firstIndex || date === lastDate && index <= lastIndex || firstDate < date && date < lastDate;
};
var filterCellsByDateAndIndex = (cellsRow, filterData) => {
  var {
    firstDate,
    firstIndex,
    lastDate,
    lastIndex
  } = filterData;
  var firstDay = dateUtils.trimTime(firstDate).getTime();
  var lastDay = dateUtils.trimTime(lastDate).getTime();
  return cellsRow.filter(cell => {
    var {
      index,
      startDate
    } = cell;
    var day = dateUtils.trimTime(startDate).getTime();
    var daysAndIndexes = {
      date: day,
      index,
      firstDate: firstDay,
      firstIndex,
      lastDate: lastDay,
      lastIndex
    };
    return compareCellsByDateAndIndex(daysAndIndexes);
  });
};
export var getSelectedCells = (viewDataProvider, firstSelectedCell, lastSelectedCell, isLastSelectedCellAllDay) => {
  var firstCell = firstSelectedCell;
  var lastCell = lastSelectedCell;
  if (firstCell.startDate.getTime() > lastCell.startDate.getTime()) {
    [firstCell, lastCell] = [lastCell, firstCell];
  }
  var {
    groupIndex: firstGroupIndex,
    index: firstCellIndex,
    startDate: firstStartDate
  } = firstCell;
  var {
    index: lastCellIndex,
    startDate: lastStartDate
  } = lastCell;
  var cells = viewDataProvider.getCellsByGroupIndexAndAllDay(firstGroupIndex !== null && firstGroupIndex !== void 0 ? firstGroupIndex : 0, isLastSelectedCellAllDay);
  var filteredCells = cells.reduce((selectedCells, cellsRow) => {
    var filterData = {
      firstDate: firstStartDate,
      lastDate: lastStartDate,
      firstIndex: firstCellIndex,
      lastIndex: lastCellIndex
    };
    var filteredRow = filterCellsByDateAndIndex(cellsRow, filterData);
    selectedCells.push(...filteredRow);
    return selectedCells;
  }, []);
  var selectedCells = filteredCells.sort((firstArg, secondArg) => firstArg.startDate.getTime() - secondArg.startDate.getTime());
  return selectedCells;
};
export var isCellAllDay = cell => cell.className.includes(ALL_DAY_PANEL_CELL_CLASS);
