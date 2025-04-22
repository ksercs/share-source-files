/**
* DevExtreme (esm/__internal/core/utils/m_position.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import config from '../../../core/config';
import { isWindow } from '../../../core/utils/type';
const getDefaultAlignment = isRtlEnabled => {
  const rtlEnabled = isRtlEnabled ?? config().rtlEnabled;
  return rtlEnabled ? 'right' : 'left';
};
const getBoundingRect = element => {
  var _element$getBoundingC;
  if (isWindow(element)) {
    return {
      width: element.outerWidth,
      height: element.outerHeight
    };
  }
  return (_element$getBoundingC = element.getBoundingClientRect) === null || _element$getBoundingC === void 0 ? void 0 : _element$getBoundingC.call(element);
};
export { getBoundingRect, getDefaultAlignment };
