"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallowEquals = void 0;
const shallowEquals = (firstObject, secondObject) => {
  if (Object.keys(firstObject).length !== Object.keys(secondObject).length) {
    return false;
  }
  return Object.entries(firstObject).every(_ref => {
    let [key, firstValue] = _ref;
    const secondValue = secondObject[key];
    if (firstValue instanceof Date && secondValue instanceof Date) {
      return firstValue.getTime() === secondValue.getTime();
    }
    return firstValue === secondValue;
  });
};
exports.shallowEquals = shallowEquals;