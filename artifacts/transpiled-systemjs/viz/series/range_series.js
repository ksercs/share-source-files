!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/series/range_series.js"], ["../../core/utils/extend","../../core/utils/type","../core/utils","../../core/utils/common","./scatter_series","./bar_series","./area_series"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/series/range_series.js", ["../../core/utils/extend", "../../core/utils/type", "../core/utils", "../../core/utils/common", "./scatter_series", "./bar_series", "./area_series"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.chart = void 0;
  var _extend2 = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _utils = $__require("../core/utils");
  var _common = $__require("../../core/utils/common");
  var _scatter_series = $__require("./scatter_series");
  var _bar_series = $__require("./bar_series");
  var _area_series = $__require("./area_series");
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var _extend = _extend2.extend;
  var barSeries = _bar_series.chart.bar;
  var areaSeries = _area_series.chart.area;
  var chart = {};
  exports.chart = chart;
  var baseRangeSeries = {
    areErrorBarsVisible: _common.noop,
    _createErrorBarGroup: _common.noop,
    _checkData: function _checkData(data, skippedFields) {
      var valueFields = this.getValueFields();
      return _scatter_series.chart._checkData.call(this, data, skippedFields, {
        minValue: valueFields[0],
        value: valueFields[1]
      }) && data.minValue === data.minValue;
    },
    getValueRangeInitialValue: _scatter_series.chart.getValueRangeInitialValue,
    _getPointDataSelector: function _getPointDataSelector(data) {
      var _this = this;
      var valueFields = this.getValueFields();
      var val1Field = valueFields[0];
      var val2Field = valueFields[1];
      var tagField = this.getTagField();
      var argumentField = this.getArgumentField();
      return function (data) {
        return {
          tag: data[tagField],
          minValue: _this._processEmptyValue(data[val1Field]),
          value: _this._processEmptyValue(data[val2Field]),
          argument: data[argumentField],
          data: data
        };
      };
    },
    _defaultAggregator: 'range',
    _aggregators: {
      range: function range(_ref, series) {
        var _data$reduce;
        var intervalStart = _ref.intervalStart,
            intervalEnd = _ref.intervalEnd,
            data = _ref.data;
        if (!data.length) {
          return;
        }
        var valueFields = series.getValueFields();
        var val1Field = valueFields[0];
        var val2Field = valueFields[1];
        var result = data.reduce(function (result, item) {
          var val1 = item[val1Field];
          var val2 = item[val2Field];
          if (!(0, _type.isDefined)(val1) || !(0, _type.isDefined)(val2)) {
            return result;
          }
          result[val1Field] = Math.min(result[val1Field], Math.min(val1, val2));
          result[val2Field] = Math.max(result[val2Field], Math.max(val1, val2));
          return result;
        }, (_data$reduce = {}, _defineProperty(_data$reduce, val1Field, Infinity), _defineProperty(_data$reduce, val2Field, -Infinity), _defineProperty(_data$reduce, series.getArgumentField(), series._getIntervalCenter(intervalStart, intervalEnd)), _data$reduce));
        if (!isFinite(result[val1Field]) || !isFinite(result[val2Field])) {
          if (data.filter(function (i) {
            return i[val1Field] === null && i[val2Field] === null;
          }).length === data.length) {
            result[val1Field] = result[val2Field] = null;
          } else {
            return;
          }
        }
        return result;
      }
    },
    getValueFields: function getValueFields() {
      return [this._options.rangeValue1Field || 'val1', this._options.rangeValue2Field || 'val2'];
    },
    getSeriesPairCoord: function getSeriesPairCoord(coord, isArgument) {
      var oppositeCoord = null;
      var rotated = this._options.rotated;
      var isOpposite = !isArgument && !rotated || isArgument && rotated;
      var coordName = isOpposite ? 'vy' : 'vx';
      var minCoordName = rotated ? 'minX' : 'minY';
      var oppositeCoordName = isOpposite ? 'vx' : 'vy';
      var points = this.getPoints();
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var tmpCoord = void 0;
        if (isArgument) {
          tmpCoord = p.getCenterCoord()[coordName[1]] === coord ? p[oppositeCoordName] : undefined;
        } else {
          var coords = [Math.min(p[coordName], p[minCoordName]), Math.max(p[coordName], p[minCoordName])];
          tmpCoord = coord >= coords[0] && coord <= coords[1] ? p[oppositeCoordName] : undefined;
        }
        if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
          oppositeCoord = tmpCoord;
          break;
        }
      }
      return oppositeCoord;
    }
  };
  chart['rangebar'] = _extend({}, barSeries, baseRangeSeries);
  chart['rangearea'] = _extend({}, areaSeries, {
    _drawPoint: function _drawPoint(options) {
      var point = options.point;
      if (point.isInVisibleArea()) {
        point.clearVisibility();
        point.draw(this._renderer, options.groups);
        this._drawnPoints.push(point);
        if (!point.visibleTopMarker) {
          point.hideMarker('top');
        }
        if (!point.visibleBottomMarker) {
          point.hideMarker('bottom');
        }
      } else {
        point.setInvisibility();
      }
    },
    _prepareSegment: function _prepareSegment(points, rotated) {
      var processedPoints = this._processSinglePointsAreaSegment(points, rotated);
      var processedMinPointsCoords = (0, _utils.map)(processedPoints, function (pt) {
        return pt.getCoords(true);
      });
      return {
        line: processedPoints,
        bottomLine: processedMinPointsCoords,
        area: (0, _utils.map)(processedPoints, function (pt) {
          return pt.getCoords();
        }).concat(processedMinPointsCoords.slice().reverse()),
        singlePointSegment: processedPoints !== points
      };
    },
    _getDefaultSegment: function _getDefaultSegment(segment) {
      var defaultSegment = areaSeries._getDefaultSegment.call(this, segment);
      defaultSegment.bottomLine = defaultSegment.line;
      return defaultSegment;
    },
    _removeElement: function _removeElement(element) {
      areaSeries._removeElement.call(this, element);
      element.bottomLine && element.bottomLine.remove();
    },
    _drawElement: function _drawElement(segment, group) {
      var that = this;
      var drawnElement = areaSeries._drawElement.call(that, segment, group);
      drawnElement.bottomLine = that._bordersGroup && that._createBorderElement(segment.bottomLine, {
        'stroke-width': that._styles.normal.border['stroke-width']
      }).append(that._bordersGroup);
      return drawnElement;
    },
    _applyStyle: function _applyStyle(style) {
      var that = this;
      var elementsGroup = that._elementsGroup;
      var bordersGroup = that._bordersGroup;
      elementsGroup && elementsGroup.smartAttr(style.elements);
      bordersGroup && bordersGroup.attr(style.border);
      (that._graphics || []).forEach(function (graphic) {
        graphic.line && graphic.line.attr({
          'stroke-width': style.border['stroke-width']
        });
        graphic.bottomLine && graphic.bottomLine.attr({
          'stroke-width': style.border['stroke-width']
        });
      });
    },
    _updateElement: function _updateElement(element, segment, animate, complete) {
      var bottomLineParams = {
        points: segment.bottomLine
      };
      var bottomBorderElement = element.bottomLine;
      areaSeries._updateElement.apply(this, arguments);
      if (bottomBorderElement) {
        animate ? bottomBorderElement.animate(bottomLineParams) : bottomBorderElement.attr(bottomLineParams);
      }
    }
  }, baseRangeSeries);
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../../core/utils/type","../core/utils","../../core/utils/common","./scatter_series","./bar_series","./area_series"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../../core/utils/type"), require("../core/utils"), require("../../core/utils/common"), require("./scatter_series"), require("./bar_series"), require("./area_series"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=range_series.js.map