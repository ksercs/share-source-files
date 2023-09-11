/**
* DevExtreme (esm/ui/tabs.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWidth, getHeight, getOuterWidth } from '../core/utils/size';
import $ from '../core/renderer';
import eventsEngine from '../events/core/events_engine';
import devices from '../core/devices';
import registerComponent from '../core/component_registrator';
import Button from './button';
import { render } from './widget/utils.ink_ripple';
import { addNamespace } from '../events/utils/index';
import { extend } from '../core/utils/extend';
import { isPlainObject } from '../core/utils/type';
import pointerEvents from '../events/pointer';
import { each } from '../core/utils/iterator';
import TabsItem from './tabs/item';
import { TABS_EXPANDED_CLASS } from './tabs/constants';
import { isMaterial, current as currentTheme } from './themes';
import holdEvent from '../events/hold';
import Scrollable from './scroll_view/ui.scrollable';
import { default as CollectionWidget } from './collection/ui.collection_widget.live_update';
import { getImageContainer } from '../core/utils/icon';
import { BindableTemplate } from '../core/templates/bindable_template';
import { Deferred, when } from '../core/utils/deferred';
import { isReachedLeft, isReachedRight, isReachedTop, isReachedBottom } from '../renovation/ui/scroll_view/utils/get_boundary_props';
import { getScrollLeftMax } from '../renovation/ui/scroll_view/utils/get_scroll_left_max';
import { getWindow } from '../core/utils/window';

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
var STATE_DISABLED_CLASS = 'dx-state-disabled';
var FOCUSED_DISABLED_NEXT_TAB_CLASS = 'dx-focused-disabled-next-tab';
var FOCUSED_DISABLED_PREV_TAB_CLASS = 'dx-focused-disabled-prev-tab';
var TABS_ORIENTATION_CLASS = {
  vertical: 'dx-tabs-vertical',
  horizontal: 'dx-tabs-horizontal'
};
var TABS_ICON_POSITION_CLASS = {
  top: 'dx-tabs-icon-position-top',
  end: 'dx-tabs-icon-position-end',
  bottom: 'dx-tabs-icon-position-bottom',
  start: 'dx-tabs-icon-position-start'
};
var TABS_STYLING_MODE_CLASS = {
  primary: 'dx-tabs-styling-mode-primary',
  secondary: 'dx-tabs-styling-mode-secondary'
};
var TABS_ITEM_DATA_KEY = 'dxTabData';
var BUTTON_NEXT_ICON = 'chevronnext';
var BUTTON_PREV_ICON = 'chevronprev';
var FEEDBACK_HIDE_TIMEOUT = 100;
var FEEDBACK_DURATION_INTERVAL = 5;
var FEEDBACK_SCROLL_TIMEOUT = 300;
var TAB_OFFSET = 30;
var ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
var SCROLLABLE_DIRECTION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
var ICON_POSITION = {
  top: 'top',
  end: 'end',
  bottom: 'bottom',
  start: 'start'
};
var STYLING_MODE = {
  primary: 'primary',
  secondary: 'secondary'
};
var Tabs = CollectionWidget.inherit({
  _activeStateUnit: '.' + TABS_ITEM_CLASS,
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      hoverStateEnabled: true,
      showNavButtons: true,
      scrollByContent: true,
      scrollingEnabled: true,
      selectionMode: 'single',
      orientation: ORIENTATION.horizontal,
      iconPosition: ICON_POSITION.start,
      stylingMode: STYLING_MODE.primary,
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
    var themeName = currentTheme();
    return this.callBase().concat([{
      device: function device() {
        return devices.real().deviceType !== 'desktop';
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
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function device() {
        return isMaterial(themeName);
      },
      options: {
        useInkRipple: true,
        selectOnFocus: false,
        iconPosition: ICON_POSITION.top
      }
    }]);
  },
  _init() {
    var {
      orientation,
      stylingMode
    } = this.option();
    this.callBase();
    this.setAria('role', 'tablist');
    this.$element().addClass(TABS_CLASS);
    this._toggleOrientationClass(orientation);
    this._toggleIconPositionClass();
    this._toggleStylingModeClass(stylingMode);
    this._renderWrapper();
    this._renderMultiple();
    this._feedbackHideTimeout = FEEDBACK_HIDE_TIMEOUT;
  },
  _initTemplates: function _initTemplates() {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate(function ($container, data) {
        if (isPlainObject(data)) {
          this._prepareDefaultItemTemplate(data, $container);
        } else {
          $container.text(String(data));
        }
        var $iconElement = getImageContainer(data.icon);
        $iconElement && $iconElement.prependTo($container);
        $container.wrapInner($('<span>').addClass(TABS_ITEM_TEXT_CLASS));
      }.bind(this), ['text', 'html', 'icon'], this.option('integrationOptions.watchMethod'))
    });
  },
  _createItemByTemplate: function _createItemByTemplate(itemTemplate, renderArgs) {
    var {
      itemData,
      container,
      index
    } = renderArgs;
    this._deferredTemplates[index] = new Deferred();
    return itemTemplate.render({
      model: itemData,
      container,
      index,
      onRendered: () => this._deferredTemplates[index].resolve()
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
  _deferRenderScrolling() {
    when.apply(this, this._deferredTemplates).done(() => this._renderScrolling());
  },
  _renderScrolling() {
    var removeClasses = [TABS_STRETCHED_CLASS, TABS_EXPANDED_CLASS, OVERFLOW_HIDDEN_CLASS];
    this.$element().removeClass(removeClasses.join(' '));
    if (this.option('scrollingEnabled') && this._isItemsSizeExceeded()) {
      if (!this._scrollable) {
        this._renderScrollable();
        this._renderNavButtons();
      }
      var scrollable = this.getScrollable();
      scrollable.update();
      if (this.option('rtlEnabled')) {
        var maxLeftOffset = getScrollLeftMax($(this.getScrollable().container()).get(0));
        scrollable.scrollTo({
          left: maxLeftOffset
        });
      }
      this._updateNavButtonsVisibility();
      this._scrollToItem(this.option('selectedItem'));
    }
    if (!(this.option('scrollingEnabled') && this._isItemsSizeExceeded())) {
      this._cleanScrolling();
      if (this._needStretchItems()) {
        this.$element().addClass(TABS_STRETCHED_CLASS);
      }
      this.$element().removeClass(TABS_NAV_BUTTONS_CLASS).addClass(TABS_EXPANDED_CLASS);
    }
  },
  _isVertical() {
    return this.option('orientation') === ORIENTATION.vertical;
  },
  _isServerSide() {
    var window = getWindow();
    return window.isWindowMock || !window;
  },
  _isItemsSizeExceeded() {
    var isVertical = this._isVertical();
    var isItemsSizeExceeded = isVertical ? this._isItemsHeightExceeded() : this._isItemsWidthExceeded();
    return isItemsSizeExceeded;
  },
  _isItemsWidthExceeded() {
    var $visibleItems = this._getVisibleItems();
    var tabItemsWidth = this._getSummaryItemsSize('width', $visibleItems, true);
    var elementWidth = getWidth(this.$element());
    if ([tabItemsWidth, elementWidth].includes(0)) {
      return false;
    }
    var isItemsWidthExceeded = tabItemsWidth + 5 > elementWidth;
    return isItemsWidthExceeded;
  },
  _isItemsHeightExceeded() {
    var $visibleItems = this._getVisibleItems();
    var itemsHeight = this._getSummaryItemsSize('height', $visibleItems, true);
    var elementHeight = getHeight(this.$element());
    return itemsHeight - 1 > elementHeight;
  },
  _needStretchItems() {
    var $visibleItems = this._getVisibleItems();
    var elementWidth = getWidth(this.$element());
    var itemsWidth = [];
    each($visibleItems, (_, item) => {
      itemsWidth.push(getOuterWidth(item, true));
    });
    var maxTabWidth = Math.max.apply(null, itemsWidth);
    var needStretchItems = maxTabWidth >= elementWidth / $visibleItems.length;
    return needStretchItems;
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
    this._inkRipple = render();
  },
  _getPointerEvent() {
    return pointerEvents.up;
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
    this._$wrapper = $('<div>').addClass(TABS_WRAPPER_CLASS);
    this.$element().append(this._$wrapper);
  },
  _itemContainer: function _itemContainer() {
    return this._$wrapper;
  },
  _getScrollableDirection() {
    var isVertical = this._isVertical();
    var scrollableDirection = isVertical ? SCROLLABLE_DIRECTION.vertical : SCROLLABLE_DIRECTION.horizontal;
    return scrollableDirection;
  },
  _updateScrollableDirection() {
    var scrollable = this.getScrollable();
    if (scrollable) {
      var scrollableDirection = this._getScrollableDirection();
      scrollable.option('direction', scrollableDirection);
    } else {
      this._renderScrolling();
    }
  },
  _renderScrollable() {
    var $itemContainer = this.$element().wrapInner($('<div>').addClass(TABS_SCROLLABLE_CLASS)).children();
    this._scrollable = this._createComponent($itemContainer, Scrollable, {
      direction: this._getScrollableDirection(),
      showScrollbar: 'never',
      useKeyboard: false,
      useNative: false,
      scrollByContent: this.option('scrollByContent'),
      onScroll: () => {
        this._updateNavButtonsVisibility();
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
  _updateNavButtonsVisibility() {
    var isVertical = this._isVertical();
    var scrollable = this.getScrollable();
    if (isVertical) {
      var _this$_leftButton, _this$_rightButton;
      (_this$_leftButton = this._leftButton) === null || _this$_leftButton === void 0 ? void 0 : _this$_leftButton.option('disabled', isReachedTop(scrollable.scrollTop(), 1));
      (_this$_rightButton = this._rightButton) === null || _this$_rightButton === void 0 ? void 0 : _this$_rightButton.option('disabled', isReachedBottom($(scrollable.container()).get(0), scrollable.scrollTop(), 0, 1));
    } else {
      var _this$_leftButton2, _this$_rightButton2;
      (_this$_leftButton2 = this._leftButton) === null || _this$_leftButton2 === void 0 ? void 0 : _this$_leftButton2.option('disabled', isReachedLeft(scrollable.scrollLeft(), 1));
      (_this$_rightButton2 = this._rightButton) === null || _this$_rightButton2 === void 0 ? void 0 : _this$_rightButton2.option('disabled', isReachedRight($(scrollable.container()).get(0), scrollable.scrollLeft(), 1));
    }
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
    var holdEventName = addNamespace(holdEvent.name, 'dxNavButton');
    var pointerUpEventName = addNamespace(pointerEvents.up, 'dxNavButton');
    var pointerOutEventName = addNamespace(pointerEvents.out, 'dxNavButton');
    var navButton = this._createComponent($('<div>').addClass(TABS_NAV_BUTTON_CLASS), Button, {
      focusStateEnabled: false,
      icon: icon,
      onClick: function onClick() {
        that._updateScrollPosition(offset, 1);
      },
      integrationOptions: {}
    });
    var $navButton = navButton.$element();
    eventsEngine.on($navButton, holdEventName, {
      timeout: FEEDBACK_SCROLL_TIMEOUT
    }, function (e) {
      holdAction({
        event: e
      });
    }.bind(this));
    eventsEngine.on($navButton, pointerUpEventName, function () {
      that._clearInterval();
    });
    eventsEngine.on($navButton, pointerOutEventName, function () {
      that._clearInterval();
    });
    return navButton;
  },
  _clearInterval: function _clearInterval() {
    if (this._holdInterval) clearInterval(this._holdInterval);
  },
  _updateSelection: function _updateSelection(addedSelection) {
    this._scrollable && this._scrollable.scrollToElement(this.itemElements().eq(addedSelection[0]));
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
  _toggleTabsVerticalClass(value) {
    this.$element().toggleClass(TABS_ORIENTATION_CLASS.vertical, value);
  },
  _toggleTabsHorizontalClass(value) {
    this.$element().toggleClass(TABS_ORIENTATION_CLASS.horizontal, value);
  },
  _toggleOrientationClass(orientation) {
    var isVertical = orientation === ORIENTATION.vertical;
    this._toggleTabsVerticalClass(isVertical);
    this._toggleTabsHorizontalClass(!isVertical);
  },
  _getTabsIconPositionClass() {
    var position = this.option('iconPosition');
    switch (position) {
      case ICON_POSITION.top:
        return TABS_ICON_POSITION_CLASS.top;
      case ICON_POSITION.end:
        return TABS_ICON_POSITION_CLASS.end;
      case ICON_POSITION.bottom:
        return TABS_ICON_POSITION_CLASS.bottom;
      case ICON_POSITION.start:
      default:
        return TABS_ICON_POSITION_CLASS.start;
    }
  },
  _toggleIconPositionClass() {
    for (var key in TABS_ICON_POSITION_CLASS) {
      this.$element().removeClass(TABS_ICON_POSITION_CLASS[key]);
    }
    var newClass = this._getTabsIconPositionClass();
    this.$element().addClass(newClass);
  },
  _toggleFocusedDisabledNextClass(currentIndex, isNextDisabled) {
    this._itemElements().eq(currentIndex).toggleClass(FOCUSED_DISABLED_NEXT_TAB_CLASS, isNextDisabled);
  },
  _toggleFocusedDisabledPrevClass(currentIndex, isPrevDisabled) {
    this._itemElements().eq(currentIndex).toggleClass(FOCUSED_DISABLED_PREV_TAB_CLASS, isPrevDisabled);
  },
  _toggleFocusedDisabledClasses(value) {
    var {
      selectedIndex: currentIndex
    } = this.option();
    this._itemElements().removeClass(FOCUSED_DISABLED_NEXT_TAB_CLASS).removeClass(FOCUSED_DISABLED_PREV_TAB_CLASS);
    var prevItemIndex = currentIndex - 1;
    var nextItemIndex = currentIndex + 1;
    var nextFocusedIndex = $(value).index();
    var isNextDisabled = this._itemElements().eq(nextItemIndex).hasClass(STATE_DISABLED_CLASS);
    var isPrevDisabled = this._itemElements().eq(prevItemIndex).hasClass(STATE_DISABLED_CLASS);
    var shouldNextClassBeSetted = isNextDisabled && nextFocusedIndex === nextItemIndex;
    var shouldPrevClassBeSetted = isPrevDisabled && nextFocusedIndex === prevItemIndex;
    this._toggleFocusedDisabledNextClass(currentIndex, shouldNextClassBeSetted);
    this._toggleFocusedDisabledPrevClass(currentIndex, shouldPrevClassBeSetted);
  },
  _toggleStylingModeClass(value) {
    var _TABS_STYLING_MODE_CL;
    for (var key in TABS_STYLING_MODE_CLASS) {
      this.$element().removeClass(TABS_STYLING_MODE_CLASS[key]);
    }
    this.$element().addClass((_TABS_STYLING_MODE_CL = TABS_STYLING_MODE_CLASS[value]) !== null && _TABS_STYLING_MODE_CL !== void 0 ? _TABS_STYLING_MODE_CL : TABS_STYLING_MODE_CLASS.primary);
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
      case 'height':
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
          this._toggleFocusedDisabledClasses(args.value);
          this.callBase(args);
          this._scrollToItem(args.value);
          break;
        }
      case 'orientation':
        {
          this._toggleOrientationClass(args.value);
          if (!this._isServerSide()) {
            this._updateScrollableDirection();
          }
          break;
        }
      case 'iconPosition':
        {
          this._toggleIconPositionClass();
          if (!this._isServerSide()) {
            this._dimensionChanged();
          }
          break;
        }
      case 'stylingMode':
        {
          this._toggleStylingModeClass(args.value);
          break;
        }
      default:
        this.callBase(args);
    }
  },
  _afterItemElementInserted() {
    this.callBase();
    this._deferRenderScrolling();
  },
  _afterItemElementDeleted($item, deletedActionArgs) {
    this.callBase($item, deletedActionArgs);
    this._renderScrolling();
  },
  getScrollable() {
    return this._scrollable;
  }
});
Tabs.ItemClass = TabsItem;
registerComponent('dxTabs', Tabs);
export default Tabs;

/**
 * @name dxTabsItem
 * @inherits CollectionWidgetItem
 * @type object
 */
