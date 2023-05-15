!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/load_indicator.js"], ["../core/utils/size","../core/renderer","../core/utils/window","../core/utils/support","./themes","../core/utils/extend","../core/devices","../core/component_registrator","./widget/ui.widget"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/load_indicator.js", ["../core/utils/size", "../core/renderer", "../core/utils/window", "../core/utils/support", "./themes", "../core/utils/extend", "../core/devices", "../core/component_registrator", "./widget/ui.widget"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _window = $__require("../core/utils/window");
  var _support = $__require("../core/utils/support");
  var _themes = $__require("./themes");
  var _extend = $__require("../core/utils/extend");
  var _devices = _interopRequireDefault($__require("../core/devices"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _ui = _interopRequireDefault($__require("./widget/ui.widget"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var navigator = (0, _window.getNavigator)();
  // STYLE loadIndicator

  var LOADINDICATOR_CLASS = 'dx-loadindicator';
  var LOADINDICATOR_WRAPPER_CLASS = 'dx-loadindicator-wrapper';
  var LOADINDICATOR_CONTENT_CLASS = 'dx-loadindicator-content';
  var LOADINDICATOR_ICON_CLASS = 'dx-loadindicator-icon';
  var LOADINDICATOR_SEGMENT_CLASS = 'dx-loadindicator-segment';
  var LOADINDICATOR_SEGMENT_INNER_CLASS = 'dx-loadindicator-segment-inner';
  var LOADINDICATOR_IMAGE_CLASS = 'dx-loadindicator-image';
  var LoadIndicator = _ui.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        indicatorSrc: '',
        /**
        * @name dxLoadIndicatorOptions.disabled
        * @hidden
        */

        /**
        * @name dxLoadIndicatorOptions.activeStateEnabled
        * @hidden
        */
        activeStateEnabled: false,
        /**
         * @name dxLoadIndicatorOptions.hoverStateEnabled
         * @default false
         * @hidden
        */
        hoverStateEnabled: false,
        /**
        * @name dxLoadIndicatorOptions.focusStateEnabled
        * @hidden
        */

        /**
        * @name dxLoadIndicatorOptions.accessKey
        * @hidden
        */

        /**
        * @name dxLoadIndicatorOptions.tabIndex
        * @hidden
        */

        _animatingSegmentCount: 1,
        _animatingSegmentInner: false
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      var themeName = (0, _themes.current)();
      return this.callBase().concat([{
        device: function device() {
          var realDevice = _devices.default.real();
          var obsoleteAndroid = realDevice.platform === 'android' && !/chrome/i.test(navigator.userAgent);
          return obsoleteAndroid;
        },
        options: {
          viaImage: true
        }
      }, {
        device: function device() {
          return (0, _themes.isMaterial)(themeName);
        },
        options: {
          _animatingSegmentCount: 2,
          _animatingSegmentInner: true
        }
      }, {
        device: function device() {
          return (0, _themes.isGeneric)(themeName);
        },
        options: {
          _animatingSegmentCount: 7
        }
      }]);
    },
    _useTemplates: function _useTemplates() {
      return false;
    },
    _init: function _init() {
      this.callBase();
      this.$element().addClass(LOADINDICATOR_CLASS);
    },
    _initMarkup: function _initMarkup() {
      this.callBase();
      this._renderWrapper();
      this._renderIndicatorContent();
      this._renderMarkup();
    },
    _renderWrapper: function _renderWrapper() {
      this._$wrapper = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_WRAPPER_CLASS);
      this.$element().append(this._$wrapper);
    },
    _renderIndicatorContent: function _renderIndicatorContent() {
      this._$content = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_CONTENT_CLASS);
      this._$wrapper.append(this._$content);
    },
    _renderMarkup: function _renderMarkup() {
      if ((0, _support.animation)() && !this.option('viaImage') && !this.option('indicatorSrc')) {
        // B236922
        this._renderMarkupForAnimation();
      } else {
        this._renderMarkupForImage();
      }
    },
    _renderMarkupForAnimation: function _renderMarkupForAnimation() {
      var animatingSegmentInner = this.option('_animatingSegmentInner');
      this._$indicator = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_ICON_CLASS);
      this._$content.append(this._$indicator);

      // Indicator markup
      for (var i = this.option('_animatingSegmentCount'); i >= 0; --i) {
        var $segment = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_SEGMENT_CLASS).addClass(LOADINDICATOR_SEGMENT_CLASS + i);
        if (animatingSegmentInner) {
          $segment.append((0, _renderer.default)('<div>').addClass(LOADINDICATOR_SEGMENT_INNER_CLASS));
        }
        this._$indicator.append($segment);
      }
    },
    _renderMarkupForImage: function _renderMarkupForImage() {
      var indicatorSrc = this.option('indicatorSrc');
      this._$wrapper.addClass(LOADINDICATOR_IMAGE_CLASS);
      if (indicatorSrc) {
        this._$wrapper.css('backgroundImage', 'url(' + indicatorSrc + ')');
      }
    },
    _renderDimensions: function _renderDimensions() {
      this.callBase();
      this._updateContentSizeForAnimation();
    },
    _updateContentSizeForAnimation: function _updateContentSizeForAnimation() {
      if (!this._$indicator) {
        return;
      }
      var width = this.option('width');
      var height = this.option('height');
      if (width || height) {
        width = (0, _size.getWidth)(this.$element());
        height = (0, _size.getHeight)(this.$element());
        var minDimension = Math.min(height, width);
        this._$wrapper.css({
          height: minDimension,
          width: minDimension,
          fontSize: minDimension
        });
      }
    },
    _clean: function _clean() {
      this.callBase();
      this._removeMarkupForAnimation();
      this._removeMarkupForImage();
    },
    _removeMarkupForAnimation: function _removeMarkupForAnimation() {
      if (!this._$indicator) {
        return;
      }
      this._$indicator.remove();
      delete this._$indicator;
    },
    _removeMarkupForImage: function _removeMarkupForImage() {
      this._$wrapper.css('backgroundImage', 'none');
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case '_animatingSegmentCount':
        case '_animatingSegmentInner':
        case 'indicatorSrc':
          this._invalidate();
          break;
        default:
          this.callBase(args);
      }
    }

    /**
    * @name dxLoadIndicator.registerKeyHandler
    * @publicName registerKeyHandler(key, handler)
    * @hidden
    */

    /**
    * @name dxLoadIndicator.focus
    * @publicName focus()
    * @hidden
    */
  });

  (0, _component_registrator.default)('dxLoadIndicator', LoadIndicator);
  var _default = LoadIndicator;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../core/utils/window","../core/utils/support","./themes","../core/utils/extend","../core/devices","../core/component_registrator","./widget/ui.widget"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../core/utils/window"), require("../core/utils/support"), require("./themes"), require("../core/utils/extend"), require("../core/devices"), require("../core/component_registrator"), require("./widget/ui.widget"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=load_indicator.js.map