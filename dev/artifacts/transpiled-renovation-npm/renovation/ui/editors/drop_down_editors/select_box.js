"use strict";

exports.viewFunction = exports.SelectBoxPropsType = exports.SelectBoxProps = exports.SelectBox = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _select_box = _interopRequireDefault(require("../../../../ui/select_box"));
var _dom_component_wrapper = require("../../common/dom_component_wrapper");
var _editor = require("../common/editor");
var _editor_state_props = require("../common/editor_state_props");
var _editor_label_props = require("../common/editor_label_props");
var _excluded = ["accessKey", "activeStateEnabled", "className", "dataSource", "defaultValue", "disabled", "displayExpr", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isDirty", "isValid", "label", "labelMode", "name", "onClick", "onFocusIn", "onKeyDown", "placeholder", "readOnly", "rtlEnabled", "searchEnabled", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "valueExpr", "visible", "width"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var viewFunction = function viewFunction(_ref) {
  var componentProps = _ref.componentProps,
    restAttributes = _ref.restAttributes;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
    "componentType": _select_box.default,
    "componentProps": componentProps,
    "templateNames": ['dropDownButtonTemplate', 'groupTemplate', 'itemTemplate']
  }, restAttributes)));
};
exports.viewFunction = viewFunction;
var SelectBoxProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_editor.EditorProps), Object.getOwnPropertyDescriptors({
  placeholder: '',
  hoverStateEnabled: true,
  searchEnabled: false,
  defaultValue: null,
  isReactComponentWrapper: true
})));
exports.SelectBoxProps = SelectBoxProps;
var SelectBoxPropsType = Object.defineProperties({
  isReactComponentWrapper: true
}, {
  placeholder: {
    get: function get() {
      return SelectBoxProps.placeholder;
    },
    configurable: true,
    enumerable: true
  },
  hoverStateEnabled: {
    get: function get() {
      return _editor_state_props.EditorStateProps.hoverStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  searchEnabled: {
    get: function get() {
      return SelectBoxProps.searchEnabled;
    },
    configurable: true,
    enumerable: true
  },
  defaultValue: {
    get: function get() {
      return SelectBoxProps.defaultValue;
    },
    configurable: true,
    enumerable: true
  },
  readOnly: {
    get: function get() {
      return SelectBoxProps.readOnly;
    },
    configurable: true,
    enumerable: true
  },
  name: {
    get: function get() {
      return SelectBoxProps.name;
    },
    configurable: true,
    enumerable: true
  },
  validationError: {
    get: function get() {
      return SelectBoxProps.validationError;
    },
    configurable: true,
    enumerable: true
  },
  validationErrors: {
    get: function get() {
      return SelectBoxProps.validationErrors;
    },
    configurable: true,
    enumerable: true
  },
  validationMessageMode: {
    get: function get() {
      return SelectBoxProps.validationMessageMode;
    },
    configurable: true,
    enumerable: true
  },
  validationMessagePosition: {
    get: function get() {
      return SelectBoxProps.validationMessagePosition;
    },
    configurable: true,
    enumerable: true
  },
  validationStatus: {
    get: function get() {
      return SelectBoxProps.validationStatus;
    },
    configurable: true,
    enumerable: true
  },
  isValid: {
    get: function get() {
      return SelectBoxProps.isValid;
    },
    configurable: true,
    enumerable: true
  },
  isDirty: {
    get: function get() {
      return SelectBoxProps.isDirty;
    },
    configurable: true,
    enumerable: true
  },
  inputAttr: {
    get: function get() {
      return SelectBoxProps.inputAttr;
    },
    configurable: true,
    enumerable: true
  },
  className: {
    get: function get() {
      return SelectBoxProps.className;
    },
    configurable: true,
    enumerable: true
  },
  activeStateEnabled: {
    get: function get() {
      return _editor_state_props.EditorStateProps.activeStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  disabled: {
    get: function get() {
      return SelectBoxProps.disabled;
    },
    configurable: true,
    enumerable: true
  },
  focusStateEnabled: {
    get: function get() {
      return _editor_state_props.EditorStateProps.focusStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  tabIndex: {
    get: function get() {
      return SelectBoxProps.tabIndex;
    },
    configurable: true,
    enumerable: true
  },
  visible: {
    get: function get() {
      return SelectBoxProps.visible;
    },
    configurable: true,
    enumerable: true
  },
  label: {
    get: function get() {
      return _editor_label_props.EditorLabelProps.label;
    },
    configurable: true,
    enumerable: true
  },
  labelMode: {
    get: function get() {
      return _editor_label_props.EditorLabelProps.labelMode;
    },
    configurable: true,
    enumerable: true
  }
});
exports.SelectBoxPropsType = SelectBoxPropsType;
var SelectBox = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(SelectBox, _BaseInfernoComponent);
  function SelectBox(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {
      value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
    };
    return _this;
  }
  var _proto = SelectBox.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
      componentProps: this.componentProps,
      restAttributes: this.restAttributes
    });
  };
  _createClass(SelectBox, [{
    key: "componentProps",
    get: function get() {
      return _extends({}, this.props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      });
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$value = _extends({}, this.props, {
          value: this.props.value !== undefined ? this.props.value : this.state.value
        }),
        accessKey = _this$props$value.accessKey,
        activeStateEnabled = _this$props$value.activeStateEnabled,
        className = _this$props$value.className,
        dataSource = _this$props$value.dataSource,
        defaultValue = _this$props$value.defaultValue,
        disabled = _this$props$value.disabled,
        displayExpr = _this$props$value.displayExpr,
        focusStateEnabled = _this$props$value.focusStateEnabled,
        height = _this$props$value.height,
        hint = _this$props$value.hint,
        hoverStateEnabled = _this$props$value.hoverStateEnabled,
        inputAttr = _this$props$value.inputAttr,
        isDirty = _this$props$value.isDirty,
        isValid = _this$props$value.isValid,
        label = _this$props$value.label,
        labelMode = _this$props$value.labelMode,
        name = _this$props$value.name,
        onClick = _this$props$value.onClick,
        onFocusIn = _this$props$value.onFocusIn,
        onKeyDown = _this$props$value.onKeyDown,
        placeholder = _this$props$value.placeholder,
        readOnly = _this$props$value.readOnly,
        rtlEnabled = _this$props$value.rtlEnabled,
        searchEnabled = _this$props$value.searchEnabled,
        tabIndex = _this$props$value.tabIndex,
        validationError = _this$props$value.validationError,
        validationErrors = _this$props$value.validationErrors,
        validationMessageMode = _this$props$value.validationMessageMode,
        validationMessagePosition = _this$props$value.validationMessagePosition,
        validationStatus = _this$props$value.validationStatus,
        value = _this$props$value.value,
        valueChange = _this$props$value.valueChange,
        valueExpr = _this$props$value.valueExpr,
        visible = _this$props$value.visible,
        width = _this$props$value.width,
        restProps = _objectWithoutProperties(_this$props$value, _excluded);
      return restProps;
    }
  }]);
  return SelectBox;
}(_inferno2.BaseInfernoComponent);
exports.SelectBox = SelectBox;
SelectBox.defaultProps = SelectBoxPropsType;