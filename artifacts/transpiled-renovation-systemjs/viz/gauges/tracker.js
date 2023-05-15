!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/gauges/tracker.js"], ["../../events/core/events_engine","../../core/class","../../core/dom_adapter","../../events/core/wheel","../../core/utils/ready_callbacks","../../events/utils/index","../../events/pointer","../../core/utils/console"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/gauges/tracker.js", ["../../events/core/events_engine", "../../core/class", "../../core/dom_adapter", "../../events/core/wheel", "../../core/utils/ready_callbacks", "../../events/utils/index", "../../events/pointer", "../../core/utils/console"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _wheel = $__require("../../events/core/wheel");
  var _ready_callbacks = _interopRequireDefault($__require("../../core/utils/ready_callbacks"));
  var _index = $__require("../../events/utils/index");
  var _pointer = _interopRequireDefault($__require("../../events/pointer"));
  var _console = $__require("../../core/utils/console");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  ///#DEBUG

  ///#ENDDEBUG
  var EVENT_NS = 'gauge-tooltip';
  var TOOLTIP_HIDE_DELAY = 100;
  var ready = _ready_callbacks.default.add;
  var Tracker = _class.default.inherit({
    ctor: function ctor(parameters) {
      ///#DEBUG
      _console.debug.assertParam(parameters, 'parameters');
      _console.debug.assertParam(parameters.renderer, 'parameters.renderer');
      _console.debug.assertParam(parameters.container, 'parameters.container');
      ///#ENDDEBUG
      var that = this;
      that._element = parameters.renderer.g().attr({
        'class': 'dxg-tracker',
        stroke: 'none',
        'stroke-width': 0,
        fill: '#000000',
        opacity: 0.0001
      }).linkOn(parameters.container, {
        name: 'tracker',
        after: 'peripheral'
      });
      that._showTooltipCallback = function () {
        var target = that._tooltipEvent.target;
        var data_target = target['gauge-data-target'];
        var data_info = target['gauge-data-info'];
        that._targetEvent = null; //  Internal state must be reset strictly BEFORE callback is invoked
        if (that._tooltipTarget !== target) {
          var callback = function callback(result) {
            result && (that._tooltipTarget = target);
          };
          callback(that._callbacks['tooltip-show'](data_target, data_info, callback));
        }
      };
      that._hideTooltipCallback = function () {
        that._hideTooltipTimeout = null;
        that._targetEvent = null;
        if (that._tooltipTarget) {
          that._callbacks['tooltip-hide']();
          that._tooltipTarget = null;
        }
      };
      that._dispose = function () {
        clearTimeout(that._hideTooltipTimeout);
        that._showTooltipCallback = that._hideTooltipCallback = that._dispose = null;
      };
      ///#DEBUG
      that._DEBUG_hideTooltipTimeoutSet = that._DEBUG_hideTooltipTimeoutCleared = 0;
      that.TOOLTIP_HIDE_DELAY = TOOLTIP_HIDE_DELAY;
      ///#ENDDEBUG
    },

    dispose: function dispose() {
      var that = this;
      that._dispose();
      that.deactivate();
      that._element.off('.' + EVENT_NS);
      that._element.linkOff();
      that._element = that._context = that._callbacks = null;
      return that;
    },
    activate: function activate() {
      this._element.linkAppend();
      return this;
    },
    deactivate: function deactivate() {
      this._element.linkRemove().clear();
      return this;
    },
    attach: function attach(element, target, info) {
      element.data({
        'gauge-data-target': target,
        'gauge-data-info': info
      }).append(this._element);
      return this;
    },
    detach: function detach(element) {
      element.remove();
      return this;
    },
    setTooltipState: function setTooltipState(state) {
      var that = this;
      that._element.off('.' + EVENT_NS);
      if (state) {
        var data = {
          tracker: that
        };
        that._element.on((0, _index.addNamespace)([_pointer.default.move], EVENT_NS), data, handleTooltipMouseOver).on((0, _index.addNamespace)([_pointer.default.out], EVENT_NS), data, handleTooltipMouseOut).on((0, _index.addNamespace)([_pointer.default.down], EVENT_NS), data, handleTooltipTouchStart).on((0, _index.addNamespace)([_pointer.default.up], EVENT_NS), data, handleTooltipTouchEnd).on((0, _index.addNamespace)([_wheel.name], EVENT_NS), data, handleTooltipMouseWheel);
      }
      return that;
    },
    setCallbacks: function setCallbacks(callbacks) {
      this._callbacks = callbacks;
      return this;
    },
    _showTooltip: function _showTooltip(event) {
      var that = this;

      ///#DEBUG
      that._hideTooltipTimeout && ++that._DEBUG_hideTooltipTimeoutCleared;
      ///#ENDDEBUG
      clearTimeout(that._hideTooltipTimeout);
      that._hideTooltipTimeout = null;
      if (that._tooltipTarget === event.target) {
        return;
      }
      that._tooltipEvent = event;
      that._showTooltipCallback();
    },
    _hideTooltip: function _hideTooltip(delay) {
      var that = this;
      clearTimeout(that._hideTooltipTimeout);
      if (delay) {
        ///#DEBUG
        ++that._DEBUG_hideTooltipTimeoutSet;
        ///#ENDDEBUG
        that._hideTooltipTimeout = setTimeout(that._hideTooltipCallback, delay);
      } else {
        that._hideTooltipCallback();
      }
    }
  });
  var active_touch_tooltip_tracker = null;

  ///#DEBUG
  Tracker._DEBUG_reset = function () {
    active_touch_tooltip_tracker = null;
  };
  ///#ENDDEBUG

  function handleTooltipMouseOver(event) {
    var tracker = event.data.tracker;
    tracker._x = event.pageX;
    tracker._y = event.pageY;
    tracker._showTooltip(event);
  }
  function handleTooltipMouseOut(event) {
    event.data.tracker._hideTooltip(TOOLTIP_HIDE_DELAY);
  }
  function handleTooltipMouseWheel(event) {
    event.data.tracker._hideTooltip();
  }
  function handleTooltipTouchStart(event) {
    var tracker = active_touch_tooltip_tracker = event.data.tracker;
    tracker._touch = true;
    handleTooltipMouseOver(event);
  }
  function handleTooltipTouchEnd() {
    active_touch_tooltip_tracker._touch = false;
  }
  function handleDocumentTooltipTouchStart(event) {
    var tracker = active_touch_tooltip_tracker;
    if (tracker && !tracker._touch) {
      tracker._hideTooltip(TOOLTIP_HIDE_DELAY);
      active_touch_tooltip_tracker = null;
    }
  }
  ready(function () {
    _events_engine.default.subscribeGlobal(_dom_adapter.default.getDocument(), (0, _index.addNamespace)([_pointer.default.down], EVENT_NS), handleDocumentTooltipTouchStart);
  });
  var _default = Tracker;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../events/core/events_engine","../../core/class","../../core/dom_adapter","../../events/core/wheel","../../core/utils/ready_callbacks","../../events/utils/index","../../events/pointer","../../core/utils/console"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../events/core/events_engine"), require("../../core/class"), require("../../core/dom_adapter"), require("../../events/core/wheel"), require("../../core/utils/ready_callbacks"), require("../../events/utils/index"), require("../../events/pointer"), require("../../core/utils/console"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tracker.js.map