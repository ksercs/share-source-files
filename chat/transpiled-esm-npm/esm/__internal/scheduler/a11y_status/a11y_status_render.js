import $ from '../../../core/renderer';
const CLASSES = {
  container: 'dx-scheduler-a11y-status-container'
};
export const createA11yStatusContainer = function () {
  let statusText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return $('<div>').text(statusText).addClass(CLASSES.container).attr('role', 'status');
};