!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/data/errors.js"], ["../core/utils/error","../core/errors"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/data/errors.js", ["../core/utils/error", "../core/errors"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.setErrorHandler = exports.handleError = exports.errors = exports.errorHandler = void 0;
  var _error = _interopRequireDefault($__require("../core/utils/error"));
  var _errors = _interopRequireDefault($__require("../core/errors"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  /**
  * @docid
  * @name ErrorsData
  */
  var errors = (0, _error.default)(_errors.default.ERROR_MESSAGES, {
    /**
    * @name ErrorsData.E4000
    */
    E4000: '[DevExpress.data]: {0}',
    /**
      * @name ErrorsData.E4001
      */
    E4001: 'Unknown aggregating function is detected: \'{0}\'',
    /**
    * @name ErrorsData.E4002
    */
    E4002: 'Unsupported OData protocol version is used',
    /**
    * @name ErrorsData.E4003
    */
    E4003: 'Unknown filter operation is used: {0}',
    /**
    * @name ErrorsData.E4004
    */
    E4004: 'The thenby() method is called before the sortby() method',
    /**
    * @name ErrorsData.E4005
    */
    E4005: 'Store requires a key expression for this operation',
    /**
    * @name ErrorsData.E4006
    */
    E4006: 'ArrayStore \'data\' option must be an array',
    /**
    * @name ErrorsData.E4007
    */
    E4007: 'Compound keys cannot be auto-generated',
    /**
    * @name ErrorsData.E4008
    */
    E4008: 'Attempt to insert an item with a duplicated key',
    /**
    * @name ErrorsData.E4009
    */
    E4009: 'Data item cannot be found',
    /**
    * @name ErrorsData.E4010
    */
    E4010: 'CustomStore does not support creating queries',
    /**
    * @name ErrorsData.E4011
    */
    E4011: 'Custom Store method is not implemented or is not a function: {0}',
    /**
    * @name ErrorsData.E4012
    */
    E4012: 'Custom Store method returns an invalid value: {0}',
    /**
    * @name ErrorsData.E4013
    */
    E4013: 'Local Store requires the \'name\' configuration option is specified',
    /**
    * @name ErrorsData.E4014
    */
    E4014: 'Unknown data type is specified for ODataStore: {0}',
    /**
    * @name ErrorsData.E4015
    */
    E4015: 'Unknown entity name or alias is used: {0}',
    /**
    * @name ErrorsData.E4016
    */
    E4016: 'The compileSetter(expr) method is called with \'self\' passed as a parameter',
    /**
    * @name ErrorsData.E4017
    */
    E4017: 'Keys cannot be modified',
    /**
    * @name ErrorsData.E4018
    */
    E4018: 'The server has returned a non-numeric value in a response to an item count request',
    /**
    * @name ErrorsData.E4019
    */
    E4019: 'Mixing of group operators inside a single group of filter expression is not allowed',
    /**
    * @name ErrorsData.E4020
    */
    E4020: 'Unknown store type is detected: {0}',
    /**
    * @name ErrorsData.E4021
    */
    E4021: 'The server response does not provide the totalCount value',
    /**
    * @name ErrorsData.E4022
    */
    E4022: 'The server response does not provide the groupCount value',
    /**
    * @name ErrorsData.E4023
    */
    E4023: 'Could not parse the following XML: {0}',
    /**
    * @name ErrorsData.E4024
    */
    E4024: 'String function {0} cannot be used with the data field {1} of type {2}.',
    /**
    * @name ErrorsData.W4000
    */
    W4000: 'Data returned from the server has an incorrect structure',
    /**
    * @name ErrorsData.W4001
    */
    W4001: 'The {0} field is listed in both "keyType" and "fieldTypes". The value of "fieldTypes" is used.',
    /**
    * @name ErrorsData.W4002
    */
    W4002: 'Data loading has failed for some cells due to the following error: {0}'
  });
  exports.errors = errors;
  var errorHandler = null;
  exports.errorHandler = errorHandler;
  var handleError = function handleError(error) {
    var _errorHandler;
    ///#DEBUG
    var id = error && '__id' in error ? error.__id : 'E4000';
    errors.log(id, error);
    ///#ENDDEBUG

    (_errorHandler = errorHandler) === null || _errorHandler === void 0 ? void 0 : _errorHandler(error);
  };
  exports.handleError = handleError;
  var setErrorHandler = function setErrorHandler(handler) {
    return exports.errorHandler = errorHandler = handler;
  };
  exports.setErrorHandler = setErrorHandler;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/error","../core/errors"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/error"), require("../core/errors"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=errors.js.map