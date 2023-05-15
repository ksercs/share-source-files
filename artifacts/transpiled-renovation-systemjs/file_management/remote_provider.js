!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/file_management/remote_provider.js"], ["../core/renderer","../core/utils/ajax","../core/utils/common","../core/guid","../core/utils/window","../core/utils/iterator","../core/utils/deferred","../events/core/events_engine","./provider_base","../core/utils/data","../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/file_management/remote_provider.js", ["../core/renderer", "../core/utils/ajax", "../core/utils/common", "../core/guid", "../core/utils/window", "../core/utils/iterator", "../core/utils/deferred", "../events/core/events_engine", "./provider_base", "../core/utils/data", "../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _ajax = _interopRequireDefault($__require("../core/utils/ajax"));
  var _common = $__require("../core/utils/common");
  var _guid = _interopRequireDefault($__require("../core/guid"));
  var _window = $__require("../core/utils/window");
  var _iterator = $__require("../core/utils/iterator");
  var _deferred = $__require("../core/utils/deferred");
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _provider_base = _interopRequireDefault($__require("./provider_base"));
  var _data2 = $__require("../core/utils/data");
  var _type = $__require("../core/utils/type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
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
  var FILE_CHUNK_BLOB_NAME = 'chunk';
  var FILE_SYSTEM_COMMNAD = {
    GET_DIR_CONTENTS: 'GetDirContents',
    CREATE_DIR: 'CreateDir',
    RENAME: 'Rename',
    MOVE: 'Move',
    COPY: 'Copy',
    REMOVE: 'Remove',
    UPLOAD_CHUNK: 'UploadChunk',
    ABORT_UPLOAD: 'AbortUpload',
    DOWLOAD: 'Download'
  };
  var REQUEST_METHOD = {
    GET: 'GET',
    POST: 'POST'
  };
  var RemoteFileSystemProvider = /*#__PURE__*/function (_FileSystemProviderBa) {
    _inheritsLoose(RemoteFileSystemProvider, _FileSystemProviderBa);
    function RemoteFileSystemProvider(options) {
      var _this;
      options = (0, _common.ensureDefined)(options, {});
      _this = _FileSystemProviderBa.call(this, options) || this;
      _this._endpointUrl = options.endpointUrl;
      _this._beforeAjaxSend = options.beforeAjaxSend;
      _this._beforeSubmit = options.beforeSubmit;
      _this._requestHeaders = options.requestHeaders;
      _this._hasSubDirsGetter = (0, _data2.compileGetter)(options.hasSubDirectoriesExpr || 'hasSubDirectories');
      return _this;
    }
    var _proto = RemoteFileSystemProvider.prototype;
    _proto.getItems = function getItems(parentDir) {
      var _this2 = this;
      var pathInfo = parentDir.getFullPathInfo();
      return this._executeRequest(FILE_SYSTEM_COMMNAD.GET_DIR_CONTENTS, {
        pathInfo: pathInfo
      }).then(function (result) {
        return _this2._convertDataObjectsToFileItems(result.result, pathInfo);
      });
    };
    _proto.renameItem = function renameItem(item, name) {
      return this._executeRequest(FILE_SYSTEM_COMMNAD.RENAME, {
        pathInfo: item.getFullPathInfo(),
        isDirectory: item.isDirectory,
        name: name
      });
    };
    _proto.createDirectory = function createDirectory(parentDir, name) {
      return this._executeRequest(FILE_SYSTEM_COMMNAD.CREATE_DIR, {
        pathInfo: parentDir.getFullPathInfo(),
        name: name
      });
    };
    _proto.deleteItems = function deleteItems(items) {
      var _this3 = this;
      return items.map(function (item) {
        return _this3._executeRequest(FILE_SYSTEM_COMMNAD.REMOVE, {
          pathInfo: item.getFullPathInfo(),
          isDirectory: item.isDirectory
        });
      });
    };
    _proto.moveItems = function moveItems(items, destinationDirectory) {
      var _this4 = this;
      return items.map(function (item) {
        return _this4._executeRequest(FILE_SYSTEM_COMMNAD.MOVE, {
          sourcePathInfo: item.getFullPathInfo(),
          sourceIsDirectory: item.isDirectory,
          destinationPathInfo: destinationDirectory.getFullPathInfo()
        });
      });
    };
    _proto.copyItems = function copyItems(items, destinationFolder) {
      var _this5 = this;
      return items.map(function (item) {
        return _this5._executeRequest(FILE_SYSTEM_COMMNAD.COPY, {
          sourcePathInfo: item.getFullPathInfo(),
          sourceIsDirectory: item.isDirectory,
          destinationPathInfo: destinationFolder.getFullPathInfo()
        });
      });
    };
    _proto.uploadFileChunk = function uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
      var _data;
      if (chunksInfo.chunkIndex === 0) {
        chunksInfo.customData.uploadId = new _guid.default();
      }
      var args = {
        destinationPathInfo: destinationDirectory.getFullPathInfo(),
        chunkMetadata: JSON.stringify({
          UploadId: chunksInfo.customData.uploadId,
          FileName: fileData.name,
          Index: chunksInfo.chunkIndex,
          TotalCount: chunksInfo.chunkCount,
          FileSize: fileData.size
        })
      };
      var ajaxSettings = {
        url: this._endpointUrl,
        headers: this._requestHeaders || {},
        method: REQUEST_METHOD.POST,
        dataType: 'json',
        data: (_data = {}, _defineProperty(_data, FILE_CHUNK_BLOB_NAME, chunksInfo.chunkBlob), _defineProperty(_data, "arguments", JSON.stringify(args)), _defineProperty(_data, "command", FILE_SYSTEM_COMMNAD.UPLOAD_CHUNK), _data),
        upload: {
          onprogress: _common.noop,
          onloadstart: _common.noop,
          onabort: _common.noop
        },
        xhrFields: {},
        cache: false
      };
      var deferred = new _deferred.Deferred();
      this._beforeSendInternal(ajaxSettings);
      _ajax.default.sendRequest(ajaxSettings).done(function (result) {
        !result.success && deferred.reject(result) || deferred.resolve();
      }).fail(deferred.reject);
      return deferred.promise();
    };
    _proto.abortFileUpload = function abortFileUpload(fileData, chunksInfo, destinationDirectory) {
      return this._executeRequest(FILE_SYSTEM_COMMNAD.ABORT_UPLOAD, {
        uploadId: chunksInfo.customData.uploadId
      });
    };
    _proto.downloadItems = function downloadItems(items) {
      var args = this._getDownloadArgs(items);
      var $form = (0, _renderer.default)('<form>').css({
        display: 'none'
      }).attr({
        method: REQUEST_METHOD.POST,
        action: args.url
      });
      var formDataEntries = {
        command: args.command,
        arguments: args.arguments
      };
      this._beforeSubmitInternal(formDataEntries);
      this._appendFormDataInputsToForm(formDataEntries, $form);
      $form.appendTo('body');
      _events_engine.default.trigger($form, 'submit');
      setTimeout(function () {
        return $form.remove();
      });
    };
    _proto.getItemsContent = function getItemsContent(items) {
      var args = this._getDownloadArgs(items);
      var ajaxSettings = {
        url: args.url,
        headers: this._requestHeaders || {},
        method: REQUEST_METHOD.POST,
        responseType: 'arraybuffer',
        data: {
          command: args.command,
          arguments: args.arguments
        },
        upload: {
          onprogress: _common.noop,
          onloadstart: _common.noop,
          onabort: _common.noop
        },
        xhrFields: {},
        cache: false
      };
      this._beforeSendInternal(ajaxSettings);
      return _ajax.default.sendRequest(ajaxSettings);
    };
    _proto._getDownloadArgs = function _getDownloadArgs(items) {
      var pathInfoList = items.map(function (item) {
        return item.getFullPathInfo();
      });
      var args = {
        pathInfoList: pathInfoList
      };
      var argsStr = JSON.stringify(args);
      return {
        url: this._endpointUrl,
        arguments: argsStr,
        command: FILE_SYSTEM_COMMNAD.DOWLOAD
      };
    };
    _proto._getItemsIds = function _getItemsIds(items) {
      return items.map(function (it) {
        return it.relativeName;
      });
    };
    _proto._executeRequest = function _executeRequest(command, args) {
      var method = command === FILE_SYSTEM_COMMNAD.GET_DIR_CONTENTS ? REQUEST_METHOD.GET : REQUEST_METHOD.POST;
      var deferred = new _deferred.Deferred();
      var ajaxSettings = {
        url: this._getEndpointUrl(command, args),
        headers: this._requestHeaders || {},
        method: method,
        dataType: 'json',
        data: {},
        xhrFields: {},
        cache: false
      };
      this._beforeSendInternal(ajaxSettings);
      _ajax.default.sendRequest(ajaxSettings).then(function (result) {
        !result.success && deferred.reject(result) || deferred.resolve(result);
      }, function (e) {
        return deferred.reject(e);
      });
      return deferred.promise();
    };
    _proto._beforeSubmitInternal = function _beforeSubmitInternal(formDataEntries) {
      if ((0, _type.isFunction)(this._beforeSubmit)) {
        this._beforeSubmit({
          formData: formDataEntries
        });
      }
    };
    _proto._beforeSendInternal = function _beforeSendInternal(ajaxSettings) {
      if ((0, _type.isFunction)(this._beforeAjaxSend)) {
        var ajaxArguments = {
          headers: ajaxSettings.headers,
          formData: ajaxSettings.data,
          xhrFields: ajaxSettings.xhrFields
        };
        this._beforeAjaxSend(ajaxArguments);
        ajaxSettings.headers = ajaxArguments.headers;
        ajaxSettings.data = ajaxArguments.formData;
        ajaxSettings.xhrFields = ajaxArguments.xhrFields;
      }
      if ((0, _type.isEmptyObject)(ajaxSettings.data)) {
        delete ajaxSettings.data;
      } else {
        if (ajaxSettings.responseType || ajaxSettings.upload) {
          // if using core.utils.ajax
          ajaxSettings.data = this._createFormData(ajaxSettings.data);
        }
        // else using jQuery.ajax, keep plain object
      }
    };
    _proto._createFormData = function _createFormData(formDataEntries) {
      var formData = new window.FormData();
      for (var entryName in formDataEntries) {
        if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && (0, _type.isDefined)(formDataEntries[entryName])) {
          formData.append(entryName, formDataEntries[entryName]);
        }
      }
      return formData;
    };
    _proto._appendFormDataInputsToForm = function _appendFormDataInputsToForm(formDataEntries, formElement) {
      for (var entryName in formDataEntries) {
        if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && (0, _type.isDefined)(formDataEntries[entryName])) {
          (0, _renderer.default)('<input>').attr({
            type: 'hidden',
            name: entryName,
            value: formDataEntries[entryName]
          }).appendTo(formElement);
        }
      }
    };
    _proto._getEndpointUrl = function _getEndpointUrl(command, args) {
      var queryString = this._getQueryString({
        command: command,
        arguments: JSON.stringify(args)
      });
      var separator = this._endpointUrl && this._endpointUrl.indexOf('?') > 0 ? '&' : '?';
      return this._endpointUrl + separator + queryString;
    };
    _proto._getQueryString = function _getQueryString(params) {
      var pairs = [];
      var keys = Object.keys(params);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = params[key];
        if (value === undefined) {
          continue;
        }
        if (value === null) {
          value = '';
        }
        if (Array.isArray(value)) {
          this._processQueryStringArrayParam(key, value, pairs);
        } else {
          var pair = this._getQueryStringPair(key, value);
          pairs.push(pair);
        }
      }
      return pairs.join('&');
    };
    _proto._processQueryStringArrayParam = function _processQueryStringArrayParam(key, array, pairs) {
      var _this6 = this;
      (0, _iterator.each)(array, function (_, item) {
        var pair = _this6._getQueryStringPair(key, item);
        pairs.push(pair);
      });
    };
    _proto._getQueryStringPair = function _getQueryStringPair(key, value) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    };
    _proto._hasSubDirs = function _hasSubDirs(dataObj) {
      var hasSubDirs = this._hasSubDirsGetter(dataObj);
      return typeof hasSubDirs === 'boolean' ? hasSubDirs : true;
    };
    _proto._getKeyExpr = function _getKeyExpr(options) {
      return options.keyExpr || 'key';
    };
    return RemoteFileSystemProvider;
  }(_provider_base.default);
  var _default = RemoteFileSystemProvider;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","../core/utils/ajax","../core/utils/common","../core/guid","../core/utils/window","../core/utils/iterator","../core/utils/deferred","../events/core/events_engine","./provider_base","../core/utils/data","../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("../core/utils/ajax"), require("../core/utils/common"), require("../core/guid"), require("../core/utils/window"), require("../core/utils/iterator"), require("../core/utils/deferred"), require("../events/core/events_engine"), require("./provider_base"), require("../core/utils/data"), require("../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=remote_provider.js.map