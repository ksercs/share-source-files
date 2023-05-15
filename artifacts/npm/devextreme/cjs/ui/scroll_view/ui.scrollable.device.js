/**
* DevExtreme (cjs/ui/scroll_view/ui.scrollable.device.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.deviceDependentOptions = void 0;
var _devices = _interopRequireDefault(require("../../core/devices"));
var _support = require("../../core/utils/support");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var deviceDependentOptions = function deviceDependentOptions() {
  return [{
    device: function device() {
      return !_support.nativeScrolling;
    },
    options: {
      useNative: false
    }
  }, {
    device: function device(_device) {
      return !_devices.default.isSimulator() && _devices.default.real().deviceType === 'desktop' && _device.platform === 'generic';
    },
    options: {
      bounceEnabled: false,
      scrollByThumb: true,
      scrollByContent: _support.touch,
      showScrollbar: 'onHover'
    }
  }];
};
exports.deviceDependentOptions = deviceDependentOptions;
