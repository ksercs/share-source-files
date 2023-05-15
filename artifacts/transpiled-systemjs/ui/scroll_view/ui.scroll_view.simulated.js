!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scroll_view/ui.scroll_view.simulated.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/callbacks","../../core/utils/iterator","../../core/utils/common","../../core/utils/extend","./ui.scrollable.simulated","../load_indicator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scroll_view/ui.scroll_view.simulated.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/callbacks", "../../core/utils/iterator", "../../core/utils/common", "../../core/utils/extend", "./ui.scrollable.simulated", "../load_indicator"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _callbacks = _interopRequireDefault($__require("../../core/utils/callbacks"));
  var _iterator = $__require("../../core/utils/iterator");
  var _common = $__require("../../core/utils/common");
  var _extend = $__require("../../core/utils/extend");
  var _uiScrollable = $__require("./ui.scrollable.simulated");
  var _load_indicator = _interopRequireDefault($__require("../load_indicator"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var math = Math;
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
  var ScrollViewScroller = _uiScrollable.Scroller.inherit({
    ctor: function ctor() {
      this._topPocketSize = 0;
      this._bottomPocketSize = 0;
      this.callBase.apply(this, arguments);
      this._initCallbacks();
      this._releaseState();
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
    _initCallbacks: function _initCallbacks() {
      this.pullDownCallbacks = (0, _callbacks.default)();
      this.releaseCallbacks = (0, _callbacks.default)();
      this.reachBottomCallbacks = (0, _callbacks.default)();
    },
    _updateBounds: function _updateBounds() {
      var considerPockets = this._direction !== 'horizontal';
      if (considerPockets) {
        this._topPocketSize = this._$topPocket.get(0).clientHeight;
        this._bottomPocketSize = this._$bottomPocket.get(0).clientHeight;
        var containerEl = this._$container.get(0);
        var contentEl = this._$content.get(0);
        this._bottomBoundary = Math.max(contentEl.clientHeight - this._bottomPocketSize - containerEl.clientHeight, 0);
      }
      this.callBase();
    },
    _updateScrollbar: function _updateScrollbar() {
      this._scrollbar.option({
        containerSize: this._containerSize(),
        contentSize: this._contentSize() - this._topPocketSize - this._bottomPocketSize,
        scaleRatio: this._getScaleRatio()
      });
    },
    _moveContent: function _moveContent() {
      this.callBase();
      if (this._isPullDown()) {
        this._pullDownReady();
      } else if (this._isReachBottom()) {
        this._reachBottomReady();
      } else if (this._state !== STATE_RELEASED) {
        this._stateReleased();
      }
    },
    _moveScrollbar: function _moveScrollbar() {
      this._scrollbar.moveTo(this._topPocketSize + this._location);
    },
    _isPullDown: function _isPullDown() {
      return this._pullDownEnabled && this._location >= 0;
    },
    _isReachBottom: function _isReachBottom() {
      var containerEl = this._$container.get(0);
      return this._reachBottomEnabled && Math.round(this._bottomBoundary - Math.ceil(containerEl.scrollTop)) <= 1;
    },
    _scrollComplete: function _scrollComplete() {
      if (this._inBounds() && this._state === STATE_READY) {
        this._pullDownRefreshing();
      } else if (this._inBounds() && this._state === STATE_LOADING) {
        this._reachBottomLoading();
      } else {
        this.callBase();
      }
    },
    _reachBottomReady: function _reachBottomReady() {
      if (this._state === STATE_LOADING) {
        return;
      }
      this._state = STATE_LOADING;
      this._minOffset = this._getMinOffset();
    },
    _getMaxOffset: function _getMaxOffset() {
      return -this._topPocketSize;
    },
    _getMinOffset: function _getMinOffset() {
      return math.min(this.callBase(), -this._topPocketSize);
    },
    _reachBottomLoading: function _reachBottomLoading() {
      this.reachBottomCallbacks.fire();
    },
    _pullDownReady: function _pullDownReady() {
      if (this._state === STATE_READY) {
        return;
      }
      this._state = STATE_READY;
      this._maxOffset = 0;
      this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
      this._refreshPullDownText();
    },
    _stateReleased: function _stateReleased() {
      if (this._state === STATE_RELEASED) {
        return;
      }
      this._releaseState();
      this._updateBounds();
      this._$pullDown.removeClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS).removeClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
      this.releaseCallbacks.fire();
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
    _releaseHandler: function _releaseHandler() {
      if (this._state === STATE_RELEASED) {
        this._moveToBounds();
      }
      this._update();
      if (this._releaseTask) {
        this._releaseTask.abort();
      }
      this._releaseTask = (0, _common.executeAsync)(this._release.bind(this));
      return this._releaseTask.promise;
    },
    _release: function _release() {
      this._stateReleased();
      this._scrollComplete();
    },
    _reachBottomEnablingHandler: function _reachBottomEnablingHandler(enabled) {
      if (this._reachBottomEnabled === enabled) {
        return;
      }
      this._reachBottomEnabled = enabled;
      this._updateBounds();
    },
    _pullDownEnablingHandler: function _pullDownEnablingHandler(enabled) {
      if (this._pullDownEnabled === enabled) {
        return;
      }
      this._pullDownEnabled = enabled;
      this._considerTopPocketChange();
      this._updateHandler();
    },
    _considerTopPocketChange: function _considerTopPocketChange() {
      this._location -= (0, _size.getHeight)(this._$topPocket) || -this._topPocketSize;
      this._maxOffset = 0;
      this._move();
    },
    _pendingReleaseHandler: function _pendingReleaseHandler() {
      this._state = STATE_READY;
    },
    dispose: function dispose() {
      if (this._releaseTask) {
        this._releaseTask.abort();
      }
      this.callBase();
    }
  });
  var SimulatedScrollViewStrategy = _uiScrollable.SimulatedStrategy.inherit({
    _init: function _init(scrollView) {
      this.callBase(scrollView);
      this._$pullDown = scrollView._$pullDown;
      this._$topPocket = scrollView._$topPocket;
      this._$bottomPocket = scrollView._$bottomPocket;
      this._initCallbacks();
    },
    _initCallbacks: function _initCallbacks() {
      this.pullDownCallbacks = (0, _callbacks.default)();
      this.releaseCallbacks = (0, _callbacks.default)();
      this.reachBottomCallbacks = (0, _callbacks.default)();
    },
    render: function render() {
      this._renderPullDown();
      this.callBase();
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
    pullDownEnable: function pullDownEnable(enabled) {
      this._eventHandler('pullDownEnabling', enabled);
    },
    reachBottomEnable: function reachBottomEnable(enabled) {
      this._eventHandler('reachBottomEnabling', enabled);
    },
    _createScroller: function _createScroller(direction) {
      var that = this;
      var scroller = that._scrollers[direction] = new ScrollViewScroller(that._scrollerOptions(direction));
      scroller.pullDownCallbacks.add(function () {
        that.pullDownCallbacks.fire();
      });
      scroller.releaseCallbacks.add(function () {
        that.releaseCallbacks.fire();
      });
      scroller.reachBottomCallbacks.add(function () {
        that.reachBottomCallbacks.fire();
      });
    },
    _scrollerOptions: function _scrollerOptions(direction) {
      return (0, _extend.extend)(this.callBase(direction), {
        $topPocket: this._$topPocket,
        $bottomPocket: this._$bottomPocket,
        $pullDown: this._$pullDown,
        $pullDownText: this._$pullDownText,
        $pullingDownText: this._$pullingDownText,
        $pulledDownText: this._$pulledDownText,
        $refreshingText: this._$refreshingText
      });
    },
    pendingRelease: function pendingRelease() {
      this._eventHandler('pendingRelease');
    },
    release: function release() {
      return this._eventHandler('release').done(this._updateAction);
    },
    location: function location() {
      var location = this.callBase();
      location.top += (0, _size.getHeight)(this._$topPocket);
      return location;
    },
    dispose: function dispose() {
      (0, _iterator.each)(this._scrollers, function () {
        this.dispose();
      });
      this.callBase();
    }
  });
  var _default = SimulatedScrollViewStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/callbacks","../../core/utils/iterator","../../core/utils/common","../../core/utils/extend","./ui.scrollable.simulated","../load_indicator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/callbacks"), require("../../core/utils/iterator"), require("../../core/utils/common"), require("../../core/utils/extend"), require("./ui.scrollable.simulated"), require("../load_indicator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scroll_view.simulated.js.map