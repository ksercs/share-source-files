/**
* DevExtreme (cjs/ui/scroll_view/ui.scrollbar.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _ready_callbacks = _interopRequireDefault(require("../../core/utils/ready_callbacks"));
var _translator = require("../../animation/translator");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _index = require("../../events/utils/index");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var SCROLLBAR = 'dxScrollbar';
var SCROLLABLE_SCROLLBAR_CLASS = 'dx-scrollable-scrollbar';
var SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = "".concat(SCROLLABLE_SCROLLBAR_CLASS, "-active");
var SCROLLABLE_SCROLL_CLASS = 'dx-scrollable-scroll';
var SCROLLABLE_SCROLL_CONTENT_CLASS = 'dx-scrollable-scroll-content';
var HOVER_ENABLED_STATE = 'dx-scrollbar-hoverable';
var HORIZONTAL = 'horizontal';
var THUMB_MIN_SIZE = 15;
var SCROLLBAR_VISIBLE = {
  onScroll: 'onScroll',
  onHover: 'onHover',
  always: 'always',
  never: 'never'
};
var activeScrollbar = null;
var Scrollbar = _ui.default.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      direction: null,
      visible: false,
      activeStateEnabled: false,
      visibilityMode: SCROLLBAR_VISIBLE.onScroll,
      containerSize: 0,
      contentSize: 0,
      expandable: true,
      scaleRatio: 1
    });
  },
  _init: function _init() {
    this.callBase();
    this._isHovered = false;
  },
  _initMarkup: function _initMarkup() {
    this._renderThumb();
    this.callBase();
  },
  _render: function _render() {
    this.callBase();
    this._renderDirection();
    this._update();
    this._attachPointerDownHandler();
    this.option('hoverStateEnabled', this._isHoverMode());
    this.$element().toggleClass(HOVER_ENABLED_STATE, this.option('hoverStateEnabled'));
  },
  _renderThumb: function _renderThumb() {
    this._$thumb = (0, _renderer.default)('<div>').addClass(SCROLLABLE_SCROLL_CLASS);
    (0, _renderer.default)('<div>').addClass(SCROLLABLE_SCROLL_CONTENT_CLASS).appendTo(this._$thumb);
    this.$element().addClass(SCROLLABLE_SCROLLBAR_CLASS).append(this._$thumb);
  },
  isThumb: function isThumb($element) {
    return !!this.$element().find($element).length;
  },
  _isHoverMode: function _isHoverMode() {
    var visibilityMode = this.option('visibilityMode');
    return (visibilityMode === SCROLLBAR_VISIBLE.onHover || visibilityMode === SCROLLBAR_VISIBLE.always) && this.option('expandable');
  },
  _renderDirection: function _renderDirection() {
    var direction = this.option('direction');
    this.$element().addClass('dx-scrollbar-' + direction);
    this._dimension = direction === HORIZONTAL ? 'width' : 'height';
    this._prop = direction === HORIZONTAL ? 'left' : 'top';
  },
  _attachPointerDownHandler: function _attachPointerDownHandler() {
    _events_engine.default.on(this._$thumb, (0, _index.addNamespace)(_pointer.default.down, SCROLLBAR), this.feedbackOn.bind(this));
  },
  feedbackOn: function feedbackOn() {
    this.$element().addClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS);
    activeScrollbar = this;
  },
  feedbackOff: function feedbackOff() {
    this.$element().removeClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS);
    activeScrollbar = null;
  },
  cursorEnter: function cursorEnter() {
    this._isHovered = true;
    if (this._needScrollbar()) {
      this.option('visible', true);
    }
  },
  cursorLeave: function cursorLeave() {
    this._isHovered = false;
    this.option('visible', false);
  },
  _renderDimensions: function _renderDimensions() {
    this._$thumb.css({
      width: this.option('width'),
      height: this.option('height')
    });
  },
  _toggleVisibility: function _toggleVisibility(visible) {
    if (this.option('visibilityMode') === SCROLLBAR_VISIBLE.onScroll) {
      // NOTE: need to relayout thumb and show it instantly
      this._$thumb.css('opacity');
    }
    visible = this._adjustVisibility(visible);
    this.option().visible = visible;
    this._$thumb.toggleClass('dx-state-invisible', !visible);
  },
  _adjustVisibility: function _adjustVisibility(visible) {
    if (this._baseContainerToContentRatio && !this._needScrollbar()) {
      return false;
    }
    switch (this.option('visibilityMode')) {
      case SCROLLBAR_VISIBLE.onScroll:
        break;
      case SCROLLBAR_VISIBLE.onHover:
        visible = visible || !!this._isHovered;
        break;
      case SCROLLBAR_VISIBLE.never:
        visible = false;
        break;
      case SCROLLBAR_VISIBLE.always:
        visible = true;
        break;
    }
    return visible;
  },
  moveTo: function moveTo(location) {
    if (this._isHidden()) {
      return;
    }
    if ((0, _type.isPlainObject)(location)) {
      location = location[this._prop] || 0;
    }
    var scrollBarLocation = {};
    scrollBarLocation[this._prop] = this._calculateScrollBarPosition(location);
    (0, _translator.move)(this._$thumb, scrollBarLocation);
  },
  _calculateScrollBarPosition: function _calculateScrollBarPosition(location) {
    return -location * this._thumbRatio;
  },
  _update: function _update() {
    var containerSize = Math.round(this.option('containerSize'));
    var contentSize = Math.round(this.option('contentSize'));
    var baseContainerSize = Math.round(this.option('baseContainerSize'));
    var baseContentSize = Math.round(this.option('baseContentSize'));

    // NOTE: if current scrollbar's using outside of scrollable
    if (isNaN(baseContainerSize)) {
      baseContainerSize = containerSize;
      baseContentSize = contentSize;
    }
    this._baseContainerToContentRatio = baseContentSize ? baseContainerSize / baseContentSize : baseContainerSize;
    this._realContainerToContentRatio = contentSize ? containerSize / contentSize : containerSize;
    var thumbSize = Math.round(Math.max(Math.round(containerSize * this._realContainerToContentRatio), THUMB_MIN_SIZE));
    this._thumbRatio = (containerSize - thumbSize) / (this.option('scaleRatio') * (contentSize - containerSize));
    this.option(this._dimension, thumbSize / this.option('scaleRatio'));
    this.$element().css('display', this._needScrollbar() ? '' : 'none');
  },
  _isHidden: function _isHidden() {
    return this.option('visibilityMode') === SCROLLBAR_VISIBLE.never;
  },
  _needScrollbar: function _needScrollbar() {
    return !this._isHidden() && this._baseContainerToContentRatio < 1;
  },
  containerToContentRatio: function containerToContentRatio() {
    return this._realContainerToContentRatio;
  },
  _normalizeSize: function _normalizeSize(size) {
    return (0, _type.isPlainObject)(size) ? size[this._dimension] || 0 : size;
  },
  _clean: function _clean() {
    this.callBase();
    if (this === activeScrollbar) {
      activeScrollbar = null;
    }
    _events_engine.default.off(this._$thumb, '.' + SCROLLBAR);
  },
  _optionChanged: function _optionChanged(args) {
    if (this._isHidden()) {
      return;
    }
    switch (args.name) {
      case 'containerSize':
      case 'contentSize':
        this.option()[args.name] = this._normalizeSize(args.value);
        this._update();
        break;
      case 'baseContentSize':
      case 'baseContainerSize':
        this._update();
        break;
      case 'visibilityMode':
      case 'direction':
        this._invalidate();
        break;
      case 'scaleRatio':
        this._update();
        break;
      default:
        this.callBase.apply(this, arguments);
    }
  },
  update: (0, _common.deferRenderer)(function () {
    this._adjustVisibility() && this.option('visible', true);
  })
});
_ready_callbacks.default.add(function () {
  _events_engine.default.subscribeGlobal(_dom_adapter.default.getDocument(), (0, _index.addNamespace)(_pointer.default.up, SCROLLBAR), function () {
    if (activeScrollbar) {
      activeScrollbar.feedbackOff();
    }
  });
});
var _default = Scrollbar;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
