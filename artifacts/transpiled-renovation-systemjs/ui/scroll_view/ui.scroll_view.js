!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scroll_view/ui.scroll_view.js"], ["../../core/renderer","../../core/devices","../../core/utils/window","../../localization/message","../../core/component_registrator","../../core/element","../../core/utils/extend","../../core/utils/common","./ui.scroll_view.native.pull_down","./ui.scroll_view.native.swipe_down","./ui.scroll_view.simulated","./ui.scrollable","../load_indicator","./../themes","../load_panel"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scroll_view/ui.scroll_view.js", ["../../core/renderer", "../../core/devices", "../../core/utils/window", "../../localization/message", "../../core/component_registrator", "../../core/element", "../../core/utils/extend", "../../core/utils/common", "./ui.scroll_view.native.pull_down", "./ui.scroll_view.native.swipe_down", "./ui.scroll_view.simulated", "./ui.scrollable", "../load_indicator", "./../themes", "../load_panel"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _window = $__require("../../core/utils/window");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _element = $__require("../../core/element");
  var _extend = $__require("../../core/utils/extend");
  var _common = $__require("../../core/utils/common");
  var _uiScroll_viewNative = _interopRequireDefault($__require("./ui.scroll_view.native.pull_down"));
  var _uiScroll_viewNative2 = _interopRequireDefault($__require("./ui.scroll_view.native.swipe_down"));
  var _uiScroll_view = _interopRequireDefault($__require("./ui.scroll_view.simulated"));
  var _ui = _interopRequireDefault($__require("./ui.scrollable"));
  var _load_indicator = _interopRequireDefault($__require("../load_indicator"));
  var _themes = $__require("./../themes");
  var _load_panel = _interopRequireDefault($__require("../load_panel"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE scrollView

  var SCROLLVIEW_CLASS = 'dx-scrollview';
  var SCROLLVIEW_CONTENT_CLASS = SCROLLVIEW_CLASS + '-content';
  var SCROLLVIEW_TOP_POCKET_CLASS = SCROLLVIEW_CLASS + '-top-pocket';
  var SCROLLVIEW_BOTTOM_POCKET_CLASS = SCROLLVIEW_CLASS + '-bottom-pocket';
  var SCROLLVIEW_PULLDOWN_CLASS = SCROLLVIEW_CLASS + '-pull-down';
  var SCROLLVIEW_REACHBOTTOM_CLASS = SCROLLVIEW_CLASS + '-scrollbottom';
  var SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = SCROLLVIEW_REACHBOTTOM_CLASS + '-indicator';
  var SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = SCROLLVIEW_REACHBOTTOM_CLASS + '-text';
  var SCROLLVIEW_LOADPANEL = SCROLLVIEW_CLASS + '-loadpanel';
  var refreshStrategies = {
    pullDown: _uiScroll_viewNative.default,
    swipeDown: _uiScroll_viewNative2.default,
    simulated: _uiScroll_view.default
  };
  var isServerSide = !(0, _window.hasWindow)();
  var scrollViewServerConfig = {
    finishLoading: _common.noop,
    release: _common.noop,
    refresh: _common.noop,
    scrollOffset: function scrollOffset() {
      return {
        top: 0,
        left: 0
      };
    },
    _optionChanged: function _optionChanged(args) {
      if (args.name !== 'onUpdated') {
        return this.callBase.apply(this, arguments);
      }
    }
  };
  var ScrollView = _ui.default.inherit(isServerSide ? scrollViewServerConfig : {
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        pullingDownText: _message.default.format('dxScrollView-pullingDownText'),
        pulledDownText: _message.default.format('dxScrollView-pulledDownText'),
        refreshingText: _message.default.format('dxScrollView-refreshingText'),
        reachBottomText: _message.default.format('dxScrollView-reachBottomText'),
        onPullDown: null,
        onReachBottom: null,
        refreshStrategy: 'pullDown'
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device() {
          var realDevice = _devices.default.real();
          return realDevice.platform === 'android';
        },
        options: {
          refreshStrategy: 'swipeDown'
        }
      }, {
        device: function device() {
          return (0, _themes.isMaterial)();
        },
        options: {
          pullingDownText: '',
          pulledDownText: '',
          refreshingText: '',
          reachBottomText: ''
        }
      }]);
    },
    _init: function _init() {
      this.callBase();
      this._loadingIndicatorEnabled = true;
    },
    _initScrollableMarkup: function _initScrollableMarkup() {
      this.callBase();
      this.$element().addClass(SCROLLVIEW_CLASS);
      this._initContent();
      this._initTopPocket();
      this._initBottomPocket();
      this._initLoadPanel();
    },
    _initContent: function _initContent() {
      var $content = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_CONTENT_CLASS);
      this._$content.wrapInner($content);
    },
    _initTopPocket: function _initTopPocket() {
      var $topPocket = this._$topPocket = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_TOP_POCKET_CLASS);
      var $pullDown = this._$pullDown = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_PULLDOWN_CLASS);
      $topPocket.append($pullDown);
      this._$content.prepend($topPocket);
    },
    _initBottomPocket: function _initBottomPocket() {
      var $bottomPocket = this._$bottomPocket = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_BOTTOM_POCKET_CLASS);
      var $reachBottom = this._$reachBottom = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_REACHBOTTOM_CLASS);
      var $loadContainer = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS);
      var $loadIndicator = new _load_indicator.default((0, _renderer.default)('<div>')).$element();
      var $text = this._$reachBottomText = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_REACHBOTTOM_TEXT_CLASS);
      this._updateReachBottomText();
      $reachBottom.append($loadContainer.append($loadIndicator)).append($text);
      $bottomPocket.append($reachBottom);
      this._$content.append($bottomPocket);
    },
    _initLoadPanel: function _initLoadPanel() {
      var $loadPanelElement = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_LOADPANEL).appendTo(this.$element());
      var loadPanelOptions = {
        shading: false,
        delay: 400,
        message: this.option('refreshingText'),
        position: {
          of: this.$element()
        }
      };
      this._loadPanel = this._createComponent($loadPanelElement, _load_panel.default, loadPanelOptions);
    },
    _updateReachBottomText: function _updateReachBottomText() {
      this._$reachBottomText.text(this.option('reachBottomText'));
    },
    _createStrategy: function _createStrategy() {
      var strategyName = this.option('useNative') ? this.option('refreshStrategy') : 'simulated';
      var strategyClass = refreshStrategies[strategyName];
      this._strategy = new strategyClass(this);
      this._strategy.pullDownCallbacks.add(this._pullDownHandler.bind(this));
      this._strategy.releaseCallbacks.add(this._releaseHandler.bind(this));
      this._strategy.reachBottomCallbacks.add(this._reachBottomHandler.bind(this));
    },
    _createActions: function _createActions() {
      this.callBase();
      this._pullDownAction = this._createActionByOption('onPullDown');
      this._reachBottomAction = this._createActionByOption('onReachBottom');
      this._tryRefreshPocketState();
    },
    _tryRefreshPocketState: function _tryRefreshPocketState() {
      this._pullDownEnable(this.hasActionSubscription('onPullDown'));
      this._reachBottomEnable(this.hasActionSubscription('onReachBottom'));
    },
    on: function on(eventName) {
      var result = this.callBase.apply(this, arguments);
      if (eventName === 'pullDown' || eventName === 'reachBottom') {
        this._tryRefreshPocketState();
      }
      return result;
    },
    _pullDownEnable: function _pullDownEnable(enabled) {
      if (arguments.length === 0) {
        return this._pullDownEnabled;
      }
      if (this._$pullDown && this._strategy) {
        this._$pullDown.toggle(enabled);
        this._strategy.pullDownEnable(enabled);
        this._pullDownEnabled = enabled;
      }
    },
    _reachBottomEnable: function _reachBottomEnable(enabled) {
      if (arguments.length === 0) {
        return this._reachBottomEnabled;
      }
      if (this._$reachBottom && this._strategy) {
        this._$reachBottom.toggle(enabled);
        this._strategy.reachBottomEnable(enabled);
        this._reachBottomEnabled = enabled;
      }
    },
    _pullDownHandler: function _pullDownHandler() {
      this._loadingIndicator(false);
      this._pullDownLoading();
    },
    _loadingIndicator: function _loadingIndicator(value) {
      if (arguments.length < 1) {
        return this._loadingIndicatorEnabled;
      }
      this._loadingIndicatorEnabled = value;
    },
    _pullDownLoading: function _pullDownLoading() {
      this.startLoading();
      this._pullDownAction();
    },
    _reachBottomHandler: function _reachBottomHandler() {
      this._loadingIndicator(false);
      this._reachBottomLoading();
    },
    _reachBottomLoading: function _reachBottomLoading() {
      this.startLoading();
      this._reachBottomAction();
    },
    _releaseHandler: function _releaseHandler() {
      this.finishLoading();
      this._loadingIndicator(true);
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'onPullDown':
        case 'onReachBottom':
          this._createActions();
          break;
        case 'pullingDownText':
        case 'pulledDownText':
        case 'refreshingText':
        case 'refreshStrategy':
          this._invalidate();
          break;
        case 'reachBottomText':
          this._updateReachBottomText();
          break;
        default:
          this.callBase(args);
      }
    },
    content: function content() {
      return (0, _element.getPublicElement)(this._$content.children().eq(1));
    },
    release: function release(preventReachBottom) {
      if (preventReachBottom !== undefined) {
        this.toggleLoading(!preventReachBottom);
      }
      return this._strategy.release();
    },
    /**
    * @name dxScrollView.toggleLoading
    * @publicName toggleLoading(showOrHide)
    * @param1 showOrHide:boolean
    * @hidden
    */
    toggleLoading: function toggleLoading(showOrHide) {
      this._reachBottomEnable(showOrHide);
    },
    refresh: function refresh() {
      if (!this.hasActionSubscription('onPullDown')) {
        return;
      }
      this._strategy.pendingRelease();
      this._pullDownLoading();
    },
    startLoading: function startLoading() {
      if (this._loadingIndicator() && this.$element().is(':visible')) {
        this._loadPanel.show();
      }
      this._lock();
    },
    finishLoading: function finishLoading() {
      this._loadPanel.hide();
      this._unlock();
    },
    _dispose: function _dispose() {
      this._strategy.dispose();
      this.callBase();
      if (this._loadPanel) {
        this._loadPanel.$element().remove();
      }
    }
  });
  (0, _component_registrator.default)('dxScrollView', ScrollView);
  var _default = ScrollView;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/devices","../../core/utils/window","../../localization/message","../../core/component_registrator","../../core/element","../../core/utils/extend","../../core/utils/common","./ui.scroll_view.native.pull_down","./ui.scroll_view.native.swipe_down","./ui.scroll_view.simulated","./ui.scrollable","../load_indicator","./../themes","../load_panel"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/devices"), require("../../core/utils/window"), require("../../localization/message"), require("../../core/component_registrator"), require("../../core/element"), require("../../core/utils/extend"), require("../../core/utils/common"), require("./ui.scroll_view.native.pull_down"), require("./ui.scroll_view.native.swipe_down"), require("./ui.scroll_view.simulated"), require("./ui.scrollable"), require("../load_indicator"), require("./../themes"), require("../load_panel"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scroll_view.js.map