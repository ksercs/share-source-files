/**
* DevExtreme (cjs/__internal/ui/scroll_view/m_scrollable.device.js)
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
exports.deviceDependentOptions = void 0;
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _m_support = _interopRequireDefault(require("../../core/utils/m_support"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const deviceDependentOptions = function () {
  return [{
    device() {
      return !_m_support.default.nativeScrolling;
    },
    options: {
      useNative: false
    }
  }, {
    device(device) {
      return !_devices.default.isSimulator() && _devices.default.real().deviceType === 'desktop' && device.platform === 'generic';
    },
    options: {
      bounceEnabled: false,
      scrollByThumb: true,
      scrollByContent: _m_support.default.touch,
      showScrollbar: 'onHover'
    }
  }];
};
exports.deviceDependentOptions = deviceDependentOptions;
