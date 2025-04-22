"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _array_query = _interopRequireDefault(require("../../common/data/array_query"));
var _utils = require("../../common/data/utils");
var _common = require("../../core/utils/common");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-expect-error

function multiLevelGroup(query, groupInfo) {
  query = query.groupBy(groupInfo[0].selector);
  if (groupInfo.length > 1) {
    query = query.select(g => (0, _extend.extend)({}, g, {
      // @ts-expect-error
      items: multiLevelGroup((0, _array_query.default)(g.items), groupInfo.slice(1)).toArray()
    }));
  }
  return query;
}
function arrangeSortingInfo(groupInfo, sortInfo) {
  const filteredGroup = [];
  (0, _iterator.each)(groupInfo, (_, group) => {
    const collision = (0, _common.grep)(sortInfo, sort => group.selector === sort.selector);
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
    group = (0, _utils.normalizeSortingInfo)(group);
    group.keepInitialKeyOrder = !!options.group.keepInitialKeyOrder;
  }
  if (sort || group) {
    sort = (0, _utils.normalizeSortingInfo)(sort || []);
    if (group && !group.keepInitialKeyOrder) {
      sort = arrangeSortingInfo(group, sort);
    }
    (0, _iterator.each)(sort, function (index) {
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
var _default = exports.default = {
  multiLevelGroup,
  arrangeSortingInfo,
  queryByOptions
};