/**
* DevExtreme (esm/ui/calendar/ui.calendar.selection.strategy.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../core/utils/type';
import dateUtils from '../../core/utils/date';
class CalendarSelectionStrategy {
  constructor(component) {
    this.calendar = component;
  }
  dateOption(optionName) {
    return this.calendar._dateOption(optionName);
  }
  dateValue(value, e) {
    this.calendar._dateValue(value, e);
  }
  skipNavigate() {
    this.calendar._skipNavigate = true;
  }
  updateAriaSelected(value, previousValue) {
    this.calendar._updateAriaSelected(value, previousValue);
    if (value[0] && this.calendar.option('currentDate').getTime() === value[0].getTime()) {
      this.calendar._updateAriaId(value[0]);
    }
  }
  processValueChanged(value, previousValue) {
    var _value, _previousValue;
    if (isDefined(value) && !Array.isArray(value)) {
      value = [value];
    }
    if (isDefined(previousValue) && !Array.isArray(previousValue)) {
      previousValue = [previousValue];
    }
    value = ((_value = value) === null || _value === void 0 ? void 0 : _value.map(item => this._convertToDate(item))) || [];
    previousValue = ((_previousValue = previousValue) === null || _previousValue === void 0 ? void 0 : _previousValue.map(item => this._convertToDate(item))) || [];
    this._updateViewsValue(value);
    this.updateAriaSelected(value, previousValue);
    if (!this._currentDateChanged) {
      this.calendar._initCurrentDate();
    }
    this._currentDateChanged = false;
  }
  _isDateDisabled(date) {
    var min = this.calendar._dateOption('min');
    var max = this.calendar._dateOption('max');
    var isLessThanMin = isDefined(min) && date < min && !dateUtils.sameDate(min, date);
    var isBiggerThanMax = isDefined(max) && date > max && !dateUtils.sameDate(max, date);
    return this.calendar._view.isDateDisabled(date) || isLessThanMin || isBiggerThanMax;
  }
  _getLowestDateInArray(dates) {
    if (dates.length) {
      return new Date(Math.min(...dates));
    }
  }
  _convertToDate(value) {
    return this.calendar._convertToDate(value);
  }
  _isMaxZoomLevel() {
    return this.calendar._isMaxZoomLevel();
  }
  _updateViewsOption(optionName, optionValue) {
    this.calendar._updateViewsOption(optionName, optionValue);
  }
  _updateViewsValue(value) {
    this._updateViewsOption('value', value);
  }
  _updateCurrentDate(value) {
    this.calendar.option('currentDate', value !== null && value !== void 0 ? value : new Date());
  }
  _shouldHandleWeekNumberClick() {
    var {
      selectionMode,
      selectWeekOnClick
    } = this.calendar.option();
    return selectWeekOnClick && selectionMode !== 'single';
  }
}
export default CalendarSelectionStrategy;
