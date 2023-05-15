!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/ui/scheduler/workspaces/base/utils.js"], ["../../../../../core/utils/date","../../../../../ui/scheduler/resources/utils","../utils","../const"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/ui/scheduler/workspaces/base/utils.js", ["../../../../../core/utils/date", "../../../../../ui/scheduler/resources/utils", "../utils", "../const"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.isCellAllDay = exports.getTotalRowCount = exports.getTotalCellCount = exports.getSelectedCells = exports.getRowCountWithAllDayRow = exports.getHiddenInterval = exports.getDateTableWidth = exports.getDateForHeaderText = exports.getCellIndices = exports.createVirtualScrollingOptions = exports.createCellElementMetaData = exports.compareCellsByDateAndIndex = exports.DATE_TABLE_MIN_CELL_WIDTH = void 0;
  var _date = _interopRequireDefault($__require("../../../../../core/utils/date"));
  var _utils = $__require("../../../../../ui/scheduler/resources/utils");
  var _utils2 = $__require("../utils");
  var _const = $__require("../const");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  var DAY_MS = _date.default.dateToMilliseconds('day');
  var HOUR_MS = _date.default.dateToMilliseconds('hour');
  var DATE_TABLE_MIN_CELL_WIDTH = 75;
  exports.DATE_TABLE_MIN_CELL_WIDTH = DATE_TABLE_MIN_CELL_WIDTH;
  var getTotalRowCount = function getTotalRowCount(rowCount, groupOrientation, groups, isAllDayPanelVisible) {
    var isVerticalGrouping = (0, _utils2.isVerticalGroupingApplied)(groups, groupOrientation);
    var groupCount = (0, _utils.getGroupCount)(groups);
    var totalRowCount = isVerticalGrouping ? rowCount * groupCount : rowCount;
    return isAllDayPanelVisible ? totalRowCount + groupCount : totalRowCount;
  };
  exports.getTotalRowCount = getTotalRowCount;
  var getTotalCellCount = function getTotalCellCount(cellCount, groupOrientation, groups) {
    var isHorizontalGrouping = (0, _utils2.isHorizontalGroupingApplied)(groups, groupOrientation);
    var groupCount = (0, _utils.getGroupCount)(groups);
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
      right: right,
      bottom: bottom,
      left: left - tableRect.left,
      top: top - tableRect.top,
      width: width,
      height: height,
      x: x,
      y: y
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
        return (0, _utils.getGroupCount)(options.groups);
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
      columnIndex: columnIndex,
      rowIndex: rowIndex
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
        index: index,
        firstDate: firstDay,
        firstIndex: firstIndex,
        lastDate: lastDay,
        lastIndex: lastIndex
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../../core/utils/date","../../../../../ui/scheduler/resources/utils","../utils","../const"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../../core/utils/date"), require("../../../../../ui/scheduler/resources/utils"), require("../utils"), require("../const"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.js.map