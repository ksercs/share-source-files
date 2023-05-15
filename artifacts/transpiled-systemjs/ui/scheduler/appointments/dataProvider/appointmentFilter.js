!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/appointments/dataProvider/appointmentFilter.js"], ["../../../../core/utils/date","../../recurrence","../../../../core/utils/array","../../../../core/utils/iterator","../../../../core/utils/type","../../../../data/query","../../appointmentAdapter","../../../../renovation/ui/scheduler/resources/hasResourceValue","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../../resources/utils","./utils","../../../../renovation/ui/scheduler/utils/filtering/getDatesWithoutTime","../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/appointments/dataProvider/appointmentFilter.js", ["../../../../core/utils/date", "../../recurrence", "../../../../core/utils/array", "../../../../core/utils/iterator", "../../../../core/utils/type", "../../../../data/query", "../../appointmentAdapter", "../../../../renovation/ui/scheduler/resources/hasResourceValue", "../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base", "../../resources/utils", "./utils", "../../../../renovation/ui/scheduler/utils/filtering/getDatesWithoutTime", "../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.AppointmentFilterVirtualStrategy = exports.AppointmentFilterBaseStrategy = void 0;
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  var _recurrence = $__require("../../recurrence");
  var _array = $__require("../../../../core/utils/array");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _type = $__require("../../../../core/utils/type");
  var _query = _interopRequireDefault($__require("../../../../data/query"));
  var _appointmentAdapter = $__require("../../appointmentAdapter");
  var _hasResourceValue = $__require("../../../../renovation/ui/scheduler/resources/hasResourceValue");
  var _base = $__require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  var _utils = $__require("../../resources/utils");
  var _utils2 = $__require("./utils");
  var _getDatesWithoutTime5 = _interopRequireDefault($__require("../../../../renovation/ui/scheduler/utils/filtering/getDatesWithoutTime"));
  var _getAppointmentTakesAllDay = $__require("../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay");
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
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
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
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];if (null != _i) {
      var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;_n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
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
  var toMs = _date.default.dateToMilliseconds;
  var FilterStrategies = {
    virtual: 'virtual',
    standard: 'standard'
  };
  var AppointmentFilterBaseStrategy = /*#__PURE__*/function () {
    function AppointmentFilterBaseStrategy(options) {
      this.options = options;
      this.dataAccessors = this.options.dataAccessors;
      this._init();
    }
    var _proto = AppointmentFilterBaseStrategy.prototype;
    _proto._resolveOption = function _resolveOption(name) {
      var result = this.options[name];
      return typeof result === 'function' ? result() : result;
    };
    _proto._init = function _init() {
      this.setDataAccessors(this.dataAccessors);
    };
    _proto.filter = function filter(preparedItems) {
      var dateRange = this.dateRange;
      var allDay;
      if (!this.showAllDayPanel && this.supportAllDayRow) {
        allDay = false;
      }
      return this.filterLoadedAppointments({
        startDayHour: this.viewStartDayHour,
        endDayHour: this.viewEndDayHour,
        viewStartDayHour: this.viewStartDayHour,
        viewEndDayHour: this.viewEndDayHour,
        min: dateRange[0],
        max: dateRange[1],
        resources: this.loadedResources,
        allDay: allDay,
        supportMultiDayAppointments: (0, _base.isTimelineView)(this.viewType),
        firstDayOfWeek: this.firstDayOfWeek
      }, preparedItems);
    };
    _proto.hasAllDayAppointments = function hasAllDayAppointments(filteredItems, preparedItems) {
      var _this = this;
      var adapters = filteredItems.map(function (item) {
        return (0, _appointmentAdapter.createAppointmentAdapter)(item, _this.dataAccessors, _this.timeZoneCalculator);
      });
      var result = false;
      (0, _iterator.each)(adapters, function (_, item) {
        if ((0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(item, _this.viewStartDayHour, _this.viewEndDayHour, _this.allDayPanelMode)) {
          result = true;
          return false;
        }
      });
      return result;
    };
    _proto.setDataAccessors = function setDataAccessors(dataAccessors) {
      this.dataAccessors = dataAccessors;
    };
    _proto._createAllDayAppointmentFilter = function _createAllDayAppointmentFilter(filterOptions) {
      var _this2 = this;
      var viewStartDayHour = filterOptions.viewStartDayHour,
          viewEndDayHour = filterOptions.viewEndDayHour;
      return [[function (appointment) {
        return (0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(appointment, viewStartDayHour, viewEndDayHour, _this2.allDayPanelMode);
      }]];
    };
    _proto._createCombinedFilter = function _createCombinedFilter(filterOptions) {
      var _this3 = this;
      var min = new Date(filterOptions.min);
      var max = new Date(filterOptions.max);
      var startDayHour = filterOptions.startDayHour,
          endDayHour = filterOptions.endDayHour,
          viewStartDayHour = filterOptions.viewStartDayHour,
          viewEndDayHour = filterOptions.viewEndDayHour,
          resources = filterOptions.resources,
          firstDayOfWeek = filterOptions.firstDayOfWeek,
          checkIntersectViewport = filterOptions.checkIntersectViewport,
          supportMultiDayAppointments = filterOptions.supportMultiDayAppointments;
      var _getDatesWithoutTime = (0, _getDatesWithoutTime5.default)(min, max),
          _getDatesWithoutTime2 = _slicedToArray(_getDatesWithoutTime, 2),
          trimMin = _getDatesWithoutTime2[0],
          trimMax = _getDatesWithoutTime2[1];
      var useRecurrence = (0, _type.isDefined)(this.dataAccessors.getter.recurrenceRule);
      return [[function (appointment) {
        var _appointment$visible;
        var appointmentVisible = (_appointment$visible = appointment.visible) !== null && _appointment$visible !== void 0 ? _appointment$visible : true;
        if (!appointmentVisible) {
          return false;
        }
        var startDate = appointment.startDate,
            endDate = appointment.endDate,
            hasRecurrenceRule = appointment.hasRecurrenceRule;
        if (!hasRecurrenceRule) {
          if (!(endDate >= trimMin && startDate < trimMax || _date.default.sameDate(endDate, trimMin) && _date.default.sameDate(startDate, trimMin))) {
            return false;
          }
        }
        var appointmentTakesAllDay = (0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(appointment, viewStartDayHour, viewEndDayHour, _this3.allDayPanelMode);
        var appointmentTakesSeveralDays = (0, _utils2.getAppointmentTakesSeveralDays)(appointment);
        var isAllDay = appointment.allDay;
        var isLongAppointment = appointmentTakesSeveralDays || appointmentTakesAllDay;
        if (resources !== null && resources !== void 0 && resources.length && !_this3._filterAppointmentByResources(appointment.rawAppointment, resources)) {
          return false;
        }
        if (appointmentTakesAllDay && filterOptions.allDay === false) {
          return false;
        }
        if (hasRecurrenceRule) {
          var recurrenceException = (0, _utils2.getRecurrenceException)(appointment, _this3.timeZoneCalculator, _this3.timezone);
          if (!_this3._filterAppointmentByRRule(_extends({}, appointment, {
            recurrenceException: recurrenceException,
            allDay: appointmentTakesAllDay
          }), min, max, startDayHour, endDayHour, firstDayOfWeek)) {
            return false;
          }
        }
        if (!isAllDay && supportMultiDayAppointments && isLongAppointment) {
          if (endDate < min && (!useRecurrence || useRecurrence && !hasRecurrenceRule)) {
            return false;
          }
        }
        if ((0, _type.isDefined)(startDayHour) && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
          if (!(0, _utils2.compareDateWithStartDayHour)(startDate, endDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays)) {
            return false;
          }
        }
        if ((0, _type.isDefined)(endDayHour)) {
          if (!(0, _utils2.compareDateWithEndDayHour)({
            startDate: startDate,
            endDate: endDate,
            startDayHour: startDayHour,
            endDayHour: endDayHour,
            viewStartDayHour: viewStartDayHour,
            viewEndDayHour: viewEndDayHour,
            allDay: appointmentTakesAllDay,
            severalDays: appointmentTakesSeveralDays,
            min: min,
            max: max,
            checkIntersectViewport: checkIntersectViewport
          })) {
            return false;
          }
        }
        if (!isAllDay && (!isLongAppointment || supportMultiDayAppointments)) {
          if (endDate < min && useRecurrence && !hasRecurrenceRule) {
            return false;
          }
        }
        return true;
      }]];
    }

    // TODO get rid of wrapper
    ;
    _proto._createAppointmentFilter = function _createAppointmentFilter(filterOptions) {
      return this._createCombinedFilter(filterOptions);
    };
    _proto._filterAppointmentByResources = function _filterAppointmentByResources(appointment, resources) {
      var _this4 = this;
      var checkAppointmentResourceValues = function checkAppointmentResourceValues(resourceName, resourceIndex) {
        var resourceGetter = _this4.dataAccessors.resources.getter[resourceName];
        var resource;
        if ((0, _type.isFunction)(resourceGetter)) {
          resource = resourceGetter(appointment);
        }
        var appointmentResourceValues = (0, _array.wrapToArray)(resource);
        var resourceData = (0, _iterator.map)(resources[resourceIndex].items, function (_ref) {
          var id = _ref.id;
          return id;
        });
        for (var i = 0; i < appointmentResourceValues.length; i++) {
          if ((0, _hasResourceValue.hasResourceValue)(resourceData, appointmentResourceValues[i])) {
            return true;
          }
        }
        return false;
      };
      var result = false;
      for (var i = 0; i < resources.length; i++) {
        var resourceName = resources[i].name;
        result = checkAppointmentResourceValues(resourceName, i);
        if (!result) {
          return false;
        }
      }
      return result;
    };
    _proto._filterAppointmentByRRule = function _filterAppointmentByRRule(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
      var recurrenceRule = appointment.recurrenceRule;
      var recurrenceException = appointment.recurrenceException;
      var allDay = appointment.allDay;
      var result = true;
      var appointmentStartDate = appointment.startDate;
      var appointmentEndDate = appointment.endDate;
      var recurrenceProcessor = (0, _recurrence.getRecurrenceProcessor)();
      if (allDay || (0, _utils2._appointmentPartInInterval)(appointmentStartDate, appointmentEndDate, startDayHour, endDayHour)) {
        var _getDatesWithoutTime3 = (0, _getDatesWithoutTime5.default)(min, max),
            _getDatesWithoutTime4 = _slicedToArray(_getDatesWithoutTime3, 2),
            trimMin = _getDatesWithoutTime4[0],
            trimMax = _getDatesWithoutTime4[1];
        min = trimMin;
        max = new Date(trimMax.getTime() - toMs('minute'));
      }
      if (recurrenceRule && !recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
        result = appointmentEndDate > min && appointmentStartDate <= max;
      }
      if (result && recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
        result = recurrenceProcessor.hasRecurrence({
          rule: recurrenceRule,
          exception: recurrenceException,
          start: appointmentStartDate,
          end: appointmentEndDate,
          min: min,
          max: max,
          firstDayOfWeek: firstDayOfWeek,
          appointmentTimezoneOffset: this.timeZoneCalculator.getOriginStartDateOffsetInMs(appointmentStartDate, appointment.startDateTimeZone, false)
        });
      }
      return result;
    };
    _proto.filterLoadedAppointments = function filterLoadedAppointments(filterOptions, preparedItems) {
      var filteredItems = this.filterPreparedItems(filterOptions, preparedItems);
      return filteredItems.map(function (_ref2) {
        var rawAppointment = _ref2.rawAppointment;
        return rawAppointment;
      });
    };
    _proto.filterPreparedItems = function filterPreparedItems(filterOptions, preparedItems) {
      var combinedFilter = this._createAppointmentFilter(filterOptions);
      return (0, _query.default)(preparedItems).filter(combinedFilter).toArray();
    };
    _proto.filterAllDayAppointments = function filterAllDayAppointments(filterOptions, preparedItems) {
      var combinedFilter = this._createAllDayAppointmentFilter(filterOptions);
      return (0, _query.default)(preparedItems).filter(combinedFilter).toArray().map(function (_ref3) {
        var rawAppointment = _ref3.rawAppointment;
        return rawAppointment;
      });
    };
    _createClass(AppointmentFilterBaseStrategy, [{
      key: "strategyName",
      get: function get() {
        return FilterStrategies.standard;
      }
    }, {
      key: "timeZoneCalculator",
      get: function get() {
        return this.options.timeZoneCalculator;
      }
    }, {
      key: "viewStartDayHour",
      get: function get() {
        return this.options.startDayHour;
      }
    }, {
      key: "viewEndDayHour",
      get: function get() {
        return this.options.endDayHour;
      }
    }, {
      key: "timezone",
      get: function get() {
        return this.options.timezone;
      }
    }, {
      key: "firstDayOfWeek",
      get: function get() {
        return this.options.firstDayOfWeek;
      }
    }, {
      key: "showAllDayPanel",
      get: function get() {
        return this.options.showAllDayPanel;
      }
    }, {
      key: "loadedResources",
      get: function get() {
        return this._resolveOption('loadedResources');
      }
    }, {
      key: "supportAllDayRow",
      get: function get() {
        return this._resolveOption('supportAllDayRow');
      }
    }, {
      key: "viewType",
      get: function get() {
        return this._resolveOption('viewType');
      }
    }, {
      key: "viewDirection",
      get: function get() {
        return this._resolveOption('viewDirection');
      }
    }, {
      key: "dateRange",
      get: function get() {
        return this._resolveOption('dateRange');
      }
    }, {
      key: "groupCount",
      get: function get() {
        return this._resolveOption('groupCount');
      }
    }, {
      key: "viewDataProvider",
      get: function get() {
        return this._resolveOption('viewDataProvider');
      }
    }, {
      key: "allDayPanelMode",
      get: function get() {
        return this._resolveOption('allDayPanelMode');
      }
    }]);
    return AppointmentFilterBaseStrategy;
  }();
  exports.AppointmentFilterBaseStrategy = AppointmentFilterBaseStrategy;
  var AppointmentFilterVirtualStrategy = /*#__PURE__*/function (_AppointmentFilterBas) {
    _inheritsLoose(AppointmentFilterVirtualStrategy, _AppointmentFilterBas);
    function AppointmentFilterVirtualStrategy() {
      return _AppointmentFilterBas.apply(this, arguments) || this;
    }
    var _proto2 = AppointmentFilterVirtualStrategy.prototype;
    _proto2.filter = function filter(preparedItems) {
      var _this5 = this;
      var hourMs = toMs('hour');
      var isCalculateStartAndEndDayHour = (0, _base.isDateAndTimeView)(this.viewType);
      var checkIntersectViewport = isCalculateStartAndEndDayHour && this.viewDirection === 'horizontal';
      var isAllDayWorkspace = !this.supportAllDayRow;
      var showAllDayAppointments = this.showAllDayPanel || isAllDayWorkspace;
      var endViewDate = this.viewDataProvider.getLastViewDateByEndDayHour(this.viewEndDayHour);
      var filterOptions = [];
      var groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
      groupsInfo.forEach(function (item) {
        var groupIndex = item.groupIndex;
        var groupStartDate = item.startDate;
        var groupEndDate = new Date(Math.min(item.endDate, endViewDate));
        var startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : _this5.viewStartDayHour;
        var endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate - groupStartDate) / hourMs : _this5.viewEndDayHour;
        var resources = _this5._getPrerenderFilterResources(groupIndex);
        var hasAllDayPanel = _this5.viewDataProvider.hasGroupAllDayPanel(groupIndex);
        var supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && hasAllDayPanel;
        filterOptions.push({
          isVirtualScrolling: true,
          startDayHour: startDayHour,
          endDayHour: endDayHour,
          viewStartDayHour: _this5.viewStartDayHour,
          viewEndDayHour: _this5.viewEndDayHour,
          min: groupStartDate,
          max: groupEndDate,
          supportMultiDayAppointments: (0, _base.isTimelineView)(_this5.viewType),
          allDay: supportAllDayAppointment,
          resources: resources,
          firstDayOfWeek: _this5.firstDayOfWeek,
          checkIntersectViewport: checkIntersectViewport
        });
      });
      return this.filterLoadedAppointments({
        filterOptions: filterOptions,
        groupCount: this.groupCount
      }, preparedItems);
    };
    _proto2.filterPreparedItems = function filterPreparedItems(_ref4, preparedItems) {
      var _this6 = this;
      var filterOptions = _ref4.filterOptions,
          groupCount = _ref4.groupCount;
      var combinedFilters = [];
      var itemsToFilter = preparedItems;
      var needPreFilter = groupCount > 0;
      if (needPreFilter) {
        itemsToFilter = itemsToFilter.filter(function (_ref5) {
          var rawAppointment = _ref5.rawAppointment;
          for (var i = 0; i < filterOptions.length; ++i) {
            var resources = filterOptions[i].resources;
            if (_this6._filterAppointmentByResources(rawAppointment, resources)) {
              return true;
            }
          }
        });
      }
      filterOptions.forEach(function (option) {
        combinedFilters.length && combinedFilters.push('or');
        var filter = _this6._createAppointmentFilter(option);
        combinedFilters.push(filter);
      });
      return (0, _query.default)(itemsToFilter).filter(combinedFilters).toArray();
    };
    _proto2.hasAllDayAppointments = function hasAllDayAppointments(adapters, preparedItems) {
      return this.filterAllDayAppointments({
        viewStartDayHour: this.viewStartDayHour,
        viewEndDayHour: this.viewEndDayHour
      }, preparedItems).length > 0;
    };
    _proto2._getPrerenderFilterResources = function _getPrerenderFilterResources(groupIndex) {
      var cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
      return (0, _utils.getResourcesDataByGroups)(this.loadedResources, this.resources, [cellGroup]);
    };
    _createClass(AppointmentFilterVirtualStrategy, [{
      key: "strategyName",
      get: function get() {
        return FilterStrategies.virtual;
      }
    }, {
      key: "resources",
      get: function get() {
        return this.options.resources;
      }
    }]);
    return AppointmentFilterVirtualStrategy;
  }(AppointmentFilterBaseStrategy);
  exports.AppointmentFilterVirtualStrategy = AppointmentFilterVirtualStrategy;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/date","../../recurrence","../../../../core/utils/array","../../../../core/utils/iterator","../../../../core/utils/type","../../../../data/query","../../appointmentAdapter","../../../../renovation/ui/scheduler/resources/hasResourceValue","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../../resources/utils","./utils","../../../../renovation/ui/scheduler/utils/filtering/getDatesWithoutTime","../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/date"), require("../../recurrence"), require("../../../../core/utils/array"), require("../../../../core/utils/iterator"), require("../../../../core/utils/type"), require("../../../../data/query"), require("../../appointmentAdapter"), require("../../../../renovation/ui/scheduler/resources/hasResourceValue"), require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"), require("../../resources/utils"), require("./utils"), require("../../../../renovation/ui/scheduler/utils/filtering/getDatesWithoutTime"), require("../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=appointmentFilter.js.map