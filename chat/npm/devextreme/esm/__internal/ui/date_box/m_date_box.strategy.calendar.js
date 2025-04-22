/**
* DevExtreme (esm/__internal/ui/date_box/m_date_box.strategy.calendar.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../common/core/localization/message';
// @ts-expect-error
import { splitPair } from '../../../core/utils/common';
import dateUtils from '../../../core/utils/date';
import { extend } from '../../../core/utils/extend';
import { isEmptyObject, isFunction } from '../../../core/utils/type';
import Calendar from '../../../ui/calendar';
import { isMaterial } from '../../../ui/themes';
import DateBoxStrategy from './m_date_box.strategy';
const TODAY_BUTTON_CLASS = 'dx-button-today';
class CalendarStrategy extends DateBoxStrategy {
  ctor(dateBox) {
    super.ctor(dateBox);
    this.NAME = 'Calendar';
  }
  getDefaultOptions() {
    return _extends({}, super.getDefaultOptions(), {
      todayButtonText: messageLocalization.format('dxCalendar-todayButtonText')
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  supportedKeys() {
    const homeEndHandler = function (e) {
      if (this.option('opened')) {
        e.preventDefault();
        return true;
      }
      return false;
    };
    return {
      // @ts-expect-error
      rightArrow() {
        if (this.option('opened')) {
          return true;
        }
      },
      // @ts-expect-error
      leftArrow() {
        if (this.option('opened')) {
          return true;
        }
      },
      // @ts-expect-error
      enter: function (e) {
        if (this.dateBox.option('opened')) {
          e.preventDefault();
          if (this._widget.option('zoomLevel') === this._widget.option('maxZoomLevel')) {
            const viewValue = this._getContouredValue();
            const lastActionElement = this._lastActionElement;
            const shouldCloseDropDown = this._closeDropDownByEnter();
            if (shouldCloseDropDown && viewValue && lastActionElement === 'calendar') {
              this.dateBoxValue(viewValue, e);
            }
            shouldCloseDropDown && this.dateBox.close();
            this.dateBox._valueChangeEventHandler(e);
            return !shouldCloseDropDown;
          }
          return true;
        }
        this.dateBox._valueChangeEventHandler(e);
      }.bind(this),
      home: homeEndHandler,
      end: homeEndHandler
    };
  }
  getDisplayFormat(displayFormat) {
    return displayFormat || 'shortdate';
  }
  _closeDropDownByEnter() {
    return true;
  }
  _getWidgetName() {
    return Calendar;
  }
  _getContouredValue() {
    return this._widget._view.option('contouredDate');
  }
  getKeyboardListener() {
    return this._widget;
  }
  _getWidgetOptions() {
    const disabledDates = this.dateBox.option('disabledDates');
    return extend(this.dateBox.option('calendarOptions'), {
      value: this.dateBoxValue() || null,
      selectionMode: 'single',
      dateSerializationFormat: null,
      min: this.dateBox.dateOption('min'),
      max: this.dateBox.dateOption('max'),
      onValueChanged: this._valueChangedHandler.bind(this),
      onCellClick: this._cellClickHandler.bind(this),
      disabledDates: isFunction(disabledDates) ? this._injectComponent(disabledDates.bind(this.dateBox)) : disabledDates,
      onContouredChanged: this._refreshActiveDescendant.bind(this),
      skipFocusCheck: true
    });
  }
  _injectComponent(func) {
    const that = this;
    return function (params) {
      extend(params, {
        component: that.dateBox
      });
      return func(params);
    };
  }
  _refreshActiveDescendant(e) {
    this._lastActionElement = 'calendar';
    this.dateBox.setAria('activedescendant', e.actionValue);
  }
  _getTodayButtonConfig() {
    const buttonsLocation = this.dateBox.option('buttonsLocation');
    const isButtonsLocationDefault = buttonsLocation === 'default';
    const position = isButtonsLocationDefault ? ['bottom', 'center'] : splitPair(buttonsLocation);
    // @ts-expect-error
    const stylingMode = isMaterial() ? 'text' : 'outlined';
    return {
      widget: 'dxButton',
      toolbar: position[0],
      location: position[1] === 'after' ? 'before' : position[1],
      options: {
        onClick: args => {
          this._widget._toTodayView(args);
        },
        text: this.dateBox.option('todayButtonText'),
        elementAttr: {
          class: TODAY_BUTTON_CLASS
        },
        stylingMode
      }
    };
  }
  _isCalendarVisible() {
    const {
      calendarOptions
    } = this.dateBox.option();
    return isEmptyObject(calendarOptions) || calendarOptions.visible !== false;
  }
  _getPopupToolbarItems(toolbarItems) {
    const useButtons = this.dateBox.option('applyValueMode') === 'useButtons';
    const shouldRenderTodayButton = useButtons && this._isCalendarVisible();
    if (shouldRenderTodayButton) {
      const todayButton = this._getTodayButtonConfig();
      return [todayButton, ...toolbarItems];
    }
    return toolbarItems;
  }
  popupConfig(popupConfig) {
    return extend(true, popupConfig, {
      position: {
        collision: 'flipfit flip'
      },
      width: 'auto'
    });
  }
  _valueChangedHandler(e) {
    const {
      value
    } = e;
    const prevValue = e.previousValue;
    if (dateUtils.sameDate(value, prevValue) && dateUtils.sameHoursAndMinutes(value, prevValue)) {
      return;
    }
    if (this.dateBox.option('applyValueMode') === 'instantly') {
      this.dateBoxValue(this.getValue(), e.event);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _updateValue(preventDefaultValue) {
    if (!this._widget) {
      return;
    }
    this._widget.option('value', this.dateBoxValue());
  }
  textChangedHandler() {
    this._lastActionElement = 'input';
    if (this.dateBox.option('opened') && this._widget) {
      this._updateValue(true);
    }
  }
  _cellClickHandler(e) {
    const {
      dateBox
    } = this;
    if (dateBox.option('applyValueMode') === 'instantly') {
      dateBox.option('opened', false);
      this.dateBoxValue(this.getValue(), e.event);
    }
  }
}
export default CalendarStrategy;
