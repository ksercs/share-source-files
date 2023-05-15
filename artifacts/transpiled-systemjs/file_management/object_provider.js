!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/file_management/object_provider.js"], ["../core/utils/common","../core/utils/data","../core/guid","../core/utils/type","../data/errors","../core/utils/deferred","../core/utils/window","../exporter/file_saver","../ui/widget/ui.errors","jszip","./provider_base","./error","./error_codes","./utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/file_management/object_provider.js", ["../core/utils/common", "../core/utils/data", "../core/guid", "../core/utils/type", "../data/errors", "../core/utils/deferred", "../core/utils/window", "../exporter/file_saver", "../ui/widget/ui.errors", "jszip", "./provider_base", "./error", "./error_codes", "./utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _common = $__require("../core/utils/common");
  var _data = $__require("../core/utils/data");
  var _guid = _interopRequireDefault($__require("../core/guid"));
  var _type = $__require("../core/utils/type");
  var _errors = $__require("../data/errors");
  var _deferred = $__require("../core/utils/deferred");
  var _window = $__require("../core/utils/window");
  var _file_saver = $__require("../exporter/file_saver");
  var _ui = _interopRequireDefault($__require("../ui/widget/ui.errors"));
  var _jszip = _interopRequireDefault($__require("jszip"));
  var _provider_base = _interopRequireDefault($__require("./provider_base"));
  var _error = _interopRequireDefault($__require("./error"));
  var _error_codes = _interopRequireDefault($__require("./error_codes"));
  var _utils = $__require("./utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var window = (0, _window.getWindow)();
  var ObjectFileSystemProvider = /*#__PURE__*/function (_FileSystemProviderBa) {
    _inheritsLoose(ObjectFileSystemProvider, _FileSystemProviderBa);
    function ObjectFileSystemProvider(options) {
      var _this;
      options = (0, _common.ensureDefined)(options, {});
      _this = _FileSystemProviderBa.call(this, options) || this;
      var initialArray = options.data;
      if (initialArray && !Array.isArray(initialArray)) {
        throw _errors.errors.Error('E4006');
      }
      var itemsExpr = options.itemsExpr || 'items';
      _this._subFileItemsGetter = (0, _data.compileGetter)(itemsExpr);
      _this._subFileItemsSetter = _this._getSetter(itemsExpr);
      var contentExpr = options.contentExpr || 'content';
      _this._contentGetter = (0, _data.compileGetter)(contentExpr);
      _this._contentSetter = _this._getSetter(contentExpr);
      var nameExpr = _this._getNameExpr(options);
      _this._nameSetter = _this._getSetter(nameExpr);
      var isDirExpr = _this._getIsDirExpr(options);
      _this._getIsDirSetter = _this._getSetter(isDirExpr);
      var keyExpr = _this._getKeyExpr(options);
      _this._keySetter = _this._getSetter(keyExpr);
      var sizeExpr = _this._getSizeExpr(options);
      _this._sizeSetter = _this._getSetter(sizeExpr);
      var dateModifiedExpr = _this._getDateModifiedExpr(options);
      _this._dateModifiedSetter = _this._getSetter(dateModifiedExpr);
      _this._data = initialArray || [];
      return _this;
    }
    var _proto = ObjectFileSystemProvider.prototype;
    _proto.getItems = function getItems(parentDir) {
      var _this2 = this;
      return this._executeActionAsDeferred(function () {
        return _this2._getItems(parentDir);
      }, true);
    };
    _proto.renameItem = function renameItem(item, name) {
      var _this3 = this;
      return this._executeActionAsDeferred(function () {
        return _this3._renameItemCore(item, name);
      });
    };
    _proto._renameItemCore = function _renameItemCore(item, name) {
      if (!item) {
        return;
      }
      var dataItem = this._findDataObject(item);
      this._nameSetter(dataItem, name);
      item.name = name;
      item.key = this._ensureDataObjectKey(dataItem);
    };
    _proto.createDirectory = function createDirectory(parentDir, name) {
      var _this4 = this;
      return this._executeActionAsDeferred(function () {
        _this4._validateDirectoryExists(parentDir);
        _this4._createDataObject(parentDir, name, true);
      });
    };
    _proto.deleteItems = function deleteItems(items) {
      var _this5 = this;
      return items.map(function (item) {
        return _this5._executeActionAsDeferred(function () {
          return _this5._deleteItem(item);
        });
      });
    };
    _proto.moveItems = function moveItems(items, destinationDir) {
      var _this6 = this;
      var destinationDataItem = this._findDataObject(destinationDir);
      var array = this._getDirectoryDataItems(destinationDataItem);
      var deferreds = items.map(function (item) {
        return _this6._executeActionAsDeferred(function () {
          _this6._checkAbilityToMoveOrCopyItem(item, destinationDir);
          var dataItem = _this6._findDataObject(item);
          _this6._deleteItem(item);
          array.push(dataItem);
        });
      });
      return deferreds;
    };
    _proto.copyItems = function copyItems(items, destinationDir) {
      var _this7 = this;
      var destinationDataItem = this._findDataObject(destinationDir);
      var array = this._getDirectoryDataItems(destinationDataItem);
      var deferreds = items.map(function (item) {
        return _this7._executeActionAsDeferred(function () {
          _this7._checkAbilityToMoveOrCopyItem(item, destinationDir);
          var dataItem = _this7._findDataObject(item);
          var copiedItem = _this7._createCopy(dataItem);
          array.push(copiedItem);
        });
      });
      return deferreds;
    };
    _proto.uploadFileChunk = function uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
      var _this8 = this;
      if (chunksInfo.chunkIndex > 0) {
        return chunksInfo.customData.deferred;
      }
      this._validateDirectoryExists(destinationDirectory);
      var deferred = chunksInfo.customData.deferred = new _deferred.Deferred();
      var reader = this._createFileReader();
      reader.readAsDataURL(fileData);
      reader.onload = function () {
        var content = reader.result.split(',')[1];
        var dataObj = _this8._createDataObject(destinationDirectory, fileData.name, false);
        _this8._sizeSetter(dataObj, fileData.size);
        _this8._dateModifiedSetter(dataObj, fileData.lastModifiedDate);
        _this8._contentSetter(dataObj, content);
        deferred.resolve();
      };
      reader.onerror = function (error) {
        return deferred.reject(error);
      };
      return deferred;
    };
    _proto.downloadItems = function downloadItems(items) {
      if (items.length === 1) {
        this._downloadSingleFile(items[0]);
      } else {
        this._downloadMultipleFiles(items);
      }
    };
    _proto._downloadSingleFile = function _downloadSingleFile(file) {
      var content = this._getFileContent(file);
      var byteString = window.atob(content);
      var arrayBuffer = new ArrayBuffer(byteString.length);
      var array = new Uint8Array(arrayBuffer);
      for (var i = 0; i < byteString.length; i++) {
        array[i] = byteString.charCodeAt(i);
      }
      var blob = new window.Blob([arrayBuffer], {
        type: 'application/octet-stream'
      });
      _file_saver.fileSaver.saveAs(file.name, null, blob);
    };
    _proto._downloadMultipleFiles = function _downloadMultipleFiles(files) {
      var _this9 = this;
      var jsZip = getJSZip();
      var zip = new jsZip();
      files.forEach(function (file) {
        return zip.file(file.name, _this9._getFileContent(file), {
          base64: true
        });
      });
      var options = {
        type: 'blob',
        compression: 'DEFLATE',
        mimeType: 'application/zip'
      };
      var deferred = new _deferred.Deferred();
      if (zip.generateAsync) {
        zip.generateAsync(options).then(deferred.resolve);
      } else {
        deferred.resolve(zip.generate(options));
      }
      deferred.done(function (blob) {
        return _file_saver.fileSaver.saveAs('files.zip', null, blob);
      });
    };
    _proto._getFileContent = function _getFileContent(file) {
      var dataItem = this._findDataObject(file);
      return this._contentGetter(dataItem) || '';
    };
    _proto._validateDirectoryExists = function _validateDirectoryExists(directoryInfo) {
      if (!this._isFileItemExists(directoryInfo) || this._isDirGetter(directoryInfo.fileItem)) {
        throw new _error.default(_error_codes.default.DirectoryNotFound, directoryInfo);
      }
    };
    _proto._checkAbilityToMoveOrCopyItem = function _checkAbilityToMoveOrCopyItem(item, destinationDir) {
      var _this10 = this;
      var dataItem = this._findDataObject(item);
      var itemKey = this._getKeyFromDataObject(dataItem, item.parentPath);
      var pathInfo = destinationDir.getFullPathInfo();
      var currentPath = '';
      pathInfo.forEach(function (info) {
        currentPath = (0, _utils.pathCombine)(currentPath, info.name);
        var pathKey = _this10._getDataObjectKey(info.key, currentPath);
        if (pathKey === itemKey) {
          throw new _error.default(_error_codes.default.Other, item);
        }
      });
    };
    _proto._createDataObject = function _createDataObject(parentDir, name, isDirectory) {
      var dataObj = {};
      this._nameSetter(dataObj, name);
      this._getIsDirSetter(dataObj, isDirectory);
      this._keySetter(dataObj, String(new _guid.default()));
      var parentDataItem = this._findDataObject(parentDir);
      var array = this._getDirectoryDataItems(parentDataItem);
      array.push(dataObj);
      return dataObj;
    };
    _proto._createCopy = function _createCopy(dataObj) {
      var _this11 = this;
      var copyObj = {};
      this._nameSetter(copyObj, this._nameGetter(dataObj));
      this._getIsDirSetter(copyObj, this._isDirGetter(dataObj));
      var items = this._subFileItemsGetter(dataObj);
      if (Array.isArray(items)) {
        var itemsCopy = [];
        items.forEach(function (childItem) {
          var childCopy = _this11._createCopy(childItem);
          itemsCopy.push(childCopy);
        });
        this._subFileItemsSetter(copyObj, itemsCopy);
      }
      return copyObj;
    };
    _proto._deleteItem = function _deleteItem(fileItem) {
      var dataItem = this._findDataObject(fileItem);
      var parentDirDataObj = this._findFileItemObj(fileItem.pathInfo);
      var array = this._getDirectoryDataItems(parentDirDataObj);
      var index = array.indexOf(dataItem);
      array.splice(index, 1);
    };
    _proto._getDirectoryDataItems = function _getDirectoryDataItems(directoryDataObj) {
      if (!directoryDataObj) {
        return this._data;
      }
      var dataItems = this._subFileItemsGetter(directoryDataObj);
      if (!Array.isArray(dataItems)) {
        dataItems = [];
        this._subFileItemsSetter(directoryDataObj, dataItems);
      }
      return dataItems;
    };
    _proto._getItems = function _getItems(parentDir) {
      this._validateDirectoryExists(parentDir);
      var pathInfo = parentDir.getFullPathInfo();
      var parentDirKey = pathInfo && pathInfo.length > 0 ? pathInfo[pathInfo.length - 1].key : null;
      var dirFileObjects = this._data;
      if (parentDirKey) {
        var directoryEntry = this._findFileItemObj(pathInfo);
        dirFileObjects = directoryEntry && this._subFileItemsGetter(directoryEntry) || [];
      }
      this._ensureKeysForDuplicateNameItems(dirFileObjects);
      return this._convertDataObjectsToFileItems(dirFileObjects, pathInfo);
    };
    _proto._ensureKeysForDuplicateNameItems = function _ensureKeysForDuplicateNameItems(dataObjects) {
      var _this12 = this;
      var names = {};
      dataObjects.forEach(function (obj) {
        var name = _this12._nameGetter(obj);
        if (names[name]) {
          _this12._ensureDataObjectKey(obj);
        } else {
          names[name] = true;
        }
      });
    };
    _proto._findDataObject = function _findDataObject(item) {
      if (item.isRoot()) {
        return null;
      }
      var result = this._findFileItemObj(item.getFullPathInfo());
      if (!result) {
        var errorCode = item.isDirectory ? _error_codes.default.DirectoryNotFound : _error_codes.default.FileNotFound;
        throw new _error.default(errorCode, item);
      }
      return result;
    };
    _proto._findFileItemObj = function _findFileItemObj(pathInfo) {
      var _this13 = this;
      if (!Array.isArray(pathInfo)) {
        pathInfo = [];
      }
      var currentPath = '';
      var fileItemObj = null;
      var fileItemObjects = this._data;
      var _loop = function _loop(i) {
        fileItemObj = fileItemObjects.find(function (item) {
          var hasCorrectFileItemType = _this13._isDirGetter(item) || i === pathInfo.length - 1;
          return _this13._getKeyFromDataObject(item, currentPath) === pathInfo[i].key && _this13._nameGetter(item) === pathInfo[i].name && hasCorrectFileItemType;
        });
        if (fileItemObj) {
          currentPath = (0, _utils.pathCombine)(currentPath, _this13._nameGetter(fileItemObj));
          fileItemObjects = _this13._subFileItemsGetter(fileItemObj);
        }
      };
      for (var i = 0; i < pathInfo.length && (i === 0 || fileItemObj); i++) {
        _loop(i);
      }
      return fileItemObj;
    };
    _proto._getKeyFromDataObject = function _getKeyFromDataObject(dataObj, defaultKeyPrefix) {
      var key = this._keyGetter(dataObj);
      var relativeName = (0, _utils.pathCombine)(defaultKeyPrefix, this._nameGetter(dataObj));
      return this._getDataObjectKey(key, relativeName);
    };
    _proto._getDataObjectKey = function _getDataObjectKey(key, relativeName) {
      return key ? key : relativeName;
    };
    _proto._ensureDataObjectKey = function _ensureDataObjectKey(dataObj) {
      var key = this._keyGetter(dataObj);
      if (!key) {
        key = String(new _guid.default());
        this._keySetter(dataObj, key);
      }
      return key;
    };
    _proto._hasSubDirs = function _hasSubDirs(dataObj) {
      var subItems = (0, _common.ensureDefined)(this._subFileItemsGetter(dataObj), []);
      if (!Array.isArray(subItems)) {
        return true;
      }
      for (var i = 0; i < subItems.length; i++) {
        if (this._isDirGetter(subItems[i]) === true) {
          return true;
        }
      }
      return false;
    };
    _proto._getSetter = function _getSetter(expr) {
      return (0, _type.isFunction)(expr) ? expr : (0, _data.compileSetter)(expr);
    };
    _proto._isFileItemExists = function _isFileItemExists(fileItem) {
      return fileItem.isDirectory && fileItem.isRoot() || !!this._findFileItemObj(fileItem.getFullPathInfo());
    };
    _proto._createFileReader = function _createFileReader() {
      return new window.FileReader();
    };
    return ObjectFileSystemProvider;
  }(_provider_base.default);
  function getJSZip() {
    if (!_jszip.default) {
      throw _ui.default.Error('E1041', 'JSZip');
    }
    return _jszip.default;
  }
  var _default = ObjectFileSystemProvider;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/common","../core/utils/data","../core/guid","../core/utils/type","../data/errors","../core/utils/deferred","../core/utils/window","../exporter/file_saver","../ui/widget/ui.errors","jszip","./provider_base","./error","./error_codes","./utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/common"), require("../core/utils/data"), require("../core/guid"), require("../core/utils/type"), require("../data/errors"), require("../core/utils/deferred"), require("../core/utils/window"), require("../exporter/file_saver"), require("../ui/widget/ui.errors"), require("jszip"), require("./provider_base"), require("./error"), require("./error_codes"), require("./utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=object_provider.js.map