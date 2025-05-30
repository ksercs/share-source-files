/**
* DevExtreme (renovation/component_wrapper/utils/update_props_immutable.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.updatePropsImmutable = updatePropsImmutable;
var _type = require("../../../core/utils/type");
var _data = require("../../../core/utils/data");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function cloneObjectValue(value) {
  return Array.isArray(value) ? _toConsumableArray(value) : _extends({}, value);
}
function cloneObjectProp(value, prevValue, fullNameParts) {
  var result = fullNameParts.length > 0 && prevValue && value !== prevValue ? cloneObjectValue(prevValue) : cloneObjectValue(value);
  var name = fullNameParts[0];
  if (fullNameParts.length > 1) {
    result[name] = cloneObjectProp(value[name], prevValue === null || prevValue === void 0 ? void 0 : prevValue[name], fullNameParts.slice(1));
  } else if (name) {
    if ((0, _type.isPlainObject)(value[name])) {
      result[name] = cloneObjectValue(value[name]);
    } else {
      result[name] = value[name];
    }
  }
  return result;
}
function updatePropsImmutable(props, option, name, fullName) {
  var currentPropsValue = option[name];
  var prevPropsValue = props[name];
  var result = props;
  if ((0, _type.isPlainObject)(currentPropsValue) || name !== fullName && Array.isArray(currentPropsValue)) {
    result[name] = cloneObjectProp(currentPropsValue, prevPropsValue, (0, _data.getPathParts)(fullName).slice(1));
  } else {
    result[name] = currentPropsValue;
  }
}
