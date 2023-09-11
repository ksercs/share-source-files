/**
* DevExtreme (esm/localization/globalize/date.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import './core';
import './number';
// eslint-disable-next-line no-restricted-imports, import/no-unresolved
import 'globalize/date';
var ACCEPTABLE_JSON_FORMAT_PROPERTIES = ['skeleton', 'date', 'time', 'datetime', 'raw'];
var RTL_MARKS_REGEX = /[\u200E\u200F]/g;

// eslint-disable-next-line no-restricted-imports
import Globalize from 'globalize';
import dateLocalization from '../date';
import { isObject } from '../../core/utils/type';
import * as iteratorUtils from '../../core/utils/iterator';
if (Globalize && Globalize.formatDate) {
  if (Globalize.locale().locale === 'en') {
    Globalize.locale('en');
  }
  var formattersCache = {};
  var FORMATS_TO_GLOBALIZE_MAP = {
    'shortdate': {
      path: 'dateTimeFormats/availableFormats/yMd'
    },
    'shorttime': {
      path: 'timeFormats/short'
    },
    'longdate': {
      path: 'dateFormats/full'
    },
    'longtime': {
      path: 'timeFormats/medium'
    },
    'monthandday': {
      path: 'dateTimeFormats/availableFormats/MMMMd'
    },
    'monthandyear': {
      path: 'dateTimeFormats/availableFormats/yMMMM'
    },
    'quarterandyear': {
      path: 'dateTimeFormats/availableFormats/yQQQ'
    },
    'day': {
      path: 'dateTimeFormats/availableFormats/d'
    },
    'year': {
      path: 'dateTimeFormats/availableFormats/y'
    },
    'shortdateshorttime': {
      path: 'dateTimeFormats/short',
      parts: ['shorttime', 'shortdate']
    },
    'longdatelongtime': {
      path: 'dateTimeFormats/medium',
      parts: ['longtime', 'longdate']
    },
    'month': {
      pattern: 'LLLL'
    },
    'shortyear': {
      pattern: 'yy'
    },
    'dayofweek': {
      pattern: 'EEEE'
    },
    'quarter': {
      pattern: 'QQQ'
    },
    'millisecond': {
      pattern: 'SSS'
    },
    'hour': {
      pattern: 'HH'
    },
    'minute': {
      pattern: 'mm'
    },
    'second': {
      pattern: 'ss'
    }
  };
  var globalizeDateLocalization = {
    engine: function engine() {
      return 'globalize';
    },
    _getPatternByFormat: function _getPatternByFormat(format) {
      var that = this;
      var lowerFormat = format.toLowerCase();
      var globalizeFormat = FORMATS_TO_GLOBALIZE_MAP[lowerFormat];
      if (lowerFormat === 'datetime-local') {
        return 'yyyy-MM-ddTHH\':\'mm\':\'ss';
      }
      if (!globalizeFormat) {
        return;
      }
      var result = globalizeFormat.path && that._getFormatStringByPath(globalizeFormat.path) || globalizeFormat.pattern;
      if (globalizeFormat.parts) {
        iteratorUtils.each(globalizeFormat.parts, (index, part) => {
          result = result.replace('{' + index + '}', that._getPatternByFormat(part));
        });
      }
      return result;
    },
    _getFormatStringByPath: function _getFormatStringByPath(path) {
      return Globalize.locale().main('dates/calendars/gregorian/' + path);
    },
    getPeriodNames: function getPeriodNames(format, type) {
      format = format || 'wide';
      type = type === 'format' ? type : 'stand-alone';
      var json = Globalize.locale().main("dates/calendars/gregorian/dayPeriods/".concat(type, "/").concat(format));
      return [json['am'], json['pm']];
    },
    getMonthNames: function getMonthNames(format, type) {
      var months = Globalize.locale().main('dates/calendars/gregorian/months/' + (type === 'format' ? type : 'stand-alone') + '/' + (format || 'wide'));
      return iteratorUtils.map(months, month => {
        return month;
      });
    },
    getDayNames: function getDayNames(format) {
      var days = Globalize.locale().main('dates/calendars/gregorian/days/stand-alone/' + (format || 'wide'));
      return iteratorUtils.map(days, day => {
        return day;
      });
    },
    getTimeSeparator: function getTimeSeparator() {
      return Globalize.locale().main('numbers/symbols-numberSystem-latn/timeSeparator');
    },
    removeRtlMarks(text) {
      return text.replace(RTL_MARKS_REGEX, '');
    },
    format: function format(date, _format) {
      if (!date) {
        return;
      }
      if (!_format) {
        return date;
      }
      var formatter;
      var formatCacheKey;
      if (typeof _format === 'function') {
        return _format(date);
      }
      if (_format.formatter) {
        return _format.formatter(date);
      }
      _format = _format.type || _format;
      if (typeof _format === 'string') {
        formatCacheKey = Globalize.locale().locale + ':' + _format;
        formatter = formattersCache[formatCacheKey];
        if (!formatter) {
          _format = {
            raw: this._getPatternByFormat(_format) || _format
          };
          formatter = formattersCache[formatCacheKey] = Globalize.dateFormatter(_format);
        }
      } else {
        if (!this._isAcceptableFormat(_format)) {
          return;
        }
        formatter = Globalize.dateFormatter(_format);
      }
      return this.removeRtlMarks(formatter(date));
    },
    parse: function parse(text, format) {
      if (!text) {
        return;
      }
      if (!format || typeof format === 'function' || isObject(format) && !this._isAcceptableFormat(format)) {
        if (format) {
          var parsedValue = this.callBase(text, format);
          if (parsedValue) {
            return parsedValue;
          }
        }
        return Globalize.parseDate(text);
      }
      if (format.parser) {
        return format.parser(text);
      }
      if (typeof format === 'string') {
        format = {
          raw: this._getPatternByFormat(format) || format
        };
      }
      var parsedDate = Globalize.parseDate(text, format);
      return parsedDate ? parsedDate : this.callBase(text, format);
    },
    _isAcceptableFormat: function _isAcceptableFormat(format) {
      if (format.parser) {
        return true;
      }
      for (var i = 0; i < ACCEPTABLE_JSON_FORMAT_PROPERTIES.length; i++) {
        if (Object.prototype.hasOwnProperty.call(format, ACCEPTABLE_JSON_FORMAT_PROPERTIES[i])) {
          return true;
        }
      }
    },
    firstDayOfWeekIndex: function firstDayOfWeekIndex() {
      var firstDay = Globalize.locale().supplemental.weekData.firstDay();
      return this._getDayKeys().indexOf(firstDay);
    },
    _getDayKeys: function _getDayKeys() {
      var days = Globalize.locale().main('dates/calendars/gregorian/days/format/short');
      return iteratorUtils.map(days, (day, key) => {
        return key;
      });
    }
  };
  dateLocalization.resetInjection();
  dateLocalization.inject(globalizeDateLocalization);
}
