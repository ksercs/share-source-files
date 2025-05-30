/**
* DevExtreme (esm/ui/slider/ui.slider_tooltip.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Tooltip from '../tooltip';
import { extend } from '../../core/utils/extend';
import { SliderTooltipPositionController } from './slider_tooltip_position_controller';
import numberLocalization from '../../localization/number';

// NOTE: Visibility is contolled by the 'visible' option and 'dx-slider-tooltip-visible-on-hover' class.
var SLIDER_TOOLTIP_VISIBILITY_CLASS = 'dx-slider-tooltip-visible-on-hover';
var SliderTooltip = Tooltip.inherit({
  _getDefaultOptions() {
    return extend(this.callBase(), {
      visible: false,
      position: 'top',
      hideOnOutsideClick: false,
      hideTopOverlayHandler: null,
      hideOnParentScroll: false,
      animation: null,
      arrowPosition: null,
      templatesRenderAsynchronously: false,
      _fixWrapperPosition: false,
      useResizeObserver: false,
      showMode: 'onHover',
      format: value => value,
      value: 0
    });
  },
  _initMarkup() {
    this.callBase();
    this._attachToMarkup(this.option('visible'));
    this._toggleShowModeClass();
  },
  _renderContent() {
    this.callBase();
    this._renderContentText();
  },
  _toggleAriaAttributes() {},
  _renderContentText() {
    var {
      value,
      format
    } = this.option();
    var formattedText = numberLocalization.format(value !== null && value !== void 0 ? value : 0, format);
    this.$content().text(formattedText);
    this._renderPosition();
  },
  _toggleShowModeClass() {
    var isHoverMode = this.option('showMode') === 'onHover';
    var $sliderHandle = this.option('target');
    $sliderHandle.toggleClass(SLIDER_TOOLTIP_VISIBILITY_CLASS, isHoverMode);
  },
  _initPositionController() {
    this._positionController = new SliderTooltipPositionController(this._getPositionControllerConfig());
  },
  _attachToMarkup(enabled) {
    var $sliderHandle = this.option('target');
    enabled ? this.$element().appendTo($sliderHandle) : this.$element().detach();
  },
  _optionChanged(args) {
    var {
      name,
      value
    } = args;
    switch (name) {
      case 'visible':
        this._attachToMarkup(value);
        this.callBase(args);
        break;
      case 'showMode':
        this._toggleShowModeClass();
        break;
      case 'format':
      case 'value':
        this._renderContentText();
        break;
      default:
        this.callBase(args);
        break;
    }
  },
  updatePosition() {
    this._renderPosition();
  }
});
export default SliderTooltip;
