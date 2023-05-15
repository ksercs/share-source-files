!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/multi_view.js"], ["../core/utils/size","../core/renderer","../animation/translator","./multi_view/ui.multi_view.animation","../core/utils/math","../core/utils/extend","../core/utils/common","../events/visibility_change","../core/element","../core/utils/type","../core/devices","../core/component_registrator","./collection/ui.collection_widget.live_update","../events/gesture/swipeable","../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/multi_view.js", ["../core/utils/size", "../core/renderer", "../animation/translator", "./multi_view/ui.multi_view.animation", "../core/utils/math", "../core/utils/extend", "../core/utils/common", "../events/visibility_change", "../core/element", "../core/utils/type", "../core/devices", "../core/component_registrator", "./collection/ui.collection_widget.live_update", "../events/gesture/swipeable", "../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _translator2 = $__require("../animation/translator");
  var _uiMulti_view = $__require("./multi_view/ui.multi_view.animation");
  var _math = $__require("../core/utils/math");
  var _extend = $__require("../core/utils/extend");
  var _common = $__require("../core/utils/common");
  var _visibility_change = $__require("../events/visibility_change");
  var _element = $__require("../core/element");
  var _type = $__require("../core/utils/type");
  var _devices = _interopRequireDefault($__require("../core/devices"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _uiCollection_widget = _interopRequireDefault($__require("./collection/ui.collection_widget.live_update"));
  var _swipeable = _interopRequireDefault($__require("../events/gesture/swipeable"));
  var _deferred = $__require("../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE multiView

  var MULTIVIEW_CLASS = 'dx-multiview';
  var MULTIVIEW_WRAPPER_CLASS = 'dx-multiview-wrapper';
  var MULTIVIEW_ITEM_CONTAINER_CLASS = 'dx-multiview-item-container';
  var MULTIVIEW_ITEM_CLASS = 'dx-multiview-item';
  var MULTIVIEW_ITEM_HIDDEN_CLASS = 'dx-multiview-item-hidden';
  var MULTIVIEW_ITEM_DATA_KEY = 'dxMultiViewItemData';
  var MULTIVIEW_ANIMATION_DURATION = 200;
  var toNumber = function toNumber(value) {
    return +value;
  };
  var position = function position($element) {
    return (0, _translator2.locate)($element).left;
  };
  var MultiView = _uiCollection_widget.default.inherit({
    _activeStateUnit: '.' + MULTIVIEW_ITEM_CLASS,
    _supportedKeys: function _supportedKeys() {
      return (0, _extend.extend)(this.callBase(), {
        pageUp: _common.noop,
        pageDown: _common.noop
      });
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        selectedIndex: 0,
        swipeEnabled: true,
        animationEnabled: true,
        loop: false,
        deferRendering: true,
        /**
        * @name dxMultiViewOptions.selectedItems
        * @hidden
        */

        /**
        * @name dxMultiViewOptions.selectedItemKeys
        * @hidden
        */

        /**
        * @name dxMultiViewOptions.keyExpr
        * @hidden
        */

        _itemAttributes: {
          role: 'tabpanel'
        },
        loopItemFocus: false,
        selectOnFocus: true,
        selectionMode: 'single',
        selectionRequired: true,
        selectByClick: false
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }]);
    },
    _itemClass: function _itemClass() {
      return MULTIVIEW_ITEM_CLASS;
    },
    _itemDataKey: function _itemDataKey() {
      return MULTIVIEW_ITEM_DATA_KEY;
    },
    _itemContainer: function _itemContainer() {
      return this._$itemContainer;
    },
    _itemElements: function _itemElements() {
      return this._itemContainer().children(this._itemSelector());
    },
    _itemWidth: function _itemWidth() {
      if (!this._itemWidthValue) {
        this._itemWidthValue = (0, _size.getWidth)(this._$wrapper);
      }
      return this._itemWidthValue;
    },
    _clearItemWidthCache: function _clearItemWidthCache() {
      delete this._itemWidthValue;
    },
    _itemsCount: function _itemsCount() {
      return this.option('items').length;
    },
    _normalizeIndex: function _normalizeIndex(index) {
      var count = this._itemsCount();
      if (index < 0) {
        index = index + count;
      }
      if (index >= count) {
        index = index - count;
      }
      return index;
    },
    _getRTLSignCorrection: function _getRTLSignCorrection() {
      return this.option('rtlEnabled') ? -1 : 1;
    },
    _init: function _init() {
      this.callBase.apply(this, arguments);
      var $element = this.$element();
      $element.addClass(MULTIVIEW_CLASS);
      this._$wrapper = (0, _renderer.default)('<div>').addClass(MULTIVIEW_WRAPPER_CLASS);
      this._$wrapper.appendTo($element);
      this._$itemContainer = (0, _renderer.default)('<div>').addClass(MULTIVIEW_ITEM_CONTAINER_CLASS);
      this._$itemContainer.appendTo(this._$wrapper);
      this.option('loopItemFocus', this.option('loop'));
      this._findBoundaryIndices();
      this._initSwipeable();
    },
    _initMarkup: function _initMarkup() {
      this._deferredItems = [];
      this.callBase();
      var selectedItemIndices = this._getSelectedItemIndices();
      this._updateItemsVisibility(selectedItemIndices[0]);
    },
    _afterItemElementDeleted: function _afterItemElementDeleted($item, deletedActionArgs) {
      this.callBase($item, deletedActionArgs);
      if (this._deferredItems) {
        this._deferredItems.splice(deletedActionArgs.itemIndex, 1);
      }
    },
    _beforeItemElementInserted: function _beforeItemElementInserted(change) {
      this.callBase.apply(this, arguments);
      if (this._deferredItems) {
        this._deferredItems.splice(change.index, 0, null);
      }
    },
    _executeItemRenderAction: function _executeItemRenderAction(index, itemData, itemElement) {
      index = (this.option('items') || []).indexOf(itemData);
      this.callBase(index, itemData, itemElement);
    },
    _renderItemContent: function _renderItemContent(args) {
      var renderContentDeferred = new _deferred.Deferred();
      var that = this;
      var callBase = this.callBase;
      var deferred = new _deferred.Deferred();
      deferred.done(function () {
        var $itemContent = callBase.call(that, args);
        renderContentDeferred.resolve($itemContent);
      });
      this._deferredItems[args.index] = deferred;
      this.option('deferRendering') || deferred.resolve();
      return renderContentDeferred.promise();
    },
    _render: function _render() {
      var _this = this;
      this.callBase();
      (0, _common.deferRender)(function () {
        var selectedItemIndices = _this._getSelectedItemIndices();
        _this._updateItems(selectedItemIndices[0]);
      });
    },
    _updateItems: function _updateItems(selectedIndex, newIndex) {
      this._updateItemsPosition(selectedIndex, newIndex);
      this._updateItemsVisibility(selectedIndex, newIndex);
    },
    _modifyByChanges: function _modifyByChanges() {
      this.callBase.apply(this, arguments);
      var selectedItemIndices = this._getSelectedItemIndices();
      this._updateItemsVisibility(selectedItemIndices[0]);
    },
    _updateItemsPosition: function _updateItemsPosition(selectedIndex, newIndex) {
      var $itemElements = this._itemElements();
      var positionSign = (0, _type.isDefined)(newIndex) ? -this._animationDirection(newIndex, selectedIndex) : undefined;
      var $selectedItem = $itemElements.eq(selectedIndex);
      _uiMulti_view._translator.move($selectedItem, 0);
      if ((0, _type.isDefined)(newIndex)) {
        _uiMulti_view._translator.move($itemElements.eq(newIndex), positionSign * 100 + '%');
      }
    },
    _updateItemsVisibility: function _updateItemsVisibility(selectedIndex, newIndex) {
      var $itemElements = this._itemElements();
      $itemElements.each(function (itemIndex, item) {
        var $item = (0, _renderer.default)(item);
        var isHidden = itemIndex !== selectedIndex && itemIndex !== newIndex;
        if (!isHidden) {
          this._renderSpecificItem(itemIndex);
        }
        $item.toggleClass(MULTIVIEW_ITEM_HIDDEN_CLASS, isHidden);
        this.setAria('hidden', isHidden || undefined, $item);
      }.bind(this));
    },
    _renderSpecificItem: function _renderSpecificItem(index) {
      var $item = this._itemElements().eq(index);
      var hasItemContent = $item.find(this._itemContentClass()).length > 0;
      if ((0, _type.isDefined)(index) && !hasItemContent) {
        this._deferredItems[index].resolve();
        (0, _visibility_change.triggerResizeEvent)($item);
      }
    },
    _refreshItem: function _refreshItem($item, item) {
      this.callBase($item, item);
      this._updateItemsVisibility(this.option('selectedIndex'));
    },
    _setAriaSelectionAttribute: _common.noop,
    _updateSelection: function _updateSelection(addedSelection, removedSelection) {
      var newIndex = addedSelection[0];
      var prevIndex = removedSelection[0];
      _uiMulti_view.animation.complete(this._$itemContainer);
      this._updateItems(prevIndex, newIndex);
      var animationDirection = this._animationDirection(newIndex, prevIndex);
      this._animateItemContainer(animationDirection * this._itemWidth(), function () {
        _uiMulti_view._translator.move(this._$itemContainer, 0);
        this._updateItems(newIndex);

        // NOTE: force layout recalculation on iOS 6 & iOS 7.0 (B254713)
        (0, _size.getWidth)(this._$itemContainer);
      }.bind(this));
    },
    _animateItemContainer: function _animateItemContainer(position, completeCallback) {
      var duration = this.option('animationEnabled') ? MULTIVIEW_ANIMATION_DURATION : 0;
      _uiMulti_view.animation.moveTo(this._$itemContainer, position, duration, completeCallback);
    },
    _animationDirection: function _animationDirection(newIndex, prevIndex) {
      var containerPosition = position(this._$itemContainer);
      var indexDifference = (prevIndex - newIndex) * this._getRTLSignCorrection() * this._getItemFocusLoopSignCorrection();
      var isSwipePresent = containerPosition !== 0;
      var directionSignVariable = isSwipePresent ? containerPosition : indexDifference;
      return (0, _math.sign)(directionSignVariable);
    },
    _getSwipeDisabledState: function _getSwipeDisabledState() {
      return !this.option('swipeEnabled') || this._itemsCount() <= 1;
    },
    _initSwipeable: function _initSwipeable() {
      var _this2 = this;
      this._createComponent(this.$element(), _swipeable.default, {
        disabled: this._getSwipeDisabledState(),
        elastic: false,
        itemSizeFunc: this._itemWidth.bind(this),
        onStart: function onStart(args) {
          return _this2._swipeStartHandler(args.event);
        },
        onUpdated: function onUpdated(args) {
          return _this2._swipeUpdateHandler(args.event);
        },
        onEnd: function onEnd(args) {
          return _this2._swipeEndHandler(args.event);
        }
      });
    },
    _findBoundaryIndices: function _findBoundaryIndices() {
      var _firstIndex2, _lastIndex;
      var items = this.option('items');
      var firstIndex;
      var lastIndex;
      items.forEach(function (item, index) {
        var isDisabled = Boolean(item === null || item === void 0 ? void 0 : item.disabled);
        if (!isDisabled) {
          var _firstIndex;
          (_firstIndex = firstIndex) !== null && _firstIndex !== void 0 ? _firstIndex : firstIndex = index;
          lastIndex = index;
        }
      });
      this._boundaryIndices = {
        firstIndex: (_firstIndex2 = firstIndex) !== null && _firstIndex2 !== void 0 ? _firstIndex2 : 0,
        lastIndex: (_lastIndex = lastIndex) !== null && _lastIndex !== void 0 ? _lastIndex : items.length - 1
      };
    },
    _swipeStartHandler: function _swipeStartHandler(e) {
      _uiMulti_view.animation.complete(this._$itemContainer);
      var selectedIndex = this.option('selectedIndex');
      var loop = this.option('loop');
      var _this$_boundaryIndice = this._boundaryIndices,
          firstIndex = _this$_boundaryIndice.firstIndex,
          lastIndex = _this$_boundaryIndice.lastIndex;
      var rtl = this.option('rtlEnabled');
      e.maxLeftOffset = toNumber(loop || (rtl ? selectedIndex > firstIndex : selectedIndex < lastIndex));
      e.maxRightOffset = toNumber(loop || (rtl ? selectedIndex < lastIndex : selectedIndex > firstIndex));
      this._swipeDirection = null;
    },
    _swipeUpdateHandler: function _swipeUpdateHandler(e) {
      var offset = e.offset;
      var swipeDirection = (0, _math.sign)(offset) * this._getRTLSignCorrection();
      _uiMulti_view._translator.move(this._$itemContainer, offset * this._itemWidth());
      if (swipeDirection !== this._swipeDirection) {
        this._swipeDirection = swipeDirection;
        var selectedIndex = this.option('selectedIndex');
        var newIndex = this._normalizeIndex(selectedIndex - swipeDirection);
        this._updateItems(selectedIndex, newIndex);
      }
    },
    _findNextAvailableIndex: function _findNextAvailableIndex(index, offset) {
      var _this$option = this.option(),
          items = _this$option.items,
          loop = _this$option.loop;
      var _this$_boundaryIndice2 = this._boundaryIndices,
          firstIndex = _this$_boundaryIndice2.firstIndex,
          lastIndex = _this$_boundaryIndice2.lastIndex;
      if (loop) {
        if (index === firstIndex) {
          return lastIndex;
        } else if (index === lastIndex) {
          return firstIndex;
        }
      }
      for (var i = index + offset; i >= firstIndex && i <= lastIndex; i += offset) {
        var isDisabled = Boolean(items[i].disabled);
        if (!isDisabled) {
          return i;
        }
      }
      return index;
    },
    _swipeEndHandler: function _swipeEndHandler(e) {
      var targetOffset = e.targetOffset * this._getRTLSignCorrection();
      if (targetOffset) {
        var newSelectedIndex = this._findNextAvailableIndex(this.option('selectedIndex'), -targetOffset);
        this.option('selectedIndex', newSelectedIndex);

        // TODO: change focusedElement on focusedItem
        var $selectedElement = this.itemElements().filter('.dx-item-selected');
        this.option('focusStateEnabled') && this.option('focusedElement', (0, _element.getPublicElement)($selectedElement));
      } else {
        this._animateItemContainer(0, _common.noop);
      }
    },
    _getItemFocusLoopSignCorrection: function _getItemFocusLoopSignCorrection() {
      return this._itemFocusLooped ? -1 : 1;
    },
    _moveFocus: function _moveFocus() {
      this.callBase.apply(this, arguments);
      this._itemFocusLooped = false;
    },
    _prevItem: function _prevItem($items) {
      var $result = this.callBase.apply(this, arguments);
      this._itemFocusLooped = $result.is($items.last());
      return $result;
    },
    _nextItem: function _nextItem($items) {
      var $result = this.callBase.apply(this, arguments);
      this._itemFocusLooped = $result.is($items.first());
      return $result;
    },
    _dimensionChanged: function _dimensionChanged() {
      this._clearItemWidthCache();
    },
    _visibilityChanged: function _visibilityChanged(visible) {
      if (visible) {
        this._dimensionChanged();
      }
    },
    _updateSwipeDisabledState: function _updateSwipeDisabledState() {
      var disabled = this._getSwipeDisabledState();
      _swipeable.default.getInstance(this.$element()).option('disabled', disabled);
    },
    _dispose: function _dispose() {
      delete this._boundaryIndices;
      this.callBase();
    },
    _optionChanged: function _optionChanged(args) {
      var value = args.value;
      switch (args.name) {
        case 'loop':
          this.option('loopItemFocus', value);
          break;
        case 'animationEnabled':
          break;
        case 'swipeEnabled':
          this._updateSwipeDisabledState();
          break;
        case 'deferRendering':
          this._invalidate();
          break;
        case 'items':
          this._updateSwipeDisabledState();
          this._findBoundaryIndices();
          this.callBase(args);
          break;
        default:
          this.callBase(args);
      }
    }
  });
  /**
  * @name dxMultiViewItem.visible
  * @hidden
  */

  (0, _component_registrator.default)('dxMultiView', MultiView);
  var _default = MultiView;
  /**
   * @name dxMultiViewItem
   * @inherits CollectionWidgetItem
   * @type object
   */
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../animation/translator","./multi_view/ui.multi_view.animation","../core/utils/math","../core/utils/extend","../core/utils/common","../events/visibility_change","../core/element","../core/utils/type","../core/devices","../core/component_registrator","./collection/ui.collection_widget.live_update","../events/gesture/swipeable","../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../animation/translator"), require("./multi_view/ui.multi_view.animation"), require("../core/utils/math"), require("../core/utils/extend"), require("../core/utils/common"), require("../events/visibility_change"), require("../core/element"), require("../core/utils/type"), require("../core/devices"), require("../core/component_registrator"), require("./collection/ui.collection_widget.live_update"), require("../events/gesture/swipeable"), require("../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=multi_view.js.map