!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/series/helpers/range_data_calculator.js"], ["../../core/utils","../../../core/utils/type","../../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/series/helpers/range_data_calculator.js", ["../../core/utils", "../../../core/utils/type", "../../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _utils = $__require("../../core/utils");
  var _type = $__require("../../../core/utils/type");
  var _common = $__require("../../../core/utils/common");
  var DISCRETE = 'discrete';
  var abs = Math.abs,
      floor = Math.floor,
      ceil = Math.ceil,
      min = Math.min;
  function continuousRangeCalculator(range, minValue, maxValue) {
    range.min = range.min < minValue ? range.min : minValue;
    range.max = range.max > maxValue ? range.max : maxValue;
  }
  function createGetLogFunction(axisType, axis) {
    if (axisType !== 'logarithmic') {
      return null;
    }
    var base = axis.getOptions().logarithmBase;
    return function (value) {
      var log = (0, _utils.getLog)(abs(value), base);
      var round = log < 0 ? floor : ceil;
      return round(log);
    };
  }
  function getRangeCalculator(axisType, axis, getLog) {
    var rangeCalculator = continuousRangeCalculator;
    if (axisType === DISCRETE) {
      rangeCalculator = function rangeCalculator(range, minValue, maxValue) {
        if (minValue !== maxValue) {
          range.categories.push(maxValue);
        }
        range.categories.push(minValue);
      };
    } else if (axis) {
      rangeCalculator = function rangeCalculator(range, value) {
        var interval = axis.calculateInterval(value, range.prevValue);
        var minInterval = range.interval;
        range.interval = (minInterval < interval ? minInterval : interval) || minInterval;
        range.prevValue = value;
        continuousRangeCalculator(range, value, value);
      };
    }
    if (getLog) {
      return function (range, minValue, maxValue) {
        var minArgs = [];
        rangeCalculator(range, minValue, maxValue);
        minValue !== 0 && minArgs.push(getLog(minValue));
        maxValue !== 0 && minArgs.push(getLog(maxValue));
        var linearThreshold = min.apply(null, minArgs);
        range.linearThreshold = range.linearThreshold < linearThreshold ? range.linearThreshold : linearThreshold;
      };
    }
    return rangeCalculator;
  }
  function getInitialRange(axisType, dataType, firstValue) {
    var range = {
      axisType: axisType,
      dataType: dataType
    };
    if (axisType === DISCRETE) {
      range.categories = [];
    } else {
      range.min = (0, _type.isObject)(firstValue) ? firstValue.min : firstValue;
      range.max = (0, _type.isObject)(firstValue) ? firstValue.max : firstValue;
    }
    return range;
  }
  function processCategories(range) {
    if (range.categories) {
      range.categories = (0, _utils.unique)(range.categories);
    }
    return range;
  }
  function getValueForArgument(point, extraPoint, x, range) {
    if (extraPoint && (0, _type.isDefined)(extraPoint.value)) {
      var y1 = point.value;
      var y2 = extraPoint.value;
      var x1 = point.argument;
      var x2 = extraPoint.argument;
      var r = (x - x1) * (y2 - y1) / (x2 - x1) + y1.valueOf();
      return range.dataType === 'datetime' ? new Date(r) : r;
    } else {
      return point.value;
    }
  }
  function calculateRangeBetweenPoints(rangeCalculator, range, point, prevPoint, bound) {
    var value = getValueForArgument(point, prevPoint, bound, range);
    rangeCalculator(range, value, value);
  }
  function isLineSeries(series) {
    return series.type.toLowerCase().indexOf('line') >= 0 || series.type.toLowerCase().indexOf('area') >= 0;
  }
  function getViewportReducer(series) {
    var rangeCalculator = getRangeCalculator(series.valueAxisType);
    var argumentAxis = series.getArgumentAxis();
    var viewport = argumentAxis && series.getArgumentAxis().visualRange() || {};
    var calculatePointBetweenPoints = isLineSeries(series) ? calculateRangeBetweenPoints : _common.noop;
    if (argumentAxis && argumentAxis.getMarginOptions().checkInterval) {
      var range = series.getArgumentAxis().getTranslator().getBusinessRange();
      var add = (0, _utils.getAddFunction)(range, false);
      var interval = range.interval;
      if (isFinite(interval) && (0, _type.isDefined)(viewport.startValue) && (0, _type.isDefined)(viewport.endValue)) {
        viewport.startValue = add(viewport.startValue, interval, -1);
        viewport.endValue = add(viewport.endValue, interval);
      }
    }
    var viewportFilter = getViewPortFilter(viewport);
    return function (range, point, index, points) {
      var argument = point.argument;
      if (!point.hasValue()) {
        return range;
      }
      if (viewportFilter(argument)) {
        if (!range.startCalc) {
          range.startCalc = true;
          calculatePointBetweenPoints(rangeCalculator, range, point, points[index - 1], viewport.startValue);
        }
        rangeCalculator(range, point.getMinValue(), point.getMaxValue());
      } else if (!viewport.categories && (0, _type.isDefined)(viewport.startValue) && argument > viewport.startValue) {
        if (!range.startCalc) {
          calculatePointBetweenPoints(rangeCalculator, range, point, points[index - 1], viewport.startValue);
        }
        range.endCalc = true;
        calculatePointBetweenPoints(rangeCalculator, range, point, points[index - 1], viewport.endValue);
      }
      return range;
    };
  }
  function getViewPortFilter(viewport) {
    if (viewport.categories) {
      var dictionary = viewport.categories.reduce(function (result, category) {
        result[category.valueOf()] = true;
        return result;
      }, {});
      return function (argument) {
        return (0, _type.isDefined)(argument) && dictionary[argument.valueOf()];
      };
    }
    if (!(0, _type.isDefined)(viewport.startValue) && !(0, _type.isDefined)(viewport.endValue)) {
      return function () {
        return true;
      };
    }
    if (!(0, _type.isDefined)(viewport.endValue)) {
      return function (argument) {
        return argument >= viewport.startValue;
      };
    }
    if (!(0, _type.isDefined)(viewport.startValue)) {
      return function (argument) {
        return argument <= viewport.endValue;
      };
    }
    return function (argument) {
      return argument >= viewport.startValue && argument <= viewport.endValue;
    };
  }
  var _default = {
    getViewPortFilter: getViewPortFilter,
    getArgumentRange: function getArgumentRange(series) {
      var data = series._data || [];
      var range = {};
      if (data.length) {
        if (series.argumentAxisType === DISCRETE) {
          range = {
            categories: data.map(function (item) {
              return item.argument;
            })
          };
        } else {
          var interval;
          if (data.length > 1) {
            var i1 = series.getArgumentAxis().calculateInterval(data[0].argument, data[1].argument);
            var i2 = series.getArgumentAxis().calculateInterval(data[data.length - 1].argument, data[data.length - 2].argument);
            interval = min(i1, i2);
          }
          range = {
            min: data[0].argument,
            max: data[data.length - 1].argument,
            interval: interval
          };
        }
      }
      return processCategories(range);
    },
    getRangeData: function getRangeData(series) {
      var points = series.getPoints();
      var useAggregation = series.useAggregation();
      var argumentAxis = series.getArgumentAxis();
      var argumentCalculator = getRangeCalculator(series.argumentAxisType, points.length > 1 && argumentAxis, createGetLogFunction(series.argumentAxisType, argumentAxis));
      var valueRangeCalculator = getRangeCalculator(series.valueAxisType, null, createGetLogFunction(series.valueAxisType, series.getValueAxis()));
      var viewportReducer = getViewportReducer(series);
      var range = points.reduce(function (range, point, index, points) {
        var argument = point.argument;
        if (!point.isArgumentCorrect()) {
          return range;
        }
        argumentCalculator(range.arg, argument, argument);
        if (point.hasValue()) {
          valueRangeCalculator(range.val, point.getMinValue(), point.getMaxValue());
          viewportReducer(range.viewport, point, index, points);
        }
        return range;
      }, {
        arg: getInitialRange(series.argumentAxisType, series.argumentType, argumentAxis !== null && argumentAxis !== void 0 && argumentAxis.aggregatedPointBetweenTicks() ? undefined : series.getArgumentRangeInitialValue()),
        val: getInitialRange(series.valueAxisType, series.valueType, points.length ? series.getValueRangeInitialValue() : undefined),
        viewport: getInitialRange(series.valueAxisType, series.valueType, points.length ? series.getValueRangeInitialValue() : undefined)
      });
      if (useAggregation) {
        var argumentRange = this.getArgumentRange(series);
        if (series.argumentAxisType === DISCRETE) {
          range.arg = argumentRange;
        } else {
          var viewport = argumentAxis.getViewport();
          if ((0, _type.isDefined)(viewport.startValue) || (0, _type.isDefined)(viewport.length)) {
            argumentCalculator(range.arg, argumentRange.min, argumentRange.min);
          }
          if ((0, _type.isDefined)(viewport.endValue) || (0, _type.isDefined)(viewport.length) && (0, _type.isDefined)(viewport.startValue)) {
            argumentCalculator(range.arg, argumentRange.max, argumentRange.max);
          }
        }
      }
      processCategories(range.arg);
      processCategories(range.val);
      return range;
    },
    getViewport: function getViewport(series) {
      var points = series.getPoints();
      var range = {};
      var reducer = getViewportReducer(series);
      range = getInitialRange(series.valueAxisType, series.valueType, points.length ? series.getValueRangeInitialValue() : undefined);
      points.some(function (point, index) {
        reducer(range, point, index, points);
        return range.endCalc;
      });
      return range;
    },
    getPointsInViewPort: function getPointsInViewPort(series) {
      var argumentViewPortFilter = getViewPortFilter(series.getArgumentAxis().visualRange() || {});
      var valueViewPort = series.getValueAxis().visualRange() || {};
      var valueViewPortFilter = getViewPortFilter(valueViewPort);
      var points = series.getPoints();
      var addValue = function addValue(values, point, isEdge) {
        var minValue = point.getMinValue();
        var maxValue = point.getMaxValue();
        var isMinValueInViewPort = valueViewPortFilter(minValue);
        var isMaxValueInViewPort = valueViewPortFilter(maxValue);
        if (isMinValueInViewPort) {
          values.push(minValue);
        }
        if (maxValue !== minValue && isMaxValueInViewPort) {
          values.push(maxValue);
        }
        if (isEdge && !isMinValueInViewPort && !isMaxValueInViewPort) {
          if (!values.length) {
            values.push(valueViewPort.startValue);
          } else {
            values.push(valueViewPort.endValue);
          }
        }
      };
      var addEdgePoints = isLineSeries(series) ? function (result, points, index) {
        var point = points[index];
        var prevPoint = points[index - 1];
        var nextPoint = points[index + 1];
        if (nextPoint && argumentViewPortFilter(nextPoint.argument)) {
          addValue(result[1], point, true);
        }
        if (prevPoint && argumentViewPortFilter(prevPoint.argument)) {
          addValue(result[1], point, true);
        }
      } : _common.noop;
      var checkPointInViewport = function checkPointInViewport(result, point, index) {
        if (argumentViewPortFilter(point.argument)) {
          addValue(result[0], point);
        } else {
          addEdgePoints(result, points, index);
        }
        return result;
      };
      return points.reduce(checkPointInViewport, [[], []]);
    }
  };
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils","../../../core/utils/type","../../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils"), require("../../../core/utils/type"), require("../../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=range_data_calculator.js.map