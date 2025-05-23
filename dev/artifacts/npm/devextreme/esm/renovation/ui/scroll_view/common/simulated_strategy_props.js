/**
* DevExtreme (esm/renovation/ui/scroll_view/common/simulated_strategy_props.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { BaseScrollableProps } from './base_scrollable_props';
import { isDesktop } from '../utils/get_default_option_value';
export var ScrollableSimulatedProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(BaseScrollableProps), Object.getOwnPropertyDescriptors({
  inertiaEnabled: true,
  useKeyboard: true,
  get showScrollbar() {
    return isDesktop() ? 'onHover' : 'onScroll';
  },
  get scrollByThumb() {
    return isDesktop();
  },
  refreshStrategy: 'simulated'
})));
