!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/gauges/linear_gauge.js"], ["../../core/utils/iterator","../../core/component_registrator","../../core/utils/extend","../../core/utils/object","./base_gauge","./common","../core/utils","./linear_indicators","./linear_range_container"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/gauges/linear_gauge.js", ["../../core/utils/iterator", "../../core/component_registrator", "../../core/utils/extend", "../../core/utils/object", "./base_gauge", "./common", "../core/utils", "./linear_indicators", "./linear_range_container"], true, function ($__require, exports, module) {
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
  exports.default = void 0;
  var _iterator = $__require("../../core/utils/iterator");
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _extend = $__require("../../core/utils/extend");
  var _object = $__require("../../core/utils/object");
  var _base_gauge = $__require("./base_gauge");
  var _common = $__require("./common");
  var _utils = $__require("../core/utils");
  var linearIndicators = _interopRequireWildcard($__require("./linear_indicators"));
  var _linear_range_container = _interopRequireDefault($__require("./linear_range_container"));
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
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _max = Math.max;
  var _min = Math.min;
  var _round = Math.round;
  var dxLinearGauge = _common.dxGauge.inherit({
    _rootClass: 'dxg-linear-gauge',
    _factoryMethods: {
      rangeContainer: 'createLinearRangeContainer',
      indicator: 'createLinearIndicator'
    },
    _gridSpacingFactor: 25,
    _scaleTypes: {
      type: 'xyAxes',
      drawingType: 'linear'
    },
    _getTicksOrientation: function _getTicksOrientation(scaleOptions) {
      return scaleOptions.isHorizontal ? scaleOptions.verticalOrientation : scaleOptions.horizontalOrientation;
    },
    _getThemeManagerOptions: function _getThemeManagerOptions() {
      var options = this.callBase.apply(this, arguments);
      options.subTheme = '_linear';
      return options;
    },
    _getInvertedState: function _getInvertedState() {
      return !this._area.vertical && this.option('rtlEnabled');
    },
    _prepareScaleSettings: function _prepareScaleSettings() {
      var scaleOptions = this.callBase();
      scaleOptions.inverted = this._getInvertedState();
      return scaleOptions;
    },
    _updateScaleTickIndent: function _updateScaleTickIndent(scaleOptions) {
      var indentFromTick = scaleOptions.label.indentFromTick;
      var length = scaleOptions.tick.length;
      var textParams = this._scale.measureLabels((0, _extend.extend)({}, this._canvas));
      var verticalTextCorrection = scaleOptions.isHorizontal ? textParams.height + textParams.y : 0;
      var isIndentPositive = indentFromTick > 0;
      var orientation;
      var textCorrection;
      var tickCorrection;
      if (scaleOptions.isHorizontal) {
        orientation = isIndentPositive ? {
          center: 0.5,
          top: 0,
          bottom: 1
        } : {
          center: 0.5,
          top: 1,
          bottom: 0
        };
        tickCorrection = length * orientation[scaleOptions.verticalOrientation];
        textCorrection = textParams.y;
      } else {
        orientation = isIndentPositive ? {
          center: 0.5,
          left: 0,
          right: 1
        } : {
          center: 0.5,
          left: 1,
          right: 0
        };
        tickCorrection = length * orientation[scaleOptions.horizontalOrientation];
        textCorrection = -textParams.width;
      }
      scaleOptions.label.indentFromAxis = -indentFromTick + (isIndentPositive ? -tickCorrection + textCorrection : tickCorrection - verticalTextCorrection);
      this._scale.updateOptions(scaleOptions);
    },
    _shiftScale: function _shiftScale(layout, scaleOptions) {
      var that = this;
      var canvas = (0, _extend.extend)({}, that._canvas);
      var isHorizontal = scaleOptions.isHorizontal;
      var scale = that._scale;
      canvas[isHorizontal ? 'left' : 'top'] = that._area[isHorizontal ? 'startCoord' : 'endCoord'];
      canvas[isHorizontal ? 'right' : 'bottom'] = canvas[isHorizontal ? 'width' : 'height'] - that._area[isHorizontal ? 'endCoord' : 'startCoord'];
      scale.draw(canvas);
      scale.shift({
        left: -layout.x,
        top: -layout.y
      });
    },
    _setupCodomain: function _setupCodomain() {
      var that = this;
      var geometry = that.option('geometry') || {};
      var vertical = (0, _utils.normalizeEnum)(geometry.orientation) === 'vertical';
      var initialStartCoord = -100;
      var initialEndCoord = 100;
      that._area = {
        vertical: vertical,
        x: 0,
        y: 0,
        startCoord: initialStartCoord,
        endCoord: initialEndCoord
      };
      that._rangeContainer.vertical = vertical;
      that._translator.setInverted(that._getInvertedState());
      that._translator.setCodomain(initialStartCoord, initialEndCoord);
    },
    _getScaleLayoutValue: function _getScaleLayoutValue() {
      return this._area[this._area.vertical ? 'x' : 'y'];
    },
    _getTicksCoefficients: function _getTicksCoefficients(options) {
      var coefs = {
        inner: 0,
        outer: 1
      };
      if (this._area.vertical) {
        if (options.horizontalOrientation === 'left') {
          coefs.inner = 1;
          coefs.outer = 0;
        } else if (options.horizontalOrientation === 'center') {
          coefs.inner = coefs.outer = 0.5;
        }
      } else {
        if (options.verticalOrientation === 'top') {
          coefs.inner = 1;
          coefs.outer = 0;
        } else if (options.verticalOrientation === 'center') {
          coefs.inner = coefs.outer = 0.5;
        }
      }
      return coefs;
    },
    _correctScaleIndents: function _correctScaleIndents(result, indentFromTick, textParams) {
      var vertical = this._area.vertical;
      if (indentFromTick >= 0) {
        result.max += indentFromTick + textParams[vertical ? 'width' : 'height'];
      } else {
        result.min -= -indentFromTick + textParams[vertical ? 'width' : 'height'];
      }
      result.indent = textParams[vertical ? 'height' : 'width'] / 2;
    },
    _measureMainElements: function _measureMainElements(elements, scaleMeasurement) {
      var that = this;
      var x = that._area.x;
      var y = that._area.y;
      var minBound = 1000;
      var maxBound = 0;
      var indent = 0;
      var scale = that._scale;
      (0, _iterator.each)(elements.concat(scale), function (_, element) {
        var bounds = element.measure ? element.measure({
          x: x + element.getOffset(),
          y: y + element.getOffset()
        }) : scaleMeasurement;
        bounds.max !== undefined && (maxBound = _max(maxBound, bounds.max));
        bounds.min !== undefined && (minBound = _min(minBound, bounds.min));
        bounds.indent > 0 && (indent = _max(indent, bounds.indent));
      });
      return {
        minBound: minBound,
        maxBound: maxBound,
        indent: indent
      };
    },
    _applyMainLayout: function _applyMainLayout(elements, scaleMeasurement) {
      var that = this;
      var measurements = that._measureMainElements(elements, scaleMeasurement);
      var area = that._area;
      var rect;
      var offset;
      if (area.vertical) {
        rect = selectRectBySizes(that._innerRect, {
          width: measurements.maxBound - measurements.minBound
        });
        offset = (rect.left + rect.right) / 2 - (measurements.minBound + measurements.maxBound) / 2;
        area.startCoord = rect.bottom - measurements.indent;
        area.endCoord = rect.top + measurements.indent;
        area.x = _round(area.x + offset);
      } else {
        rect = selectRectBySizes(that._innerRect, {
          height: measurements.maxBound - measurements.minBound
        });
        offset = (rect.top + rect.bottom) / 2 - (measurements.minBound + measurements.maxBound) / 2;
        area.startCoord = rect.left + measurements.indent;
        area.endCoord = rect.right - measurements.indent;
        area.y = _round(area.y + offset);
      }
      that._translator.setCodomain(area.startCoord, area.endCoord);
      that._innerRect = rect;
    },
    _getElementLayout: function _getElementLayout(offset) {
      return {
        x: _round(this._area.x + offset),
        y: _round(this._area.y + offset)
      };
    },
    _getApproximateScreenRange: function _getApproximateScreenRange() {
      var that = this;
      var area = that._area;
      var s = area.vertical ? that._canvas.height : that._canvas.width;
      s > area.totalSize && (s = area.totalSize);
      s = s * 0.8;
      return s;
    },
    _getDefaultSize: function _getDefaultSize() {
      var geometry = this.option('geometry') || {};
      if (geometry.orientation === 'vertical') {
        return {
          width: 100,
          height: 300
        };
      } else {
        return {
          width: 300,
          height: 100
        };
      }
    },
    _factory: (0, _object.clone)(_base_gauge.BaseGauge.prototype._factory)
  });
  function selectRectBySizes(srcRect, sizes, margins) {
    var rect = (0, _extend.extend)({}, srcRect);
    var step;
    margins = margins || {};
    if (sizes) {
      rect.left += margins.left || 0;
      rect.right -= margins.right || 0;
      rect.top += margins.top || 0;
      rect.bottom -= margins.bottom || 0;
      if (sizes.width > 0) {
        step = (rect.right - rect.left - sizes.width) / 2;
        if (step > 0) {
          rect.left += step;
          rect.right -= step;
        }
      }
      if (sizes.height > 0) {
        step = (rect.bottom - rect.top - sizes.height) / 2;
        if (step > 0) {
          rect.top += step;
          rect.bottom -= step;
        }
      }
    }
    return rect;
  }

  ///#DEBUG
  dxLinearGauge._TESTS_selectRectBySizes = selectRectBySizes;
  ///#ENDDEBUG

  var indicators = dxLinearGauge.prototype._factory.indicators = {};
  dxLinearGauge.prototype._factory.createIndicator = (0, _common.createIndicatorCreator)(indicators);

  /* eslint-disable import/namespace */
  indicators._default = linearIndicators._default;
  indicators['rectangle'] = linearIndicators['rectangle'];
  indicators['rhombus'] = linearIndicators['rhombus'];
  indicators['circle'] = linearIndicators['circle'];
  indicators['trianglemarker'] = linearIndicators['trianglemarker'];
  indicators['textcloud'] = linearIndicators['textcloud'];
  indicators['rangebar'] = linearIndicators['rangebar'];
  /* eslint-enable import/namespace */

  dxLinearGauge.prototype._factory.RangeContainer = _linear_range_container.default;
  (0, _component_registrator.default)('dxLinearGauge', dxLinearGauge);
  var _default = dxLinearGauge;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/iterator","../../core/component_registrator","../../core/utils/extend","../../core/utils/object","./base_gauge","./common","../core/utils","./linear_indicators","./linear_range_container"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/iterator"), require("../../core/component_registrator"), require("../../core/utils/extend"), require("../../core/utils/object"), require("./base_gauge"), require("./common"), require("../core/utils"), require("./linear_indicators"), require("./linear_range_container"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=linear_gauge.js.map