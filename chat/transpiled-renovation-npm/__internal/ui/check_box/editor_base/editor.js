"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultEditorProps = exports.Editor = void 0;
exports.defaultOptions = defaultOptions;
var _inferno = require("inferno");
var _guid = _interopRequireDefault(require("../../../../core/guid"));
var _utils = require("../../../../core/options/utils");
var _index = require("../../../core/r1/runtime/inferno/index");
var _widget = require("../../../core/r1/widget");
var _combine_classes = require("../../../core/utils/combine_classes");
var _validation_message = require("../wrappers/validation_message");
const _excluded = ["accessKey", "activeStateEnabled", "aria", "children", "className", "classes", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isDirty", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/explicit-module-boundary-types */ /* eslint-disable @typescript-eslint/no-unsafe-return */ /* eslint-disable @typescript-eslint/no-non-null-assertion */
const getCssClasses = model => {
  const {
    classes,
    isValid,
    readOnly
  } = model;
  const classesMap = {
    'dx-state-readonly': !!readOnly,
    'dx-invalid': !isValid,
    [String(classes)]: !!classes
  };
  return (0, _combine_classes.combineClasses)(classesMap);
};
const defaultEditorProps = exports.defaultEditorProps = _extends({}, _widget.WidgetDefaultProps, {
  readOnly: false,
  name: '',
  validationError: null,
  validationErrors: null,
  validationMessageMode: 'auto',
  validationMessagePosition: 'bottom',
  validationStatus: 'valid',
  isValid: true,
  isDirty: false,
  inputAttr: {},
  defaultValue: null,
  valueChange: () => {}
});
class Editor extends _index.InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.widgetRef = (0, _inferno.createRef)();
    this.rootElementRef = (0, _inferno.createRef)();
    this.__getterCache = {};
    this.state = {
      validationMessageGuid: `dx-${new _guid.default()}`,
      isValidationMessageVisible: false,
      value: this.props.value !== undefined ? this.props.value : this.props.defaultValue
    };
    this.updateValidationMessageVisibility = this.updateValidationMessageVisibility.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.onFocusIn = this.onFocusIn.bind(this);
  }
  createEffects() {
    return [new _index.InfernoEffect(this.updateValidationMessageVisibility, [this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]), (0, _index.createReRenderEffect)()];
  }
  updateEffects() {
    var _this$_effects;
    (_this$_effects = this._effects) === null || _this$_effects === void 0 || (_this$_effects = _this$_effects[0]) === null || _this$_effects === void 0 || _this$_effects.update([this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]);
  }
  updateValidationMessageVisibility() {
    this.setState(() => ({
      isValidationMessageVisible: this.shouldShowValidationMessage
    }));
  }
  onFocusIn(event) {
    const {
      onFocusIn
    } = this.props;
    onFocusIn === null || onFocusIn === void 0 || onFocusIn(event);
  }
  get cssClasses() {
    return `${getCssClasses(_extends({}, this.props, {
      value: this.props.value !== undefined ? this.props.value : this.state.value
    }))}`;
  }
  get shouldShowValidationMessage() {
    const {
      isValid,
      validationStatus
    } = this.props;
    const validationErrors = this.validationErrors ?? [];
    const isEditorValid = isValid && validationStatus !== 'invalid';
    return !isEditorValid && validationErrors.length > 0;
  }
  get aria() {
    const {
      isValid,
      readOnly
    } = this.props;
    const result = {
      readonly: readOnly ? 'true' : 'false',
      invalid: !isValid ? 'true' : 'false'
    };
    if (this.shouldShowValidationMessage) {
      result.describedBy = this.state.validationMessageGuid;
    }
    return _extends({}, result, this.props.aria);
  }
  get validationErrors() {
    if (this.__getterCache.validationErrors !== undefined) {
      return this.__getterCache.validationErrors;
    }
    // eslint-disable-next-line no-return-assign, @typescript-eslint/no-explicit-any
    return this.__getterCache.validationErrors = (() => {
      const {
        validationError,
        validationErrors
      } = this.props;
      let allValidationErrors = validationErrors && [...validationErrors];
      if (!allValidationErrors && validationError) {
        allValidationErrors = [_extends({}, validationError)];
      }
      return allValidationErrors;
    })();
  }
  get validationMessageTarget() {
    var _this$rootElementRef;
    return (_this$rootElementRef = this.rootElementRef) === null || _this$rootElementRef === void 0 ? void 0 : _this$rootElementRef.current;
  }
  get restAttributes() {
    const _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  focus() {
    this.widgetRef.current.focus();
  }
  blur() {
    this.widgetRef.current.blur();
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.validationError !== nextProps.validationError || this.props.validationErrors !== nextProps.validationErrors) {
      this.__getterCache.validationErrors = undefined;
    }
  }
  render() {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
      "rootElementRef": this.rootElementRef,
      "aria": this.aria,
      "classes": this.cssClasses,
      "activeStateEnabled": this.props.activeStateEnabled,
      "focusStateEnabled": this.props.focusStateEnabled,
      "hoverStateEnabled": this.props.hoverStateEnabled,
      "accessKey": this.props.accessKey,
      "className": this.props.className,
      "rtlEnabled": this.props.rtlEnabled,
      "hint": this.props.hint,
      "disabled": this.props.disabled,
      "height": this.props.height,
      "width": this.props.width,
      "onFocusIn": this.props.onFocusIn,
      "onClick": this.props.onClick,
      "onKeyDown": this.props.onKeyDown,
      "tabIndex": this.props.tabIndex,
      "visible": this.props.visible
    }, this.restAttributes, {
      children: (0, _inferno.createFragment)([this.props.children, this.state.isValidationMessageVisible && (0, _inferno.createComponentVNode)(2, _validation_message.ValidationMessage, {
        "validationErrors": this.validationErrors,
        "mode": this.props.validationMessageMode,
        "positionSide": this.props.validationMessagePosition,
        "rtlEnabled": this.props.rtlEnabled,
        "target": this.validationMessageTarget,
        "boundary": this.validationMessageTarget,
        "visualContainer": this.validationMessageTarget,
        "contentId": this.state.validationMessageGuid
      })], 0)
    }), null, this.widgetRef));
  }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
exports.Editor = Editor;
function __processTwoWayProps(defaultProps) {
  const twoWayProps = ['value'];
  return Object.keys(defaultProps).reduce((props, propName) => {
    const propValue = defaultProps[propName];
    const defaultPropName = twoWayProps.some(p => p === propName) ? `default${propName.charAt(0).toUpperCase()}${propName.slice(1)}` : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}
Editor.defaultProps = defaultEditorProps;
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any
const __defaultOptionRules = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  Editor.defaultProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(Editor.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps((0, _utils.convertRulesToOptions)(__defaultOptionRules)))));
}