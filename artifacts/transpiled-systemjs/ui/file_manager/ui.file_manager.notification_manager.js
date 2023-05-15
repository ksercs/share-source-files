!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/file_manager/ui.file_manager.notification_manager.js"], ["../../core/guid","../../core/renderer","../../core/utils/extend","../../core/utils/icon","./ui.file_manager.notification.progress_panel"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/file_manager/ui.file_manager.notification_manager.js", ["../../core/guid", "../../core/renderer", "../../core/utils/extend", "../../core/utils/icon", "./ui.file_manager.notification.progress_panel"], true, function ($__require, exports, module) {
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
  exports.NotificationManagerStub = exports.NotificationManager = exports.MANAGER_ID_NAME = void 0;
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _icon = $__require("../../core/utils/icon");
  var _uiFile_managerNotification = _interopRequireDefault($__require("./ui.file_manager.notification.progress_panel"));
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
  var FILE_MANAGER_PROGRESS_BOX_CLASS = 'dx-filemanager-progress-box';
  var FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-error");
  var FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-image");
  var FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-wrapper");
  var FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-common");
  var MANAGER_ID_NAME = '__operationInfoManager';
  exports.MANAGER_ID_NAME = MANAGER_ID_NAME;
  var ACTION_PROGRESS_STATUS = {
    default: 'default',
    progress: 'progress',
    error: 'error',
    success: 'success'
  };
  var NotificationManagerBase = /*#__PURE__*/function () {
    function NotificationManagerBase(_ref) {
      var onActionProgressStatusChanged = _ref.onActionProgressStatusChanged,
          isActual = _ref.isActual;
      this._id = new _guid.default().toString();
      this._isActual = isActual || false;
      this._actionProgressStatus = ACTION_PROGRESS_STATUS.default;
      this._raiseActionProgress = onActionProgressStatusChanged;
    }
    var _proto = NotificationManagerBase.prototype;
    _proto.getId = function getId() {
      return this._id;
    };
    _proto.isActual = function isActual() {
      return this._isActual;
    };
    _proto.createErrorDetailsProgressBox = function createErrorDetailsProgressBox($container, item, errorText) {
      var detailsItem = this._createDetailsItem($container, item);
      this.renderError(detailsItem.$wrapper, errorText);
    };
    _proto.renderError = function renderError($container, errorText) {
      (0, _renderer.default)('<div>').text(errorText).addClass(FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS).appendTo($container);
    };
    _proto.isActionProgressStatusDefault = function isActionProgressStatusDefault() {
      return this._actionProgressStatus === ACTION_PROGRESS_STATUS.default;
    };
    _proto._createDetailsItem = function _createDetailsItem($container, item) {
      var $detailsItem = (0, _renderer.default)('<div>').appendTo($container);
      return this._createProgressBox($detailsItem, {
        commonText: item.commonText,
        imageUrl: item.imageUrl
      });
    };
    _proto._createProgressBox = function _createProgressBox($container, options) {
      $container.addClass(FILE_MANAGER_PROGRESS_BOX_CLASS);
      if (options.imageUrl) {
        (0, _icon.getImageContainer)(options.imageUrl).addClass(FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS).appendTo($container);
      }
      var $wrapper = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS).appendTo($container);
      var $commonText = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS).text(options.commonText).appendTo($wrapper);
      return {
        $commonText: $commonText,
        $element: $container,
        $wrapper: $wrapper
      };
    };
    return NotificationManagerBase;
  }();
  var NotificationManagerStub = /*#__PURE__*/function (_NotificationManagerB) {
    _inheritsLoose(NotificationManagerStub, _NotificationManagerB);
    function NotificationManagerStub() {
      return _NotificationManagerB.apply(this, arguments) || this;
    }
    var _proto2 = NotificationManagerStub.prototype;
    _proto2.addOperation = function addOperation() {
      return _defineProperty({}, MANAGER_ID_NAME, this._id);
    };
    _proto2.addOperationDetails = function addOperationDetails() {};
    _proto2.updateOperationItemProgress = function updateOperationItemProgress() {};
    _proto2.completeOperationItem = function completeOperationItem() {};
    _proto2.finishOperation = function finishOperation() {};
    _proto2.completeOperation = function completeOperation() {};
    _proto2.completeSingleOperationWithError = function completeSingleOperationWithError() {};
    _proto2.addOperationDetailsError = function addOperationDetailsError() {};
    _proto2.handleDimensionChanged = function handleDimensionChanged() {
      return false;
    };
    _proto2.ensureProgressPanelCreated = function ensureProgressPanelCreated() {};
    _proto2.tryHideActionProgress = function tryHideActionProgress() {
      this._updateActionProgress('', ACTION_PROGRESS_STATUS.default);
    };
    _proto2.updateActionProgressStatus = function updateActionProgressStatus() {
      this._updateActionProgress('', ACTION_PROGRESS_STATUS.default);
    };
    _proto2._updateActionProgress = function _updateActionProgress(message, status) {
      if (status !== ACTION_PROGRESS_STATUS.default && status !== ACTION_PROGRESS_STATUS.progress) {
        return;
      }
      this._actionProgressStatus = status;
      this._raiseActionProgress(message, status);
    };
    _proto2.hasNoOperations = function hasNoOperations() {
      return true;
    };
    _createClass(NotificationManagerStub, [{
      key: "_operationInProgressCount",
      get: function get() {
        return 0;
      },
      set: function set(value) {}
    }, {
      key: "_failedOperationCount",
      get: function get() {
        return 0;
      },
      set: function set(value) {}
    }]);
    return NotificationManagerStub;
  }(NotificationManagerBase);
  exports.NotificationManagerStub = NotificationManagerStub;
  var NotificationManager = /*#__PURE__*/function (_NotificationManagerB2) {
    _inheritsLoose(NotificationManager, _NotificationManagerB2);
    function NotificationManager(options) {
      var _this;
      _this = _NotificationManagerB2.call(this, options) || this;
      _this._failedOperationCount = 0;
      _this._operationInProgressCount = 0;
      return _this;
    }
    var _proto3 = NotificationManager.prototype;
    _proto3.addOperation = function addOperation(processingMessage, allowCancel, allowProgressAutoUpdate) {
      this._operationInProgressCount++;
      var operationInfo = this._progressPanel.addOperation(processingMessage, allowCancel, allowProgressAutoUpdate);
      operationInfo[MANAGER_ID_NAME] = this._id;
      this._updateActionProgress(processingMessage, ACTION_PROGRESS_STATUS.progress);
      return operationInfo;
    };
    _proto3.addOperationDetails = function addOperationDetails(operationInfo, details, showCloseButton) {
      this._progressPanel.addOperationDetails(operationInfo, details, showCloseButton);
    };
    _proto3.updateOperationItemProgress = function updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
      this._progressPanel.updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress);
    };
    _proto3.completeOperationItem = function completeOperationItem(operationInfo, itemIndex, commonProgress) {
      this._progressPanel.completeOperationItem(operationInfo, itemIndex, commonProgress);
    };
    _proto3.finishOperation = function finishOperation(operationInfo, commonProgress) {
      this._progressPanel.updateOperationCommonProgress(operationInfo, commonProgress);
    };
    _proto3.completeOperation = function completeOperation(operationInfo, commonText, isError, statusText) {
      this._operationInProgressCount--;
      if (isError) {
        this._failedOperationCount++;
      }
      this._progressPanel.completeOperation(operationInfo, commonText, isError, statusText);
    };
    _proto3.completeSingleOperationWithError = function completeSingleOperationWithError(operationInfo, errorInfo) {
      this._progressPanel.completeSingleOperationWithError(operationInfo, errorInfo.detailErrorText);
      this._notifyError(errorInfo);
    };
    _proto3.addOperationDetailsError = function addOperationDetailsError(operationInfo, errorInfo) {
      this._progressPanel.addOperationDetailsError(operationInfo, errorInfo.itemIndex, errorInfo.detailErrorText);
      this._notifyError(errorInfo);
    };
    _proto3.handleDimensionChanged = function handleDimensionChanged() {
      if (this._progressPanel) {
        this._progressPanel.$element().detach();
      }
      return true;
    };
    _proto3.ensureProgressPanelCreated = function ensureProgressPanelCreated(container, options) {
      var _this2 = this;
      if (!this._progressPanel) {
        var $progressPanelElement = (0, _renderer.default)('<div>').appendTo(container);
        var ProgressPanelClass = this._getProgressPanelComponent();
        this._progressPanel = new ProgressPanelClass($progressPanelElement, (0, _extend.extend)({}, options, {
          onOperationClosed: function onOperationClosed(_ref3) {
            var info = _ref3.info;
            return _this2._onProgressPanelOperationClosed(info);
          }
        }));
      } else {
        this._progressPanel.$element().appendTo(container);
      }
    }

    // needed for editingProgress.tests.js
    ;
    _proto3._getProgressPanelComponent = function _getProgressPanelComponent() {
      return _uiFile_managerNotification.default;
    };
    _proto3._onProgressPanelOperationClosed = function _onProgressPanelOperationClosed(operationInfo) {
      if (operationInfo.hasError) {
        this._failedOperationCount--;
        this.tryHideActionProgress();
      }
    };
    _proto3.tryHideActionProgress = function tryHideActionProgress() {
      if (this.hasNoOperations()) {
        this._updateActionProgress('', ACTION_PROGRESS_STATUS.default);
      }
    };
    _proto3.updateActionProgressStatus = function updateActionProgressStatus(operationInfo) {
      if (operationInfo) {
        var status = this._failedOperationCount === 0 ? ACTION_PROGRESS_STATUS.success : ACTION_PROGRESS_STATUS.error;
        this._updateActionProgress('', status);
      }
    };
    _proto3._notifyError = function _notifyError(errorInfo) {
      var status = this.hasNoOperations() ? ACTION_PROGRESS_STATUS.default : ACTION_PROGRESS_STATUS.error;
      this._updateActionProgress(errorInfo.commonErrorText, status);
    };
    _proto3._updateActionProgress = function _updateActionProgress(message, status) {
      this._actionProgressStatus = status;
      this._raiseActionProgress(message, status);
    };
    _proto3.hasNoOperations = function hasNoOperations() {
      return this._operationInProgressCount === 0 && this._failedOperationCount === 0;
    };
    _createClass(NotificationManager, [{
      key: "_operationInProgressCount",
      get: function get() {
        return this._operationInProgressCountInternal;
      },
      set: function set(value) {
        this._operationInProgressCountInternal = value;
      }
    }, {
      key: "_failedOperationCount",
      get: function get() {
        return this._failedOperationCountInternal;
      },
      set: function set(value) {
        this._failedOperationCountInternal = value;
      }
    }]);
    return NotificationManager;
  }(NotificationManagerBase);
  exports.NotificationManager = NotificationManager;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/guid","../../core/renderer","../../core/utils/extend","../../core/utils/icon","./ui.file_manager.notification.progress_panel"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/guid"), require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/icon"), require("./ui.file_manager.notification.progress_panel"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.notification_manager.js.map