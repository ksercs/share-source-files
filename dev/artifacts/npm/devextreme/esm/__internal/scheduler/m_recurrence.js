/**
* DevExtreme (esm/__internal/scheduler/m_recurrence.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file, spellcheck/spell-checker */
import errors from '../../core/errors';
import dateUtils from '../../core/utils/date';
import { each } from '../../core/utils/iterator';
import { RRule, RRuleSet } from 'rrule';
import timeZoneUtils from './m_utils_time_zone';
var toMs = dateUtils.dateToMilliseconds;
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
export function getRecurrenceProcessor() {
  if (!recurrence) {
    recurrence = new RecurrenceProcessor();
  }
  return recurrence;
}
class RecurrenceProcessor {
  constructor() {
    this.rRule = null;
    this.rRuleSet = null;
    this.validator = new RecurrenceValidator();
  }
  generateDates(options) {
    var recurrenceRule = this.evalRecurrenceRule(options.rule);
    var {
      rule
    } = recurrenceRule;
    if (!recurrenceRule.isValid || !rule.freq) {
      return [];
    }
    var rruleIntervalParams = this._createRruleIntervalParams(options);
    this._initializeRRule(options, rruleIntervalParams.startIntervalDate, rule.until);
    return this.rRuleSet.between(rruleIntervalParams.minViewDate, rruleIntervalParams.maxViewDate, true).filter(date => date.getTime() + rruleIntervalParams.appointmentDuration >= rruleIntervalParams.minViewTime).map(date => this._convertRruleResult(rruleIntervalParams, options, date));
  }
  _createRruleIntervalParams(options) {
    var {
      start,
      min,
      max,
      appointmentTimezoneOffset
    } = options;
    // NOTE: Get local timezone offset of each Rrule date params.
    var clientOffsets = {
      startDate: timeZoneUtils.getClientTimezoneOffset(start),
      minViewDate: timeZoneUtils.getClientTimezoneOffset(min),
      maxViewDate: timeZoneUtils.getClientTimezoneOffset(max)
    };
    var duration = options.end ? options.end.getTime() - options.start.getTime() : 0;
    // NOTE: Remove local timezone offsets from Rrule date params.
    var startIntervalDate = timeZoneUtils.setOffsetsToDate(options.start, [-clientOffsets.startDate, appointmentTimezoneOffset]);
    var minViewTime = options.min.getTime() - clientOffsets.minViewDate + appointmentTimezoneOffset;
    // NOTE: Shift minViewDate, because recurrent appointment may start before start view date.
    var minViewDate = new Date(minViewTime - duration);
    var maxViewDate = timeZoneUtils.setOffsetsToDate(options.max, [-clientOffsets.maxViewDate, appointmentTimezoneOffset]);
    // NOTE: Check DST after start date without local timezone offset conversion.
    var startDateDSTDifferenceMs = timeZoneUtils.getDiffBetweenClientTimezoneOffsets(options.start, startIntervalDate);
    var switchToSummerTime = startDateDSTDifferenceMs < 0;
    return {
      startIntervalDate,
      minViewTime,
      minViewDate,
      maxViewDate,
      startIntervalDateDSTShift: switchToSummerTime ? 0 : startDateDSTDifferenceMs,
      appointmentDuration: duration
    };
  }
  _convertRruleResult(rruleIntervalParams, options, rruleDate) {
    var localTimezoneOffset = timeZoneUtils.getClientTimezoneOffset(rruleDate);
    // NOTE: Workaround for the RRule bug with timezones greater than GMT+12 (e.g. Apia Standard Time GMT+13)
    // GitHub issue: https://github.com/jakubroztocil/rrule/issues/555
    var additionalWorkaroundOffsetForRrule = localTimezoneOffset / MS_IN_HOUR <= -13 ? -MS_IN_DAY : 0;
    var convertedBackDate = timeZoneUtils.setOffsetsToDate(rruleDate, [localTimezoneOffset, additionalWorkaroundOffsetForRrule, -options.appointmentTimezoneOffset, rruleIntervalParams.startIntervalDateDSTShift]);
    var convertedDateDSTShift = timeZoneUtils.getDiffBetweenClientTimezoneOffsets(convertedBackDate, rruleDate);
    var switchToSummerTime = convertedDateDSTShift < 0;
    var resultDate = timeZoneUtils.setOffsetsToDate(convertedBackDate, [convertedDateDSTShift]);
    var resultDateDSTShift = timeZoneUtils.getDiffBetweenClientTimezoneOffsets(resultDate, convertedBackDate);
    if (resultDateDSTShift && switchToSummerTime) {
      return new Date(resultDate.getTime() + resultDateDSTShift);
    }
    return resultDate;
  }
  hasRecurrence(options) {
    return !!this.generateDates(options).length;
  }
  evalRecurrenceRule(rule) {
    var result = {
      rule: {},
      isValid: false
    };
    if (rule) {
      result.rule = this._parseRecurrenceRule(rule);
      result.isValid = this.validator.validateRRule(result.rule, rule);
    }
    return result;
  }
  isValidRecurrenceRule(rule) {
    return this.evalRecurrenceRule(rule).isValid;
  }
  daysFromByDayRule(rule) {
    var result = [];
    if (rule.byday) {
      if (Array.isArray(rule.byday)) {
        result = rule.byday;
      } else {
        result = rule.byday.split(',');
      }
    }
    return result.map(item => {
      var match = item.match(/[A-Za-z]+/);
      return !!match && match[0];
    }).filter(item => !!item);
  }
  getAsciiStringByDate(date) {
    var currentOffset = date.getTimezoneOffset() * toMs('minute');
    var offsetDate = new Date(date.getTime() + currentOffset);
    return "".concat(offsetDate.getFullYear() + "0".concat(offsetDate.getMonth() + 1).slice(-2) + "0".concat(offsetDate.getDate()).slice(-2), "T").concat("0".concat(offsetDate.getHours()).slice(-2)).concat("0".concat(offsetDate.getMinutes()).slice(-2)).concat("0".concat(offsetDate.getSeconds()).slice(-2), "Z");
  }
  getRecurrenceString(object) {
    if (!object || !object.freq) {
      return;
    }
    var result = '';
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var field in object) {
      var value = object[field];
      if (field === 'interval' && value < 2) {
        continue;
      }
      if (field === 'until') {
        value = this.getAsciiStringByDate(value);
      }
      result += "".concat(field, "=").concat(value, ";");
    }
    result = result.substring(0, result.length - 1);
    return result.toUpperCase();
  }
  _parseExceptionToRawArray(value) {
    return value.match(/(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2}))?(Z)?/);
  }
  getDateByAsciiString(exceptionText) {
    if (typeof exceptionText !== 'string') {
      return exceptionText;
    }
    var result = this._parseExceptionToRawArray(exceptionText);
    if (!result) {
      return null;
    }
    var [year, month, date, hours, minutes, seconds, isUtc] = this._createDateTuple(result);
    if (isUtc) {
      return new Date(Date.UTC(year, month, date, hours, minutes, seconds));
    }
    return new Date(year, month, date, hours, minutes, seconds);
  }
  _dispose() {
    if (this.rRuleSet) {
      // @ts-expect-error
      delete this.rRuleSet;
      this.rRuleSet = null;
    }
    if (this.rRule) {
      // @ts-expect-error
      delete this.rRule;
      this.rRule = null;
    }
  }
  _getTimeZoneOffset() {
    return new Date().getTimezoneOffset();
  }
  _initializeRRule(options, startDateUtc, until) {
    var ruleOptions = RRule.parseString(options.rule);
    var {
      firstDayOfWeek
    } = options;
    ruleOptions.dtstart = startDateUtc;
    if (!ruleOptions.wkst && firstDayOfWeek) {
      var weekDayNumbers = [6, 0, 1, 2, 3, 4, 5];
      ruleOptions.wkst = weekDayNumbers[firstDayOfWeek];
    }
    if (until) {
      ruleOptions.until = timeZoneUtils.setOffsetsToDate(until, [-timeZoneUtils.getClientTimezoneOffset(until), options.appointmentTimezoneOffset]);
    }
    this._createRRule(ruleOptions);
    if (options.exception) {
      var exceptionStrings = options.exception;
      var exceptionDates = exceptionStrings.split(',').map(rule => this.getDateByAsciiString(rule));
      exceptionDates.forEach(date => {
        if (options.getPostProcessedException) {
          date = options.getPostProcessedException(date);
        }
        var utcDate = timeZoneUtils.setOffsetsToDate(date, [-timeZoneUtils.getClientTimezoneOffset(date), options.appointmentTimezoneOffset]);
        this.rRuleSet.exdate(utcDate);
      });
    }
  }
  _createRRule(ruleOptions) {
    this._dispose();
    this.rRuleSet = new RRuleSet();
    this.rRule = new RRule(ruleOptions);
    this.rRuleSet.rrule(this.rRule);
  }
  _parseRecurrenceRule(recurrence) {
    var ruleObject = {};
    var ruleParts = recurrence.split(';');
    for (var i = 0, len = ruleParts.length; i < len; i++) {
      var rule = ruleParts[i].split('=');
      var ruleName = rule[0].toLowerCase();
      var ruleValue = rule[1];
      ruleObject[ruleName] = ruleValue;
    }
    // eslint-disable-next-line radix
    var count = parseInt(ruleObject.count);
    if (!isNaN(count)) {
      ruleObject.count = count;
    }
    if (ruleObject.interval) {
      // eslint-disable-next-line radix
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
  }
  _createDateTuple(parseResult) {
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
    /* eslint-disable radix */
    return [parseInt(parseResult[1]), parseInt(parseResult[2]), parseInt(parseResult[3]), parseInt(parseResult[4]) || 0, parseInt(parseResult[5]) || 0, parseInt(parseResult[6]) || 0, isUtc];
    /* eslint-enable radix */
  }
}

class RecurrenceValidator {
  validateRRule(rule, recurrence) {
    if (this._brokenRuleNameExists(rule) || !freqNames.includes(rule.freq) || this._wrongCountRule(rule) || this._wrongIntervalRule(rule) || this._wrongDayOfWeek(rule) || this._wrongByMonthDayRule(rule) || this._wrongByMonth(rule) || this._wrongUntilRule(rule)) {
      this._logBrokenRule(recurrence);
      return false;
    }
    return true;
  }
  _wrongUntilRule(rule) {
    var wrongUntil = false;
    var {
      until
    } = rule;
    if (until !== undefined && !(until instanceof Date)) {
      wrongUntil = true;
    }
    return wrongUntil;
  }
  _wrongCountRule(rule) {
    var wrongCount = false;
    var {
      count
    } = rule;
    if (count && typeof count === 'string') {
      wrongCount = true;
    }
    return wrongCount;
  }
  _wrongByMonthDayRule(rule) {
    var wrongByMonthDay = false;
    var byMonthDay = rule.bymonthday;
    // eslint-disable-next-line radix
    if (byMonthDay && isNaN(parseInt(byMonthDay))) {
      wrongByMonthDay = true;
    }
    return wrongByMonthDay;
  }
  _wrongByMonth(rule) {
    var wrongByMonth = false;
    var byMonth = rule.bymonth;
    // eslint-disable-next-line radix
    if (byMonth && isNaN(parseInt(byMonth))) {
      wrongByMonth = true;
    }
    return wrongByMonth;
  }
  _wrongIntervalRule(rule) {
    var wrongInterval = false;
    var {
      interval
    } = rule;
    if (interval && typeof interval === 'string') {
      wrongInterval = true;
    }
    return wrongInterval;
  }
  _wrongDayOfWeek(rule) {
    var byDay = rule.byday;
    var daysByRule = getRecurrenceProcessor().daysFromByDayRule(rule);
    var brokenDaysExist = false;
    if (byDay === '') {
      brokenDaysExist = true;
    }
    each(daysByRule, (_, day) => {
      if (!Object.prototype.hasOwnProperty.call(days, day)) {
        brokenDaysExist = true;
        return false;
      }
      return undefined;
    });
    return brokenDaysExist;
  }
  _brokenRuleNameExists(rule) {
    var brokenRuleExists = false;
    each(rule, ruleName => {
      if (!ruleNames.includes(ruleName)) {
        brokenRuleExists = true;
        return false;
      }
      return undefined;
    });
    return brokenRuleExists;
  }
  _logBrokenRule(recurrence) {
    if (!loggedWarnings.includes(recurrence)) {
      errors.log('W0006', recurrence);
      loggedWarnings.push(recurrence);
    }
  }
}
