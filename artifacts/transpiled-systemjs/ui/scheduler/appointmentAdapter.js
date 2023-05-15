!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/appointmentAdapter.js"], ["../../core/utils/extend","../widget/ui.errors","../../core/utils/object","./recurrence","./expressionUtils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/appointmentAdapter.js", ["../../core/utils/extend", "../widget/ui.errors", "../../core/utils/object", "./recurrence", "./expressionUtils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = exports.createAppointmentAdapter = void 0;
  var _extend = $__require("../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _object = $__require("../../core/utils/object");
  var _recurrence = $__require("./recurrence");
  var _expressionUtils = $__require("./expressionUtils");
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
  var PROPERTY_NAMES = {
    startDate: 'startDate',
    endDate: 'endDate',
    allDay: 'allDay',
    text: 'text',
    description: 'description',
    startDateTimeZone: 'startDateTimeZone',
    endDateTimeZone: 'endDateTimeZone',
    recurrenceRule: 'recurrenceRule',
    recurrenceException: 'recurrenceException',
    disabled: 'disabled'
  };
  var AppointmentAdapter = /*#__PURE__*/function () {
    function AppointmentAdapter(rawAppointment, dataAccessors, timeZoneCalculator, options) {
      this.rawAppointment = rawAppointment;
      this.dataAccessors = dataAccessors;
      this.timeZoneCalculator = timeZoneCalculator;
      this.options = options;
    }
    var _proto = AppointmentAdapter.prototype;
    _proto.getField = function getField(property) {
      return _expressionUtils.ExpressionUtils.getField(this.dataAccessors, property, this.rawAppointment);
    };
    _proto.setField = function setField(property, value) {
      return _expressionUtils.ExpressionUtils.setField(this.dataAccessors, property, this.rawAppointment, value);
    };
    _proto.calculateStartDate = function calculateStartDate(pathTimeZoneConversion) {
      if (!this.startDate || isNaN(this.startDate.getTime())) {
        throw _ui.default.Error('E1032', this.text);
      }
      return this.calculateDate(this.startDate, this.startDateTimeZone, pathTimeZoneConversion);
    };
    _proto.calculateEndDate = function calculateEndDate(pathTimeZoneConversion) {
      return this.calculateDate(this.endDate, this.endDateTimeZone, pathTimeZoneConversion);
    };
    _proto.calculateDate = function calculateDate(date, appointmentTimeZone, pathTimeZoneConversion) {
      if (!date) {
        // TODO: E1032 should be thrown only for startDate above
        return undefined;
      }
      return this.timeZoneCalculator.createDate(date, {
        appointmentTimeZone: appointmentTimeZone,
        path: pathTimeZoneConversion
      });
    };
    _proto.clone = function clone() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var result = new AppointmentAdapter((0, _object.deepExtendArraySafe)({}, this.rawAppointment), this.dataAccessors, this.timeZoneCalculator, options);
      if (options !== null && options !== void 0 && options.pathTimeZone) {
        result.startDate = result.calculateStartDate(options.pathTimeZone);
        result.endDate = result.calculateEndDate(options.pathTimeZone);
      }
      return result;
    };
    _proto.source = function source() {
      var serializeDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (serializeDate) {
        // TODO: hack for use dateSerializationFormat
        var clonedAdapter = this.clone();
        clonedAdapter.startDate = this.startDate;
        clonedAdapter.endDate = this.endDate;
        return clonedAdapter.source();
      }
      return (0, _extend.extend)({}, this.rawAppointment);
    };
    _createClass(AppointmentAdapter, [{
      key: "duration",
      get: function get() {
        return this.endDate ? this.endDate - this.startDate : 0;
      }
    }, {
      key: "startDate",
      get: function get() {
        var result = this.getField(PROPERTY_NAMES.startDate);
        return result === undefined ? result : new Date(result);
      },
      set: function set(value) {
        this.setField(PROPERTY_NAMES.startDate, value);
      }
    }, {
      key: "endDate",
      get: function get() {
        var result = this.getField(PROPERTY_NAMES.endDate);
        return result === undefined ? result : new Date(result);
      },
      set: function set(value) {
        this.setField(PROPERTY_NAMES.endDate, value);
      }
    }, {
      key: "allDay",
      get: function get() {
        return this.getField(PROPERTY_NAMES.allDay);
      },
      set: function set(value) {
        this.setField(PROPERTY_NAMES.allDay, value);
      }
    }, {
      key: "text",
      get: function get() {
        return this.getField(PROPERTY_NAMES.text);
      },
      set: function set(value) {
        this.setField(PROPERTY_NAMES.text, value);
      }
    }, {
      key: "description",
      get: function get() {
        return this.getField(PROPERTY_NAMES.description);
      },
      set: function set(value) {
        this.setField(PROPERTY_NAMES.description, value);
      }
    }, {
      key: "startDateTimeZone",
      get: function get() {
        return this.getField(PROPERTY_NAMES.startDateTimeZone);
      }
    }, {
      key: "endDateTimeZone",
      get: function get() {
        return this.getField(PROPERTY_NAMES.endDateTimeZone);
      }
    }, {
      key: "recurrenceRule",
      get: function get() {
        return this.getField(PROPERTY_NAMES.recurrenceRule);
      },
      set: function set(value) {
        this.setField(PROPERTY_NAMES.recurrenceRule, value);
      }
    }, {
      key: "recurrenceException",
      get: function get() {
        return this.getField(PROPERTY_NAMES.recurrenceException);
      },
      set: function set(value) {
        this.setField(PROPERTY_NAMES.recurrenceException, value);
      }
    }, {
      key: "disabled",
      get: function get() {
        return !!this.getField(PROPERTY_NAMES.disabled);
      }
    }, {
      key: "isRecurrent",
      get: function get() {
        return (0, _recurrence.getRecurrenceProcessor)().isValidRecurrenceRule(this.recurrenceRule);
      }
    }]);
    return AppointmentAdapter;
  }();
  var _default = AppointmentAdapter;
  exports.default = _default;
  var createAppointmentAdapter = function createAppointmentAdapter(rawAppointment, dataAccessors, timeZoneCalculator, options) {
    return new AppointmentAdapter(rawAppointment, dataAccessors, timeZoneCalculator, options);
  };
  exports.createAppointmentAdapter = createAppointmentAdapter;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../widget/ui.errors","../../core/utils/object","./recurrence","./expressionUtils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../widget/ui.errors"), require("../../core/utils/object"), require("./recurrence"), require("./expressionUtils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=appointmentAdapter.js.map