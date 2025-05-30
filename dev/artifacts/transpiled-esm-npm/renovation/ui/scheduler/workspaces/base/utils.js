"use strict";

exports.isCellAllDay = exports.getTotalRowCount = exports.getTotalCellCount = exports.getSelectedCells = exports.getRowCountWithAllDayRow = exports.getHiddenInterval = exports.getDateTableWidth = exports.getDateForHeaderText = exports.getCellIndices = exports.createVirtualScrollingOptions = exports.createCellElementMetaData = exports.compareCellsByDateAndIndex = exports.DATE_TABLE_MIN_CELL_WIDTH = void 0;
var _date = _interopRequireDefault(require("../../../../../core/utils/date"));
var _m_utils = require("../../../../../__internal/scheduler/resources/m_utils");
var _utils = require("../utils");
var _const = require("../const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var DAY_MS = _date.default.dateToMilliseconds('day');
var HOUR_MS = _date.default.dateToMilliseconds('hour');
var DATE_TABLE_MIN_CELL_WIDTH = 75;
exports.DATE_TABLE_MIN_CELL_WIDTH = DATE_TABLE_MIN_CELL_WIDTH;
var getTotalRowCount = function getTotalRowCount(rowCount, groupOrientation, groups, isAllDayPanelVisible) {
  var isVerticalGrouping = (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation);
  var groupCount = (0, _m_utils.getGroupCount)(groups);
  var totalRowCount = isVerticalGrouping ? rowCount * groupCount : rowCount;
  return isAllDayPanelVisible ? totalRowCount + groupCount : totalRowCount;
};
exports.getTotalRowCount = getTotalRowCount;
var getTotalCellCount = function getTotalCellCount(cellCount, groupOrientation, groups) {
  var isHorizontalGrouping = (0, _utils.isHorizontalGroupingApplied)(groups, groupOrientation);
  var groupCount = (0, _m_utils.getGroupCount)(groups);
  return isHorizontalGrouping ? cellCount * groupCount : cellCount;
};
exports.getTotalCellCount = getTotalCellCount;
var getRowCountWithAllDayRow = function getRowCountWithAllDayRow(rowCount, isAllDayPanelVisible) {
  return isAllDayPanelVisible ? rowCount + 1 : rowCount;
};
exports.getRowCountWithAllDayRow = getRowCountWithAllDayRow;
var getHiddenInterval = function getHiddenInterval(hoursInterval, cellCountInDay) {
  var visibleInterval = hoursInterval * cellCountInDay * HOUR_MS;
  return DAY_MS - visibleInterval;
};
exports.getHiddenInterval = getHiddenInterval;
var createCellElementMetaData = function createCellElementMetaData(tableRect, cellRect) {
  var bottom = cellRect.bottom,
    height = cellRect.height,
    left = cellRect.left,
    right = cellRect.right,
    top = cellRect.top,
    width = cellRect.width,
    x = cellRect.x,
    y = cellRect.y;
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
exports.createCellElementMetaData = createCellElementMetaData;
var getDateForHeaderText = function getDateForHeaderText(_, date) {
  return date;
};
exports.getDateForHeaderText = getDateForHeaderText;
var getDateTableWidth = function getDateTableWidth(scrollableWidth, dateTable, viewDataProvider, workSpaceConfig) {
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
exports.getDateTableWidth = getDateTableWidth;
var createVirtualScrollingOptions = function createVirtualScrollingOptions(options) {
  return {
    getCellHeight: function getCellHeight() {
      return options.cellHeight;
    },
    getCellWidth: function getCellWidth() {
      return options.cellWidth;
    },
    getCellMinWidth: function getCellMinWidth() {
      return DATE_TABLE_MIN_CELL_WIDTH;
    },
    isRTL: function isRTL() {
      return options.rtlEnabled;
    },
    getSchedulerHeight: function getSchedulerHeight() {
      return options.schedulerHeight;
    },
    getSchedulerWidth: function getSchedulerWidth() {
      return options.schedulerWidth;
    },
    getViewHeight: function getViewHeight() {
      return options.viewHeight;
    },
    getViewWidth: function getViewWidth() {
      return options.viewWidth;
    },
    getScrolling: function getScrolling() {
      return options.scrolling;
    },
    getScrollableOuterWidth: function getScrollableOuterWidth() {
      return options.scrollableWidth;
    },
    getGroupCount: function getGroupCount() {
      return (0, _m_utils.getGroupCount)(options.groups);
    },
    isVerticalGrouping: function isVerticalGrouping() {
      return options.isVerticalGrouping;
    },
    getTotalRowCount: function getTotalRowCount() {
      return options.completeRowCount;
    },
    getTotalCellCount: function getTotalCellCount() {
      return options.completeColumnCount;
    },
    getWindowHeight: function getWindowHeight() {
      return options.windowHeight;
    },
    getWindowWidth: function getWindowWidth() {
      return options.windowWidth;
    }
  };
};
exports.createVirtualScrollingOptions = createVirtualScrollingOptions;
var getCellIndices = function getCellIndices(cell) {
  var row = cell.closest(".".concat(_const.DATE_TABLE_ROW_CLASS, ", .").concat(_const.ALL_DAY_ROW_CLASS));
  var rowParent = row.parentNode;
  var cellParent = cell.parentNode;
  var columnIndex = _toConsumableArray(Array.from(cellParent.children)).filter(function (child) {
    return child.className.includes(_const.DATE_TABLE_CELL_CLASS) || child.className.includes(_const.ALL_DAY_PANEL_CELL_CLASS);
  }).indexOf(cell);
  var rowIndex = _toConsumableArray(Array.from(rowParent.children)).filter(function (child) {
    return child.className.includes(_const.DATE_TABLE_ROW_CLASS);
  }).indexOf(row);
  return {
    columnIndex,
    rowIndex
  };
};
exports.getCellIndices = getCellIndices;
var compareCellsByDateAndIndex = function compareCellsByDateAndIndex(daysAndIndexes) {
  var date = daysAndIndexes.date,
    firstDate = daysAndIndexes.firstDate,
    firstIndex = daysAndIndexes.firstIndex,
    index = daysAndIndexes.index,
    lastDate = daysAndIndexes.lastDate,
    lastIndex = daysAndIndexes.lastIndex;
  if (firstDate === lastDate) {
    var validFirstIndex = firstIndex;
    var validLastIndex = lastIndex;
    if (validFirstIndex > validLastIndex) {
      var _ref = [validLastIndex, validFirstIndex];
      validFirstIndex = _ref[0];
      validLastIndex = _ref[1];
    }
    return firstDate === date && index >= validFirstIndex && index <= validLastIndex;
  }
  return date === firstDate && index >= firstIndex || date === lastDate && index <= lastIndex || firstDate < date && date < lastDate;
};
exports.compareCellsByDateAndIndex = compareCellsByDateAndIndex;
var filterCellsByDateAndIndex = function filterCellsByDateAndIndex(cellsRow, filterData) {
  var firstDate = filterData.firstDate,
    firstIndex = filterData.firstIndex,
    lastDate = filterData.lastDate,
    lastIndex = filterData.lastIndex;
  var firstDay = _date.default.trimTime(firstDate).getTime();
  var lastDay = _date.default.trimTime(lastDate).getTime();
  return cellsRow.filter(function (cell) {
    var index = cell.index,
      startDate = cell.startDate;
    var day = _date.default.trimTime(startDate).getTime();
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
var getSelectedCells = function getSelectedCells(viewDataProvider, firstSelectedCell, lastSelectedCell, isLastSelectedCellAllDay) {
  var firstCell = firstSelectedCell;
  var lastCell = lastSelectedCell;
  if (firstCell.startDate.getTime() > lastCell.startDate.getTime()) {
    var _ref2 = [lastCell, firstCell];
    firstCell = _ref2[0];
    lastCell = _ref2[1];
  }
  var _firstCell = firstCell,
    firstGroupIndex = _firstCell.groupIndex,
    firstCellIndex = _firstCell.index,
    firstStartDate = _firstCell.startDate;
  var _lastCell = lastCell,
    lastCellIndex = _lastCell.index,
    lastStartDate = _lastCell.startDate;
  var cells = viewDataProvider.getCellsByGroupIndexAndAllDay(firstGroupIndex !== null && firstGroupIndex !== void 0 ? firstGroupIndex : 0, isLastSelectedCellAllDay);
  var filteredCells = cells.reduce(function (selectedCells, cellsRow) {
    var filterData = {
      firstDate: firstStartDate,
      lastDate: lastStartDate,
      firstIndex: firstCellIndex,
      lastIndex: lastCellIndex
    };
    var filteredRow = filterCellsByDateAndIndex(cellsRow, filterData);
    selectedCells.push.apply(selectedCells, _toConsumableArray(filteredRow));
    return selectedCells;
  }, []);
  var selectedCells = filteredCells.sort(function (firstArg, secondArg) {
    return firstArg.startDate.getTime() - secondArg.startDate.getTime();
  });
  return selectedCells;
};
exports.getSelectedCells = getSelectedCells;
var isCellAllDay = function isCellAllDay(cell) {
  return cell.className.includes(_const.ALL_DAY_PANEL_CELL_CLASS);
};
exports.isCellAllDay = isCellAllDay;