/**
* DevExtreme (cjs/localization/ldml/date.formatter.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getFormatter = void 0;
function leftPad(text, length) {
  while (text.length < length) {
    text = '0' + text;
  }
  return text;
}
var FORMAT_TYPES = {
  '3': 'abbreviated',
  '4': 'wide',
  '5': 'narrow'
};
var LDML_FORMATTERS = {
  y: function y(date, count, useUtc) {
    var year = date[useUtc ? 'getUTCFullYear' : 'getFullYear']();
    if (count === 2) {
      year = year % 100;
    }
    return leftPad(year.toString(), count);
  },
  M: function M(date, count, useUtc, dateParts) {
    var month = date[useUtc ? 'getUTCMonth' : 'getMonth']();
    var formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getMonthNames(formatType, 'format')[month];
    }
    return leftPad((month + 1).toString(), Math.min(count, 2));
  },
  L: function L(date, count, useUtc, dateParts) {
    var month = date[useUtc ? 'getUTCMonth' : 'getMonth']();
    var formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getMonthNames(formatType, 'standalone')[month];
    }
    return leftPad((month + 1).toString(), Math.min(count, 2));
  },
  Q: function Q(date, count, useUtc, dateParts) {
    var month = date[useUtc ? 'getUTCMonth' : 'getMonth']();
    var quarter = Math.floor(month / 3);
    var formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getQuarterNames(formatType)[quarter];
    }
    return leftPad((quarter + 1).toString(), Math.min(count, 2));
  },
  E: function E(date, count, useUtc, dateParts) {
    var day = date[useUtc ? 'getUTCDay' : 'getDay']();
    var formatType = FORMAT_TYPES[count < 3 ? 3 : count];
    return dateParts.getDayNames(formatType)[day];
  },
  a: function a(date, count, useUtc, dateParts) {
    var hours = date[useUtc ? 'getUTCHours' : 'getHours']();
    var period = hours < 12 ? 0 : 1;
    var formatType = FORMAT_TYPES[count];
    return dateParts.getPeriodNames(formatType)[period];
  },
  d: function d(date, count, useUtc) {
    return leftPad(date[useUtc ? 'getUTCDate' : 'getDate']().toString(), Math.min(count, 2));
  },
  H: function H(date, count, useUtc) {
    return leftPad(date[useUtc ? 'getUTCHours' : 'getHours']().toString(), Math.min(count, 2));
  },
  h: function h(date, count, useUtc) {
    var hours = date[useUtc ? 'getUTCHours' : 'getHours']();
    return leftPad((hours % 12 || 12).toString(), Math.min(count, 2));
  },
  m: function m(date, count, useUtc) {
    return leftPad(date[useUtc ? 'getUTCMinutes' : 'getMinutes']().toString(), Math.min(count, 2));
  },
  s: function s(date, count, useUtc) {
    return leftPad(date[useUtc ? 'getUTCSeconds' : 'getSeconds']().toString(), Math.min(count, 2));
  },
  S: function S(date, count, useUtc) {
    return leftPad(date[useUtc ? 'getUTCMilliseconds' : 'getMilliseconds']().toString(), 3).substr(0, count);
  },
  x: function x(date, count, useUtc) {
    var timezoneOffset = useUtc ? 0 : date.getTimezoneOffset();
    var signPart = timezoneOffset > 0 ? '-' : '+';
    var timezoneOffsetAbs = Math.abs(timezoneOffset);
    var hours = Math.floor(timezoneOffsetAbs / 60);
    var minutes = timezoneOffsetAbs % 60;
    var hoursPart = leftPad(hours.toString(), 2);
    var minutesPart = leftPad(minutes.toString(), 2);
    return signPart + hoursPart + (count >= 3 ? ':' : '') + (count > 1 || minutes ? minutesPart : '');
  },
  X: function X(date, count, useUtc) {
    if (useUtc || !date.getTimezoneOffset()) {
      return 'Z';
    }
    return LDML_FORMATTERS.x(date, count, useUtc);
  },
  Z: function Z(date, count, useUtc) {
    return LDML_FORMATTERS.X(date, count >= 5 ? 3 : 2, useUtc);
  }
};
var getFormatter = function getFormatter(format, dateParts) {
  return function (date) {
    var charIndex;
    var formatter;
    var char;
    var charCount = 0;
    var separator = '\'';
    var isEscaping = false;
    var isCurrentCharEqualsNext;
    var result = '';
    if (!date) return null;
    if (!format) return date;
    var useUtc = format[format.length - 1] === 'Z' || format.slice(-3) === '\'Z\'';
    for (charIndex = 0; charIndex < format.length; charIndex++) {
      char = format[charIndex];
      formatter = LDML_FORMATTERS[char];
      isCurrentCharEqualsNext = char === format[charIndex + 1];
      charCount++;
      if (!isCurrentCharEqualsNext) {
        if (formatter && !isEscaping) {
          result += formatter(date, charCount, useUtc, dateParts);
        }
        charCount = 0;
      }
      if (char === separator && !isCurrentCharEqualsNext) {
        isEscaping = !isEscaping;
      } else if (isEscaping || !formatter) {
        result += char;
      }
      if (char === separator && isCurrentCharEqualsNext) {
        charIndex++;
      }
    }
    return result;
  };
};
exports.getFormatter = getFormatter;
