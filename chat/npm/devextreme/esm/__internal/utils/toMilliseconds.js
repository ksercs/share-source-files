/**
* DevExtreme (esm/__internal/utils/toMilliseconds.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const timeIntervals = {
  millisecond: 1,
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
  month: 1000 * 60 * 60 * 24 * 30,
  quarter: 1000 * 60 * 60 * 24 * 30 * 3,
  year: 1000 * 60 * 60 * 24 * 365
};
export function toMilliseconds(value) {
  return timeIntervals[value];
}
