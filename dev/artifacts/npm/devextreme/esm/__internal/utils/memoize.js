/**
* DevExtreme (esm/__internal/utils/memoize.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { equalByValue } from '../../core/utils/common';
var compareByReference = (args, lastArgs) => args.length === lastArgs.length && !Object.keys(args).some(key => args[key] !== lastArgs[key]);
var compareByValue = (args, lastArgs) => equalByValue(args, lastArgs, {
  maxDepth: 4
});
var createCacheFunc = (firstArgs, firstResult, originFunc, compareFunc) => {
  var lastArgs = firstArgs;
  var lastResult = firstResult;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var argsEquals = compareFunc(args, lastArgs);
    if (argsEquals) {
      return lastResult;
    }
    lastArgs = args;
    lastResult = originFunc(...lastArgs);
    return lastResult;
  };
};
var MEMOIZE_DEFAULT_OPTIONS = {
  compareType: 'reference'
};
export var memoize = function memoize(func) {
  var {
    compareType
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MEMOIZE_DEFAULT_OPTIONS;
  var cachedFunc = null;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (!cachedFunc) {
      var firstResult = func(...args);
      cachedFunc = createCacheFunc(args, firstResult, func, compareType === 'reference' ? compareByReference : compareByValue);
      return firstResult;
    }
    return cachedFunc(...args);
  };
};
