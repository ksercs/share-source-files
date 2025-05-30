/**
* DevExtreme (bundles/__internal/grids/grid_core/virtual_data_loader/m_virtual_data_loader.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualDataLoader = void 0;
var _deferred = require("../../../../core/utils/deferred");
var _type = require("../../../../core/utils/type");
var LEGACY_SCROLLING_MODE = 'scrolling.legacyMode';
var needTwoPagesLoading = function needTwoPagesLoading(that) {
  return that.option('scrolling.loadTwoPagesOnStart') || that._controller.isVirtual() || that._controller.getViewportItemIndex() > 0;
};
var getBeginPageIndex = function getBeginPageIndex(that) {
  return that._cache.length ? that._cache[0].pageIndex : -1;
};
var getEndPageIndex = function getEndPageIndex(that) {
  return that._cache.length ? that._cache[that._cache.length - 1].pageIndex : -1;
};
var fireChanged = function fireChanged(that, changed, args) {
  that._isChangedFiring = true;
  changed(args);
  that._isChangedFiring = false;
};
var processDelayChanged = function processDelayChanged(that, changed, args) {
  if (that._isDelayChanged) {
    that._isDelayChanged = false;
    fireChanged(that, changed, args);
    return true;
  }
};
var getViewportPageCount = function getViewportPageCount(that) {
  var pageSize = that._dataOptions.pageSize();
  var preventPreload = that.option('scrolling.preventPreload');
  if (preventPreload) {
    return 0;
  }
  var realViewportSize = that._controller.viewportSize();
  if (that._controller.isVirtualMode() && that.option('scrolling.removeInvisiblePages')) {
    realViewportSize = 0;
    var viewportSize = that._controller.viewportSize() * that._controller.viewportItemSize();
    var offset = that._controller.getContentOffset();
    var position = that._controller.getViewportPosition();
    var virtualItemsCount = that._controller.virtualItemsCount();
    var totalItemsCount = that._dataOptions.totalItemsCount();
    for (var itemIndex = virtualItemsCount.begin; itemIndex < totalItemsCount; itemIndex++) {
      if (offset >= position + viewportSize) break;
      var itemSize = that._controller.getItemSizes()[itemIndex] || that._controller.viewportItemSize();
      offset += itemSize;
      if (offset >= position) {
        realViewportSize++;
      }
    }
  }
  return pageSize && realViewportSize > 0 ? Math.ceil(realViewportSize / pageSize) : 1;
};
var getPreloadPageCount = function getPreloadPageCount(that, previous) {
  var preloadEnabled = that.option('scrolling.preloadEnabled');
  var pageCount = getViewportPageCount(that);
  var isAppendMode = that._controller.isAppendMode();
  if (pageCount) {
    if (previous) {
      pageCount = preloadEnabled ? 1 : 0;
    } else {
      if (preloadEnabled) {
        pageCount++;
      }
      if (isAppendMode || !needTwoPagesLoading(that)) {
        pageCount--;
      }
    }
  }
  return pageCount;
};
var getPageIndexForLoad = function getPageIndexForLoad(that) {
  var result = -1;
  var beginPageIndex = getBeginPageIndex(that);
  var dataOptions = that._dataOptions;
  if (beginPageIndex < 0) {
    result = that._pageIndex;
  } else if (!that._cache[that._pageIndex - beginPageIndex]) {
    result = that._pageIndex;
  } else if (beginPageIndex >= 0 && that._controller.viewportSize() >= 0) {
    if (beginPageIndex > 0) {
      var needToLoadPageBeforeLast = getEndPageIndex(that) + 1 === dataOptions.pageCount() && that._cache.length < getPreloadPageCount(that) + 1;
      var needToLoadPrevPage = needToLoadPageBeforeLast || that._pageIndex === beginPageIndex && getPreloadPageCount(that, true);
      if (needToLoadPrevPage) {
        result = beginPageIndex - 1;
      }
    }
    if (result < 0) {
      var needToLoadNextPage = beginPageIndex + that._cache.length <= that._pageIndex + getPreloadPageCount(that);
      if (needToLoadNextPage) {
        result = beginPageIndex + that._cache.length;
      }
    }
  }
  if (that._loadingPageIndexes[result]) {
    result = -1;
  }
  return result;
};
var loadCore = function loadCore(that, pageIndex) {
  var dataOptions = that._dataOptions;
  if (pageIndex === that.pageIndex() || !dataOptions.isLoading() && pageIndex < dataOptions.pageCount() || !dataOptions.hasKnownLastPage() && pageIndex === dataOptions.pageCount()) {
    dataOptions.pageIndex(pageIndex);
    that._loadingPageIndexes[pageIndex] = true;
    return (0, _deferred.when)(dataOptions.load()).always(function () {
      that._loadingPageIndexes[pageIndex] = false;
    });
  }
};
var processChanged = function processChanged(that, changed, changeType, isDelayChanged, removeCacheItem) {
  var dataOptions = that._dataOptions;
  var items = dataOptions.items().slice();
  var change = (0, _type.isObject)(changeType) ? changeType : undefined;
  var isPrepend = changeType === 'prepend';
  var viewportItems = dataOptions.viewportItems();
  if (changeType && (0, _type.isString)(changeType) && !that._isDelayChanged) {
    change = {
      changeType,
      items
    };
    if (removeCacheItem) {
      change.removeCount = removeCacheItem.itemsCount;
      if (change.removeCount && dataOptions.correctCount) {
        change.removeCount = dataOptions.correctCount(viewportItems, change.removeCount, isPrepend);
      }
    }
  }
  var removeItemCount = removeCacheItem ? removeCacheItem.itemsLength : 0;
  if (removeItemCount && dataOptions.correctCount) {
    removeItemCount = dataOptions.correctCount(viewportItems, removeItemCount, isPrepend);
  }
  if (changeType === 'append') {
    viewportItems.push.apply(viewportItems, items);
    if (removeCacheItem) {
      viewportItems.splice(0, removeItemCount);
    }
  } else if (isPrepend) {
    viewportItems.unshift.apply(viewportItems, items);
    if (removeCacheItem) {
      viewportItems.splice(-removeItemCount);
    }
  } else {
    that._dataOptions.viewportItems(items);
  }
  dataOptions.updateLoading();
  that._lastPageIndex = that.pageIndex();
  that._isDelayChanged = isDelayChanged;
  if (!isDelayChanged) {
    fireChanged(that, changed, change);
  }
};
var VirtualDataLoader = /*#__PURE__*/function () {
  function VirtualDataLoader(controller, dataOptions) {
    this._dataOptions = dataOptions;
    this._controller = controller;
    this._pageIndex = this._lastPageIndex = dataOptions.pageIndex();
    this._cache = [];
    this._loadingPageIndexes = {};
  }
  var _proto = VirtualDataLoader.prototype;
  _proto.option = function option() {
    return this._controller.option.apply(this._controller, arguments);
  };
  _proto.viewportItemIndexChanged = function viewportItemIndexChanged(itemIndex) {
    var pageSize = this._dataOptions.pageSize();
    var pageCount = this._dataOptions.pageCount();
    var virtualMode = this._controller.isVirtualMode();
    var appendMode = this._controller.isAppendMode();
    var totalItemsCount = this._dataOptions.totalItemsCount();
    var newPageIndex;
    if (pageSize && (virtualMode || appendMode) && totalItemsCount >= 0) {
      var viewportSize = this._controller.viewportSize();
      if (viewportSize && itemIndex + viewportSize >= totalItemsCount && !this._controller.isVirtual()) {
        if (this._dataOptions.hasKnownLastPage()) {
          newPageIndex = pageCount - 1;
          var lastPageSize = totalItemsCount % pageSize;
          if (newPageIndex > 0 && lastPageSize > 0 && lastPageSize < viewportSize) {
            newPageIndex--;
          }
        } else {
          newPageIndex = pageCount;
        }
      } else {
        newPageIndex = Math.floor(itemIndex / pageSize);
        var maxPageIndex = pageCount - 1;
        newPageIndex = Math.max(newPageIndex, 0);
        newPageIndex = Math.min(newPageIndex, maxPageIndex);
      }
      this.pageIndex(newPageIndex);
      return this.load();
    }
  };
  _proto.pageIndex = function pageIndex(_pageIndex) {
    var isVirtualMode = this._controller.isVirtualMode();
    var isAppendMode = this._controller.isAppendMode();
    // @ts-expect-error
    if (this.option(LEGACY_SCROLLING_MODE) !== false && (isVirtualMode || isAppendMode)) {
      if (_pageIndex !== undefined) {
        this._pageIndex = _pageIndex;
      }
      return this._pageIndex;
    }
    return this._dataOptions.pageIndex(_pageIndex);
  };
  _proto.beginPageIndex = function beginPageIndex(defaultPageIndex) {
    var beginPageIndex = getBeginPageIndex(this);
    if (beginPageIndex < 0) {
      beginPageIndex = defaultPageIndex !== undefined ? defaultPageIndex : this.pageIndex();
    }
    return beginPageIndex;
  };
  _proto.endPageIndex = function endPageIndex() {
    var endPageIndex = getEndPageIndex(this);
    return endPageIndex > 0 ? endPageIndex : this._lastPageIndex;
  };
  _proto.pageSize = function pageSize() {
    return this._dataOptions.pageSize();
  };
  _proto.load = function load() {
    var _this = this;
    var dataOptions = this._dataOptions;
    var result;
    var isVirtualMode = this._controller.isVirtualMode();
    var isAppendMode = this._controller.isAppendMode();
    // @ts-expect-error
    if (this.option(LEGACY_SCROLLING_MODE) !== false && (isVirtualMode || isAppendMode)) {
      var pageIndexForLoad = getPageIndexForLoad(this);
      if (pageIndexForLoad >= 0) {
        var loadResult = loadCore(this, pageIndexForLoad);
        if (loadResult) {
          // @ts-expect-error
          result = new _deferred.Deferred();
          loadResult.done(function () {
            var delayDeferred = _this._delayDeferred;
            if (delayDeferred) {
              delayDeferred.done(result.resolve).fail(result.reject);
            } else {
              result.resolve();
            }
          }).fail(result.reject);
          dataOptions.updateLoading();
        }
      }
    } else {
      result = dataOptions.load();
    }
    if (!result && this._lastPageIndex !== this.pageIndex()) {
      this._dataOptions.onChanged({
        changeType: 'pageIndex'
      });
    }
    // @ts-expect-error
    return result || new _deferred.Deferred().resolve();
  };
  _proto.loadIfNeed = function loadIfNeed() {
    var isVirtualMode = this._controller.isVirtualMode();
    var isAppendMode = this._controller.isAppendMode();
    if ((isVirtualMode || isAppendMode) && !this._dataOptions.isLoading() && (!this._isChangedFiring || this._controller.isVirtual())) {
      var position = this._controller.getViewportPosition();
      if (position > 0) {
        this._controller._setViewportPositionCore(position);
      } else {
        this.load();
      }
    }
  };
  _proto.handleDataChanged = function handleDataChanged(callBase, e) {
    var _this2 = this;
    var dataOptions = this._dataOptions;
    var lastCacheLength = this._cache.length;
    var changeType;
    var removeInvisiblePages;
    var isVirtualMode = this._controller.isVirtualMode();
    var isAppendMode = this._controller.isAppendMode();
    if (e && e.changes) {
      fireChanged(this, callBase, e);
      // @ts-expect-error
    } else if (this.option(LEGACY_SCROLLING_MODE) !== false && (isVirtualMode || isAppendMode)) {
      var beginPageIndex = getBeginPageIndex(this);
      if (beginPageIndex >= 0) {
        if (isVirtualMode && beginPageIndex + this._cache.length !== dataOptions.pageIndex() && beginPageIndex - 1 !== dataOptions.pageIndex()) {
          lastCacheLength = 0;
          this._cache = [];
        }
        if (isAppendMode) {
          if (dataOptions.pageIndex() === 0) {
            this._cache = [];
          } else if (dataOptions.pageIndex() < getEndPageIndex(this)) {
            fireChanged(this, callBase, {
              changeType: 'append',
              items: []
            });
            return;
          }
        }
      }
      var cacheItem = {
        pageIndex: dataOptions.pageIndex(),
        itemsLength: dataOptions.items(true).length,
        itemsCount: this.itemsCount(true)
      };
      // @ts-expect-error
      if (this.option('scrolling.removeInvisiblePages') && isVirtualMode) {
        // @ts-expect-error
        removeInvisiblePages = this._cache.length > Math.max(getPreloadPageCount(this) + (this.option('scrolling.preloadEnabled') ? 1 : 0), 2);
      } else {
        processDelayChanged(this, callBase, {
          isDelayed: true
        });
      }
      var removeCacheItem;
      if (beginPageIndex === dataOptions.pageIndex() + 1) {
        if (removeInvisiblePages) {
          removeCacheItem = this._cache.pop();
        }
        changeType = 'prepend';
        this._cache.unshift(cacheItem);
      } else {
        if (removeInvisiblePages) {
          removeCacheItem = this._cache.shift();
        }
        changeType = 'append';
        this._cache.push(cacheItem);
      }
      var isDelayChanged = isVirtualMode && lastCacheLength === 0 && needTwoPagesLoading(this);
      processChanged(this, callBase, this._cache.length > 1 ? changeType : undefined, isDelayChanged, removeCacheItem);
      this._delayDeferred = this.load().done(function () {
        if (processDelayChanged(_this2, callBase)) {
          _this2.load(); // needed for infinite scrolling when height is not defined
        }
      });
    } else {
      processChanged(this, callBase, e);
    }
  };
  _proto.getDelayDeferred = function getDelayDeferred() {
    return this._delayDeferred;
  };
  _proto.itemsCount = function itemsCount(isBase) {
    var itemsCount = 0;
    var isVirtualMode = this._controller.isVirtualMode();
    if (!isBase && isVirtualMode) {
      this._cache.forEach(function (cacheItem) {
        itemsCount += cacheItem.itemsCount;
      });
    } else {
      itemsCount = this._dataOptions.itemsCount();
    }
    return itemsCount;
  };
  _proto.virtualItemsCount = function virtualItemsCount() {
    var pageIndex = getBeginPageIndex(this);
    if (pageIndex < 0) {
      pageIndex = this._dataOptions.pageIndex();
    }
    var beginItemsCount = pageIndex * this._dataOptions.pageSize();
    var itemsCount = this._cache.length * this._dataOptions.pageSize();
    var endItemsCount = Math.max(0, this._dataOptions.totalItemsCount() - itemsCount - beginItemsCount);
    return {
      begin: beginItemsCount,
      end: endItemsCount
    };
  };
  _proto.reset = function reset() {
    this._loadingPageIndexes = {};
    this._cache = [];
  };
  return VirtualDataLoader;
}();
exports.VirtualDataLoader = VirtualDataLoader;
