!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/list/ui.list.edit.js"], ["../../core/renderer","../../events/utils/index","../../core/utils/extend","./ui.list.edit.strategy.grouped","../../localization/message","./ui.list.edit.provider","./ui.list.base"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/list/ui.list.edit.js", ["../../core/renderer", "../../events/utils/index", "../../core/utils/extend", "./ui.list.edit.strategy.grouped", "../../localization/message", "./ui.list.edit.provider", "./ui.list.base"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _index = $__require("../../events/utils/index");
  var _extend = $__require("../../core/utils/extend");
  var _uiListEditStrategy = _interopRequireDefault($__require("./ui.list.edit.strategy.grouped"));
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _uiListEdit = _interopRequireDefault($__require("./ui.list.edit.provider"));
  var _uiList = $__require("./ui.list.base");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var LIST_ITEM_SELECTED_CLASS = 'dx-list-item-selected';
  var LIST_ITEM_RESPONSE_WAIT_CLASS = 'dx-list-item-response-wait';
  var ListEdit = _uiList.ListBase.inherit({
    _supportedKeys: function _supportedKeys() {
      var _this = this;
      var that = this;
      var parent = this.callBase();
      var deleteFocusedItem = function deleteFocusedItem(e) {
        if (that.option('allowItemDeleting')) {
          e.preventDefault();
          that.deleteItem(that.option('focusedElement'));
        }
      };
      var moveFocusedItem = function moveFocusedItem(e, moveUp) {
        var editStrategy = _this._editStrategy;
        var focusedElement = _this.option('focusedElement');
        var focusedItemIndex = editStrategy.getNormalizedIndex(focusedElement);
        var isLastIndexFocused = focusedItemIndex === _this._getLastItemIndex();
        if (isLastIndexFocused && _this._dataController.isLoading()) {
          return;
        }
        if (e.shiftKey && that.option('itemDragging.allowReordering')) {
          var nextItemIndex = focusedItemIndex + (moveUp ? -1 : 1);
          var $nextItem = editStrategy.getItemElement(nextItemIndex);
          _this.reorderItem(focusedElement, $nextItem);
          _this.scrollToItem(focusedElement);
          e.preventDefault();
        } else {
          var editProvider = _this._editProvider;
          var isInternalMoving = editProvider.handleKeyboardEvents(focusedItemIndex, moveUp);
          if (!isInternalMoving) {
            moveUp ? parent.upArrow(e) : parent.downArrow(e);
          }
        }
      };
      var enter = function enter(e) {
        if (!this._editProvider.handleEnterPressing(e)) {
          parent.enter.apply(this, arguments);
        }
      };
      var space = function space(e) {
        if (!this._editProvider.handleEnterPressing(e)) {
          parent.space.apply(this, arguments);
        }
      };
      return (0, _extend.extend)({}, parent, {
        del: deleteFocusedItem,
        upArrow: function upArrow(e) {
          return moveFocusedItem(e, true);
        },
        downArrow: function downArrow(e) {
          return moveFocusedItem(e);
        },
        enter: enter,
        space: space
      });
    },
    _updateSelection: function _updateSelection() {
      this._editProvider.afterItemsRendered();
      this.callBase();
    },
    _getLastItemIndex: function _getLastItemIndex() {
      return this._itemElements().length - 1;
    },
    _refreshItemElements: function _refreshItemElements() {
      this.callBase();
      var excludedSelectors = this._editProvider.getExcludedItemSelectors();
      if (excludedSelectors.length) {
        this._itemElementsCache = this._itemElementsCache.not(excludedSelectors);
      }
    },
    _isItemStrictEquals: function _isItemStrictEquals(item1, item2) {
      var privateKey = item1 && item1.__dx_key__;
      if (privateKey && !this.key() && this._selection.isItemSelected(privateKey)) {
        return false;
      }
      return this.callBase(item1, item2);
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        showSelectionControls: false,
        selectionMode: 'none',
        selectAllMode: 'page',
        onSelectAllValueChanged: null,
        selectAllText: _message.default.format('dxList-selectAll'),
        menuItems: [],
        menuMode: 'context',
        allowItemDeleting: false,
        itemDeleteMode: 'static',
        itemDragging: {}
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device(_device) {
          return _device.platform === 'ios';
        },
        options: {
          menuMode: 'slide',
          itemDeleteMode: 'slideItem'
        }
      }, {
        device: {
          platform: 'android'
        },
        options: {
          itemDeleteMode: 'swipe'
        }
      }]);
    },
    _init: function _init() {
      this.callBase();
      this._initEditProvider();
    },
    _initDataSource: function _initDataSource() {
      this.callBase();
      if (!this._isPageSelectAll()) {
        this._dataSource && this._dataSource.requireTotalCount(true);
      }
    },
    _isPageSelectAll: function _isPageSelectAll() {
      return this.option('selectAllMode') === 'page';
    },
    _initEditProvider: function _initEditProvider() {
      this._editProvider = new _uiListEdit.default(this);
    },
    _disposeEditProvider: function _disposeEditProvider() {
      if (this._editProvider) {
        this._editProvider.dispose();
      }
    },
    _refreshEditProvider: function _refreshEditProvider() {
      this._disposeEditProvider();
      this._initEditProvider();
    },
    _initEditStrategy: function _initEditStrategy() {
      if (this.option('grouped')) {
        this._editStrategy = new _uiListEditStrategy.default(this);
      } else {
        this.callBase();
      }
    },
    _initMarkup: function _initMarkup() {
      this._refreshEditProvider();
      this.callBase();
    },
    _renderItems: function _renderItems() {
      this.callBase.apply(this, arguments);
      this._editProvider.afterItemsRendered();
    },
    _selectedItemClass: function _selectedItemClass() {
      return LIST_ITEM_SELECTED_CLASS;
    },
    _itemResponseWaitClass: function _itemResponseWaitClass() {
      return LIST_ITEM_RESPONSE_WAIT_CLASS;
    },
    _itemClickHandler: function _itemClickHandler(e) {
      var $itemElement = (0, _renderer.default)(e.currentTarget);
      if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
        return;
      }
      var handledByEditProvider = this._editProvider.handleClick($itemElement, e);
      if (handledByEditProvider) {
        return;
      }
      this._saveSelectionChangeEvent(e);
      this.callBase.apply(this, arguments);
    },
    _shouldFireContextMenuEvent: function _shouldFireContextMenuEvent() {
      return this.callBase.apply(this, arguments) || this._editProvider.contextMenuHandlerExists();
    },
    _itemHoldHandler: function _itemHoldHandler(e) {
      var $itemElement = (0, _renderer.default)(e.currentTarget);
      if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
        return;
      }
      var handledByEditProvider = (0, _index.isTouchEvent)(e) && this._editProvider.handleContextMenu($itemElement, e);
      if (handledByEditProvider) {
        e.handledByEditProvider = true;
        return;
      }
      this.callBase.apply(this, arguments);
    },
    _getItemContainer: function _getItemContainer(changeData) {
      if (this.option('grouped')) {
        var _this$_editStrategy$g;
        var groupIndex = (_this$_editStrategy$g = this._editStrategy.getIndexByItemData(changeData)) === null || _this$_editStrategy$g === void 0 ? void 0 : _this$_editStrategy$g.group;
        return this._getGroupContainerByIndex(groupIndex);
      } else {
        return this.callBase(changeData);
      }
    },
    _itemContextMenuHandler: function _itemContextMenuHandler(e) {
      var $itemElement = (0, _renderer.default)(e.currentTarget);
      if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
        return;
      }
      var handledByEditProvider = !e.handledByEditProvider && this._editProvider.handleContextMenu($itemElement, e);
      if (handledByEditProvider) {
        e.preventDefault();
        return;
      }
      this.callBase.apply(this, arguments);
    },
    _postprocessRenderItem: function _postprocessRenderItem(args) {
      this.callBase.apply(this, arguments);
      this._editProvider.modifyItemElement(args);
    },
    _clean: function _clean() {
      this._disposeEditProvider();
      this.callBase();
    },
    focusListItem: function focusListItem(index) {
      var $item = this._editStrategy.getItemElement(index);
      this.option('focusedElement', $item);
      this.focus();
      this.scrollToItem(this.option('focusedElement'));
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'selectAllMode':
          this._initDataSource();
          this._dataController.pageIndex(0);
          this._dataController.load();
          break;
        case 'grouped':
          this._clearSelectedItems();
          delete this._renderingGroupIndex;
          this._initEditStrategy();
          this.callBase(args);
          break;
        case 'showSelectionControls':
        case 'menuItems':
        case 'menuMode':
        case 'allowItemDeleting':
        case 'itemDeleteMode':
        case 'itemDragging':
        case 'selectAllText':
          this._invalidate();
          break;
        case 'onSelectAllValueChanged':
          break;
        default:
          this.callBase(args);
      }
    },
    selectAll: function selectAll() {
      return this._selection.selectAll(this._isPageSelectAll());
    },
    unselectAll: function unselectAll() {
      return this._selection.deselectAll(this._isPageSelectAll());
    },
    isSelectAll: function isSelectAll() {
      return this._selection.getSelectAllState(this._isPageSelectAll());
    },
    /**
    * @name dxList.getFlatIndexByItemElement
    * @publicName getFlatIndexByItemElement(itemElement)
    * @param1 itemElement:Element
    * @return object
    * @hidden
    */
    getFlatIndexByItemElement: function getFlatIndexByItemElement(itemElement) {
      return this._itemElements().index(itemElement);
    },
    /**
    * @name dxList.getItemElementByFlatIndex
    * @publicName getItemElementByFlatIndex(flatIndex)
    * @param1 flatIndex:Number
    * @return Element
    * @hidden
    */
    getItemElementByFlatIndex: function getItemElementByFlatIndex(flatIndex) {
      var $itemElements = this._itemElements();
      if (flatIndex < 0 || flatIndex >= $itemElements.length) {
        return (0, _renderer.default)();
      }
      return $itemElements.eq(flatIndex);
    },
    /**
    * @name dxList.getItemByIndex
    * @publicName getItemByIndex(index)
    * @param1 index:Number
    * @return object
    * @hidden
    */
    getItemByIndex: function getItemByIndex(index) {
      return this._editStrategy.getItemDataByIndex(index);
    }
  });
  var _default = ListEdit;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../events/utils/index","../../core/utils/extend","./ui.list.edit.strategy.grouped","../../localization/message","./ui.list.edit.provider","./ui.list.base"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../events/utils/index"), require("../../core/utils/extend"), require("./ui.list.edit.strategy.grouped"), require("../../localization/message"), require("./ui.list.edit.provider"), require("./ui.list.base"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.list.edit.js.map