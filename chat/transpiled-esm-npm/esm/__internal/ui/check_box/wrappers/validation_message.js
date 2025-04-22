import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["accessKey", "activeStateEnabled", "boundary", "className", "contentId", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "mode", "offset", "onClick", "onKeyDown", "positionSide", "rtlEnabled", "tabIndex", "target", "validationErrors", "visible", "visualContainer", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import LegacyValidationMessage from '../../../../ui/validation_message';
import { BaseWidgetDefaultProps } from '../../../core/r1/base_props';
import { DomComponentWrapper } from '../../../core/r1/dom_component_wrapper';
import { BaseInfernoComponent } from '../../../core/r1/runtime/inferno/index';
export const defaultValidationMessageProps = _extends({}, BaseWidgetDefaultProps, {
  mode: 'auto',
  positionSide: 'top',
  offset: Object.freeze({
    h: 0,
    v: 0
  }),
  isReactComponentWrapper: true
});
export class ValidationMessage extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get restAttributes() {
    const _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  render() {
    return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
      "componentType": LegacyValidationMessage,
      "componentProps": this.props,
      "templateNames": []
    }, this.restAttributes)));
  }
}
ValidationMessage.defaultProps = defaultValidationMessageProps;