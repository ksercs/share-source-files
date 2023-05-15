/**
* DevExtreme (cjs/ui/calendar/ui.calendar.selection.strategy.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var CalendarSelectionStrategy = /*#__PURE__*/function () {
  function CalendarSelectionStrategy(component) {
    this.calendar = component;
  }
  var _proto = CalendarSelectionStrategy.prototype;
  _proto.dateOption = function dateOption(optionName) {
    return this.calendar._dateOption(optionName);
  };
  _proto.dateValue = function dateValue(value, e) {
    this.calendar._dateValue(value, e);
  };
  _proto.skipNavigate = function skipNavigate() {
    this.calendar._skipNavigate = true;
  };
  _proto.updateAriaSelected = function updateAriaSelected(value, previousValue) {
    this.calendar._updateAriaSelected(value, previousValue);
    if (value[0] && this.calendar.option('currentDate').getTime() === value[0].getTime()) {
      this.calendar._updateAriaId(value[0]);
    }
  };
  _proto.processValueChanged = function processValueChanged(value, previousValue) {
    var _value,
      _this = this,
      _previousValue;
    value = ((_value = value) === null || _value === void 0 ? void 0 : _value.map(function (item) {
      return _this._convertToDate(item);
    })) || [];
    previousValue = ((_previousValue = previousValue) === null || _previousValue === void 0 ? void 0 : _previousValue.map(function (item) {
      return _this._convertToDate(item);
    })) || [];
    this._updateViewsValue(value);
    this.updateAriaSelected(value, previousValue);
    if (!this._currentDateChanged) {
      this.calendar._initCurrentDate();
    }
    this._currentDateChanged = false;
  };
  _proto._getLowestDateInArray = function _getLowestDateInArray(dates) {
    if (dates.length) {
      return new Date(Math.min.apply(Math, _toConsumableArray(dates)));
    }
  };
  _proto._convertToDate = function _convertToDate(value) {
    return this.calendar._convertToDate(value);
  };
  _proto._isMaxZoomLevel = function _isMaxZoomLevel() {
    return this.calendar._isMaxZoomLevel();
  };
  _proto._updateViewsOption = function _updateViewsOption(optionName, optionValue) {
    this.calendar._updateViewsOption(optionName, optionValue);
  };
  _proto._updateViewsValue = function _updateViewsValue(value) {
    this._updateViewsOption('value', value);
  };
  _proto._updateCurrentDate = function _updateCurrentDate(value) {
    this.calendar.option('currentDate', value !== null && value !== void 0 ? value : new Date());
  };
  return CalendarSelectionStrategy;
}();
var _default = CalendarSelectionStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
