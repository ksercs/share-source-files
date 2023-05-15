/**
* DevExtreme (esm/core/utils/extend.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isPlainObject } from './type';
export var extendFromObject = function extendFromObject(target, source, overrideExistingValues) {
  target = target || {};
  for (var prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      var value = source[prop];
      if (!(prop in target) || overrideExistingValues) {
        target[prop] = value;
      }
    }
  }
  return target;
};
export var extend = function extend(target) {
  target = target || {};
  var i = 1;
  var deep = false;
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    i++;
  }
  for (; i < arguments.length; i++) {
    var source = arguments[i];
    if (source == null) {
      continue;
    }
    for (var key in source) {
      var targetValue = target[key];
      var sourceValue = source[key];
      var sourceValueIsArray = false;
      var clone = void 0;
      if (key === '__proto__' || key === 'constructor' || target === sourceValue) {
        continue;
      }
      if (deep && sourceValue && (isPlainObject(sourceValue) || (sourceValueIsArray = Array.isArray(sourceValue)))) {
        if (sourceValueIsArray) {
          clone = targetValue && Array.isArray(targetValue) ? targetValue : [];
        } else {
          clone = targetValue && isPlainObject(targetValue) ? targetValue : {};
        }
        target[key] = extend(deep, clone, sourceValue);
      } else if (sourceValue !== undefined) {
        target[key] = sourceValue;
      }
    }
  }
  return target;
};
