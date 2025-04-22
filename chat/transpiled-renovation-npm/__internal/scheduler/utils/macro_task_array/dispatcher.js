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