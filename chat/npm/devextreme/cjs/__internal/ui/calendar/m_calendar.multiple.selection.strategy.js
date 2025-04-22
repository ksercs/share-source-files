/**
* DevExtreme (cjs/__internal/ui/calendar/m_calendar.multiple.selection.strategy.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _m_calendarSelection = _interopRequireDefault(require("./m_calendar.selection.strategy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CalendarMultiSelectionStrategy extends _m_calendarSelection.default {
  constructor(component) {
    super(component);
    this.NAME = 'MultiSelection';
  }
  getViewOptions() {
    return {
      value: this.dateOption('value'),
      range: [],
      selectionMode: 'multiple',
      onWeekNumberClick: this._shouldHandleWeekNumberClick() ? this._weekNumberClickHandler.bind(this) : null
    };
  }
  selectValue(selectedValue, e) {
    const value = [...this.dateOption('value')];
    const alreadySelectedIndex = value.findIndex(date => (date === null || date === void 0 ? void 0 : date.toDateString()) === selectedValue.toDateString());
    if (alreadySelectedIndex > -1) {
      value.splice(alreadySelectedIndex, 1);
    } else {
      value.push(selectedValue);
    }
    this.skipNavigate();
    this._updateCurrentDate(selectedValue);
    this._currentDateChanged = true;
    this.dateValue(value, e);
  }
  updateAriaSelected(value, previousValue) {
    value ?? (value = this.dateOption('value'));
    previousValue ?? (previousValue = []);
    super.updateAriaSelected(value, previousValue);
  }
  getDefaultCurrentDate() {
    const dates = this.dateOption('value').filter(Boolean);
    return this._getLowestDateInArray(dates);
  }
  restoreValue() {
    this.calendar.option('value', []);
  }
  _weekNumberClickHandler(_ref) {
    let {
      rowDates,
      event
    } = _ref;
    const selectedDates = rowDates.filter(date => !this._isDateDisabled(date));
    this.dateValue(selectedDates, event);
  }
}
var _default = exports.default = CalendarMultiSelectionStrategy;
