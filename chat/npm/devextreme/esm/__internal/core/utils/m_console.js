/**
* DevExtreme (esm/__internal/core/utils/m_console.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* global console */
/* eslint no-console: off */
import { isFunction } from '../../../core/utils/type';
const noop = function () {};
const getConsoleMethod = function (method) {
  if (typeof console === 'undefined' || !isFunction(console[method])) {
    return noop;
  }
  return console[method].bind(console);
};
export const logger = {
  log: getConsoleMethod('log'),
  info: getConsoleMethod('info'),
  warn: getConsoleMethod('warn'),
  error: getConsoleMethod('error')
};
export const debug = function () {
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }
  function assertParam(parameter, message) {
    assert(parameter !== null && parameter !== undefined, message);
  }
  return {
    assert,
    assertParam
  };
}();
export default {
  logger,
  debug
};
