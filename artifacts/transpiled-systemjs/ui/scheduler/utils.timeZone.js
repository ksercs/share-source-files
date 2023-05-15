!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/utils.timeZone.js"], ["../../core/utils/date","./timezones/utils.timezones_data","./dateAdapter"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/utils.timeZone.js", ["../../core/utils/date", "./timezones/utils.timezones_data", "./dateAdapter"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _utils = _interopRequireDefault($__require("./timezones/utils.timezones_data"));
  var _dateAdapter = _interopRequireDefault($__require("./dateAdapter"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  var toMs = _date.default.dateToMilliseconds;
  var MINUTES_IN_HOUR = 60;
  var MS_IN_MINUTE = 60000;
  var createUTCDateWithLocalOffset = function createUTCDateWithLocalOffset(date) {
    if (!date) {
      return null;
    }
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  };
  var createDateFromUTCWithLocalOffset = function createDateFromUTCWithLocalOffset(date) {
    var result = (0, _dateAdapter.default)(date);
    var timezoneOffsetBeforeInMin = result.getTimezoneOffset();
    result.addTime(result.getTimezoneOffset('minute'));
    result.subtractMinutes(timezoneOffsetBeforeInMin - result.getTimezoneOffset());
    return result.source;
  };
  var getTimeZones = function getTimeZones() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var dateInUTC = createUTCDate(date);
    return _utils.default.getDisplayedTimeZones(dateInUTC.getTime());
  };
  var createUTCDate = function createUTCDate(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()));
  };
  var getTimezoneOffsetChangeInMinutes = function getTimezoneOffsetChangeInMinutes(startDate, endDate, updatedStartDate, updatedEndDate) {
    return getDaylightOffset(updatedStartDate, updatedEndDate) - getDaylightOffset(startDate, endDate);
  };
  var getTimezoneOffsetChangeInMs = function getTimezoneOffsetChangeInMs(startDate, endDate, updatedStartDate, updatedEndDate) {
    return getTimezoneOffsetChangeInMinutes(startDate, endDate, updatedStartDate, updatedEndDate) * toMs('minute');
  };
  var getDaylightOffset = function getDaylightOffset(startDate, endDate) {
    return new Date(startDate).getTimezoneOffset() - new Date(endDate).getTimezoneOffset();
  };
  var getDaylightOffsetInMs = function getDaylightOffsetInMs(startDate, endDate) {
    return getDaylightOffset(startDate, endDate) * toMs('minute');
  };
  var calculateTimezoneByValue = function calculateTimezoneByValue(timezone) {
    var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
    // NOTE: This check could be removed. We don't support numerical timezones
    if (typeof timezone === 'string') {
      var dateUtc = createUTCDate(date);
      return _utils.default.getTimeZoneOffsetById(timezone, dateUtc.getTime());
    }
    return timezone;
  };
  var _getDaylightOffsetByTimezone = function _getDaylightOffsetByTimezone(startDate, endDate, timeZone) {
    return calculateTimezoneByValue(timeZone, startDate) - calculateTimezoneByValue(timeZone, endDate);
  };
  var getCorrectedDateByDaylightOffsets = function getCorrectedDateByDaylightOffsets(convertedOriginalStartDate, convertedDate, date, timeZone, startDateTimezone) {
    var daylightOffsetByCommonTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, timeZone);
    var daylightOffsetByAppointmentTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, startDateTimezone);
    var diff = daylightOffsetByCommonTimezone - daylightOffsetByAppointmentTimezone;
    return new Date(date.getTime() - diff * toMs('hour'));
  };
  var correctRecurrenceExceptionByTimezone = function correctRecurrenceExceptionByTimezone(exception, exceptionByStartDate, timeZone, startDateTimeZone) {
    var isBackConversion = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var timezoneOffset = (exception.getTimezoneOffset() - exceptionByStartDate.getTimezoneOffset()) / MINUTES_IN_HOUR;
    if (startDateTimeZone) {
      timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, startDateTimeZone);
    } else if (timeZone) {
      timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, timeZone);
    }
    return new Date(exception.getTime() + (isBackConversion ? -1 : 1) * timezoneOffset * toMs('hour'));
  };
  var isTimezoneChangeInDate = function isTimezoneChangeInDate(date) {
    var startDayDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    var endDayDate = new Date(new Date(date).setHours(23, 59, 59, 0));
    return startDayDate.getTimezoneOffset() - endDayDate.getTimezoneOffset() !== 0;
  };
  var getDateWithoutTimezoneChange = function getDateWithoutTimezoneChange(date) {
    var clonedDate = new Date(date);
    if (isTimezoneChangeInDate(clonedDate)) {
      var result = new Date(clonedDate);
      return new Date(result.setDate(result.getDate() + 1));
    }
    return clonedDate;
  };
  var isSameAppointmentDates = function isSameAppointmentDates(startDate, endDate) {
    // NOTE: subtract 1 millisecond to avoid 00.00 time. Method should return 'true' for "2020:10:10 22:00:00" and "2020:10:11 00:00:00", for example.
    endDate = new Date(endDate.getTime() - 1);
    return _date.default.sameDate(startDate, endDate);
  };
  var getClientTimezoneOffset = function getClientTimezoneOffset() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    return date.getTimezoneOffset() * MS_IN_MINUTE;
  };
  var getDiffBetweenClientTimezoneOffsets = function getDiffBetweenClientTimezoneOffsets() {
    var firstDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var secondDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
    return getClientTimezoneOffset(firstDate) - getClientTimezoneOffset(secondDate);
  };
  var isEqualLocalTimeZone = function isEqualLocalTimeZone(timeZoneName) {
    var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
    if (Intl) {
      var localTimeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (localTimeZoneName === timeZoneName) {
        return true;
      }
    }
    return isEqualLocalTimeZoneByDeclaration(timeZoneName, date);
  };

  // TODO: Not used anywhere, if it isn't use in the future, then it must be removed
  var hasDSTInLocalTimeZone = function hasDSTInLocalTimeZone() {
    var _getExtremeDates = getExtremeDates(),
        _getExtremeDates2 = _slicedToArray(_getExtremeDates, 2),
        startDate = _getExtremeDates2[0],
        endDate = _getExtremeDates2[1];
    return startDate.getTimezoneOffset() !== endDate.getTimezoneOffset();
  };
  var isEqualLocalTimeZoneByDeclaration = function isEqualLocalTimeZoneByDeclaration(timeZoneName, date) {
    var year = date.getFullYear();
    var getOffset = function getOffset(date) {
      return -date.getTimezoneOffset() / 60;
    };
    var getDateAndMoveHourBack = function getDateAndMoveHourBack(dateStamp) {
      return new Date(dateStamp - 3600000);
    };
    var configTuple = _utils.default.getTimeZoneDeclarationTuple(timeZoneName, year);
    var _configTuple = _slicedToArray(configTuple, 2),
        summerTime = _configTuple[0],
        winterTime = _configTuple[1];
    var noDSTInTargetTimeZone = configTuple.length < 2;
    if (noDSTInTargetTimeZone) {
      var targetTimeZoneOffset = _utils.default.getTimeZoneOffsetById(timeZoneName, date);
      var localTimeZoneOffset = getOffset(date);
      if (targetTimeZoneOffset !== localTimeZoneOffset) {
        return false;
      }
      return hasDSTInLocalTimeZone() ? false : true;
    }
    var localSummerOffset = getOffset(new Date(summerTime.date));
    var localWinterOffset = getOffset(new Date(winterTime.date));
    if (localSummerOffset !== summerTime.offset) {
      return false;
    }
    if (localSummerOffset === getOffset(getDateAndMoveHourBack(summerTime.date))) {
      return false;
    }
    if (localWinterOffset !== winterTime.offset) {
      return false;
    }
    if (localWinterOffset === getOffset(getDateAndMoveHourBack(winterTime.date))) {
      return false;
    }
    return true;
  };

  // TODO: Getting two dates in january or june is the standard mechanism for determining that an offset has occurred.
  var getExtremeDates = function getExtremeDates() {
    var nowDate = new Date(Date.now());
    var startDate = new Date();
    var endDate = new Date();
    startDate.setFullYear(nowDate.getFullYear(), 0, 1);
    endDate.setFullYear(nowDate.getFullYear(), 6, 1);
    return [startDate, endDate];
  };
  var setOffsetsToDate = function setOffsetsToDate(targetDate, offsetsArray) {
    var newDateMs = offsetsArray.reduce(function (result, offset) {
      return result + offset;
    }, targetDate.getTime());
    return new Date(newDateMs);
  };
  var utils = {
    getDaylightOffset: getDaylightOffset,
    getDaylightOffsetInMs: getDaylightOffsetInMs,
    getTimezoneOffsetChangeInMinutes: getTimezoneOffsetChangeInMinutes,
    getTimezoneOffsetChangeInMs: getTimezoneOffsetChangeInMs,
    calculateTimezoneByValue: calculateTimezoneByValue,
    getCorrectedDateByDaylightOffsets: getCorrectedDateByDaylightOffsets,
    isSameAppointmentDates: isSameAppointmentDates,
    correctRecurrenceExceptionByTimezone: correctRecurrenceExceptionByTimezone,
    getClientTimezoneOffset: getClientTimezoneOffset,
    getDiffBetweenClientTimezoneOffsets: getDiffBetweenClientTimezoneOffsets,
    createUTCDateWithLocalOffset: createUTCDateWithLocalOffset,
    createDateFromUTCWithLocalOffset: createDateFromUTCWithLocalOffset,
    createUTCDate: createUTCDate,
    isTimezoneChangeInDate: isTimezoneChangeInDate,
    getDateWithoutTimezoneChange: getDateWithoutTimezoneChange,
    hasDSTInLocalTimeZone: hasDSTInLocalTimeZone,
    isEqualLocalTimeZone: isEqualLocalTimeZone,
    isEqualLocalTimeZoneByDeclaration: isEqualLocalTimeZoneByDeclaration,
    getTimeZones: getTimeZones,
    setOffsetsToDate: setOffsetsToDate
  };
  var _default = utils;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/date","./timezones/utils.timezones_data","./dateAdapter"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/date"), require("./timezones/utils.timezones_data"), require("./dateAdapter"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.timeZone.js.map