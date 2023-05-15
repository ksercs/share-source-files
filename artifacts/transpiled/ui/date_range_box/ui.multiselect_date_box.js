"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _uiDate_box = _interopRequireDefault(require("../date_box/ui.date_box.mask"));
var _rangeCalendar = _interopRequireDefault(require("./strategy/rangeCalendar"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var MultiselectDateBox = /*#__PURE__*/function (_DateBox) {
  _inheritsLoose(MultiselectDateBox, _DateBox);
  function MultiselectDateBox() {
    return _DateBox.apply(this, arguments) || this;
  }
  var _proto = MultiselectDateBox.prototype;
  _proto._initStrategy = function _initStrategy() {
    this._strategy = new _rangeCalendar.default(this);
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
  _proto._closeOutsideDropDownHandler = function _closeOutsideDropDownHandler(e) {
    var target = e.target;
    var _this$_strategy$dateR3 = this._strategy.dateRangeBox.field(),
      _this$_strategy$dateR4 = _slicedToArray(_this$_strategy$dateR3, 2),
      startDateInput = _this$_strategy$dateR4[0],
      endDateInput = _this$_strategy$dateR4[1];
    return _DateBox.prototype._closeOutsideDropDownHandler.call(this, e) && !((0, _renderer.default)(target).is(startDateInput) || (0, _renderer.default)(target).is(endDateInput));
  };
  _proto._focusInHandler = function _focusInHandler(e) {
    _DateBox.prototype._focusInHandler.call(this, e);
    var target = e.target;
    var _this$_strategy$dateR5 = this._strategy.dateRangeBox.field(),
      _this$_strategy$dateR6 = _slicedToArray(_this$_strategy$dateR5, 2),
      startDateInput = _this$_strategy$dateR6[0],
      endDateInput = _this$_strategy$dateR6[1];
    if ((0, _renderer.default)(target).is(startDateInput)) {
      this._strategy.dateRangeBox.option('_currentSelection', 'startDate');
    }
    if ((0, _renderer.default)(target).is(endDateInput)) {
      this._strategy.dateRangeBox.option('_currentSelection', 'endDate');
    }
    if (!this._strategy.dateRangeBox.getStartDateBox()._strategy._widget) {
      return;
    }
    var value = this._strategy.dateRangeBox.getStartDateBox()._strategy._widget.option('values');
    if ((0, _renderer.default)(target).is(startDateInput)) {
      this._strategy.setActiveStartDateBox();
      this._strategy._widget.option('_currentSelection', 'startDate');
      this._strategy._widget._setViewsMaxOption(value[1]);
    }
    if ((0, _renderer.default)(target).is(endDateInput)) {
      this._strategy.dateRangeBox.getStartDateBox()._strategy.setActiveEndDateBox();
      this._strategy.dateRangeBox.getStartDateBox()._strategy._widget.option('_currentSelection', 'endDate');
      this._strategy.dateRangeBox.getStartDateBox()._strategy._widget._setViewsMinOption(value[0]);
    }
  };
  _proto._updateInternalValidationState = function _updateInternalValidationState(isValid, validationMessage) {
    this.option({
      isValid: isValid,
      validationError: isValid ? null : {
        message: validationMessage
      }
    });
  };
  _proto._recallInternalValidation = function _recallInternalValidation(value) {
    this._applyInternalValidation(value);
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
            isValid: isValid
          });
          this._skipIsValidOptionChange = false;
          break;
        }
      default:
        _DateBox.prototype._optionChanged.call(this, args);
        break;
    }
  };
  return MultiselectDateBox;
}(_uiDate_box.default);
var _default = MultiselectDateBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;