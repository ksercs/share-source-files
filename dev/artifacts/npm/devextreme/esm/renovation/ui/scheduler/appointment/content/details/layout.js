/**
* DevExtreme (esm/renovation/ui/scheduler/appointment/content/details/layout.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["dateText"];
import { createVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
export var viewFunction = _ref => {
  var {
    props: {
      dateText
    }
  } = _ref;
  return createVNode(1, "div", "dx-scheduler-appointment-content-details", createVNode(1, "div", "dx-scheduler-appointment-content-date", dateText, 0), 2);
};
export var AppointmentDetailsProps = {
  dateText: ''
};
export class AppointmentDetails extends BaseInfernoComponent {
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
      props: _extends({}, props),
      restAttributes: this.restAttributes
    });
  }
}
AppointmentDetails.defaultProps = AppointmentDetailsProps;
