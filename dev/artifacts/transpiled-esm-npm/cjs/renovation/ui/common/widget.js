"use strict";

exports.viewFunction = exports.WidgetProps = exports.Widget = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
require("../../../events/click");
require("../../../events/hover");
var _type = require("../../../core/utils/type");
var _short = require("../../../events/short");
var _subscribe_to_event = require("../../utils/subscribe_to_event");
var _combine_classes = require("../../utils/combine_classes");
var _extend = require("../../../core/utils/extend");
var _style = require("../../../core/utils/style");
var _base_props = require("./base_props");
var _config_context = require("../../common/config_context");
var _config_provider = require("../../common/config_provider");
var _resolve_rtl = require("../../utils/resolve_rtl");
var _resize_callbacks = _interopRequireDefault(require("../../../core/utils/resize_callbacks"));
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _excluded = ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "addWidgetClass", "aria", "children", "className", "classes", "cssText", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "name", "onActive", "onClick", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onRootElementRendered", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
var DEFAULT_FEEDBACK_HIDE_TIMEOUT = 400;
var DEFAULT_FEEDBACK_SHOW_TIMEOUT = 30;
var getAria = function getAria(args) {
  return Object.keys(args).reduce(function (r, key) {
    if (args[key]) {
      return _extends({}, r, {
        [key === 'role' || key === 'id' ? key : "aria-".concat(key)]: String(args[key])
      });
    }
    return r;
  }, {});
};
var viewFunction = function viewFunction(viewModel) {
  var widget = (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", viewModel.cssClasses, viewModel.props.children, 0, _extends({}, viewModel.attributes, {
    "tabIndex": viewModel.tabIndex,
    "title": viewModel.props.hint,
    "style": (0, _inferno2.normalizeStyles)(viewModel.styles)
  }), null, viewModel.widgetElementRef));
  return viewModel.shouldRenderConfigProvider ? (0, _inferno.createComponentVNode)(2, _config_provider.ConfigProvider, {
    "rtlEnabled": viewModel.rtlEnabled,
    children: widget
  }) : widget;
};
exports.viewFunction = viewFunction;
var WidgetProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_base_props.BaseWidgetProps), Object.getOwnPropertyDescriptors({
  _feedbackHideTimeout: DEFAULT_FEEDBACK_HIDE_TIMEOUT,
  _feedbackShowTimeout: DEFAULT_FEEDBACK_SHOW_TIMEOUT,
  cssText: '',
  aria: Object.freeze({}),
  classes: '',
  name: '',
  addWidgetClass: true
})));
exports.WidgetProps = WidgetProps;
var Widget = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(Widget, _InfernoWrapperCompon);
  function Widget(props) {
    var _this;
    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this.widgetElementRef = (0, _inferno.createRef)();
    _this.state = {
      active: false,
      focused: false,
      hovered: false
    };
    _this.setRootElementRef = _this.setRootElementRef.bind(_assertThisInitialized(_this));
    _this.activeEffect = _this.activeEffect.bind(_assertThisInitialized(_this));
    _this.inactiveEffect = _this.inactiveEffect.bind(_assertThisInitialized(_this));
    _this.clickEffect = _this.clickEffect.bind(_assertThisInitialized(_this));
    _this.focus = _this.focus.bind(_assertThisInitialized(_this));
    _this.blur = _this.blur.bind(_assertThisInitialized(_this));
    _this.activate = _this.activate.bind(_assertThisInitialized(_this));
    _this.deactivate = _this.deactivate.bind(_assertThisInitialized(_this));
    _this.focusInEffect = _this.focusInEffect.bind(_assertThisInitialized(_this));
    _this.focusOutEffect = _this.focusOutEffect.bind(_assertThisInitialized(_this));
    _this.hoverStartEffect = _this.hoverStartEffect.bind(_assertThisInitialized(_this));
    _this.hoverEndEffect = _this.hoverEndEffect.bind(_assertThisInitialized(_this));
    _this.keyboardEffect = _this.keyboardEffect.bind(_assertThisInitialized(_this));
    _this.resizeEffect = _this.resizeEffect.bind(_assertThisInitialized(_this));
    _this.windowResizeEffect = _this.windowResizeEffect.bind(_assertThisInitialized(_this));
    _this.visibilityEffect = _this.visibilityEffect.bind(_assertThisInitialized(_this));
    _this.checkDeprecation = _this.checkDeprecation.bind(_assertThisInitialized(_this));
    _this.applyCssTextEffect = _this.applyCssTextEffect.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = Widget.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.setRootElementRef, []), new _inferno2.InfernoEffect(this.activeEffect, [this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive]), new _inferno2.InfernoEffect(this.inactiveEffect, [this.props._feedbackHideTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.onInactive, this.state.active]), new _inferno2.InfernoEffect(this.clickEffect, [this.props.disabled, this.props.name, this.props.onClick]), new _inferno2.InfernoEffect(this.focusInEffect, [this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn]), new _inferno2.InfernoEffect(this.focusOutEffect, [this.props.focusStateEnabled, this.props.name, this.props.onFocusOut, this.state.focused]), new _inferno2.InfernoEffect(this.hoverStartEffect, [this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverStart, this.state.active]), new _inferno2.InfernoEffect(this.hoverEndEffect, [this.props.activeStateUnit, this.props.hoverStateEnabled, this.props.onHoverEnd, this.state.hovered]), new _inferno2.InfernoEffect(this.keyboardEffect, [this.props.focusStateEnabled, this.props.onKeyDown]), new _inferno2.InfernoEffect(this.resizeEffect, [this.props.name, this.props.onDimensionChanged]), new _inferno2.InfernoEffect(this.windowResizeEffect, [this.props.onDimensionChanged]), new _inferno2.InfernoEffect(this.visibilityEffect, [this.props.name, this.props.onVisibilityChange]), new _inferno2.InfernoEffect(this.checkDeprecation, [this.props.height, this.props.width]), new _inferno2.InfernoEffect(this.applyCssTextEffect, [this.props.cssText]), (0, _inferno2.createReRenderEffect)()];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8, _this$_effects$9, _this$_effects$10, _this$_effects$11, _this$_effects$12, _this$_effects$13;
    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive]);
    (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props._feedbackHideTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.onInactive, this.state.active]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.disabled, this.props.name, this.props.onClick]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn]);
    (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.props.focusStateEnabled, this.props.name, this.props.onFocusOut, this.state.focused]);
    (_this$_effects$6 = this._effects[6]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverStart, this.state.active]);
    (_this$_effects$7 = this._effects[7]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([this.props.activeStateUnit, this.props.hoverStateEnabled, this.props.onHoverEnd, this.state.hovered]);
    (_this$_effects$8 = this._effects[8]) === null || _this$_effects$8 === void 0 ? void 0 : _this$_effects$8.update([this.props.focusStateEnabled, this.props.onKeyDown]);
    (_this$_effects$9 = this._effects[9]) === null || _this$_effects$9 === void 0 ? void 0 : _this$_effects$9.update([this.props.name, this.props.onDimensionChanged]);
    (_this$_effects$10 = this._effects[10]) === null || _this$_effects$10 === void 0 ? void 0 : _this$_effects$10.update([this.props.onDimensionChanged]);
    (_this$_effects$11 = this._effects[11]) === null || _this$_effects$11 === void 0 ? void 0 : _this$_effects$11.update([this.props.name, this.props.onVisibilityChange]);
    (_this$_effects$12 = this._effects[12]) === null || _this$_effects$12 === void 0 ? void 0 : _this$_effects$12.update([this.props.height, this.props.width]);
    (_this$_effects$13 = this._effects[13]) === null || _this$_effects$13 === void 0 ? void 0 : _this$_effects$13.update([this.props.cssText]);
  };
  _proto.setRootElementRef = function setRootElementRef() {
    var _this$props = this.props,
      onRootElementRendered = _this$props.onRootElementRendered,
      rootElementRef = _this$props.rootElementRef;
    if (rootElementRef) {
      rootElementRef.current = this.widgetElementRef.current;
    }
    onRootElementRendered === null || onRootElementRendered === void 0 ? void 0 : onRootElementRendered(this.widgetElementRef.current);
  };
  _proto.activeEffect = function activeEffect() {
    var _this2 = this;
    var _this$props2 = this.props,
      _feedbackShowTimeout = _this$props2._feedbackShowTimeout,
      activeStateEnabled = _this$props2.activeStateEnabled,
      activeStateUnit = _this$props2.activeStateUnit,
      disabled = _this$props2.disabled,
      onActive = _this$props2.onActive;
    var namespace = 'UIFeedback';
    var selector = activeStateUnit;
    if (activeStateEnabled) {
      if (!disabled) {
        return (0, _subscribe_to_event.subscribeToDxActiveEvent)(this.widgetElementRef.current, function (event) {
          _this2.setState(function (__state_argument) {
            return {
              active: true
            };
          });
          onActive === null || onActive === void 0 ? void 0 : onActive(event);
        }, {
          timeout: _feedbackShowTimeout,
          selector
        }, namespace);
      }
    }
    return undefined;
  };
  _proto.inactiveEffect = function inactiveEffect() {
    var _this3 = this;
    var _this$props3 = this.props,
      _feedbackHideTimeout = _this$props3._feedbackHideTimeout,
      activeStateEnabled = _this$props3.activeStateEnabled,
      activeStateUnit = _this$props3.activeStateUnit,
      onInactive = _this$props3.onInactive;
    var namespace = 'UIFeedback';
    var selector = activeStateUnit;
    if (activeStateEnabled) {
      return (0, _subscribe_to_event.subscribeToDxInactiveEvent)(this.widgetElementRef.current, function (event) {
        if (_this3.state.active) {
          _this3.setState(function (__state_argument) {
            return {
              active: false
            };
          });
          onInactive === null || onInactive === void 0 ? void 0 : onInactive(event);
        }
      }, {
        timeout: _feedbackHideTimeout,
        selector
      }, namespace);
    }
    return undefined;
  };
  _proto.clickEffect = function clickEffect() {
    var _this4 = this;
    var _this$props4 = this.props,
      disabled = _this$props4.disabled,
      name = _this$props4.name,
      onClick = _this$props4.onClick;
    var namespace = name;
    if (onClick && !disabled) {
      _short.dxClick.on(this.widgetElementRef.current, onClick, {
        namespace
      });
      return function () {
        return _short.dxClick.off(_this4.widgetElementRef.current, {
          namespace
        });
      };
    }
    return undefined;
  };
  _proto.focusInEffect = function focusInEffect() {
    var _this5 = this;
    var _this$props5 = this.props,
      disabled = _this$props5.disabled,
      focusStateEnabled = _this$props5.focusStateEnabled,
      name = _this$props5.name,
      onFocusIn = _this$props5.onFocusIn;
    var namespace = "".concat(name, "Focus");
    if (focusStateEnabled) {
      if (!disabled) {
        return (0, _subscribe_to_event.subscribeToDxFocusInEvent)(this.widgetElementRef.current, function (event) {
          if (!event.isDefaultPrevented()) {
            _this5.setState(function (__state_argument) {
              return {
                focused: true
              };
            });
            onFocusIn === null || onFocusIn === void 0 ? void 0 : onFocusIn(event);
          }
        }, null, namespace);
      }
    }
    return undefined;
  };
  _proto.focusOutEffect = function focusOutEffect() {
    var _this6 = this;
    var _this$props6 = this.props,
      focusStateEnabled = _this$props6.focusStateEnabled,
      name = _this$props6.name,
      onFocusOut = _this$props6.onFocusOut;
    var namespace = "".concat(name, "Focus");
    if (focusStateEnabled) {
      return (0, _subscribe_to_event.subscribeToDxFocusOutEvent)(this.widgetElementRef.current, function (event) {
        if (!event.isDefaultPrevented() && _this6.state.focused) {
          _this6.setState(function (__state_argument) {
            return {
              focused: false
            };
          });
          onFocusOut === null || onFocusOut === void 0 ? void 0 : onFocusOut(event);
        }
      }, null, namespace);
    }
    return undefined;
  };
  _proto.hoverStartEffect = function hoverStartEffect() {
    var _this7 = this;
    var _this$props7 = this.props,
      activeStateUnit = _this$props7.activeStateUnit,
      disabled = _this$props7.disabled,
      hoverStateEnabled = _this$props7.hoverStateEnabled,
      onHoverStart = _this$props7.onHoverStart;
    var namespace = 'UIFeedback';
    var selector = activeStateUnit;
    if (hoverStateEnabled) {
      if (!disabled) {
        return (0, _subscribe_to_event.subscribeToDxHoverStartEvent)(this.widgetElementRef.current, function (event) {
          !_this7.state.active && _this7.setState(function (__state_argument) {
            return {
              hovered: true
            };
          });
          onHoverStart === null || onHoverStart === void 0 ? void 0 : onHoverStart(event);
        }, {
          selector
        }, namespace);
      }
    }
    return undefined;
  };
  _proto.hoverEndEffect = function hoverEndEffect() {
    var _this8 = this;
    var _this$props8 = this.props,
      activeStateUnit = _this$props8.activeStateUnit,
      hoverStateEnabled = _this$props8.hoverStateEnabled,
      onHoverEnd = _this$props8.onHoverEnd;
    var namespace = 'UIFeedback';
    var selector = activeStateUnit;
    if (hoverStateEnabled) {
      return (0, _subscribe_to_event.subscribeToDxHoverEndEvent)(this.widgetElementRef.current, function (event) {
        if (_this8.state.hovered) {
          _this8.setState(function (__state_argument) {
            return {
              hovered: false
            };
          });
          onHoverEnd === null || onHoverEnd === void 0 ? void 0 : onHoverEnd(event);
        }
      }, {
        selector
      }, namespace);
    }
    return undefined;
  };
  _proto.keyboardEffect = function keyboardEffect() {
    var _this$props9 = this.props,
      focusStateEnabled = _this$props9.focusStateEnabled,
      onKeyDown = _this$props9.onKeyDown;
    if (focusStateEnabled && onKeyDown) {
      var id = _short.keyboard.on(this.widgetElementRef.current, this.widgetElementRef.current, function (e) {
        return onKeyDown(e);
      });
      return function () {
        return _short.keyboard.off(id);
      };
    }
    return undefined;
  };
  _proto.resizeEffect = function resizeEffect() {
    var _this9 = this;
    var namespace = "".concat(this.props.name, "VisibilityChange");
    var onDimensionChanged = this.props.onDimensionChanged;
    if (onDimensionChanged) {
      _short.resize.on(this.widgetElementRef.current, onDimensionChanged, {
        namespace
      });
      return function () {
        return _short.resize.off(_this9.widgetElementRef.current, {
          namespace
        });
      };
    }
    return undefined;
  };
  _proto.windowResizeEffect = function windowResizeEffect() {
    var onDimensionChanged = this.props.onDimensionChanged;
    if (onDimensionChanged) {
      _resize_callbacks.default.add(onDimensionChanged);
      return function () {
        _resize_callbacks.default.remove(onDimensionChanged);
      };
    }
    return undefined;
  };
  _proto.visibilityEffect = function visibilityEffect() {
    var _this10 = this;
    var _this$props10 = this.props,
      name = _this$props10.name,
      onVisibilityChange = _this$props10.onVisibilityChange;
    var namespace = "".concat(name, "VisibilityChange");
    if (onVisibilityChange) {
      _short.visibility.on(this.widgetElementRef.current, function () {
        return onVisibilityChange(true);
      }, function () {
        return onVisibilityChange(false);
      }, {
        namespace
      });
      return function () {
        return _short.visibility.off(_this10.widgetElementRef.current, {
          namespace
        });
      };
    }
    return undefined;
  };
  _proto.checkDeprecation = function checkDeprecation() {
    var _this$props11 = this.props,
      height = _this$props11.height,
      width = _this$props11.width;
    if ((0, _type.isFunction)(width)) {
      _errors.default.log('W0017', 'width');
    }
    if ((0, _type.isFunction)(height)) {
      _errors.default.log('W0017', 'height');
    }
  };
  _proto.applyCssTextEffect = function applyCssTextEffect() {
    var cssText = this.props.cssText;
    if (cssText !== '') {
      this.widgetElementRef.current.style.cssText = cssText;
    }
  };
  _proto.focus = function focus() {
    _short.focus.trigger(this.widgetElementRef.current);
  };
  _proto.blur = function blur() {
    var activeElement = _dom_adapter.default.getActiveElement(this.widgetElementRef.current);
    if (this.widgetElementRef.current === activeElement) {
      activeElement.blur();
    }
  };
  _proto.activate = function activate() {
    this.setState(function (__state_argument) {
      return {
        active: true
      };
    });
  };
  _proto.deactivate = function deactivate() {
    this.setState(function (__state_argument) {
      return {
        active: false
      };
    });
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      active: this.state.active,
      focused: this.state.focused,
      hovered: this.state.hovered,
      widgetElementRef: this.widgetElementRef,
      config: this.config,
      shouldRenderConfigProvider: this.shouldRenderConfigProvider,
      rtlEnabled: this.rtlEnabled,
      attributes: this.attributes,
      styles: this.styles,
      cssClasses: this.cssClasses,
      tabIndex: this.tabIndex,
      restAttributes: this.restAttributes
    });
  };
  _createClass(Widget, [{
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
    key: "attributes",
    get: function get() {
      var _this$props12 = this.props,
        aria = _this$props12.aria,
        disabled = _this$props12.disabled,
        focusStateEnabled = _this$props12.focusStateEnabled,
        visible = _this$props12.visible;
      var accessKey = focusStateEnabled && !disabled && this.props.accessKey;
      return _extends({}, (0, _extend.extend)({}, accessKey && {
        accessKey
      }), getAria(_extends({}, aria, {
        disabled,
        hidden: !visible
      })), (0, _extend.extend)({}, this.restAttributes));
    }
  }, {
    key: "styles",
    get: function get() {
      var _this$props13 = this.props,
        height = _this$props13.height,
        width = _this$props13.width;
      var style = this.restAttributes.style || {};
      var computedWidth = (0, _style.normalizeStyleProp)('width', (0, _type.isFunction)(width) ? width() : width);
      var computedHeight = (0, _style.normalizeStyleProp)('height', (0, _type.isFunction)(height) ? height() : height);
      return _extends({}, style, {
        height: computedHeight !== null && computedHeight !== void 0 ? computedHeight : style.height,
        width: computedWidth !== null && computedWidth !== void 0 ? computedWidth : style.width
      });
    }
  }, {
    key: "cssClasses",
    get: function get() {
      var _this$props14 = this.props,
        activeStateEnabled = _this$props14.activeStateEnabled,
        addWidgetClass = _this$props14.addWidgetClass,
        className = _this$props14.className,
        classes = _this$props14.classes,
        disabled = _this$props14.disabled,
        focusStateEnabled = _this$props14.focusStateEnabled,
        hoverStateEnabled = _this$props14.hoverStateEnabled,
        onVisibilityChange = _this$props14.onVisibilityChange,
        visible = _this$props14.visible;
      var isFocusable = !!focusStateEnabled && !disabled;
      var isHoverable = !!hoverStateEnabled && !disabled;
      var canBeActive = !!activeStateEnabled && !disabled;
      var classesMap = {
        'dx-widget': !!addWidgetClass,
        [String(classes)]: !!classes,
        [String(className)]: !!className,
        'dx-state-disabled': !!disabled,
        'dx-state-invisible': !visible,
        'dx-state-focused': !!this.state.focused && isFocusable,
        'dx-state-active': !!this.state.active && canBeActive,
        'dx-state-hover': !!this.state.hovered && isHoverable && !this.state.active,
        'dx-rtl': !!this.rtlEnabled,
        'dx-visibility-change-handler': !!onVisibilityChange
      };
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "tabIndex",
    get: function get() {
      var _this$props15 = this.props,
        disabled = _this$props15.disabled,
        focusStateEnabled = _this$props15.focusStateEnabled,
        tabIndex = _this$props15.tabIndex;
      var isFocusable = focusStateEnabled && !disabled;
      return isFocusable ? tabIndex : undefined;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props16 = this.props,
        _feedbackHideTimeout = _this$props16._feedbackHideTimeout,
        _feedbackShowTimeout = _this$props16._feedbackShowTimeout,
        accessKey = _this$props16.accessKey,
        activeStateEnabled = _this$props16.activeStateEnabled,
        activeStateUnit = _this$props16.activeStateUnit,
        addWidgetClass = _this$props16.addWidgetClass,
        aria = _this$props16.aria,
        children = _this$props16.children,
        className = _this$props16.className,
        classes = _this$props16.classes,
        cssText = _this$props16.cssText,
        disabled = _this$props16.disabled,
        focusStateEnabled = _this$props16.focusStateEnabled,
        height = _this$props16.height,
        hint = _this$props16.hint,
        hoverStateEnabled = _this$props16.hoverStateEnabled,
        name = _this$props16.name,
        onActive = _this$props16.onActive,
        onClick = _this$props16.onClick,
        onDimensionChanged = _this$props16.onDimensionChanged,
        onFocusIn = _this$props16.onFocusIn,
        onFocusOut = _this$props16.onFocusOut,
        onHoverEnd = _this$props16.onHoverEnd,
        onHoverStart = _this$props16.onHoverStart,
        onInactive = _this$props16.onInactive,
        onKeyDown = _this$props16.onKeyDown,
        onRootElementRendered = _this$props16.onRootElementRendered,
        onVisibilityChange = _this$props16.onVisibilityChange,
        rootElementRef = _this$props16.rootElementRef,
        rtlEnabled = _this$props16.rtlEnabled,
        tabIndex = _this$props16.tabIndex,
        visible = _this$props16.visible,
        width = _this$props16.width,
        restProps = _objectWithoutProperties(_this$props16, _excluded);
      return restProps;
    }
  }]);
  return Widget;
}(_inferno2.InfernoWrapperComponent);
exports.Widget = Widget;
Widget.defaultProps = WidgetProps;