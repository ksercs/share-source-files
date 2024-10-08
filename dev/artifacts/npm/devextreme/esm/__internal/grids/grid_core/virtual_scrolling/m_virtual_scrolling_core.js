/**
* DevExtreme (esm/__internal/grids/grid_core/virtual_scrolling/m_virtual_scrolling_core.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import positionUtils from '../../../../animation/position';
import Class from '../../../../core/class';
import $ from '../../../../core/renderer';
import browser from '../../../../core/utils/browser';
import Callbacks from '../../../../core/utils/callbacks';
import { Deferred } from '../../../../core/utils/deferred';
import { each } from '../../../../core/utils/iterator';
import { isDefined } from '../../../../core/utils/type';
import { getWindow } from '../../../../core/utils/window';
import eventsEngine from '../../../../events/core/events_engine';
import gridCoreUtils from '../m_utils';
import { VirtualDataLoader } from '../virtual_data_loader/m_virtual_data_loader';
var SCROLLING_MODE_INFINITE = 'infinite';
var SCROLLING_MODE_VIRTUAL = 'virtual';
var LEGACY_SCROLLING_MODE = 'scrolling.legacyMode';
var isVirtualMode = that => that.option('scrolling.mode') === SCROLLING_MODE_VIRTUAL || that._isVirtual;
var isAppendMode = that => that.option('scrolling.mode') === SCROLLING_MODE_INFINITE && !that._isVirtual;
function subscribeToExternalScrollers($element, scrollChangedHandler, $targetElement) {
  var $scrollElement;
  var scrollableArray = [];
  var scrollToArray = [];
  var disposeArray = [];
  $targetElement = $targetElement || $element;
  function getElementOffset(scrollable) {
    var $scrollableElement = scrollable.element ? scrollable.$element() : scrollable;
    // @ts-expect-error
    var scrollableOffset = positionUtils.offset($scrollableElement);
    if (!scrollableOffset) {
      return $element.offset().top;
    }
    return scrollable.scrollTop() - (scrollableOffset.top - $element.offset().top);
  }
  function createWindowScrollHandler(scrollable) {
    return function () {
      var scrollTop = scrollable.scrollTop() - getElementOffset(scrollable);
      scrollTop = scrollTop > 0 ? scrollTop : 0;
      scrollChangedHandler(scrollTop);
    };
  }
  var widgetScrollStrategy = {
    on(scrollable, eventName, handler) {
      scrollable.on('scroll', handler);
    },
    off(scrollable, eventName, handler) {
      scrollable.off('scroll', handler);
    }
  };
  function subscribeToScrollEvents($scrollElement) {
    var isDocument = $scrollElement.get(0).nodeName === '#document';
    // @ts-expect-error
    var isElement = $scrollElement.get(0).nodeType === getWindow().Node.ELEMENT_NODE;
    var scrollable = $scrollElement.data('dxScrollable');
    var eventsStrategy = widgetScrollStrategy;
    if (!scrollable) {
      scrollable = isDocument && $(getWindow()) || isElement && $scrollElement.css('overflowY') === 'auto' && $scrollElement;
      eventsStrategy = eventsEngine;
      if (!scrollable) return;
    }
    var handler = createWindowScrollHandler(scrollable);
    eventsStrategy.on(scrollable, 'scroll', handler);
    scrollToArray.push(pos => {
      var topOffset = getElementOffset(scrollable);
      var scrollMethod = scrollable.scrollTo ? 'scrollTo' : 'scrollTop';
      if (pos - topOffset >= 0) {
        scrollable[scrollMethod](pos + topOffset);
      }
    });
    scrollableArray.push(scrollable);
    disposeArray.push(() => {
      eventsStrategy.off(scrollable, 'scroll', handler);
    });
  }
  var getScrollElementParent = $element => {
    var _a;
    return $((_a = $element.get(0).parentNode) !== null && _a !== void 0 ? _a : $element.get(0).host);
  };
  for ($scrollElement = $targetElement.parent(); $scrollElement.length; $scrollElement = getScrollElementParent($scrollElement)) {
    subscribeToScrollEvents($scrollElement);
  }
  return {
    scrollTo(pos) {
      each(scrollToArray, (_, scrollTo) => {
        scrollTo(pos);
      });
    },
    dispose() {
      each(disposeArray, (_, dispose) => {
        dispose();
      });
    }
  };
}
var VirtualScrollController = Class.inherit(function () {
  var members = {
    ctor(component, dataOptions, isVirtual) {
      this._dataOptions = dataOptions;
      this.component = component;
      this._viewportSize = component.option(LEGACY_SCROLLING_MODE) === false ? 15 : 0;
      this._viewportItemSize = 20;
      this._viewportItemIndex = 0;
      this._position = 0;
      this._isScrollingBack = false;
      this._contentSize = 0;
      this._itemSizes = {};
      this._sizeRatio = 1;
      this._isVirtual = isVirtual;
      this.positionChanged = Callbacks();
      this._dataLoader = new VirtualDataLoader(this, this._dataOptions);
    },
    getItemSizes() {
      return this._itemSizes;
    },
    option() {
      return this.component.option.apply(this.component, arguments);
    },
    isVirtual() {
      return this._isVirtual;
    },
    virtualItemsCount() {
      if (isVirtualMode(this)) {
        var dataOptions = this._dataOptions;
        var totalItemsCount = dataOptions.totalItemsCount();
        if (this.option(LEGACY_SCROLLING_MODE) === false && totalItemsCount !== -1) {
          var viewportParams = this.getViewportParams();
          var loadedOffset = dataOptions.loadedOffset();
          var loadedItemCount = dataOptions.loadedItemCount();
          var skip = Math.max(viewportParams.skip, loadedOffset);
          var take = Math.min(viewportParams.take, loadedItemCount);
          var endItemsCount = Math.max(totalItemsCount - (skip + take), 0);
          return {
            begin: skip,
            end: endItemsCount
          };
        }
        return this._dataLoader.virtualItemsCount.apply(this._dataLoader, arguments);
      }
    },
    getScrollingTimeout() {
      var _a;
      var renderAsync = this.option('scrolling.renderAsync');
      var scrollingTimeout = 0;
      if (!isDefined(renderAsync)) {
        scrollingTimeout = Math.min(this.option('scrolling.timeout') || 0, this._dataOptions.changingDuration());
        if (scrollingTimeout < this.option('scrolling.renderingThreshold')) {
          scrollingTimeout = this.option('scrolling.minTimeout') || 0;
        }
      } else if (renderAsync) {
        scrollingTimeout = (_a = this.option('scrolling.timeout')) !== null && _a !== void 0 ? _a : 0;
      }
      return scrollingTimeout;
    },
    setViewportPosition(position) {
      // @ts-expect-error
      var result = new Deferred();
      var scrollingTimeout = this.getScrollingTimeout();
      clearTimeout(this._scrollTimeoutID);
      if (scrollingTimeout > 0) {
        this._scrollTimeoutID = setTimeout(() => {
          this._setViewportPositionCore(position);
          result.resolve();
        }, scrollingTimeout);
      } else {
        this._setViewportPositionCore(position);
        result.resolve();
      }
      return result.promise();
    },
    getViewportPosition() {
      return this._position;
    },
    getItemIndexByPosition(position, viewportItemIndex, height) {
      position = position !== null && position !== void 0 ? position : this._position;
      var defaultItemSize = this.getItemSize();
      var offset = 0;
      var itemOffset = 0;
      var itemOffsetsWithSize = Object.keys(this._itemSizes).concat(-1);
      for (var i = 0; i < itemOffsetsWithSize.length && offset < position; i++) {
        // eslint-disable-next-line radix
        var itemOffsetWithSize = parseInt(itemOffsetsWithSize[i]);
        var itemOffsetDiff = (position - offset) / defaultItemSize;
        if (itemOffsetWithSize < 0 || itemOffset + itemOffsetDiff < itemOffsetWithSize) {
          itemOffset += itemOffsetDiff;
          if (this._sizeRatio < 1 && isDefined(viewportItemIndex)) {
            itemOffset = viewportItemIndex + height / this._viewportItemSize;
          }
          break;
        } else {
          itemOffsetDiff = itemOffsetWithSize - itemOffset;
          offset += itemOffsetDiff * defaultItemSize;
          itemOffset += itemOffsetDiff;
        }
        var itemSize = this._itemSizes[itemOffsetWithSize];
        offset += itemSize;
        itemOffset += offset < position ? 1 : (position - offset + itemSize) / itemSize;
      }
      return Math.round(itemOffset * 50) / 50;
    },
    isScrollingBack() {
      return this._isScrollingBack;
    },
    _setViewportPositionCore(position) {
      var prevPosition = this._position || 0;
      this._position = position;
      if (prevPosition !== this._position) {
        this._isScrollingBack = this._position < prevPosition;
      }
      var itemIndex = this.getItemIndexByPosition();
      var result = this.setViewportItemIndex(itemIndex);
      this.positionChanged.fire();
      return result;
    },
    setContentItemSizes(sizes) {
      var virtualItemsCount = this.virtualItemsCount();
      this._contentSize = sizes.reduce((a, b) => a + b, 0);
      if (virtualItemsCount) {
        sizes.forEach((size, index) => {
          this._itemSizes[virtualItemsCount.begin + index] = size;
        });
        var virtualContentSize = (virtualItemsCount.begin + virtualItemsCount.end + this.itemsCount()) * this._viewportItemSize;
        var contentHeightLimit = gridCoreUtils.getContentHeightLimit(browser);
        if (virtualContentSize > contentHeightLimit) {
          this._sizeRatio = contentHeightLimit / virtualContentSize;
        } else {
          this._sizeRatio = 1;
        }
      }
    },
    getItemSize() {
      return this._viewportItemSize * this._sizeRatio;
    },
    getItemOffset(itemIndex, isEnd) {
      var virtualItemsCount = this.virtualItemsCount();
      var itemCount = itemIndex;
      if (!virtualItemsCount) return 0;
      var offset = 0;
      var totalItemsCount = this._dataOptions.totalItemsCount();
      Object.keys(this._itemSizes).forEach(currentItemIndex => {
        if (!itemCount) return;
        if (isEnd ? currentItemIndex >= totalItemsCount - itemIndex : currentItemIndex < itemIndex) {
          offset += this._itemSizes[currentItemIndex];
          itemCount--;
        }
      });
      return Math.floor(offset + itemCount * this._viewportItemSize * this._sizeRatio);
    },
    getContentOffset(type) {
      var isEnd = type === 'end';
      var virtualItemsCount = this.virtualItemsCount();
      if (!virtualItemsCount) return 0;
      return this.getItemOffset(isEnd ? virtualItemsCount.end : virtualItemsCount.begin, isEnd);
    },
    getVirtualContentSize() {
      var virtualItemsCount = this.virtualItemsCount();
      return virtualItemsCount ? this.getContentOffset('begin') + this.getContentOffset('end') + this._contentSize : 0;
    },
    getViewportItemIndex() {
      return this._viewportItemIndex;
    },
    setViewportItemIndex(itemIndex) {
      this._viewportItemIndex = itemIndex;
      if (this.option(LEGACY_SCROLLING_MODE) === false) {
        return;
      }
      return this._dataLoader.viewportItemIndexChanged.apply(this._dataLoader, arguments);
    },
    viewportItemSize(size) {
      if (size !== undefined) {
        this._viewportItemSize = size;
      }
      return this._viewportItemSize;
    },
    viewportSize(size) {
      if (size !== undefined) {
        this._viewportSize = size;
      }
      return this._viewportSize;
    },
    viewportHeight(height, scrollTop) {
      var position = scrollTop !== null && scrollTop !== void 0 ? scrollTop : this._position;
      var begin = this.getItemIndexByPosition(position);
      var end = this.getItemIndexByPosition(position + height, begin, height);
      this.viewportSize(Math.ceil(end - begin));
      if (!isDefined(scrollTop) && this._viewportItemIndex !== begin) {
        this._setViewportPositionCore(position);
      }
    },
    reset(isRefresh) {
      this._dataLoader.reset();
      if (!isRefresh) {
        this._itemSizes = {};
      }
    },
    subscribeToWindowScrollEvents($element) {
      this._windowScroll = this._windowScroll || subscribeToExternalScrollers($element, scrollTop => {
        if (this.viewportItemSize()) {
          this.setViewportPosition(scrollTop);
        }
      });
    },
    dispose() {
      clearTimeout(this._scrollTimeoutID);
      this._windowScroll && this._windowScroll.dispose();
      this._windowScroll = null;
    },
    scrollTo(pos) {
      this._windowScroll && this._windowScroll.scrollTo(pos);
    },
    isVirtualMode() {
      return isVirtualMode(this);
    },
    isAppendMode() {
      return isAppendMode(this);
    },
    // new mode
    getViewportParams() {
      var _a;
      var virtualMode = this.option('scrolling.mode') === SCROLLING_MODE_VIRTUAL;
      var totalItemsCount = this._dataOptions.totalItemsCount();
      var hasKnownLastPage = this._dataOptions.hasKnownLastPage();
      var topIndex = hasKnownLastPage && this._viewportItemIndex > totalItemsCount ? totalItemsCount : this._viewportItemIndex;
      var bottomIndex = this._viewportSize + topIndex;
      var maxGap = this.option('scrolling.prerenderedRowChunkSize') || 1;
      var isScrollingBack = this.isScrollingBack();
      var minGap = (_a = this.option('scrolling.prerenderedRowCount')) !== null && _a !== void 0 ? _a : 1;
      var topMinGap = isScrollingBack ? minGap : 0;
      var bottomMinGap = isScrollingBack ? 0 : minGap;
      var skip = Math.floor(Math.max(0, topIndex - topMinGap) / maxGap) * maxGap;
      var take = Math.ceil((bottomIndex + bottomMinGap - skip) / maxGap) * maxGap;
      if (virtualMode) {
        var remainedItems = Math.max(0, totalItemsCount - skip);
        take = Math.min(take, remainedItems);
      }
      return {
        skip,
        take
      };
    },
    itemsCount() {
      var result = 0;
      if (this.option(LEGACY_SCROLLING_MODE)) {
        result = this._dataLoader.itemsCount.apply(this._dataLoader, arguments);
      } else {
        result = this._dataOptions.itemsCount();
      }
      return result;
    }
  };
  ['pageIndex', 'beginPageIndex', 'endPageIndex', 'pageSize', 'load', 'loadIfNeed', 'handleDataChanged', 'getDelayDeferred'].forEach(name => {
    members[name] = function () {
      return this._dataLoader[name].apply(this._dataLoader, arguments);
    };
  });
  return members;
}());
export default {
  VirtualScrollController
};
export { subscribeToExternalScrollers, VirtualScrollController };
