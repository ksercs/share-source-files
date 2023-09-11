import $ from '../core/renderer';
import { touch } from '../core/utils/support';
import { extend } from '../core/utils/extend';
import devices from '../core/devices';
import domAdapter from '../core/dom_adapter';
import registerComponent from '../core/component_registrator';
import MultiView from './multi_view';
import Tabs from './tabs';
import { default as TabPanelItem } from './tab_panel/item';
import { getImageContainer } from '../core/utils/icon';
import { getPublicElement } from '../core/element';
import { isPlainObject, isDefined } from '../core/utils/type';
import { BindableTemplate } from '../core/templates/bindable_template';

// STYLE tabPanel

var TABPANEL_CLASS = 'dx-tabpanel';
var TABPANEL_TABS_CLASS = 'dx-tabpanel-tabs';
var TABPANEL_TABS_ITEM_CLASS = 'dx-tabpanel-tab';
var TABPANEL_CONTAINER_CLASS = 'dx-tabpanel-container';
var TABS_ITEM_TEXT_CLASS = 'dx-tab-text';
var DISABLED_FOCUSED_TAB_CLASS = 'dx-disabled-focused-tab';
var TABPANEL_TABS_POSITION_CLASS = {
  top: 'dx-tabpanel-tabs-position-top',
  right: 'dx-tabpanel-tabs-position-right',
  bottom: 'dx-tabpanel-tabs-position-bottom',
  left: 'dx-tabpanel-tabs-position-left'
};
var TABS_POSITION = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left'
};
var TABS_ORIENTATION = {
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
var TabPanel = MultiView.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      itemTitleTemplate: 'title',
      hoverStateEnabled: true,
      showNavButtons: false,
      scrollByContent: true,
      scrollingEnabled: true,
      tabsPosition: TABS_POSITION.top,
      iconPosition: ICON_POSITION.start,
      stylingMode: STYLING_MODE.primary,
      onTitleClick: null,
      onTitleHold: null,
      onTitleRendered: null,
      badgeExpr: function badgeExpr(data) {
        return data ? data.badge : undefined;
      }

      /**
      * @name dxTabPanelItem.visible
      * @hidden
      */
    });
  },

  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function device() {
        return !touch;
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
    }]);
  },
  _init: function _init() {
    this.callBase();
    this.$element().addClass(TABPANEL_CLASS);
    this._toggleTabPanelTabsPositionClass();
    this.setAria('role', 'tabpanel');
  },
  _initMarkup: function _initMarkup() {
    this.callBase();
    this._createTitleActions();
    this._renderLayout();
  },
  _initTemplates: function _initTemplates() {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      title: new BindableTemplate(function ($container, data) {
        if (isPlainObject(data)) {
          var $iconElement = getImageContainer(data.icon);
          if ($iconElement) {
            $container.append($iconElement);
          }
          if (isDefined(data.title) && !isPlainObject(data.title)) {
            $container.append(domAdapter.createTextNode(data.title));
          }
        } else {
          if (isDefined(data)) {
            $container.text(String(data));
          }
        }
        $container.wrapInner($('<span>').addClass(TABS_ITEM_TEXT_CLASS));
      }, ['title', 'icon'], this.option('integrationOptions.watchMethod'))
    });
  },
  _createTitleActions: function _createTitleActions() {
    this._createTitleClickAction();
    this._createTitleHoldAction();
    this._createTitleRenderedAction();
  },
  _createTitleClickAction: function _createTitleClickAction() {
    this._titleClickAction = this._createActionByOption('onTitleClick');
  },
  _createTitleHoldAction: function _createTitleHoldAction() {
    this._titleHoldAction = this._createActionByOption('onTitleHold');
  },
  _createTitleRenderedAction: function _createTitleRenderedAction() {
    this._titleRenderedAction = this._createActionByOption('onTitleRendered');
  },
  _renderLayout: function _renderLayout() {
    if (this._tabs) {
      return;
    }
    var $element = this.$element();
    this._$tabContainer = $('<div>').addClass(TABPANEL_TABS_CLASS).appendTo($element);
    var $tabs = $('<div>').appendTo(this._$tabContainer);
    this._tabs = this._createComponent($tabs, Tabs, this._tabConfig());
    this._$container = $('<div>').addClass(TABPANEL_CONTAINER_CLASS).appendTo($element);
    this._$container.append(this._$wrapper);
  },
  _refreshActiveDescendant: function _refreshActiveDescendant() {
    if (!this._tabs) {
      return;
    }
    var tabs = this._tabs;
    var tabItems = tabs.itemElements();
    var $activeTab = $(tabItems[tabs.option('selectedIndex')]);
    var id = this.getFocusedItemId();
    this.setAria('controls', undefined, $(tabItems));
    this.setAria('controls', id, $activeTab);
  },
  _tabConfig: function _tabConfig() {
    return {
      selectOnFocus: true,
      focusStateEnabled: this.option('focusStateEnabled'),
      hoverStateEnabled: this.option('hoverStateEnabled'),
      repaintChangesOnly: this.option('repaintChangesOnly'),
      tabIndex: this.option('tabIndex'),
      selectedIndex: this.option('selectedIndex'),
      badgeExpr: this.option('badgeExpr'),
      onItemClick: this._titleClickAction.bind(this),
      onItemHold: this._titleHoldAction.bind(this),
      itemHoldTimeout: this.option('itemHoldTimeout'),
      onSelectionChanged: function (e) {
        this.option('selectedIndex', e.component.option('selectedIndex'));
        this._refreshActiveDescendant();
      }.bind(this),
      onItemRendered: this._titleRenderedAction.bind(this),
      itemTemplate: this._getTemplateByOption('itemTitleTemplate'),
      items: this.option('items'),
      noDataText: null,
      scrollingEnabled: this.option('scrollingEnabled'),
      scrollByContent: this.option('scrollByContent'),
      showNavButtons: this.option('showNavButtons'),
      itemTemplateProperty: 'tabTemplate',
      loopItemFocus: this.option('loop'),
      selectionRequired: true,
      onOptionChanged: function (args) {
        if (args.name === 'focusedElement') {
          if (args.value) {
            var $value = $(args.value);
            var $newItem = this._itemElements().eq($value.index());
            this.option('focusedElement', getPublicElement($newItem));
          } else {
            this.option('focusedElement', args.value);
          }
        }
      }.bind(this),
      onFocusIn: function (args) {
        this._focusInHandler(args.event);
      }.bind(this),
      onFocusOut: function (args) {
        if (!this._isFocusOutHandlerExecuting) {
          this._focusOutHandler(args.event);
        }
      }.bind(this),
      orientation: this._getTabsOrientation(),
      iconPosition: this.option('iconPosition'),
      stylingMode: this.option('stylingMode'),
      _itemAttributes: {
        class: TABPANEL_TABS_ITEM_CLASS
      }
    };
  },
  _renderFocusTarget: function _renderFocusTarget() {
    this._focusTarget().attr('tabIndex', -1);
  },
  _getTabsOrientation() {
    var {
      tabsPosition
    } = this.option();
    if ([TABS_POSITION.right, TABS_POSITION.left].includes(tabsPosition)) {
      return TABS_ORIENTATION.vertical;
    }
    return TABS_ORIENTATION.horizontal;
  },
  _getTabPanelTabsPositionClass() {
    var position = this.option('tabsPosition');
    switch (position) {
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
  },
  _toggleTabPanelTabsPositionClass() {
    for (var key in TABPANEL_TABS_POSITION_CLASS) {
      this.$element().removeClass(TABPANEL_TABS_POSITION_CLASS[key]);
    }
    var newClass = this._getTabPanelTabsPositionClass();
    this.$element().addClass(newClass);
  },
  _updateTabsOrientation() {
    var orientation = this._getTabsOrientation();
    this._tabs.option('orientation', orientation);
  },
  _updateTabsIconPosition(iconPosition) {
    this._tabs.option({
      iconPosition
    });
  },
  _updateTabsStylingMode(stylingMode) {
    this._tabs.option({
      stylingMode
    });
  },
  _toggleWrapperFocusedClass(isFocused) {
    this._toggleFocusClass(isFocused, this._$wrapper);
  },
  _toggleDisabledFocusedClass(isFocused) {
    this._focusTarget().toggleClass(DISABLED_FOCUSED_TAB_CLASS, isFocused);
  },
  _updateFocusState: function _updateFocusState(e, isFocused) {
    this.callBase(e, isFocused);
    var isTabsTarget = e.target === this._tabs._focusTarget().get(0);
    var isMultiViewTarget = e.target === this._focusTarget().get(0);
    if (isTabsTarget) {
      this._toggleFocusClass(isFocused, this._focusTarget());
    }
    if (isTabsTarget || isMultiViewTarget) {
      var isDisabled = this._isDisabled(this.option('focusedElement'));
      this._toggleWrapperFocusedClass(isFocused && !isDisabled);
      this._toggleDisabledFocusedClass(isFocused && isDisabled);
    }
    if (isMultiViewTarget) {
      this._toggleFocusClass(isFocused, this._tabs.option('focusedElement'));
    }
  },
  _focusOutHandler: function _focusOutHandler(e) {
    this._isFocusOutHandlerExecuting = true;
    this.callBase.apply(this, arguments);
    this._tabs._focusOutHandler(e);
    this._isFocusOutHandlerExecuting = false;
  },
  _setTabsOption: function _setTabsOption(name, value) {
    if (this._tabs) {
      this._tabs.option(name, value);
    }
  },
  _visibilityChanged: function _visibilityChanged(visible) {
    if (visible) {
      this._tabs._dimensionChanged();
    }
  },
  registerKeyHandler: function registerKeyHandler(key, handler) {
    this.callBase(key, handler);
    if (this._tabs) {
      this._tabs.registerKeyHandler(key, handler);
    }
  },
  repaint: function repaint() {
    this.callBase();
    this._tabs.repaint();
  },
  _optionChanged: function _optionChanged(args) {
    var {
      name,
      value,
      fullName
    } = args;
    switch (name) {
      case 'dataSource':
        this.callBase(args);
        break;
      case 'items':
        this._setTabsOption(name, this.option(name));
        if (!this.option('repaintChangesOnly')) {
          this._tabs.repaint();
        }
        this.callBase(args);
        break;
      case 'width':
        this.callBase(args);
        this._tabs.repaint();
        break;
      case 'selectedIndex':
      case 'selectedItem':
        {
          this._setTabsOption(fullName, value);
          this.callBase(args);
          if (this.option('focusStateEnabled') === true) {
            var selectedIndex = this.option('selectedIndex');
            var selectedTabContent = this._itemElements().eq(selectedIndex);
            this.option('focusedElement', getPublicElement(selectedTabContent));
          }
          break;
        }
      case 'itemHoldTimeout':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        this._setTabsOption(fullName, value);
        this.callBase(args);
        break;
      case 'scrollingEnabled':
      case 'scrollByContent':
      case 'showNavButtons':
        this._setTabsOption(fullName, value);
        break;
      case 'focusedElement':
        {
          var id = value ? $(value).index() : value;
          var newItem = value ? this._tabs._itemElements().eq(id) : value;
          this._setTabsOption('focusedElement', getPublicElement(newItem));
          if (value) {
            var isDisabled = this._isDisabled(value);
            this._toggleWrapperFocusedClass(!isDisabled);
            this._toggleDisabledFocusedClass(isDisabled);
          }
          this.callBase(args);
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
        break;
      case 'badgeExpr':
        this._invalidate();
        break;
      case 'tabsPosition':
        this._toggleTabPanelTabsPositionClass();
        this._updateTabsOrientation();
        break;
      case 'iconPosition':
        this._updateTabsIconPosition(value);
        break;
      case 'stylingMode':
        this._updateTabsStylingMode(value);
        break;
      default:
        this.callBase(args);
    }
  }
});
TabPanel.ItemClass = TabPanelItem;
registerComponent('dxTabPanel', TabPanel);
export default TabPanel;

/**
 * @name dxTabPanelItem
 * @inherits dxMultiViewItem
 * @type object
 */