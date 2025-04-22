import { createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { isHorizontalGroupingApplied, themeUtils } from '../../utils/index';
import { DateHeaderCell } from './date_header_cell';
import { Row } from './row';
const {
  isMaterialBased
} = themeUtils.getThemeType();
export const DateHeaderDefaultProps = {
  groupOrientation: 'horizontal',
  groupByDate: false,
  groups: []
};
export class DateHeader extends BaseInfernoComponent {
  render() {
    const {
      viewContext,
      dateCellTemplate,
      dateHeaderData: {
        dataMap,
        leftVirtualCellCount,
        leftVirtualCellWidth,
        rightVirtualCellCount,
        rightVirtualCellWidth
      },
      groupByDate,
      groupOrientation,
      groups
    } = this.props;
    const isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation) && !groupByDate;
    return createFragment(dataMap.map((dateHeaderRow, rowIndex) => createComponentVNode(2, Row, {
      "className": "dx-scheduler-header-row",
      "leftVirtualCellWidth": leftVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellWidth": rightVirtualCellWidth,
      "rightVirtualCellCount": rightVirtualCellCount,
      "isHeaderRow": true,
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
          "today": today ?? false,
          "isWeekDayCell": false,
          "isTimeCellTemplate": false,
          "index": index,
          "text": text,
          "isFirstGroupCell": isFirstGroupCell,
          "isLastGroupCell": isLastGroupCell,
          "dateCellTemplate": dateCellTemplate,
          "colSpan": colSpan,
          "splitText": isMaterialBased
        }, key);
      })
    }, rowIndex.toString())), 0);
  }
}
DateHeader.defaultProps = DateHeaderDefaultProps;