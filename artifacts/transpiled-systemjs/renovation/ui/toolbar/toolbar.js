!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/ui/toolbar/toolbar.js"], ["inferno","@devextreme/runtime/inferno","../../../ui/toolbar","../common/dom_component_wrapper","./toolbar_props","../../../core/utils/type","../../common/config_context","../../utils/resolve_rtl"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/ui/toolbar/toolbar.js", ["inferno", "@devextreme/runtime/inferno", "../../../ui/toolbar", "../common/dom_component_wrapper", "./toolbar_props", "../../../core/utils/type", "../../common/config_context", "../../utils/resolve_rtl"], true, function ($__require, exports, module) {
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
  exports.viewFunction = exports.Toolbar = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _toolbar = _interopRequireDefault($__require("../../../ui/toolbar"));
  var _dom_component_wrapper = $__require("../common/dom_component_wrapper");
  var _toolbar_props = $__require("./toolbar_props");
  var _type = $__require("../../../core/utils/type");
  var _config_context = $__require("../../common/config_context");
  var _resolve_rtl = $__require("../../utils/resolve_rtl");
  var _excluded = ["accessKey", "activeStateEnabled", "className", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "items", "onClick", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width"];
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
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
  var viewFunction = function viewFunction(_ref) {
    var componentProps = _ref.componentProps,
        restAttributes = _ref.restAttributes;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
      "componentType": _toolbar.default,
      "componentProps": componentProps,
      "templateNames": []
    }, restAttributes)));
  };
  exports.viewFunction = viewFunction;
  var Toolbar = /*#__PURE__*/function (_BaseInfernoComponent) {
    _inheritsLoose(Toolbar, _BaseInfernoComponent);
    function Toolbar(props) {
      var _this;
      _this = _BaseInfernoComponent.call(this, props) || this;
      _this.state = {};
      _this.__getterCache = {};
      return _this;
    }
    var _proto = Toolbar.prototype;
    _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
      if (this.props['items'] !== nextProps['items'] || this.props['rtlEnabled'] !== nextProps['rtlEnabled'] || this.context[_config_context.ConfigContext.id] !== context[_config_context.ConfigContext.id] || this.props !== nextProps) {
        this.__getterCache['componentProps'] = undefined;
      }
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props),
        config: this.config,
        componentProps: this.componentProps,
        resolvedRtlEnabled: this.resolvedRtlEnabled,
        restAttributes: this.restAttributes
      });
    };
    _createClass(Toolbar, [{
      key: "config",
      get: function get() {
        if (this.context[_config_context.ConfigContext.id]) {
          return this.context[_config_context.ConfigContext.id];
        }
        return _config_context.ConfigContext.defaultValue;
      }
    }, {
      key: "componentProps",
      get: function get() {
        var _this2 = this;
        if (this.__getterCache['componentProps'] !== undefined) {
          return this.__getterCache['componentProps'];
        }
        return this.__getterCache['componentProps'] = function () {
          var items = _this2.props.items;
          var toolbarItems = items === null || items === void 0 ? void 0 : items.map(function (item) {
            var _item$options, _options$rtlEnabled;
            if (!(0, _type.isObject)(item)) {
              return item;
            }
            var options = (_item$options = item.options) !== null && _item$options !== void 0 ? _item$options : {};
            options.rtlEnabled = (_options$rtlEnabled = options.rtlEnabled) !== null && _options$rtlEnabled !== void 0 ? _options$rtlEnabled : _this2.resolvedRtlEnabled;
            return _extends({}, item, {
              options: options
            });
          });
          return _extends({}, _this2.props, {
            items: toolbarItems
          });
        }();
      }
    }, {
      key: "resolvedRtlEnabled",
      get: function get() {
        var rtlEnabled = this.props.rtlEnabled;
        return !!(0, _resolve_rtl.resolveRtlEnabled)(rtlEnabled, this.config);
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props = this.props,
            accessKey = _this$props.accessKey,
            activeStateEnabled = _this$props.activeStateEnabled,
            className = _this$props.className,
            disabled = _this$props.disabled,
            focusStateEnabled = _this$props.focusStateEnabled,
            height = _this$props.height,
            hint = _this$props.hint,
            hoverStateEnabled = _this$props.hoverStateEnabled,
            items = _this$props.items,
            onClick = _this$props.onClick,
            onKeyDown = _this$props.onKeyDown,
            rtlEnabled = _this$props.rtlEnabled,
            tabIndex = _this$props.tabIndex,
            visible = _this$props.visible,
            width = _this$props.width,
            restProps = _objectWithoutProperties(_this$props, _excluded);
        return restProps;
      }
    }]);
    return Toolbar;
  }(_inferno2.BaseInfernoComponent);
  exports.Toolbar = Toolbar;
  Toolbar.defaultProps = _toolbar_props.ToolbarProps;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","../../../ui/toolbar","../common/dom_component_wrapper","./toolbar_props","../../../core/utils/type","../../common/config_context","../../utils/resolve_rtl"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("../../../ui/toolbar"), require("../common/dom_component_wrapper"), require("./toolbar_props"), require("../../../core/utils/type"), require("../../common/config_context"), require("../../utils/resolve_rtl"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=toolbar.js.map