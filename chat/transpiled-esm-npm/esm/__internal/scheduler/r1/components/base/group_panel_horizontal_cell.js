import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { PublicTemplate } from '../../../../scheduler/r1/components/templates/index';
import { combineClasses } from '../../../../core/r1/utils/render_utils';
import { GroupPanelCellDefaultProps } from './group_panel_props';
export const GroupPanelHorizontalCellDefaultProps = _extends({}, GroupPanelCellDefaultProps, {
  isFirstGroupCell: false,
  isLastGroupCell: false,
  colSpan: 1
});
export class GroupPanelHorizontalCell extends BaseInfernoComponent {
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
    const classes = combineClasses({
      'dx-scheduler-group-header': true,
      'dx-scheduler-first-group-cell': isFirstGroupCell,
      'dx-scheduler-last-group-cell': isLastGroupCell,
      [className ?? '']: !!className
    });
    return createVNode(1, "th", classes, createVNode(1, "div", "dx-scheduler-group-header-content", cellTemplate ? createComponentVNode(2, PublicTemplate, {
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
    }) : createVNode(1, "div", null, text, 0), 0), 2, {
      "colspan": colSpan
    });
  }
}
GroupPanelHorizontalCell.defaultProps = GroupPanelHorizontalCellDefaultProps;