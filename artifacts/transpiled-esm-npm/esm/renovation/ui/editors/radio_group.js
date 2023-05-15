import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "className", "dataSource", "defaultValue", "disabled", "displayExpr", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isValid", "items", "layout", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "valueExpr", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import LegacyRadioGroup from '../../../ui/radio_group';
import { EditorProps } from './common/editor';
import { EditorStateProps } from './common/editor_state_props';
import { DomComponentWrapper } from '../common/dom_component_wrapper';
import devices from '../../../core/devices';
export var viewFunction = _ref => {
  var {
    componentProps,
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
    "componentType": LegacyRadioGroup,
    "componentProps": componentProps,
    "templateNames": ['itemTemplate']
  }, restAttributes)));
};
export var RadioGroupProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(EditorProps), Object.getOwnPropertyDescriptors({
  get layout() {
    return devices.real().deviceType === 'tablet' ? 'horizontal' : 'vertical';
  },
  isReactComponentWrapper: true
})));
export var RadioGroupPropsType = {
  get layout() {
    return RadioGroupProps.layout;
  },
  get readOnly() {
    return RadioGroupProps.readOnly;
  },
  get name() {
    return RadioGroupProps.name;
  },
  get validationError() {
    return RadioGroupProps.validationError;
  },
  get validationErrors() {
    return RadioGroupProps.validationErrors;
  },
  get validationMessageMode() {
    return RadioGroupProps.validationMessageMode;
  },
  get validationMessagePosition() {
    return RadioGroupProps.validationMessagePosition;
  },
  get validationStatus() {
    return RadioGroupProps.validationStatus;
  },
  get isValid() {
    return RadioGroupProps.isValid;
  },
  get inputAttr() {
    return RadioGroupProps.inputAttr;
  },
  get defaultValue() {
    return RadioGroupProps.defaultValue;
  },
  get className() {
    return RadioGroupProps.className;
  },
  get activeStateEnabled() {
    return EditorStateProps.activeStateEnabled;
  },
  get disabled() {
    return RadioGroupProps.disabled;
  },
  get focusStateEnabled() {
    return EditorStateProps.focusStateEnabled;
  },
  get hoverStateEnabled() {
    return EditorStateProps.hoverStateEnabled;
  },
  get tabIndex() {
    return RadioGroupProps.tabIndex;
  },
  get visible() {
    return RadioGroupProps.visible;
  },
  isReactComponentWrapper: true
};
export class RadioGroup extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value !== undefined ? this.props.value : this.props.defaultValue
    };
  }
  get componentProps() {
    return _extends({}, this.props, {
      value: this.props.value !== undefined ? this.props.value : this.state.value
    });
  }
  get restAttributes() {
    var _this$props$value = _extends({}, this.props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
      restProps = _objectWithoutPropertiesLoose(_this$props$value, _excluded);
    return restProps;
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
      componentProps: this.componentProps,
      restAttributes: this.restAttributes
    });
  }
}
RadioGroup.defaultProps = RadioGroupPropsType;