/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel_vertical_cell.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { PublicTemplate } from '../../../../scheduler/r1/components/templates/index';
import { GroupPanelCellDefaultProps } from './group_panel_props';
export class GroupPanelVerticalCell extends BaseInfernoComponent {
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
    return createVNode(1, "div", `dx-scheduler-group-header ${className}`, cellTemplate ? createComponentVNode(2, PublicTemplate, {
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
    }) : createVNode(1, "div", "dx-scheduler-group-header-content", text, 0), 0);
  }
}
GroupPanelVerticalCell.defaultProps = GroupPanelCellDefaultProps;
