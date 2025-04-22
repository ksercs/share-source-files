/**
* DevExtreme (esm/__internal/ui/slider/m_slider_tooltip.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import numberLocalization from '../../../common/core/localization/number';
import $ from '../../../core/renderer';
import Tooltip from '../../ui/m_tooltip';
import { SliderTooltipPositionController } from './m_slider_tooltip_position_controller';
// NOTE: Visibility is contolled by the 'visible' option and 'dx-slider-tooltip-visible-on-hover' class.
const SLIDER_TOOLTIP_VISIBILITY_CLASS = 'dx-slider-tooltip-visible-on-hover';
class SliderTooltip extends Tooltip {
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
    const formattedText = numberLocalization.format(value ?? 0, format);
    this.$content().text(formattedText);
    this._renderPosition();
  }
  _toggleShowModeClass() {
    const {
      showMode,
      target
    } = this.option();
    const isHoverMode = showMode === 'onHover';
    const $sliderHandle = $(target);
    $sliderHandle.toggleClass(SLIDER_TOOLTIP_VISIBILITY_CLASS, isHoverMode);
  }
  _initPositionController() {
    this._positionController = new SliderTooltipPositionController(this._getPositionControllerConfig());
  }
  _attachToMarkup(enabled) {
    const {
      target
    } = this.option();
    const $sliderHandle = $(target);
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
export default SliderTooltip;
