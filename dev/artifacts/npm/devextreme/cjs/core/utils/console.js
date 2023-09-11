/**
* DevExtreme (cjs/core/utils/console.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.logger = exports.debug = void 0;
var _type = require("./type");
/* global console */
/* eslint no-console: off */

var noop = function noop() {};
var getConsoleMethod = function getConsoleMethod(method) {
  if (typeof console === 'undefined' || !(0, _type.isFunction)(console[method])) {
    return noop;
  }
  return console[method].bind(console);
};
var logger = {
  log: getConsoleMethod('log'),
  info: getConsoleMethod('info'),
  warn: getConsoleMethod('warn'),
  error: getConsoleMethod('error')
};
exports.logger = logger;
var debug = function () {
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }
  function assertParam(parameter, message) {
    assert(parameter !== null && parameter !== undefined, message);
  }
  return {
    assert: assert,
    assertParam: assertParam
  };
}();
exports.debug = debug;
