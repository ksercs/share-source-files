/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/all_day_panel_table_body.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { combineClasses } from '../../../../core/r1/utils/render_utils';
import { AllDayPanelCell } from './all_day_panel_cell';
import { Row } from './row';
export const AllDayPanelTableBodyDefaultProps = {
  viewData: [],
  isVerticalGroupOrientation: false,
  className: '',
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0
};
export class AllDayPanelTableBody extends BaseInfernoComponent {
  render() {
    const {
      className,
      viewData,
      viewContext,
      leftVirtualCellWidth,
      rightVirtualCellWidth,
      leftVirtualCellCount,
      rightVirtualCellCount,
      isVerticalGroupOrientation,
      dataCellTemplate
    } = this.props;
    const classes = combineClasses({
      'dx-scheduler-all-day-table-row': true,
      [className ?? '']: !!className
    });
    return createComponentVNode(2, Row, {
      "leftVirtualCellWidth": leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount,
      "className": classes,
      children: viewData.map(_ref => {
        let {
          endDate,
          groupIndex: cellGroupIndex,
          groups,
          index: cellIndex,
          isFirstGroupCell,
          isFocused,
          isLastGroupCell,
          isSelected,
          key,
          startDate
        } = _ref;
        return createComponentVNode(2, AllDayPanelCell, {
          "viewContext": viewContext,
          "isFirstGroupCell": !isVerticalGroupOrientation && isFirstGroupCell,
          "isLastGroupCell": !isVerticalGroupOrientation && isLastGroupCell,
          "startDate": startDate,
          "endDate": endDate,
          "groups": groups,
          "groupIndex": cellGroupIndex,
          "index": cellIndex,
          "dataCellTemplate": dataCellTemplate,
          "isSelected": isSelected ?? false,
          "isFocused": isFocused ?? false
        }, key);
      })
    });
  }
}
AllDayPanelTableBody.defaultProps = AllDayPanelTableBodyDefaultProps;
