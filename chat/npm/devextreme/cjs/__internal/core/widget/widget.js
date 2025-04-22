/**
* DevExtreme (cjs/__internal/core/widget/widget.js)
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
exports.default = exports.HOVER_STATE_CLASS = exports.FOCUSED_STATE_CLASS = void 0;
require("../../../common/core/events/click");
require("../../../common/core/events/core/emitter.feedback");
require("../../../common/core/events/hover");
var _short = require("../../../common/core/events/short");
var _action = _interopRequireDefault(require("../../../core/action"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _version = require("../../../core/utils/version");
var _selectors = require("../../../ui/widget/selectors");
var _dom_component = _interopRequireDefault(require("./dom_component"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DISABLED_STATE_CLASS = 'dx-state-disabled';
const FOCUSED_STATE_CLASS = exports.FOCUSED_STATE_CLASS = 'dx-state-focused';
const HOVER_STATE_CLASS = exports.HOVER_STATE_CLASS = 'dx-state-hover';
const INVISIBLE_STATE_CLASS = 'dx-state-invisible';
function setAttribute(name, value, target) {
  // eslint-disable-next-line no-param-reassign
  name = name === 'role' || name === 'id' ? name : `aria-${name}`;
  // eslint-disable-next-line no-param-reassign
  value = (0, _type.isDefined)(value) ? value.toString() : null;
  target.attr(name, value);
}
class Widget extends _dom_component.default {
  constructor() {
    super(...arguments);
    this._feedbackHideTimeout = 400;
    this._feedbackShowTimeout = 30;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static getOptionsFromContainer(_ref) {
    let {
      name,
      fullName,
      value
    } = _ref;
    let options = {};
    if (name === fullName) {
      options = value;
    } else {
      const option = fullName.split('.').pop();
      options[option] = value;
    }
    return options;
  }
  _supportedKeys() {
    return {};
  }
  _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _extend.extend)(super._getDefaultOptions(), {
      hoveredElement: null,
      isActive: false,
      disabled: false,
      visible: true,
      hint: undefined,
      activeStateEnabled: false,
      onContentReady: null,
      hoverStateEnabled: false,
      focusStateEnabled: false,
      tabIndex: 0,
      accessKey: undefined,
      onFocusIn: null,
      onFocusOut: null,
      onKeyboardHandled: null,
      ignoreParentReadOnly: false,
      useResizeObserver: true
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        const device = _devices.default.real();
        const {
          platform
        } = device;
        const {
          version
        } = device;
        return platform === 'ios' && (0, _version.compare)(version, '13.3') <= 0;
      },
      // @ts-expect-error
      options: {
        useResizeObserver: false
      }
    }]);
  }
  _init() {
    super._init();
    this._initContentReadyAction();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _innerWidgetOptionChanged(innerWidget, args) {
    const options = Widget.getOptionsFromContainer(args);
    // eslint-disable-next-line @stylistic/max-len
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/prefer-optional-chain
    innerWidget && innerWidget.option(options);
    this._options.cache(args.name, options);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _bindInnerWidgetOptions(innerWidget, optionsContainer) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const syncOptions = () => this._options.silent(optionsContainer, (0, _extend.extend)({}, innerWidget.option()));
    syncOptions();
    innerWidget.on('optionChanged', syncOptions);
  }
  _getAriaTarget() {
    return this._focusTarget();
  }
  _initContentReadyAction() {
    this._contentReadyAction = this._createActionByOption('onContentReady', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _initMarkup() {
    const {
      disabled,
      visible
    } = this.option();
    this.$element().addClass('dx-widget');
    this._toggleDisabledState(disabled);
    this._toggleVisibility(visible);
    this._renderHint();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this._isFocusable() && this._renderFocusTarget();
    super._initMarkup();
  }
  _render() {
    super._render();
    this._renderContent();
    this._renderFocusState();
    this._attachFeedbackEvents();
    this._attachHoverEvents();
    this._toggleIndependentState();
  }
  _renderHint() {
    const {
      hint
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this.$element().attr('title', hint || null);
  }
  _renderContent() {
    // eslint-disable-next-line no-void
    (0, _common.deferRender)(() => !this._disposed ? this._renderContentImpl() : void 0)
    // @ts-expect-error
    // eslint-disable-next-line no-void
    .done(() => !this._disposed ? this._fireContentReadyAction() : void 0);
  }
  _renderContentImpl() {}
  _fireContentReadyAction() {
    return (0, _common.deferRender)(() => {
      var _this$_contentReadyAc;
      return (_this$_contentReadyAc = this._contentReadyAction) === null || _this$_contentReadyAc === void 0 ? void 0 : _this$_contentReadyAc.call(this);
    });
  }
  _dispose() {
    this._contentReadyAction = null;
    this._detachKeyboardEvents();
    super._dispose();
  }
  _resetActiveState() {
    this._toggleActiveState(this._eventBindingTarget(), false);
  }
  _clean() {
    this._cleanFocusState();
    this._resetActiveState();
    super._clean();
    this.$element().empty();
  }
  _toggleVisibility(visible) {
    this.$element().toggleClass(INVISIBLE_STATE_CLASS, !visible);
  }
  _renderFocusState() {
    this._attachKeyboardEvents();
    if (this._isFocusable()) {
      this._renderFocusTarget();
      this._attachFocusEvents();
      this._renderAccessKey();
    }
  }
  _renderAccessKey() {
    const $el = this._focusTarget();
    const {
      accessKey
    } = this.option();
    // @ts-expect-error
    $el.attr('accesskey', accessKey);
  }
  _isFocusable() {
    const {
      focusStateEnabled,
      disabled
    } = this.option();
    return focusStateEnabled && !disabled;
  }
  _eventBindingTarget() {
    return this.$element();
  }
  _focusTarget() {
    return this._getActiveElement();
  }
  _isFocusTarget(element) {
    const focusTargets = (0, _renderer.default)(this._focusTarget()).toArray();
    // @ts-expect-error ts-error
    return focusTargets.includes(element);
  }
  _findActiveTarget($element) {
    return $element.find(this._activeStateUnit).not(`.${DISABLED_STATE_CLASS}`);
  }
  _getActiveElement() {
    const activeElement = this._eventBindingTarget();
    if (this._activeStateUnit) {
      return this._findActiveTarget(activeElement);
    }
    return activeElement;
  }
  _renderFocusTarget() {
    const {
      tabIndex
    } = this.option();
    // @ts-expect-error
    this._focusTarget().attr('tabIndex', tabIndex);
  }
  _keyboardEventBindingTarget() {
    return this._eventBindingTarget();
  }
  _refreshFocusEvent() {
    this._detachFocusEvents();
    this._attachFocusEvents();
  }
  _focusEventTarget() {
    return this._focusTarget();
  }
  _focusInHandler(event) {
    if (!event.isDefaultPrevented()) {
      this._createActionByOption('onFocusIn', {
        beforeExecute: () => this._updateFocusState(event, true),
        excludeValidators: ['readOnly']
      })({
        event
      });
    }
  }
  _focusOutHandler(event) {
    if (!event.isDefaultPrevented()) {
      this._createActionByOption('onFocusOut', {
        beforeExecute: () => this._updateFocusState(event, false),
        excludeValidators: ['readOnly', 'disabled']
      })({
        event
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _updateFocusState(_ref2, isFocused) {
    let {
      target
    } = _ref2;
    if (this._isFocusTarget(target)) {
      this._toggleFocusClass(isFocused, (0, _renderer.default)(target));
    }
  }
  _toggleFocusClass(isFocused, $element) {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    const $focusTarget = $element && $element.length ? $element : this._focusTarget();
    $focusTarget.toggleClass(FOCUSED_STATE_CLASS, isFocused);
  }
  _hasFocusClass(element) {
    const $focusTarget = (0, _renderer.default)(element ?? this._focusTarget());
    return $focusTarget.hasClass(FOCUSED_STATE_CLASS);
  }
  _isFocused() {
    return this._hasFocusClass();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getKeyboardListeners() {
    return [];
  }
  _attachKeyboardEvents() {
    this._detachKeyboardEvents();
    const {
      focusStateEnabled,
      onKeyboardHandled
    } = this.option();
    const hasChildListeners = this._getKeyboardListeners().length;
    const hasKeyboardEventHandler = !!onKeyboardHandled;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const shouldAttach = focusStateEnabled || hasChildListeners || hasKeyboardEventHandler;
    if (shouldAttach) {
      this._keyboardListenerId = _short.keyboard.on(this._keyboardEventBindingTarget(), this._focusTarget(), opts => this._keyboardHandler(opts));
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _keyboardHandler(options, onlyChildProcessing) {
    if (!onlyChildProcessing) {
      const {
        originalEvent,
        keyName,
        which
      } = options;
      // @ts-expect-error
      const keys = this._supportedKeys(originalEvent);
      const func = keys[keyName] || keys[which];
      if (func !== undefined) {
        const handler = func.bind(this);
        const result = handler(originalEvent, options);
        if (!result) {
          return false;
        }
      }
    }
    const keyboardListeners = this._getKeyboardListeners();
    const {
      onKeyboardHandled
    } = this.option();
    // eslint-disable-next-line @stylistic/max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/prefer-optional-chain
    keyboardListeners.forEach(listener => listener && listener._keyboardHandler(options));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onKeyboardHandled && onKeyboardHandled(options);
    return true;
  }
  _refreshFocusState() {
    this._cleanFocusState();
    this._renderFocusState();
  }
  _cleanFocusState() {
    const $element = this._focusTarget();
    $element.removeAttr('tabIndex');
    this._toggleFocusClass(false);
    this._detachFocusEvents();
    this._detachKeyboardEvents();
  }
  _detachKeyboardEvents() {
    _short.keyboard.off(this._keyboardListenerId);
    this._keyboardListenerId = null;
  }
  _attachHoverEvents() {
    const {
      hoverStateEnabled
    } = this.option();
    const selector = this._activeStateUnit;
    const namespace = 'UIFeedback';
    const $el = this._eventBindingTarget();
    _short.hover.off($el, {
      selector,
      namespace
    });
    if (hoverStateEnabled) {
      _short.hover.on($el, new _action.default(_ref3 => {
        let {
          event,
          element
        } = _ref3;
        this._hoverStartHandler(event);
        this.option('hoveredElement', (0, _renderer.default)(element));
      }, {
        excludeValidators: ['readOnly']
      }), event => {
        this.option('hoveredElement', null);
        this._hoverEndHandler(event);
      }, {
        selector,
        namespace
      });
    }
  }
  _attachFeedbackEvents() {
    const {
      activeStateEnabled
    } = this.option();
    const selector = this._activeStateUnit;
    const namespace = 'UIFeedback';
    const $el = this._eventBindingTarget();
    _short.active.off($el, {
      namespace,
      selector
    });
    if (activeStateEnabled) {
      _short.active.on($el, new _action.default(_ref4 => {
        let {
          event,
          element
        } = _ref4;
        return this._toggleActiveState((0, _renderer.default)(element), true, event);
      }), new _action.default(_ref5 => {
        let {
          event,
          element
        } = _ref5;
        return this._toggleActiveState((0, _renderer.default)(element), false, event);
      }, {
        excludeValidators: ['disabled', 'readOnly']
      }), {
        showTimeout: this._feedbackShowTimeout,
        hideTimeout: this._feedbackHideTimeout,
        selector,
        namespace
      });
    }
  }
  _detachFocusEvents() {
    const $el = this._focusEventTarget();
    _short.focus.off($el, {
      namespace: `${this.NAME}Focus`
    });
  }
  _attachFocusEvents() {
    const $el = this._focusEventTarget();
    _short.focus.on($el, e => this._focusInHandler(e), e => this._focusOutHandler(e), {
      namespace: `${this.NAME}Focus`,
      // @ts-expect-error
      isFocusable: (index, el) => (0, _renderer.default)(el).is(_selectors.focusable)
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _hoverStartHandler(event) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _hoverEndHandler(event) {}
  _toggleActiveState($element, value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event) {
    this.option('isActive', value);
    $element.toggleClass('dx-state-active', value);
  }
  _updatedHover() {
    const hoveredElement = this._options.silent('hoveredElement');
    this._hover(hoveredElement, hoveredElement);
  }
  _findHoverTarget($el) {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    return $el && $el.closest(this._activeStateUnit || this._eventBindingTarget());
  }
  _hover($el, $previous) {
    const {
      hoverStateEnabled,
      disabled,
      isActive
    } = this.option();
    // eslint-disable-next-line no-param-reassign
    $previous = this._findHoverTarget($previous);
    // eslint-disable-next-line @stylistic/max-len
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/prefer-optional-chain
    $previous && $previous.toggleClass(HOVER_STATE_CLASS, false);
    if ($el && hoverStateEnabled && !disabled && !isActive) {
      const newHoveredElement = this._findHoverTarget($el);
      // eslint-disable-next-line @stylistic/max-len
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/prefer-optional-chain
      newHoveredElement && newHoveredElement.toggleClass(HOVER_STATE_CLASS, true);
    }
  }
  _toggleDisabledState(value) {
    this.$element().toggleClass(DISABLED_STATE_CLASS, Boolean(value));
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this.setAria('disabled', value || undefined);
  }
  _toggleIndependentState() {
    const {
      ignoreParentReadOnly
    } = this.option();
    this.$element().toggleClass('dx-state-independent', ignoreParentReadOnly);
  }
  _setWidgetOption(widgetName, args) {
    if (!this[widgetName]) {
      return;
    }
    if ((0, _type.isPlainObject)(args[0])) {
      // @ts-expect-error
      (0, _iterator.each)(args[0], (option, value) => this._setWidgetOption(widgetName, [option, value]));
      return;
    }
    const optionName = args[0];
    let value = args[1];
    if (args.length === 1) {
      value = this.option(optionName);
    }
    const widgetOptionMap = this[`${widgetName}OptionMap`];
    this[widgetName].option(widgetOptionMap ? widgetOptionMap(optionName) : optionName, value);
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'disabled':
        this._toggleDisabledState(value);
        this._updatedHover();
        this._refreshFocusState();
        break;
      case 'hint':
        this._renderHint();
        break;
      case 'ignoreParentReadOnly':
        this._toggleIndependentState();
        break;
      case 'activeStateEnabled':
        this._attachFeedbackEvents();
        break;
      case 'hoverStateEnabled':
        this._attachHoverEvents();
        this._updatedHover();
        break;
      case 'tabIndex':
      case 'focusStateEnabled':
        this._refreshFocusState();
        break;
      case 'onFocusIn':
      case 'onFocusOut':
      case 'useResizeObserver':
        break;
      case 'accessKey':
        this._renderAccessKey();
        break;
      case 'hoveredElement':
        this._hover(value, previousValue);
        break;
      case 'isActive':
        this._updatedHover();
        break;
      case 'visible':
        this._toggleVisibility(value);
        if (this._isVisibilityChangeSupported()) {
          // TODO hiding works wrong
          this._checkVisibilityChanged(value ? 'shown' : 'hiding');
        }
        break;
      case 'onKeyboardHandled':
        this._attachKeyboardEvents();
        break;
      case 'onContentReady':
        this._initContentReadyAction();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _isVisible() {
    const {
      visible
    } = this.option();
    // @ts-expect-error
    return super._isVisible() && visible;
  }
  beginUpdate() {
    this._ready(false);
    super.beginUpdate();
  }
  endUpdate() {
    super.endUpdate();
    if (this._initialized) {
      this._ready(true);
    }
  }
  _ready(value) {
    if (arguments.length === 0) {
      return !!this._isReady;
    }
    this._isReady = !!value;
    return this._isReady;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setAria() {
    if (!(0, _type.isPlainObject)(arguments.length <= 0 ? undefined : arguments[0])) {
      setAttribute(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], (arguments.length <= 2 ? undefined : arguments[2]) || this._getAriaTarget());
    } else {
      const target = (arguments.length <= 1 ? undefined : arguments[1]) || this._getAriaTarget();
      (0, _iterator.each)(arguments.length <= 0 ? undefined : arguments[0], (name, value) => setAttribute(name, value, target));
    }
  }
  isReady() {
    return this._ready();
  }
  repaint() {
    this._refresh();
  }
  focus() {
    _short.focus.trigger(this._focusTarget());
  }
  registerKeyHandler(key, handler) {
    const currentKeys = this._supportedKeys();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @stylistic/max-len
    this._supportedKeys = () => (0, _extend.extend)(currentKeys, {
      [key]: handler
    });
  }
}
var _default = exports.default = Widget;
