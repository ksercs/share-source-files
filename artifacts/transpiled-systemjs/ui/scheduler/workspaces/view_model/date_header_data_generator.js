!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/workspaces/view_model/date_header_data_generator.js"], ["../../../../core/utils/date","../../resources/utils","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/workspaces/view_model/date_header_data_generator.js", ["../../../../core/utils/date", "../../resources/utils", "../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.DateHeaderDataGenerator = void 0;
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  var _utils = $__require("../../resources/utils");
  var _base = $__require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  var _excluded = ["startDate", "endDate", "isFirstGroupCell", "isLastGroupCell"];
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  var DateHeaderDataGenerator = /*#__PURE__*/function () {
    function DateHeaderDataGenerator(viewDataGenerator) {
      this._viewDataGenerator = viewDataGenerator;
    }
    var _proto = DateHeaderDataGenerator.prototype;
    _proto.getCompleteDateHeaderMap = function getCompleteDateHeaderMap(options, completeViewDataMap) {
      var isGenerateWeekDaysHeaderData = options.isGenerateWeekDaysHeaderData;
      var result = [];
      if (isGenerateWeekDaysHeaderData) {
        var weekDaysRow = this._generateWeekDaysHeaderRowMap(options, completeViewDataMap);
        result.push(weekDaysRow);
      }
      var dateRow = this._generateHeaderDateRow(options, completeViewDataMap);
      result.push(dateRow);
      return result;
    };
    _proto._generateWeekDaysHeaderRowMap = function _generateWeekDaysHeaderRowMap(options, completeViewDataMap) {
      var isGroupedByDate = options.isGroupedByDate,
          groups = options.groups,
          groupOrientation = options.groupOrientation,
          startDayHour = options.startDayHour,
          endDayHour = options.endDayHour,
          hoursInterval = options.hoursInterval,
          isHorizontalGrouping = options.isHorizontalGrouping,
          intervalCount = options.intervalCount;
      var cellCountInDay = this._viewDataGenerator.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
      var horizontalGroupCount = (0, _base.getHorizontalGroupCount)(groups, groupOrientation);
      var index = completeViewDataMap[0][0].allDay ? 1 : 0;
      var colSpan = isGroupedByDate ? horizontalGroupCount * cellCountInDay : cellCountInDay;
      var groupCount = (0, _utils.getGroupCount)(groups);
      var datesRepeatCount = isHorizontalGrouping && !isGroupedByDate ? groupCount : 1;
      var daysInGroup = this._viewDataGenerator.daysInInterval * intervalCount;
      var daysInView = daysInGroup * datesRepeatCount;
      var weekDaysRow = [];
      for (var dayIndex = 0; dayIndex < daysInView; dayIndex += 1) {
        var cell = completeViewDataMap[index][dayIndex * colSpan];
        weekDaysRow.push(_extends({}, cell, {
          colSpan: colSpan,
          text: (0, _base.formatWeekdayAndDay)(cell.startDate),
          isFirstGroupCell: false,
          isLastGroupCell: false
        }));
      }
      return weekDaysRow;
    };
    _proto._generateHeaderDateRow = function _generateHeaderDateRow(options, completeViewDataMap) {
      var today = options.today,
          isGroupedByDate = options.isGroupedByDate,
          groupOrientation = options.groupOrientation,
          groups = options.groups,
          headerCellTextFormat = options.headerCellTextFormat,
          getDateForHeaderText = options.getDateForHeaderText,
          interval = options.interval,
          startViewDate = options.startViewDate,
          startDayHour = options.startDayHour,
          endDayHour = options.endDayHour,
          hoursInterval = options.hoursInterval,
          intervalCount = options.intervalCount,
          currentDate = options.currentDate,
          viewType = options.viewType;
      var horizontalGroupCount = (0, _base.getHorizontalGroupCount)(groups, groupOrientation);
      var index = completeViewDataMap[0][0].allDay ? 1 : 0;
      var colSpan = isGroupedByDate ? horizontalGroupCount : 1;
      var isVerticalGrouping = groupOrientation === 'vertical';
      var cellCountInGroupRow = this._viewDataGenerator.getCellCount({
        intervalCount: intervalCount,
        currentDate: currentDate,
        viewType: viewType,
        hoursInterval: hoursInterval,
        startDayHour: startDayHour,
        endDayHour: endDayHour
      });
      var cellCountInDay = this._viewDataGenerator.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
      var slicedByColumnsData = isGroupedByDate ? completeViewDataMap[index].filter(function (_, columnIndex) {
        return columnIndex % horizontalGroupCount === 0;
      }) : completeViewDataMap[index];
      return slicedByColumnsData.map(function (_ref, index) {
        var startDate = _ref.startDate,
            endDate = _ref.endDate,
            isFirstGroupCell = _ref.isFirstGroupCell,
            isLastGroupCell = _ref.isLastGroupCell,
            restProps = _objectWithoutProperties(_ref, _excluded);
        var text = (0, _base.getHeaderCellText)(index % cellCountInGroupRow, startDate, headerCellTextFormat, getDateForHeaderText, {
          interval: interval,
          startViewDate: startViewDate,
          startDayHour: startDayHour,
          cellCountInDay: cellCountInDay
        });
        return _extends({}, restProps, {
          startDate: startDate,
          text: text,
          today: _date.default.sameDate(startDate, today),
          colSpan: colSpan,
          isFirstGroupCell: isGroupedByDate || isFirstGroupCell && !isVerticalGrouping,
          isLastGroupCell: isGroupedByDate || isLastGroupCell && !isVerticalGrouping
        });
      });
    };
    _proto.generateDateHeaderData = function generateDateHeaderData(completeDateHeaderMap, completeViewDataMap, options) {
      var isGenerateWeekDaysHeaderData = options.isGenerateWeekDaysHeaderData,
          cellWidth = options.cellWidth,
          isProvideVirtualCellsWidth = options.isProvideVirtualCellsWidth,
          startDayHour = options.startDayHour,
          endDayHour = options.endDayHour,
          hoursInterval = options.hoursInterval,
          isMonthDateHeader = options.isMonthDateHeader;
      var dataMap = [];
      var weekDayRowConfig = {};
      var validCellWidth = cellWidth || 0;
      if (isGenerateWeekDaysHeaderData) {
        weekDayRowConfig = this._generateDateHeaderDataRow(options, completeDateHeaderMap, completeViewDataMap, this._viewDataGenerator.getCellCountInDay(startDayHour, endDayHour, hoursInterval), 0, validCellWidth);
        dataMap.push(weekDayRowConfig.dateRow);
      }
      var datesRowConfig = this._generateDateHeaderDataRow(options, completeDateHeaderMap, completeViewDataMap, 1, isGenerateWeekDaysHeaderData ? 1 : 0, validCellWidth);
      dataMap.push(datesRowConfig.dateRow);
      return {
        dataMap: dataMap,
        leftVirtualCellWidth: isProvideVirtualCellsWidth ? datesRowConfig.leftVirtualCellWidth : undefined,
        rightVirtualCellWidth: isProvideVirtualCellsWidth ? datesRowConfig.rightVirtualCellWidth : undefined,
        leftVirtualCellCount: datesRowConfig.leftVirtualCellCount,
        rightVirtualCellCount: datesRowConfig.rightVirtualCellCount,
        weekDayLeftVirtualCellWidth: weekDayRowConfig.leftVirtualCellWidth,
        weekDayRightVirtualCellWidth: weekDayRowConfig.rightVirtualCellWidth,
        weekDayLeftVirtualCellCount: weekDayRowConfig.leftVirtualCellCount,
        weekDayRightVirtualCellCount: weekDayRowConfig.rightVirtualCellCount,
        isMonthDateHeader: isMonthDateHeader
      };
    };
    _proto._generateDateHeaderDataRow = function _generateDateHeaderDataRow(options, completeDateHeaderMap, completeViewDataMap, baseColSpan, rowIndex, cellWidth) {
      var startCellIndex = options.startCellIndex,
          cellCount = options.cellCount,
          isProvideVirtualCellsWidth = options.isProvideVirtualCellsWidth,
          groups = options.groups,
          groupOrientation = options.groupOrientation,
          isGroupedByDate = options.isGroupedByDate;
      var horizontalGroupCount = (0, _base.getHorizontalGroupCount)(groups, groupOrientation);
      var colSpan = isGroupedByDate ? horizontalGroupCount * baseColSpan : baseColSpan;
      var leftVirtualCellCount = Math.floor(startCellIndex / colSpan);
      var displayedCellCount = (0, _base.getDisplayedCellCount)(cellCount, completeViewDataMap);
      var actualCellCount = Math.ceil((startCellIndex + displayedCellCount) / colSpan);
      var totalCellCount = (0, _base.getTotalCellCountByCompleteData)(completeViewDataMap);
      var dateRow = completeDateHeaderMap[rowIndex].slice(leftVirtualCellCount, actualCellCount);
      var finalLeftVirtualCellCount = leftVirtualCellCount * colSpan;
      var finalLeftVirtualCellWidth = finalLeftVirtualCellCount * cellWidth;
      var finalRightVirtualCellCount = totalCellCount - actualCellCount * colSpan;
      var finalRightVirtualCellWidth = finalRightVirtualCellCount * cellWidth;
      return {
        dateRow: dateRow,
        leftVirtualCellCount: finalLeftVirtualCellCount,
        leftVirtualCellWidth: isProvideVirtualCellsWidth ? finalLeftVirtualCellWidth : undefined,
        rightVirtualCellCount: finalRightVirtualCellCount,
        rightVirtualCellWidth: isProvideVirtualCellsWidth ? finalRightVirtualCellWidth : undefined
      };
    };
    return DateHeaderDataGenerator;
  }();
  exports.DateHeaderDataGenerator = DateHeaderDataGenerator;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/date","../../resources/utils","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/date"), require("../../resources/utils"), require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=date_header_data_generator.js.map