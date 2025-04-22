/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/date_table_body.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { PublicTemplate } from '../../../../scheduler/r1/components/templates/index';
import { Fragment } from 'inferno';
import { combineClasses } from '../../../../core/r1/utils/render_utils';
import { DATE_TABLE_ROW_CLASS } from '../const';
import { AllDayPanelTableBody, AllDayPanelTableBodyDefaultProps } from './all_day_panel_table_body';
import { DateTableCellBase } from './date_table_cell_base';
import { LayoutDefaultProps } from './layout_props';
import { Row, RowDefaultProps } from './row';
export const DateTableBodyDefaultProps = _extends({}, LayoutDefaultProps, {
  cellTemplate: DateTableCellBase
});
export class DateTableBody extends BaseInfernoComponent {
  render() {
    const {
      viewData,
      viewContext,
      addVerticalSizesClassToRows,
      cellTemplate,
      dataCellTemplate
    } = this.props;
    const rowClasses = combineClasses({
      [DATE_TABLE_ROW_CLASS]: true,
      'dx-scheduler-cell-sizes-vertical': addVerticalSizesClassToRows
    });
    return createFragment(viewData.groupedData.map(_ref => {
      let {
        allDayPanel,
        dateTable,
        isGroupedAllDayPanel,
        key: fragmentKey
      } = _ref;
      return createFragment([isGroupedAllDayPanel && createComponentVNode(2, AllDayPanelTableBody, {
        "viewData": allDayPanel ?? AllDayPanelTableBodyDefaultProps.viewData,
        "viewContext": viewContext,
        "dataCellTemplate": dataCellTemplate,
        "isVerticalGroupOrientation": true,
        "leftVirtualCellWidth": viewData.leftVirtualCellWidth ?? AllDayPanelTableBodyDefaultProps.leftVirtualCellWidth,
        "rightVirtualCellWidth": viewData.rightVirtualCellWidth ?? AllDayPanelTableBodyDefaultProps.rightVirtualCellWidth,
        "leftVirtualCellCount": viewData.leftVirtualCellCount,
        "rightVirtualCellCount": viewData.rightVirtualCellCount
      }), dateTable.map(_ref2 => {
        let {
          cells,
          key: rowKey
        } = _ref2;
        return createComponentVNode(2, Row, {
          "className": rowClasses,
          "leftVirtualCellWidth": viewData.leftVirtualCellWidth ?? RowDefaultProps.leftVirtualCellWidth,
          "rightVirtualCellWidth": viewData.rightVirtualCellWidth ?? RowDefaultProps.rightVirtualCellWidth,
          "leftVirtualCellCount": viewData.leftVirtualCellCount,
          "rightVirtualCellCount": viewData.rightVirtualCellCount,
          children: cells.map(_ref3 => {
            let {
              key: cellKey,
              endDate,
              firstDayOfMonth,
              groupIndex: cellGroupIndex,
              groups,
              index: cellIndex,
              isFirstGroupCell,
              isFocused,
              isLastGroupCell,
              isSelected,
              otherMonth,
              startDate,
              text,
              today
            } = _ref3;
            return createComponentVNode(2, PublicTemplate, {
              "template": cellTemplate,
              "templateProps": {
                key: cellKey,
                viewContext,
                isFirstGroupCell,
                isLastGroupCell,
                startDate,
                endDate,
                groups,
                groupIndex: cellGroupIndex,
                index: cellIndex,
                dataCellTemplate,
                text,
                today,
                otherMonth,
                firstDayOfMonth,
                isSelected,
                isFocused
              }
            });
          })
        }, rowKey);
      })], 0, fragmentKey);
    }), 0);
  }
}
DateTableBody.defaultProps = DateTableBodyDefaultProps;
