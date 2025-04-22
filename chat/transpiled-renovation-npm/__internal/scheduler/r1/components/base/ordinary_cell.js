"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrdinaryCellDefaultProps = exports.OrdinaryCell = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
const OrdinaryCellDefaultProps = exports.OrdinaryCellDefaultProps = {};
class OrdinaryCell extends _index.BaseInfernoComponent {
  render() {
    const {
      children,
      className,
      colSpan,
      styles
    } = this.props;
    return (0, _inferno.createVNode)(1, "td", className, children, 0, {
      "style": (0, _index.normalizeStyles)(styles),
      "colspan": colSpan
    });
  }
}
exports.OrdinaryCell = OrdinaryCell;
OrdinaryCell.defaultProps = OrdinaryCellDefaultProps;