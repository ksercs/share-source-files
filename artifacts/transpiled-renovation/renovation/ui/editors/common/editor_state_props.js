"use strict";

exports.EditorStateProps = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var EditorStateProps = Object.defineProperties({
  hoverStateEnabled: true,
  activeStateEnabled: true
}, {
  focusStateEnabled: {
    get: function get() {
      return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
    },
    configurable: true,
    enumerable: true
  }
});
exports.EditorStateProps = EditorStateProps;