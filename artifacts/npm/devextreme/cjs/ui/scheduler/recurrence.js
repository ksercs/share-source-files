/**
* DevExtreme (cjs/ui/scheduler/recurrence.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getRecurrenceProcessor = getRecurrenceProcessor;
var _errors = _interopRequireDefault(require("../../core/errors"));
var _iterator = require("../../core/utils/iterator");
var _rrule = require("rrule");
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _utils = _interopRequireDefault(require("./utils.timeZone"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
