!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/file_manager/ui.file_manager.editing.js"], ["../../core/renderer","../../core/utils/extend","../../core/utils/deferred","../../core/utils/iterator","../../core/utils/string","../../core/utils/type","../../localization/message","../widget/ui.widget","./ui.file_manager.dialog_manager","./ui.file_manager.file_uploader","./ui.file_manager.messages"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/file_manager/ui.file_manager.editing.js", ["../../core/renderer", "../../core/utils/extend", "../../core/utils/deferred", "../../core/utils/iterator", "../../core/utils/string", "../../core/utils/type", "../../localization/message", "../widget/ui.widget", "./ui.file_manager.dialog_manager", "./ui.file_manager.file_uploader", "./ui.file_manager.messages"], true, function ($__require, exports, module) {
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
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _deferred = $__require("../../core/utils/deferred");
  var _iterator = $__require("../../core/utils/iterator");
  var _string = $__require("../../core/utils/string");
  var _type = $__require("../../core/utils/type");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _uiFile_manager = _interopRequireDefault($__require("./ui.file_manager.dialog_manager"));
  var _uiFile_manager2 = _interopRequireDefault($__require("./ui.file_manager.file_uploader"));
  var _uiFile_manager3 = $__require("./ui.file_manager.messages");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
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
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
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
  var FileManagerEditingControl = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(FileManagerEditingControl, _Widget);
    function FileManagerEditingControl() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = FileManagerEditingControl.prototype;
    _proto._initMarkup = function _initMarkup() {
      _Widget.prototype._initMarkup.call(this);
      this._initActions();
      this._controller = this.option('controller');
      this._controller.on('EditActionStarting', this._onEditActionStarting.bind(this));
      this._controller.on('EditActionResultAcquired', this._onEditActionResultAcquired.bind(this));
      this._controller.on('EditActionItemError', this._onEditActionItemError.bind(this));
      this._controller.on('EditActionError', this._onEditActionError.bind(this));
      this._controller.on('CompleteEditActionItem', this._onCompleteEditActionItem.bind(this));
      this._controller.on('CompleteEditAction', this._onCompleteEditAction.bind(this));
      this._model = this.option('model');
      this._uploadOperationInfoMap = {};
      this._dialogManager = new _uiFile_manager.default(this.$element(), {
        chooseDirectoryDialog: {
          provider: this._controller._fileProvider,
          getDirectories: this._controller.getDirectories.bind(this._controller),
          getCurrentDirectory: this._controller.getCurrentDirectory.bind(this._controller)
        },
        rtlEnabled: this.option('rtlEnabled'),
        onDialogClosed: this._onDialogClosed.bind(this)
      });
      this._fileUploader = this._createFileUploader();
      var notificationControl = this.option('notificationControl');
      if (notificationControl) {
        this._initNotificationControl(notificationControl);
      }
      this._createMetadataMap();
    };
    _proto._initNotificationControl = function _initNotificationControl(notificationControl) {
      var _this = this;
      this._notificationControl = notificationControl;
      this._notificationControl.option({
        onOperationCanceled: function onOperationCanceled(_ref) {
          var info = _ref.info;
          return _this._onCancelUploadSession(info);
        },
        onOperationItemCanceled: function onOperationItemCanceled(_ref2) {
          var item = _ref2.item,
              itemIndex = _ref2.itemIndex;
          return _this._onCancelFileUpload(item, itemIndex);
        }
      });
    };
    _proto._getFileUploaderComponent = function _getFileUploaderComponent() {
      return _uiFile_manager2.default;
    };
    _proto._createFileUploader = function _createFileUploader() {
      var _this2 = this;
      var $fileUploader = (0, _renderer.default)('<div>').appendTo(this.$element());
      return this._createComponent($fileUploader, this._getFileUploaderComponent(), {
        getController: this._getFileUploaderController.bind(this),
        dropZonePlaceholderContainer: this.option('uploadDropZonePlaceholderContainer'),
        onUploadSessionStarted: function onUploadSessionStarted(e) {
          return _this2._onUploadSessionStarted(e);
        },
        onUploadProgress: function onUploadProgress(e) {
          return _this2._onUploadProgress(e);
        },
        onUploadFinished: function onUploadFinished(e) {
          return _this2._onUploadFinished(e);
        }
      });
    };
    _proto.setUploaderDropZone = function setUploaderDropZone($element) {
      this._fileUploader.option('dropZone', $element);
    };
    _proto.setUploaderSplitterElement = function setUploaderSplitterElement(element) {
      this._fileUploader.option('splitterElement', element);
    };
    _proto._getFileUploaderController = function _getFileUploaderController() {
      var _this3 = this;
      var uploadDirectory = this.uploadDirectoryInfo.fileItem;
      return {
        chunkSize: this._controller.getFileUploadChunkSize(),
        uploadFileChunk: function uploadFileChunk(fileData, chunksInfo) {
          return _this3._controller.uploadFileChunk(fileData, chunksInfo, uploadDirectory);
        },
        abortFileUpload: function abortFileUpload(fileData, chunksInfo) {
          return _this3._controller.abortFileUpload(fileData, chunksInfo, uploadDirectory);
        }
      };
    };
    _proto._createMetadataMap = function _createMetadataMap() {
      var _this4 = this;
      this._metadataMap = {
        create: {
          action: function action(arg) {
            return _this4._tryCreate(arg);
          },
          affectsAllItems: true,
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingCreateSingleItemProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingCreateSingleItemSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingCreateSingleItemErrorMessage'),
          commonErrorMessage: _message.default.format('dxFileManager-editingCreateCommonErrorMessage')
        },
        rename: {
          action: function action(arg) {
            return _this4._tryRename(arg);
          },
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingRenameSingleItemProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingRenameSingleItemSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingRenameSingleItemErrorMessage'),
          commonErrorMessage: _message.default.format('dxFileManager-editingRenameCommonErrorMessage')
        },
        delete: {
          action: function action(arg) {
            return _this4._tryDelete(arg);
          },
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingDeleteSingleItemProcessingMessage'),
          multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingDeleteMultipleItemsProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingDeleteSingleItemSuccessMessage'),
          multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingDeleteMultipleItemsSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingDeleteSingleItemErrorMessage'),
          multipleItemsErrorMessage: _message.default.format('dxFileManager-editingDeleteMultipleItemsErrorMessage'),
          commonErrorMessage: _message.default.format('dxFileManager-editingDeleteCommonErrorMessage')
        },
        move: {
          action: function action(arg) {
            return _this4._tryMove(arg);
          },
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingMoveSingleItemProcessingMessage'),
          multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingMoveMultipleItemsProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingMoveSingleItemSuccessMessage'),
          multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingMoveMultipleItemsSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingMoveSingleItemErrorMessage'),
          multipleItemsErrorMessage: _message.default.format('dxFileManager-editingMoveMultipleItemsErrorMessage'),
          commonErrorMessage: _message.default.format('dxFileManager-editingMoveCommonErrorMessage')
        },
        copy: {
          action: function action(arg) {
            return _this4._tryCopy(arg);
          },
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingCopySingleItemProcessingMessage'),
          multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingCopyMultipleItemsProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingCopySingleItemSuccessMessage'),
          multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingCopyMultipleItemsSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingCopySingleItemErrorMessage'),
          multipleItemsErrorMessage: _message.default.format('dxFileManager-editingCopyMultipleItemsErrorMessage'),
          commonErrorMessage: _message.default.format('dxFileManager-editingCopyCommonErrorMessage')
        },
        upload: {
          action: function action(arg) {
            return _this4._tryUpload(arg);
          },
          allowCancel: true,
          allowItemProgress: true,
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingUploadSingleItemProcessingMessage'),
          multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingUploadMultipleItemsProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingUploadSingleItemSuccessMessage'),
          multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingUploadMultipleItemsSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingUploadSingleItemErrorMessage'),
          multipleItemsErrorMessage: _message.default.format('dxFileManager-editingUploadMultipleItemsErrorMessage'),
          canceledMessage: _message.default.format('dxFileManager-editingUploadCanceledMessage')
        },
        download: {
          action: function action(arg) {
            return _this4._download(arg);
          },
          singleItemProcessingMessage: '',
          multipleItemsProcessingMessage: '',
          singleItemErrorMessage: _message.default.format('dxFileManager-editingDownloadSingleItemErrorMessage'),
          multipleItemsErrorMessage: _message.default.format('dxFileManager-editingDownloadMultipleItemsErrorMessage')
        },
        getItemContent: {
          action: function action(arg) {
            return _this4._getItemContent(arg);
          }
        },
        getItems: {
          singleItemProcessingMessage: '',
          singleItemErrorMessage: _message.default.format('dxFileManager-errorDirectoryOpenFailed'),
          commonErrorMessage: _message.default.format('dxFileManager-errorDirectoryOpenFailed')
        }
      };
    };
    _proto.getCommandActions = function getCommandActions() {
      var _this5 = this;
      var result = {};
      (0, _iterator.each)(this._metadataMap, function (name) {
        if (Object.prototype.hasOwnProperty.call(_this5._metadataMap, name)) {
          result[name] = function (arg) {
            return _this5._executeAction(name, arg);
          };
        }
      });
      return result;
    };
    _proto._executeAction = function _executeAction(actionName, arg) {
      var actionMetadata = this._metadataMap[actionName];
      return actionMetadata ? actionMetadata.action(arg) : null;
    };
    _proto._onCancelUploadSession = function _onCancelUploadSession(info) {
      this._fileUploader.cancelUpload(info.uploadSessionId);
    };
    _proto._onCancelFileUpload = function _onCancelFileUpload(item, itemIndex) {
      this._fileUploader.cancelFileUpload(item.info.uploadSessionId, itemIndex);
    };
    _proto._onUploadProgress = function _onUploadProgress(_ref3) {
      var sessionId = _ref3.sessionId,
          fileIndex = _ref3.fileIndex,
          commonValue = _ref3.commonValue,
          fileValue = _ref3.fileValue;
      var operationInfo = this._uploadOperationInfoMap[sessionId].operationInfo;
      this._notificationControl.updateOperationItemProgress(operationInfo, fileIndex, fileValue * 100, commonValue * 100);
    };
    _proto._onUploadFinished = function _onUploadFinished(_ref4) {
      var sessionId = _ref4.sessionId,
          commonValue = _ref4.commonValue;
      var operationInfo = this._uploadOperationInfoMap[sessionId].operationInfo;
      this._notificationControl.finishOperation(operationInfo, commonValue * 100);
      this._scheduleUploadSessionDisposal(sessionId, 'uploader');
    };
    _proto._onUploadSessionStarted = function _onUploadSessionStarted(_ref5) {
      var sessionInfo = _ref5.sessionInfo;
      this._controller.processUploadSession(sessionInfo, this.uploadDirectoryInfo);
    };
    _proto._onEditActionStarting = function _onEditActionStarting(actionInfo) {
      var actionMetadata = this._metadataMap[actionInfo.name];
      var context = new FileManagerActionContext(actionMetadata, actionInfo.itemInfos, actionInfo.directory);
      var operationInfo = this._notificationControl.addOperation(context.processingMessage, actionMetadata.allowCancel, !actionMetadata.allowItemProgress);
      (0, _extend.extend)(actionInfo.customData, {
        context: context,
        operationInfo: operationInfo
      });
      switch (actionInfo.name) {
        case 'upload':
          {
            var sessionId = actionInfo.customData.sessionInfo.sessionId;
            operationInfo.uploadSessionId = sessionId;
            this._uploadOperationInfoMap[sessionId] = {
              operationInfo: operationInfo
            };
          }
          break;
        case 'rename':
          actionInfo.customData.context.itemNewName = actionInfo.customData.itemNewName;
          break;
        default:
          break;
      }
    };
    _proto._onEditActionResultAcquired = function _onEditActionResultAcquired(actionInfo) {
      var _this6 = this;
      var _actionInfo$customDat = actionInfo.customData,
          context = _actionInfo$customDat.context,
          operationInfo = _actionInfo$customDat.operationInfo;
      context.singleRequest = actionInfo.singleRequest;
      var details = context.itemInfos.map(function (itemInfo) {
        return _this6._getItemProgressDisplayInfo(itemInfo);
      });
      this._notificationControl.addOperationDetails(operationInfo, details, context.actionMetadata.allowCancel);
    };
    _proto._onEditActionError = function _onEditActionError(actionInfo, errorInfo) {
      var _actionInfo$customDat2 = actionInfo.customData,
          context = _actionInfo$customDat2.context,
          operationInfo = _actionInfo$customDat2.operationInfo;
      context.singleRequest = actionInfo.singleRequest;
      this._handleActionError(operationInfo, context, errorInfo);
      this._completeAction(operationInfo, context);
    };
    _proto._onEditActionItemError = function _onEditActionItemError(actionInfo, errorInfo) {
      var _actionInfo$customDat3 = actionInfo.customData,
          context = _actionInfo$customDat3.context,
          operationInfo = _actionInfo$customDat3.operationInfo;
      this._handleActionError(operationInfo, context, errorInfo);
    };
    _proto._onCompleteEditActionItem = function _onCompleteEditActionItem(actionInfo, info) {
      var _actionInfo$customDat4 = actionInfo.customData,
          context = _actionInfo$customDat4.context,
          operationInfo = _actionInfo$customDat4.operationInfo;
      if (!info.result || !info.result.canceled) {
        context.completeOperationItem(info.index);
        this._notificationControl.completeOperationItem(operationInfo, info.index, context.commonProgress);
      }
    };
    _proto._onCompleteEditAction = function _onCompleteEditAction(actionInfo) {
      var _actionInfo$customDat5 = actionInfo.customData,
          context = _actionInfo$customDat5.context,
          operationInfo = _actionInfo$customDat5.operationInfo;
      this._completeAction(operationInfo, context);
      if (actionInfo.name === 'upload') {
        this._scheduleUploadSessionDisposal(actionInfo.customData.sessionInfo.sessionId, 'controller');
      }
    };
    _proto._scheduleUploadSessionDisposal = function _scheduleUploadSessionDisposal(sessionId, requester) {
      if ((0, _type.isDefined)(this._uploadOperationInfoMap[sessionId].requester) && this._uploadOperationInfoMap[sessionId].requester !== requester) {
        delete this._uploadOperationInfoMap[sessionId];
      } else {
        this._uploadOperationInfoMap[sessionId].requester = requester;
      }
    };
    _proto._tryCreate = function _tryCreate(parentDirectories) {
      var _this7 = this;
      var parentDirectoryInfo = parentDirectories && parentDirectories[0] || this._getCurrentDirectory();
      var newDirName = _message.default.format('dxFileManager-newDirectoryName');
      return this._showDialog(this._dialogManager.getCreateItemDialog(), newDirName).then(function (_ref6) {
        var name = _ref6.name;
        return _this7._controller.createDirectory(parentDirectoryInfo, name);
      });
    };
    _proto._tryRename = function _tryRename(itemInfos) {
      var _this8 = this;
      var itemInfo = itemInfos && itemInfos[0] || this._model.getMultipleSelectedItems()[0];
      if (!itemInfo) {
        return new _deferred.Deferred().reject().promise();
      }
      return this._showDialog(this._dialogManager.getRenameItemDialog(), itemInfo.fileItem.name).then(function (_ref7) {
        var name = _ref7.name;
        return _this8._controller.renameItem(itemInfo, name);
      });
    };
    _proto._tryDelete = function _tryDelete(itemInfos) {
      var _this9 = this;
      itemInfos = itemInfos || this._model.getMultipleSelectedItems();
      if (itemInfos.length === 0) {
        return new _deferred.Deferred().reject().promise();
      }
      var itemName = itemInfos[0].fileItem.name;
      var itemCount = itemInfos.length;
      return this._showDialog(this._dialogManager.getDeleteItemDialog(), {
        itemName: itemName,
        itemCount: itemCount
      }).then(function () {
        return _this9._controller.deleteItems(itemInfos);
      });
    };
    _proto._tryMove = function _tryMove(itemInfos) {
      var _this10 = this;
      itemInfos = itemInfos || this._model.getMultipleSelectedItems();
      if (itemInfos.length === 0) {
        return new _deferred.Deferred().reject().promise();
      }
      return this._showDialog(this._dialogManager.getMoveDialog(itemInfos)).then(function (_ref8) {
        var folder = _ref8.folder;
        return _this10._controller.moveItems(itemInfos, folder);
      });
    };
    _proto._tryCopy = function _tryCopy(itemInfos) {
      var _this11 = this;
      itemInfos = itemInfos || this._model.getMultipleSelectedItems();
      if (itemInfos.length === 0) {
        return new _deferred.Deferred().reject().promise();
      }
      return this._showDialog(this._dialogManager.getCopyDialog(itemInfos)).then(function (_ref9) {
        var folder = _ref9.folder;
        return _this11._controller.copyItems(itemInfos, folder);
      });
    };
    _proto._tryUpload = function _tryUpload(destinationFolder) {
      this._uploadDirectoryInfo = destinationFolder === null || destinationFolder === void 0 ? void 0 : destinationFolder[0];
      this._fileUploader.tryUpload();
    };
    _proto._download = function _download(itemInfos) {
      itemInfos = itemInfos || this._model.getMultipleSelectedItems();
      if (itemInfos.length === 0) {
        return new _deferred.Deferred().reject().promise();
      }
      return this._controller.downloadItems(itemInfos);
    };
    _proto._getItemContent = function _getItemContent(itemInfos) {
      itemInfos = itemInfos || this._model.getMultipleSelectedItems();
      return this._controller.getItemContent(itemInfos);
    };
    _proto._completeAction = function _completeAction(operationInfo, context) {
      this._notificationControl.completeOperation(operationInfo, context.completionMessage, !context.success, context.statusText);
      if (context.hasModifiedItems()) {
        this._raiseOnSuccess(context.onlyFiles);
      }
    };
    _proto._handleActionError = function _handleActionError(operationInfo, context, errorInfo) {
      operationInfo.hasError = true;
      if (context.singleRequest) {
        this._handleSingleRequestActionError(operationInfo, context, errorInfo);
      } else {
        this._handleMultipleRequestActionError(operationInfo, context, errorInfo);
      }
    };
    _proto._handleSingleRequestActionError = function _handleSingleRequestActionError(operationInfo, context, errorInfo) {
      var itemInfo = context.getItemForSingleRequestError();
      var itemName = context.getItemName(errorInfo.errorCode);
      var errorText = this._getErrorText(errorInfo, itemInfo, itemName);
      context.processSingleRequestError(errorText);
      var operationErrorInfo = this._getOperationErrorInfo(context);
      this._notificationControl.completeSingleOperationWithError(operationInfo, operationErrorInfo);
      if (context.multipleItems) {
        this._raiseOnSuccess(context.onlyFiles);
      }
    };
    _proto._handleMultipleRequestActionError = function _handleMultipleRequestActionError(operationInfo, context, errorInfo) {
      var itemInfo = context.getItemForMultipleRequestError(errorInfo.index);
      var itemName = context.getItemName(errorInfo.errorCode, errorInfo.index);
      var errorText = this._getErrorText(errorInfo, itemInfo, itemName);
      context.processMultipleRequestError(errorInfo.index, errorText);
      var operationErrorInfo = this._getOperationErrorInfo(context);
      this._notificationControl.addOperationDetailsError(operationInfo, operationErrorInfo);
    };
    _proto._getOperationErrorInfo = function _getOperationErrorInfo(context) {
      var detailError = context.errorState.currentDetailError;
      return {
        commonErrorText: context.errorState.commonErrorText,
        item: detailError.itemInfo ? this._getItemProgressDisplayInfo(detailError.itemInfo) : null,
        itemIndex: detailError.itemIndex,
        detailErrorText: detailError.errorText
      };
    };
    _proto._getErrorText = function _getErrorText(errorInfo, itemInfo, itemName) {
      var errorText = errorInfo.errorText || _uiFile_manager3.FileManagerMessages.get(errorInfo.errorCode, itemName);
      var errorArgs = {
        fileSystemItem: itemInfo === null || itemInfo === void 0 ? void 0 : itemInfo.fileItem,
        errorCode: errorInfo.errorCode,
        errorText: errorText
      };
      this._raiseOnError(errorArgs);
      return errorArgs.errorText;
    };
    _proto._getItemProgressDisplayInfo = function _getItemProgressDisplayInfo(itemInfo) {
      return {
        commonText: itemInfo.fileItem.name,
        imageUrl: this._getItemThumbnail(itemInfo)
      };
    };
    _proto._showDialog = function _showDialog(dialog, dialogArgument) {
      this._dialogDeferred = new _deferred.Deferred();
      dialog.show(dialogArgument);
      return this._dialogDeferred.promise();
    };
    _proto._onDialogClosed = function _onDialogClosed(e) {
      var result = e.dialogResult;
      if (result) {
        this._dialogDeferred.resolve(result);
      } else {
        this._dialogDeferred.reject();
      }
    };
    _proto.updateDialogRtl = function updateDialogRtl(value) {
      this._dialogManager.updateDialogRtl(value);
    };
    _proto._getItemThumbnail = function _getItemThumbnail(item) {
      var itemThumbnailGetter = this.option('getItemThumbnail');
      if (!itemThumbnailGetter) {
        return null;
      }
      var info = itemThumbnailGetter(item);
      return info ? info.thumbnail : null;
    };
    _proto._initActions = function _initActions() {
      this._actions = {
        onSuccess: this._createActionByOption('onSuccess'),
        onError: this._createActionByOption('onError')
      };
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        model: {
          getMultipleSelectedItems: null
        },
        notificationControl: null,
        getItemThumbnail: null,
        onSuccess: null,
        onError: null
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name;
      switch (name) {
        case 'model':
          this.repaint();
          break;
        case 'notificationControl':
          this._initNotificationControl(args.value);
          break;
        case 'getItemThumbnail':
          break;
        case 'uploadDropZonePlaceholderContainer':
          this._fileUploader.option('dropZonePlaceholderContainer', args.value);
          break;
        case 'onSuccess':
        case 'onError':
          this._actions[name] = this._createActionByOption(name);
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    _proto._raiseOnSuccess = function _raiseOnSuccess(updatedOnlyFiles) {
      this._actions.onSuccess({
        updatedOnlyFiles: updatedOnlyFiles
      });
    };
    _proto._raiseOnError = function _raiseOnError(args) {
      this._actions.onError(args);
    };
    _proto._getCurrentDirectory = function _getCurrentDirectory() {
      return this._controller.getCurrentDirectory();
    };
    _createClass(FileManagerEditingControl, [{
      key: "uploadDirectoryInfo",
      get: function get() {
        return this._uploadDirectoryInfo || this._getCurrentDirectory();
      }
    }]);
    return FileManagerEditingControl;
  }(_ui.default);
  var FileManagerActionContext = /*#__PURE__*/function () {
    function FileManagerActionContext(actionMetadata, itemInfos, directoryInfo) {
      this._actionMetadata = actionMetadata;
      this._itemInfos = itemInfos;
      this._onlyFiles = !this._actionMetadata.affectsAllItems && this._itemInfos.every(function (info) {
        return !info.fileItem.isDirectory;
      });
      this._items = this._itemInfos.map(function (itemInfo) {
        return itemInfo.fileItem;
      });
      this._multipleItems = this._items.length > 1;
      this._location = directoryInfo.getDisplayName();
      this._singleRequest = true;
      this._completedItems = [];
      this._commonProgress = 0;
      this._errorState = {
        failedCount: 0
      };
      this._itemNewName = '';
    }
    var _proto2 = FileManagerActionContext.prototype;
    _proto2.completeOperationItem = function completeOperationItem(itemIndex) {
      if (this._singleRequest) {
        this._completedItems = _toConsumableArray(this._items);
      } else {
        var item = this._items[itemIndex];
        this._completedItems.push(item);
      }
      if (!this._actionMetadata.allowItemProgress) {
        this._commonProgress = this._completedItems.length / this._items.length * 100;
      }
    };
    _proto2.processSingleRequestError = function processSingleRequestError(errorText) {
      this._errorState.failedCount = 1;
      this._errorState.commonErrorText = this._multipleItems ? this._actionMetadata.commonErrorMessage : this._actionMetadata.singleItemErrorMessage;
      var itemIndex = this._multipleItems ? -1 : 1;
      var itemInfo = this.getItemForSingleRequestError();
      this._setCurrentDetailError(itemIndex, itemInfo, errorText);
    };
    _proto2.processMultipleRequestError = function processMultipleRequestError(itemIndex, errorText) {
      this._errorState.failedCount++;
      this._errorState.commonErrorText = this._errorState.failedCount > 1 ? (0, _string.format)(this._actionMetadata.multipleItemsErrorMessage, this._errorState.failedCount) : this._actionMetadata.singleItemErrorMessage;
      var itemInfo = this.getItemForMultipleRequestError(itemIndex);
      this._setCurrentDetailError(itemIndex, itemInfo, errorText);
    };
    _proto2.hasModifiedItems = function hasModifiedItems() {
      return this._hasCompletedItems() || this._singleRequest && !this.success && this._multipleItems;
    };
    _proto2.getItemForSingleRequestError = function getItemForSingleRequestError() {
      return this._multipleItems ? null : this._itemInfos[0];
    };
    _proto2.getItemForMultipleRequestError = function getItemForMultipleRequestError(itemIndex) {
      return this._itemInfos[itemIndex];
    };
    _proto2.getItemName = function getItemName(errorCode, itemIndex) {
      var itemInfo = this.singleRequest ? this.getItemForSingleRequestError() : this.getItemForMultipleRequestError(itemIndex);
      var result = itemInfo === null || itemInfo === void 0 ? void 0 : itemInfo.fileItem.name;
      if (this.itemNewName && this._isItemExistsErrorCode(errorCode)) {
        result = this.itemNewName;
      }
      return result;
    };
    _proto2._isItemExistsErrorCode = function _isItemExistsErrorCode(errorCode) {
      return errorCode === _uiFile_manager3.ErrorCode.DirectoryExists || errorCode === _uiFile_manager3.ErrorCode.FileExists;
    };
    _proto2._setCurrentDetailError = function _setCurrentDetailError(itemIndex, itemInfo, errorText) {
      this._errorState.currentDetailError = {
        itemIndex: itemIndex,
        itemInfo: itemInfo,
        errorText: errorText
      };
    };
    _proto2._hasCompletedItems = function _hasCompletedItems() {
      return this._completedItems.length > 0;
    };
    _createClass(FileManagerActionContext, [{
      key: "actionMetadata",
      get: function get() {
        return this._actionMetadata;
      }
    }, {
      key: "itemInfos",
      get: function get() {
        return this._itemInfos;
      }
    }, {
      key: "itemNewName",
      get: function get() {
        return this._itemNewName;
      },
      set: function set(value) {
        this._itemNewName = value;
      }
    }, {
      key: "errorState",
      get: function get() {
        return this._errorState;
      }
    }, {
      key: "singleRequest",
      get: function get() {
        return this._singleRequest;
      },
      set: function set(value) {
        this._singleRequest = value;
      }
    }, {
      key: "multipleItems",
      get: function get() {
        return this._multipleItems;
      }
    }, {
      key: "onlyFiles",
      get: function get() {
        return this._onlyFiles;
      }
    }, {
      key: "processingMessage",
      get: function get() {
        return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsProcessingMessage, this._items.length, this._location) : (0, _string.format)(this._actionMetadata.singleItemProcessingMessage, this._location);
      }
    }, {
      key: "successMessage",
      get: function get() {
        if (this._hasCompletedItems()) {
          return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsSuccessMessage, this._completedItems.length, this._location) : (0, _string.format)(this._actionMetadata.singleItemSuccessMessage, this._location);
        } else {
          return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsErrorMessage, this._items.length) : this._actionMetadata.singleItemErrorMessage;
        }
      }
    }, {
      key: "completionMessage",
      get: function get() {
        return this.success ? this.successMessage : this.errorState.commonErrorText;
      }
    }, {
      key: "statusText",
      get: function get() {
        return this.success && !this._hasCompletedItems() ? this._actionMetadata.canceledMessage : undefined;
      }
    }, {
      key: "commonProgress",
      get: function get() {
        return this._commonProgress;
      }
    }, {
      key: "success",
      get: function get() {
        return !this._errorState.failedCount;
      }
    }]);
    return FileManagerActionContext;
  }();
  var _default = FileManagerEditingControl;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","../../core/utils/deferred","../../core/utils/iterator","../../core/utils/string","../../core/utils/type","../../localization/message","../widget/ui.widget","./ui.file_manager.dialog_manager","./ui.file_manager.file_uploader","./ui.file_manager.messages"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/deferred"), require("../../core/utils/iterator"), require("../../core/utils/string"), require("../../core/utils/type"), require("../../localization/message"), require("../widget/ui.widget"), require("./ui.file_manager.dialog_manager"), require("./ui.file_manager.file_uploader"), require("./ui.file_manager.messages"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.editing.js.map