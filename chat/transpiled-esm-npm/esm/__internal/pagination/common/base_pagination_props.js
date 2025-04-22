import _extends from "@babel/runtime/helpers/esm/extends";
import { BaseWidgetDefaultProps } from '../../core/r1/base_props';
import messageLocalization from '../../../common/core/localization/message';
export const BasePaginationDefaultProps = _extends({}, BaseWidgetDefaultProps, {
  isGridCompatibilityMode: false,
  showInfo: false,
  displayMode: 'adaptive',
  maxPagesCount: 10,
  pageCount: 1,
  visible: true,
  hasKnownLastPage: true,
  pagesNavigatorVisible: 'auto',
  showPageSizeSelector: true,
  allowedPageSizes: [5, 10],
  showNavigationButtons: false,
  itemCount: 1,
  label: messageLocalization.format('dxPagination-ariaLabel')
});