import _extends from "@babel/runtime/helpers/esm/extends";
import { BasePaginationDefaultProps } from './base_pagination_props';
export const PaginationDefaultProps = _extends({}, BasePaginationDefaultProps, {
  pageSize: 5,
  pageIndex: 1,
  pageIndexChangedInternal: () => {},
  pageSizeChangedInternal: () => {}
});