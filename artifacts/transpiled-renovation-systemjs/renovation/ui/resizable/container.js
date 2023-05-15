!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/resizable/container.js"], ["inferno","@devextreme/runtime/inferno","./handle","../../utils/combine_classes","../../../events/visibility_change","../../../core/options/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/ui/resizable/container.js", ["inferno", "@devextreme/runtime/inferno", "./handle", "../../utils/combine_classes", "../../../events/visibility_change", "../../../core/options/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.ResizableContainerProps = exports.ResizableContainer = void 0;
  exports.defaultOptions = defaultOptions;
  exports.viewFunction = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _handle = $__require("./handle");
  var _combine_classes = $__require("../../utils/combine_classes");
  var _visibility_change = $__require("../../../events/visibility_change");
  var _utils = $__require("../../../core/options/utils");
  var _excluded = ["children", "disabled", "handles", "height", "mainRef", "onResize", "onResizeEnd", "onResizeStart", "rtlEnabled", "width"];
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
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
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
  var getCssClasses = function getCssClasses(disabled, rtlEnabled, isResizing) {
    return (0, _combine_classes.combineClasses)({
      'dx-resizable': true,
      'dx-state-disabled': disabled,
      'dx-rtl': rtlEnabled,
      'dx-resizable-resizing': isResizing
    });
  };
  var viewFunction = function viewFunction(viewModel) {
    var cssClasses = viewModel.cssClasses,
        handles = viewModel.handles,
        mainContainerRef = viewModel.mainContainerRef,
        onHandleResize = viewModel.onHandleResize,
        onHandleResizeEnd = viewModel.onHandleResizeEnd,
        onHandleResizeStart = viewModel.onHandleResizeStart,
        props = viewModel.props,
        restAttributes = viewModel.restAttributes,
        styles = viewModel.styles;
    var children = props.children,
        disabled = props.disabled;
    return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", cssClasses, [children, handles.map(function (handleType) {
      return (0, _inferno.createComponentVNode)(2, _handle.ResizableHandle, {
        "onResizeStart": function onResizeStart(event) {
          return onHandleResizeStart(event, handleType);
        },
        "onResize": function onResize(event) {
          return onHandleResize(event, handleType);
        },
        "onResizeEnd": function onResizeEnd(event) {
          return onHandleResizeEnd(event, handleType);
        },
        "disabled": disabled,
        "direction": handleType
      }, handleType);
    })], 0, _extends({
      "style": (0, _inferno2.normalizeStyles)(styles)
    }, restAttributes), null, mainContainerRef));
  };
  exports.viewFunction = viewFunction;
  var ResizableContainerProps = {
    handles: Object.freeze([]),
    children: Object.freeze([]),
    rtlEnabled: false,
    disabled: false
  };
  exports.ResizableContainerProps = ResizableContainerProps;
  var ResizableContainer = /*#__PURE__*/function (_InfernoComponent) {
    _inheritsLoose(ResizableContainer, _InfernoComponent);
    function ResizableContainer(props) {
      var _this;
      _this = _InfernoComponent.call(this, props) || this;
      _this.startX = Number.NaN;
      _this.startY = Number.NaN;
      _this.mainContainerRef = (0, _inferno.createRef)();
      _this.__getterCache = {};
      _this.state = {
        isResizing: false
      };
      _this.forwardRefInitEffect = _this.forwardRefInitEffect.bind(_assertThisInitialized(_this));
      _this.onHandleResizeStart = _this.onHandleResizeStart.bind(_assertThisInitialized(_this));
      _this.onHandleResize = _this.onHandleResize.bind(_assertThisInitialized(_this));
      _this.onHandleResizeEnd = _this.onHandleResizeEnd.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = ResizableContainer.prototype;
    _proto.createEffects = function createEffects() {
      return [new _inferno2.InfernoEffect(this.forwardRefInitEffect, [])];
    };
    _proto.forwardRefInitEffect = function forwardRefInitEffect() {
      if (this.props.mainRef) {
        this.props.mainRef.current = this.mainContainerRef.current;
      }
      return undefined;
    };
    _proto.onHandleResizeStart = function onHandleResizeStart(event, handle) {
      var _this$props$onResizeS, _this$props;
      this.setState(function (__state_argument) {
        return {
          isResizing: true
        };
      });
      this.startX = event.clientX;
      this.startY = event.clientY;
      (_this$props$onResizeS = (_this$props = this.props).onResizeStart) === null || _this$props$onResizeS === void 0 ? void 0 : _this$props$onResizeS.call(_this$props, {
        event: event,
        handle: handle
      });
      event.targetElements = [];
      return undefined;
    };
    _proto.onHandleResize = function onHandleResize(event, handle) {
      var onResize = this.props.onResize;
      onResize === null || onResize === void 0 ? void 0 : onResize({
        event: event,
        handle: handle,
        delta: {
          x: event.clientX - this.startX,
          y: event.clientY - this.startY
        }
      });
      (0, _visibility_change.triggerResizeEvent)(this.mainContainerRef.current);
      return undefined;
    };
    _proto.onHandleResizeEnd = function onHandleResizeEnd(event, handle) {
      var _this$props$onResizeE, _this$props2;
      this.setState(function (__state_argument) {
        return {
          isResizing: false
        };
      });
      this.startX = Number.NaN;
      this.startY = Number.NaN;
      (_this$props$onResizeE = (_this$props2 = this.props).onResizeEnd) === null || _this$props$onResizeE === void 0 ? void 0 : _this$props$onResizeE.call(_this$props2, {
        event: event,
        handle: handle
      });
      return undefined;
    };
    _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
      _InfernoComponent.prototype.componentWillUpdate.call(this);
      if (this.props['handles'] !== nextProps['handles']) {
        this.__getterCache['handles'] = undefined;
      }
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props),
        isResizing: this.state.isResizing,
        mainContainerRef: this.mainContainerRef,
        onHandleResizeStart: this.onHandleResizeStart,
        onHandleResize: this.onHandleResize,
        onHandleResizeEnd: this.onHandleResizeEnd,
        cssClasses: this.cssClasses,
        styles: this.styles,
        handles: this.handles,
        restAttributes: this.restAttributes
      });
    };
    _createClass(ResizableContainer, [{
      key: "cssClasses",
      get: function get() {
        var _this$props3 = this.props,
            disabled = _this$props3.disabled,
            rtlEnabled = _this$props3.rtlEnabled;
        return getCssClasses(!!disabled, !!rtlEnabled, this.state.isResizing);
      }
    }, {
      key: "styles",
      get: function get() {
        var _this$props4 = this.props,
            height = _this$props4.height,
            width = _this$props4.width;
        var style = this.restAttributes.style || {};
        return _extends({}, style, {
          height: height,
          width: width
        });
      }
    }, {
      key: "handles",
      get: function get() {
        var _this2 = this;
        if (this.__getterCache['handles'] !== undefined) {
          return this.__getterCache['handles'];
        }
        return this.__getterCache['handles'] = function () {
          var handles = _this2.props.handles;
          if (typeof handles === 'string') {
            handles = [handles];
          }
          var result = handles.map(function (handle) {
            return handle;
          });
          if (result.includes('bottom')) {
            result.includes('right') && result.push('corner-bottom-right');
            result.includes('left') && result.push('corner-bottom-left');
          }
          if (result.includes('top')) {
            result.includes('right') && result.push('corner-top-right');
            result.includes('left') && result.push('corner-top-left');
          }
          return result;
        }();
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props5 = this.props,
            children = _this$props5.children,
            disabled = _this$props5.disabled,
            handles = _this$props5.handles,
            height = _this$props5.height,
            mainRef = _this$props5.mainRef,
            onResize = _this$props5.onResize,
            onResizeEnd = _this$props5.onResizeEnd,
            onResizeStart = _this$props5.onResizeStart,
            rtlEnabled = _this$props5.rtlEnabled,
            width = _this$props5.width,
            restProps = _objectWithoutProperties(_this$props5, _excluded);
        return restProps;
      }
    }]);
    return ResizableContainer;
  }(_inferno2.InfernoComponent);
  exports.ResizableContainer = ResizableContainer;
  ResizableContainer.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(ResizableContainerProps), Object.getOwnPropertyDescriptors(_extends({}, (0, _utils.convertRulesToOptions)([])))));
  var __defaultOptionRules = [];
  function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    ResizableContainer.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(ResizableContainer.defaultProps), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)([])), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(__defaultOptionRules))));
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","./handle","../../utils/combine_classes","../../../events/visibility_change","../../../core/options/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("./handle"), require("../../utils/combine_classes"), require("../../../events/visibility_change"), require("../../../core/options/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=container.js.map