!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/workspaces/view_model/time_panel_data_generator.js"], ["../../../../renovation/ui/scheduler/workspaces/utils","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/week"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/workspaces/view_model/time_panel_data_generator.js", ["../../../../renovation/ui/scheduler/workspaces/utils", "../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base", "../../../../renovation/ui/scheduler/view_model/to_test/views/utils/week"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.TimePanelDataGenerator = void 0;
  var _utils = $__require("../../../../renovation/ui/scheduler/workspaces/utils");
  var _base = $__require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  var _week = $__require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/week");
  var _excluded = ["allDay", "startDate", "endDate", "groups", "groupIndex", "isFirstGroupCell", "isLastGroupCell", "index"];
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
  var TimePanelDataGenerator = /*#__PURE__*/function () {
    function TimePanelDataGenerator(viewDataGenerator) {
      this._viewDataGenerator = viewDataGenerator;
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
        intervalCount: intervalCount,
        currentDate: currentDate,
        viewType: viewType,
        hoursInterval: hoursInterval,
        startDayHour: startDayHour,
        endDayHour: endDayHour
      });
      var cellCountInGroupRow = this._viewDataGenerator.getCellCount({
        intervalCount: intervalCount,
        currentDate: currentDate,
        viewType: viewType,
        hoursInterval: hoursInterval,
        startDayHour: startDayHour,
        endDayHour: endDayHour
      });
      var allDayRowsCount = 0;
      return completeViewDataMap.map(function (row, index) {
        var _row$ = row[0],
            allDay = _row$.allDay,
            startDate = _row$.startDate,
            endDate = _row$.endDate,
            groups = _row$.groups,
            groupIndex = _row$.groupIndex,
            isFirstGroupCell = _row$.isFirstGroupCell,
            isLastGroupCell = _row$.isLastGroupCell,
            cellIndex = _row$.index,
            restCellProps = _objectWithoutProperties(_row$, _excluded);
        if (allDay) {
          allDayRowsCount += 1;
        }
        var timeIndex = (index - allDayRowsCount) % rowCountInGroup;
        return _extends({}, restCellProps, {
          startDate: startDate,
          allDay: allDay,
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
        topVirtualRowHeight: topVirtualRowHeight,
        bottomVirtualRowHeight: bottomVirtualRowHeight,
        isGroupedAllDayPanel: isGroupedAllDayPanel
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
          previousGroupedData: previousGroupedData
        };
      }, {
        previousGroupIndex: -1,
        previousGroupedData: []
      });
    };
    return TimePanelDataGenerator;
  }();
  exports.TimePanelDataGenerator = TimePanelDataGenerator;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../renovation/ui/scheduler/workspaces/utils","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/week"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../renovation/ui/scheduler/workspaces/utils"), require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"), require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/week"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=time_panel_data_generator.js.map