/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/group_panel.js)
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
exports.GroupPanelDefaultProps = exports.GroupPanel = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _constants = require("../../../constants");
var _index2 = require("../../utils/index");
var _group_panel_horizontal = require("./group_panel_horizontal");
var _group_panel_props = require("./group_panel_props");
var _group_panel_vertical = require("./group_panel_vertical");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const GroupPanelDefaultProps = exports.GroupPanelDefaultProps = _extends({}, _group_panel_props.GroupPanelBaseDefaultProps, {
  groups: [],
  groupOrientation: _constants.VERTICAL_GROUP_ORIENTATION
});
class GroupPanel extends _index.InfernoWrapperComponent {
  createEffects() {
    return [(0, _index.createReRenderEffect)()];
  }
  render() {
    const {
      className,
      viewContext,
      elementRef,
      groupPanelData,
      height,
      resourceCellTemplate,
      groupOrientation,
      groups,
      styles
    } = this.props;
    const isVerticalLayout = (0, _index2.isVerticalGroupingApplied)(groups, groupOrientation);
    const Layout = isVerticalLayout ? _group_panel_vertical.GroupPanelVertical : _group_panel_horizontal.GroupPanelHorizontal;
    return (0, _inferno.createComponentVNode)(2, Layout, {
      "viewContext": viewContext,
      "height": height,
      "resourceCellTemplate": resourceCellTemplate,
      "className": className,
      "groupPanelData": groupPanelData,
      "elementRef": elementRef,
      "styles": styles,
      "groups": GroupPanelDefaultProps.groups,
      "groupOrientation": GroupPanelDefaultProps.groupOrientation,
      "groupByDate": GroupPanelDefaultProps.groupByDate
    });
  }
}
exports.GroupPanel = GroupPanel;
GroupPanel.defaultProps = GroupPanelDefaultProps;
