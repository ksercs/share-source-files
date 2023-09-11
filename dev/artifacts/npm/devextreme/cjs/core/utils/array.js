/**
* DevExtreme (cjs/core/utils/array.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.wrapToArray = exports.removeDuplicates = exports.normalizeIndexes = exports.groupBy = exports.getUniqueValues = exports.getIntersection = void 0;
var _type = require("./type");
var _object = require("./object");
var _config2 = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createOccurrenceMap(array) {
  return array.reduce(function (map, value) {
    var _map$get;
    var count = ((_map$get = map.get(value)) !== null && _map$get !== void 0 ? _map$get : 0) + 1;
    map.set(value, count);
    return map;
  }, new Map());
}
var wrapToArray = function wrapToArray(item) {
  return Array.isArray(item) ? item : [item];
};
exports.wrapToArray = wrapToArray;
var getUniqueValues = function getUniqueValues(values) {
  return _toConsumableArray(new Set(values));
};
exports.getUniqueValues = getUniqueValues;
var getIntersection = function getIntersection(firstArray, secondArray) {
  var toRemoveMap = createOccurrenceMap(secondArray);
  return firstArray.filter(function (value) {
    var occurrencesCount = toRemoveMap.get(value);
    occurrencesCount && toRemoveMap.set(value, occurrencesCount - 1);
    return occurrencesCount;
  });
};
exports.getIntersection = getIntersection;
var removeDuplicates = function removeDuplicates() {
  var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var toRemove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var toRemoveMap = createOccurrenceMap(toRemove);
  return from.filter(function (value) {
    var occurrencesCount = toRemoveMap.get(value);
    occurrencesCount && toRemoveMap.set(value, occurrencesCount - 1);
    return !occurrencesCount;
  });
};
exports.removeDuplicates = removeDuplicates;
var normalizeIndexes = function normalizeIndexes(items, indexPropName, currentItem, needIndexCallback) {
  var indexedItems = {};
  var _config = (0, _config2.default)(),
    useLegacyVisibleIndex = _config.useLegacyVisibleIndex;
  var currentIndex = 0;
  var shouldUpdateIndex = function shouldUpdateIndex(item) {
    return !(0, _type.isDefined)(item[indexPropName]) && (!needIndexCallback || needIndexCallback(item));
  };
  items.forEach(function (item) {
    var index = item[indexPropName];
    if (index >= 0) {
      indexedItems[index] = indexedItems[index] || [];
      if (item === currentItem) {
        indexedItems[index].unshift(item);
      } else {
        indexedItems[index].push(item);
      }
    } else {
      item[indexPropName] = undefined;
    }
  });
  if (!useLegacyVisibleIndex) {
    items.forEach(function (item) {
      if (shouldUpdateIndex(item)) {
        while (indexedItems[currentIndex]) {
          currentIndex++;
        }
        indexedItems[currentIndex] = [item];
        currentIndex++;
      }
    });
  }
  currentIndex = 0;
  (0, _object.orderEach)(indexedItems, function (index, items) {
    items.forEach(function (item) {
      if (index >= 0) {
        item[indexPropName] = currentIndex++;
      }
    });
  });
  if (useLegacyVisibleIndex) {
    items.forEach(function (item) {
      if (shouldUpdateIndex(item)) {
        item[indexPropName] = currentIndex++;
      }
    });
  }
};
exports.normalizeIndexes = normalizeIndexes;
var groupBy = function groupBy(array, getGroupName) {
  return array.reduce(function (groupedResult, item) {
    var _groupedResult$groupN;
    var groupName = getGroupName(item);
    groupedResult[groupName] = (_groupedResult$groupN = groupedResult[groupName]) !== null && _groupedResult$groupN !== void 0 ? _groupedResult$groupN : [];
    groupedResult[groupName].push(item);
    return groupedResult;
  }, {});
};
exports.groupBy = groupBy;
