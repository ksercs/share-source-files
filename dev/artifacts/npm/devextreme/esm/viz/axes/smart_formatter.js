/**
* DevExtreme (esm/viz/axes/smart_formatter.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import formatHelper from '../../format_helper';
import { isDefined, isFunction, isExponential, isObject } from '../../core/utils/type';
import dateUtils from '../../core/utils/date';
import { adjust, getPrecision, getExponent } from '../../core/utils/math';
import { getAdjustedLog10 as log10 } from '../core/utils';
var _format = formatHelper.format;
var {
  abs,
  floor
} = Math;
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
    var nextDifferences = dateUtils.getDatesDifferences(curDate, nextDate);
    if (nextDifferences[tickIntervalFormat]) {
      patchFirstTickDiff(nextDifferences, tickFormatIndex);
    }
    return nextDifferences;
  } else {
    var prevDifferences = dateUtils.getDatesDifferences(prevDate, curDate);
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
  if (isFunction(type)) {
    formatter = type;
    type = null;
  }
  return {
    type,
    formatter
  };
}
function formatLogarithmicNumber(tick) {
  var log10Tick = log10(abs(tick));
  var type;
  if (log10Tick > 0) {
    type = formats[floor(log10Tick / 3)] || EXPONENTIAL;
  } else {
    if (log10Tick < -4) {
      type = EXPONENTIAL;
    } else {
      return _format(adjust(tick));
    }
  }
  return _format(tick, {
    type,
    precision: 0
  });
}
function getDateTimeFormat(tick, _ref) {
  var {
    showTransition,
    ticks,
    tickInterval
  } = _ref;
  var typeFormat = dateUtils.getDateFormatByTickInterval(tickInterval);
  var prevDateIndex;
  var nextDateIndex;
  if (showTransition && ticks.length) {
    var indexOfTick = ticks.map(Number).indexOf(+tick);
    if (ticks.length === 1 && indexOfTick === 0) {
      typeFormat = formatHelper.getDateFormatByTicks(ticks);
    } else {
      if (indexOfTick === -1) {
        prevDateIndex = getTransitionTickIndex(ticks, tick);
      } else {
        prevDateIndex = indexOfTick === 0 ? ticks.length - 1 : indexOfTick - 1;
        nextDateIndex = indexOfTick === 0 ? 1 : -1;
      }
      var datesDifferences = getDatesDifferences(ticks[prevDateIndex], tick, ticks[nextDateIndex], typeFormat);
      typeFormat = formatHelper.getDateFormatByDifferences(datesDifferences, typeFormat);
    }
  }
  return createFormat(typeFormat);
}
function getFormatExponential(tick, tickInterval) {
  var stringTick = abs(tick).toString();
  if (isExponential(tick)) {
    return Math.max(abs(getExponent(tick) - getExponent(tickInterval)), abs(getPrecision(tick) - getPrecision(tickInterval)));
  } else {
    return abs(getNoZeroIndex(stringTick.split('.')[1]) - getExponent(tickInterval) + 1);
  }
}
function getFormatWithModifier(tick, tickInterval) {
  var tickIntervalIndex = floor(log10(tickInterval));
  var tickIndex;
  var precision = 0;
  var actualIndex = tickIndex = floor(log10(abs(tick)));
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
  return createFormat(formatHelper.getDateFormatByDifferences(diff));
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
  return createFormat(formatHelper.getDateFormatByDifferences(diff));
}
function formatDateRange(startValue, endValue, tickInterval) {
  var diff = getDatesDifferences(startValue, endValue);
  var typeFormat = dateUtils.getDateFormatByTickInterval(tickInterval);
  var diffFormatType = formatHelper.getDateFormatByDifferences(diff, typeFormat);
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
  if (isObject(interval)) {
    var dateUnits = Object.keys(interval);
    var sum = dateUnits.reduce((sum, k) => interval[k] + sum, 0);
    if (sum === 1) {
      var dateUnit = dateUnits.filter(k => interval[k] === 1)[0];
      return dateUnit.slice(0, dateUnit.length - 1);
    }
  }
  return interval;
}
export function smartFormatter(tick, options) {
  var tickInterval = options.tickInterval;
  var stringTick = abs(tick).toString();
  var format = options.labelOptions.format;
  var ticks = options.ticks;
  var isLogarithmic = options.type === 'logarithmic';
  if (ticks.length === 1 && ticks.indexOf(tick) === 0 && !isDefined(tickInterval)) {
    tickInterval = abs(tick) >= 1 ? 1 : adjust(1 - abs(tick), tick);
  }
  if (Object.is(tick, -0)) {
    tick = 0;
  }
  if (!isDefined(format) && options.type !== 'discrete' && tick && (options.logarithmBase === 10 || !isLogarithmic)) {
    if (options.dataType !== 'datetime' && isDefined(tickInterval)) {
      if (ticks.length && ticks.indexOf(tick) === -1) {
        var indexOfTick = getTransitionTickIndex(ticks, tick);
        tickInterval = adjust(abs(tick - ticks[indexOfTick]), tick);
      }
      if (isLogarithmic) {
        return formatLogarithmicNumber(tick);
      } else {
        var separatedTickInterval = splitDecimalNumber(tickInterval);
        if (separatedTickInterval < 2) {
          separatedTickInterval = splitDecimalNumber(tick);
        }
        if (separatedTickInterval.length > 1 && !isExponential(tickInterval)) {
          format = {
            type: formats[0],
            precision: separatedTickInterval[1].length
          };
        } else {
          if (isExponential(tickInterval) && (stringTick.indexOf('.') !== -1 || isExponential(tick))) {
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
export function formatRange(_ref2) {
  var {
    startValue,
    endValue,
    tickInterval,
    argumentFormat,
    axisOptions: {
      dataType,
      type,
      logarithmBase
    }
  } = _ref2;
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
