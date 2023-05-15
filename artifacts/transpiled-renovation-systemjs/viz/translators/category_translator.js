!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/translators/category_translator.js"], ["../../core/utils/type","../../core/utils/math"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/translators/category_translator.js", ["../../core/utils/type", "../../core/utils/math"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _type = $__require("../../core/utils/type");
  var _math = $__require("../../core/utils/math");
  var round = Math.round;
  function getValue(value) {
    return value;
  }
  var _default = {
    translate: function translate(category, directionOffset) {
      var that = this;
      var canvasOptions = that._canvasOptions;
      var categoryIndex = that._categoriesToPoints[category === null || category === void 0 ? void 0 : category.valueOf()];
      var specialValue = that.translateSpecialCase(category);
      var startPointIndex = canvasOptions.startPointIndex || 0;
      var stickInterval = that._options.stick ? 0 : 0.5;
      if ((0, _type.isDefined)(specialValue)) {
        return round(specialValue);
      }

      // Q522516
      if (!categoryIndex && categoryIndex !== 0) {
        return null;
      }
      directionOffset = directionOffset || 0;
      var stickDelta = categoryIndex + stickInterval - startPointIndex + directionOffset * 0.5;
      return round(that._calculateProjection(canvasOptions.interval * stickDelta));
    },
    getInterval: function getInterval() {
      return this._canvasOptions.interval;
    },
    getEventScale: function getEventScale(zoomEvent) {
      var scale = zoomEvent.deltaScale || 1;
      return 1 - (1 - scale) / (0.75 + this.visibleCategories.length / this._categories.length);
    },
    zoom: function zoom(translate, scale) {
      var that = this;
      var categories = that._categories;
      var canvasOptions = that._canvasOptions;
      var stick = that._options.stick;
      var invert = canvasOptions.invert;
      var interval = canvasOptions.interval * scale;
      var translateCategories = translate / interval;
      var visibleCount = (that.visibleCategories || []).length;
      var startCategoryIndex = parseInt((canvasOptions.startPointIndex || 0) + translateCategories + 0.5);
      var categoriesLength = parseInt((0, _math.adjust)(canvasOptions.canvasLength / interval) + (stick ? 1 : 0)) || 1;
      var endCategoryIndex;
      if (invert) {
        startCategoryIndex = parseInt((canvasOptions.startPointIndex || 0) + visibleCount - translateCategories + 0.5) - categoriesLength;
      }
      if (startCategoryIndex < 0) {
        startCategoryIndex = 0;
      }
      endCategoryIndex = startCategoryIndex + categoriesLength;
      if (endCategoryIndex > categories.length) {
        endCategoryIndex = categories.length;
        startCategoryIndex = endCategoryIndex - categoriesLength;
        if (startCategoryIndex < 0) {
          startCategoryIndex = 0;
        }
      }
      var newVisibleCategories = categories.slice(parseInt(startCategoryIndex), parseInt(endCategoryIndex));
      var newInterval = that._getDiscreteInterval(newVisibleCategories.length, canvasOptions);
      scale = newInterval / canvasOptions.interval;
      translate = that.translate(!invert ? newVisibleCategories[0] : newVisibleCategories[newVisibleCategories.length - 1]) * scale - (canvasOptions.startPoint + (stick ? 0 : newInterval / 2));
      return {
        min: newVisibleCategories[0],
        max: newVisibleCategories[newVisibleCategories.length - 1],
        translate: translate,
        scale: scale
      };
    },
    getMinScale: function getMinScale(zoom) {
      var that = this;
      var canvasOptions = that._canvasOptions;
      var categoriesLength = (that.visibleCategories || that._categories).length;
      categoriesLength += (parseInt(categoriesLength * 0.1) || 1) * (zoom ? -2 : 2);
      return canvasOptions.canvasLength / (Math.max(categoriesLength, 1) * canvasOptions.interval);
    },
    getScale: function getScale(min, max) {
      var that = this;
      var canvasOptions = that._canvasOptions;
      var visibleArea = that.getCanvasVisibleArea();
      var stickOffset = !that._options.stick && 1;
      var minPoint = (0, _type.isDefined)(min) ? that.translate(min, -stickOffset) : null;
      var maxPoint = (0, _type.isDefined)(max) ? that.translate(max, +stickOffset) : null;
      if (minPoint === null) {
        minPoint = canvasOptions.invert ? visibleArea.max : visibleArea.min;
      }
      if (maxPoint === null) {
        maxPoint = canvasOptions.invert ? visibleArea.min : visibleArea.max;
      }
      return that.canvasLength / Math.abs(maxPoint - minPoint);
    },
    // dxRangeSelector

    isValid: function isValid(value) {
      return (0, _type.isDefined)(value) ? this._categoriesToPoints[value.valueOf()] >= 0 : false;
    },
    getCorrectValue: getValue,
    to: function to(value, direction) {
      var canvasOptions = this._canvasOptions;
      var categoryIndex = this._categoriesToPoints[value === null || value === void 0 ? void 0 : value.valueOf()];
      var startPointIndex = canvasOptions.startPointIndex || 0;
      var stickDelta = categoryIndex + (this._options.stick ? 0 : 0.5) - startPointIndex + (this._businessRange.invert ? -1 : +1) * direction * 0.5;
      return round(this._calculateProjection(canvasOptions.interval * stickDelta));
    },
    from: function from(position) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var canvasOptions = this._canvasOptions;
      var startPoint = canvasOptions.startPoint;
      var categories = this.visibleCategories || this._categories;
      var categoriesLength = categories.length;
      var stickInterval = this._options.stick ? 0.5 : 0;
      // It is strange - while "businessRange.invert" check is required in "to" here it is not.
      // Check that translator.from(translator.to(x, -1), -1) equals x.
      // And check that translator.untranslate(translator.translate(x, -1), -1) does not equal x - is it really supposed to be so?
      var result = round((position - startPoint) / canvasOptions.interval + stickInterval - 0.5 - /* (businessRange.invert ? -1 : +1) * */direction * 0.5);
      if (result >= categoriesLength) {
        result = categoriesLength - 1;
      }
      if (result < 0) {
        result = 0;
      }
      if (canvasOptions.invert) {
        result = categoriesLength - result - 1;
      }
      return categories[result];
    },
    _add: function _add() {
      return NaN;
    },
    toValue: getValue,
    isValueProlonged: true,
    getRangeByMinZoomValue: function getRangeByMinZoomValue(minZoom, visualRange) {
      var categories = this._categories;
      var minVisibleIndex = categories.indexOf(visualRange.minVisible);
      var maxVisibleIndex = categories.indexOf(visualRange.maxVisible);
      var startIndex = minVisibleIndex + minZoom - 1;
      var endIndex = maxVisibleIndex - minZoom + 1;
      if (categories[startIndex]) {
        return [visualRange.minVisible, categories[startIndex]];
      } else {
        return [categories[endIndex], visualRange.maxVisible];
      }
    }
  };
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../../core/utils/math"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../../core/utils/math"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=category_translator.js.map