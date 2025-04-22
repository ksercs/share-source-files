/**
* DevExtreme (esm/common/core/animation/frame.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { hasWindow, getWindow } from '../../../core/utils/window';
const window = hasWindow() ? getWindow() : {};
import callOnce from '../../../core/utils/call_once';
const FRAME_ANIMATION_STEP_TIME = 1000 / 60;
let request = function (callback) {
  return setTimeout(callback, FRAME_ANIMATION_STEP_TIME);
};
let cancel = function (requestID) {
  clearTimeout(requestID);
};
const setAnimationFrameMethods = callOnce(function () {
  const nativeRequest = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  const nativeCancel = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
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
