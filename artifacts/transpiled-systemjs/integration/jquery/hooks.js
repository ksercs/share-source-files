!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/integration/jquery/hooks.js"], ["jquery","./use_jquery","../../core/utils/version","../../core/utils/iterator","../../core/utils/type","../../events/utils/index","../../events/core/event_registrator","../../events/core/hook_touch_props"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/integration/jquery/hooks.js", ["jquery", "./use_jquery", "../../core/utils/version", "../../core/utils/iterator", "../../core/utils/type", "../../events/utils/index", "../../events/core/event_registrator", "../../events/core/hook_touch_props"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _jquery = _interopRequireDefault($__require("jquery"));
  var _use_jquery = _interopRequireDefault($__require("./use_jquery"));
  var _version = $__require("../../core/utils/version");
  var _iterator = $__require("../../core/utils/iterator");
  var _type = $__require("../../core/utils/type");
  var _index = $__require("../../events/utils/index");
  var _event_registrator = _interopRequireDefault($__require("../../events/core/event_registrator"));
  var _hook_touch_props = _interopRequireDefault($__require("../../events/core/hook_touch_props"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // eslint-disable-next-line no-restricted-imports

  var useJQuery = (0, _use_jquery.default)();
  if (useJQuery) {
    if ((0, _version.compare)(_jquery.default.fn.jquery, [3]) < 0) {
      var POINTER_TYPE_MAP = {
        2: 'touch',
        3: 'pen',
        4: 'mouse'
      };
      (0, _iterator.each)(['MSPointerDown', 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel', 'MSPointerOver', 'MSPointerOut', 'mouseenter', 'mouseleave', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave'], function () {
        _jquery.default.event.fixHooks[this] = {
          filter: function filter(event, originalEvent) {
            var pointerType = originalEvent.pointerType;
            if ((0, _type.isNumeric)(pointerType)) {
              event.pointerType = POINTER_TYPE_MAP[pointerType];
            }
            return event;
          },
          props: _jquery.default.event.mouseHooks.props.concat(['pointerId', 'pointerType', 'originalTarget', 'width', 'height', 'pressure', 'result', 'tiltX', 'charCode', 'tiltY', 'detail', 'isPrimary', 'prevValue'])
        };
      });
      (0, _iterator.each)(['touchstart', 'touchmove', 'touchend', 'touchcancel'], function () {
        _jquery.default.event.fixHooks[this] = {
          filter: function filter(event, originalEvent) {
            (0, _hook_touch_props.default)(function (name, hook) {
              event[name] = hook(originalEvent);
            });
            return event;
          },
          props: _jquery.default.event.mouseHooks.props.concat(['touches', 'changedTouches', 'targetTouches', 'detail', 'result', 'originalTarget', 'charCode', 'prevValue'])
        };
      });
      _jquery.default.event.fixHooks['wheel'] = _jquery.default.event.mouseHooks;
      var DX_EVENT_HOOKS = {
        props: _jquery.default.event.mouseHooks.props.concat(['pointerType', 'pointerId', 'pointers'])
      };
      _event_registrator.default.callbacks.add(function (name) {
        _jquery.default.event.fixHooks[name] = DX_EVENT_HOOKS;
      });
      var fix = function fix(event, originalEvent) {
        var fixHook = _jquery.default.event.fixHooks[originalEvent.type] || _jquery.default.event.mouseHooks;
        var props = fixHook.props ? _jquery.default.event.props.concat(fixHook.props) : _jquery.default.event.props;
        var propIndex = props.length;
        while (propIndex--) {
          var prop = props[propIndex];
          event[prop] = originalEvent[prop];
        }
        return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
      };
      (0, _index.setEventFixMethod)(fix);
    } else {
      (0, _hook_touch_props.default)(function (name, hook) {
        _jquery.default.event.addProp(name, hook);
      });
    }
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","./use_jquery","../../core/utils/version","../../core/utils/iterator","../../core/utils/type","../../events/utils/index","../../events/core/event_registrator","../../events/core/hook_touch_props"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("./use_jquery"), require("../../core/utils/version"), require("../../core/utils/iterator"), require("../../core/utils/type"), require("../../events/utils/index"), require("../../events/core/event_registrator"), require("../../events/core/hook_touch_props"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=hooks.js.map