/**
* DevExtreme (esm/__internal/ui/tab_panel/tab_panel.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import domAdapter from '../../../core/dom_adapter';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { BindableTemplate } from '../../../core/templates/bindable_template';
import { getImageContainer } from '../../../core/utils/icon';
import { isDefined, isPlainObject } from '../../../core/utils/type';
import { current as currentTheme, isFluent, isMaterialBased } from '../../../ui/themes';
import supportUtils from '../../core/utils/m_support';
import MultiView from '../../ui/m_multi_view';
import Tabs from '../../ui/tabs/tabs';
// eslint-disable-next-line import/no-named-default
import { default as TabPanelItem } from './item';
export const TABPANEL_CLASS = 'dx-tabpanel';
const TABPANEL_TABS_CLASS = 'dx-tabpanel-tabs';
const TABPANEL_TABS_ITEM_CLASS = 'dx-tabpanel-tab';
const TABPANEL_CONTAINER_CLASS = 'dx-tabpanel-container';
const TABS_ITEM_TEXT_CLASS = 'dx-tab-text';
const DISABLED_FOCUSED_TAB_CLASS = 'dx-disabled-focused-tab';
const TABS_ITEM_TEXT_SPAN_CLASS = 'dx-tab-text-span';
const TABS_ITEM_TEXT_SPAN_PSEUDO_CLASS = 'dx-tab-text-span-pseudo';
const TABPANEL_TABS_POSITION_CLASS = {
  top: 'dx-tabpanel-tabs-position-top',
  right: 'dx-tabpanel-tabs-position-right',
  bottom: 'dx-tabpanel-tabs-position-bottom',
  left: 'dx-tabpanel-tabs-position-left'
};
const TABS_POSITION = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left'
};
const TABS_INDICATOR_POSITION_BY_TABS_POSITION = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
};
const TABS_ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
const ICON_POSITION = {
  top: 'top',
  end: 'end',
  bottom: 'bottom',
  start: 'start'
};
const STYLING_MODE = {
  primary: 'primary',
  secondary: 'secondary'
};
class TabPanel extends MultiView {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      itemTitleTemplate: 'title',
      hoverStateEnabled: true,
      selectOnFocus: false,
      showNavButtons: false,
      scrollByContent: true,
      scrollingEnabled: true,
      tabsPosition: TABS_POSITION.top,
      iconPosition: ICON_POSITION.start,
      stylingMode: STYLING_MODE.primary,
      // @ts-expect-error ts-error
      onTitleClick: null,
      // @ts-expect-error ts-error
      onTitleHold: null,
      // @ts-expect-error ts-error
      onTitleRendered: null,
      badgeExpr(data) {
        return data === null || data === void 0 ? void 0 : data.badge;
      },
      _tabsIndicatorPosition: null
    });
  }
  _defaultOptionsRules() {
    const themeName = currentTheme();
    return super._defaultOptionsRules().concat([{
      device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        return !supportUtils.touch;
      },
      options: {
        swipeEnabled: false
      }
    }, {
      device: {
        platform: 'generic'
      },
      options: {
        animationEnabled: false
      }
    }, {
      device() {
        return isFluent(themeName);
      },
      options: {
        stylingMode: STYLING_MODE.secondary
      }
    }, {
      device() {
        return isMaterialBased(themeName);
      },
      options: {
        iconPosition: ICON_POSITION.top
      }
    }]);
  }
  _init() {
    super._init();
    this.$element().addClass(TABPANEL_CLASS);
    this._toggleTabPanelTabsPositionClass();
  }
  _getElementAria() {
    return {
      role: 'tabpanel'
    };
  }
  _getItemAria() {
    return {
      role: 'tabpanel'
    };
  }
  _initMarkup() {
    super._initMarkup();
    this._createTitleActions();
    this._renderLayout();
  }
  _prepareTabsItemTemplate(data, $container) {
    const $iconElement = getImageContainer(data === null || data === void 0 ? void 0 : data.icon);
    if ($iconElement) {
      $container.append($iconElement);
    }
    const title = isPlainObject(data) ? data === null || data === void 0 ? void 0 : data.title : data;
    if (isDefined(title) && !isPlainObject(title)) {
      const $tabTextSpan = $('<span>').addClass(TABS_ITEM_TEXT_SPAN_CLASS);
      $tabTextSpan.append(domAdapter.createTextNode(title));
      const $tabTextSpanPseudo = $('<span>').addClass(TABS_ITEM_TEXT_SPAN_PSEUDO_CLASS);
      $tabTextSpanPseudo.append(domAdapter.createTextNode(title));
      $tabTextSpanPseudo.appendTo($tabTextSpan);
      $tabTextSpan.appendTo($container);
    }
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      title: new BindableTemplate(($container, data) => {
        this._prepareTabsItemTemplate(data, $container);
        const $tabItem = $('<div>').addClass(TABS_ITEM_TEXT_CLASS);
        $container.wrapInner($tabItem);
      }, ['title', 'icon'], this.option('integrationOptions.watchMethod'))
    });
  }
  _createTitleActions() {
    this._createTitleClickAction();
    this._createTitleHoldAction();
    this._createTitleRenderedAction();
  }
  _createTitleClickAction() {
    this._titleClickAction = this._createActionByOption('onTitleClick');
  }
  _createTitleHoldAction() {
    this._titleHoldAction = this._createActionByOption('onTitleHold');
  }
  _createTitleRenderedAction() {
    this._titleRenderedAction = this._createActionByOption('onTitleRendered');
  }
  _renderLayout() {
    if (this._tabs) {
      return;
    }
    const $element = this.$element();
    this._$tabContainer = $('<div>').addClass(TABPANEL_TABS_CLASS).appendTo($element);
    const $tabs = $('<div>').appendTo(this._$tabContainer);
    this._tabs = this._createComponent($tabs, Tabs, this._tabConfig());
    this._$container = $('<div>').addClass(TABPANEL_CONTAINER_CLASS).appendTo($element);
    this._$container.append(this._$wrapper);
  }
  _refreshActiveDescendant() {
    if (!this._tabs) {
      return;
    }
    const tabs = this._tabs;
    const tabItems = tabs.itemElements();
    // @ts-expect-error ts-error
    const $activeTab = $(tabItems[tabs.option('selectedIndex')]);
    const id = this.getFocusedItemId();
    this.setAria('controls', undefined, $(tabItems));
    this.setAria('controls', id, $activeTab);
  }
  _getTabsIndicatorPosition() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _tabsIndicatorPosition,
      tabsPosition
    } = this.option();
    return _tabsIndicatorPosition ?? TABS_INDICATOR_POSITION_BY_TABS_POSITION[tabsPosition ?? TABS_POSITION.top];
  }
  _tabConfig() {
    const tabsIndicatorPosition = this._getTabsIndicatorPosition();
    const {
      focusStateEnabled,
      hoverStateEnabled,
      repaintChangesOnly,
      tabIndex,
      selectedIndex,
      badgeExpr,
      itemHoldTimeout,
      items,
      scrollingEnabled,
      scrollByContent,
      showNavButtons,
      loop,
      iconPosition,
      stylingMode
    } = this.option();
    return {
      selectOnFocus: true,
      focusStateEnabled,
      hoverStateEnabled,
      repaintChangesOnly,
      tabIndex,
      selectedIndex,
      badgeExpr,
      onItemClick: this._titleClickAction.bind(this),
      onItemHold: this._titleHoldAction.bind(this),
      itemHoldTimeout,
      onSelectionChanging: e => {
        const newTabsSelectedItemData = e.addedItems[0];
        const newTabsSelectedIndex = this._getIndexByItemData(newTabsSelectedItemData);
        const selectingResult = this.selectItem(newTabsSelectedIndex);
        // @ts-expect-error ts-error
        const promiseState = selectingResult.state();
        if (promiseState !== 'pending') {
          // NOTE: Keep selection change process synchronious if possible.
          e.cancel = promiseState === 'rejected';
          return;
        }
        e.cancel = new Promise(resolve => {
          selectingResult
          // @ts-expect-error ts-error
          .done(() => {
            resolve(false);
          }).fail(() => {
            resolve(true);
          });
        });
      },
      onSelectionChanged: () => {
        this._refreshActiveDescendant();
      },
      onItemRendered: this._titleRenderedAction.bind(this),
      itemTemplate: this._getTemplateByOption('itemTitleTemplate'),
      items,
      // @ts-expect-error ts-error
      noDataText: null,
      scrollingEnabled,
      scrollByContent,
      showNavButtons,
      itemTemplateProperty: 'tabTemplate',
      loopItemFocus: loop,
      selectionRequired: true,
      onOptionChanged: args => {
        if (args.name === 'focusedElement') {
          if (args.value) {
            const $value = $(args.value);
            const $newItem = this._itemElements().eq($value.index());
            this.option('focusedElement', getPublicElement($newItem));
          } else {
            this.option('focusedElement', args.value);
          }
        }
      },
      onFocusIn: args => {
        this._focusInHandler(args.event);
      },
      onFocusOut: args => {
        if (!this._isFocusOutHandlerExecuting) {
          this._focusOutHandler(args.event);
        }
      },
      orientation: this._getTabsOrientation(),
      iconPosition,
      stylingMode,
      _itemAttributes: {
        class: TABPANEL_TABS_ITEM_CLASS
      },
      _indicatorPosition: tabsIndicatorPosition
    };
  }
  _renderFocusTarget() {
    this._focusTarget().attr('tabIndex', -1);
  }
  _getTabsOrientation() {
    const {
      tabsPosition
    } = this.option();
    // @ts-expect-error ts-error
    if ([TABS_POSITION.right, TABS_POSITION.left].includes(tabsPosition)) {
      return TABS_ORIENTATION.vertical;
    }
    return TABS_ORIENTATION.horizontal;
  }
  _getTabPanelTabsPositionClass() {
    const {
      tabsPosition
    } = this.option();
    switch (tabsPosition) {
      case TABS_POSITION.right:
        return TABPANEL_TABS_POSITION_CLASS.right;
      case TABS_POSITION.bottom:
        return TABPANEL_TABS_POSITION_CLASS.bottom;
      case TABS_POSITION.left:
        return TABPANEL_TABS_POSITION_CLASS.left;
      case TABS_POSITION.top:
      default:
        return TABPANEL_TABS_POSITION_CLASS.top;
    }
  }
  _toggleTabPanelTabsPositionClass() {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in TABPANEL_TABS_POSITION_CLASS) {
      this.$element().removeClass(TABPANEL_TABS_POSITION_CLASS[key]);
    }
    const newClass = this._getTabPanelTabsPositionClass();
    this.$element().addClass(newClass);
  }
  _updateTabsOrientation() {
    const orientation = this._getTabsOrientation();
    this._setTabsOption('orientation', orientation);
  }
  _toggleWrapperFocusedClass(isFocused) {
    this._toggleFocusClass(isFocused, this._$wrapper);
  }
  _toggleDisabledFocusedClass(isFocused) {
    this._focusTarget().toggleClass(DISABLED_FOCUSED_TAB_CLASS, isFocused);
  }
  _updateFocusState(e, isFocused) {
    super._updateFocusState(e, isFocused);
    const isTabsTarget = e.target === this._tabs._focusTarget().get(0);
    const isMultiViewTarget = e.target === this._focusTarget().get(0);
    if (isTabsTarget) {
      this._toggleFocusClass(isFocused, this._focusTarget());
    }
    if (isTabsTarget || isMultiViewTarget) {
      // @ts-expect-error ts-error
      const isDisabled = this._isDisabled(this.option('focusedElement'));
      this._toggleWrapperFocusedClass(isFocused && !isDisabled);
      this._toggleDisabledFocusedClass(isFocused && isDisabled);
    }
    if (isMultiViewTarget) {
      this._toggleFocusClass(isFocused, this._tabs.$element());
      // @ts-expect-error ts-error
      this._toggleFocusClass(isFocused, this._tabs.option('focusedElement'));
    }
  }
  _focusOutHandler(e) {
    this._isFocusOutHandlerExecuting = true;
    super._focusOutHandler(e);
    this._tabs._focusOutHandler(e);
    this._isFocusOutHandlerExecuting = false;
  }
  _setTabsOption(name, value) {
    if (this._tabs) {
      this._tabs.option(name, value);
    }
  }
  _postprocessSwipe(args) {
    this._setTabsOption('selectedIndex', args.swipedTabsIndex);
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._tabs._dimensionChanged();
    }
  }
  registerKeyHandler(key, handler) {
    super.registerKeyHandler(key, handler);
    if (this._tabs) {
      this._tabs.registerKeyHandler(key, handler);
    }
  }
  repaint() {
    super.repaint();
    this._tabs.repaint();
  }
  _updateTabsIndicatorPosition() {
    const value = this._getTabsIndicatorPosition();
    this._setTabsOption('_indicatorPosition', value);
  }
  _optionChanged(args) {
    const {
      name,
      value,
      fullName
    } = args;
    switch (name) {
      case 'dataSource':
        super._optionChanged(args);
        break;
      case 'items':
        this._setTabsOption(name, this.option(name));
        if (!this.option('repaintChangesOnly')) {
          this._tabs.repaint();
        }
        super._optionChanged(args);
        break;
      case 'width':
        super._optionChanged(args);
        this._tabs.repaint();
        break;
      case 'selectedIndex':
      case 'selectedItem':
        {
          this._setTabsOption(fullName, value);
          super._optionChanged(args);
          const {
            focusStateEnabled
          } = this.option();
          if (focusStateEnabled === true) {
            const selectedIndex = this.option('selectedIndex');
            // @ts-expect-error ts-error
            const selectedTabContent = this._itemElements().eq(selectedIndex);
            this.option('focusedElement', getPublicElement(selectedTabContent));
          }
          break;
        }
      case 'itemHoldTimeout':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        this._setTabsOption(fullName, value);
        super._optionChanged(args);
        break;
      case 'scrollingEnabled':
      case 'scrollByContent':
      case 'showNavButtons':
        this._setTabsOption(fullName, value);
        break;
      case 'focusedElement':
        {
          // @ts-expect-error ts-error
          const id = value ? $(value).index() : value;
          // @ts-expect-error ts-error
          const newItem = value && this._tabs ? this._tabs._itemElements().eq(id) : value;
          // @ts-expect-error ts-error
          this._setTabsOption('focusedElement', getPublicElement(newItem));
          if (value) {
            // @ts-expect-error ts-error
            const isDisabled = this._isDisabled(value);
            this._toggleWrapperFocusedClass(!isDisabled);
            this._toggleDisabledFocusedClass(isDisabled);
          }
          super._optionChanged(args);
          break;
        }
      case 'itemTitleTemplate':
        this._setTabsOption('itemTemplate', this._getTemplateByOption('itemTitleTemplate'));
        break;
      case 'onTitleClick':
        this._createTitleClickAction();
        this._setTabsOption('onItemClick', this._titleClickAction.bind(this));
        break;
      case 'onTitleHold':
        this._createTitleHoldAction();
        this._setTabsOption('onItemHold', this._titleHoldAction.bind(this));
        break;
      case 'onTitleRendered':
        this._createTitleRenderedAction();
        this._setTabsOption('onItemRendered', this._titleRenderedAction.bind(this));
        break;
      case 'loop':
        this._setTabsOption('loopItemFocus', value);
        super._optionChanged(args);
        break;
      case 'badgeExpr':
        this._invalidate();
        break;
      case 'tabsPosition':
        this._toggleTabPanelTabsPositionClass();
        this._updateTabsIndicatorPosition();
        this._updateTabsOrientation();
        break;
      case 'iconPosition':
        this._setTabsOption('iconPosition', value);
        break;
      case 'stylingMode':
        this._setTabsOption('stylingMode', value);
        break;
      case '_tabsIndicatorPosition':
        this._setTabsOption('_indicatorPosition', value);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
TabPanel.ItemClass = TabPanelItem;
registerComponent('dxTabPanel', TabPanel);
export default TabPanel;
