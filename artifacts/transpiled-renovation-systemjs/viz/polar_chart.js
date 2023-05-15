!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/polar_chart.js"], ["../core/utils/common","../core/component_registrator","../core/utils/extend","./core/utils","./chart_components/advanced_chart","../core/utils/type","./core/annotations"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/polar_chart.js", ["../core/utils/common", "../core/component_registrator", "../core/utils/extend", "./core/utils", "./chart_components/advanced_chart", "../core/utils/type", "./core/annotations"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _common = $__require("../core/utils/common");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _extend = $__require("../core/utils/extend");
  var _utils = $__require("./core/utils");
  var _advanced_chart = $__require("./chart_components/advanced_chart");
  var _type = $__require("../core/utils/type");
  var _annotations = $__require("./core/annotations");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DEFAULT_PANE_NAME = 'default';
  var DOUBLE_PI_ANGLE = 360;
  var dxPolarChart = _advanced_chart.AdvancedChart.inherit({
    _themeSection: 'polar',
    _createPanes: function _createPanes() {
      this.callBase();
      return [{
        name: DEFAULT_PANE_NAME
      }];
    },
    _checkPaneName: function _checkPaneName() {
      return true;
    },
    _getAxisRenderingOptions: function _getAxisRenderingOptions(typeSelector) {
      var isArgumentAxis = typeSelector === 'argumentAxis';
      var type = isArgumentAxis ? 'circular' : 'linear';
      var useSpiderWeb = this.option('useSpiderWeb');
      if (useSpiderWeb) {
        type += 'Spider';
      }
      return {
        axisType: 'polarAxes',
        drawingType: type
      };
    },
    _executeAppendBeforeSeries: function _executeAppendBeforeSeries(append) {
      append();
    },
    _prepareAxisOptions: function _prepareAxisOptions(typeSelector, axisOptions) {
      var isArgumentAxis = typeSelector === 'argumentAxis';
      var themeManager = this._themeManager;
      var axisUserOptions = this.option('argumentAxis');
      var argumentAxisOptions = themeManager.getOptions('argumentAxis', axisUserOptions) || {};
      var startAngle = isFinite(argumentAxisOptions.startAngle) ? (0, _utils.normalizeAngle)(argumentAxisOptions.startAngle) : 0;
      return {
        type: this.option('useSpiderWeb') && isArgumentAxis ? 'discrete' : axisOptions.type,
        isHorizontal: true,
        showCustomBoundaryTicks: isArgumentAxis,
        startAngle: startAngle,
        endAngle: startAngle + 360
      };
    },
    _optionChangesMap: {
      useSpiderWeb: 'USE_SPIDER_WEB'
    },
    _change_USE_SPIDER_WEB: function _change_USE_SPIDER_WEB() {
      this._disposeAxes();
      this._requestChange(['AXES_AND_PANES']);
    },
    _getExtraOptions: function _getExtraOptions() {
      return {
        spiderWidget: this.option('useSpiderWeb')
      };
    },
    _prepareToRender: function _prepareToRender() {
      this._appendAxesGroups();
      return {};
    },
    _calcCanvas: function _calcCanvas() {
      var canvas = (0, _extend.extend)({}, this._canvas);
      var argumentAxis = this.getArgumentAxis();
      var margins = argumentAxis.getMargins();
      Object.keys(margins).forEach(function (margin) {
        return canvas[margin] = canvas["original".concat(margin[0].toUpperCase()).concat(margin.slice(1))] + margins[margin];
      });
      return canvas;
    },
    _renderAxes: function _renderAxes(drawOptions) {
      var that = this;
      var valueAxis = that._getValueAxis();
      var argumentAxis = that.getArgumentAxis();
      argumentAxis.draw(that._canvas);
      valueAxis.setSpiderTicks(argumentAxis.getSpiderTicks());
      var canvas = that._calcCanvas();
      argumentAxis.updateSize(canvas);
      valueAxis.draw(canvas);
      return canvas;
    },
    _getValueAxis: function _getValueAxis() {
      return this._valueAxes[0];
    },
    _shrinkAxes: function _shrinkAxes(sizeStorage) {
      var valueAxis = this._getValueAxis();
      var argumentAxis = this.getArgumentAxis();
      if (sizeStorage && (sizeStorage.width || sizeStorage.height)) {
        argumentAxis.hideOuterElements();
        var canvas = this._calcCanvas();
        argumentAxis.updateSize(canvas);
        valueAxis.updateSize(canvas);
      }
    },
    checkForMoreSpaceForPanesCanvas: function checkForMoreSpaceForPanesCanvas() {
      return this.layoutManager.needMoreSpaceForPanesCanvas([{
        canvas: this.getArgumentAxis().getCanvas()
      }], this._isRotated());
    },
    _getLayoutTargets: function _getLayoutTargets() {
      return [{
        canvas: this._canvas
      }];
    },
    _getSeriesForPane: function _getSeriesForPane() {
      return this.series;
    },
    _applyClipRects: function _applyClipRects() {
      var canvasClipRectID = this._getCanvasClipRectID();
      this._createClipPathForPane();
      this.getArgumentAxis().applyClipRects(this._getElementsClipRectID(), canvasClipRectID);
      this._getValueAxis().applyClipRects(this._getElementsClipRectID(), canvasClipRectID);
    },
    _createClipPathForPane: function _createClipPathForPane() {
      var that = this;
      var valueAxis = that._getValueAxis();
      var center = valueAxis.getCenter();
      var radius = valueAxis.getRadius();
      var panesClipRects = that._panesClipRects;
      center = {
        x: Math.round(center.x),
        y: Math.round(center.y)
      };
      that._createClipCircle(panesClipRects.fixed, center.x, center.y, radius);
      that._createClipCircle(panesClipRects.base, center.x, center.y, radius);
      if (that.series.some(function (s) {
        return s.areErrorBarsVisible();
      })) {
        that._createClipCircle(panesClipRects.wide, center.x, center.y, radius);
      } else {
        panesClipRects.wide[0] = null;
      }
    },
    _createClipCircle: function _createClipCircle(clipArray, left, top, radius) {
      var that = this;
      var clipCircle = clipArray[0];
      if (!clipCircle) {
        clipCircle = that._renderer.clipCircle(left, top, radius);
        clipArray[0] = clipCircle;
      } else {
        clipCircle.attr({
          cx: left,
          cy: top,
          r: radius
        });
      }
    },
    _applyExtraSettings: function _applyExtraSettings(series) {
      var wideClipRect = this._panesClipRects.wide[0];
      series.setClippingParams(this._panesClipRects.base[0].id, wideClipRect && wideClipRect.id, false, false);
    },
    getActualAngle: function getActualAngle(angle) {
      return this.getArgumentAxis().getOptions().inverted ? DOUBLE_PI_ANGLE - angle : angle;
    },
    getXYFromPolar: function getXYFromPolar(angle, radius, argument, value) {
      var layoutInfo = {
        angle: undefined,
        radius: undefined,
        x: undefined,
        y: undefined
      };
      if (!(0, _type.isDefined)(angle) && !(0, _type.isDefined)(radius) && !(0, _type.isDefined)(argument) && !(0, _type.isDefined)(value)) {
        return layoutInfo;
      }
      var argAxis = this.getArgumentAxis();
      var startAngle = argAxis.getAngles()[0];
      var argAngle;
      var translatedRadius;
      if ((0, _type.isDefined)(argument)) {
        argAngle = argAxis.getTranslator().translate(argument);
      } else if (isFinite(angle)) {
        argAngle = this.getActualAngle(angle);
      } else if (!(0, _type.isDefined)(angle)) {
        argAngle = 0;
      }
      if ((0, _type.isDefined)(value)) {
        translatedRadius = this.getValueAxis().getTranslator().translate(value);
      } else if (isFinite(radius)) {
        translatedRadius = radius;
      } else if (!(0, _type.isDefined)(radius)) {
        translatedRadius = argAxis.getRadius();
      }
      if ((0, _type.isDefined)(argAngle) && (0, _type.isDefined)(translatedRadius)) {
        var coords = (0, _utils.convertPolarToXY)(argAxis.getCenter(), startAngle, argAngle, translatedRadius);
        (0, _extend.extend)(layoutInfo, coords, {
          angle: argAxis.getTranslatedAngle(argAngle),
          radius: translatedRadius
        });
      }
      return layoutInfo;
    },
    _applyPointMarkersAutoHiding: _common.noop,
    _createScrollBar: _common.noop,
    _isRotated: _common.noop,
    _getCrosshairOptions: _common.noop,
    _isLegendInside: _common.noop
  });
  dxPolarChart.addPlugin(_annotations.plugins.core);
  dxPolarChart.addPlugin(_annotations.plugins.polarChart);
  (0, _component_registrator.default)('dxPolarChart', dxPolarChart);
  var _default = dxPolarChart;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/common","../core/component_registrator","../core/utils/extend","./core/utils","./chart_components/advanced_chart","../core/utils/type","./core/annotations"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/common"), require("../core/component_registrator"), require("../core/utils/extend"), require("./core/utils"), require("./chart_components/advanced_chart"), require("../core/utils/type"), require("./core/annotations"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=polar_chart.js.map