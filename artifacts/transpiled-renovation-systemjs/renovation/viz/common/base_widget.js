!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/viz/common/base_widget.js"], ["inferno","@devextreme/runtime/inferno","../../../core/utils/type","../../utils/combine_classes","./base_props","../../common/config_context","../../common/config_provider","./renderers/svg_root","./renderers/gray_scale_filter","./utils","../../utils/resolve_rtl","./renderers/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/viz/common/base_widget.js", ["inferno", "@devextreme/runtime/inferno", "../../../core/utils/type", "../../utils/combine_classes", "./base_props", "../../common/config_context", "../../common/config_provider", "./renderers/svg_root", "./renderers/gray_scale_filter", "./utils", "../../utils/resolve_rtl", "./renderers/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.viewFunction = exports.Props = exports.BaseWidget = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _type = $__require("../../../core/utils/type");
  var _combine_classes = $__require("../../utils/combine_classes");
  var _base_props = $__require("./base_props");
  var _config_context = $__require("../../common/config_context");
  var _config_provider = $__require("../../common/config_provider");
  var _svg_root = $__require("./renderers/svg_root");
  var _gray_scale_filter = $__require("./renderers/gray_scale_filter");
  var _utils = $__require("./utils");
  var _resolve_rtl = $__require("../../utils/resolve_rtl");
  var _utils2 = $__require("./renderers/utils");
  var _excluded = ["canvas", "canvasChange", "children", "className", "classes", "defaultCanvas", "disabled", "margin", "pointerEvents", "rootElementRef", "rtlEnabled", "size"];
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];
      }
    }return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];
    }return target;
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var DEFAULT_CANVAS = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0
  };
  var getCssClasses = function getCssClasses(model) {
    var containerClassesMap = _defineProperty({
      'dx-widget': true,
      'dx-visibility-change-handler': true
    }, String(model.className), !!model.className);
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
        defaultCanvas: defaultCanvas,
        size: size,
        margin: margin
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
          className: className
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","../../../core/utils/type","../../utils/combine_classes","./base_props","../../common/config_context","../../common/config_provider","./renderers/svg_root","./renderers/gray_scale_filter","./utils","../../utils/resolve_rtl","./renderers/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("../../../core/utils/type"), require("../../utils/combine_classes"), require("./base_props"), require("../../common/config_context"), require("../../common/config_provider"), require("./renderers/svg_root"), require("./renderers/gray_scale_filter"), require("./utils"), require("../../utils/resolve_rtl"), require("./renderers/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=base_widget.js.map