/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/ordinary_cell.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
