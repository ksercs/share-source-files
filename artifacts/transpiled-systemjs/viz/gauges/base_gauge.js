!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/gauges/base_gauge.js"], ["../core/utils","../../core/utils/extend","../translators/translator1d","../core/base_widget","./theme_manager","./tracker","../../format_helper","../core/export","../core/title","../core/tooltip","../core/loading_indicator","../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/gauges/base_gauge.js", ["../core/utils", "../../core/utils/extend", "../translators/translator1d", "../core/base_widget", "./theme_manager", "./tracker", "../../format_helper", "../core/export", "../core/title", "../core/tooltip", "../core/loading_indicator", "../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.BaseGauge = void 0;
  exports.compareArrays = compareArrays;
  exports.getSampleText = exports.formatValue = void 0;
  var _utils = $__require("../core/utils");
  var _extend2 = $__require("../../core/utils/extend");
  var _translator1d = $__require("../translators/translator1d");
  var _base_widget = _interopRequireDefault($__require("../core/base_widget"));
  var _theme_manager = _interopRequireDefault($__require("./theme_manager"));
  var _tracker = _interopRequireDefault($__require("./tracker"));
  var _format_helper = _interopRequireDefault($__require("../../format_helper"));
  var _export = $__require("../core/export");
  var _title = $__require("../core/title");
  var _tooltip = $__require("../core/tooltip");
  var _loading_indicator = $__require("../core/loading_indicator");
  var _common = $__require("../../core/utils/common");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _Number = Number;
  var _extend = _extend2.extend;
  var _format = _format_helper.default.format;
  var BaseGauge = _base_widget.default.inherit({
    _rootClassPrefix: 'dxg',
    _themeSection: 'gauge',
    _createThemeManager: function _createThemeManager() {
      return new _theme_manager.default.ThemeManager(this._getThemeManagerOptions());
    },
    _initCore: function _initCore() {
      var that = this;
      var root = that._renderer.root;
      that._valueChangingLocker = 0;
      that._translator = that._factory.createTranslator();
      that._tracker = that._factory.createTracker({
        renderer: that._renderer,
        container: root
      });
      that._setTrackerCallbacks();
    },
    _beginValueChanging: function _beginValueChanging() {
      this._resetIsReady();
      this._onBeginUpdate();
      ++this._valueChangingLocker;
    },
    _endValueChanging: function _endValueChanging() {
      if (--this._valueChangingLocker === 0) {
        this._drawn();
      }
    },
    _setTrackerCallbacks: function _setTrackerCallbacks() {
      var that = this;
      var renderer = that._renderer;
      var tooltip = that._tooltip;
      that._tracker.setCallbacks({
        'tooltip-show': function tooltipShow(target, info, callback) {
          var tooltipParameters = target.getTooltipParameters();
          var offset = renderer.getRootOffset();
          var formatObject = _extend({
            value: tooltipParameters.value,
            valueText: tooltip.formatValue(tooltipParameters.value),
            color: tooltipParameters.color
          }, info);
          return tooltip.show(formatObject, {
            x: tooltipParameters.x + offset.left,
            y: tooltipParameters.y + offset.top,
            offset: tooltipParameters.offset
          }, {
            target: info
          }, undefined, callback);
        },
        'tooltip-hide': function tooltipHide() {
          return tooltip.hide();
        }
      });
    },
    _dispose: function _dispose() {
      this._cleanCore();
      this.callBase.apply(this, arguments);
    },
    _disposeCore: function _disposeCore() {
      var that = this;
      that._themeManager.dispose();
      that._tracker.dispose();
      that._translator = that._tracker = null;
    },
    _cleanCore: function _cleanCore() {
      var that = this;
      that._tracker.deactivate();
      that._cleanContent();
    },
    _renderCore: function _renderCore() {
      var that = this;
      if (!that._isValidDomain) return;
      that._renderContent();
      that._renderGraphicObjects();
      that._tracker.setTooltipState(that._tooltip.isEnabled());
      that._tracker.activate();
      that._noAnimation = false;
      ///#DEBUG
      that._debug_rendered && that._debug_rendered();
      ///#ENDDEBUG
    },

    _applyChanges: function _applyChanges() {
      this.callBase.apply(this, arguments);
      this._resizing = this._noAnimation = false;
    },
    _setContentSize: function _setContentSize() {
      var that = this;
      that._resizing = that._noAnimation = that._changes.count() === 2;
      that.callBase.apply(that, arguments);
    },
    _applySize: function _applySize(rect) {
      var that = this;
      ///#DEBUG
      that._DEBUG_rootRect = rect;
      ///#ENDDEBUG
      that._innerRect = {
        left: rect[0],
        top: rect[1],
        right: rect[2],
        bottom: rect[3]
      };
      // If loading indicator is shown it is got hidden at the end of "_renderCore" - during "_drawn". Then "loadingIndicator" option is changed.
      // It causes another "_setContentSize" execution (inside of the first one). Layout backwards during inner "_setContentSize" and clears its cache and
      // then backwards again during outer "_setContentSize" when "_cache" is null - so it fails.
      // The following code dirtily preserves layout cache for the outer backward.
      // The appropriate solution is to remove heavy rendering from "_applySize" - it should be done later during some other change processing.
      // It would be even better to somehow defer any inside option changes - so they all are applied after all changes are processed.
      var layoutCache = that._layout._cache;
      that._cleanCore();
      that._renderCore();
      that._layout._cache = that._layout._cache || layoutCache;
      return [rect[0], that._innerRect.top, rect[2], that._innerRect.bottom];
    },
    _initialChanges: ['DOMAIN'],
    _themeDependentChanges: ['DOMAIN'],
    _optionChangesMap: {
      subtitle: 'MOSTLY_TOTAL',
      indicator: 'MOSTLY_TOTAL',
      geometry: 'MOSTLY_TOTAL',
      animation: 'MOSTLY_TOTAL',
      startValue: 'DOMAIN',
      endValue: 'DOMAIN'
    },
    _optionChangesOrder: ['DOMAIN', 'MOSTLY_TOTAL'],
    _change_DOMAIN: function _change_DOMAIN() {
      this._setupDomain();
    },
    _change_MOSTLY_TOTAL: function _change_MOSTLY_TOTAL() {
      this._applyMostlyTotalChange();
    },
    _updateExtraElements: _common.noop,
    _setupDomain: function _setupDomain() {
      var that = this;
      that._setupDomainCore();
      // T130599
      that._isValidDomain = isFinite(1 / (that._translator.getDomain()[1] - that._translator.getDomain()[0]));
      if (!that._isValidDomain) {
        that._incidentOccurred('W2301');
      }
      that._change(['MOSTLY_TOTAL']);
    },
    _applyMostlyTotalChange: function _applyMostlyTotalChange() {
      var that = this;
      that._setupCodomain();
      that._setupAnimationSettings();
      that._setupDefaultFormat();
      that._change(['LAYOUT']);
    },
    _setupAnimationSettings: function _setupAnimationSettings() {
      var that = this;
      var option = that.option('animation');
      that._animationSettings = null;
      if (option === undefined || option) {
        option = _extend({
          enabled: true,
          duration: 1000,
          easing: 'easeOutCubic'
        }, option);
        if (option.enabled && option.duration > 0) {
          that._animationSettings = {
            duration: _Number(option.duration),
            easing: option.easing
          };
        }
      }
      //  It is better to place it here than to create separate function for one line of code
      that._containerBackgroundColor = that.option('containerBackgroundColor') || that._themeManager.theme().containerBackgroundColor;
    },
    _setupDefaultFormat: function _setupDefaultFormat() {
      var domain = this._translator.getDomain();
      this._defaultFormatOptions = (0, _utils.getAppropriateFormat)(domain[0], domain[1], this._getApproximateScreenRange());
    },
    _setupDomainCore: null,
    _calculateSize: null,
    _cleanContent: null,
    _renderContent: null,
    _setupCodomain: null,
    _getApproximateScreenRange: null,
    _factory: {
      createTranslator: function createTranslator() {
        return new _translator1d.Translator1D();
      },
      createTracker: function createTracker(parameters) {
        return new _tracker.default(parameters);
      }
    }
  });

  //  TODO: find a better place for it
  exports.BaseGauge = BaseGauge;
  var formatValue = function formatValue(value, options, extra) {
    if (Object.is(value, -0)) {
      value = 0;
    }
    options = options || {};
    var text = _format(value, options.format);
    var formatObject;
    if (typeof options.customizeText === 'function') {
      formatObject = _extend({
        value: value,
        valueText: text
      }, extra);
      return String(options.customizeText.call(formatObject, formatObject));
    }
    return text;
  };

  //  TODO: find a better place for it
  exports.formatValue = formatValue;
  var getSampleText = function getSampleText(translator, options) {
    var text1 = formatValue(translator.getDomainStart(), options);
    var text2 = formatValue(translator.getDomainEnd(), options);
    return text1.length >= text2.length ? text1 : text2;
  };
  exports.getSampleText = getSampleText;
  function compareArrays(array1, array2) {
    return array1 && array2 && array1.length === array2.length && compareArraysElements(array1, array2);
  }
  function compareArraysElements(array1, array2) {
    var i;
    var ii = array1.length;
    var array1ValueIsNaN;
    var array2ValueIsNaN;
    for (i = 0; i < ii; ++i) {
      array1ValueIsNaN = array1[i] !== array1[i];
      array2ValueIsNaN = array2[i] !== array2[i];
      if (array1ValueIsNaN && array2ValueIsNaN) {
        continue;
      }
      if (array1[i] !== array2[i]) return false;
    }
    return true;
  }

  // PLUGINS_SECTION
  BaseGauge.addPlugin(_export.plugin);
  BaseGauge.addPlugin(_title.plugin);
  BaseGauge.addPlugin(_tooltip.plugin);
  BaseGauge.addPlugin(_loading_indicator.plugin);

  // These are gauges specifics on using tooltip - they require refactoring.
  var _setTooltipOptions = BaseGauge.prototype._setTooltipOptions;
  BaseGauge.prototype._setTooltipOptions = function () {
    _setTooltipOptions.apply(this, arguments);
    this._tracker && this._tracker.setTooltipState(this._tooltip.isEnabled());
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils","../../core/utils/extend","../translators/translator1d","../core/base_widget","./theme_manager","./tracker","../../format_helper","../core/export","../core/title","../core/tooltip","../core/loading_indicator","../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils"), require("../../core/utils/extend"), require("../translators/translator1d"), require("../core/base_widget"), require("./theme_manager"), require("./tracker"), require("../../format_helper"), require("../core/export"), require("../core/title"), require("../core/tooltip"), require("../core/loading_indicator"), require("../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=base_gauge.js.map