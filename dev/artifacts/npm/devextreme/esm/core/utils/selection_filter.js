/**
* DevExtreme (esm/core/utils/selection_filter.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getKeyHash, equalByValue } from './common';
import { isString, isObject } from './type';
export var SelectionFilterCreator = function SelectionFilterCreator(selectedItemKeys, isSelectAll) {
  this.getLocalFilter = function (keyGetter, equalKeys, equalByReference, keyExpr) {
    equalKeys = equalKeys === undefined ? equalByValue : equalKeys;
    return functionFilter.bind(this, equalKeys, keyGetter, equalByReference, keyExpr);
  };
  this.getExpr = function (keyExpr) {
    if (!keyExpr) {
      return;
    }
    var filterExpr;
    selectedItemKeys.forEach(function (key, index) {
      filterExpr = filterExpr || [];
      var filterExprPart;
      if (index > 0) {
        filterExpr.push(isSelectAll ? 'and' : 'or');
      }
      if (isString(keyExpr)) {
        filterExprPart = getFilterForPlainKey(keyExpr, key);
      } else {
        filterExprPart = getFilterForCompositeKey(keyExpr, key);
      }
      filterExpr.push(filterExprPart);
    });
    if (filterExpr && filterExpr.length === 1) {
      filterExpr = filterExpr[0];
    }
    return filterExpr;
  };
  this.getCombinedFilter = function (keyExpr, dataSourceFilter) {
    var forceCombinedFilter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var filterExpr = this.getExpr(keyExpr);
    var combinedFilter = filterExpr;
    if ((forceCombinedFilter || isSelectAll) && dataSourceFilter) {
      if (filterExpr) {
        combinedFilter = [];
        combinedFilter.push(filterExpr);
        combinedFilter.push(dataSourceFilter);
      } else {
        combinedFilter = dataSourceFilter;
      }
    }
    return combinedFilter;
  };
  var selectedItemKeyHashesMap;
  var getSelectedItemKeyHashesMap = function getSelectedItemKeyHashesMap(keyOf, keyExpr) {
    if (!selectedItemKeyHashesMap) {
      selectedItemKeyHashesMap = {};
      var normalizedKeys = normalizeKeys(selectedItemKeys, keyOf, keyExpr);
      for (var i = 0; i < normalizedKeys.length; i++) {
        selectedItemKeyHashesMap[getKeyHash(normalizedKeys[i])] = true;
      }
    }
    return selectedItemKeyHashesMap;
  };
  var normalizeKeys = function normalizeKeys(keys, keyOf, keyExpr) {
    return Array.isArray(keyExpr) ? keys.map(key => keyOf(key)) : keys;
  };
  function functionFilter(equalKeys, keyOf, equalByReference, keyExpr, item) {
    var key = keyOf(item);
    var keyHash;
    var i;
    if (!equalByReference) {
      keyHash = getKeyHash(key);
      if (!isObject(keyHash)) {
        var selectedKeyHashesMap = getSelectedItemKeyHashesMap(keyOf, keyExpr);
        if (selectedKeyHashesMap[keyHash]) {
          return !isSelectAll;
        }
        return !!isSelectAll;
      }
    }
    for (i = 0; i < selectedItemKeys.length; i++) {
      if (equalKeys(selectedItemKeys[i], key)) {
        return !isSelectAll;
      }
    }
    return !!isSelectAll;
  }
  function getFilterForPlainKey(keyExpr, keyValue) {
    if (keyValue === undefined) {
      return;
    }
    return [keyExpr, isSelectAll ? '<>' : '=', keyValue];
  }
  function getFilterForCompositeKey(keyExpr, itemKeyValue) {
    var filterExpr = [];
    for (var i = 0, length = keyExpr.length; i < length; i++) {
      var currentKeyExpr = keyExpr[i];
      var currentKeyValue = itemKeyValue && itemKeyValue[currentKeyExpr];
      var filterExprPart = getFilterForPlainKey(currentKeyExpr, currentKeyValue);
      if (!filterExprPart) {
        break;
      }
      if (i > 0) {
        filterExpr.push(isSelectAll ? 'or' : 'and');
      }
      filterExpr.push(filterExprPart);
    }
    return filterExpr;
  }
};
