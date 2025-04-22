/**
* DevExtreme (cjs/__internal/scheduler/utils/macro_task_array/dispatcher.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.macroTaskIdSet = exports.default = void 0;
// eslint-disable-next-line no-restricted-globals
const macroTaskIdSet = exports.macroTaskIdSet = new Set();
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
var _default = exports.default = {
  schedule,
  dispose
};
