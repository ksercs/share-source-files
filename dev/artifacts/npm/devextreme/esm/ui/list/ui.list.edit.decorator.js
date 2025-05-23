/**
* DevExtreme (esm/ui/list/ui.list.edit.decorator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWidth } from '../../core/utils/size';
import $ from '../../core/renderer';
import eventsEngine from '../../events/core/events_engine';
import { noop } from '../../core/utils/common';
import Class from '../../core/class';
import { start as swipeEventStart, swipe as swipeEventSwipe, end as swipeEventEnd } from '../../events/swipe';
import { addNamespace } from '../../events/utils/index';
var LIST_EDIT_DECORATOR = 'dxListEditDecorator';
var SWIPE_START_EVENT_NAME = addNamespace(swipeEventStart, LIST_EDIT_DECORATOR);
var SWIPE_UPDATE_EVENT_NAME = addNamespace(swipeEventSwipe, LIST_EDIT_DECORATOR);
var SWIPE_END_EVENT_NAME = addNamespace(swipeEventEnd, LIST_EDIT_DECORATOR);
var EditDecorator = Class.inherit({
  ctor: function ctor(list) {
    this._list = list;
    this._init();
  },
  _init: noop,
  _shouldHandleSwipe: false,
  _attachSwipeEvent: function _attachSwipeEvent(config) {
    var swipeConfig = {
      itemSizeFunc: function () {
        if (this._clearSwipeCache) {
          this._itemWidthCache = getWidth(this._list.$element());
          this._clearSwipeCache = false;
        }
        return this._itemWidthCache;
      }.bind(this)
    };
    eventsEngine.on(config.$itemElement, SWIPE_START_EVENT_NAME, swipeConfig, this._itemSwipeStartHandler.bind(this));
    eventsEngine.on(config.$itemElement, SWIPE_UPDATE_EVENT_NAME, this._itemSwipeUpdateHandler.bind(this));
    eventsEngine.on(config.$itemElement, SWIPE_END_EVENT_NAME, this._itemSwipeEndHandler.bind(this));
  },
  _itemSwipeStartHandler: function _itemSwipeStartHandler(e) {
    var $itemElement = $(e.currentTarget);
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      e.cancel = true;
      return;
    }
    clearTimeout(this._list._inkRippleTimer);
    this._swipeStartHandler($itemElement, e);
  },
  _itemSwipeUpdateHandler: function _itemSwipeUpdateHandler(e) {
    var $itemElement = $(e.currentTarget);
    this._swipeUpdateHandler($itemElement, e);
  },
  _itemSwipeEndHandler: function _itemSwipeEndHandler(e) {
    var $itemElement = $(e.currentTarget);
    this._swipeEndHandler($itemElement, e);
    this._clearSwipeCache = true;
  },
  beforeBag: noop,
  afterBag: noop,
  _commonOptions: function _commonOptions() {
    return {
      activeStateEnabled: this._list.option('activeStateEnabled'),
      hoverStateEnabled: this._list.option('hoverStateEnabled'),
      focusStateEnabled: this._list.option('focusStateEnabled')
    };
  },
  modifyElement: function modifyElement(config) {
    if (this._shouldHandleSwipe) {
      this._attachSwipeEvent(config);
      this._clearSwipeCache = true;
    }
  },
  afterRender: noop,
  handleClick: noop,
  handleKeyboardEvents: noop,
  handleEnterPressing: noop,
  handleContextMenu: noop,
  _swipeStartHandler: noop,
  _swipeUpdateHandler: noop,
  _swipeEndHandler: noop,
  visibilityChange: noop,
  getExcludedSelectors: noop,
  dispose: noop
});
export default EditDecorator;
