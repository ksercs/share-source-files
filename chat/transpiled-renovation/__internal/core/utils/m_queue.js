"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = createQueue;
exports.enqueue = void 0;
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _deferred = require("../../../core/utils/deferred");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createQueue(discardPendingTasks) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _tasks = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _busy = false;
  function exec() {
    while (_tasks.length) {
      _busy = true;
      const task = _tasks.shift();
      const result = task();
      if (result === undefined) {
        continue;
      }
      if (result.then) {
        // NOTE: immediate "then" on the next line can reset it back to false
        (0, _deferred.when)(result).always(exec);
        return;
      }
      throw _errors.default.Error('E0015');
    }
    _busy = false;
  }
  function add(task, removeTaskCallback) {
    if (!discardPendingTasks) {
      _tasks.push(task);
    } else {
      if (_tasks[0] && removeTaskCallback) {
        removeTaskCallback(_tasks[0]);
      }
      _tasks = [task];
    }
    if (!_busy) {
      exec();
    }
  }
  function busy() {
    return _busy;
  }
  return {
    add,
    busy
  };
}
const enqueue = exports.enqueue = createQueue().add; // Default global queue for UI sync, consider renaming