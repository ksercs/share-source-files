!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/series/bar_series.js"], ["../../core/utils/extend","../../core/utils/iterator","./scatter_series","./area_series","../core/utils","../../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/series/bar_series.js", ["../../core/utils/extend", "../../core/utils/iterator", "./scatter_series", "./area_series", "../core/utils", "../../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.polar = exports.chart = void 0;
  var _extend2 = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var scatterSeries = _interopRequireWildcard($__require("./scatter_series"));
  var _area_series = $__require("./area_series");
  var _utils = $__require("../core/utils");
  var _type = $__require("../../core/utils/type");
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return { default: obj };
    }var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {
      return cache.get(obj);
    }var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }newObj.default = obj;if (cache) {
      cache.set(obj, newObj);
    }return newObj;
  }
  var areaSeries = _area_series.chart.area;
  var chartSeries = scatterSeries.chart;
  var polarSeries = scatterSeries.polar;
  var _extend = _extend2.extend;
  var _each = _iterator.each;
  var chart = {};
  exports.chart = chart;
  var polar = {};
  exports.polar = polar;
  var baseBarSeriesMethods = {
    _createLegendState: function _createLegendState(styleOptions, defaultColor) {
      return {
        fill: (0, _utils.extractColor)(styleOptions.color) || defaultColor,
        hatching: styleOptions.hatching,
        filter: styleOptions.highlight
      };
    },
    _getColorId: areaSeries._getColorId,
    _parsePointStyle: function _parsePointStyle(style, defaultColor, defaultBorderColor) {
      var color = (0, _utils.extractColor)(style.color) || defaultColor;
      var base = chartSeries._parsePointStyle.call(this, style, color, defaultBorderColor);
      base.fill = color;
      base.hatching = style.hatching;
      base.filter = style.highlight;
      base.dashStyle = style.border && style.border.dashStyle || 'solid';
      delete base.r;
      return base;
    },
    _applyMarkerClipRect: function _applyMarkerClipRect(settings) {
      settings['clip-path'] = null;
    },
    _setGroupsSettings: function _setGroupsSettings(animationEnabled, firstDrawing) {
      var that = this;
      var settings = {};
      chartSeries._setGroupsSettings.apply(that, arguments);
      if (animationEnabled && firstDrawing) {
        settings = this._getAffineCoordOptions();
      } else if (!animationEnabled) {
        settings = {
          scaleX: 1,
          scaleY: 1,
          translateX: 0,
          translateY: 0
        };
      }
      that._markersGroup.attr(settings);
    },
    _drawPoint: function _drawPoint(options) {
      options.hasAnimation = options.hasAnimation && !options.firstDrawing;
      options.firstDrawing = false;
      chartSeries._drawPoint.call(this, options);
    },
    _getMainColor: function _getMainColor() {
      return this._options.mainSeriesColor;
    },
    _createPointStyles: function _createPointStyles(pointOptions) {
      var _pointOptions$color;
      var that = this;
      var mainColor = (0, _utils.extractColor)(pointOptions.color, true) || that._getMainColor();
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
        selection: that._parsePointStyle(selectionStyle, colorId || mainColor, mainColor)
      };
    },
    _updatePointsVisibility: function _updatePointsVisibility() {
      var visibility = this._options.visible;
      (0, _iterator.each)(this._points, function (_, point) {
        point._options.visible = visibility;
      });
    },
    _getOptionsForPoint: function _getOptionsForPoint() {
      return this._options;
    },
    _animate: function _animate(firstDrawing) {
      var that = this;
      var complete = function complete() {
        that._animateComplete();
      };
      var animateFunc = function animateFunc(drawnPoints, complete) {
        var lastPointIndex = drawnPoints.length - 1;
        _each(drawnPoints || [], function (i, point) {
          point.animate(i === lastPointIndex ? complete : undefined, point.getMarkerCoords());
        });
      };
      that._animatePoints(firstDrawing, complete, animateFunc);
    },
    getValueRangeInitialValue: areaSeries.getValueRangeInitialValue,
    _patchMarginOptions: function _patchMarginOptions(options) {
      var _this$getArgumentAxis;
      options.checkInterval = !this.useAggregation() || ((_this$getArgumentAxis = this.getArgumentAxis()) === null || _this$getArgumentAxis === void 0 ? void 0 : _this$getArgumentAxis.aggregatedPointBetweenTicks());
      return options;
    },
    _defaultAggregator: 'sum',
    _defineDrawingState: function _defineDrawingState() {},
    usePointsToDefineAutoHiding: function usePointsToDefineAutoHiding() {
      return false;
    }
  };
  chart.bar = _extend({}, chartSeries, baseBarSeriesMethods, {
    _getAffineCoordOptions: function _getAffineCoordOptions() {
      var rotated = this._options.rotated;
      var direction = rotated ? 'X' : 'Y';
      var settings = {
        scaleX: rotated ? 0.001 : 1,
        scaleY: rotated ? 1 : 0.001
      };
      settings['translate' + direction] = this.getValueAxis().getTranslator().translate('canvas_position_default');
      return settings;
    },
    _animatePoints: function _animatePoints(firstDrawing, complete, animateFunc) {
      var that = this;
      that._markersGroup.animate({
        scaleX: 1,
        scaleY: 1,
        translateY: 0,
        translateX: 0
      }, undefined, complete);
      if (!firstDrawing) {
        animateFunc(that._drawnPoints, complete);
      }
    },
    checkSeriesViewportCoord: function checkSeriesViewportCoord(axis, coord) {
      if (!chartSeries.checkSeriesViewportCoord.call(this)) {
        return false;
      }
      if (axis.isArgumentAxis) {
        return true;
      }
      var translator = axis.getTranslator();
      var range = this.getViewport();
      var min = translator.translate(range.categories ? range.categories[0] : range.min);
      var max = translator.translate(range.categories ? range.categories[range.categories.length - 1] : range.max);
      var rotated = this.getOptions().rotated;
      var inverted = axis.getOptions().inverted;
      return rotated && !inverted || !rotated && inverted ? coord >= min && coord <= max : coord >= max && coord <= min;
    },
    getSeriesPairCoord: function getSeriesPairCoord(coord, isArgument) {
      var oppositeCoord = null;
      var rotated = this._options.rotated;
      var isOpposite = !isArgument && !rotated || isArgument && rotated;
      var coordName = isOpposite ? 'vy' : 'vx';
      var oppositeCoordName = isOpposite ? 'vx' : 'vy';
      var points = this.getPoints();
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var tmpCoord = void 0;
        if (isArgument) {
          tmpCoord = p.getCenterCoord()[coordName[1]] === coord ? p[oppositeCoordName] : undefined;
        } else {
          tmpCoord = p[coordName] === coord ? p[oppositeCoordName] : undefined;
        }
        if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
          oppositeCoord = tmpCoord;
          break;
        }
      }
      return oppositeCoord;
    }
  });
  polar.bar = _extend({}, polarSeries, baseBarSeriesMethods, {
    _animatePoints: function _animatePoints(firstDrawing, complete, animateFunc) {
      animateFunc(this._drawnPoints, complete);
    },
    _setGroupsSettings: chartSeries._setGroupsSettings,
    _drawPoint: function _drawPoint(point, groups, animationEnabled) {
      chartSeries._drawPoint.call(this, point, groups, animationEnabled);
    },
    _parsePointStyle: function _parsePointStyle(style) {
      var base = baseBarSeriesMethods._parsePointStyle.apply(this, arguments);
      base.opacity = style.opacity;
      return base;
    },
    _createGroups: chartSeries._createGroups,
    _setMarkerGroupSettings: function _setMarkerGroupSettings() {
      var that = this;
      var markersSettings = that._createPointStyles(that._getMarkerGroupOptions()).normal;
      markersSettings['class'] = 'dxc-markers';
      that._applyMarkerClipRect(markersSettings);
      var groupSettings = _extend({}, markersSettings);
      delete groupSettings.opacity; // T110796
      that._markersGroup.attr(groupSettings);
    },
    getSeriesPairCoord: function getSeriesPairCoord(params, isArgument) {
      var coords = null;
      var paramName = isArgument ? 'argument' : 'radius';
      var points = this.getVisiblePoints();
      var argAxis = this.getArgumentAxis();
      var startAngle = argAxis.getAngles()[0];
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var tmpPoint = (0, _type.isDefined)(p[paramName]) && (0, _type.isDefined)(params[paramName]) && p[paramName].valueOf() === params[paramName].valueOf() ? (0, _utils.convertPolarToXY)(argAxis.getCenter(), startAngle, -argAxis.getTranslatedAngle(p.angle), p.radius) : undefined;
        if ((0, _type.isDefined)(tmpPoint)) {
          coords = tmpPoint;
          break;
        }
      }
      return coords;
    },
    _createLegendState: areaSeries._createLegendState
  });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../../core/utils/iterator","./scatter_series","./area_series","../core/utils","../../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../../core/utils/iterator"), require("./scatter_series"), require("./area_series"), require("../core/utils"), require("../../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=bar_series.js.map