import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { combineClasses } from '../../../../core/r1/utils/render_utils';
import { DateTableCallBaseDefaultProps, DateTableCellBase } from '../base/date_table_cell_base';
export class DateTableMonthCell extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.contentTemplateProps = null;
  }
  getContentTemplateProps() {
    if (this.contentTemplateProps !== null) {
      return this.contentTemplateProps;
    }
    const {
      index,
      text
    } = this.props;
    this.contentTemplateProps = {
      data: {
        text
      },
      index
    };
    return this.contentTemplateProps;
  }
  componentWillUpdate(nextProps) {
    if (this.props.index !== nextProps.index || this.props.text !== nextProps.text) {
      this.contentTemplateProps = null;
    }
  }
  render() {
    const {
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
      startDate,
      text,
      className,
      firstDayOfMonth,
      otherMonth,
      today
    } = this.props;
    const classes = combineClasses({
      'dx-scheduler-date-table-other-month': !!otherMonth,
      'dx-scheduler-date-table-current-date': !!today,
      'dx-scheduler-date-table-first-of-month': !!firstDayOfMonth,
      [className ?? '']: !!className
    });
    const contentTemplateProps = this.getContentTemplateProps();
    return createComponentVNode(2, DateTableCellBase, {
      "className": classes,
      "viewContext": viewContext,
      "dataCellTemplate": dataCellTemplate,
      "startDate": startDate,
      "endDate": endDate,
      "text": text,
      "groups": groups,
      "groupIndex": groupIndex,
      "index": index,
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "isSelected": isSelected,
      "isFocused": isFocused,
      "contentTemplateProps": contentTemplateProps,
      children: createVNode(1, "div", "dx-scheduler-date-table-cell-text", text, 0)
    });
  }
}
DateTableMonthCell.defaultProps = DateTableCallBaseDefaultProps;