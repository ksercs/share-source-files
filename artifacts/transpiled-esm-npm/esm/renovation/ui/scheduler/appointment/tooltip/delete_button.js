import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["onClick"];
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { Button } from '../../../button';
export var viewFunction = () => createVNode(1, "div", "dx-tooltip-appointment-item-delete-button-container", createComponentVNode(2, Button, {
  "className": "dx-tooltip-appointment-item-delete-button",
  "icon": "trash",
  "stylingMode": "text"
}), 2);
export var DeleteButtonProps = {};
export class DeleteButton extends BaseInfernoComponent {
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
DeleteButton.defaultProps = DeleteButtonProps;