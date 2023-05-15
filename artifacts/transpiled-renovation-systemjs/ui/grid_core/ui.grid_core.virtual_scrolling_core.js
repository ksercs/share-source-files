!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.virtual_scrolling_core.js"], ["../../core/renderer","../../core/utils/window","../../events/core/events_engine","../../core/utils/browser","../../animation/position","../../core/utils/iterator","../../core/class","../../core/utils/deferred","../../core/utils/callbacks","./ui.grid.core.virtual_data_loader","../../core/utils/type","./ui.grid_core.utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.virtual_scrolling_core.js", ["../../core/renderer", "../../core/utils/window", "../../events/core/events_engine", "../../core/utils/browser", "../../animation/position", "../../core/utils/iterator", "../../core/class", "../../core/utils/deferred", "../../core/utils/callbacks", "./ui.grid.core.virtual_data_loader", "../../core/utils/type", "./ui.grid_core.utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.VirtualScrollController = void 0;
  exports.subscribeToExternalScrollers = subscribeToExternalScrollers;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _window = $__require("../../core/utils/window");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _browser = _interopRequireDefault($__require("../../core/utils/browser"));
  var _position2 = _interopRequireDefault($__require("../../animation/position"));
  var _iterator = $__require("../../core/utils/iterator");
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _deferred = $__require("../../core/utils/deferred");
  var _callbacks = _interopRequireDefault($__require("../../core/utils/callbacks"));
  var _uiGridCore = $__require("./ui.grid.core.virtual_data_loader");
  var _type = $__require("../../core/utils/type");
  var _uiGrid_core = _interopRequireDefault($__require("./ui.grid_core.utils"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var SCROLLING_MODE_INFINITE = 'infinite';
  var SCROLLING_MODE_VIRTUAL = 'virtual';
  var LEGACY_SCROLLING_MODE = 'scrolling.legacyMode';
  var _isVirtualMode = function isVirtualMode(that) {
    return that.option('scrolling.mode') === SCROLLING_MODE_VIRTUAL || that._isVirtual;
  };
  var _isAppendMode = function isAppendMode(that) {
    return that.option('scrolling.mode') === SCROLLING_MODE_INFINITE && !that._isVirtual;
  };
  function subscribeToExternalScrollers($element, scrollChangedHandler, $targetElement) {
    var $scrollElement;
    var scrollableArray = [];
    var scrollToArray = [];
    var disposeArray = [];
    $targetElement = $targetElement || $element;
    function getElementOffset(scrollable) {
      var $scrollableElement = scrollable.element ? scrollable.$element() : scrollable;
      var scrollableOffset = _position2.default.offset($scrollableElement);
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
      on: function on(scrollable, eventName, handler) {
        scrollable.on('scroll', handler);
      },
      off: function off(scrollable, eventName, handler) {
        scrollable.off('scroll', handler);
      }
    };
    function subscribeToScrollEvents($scrollElement) {
      var isDocument = $scrollElement.get(0).nodeName === '#document';
      var isElement = $scrollElement.get(0).nodeType === (0, _window.getWindow)().Node.ELEMENT_NODE;
      var scrollable = $scrollElement.data('dxScrollable');
      var eventsStrategy = widgetScrollStrategy;
      if (!scrollable) {
        scrollable = isDocument && (0, _renderer.default)((0, _window.getWindow)()) || isElement && $scrollElement.css('overflowY') === 'auto' && $scrollElement;
        eventsStrategy = _events_engine.default;
        if (!scrollable) return;
      }
      var handler = createWindowScrollHandler(scrollable);
      eventsStrategy.on(scrollable, 'scroll', handler);
      scrollToArray.push(function (pos) {
        var topOffset = getElementOffset(scrollable);
        var scrollMethod = scrollable.scrollTo ? 'scrollTo' : 'scrollTop';
        if (pos - topOffset >= 0) {
          scrollable[scrollMethod](pos + topOffset);
        }
      });
      scrollableArray.push(scrollable);
      disposeArray.push(function () {
        eventsStrategy.off(scrollable, 'scroll', handler);
      });
    }
    var getScrollElementParent = function getScrollElementParent($element) {
      var _$element$get$parentN;
      return (0, _renderer.default)((_$element$get$parentN = $element.get(0).parentNode) !== null && _$element$get$parentN !== void 0 ? _$element$get$parentN : $element.get(0).host);
    };
    for ($scrollElement = $targetElement.parent(); $scrollElement.length; $scrollElement = getScrollElementParent($scrollElement)) {
      subscribeToScrollEvents($scrollElement);
    }
    return {
      scrollTo: function scrollTo(pos) {
        (0, _iterator.each)(scrollToArray, function (_, scrollTo) {
          scrollTo(pos);
        });
      },
      dispose: function dispose() {
        (0, _iterator.each)(disposeArray, function (_, dispose) {
          dispose();
        });
      }
    };
  }
  var VirtualScrollController = _class.default.inherit(function () {
    var members = {
      ctor: function ctor(component, dataOptions, isVirtual) {
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
        this.positionChanged = (0, _callbacks.default)();
        this._dataLoader = new _uiGridCore.VirtualDataLoader(this, this._dataOptions);
      },
      getItemSizes: function getItemSizes() {
        return this._itemSizes;
      },
      option: function option() {
        return this.component.option.apply(this.component, arguments);
      },
      isVirtual: function isVirtual() {
        return this._isVirtual;
      },
      virtualItemsCount: function virtualItemsCount() {
        if (_isVirtualMode(this)) {
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
      getScrollingTimeout: function getScrollingTimeout() {
        var renderAsync = this.option('scrolling.renderAsync');
        var scrollingTimeout = 0;
        if (!(0, _type.isDefined)(renderAsync)) {
          scrollingTimeout = Math.min(this.option('scrolling.timeout') || 0, this._dataOptions.changingDuration());
          if (scrollingTimeout < this.option('scrolling.renderingThreshold')) {
            scrollingTimeout = this.option('scrolling.minTimeout') || 0;
          }
        } else if (renderAsync) {
          var _this$option;
          scrollingTimeout = (_this$option = this.option('scrolling.timeout')) !== null && _this$option !== void 0 ? _this$option : 0;
        }
        return scrollingTimeout;
      },
      setViewportPosition: function setViewportPosition(position) {
        var _this = this;
        var result = new _deferred.Deferred();
        var scrollingTimeout = this.getScrollingTimeout();
        clearTimeout(this._scrollTimeoutID);
        if (scrollingTimeout > 0) {
          this._scrollTimeoutID = setTimeout(function () {
            _this._setViewportPositionCore(position);
            result.resolve();
          }, scrollingTimeout);
        } else {
          this._setViewportPositionCore(position);
          result.resolve();
        }
        return result.promise();
      },
      getViewportPosition: function getViewportPosition() {
        return this._position;
      },
      getItemIndexByPosition: function getItemIndexByPosition(position, viewportItemIndex, height) {
        var _position;
        position = (_position = position) !== null && _position !== void 0 ? _position : this._position;
        var defaultItemSize = this.getItemSize();
        var offset = 0;
        var itemOffset = 0;
        var itemOffsetsWithSize = Object.keys(this._itemSizes).concat(-1);
        for (var i = 0; i < itemOffsetsWithSize.length && offset < position; i++) {
          var itemOffsetWithSize = parseInt(itemOffsetsWithSize[i]);
          var itemOffsetDiff = (position - offset) / defaultItemSize;
          if (itemOffsetWithSize < 0 || itemOffset + itemOffsetDiff < itemOffsetWithSize) {
            itemOffset += itemOffsetDiff;
            if (this._sizeRatio < 1 && (0, _type.isDefined)(viewportItemIndex)) {
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
      isScrollingBack: function isScrollingBack() {
        return this._isScrollingBack;
      },
      _setViewportPositionCore: function _setViewportPositionCore(position) {
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
      setContentItemSizes: function setContentItemSizes(sizes) {
        var _this2 = this;
        var virtualItemsCount = this.virtualItemsCount();
        this._contentSize = sizes.reduce(function (a, b) {
          return a + b;
        }, 0);
        if (virtualItemsCount) {
          sizes.forEach(function (size, index) {
            _this2._itemSizes[virtualItemsCount.begin + index] = size;
          });
          var virtualContentSize = (virtualItemsCount.begin + virtualItemsCount.end + this.itemsCount()) * this._viewportItemSize;
          var contentHeightLimit = _uiGrid_core.default.getContentHeightLimit(_browser.default);
          if (virtualContentSize > contentHeightLimit) {
            this._sizeRatio = contentHeightLimit / virtualContentSize;
          } else {
            this._sizeRatio = 1;
          }
        }
      },
      getItemSize: function getItemSize() {
        return this._viewportItemSize * this._sizeRatio;
      },
      getItemOffset: function getItemOffset(itemIndex, isEnd) {
        var _this3 = this;
        var virtualItemsCount = this.virtualItemsCount();
        var itemCount = itemIndex;
        if (!virtualItemsCount) return 0;
        var offset = 0;
        var totalItemsCount = this._dataOptions.totalItemsCount();
        Object.keys(this._itemSizes).forEach(function (currentItemIndex) {
          if (!itemCount) return;
          if (isEnd ? currentItemIndex >= totalItemsCount - itemIndex : currentItemIndex < itemIndex) {
            offset += _this3._itemSizes[currentItemIndex];
            itemCount--;
          }
        });
        return Math.floor(offset + itemCount * this._viewportItemSize * this._sizeRatio);
      },
      getContentOffset: function getContentOffset(type) {
        var isEnd = type === 'end';
        var virtualItemsCount = this.virtualItemsCount();
        if (!virtualItemsCount) return 0;
        return this.getItemOffset(isEnd ? virtualItemsCount.end : virtualItemsCount.begin, isEnd);
      },
      getVirtualContentSize: function getVirtualContentSize() {
        var virtualItemsCount = this.virtualItemsCount();
        return virtualItemsCount ? this.getContentOffset('begin') + this.getContentOffset('end') + this._contentSize : 0;
      },
      getViewportItemIndex: function getViewportItemIndex() {
        return this._viewportItemIndex;
      },
      setViewportItemIndex: function setViewportItemIndex(itemIndex) {
        this._viewportItemIndex = itemIndex;
        if (this.option(LEGACY_SCROLLING_MODE) === false) {
          return;
        }
        return this._dataLoader.viewportItemIndexChanged.apply(this._dataLoader, arguments);
      },
      viewportItemSize: function viewportItemSize(size) {
        if (size !== undefined) {
          this._viewportItemSize = size;
        }
        return this._viewportItemSize;
      },
      viewportSize: function viewportSize(size) {
        if (size !== undefined) {
          this._viewportSize = size;
        }
        return this._viewportSize;
      },
      viewportHeight: function viewportHeight(height, scrollTop) {
        var position = scrollTop !== null && scrollTop !== void 0 ? scrollTop : this._position;
        var begin = this.getItemIndexByPosition(position);
        var end = this.getItemIndexByPosition(position + height, begin, height);
        this.viewportSize(Math.ceil(end - begin));
        if (!(0, _type.isDefined)(scrollTop) && this._viewportItemIndex !== begin) {
          this._setViewportPositionCore(position);
        }
      },
      reset: function reset(isRefresh) {
        this._dataLoader.reset();
        if (!isRefresh) {
          this._itemSizes = {};
        }
      },
      subscribeToWindowScrollEvents: function subscribeToWindowScrollEvents($element) {
        var _this4 = this;
        this._windowScroll = this._windowScroll || subscribeToExternalScrollers($element, function (scrollTop) {
          if (_this4.viewportItemSize()) {
            _this4.setViewportPosition(scrollTop);
          }
        });
      },
      dispose: function dispose() {
        clearTimeout(this._scrollTimeoutID);
        this._windowScroll && this._windowScroll.dispose();
        this._windowScroll = null;
      },
      scrollTo: function scrollTo(pos) {
        this._windowScroll && this._windowScroll.scrollTo(pos);
      },
      isVirtualMode: function isVirtualMode() {
        return _isVirtualMode(this);
      },
      isAppendMode: function isAppendMode() {
        return _isAppendMode(this);
      },
      // new mode
      getViewportParams: function getViewportParams() {
        var _this$option2;
        var virtualMode = this.option('scrolling.mode') === SCROLLING_MODE_VIRTUAL;
        var totalItemsCount = this._dataOptions.totalItemsCount();
        var hasKnownLastPage = this._dataOptions.hasKnownLastPage();
        var topIndex = hasKnownLastPage && this._viewportItemIndex > totalItemsCount ? totalItemsCount : this._viewportItemIndex;
        var bottomIndex = this._viewportSize + topIndex;
        var maxGap = this.option('scrolling.prerenderedRowChunkSize') || 1;
        var isScrollingBack = this.isScrollingBack();
        var minGap = (_this$option2 = this.option('scrolling.prerenderedRowCount')) !== null && _this$option2 !== void 0 ? _this$option2 : 1;
        var topMinGap = isScrollingBack ? minGap : 0;
        var bottomMinGap = isScrollingBack ? 0 : minGap;
        var skip = Math.floor(Math.max(0, topIndex - topMinGap) / maxGap) * maxGap;
        var take = Math.ceil((bottomIndex + bottomMinGap - skip) / maxGap) * maxGap;
        if (virtualMode) {
          var remainedItems = Math.max(0, totalItemsCount - skip);
          take = Math.min(take, remainedItems);
        }
        return {
          skip: skip,
          take: take
        };
      },
      itemsCount: function itemsCount() {
        var result = 0;
        if (this.option(LEGACY_SCROLLING_MODE)) {
          result = this._dataLoader.itemsCount.apply(this._dataLoader, arguments);
        } else {
          result = this._dataOptions.itemsCount();
        }
        return result;
      }
    };
    ['pageIndex', 'beginPageIndex', 'endPageIndex', 'pageSize', 'load', 'loadIfNeed', 'handleDataChanged', 'getDelayDeferred'].forEach(function (name) {
      members[name] = function () {
        return this._dataLoader[name].apply(this._dataLoader, arguments);
      };
    });
    return members;
  }());
  exports.VirtualScrollController = VirtualScrollController;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/window","../../events/core/events_engine","../../core/utils/browser","../../animation/position","../../core/utils/iterator","../../core/class","../../core/utils/deferred","../../core/utils/callbacks","./ui.grid.core.virtual_data_loader","../../core/utils/type","./ui.grid_core.utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/window"), require("../../events/core/events_engine"), require("../../core/utils/browser"), require("../../animation/position"), require("../../core/utils/iterator"), require("../../core/class"), require("../../core/utils/deferred"), require("../../core/utils/callbacks"), require("./ui.grid.core.virtual_data_loader"), require("../../core/utils/type"), require("./ui.grid_core.utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.virtual_scrolling_core.js.map