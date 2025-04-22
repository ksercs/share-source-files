/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/row.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowDefaultProps = exports.Row = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _index2 = require("../../utils/index");
var _virtual_cell = require("./virtual_cell");
const MAX_COL_SPAN = 1000;
const RowDefaultProps = exports.RowDefaultProps = {
  className: '',
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  isHeaderRow: false
};
class Row extends _index.BaseInfernoComponent {
  render() {
    const {
      children,
      className,
      isHeaderRow,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      styles
    } = this.props;
    const hasLeftVirtualCell = !!leftVirtualCellCount;
    const hasRightVirtualCell = !!rightVirtualCellCount;
    return (0, _inferno.createVNode)(1, "tr", className, [hasLeftVirtualCell && leftVirtualCellCount != null && (0, _index2.splitNumber)(leftVirtualCellCount, MAX_COL_SPAN).map(colSpan => (0, _inferno.createComponentVNode)(2, _virtual_cell.VirtualCell, {
      "width": leftVirtualCellWidth * (colSpan / leftVirtualCellCount),
      "colSpan": colSpan,
      "isHeaderCell": isHeaderRow ?? _virtual_cell.VirtualCellDefaultProps.isHeaderCell
    })), children, hasRightVirtualCell && rightVirtualCellCount != null && (0, _index2.splitNumber)(rightVirtualCellCount, MAX_COL_SPAN).map(colSpan => (0, _inferno.createComponentVNode)(2, _virtual_cell.VirtualCell, {
      "width": rightVirtualCellWidth * (colSpan / rightVirtualCellCount),
      "colSpan": colSpan,
      "isHeaderCell": isHeaderRow ?? _virtual_cell.VirtualCellDefaultProps.isHeaderCell
    }))], 0, {
      "style": (0, _index.normalizeStyles)(styles)
    });
  }
}
exports.Row = Row;
Row.defaultProps = RowDefaultProps;
