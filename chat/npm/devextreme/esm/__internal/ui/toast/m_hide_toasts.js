/**
* DevExtreme (esm/__internal/ui/toast/m_hide_toasts.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
const TOAST_CLASS = 'dx-toast';
function hideAllToasts(container) {
  const toasts = $(`.${TOAST_CLASS}`).toArray();
  if (!arguments.length) {
    // @ts-expect-error
    toasts.forEach(toast => {
      $(toast).dxToast('hide');
    });
    return;
  }
  const containerElement = $(container).get(0);
  toasts
  // @ts-expect-error
  .map(toast => $(toast).dxToast('instance')).filter(instance => {
    const toastContainerElement = $(instance.option('container')).get(0);
    return containerElement === toastContainerElement && containerElement;
  }).forEach(instance => {
    instance.hide();
  });
}
export default hideAllToasts;
