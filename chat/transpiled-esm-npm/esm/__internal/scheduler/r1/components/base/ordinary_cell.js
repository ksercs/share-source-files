import { createVNode } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from '../../../../core/r1/runtime/inferno/index';
export const OrdinaryCellDefaultProps = {};
export class OrdinaryCell extends BaseInfernoComponent {
  render() {
    const {
      children,
      className,
      colSpan,
      styles
    } = this.props;
    return createVNode(1, "td", className, children, 0, {
      "style": normalizeStyles(styles),
      "colspan": colSpan
    });
  }
}
OrdinaryCell.defaultProps = OrdinaryCellDefaultProps;