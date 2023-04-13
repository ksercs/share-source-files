/**
* DevExtreme (esm/ui/text_box/utils.support.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import domAdapter from '../../core/dom_adapter';
import devices from '../../core/devices';

// Must become obsolete after the fix https://bugs.chromium.org/p/chromium/issues/detail?id=947408
function isModernAndroidDevice() {
  var {
    android,
    version
  } = devices.real();
  return android && version[0] > 4;
}
export function isInputEventsL2Supported() {
  // after the fix https://bugs.chromium.org/p/chromium/issues/detail?id=947408 chrome supports input events l2
  return 'onbeforeinput' in domAdapter.createElement('input') || isModernAndroidDevice();
}
