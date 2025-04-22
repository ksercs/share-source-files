/**
* DevExtreme (esm/__internal/ui/slider/m_slider_handle.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../core/renderer';
import Widget from '../../core/widget/widget';
import SliderTooltip from '../../ui/slider/m_slider_tooltip';
const SLIDER_HANDLE_CLASS = 'dx-slider-handle';
class SliderHandle extends Widget {
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
    const $sliderTooltip = $('<div>');
    this._sliderTooltip = this._createComponent($sliderTooltip, SliderTooltip, {
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
    const tooltipOptions = Widget.getOptionsFromContainer(args);
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
export default SliderHandle;
