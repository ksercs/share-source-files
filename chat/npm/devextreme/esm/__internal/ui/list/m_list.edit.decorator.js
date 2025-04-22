/**
* DevExtreme (esm/__internal/ui/list/m_list.edit.decorator.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../../common/core/events/core/events_engine';
import { end as swipeEventEnd, start as swipeEventStart, swipe as swipeEventSwipe } from '../../../common/core/events/swipe';
import { addNamespace } from '../../../common/core/events/utils/index';
import Class from '../../../core/class';
import $ from '../../../core/renderer';
import { getWidth } from '../../../core/utils/size';
const LIST_EDIT_DECORATOR = 'dxListEditDecorator';
const SWIPE_START_EVENT_NAME = addNamespace(swipeEventStart, LIST_EDIT_DECORATOR);
const SWIPE_UPDATE_EVENT_NAME = addNamespace(swipeEventSwipe, LIST_EDIT_DECORATOR);
const SWIPE_END_EVENT_NAME = addNamespace(swipeEventEnd, LIST_EDIT_DECORATOR);
// @ts-expect-error dxClass inheritance issue
class EditDecorator extends Class.inherit({}) {
  ctor(list) {
    this._list = list;
    this._init();
  }
  // eslint-disable-next-line class-methods-use-this
  _shouldHandleSwipe() {
    return false;
  }
  _init() {}
  _attachSwipeEvent(config) {
    const swipeConfig = {
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
  }
  _itemSwipeStartHandler(e) {
    const $itemElement = $(e.currentTarget);
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      e.cancel = true;
      return;
    }
    clearTimeout(this._list._inkRippleTimer);
    this._swipeStartHandler($itemElement, e);
  }
  _itemSwipeUpdateHandler(e) {
    const $itemElement = $(e.currentTarget);
    this._swipeUpdateHandler($itemElement, e);
  }
  _itemSwipeEndHandler(e) {
    const $itemElement = $(e.currentTarget);
    this._swipeEndHandler($itemElement, e);
    this._clearSwipeCache = true;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeBag(config) {}
  afterBag() {}
  _commonOptions() {
    return {
      activeStateEnabled: this._list.option('activeStateEnabled'),
      hoverStateEnabled: this._list.option('hoverStateEnabled'),
      focusStateEnabled: this._list.option('focusStateEnabled')
    };
  }
  modifyElement(config) {
    if (this._shouldHandleSwipe()) {
      this._attachSwipeEvent(config);
      this._clearSwipeCache = true;
    }
  }
  afterRender() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClick($itemElement, e) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {}
  handleEnterPressing() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleContextMenu($itemElement) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _swipeStartHandler($element, event) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _swipeUpdateHandler($element, event) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _swipeEndHandler($element, event) {}
  visibilityChange() {}
  getExcludedSelectors() {}
  dispose() {}
}
export default EditDecorator;
