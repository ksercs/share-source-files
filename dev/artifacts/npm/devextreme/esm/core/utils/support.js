/**
* DevExtreme (esm/core/utils/support.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import domAdapter from '../dom_adapter';
import callOnce from './call_once';
import { getNavigator, hasProperty } from './window';
import devices from '../devices';
import { stylePropPrefix, styleProp } from './style';
var {
  maxTouchPoints
} = getNavigator();
var transitionEndEventNames = {
  'webkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'transitionend',
  'OTransition': 'oTransitionEnd',
  'transition': 'transitionend'
};
var supportProp = function supportProp(prop) {
  return !!styleProp(prop);
};
var isNativeScrollingSupported = function isNativeScrollingSupported() {
  var {
    platform,
    mac: isMac
  } = devices.real();
  var isNativeScrollDevice = platform === 'ios' || platform === 'android' || isMac;
  return isNativeScrollDevice;
};
var inputType = function inputType(type) {
  if (type === 'text') {
    return true;
  }
  var input = domAdapter.createElement('input');
  try {
    input.setAttribute('type', type);
    input.value = 'wrongValue';
    return !input.value;
  } catch (e) {
    return false;
  }
};
var detectTouchEvents = function detectTouchEvents(hasWindowProperty, maxTouchPoints) {
  return (hasWindowProperty('ontouchstart') || !!maxTouchPoints) && !hasWindowProperty('callPhantom');
};
var detectPointerEvent = function detectPointerEvent(hasWindowProperty) {
  return hasWindowProperty('PointerEvent');
};
var touchEvents = detectTouchEvents(hasProperty, maxTouchPoints);
var pointerEvents = detectPointerEvent(hasProperty);
var touchPointersPresent = !!maxTouchPoints;
export { touchEvents, pointerEvents, styleProp, stylePropPrefix, supportProp, inputType };
export var touch = touchEvents || pointerEvents && touchPointersPresent;
export var transition = callOnce(function () {
  return supportProp('transition');
});
export var transitionEndEventName = callOnce(function () {
  return transitionEndEventNames[styleProp('transition')];
});
export var animation = callOnce(function () {
  return supportProp('animation');
});
export var nativeScrolling = isNativeScrollingSupported();
