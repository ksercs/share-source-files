/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_element_style.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { titleize } from '../../../../core/utils/inflector';
import { getWindow, hasWindow } from '../../../../core/utils/window';
import { toNumber } from '../../../utils/type_conversion';
export function getElementStyle(el) {
  var _getWindow$getCompute, _getWindow;
  return el && hasWindow() ? (_getWindow$getCompute = (_getWindow = getWindow()).getComputedStyle) === null || _getWindow$getCompute === void 0 ? void 0 : _getWindow$getCompute.call(_getWindow, el) : null;
}
export function getElementMargin(element, side) {
  var style = getElementStyle(element);
  return style ? toNumber(style["margin".concat(titleize(side))]) : 0;
}
export function getElementPadding(element, side) {
  var style = getElementStyle(element);
  return style ? toNumber(style["padding".concat(titleize(side))]) : 0;
}
export function getElementOverflowX(element) {
  var style = getElementStyle(element);
  return style ? style.overflowX : 'visible';
}
export function getElementOverflowY(element) {
  var style = getElementStyle(element);
  return style ? style.overflowY : 'visible';
}
export function getElementTransform(element) {
  var style = getElementStyle(element);
  return style ? style.transform : '';
}
