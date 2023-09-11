// @ts-expect-error
import { normalizeSortingInfo } from '../../../data/utils';
import gridCoreUtils from '../../grids/grid_core/m_utils';
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