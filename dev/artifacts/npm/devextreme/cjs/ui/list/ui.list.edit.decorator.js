/**
* DevExtreme (cjs/ui/list/ui.list.edit.decorator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _common = require("../../core/utils/common");
var _class = _interopRequireDefault(require("../../core/class"));
var _swipe = require("../../events/swipe");
var _index = require("../../events/utils/index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var LIST_EDIT_DECORATOR = 'dxListEditDecorator';
var SWIPE_START_EVENT_NAME = (0, _index.addNamespace)(_swipe.start, LIST_EDIT_DECORATOR);
var SWIPE_UPDATE_EVENT_NAME = (0, _index.addNamespace)(_swipe.swipe, LIST_EDIT_DECORATOR);
var SWIPE_END_EVENT_NAME = (0, _index.addNamespace)(_swipe.end, LIST_EDIT_DECORATOR);
var EditDecorator = _class.default.inherit({
  ctor: function ctor(list) {
    this._list = list;
    this._init();
  },
  _init: _common.noop,
  _shouldHandleSwipe: false,
  _attachSwipeEvent: function _attachSwipeEvent(config) {
    var swipeConfig = {
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
  },
  _itemSwipeStartHandler: function _itemSwipeStartHandler(e) {
    var $itemElement = (0, _renderer.default)(e.currentTarget);
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      e.cancel = true;
      return;
    }
    clearTimeout(this._list._inkRippleTimer);
    this._swipeStartHandler($itemElement, e);
  },
  _itemSwipeUpdateHandler: function _itemSwipeUpdateHandler(e) {
    var $itemElement = (0, _renderer.default)(e.currentTarget);
    this._swipeUpdateHandler($itemElement, e);
  },
  _itemSwipeEndHandler: function _itemSwipeEndHandler(e) {
    var $itemElement = (0, _renderer.default)(e.currentTarget);
    this._swipeEndHandler($itemElement, e);
    this._clearSwipeCache = true;
  },
  beforeBag: _common.noop,
  afterBag: _common.noop,
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
  afterRender: _common.noop,
  handleClick: _common.noop,
  handleKeyboardEvents: _common.noop,
  handleEnterPressing: _common.noop,
  handleContextMenu: _common.noop,
  _swipeStartHandler: _common.noop,
  _swipeUpdateHandler: _common.noop,
  _swipeEndHandler: _common.noop,
  visibilityChange: _common.noop,
  getExcludedSelectors: _common.noop,
  dispose: _common.noop
});
var _default = EditDecorator;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
