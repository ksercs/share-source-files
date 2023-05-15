!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/core/base_theme_manager.js"], ["../../core/class","../../core/utils/extend","../../core/utils/type","../../core/utils/iterator","../palette","./utils","../themes"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/core/base_theme_manager.js", ["../../core/class", "../../core/utils/extend", "../../core/utils/type", "../../core/utils/iterator", "../palette", "./utils", "../themes"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.BaseThemeManager = void 0;
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _extend2 = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _palette = $__require("../palette");
  var _utils = $__require("./utils");
  var _themes = $__require("../themes");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _getTheme = _themes.getTheme;
  var _addCacheItem = _themes.addCacheItem;
  var _removeCacheItem = _themes.removeCacheItem;
  var _extend = _extend2.extend;
  var _each = _iterator.each;
  function getThemePart(theme, path) {
    var _theme = theme;
    path && _each(path.split('.'), function (_, pathItem) {
      return _theme = _theme[pathItem];
    });
    return _theme;
  }
  var BaseThemeManager = _class.default.inherit({
    // TODO: test hack
    ctor: function ctor(options) {
      this._themeSection = options.themeSection;
      this._fontFields = options.fontFields || [];
      _addCacheItem(this);
    },
    dispose: function dispose() {
      var that = this;
      _removeCacheItem(that);
      that._callback = that._theme = that._font = null;
      return that;
    },
    // TODO: Move it to constructor when charts theme managers's constructor is removed
    setCallback: function setCallback(callback) {
      this._callback = callback;
      return this;
    },
    setTheme: function setTheme(theme, rtl) {
      this._current = theme;
      this._rtl = rtl;
      return this.refresh();
    },
    // Officially we do not support objects as "theme" option value - we should stop doing it in code
    refresh: function refresh() {
      var that = this;
      var current = that._current || {};
      var theme = _getTheme(current.name || current);
      that._themeName = theme.name;
      that._defaultPalette = theme.defaultPalette;
      that._font = _extend({}, theme.font, current.font);
      that._themeSection && _each(that._themeSection.split('.'), function (_, path) {
        theme = _extend(true, {}, theme[path]);
      });
      that._theme = _extend(true, {}, theme, (0, _type.isString)(current) ? {} : current);
      that._initializeTheme();
      if ((0, _utils.parseScalar)(that._rtl, that._theme.rtlEnabled)) {
        _extend(true, that._theme, that._theme._rtl);
      }
      that._callback();
      return that;
    },
    theme: function theme(path) {
      return getThemePart(this._theme, path);
    },
    themeName: function themeName() {
      return this._themeName;
    },
    // TODO: May be we need some single method for all palettes?

    createPalette: function createPalette(palette, options) {
      return (0, _palette.createPalette)(palette, options, this._defaultPalette);
    },
    createDiscretePalette: function createDiscretePalette(palette, count) {
      return (0, _palette.getDiscretePalette)(palette, count, this._defaultPalette);
    },
    createGradientPalette: function createGradientPalette(palette) {
      return (0, _palette.getGradientPalette)(palette, this._defaultPalette);
    },
    getAccentColor: function getAccentColor(palette) {
      return (0, _palette.getAccentColor)(palette, this._defaultPalette);
    },
    _initializeTheme: function _initializeTheme() {
      var that = this;
      _each(that._fontFields || [], function (_, path) {
        that._initializeFont(getThemePart(that._theme, path));
      });
    },
    _initializeFont: function _initializeFont(font) {
      _extend(font, this._font, _extend({}, font));
    }
  });
  exports.BaseThemeManager = BaseThemeManager;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/class","../../core/utils/extend","../../core/utils/type","../../core/utils/iterator","../palette","./utils","../themes"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/class"), require("../../core/utils/extend"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../palette"), require("./utils"), require("../themes"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=base_theme_manager.js.map