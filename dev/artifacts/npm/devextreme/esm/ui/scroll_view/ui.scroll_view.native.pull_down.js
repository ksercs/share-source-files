/**
* DevExtreme (esm/ui/scroll_view/ui.scroll_view.native.pull_down.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import Callbacks from '../../core/utils/callbacks';
import { move } from '../../animation/translator';
import NativeStrategy from './ui.scrollable.native';
import LoadIndicator from '../load_indicator';
import { each } from '../../core/utils/iterator';
import { Deferred } from '../../core/utils/deferred';
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
var PullDownNativeScrollViewStrategy = NativeStrategy.inherit({
  _init: function _init(scrollView) {
    this.callBase(scrollView);
    this._$topPocket = scrollView._$topPocket;
    this._$pullDown = scrollView._$pullDown;
    this._$refreshingText = scrollView._$refreshingText;
    this._$scrollViewContent = $(scrollView.content());
    this._$container = $(scrollView.container());
    this._initCallbacks();
  },
  _initCallbacks: function _initCallbacks() {
    this.pullDownCallbacks = Callbacks();
    this.releaseCallbacks = Callbacks();
    this.reachBottomCallbacks = Callbacks();
  },
  render: function render() {
    this.callBase();
    this._renderPullDown();
    this._releaseState();
  },
  _renderPullDown: function _renderPullDown() {
    var $image = $('<div>').addClass(SCROLLVIEW_PULLDOWN_IMAGE_CLASS);
    var $loadContainer = $('<div>').addClass(SCROLLVIEW_PULLDOWN_INDICATOR_CLASS);
    var $loadIndicator = new LoadIndicator($('<div>')).$element();
    var $text = this._$pullDownText = $('<div>').addClass(SCROLLVIEW_PULLDOWN_TEXT_CLASS);
    this._$pullingDownText = $('<div>').text(this.option('pullingDownText')).appendTo($text);
    this._$pulledDownText = $('<div>').text(this.option('pulledDownText')).appendTo($text);
    this._$refreshingText = $('<div>').text(this.option('refreshingText')).appendTo($text);
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
    each(pullDownTextItems, function (_, item) {
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
    move(this._$topPocket, {
      top: offset
    });
    move(this._$scrollViewContent, {
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
    var deferred = new Deferred();
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
export default PullDownNativeScrollViewStrategy;
