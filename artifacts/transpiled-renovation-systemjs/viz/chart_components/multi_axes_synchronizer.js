!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/chart_components/multi_axes_synchronizer.js"], ["../../core/utils/console","../../core/utils/type","../../core/utils/iterator","../core/utils","../../core/utils/math"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/chart_components/multi_axes_synchronizer.js", ["../../core/utils/console", "../../core/utils/type", "../../core/utils/iterator", "../core/utils", "../../core/utils/math"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _console = $__require("../../core/utils/console");
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _utils = $__require("../core/utils");
  var _math2 = $__require("../../core/utils/math");
  var _math = Math;
  var _floor = _math.floor;
  var _max = _math.max;
  var _abs = _math.abs;
  function getValueAxesPerPanes(valueAxes) {
    var result = {};
    valueAxes.forEach(function (axis) {
      var pane = axis.pane;
      if (!result[pane]) {
        result[pane] = [];
      }
      result[pane].push(axis);
    });
    return result;
  }
  var linearConverter = function linearConverter(br) {
    return {
      transform: function transform(v, b) {
        return (0, _math2.adjust)((0, _utils.getLogExt)(v, b, br.allowNegatives, br.linearThreshold));
      },
      getTicks: function getTicks(interval, tickValues, base) {
        var ticks = [];
        var tick = this.transform(tickValues[0], base);
        while (ticks.length < tickValues.length) {
          ticks.push(tick);
          tick = (0, _math2.adjust)(tick + interval);
        }
        return ticks;
      }
    };
  };
  var logConverter = function logConverter(br) {
    return {
      transform: function transform(v, b) {
        return (0, _math2.adjust)((0, _utils.raiseToExt)(v, b, br.allowNegatives, br.linearThreshold));
      },
      getTicks: function getTicks(interval, tickValues, base) {
        var ticks = [];
        var tick;
        for (var i = 0; i < tickValues.length; i += 1) {
          tick = this.transform(tickValues[i], base);
          ticks.push(tick);
        }
        return ticks;
      }
    };
  };
  function convertAxisInfo(axisInfo, converter) {
    if (!axisInfo.isLogarithmic) {
      return;
    }
    var base = axisInfo.logarithmicBase;
    var tickValues = axisInfo.tickValues;
    axisInfo.minValue = converter.transform(axisInfo.minValue, base);
    axisInfo.oldMinValue = converter.transform(axisInfo.oldMinValue, base);
    axisInfo.maxValue = converter.transform(axisInfo.maxValue, base);
    axisInfo.oldMaxValue = converter.transform(axisInfo.oldMaxValue, base);
    axisInfo.tickInterval = _math.round(axisInfo.tickInterval);
    if (axisInfo.tickInterval < 1) {
      axisInfo.tickInterval = 1;
    }
    var ticks = converter.getTicks(axisInfo.tickInterval, tickValues, base);
    ticks.tickInterval = axisInfo.tickInterval;
    axisInfo.tickValues = ticks;
  }
  function populateAxesInfo(axes) {
    return axes.reduce(function (result, axis) {
      var ticksValues = axis.getTicksValues();
      var majorTicks = ticksValues.majorTicksValues;
      var options = axis.getOptions();
      var businessRange = axis.getTranslator().getBusinessRange();
      var visibleArea = axis.getVisibleArea();
      var axisInfo;
      var tickInterval = axis._tickInterval;
      var synchronizedValue = options.synchronizedValue;
      var action = axis.getViewport().action;
      if (majorTicks && majorTicks.length > 0 && (0, _type.isNumeric)(majorTicks[0]) && options.type !== 'discrete' && !businessRange.isEmpty() && !(businessRange.breaks && businessRange.breaks.length) && action !== 'zoom' && action !== 'pan') {
        axis.applyMargins();
        var startValue = axis.getTranslator().from(visibleArea[0]);
        var endValue = axis.getTranslator().from(visibleArea[1]);
        var minValue = startValue < endValue ? startValue : endValue;
        var maxValue = startValue < endValue ? endValue : startValue;
        if (minValue === maxValue && (0, _type.isDefined)(synchronizedValue)) {
          tickInterval = _abs(majorTicks[0] - synchronizedValue) || 1;
          minValue = majorTicks[0] - tickInterval;
          maxValue = majorTicks[0] + tickInterval;
        }
        axisInfo = {
          axis: axis,
          isLogarithmic: options.type === 'logarithmic',
          logarithmicBase: businessRange.base,
          tickValues: majorTicks,
          minorValues: ticksValues.minorTicksValues,
          minorTickInterval: axis._minorTickInterval,
          minValue: minValue,
          oldMinValue: minValue,
          maxValue: maxValue,
          oldMaxValue: maxValue,
          inverted: businessRange.invert,
          tickInterval: tickInterval,
          synchronizedValue: synchronizedValue
        };
        convertAxisInfo(axisInfo, linearConverter(axis.getTranslator().getBusinessRange()));
        result.push(axisInfo);

        ///#DEBUG
        _console.debug.assert(axisInfo.minValue === axisInfo.maxValue && (!(0, _type.isDefined)(axisInfo.tickInterval) || (0, _type.isDefined)(options.tickInterval)) || (0, _type.isDefined)(axisInfo.tickInterval), 'tickInterval was not provided');
        ///#ENDDEBUG
      }

      return result;
    }, []);
  }
  function updateTickValues(axesInfo) {
    var maxTicksCount = axesInfo.reduce(function (max, axisInfo) {
      return _max(max, axisInfo.tickValues.length);
    }, 0);
    axesInfo.forEach(function (axisInfo) {
      var ticksMultiplier;
      var ticksCount;
      var additionalStartTicksCount = 0;
      var synchronizedValue = axisInfo.synchronizedValue;
      var tickValues = axisInfo.tickValues;
      var tickInterval = axisInfo.tickInterval;
      if ((0, _type.isDefined)(synchronizedValue)) {
        axisInfo.baseTickValue = axisInfo.invertedBaseTickValue = synchronizedValue;
        axisInfo.tickValues = [axisInfo.baseTickValue];
      } else {
        if (tickValues.length > 1 && tickInterval) {
          ticksMultiplier = _floor((maxTicksCount + 1) / tickValues.length);
          ticksCount = ticksMultiplier > 1 ? _floor((maxTicksCount + 1) / ticksMultiplier) : maxTicksCount;
          additionalStartTicksCount = _floor((ticksCount - tickValues.length) / 2);
          while (additionalStartTicksCount > 0 && tickValues[0] !== 0) {
            tickValues.unshift((0, _math2.adjust)(tickValues[0] - tickInterval));
            additionalStartTicksCount--;
          }
          while (tickValues.length < ticksCount) {
            tickValues.push((0, _math2.adjust)(tickValues[tickValues.length - 1] + tickInterval));
          }
          axisInfo.tickInterval = tickInterval / ticksMultiplier;
        }
        axisInfo.baseTickValue = tickValues[0];
        axisInfo.invertedBaseTickValue = tickValues[tickValues.length - 1];
      }
    });
  }
  function getAxisRange(axisInfo) {
    return axisInfo.maxValue - axisInfo.minValue || 1; // T153054
  }

  function getMainAxisInfo(axesInfo) {
    for (var i = 0; i < axesInfo.length; i++) {
      if (!axesInfo[i].stubData) {
        return axesInfo[i];
      }
    }
    return null;
  }
  function correctMinMaxValues(axesInfo) {
    var mainAxisInfo = getMainAxisInfo(axesInfo);
    var mainAxisInfoTickInterval = mainAxisInfo.tickInterval;
    axesInfo.forEach(function (axisInfo) {
      var scale;
      var move;
      var mainAxisBaseValueOffset;
      var valueFromAxisInfo;
      if (axisInfo !== mainAxisInfo) {
        if (mainAxisInfoTickInterval && axisInfo.tickInterval) {
          if (axisInfo.stubData && (0, _type.isDefined)(axisInfo.synchronizedValue)) {
            axisInfo.oldMinValue = axisInfo.minValue = axisInfo.baseTickValue - (mainAxisInfo.baseTickValue - mainAxisInfo.minValue) / mainAxisInfoTickInterval * axisInfo.tickInterval;
            axisInfo.oldMaxValue = axisInfo.maxValue = axisInfo.baseTickValue - (mainAxisInfo.baseTickValue - mainAxisInfo.maxValue) / mainAxisInfoTickInterval * axisInfo.tickInterval;
          }
          scale = mainAxisInfoTickInterval / getAxisRange(mainAxisInfo) / axisInfo.tickInterval * getAxisRange(axisInfo);
          axisInfo.maxValue = axisInfo.minValue + getAxisRange(axisInfo) / scale;
        }
        if (mainAxisInfo.inverted && !axisInfo.inverted || !mainAxisInfo.inverted && axisInfo.inverted) {
          mainAxisBaseValueOffset = mainAxisInfo.maxValue - mainAxisInfo.invertedBaseTickValue;
        } else {
          mainAxisBaseValueOffset = mainAxisInfo.baseTickValue - mainAxisInfo.minValue;
        }
        valueFromAxisInfo = getAxisRange(axisInfo);
        move = (mainAxisBaseValueOffset / getAxisRange(mainAxisInfo) - (axisInfo.baseTickValue - axisInfo.minValue) / valueFromAxisInfo) * valueFromAxisInfo;
        axisInfo.minValue -= move;
        axisInfo.maxValue -= move;
      }
    });
  }
  function calculatePaddings(axesInfo) {
    var minPadding;
    var maxPadding;
    var startPadding = 0;
    var endPadding = 0;
    axesInfo.forEach(function (axisInfo) {
      var inverted = axisInfo.inverted;
      minPadding = axisInfo.minValue > axisInfo.oldMinValue ? (axisInfo.minValue - axisInfo.oldMinValue) / getAxisRange(axisInfo) : 0;
      maxPadding = axisInfo.maxValue < axisInfo.oldMaxValue ? (axisInfo.oldMaxValue - axisInfo.maxValue) / getAxisRange(axisInfo) : 0;
      startPadding = _max(startPadding, inverted ? maxPadding : minPadding);
      endPadding = _max(endPadding, inverted ? minPadding : maxPadding);
    });
    return {
      start: startPadding,
      end: endPadding
    };
  }
  function correctMinMaxValuesByPaddings(axesInfo, paddings) {
    axesInfo.forEach(function (info) {
      var range = getAxisRange(info);
      var inverted = info.inverted;
      info.minValue = (0, _math2.adjust)(info.minValue - paddings[inverted ? 'end' : 'start'] * range);
      info.maxValue = (0, _math2.adjust)(info.maxValue + paddings[inverted ? 'start' : 'end'] * range);
    });
  }
  function updateTickValuesIfSynchronizedValueUsed(axesInfo) {
    var hasSynchronizedValue = false;
    axesInfo.forEach(function (info) {
      hasSynchronizedValue = hasSynchronizedValue || (0, _type.isDefined)(info.synchronizedValue);
    });
    axesInfo.forEach(function (info) {
      var tickInterval = info.tickInterval;
      var tickValues = info.tickValues;
      var maxValue = info.maxValue;
      var minValue = info.minValue;
      var tick;
      if (hasSynchronizedValue && tickInterval) {
        while ((tick = (0, _math2.adjust)(tickValues[0] - tickInterval)) >= minValue) {
          tickValues.unshift(tick);
        }
        tick = tickValues[tickValues.length - 1];
        while ((tick = (0, _math2.adjust)(tick + tickInterval)) <= maxValue) {
          tickValues.push(tick);
        }
      }
      while (tickValues[0] + tickInterval / 10 < minValue) {
        tickValues.shift();
      }
      while (tickValues[tickValues.length - 1] - tickInterval / 10 > maxValue) {
        tickValues.pop();
      }
    });
  }
  function applyMinMaxValues(axesInfo) {
    axesInfo.forEach(function (info) {
      var axis = info.axis;
      var range = axis.getTranslator().getBusinessRange();
      if (range.min === range.minVisible) {
        range.min = info.minValue;
      }
      if (range.max === range.maxVisible) {
        range.max = info.maxValue;
      }
      range.minVisible = info.minValue;
      range.maxVisible = info.maxValue;
      if (range.min > range.minVisible) {
        range.min = range.minVisible;
      }
      if (range.max < range.maxVisible) {
        range.max = range.maxVisible;
      }
      axis.getTranslator().updateBusinessRange(range);
      axis.setTicks({
        majorTicks: info.tickValues,
        minorTicks: info.minorValues
      });
    });
  }
  function correctAfterSynchronize(axesInfo) {
    var invalidAxisInfo = [];
    var correctValue;
    axesInfo.forEach(function (info) {
      if (info.oldMaxValue - info.oldMinValue === 0) {
        invalidAxisInfo.push(info);
      } else {
        if (!(0, _type.isDefined)(correctValue) && !(0, _type.isDefined)(info.synchronizedValue)) {
          correctValue = _abs((info.maxValue - info.minValue) / (info.tickValues[_floor(info.tickValues.length / 2)] - info.minValue || info.maxValue));
        }
      }
    });
    if (!(0, _type.isDefined)(correctValue)) {
      return;
    }
    invalidAxisInfo.forEach(function (info) {
      var firstTick = info.tickValues[0];
      var correctedTick = firstTick * correctValue;
      if (firstTick > 0) {
        info.maxValue = correctedTick;
        info.minValue = 0;
      } else if (firstTick < 0) {
        info.minValue = correctedTick;
        info.maxValue = 0;
      }
    });
  }
  function updateMinorTicks(axesInfo) {
    axesInfo.forEach(function (axisInfo) {
      if (!axisInfo.minorTickInterval) {
        return;
      }
      var ticks = [];
      var interval = axisInfo.minorTickInterval;
      var tickCount = axisInfo.tickInterval / interval - 1;
      for (var i = 1; i < axisInfo.tickValues.length; i++) {
        var tick = axisInfo.tickValues[i - 1];
        for (var j = 0; j < tickCount; j++) {
          tick += interval;
          ticks.push(tick);
        }
      }
      axisInfo.minorValues = ticks;
    });
  }
  function correctPaddings(axesInfo, paddings) {
    return axesInfo.reduce(function (prev, info) {
      var inverted = info.inverted;
      var _info$axis$getCorrect = info.axis.getCorrectedValuesToZero(info.minValue, info.maxValue),
          start = _info$axis$getCorrect.start,
          end = _info$axis$getCorrect.end;
      if ((0, _type.isDefined)(start) || (0, _type.isDefined)(end)) {
        return inverted ? {
          start: prev.start,
          end: Math.min(prev.end, end)
        } : {
          start: Math.min(prev.start, start),
          end: prev.end
        };
      }
      return prev;
    }, paddings);
  }
  var multiAxesSynchronizer = {
    synchronize: function synchronize(valueAxes) {
      (0, _iterator.each)(getValueAxesPerPanes(valueAxes), function (_, axes) {
        var axesInfo;
        var paddings;
        if (axes.length > 1) {
          axesInfo = populateAxesInfo(axes);
          if (axesInfo.length < 2 || !getMainAxisInfo(axesInfo)) return;
          updateTickValues(axesInfo);
          correctMinMaxValues(axesInfo);
          paddings = calculatePaddings(axesInfo);
          paddings = correctPaddings(axesInfo, paddings);
          correctMinMaxValuesByPaddings(axesInfo, paddings);
          correctAfterSynchronize(axesInfo);
          updateTickValuesIfSynchronizedValueUsed(axesInfo);
          updateMinorTicks(axesInfo);
          axesInfo.forEach(function (info) {
            convertAxisInfo(info, logConverter(info.axis.getTranslator().getBusinessRange()));
          });
          applyMinMaxValues(axesInfo);
        }
      });
    }
  };
  var _default = multiAxesSynchronizer;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/console","../../core/utils/type","../../core/utils/iterator","../core/utils","../../core/utils/math"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/console"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../core/utils"), require("../../core/utils/math"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=multi_axes_synchronizer.js.map