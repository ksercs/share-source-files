/**
* DevExtreme (cjs/renovation/ui/scheduler/utils/filtering/remote.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _common = require("../../../../../core/utils/common");
var _extend = require("../../../../../core/utils/extend");
var _date_serialization = _interopRequireDefault(require("../../../../../core/utils/date_serialization"));
var _type = require("../../../../../core/utils/type");
var _getDatesWithoutTime3 = _interopRequireDefault(require("./getDatesWithoutTime"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var FilterPosition = {
  dateFilter: 0,
  userFilter: 1
};
var RemoteFilterCombiner = /*#__PURE__*/function () {
  function RemoteFilterCombiner(options) {
    this.options = options;
  }
  var _proto = RemoteFilterCombiner.prototype;
  _proto.makeDateFilter = function makeDateFilter(min, max) {
    var _this$dataAccessors$e = this.dataAccessors.expr,
      endDateExpr = _this$dataAccessors$e.endDateExpr,
      recurrenceRuleExpr = _this$dataAccessors$e.recurrenceRuleExpr,
      startDateExpr = _this$dataAccessors$e.startDateExpr;
    var dateFilter = [[[endDateExpr, '>=', min], [startDateExpr, '<', max]], 'or', [recurrenceRuleExpr, 'startswith', 'freq'], 'or', [[endDateExpr, min], [startDateExpr, min]]];
    if (!recurrenceRuleExpr) {
      dateFilter.splice(1, 2);
    }
    return dateFilter;
  };
  _proto.combineFilters = function combineFilters(dateFilter, userFilter) {
    var combinedFilter = [];
    dateFilter && combinedFilter.push(dateFilter);
    userFilter && combinedFilter.push(userFilter);
    return this.serializeRemoteFilter(combinedFilter);
  };
  _proto.serializeRemoteFilter = function serializeRemoteFilter(combinedFilter) {
    if (!Array.isArray(combinedFilter)) {
      return combinedFilter;
    }
    var _this$dataAccessors$e2 = this.dataAccessors.expr,
      endDateExpr = _this$dataAccessors$e2.endDateExpr,
      startDateExpr = _this$dataAccessors$e2.startDateExpr;
    var filter = (0, _extend.extend)([], combinedFilter);
    if ((0, _type.isString)(filter[0])) {
      if (this.forceIsoDateParsing && filter.length > 1) {
        if (filter[0] === startDateExpr || filter[0] === endDateExpr) {
          var lastFilterValue = filter[filter.length - 1];
          filter[filter.length - 1] = _date_serialization.default.serializeDate(new Date(lastFilterValue), this.dateSerializationFormat);
        }
      }
    }
    for (var i = 0; i < filter.length; i += 1) {
      filter[i] = this.serializeRemoteFilter(filter[i]);
    }
    return filter;
  };
  _proto.getUserFilter = function getUserFilter(dateFilter) {
    if (!this.dataSourceFilter || (0, _common.equalByValue)(this.dataSourceFilter, dateFilter)) {
      return undefined;
    }
    var containsDateFilter = this.dataSourceFilter.length > 0 && (0, _common.equalByValue)(this.dataSourceFilter[FilterPosition.dateFilter], dateFilter);
    var userFilter = containsDateFilter ? this.dataSourceFilter[FilterPosition.userFilter] : this.dataSourceFilter;
    return userFilter;
  };
  _proto.combine = function combine(min, max) {
    var _getDatesWithoutTime = (0, _getDatesWithoutTime3.default)(min, max),
      _getDatesWithoutTime2 = _slicedToArray(_getDatesWithoutTime, 2),
      trimMin = _getDatesWithoutTime2[0],
      trimMax = _getDatesWithoutTime2[1];
    var dateFilter = this.makeDateFilter(trimMin, trimMax);
    var userFilter = this.getUserFilter(dateFilter);
    var combinedFilter = this.combineFilters(dateFilter, userFilter);
    return combinedFilter;
  };
  _createClass(RemoteFilterCombiner, [{
    key: "dataAccessors",
    get: function get() {
      return this.options.dataAccessors;
    }
  }, {
    key: "dataSourceFilter",
    get: function get() {
      return this.options.dataSourceFilter;
    }
  }, {
    key: "dateSerializationFormat",
    get: function get() {
      return this.options.dateSerializationFormat;
    }
  }, {
    key: "forceIsoDateParsing",
    get: function get() {
      return (0, _type.isDefined)(this.options.forceIsoDateParsing) ? this.options.forceIsoDateParsing : true;
    }
  }]);
  return RemoteFilterCombiner;
}();
var combineRemoteFilter = function combineRemoteFilter(options) {
  return new RemoteFilterCombiner(options).combine(options.min, options.max);
};
var _default = combineRemoteFilter;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
