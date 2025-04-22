/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel_horizontal_row.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { GroupPanelHorizontalCell, GroupPanelHorizontalCellDefaultProps } from './group_panel_horizontal_cell';
import { GroupPanelRowDefaultProps } from './group_panel_props';
export class GroupPanelHorizontalRow extends BaseInfernoComponent {
  render() {
    const {
      cellTemplate,
      className,
      groupItems
    } = this.props;
    return createVNode(1, "tr", `dx-scheduler-group-row ${className}`, groupItems.map((_ref, index) => {
      let {
        colSpan,
        color,
        data,
        id,
        isFirstGroupCell,
        isLastGroupCell,
        key,
        text
      } = _ref;
      return createComponentVNode(2, GroupPanelHorizontalCell, {
        "text": text,
        "id": id,
        "data": data,
        "index": index,
        "color": color,
        "colSpan": colSpan ?? GroupPanelHorizontalCellDefaultProps.colSpan,
        "isFirstGroupCell": !!isFirstGroupCell,
        "isLastGroupCell": !!isLastGroupCell,
        "cellTemplate": cellTemplate
      }, key);
    }), 0);
  }
}
GroupPanelHorizontalRow.defaultProps = GroupPanelRowDefaultProps;
