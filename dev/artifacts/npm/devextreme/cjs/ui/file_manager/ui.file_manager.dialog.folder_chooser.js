/**
* DevExtreme (cjs/ui/file_manager/ui.file_manager.dialog.folder_chooser.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _message = _interopRequireDefault(require("../../localization/message"));
var _uiFile_manager = require("./ui.file_manager.common");
var _uiFile_manager2 = _interopRequireDefault(require("./ui.file_manager.dialog"));
var _uiFile_manager3 = _interopRequireDefault(require("./ui.file_manager.files_tree_view"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
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
