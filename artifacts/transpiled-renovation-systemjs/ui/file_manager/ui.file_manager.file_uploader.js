!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.file_uploader.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/deferred","../../core/utils/window","../../core/guid","../widget/ui.widget","../file_uploader","./ui.file_manager.common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.file_uploader.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/extend", "../../core/utils/deferred", "../../core/utils/window", "../../core/guid", "../widget/ui.widget", "../file_uploader", "./ui.file_manager.common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _deferred = $__require("../../core/utils/deferred");
  var _window = $__require("../../core/utils/window");
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _file_uploader = _interopRequireDefault($__require("../file_uploader"));
  var _uiFile_manager = $__require("./ui.file_manager.common");
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
  var FILE_MANAGER_FILE_UPLOADER_CLASS = 'dx-filemanager-fileuploader';
  var FILE_MANAGER_FILE_UPLOADER_DROPZONE_PLACEHOLER_CLASS = 'dx-filemanager-fileuploader-dropzone-placeholder';
  var FileManagerFileUploader = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(FileManagerFileUploader, _Widget);
    function FileManagerFileUploader() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = FileManagerFileUploader.prototype;
    _proto._initMarkup = function _initMarkup() {
      this._initActions();
      this.$element().addClass(FILE_MANAGER_FILE_UPLOADER_CLASS);
      this._uploaderInfos = [];
      this._createInternalFileUploader();
      this._createDropZonePlaceholder();
      this._setDropZonePlaceholderVisible(false);
      _Widget.prototype._initMarkup.call(this);
    };
    _proto._createInternalFileUploader = function _createInternalFileUploader() {
      var _this = this;
      var chunkSize = this._getController().chunkSize;
      var $fileUploader = (0, _renderer.default)('<div>').appendTo(this.$element());
      var fileUploader = this._createComponent($fileUploader, _file_uploader.default, {
        name: 'file',
        multiple: true,
        showFileList: false,
        activeStateEnabled: false,
        focusStateEnabled: false,
        hoverStateEnabled: false,
        labelText: '',
        readyToUploadMessage: '',
        accept: '*',
        chunkSize: chunkSize,
        dropZone: this.option('dropZone'),
        onValueChanged: function onValueChanged(e) {
          return _this._onFileUploaderValueChanged(e);
        },
        onProgress: function onProgress(e) {
          return _this._onFileUploaderProgress(e);
        },
        onUploaded: function onUploaded(e) {
          return _this._onFileUploaderUploaded(e);
        },
        onFilesUploaded: function onFilesUploaded(e) {
          return _this._onFileUploaderAllFilesUploaded(e);
        },
        onUploadAborted: function onUploadAborted(e) {
          return _this._onFileUploaderUploadAborted(e);
        },
        onUploadError: function onUploadError(e) {
          return _this._onFileUploaderUploadError(e);
        },
        onDropZoneEnter: function onDropZoneEnter() {
          return _this._setDropZonePlaceholderVisible(true);
        },
        onDropZoneLeave: function onDropZoneLeave() {
          return _this._setDropZonePlaceholderVisible(false);
        }
      });
      fileUploader.option({
        uploadChunk: function uploadChunk(file, chunksData) {
          return _this._fileUploaderUploadChunk(fileUploader, file, chunksData);
        },
        abortUpload: function abortUpload(file, chunksData) {
          return _this._fileUploaderAbortUpload(fileUploader, file, chunksData);
        }
      });
      fileUploader._shouldRaiseDragLeaveBase = fileUploader._shouldRaiseDragLeave;
      fileUploader._shouldRaiseDragLeave = function (e) {
        return _this._shouldRaiseDragLeave(e, fileUploader);
      };
      var uploaderInfo = {
        fileUploader: fileUploader
      };
      this._uploaderInfos.push(uploaderInfo);
    };
    _proto.tryUpload = function tryUpload() {
      var info = this._findAndUpdateAvailableUploaderInfo();
      if (info) {
        info.fileUploader._selectButtonClickHandler();
      }
    };
    _proto.cancelUpload = function cancelUpload(sessionId) {
      this._cancelUpload(sessionId);
    };
    _proto.cancelFileUpload = function cancelFileUpload(sessionId, fileIndex) {
      this._cancelUpload(sessionId, fileIndex);
    };
    _proto._cancelUpload = function _cancelUpload(sessionId, fileIndex) {
      var _this$_findUploaderIn = this._findUploaderInfoBySessionId(sessionId),
          fileUploader = _this$_findUploaderIn.fileUploader;
      fileUploader.abortUpload(fileIndex);
    };
    _proto._fileUploaderUploadChunk = function _fileUploaderUploadChunk(fileUploader, file, chunksInfo) {
      var _this$_findSessionByF = this._findSessionByFile(fileUploader, file),
          session = _this$_findSessionByF.session,
          fileIndex = _this$_findSessionByF.fileIndex;
      var controller = session.controller;
      chunksInfo.fileIndex = fileIndex;
      return controller.uploadFileChunk(file, chunksInfo);
    };
    _proto._fileUploaderAbortUpload = function _fileUploaderAbortUpload(fileUploader, file, chunksInfo) {
      var _this$_findSessionByF2 = this._findSessionByFile(fileUploader, file),
          session = _this$_findSessionByF2.session,
          fileIndex = _this$_findSessionByF2.fileIndex;
      var controller = session.controller;
      chunksInfo.fileIndex = fileIndex;
      return controller.abortFileUpload(file, chunksInfo);
    };
    _proto._onFileUploaderValueChanged = function _onFileUploaderValueChanged(_ref) {
      var _this2 = this;
      var component = _ref.component,
          value = _ref.value;
      if (value.length === 0) {
        return;
      }
      var files = value.slice();
      var uploaderInfo = this._findUploaderInfo(component);
      this._uploadFiles(uploaderInfo, files);
      setTimeout(function () {
        if (!_this2._findAndUpdateAvailableUploaderInfo()) {
          _this2._createInternalFileUploader();
        }
      });
    };
    _proto._onFileUploaderProgress = function _onFileUploaderProgress(_ref2) {
      var component = _ref2.component,
          file = _ref2.file,
          bytesLoaded = _ref2.bytesLoaded,
          bytesTotal = _ref2.bytesTotal;
      var _this$_findSessionByF3 = this._findSessionByFile(component, file),
          session = _this$_findSessionByF3.session,
          fileIndex = _this$_findSessionByF3.fileIndex;
      var fileValue = bytesTotal !== 0 ? bytesLoaded / bytesTotal : 1;
      var commonValue = component.option('progress') / 100;
      var args = {
        sessionId: session.id,
        fileIndex: fileIndex,
        commonValue: commonValue,
        fileValue: fileValue
      };
      this._raiseUploadProgress(args);
    };
    _proto._onFileUploaderAllFilesUploaded = function _onFileUploaderAllFilesUploaded(_ref3) {
      var component = _ref3.component;
      var _this$_findSessionByF4 = this._findSessionByFile(component, component._files[0].value),
          session = _this$_findSessionByF4.session;
      this._raiseUploadFinished({
        sessionId: session.id,
        commonValue: component.option('progress') / 100
      });
    };
    _proto._onFileUploaderUploaded = function _onFileUploaderUploaded(_ref4) {
      var component = _ref4.component,
          file = _ref4.file;
      var deferred = this._getDeferredForFile(component, file);
      deferred.resolve();
    };
    _proto._onFileUploaderUploadAborted = function _onFileUploaderUploadAborted(_ref5) {
      var component = _ref5.component,
          file = _ref5.file;
      var deferred = this._getDeferredForFile(component, file);
      deferred.resolve({
        canceled: true
      });
    };
    _proto._onFileUploaderUploadError = function _onFileUploaderUploadError(_ref6) {
      var component = _ref6.component,
          file = _ref6.file,
          error = _ref6.error;
      var deferred = this._getDeferredForFile(component, file);
      deferred.reject(error);
    };
    _proto._createDropZonePlaceholder = function _createDropZonePlaceholder() {
      this._$dropZonePlaceholder = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_FILE_UPLOADER_DROPZONE_PLACEHOLER_CLASS).appendTo(this.option('dropZonePlaceholderContainer'));
    };
    _proto._adjustDropZonePlaceholder = function _adjustDropZonePlaceholder() {
      var $dropZoneTarget = this.option('dropZone');
      if (!(0, _window.hasWindow)() || $dropZoneTarget.length === 0) {
        return;
      }
      var placeholderBorderTopWidth = parseFloat(this._$dropZonePlaceholder.css('borderTopWidth'));
      var placeholderBorderLeftWidth = parseFloat(this._$dropZonePlaceholder.css('borderLeftWidth'));
      var $placeholderContainer = this.option('dropZonePlaceholderContainer');
      var containerBorderBottomWidth = parseFloat($placeholderContainer.css('borderBottomWidth'));
      var containerBorderLeftWidth = parseFloat($placeholderContainer.css('borderLeftWidth'));
      var containerHeight = (0, _size.getInnerHeight)($placeholderContainer);
      var containerOffset = $placeholderContainer.offset();
      var dropZoneOffset = $dropZoneTarget.offset();
      this._$dropZonePlaceholder.css({
        top: dropZoneOffset.top - containerOffset.top - containerHeight - containerBorderBottomWidth,
        left: dropZoneOffset.left - containerOffset.left - containerBorderLeftWidth
      });
      (0, _size.setHeight)(this._$dropZonePlaceholder, $dropZoneTarget.get(0).offsetHeight - placeholderBorderTopWidth * 2);
      (0, _size.setWidth)(this._$dropZonePlaceholder, $dropZoneTarget.get(0).offsetWidth - placeholderBorderLeftWidth * 2);
    };
    _proto._setDropZonePlaceholderVisible = function _setDropZonePlaceholderVisible(visible) {
      if (visible) {
        this._adjustDropZonePlaceholder();
        this._$dropZonePlaceholder.css('display', '');
      } else {
        this._$dropZonePlaceholder.css('display', 'none');
      }
    };
    _proto._shouldRaiseDragLeave = function _shouldRaiseDragLeave(e, uploaderInstance) {
      return uploaderInstance.isMouseOverElement(e, this.option('splitterElement')) || uploaderInstance._shouldRaiseDragLeaveBase(e, true);
    };
    _proto._uploadFiles = function _uploadFiles(uploaderInfo, files) {
      this._setDropZonePlaceholderVisible(false);
      var sessionId = new _guid.default().toString();
      var controller = this._getController();
      var deferreds = files.map(function () {
        return new _deferred.Deferred();
      });
      var session = {
        id: sessionId,
        controller: controller,
        files: files,
        deferreds: deferreds
      };
      uploaderInfo.session = session;
      var sessionInfo = {
        sessionId: sessionId,
        deferreds: deferreds,
        files: files
      };
      this._raiseUploadSessionStarted(sessionInfo);
      return (0, _uiFile_manager.whenSome)(deferreds).always(function () {
        return setTimeout(function () {
          uploaderInfo.fileUploader.reset();
          uploaderInfo.session = null;
        });
      });
    };
    _proto._getDeferredForFile = function _getDeferredForFile(fileUploader, file) {
      var _this$_findSessionByF5 = this._findSessionByFile(fileUploader, file),
          session = _this$_findSessionByF5.session,
          fileIndex = _this$_findSessionByF5.fileIndex;
      return session.deferreds[fileIndex];
    };
    _proto._findSessionByFile = function _findSessionByFile(fileUploader, file) {
      var uploaderInfo = this._findUploaderInfo(fileUploader);
      var session = uploaderInfo.session;
      var fileIndex = session.files.indexOf(file);
      return {
        session: session,
        fileIndex: fileIndex
      };
    };
    _proto._findUploaderInfoBySessionId = function _findUploaderInfoBySessionId(sessionId) {
      for (var i = 0; i < this._uploaderInfos.length; i++) {
        var uploaderInfo = this._uploaderInfos[i];
        var session = uploaderInfo.session;
        if (session && session.id === sessionId) {
          return uploaderInfo;
        }
      }
      return null;
    };
    _proto._findAndUpdateAvailableUploaderInfo = function _findAndUpdateAvailableUploaderInfo() {
      var _info;
      var info = null;
      for (var i = 0; i < this._uploaderInfos.length; i++) {
        var currentInfo = this._uploaderInfos[i];
        currentInfo.fileUploader.option('dropZone', '');
        if (!info && !currentInfo.session) {
          info = currentInfo;
        }
      }
      (_info = info) === null || _info === void 0 ? void 0 : _info.fileUploader.option('dropZone', this.option('dropZone'));
      return info;
    };
    _proto._findUploaderInfo = function _findUploaderInfo(fileUploader) {
      for (var i = 0; i < this._uploaderInfos.length; i++) {
        var info = this._uploaderInfos[i];
        if (info.fileUploader === fileUploader) {
          return info;
        }
      }
      return null;
    };
    _proto._getController = function _getController() {
      var controllerGetter = this.option('getController');
      return controllerGetter();
    };
    _proto._raiseUploadSessionStarted = function _raiseUploadSessionStarted(sessionInfo) {
      this._actions.onUploadSessionStarted({
        sessionInfo: sessionInfo
      });
    };
    _proto._raiseUploadProgress = function _raiseUploadProgress(args) {
      this._actions.onUploadProgress(args);
    };
    _proto._raiseUploadFinished = function _raiseUploadFinished(args) {
      this._actions.onUploadFinished(args);
    };
    _proto._initActions = function _initActions() {
      this._actions = {
        onUploadSessionStarted: this._createActionByOption('onUploadSessionStarted'),
        onUploadProgress: this._createActionByOption('onUploadProgress'),
        onUploadFinished: this._createActionByOption('onUploadFinished')
      };
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        getController: null,
        onUploadSessionStarted: null,
        onUploadProgress: null,
        onUploadFinished: null,
        splitterElement: null
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name;
      switch (name) {
        case 'getController':
          this.repaint();
          break;
        case 'onUploadSessionStarted':
        case 'onUploadProgress':
        case 'onUploadFinished':
          this._actions[name] = this._createActionByOption(name);
          break;
        case 'dropZone':
          this._findAndUpdateAvailableUploaderInfo();
          this._adjustDropZonePlaceholder();
          break;
        case 'dropZonePlaceholderContainer':
          this._$dropZonePlaceholder.detach();
          this._$dropZonePlaceholder.appendTo(args.value);
          break;
        case 'splitterElement':
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    return FileManagerFileUploader;
  }(_ui.default);
  var _default = FileManagerFileUploader;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/deferred","../../core/utils/window","../../core/guid","../widget/ui.widget","../file_uploader","./ui.file_manager.common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/deferred"), require("../../core/utils/window"), require("../../core/guid"), require("../widget/ui.widget"), require("../file_uploader"), require("./ui.file_manager.common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.file_uploader.js.map