/**
* DevExtreme (cjs/renovation/ui/scheduler/common.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.isViewDataProviderConfigValid = exports.createDataAccessors = void 0;
var _m_utils = require("../../../__internal/scheduler/m_utils");
var _m_utils2 = require("../../../__internal/scheduler/resources/m_utils");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var createDataAccessors = function createDataAccessors(dataAccessorsProps) {
  var forceIsoDateParsing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var dataAccessors = _m_utils.utils.dataAccessors.create({
    startDate: dataAccessorsProps.startDateExpr,
    endDate: dataAccessorsProps.endDateExpr,
    startDateTimeZone: dataAccessorsProps.startDateTimeZoneExpr,
    endDateTimeZone: dataAccessorsProps.endDateTimeZoneExpr,
    allDay: dataAccessorsProps.allDayExpr,
    text: dataAccessorsProps.textExpr,
    description: dataAccessorsProps.descriptionExpr,
    recurrenceRule: dataAccessorsProps.recurrenceRuleExpr,
    recurrenceException: dataAccessorsProps.recurrenceExceptionExpr
  }, null, forceIsoDateParsing, dataAccessorsProps.dateSerializationFormat);
  dataAccessors.resources = (0, _m_utils2.createExpressions)(dataAccessorsProps.resources);
  return dataAccessors;
};
exports.createDataAccessors = createDataAccessors;
var isViewDataProviderConfigValid = function isViewDataProviderConfigValid(viewDataProviderConfig, currentViewOptions) {
  if (!viewDataProviderConfig) {
    return false;
  }
  var result = true;
  Object.entries(viewDataProviderConfig).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    if (value !== currentViewOptions[key]) {
      result = false;
    }
  });
  return result;
};
exports.isViewDataProviderConfigValid = isViewDataProviderConfigValid;
