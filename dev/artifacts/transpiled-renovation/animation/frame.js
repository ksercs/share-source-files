"use strict";

exports.cancelAnimationFrame = cancelAnimationFrame;
exports.requestAnimationFrame = requestAnimationFrame;
var _window = require("../core/utils/window");
var _call_once = _interopRequireDefault(require("../core/utils/call_once"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var window = (0, _window.hasWindow)() ? (0, _window.getWindow)() : {};
var FRAME_ANIMATION_STEP_TIME = 1000 / 60;
var request = function request(callback) {
  return setTimeout(callback, FRAME_ANIMATION_STEP_TIME);
};
var cancel = function cancel(requestID) {
  clearTimeout(requestID);
};
var setAnimationFrameMethods = (0, _call_once.default)(function () {
  var nativeRequest = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  var nativeCancel = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
  if (nativeRequest && nativeCancel) {
    request = nativeRequest;
    cancel = nativeCancel;
  }
});
function requestAnimationFrame() {
  setAnimationFrameMethods();
  return request.apply(window, arguments);
}
function cancelAnimationFrame() {
  setAnimationFrameMethods();
  cancel.apply(window, arguments);
}