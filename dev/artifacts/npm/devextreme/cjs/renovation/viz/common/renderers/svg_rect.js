/**
* DevExtreme (cjs/renovation/viz/common/renderers/svg_rect.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.RectSvgElementProps = exports.RectSvgElement = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _base_graphics_props = _interopRequireDefault(require("./base_graphics_props"));
var _utils = require("./utils");
var _excluded = ["className", "dashStyle", "fill", "height", "opacity", "rotate", "rotateX", "rotateY", "rx", "ry", "scaleX", "scaleY", "sharp", "sharpDirection", "stroke", "strokeOpacity", "strokeWidth", "translateX", "translateY", "width", "x", "y"];
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
  var parsedProps = _ref.parsedProps,
    rectRef = _ref.rectRef;
  var fill = parsedProps.fill,
    height = parsedProps.height,
    opacity = parsedProps.opacity,
    rx = parsedProps.rx,
    ry = parsedProps.ry,
    stroke = parsedProps.stroke,
    strokeOpacity = parsedProps.strokeOpacity,
    strokeWidth = parsedProps.strokeWidth,
    width = parsedProps.width,
    x = parsedProps.x,
    y = parsedProps.y;
  return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(32, "rect", null, null, 1, _extends({
    "x": x,
    "y": y,
    "width": width,
    "height": height,
    "rx": rx,
    "ry": ry,
    "fill": fill,
    "stroke": stroke,
    "stroke-width": strokeWidth,
    "stroke-opacity": strokeOpacity,
    "opacity": opacity
  }, (0, _utils.getGraphicExtraProps)(parsedProps, x, y)), null, rectRef));
};
exports.viewFunction = viewFunction;
var RectSvgElementProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_base_graphics_props.default), Object.getOwnPropertyDescriptors({
  x: 0,
  y: 0,
  width: 0,
  height: 0
})));
exports.RectSvgElementProps = RectSvgElementProps;
var RectSvgElement = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(RectSvgElement, _BaseInfernoComponent);
  function RectSvgElement(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.rectRef = (0, _inferno.createRef)();
    return _this;
  }
  var _proto = RectSvgElement.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      rectRef: this.rectRef,
      parsedProps: this.parsedProps,
      restAttributes: this.restAttributes
    });
  };
  _createClass(RectSvgElement, [{
    key: "parsedProps",
    get: function get() {
      var tmpProps = _extends({}, this.props);
      var height = tmpProps.height,
        strokeWidth = tmpProps.strokeWidth,
        width = tmpProps.width,
        x = tmpProps.x,
        y = tmpProps.y;
      if (x !== undefined || y !== undefined || width !== undefined || height !== undefined || strokeWidth !== undefined) {
        var tmpX = x !== undefined ? x : 0;
        var tmpY = y !== undefined ? y : 0;
        var tmpWidth = width !== undefined ? width : 0;
        var tmpHeight = height !== undefined ? height : 0;
        var sw = strokeWidth !== undefined ? strokeWidth : 0;
        var maxSW = ~~((tmpWidth < tmpHeight ? tmpWidth : tmpHeight) / 2);
        var newSW = Math.min(sw, maxSW);
        tmpProps.x = tmpX + newSW / 2;
        tmpProps.y = tmpY + newSW / 2;
        tmpProps.width = tmpWidth - newSW;
        tmpProps.height = tmpHeight - newSW;
        (sw !== newSW || !(newSW === 0 && strokeWidth === undefined)) && (tmpProps.strokeWidth = newSW);
      }
      tmpProps.sharp && (tmpProps.sharp = false);
      return tmpProps;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        className = _this$props.className,
        dashStyle = _this$props.dashStyle,
        fill = _this$props.fill,
        height = _this$props.height,
        opacity = _this$props.opacity,
        rotate = _this$props.rotate,
        rotateX = _this$props.rotateX,
        rotateY = _this$props.rotateY,
        rx = _this$props.rx,
        ry = _this$props.ry,
        scaleX = _this$props.scaleX,
        scaleY = _this$props.scaleY,
        sharp = _this$props.sharp,
        sharpDirection = _this$props.sharpDirection,
        stroke = _this$props.stroke,
        strokeOpacity = _this$props.strokeOpacity,
        strokeWidth = _this$props.strokeWidth,
        translateX = _this$props.translateX,
        translateY = _this$props.translateY,
        width = _this$props.width,
        x = _this$props.x,
        y = _this$props.y,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return RectSvgElement;
}(_inferno2.BaseInfernoComponent);
exports.RectSvgElement = RectSvgElement;
RectSvgElement.defaultProps = RectSvgElementProps;
