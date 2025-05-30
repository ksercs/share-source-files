"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGroupFilter = createGroupFilter;
var _utils = require("../../../common/data/utils");
var _m_utils = _interopRequireDefault(require("../../grids/grid_core/m_utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createGroupFilter(path, storeLoadOptions) {
  const groups = (0, _utils.normalizeSortingInfo)(storeLoadOptions.group);
  const filter = [];
  for (let i = 0; i < path.length; i++) {
    filter.push([groups[i].selector, '=', path[i]]);
  }
  if (storeLoadOptions.filter) {
    filter.push(storeLoadOptions.filter);
  }
  return _m_utils.default.combineFilters(filter);
}