!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/core/errors.js"], ["./utils/error"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/core/errors.js", ["./utils/error"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _error = _interopRequireDefault($__require("./utils/error"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  /**
  * @docid
  * @name ErrorsCore
  */
  var _default = (0, _error.default)({
    /**
    * @name ErrorsCore.E0001
    */
    E0001: 'Method is not implemented',
    /**
    * @name ErrorsCore.E0002
    */
    E0002: 'Member name collision: {0}',
    /**
    * @name ErrorsCore.E0003
    */
    E0003: 'A class must be instantiated using the \'new\' keyword',
    /**
    * @name ErrorsCore.E0004
    */
    E0004: 'The NAME property of the component is not specified',
    /**
    * @name ErrorsCore.E0005
    */
    E0005: 'Unknown device',
    /**
    * @name ErrorsCore.E0006
    */
    E0006: 'Unknown endpoint key is requested',
    /**
    * @name ErrorsCore.E0007
    */
    E0007: '\'Invalidate\' method is called outside the update transaction',
    /**
    * @name ErrorsCore.E0008
    */
    E0008: 'Type of the option name is not appropriate to create an action',
    /**
    * @name ErrorsCore.E0009
    */
    E0009: 'Component \'{0}\' has not been initialized for an element',
    /**
    * @name ErrorsCore.E0010
    */
    E0010: 'Animation configuration with the \'{0}\' type requires \'{1}\' configuration as {2}',
    /**
    * @name ErrorsCore.E0011
    */
    E0011: 'Unknown animation type \'{0}\'',
    /**
    * @name ErrorsCore.E0012
    */
    E0012: 'jQuery version is too old. Please upgrade jQuery to 1.10.0 or later',
    /**
    * @name ErrorsCore.E0013
    */
    E0013: 'KnockoutJS version is too old. Please upgrade KnockoutJS to 2.3.0 or later',
    /**
    * @name ErrorsCore.E0014
    */
    E0014: 'The \'release\' method shouldn\'t be called for an unlocked Lock object',
    /**
    * @name ErrorsCore.E0015
    */
    E0015: 'Queued task returned an unexpected result',
    /**
    * @name ErrorsCore.E0017
    */
    E0017: 'Event namespace is not defined',
    /**
    * @name ErrorsCore.E0018
    */
    E0018: 'DevExpress.ui.DevExpressPopup widget is required',
    /**
    * @name ErrorsCore.E0020
    */
    E0020: 'Template engine \'{0}\' is not supported',
    /**
    * @name ErrorsCore.E0021
    */
    E0021: 'Unknown theme is set: {0}',
    /**
    * @name ErrorsCore.E0022
    */
    E0022: 'LINK[rel=DevExpress-theme] tags must go before DevExpress included scripts',
    /**
    * @name ErrorsCore.E0023
    */
    E0023: 'Template name is not specified',
    /**
    * @name ErrorsCore.E0024
    */
    E0024: 'DevExtreme bundle already included',
    /**
    * @name ErrorsCore.E0025
    */
    E0025: 'Unexpected argument type',
    /**
    * @name ErrorsCore.E0100
    */
    E0100: 'Unknown validation type is detected',
    /**
    * @name ErrorsCore.E0101
    */
    E0101: 'Misconfigured range validation rule is detected',
    /**
    * @name ErrorsCore.E0102
    */
    E0102: 'Misconfigured comparison validation rule is detected',
    /**
    * @name ErrorsCore.E0103
    */
    E0103: 'validationCallback of an asynchronous rule should return a jQuery or a native promise',
    /**
    * @name ErrorsCore.E0110
    */
    E0110: 'Unknown validation group is detected',
    /**
    * @name ErrorsCore.E0120
    */
    E0120: 'Adapter for a DevExpressValidator component cannot be configured',
    /**
    * @name ErrorsCore.E0121
    */
    E0121: 'The \'customItem\' parameter of the \'onCustomItemCreating\' function is empty or contains invalid data. Assign a custom object or a Promise that is resolved after the item is created.',
    /**
    * @name ErrorsCore.W0000
    */
    W0000: '\'{0}\' is deprecated in {1}. {2}',
    /**
    * @name ErrorsCore.W0001
    */
    W0001: '{0} - \'{1}\' option is deprecated in {2}. {3}',
    /**
    * @name ErrorsCore.W0002
    */
    W0002: '{0} - \'{1}\' method is deprecated in {2}. {3}',
    /**
    * @name ErrorsCore.W0003
    */
    W0003: '{0} - \'{1}\' property is deprecated in {2}. {3}',
    /**
    * @name ErrorsCore.W0004
    */
    W0004: 'Timeout for theme loading is over: {0}',
    /**
    * @name ErrorsCore.W0005
    */
    W0005: '\'{0}\' event is deprecated in {1}. {2}',
    /**
    * @name ErrorsCore.W0006
    */
    W0006: 'Invalid recurrence rule: \'{0}\'',
    /**
    * @name ErrorsCore.W0007
    */
    W0007: '\'{0}\' Globalize culture is not defined',
    /**
    * @name ErrorsCore.W0008
    */
    W0008: 'Invalid view name: \'{0}\'',
    /**
    * @name ErrorsCore.W0009
    */
    W0009: 'Invalid time zone name: \'{0}\'',
    /**
    * @name ErrorsCore.W0010
    */
    W0010: '{0} is deprecated in {1}. {2}',
    /**
    * @name ErrorsCore.W0011
    */
    W0011: 'Number parsing is invoked while the parser is not defined',
    /**
    * @name ErrorsCore.W0012
    */
    W0012: 'Date parsing is invoked while the parser is not defined',
    /**
    * @name ErrorsCore.W0013
    */
    W0013: '\'{0}\' file is deprecated in {1}. {2}',
    /**
    * @name ErrorsCore.W0014
    */
    W0014: '{0} - \'{1}\' type is deprecated in {2}. {3}',
    /**
    * @name ErrorsCore.W0015
    */
    W0015: 'Instead of returning a value from the \'{0}\' function, write it into the \'{1}\' field of the function\'s parameter.',
    /**
    * @name ErrorsCore.W0016
    */
    W0016: 'The "{0}" option does not accept the "{1}" value since v{2}. {3}.',
    /**
    * @name ErrorsCore.W0017
    */
    W0017: 'Setting the "{0}" property with a function is deprecated since v21.2',
    /**
    * @name ErrorsCore.W0018
    */
    W0018: 'Setting the "position" property with a function is deprecated since v21.2'
  });
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./utils/error"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./utils/error"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=errors.js.map