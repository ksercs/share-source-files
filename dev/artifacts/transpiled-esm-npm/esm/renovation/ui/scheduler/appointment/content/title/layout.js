import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["text"];
import { createVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
export var viewFunction = _ref => {
  var {
    props: {
      text
    }
  } = _ref;
  return createVNode(1, "div", "dx-scheduler-appointment-title", text, 0);
};
export var AppointmentTitleProps = {
  text: ''
};
export class AppointmentTitle extends BaseInfernoComponent {
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
AppointmentTitle.defaultProps = AppointmentTitleProps;