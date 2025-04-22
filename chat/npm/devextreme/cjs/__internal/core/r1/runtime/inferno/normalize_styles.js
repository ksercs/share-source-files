/**
* DevExtreme (cjs/__internal/core/r1/runtime/inferno/normalize_styles.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeStyles = normalizeStyles;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
const NUMBER_STYLES = new Set(['animationIterationCount', 'borderImageOutset', 'borderImageSlice', 'border-imageWidth', 'boxFlex', 'boxFlexGroup', 'boxOrdinalGroup', 'columnCount', 'fillOpacity', 'flex', 'flexGrow', 'flexNegative', 'flexOrder', 'flexPositive', 'flexShrink', 'floodOpacity', 'fontWeight', 'gridColumn', 'gridRow', 'lineClamp', 'lineHeight', 'opacity', 'order', 'orphans', 'stopOpacity', 'strokeDasharray', 'strokeDashoffset', 'strokeMiterlimit', 'strokeOpacity', 'strokeWidth', 'tabSize', 'widows', 'zIndex', 'zoom']);
const isNumeric = value => {
  if (typeof value === 'number') return true;
  return !Number.isNaN(Number(value));
};
const getNumberStyleValue = (style, value) => NUMBER_STYLES.has(style) ? value : `${value}px`;
const uppercasePattern = /[A-Z]/g;
const kebabCase = str => str.replace(uppercasePattern, '-$&').toLowerCase();
function normalizeStyles(styles) {
  if (!(styles instanceof Object)) {
    return undefined;
  }
  return Object.entries(styles).reduce((acc, _ref) => {
    let [key, value] = _ref;
    acc[kebabCase(key)] = isNumeric(value) ? getNumberStyleValue(key, value) : value;
    return acc;
  }, {});
}
