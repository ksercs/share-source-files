!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/button.js"], ["inferno","@devextreme/runtime/inferno","../../core/options/utils","../../core/devices","../../ui/themes","../../events/short","../utils/combine_classes","../../core/utils/icon","../../core/utils/inflector","./common/icon","../../core/errors","./common/ink_ripple","./common/widget","./common/base_props","../../localization/message"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/ui/button.js", ["inferno", "@devextreme/runtime/inferno", "../../core/options/utils", "../../core/devices", "../../ui/themes", "../../events/short", "../utils/combine_classes", "../../core/utils/icon", "../../core/utils/inflector", "./common/icon", "../../core/errors", "./common/ink_ripple", "./common/widget", "./common/base_props", "../../localization/message"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.defaultOptionRules = exports.ButtonProps = exports.Button = void 0;
  exports.defaultOptions = defaultOptions;
  exports.viewFunction = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _utils = $__require("../../core/options/utils");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _themes = $__require("../../ui/themes");
  var _short = $__require("../../events/short");
  var _combine_classes = $__require("../utils/combine_classes");
  var _icon = $__require("../../core/utils/icon");
  var _inflector = $__require("../../core/utils/inflector");
  var _icon2 = $__require("./common/icon");
  var _errors = _interopRequireDefault($__require("../../core/errors"));
  var _ink_ripple = $__require("./common/ink_ripple");
  var _widget = $__require("./common/widget");
  var _base_props = $__require("./common/base_props");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _excluded = ["accessKey", "activeStateEnabled", "children", "className", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "icon", "iconPosition", "iconTemplate", "onClick", "onKeyDown", "onSubmit", "pressed", "rtlEnabled", "stylingMode", "tabIndex", "template", "templateData", "text", "type", "useInkRipple", "useSubmitBehavior", "visible", "width"];
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
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
  var stylingModes = ['outlined', 'text', 'contained'];
  var getCssClasses = function getCssClasses(model) {
    var _classesMap;
    var icon = model.icon,
        iconPosition = model.iconPosition,
        stylingMode = model.stylingMode,
        text = model.text,
        type = model.type;
    var isValidStylingMode = stylingMode && stylingModes.includes(stylingMode);
    var classesMap = (_classesMap = {
      'dx-button': true
    }, _defineProperty(_classesMap, "dx-button-mode-".concat(isValidStylingMode ? stylingMode : 'contained'), true), _defineProperty(_classesMap, "dx-button-".concat(type !== null && type !== void 0 ? type : 'normal'), true), _defineProperty(_classesMap, 'dx-button-has-text', !!text), _defineProperty(_classesMap, 'dx-button-has-icon', !!icon), _defineProperty(_classesMap, 'dx-button-icon-right', iconPosition !== 'left'), _classesMap);
    return (0, _combine_classes.combineClasses)(classesMap);
  };
  var viewFunction = function viewFunction(viewModel) {
    var _viewModel$props = viewModel.props,
        children = _viewModel$props.children,
        iconPosition = _viewModel$props.iconPosition,
        IconTemplate = _viewModel$props.iconTemplate,
        ButtonTemplate = _viewModel$props.template,
        text = _viewModel$props.text;
    var renderText = !viewModel.props.template && !children && text !== '';
    var isIconLeft = iconPosition === 'left';
    var iconComponent = !viewModel.props.template && !children && (viewModel.iconSource || viewModel.props.iconTemplate) && (0, _inferno.createComponentVNode)(2, _icon2.Icon, {
      "source": viewModel.iconSource,
      "position": iconPosition,
      "iconTemplate": IconTemplate
    });
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
      "accessKey": viewModel.props.accessKey,
      "activeStateEnabled": viewModel.props.activeStateEnabled,
      "aria": viewModel.aria,
      "className": viewModel.props.className,
      "classes": viewModel.cssClasses,
      "disabled": viewModel.props.disabled,
      "focusStateEnabled": viewModel.props.focusStateEnabled,
      "height": viewModel.props.height,
      "hint": viewModel.props.hint,
      "hoverStateEnabled": viewModel.props.hoverStateEnabled,
      "onActive": viewModel.onActive,
      "onClick": viewModel.onWidgetClick,
      "onInactive": viewModel.onInactive,
      "onKeyDown": viewModel.keyDown,
      "rtlEnabled": viewModel.props.rtlEnabled,
      "tabIndex": viewModel.props.tabIndex,
      "visible": viewModel.props.visible,
      "width": viewModel.props.width
    }, viewModel.restAttributes, {
      children: (0, _inferno.createVNode)(1, "div", "dx-button-content", [viewModel.props.template && ButtonTemplate({
        data: viewModel.buttonTemplateData
      }), !viewModel.props.template && children, isIconLeft && iconComponent, renderText && (0, _inferno.createVNode)(1, "span", "dx-button-text", text, 0), !isIconLeft && iconComponent, viewModel.props.useSubmitBehavior && (0, _inferno.createVNode)(64, "input", "dx-button-submit-input", null, 1, {
        "type": "submit",
        "tabIndex": -1
      }, null, viewModel.submitInputRef), viewModel.props.useInkRipple && (0, _inferno.createComponentVNode)(2, _ink_ripple.InkRipple, {
        "config": viewModel.inkRippleConfig
      }, null, viewModel.inkRippleRef)], 0, null, null, viewModel.contentRef)
    }), null, viewModel.widgetRef));
  };
  exports.viewFunction = viewFunction;
  var ButtonProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_base_props.BaseWidgetProps), Object.getOwnPropertyDescriptors({
    activeStateEnabled: true,
    hoverStateEnabled: true,
    icon: '',
    iconPosition: 'left',
    stylingMode: 'contained',
    text: '',
    type: 'normal',
    useInkRipple: false,
    useSubmitBehavior: false,
    templateData: Object.freeze({})
  })));
  exports.ButtonProps = ButtonProps;
  var defaultOptionRules = (0, _utils.createDefaultOptionRules)([{
    device: function device() {
      return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
    },
    options: {
      focusStateEnabled: true
    }
  }, {
    device: function device() {
      return (0, _themes.isMaterial)((0, _themes.current)());
    },
    options: {
      useInkRipple: true
    }
  }]);
  exports.defaultOptionRules = defaultOptionRules;
  var getTemplate = function getTemplate(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function (props) {
      return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
    } : TemplateProp);
  };
  var Button = /*#__PURE__*/function (_InfernoWrapperCompon) {
    _inheritsLoose(Button, _InfernoWrapperCompon);
    function Button(props) {
      var _this;
      _this = _InfernoWrapperCompon.call(this, props) || this;
      _this.state = {};
      _this.contentRef = (0, _inferno.createRef)();
      _this.inkRippleRef = (0, _inferno.createRef)();
      _this.submitInputRef = (0, _inferno.createRef)();
      _this.widgetRef = (0, _inferno.createRef)();
      _this.__getterCache = {};
      _this.focus = _this.focus.bind(_assertThisInitialized(_this));
      _this.activate = _this.activate.bind(_assertThisInitialized(_this));
      _this.deactivate = _this.deactivate.bind(_assertThisInitialized(_this));
      _this.submitEffect = _this.submitEffect.bind(_assertThisInitialized(_this));
      _this.checkDeprecation = _this.checkDeprecation.bind(_assertThisInitialized(_this));
      _this.onActive = _this.onActive.bind(_assertThisInitialized(_this));
      _this.onInactive = _this.onInactive.bind(_assertThisInitialized(_this));
      _this.onWidgetClick = _this.onWidgetClick.bind(_assertThisInitialized(_this));
      _this.keyDown = _this.keyDown.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = Button.prototype;
    _proto.createEffects = function createEffects() {
      return [new _inferno2.InfernoEffect(this.submitEffect, [this.props.onSubmit, this.props.useSubmitBehavior]), new _inferno2.InfernoEffect(this.checkDeprecation, [this.props.type]), (0, _inferno2.createReRenderEffect)()];
    };
    _proto.updateEffects = function updateEffects() {
      var _this$_effects$, _this$_effects$2;
      (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.onSubmit, this.props.useSubmitBehavior]);
      (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.type]);
    };
    _proto.submitEffect = function submitEffect() {
      var _this2 = this;
      var namespace = 'UIFeedback';
      var _this$props = this.props,
          onSubmit = _this$props.onSubmit,
          useSubmitBehavior = _this$props.useSubmitBehavior;
      if (useSubmitBehavior && onSubmit) {
        _short.click.on(this.submitInputRef.current, function (event) {
          return onSubmit({
            event: event,
            submitInput: _this2.submitInputRef.current
          });
        }, {
          namespace: namespace
        });
        return function () {
          return _short.click.off(_this2.submitInputRef.current, {
            namespace: namespace
          });
        };
      }
      return undefined;
    };
    _proto.checkDeprecation = function checkDeprecation() {
      var type = this.props.type;
      if (type === 'back') {
        _errors.default.log('W0016', 'type', 'back', '22.2', "Use the 'back' icon instead");
      }
    };
    _proto.onActive = function onActive(event) {
      var useInkRipple = this.props.useInkRipple;
      useInkRipple && this.inkRippleRef.current.showWave({
        element: this.contentRef.current,
        event: event
      });
    };
    _proto.onInactive = function onInactive(event) {
      var useInkRipple = this.props.useInkRipple;
      useInkRipple && this.inkRippleRef.current.hideWave({
        element: this.contentRef.current,
        event: event
      });
    };
    _proto.onWidgetClick = function onWidgetClick(event) {
      var _this$props2 = this.props,
          onClick = _this$props2.onClick,
          useSubmitBehavior = _this$props2.useSubmitBehavior;
      onClick === null || onClick === void 0 ? void 0 : onClick({
        event: event
      });
      useSubmitBehavior && this.submitInputRef.current.click();
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
      if (keyName === 'space' || which === 'space' || keyName === 'enter' || which === 'enter') {
        originalEvent.preventDefault();
        this.onWidgetClick(originalEvent);
      }
      return undefined;
    };
    _proto.focus = function focus() {
      this.widgetRef.current.focus();
    };
    _proto.activate = function activate() {
      this.widgetRef.current.activate();
    };
    _proto.deactivate = function deactivate() {
      this.widgetRef.current.deactivate();
    };
    _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
      _InfernoWrapperCompon.prototype.componentWillUpdate.call(this);
      if (this.props['icon'] !== nextProps['icon'] || this.props['text'] !== nextProps['text'] || this.props['type'] !== nextProps['type']) {
        this.__getterCache['inkRippleConfig'] = undefined;
      }
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props, {
          template: getTemplate(props.template),
          iconTemplate: getTemplate(props.iconTemplate)
        }),
        contentRef: this.contentRef,
        submitInputRef: this.submitInputRef,
        inkRippleRef: this.inkRippleRef,
        widgetRef: this.widgetRef,
        onActive: this.onActive,
        onInactive: this.onInactive,
        onWidgetClick: this.onWidgetClick,
        keyDown: this.keyDown,
        aria: this.aria,
        cssClasses: this.cssClasses,
        iconSource: this.iconSource,
        inkRippleConfig: this.inkRippleConfig,
        buttonTemplateData: this.buttonTemplateData,
        restAttributes: this.restAttributes
      });
    };
    _createClass(Button, [{
      key: "aria",
      get: function get() {
        var _this$props3 = this.props,
            icon = _this$props3.icon,
            text = _this$props3.text;
        var label = text !== null && text !== void 0 ? text : '';
        if (!text && icon) {
          var iconSource = (0, _icon.getImageSourceType)(icon);
          switch (iconSource) {
            case 'image':
              {
                var notURLRegexp = /^(?!(?:https?:\/\/)|(?:ftp:\/\/)|(?:www\.))[^\s]+$/;
                var isPathToImage = !icon.includes('base64') && notURLRegexp.test(icon);
                label = isPathToImage ? icon.replace(/.+\/([^.]+)\..+$/, '$1') : '';
                break;
              }
            case 'dxIcon':
              label = _message.default.format((0, _inflector.camelize)(icon, true)) || icon;
              break;
            case 'fontIcon':
              label = icon;
              break;
            case 'svg':
              {
                var _titleRegexp$exec$, _titleRegexp$exec;
                var titleRegexp = /<title>(.*?)<\/title>/;
                var title = (_titleRegexp$exec$ = (_titleRegexp$exec = titleRegexp.exec(icon)) === null || _titleRegexp$exec === void 0 ? void 0 : _titleRegexp$exec[1]) !== null && _titleRegexp$exec$ !== void 0 ? _titleRegexp$exec$ : '';
                label = title;
                break;
              }
            default:
              break;
          }
        }
        return _extends({
          role: 'button'
        }, label ? {
          label: label
        } : {});
      }
    }, {
      key: "cssClasses",
      get: function get() {
        return getCssClasses(this.props);
      }
    }, {
      key: "iconSource",
      get: function get() {
        var _this$props4 = this.props,
            icon = _this$props4.icon,
            type = _this$props4.type;
        if (icon || type === 'back') {
          return (icon !== null && icon !== void 0 ? icon : '') || 'back';
        }
        return '';
      }
    }, {
      key: "inkRippleConfig",
      get: function get() {
        var _this3 = this;
        if (this.__getterCache['inkRippleConfig'] !== undefined) {
          return this.__getterCache['inkRippleConfig'];
        }
        return this.__getterCache['inkRippleConfig'] = function () {
          var _this3$props = _this3.props,
              icon = _this3$props.icon,
              text = _this3$props.text,
              type = _this3$props.type;
          return !text && icon || type === 'back' ? {
            isCentered: true,
            useHoldAnimation: false,
            waveSizeCoefficient: 1
          } : {};
        }();
      }
    }, {
      key: "buttonTemplateData",
      get: function get() {
        var _this$props5 = this.props,
            icon = _this$props5.icon,
            templateData = _this$props5.templateData,
            text = _this$props5.text;
        return _extends({
          icon: icon,
          text: text
        }, templateData);
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props6 = this.props,
            accessKey = _this$props6.accessKey,
            activeStateEnabled = _this$props6.activeStateEnabled,
            children = _this$props6.children,
            className = _this$props6.className,
            disabled = _this$props6.disabled,
            focusStateEnabled = _this$props6.focusStateEnabled,
            height = _this$props6.height,
            hint = _this$props6.hint,
            hoverStateEnabled = _this$props6.hoverStateEnabled,
            icon = _this$props6.icon,
            iconPosition = _this$props6.iconPosition,
            iconTemplate = _this$props6.iconTemplate,
            onClick = _this$props6.onClick,
            onKeyDown = _this$props6.onKeyDown,
            onSubmit = _this$props6.onSubmit,
            pressed = _this$props6.pressed,
            rtlEnabled = _this$props6.rtlEnabled,
            stylingMode = _this$props6.stylingMode,
            tabIndex = _this$props6.tabIndex,
            template = _this$props6.template,
            templateData = _this$props6.templateData,
            text = _this$props6.text,
            type = _this$props6.type,
            useInkRipple = _this$props6.useInkRipple,
            useSubmitBehavior = _this$props6.useSubmitBehavior,
            visible = _this$props6.visible,
            width = _this$props6.width,
            restProps = _objectWithoutProperties(_this$props6, _excluded);
        return restProps;
      }
    }]);
    return Button;
  }(_inferno2.InfernoWrapperComponent);
  exports.Button = Button;
  Button.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(ButtonProps), Object.getOwnPropertyDescriptors(_extends({}, (0, _utils.convertRulesToOptions)(defaultOptionRules)))));
  var __defaultOptionRules = [];
  function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    Button.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(Button.defaultProps), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(defaultOptionRules)), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(__defaultOptionRules))));
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","../../core/options/utils","../../core/devices","../../ui/themes","../../events/short","../utils/combine_classes","../../core/utils/icon","../../core/utils/inflector","./common/icon","../../core/errors","./common/ink_ripple","./common/widget","./common/base_props","../../localization/message"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("../../core/options/utils"), require("../../core/devices"), require("../../ui/themes"), require("../../events/short"), require("../utils/combine_classes"), require("../../core/utils/icon"), require("../../core/utils/inflector"), require("./common/icon"), require("../../core/errors"), require("./common/ink_ripple"), require("./common/widget"), require("./common/base_props"), require("../../localization/message"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=button.js.map