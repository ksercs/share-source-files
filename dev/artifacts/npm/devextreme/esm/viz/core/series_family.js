/**
* DevExtreme (esm/viz/core/series_family.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isNumeric, isDefined } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { each as _each } from '../../core/utils/iterator';
import { sign } from '../../core/utils/math';
import { noop as _noop } from '../../core/utils/common';
import { map as _map, normalizeEnum as _normalizeEnum } from './utils';
import dateUtils from '../../core/utils/date';
var {
  round,
  abs,
  pow,
  sqrt
} = Math;
var _min = Math.min;
var DEFAULT_BAR_GROUP_PADDING = 0.3;
function validateBarPadding(barPadding) {
  return barPadding < 0 || barPadding > 1 ? undefined : barPadding;
}
function validateBarGroupPadding(barGroupPadding) {
  return barGroupPadding < 0 || barGroupPadding > 1 ? DEFAULT_BAR_GROUP_PADDING : barGroupPadding;
}
function isStackExist(series, arg) {
  return series.some(function (s) {
    return !s.getOptions().ignoreEmptyPoints || s.getPointsByArg(arg, true).some(function (point) {
      return point.hasValue();
    });
  });
}
function correctStackCoordinates(series, currentStacks, arg, stack, parameters, barsArea, seriesStackIndexCallback) {
  series.forEach(function (series) {
    var stackIndex = seriesStackIndexCallback(currentStacks.indexOf(stack), currentStacks.length);
    var points = series.getPointsByArg(arg, true);
    var barPadding = validateBarPadding(series.getOptions().barPadding);
    var barWidth = series.getOptions().barWidth;
    var offset = getOffset(stackIndex, parameters);
    var width = parameters.width;
    var extraParameters;
    if (stackIndex === -1) {
      return;
    }
    if (isDefined(barPadding) || isDefined(barWidth)) {
      extraParameters = calculateParams(barsArea, currentStacks.length, 1 - barPadding, barWidth);
      width = extraParameters.width;
      if (!series.getBarOverlapGroup()) {
        offset = getOffset(stackIndex, extraParameters);
      }
    }
    correctPointCoordinates(points, width, offset);
  });
}
function getStackName(series) {
  return series.getStackName() || series.getBarOverlapGroup();
}
function adjustBarSeriesDimensionsCore(series, options, seriesStackIndexCallback) {
  var _series$, _series$2;
  var commonStacks = [];
  var allArguments = [];
  var seriesInStacks = {};
  var barGroupWidth = options.barGroupWidth;
  var argumentAxis = (_series$ = series[0]) === null || _series$ === void 0 ? void 0 : _series$.getArgumentAxis();
  var interval;
  if ((_series$2 = series[0]) !== null && _series$2 !== void 0 && _series$2.useAggregation()) {
    var _series$3;
    var isDateArgAxis = ((_series$3 = series[0]) === null || _series$3 === void 0 ? void 0 : _series$3.argumentType) === 'datetime';
    var tickInterval = argumentAxis.getTickInterval();
    var aggregationInterval = argumentAxis.getAggregationInterval();
    tickInterval = isDateArgAxis ? dateUtils.dateToMilliseconds(tickInterval) : tickInterval;
    aggregationInterval = isDateArgAxis ? dateUtils.dateToMilliseconds(aggregationInterval) : aggregationInterval;
    interval = aggregationInterval < tickInterval ? aggregationInterval : tickInterval;
  }
  interval = argumentAxis === null || argumentAxis === void 0 ? void 0 : argumentAxis.getTranslator().getInterval(interval);
  var barsArea = barGroupWidth ? interval > barGroupWidth ? barGroupWidth : interval : interval * (1 - validateBarGroupPadding(options.barGroupPadding));
  series.forEach(function (s, i) {
    var stackName = getStackName(s) || i.toString();
    var argument;
    for (argument in s.pointsByArgument) {
      if (allArguments.indexOf(argument.valueOf()) === -1) {
        allArguments.push(argument.valueOf());
      }
    }
    if (commonStacks.indexOf(stackName) === -1) {
      commonStacks.push(stackName);
      seriesInStacks[stackName] = [];
    }
    seriesInStacks[stackName].push(s);
  });
  allArguments.forEach(function (arg) {
    var currentStacks = commonStacks.reduce((stacks, stack) => {
      if (isStackExist(seriesInStacks[stack], arg)) {
        stacks.push(stack);
      }
      return stacks;
    }, []);
    var parameters = calculateParams(barsArea, currentStacks.length);
    commonStacks.forEach(stack => {
      correctStackCoordinates(seriesInStacks[stack], currentStacks, arg, stack, parameters, barsArea, seriesStackIndexCallback);
    });
  });
}
function calculateParams(barsArea, count, percentWidth, fixedBarWidth) {
  var spacing;
  var width;
  if (fixedBarWidth) {
    width = _min(fixedBarWidth, barsArea / count);
    spacing = count > 1 ? round((barsArea - round(width) * count) / (count - 1)) : 0;
  } else if (isDefined(percentWidth)) {
    width = barsArea * percentWidth / count;
    spacing = count > 1 ? round((barsArea - barsArea * percentWidth) / (count - 1)) : 0;
  } else {
    spacing = round(barsArea / count * 0.2);
    width = (barsArea - spacing * (count - 1)) / count;
  }
  return {
    width: width > 1 ? round(width) : 1,
    spacing: spacing,
    middleIndex: count / 2,
    rawWidth: width
  };
}
function getOffset(stackIndex, parameters) {
  var width = parameters.rawWidth < 1 ? parameters.rawWidth : parameters.width;
  return (stackIndex - parameters.middleIndex + 0.5) * width - (parameters.middleIndex - stackIndex - 0.5) * parameters.spacing;
}
function correctPointCoordinates(points, width, offset) {
  _each(points, function (_, point) {
    point.correctCoordinates({
      width: width,
      offset: offset
    });
  });
}
function getValueType(value) {
  return value >= 0 ? 'positive' : 'negative';
}
function getVisibleSeries(that) {
  return that.series.filter(function (s) {
    return s.isVisible();
  });
}
function getAbsStackSumByArg(stackKeepers, stackName, argument) {
  var positiveStackValue = (stackKeepers.positive[stackName] || {})[argument] || 0;
  var negativeStackValue = -(stackKeepers.negative[stackName] || {})[argument] || 0;
  return positiveStackValue + negativeStackValue;
}
function getStackSumByArg(stackKeepers, stackName, argument) {
  var positiveStackValue = (stackKeepers.positive[stackName] || {})[argument] || 0;
  var negativeStackValue = (stackKeepers.negative[stackName] || {})[argument] || 0;
  return positiveStackValue + negativeStackValue;
}
function getSeriesStackIndexCallback(inverted) {
  if (!inverted) {
    return function (index) {
      return index;
    };
  } else {
    return function (index, stackCount) {
      return stackCount - index - 1;
    };
  }
}
function isInverted(series) {
  return series[0] && series[0].getArgumentAxis().getTranslator().isInverted();
}
function adjustBarSeriesDimensions() {
  var series = getVisibleSeries(this);
  adjustBarSeriesDimensionsCore(series, this._options, getSeriesStackIndexCallback(isInverted(series)));
}
function getFirstValueSign(series) {
  var points = series.getPoints();
  var value;
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    value = point.initialValue && point.initialValue.valueOf();
    if (abs(value) > 0) {
      break;
    }
  }
  return sign(value);
}
function adjustStackedSeriesValues() {
  var that = this;
  var negativesAsZeroes = that._options.negativesAsZeroes;
  var series = getVisibleSeries(that);
  var stackKeepers = {
    positive: {},
    negative: {}
  };
  var holesStack = {
    left: {},
    right: {}
  };
  var lastSeriesInPositiveStack = {};
  var lastSeriesInNegativeStack = {};
  series.forEach(function (singleSeries) {
    var stackName = getStackName(singleSeries);
    var hole = false;
    var stack = getFirstValueSign(singleSeries) < 0 ? lastSeriesInNegativeStack : lastSeriesInPositiveStack;
    singleSeries._prevSeries = stack[stackName];
    stack[stackName] = singleSeries;
    singleSeries.holes = extend(true, {}, holesStack);
    singleSeries.getPoints().forEach(function (point, index, points) {
      var value = point.initialValue && point.initialValue.valueOf();
      var argument = point.argument.valueOf();
      var stacks = value >= 0 ? stackKeepers.positive : stackKeepers.negative;
      var isNotBarSeries = singleSeries.type !== 'bar';
      if (negativesAsZeroes && value < 0) {
        stacks = stackKeepers.positive;
        value = 0;
        point.resetValue();
      }
      stacks[stackName] = stacks[stackName] || {};
      var currentStack = stacks[stackName];
      if (currentStack[argument]) {
        if (isNotBarSeries) point.correctValue(currentStack[argument]);
        currentStack[argument] += value;
      } else {
        currentStack[argument] = value;
        if (isNotBarSeries) point.resetCorrection();
      }
      if (!point.hasValue()) {
        var prevPoint = points[index - 1];
        if (!hole && prevPoint && prevPoint.hasValue()) {
          argument = prevPoint.argument.valueOf();
          prevPoint._skipSetRightHole = true;
          holesStack.right[argument] = (holesStack.right[argument] || 0) + (prevPoint.value.valueOf() - (isFinite(prevPoint.minValue) ? prevPoint.minValue.valueOf() : 0));
        }
        hole = true;
      } else if (hole) {
        hole = false;
        holesStack.left[argument] = (holesStack.left[argument] || 0) + (point.value.valueOf() - (isFinite(point.minValue) ? point.minValue.valueOf() : 0));
        point._skipSetLeftHole = true;
      }
    });
  });
  series.forEach(function (singleSeries) {
    var holes = singleSeries.holes;
    singleSeries.getPoints().forEach(function (point) {
      var argument = point.argument.valueOf();
      point.resetHoles();
      !point._skipSetLeftHole && point.setHole(holes.left[argument] || holesStack.left[argument] && 0, 'left');
      !point._skipSetRightHole && point.setHole(holes.right[argument] || holesStack.right[argument] && 0, 'right');
      point._skipSetLeftHole = null;
      point._skipSetRightHole = null;
    });
  });
  that._stackKeepers = stackKeepers;
  series.forEach(function (singleSeries) {
    singleSeries.getPoints().forEach(function (point) {
      var argument = point.argument.valueOf();
      var stackName = getStackName(singleSeries);
      var absTotal = getAbsStackSumByArg(stackKeepers, stackName, argument);
      var total = getStackSumByArg(stackKeepers, stackName, argument);
      point.setPercentValue(absTotal, total, holesStack.left[argument], holesStack.right[argument]);
    });
  });
}
function updateStackedSeriesValues() {
  var that = this;
  var series = getVisibleSeries(that);
  var stack = that._stackKeepers;
  var stackKeepers = {
    positive: {},
    negative: {}
  };
  _each(series, function (_, singleSeries) {
    var minBarSize = singleSeries.getOptions().minBarSize;
    var valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
    var minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
    var stackName = singleSeries.getStackName();
    _each(singleSeries.getPoints(), function (index, point) {
      if (!point.hasValue()) {
        return;
      }
      var value = point.initialValue && point.initialValue.valueOf();
      var argument = point.argument.valueOf();
      if (that.fullStacked) {
        value = value / getAbsStackSumByArg(stack, stackName, argument) || 0;
      }
      var updateValue = valueAxisTranslator.checkMinBarSize(value, minShownBusinessValue, point.value);
      var valueType = getValueType(updateValue);
      var currentStack = stackKeepers[valueType][stackName] = stackKeepers[valueType][stackName] || {};
      if (currentStack[argument]) {
        point.minValue = currentStack[argument];
        currentStack[argument] += updateValue;
      } else {
        currentStack[argument] = updateValue;
      }
      point.value = currentStack[argument];
    });
  });
  if (that.fullStacked) {
    updateFullStackedSeriesValues(series, stackKeepers);
  }
}
function updateFullStackedSeriesValues(series, stackKeepers) {
  _each(series, function (_, singleSeries) {
    var stackName = singleSeries.getStackName ? singleSeries.getStackName() : 'default';
    _each(singleSeries.getPoints(), function (index, point) {
      var stackSum = getAbsStackSumByArg(stackKeepers, stackName, point.argument.valueOf());
      if (stackSum !== 0) {
        point.value = point.value / stackSum;
        if (isNumeric(point.minValue)) {
          point.minValue = point.minValue / stackSum;
        }
      }
    });
  });
}
function updateRangeSeriesValues() {
  var that = this;
  var series = getVisibleSeries(that);
  _each(series, function (_, singleSeries) {
    var minBarSize = singleSeries.getOptions().minBarSize;
    var valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
    var minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
    if (minShownBusinessValue) {
      _each(singleSeries.getPoints(), function (_, point) {
        if (!point.hasValue()) {
          return;
        }
        if (point.value.valueOf() - point.minValue.valueOf() < minShownBusinessValue) {
          point.value = point.value.valueOf() + minShownBusinessValue / 2;
          point.minValue = point.minValue.valueOf() - minShownBusinessValue / 2;
        }
      });
    }
  });
}
function updateBarSeriesValues() {
  _each(this.series, function (_, singleSeries) {
    var minBarSize = singleSeries.getOptions().minBarSize;
    var valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
    var minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
    if (minShownBusinessValue) {
      _each(singleSeries.getPoints(), function (index, point) {
        if (point.hasValue()) {
          point.value = valueAxisTranslator.checkMinBarSize(point.initialValue, minShownBusinessValue);
        }
      });
    }
  });
}
function adjustCandlestickSeriesDimensions() {
  var series = getVisibleSeries(this);
  adjustBarSeriesDimensionsCore(series, {
    barGroupPadding: 0.3
  }, getSeriesStackIndexCallback(isInverted(series)));
}
function adjustBubbleSeriesDimensions() {
  var series = getVisibleSeries(this);
  if (!series.length) {
    return;
  }
  var options = this._options;
  var visibleAreaX = series[0].getArgumentAxis().getVisibleArea();
  var visibleAreaY = series[0].getValueAxis().getVisibleArea();
  var min = _min(visibleAreaX[1] - visibleAreaX[0], visibleAreaY[1] - visibleAreaY[0]);
  var minBubbleArea = pow(options.minBubbleSize, 2);
  var maxBubbleArea = pow(min * options.maxBubbleSize, 2);
  var equalBubbleSize = (min * options.maxBubbleSize + options.minBubbleSize) / 2;
  var minPointSize = Infinity;
  var maxPointSize = -Infinity;
  var pointSize;
  var bubbleArea;
  var sizeProportion;
  _each(series, function (_, seriesItem) {
    _each(seriesItem.getPoints(), function (_, point) {
      maxPointSize = maxPointSize > point.size ? maxPointSize : point.size;
      minPointSize = minPointSize < point.size ? minPointSize : point.size;
    });
  });
  var sizeDispersion = maxPointSize - minPointSize;
  var areaDispersion = abs(maxBubbleArea - minBubbleArea);
  _each(series, function (_, seriesItem) {
    _each(seriesItem.getPoints(), function (_, point) {
      if (maxPointSize === minPointSize) {
        pointSize = round(equalBubbleSize);
      } else {
        sizeProportion = abs(point.size - minPointSize) / sizeDispersion;
        bubbleArea = areaDispersion * sizeProportion + minBubbleArea;
        pointSize = round(sqrt(bubbleArea));
      }
      point.correctCoordinates(pointSize);
    });
  });
}
export function SeriesFamily(options) {
  var that = this;
  that.type = _normalizeEnum(options.type);
  that.pane = options.pane;
  that.series = [];
  that.updateOptions(options);
  switch (that.type) {
    case 'bar':
      that.adjustSeriesDimensions = adjustBarSeriesDimensions;
      that.updateSeriesValues = updateBarSeriesValues;
      that.adjustSeriesValues = adjustStackedSeriesValues;
      break;
    case 'rangebar':
      that.adjustSeriesDimensions = adjustBarSeriesDimensions;
      that.updateSeriesValues = updateRangeSeriesValues;
      break;
    case 'fullstackedbar':
      that.fullStacked = true;
      that.adjustSeriesDimensions = adjustBarSeriesDimensions;
      that.adjustSeriesValues = adjustStackedSeriesValues;
      that.updateSeriesValues = updateStackedSeriesValues;
      break;
    case 'stackedbar':
      that.adjustSeriesDimensions = adjustBarSeriesDimensions;
      that.adjustSeriesValues = adjustStackedSeriesValues;
      that.updateSeriesValues = updateStackedSeriesValues;
      break;
    case 'fullstackedarea':
    case 'fullstackedline':
    case 'fullstackedspline':
    case 'fullstackedsplinearea':
      that.fullStacked = true;
      that.adjustSeriesValues = adjustStackedSeriesValues;
      break;
    case 'stackedarea':
    case 'stackedsplinearea':
    case 'stackedline':
    case 'stackedspline':
      that.adjustSeriesValues = adjustStackedSeriesValues;
      break;
    case 'candlestick':
    case 'stock':
      that.adjustSeriesDimensions = adjustCandlestickSeriesDimensions;
      break;
    case 'bubble':
      that.adjustSeriesDimensions = adjustBubbleSeriesDimensions;
      break;
  }
}
SeriesFamily.prototype = {
  constructor: SeriesFamily,
  adjustSeriesDimensions: _noop,
  adjustSeriesValues: _noop,
  updateSeriesValues: _noop,
  updateOptions: function updateOptions(options) {
    this._options = options;
  },
  dispose: function dispose() {
    this.series = null;
  },
  add: function add(series) {
    var type = this.type;
    this.series = _map(series, singleSeries => singleSeries.type === type ? singleSeries : null);
  }
};
