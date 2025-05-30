import { getOuterWidth } from '../../../core/utils/size';
import { hasWindow } from '../../../core/utils/window';
const getElementWidth = function ($element) {
  if (hasWindow()) {
    return getOuterWidth($element);
  }
};
const getSizeValue = function (size) {
  if (size === null) {
    size = undefined;
  }
  if (typeof size === 'function') {
    size = size();
  }
  return size;
};
export { getElementWidth, getSizeValue };