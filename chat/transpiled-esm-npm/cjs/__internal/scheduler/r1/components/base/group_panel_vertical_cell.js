"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupPanelVerticalCell = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _index2 = require("../../../../scheduler/r1/components/templates/index");
var _group_panel_props = require("./group_panel_props");
class GroupPanelVerticalCell extends _index.BaseInfernoComponent {
  render() {
    const {
      className,
      data,
      id,
      color,
      text,
      index,
      cellTemplate
    } = this.props;
    return (0, _inferno.createVNode)(1, "div", `dx-scheduler-group-header ${className}`, cellTemplate ? (0, _inferno.createComponentVNode)(2, _index2.PublicTemplate, {
      "template": cellTemplate,
      "templateProps": {
        data: {
          data,
          id,
          color,
          text
        },
        index
      }
    }) : (0, _inferno.createVNode)(1, "div", "dx-scheduler-group-header-content", text, 0), 0);
  }
}
exports.GroupPanelVerticalCell = GroupPanelVerticalCell;
GroupPanelVerticalCell.defaultProps = _group_panel_props.GroupPanelCellDefaultProps;