!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/file_management/file_system_item.js"], ["../core/utils/type","./utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/file_management/file_system_item.js", ["../core/utils/type", "./utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _type = $__require("../core/utils/type");
  var _utils = $__require("./utils");
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  var FileSystemItem = /*#__PURE__*/function () {
    function FileSystemItem() {
      var ctor = (0, _type.isString)(arguments[0]) ? this._publicCtor : this._internalCtor;
      ctor.apply(this, arguments);
    }
    var _proto = FileSystemItem.prototype;
    _proto._internalCtor = function _internalCtor(pathInfo, name, isDirectory, key) {
      this.name = name || '';
      this.pathInfo = pathInfo && _toConsumableArray(pathInfo) || [];
      this.parentPath = this._getPathByPathInfo(this.pathInfo);
      this.relativeName = (0, _utils.pathCombine)(this.parentPath, name);
      this.key = key || this._getPathByPathInfo(this.getFullPathInfo(), true);
      this.path = (0, _utils.pathCombine)(this.parentPath, name);
      this.pathKeys = this.pathInfo.map(function (_ref) {
        var key = _ref.key;
        return key;
      });
      if (!this.isRoot()) {
        this.pathKeys.push(this.key);
      }
      this._initialize(isDirectory);
    };
    _proto._publicCtor = function _publicCtor(path, isDirectory, pathKeys) {
      this.path = path || '';
      this.pathKeys = pathKeys || [];
      var pathInfo = [];
      var parts = (0, _utils.getPathParts)(path, true);
      for (var i = 0; i < parts.length - 1; i++) {
        var part = parts[i];
        var pathInfoPart = {
          key: this.pathKeys[i] || part,
          name: (0, _utils.getName)(part)
        };
        pathInfo.push(pathInfoPart);
      }
      this.pathInfo = pathInfo;
      this.relativeName = path;
      this.name = (0, _utils.getName)(path);
      this.key = this.pathKeys.length ? this.pathKeys[this.pathKeys.length - 1] : path;
      this.parentPath = parts.length > 1 ? parts[parts.length - 2] : '';
      this._initialize(isDirectory);
    };
    _proto._initialize = function _initialize(isDirectory) {
      this.isDirectory = !!isDirectory;
      this.size = 0;
      this.dateModified = new Date();
      this.thumbnail = '';
      this.tooltipText = '';
    };
    _proto.getFullPathInfo = function getFullPathInfo() {
      var pathInfo = _toConsumableArray(this.pathInfo);
      if (!this.isRoot()) {
        pathInfo.push({
          key: this.key,
          name: this.name
        });
      }
      return pathInfo;
    };
    _proto.isRoot = function isRoot() {
      return this.path === '';
    };
    _proto.getFileExtension = function getFileExtension() {
      return this.isDirectory ? '' : (0, _utils.getFileExtension)(this.name);
    };
    _proto.equals = function equals(item) {
      return item && this.key === item.key;
    };
    _proto.createClone = function createClone() {
      var result = new FileSystemItem(this.pathInfo, this.name, this.isDirectory, this.key);
      result.key = this.key;
      result.size = this.size;
      result.dateModified = this.dateModified;
      result.thumbnail = this.thumbnail;
      result.tooltipText = this.tooltipText;
      result.hasSubDirectories = this.hasSubDirectories;
      result.dataItem = this.dataItem;
      return result;
    };
    _proto._getPathByPathInfo = function _getPathByPathInfo(pathInfo, escape) {
      return pathInfo.map(function (info) {
        return escape ? (0, _utils.getEscapedFileName)(info.name) : info.name;
      }).join(_utils.PATH_SEPARATOR);
    };
    return FileSystemItem;
  }();
  var _default = FileSystemItem;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/type","./utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/type"), require("./utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=file_system_item.js.map