"use strict";

var _globals = require("@jest/globals");
var _toMilliseconds = require("./toMilliseconds");
(0, _globals.describe)('toMilliseconds', () => {
  (0, _globals.it)('milliseconds to milliseconds', () => {
    (0, _globals.expect)((0, _toMilliseconds.toMilliseconds)('millisecond')).toBe(1);
  });
  (0, _globals.it)('second to milliseconds', () => {
    (0, _globals.expect)((0, _toMilliseconds.toMilliseconds)('second')).toBe(1000);
  });
  (0, _globals.it)('minute to milliseconds', () => {
    (0, _globals.expect)((0, _toMilliseconds.toMilliseconds)('minute')).toBe(60000);
  });
  (0, _globals.it)('hour to milliseconds', () => {
    (0, _globals.expect)((0, _toMilliseconds.toMilliseconds)('hour')).toBe(3600000);
  });
  (0, _globals.it)('day to milliseconds', () => {
    (0, _globals.expect)((0, _toMilliseconds.toMilliseconds)('day')).toBe(86400000);
  });
  (0, _globals.it)('week to milliseconds', () => {
    (0, _globals.expect)((0, _toMilliseconds.toMilliseconds)('week')).toBe(604800000);
  });
  (0, _globals.it)('month to milliseconds', () => {
    (0, _globals.expect)((0, _toMilliseconds.toMilliseconds)('month')).toBe(2592000000);
  });
  (0, _globals.it)('quarter to milliseconds', () => {
    (0, _globals.expect)((0, _toMilliseconds.toMilliseconds)('quarter')).toBe(7776000000);
  });
  (0, _globals.it)('year to milliseconds', () => {
    (0, _globals.expect)((0, _toMilliseconds.toMilliseconds)('year')).toBe(31536000000);
  });
});