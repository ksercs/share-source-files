/**
* DevExtreme (esm/core/utils/comparator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import domAdapter from '../dom_adapter';
import { toComparable } from './data';
import { isRenderer } from './type';
var hasNegation = function hasNegation(oldValue, newValue) {
  return 1 / oldValue === 1 / newValue;
};
export var equals = function equals(oldValue, newValue) {
  oldValue = toComparable(oldValue, true);
  newValue = toComparable(newValue, true);
  if (oldValue && newValue && isRenderer(oldValue) && isRenderer(newValue)) {
    return newValue.is(oldValue);
  }
  var oldValueIsNaN = oldValue !== oldValue;
  var newValueIsNaN = newValue !== newValue;
  if (oldValueIsNaN && newValueIsNaN) {
    return true;
  }
  if (oldValue === 0 && newValue === 0) {
    return hasNegation(oldValue, newValue);
  }
  if (oldValue === null || typeof oldValue !== 'object' || domAdapter.isElementNode(oldValue)) {
    return oldValue === newValue;
  }
  return false;
};
