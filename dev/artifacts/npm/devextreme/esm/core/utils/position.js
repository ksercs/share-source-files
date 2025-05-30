/**
* DevExtreme (esm/core/utils/position.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import config from '../config';
import { isWindow } from '../utils/type';
var getDefaultAlignment = isRtlEnabled => {
  var rtlEnabled = isRtlEnabled !== null && isRtlEnabled !== void 0 ? isRtlEnabled : config().rtlEnabled;
  return rtlEnabled ? 'right' : 'left';
};
var getBoundingRect = element => {
  if (isWindow(element)) {
    return {
      width: element.outerWidth,
      height: element.outerHeight
    };
  }
  return element.getBoundingClientRect();
};
export { getBoundingRect, getDefaultAlignment };
