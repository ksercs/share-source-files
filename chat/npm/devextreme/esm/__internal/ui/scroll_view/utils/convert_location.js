/**
* DevExtreme (esm/__internal/ui/scroll_view/utils/convert_location.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { ensureDefined } from '../../../../core/utils/common';
import { isDefined, isPlainObject } from '../../../../core/utils/type';
import { ScrollDirection } from './scroll_direction';
export function convertToLocation(location, direction) {
  if (isPlainObject(location)) {
    const left = ensureDefined(location.left, location.x);
    const top = ensureDefined(location.top, location.y);
    return {
      left: isDefined(left) ? left : undefined,
      top: isDefined(top) ? top : undefined
    };
  }
  const {
    isVertical,
    isHorizontal
  } = new ScrollDirection(direction);
  return {
    left: isHorizontal && isDefined(location) ? location : undefined,
    top: isVertical && isDefined(location) ? location : undefined
  };
}
