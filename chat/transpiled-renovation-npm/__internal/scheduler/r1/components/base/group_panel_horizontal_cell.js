"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupPanelHorizontalCellDefaultProps = exports.GroupPanelHorizontalCell = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _index2 = require("../../../../scheduler/r1/components/templates/index");
var _render_utils = require("../../../../core/r1/utils/render_utils");
var _group_panel_props = require("./group_panel_props");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const GroupPanelHorizontalCellDefaultProps = exports.GroupPanelHorizontalCellDefaultProps = _extends({}, _group_panel_props.GroupPanelCellDefaultProps, {
  isFirstGroupCell: false,
  isLastGroupCell: false,
  colSpan: 1
});
class GroupPanelHorizontalCell extends _index.BaseInfernoComponent {
  render() {
    const {
      cellTemplate,
      colSpan,
      color,
      data,
      id,
      index,
      text,
      className,
      isFirstGroupCell,
      isLastGroupCell
    } = this.props;
    const classes = (0, _render_utils.combineClasses)({
      'dx-scheduler-group-header': true,
      'dx-scheduler-first-group-cell': isFirstGroupCell,
      'dx-scheduler-last-group-cell': isLastGroupCell,
      [className ?? '']: !!className
    });
    return (0, _inferno.createVNode)(1, "th", classes, (0, _inferno.createVNode)(1, "div", "dx-scheduler-group-header-content", cellTemplate ? (0, _inferno.createComponentVNode)(2, _index2.PublicTemplate, {
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
    }) : (0, _inferno.createVNode)(1, "div", null, text, 0), 0), 2, {
      "colspan": colSpan
    });
  }
}
exports.GroupPanelHorizontalCell = GroupPanelHorizontalCell;
GroupPanelHorizontalCell.defaultProps = GroupPanelHorizontalCellDefaultProps;