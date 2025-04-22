"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emitter = _interopRequireDefault(require("../../common/core/events/core/emitter"));
var _emitter_registrator = _interopRequireDefault(require("../../common/core/events/core/emitter_registrator"));
var _index = require("../../common/core/events/utils/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  abs
} = Math;
const HOLD_EVENT_NAME = 'dxhold';
const HOLD_TIMEOUT = 750;
const TOUCH_BOUNDARY = 5;
const HoldEmitter = _emitter.default.inherit({
  start(e) {
    this._startEventData = (0, _index.eventData)(e);
    this._startTimer(e);
  },
  _startTimer(e) {
    const holdTimeout = 'timeout' in this ? this.timeout : HOLD_TIMEOUT;
    this._holdTimer = setTimeout(() => {
      this._requestAccept(e);
      this._fireEvent(HOLD_EVENT_NAME, e, {
        target: e.target
      });
      this._forgetAccept();
    }, holdTimeout);
  },
  move(e) {
    if (this._touchWasMoved(e)) {
      this._cancel(e);
    }
  },
  _touchWasMoved(e) {
    // @ts-expect-error
    const delta = (0, _index.eventDelta)(this._startEventData, (0, _index.eventData)(e));
    return abs(delta.x) > TOUCH_BOUNDARY || abs(delta.y) > TOUCH_BOUNDARY;
  },
  end() {
    this._stopTimer();
  },
  _stopTimer() {
    clearTimeout(this._holdTimer);
  },
  cancel() {
    this._stopTimer();
  },
  dispose() {
    this._stopTimer();
  }
});
(0, _emitter_registrator.default)({
  emitter: HoldEmitter,
  bubble: true,
  events: [HOLD_EVENT_NAME]
});
var _default = exports.default = {
  name: HOLD_EVENT_NAME
};