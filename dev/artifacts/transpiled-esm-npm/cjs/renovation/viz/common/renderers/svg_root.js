"use strict";

exports.viewFunction = exports.RootSvgElementProps = exports.RootSvgElement = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _config_context = require("../../../common/config_context");
var _excluded = ["children", "className", "filter", "height", "pointerEvents", "rootElementRef", "styles", "width"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var viewFunction = function viewFunction(_ref) {
  var config = _ref.config,
    _ref$props = _ref.props,
    children = _ref$props.children,
    className = _ref$props.className,
    filter = _ref$props.filter,
    height = _ref$props.height,
    pointerEvents = _ref$props.pointerEvents,
    width = _ref$props.width,
    styles = _ref.styles,
    svgRef = _ref.svgRef;
  return (0, _inferno.createVNode)(32, "svg", className, children, 0, {
    "xmlns": "http://www.w3.org/2000/svg",
    "version": "1.1",
    "fill": "none",
    "stroke": "none",
    "stroke-width": 0,
    "style": (0, _inferno2.normalizeStyles)(styles),
    "width": width,
    "height": height,
    "direction": config !== null && config !== void 0 && config.rtlEnabled ? 'rtl' : 'ltr',
    "pointer-events": pointerEvents,
    "filter": filter
  }, null, svgRef);
};
exports.viewFunction = viewFunction;
var RootSvgElementProps = {
  className: '',
  height: 0,
  width: 0
};
exports.RootSvgElementProps = RootSvgElementProps;
var RootSvgElement = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(RootSvgElement, _InfernoComponent);
  function RootSvgElement(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.svgRef = (0, _inferno.createRef)();
    _this.setRootElementRef = _this.setRootElementRef.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = RootSvgElement.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.setRootElementRef, [])];
  };
  _proto.setRootElementRef = function setRootElementRef() {
    var rootElementRef = this.props.rootElementRef;
    if (rootElementRef) {
      rootElementRef.current = this.svgRef.current;
    }
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      svgRef: this.svgRef,
      config: this.config,
      styles: this.styles,
      restAttributes: this.restAttributes
    });
  };
  _createClass(RootSvgElement, [{
    key: "config",
    get: function get() {
      if (this.context[_config_context.ConfigContext.id]) {
        return this.context[_config_context.ConfigContext.id];
      }
      return _config_context.ConfigContext.defaultValue;
    }
  }, {
    key: "styles",
    get: function get() {
      return _extends({
        display: 'block',
        overflow: 'hidden',
        lineHeight: 'normal',
        msUserSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
      }, this.props.styles);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        filter = _this$props.filter,
        height = _this$props.height,
        pointerEvents = _this$props.pointerEvents,
        rootElementRef = _this$props.rootElementRef,
        styles = _this$props.styles,
        width = _this$props.width,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return RootSvgElement;
}(_inferno2.InfernoComponent);
exports.RootSvgElement = RootSvgElement;
RootSvgElement.defaultProps = RootSvgElementProps;