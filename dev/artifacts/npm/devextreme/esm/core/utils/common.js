/**
* DevExtreme (esm/core/utils/common.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import config from '../config';
import Guid from '../guid';
import { when, Deferred } from '../utils/deferred';
import { toComparable } from './data';
import { each } from './iterator';
import { isDefined, isFunction, isString, isObject, type } from './type';
export var ensureDefined = function ensureDefined(value, defaultValue) {
  return isDefined(value) ? value : defaultValue;
};
export var executeAsync = function executeAsync(action, context /* , internal */) {
  var deferred = new Deferred();
  var normalizedContext = context || this;
  var task = {
    promise: deferred.promise(),
    abort: function abort() {
      clearTimeout(timerId);
      deferred.rejectWith(normalizedContext);
    }
  };
  var callback = function callback() {
    var result = action.call(normalizedContext);
    if (result && result.done && isFunction(result.done)) {
      result.done(function () {
        deferred.resolveWith(normalizedContext);
      });
    } else {
      deferred.resolveWith(normalizedContext);
    }
  };
  var timerId = (arguments[2] || setTimeout)(callback, typeof context === 'number' ? context : 0);
  return task;
};
var delayedFuncs = [];
var delayedNames = [];
var delayedDeferreds = [];
var executingName;
var deferExecute = function deferExecute(name, func, deferred) {
  if (executingName && executingName !== name) {
    delayedFuncs.push(func);
    delayedNames.push(name);
    deferred = deferred || new Deferred();
    delayedDeferreds.push(deferred);
    return deferred;
  } else {
    var oldExecutingName = executingName;
    var currentDelayedCount = delayedDeferreds.length;
    executingName = name;
    var result = func();
    if (!result) {
      if (delayedDeferreds.length > currentDelayedCount) {
        result = when.apply(this, delayedDeferreds.slice(currentDelayedCount));
      } else if (deferred) {
        deferred.resolve();
      }
    }
    executingName = oldExecutingName;
    if (deferred && result && result.done) {
      result.done(deferred.resolve).fail(deferred.reject);
    }
    if (!executingName && delayedFuncs.length) {
      (delayedNames.shift() === 'render' ? deferRender : deferUpdate)(delayedFuncs.shift(), delayedDeferreds.shift());
    }
    return result || when();
  }
};
export var deferRender = function deferRender(func, deferred) {
  return deferExecute('render', func, deferred);
};
export var deferUpdate = function deferUpdate(func, deferred) {
  return deferExecute('update', func, deferred);
};
export var deferRenderer = function deferRenderer(func) {
  return function () {
    var that = this;
    return deferExecute('render', function () {
      return func.call(that);
    });
  };
};
export var deferUpdater = function deferUpdater(func) {
  return function () {
    var that = this;
    return deferExecute('update', function () {
      return func.call(that);
    });
  };
};
export var findBestMatches = function findBestMatches(targetFilter, items, mapFn) {
  var bestMatches = [];
  var maxMatchCount = 0;
  each(items, (index, itemSrc) => {
    var matchCount = 0;
    var item = mapFn ? mapFn(itemSrc) : itemSrc;
    each(targetFilter, (paramName, targetValue) => {
      var value = item[paramName];
      if (value === undefined) {
        return;
      }
      if (match(value, targetValue)) {
        matchCount++;
        return;
      }
      matchCount = -1;
      return false;
    });
    if (matchCount < maxMatchCount) {
      return;
    }
    if (matchCount > maxMatchCount) {
      bestMatches.length = 0;
      maxMatchCount = matchCount;
    }
    bestMatches.push(itemSrc);
  });
  return bestMatches;
};
var match = function match(value, targetValue) {
  if (Array.isArray(value) && Array.isArray(targetValue)) {
    var mismatch = false;
    each(value, (index, valueItem) => {
      if (valueItem !== targetValue[index]) {
        mismatch = true;
        return false;
      }
    });
    if (mismatch) {
      return false;
    }
    return true;
  }
  if (value === targetValue) {
    return true;
  }
  return false;
};
export var splitPair = function splitPair(raw) {
  var _raw$x, _raw$y;
  switch (type(raw)) {
    case 'string':
      return raw.split(/\s+/, 2);
    case 'object':
      return [(_raw$x = raw.x) !== null && _raw$x !== void 0 ? _raw$x : raw.h, (_raw$y = raw.y) !== null && _raw$y !== void 0 ? _raw$y : raw.v];
    case 'number':
      return [raw];
    case 'array':
      return raw;
    default:
      return null;
  }
};
export var normalizeKey = function normalizeKey(id) {
  var key = isString(id) ? id : id.toString();
  var arr = key.match(/[^a-zA-Z0-9_]/g);
  arr && each(arr, (_, sign) => {
    key = key.replace(sign, '__' + sign.charCodeAt() + '__');
  });
  return key;
};
export var denormalizeKey = function denormalizeKey(key) {
  var arr = key.match(/__\d+__/g);
  arr && arr.forEach(char => {
    var charCode = parseInt(char.replace('__', ''));
    key = key.replace(char, String.fromCharCode(charCode));
  });
  return key;
};
export var pairToObject = function pairToObject(raw, preventRound) {
  var pair = splitPair(raw);
  var h = preventRound ? parseFloat(pair && pair[0]) : parseInt(pair && pair[0], 10);
  var v = preventRound ? parseFloat(pair && pair[1]) : parseInt(pair && pair[1], 10);
  if (!isFinite(h)) {
    h = 0;
  }
  if (!isFinite(v)) {
    v = h;
  }
  return {
    h,
    v
  };
};
export var getKeyHash = function getKeyHash(key) {
  if (key instanceof Guid) {
    return key.toString();
  } else if (isObject(key) || Array.isArray(key)) {
    try {
      var keyHash = JSON.stringify(key);
      return keyHash === '{}' ? key : keyHash;
    } catch (e) {
      return key;
    }
  }
  return key;
};
export var escapeRegExp = function escapeRegExp(string) {
  return string.replace(/[[\]{}\-()*+?.\\^$|\s]/g, '\\$&');
};
export var applyServerDecimalSeparator = function applyServerDecimalSeparator(value) {
  var separator = config().serverDecimalSeparator;
  if (isDefined(value)) {
    value = value.toString().replace('.', separator);
  }
  return value;
};
export var noop = function noop() {};
export var asyncNoop = function asyncNoop() {
  return new Deferred().resolve().promise();
};
export var grep = function grep(elements, checkFunction, invert) {
  var result = [];
  var check;
  var expectedCheck = !invert;
  for (var i = 0; i < elements.length; i++) {
    check = !!checkFunction(elements[i], i);
    if (check === expectedCheck) {
      result.push(elements[i]);
    }
  }
  return result;
};
var compareArrays = (array1, array2, depth, options) => {
  if (array1.length !== array2.length) {
    return false;
  }
  return !array1.some((item, idx) => !compareByValue(item, array2[idx], depth + 1, _extends({}, options, {
    strict: true
  })));
};
var compareObjects = (object1, object2, depth, options) => {
  var keys1 = Object.keys(object1);
  var keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  var keys2Set = new Set(keys2);
  return !keys1.some(key => !keys2Set.has(key) || !compareByValue(object1[key], object2[key], depth + 1, options));
};
var DEFAULT_EQUAL_BY_VALUE_OPTS = {
  maxDepth: 3,
  strict: true
};
var compareByValue = (value1, value2, depth, options) => {
  var {
    strict,
    maxDepth
  } = options;
  var comparable1 = toComparable(value1, true);
  var comparable2 = toComparable(value2, true);
  var comparisonResult = strict ? comparable1 === comparable2
  // eslint-disable-next-line eqeqeq
  : comparable1 == comparable2;
  switch (true) {
    case comparisonResult:
    case depth >= maxDepth:
      return true;
    case isObject(comparable1) && isObject(comparable2):
      return compareObjects(comparable1, comparable2, depth, options);
    case Array.isArray(comparable1) && Array.isArray(comparable2):
      return compareArrays(comparable1, comparable2, depth, options);
    default:
      return false;
  }
};
export var equalByValue = function equalByValue(value1, value2) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_EQUAL_BY_VALUE_OPTS;
  var compareOptions = _extends({}, DEFAULT_EQUAL_BY_VALUE_OPTS, options);
  return compareByValue(value1, value2, 0, compareOptions);
};
