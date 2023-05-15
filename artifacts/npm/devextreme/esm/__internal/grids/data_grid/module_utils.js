/**
* DevExtreme (esm/__internal/grids/data_grid/module_utils.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import gridCoreUtils from '../../../ui/grid_core/ui.grid_core.utils';
// @ts-expect-error
import { normalizeSortingInfo } from '../../../data/utils';
export function createGroupFilter(path, storeLoadOptions) {
  var groups = normalizeSortingInfo(storeLoadOptions.group);
  var filter = [];
  for (var i = 0; i < path.length; i++) {
    filter.push([groups[i].selector, '=', path[i]]);
  }
  if (storeLoadOptions.filter) {
    filter.push(storeLoadOptions.filter);
  }
  return gridCoreUtils.combineFilters(filter);
}
