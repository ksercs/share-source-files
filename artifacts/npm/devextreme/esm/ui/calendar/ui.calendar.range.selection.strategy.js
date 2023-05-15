/**
* DevExtreme (esm/ui/calendar/ui.calendar.range.selection.strategy.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../core/utils/date';
import CalendarSelectionStrategy from './ui.calendar.selection.strategy';
var DAY_INTERVAL = 86400000;
var RANGE_OFFSET = DAY_INTERVAL * 120;
class CalendarRangeSelectionStrategy extends CalendarSelectionStrategy {
  constructor(component) {
    super(component);
    this.NAME = 'RangeSelection';
  }
  getViewOptions() {
    var value = this._getValues();
    var range = this._getDaysInRange(value[0], value[1]);
    return {
      value,
      range,
      selectionMode: 'range',
      onCellHover: this._cellHoverHandler.bind(this)
    };
  }
  selectValue(selectedValue, e) {
    var [startDate, endDate] = this._getValues();
    this.skipNavigate();
    this._updateCurrentDate(selectedValue);
    this._currentDateChanged = true;
    if (this.calendar.option('_allowChangeSelectionOrder') === true) {
      if (this.calendar.option('_currentSelection') === 'startDate') {
        if (this.calendar._convertToDate(selectedValue) > this.calendar._convertToDate(endDate)) {
          this.dateValue([selectedValue, null], e);
        } else {
          this.dateValue([selectedValue, endDate], e);
        }
      } else {
        if (this.calendar._convertToDate(selectedValue) > this.calendar._convertToDate(startDate)) {
          this.dateValue([startDate, selectedValue], e);
        } else {
          this.dateValue([null, selectedValue], e);
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
    (_value = value) !== null && _value !== void 0 ? _value : value = this._getValues();
    (_previousValue = previousValue) !== null && _previousValue !== void 0 ? _previousValue : previousValue = [];
    super.updateAriaSelected(value, previousValue);
  }
  processValueChanged(value, previousValue) {
    super.processValueChanged(value, previousValue);
    var range = this._getRange();
    this._updateViewsOption('range', range);
  }
  getDefaultCurrentDate() {
    var dates = this.dateOption('values').filter(value => value);
    return this._getLowestDateInArray(dates);
  }
  _getValues() {
    var values = this.dateOption('values');
    if (!values.length) {
      return values;
    }
    var [startDate, endDate] = values;
    if (startDate && endDate && startDate > endDate) {
      [startDate, endDate] = [endDate, startDate];
    }
    return [startDate, endDate];
  }
  _getRange() {
    var [startDate, endDate] = this._getValues();
    return this._getDaysInRange(startDate, endDate);
  }
  _getDaysInRange(startDate, endDate) {
    if (!startDate || !endDate) {
      return [];
    }

    // TODO: Rework this range reducing algorithm to support different multi views
    // and optimise single views.
    var currentDate = this.calendar.option('currentDate').getTime();
    var rangeStartDate = new Date(Math.max(currentDate - RANGE_OFFSET, startDate));
    var rangeEndDate = new Date(Math.min(currentDate + RANGE_OFFSET, endDate));
    return [...dateUtils.getDatesOfInterval(rangeStartDate, rangeEndDate, DAY_INTERVAL), rangeEndDate];
  }
  _cellHoverHandler(e) {
    var isMaxZoomLevel = this._isMaxZoomLevel();
    var [startDate, endDate] = this._getValues();
    var {
      _allowChangeSelectionOrder,
      _currentSelection
    } = this.calendar.option();
    var skipHoveredRange = _allowChangeSelectionOrder && _currentSelection === 'startDate';
    if (isMaxZoomLevel && startDate && !endDate && !skipHoveredRange) {
      if (startDate < e.value) {
        this._updateViewsOption('range', this._getDaysInRange(startDate, e.value));
      } else {
        this._updateViewsOption('range', this._getDaysInRange(e.value, startDate));
      }
    }
  }
}
export default CalendarRangeSelectionStrategy;
