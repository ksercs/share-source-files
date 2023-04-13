/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/month/date_table/cell.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["allDay", "ariaLabel", "children", "className", "contentTemplateProps", "dataCellTemplate", "endDate", "firstDayOfMonth", "groupIndex", "groups", "index", "isFirstGroupCell", "isFocused", "isLastGroupCell", "isSelected", "otherMonth", "startDate", "text", "today"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { combineClasses } from '../../../../../utils/combine_classes';
import { DateTableCellBase, DateTableCellBaseProps } from '../../base/date_table/cell';
export var viewFunction = _ref => {
  var {
    classes,
    contentTemplateProps,
    props: {
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
      text
    }
  } = _ref;
  return createComponentVNode(2, DateTableCellBase, {
    "className": classes,
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
};
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class MonthDateTableCell extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.__getterCache = {};
  }
  get classes() {
    var {
      className,
      firstDayOfMonth,
      otherMonth,
      today
    } = this.props;
    return combineClasses({
      'dx-scheduler-date-table-other-month': !!otherMonth,
      'dx-scheduler-date-table-current-date': !!today,
      'dx-scheduler-date-table-first-of-month': !!firstDayOfMonth,
      [className]: !!className
    });
  }
  get contentTemplateProps() {
    if (this.__getterCache['contentTemplateProps'] !== undefined) {
      return this.__getterCache['contentTemplateProps'];
    }
    return this.__getterCache['contentTemplateProps'] = (() => {
      var {
        index,
        text
      } = this.props;
      return {
        data: {
          text
        },
        index
      };
    })();
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    if (this.props['index'] !== nextProps['index'] || this.props['text'] !== nextProps['text']) {
      this.__getterCache['contentTemplateProps'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      classes: this.classes,
      contentTemplateProps: this.contentTemplateProps,
      restAttributes: this.restAttributes
    });
  }
}
MonthDateTableCell.defaultProps = DateTableCellBaseProps;
