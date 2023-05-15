!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/file_manager/ui.file_manager.item_list.thumbnails.js"], ["../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/utils/window","../../core/utils/deferred","../../events/core/events_engine","../../events/utils/index","../../events/contextmenu","./ui.file_manager.common","../../localization/message","./ui.file_manager.items_list.thumbnails.list_box","./ui.file_manager.item_list","./file_items_controller"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/file_manager/ui.file_manager.item_list.thumbnails.js", ["../../core/renderer", "../../core/utils/extend", "../../core/utils/type", "../../core/utils/window", "../../core/utils/deferred", "../../events/core/events_engine", "../../events/utils/index", "../../events/contextmenu", "./ui.file_manager.common", "../../localization/message", "./ui.file_manager.items_list.thumbnails.list_box", "./ui.file_manager.item_list", "./file_items_controller"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _window = $__require("../../core/utils/window");
  var _deferred = $__require("../../core/utils/deferred");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _index = $__require("../../events/utils/index");
  var _contextmenu = $__require("../../events/contextmenu");
  var _uiFile_manager = $__require("./ui.file_manager.common");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _uiFile_managerItems_listThumbnails = _interopRequireDefault($__require("./ui.file_manager.items_list.thumbnails.list_box"));
  var _uiFile_manager2 = _interopRequireDefault($__require("./ui.file_manager.item_list"));
  var _file_items_controller = $__require("./file_items_controller");
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
  var FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS = 'dx-filemanager-thumbnails';
  var FILE_MANAGER_THUMBNAILS_ITEM_CLASS = 'dx-filemanager-thumbnails-item';
  var FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS = 'dx-filemanager-thumbnails-item-thumbnail';
  var FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE = 'dxFileManager_thumbnails';
  var FileManagerThumbnailsItemList = /*#__PURE__*/function (_FileManagerItemListB) {
    _inheritsLoose(FileManagerThumbnailsItemList, _FileManagerItemListB);
    function FileManagerThumbnailsItemList() {
      return _FileManagerItemListB.apply(this, arguments) || this;
    }
    var _proto = FileManagerThumbnailsItemList.prototype;
    _proto._initMarkup = function _initMarkup() {
      _FileManagerItemListB.prototype._initMarkup.call(this);
      this._needResetScrollPosition = false;
      this.$element().addClass(FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS);
      var contextMenuEvent = (0, _index.addNamespace)(_contextmenu.name, FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE);
      _events_engine.default.on(this.$element(), contextMenuEvent, this._onContextMenu.bind(this));
      this._createItemList();
    };
    _proto._createItemList = function _createItemList() {
      var selectionMode = this._isMultipleSelectionMode() ? 'multiple' : 'single';
      var $itemListContainer = (0, _renderer.default)('<div>').appendTo(this.$element());
      this._itemList = this._createComponent($itemListContainer, _uiFile_managerItems_listThumbnails.default, {
        dataSource: this._createDataSource(),
        selectionMode: selectionMode,
        selectedItemKeys: this.option('selectedItemKeys'),
        focusedItemKey: this.option('focusedItemKey'),
        activeStateEnabled: true,
        hoverStateEnabled: true,
        loopItemFocus: false,
        focusStateEnabled: true,
        onItemEnterKeyPressed: this._tryOpen.bind(this),
        itemThumbnailTemplate: this._getItemThumbnailContainer.bind(this),
        getTooltipText: this._getTooltipText.bind(this),
        onSelectionChanged: this._onItemListSelectionChanged.bind(this),
        onFocusedItemChanged: this._onItemListFocusedItemChanged.bind(this),
        onContentReady: this._onItemListContentReady.bind(this)
      });
    };
    _proto._onContextMenu = function _onContextMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!this._isDesktop()) {
        return;
      }
      var items = null;
      var targetItemElement = (0, _renderer.default)(e.target).closest(this._getItemSelector());
      var targetItem = null;
      if (targetItemElement.length > 0) {
        targetItem = this._itemList.getItemByItemElement(targetItemElement);
        this._itemList.selectItem(targetItem);
        items = this._getFileItemsForContextMenu(targetItem);
      }
      var target = {
        itemData: targetItem,
        itemElement: targetItemElement.length ? targetItemElement : undefined
      };
      this._showContextMenu(items, e.target, e, target);
    };
    _proto._getItemThumbnailCssClass = function _getItemThumbnailCssClass() {
      return FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS;
    };
    _proto._getItemSelector = function _getItemSelector() {
      return ".".concat(FILE_MANAGER_THUMBNAILS_ITEM_CLASS);
    };
    _proto._getTooltipText = function _getTooltipText(fileItemInfo) {
      var item = fileItemInfo.fileItem;
      if (item.tooltipText) {
        return item.tooltipText;
      }
      var text = "".concat(item.name, "\r\n");
      if (!item.isDirectory) {
        text += "".concat(_message.default.format('dxFileManager-listThumbnailsTooltipTextSize'), ": ").concat((0, _uiFile_manager.getDisplayFileSize)(item.size), "\r\n");
      }
      text += "".concat(_message.default.format('dxFileManager-listThumbnailsTooltipTextDateModified'), ": ").concat(item.dateModified);
      return text;
    };
    _proto._onItemDblClick = function _onItemDblClick(e) {
      var $item = (0, _renderer.default)(e.currentTarget);
      var item = this._itemList.getItemByItemElement($item);
      this._tryOpen(item);
    };
    _proto._tryOpen = function _tryOpen(item) {
      if (item) {
        this._raiseSelectedItemOpened(item);
      }
    };
    _proto._getItemsInternal = function _getItemsInternal() {
      return _FileManagerItemListB.prototype._getItemsInternal.call(this).then(function (items) {
        var deferred = new _deferred.Deferred();
        setTimeout(function () {
          return deferred.resolve(items);
        });
        return deferred.promise();
      });
    };
    _proto._disableDragging = function _disableDragging() {
      return false;
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_FileManagerItemListB.prototype._getDefaultOptions.call(this), {
        focusStateEnabled: true
      });
    };
    _proto._onItemListSelectionChanged = function _onItemListSelectionChanged(_ref) {
      var addedItemKeys = _ref.addedItemKeys,
          removedItemKeys = _ref.removedItemKeys;
      var selectedItemInfos = this.getSelectedItems();
      var selectedItems = selectedItemInfos.map(function (itemInfo) {
        return itemInfo.fileItem;
      });
      var selectedItemKeys = selectedItems.map(function (item) {
        return item.key;
      });
      this._tryRaiseSelectionChanged({
        selectedItemInfos: selectedItemInfos,
        selectedItems: selectedItems,
        selectedItemKeys: selectedItemKeys,
        currentSelectedItemKeys: addedItemKeys,
        currentDeselectedItemKeys: removedItemKeys
      });
    };
    _proto._onItemListFocusedItemChanged = function _onItemListFocusedItemChanged(_ref2) {
      var item = _ref2.item,
          itemElement = _ref2.itemElement;
      if (!this._isMultipleSelectionMode()) {
        this._selectItemSingleSelection(item);
      }
      var fileSystemItem = (item === null || item === void 0 ? void 0 : item.fileItem) || null;
      this._onFocusedItemChanged({
        item: fileSystemItem,
        itemKey: fileSystemItem === null || fileSystemItem === void 0 ? void 0 : fileSystemItem.key,
        itemElement: itemElement || undefined
      });
    };
    _proto._onItemListContentReady = function _onItemListContentReady() {
      if (this._needResetScrollPosition) {
        this._resetScrollTopPosition();
        this._needResetScrollPosition = false;
      }
    };
    _proto._resetScrollTopPosition = function _resetScrollTopPosition() {
      var _this = this;
      if (!(0, _window.hasWindow)()) {
        return;
      }
      setTimeout(function () {
        var _this$_itemList$getSc;
        return (_this$_itemList$getSc = _this._itemList.getScrollable()) === null || _this$_itemList$getSc === void 0 ? void 0 : _this$_itemList$getSc.scrollTo(0);
      });
    };
    _proto._setSelectedItemKeys = function _setSelectedItemKeys(itemKeys) {
      this._itemList.option('selectedItemKeys', itemKeys);
    };
    _proto._setFocusedItemKey = function _setFocusedItemKey(itemKey) {
      this._itemList.option('focusedItemKey', itemKey);
    };
    _proto.refresh = function refresh(options, operation) {
      var actualOptions = {
        dataSource: this._createDataSource()
      };
      if (options && Object.prototype.hasOwnProperty.call(options, 'focusedItemKey')) {
        actualOptions.focusedItemKey = options.focusedItemKey;
      }
      if (options && Object.prototype.hasOwnProperty.call(options, 'selectedItemKeys')) {
        actualOptions.selectedItemKeys = options.selectedItemKeys;
      }
      if (!(0, _type.isDefined)(actualOptions.focusedItemKey) && operation === _file_items_controller.OPERATIONS.NAVIGATION) {
        this._needResetScrollPosition = true;
      }
      this._itemList.option(actualOptions);
      this._refreshDeferred = new _deferred.Deferred();
      return this._refreshDeferred.promise();
    };
    _proto._deselectItem = function _deselectItem(item) {
      var itemElement = this._itemList.getItemElementByItem(item);
      this._itemList.unselectItem(itemElement);
    };
    _proto._selectItemSingleSelection = function _selectItemSingleSelection(item) {
      if (item) {
        this._itemList.selectItem(item);
      } else {
        this._itemList.clearSelection();
      }
    };
    _proto.clearSelection = function clearSelection() {
      this._itemList.clearSelection();
    };
    _proto.getSelectedItems = function getSelectedItems() {
      return this._itemList.getSelectedItems();
    };
    return FileManagerThumbnailsItemList;
  }(_uiFile_manager2.default);
  var _default = FileManagerThumbnailsItemList;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/utils/window","../../core/utils/deferred","../../events/core/events_engine","../../events/utils/index","../../events/contextmenu","./ui.file_manager.common","../../localization/message","./ui.file_manager.items_list.thumbnails.list_box","./ui.file_manager.item_list","./file_items_controller"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/type"), require("../../core/utils/window"), require("../../core/utils/deferred"), require("../../events/core/events_engine"), require("../../events/utils/index"), require("../../events/contextmenu"), require("./ui.file_manager.common"), require("../../localization/message"), require("./ui.file_manager.items_list.thumbnails.list_box"), require("./ui.file_manager.item_list"), require("./file_items_controller"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.item_list.thumbnails.js.map