!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/sparklines/bullet.js"], ["../../core/utils/iterator","./base_sparkline","../../core/component_registrator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/sparklines/bullet.js", ["../../core/utils/iterator", "./base_sparkline", "../../core/component_registrator"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _iterator = $__require("../../core/utils/iterator");
  var _base_sparkline = _interopRequireDefault($__require("./base_sparkline"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var TARGET_MIN_Y = 0.02;
  var TARGET_MAX_Y = 0.98;
  var BAR_VALUE_MIN_Y = 0.1;
  var BAR_VALUE_MAX_Y = 0.9;
  var DEFAULT_CANVAS_WIDTH = 300;
  var DEFAULT_CANVAS_HEIGHT = 30;
  var DEFAULT_HORIZONTAL_MARGIN = 1;
  var DEFAULT_VERTICAL_MARGIN = 2;
  var _Number = Number;
  var _isFinite = isFinite;
  var dxBullet = _base_sparkline.default.inherit({
    _rootClassPrefix: 'dxb',
    _rootClass: 'dxb-bullet',
    _themeSection: 'bullet',
    _defaultSize: {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
      left: DEFAULT_HORIZONTAL_MARGIN,
      right: DEFAULT_HORIZONTAL_MARGIN,
      top: DEFAULT_VERTICAL_MARGIN,
      bottom: DEFAULT_VERTICAL_MARGIN
    },
    _disposeWidgetElements: function _disposeWidgetElements() {
      delete this._zeroLevelPath;
      delete this._targetPath;
      delete this._barValuePath;
    },
    _cleanWidgetElements: function _cleanWidgetElements() {
      this._zeroLevelPath.remove();
      this._targetPath.remove();
      this._barValuePath.remove();
    },
    _drawWidgetElements: function _drawWidgetElements() {
      this._drawBullet();
      this._drawn();
    },
    _createHtmlElements: function _createHtmlElements() {
      var renderer = this._renderer;
      this._zeroLevelPath = renderer.path(undefined, 'line').attr({
        'class': 'dxb-zero-level',
        'stroke-linecap': 'square'
      });
      this._targetPath = renderer.path(undefined, 'line').attr({
        'class': 'dxb-target',
        'stroke-linecap': 'square'
      });
      this._barValuePath = renderer.path(undefined, 'line').attr({
        'class': 'dxb-bar-value',
        'stroke-linecap': 'square'
      });
    },
    _prepareOptions: function _prepareOptions() {
      var that = this;
      var options;
      var startScaleValue;
      var endScaleValue;
      var level;
      var value;
      var target;
      that._allOptions = options = that.callBase();
      var isValueUndefined = that._allOptions.value === undefined;
      var isTargetUndefined = that._allOptions.target === undefined;
      that._tooltipEnabled = !(isValueUndefined && isTargetUndefined);
      if (isValueUndefined) {
        that._allOptions.value = 0;
      }
      if (isTargetUndefined) {
        that._allOptions.target = 0;
      }
      options.value = value = _Number(options.value);
      options.target = target = _Number(options.target);
      if (that._allOptions.startScaleValue === undefined) {
        that._allOptions.startScaleValue = target < value ? target : value;
        that._allOptions.startScaleValue = that._allOptions.startScaleValue < 0 ? that._allOptions.startScaleValue : 0;
      }
      if (that._allOptions.endScaleValue === undefined) {
        that._allOptions.endScaleValue = target > value ? target : value;
      }
      options.startScaleValue = startScaleValue = _Number(options.startScaleValue);
      options.endScaleValue = endScaleValue = _Number(options.endScaleValue);
      if (endScaleValue < startScaleValue) {
        level = endScaleValue;
        that._allOptions.endScaleValue = startScaleValue;
        that._allOptions.startScaleValue = level;
        that._allOptions.inverted = true;
      }
    },
    _updateRange: function _updateRange() {
      var that = this;
      var options = that._allOptions;
      that._ranges = {
        arg: {
          invert: options.rtlEnabled ? !options.inverted : options.inverted,
          min: options.startScaleValue,
          max: options.endScaleValue,
          axisType: 'continuous',
          dataType: 'numeric'
        },
        val: {
          min: 0,
          max: 1,
          axisType: 'continuous',
          dataType: 'numeric'
        }
      };
    },
    _drawBullet: function _drawBullet() {
      var that = this;
      var options = that._allOptions;
      var isValidBounds = options.startScaleValue !== options.endScaleValue;
      var isValidMin = _isFinite(options.startScaleValue);
      var isValidMax = _isFinite(options.endScaleValue);
      var isValidValue = _isFinite(options.value);
      var isValidTarget = _isFinite(options.target);
      if (isValidBounds && isValidMax && isValidMin && isValidTarget && isValidValue) {
        this._drawBarValue();
        this._drawTarget();
        this._drawZeroLevel();
      }
    },
    _getTargetParams: function _getTargetParams() {
      var that = this;
      var options = that._allOptions;
      var translatorY = that._valueAxis.getTranslator();
      var x = that._argumentAxis.getTranslator().translate(options.target);
      return {
        points: [x, translatorY.translate(TARGET_MIN_Y), x, translatorY.translate(TARGET_MAX_Y)],
        stroke: options.targetColor,
        'stroke-width': options.targetWidth
      };
    },
    _getBarValueParams: function _getBarValueParams() {
      var that = this;
      var options = that._allOptions;
      var translatorX = that._argumentAxis.getTranslator();
      var translatorY = that._valueAxis.getTranslator();
      var startLevel = options.startScaleValue;
      var endLevel = options.endScaleValue;
      var value = options.value;
      var y2 = translatorY.translate(BAR_VALUE_MIN_Y);
      var y1 = translatorY.translate(BAR_VALUE_MAX_Y);
      var x1;
      var x2;
      if (value > 0) {
        x1 = startLevel <= 0 ? 0 : startLevel;
        x2 = value >= endLevel ? endLevel : value < x1 ? x1 : value;
      } else {
        x1 = endLevel >= 0 ? 0 : endLevel;
        x2 = value < startLevel ? startLevel : value > x1 ? x1 : value;
      }
      x1 = translatorX.translate(x1);
      x2 = translatorX.translate(x2);
      return {
        points: [x1, y1, x2, y1, x2, y2, x1, y2],
        fill: options.color
      };
    },
    _getCorrectCanvas: function _getCorrectCanvas() {
      return this._canvas;
    },
    _getZeroLevelParams: function _getZeroLevelParams() {
      var that = this;
      var translatorY = that._valueAxis.getTranslator();
      var x = that._argumentAxis.getTranslator().translate(0);
      return {
        points: [x, translatorY.translate(TARGET_MIN_Y), x, translatorY.translate(TARGET_MAX_Y)],
        stroke: that._allOptions.targetColor,
        'stroke-width': 1
      };
    },
    _drawZeroLevel: function _drawZeroLevel() {
      var that = this;
      var options = that._allOptions;
      if (0 > options.endScaleValue || 0 < options.startScaleValue || !options.showZeroLevel) {
        return;
      }
      that._zeroLevelPath.attr(that._getZeroLevelParams()).sharp().append(that._renderer.root);
    },
    _drawTarget: function _drawTarget() {
      var that = this;
      var options = that._allOptions;
      var target = options.target;
      if (target > options.endScaleValue || target < options.startScaleValue || !options.showTarget) {
        return;
      }
      that._targetPath.attr(that._getTargetParams()).sharp().append(that._renderer.root);
    },
    _drawBarValue: function _drawBarValue() {
      this._barValuePath.attr(this._getBarValueParams()).append(this._renderer.root);
    },
    _getTooltipCoords: function _getTooltipCoords() {
      var canvas = this._canvas;
      var rootOffset = this._renderer.getRootOffset();
      var bBox = this._barValuePath.getBBox();
      return {
        x: bBox.x + bBox.width / 2 + rootOffset.left,
        y: canvas.height / 2 + rootOffset.top
      };
    },
    _getTooltipData: function _getTooltipData() {
      var that = this;
      var tooltip = that._tooltip;
      var options = that._allOptions;
      var value = options.value;
      var target = options.target;
      var valueText = tooltip.formatValue(value);
      var targetText = tooltip.formatValue(target);
      return {
        originalValue: value,
        originalTarget: target,
        value: valueText,
        target: targetText,
        valueText: ['Actual Value:', valueText, 'Target Value:', targetText]
      };
    },
    _isTooltipEnabled: function _isTooltipEnabled() {
      return this._tooltipEnabled;
    }
  });
  (0, _iterator.each)(['color', 'targetColor', 'targetWidth', 'showTarget', 'showZeroLevel', 'value', 'target', 'startScaleValue', 'endScaleValue'], function (_, name) {
    dxBullet.prototype._optionChangesMap[name] = 'OPTIONS';
  });
  (0, _component_registrator.default)('dxBullet', dxBullet);
  var _default = dxBullet;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/iterator","./base_sparkline","../../core/component_registrator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/iterator"), require("./base_sparkline"), require("../../core/component_registrator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=bullet.js.map