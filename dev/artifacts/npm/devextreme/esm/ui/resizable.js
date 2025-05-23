/**
* DevExtreme (esm/ui/resizable.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { getOuterWidth, getOuterHeight, getInnerWidth, getInnerHeight, getWidth, getHeight } from '../core/utils/size';
import { locate, move } from '../animation/translator';
import registerComponent from '../core/component_registrator';
import DOMComponent from '../core/dom_component';
import $ from '../core/renderer';
import { pairToObject } from '../core/utils/common';
import { extend } from '../core/utils/extend';
import { each } from '../core/utils/iterator';
import { fitIntoRange, inRange } from '../core/utils/math';
import { isPlainObject, isFunction, isWindow } from '../core/utils/type';
import { hasWindow } from '../core/utils/window';
import eventsEngine from '../events/core/events_engine';
import { start as dragEventStart, move as dragEventMove, end as dragEventEnd } from '../events/drag';
import { addNamespace } from '../events/utils/index';
import { triggerResizeEvent } from '../events/visibility_change';
var RESIZABLE = 'dxResizable';
var RESIZABLE_CLASS = 'dx-resizable';
var RESIZABLE_RESIZING_CLASS = 'dx-resizable-resizing';
var RESIZABLE_HANDLE_CLASS = 'dx-resizable-handle';
var RESIZABLE_HANDLE_TOP_CLASS = 'dx-resizable-handle-top';
var RESIZABLE_HANDLE_BOTTOM_CLASS = 'dx-resizable-handle-bottom';
var RESIZABLE_HANDLE_LEFT_CLASS = 'dx-resizable-handle-left';
var RESIZABLE_HANDLE_RIGHT_CLASS = 'dx-resizable-handle-right';
var RESIZABLE_HANDLE_CORNER_CLASS = 'dx-resizable-handle-corner';
var DRAGSTART_START_EVENT_NAME = addNamespace(dragEventStart, RESIZABLE);
var DRAGSTART_EVENT_NAME = addNamespace(dragEventMove, RESIZABLE);
var DRAGSTART_END_EVENT_NAME = addNamespace(dragEventEnd, RESIZABLE);
var SIDE_BORDER_WIDTH_STYLES = {
  'left': 'borderLeftWidth',
  'top': 'borderTopWidth',
  'right': 'borderRightWidth',
  'bottom': 'borderBottomWidth'
};
var Resizable = DOMComponent.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      handles: 'all',
      // NOTE: does not affect proportional resize
      step: '1',
      /**
      * @name dxResizableOptions.stepPrecision
      * @type string
      * @default "simple"
      * @acceptValues 'simple'|'strict'
      * @hidden
      */
      stepPrecision: 'simple',
      area: undefined,
      minWidth: 30,
      maxWidth: Infinity,
      minHeight: 30,
      maxHeight: Infinity,
      onResizeStart: null,
      onResize: null,
      onResizeEnd: null,
      roundStepValue: true,
      keepAspectRatio: true
    });
  },
  _init: function _init() {
    this.callBase();
    this.$element().addClass(RESIZABLE_CLASS);
  },
  _initMarkup: function _initMarkup() {
    this.callBase();
    this._renderHandles();
  },
  _render: function _render() {
    this.callBase();
    this._renderActions();
  },
  _renderActions: function _renderActions() {
    this._resizeStartAction = this._createActionByOption('onResizeStart');
    this._resizeEndAction = this._createActionByOption('onResizeEnd');
    this._resizeAction = this._createActionByOption('onResize');
  },
  _renderHandles: function _renderHandles() {
    this._handles = [];
    var handles = this.option('handles');
    if (handles === 'none' || !handles) {
      return;
    }
    var directions = handles === 'all' ? ['top', 'bottom', 'left', 'right'] : handles.split(' ');
    var activeHandlesMap = {};
    each(directions, (index, handleName) => {
      activeHandlesMap[handleName] = true;
      this._renderHandle(handleName);
    });
    activeHandlesMap['bottom'] && activeHandlesMap['right'] && this._renderHandle('corner-bottom-right');
    activeHandlesMap['bottom'] && activeHandlesMap['left'] && this._renderHandle('corner-bottom-left');
    activeHandlesMap['top'] && activeHandlesMap['right'] && this._renderHandle('corner-top-right');
    activeHandlesMap['top'] && activeHandlesMap['left'] && this._renderHandle('corner-top-left');
    this._attachEventHandlers();
  },
  _renderHandle: function _renderHandle(handleName) {
    var $handle = $('<div>').addClass(RESIZABLE_HANDLE_CLASS).addClass(RESIZABLE_HANDLE_CLASS + '-' + handleName).appendTo(this.$element());
    this._handles.push($handle);
  },
  _attachEventHandlers: function _attachEventHandlers() {
    if (this.option('disabled')) {
      return;
    }
    var handlers = {};
    handlers[DRAGSTART_START_EVENT_NAME] = this._dragStartHandler.bind(this);
    handlers[DRAGSTART_EVENT_NAME] = this._dragHandler.bind(this);
    handlers[DRAGSTART_END_EVENT_NAME] = this._dragEndHandler.bind(this);
    this._handles.forEach(handleElement => {
      eventsEngine.on(handleElement, handlers, {
        direction: 'both',
        immediate: true
      });
    });
  },
  _detachEventHandlers: function _detachEventHandlers() {
    this._handles.forEach(handleElement => {
      eventsEngine.off(handleElement);
    });
  },
  _toggleEventHandlers: function _toggleEventHandlers(shouldAttachEvents) {
    shouldAttachEvents ? this._attachEventHandlers() : this._detachEventHandlers();
  },
  _getElementSize: function _getElementSize() {
    var $element = this.$element();
    return $element.css('boxSizing') === 'border-box' ? {
      width: getOuterWidth($element),
      height: getOuterHeight($element)
    } : {
      width: getWidth($element),
      height: getHeight($element)
    };
  },
  _dragStartHandler: function _dragStartHandler(e) {
    var $element = this.$element();
    if ($element.is('.dx-state-disabled, .dx-state-disabled *')) {
      e.cancel = true;
      return;
    }
    this._toggleResizingClass(true);
    this._movingSides = this._getMovingSides(e);
    this._elementLocation = locate($element);
    this._elementSize = this._getElementSize();
    this._renderDragOffsets(e);
    this._resizeStartAction({
      event: e,
      width: this._elementSize.width,
      height: this._elementSize.height,
      handles: this._movingSides
    });
    e.targetElements = null;
  },
  _toggleResizingClass: function _toggleResizingClass(value) {
    this.$element().toggleClass(RESIZABLE_RESIZING_CLASS, value);
  },
  _renderDragOffsets: function _renderDragOffsets(e) {
    var area = this._getArea();
    if (!area) {
      return;
    }
    var $handle = $(e.target).closest('.' + RESIZABLE_HANDLE_CLASS);
    var handleWidth = getOuterWidth($handle);
    var handleHeight = getOuterHeight($handle);
    var handleOffset = $handle.offset();
    var areaOffset = area.offset;
    var scrollOffset = this._getAreaScrollOffset();
    e.maxLeftOffset = this._leftMaxOffset = handleOffset.left - areaOffset.left - scrollOffset.scrollX;
    e.maxRightOffset = this._rightMaxOffset = areaOffset.left + area.width - handleOffset.left - handleWidth + scrollOffset.scrollX;
    e.maxTopOffset = this._topMaxOffset = handleOffset.top - areaOffset.top - scrollOffset.scrollY;
    e.maxBottomOffset = this._bottomMaxOffset = areaOffset.top + area.height - handleOffset.top - handleHeight + scrollOffset.scrollY;
  },
  _getBorderWidth: function _getBorderWidth($element, direction) {
    if (isWindow($element.get(0))) return 0;
    var borderWidth = $element.css(SIDE_BORDER_WIDTH_STYLES[direction]);
    return parseInt(borderWidth) || 0;
  },
  _proportionate: function _proportionate(direction, value) {
    var size = this._elementSize;
    var factor = direction === 'x' ? size.width / size.height : size.height / size.width;
    return value * factor;
  },
  _getProportionalDelta: function _getProportionalDelta(_ref) {
    var {
      x,
      y
    } = _ref;
    var proportionalY = this._proportionate('y', x);
    if (proportionalY >= y) {
      return {
        x,
        y: proportionalY
      };
    }
    var proportionalX = this._proportionate('x', y);
    if (proportionalX >= x) {
      return {
        x: proportionalX,
        y
      };
    }
    return {
      x: 0,
      y: 0
    };
  },
  _getDirectionName: function _getDirectionName(axis) {
    var sides = this._movingSides;
    if (axis === 'x') {
      return sides.left ? 'left' : 'right';
    } else {
      return sides.top ? 'top' : 'bottom';
    }
  },
  _fitIntoArea: function _fitIntoArea(axis, value) {
    var _this;
    var directionName = this._getDirectionName(axis);
    return Math.min(value, (_this = this["_".concat(directionName, "MaxOffset")]) !== null && _this !== void 0 ? _this : Infinity);
  },
  _fitDeltaProportionally: function _fitDeltaProportionally(delta) {
    var fittedDelta = _extends({}, delta);
    var size = this._elementSize;
    var {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    } = this.option();
    var getWidth = () => size.width + fittedDelta.x;
    var getHeight = () => size.height + fittedDelta.y;
    var getFittedWidth = () => fitIntoRange(getWidth(), minWidth, maxWidth);
    var getFittedHeight = () => fitIntoRange(getHeight(), minHeight, maxHeight);
    var isInArea = axis => fittedDelta[axis] === this._fitIntoArea(axis, fittedDelta[axis]);
    var isFittedX = () => inRange(getWidth(), minWidth, maxWidth) && isInArea('x');
    var isFittedY = () => inRange(getHeight(), minHeight, maxHeight) && isInArea('y');
    if (!isFittedX()) {
      var x = this._fitIntoArea('x', getFittedWidth() - size.width);
      fittedDelta = {
        x,
        y: this._proportionate('y', x)
      };
    }
    if (!isFittedY()) {
      var y = this._fitIntoArea('y', getFittedHeight() - size.height);
      fittedDelta = {
        x: this._proportionate('x', y),
        y
      };
    }
    return isFittedX() && isFittedY() ? fittedDelta : {
      x: 0,
      y: 0
    };
  },
  _fitDelta: function _fitDelta(_ref2) {
    var {
      x,
      y
    } = _ref2;
    var size = this._elementSize;
    var {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    } = this.option();
    return {
      x: fitIntoRange(size.width + x, minWidth, maxWidth) - size.width,
      y: fitIntoRange(size.height + y, minHeight, maxHeight) - size.height
    };
  },
  _getDeltaByOffset: function _getDeltaByOffset(offset) {
    var sides = this._movingSides;
    var shouldKeepAspectRatio = this._isCornerHandler(sides) && this.option('keepAspectRatio');
    var delta = {
      x: offset.x * (sides.left ? -1 : 1),
      y: offset.y * (sides.top ? -1 : 1)
    };
    if (shouldKeepAspectRatio) {
      var proportionalDelta = this._getProportionalDelta(delta);
      var fittedProportionalDelta = this._fitDeltaProportionally(proportionalDelta);
      delta = fittedProportionalDelta;
    } else {
      var fittedDelta = this._fitDelta(delta);
      var roundedFittedDelta = this._roundByStep(fittedDelta);
      delta = roundedFittedDelta;
    }
    return delta;
  },
  _updatePosition: function _updatePosition(delta, _ref3) {
    var {
      width,
      height
    } = _ref3;
    var location = this._elementLocation;
    var sides = this._movingSides;
    var $element = this.$element();
    var elementRect = this._getElementSize();
    var offsetTop = delta.y * (sides.top ? -1 : 1) - ((elementRect.height || height) - height);
    var offsetLeft = delta.x * (sides.left ? -1 : 1) - ((elementRect.width || width) - width);
    move($element, {
      top: location.top + (sides.top ? offsetTop : 0),
      left: location.left + (sides.left ? offsetLeft : 0)
    });
  },
  _dragHandler: function _dragHandler(e) {
    var offset = this._getOffset(e);
    var delta = this._getDeltaByOffset(offset);
    var dimensions = this._updateDimensions(delta);
    this._updatePosition(delta, dimensions);
    this._triggerResizeAction(e, dimensions);
  },
  _updateDimensions: function _updateDimensions(delta) {
    var isAbsoluteSize = size => {
      return size.substring(size.length - 2) === 'px';
    };
    var isStepPrecisionStrict = this.option('stepPrecision') === 'strict';
    var size = this._elementSize;
    var width = size.width + delta.x;
    var height = size.height + delta.y;
    var elementStyle = this.$element().get(0).style;
    var shouldRenderWidth = delta.x || isStepPrecisionStrict || isAbsoluteSize(elementStyle.width);
    var shouldRenderHeight = delta.y || isStepPrecisionStrict || isAbsoluteSize(elementStyle.height);
    if (shouldRenderWidth) this.option({
      width
    });
    if (shouldRenderHeight) this.option({
      height
    });
    return {
      width: shouldRenderWidth ? width : size.width,
      height: shouldRenderHeight ? height : size.height
    };
  },
  _triggerResizeAction: function _triggerResizeAction(e, _ref4) {
    var {
      width,
      height
    } = _ref4;
    this._resizeAction({
      event: e,
      width: this.option('width') || width,
      height: this.option('height') || height,
      handles: this._movingSides
    });
    triggerResizeEvent(this.$element());
  },
  _isCornerHandler(sides) {
    return Object.values(sides).reduce((xor, value) => xor ^ value, 0) === 0;
  },
  _getOffset: function _getOffset(e) {
    var offset = e.offset;
    var sides = this._movingSides;
    if (!sides.left && !sides.right) offset.x = 0;
    if (!sides.top && !sides.bottom) offset.y = 0;
    return offset;
  },
  _roundByStep: function _roundByStep(delta) {
    return this.option('stepPrecision') === 'strict' ? this._roundStrict(delta) : this._roundNotStrict(delta);
  },
  _getSteps: function _getSteps() {
    return pairToObject(this.option('step'), !this.option('roundStepValue'));
  },
  _roundNotStrict: function _roundNotStrict(delta) {
    var steps = this._getSteps();
    return {
      x: delta.x - delta.x % steps.h,
      y: delta.y - delta.y % steps.v
    };
  },
  _roundStrict: function _roundStrict(delta) {
    var sides = this._movingSides;
    var offset = {
      x: delta.x * (sides.left ? -1 : 1),
      y: delta.y * (sides.top ? -1 : 1)
    };
    var steps = this._getSteps();
    var location = this._elementLocation;
    var size = this._elementSize;
    var xPos = sides.left ? location.left : location.left + size.width;
    var yPos = sides.top ? location.top : location.top + size.height;
    var newXShift = (xPos + offset.x) % steps.h;
    var newYShift = (yPos + offset.y) % steps.v;
    var sign = Math.sign || (x => {
      x = +x;
      if (x === 0 || isNaN(x)) {
        return x;
      }
      return x > 0 ? 1 : -1;
    });
    var separatorOffset = (steps, offset) => {
      return (1 + sign(offset) * 0.2) % 1 * steps;
    };
    var isSmallOffset = (offset, steps) => {
      return Math.abs(offset) < 0.2 * steps;
    };
    var newOffsetX = offset.x - newXShift;
    var newOffsetY = offset.y - newYShift;
    if (newXShift > separatorOffset(steps.h, offset.x)) {
      newOffsetX += steps.h;
    }
    if (newYShift > separatorOffset(steps.v, offset.y)) {
      newOffsetY += steps.v;
    }
    var roundedOffset = {
      x: (sides.left || sides.right) && !isSmallOffset(offset.x, steps.h) ? newOffsetX : 0,
      y: (sides.top || sides.bottom) && !isSmallOffset(offset.y, steps.v) ? newOffsetY : 0
    };
    return {
      x: roundedOffset.x * (sides.left ? -1 : 1),
      y: roundedOffset.y * (sides.top ? -1 : 1)
    };
  },
  _getMovingSides: function _getMovingSides(e) {
    var $target = $(e.target);
    var hasCornerTopLeftClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + '-top-left');
    var hasCornerTopRightClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + '-top-right');
    var hasCornerBottomLeftClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + '-bottom-left');
    var hasCornerBottomRightClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + '-bottom-right');
    return {
      'top': $target.hasClass(RESIZABLE_HANDLE_TOP_CLASS) || hasCornerTopLeftClass || hasCornerTopRightClass,
      'left': $target.hasClass(RESIZABLE_HANDLE_LEFT_CLASS) || hasCornerTopLeftClass || hasCornerBottomLeftClass,
      'bottom': $target.hasClass(RESIZABLE_HANDLE_BOTTOM_CLASS) || hasCornerBottomLeftClass || hasCornerBottomRightClass,
      'right': $target.hasClass(RESIZABLE_HANDLE_RIGHT_CLASS) || hasCornerTopRightClass || hasCornerBottomRightClass
    };
  },
  _getArea: function _getArea() {
    var area = this.option('area');
    if (isFunction(area)) {
      area = area.call(this);
    }
    if (isPlainObject(area)) {
      return this._getAreaFromObject(area);
    }
    return this._getAreaFromElement(area);
  },
  _getAreaScrollOffset: function _getAreaScrollOffset() {
    var area = this.option('area');
    var isElement = !isFunction(area) && !isPlainObject(area);
    var scrollOffset = {
      scrollY: 0,
      scrollX: 0
    };
    if (isElement) {
      var areaElement = $(area)[0];
      if (isWindow(areaElement)) {
        scrollOffset.scrollX = areaElement.pageXOffset;
        scrollOffset.scrollY = areaElement.pageYOffset;
      }
    }
    return scrollOffset;
  },
  _getAreaFromObject: function _getAreaFromObject(area) {
    var result = {
      width: area.right - area.left,
      height: area.bottom - area.top,
      offset: {
        left: area.left,
        top: area.top
      }
    };
    this._correctAreaGeometry(result);
    return result;
  },
  _getAreaFromElement: function _getAreaFromElement(area) {
    var $area = $(area);
    var result;
    if ($area.length) {
      result = {
        width: getInnerWidth($area),
        height: getInnerHeight($area),
        offset: extend({
          top: 0,
          left: 0
        }, isWindow($area[0]) ? {} : $area.offset())
      };
      this._correctAreaGeometry(result, $area);
    }
    return result;
  },
  _correctAreaGeometry: function _correctAreaGeometry(result, $area) {
    var areaBorderLeft = $area ? this._getBorderWidth($area, 'left') : 0;
    var areaBorderTop = $area ? this._getBorderWidth($area, 'top') : 0;
    result.offset.left += areaBorderLeft + this._getBorderWidth(this.$element(), 'left');
    result.offset.top += areaBorderTop + this._getBorderWidth(this.$element(), 'top');
    result.width -= getOuterWidth(this.$element()) - getInnerWidth(this.$element());
    result.height -= getOuterHeight(this.$element()) - getInnerHeight(this.$element());
  },
  _dragEndHandler: function _dragEndHandler(e) {
    var $element = this.$element();
    this._resizeEndAction({
      event: e,
      width: getOuterWidth($element),
      height: getOuterHeight($element),
      handles: this._movingSides
    });
    this._toggleResizingClass(false);
  },
  _renderWidth: function _renderWidth(width) {
    this.option('width', fitIntoRange(width, this.option('minWidth'), this.option('maxWidth')));
  },
  _renderHeight: function _renderHeight(height) {
    this.option('height', fitIntoRange(height, this.option('minHeight'), this.option('maxHeight')));
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'disabled':
        this._toggleEventHandlers(!args.value);
        this.callBase(args);
        break;
      case 'handles':
        this._invalidate();
        break;
      case 'minWidth':
      case 'maxWidth':
        hasWindow() && this._renderWidth(getOuterWidth(this.$element()));
        break;
      case 'minHeight':
      case 'maxHeight':
        hasWindow() && this._renderHeight(getOuterHeight(this.$element()));
        break;
      case 'onResize':
      case 'onResizeStart':
      case 'onResizeEnd':
        this._renderActions();
        break;
      case 'area':
      case 'stepPrecision':
      case 'step':
      case 'roundStepValue':
      case 'keepAspectRatio':
        break;
      default:
        this.callBase(args);
        break;
    }
  },
  _clean: function _clean() {
    this.$element().find('.' + RESIZABLE_HANDLE_CLASS).remove();
  },
  _useTemplates: function _useTemplates() {
    return false;
  }
});
registerComponent(RESIZABLE, Resizable);
export default Resizable;
