/**
* DevExtreme (esm/ui/date_box/ui.date_box.strategy.calendar.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Calendar from '../calendar';
import DateBoxStrategy from './ui.date_box.strategy';
import dateUtils from '../../core/utils/date';
import { splitPair } from '../../core/utils/common';
import { isFunction, isEmptyObject } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import messageLocalization from '../../localization/message';
var CalendarStrategy = DateBoxStrategy.inherit({
  NAME: 'Calendar',
  getDefaultOptions: function getDefaultOptions() {
    return extend(this.callBase(), {
      todayButtonText: messageLocalization.format('dxCalendar-todayButtonText')
    });
  },
  supportedKeys: function supportedKeys() {
    var homeEndHandler = function homeEndHandler(e) {
      if (this.option('opened')) {
        e.preventDefault();
        return true;
      }
      return false;
    };
    return {
      rightArrow: function rightArrow() {
        if (this.option('opened')) {
          return true;
        }
      },
      leftArrow: function leftArrow() {
        if (this.option('opened')) {
          return true;
        }
      },
      enter: function (e) {
        if (this.dateBox.option('opened')) {
          e.preventDefault();
          if (this._widget.option('zoomLevel') === this._widget.option('maxZoomLevel')) {
            var viewValue = this._getContouredValue();
            var lastActionElement = this._lastActionElement;
            var shouldCloseDropDown = this._closeDropDownByEnter();
            if (shouldCloseDropDown && viewValue && lastActionElement === 'calendar') {
              this.dateBoxValue(viewValue, e);
            }
            shouldCloseDropDown && this.dateBox.close();
            this.dateBox._valueChangeEventHandler(e);
            return !shouldCloseDropDown;
          } else {
            return true;
          }
        } else {
          this.dateBox._valueChangeEventHandler(e);
        }
      }.bind(this),
      home: homeEndHandler,
      end: homeEndHandler
    };
  },
  getDisplayFormat: function getDisplayFormat(displayFormat) {
    return displayFormat || 'shortdate';
  },
  _closeDropDownByEnter: () => true,
  _getWidgetName: function _getWidgetName() {
    return Calendar;
  },
  _getContouredValue: function _getContouredValue() {
    return this._widget._view.option('contouredDate');
  },
  getKeyboardListener() {
    return this._widget;
  },
  _getWidgetOptions: function _getWidgetOptions() {
    var disabledDates = this.dateBox.option('disabledDates');
    return extend(this.dateBox.option('calendarOptions'), {
      value: this.dateBoxValue() || null,
      selectionMode: 'single',
      dateSerializationFormat: null,
      min: this.dateBox.dateOption('min'),
      max: this.dateBox.dateOption('max'),
      onValueChanged: this._valueChangedHandler.bind(this),
      onCellClick: this._cellClickHandler.bind(this),
      tabIndex: null,
      disabledDates: isFunction(disabledDates) ? this._injectComponent(disabledDates.bind(this.dateBox)) : disabledDates,
      onContouredChanged: this._refreshActiveDescendant.bind(this),
      skipFocusCheck: true
    });
  },
  _injectComponent: function _injectComponent(func) {
    var that = this;
    return function (params) {
      extend(params, {
        component: that.dateBox
      });
      return func(params);
    };
  },
  _refreshActiveDescendant: function _refreshActiveDescendant(e) {
    this._lastActionElement = 'calendar';
    this.dateBox.setAria('activedescendant', e.actionValue);
  },
  _getTodayButtonConfig() {
    var buttonsLocation = this.dateBox.option('buttonsLocation');
    var isButtonsLocationDefault = buttonsLocation === 'default';
    var position = isButtonsLocationDefault ? ['bottom', 'center'] : splitPair(buttonsLocation);
    return {
      widget: 'dxButton',
      toolbar: position[0],
      location: position[1] === 'after' ? 'before' : position[1],
      options: {
        onInitialized: function (e) {
          e.component.registerKeyHandler('escape', this._escapeHandler.bind(this));
        }.bind(this),
        onClick: args => {
          this._widget._toTodayView(args);
        },
        text: this.dateBox.option('todayButtonText'),
        type: 'today'
      }
    };
  },
  _isCalendarVisible: function _isCalendarVisible() {
    var {
      calendarOptions
    } = this.dateBox.option();
    return isEmptyObject(calendarOptions) || calendarOptions.visible !== false;
  },
  _getPopupToolbarItems(toolbarItems) {
    var useButtons = this.dateBox.option('applyValueMode') === 'useButtons';
    var shouldRenderTodayButton = useButtons && this._isCalendarVisible();
    if (shouldRenderTodayButton) {
      var todayButton = this._getTodayButtonConfig();
      return [todayButton, ...toolbarItems];
    }
    return toolbarItems;
  },
  popupConfig: function popupConfig(_popupConfig) {
    return extend(true, _popupConfig, {
      position: {
        collision: 'flipfit flip'
      },
      width: 'auto'
    });
  },
  _escapeHandler: function _escapeHandler() {
    this.dateBox.close();
    this.dateBox.focus();
  },
  _valueChangedHandler: function _valueChangedHandler(e) {
    var value = e.value;
    var prevValue = e.previousValue;
    if (dateUtils.sameDate(value, prevValue) && dateUtils.sameHoursAndMinutes(value, prevValue)) {
      return;
    }
    if (this.dateBox.option('applyValueMode') === 'instantly') {
      this.dateBoxValue(this.getValue(), e.event);
    }
  },
  _updateValue: function _updateValue() {
    if (!this._widget) {
      return;
    }
    this._widget.option('value', this.dateBoxValue());
  },
  textChangedHandler: function textChangedHandler() {
    this._lastActionElement = 'input';
    if (this.dateBox.option('opened') && this._widget) {
      this._updateValue(true);
    }
  },
  _cellClickHandler: function _cellClickHandler(e) {
    var dateBox = this.dateBox;
    if (dateBox.option('applyValueMode') === 'instantly') {
      dateBox.option('opened', false);
      this.dateBoxValue(this.getValue(), e.event);
    }
  }
});
export default CalendarStrategy;
