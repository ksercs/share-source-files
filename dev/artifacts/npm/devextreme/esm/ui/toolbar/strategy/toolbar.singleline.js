/**
* DevExtreme (esm/ui/toolbar/strategy/toolbar.singleline.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWidth, getOuterWidth } from '../../../core/utils/size';
import $ from '../../../core/renderer';
import { each } from '../../../core/utils/iterator';
import { grep, deferRender } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import DropDownMenu from '../internal/ui.toolbar.menu';
import { compileGetter } from '../../../core/utils/data';
var INVISIBLE_STATE_CLASS = 'dx-state-invisible';
var TOOLBAR_DROP_DOWN_MENU_CONTAINER_CLASS = 'dx-toolbar-menu-container';
var TOOLBAR_BUTTON_CLASS = 'dx-toolbar-button';
var TOOLBAR_AUTO_HIDE_ITEM_CLASS = 'dx-toolbar-item-auto-hide';
var TOOLBAR_HIDDEN_ITEM = 'dx-toolbar-item-invisible';
export class SingleLineStrategy {
  constructor(toolbar) {
    this._toolbar = toolbar;
  }
  _initMarkup() {
    deferRender(() => {
      this._renderOverflowMenu();
      this._renderMenuItems();
    });
  }
  _renderOverflowMenu() {
    if (!this._hasVisibleMenuItems()) {
      return;
    }
    this._renderMenuButtonContainer();
    var $menu = $('<div>').appendTo(this._overflowMenuContainer());
    var itemClickAction = this._toolbar._createActionByOption('onItemClick');
    var menuItemTemplate = this._toolbar._getTemplateByOption('menuItemTemplate');
    this._menu = this._toolbar._createComponent($menu, DropDownMenu, {
      disabled: this._toolbar.option('disabled'),
      itemTemplate: () => menuItemTemplate,
      onItemClick: e => {
        itemClickAction(e);
      },
      container: this._toolbar.option('menuContainer'),
      onOptionChanged: _ref => {
        var {
          name,
          value
        } = _ref;
        if (name === 'opened') {
          this._toolbar.option('overflowMenuVisible', value);
        }
        if (name === 'items') {
          this._updateMenuVisibility(value);
        }
      }
    });
  }
  renderMenuItems() {
    if (!this._menu) {
      this._renderOverflowMenu();
    }
    this._menu && this._menu.option('items', this._getMenuItems());
    if (this._menu && !this._menu.option('items').length) {
      this._menu.option('opened', false);
    }
  }
  _renderMenuButtonContainer() {
    this._$overflowMenuContainer = $('<div>').appendTo(this._toolbar._$afterSection).addClass(TOOLBAR_BUTTON_CLASS).addClass(TOOLBAR_DROP_DOWN_MENU_CONTAINER_CLASS);
  }
  _overflowMenuContainer() {
    return this._$overflowMenuContainer;
  }
  _updateMenuVisibility(menuItems) {
    var items = menuItems !== null && menuItems !== void 0 ? menuItems : this._getMenuItems();
    var isMenuVisible = items.length && this._hasVisibleMenuItems(items);
    this._toggleMenuVisibility(isMenuVisible);
  }
  _toggleMenuVisibility(value) {
    if (!this._overflowMenuContainer()) {
      return;
    }
    this._overflowMenuContainer().toggleClass(INVISIBLE_STATE_CLASS, !value);
  }
  _renderMenuItems() {
    deferRender(() => {
      this.renderMenuItems();
    });
  }
  _dimensionChanged() {
    this.renderMenuItems();
  }
  _getToolbarItems() {
    var _this$_toolbar$option;
    return grep((_this$_toolbar$option = this._toolbar.option('items')) !== null && _this$_toolbar$option !== void 0 ? _this$_toolbar$option : [], item => {
      return !this._toolbar._isMenuItem(item);
    });
  }
  _getHiddenItems() {
    return this._toolbar._itemContainer().children(".".concat(TOOLBAR_AUTO_HIDE_ITEM_CLASS, ".").concat(TOOLBAR_HIDDEN_ITEM)).not(".".concat(INVISIBLE_STATE_CLASS));
  }
  _getMenuItems() {
    var _this$_toolbar$option2, _this$_restoreItems;
    var menuItems = grep((_this$_toolbar$option2 = this._toolbar.option('items')) !== null && _this$_toolbar$option2 !== void 0 ? _this$_toolbar$option2 : [], item => {
      return this._toolbar._isMenuItem(item);
    });
    var $hiddenItems = this._getHiddenItems();
    this._restoreItems = (_this$_restoreItems = this._restoreItems) !== null && _this$_restoreItems !== void 0 ? _this$_restoreItems : [];
    var overflowItems = [].slice.call($hiddenItems).map(hiddenItem => {
      var itemData = this._toolbar._getItemData(hiddenItem);
      var $itemContainer = $(hiddenItem);
      var $itemMarkup = $itemContainer.children();
      return extend({
        menuItemTemplate: () => {
          this._restoreItems.push({
            container: $itemContainer,
            item: $itemMarkup
          });
          var $container = $('<div>').addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
          return $container.append($itemMarkup);
        }
      }, itemData);
    });
    return [...overflowItems, ...menuItems];
  }
  _hasVisibleMenuItems(items) {
    var menuItems = items !== null && items !== void 0 ? items : this._toolbar.option('items');
    var result = false;
    var optionGetter = compileGetter('visible');
    var overflowGetter = compileGetter('locateInMenu');
    each(menuItems, function (index, item) {
      var itemVisible = optionGetter(item, {
        functionsAsIs: true
      });
      var itemOverflow = overflowGetter(item, {
        functionsAsIs: true
      });
      if (itemVisible !== false && (itemOverflow === 'auto' || itemOverflow === 'always') || item.location === 'menu') {
        result = true;
      }
    });
    return result;
  }
  _arrangeItems() {
    var _this$_restoreItems2;
    this._toolbar._$centerSection.css({
      margin: '0 auto',
      float: 'none'
    });
    each((_this$_restoreItems2 = this._restoreItems) !== null && _this$_restoreItems2 !== void 0 ? _this$_restoreItems2 : [], function (_, obj) {
      $(obj.container).append(obj.item);
    });
    this._restoreItems = [];
    var elementWidth = getWidth(this._toolbar.$element());
    this._hideOverflowItems(elementWidth);
    return elementWidth;
  }
  _hideOverflowItems(elementWidth) {
    var _elementWidth;
    var overflowItems = this._toolbar.$element().find(".".concat(TOOLBAR_AUTO_HIDE_ITEM_CLASS));
    if (!overflowItems.length) {
      return;
    }
    elementWidth = (_elementWidth = elementWidth) !== null && _elementWidth !== void 0 ? _elementWidth : getWidth(this._toolbar.$element());
    $(overflowItems).removeClass(TOOLBAR_HIDDEN_ITEM);
    var itemsWidth = this._getItemsWidth();
    while (overflowItems.length && elementWidth < itemsWidth) {
      var $item = overflowItems.eq(-1);
      itemsWidth -= getOuterWidth($item);
      $item.addClass(TOOLBAR_HIDDEN_ITEM);
      overflowItems.splice(-1, 1);
    }
  }
  _getItemsWidth() {
    return this._toolbar._getSummaryItemsSize('width', [this._toolbar._$beforeSection, this._toolbar._$centerSection, this._toolbar._$afterSection]);
  }
  _itemOptionChanged(item, property, value) {
    if (property === 'disabled' || property === 'options.disabled') {
      if (this._toolbar._isMenuItem(item)) {
        var _this$_menu;
        (_this$_menu = this._menu) === null || _this$_menu === void 0 ? void 0 : _this$_menu._itemOptionChanged(item, property, value);
        return;
      }
    }
    this.renderMenuItems();
  }
  _renderItem(item, itemElement) {
    if (item.locateInMenu === 'auto') {
      itemElement.addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
    }
  }
  _optionChanged(name, value) {
    var _this$_menu2, _this$_menu3, _this$_menu4, _this$_menu5, _this$_menu6;
    switch (name) {
      case 'disabled':
        (_this$_menu2 = this._menu) === null || _this$_menu2 === void 0 ? void 0 : _this$_menu2.option(name, value);
        break;
      case 'overflowMenuVisible':
        (_this$_menu3 = this._menu) === null || _this$_menu3 === void 0 ? void 0 : _this$_menu3.option('opened', value);
        break;
      case 'onItemClick':
        (_this$_menu4 = this._menu) === null || _this$_menu4 === void 0 ? void 0 : _this$_menu4.option(name, value);
        break;
      case 'menuContainer':
        (_this$_menu5 = this._menu) === null || _this$_menu5 === void 0 ? void 0 : _this$_menu5.option('container', value);
        break;
      case 'menuItemTemplate':
        (_this$_menu6 = this._menu) === null || _this$_menu6 === void 0 ? void 0 : _this$_menu6.option('itemTemplate', value);
        break;
    }
  }
}
