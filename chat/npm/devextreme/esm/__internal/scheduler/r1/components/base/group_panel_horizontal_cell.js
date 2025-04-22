/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel_horizontal_cell.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
