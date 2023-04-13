/**
* DevExtreme (cjs/ui/calendar/ui.calendar.range.selection.strategy.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _uiCalendarSelection = _interopRequireDefault(require("./ui.calendar.selection.strategy"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var DAY_INTERVAL = 86400000;
var RANGE_OFFSET = DAY_INTERVAL * 120;
var CalendarRangeSelectionStrategy = /*#__PURE__*/function (_CalendarSelectionStr) {
  _inheritsLoose(CalendarRangeSelectionStrategy, _CalendarSelectionStr);
  function CalendarRangeSelectionStrategy(component) {
    var _this;
    _this = _CalendarSelectionStr.call(this, component) || this;
    _this.NAME = 'RangeSelection';
    return _this;
  }
  var _proto = CalendarRangeSelectionStrategy.prototype;
  _proto.getViewOptions = function getViewOptions() {
    var value = this._getValues();
    var range = this._getDaysInRange(value[0], value[1]);
    return {
      value: value,
      range: range,
      selectionMode: 'range',
      onCellHover: this._cellHoverHandler.bind(this)
    };
  };
  _proto.selectValue = function selectValue(selectedValue, e) {
    var _this$_getValues = this._getValues(),
      _this$_getValues2 = _slicedToArray(_this$_getValues, 2),
      startDate = _this$_getValues2[0],
      endDate = _this$_getValues2[1];
    this.skipNavigate();
    this._updateCurrentDate(selectedValue);
    this._currentDateChanged = true;
    if (!startDate || endDate) {
      this.dateValue([selectedValue, null], e);
    } else {
      this.dateValue(startDate < selectedValue ? [startDate, selectedValue] : [selectedValue, startDate], e);
    }
  };
  _proto.updateAriaSelected = function updateAriaSelected(value, previousValue) {
    var _value, _previousValue;
    (_value = value) !== null && _value !== void 0 ? _value : value = this._getValues();
    (_previousValue = previousValue) !== null && _previousValue !== void 0 ? _previousValue : previousValue = [];
    _CalendarSelectionStr.prototype.updateAriaSelected.call(this, value, previousValue);
  };
  _proto.processValueChanged = function processValueChanged(value, previousValue) {
    _CalendarSelectionStr.prototype.processValueChanged.call(this, value, previousValue);
    var range = this._getRange();
    this._updateViewsOption('range', range);
  };
  _proto.getDefaultCurrentDate = function getDefaultCurrentDate() {
    var dates = this.dateOption('values').filter(function (value) {
      return value;
    });
    return this._getLowestDateInArray(dates);
  };
  _proto._getValues = function _getValues() {
    var values = this.dateOption('values');
    if (!values.length) {
      return values;
    }
    var _values = _slicedToArray(values, 2),
      startDate = _values[0],
      endDate = _values[1];
    if (startDate && endDate && startDate > endDate) {
      var _ref = [endDate, startDate];
      startDate = _ref[0];
      endDate = _ref[1];
    }
    return [startDate, endDate];
  };
  _proto._getRange = function _getRange() {
    var _this$_getValues3 = this._getValues(),
      _this$_getValues4 = _slicedToArray(_this$_getValues3, 2),
      startDate = _this$_getValues4[0],
      endDate = _this$_getValues4[1];
    return this._getDaysInRange(startDate, endDate);
  };
  _proto._getDaysInRange = function _getDaysInRange(startDate, endDate) {
    if (!startDate || !endDate) {
      return [];
    }

    // TODO: Rework this range reducing algorithm to support different multi views
    // and optimise single views.
    var currentDate = this.calendar.option('currentDate').getTime();
    var rangeStartDate = new Date(Math.max(currentDate - RANGE_OFFSET, startDate));
    var rangeEndDate = new Date(Math.min(currentDate + RANGE_OFFSET, endDate));
    return [].concat(_toConsumableArray(_date.default.getDatesOfInterval(rangeStartDate, rangeEndDate, DAY_INTERVAL)), [rangeEndDate]);
  };
  _proto._cellHoverHandler = function _cellHoverHandler(e) {
    var isMaxZoomLevel = this._isMaxZoomLevel();
    var _this$_getValues5 = this._getValues(),
      _this$_getValues6 = _slicedToArray(_this$_getValues5, 2),
      startDate = _this$_getValues6[0],
      endDate = _this$_getValues6[1];
    if (isMaxZoomLevel && startDate && !endDate) {
      this._updateViewsOption('range', this._getDaysInRange(startDate, e.value));
    }
  };
  return CalendarRangeSelectionStrategy;
}(_uiCalendarSelection.default);
var _default = CalendarRangeSelectionStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
