"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _position = _interopRequireDefault(require("../animation/position"));
var _translator = require("../animation/translator");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _dom_component = _interopRequireDefault(require("../core/dom_component"));
var _element = require("../core/element");
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _empty_template = require("../core/templates/empty_template");
var _common = require("../core/utils/common");
var _deferred = require("../core/utils/deferred");
var _extend = require("../core/utils/extend");
var _inflector = require("../core/utils/inflector");
var _position2 = require("../core/utils/position");
var _size = require("../core/utils/size");
var _string = require("../core/utils/string");
var _type = require("../core/utils/type");
var _view_port = require("../core/utils/view_port");
var _window = require("../core/utils/window");
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _drag = require("../events/drag");
var _pointer = _interopRequireDefault(require("../events/pointer"));
var _index = require("../events/utils/index");
var _animator = _interopRequireDefault(require("../ui/scroll_view/animator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // @ts-expect-error
// @ts-expect-error
var window = (0, _window.getWindow)();
var KEYDOWN_EVENT = 'keydown';
var DRAGGABLE = 'dxDraggable';
var DRAGSTART_EVENT_NAME = (0, _index.addNamespace)(_drag.start, DRAGGABLE);
var DRAG_EVENT_NAME = (0, _index.addNamespace)(_drag.move, DRAGGABLE);
var DRAGEND_EVENT_NAME = (0, _index.addNamespace)(_drag.end, DRAGGABLE);
var DRAG_ENTER_EVENT_NAME = (0, _index.addNamespace)(_drag.enter, DRAGGABLE);
var DRAGEND_LEAVE_EVENT_NAME = (0, _index.addNamespace)(_drag.leave, DRAGGABLE);
var POINTERDOWN_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.down, DRAGGABLE);
var KEYDOWN_EVENT_NAME = (0, _index.addNamespace)(KEYDOWN_EVENT, DRAGGABLE);
var CLONE_CLASS = 'clone';
var targetDraggable;
var sourceDraggable;
var ANONYMOUS_TEMPLATE_NAME = 'content';
var getMousePosition = function getMousePosition(event) {
  return {
    // @ts-expect-error
    x: event.pageX - (0, _renderer.default)(window).scrollLeft(),
    // @ts-expect-error
    y: event.pageY - (0, _renderer.default)(window).scrollTop()
  };
};
var GESTURE_COVER_CLASS = 'dx-gesture-cover';
var OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
var OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
var ScrollHelper = /*#__PURE__*/function () {
  function ScrollHelper(orientation, component) {
    this._$scrollableAtPointer = null;
    this._preventScroll = true;
    this._component = component;
    if (orientation === 'vertical') {
      this._scrollValue = 'scrollTop';
      this._overFlowAttr = 'overflowY';
      this._sizeAttr = 'height';
      this._scrollSizeProp = 'scrollHeight';
      this._clientSizeProp = 'clientHeight';
      this._limitProps = {
        start: 'top',
        end: 'bottom'
      };
    } else {
      this._scrollValue = 'scrollLeft';
      this._overFlowAttr = 'overflowX';
      this._sizeAttr = 'width';
      this._scrollSizeProp = 'scrollWidth';
      this._clientSizeProp = 'clientWidth';
      this._limitProps = {
        start: 'left',
        end: 'right'
      };
    }
  }
  var _proto = ScrollHelper.prototype;
  _proto.updateScrollable = function updateScrollable(elements, mousePosition) {
    var _this = this;
    var isScrollableFound = false;
    elements.some(function (element) {
      var $element = (0, _renderer.default)(element);
      var isTargetOverOverlayWrapper = $element.hasClass(OVERLAY_WRAPPER_CLASS);
      var isTargetOverOverlayContent = $element.hasClass(OVERLAY_CONTENT_CLASS);
      if (isTargetOverOverlayWrapper || isTargetOverOverlayContent) {
        return true;
      }
      isScrollableFound = _this._trySetScrollable(element, mousePosition);
      return isScrollableFound;
    });
    if (!isScrollableFound) {
      this._$scrollableAtPointer = null;
      this._scrollSpeed = 0;
    }
  };
  _proto.isScrolling = function isScrolling() {
    return !!this._scrollSpeed;
  };
  _proto.isScrollable = function isScrollable($element) {
    return ($element.css(this._overFlowAttr) === 'auto' || $element.hasClass('dx-scrollable-container')) && $element.prop(this._scrollSizeProp) > Math.ceil(this._sizeAttr === 'width' ? (0, _size.getWidth)($element) : (0, _size.getHeight)($element));
  };
  _proto._trySetScrollable = function _trySetScrollable(element, mousePosition) {
    var that = this;
    var $element = (0, _renderer.default)(element);
    var distanceToBorders;
    var sensitivity = that._component.option('scrollSensitivity');
    var isScrollable = that.isScrollable($element);
    if (isScrollable) {
      distanceToBorders = that._calculateDistanceToBorders($element, mousePosition);
      if (sensitivity > distanceToBorders[that._limitProps.start]) {
        if (!that._preventScroll) {
          that._scrollSpeed = -that._calculateScrollSpeed(distanceToBorders[that._limitProps.start]);
          that._$scrollableAtPointer = $element;
        }
      } else if (sensitivity > distanceToBorders[that._limitProps.end]) {
        if (!that._preventScroll) {
          that._scrollSpeed = that._calculateScrollSpeed(distanceToBorders[that._limitProps.end]);
          that._$scrollableAtPointer = $element;
        }
      } else {
        isScrollable = false;
        that._preventScroll = false;
      }
    }
    return isScrollable;
  };
  _proto._calculateDistanceToBorders = function _calculateDistanceToBorders($area, mousePosition) {
    var area = $area.get(0);
    var areaBoundingRect;
    if (area) {
      areaBoundingRect = (0, _position2.getBoundingRect)(area);
      return {
        left: mousePosition.x - areaBoundingRect.left,
        top: mousePosition.y - areaBoundingRect.top,
        right: areaBoundingRect.right - mousePosition.x,
        bottom: areaBoundingRect.bottom - mousePosition.y
      };
    }
    return {};
  };
  _proto._calculateScrollSpeed = function _calculateScrollSpeed(distance) {
    var component = this._component;
    var sensitivity = component.option('scrollSensitivity');
    var maxSpeed = component.option('scrollSpeed');
    return Math.ceil(Math.pow((sensitivity - distance) / sensitivity, 2) * maxSpeed);
  };
  _proto.scrollByStep = function scrollByStep() {
    var that = this;
    if (that._$scrollableAtPointer && that._scrollSpeed) {
      if (that._$scrollableAtPointer.hasClass('dx-scrollable-container')) {
        var $scrollable = that._$scrollableAtPointer.closest('.dx-scrollable');
        var scrollableInstance = $scrollable.data('dxScrollable') || $scrollable.data('dxScrollView');
        if (scrollableInstance) {
          var nextScrollPosition = scrollableInstance.scrollOffset()[that._limitProps.start] + that._scrollSpeed;
          scrollableInstance.scrollTo({
            [that._limitProps.start]: nextScrollPosition
          });
        }
      } else {
        var _nextScrollPosition = that._$scrollableAtPointer[that._scrollValue]() + that._scrollSpeed;
        that._$scrollableAtPointer[that._scrollValue](_nextScrollPosition);
      }
      var dragMoveArgs = that._component._dragMoveArgs;
      if (dragMoveArgs) {
        that._component._dragMoveHandler(dragMoveArgs);
      }
    }
  };
  _proto.reset = function reset() {
    this._$scrollableAtPointer = null;
    this._scrollSpeed = 0;
    this._preventScroll = true;
  };
  _proto.isOutsideScrollable = function isOutsideScrollable($scrollable, event) {
    if (!$scrollable) {
      return false;
    }
    var scrollableSize = (0, _position2.getBoundingRect)($scrollable.get(0));
    var start = scrollableSize[this._limitProps.start];
    var size = scrollableSize[this._sizeAttr];
    var mousePosition = getMousePosition(event);
    var location = this._sizeAttr === 'width' ? mousePosition.x : mousePosition.y;
    return location < start || location > start + size;
  };
  return ScrollHelper;
}();
var ScrollAnimator = _animator.default.inherit({
  ctor(strategy) {
    this.callBase();
    this._strategy = strategy;
  },
  _step() {
    var horizontalScrollHelper = this._strategy._horizontalScrollHelper;
    var verticalScrollHelper = this._strategy._verticalScrollHelper;
    horizontalScrollHelper && horizontalScrollHelper.scrollByStep();
    verticalScrollHelper && verticalScrollHelper.scrollByStep();
  }
});
var Draggable = _dom_component.default.inherit({
  reset: _common.noop,
  dragMove: _common.noop,
  dragEnter: _common.noop,
  dragLeave: _common.noop,
  dragEnd(sourceEvent) {
    var sourceDraggable = this._getSourceDraggable();
    sourceDraggable._fireRemoveEvent(sourceEvent);
    return (0, _deferred.Deferred)().resolve();
  },
  _fireRemoveEvent: _common.noop,
  _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      onDragStart: null,
      onDragMove: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragLeave: null,
      onDragCancel: null,
      onCancelByEsc: false,
      onDrop: null,
      immediate: true,
      dragDirection: 'both',
      boundary: undefined,
      boundOffset: 0,
      allowMoveByClick: false,
      itemData: null,
      container: undefined,
      dragTemplate: undefined,
      contentTemplate: 'content',
      handle: '',
      filter: '',
      clone: false,
      autoScroll: true,
      scrollSpeed: 30,
      scrollSensitivity: 60,
      group: undefined,
      data: undefined
    });
  },
  _setOptionsByReference() {
    this.callBase.apply(this, arguments);
    (0, _extend.extend)(this._optionsByReference, {
      component: true,
      group: true,
      itemData: true,
      data: true
    });
  },
  _init() {
    this.callBase();
    this._attachEventHandlers();
    this._scrollAnimator = new ScrollAnimator(this);
    this._horizontalScrollHelper = new ScrollHelper('horizontal', this);
    this._verticalScrollHelper = new ScrollHelper('vertical', this);
    this._initScrollTop = 0;
    this._initScrollLeft = 0;
  },
  _normalizeCursorOffset(offset) {
    if ((0, _type.isObject)(offset)) {
      offset = {
        h: offset.x,
        v: offset.y
      };
    }
    offset = (0, _common.splitPair)(offset).map(function (value) {
      return parseFloat(value);
    });
    return {
      left: offset[0],
      top: offset.length === 1 ? offset[0] : offset[1]
    };
  },
  _getNormalizedCursorOffset(offset, options) {
    if ((0, _type.isFunction)(offset)) {
      offset = offset.call(this, options);
    }
    return this._normalizeCursorOffset(offset);
  },
  _calculateElementOffset(options) {
    var elementOffset;
    var dragElementOffset;
    var event = options.event;
    var $element = (0, _renderer.default)(options.itemElement);
    var $dragElement = (0, _renderer.default)(options.dragElement);
    var isCloned = this._dragElementIsCloned();
    var cursorOffset = this.option('cursorOffset');
    var normalizedCursorOffset = {
      left: 0,
      top: 0
    };
    var currentLocate = this._initialLocate = (0, _translator.locate)($dragElement);
    if (isCloned || options.initialOffset || cursorOffset) {
      elementOffset = options.initialOffset || $element.offset();
      if (cursorOffset) {
        normalizedCursorOffset = this._getNormalizedCursorOffset(cursorOffset, options);
        if (isFinite(normalizedCursorOffset.left)) {
          elementOffset.left = event.pageX;
        }
        if (isFinite(normalizedCursorOffset.top)) {
          elementOffset.top = event.pageY;
        }
      }
      dragElementOffset = $dragElement.offset();
      elementOffset.top -= dragElementOffset.top + (normalizedCursorOffset.top || 0) - currentLocate.top;
      elementOffset.left -= dragElementOffset.left + (normalizedCursorOffset.left || 0) - currentLocate.left;
    }
    return elementOffset;
  },
  _initPosition(options) {
    var $dragElement = (0, _renderer.default)(options.dragElement);
    var elementOffset = this._calculateElementOffset(options);
    if (elementOffset) {
      this._move(elementOffset, $dragElement);
    }
    this._startPosition = (0, _translator.locate)($dragElement);
  },
  _startAnimator() {
    if (!this._scrollAnimator.inProgress()) {
      this._scrollAnimator.start();
    }
  },
  _stopAnimator() {
    this._scrollAnimator.stop();
  },
  _addWidgetPrefix(className) {
    var componentName = this.NAME;
    return (0, _inflector.dasherize)(componentName) + (className ? "-".concat(className) : '');
  },
  _getItemsSelector() {
    return this.option('filter') || '';
  },
  _$content() {
    var $element = this.$element();
    var $wrapper = $element.children('.dx-template-wrapper');
    return $wrapper.length ? $wrapper : $element;
  },
  _attachEventHandlers() {
    var _this2 = this;
    if (this.option('disabled')) {
      return;
    }
    var $element = this._$content();
    var itemsSelector = this._getItemsSelector();
    var allowMoveByClick = this.option('allowMoveByClick');
    var data = {
      direction: this.option('dragDirection'),
      immediate: this.option('immediate'),
      checkDropTarget: function checkDropTarget($target, event) {
        var targetGroup = _this2.option('group');
        var sourceGroup = _this2._getSourceDraggable().option('group');
        var $scrollable = _this2._getScrollable($target);
        if (_this2._verticalScrollHelper.isOutsideScrollable($scrollable, event) || _this2._horizontalScrollHelper.isOutsideScrollable($scrollable, event)) {
          return false;
        }
        return sourceGroup && sourceGroup === targetGroup;
      }
    };
    if (allowMoveByClick) {
      $element = this._getArea();
      _events_engine.default.on($element, POINTERDOWN_EVENT_NAME, data, this._pointerDownHandler.bind(this));
    }
    if (itemsSelector[0] === '>') {
      itemsSelector = itemsSelector.slice(1);
    }
    // @ts-expect-error
    _events_engine.default.on($element, DRAGSTART_EVENT_NAME, itemsSelector, data, this._dragStartHandler.bind(this));
    _events_engine.default.on($element, DRAG_EVENT_NAME, data, this._dragMoveHandler.bind(this));
    _events_engine.default.on($element, DRAGEND_EVENT_NAME, data, this._dragEndHandler.bind(this));
    _events_engine.default.on($element, DRAG_ENTER_EVENT_NAME, data, this._dragEnterHandler.bind(this));
    _events_engine.default.on($element, DRAGEND_LEAVE_EVENT_NAME, data, this._dragLeaveHandler.bind(this));
    if (this.option('onCancelByEsc')) {
      _events_engine.default.on($element, KEYDOWN_EVENT_NAME, this._keydownHandler.bind(this));
    }
  },
  _dragElementIsCloned() {
    return this._$dragElement && this._$dragElement.hasClass(this._addWidgetPrefix(CLONE_CLASS));
  },
  _getDragTemplateArgs($element, $container) {
    return {
      container: (0, _element.getPublicElement)($container),
      model: {
        itemData: this.option('itemData'),
        itemElement: (0, _element.getPublicElement)($element)
      }
    };
  },
  _createDragElement($element) {
    var result = $element;
    var clone = this.option('clone');
    var $container = this._getContainer();
    var template = this.option('dragTemplate');
    if (template) {
      template = this._getTemplate(template);
      result = (0, _renderer.default)('<div>').appendTo($container);
      template.render(this._getDragTemplateArgs($element, result));
    } else if (clone) {
      result = (0, _renderer.default)('<div>').appendTo($container);
      $element.clone().css({
        width: $element.css('width'),
        height: $element.css('height')
      }).appendTo(result);
    }
    return result.toggleClass(this._addWidgetPrefix(CLONE_CLASS), result.get(0) !== $element.get(0)).toggleClass('dx-rtl', this.option('rtlEnabled'));
  },
  _resetDragElement() {
    if (this._dragElementIsCloned()) {
      this._$dragElement.remove();
    } else {
      this._toggleDraggingClass(false);
    }
    this._$dragElement = null;
  },
  _resetSourceElement() {
    this._toggleDragSourceClass(false);
    this._$sourceElement = null;
  },
  _detachEventHandlers() {
    // @ts-expect-error
    _events_engine.default.off(this._$content(), ".".concat(DRAGGABLE));
    // @ts-expect-error
    _events_engine.default.off(this._getArea(), ".".concat(DRAGGABLE));
  },
  _move(position, $element) {
    (0, _translator.move)($element || this._$dragElement, position);
  },
  _getDraggableElement(e) {
    var $sourceElement = this._getSourceElement();
    if ($sourceElement) {
      return $sourceElement;
    }
    var allowMoveByClick = this.option('allowMoveByClick');
    if (allowMoveByClick) {
      return this.$element();
    }
    var $target = (0, _renderer.default)(e && e.target);
    var itemsSelector = this._getItemsSelector();
    if (itemsSelector[0] === '>') {
      var $items = this._$content().find(itemsSelector);
      if (!$items.is($target)) {
        $target = $target.closest($items);
      }
    }
    return $target;
  },
  _getSourceElement() {
    var draggable = this._getSourceDraggable();
    return draggable._$sourceElement;
  },
  _pointerDownHandler(e) {
    if ((0, _index.needSkipEvent)(e)) {
      return;
    }
    var position = {};
    var $element = this.$element();
    var dragDirection = this.option('dragDirection');
    if (dragDirection === 'horizontal' || dragDirection === 'both') {
      position.left = e.pageX - $element.offset().left + (0, _translator.locate)($element).left - (0, _size.getWidth)($element) / 2;
    }
    if (dragDirection === 'vertical' || dragDirection === 'both') {
      position.top = e.pageY - $element.offset().top + (0, _translator.locate)($element).top - (0, _size.getHeight)($element) / 2;
    }
    this._move(position, $element);
    this._getAction('onDragMove')(this._getEventArgs(e));
  },
  _isValidElement(event, $element) {
    var handle = this.option('handle');
    var $target = (0, _renderer.default)(event.originalEvent && event.originalEvent.target);
    if (handle && !$target.closest(handle).length) {
      return false;
    }
    if (!$element.length) {
      return false;
    }
    return !$element.is('.dx-state-disabled, .dx-state-disabled *');
  },
  _dragStartHandler(e) {
    var $element = this._getDraggableElement(e);
    this.dragInProgress = true;
    if (!this._isValidElement(e, $element)) {
      e.cancel = true;
      return;
    }
    if (this._$sourceElement) {
      return;
    }
    var dragStartArgs = this._getDragStartArgs(e, $element);
    this._getAction('onDragStart')(dragStartArgs);
    if (dragStartArgs.cancel) {
      e.cancel = true;
      return;
    }
    this.option('itemData', dragStartArgs.itemData);
    this._setSourceDraggable();
    this._$sourceElement = $element;
    var initialOffset = $element.offset();
    if (!this._hasClonedDraggable() && this.option('autoScroll')) {
      this._initScrollTop = this._getScrollableScrollTop();
      this._initScrollLeft = this._getScrollableScrollLeft();
      initialOffset = this._getDraggableElementOffset(initialOffset.left, initialOffset.top);
    }
    var $dragElement = this._$dragElement = this._createDragElement($element);
    this._toggleDraggingClass(true);
    this._toggleDragSourceClass(true);
    this._setGestureCoverCursor($dragElement.children());
    var isFixedPosition = $dragElement.css('position') === 'fixed';
    this._initPosition((0, _extend.extend)({}, dragStartArgs, {
      dragElement: $dragElement.get(0),
      initialOffset: isFixedPosition && initialOffset
    }));
    this._getAction('onDraggableElementShown')(_extends(_extends({}, dragStartArgs), {
      dragElement: $dragElement
    }));
    var $area = this._getArea();
    var areaOffset = this._getAreaOffset($area);
    var boundOffset = this._getBoundOffset();
    var areaWidth = (0, _size.getOuterWidth)($area);
    var areaHeight = (0, _size.getOuterHeight)($area);
    var elementWidth = (0, _size.getWidth)($dragElement);
    var elementHeight = (0, _size.getHeight)($dragElement);
    var startOffset = {
      left: $dragElement.offset().left - areaOffset.left,
      top: $dragElement.offset().top - areaOffset.top
    };
    if ($area.length) {
      e.maxLeftOffset = startOffset.left - boundOffset.left;
      e.maxRightOffset = areaWidth - startOffset.left - elementWidth - boundOffset.right;
      e.maxTopOffset = startOffset.top - boundOffset.top;
      e.maxBottomOffset = areaHeight - startOffset.top - elementHeight - boundOffset.bottom;
    }
    if (this.option('autoScroll')) {
      this._startAnimator();
    }
  },
  _getAreaOffset($area) {
    var offset = $area && _position.default.offset($area);
    return offset || {
      left: 0,
      top: 0
    };
  },
  _toggleDraggingClass(value) {
    this._$dragElement && this._$dragElement.toggleClass(this._addWidgetPrefix('dragging'), value);
  },
  _toggleDragSourceClass(value, $element) {
    var $sourceElement = $element || this._$sourceElement;
    $sourceElement && $sourceElement.toggleClass(this._addWidgetPrefix('source'), value);
  },
  _setGestureCoverCursor($element) {
    (0, _renderer.default)(".".concat(GESTURE_COVER_CLASS)).css('cursor', $element.css('cursor'));
  },
  _getBoundOffset() {
    var boundOffset = this.option('boundOffset');
    if ((0, _type.isFunction)(boundOffset)) {
      boundOffset = boundOffset.call(this);
    }
    return (0, _string.quadToObject)(boundOffset);
  },
  _getArea() {
    var area = this.option('boundary');
    if ((0, _type.isFunction)(area)) {
      area = area.call(this);
    }
    return (0, _renderer.default)(area);
  },
  _getContainer() {
    var container = this.option('container');
    if (container === undefined) {
      container = (0, _view_port.value)();
    }
    return (0, _renderer.default)(container);
  },
  _getDraggableElementOffset(initialOffsetX, initialOffsetY) {
    var _a, _b, _c, _d;
    var initScrollTop = this._initScrollTop;
    var initScrollLeft = this._initScrollLeft;
    var scrollTop = this._getScrollableScrollTop();
    var scrollLeft = this._getScrollableScrollLeft();
    var elementPosition = (0, _renderer.default)(this.element()).css('position');
    var isFixedPosition = elementPosition === 'fixed';
    var result = {
      left: ((_b = (_a = this._startPosition) === null || _a === void 0 ? void 0 : _a.left) !== null && _b !== void 0 ? _b : 0) + initialOffsetX,
      top: ((_d = (_c = this._startPosition) === null || _c === void 0 ? void 0 : _c.top) !== null && _d !== void 0 ? _d : 0) + initialOffsetY
    };
    if (isFixedPosition || this._hasClonedDraggable()) {
      return result;
    }
    return {
      left: (0, _type.isNumeric)(scrollLeft) ? result.left + scrollLeft - initScrollLeft : result.left,
      top: (0, _type.isNumeric)(scrollTop) ? result.top + scrollTop - initScrollTop : result.top
    };
  },
  _hasClonedDraggable() {
    return this.option('clone') || this.option('dragTemplate');
  },
  _dragMoveHandler(e) {
    this._dragMoveArgs = e;
    if (!this._$dragElement) {
      e.cancel = true;
      return;
    }
    var offset = this._getDraggableElementOffset(e.offset.x, e.offset.y);
    this._move(offset);
    this._updateScrollable(e);
    var eventArgs = this._getEventArgs(e);
    this._getAction('onDragMove')(eventArgs);
    if (eventArgs.cancel === true) {
      return;
    }
    var targetDraggable = this._getTargetDraggable();
    targetDraggable.dragMove(e, scrollBy);
  },
  _updateScrollable(e) {
    var that = this;
    if (that.option('autoScroll')) {
      var mousePosition = getMousePosition(e);
      var allObjects = _dom_adapter.default.elementsFromPoint(mousePosition.x, mousePosition.y, this.$element().get(0));
      that._verticalScrollHelper.updateScrollable(allObjects, mousePosition);
      that._horizontalScrollHelper.updateScrollable(allObjects, mousePosition);
    }
  },
  _getScrollable($element) {
    var _this3 = this;
    var $scrollable;
    $element.parents().toArray().some(function (parent) {
      var $parent = (0, _renderer.default)(parent);
      if (_this3._horizontalScrollHelper.isScrollable($parent) || _this3._verticalScrollHelper.isScrollable($parent)) {
        $scrollable = $parent;
        return true;
      }
      return false;
    });
    return $scrollable;
  },
  _getScrollableScrollTop() {
    var _a, _b;
    return (_b = (_a = this._getScrollable((0, _renderer.default)(this.element()))) === null || _a === void 0 ? void 0 : _a.scrollTop()) !== null && _b !== void 0 ? _b : 0;
  },
  _getScrollableScrollLeft() {
    var _a, _b;
    return (_b = (_a = this._getScrollable((0, _renderer.default)(this.element()))) === null || _a === void 0 ? void 0 : _a.scrollLeft()) !== null && _b !== void 0 ? _b : 0;
  },
  _defaultActionArgs() {
    var args = this.callBase.apply(this, arguments);
    var component = this.option('component');
    if (component) {
      args.component = component;
      args.element = component.element();
    }
    return args;
  },
  _getEventArgs(e) {
    var sourceDraggable = this._getSourceDraggable();
    var targetDraggable = this._getTargetDraggable();
    return {
      event: e,
      itemData: sourceDraggable.option('itemData'),
      itemElement: (0, _element.getPublicElement)(sourceDraggable._$sourceElement),
      fromComponent: sourceDraggable.option('component') || sourceDraggable,
      toComponent: targetDraggable.option('component') || targetDraggable,
      fromData: sourceDraggable.option('data'),
      toData: targetDraggable.option('data')
    };
  },
  _getDragStartArgs(e, $itemElement) {
    var args = this._getEventArgs(e);
    return {
      event: args.event,
      itemData: args.itemData,
      itemElement: $itemElement,
      fromData: args.fromData
    };
  },
  _revertItemToInitialPosition() {
    !this._dragElementIsCloned() && this._move(this._initialLocate, this._$sourceElement);
  },
  _dragEndHandler(e) {
    var _this4 = this;
    var d = (0, _deferred.Deferred)();
    var dragEndEventArgs = this._getEventArgs(e);
    var dropEventArgs = this._getEventArgs(e);
    var targetDraggable = this._getTargetDraggable();
    var needRevertPosition = true;
    this.dragInProgress = false;
    try {
      this._getAction('onDragEnd')(dragEndEventArgs);
    } finally {
      (0, _deferred.when)((0, _deferred.fromPromise)(dragEndEventArgs.cancel)).done(function (cancel) {
        if (!cancel) {
          if (targetDraggable !== _this4) {
            targetDraggable._getAction('onDrop')(dropEventArgs);
          }
          if (!dropEventArgs.cancel) {
            needRevertPosition = false;
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            (0, _deferred.when)((0, _deferred.fromPromise)(targetDraggable.dragEnd(dragEndEventArgs))).always(d.resolve);
            return;
          }
        }
        d.resolve();
      })
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .fail(d.resolve);
      d.done(function () {
        if (needRevertPosition) {
          _this4._revertItemToInitialPosition();
        }
        _this4._resetDragOptions(targetDraggable);
      });
    }
  },
  _isTargetOverAnotherDraggable(e) {
    var _this5 = this;
    var sourceDraggable = this._getSourceDraggable();
    if (this === sourceDraggable) {
      return false;
    }
    var $dragElement = sourceDraggable._$dragElement;
    var $sourceDraggableElement = sourceDraggable.$element();
    var $targetDraggableElement = this.$element();
    var mousePosition = getMousePosition(e);
    var elements = _dom_adapter.default.elementsFromPoint(mousePosition.x, mousePosition.y, this.element());
    var firstWidgetElement = elements.filter(function (element) {
      var $element = (0, _renderer.default)(element);
      if ($element.hasClass(_this5._addWidgetPrefix())) {
        return !$element.closest($dragElement).length;
      }
      return false;
    })[0];
    var $sourceElement = this._getSourceElement();
    var isTargetOverItself = firstWidgetElement === $sourceDraggableElement.get(0);
    var isTargetOverNestedDraggable = (0, _renderer.default)(firstWidgetElement).closest($sourceElement).length;
    return !firstWidgetElement || firstWidgetElement === $targetDraggableElement.get(0) && !isTargetOverItself && !isTargetOverNestedDraggable;
  },
  _dragEnterHandler(e) {
    this._fireDragEnterEvent(e);
    if (this._isTargetOverAnotherDraggable(e)) {
      this._setTargetDraggable();
    }
    var sourceDraggable = this._getSourceDraggable();
    sourceDraggable.dragEnter(e);
  },
  _dragLeaveHandler(e) {
    this._fireDragLeaveEvent(e);
    this._resetTargetDraggable();
    if (this !== this._getSourceDraggable()) {
      this.reset();
    }
    var sourceDraggable = this._getSourceDraggable();
    sourceDraggable.dragLeave(e);
  },
  _keydownHandler(e) {
    if (this.dragInProgress && e.key === 'Escape') {
      this._keydownEscapeHandler(e);
    }
  },
  _keydownEscapeHandler(e) {
    var $sourceElement = this._getSourceElement();
    if (!$sourceElement) {
      return;
    }
    var dragCancelEventArgs = this._getEventArgs(e);
    this._getAction('onDragCancel')(dragCancelEventArgs);
    if (dragCancelEventArgs.cancel) {
      return;
    }
    this.dragInProgress = false;
    sourceDraggable === null || sourceDraggable === void 0 ? void 0 : sourceDraggable._toggleDraggingClass(false);
    this._detachEventHandlers();
    this._revertItemToInitialPosition();
    var targetDraggable = this._getTargetDraggable();
    this._resetDragOptions(targetDraggable);
    this._attachEventHandlers();
  },
  _getAction(name) {
    return this["_".concat(name, "Action")] || this._createActionByOption(name);
  },
  _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  },
  _initTemplates() {
    if (!this.option('contentTemplate')) return;
    this._templateManager.addDefaultTemplates({
      content: new _empty_template.EmptyTemplate()
    });
    this.callBase.apply(this, arguments);
  },
  _render() {
    this.callBase();
    this.$element().addClass(this._addWidgetPrefix());
    var transclude = this._templateManager.anonymousTemplateName === this.option('contentTemplate');
    var template = this._getTemplateByOption('contentTemplate');
    if (template) {
      (0, _renderer.default)(template.render({
        container: this.element(),
        transclude
      }));
    }
  },
  _optionChanged(args) {
    var name = args.name;
    switch (name) {
      case 'onDragStart':
      case 'onDragMove':
      case 'onDragEnd':
      case 'onDrop':
      case 'onDragEnter':
      case 'onDragLeave':
      case 'onDragCancel':
      case 'onDraggableElementShown':
        this["_".concat(name, "Action")] = this._createActionByOption(name);
        break;
      case 'dragTemplate':
      case 'contentTemplate':
      case 'container':
      case 'clone':
        break;
      case 'allowMoveByClick':
      case 'dragDirection':
      case 'disabled':
      case 'boundary':
      case 'filter':
      case 'immediate':
        this._resetDragElement();
        this._detachEventHandlers();
        this._attachEventHandlers();
        break;
      case 'onCancelByEsc':
        this._keydownHandler();
        break;
      case 'autoScroll':
        this._verticalScrollHelper.reset();
        this._horizontalScrollHelper.reset();
        break;
      case 'scrollSensitivity':
      case 'scrollSpeed':
      case 'boundOffset':
      case 'handle':
      case 'group':
      case 'data':
      case 'itemData':
        break;
      default:
        this.callBase(args);
    }
  },
  _getTargetDraggable() {
    return targetDraggable || this;
  },
  _getSourceDraggable() {
    return sourceDraggable || this;
  },
  _setTargetDraggable() {
    var currentGroup = this.option('group');
    var sourceDraggable = this._getSourceDraggable();
    if (currentGroup && currentGroup === sourceDraggable.option('group')) {
      targetDraggable = this;
    }
  },
  _setSourceDraggable() {
    sourceDraggable = this;
  },
  _resetSourceDraggable() {
    sourceDraggable = null;
  },
  _resetTargetDraggable() {
    targetDraggable = null;
  },
  _resetDragOptions(targetDraggable) {
    this.reset();
    targetDraggable.reset();
    this._stopAnimator();
    this._horizontalScrollHelper.reset();
    this._verticalScrollHelper.reset();
    this._resetDragElement();
    this._resetSourceElement();
    this._resetTargetDraggable();
    this._resetSourceDraggable();
  },
  _dispose() {
    this.callBase();
    this._detachEventHandlers();
    this._resetDragElement();
    this._resetTargetDraggable();
    this._resetSourceDraggable();
    this._$sourceElement = null;
    this._stopAnimator();
  },
  _fireDragEnterEvent(sourceEvent) {
    var args = this._getEventArgs(sourceEvent);
    this._getAction('onDragEnter')(args);
  },
  _fireDragLeaveEvent(sourceEvent) {
    var args = this._getEventArgs(sourceEvent);
    this._getAction('onDragLeave')(args);
  }
});
(0, _component_registrator.default)(DRAGGABLE, Draggable);
var _default = Draggable;
exports.default = _default;