!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/events/core/emitter_registrator.js"], ["../../core/renderer","../../core/utils/ready_callbacks","../../core/dom_adapter","../../events/core/events_engine","../../core/element_data","../../core/class","../../core/utils/extend","../../core/utils/iterator","./event_registrator","../utils/index","../pointer","./wheel"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/events/core/emitter_registrator.js", ["../../core/renderer", "../../core/utils/ready_callbacks", "../../core/dom_adapter", "../../events/core/events_engine", "../../core/element_data", "../../core/class", "../../core/utils/extend", "../../core/utils/iterator", "./event_registrator", "../utils/index", "../pointer", "./wheel"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _ready_callbacks = _interopRequireDefault($__require("../../core/utils/ready_callbacks"));
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _element_data = $__require("../../core/element_data");
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _event_registrator = _interopRequireDefault($__require("./event_registrator"));
  var _index = $__require("../utils/index");
  var _pointer = _interopRequireDefault($__require("../pointer"));
  var _wheel = $__require("./wheel");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MANAGER_EVENT = 'dxEventManager';
  var EMITTER_DATA = 'dxEmitter';
  var EventManager = _class.default.inherit({
    ctor: function ctor() {
      this._attachHandlers();
      this.reset();
      this._proxiedCancelHandler = this._cancelHandler.bind(this);
      this._proxiedAcceptHandler = this._acceptHandler.bind(this);
    },
    _attachHandlers: function _attachHandlers() {
      _ready_callbacks.default.add(function () {
        var document = _dom_adapter.default.getDocument();
        _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)(_pointer.default.down, MANAGER_EVENT), this._pointerDownHandler.bind(this));
        _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)(_pointer.default.move, MANAGER_EVENT), this._pointerMoveHandler.bind(this));
        _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)([_pointer.default.up, _pointer.default.cancel].join(' '), MANAGER_EVENT), this._pointerUpHandler.bind(this));
        _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)(_wheel.name, MANAGER_EVENT), this._mouseWheelHandler.bind(this));
      }.bind(this));
    },
    _eachEmitter: function _eachEmitter(callback) {
      var activeEmitters = this._activeEmitters || [];
      var i = 0;
      while (activeEmitters.length > i) {
        var emitter = activeEmitters[i];
        if (callback(emitter) === false) {
          break;
        }
        if (activeEmitters[i] === emitter) {
          i++;
        }
      }
    },
    _applyToEmitters: function _applyToEmitters(method, arg) {
      this._eachEmitter(function (emitter) {
        emitter[method].call(emitter, arg);
      });
    },
    reset: function reset() {
      this._eachEmitter(this._proxiedCancelHandler);
      this._activeEmitters = [];
    },
    resetEmitter: function resetEmitter(emitter) {
      this._proxiedCancelHandler(emitter);
    },
    _pointerDownHandler: function _pointerDownHandler(e) {
      if ((0, _index.isMouseEvent)(e) && e.which > 1) {
        return;
      }
      this._updateEmitters(e);
    },
    _updateEmitters: function _updateEmitters(e) {
      if (!this._isSetChanged(e)) {
        return;
      }
      this._cleanEmitters(e);
      this._fetchEmitters(e);
    },
    _isSetChanged: function _isSetChanged(e) {
      var currentSet = this._closestEmitter(e);
      var previousSet = this._emittersSet || [];
      var setChanged = currentSet.length !== previousSet.length;
      (0, _iterator.each)(currentSet, function (index, emitter) {
        setChanged = setChanged || previousSet[index] !== emitter;
        return !setChanged;
      });
      this._emittersSet = currentSet;
      return setChanged;
    },
    _closestEmitter: function _closestEmitter(e) {
      var that = this;
      var result = [];
      var $element = (0, _renderer.default)(e.target);
      function handleEmitter(_, emitter) {
        if (!!emitter && emitter.validatePointers(e) && emitter.validate(e)) {
          emitter.addCancelCallback(that._proxiedCancelHandler);
          emitter.addAcceptCallback(that._proxiedAcceptHandler);
          result.push(emitter);
        }
      }
      while ($element.length) {
        var emitters = (0, _element_data.data)($element.get(0), EMITTER_DATA) || [];
        (0, _iterator.each)(emitters, handleEmitter);
        $element = $element.parent();
      }
      return result;
    },
    _acceptHandler: function _acceptHandler(acceptedEmitter, e) {
      var that = this;
      this._eachEmitter(function (emitter) {
        if (emitter !== acceptedEmitter) {
          that._cancelEmitter(emitter, e);
        }
      });
    },
    _cancelHandler: function _cancelHandler(canceledEmitter, e) {
      this._cancelEmitter(canceledEmitter, e);
    },
    _cancelEmitter: function _cancelEmitter(emitter, e) {
      var activeEmitters = this._activeEmitters;
      if (e) {
        emitter.cancel(e);
      } else {
        emitter.reset();
      }
      emitter.removeCancelCallback();
      emitter.removeAcceptCallback();
      var emitterIndex = activeEmitters.indexOf(emitter);
      if (emitterIndex > -1) {
        activeEmitters.splice(emitterIndex, 1);
      }
    },
    _cleanEmitters: function _cleanEmitters(e) {
      this._applyToEmitters('end', e);
      this.reset(e);
    },
    _fetchEmitters: function _fetchEmitters(e) {
      this._activeEmitters = this._emittersSet.slice();
      this._applyToEmitters('start', e);
    },
    _pointerMoveHandler: function _pointerMoveHandler(e) {
      this._applyToEmitters('move', e);
    },
    _pointerUpHandler: function _pointerUpHandler(e) {
      this._updateEmitters(e);
    },
    _mouseWheelHandler: function _mouseWheelHandler(e) {
      if (!this._allowInterruptionByMouseWheel()) {
        return;
      }
      e.pointers = [null];
      this._pointerDownHandler(e);
      this._adjustWheelEvent(e);
      this._pointerMoveHandler(e);
      e.pointers = [];
      this._pointerUpHandler(e);
    },
    _allowInterruptionByMouseWheel: function _allowInterruptionByMouseWheel() {
      var allowInterruption = true;
      this._eachEmitter(function (emitter) {
        allowInterruption = emitter.allowInterruptionByMouseWheel() && allowInterruption;
        return allowInterruption;
      });
      return allowInterruption;
    },
    _adjustWheelEvent: function _adjustWheelEvent(e) {
      var closestGestureEmitter = null;
      this._eachEmitter(function (emitter) {
        if (!emitter.gesture) {
          return;
        }
        var direction = emitter.getDirection(e);
        if (direction !== 'horizontal' && !e.shiftKey || direction !== 'vertical' && e.shiftKey) {
          closestGestureEmitter = emitter;
          return false;
        }
      });
      if (!closestGestureEmitter) {
        return;
      }
      var direction = closestGestureEmitter.getDirection(e);
      var verticalGestureDirection = direction === 'both' && !e.shiftKey || direction === 'vertical';
      var prop = verticalGestureDirection ? 'pageY' : 'pageX';
      e[prop] += e.delta;
    },
    isActive: function isActive(element) {
      var result = false;
      this._eachEmitter(function (emitter) {
        result = result || emitter.getElement().is(element);
      });
      return result;
    }
  });
  var eventManager = new EventManager();
  var EMITTER_SUBSCRIPTION_DATA = 'dxEmitterSubscription';
  var registerEmitter = function registerEmitter(emitterConfig) {
    var emitterClass = emitterConfig.emitter;
    var emitterName = emitterConfig.events[0];
    var emitterEvents = emitterConfig.events;
    (0, _iterator.each)(emitterEvents, function (_, eventName) {
      (0, _event_registrator.default)(eventName, {
        noBubble: !emitterConfig.bubble,
        setup: function setup(element) {
          var subscriptions = (0, _element_data.data)(element, EMITTER_SUBSCRIPTION_DATA) || {};
          var emitters = (0, _element_data.data)(element, EMITTER_DATA) || {};
          var emitter = emitters[emitterName] || new emitterClass(element);
          subscriptions[eventName] = true;
          emitters[emitterName] = emitter;
          (0, _element_data.data)(element, EMITTER_DATA, emitters);
          (0, _element_data.data)(element, EMITTER_SUBSCRIPTION_DATA, subscriptions);
        },
        add: function add(element, handleObj) {
          var emitters = (0, _element_data.data)(element, EMITTER_DATA);
          var emitter = emitters[emitterName];
          emitter.configure((0, _extend.extend)({
            delegateSelector: handleObj.selector
          }, handleObj.data), handleObj.type);
        },
        teardown: function teardown(element) {
          var subscriptions = (0, _element_data.data)(element, EMITTER_SUBSCRIPTION_DATA);
          var emitters = (0, _element_data.data)(element, EMITTER_DATA);
          var emitter = emitters[emitterName];
          delete subscriptions[eventName];
          var disposeEmitter = true;
          (0, _iterator.each)(emitterEvents, function (_, eventName) {
            disposeEmitter = disposeEmitter && !subscriptions[eventName];
            return disposeEmitter;
          });
          if (disposeEmitter) {
            if (eventManager.isActive(element)) {
              eventManager.resetEmitter(emitter);
            }
            emitter && emitter.dispose();
            delete emitters[emitterName];
          }
        }
      });
    });
  };
  var _default = registerEmitter;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/ready_callbacks","../../core/dom_adapter","../../events/core/events_engine","../../core/element_data","../../core/class","../../core/utils/extend","../../core/utils/iterator","./event_registrator","../utils/index","../pointer","./wheel"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/ready_callbacks"), require("../../core/dom_adapter"), require("../../events/core/events_engine"), require("../../core/element_data"), require("../../core/class"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("./event_registrator"), require("../utils/index"), require("../pointer"), require("./wheel"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=emitter_registrator.js.map