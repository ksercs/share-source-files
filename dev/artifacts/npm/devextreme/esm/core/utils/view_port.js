/**
* DevExtreme (esm/core/utils/view_port.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../renderer';
import readyCallbacks from './ready_callbacks';
var ready = readyCallbacks.add;
import callbacks from './callbacks';
var changeCallback = callbacks();
var $originalViewPort = $();
var value = function () {
  var $current;
  return function (element) {
    if (!arguments.length) {
      return $current;
    }
    var $element = $(element);
    $originalViewPort = $element;
    var isNewViewportFound = !!$element.length;
    var prevViewPort = value();
    $current = isNewViewportFound ? $element : $('body');
    changeCallback.fire(isNewViewportFound ? value() : $(), prevViewPort);
  };
}();
ready(function () {
  value('.dx-viewport');
});
export { value, changeCallback };
export function originalViewPort() {
  return $originalViewPort;
}
