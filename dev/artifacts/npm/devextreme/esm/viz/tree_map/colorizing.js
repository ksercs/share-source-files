/**
* DevExtreme (esm/viz/tree_map/colorizing.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { normalizeEnum as _normalizeEnum } from '../core/utils';
import { noop as _noop } from '../../core/utils/common';
var colorizers = {};
var defaultColorizerName;
function wrapLeafColorGetter(getter) {
  return function (node) {
    return !node.isNode() ? getter(node) : undefined;
  };
}
function wrapGroupColorGetter(getter) {
  return function (node) {
    var parent = !node.isNode() && node.parent;
    return parent ? parent._groupColor = parent._groupColor || getter(parent) : undefined;
  };
}
export function getColorizer(options, themeManager, root) {
  var type = _normalizeEnum(options.type || defaultColorizerName);
  var colorizer = colorizers[type] && colorizers[type](options, themeManager, root);
  return colorizer ? (options.colorizeGroups ? wrapGroupColorGetter : wrapLeafColorGetter)(colorizer) : _noop;
}
export function addColorizer(name, colorizer) {
  colorizers[name] = colorizer;
}
export function setDefaultColorizer(name) {
  defaultColorizerName = name;
}
function getValueAsColorCode(node) {
  return node.value;
}
function createColorCode(colorCodeField) {
  return function (node) {
    return Number(node.data[colorCodeField]);
  };
}
export function createColorCodeGetter(options) {
  return options.colorCodeField ? createColorCode(options.colorCodeField) : getValueAsColorCode;
}
