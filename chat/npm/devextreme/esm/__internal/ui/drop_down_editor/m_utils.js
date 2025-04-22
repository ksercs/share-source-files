/**
* DevExtreme (esm/__internal/ui/drop_down_editor/m_utils.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getOuterWidth } from '../../../core/utils/size';
import { hasWindow } from '../../../core/utils/window';
const getElementWidth = function ($element) {
  if (hasWindow()) {
    return getOuterWidth($element);
  }
};
const getSizeValue = function (size) {
  if (size === null) {
    size = undefined;
  }
  if (typeof size === 'function') {
    size = size();
  }
  return size;
};
export { getElementWidth, getSizeValue };
