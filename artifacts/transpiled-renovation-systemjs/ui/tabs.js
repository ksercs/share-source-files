!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/tabs.js"], ["../core/utils/size","../core/renderer","../events/core/events_engine","../core/devices","../core/component_registrator","./button","./widget/utils.ink_ripple","../events/utils/index","../core/utils/extend","../core/utils/type","../events/pointer","../core/utils/iterator","./tabs/item","./tabs/constants","./themes","../events/hold","./scroll_view/ui.scrollable","./collection/ui.collection_widget.live_update","../core/utils/icon","../core/templates/bindable_template","../core/utils/deferred","../renovation/ui/scroll_view/utils/get_boundary_props","../renovation/ui/scroll_view/utils/get_scroll_left_max"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/tabs.js", ["../core/utils/size", "../core/renderer", "../events/core/events_engine", "../core/devices", "../core/component_registrator", "./button", "./widget/utils.ink_ripple", "../events/utils/index", "../core/utils/extend", "../core/utils/type", "../events/pointer", "../core/utils/iterator", "./tabs/item", "./tabs/constants", "./themes", "../events/hold", "./scroll_view/ui.scrollable", "./collection/ui.collection_widget.live_update", "../core/utils/icon", "../core/templates/bindable_template", "../core/utils/deferred", "../renovation/ui/scroll_view/utils/get_boundary_props", "../renovation/ui/scroll_view/utils/get_scroll_left_max"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _devices = _interopRequireDefault($__require("../core/devices"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _button = _interopRequireDefault($__require("./button"));
  var _utils = $__require("./widget/utils.ink_ripple");
  var _index = $__require("../events/utils/index");
  var _extend = $__require("../core/utils/extend");
  var _type = $__require("../core/utils/type");
  var _pointer = _interopRequireDefault($__require("../events/pointer"));
  var _iterator = $__require("../core/utils/iterator");
  var _item = _interopRequireDefault($__require("./tabs/item"));
  var _constants = $__require("./tabs/constants");
  var _themes = $__require("./themes");
  var _hold = _interopRequireDefault($__require("../events/hold"));
  var _ui = _interopRequireDefault($__require("./scroll_view/ui.scrollable"));
  var _uiCollection_widget = _interopRequireDefault($__require("./collection/ui.collection_widget.live_update"));
  var _icon = $__require("../core/utils/icon");
  var _bindable_template = $__require("../core/templates/bindable_template");
  var _deferred = $__require("../core/utils/deferred");
  var _get_boundary_props = $__require("../renovation/ui/scroll_view/utils/get_boundary_props");
  var _get_scroll_left_max = $__require("../renovation/ui/scroll_view/utils/get_scroll_left_max");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE tabs

  var TABS_CLASS = 'dx-tabs';
  var TABS_WRAPPER_CLASS = 'dx-tabs-wrapper';
  var TABS_STRETCHED_CLASS = 'dx-tabs-stretched';
  var TABS_SCROLLABLE_CLASS = 'dx-tabs-scrollable';
  var TABS_NAV_BUTTONS_CLASS = 'dx-tabs-nav-buttons';
  var OVERFLOW_HIDDEN_CLASS = 'dx-overflow-hidden';
  var TABS_ITEM_CLASS = 'dx-tab';
  var TABS_ITEM_SELECTED_CLASS = 'dx-tab-selected';
  var TABS_NAV_BUTTON_CLASS = 'dx-tabs-nav-button';
  var TABS_LEFT_NAV_BUTTON_CLASS = 'dx-tabs-nav-button-left';
  var TABS_RIGHT_NAV_BUTTON_CLASS = 'dx-tabs-nav-button-right';
  var TABS_ITEM_TEXT_CLASS = 'dx-tab-text';
  var FOCUSED_NEXT_TAB_CLASS = 'dx-focused-next-tab';
  var TABS_ITEM_DATA_KEY = 'dxTabData';
  var BUTTON_NEXT_ICON = 'chevronnext';
  var BUTTON_PREV_ICON = 'chevronprev';
  var FEEDBACK_HIDE_TIMEOUT = 100;
  var FEEDBACK_DURATION_INTERVAL = 5;
  var FEEDBACK_SCROLL_TIMEOUT = 300;
  var TAB_OFFSET = 30;
  var Tabs = _uiCollection_widget.default.inherit({
    _activeStateUnit: '.' + TABS_ITEM_CLASS,
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        hoverStateEnabled: true,
        showNavButtons: true,
        scrollByContent: true,
        scrollingEnabled: true,
        selectionMode: 'single',
        /**
         * @name dxTabsOptions.activeStateEnabled
         * @hidden
         * @default true
        */

        activeStateEnabled: true,
        selectionRequired: false,
        selectOnFocus: true,
        loopItemFocus: false,
        useInkRipple: false,
        badgeExpr: function badgeExpr(data) {
          return data ? data.badge : undefined;
        },
        _itemAttributes: {
          role: 'tab'
        }
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      var themeName = (0, _themes.current)();
      return this.callBase().concat([{
        device: function device() {
          return _devices.default.real().deviceType !== 'desktop';
        },
        options: {
          showNavButtons: false
        }
      }, {
        device: {
          deviceType: 'desktop'
        },
        options: {
          scrollByContent: false
        }
      }, {
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }, {
        device: function device() {
          return (0, _themes.isMaterial)(themeName);
        },
        options: {
          useInkRipple: true,
          selectOnFocus: false
        }
      }]);
    },
    _init: function _init() {
      this.callBase();
      this.setAria('role', 'tablist');
      this.$element().addClass(TABS_CLASS);
      this._renderWrapper();
      this._renderMultiple();
      this._feedbackHideTimeout = FEEDBACK_HIDE_TIMEOUT;
    },
    _initTemplates: function _initTemplates() {
      this.callBase();
      this._templateManager.addDefaultTemplates({
        item: new _bindable_template.BindableTemplate(function ($container, data) {
          if ((0, _type.isPlainObject)(data)) {
            this._prepareDefaultItemTemplate(data, $container);
          } else {
            $container.text(String(data));
          }
          var $iconElement = (0, _icon.getImageContainer)(data.icon);
          $iconElement && $iconElement.prependTo($container);
          $container.wrapInner((0, _renderer.default)('<span>').addClass(TABS_ITEM_TEXT_CLASS));
        }.bind(this), ['text', 'html', 'icon'], this.option('integrationOptions.watchMethod'))
      });
    },
    _createItemByTemplate: function _createItemByTemplate(itemTemplate, renderArgs) {
      var _this = this;
      var itemData = renderArgs.itemData,
          container = renderArgs.container,
          index = renderArgs.index;
      this._deferredTemplates[index] = new _deferred.Deferred();
      return itemTemplate.render({
        model: itemData,
        container: container,
        index: index,
        onRendered: function onRendered() {
          return _this._deferredTemplates[index].resolve();
        }
      });
    },
    _itemClass: function _itemClass() {
      return TABS_ITEM_CLASS;
    },
    _selectedItemClass: function _selectedItemClass() {
      return TABS_ITEM_SELECTED_CLASS;
    },
    _itemDataKey: function _itemDataKey() {
      return TABS_ITEM_DATA_KEY;
    },
    _initMarkup: function _initMarkup() {
      this._deferredTemplates = [];
      this.callBase();
      this.option('useInkRipple') && this._renderInkRipple();
      this.$element().addClass(OVERFLOW_HIDDEN_CLASS);
    },
    _render: function _render() {
      this.callBase();
      this._deferRenderScrolling();
    },
    _deferRenderScrolling: function _deferRenderScrolling() {
      var _this2 = this;
      _deferred.when.apply(this, this._deferredTemplates).done(function () {
        return _this2._renderScrolling();
      });
    },
    _renderScrolling: function _renderScrolling() {
      var removeClasses = [TABS_STRETCHED_CLASS, _constants.TABS_EXPANDED_CLASS, OVERFLOW_HIDDEN_CLASS];
      this.$element().removeClass(removeClasses.join(' '));
      if (this.option('scrollingEnabled') && this._isItemsWidthExceeded()) {
        if (!this._scrollable) {
          this._renderScrollable();
          this._renderNavButtons();
        }
        var scrollable = this.getScrollable();
        scrollable.update();
        if (this.option('rtlEnabled')) {
          var maxLeftOffset = (0, _get_scroll_left_max.getScrollLeftMax)((0, _renderer.default)(this.getScrollable().container()).get(0));
          scrollable.scrollTo({
            left: maxLeftOffset
          });
        }
        this._updateNavButtonsVisibility();
        this._scrollToItem(this.option('selectedItem'));
      }
      if (!(this.option('scrollingEnabled') && this._isItemsWidthExceeded())) {
        this._cleanScrolling();
        if (this._needStretchItems() && !this._isItemsWidthExceeded()) {
          this.$element().addClass(TABS_STRETCHED_CLASS);
        }
        this.$element().removeClass(TABS_NAV_BUTTONS_CLASS).addClass(_constants.TABS_EXPANDED_CLASS);
      }
    },
    _isItemsWidthExceeded: function _isItemsWidthExceeded() {
      var tabItemsWidth = this._getSummaryItemsWidth(this._getVisibleItems(), true);
      return tabItemsWidth - 1 > (0, _size.getWidth)(this.$element());
    },
    _needStretchItems: function _needStretchItems() {
      var $visibleItems = this._getVisibleItems();
      var elementWidth = (0, _size.getWidth)(this.$element());
      var itemsWidth = [];
      (0, _iterator.each)($visibleItems, function (_, item) {
        itemsWidth.push((0, _size.getOuterWidth)(item, true));
      });
      var maxTabWidth = Math.max.apply(null, itemsWidth);
      return maxTabWidth >= elementWidth / $visibleItems.length;
    },
    _cleanNavButtons: function _cleanNavButtons() {
      if (!this._leftButton || !this._rightButton) return;
      this._leftButton.$element().remove();
      this._rightButton.$element().remove();
      this._leftButton = null;
      this._rightButton = null;
    },
    _cleanScrolling: function _cleanScrolling() {
      if (!this._scrollable) return;
      this._$wrapper.appendTo(this.$element());
      this._scrollable.$element().remove();
      this._scrollable = null;
      this._cleanNavButtons();
    },
    _renderInkRipple: function _renderInkRipple() {
      this._inkRipple = (0, _utils.render)();
    },
    _toggleActiveState: function _toggleActiveState($element, value, e) {
      this.callBase.apply(this, arguments);
      if (!this._inkRipple) {
        return;
      }
      var config = {
        element: $element,
        event: e
      };
      if (value) {
        this._inkRipple.showWave(config);
      } else {
        this._inkRipple.hideWave(config);
      }
    },
    _renderMultiple: function _renderMultiple() {
      if (this.option('selectionMode') === 'multiple') {
        this.option('selectOnFocus', false);
      }
    },
    _renderWrapper: function _renderWrapper() {
      this._$wrapper = (0, _renderer.default)('<div>').addClass(TABS_WRAPPER_CLASS);
      this.$element().append(this._$wrapper);
    },
    _itemContainer: function _itemContainer() {
      return this._$wrapper;
    },
    _renderScrollable: function _renderScrollable() {
      var _this3 = this;
      var $itemContainer = this.$element().wrapInner((0, _renderer.default)('<div>').addClass(TABS_SCROLLABLE_CLASS)).children();
      this._scrollable = this._createComponent($itemContainer, _ui.default, {
        direction: 'horizontal',
        showScrollbar: 'never',
        useKeyboard: false,
        useNative: false,
        scrollByContent: this.option('scrollByContent'),
        onScroll: function onScroll() {
          _this3._updateNavButtonsVisibility();
        }
      });
      this.$element().append(this._scrollable.$element());
    },
    _scrollToItem: function _scrollToItem(itemData) {
      if (!this._scrollable) return;
      var $item = this._editStrategy.getItemElement(itemData);
      this._scrollable.scrollToElement($item);
    },
    _renderNavButtons: function _renderNavButtons() {
      this.$element().toggleClass(TABS_NAV_BUTTONS_CLASS, this.option('showNavButtons'));
      if (!this.option('showNavButtons')) return;
      var rtlEnabled = this.option('rtlEnabled');
      this._leftButton = this._createNavButton(-TAB_OFFSET, rtlEnabled ? BUTTON_NEXT_ICON : BUTTON_PREV_ICON);
      var $leftButton = this._leftButton.$element();
      $leftButton.addClass(TABS_LEFT_NAV_BUTTON_CLASS);
      this.$element().prepend($leftButton);
      this._rightButton = this._createNavButton(TAB_OFFSET, rtlEnabled ? BUTTON_PREV_ICON : BUTTON_NEXT_ICON);
      var $rightButton = this._rightButton.$element();
      $rightButton.addClass(TABS_RIGHT_NAV_BUTTON_CLASS);
      this.$element().append($rightButton);
    },
    _updateNavButtonsVisibility: function _updateNavButtonsVisibility() {
      var scrollable = this.getScrollable();
      this._leftButton && this._leftButton.option('disabled', (0, _get_boundary_props.isReachedLeft)(scrollable.scrollLeft(), 1));
      this._rightButton && this._rightButton.option('disabled', (0, _get_boundary_props.isReachedRight)((0, _renderer.default)(scrollable.container()).get(0), scrollable.scrollLeft(), 1));
    },
    _updateScrollPosition: function _updateScrollPosition(offset, duration) {
      this._scrollable.update();
      this._scrollable.scrollBy(offset / duration);
    },
    _createNavButton: function _createNavButton(offset, icon) {
      var that = this;
      var holdAction = that._createAction(function () {
        that._holdInterval = setInterval(function () {
          that._updateScrollPosition(offset, FEEDBACK_DURATION_INTERVAL);
        }, FEEDBACK_DURATION_INTERVAL);
      });
      var holdEventName = (0, _index.addNamespace)(_hold.default.name, 'dxNavButton');
      var pointerUpEventName = (0, _index.addNamespace)(_pointer.default.up, 'dxNavButton');
      var pointerOutEventName = (0, _index.addNamespace)(_pointer.default.out, 'dxNavButton');
      var navButton = this._createComponent((0, _renderer.default)('<div>').addClass(TABS_NAV_BUTTON_CLASS), _button.default, {
        focusStateEnabled: false,
        icon: icon,
        onClick: function onClick() {
          that._updateScrollPosition(offset, 1);
        },
        integrationOptions: {}
      });
      var $navButton = navButton.$element();
      _events_engine.default.on($navButton, holdEventName, {
        timeout: FEEDBACK_SCROLL_TIMEOUT
      }, function (e) {
        holdAction({
          event: e
        });
      }.bind(this));
      _events_engine.default.on($navButton, pointerUpEventName, function () {
        that._clearInterval();
      });
      _events_engine.default.on($navButton, pointerOutEventName, function () {
        that._clearInterval();
      });
      return navButton;
    },
    _clearInterval: function _clearInterval() {
      if (this._holdInterval) clearInterval(this._holdInterval);
    },
    _updateSelection: function _updateSelection(addedSelection) {
      this._scrollable && this._scrollable.scrollToElement(this.itemElements().eq(addedSelection[0]), {
        left: 1,
        right: 1
      });
    },
    _visibilityChanged: function _visibilityChanged(visible) {
      if (visible) {
        this._dimensionChanged();
      }
    },
    _dimensionChanged: function _dimensionChanged() {
      this._renderScrolling();
    },
    _itemSelectHandler: function _itemSelectHandler(e) {
      if (this.option('selectionMode') === 'single' && this.isItemSelected(e.currentTarget)) {
        return;
      }
      this.callBase(e);
    },
    _clean: function _clean() {
      this._deferredTemplates = [];
      this._cleanScrolling();
      this.callBase();
    },
    _toggleFocusedNextClass: function _toggleFocusedNextClass(index, isNextTabFocused) {
      this._itemElements().eq(index).toggleClass(FOCUSED_NEXT_TAB_CLASS, isNextTabFocused);
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'useInkRipple':
        case 'scrollingEnabled':
        case 'showNavButtons':
          this._invalidate();
          break;
        case 'scrollByContent':
          this._scrollable && this._scrollable.option(args.name, args.value);
          break;
        case 'width':
          this.callBase(args);
          this._dimensionChanged();
          break;
        case 'selectionMode':
          this._renderMultiple();
          this.callBase(args);
          break;
        case 'badgeExpr':
          this._invalidate();
          break;
        case 'focusedElement':
          {
            var _this$option = this.option(),
                selectedIndex = _this$option.selectedIndex;
            var currentIndex = (0, _renderer.default)(args.value).index();
            if (currentIndex !== selectedIndex) {
              this._toggleFocusedNextClass(selectedIndex, currentIndex === selectedIndex + 1);
            }
            this.callBase(args);
            this._scrollToItem(args.value);
            break;
          }
        default:
          this.callBase(args);
      }
    },
    _afterItemElementInserted: function _afterItemElementInserted() {
      this.callBase();
      this._deferRenderScrolling();
    },
    _afterItemElementDeleted: function _afterItemElementDeleted($item, deletedActionArgs) {
      this.callBase($item, deletedActionArgs);
      this._renderScrolling();
    },
    getScrollable: function getScrollable() {
      return this._scrollable;
    }
  });
  Tabs.ItemClass = _item.default;
  (0, _component_registrator.default)('dxTabs', Tabs);
  var _default = Tabs;
  /**
   * @name dxTabsItem
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
    define(["../core/utils/size","../core/renderer","../events/core/events_engine","../core/devices","../core/component_registrator","./button","./widget/utils.ink_ripple","../events/utils/index","../core/utils/extend","../core/utils/type","../events/pointer","../core/utils/iterator","./tabs/item","./tabs/constants","./themes","../events/hold","./scroll_view/ui.scrollable","./collection/ui.collection_widget.live_update","../core/utils/icon","../core/templates/bindable_template","../core/utils/deferred","../renovation/ui/scroll_view/utils/get_boundary_props","../renovation/ui/scroll_view/utils/get_scroll_left_max"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../events/core/events_engine"), require("../core/devices"), require("../core/component_registrator"), require("./button"), require("./widget/utils.ink_ripple"), require("../events/utils/index"), require("../core/utils/extend"), require("../core/utils/type"), require("../events/pointer"), require("../core/utils/iterator"), require("./tabs/item"), require("./tabs/constants"), require("./themes"), require("../events/hold"), require("./scroll_view/ui.scrollable"), require("./collection/ui.collection_widget.live_update"), require("../core/utils/icon"), require("../core/templates/bindable_template"), require("../core/utils/deferred"), require("../renovation/ui/scroll_view/utils/get_boundary_props"), require("../renovation/ui/scroll_view/utils/get_scroll_left_max"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tabs.js.map