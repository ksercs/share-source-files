"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _frame = require("../../../common/core/animation/frame");
var _emitter_registrator = _interopRequireDefault(require("../../../common/core/events/core/emitter_registrator"));
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _emitter = _interopRequireDefault(require("../../../common/core/events/gesture/emitter.gesture"));
var _index = require("../../../common/core/events/utils/index");
var _class = _interopRequireDefault(require("../../../core/class"));
var _m_devices = _interopRequireDefault(require("../../core/m_devices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  abstract
} = _class.default;
const realDevice = _m_devices.default.real();
const SCROLL_EVENT = 'scroll';
const SCROLL_INIT_EVENT = 'dxscrollinit';
const SCROLL_START_EVENT = 'dxscrollstart';
const SCROLL_MOVE_EVENT = 'dxscroll';
const SCROLL_END_EVENT = 'dxscrollend';
const SCROLL_STOP_EVENT = 'dxscrollstop';
const SCROLL_CANCEL_EVENT = 'dxscrollcancel';
const Locker = _class.default.inherit(function () {
  const NAMESPACED_SCROLL_EVENT = (0, _index.addNamespace)(SCROLL_EVENT, 'dxScrollEmitter');
  return {
    ctor(element) {
      this._element = element;
      this._locked = false;
      this._proxiedScroll = e => {
        if (!this._disposed) {
          this._scroll(e);
        }
      };
      _events_engine.default.on(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll);
    },
    _scroll: abstract,
    check(e, callback) {
      if (this._locked) {
        callback();
      }
    },
    dispose() {
      this._disposed = true;
      _events_engine.default.off(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll);
    }
  };
}());
const TimeoutLocker = Locker.inherit(function () {
  return {
    ctor(element, timeout) {
      this.callBase(element);
      this._timeout = timeout;
    },
    _scroll() {
      this._prepare();
      this._forget();
    },
    _prepare() {
      if (this._timer) {
        this._clearTimer();
      }
      this._locked = true;
    },
    _clearTimer() {
      clearTimeout(this._timer);
      this._locked = false;
      this._timer = null;
    },
    _forget() {
      const that = this;
      this._timer = setTimeout(() => {
        that._clearTimer();
      }, this._timeout);
    },
    dispose() {
      this.callBase();
      this._clearTimer();
    }
  };
}());
const WheelLocker = TimeoutLocker.inherit(function () {
  const WHEEL_UNLOCK_TIMEOUT = 400;
  return {
    ctor(element) {
      this.callBase(element, WHEEL_UNLOCK_TIMEOUT);
      this._lastWheelDirection = null;
    },
    check(e, callback) {
      this._checkDirectionChanged(e);
      this.callBase(e, callback);
    },
    _checkDirectionChanged(e) {
      if (!(0, _index.isDxMouseWheelEvent)(e)) {
        this._lastWheelDirection = null;
        return;
      }
      const direction = e.shiftKey || false;
      const directionChange = this._lastWheelDirection !== null && direction !== this._lastWheelDirection;
      this._lastWheelDirection = direction;
      this._locked = this._locked && !directionChange;
    }
  };
}());
let PointerLocker = TimeoutLocker.inherit(function () {
  const POINTER_UNLOCK_TIMEOUT = 400;
  return {
    ctor(element) {
      this.callBase(element, POINTER_UNLOCK_TIMEOUT);
    }
  };
}());
(function () {
  const {
    ios: isIos,
    android: isAndroid
  } = realDevice;
  if (!(isIos || isAndroid)) {
    return;
  }
  PointerLocker = Locker.inherit(function () {
    return {
      _scroll() {
        this._locked = true;
        const that = this;
        (0, _frame.cancelAnimationFrame)(this._scrollFrame);
        this._scrollFrame = (0, _frame.requestAnimationFrame)(() => {
          that._locked = false;
        });
      },
      check(e, callback) {
        (0, _frame.cancelAnimationFrame)(this._scrollFrame);
        (0, _frame.cancelAnimationFrame)(this._checkFrame);
        const that = this;
        const {
          callBase
        } = this;
        this._checkFrame = (0, _frame.requestAnimationFrame)(() => {
          callBase.call(that, e, callback);
          that._locked = false;
        });
      },
      dispose() {
        this.callBase();
        (0, _frame.cancelAnimationFrame)(this._scrollFrame);
        (0, _frame.cancelAnimationFrame)(this._checkFrame);
      }
    };
  }());
})();
const ScrollEmitter = _emitter.default.inherit(function () {
  const INERTIA_TIMEOUT = 100;
  const VELOCITY_CALC_TIMEOUT = 200;
  const FRAME_DURATION = Math.round(1000 / 60);
  return {
    ctor(element) {
      this.callBase.apply(this, arguments);
      this.direction = 'both';
      this._pointerLocker = new PointerLocker(element);
      this._wheelLocker = new WheelLocker(element);
    },
    validate() {
      return true;
    },
    configure(data) {
      if (data.scrollTarget) {
        this._pointerLocker.dispose();
        this._wheelLocker.dispose();
        this._pointerLocker = new PointerLocker(data.scrollTarget);
        this._wheelLocker = new WheelLocker(data.scrollTarget);
      }
      this.callBase(data);
    },
    _init(e) {
      this._wheelLocker.check(e, () => {
        if ((0, _index.isDxMouseWheelEvent)(e)) {
          this._accept(e);
        }
      });
      this._pointerLocker.check(e, () => {
        const skipCheck = this.isNative && (0, _index.isMouseEvent)(e);
        if (!(0, _index.isDxMouseWheelEvent)(e) && !skipCheck) {
          this._accept(e);
        }
      });
      this._fireEvent(SCROLL_INIT_EVENT, e);
      this._prevEventData = (0, _index.eventData)(e);
    },
    move(e) {
      this.callBase.apply(this, arguments);
      e.isScrollingEvent = this.isNative || e.isScrollingEvent;
    },
    _start(e) {
      this._savedEventData = (0, _index.eventData)(e);
      this._fireEvent(SCROLL_START_EVENT, e);
      this._prevEventData = (0, _index.eventData)(e);
    },
    _move(e) {
      const currentEventData = (0, _index.eventData)(e);
      this._fireEvent(SCROLL_MOVE_EVENT, e, {
        delta: (0, _index.eventDelta)(this._prevEventData, currentEventData)
      });
      const delta = (0, _index.eventDelta)(this._savedEventData, currentEventData);
      if (delta.time > VELOCITY_CALC_TIMEOUT) {
        this._savedEventData = this._prevEventData;
      }
      this._prevEventData = (0, _index.eventData)(e);
    },
    _end(e) {
      // @ts-expect-error
      const endEventDelta = (0, _index.eventDelta)(this._prevEventData, (0, _index.eventData)(e));
      let velocity = {
        x: 0,
        y: 0
      };
      if (!(0, _index.isDxMouseWheelEvent)(e) && endEventDelta.time < INERTIA_TIMEOUT) {
        const delta = (0, _index.eventDelta)(this._savedEventData, this._prevEventData);
        const velocityMultiplier = FRAME_DURATION / delta.time;
        velocity = {
          x: delta.x * velocityMultiplier,
          y: delta.y * velocityMultiplier
        };
      }
      this._fireEvent(SCROLL_END_EVENT, e, {
        velocity
      });
    },
    _stop(e) {
      this._fireEvent(SCROLL_STOP_EVENT, e);
    },
    cancel(e) {
      this.callBase.apply(this, arguments);
      this._fireEvent(SCROLL_CANCEL_EVENT, e);
    },
    dispose() {
      this.callBase.apply(this, arguments);
      this._pointerLocker.dispose();
      this._wheelLocker.dispose();
    },
    _clearSelection() {
      if (this.isNative) {
        return;
      }
      return this.callBase.apply(this, arguments);
    },
    _toggleGestureCover() {
      if (this.isNative) {
        return;
      }
      return this.callBase.apply(this, arguments);
    }
  };
}());
(0, _emitter_registrator.default)({
  emitter: ScrollEmitter,
  events: [SCROLL_INIT_EVENT, SCROLL_START_EVENT, SCROLL_MOVE_EVENT, SCROLL_END_EVENT, SCROLL_STOP_EVENT, SCROLL_CANCEL_EVENT]
});
var _default = exports.default = {
  init: SCROLL_INIT_EVENT,
  start: SCROLL_START_EVENT,
  move: SCROLL_MOVE_EVENT,
  end: SCROLL_END_EVENT,
  stop: SCROLL_STOP_EVENT,
  cancel: SCROLL_CANCEL_EVENT,
  scroll: SCROLL_EVENT
};