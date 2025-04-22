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