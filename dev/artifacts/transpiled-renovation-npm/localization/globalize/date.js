"use strict";

require("./core");
require("./number");
require("globalize/date");
var _globalize = _interopRequireDefault(require("globalize"));
var _date2 = _interopRequireDefault(require("../date"));
var _type = require("../../core/utils/type");
var iteratorUtils = _interopRequireWildcard(require("../../core/utils/iterator"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line no-restricted-imports, import/no-unresolved

var ACCEPTABLE_JSON_FORMAT_PROPERTIES = ['skeleton', 'date', 'time', 'datetime', 'raw'];
var RTL_MARKS_REGEX = /[\u200E\u200F]/g;

// eslint-disable-next-line no-restricted-imports

if (_globalize.default && _globalize.default.formatDate) {
  if (_globalize.default.locale().locale === 'en') {
    _globalize.default.locale('en');
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
        iteratorUtils.each(globalizeFormat.parts, function (index, part) {
          result = result.replace('{' + index + '}', that._getPatternByFormat(part));
        });
      }
      return result;
    },
    _getFormatStringByPath: function _getFormatStringByPath(path) {
      return _globalize.default.locale().main('dates/calendars/gregorian/' + path);
    },
    getPeriodNames: function getPeriodNames(format, type) {
      format = format || 'wide';
      type = type === 'format' ? type : 'stand-alone';
      var json = _globalize.default.locale().main("dates/calendars/gregorian/dayPeriods/".concat(type, "/").concat(format));
      return [json['am'], json['pm']];
    },
    getMonthNames: function getMonthNames(format, type) {
      var months = _globalize.default.locale().main('dates/calendars/gregorian/months/' + (type === 'format' ? type : 'stand-alone') + '/' + (format || 'wide'));
      return iteratorUtils.map(months, function (month) {
        return month;
      });
    },
    getDayNames: function getDayNames(format) {
      var days = _globalize.default.locale().main('dates/calendars/gregorian/days/stand-alone/' + (format || 'wide'));
      return iteratorUtils.map(days, function (day) {
        return day;
      });
    },
    getTimeSeparator: function getTimeSeparator() {
      return _globalize.default.locale().main('numbers/symbols-numberSystem-latn/timeSeparator');
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
        formatCacheKey = _globalize.default.locale().locale + ':' + _format;
        formatter = formattersCache[formatCacheKey];
        if (!formatter) {
          _format = {
            raw: this._getPatternByFormat(_format) || _format
          };
          formatter = formattersCache[formatCacheKey] = _globalize.default.dateFormatter(_format);
        }
      } else {
        if (!this._isAcceptableFormat(_format)) {
          return;
        }
        formatter = _globalize.default.dateFormatter(_format);
      }
      return this.removeRtlMarks(formatter(date));
    },
    parse: function parse(text, format) {
      if (!text) {
        return;
      }
      if (!format || typeof format === 'function' || (0, _type.isObject)(format) && !this._isAcceptableFormat(format)) {
        if (format) {
          var parsedValue = this.callBase(text, format);
          if (parsedValue) {
            return parsedValue;
          }
        }
        return _globalize.default.parseDate(text);
      }
      if (format.parser) {
        return format.parser(text);
      }
      if (typeof format === 'string') {
        format = {
          raw: this._getPatternByFormat(format) || format
        };
      }
      var parsedDate = _globalize.default.parseDate(text, format);
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
      var firstDay = _globalize.default.locale().supplemental.weekData.firstDay();
      return this._getDayKeys().indexOf(firstDay);
    },
    _getDayKeys: function _getDayKeys() {
      var days = _globalize.default.locale().main('dates/calendars/gregorian/days/format/short');
      return iteratorUtils.map(days, function (day, key) {
        return key;
      });
    }
  };
  _date2.default.resetInjection();
  _date2.default.inject(globalizeDateLocalization);
}