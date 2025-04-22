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