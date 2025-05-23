/**
* DevExtreme (cjs/ui/date_range_box/ui.multiselect_date_box.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _uiDate_box = _interopRequireDefault(require("../date_box/ui.date_box.mask"));
var _rangeCalendar = _interopRequireDefault(require("./strategy/rangeCalendar"));
var _utils = require("../../events/utils");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _uiDate_range = require("./ui.date_range.utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var START_DATEBOX_CLASS = 'dx-start-datebox';
var MultiselectDateBox = /*#__PURE__*/function (_DateBox) {
  _inheritsLoose(MultiselectDateBox, _DateBox);
  function MultiselectDateBox() {
    return _DateBox.apply(this, arguments) || this;
  }
  var _proto = MultiselectDateBox.prototype;
  _proto._initStrategy = function _initStrategy() {
    this._strategy = new _rangeCalendar.default(this);
  };
  _proto._initMarkup = function _initMarkup() {
    _DateBox.prototype._initMarkup.call(this);
    this._renderInputClickEvent();
  };
  _proto._renderInputClickEvent = function _renderInputClickEvent() {
    var _this = this;
    var clickEventName = (0, _utils.addNamespace)('dxclick', this.NAME);
    _events_engine.default.off(this._input(), clickEventName);
    _events_engine.default.on(this._input(), clickEventName, function (e) {
      _this._processValueChange(e);
    });
  };
  _proto._applyButtonHandler = function _applyButtonHandler(_ref) {
    var event = _ref.event;
    var value = this._strategy.getValue();
    this._strategy.dateRangeBox.updateValue(value, event);
    this.close();
    this.option('focusStateEnabled') && this.focus();
  };
  _proto._openHandler = function _openHandler(e) {
    if (this._strategy.dateRangeBox.option('opened')) {
      return;
    }
    _DateBox.prototype._openHandler.call(this, e);
  };
  _proto._renderOpenedState = function _renderOpenedState() {
    var _this$option = this.option(),
      opened = _this$option.opened;
    this._getDateRangeBox().option('opened', opened);
    if (this._isStartDateBox()) {
      if (opened) {
        this._createPopup();
      }
      this._getDateRangeBox()._popupContentIdentifier(this._getControlsAria());
      this._setPopupOption('visible', opened);
      this._getDateRangeBox()._setAriaAttributes();
    }
  };
  _proto._getDateRangeBox = function _getDateRangeBox() {
    return this._strategy.dateRangeBox;
  };
  _proto._isStartDateBox = function _isStartDateBox() {
    return this.$element().hasClass(START_DATEBOX_CLASS);
  };
  _proto._renderPopup = function _renderPopup() {
    _DateBox.prototype._renderPopup.call(this);
    if (this._isStartDateBox()) {
      var dateRangeBox = this._strategy.dateRangeBox;
      dateRangeBox._bindInnerWidgetOptions(this._popup, 'dropDownOptions');
    }
  };
  _proto._popupShownHandler = function _popupShownHandler() {
    var _this$_strategy$dateR;
    _DateBox.prototype._popupShownHandler.call(this);
    (_this$_strategy$dateR = this._strategy.dateRangeBox._validationMessage) === null || _this$_strategy$dateR === void 0 ? void 0 : _this$_strategy$dateR.option('positionSide', this._getValidationMessagePositionSide());
  };
  _proto._popupHiddenHandler = function _popupHiddenHandler() {
    var _this$_strategy$dateR2;
    _DateBox.prototype._popupHiddenHandler.call(this);
    (_this$_strategy$dateR2 = this._strategy.dateRangeBox._validationMessage) === null || _this$_strategy$dateR2 === void 0 ? void 0 : _this$_strategy$dateR2.option('positionSide', this._getValidationMessagePositionSide());
  };
  _proto._focusInHandler = function _focusInHandler(e) {
    _DateBox.prototype._focusInHandler.call(this, e);
    this._processValueChange(e);
  };
  _proto._popupElementTabHandler = function _popupElementTabHandler(e) {
    var $element = (0, _renderer.default)(e.currentTarget);
    if (e.shiftKey && $element.is(this._getFirstPopupElement())) {
      this._strategy.dateRangeBox.getEndDateBox().focus();
      e.preventDefault();
    }
    if (!e.shiftKey && $element.is(this._getLastPopupElement())) {
      this._strategy.dateRangeBox.getStartDateBox().focus();
      e.preventDefault();
    }
  };
  _proto._processValueChange = function _processValueChange(e) {
    var target = e.target;
    var _this$_strategy$dateR3 = this._strategy.dateRangeBox.field(),
      _this$_strategy$dateR4 = _slicedToArray(_this$_strategy$dateR3, 2),
      startDateInput = _this$_strategy$dateR4[0],
      endDateInput = _this$_strategy$dateR4[1];
    if ((0, _renderer.default)(target).is(startDateInput)) {
      this._strategy.dateRangeBox.option('_currentSelection', 'startDate');
    }
    if ((0, _renderer.default)(target).is(endDateInput)) {
      this._strategy.dateRangeBox.option('_currentSelection', 'endDate');
    }
    if (!this._strategy.dateRangeBox.getStartDateBox()._strategy._widget) {
      return;
    }
    var calendar = this._strategy.dateRangeBox.getStartDateBox()._strategy._widget;
    var value = calendar.option('value');
    var startDate = (0, _uiDate_range.getDeserializedDate)(value[0]);
    var endDate = (0, _uiDate_range.getDeserializedDate)(value[1]);
    if ((0, _renderer.default)(target).is(startDateInput)) {
      if (startDate) {
        calendar._skipNavigate = true;
        calendar.option('currentDate', startDate);
      }
      this._strategy.setActiveStartDateBox();
      calendar.option('_currentSelection', 'startDate');
      if (this._strategy.dateRangeBox.option('disableOutOfRangeSelection')) {
        calendar._setViewsMaxOption(endDate);
      }
    }
    if ((0, _renderer.default)(target).is(endDateInput)) {
      if (endDate) {
        if (startDate && (0, _uiDate_range.monthDifference)(startDate, endDate) > 1) {
          calendar.option('currentDate', calendar._getDateByOffset(null, endDate));
          calendar.option('currentDate', calendar._getDateByOffset(-1, endDate));
        }
        calendar._skipNavigate = true;
        calendar.option('currentDate', endDate);
      }
      this._strategy.dateRangeBox.getStartDateBox()._strategy.setActiveEndDateBox();
      calendar.option('_currentSelection', 'endDate');
      if (this._strategy.dateRangeBox.option('disableOutOfRangeSelection')) {
        calendar._setViewsMinOption(startDate);
      }
    }
  };
  _proto._invalidate = function _invalidate() {
    _DateBox.prototype._invalidate.call(this);
    this._refreshStrategy();
  };
  _proto._updateInternalValidationState = function _updateInternalValidationState(isValid, validationMessage) {
    this.option({
      isValid,
      validationError: isValid ? null : {
        message: validationMessage
      }
    });
  };
  _proto._recallInternalValidation = function _recallInternalValidation(value) {
    this._applyInternalValidation(value);
  };
  _proto._isTargetOutOfComponent = function _isTargetOutOfComponent(target) {
    var $dateRangeBox = this._strategy.dateRangeBox.$element();
    var isTargetOutOfDateRangeBox = (0, _renderer.default)(target).closest($dateRangeBox).length === 0;
    return _DateBox.prototype._isTargetOutOfComponent.call(this, target) && isTargetOutOfDateRangeBox;
  };
  _proto._optionChanged = function _optionChanged(args) {
    switch (args.name) {
      case 'isValid':
        {
          var isValid = this._strategy.dateRangeBox.option('isValid');
          if (this._skipIsValidOptionChange || isValid === args.value) {
            _DateBox.prototype._optionChanged.call(this, args);
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
        _DateBox.prototype._optionChanged.call(this, args);
        break;
    }
  };
  _proto.close = function close() {
    this._strategy.getDateRangeBox().getStartDateBox().option('opened', false);
  };
  return MultiselectDateBox;
}(_uiDate_box.default);
var _default = MultiselectDateBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
