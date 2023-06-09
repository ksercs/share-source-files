/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_offset_distance.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { ensureDefined } from '../../../../core/utils/common';
export function getOffsetDistance(targetLocation, scrollOffset) {
  return {
    top: ensureDefined(targetLocation.top, scrollOffset.top) - scrollOffset.top,
    left: ensureDefined(targetLocation.left, scrollOffset.left) - scrollOffset.left
  };
}
