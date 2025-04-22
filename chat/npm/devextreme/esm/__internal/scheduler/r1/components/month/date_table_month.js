/**
* DevExtreme (esm/__internal/scheduler/r1/components/month/date_table_month.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["viewData", "viewContext", "addDateTableClass", "addVerticalSizesClassToRows", "dataCellTemplate", "groupOrientation", "tableRef", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '../../../../core/r1/runtime/inferno/index';
import { DateTable, DateTableDefaultProps } from '../base/date_table';
import { DateTableMonthCell } from './date_table_month_cell';
export class DateTableMonth extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    const _this$props = this.props,
      {
        viewData,
        viewContext,
        addDateTableClass,
        addVerticalSizesClassToRows,
        dataCellTemplate,
        groupOrientation,
        tableRef,
        width
      } = _this$props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return normalizeProps(createComponentVNode(2, DateTable, _extends({}, restProps, {
      "viewData": viewData,
      "viewContext": viewContext,
      "groupOrientation": groupOrientation,
      "addDateTableClass": addDateTableClass,
      "dataCellTemplate": dataCellTemplate,
      "cellTemplate": DateTableMonthCell,
      "tableRef": tableRef,
      "addVerticalSizesClassToRows": addVerticalSizesClassToRows,
      "width": width
    })));
  }
}
DateTableMonth.defaultProps = DateTableDefaultProps;
