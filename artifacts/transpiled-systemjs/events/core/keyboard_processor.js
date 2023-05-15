!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/events/core/keyboard_processor.js"], ["../../core/renderer","../../events/core/events_engine","../../core/class","../../events/utils/index"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/events/core/keyboard_processor.js", ["../../core/renderer", "../../events/core/events_engine", "../../core/class", "../../events/utils/index"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _index = $__require("../../events/utils/index");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var COMPOSITION_START_EVENT = 'compositionstart';
  var COMPOSITION_END_EVENT = 'compositionend';
  var KEYDOWN_EVENT = 'keydown';
  var NAMESPACE = 'KeyboardProcessor';
  var createKeyDownOptions = function createKeyDownOptions(e) {
    return {
      keyName: (0, _index.normalizeKeyName)(e),
      key: e.key,
      code: e.code,
      ctrl: e.ctrlKey,
      location: e.location,
      metaKey: e.metaKey,
      shift: e.shiftKey,
      alt: e.altKey,
      which: e.which,
      originalEvent: e
    };
  };
  var KeyboardProcessor = _class.default.inherit({
    _keydown: (0, _index.addNamespace)(KEYDOWN_EVENT, NAMESPACE),
    _compositionStart: (0, _index.addNamespace)(COMPOSITION_START_EVENT, NAMESPACE),
    _compositionEnd: (0, _index.addNamespace)(COMPOSITION_END_EVENT, NAMESPACE),
    ctor: function ctor(options) {
      var _this = this;
      options = options || {};
      if (options.element) {
        this._element = (0, _renderer.default)(options.element);
      }
      if (options.focusTarget) {
        this._focusTarget = options.focusTarget;
      }
      this._handler = options.handler;
      if (this._element) {
        this._processFunction = function (e) {
          var focusTargets = (0, _renderer.default)(_this._focusTarget).toArray();
          var isNotFocusTarget = _this._focusTarget && _this._focusTarget !== e.target && !focusTargets.includes(e.target);
          var shouldSkipProcessing = _this._isComposingJustFinished && e.which === 229 || _this._isComposing || isNotFocusTarget;
          _this._isComposingJustFinished = false;
          if (!shouldSkipProcessing) {
            _this.process(e);
          }
        };
        this._toggleProcessingWithContext = this.toggleProcessing.bind(this);
        _events_engine.default.on(this._element, this._keydown, this._processFunction);
        _events_engine.default.on(this._element, this._compositionStart, this._toggleProcessingWithContext);
        _events_engine.default.on(this._element, this._compositionEnd, this._toggleProcessingWithContext);
      }
    },
    dispose: function dispose() {
      if (this._element) {
        _events_engine.default.off(this._element, this._keydown, this._processFunction);
        _events_engine.default.off(this._element, this._compositionStart, this._toggleProcessingWithContext);
        _events_engine.default.off(this._element, this._compositionEnd, this._toggleProcessingWithContext);
      }
      this._element = undefined;
      this._handler = undefined;
    },
    process: function process(e) {
      this._handler(createKeyDownOptions(e));
    },
    toggleProcessing: function toggleProcessing(_ref) {
      var type = _ref.type;
      this._isComposing = type === COMPOSITION_START_EVENT;
      this._isComposingJustFinished = !this._isComposing;
    }
  });
  KeyboardProcessor.createKeyDownOptions = createKeyDownOptions;
  var _default = KeyboardProcessor;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../events/core/events_engine","../../core/class","../../events/utils/index"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../events/core/events_engine"), require("../../core/class"), require("../../events/utils/index"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=keyboard_processor.js.map