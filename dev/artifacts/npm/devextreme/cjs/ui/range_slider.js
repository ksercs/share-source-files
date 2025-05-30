/**
* DevExtreme (cjs/ui/range_slider.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _size = require("../core/utils/size");
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _slider = _interopRequireDefault(require("./slider"));
var _ui = _interopRequireDefault(require("./slider/ui.slider_handle"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _extend = require("../core/utils/extend");
var _common = require("../core/utils/common");
var _index = require("../events/utils/index");
var _message = _interopRequireDefault(require("../localization/message"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// STYLE rangeSlider

var RANGE_SLIDER_CLASS = 'dx-rangeslider';
var RANGE_SLIDER_START_HANDLE_CLASS = RANGE_SLIDER_CLASS + '-start-handle';
var RANGE_SLIDER_END_HANDLE_CLASS = RANGE_SLIDER_CLASS + '-end-handle';
var RangeSlider = _slider.default.inherit({
  _supportedKeys: function _supportedKeys() {
    var isRTL = this.option('rtlEnabled');
    var that = this;
    var _changeHandle = function _changeHandle(e, capturedHandle) {
      if (that.option('start') === that.option('end')) {
        that._capturedHandle = capturedHandle;
        e.target = that._capturedHandle;
        _events_engine.default.trigger(that._capturedHandle, 'focus');
      }
    };
    var _setHandleValue = function _setHandleValue(e, step, sign) {
      var isStart = (0, _renderer.default)(e.target).hasClass(RANGE_SLIDER_START_HANDLE_CLASS);
      var valueOption = isStart ? 'start' : 'end';
      var val = that.option(valueOption);
      step = that._valueStep(step);
      val += sign * (isRTL ? -step : step);
      that.option(valueOption, val);
    };
    var moveHandleRight = function moveHandleRight(e, step) {
      _changeHandle(e, isRTL ? that._$handleStart : that._$handleEnd);
      _setHandleValue(e, step, 1);
    };
    var moveHandleLeft = function moveHandleLeft(e, step) {
      _changeHandle(e, isRTL ? that._$handleEnd : that._$handleStart);
      _setHandleValue(e, step, -1);
    };
    return (0, _extend.extend)(this.callBase(), {
      leftArrow: function leftArrow(e) {
        this._processKeyboardEvent(e);
        moveHandleLeft(e, this.option('step'));
      },
      rightArrow: function rightArrow(e) {
        this._processKeyboardEvent(e);
        moveHandleRight(e, this.option('step'));
      },
      pageUp: function pageUp(e) {
        this._processKeyboardEvent(e);
        moveHandleRight(e, this.option('step') * this.option('keyStep'));
      },
      pageDown: function pageDown(e) {
        this._processKeyboardEvent(e);
        moveHandleLeft(e, this.option('step') * this.option('keyStep'));
      },
      home: function home(e) {
        this._processKeyboardEvent(e);
        var isStart = (0, _renderer.default)(e.target).hasClass(RANGE_SLIDER_START_HANDLE_CLASS);
        var valueOption = isStart ? 'start' : 'end';
        var startOption = isStart ? 'min' : 'start';
        var val = this.option(startOption);
        this.option(valueOption, val);
      },
      end: function end(e) {
        this._processKeyboardEvent(e);
        var isStart = (0, _renderer.default)(e.target).hasClass(RANGE_SLIDER_START_HANDLE_CLASS);
        var valueOption = isStart ? 'start' : 'end';
        var endOption = isStart ? 'end' : 'max';
        var val = this.option(endOption);
        this.option(valueOption, val);
      }
    });
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      start: 40,
      end: 60,
      value: [40, 60],
      startName: '',
      endName: ''

      /**
      * @name dxRangeSliderOptions.name
      * @hidden
      */
    });
  },

  _renderSubmitElement: function _renderSubmitElement() {
    var $element = this.$element();
    this._$submitStartElement = (0, _renderer.default)('<input>').attr('type', 'hidden').attr('name', this.option('startName')).appendTo($element);
    this._$submitEndElement = (0, _renderer.default)('<input>').attr('type', 'hidden').attr('name', this.option('endName')).appendTo($element);
  },
  _initOptions: function _initOptions(options) {
    this.callBase(options);
    var initialValue = this.initialOption('value');
    var value = this.option('value');
    if (value[0] === initialValue[0] && value[1] === initialValue[1]) {
      this.option('value', [this.option('start'), this.option('end')]);
    } else {
      this.option({
        start: value[0],
        end: value[1]
      });
    }
  },
  _initMarkup: function _initMarkup() {
    this.$element().addClass(RANGE_SLIDER_CLASS);
    this.callBase();
  },
  _renderContentImpl: function _renderContentImpl() {
    this._callHandlerMethod('repaint');
    this.callBase();
  },
  _renderHandle: function _renderHandle() {
    this._$handleStart = this._renderHandleImpl(this.option('start'), this._$handleStart).addClass(RANGE_SLIDER_START_HANDLE_CLASS);
    this._$handleEnd = this._renderHandleImpl(this.option('end'), this._$handleEnd).addClass(RANGE_SLIDER_END_HANDLE_CLASS);
    this._updateHandleAriaLabels();
  },
  _startHandler: function _startHandler(args) {
    var e = args.event;
    var $range = this._$range;
    var rangeWidth = (0, _size.getWidth)($range);
    var eventOffsetX = (0, _index.eventData)(e).x - this._$bar.offset().left;
    var startHandleX = $range.position().left;
    var endHandleX = $range.position().left + rangeWidth;
    var rtlEnabled = this.option('rtlEnabled');
    var startHandleIsClosest = (rtlEnabled ? -1 : 1) * ((startHandleX + endHandleX) / 2 - eventOffsetX) > 0;
    this._capturedHandle = startHandleIsClosest ? this._$handleStart : this._$handleEnd;
    this.callBase(args);
  },
  _updateHandleAriaLabels: function _updateHandleAriaLabels() {
    this.setAria('label', _message.default.getFormatter('dxRangeSlider-ariaFrom')(this.option('dxRangeSlider-ariaFrom')), this._$handleStart);
    this.setAria('label', _message.default.getFormatter('dxRangeSlider-ariaTill')(this.option('dxRangeSlider-ariaTill')), this._$handleEnd);
  },
  _activeHandle: function _activeHandle() {
    return this._capturedHandle;
  },
  _updateHandlePosition: function _updateHandlePosition(e) {
    var rtlEnabled = this.option('rtlEnabled');
    var offsetDirection = rtlEnabled ? -1 : 1;
    var max = this.option('max');
    var min = this.option('min');
    var newRatio = this._startOffset + offsetDirection * e.event.offset / this._swipePixelRatio();
    newRatio = newRatio.toPrecision(12); // NOTE: android 2.3 has problems with mathematics

    var newValue = newRatio * (max - min) + min;
    this._updateSelectedRangePosition(newRatio, newRatio);
    _ui.default.getInstance(this._activeHandle())['fitTooltipPosition'];
    this._changeValueOnSwipe(newRatio);
    var _this$_getActualValue = this._getActualValue(),
      _this$_getActualValue2 = _slicedToArray(_this$_getActualValue, 2),
      startValue = _this$_getActualValue2[0],
      endValue = _this$_getActualValue2[1];
    var $nextHandle;
    if (startValue === endValue) {
      if (newValue < startValue) {
        $nextHandle = this._$handleStart;
      } else {
        $nextHandle = this._$handleEnd;
      }
      _events_engine.default.trigger($nextHandle, 'focus');
      if ($nextHandle && $nextHandle !== this._capturedHandle) {
        this._updateSelectedRangePosition((startValue - min) / (max - min), (endValue - min) / (max - min));
        this._toggleActiveState(this._activeHandle(), false);
        this._toggleActiveState($nextHandle, true);
        this._capturedHandle = $nextHandle;
      }
      this._updateSelectedRangePosition(newRatio, newRatio);
      this._changeValueOnSwipe(newRatio);
    }
  },
  _updateSelectedRangePosition: function _updateSelectedRangePosition(leftRatio, rightRatio) {
    var rtlEnabled = this.option('rtlEnabled');
    var moveRight = this._capturedHandle === this._$handleStart && rtlEnabled || this._capturedHandle === this._$handleEnd && !rtlEnabled;
    var prop = moveRight ? 'right' : 'left';
    if (rtlEnabled ^ moveRight) {
      this._$range.css(prop, 100 - rightRatio * 100 + '%');
    } else {
      this._$range.css(prop, leftRatio * 100 + '%');
    }
  },
  _setValueOnSwipe: function _setValueOnSwipe(value) {
    var option = this._capturedHandle === this._$handleStart ? 'start' : 'end';
    var _this$_getActualValue3 = this._getActualValue(),
      _this$_getActualValue4 = _slicedToArray(_this$_getActualValue3, 2),
      start = _this$_getActualValue4[0],
      end = _this$_getActualValue4[1];
    var max = this.option('max');
    var min = this.option('min');
    start = Math.min(Math.max(start, min), max);
    end = Math.min(Math.max(end, min), max);
    if (option === 'start') {
      start = value > end ? end : value;
    } else {
      end = value < start ? start : value;
    }
    if (this.option('valueChangeMode') === 'onHandleMove') {
      this.option('value', [start, end]);
    } else {
      this._actualValue = [start, end];
      this._renderValue();
    }
  },
  _renderValue: function _renderValue() {
    var _this$_getActualValue5 = this._getActualValue(),
      _this$_getActualValue6 = _slicedToArray(_this$_getActualValue5, 2),
      valStart = _this$_getActualValue6[0],
      valEnd = _this$_getActualValue6[1];
    var min = this.option('min');
    var max = this.option('max');
    var rtlEnabled = this.option('rtlEnabled');
    valStart = Math.max(min, Math.min(valStart, max));
    valEnd = Math.max(valStart, Math.min(valEnd, max));
    if (this.option('valueChangeMode') === 'onHandleMove') {
      this._setOptionWithoutOptionChange('start', valStart);
      this._setOptionWithoutOptionChange('end', valEnd);
      this._setOptionWithoutOptionChange('value', [valStart, valEnd]);
    }
    this._$submitStartElement.val((0, _common.applyServerDecimalSeparator)(valStart));
    this._$submitEndElement.val((0, _common.applyServerDecimalSeparator)(valEnd));
    var ratio1 = max === min ? 0 : (valStart - min) / (max - min);
    var ratio2 = max === min ? 0 : (valEnd - min) / (max - min);
    var startOffset = parseFloat((ratio1 * 100).toPrecision(12)) + '%';
    var endOffset = parseFloat(((1 - ratio2) * 100).toPrecision(12)) + '%';
    !this._needPreventAnimation && this._setRangeStyles({
      right: rtlEnabled ? startOffset : endOffset,
      left: rtlEnabled ? endOffset : startOffset
    });
    _ui.default.getInstance(this._$handleStart).option('value', valStart);
    _ui.default.getInstance(this._$handleEnd).option('value', valEnd);
  },
  _callHandlerMethod: function _callHandlerMethod(name, args) {
    _ui.default.getInstance(this._$handleStart)[name](args);
    _ui.default.getInstance(this._$handleEnd)[name](args);
  },
  _setValueOption: function _setValueOption() {
    var start = this.option('start');
    var end = this.option('end');
    this.option('value', [start, end]);
  },
  _rangesAreEqual(firstRange, secondRange) {
    return firstRange[0] === secondRange[0] && firstRange[1] === secondRange[1];
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'value':
        {
          if (this._rangesAreEqual(args.value, args.previousValue)) {
            break;
          }
          this._setOptionWithoutOptionChange('start', args.value[0]);
          this._setOptionWithoutOptionChange('end', args.value[1]);
          this._renderValue();
          var start = this.option('start');
          var end = this.option('end');
          var isDirty = !this._rangesAreEqual(this._initialValue, args.value);
          this.option('isDirty', isDirty);
          this._createActionByOption('onValueChanged', {
            excludeValidators: ['disabled', 'readOnly']
          })({
            start: start,
            end: end,
            value: [start, end],
            event: this._valueChangeEventInstance,
            previousValue: args.previousValue
          });
          this.validationRequest.fire({
            value: [start, end],
            editor: this
          });
          this._saveValueChangeEvent(undefined);
          break;
        }
      case 'start':
      case 'end':
        this._setValueOption();
        break;
      case 'startName':
        this._$submitStartElement.attr('name', args.value);
        break;
      case 'endName':
        this._$submitEndElement.attr('name', args.value);
        break;
      case 'name':
        break;
      default:
        this.callBase(args);
    }
  }
});
(0, _component_registrator.default)('dxRangeSlider', RangeSlider);
var _default = RangeSlider;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
