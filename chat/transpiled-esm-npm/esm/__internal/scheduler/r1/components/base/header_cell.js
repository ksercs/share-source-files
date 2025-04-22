import { createVNode } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from '../../../../core/r1/runtime/inferno/index';
import { OrdinaryCellDefaultProps } from './ordinary_cell';
export class HeaderCell extends BaseInfernoComponent {
  render() {
    const {
      children,
      className,
      colSpan,
      styles
    } = this.props;
    return createVNode(1, "th", className, children, 0, {
      "style": normalizeStyles(styles),
      "colspan": colSpan
    });
  }
}
HeaderCell.defaultProps = OrdinaryCellDefaultProps;