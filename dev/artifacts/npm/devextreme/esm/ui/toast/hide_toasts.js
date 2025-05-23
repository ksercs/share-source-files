/**
* DevExtreme (esm/ui/toast/hide_toasts.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
var TOAST_CLASS = 'dx-toast';
function hideAllToasts(container) {
  var toasts = $(".".concat(TOAST_CLASS)).toArray();
  if (!arguments.length) {
    toasts.forEach(toast => {
      $(toast).dxToast('hide');
    });
    return;
  }
  var containerElement = $(container).get(0);
  toasts.map(toast => $(toast).dxToast('instance')).filter(instance => {
    var toastContainerElement = $(instance.option('container')).get(0);
    return containerElement === toastContainerElement && containerElement;
  }).forEach(instance => {
    instance.hide();
  });
}
export default hideAllToasts;
