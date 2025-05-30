/**
* DevExtreme (cjs/viz/axes/smart_formatter.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.formatRange = formatRange;
exports.smartFormatter = smartFormatter;
var _format_helper = _interopRequireDefault(require("../../format_helper"));
var _type = require("../../core/utils/type");
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _math = require("../../core/utils/math");
var _utils = require("../core/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _format = _format_helper.default.format;
var abs = Math.abs,
  floor = Math.floor;
var EXPONENTIAL = 'exponential';
var formats = ['fixedPoint', 'thousands', 'millions', 'billions', 'trillions', EXPONENTIAL];
var dateUnitIntervals = ['millisecond', 'second', 'minute', 'hour', 'day', 'month', 'year'];
var INTERVALS_MAP = {
  'week': 'day',
  'quarter': 'month',
  'shorttime': 'hour',
  'longtime': 'second'
};
function patchFirstTickDiff(differences, tickFormatIndex) {
  for (var i = tickFormatIndex; i < dateUnitIntervals.length - 1; i++) {
    var dateUnitInterval = dateUnitIntervals[i];
    if (i === tickFormatIndex) {
      setDateUnitInterval(differences, tickFormatIndex + (differences['millisecond'] ? 2 : 1));
      break;
    } else if (differences[dateUnitInterval] && differences.count > 1) {
      resetDateUnitInterval(differences, i);
      break;
    }
  }
}
function patchTickDiff(differences, tickFormatIndex) {
  var patched = false;
  for (var i = dateUnitIntervals.length - 1; i >= tickFormatIndex; i--) {
    var dateUnitInterval = dateUnitIntervals[i];
    if (differences[dateUnitInterval]) {
      if (i - tickFormatIndex > 1) {
        for (var j = 0; j <= tickFormatIndex; j++) {
          resetDateUnitInterval(differences, j);
          patched = true;
        }
        break;
      }
    }
  }
  return patched;
}
function getDatesDifferences(prevDate, curDate, nextDate, tickIntervalFormat) {
  tickIntervalFormat = INTERVALS_MAP[tickIntervalFormat] || tickIntervalFormat;
  var tickFormatIndex = dateUnitIntervals.indexOf(tickIntervalFormat);
  if (nextDate) {
    var nextDifferences = _date.default.getDatesDifferences(curDate, nextDate);
    if (nextDifferences[tickIntervalFormat]) {
      patchFirstTickDiff(nextDifferences, tickFormatIndex);
    }
    return nextDifferences;
  } else {
    var prevDifferences = _date.default.getDatesDifferences(prevDate, curDate);
    var patched = patchTickDiff(prevDifferences, tickFormatIndex);
    if (!patched && prevDifferences.count === 1) {
      setDateUnitInterval(prevDifferences, tickFormatIndex);
    }
    return prevDifferences;
  }
}
function resetDateUnitInterval(differences, intervalIndex) {
  var dateUnitInterval = dateUnitIntervals[intervalIndex];
  if (differences[dateUnitInterval]) {
    differences[dateUnitInterval] = false;
    differences.count--;
  }
}
function setDateUnitInterval(differences, intervalIndex) {
  var dateUnitInterval = dateUnitIntervals[intervalIndex];
  if (differences[dateUnitInterval] === false) {
    differences[dateUnitInterval] = true;
    differences.count++;
  }
}
function getNoZeroIndex(str) {
  return str.length - parseInt(str).toString().length;
}
function getTransitionTickIndex(ticks, value) {
  var i;
  var curDiff;
  var minDiff;
  var nearestTickIndex = 0;
  minDiff = abs(value - ticks[0]);
  for (i = 1; i < ticks.length; i++) {
    curDiff = abs(value - ticks[i]);
    if (curDiff < minDiff) {
      minDiff = curDiff;
      nearestTickIndex = i;
    }
  }
  return nearestTickIndex;
}
function splitDecimalNumber(value) {
  return value.toString().split('.');
}
function createFormat(type) {
  var formatter;
  if ((0, _type.isFunction)(type)) {
    formatter = type;
    type = null;
  }
  return {
    type,
    formatter
  };
}
function formatLogarithmicNumber(tick) {
  var log10Tick = (0, _utils.getAdjustedLog10)(abs(tick));
  var type;
  if (log10Tick > 0) {
    type = formats[floor(log10Tick / 3)] || EXPONENTIAL;
  } else {
    if (log10Tick < -4) {
      type = EXPONENTIAL;
    } else {
      return _format((0, _math.adjust)(tick));
    }
  }
  return _format(tick, {
    type,
    precision: 0
  });
}
function getDateTimeFormat(tick, _ref) {
  var showTransition = _ref.showTransition,
    ticks = _ref.ticks,
    tickInterval = _ref.tickInterval;
  var typeFormat = _date.default.getDateFormatByTickInterval(tickInterval);
  var prevDateIndex;
  var nextDateIndex;
  if (showTransition && ticks.length) {
    var indexOfTick = ticks.map(Number).indexOf(+tick);
    if (ticks.length === 1 && indexOfTick === 0) {
      typeFormat = _format_helper.default.getDateFormatByTicks(ticks);
    } else {
      if (indexOfTick === -1) {
        prevDateIndex = getTransitionTickIndex(ticks, tick);
      } else {
        prevDateIndex = indexOfTick === 0 ? ticks.length - 1 : indexOfTick - 1;
        nextDateIndex = indexOfTick === 0 ? 1 : -1;
      }
      var datesDifferences = getDatesDifferences(ticks[prevDateIndex], tick, ticks[nextDateIndex], typeFormat);
      typeFormat = _format_helper.default.getDateFormatByDifferences(datesDifferences, typeFormat);
    }
  }
  return createFormat(typeFormat);
}
function getFormatExponential(tick, tickInterval) {
  var stringTick = abs(tick).toString();
  if ((0, _type.isExponential)(tick)) {
    return Math.max(abs((0, _math.getExponent)(tick) - (0, _math.getExponent)(tickInterval)), abs((0, _math.getPrecision)(tick) - (0, _math.getPrecision)(tickInterval)));
  } else {
    return abs(getNoZeroIndex(stringTick.split('.')[1]) - (0, _math.getExponent)(tickInterval) + 1);
  }
}
function getFormatWithModifier(tick, tickInterval) {
  var tickIntervalIndex = floor((0, _utils.getAdjustedLog10)(tickInterval));
  var tickIndex;
  var precision = 0;
  var actualIndex = tickIndex = floor((0, _utils.getAdjustedLog10)(abs(tick)));
  if (tickIndex - tickIntervalIndex >= 2) {
    actualIndex = tickIntervalIndex;
  }
  var indexOfFormat = floor(actualIndex / 3);
  var offset = indexOfFormat * 3;
  if (indexOfFormat < 0) {
    indexOfFormat = 0;
  }
  var typeFormat = formats[indexOfFormat] || formats[formats.length - 1];
  if (offset > 0) {
    var separatedTickInterval = splitDecimalNumber(tickInterval / Math.pow(10, offset));
    if (separatedTickInterval[1]) {
      precision = separatedTickInterval[1].length;
    }
  }
  return {
    precision,
    type: typeFormat
  };
}
function getHighDiffFormat(diff) {
  var stop = false;
  for (var i in diff) {
    if (diff[i] === true || i === 'hour' || stop) {
      diff[i] = false;
      stop = true;
    } else if (diff[i] === false) {
      diff[i] = true;
    }
  }
  return createFormat(_format_helper.default.getDateFormatByDifferences(diff));
}
function getHighAndSelfDiffFormat(diff, interval) {
  var stop = false;
  for (var i in diff) {
    if (stop) {
      diff[i] = false;
    } else if (i === interval) {
      stop = true;
    } else {
      diff[i] = true;
    }
  }
  return createFormat(_format_helper.default.getDateFormatByDifferences(diff));
}
function formatDateRange(startValue, endValue, tickInterval) {
  var diff = getDatesDifferences(startValue, endValue);
  var typeFormat = _date.default.getDateFormatByTickInterval(tickInterval);
  var diffFormatType = _format_helper.default.getDateFormatByDifferences(diff, typeFormat);
  var diffFormat = createFormat(diffFormatType);
  var values = [];
  if (tickInterval in diff) {
    var rangeFormat = getHighAndSelfDiffFormat(getDatesDifferences(startValue, endValue), tickInterval);
    var value = _format(startValue, rangeFormat);
    if (value) {
      values.push(value);
    }
  } else {
    var _rangeFormat = getHighDiffFormat(getDatesDifferences(startValue, endValue));
    var highValue = _format(startValue, _rangeFormat);
    if (highValue) {
      values.push(highValue);
    }
    values.push("".concat(_format(startValue, diffFormat), " - ").concat(_format(endValue, diffFormat)));
  }
  return values.join(', ');
}
function processDateInterval(interval) {
  if ((0, _type.isObject)(interval)) {
    var dateUnits = Object.keys(interval);
    var sum = dateUnits.reduce(function (sum, k) {
      return interval[k] + sum;
    }, 0);
    if (sum === 1) {
      var dateUnit = dateUnits.filter(function (k) {
        return interval[k] === 1;
      })[0];
      return dateUnit.slice(0, dateUnit.length - 1);
    }
  }
  return interval;
}
function smartFormatter(tick, options) {
  var tickInterval = options.tickInterval;
  var stringTick = abs(tick).toString();
  var format = options.labelOptions.format;
  var ticks = options.ticks;
  var isLogarithmic = options.type === 'logarithmic';
  if (ticks.length === 1 && ticks.indexOf(tick) === 0 && !(0, _type.isDefined)(tickInterval)) {
    tickInterval = abs(tick) >= 1 ? 1 : (0, _math.adjust)(1 - abs(tick), tick);
  }
  if (Object.is(tick, -0)) {
    tick = 0;
  }
  if (!(0, _type.isDefined)(format) && options.type !== 'discrete' && tick && (options.logarithmBase === 10 || !isLogarithmic)) {
    if (options.dataType !== 'datetime' && (0, _type.isDefined)(tickInterval)) {
      if (ticks.length && ticks.indexOf(tick) === -1) {
        var indexOfTick = getTransitionTickIndex(ticks, tick);
        tickInterval = (0, _math.adjust)(abs(tick - ticks[indexOfTick]), tick);
      }
      if (isLogarithmic) {
        return formatLogarithmicNumber(tick);
      } else {
        var separatedTickInterval = splitDecimalNumber(tickInterval);
        if (separatedTickInterval < 2) {
          separatedTickInterval = splitDecimalNumber(tick);
        }
        if (separatedTickInterval.length > 1 && !(0, _type.isExponential)(tickInterval)) {
          format = {
            type: formats[0],
            precision: separatedTickInterval[1].length
          };
        } else {
          if ((0, _type.isExponential)(tickInterval) && (stringTick.indexOf('.') !== -1 || (0, _type.isExponential)(tick))) {
            format = {
              type: EXPONENTIAL,
              precision: getFormatExponential(tick, tickInterval)
            };
          } else {
            format = getFormatWithModifier(tick, tickInterval);
          }
        }
      }
    } else if (options.dataType === 'datetime') {
      format = getDateTimeFormat(tick, options);
    }
  }
  return _format(tick, format);
}
function formatRange(_ref2) {
  var startValue = _ref2.startValue,
    endValue = _ref2.endValue,
    tickInterval = _ref2.tickInterval,
    argumentFormat = _ref2.argumentFormat,
    _ref2$axisOptions = _ref2.axisOptions,
    dataType = _ref2$axisOptions.dataType,
    type = _ref2$axisOptions.type,
    logarithmBase = _ref2$axisOptions.logarithmBase;
  if (type === 'discrete') {
    return '';
  }
  if (dataType === 'datetime') {
    return formatDateRange(startValue, endValue, processDateInterval(tickInterval));
  }
  var formatOptions = {
    ticks: [],
    type,
    dataType,
    tickInterval,
    logarithmBase,
    labelOptions: {
      format: argumentFormat
    }
  };
  return "".concat(smartFormatter(startValue, formatOptions), " - ").concat(smartFormatter(endValue, formatOptions));
}
