!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/series/pie_series.js"], ["../../core/utils/common","../../core/utils/iterator","./scatter_series","../core/utils","../../core/utils/extend","./bar_series","../../core/utils/console"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/series/pie_series.js", ["../../core/utils/common", "../../core/utils/iterator", "./scatter_series", "../core/utils", "../../core/utils/extend", "./bar_series", "../../core/utils/console"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.pie = exports.doughnut = exports.donut = void 0;
  var _common = $__require("../../core/utils/common");
  var _iterator = $__require("../../core/utils/iterator");
  var _scatter_series = $__require("./scatter_series");
  var _utils = $__require("../core/utils");
  var _extend2 = $__require("../../core/utils/extend");
  var _bar_series = $__require("./bar_series");
  var _console = $__require("../../core/utils/console");
  // there are pie, doughnut

  ///#DEBUG

  ///#ENDDEBUG

  var chartScatterSeries = _scatter_series.chart;
  var barSeries = _bar_series.chart.bar;
  var _extend = _extend2.extend;
  var _each = _iterator.each;
  var _noop = _common.noop;
  var _map = _utils.map;
  var _isFinite = isFinite;
  var _max = Math.max;
  var ANIMATION_DURATION = 0.7;
  var INSIDE = 'inside';
  var pie = _extend({}, barSeries, {
    _setGroupsSettings: function _setGroupsSettings() {
      chartScatterSeries._setGroupsSettings.apply(this, arguments);
      this._labelsGroup.attr({
        'pointer-events': null
      });
    },
    _createErrorBarGroup: _noop,
    _drawPoint: function _drawPoint(options) {
      var point = options.point;
      var legendCallback = this._legendCallback;
      chartScatterSeries._drawPoint.call(this, options);
      !point.isVisible() && point.setInvisibility();
      point.isSelected() && legendCallback();
    },
    _getOldPoint: function _getOldPoint(data, oldPointsByArgument, index) {
      var point = (this._points || [])[index];
      if (point) {
        oldPointsByArgument[point.argument.valueOf()] = oldPointsByArgument[point.argument.valueOf()].filter(function (p) {
          return p !== point;
        });
      }
      return point;
    },
    adjustLabels: function adjustLabels(moveLabelsFromCenter) {
      return (this._points || []).reduce(function (r, p) {
        if (p._label.isVisible()) {
          p.setLabelTrackerData();
          r = p.applyWordWrap(moveLabelsFromCenter) || r;
          p.updateLabelCoord(moveLabelsFromCenter);
          return r;
        }
      }, false);
    },
    _applyElementsClipRect: _noop,
    getColor: _noop,
    areErrorBarsVisible: _noop,
    drawLabelsWOPoints: function drawLabelsWOPoints() {
      var that = this;
      if (that._options.label.position === INSIDE) {
        return false;
      }
      that._labelsGroup.append(that._extGroups.labelsGroup);
      (that._points || []).forEach(function (point) {
        point.drawLabel();
      });
      return true;
    },
    getPointsCount: function getPointsCount() {
      var _this = this;
      return this._data.filter(function (d) {
        return _this._checkData(d);
      }).length;
    },
    setMaxPointsCount: function setMaxPointsCount(count) {
      this._pointsCount = count;
    },
    _getCreatingPointOptions: function _getCreatingPointOptions(data, dataIndex) {
      return this._getPointOptions(data, dataIndex);
    },
    _updateOptions: function _updateOptions(options) {
      this.labelSpace = 0;
      this.innerRadius = this.type === 'pie' ? 0 : options.innerRadius;
    },
    _checkData: function _checkData(data, skippedFields) {
      var base = barSeries._checkData.call(this, data, skippedFields, {
        value: this.getValueFields()[0]
      });
      return this._options.paintNullPoints ? base : base && data.value !== null;
    },
    _createGroups: chartScatterSeries._createGroups,
    _setMarkerGroupSettings: function _setMarkerGroupSettings() {
      this._markersGroup.attr({
        'class': 'dxc-markers'
      });
    },
    _getMainColor: function _getMainColor(data, point) {
      var pointsByArg = this.getPointsByArg(data.argument);
      var argumentIndex = point ? pointsByArg.indexOf(point) : pointsByArg.length;
      return this._options.mainSeriesColor(data.argument, argumentIndex, this._pointsCount);
    },
    _getPointOptions: function _getPointOptions(data) {
      return this._parsePointOptions(this._preparePointOptions(), this._options.label, data);
    },
    _getRangeData: function _getRangeData() {
      return this._rangeData;
    },
    _createPointStyles: function _createPointStyles(pointOptions, data, point) {
      var _pointOptions$color;
      var that = this;
      var mainColor = (0, _utils.extractColor)(pointOptions.color, true) || that._getMainColor(data, point);
      var colorId = (_pointOptions$color = pointOptions.color) === null || _pointOptions$color === void 0 ? void 0 : _pointOptions$color.fillId;
      var hoverStyle = pointOptions.hoverStyle || {};
      var selectionStyle = pointOptions.selectionStyle || {};
      if (colorId) {
        that._turnOffHatching(hoverStyle, selectionStyle);
      }
      return {
        labelColor: mainColor,
        normal: that._parsePointStyle(pointOptions, mainColor, mainColor),
        hover: that._parsePointStyle(hoverStyle, colorId || mainColor, mainColor),
        selection: that._parsePointStyle(selectionStyle, colorId || mainColor, mainColor),
        legendStyles: {
          normal: that._createLegendState(pointOptions, mainColor),
          hover: that._createLegendState(hoverStyle, colorId || mainColor),
          selection: that._createLegendState(selectionStyle, colorId || mainColor)
        }
      };
    },
    _getArrangeMinShownValue: function _getArrangeMinShownValue(points, total) {
      var minSegmentSize = this._options.minSegmentSize;
      var totalMinSegmentSize = 0;
      var totalNotMinValues = 0;
      total = total || points.length;
      _each(points, function (_, point) {
        if (point.isVisible()) {
          if (point.normalInitialValue < minSegmentSize * total / 360) {
            totalMinSegmentSize += minSegmentSize;
          } else {
            totalNotMinValues += point.normalInitialValue;
          }
        }
      });
      return totalMinSegmentSize < 360 ? minSegmentSize * totalNotMinValues / (360 - totalMinSegmentSize) : 0;
    },
    _applyArrangeCorrection: function _applyArrangeCorrection(points, minShownValue, total) {
      var options = this._options;
      var isClockWise = options.segmentsDirection !== 'anticlockwise';
      var shiftedAngle = _isFinite(options.startAngle) ? (0, _utils.normalizeAngle)(options.startAngle) : 0;
      var minSegmentSize = options.minSegmentSize;
      var percent;
      var correction = 0;
      var zeroTotalCorrection = 0;
      if (total === 0) {
        total = points.filter(function (el) {
          return el.isVisible();
        }).length;
        zeroTotalCorrection = 1;
      }
      _each(isClockWise ? points : points.concat([]).reverse(), function (_, point) {
        var val = point.isVisible() ? zeroTotalCorrection || point.normalInitialValue : 0;
        var updatedZeroValue;
        if (minSegmentSize && point.isVisible() && val < minShownValue) {
          updatedZeroValue = minShownValue;
        }
        percent = val / total;
        point.correctValue(correction, percent, zeroTotalCorrection + (updatedZeroValue || 0));
        point.shiftedAngle = shiftedAngle;
        correction = correction + (updatedZeroValue || val);
      });
      this._rangeData = {
        val: {
          min: 0,
          max: correction
        }
      };
    },
    _removePoint: function _removePoint(point) {
      var points = this.getPointsByArg(point.argument);
      points.splice(points.indexOf(point), 1); // T485210
      point.dispose();
    },
    arrangePoints: function arrangePoints() {
      var that = this;
      var originalPoints = that._points || [];
      var minSegmentSize = that._options.minSegmentSize;
      var minShownValue;
      var isAllPointsNegative = true;
      var i = 0;
      var len = originalPoints.length;
      while (i < len && isAllPointsNegative) {
        isAllPointsNegative = originalPoints[i].value <= 0;
        i++;
      }
      var points = that._points = _map(originalPoints, function (point) {
        if (point.value === null || !isAllPointsNegative && point.value < 0) {
          that._removePoint(point);
          return null;
        } else {
          return point;
        }
      });
      var maxValue = points.reduce(function (max, p) {
        return _max(max, Math.abs(p.initialValue));
      }, 0);
      points.forEach(function (p) {
        p.normalInitialValue = p.initialValue / (maxValue !== 0 ? maxValue : 1);
      });
      var total = points.reduce(function (total, point) {
        return total + (point.isVisible() ? point.normalInitialValue : 0);
      }, 0);
      if (minSegmentSize) {
        minShownValue = this._getArrangeMinShownValue(points, total);
      }
      that._applyArrangeCorrection(points, minShownValue, total);
    },
    correctPosition: function correctPosition(correction, canvas) {
      ///#DEBUG
      _console.debug.assert(correction, 'correction was not passed');
      _console.debug.assertParam(correction.centerX, 'correction.centerX was not passed');
      _console.debug.assertParam(correction.centerY, 'correction.centerY was not passed');
      _console.debug.assertParam(correction.radiusInner, 'correction.radiusInner was not passed');
      _console.debug.assertParam(correction.radiusOuter, 'correction.radiusOuter was not passed');
      _console.debug.assertParam(canvas, 'correction.canvas was not passed');
      ///#ENDDEBUG
      _each(this._points, function (_, point) {
        point.correctPosition(correction);
      });
      this.setVisibleArea(canvas);
    },
    correctRadius: function correctRadius(correction) {
      this._points.forEach(function (point) {
        point.correctRadius(correction);
      });
    },
    correctLabelRadius: function correctLabelRadius(labelRadius) {
      this._points.forEach(function (point) {
        point.correctLabelRadius(labelRadius);
      });
    },
    setVisibleArea: function setVisibleArea(canvas) {
      this._visibleArea = {
        minX: canvas.left,
        maxX: canvas.width - canvas.right,
        minY: canvas.top,
        maxY: canvas.height - canvas.bottom
      };
    },
    _applyVisibleArea: _noop,
    _animate: function _animate(firstDrawing) {
      var that = this;
      var points = that._points;
      var pointsCount = points && points.length;
      var completeFunc = function completeFunc() {
        that._animateComplete();
      };
      var animatePoint;
      if (firstDrawing) {
        animatePoint = function animatePoint(p, i) {
          p.animate(i === pointsCount - 1 ? completeFunc : undefined, ANIMATION_DURATION, (1 - ANIMATION_DURATION) * i / (pointsCount - 1));
        };
      } else {
        animatePoint = function animatePoint(p, i) {
          p.animate(i === pointsCount - 1 ? completeFunc : undefined);
        };
      }
      points.forEach(animatePoint);
    },
    getVisiblePoints: function getVisiblePoints() {
      return _map(this._points, function (p) {
        return p.isVisible() ? p : null;
      });
    },
    getPointsByKeys: function getPointsByKeys(arg, argumentIndex) {
      var pointsByArg = this.getPointsByArg(arg);
      return pointsByArg[argumentIndex] && [pointsByArg[argumentIndex]] || [];
    }
  });
  exports.pie = pie;
  var doughnut = pie;
  exports.doughnut = doughnut;
  var donut = pie;
  exports.donut = donut;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/common","../../core/utils/iterator","./scatter_series","../core/utils","../../core/utils/extend","./bar_series","../../core/utils/console"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/common"), require("../../core/utils/iterator"), require("./scatter_series"), require("../core/utils"), require("../../core/utils/extend"), require("./bar_series"), require("../../core/utils/console"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pie_series.js.map