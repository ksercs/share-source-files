"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emitter = _interopRequireDefault(require("../../../common/core/events/core/emitter"));
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _index = require("../../../common/core/events/utils/index");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _call_once = _interopRequireDefault(require("../../../core/utils/call_once"));
var _common = require("../../../core/utils/common");
var _math = require("../../../core/utils/math");
var _ready_callbacks = _interopRequireDefault(require("../../../core/utils/ready_callbacks"));
var _style = require("../../../core/utils/style");
var _type = require("../../../core/utils/type");
var _m_devices = _interopRequireDefault(require("../../core/m_devices"));
var _m_dom = _interopRequireDefault(require("../../core/utils/m_dom"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ready = _ready_callbacks.default.add;
const {
  abs
} = Math;
const SLEEP = 0;
const INITED = 1;
const STARTED = 2;
let TOUCH_BOUNDARY = 10;
const IMMEDIATE_TOUCH_BOUNDARY = 0;
const IMMEDIATE_TIMEOUT = 180;
const supportPointerEvents = function () {
  return (0, _style.styleProp)('pointer-events');
};
const setGestureCover = (0, _call_once.default)(() => {
  const GESTURE_COVER_CLASS = 'dx-gesture-cover';
  const isDesktop = _m_devices.default.real().deviceType === 'desktop';
  if (!supportPointerEvents() || !isDesktop) {
    return _common.noop;
  }
  const $cover = (0, _renderer.default)('<div>').addClass(GESTURE_COVER_CLASS).css('pointerEvents', 'none');
  // @ts-expect-error
  _events_engine.default.subscribeGlobal($cover, 'dxmousewheel', e => {
    e.preventDefault();
  });
  ready(() => {
    // @ts-expect-error
    $cover.appendTo('body');
  });
  return function (toggle, cursor) {
    $cover.css('pointerEvents', toggle ? 'all' : 'none');
    toggle && $cover.css('cursor', cursor);
  };
});
const gestureCover = function (toggle, cursor) {
  const gestureCoverStrategy = setGestureCover();
  gestureCoverStrategy(toggle, cursor);
};
const GestureEmitter = _emitter.default.inherit({
  gesture: true,
  configure(data) {
    this.getElement().css('msTouchAction', data.immediate ? 'pinch-zoom' : '');
    this.callBase(data);
  },
  allowInterruptionByMouseWheel() {
    return this._stage !== STARTED;
  },
  getDirection() {
    return this.direction;
  },
  _cancel() {
    this.callBase.apply(this, arguments);
    this._toggleGestureCover(false);
    this._stage = SLEEP;
  },
  start(e) {
    if (e._needSkipEvent || (0, _index.needSkipEvent)(e)) {
      this._cancel(e);
      return;
    }
    this._startEvent = (0, _index.createEvent)(e);
    this._startEventData = (0, _index.eventData)(e);
    this._stage = INITED;
    this._init(e);
    this._setupImmediateTimer();
  },
  _setupImmediateTimer() {
    clearTimeout(this._immediateTimer);
    this._immediateAccepted = false;
    if (!this.immediate) {
      return;
    }
    if (this.immediateTimeout === 0) {
      this._immediateAccepted = true;
      return;
    }
    this._immediateTimer = setTimeout(() => {
      this._immediateAccepted = true;
    }, this.immediateTimeout ?? IMMEDIATE_TIMEOUT);
  },
  move(e) {
    if (this._stage === INITED && this._directionConfirmed(e)) {
      this._stage = STARTED;
      this._resetActiveElement();
      this._toggleGestureCover(true);
      this._clearSelection(e);
      this._adjustStartEvent(e);
      this._start(this._startEvent);
      if (this._stage === SLEEP) {
        return;
      }
      this._requestAccept(e);
      this._move(e);
      this._forgetAccept();
    } else if (this._stage === STARTED) {
      this._clearSelection(e);
      this._move(e);
    }
  },
  _directionConfirmed(e) {
    const touchBoundary = this._getTouchBoundary(e);
    // @ts-expect-error
    const delta = (0, _index.eventDelta)(this._startEventData, (0, _index.eventData)(e));
    const deltaX = abs(delta.x);
    const deltaY = abs(delta.y);
    const horizontalMove = this._validateMove(touchBoundary, deltaX, deltaY);
    const verticalMove = this._validateMove(touchBoundary, deltaY, deltaX);
    const direction = this.getDirection(e);
    const bothAccepted = direction === 'both' && (horizontalMove || verticalMove);
    const horizontalAccepted = direction === 'horizontal' && horizontalMove;
    const verticalAccepted = direction === 'vertical' && verticalMove;
    return bothAccepted || horizontalAccepted || verticalAccepted || this._immediateAccepted;
  },
  _validateMove(touchBoundary, mainAxis, crossAxis) {
    return mainAxis && mainAxis >= touchBoundary && (this.immediate ? mainAxis >= crossAxis : true);
  },
  _getTouchBoundary(e) {
    return this.immediate || (0, _index.isDxMouseWheelEvent)(e) ? IMMEDIATE_TOUCH_BOUNDARY : TOUCH_BOUNDARY;
  },
  _adjustStartEvent(e) {
    const touchBoundary = this._getTouchBoundary(e);
    // @ts-expect-error
    const delta = (0, _index.eventDelta)(this._startEventData, (0, _index.eventData)(e));
    this._startEvent.pageX += (0, _math.sign)(delta.x) * touchBoundary;
    this._startEvent.pageY += (0, _math.sign)(delta.y) * touchBoundary;
  },
  _resetActiveElement() {
    if (_m_devices.default.real().platform === 'ios' && this.getElement().find(':focus').length) {
      _m_dom.default.resetActiveElement();
    }
  },
  _toggleGestureCover(toggle) {
    this._toggleGestureCoverImpl(toggle);
  },
  _toggleGestureCoverImpl(toggle) {
    const isStarted = this._stage === STARTED;
    if (isStarted) {
      gestureCover(toggle, this.getElement().css('cursor'));
    }
  },
  _clearSelection(e) {
    if ((0, _index.isDxMouseWheelEvent)(e) || (0, _index.isTouchEvent)(e)) {
      return;
    }
    _m_dom.default.clearSelection();
  },
  end(e) {
    this._toggleGestureCover(false);
    if (this._stage === STARTED) {
      this._end(e);
    } else if (this._stage === INITED) {
      this._stop(e);
    }
    this._stage = SLEEP;
  },
  dispose() {
    clearTimeout(this._immediateTimer);
    this.callBase.apply(this, arguments);
    this._toggleGestureCover(false);
  },
  _init: _common.noop,
  _start: _common.noop,
  _move: _common.noop,
  _stop: _common.noop,
  _end: _common.noop
});
GestureEmitter.initialTouchBoundary = TOUCH_BOUNDARY;
GestureEmitter.touchBoundary = function (newBoundary) {
  if ((0, _type.isDefined)(newBoundary)) {
    TOUCH_BOUNDARY = newBoundary;
    return;
  }
  return TOUCH_BOUNDARY;
};
var _default = exports.default = GestureEmitter;