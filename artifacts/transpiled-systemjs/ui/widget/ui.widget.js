!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/widget/ui.widget.js"], ["../../core/renderer","../../core/action","../../core/dom_component","../../events/short","../../core/utils/common","../../core/utils/iterator","../../core/utils/extend","./selectors","../../core/utils/type","../../core/devices","../../core/utils/version","../../events/click","../../events/core/emitter.feedback","../../events/hover"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/widget/ui.widget.js", ["../../core/renderer", "../../core/action", "../../core/dom_component", "../../events/short", "../../core/utils/common", "../../core/utils/iterator", "../../core/utils/extend", "./selectors", "../../core/utils/type", "../../core/devices", "../../core/utils/version", "../../events/click", "../../events/core/emitter.feedback", "../../events/hover"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _action = _interopRequireDefault($__require("../../core/action"));
  var _dom_component = _interopRequireDefault($__require("../../core/dom_component"));
  var _short = $__require("../../events/short");
  var _common = $__require("../../core/utils/common");
  var _iterator = $__require("../../core/utils/iterator");
  var _extend2 = $__require("../../core/utils/extend");
  var _selectors = $__require("./selectors");
  var _type = $__require("../../core/utils/type");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _version = $__require("../../core/utils/version");
  $__require("../../events/click");
  $__require("../../events/core/emitter.feedback");
  $__require("../../events/hover");
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
  function setAttribute(name, value, target) {
    name = name === 'role' || name === 'id' ? name : "aria-".concat(name);
    value = (0, _type.isDefined)(value) ? value.toString() : null;
    target.attr(name, value);
  }
  var Widget = _dom_component.default.inherit({
    _feedbackHideTimeout: 400,
    _feedbackShowTimeout: 30,
    _supportedKeys: function _supportedKeys() {
      return {};
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend2.extend)(this.callBase(), {
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
          var device = _devices.default.real();
          var platform = device.platform;
          var version = device.version;
          return platform === 'ios' && (0, _version.compare)(version, '13.3') <= 0;
        },
        options: {
          useResizeObserver: false
        }
      }]);
    },
    _init: function _init() {
      this.callBase();
      this._initContentReadyAction();
    },
    _innerWidgetOptionChanged: function _innerWidgetOptionChanged(innerWidget, args) {
      var options = Widget.getOptionsFromContainer(args);
      innerWidget && innerWidget.option(options);
      this._options.cache(args.name, options);
    },
    _bindInnerWidgetOptions: function _bindInnerWidgetOptions(innerWidget, optionsContainer) {
      var _this = this;
      var syncOptions = function syncOptions() {
        return _this._options.silent(optionsContainer, (0, _extend2.extend)({}, innerWidget.option()));
      };
      syncOptions();
      innerWidget.on('optionChanged', syncOptions);
    },
    _getAriaTarget: function _getAriaTarget() {
      return this._focusTarget();
    },
    _initContentReadyAction: function _initContentReadyAction() {
      this._contentReadyAction = this._createActionByOption('onContentReady', {
        excludeValidators: ['disabled', 'readOnly']
      });
    },
    _initMarkup: function _initMarkup() {
      var _this$option = this.option(),
          disabled = _this$option.disabled,
          visible = _this$option.visible;
      this.$element().addClass('dx-widget');
      this._toggleDisabledState(disabled);
      this._toggleVisibility(visible);
      this._renderHint();
      this._isFocusable() && this._renderFocusTarget();
      this.callBase();
    },
    _render: function _render() {
      this.callBase();
      this._renderContent();
      this._renderFocusState();
      this._attachFeedbackEvents();
      this._attachHoverEvents();
      this._toggleIndependentState();
    },
    _renderHint: function _renderHint() {
      var _this$option2 = this.option(),
          hint = _this$option2.hint;
      this.$element().attr('title', hint || null);
    },
    _renderContent: function _renderContent() {
      var _this2 = this;
      (0, _common.deferRender)(function () {
        return !_this2._disposed ? _this2._renderContentImpl() : void 0;
      }).done(function () {
        return !_this2._disposed ? _this2._fireContentReadyAction() : void 0;
      });
    },
    _renderContentImpl: _common.noop,
    _fireContentReadyAction: (0, _common.deferRenderer)(function () {
      return this._contentReadyAction();
    }),
    _dispose: function _dispose() {
      this._contentReadyAction = null;
      this._detachKeyboardEvents();
      this.callBase();
    },
    _resetActiveState: function _resetActiveState() {
      this._toggleActiveState(this._eventBindingTarget(), false);
    },
    _clean: function _clean() {
      this._cleanFocusState();
      this._resetActiveState();
      this.callBase();
      this.$element().empty();
    },
    _toggleVisibility: function _toggleVisibility(visible) {
      this.$element().toggleClass('dx-state-invisible', !visible);
    },
    _renderFocusState: function _renderFocusState() {
      this._attachKeyboardEvents();
      if (this._isFocusable()) {
        this._renderFocusTarget();
        this._attachFocusEvents();
        this._renderAccessKey();
      }
    },
    _renderAccessKey: function _renderAccessKey() {
      var $el = this._focusTarget();
      var _this$option3 = this.option(),
          accessKey = _this$option3.accessKey;
      $el.attr('accesskey', accessKey);
    },
    _isFocusable: function _isFocusable() {
      var _this$option4 = this.option(),
          focusStateEnabled = _this$option4.focusStateEnabled,
          disabled = _this$option4.disabled;
      return focusStateEnabled && !disabled;
    },
    _eventBindingTarget: function _eventBindingTarget() {
      return this.$element();
    },
    _focusTarget: function _focusTarget() {
      return this._getActiveElement();
    },
    _isFocusTarget: function _isFocusTarget(element) {
      var focusTargets = (0, _renderer.default)(this._focusTarget()).toArray();
      return focusTargets.includes(element);
    },
    _findActiveTarget: function _findActiveTarget($element) {
      return $element.find(this._activeStateUnit).not('.dx-state-disabled');
    },
    _getActiveElement: function _getActiveElement() {
      var activeElement = this._eventBindingTarget();
      if (this._activeStateUnit) {
        return this._findActiveTarget(activeElement);
      }
      return activeElement;
    },
    _renderFocusTarget: function _renderFocusTarget() {
      var _this$option5 = this.option(),
          tabIndex = _this$option5.tabIndex;
      this._focusTarget().attr('tabIndex', tabIndex);
    },
    _keyboardEventBindingTarget: function _keyboardEventBindingTarget() {
      return this._eventBindingTarget();
    },
    _refreshFocusEvent: function _refreshFocusEvent() {
      this._detachFocusEvents();
      this._attachFocusEvents();
    },
    _focusEventTarget: function _focusEventTarget() {
      return this._focusTarget();
    },
    _focusInHandler: function _focusInHandler(event) {
      var _this3 = this;
      if (!event.isDefaultPrevented()) {
        this._createActionByOption('onFocusIn', {
          beforeExecute: function beforeExecute() {
            return _this3._updateFocusState(event, true);
          },
          excludeValidators: ['readOnly']
        })({
          event: event
        });
      }
    },
    _focusOutHandler: function _focusOutHandler(event) {
      var _this4 = this;
      if (!event.isDefaultPrevented()) {
        this._createActionByOption('onFocusOut', {
          beforeExecute: function beforeExecute() {
            return _this4._updateFocusState(event, false);
          },
          excludeValidators: ['readOnly', 'disabled']
        })({
          event: event
        });
      }
    },
    _updateFocusState: function _updateFocusState(_ref, isFocused) {
      var target = _ref.target;
      if (this._isFocusTarget(target)) {
        this._toggleFocusClass(isFocused, (0, _renderer.default)(target));
      }
    },
    _toggleFocusClass: function _toggleFocusClass(isFocused, $element) {
      var $focusTarget = $element && $element.length ? $element : this._focusTarget();
      $focusTarget.toggleClass('dx-state-focused', isFocused);
    },
    _hasFocusClass: function _hasFocusClass(element) {
      var $focusTarget = (0, _renderer.default)(element || this._focusTarget());
      return $focusTarget.hasClass('dx-state-focused');
    },
    _isFocused: function _isFocused() {
      return this._hasFocusClass();
    },
    _getKeyboardListeners: function _getKeyboardListeners() {
      return [];
    },
    _attachKeyboardEvents: function _attachKeyboardEvents() {
      var _this5 = this;
      this._detachKeyboardEvents();
      var _this$option6 = this.option(),
          focusStateEnabled = _this$option6.focusStateEnabled,
          onKeyboardHandled = _this$option6.onKeyboardHandled;
      var hasChildListeners = this._getKeyboardListeners().length;
      var hasKeyboardEventHandler = !!onKeyboardHandled;
      var shouldAttach = focusStateEnabled || hasChildListeners || hasKeyboardEventHandler;
      if (shouldAttach) {
        this._keyboardListenerId = _short.keyboard.on(this._keyboardEventBindingTarget(), this._focusTarget(), function (opts) {
          return _this5._keyboardHandler(opts);
        });
      }
    },
    _keyboardHandler: function _keyboardHandler(options, onlyChildProcessing) {
      if (!onlyChildProcessing) {
        var originalEvent = options.originalEvent,
            keyName = options.keyName,
            which = options.which;
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
      var _this$option7 = this.option(),
          onKeyboardHandled = _this$option7.onKeyboardHandled;
      keyboardListeners.forEach(function (listener) {
        return listener && listener._keyboardHandler(options);
      });
      onKeyboardHandled && onKeyboardHandled(options);
      return true;
    },
    _refreshFocusState: function _refreshFocusState() {
      this._cleanFocusState();
      this._renderFocusState();
    },
    _cleanFocusState: function _cleanFocusState() {
      var $element = this._focusTarget();
      $element.removeAttr('tabIndex');
      this._toggleFocusClass(false);
      this._detachFocusEvents();
      this._detachKeyboardEvents();
    },
    _detachKeyboardEvents: function _detachKeyboardEvents() {
      _short.keyboard.off(this._keyboardListenerId);
      this._keyboardListenerId = null;
    },
    _attachHoverEvents: function _attachHoverEvents() {
      var _this6 = this;
      var _this$option8 = this.option(),
          hoverStateEnabled = _this$option8.hoverStateEnabled;
      var selector = this._activeStateUnit;
      var namespace = 'UIFeedback';
      var $el = this._eventBindingTarget();
      _short.hover.off($el, {
        selector: selector,
        namespace: namespace
      });
      if (hoverStateEnabled) {
        _short.hover.on($el, new _action.default(function (_ref2) {
          var event = _ref2.event,
              element = _ref2.element;
          _this6._hoverStartHandler(event);
          _this6.option('hoveredElement', (0, _renderer.default)(element));
        }, {
          excludeValidators: ['readOnly']
        }), function (event) {
          _this6.option('hoveredElement', null);
          _this6._hoverEndHandler(event);
        }, {
          selector: selector,
          namespace: namespace
        });
      }
    },
    _attachFeedbackEvents: function _attachFeedbackEvents() {
      var _this7 = this;
      var _this$option9 = this.option(),
          activeStateEnabled = _this$option9.activeStateEnabled;
      var selector = this._activeStateUnit;
      var namespace = 'UIFeedback';
      var $el = this._eventBindingTarget();
      _short.active.off($el, {
        namespace: namespace,
        selector: selector
      });
      if (activeStateEnabled) {
        _short.active.on($el, new _action.default(function (_ref3) {
          var event = _ref3.event,
              element = _ref3.element;
          return _this7._toggleActiveState((0, _renderer.default)(element), true, event);
        }), new _action.default(function (_ref4) {
          var event = _ref4.event,
              element = _ref4.element;
          return _this7._toggleActiveState((0, _renderer.default)(element), false, event);
        }, {
          excludeValidators: ['disabled', 'readOnly']
        }), {
          showTimeout: this._feedbackShowTimeout,
          hideTimeout: this._feedbackHideTimeout,
          selector: selector,
          namespace: namespace
        });
      }
    },
    _detachFocusEvents: function _detachFocusEvents() {
      var $el = this._focusEventTarget();
      _short.focus.off($el, {
        namespace: "".concat(this.NAME, "Focus")
      });
    },
    _attachFocusEvents: function _attachFocusEvents() {
      var _this8 = this;
      var $el = this._focusEventTarget();
      _short.focus.on($el, function (e) {
        return _this8._focusInHandler(e);
      }, function (e) {
        return _this8._focusOutHandler(e);
      }, {
        namespace: "".concat(this.NAME, "Focus"),
        isFocusable: function isFocusable(index, el) {
          return (0, _renderer.default)(el).is(_selectors.focusable);
        }
      });
    },
    _hoverStartHandler: _common.noop,
    _hoverEndHandler: _common.noop,
    _toggleActiveState: function _toggleActiveState($element, value) {
      this.option('isActive', value);
      $element.toggleClass('dx-state-active', value);
    },
    _updatedHover: function _updatedHover() {
      var hoveredElement = this._options.silent('hoveredElement');
      this._hover(hoveredElement, hoveredElement);
    },
    _findHoverTarget: function _findHoverTarget($el) {
      return $el && $el.closest(this._activeStateUnit || this._eventBindingTarget());
    },
    _hover: function _hover($el, $previous) {
      var _this$option10 = this.option(),
          hoverStateEnabled = _this$option10.hoverStateEnabled,
          disabled = _this$option10.disabled,
          isActive = _this$option10.isActive;
      $previous = this._findHoverTarget($previous);
      $previous && $previous.toggleClass('dx-state-hover', false);
      if ($el && hoverStateEnabled && !disabled && !isActive) {
        var newHoveredElement = this._findHoverTarget($el);
        newHoveredElement && newHoveredElement.toggleClass('dx-state-hover', true);
      }
    },
    _toggleDisabledState: function _toggleDisabledState(value) {
      this.$element().toggleClass('dx-state-disabled', Boolean(value));
      this.setAria('disabled', value || undefined);
    },
    _toggleIndependentState: function _toggleIndependentState() {
      this.$element().toggleClass('dx-state-independent', this.option('ignoreParentReadOnly'));
    },
    _setWidgetOption: function _setWidgetOption(widgetName, args) {
      var _this9 = this;
      if (!this[widgetName]) {
        return;
      }
      if ((0, _type.isPlainObject)(args[0])) {
        (0, _iterator.each)(args[0], function (option, value) {
          return _this9._setWidgetOption(widgetName, [option, value]);
        });
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
    _optionChanged: function _optionChanged(args) {
      var name = args.name,
          value = args.value,
          previousValue = args.previousValue;
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
    _isVisible: function _isVisible() {
      var _this$option11 = this.option(),
          visible = _this$option11.visible;
      return this.callBase() && visible;
    },
    beginUpdate: function beginUpdate() {
      this._ready(false);
      this.callBase();
    },
    endUpdate: function endUpdate() {
      this.callBase();
      if (this._initialized) {
        this._ready(true);
      }
    },
    _ready: function _ready(value) {
      if (arguments.length === 0) {
        return this._isReady;
      }
      this._isReady = value;
    },
    setAria: function setAria() {
      if (!(0, _type.isPlainObject)(arguments.length <= 0 ? undefined : arguments[0])) {
        setAttribute(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], (arguments.length <= 2 ? undefined : arguments[2]) || this._getAriaTarget());
      } else {
        var target = (arguments.length <= 1 ? undefined : arguments[1]) || this._getAriaTarget();
        (0, _iterator.each)(arguments.length <= 0 ? undefined : arguments[0], function (name, value) {
          return setAttribute(name, value, target);
        });
      }
    },
    isReady: function isReady() {
      return this._ready();
    },
    repaint: function repaint() {
      this._refresh();
    },
    focus: function focus() {
      _short.focus.trigger(this._focusTarget());
    },
    registerKeyHandler: function registerKeyHandler(key, handler) {
      var currentKeys = this._supportedKeys();
      this._supportedKeys = function () {
        return (0, _extend2.extend)(currentKeys, _defineProperty({}, key, handler));
      };
    }
  });
  Widget.getOptionsFromContainer = function (_ref5) {
    var name = _ref5.name,
        fullName = _ref5.fullName,
        value = _ref5.value;
    var options = {};
    if (name === fullName) {
      options = value;
    } else {
      var option = fullName.split('.').pop();
      options[option] = value;
    }
    return options;
  };
  var _default = Widget;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/action","../../core/dom_component","../../events/short","../../core/utils/common","../../core/utils/iterator","../../core/utils/extend","./selectors","../../core/utils/type","../../core/devices","../../core/utils/version","../../events/click","../../events/core/emitter.feedback","../../events/hover"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/action"), require("../../core/dom_component"), require("../../events/short"), require("../../core/utils/common"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("./selectors"), require("../../core/utils/type"), require("../../core/devices"), require("../../core/utils/version"), require("../../events/click"), require("../../events/core/emitter.feedback"), require("../../events/hover"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.widget.js.map