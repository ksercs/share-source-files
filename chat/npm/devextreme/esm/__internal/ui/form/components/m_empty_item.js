/**
* DevExtreme (esm/__internal/ui/form/components/m_empty_item.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
export const FIELD_EMPTY_ITEM_CLASS = 'dx-field-empty-item';
export function renderEmptyItem(_ref) {
  let {
    $parent,
    rootElementCssClassList
  } = _ref;
  return $('<div>').addClass(FIELD_EMPTY_ITEM_CLASS).html('&nbsp;').addClass(rootElementCssClassList.join(' ')).appendTo($parent);
}
