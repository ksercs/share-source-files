/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/table.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from '../../../../core/r1/runtime/inferno/index';
import { renderUtils } from '../../utils/index';
import { VirtualRow, VirtualRowDefaultProps } from './virtual_row';
export const TableDefaultProps = {
  topVirtualRowHeight: 0,
  bottomVirtualRowHeight: 0,
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  virtualCellsCount: 0
};
export class Table extends BaseInfernoComponent {
  getResultStyles() {
    const {
      height,
      width,
      styles
    } = this.props;
    const heightAdded = renderUtils.addHeightToStyle(height, styles);
    return renderUtils.addWidthToStyle(width, heightAdded);
  }
  render() {
    const {
      className,
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      children,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      tableRef,
      virtualCellsCount
    } = this.props;
    const hasTopVirtualRow = !!topVirtualRowHeight;
    const hasBottomVirtualRow = !!bottomVirtualRowHeight;
    const resultStyles = this.getResultStyles();
    return createVNode(1, "table", className, createVNode(1, "tbody", null, [hasTopVirtualRow && createComponentVNode(2, VirtualRow, {
      "height": topVirtualRowHeight,
      "cellsCount": virtualCellsCount ?? VirtualRowDefaultProps.cellsCount,
      "leftVirtualCellWidth": leftVirtualCellWidth ?? VirtualRowDefaultProps.leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth ?? VirtualRowDefaultProps.rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount
    }), children, hasBottomVirtualRow && createComponentVNode(2, VirtualRow, {
      "height": bottomVirtualRowHeight,
      "cellsCount": virtualCellsCount ?? VirtualRowDefaultProps.cellsCount,
      "leftVirtualCellWidth": leftVirtualCellWidth ?? VirtualRowDefaultProps.leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth ?? VirtualRowDefaultProps.rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount
    })], 0), 2, {
      "style": normalizeStyles(resultStyles),
      "aria-hidden": true
    }, null, tableRef);
  }
}
Table.defaultProps = TableDefaultProps;
