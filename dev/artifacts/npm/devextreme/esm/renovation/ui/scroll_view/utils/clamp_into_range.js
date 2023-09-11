/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/clamp_into_range.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function clampIntoRange(value, max, min) {
  return Math.max(Math.min(value, max), min);
}
