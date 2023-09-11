/**
* DevExtreme (cjs/common/data/custom-store.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.isGroupItemsArray = isGroupItemsArray;
exports.isItemsArray = isItemsArray;
exports.isLoadResultObject = isLoadResultObject;
function isGroupItem(item) {
  if (item === undefined || item === null || typeof item !== 'object') {
    return false;
  }
  return 'key' in item && 'items' in item;
}
function isLoadResultObject(res) {
  return !Array.isArray(res) && 'data' in res;
}
function isGroupItemsArray(res) {
  return Array.isArray(res) && !!res.length && isGroupItem(res[0]);
}
function isItemsArray(res) {
  return Array.isArray(res) && !isGroupItem(res[0]);
}
