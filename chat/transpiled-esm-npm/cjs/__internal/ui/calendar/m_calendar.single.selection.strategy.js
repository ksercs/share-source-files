"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _m_calendarSelection = _interopRequireDefault(require("./m_calendar.selection.strategy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CalendarSingleSelectionStrategy extends _m_calendarSelection.default {
  constructor(component) {
    super(component);
    this.NAME = 'SingleSelection';
  }
  getViewOptions() {
    return {
      value: this.dateOption('value'),
      range: [],
      selectionMode: 'single'
    };
  }
  selectValue(selectedValue, e) {
    this.skipNavigate();
    this.dateValue(selectedValue, e);
  }
  updateAriaSelected(value, previousValue) {
    value ?? (value = [this.dateOption('value')]);
    previousValue ?? (previousValue = []);
    super.updateAriaSelected(value, previousValue);
  }
  getDefaultCurrentDate() {
    const date = this.dateOption('value');
    if (date === '') {
      return new Date();
    }
    return date;
  }
  restoreValue() {
    this.calendar.option('value', null);
  }
  _updateViewsValue(value) {
    this._updateViewsOption('value', value[0]);
  }
}
var _default = exports.default = CalendarSingleSelectionStrategy;