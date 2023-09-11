/**
* DevExtreme (esm/ui/tooltip/tooltip.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import Guid from '../../core/guid';
import registerComponent from '../../core/component_registrator';
import { extend } from '../../core/utils/extend';
import Popover from '../popover/ui.popover';
var TOOLTIP_CLASS = 'dx-tooltip';
var TOOLTIP_WRAPPER_CLASS = 'dx-tooltip-wrapper';
import { isWindow } from '../../core/utils/type';

// STYLE tooltip

var Tooltip = Popover.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      /**
      * @name dxTooltipOptions.toolbarItems
      * @hidden
      */
      toolbarItems: [],
      /**
      * @name dxTooltipOptions.showCloseButton
      * @hidden
      */
      showCloseButton: false,
      /**
      * @name dxTooltipOptions.enableBodyScroll
      * @hidden
      */
      enableBodyScroll: true,
      /**
      * @name dxTooltipOptions.showTitle
      * @hidden
      */
      showTitle: false,
      /**
      * @name dxTooltipOptions.title
      * @hidden
      */
      title: null,
      /**
      * @name dxTooltipOptions.titleTemplate
      * @type template
      * @hidden
      */
      titleTemplate: null,
      /**
      * @name dxTooltipOptions.onTitleRendered
      * @hidden
      * @action
      */
      onTitleRendered: null,
      bottomTemplate: null,
      preventScrollEvents: false,
      propagateOutsideClick: true
    });
  },
  _render: function _render() {
    this.$element().addClass(TOOLTIP_CLASS);
    this.$wrapper().addClass(TOOLTIP_WRAPPER_CLASS);
    this.callBase();
  },
  _renderContent: function _renderContent() {
    this.callBase();
    this._toggleAriaAttributes();
  },
  _toggleAriaDescription: function _toggleAriaDescription(showing) {
    var $target = $(this.option('target'));
    var label = showing ? this._contentId : undefined;
    if (!isWindow($target.get(0))) {
      this.setAria('describedby', label, $target);
    }
  },
  _toggleAriaAttributes: function _toggleAriaAttributes() {
    this._contentId = "dx-".concat(new Guid());
    this.$overlayContent().attr({
      'id': this._contentId
    });
    this._toggleAriaDescription(true);
  }
});
registerComponent('dxTooltip', Tooltip);
export default Tooltip;
