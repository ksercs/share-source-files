"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCheckBoxProps = exports.CheckBox = void 0;
exports.defaultOptions = defaultOptions;
var _inferno = require("inferno");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _utils = require("../../../core/options/utils");
var _index = require("../../core/r1/runtime/inferno/index");
var _combine_classes = require("../../core/utils/combine_classes");
var _check_box_icon = require("./check_box_icon");
var _editor = require("./editor_base/editor");
const _excluded = ["accessKey", "activeStateEnabled", "aria", "className", "classes", "defaultValue", "disabled", "enableThreeStateBehavior", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "iconSize", "inputAttr", "isDirty", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "saveValueChangeEvent", "tabIndex", "text", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/explicit-module-boundary-types */ /* eslint-disable @typescript-eslint/no-non-null-assertion */
const getCssClasses = model => {
  const {
    text,
    value
  } = model;
  const checked = value;
  const indeterminate = checked === null;
  const classesMap = {
    'dx-checkbox': true,
    'dx-checkbox-checked': checked === true,
    'dx-checkbox-has-text': !!text,
    'dx-checkbox-indeterminate': indeterminate
  };
  return (0, _combine_classes.combineClasses)(classesMap);
};
const defaultCheckBoxProps = exports.defaultCheckBoxProps = _extends({}, _editor.defaultEditorProps, {
  text: '',
  enableThreeStateBehavior: false,
  activeStateEnabled: true,
  hoverStateEnabled: true,
  get focusStateEnabled() {
    return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
  },
  defaultValue: false,
  valueChange: () => {}
});
class CheckBox extends _index.InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.editorRef = (0, _inferno.createRef)();
    this.state = {
      value: this.props.value !== undefined ? this.props.value : this.props.defaultValue
    };
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.onWidgetClick = this.onWidgetClick.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }
  createEffects() {
    return [(0, _index.createReRenderEffect)()];
  }
  onWidgetClick(event) {
    const {
      enableThreeStateBehavior,
      readOnly,
      saveValueChangeEvent
    } = this.props;
    if (!readOnly) {
      saveValueChangeEvent === null || saveValueChangeEvent === void 0 || saveValueChangeEvent(event);
      if (enableThreeStateBehavior) {
        var _this$props$valueChan, _this$props;
        // eslint-disable-next-line @stylistic/max-len
        // eslint-disable-next-line @typescript-eslint/init-declarations, @typescript-eslint/naming-convention
        let __newValue;
        this.setState(__state_argument => {
          // eslint-disable-next-line @stylistic/max-len
          __newValue = (this.props.value !== undefined ? this.props.value : __state_argument.value) === null || (!(this.props.value !== undefined ? this.props.value : __state_argument.value) ? null : false);
          return {
            value: __newValue
          };
        });
        (_this$props$valueChan = (_this$props = this.props).valueChange) === null || _this$props$valueChan === void 0 || _this$props$valueChan.call(_this$props, __newValue);
      } else {
        var _this$props$valueChan2, _this$props2;
        // eslint-disable-next-line @stylistic/max-len
        // eslint-disable-next-line @typescript-eslint/init-declarations, @typescript-eslint/naming-convention
        let __newValue;
        this.setState(__state_argument => {
          // eslint-disable-next-line @stylistic/max-len
          __newValue = !((this.props.value !== undefined ? this.props.value : __state_argument.value) ?? false);
          return {
            value: __newValue
          };
        });
        (_this$props$valueChan2 = (_this$props2 = this.props).valueChange) === null || _this$props$valueChan2 === void 0 || _this$props$valueChan2.call(_this$props2, __newValue);
      }
    }
  }
  keyDown(e) {
    const {
      onKeyDown
    } = this.props;
    const {
      keyName,
      originalEvent,
      which
    } = e;
    const result = onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
    if (result !== null && result !== void 0 && result.cancel) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result;
    }
    if (keyName === 'space' || which === 'space') {
      originalEvent.preventDefault();
      this.onWidgetClick(originalEvent);
    }
    return undefined;
  }
  get cssClasses() {
    return getCssClasses(_extends({}, this.props, {
      // @ts-expect-error
      value: this.props.value !== undefined ? this.props.value : this.state.value
    }));
  }
  get aria() {
    const checked = (this.props.value !== undefined ? this.props.value : this.state.value) === true;
    const indeterminate = (this.props.value !== undefined ? this.props.value : this.state.value) === null;
    const result = {
      role: 'checkbox',
      checked: indeterminate ? 'mixed' : `${checked}`
    };
    return _extends({}, result, this.props.aria);
  }
  get restAttributes() {
    const _this$props3 = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props3, _excluded);
    return restProps;
  }
  focus() {
    this.editorRef.current.focus();
  }
  blur() {
    this.editorRef.current.blur();
  }
  render() {
    const value = this.props.value !== undefined ? this.props.value : this.state.value;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _editor.Editor, _extends({
      "aria": this.aria,
      "classes": this.cssClasses,
      "onClick": this.onWidgetClick,
      "onKeyDown": this.keyDown,
      "accessKey": this.props.accessKey,
      "activeStateEnabled": this.props.activeStateEnabled,
      "focusStateEnabled": this.props.focusStateEnabled,
      "hoverStateEnabled": this.props.hoverStateEnabled,
      "className": this.props.className,
      "disabled": this.props.disabled,
      "readOnly": this.props.readOnly,
      "hint": this.props.hint,
      "height": this.props.height,
      "width": this.props.width,
      "rtlEnabled": this.props.rtlEnabled,
      "tabIndex": this.props.tabIndex,
      "visible": this.props.visible,
      "validationError": this.props.validationError,
      "validationErrors": this.props.validationErrors,
      "validationMessageMode": this.props.validationMessageMode,
      "validationMessagePosition": this.props.validationMessagePosition,
      "validationStatus": this.props.validationStatus,
      "isValid": this.props.isValid,
      "onFocusIn": this.props.onFocusIn
    }, this.restAttributes, {
      children: (0, _inferno.createFragment)([(0, _inferno.normalizeProps)((0, _inferno.createVNode)(64, "input", null, null, 1, _extends({
        "type": "hidden",
        "value": `${value}`
      }, this.props.name && {
        name: this.props.name
      }))), (0, _inferno.createVNode)(1, "div", "dx-checkbox-container", [(0, _inferno.createComponentVNode)(2, _check_box_icon.CheckBoxIcon, {
        "size": this.props.iconSize,
        "isChecked": value === true
      }), this.props.text && (0, _inferno.createVNode)(1, "span", "dx-checkbox-text", this.props.text, 0)], 0)], 4)
    }), null, this.editorRef));
  }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
exports.CheckBox = CheckBox;
function __processTwoWayProps(defaultProps) {
  const twoWayProps = ['value'];
  return Object.keys(defaultProps).reduce((props, propName) => {
    const propValue = defaultProps[propName];
    const defaultPropName = twoWayProps.some(p => p === propName) ? `default${propName.charAt(0).toUpperCase()}${propName.slice(1)}` : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}
CheckBox.defaultProps = defaultCheckBoxProps;
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any
const __defaultOptionRules = [];
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  CheckBox.defaultProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(CheckBox.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps((0, _utils.convertRulesToOptions)(__defaultOptionRules)))));
}