/**
* DevExtreme (renovation/ui/scroll_view/utils/get_scrollbar_size.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getScrollbarSize = getScrollbarSize;
function getScrollbarSize(element, direction) {
  if (direction === 'vertical') {
    return element.offsetWidth - element.clientWidth;
  }
  return element.offsetHeight - element.clientHeight;
}
