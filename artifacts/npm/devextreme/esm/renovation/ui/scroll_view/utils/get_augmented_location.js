/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_augmented_location.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { isNumeric } from '../../../../core/utils/type';
export function getAugmentedLocation(location) {
  if (isNumeric(location)) {
    return {
      left: location,
      top: location
    };
  }
  return _extends({
    top: 0,
    left: 0
  }, location);
}
