/**
* DevExtreme (esm/__internal/scheduler/r1/components/timeline/date_header_timeline.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { getThemeType } from '../../../../scheduler/r1/utils/themes';
import { isHorizontalGroupingApplied } from '../../utils/index';
import { DateHeaderDefaultProps } from '../base/date_header';
import { DateHeaderCell, DateHeaderCellDefaultProps } from '../base/date_header_cell';
import { Row, RowDefaultProps } from '../base/row';
const {
  isMaterialBased
} = getThemeType();
export class TimelineDateHeaderLayout extends BaseInfernoComponent {
  render() {
    const {
      viewContext,
      groupByDate,
      groupOrientation,
      groups,
      dateHeaderData,
      dateCellTemplate,
      timeCellTemplate
    } = this.props;
    const {
      dataMap,
      isMonthDateHeader,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      weekDayLeftVirtualCellCount,
      weekDayLeftVirtualCellWidth,
      weekDayRightVirtualCellCount,
      weekDayRightVirtualCellWidth
    } = dateHeaderData;
    const isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation) && !groupByDate;
    return createFragment(dataMap.map((dateHeaderRow, rowIndex) => {
      const rowsCount = dataMap.length;
      const isTimeCellTemplate = rowsCount - 1 === rowIndex;
      const isWeekDayRow = rowsCount > 1 && rowIndex === 0;
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      const splitText = isMaterialBased && (isMonthDateHeader || isWeekDayRow);
      let validLeftVirtualCellCount = leftVirtualCellCount;
      let validRightVirtualCellCount = rightVirtualCellCount;
      let validRightVirtualCellWidth = rightVirtualCellWidth;
      let validLeftVirtualCellWidth = leftVirtualCellWidth;
      if (isWeekDayRow) {
        validLeftVirtualCellCount = weekDayLeftVirtualCellCount;
        validRightVirtualCellCount = weekDayRightVirtualCellCount;
        validRightVirtualCellWidth = weekDayRightVirtualCellWidth;
        validLeftVirtualCellWidth = weekDayLeftVirtualCellWidth;
      }
      return createComponentVNode(2, Row, {
        "className": "dx-scheduler-header-row",
        "leftVirtualCellWidth": validLeftVirtualCellWidth ?? RowDefaultProps.leftVirtualCellWidth,
        "leftVirtualCellCount": validLeftVirtualCellCount,
        "rightVirtualCellWidth": validRightVirtualCellWidth ?? RowDefaultProps.rightVirtualCellWidth,
        "rightVirtualCellCount": validRightVirtualCellCount,
        children: dateHeaderRow.map(_ref => {
          let {
            colSpan,
            endDate,
            groupIndex,
            groups: cellGroups,
            index,
            isFirstGroupCell,
            isLastGroupCell,
            key,
            startDate,
            text,
            today
          } = _ref;
          return createComponentVNode(2, DateHeaderCell, {
            "viewContext": viewContext,
            "startDate": startDate,
            "endDate": endDate,
            "groups": isHorizontalGrouping ? cellGroups : undefined,
            "groupIndex": isHorizontalGrouping ? groupIndex : undefined,
            "today": today ?? DateHeaderCellDefaultProps.today,
            "index": index,
            "text": text,
            "isFirstGroupCell": isFirstGroupCell,
            "isLastGroupCell": isLastGroupCell,
            "isWeekDayCell": isWeekDayRow,
            "colSpan": colSpan,
            "splitText": splitText,
            "dateCellTemplate": dateCellTemplate,
            "timeCellTemplate": timeCellTemplate,
            "isTimeCellTemplate": isTimeCellTemplate
          }, key);
        })
      }, rowIndex.toString());
    }), 0);
  }
}
TimelineDateHeaderLayout.defaultProps = DateHeaderDefaultProps;
