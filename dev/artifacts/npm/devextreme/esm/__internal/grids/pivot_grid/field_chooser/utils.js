/**
* DevExtreme (esm/__internal/grids/pivot_grid/field_chooser/utils.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { SORT_ORDER } from './const';
export const reverseSortOrder = (sortOrder) => (sortOrder === SORT_ORDER.descending
    ? SORT_ORDER.ascending
    : SORT_ORDER.descending);
