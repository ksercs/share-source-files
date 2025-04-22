import arrayQuery from '../../common/data/array_query';
import { normalizeSortingInfo } from '../../common/data/utils';
// @ts-expect-error
import { grep } from '../../core/utils/common';
import { extend } from '../../core/utils/extend';
import { each } from '../../core/utils/iterator';
function multiLevelGroup(query, groupInfo) {
  query = query.groupBy(groupInfo[0].selector);
  if (groupInfo.length > 1) {
    query = query.select(g => extend({}, g, {
      // @ts-expect-error
      items: multiLevelGroup(arrayQuery(g.items), groupInfo.slice(1)).toArray()
    }));
  }
  return query;
}
function arrangeSortingInfo(groupInfo, sortInfo) {
  const filteredGroup = [];
  each(groupInfo, (_, group) => {
    const collision = grep(sortInfo, sort => group.selector === sort.selector);
    if (collision.length < 1) {
      // @ts-expect-error
      filteredGroup.push(group);
    }
  });
  return filteredGroup.concat(sortInfo);
}
function queryByOptions(query, options, isCountQuery) {
  var _options;
  options = options || {};
  const {
    filter
  } = options;
  if ((_options = options) !== null && _options !== void 0 && _options.langParams) {
    var _query$setLangParams, _query;
    (_query$setLangParams = (_query = query).setLangParams) === null || _query$setLangParams === void 0 || _query$setLangParams.call(_query, options.langParams);
  }
  if (filter) {
    query = query.filter(filter);
  }
  if (isCountQuery) {
    return query;
  }
  let {
    sort
  } = options;
  const {
    select
  } = options;
  let {
    group
  } = options;
  const {
    skip
  } = options;
  const {
    take
  } = options;
  if (group) {
    group = normalizeSortingInfo(group);
    group.keepInitialKeyOrder = !!options.group.keepInitialKeyOrder;
  }
  if (sort || group) {
    sort = normalizeSortingInfo(sort || []);
    if (group && !group.keepInitialKeyOrder) {
      sort = arrangeSortingInfo(group, sort);
    }
    each(sort, function (index) {
      query = query[index ? 'thenBy' : 'sortBy'](this.selector, this.desc, this.compare);
    });
  }
  if (select) {
    query = query.select(select);
  }
  if (group) {
    query = multiLevelGroup(query, group);
  }
  if (take || skip) {
    query = query.slice(skip || 0, take);
  }
  return query;
}
export default {
  multiLevelGroup,
  arrangeSortingInfo,
  queryByOptions
};