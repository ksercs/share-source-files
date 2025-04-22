"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _index = require("../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _size = require("../../core/utils/size");
var _m_slider = _interopRequireDefault(require("../ui/slider/m_slider"));
var _m_slider_handle = _interopRequireDefault(require("./slider/m_slider_handle"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // @ts-expect-error
const RANGE_SLIDER_CLASS = 'dx-rangeslider';
const RANGE_SLIDER_START_HANDLE_CLASS = `${RANGE_SLIDER_CLASS}-start-handle`;
const RANGE_SLIDER_END_HANDLE_CLASS = `${RANGE_SLIDER_CLASS}-end-handle`;
class RangeSlider extends _m_slider.default {
  _supportedKeys() {
    const {
      rtlEnabled
    } = this.option();
    const that = this;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _changeHandle = function (e, capturedHandle) {
      if (that.option('start') === that.option('end')) {
        that._capturedHandle = capturedHandle;
        e.target = that._capturedHandle;
        // @ts-expect-error ts-error
        _events_engine.default.trigger(that._capturedHandle, 'focus');
      }
    };
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _setHandleValue = function (e, step, sign) {
      const isStart = (0, _renderer.default)(e.target).hasClass(RANGE_SLIDER_START_HANDLE_CLASS);
      const valueOption = isStart ? 'start' : 'end';
      let val = that.option(valueOption);
      step = that._valueStep(step);
      // @ts-expect-error ts-error
      val += sign * (rtlEnabled ? -step : step);
      that.option(valueOption, val);
    };
    const moveHandleRight = function (e, step) {
      _changeHandle(e, rtlEnabled ? that._$handleStart : that._$handleEnd);
      _setHandleValue(e, step, 1);
    };
    const moveHandleLeft = function (e, step) {
      _changeHandle(e, rtlEnabled ? that._$handleEnd : that._$handleStart);
      _setHandleValue(e, step, -1);
    };
    return _extends({}, super._supportedKeys(), {
      leftArrow(e) {
        this._processKeyboardEvent(e);
        moveHandleLeft(e, this.option('step'));
      },
      rightArrow(e) {
        this._processKeyboardEvent(e);
        moveHandleRight(e, this.option('step'));
      },
      pageUp(e) {
        this._processKeyboardEvent(e);
        moveHandleRight(e, this.option('step') * this.option('keyStep'));
      },
      pageDown(e) {
        this._processKeyboardEvent(e);
        moveHandleLeft(e, this.option('step') * this.option('keyStep'));
      },
      home(e) {
        this._processKeyboardEvent(e);
        // @ts-expect-error ts-error
        const isStart = (0, _renderer.default)(e.target).hasClass(RANGE_SLIDER_START_HANDLE_CLASS);
        const valueOption = isStart ? 'start' : 'end';
        const startOption = isStart ? 'min' : 'start';
        const val = this.option(startOption);
        this.option(valueOption, val);
      },
      end(e) {
        this._processKeyboardEvent(e);
        // @ts-expect-error ts-error
        const isStart = (0, _renderer.default)(e.target).hasClass(RANGE_SLIDER_START_HANDLE_CLASS);
        const valueOption = isStart ? 'start' : 'end';
        const endOption = isStart ? 'end' : 'max';
        const val = this.option(endOption);
        this.option(valueOption, val);
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      start: 40,
      end: 60,
      value: [40, 60],
      startName: '',
      endName: ''
    });
  }
  _renderSubmitElement() {
    const {
      startName,
      endName
    } = this.option();
    const $element = this.$element();
    this._$submitStartElement = (0, _renderer.default)('<input>').attr('type', 'hidden')
    // @ts-expect-error ts-error
    .attr('name', startName).appendTo($element);
    this._$submitEndElement = (0, _renderer.default)('<input>').attr('type', 'hidden')
    // @ts-expect-error ts-error
    .attr('name', endName).appendTo($element);
  }
  _initOptions(options) {
    super._initOptions(options);
    const initialValue = this.initialOption('value');
    const {
      value = []
    } = this.option();
    if (value[0] === initialValue[0] && value[1] === initialValue[1]) {
      this.option('value', [this.option('start'), this.option('end')]);
    } else {
      this.option({
        start: value[0],
        end: value[1]
      });
    }
  }
  _initMarkup() {
    this.$element().addClass(RANGE_SLIDER_CLASS);
    super._initMarkup();
  }
  _renderContentImpl() {
    this._callHandlerMethod('repaint');
    super._renderContentImpl();
  }
  _renderHandle() {
    const {
      start,
      end
    } = this.option();
    this._$handleStart = this._renderHandleImpl(start, this._$handleStart);
    this._$handleStart.addClass(RANGE_SLIDER_START_HANDLE_CLASS);
    this._$handleEnd = this._renderHandleImpl(end, this._$handleEnd);
    this._$handleEnd.addClass(RANGE_SLIDER_END_HANDLE_CLASS);
    this._updateHandleAriaLabels();
  }
  _startHandler(args) {
    const e = args.event;
    const $range = this._$range;
    const rangeWidth = (0, _size.getWidth)($range);
    // @ts-expect-error ts-error
    const eventOffsetX = (0, _index.eventData)(e).x - this._$bar.offset().left;
    // @ts-expect-error ts-error
    const startHandleX = $range.position().left;
    // @ts-expect-error ts-error
    const endHandleX = $range.position().left + rangeWidth;
    const rtlEnabled = this.option('rtlEnabled');
    const startHandleIsClosest = (rtlEnabled ? -1 : 1) * ((startHandleX + endHandleX) / 2 - eventOffsetX) > 0;
    this._capturedHandle = startHandleIsClosest ? this._$handleStart : this._$handleEnd;
    super._startHandler(args);
  }
  _updateHandleAriaLabels() {
    // @ts-expect-error ts-error
    this.setAria('label', _message.default.getFormatter('dxRangeSlider-ariaFrom')(this.option('dxRangeSlider-ariaFrom')), this._$handleStart);
    // @ts-expect-error ts-error
    this.setAria('label', _message.default.getFormatter('dxRangeSlider-ariaTill')(this.option('dxRangeSlider-ariaTill')), this._$handleEnd);
  }
  _activeHandle() {
    return this._capturedHandle;
  }
  _updateHandlePosition(e) {
    const rtlEnabled = this.option('rtlEnabled');
    const offsetDirection = rtlEnabled ? -1 : 1;
    const max = this.option('max');
    const min = this.option('min');
    // @ts-expect-error ts-error
    let newRatio = this._startOffset + offsetDirection * e.event.offset / this._swipePixelRatio();
    // @ts-expect-error ts-error
    newRatio = newRatio.toPrecision(12); // NOTE: android 2.3 has problems with mathematics
    // @ts-expect-error ts-error
    const newValue = newRatio * (max - min) + min;
    this._updateSelectedRangePosition(newRatio, newRatio);
    _m_slider_handle.default.getInstance(this._activeHandle()).fitTooltipPosition;
    this._changeValueOnSwipe(newRatio);
    const [startValue, endValue] = this._getActualValue();
    if (startValue === endValue) {
      let $nextHandle = (0, _renderer.default)();
      if (newValue < startValue) {
        $nextHandle = this._$handleStart;
      } else {
        $nextHandle = this._$handleEnd;
      }
      // @ts-expect-error ts-error
      _events_engine.default.trigger($nextHandle, 'focus');
      if ($nextHandle && $nextHandle !== this._capturedHandle) {
        // @ts-expect-error ts-error
        const leftRatio = (startValue - min) / (max - min);
        // @ts-expect-error ts-error
        const rightRatio = (endValue - min) / (max - min);
        this._updateSelectedRangePosition(leftRatio, rightRatio);
        this._toggleActiveState(this._activeHandle(), false);
        this._toggleActiveState($nextHandle, true);
        this._capturedHandle = $nextHandle;
      }
      this._updateSelectedRangePosition(newRatio, newRatio);
      this._changeValueOnSwipe(newRatio);
    }
  }
  _updateSelectedRangePosition(leftRatio, rightRatio) {
    const {
      rtlEnabled
    } = this.option();
    const moveRight = this._capturedHandle === this._$handleStart && rtlEnabled
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    || this._capturedHandle === this._$handleEnd && !rtlEnabled;
    const prop = moveRight ? 'right' : 'left';
    // @ts-expect-error ts-error
    if (rtlEnabled ^ moveRight) {
      this._$range.css(prop, `${100 - rightRatio * 100}%`);
    } else {
      this._$range.css(prop, `${leftRatio * 100}%`);
    }
  }
  _setValueOnSwipe(value) {
    const option = this._capturedHandle === this._$handleStart ? 'start' : 'end';
    let [start, end] = this._getActualValue();
    const {
      max,
      min
    } = this.option();
    // @ts-expect-error ts-error
    start = Math.min(Math.max(start, min), max);
    // @ts-expect-error ts-error
    end = Math.min(Math.max(end, min), max);
    if (option === 'start') {
      start = value > end ? end : value;
    } else {
      end = value < start ? start : value;
    }
    const {
      valueChangeMode
    } = this.option();
    if (valueChangeMode === 'onHandleMove') {
      this.option('value', [start, end]);
    } else {
      this._actualValue = [start, end];
      this._renderValue();
    }
  }
  _renderValue() {
    let [valStart, valEnd] = this._getActualValue();
    const {
      min,
      max
    } = this.option();
    const rtlEnabled = this.option('rtlEnabled');
    // @ts-expect-error ts-error
    valStart = Math.max(min, Math.min(valStart, max));
    // @ts-expect-error ts-error
    valEnd = Math.max(valStart, Math.min(valEnd, max));
    const {
      valueChangeMode
    } = this.option();
    if (valueChangeMode === 'onHandleMove') {
      this._setOptionWithoutOptionChange('start', valStart);
      this._setOptionWithoutOptionChange('end', valEnd);
      this._setOptionWithoutOptionChange('value', [valStart, valEnd]);
    }
    this._$submitStartElement.val((0, _common.applyServerDecimalSeparator)(valStart));
    this._$submitEndElement.val((0, _common.applyServerDecimalSeparator)(valEnd));
    // @ts-expect-error ts-error
    const ratio1 = max === min ? 0 : (valStart - min) / (max - min);
    // @ts-expect-error ts-error
    const ratio2 = max === min ? 0 : (valEnd - min) / (max - min);
    const startOffset = `${parseFloat((ratio1 * 100).toPrecision(12))}%`;
    const endOffset = `${parseFloat(((1 - ratio2) * 100).toPrecision(12))}%`;
    if (!this._needPreventAnimation) {
      this._setRangeStyles({
        right: rtlEnabled ? startOffset : endOffset,
        left: rtlEnabled ? endOffset : startOffset
      });
    }
    _m_slider_handle.default.getInstance(this._$handleStart).option('value', valStart);
    _m_slider_handle.default.getInstance(this._$handleEnd).option('value', valEnd);
  }
  _callHandlerMethod(name, args) {
    _m_slider_handle.default.getInstance(this._$handleStart)[name](args);
    _m_slider_handle.default.getInstance(this._$handleEnd)[name](args);
  }
  _setValueOption() {
    const start = this.option('start');
    const end = this.option('end');
    this.option('value', [start, end]);
  }
  _rangesAreEqual(firstRange, secondRange) {
    return firstRange[0] === secondRange[0] && firstRange[1] === secondRange[1];
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'value':
        {
          if (this._rangesAreEqual(args.value, args.previousValue)) {
            break;
          }
          this._setOptionWithoutOptionChange('start', args.value[0]);
          this._setOptionWithoutOptionChange('end', args.value[1]);
          this._renderValue();
          const start = this.option('start');
          const end = this.option('end');
          const isDirty = !this._rangesAreEqual(this._initialValue, args.value);
          this.option('isDirty', isDirty);
          this._createActionByOption('onValueChanged', {
            excludeValidators: ['disabled', 'readOnly']
          })({
            start,
            end,
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
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxRangeSlider', RangeSlider);
var _default = exports.default = RangeSlider;