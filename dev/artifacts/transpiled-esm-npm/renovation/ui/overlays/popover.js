"use strict";

exports.PopoverProps = exports.Popover = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _ui = _interopRequireDefault(require("../../../ui/popover/ui.popover"));
var _dom_component_wrapper = require("../common/dom_component_wrapper");
var _base_props = require("../common/base_props");
var _utils = require("../../../core/options/utils");
var _excluded = ["children"],
  _excluded2 = ["accessKey", "activeStateEnabled", "animation", "children", "className", "container", "contentTemplate", "defaultVisible", "deferRendering", "disabled", "focusStateEnabled", "height", "hideEvent", "hideOnOutsideClick", "hint", "hoverStateEnabled", "maxHeight", "maxWidth", "minHeight", "minWidth", "onClick", "onHidden", "onHiding", "onInitialized", "onKeyDown", "onOptionChanged", "onShowing", "onShown", "onTitleRendered", "position", "rtlEnabled", "shading", "shadingColor", "showCloseButton", "showEvent", "showTitle", "tabIndex", "target", "title", "titleTemplate", "toolbarItems", "visible", "visibleChange", "width"];
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
var isDesktop = !(!_devices.default.real().generic || _devices.default.isSimulator());
var viewFunction = function viewFunction(_ref) {
  var componentProps = _ref.componentProps,
    domComponentWrapperRef = _ref.domComponentWrapperRef,
    restAttributes = _ref.restAttributes;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
    "componentType": _ui.default,
    "componentProps": componentProps.restProps,
    "templateNames": ['titleTemplate', 'contentTemplate']
  }, restAttributes, {
    children: componentProps.children
  }), null, domComponentWrapperRef));
};
exports.viewFunction = viewFunction;
var PopoverProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_base_props.BaseWidgetProps), Object.getOwnPropertyDescriptors({
  animation: Object.freeze({
    show: {
      type: 'fade',
      from: 0,
      to: 1
    },
    hide: {
      type: 'fade',
      to: 0
    }
  }),
  hideOnOutsideClick: false,
  contentTemplate: 'content',
  deferRendering: true,
  disabled: false,
  height: 'auto',
  hoverStateEnabled: false,
  maxHeight: null,
  maxWidth: null,
  minHeight: null,
  minWidth: null,
  position: 'bottom',
  rtlEnabled: false,
  shading: false,
  shadingColor: '',
  showCloseButton: isDesktop,
  showTitle: false,
  title: '',
  titleTemplate: 'title',
  width: 'auto',
  defaultVisible: true,
  visibleChange: function visibleChange() {},
  isReactComponentWrapper: true
})));
exports.PopoverProps = PopoverProps;
var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};
var Popover = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(Popover, _InfernoComponent);
  function Popover(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.domComponentWrapperRef = (0, _inferno.createRef)();
    _this.__getterCache = {};
    _this.state = {
      visible: _this.props.visible !== undefined ? _this.props.visible : _this.props.defaultVisible
    };
    _this.saveInstance = _this.saveInstance.bind(_assertThisInitialized(_this));
    _this.setHideEventListener = _this.setHideEventListener.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = Popover.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.saveInstance, []), new _inferno2.InfernoEffect(this.setHideEventListener, [this.props.visibleChange])];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.visibleChange]);
  };
  _proto.saveInstance = function saveInstance() {
    var _this$domComponentWra;
    this.instance = (_this$domComponentWra = this.domComponentWrapperRef.current) === null || _this$domComponentWra === void 0 ? void 0 : _this$domComponentWra.getInstance();
  };
  _proto.setHideEventListener = function setHideEventListener() {
    var _this2 = this;
    this.instance.option('onHiding', function () {
      {
        var __newValue;
        _this2.setState(function (__state_argument) {
          __newValue = false;
          return {
            visible: __newValue
          };
        });
        _this2.props.visibleChange(__newValue);
      }
    });
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    _InfernoComponent.prototype.componentWillUpdate.call(this);
    if (this.props !== nextProps) {
      this.__getterCache['componentProps'] = undefined;
    }
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        visible: this.props.visible !== undefined ? this.props.visible : this.state.visible,
        contentTemplate: getTemplate(props.contentTemplate),
        titleTemplate: getTemplate(props.titleTemplate)
      }),
      domComponentWrapperRef: this.domComponentWrapperRef,
      componentProps: this.componentProps,
      restAttributes: this.restAttributes
    });
  };
  _createClass(Popover, [{
    key: "componentProps",
    get: function get() {
      var _this3 = this;
      if (this.__getterCache['componentProps'] !== undefined) {
        return this.__getterCache['componentProps'];
      }
      return this.__getterCache['componentProps'] = function () {
        var _this3$props$visible = _extends({}, _this3.props, {
            visible: _this3.props.visible !== undefined ? _this3.props.visible : _this3.state.visible
          }),
          children = _this3$props$visible.children,
          restProps = _objectWithoutProperties(_this3$props$visible, _excluded);
        return {
          children,
          restProps
        };
      }();
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$visible = _extends({}, this.props, {
          visible: this.props.visible !== undefined ? this.props.visible : this.state.visible
        }),
        accessKey = _this$props$visible.accessKey,
        activeStateEnabled = _this$props$visible.activeStateEnabled,
        animation = _this$props$visible.animation,
        children = _this$props$visible.children,
        className = _this$props$visible.className,
        container = _this$props$visible.container,
        contentTemplate = _this$props$visible.contentTemplate,
        defaultVisible = _this$props$visible.defaultVisible,
        deferRendering = _this$props$visible.deferRendering,
        disabled = _this$props$visible.disabled,
        focusStateEnabled = _this$props$visible.focusStateEnabled,
        height = _this$props$visible.height,
        hideEvent = _this$props$visible.hideEvent,
        hideOnOutsideClick = _this$props$visible.hideOnOutsideClick,
        hint = _this$props$visible.hint,
        hoverStateEnabled = _this$props$visible.hoverStateEnabled,
        maxHeight = _this$props$visible.maxHeight,
        maxWidth = _this$props$visible.maxWidth,
        minHeight = _this$props$visible.minHeight,
        minWidth = _this$props$visible.minWidth,
        onClick = _this$props$visible.onClick,
        onHidden = _this$props$visible.onHidden,
        onHiding = _this$props$visible.onHiding,
        onInitialized = _this$props$visible.onInitialized,
        onKeyDown = _this$props$visible.onKeyDown,
        onOptionChanged = _this$props$visible.onOptionChanged,
        onShowing = _this$props$visible.onShowing,
        onShown = _this$props$visible.onShown,
        onTitleRendered = _this$props$visible.onTitleRendered,
        position = _this$props$visible.position,
        rtlEnabled = _this$props$visible.rtlEnabled,
        shading = _this$props$visible.shading,
        shadingColor = _this$props$visible.shadingColor,
        showCloseButton = _this$props$visible.showCloseButton,
        showEvent = _this$props$visible.showEvent,
        showTitle = _this$props$visible.showTitle,
        tabIndex = _this$props$visible.tabIndex,
        target = _this$props$visible.target,
        title = _this$props$visible.title,
        titleTemplate = _this$props$visible.titleTemplate,
        toolbarItems = _this$props$visible.toolbarItems,
        visible = _this$props$visible.visible,
        visibleChange = _this$props$visible.visibleChange,
        width = _this$props$visible.width,
        restProps = _objectWithoutProperties(_this$props$visible, _excluded2);
      return restProps;
    }
  }]);
  return Popover;
}(_inferno2.InfernoComponent);
exports.Popover = Popover;
function __processTwoWayProps(defaultProps) {
  var twoWayProps = ['visible'];
  return Object.keys(defaultProps).reduce(function (props, propName) {
    var propValue = defaultProps[propName];
    var defaultPropName = twoWayProps.some(function (p) {
      return p === propName;
    }) ? 'default' + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}
Popover.defaultProps = PopoverProps;
var __defaultOptionRules = [];
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  Popover.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(Popover.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps((0, _utils.convertRulesToOptions)(__defaultOptionRules)))));
}