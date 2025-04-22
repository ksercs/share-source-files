import { createVNode } from "inferno";
import { BaseInfernoComponent } from '../core/r1/runtime/inferno/index';
import { createRef as infernoCreateRef } from 'inferno';
import { format } from '../../core/utils/string';
import { PaginationDefaultProps } from './common/pagination_props';
import { getLocalizationMessage } from './utils/compatibility_utils';
export const PAGER_INFO_CLASS = 'dx-info';
const InfoTextDefaultProps = {
  pageCount: PaginationDefaultProps.pageCount,
  pageIndex: PaginationDefaultProps.pageIndex,
  itemCount: PaginationDefaultProps.itemCount
};
export class InfoText extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.state = {};
    this.refs = null;
    // eslint-disable-next-line @stylistic/max-len
    this.rootElementRef = infernoCreateRef();
  }
  getInfoText() {
    return this.props.infoText ?? getLocalizationMessage(this.context, 'dxPagination-infoText');
  }
  getText() {
    const {
      pageCount,
      pageIndex,
      itemCount
    } = this.props;
    return format(this.getInfoText(), (pageIndex + 1).toString(), pageCount === null || pageCount === void 0 ? void 0 : pageCount.toString(), itemCount === null || itemCount === void 0 ? void 0 : itemCount.toString());
  }
  render() {
    return createVNode(1, "div", PAGER_INFO_CLASS, this.getText(), 0, null, null, this.props.rootElementRef);
  }
}
InfoText.defaultProps = InfoTextDefaultProps;