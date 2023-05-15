!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/slider/ui.slider.js"], ["../../core/utils/size","../../core/component_registrator","../../core/devices","../../core/renderer","../../core/utils/common","../../core/utils/deferred","../../core/utils/extend","../../events/click","../../events/core/emitter.feedback","../../events/core/events_engine","../../events/gesture/swipeable","../../events/pointer","../../events/utils/index","../../localization/number","../themes","../track_bar","../widget/utils.ink_ripple","./ui.slider_handle","../../core/utils/math"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/slider/ui.slider.js", ["../../core/utils/size", "../../core/component_registrator", "../../core/devices", "../../core/renderer", "../../core/utils/common", "../../core/utils/deferred", "../../core/utils/extend", "../../events/click", "../../events/core/emitter.feedback", "../../events/core/events_engine", "../../events/gesture/swipeable", "../../events/pointer", "../../events/utils/index", "../../localization/number", "../themes", "../track_bar", "../widget/utils.ink_ripple", "./ui.slider_handle", "../../core/utils/math"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _common = $__require("../../core/utils/common");
  var _deferred = $__require("../../core/utils/deferred");
  var _extend = $__require("../../core/utils/extend");
  var _click = $__require("../../events/click");
  var _emitter = $__require("../../events/core/emitter.feedback");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _swipeable = _interopRequireDefault($__require("../../events/gesture/swipeable"));
  var _pointer = _interopRequireDefault($__require("../../events/pointer"));
  var _index = $__require("../../events/utils/index");
  var _number = _interopRequireDefault($__require("../../localization/number"));
  var _themes = $__require("../themes");
  var _track_bar = _interopRequireDefault($__require("../track_bar"));
  var _utils = $__require("../widget/utils.ink_ripple");
  var _ui = _interopRequireDefault($__require("./ui.slider_handle"));
  var _math = $__require("../../core/utils/math");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE slider

  var SLIDER_CLASS = 'dx-slider';
  var SLIDER_WRAPPER_CLASS = 'dx-slider-wrapper';
  var SLIDER_HANDLE_SELECTOR = '.dx-slider-handle';
  var SLIDER_BAR_CLASS = 'dx-slider-bar';
  var SLIDER_RANGE_CLASS = 'dx-slider-range';
  var SLIDER_RANGE_VISIBLE_CLASS = 'dx-slider-range-visible';
  var SLIDER_LABEL_CLASS = 'dx-slider-label';
  var SLIDER_LABEL_POSITION_CLASS_PREFIX = 'dx-slider-label-position-';
  var SLIDER_TOOLTIP_POSITION_CLASS_PREFIX = 'dx-slider-tooltip-position-';
  var INVALID_MESSAGE_VISIBLE_CLASS = 'dx-invalid-message-visible';
  var SLIDER_VALIDATION_NAMESPACE = 'Validation';
  var Slider = _track_bar.default.inherit({
    _activeStateUnit: SLIDER_HANDLE_SELECTOR,
    _supportedKeys: function _supportedKeys() {
      var _this = this;
      var isRTL = this.option('rtlEnabled');
      var roundedValue = function roundedValue(offset, isLeftDirection) {
        offset = _this._valueStep(offset);
        var step = _this.option('step');
        var value = _this.option('value');
        var currentPosition = value - _this.option('min');
        var remainder = (0, _math.getRemainderByDivision)(currentPosition, step, _this._getValueExponentLength());
        var result = isLeftDirection ? value - offset + (remainder ? step - remainder : 0) : value + offset - remainder;
        var min = _this.option('min');
        var max = _this.option('max');
        if (result < min) {
          result = min;
        } else if (result > max) {
          result = max;
        }
        return _this._roundToExponentLength(result);
      };
      var moveHandleRight = function moveHandleRight(offset) {
        _this.option('value', roundedValue(offset, isRTL));
      };
      var moveHandleLeft = function moveHandleLeft(offset) {
        _this.option('value', roundedValue(offset, !isRTL));
      };
      return (0, _extend.extend)(this.callBase(), {
        leftArrow: function leftArrow(e) {
          this._processKeyboardEvent(e);
          moveHandleLeft(this.option('step'));
        },
        rightArrow: function rightArrow(e) {
          this._processKeyboardEvent(e);
          moveHandleRight(this.option('step'));
        },
        pageUp: function pageUp(e) {
          this._processKeyboardEvent(e);
          moveHandleRight(this.option('step') * this.option('keyStep'));
        },
        pageDown: function pageDown(e) {
          this._processKeyboardEvent(e);
          moveHandleLeft(this.option('step') * this.option('keyStep'));
        },
        home: function home(e) {
          this._processKeyboardEvent(e);
          var min = this.option('min');
          this.option('value', min);
        },
        end: function end(e) {
          this._processKeyboardEvent(e);
          var max = this.option('max');
          this.option('value', max);
        }
      });
    },
    _processKeyboardEvent: function _processKeyboardEvent(e) {
      e.preventDefault();
      e.stopPropagation();
      this._saveValueChangeEvent(e);
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        value: 50,
        hoverStateEnabled: true,
        activeStateEnabled: true,
        step: 1,
        showRange: true,
        tooltip: {
          enabled: false,
          format: function format(value) {
            return value;
          },
          position: 'top',
          showMode: 'onHover'
        },
        label: {
          visible: false,
          position: 'bottom',
          format: function format(value) {
            return value;
          }
        },
        keyStep: 1,
        useInkRipple: false,
        validationMessageOffset: (0, _themes.isMaterial)() ? {
          h: 18,
          v: 0
        } : {
          h: 7,
          v: 4
        },
        focusStateEnabled: true,
        valueChangeMode: 'onHandleMove'
      });
    },
    _toggleValidationMessage: function _toggleValidationMessage(visible) {
      if (!this.option('isValid')) {
        this.$element().toggleClass(INVALID_MESSAGE_VISIBLE_CLASS, visible);
      }
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }, {
        device: function device() {
          var themeName = (0, _themes.current)();
          return (0, _themes.isMaterial)(themeName);
        },
        options: {
          useInkRipple: true
        }
      }]);
    },
    _initMarkup: function _initMarkup() {
      this.$element().addClass(SLIDER_CLASS);
      this._renderSubmitElement();
      this.option('useInkRipple') && this._renderInkRipple();
      this.callBase();
      this._renderLabels();
      this._renderStartHandler();
      this._renderAriaMinAndMax();
    },
    _attachFocusEvents: function _attachFocusEvents() {
      this.callBase();
      var namespace = this.NAME + SLIDER_VALIDATION_NAMESPACE;
      var focusInEvent = (0, _index.addNamespace)('focusin', namespace);
      var focusOutEvent = (0, _index.addNamespace)('focusout', namespace);
      var $focusTarget = this._focusTarget();
      _events_engine.default.on($focusTarget, focusInEvent, this._toggleValidationMessage.bind(this, true));
      _events_engine.default.on($focusTarget, focusOutEvent, this._toggleValidationMessage.bind(this, false));
    },
    _detachFocusEvents: function _detachFocusEvents() {
      this.callBase();
      var $focusTarget = this._focusTarget();
      this._toggleValidationMessage(false);
      _events_engine.default.off($focusTarget, this.NAME + SLIDER_VALIDATION_NAMESPACE);
    },
    _render: function _render() {
      this.callBase();
      this._repaintHandle();
    },
    _renderSubmitElement: function _renderSubmitElement() {
      this._$submitElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this.$element());
    },
    _getSubmitElement: function _getSubmitElement() {
      return this._$submitElement;
    },
    _renderInkRipple: function _renderInkRipple() {
      this._inkRipple = (0, _utils.render)({
        waveSizeCoefficient: 0.7,
        isCentered: true,
        wavesNumber: 2,
        useHoldAnimation: false
      });
    },
    _renderInkWave: function _renderInkWave(element, dxEvent, doRender, waveIndex) {
      if (!this._inkRipple) {
        return;
      }
      var config = {
        element: element,
        event: dxEvent,
        wave: waveIndex
      };
      if (doRender) {
        this._inkRipple.showWave(config);
      } else {
        this._inkRipple.hideWave(config);
      }
    },
    _visibilityChanged: function _visibilityChanged() {
      this.repaint();
    },
    _renderWrapper: function _renderWrapper() {
      this.callBase();
      this._$wrapper.addClass(SLIDER_WRAPPER_CLASS);
      this._createComponent(this._$wrapper, _swipeable.default, {
        elastic: false,
        immediate: true,
        immediateTimeout: 0,
        onStart: this._swipeStartHandler.bind(this),
        onUpdated: this._swipeUpdateHandler.bind(this),
        onEnd: this._swipeEndHandler.bind(this),
        itemSizeFunc: this._itemWidthFunc.bind(this)
      });
    },
    _renderContainer: function _renderContainer() {
      this.callBase();
      this._$bar.addClass(SLIDER_BAR_CLASS);
    },
    _renderRange: function _renderRange() {
      this.callBase();
      this._$range.addClass(SLIDER_RANGE_CLASS);
      this._renderHandle();
      this._renderRangeVisibility();
    },
    _renderRangeVisibility: function _renderRangeVisibility() {
      this._$range.toggleClass(SLIDER_RANGE_VISIBLE_CLASS, Boolean(this.option('showRange')));
    },
    _renderHandle: function _renderHandle() {
      this._$handle = this._renderHandleImpl(this.option('value'), this._$handle);
    },
    _renderHandleImpl: function _renderHandleImpl(value, $element) {
      var $handle = $element || (0, _renderer.default)('<div>').appendTo(this._$range);
      var tooltip = this.option('tooltip');
      this.$element().toggleClass(SLIDER_TOOLTIP_POSITION_CLASS_PREFIX + 'bottom', tooltip.enabled && tooltip.position === 'bottom').toggleClass(SLIDER_TOOLTIP_POSITION_CLASS_PREFIX + 'top', tooltip.enabled && tooltip.position === 'top');
      this._createComponent($handle, _ui.default, {
        value: value,
        tooltip: tooltip
      });
      return $handle;
    },
    _renderAriaMinAndMax: function _renderAriaMinAndMax() {
      this.setAria({
        'valuemin': this.option('min'),
        'valuemax': this.option('max')
      }, this._$handle);
    },
    _toggleActiveState: function _toggleActiveState($element, value) {
      this.callBase($element, value);
      this._renderInkWave($element, null, !!value, 1);
    },
    _toggleFocusClass: function _toggleFocusClass(isFocused, $element) {
      this.callBase(isFocused, $element);
      if (this._disposed) {
        return;
      }
      var $focusTarget = (0, _renderer.default)($element || this._focusTarget());
      this._renderInkWave($focusTarget, null, isFocused, 0);
    },
    _renderLabels: function _renderLabels() {
      this.$element().removeClass(SLIDER_LABEL_POSITION_CLASS_PREFIX + 'bottom').removeClass(SLIDER_LABEL_POSITION_CLASS_PREFIX + 'top');
      if (this.option('label.visible')) {
        var min = this.option('min');
        var max = this.option('max');
        var position = this.option('label.position');
        var labelFormat = this.option('label.format');
        if (!this._$minLabel) {
          this._$minLabel = (0, _renderer.default)('<div>').addClass(SLIDER_LABEL_CLASS).appendTo(this._$wrapper);
        }
        this._$minLabel.text(_number.default.format(min, labelFormat));
        if (!this._$maxLabel) {
          this._$maxLabel = (0, _renderer.default)('<div>').addClass(SLIDER_LABEL_CLASS).appendTo(this._$wrapper);
        }
        this._$maxLabel.text(_number.default.format(max, labelFormat));
        this.$element().addClass(SLIDER_LABEL_POSITION_CLASS_PREFIX + position);
      } else {
        if (this._$minLabel) {
          this._$minLabel.remove();
          delete this._$minLabel;
        }
        if (this._$maxLabel) {
          this._$maxLabel.remove();
          delete this._$maxLabel;
        }
      }
    },
    _renderStartHandler: function _renderStartHandler() {
      var _this2 = this;
      var pointerDownEventName = (0, _index.addNamespace)(_pointer.default.down, this.NAME);
      var clickEventName = (0, _index.addNamespace)(_click.name, this.NAME);
      var startAction = this._createAction(this._startHandler.bind(this));
      var $element = this.$element();
      _events_engine.default.off($element, pointerDownEventName);
      _events_engine.default.on($element, pointerDownEventName, function (e) {
        if ((0, _index.isMouseEvent)(e)) {
          startAction({
            event: e
          });
        }
      });
      _events_engine.default.off($element, clickEventName);
      _events_engine.default.on($element, clickEventName, function (e) {
        var $handle = _this2._activeHandle();
        if ($handle) {
          _events_engine.default.trigger($handle, 'focusin');
          _events_engine.default.trigger($handle, 'focus');
        }
        startAction({
          event: e
        });
        if (_this2.option('valueChangeMode') === 'onHandleRelease') {
          _this2.option('value', _this2._getActualValue());
          _this2._actualValue = undefined;
        }
      });
    },
    _itemWidthFunc: function _itemWidthFunc() {
      return this._itemWidthRatio;
    },
    _swipeStartHandler: function _swipeStartHandler(e) {
      var rtlEnabled = this.option('rtlEnabled');
      if ((0, _index.isTouchEvent)(e.event)) {
        this._createAction(this._startHandler.bind(this))({
          event: e.event
        });
      }
      this._feedbackDeferred = new _deferred.Deferred();
      (0, _emitter.lock)(this._feedbackDeferred);
      this._toggleActiveState(this._activeHandle(), this.option('activeStateEnabled'));
      this._startOffset = this._currentRatio;
      var startOffset = this._startOffset * this._swipePixelRatio();
      var endOffset = (1 - this._startOffset) * this._swipePixelRatio();
      e.event.maxLeftOffset = rtlEnabled ? endOffset : startOffset;
      e.event.maxRightOffset = rtlEnabled ? startOffset : endOffset;
      this._itemWidthRatio = (0, _size.getWidth)(this.$element()) / this._swipePixelRatio();
      this._needPreventAnimation = true;
    },
    _swipeEndHandler: function _swipeEndHandler(e) {
      if (this._isSingleValuePossible()) {
        return;
      }
      this._feedbackDeferred.resolve();
      this._toggleActiveState(this._activeHandle(), false);
      var offsetDirection = this.option('rtlEnabled') ? -1 : 1;
      var ratio = this._startOffset + offsetDirection * e.event.targetOffset / this._swipePixelRatio();
      delete this._needPreventAnimation;
      this._saveValueChangeEvent(e.event);
      this._changeValueOnSwipe(ratio);
      if (this.option('valueChangeMode') === 'onHandleRelease') {
        this.option('value', this._getActualValue());
      }
      this._actualValue = undefined;
      delete this._startOffset;
      this._renderValue();
    },
    _activeHandle: function _activeHandle() {
      return this._$handle;
    },
    _swipeUpdateHandler: function _swipeUpdateHandler(e) {
      if (this._isSingleValuePossible()) {
        return;
      }
      this._saveValueChangeEvent(e.event);
      this._updateHandlePosition(e);
    },
    _updateHandlePosition: function _updateHandlePosition(e) {
      var offsetDirection = this.option('rtlEnabled') ? -1 : 1;
      var newRatio = Math.min(this._startOffset + offsetDirection * e.event.offset / this._swipePixelRatio(), 1);
      (0, _size.setWidth)(this._$range, newRatio * 100 + '%');
      _ui.default.getInstance(this._activeHandle())['fitTooltipPosition'];
      this._changeValueOnSwipe(newRatio);
    },
    _swipePixelRatio: function _swipePixelRatio() {
      var min = this.option('min');
      var max = this.option('max');
      var step = this._valueStep(this.option('step'));
      return (max - min) / step;
    },
    _valueStep: function _valueStep(step) {
      if (!step || isNaN(step)) {
        step = 1;
      }
      return step;
    },
    _getValueExponentLength: function _getValueExponentLength() {
      var _this$option = this.option(),
          step = _this$option.step,
          min = _this$option.min;
      return Math.max((0, _math.getExponentLength)(step), (0, _math.getExponentLength)(min));
    },
    _roundToExponentLength: function _roundToExponentLength(value) {
      var valueExponentLength = this._getValueExponentLength();
      return (0, _math.roundFloatPart)(value, valueExponentLength);
    },
    _changeValueOnSwipe: function _changeValueOnSwipe(ratio) {
      var min = this.option('min');
      var max = this.option('max');
      var step = this._valueStep(this.option('step'));
      var newChange = ratio * (max - min);
      var newValue = min + newChange;
      if (step < 0) {
        return;
      }
      if (newValue === max || newValue === min) {
        this._setValueOnSwipe(newValue);
      } else {
        var stepCount = Math.round((newValue - min) / step);
        newValue = this._roundToExponentLength(stepCount * step + min);
        this._setValueOnSwipe(Math.max(Math.min(newValue, max), min));
      }
    },
    _setValueOnSwipe: function _setValueOnSwipe(value) {
      this._actualValue = value;
      if (this.option('valueChangeMode') === 'onHandleRelease') {
        _ui.default.getInstance(this._activeHandle()).option('value', value);
      } else {
        this.option('value', value);
        this._saveValueChangeEvent(undefined);
      }
    },
    _getActualValue: function _getActualValue() {
      var _this$_actualValue;
      return (_this$_actualValue = this._actualValue) !== null && _this$_actualValue !== void 0 ? _this$_actualValue : this.option('value');
    },
    _isSingleValuePossible: function _isSingleValuePossible() {
      var _this$option2 = this.option(),
          min = _this$option2.min,
          max = _this$option2.max;
      return min === max;
    },
    _startHandler: function _startHandler(args) {
      if (this._isSingleValuePossible()) {
        return;
      }
      var e = args.event;
      this._currentRatio = ((0, _index.eventData)(e).x - this._$bar.offset().left) / (0, _size.getWidth)(this._$bar);
      if (this.option('rtlEnabled')) {
        this._currentRatio = 1 - this._currentRatio;
      }
      this._saveValueChangeEvent(e);
      this._changeValueOnSwipe(this._currentRatio);
    },
    _renderValue: function _renderValue() {
      this.callBase();
      var value = this._getActualValue();
      this._getSubmitElement().val((0, _common.applyServerDecimalSeparator)(value));
      _ui.default.getInstance(this._activeHandle()).option('value', value);
    },
    _setRangeStyles: function _setRangeStyles(options) {
      options && this._$range.css(options);
    },
    _callHandlerMethod: function _callHandlerMethod(name, args) {
      _ui.default.getInstance(this._$handle)[name](args);
    },
    _repaintHandle: function _repaintHandle() {
      this._callHandlerMethod('repaint');
    },
    _fitTooltip: function _fitTooltip() {
      this._callHandlerMethod('updateTooltipPosition');
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'visible':
          this.callBase(args);
          this._renderHandle();
          this._repaintHandle();
          break;
        case 'min':
        case 'max':
          this._renderValue();
          this.callBase(args);
          this._renderLabels();
          this._renderAriaMinAndMax();
          this._fitTooltip();
          break;
        case 'step':
          this._renderValue();
          break;
        case 'keyStep':
          break;
        case 'showRange':
          this._renderRangeVisibility();
          break;
        case 'tooltip':
          this._renderHandle();
          break;
        case 'label':
          this._renderLabels();
          break;
        case 'useInkRipple':
          this._invalidate();
          break;
        case 'valueChangeMode':
          break;
        default:
          this.callBase(args);
      }
    },
    _refresh: function _refresh() {
      this._toggleRTLDirection(this.option('rtlEnabled'));
      this._renderDimensions();
      this._renderValue();
      this._renderHandle();
      this._repaintHandle();
    },
    _clean: function _clean() {
      delete this._inkRipple;
      delete this._actualValue;
      this.callBase();
    }
  });
  (0, _component_registrator.default)('dxSlider', Slider);
  var _default = Slider;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/component_registrator","../../core/devices","../../core/renderer","../../core/utils/common","../../core/utils/deferred","../../core/utils/extend","../../events/click","../../events/core/emitter.feedback","../../events/core/events_engine","../../events/gesture/swipeable","../../events/pointer","../../events/utils/index","../../localization/number","../themes","../track_bar","../widget/utils.ink_ripple","./ui.slider_handle","../../core/utils/math"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/component_registrator"), require("../../core/devices"), require("../../core/renderer"), require("../../core/utils/common"), require("../../core/utils/deferred"), require("../../core/utils/extend"), require("../../events/click"), require("../../events/core/emitter.feedback"), require("../../events/core/events_engine"), require("../../events/gesture/swipeable"), require("../../events/pointer"), require("../../events/utils/index"), require("../../localization/number"), require("../themes"), require("../track_bar"), require("../widget/utils.ink_ripple"), require("./ui.slider_handle"), require("../../core/utils/math"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.slider.js.map