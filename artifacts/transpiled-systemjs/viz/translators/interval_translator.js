!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/translators/interval_translator.js"], ["../../core/utils/type","../../core/utils/date","../../core/utils/math"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/translators/interval_translator.js", ["../../core/utils/type", "../../core/utils/date", "../../core/utils/math"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _type = $__require("../../core/utils/type");
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _math = $__require("../../core/utils/math");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var floor = Math.floor;
  var _default = {
    _intervalize: function _intervalize(value, interval) {
      if (!(0, _type.isDefined)(value)) {
        return undefined;
      }
      if (this._businessRange.dataType === 'datetime') {
        if ((0, _type.isNumeric)(value)) {
          value = new Date(value);
        } else {
          value = new Date(value.getTime());
        }
        value = _date.default.correctDateWithUnitBeginning(value, interval, null, this._options.firstDayOfWeek);
      } else {
        value = (0, _math.adjust)(floor((0, _math.adjust)(value / interval)) * interval, interval);
      }
      return value;
    },
    translate: function translate(bp, direction, interval) {
      var that = this;
      var specialValue = that.translateSpecialCase(bp);
      if ((0, _type.isDefined)(specialValue)) {
        return Math.round(specialValue);
      }
      interval = interval || that._options.interval;

      // TODO B253861
      if (!that.isValid(bp, interval)) {
        return null;
      }
      return that.to(bp, direction, interval);
    },
    getInterval: function getInterval() {
      return Math.round(this._canvasOptions.ratioOfCanvasRange * (this._businessRange.interval || Math.abs(this._canvasOptions.rangeMax - this._canvasOptions.rangeMin)));
    },
    zoom: function zoom() {},
    getMinScale: function getMinScale() {},
    getScale: function getScale() {},
    _parse: function _parse(value) {
      return this._businessRange.dataType === 'datetime' ? new Date(value) : Number(value);
    },
    fromValue: function fromValue(value) {
      return this._parse(value);
    },
    toValue: function toValue(value) {
      return this._parse(value);
    },
    isValid: function isValid(value, interval) {
      var that = this;
      var co = that._canvasOptions;
      var rangeMin = co.rangeMin;
      var rangeMax = co.rangeMax;
      interval = interval || that._options.interval;
      if (value === null || isNaN(value)) {
        return false;
      }
      value = that._businessRange.dataType === 'datetime' && (0, _type.isNumeric)(value) ? new Date(value) : value;
      if (interval !== that._options.interval) {
        rangeMin = that._intervalize(rangeMin, interval);
        rangeMax = that._intervalize(rangeMax, interval);
      }
      if (value.valueOf() < rangeMin || value.valueOf() >= _date.default.addInterval(rangeMax, interval)) {
        return false;
      }
      return true;
    },
    to: function to(bp, direction, interval) {
      var that = this;
      interval = interval || that._options.interval;
      var v1 = that._intervalize(bp, interval);
      var v2 = _date.default.addInterval(v1, interval);
      var res = that._to(v1);
      var p2 = that._to(v2);
      if (!direction) {
        res = floor((res + p2) / 2);
      } else if (direction > 0) {
        res = p2;
      }
      return res;
    },
    _to: function _to(value) {
      var co = this._canvasOptions;
      var rMin = co.rangeMinVisible;
      var rMax = co.rangeMaxVisible;
      var offset = value - rMin;
      if (value < rMin) {
        offset = 0;
      } else if (value > rMax) {
        offset = _date.default.addInterval(rMax, this._options.interval) - rMin;
      }
      return this._conversionValue(this._calculateProjection(offset * this._canvasOptions.ratioOfCanvasRange));
    },
    from: function from(position, direction) {
      var that = this;
      var origInterval = that._options.interval;
      var interval = origInterval;
      var co = that._canvasOptions;
      var rMin = co.rangeMinVisible;
      var rMax = co.rangeMaxVisible;
      var value;
      if (that._businessRange.dataType === 'datetime') {
        interval = _date.default.dateToMilliseconds(origInterval);
      }
      value = that._calculateUnProjection((position - that._canvasOptions.startPoint) / that._canvasOptions.ratioOfCanvasRange);
      value = that._intervalize(_date.default.addInterval(value, interval / 2, direction > 0), origInterval);
      if (value < rMin) {
        value = rMin;
      } else if (value > rMax) {
        value = rMax;
      }
      return value;
    },
    _add: function _add() {
      return NaN;
    },
    isValueProlonged: true
  };
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../../core/utils/date","../../core/utils/math"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../../core/utils/date"), require("../../core/utils/math"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=interval_translator.js.map