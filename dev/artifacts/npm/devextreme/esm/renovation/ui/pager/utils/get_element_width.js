/**
* DevExtreme (esm/renovation/ui/pager/utils/get_element_width.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import getElementComputedStyle from '../../../utils/get_computed_style';
import { toNumber } from '../../../utils/type_conversion';
export function getElementStyle(name, element) {
  var _getElementComputedSt;
  var computedStyle = (_getElementComputedSt = getElementComputedStyle(element)) !== null && _getElementComputedSt !== void 0 ? _getElementComputedSt : {};
  return toNumber(computedStyle[name]);
}
export function getElementContentWidth(element) {
  var padding = getElementStyle('paddingLeft', element) + getElementStyle('paddingRight', element);
  var width = getElementStyle('width', element);
  return width - padding;
}
export function getElementWidth(element) {
  var margin = getElementStyle('marginLeft', element) + getElementStyle('marginRight', element);
  var width = getElementStyle('width', element);
  return margin + width;
}
export function getElementMinWidth(element) {
  return getElementStyle('minWidth', element);
}
