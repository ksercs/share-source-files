!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/file_manager/ui.file_manager.item_list.js"], ["../../core/utils/extend","../../core/utils/deferred","../../events/double_click","../../events/utils/index","../../events/core/events_engine","../../core/utils/icon","../../core/devices","../../data/custom_store","../widget/ui.widget"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/file_manager/ui.file_manager.item_list.js", ["../../core/utils/extend", "../../core/utils/deferred", "../../events/double_click", "../../events/utils/index", "../../events/core/events_engine", "../../core/utils/icon", "../../core/devices", "../../data/custom_store", "../widget/ui.widget"], true, function ($__require, exports, module) {
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
  var _extend = $__require("../../core/utils/extend");
  var _deferred = $__require("../../core/utils/deferred");
  var _double_click = $__require("../../events/double_click");
  var _index = $__require("../../events/utils/index");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _icon = $__require("../../core/utils/icon");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _custom_store = _interopRequireDefault($__require("../../data/custom_store"));
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
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
  var FILE_MANAGER_FILES_VIEW_CLASS = 'dx-filemanager-files-view';
  var FILE_MANAGER_ITEM_LIST_ITEM_OPEN_EVENT_NAMESPACE = 'dxFileManager_open';
  var FileManagerItemListBase = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(FileManagerItemListBase, _Widget);
    function FileManagerItemListBase() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = FileManagerItemListBase.prototype;
    _proto._init = function _init() {
      this._initActions();
      this._lockFocusedItemProcessing = false;
      this._focusedItemKey = this.option('focusedItemKey');
      _Widget.prototype._init.call(this);
    };
    _proto._initMarkup = function _initMarkup() {
      this.$element().addClass(FILE_MANAGER_FILES_VIEW_CLASS);
      var dblClickEventName = (0, _index.addNamespace)(_double_click.name, FILE_MANAGER_ITEM_LIST_ITEM_OPEN_EVENT_NAMESPACE);
      _events_engine.default.on(this.$element(), dblClickEventName, this._getItemSelector(), this._onItemDblClick.bind(this));
      _Widget.prototype._initMarkup.call(this);
    };
    _proto._initActions = function _initActions() {
      this._actions = {
        onError: this._createActionByOption('onError'),
        onSelectionChanged: this._createActionByOption('onSelectionChanged'),
        onFocusedItemChanged: this._createActionByOption('onFocusedItemChanged'),
        onSelectedItemOpened: this._createActionByOption('onSelectedItemOpened'),
        onContextMenuShowing: this._createActionByOption('onContextMenuShowing'),
        onItemListDataLoaded: this._createActionByOption('onItemListDataLoaded')
      };
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        selectionMode: 'single',
        selectedItemKeys: [],
        focusedItemKey: undefined,
        contextMenu: null,
        getItems: null,
        getItemThumbnail: null,
        onError: null,
        onSelectionChanged: null,
        onFocusedItemChanged: null,
        onSelectedItemOpened: null,
        onContextMenuShowing: null
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name;
      switch (name) {
        case 'selectionMode':
        case 'contextMenu':
        case 'getItems':
        case 'getItemThumbnail':
          this.repaint();
          break;
        case 'selectedItemKeys':
          this._setSelectedItemKeys(args.value);
          break;
        case 'focusedItemKey':
          if (!this._lockFocusedItemProcessing) {
            this._setFocusedItemKey(args.value);
          }
          break;
        case 'onError':
        case 'onSelectedItemOpened':
        case 'onSelectionChanged':
        case 'onFocusedItemChanged':
        case 'onContextMenuShowing':
        case 'onItemListDataLoaded':
          this._actions[name] = this._createActionByOption(name);
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    _proto._getItems = function _getItems() {
      var _this = this;
      return this._getItemsInternal().done(function (itemInfos) {
        _this._itemCount = itemInfos.length;
        if (_this._itemCount === 0) {
          _this._resetFocus();
        }
        var parentDirectoryItem = _this._findParentDirectoryItem(itemInfos);
        _this._hasParentDirectoryItem = !!parentDirectoryItem;
        _this._parentDirectoryItemKey = parentDirectoryItem ? parentDirectoryItem.fileItem.key : null;
      }).always(function () {
        _this._onDataLoaded();
      });
    };
    _proto._getItemsInternal = function _getItemsInternal() {
      var itemsGetter = this.option('getItems');
      var itemsResult = itemsGetter ? itemsGetter() : [];
      return (0, _deferred.when)(itemsResult);
    };
    _proto._raiseOnError = function _raiseOnError(error) {
      this._actions.onError({
        error: error
      });
    };
    _proto._raiseSelectionChanged = function _raiseSelectionChanged(args) {
      this._actions.onSelectionChanged(args);
    };
    _proto._raiseFocusedItemChanged = function _raiseFocusedItemChanged(args) {
      this._actions.onFocusedItemChanged(args);
    };
    _proto._raiseSelectedItemOpened = function _raiseSelectedItemOpened(fileItemInfo) {
      this._actions.onSelectedItemOpened({
        fileItemInfo: fileItemInfo
      });
    };
    _proto._raiseContextMenuShowing = function _raiseContextMenuShowing(e) {
      this._actions.onContextMenuShowing(e);
    };
    _proto._raiseItemListDataLoaded = function _raiseItemListDataLoaded() {
      this._actions.onItemListDataLoaded();
    };
    _proto._onDataLoaded = function _onDataLoaded() {
      var _this$_refreshDeferre;
      this._raiseItemListDataLoaded();
      (_this$_refreshDeferre = this._refreshDeferred) === null || _this$_refreshDeferre === void 0 ? void 0 : _this$_refreshDeferre.resolve();
    };
    _proto._tryRaiseSelectionChanged = function _tryRaiseSelectionChanged(_ref) {
      var _this2 = this;
      var selectedItemInfos = _ref.selectedItemInfos,
          selectedItems = _ref.selectedItems,
          selectedItemKeys = _ref.selectedItemKeys,
          currentSelectedItemKeys = _ref.currentSelectedItemKeys,
          currentDeselectedItemKeys = _ref.currentDeselectedItemKeys;
      var parentDirectoryItem = this._findParentDirectoryItem(this.getSelectedItems());
      if (parentDirectoryItem) {
        this._deselectItem(parentDirectoryItem);
      }
      var raiseEvent = !this._hasParentDirectoryItem;
      raiseEvent = raiseEvent || this._hasValidKeys(currentSelectedItemKeys) || this._hasValidKeys(currentDeselectedItemKeys);
      if (raiseEvent) {
        selectedItemInfos = this._filterOutItemByPredicate(selectedItemInfos, function (item) {
          return item.fileItem.key === _this2._parentDirectoryItemKey;
        });
        selectedItems = this._filterOutParentDirectory(selectedItems);
        selectedItemKeys = this._filterOutParentDirectoryKey(selectedItemKeys, true);
        currentSelectedItemKeys = this._filterOutParentDirectoryKey(currentSelectedItemKeys, true);
        currentDeselectedItemKeys = this._filterOutParentDirectoryKey(currentDeselectedItemKeys, true);
        this._raiseSelectionChanged({
          selectedItemInfos: selectedItemInfos,
          selectedItems: selectedItems,
          selectedItemKeys: selectedItemKeys,
          currentSelectedItemKeys: currentSelectedItemKeys,
          currentDeselectedItemKeys: currentDeselectedItemKeys
        });
      }
    };
    _proto._onFocusedItemChanged = function _onFocusedItemChanged(args) {
      if (this._focusedItemKey === args.itemKey) {
        return;
      }
      this._focusedItemKey = args.itemKey;
      this._lockFocusedItemProcessing = true;
      this.option('focusedItemKey', args.itemKey);
      this._lockFocusedItemProcessing = false;
      this._raiseFocusedItemChanged(args);
    };
    _proto._resetFocus = function _resetFocus() {};
    _proto._getItemThumbnail = function _getItemThumbnail(fileInfo) {
      var itemThumbnailGetter = this.option('getItemThumbnail');
      return itemThumbnailGetter ? itemThumbnailGetter(fileInfo) : {
        thumbnail: ''
      };
    };
    _proto._getItemThumbnailContainer = function _getItemThumbnailContainer(fileInfo) {
      var _this$_getItemThumbna = this._getItemThumbnail(fileInfo),
          thumbnail = _this$_getItemThumbna.thumbnail,
          cssClass = _this$_getItemThumbna.cssClass;
      var $itemThumbnail = (0, _icon.getImageContainer)(thumbnail).addClass(this._getItemThumbnailCssClass());
      if (cssClass) {
        $itemThumbnail.addClass(cssClass);
      }
      return $itemThumbnail;
    };
    _proto._getItemThumbnailCssClass = function _getItemThumbnailCssClass() {
      return '';
    };
    _proto._getItemSelector = function _getItemSelector() {};
    _proto._onItemDblClick = function _onItemDblClick(e) {};
    _proto._isDesktop = function _isDesktop() {
      return _devices.default.real().deviceType === 'desktop';
    };
    _proto._showContextMenu = function _showContextMenu(items, element, event, target) {
      this._contextMenu.showAt(items, element, event, target);
    };
    _proto._findParentDirectoryItem = function _findParentDirectoryItem(itemInfos) {
      for (var i = 0; i < itemInfos.length; i++) {
        var itemInfo = itemInfos[i];
        if (this._isParentDirectoryItem(itemInfo)) {
          return itemInfo;
        }
      }
      return null;
    };
    _proto._getFileItemsForContextMenu = function _getFileItemsForContextMenu(fileItem) {
      var result = this.getSelectedItems();
      if (this._isParentDirectoryItem(fileItem)) {
        result.push(fileItem);
      }
      return result;
    };
    _proto._isParentDirectoryItem = function _isParentDirectoryItem(itemInfo) {
      return itemInfo.fileItem.isParentFolder;
    };
    _proto._hasValidKeys = function _hasValidKeys(keys) {
      return keys.length > 1 || keys.length === 1 && keys[0] !== this._parentDirectoryItemKey;
    };
    _proto._filterOutParentDirectory = function _filterOutParentDirectory(array, createNewArray) {
      var _this3 = this;
      return this._filterOutItemByPredicate(array, function (item) {
        return item.key === _this3._parentDirectoryItemKey;
      }, createNewArray);
    };
    _proto._filterOutParentDirectoryKey = function _filterOutParentDirectoryKey(array, createNewArray) {
      var _this4 = this;
      return this._filterOutItemByPredicate(array, function (key) {
        return key === _this4._parentDirectoryItemKey;
      }, createNewArray);
    };
    _proto._filterOutItemByPredicate = function _filterOutItemByPredicate(array, predicate, createNewArray) {
      var result = array;
      var index = -1;
      for (var i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        if (createNewArray) {
          result = _toConsumableArray(array);
        }
        result.splice(index, 1);
      }
      return result;
    };
    _proto._isMultipleSelectionMode = function _isMultipleSelectionMode() {
      return this.option('selectionMode') === 'multiple';
    };
    _proto._deselectItem = function _deselectItem(item) {};
    _proto._setSelectedItemKeys = function _setSelectedItemKeys(itemKeys) {};
    _proto._setFocusedItemKey = function _setFocusedItemKey(itemKey) {};
    _proto._createDataSource = function _createDataSource() {
      return {
        store: new _custom_store.default({
          key: 'fileItem.key',
          load: this._getItems.bind(this)
        })
      };
    };
    _proto.getSelectedItems = function getSelectedItems() {};
    _proto.clearSelection = function clearSelection() {};
    _proto.selectItem = function selectItem() {};
    _proto.refresh = function refresh(options, operation) {};
    _createClass(FileManagerItemListBase, [{
      key: "_contextMenu",
      get: function get() {
        return this.option('contextMenu');
      }
    }]);
    return FileManagerItemListBase;
  }(_ui.default);
  var _default = FileManagerItemListBase;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../../core/utils/deferred","../../events/double_click","../../events/utils/index","../../events/core/events_engine","../../core/utils/icon","../../core/devices","../../data/custom_store","../widget/ui.widget"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../../core/utils/deferred"), require("../../events/double_click"), require("../../events/utils/index"), require("../../events/core/events_engine"), require("../../core/utils/icon"), require("../../core/devices"), require("../../data/custom_store"), require("../widget/ui.widget"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.item_list.js.map