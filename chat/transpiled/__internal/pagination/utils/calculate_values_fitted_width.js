"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateValuesFittedWidth = calculateValuesFittedWidth;
exports.oneDigitWidth = void 0;
const oneDigitWidth = exports.oneDigitWidth = 10;
function calculateValuesFittedWidth(minWidth, values) {
  return minWidth + oneDigitWidth * Math.max(...values).toString().length;
}