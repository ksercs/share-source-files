/**
* DevExtreme (renovation/viz/common/base_widget.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.Props = exports.BaseWidget = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _type = require("../../../core/utils/type");
var _combine_classes = require("../../utils/combine_classes");
var _base_props = require("./base_props");
var _config_context = require("../../common/config_context");
var _config_provider = require("../../common/config_provider");
var _svg_root = require("./renderers/svg_root");
var _gray_scale_filter = require("./renderers/gray_scale_filter");
var _utils = require("./utils");
var _resolve_rtl = require("../../utils/resolve_rtl");
var _utils2 = require("./renderers/utils");
var _excluded = ["canvas", "canvasChange", "children", "className", "classes", "defaultCanvas", "disabled", "margin", "pointerEvents", "rootElementRef", "rtlEnabled", "size"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DEFAULT_CANVAS = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
var getCssClasses = function getCssClasses(model) {
  var containerClassesMap = {
    'dx-widget': true,
    'dx-visibility-change-handler': true,
    [String(model.className)]: !!model.className
  };
  return (0, _combine_classes.combineClasses)(containerClassesMap);
};
var calculateCanvas = function calculateCanvas(model) {
  var _model$size, _model$margin, _model$defaultCanvas;
  var _ref = (_model$size = model.size) !== null && _model$size !== void 0 ? _model$size : {},
    height = _ref.height,
    width = _ref.width;
  var margin = (_model$margin = model.margin) !== null && _model$margin !== void 0 ? _model$margin : {};
  var defaultCanvas = (_model$defaultCanvas = model.defaultCanvas) !== null && _model$defaultCanvas !== void 0 ? _model$defaultCanvas : DEFAULT_CANVAS;
  var elementWidth = !(0, _utils.sizeIsValid)(width) ? (0, _utils.getElementWidth)(model.element) : 0;
  var elementHeight = !(0, _utils.sizeIsValid)(height) ? (0, _utils.getElementHeight)(model.element) : 0;
  var canvas = {
    width: width && width <= 0 ? 0 : Math.floor((0, _utils.pickPositiveValue)([width, elementWidth, defaultCanvas.width])),
    height: height && height <= 0 ? 0 : Math.floor((0, _utils.pickPositiveValue)([height, elementHeight, defaultCanvas.height])),
    left: (0, _utils.pickPositiveValue)([margin.left, defaultCanvas.left]),
    top: (0, _utils.pickPositiveValue)([margin.top, defaultCanvas.top]),
    right: (0, _utils.pickPositiveValue)([margin.right, defaultCanvas.right]),
    bottom: (0, _utils.pickPositiveValue)([margin.bottom, defaultCanvas.bottom])
  };
  if (canvas.width - canvas.left - canvas.right <= 0 || canvas.height - canvas.top - canvas.bottom <= 0) {
    return _extends({}, defaultCanvas);
  }
  return canvas;
};
var viewFunction = function viewFunction(viewModel) {
  var grayFilterId = viewModel.props.disabled ? (0, _utils2.getNextDefsSvgId)() : undefined;
  var canvas = viewModel.props.canvas || DEFAULT_CANVAS;
  var widget = (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", viewModel.cssClasses, (0, _inferno.createComponentVNode)(2, _svg_root.RootSvgElement, {
    "rootElementRef": viewModel.svgElementRef,
    "className": viewModel.props.classes,
    "width": canvas.width,
    "height": canvas.height,
    "pointerEvents": viewModel.pointerEventsState,
    "filter": grayFilterId ? (0, _utils2.getFuncIri)(grayFilterId) : undefined,
    children: (0, _inferno.createFragment)([(0, _inferno.createVNode)(32, "defs", null, grayFilterId && (0, _inferno.createComponentVNode)(2, _gray_scale_filter.GrayScaleFilter, {
      "id": grayFilterId
    }), 0), viewModel.props.children], 0)
  }), 2, _extends({}, viewModel.restAttributes), null, viewModel.containerRef));
  return viewModel.shouldRenderConfigProvider ? (0, _inferno.createComponentVNode)(2, _config_provider.ConfigProvider, {
    "rtlEnabled": viewModel.rtlEnabled,
    children: widget
  }) : widget;
};
exports.viewFunction = viewFunction;
var Props = _base_props.BaseWidgetProps;
exports.Props = Props;
var BaseWidget = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(BaseWidget, _InfernoComponent);
  function BaseWidget(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.containerRef = (0, _inferno.createRef)();
    _this.svgElementRef = (0, _inferno.createRef)();
    _this.state = {
      canvas: _this.props.canvas !== undefined ? _this.props.canvas : _this.props.defaultCanvas
    };
    _this.setRootElementRef = _this.setRootElementRef.bind(_assertThisInitialized(_this));
    _this.setCanvasEffect = _this.setCanvasEffect.bind(_assertThisInitialized(_this));
    _this.svg = _this.svg.bind(_assertThisInitialized(_this));
    _this.setCanvas = _this.setCanvas.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = BaseWidget.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.setRootElementRef, []), new _inferno2.InfernoEffect(this.setCanvasEffect, [this.state.canvas, this.props.canvas, this.props.defaultCanvas, this.props.margin, this.props.size, this.props.canvasChange])];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.state.canvas, this.props.canvas, this.props.defaultCanvas, this.props.margin, this.props.size, this.props.canvasChange]);
  };
  _proto.setRootElementRef = function setRootElementRef() {
    this.props.rootElementRef.current = this.containerRef.current;
  };
  _proto.setCanvasEffect = function setCanvasEffect() {
    this.setCanvas();
  };
  _proto.setCanvas = function setCanvas() {
    var _this$props = this.props,
      defaultCanvas = _this$props.defaultCanvas,
      margin = _this$props.margin,
      size = _this$props.size;
    var newCanvas = calculateCanvas({
      element: this.containerRef.current,
      defaultCanvas,
      size,
      margin
    });
    if ((0, _type.isDefined)(newCanvas.height) && (0, _type.isDefined)(newCanvas.width) && (0, _utils.isUpdatedFlatObject)(this.props.canvas !== undefined ? this.props.canvas : this.state.canvas, newCanvas)) {
      {
        var __newValue;
        this.setState(function (__state_argument) {
          __newValue = newCanvas;
          return {
            canvas: __newValue
          };
        });
        this.props.canvasChange(__newValue);
      }
    }
  };
  _proto.svg = function svg() {
    return this.svgElementRef.current;
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        canvas: this.props.canvas !== undefined ? this.props.canvas : this.state.canvas
      }),
      containerRef: this.containerRef,
      svgElementRef: this.svgElementRef,
      config: this.config,
      shouldRenderConfigProvider: this.shouldRenderConfigProvider,
      rtlEnabled: this.rtlEnabled,
      pointerEventsState: this.pointerEventsState,
      cssClasses: this.cssClasses,
      setCanvas: this.setCanvas,
      restAttributes: this.restAttributes
    });
  };
  _createClass(BaseWidget, [{
    key: "config",
    get: function get() {
      if (this.context[_config_context.ConfigContext.id]) {
        return this.context[_config_context.ConfigContext.id];
      }
      return _config_context.ConfigContext.defaultValue;
    }
  }, {
    key: "shouldRenderConfigProvider",
    get: function get() {
      var rtlEnabled = this.props.rtlEnabled;
      return (0, _resolve_rtl.resolveRtlEnabledDefinition)(rtlEnabled, this.config);
    }
  }, {
    key: "rtlEnabled",
    get: function get() {
      var rtlEnabled = this.props.rtlEnabled;
      return (0, _resolve_rtl.resolveRtlEnabled)(rtlEnabled, this.config);
    }
  }, {
    key: "pointerEventsState",
    get: function get() {
      var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        pointerEvents = _this$props2.pointerEvents;
      return disabled ? 'none' : pointerEvents;
    }
  }, {
    key: "cssClasses",
    get: function get() {
      var className = this.props.className;
      return getCssClasses({
        className
      });
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$canvas = _extends({}, this.props, {
          canvas: this.props.canvas !== undefined ? this.props.canvas : this.state.canvas
        }),
        canvas = _this$props$canvas.canvas,
        canvasChange = _this$props$canvas.canvasChange,
        children = _this$props$canvas.children,
        className = _this$props$canvas.className,
        classes = _this$props$canvas.classes,
        defaultCanvas = _this$props$canvas.defaultCanvas,
        disabled = _this$props$canvas.disabled,
        margin = _this$props$canvas.margin,
        pointerEvents = _this$props$canvas.pointerEvents,
        rootElementRef = _this$props$canvas.rootElementRef,
        rtlEnabled = _this$props$canvas.rtlEnabled,
        size = _this$props$canvas.size,
        restProps = _objectWithoutProperties(_this$props$canvas, _excluded);
      return restProps;
    }
  }]);
  return BaseWidget;
}(_inferno2.InfernoComponent);
exports.BaseWidget = BaseWidget;
BaseWidget.defaultProps = Props;
