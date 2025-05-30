/**
* DevExtreme (cjs/ui/date_range_box/ui.date_range.utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.sortDatesArray = exports.monthDifference = exports.isSameDates = exports.isSameDateArrays = exports.getDeserializedDate = void 0;
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getDeserializedDate = function getDeserializedDate(value) {
  return _date_serialization.default.deserializeDate(value);
};
exports.getDeserializedDate = getDeserializedDate;
var isSameDates = function isSameDates(date1, date2) {
  if (!date1 && !date2) {
    return true;
  }
  return _date.default.sameDate(getDeserializedDate(date1), getDeserializedDate(date2));
};
exports.isSameDates = isSameDates;
var isSameDateArrays = function isSameDateArrays(value, previousValue) {
  var _value = _slicedToArray(value, 2),
    startDate = _value[0],
    endDate = _value[1];
  var _previousValue = _slicedToArray(previousValue, 2),
    previousStartDate = _previousValue[0],
    previousEndDate = _previousValue[1];
  return isSameDates(startDate, previousStartDate) && isSameDates(endDate, previousEndDate);
};
exports.isSameDateArrays = isSameDateArrays;
var sortDatesArray = function sortDatesArray(value) {
  var _value2 = _slicedToArray(value, 2),
    startDate = _value2[0],
    endDate = _value2[1];
  if (startDate && endDate && getDeserializedDate(startDate) > getDeserializedDate(endDate)) {
    return [endDate, startDate];
  } else {
    return value;
  }
};
exports.sortDatesArray = sortDatesArray;
var monthDifference = function monthDifference(date1, date2) {
  return (date2.getFullYear() - date1.getFullYear()) * 12 - date1.getMonth() + date2.getMonth();
};
exports.monthDifference = monthDifference;
