"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createA11yStatusContainer = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CLASSES = {
  container: 'dx-scheduler-a11y-status-container'
};
const createA11yStatusContainer = function () {
  let statusText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (0, _renderer.default)('<div>').text(statusText).addClass(CLASSES.container).attr('role', 'status');
};
exports.createA11yStatusContainer = createA11yStatusContainer;