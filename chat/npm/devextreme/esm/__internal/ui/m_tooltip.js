/**
* DevExtreme (esm/__internal/ui/m_tooltip.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../core/component_registrator';
import Guid from '../../core/guid';
import $ from '../../core/renderer';
import { isWindow } from '../../core/utils/type';
import Popover from '../../ui/popover/ui.popover';
// STYLE tooltip
const TOOLTIP_CLASS = 'dx-tooltip';
const TOOLTIP_WRAPPER_CLASS = 'dx-tooltip-wrapper';
class Tooltip extends Popover {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      toolbarItems: [],
      showCloseButton: false,
      enableBodyScroll: true,
      showTitle: false,
      title: null,
      titleTemplate: null,
      onTitleRendered: null,
      bottomTemplate: null,
      preventScrollEvents: false,
      propagateOutsideClick: true
    });
  }
  _render() {
    this.$element().addClass(TOOLTIP_CLASS);
    this.$wrapper().addClass(TOOLTIP_WRAPPER_CLASS);
    super._render();
  }
  _renderContent() {
    super._renderContent();
    this._toggleAriaAttributes();
  }
  _toggleAriaDescription(showing) {
    const {
      target
    } = this.option();
    const $target = $(target);
    const label = showing ? this._contentId : undefined;
    if (!isWindow($target.get(0))) {
      this.setAria('describedby', label, $target);
    }
  }
  _toggleAriaAttributes() {
    this._contentId = `dx-${new Guid()}`;
    // @ts-expect-error ts-error
    this.$overlayContent().attr({
      id: this._contentId
    });
    this._toggleAriaDescription(true);
  }
}
registerComponent('dxTooltip', Tooltip);
export default Tooltip;
