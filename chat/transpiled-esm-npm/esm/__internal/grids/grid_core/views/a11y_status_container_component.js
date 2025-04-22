import $ from '../../../../core/renderer';
const CLASSES = {
  container: 'dx-gridbase-a11y-status-container'
};
export const A11yStatusContainerComponent = _ref => {
  let {
    statusText
  } = _ref;
  return $('<div>').text(statusText ?? '').addClass(CLASSES.container).attr('role', 'status');
};