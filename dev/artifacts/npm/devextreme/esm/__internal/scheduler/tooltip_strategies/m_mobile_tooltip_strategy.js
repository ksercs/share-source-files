/**
* DevExtreme (esm/__internal/scheduler/tooltip_strategies/m_mobile_tooltip_strategy.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getHeight, getOuterHeight, getWidth } from '../../../core/utils/size';
import { getWindow } from '../../../core/utils/window';
import Overlay from '../../../ui/overlay/ui.overlay';
import { TooltipStrategyBase } from './m_tooltip_strategy_base';
var SLIDE_PANEL_CLASS_NAME = 'dx-scheduler-overlay-panel';
var MAX_TABLET_OVERLAY_HEIGHT_FACTOR = 0.9;
var MAX_HEIGHT = {
  PHONE: 250,
  TABLET: '90%',
  DEFAULT: 'auto'
};
var MAX_WIDTH = {
  PHONE: '100%',
  TABLET: '80%'
};
var animationConfig = {
  show: {
    type: 'slide',
    duration: 300,
    from: {
      position: {
        my: 'top',
        at: 'bottom',
        of: getWindow()
      }
    },
    to: {
      position: {
        my: 'center',
        at: 'center',
        of: getWindow()
      }
    }
  },
  hide: {
    type: 'slide',
    duration: 300,
    to: {
      position: {
        my: 'top',
        at: 'bottom',
        of: getWindow()
      }
    },
    from: {
      position: {
        my: 'center',
        at: 'center',
        of: getWindow()
      }
    }
  }
};
var createPhoneDeviceConfig = listHeight => ({
  shading: false,
  width: MAX_WIDTH.PHONE,
  height: listHeight > MAX_HEIGHT.PHONE ? MAX_HEIGHT.PHONE : MAX_HEIGHT.DEFAULT,
  position: {
    my: 'bottom',
    at: 'bottom',
    of: getWindow()
  }
});
var createTabletDeviceConfig = listHeight => {
  var currentMaxHeight = getHeight(getWindow()) * MAX_TABLET_OVERLAY_HEIGHT_FACTOR;
  return {
    shading: true,
    width: MAX_WIDTH.TABLET,
    height: listHeight > currentMaxHeight ? MAX_HEIGHT.TABLET : MAX_HEIGHT.DEFAULT,
    position: {
      my: 'center',
      at: 'center',
      of: getWindow()
    }
  };
};
export class MobileTooltipStrategy extends TooltipStrategyBase {
  _shouldUseTarget() {
    return false;
  }
  _onShowing() {
    var isTabletWidth = getWidth(getWindow()) > 700;
    this._tooltip.option('height', MAX_HEIGHT.DEFAULT);
    var listHeight = getOuterHeight(this._list.$element());
    this._tooltip.option(isTabletWidth ? createTabletDeviceConfig(listHeight) : createPhoneDeviceConfig(listHeight));
  }
  _createTooltip(target, dataList) {
    var element = this._createTooltipElement(SLIDE_PANEL_CLASS_NAME);
    return this._options.createComponent(element, Overlay, {
      target: getWindow(),
      hideOnOutsideClick: true,
      animation: animationConfig,
      onShowing: () => this._onShowing(),
      onShown: this._onShown.bind(this),
      contentTemplate: this._getContentTemplate(dataList),
      wrapperAttr: {
        class: SLIDE_PANEL_CLASS_NAME
      }
    });
  }
}
