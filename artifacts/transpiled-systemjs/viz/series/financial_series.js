!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/series/financial_series.js"], ["./scatter_series","./bar_series","../../core/utils/extend","../../core/utils/type","../core/utils","../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/series/financial_series.js", ["./scatter_series", "./bar_series", "../../core/utils/extend", "../../core/utils/type", "../core/utils", "../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.stock = exports.candlestick = void 0;
  var _scatter_series = $__require("./scatter_series");
  var _bar_series = $__require("./bar_series");
  var _extend2 = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _utils = $__require("../core/utils");
  var _common = $__require("../../core/utils/common");
  // there are stock, candlestick

  var barSeries = _bar_series.chart.bar;
  var DEFAULT_FINANCIAL_POINT_SIZE = 10;
  var stock = (0, _extend2.extend)({}, _scatter_series.chart, {
    _animate: _common.noop,
    _applyMarkerClipRect: function _applyMarkerClipRect(settings) {
      settings['clip-path'] = this._forceClipping ? this._paneClipRectID : this._widePaneClipRectID;
    },
    _updatePointsVisibility: barSeries._updatePointsVisibility,
    _getOptionsForPoint: barSeries._getOptionsForPoint,
    _createErrorBarGroup: _common.noop,
    areErrorBarsVisible: _common.noop,
    _createGroups: _scatter_series.chart._createGroups,
    _setMarkerGroupSettings: function _setMarkerGroupSettings() {
      var that = this;
      var markersGroup = that._markersGroup;
      var styles = that._createPointStyles(that._getMarkerGroupOptions());
      var defaultStyle = (0, _extend2.extend)(styles.normal, {
        'class': 'default-markers'
      });
      var defaultPositiveStyle = (0, _extend2.extend)(styles.positive.normal, {
        'class': 'default-positive-markers'
      });
      var reductionStyle = (0, _extend2.extend)(styles.reduction.normal, {
        'class': 'reduction-markers'
      });
      var reductionPositiveStyle = (0, _extend2.extend)(styles.reductionPositive.normal, {
        'class': 'reduction-positive-markers'
      });
      var markerSettings = {
        'class': 'dxc-markers'
      };
      that._applyMarkerClipRect(markerSettings);
      markersGroup.attr(markerSettings);
      that._createGroup('defaultMarkersGroup', markersGroup, markersGroup, defaultStyle);
      that._createGroup('reductionMarkersGroup', markersGroup, markersGroup, reductionStyle);
      that._createGroup('defaultPositiveMarkersGroup', markersGroup, markersGroup, defaultPositiveStyle);
      that._createGroup('reductionPositiveMarkersGroup', markersGroup, markersGroup, reductionPositiveStyle);
    },
    _setGroupsSettings: function _setGroupsSettings() {
      _scatter_series.chart._setGroupsSettings.call(this, false);
    },
    _getCreatingPointOptions: function _getCreatingPointOptions() {
      var that = this;
      var defaultPointOptions;
      var creatingPointOptions = that._predefinedPointOptions;
      if (!creatingPointOptions) {
        defaultPointOptions = this._getPointOptions();
        that._predefinedPointOptions = creatingPointOptions = (0, _extend2.extend)(true, {
          styles: {}
        }, defaultPointOptions);
        creatingPointOptions.styles.normal = creatingPointOptions.styles.positive.normal = creatingPointOptions.styles.reduction.normal = creatingPointOptions.styles.reductionPositive.normal = {
          'stroke-width': defaultPointOptions.styles && defaultPointOptions.styles.normal && defaultPointOptions.styles.normal['stroke-width']
        };
      }
      return creatingPointOptions;
    },
    _checkData: function _checkData(data, skippedFields) {
      var valueFields = this.getValueFields();
      return _scatter_series.chart._checkData.call(this, data, skippedFields, {
        openValue: valueFields[0],
        highValue: valueFields[1],
        lowValue: valueFields[2],
        closeValue: valueFields[3]
      }) && data.highValue === data.highValue && data.lowValue === data.lowValue;
    },
    _getPointDataSelector: function _getPointDataSelector(data, options) {
      var _this = this;
      var that = this;
      var level;
      var valueFields = that.getValueFields();
      var argumentField = that.getArgumentField();
      var openValueField = valueFields[0];
      var highValueField = valueFields[1];
      var lowValueField = valueFields[2];
      var closeValueField = valueFields[3];
      that.level = that._options.reduction.level;
      switch ((0, _utils.normalizeEnum)(that.level)) {
        case 'open':
          level = openValueField;
          break;
        case 'high':
          level = highValueField;
          break;
        case 'low':
          level = lowValueField;
          break;
        default:
          level = closeValueField;
          that.level = 'close';
          break;
      }
      var prevLevelValue;
      return function (data) {
        var reductionValue = data[level];
        var isReduction = false;
        if ((0, _type.isDefined)(reductionValue)) {
          if ((0, _type.isDefined)(prevLevelValue)) {
            isReduction = reductionValue < prevLevelValue;
          }
          prevLevelValue = reductionValue;
        }
        return {
          argument: data[argumentField],
          highValue: _this._processEmptyValue(data[highValueField]),
          lowValue: _this._processEmptyValue(data[lowValueField]),
          closeValue: _this._processEmptyValue(data[closeValueField]),
          openValue: _this._processEmptyValue(data[openValueField]),
          reductionValue: reductionValue,
          tag: data[that.getTagField()],
          isReduction: isReduction,
          data: data
        };
      };
    },
    _parsePointStyle: function _parsePointStyle(style, defaultColor, innerColor) {
      var color = (0, _utils.extractColor)(style.color, true);
      return {
        stroke: color || defaultColor,
        'stroke-width': style.width,
        fill: color || innerColor
      };
    },
    _getDefaultStyle: function _getDefaultStyle(options) {
      var that = this;
      var mainPointColor = (0, _utils.extractColor)(options.color, true) || that._options.mainSeriesColor;
      return {
        normal: that._parsePointStyle(options, mainPointColor, mainPointColor),
        hover: that._parsePointStyle(options.hoverStyle, mainPointColor, mainPointColor),
        selection: that._parsePointStyle(options.selectionStyle, mainPointColor, mainPointColor)
      };
    },
    _getReductionStyle: function _getReductionStyle(options) {
      var that = this;
      var reductionColor = options.reduction.color;
      return {
        normal: that._parsePointStyle({
          color: reductionColor,
          width: options.width,
          hatching: options.hatching
        }, reductionColor, reductionColor),
        hover: that._parsePointStyle(options.hoverStyle, reductionColor, reductionColor),
        selection: that._parsePointStyle(options.selectionStyle, reductionColor, reductionColor)
      };
    },
    _createPointStyles: function _createPointStyles(pointOptions) {
      var that = this;
      var innerColor = that._options.innerColor;
      var styles = that._getDefaultStyle(pointOptions);
      var positiveStyle = (0, _extend2.extend)(true, {}, styles);
      var reductionStyle = that._getReductionStyle(pointOptions);
      var reductionPositiveStyle = (0, _extend2.extend)(true, {}, reductionStyle);
      positiveStyle.normal.fill = positiveStyle.hover.fill = positiveStyle.selection.fill = innerColor;
      reductionPositiveStyle.normal.fill = reductionPositiveStyle.hover.fill = reductionPositiveStyle.selection.fill = innerColor;
      styles.positive = positiveStyle;
      styles.reduction = reductionStyle;
      styles.reductionPositive = reductionPositiveStyle;
      styles.labelColor = innerColor;
      return styles;
    },
    _endUpdateData: function _endUpdateData() {
      delete this._predefinedPointOptions;
    },
    _defaultAggregator: 'ohlc',
    _aggregators: {
      'ohlc': function ohlc(_ref, series) {
        var intervalStart = _ref.intervalStart,
            intervalEnd = _ref.intervalEnd,
            data = _ref.data;
        if (!data.length) {
          return;
        }
        var result = {};
        var valueFields = series.getValueFields();
        var highValueField = valueFields[1];
        var lowValueField = valueFields[2];
        result[highValueField] = -Infinity;
        result[lowValueField] = Infinity;
        result = data.reduce(function (result, item) {
          if (item[highValueField] !== null) {
            result[highValueField] = Math.max(result[highValueField], item[highValueField]);
          }
          if (item[lowValueField] !== null) {
            result[lowValueField] = Math.min(result[lowValueField], item[lowValueField]);
          }
          return result;
        }, result);
        result[valueFields[0]] = data[0][valueFields[0]];
        result[valueFields[3]] = data[data.length - 1][valueFields[3]];
        if (!isFinite(result[highValueField])) {
          result[highValueField] = null;
        }
        if (!isFinite(result[lowValueField])) {
          result[lowValueField] = null;
        }
        result[series.getArgumentField()] = series._getIntervalCenter(intervalStart, intervalEnd);
        return result;
      }
    },
    getValueFields: function getValueFields() {
      var options = this._options;
      return [options.openValueField || 'open', options.highValueField || 'high', options.lowValueField || 'low', options.closeValueField || 'close'];
    },
    getArgumentField: function getArgumentField() {
      return this._options.argumentField || 'date';
    },
    _patchMarginOptions: function _patchMarginOptions(options) {
      var pointOptions = this._getCreatingPointOptions();
      var styles = pointOptions.styles;
      var border = [styles.normal, styles.hover, styles.selection].reduce(function (max, style) {
        return Math.max(max, style['stroke-width']);
      }, 0);
      options.size = DEFAULT_FINANCIAL_POINT_SIZE + border;
      options.sizePointNormalState = DEFAULT_FINANCIAL_POINT_SIZE;
      return options;
    },
    getSeriesPairCoord: function getSeriesPairCoord(coord, isArgument) {
      var oppositeCoord = null;
      var points = this.getVisiblePoints();
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var tmpCoord = void 0;
        if (isArgument) {
          tmpCoord = p.vx === coord ? (p.openY + p.closeY) / 2 : undefined;
        } else {
          var coords = [Math.min(p.lowY, p.highY), Math.max(p.lowY, p.highY)];
          tmpCoord = coord >= coords[0] && coord <= coords[1] ? p.vx : undefined;
        }
        if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
          oppositeCoord = tmpCoord;
          break;
        }
      }
      return oppositeCoord;
    },
    usePointsToDefineAutoHiding: function usePointsToDefineAutoHiding() {
      return false;
    }
  });
  exports.stock = stock;
  var candlestick = (0, _extend2.extend)({}, stock, {
    _parsePointStyle: function _parsePointStyle(style, defaultColor, innerColor) {
      var color = (0, _utils.extractColor)(style.color, true) || innerColor;
      var base = stock._parsePointStyle.call(this, style, defaultColor, color);
      base.fill = color;
      base.hatching = style.hatching;
      return base;
    }
  });
  exports.candlestick = candlestick;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./scatter_series","./bar_series","../../core/utils/extend","../../core/utils/type","../core/utils","../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./scatter_series"), require("./bar_series"), require("../../core/utils/extend"), require("../../core/utils/type"), require("../core/utils"), require("../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=financial_series.js.map