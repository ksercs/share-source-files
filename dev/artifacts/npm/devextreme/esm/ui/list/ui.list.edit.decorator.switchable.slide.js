/**
* DevExtreme (esm/ui/list/ui.list.edit.decorator.switchable.slide.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getOuterWidth, setWidth } from '../../core/utils/size';
import $ from '../../core/renderer';
import eventsEngine from '../../events/core/events_engine';
import { noop } from '../../core/utils/common';
import { name as clickEventName } from '../../events/click';
import messageLocalization from '../../localization/message';
import { locate, move } from '../../animation/translator';
import { addNamespace } from '../../events/utils/index';
import { active } from '../../events/core/emitter.feedback';
import EditDecoratorMenuHelperMixin from './ui.list.edit.decorator_menu_helper';
import { register as registerDecorator } from './ui.list.edit.decorator_registry';
import SwitchableEditDecorator from './ui.list.edit.decorator.switchable';
import fx from '../../animation/fx';
import { isMaterial } from '../themes';
import ActionSheet from '../action_sheet';
var LIST_EDIT_DECORATOR = 'dxListEditDecorator';
var CLICK_EVENT_NAME = addNamespace(clickEventName, LIST_EDIT_DECORATOR);
var ACTIVE_EVENT_NAME = addNamespace(active, LIST_EDIT_DECORATOR);
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
registerDecorator('menu', 'slide', SwitchableEditDecorator.inherit({
  _shouldHandleSwipe: true,
  _init: function _init() {
    this.callBase.apply(this, arguments);
    this._$buttonsContainer = $('<div>').addClass(SLIDE_MENU_BUTTONS_CONTAINER_CLASS);
    eventsEngine.on(this._$buttonsContainer, ACTIVE_EVENT_NAME, noop);
    this._$buttons = $('<div>').addClass(SLIDE_MENU_BUTTONS_CLASS).appendTo(this._$buttonsContainer);
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
      var $menu = $('<div>').addClass(SLIDE_MENU_CLASS);
      this._menu = this._list._createComponent($menu, ActionSheet, {
        showTitle: false,
        items: menuItems,
        onItemClick: function (args) {
          this._fireAction(args.itemData);
        }.bind(this),
        integrationOptions: {}
      });
      $menu.appendTo(this._list.$element());
      var $menuButton = this._renderMenuButton(messageLocalization.format('dxListEditDecorator-more'), function (e) {
        e.stopPropagation();
        this._menu.show();
      }.bind(this));
      this._menu.option('target', $menuButton);
    }
  },
  _renderMenuButton: function _renderMenuButton(text, action) {
    var $menuButton = $('<div>').addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_MENU_CLASS).text(text);
    this._$buttons.append($menuButton);
    eventsEngine.on($menuButton, CLICK_EVENT_NAME, action);
    return $menuButton;
  },
  _renderDeleteButton: function _renderDeleteButton() {
    if (!this._deleteEnabled()) {
      return;
    }
    var $deleteButton = $('<div>').addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_DELETE_CLASS).text(isMaterial() ? '' : messageLocalization.format('dxListEditDecorator-delete'));
    eventsEngine.on($deleteButton, CLICK_EVENT_NAME, function (e) {
      e.stopPropagation();
      this._deleteItem();
    }.bind(this));
    this._$buttons.append($deleteButton);
  },
  _fireAction: function _fireAction(menuItem) {
    this._fireMenuAction($(this._cachedNode), menuItem.action);
    this._cancelDeleteReadyItem();
  },
  modifyElement: function modifyElement(config) {
    this.callBase.apply(this, arguments);
    var $itemElement = config.$itemElement;
    $itemElement.addClass(SLIDE_MENU_WRAPPER_CLASS);
    var $slideMenuContent = $('<div>').addClass(SLIDE_MENU_CONTENT_CLASS);
    $itemElement.wrapInner($slideMenuContent);
  },
  _getDeleteButtonContainer: function _getDeleteButtonContainer() {
    return this._$buttonsContainer;
  },
  handleClick: function handleClick(_, e) {
    if ($(e.target).closest('.' + SLIDE_MENU_CONTENT_CLASS).length) {
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
      content: locate(this._$cachedContent).left,
      buttonsContainer: locate(this._$buttonsContainer).left,
      buttons: locate(this._$buttons).left
    };
  },
  _setPositions: function _setPositions(positions) {
    move(this._$cachedContent, {
      left: positions.content
    });
    move(this._$buttonsContainer, {
      left: positions.buttonsContainer
    });
    move(this._$buttons, {
      left: positions.buttons
    });
  },
  _cacheItemData: function _cacheItemData($itemElement) {
    if ($itemElement[0] === this._cachedNode) {
      return;
    }
    this._$cachedContent = $itemElement.find('.' + SLIDE_MENU_CONTENT_CLASS);
    this._cachedItemWidth = getOuterWidth($itemElement);
    this._cachedButtonWidth = this._cachedButtonWidth || getOuterWidth(this._$buttons);
    setWidth(this._$buttonsContainer, this._cachedButtonWidth);
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
    fx.stop(this._$cachedContent, true);
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
    return fx.animate(this._$cachedContent, {
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
}).include(EditDecoratorMenuHelperMixin));
