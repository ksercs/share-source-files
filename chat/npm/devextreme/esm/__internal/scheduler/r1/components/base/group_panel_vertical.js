/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel_vertical.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from '../../../../core/r1/runtime/inferno/index';
import { renderUtils } from '../../utils/index';
import { GroupPanelBaseDefaultProps } from './group_panel_props';
import { GroupPanelVerticalRow } from './group_panel_vertical_row';
export class GroupPanelVertical extends BaseInfernoComponent {
  render() {
    const {
      className,
      elementRef,
      groupPanelData,
      resourceCellTemplate,
      height,
      styles
    } = this.props;
    const style = normalizeStyles(renderUtils.addHeightToStyle(height, styles));
    return createVNode(1, "div", className, createVNode(1, "div", "dx-scheduler-group-flex-container", groupPanelData.groupPanelItems.map(group => createComponentVNode(2, GroupPanelVerticalRow, {
      "groupItems": group,
      "cellTemplate": resourceCellTemplate
    }, group[0].key)), 0), 2, {
      "style": style
    }, null, elementRef);
  }
}
GroupPanelVertical.defaultProps = GroupPanelBaseDefaultProps;
