/**
* DevExtreme (cjs/core/utils/common.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.splitPair = exports.pairToObject = exports.normalizeKey = exports.noop = exports.grep = exports.getKeyHash = exports.findBestMatches = exports.executeAsync = exports.escapeRegExp = exports.equalByValue = exports.ensureDefined = exports.denormalizeKey = exports.deferUpdater = exports.deferUpdate = exports.deferRenderer = exports.deferRender = exports.asyncNoop = exports.applyServerDecimalSeparator = void 0;
var _config = _interopRequireDefault(require("../config"));
var _guid = _interopRequireDefault(require("../guid"));
var _deferred = require("../utils/deferred");
var _data = require("./data");
var _iterator = require("./iterator");
var _type = require("./type");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ensureDefined = function ensureDefined(value, defaultValue) {
  return (0, _type.isDefined)(value) ? value : defaultValue;
};
exports.ensureDefined = ensureDefined;
var executeAsync = function executeAsync(action, context /* , internal */) {
  var deferred = new _deferred.Deferred();
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
    if (result && result.done && (0, _type.isFunction)(result.done)) {
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
exports.executeAsync = executeAsync;
var delayedFuncs = [];
var delayedNames = [];
var delayedDeferreds = [];
var executingName;
var deferExecute = function deferExecute(name, func, deferred) {
  if (executingName && executingName !== name) {
    delayedFuncs.push(func);
    delayedNames.push(name);
    deferred = deferred || new _deferred.Deferred();
    delayedDeferreds.push(deferred);
    return deferred;
  } else {
    var oldExecutingName = executingName;
    var currentDelayedCount = delayedDeferreds.length;
    executingName = name;
    var result = func();
    if (!result) {
      if (delayedDeferreds.length > currentDelayedCount) {
        result = _deferred.when.apply(this, delayedDeferreds.slice(currentDelayedCount));
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
    return result || (0, _deferred.when)();
  }
};
var deferRender = function deferRender(func, deferred) {
  return deferExecute('render', func, deferred);
};
exports.deferRender = deferRender;
var deferUpdate = function deferUpdate(func, deferred) {
  return deferExecute('update', func, deferred);
};
exports.deferUpdate = deferUpdate;
var deferRenderer = function deferRenderer(func) {
  return function () {
    var that = this;
    return deferExecute('render', function () {
      return func.call(that);
    });
  };
};
exports.deferRenderer = deferRenderer;
var deferUpdater = function deferUpdater(func) {
  return function () {
    var that = this;
    return deferExecute('update', function () {
      return func.call(that);
    });
  };
};
exports.deferUpdater = deferUpdater;
var findBestMatches = function findBestMatches(targetFilter, items, mapFn) {
  var bestMatches = [];
  var maxMatchCount = 0;
  (0, _iterator.each)(items, function (index, itemSrc) {
    var matchCount = 0;
    var item = mapFn ? mapFn(itemSrc) : itemSrc;
    (0, _iterator.each)(targetFilter, function (paramName, targetValue) {
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
exports.findBestMatches = findBestMatches;
var match = function match(value, targetValue) {
  if (Array.isArray(value) && Array.isArray(targetValue)) {
    var mismatch = false;
    (0, _iterator.each)(value, function (index, valueItem) {
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
var splitPair = function splitPair(raw) {
  var _raw$x, _raw$y;
  switch ((0, _type.type)(raw)) {
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
exports.splitPair = splitPair;
var normalizeKey = function normalizeKey(id) {
  var key = (0, _type.isString)(id) ? id : id.toString();
  var arr = key.match(/[^a-zA-Z0-9_]/g);
  arr && (0, _iterator.each)(arr, function (_, sign) {
    key = key.replace(sign, '__' + sign.charCodeAt() + '__');
  });
  return key;
};
exports.normalizeKey = normalizeKey;
var denormalizeKey = function denormalizeKey(key) {
  var arr = key.match(/__\d+__/g);
  arr && arr.forEach(function (char) {
    var charCode = parseInt(char.replace('__', ''));
    key = key.replace(char, String.fromCharCode(charCode));
  });
  return key;
};
exports.denormalizeKey = denormalizeKey;
var pairToObject = function pairToObject(raw, preventRound) {
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
    h: h,
    v: v
  };
};
exports.pairToObject = pairToObject;
var getKeyHash = function getKeyHash(key) {
  if (key instanceof _guid.default) {
    return key.toString();
  } else if ((0, _type.isObject)(key) || Array.isArray(key)) {
    try {
      var keyHash = JSON.stringify(key);
      return keyHash === '{}' ? key : keyHash;
    } catch (e) {
      return key;
    }
  }
  return key;
};
exports.getKeyHash = getKeyHash;
var escapeRegExp = function escapeRegExp(string) {
  return string.replace(/[[\]{}\-()*+?.\\^$|\s]/g, '\\$&');
};
exports.escapeRegExp = escapeRegExp;
var applyServerDecimalSeparator = function applyServerDecimalSeparator(value) {
  var separator = (0, _config.default)().serverDecimalSeparator;
  if ((0, _type.isDefined)(value)) {
    value = value.toString().replace('.', separator);
  }
  return value;
};
exports.applyServerDecimalSeparator = applyServerDecimalSeparator;
var noop = function noop() {};
exports.noop = noop;
var asyncNoop = function asyncNoop() {
  return new _deferred.Deferred().resolve().promise();
};
exports.asyncNoop = asyncNoop;
var grep = function grep(elements, checkFunction, invert) {
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
exports.grep = grep;
var arraysEqualByValue = function arraysEqualByValue(array1, array2, depth) {
  if (array1.length !== array2.length) {
    return false;
  }
  for (var i = 0; i < array1.length; i++) {
    if (!equalByValue(array1[i], array2[i], depth + 1)) {
      return false;
    }
  }
  return true;
};
var objectsEqualByValue = function objectsEqualByValue(object1, object2, depth, strict) {
  for (var propertyName in object1) {
    if (Object.prototype.hasOwnProperty.call(object1, propertyName) && !equalByValue(object1[propertyName], object2[propertyName], depth + 1, strict)) {
      return false;
    }
  }
  for (var _propertyName in object2) {
    if (!(_propertyName in object1)) {
      return false;
    }
  }
  return true;
};
var maxEqualityDepth = 3;
var equalByValue = function equalByValue(object1, object2) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var strict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  object1 = (0, _data.toComparable)(object1, true);
  object2 = (0, _data.toComparable)(object2, true);

  // eslint-disable-next-line eqeqeq
  var comparisonResult = strict ? object1 === object2 : object1 == object2;
  if (comparisonResult || depth >= maxEqualityDepth) {
    return true;
  }
  if ((0, _type.isObject)(object1) && (0, _type.isObject)(object2)) {
    return objectsEqualByValue(object1, object2, depth, strict);
  } else if (Array.isArray(object1) && Array.isArray(object2)) {
    return arraysEqualByValue(object1, object2, depth);
  }
  return false;
};
exports.equalByValue = equalByValue;
