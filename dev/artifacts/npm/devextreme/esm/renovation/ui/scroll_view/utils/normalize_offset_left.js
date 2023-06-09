/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/normalize_offset_left.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function normalizeOffsetLeft(scrollLeft, maxLeftOffset, rtlEnabled) {
  if (rtlEnabled) {
    return maxLeftOffset + scrollLeft;
  }
  return scrollLeft;
}
