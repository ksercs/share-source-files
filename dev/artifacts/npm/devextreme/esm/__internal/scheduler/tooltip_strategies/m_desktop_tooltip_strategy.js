/**
* DevExtreme (esm/__internal/scheduler/tooltip_strategies/m_desktop_tooltip_strategy.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { touch } from '../../../core/utils/support';
import Tooltip from '../../../ui/tooltip';
import { TooltipStrategyBase } from './m_tooltip_strategy_base';
var APPOINTMENT_TOOLTIP_WRAPPER_CLASS = 'dx-scheduler-appointment-tooltip-wrapper';
var MAX_TOOLTIP_HEIGHT = 200;
export class DesktopTooltipStrategy extends TooltipStrategyBase {
  _prepareBeforeVisibleChanged(dataList) {
    this._tooltip.option('position', {
      my: 'bottom',
      at: 'top',
      boundary: this._getBoundary(dataList),
      offset: this._extraOptions.offset,
      collision: 'fit flipfit'
    });
  }
  _getBoundary(dataList) {
    return this._options.isAppointmentInAllDayPanel(dataList[0].appointment) ? this._options.container : this._options.getScrollableContainer();
  }
  _onShown() {
    super._onShown();
    if (this._extraOptions.isButtonClick) {
      this._list.focus();
      this._list.option('focusedElement', null);
    }
  }
  // @ts-expect-error
  _createListOption(target, dataList) {
    // @ts-expect-error
    var result = super._createListOption(target, dataList);
    // TODO:T724287 this condition is not covered by tests, because touch variable cannot be overridden.
    // In the future, it is necessary to cover the tests
    result.showScrollbar = touch ? 'always' : 'onHover';
    return result;
  }
  _createTooltip(target, dataList) {
    var tooltip = this._createTooltipElement(APPOINTMENT_TOOLTIP_WRAPPER_CLASS);
    return this._options.createComponent(tooltip, Tooltip, {
      target,
      maxHeight: MAX_TOOLTIP_HEIGHT,
      rtlEnabled: this._extraOptions.rtlEnabled,
      onShown: this._onShown.bind(this),
      contentTemplate: this._getContentTemplate(dataList),
      wrapperAttr: {
        class: APPOINTMENT_TOOLTIP_WRAPPER_CLASS
      }
    });
  }
  _onListRender(e) {
    return this._extraOptions.dragBehavior && this._extraOptions.dragBehavior(e);
  }
  _onListItemContextMenu(e) {
    var contextMenuEventArgs = this._options.createEventArgs(e);
    this._options.onItemContextMenu(contextMenuEventArgs);
  }
}
