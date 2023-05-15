!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/editors/check_box/check_box.js"], ["inferno","@devextreme/runtime/inferno","../../../../core/devices","../common/editor","../../../utils/combine_classes","./check_box_icon","../../common/widget","../../../../core/options/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/ui/editors/check_box/check_box.js", ["inferno", "@devextreme/runtime/inferno", "../../../../core/devices", "../common/editor", "../../../utils/combine_classes", "./check_box_icon", "../../common/widget", "../../../../core/options/utils"], true, function ($__require, exports, module) {
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
  exports.CheckBoxPropsType = exports.CheckBoxProps = exports.CheckBox = void 0;
  exports.defaultOptions = defaultOptions;
  exports.viewFunction = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _devices = _interopRequireDefault($__require("../../../../core/devices"));
  var _editor = $__require("../common/editor");
  var _combine_classes = $__require("../../../utils/combine_classes");
  var _check_box_icon = $__require("./check_box_icon");
  var _widget = $__require("../../common/widget");
  var _utils = $__require("../../../../core/options/utils");
  var _excluded = ["accessKey", "activeStateEnabled", "aria", "className", "defaultValue", "disabled", "enableThreeStateBehavior", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "iconSize", "inputAttr", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "saveValueChangeEvent", "tabIndex", "text", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
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
  var getCssClasses = function getCssClasses(model) {
    var text = model.text,
        value = model.value;
    var checked = value;
    var indeterminate = checked === null;
    var classesMap = {
      'dx-checkbox': true,
      'dx-checkbox-checked': checked === true,
      'dx-checkbox-has-text': !!text,
      'dx-checkbox-indeterminate': indeterminate
    };
    return (0, _combine_classes.combineClasses)(classesMap);
  };
  var viewFunction = function viewFunction(viewModel) {
    var aria = viewModel.aria,
        classes = viewModel.cssClasses,
        editorRef = viewModel.editorRef,
        onKeyDown = viewModel.keyDown,
        onClick = viewModel.onWidgetClick,
        _viewModel$props = viewModel.props,
        accessKey = _viewModel$props.accessKey,
        activeStateEnabled = _viewModel$props.activeStateEnabled,
        className = _viewModel$props.className,
        disabled = _viewModel$props.disabled,
        focusStateEnabled = _viewModel$props.focusStateEnabled,
        height = _viewModel$props.height,
        hint = _viewModel$props.hint,
        hoverStateEnabled = _viewModel$props.hoverStateEnabled,
        iconSize = _viewModel$props.iconSize,
        isValid = _viewModel$props.isValid,
        name = _viewModel$props.name,
        onFocusIn = _viewModel$props.onFocusIn,
        readOnly = _viewModel$props.readOnly,
        rtlEnabled = _viewModel$props.rtlEnabled,
        tabIndex = _viewModel$props.tabIndex,
        text = _viewModel$props.text,
        validationError = _viewModel$props.validationError,
        validationErrors = _viewModel$props.validationErrors,
        validationMessageMode = _viewModel$props.validationMessageMode,
        validationMessagePosition = _viewModel$props.validationMessagePosition,
        validationStatus = _viewModel$props.validationStatus,
        value = _viewModel$props.value,
        visible = _viewModel$props.visible,
        width = _viewModel$props.width,
        restAttributes = viewModel.restAttributes;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _editor.Editor, _extends({
      "aria": aria,
      "classes": classes,
      "onClick": onClick,
      "onKeyDown": onKeyDown,
      "accessKey": accessKey,
      "activeStateEnabled": activeStateEnabled,
      "focusStateEnabled": focusStateEnabled,
      "hoverStateEnabled": hoverStateEnabled,
      "className": className,
      "disabled": disabled,
      "readOnly": readOnly,
      "hint": hint,
      "height": height,
      "width": width,
      "rtlEnabled": rtlEnabled,
      "tabIndex": tabIndex,
      "visible": visible,
      "validationError": validationError,
      "validationErrors": validationErrors,
      "validationMessageMode": validationMessageMode,
      "validationMessagePosition": validationMessagePosition,
      "validationStatus": validationStatus,
      "isValid": isValid,
      "onFocusIn": onFocusIn
    }, restAttributes, {
      children: (0, _inferno.createFragment)([(0, _inferno.normalizeProps)((0, _inferno.createVNode)(64, "input", null, null, 1, _extends({
        "type": "hidden",
        "value": "".concat(value)
      }, name && {
        name: name
      }))), (0, _inferno.createVNode)(1, "div", "dx-checkbox-container", [(0, _inferno.createComponentVNode)(2, _check_box_icon.CheckBoxIcon, {
        "size": iconSize,
        "isChecked": value === true
      }), text && (0, _inferno.createVNode)(1, "span", "dx-checkbox-text", text, 0)], 0)], 4)
    }), null, editorRef));
  };
  exports.viewFunction = viewFunction;
  var CheckBoxProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_editor.EditorProps), Object.getOwnPropertyDescriptors(Object.defineProperties({
    text: '',
    enableThreeStateBehavior: false,
    activeStateEnabled: true,
    hoverStateEnabled: true,
    defaultValue: false,
    valueChange: function valueChange() {}
  }, {
    focusStateEnabled: {
      get: function get() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      configurable: true,
      enumerable: true
    }
  }))));
  exports.CheckBoxProps = CheckBoxProps;
  var CheckBoxPropsType = Object.defineProperties({}, {
    text: {
      get: function get() {
        return CheckBoxProps.text;
      },
      configurable: true,
      enumerable: true
    },
    enableThreeStateBehavior: {
      get: function get() {
        return CheckBoxProps.enableThreeStateBehavior;
      },
      configurable: true,
      enumerable: true
    },
    activeStateEnabled: {
      get: function get() {
        return CheckBoxProps.activeStateEnabled;
      },
      configurable: true,
      enumerable: true
    },
    hoverStateEnabled: {
      get: function get() {
        return CheckBoxProps.hoverStateEnabled;
      },
      configurable: true,
      enumerable: true
    },
    focusStateEnabled: {
      get: function get() {
        return CheckBoxProps.focusStateEnabled;
      },
      configurable: true,
      enumerable: true
    },
    defaultValue: {
      get: function get() {
        return CheckBoxProps.defaultValue;
      },
      configurable: true,
      enumerable: true
    },
    valueChange: {
      get: function get() {
        return CheckBoxProps.valueChange;
      },
      configurable: true,
      enumerable: true
    },
    readOnly: {
      get: function get() {
        return CheckBoxProps.readOnly;
      },
      configurable: true,
      enumerable: true
    },
    name: {
      get: function get() {
        return CheckBoxProps.name;
      },
      configurable: true,
      enumerable: true
    },
    validationError: {
      get: function get() {
        return CheckBoxProps.validationError;
      },
      configurable: true,
      enumerable: true
    },
    validationErrors: {
      get: function get() {
        return CheckBoxProps.validationErrors;
      },
      configurable: true,
      enumerable: true
    },
    validationMessageMode: {
      get: function get() {
        return CheckBoxProps.validationMessageMode;
      },
      configurable: true,
      enumerable: true
    },
    validationMessagePosition: {
      get: function get() {
        return CheckBoxProps.validationMessagePosition;
      },
      configurable: true,
      enumerable: true
    },
    validationStatus: {
      get: function get() {
        return CheckBoxProps.validationStatus;
      },
      configurable: true,
      enumerable: true
    },
    isValid: {
      get: function get() {
        return CheckBoxProps.isValid;
      },
      configurable: true,
      enumerable: true
    },
    inputAttr: {
      get: function get() {
        return CheckBoxProps.inputAttr;
      },
      configurable: true,
      enumerable: true
    },
    className: {
      get: function get() {
        return CheckBoxProps.className;
      },
      configurable: true,
      enumerable: true
    },
    disabled: {
      get: function get() {
        return CheckBoxProps.disabled;
      },
      configurable: true,
      enumerable: true
    },
    tabIndex: {
      get: function get() {
        return CheckBoxProps.tabIndex;
      },
      configurable: true,
      enumerable: true
    },
    visible: {
      get: function get() {
        return CheckBoxProps.visible;
      },
      configurable: true,
      enumerable: true
    },
    aria: {
      get: function get() {
        return _widget.WidgetProps.aria;
      },
      configurable: true,
      enumerable: true
    }
  });
  exports.CheckBoxPropsType = CheckBoxPropsType;
  var CheckBox = /*#__PURE__*/function (_InfernoWrapperCompon) {
    _inheritsLoose(CheckBox, _InfernoWrapperCompon);
    function CheckBox(props) {
      var _this;
      _this = _InfernoWrapperCompon.call(this, props) || this;
      _this.editorRef = (0, _inferno.createRef)();
      _this.state = {
        value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
      };
      _this.focus = _this.focus.bind(_assertThisInitialized(_this));
      _this.blur = _this.blur.bind(_assertThisInitialized(_this));
      _this.onWidgetClick = _this.onWidgetClick.bind(_assertThisInitialized(_this));
      _this.keyDown = _this.keyDown.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = CheckBox.prototype;
    _proto.createEffects = function createEffects() {
      return [(0, _inferno2.createReRenderEffect)()];
    };
    _proto.onWidgetClick = function onWidgetClick(event) {
      var _this2 = this;
      var _this$props = this.props,
          enableThreeStateBehavior = _this$props.enableThreeStateBehavior,
          readOnly = _this$props.readOnly,
          saveValueChangeEvent = _this$props.saveValueChangeEvent;
      if (!readOnly) {
        saveValueChangeEvent === null || saveValueChangeEvent === void 0 ? void 0 : saveValueChangeEvent(event);
        if (enableThreeStateBehavior) {
          {
            var __newValue;
            this.setState(function (__state_argument) {
              __newValue = (_this2.props.value !== undefined ? _this2.props.value : __state_argument.value) === null || (!(_this2.props.value !== undefined ? _this2.props.value : __state_argument.value) ? null : false);
              return {
                value: __newValue
              };
            });
            this.props.valueChange(__newValue);
          }
        } else {
          {
            var _newValue;
            this.setState(function (__state_argument) {
              var _ref;
              _newValue = !((_ref = _this2.props.value !== undefined ? _this2.props.value : __state_argument.value) !== null && _ref !== void 0 ? _ref : false);
              return {
                value: _newValue
              };
            });
            this.props.valueChange(_newValue);
          }
        }
      }
    };
    _proto.keyDown = function keyDown(e) {
      var onKeyDown = this.props.onKeyDown;
      var keyName = e.keyName,
          originalEvent = e.originalEvent,
          which = e.which;
      var result = onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
      if (result !== null && result !== void 0 && result.cancel) {
        return result;
      }
      if (keyName === 'space' || which === 'space') {
        originalEvent.preventDefault();
        this.onWidgetClick(originalEvent);
      }
      return undefined;
    };
    _proto.focus = function focus() {
      this.editorRef.current.focus();
    };
    _proto.blur = function blur() {
      this.editorRef.current.blur();
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props, {
          value: this.props.value !== undefined ? this.props.value : this.state.value
        }),
        editorRef: this.editorRef,
        onWidgetClick: this.onWidgetClick,
        keyDown: this.keyDown,
        cssClasses: this.cssClasses,
        aria: this.aria,
        restAttributes: this.restAttributes
      });
    };
    _createClass(CheckBox, [{
      key: "cssClasses",
      get: function get() {
        return getCssClasses(_extends({}, this.props, {
          value: this.props.value !== undefined ? this.props.value : this.state.value
        }));
      }
    }, {
      key: "aria",
      get: function get() {
        var checked = (this.props.value !== undefined ? this.props.value : this.state.value) === true;
        var indeterminate = (this.props.value !== undefined ? this.props.value : this.state.value) === null;
        var result = {
          role: 'checkbox',
          checked: indeterminate ? 'mixed' : "".concat(checked)
        };
        return _extends({}, result, this.props.aria);
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props$value = _extends({}, this.props, {
          value: this.props.value !== undefined ? this.props.value : this.state.value
        }),
            accessKey = _this$props$value.accessKey,
            activeStateEnabled = _this$props$value.activeStateEnabled,
            aria = _this$props$value.aria,
            className = _this$props$value.className,
            defaultValue = _this$props$value.defaultValue,
            disabled = _this$props$value.disabled,
            enableThreeStateBehavior = _this$props$value.enableThreeStateBehavior,
            focusStateEnabled = _this$props$value.focusStateEnabled,
            height = _this$props$value.height,
            hint = _this$props$value.hint,
            hoverStateEnabled = _this$props$value.hoverStateEnabled,
            iconSize = _this$props$value.iconSize,
            inputAttr = _this$props$value.inputAttr,
            isValid = _this$props$value.isValid,
            name = _this$props$value.name,
            onClick = _this$props$value.onClick,
            onFocusIn = _this$props$value.onFocusIn,
            onKeyDown = _this$props$value.onKeyDown,
            readOnly = _this$props$value.readOnly,
            rtlEnabled = _this$props$value.rtlEnabled,
            saveValueChangeEvent = _this$props$value.saveValueChangeEvent,
            tabIndex = _this$props$value.tabIndex,
            text = _this$props$value.text,
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
    return CheckBox;
  }(_inferno2.InfernoWrapperComponent);
  exports.CheckBox = CheckBox;
  function __processTwoWayProps(defaultProps) {
    var twoWayProps = ['value'];
    return Object.keys(defaultProps).reduce(function (props, propName) {
      var propValue = defaultProps[propName];
      var defaultPropName = twoWayProps.some(function (p) {
        return p === propName;
      }) ? 'default' + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
      props[defaultPropName] = propValue;
      return props;
    }, {});
  }
  CheckBox.defaultProps = CheckBoxPropsType;
  var __defaultOptionRules = [];
  function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    CheckBox.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(CheckBox.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps((0, _utils.convertRulesToOptions)(__defaultOptionRules)))));
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","../../../../core/devices","../common/editor","../../../utils/combine_classes","./check_box_icon","../../common/widget","../../../../core/options/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("../../../../core/devices"), require("../common/editor"), require("../../../utils/combine_classes"), require("./check_box_icon"), require("../../common/widget"), require("../../../../core/options/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=check_box.js.map