import { titleize } from '../../../../core/utils/inflector';
import { getWindow, hasWindow } from '../../../../core/utils/window';
import { toNumber } from '../../../utils/type_conversion';
export function getElementStyle(el) {
  var _getWindow$getCompute, _getWindow;
  return el && hasWindow() ? (_getWindow$getCompute = (_getWindow = getWindow()).getComputedStyle) === null || _getWindow$getCompute === void 0 ? void 0 : _getWindow$getCompute.call(_getWindow, el) : null;
}
export function getElementMargin(element, side) {
  const style = getElementStyle(element);
  return style ? toNumber(style[`margin${titleize(side)}`]) : 0;
}
export function getElementPadding(element, side) {
  const style = getElementStyle(element);
  return style ? toNumber(style[`padding${titleize(side)}`]) : 0;
}
export function getElementOverflowX(element) {
  const style = getElementStyle(element);
  return style ? style.overflowX : 'visible';
}
export function getElementOverflowY(element) {
  const style = getElementStyle(element);
  return style ? style.overflowY : 'visible';
}
export function getElementTransform(element) {
  const style = getElementStyle(element);
  return style ? style.transform : '';
}