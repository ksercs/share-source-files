!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/appointments/dataProvider/utils.js"], ["../../../../core/utils/date","../../utils.timeZone","../../../../core/utils/date_serialization","../../expressionUtils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/appointments/dataProvider/utils.js", ["../../../../core/utils/date", "../../utils.timeZone", "../../../../core/utils/date_serialization", "../../expressionUtils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.sortAppointmentsByStartDate = exports.replaceWrongEndDate = exports.getRecurrenceException = exports.getAppointmentTakesSeveralDays = exports.compareDateWithStartDayHour = exports.compareDateWithEndDayHour = exports._isEndDateWrong = exports._convertRecurrenceException = exports._appointmentPartInInterval = void 0;
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  var _utils = _interopRequireDefault($__require("../../utils.timeZone"));
  var _date_serialization = _interopRequireDefault($__require("../../../../core/utils/date_serialization"));
  var _expressionUtils = $__require("../../expressionUtils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var toMs = _date.default.dateToMilliseconds;
  var FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
  var compareDateWithStartDayHour = function compareDateWithStartDayHour(startDate, endDate, startDayHour, allDay, severalDays) {
    var startTime = _date.default.dateTimeFromDecimal(startDayHour);
    var result = startDate.getHours() >= startTime.hours && startDate.getMinutes() >= startTime.minutes || endDate.getHours() === startTime.hours && endDate.getMinutes() > startTime.minutes || endDate.getHours() > startTime.hours || severalDays || allDay;
    return result;
  };
  exports.compareDateWithStartDayHour = compareDateWithStartDayHour;
  var compareDateWithEndDayHour = function compareDateWithEndDayHour(options) {
    var startDate = options.startDate,
        endDate = options.endDate,
        startDayHour = options.startDayHour,
        endDayHour = options.endDayHour,
        viewStartDayHour = options.viewStartDayHour,
        viewEndDayHour = options.viewEndDayHour,
        allDay = options.allDay,
        severalDays = options.severalDays,
        min = options.min,
        max = options.max,
        checkIntersectViewport = options.checkIntersectViewport;
    var hiddenInterval = (24 - viewEndDayHour + viewStartDayHour) * toMs('hour');
    var apptDuration = endDate.getTime() - startDate.getTime();
    var delta = (hiddenInterval - apptDuration) / toMs('hour');
    var apptStartHour = startDate.getHours();
    var apptStartMinutes = startDate.getMinutes();
    var result;
    var endTime = _date.default.dateTimeFromDecimal(endDayHour);
    var startTime = _date.default.dateTimeFromDecimal(startDayHour);
    var apptIntersectViewport = startDate < max && endDate > min;
    result = checkIntersectViewport && apptIntersectViewport || apptStartHour < endTime.hours || apptStartHour === endTime.hours && apptStartMinutes < endTime.minutes || allDay && startDate <= max || severalDays && apptIntersectViewport && (apptStartHour < endTime.hours || endDate.getHours() * 60 + endDate.getMinutes() > startTime.hours * 60);
    if (apptDuration < hiddenInterval) {
      if (apptStartHour > endTime.hours && apptStartMinutes > endTime.minutes && delta <= apptStartHour - endDayHour) {
        result = false;
      }
    }
    return result;
  };
  exports.compareDateWithEndDayHour = compareDateWithEndDayHour;
  var getAppointmentTakesSeveralDays = function getAppointmentTakesSeveralDays(adapter) {
    return !_date.default.sameDate(adapter.startDate, adapter.endDate);
  };
  exports.getAppointmentTakesSeveralDays = getAppointmentTakesSeveralDays;
  var _isEndDateWrong = function _isEndDateWrong(startDate, endDate) {
    return !endDate || isNaN(endDate.getTime()) || startDate.getTime() > endDate.getTime();
  };
  exports._isEndDateWrong = _isEndDateWrong;
  var _appointmentPartInInterval = function _appointmentPartInInterval(startDate, endDate, startDayHour, endDayHour) {
    var apptStartDayHour = startDate.getHours();
    var apptEndDayHour = endDate.getHours();
    return apptStartDayHour <= startDayHour && apptEndDayHour <= endDayHour && apptEndDayHour >= startDayHour || apptEndDayHour >= endDayHour && apptStartDayHour <= endDayHour && apptStartDayHour >= startDayHour;
  };
  exports._appointmentPartInInterval = _appointmentPartInInterval;
  var getRecurrenceException = function getRecurrenceException(appointmentAdapter, timeZoneCalculator, timeZone) {
    var recurrenceException = appointmentAdapter.recurrenceException;
    if (recurrenceException) {
      var exceptions = recurrenceException.split(',');
      for (var i = 0; i < exceptions.length; i++) {
        exceptions[i] = _convertRecurrenceException(exceptions[i], appointmentAdapter.startDate, timeZoneCalculator, timeZone);
      }
      return exceptions.join();
    }
    return recurrenceException;
  };
  exports.getRecurrenceException = getRecurrenceException;
  var _convertRecurrenceException = function _convertRecurrenceException(exceptionString, startDate, timeZoneCalculator, timeZone) {
    exceptionString = exceptionString.replace(/\s/g, '');
    var getConvertedToTimeZone = function getConvertedToTimeZone(date) {
      return timeZoneCalculator.createDate(date, {
        path: 'toGrid'
      });
    };
    var exceptionDate = _date_serialization.default.deserializeDate(exceptionString);
    var convertedStartDate = getConvertedToTimeZone(startDate);
    var convertedExceptionDate = getConvertedToTimeZone(exceptionDate);
    convertedExceptionDate = _utils.default.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate, timeZone);
    exceptionString = _date_serialization.default.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
    return exceptionString;
  };
  exports._convertRecurrenceException = _convertRecurrenceException;
  var replaceWrongEndDate = function replaceWrongEndDate(rawAppointment, startDate, endDate, appointmentDuration, dataAccessors) {
    var calculateAppointmentEndDate = function calculateAppointmentEndDate(isAllDay, startDate) {
      if (isAllDay) {
        return _date.default.setToDayEnd(new Date(startDate));
      }
      return new Date(startDate.getTime() + appointmentDuration * toMs('minute'));
    };
    if (_isEndDateWrong(startDate, endDate)) {
      var isAllDay = _expressionUtils.ExpressionUtils.getField(dataAccessors, 'allDay', rawAppointment);
      var calculatedEndDate = calculateAppointmentEndDate(isAllDay, startDate);
      dataAccessors.setter.endDate(rawAppointment, calculatedEndDate);
    }
  };
  exports.replaceWrongEndDate = replaceWrongEndDate;
  var sortAppointmentsByStartDate = function sortAppointmentsByStartDate(appointments, dataAccessors) {
    appointments.sort(function (a, b) {
      var firstDate = new Date(_expressionUtils.ExpressionUtils.getField(dataAccessors, 'startDate', a.settings || a));
      var secondDate = new Date(_expressionUtils.ExpressionUtils.getField(dataAccessors, 'startDate', b.settings || b));
      return Math.sign(firstDate.getTime() - secondDate.getTime());
    });
  };
  exports.sortAppointmentsByStartDate = sortAppointmentsByStartDate;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/date","../../utils.timeZone","../../../../core/utils/date_serialization","../../expressionUtils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/date"), require("../../utils.timeZone"), require("../../../../core/utils/date_serialization"), require("../../expressionUtils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.js.map