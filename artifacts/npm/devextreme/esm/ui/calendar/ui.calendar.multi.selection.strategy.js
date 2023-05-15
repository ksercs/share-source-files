/**
* DevExtreme (esm/ui/calendar/ui.calendar.multi.selection.strategy.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import CalendarSelectionStrategy from './ui.calendar.selection.strategy';
class CalendarMultiSelectionStrategy extends CalendarSelectionStrategy {
  constructor(component) {
    super(component);
    this.NAME = 'MultiSelection';
  }
  getViewOptions() {
    return {
      value: this.dateOption('values'),
      range: [],
      selectionMode: 'multi'
    };
  }
  selectValue(selectedValue, e) {
    var values = [...this.dateOption('values')];
    var alreadySelectedIndex = values.findIndex(date => (date === null || date === void 0 ? void 0 : date.toDateString()) === selectedValue.toDateString());
    if (alreadySelectedIndex > -1) {
      values.splice(alreadySelectedIndex, 1);
    } else {
      values.push(selectedValue);
    }
    this.skipNavigate();
    this._updateCurrentDate(selectedValue);
    this._currentDateChanged = true;
    this.dateValue(values, e);
  }
  updateAriaSelected(value, previousValue) {
    var _value, _previousValue;
    (_value = value) !== null && _value !== void 0 ? _value : value = this.dateOption('values');
    (_previousValue = previousValue) !== null && _previousValue !== void 0 ? _previousValue : previousValue = [];
    super.updateAriaSelected(value, previousValue);
  }
  getDefaultCurrentDate() {
    var dates = this.dateOption('values').filter(value => value);
    return this._getLowestDateInArray(dates);
  }
}
export default CalendarMultiSelectionStrategy;
