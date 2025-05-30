/**
* DevExtreme (cjs/renovation/ui/scroll_view/utils/get_scroll_top_max.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getScrollTopMax = getScrollTopMax;
function getScrollTopMax(element) {
  return element.scrollHeight - element.clientHeight;
}
