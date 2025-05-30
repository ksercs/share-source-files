/**
* DevExtreme (cjs/core/utils/type.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.type = exports.isWindow = exports.isString = exports.isRenderer = exports.isPromise = exports.isPrimitive = exports.isPlainObject = exports.isObject = exports.isNumeric = exports.isFunction = exports.isExponential = exports.isEvent = exports.isEmptyObject = exports.isDefined = exports.isDeferred = exports.isDate = exports.isBoolean = void 0;
var types = {
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object Object]': 'object',
  '[object String]': 'string'
};
var type = function type(object) {
  if (object === null) {
    return 'null';
  }
  var typeOfObject = Object.prototype.toString.call(object);
  return typeof object === 'object' ? types[typeOfObject] || 'object' : typeof object;
};
exports.type = type;
var isBoolean = function isBoolean(object) {
  return typeof object === 'boolean';
};
exports.isBoolean = isBoolean;
var isExponential = function isExponential(value) {
  return isNumeric(value) && value.toString().indexOf('e') !== -1;
};
exports.isExponential = isExponential;
var isDate = function isDate(object) {
  return type(object) === 'date';
};
exports.isDate = isDate;
var isDefined = function isDefined(object) {
  return object !== null && object !== undefined;
};
exports.isDefined = isDefined;
var isFunction = function isFunction(object) {
  return typeof object === 'function';
};
exports.isFunction = isFunction;
var isString = function isString(object) {
  return typeof object === 'string';
};
exports.isString = isString;
var isNumeric = function isNumeric(object) {
  return typeof object === 'number' && isFinite(object) || !isNaN(object - parseFloat(object));
};
exports.isNumeric = isNumeric;
var isObject = function isObject(object) {
  return type(object) === 'object';
};
exports.isObject = isObject;
var isEmptyObject = function isEmptyObject(object) {
  var property;
  for (property in object) {
    return false;
  }
  return true;
};
exports.isEmptyObject = isEmptyObject;
var isPlainObject = function isPlainObject(object) {
  if (!object || type(object) !== 'object') {
    return false;
  }
  var proto = Object.getPrototypeOf(object);
  if (!proto) {
    return true;
  }
  var ctor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof ctor === 'function' && Object.toString.call(ctor) === Object.toString.call(Object);
};
exports.isPlainObject = isPlainObject;
var isPrimitive = function isPrimitive(value) {
  return ['object', 'array', 'function'].indexOf(type(value)) === -1;
};
exports.isPrimitive = isPrimitive;
var isWindow = function isWindow(object) {
  return object != null && object === object.window;
};
exports.isWindow = isWindow;
var isRenderer = function isRenderer(object) {
  return !!object && !!(object.jquery || object.dxRenderer);
};
exports.isRenderer = isRenderer;
var isPromise = function isPromise(object) {
  return !!object && isFunction(object.then);
};
exports.isPromise = isPromise;
var isDeferred = function isDeferred(object) {
  return !!object && isFunction(object.done) && isFunction(object.fail);
};
exports.isDeferred = isDeferred;
var isEvent = function isEvent(object) {
  return !!(object && object.preventDefault);
};
exports.isEvent = isEvent;
