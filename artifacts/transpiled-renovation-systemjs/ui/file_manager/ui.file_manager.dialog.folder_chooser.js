!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.dialog.folder_chooser.js"], ["../../core/renderer","../../core/utils/extend","../../localization/message","./ui.file_manager.common","./ui.file_manager.dialog","./ui.file_manager.files_tree_view"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.dialog.folder_chooser.js", ["../../core/renderer", "../../core/utils/extend", "../../localization/message", "./ui.file_manager.common", "./ui.file_manager.dialog", "./ui.file_manager.files_tree_view"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _uiFile_manager = $__require("./ui.file_manager.common");
  var _uiFile_manager2 = _interopRequireDefault($__require("./ui.file_manager.dialog"));
  var _uiFile_manager3 = _interopRequireDefault($__require("./ui.file_manager.files_tree_view"));
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
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var FILE_MANAGER_DIALOG_FOLDER_CHOOSER = 'dx-filemanager-dialog-folder-chooser';
  var FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP = 'dx-filemanager-dialog-folder-chooser-popup';
  var FileManagerFolderChooserDialog = /*#__PURE__*/function (_FileManagerDialogBas) {
    _inheritsLoose(FileManagerFolderChooserDialog, _FileManagerDialogBas);
    function FileManagerFolderChooserDialog() {
      return _FileManagerDialogBas.apply(this, arguments) || this;
    }
    var _proto = FileManagerFolderChooserDialog.prototype;
    _proto.show = function show() {
      var _this$_filesTreeView;
      this._setSelectedDirInfo(null);
      (_this$_filesTreeView = this._filesTreeView) === null || _this$_filesTreeView === void 0 ? void 0 : _this$_filesTreeView.refresh();
      _FileManagerDialogBas.prototype.show.call(this);
    };
    _proto.switchToCopyDialog = function switchToCopyDialog(targetItemInfos) {
      this._targetItemInfos = targetItemInfos;
      this._setTitle(_message.default.format('dxFileManager-dialogDirectoryChooserCopyTitle'));
      this._setApplyButtonOptions({
        text: _message.default.format('dxFileManager-dialogDirectoryChooserCopyButtonText'),
        disabled: true
      });
    };
    _proto.switchToMoveDialog = function switchToMoveDialog(targetItemInfos) {
      this._targetItemInfos = targetItemInfos;
      this._setTitle(_message.default.format('dxFileManager-dialogDirectoryChooserMoveTitle'));
      this._setApplyButtonOptions({
        text: _message.default.format('dxFileManager-dialogDirectoryChooserMoveButtonText'),
        disabled: true
      });
    };
    _proto._getDialogOptions = function _getDialogOptions() {
      return (0, _extend.extend)(_FileManagerDialogBas.prototype._getDialogOptions.call(this), {
        contentCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER,
        popupCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP
      });
    };
    _proto._createContentTemplate = function _createContentTemplate(element) {
      var _this = this;
      _FileManagerDialogBas.prototype._createContentTemplate.call(this, element);
      this._filesTreeView = this._createComponent((0, _renderer.default)('<div>'), _uiFile_manager3.default, {
        getDirectories: this.option('getDirectories'),
        getCurrentDirectory: function getCurrentDirectory() {
          return _this._getDialogSelectedDirectory();
        },
        onDirectoryClick: function onDirectoryClick(e) {
          return _this._onFilesTreeViewDirectoryClick(e);
        },
        onFilesTreeViewContentReady: function onFilesTreeViewContentReady() {
          return _this._toggleUnavailableLocationsDisabled(true);
        }
      });
      this._$contentElement.append(this._filesTreeView.$element());
    };
    _proto._getDialogResult = function _getDialogResult() {
      var result = this._getDialogSelectedDirectory();
      return result ? {
        folder: result
      } : result;
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_FileManagerDialogBas.prototype._getDefaultOptions.call(this), {
        getItems: null
      });
    };
    _proto._getDialogSelectedDirectory = function _getDialogSelectedDirectory() {
      return this._selectedDirectoryInfo;
    };
    _proto._onFilesTreeViewDirectoryClick = function _onFilesTreeViewDirectoryClick(_ref) {
      var itemData = _ref.itemData;
      this._setSelectedDirInfo(itemData);
      this._filesTreeView.updateCurrentDirectory();
    };
    _proto._setSelectedDirInfo = function _setSelectedDirInfo(dirInfo) {
      this._selectedDirectoryInfo = dirInfo;
      this._setApplyButtonOptions({
        disabled: !dirInfo
      });
    };
    _proto._onPopupShown = function _onPopupShown() {
      this._toggleUnavailableLocationsDisabled(true);
      _FileManagerDialogBas.prototype._onPopupShown.call(this);
    };
    _proto._onPopupHidden = function _onPopupHidden() {
      this._toggleUnavailableLocationsDisabled(false);
      _FileManagerDialogBas.prototype._onPopupHidden.call(this);
    };
    _proto._toggleUnavailableLocationsDisabled = function _toggleUnavailableLocationsDisabled(isDisabled) {
      var _this2 = this;
      if (!this._filesTreeView) {
        return;
      }
      var locations = this._getLocationsToProcess(isDisabled);
      this._filesTreeView.toggleDirectoryExpandedStateRecursive(locations.locationsToExpand[0], isDisabled).then(function () {
        return _this2._filesTreeView.toggleDirectoryLineExpandedState(locations.locationsToCollapse, !isDisabled).then(function () {
          return locations.locationKeysToDisable.forEach(function (key) {
            return _this2._filesTreeView.toggleNodeDisabledState(key, isDisabled);
          });
        });
      });
    };
    _proto._getLocationsToProcess = function _getLocationsToProcess(isDisabled) {
      var _expandMap$keys;
      var expandLocations = {};
      var collapseLocations = {};
      this._targetItemInfos.forEach(function (itemInfo) {
        if (itemInfo.parentDirectory) {
          expandLocations[itemInfo.parentDirectory.getInternalKey()] = itemInfo.parentDirectory;
        }
        if (itemInfo.fileItem.isDirectory) {
          collapseLocations[itemInfo.getInternalKey()] = itemInfo;
        }
      });
      var expandMap = (0, _uiFile_manager.getMapFromObject)(expandLocations);
      var collapseMap = (0, _uiFile_manager.getMapFromObject)(collapseLocations);
      return {
        locationsToExpand: isDisabled ? expandMap.values : [],
        locationsToCollapse: isDisabled ? collapseMap.values : [],
        locationKeysToDisable: (_expandMap$keys = expandMap.keys).concat.apply(_expandMap$keys, _toConsumableArray(collapseMap.keys))
      };
    };
    return FileManagerFolderChooserDialog;
  }(_uiFile_manager2.default);
  var _default = FileManagerFolderChooserDialog;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","../../localization/message","./ui.file_manager.common","./ui.file_manager.dialog","./ui.file_manager.files_tree_view"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("../../localization/message"), require("./ui.file_manager.common"), require("./ui.file_manager.dialog"), require("./ui.file_manager.files_tree_view"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.dialog.folder_chooser.js.map