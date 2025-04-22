"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getElementComputedStyle;
var _window = require("../../../../core/utils/window");
function getElementComputedStyle(el) {
  var _window$getComputedSt;
  const window = (0, _window.getWindow)();
  return el ? (_window$getComputedSt = window.getComputedStyle) === null || _window$getComputedSt === void 0 ? void 0 : _window$getComputedSt.call(window, el) : null;
}