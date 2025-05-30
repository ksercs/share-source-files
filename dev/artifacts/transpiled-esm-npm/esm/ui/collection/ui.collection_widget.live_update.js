import $ from '../../core/renderer';
import CollectionWidget from './ui.collection_widget.edit';
import { extend } from '../../core/utils/extend';
import { each } from '../../core/utils/iterator';
import { update, insert, indexByKey } from '../../data/array_utils';
import { keysEqual } from '../../data/utils';
import { when } from '../../core/utils/deferred';
import { findChanges } from '../../core/utils/array_compare';
import domAdapter from '../../core/dom_adapter';
import { noop } from '../../core/utils/common';
var PRIVATE_KEY_FIELD = '__dx_key__';
export default CollectionWidget.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      repaintChangesOnly: false
    });
  },
  ctor: function ctor() {
    var _this$_dataController;
    this.callBase.apply(this, arguments);
    this._customizeStoreLoadOptions = e => {
      var dataController = this._dataController;
      if (dataController.getDataSource() && !this._dataController.isLoaded()) {
        this._correctionIndex = 0;
      }
      if (this._correctionIndex && e.storeLoadOptions) {
        e.storeLoadOptions.skip += this._correctionIndex;
      }
    }, (_this$_dataController = this._dataController) === null || _this$_dataController === void 0 ? void 0 : _this$_dataController.on('customizeStoreLoadOptions', this._customizeStoreLoadOptions);
  },
  reload: function reload() {
    this._correctionIndex = 0;
  },
  _init: function _init() {
    this.callBase();
    this._refreshItemsCache();
    this._correctionIndex = 0;
  },
  _findItemElementByKey: function _findItemElementByKey(key) {
    var result = $();
    var keyExpr = this.key();
    this.itemElements().each((_, item) => {
      var $item = $(item);
      var itemData = this._getItemData($item);
      if (keyExpr ? keysEqual(keyExpr, this.keyOf(itemData), key) : this._isItemEquals(itemData, key)) {
        result = $item;
        return false;
      }
    });
    return result;
  },
  _dataSourceChangedHandler: function _dataSourceChangedHandler(newItems, e) {
    if (e !== null && e !== void 0 && e.changes) {
      this._modifyByChanges(e.changes);
    } else {
      this.callBase(newItems, e);
      this._refreshItemsCache();
    }
  },
  _isItemEquals: function _isItemEquals(item1, item2) {
    if (item1 && item1[PRIVATE_KEY_FIELD]) {
      item1 = item1.data;
    }
    try {
      return JSON.stringify(item1) === JSON.stringify(item2);
    } catch (e) {
      return item1 === item2;
    }
  },
  _isItemStrictEquals: function _isItemStrictEquals(item1, item2) {
    return this._isItemEquals(item1, item2);
  },
  _shouldAddNewGroup: function _shouldAddNewGroup(changes, items) {
    var result = false;
    if (this.option('grouped')) {
      if (!changes.length) {
        result = true;
      }
      each(changes, (i, change) => {
        if (change.type === 'insert') {
          result = true;
          each(items, (_, item) => {
            if (change.data.key !== undefined && change.data.key === item.key) {
              result = false;
              return false;
            }
          });
        }
      });
    }
    return result;
  },
  _partialRefresh: function _partialRefresh() {
    if (this.option('repaintChangesOnly')) {
      var keyOf = data => {
        if (data && data[PRIVATE_KEY_FIELD] !== undefined) {
          return data[PRIVATE_KEY_FIELD];
        }
        return this.keyOf(data);
      };
      var result = findChanges(this._itemsCache, this._editStrategy.itemsGetter(), keyOf, this._isItemStrictEquals.bind(this));
      if (result && this._itemsCache.length && !this._shouldAddNewGroup(result, this._itemsCache)) {
        this._modifyByChanges(result, true);
        this._renderEmptyMessage();
        return true;
      } else {
        this._refreshItemsCache();
      }
    }
    return false;
  },
  _refreshItemsCache: function _refreshItemsCache() {
    if (this.option('repaintChangesOnly')) {
      var items = this._editStrategy.itemsGetter();
      try {
        this._itemsCache = extend(true, [], items);
        if (!this.key()) {
          this._itemsCache = this._itemsCache.map((itemCache, index) => {
            return {
              [PRIVATE_KEY_FIELD]: items[index],
              data: itemCache
            };
          });
        }
      } catch (e) {
        this._itemsCache = extend([], items);
      }
    }
  },
  _dispose: function _dispose() {
    this._dataController.off('customizeStoreLoadOptions', this._customizeStoreLoadOptions);
    this.callBase();
  },
  _updateByChange: function _updateByChange(keyInfo, items, change, isPartialRefresh) {
    if (isPartialRefresh) {
      this._renderItem(change.index, change.data, null, this._findItemElementByKey(change.key));
    } else {
      var changedItem = items[indexByKey(keyInfo, items, change.key)];
      if (changedItem) {
        update(keyInfo, items, change.key, change.data).done(() => {
          this._renderItem(items.indexOf(changedItem), changedItem, null, this._findItemElementByKey(change.key));
        });
      }
    }
  },
  _insertByChange: function _insertByChange(keyInfo, items, change, isPartialRefresh) {
    when(isPartialRefresh || insert(keyInfo, items, change.data, change.index)).done(() => {
      var _change$index;
      this._beforeItemElementInserted(change);
      this._renderItem((_change$index = change.index) !== null && _change$index !== void 0 ? _change$index : items.length, change.data);
      this._afterItemElementInserted();
      this._correctionIndex++;
    });
  },
  _updateSelectionAfterRemoveByChange: function _updateSelectionAfterRemoveByChange(removeIndex) {
    var selectedIndex = this.option('selectedIndex');
    if (selectedIndex > removeIndex) {
      this.option('selectedIndex', selectedIndex - 1);
    } else if (selectedIndex === removeIndex && this.option('selectedItems').length === 1) {
      this.option('selectedItems', []);
    } else {
      this._normalizeSelectedItems();
    }
  },
  _beforeItemElementInserted: function _beforeItemElementInserted(change) {
    var selectedIndex = this.option('selectedIndex');
    if (change.index <= selectedIndex) {
      this.option('selectedIndex', selectedIndex + 1);
    }
  },
  _afterItemElementInserted: noop,
  _removeByChange: function _removeByChange(keyInfo, items, change, isPartialRefresh) {
    var index = isPartialRefresh ? change.index : indexByKey(keyInfo, items, change.key);
    var removedItem = isPartialRefresh ? change.oldItem : items[index];
    if (removedItem) {
      var $removedItemElement = this._findItemElementByKey(change.key);
      var deletedActionArgs = this._extendActionArgs($removedItemElement);
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
  },
  _modifyByChanges: function _modifyByChanges(changes, isPartialRefresh) {
    var items = this._editStrategy.itemsGetter();
    var keyInfo = {
      key: this.key.bind(this),
      keyOf: this.keyOf.bind(this)
    };
    var dataController = this._dataController;
    var paginate = dataController.paginate();
    var group = dataController.group();
    if (paginate || group) {
      changes = changes.filter(item => item.type !== 'insert' || item.index !== undefined);
    }
    changes.forEach(change => this["_".concat(change.type, "ByChange")](keyInfo, items, change, isPartialRefresh));
    this._renderedItemsCount = items.length;
    this._refreshItemsCache();
    this._fireContentReadyAction();
  },
  _appendItemToContainer: function _appendItemToContainer($container, $itemFrame, index) {
    var nextSiblingElement = $container.children(this._itemSelector()).get(index);
    domAdapter.insertElement($container.get(0), $itemFrame.get(0), nextSiblingElement);
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'items':
        {
          var isItemsUpdated = this._partialRefresh(args.value);
          if (!isItemsUpdated) {
            this.callBase(args);
          }
          break;
        }
      case 'dataSource':
        if (!this.option('repaintChangesOnly') || !args.value) {
          this.option('items', []);
        }
        this.callBase(args);
        break;
      case 'repaintChangesOnly':
        break;
      default:
        this.callBase(args);
    }
  }
});