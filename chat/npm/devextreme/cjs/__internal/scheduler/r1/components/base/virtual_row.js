/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/virtual_row.js)
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
exports.VirtualRowDefaultProps = exports.VirtualRow = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _index2 = require("../../utils/index");
var _row = require("./row");
var _virtual_cell = require("./virtual_cell");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VirtualRowDefaultProps = exports.VirtualRowDefaultProps = _extends({}, _row.RowDefaultProps, {
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  cellsCount: 1
});
class VirtualRow extends _index.BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.virtualCells = null;
  }
  getVirtualCells() {
    if (this.virtualCells !== null) {
      return this.virtualCells;
    }
    const {
      cellsCount
    } = this.props;
    this.virtualCells = [...Array(cellsCount)];
    return this.virtualCells;
  }
  componentWillUpdate(nextProps) {
    if (this.props.cellsCount !== nextProps.cellsCount) {
      this.virtualCells = null;
    }
  }
  render() {
    const {
      className,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      styles,
      height
    } = this.props;
    const classes = `dx-scheduler-virtual-row ${className}`;
    const modifiedStyles = _index2.renderUtils.addHeightToStyle(height, styles);
    const virtualCells = this.getVirtualCells();
    return (0, _inferno.createComponentVNode)(2, _row.Row, {
      "className": classes,
      "styles": modifiedStyles,
      "leftVirtualCellWidth": leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount,
      children: virtualCells.map((_, index) => (0, _inferno.createComponentVNode)(2, _virtual_cell.VirtualCell, {
        "width": _virtual_cell.VirtualCellDefaultProps.width,
        "isHeaderCell": _virtual_cell.VirtualCellDefaultProps.isHeaderCell
      }, index.toString()))
    });
  }
}
exports.VirtualRow = VirtualRow;
VirtualRow.defaultProps = VirtualRowDefaultProps;
