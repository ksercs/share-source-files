!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/editors/switch.js"], ["inferno","@devextreme/runtime/inferno","../../../ui/switch","./common/editor","./common/editor_state_props","../common/dom_component_wrapper","../../../localization/message"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/ui/editors/switch.js", ["inferno", "@devextreme/runtime/inferno", "../../../ui/switch", "./common/editor", "./common/editor_state_props", "../common/dom_component_wrapper", "../../../localization/message"], true, function ($__require, exports, module) {
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
  exports.viewFunction = exports.SwitchPropsType = exports.SwitchProps = exports.Switch = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _switch = _interopRequireDefault($__require("../../../ui/switch"));
  var _editor = $__require("./common/editor");
  var _editor_state_props = $__require("./common/editor_state_props");
  var _dom_component_wrapper = $__require("../common/dom_component_wrapper");
  var _message = _interopRequireDefault($__require("../../../localization/message"));
  var _excluded = ["accessKey", "activeStateEnabled", "className", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "switchedOffText", "switchedOnText", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
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
      "componentType": _switch.default,
      "componentProps": componentProps,
      "templateNames": []
    }, restAttributes)));
  };
  exports.viewFunction = viewFunction;
  var SwitchProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_editor.EditorProps), Object.getOwnPropertyDescriptors(Object.defineProperties({
    defaultValue: false,
    isReactComponentWrapper: true
  }, {
    switchedOnText: {
      get: function get() {
        return _message.default.format('dxSwitch-switchedOnText');
      },
      configurable: true,
      enumerable: true
    },
    switchedOffText: {
      get: function get() {
        return _message.default.format('dxSwitch-switchedOffText');
      },
      configurable: true,
      enumerable: true
    }
  }))));
  exports.SwitchProps = SwitchProps;
  var SwitchPropsType = Object.defineProperties({
    isReactComponentWrapper: true
  }, {
    switchedOnText: {
      get: function get() {
        return SwitchProps.switchedOnText;
      },
      configurable: true,
      enumerable: true
    },
    switchedOffText: {
      get: function get() {
        return SwitchProps.switchedOffText;
      },
      configurable: true,
      enumerable: true
    },
    defaultValue: {
      get: function get() {
        return SwitchProps.defaultValue;
      },
      configurable: true,
      enumerable: true
    },
    readOnly: {
      get: function get() {
        return SwitchProps.readOnly;
      },
      configurable: true,
      enumerable: true
    },
    name: {
      get: function get() {
        return SwitchProps.name;
      },
      configurable: true,
      enumerable: true
    },
    validationError: {
      get: function get() {
        return SwitchProps.validationError;
      },
      configurable: true,
      enumerable: true
    },
    validationErrors: {
      get: function get() {
        return SwitchProps.validationErrors;
      },
      configurable: true,
      enumerable: true
    },
    validationMessageMode: {
      get: function get() {
        return SwitchProps.validationMessageMode;
      },
      configurable: true,
      enumerable: true
    },
    validationMessagePosition: {
      get: function get() {
        return SwitchProps.validationMessagePosition;
      },
      configurable: true,
      enumerable: true
    },
    validationStatus: {
      get: function get() {
        return SwitchProps.validationStatus;
      },
      configurable: true,
      enumerable: true
    },
    isValid: {
      get: function get() {
        return SwitchProps.isValid;
      },
      configurable: true,
      enumerable: true
    },
    inputAttr: {
      get: function get() {
        return SwitchProps.inputAttr;
      },
      configurable: true,
      enumerable: true
    },
    className: {
      get: function get() {
        return SwitchProps.className;
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
        return SwitchProps.disabled;
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
        return SwitchProps.tabIndex;
      },
      configurable: true,
      enumerable: true
    },
    visible: {
      get: function get() {
        return SwitchProps.visible;
      },
      configurable: true,
      enumerable: true
    }
  });
  exports.SwitchPropsType = SwitchPropsType;
  var Switch = /*#__PURE__*/function (_BaseInfernoComponent) {
    _inheritsLoose(Switch, _BaseInfernoComponent);
    function Switch(props) {
      var _this;
      _this = _BaseInfernoComponent.call(this, props) || this;
      _this.state = {
        value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
      };
      return _this;
    }
    var _proto = Switch.prototype;
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
    _createClass(Switch, [{
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
            defaultValue = _this$props$value.defaultValue,
            disabled = _this$props$value.disabled,
            focusStateEnabled = _this$props$value.focusStateEnabled,
            height = _this$props$value.height,
            hint = _this$props$value.hint,
            hoverStateEnabled = _this$props$value.hoverStateEnabled,
            inputAttr = _this$props$value.inputAttr,
            isValid = _this$props$value.isValid,
            name = _this$props$value.name,
            onClick = _this$props$value.onClick,
            onFocusIn = _this$props$value.onFocusIn,
            onKeyDown = _this$props$value.onKeyDown,
            readOnly = _this$props$value.readOnly,
            rtlEnabled = _this$props$value.rtlEnabled,
            switchedOffText = _this$props$value.switchedOffText,
            switchedOnText = _this$props$value.switchedOnText,
            tabIndex = _this$props$value.tabIndex,
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
    return Switch;
  }(_inferno2.BaseInfernoComponent);
  exports.Switch = Switch;
  Switch.defaultProps = SwitchPropsType;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","../../../ui/switch","./common/editor","./common/editor_state_props","../common/dom_component_wrapper","../../../localization/message"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("../../../ui/switch"), require("./common/editor"), require("./common/editor_state_props"), require("../common/dom_component_wrapper"), require("../../../localization/message"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=switch.js.map