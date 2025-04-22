/**
* DevExtreme (cjs/__internal/ui/scroll_view/m_scroll_view.native.swipe_down.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _translator = require("../../../common/core/animation/translator");
var _index = require("../../../common/core/events/utils/index");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../../core/utils/callbacks"));
var _deferred = require("../../../core/utils/deferred");
var _size = require("../../../core/utils/size");
var _load_indicator = _interopRequireDefault(require("../../../ui/load_indicator"));
var _m_scrollable = _interopRequireDefault(require("./m_scrollable.native"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS = 'dx-scrollview-pull-down-loading';
const SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = 'dx-scrollview-pull-down-indicator';
const SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = 'dx-scrollview-pull-down-refreshing';
const PULLDOWN_ICON_CLASS = 'dx-icon-pulldown';
const STATE_RELEASED = 0;
const STATE_READY = 1;
const STATE_REFRESHING = 2;
const STATE_TOUCHED = 4;
const STATE_PULLED = 5;
class SwipeDownNativeScrollViewStrategy extends _m_scrollable.default {
  _init(scrollView) {
    super._init(scrollView);
    this._$topPocket = scrollView._$topPocket;
    this._$pullDown = scrollView._$pullDown;
    this._$scrollViewContent = (0, _renderer.default)(scrollView.content());
    this._$container = (0, _renderer.default)(scrollView.container());
    this._initCallbacks();
    this._location = 0;
  }
  _initCallbacks() {
    this.pullDownCallbacks = (0, _callbacks.default)();
    this.releaseCallbacks = (0, _callbacks.default)();
    this.reachBottomCallbacks = (0, _callbacks.default)();
  }
  render() {
    super.render();
    this._renderPullDown();
    this._releaseState();
  }
  _renderPullDown() {
    const $loadContainer = (0, _renderer.default)('<div>').addClass(SCROLLVIEW_PULLDOWN_INDICATOR_CLASS);
    // @ts-expect-error
    const $loadIndicator = new _load_indicator.default((0, _renderer.default)('<div>')).$element();
    this._$icon = (0, _renderer.default)('<div>').addClass(PULLDOWN_ICON_CLASS);
    this._$pullDown.empty().append(this._$icon).append($loadContainer.append($loadIndicator));
  }
  _releaseState() {
    this._state = STATE_RELEASED;
    this._releasePullDown();
    this._updateDimensions();
  }
  _releasePullDown() {
    this._$pullDown.css({
      opacity: 0
    });
  }
  _updateDimensions() {
    super._updateDimensions();
    this._topPocketSize = this._$topPocket.get(0).clientHeight;
    const contentEl = this._$scrollViewContent.get(0);
    const containerEl = this._$container.get(0);
    this._bottomBoundary = Math.max(contentEl.clientHeight - containerEl.clientHeight, 0);
  }
  _allowedDirections() {
    const allowedDirections = super._allowedDirections();
    allowedDirections.vertical = allowedDirections.vertical || this._pullDownEnabled;
    return allowedDirections;
  }
  handleInit(e) {
    super.handleInit(e);
    if (this._state === STATE_RELEASED && this._location === 0) {
      this._startClientY = (0, _index.eventData)(e.originalEvent).y;
      this._state = STATE_TOUCHED;
    }
  }
  handleMove(e) {
    super.handleMove(e);
    this._deltaY = (0, _index.eventData)(e.originalEvent).y - this._startClientY;
    if (this._state === STATE_TOUCHED) {
      if (this._pullDownEnabled && this._deltaY > 0) {
        this._state = STATE_PULLED;
      } else {
        this._complete();
      }
    }
    if (this._state === STATE_PULLED) {
      e.preventDefault();
      this._movePullDown();
    }
  }
  _movePullDown() {
    const pullDownHeight = this._getPullDownHeight();
    const top = Math.min(pullDownHeight * 3, this._deltaY + this._getPullDownStartPosition());
    const angle = 180 * top / pullDownHeight / 3;
    this._$pullDown.css({
      opacity: 1
    }).toggleClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS, top < pullDownHeight);
    (0, _translator.move)(this._$pullDown, {
      top
    });
    this._$icon.css({
      transform: `rotate(${angle}deg)`
    });
  }
  _isPullDown() {
    return this._pullDownEnabled && this._state === STATE_PULLED && this._deltaY >= this._getPullDownHeight() - this._getPullDownStartPosition();
  }
  _getPullDownHeight() {
    return Math.round((0, _size.getOuterHeight)(this._$element) * 0.05);
  }
  _getPullDownStartPosition() {
    return -Math.round((0, _size.getOuterHeight)(this._$pullDown) * 1.5);
  }
  handleEnd() {
    if (this._isPullDown()) {
      this._pullDownRefreshing();
    }
    this._complete();
  }
  handleStop() {
    this._complete();
  }
  _complete() {
    if (this._state === STATE_TOUCHED || this._state === STATE_PULLED) {
      this._releaseState();
    }
  }
  handleScroll(e) {
    super.handleScroll(e);
    // TODO: replace with disabled check
    if (this._state === STATE_REFRESHING) {
      return;
    }
    const currentLocation = this.location().top;
    const scrollDelta = this._location - currentLocation;
    this._location = currentLocation;
    if (scrollDelta > 0 && this._isReachBottom()) {
      this._reachBottom();
    } else {
      this._stateReleased();
    }
  }
  _isReachBottom() {
    return this._reachBottomEnabled && this.isBottomReached();
  }
  isBottomReached() {
    return Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1;
  }
  _reachBottom() {
    this.reachBottomCallbacks.fire();
  }
  _stateReleased() {
    if (this._state === STATE_RELEASED) {
      return;
    }
    this._$pullDown.removeClass(SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS);
    this._releaseState();
  }
  _pullDownRefreshing() {
    this._state = STATE_REFRESHING;
    this._pullDownRefreshHandler();
  }
  _pullDownRefreshHandler() {
    this._refreshPullDown();
    this.pullDownCallbacks.fire();
  }
  _refreshPullDown() {
    this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS);
    (0, _translator.move)(this._$pullDown, {
      top: this._getPullDownHeight()
    });
  }
  pullDownEnable(enabled) {
    this._$topPocket.toggle(enabled);
    this._pullDownEnabled = enabled;
  }
  reachBottomEnable(enabled) {
    this._reachBottomEnabled = enabled;
  }
  pendingRelease() {
    this._state = STATE_READY;
  }
  release() {
    const deferred = (0, _deferred.Deferred)();
    this._updateDimensions();
    clearTimeout(this._releaseTimeout);
    this._releaseTimeout = setTimeout(() => {
      this._stateReleased();
      this.releaseCallbacks.fire();
      this._updateAction();
      deferred.resolve();
    }, 800);
    return deferred.promise();
  }
  dispose() {
    clearTimeout(this._pullDownRefreshTimeout);
    clearTimeout(this._releaseTimeout);
    super.dispose();
  }
}
var _default = exports.default = SwipeDownNativeScrollViewStrategy;
