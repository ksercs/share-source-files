/**
* DevExtreme (cjs/renovation/ui/scroll_view/utils/normalize_offset_left.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.normalizeOffsetLeft = normalizeOffsetLeft;
function normalizeOffsetLeft(scrollLeft, maxLeftOffset, rtlEnabled) {
  if (rtlEnabled) {
    return maxLeftOffset + scrollLeft;
  }
  return scrollLeft;
}
