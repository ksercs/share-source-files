"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeObserverSingleton = void 0;
var _common = require("../../core/utils/common");
var _m_window = _interopRequireDefault(require("./utils/m_window"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = _m_window.default.getWindow();
const ResizeObserverMock = {
  observe: _common.noop,
  unobserve: _common.noop,
  disconnect: _common.noop
};
class ResizeObserverSingleton {
  constructor() {
    // we need to make our own for extensions like this
    if (!_m_window.default.hasWindow() || !window.ResizeObserver) {
      // eslint-disable-next-line no-constructor-return
      return ResizeObserverMock;
    }
    this._callbacksMap = new Map();
    this._observer = new window.ResizeObserver(entries => {
      entries.forEach(entry => {
        var _this$_callbacksMap$g;
        (_this$_callbacksMap$g = this._callbacksMap.get(entry.target)) === null || _this$_callbacksMap$g === void 0 || _this$_callbacksMap$g(entry);
      });
    });
  }
  observe(element, callback) {
    this._callbacksMap.set(element, callback);
    this._observer.observe(element);
  }
  unobserve(element) {
    this._callbacksMap.delete(element);
    this._observer.unobserve(element);
  }
  disconnect() {
    this._callbacksMap.clear();
    this._observer.disconnect();
  }
}
const resizeObserverSingleton = exports.resizeObserverSingleton = new ResizeObserverSingleton();