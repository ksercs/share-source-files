"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderCell = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _ordinary_cell = require("./ordinary_cell");
class HeaderCell extends _index.BaseInfernoComponent {
  render() {
    const {
      children,
      className,
      colSpan,
      styles
    } = this.props;
    return (0, _inferno.createVNode)(1, "th", className, children, 0, {
      "style": (0, _index.normalizeStyles)(styles),
      "colspan": colSpan
    });
  }
}
exports.HeaderCell = HeaderCell;
HeaderCell.defaultProps = _ordinary_cell.OrdinaryCellDefaultProps;