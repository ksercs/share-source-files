/**
* DevExtreme (cjs/ui/list/ui.list.edit.decorator.switchable.slide.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _common = require("../../core/utils/common");
var _click = require("../../events/click");
var _message = _interopRequireDefault(require("../../localization/message"));
var _translator = require("../../animation/translator");
var _index = require("../../events/utils/index");
var _emitter = require("../../events/core/emitter.feedback");
var _uiListEdit = _interopRequireDefault(require("./ui.list.edit.decorator_menu_helper"));
var _uiListEdit2 = require("./ui.list.edit.decorator_registry");
var _uiListEditDecorator = _interopRequireDefault(require("./ui.list.edit.decorator.switchable"));
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _themes = require("../themes");
var _action_sheet = _interopRequireDefault(require("../action_sheet"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var LIST_EDIT_DECORATOR = 'dxListEditDecorator';
var CLICK_EVENT_NAME = (0, _index.addNamespace)(_click.name, LIST_EDIT_DECORATOR);
var ACTIVE_EVENT_NAME = (0, _index.addNamespace)(_emitter.active, LIST_EDIT_DECORATOR);
var SLIDE_MENU_CLASS = 'dx-list-slide-menu';
var SLIDE_MENU_WRAPPER_CLASS = 'dx-list-slide-menu-wrapper';
var SLIDE_MENU_CONTENT_CLASS = 'dx-list-slide-menu-content';
var SLIDE_MENU_BUTTONS_CONTAINER_CLASS = 'dx-list-slide-menu-buttons-container';
var SLIDE_MENU_BUTTONS_CLASS = 'dx-list-slide-menu-buttons';
var SLIDE_MENU_BUTTON_CLASS = 'dx-list-slide-menu-button';
var SLIDE_MENU_BUTTON_MENU_CLASS = 'dx-list-slide-menu-button-menu';
var SLIDE_MENU_BUTTON_DELETE_CLASS = 'dx-list-slide-menu-button-delete';
var SLIDE_MENU_ANIMATION_DURATION = 400;
var SLIDE_MENU_ANIMATION_EASING = 'cubic-bezier(0.075, 0.82, 0.165, 1)';
(0, _uiListEdit2.register)('menu', 'slide', _uiListEditDecorator.default.inherit({
  _shouldHandleSwipe: true,
  _init: function _init() {
    this.callBase.apply(this, arguments);
    this._$buttonsContainer = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTONS_CONTAINER_CLASS);
    _events_engine.default.on(this._$buttonsContainer, ACTIVE_EVENT_NAME, _common.noop);
    this._$buttons = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTONS_CLASS).appendTo(this._$buttonsContainer);
    this._renderMenu();
    this._renderDeleteButton();
  },
  _renderMenu: function _renderMenu() {
    if (!this._menuEnabled()) {
      return;
    }
    var menuItems = this._menuItems();
    if (menuItems.length === 1) {
      var menuItem = menuItems[0];
      this._renderMenuButton(menuItem.text, function (e) {
        e.stopPropagation();
        this._fireAction(menuItem);
      }.bind(this));
    } else {
      var $menu = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_CLASS);
      this._menu = this._list._createComponent($menu, _action_sheet.default, {
        showTitle: false,
        items: menuItems,
        onItemClick: function (args) {
          this._fireAction(args.itemData);
        }.bind(this),
        integrationOptions: {}
      });
      $menu.appendTo(this._list.$element());
      var $menuButton = this._renderMenuButton(_message.default.format('dxListEditDecorator-more'), function (e) {
        e.stopPropagation();
        this._menu.show();
      }.bind(this));
      this._menu.option('target', $menuButton);
    }
  },
  _renderMenuButton: function _renderMenuButton(text, action) {
    var $menuButton = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_MENU_CLASS).text(text);
    this._$buttons.append($menuButton);
    _events_engine.default.on($menuButton, CLICK_EVENT_NAME, action);
    return $menuButton;
  },
  _renderDeleteButton: function _renderDeleteButton() {
    if (!this._deleteEnabled()) {
      return;
    }
    var $deleteButton = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_DELETE_CLASS).text((0, _themes.isMaterial)() ? '' : _message.default.format('dxListEditDecorator-delete'));
    _events_engine.default.on($deleteButton, CLICK_EVENT_NAME, function (e) {
      e.stopPropagation();
      this._deleteItem();
    }.bind(this));
    this._$buttons.append($deleteButton);
  },
  _fireAction: function _fireAction(menuItem) {
    this._fireMenuAction((0, _renderer.default)(this._cachedNode), menuItem.action);
    this._cancelDeleteReadyItem();
  },
  modifyElement: function modifyElement(config) {
    this.callBase.apply(this, arguments);
    var $itemElement = config.$itemElement;
    $itemElement.addClass(SLIDE_MENU_WRAPPER_CLASS);
    var $slideMenuContent = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_CONTENT_CLASS);
    $itemElement.wrapInner($slideMenuContent);
  },
  _getDeleteButtonContainer: function _getDeleteButtonContainer() {
    return this._$buttonsContainer;
  },
  handleClick: function handleClick(_, e) {
    if ((0, _renderer.default)(e.target).closest('.' + SLIDE_MENU_CONTENT_CLASS).length) {
      return this.callBase.apply(this, arguments);
    }
    return false;
  },
  _swipeStartHandler: function _swipeStartHandler($itemElement) {
    this._enablePositioning($itemElement);
    this._cacheItemData($itemElement);
    this._setPositions(this._getPositions(0));
  },
  _swipeUpdateHandler: function _swipeUpdateHandler($itemElement, args) {
    var rtl = this._isRtlEnabled();
    var signCorrection = rtl ? -1 : 1;
    var isItemReadyToDelete = this._isReadyToDelete($itemElement);
    var moveJustStarted = this._getCurrentPositions().content === this._getStartPositions().content;
    if (moveJustStarted && !isItemReadyToDelete && args.offset * signCorrection > 0) {
      args.cancel = true;
      return;
    }
    var offset = this._cachedItemWidth * args.offset;
    var startOffset = isItemReadyToDelete ? -this._cachedButtonWidth * signCorrection : 0;
    var correctedOffset = (offset + startOffset) * signCorrection;
    var percent = correctedOffset < 0 ? Math.abs((offset + startOffset) / this._cachedButtonWidth) : 0;
    this._setPositions(this._getPositions(percent));
    return true;
  },
  _getStartPositions: function _getStartPositions() {
    var rtl = this._isRtlEnabled();
    var signCorrection = rtl ? -1 : 1;
    return {
      content: 0,
      buttonsContainer: rtl ? -this._cachedButtonWidth : this._cachedItemWidth,
      buttons: -this._cachedButtonWidth * signCorrection
    };
  },
  _getPositions: function _getPositions(percent) {
    var rtl = this._isRtlEnabled();
    var signCorrection = rtl ? -1 : 1;
    var startPositions = this._getStartPositions();
    return {
      content: startPositions.content - percent * this._cachedButtonWidth * signCorrection,
      buttonsContainer: startPositions.buttonsContainer - Math.min(percent, 1) * this._cachedButtonWidth * signCorrection,
      buttons: startPositions.buttons + Math.min(percent, 1) * this._cachedButtonWidth * signCorrection
    };
  },
  _getCurrentPositions: function _getCurrentPositions() {
    return {
      content: (0, _translator.locate)(this._$cachedContent).left,
      buttonsContainer: (0, _translator.locate)(this._$buttonsContainer).left,
      buttons: (0, _translator.locate)(this._$buttons).left
    };
  },
  _setPositions: function _setPositions(positions) {
    (0, _translator.move)(this._$cachedContent, {
      left: positions.content
    });
    (0, _translator.move)(this._$buttonsContainer, {
      left: positions.buttonsContainer
    });
    (0, _translator.move)(this._$buttons, {
      left: positions.buttons
    });
  },
  _cacheItemData: function _cacheItemData($itemElement) {
    if ($itemElement[0] === this._cachedNode) {
      return;
    }
    this._$cachedContent = $itemElement.find('.' + SLIDE_MENU_CONTENT_CLASS);
    this._cachedItemWidth = (0, _size.getOuterWidth)($itemElement);
    this._cachedButtonWidth = this._cachedButtonWidth || (0, _size.getOuterWidth)(this._$buttons);
    (0, _size.setWidth)(this._$buttonsContainer, this._cachedButtonWidth);
    if (this._$cachedContent.length) {
      this._cachedNode = $itemElement[0];
    }
  },
  _minButtonContainerLeftOffset: function _minButtonContainerLeftOffset() {
    return this._cachedItemWidth - this._cachedButtonWidth;
  },
  _swipeEndHandler: function _swipeEndHandler($itemElement, args) {
    this._cacheItemData($itemElement);
    var signCorrection = this._isRtlEnabled() ? 1 : -1;
    var offset = this._cachedItemWidth * args.offset;
    var endedAtReadyToDelete = !this._isReadyToDelete($itemElement) && offset * signCorrection > this._cachedButtonWidth * 0.2;
    var readyToDelete = args.targetOffset === signCorrection && endedAtReadyToDelete;
    this._toggleDeleteReady($itemElement, readyToDelete);
    return true;
  },
  _enablePositioning: function _enablePositioning($itemElement) {
    _fx.default.stop(this._$cachedContent, true);
    this.callBase.apply(this, arguments);
    this._$buttonsContainer.appendTo($itemElement);
  },
  _disablePositioning: function _disablePositioning() {
    this.callBase.apply(this, arguments);
    this._$buttonsContainer.detach();
  },
  _animatePrepareDeleteReady: function _animatePrepareDeleteReady() {
    return this._animateToPositions(this._getPositions(1));
  },
  _animateForgetDeleteReady: function _animateForgetDeleteReady($itemElement) {
    this._cacheItemData($itemElement);
    return this._animateToPositions(this._getPositions(0));
  },
  _animateToPositions: function _animateToPositions(positions) {
    var that = this;
    var currentPosition = this._getCurrentPositions();
    var durationTimePart = Math.min(Math.abs(currentPosition.content - positions.content) / this._cachedButtonWidth, 1);
    return _fx.default.animate(this._$cachedContent, {
      from: currentPosition,
      to: positions,
      easing: SLIDE_MENU_ANIMATION_EASING,
      duration: SLIDE_MENU_ANIMATION_DURATION * durationTimePart,
      strategy: 'frame',
      draw: function draw(positions) {
        that._setPositions(positions);
      }
    });
  },
  dispose: function dispose() {
    if (this._menu) {
      this._menu.$element().remove();
    }
    if (this._$buttonsContainer) {
      this._$buttonsContainer.remove();
    }
    this.callBase.apply(this, arguments);
  }
}).include(_uiListEdit.default));
