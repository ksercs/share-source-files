/**
* DevExtreme (cjs/events/utils/index.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.stopEventsSkipping = exports.setEventFixMethod = exports.normalizeKeyName = exports.needSkipEvent = exports.isTouchEvent = exports.isPointerEvent = exports.isMouseEvent = exports.isKeyboardEvent = exports.isFakeClickEvent = exports.isDxMouseWheelEvent = exports.isCommandKeyPressed = exports.hasTouches = exports.getChar = exports.forceSkipEvents = exports.fireEvent = exports.eventSource = exports.eventDelta = exports.eventData = exports.createEvent = exports.addNamespace = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _add_namespace = _interopRequireDefault(require("./add_namespace"));
var _events_engine = _interopRequireDefault(require("../core/events_engine"));
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _selectors = require("../../ui/widget/selectors");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var KEY_MAP = {
  'backspace': 'backspace',
  'tab': 'tab',
  'enter': 'enter',
  'escape': 'escape',
  'pageup': 'pageUp',
  'pagedown': 'pageDown',
  'end': 'end',
  'home': 'home',
  'arrowleft': 'leftArrow',
  'arrowup': 'upArrow',
  'arrowright': 'rightArrow',
  'arrowdown': 'downArrow',
  'delete': 'del',
  ' ': 'space',
  'f': 'F',
  'a': 'A',
  '*': 'asterisk',
  '-': 'minus',
  'alt': 'alt',
  'control': 'control',
  'shift': 'shift'
};
var LEGACY_KEY_CODES = {
  // iOS 10.2 and lower didn't supports KeyboardEvent.key
  '8': 'backspace',
  '9': 'tab',
  '13': 'enter',
  '27': 'escape',
  '33': 'pageUp',
  '34': 'pageDown',
  '35': 'end',
  '36': 'home',
  '37': 'leftArrow',
  '38': 'upArrow',
  '39': 'rightArrow',
  '40': 'downArrow',
  '46': 'del',
  '32': 'space',
  '70': 'F',
  '65': 'A',
  '106': 'asterisk',
  '109': 'minus',
  '189': 'minus',
  '173': 'minus',
  '16': 'shift',
  '17': 'control',
  '18': 'alt'
};
var EVENT_SOURCES_REGEX = {
  dx: /^dx/i,
  mouse: /(mouse|wheel)/i,
  touch: /^touch/i,
  keyboard: /^key/i,
  pointer: /^(ms)?pointer/i
};
var fixMethod = function fixMethod(e) {
  return e;
};
var copyEvent = function copyEvent(originalEvent) {
  return fixMethod(_events_engine.default.Event(originalEvent, originalEvent), originalEvent);
};
var isDxEvent = function isDxEvent(e) {
  return eventSource(e) === 'dx';
};
var isNativeMouseEvent = function isNativeMouseEvent(e) {
  return eventSource(e) === 'mouse';
};
var isNativeTouchEvent = function isNativeTouchEvent(e) {
  return eventSource(e) === 'touch';
};
var eventSource = function eventSource(_ref) {
  var type = _ref.type;
  var result = 'other';
  (0, _iterator.each)(EVENT_SOURCES_REGEX, function (key) {
    if (this.test(type)) {
      result = key;
      return false;
    }
  });
  return result;
};
exports.eventSource = eventSource;
var isPointerEvent = function isPointerEvent(e) {
  return eventSource(e) === 'pointer';
};
exports.isPointerEvent = isPointerEvent;
var isMouseEvent = function isMouseEvent(e) {
  return isNativeMouseEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && e.pointerType === 'mouse';
};
exports.isMouseEvent = isMouseEvent;
var isDxMouseWheelEvent = function isDxMouseWheelEvent(e) {
  return e && e.type === 'dxmousewheel';
};
exports.isDxMouseWheelEvent = isDxMouseWheelEvent;
var isTouchEvent = function isTouchEvent(e) {
  return isNativeTouchEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && e.pointerType === 'touch';
};
exports.isTouchEvent = isTouchEvent;
var isKeyboardEvent = function isKeyboardEvent(e) {
  return eventSource(e) === 'keyboard';
};
exports.isKeyboardEvent = isKeyboardEvent;
var isFakeClickEvent = function isFakeClickEvent(_ref2) {
  var screenX = _ref2.screenX,
    offsetX = _ref2.offsetX,
    pageX = _ref2.pageX;
  return screenX === 0 && !offsetX && pageX === 0;
};
exports.isFakeClickEvent = isFakeClickEvent;
var eventData = function eventData(_ref3) {
  var pageX = _ref3.pageX,
    pageY = _ref3.pageY,
    timeStamp = _ref3.timeStamp;
  return {
    x: pageX,
    y: pageY,
    time: timeStamp
  };
};
exports.eventData = eventData;
var eventDelta = function eventDelta(from, to) {
  return {
    x: to.x - from.x,
    y: to.y - from.y,
    time: to.time - from.time || 1
  };
};
exports.eventDelta = eventDelta;
var hasTouches = function hasTouches(e) {
  var originalEvent = e.originalEvent,
    pointers = e.pointers;
  if (isNativeTouchEvent(e)) {
    return (originalEvent.touches || []).length;
  }
  if (isDxEvent(e)) {
    return (pointers || []).length;
  }
  return 0;
};

// TODO: for tests
exports.hasTouches = hasTouches;
var skipEvents = false;
var forceSkipEvents = function forceSkipEvents() {
  return skipEvents = true;
};
exports.forceSkipEvents = forceSkipEvents;
var stopEventsSkipping = function stopEventsSkipping() {
  return skipEvents = false;
};
exports.stopEventsSkipping = stopEventsSkipping;
var needSkipEvent = function needSkipEvent(e) {
  // TODO: for tests
  if (skipEvents) {
    return true;
  }

  // TODO: this checking used in swipeable first move handler. is it correct?
  var target = e.target;
  var $target = (0, _renderer.default)(target);
  var isContentEditable = (target === null || target === void 0 ? void 0 : target.isContentEditable) || (target === null || target === void 0 ? void 0 : target.hasAttribute('contenteditable'));
  var touchInEditable = $target.is('input, textarea, select') || isContentEditable;
  if (isDxMouseWheelEvent(e)) {
    var isTextArea = $target.is('textarea') && $target.hasClass('dx-texteditor-input');
    if (isTextArea || isContentEditable) {
      return false;
    }
    var isInputFocused = $target.is('input[type=\'number\'], textarea, select') && $target.is(':focus');
    return isInputFocused;
  }
  if (isMouseEvent(e)) {
    return touchInEditable || e.which > 1; // only left mouse button
  }

  if (isTouchEvent(e)) {
    return touchInEditable && (0, _selectors.focused)($target);
  }
};
exports.needSkipEvent = needSkipEvent;
var setEventFixMethod = function setEventFixMethod(func) {
  return fixMethod = func;
};
exports.setEventFixMethod = setEventFixMethod;
var createEvent = function createEvent(originalEvent, args) {
  var event = copyEvent(originalEvent);
  args && (0, _extend.extend)(event, args);
  return event;
};
exports.createEvent = createEvent;
var fireEvent = function fireEvent(props) {
  var originalEvent = props.originalEvent,
    delegateTarget = props.delegateTarget;
  var event = createEvent(originalEvent, props);
  _events_engine.default.trigger(delegateTarget || event.target, event);
  return event;
};
exports.fireEvent = fireEvent;
var normalizeKeyName = function normalizeKeyName(_ref4) {
  var key = _ref4.key,
    which = _ref4.which;
  var normalizedKey = KEY_MAP[key === null || key === void 0 ? void 0 : key.toLowerCase()] || key;
  var normalizedKeyFromWhich = LEGACY_KEY_CODES[which];
  if (normalizedKeyFromWhich && normalizedKey === key) {
    return normalizedKeyFromWhich;
  } else if (!normalizedKey && which) {
    return String.fromCharCode(which);
  }
  return normalizedKey;
};
exports.normalizeKeyName = normalizeKeyName;
var getChar = function getChar(_ref5) {
  var key = _ref5.key,
    which = _ref5.which;
  return key || String.fromCharCode(which);
};
exports.getChar = getChar;
var addNamespace = _add_namespace.default;
exports.addNamespace = addNamespace;
var isCommandKeyPressed = function isCommandKeyPressed(_ref6) {
  var ctrlKey = _ref6.ctrlKey,
    metaKey = _ref6.metaKey;
  return ctrlKey || metaKey;
};
exports.isCommandKeyPressed = isCommandKeyPressed;
