!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/events/gesture/emitter.gesture.scroll.js"], ["../../events/core/events_engine","../../core/class","../../events/utils/index","../../events/gesture/emitter.gesture","../../events/core/emitter_registrator","../../animation/frame","../../core/devices"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/events/gesture/emitter.gesture.scroll.js", ["../../events/core/events_engine", "../../core/class", "../../events/utils/index", "../../events/gesture/emitter.gesture", "../../events/core/emitter_registrator", "../../animation/frame", "../../core/devices"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _index = $__require("../../events/utils/index");
  var _emitter = _interopRequireDefault($__require("../../events/gesture/emitter.gesture"));
  var _emitter_registrator = _interopRequireDefault($__require("../../events/core/emitter_registrator"));
  var _frame = $__require("../../animation/frame");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var abstract = _class.default.abstract;
  var realDevice = _devices.default.real();
  var SCROLL_EVENT = 'scroll';
  var SCROLL_INIT_EVENT = 'dxscrollinit';
  var SCROLL_START_EVENT = 'dxscrollstart';
  var SCROLL_MOVE_EVENT = 'dxscroll';
  var SCROLL_END_EVENT = 'dxscrollend';
  var SCROLL_STOP_EVENT = 'dxscrollstop';
  var SCROLL_CANCEL_EVENT = 'dxscrollcancel';
  var Locker = _class.default.inherit(function () {
    var NAMESPACED_SCROLL_EVENT = (0, _index.addNamespace)(SCROLL_EVENT, 'dxScrollEmitter');
    return {
      ctor: function ctor(element) {
        var _this = this;
        this._element = element;
        this._locked = false;
        this._proxiedScroll = function (e) {
          if (!_this._disposed) {
            _this._scroll(e);
          }
        };
        _events_engine.default.on(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll);
      },
      _scroll: abstract,
      check: function check(e, callback) {
        if (this._locked) {
          callback();
        }
      },
      dispose: function dispose() {
        this._disposed = true;
        _events_engine.default.off(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll);
      }
    };
  }());
  var TimeoutLocker = Locker.inherit(function () {
    return {
      ctor: function ctor(element, timeout) {
        this.callBase(element);
        this._timeout = timeout;
      },
      _scroll: function _scroll() {
        this._prepare();
        this._forget();
      },
      _prepare: function _prepare() {
        if (this._timer) {
          this._clearTimer();
        }
        this._locked = true;
      },
      _clearTimer: function _clearTimer() {
        clearTimeout(this._timer);
        this._locked = false;
        this._timer = null;
      },
      _forget: function _forget() {
        var that = this;
        this._timer = setTimeout(function () {
          that._clearTimer();
        }, this._timeout);
      },
      dispose: function dispose() {
        this.callBase();
        this._clearTimer();
      }
    };
  }());
  var WheelLocker = TimeoutLocker.inherit(function () {
    var WHEEL_UNLOCK_TIMEOUT = 400;
    return {
      ctor: function ctor(element) {
        this.callBase(element, WHEEL_UNLOCK_TIMEOUT);
        this._lastWheelDirection = null;
      },
      check: function check(e, callback) {
        this._checkDirectionChanged(e);
        this.callBase(e, callback);
      },
      _checkDirectionChanged: function _checkDirectionChanged(e) {
        if (!(0, _index.isDxMouseWheelEvent)(e)) {
          this._lastWheelDirection = null;
          return;
        }
        var direction = e.shiftKey || false;
        var directionChange = this._lastWheelDirection !== null && direction !== this._lastWheelDirection;
        this._lastWheelDirection = direction;
        this._locked = this._locked && !directionChange;
      }
    };
  }());
  var PointerLocker = TimeoutLocker.inherit(function () {
    var POINTER_UNLOCK_TIMEOUT = 400;
    return {
      ctor: function ctor(element) {
        this.callBase(element, POINTER_UNLOCK_TIMEOUT);
      }
    };
  }());
  (function () {
    var isIos = realDevice.ios,
        isAndroid = realDevice.android;
    if (!(isIos || isAndroid)) {
      return;
    }
    PointerLocker = Locker.inherit(function () {
      return {
        _scroll: function _scroll() {
          this._locked = true;
          var that = this;
          (0, _frame.cancelAnimationFrame)(this._scrollFrame);
          this._scrollFrame = (0, _frame.requestAnimationFrame)(function () {
            that._locked = false;
          });
        },
        check: function check(e, callback) {
          (0, _frame.cancelAnimationFrame)(this._scrollFrame);
          (0, _frame.cancelAnimationFrame)(this._checkFrame);
          var that = this;
          var callBase = this.callBase;
          this._checkFrame = (0, _frame.requestAnimationFrame)(function () {
            callBase.call(that, e, callback);
            that._locked = false;
          });
        },
        dispose: function dispose() {
          this.callBase();
          (0, _frame.cancelAnimationFrame)(this._scrollFrame);
          (0, _frame.cancelAnimationFrame)(this._checkFrame);
        }
      };
    }());
  })();
  var ScrollEmitter = _emitter.default.inherit(function () {
    var INERTIA_TIMEOUT = 100;
    var VELOCITY_CALC_TIMEOUT = 200;
    var FRAME_DURATION = Math.round(1000 / 60);
    return {
      ctor: function ctor(element) {
        this.callBase.apply(this, arguments);
        this.direction = 'both';
        this._pointerLocker = new PointerLocker(element);
        this._wheelLocker = new WheelLocker(element);
      },
      validate: function validate() {
        return true;
      },
      configure: function configure(data) {
        if (data.scrollTarget) {
          this._pointerLocker.dispose();
          this._wheelLocker.dispose();
          this._pointerLocker = new PointerLocker(data.scrollTarget);
          this._wheelLocker = new WheelLocker(data.scrollTarget);
        }
        this.callBase(data);
      },
      _init: function _init(e) {
        this._wheelLocker.check(e, function () {
          if ((0, _index.isDxMouseWheelEvent)(e)) {
            this._accept(e);
          }
        }.bind(this));
        this._pointerLocker.check(e, function () {
          var skipCheck = this.isNative && (0, _index.isMouseEvent)(e);
          if (!(0, _index.isDxMouseWheelEvent)(e) && !skipCheck) {
            this._accept(e);
          }
        }.bind(this));
        this._fireEvent(SCROLL_INIT_EVENT, e);
        this._prevEventData = (0, _index.eventData)(e);
      },
      move: function move(e) {
        this.callBase.apply(this, arguments);
        e.isScrollingEvent = this.isNative || e.isScrollingEvent;
      },
      _start: function _start(e) {
        this._savedEventData = (0, _index.eventData)(e);
        this._fireEvent(SCROLL_START_EVENT, e);
        this._prevEventData = (0, _index.eventData)(e);
      },
      _move: function _move(e) {
        var currentEventData = (0, _index.eventData)(e);
        this._fireEvent(SCROLL_MOVE_EVENT, e, {
          delta: (0, _index.eventDelta)(this._prevEventData, currentEventData)
        });
        var delta = (0, _index.eventDelta)(this._savedEventData, currentEventData);
        if (delta.time > VELOCITY_CALC_TIMEOUT) {
          this._savedEventData = this._prevEventData;
        }
        this._prevEventData = (0, _index.eventData)(e);
      },
      _end: function _end(e) {
        var endEventDelta = (0, _index.eventDelta)(this._prevEventData, (0, _index.eventData)(e));
        var velocity = {
          x: 0,
          y: 0
        };
        if (!(0, _index.isDxMouseWheelEvent)(e) && endEventDelta.time < INERTIA_TIMEOUT) {
          var delta = (0, _index.eventDelta)(this._savedEventData, this._prevEventData);
          var velocityMultiplier = FRAME_DURATION / delta.time;
          velocity = {
            x: delta.x * velocityMultiplier,
            y: delta.y * velocityMultiplier
          };
        }
        this._fireEvent(SCROLL_END_EVENT, e, {
          velocity: velocity
        });
      },
      _stop: function _stop(e) {
        this._fireEvent(SCROLL_STOP_EVENT, e);
      },
      cancel: function cancel(e) {
        this.callBase.apply(this, arguments);
        this._fireEvent(SCROLL_CANCEL_EVENT, e);
      },
      dispose: function dispose() {
        this.callBase.apply(this, arguments);
        this._pointerLocker.dispose();
        this._wheelLocker.dispose();
      },
      _clearSelection: function _clearSelection() {
        if (this.isNative) {
          return;
        }
        return this.callBase.apply(this, arguments);
      },
      _toggleGestureCover: function _toggleGestureCover() {
        if (this.isNative) {
          return;
        }
        return this.callBase.apply(this, arguments);
      }
    };
  }());
  (0, _emitter_registrator.default)({
    emitter: ScrollEmitter,
    events: [SCROLL_INIT_EVENT, SCROLL_START_EVENT, SCROLL_MOVE_EVENT, SCROLL_END_EVENT, SCROLL_STOP_EVENT, SCROLL_CANCEL_EVENT]
  });
  var _default = {
    init: SCROLL_INIT_EVENT,
    start: SCROLL_START_EVENT,
    move: SCROLL_MOVE_EVENT,
    end: SCROLL_END_EVENT,
    stop: SCROLL_STOP_EVENT,
    cancel: SCROLL_CANCEL_EVENT,
    scroll: SCROLL_EVENT
  };
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../events/core/events_engine","../../core/class","../../events/utils/index","../../events/gesture/emitter.gesture","../../events/core/emitter_registrator","../../animation/frame","../../core/devices"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../events/core/events_engine"), require("../../core/class"), require("../../events/utils/index"), require("../../events/gesture/emitter.gesture"), require("../../events/core/emitter_registrator"), require("../../animation/frame"), require("../../core/devices"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=emitter.gesture.scroll.js.map