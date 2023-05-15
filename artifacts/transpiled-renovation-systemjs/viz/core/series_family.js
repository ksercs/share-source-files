!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/core/series_family.js"], ["../../core/utils/type","../../core/utils/extend","../../core/utils/iterator","../../core/utils/math","../../core/utils/common","./utils","../../core/utils/date","../../core/utils/console"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/core/series_family.js", ["../../core/utils/type", "../../core/utils/extend", "../../core/utils/iterator", "../../core/utils/math", "../../core/utils/common", "./utils", "../../core/utils/date", "../../core/utils/console"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.SeriesFamily = SeriesFamily;
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _math = $__require("../../core/utils/math");
  var _common = $__require("../../core/utils/common");
  var _utils = $__require("./utils");
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _console = $__require("../../core/utils/console");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  ///#DEBUG

  ///#ENDDEBUG
  var round = Math.round,
      abs = Math.abs,
      pow = Math.pow,
      sqrt = Math.sqrt;
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
      if ((0, _type.isDefined)(barPadding) || (0, _type.isDefined)(barWidth)) {
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
      tickInterval = isDateArgAxis ? _date.default.dateToMilliseconds(tickInterval) : tickInterval;
      aggregationInterval = isDateArgAxis ? _date.default.dateToMilliseconds(aggregationInterval) : aggregationInterval;
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
      var currentStacks = commonStacks.reduce(function (stacks, stack) {
        if (isStackExist(seriesInStacks[stack], arg)) {
          stacks.push(stack);
        }
        return stacks;
      }, []);
      var parameters = calculateParams(barsArea, currentStacks.length);
      commonStacks.forEach(function (stack) {
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
    } else if ((0, _type.isDefined)(percentWidth)) {
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
    (0, _iterator.each)(points, function (_, point) {
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
    return (0, _math.sign)(value);
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
      singleSeries.holes = (0, _extend.extend)(true, {}, holesStack);
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
    (0, _iterator.each)(series, function (_, singleSeries) {
      var minBarSize = singleSeries.getOptions().minBarSize;
      var valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
      var minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
      var stackName = singleSeries.getStackName();
      (0, _iterator.each)(singleSeries.getPoints(), function (index, point) {
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
    (0, _iterator.each)(series, function (_, singleSeries) {
      var stackName = singleSeries.getStackName ? singleSeries.getStackName() : 'default';
      (0, _iterator.each)(singleSeries.getPoints(), function (index, point) {
        var stackSum = getAbsStackSumByArg(stackKeepers, stackName, point.argument.valueOf());
        if (stackSum !== 0) {
          point.value = point.value / stackSum;
          if ((0, _type.isNumeric)(point.minValue)) {
            point.minValue = point.minValue / stackSum;
          }
        }
      });
    });
  }
  function updateRangeSeriesValues() {
    var that = this;
    var series = getVisibleSeries(that);
    (0, _iterator.each)(series, function (_, singleSeries) {
      var minBarSize = singleSeries.getOptions().minBarSize;
      var valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
      var minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
      if (minShownBusinessValue) {
        (0, _iterator.each)(singleSeries.getPoints(), function (_, point) {
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
    (0, _iterator.each)(this.series, function (_, singleSeries) {
      var minBarSize = singleSeries.getOptions().minBarSize;
      var valueAxisTranslator = singleSeries.getValueAxis().getTranslator();
      var minShownBusinessValue = minBarSize && valueAxisTranslator.getMinBarSize(minBarSize);
      if (minShownBusinessValue) {
        (0, _iterator.each)(singleSeries.getPoints(), function (index, point) {
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
    (0, _iterator.each)(series, function (_, seriesItem) {
      (0, _iterator.each)(seriesItem.getPoints(), function (_, point) {
        maxPointSize = maxPointSize > point.size ? maxPointSize : point.size;
        minPointSize = minPointSize < point.size ? minPointSize : point.size;
      });
    });
    var sizeDispersion = maxPointSize - minPointSize;
    var areaDispersion = abs(maxBubbleArea - minBubbleArea);
    (0, _iterator.each)(series, function (_, seriesItem) {
      (0, _iterator.each)(seriesItem.getPoints(), function (_, point) {
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
  function SeriesFamily(options) {
    ///#DEBUG
    _console.debug.assert(options.type, 'type was not passed or empty');
    ///#ENDDEBUG

    var that = this;
    that.type = (0, _utils.normalizeEnum)(options.type);
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
    adjustSeriesDimensions: _common.noop,
    adjustSeriesValues: _common.noop,
    updateSeriesValues: _common.noop,
    updateOptions: function updateOptions(options) {
      this._options = options;
    },
    dispose: function dispose() {
      this.series = null;
    },
    add: function add(series) {
      var type = this.type;
      this.series = (0, _utils.map)(series, function (singleSeries) {
        return singleSeries.type === type ? singleSeries : null;
      });
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../../core/utils/extend","../../core/utils/iterator","../../core/utils/math","../../core/utils/common","./utils","../../core/utils/date","../../core/utils/console"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("../../core/utils/math"), require("../../core/utils/common"), require("./utils"), require("../../core/utils/date"), require("../../core/utils/console"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=series_family.js.map