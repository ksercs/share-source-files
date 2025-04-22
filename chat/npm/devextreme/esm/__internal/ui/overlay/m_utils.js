/**
* DevExtreme (esm/__internal/ui/overlay/m_utils.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { getInnerHeight, getOuterHeight } from '../../../core/utils/size';
import { isNumeric } from '../../../core/utils/type';
import windowUtils from '../../core/utils/m_window';
const WINDOW_HEIGHT_PERCENT = 0.9;
export const getElementMaxHeightByWindow = ($element, startLocation) => {
  const $window = $(windowUtils.getWindow());
  // @ts-expect-error
  const {
    top: elementOffset
  } = $element.offset();
  let actualOffset;
  if (isNumeric(startLocation)) {
    if (startLocation < elementOffset) {
      return elementOffset - startLocation;
    }
    // @ts-expect-error
    actualOffset = getInnerHeight($window) - startLocation + $window.scrollTop();
  } else {
    // @ts-expect-error
    const offsetTop = elementOffset - $window.scrollTop();
    const offsetBottom = getInnerHeight($window) - offsetTop - getOuterHeight($element);
    actualOffset = Math.max(offsetTop, offsetBottom);
  }
  return actualOffset * WINDOW_HEIGHT_PERCENT;
};
