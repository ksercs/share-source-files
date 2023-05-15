!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/events/hover.js"], ["../events/core/events_engine","../core/element_data","../core/class","../core/devices","./core/event_registrator","./utils/index","./pointer"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/events/hover.js", ["../events/core/events_engine", "../core/element_data", "../core/class", "../core/devices", "./core/event_registrator", "./utils/index", "./pointer"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.start = exports.end = void 0;
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _element_data = $__require("../core/element_data");
  var _class = _interopRequireDefault($__require("../core/class"));
  var _devices = _interopRequireDefault($__require("../core/devices"));
  var _event_registrator = _interopRequireDefault($__require("./core/event_registrator"));
  var _index = $__require("./utils/index");
  var _pointer = _interopRequireDefault($__require("./pointer"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var HOVERSTART_NAMESPACE = 'dxHoverStart';
  var HOVERSTART = 'dxhoverstart';
  exports.start = HOVERSTART;
  var POINTERENTER_NAMESPACED_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.enter, HOVERSTART_NAMESPACE);
  var HOVEREND_NAMESPACE = 'dxHoverEnd';
  var HOVEREND = 'dxhoverend';
  exports.end = HOVEREND;
  var POINTERLEAVE_NAMESPACED_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.leave, HOVEREND_NAMESPACE);
  var Hover = _class.default.inherit({
    noBubble: true,
    ctor: function ctor() {
      this._handlerArrayKeyPath = this._eventNamespace + '_HandlerStore';
    },
    setup: function setup(element) {
      (0, _element_data.data)(element, this._handlerArrayKeyPath, {});
    },
    add: function add(element, handleObj) {
      var that = this;
      var handler = function handler(e) {
        that._handler(e);
      };
      _events_engine.default.on(element, this._originalEventName, handleObj.selector, handler);
      (0, _element_data.data)(element, this._handlerArrayKeyPath)[handleObj.guid] = handler;
    },
    _handler: function _handler(e) {
      if ((0, _index.isTouchEvent)(e) || _devices.default.isSimulator()) {
        return;
      }
      (0, _index.fireEvent)({
        type: this._eventName,
        originalEvent: e,
        delegateTarget: e.delegateTarget
      });
    },
    remove: function remove(element, handleObj) {
      var handler = (0, _element_data.data)(element, this._handlerArrayKeyPath)[handleObj.guid];
      _events_engine.default.off(element, this._originalEventName, handleObj.selector, handler);
    },
    teardown: function teardown(element) {
      (0, _element_data.removeData)(element, this._handlerArrayKeyPath);
    }
  });
  var HoverStart = Hover.inherit({
    ctor: function ctor() {
      this._eventNamespace = HOVERSTART_NAMESPACE;
      this._eventName = HOVERSTART;
      this._originalEventName = POINTERENTER_NAMESPACED_EVENT_NAME;
      this.callBase();
    },
    _handler: function _handler(e) {
      var pointers = e.pointers || [];
      if (!pointers.length) {
        this.callBase(e);
      }
    }
  });
  var HoverEnd = Hover.inherit({
    ctor: function ctor() {
      this._eventNamespace = HOVEREND_NAMESPACE;
      this._eventName = HOVEREND;
      this._originalEventName = POINTERLEAVE_NAMESPACED_EVENT_NAME;
      this.callBase();
    }
  });

  /**
   * @name UI Events.dxhoverstart
   * @type eventType
   * @type_function_param1 event:event
   * @module events/hover
  */

  /**
   * @name UI Events.dxhoverend
   * @type eventType
   * @type_function_param1 event:event
   * @module events/hover
  */

  (0, _event_registrator.default)(HOVERSTART, new HoverStart());
  (0, _event_registrator.default)(HOVEREND, new HoverEnd());
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../events/core/events_engine","../core/element_data","../core/class","../core/devices","./core/event_registrator","./utils/index","./pointer"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../events/core/events_engine"), require("../core/element_data"), require("../core/class"), require("../core/devices"), require("./core/event_registrator"), require("./utils/index"), require("./pointer"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=hover.js.map