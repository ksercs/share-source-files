/**
* DevExtreme (esm/renovation/ui/scheduler/appointment/tooltip/marker.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["color"];
import { createVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
export var viewFunction = () => createVNode(1, "div", "dx-tooltip-appointment-item-marker", createVNode(1, "div", "dx-tooltip-appointment-item-marker-body"), 2);
export var MarkerProps = {};
export class Marker extends BaseInfernoComponent {
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
    return viewFunction();
  }
}
Marker.defaultProps = MarkerProps;
