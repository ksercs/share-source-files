!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/ui/scheduler/model/appointments.js"], ["../../../../ui/scheduler/workspaces/helpers/positionHelper","../../../../ui/scheduler/resources/utils","../workspaces/utils","../../../../core/utils/date","../view_model/to_test/views/utils/base"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/ui/scheduler/model/appointments.js", ["../../../../ui/scheduler/workspaces/helpers/positionHelper", "../../../../ui/scheduler/resources/utils", "../workspaces/utils", "../../../../core/utils/date", "../view_model/to_test/views/utils/base"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.getAppointmentsModel = exports.getAppointmentsConfig = exports.getAppointmentRenderingStrategyName = void 0;
  var _positionHelper = $__require("../../../../ui/scheduler/workspaces/helpers/positionHelper");
  var _utils = $__require("../../../../ui/scheduler/resources/utils");
  var _utils2 = $__require("../workspaces/utils");
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  var _base = $__require("../view_model/to_test/views/utils/base");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  var toMs = function toMs(name) {
    return _date.default.dateToMilliseconds(name);
  };
  var getAppointmentRenderingStrategyName = function getAppointmentRenderingStrategyName(viewType) {
    var appointmentRenderingStrategyMap = {
      day: {
        renderingStrategy: 'vertical'
      },
      week: {
        renderingStrategy: 'week'
      },
      workWeek: {
        renderingStrategy: 'week'
      },
      month: {
        renderingStrategy: 'horizontalMonth'
      },
      timelineDay: {
        renderingStrategy: 'horizontal'
      },
      timelineWeek: {
        renderingStrategy: 'horizontal'
      },
      timelineWorkWeek: {
        renderingStrategy: 'horizontal'
      },
      timelineMonth: {
        renderingStrategy: 'horizontalMonthLine'
      },
      agenda: {
        renderingStrategy: 'agenda'
      }
    };
    var renderingStrategy = appointmentRenderingStrategyMap[viewType].renderingStrategy;
    return renderingStrategy;
  };
  exports.getAppointmentRenderingStrategyName = getAppointmentRenderingStrategyName;
  var getAppointmentsConfig = function getAppointmentsConfig(schedulerConfig, viewConfig, loadedResources, viewDataProvider, isAllDayPanelSupported) {
    var groupCount = (0, _utils.getGroupCount)(loadedResources);
    var startViewDate = viewDataProvider.getStartViewDate();
    var dateRange = [startViewDate, viewDataProvider.getLastViewDateByEndDayHour(viewConfig.endDayHour)];
    return {
      adaptivityEnabled: schedulerConfig.adaptivityEnabled,
      rtlEnabled: schedulerConfig.rtlEnabled,
      resources: schedulerConfig.resources,
      timeZone: schedulerConfig.timeZone,
      groups: schedulerConfig.groups,
      startDayHour: viewConfig.startDayHour,
      viewStartDayHour: viewConfig.startDayHour,
      endDayHour: viewConfig.endDayHour,
      viewEndDayHour: viewConfig.endDayHour,
      currentDate: viewConfig.currentDate,
      isVirtualScrolling: viewConfig.scrolling.mode === 'virtual',
      intervalCount: viewConfig.intervalCount,
      hoursInterval: viewConfig.hoursInterval,
      showAllDayPanel: viewConfig.showAllDayPanel,
      allDayPanelMode: viewConfig.allDayPanelMode,
      supportAllDayRow: isAllDayPanelSupported,
      groupOrientation: viewDataProvider.getViewOptions().groupOrientation,
      firstDayOfWeek: viewConfig.firstDayOfWeek,
      viewType: viewConfig.type,
      cellDurationInMinutes: viewConfig.cellDuration,
      maxAppointmentsPerCell: viewConfig.maxAppointmentsPerCell,
      isVerticalGroupOrientation: viewDataProvider.getViewOptions().isVerticalGrouping,
      groupByDate: viewDataProvider.getViewOptions().isGroupedByDate,
      startViewDate: startViewDate,
      loadedResources: loadedResources,
      appointmentCountPerCell: 2,
      appointmentOffset: 26,
      allowResizing: false,
      allowAllDayResizing: false,
      dateTableOffset: 0,
      groupCount: groupCount,
      dateRange: dateRange
    };
  };
  exports.getAppointmentsConfig = getAppointmentsConfig;
  var getAppointmentsModel = function getAppointmentsModel(appointmentsConfig, viewDataProvider, timeZoneCalculator, dataAccessors, cellsMetaData) {
    var groupedByDate = (0, _utils2.isGroupingByDate)(appointmentsConfig.groups, appointmentsConfig.groupOrientation, appointmentsConfig.groupByDate);
    var groupCount = appointmentsConfig.groupCount,
        isVerticalGroupOrientation = appointmentsConfig.isVerticalGroupOrientation;
    var positionHelper = new _positionHelper.PositionHelper({
      viewDataProvider: viewDataProvider,
      groupedByDate: groupedByDate,
      rtlEnabled: appointmentsConfig.rtlEnabled,
      groupCount: groupCount,
      isVerticalGrouping: groupCount && isVerticalGroupOrientation,
      getDOMMetaDataCallback: function getDOMMetaDataCallback() {
        return cellsMetaData;
      }
    });
    var isGroupedAllDayPanel = (0, _base.calculateIsGroupedAllDayPanel)(appointmentsConfig.loadedResources, appointmentsConfig.groupOrientation, appointmentsConfig.showAllDayPanel);
    var rowCount = viewDataProvider.getRowCount({
      intervalCount: appointmentsConfig.intervalCount,
      currentDate: appointmentsConfig.currentDate,
      viewType: appointmentsConfig.viewType,
      hoursInterval: appointmentsConfig.hoursInterval,
      startDayHour: appointmentsConfig.startDayHour,
      endDayHour: appointmentsConfig.endDayHour
    });
    var allDayHeight = (0, _positionHelper.getAllDayHeight)(appointmentsConfig.showAllDayPanel, appointmentsConfig.isVerticalGroupOrientation, cellsMetaData);
    var endViewDate = viewDataProvider.getLastCellEndDate();
    var visibleDayDuration = viewDataProvider.getVisibleDayDuration(appointmentsConfig.startDayHour, appointmentsConfig.endDayHour, appointmentsConfig.hoursInterval);
    var _viewDataProvider$get = viewDataProvider.getViewOptions(),
        leftVirtualCellCount = _viewDataProvider$get.startCellIndex,
        topVirtualRowCount = _viewDataProvider$get.startRowIndex;
    var cellDuration = (0, _base.getCellDuration)(appointmentsConfig.viewType, appointmentsConfig.startDayHour, appointmentsConfig.endDayHour, appointmentsConfig.hoursInterval);
    var appointmentRenderingStrategyName = getAppointmentRenderingStrategyName(appointmentsConfig.viewType);
    return _extends({}, appointmentsConfig, {
      appointmentRenderingStrategyName: appointmentRenderingStrategyName,
      loadedResources: appointmentsConfig.loadedResources,
      dataAccessors: dataAccessors,
      timeZoneCalculator: timeZoneCalculator,
      viewDataProvider: viewDataProvider,
      positionHelper: positionHelper,
      isGroupedAllDayPanel: isGroupedAllDayPanel,
      rowCount: rowCount,
      cellWidth: (0, _positionHelper.getCellWidth)(cellsMetaData),
      cellHeight: (0, _positionHelper.getCellHeight)(cellsMetaData),
      allDayHeight: allDayHeight,
      isGroupedByDate: groupedByDate,
      endViewDate: endViewDate,
      visibleDayDuration: visibleDayDuration,
      intervalDuration: cellDuration,
      allDayIntervalDuration: toMs('day'),
      leftVirtualCellCount: leftVirtualCellCount,
      topVirtualCellCount: topVirtualRowCount,
      cellDuration: cellDuration,
      resizableStep: positionHelper.getResizableStep(),
      DOMMetaData: cellsMetaData
    });
  };
  exports.getAppointmentsModel = getAppointmentsModel;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../ui/scheduler/workspaces/helpers/positionHelper","../../../../ui/scheduler/resources/utils","../workspaces/utils","../../../../core/utils/date","../view_model/to_test/views/utils/base"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../ui/scheduler/workspaces/helpers/positionHelper"), require("../../../../ui/scheduler/resources/utils"), require("../workspaces/utils"), require("../../../../core/utils/date"), require("../view_model/to_test/views/utils/base"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=appointments.js.map