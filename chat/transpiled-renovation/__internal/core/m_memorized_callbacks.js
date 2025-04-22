"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemorizedCallbacks = void 0;
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _iterator = require("../../core/utils/iterator");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MemorizedCallbacks {
  constructor() {
    this.memory = [];
    this.callbacks = (0, _callbacks.default)();
  }
  add(fn) {
    (0, _iterator.each)(this.memory, (_, item) => fn.apply(fn, item));
    this.callbacks.add(fn);
  }
  remove(fn) {
    this.callbacks.remove(fn);
  }
  fire() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    this.memory.push(args);
    this.callbacks.fire.apply(this.callbacks, args);
  }
}
exports.MemorizedCallbacks = MemorizedCallbacks;