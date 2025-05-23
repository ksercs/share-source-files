/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/date_table/all_day_panel/layout.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "addVerticalSizesClassToRows", "allDayAppointments", "bottomVirtualRowHeight", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "tableRef", "topVirtualRowHeight", "viewData", "width"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { AppointmentLayout } from '../../../../appointment/layout';
import { LayoutProps } from '../../layout_props';
import { AllDayTable } from './table';
export var viewFunction = _ref => {
  var {
    props: {
      dataCellTemplate,
      tableRef,
      viewData,
      width
    }
  } = _ref;
  return createVNode(1, "div", "dx-scheduler-all-day-panel", [createComponentVNode(2, AppointmentLayout, {
    "isAllDay": true
  }), createComponentVNode(2, AllDayTable, {
    "tableRef": tableRef,
    "viewData": viewData,
    "dataCellTemplate": dataCellTemplate,
    "width": width
  })], 4);
};
export var AllDayPanelLayoutProps = LayoutProps;
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class AllDayPanelLayout extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      restAttributes: this.restAttributes
    });
  }
}
AllDayPanelLayout.defaultProps = AllDayPanelLayoutProps;
