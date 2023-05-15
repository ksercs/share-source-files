/**
* DevExtreme (esm/ui/date_range_box/ui.multiselect_date_box.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import DateBox from '../date_box/ui.date_box.mask';
import RangeCalendarStrategy from './strategy/rangeCalendar';
class MultiselectDateBox extends DateBox {
  _initStrategy() {
    this._strategy = new RangeCalendarStrategy(this);
  }
  _applyButtonHandler(_ref) {
    var {
      event
    } = _ref;
    var value = this._strategy.getValue();
    this._strategy.dateRangeBox.updateValue(value, event);
    this.close();
    this.option('focusStateEnabled') && this.focus();
  }
  _openHandler(e) {
    if (this._strategy.dateRangeBox.option('opened')) {
      return;
    }
    super._openHandler(e);
  }
  _popupShownHandler() {
    var _this$_strategy$dateR;
    super._popupShownHandler();
    (_this$_strategy$dateR = this._strategy.dateRangeBox._validationMessage) === null || _this$_strategy$dateR === void 0 ? void 0 : _this$_strategy$dateR.option('positionSide', this._getValidationMessagePositionSide());
  }
  _popupHiddenHandler() {
    var _this$_strategy$dateR2;
    super._popupHiddenHandler();
    (_this$_strategy$dateR2 = this._strategy.dateRangeBox._validationMessage) === null || _this$_strategy$dateR2 === void 0 ? void 0 : _this$_strategy$dateR2.option('positionSide', this._getValidationMessagePositionSide());
  }
  _closeOutsideDropDownHandler(e) {
    var {
      target
    } = e;
    var [startDateInput, endDateInput] = this._strategy.dateRangeBox.field();
    return super._closeOutsideDropDownHandler(e) && !($(target).is(startDateInput) || $(target).is(endDateInput));
  }
  _focusInHandler(e) {
    super._focusInHandler(e);
    var {
      target
    } = e;
    var [startDateInput, endDateInput] = this._strategy.dateRangeBox.field();
    if ($(target).is(startDateInput)) {
      this._strategy.dateRangeBox.option('_currentSelection', 'startDate');
    }
    if ($(target).is(endDateInput)) {
      this._strategy.dateRangeBox.option('_currentSelection', 'endDate');
    }
    if (!this._strategy.dateRangeBox.getStartDateBox()._strategy._widget) {
      return;
    }
    var value = this._strategy.dateRangeBox.getStartDateBox()._strategy._widget.option('values');
    if ($(target).is(startDateInput)) {
      this._strategy.setActiveStartDateBox();
      this._strategy._widget.option('_currentSelection', 'startDate');
      this._strategy._widget._setViewsMaxOption(value[1]);
    }
    if ($(target).is(endDateInput)) {
      this._strategy.dateRangeBox.getStartDateBox()._strategy.setActiveEndDateBox();
      this._strategy.dateRangeBox.getStartDateBox()._strategy._widget.option('_currentSelection', 'endDate');
      this._strategy.dateRangeBox.getStartDateBox()._strategy._widget._setViewsMinOption(value[0]);
    }
  }
  _updateInternalValidationState(isValid, validationMessage) {
    this.option({
      isValid,
      validationError: isValid ? null : {
        message: validationMessage
      }
    });
  }
  _recallInternalValidation(value) {
    this._applyInternalValidation(value);
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'isValid':
        {
          var isValid = this._strategy.dateRangeBox.option('isValid');
          if (this._skipIsValidOptionChange || isValid === args.value) {
            super._optionChanged(args);
            return;
          }
          this._skipIsValidOptionChange = true;
          this.option({
            isValid
          });
          this._skipIsValidOptionChange = false;
          break;
        }
      default:
        super._optionChanged(args);
        break;
    }
  }
}
export default MultiselectDateBox;
