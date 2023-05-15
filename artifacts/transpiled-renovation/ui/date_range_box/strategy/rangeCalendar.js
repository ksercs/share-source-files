"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _uiDate_boxStrategy = _interopRequireDefault(require("../../date_box/ui.date_box.strategy.calendar"));
var _extend = require("../../../core/utils/extend");
var _uiDate_range = require("../ui.date_range.utils");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var CALENDAR_RANGE_START_DATE_CLASS = 'dx-calendar-range-start-date';
var CALENDAR_RANGE_END_DATE_CLASS = 'dx-calendar-range-end-date';
var RangeCalendarStrategy = /*#__PURE__*/function (_CalendarStrategy) {
  _inheritsLoose(RangeCalendarStrategy, _CalendarStrategy);
  function RangeCalendarStrategy(dateBox) {
    var _this;
    _this = _CalendarStrategy.call(this) || this;
    _this.dateBox = dateBox;
    _this.dateRangeBox = dateBox.option('_dateRangeBoxInstance');
    return _this;
  }
  var _proto = RangeCalendarStrategy.prototype;
  _proto.popupConfig = function popupConfig(_popupConfig) {
    var _this2 = this;
    return (0, _extend.extend)(true, _CalendarStrategy.prototype.popupConfig.call(this, _popupConfig), {
      position: {
        of: this.dateRangeBox.$element()
      },
      onShowing: function onShowing() {
        _this2._widget._restoreViewsMinMaxOptions();
        // this._widget.option('_currentSelection', 'startDate');
      }
    });
  };
  _proto._getPopup = function _getPopup() {
    return _CalendarStrategy.prototype._getPopup.call(this) || this.dateRangeBox.getStartDateBox()._popup;
  };
  _proto.supportedKeys = function supportedKeys() {
    var _this3 = this;
    var supportedKeys = _extends({}, _CalendarStrategy.prototype.supportedKeys.call(this), {
      rightArrow: function rightArrow() {
        if (_this3.dateRangeBox.option('opened')) {
          return true;
        }
      },
      leftArrow: function leftArrow() {
        if (_this3.dateRangeBox.option('opened')) {
          return true;
        }
      },
      enter: function enter(e) {
        if (_this3.dateRangeBox.option('opened')) {
          _this3.dateRangeBox.getStartDateBox()._strategy._widget._enterKeyHandler(e);
          _this3.dateBox._valueChangeEventHandler(e);
          _this3.dateRangeBox.getStartDateBox()._strategy._widget.option('values', _this3.dateRangeBox.option('value'));
          return false;
        }
      }
    });
    return supportedKeys;
  };
  _proto._getWidgetOptions = function _getWidgetOptions() {
    var _this$dateRangeBox$op = this.dateRangeBox.option(),
      disabledDatesValue = _this$dateRangeBox$op.disabledDates,
      value = _this$dateRangeBox$op.value,
      multiView = _this$dateRangeBox$op.multiView;
    var disabledDates = (0, _type.isFunction)(disabledDatesValue) ? this._injectComponent(disabledDatesValue) : disabledDates;
    return (0, _extend.extend)(_CalendarStrategy.prototype._getWidgetOptions.call(this), {
      disabledDates: disabledDates,
      values: value,
      selectionMode: 'range',
      viewsCount: multiView ? 2 : 1,
      width: 260,
      _allowChangeSelectionOrder: true,
      _currentSelection: this.getCurrentSelection()
    });
  };
  _proto._injectComponent = function _injectComponent(func) {
    var _this4 = this;
    return function (params) {
      return func((0, _extend.extend)(params, {
        component: _this4.dateRangeBox
      }));
    };
  };
  _proto.getKeyboardListener = function getKeyboardListener() {
    return this.dateRangeBox.getStartDateBox() ? this.dateRangeBox.getStartDateBox()._strategy._widget : this._widget;
  };
  _proto.getValue = function getValue() {
    return this._widget.option('values');
  };
  _proto._updateValue = function _updateValue() {
    if (!this._widget) {
      return;
    }
    this._widget.option('values', this.dateRangeBox.option('value'));
  };
  _proto._valueChangedHandler = function _valueChangedHandler(_ref) {
    var value = _ref.value,
      previousValue = _ref.previousValue,
      event = _ref.event;
    if ((0, _uiDate_range.isSameDateArrays)(value, previousValue)) {
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
  };
  _proto.getCurrentSelection = function getCurrentSelection() {
    return this.dateRangeBox.option('_currentSelection');
  };
  _proto.isStartDateBoxActive = function isStartDateBoxActive() {
    return this.dateBox.$element().hasClass('dx-start-datebox');
  };
  _proto._closeDropDownByEnter = function _closeDropDownByEnter() {
    if (this._widget.option('_currentSelection') === 'startDate') {
      return false;
    } else {
      return true;
    }
  };
  _proto.dateBoxValue = function dateBoxValue() {
    if (arguments.length) {
      return this.dateBox.dateValue.apply(this.dateBox, arguments);
    } else {
      return this.dateBox.dateOption.apply(this.dateBox, ['value']);
    }
  };
  _proto._cellClickHandler = function _cellClickHandler() {};
  _proto.setActiveStartDateBox = function setActiveStartDateBox() {
    this.dateBox = this.dateRangeBox.getStartDateBox();
  };
  _proto.setActiveEndDateBox = function setActiveEndDateBox() {
    this.dateBox = this.dateRangeBox.getEndDateBox();
  };
  _proto.getDateRangeBox = function getDateRangeBox() {
    return this.dateRangeBox;
  };
  _proto.isStartDateSelected = function isStartDateSelected(_ref2) {
    var currentTarget = _ref2.currentTarget;
    if ((0, _renderer.default)(currentTarget).hasClass(CALENDAR_RANGE_START_DATE_CLASS)) {
      return true;
    }
    return false;
  };
  _proto.isEndDateSelected = function isEndDateSelected(_ref3) {
    var currentTarget = _ref3.currentTarget;
    if ((0, _renderer.default)(currentTarget).hasClass(CALENDAR_RANGE_END_DATE_CLASS)) {
      return true;
    }
    return false;
  };
  return RangeCalendarStrategy;
}(_uiDate_boxStrategy.default);
var _default = RangeCalendarStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;