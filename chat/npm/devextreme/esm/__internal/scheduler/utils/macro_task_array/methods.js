/**
* DevExtreme (esm/__internal/scheduler/utils/macro_task_array/methods.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import macroTaskDispatcher from './dispatcher';
export const DEFAULT_STEPS_VALUE = 100;
export const DEFAULT_MACRO_TASK_TIMEOUT = 0;
export const macroTaskArrayForEach = async function (array, callback) {
  let step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_STEPS_VALUE;
  let macroTaskTimeoutMs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_MACRO_TASK_TIMEOUT;
  const promises = [];
  const batchesCount = Math.ceil(array.length / step);
  for (let batchIdx = 0; batchIdx < batchesCount; batchIdx += 1) {
    const scheduledTask = macroTaskDispatcher.schedule(() => {
      const startIdx = batchIdx * step;
      const maxIdx = startIdx + step;
      for (let idx = startIdx; idx < maxIdx && array[idx] !== undefined; idx += 1) {
        callback(array[idx]);
      }
    }, macroTaskTimeoutMs);
    promises.push(scheduledTask);
  }
  await Promise.all(promises);
};
export const macroTaskArrayMap = async function (array, callback) {
  let step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_STEPS_VALUE;
  let macroTaskTimeoutMs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_MACRO_TASK_TIMEOUT;
  const result = [];
  await macroTaskArrayForEach(array, item => {
    result.push(callback(item));
  }, step, macroTaskTimeoutMs);
  return result;
};
