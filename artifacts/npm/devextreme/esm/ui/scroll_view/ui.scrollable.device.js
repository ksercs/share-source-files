/**
* DevExtreme (esm/ui/scroll_view/ui.scrollable.device.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from '../../core/devices';
import { nativeScrolling, touch } from '../../core/utils/support';
export var deviceDependentOptions = function deviceDependentOptions() {
  return [{
    device: function device() {
      return !nativeScrolling;
    },
    options: {
      useNative: false
    }
  }, {
    device: function device(_device) {
      return !devices.isSimulator() && devices.real().deviceType === 'desktop' && _device.platform === 'generic';
    },
    options: {
      bounceEnabled: false,
      scrollByThumb: true,
      scrollByContent: touch,
      showScrollbar: 'onHover'
    }
  }];
};
