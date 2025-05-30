/**
* DevExtreme (esm/renovation/ui/scheduler/appointment_tooltip/marker.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["className"];
import { createVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { normalizeStyles } from '@devextreme/runtime/inferno';
export var viewFunction = viewModel => createVNode(1, "div", "dx-tooltip-appointment-item-marker ".concat(viewModel.props.className), createVNode(1, "div", "dx-tooltip-appointment-item-marker-body", null, 1, {
  "style": normalizeStyles(viewModel.style)
}), 2);
export var MarkerProps = {
  className: ''
};
export class Marker extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {
      appointmentColor: undefined
    };
  }
  get style() {
    return {
      background: this.state.appointmentColor
    };
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
      appointmentColor: this.state.appointmentColor,
      style: this.style,
      restAttributes: this.restAttributes
    });
  }
}
Marker.defaultProps = MarkerProps;
