"use strict";

exports.default = void 0;
var _type = require("../../core/utils/type");
var _date = _interopRequireDefault(require("../../core/utils/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    if ((0, _type.isDefined)(value) && !Array.isArray(value)) {
      value = [value];
    }
    if ((0, _type.isDefined)(previousValue) && !Array.isArray(previousValue)) {
      previousValue = [previousValue];
    }
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
  _proto._isDateDisabled = function _isDateDisabled(date) {
    var min = this.calendar._dateOption('min');
    var max = this.calendar._dateOption('max');
    var isLessThanMin = (0, _type.isDefined)(min) && date < min && !_date.default.sameDate(min, date);
    var isBiggerThanMax = (0, _type.isDefined)(max) && date > max && !_date.default.sameDate(max, date);
    return this.calendar._view.isDateDisabled(date) || isLessThanMin || isBiggerThanMax;
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
  _proto._shouldHandleWeekNumberClick = function _shouldHandleWeekNumberClick() {
    var _this$calendar$option = this.calendar.option(),
      selectionMode = _this$calendar$option.selectionMode,
      selectWeekOnClick = _this$calendar$option.selectWeekOnClick;
    return selectWeekOnClick && selectionMode !== 'single';
  };
  return CalendarSelectionStrategy;
}();
var _default = CalendarSelectionStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;