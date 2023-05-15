!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/appointments/dataProvider/appointmentDataProvider.js"], ["../../../../core/config","./appointmentDataSource","./appointmentFilter","../../../../renovation/ui/scheduler/utils/filtering/remote"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/appointments/dataProvider/appointmentDataProvider.js", ["../../../../core/config", "./appointmentDataSource", "./appointmentFilter", "../../../../renovation/ui/scheduler/utils/filtering/remote"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.AppointmentDataProvider = void 0;
  var _config = _interopRequireDefault($__require("../../../../core/config"));
  var _appointmentDataSource = $__require("./appointmentDataSource");
  var _appointmentFilter = $__require("./appointmentFilter");
  var _remote = _interopRequireDefault($__require("../../../../renovation/ui/scheduler/utils/filtering/remote"));
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
  var FilterStrategies = {
    virtual: 'virtual',
    standard: 'standard'
  };
  var AppointmentDataProvider = /*#__PURE__*/function () {
    function AppointmentDataProvider(options) {
      this.options = options;
      this.dataSource = this.options.dataSource;
      this.dataAccessors = this.options.dataAccessors;
      this.timeZoneCalculator = this.options.timeZoneCalculator;
      this.appointmentDataSource = new _appointmentDataSource.AppointmentDataSource(this.dataSource);
      this.initFilterStrategy();
    }
    var _proto = AppointmentDataProvider.prototype;
    _proto.getFilterStrategy = function getFilterStrategy() {
      if (!this.filterStrategy || this.filterStrategy.strategyName !== this.filterStrategyName) {
        this.initFilterStrategy();
      }
      return this.filterStrategy;
    };
    _proto.initFilterStrategy = function initFilterStrategy() {
      var filterOptions = {
        resources: this.options.resources,
        dataAccessors: this.dataAccessors,
        startDayHour: this.options.startDayHour,
        endDayHour: this.options.endDayHour,
        showAllDayPanel: this.options.showAllDayPanel,
        timeZoneCalculator: this.options.timeZoneCalculator,
        //
        loadedResources: this.options.getLoadedResources,
        supportAllDayRow: this.options.getSupportAllDayRow,
        viewType: this.options.getViewType,
        viewDirection: this.options.getViewDirection,
        dateRange: this.options.getDateRange,
        groupCount: this.options.getGroupCount,
        viewDataProvider: this.options.getViewDataProvider,
        allDayPanelMode: this.options.allDayPanelMode
      };
      this.filterStrategy = this.filterStrategyName === FilterStrategies.virtual ? new _appointmentFilter.AppointmentFilterVirtualStrategy(filterOptions) : new _appointmentFilter.AppointmentFilterBaseStrategy(filterOptions);
    };
    _proto.setDataSource = function setDataSource(dataSource) {
      this.dataSource = dataSource;
      this.initFilterStrategy();
      this.appointmentDataSource.setDataSource(this.dataSource);
    };
    _proto.updateDataAccessors = function updateDataAccessors(dataAccessors) {
      this.dataAccessors = dataAccessors;
      this.initFilterStrategy();
    }

    // Filter mapping
    ;
    _proto.filter = function filter(preparedItems) {
      return this.getFilterStrategy().filter(preparedItems);
    }

    // TODO rename to the setRemoteFilter
    ;
    _proto.filterByDate = function filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
      if (!this.dataSource || !remoteFiltering) {
        return;
      }
      var dataSourceFilter = this.dataSource.filter();
      var filter = (0, _remote.default)({
        dataSourceFilter: dataSourceFilter,
        dataAccessors: this.dataAccessors,
        min: min,
        max: max,
        dateSerializationFormat: dateSerializationFormat,
        forceIsoDateParsing: (0, _config.default)().forceIsoDateParsing
      });
      this.dataSource.filter(filter);
    };
    _proto.hasAllDayAppointments = function hasAllDayAppointments(filteredItems, preparedItems) {
      return this.getFilterStrategy().hasAllDayAppointments(filteredItems, preparedItems);
    };
    _proto.filterLoadedAppointments = function filterLoadedAppointments(filterOption, preparedItems) {
      return this.getFilterStrategy().filterLoadedAppointments(filterOption, preparedItems);
    };
    _proto.calculateAppointmentEndDate = function calculateAppointmentEndDate(isAllDay, startDate) {
      return this.getFilterStrategy().calculateAppointmentEndDate(isAllDay, startDate);
    }

    // Appointment data source mappings
    ;
    _proto.cleanState = function cleanState() {
      this.appointmentDataSource.cleanState();
    };
    _proto.getUpdatedAppointment = function getUpdatedAppointment() {
      return this.appointmentDataSource._updatedAppointment;
    };
    _proto.getUpdatedAppointmentKeys = function getUpdatedAppointmentKeys() {
      return this.appointmentDataSource._updatedAppointmentKeys;
    };
    _proto.add = function add(rawAppointment) {
      return this.appointmentDataSource.add(rawAppointment);
    };
    _proto.update = function update(target, rawAppointment) {
      return this.appointmentDataSource.update(target, rawAppointment);
    };
    _proto.remove = function remove(rawAppointment) {
      return this.appointmentDataSource.remove(rawAppointment);
    };
    _proto.destroy = function destroy() {
      this.appointmentDataSource.destroy();
    };
    _createClass(AppointmentDataProvider, [{
      key: "keyName",
      get: function get() {
        return this.appointmentDataSource.keyName;
      }
    }, {
      key: "filterStrategyName",
      get: function get() {
        return this.options.getIsVirtualScrolling() ? FilterStrategies.virtual : FilterStrategies.standard;
      }
    }]);
    return AppointmentDataProvider;
  }();
  exports.AppointmentDataProvider = AppointmentDataProvider;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/config","./appointmentDataSource","./appointmentFilter","../../../../renovation/ui/scheduler/utils/filtering/remote"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/config"), require("./appointmentDataSource"), require("./appointmentFilter"), require("../../../../renovation/ui/scheduler/utils/filtering/remote"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=appointmentDataProvider.js.map