"use strict";

exports.default = void 0;
var _uiCalendarSelection = _interopRequireDefault(require("./ui.calendar.selection.strategy"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var CalendarMultiSelectionStrategy = /*#__PURE__*/function (_CalendarSelectionStr) {
  _inheritsLoose(CalendarMultiSelectionStrategy, _CalendarSelectionStr);
  function CalendarMultiSelectionStrategy(component) {
    var _this;
    _this = _CalendarSelectionStr.call(this, component) || this;
    _this.NAME = 'MultiSelection';
    return _this;
  }
  var _proto = CalendarMultiSelectionStrategy.prototype;
  _proto.getViewOptions = function getViewOptions() {
    return {
      value: this.dateOption('value'),
      range: [],
      selectionMode: 'multi',
      onWeekNumberClick: this._shouldHandleWeekNumberClick() ? this._weekNumberClickHandler.bind(this) : null
    };
  };
  _proto.selectValue = function selectValue(selectedValue, e) {
    var value = _toConsumableArray(this.dateOption('value'));
    var alreadySelectedIndex = value.findIndex(function (date) {
      return (date === null || date === void 0 ? void 0 : date.toDateString()) === selectedValue.toDateString();
    });
    if (alreadySelectedIndex > -1) {
      value.splice(alreadySelectedIndex, 1);
    } else {
      value.push(selectedValue);
    }
    this.skipNavigate();
    this._updateCurrentDate(selectedValue);
    this._currentDateChanged = true;
    this.dateValue(value, e);
  };
  _proto.updateAriaSelected = function updateAriaSelected(value, previousValue) {
    var _value, _previousValue;
    (_value = value) !== null && _value !== void 0 ? _value : value = this.dateOption('value');
    (_previousValue = previousValue) !== null && _previousValue !== void 0 ? _previousValue : previousValue = [];
    _CalendarSelectionStr.prototype.updateAriaSelected.call(this, value, previousValue);
  };
  _proto.getDefaultCurrentDate = function getDefaultCurrentDate() {
    var dates = this.dateOption('value').filter(function (value) {
      return value;
    });
    return this._getLowestDateInArray(dates);
  };
  _proto.restoreValue = function restoreValue() {
    this.calendar.option('value', []);
  };
  _proto._weekNumberClickHandler = function _weekNumberClickHandler(_ref) {
    var _this2 = this;
    var rowDates = _ref.rowDates,
      event = _ref.event;
    var selectedDates = rowDates.filter(function (date) {
      return !_this2._isDateDisabled(date);
    });
    this.dateValue(selectedDates, event);
  };
  return CalendarMultiSelectionStrategy;
}(_uiCalendarSelection.default);
var _default = CalendarMultiSelectionStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;