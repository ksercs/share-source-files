/**
* DevExtreme (esm/__internal/core/utils/m_queue.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../core/errors';
import { when } from '../../../core/utils/deferred';
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
        when(result).always(exec);
        return;
      }
      throw errors.Error('E0015');
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
export { createQueue as create };
export const enqueue = createQueue().add; // Default global queue for UI sync, consider renaming
