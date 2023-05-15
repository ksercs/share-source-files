!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/file_manager/ui.file_manager.notification.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/utils/deferred","../../core/utils/window","../widget/ui.widget","../popup/ui.popup","../drawer/ui.drawer","./ui.file_manager.notification_manager"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/file_manager/ui.file_manager.notification.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/extend", "../../core/utils/type", "../../core/utils/deferred", "../../core/utils/window", "../widget/ui.widget", "../popup/ui.popup", "../drawer/ui.drawer", "./ui.file_manager.notification_manager"], true, function ($__require, exports, module) {
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
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _deferred = $__require("../../core/utils/deferred");
  var _window = $__require("../../core/utils/window");
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _ui2 = _interopRequireDefault($__require("../popup/ui.popup"));
  var _ui3 = _interopRequireDefault($__require("../drawer/ui.drawer"));
  var _uiFile_manager = $__require("./ui.file_manager.notification_manager");
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
  var ADAPTIVE_STATE_SCREEN_WIDTH = 1000;
  var FILE_MANAGER_NOTIFICATION_CLASS = 'dx-filemanager-notification';
  var FILE_MANAGER_NOTIFICATION_DRAWER_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-drawer");
  var FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_DRAWER_CLASS, "-panel");
  var FILE_MANAGER_NOTIFICATION_POPUP_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-popup");
  var FILE_MANAGER_NOTIFICATION_POPUP_ERROR_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-popup-error");
  var FILE_MANAGER_NOTIFICATION_COMMON_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-common");
  var FILE_MANAGER_NOTIFICATION_SEPARATOR_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-separator");
  var FILE_MANAGER_NOTIFICATION_DETAILS_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-details");
  var FILE_MANAGER_NOTIFICATION_COMMON_NO_ITEM_CLASS = "".concat(FILE_MANAGER_NOTIFICATION_CLASS, "-common-no-item");
  var FileManagerNotificationControl = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(FileManagerNotificationControl, _Widget);
    function FileManagerNotificationControl() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = FileManagerNotificationControl.prototype;
    _proto._initMarkup = function _initMarkup() {
      var _this = this;
      _Widget.prototype._initMarkup.call(this);
      this._initActions();
      this._isInAdaptiveState = this._isSmallScreen();
      this._managerMap = {};
      this._notificationManagerStubId = null;
      this._setNotificationManager();
      var $progressPanelContainer = this.option('progressPanelContainer');
      var $progressDrawer = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_NOTIFICATION_DRAWER_CLASS).appendTo($progressPanelContainer);
      (0, _renderer.default)('<div>').addClass(FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS).appendTo($progressDrawer);
      var drawerOptions = (0, _extend.extend)({
        opened: false,
        position: 'right',
        template: function template(container) {
          return _this._ensureProgressPanelCreated(container);
        }
      }, this._getProgressDrawerAdaptiveOptions());
      this._progressDrawer = this._createComponent($progressDrawer, _ui3.default, drawerOptions);
      var $drawerContent = $progressDrawer.find(".".concat(FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS)).first();
      var contentRenderer = this.option('contentTemplate');
      if ((0, _type.isFunction)(contentRenderer)) {
        contentRenderer($drawerContent, this);
      }
    };
    _proto._setNotificationManager = function _setNotificationManager(options) {
      options = (0, _extend.extend)({
        onActionProgressStatusChanged: this._raiseActionProgress.bind(this)
      }, options);
      if (!this._notificationManagerStubId) {
        var stubManager = new _uiFile_manager.NotificationManagerStub(options);
        this._notificationManagerStubId = stubManager.getId();
        this._managerMap[this._notificationManagerStubId] = stubManager;
      }
      if (!this._isProgressDrawerDisabled()) {
        var notificationManagerComponent = this._getProgressManagerComponent();
        options.isActual = true;
        var defaultManager = new notificationManagerComponent(options);
        this._managerMap[defaultManager.getId()] = defaultManager;
      }
    };
    _proto._getNotificationManager = function _getNotificationManager(operationInfo) {
      var actualManagerId = (operationInfo === null || operationInfo === void 0 ? void 0 : operationInfo[_uiFile_manager.MANAGER_ID_NAME]) || this._getActualNotificationManagerId();
      return this._managerMap[actualManagerId] || this._managerMap[this._notificationManagerStubId];
    };
    _proto._clearManagerMap = function _clearManagerMap() {
      var stubManager = this._managerMap[this._notificationManagerStubId];
      delete this._managerMap;
      this._managerMap = _defineProperty({}, this._notificationManagerStubId, stubManager);
    };
    _proto._getActualNotificationManagerId = function _getActualNotificationManagerId() {
      var _this2 = this;
      return Object.keys(this._managerMap).filter(function (managerId) {
        return _this2._managerMap[managerId].isActual();
      })[0];
    };
    _proto.tryShowProgressPanel = function tryShowProgressPanel() {
      var _this3 = this;
      var promise = new _deferred.Deferred();
      var notificationManager = this._getNotificationManager();
      if (notificationManager.isActionProgressStatusDefault() || this._isProgressDrawerOpened() || this._isProgressDrawerDisabled()) {
        return promise.resolve().promise();
      }
      setTimeout(function () {
        _this3._progressDrawer.show().done(promise.resolve);
        _this3._hidePopup();
        notificationManager.tryHideActionProgress();
      });
      return promise.promise();
    };
    _proto.addOperation = function addOperation(processingMessage, allowCancel, allowProgressAutoUpdate) {
      var notificationManager = this._getNotificationManager();
      return notificationManager.addOperation(processingMessage, allowCancel, allowProgressAutoUpdate);
    };
    _proto.addOperationDetails = function addOperationDetails(operationInfo, details, showCloseButton) {
      var notificationManager = this._getNotificationManager(operationInfo);
      notificationManager.addOperationDetails(operationInfo, details, showCloseButton);
    };
    _proto.updateOperationItemProgress = function updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
      var notificationManager = this._getNotificationManager(operationInfo);
      notificationManager.updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress);
    };
    _proto.completeOperationItem = function completeOperationItem(operationInfo, itemIndex, commonProgress) {
      var notificationManager = this._getNotificationManager(operationInfo);
      notificationManager.completeOperationItem(operationInfo, itemIndex, commonProgress);
    };
    _proto.finishOperation = function finishOperation(operationInfo, commonProgress) {
      var notificationManager = this._getNotificationManager(operationInfo);
      notificationManager.finishOperation(operationInfo, commonProgress);
    };
    _proto.completeOperation = function completeOperation(operationInfo, commonText, isError, statusText) {
      var notificationManager = this._getNotificationManager(operationInfo);
      if (!isError) {
        this._showPopup(commonText);
      }
      notificationManager.completeOperation(operationInfo, commonText, isError, statusText);
      if (!this._isProgressDrawerOpened() || !notificationManager.hasNoOperations()) {
        notificationManager.updateActionProgressStatus(operationInfo);
      } else {
        notificationManager.tryHideActionProgress();
      }
    };
    _proto.completeSingleOperationWithError = function completeSingleOperationWithError(operationInfo, errorInfo) {
      var notificationManager = this._getNotificationManager(operationInfo);
      notificationManager.completeSingleOperationWithError(operationInfo, errorInfo);
      this._showPopupError(errorInfo);
    };
    _proto.addOperationDetailsError = function addOperationDetailsError(operationInfo, errorInfo) {
      var notificationManager = this._getNotificationManager(operationInfo);
      notificationManager.addOperationDetailsError(operationInfo, errorInfo);
      this._showPopupError(errorInfo);
    };
    _proto._hideProgressPanel = function _hideProgressPanel() {
      var _this4 = this;
      setTimeout(function () {
        return _this4._progressDrawer.hide();
      });
    };
    _proto._isSmallScreen = function _isSmallScreen() {
      if (!(0, _window.hasWindow)()) {
        return false;
      }
      return (0, _size.getWidth)(window) <= ADAPTIVE_STATE_SCREEN_WIDTH;
    };
    _proto._dimensionChanged = function _dimensionChanged(dimension) {
      if (!(dimension && dimension === 'height')) {
        this._checkAdaptiveState();
      }
    };
    _proto._checkAdaptiveState = function _checkAdaptiveState() {
      var oldState = this._isInAdaptiveState;
      this._isInAdaptiveState = this._isSmallScreen();
      if (oldState !== this._isInAdaptiveState && this._progressDrawer) {
        var notificationManager = this._getNotificationManager();
        if (notificationManager.handleDimensionChanged()) {
          var options = this._getProgressDrawerAdaptiveOptions();
          this._progressDrawer.option(options);
        }
      }
    };
    _proto._getProgressDrawerAdaptiveOptions = function _getProgressDrawerAdaptiveOptions() {
      if (this._isInAdaptiveState) {
        return {
          openedStateMode: 'overlap',
          shading: true,
          hideOnOutsideClick: true
        };
      } else {
        return {
          openedStateMode: 'shrink',
          shading: false,
          hideOnOutsideClick: false
        };
      }
    };
    _proto._ensureProgressPanelCreated = function _ensureProgressPanelCreated(container) {
      var _this5 = this;
      var notificationManager = this._getNotificationManager();
      notificationManager.ensureProgressPanelCreated(container, {
        onOperationCanceled: function onOperationCanceled(_ref) {
          var info = _ref.info;
          return _this5._raiseOperationCanceled(info);
        },
        onOperationItemCanceled: function onOperationItemCanceled(_ref2) {
          var item = _ref2.item,
              itemIndex = _ref2.itemIndex;
          return _this5._raiseOperationItemCanceled(item, itemIndex);
        },
        onPanelClosed: function onPanelClosed() {
          return _this5._hideProgressPanel();
        }
      });
    }

    // needed for editingProgress.tests.js
    ;
    _proto._getProgressManagerComponent = function _getProgressManagerComponent() {
      return _uiFile_manager.NotificationManager;
    };
    _proto._isProgressDrawerDisabled = function _isProgressDrawerDisabled() {
      return !this.option('showProgressPanel');
    };
    _proto._isProgressDrawerOpened = function _isProgressDrawerOpened() {
      return this._progressDrawer.option('opened');
    };
    _proto._hidePopup = function _hidePopup(forceHide) {
      if (!this.option('showNotificationPopup') && !forceHide) {
        return;
      }
      this._getNotificationPopup().hide();
    };
    _proto._showPopup = function _showPopup(content, errorMode) {
      if (this._isProgressDrawerOpened() || !this.option('showNotificationPopup')) {
        return;
      }
      this._getNotificationPopup().$wrapper().toggleClass(FILE_MANAGER_NOTIFICATION_POPUP_ERROR_CLASS, !!errorMode);
      this._getNotificationPopup().option('contentTemplate', content);
      if (!this._getNotificationPopup().option('visible')) {
        this._getNotificationPopup().show();
      }
    };
    _proto._showPopupError = function _showPopupError(errorInfo) {
      if (!this.option('showNotificationPopup')) {
        return;
      }
      var notificationManager = this._getNotificationManager();
      var $content = (0, _renderer.default)('<div>');
      var $message = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_NOTIFICATION_COMMON_CLASS).text(errorInfo.commonErrorText);
      var $separator = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_NOTIFICATION_SEPARATOR_CLASS);
      (0, _renderer.default)('<div>').appendTo($separator);
      var $details = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_NOTIFICATION_DETAILS_CLASS);
      if (errorInfo.item) {
        notificationManager.createErrorDetailsProgressBox($details, errorInfo.item, errorInfo.detailErrorText);
      } else {
        $message.addClass(FILE_MANAGER_NOTIFICATION_COMMON_NO_ITEM_CLASS);
        notificationManager.renderError($details, errorInfo.detailErrorText);
      }
      $content.append($message, $separator, $details);
      this._showPopup($content, true);
    };
    _proto._getNotificationPopup = function _getNotificationPopup() {
      if (!this._notificationPopup) {
        var $popup = (0, _renderer.default)('<div>').appendTo(this.$element());
        this._notificationPopup = this._createComponent($popup, _ui2.default, {
          container: this.$element(),
          width: 'auto',
          height: 'auto',
          showTitle: false,
          dragEnabled: false,
          shading: false,
          visible: false,
          hideOnOutsideClick: true,
          animation: {
            duration: 0
          },
          position: {
            my: 'right top',
            at: 'right top',
            of: this.option('positionTarget'),
            offset: '-10 -5'
          },
          _wrapperClassExternal: FILE_MANAGER_NOTIFICATION_POPUP_CLASS
        });
      }
      return this._notificationPopup;
    };
    _proto._raiseActionProgress = function _raiseActionProgress(message, status) {
      this._actions.onActionProgress({
        message: message,
        status: status
      });
    };
    _proto._raiseOperationCanceled = function _raiseOperationCanceled(info) {
      this._actions.onOperationCanceled({
        info: info
      });
    };
    _proto._raiseOperationItemCanceled = function _raiseOperationItemCanceled(item, index) {
      this._actions.onOperationItemCanceled({
        item: item,
        itemIndex: index
      });
    };
    _proto._initActions = function _initActions() {
      this._actions = {
        onActionProgress: this._createActionByOption('onActionProgress'),
        onOperationCanceled: this._createActionByOption('onOperationCanceled'),
        onOperationItemCanceled: this._createActionByOption('onOperationItemCanceled')
      };
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        progressPanelContainer: null,
        contentTemplate: null,
        onActionProgress: null,
        onOperationCanceled: null,
        onOperationItemCanceled: null,
        showProgressPanel: true,
        showNotificationPopup: true
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name;
      switch (name) {
        case 'progressPanelContainer':
        case 'contentTemplate':
          break;
        case 'showProgressPanel':
          this._setNotificationManager();
          this._getNotificationManager().updateActionProgressStatus();
          if (!args.value) {
            this._hideProgressPanel();
            this._clearManagerMap();
          }
          this._progressDrawer.repaint();
          break;
        case 'showNotificationPopup':
          if (!args.value) {
            this._hidePopup(true);
          }
          break;
        case 'onActionProgress':
        case 'onOperationCanceled':
        case 'onOperationItemCanceled':
          this._actions[name] = this._createActionByOption(name);
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    return FileManagerNotificationControl;
  }(_ui.default);
  exports.default = FileManagerNotificationControl;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/utils/deferred","../../core/utils/window","../widget/ui.widget","../popup/ui.popup","../drawer/ui.drawer","./ui.file_manager.notification_manager"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/type"), require("../../core/utils/deferred"), require("../../core/utils/window"), require("../widget/ui.widget"), require("../popup/ui.popup"), require("../drawer/ui.drawer"), require("./ui.file_manager.notification_manager"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.notification.js.map