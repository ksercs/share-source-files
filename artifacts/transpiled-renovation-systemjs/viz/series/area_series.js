!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/series/area_series.js"], ["../../core/utils/object","../../core/utils/extend","./scatter_series","./line_series","../core/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/series/area_series.js", ["../../core/utils/object", "../../core/utils/extend", "./scatter_series", "./line_series", "../core/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.polar = exports.chart = void 0;
  var _object = $__require("../../core/utils/object");
  var _extend2 = $__require("../../core/utils/extend");
  var _scatter_series = $__require("./scatter_series");
  var _line_series = $__require("./line_series");
  var _utils = $__require("../core/utils");
  // there are area, steparea, stackedarea, fullstackedarea, splinearea

  var chartLineSeries = _line_series.chart.line;
  var polarLineSeries = _line_series.polar.line;
  var _extend = _extend2.extend;
  var calculateBezierPoints = _line_series.chart['spline']._calculateBezierPoints;
  var chart = {};
  exports.chart = chart;
  var polar = {};
  exports.polar = polar;
  var baseAreaMethods = {
    _createBorderElement: chartLineSeries._createMainElement,
    _createLegendState: function _createLegendState(styleOptions, defaultColor) {
      return {
        fill: (0, _utils.extractColor)(styleOptions.color) || defaultColor,
        opacity: styleOptions.opacity,
        hatching: styleOptions.hatching,
        filter: styleOptions.highlight
      };
    },
    _getColorId: function _getColorId(options) {
      var _options$color;
      return (_options$color = options.color) === null || _options$color === void 0 ? void 0 : _options$color.fillId;
    },
    getValueRangeInitialValue: function getValueRangeInitialValue() {
      if (this.valueAxisType !== 'logarithmic' && this.valueType !== 'datetime' && this.showZero !== false) {
        return 0;
      } else {
        return _scatter_series.chart.getValueRangeInitialValue.call(this);
      }
    },
    _getDefaultSegment: function _getDefaultSegment(segment) {
      var defaultSegment = chartLineSeries._getDefaultSegment(segment);
      defaultSegment.area = defaultSegment.line.concat(defaultSegment.line.slice().reverse());
      return defaultSegment;
    },
    _updateElement: function _updateElement(element, segment, animate, complete) {
      var lineParams = {
        points: segment.line
      };
      var areaParams = {
        points: segment.area
      };
      var borderElement = element.line;
      if (animate) {
        borderElement && borderElement.animate(lineParams);
        element.area.animate(areaParams, {}, complete);
      } else {
        borderElement && borderElement.attr(lineParams);
        element.area.attr(areaParams);
      }
    },
    _removeElement: function _removeElement(element) {
      element.line && element.line.remove();
      element.area.remove();
    },
    _drawElement: function _drawElement(segment) {
      return {
        line: this._bordersGroup && this._createBorderElement(segment.line, {
          'stroke-width': this._styles.normal.border['stroke-width']
        }).append(this._bordersGroup),
        area: this._createMainElement(segment.area).append(this._elementsGroup)
      };
    },
    _applyStyle: function _applyStyle(style) {
      var that = this;
      that._elementsGroup && that._elementsGroup.smartAttr(style.elements);
      that._bordersGroup && that._bordersGroup.attr(style.border);
      (that._graphics || []).forEach(function (graphic) {
        graphic.line && graphic.line.attr({
          'stroke-width': style.border['stroke-width']
        }).sharp();
      });
    },
    _parseStyle: function _parseStyle(options, defaultColor, defaultBorderColor) {
      var _options$highlight;
      var borderOptions = options.border || {};
      var borderStyle = chartLineSeries._parseLineOptions(borderOptions, defaultBorderColor);
      borderStyle.stroke = borderOptions.visible && borderStyle['stroke-width'] ? borderStyle.stroke : 'none';
      borderStyle['stroke-width'] = borderStyle['stroke-width'] || 1;
      return {
        border: borderStyle,
        elements: {
          stroke: 'none',
          fill: (0, _utils.extractColor)(options.color) || defaultColor,
          hatching: options.hatching,
          opacity: options.opacity,
          filter: (_options$highlight = options.highlight) !== null && _options$highlight !== void 0 ? _options$highlight : null
        }
      };
    },
    _areBordersVisible: function _areBordersVisible() {
      var options = this._options;
      return options.border.visible || options.hoverStyle.border.visible || options.selectionStyle.border.visible;
    },
    _createMainElement: function _createMainElement(points, settings) {
      return this._renderer.path(points, 'area').attr(settings);
    },
    _getTrackerSettings: function _getTrackerSettings(segment) {
      return {
        'stroke-width': segment.singlePointSegment ? this._defaultTrackerWidth : 0
      };
    },
    _getMainPointsFromSegment: function _getMainPointsFromSegment(segment) {
      return segment.area;
    }
  };
  function createAreaPoints(points) {
    return (0, _utils.map)(points, function (pt) {
      return pt.getCoords();
    }).concat((0, _utils.map)(points.slice().reverse(), function (pt) {
      return pt.getCoords(true);
    }));
  }
  var areaSeries = chart['area'] = _extend({}, chartLineSeries, baseAreaMethods, {
    _prepareSegment: function _prepareSegment(points, rotated) {
      var that = this;
      var processedPoints = that._processSinglePointsAreaSegment(points, rotated);
      var areaPoints = createAreaPoints(processedPoints);
      var argAxis = that.getArgumentAxis();
      if (argAxis.getAxisPosition) {
        var argAxisPosition = argAxis.getAxisPosition();
        var axisOptions = argAxis.getOptions();
        var edgeOffset = (!rotated ? -1 : 1) * Math.round(axisOptions.width / 2);
        if (axisOptions.visible) {
          areaPoints.forEach(function (p, i) {
            if (p) {
              var index = points.length === 1 ? 0 : i < points.length ? i : areaPoints.length - 1 - i;
              rotated && p.x === points[index].defaultX && p.x === argAxisPosition - argAxis.getAxisShift() && (p.x += edgeOffset);
              !rotated && p.y === points[index].defaultY && p.y === argAxisPosition - argAxis.getAxisShift() && (p.y += edgeOffset);
            }
          });
        }
      }
      return {
        line: processedPoints,
        area: areaPoints,
        singlePointSegment: processedPoints !== points
      };
    },
    _processSinglePointsAreaSegment: function _processSinglePointsAreaSegment(points, rotated) {
      if (points && points.length === 1) {
        var p = points[0];
        var p1 = (0, _object.clone)(p);
        p1[rotated ? 'y' : 'x'] += 1;
        p1.argument = null;
        return [p, p1];
      }
      return points;
    }
  });
  polar['area'] = _extend({}, polarLineSeries, baseAreaMethods, {
    _prepareSegment: function _prepareSegment(points, rotated, lastSegment) {
      lastSegment && polarLineSeries._closeSegment.call(this, points);
      return areaSeries._prepareSegment.call(this, points);
    },
    _processSinglePointsAreaSegment: function _processSinglePointsAreaSegment(points) {
      return _line_series.polar.line._prepareSegment.call(this, points).line;
    }
  });
  chart['steparea'] = _extend({}, areaSeries, {
    _prepareSegment: function _prepareSegment(points, rotated) {
      var stepLineSeries = _line_series.chart['stepline'];
      points = areaSeries._processSinglePointsAreaSegment(points, rotated);
      return areaSeries._prepareSegment.call(this, stepLineSeries._calculateStepLinePoints.call(this, points), rotated);
    },
    getSeriesPairCoord: _line_series.chart['stepline'].getSeriesPairCoord
  });
  chart['splinearea'] = _extend({}, areaSeries, {
    _areaPointsToSplineAreaPoints: function _areaPointsToSplineAreaPoints(areaPoints) {
      var previousMiddlePoint = areaPoints[areaPoints.length / 2 - 1];
      var middlePoint = areaPoints[areaPoints.length / 2];
      areaPoints.splice(areaPoints.length / 2, 0, {
        x: previousMiddlePoint.x,
        y: previousMiddlePoint.y
      }, {
        x: middlePoint.x,
        y: middlePoint.y
      });
      ///#DEBUG
      if (previousMiddlePoint.defaultCoords) {
        areaPoints[areaPoints.length / 2].defaultCoords = true;
      }
      if (middlePoint.defaultCoords) {
        areaPoints[areaPoints.length / 2 - 1].defaultCoords = true;
      }
      ///#ENDDEBUG
    },

    _prepareSegment: function _prepareSegment(points, rotated) {
      var processedPoints = areaSeries._processSinglePointsAreaSegment(points, rotated);
      var areaSegment = areaSeries._prepareSegment.call(this, calculateBezierPoints(processedPoints, rotated));
      this._areaPointsToSplineAreaPoints(areaSegment.area);
      areaSegment.singlePointSegment = processedPoints !== points;
      return areaSegment;
    },
    _getDefaultSegment: function _getDefaultSegment(segment) {
      var areaDefaultSegment = areaSeries._getDefaultSegment(segment);
      this._areaPointsToSplineAreaPoints(areaDefaultSegment.area);
      return areaDefaultSegment;
    },
    _createMainElement: function _createMainElement(points, settings) {
      return this._renderer.path(points, 'bezierarea').attr(settings);
    },
    _createBorderElement: _line_series.chart['spline']._createMainElement,
    getSeriesPairCoord: _line_series.chart['spline'].getSeriesPairCoord,
    _getNearestPoints: _line_series.chart['spline']._getNearestPoints,
    _getBezierPoints: _line_series.chart['spline']._getBezierPoints,
    obtainCubicBezierTCoef: _line_series.chart['spline'].obtainCubicBezierTCoef
  });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/object","../../core/utils/extend","./scatter_series","./line_series","../core/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/object"), require("../../core/utils/extend"), require("./scatter_series"), require("./line_series"), require("../core/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=area_series.js.map