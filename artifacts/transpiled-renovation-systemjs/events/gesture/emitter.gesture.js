!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/events/gesture/emitter.gesture.js"], ["../../core/renderer","../../events/core/events_engine","../../core/devices","../../core/utils/style","../../core/utils/call_once","../../core/utils/dom","../../core/utils/ready_callbacks","../../core/utils/math","../../core/utils/common","../../core/utils/type","../utils/index","../core/emitter"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/events/gesture/emitter.gesture.js", ["../../core/renderer", "../../events/core/events_engine", "../../core/devices", "../../core/utils/style", "../../core/utils/call_once", "../../core/utils/dom", "../../core/utils/ready_callbacks", "../../core/utils/math", "../../core/utils/common", "../../core/utils/type", "../utils/index", "../core/emitter"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _style = $__require("../../core/utils/style");
  var _call_once = _interopRequireDefault($__require("../../core/utils/call_once"));
  var _dom = $__require("../../core/utils/dom");
  var _ready_callbacks = _interopRequireDefault($__require("../../core/utils/ready_callbacks"));
  var _math = $__require("../../core/utils/math");
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _index = $__require("../utils/index");
  var _emitter = _interopRequireDefault($__require("../core/emitter"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ready = _ready_callbacks.default.add;
  var abs = Math.abs;
  var SLEEP = 0;
  var INITED = 1;
  var STARTED = 2;
  var TOUCH_BOUNDARY = 10;
  var IMMEDIATE_TOUCH_BOUNDARY = 0;
  var IMMEDIATE_TIMEOUT = 180;
  var supportPointerEvents = function supportPointerEvents() {
    return (0, _style.styleProp)('pointer-events');
  };
  var setGestureCover = (0, _call_once.default)(function () {
    var GESTURE_COVER_CLASS = 'dx-gesture-cover';
    var isDesktop = _devices.default.real().deviceType === 'desktop';
    if (!supportPointerEvents() || !isDesktop) {
      return _common.noop;
    }
    var $cover = (0, _renderer.default)('<div>').addClass(GESTURE_COVER_CLASS).css('pointerEvents', 'none');
    _events_engine.default.subscribeGlobal($cover, 'dxmousewheel', function (e) {
      e.preventDefault();
    });
    ready(function () {
      $cover.appendTo('body');
    });
    return function (toggle, cursor) {
      $cover.css('pointerEvents', toggle ? 'all' : 'none');
      toggle && $cover.css('cursor', cursor);
    };
  });
  var gestureCover = function gestureCover(toggle, cursor) {
    var gestureCoverStrategy = setGestureCover();
    gestureCoverStrategy(toggle, cursor);
  };
  var GestureEmitter = _emitter.default.inherit({
    gesture: true,
    configure: function configure(data) {
      this.getElement().css('msTouchAction', data.immediate ? 'pinch-zoom' : '');
      this.callBase(data);
    },
    allowInterruptionByMouseWheel: function allowInterruptionByMouseWheel() {
      return this._stage !== STARTED;
    },
    getDirection: function getDirection() {
      return this.direction;
    },
    _cancel: function _cancel() {
      this.callBase.apply(this, arguments);
      this._toggleGestureCover(false);
      this._stage = SLEEP;
    },
    start: function start(e) {
      if (e._needSkipEvent || (0, _index.needSkipEvent)(e)) {
        this._cancel(e);
        return;
      }
      this._startEvent = (0, _index.createEvent)(e);
      this._startEventData = (0, _index.eventData)(e);
      this._stage = INITED;
      this._init(e);
      this._setupImmediateTimer();
    },
    _setupImmediateTimer: function _setupImmediateTimer() {
      var _this$immediateTimeou;
      clearTimeout(this._immediateTimer);
      this._immediateAccepted = false;
      if (!this.immediate) {
        return;
      }
      if (this.immediateTimeout === 0) {
        this._immediateAccepted = true;
        return;
      }
      this._immediateTimer = setTimeout(function () {
        this._immediateAccepted = true;
      }.bind(this), (_this$immediateTimeou = this.immediateTimeout) !== null && _this$immediateTimeou !== void 0 ? _this$immediateTimeou : IMMEDIATE_TIMEOUT);
    },
    move: function move(e) {
      if (this._stage === INITED && this._directionConfirmed(e)) {
        this._stage = STARTED;
        this._resetActiveElement();
        this._toggleGestureCover(true);
        this._clearSelection(e);
        this._adjustStartEvent(e);
        this._start(this._startEvent);
        if (this._stage === SLEEP) {
          return;
        }
        this._requestAccept(e);
        this._move(e);
        this._forgetAccept();
      } else if (this._stage === STARTED) {
        this._clearSelection(e);
        this._move(e);
      }
    },
    _directionConfirmed: function _directionConfirmed(e) {
      var touchBoundary = this._getTouchBoundary(e);
      var delta = (0, _index.eventDelta)(this._startEventData, (0, _index.eventData)(e));
      var deltaX = abs(delta.x);
      var deltaY = abs(delta.y);
      var horizontalMove = this._validateMove(touchBoundary, deltaX, deltaY);
      var verticalMove = this._validateMove(touchBoundary, deltaY, deltaX);
      var direction = this.getDirection(e);
      var bothAccepted = direction === 'both' && (horizontalMove || verticalMove);
      var horizontalAccepted = direction === 'horizontal' && horizontalMove;
      var verticalAccepted = direction === 'vertical' && verticalMove;
      return bothAccepted || horizontalAccepted || verticalAccepted || this._immediateAccepted;
    },
    _validateMove: function _validateMove(touchBoundary, mainAxis, crossAxis) {
      return mainAxis && mainAxis >= touchBoundary && (this.immediate ? mainAxis >= crossAxis : true);
    },
    _getTouchBoundary: function _getTouchBoundary(e) {
      return this.immediate || (0, _index.isDxMouseWheelEvent)(e) ? IMMEDIATE_TOUCH_BOUNDARY : TOUCH_BOUNDARY;
    },
    _adjustStartEvent: function _adjustStartEvent(e) {
      var touchBoundary = this._getTouchBoundary(e);
      var delta = (0, _index.eventDelta)(this._startEventData, (0, _index.eventData)(e));
      this._startEvent.pageX += (0, _math.sign)(delta.x) * touchBoundary;
      this._startEvent.pageY += (0, _math.sign)(delta.y) * touchBoundary;
    },
    _resetActiveElement: function _resetActiveElement() {
      if (_devices.default.real().platform === 'ios' && this.getElement().find(':focus').length) {
        (0, _dom.resetActiveElement)();
      }
    },
    _toggleGestureCover: function _toggleGestureCover(toggle) {
      this._toggleGestureCoverImpl(toggle);
    },
    _toggleGestureCoverImpl: function _toggleGestureCoverImpl(toggle) {
      var isStarted = this._stage === STARTED;
      if (isStarted) {
        gestureCover(toggle, this.getElement().css('cursor'));
      }
    },
    _clearSelection: function _clearSelection(e) {
      if ((0, _index.isDxMouseWheelEvent)(e) || (0, _index.isTouchEvent)(e)) {
        return;
      }
      (0, _dom.clearSelection)();
    },
    end: function end(e) {
      this._toggleGestureCover(false);
      if (this._stage === STARTED) {
        this._end(e);
      } else if (this._stage === INITED) {
        this._stop(e);
      }
      this._stage = SLEEP;
    },
    dispose: function dispose() {
      clearTimeout(this._immediateTimer);
      this.callBase.apply(this, arguments);
      this._toggleGestureCover(false);
    },
    _init: _common.noop,
    _start: _common.noop,
    _move: _common.noop,
    _stop: _common.noop,
    _end: _common.noop
  });
  GestureEmitter.initialTouchBoundary = TOUCH_BOUNDARY;
  GestureEmitter.touchBoundary = function (newBoundary) {
    if ((0, _type.isDefined)(newBoundary)) {
      TOUCH_BOUNDARY = newBoundary;
      return;
    }
    return TOUCH_BOUNDARY;
  };
  var _default = GestureEmitter;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../events/core/events_engine","../../core/devices","../../core/utils/style","../../core/utils/call_once","../../core/utils/dom","../../core/utils/ready_callbacks","../../core/utils/math","../../core/utils/common","../../core/utils/type","../utils/index","../core/emitter"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../events/core/events_engine"), require("../../core/devices"), require("../../core/utils/style"), require("../../core/utils/call_once"), require("../../core/utils/dom"), require("../../core/utils/ready_callbacks"), require("../../core/utils/math"), require("../../core/utils/common"), require("../../core/utils/type"), require("../utils/index"), require("../core/emitter"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=emitter.gesture.js.map