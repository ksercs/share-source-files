"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _array_utils = require("../../../common/data/array_utils");
var _utils = require("../../../common/data/utils");
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _array_compare = require("../../../core/utils/array_compare");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _m_collection_widget = _interopRequireDefault(require("../../ui/collection/m_collection_widget.async"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PRIVATE_KEY_FIELD = '__dx_key__';
class CollectionWidgetLiveUpdate extends _m_collection_widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      repaintChangesOnly: false
    });
  }
  _customizeStoreLoadOptions(e) {
    // @ts-expect-error ts-error
    const dataController = this._dataController;
    // @ts-expect-error ts-error
    if (dataController.getDataSource() && !this._dataController.isLoaded()) {
      this._correctionIndex = 0;
    }
    if (this._correctionIndex && e.storeLoadOptions) {
      e.storeLoadOptions.skip += this._correctionIndex;
    }
  }
  reload() {
    this._correctionIndex = 0;
  }
  _init() {
    super._init();
    this._refreshItemsCache();
    this._correctionIndex = 0;
    this._subscribeLoadOptionsCustomization(true);
  }
  _findItemElementByKey(key) {
    let result = (0, _renderer.default)();
    const keyExpr = this.key();
    // @ts-expect-error
    this.itemElements().each((_, item) => {
      const $item = (0, _renderer.default)(item);
      const itemData = this._getItemData($item);
      if (keyExpr ? (0, _utils.keysEqual)(keyExpr, this.keyOf(itemData), key) : this._isItemEquals(itemData, key)) {
        result = $item;
        return false;
      }
    });
    return result;
  }
  _dataSourceChangedHandler(newItems, e) {
    if (e !== null && e !== void 0 && e.changes) {
      this._modifyByChanges(e.changes);
    } else {
      super._dataSourceChangedHandler(newItems, e);
      this._refreshItemsCache();
    }
  }
  _isItemEquals(item1, item2) {
    if (item1 && item1[PRIVATE_KEY_FIELD]) {
      item1 = item1.data;
    }
    try {
      return JSON.stringify(item1) === JSON.stringify(item2);
    } catch (e) {
      return item1 === item2;
    }
  }
  _isItemStrictEquals(item1, item2) {
    return this._isItemEquals(item1, item2);
  }
  _shouldAddNewGroup(changes, items) {
    let result = false;
    if (this.option('grouped')) {
      if (!changes.length) {
        result = true;
      }
      (0, _iterator.each)(changes, (i, change) => {
        if (change.type === 'insert') {
          result = true;
          // @ts-expect-error
          (0, _iterator.each)(items, (_, item) => {
            if (change.data.key !== undefined && change.data.key === item.key) {
              result = false;
              return false;
            }
          });
        }
      });
    }
    return result;
  }
  _partialRefresh() {
    if (this.option('repaintChangesOnly')) {
      const keyOf = data => {
        if (data && data[PRIVATE_KEY_FIELD] !== undefined) {
          return data[PRIVATE_KEY_FIELD];
        }
        return this.keyOf(data);
      };
      const result = (0, _array_compare.findChanges)(this._itemsCache, this._editStrategy.itemsGetter(), keyOf, this._isItemStrictEquals.bind(this));
      if (result && this._itemsCache.length && !this._shouldAddNewGroup(result, this._itemsCache)) {
        this._modifyByChanges(result, true);
        this._renderEmptyMessage();
        return true;
      }
      this._refreshItemsCache();
    }
    return false;
  }
  _refreshItemsCache() {
    if (this.option('repaintChangesOnly')) {
      const items = this._editStrategy.itemsGetter();
      try {
        this._itemsCache = (0, _extend.extend)(true, [], items);
        if (!this.key()) {
          // @ts-expect-error
          this._itemsCache = this._itemsCache.map((itemCache, index) => ({
            [PRIVATE_KEY_FIELD]: items[index],
            data: itemCache
          }));
        }
      } catch (e) {
        this._itemsCache = (0, _extend.extend)([], items);
      }
    }
  }
  _dispose() {
    this._subscribeLoadOptionsCustomization(false);
    super._dispose();
  }
  _updateByChange(keyInfo, items, change, isPartialRefresh) {
    if (isPartialRefresh) {
      this._renderItem(change.index, change.data, null, this._findItemElementByKey(change.key));
    } else {
      const changedItem = items[(0, _array_utils.indexByKey)(keyInfo, items, change.key)];
      if (changedItem) {
        // @ts-expect-error
        (0, _array_utils.update)(keyInfo, items, change.key, change.data).done(() => {
          this._renderItem(items.indexOf(changedItem), changedItem, null, this._findItemElementByKey(change.key));
        });
      }
    }
  }
  _insertByChange(keyInfo, items, change, isPartialRefresh) {
    // @ts-expect-error
    (0, _deferred.when)(isPartialRefresh || (0, _array_utils.insert)(keyInfo, items, change.data, change.index)).done(() => {
      this._beforeItemElementInserted(change);
      this._renderItem(change.index ?? items.length, change.data);
      this._afterItemElementInserted();
      this._correctionIndex++;
    });
  }
  _updateSelectionAfterRemoveByChange(removeIndex) {
    const {
      selectedIndex,
      selectedItems
    } = this.option();
    // @ts-expect-error
    if (selectedIndex > removeIndex) {
      // @ts-expect-error
      this.option('selectedIndex', selectedIndex - 1);
      // @ts-expect-error
    } else if (selectedIndex === removeIndex && selectedItems.length === 1) {
      this.option('selectedItems', []);
    } else {
      this._normalizeSelectedItems();
    }
  }
  _beforeItemElementInserted(change) {
    const {
      selectedIndex
    } = this.option();
    // @ts-expect-error
    if (change.index <= selectedIndex) {
      // @ts-expect-error
      this.option('selectedIndex', selectedIndex + 1);
    }
  }
  _afterItemElementInserted() {
    this._renderEmptyMessage();
  }
  _removeByChange(keyInfo, items, change, isPartialRefresh) {
    const index = isPartialRefresh ? change.index : (0, _array_utils.indexByKey)(keyInfo, items, change.key);
    const removedItem = isPartialRefresh ? change.oldItem : items[index];
    if (removedItem) {
      const $removedItemElement = this._findItemElementByKey(change.key);
      const deletedActionArgs = this._extendActionArgs($removedItemElement);
      // @ts-expect-error
      this._waitDeletingPrepare($removedItemElement).done(() => {
        if (isPartialRefresh) {
          this._updateIndicesAfterIndex(index - 1);
          this._afterItemElementDeleted($removedItemElement, deletedActionArgs);
          this._updateSelectionAfterRemoveByChange(index);
        } else {
          this._deleteItemElementByIndex(index);
          this._afterItemElementDeleted($removedItemElement, deletedActionArgs);
        }
      });
      this._correctionIndex--;
    }
  }
  _modifyByChanges(changes, isPartialRefresh) {
    const items = this._editStrategy.itemsGetter();
    const keyInfo = {
      key: this.key.bind(this),
      keyOf: this.keyOf.bind(this)
    };
    // @ts-expect-error
    const dataController = this._dataController;
    const paginate = dataController.paginate();
    const group = dataController.group();
    if (paginate || group) {
      changes = changes.filter(item => item.type !== 'insert' || item.index !== undefined);
    }
    changes.forEach(change => this[`_${change.type}ByChange`](keyInfo, items, change, isPartialRefresh));
    this._renderedItemsCount = items.length;
    this._refreshItemsCache();
    this._fireContentReadyAction();
  }
  _appendItemToContainer($container, $itemFrame, index) {
    const nextSiblingElement = $container.children(this._itemSelector()).get(index);
    _dom_adapter.default.insertElement($container.get(0), $itemFrame.get(0), nextSiblingElement);
  }
  _subscribeLoadOptionsCustomization(enable) {
    // @ts-expect-error ts-error
    if (!this._dataController) {
      return;
    }
    if (enable) {
      this._correctionIndex = 0;
      // @ts-expect-error ts-error
      this._dataController.on('customizeStoreLoadOptions', this._customizeStoreLoadOptions.bind(this));
    } else {
      // @ts-expect-error ts-error
      this._dataController.off('customizeStoreLoadOptions', this._customizeStoreLoadOptions.bind(this));
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'items':
        {
          // @ts-expect-error excess argument
          const isItemsUpdated = this._partialRefresh(args.value);
          if (!isItemsUpdated) {
            super._optionChanged(args);
          }
          break;
        }
      case 'dataSource':
        if (!this.option('repaintChangesOnly') || !args.value) {
          this.option('items', []);
        }
        this._subscribeLoadOptionsCustomization(false);
        super._optionChanged(args);
        this._subscribeLoadOptionsCustomization(true);
        break;
      case 'repaintChangesOnly':
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = CollectionWidgetLiveUpdate;