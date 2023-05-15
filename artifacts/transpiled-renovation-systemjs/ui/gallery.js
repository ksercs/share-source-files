!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/gallery.js"], ["../core/utils/size","../core/renderer","../events/core/events_engine","../core/component_registrator","../core/utils/common","../core/utils/type","../core/utils/window","../core/utils/extend","../core/element","../animation/fx","../events/click","../animation/translator","../core/devices","./widget/ui.widget","../events/utils/index","./collection/ui.collection_widget.edit","../events/gesture/swipeable","../core/templates/bindable_template","../core/utils/deferred","../events/visibility_change"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/gallery.js", ["../core/utils/size", "../core/renderer", "../events/core/events_engine", "../core/component_registrator", "../core/utils/common", "../core/utils/type", "../core/utils/window", "../core/utils/extend", "../core/element", "../animation/fx", "../events/click", "../animation/translator", "../core/devices", "./widget/ui.widget", "../events/utils/index", "./collection/ui.collection_widget.edit", "../events/gesture/swipeable", "../core/templates/bindable_template", "../core/utils/deferred", "../events/visibility_change"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _common = $__require("../core/utils/common");
  var _type = $__require("../core/utils/type");
  var _window = $__require("../core/utils/window");
  var _extend = $__require("../core/utils/extend");
  var _element = $__require("../core/element");
  var _fx = _interopRequireDefault($__require("../animation/fx"));
  var _click = $__require("../events/click");
  var _translator = $__require("../animation/translator");
  var _devices = _interopRequireDefault($__require("../core/devices"));
  var _ui = _interopRequireDefault($__require("./widget/ui.widget"));
  var _index = $__require("../events/utils/index");
  var _uiCollection_widget = _interopRequireDefault($__require("./collection/ui.collection_widget.edit"));
  var _swipeable = _interopRequireDefault($__require("../events/gesture/swipeable"));
  var _bindable_template = $__require("../core/templates/bindable_template");
  var _deferred = $__require("../core/utils/deferred");
  var _visibility_change = $__require("../events/visibility_change");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE gallery

  var GALLERY_CLASS = 'dx-gallery';
  var GALLERY_WRAPPER_CLASS = GALLERY_CLASS + '-wrapper';
  var GALLERY_LOOP_CLASS = 'dx-gallery-loop';
  var GALLERY_ITEM_CONTAINER_CLASS = GALLERY_CLASS + '-container';
  var GALLERY_ACTIVE_CLASS = GALLERY_CLASS + '-active';
  var GALLERY_ITEM_CLASS = GALLERY_CLASS + '-item';
  var GALLERY_INVISIBLE_ITEM_CLASS = GALLERY_CLASS + '-item-invisible';
  var GALLERY_LOOP_ITEM_CLASS = GALLERY_ITEM_CLASS + '-loop';
  var GALLERY_ITEM_SELECTOR = '.' + GALLERY_ITEM_CLASS;
  var GALLERY_ITEM_SELECTED_CLASS = GALLERY_ITEM_CLASS + '-selected';
  var GALLERY_INDICATOR_CLASS = GALLERY_CLASS + '-indicator';
  var GALLERY_INDICATOR_ITEM_CLASS = GALLERY_INDICATOR_CLASS + '-item';
  var GALLERY_INDICATOR_ITEM_SELECTOR = '.' + GALLERY_INDICATOR_ITEM_CLASS;
  var GALLERY_INDICATOR_ITEM_SELECTED_CLASS = GALLERY_INDICATOR_ITEM_CLASS + '-selected';
  var GALLERY_IMAGE_CLASS = 'dx-gallery-item-image';
  var GALLERY_ITEM_DATA_KEY = 'dxGalleryItemData';
  var MAX_CALC_ERROR = 1;
  var GalleryNavButton = _ui.default.inherit({
    _supportedKeys: function _supportedKeys() {
      return (0, _extend.extend)(this.callBase(), {
        pageUp: _common.noop,
        pageDown: _common.noop
      });
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        direction: 'next',
        onClick: null,
        hoverStateEnabled: true,
        activeStateEnabled: true
      });
    },
    _render: function _render() {
      this.callBase();
      var that = this;
      var $element = this.$element();
      var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
      $element.addClass(GALLERY_CLASS + '-nav-button-' + this.option('direction'));
      _events_engine.default.off($element, eventName);
      _events_engine.default.on($element, eventName, function (e) {
        that._createActionByOption('onClick')({
          event: e
        });
      });
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'onClick':
        case 'direction':
          this._invalidate();
          break;
        default:
          this.callBase(args);
      }
    }
  });
  var Gallery = _uiCollection_widget.default.inherit({
    _activeStateUnit: GALLERY_ITEM_SELECTOR,
    _wasAnyItemTemplateRendered: false,
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        /**
         * @name dxGalleryOptions.activeStateEnabled
         * @type boolean
         * @default false
         * @hidden
        */
        activeStateEnabled: false,
        animationDuration: 400,
        animationEnabled: true,
        loop: false,
        swipeEnabled: true,
        indicatorEnabled: true,
        showIndicator: true,
        selectedIndex: 0,
        slideshowDelay: 0,
        showNavButtons: false,
        wrapAround: false,
        initialItemWidth: undefined,
        stretchImages: false,
        /**
        * @name dxGalleryOptions.selectedItems
        * @hidden
        */

        /**
        * @name dxGalleryOptions.selectedItemKeys
        * @hidden
        */

        /**
        * @name dxGalleryOptions.keyExpr
        * @hidden
        */

        _itemAttributes: {
          role: 'option'
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
    _init: function _init() {
      this.callBase();
      this.option('loopItemFocus', this.option('loop'));
    },
    _initTemplates: function _initTemplates() {
      this.callBase();
      /**
      * @name dxGalleryItem.visible
      * @hidden
      */

      this._templateManager.addDefaultTemplates({
        item: new _bindable_template.BindableTemplate(function ($container, data) {
          var $img = (0, _renderer.default)('<img>').addClass(GALLERY_IMAGE_CLASS);
          if ((0, _type.isPlainObject)(data)) {
            this._prepareDefaultItemTemplate(data, $container);
            $img.attr({
              'src': data.imageSrc,
              'alt': data.imageAlt
            }).appendTo($container);
          } else {
            $img.attr('src', String(data)).appendTo($container);
          }
        }.bind(this), ['imageSrc', 'imageAlt', 'text', 'html'], this.option('integrationOptions.watchMethod'))
      });
    },
    _dataSourceOptions: function _dataSourceOptions() {
      return {
        paginate: false
      };
    },
    _itemContainer: function _itemContainer() {
      return this._$container;
    },
    _itemClass: function _itemClass() {
      return GALLERY_ITEM_CLASS;
    },
    _itemDataKey: function _itemDataKey() {
      return GALLERY_ITEM_DATA_KEY;
    },
    _actualItemWidth: function _actualItemWidth() {
      var isWrapAround = this.option('wrapAround');
      if (this.option('stretchImages')) {
        var itemPerPage = isWrapAround ? this._itemsPerPage() + 1 : this._itemsPerPage();
        return 1 / itemPerPage;
      }
      if (isWrapAround) {
        return this._itemPercentWidth() * this._itemsPerPage() / (this._itemsPerPage() + 1);
      }
      return this._itemPercentWidth();
    },
    _itemPercentWidth: function _itemPercentWidth() {
      var percentWidth;
      var elementWidth = (0, _size.getOuterWidth)(this.$element());
      var initialItemWidth = this.option('initialItemWidth');
      if (initialItemWidth && initialItemWidth <= elementWidth) {
        percentWidth = initialItemWidth / elementWidth;
      } else {
        percentWidth = 1;
      }
      return percentWidth;
    },
    _itemsPerPage: function _itemsPerPage() {
      var itemsPerPage = (0, _window.hasWindow)() ? Math.floor(1 / this._itemPercentWidth()) : 1;
      return Math.min(itemsPerPage, this._itemsCount());
    },
    _pagesCount: function _pagesCount() {
      return Math.ceil(this._itemsCount() / this._itemsPerPage());
    },
    _itemsCount: function _itemsCount() {
      return (this.option('items') || []).length;
    },
    _offsetDirection: function _offsetDirection() {
      return this.option('rtlEnabled') ? -1 : 1;
    },
    _initMarkup: function _initMarkup() {
      this._renderWrapper();
      this._renderItemsContainer();
      this.$element().addClass(GALLERY_CLASS);
      this.$element().toggleClass(GALLERY_LOOP_CLASS, this.option('loop'));
      this.callBase();
      this.setAria({
        'role': 'listbox',
        'label': 'gallery'
      });
    },
    _render: function _render() {
      this._renderDragHandler();
      this._renderContainerPosition();
      this._renderItemSizes();
      this._renderItemPositions();
      this._renderNavButtons();
      this._renderIndicator();
      this._renderSelectedItem();
      this._renderItemVisibility();
      this._renderUserInteraction();
      this._setupSlideShow();
      this._reviseDimensions();
      this.callBase();
    },
    _dimensionChanged: function _dimensionChanged() {
      var selectedIndex = this.option('selectedIndex') || 0;
      this._stopItemAnimations();
      this._clearCacheWidth();
      this._cloneDuplicateItems();
      this._renderItemSizes();
      this._renderItemPositions();
      this._renderIndicator();
      this._renderContainerPosition(this._calculateIndexOffset(selectedIndex), true);
      this._renderItemVisibility();
    },
    _renderDragHandler: function _renderDragHandler() {
      var eventName = (0, _index.addNamespace)('dragstart', this.NAME);
      _events_engine.default.off(this.$element(), eventName);
      _events_engine.default.on(this.$element(), eventName, 'img', function () {
        return false;
      });
    },
    _renderWrapper: function _renderWrapper() {
      if (this._$wrapper) {
        return;
      }
      this._$wrapper = (0, _renderer.default)('<div>').addClass(GALLERY_WRAPPER_CLASS).appendTo(this.$element());
    },
    _renderItems: function _renderItems(items) {
      if (!(0, _window.hasWindow)()) {
        var selectedIndex = this.option('selectedIndex');
        items = items.length > selectedIndex ? items.slice(selectedIndex, selectedIndex + 1) : items.slice(0, 1);
      }
      this.callBase(items);
      this._loadNextPageIfNeeded();
    },
    _onItemTemplateRendered: function _onItemTemplateRendered() {
      var _this = this;
      return function () {
        if (!_this._wasAnyItemTemplateRendered) {
          _this._wasAnyItemTemplateRendered = true;
          (0, _visibility_change.triggerResizeEvent)(_this.$element()); // NOTE: T1132935
        }
      };
    },

    _renderItemsContainer: function _renderItemsContainer() {
      if (this._$container) {
        return;
      }
      this._$container = (0, _renderer.default)('<div>').addClass(GALLERY_ITEM_CONTAINER_CLASS).appendTo(this._$wrapper);
    },
    _cloneDuplicateItems: function _cloneDuplicateItems() {
      if (!this.option('loop')) {
        return;
      }
      var items = this.option('items') || [];
      var itemsCount = items.length;
      var lastItemIndex = itemsCount - 1;
      var i;
      if (!itemsCount) return;
      this._getLoopedItems().remove();
      var duplicateCount = Math.min(this._itemsPerPage(), itemsCount);
      var $items = this._getRealItems();
      var $container = this._itemContainer();
      for (i = 0; i < duplicateCount; i++) {
        this._cloneItemForDuplicate($items[i], $container);
      }
      for (i = 0; i < duplicateCount; i++) {
        this._cloneItemForDuplicate($items[lastItemIndex - i], $container);
      }
    },
    _cloneItemForDuplicate: function _cloneItemForDuplicate(item, $container) {
      if (item) {
        (0, _renderer.default)(item).clone(false).addClass(GALLERY_LOOP_ITEM_CLASS).css('margin', 0).appendTo($container);
      }
    },
    _getRealItems: function _getRealItems() {
      var selector = '.' + GALLERY_ITEM_CLASS + ':not(.' + GALLERY_LOOP_ITEM_CLASS + ')';
      return this.$element().find(selector);
    },
    _getLoopedItems: function _getLoopedItems() {
      return this.$element().find('.' + GALLERY_LOOP_ITEM_CLASS);
    },
    _emptyMessageContainer: function _emptyMessageContainer() {
      return this._$wrapper;
    },
    _renderItemSizes: function _renderItemSizes(startIndex) {
      var $items = this._itemElements();
      var itemWidth = this._actualItemWidth();
      if (startIndex !== undefined) {
        $items = $items.slice(startIndex);
      }
      $items.each(function (index) {
        (0, _size.setOuterWidth)((0, _renderer.default)($items[index]), itemWidth * 100 + '%');
      });
    },
    _renderItemPositions: function _renderItemPositions() {
      var itemWidth = this._actualItemWidth();
      var itemsCount = this._itemsCount();
      var itemsPerPage = this._itemsPerPage();
      var loopItemsCount = this.$element().find('.' + GALLERY_LOOP_ITEM_CLASS).length;
      var lastItemDuplicateIndex = itemsCount + loopItemsCount - 1;
      var offsetRatio = this.option('wrapAround') ? 0.5 : 0;
      var freeSpace = this._itemFreeSpace();
      var isGapBetweenImages = !!freeSpace;
      var rtlEnabled = this.option('rtlEnabled');
      var selectedIndex = this.option('selectedIndex');
      var side = rtlEnabled ? 'Right' : 'Left';
      this._itemElements().each(function (index) {
        var realIndex = index;
        var isLoopItem = (0, _renderer.default)(this).hasClass(GALLERY_LOOP_ITEM_CLASS);
        if (index > itemsCount + itemsPerPage - 1) {
          realIndex = lastItemDuplicateIndex - realIndex - itemsPerPage;
        }
        if (!isLoopItem && realIndex !== 0) {
          if (isGapBetweenImages) {
            (0, _renderer.default)(this).css('margin' + side, freeSpace * 100 + '%');
          }
          return;
        }
        var itemPosition = itemWidth * (realIndex + offsetRatio) + freeSpace * (realIndex + 1 - offsetRatio);
        var property = isLoopItem ? side.toLowerCase() : 'margin' + side;
        (0, _renderer.default)(this).css(property, itemPosition * 100 + '%');
      });
      this._relocateItems(selectedIndex, selectedIndex, true);
    },
    _itemFreeSpace: function _itemFreeSpace() {
      var itemsPerPage = this._itemsPerPage();
      if (this.option('wrapAround')) {
        itemsPerPage = itemsPerPage + 1;
      }
      return (1 - this._actualItemWidth() * itemsPerPage) / (itemsPerPage + 1);
    },
    _renderContainerPosition: function _renderContainerPosition(offset, hideItems, animate) {
      this._releaseInvisibleItems();
      offset = offset || 0;
      var that = this;
      var itemWidth = this._actualItemWidth();
      var targetIndex = offset;
      var targetPosition = this._offsetDirection() * targetIndex * (itemWidth + this._itemFreeSpace());
      var positionReady;
      if ((0, _type.isDefined)(this._animationOverride)) {
        animate = this._animationOverride;
        delete this._animationOverride;
      }
      if (animate) {
        that._startSwipe();
        positionReady = that._animate(targetPosition).done(that._endSwipe.bind(that));
      } else {
        (0, _translator.move)(this._$container, {
          left: targetPosition * this._elementWidth(),
          top: 0
        });
        positionReady = new _deferred.Deferred().resolveWith(that);
      }
      positionReady.done(function () {
        this._deferredAnimate && that._deferredAnimate.resolveWith(that);
        hideItems && this._renderItemVisibility();
      });
      return positionReady.promise();
    },
    _startSwipe: function _startSwipe() {
      this.$element().addClass(GALLERY_ACTIVE_CLASS);
    },
    _endSwipe: function _endSwipe() {
      this.$element().removeClass(GALLERY_ACTIVE_CLASS);
    },
    _animate: function _animate(targetPosition, extraConfig) {
      var that = this;
      var $container = this._$container;
      var animationComplete = new _deferred.Deferred();
      _fx.default.animate(this._$container, (0, _extend.extend)({
        type: 'slide',
        to: {
          left: targetPosition * this._elementWidth()
        },
        duration: that.option('animationDuration'),
        complete: function complete() {
          if (that._needMoveContainerForward()) {
            (0, _translator.move)($container, {
              left: 0,
              top: 0
            });
          }
          if (that._needMoveContainerBack()) {
            (0, _translator.move)($container, {
              left: that._maxContainerOffset() * that._elementWidth(),
              top: 0
            });
          }
          animationComplete.resolveWith(that);
        }
      }, extraConfig || {}));
      return animationComplete;
    },
    _needMoveContainerForward: function _needMoveContainerForward() {
      var expectedPosition = this._$container.position().left * this._offsetDirection();
      var actualPosition = -this._maxItemWidth() * this._elementWidth() * this._itemsCount();
      return expectedPosition <= actualPosition + MAX_CALC_ERROR;
    },
    _needMoveContainerBack: function _needMoveContainerBack() {
      var expectedPosition = this._$container.position().left * this._offsetDirection();
      var actualPosition = this._actualItemWidth() * this._elementWidth();
      return expectedPosition >= actualPosition - MAX_CALC_ERROR;
    },
    _maxContainerOffset: function _maxContainerOffset() {
      return -this._maxItemWidth() * (this._itemsCount() - this._itemsPerPage()) * this._offsetDirection();
    },
    _maxItemWidth: function _maxItemWidth() {
      return this._actualItemWidth() + this._itemFreeSpace();
    },
    _reviseDimensions: function _reviseDimensions() {
      var that = this;
      var $firstItem = that._itemElements().first().find('.dx-item-content');
      if (!$firstItem || $firstItem.is(':hidden')) {
        return;
      }
      if (!that.option('height')) {
        that.option('height', (0, _size.getOuterHeight)($firstItem));
      }
      if (!that.option('width')) {
        that.option('width', (0, _size.getOuterWidth)($firstItem));
      }
      this._dimensionChanged();
    },
    _renderIndicator: function _renderIndicator() {
      this._cleanIndicators();
      if (!this.option('showIndicator')) {
        return;
      }
      var indicator = this._$indicator = (0, _renderer.default)('<div>').addClass(GALLERY_INDICATOR_CLASS).appendTo(this._$wrapper);
      var isIndicatorEnabled = this.option('indicatorEnabled');
      for (var i = 0; i < this._pagesCount(); i++) {
        var $indicatorItem = (0, _renderer.default)('<div>').addClass(GALLERY_INDICATOR_ITEM_CLASS).appendTo(indicator);
        if (isIndicatorEnabled) {
          this._attachIndicatorClickHandler($indicatorItem, i);
        }
      }
      this._renderSelectedPageIndicator();
    },
    _attachIndicatorClickHandler: function _attachIndicatorClickHandler($element, index) {
      _events_engine.default.on($element, (0, _index.addNamespace)(_click.name, this.NAME), function (event) {
        this._indicatorSelectHandler(event, index);
      }.bind(this));
    },
    _detachIndicatorClickHandler: function _detachIndicatorClickHandler($element) {
      _events_engine.default.off($element, (0, _index.addNamespace)(_click.name, this.NAME));
    },
    _toggleIndicatorInteraction: function _toggleIndicatorInteraction(clickEnabled) {
      var _this$_$indicator;
      var $indicatorItems = ((_this$_$indicator = this._$indicator) === null || _this$_$indicator === void 0 ? void 0 : _this$_$indicator.find(GALLERY_INDICATOR_ITEM_SELECTOR)) || [];
      if ($indicatorItems.length) {
        $indicatorItems.each(function (index, element) {
          clickEnabled ? this._attachIndicatorClickHandler((0, _renderer.default)(element), index) : this._detachIndicatorClickHandler((0, _renderer.default)(element));
        }.bind(this));
      }
    },
    _cleanIndicators: function _cleanIndicators() {
      if (this._$indicator) {
        this._$indicator.remove();
      }
    },
    _renderSelectedItem: function _renderSelectedItem() {
      var selectedIndex = this.option('selectedIndex');
      this._itemElements().removeClass(GALLERY_ITEM_SELECTED_CLASS).eq(selectedIndex).addClass(GALLERY_ITEM_SELECTED_CLASS);
    },
    _renderItemVisibility: function _renderItemVisibility() {
      if (this.option('initialItemWidth') || this.option('wrapAround')) {
        this._releaseInvisibleItems();
        return;
      }
      this._itemElements().each(function (index, item) {
        if (this.option('selectedIndex') === index) {
          (0, _renderer.default)(item).removeClass(GALLERY_INVISIBLE_ITEM_CLASS);
        } else {
          (0, _renderer.default)(item).addClass(GALLERY_INVISIBLE_ITEM_CLASS);
        }
      }.bind(this));
      this._getLoopedItems().addClass(GALLERY_INVISIBLE_ITEM_CLASS);
    },
    _releaseInvisibleItems: function _releaseInvisibleItems() {
      this._itemElements().removeClass(GALLERY_INVISIBLE_ITEM_CLASS);
      this._getLoopedItems().removeClass(GALLERY_INVISIBLE_ITEM_CLASS);
    },
    _renderSelectedPageIndicator: function _renderSelectedPageIndicator() {
      if (!this._$indicator) {
        return;
      }
      var itemIndex = this.option('selectedIndex');
      var lastIndex = this._pagesCount() - 1;
      var pageIndex = Math.ceil(itemIndex / this._itemsPerPage());
      pageIndex = Math.min(lastIndex, pageIndex);
      this._$indicator.find(GALLERY_INDICATOR_ITEM_SELECTOR).removeClass(GALLERY_INDICATOR_ITEM_SELECTED_CLASS).eq(pageIndex).addClass(GALLERY_INDICATOR_ITEM_SELECTED_CLASS);
    },
    _renderUserInteraction: function _renderUserInteraction() {
      var rootElement = this.$element();
      var swipeEnabled = this.option('swipeEnabled') && this._itemsCount() > 1;
      this._createComponent(rootElement, _swipeable.default, {
        disabled: this.option('disabled') || !swipeEnabled,
        onStart: this._swipeStartHandler.bind(this),
        onUpdated: this._swipeUpdateHandler.bind(this),
        onEnd: this._swipeEndHandler.bind(this),
        itemSizeFunc: this._elementWidth.bind(this)
      });
    },
    _indicatorSelectHandler: function _indicatorSelectHandler(e, indicatorIndex) {
      if (!this.option('indicatorEnabled')) {
        return;
      }
      var itemIndex = this._fitPaginatedIndex(indicatorIndex * this._itemsPerPage());
      this._needLongMove = true;
      this.option('selectedIndex', itemIndex);
      this._loadNextPageIfNeeded(itemIndex);
    },
    _renderNavButtons: function _renderNavButtons() {
      var that = this;
      if (!that.option('showNavButtons')) {
        that._cleanNavButtons();
        return;
      }
      that._prevNavButton = (0, _renderer.default)('<div>').appendTo(this._$wrapper);
      that._createComponent(that._prevNavButton, GalleryNavButton, {
        direction: 'prev',
        onClick: function onClick() {
          that._prevPage();
        }
      });
      that._nextNavButton = (0, _renderer.default)('<div>').appendTo(this._$wrapper);
      that._createComponent(that._nextNavButton, GalleryNavButton, {
        direction: 'next',
        onClick: function onClick() {
          that._nextPage();
        }
      });
      this._renderNavButtonsVisibility();
    },
    _prevPage: function _prevPage() {
      var visiblePageSize = this._itemsPerPage();
      var newSelectedIndex = this.option('selectedIndex') - visiblePageSize;
      if (newSelectedIndex === -visiblePageSize && visiblePageSize === this._itemsCount()) {
        return this._relocateItems(newSelectedIndex, 0);
      } else {
        return this.goToItem(this._fitPaginatedIndex(newSelectedIndex));
      }
    },
    _nextPage: function _nextPage() {
      var visiblePageSize = this._itemsPerPage();
      var newSelectedIndex = this.option('selectedIndex') + visiblePageSize;
      if (newSelectedIndex === visiblePageSize && visiblePageSize === this._itemsCount()) {
        return this._relocateItems(newSelectedIndex, 0);
      } else {
        return this.goToItem(this._fitPaginatedIndex(newSelectedIndex)).done(this._loadNextPageIfNeeded);
      }
    },
    _loadNextPageIfNeeded: function _loadNextPageIfNeeded(selectedIndex) {
      selectedIndex = selectedIndex === undefined ? this.option('selectedIndex') : selectedIndex;
      if (this._dataSource && this._dataSource.paginate() && this._shouldLoadNextPage(selectedIndex) && !this._isDataSourceLoading() && !this._isLastPage()) {
        this._loadNextPage().done(function () {
          this._renderIndicator();
          this._cloneDuplicateItems();
          this._renderItemPositions();
          this._renderNavButtonsVisibility();
          this._renderItemSizes(selectedIndex);
        }.bind(this));
      }
    },
    _shouldLoadNextPage: function _shouldLoadNextPage(selectedIndex) {
      var visiblePageSize = this._itemsPerPage();
      return selectedIndex + 2 * visiblePageSize > this.option('items').length;
    },
    _allowDynamicItemsAppend: function _allowDynamicItemsAppend() {
      return true;
    },
    _fitPaginatedIndex: function _fitPaginatedIndex(itemIndex) {
      var itemsPerPage = this._itemsPerPage();
      var restItemsCount = itemIndex < 0 ? itemsPerPage + itemIndex : this._itemsCount() - itemIndex;
      if (itemIndex > this._itemsCount() - 1) {
        itemIndex = 0;
        this._goToGhostItem = true;
      } else if (restItemsCount < itemsPerPage && restItemsCount > 0) {
        if (itemIndex > 0) {
          itemIndex = itemIndex - (itemsPerPage - restItemsCount);
        } else {
          itemIndex = itemIndex + (itemsPerPage - restItemsCount);
        }
      }
      return itemIndex;
    },
    _cleanNavButtons: function _cleanNavButtons() {
      if (this._prevNavButton) {
        this._prevNavButton.remove();
        delete this._prevNavButton;
      }
      if (this._nextNavButton) {
        this._nextNavButton.remove();
        delete this._nextNavButton;
      }
    },
    _renderNavButtonsVisibility: function _renderNavButtonsVisibility() {
      if (!this.option('showNavButtons') || !this._prevNavButton || !this._nextNavButton) {
        return;
      }
      var selectedIndex = this.option('selectedIndex');
      var loop = this.option('loop');
      var itemsCount = this._itemsCount();
      this._prevNavButton.show();
      this._nextNavButton.show();
      if (itemsCount === 0) {
        this._prevNavButton.hide();
        this._nextNavButton.hide();
      }
      if (loop) {
        return;
      }
      var nextHidden = selectedIndex === itemsCount - this._itemsPerPage();
      var prevHidden = itemsCount < 2 || selectedIndex === 0;
      if (this._dataSource && this._dataSource.paginate()) {
        nextHidden = nextHidden && this._isLastPage();
      } else {
        nextHidden = nextHidden || itemsCount < 2;
      }
      if (prevHidden) {
        this._prevNavButton.hide();
      }
      if (nextHidden) {
        this._nextNavButton.hide();
      }
    },
    _setupSlideShow: function _setupSlideShow() {
      var that = this;
      var slideshowDelay = that.option('slideshowDelay');
      clearTimeout(that._slideshowTimer);
      if (!slideshowDelay) {
        return;
      }
      that._slideshowTimer = setTimeout(function () {
        if (that._userInteraction) {
          that._setupSlideShow();
          return;
        }
        that.nextItem(true).done(that._setupSlideShow);
      }, slideshowDelay);
    },
    _elementWidth: function _elementWidth() {
      if (!this._cacheElementWidth) {
        this._cacheElementWidth = (0, _size.getWidth)(this.$element());
      }
      return this._cacheElementWidth;
    },
    _clearCacheWidth: function _clearCacheWidth() {
      delete this._cacheElementWidth;
    },
    _swipeStartHandler: function _swipeStartHandler(e) {
      this._releaseInvisibleItems();
      this._clearCacheWidth();
      this._elementWidth();
      var itemsCount = this._itemsCount();
      if (!itemsCount) {
        e.event.cancel = true;
        return;
      }
      this._stopItemAnimations();
      this._startSwipe();
      this._userInteraction = true;
      if (!this.option('loop')) {
        var selectedIndex = this.option('selectedIndex');
        var startOffset = itemsCount - selectedIndex - this._itemsPerPage();
        var endOffset = selectedIndex;
        var rtlEnabled = this.option('rtlEnabled');
        e.event.maxLeftOffset = rtlEnabled ? endOffset : startOffset;
        e.event.maxRightOffset = rtlEnabled ? startOffset : endOffset;
      }
    },
    _stopItemAnimations: function _stopItemAnimations() {
      _fx.default.stop(this._$container, true);
    },
    _swipeUpdateHandler: function _swipeUpdateHandler(e) {
      var wrapAroundRatio = this.option('wrapAround') ? 1 : 0;
      var offset = this._offsetDirection() * e.event.offset * (this._itemsPerPage() + wrapAroundRatio) - this.option('selectedIndex');
      if (offset < 0) {
        this._loadNextPageIfNeeded(Math.ceil(Math.abs(offset)));
      }
      this._renderContainerPosition(offset);
    },
    _swipeEndHandler: function _swipeEndHandler(e) {
      var targetOffset = e.event.targetOffset * this._offsetDirection() * this._itemsPerPage();
      var selectedIndex = this.option('selectedIndex');
      var newIndex = this._fitIndex(selectedIndex - targetOffset);
      var paginatedIndex = this._fitPaginatedIndex(newIndex);
      if (Math.abs(targetOffset) < this._itemsPerPage()) {
        this._relocateItems(selectedIndex);
        return;
      }
      if (this._itemsPerPage() === this._itemsCount()) {
        if (targetOffset > 0) {
          this._relocateItems(-targetOffset);
        } else {
          this._relocateItems(0);
        }
        return;
      }
      this.option('selectedIndex', paginatedIndex);
    },
    _setFocusOnSelect: function _setFocusOnSelect() {
      this._userInteraction = true;
      var selectedItem = this.itemElements().filter('.' + GALLERY_ITEM_SELECTED_CLASS);
      this.option('focusedElement', (0, _element.getPublicElement)(selectedItem));
      this._userInteraction = false;
    },
    _flipIndex: function _flipIndex(index) {
      var itemsCount = this._itemsCount();
      index = index % itemsCount;
      if (index > (itemsCount + 1) / 2) {
        index -= itemsCount;
      }
      if (index < -(itemsCount - 1) / 2) {
        index += itemsCount;
      }
      return index;
    },
    _fitIndex: function _fitIndex(index) {
      if (!this.option('loop')) {
        return index;
      }
      var itemsCount = this._itemsCount();
      if (index >= itemsCount || index < 0) {
        this._goToGhostItem = true;
      }
      if (index >= itemsCount) {
        index = itemsCount - index;
      }
      index = index % itemsCount;
      if (index < 0) {
        index += itemsCount;
      }
      return index;
    },
    _clean: function _clean() {
      this.callBase();
      this._cleanIndicators();
      this._cleanNavButtons();
    },
    _dispose: function _dispose() {
      this._wasAnyItemTemplateRendered = null;
      clearTimeout(this._slideshowTimer);
      this.callBase();
    },
    _updateSelection: function _updateSelection(addedSelection, removedSelection) {
      this._stopItemAnimations();
      this._renderNavButtonsVisibility();
      this._renderSelectedItem();
      this._relocateItems(addedSelection[0], removedSelection[0]);
      this._renderSelectedPageIndicator();
    },
    _relocateItems: function _relocateItems(newIndex, prevIndex, withoutAnimation) {
      if (prevIndex === undefined) {
        prevIndex = newIndex;
      }
      var indexOffset = this._calculateIndexOffset(newIndex, prevIndex);
      this._renderContainerPosition(indexOffset, true, this.option('animationEnabled') && !withoutAnimation).done(function () {
        this._setFocusOnSelect();
        this._userInteraction = false;
        this._setupSlideShow();
      });
    },
    _focusInHandler: function _focusInHandler() {
      if (_fx.default.isAnimating(this._$container) || this._userInteraction) {
        return;
      }
      this.callBase.apply(this, arguments);
    },
    _focusOutHandler: function _focusOutHandler() {
      if (_fx.default.isAnimating(this._$container) || this._userInteraction) {
        return;
      }
      this.callBase.apply(this, arguments);
    },
    _selectFocusedItem: _common.noop,
    _moveFocus: function _moveFocus() {
      this._stopItemAnimations();
      this.callBase.apply(this, arguments);
      var index = this.itemElements().index((0, _renderer.default)(this.option('focusedElement')));
      this.goToItem(index, this.option('animationEnabled'));
    },
    _visibilityChanged: function _visibilityChanged(visible) {
      if (visible) {
        this._reviseDimensions();
      }
    },
    _calculateIndexOffset: function _calculateIndexOffset(newIndex, lastIndex) {
      if (lastIndex === undefined) {
        lastIndex = newIndex;
      }
      var indexOffset = lastIndex - newIndex;
      if (this.option('loop') && !this._needLongMove && this._goToGhostItem) {
        if (this._isItemOnFirstPage(newIndex) && this._isItemOnLastPage(lastIndex)) {
          indexOffset = -this._itemsPerPage();
        } else if (this._isItemOnLastPage(newIndex) && this._isItemOnFirstPage(lastIndex)) {
          indexOffset = this._itemsPerPage();
        }
        this._goToGhostItem = false;
      }
      this._needLongMove = false;
      indexOffset = indexOffset - lastIndex;
      return indexOffset;
    },
    _isItemOnLastPage: function _isItemOnLastPage(itemIndex) {
      return itemIndex >= this._itemsCount() - this._itemsPerPage();
    },
    _isItemOnFirstPage: function _isItemOnFirstPage(itemIndex) {
      return itemIndex <= this._itemsPerPage();
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'width':
        case 'initialItemWidth':
          this.callBase.apply(this, arguments);
          this._dimensionChanged();
          break;
        case 'animationDuration':
          this._renderNavButtonsVisibility();
          break;
        case 'animationEnabled':
          break;
        case 'loop':
          this.$element().toggleClass(GALLERY_LOOP_CLASS, args.value);
          this.option('loopItemFocus', args.value);
          if ((0, _window.hasWindow)()) {
            this._cloneDuplicateItems();
            this._renderItemPositions();
            this._renderNavButtonsVisibility();
          }
          break;
        case 'showIndicator':
          this._renderIndicator();
          break;
        case 'showNavButtons':
          this._renderNavButtons();
          break;
        case 'slideshowDelay':
          this._setupSlideShow();
          break;
        case 'wrapAround':
        case 'stretchImages':
          if ((0, _window.hasWindow)()) {
            this._renderItemSizes();
            this._renderItemPositions();
            this._renderItemVisibility();
          }
          break;
        case 'swipeEnabled':
          this._renderUserInteraction();
          break;
        case 'indicatorEnabled':
          this._toggleIndicatorInteraction(args.value);
          break;
        default:
          this.callBase(args);
      }
    },
    goToItem: function goToItem(itemIndex, animation) {
      var selectedIndex = this.option('selectedIndex');
      var itemsCount = this._itemsCount();
      if (animation !== undefined) {
        this._animationOverride = animation;
      }
      itemIndex = this._fitIndex(itemIndex);
      this._deferredAnimate = new _deferred.Deferred();
      if (itemIndex > itemsCount - 1 || itemIndex < 0 || selectedIndex === itemIndex) {
        return this._deferredAnimate.resolveWith(this).promise();
      }
      this.option('selectedIndex', itemIndex);
      return this._deferredAnimate.promise();
    },
    prevItem: function prevItem(animation) {
      return this.goToItem(this.option('selectedIndex') - 1, animation);
    },
    nextItem: function nextItem(animation) {
      return this.goToItem(this.option('selectedIndex') + 1, animation);
    }
  });
  (0, _component_registrator.default)('dxGallery', Gallery);
  var _default = Gallery;
  /**
   * @name dxGalleryItem
   * @type object
   * @inherits CollectionWidgetItem
   */
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../events/core/events_engine","../core/component_registrator","../core/utils/common","../core/utils/type","../core/utils/window","../core/utils/extend","../core/element","../animation/fx","../events/click","../animation/translator","../core/devices","./widget/ui.widget","../events/utils/index","./collection/ui.collection_widget.edit","../events/gesture/swipeable","../core/templates/bindable_template","../core/utils/deferred","../events/visibility_change"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../events/core/events_engine"), require("../core/component_registrator"), require("../core/utils/common"), require("../core/utils/type"), require("../core/utils/window"), require("../core/utils/extend"), require("../core/element"), require("../animation/fx"), require("../events/click"), require("../animation/translator"), require("../core/devices"), require("./widget/ui.widget"), require("../events/utils/index"), require("./collection/ui.collection_widget.edit"), require("../events/gesture/swipeable"), require("../core/templates/bindable_template"), require("../core/utils/deferred"), require("../events/visibility_change"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=gallery.js.map