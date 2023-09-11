/**
* DevExtreme (cjs/ui/toolbar/strategy/toolbar.singleline.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.SingleLineStrategy = void 0;
var _size = require("../../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _iterator = require("../../../core/utils/iterator");
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _uiToolbar = _interopRequireDefault(require("../internal/ui.toolbar.menu"));
var _data = require("../../../core/utils/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var INVISIBLE_STATE_CLASS = 'dx-state-invisible';
var TOOLBAR_DROP_DOWN_MENU_CONTAINER_CLASS = 'dx-toolbar-menu-container';
var TOOLBAR_BUTTON_CLASS = 'dx-toolbar-button';
var TOOLBAR_AUTO_HIDE_ITEM_CLASS = 'dx-toolbar-item-auto-hide';
var TOOLBAR_HIDDEN_ITEM = 'dx-toolbar-item-invisible';
var SingleLineStrategy = /*#__PURE__*/function () {
  function SingleLineStrategy(toolbar) {
    this._toolbar = toolbar;
  }
  var _proto = SingleLineStrategy.prototype;
  _proto._initMarkup = function _initMarkup() {
    var _this = this;
    (0, _common.deferRender)(function () {
      _this._renderOverflowMenu();
      _this._renderMenuItems();
    });
  };
  _proto._renderOverflowMenu = function _renderOverflowMenu() {
    var _this2 = this;
    if (!this._hasVisibleMenuItems()) {
      return;
    }
    this._renderMenuButtonContainer();
    var $menu = (0, _renderer.default)('<div>').appendTo(this._overflowMenuContainer());
    var itemClickAction = this._toolbar._createActionByOption('onItemClick');
    var menuItemTemplate = this._toolbar._getTemplateByOption('menuItemTemplate');
    this._menu = this._toolbar._createComponent($menu, _uiToolbar.default, {
      disabled: this._toolbar.option('disabled'),
      itemTemplate: function itemTemplate() {
        return menuItemTemplate;
      },
      onItemClick: function onItemClick(e) {
        itemClickAction(e);
      },
      container: this._toolbar.option('menuContainer'),
      onOptionChanged: function onOptionChanged(_ref) {
        var name = _ref.name,
          value = _ref.value;
        if (name === 'opened') {
          _this2._toolbar.option('overflowMenuVisible', value);
        }
        if (name === 'items') {
          _this2._updateMenuVisibility(value);
        }
      }
    });
  };
  _proto.renderMenuItems = function renderMenuItems() {
    if (!this._menu) {
      this._renderOverflowMenu();
    }
    this._menu && this._menu.option('items', this._getMenuItems());
    if (this._menu && !this._menu.option('items').length) {
      this._menu.option('opened', false);
    }
  };
  _proto._renderMenuButtonContainer = function _renderMenuButtonContainer() {
    this._$overflowMenuContainer = (0, _renderer.default)('<div>').appendTo(this._toolbar._$afterSection).addClass(TOOLBAR_BUTTON_CLASS).addClass(TOOLBAR_DROP_DOWN_MENU_CONTAINER_CLASS);
  };
  _proto._overflowMenuContainer = function _overflowMenuContainer() {
    return this._$overflowMenuContainer;
  };
  _proto._updateMenuVisibility = function _updateMenuVisibility(menuItems) {
    var items = menuItems !== null && menuItems !== void 0 ? menuItems : this._getMenuItems();
    var isMenuVisible = items.length && this._hasVisibleMenuItems(items);
    this._toggleMenuVisibility(isMenuVisible);
  };
  _proto._toggleMenuVisibility = function _toggleMenuVisibility(value) {
    if (!this._overflowMenuContainer()) {
      return;
    }
    this._overflowMenuContainer().toggleClass(INVISIBLE_STATE_CLASS, !value);
  };
  _proto._renderMenuItems = function _renderMenuItems() {
    var _this3 = this;
    (0, _common.deferRender)(function () {
      _this3.renderMenuItems();
    });
  };
  _proto._dimensionChanged = function _dimensionChanged() {
    this.renderMenuItems();
  };
  _proto._getToolbarItems = function _getToolbarItems() {
    var _this$_toolbar$option,
      _this4 = this;
    return (0, _common.grep)((_this$_toolbar$option = this._toolbar.option('items')) !== null && _this$_toolbar$option !== void 0 ? _this$_toolbar$option : [], function (item) {
      return !_this4._toolbar._isMenuItem(item);
    });
  };
  _proto._getHiddenItems = function _getHiddenItems() {
    return this._toolbar._itemContainer().children(".".concat(TOOLBAR_AUTO_HIDE_ITEM_CLASS, ".").concat(TOOLBAR_HIDDEN_ITEM)).not(".".concat(INVISIBLE_STATE_CLASS));
  };
  _proto._getMenuItems = function _getMenuItems() {
    var _this$_toolbar$option2,
      _this5 = this,
      _this$_restoreItems;
    var menuItems = (0, _common.grep)((_this$_toolbar$option2 = this._toolbar.option('items')) !== null && _this$_toolbar$option2 !== void 0 ? _this$_toolbar$option2 : [], function (item) {
      return _this5._toolbar._isMenuItem(item);
    });
    var $hiddenItems = this._getHiddenItems();
    this._restoreItems = (_this$_restoreItems = this._restoreItems) !== null && _this$_restoreItems !== void 0 ? _this$_restoreItems : [];
    var overflowItems = [].slice.call($hiddenItems).map(function (hiddenItem) {
      var itemData = _this5._toolbar._getItemData(hiddenItem);
      var $itemContainer = (0, _renderer.default)(hiddenItem);
      var $itemMarkup = $itemContainer.children();
      return (0, _extend.extend)({
        menuItemTemplate: function menuItemTemplate() {
          _this5._restoreItems.push({
            container: $itemContainer,
            item: $itemMarkup
          });
          var $container = (0, _renderer.default)('<div>').addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
          return $container.append($itemMarkup);
        }
      }, itemData);
    });
    return [].concat(_toConsumableArray(overflowItems), _toConsumableArray(menuItems));
  };
  _proto._hasVisibleMenuItems = function _hasVisibleMenuItems(items) {
    var menuItems = items !== null && items !== void 0 ? items : this._toolbar.option('items');
    var result = false;
    var optionGetter = (0, _data.compileGetter)('visible');
    var overflowGetter = (0, _data.compileGetter)('locateInMenu');
    (0, _iterator.each)(menuItems, function (index, item) {
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
  };
  _proto._arrangeItems = function _arrangeItems() {
    var _this$_restoreItems2;
    this._toolbar._$centerSection.css({
      margin: '0 auto',
      float: 'none'
    });
    (0, _iterator.each)((_this$_restoreItems2 = this._restoreItems) !== null && _this$_restoreItems2 !== void 0 ? _this$_restoreItems2 : [], function (_, obj) {
      (0, _renderer.default)(obj.container).append(obj.item);
    });
    this._restoreItems = [];
    var elementWidth = (0, _size.getWidth)(this._toolbar.$element());
    this._hideOverflowItems(elementWidth);
    return elementWidth;
  };
  _proto._hideOverflowItems = function _hideOverflowItems(elementWidth) {
    var _elementWidth;
    var overflowItems = this._toolbar.$element().find(".".concat(TOOLBAR_AUTO_HIDE_ITEM_CLASS));
    if (!overflowItems.length) {
      return;
    }
    elementWidth = (_elementWidth = elementWidth) !== null && _elementWidth !== void 0 ? _elementWidth : (0, _size.getWidth)(this._toolbar.$element());
    (0, _renderer.default)(overflowItems).removeClass(TOOLBAR_HIDDEN_ITEM);
    var itemsWidth = this._getItemsWidth();
    while (overflowItems.length && elementWidth < itemsWidth) {
      var $item = overflowItems.eq(-1);
      itemsWidth -= (0, _size.getOuterWidth)($item);
      $item.addClass(TOOLBAR_HIDDEN_ITEM);
      overflowItems.splice(-1, 1);
    }
  };
  _proto._getItemsWidth = function _getItemsWidth() {
    return this._toolbar._getSummaryItemsSize('width', [this._toolbar._$beforeSection, this._toolbar._$centerSection, this._toolbar._$afterSection]);
  };
  _proto._itemOptionChanged = function _itemOptionChanged(item, property, value) {
    if (property === 'disabled' || property === 'options.disabled') {
      if (this._toolbar._isMenuItem(item)) {
        var _this$_menu;
        (_this$_menu = this._menu) === null || _this$_menu === void 0 ? void 0 : _this$_menu._itemOptionChanged(item, property, value);
        return;
      }
    }
    this.renderMenuItems();
  };
  _proto._renderItem = function _renderItem(item, itemElement) {
    if (item.locateInMenu === 'auto') {
      itemElement.addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
    }
  };
  _proto._optionChanged = function _optionChanged(name, value) {
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
  };
  return SingleLineStrategy;
}();
exports.SingleLineStrategy = SingleLineStrategy;
