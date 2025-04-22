import { getWindow } from '../../../../core/utils/window';
export default function getElementComputedStyle(el) {
  var _window$getComputedSt;
  const window = getWindow();
  return el ? (_window$getComputedSt = window.getComputedStyle) === null || _window$getComputedSt === void 0 ? void 0 : _window$getComputedSt.call(window, el) : null;
}