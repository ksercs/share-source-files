"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionStorage = void 0;
var _window = require("../../../core/utils/window");
const window = (0, _window.getWindow)();
const getSessionStorage = function () {
  let sessionStorage;
  try {
    sessionStorage = window.sessionStorage;
  } catch (e) {/* empty */}
  return sessionStorage;
};
exports.sessionStorage = getSessionStorage;