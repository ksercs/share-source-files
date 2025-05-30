/**
* DevExtreme (cjs/ui/scroll_view/ui.scroll_view.simulated.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _iterator = require("../../core/utils/iterator");
var _common = require("../../core/utils/common");
var _extend = require("../../core/utils/extend");
var _uiScrollable = require("./ui.scrollable.simulated");
var _load_indicator = _interopRequireDefault(require("../load_indicator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
