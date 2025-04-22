import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { ALL_DAY_PANEL_CELL_CLASS } from '../const';
import { DateTableCallBaseDefaultProps, DateTableCellBase } from './date_table_cell_base';
export class AllDayPanelCell extends BaseInfernoComponent {
  render() {
    const {
      className,
      viewContext,
      dataCellTemplate,
      endDate,
      groupIndex,
      groups,
      index,
      isFirstGroupCell,
      isFocused,
      isLastGroupCell,
      isSelected,
      startDate
    } = this.props;
    return createComponentVNode(2, DateTableCellBase, {
      "className": `${ALL_DAY_PANEL_CELL_CLASS} ${className}`,
      "viewContext": viewContext,
      "startDate": startDate,
      "endDate": endDate,
      "groups": groups,
      "groupIndex": groupIndex,
      "allDay": true,
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "index": index,
      "dataCellTemplate": dataCellTemplate,
      "isSelected": isSelected,
      "isFocused": isFocused
    });
  }
}
AllDayPanelCell.defaultProps = DateTableCallBaseDefaultProps;