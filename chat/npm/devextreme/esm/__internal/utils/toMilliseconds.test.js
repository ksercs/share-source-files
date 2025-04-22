/**
* DevExtreme (esm/__internal/utils/toMilliseconds.test.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { toMilliseconds } from './toMilliseconds';
describe('toMilliseconds', () => {
  it('milliseconds to milliseconds', () => {
    expect(toMilliseconds('millisecond')).toBe(1);
  });
  it('second to milliseconds', () => {
    expect(toMilliseconds('second')).toBe(1000);
  });
  it('minute to milliseconds', () => {
    expect(toMilliseconds('minute')).toBe(60000);
  });
  it('hour to milliseconds', () => {
    expect(toMilliseconds('hour')).toBe(3600000);
  });
  it('day to milliseconds', () => {
    expect(toMilliseconds('day')).toBe(86400000);
  });
  it('week to milliseconds', () => {
    expect(toMilliseconds('week')).toBe(604800000);
  });
  it('month to milliseconds', () => {
    expect(toMilliseconds('month')).toBe(2592000000);
  });
  it('quarter to milliseconds', () => {
    expect(toMilliseconds('quarter')).toBe(7776000000);
  });
  it('year to milliseconds', () => {
    expect(toMilliseconds('year')).toBe(31536000000);
  });
});
