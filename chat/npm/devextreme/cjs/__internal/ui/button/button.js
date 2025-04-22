/**
* DevExtreme (cjs/__internal/ui/button/button.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptionRules = exports.Button = void 0;
exports.defaultOptions = defaultOptions;
var _inferno = require("inferno");
var _short = require("../../../common/core/events/short");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _utils = require("../../../core/options/utils");
var _icon = require("../../../core/utils/icon");
var _inflector = require("../../../core/utils/inflector");
var _themes = require("../../../ui/themes");
var _index = require("../../core/r1/runtime/inferno/index");
var _index2 = require("../../core/r1/utils/index");
var _widget = require("../../core/r1/widget");
var _combine_classes = require("../../core/utils/combine_classes");
var _icon2 = require("./icon");
var _ink_ripple = require("./ink_ripple");
var _props = require("./props");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/prefer-optional-chain */ /* eslint-disable @typescript-eslint/no-non-null-assertion */ /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const stylingModes = ['outlined', 'text', 'contained'];
const getCssClasses = model => {
  const {
    icon,
    iconPosition,
    stylingMode,
    text,
    type
  } = model;
  const isValidStylingMode = stylingMode && stylingModes.includes(stylingMode);
  const classesMap = {
    'dx-button': true,
    [`dx-button-mode-${isValidStylingMode ? stylingMode : 'contained'}`]: true,
    [`dx-button-${type ?? 'normal'}`]: true,
    'dx-button-has-text': !!text,
    'dx-button-has-icon': !!icon,
    'dx-button-icon-right': iconPosition !== 'left'
  };
  return (0, _combine_classes.combineClasses)(classesMap);
};
const defaultOptionRules = exports.defaultOptionRules = (0, _utils.createDefaultOptionRules)([{
  device: () => _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator(),
  options: {
    focusStateEnabled: true
  }
}, {
  device: () => (0, _themes.isMaterial)((0, _themes.current)()),
  options: {
    useInkRipple: true
  }
}]);
class Button extends _index.InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.contentRef = (0, _inferno.createRef)();
    this.inkRippleRef = (0, _inferno.createRef)();
    this.submitInputRef = (0, _inferno.createRef)();
    this.widgetRef = (0, _inferno.createRef)();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.__getterCache = {};
    this.state = {};
    this.focus = this.focus.bind(this);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.submitEffect = this.submitEffect.bind(this);
    this.onActive = this.onActive.bind(this);
    this.onInactive = this.onInactive.bind(this);
    this.onWidgetClick = this.onWidgetClick.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }
  createEffects() {
    return [new _index.InfernoEffect(this.submitEffect, [this.props.onSubmit, this.props.useSubmitBehavior]), (0, _index.createReRenderEffect)()];
  }
  updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 || _this$_effects$.update([this.props.onSubmit, this.props.useSubmitBehavior]);
  }
  submitEffect() {
    const namespace = 'UIFeedback';
    const {
      onSubmit,
      useSubmitBehavior
    } = this.props;
    if (useSubmitBehavior && onSubmit) {
      _short.click.on(this.submitInputRef.current, event => onSubmit({
        event,
        submitInput: this.submitInputRef.current
      }), {
        namespace
      });
      return () => _short.click.off(this.submitInputRef.current, {
        namespace
      });
    }
    return undefined;
  }
  onActive(event) {
    const {
      useInkRipple
    } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    useInkRipple && this.inkRippleRef.current.showWave({
      element: this.contentRef.current,
      event
    });
  }
  onInactive(event) {
    const {
      useInkRipple
    } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    useInkRipple && this.inkRippleRef.current.hideWave({
      element: this.contentRef.current,
      event
    });
  }
  onWidgetClick(event) {
    const {
      onClick,
      useSubmitBehavior
    } = this.props;
    onClick === null || onClick === void 0 || onClick({
      event
    });
    if (useSubmitBehavior) {
      this.submitInputRef.current.click();
    }
  }
  keyDown(e) {
    const {
      onKeyDown
    } = this.props;
    const {
      keyName,
      originalEvent,
      which
    } = e;
    const result = onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
    if (result !== null && result !== void 0 && result.cancel) {
      return result;
    }
    if (keyName === 'space' || which === 'space' || keyName === 'enter' || which === 'enter') {
      originalEvent.preventDefault();
      this.onWidgetClick(originalEvent);
    }
    return undefined;
  }
  get aria() {
    const {
      icon,
      text
    } = this.props;
    let label = text ?? '';
    if (!text && icon) {
      const iconSource = (0, _icon.getImageSourceType)(icon);
      switch (iconSource) {
        case 'image':
          {
            const notURLRegexp = /^(?!(?:https?:\/\/)|(?:ftp:\/\/)|(?:www\.))[^\s]+$/;
            const isPathToImage = !icon.includes('base64') && notURLRegexp.test(icon);
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
            var _titleRegexp$exec;
            const titleRegexp = /<title>(.*?)<\/title>/;
            const title = ((_titleRegexp$exec = titleRegexp.exec(icon)) === null || _titleRegexp$exec === void 0 ? void 0 : _titleRegexp$exec[1]) ?? '';
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
      label
    } : {});
  }
  get cssClasses() {
    return getCssClasses(this.props);
  }
  get iconSource() {
    const {
      icon
    } = this.props;
    return icon ?? '';
  }
  get inkRippleConfig() {
    if (this.__getterCache.inkRippleConfig !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.__getterCache.inkRippleConfig;
    }
    // eslint-disable-next-line no-return-assign
    return this.__getterCache.inkRippleConfig = (() => {
      const {
        icon,
        text
      } = this.props;
      return !text && icon ? {
        isCentered: true,
        useHoldAnimation: false,
        waveSizeCoefficient: 1
      } : {};
    })();
  }
  get buttonTemplateData() {
    const {
      icon,
      text,
      templateData
    } = this.props;
    return _extends({
      icon,
      text
    }, templateData);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get restAttributes() {
    const restProps = _extends({}, this.props);
    ['accessKey', 'activeStateEnabled', 'children', 'className', 'disabled', 'focusStateEnabled', 'height', 'hint', 'hoverStateEnabled', 'icon', 'iconPosition', 'iconTemplate', 'onClick', 'onKeyDown', 'onSubmit', 'pressed', 'rtlEnabled', 'stylingMode', 'tabIndex', 'template', 'templateData', 'text', 'type', 'useInkRipple', 'useSubmitBehavior', 'visible', 'width'].forEach(excluded => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete restProps[excluded];
    });
    return restProps;
  }
  focus() {
    this.widgetRef.current.focus();
  }
  activate() {
    this.widgetRef.current.activate();
  }
  deactivate() {
    this.widgetRef.current.deactivate();
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.icon !== nextProps.icon || this.props.text !== nextProps.text) {
      this.__getterCache.inkRippleConfig = undefined;
    }
  }
  render() {
    const {
      children,
      iconPosition,
      text
    } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ButtonTemplate = (0, _index2.getTemplate)(this.props.template);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconTemplate = (0, _index2.getTemplate)(this.props.iconTemplate);
    const renderText = !this.props.template && !children && text !== '';
    const isIconLeft = iconPosition === 'left';
    const iconComponent = !ButtonTemplate && !children && (this.iconSource || IconTemplate) && (0, _inferno.createComponentVNode)(2, _icon2.Icon, {
      "source": this.iconSource,
      "position": iconPosition,
      "iconTemplate": IconTemplate
    });
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
      "accessKey": this.props.accessKey,
      "activeStateEnabled": this.props.activeStateEnabled,
      "aria": this.aria,
      "className": this.props.className,
      "classes": this.cssClasses,
      "disabled": this.props.disabled,
      "focusStateEnabled": this.props.focusStateEnabled,
      "height": this.props.height,
      "hint": this.props.hint,
      "hoverStateEnabled": this.props.hoverStateEnabled,
      "onActive": this.onActive,
      "onClick": this.onWidgetClick,
      "onInactive": this.onInactive,
      "onKeyDown": this.keyDown,
      "rtlEnabled": this.props.rtlEnabled,
      "tabIndex": this.props.tabIndex,
      "visible": this.props.visible,
      "width": this.props.width
    }, this.restAttributes, {
      children: (0, _inferno.createVNode)(1, "div", "dx-button-content", [ButtonTemplate && ButtonTemplate({
        data: this.buttonTemplateData
      }), !ButtonTemplate && children, isIconLeft && iconComponent, renderText && (0, _inferno.createVNode)(1, "span", "dx-button-text", text, 0), !isIconLeft && iconComponent, this.props.useSubmitBehavior && (0, _inferno.createVNode)(64, "input", "dx-button-submit-input", null, 1, {
        "type": "submit",
        "tabindex": -1
      }, null, this.submitInputRef), this.props.useInkRipple && (0, _inferno.createComponentVNode)(2, _ink_ripple.InkRipple, {
        "config": this.inkRippleConfig
      }, null, this.inkRippleRef)], 0, null, null, this.contentRef)
    }), null, this.widgetRef));
  }
}
exports.Button = Button;
Button.defaultProps = _extends({}, _props.defaultButtonProps, (0, _utils.convertRulesToOptions)(defaultOptionRules));
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any
const __defaultOptionRules = [];
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  // eslint-disable-next-line @stylistic/max-len
  Button.defaultProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(Button.defaultProps), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(defaultOptionRules)), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(__defaultOptionRules))));
}
