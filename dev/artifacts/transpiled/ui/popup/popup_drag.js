"use strict";

exports.default = void 0;
var _translator = require("../../animation/translator");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _size = require("../../core/utils/size");
var _math = require("../../core/utils/math");
var _type = require("../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _drag = require("../../events/drag");
var _index = require("../../events/utils/index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var KEYBOARD_DRAG_STEP = 5;
var PopupDrag = /*#__PURE__*/function () {
  function PopupDrag(config) {
    this.init(config);
  }
  var _proto = PopupDrag.prototype;
  _proto.init = function init(_ref) {
    var dragEnabled = _ref.dragEnabled,
      handle = _ref.handle,
      draggableElement = _ref.draggableElement,
      positionController = _ref.positionController;
    // TODO: get rid of dragEnabled

    this._positionController = positionController;
    this._draggableElement = draggableElement;
    this._handle = handle;
    this._dragEnabled = dragEnabled;
    this.unsubscribe();
    if (!dragEnabled) {
      return;
    }
    this.subscribe();
  };
  _proto.moveDown = function moveDown(e) {
    this._moveTo(KEYBOARD_DRAG_STEP, 0, e);
  };
  _proto.moveUp = function moveUp(e) {
    this._moveTo(-KEYBOARD_DRAG_STEP, 0, e);
  };
  _proto.moveLeft = function moveLeft(e) {
    this._moveTo(0, -KEYBOARD_DRAG_STEP, e);
  };
  _proto.moveRight = function moveRight(e) {
    this._moveTo(0, KEYBOARD_DRAG_STEP, e);
  };
  _proto.subscribe = function subscribe() {
    var _this = this;
    var eventNames = this._getEventNames();
    _events_engine.default.on(this._handle, eventNames.startEventName, function (e) {
      _this._dragStartHandler(e);
    });
    _events_engine.default.on(this._handle, eventNames.updateEventName, function (e) {
      _this._dragUpdateHandler(e);
    });
    _events_engine.default.on(this._handle, eventNames.endEventName, function (e) {
      _this._dragEndHandler(e);
    });
  };
  _proto.unsubscribe = function unsubscribe() {
    var eventNames = this._getEventNames();
    _events_engine.default.off(this._handle, eventNames.startEventName);
    _events_engine.default.off(this._handle, eventNames.updateEventName);
    _events_engine.default.off(this._handle, eventNames.endEventName);
  };
  _proto._getEventNames = function _getEventNames() {
    var namespace = 'overlayDrag';
    var startEventName = (0, _index.addNamespace)(_drag.start, namespace);
    var updateEventName = (0, _index.addNamespace)(_drag.move, namespace);
    var endEventName = (0, _index.addNamespace)(_drag.end, namespace);
    return {
      startEventName,
      updateEventName,
      endEventName
    };
  };
  _proto._dragStartHandler = function _dragStartHandler(e) {
    var allowedOffsets = this._getAllowedOffsets();
    this._prevOffset = {
      x: 0,
      y: 0
    };
    e.targetElements = [];
    e.maxTopOffset = allowedOffsets.top;
    e.maxBottomOffset = allowedOffsets.bottom;
    e.maxLeftOffset = allowedOffsets.left;
    e.maxRightOffset = allowedOffsets.right;
  };
  _proto._dragUpdateHandler = function _dragUpdateHandler(e) {
    var targetOffset = {
      top: e.offset.y - this._prevOffset.y,
      left: e.offset.x - this._prevOffset.x
    };
    this._moveByOffset(targetOffset);
    this._prevOffset = e.offset;
  };
  _proto._dragEndHandler = function _dragEndHandler(event) {
    this._positionController.dragHandled();
    this._positionController.detectVisualPositionChange(event);
  };
  _proto._moveTo = function _moveTo(top, left, e) {
    if (!this._dragEnabled) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    var offset = this._fitOffsetIntoAllowedRange(top, left);
    this._moveByOffset(offset);
    this._dragEndHandler(e);
  };
  _proto._fitOffsetIntoAllowedRange = function _fitOffsetIntoAllowedRange(top, left) {
    var allowedOffsets = this._getAllowedOffsets();
    return {
      top: (0, _math.fitIntoRange)(top, -allowedOffsets.top, allowedOffsets.bottom),
      left: (0, _math.fitIntoRange)(left, -allowedOffsets.left, allowedOffsets.right)
    };
  };
  _proto._getContainerDimensions = function _getContainerDimensions() {
    var document = _dom_adapter.default.getDocument();
    var container = this._positionController.$dragResizeContainer.get(0);
    var containerWidth = (0, _size.getOuterWidth)(container);
    var containerHeight = (0, _size.getOuterHeight)(container);
    if ((0, _type.isWindow)(container)) {
      containerHeight = Math.max(document.body.clientHeight, containerHeight);
      containerWidth = Math.max(document.body.clientWidth, containerWidth);
    }
    return {
      width: containerWidth,
      height: containerHeight
    };
  };
  _proto._getContainerPosition = function _getContainerPosition() {
    var container = this._positionController.$dragResizeContainer.get(0);
    return (0, _type.isWindow)(container) ? {
      top: 0,
      left: 0
    } : (0, _size.getOffset)(container);
  };
  _proto._getElementPosition = function _getElementPosition() {
    return (0, _size.getOffset)(this._draggableElement);
  };
  _proto._getInnerDelta = function _getInnerDelta() {
    var containerDimensions = this._getContainerDimensions();
    var elementDimensions = this._getElementDimensions();
    return {
      x: containerDimensions.width - elementDimensions.width,
      y: containerDimensions.height - elementDimensions.height
    };
  };
  _proto._getOuterDelta = function _getOuterDelta() {
    var _this$_getElementDime = this._getElementDimensions(),
      width = _this$_getElementDime.width,
      height = _this$_getElementDime.height;
    var outsideDragFactor = this._positionController.outsideDragFactor;
    return {
      x: width * outsideDragFactor,
      y: height * outsideDragFactor
    };
  };
  _proto._getFullDelta = function _getFullDelta() {
    var fullDelta = this._getInnerDelta();
    var outerDelta = this._getOuterDelta();
    return {
      x: fullDelta.x + outerDelta.x,
      y: fullDelta.y + outerDelta.y
    };
  };
  _proto._getElementDimensions = function _getElementDimensions() {
    return {
      width: this._draggableElement.offsetWidth,
      height: this._draggableElement.offsetHeight
    };
  };
  _proto._getAllowedOffsets = function _getAllowedOffsets() {
    var fullDelta = this._getFullDelta();
    var isDragAllowed = fullDelta.y >= 0 && fullDelta.x >= 0;
    if (!isDragAllowed) {
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      };
    }
    var elementPosition = this._getElementPosition();
    var containerPosition = this._getContainerPosition();
    var outerDelta = this._getOuterDelta();
    return {
      top: elementPosition.top - containerPosition.top + outerDelta.y,
      bottom: -elementPosition.top + containerPosition.top + fullDelta.y,
      left: elementPosition.left - containerPosition.left + outerDelta.x,
      right: -elementPosition.left + containerPosition.left + fullDelta.x
    };
  };
  _proto._moveByOffset = function _moveByOffset(offset) {
    var currentPosition = (0, _translator.locate)(this._draggableElement);
    var newPosition = {
      left: currentPosition.left + offset.left,
      top: currentPosition.top + offset.top
    };
    (0, _translator.move)(this._draggableElement, newPosition);
  };
  return PopupDrag;
}();
var _default = PopupDrag;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;