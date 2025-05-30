/**
* DevExtreme (cjs/ui/file_manager/ui.file_manager.js)
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
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");
var _common = require("../../core/utils/common");
var _message = _interopRequireDefault(require("../../localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _notify = _interopRequireDefault(require("../notify"));
var _uiFile_manager = require("./ui.file_manager.common");
var _file_items_controller = require("./file_items_controller");
var _uiFile_manager2 = require("./ui.file_manager.command_manager");
var _uiFile_manager3 = _interopRequireDefault(require("./ui.file_manager.context_menu"));
var _uiFile_manager4 = _interopRequireDefault(require("./ui.file_manager.files_tree_view"));
var _uiFile_managerItem_list = _interopRequireDefault(require("./ui.file_manager.item_list.details"));
var _uiFile_managerItem_list2 = _interopRequireDefault(require("./ui.file_manager.item_list.thumbnails"));
var _uiFile_manager5 = _interopRequireDefault(require("./ui.file_manager.toolbar"));
var _uiFile_manager6 = _interopRequireDefault(require("./ui.file_manager.notification"));
var _uiFile_manager7 = _interopRequireDefault(require("./ui.file_manager.editing"));
var _uiFile_manager8 = _interopRequireDefault(require("./ui.file_manager.breadcrumbs"));
var _uiFile_manager9 = _interopRequireDefault(require("./ui.file_manager.adaptivity"));
var _utils = require("../../core/options/utils");
var _comparator = require("../../core/utils/comparator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var FILE_MANAGER_CLASS = 'dx-filemanager';
var FILE_MANAGER_WRAPPER_CLASS = FILE_MANAGER_CLASS + '-wrapper';
var FILE_MANAGER_CONTAINER_CLASS = FILE_MANAGER_CLASS + '-container';
var FILE_MANAGER_DIRS_PANEL_CLASS = FILE_MANAGER_CLASS + '-dirs-panel';
var FILE_MANAGER_EDITING_CONTAINER_CLASS = FILE_MANAGER_CLASS + '-editing-container';
var FILE_MANAGER_ITEMS_PANEL_CLASS = FILE_MANAGER_CLASS + '-items-panel';
var FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS = FILE_MANAGER_CLASS + '-item-custom-thumbnail';
var PARENT_DIRECTORY_KEY_PREFIX = '[*DXPDK*]$40F96F03-FBD8-43DF-91BE-F55F4B8BA871$';
var VIEW_AREAS = {
  folders: 'navPane',
  items: 'itemView'
};
var FileManager = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(FileManager, _Widget);
  function FileManager() {
    return _Widget.apply(this, arguments) || this;
  }
  var _proto = FileManager.prototype;
  _proto._initTemplates = function _initTemplates() {};
  _proto._init = function _init() {
    _Widget.prototype._init.call(this);
    this._initActions();
    this._providerUpdateDeferred = null;
    this._lockCurrentPathProcessing = false;
    this._wasRendered = false;
    this._controller = new _file_items_controller.FileItemsController({
      currentPath: this.option('currentPath'),
      currentPathKeys: this.option('currentPathKeys'),
      rootText: this.option('rootFolderName'),
      fileProvider: this.option('fileSystemProvider'),
      allowedFileExtensions: this.option('allowedFileExtensions'),
      uploadMaxFileSize: this.option('upload').maxFileSize,
      uploadChunkSize: this.option('upload').chunkSize,
      onInitialized: this._onControllerInitialized.bind(this),
      onDataLoading: this._onDataLoading.bind(this),
      onSelectedDirectoryChanged: this._onSelectedDirectoryChanged.bind(this),
      onPathPotentiallyChanged: this._checkPathActuality.bind(this),
      editingEvents: this._actions.editing
    });
  };
  _proto._initMarkup = function _initMarkup() {
    _Widget.prototype._initMarkup.call(this);
    this._firstItemViewLoad = true;
    this._lockSelectionProcessing = false;
    this._lockFocusedItemProcessing = false;
    this._itemKeyToFocus = undefined;
    this._loadedWidgets = [];
    this._commandManager = new _uiFile_manager2.FileManagerCommandManager(this.option('permissions'));
    this.$element().addClass(FILE_MANAGER_CLASS);
    if (this._wasRendered) {
      this._prepareToLoad();
    } else {
      this._wasRendered = true;
    }
    this._createNotificationControl();
    this._initCommandManager();
  };
  _proto._createNotificationControl = function _createNotificationControl() {
    var _this = this;
    var $notificationControl = (0, _renderer.default)('<div>').addClass('dx-filemanager-notification-container').appendTo(this.$element());
    this._notificationControl = this._createComponent($notificationControl, _uiFile_manager6.default, {
      progressPanelContainer: this.$element(),
      contentTemplate: function contentTemplate(container, notificationControl) {
        return _this._createWrapper(container, notificationControl);
      },
      onActionProgress: function onActionProgress(e) {
        return _this._onActionProgress(e);
      },
      positionTarget: ".".concat(FILE_MANAGER_CONTAINER_CLASS),
      showProgressPanel: this.option('notifications.showPanel'),
      showNotificationPopup: this.option('notifications.showPopup')
    });
  };
  _proto._createWrapper = function _createWrapper(container, notificationControl) {
    var _this2 = this;
    this._$wrapper = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_WRAPPER_CLASS).appendTo(container);
    this._createEditing(notificationControl);
    var $toolbar = (0, _renderer.default)('<div>').appendTo(this._$wrapper);
    this._toolbar = this._createComponent($toolbar, _uiFile_manager5.default, {
      commandManager: this._commandManager,
      generalItems: this.option('toolbar.items'),
      fileItems: this.option('toolbar.fileSelectionItems'),
      itemViewMode: this.option('itemView').mode,
      onItemClick: function onItemClick(args) {
        return _this2._actions.onToolbarItemClick(args);
      }
    });
    this._createAdaptivityControl();
  };
  _proto._createAdaptivityControl = function _createAdaptivityControl() {
    var _this3 = this;
    var $container = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_CONTAINER_CLASS).appendTo(this._$wrapper);
    this._adaptivityControl = this._createComponent($container, _uiFile_manager9.default, {
      drawerTemplate: function drawerTemplate(container) {
        return _this3._createFilesTreeView(container);
      },
      contentTemplate: function contentTemplate(container) {
        return _this3._createItemsPanel(container);
      },
      onAdaptiveStateChanged: function onAdaptiveStateChanged(e) {
        return _this3._onAdaptiveStateChanged(e);
      }
    });
    this._editing.setUploaderSplitterElement(this._adaptivityControl.getSplitterElement());
  };
  _proto._createEditing = function _createEditing(notificationControl) {
    var _this4 = this;
    var $editingContainer = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_EDITING_CONTAINER_CLASS).appendTo(this.$element());
    this._editing = this._createComponent($editingContainer, _uiFile_manager7.default, {
      controller: this._controller,
      model: {
        getMultipleSelectedItems: this._getSelectedItemInfos.bind(this)
      },
      getItemThumbnail: this._getItemThumbnailInfo.bind(this),
      notificationControl,
      uploadDropZonePlaceholderContainer: this.$element(),
      rtlEnabled: this.option('rtlEnabled'),
      onSuccess: function onSuccess(_ref) {
        var updatedOnlyFiles = _ref.updatedOnlyFiles;
        return _this4._redrawComponent(updatedOnlyFiles);
      },
      onError: function onError(e) {
        return _this4._onEditingError(e);
      }
    });
  };
  _proto._createItemsPanel = function _createItemsPanel($container) {
    this._$itemsPanel = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_ITEMS_PANEL_CLASS).appendTo($container);
    this._createBreadcrumbs(this._$itemsPanel);
    this._createItemView(this._$itemsPanel);
    this._updateUploadDropZone();
  };
  _proto._updateUploadDropZone = function _updateUploadDropZone() {
    var dropZone = this._commandManager.isCommandAvailable('upload') ? this._$itemsPanel : (0, _renderer.default)();
    this._editing.setUploaderDropZone(dropZone);
  };
  _proto._createFilesTreeView = function _createFilesTreeView(container) {
    var _this5 = this;
    this._filesTreeViewContextMenu = this._createContextMenu(false, VIEW_AREAS.folders);
    var $filesTreeView = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_DIRS_PANEL_CLASS).appendTo(container);
    this._filesTreeView = this._createComponent($filesTreeView, _uiFile_manager4.default, {
      storeExpandedState: true,
      contextMenu: this._filesTreeViewContextMenu,
      getDirectories: this.getDirectories.bind(this),
      getCurrentDirectory: this._getCurrentDirectory.bind(this),
      onDirectoryClick: function onDirectoryClick(_ref2) {
        var itemData = _ref2.itemData;
        return _this5._setCurrentDirectory(itemData);
      },
      onItemListDataLoaded: function onItemListDataLoaded() {
        return _this5._tryEndLoading(VIEW_AREAS.folders);
      }
    });
    this._filesTreeView.updateCurrentDirectory();
  };
  _proto._createItemView = function _createItemView($container, viewMode) {
    var _this6 = this;
    this._itemViewContextMenu = this._createContextMenu(true, VIEW_AREAS.items);
    var itemViewOptions = this.option('itemView');
    var options = {
      selectionMode: this.option('selectionMode'),
      selectedItemKeys: this.option('selectedItemKeys'),
      focusedItemKey: this.option('focusedItemKey'),
      contextMenu: this._itemViewContextMenu,
      getItems: this._getItemViewItems.bind(this),
      onError: function onError(_ref3) {
        var error = _ref3.error;
        return _this6._showError(error);
      },
      onSelectionChanged: this._onItemViewSelectionChanged.bind(this),
      onFocusedItemChanged: this._onItemViewFocusedItemChanged.bind(this),
      onSelectedItemOpened: this._onSelectedItemOpened.bind(this),
      onContextMenuShowing: function onContextMenuShowing(e) {
        return _this6._onContextMenuShowing(VIEW_AREAS.items, e);
      },
      onItemListItemsLoaded: function onItemListItemsLoaded() {
        return _this6._tryEndLoading(VIEW_AREAS.items);
      },
      getItemThumbnail: this._getItemThumbnailInfo.bind(this),
      customizeDetailColumns: this.option('customizeDetailColumns'),
      detailColumns: this.option('itemView.details.columns')
    };
    var $itemView = (0, _renderer.default)('<div>').appendTo($container);
    viewMode = viewMode || itemViewOptions.mode;
    var widgetClass = viewMode === 'thumbnails' ? _uiFile_managerItem_list2.default : _uiFile_managerItem_list.default;
    this._itemView = this._createComponent($itemView, widgetClass, options);
  };
  _proto._createBreadcrumbs = function _createBreadcrumbs($container) {
    var _this7 = this;
    var $breadcrumbs = (0, _renderer.default)('<div>').appendTo($container);
    this._breadcrumbs = this._createComponent($breadcrumbs, _uiFile_manager8.default, {
      rootFolderDisplayName: this.option('rootFolderName'),
      onCurrentDirectoryChanging: function onCurrentDirectoryChanging(_ref4) {
        var currentDirectory = _ref4.currentDirectory;
        return _this7._setCurrentDirectory(currentDirectory, true);
      }
    });
    this._breadcrumbs.setCurrentDirectory(this._getCurrentDirectory());
  };
  _proto._createContextMenu = function _createContextMenu(isolateCreationItemCommands, viewArea) {
    var _this8 = this;
    var $contextMenu = (0, _renderer.default)('<div>').appendTo(this._$wrapper);
    return this._createComponent($contextMenu, _uiFile_manager3.default, {
      commandManager: this._commandManager,
      items: this.option('contextMenu.items'),
      onItemClick: function onItemClick(args) {
        return _this8._actions.onContextMenuItemClick(args);
      },
      onContextMenuShowing: function onContextMenuShowing(e) {
        return _this8._onContextMenuShowing(viewArea, e);
      },
      isolateCreationItemCommands,
      viewArea
    });
  };
  _proto._initCommandManager = function _initCommandManager() {
    var _this9 = this;
    var actions = (0, _extend.extend)(this._editing.getCommandActions(), {
      refresh: function refresh() {
        return _this9._refreshAndShowProgress();
      },
      thumbnails: function thumbnails() {
        return _this9.option('itemView.mode', 'thumbnails');
      },
      details: function details() {
        return _this9.option('itemView.mode', 'details');
      },
      clearSelection: function clearSelection() {
        return _this9._clearSelection();
      },
      showNavPane: function showNavPane() {
        return _this9._adaptivityControl.toggleDrawer();
      }
    });
    this._commandManager.registerActions(actions);
  };
  _proto._onItemViewSelectionChanged = function _onItemViewSelectionChanged(_ref5) {
    var selectedItemInfos = _ref5.selectedItemInfos,
      selectedItems = _ref5.selectedItems,
      selectedItemKeys = _ref5.selectedItemKeys,
      currentSelectedItemKeys = _ref5.currentSelectedItemKeys,
      currentDeselectedItemKeys = _ref5.currentDeselectedItemKeys;
    this._lockSelectionProcessing = true;
    this.option('selectedItemKeys', selectedItemKeys);
    this._lockSelectionProcessing = false;
    this._actions.onSelectionChanged({
      selectedItems,
      selectedItemKeys,
      currentSelectedItemKeys,
      currentDeselectedItemKeys
    });
    this._updateToolbar(selectedItemInfos);
  };
  _proto._onItemViewFocusedItemChanged = function _onItemViewFocusedItemChanged(e) {
    this._lockFocusedItemProcessing = true;
    this.option('focusedItemKey', e.itemKey);
    this._lockFocusedItemProcessing = false;
    this._actions.onFocusedItemChanged({
      item: e.item,
      itemElement: e.itemElement
    });
  };
  _proto._onAdaptiveStateChanged = function _onAdaptiveStateChanged(_ref6) {
    var enabled = _ref6.enabled;
    this._commandManager.setCommandEnabled('showNavPane', enabled);
    this._updateToolbar();
  };
  _proto._onActionProgress = function _onActionProgress(_ref7) {
    var message = _ref7.message,
      status = _ref7.status;
    this._toolbar.updateRefreshItem(message, status);
    this._updateToolbar();
  };
  _proto._onEditingError = function _onEditingError(e) {
    var args = (0, _uiFile_manager.extendAttributes)({}, e, ['errorCode', 'errorText', 'fileSystemItem']);
    this._actions.onErrorOccurred(args);
    e.errorText = args.errorText;
  };
  _proto._refreshAndShowProgress = function _refreshAndShowProgress() {
    var _this10 = this;
    this._prepareToLoad();
    return (0, _deferred.when)(this._notificationControl.tryShowProgressPanel(), this._controller.refresh()).then(function () {
      return _this10._filesTreeView.refresh();
    });
  };
  _proto._isAllWidgetsLoaded = function _isAllWidgetsLoaded() {
    return this._loadedWidgets.length === 2 && this._loadedWidgets.indexOf(VIEW_AREAS.folders) !== -1 && this._loadedWidgets.indexOf(VIEW_AREAS.items) !== -1;
  };
  _proto._tryEndLoading = function _tryEndLoading(area) {
    this._loadedWidgets.push(area);
    if (this._isAllWidgetsLoaded()) {
      this._controller.endSingleLoad();
    }
  };
  _proto._prepareToLoad = function _prepareToLoad() {
    this._loadedWidgets = [];
    this._controller.startSingleLoad();
  };
  _proto._updateToolbar = function _updateToolbar(selectedItems) {
    var items = selectedItems || this._getSelectedItemInfos();
    this._toolbar.option('contextItems', (0, _common.ensureDefined)(items, []));
  };
  _proto._switchView = function _switchView(viewMode) {
    this._disposeWidget(this._itemView.option('contextMenu'));
    this._disposeWidget(this._itemView);
    this._createItemView(this._$itemsPanel, viewMode);
    this._toolbar.option({
      itemViewMode: viewMode
    });
  };
  _proto._disposeWidget = function _disposeWidget(widget) {
    widget.dispose();
    widget.$element().remove();
  };
  _proto._clearSelection = function _clearSelection() {
    this._itemView.clearSelection();
  };
  _proto._showError = function _showError(message) {
    // TODO use notification control instead of it
    this._showNotification(message, false);
  };
  _proto._showNotification = function _showNotification(message, isSuccess) {
    (0, _notify.default)({
      message: message,
      width: 450
    }, isSuccess ? 'success' : 'error', 5000);
  };
  _proto._redrawComponent = function _redrawComponent(onlyFileItemsView) {
    var _this11 = this;
    this._itemView.refresh().then(function () {
      return !onlyFileItemsView && _this11._filesTreeView.refresh();
    });
  };
  _proto._getItemViewItems = function _getItemViewItems() {
    var _this12 = this;
    var showFolders = this.option('itemView').showFolders;
    var result = this._controller.getCurrentItems(!showFolders);
    this._updateToolbarWithSelectionOnFirstLoad(result);
    if (this.option('itemView.showParentFolder')) {
      result = (0, _deferred.when)(result).then(function (items) {
        return _this12._getPreparedItemViewItems(items);
      });
    }
    return result;
  };
  _proto._updateToolbarWithSelectionOnFirstLoad = function _updateToolbarWithSelectionOnFirstLoad(itemsResult) {
    var _this13 = this;
    if (!this._firstItemViewLoad) {
      return;
    }
    this._firstItemViewLoad = false;
    var selectedItemKeys = this.option('selectedItemKeys');
    if (selectedItemKeys.length > 0) {
      (0, _deferred.when)(itemsResult).done(function (items) {
        var selectedItems = (0, _uiFile_manager.findItemsByKeys)(items, selectedItemKeys);
        if (selectedItems.length > 0) {
          _this13._updateToolbar(selectedItems);
        }
      });
    }
  };
  _proto._getPreparedItemViewItems = function _getPreparedItemViewItems(items) {
    var selectedDir = this._getCurrentDirectory();
    if (selectedDir.fileItem.isRoot()) {
      return items;
    }
    var parentDirItem = selectedDir.fileItem.createClone();
    parentDirItem.isParentFolder = true;
    parentDirItem.name = '..';
    parentDirItem.relativeName = '..';
    parentDirItem.key = "".concat(PARENT_DIRECTORY_KEY_PREFIX).concat(selectedDir.fileItem.key);
    var itemsCopy = _toConsumableArray(items);
    itemsCopy.unshift({
      fileItem: parentDirItem,
      icon: 'parentfolder'
    });
    return itemsCopy;
  };
  _proto._onContextMenuShowing = function _onContextMenuShowing(viewArea, e) {
    var _e$itemData;
    var eventArgs = (0, _uiFile_manager.extendAttributes)({}, e, ['targetElement', 'cancel', 'event']);
    eventArgs = (0, _extend.extend)(eventArgs, {
      viewArea,
      fileSystemItem: (_e$itemData = e.itemData) === null || _e$itemData === void 0 ? void 0 : _e$itemData.fileItem,
      _isActionButton: e.isActionButton
    });
    this._actions.onContextMenuShowing(eventArgs);
    e.cancel = (0, _common.ensureDefined)(eventArgs.cancel, false);
  };
  _proto._getItemThumbnailInfo = function _getItemThumbnailInfo(fileInfo) {
    var func = this.option('customizeThumbnail');
    var thumbnail = (0, _type.isFunction)(func) ? func(fileInfo.fileItem) : fileInfo.fileItem.thumbnail;
    if (thumbnail) {
      return {
        thumbnail,
        cssClass: FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS
      };
    }
    return {
      thumbnail: fileInfo.icon
    };
  };
  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
      fileSystemProvider: null,
      currentPath: '',
      currentPathKeys: [],
      rootFolderName: _message.default.format('dxFileManager-rootDirectoryName'),
      selectionMode: 'multiple',
      // "single"

      selectedItemKeys: [],
      focusedItemKey: undefined,
      toolbar: {
        items: ['showNavPane', 'create', 'upload', 'switchView', {
          name: 'separator',
          location: 'after'
        }, 'refresh'],
        fileSelectionItems: ['download', 'separator', 'move', 'copy', 'rename', 'separator', 'delete', 'clearSelection', {
          name: 'separator',
          location: 'after'
        }, 'refresh']
      },
      contextMenu: {
        items: ['create', 'upload', 'rename', 'move', 'copy', 'delete', 'refresh', 'download']
      },
      itemView: {
        details: {
          columns: ['thumbnail', 'name', 'dateModified', 'size']
        },
        mode: 'details',
        // "thumbnails"
        showFolders: true,
        showParentFolder: true
      },
      customizeThumbnail: null,
      customizeDetailColumns: null,
      onContextMenuItemClick: null,
      onContextMenuShowing: null,
      onCurrentDirectoryChanged: null,
      onSelectedFileOpened: null,
      onSelectionChanged: null,
      onFocusedItemChanged: null,
      onToolbarItemClick: null,
      onErrorOccurred: null,
      onDirectoryCreating: null,
      onDirectoryCreated: null,
      onItemRenaming: null,
      onItemRenamed: null,
      onItemDeleting: null,
      onItemDeleted: null,
      onItemCopying: null,
      onItemCopied: null,
      onItemMoving: null,
      onItemMoved: null,
      onFileUploading: null,
      onFileUploaded: null,
      onItemDownloading: null,
      allowedFileExtensions: [],
      upload: {
        maxFileSize: 0,
        chunkSize: 200000
      },
      permissions: (0, _extend.extend)({}, _uiFile_manager2.defaultPermissions),
      notifications: {
        showPanel: true,
        showPopup: true
      }
    });
  };
  _proto.option = function option(options, value) {
    var _this14 = this;
    var optionsToCheck = (0, _utils.normalizeOptions)(options, value);
    var isGetter = arguments.length < 2 && (0, _type.type)(options) !== 'object';
    var isOptionDefined = function isOptionDefined(name) {
      return (0, _type.isDefined)(optionsToCheck[name]);
    };
    var isOptionValueDiffers = function isOptionValueDiffers(name) {
      if (!isOptionDefined(name)) {
        return false;
      }
      var previousValue = _this14.option(name);
      var value = optionsToCheck[name];
      return !(0, _comparator.equals)(previousValue, value);
    };
    if (!isGetter && isOptionDefined('fileSystemProvider')) {
      this._providerUpdateDeferred = new _deferred.Deferred();
      if (isOptionValueDiffers('currentPath') || isOptionValueDiffers('currentPathKeys')) {
        this._lockCurrentPathProcessing = true;
      }
    }
    return _Widget.prototype.option.apply(this, arguments);
  };
  _proto._optionChanged = function _optionChanged(args) {
    var _this15 = this;
    var name = args.name;
    switch (name) {
      case 'currentPath':
        {
          var updateFunc = function updateFunc() {
            _this15._lockCurrentPathProcessing = false;
            return _this15._controller.setCurrentPath(args.value);
          };
          this._lockCurrentPathProcessing = true;
          this._providerUpdateDeferred ? this._providerUpdateDeferred.then(updateFunc) : updateFunc();
        }
        break;
      case 'currentPathKeys':
        {
          var _updateFunc = function _updateFunc() {
            _this15._lockCurrentPathProcessing = false;
            return _this15._controller.setCurrentPathByKeys(args.value);
          };
          this._lockCurrentPathProcessing = true;
          this._providerUpdateDeferred ? this._providerUpdateDeferred.then(_updateFunc) : _updateFunc();
        }
        break;
      case 'selectedItemKeys':
        if (!this._lockSelectionProcessing && this._itemView) {
          this._itemView.option('selectedItemKeys', args.value);
        }
        break;
      case 'focusedItemKey':
        if (!this._lockFocusedItemProcessing && this._itemView) {
          this._itemView.option('focusedItemKey', args.value);
        }
        break;
      case 'rootFolderName':
        this._controller.setRootText(args.value);
        this._invalidate();
        break;
      case 'fileSystemProvider':
        {
          if (!this._lockCurrentPathProcessing) {
            this._providerUpdateDeferred = new _deferred.Deferred();
          }
          var pathKeys = this._lockCurrentPathProcessing ? undefined : this.option('currentPathKeys');
          this._controller.updateProvider(args.value, pathKeys).then(function () {
            return _this15._providerUpdateDeferred.resolve();
          }).always(function () {
            _this15._providerUpdateDeferred = null;
            _this15.repaint();
          });
          break;
        }
      case 'allowedFileExtensions':
        this._controller.setAllowedFileExtensions(args.value);
        this._invalidate();
        break;
      case 'upload':
        this._controller.setUploadOptions(this.option('upload'));
        this._invalidate();
        break;
      case 'permissions':
        this._commandManager.updatePermissions(this.option('permissions'));
        this._filesTreeViewContextMenu.tryUpdateVisibleContextMenu();
        this._itemViewContextMenu.tryUpdateVisibleContextMenu();
        this._toolbar.updateItemPermissions();
        this._updateUploadDropZone();
        break;
      case 'selectionMode':
      case 'customizeThumbnail':
      case 'customizeDetailColumns':
        this._invalidate();
        break;
      case 'itemView':
        if (args.fullName === 'itemView.mode') {
          this._switchView(args.value);
        } else {
          this._invalidate();
        }
        break;
      case 'toolbar':
        {
          var toolbarOptions = {};
          if (args.fullName === 'toolbar') {
            if (args.value.items) {
              toolbarOptions.generalItems = args.value.items;
            }
            if (args.value.fileSelectionItems) {
              toolbarOptions.fileItems = args.value.fileSelectionItems;
            }
          }
          if (args.fullName.indexOf('toolbar.items') === 0) {
            toolbarOptions.generalItems = this.option('toolbar.items');
          }
          if (args.fullName.indexOf('toolbar.fileSelectionItems') === 0) {
            toolbarOptions.fileItems = this.option('toolbar.fileSelectionItems');
          }
          this._toolbar.option(toolbarOptions);
        }
        break;
      case 'contextMenu':
        if (args.fullName === 'contextMenu' && args.value.items || args.fullName.indexOf('contextMenu.items') === 0) {
          var contextMenuItems = this.option('contextMenu.items');
          this._filesTreeViewContextMenu.option('items', contextMenuItems);
          this._itemViewContextMenu.option('items', contextMenuItems);
        }
        break;
      case 'notifications':
        this._notificationControl.option('showProgressPanel', this.option('notifications.showPanel'));
        this._notificationControl.option('showNotificationPopup', this.option('notifications.showPopup'));
        break;
      case 'onContextMenuItemClick':
      case 'onContextMenuShowing':
      case 'onCurrentDirectoryChanged':
      case 'onSelectedFileOpened':
      case 'onSelectionChanged':
      case 'onFocusedItemChanged':
      case 'onToolbarItemClick':
      case 'onErrorOccurred':
        this._actions[name] = this._createActionByOption(name);
        break;
      case 'onDirectoryCreating':
      case 'onDirectoryCreated':
      case 'onItemRenaming':
      case 'onItemRenamed':
      case 'onItemDeleting':
      case 'onItemDeleted':
      case 'onItemCopying':
      case 'onItemCopied':
      case 'onItemMoving':
      case 'onItemMoved':
      case 'onFileUploading':
      case 'onFileUploaded':
      case 'onItemDownloading':
        this._actions.editing[name] = this._createActionByOption(name);
        break;
      case 'rtlEnabled':
        this._editing.updateDialogRtl(args.value);
        _Widget.prototype._optionChanged.call(this, args);
        break;
      default:
        _Widget.prototype._optionChanged.call(this, args);
    }
  };
  _proto._initActions = function _initActions() {
    this._actions = {
      onContextMenuItemClick: this._createActionByOption('onContextMenuItemClick'),
      onContextMenuShowing: this._createActionByOption('onContextMenuShowing'),
      onCurrentDirectoryChanged: this._createActionByOption('onCurrentDirectoryChanged'),
      onSelectedFileOpened: this._createActionByOption('onSelectedFileOpened'),
      onSelectionChanged: this._createActionByOption('onSelectionChanged'),
      onFocusedItemChanged: this._createActionByOption('onFocusedItemChanged'),
      onToolbarItemClick: this._createActionByOption('onToolbarItemClick'),
      onErrorOccurred: this._createActionByOption('onErrorOccurred'),
      editing: {
        onDirectoryCreating: this._createActionByOption('onDirectoryCreating'),
        onDirectoryCreated: this._createActionByOption('onDirectoryCreated'),
        onItemRenaming: this._createActionByOption('onItemRenaming'),
        onItemRenamed: this._createActionByOption('onItemRenamed'),
        onItemDeleting: this._createActionByOption('onItemDeleting'),
        onItemDeleted: this._createActionByOption('onItemDeleted'),
        onItemCopying: this._createActionByOption('onItemCopying'),
        onItemCopied: this._createActionByOption('onItemCopied'),
        onItemMoving: this._createActionByOption('onItemMoving'),
        onItemMoved: this._createActionByOption('onItemMoved'),
        onFileUploading: this._createActionByOption('onFileUploading'),
        onFileUploaded: this._createActionByOption('onFileUploaded'),
        onItemDownloading: this._createActionByOption('onItemDownloading')
      }
    };
  };
  _proto.executeCommand = function executeCommand(commandName) {
    return this._commandManager.executeCommand(commandName);
  };
  _proto._setCurrentDirectory = function _setCurrentDirectory(directoryInfo, checkActuality) {
    this._controller.setCurrentDirectory(directoryInfo, checkActuality);
  };
  _proto._getCurrentDirectory = function _getCurrentDirectory() {
    return this._controller.getCurrentDirectory();
  };
  _proto._onControllerInitialized = function _onControllerInitialized(_ref8) {
    var controller = _ref8.controller;
    this._controller = this._controller || controller;
    this._syncToCurrentDirectory();
  };
  _proto._onDataLoading = function _onDataLoading(_ref9) {
    var operation = _ref9.operation;
    var options = null;
    if (operation === _file_items_controller.OPERATIONS.NAVIGATION) {
      options = {
        focusedItemKey: this._itemKeyToFocus,
        selectedItemKeys: this.option('selectedItemKeys')
      };
      this._itemKeyToFocus = undefined;
    }
    this._itemView.refresh(options, operation);
  };
  _proto._onSelectedDirectoryChanged = function _onSelectedDirectoryChanged() {
    var currentDirectory = this._getCurrentDirectory();
    this._syncToCurrentDirectory();
    this._actions.onCurrentDirectoryChanged({
      directory: currentDirectory.fileItem
    });
  };
  _proto._syncToCurrentDirectory = function _syncToCurrentDirectory() {
    var currentDirectory = this._getCurrentDirectory();
    if (this._filesTreeView) {
      this._filesTreeView.updateCurrentDirectory();
    }
    if (this._breadcrumbs) {
      this._breadcrumbs.setCurrentDirectory(currentDirectory);
    }
    this._checkPathActuality();
  };
  _proto._checkPathActuality = function _checkPathActuality() {
    if (this._lockCurrentPathProcessing) {
      return;
    }
    var currentPath = this._controller.getCurrentPath();
    var currentPathKeys = this._controller.getCurrentPathKeys();
    var options = {};
    if (this.option('currentPath') !== currentPath) {
      options.currentPath = currentPath;
    }
    if (!(0, _common.equalByValue)(this.option('currentPathKeys'), currentPathKeys)) {
      options.currentPathKeys = currentPathKeys;
    }
    if (!(0, _type.isEmptyObject)(options)) {
      this.option(options);
    }
  };
  _proto.getDirectories = function getDirectories(parentDirectoryInfo, skipNavigationOnError) {
    return this._controller.getDirectories(parentDirectoryInfo, skipNavigationOnError);
  };
  _proto._getSelectedItemInfos = function _getSelectedItemInfos() {
    return this._itemView ? this._itemView.getSelectedItems() : [];
  };
  _proto.refresh = function refresh() {
    return this.executeCommand('refresh');
  };
  _proto.getCurrentDirectory = function getCurrentDirectory() {
    var directoryInfo = this._getCurrentDirectory();
    return directoryInfo && directoryInfo.fileItem || null;
  };
  _proto.getSelectedItems = function getSelectedItems() {
    return this._getSelectedItemInfos().map(function (itemInfo) {
      return itemInfo.fileItem;
    });
  };
  _proto._onSelectedItemOpened = function _onSelectedItemOpened(_ref10) {
    var fileItemInfo = _ref10.fileItemInfo;
    var fileItem = fileItemInfo.fileItem;
    if (!fileItem.isDirectory) {
      this._actions.onSelectedFileOpened({
        file: fileItem
      });
      return;
    }
    if (fileItem.isParentFolder) {
      this._itemKeyToFocus = this._getCurrentDirectory().fileItem.key;
    }
    var newCurrentDirectory = fileItem.isParentFolder ? this._getCurrentDirectory().parentDirectory : fileItemInfo;
    this._setCurrentDirectory(newCurrentDirectory);
    if (newCurrentDirectory) {
      this._filesTreeView.toggleDirectoryExpandedState(newCurrentDirectory.parentDirectory, true);
    }
  };
  return FileManager;
}(_ui.default);
(0, _component_registrator.default)('dxFileManager', FileManager);
var _default = FileManager;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
