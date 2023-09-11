/**
* DevExtreme (renovation/ui/editors/drop_down_editors/date_box.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.DateBoxPropsType = exports.DateBoxProps = exports.DateBox = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _date_box = _interopRequireDefault(require("../../../../ui/date_box"));
var _dom_component_wrapper = require("../../common/dom_component_wrapper");
var _editor = require("../common/editor");
var _editor_state_props = require("../common/editor_state_props");
var _editor_label_props = require("../common/editor_label_props");
var _excluded = ["accessKey", "activeStateEnabled", "calendarOptions", "className", "defaultValue", "disabled", "field", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isDirty", "isValid", "label", "labelMode", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "tabIndex", "type", "useMaskBehavior", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
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
    "componentType": _date_box.default,
    "componentProps": componentProps,
    "templateNames": []
  }, restAttributes)));
};
exports.viewFunction = viewFunction;
var DateBoxProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_editor.EditorProps), Object.getOwnPropertyDescriptors({
  type: 'date',
  useMaskBehavior: false,
  defaultValue: null,
  isReactComponentWrapper: true
})));
exports.DateBoxProps = DateBoxProps;
var DateBoxPropsType = Object.defineProperties({
  isReactComponentWrapper: true
}, {
  type: {
    get: function get() {
      return DateBoxProps.type;
    },
    configurable: true,
    enumerable: true
  },
  useMaskBehavior: {
    get: function get() {
      return DateBoxProps.useMaskBehavior;
    },
    configurable: true,
    enumerable: true
  },
  defaultValue: {
    get: function get() {
      return DateBoxProps.defaultValue;
    },
    configurable: true,
    enumerable: true
  },
  readOnly: {
    get: function get() {
      return DateBoxProps.readOnly;
    },
    configurable: true,
    enumerable: true
  },
  name: {
    get: function get() {
      return DateBoxProps.name;
    },
    configurable: true,
    enumerable: true
  },
  validationError: {
    get: function get() {
      return DateBoxProps.validationError;
    },
    configurable: true,
    enumerable: true
  },
  validationErrors: {
    get: function get() {
      return DateBoxProps.validationErrors;
    },
    configurable: true,
    enumerable: true
  },
  validationMessageMode: {
    get: function get() {
      return DateBoxProps.validationMessageMode;
    },
    configurable: true,
    enumerable: true
  },
  validationMessagePosition: {
    get: function get() {
      return DateBoxProps.validationMessagePosition;
    },
    configurable: true,
    enumerable: true
  },
  validationStatus: {
    get: function get() {
      return DateBoxProps.validationStatus;
    },
    configurable: true,
    enumerable: true
  },
  isValid: {
    get: function get() {
      return DateBoxProps.isValid;
    },
    configurable: true,
    enumerable: true
  },
  isDirty: {
    get: function get() {
      return DateBoxProps.isDirty;
    },
    configurable: true,
    enumerable: true
  },
  inputAttr: {
    get: function get() {
      return DateBoxProps.inputAttr;
    },
    configurable: true,
    enumerable: true
  },
  className: {
    get: function get() {
      return DateBoxProps.className;
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
      return DateBoxProps.disabled;
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
  hoverStateEnabled: {
    get: function get() {
      return _editor_state_props.EditorStateProps.hoverStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  tabIndex: {
    get: function get() {
      return DateBoxProps.tabIndex;
    },
    configurable: true,
    enumerable: true
  },
  visible: {
    get: function get() {
      return DateBoxProps.visible;
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
exports.DateBoxPropsType = DateBoxPropsType;
var DateBox = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(DateBox, _BaseInfernoComponent);
  function DateBox(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {
      value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
    };
    return _this;
  }
  var _proto = DateBox.prototype;
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
  _createClass(DateBox, [{
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
        calendarOptions = _this$props$value.calendarOptions,
        className = _this$props$value.className,
        defaultValue = _this$props$value.defaultValue,
        disabled = _this$props$value.disabled,
        field = _this$props$value.field,
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
        readOnly = _this$props$value.readOnly,
        rtlEnabled = _this$props$value.rtlEnabled,
        tabIndex = _this$props$value.tabIndex,
        type = _this$props$value.type,
        useMaskBehavior = _this$props$value.useMaskBehavior,
        validationError = _this$props$value.validationError,
        validationErrors = _this$props$value.validationErrors,
        validationMessageMode = _this$props$value.validationMessageMode,
        validationMessagePosition = _this$props$value.validationMessagePosition,
        validationStatus = _this$props$value.validationStatus,
        value = _this$props$value.value,
        valueChange = _this$props$value.valueChange,
        visible = _this$props$value.visible,
        width = _this$props$value.width,
        restProps = _objectWithoutProperties(_this$props$value, _excluded);
      return restProps;
    }
  }]);
  return DateBox;
}(_inferno2.BaseInfernoComponent);
exports.DateBox = DateBox;
DateBox.defaultProps = DateBoxPropsType;
