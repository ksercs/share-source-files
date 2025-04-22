"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _frame = require("../../../common/core/animation/frame");
var _class = _interopRequireDefault(require("../../../core/class"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-expect-error dxClass inheritance issue
class Animator extends _class.default.inherit({}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ctor(strategy) {
    this._finished = true;
    this._stopped = false;
    this._proxiedStepCore = this._stepCore.bind(this);
  }
  start() {
    this._stopped = false;
    this._finished = false;
    this._stepCore();
  }
  stop() {
    this._stopped = true;
    (0, _frame.cancelAnimationFrame)(this._stepAnimationFrame);
  }
  _stepCore() {
    if (this._isStopped()) {
      this._stop();
      return;
    }
    if (this._isFinished()) {
      this._finished = true;
      this._complete();
      return;
    }
    this._step();
    this._stepAnimationFrame = (0, _frame.requestAnimationFrame)(this._proxiedStepCore);
  }
  _step() {
    _class.default.abstract();
  }
  // @ts-expect-error ts-error
  _isFinished() {}
  _stop() {}
  _complete() {}
  _isStopped() {
    return this._stopped;
  }
  inProgress() {
    return !(this._stopped || this._finished);
  }
}
var _default = exports.default = Animator;