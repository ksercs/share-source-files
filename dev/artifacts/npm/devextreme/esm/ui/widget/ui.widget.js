/**
* DevExtreme (esm/ui/widget/ui.widget.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import Action from '../../core/action';
import DOMComponent from '../../core/dom_component';
import { active, focus, hover, keyboard } from '../../events/short';
import { deferRender, deferRenderer, noop } from '../../core/utils/common';
import { each } from '../../core/utils/iterator';
import { extend } from '../../core/utils/extend';
import { focusable as focusableSelector } from './selectors';
import { isPlainObject, isDefined } from '../../core/utils/type';
import devices from '../../core/devices';
import { compare as compareVersions } from '../../core/utils/version';
import '../../events/click';
import '../../events/core/emitter.feedback';
import '../../events/hover';
function setAttribute(name, value, target) {
  name = name === 'role' || name === 'id' ? name : "aria-".concat(name);
  value = isDefined(value) ? value.toString() : null;
  target.attr(name, value);
}
var Widget = DOMComponent.inherit({
  _feedbackHideTimeout: 400,
  _feedbackShowTimeout: 30,
  _supportedKeys() {
    return {};
  },
  _getDefaultOptions() {
    return extend(this.callBase(), {
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
      /**
      * @section Utils
      * @type function
      * @default null
      * @type_function_param1 e:object
      * @type_function_param1_field1 component:this
      * @type_function_param1_field2 element:DxElement
      * @type_function_param1_field3 model:object
      * @name WidgetOptions.onFocusIn
      * @action
      * @hidden
      */
      onFocusIn: null,
      /**
      * @section Utils
      * @type function
      * @default null
      * @type_function_param1 e:object
      * @type_function_param1_field1 component:this
      * @type_function_param1_field2 element:DxElement
      * @type_function_param1_field3 model:object
      * @name WidgetOptions.onFocusOut
      * @action
      * @hidden
      */
      onFocusOut: null,
      onKeyboardHandled: null,
      ignoreParentReadOnly: false,
      useResizeObserver: true
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        var device = devices.real();
        var platform = device.platform;
        var version = device.version;
        return platform === 'ios' && compareVersions(version, '13.3') <= 0;
      },
      options: {
        useResizeObserver: false
      }
    }]);
  },
  _init() {
    this.callBase();
    this._initContentReadyAction();
  },
  _innerWidgetOptionChanged: function _innerWidgetOptionChanged(innerWidget, args) {
    var options = Widget.getOptionsFromContainer(args);
    innerWidget && innerWidget.option(options);
    this._options.cache(args.name, options);
  },
  _bindInnerWidgetOptions(innerWidget, optionsContainer) {
    var syncOptions = () => this._options.silent(optionsContainer, extend({}, innerWidget.option()));
    syncOptions();
    innerWidget.on('optionChanged', syncOptions);
  },
  _getAriaTarget() {
    return this._focusTarget();
  },
  _initContentReadyAction() {
    this._contentReadyAction = this._createActionByOption('onContentReady', {
      excludeValidators: ['disabled', 'readOnly']
    });
  },
  _initMarkup() {
    var {
      disabled,
      visible
    } = this.option();
    this.$element().addClass('dx-widget');
    this._toggleDisabledState(disabled);
    this._toggleVisibility(visible);
    this._renderHint();
    this._isFocusable() && this._renderFocusTarget();
    this.callBase();
  },
  _render() {
    this.callBase();
    this._renderContent();
    this._renderFocusState();
    this._attachFeedbackEvents();
    this._attachHoverEvents();
    this._toggleIndependentState();
  },
  _renderHint() {
    var {
      hint
    } = this.option();
    this.$element().attr('title', hint || null);
  },
  _renderContent() {
    deferRender(() => !this._disposed ? this._renderContentImpl() : void 0).done(() => !this._disposed ? this._fireContentReadyAction() : void 0);
  },
  _renderContentImpl: noop,
  _fireContentReadyAction: deferRenderer(function () {
    return this._contentReadyAction();
  }),
  _dispose() {
    this._contentReadyAction = null;
    this._detachKeyboardEvents();
    this.callBase();
  },
  _resetActiveState() {
    this._toggleActiveState(this._eventBindingTarget(), false);
  },
  _clean() {
    this._cleanFocusState();
    this._resetActiveState();
    this.callBase();
    this.$element().empty();
  },
  _toggleVisibility(visible) {
    this.$element().toggleClass('dx-state-invisible', !visible);
  },
  _renderFocusState() {
    this._attachKeyboardEvents();
    if (this._isFocusable()) {
      this._renderFocusTarget();
      this._attachFocusEvents();
      this._renderAccessKey();
    }
  },
  _renderAccessKey() {
    var $el = this._focusTarget();
    var {
      accessKey
    } = this.option();
    $el.attr('accesskey', accessKey);
  },
  _isFocusable() {
    var {
      focusStateEnabled,
      disabled
    } = this.option();
    return focusStateEnabled && !disabled;
  },
  _eventBindingTarget() {
    return this.$element();
  },
  _focusTarget() {
    return this._getActiveElement();
  },
  _isFocusTarget: function _isFocusTarget(element) {
    var focusTargets = $(this._focusTarget()).toArray();
    return focusTargets.includes(element);
  },
  _findActiveTarget($element) {
    return $element.find(this._activeStateUnit).not('.dx-state-disabled');
  },
  _getActiveElement() {
    var activeElement = this._eventBindingTarget();
    if (this._activeStateUnit) {
      return this._findActiveTarget(activeElement);
    }
    return activeElement;
  },
  _renderFocusTarget() {
    var {
      tabIndex
    } = this.option();
    this._focusTarget().attr('tabIndex', tabIndex);
  },
  _keyboardEventBindingTarget() {
    return this._eventBindingTarget();
  },
  _refreshFocusEvent() {
    this._detachFocusEvents();
    this._attachFocusEvents();
  },
  _focusEventTarget() {
    return this._focusTarget();
  },
  _focusInHandler(event) {
    if (!event.isDefaultPrevented()) {
      this._createActionByOption('onFocusIn', {
        beforeExecute: () => this._updateFocusState(event, true),
        excludeValidators: ['readOnly']
      })({
        event
      });
    }
  },
  _focusOutHandler(event) {
    if (!event.isDefaultPrevented()) {
      this._createActionByOption('onFocusOut', {
        beforeExecute: () => this._updateFocusState(event, false),
        excludeValidators: ['readOnly', 'disabled']
      })({
        event
      });
    }
  },
  _updateFocusState(_ref, isFocused) {
    var {
      target
    } = _ref;
    if (this._isFocusTarget(target)) {
      this._toggleFocusClass(isFocused, $(target));
    }
  },
  _toggleFocusClass(isFocused, $element) {
    var $focusTarget = $element && $element.length ? $element : this._focusTarget();
    $focusTarget.toggleClass('dx-state-focused', isFocused);
  },
  _hasFocusClass(element) {
    var $focusTarget = $(element || this._focusTarget());
    return $focusTarget.hasClass('dx-state-focused');
  },
  _isFocused() {
    return this._hasFocusClass();
  },
  _getKeyboardListeners() {
    return [];
  },
  _attachKeyboardEvents() {
    this._detachKeyboardEvents();
    var {
      focusStateEnabled,
      onKeyboardHandled
    } = this.option();
    var hasChildListeners = this._getKeyboardListeners().length;
    var hasKeyboardEventHandler = !!onKeyboardHandled;
    var shouldAttach = focusStateEnabled || hasChildListeners || hasKeyboardEventHandler;
    if (shouldAttach) {
      this._keyboardListenerId = keyboard.on(this._keyboardEventBindingTarget(), this._focusTarget(), opts => this._keyboardHandler(opts));
    }
  },
  _keyboardHandler(options, onlyChildProcessing) {
    if (!onlyChildProcessing) {
      var {
        originalEvent,
        keyName,
        which
      } = options;
      var keys = this._supportedKeys(originalEvent);
      var func = keys[keyName] || keys[which];
      if (func !== undefined) {
        var handler = func.bind(this);
        var result = handler(originalEvent, options);
        if (!result) {
          return false;
        }
      }
    }
    var keyboardListeners = this._getKeyboardListeners();
    var {
      onKeyboardHandled
    } = this.option();
    keyboardListeners.forEach(listener => listener && listener._keyboardHandler(options));
    onKeyboardHandled && onKeyboardHandled(options);
    return true;
  },
  _refreshFocusState() {
    this._cleanFocusState();
    this._renderFocusState();
  },
  _cleanFocusState() {
    var $element = this._focusTarget();
    $element.removeAttr('tabIndex');
    this._toggleFocusClass(false);
    this._detachFocusEvents();
    this._detachKeyboardEvents();
  },
  _detachKeyboardEvents() {
    keyboard.off(this._keyboardListenerId);
    this._keyboardListenerId = null;
  },
  _attachHoverEvents() {
    var {
      hoverStateEnabled
    } = this.option();
    var selector = this._activeStateUnit;
    var namespace = 'UIFeedback';
    var $el = this._eventBindingTarget();
    hover.off($el, {
      selector,
      namespace
    });
    if (hoverStateEnabled) {
      hover.on($el, new Action(_ref2 => {
        var {
          event,
          element
        } = _ref2;
        this._hoverStartHandler(event);
        this.option('hoveredElement', $(element));
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
  },
  _attachFeedbackEvents() {
    var {
      activeStateEnabled
    } = this.option();
    var selector = this._activeStateUnit;
    var namespace = 'UIFeedback';
    var $el = this._eventBindingTarget();
    active.off($el, {
      namespace,
      selector
    });
    if (activeStateEnabled) {
      active.on($el, new Action(_ref3 => {
        var {
          event,
          element
        } = _ref3;
        return this._toggleActiveState($(element), true, event);
      }), new Action(_ref4 => {
        var {
          event,
          element
        } = _ref4;
        return this._toggleActiveState($(element), false, event);
      }, {
        excludeValidators: ['disabled', 'readOnly']
      }), {
        showTimeout: this._feedbackShowTimeout,
        hideTimeout: this._feedbackHideTimeout,
        selector,
        namespace
      });
    }
  },
  _detachFocusEvents() {
    var $el = this._focusEventTarget();
    focus.off($el, {
      namespace: "".concat(this.NAME, "Focus")
    });
  },
  _attachFocusEvents() {
    var $el = this._focusEventTarget();
    focus.on($el, e => this._focusInHandler(e), e => this._focusOutHandler(e), {
      namespace: "".concat(this.NAME, "Focus"),
      isFocusable: (index, el) => $(el).is(focusableSelector)
    });
  },
  _hoverStartHandler: noop,
  _hoverEndHandler: noop,
  _toggleActiveState($element, value) {
    this.option('isActive', value);
    $element.toggleClass('dx-state-active', value);
  },
  _updatedHover() {
    var hoveredElement = this._options.silent('hoveredElement');
    this._hover(hoveredElement, hoveredElement);
  },
  _findHoverTarget($el) {
    return $el && $el.closest(this._activeStateUnit || this._eventBindingTarget());
  },
  _hover($el, $previous) {
    var {
      hoverStateEnabled,
      disabled,
      isActive
    } = this.option();
    $previous = this._findHoverTarget($previous);
    $previous && $previous.toggleClass('dx-state-hover', false);
    if ($el && hoverStateEnabled && !disabled && !isActive) {
      var newHoveredElement = this._findHoverTarget($el);
      newHoveredElement && newHoveredElement.toggleClass('dx-state-hover', true);
    }
  },
  _toggleDisabledState(value) {
    this.$element().toggleClass('dx-state-disabled', Boolean(value));
    this.setAria('disabled', value || undefined);
  },
  _toggleIndependentState() {
    this.$element().toggleClass('dx-state-independent', this.option('ignoreParentReadOnly'));
  },
  _setWidgetOption(widgetName, args) {
    if (!this[widgetName]) {
      return;
    }
    if (isPlainObject(args[0])) {
      each(args[0], (option, value) => this._setWidgetOption(widgetName, [option, value]));
      return;
    }
    var optionName = args[0];
    var value = args[1];
    if (args.length === 1) {
      value = this.option(optionName);
    }
    var widgetOptionMap = this["".concat(widgetName, "OptionMap")];
    this[widgetName].option(widgetOptionMap ? widgetOptionMap(optionName) : optionName, value);
  },
  _optionChanged(args) {
    var {
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
        this.callBase(args);
    }
  },
  _isVisible() {
    var {
      visible
    } = this.option();
    return this.callBase() && visible;
  },
  beginUpdate() {
    this._ready(false);
    this.callBase();
  },
  endUpdate() {
    this.callBase();
    if (this._initialized) {
      this._ready(true);
    }
  },
  _ready(value) {
    if (arguments.length === 0) {
      return this._isReady;
    }
    this._isReady = value;
  },
  setAria() {
    if (!isPlainObject(arguments.length <= 0 ? undefined : arguments[0])) {
      setAttribute(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], (arguments.length <= 2 ? undefined : arguments[2]) || this._getAriaTarget());
    } else {
      var target = (arguments.length <= 1 ? undefined : arguments[1]) || this._getAriaTarget();
      each(arguments.length <= 0 ? undefined : arguments[0], (name, value) => setAttribute(name, value, target));
    }
  },
  isReady() {
    return this._ready();
  },
  repaint() {
    this._refresh();
  },
  focus() {
    focus.trigger(this._focusTarget());
  },
  registerKeyHandler(key, handler) {
    var currentKeys = this._supportedKeys();
    this._supportedKeys = () => extend(currentKeys, {
      [key]: handler
    });
  }
});
Widget.getOptionsFromContainer = _ref5 => {
  var {
    name,
    fullName,
    value
  } = _ref5;
  var options = {};
  if (name === fullName) {
    options = value;
  } else {
    var option = fullName.split('.').pop();
    options[option] = value;
  }
  return options;
};
export default Widget;
