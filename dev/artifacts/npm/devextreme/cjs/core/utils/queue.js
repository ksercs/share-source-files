/**
* DevExtreme (cjs/core/utils/queue.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.create = createQueue;
exports.enqueue = void 0;
var _errors = _interopRequireDefault(require("../errors"));
var _deferred = require("../../core/utils/deferred");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function createQueue(discardPendingTasks) {
  var _tasks = [];
  var _busy = false;
  function exec() {
    while (_tasks.length) {
      _busy = true;
      var task = _tasks.shift();
      var result = task();
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
    add: add,
    busy: busy
  };
}
var enqueue = createQueue().add; // Default global queue for UI sync, consider renaming
exports.enqueue = enqueue;
