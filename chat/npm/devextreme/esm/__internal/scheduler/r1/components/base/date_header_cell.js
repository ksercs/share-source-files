/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/date_header_cell.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { PublicTemplate } from '../../../../scheduler/r1/components/templates/index';
import { combineClasses } from '../../../../core/r1/utils/render_utils';
import { renderUtils } from '../../utils/index';
import { CellBaseDefaultProps } from './cell';
import { DateHeaderText } from './date_header_text';
export const DateHeaderCellDefaultProps = _extends({}, CellBaseDefaultProps, {
  today: false,
  colSpan: 1,
  isWeekDayCell: false,
  splitText: false,
  isTimeCellTemplate: false
});
export class DateHeaderCell extends BaseInfernoComponent {
  render() {
    const {
      viewContext: {
        view: {
          type: viewType
        },
        crossScrollingEnabled
      },
      colSpan,
      dateCellTemplate,
      groupIndex,
      groups,
      index,
      isTimeCellTemplate,
      splitText,
      startDate,
      text,
      timeCellTemplate,
      className,
      isFirstGroupCell,
      isLastGroupCell,
      isWeekDayCell,
      today
    } = this.props;
    const cellSizeHorizontalClass = renderUtils.getCellSizeHorizontalClass(viewType, crossScrollingEnabled);
    const cellClasses = combineClasses({
      'dx-scheduler-header-panel-cell': true,
      [cellSizeHorizontalClass]: true,
      'dx-scheduler-header-panel-current-time-cell': today,
      'dx-scheduler-header-panel-week-cell': isWeekDayCell,
      [className ?? '']: !!className
    });
    const classes = renderUtils.getGroupCellClasses(isFirstGroupCell, isLastGroupCell, cellClasses);
    const useTemplate = !isTimeCellTemplate && !!dateCellTemplate || isTimeCellTemplate && !!timeCellTemplate;
    const children = useTemplate ? // this is a workaround for https://github.com/DevExpress/devextreme-renovation/issues/574
    createFragment([isTimeCellTemplate && createComponentVNode(2, PublicTemplate, {
      "template": timeCellTemplate,
      "templateProps": {
        data: {
          date: startDate,
          text,
          groups,
          groupIndex
        },
        index
      }
    }), !isTimeCellTemplate && createComponentVNode(2, PublicTemplate, {
      "template": dateCellTemplate,
      "templateProps": {
        data: {
          date: startDate,
          text,
          groups,
          groupIndex
        },
        index
      }
    })], 0) : createComponentVNode(2, DateHeaderText, {
      "splitText": splitText,
      "text": text
    });
    return createVNode(1, "th", classes, children, 0, {
      "colspan": colSpan,
      "title": text
    });
  }
}
DateHeaderCell.defaultProps = DateHeaderCellDefaultProps;
