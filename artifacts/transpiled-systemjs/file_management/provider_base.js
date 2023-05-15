!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/file_management/provider_base.js"], ["../core/utils/data","../core/utils/common","../core/utils/date_serialization","../core/utils/iterator","../core/utils/type","../core/utils/deferred","./file_system_item"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/file_management/provider_base.js", ["../core/utils/data", "../core/utils/common", "../core/utils/date_serialization", "../core/utils/iterator", "../core/utils/type", "../core/utils/deferred", "./file_system_item"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _data = $__require("../core/utils/data");
  var _common = $__require("../core/utils/common");
  var _date_serialization = _interopRequireDefault($__require("../core/utils/date_serialization"));
  var _iterator = $__require("../core/utils/iterator");
  var _type = $__require("../core/utils/type");
  var _deferred = $__require("../core/utils/deferred");
  var _file_system_item = _interopRequireDefault($__require("./file_system_item"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DEFAULT_FILE_UPLOAD_CHUNK_SIZE = 200000;
  var FileSystemProviderBase = /*#__PURE__*/function () {
    function FileSystemProviderBase(options) {
      options = (0, _common.ensureDefined)(options, {});
      this._keyGetter = (0, _data.compileGetter)(this._getKeyExpr(options));
      this._nameGetter = (0, _data.compileGetter)(this._getNameExpr(options));
      this._isDirGetter = (0, _data.compileGetter)(this._getIsDirExpr(options));
      this._sizeGetter = (0, _data.compileGetter)(this._getSizeExpr(options));
      this._dateModifiedGetter = (0, _data.compileGetter)(this._getDateModifiedExpr(options));
      this._thumbnailGetter = (0, _data.compileGetter)(options.thumbnailExpr || 'thumbnail');
    }
    var _proto = FileSystemProviderBase.prototype;
    _proto.getItems = function getItems(parentDirectory) {
      return [];
    };
    _proto.renameItem = function renameItem(item, name) {};
    _proto.createDirectory = function createDirectory(parentDirectory, name) {};
    _proto.deleteItems = function deleteItems(items) {};
    _proto.moveItems = function moveItems(items, destinationDirectory) {};
    _proto.copyItems = function copyItems(items, destinationDirectory) {};
    _proto.uploadFileChunk = function uploadFileChunk(fileData, chunksInfo, destinationDirectory) {};
    _proto.abortFileUpload = function abortFileUpload(fileData, chunksInfo, destinationDirectory) {};
    _proto.downloadItems = function downloadItems(items) {};
    _proto.getItemsContent = function getItemsContent(items) {};
    _proto.getFileUploadChunkSize = function getFileUploadChunkSize() {
      return DEFAULT_FILE_UPLOAD_CHUNK_SIZE;
    };
    _proto._convertDataObjectsToFileItems = function _convertDataObjectsToFileItems(entries, pathInfo) {
      var _this = this;
      var result = [];
      (0, _iterator.each)(entries, function (_, entry) {
        var fileItem = _this._createFileItem(entry, pathInfo);
        result.push(fileItem);
      });
      return result;
    };
    _proto._createFileItem = function _createFileItem(dataObj, pathInfo) {
      var key = this._keyGetter(dataObj);
      var fileItem = new _file_system_item.default(pathInfo, this._nameGetter(dataObj), !!this._isDirGetter(dataObj), key);
      fileItem.size = this._sizeGetter(dataObj);
      if (fileItem.size === undefined) {
        fileItem.size = 0;
      }
      fileItem.dateModified = _date_serialization.default.deserializeDate(this._dateModifiedGetter(dataObj));
      if (fileItem.dateModified === undefined) {
        fileItem.dateModified = new Date();
      }
      if (fileItem.isDirectory) {
        fileItem.hasSubDirectories = this._hasSubDirs(dataObj);
      }
      if (!key) {
        fileItem.key = fileItem.relativeName;
      }
      fileItem.thumbnail = this._thumbnailGetter(dataObj) || '';
      fileItem.dataItem = dataObj;
      return fileItem;
    };
    _proto._hasSubDirs = function _hasSubDirs(dataObj) {
      return true;
    };
    _proto._getKeyExpr = function _getKeyExpr(options) {
      return options.keyExpr || this._defaultKeyExpr;
    };
    _proto._defaultKeyExpr = function _defaultKeyExpr(fileItem) {
      if (arguments.length === 2) {
        fileItem.__KEY__ = arguments[1];
        return;
      }
      return Object.prototype.hasOwnProperty.call(fileItem, '__KEY__') ? fileItem.__KEY__ : null;
    };
    _proto._getNameExpr = function _getNameExpr(options) {
      return options.nameExpr || 'name';
    };
    _proto._getIsDirExpr = function _getIsDirExpr(options) {
      return options.isDirectoryExpr || 'isDirectory';
    };
    _proto._getSizeExpr = function _getSizeExpr(options) {
      return options.sizeExpr || 'size';
    };
    _proto._getDateModifiedExpr = function _getDateModifiedExpr(options) {
      return options.dateModifiedExpr || 'dateModified';
    };
    _proto._executeActionAsDeferred = function _executeActionAsDeferred(action, keepResult) {
      var deferred = new _deferred.Deferred();
      try {
        var result = action();
        if ((0, _type.isPromise)(result)) {
          (0, _deferred.fromPromise)(result).done(function (userResult) {
            return deferred.resolve(keepResult && userResult || undefined);
          }).fail(function (error) {
            return deferred.reject(error);
          });
        } else {
          deferred.resolve(keepResult && result || undefined);
        }
      } catch (error) {
        return deferred.reject(error);
      }
      return deferred.promise();
    };
    return FileSystemProviderBase;
  }();
  var _default = FileSystemProviderBase;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/data","../core/utils/common","../core/utils/date_serialization","../core/utils/iterator","../core/utils/type","../core/utils/deferred","./file_system_item"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/data"), require("../core/utils/common"), require("../core/utils/date_serialization"), require("../core/utils/iterator"), require("../core/utils/type"), require("../core/utils/deferred"), require("./file_system_item"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=provider_base.js.map