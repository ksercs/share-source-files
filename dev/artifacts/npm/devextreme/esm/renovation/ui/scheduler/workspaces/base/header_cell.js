/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/header_cell.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["children", "className", "colSpan", "styles"];
import { createVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { normalizeStyles } from '@devextreme/runtime/inferno';
import { CellProps } from './ordinary_cell';
export var viewFunction = _ref => {
  var {
    props: {
      children,
      className,
      colSpan,
      styles
    }
  } = _ref;
  return createVNode(1, "th", className, children, 0, {
    "style": normalizeStyles(styles),
    "colSpan": colSpan
  });
};
export class HeaderCell extends BaseInfernoComponent {
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
HeaderCell.defaultProps = CellProps;
