!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/workspaces/view_model/view_data_provider.js"], ["../../../../core/utils/date","../../../../renovation/ui/scheduler/view_model/group_panel/utils","../../../../renovation/ui/scheduler/workspaces/utils","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","./date_header_data_generator","./grouped_data_map_provider","./time_panel_data_generator","./utils","../../utils.timeZone"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/workspaces/view_model/view_data_provider.js", ["../../../../core/utils/date", "../../../../renovation/ui/scheduler/view_model/group_panel/utils", "../../../../renovation/ui/scheduler/workspaces/utils", "../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base", "./date_header_data_generator", "./grouped_data_map_provider", "./time_panel_data_generator", "./utils", "../../utils.timeZone"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  var _utils = $__require("../../../../renovation/ui/scheduler/view_model/group_panel/utils");
  var _utils2 = $__require("../../../../renovation/ui/scheduler/workspaces/utils");
  var _base = $__require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  var _date_header_data_generator = $__require("./date_header_data_generator");
  var _grouped_data_map_provider = $__require("./grouped_data_map_provider");
  var _time_panel_data_generator = $__require("./time_panel_data_generator");
  var _utils3 = $__require("./utils");
  var _utils4 = _interopRequireDefault($__require("../../utils.timeZone"));
  var _excluded = ["groups", "groupOrientation", "groupByDate", "isAllDayPanelVisible"];
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
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];
      }
    }return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];
    }return target;
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
  var ViewDataProvider = /*#__PURE__*/function () {
    function ViewDataProvider(viewType) {
      this.viewDataGenerator = (0, _utils3.getViewDataGeneratorByViewType)(viewType);
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
      this.viewDataGenerator = (0, _utils3.getViewDataGeneratorByViewType)(options.viewType);
      var viewDataGenerator = this.viewDataGenerator;
      var dateHeaderDataGenerator = new _date_header_data_generator.DateHeaderDataGenerator(viewDataGenerator);
      var timePanelDataGenerator = new _time_panel_data_generator.TimePanelDataGenerator(viewDataGenerator);
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
      this._groupedDataMapProvider = new _grouped_data_map_provider.GroupedDataMapProvider(this.viewDataGenerator, this.viewDataMap, this.completeViewDataMap, {
        isVerticalGrouping: renderOptions.isVerticalGrouping,
        viewType: renderOptions.viewType
      });
      this.dateHeaderData = dateHeaderDataGenerator.generateDateHeaderData(this.completeDateHeaderMap, this.completeViewDataMap, renderOptions);
      if (renderOptions.isGenerateTimePanelData) {
        this.timePanelData = timePanelDataGenerator.generateTimePanelData(this.completeTimePanelMap, renderOptions);
      }
    };
    _proto.createGroupedDataMapProvider = function createGroupedDataMapProvider() {
      this._groupedDataMapProvider = new _grouped_data_map_provider.GroupedDataMapProvider(this.viewDataGenerator, this.viewDataMap, this.completeViewDataMap, {
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
          restOptions = _objectWithoutProperties(renderOptions, _excluded);
      return _extends({}, restOptions, {
        startViewDate: this.viewDataGenerator._calculateStartViewDate(renderOptions),
        isVerticalGrouping: (0, _utils2.isVerticalGroupingApplied)(groups, groupOrientation),
        isHorizontalGrouping: (0, _utils2.isHorizontalGroupingApplied)(groups, groupOrientation),
        isGroupedByDate: (0, _utils2.isGroupingByDate)(groups, groupOrientation, groupByDate),
        isGroupedAllDayPanel: (0, _base.calculateIsGroupedAllDayPanel)(groups, groupOrientation, isAllDayPanelVisible),
        groups: groups,
        groupOrientation: groupOrientation,
        isAllDayPanelVisible: isAllDayPanelVisible
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
      var _this$groupedDataMap$2;
      if (this._options.isVerticalGrouping) {
        var _this$groupedDataMap$;
        return !!((_this$groupedDataMap$ = this.groupedDataMap.dateTableGroupedMap[groupIndex]) !== null && _this$groupedDataMap$ !== void 0 && _this$groupedDataMap$[0][0].cellData.allDay);
      }
      return ((_this$groupedDataMap$2 = this.groupedDataMap.allDayPanelGroupedMap[groupIndex]) === null || _this$groupedDataMap$2 === void 0 ? void 0 : _this$groupedDataMap$2.length) > 0;
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
                columnIndex: columnIndex,
                rowIndex: showAllDayPanel && !this._options.isVerticalGrouping ? rowIndex - 1 : rowIndex
              },
              cellData: cellData
            };
          }
        }
      }
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
          firstColumnIndex: firstColumnIndex,
          lastColumnIndex: lastColumnIndex,
          firstRowIndex: 0,
          lastRowIndex: 0
        };
      }
      return {
        firstColumnIndex: firstColumnIndex,
        lastColumnIndex: lastColumnIndex,
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
      var daylightDiff = _utils4.default.getDaylightOffsetInMs(startDate, endDate);
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
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/date","../../../../renovation/ui/scheduler/view_model/group_panel/utils","../../../../renovation/ui/scheduler/workspaces/utils","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","./date_header_data_generator","./grouped_data_map_provider","./time_panel_data_generator","./utils","../../utils.timeZone"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/date"), require("../../../../renovation/ui/scheduler/view_model/group_panel/utils"), require("../../../../renovation/ui/scheduler/workspaces/utils"), require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"), require("./date_header_data_generator"), require("./grouped_data_map_provider"), require("./time_panel_data_generator"), require("./utils"), require("../../utils.timeZone"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=view_data_provider.js.map