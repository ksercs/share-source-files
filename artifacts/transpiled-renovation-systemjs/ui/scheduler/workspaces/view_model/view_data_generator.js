!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/workspaces/view_model/view_data_generator.js"], ["../../../../core/utils/date","../../constants","../../resources/utils","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../../../../renovation/ui/scheduler/workspaces/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/workspaces/view_model/view_data_generator.js", ["../../../../core/utils/date", "../../constants", "../../resources/utils", "../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base", "../../../../renovation/ui/scheduler/workspaces/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.ViewDataGenerator = void 0;
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  var _constants = $__require("../../constants");
  var _utils = $__require("../../resources/utils");
  var _base = $__require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  var _utils2 = $__require("../../../../renovation/ui/scheduler/workspaces/utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
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
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var HOUR_MS = _date.default.dateToMilliseconds('hour');
  var DAY_MS = _date.default.dateToMilliseconds('day');
  var ViewDataGenerator = /*#__PURE__*/function () {
    function ViewDataGenerator() {}
    var _proto = ViewDataGenerator.prototype;
    _proto.isSkippedDate = function isSkippedDate() {
      return false;
    };
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
      var groupsList = (0, _utils.getAllGroups)(groups);
      var cellCountInGroupRow = this.getCellCount({
        intervalCount: intervalCount,
        currentDate: currentDate,
        viewType: viewType,
        startDayHour: startDayHour,
        endDayHour: endDayHour,
        hoursInterval: hoursInterval
      });
      var rowCountInGroup = this.getRowCount({
        intervalCount: intervalCount,
        currentDate: currentDate,
        viewType: viewType,
        hoursInterval: hoursInterval,
        startDayHour: startDayHour,
        endDayHour: endDayHour
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
            return _extends({}, cellData, {
              groups: groups,
              groupIndex: groupIndex
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
            return _extends({}, cellData, {
              groupIndex: groupIndex,
              groups: groups
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
          var rowWithCurrentCell = [].concat(_toConsumableArray(currentRow), [_extends({}, cell, {
            isFirstGroupCell: true,
            isLastGroupCell: correctedGroupCount === 0
          })], _toConsumableArray(correctedGroupList.map(function (groups, index) {
            return _extends({}, cell, {
              groups: groups,
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
          currentViewDataMap: currentViewDataMap
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
            cellData: cellData,
            position: {
              rowIndex: rowIndex,
              columnIndex: columnIndex
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
        allDayPanelMap: allDayPanelMap,
        dateTableMap: dateTableMap
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
            isGroupedAllDayPanel: (0, _utils2.getIsGroupedAllDayPanel)(!!isAllDayRow, isVerticalGrouping),
            groupIndex: currentGroupIndex,
            key: (0, _utils2.getKeyByGroup)(currentGroupIndex, isVerticalGrouping)
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
          groupedData: groupedData,
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
        groupedData: groupedData,
        topVirtualRowHeight: topVirtualRowHeight,
        bottomVirtualRowHeight: bottomVirtualRowHeight,
        leftVirtualCellWidth: isProvideVirtualCellsWidth ? leftVirtualCellWidth : undefined,
        rightVirtualCellWidth: isProvideVirtualCellsWidth ? rightVirtualCellWidth : undefined,
        isGroupedAllDayPanel: isGroupedAllDayPanel,
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
      var groupsList = (0, _utils.getAllGroups)(groups);
      var startDate = this.getDateByCellIndices(options, rowIndex, columnIndex, this.getCellCountInDay(startDayHour, endDayHour, hoursInterval));
      var endDate = this.calculateEndDate(startDate, interval, endDayHour);
      var data = {
        startDate: startDate,
        endDate: endDate,
        allDay: this.tableAllDay,
        groupIndex: 0
      };
      if (groupsList.length > 0) {
        data.groups = groupsList[0];
      }
      return data;
    };
    _proto.prepareAllDayCellData = function prepareAllDayCellData(options, rowIndex, columnIndex) {
      var data = this.prepareCellData(options, rowIndex, columnIndex);
      var startDate = _date.default.trimTime(data.startDate);
      return _extends({}, data, {
        startDate: startDate,
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
    };
    _proto.calculateEndDate = function calculateEndDate(startDate, interval, endDayHour) {
      var result = new Date(startDate);
      result.setMilliseconds(result.getMilliseconds() + Math.round(interval));
      return result;
    };
    _proto._calculateCellIndex = function _calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount) {
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
          previousGroupedDataMap: previousGroupedDataMap,
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
        allDayPanelGroupedMap: allDayPanelGroupedMap,
        dateTableGroupedMap: dateTableGroupedMap
      };
    };
    _proto._isFirstGroupCell = function _isFirstGroupCell(rowIndex, columnIndex, options, rowCount, columnCount) {
      var groupOrientation = options.groupOrientation,
          groups = options.groups,
          isGroupedByDate = options.isGroupedByDate;
      var groupCount = (0, _utils.getGroupCount)(groups);
      if (isGroupedByDate) {
        return columnIndex % groupCount === 0;
      }
      if (groupOrientation === _constants.HORIZONTAL_GROUP_ORIENTATION) {
        return columnIndex % columnCount === 0;
      }
      return rowIndex % rowCount === 0;
    };
    _proto._isLastGroupCell = function _isLastGroupCell(rowIndex, columnIndex, options, rowCount, columnCount) {
      var groupOrientation = options.groupOrientation,
          groups = options.groups,
          isGroupedByDate = options.isGroupedByDate;
      var groupCount = (0, _utils.getGroupCount)(groups);
      if (isGroupedByDate) {
        return (columnIndex + 1) % groupCount === 0;
      }
      if (groupOrientation === _constants.HORIZONTAL_GROUP_ORIENTATION) {
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
        return _extends({}, cell, {
          cellData: _extends({}, cell.cellData, {
            isSelected: indexInSelectedCells > -1,
            isFocused: isFocused
          })
        });
      });
    };
    _proto.getInterval = function getInterval(hoursInterval) {
      return hoursInterval * HOUR_MS;
    };
    _proto._getIntervalDuration = function _getIntervalDuration(intervalCount) {
      return _date.default.dateToMilliseconds('day') * intervalCount;
    };
    _proto._setVisibilityDates = function _setVisibilityDates() {};
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
    _createClass(ViewDataGenerator, [{
      key: "daysInInterval",
      get: function get() {
        return 1;
      }
    }, {
      key: "isWorkView",
      get: function get() {
        return false;
      }
    }, {
      key: "tableAllDay",
      get: function get() {
        return false;
      }
    }]);
    return ViewDataGenerator;
  }();
  exports.ViewDataGenerator = ViewDataGenerator;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/date","../../constants","../../resources/utils","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../../../../renovation/ui/scheduler/workspaces/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/date"), require("../../constants"), require("../../resources/utils"), require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"), require("../../../../renovation/ui/scheduler/workspaces/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=view_data_generator.js.map