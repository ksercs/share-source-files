/**
* DevExtreme (esm/animation/frame.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { hasWindow, getWindow } from '../core/utils/window';
var window = hasWindow() ? getWindow() : {};
import callOnce from '../core/utils/call_once';
var FRAME_ANIMATION_STEP_TIME = 1000 / 60;
var request = function request(callback) {
  return setTimeout(callback, FRAME_ANIMATION_STEP_TIME);
};
var cancel = function cancel(requestID) {
  clearTimeout(requestID);
};
var setAnimationFrameMethods = callOnce(function () {
  var nativeRequest = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  var nativeCancel = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
  if (nativeRequest && nativeCancel) {
    request = nativeRequest;
    cancel = nativeCancel;
  }
});
export function requestAnimationFrame() {
  setAnimationFrameMethods();
  return request.apply(window, arguments);
}
export function cancelAnimationFrame() {
  setAnimationFrameMethods();
  cancel.apply(window, arguments);
}
