"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _swipe = require("../../../common/core/events/swipe");
var _index = require("../../../common/core/events/utils/index");
var _class = _interopRequireDefault(require("../../../core/class"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _size = require("../../../core/utils/size");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LIST_EDIT_DECORATOR = 'dxListEditDecorator';
const SWIPE_START_EVENT_NAME = (0, _index.addNamespace)(_swipe.start, LIST_EDIT_DECORATOR);
const SWIPE_UPDATE_EVENT_NAME = (0, _index.addNamespace)(_swipe.swipe, LIST_EDIT_DECORATOR);
const SWIPE_END_EVENT_NAME = (0, _index.addNamespace)(_swipe.end, LIST_EDIT_DECORATOR);
// @ts-expect-error dxClass inheritance issue
class EditDecorator extends _class.default.inherit({}) {
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
          this._itemWidthCache = (0, _size.getWidth)(this._list.$element());
          this._clearSwipeCache = false;
        }
        return this._itemWidthCache;
      }.bind(this)
    };
    _events_engine.default.on(config.$itemElement, SWIPE_START_EVENT_NAME, swipeConfig, this._itemSwipeStartHandler.bind(this));
    _events_engine.default.on(config.$itemElement, SWIPE_UPDATE_EVENT_NAME, this._itemSwipeUpdateHandler.bind(this));
    _events_engine.default.on(config.$itemElement, SWIPE_END_EVENT_NAME, this._itemSwipeEndHandler.bind(this));
  }
  _itemSwipeStartHandler(e) {
    const $itemElement = (0, _renderer.default)(e.currentTarget);
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      e.cancel = true;
      return;
    }
    clearTimeout(this._list._inkRippleTimer);
    this._swipeStartHandler($itemElement, e);
  }
  _itemSwipeUpdateHandler(e) {
    const $itemElement = (0, _renderer.default)(e.currentTarget);
    this._swipeUpdateHandler($itemElement, e);
  }
  _itemSwipeEndHandler(e) {
    const $itemElement = (0, _renderer.default)(e.currentTarget);
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
var _default = exports.default = EditDecorator;