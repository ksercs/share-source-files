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