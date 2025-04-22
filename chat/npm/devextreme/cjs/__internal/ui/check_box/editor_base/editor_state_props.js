/**
* DevExtreme (cjs/__internal/ui/check_box/editor_base/editor_state_props.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
