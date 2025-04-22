/**
* DevExtreme (esm/__internal/scheduler/a11y_status/a11y_status_render.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
const CLASSES = {
  container: 'dx-scheduler-a11y-status-container'
};
export const createA11yStatusContainer = function () {
  let statusText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return $('<div>').text(statusText).addClass(CLASSES.container).attr('role', 'status');
};
