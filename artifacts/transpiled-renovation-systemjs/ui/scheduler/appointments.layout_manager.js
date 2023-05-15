!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/appointments.layout_manager.js"], ["../../core/utils/common","./appointments/viewModelGenerator","./resources/utils","./workspaces/helpers/positionHelper","../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../../renovation/ui/scheduler/model/appointments"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/appointments.layout_manager.js", ["../../core/utils/common", "./appointments/viewModelGenerator", "./resources/utils", "./workspaces/helpers/positionHelper", "../../renovation/ui/scheduler/view_model/to_test/views/utils/base", "../../renovation/ui/scheduler/model/appointments"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _common = $__require("../../core/utils/common");
  var _viewModelGenerator = $__require("./appointments/viewModelGenerator");
  var _utils = $__require("./resources/utils");
  var _positionHelper = $__require("./workspaces/helpers/positionHelper");
  var _base = $__require("../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  var _appointments = $__require("../../renovation/ui/scheduler/model/appointments");
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
  var AppointmentLayoutManager = /*#__PURE__*/function () {
    function AppointmentLayoutManager(instance) {
      this.instance = instance;
      this.appointmentViewModel = new _viewModelGenerator.AppointmentViewModelGenerator();
    }
    var _proto = AppointmentLayoutManager.prototype;
    _proto.getCellDimensions = function getCellDimensions(options) {
      if (this.instance._workSpace) {
        return {
          width: this.instance._workSpace.getCellWidth(),
          height: this.instance._workSpace.getCellHeight(),
          allDayHeight: this.instance._workSpace.getAllDayHeight()
        };
      }
    };
    _proto._getRenderingStrategyOptions = function _getRenderingStrategyOptions() {
      var workspace = this.instance.getWorkSpace();
      var _this$instance$getWor = this.instance.getWorkSpace(),
          virtualScrollingDispatcher = _this$instance$getWor.virtualScrollingDispatcher;
      var cellCountInsideLeftVirtualCell = virtualScrollingDispatcher.cellCountInsideLeftVirtualCell,
          cellCountInsideTopVirtualRow = virtualScrollingDispatcher.cellCountInsideTopVirtualRow;
      var groupCount = (0, _utils.getGroupCount)(this.instance.option('loadedResources'));
      var DOMMetaData = workspace.getDOMElementsMetaData();
      var allDayHeight = (0, _positionHelper.getAllDayHeight)(workspace.option('showAllDayPanel'), workspace._isVerticalGroupedWorkSpace(), DOMMetaData);
      var rowCount = workspace._getRowCount();
      var positionHelper = workspace.positionHelper,
          viewDataProvider = workspace.viewDataProvider;
      var visibleDayDuration = viewDataProvider.getVisibleDayDuration(workspace.option('startDayHour'), workspace.option('endDayHour'), workspace.option('hoursInterval'));
      var cellDuration = (0, _base.getCellDuration)(workspace.type, workspace.option('startDayHour'), workspace.option('endDayHour'), workspace.option('hoursInterval'));
      return {
        resources: this.instance.option('resources'),
        loadedResources: this.instance.option('loadedResources'),
        getAppointmentColor: this.instance.createGetAppointmentColor(),
        dataAccessors: this.instance._dataAccessors,
        isRenovatedAppointments: this.instance.option('isRenovatedAppointments'),
        appointmentRenderingStrategyName: this.appointmentRenderingStrategyName,
        adaptivityEnabled: this.instance.option('adaptivityEnabled'),
        rtlEnabled: this.instance.option('rtlEnabled'),
        startDayHour: this.instance._getCurrentViewOption('startDayHour'),
        endDayHour: this.instance._getCurrentViewOption('endDayHour'),
        maxAppointmentsPerCell: this.instance._getCurrentViewOption('maxAppointmentsPerCell'),
        currentDate: this.instance.option('currentDate'),
        isVirtualScrolling: this.instance.isVirtualScrolling(),
        leftVirtualCellCount: cellCountInsideLeftVirtualCell,
        topVirtualCellCount: cellCountInsideTopVirtualRow,
        intervalCount: workspace.option('intervalCount'),
        hoursInterval: workspace.option('hoursInterval'),
        showAllDayPanel: workspace.option('showAllDayPanel'),
        isGroupedAllDayPanel: workspace.isGroupedAllDayPanel(),
        groups: this.instance._getCurrentViewOption('groups'),
        groupCount: groupCount,
        rowCount: rowCount,
        appointmentCountPerCell: this.instance.option('_appointmentCountPerCell'),
        appointmentOffset: this.instance.option('_appointmentOffset'),
        allowResizing: this.instance._allowResizing(),
        allowAllDayResizing: this.instance._allowAllDayResizing(),
        startViewDate: workspace.getStartViewDate(),
        groupOrientation: workspace._getRealGroupOrientation(),
        cellWidth: (0, _positionHelper.getCellWidth)(DOMMetaData),
        cellHeight: (0, _positionHelper.getCellHeight)(DOMMetaData),
        allDayHeight: allDayHeight,
        resizableStep: positionHelper.getResizableStep(),
        visibleDayDuration: visibleDayDuration,
        allDayPanelMode: this.instance._getCurrentViewOption('allDayPanelMode'),
        // appointment settings
        timeZoneCalculator: this.instance.timeZoneCalculator,
        timeZone: this.instance.option('timeZone'),
        firstDayOfWeek: this.instance.getFirstDayOfWeek(),
        viewStartDayHour: this.instance._getCurrentViewOption('startDayHour'),
        viewEndDayHour: this.instance._getCurrentViewOption('endDayHour'),
        viewType: workspace.type,
        endViewDate: workspace.getEndViewDate(),
        positionHelper: positionHelper,
        isGroupedByDate: workspace.isGroupedByDate(),
        cellDuration: cellDuration,
        cellDurationInMinutes: workspace.option('cellDuration'),
        viewDataProvider: workspace.viewDataProvider,
        supportAllDayRow: workspace.supportAllDayRow(),
        dateRange: workspace.getDateRange(),
        intervalDuration: workspace.getIntervalDuration(),
        allDayIntervalDuration: workspace.getIntervalDuration(true),
        isVerticalGroupOrientation: workspace.isVerticalOrientation(),
        DOMMetaData: DOMMetaData,
        // agenda only
        instance: this.instance,
        agendaDuration: workspace.option('agendaDuration')
      };
    };
    _proto.createAppointmentsMap = function createAppointmentsMap(items) {
      var renderingStrategyOptions = this._getRenderingStrategyOptions();
      var _this$appointmentView = this.appointmentViewModel.generate(items, renderingStrategyOptions),
          viewModel = _this$appointmentView.viewModel,
          positionMap = _this$appointmentView.positionMap;
      this._positionMap = positionMap; // TODO get rid of this after remove old render

      return viewModel;
    };
    _proto._isDataChanged = function _isDataChanged(data) {
      var appointmentDataProvider = this.instance.appointmentDataProvider;
      var updatedData = appointmentDataProvider.getUpdatedAppointment();
      return updatedData === data || appointmentDataProvider.getUpdatedAppointmentKeys().some(function (item) {
        return data[item.key] === item.value;
      });
    };
    _proto._isAppointmentShouldAppear = function _isAppointmentShouldAppear(currentAppointment, sourceAppointment) {
      return currentAppointment.needRepaint && sourceAppointment.needRemove;
    };
    _proto._isSettingChanged = function _isSettingChanged(settings, sourceSetting) {
      if (settings.length !== sourceSetting.length) {
        return true;
      }
      var createSettingsToCompare = function createSettingsToCompare(settings, index) {
        var currentSetting = settings[index];
        var leftVirtualCellCount = currentSetting.leftVirtualCellCount || 0;
        var topVirtualCellCount = currentSetting.topVirtualCellCount || 0;
        var columnIndex = currentSetting.columnIndex + leftVirtualCellCount;
        var rowIndex = currentSetting.rowIndex + topVirtualCellCount;
        var hMax = currentSetting.reduced ? currentSetting.hMax : undefined;
        var vMax = currentSetting.reduced ? currentSetting.vMax : undefined;
        return _extends({}, currentSetting, {
          columnIndex: columnIndex,
          rowIndex: rowIndex,
          positionByMap: undefined,
          topVirtualCellCount: undefined,
          leftVirtualCellCount: undefined,
          leftVirtualWidth: undefined,
          topVirtualHeight: undefined,
          hMax: hMax,
          vMax: vMax,
          info: {}
        });
      };
      for (var i = 0; i < settings.length; i++) {
        var newSettings = createSettingsToCompare(settings, i);
        var oldSettings = createSettingsToCompare(sourceSetting, i);
        if (oldSettings) {
          // exclude sortedIndex property for comparison in commonUtils.equalByValue
          oldSettings.sortedIndex = newSettings.sortedIndex;
        }
        if (!(0, _common.equalByValue)(newSettings, oldSettings)) {
          return true;
        }
      }
      return false;
    };
    _proto._getAssociatedSourceAppointment = function _getAssociatedSourceAppointment(currentAppointment, sourceAppointments) {
      for (var i = 0; i < sourceAppointments.length; i++) {
        var item = sourceAppointments[i];
        if (item.itemData === currentAppointment.itemData) {
          return item;
        }
      }
      return null;
    };
    _proto._getDeletedAppointments = function _getDeletedAppointments(currentAppointments, sourceAppointments) {
      var result = [];
      for (var i = 0; i < sourceAppointments.length; i++) {
        var sourceAppointment = sourceAppointments[i];
        var currentAppointment = this._getAssociatedSourceAppointment(sourceAppointment, currentAppointments);
        if (!currentAppointment) {
          sourceAppointment.needRemove = true;
          result.push(sourceAppointment);
        }
      }
      return result;
    };
    _proto.getRepaintedAppointments = function getRepaintedAppointments(currentAppointments, sourceAppointments) {
      var _this = this;
      if (sourceAppointments.length === 0 || this.appointmentRenderingStrategyName === 'agenda') {
        return currentAppointments;
      }
      currentAppointments.forEach(function (appointment) {
        var sourceAppointment = _this._getAssociatedSourceAppointment(appointment, sourceAppointments);
        if (sourceAppointment) {
          var isDataChanged = _this._isDataChanged(appointment.itemData);
          var isSettingChanged = _this._isSettingChanged(appointment.settings, sourceAppointment.settings);
          var isAppointmentShouldAppear = _this._isAppointmentShouldAppear(appointment, sourceAppointment);
          appointment.needRepaint = isDataChanged || isSettingChanged || isAppointmentShouldAppear;
        }
      });
      return currentAppointments.concat(this._getDeletedAppointments(currentAppointments, sourceAppointments));
    };
    _proto.getRenderingStrategyInstance = function getRenderingStrategyInstance() {
      var renderingStrategy = this.appointmentViewModel.getRenderingStrategy();
      if (!renderingStrategy) {
        var options = this._getRenderingStrategyOptions();
        this.appointmentViewModel.initRenderingStrategy(options);
      }
      return this.appointmentViewModel.getRenderingStrategy();
    };
    _createClass(AppointmentLayoutManager, [{
      key: "appointmentRenderingStrategyName",
      get: function get() {
        return (0, _appointments.getAppointmentRenderingStrategyName)(this.instance.currentViewType);
      }
    }]);
    return AppointmentLayoutManager;
  }();
  var _default = AppointmentLayoutManager;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/common","./appointments/viewModelGenerator","./resources/utils","./workspaces/helpers/positionHelper","../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../../renovation/ui/scheduler/model/appointments"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/common"), require("./appointments/viewModelGenerator"), require("./resources/utils"), require("./workspaces/helpers/positionHelper"), require("../../renovation/ui/scheduler/view_model/to_test/views/utils/base"), require("../../renovation/ui/scheduler/model/appointments"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=appointments.layout_manager.js.map