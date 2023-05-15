!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scroll_view/ui.scroll_view.native.pull_down.js"], ["../../core/renderer","../../core/utils/callbacks","../../animation/translator","./ui.scrollable.native","../load_indicator","../../core/utils/iterator","../../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scroll_view/ui.scroll_view.native.pull_down.js", ["../../core/renderer", "../../core/utils/callbacks", "../../animation/translator", "./ui.scrollable.native", "../load_indicator", "../../core/utils/iterator", "../../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _callbacks = _interopRequireDefault($__require("../../core/utils/callbacks"));
  var _translator = $__require("../../animation/translator");
  var _uiScrollable = _interopRequireDefault($__require("./ui.scrollable.native"));
  var _load_indicator = _interopRequireDefault($__require("../load_indicator"));
  var _iterator = $__require("../../core/utils/iterator");
  var _deferred = $__require("../../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = 'dx-scrollview-pull-down-loading';
  var SCROLLVIEW_PULLDOWN_READY_CLASS = 'dx-scrollview-pull-down-ready';
  var SCROLLVIEW_PULLDOWN_IMAGE_CLASS = 'dx-scrollview-pull-down-image';
  var SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = 'dx-scrollview-pull-down-indicator';
  var SCROLLVIEW_PULLDOWN_TEXT_CLASS = 'dx-scrollview-pull-down-text';
  var SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = 'dx-scrollview-pull-down-text-visible';
  var STATE_RELEASED = 0;
  var STATE_READY = 1;
  var STATE_REFRESHING = 2;
  var STATE_LOADING = 3;
  var PULLDOWN_RELEASE_TIME = 400;
  var PullDownNativeScrollViewStrategy = _uiScrollable.default.inherit({
    _init: function _init(scrollView) {
      this.callBase(scrollView);
      this._$topPocket = scrollView._$topPocket;
      this._$pullDown = scrollView._$pullDown;
      this._$refreshingText = scrollView._$refreshingText;
      this._$scrollViewContent = (0, _renderer.default)(scrollView.content());
      this._$container = (0, _renderer.default)(scrollView.container());
      this._initCallbacks();
    },
    _initCallbacks: function _initCallbacks() {
      this.pullDownCallbacks = (0, _callbacks.default)();
      this.releaseCallbacks = (0, _callbacks.default)();
      this.reachBottomCallbacks = (0, _callbacks.default)();
    },
    render: function render() {
      this.callBase();
      this._renderPullDown();
      this._releaseState();
    },
    _renderPullDown: function _renderPullDown() {
      var $image = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_PULLDOWN_IMAGE_CLASS);
      var $loadContainer = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_PULLDOWN_INDICATOR_CLASS);
      var $loadIndicator = new _load_indicator.default((0, _renderer.default)('<div>')).$element();
      var $text = this._$pullDownText = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_PULLDOWN_TEXT_CLASS);
      this._$pullingDownText = (0, _renderer.default)('<div>').text(this.option('pullingDownText')).appendTo($text);
      this._$pulledDownText = (0, _renderer.default)('<div>').text(this.option('pulledDownText')).appendTo($text);
      this._$refreshingText = (0, _renderer.default)('<div>').text(this.option('refreshingText')).appendTo($text);
      this._$pullDown.empty().append($image).append($loadContainer.append($loadIndicator)).append($text);
    },
    _releaseState: function _releaseState() {
      this._state = STATE_RELEASED;
      this._refreshPullDownText();
    },
    _refreshPullDownText: function _refreshPullDownText() {
      var that = this;
      var pullDownTextItems = [{
        element: this._$pullingDownText,
        visibleState: STATE_RELEASED
      }, {
        element: this._$pulledDownText,
        visibleState: STATE_READY
      }, {
        element: this._$refreshingText,
        visibleState: STATE_REFRESHING
      }];
      (0, _iterator.each)(pullDownTextItems, function (_, item) {
        var action = that._state === item.visibleState ? 'addClass' : 'removeClass';
        item.element[action](SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS);
      });
    },
    update: function update() {
      this.callBase();
      this._setTopPocketOffset();
    },
    _updateDimensions: function _updateDimensions() {
      this.callBase();
      this._topPocketSize = this._$topPocket.get(0).clientHeight;
      var contentEl = this._$scrollViewContent.get(0);
      var containerEl = this._$container.get(0);
      this._bottomBoundary = Math.max(contentEl.clientHeight - containerEl.clientHeight, 0);
    },
    _allowedDirections: function _allowedDirections() {
      var allowedDirections = this.callBase();
      allowedDirections.vertical = allowedDirections.vertical || this._pullDownEnabled;
      return allowedDirections;
    },
    _setTopPocketOffset: function _setTopPocketOffset() {
      this._$topPocket.css({
        top: -this._topPocketSize
      });
    },
    handleEnd: function handleEnd() {
      this.callBase();
      this._complete();
    },
    handleStop: function handleStop() {
      this.callBase();
      this._complete();
    },
    _complete: function _complete() {
      if (this._state === STATE_READY) {
        this._setPullDownOffset(this._topPocketSize);
        clearTimeout(this._pullDownRefreshTimeout);
        this._pullDownRefreshTimeout = setTimeout(function () {
          this._pullDownRefreshing();
        }.bind(this), 400);
      }
    },
    _setPullDownOffset: function _setPullDownOffset(offset) {
      (0, _translator.move)(this._$topPocket, {
        top: offset
      });
      (0, _translator.move)(this._$scrollViewContent, {
        top: offset
      });
    },
    handleScroll: function handleScroll(e) {
      this.callBase(e);

      // TODO: replace with disabled check
      if (this._state === STATE_REFRESHING) {
        return;
      }
      var currentLocation = this.location().top;
      var scrollDelta = (this._location || 0) - currentLocation;
      this._location = currentLocation;
      if (this._isPullDown()) {
        this._pullDownReady();
      } else if (scrollDelta > 0 && this._isReachBottom()) {
        this._reachBottom();
      } else {
        this._stateReleased();
      }
    },
    _isPullDown: function _isPullDown() {
      return this._pullDownEnabled && this._location >= this._topPocketSize;
    },
    _isReachBottom: function _isReachBottom() {
      return this._reachBottomEnabled && Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1;
    },
    _reachBottom: function _reachBottom() {
      if (this._state === STATE_LOADING) {
        return;
      }
      this._state = STATE_LOADING;
      this.reachBottomCallbacks.fire();
    },
    _pullDownReady: function _pullDownReady() {
      if (this._state === STATE_READY) {
        return;
      }
      this._state = STATE_READY;
      this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
      this._refreshPullDownText();
    },
    _stateReleased: function _stateReleased() {
      if (this._state === STATE_RELEASED) {
        return;
      }
      this._$pullDown.removeClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS).removeClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
      this._releaseState();
    },
    _pullDownRefreshing: function _pullDownRefreshing() {
      if (this._state === STATE_REFRESHING) {
        return;
      }
      this._state = STATE_REFRESHING;
      this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS).removeClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
      this._refreshPullDownText();
      this.pullDownCallbacks.fire();
    },
    pullDownEnable: function pullDownEnable(enabled) {
      if (enabled) {
        this._updateDimensions();
        this._setTopPocketOffset();
      }
      this._pullDownEnabled = enabled;
    },
    reachBottomEnable: function reachBottomEnable(enabled) {
      this._reachBottomEnabled = enabled;
    },
    pendingRelease: function pendingRelease() {
      this._state = STATE_READY;
    },
    release: function release() {
      var deferred = new _deferred.Deferred();
      this._updateDimensions();
      clearTimeout(this._releaseTimeout);
      if (this._state === STATE_LOADING) {
        this._state = STATE_RELEASED;
      }
      this._releaseTimeout = setTimeout(function () {
        this._setPullDownOffset(0);
        this._stateReleased();
        this.releaseCallbacks.fire();
        this._updateAction();
        deferred.resolve();
      }.bind(this), PULLDOWN_RELEASE_TIME);
      return deferred.promise();
    },
    dispose: function dispose() {
      clearTimeout(this._pullDownRefreshTimeout);
      clearTimeout(this._releaseTimeout);
      this.callBase();
    }
  });
  var _default = PullDownNativeScrollViewStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/callbacks","../../animation/translator","./ui.scrollable.native","../load_indicator","../../core/utils/iterator","../../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/callbacks"), require("../../animation/translator"), require("./ui.scrollable.native"), require("../load_indicator"), require("../../core/utils/iterator"), require("../../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scroll_view.native.pull_down.js.map