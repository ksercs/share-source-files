/**
* DevExtreme (esm/ui/date_range_box/strategy/rangeCalendar.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../core/renderer';
import CalendarStrategy from '../../date_box/ui.date_box.strategy.calendar';
import { extend } from '../../../core/utils/extend';
import { isSameDateArrays } from '../ui.date_range.utils';
import { isFunction } from '../../../core/utils/type';
var CALENDAR_RANGE_START_DATE_CLASS = 'dx-calendar-range-start-date';
var CALENDAR_RANGE_END_DATE_CLASS = 'dx-calendar-range-end-date';
class RangeCalendarStrategy extends CalendarStrategy {
  constructor(dateBox) {
    super();
    this.dateBox = dateBox;
    this.dateRangeBox = dateBox.option('_dateRangeBoxInstance');
  }
  popupConfig(popupConfig) {
    return extend(true, super.popupConfig(popupConfig), {
      position: {
        of: this.dateRangeBox.$element()
      },
      onShowing: () => {
        this._widget._restoreViewsMinMaxOptions();
        // this._widget.option('_currentSelection', 'startDate');
      }
    });
  }

  _getPopup() {
    return super._getPopup() || this.dateRangeBox.getStartDateBox()._popup;
  }
  supportedKeys() {
    var supportedKeys = _extends({}, super.supportedKeys(), {
      rightArrow: () => {
        if (this.dateRangeBox.option('opened')) {
          return true;
        }
      },
      leftArrow: () => {
        if (this.dateRangeBox.option('opened')) {
          return true;
        }
      },
      enter: e => {
        if (this.dateRangeBox.option('opened')) {
          this.dateRangeBox.getStartDateBox()._strategy._widget._enterKeyHandler(e);
          this.dateBox._valueChangeEventHandler(e);
          this.dateRangeBox.getStartDateBox()._strategy._widget.option('values', this.dateRangeBox.option('value'));
          return false;
        }
      }
    });
    return supportedKeys;
  }
  _getWidgetOptions() {
    var {
      disabledDates: disabledDatesValue,
      value,
      multiView
    } = this.dateRangeBox.option();
    var disabledDates = isFunction(disabledDatesValue) ? this._injectComponent(disabledDatesValue) : disabledDates;
    return extend(super._getWidgetOptions(), {
      disabledDates,
      values: value,
      selectionMode: 'range',
      viewsCount: multiView ? 2 : 1,
      width: 260,
      _allowChangeSelectionOrder: true,
      _currentSelection: this.getCurrentSelection()
    });
  }
  _injectComponent(func) {
    return params => func(extend(params, {
      component: this.dateRangeBox
    }));
  }
  getKeyboardListener() {
    return this.dateRangeBox.getStartDateBox() ? this.dateRangeBox.getStartDateBox()._strategy._widget : this._widget;
  }
  getValue() {
    return this._widget.option('values');
  }
  _updateValue() {
    if (!this._widget) {
      return;
    }
    this._widget.option('values', this.dateRangeBox.option('value'));
  }
  _valueChangedHandler(_ref) {
    var {
      value,
      previousValue,
      event
    } = _ref;
    if (isSameDateArrays(value, previousValue)) {
      return;
    }
    var isInstantlyMode = this.dateRangeBox.option('applyValueMode') === 'instantly';
    if (!isInstantlyMode && !event) {
      this.dateRangeBox.updateValue(value);
      return;
    }
    if (this._widget.option('_currentSelection') === 'startDate') {
      if (isInstantlyMode) {
        this.dateRangeBox.updateValue(value, event);
      }
      this.getDateRangeBox().getEndDateBox().focus();
      // this._widget.option('_currentSelection', 'endDate');
      this._widget._setViewsMinOption(value[0]);

      // if(value[1]) {
      //     this._widget.option('currentDate', value[1]);
      // }
    } else {
      this.setActiveEndDateBox();
      if (isInstantlyMode) {
        this.dateRangeBox.updateValue(value, event);
        this.getDateRangeBox().close();
      } else {
        this.setActiveStartDateBox();
        this.getDateRangeBox().getStartDateBox().focus();
      }
      // this._widget.option('_currentSelection', 'startDate');
      this._widget._setViewsMaxOption(value[1]);
    }
  }
  getCurrentSelection() {
    return this.dateRangeBox.option('_currentSelection');
  }
  isStartDateBoxActive() {
    return this.dateBox.$element().hasClass('dx-start-datebox');
  }
  _closeDropDownByEnter() {
    if (this._widget.option('_currentSelection') === 'startDate') {
      return false;
    } else {
      return true;
    }
  }
  dateBoxValue() {
    if (arguments.length) {
      return this.dateBox.dateValue.apply(this.dateBox, arguments);
    } else {
      return this.dateBox.dateOption.apply(this.dateBox, ['value']);
    }
  }
  _cellClickHandler() {}
  setActiveStartDateBox() {
    this.dateBox = this.dateRangeBox.getStartDateBox();
  }
  setActiveEndDateBox() {
    this.dateBox = this.dateRangeBox.getEndDateBox();
  }
  getDateRangeBox() {
    return this.dateRangeBox;
  }
  isStartDateSelected(_ref2) {
    var {
      currentTarget
    } = _ref2;
    if ($(currentTarget).hasClass(CALENDAR_RANGE_START_DATE_CLASS)) {
      return true;
    }
    return false;
  }
  isEndDateSelected(_ref3) {
    var {
      currentTarget
    } = _ref3;
    if ($(currentTarget).hasClass(CALENDAR_RANGE_END_DATE_CLASS)) {
      return true;
    }
    return false;
  }
}
export default RangeCalendarStrategy;
