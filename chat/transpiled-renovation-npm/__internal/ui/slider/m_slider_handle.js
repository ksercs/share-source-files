"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _m_slider_tooltip = _interopRequireDefault(require("../../ui/slider/m_slider_tooltip"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SLIDER_HANDLE_CLASS = 'dx-slider-handle';
class SliderHandle extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: false,
      value: 0,
      tooltip: {
        enabled: false,
        format: value => value,
        position: 'top',
        showMode: 'onHover'
      }
    });
  }
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass(SLIDER_HANDLE_CLASS);
    this.setAria({
      role: 'slider',
      // eslint-disable-next-line spellcheck/spell-checker
      valuenow: this.option('value'),
      label: 'Slider'
    });
  }
  _render() {
    super._render();
    this._renderTooltip();
  }
  _renderTooltip() {
    const {
      tooltip,
      value
    } = this.option();
    const {
      position,
      format,
      enabled,
      showMode
    } = tooltip ?? {};
    const $sliderTooltip = (0, _renderer.default)('<div>');
    this._sliderTooltip = this._createComponent($sliderTooltip, _m_slider_tooltip.default, {
      target: this.$element(),
      container: $sliderTooltip,
      position,
      visible: enabled,
      showMode,
      format,
      value
    });
  }
  _clean() {
    super._clean();
    this._sliderTooltip = null;
  }
  _updateTooltipOptions(args) {
    var _this$_sliderTooltip;
    const tooltipOptions = _widget.default.getOptionsFromContainer(args);
    // @ts-expect-error ts-error
    this._setWidgetOption('_sliderTooltip', [tooltipOptions]);
    (_this$_sliderTooltip = this._sliderTooltip) === null || _this$_sliderTooltip === void 0 || _this$_sliderTooltip.option('visible', tooltipOptions.enabled);
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'value':
        {
          var _this$_sliderTooltip2;
          (_this$_sliderTooltip2 = this._sliderTooltip) === null || _this$_sliderTooltip2 === void 0 || _this$_sliderTooltip2.option('value', value);
          this.setAria('valuenow', value);
          break;
        }
      case 'tooltip':
        this._updateTooltipOptions(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  updateTooltipPosition() {
    var _this$_sliderTooltip3;
    (_this$_sliderTooltip3 = this._sliderTooltip) === null || _this$_sliderTooltip3 === void 0 || _this$_sliderTooltip3.updatePosition();
  }
  repaint() {
    var _this$_sliderTooltip4;
    (_this$_sliderTooltip4 = this._sliderTooltip) === null || _this$_sliderTooltip4 === void 0 || _this$_sliderTooltip4.repaint();
  }
}
var _default = exports.default = SliderHandle;