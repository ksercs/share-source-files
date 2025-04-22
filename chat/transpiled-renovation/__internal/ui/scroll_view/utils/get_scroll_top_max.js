"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollTopMax = getScrollTopMax;
function getScrollTopMax(element) {
  return element.scrollHeight - element.clientHeight;
}