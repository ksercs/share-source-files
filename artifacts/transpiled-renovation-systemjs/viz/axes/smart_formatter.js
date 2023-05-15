!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/axes/smart_formatter.js"], ["../../format_helper","../../core/utils/type","../../core/utils/date","../../core/utils/math","../core/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/axes/smart_formatter.js", ["../../format_helper", "../../core/utils/type", "../../core/utils/date", "../../core/utils/math", "../core/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.formatRange = formatRange;
  exports.smartFormatter = smartFormatter;
  var _format_helper = _interopRequireDefault($__require("../../format_helper"));
  var _type = $__require("../../core/utils/type");
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _math = $__require("../../core/utils/math");
  var _utils = $__require("../core/utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
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
      type: type,
      formatter: formatter
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
      type: type,
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
      precision: precision,
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
      type: type,
      dataType: dataType,
      tickInterval: tickInterval,
      logarithmBase: logarithmBase,
      labelOptions: {
        format: argumentFormat
      }
    };
    return "".concat(smartFormatter(startValue, formatOptions), " - ").concat(smartFormatter(endValue, formatOptions));
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../format_helper","../../core/utils/type","../../core/utils/date","../../core/utils/math","../core/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../format_helper"), require("../../core/utils/type"), require("../../core/utils/date"), require("../../core/utils/math"), require("../core/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=smart_formatter.js.map