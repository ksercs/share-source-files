/**
* DevExtreme (renovation/ui/overlays/overlay.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.viewFunction = exports.OverlayProps = exports.Overlay = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _ui = _interopRequireDefault(require("../../../ui/overlay/ui.overlay"));
var _dom_component_wrapper = require("../common/dom_component_wrapper");
var _base_props = require("../common/base_props");
var _excluded = ["_checkParentVisibility", "accessKey", "activeStateEnabled", "animation", "className", "container", "contentTemplate", "disabled", "focusStateEnabled", "height", "hideOnOutsideClick", "hideOnParentScroll", "hint", "hoverStateEnabled", "integrationOptions", "maxWidth", "onClick", "onKeyDown", "position", "propagateOutsideClick", "rtlEnabled", "shading", "tabIndex", "templatesRenderAsynchronously", "visible", "width"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var viewFunction = function viewFunction(_ref) {
  var componentProps = _ref.componentProps,
    restAttributes = _ref.restAttributes;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
    "componentType": _ui.default,
    "componentProps": componentProps,
    "templateNames": []
  }, restAttributes)));
};
exports.viewFunction = viewFunction;
var OverlayProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_base_props.BaseWidgetProps), Object.getOwnPropertyDescriptors({
  integrationOptions: Object.freeze({}),
  templatesRenderAsynchronously: false,
  shading: true,
  hideOnOutsideClick: false,
  hideOnParentScroll: false,
  animation: Object.freeze({
    type: 'pop',
    duration: 300,
    to: {
      opacity: 0,
      scale: 0.55
    },
    from: {
      opacity: 1,
      scale: 1
    }
  }),
  visible: false,
  propagateOutsideClick: true,
  _checkParentVisibility: false,
  rtlEnabled: false,
  contentTemplate: 'content',
  maxWidth: null,
  isReactComponentWrapper: true
})));
exports.OverlayProps = OverlayProps;
var Overlay = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(Overlay, _BaseInfernoComponent);
  function Overlay(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = Overlay.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      componentProps: this.componentProps,
      restAttributes: this.restAttributes
    });
  };
  _createClass(Overlay, [{
    key: "componentProps",
    get: function get() {
      return this.props;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        _checkParentVisibility = _this$props._checkParentVisibility,
        accessKey = _this$props.accessKey,
        activeStateEnabled = _this$props.activeStateEnabled,
        animation = _this$props.animation,
        className = _this$props.className,
        container = _this$props.container,
        contentTemplate = _this$props.contentTemplate,
        disabled = _this$props.disabled,
        focusStateEnabled = _this$props.focusStateEnabled,
        height = _this$props.height,
        hideOnOutsideClick = _this$props.hideOnOutsideClick,
        hideOnParentScroll = _this$props.hideOnParentScroll,
        hint = _this$props.hint,
        hoverStateEnabled = _this$props.hoverStateEnabled,
        integrationOptions = _this$props.integrationOptions,
        maxWidth = _this$props.maxWidth,
        onClick = _this$props.onClick,
        onKeyDown = _this$props.onKeyDown,
        position = _this$props.position,
        propagateOutsideClick = _this$props.propagateOutsideClick,
        rtlEnabled = _this$props.rtlEnabled,
        shading = _this$props.shading,
        tabIndex = _this$props.tabIndex,
        templatesRenderAsynchronously = _this$props.templatesRenderAsynchronously,
        visible = _this$props.visible,
        width = _this$props.width,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return Overlay;
}(_inferno2.BaseInfernoComponent);
exports.Overlay = Overlay;
Overlay.defaultProps = OverlayProps;
