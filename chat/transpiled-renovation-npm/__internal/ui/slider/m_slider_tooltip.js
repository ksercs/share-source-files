"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _number = _interopRequireDefault(require("../../../common/core/localization/number"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _m_tooltip = _interopRequireDefault(require("../../ui/m_tooltip"));
var _m_slider_tooltip_position_controller = require("./m_slider_tooltip_position_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// NOTE: Visibility is contolled by the 'visible' option and 'dx-slider-tooltip-visible-on-hover' class.
const SLIDER_TOOLTIP_VISIBILITY_CLASS = 'dx-slider-tooltip-visible-on-hover';
class SliderTooltip extends _m_tooltip.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      visible: false,
      position: 'top',
      hideOnOutsideClick: false,
      hideTopOverlayHandler: null,
      hideOnParentScroll: false,
      // @ts-expect-error ts-error
      animation: null,
      // @ts-expect-error ts-error
      arrowPosition: null,
      templatesRenderAsynchronously: false,
      _fixWrapperPosition: false,
      useResizeObserver: false,
      showMode: 'onHover',
      format: value => value,
      value: 0
    });
  }
  _initMarkup() {
    super._initMarkup();
    const {
      visible
    } = this.option();
    this._attachToMarkup(visible);
    this._toggleShowModeClass();
  }
  _renderContent() {
    super._renderContent();
    this._renderContentText();
  }
  // eslint-disable-next-line class-methods-use-this
  _toggleAriaAttributes() {}
  _renderContentText() {
    const {
      value,
      format
    } = this.option();
    const formattedText = _number.default.format(value ?? 0, format);
    this.$content().text(formattedText);
    this._renderPosition();
  }
  _toggleShowModeClass() {
    const {
      showMode,
      target
    } = this.option();
    const isHoverMode = showMode === 'onHover';
    const $sliderHandle = (0, _renderer.default)(target);
    $sliderHandle.toggleClass(SLIDER_TOOLTIP_VISIBILITY_CLASS, isHoverMode);
  }
  _initPositionController() {
    this._positionController = new _m_slider_tooltip_position_controller.SliderTooltipPositionController(this._getPositionControllerConfig());
  }
  _attachToMarkup(enabled) {
    const {
      target
    } = this.option();
    const $sliderHandle = (0, _renderer.default)(target);
    if (enabled) {
      this.$element().appendTo($sliderHandle);
    } else {
      this.$element().detach();
    }
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'visible':
        this._attachToMarkup(value);
        super._optionChanged(args);
        break;
      case 'showMode':
        this._toggleShowModeClass();
        break;
      case 'format':
      case 'value':
        this._renderContentText();
        break;
      default:
        super._optionChanged(args);
        break;
    }
  }
  updatePosition() {
    this._renderPosition();
  }
}
var _default = exports.default = SliderTooltip;