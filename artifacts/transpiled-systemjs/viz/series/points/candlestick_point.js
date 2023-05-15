!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/series/points/candlestick_point.js"], ["../../../core/utils/extend","./symbol_point","./bar_point"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/series/points/candlestick_point.js", ["../../../core/utils/extend", "./symbol_point", "./bar_point"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _extend2 = $__require("../../../core/utils/extend");
  var _symbol_point = _interopRequireDefault($__require("./symbol_point"));
  var _bar_point = _interopRequireDefault($__require("./bar_point"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _math = Math;
  var _abs = _math.abs;
  var _min = _math.min;
  var _max = _math.max;
  var _round = _math.round;
  var DEFAULT_FINANCIAL_TRACKER_MARGIN = 2;
  var _default = (0, _extend2.extend)({}, _bar_point.default, {
    _calculateVisibility: _symbol_point.default._calculateVisibility,
    _getContinuousPoints: function _getContinuousPoints(openCoord, closeCoord) {
      var that = this;
      var x = that.x;
      var createPoint = that._options.rotated ? function (x, y) {
        return [y, x];
      } : function (x, y) {
        return [x, y];
      };
      var width = that.width;
      var highCoord = that.highY;
      var max = _abs(highCoord - openCoord) < _abs(highCoord - closeCoord) ? openCoord : closeCoord;
      var min = max === closeCoord ? openCoord : closeCoord;
      var points;
      if (min === max) {
        points = [].concat(createPoint(x, that.highY)).concat(createPoint(x, that.lowY)).concat(createPoint(x, that.closeY)).concat(createPoint(x - width / 2, that.closeY)).concat(createPoint(x + width / 2, that.closeY)).concat(createPoint(x, that.closeY));
      } else {
        points = [].concat(createPoint(x, that.highY)).concat(createPoint(x, max)).concat(createPoint(x + width / 2, max)).concat(createPoint(x + width / 2, min)).concat(createPoint(x, min)).concat(createPoint(x, that.lowY)).concat(createPoint(x, min)).concat(createPoint(x - width / 2, min)).concat(createPoint(x - width / 2, max)).concat(createPoint(x, max));
      }
      return points;
    },
    _getCrockPoints: function _getCrockPoints(y) {
      var that = this;
      var x = that.x;
      var createPoint = that._options.rotated ? function (x, y) {
        return [y, x];
      } : function (x, y) {
        return [x, y];
      };
      return [].concat(createPoint(x, that.highY)).concat(createPoint(x, that.lowY)).concat(createPoint(x, y)).concat(createPoint(x - that.width / 2, y)).concat(createPoint(x + that.width / 2, y)).concat(createPoint(x, y));
    },
    _getPoints: function _getPoints() {
      var that = this;
      var points;
      var closeCoord = that.closeY;
      var openCoord = that.openY;
      if (closeCoord !== null && openCoord !== null) {
        points = that._getContinuousPoints(openCoord, closeCoord);
      } else {
        if (openCoord === closeCoord) {
          points = [that.x, that.highY, that.x, that.lowY];
        } else {
          points = that._getCrockPoints(openCoord !== null ? openCoord : closeCoord);
        }
      }
      return points;
    },
    getColor: function getColor() {
      var that = this;
      return that._isReduction ? that._options.reduction.color : that._styles.normal.stroke || that.series.getColor();
    },
    _drawMarkerInGroup: function _drawMarkerInGroup(group, attributes, renderer) {
      var that = this;
      that.graphic = renderer.path(that._getPoints(), 'area').attr({
        'stroke-linecap': 'square'
      }).attr(attributes).data({
        'chart-data-point': that
      }).sharp().append(group);
    },
    _fillStyle: function _fillStyle() {
      var that = this;
      var styles = that._options.styles;
      if (that._isReduction && that._isPositive) {
        that._styles = styles.reductionPositive;
      } else if (that._isReduction) {
        that._styles = styles.reduction;
      } else if (that._isPositive) {
        that._styles = styles.positive;
      } else {
        that._styles = styles;
      }
    },
    _getMinTrackerWidth: function _getMinTrackerWidth() {
      return 2 + 2 * this._styles.normal['stroke-width'];
    },
    correctCoordinates: function correctCoordinates(correctOptions) {
      var minWidth = this._getMinTrackerWidth();
      var maxWidth = 10;
      var width = correctOptions.width;
      width = width < minWidth ? minWidth : width > maxWidth ? maxWidth : width;
      this.width = width + width % 2;
      this.xCorrection = correctOptions.offset;
    },
    _getMarkerGroup: function _getMarkerGroup(group) {
      var that = this;
      var markerGroup;
      if (that._isReduction && that._isPositive) {
        markerGroup = group.reductionPositiveMarkersGroup;
      } else if (that._isReduction) {
        markerGroup = group.reductionMarkersGroup;
      } else if (that._isPositive) {
        markerGroup = group.defaultPositiveMarkersGroup;
      } else {
        markerGroup = group.defaultMarkersGroup;
      }
      return markerGroup;
    },
    _drawMarker: function _drawMarker(renderer, group) {
      this._drawMarkerInGroup(this._getMarkerGroup(group), this._getStyle(), renderer);
    },
    _getSettingsForTracker: function _getSettingsForTracker() {
      var that = this;
      var highY = that.highY;
      var lowY = that.lowY;
      var rotated = that._options.rotated;
      var x;
      var y;
      var width;
      var height;
      if (highY === lowY) {
        highY = rotated ? highY + DEFAULT_FINANCIAL_TRACKER_MARGIN : highY - DEFAULT_FINANCIAL_TRACKER_MARGIN;
        lowY = rotated ? lowY - DEFAULT_FINANCIAL_TRACKER_MARGIN : lowY + DEFAULT_FINANCIAL_TRACKER_MARGIN;
      }
      if (rotated) {
        x = _min(lowY, highY);
        y = that.x - that.width / 2;
        width = _abs(lowY - highY);
        height = that.width;
      } else {
        x = that.x - that.width / 2;
        y = _min(lowY, highY);
        width = that.width;
        height = _abs(lowY - highY);
      }
      return {
        x: x,
        y: y,
        width: width,
        height: height
      };
    },
    _getGraphicBBox: function _getGraphicBBox(location) {
      var that = this;
      var rotated = that._options.rotated;
      var x = that.x;
      var width = that.width;
      var lowY = that.lowY;
      var highY = that.highY;
      if (location) {
        var valVisibleArea = that.series.getValueAxis().getVisibleArea();
        highY = that._truncateCoord(highY, valVisibleArea);
        lowY = that._truncateCoord(lowY, valVisibleArea);
      }
      var bBox = {
        x: !rotated ? x - _round(width / 2) : lowY,
        y: !rotated ? highY : x - _round(width / 2),
        width: !rotated ? width : highY - lowY,
        height: !rotated ? lowY - highY : width
      };
      if (location) {
        var isTop = location === 'top';
        if (!this._options.rotated) {
          bBox.y = isTop ? bBox.y : bBox.y + bBox.height;
          bBox.height = 0;
        } else {
          bBox.x = isTop ? bBox.x + bBox.width : bBox.x;
          bBox.width = 0;
        }
      }
      return bBox;
    },
    getTooltipParams: function getTooltipParams(location) {
      var that = this;
      if (that.graphic) {
        var minValue = _min(that.lowY, that.highY);
        var maxValue = _max(that.lowY, that.highY);
        var visibleArea = that._getVisibleArea();
        var rotated = that._options.rotated;
        var minVisible = rotated ? visibleArea.minX : visibleArea.minY;
        var maxVisible = rotated ? visibleArea.maxX : visibleArea.maxY;
        var min = _max(minVisible, minValue);
        var max = _min(maxVisible, maxValue);
        var centerCoord = that.getCenterCoord();
        if (location === 'edge') {
          centerCoord[rotated ? 'x' : 'y'] = rotated ? max : min;
        }
        centerCoord.offset = 0;
        return centerCoord;
      }
    },
    getCenterCoord: function getCenterCoord() {
      if (this.graphic) {
        var that = this;
        var x;
        var y;
        var minValue = _min(that.lowY, that.highY);
        var maxValue = _max(that.lowY, that.highY);
        var visibleArea = that._getVisibleArea();
        var rotated = that._options.rotated;
        var minVisible = rotated ? visibleArea.minX : visibleArea.minY;
        var maxVisible = rotated ? visibleArea.maxX : visibleArea.maxY;
        var min = _max(minVisible, minValue);
        var max = _min(maxVisible, maxValue);
        var center = min + (max - min) / 2;
        if (rotated) {
          y = that.x;
          x = center;
        } else {
          x = that.x;
          y = center;
        }
        return {
          x: x,
          y: y
        };
      }
    },
    hasValue: function hasValue() {
      return this.highValue !== null && this.lowValue !== null;
    },
    hasCoords: function hasCoords() {
      return this.x !== null && this.lowY !== null && this.highY !== null;
    },
    _translate: function _translate() {
      var that = this;
      var rotated = that._options.rotated;
      var valTranslator = that._getValTranslator();
      var x = that._getArgTranslator().translate(that.argument);
      that.vx = that.vy = that.x = x === null ? x : x + (that.xCorrection || 0);
      that.openY = that.openValue !== null ? valTranslator.translate(that.openValue) : null;
      that.highY = valTranslator.translate(that.highValue);
      that.lowY = valTranslator.translate(that.lowValue);
      that.closeY = that.closeValue !== null ? valTranslator.translate(that.closeValue) : null;
      var centerValue = _min(that.lowY, that.highY) + _abs(that.lowY - that.highY) / 2;
      that._calculateVisibility(!rotated ? that.x : centerValue, !rotated ? centerValue : that.x);
    },
    getCrosshairData: function getCrosshairData(x, y) {
      var that = this;
      var rotated = that._options.rotated;
      var origY = rotated ? x : y;
      var yValue;
      var argument = that.argument;
      var coords;
      var coord = 'low';
      if (_abs(that.lowY - origY) < _abs(that.closeY - origY)) {
        yValue = that.lowY;
      } else {
        yValue = that.closeY;
        coord = 'close';
      }
      if (_abs(yValue - origY) >= _abs(that.openY - origY)) {
        yValue = that.openY;
        coord = 'open';
      }
      if (_abs(yValue - origY) >= _abs(that.highY - origY)) {
        yValue = that.highY;
        coord = 'high';
      }
      if (rotated) {
        coords = {
          y: that.vy,
          x: yValue,
          xValue: that[coord + 'Value'],
          yValue: argument
        };
      } else {
        coords = {
          x: that.vx,
          y: yValue,
          xValue: argument,
          yValue: that[coord + 'Value']
        };
      }
      coords.axis = that.series.axis;
      return coords;
    },
    _updateData: function _updateData(data) {
      var that = this;
      var label = that._label;
      var reductionColor = this._options.reduction.color;
      that.value = that.initialValue = data.reductionValue;
      that.originalValue = data.value;
      that.lowValue = that.originalLowValue = data.lowValue;
      that.highValue = that.originalHighValue = data.highValue;
      that.openValue = that.originalOpenValue = data.openValue;
      that.closeValue = that.originalCloseValue = data.closeValue;
      that._isPositive = data.openValue < data.closeValue;
      that._isReduction = data.isReduction;
      if (that._isReduction) {
        label.setColor(reductionColor);
      }
    },
    _updateMarker: function _updateMarker(animationEnabled, style, group) {
      var that = this;
      var graphic = that.graphic;
      graphic.attr({
        points: that._getPoints()
      }).smartAttr(style).sharp();
      group && graphic.append(that._getMarkerGroup(group));
    },
    _getLabelFormatObject: function _getLabelFormatObject() {
      var that = this;
      return {
        openValue: that.openValue,
        highValue: that.highValue,
        lowValue: that.lowValue,
        closeValue: that.closeValue,
        reductionValue: that.initialValue,
        argument: that.initialArgument,
        value: that.initialValue,
        seriesName: that.series.name,
        originalOpenValue: that.originalOpenValue,
        originalCloseValue: that.originalCloseValue,
        originalLowValue: that.originalLowValue,
        originalHighValue: that.originalHighValue,
        originalArgument: that.originalArgument,
        point: that
      };
    },
    _getFormatObject: function _getFormatObject(tooltip) {
      var that = this;
      var highValue = tooltip.formatValue(that.highValue);
      var openValue = tooltip.formatValue(that.openValue);
      var closeValue = tooltip.formatValue(that.closeValue);
      var lowValue = tooltip.formatValue(that.lowValue);
      var symbolMethods = _symbol_point.default;
      var formatObject = symbolMethods._getFormatObject.call(that, tooltip);
      return (0, _extend2.extend)({}, formatObject, {
        valueText: 'h: ' + highValue + (openValue !== '' ? ' o: ' + openValue : '') + (closeValue !== '' ? ' c: ' + closeValue : '') + ' l: ' + lowValue,
        highValueText: highValue,
        openValueText: openValue,
        closeValueText: closeValue,
        lowValueText: lowValue
      });
    },
    getMaxValue: function getMaxValue() {
      return this.highValue;
    },
    getMinValue: function getMinValue() {
      return this.lowValue;
    }
  });
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/extend","./symbol_point","./bar_point"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/extend"), require("./symbol_point"), require("./bar_point"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=candlestick_point.js.map