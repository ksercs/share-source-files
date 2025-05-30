/**
* DevExtreme (renovation/viz/common/renderers/svg_path.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.PathSvgElementProps = exports.PathSvgElement = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _base_graphics_props = _interopRequireDefault(require("./base_graphics_props"));
var _utils = require("./utils");
var _excluded = ["className", "d", "dashStyle", "fill", "opacity", "pointerEvents", "points", "rotate", "rotateX", "rotateY", "scaleX", "scaleY", "sharp", "sharpDirection", "stroke", "strokeLineCap", "strokeOpacity", "strokeWidth", "translateX", "translateY", "type"];
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
  var computedProps = _ref.computedProps,
    d = _ref.d,
    pathRef = _ref.pathRef;
  var className = computedProps.className,
    fill = computedProps.fill,
    opacity = computedProps.opacity,
    pointerEvents = computedProps.pointerEvents,
    stroke = computedProps.stroke,
    strokeLineCap = computedProps.strokeLineCap,
    strokeOpacity = computedProps.strokeOpacity,
    strokeWidth = computedProps.strokeWidth;
  return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(32, "path", className, null, 1, _extends({
    "d": d,
    "fill": fill,
    "stroke": stroke,
    "stroke-width": strokeWidth,
    "stroke-opacity": strokeOpacity,
    "stroke-linecap": strokeLineCap,
    "opacity": opacity,
    "pointer-events": pointerEvents
  }, (0, _utils.getGraphicExtraProps)(computedProps)), null, pathRef));
};
exports.viewFunction = viewFunction;
var PathSvgElementProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_base_graphics_props.default), Object.getOwnPropertyDescriptors({
  type: 'line',
  d: ''
})));
exports.PathSvgElementProps = PathSvgElementProps;
var PathSvgElement = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(PathSvgElement, _BaseInfernoComponent);
  function PathSvgElement(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.pathRef = (0, _inferno.createRef)();
    return _this;
  }
  var _proto = PathSvgElement.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      pathRef: this.pathRef,
      d: this.d,
      computedProps: this.computedProps,
      restAttributes: this.restAttributes
    });
  };
  _createClass(PathSvgElement, [{
    key: "d",
    get: function get() {
      var _this$props$points;
      var path = this.props.d;
      var segments = [];
      if ((_this$props$points = this.props.points) !== null && _this$props$points !== void 0 && _this$props$points.length) {
        segments = (0, _utils.buildPathSegments)(this.props.points, this.props.type);
        segments && (path = (0, _utils.combinePathParam)(segments));
      }
      return path;
    }
  }, {
    key: "computedProps",
    get: function get() {
      return this.props;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        className = _this$props.className,
        d = _this$props.d,
        dashStyle = _this$props.dashStyle,
        fill = _this$props.fill,
        opacity = _this$props.opacity,
        pointerEvents = _this$props.pointerEvents,
        points = _this$props.points,
        rotate = _this$props.rotate,
        rotateX = _this$props.rotateX,
        rotateY = _this$props.rotateY,
        scaleX = _this$props.scaleX,
        scaleY = _this$props.scaleY,
        sharp = _this$props.sharp,
        sharpDirection = _this$props.sharpDirection,
        stroke = _this$props.stroke,
        strokeLineCap = _this$props.strokeLineCap,
        strokeOpacity = _this$props.strokeOpacity,
        strokeWidth = _this$props.strokeWidth,
        translateX = _this$props.translateX,
        translateY = _this$props.translateY,
        type = _this$props.type,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return PathSvgElement;
}(_inferno2.BaseInfernoComponent);
exports.PathSvgElement = PathSvgElement;
PathSvgElement.defaultProps = PathSvgElementProps;
