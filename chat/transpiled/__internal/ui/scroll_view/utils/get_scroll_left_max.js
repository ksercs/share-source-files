"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollLeftMax = getScrollLeftMax;
function getScrollLeftMax(element) {
  return element.scrollWidth - element.clientWidth;
}