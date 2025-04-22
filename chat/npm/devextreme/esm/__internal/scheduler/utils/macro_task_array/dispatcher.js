/**
* DevExtreme (esm/__internal/scheduler/utils/macro_task_array/dispatcher.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-globals
export const macroTaskIdSet = new Set();
const schedule = async (callback, macroTaskTimeoutMs) => new Promise(resolve => {
  // NOTE: Used setTimeout here because this method is used in heavy calculations,
  // and we wouldn't like to freeze the event loop by them
  // eslint-disable-next-line no-restricted-globals
  const taskId = setTimeout(() => {
    callback();
    macroTaskIdSet.delete(taskId);
    resolve();
  }, macroTaskTimeoutMs);
  macroTaskIdSet.add(taskId);
});
const dispose = () => {
  Array.from(macroTaskIdSet).forEach(id => {
    clearTimeout(id);
    macroTaskIdSet.delete(id);
  });
};
export default {
  schedule,
  dispose
};
