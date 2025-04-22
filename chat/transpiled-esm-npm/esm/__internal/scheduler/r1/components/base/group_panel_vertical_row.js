import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { GroupPanelRowDefaultProps } from './group_panel_props';
import { GroupPanelVerticalCell } from './group_panel_vertical_cell';
export class GroupPanelVerticalRow extends BaseInfernoComponent {
  render() {
    const {
      className,
      groupItems,
      cellTemplate
    } = this.props;
    return createVNode(1, "div", `dx-scheduler-group-row ${className}`, groupItems.map((_ref, index) => {
      let {
        color,
        data,
        id,
        key,
        text
      } = _ref;
      return createComponentVNode(2, GroupPanelVerticalCell, {
        "text": text,
        "id": id,
        "data": data,
        "index": index,
        "color": color,
        "cellTemplate": cellTemplate
      }, key);
    }), 0);
  }
}
GroupPanelVerticalRow.defaultProps = GroupPanelRowDefaultProps;