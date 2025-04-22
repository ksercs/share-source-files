/**
* DevExtreme (esm/__internal/core/utils/date.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// TODO Vinogradov: Refactor offsets: number[] -> ...offsets: number[]
const addOffsets = (date, offsets) => {
  const newDateMs = offsets.reduce((result, offset) => result + offset, date.getTime());
  return new Date(newDateMs);
};
// eslint-disable-next-line @stylistic/max-len
const isValidDate = date => Boolean(date && !isNaN(new Date(date).valueOf()));
export const dateUtilsTs = {
  addOffsets,
  isValidDate
};
