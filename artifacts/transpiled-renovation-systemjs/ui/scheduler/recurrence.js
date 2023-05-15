!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/recurrence.js"], ["../../core/errors","../../core/utils/iterator","rrule","../../core/utils/date","./utils.timeZone"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/recurrence.js", ["../../core/errors", "../../core/utils/iterator", "rrule", "../../core/utils/date", "./utils.timeZone"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.getRecurrenceProcessor = getRecurrenceProcessor;
  var _errors = _interopRequireDefault($__require("../../core/errors"));
  var _iterator = $__require("../../core/utils/iterator");
  var _rrule = $__require("rrule");
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _utils = _interopRequireDefault($__require("./utils.timeZone"));
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
  var ruleNames = ['freq', 'interval', 'byday', 'byweekno', 'byyearday', 'bymonth', 'bymonthday', 'count', 'until', 'byhour', 'byminute', 'bysecond', 'bysetpos', 'wkst'];
  var freqNames = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'SECONDLY', 'MINUTELY', 'HOURLY'];
  var days = {
    SU: 0,
    MO: 1,
    TU: 2,
    WE: 3,
    TH: 4,
    FR: 5,
    SA: 6
  };
  var loggedWarnings = [];
  var MS_IN_HOUR = 1000 * 60 * 60;
  var MS_IN_DAY = MS_IN_HOUR * 24;
  var recurrence = null;
  function getRecurrenceProcessor() {
    if (!recurrence) {
      recurrence = new RecurrenceProcessor();
    }
    return recurrence;
  }
  var RecurrenceProcessor = /*#__PURE__*/function () {
    function RecurrenceProcessor() {
      this.rRule = null;
      this.rRuleSet = null;
      this.validator = new RecurrenceValidator();
    }
    var _proto = RecurrenceProcessor.prototype;
    _proto.generateDates = function generateDates(options) {
      var _this = this;
      var recurrenceRule = this.evalRecurrenceRule(options.rule);
      var rule = recurrenceRule.rule;
      if (!recurrenceRule.isValid || !rule.freq) {
        return [];
      }
      var rruleIntervalParams = this._createRruleIntervalParams(options);
      this._initializeRRule(options, rruleIntervalParams.startIntervalDate, rule.until);
      return this.rRuleSet.between(rruleIntervalParams.minViewDate, rruleIntervalParams.maxViewDate, true).filter(function (date) {
        return date.getTime() + rruleIntervalParams.appointmentDuration >= rruleIntervalParams.minViewTime;
      }).map(function (date) {
        return _this._convertRruleResult(rruleIntervalParams, options, date);
      });
    };
    _proto._createRruleIntervalParams = function _createRruleIntervalParams(options) {
      var start = options.start,
          min = options.min,
          max = options.max,
          appointmentTimezoneOffset = options.appointmentTimezoneOffset;
      // NOTE: Get local timezone offset of each Rrule date params.
      var clientOffsets = {
        startDate: _utils.default.getClientTimezoneOffset(start),
        minViewDate: _utils.default.getClientTimezoneOffset(min),
        maxViewDate: _utils.default.getClientTimezoneOffset(max)
      };
      var duration = options.end ? options.end.getTime() - options.start.getTime() : 0;

      // NOTE: Remove local timezone offsets from Rrule date params.
      var startIntervalDate = _utils.default.setOffsetsToDate(options.start, [-clientOffsets.startDate, appointmentTimezoneOffset]);
      var minViewTime = options.min.getTime() - clientOffsets.minViewDate + appointmentTimezoneOffset;
      // NOTE: Shift minViewDate, because recurrent appointment may start before start view date.
      var minViewDate = new Date(minViewTime - duration);
      var maxViewDate = _utils.default.setOffsetsToDate(options.max, [-clientOffsets.maxViewDate, appointmentTimezoneOffset]);

      // NOTE: Check DST after start date without local timezone offset conversion.
      var startDateDSTDifferenceMs = _utils.default.getDiffBetweenClientTimezoneOffsets(options.start, startIntervalDate);
      var switchToSummerTime = startDateDSTDifferenceMs < 0;
      return {
        startIntervalDate: startIntervalDate,
        minViewTime: minViewTime,
        minViewDate: minViewDate,
        maxViewDate: maxViewDate,
        startIntervalDateDSTShift: switchToSummerTime ? 0 : startDateDSTDifferenceMs,
        appointmentDuration: duration
      };
    };
    _proto._convertRruleResult = function _convertRruleResult(rruleIntervalParams, options, rruleDate) {
      var localTimezoneOffset = _utils.default.getClientTimezoneOffset(rruleDate);
      // NOTE: Workaround for the RRule bug with timezones greater than GMT+12 (e.g. Apia Standard Time GMT+13)
      // GitHub issue: https://github.com/jakubroztocil/rrule/issues/555
      var additionalWorkaroundOffsetForRrule = localTimezoneOffset / MS_IN_HOUR <= -13 ? -MS_IN_DAY : 0;
      var convertedBackDate = _utils.default.setOffsetsToDate(rruleDate, [localTimezoneOffset, additionalWorkaroundOffsetForRrule, -options.appointmentTimezoneOffset, rruleIntervalParams.startIntervalDateDSTShift]);
      var convertedDateDSTShift = _utils.default.getDiffBetweenClientTimezoneOffsets(convertedBackDate, rruleDate);
      var switchToSummerTime = convertedDateDSTShift < 0;
      var resultDate = _utils.default.setOffsetsToDate(convertedBackDate, [convertedDateDSTShift]);
      var resultDateDSTShift = _utils.default.getDiffBetweenClientTimezoneOffsets(resultDate, convertedBackDate);
      if (resultDateDSTShift && switchToSummerTime) {
        return new Date(resultDate.getTime() + resultDateDSTShift);
      }
      return resultDate;
    };
    _proto.hasRecurrence = function hasRecurrence(options) {
      return !!this.generateDates(options).length;
    };
    _proto.evalRecurrenceRule = function evalRecurrenceRule(rule) {
      var result = {
        rule: {},
        isValid: false
      };
      if (rule) {
        result.rule = this._parseRecurrenceRule(rule);
        result.isValid = this.validator.validateRRule(result.rule, rule);
      }
      return result;
    };
    _proto.isValidRecurrenceRule = function isValidRecurrenceRule(rule) {
      return this.evalRecurrenceRule(rule).isValid;
    };
    _proto.daysFromByDayRule = function daysFromByDayRule(rule) {
      var result = [];
      if (rule['byday']) {
        if (Array.isArray(rule['byday'])) {
          result = rule['byday'];
        } else {
          result = rule['byday'].split(',');
        }
      }
      return result.map(function (item) {
        var match = item.match(/[A-Za-z]+/);
        return !!match && match[0];
      }).filter(function (item) {
        return !!item;
      });
    };
    _proto.getAsciiStringByDate = function getAsciiStringByDate(date) {
      var currentOffset = date.getTimezoneOffset() * toMs('minute');
      var offsetDate = new Date(date.getTime() + currentOffset);
      return offsetDate.getFullYear() + ('0' + (offsetDate.getMonth() + 1)).slice(-2) + ('0' + offsetDate.getDate()).slice(-2) + 'T' + ('0' + offsetDate.getHours()).slice(-2) + ('0' + offsetDate.getMinutes()).slice(-2) + ('0' + offsetDate.getSeconds()).slice(-2) + 'Z';
    };
    _proto.getRecurrenceString = function getRecurrenceString(object) {
      if (!object || !object.freq) {
        return;
      }
      var result = '';
      for (var field in object) {
        var value = object[field];
        if (field === 'interval' && value < 2) {
          continue;
        }
        if (field === 'until') {
          value = this.getAsciiStringByDate(value);
        }
        result += field + '=' + value + ';';
      }
      result = result.substring(0, result.length - 1);
      return result.toUpperCase();
    };
    _proto._parseExceptionToRawArray = function _parseExceptionToRawArray(value) {
      return value.match(/(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2}))?(Z)?/);
    };
    _proto.getDateByAsciiString = function getDateByAsciiString(exceptionText) {
      if (typeof exceptionText !== 'string') {
        return exceptionText;
      }
      var result = this._parseExceptionToRawArray(exceptionText);
      if (!result) {
        return null;
      }
      var _this$_createDateTupl = this._createDateTuple(result),
          _this$_createDateTupl2 = _slicedToArray(_this$_createDateTupl, 7),
          year = _this$_createDateTupl2[0],
          month = _this$_createDateTupl2[1],
          date = _this$_createDateTupl2[2],
          hours = _this$_createDateTupl2[3],
          minutes = _this$_createDateTupl2[4],
          seconds = _this$_createDateTupl2[5],
          isUtc = _this$_createDateTupl2[6];
      if (isUtc) {
        return new Date(Date.UTC(year, month, date, hours, minutes, seconds));
      }
      return new Date(year, month, date, hours, minutes, seconds);
    };
    _proto._dispose = function _dispose() {
      if (this.rRuleSet) {
        delete this.rRuleSet;
        this.rRuleSet = null;
      }
      if (this.rRule) {
        delete this.rRule;
        this.rRule = null;
      }
    };
    _proto._getTimeZoneOffset = function _getTimeZoneOffset() {
      return new Date().getTimezoneOffset();
    };
    _proto._initializeRRule = function _initializeRRule(options, startDateUtc, until) {
      var _this2 = this;
      var ruleOptions = _rrule.RRule.parseString(options.rule);
      var firstDayOfWeek = options.firstDayOfWeek;
      ruleOptions.dtstart = startDateUtc;
      if (!ruleOptions.wkst && firstDayOfWeek) {
        var weekDayNumbers = [6, 0, 1, 2, 3, 4, 5];
        ruleOptions.wkst = weekDayNumbers[firstDayOfWeek];
      }
      if (until) {
        ruleOptions.until = _utils.default.setOffsetsToDate(until, [-_utils.default.getClientTimezoneOffset(until), options.appointmentTimezoneOffset]);
      }
      this._createRRule(ruleOptions);
      if (options.exception) {
        var exceptionStrings = options.exception;
        var exceptionDates = exceptionStrings.split(',').map(function (rule) {
          return _this2.getDateByAsciiString(rule);
        });
        exceptionDates.forEach(function (date) {
          if (options.getPostProcessedException) {
            date = options.getPostProcessedException(date);
          }
          var utcDate = _utils.default.setOffsetsToDate(date, [-_utils.default.getClientTimezoneOffset(date), options.appointmentTimezoneOffset]);
          _this2.rRuleSet.exdate(utcDate);
        });
      }
    };
    _proto._createRRule = function _createRRule(ruleOptions) {
      this._dispose();
      this.rRuleSet = new _rrule.RRuleSet();
      this.rRule = new _rrule.RRule(ruleOptions);
      this.rRuleSet.rrule(this.rRule);
    };
    _proto._parseRecurrenceRule = function _parseRecurrenceRule(recurrence) {
      var ruleObject = {};
      var ruleParts = recurrence.split(';');
      for (var i = 0, len = ruleParts.length; i < len; i++) {
        var rule = ruleParts[i].split('=');
        var ruleName = rule[0].toLowerCase();
        var ruleValue = rule[1];
        ruleObject[ruleName] = ruleValue;
      }
      var count = parseInt(ruleObject.count);
      if (!isNaN(count)) {
        ruleObject.count = count;
      }
      if (ruleObject.interval) {
        var interval = parseInt(ruleObject.interval);
        if (!isNaN(interval)) {
          ruleObject.interval = interval;
        }
      } else {
        ruleObject.interval = 1;
      }
      if (ruleObject.freq && ruleObject.until) {
        ruleObject.until = this.getDateByAsciiString(ruleObject.until);
      }
      return ruleObject;
    };
    _proto._createDateTuple = function _createDateTuple(parseResult) {
      var isUtc = parseResult[8] !== undefined;
      parseResult.shift();
      if (parseResult[3] === undefined) {
        parseResult.splice(3);
      } else {
        parseResult.splice(3, 1);
        parseResult.splice(6);
      }
      parseResult[1]--;
      parseResult.unshift(null);
      return [parseInt(parseResult[1]), parseInt(parseResult[2]), parseInt(parseResult[3]), parseInt(parseResult[4]) || 0, parseInt(parseResult[5]) || 0, parseInt(parseResult[6]) || 0, isUtc];
    };
    return RecurrenceProcessor;
  }();
  var RecurrenceValidator = /*#__PURE__*/function () {
    function RecurrenceValidator() {}
    var _proto2 = RecurrenceValidator.prototype;
    _proto2.validateRRule = function validateRRule(rule, recurrence) {
      if (this._brokenRuleNameExists(rule) || !freqNames.includes(rule.freq) || this._wrongCountRule(rule) || this._wrongIntervalRule(rule) || this._wrongDayOfWeek(rule) || this._wrongByMonthDayRule(rule) || this._wrongByMonth(rule) || this._wrongUntilRule(rule)) {
        this._logBrokenRule(recurrence);
        return false;
      }
      return true;
    };
    _proto2._wrongUntilRule = function _wrongUntilRule(rule) {
      var wrongUntil = false;
      var until = rule.until;
      if (until !== undefined && !(until instanceof Date)) {
        wrongUntil = true;
      }
      return wrongUntil;
    };
    _proto2._wrongCountRule = function _wrongCountRule(rule) {
      var wrongCount = false;
      var count = rule.count;
      if (count && typeof count === 'string') {
        wrongCount = true;
      }
      return wrongCount;
    };
    _proto2._wrongByMonthDayRule = function _wrongByMonthDayRule(rule) {
      var wrongByMonthDay = false;
      var byMonthDay = rule['bymonthday'];
      if (byMonthDay && isNaN(parseInt(byMonthDay))) {
        wrongByMonthDay = true;
      }
      return wrongByMonthDay;
    };
    _proto2._wrongByMonth = function _wrongByMonth(rule) {
      var wrongByMonth = false;
      var byMonth = rule['bymonth'];
      if (byMonth && isNaN(parseInt(byMonth))) {
        wrongByMonth = true;
      }
      return wrongByMonth;
    };
    _proto2._wrongIntervalRule = function _wrongIntervalRule(rule) {
      var wrongInterval = false;
      var interval = rule.interval;
      if (interval && typeof interval === 'string') {
        wrongInterval = true;
      }
      return wrongInterval;
    };
    _proto2._wrongDayOfWeek = function _wrongDayOfWeek(rule) {
      var byDay = rule['byday'];
      var daysByRule = getRecurrenceProcessor().daysFromByDayRule(rule);
      var brokenDaysExist = false;
      if (byDay === '') {
        brokenDaysExist = true;
      }
      (0, _iterator.each)(daysByRule, function (_, day) {
        if (!Object.prototype.hasOwnProperty.call(days, day)) {
          brokenDaysExist = true;
          return false;
        }
      });
      return brokenDaysExist;
    };
    _proto2._brokenRuleNameExists = function _brokenRuleNameExists(rule) {
      var brokenRuleExists = false;
      (0, _iterator.each)(rule, function (ruleName) {
        if (!ruleNames.includes(ruleName)) {
          brokenRuleExists = true;
          return false;
        }
      });
      return brokenRuleExists;
    };
    _proto2._logBrokenRule = function _logBrokenRule(recurrence) {
      if (!loggedWarnings.includes(recurrence)) {
        _errors.default.log('W0006', recurrence);
        loggedWarnings.push(recurrence);
      }
    };
    return RecurrenceValidator;
  }();
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/errors","../../core/utils/iterator","rrule","../../core/utils/date","./utils.timeZone"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/errors"), require("../../core/utils/iterator"), require("rrule"), require("../../core/utils/date"), require("./utils.timeZone"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=recurrence.js.map