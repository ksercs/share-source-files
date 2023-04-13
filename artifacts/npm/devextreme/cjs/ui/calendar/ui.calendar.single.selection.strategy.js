/**
* DevExtreme (cjs/ui/calendar/ui.calendar.single.selection.strategy.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _uiCalendarSelection = _interopRequireDefault(require("./ui.calendar.selection.strategy"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var CalendarSingleSelectionStrategy = /*#__PURE__*/function (_CalendarSelectionStr) {
  _inheritsLoose(CalendarSingleSelectionStrategy, _CalendarSelectionStr);
  function CalendarSingleSelectionStrategy(component) {
    var _this;
    _this = _CalendarSelectionStr.call(this, component) || this;
    _this.NAME = 'SingleSelection';
    return _this;
  }
  var _proto = CalendarSingleSelectionStrategy.prototype;
  _proto.getViewOptions = function getViewOptions() {
    return {
      value: this.dateOption('value'),
      range: [],
      selectionMode: 'single'
    };
  };
  _proto.selectValue = function selectValue(selectedValue, e) {
    this.skipNavigate();
    this.dateValue(selectedValue, e);
  };
  _proto.updateAriaSelected = function updateAriaSelected(value, previousValue) {
    var _value, _previousValue;
    (_value = value) !== null && _value !== void 0 ? _value : value = [this.dateOption('value')];
    (_previousValue = previousValue) !== null && _previousValue !== void 0 ? _previousValue : previousValue = [];
    _CalendarSelectionStr.prototype.updateAriaSelected.call(this, value, previousValue);
  };
  _proto.getDefaultCurrentDate = function getDefaultCurrentDate() {
    return this.dateOption('value');
  };
  _proto._updateViewsValue = function _updateViewsValue(value) {
    this._updateViewsOption('value', value[0]);
  };
  return CalendarSingleSelectionStrategy;
}(_uiCalendarSelection.default);
var _default = CalendarSingleSelectionStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
