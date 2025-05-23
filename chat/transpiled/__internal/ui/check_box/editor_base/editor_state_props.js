"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultEditorStateProps = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultEditorStateProps = exports.defaultEditorStateProps = {
  hoverStateEnabled: true,
  activeStateEnabled: true,
  focusStateEnabled: _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator()
};