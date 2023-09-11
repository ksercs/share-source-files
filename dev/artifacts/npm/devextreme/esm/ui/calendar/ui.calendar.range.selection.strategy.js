/**
* DevExtreme (esm/ui/calendar/ui.calendar.range.selection.strategy.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../core/utils/date';
import CalendarSelectionStrategy from './ui.calendar.selection.strategy';
var DAY_INTERVAL = 86400000;
class CalendarRangeSelectionStrategy extends CalendarSelectionStrategy {
  constructor(component) {
    super(component);
    this.NAME = 'RangeSelection';
  }
  getViewOptions() {
    var value = this._getValue();
    var range = this._getDaysInRange(value[0], value[1]);
    return {
      value,
      range,
      selectionMode: 'range',
      onCellHover: this._cellHoverHandler.bind(this),
      onWeekNumberClick: this._shouldHandleWeekNumberClick() ? this._weekNumberClickHandler.bind(this) : null
    };
  }
  selectValue(selectedValue, e) {
    var [startDate, endDate] = this._getValue();
    this.skipNavigate();
    this._updateCurrentDate(selectedValue);
    this._currentDateChanged = true;
    if (this.calendar.option('_allowChangeSelectionOrder') === true) {
      this.calendar._valueSelected = true;
      if (this.calendar.option('_currentSelection') === 'startDate') {
        if (this.calendar._convertToDate(selectedValue) > this.calendar._convertToDate(endDate)) {
          this.dateValue([selectedValue, null], e);
        } else {
          this.dateValue([selectedValue, endDate], e);
        }
      } else {
        if (this.calendar._convertToDate(selectedValue) >= this.calendar._convertToDate(startDate)) {
          this.dateValue([startDate, selectedValue], e);
        } else {
          this.dateValue([selectedValue, null], e);
        }
      }
    } else {
      if (!startDate || endDate) {
        this.dateValue([selectedValue, null], e);
      } else {
        this.dateValue(startDate < selectedValue ? [startDate, selectedValue] : [selectedValue, startDate], e);
      }
    }
  }
  updateAriaSelected(value, previousValue) {
    var _value, _previousValue;
    (_value = value) !== null && _value !== void 0 ? _value : value = this._getValue();
    (_previousValue = previousValue) !== null && _previousValue !== void 0 ? _previousValue : previousValue = [];
    super.updateAriaSelected(value, previousValue);
  }
  processValueChanged(value, previousValue) {
    super.processValueChanged(value, previousValue);
    var range = this._getRange();
    this._updateViewsOption('range', range);
  }
  getDefaultCurrentDate() {
    var {
      _allowChangeSelectionOrder,
      _currentSelection
    } = this.calendar.option();
    var value = this.dateOption('value');
    if (_allowChangeSelectionOrder) {
      if (_currentSelection === 'startDate' && value[0]) {
        return value[0];
      }
      if (_currentSelection === 'endDate' && value[1]) {
        return value[1];
      }
    }
    var dates = value.filter(value => value);
    return this._getLowestDateInArray(dates);
  }
  restoreValue() {
    this.calendar.option('value', [null, null]);
  }
  _getValue() {
    var value = this.dateOption('value');
    if (!value.length) {
      return value;
    }
    var [startDate, endDate] = value;
    if (startDate && endDate && startDate > endDate) {
      [startDate, endDate] = [endDate, startDate];
    }
    return [startDate, endDate];
  }
  _getRange() {
    var [startDate, endDate] = this._getValue();
    return this._getDaysInRange(startDate, endDate);
  }
  _getDaysInRange(startDate, endDate) {
    if (!startDate || !endDate) {
      return [];
    }
    var {
      currentDate,
      viewsCount
    } = this.calendar.option();
    var isAdditionalViewDate = this.calendar._isAdditionalViewDate(currentDate);
    var firstDateInViews = dateUtils.getFirstMonthDate(dateUtils.addDateInterval(currentDate, 'month', isAdditionalViewDate ? -2 : -1));
    var lastDateInViews = dateUtils.getLastMonthDate(dateUtils.addDateInterval(currentDate, 'month', isAdditionalViewDate ? 1 : viewsCount));
    var rangeStartDate = new Date(Math.max(firstDateInViews, startDate));
    var rangeEndDate = new Date(Math.min(lastDateInViews, endDate));
    return [...dateUtils.getDatesOfInterval(rangeStartDate, rangeEndDate, DAY_INTERVAL), rangeEndDate];
  }
  _cellHoverHandler(e) {
    var isMaxZoomLevel = this._isMaxZoomLevel();
    var [startDate, endDate] = this._getValue();
    var {
      _allowChangeSelectionOrder,
      _currentSelection
    } = this.calendar.option();
    if (isMaxZoomLevel) {
      var skipHoveredRange = _allowChangeSelectionOrder && _currentSelection === 'startDate';
      if (startDate && !endDate && !skipHoveredRange) {
        if (e.value > startDate) {
          this._updateViewsOption('hoveredRange', this._getDaysInRange(startDate, e.value));
          return;
        }
      } else if (!startDate && endDate && !(_allowChangeSelectionOrder && _currentSelection === 'endDate')) {
        if (e.value < endDate) {
          this._updateViewsOption('hoveredRange', this._getDaysInRange(e.value, endDate));
          return;
        }
      } else if (startDate && endDate) {
        if (_currentSelection === 'startDate' && e.value < startDate) {
          this._updateViewsOption('hoveredRange', this._getDaysInRange(e.value, startDate));
          return;
        } else if (_currentSelection === 'endDate' && e.value > endDate) {
          this._updateViewsOption('hoveredRange', this._getDaysInRange(endDate, e.value));
          return;
        }
      }
      this._updateViewsOption('hoveredRange', []);
    }
  }
  _weekNumberClickHandler(_ref) {
    var {
      rowDates,
      event
    } = _ref;
    var selectedDates = rowDates.filter(date => !this._isDateDisabled(date));
    var value = selectedDates.length ? [selectedDates[0], selectedDates[selectedDates.length - 1]] : [null, null];
    this.dateValue(value, event);
  }
}
export default CalendarRangeSelectionStrategy;
