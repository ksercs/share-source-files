"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _uiDate_boxStrategy = _interopRequireDefault(require("../../date_box/ui.date_box.strategy.calendar"));
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _extend = require("../../../core/utils/extend");
var _uiDate_range = require("../ui.date_range.utils");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
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
    return (0, _extend.extend)(true, _CalendarStrategy.prototype.popupConfig.call(this, _popupConfig), {
      position: {
        of: this.dateRangeBox.$element()
      }
    });
  };
  _proto.popupShowingHandler = function popupShowingHandler() {
    var _this$_widget;
    (_this$_widget = this._widget) === null || _this$_widget === void 0 ? void 0 : _this$_widget._restoreViewsMinMaxOptions();
    this._dateSelectedCounter = 0;
  };
  _proto._getPopup = function _getPopup() {
    return _CalendarStrategy.prototype._getPopup.call(this) || this.dateRangeBox.getStartDateBox()._popup;
  };
  _proto.getFirstPopupElement = function getFirstPopupElement() {
    return (0, _renderer.default)(this._getPopup().getFocusableElements()[0]);
  };
  _proto.getLastPopupElement = function getLastPopupElement() {
    var elements = this._getPopup().getFocusableElements();
    return (0, _renderer.default)(elements[elements.length - 1]);
  };
  _proto.supportedKeys = function supportedKeys() {
    var _this2 = this;
    return _extends({}, _CalendarStrategy.prototype.supportedKeys.call(this), {
      rightArrow: function rightArrow() {
        if (_this2.dateRangeBox.option('opened')) {
          return true;
        }
      },
      leftArrow: function leftArrow() {
        if (_this2.dateRangeBox.option('opened')) {
          return true;
        }
      },
      enter: function enter(e) {
        if (_this2.dateRangeBox.option('opened')) {
          var dateBoxValue = _this2.dateBox.dateOption('value');
          _this2.dateBox._valueChangeEventHandler(e);
          var newDateBoxValue = _this2.dateBox.dateOption('value');
          var dateBoxValueChanged = !(0, _uiDate_range.isSameDates)(dateBoxValue, newDateBoxValue);
          if (dateBoxValueChanged) {
            _this2.dateRangeBox.getStartDateBox()._strategy._widget.option('value', _this2.dateRangeBox.option('value'));
          } else {
            _this2.dateRangeBox.getStartDateBox()._strategy._widget._enterKeyHandler(e);
          }
          return false;
        }
      },
      tab: function tab(e) {
        if (!_this2.getDateRangeBox().option('opened')) {
          return;
        }
        if (_this2._isInstantlyMode()) {
          if (!e.shiftKey && _this2.getDateRangeBox()._isEndDateActiveElement() || e.shiftKey && _this2.getDateRangeBox()._isStartDateActiveElement()) {
            _this2.dateRangeBox.close();
          }
          return;
        }
        if (!e.shiftKey && _this2.getDateRangeBox()._isStartDateActiveElement() || e.shiftKey && _this2.getDateRangeBox()._isEndDateActiveElement()) {
          return;
        }
        var $focusableElement = e.shiftKey ? _this2.getLastPopupElement() : _this2.getFirstPopupElement();
        if ($focusableElement) {
          _events_engine.default.trigger($focusableElement, 'focus');
          $focusableElement.select();
        }
        e.preventDefault();
      }
    });
  };
  _proto._getTodayButtonConfig = function _getTodayButtonConfig() {
    var _this3 = this;
    var todayButtonConfig = _CalendarStrategy.prototype._getTodayButtonConfig.call(this);
    todayButtonConfig.options.onInitialized = function (e) {
      _this3.dateBox._popupButtonInitializedHandler(e);
    };
    return todayButtonConfig;
  };
  _proto._getWidgetOptions = function _getWidgetOptions() {
    var _this$dateRangeBox$op = this.dateRangeBox.option(),
      disabledDatesValue = _this$dateRangeBox$op.disabledDates,
      value = _this$dateRangeBox$op.value,
      multiView = _this$dateRangeBox$op.multiView;
    var disabledDates = (0, _type.isFunction)(disabledDatesValue) ? this._injectComponent(disabledDatesValue) : disabledDates;
    return (0, _extend.extend)(_CalendarStrategy.prototype._getWidgetOptions.call(this), {
      disabledDates,
      value,
      selectionMode: 'range',
      viewsCount: multiView ? 2 : 1,
      _allowChangeSelectionOrder: true,
      _currentSelection: this.getCurrentSelection()
    });
  };
  _proto._refreshActiveDescendant = function _refreshActiveDescendant(e) {
    this.dateRangeBox.setAria('activedescendant', e.actionValue);
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
    return this._widget.option('value');
  };
  _proto._updateValue = function _updateValue() {
    var _this$dateRangeBox$op2 = this.dateRangeBox.option(),
      value = _this$dateRangeBox$op2.value;
    if (!this._widget) {
      return;
    }
    this._shouldPreventFocusChange = true;
    this._widget.option('value', value);
  };
  _proto._isInstantlyMode = function _isInstantlyMode() {
    return this.dateRangeBox.option('applyValueMode') === 'instantly';
  };
  _proto._valueChangedHandler = function _valueChangedHandler(_ref) {
    var value = _ref.value,
      previousValue = _ref.previousValue,
      event = _ref.event;
    if ((0, _uiDate_range.isSameDateArrays)(value, previousValue) && !this._widget._valueSelected) {
      this._shouldPreventFocusChange = false;
      return;
    }
    this._widget._valueSelected = false;
    if (this._isInstantlyMode()) {
      if (!this.dateRangeBox.option('disableOutOfRangeSelection')) {
        if (this._getCalendarCurrentSelection() === 'startDate') {
          this._dateSelectedCounter = 0;
        } else {
          this._dateSelectedCounter = 1;
          if (!value[0]) {
            this._dateSelectedCounter = -1;
          } else if ((0, _uiDate_range.getDeserializedDate)(value[0]) > (0, _uiDate_range.getDeserializedDate)(value[1])) {
            this.dateRangeBox.updateValue([value[0], null], event);
            return;
          }
        }
      }
      this.dateRangeBox.updateValue(value, event);
      this._dateSelectedCounter += 1;
      if (this._dateSelectedCounter === 2) {
        this.getDateRangeBox().close();
        return;
      }
    } else {
      if (this._getCalendarCurrentSelection() === 'endDate') {
        if (value[0] && (0, _uiDate_range.getDeserializedDate)(value[0]) > (0, _uiDate_range.getDeserializedDate)(value[1])) {
          return;
        }
      }
    }
    if (!this._shouldPreventFocusChange) {
      this._moveFocusToNextInput();
    }
    this._shouldPreventFocusChange = false;
  };
  _proto._moveFocusToNextInput = function _moveFocusToNextInput() {
    var targetDateBox = this._getCalendarCurrentSelection() === 'startDate' ? this.getDateRangeBox().getEndDateBox() : this.getDateRangeBox().getStartDateBox();
    targetDateBox.focus();
    _events_engine.default.trigger(targetDateBox.field(), 'dxclick');
  };
  _proto.getCurrentSelection = function getCurrentSelection() {
    return this.dateRangeBox.option('_currentSelection');
  };
  _proto._getCalendarCurrentSelection = function _getCalendarCurrentSelection() {
    return this._widget.option('_currentSelection');
  };
  _proto._closeDropDownByEnter = function _closeDropDownByEnter() {
    if (this._getCalendarCurrentSelection() === 'startDate') {
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
  return RangeCalendarStrategy;
}(_uiDate_boxStrategy.default);
var _default = RangeCalendarStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;