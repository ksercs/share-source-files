!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/switch.js"], ["../core/utils/size","../core/renderer","../events/core/events_engine","../core/devices","../core/utils/extend","../core/component_registrator","./editor/editor","../events/utils/index","../events/core/emitter.feedback","../core/utils/position","../animation/fx","../localization/message","../events/click","../events/gesture/swipeable","../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/switch.js", ["../core/utils/size", "../core/renderer", "../events/core/events_engine", "../core/devices", "../core/utils/extend", "../core/component_registrator", "./editor/editor", "../events/utils/index", "../events/core/emitter.feedback", "../core/utils/position", "../animation/fx", "../localization/message", "../events/click", "../events/gesture/swipeable", "../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _devices = _interopRequireDefault($__require("../core/devices"));
  var _extend = $__require("../core/utils/extend");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _editor = _interopRequireDefault($__require("./editor/editor"));
  var _index = $__require("../events/utils/index");
  var _emitter = $__require("../events/core/emitter.feedback");
  var _position = $__require("../core/utils/position");
  var _fx = _interopRequireDefault($__require("../animation/fx"));
  var _message = _interopRequireDefault($__require("../localization/message"));
  var _click = $__require("../events/click");
  var _swipeable = _interopRequireDefault($__require("../events/gesture/swipeable"));
  var _deferred = $__require("../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE switch

  var SWITCH_CLASS = 'dx-switch';
  var SWITCH_WRAPPER_CLASS = SWITCH_CLASS + '-wrapper';
  var SWITCH_CONTAINER_CLASS = SWITCH_CLASS + '-container';
  var SWITCH_INNER_CLASS = SWITCH_CLASS + '-inner';
  var SWITCH_HANDLE_CLASS = SWITCH_CLASS + '-handle';
  var SWITCH_ON_VALUE_CLASS = SWITCH_CLASS + '-on-value';
  var SWITCH_ON_CLASS = SWITCH_CLASS + '-on';
  var SWITCH_OFF_CLASS = SWITCH_CLASS + '-off';
  var SWITCH_ANIMATION_DURATION = 100;
  var Switch = _editor.default.inherit({
    _supportedKeys: function _supportedKeys() {
      var isRTL = this.option('rtlEnabled');
      var click = function click(e) {
        e.preventDefault();
        this._clickAction({
          event: e
        });
      };
      var move = function move(value, e) {
        e.preventDefault();
        e.stopPropagation();
        this._saveValueChangeEvent(e);
        this._animateValue(value);
      };
      return (0, _extend.extend)(this.callBase(), {
        space: click,
        enter: click,
        leftArrow: move.bind(this, isRTL ? true : false),
        rightArrow: move.bind(this, isRTL ? false : true)
      });
    },
    _useTemplates: function _useTemplates() {
      return false;
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        hoverStateEnabled: true,
        activeStateEnabled: true,
        switchedOnText: _message.default.format('dxSwitch-switchedOnText'),
        switchedOffText: _message.default.format('dxSwitch-switchedOffText'),
        value: false
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }]);
    },
    _feedbackHideTimeout: 0,
    _animating: false,
    _initMarkup: function _initMarkup() {
      this._renderContainers();
      this.$element().addClass(SWITCH_CLASS).append(this._$switchWrapper);
      this._renderSubmitElement();
      this._renderClick();
      this.setAria('role', 'button');
      this._renderSwipeable();
      this.callBase();
      this._renderSwitchInner();
      this._renderLabels();
      this._renderValue();
    },
    _getInnerOffset: function _getInnerOffset(value, offset) {
      var ratio = (offset - this._offsetDirection() * Number(!value)) / 2;
      return 100 * ratio + '%';
    },
    _getHandleOffset: function _getHandleOffset(value, offset) {
      if (this.option('rtlEnabled')) {
        value = !value;
      }
      if (value) {
        var calcValue = -100 + 100 * -offset;
        return calcValue + '%';
      } else {
        return 100 * -offset + '%';
      }
    },
    _renderSwitchInner: function _renderSwitchInner() {
      this._$switchInner = (0, _renderer.default)('<div>').addClass(SWITCH_INNER_CLASS).appendTo(this._$switchContainer);
      this._$handle = (0, _renderer.default)('<div>').addClass(SWITCH_HANDLE_CLASS).appendTo(this._$switchInner);
    },
    _renderLabels: function _renderLabels() {
      this._$labelOn = (0, _renderer.default)('<div>').addClass(SWITCH_ON_CLASS).prependTo(this._$switchInner);
      this._$labelOff = (0, _renderer.default)('<div>').addClass(SWITCH_OFF_CLASS).appendTo(this._$switchInner);
      this._setLabelsText();
    },
    _renderContainers: function _renderContainers() {
      this._$switchContainer = (0, _renderer.default)('<div>').addClass(SWITCH_CONTAINER_CLASS);
      this._$switchWrapper = (0, _renderer.default)('<div>').addClass(SWITCH_WRAPPER_CLASS).append(this._$switchContainer);
    },
    _renderSwipeable: function _renderSwipeable() {
      this._createComponent(this.$element(), _swipeable.default, {
        elastic: false,
        immediate: true,
        onStart: this._swipeStartHandler.bind(this),
        onUpdated: this._swipeUpdateHandler.bind(this),
        onEnd: this._swipeEndHandler.bind(this),
        itemSizeFunc: this._getItemSizeFunc.bind(this)
      });
    },
    _getItemSizeFunc: function _getItemSizeFunc() {
      return (0, _size.getOuterWidth)(this._$switchContainer, true) - (0, _position.getBoundingRect)(this._$handle.get(0)).width;
    },
    _renderSubmitElement: function _renderSubmitElement() {
      this._$submitElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this.$element());
    },
    _getSubmitElement: function _getSubmitElement() {
      return this._$submitElement;
    },
    _offsetDirection: function _offsetDirection() {
      return this.option('rtlEnabled') ? -1 : 1;
    },
    _renderPosition: function _renderPosition(state, swipeOffset) {
      var innerOffset = this._getInnerOffset(state, swipeOffset);
      var handleOffset = this._getHandleOffset(state, swipeOffset);
      this._$switchInner.css('transform', ' translateX(' + innerOffset + ')');
      this._$handle.css('transform', ' translateX(' + handleOffset + ')');
    },
    _validateValue: function _validateValue() {
      var check = this.option('value');
      if (typeof check !== 'boolean') {
        this._options.silent('value', !!check);
      }
    },
    _renderClick: function _renderClick() {
      var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
      var $element = this.$element();
      this._clickAction = this._createAction(this._clickHandler.bind(this));
      _events_engine.default.off($element, eventName);
      _events_engine.default.on($element, eventName, function (e) {
        this._clickAction({
          event: e
        });
      }.bind(this));
    },
    _clickHandler: function _clickHandler(args) {
      var e = args.event;
      this._saveValueChangeEvent(e);
      if (this._animating || this._swiping) {
        return;
      }
      this._animateValue(!this.option('value'));
    },
    _animateValue: function _animateValue(value) {
      var startValue = this.option('value');
      var endValue = value;
      if (startValue === endValue) {
        return;
      }
      this._animating = true;
      var fromInnerOffset = this._getInnerOffset(startValue, 0);
      var toInnerOffset = this._getInnerOffset(endValue, 0);
      var fromHandleOffset = this._getHandleOffset(startValue, 0);
      var toHandleOffset = this._getHandleOffset(endValue, 0);
      var that = this;
      var fromInnerConfig = {};
      var toInnerConfig = {};
      var fromHandleConfig = {};
      var toHandlerConfig = {};
      fromInnerConfig['transform'] = ' translateX(' + fromInnerOffset + ')';
      toInnerConfig['transform'] = ' translateX(' + toInnerOffset + ')';
      fromHandleConfig['transform'] = ' translateX(' + fromHandleOffset + ')';
      toHandlerConfig['transform'] = ' translateX(' + toHandleOffset + ')';
      this.$element().toggleClass(SWITCH_ON_VALUE_CLASS, endValue);
      _fx.default.animate(this._$handle, {
        from: fromHandleConfig,
        to: toHandlerConfig,
        duration: SWITCH_ANIMATION_DURATION
      });
      _fx.default.animate(this._$switchInner, {
        from: fromInnerConfig,
        to: toInnerConfig,
        duration: SWITCH_ANIMATION_DURATION,
        complete: function complete() {
          that._animating = false;
          that.option('value', endValue);
        }
      });
    },
    _swipeStartHandler: function _swipeStartHandler(e) {
      var state = this.option('value');
      var rtlEnabled = this.option('rtlEnabled');
      var maxOffOffset = rtlEnabled ? 0 : 1;
      var maxOnOffset = rtlEnabled ? 1 : 0;
      e.event.maxLeftOffset = state ? maxOffOffset : maxOnOffset;
      e.event.maxRightOffset = state ? maxOnOffset : maxOffOffset;
      this._swiping = true;
      this._feedbackDeferred = new _deferred.Deferred();
      (0, _emitter.lock)(this._feedbackDeferred);
      this._toggleActiveState(this.$element(), this.option('activeStateEnabled'));
    },
    _swipeUpdateHandler: function _swipeUpdateHandler(e) {
      this._renderPosition(this.option('value'), e.event.offset);
    },
    _swipeEndHandler: function _swipeEndHandler(e) {
      var that = this;
      var offsetDirection = this._offsetDirection();
      var toInnerConfig = {};
      var toHandleConfig = {};
      var innerOffset = this._getInnerOffset(that.option('value'), e.event.targetOffset);
      var handleOffset = this._getHandleOffset(that.option('value'), e.event.targetOffset);
      toInnerConfig['transform'] = ' translateX(' + innerOffset + ')';
      toHandleConfig['transform'] = ' translateX(' + handleOffset + ')';
      _fx.default.animate(this._$handle, {
        to: toHandleConfig,
        duration: SWITCH_ANIMATION_DURATION
      });
      _fx.default.animate(this._$switchInner, {
        to: toInnerConfig,
        duration: SWITCH_ANIMATION_DURATION,
        complete: function complete() {
          that._swiping = false;
          var pos = that.option('value') + offsetDirection * e.event.targetOffset;
          that._saveValueChangeEvent(e.event);
          that.option('value', Boolean(pos));
          that._feedbackDeferred.resolve();
          that._toggleActiveState(that.$element(), false);
        }
      });
    },
    _renderValue: function _renderValue() {
      this._validateValue();
      var val = this.option('value');
      this._renderPosition(val, 0);
      this.$element().toggleClass(SWITCH_ON_VALUE_CLASS, val);
      this._getSubmitElement().val(val);
      this.setAria({
        'pressed': val,
        'label': val ? this.option('switchedOnText') : this.option('switchedOffText')
      });
    },
    _setLabelsText: function _setLabelsText() {
      this._$labelOn && this._$labelOn.text(this.option('switchedOnText'));
      this._$labelOff && this._$labelOff.text(this.option('switchedOffText'));
    },
    _visibilityChanged: function _visibilityChanged(visible) {
      if (visible) {
        this.repaint();
      }
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'width':
          delete this._marginBound;
          this._refresh();
          break;
        case 'switchedOnText':
        case 'switchedOffText':
          this._setLabelsText();
          break;
        case 'value':
          this._renderValue();
          this.callBase(args);
          break;
        default:
          this.callBase(args);
      }
    }
  });
  (0, _component_registrator.default)('dxSwitch', Switch);
  var _default = Switch;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../events/core/events_engine","../core/devices","../core/utils/extend","../core/component_registrator","./editor/editor","../events/utils/index","../events/core/emitter.feedback","../core/utils/position","../animation/fx","../localization/message","../events/click","../events/gesture/swipeable","../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../events/core/events_engine"), require("../core/devices"), require("../core/utils/extend"), require("../core/component_registrator"), require("./editor/editor"), require("../events/utils/index"), require("../events/core/emitter.feedback"), require("../core/utils/position"), require("../animation/fx"), require("../localization/message"), require("../events/click"), require("../events/gesture/swipeable"), require("../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=switch.js.map