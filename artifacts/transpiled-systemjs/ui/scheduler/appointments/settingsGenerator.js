!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/appointments/settingsGenerator.js"], ["../../../core/utils/date","../../../core/utils/type","../../../core/utils/extend","../recurrence","../utils.timeZone","../resources/utils","../appointmentAdapter","./cellPositionCalculator","../expressionUtils","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","./textUtils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/appointments/settingsGenerator.js", ["../../../core/utils/date", "../../../core/utils/type", "../../../core/utils/extend", "../recurrence", "../utils.timeZone", "../resources/utils", "../appointmentAdapter", "./cellPositionCalculator", "../expressionUtils", "../../../renovation/ui/scheduler/view_model/to_test/views/utils/base", "./textUtils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.DateGeneratorVirtualStrategy = exports.DateGeneratorBaseStrategy = exports.AppointmentSettingsGenerator = void 0;
  var _date = _interopRequireDefault($__require("../../../core/utils/date"));
  var _type = $__require("../../../core/utils/type");
  var _extend = $__require("../../../core/utils/extend");
  var _recurrence = $__require("../recurrence");
  var _utils = _interopRequireDefault($__require("../utils.timeZone"));
  var _utils2 = $__require("../resources/utils");
  var _appointmentAdapter = $__require("../appointmentAdapter");
  var _cellPositionCalculator = $__require("./cellPositionCalculator");
  var _expressionUtils = $__require("../expressionUtils");
  var _base = $__require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  var _textUtils = $__require("./textUtils");
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
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
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
  var toMs = _date.default.dateToMilliseconds;
  var APPOINTMENT_DATE_TEXT_FORMAT = 'TIME';
  var DateGeneratorBaseStrategy = /*#__PURE__*/function () {
    function DateGeneratorBaseStrategy(options) {
      this.options = options;
    }
    var _proto = DateGeneratorBaseStrategy.prototype;
    _proto.getIntervalDuration = function getIntervalDuration() {
      return this.appointmentTakesAllDay ? this.options.allDayIntervalDuration : this.options.intervalDuration;
    };
    _proto.generate = function generate(appointmentAdapter) {
      var itemGroupIndices = this._getGroupIndices(this.rawAppointment);
      var appointmentList = this._createAppointments(appointmentAdapter, itemGroupIndices);
      appointmentList = this._getProcessedByAppointmentTimeZone(appointmentList, appointmentAdapter); // T983264

      if (this._canProcessNotNativeTimezoneDates(appointmentAdapter)) {
        appointmentList = this._getProcessedNotNativeTimezoneDates(appointmentList, appointmentAdapter);
      }
      var dateSettings = this._createGridAppointmentList(appointmentList, appointmentAdapter);
      var firstViewDates = this._getAppointmentsFirstViewDate(dateSettings);
      this._fillNormalizedStartDate(dateSettings, firstViewDates);
      dateSettings = this._cropAppointmentsByStartDayHour(dateSettings, firstViewDates, this.rawAppointment);
      dateSettings = this._fillNormalizedEndDate(dateSettings, this.rawAppointment);
      if (this._needSeparateLongParts()) {
        dateSettings = this._separateLongParts(dateSettings, appointmentAdapter);
      }
      var isRecurrent = appointmentAdapter.isRecurrent;
      return {
        dateSettings: dateSettings,
        itemGroupIndices: itemGroupIndices,
        isRecurrent: isRecurrent
      };
    };
    _proto._getProcessedByAppointmentTimeZone = function _getProcessedByAppointmentTimeZone(appointmentList, appointment) {
      var _this = this;
      var hasAppointmentTimeZone = !(0, _type.isEmptyObject)(appointment.startDateTimeZone) || !(0, _type.isEmptyObject)(appointment.endDateTimeZone);
      if (hasAppointmentTimeZone) {
        var appointmentOffsets = {
          startDate: this.timeZoneCalculator.getOffsets(appointment.startDate, appointment.startDateTimeZone),
          endDate: this.timeZoneCalculator.getOffsets(appointment.endDate, appointment.endDateTimeZone)
        };
        appointmentList.forEach(function (a) {
          var sourceOffsets = {
            startDate: _this.timeZoneCalculator.getOffsets(a.startDate, appointment.startDateTimeZone),
            endDate: _this.timeZoneCalculator.getOffsets(a.endDate, appointment.endDateTimeZone)
          };
          var startDateOffsetDiff = appointmentOffsets.startDate.appointment - sourceOffsets.startDate.appointment;
          var endDateOffsetDiff = appointmentOffsets.endDate.appointment - sourceOffsets.endDate.appointment;
          if (sourceOffsets.startDate.appointment !== sourceOffsets.startDate.common) {
            a.startDate = new Date(a.startDate.getTime() + startDateOffsetDiff * toMs('hour'));
          }
          if (sourceOffsets.endDate.appointment !== sourceOffsets.endDate.common) {
            a.endDate = new Date(a.endDate.getTime() + endDateOffsetDiff * toMs('hour'));
          }
        });
      }
      return appointmentList;
    };
    _proto._createAppointments = function _createAppointments(appointment, groupIndices) {
      var appointments = this._createRecurrenceAppointments(appointment, groupIndices);
      if (!appointment.isRecurrent && appointments.length === 0) {
        appointments.push({
          startDate: appointment.startDate,
          endDate: appointment.endDate
        });
      }

      // T817857
      appointments = appointments.map(function (item) {
        var _item$endDate;
        var resultEndTime = (_item$endDate = item.endDate) === null || _item$endDate === void 0 ? void 0 : _item$endDate.getTime();
        if (item.startDate.getTime() === resultEndTime) {
          item.endDate.setTime(resultEndTime + toMs('minute'));
        }
        return _extends({}, item, {
          exceptionDate: new Date(item.startDate)
        });
      });
      return appointments;
    };
    _proto._canProcessNotNativeTimezoneDates = function _canProcessNotNativeTimezoneDates(appointment) {
      var isTimeZoneSet = !(0, _type.isEmptyObject)(this.timeZone);
      if (!isTimeZoneSet) {
        return false;
      }
      if (!appointment.isRecurrent) {
        return false;
      }
      return !_utils.default.isEqualLocalTimeZone(this.timeZone, appointment.startDate);
    };
    _proto._getProcessedNotNativeDateIfCrossDST = function _getProcessedNotNativeDateIfCrossDST(date, offset) {
      if (offset < 0) {
        // summer time
        var newDate = new Date(date);
        var newDateMinusOneHour = new Date(newDate);
        newDateMinusOneHour.setHours(newDateMinusOneHour.getHours() - 1);
        var newDateOffset = this.timeZoneCalculator.getOffsets(newDate).common;
        var newDateMinusOneHourOffset = this.timeZoneCalculator.getOffsets(newDateMinusOneHour).common;
        if (newDateOffset !== newDateMinusOneHourOffset) {
          return 0;
        }
      }
      return offset;
    };
    _proto._getCommonOffset = function _getCommonOffset(date) {
      return this.timeZoneCalculator.getOffsets(date).common;
    };
    _proto._getProcessedNotNativeTimezoneDates = function _getProcessedNotNativeTimezoneDates(appointmentList, appointment) {
      var _this2 = this;
      return appointmentList.map(function (item) {
        var diffStartDateOffset = _this2._getCommonOffset(appointment.startDate) - _this2._getCommonOffset(item.startDate);
        var diffEndDateOffset = _this2._getCommonOffset(appointment.endDate) - _this2._getCommonOffset(item.endDate);
        if (diffStartDateOffset === 0 && diffEndDateOffset === 0) {
          return item;
        }
        diffStartDateOffset = _this2._getProcessedNotNativeDateIfCrossDST(item.startDate, diffStartDateOffset);
        diffEndDateOffset = _this2._getProcessedNotNativeDateIfCrossDST(item.endDate, diffEndDateOffset);
        var newStartDate = new Date(item.startDate.getTime() + diffStartDateOffset * toMs('hour'));
        var newEndDate = new Date(item.endDate.getTime() + diffEndDateOffset * toMs('hour'));
        var testNewStartDate = _this2.timeZoneCalculator.createDate(newStartDate, {
          path: 'toGrid'
        });
        var testNewEndDate = _this2.timeZoneCalculator.createDate(newEndDate, {
          path: 'toGrid'
        });
        if (appointment.duration > testNewEndDate.getTime() - testNewStartDate.getTime()) {
          newEndDate = new Date(newStartDate.getTime() + appointment.duration);
        }
        return _extends({}, item, {
          startDate: newStartDate,
          endDate: newEndDate,
          exceptionDate: new Date(newStartDate)
        });
      });
    };
    _proto._needSeparateLongParts = function _needSeparateLongParts() {
      return this.isVerticalOrientation ? this.isGroupedByDate : this.isGroupedByDate && this.appointmentTakesAllDay;
    };
    _proto.normalizeEndDateByViewEnd = function normalizeEndDateByViewEnd(rawAppointment, endDate) {
      var result = new Date(endDate.getTime());
      var isAllDay = (0, _base.isDateAndTimeView)(this.viewType) && this.appointmentTakesAllDay;
      if (!isAllDay) {
        var roundedEndViewDate = _date.default.roundToHour(this.endViewDate);
        if (result > roundedEndViewDate) {
          result = roundedEndViewDate;
        }
      }
      var endDayHour = this.viewEndDayHour;
      var allDay = _expressionUtils.ExpressionUtils.getField(this.dataAccessors, 'allDay', rawAppointment);
      var currentViewEndTime = new Date(new Date(endDate.getTime()).setHours(endDayHour, 0, 0, 0));
      if (result.getTime() > currentViewEndTime.getTime() || allDay && result.getHours() < endDayHour) {
        result = currentViewEndTime;
      }
      return result;
    };
    _proto._fillNormalizedEndDate = function _fillNormalizedEndDate(dateSettings, rawAppointment) {
      var _this3 = this;
      return dateSettings.map(function (item) {
        var endDate = item.endDate;
        var normalizedEndDate = _this3.normalizeEndDateByViewEnd(rawAppointment, endDate);
        return _extends({}, item, {
          normalizedEndDate: normalizedEndDate
        });
      });
    };
    _proto._separateLongParts = function _separateLongParts(gridAppointmentList, appointmentAdapter) {
      var _this4 = this;
      var result = [];
      gridAppointmentList.forEach(function (gridAppointment) {
        var maxDate = new Date(_this4.dateRange[1]);
        var endDateOfPart = gridAppointment.normalizedEndDate;
        var longStartDateParts = _date.default.getDatesOfInterval(gridAppointment.startDate, endDateOfPart, {
          milliseconds: _this4.getIntervalDuration(_this4.appointmentTakesAllDay)
        });
        var list = longStartDateParts.filter(function (startDatePart) {
          return new Date(startDatePart) < maxDate;
        }).map(function (date) {
          var endDate = new Date(new Date(date).setMilliseconds(appointmentAdapter.duration));
          var normalizedEndDate = _this4.normalizeEndDateByViewEnd(_this4.rawAppointment, endDate);
          return {
            startDate: date,
            endDate: endDate,
            normalizedEndDate: normalizedEndDate,
            source: gridAppointment.source
          };
        });
        result = result.concat(list);
      });
      return result;
    };
    _proto._createGridAppointmentList = function _createGridAppointmentList(appointmentList, appointmentAdapter) {
      var _this5 = this;
      return appointmentList.map(function (source) {
        var offsetDifference = appointmentAdapter.startDate.getTimezoneOffset() - source.startDate.getTimezoneOffset();
        if (offsetDifference !== 0 && _this5._canProcessNotNativeTimezoneDates(appointmentAdapter)) {
          source.startDate = new Date(source.startDate.getTime() + offsetDifference * toMs('minute'));
          source.endDate = new Date(source.endDate.getTime() + offsetDifference * toMs('minute'));
          source.exceptionDate = new Date(source.startDate);
        }
        var startDate = _this5.timeZoneCalculator.createDate(source.startDate, {
          path: 'toGrid'
        });
        var endDate = _this5.timeZoneCalculator.createDate(source.endDate, {
          path: 'toGrid'
        });
        return {
          startDate: startDate,
          endDate: endDate,
          allDay: appointmentAdapter.allDay || false,
          source: source // TODO
        };
      });
    };
    _proto._createExtremeRecurrenceDates = function _createExtremeRecurrenceDates() {
      var startViewDate = this.appointmentTakesAllDay ? _date.default.trimTime(this.dateRange[0]) : this.dateRange[0];
      var endViewDateByEndDayHour = this.dateRange[1];
      if (this.timeZone) {
        startViewDate = this.timeZoneCalculator.createDate(startViewDate, {
          path: 'fromGrid'
        });
        endViewDateByEndDayHour = this.timeZoneCalculator.createDate(endViewDateByEndDayHour, {
          path: 'fromGrid'
        });
        var daylightOffset = _utils.default.getDaylightOffsetInMs(startViewDate, endViewDateByEndDayHour);
        if (daylightOffset) {
          endViewDateByEndDayHour = new Date(endViewDateByEndDayHour.getTime() + daylightOffset);
        }
      }
      return [startViewDate, endViewDateByEndDayHour];
    };
    _proto._createRecurrenceOptions = function _createRecurrenceOptions(appointment, groupIndex) {
      var _this6 = this;
      var _this$_createExtremeR = this._createExtremeRecurrenceDates(groupIndex),
          _this$_createExtremeR2 = _slicedToArray(_this$_createExtremeR, 2),
          minRecurrenceDate = _this$_createExtremeR2[0],
          maxRecurrenceDate = _this$_createExtremeR2[1];
      return {
        rule: appointment.recurrenceRule,
        exception: appointment.recurrenceException,
        min: minRecurrenceDate,
        max: maxRecurrenceDate,
        firstDayOfWeek: this.firstDayOfWeek,
        start: appointment.startDate,
        end: appointment.endDate,
        appointmentTimezoneOffset: this.timeZoneCalculator.getOriginStartDateOffsetInMs(appointment.startDate, appointment.rawAppointment.startDateTimeZone, true),
        getPostProcessedException: function getPostProcessedException(date) {
          if ((0, _type.isEmptyObject)(_this6.timeZone) || _utils.default.isEqualLocalTimeZone(_this6.timeZone, date)) {
            return date;
          }
          var appointmentOffset = _this6.timeZoneCalculator.getOffsets(appointment.startDate).common;
          var exceptionAppointmentOffset = _this6.timeZoneCalculator.getOffsets(date).common;
          var diff = appointmentOffset - exceptionAppointmentOffset;
          diff = _this6._getProcessedNotNativeDateIfCrossDST(date, diff);
          return new Date(date.getTime() - diff * _date.default.dateToMilliseconds('hour'));
        }
      };
    };
    _proto._createRecurrenceAppointments = function _createRecurrenceAppointments(appointment, groupIndices) {
      var duration = appointment.duration;
      var option = this._createRecurrenceOptions(appointment);
      var generatedStartDates = (0, _recurrence.getRecurrenceProcessor)().generateDates(option);
      return generatedStartDates.map(function (date) {
        var utcDate = _utils.default.createUTCDateWithLocalOffset(date);
        utcDate.setTime(utcDate.getTime() + duration);
        var endDate = _utils.default.createDateFromUTCWithLocalOffset(utcDate);
        return {
          startDate: new Date(date),
          endDate: endDate
        };
      });
    };
    _proto._getAppointmentsFirstViewDate = function _getAppointmentsFirstViewDate(appointments) {
      var _this7 = this;
      return appointments.map(function (appointment) {
        return _this7._getAppointmentFirstViewDate(appointment);
      });
    };
    _proto._fillNormalizedStartDate = function _fillNormalizedStartDate(appointments, firstViewDates, rawAppointment) {
      var _this8 = this;
      appointments.forEach(function (appointment, idx) {
        appointment.startDate = _this8._getAppointmentResultDate({
          appointment: appointment,
          rawAppointment: rawAppointment,
          startDate: new Date(appointment.startDate),
          startDayHour: _this8.viewStartDayHour,
          firstViewDate: firstViewDates[idx]
        });
      });
    };
    _proto._cropAppointmentsByStartDayHour = function _cropAppointmentsByStartDayHour(appointments, firstViewDates) {
      var _this9 = this;
      return appointments.filter(function (appointment, idx) {
        if (!firstViewDates[idx]) {
          return false;
        } else if (_this9.appointmentTakesAllDay) {
          return true;
        }
        return appointment.endDate > appointment.startDate;
      });
    };
    _proto._getAppointmentResultDate = function _getAppointmentResultDate(options) {
      var appointment = options.appointment,
          startDayHour = options.startDayHour,
          firstViewDate = options.firstViewDate;
      var startDate = options.startDate;
      var resultDate;
      if (this.appointmentTakesAllDay) {
        resultDate = _date.default.normalizeDate(startDate, firstViewDate);
      } else {
        if (startDate < firstViewDate) {
          startDate = firstViewDate;
        }
        resultDate = _date.default.normalizeDate(appointment.startDate, startDate);
      }
      return !this.isDateAppointment ? _date.default.roundDateByStartDayHour(resultDate, startDayHour) : resultDate;
    };
    _proto._getAppointmentFirstViewDate = function _getAppointmentFirstViewDate(appointment) {
      var groupIndex = appointment.source.groupIndex || 0;
      var startDate = appointment.startDate,
          endDate = appointment.endDate;
      if (this.isAllDayRowAppointment || appointment.allDay) {
        return this.viewDataProvider.findAllDayGroupCellStartDate(groupIndex, startDate);
      }
      return this.viewDataProvider.findGroupCellStartDate(groupIndex, startDate, endDate, this.isDateAppointment);
    };
    _proto._getGroupIndices = function _getGroupIndices(rawAppointment) {
      var _this10 = this;
      var result = [];
      if (rawAppointment && this.loadedResources.length) {
        var tree = (0, _utils2.createResourcesTree)(this.loadedResources);
        result = (0, _utils2.getResourceTreeLeaves)(function (field, action) {
          return (0, _utils2.getDataAccessors)(_this10.options.dataAccessors.resources, field, action);
        }, tree, rawAppointment);
      }
      return result;
    };
    _createClass(DateGeneratorBaseStrategy, [{
      key: "rawAppointment",
      get: function get() {
        return this.options.rawAppointment;
      }
    }, {
      key: "timeZoneCalculator",
      get: function get() {
        return this.options.timeZoneCalculator;
      }
    }, {
      key: "viewDataProvider",
      get: function get() {
        return this.options.viewDataProvider;
      }
    }, {
      key: "appointmentTakesAllDay",
      get: function get() {
        return this.options.appointmentTakesAllDay;
      }
    }, {
      key: "supportAllDayRow",
      get: function get() {
        return this.options.supportAllDayRow;
      }
    }, {
      key: "isAllDayRowAppointment",
      get: function get() {
        return this.options.isAllDayRowAppointment;
      }
    }, {
      key: "timeZone",
      get: function get() {
        return this.options.timeZone;
      }
    }, {
      key: "dateRange",
      get: function get() {
        return this.options.dateRange;
      }
    }, {
      key: "firstDayOfWeek",
      get: function get() {
        return this.options.firstDayOfWeek;
      }
    }, {
      key: "viewStartDayHour",
      get: function get() {
        return this.options.viewStartDayHour;
      }
    }, {
      key: "viewEndDayHour",
      get: function get() {
        return this.options.viewEndDayHour;
      }
    }, {
      key: "endViewDate",
      get: function get() {
        return this.options.endViewDate;
      }
    }, {
      key: "viewType",
      get: function get() {
        return this.options.viewType;
      }
    }, {
      key: "isGroupedByDate",
      get: function get() {
        return this.options.isGroupedByDate;
      }
    }, {
      key: "isVerticalOrientation",
      get: function get() {
        return this.options.isVerticalGroupOrientation;
      }
    }, {
      key: "dataAccessors",
      get: function get() {
        return this.options.dataAccessors;
      }
    }, {
      key: "loadedResources",
      get: function get() {
        return this.options.loadedResources;
      }
    }, {
      key: "isDateAppointment",
      get: function get() {
        return !(0, _base.isDateAndTimeView)(this.viewType) && this.appointmentTakesAllDay;
      }
    }]);
    return DateGeneratorBaseStrategy;
  }();
  exports.DateGeneratorBaseStrategy = DateGeneratorBaseStrategy;
  var DateGeneratorVirtualStrategy = /*#__PURE__*/function (_DateGeneratorBaseStr) {
    _inheritsLoose(DateGeneratorVirtualStrategy, _DateGeneratorBaseStr);
    function DateGeneratorVirtualStrategy() {
      return _DateGeneratorBaseStr.apply(this, arguments) || this;
    }
    var _proto2 = DateGeneratorVirtualStrategy.prototype;
    _proto2._createRecurrenceAppointments = function _createRecurrenceAppointments(appointment, groupIndices) {
      var _this11 = this;
      var duration = appointment.duration;
      var result = [];
      var validGroupIndices = this.groupCount ? groupIndices : [0];
      validGroupIndices.forEach(function (groupIndex) {
        var option = _this11._createRecurrenceOptions(appointment, groupIndex);
        var generatedStartDates = (0, _recurrence.getRecurrenceProcessor)().generateDates(option);
        var recurrentInfo = generatedStartDates.map(function (date) {
          var startDate = new Date(date);
          var utcDate = _utils.default.createUTCDateWithLocalOffset(date);
          utcDate.setTime(utcDate.getTime() + duration);
          var endDate = _utils.default.createDateFromUTCWithLocalOffset(utcDate);
          return {
            startDate: startDate,
            endDate: endDate,
            groupIndex: groupIndex
          };
        });
        result.push.apply(result, _toConsumableArray(recurrentInfo));
      });
      return result;
    };
    _proto2._updateGroupIndices = function _updateGroupIndices(appointments, groupIndices) {
      var _this12 = this;
      var result = [];
      groupIndices.forEach(function (groupIndex) {
        var groupStartDate = _this12.viewDataProvider.getGroupStartDate(groupIndex);
        if (groupStartDate) {
          appointments.forEach(function (appointment) {
            var appointmentCopy = (0, _extend.extend)({}, appointment);
            appointmentCopy.groupIndex = groupIndex;
            result.push(appointmentCopy);
          });
        }
      });
      return result;
    };
    _proto2._getGroupIndices = function _getGroupIndices(resources) {
      var _groupIndices;
      var groupIndices = _DateGeneratorBaseStr.prototype._getGroupIndices.call(this, resources);
      var viewDataGroupIndices = this.viewDataProvider.getGroupIndices();
      if (!((_groupIndices = groupIndices) !== null && _groupIndices !== void 0 && _groupIndices.length)) {
        groupIndices = [0];
      }
      return groupIndices.filter(function (groupIndex) {
        return viewDataGroupIndices.indexOf(groupIndex) !== -1;
      });
    };
    _proto2._createAppointments = function _createAppointments(appointment, groupIndices) {
      var appointments = _DateGeneratorBaseStr.prototype._createAppointments.call(this, appointment, groupIndices);
      return !appointment.isRecurrent ? this._updateGroupIndices(appointments, groupIndices) : appointments;
    };
    _createClass(DateGeneratorVirtualStrategy, [{
      key: "groupCount",
      get: function get() {
        return (0, _utils2.getGroupCount)(this.loadedResources);
      }
    }]);
    return DateGeneratorVirtualStrategy;
  }(DateGeneratorBaseStrategy); // TODO rename to AppointmentInfoGenerator or AppointmentViewModel after refactoring geometry calculation strategies
  exports.DateGeneratorVirtualStrategy = DateGeneratorVirtualStrategy;
  var AppointmentSettingsGenerator = /*#__PURE__*/function () {
    function AppointmentSettingsGenerator(options) {
      this.options = options;
      this.appointmentAdapter = (0, _appointmentAdapter.createAppointmentAdapter)(this.rawAppointment, this.dataAccessors, this.timeZoneCalculator);
    }
    var _proto3 = AppointmentSettingsGenerator.prototype;
    _proto3.create = function create() {
      var _this$_generateDateSe = this._generateDateSettings(),
          dateSettings = _this$_generateDateSe.dateSettings,
          itemGroupIndices = _this$_generateDateSe.itemGroupIndices,
          isRecurrent = _this$_generateDateSe.isRecurrent;
      var cellPositions = this._calculateCellPositions(dateSettings, itemGroupIndices);
      var result = this._prepareAppointmentInfos(dateSettings, cellPositions, isRecurrent);
      return result;
    };
    _proto3._generateDateSettings = function _generateDateSettings() {
      return this.dateSettingsStrategy.generate(this.appointmentAdapter);
    };
    _proto3._calculateCellPositions = function _calculateCellPositions(dateSettings, itemGroupIndices) {
      var cellPositionCalculator = new _cellPositionCalculator.CellPositionCalculator(_extends({}, this.options, {
        dateSettings: dateSettings
      }));
      return cellPositionCalculator.calculateCellPositions(itemGroupIndices, this.isAllDayRowAppointment, this.appointmentAdapter.isRecurrent);
    };
    _proto3._prepareAppointmentInfos = function _prepareAppointmentInfos(dateSettings, cellPositions, isRecurrent) {
      var _this13 = this;
      var infos = [];
      cellPositions.forEach(function (_ref) {
        var coordinates = _ref.coordinates,
            dateSettingIndex = _ref.dateSettingIndex;
        var dateSetting = dateSettings[dateSettingIndex];
        var dateText = _this13._getAppointmentDateText(dateSetting);
        var info = {
          appointment: dateSetting,
          sourceAppointment: dateSetting.source,
          dateText: dateText,
          isRecurrent: isRecurrent
        };
        infos.push(_extends({}, coordinates, {
          info: info
        }));
      });
      return infos;
    };
    _proto3._getAppointmentDateText = function _getAppointmentDateText(sourceAppointment) {
      var startDate = sourceAppointment.startDate,
          endDate = sourceAppointment.endDate,
          allDay = sourceAppointment.allDay;
      return (0, _textUtils.createFormattedDateText)({
        startDate: startDate,
        endDate: endDate,
        allDay: allDay,
        format: APPOINTMENT_DATE_TEXT_FORMAT
      });
    };
    _createClass(AppointmentSettingsGenerator, [{
      key: "rawAppointment",
      get: function get() {
        return this.options.rawAppointment;
      }
    }, {
      key: "dataAccessors",
      get: function get() {
        return this.options.dataAccessors;
      }
    }, {
      key: "timeZoneCalculator",
      get: function get() {
        return this.options.timeZoneCalculator;
      }
    }, {
      key: "isAllDayRowAppointment",
      get: function get() {
        return this.options.appointmentTakesAllDay && this.options.supportAllDayRow;
      }
    }, {
      key: "groups",
      get: function get() {
        return this.options.groups;
      }
    }, {
      key: "dateSettingsStrategy",
      get: function get() {
        var options = _extends({}, this.options, {
          isAllDayRowAppointment: this.isAllDayRowAppointment
        });
        return this.options.isVirtualScrolling ? new DateGeneratorVirtualStrategy(options) : new DateGeneratorBaseStrategy(options);
      }
    }]);
    return AppointmentSettingsGenerator;
  }();
  exports.AppointmentSettingsGenerator = AppointmentSettingsGenerator;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/date","../../../core/utils/type","../../../core/utils/extend","../recurrence","../utils.timeZone","../resources/utils","../appointmentAdapter","./cellPositionCalculator","../expressionUtils","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","./textUtils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/date"), require("../../../core/utils/type"), require("../../../core/utils/extend"), require("../recurrence"), require("../utils.timeZone"), require("../resources/utils"), require("../appointmentAdapter"), require("./cellPositionCalculator"), require("../expressionUtils"), require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"), require("./textUtils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=settingsGenerator.js.map