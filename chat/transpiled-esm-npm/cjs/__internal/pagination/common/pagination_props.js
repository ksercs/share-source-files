"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationDefaultProps = void 0;
var _base_pagination_props = require("./base_pagination_props");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PaginationDefaultProps = exports.PaginationDefaultProps = _extends({}, _base_pagination_props.BasePaginationDefaultProps, {
  pageSize: 5,
  pageIndex: 1,
  pageIndexChangedInternal: () => {},
  pageSizeChangedInternal: () => {}
});