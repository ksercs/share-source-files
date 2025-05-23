/**
* DevExtreme (esm/ui/list/ui.list.edit.strategy.grouped.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { isNumeric } from '../../core/utils/type';
import { each } from '../../core/utils/iterator';
import storeHelper from '../../data/store_helper';
import query from '../../data/query';
import EditStrategy from '../collection/ui.collection_widget.edit.strategy.plain';
var LIST_ITEM_CLASS = 'dx-list-item';
var LIST_GROUP_CLASS = 'dx-list-group';
var SELECTION_SHIFT = 20;
var SELECTION_MASK = (1 << SELECTION_SHIFT) - 1;
var combineIndex = function combineIndex(indices) {
  return (indices.group << SELECTION_SHIFT) + indices.item;
};
var splitIndex = function splitIndex(combinedIndex) {
  return {
    group: combinedIndex >> SELECTION_SHIFT,
    item: combinedIndex & SELECTION_MASK
  };
};
var GroupedEditStrategy = EditStrategy.inherit({
  _groupElements: function _groupElements() {
    return this._collectionWidget._itemContainer().find('.' + LIST_GROUP_CLASS);
  },
  _groupItemElements: function _groupItemElements($group) {
    return $group.find('.' + LIST_ITEM_CLASS);
  },
  getIndexByItemData: function getIndexByItemData(itemData) {
    var groups = this._collectionWidget.option('items');
    var index = false;
    if (!itemData) return false;
    if (itemData.items && itemData.items.length) {
      itemData = itemData.items[0];
    }
    each(groups, function (groupIndex, group) {
      if (!group.items) return false;
      each(group.items, function (itemIndex, item) {
        if (item !== itemData) {
          return true;
        }
        index = {
          group: groupIndex,
          item: itemIndex
        };
        return false;
      });
      if (index) {
        return false;
      }
    });
    return index;
  },
  getItemDataByIndex: function getItemDataByIndex(index) {
    var items = this._collectionWidget.option('items');
    if (isNumeric(index)) {
      return this.itemsGetter()[index];
    }
    return index && items[index.group] && items[index.group].items[index.item] || null;
  },
  itemsGetter: function itemsGetter() {
    var resultItems = [];
    var items = this._collectionWidget.option('items');
    for (var i = 0; i < items.length; i++) {
      if (items[i] && items[i].items) {
        resultItems = resultItems.concat(items[i].items);
      } else {
        resultItems.push(items[i]);
      }
    }
    return resultItems;
  },
  deleteItemAtIndex: function deleteItemAtIndex(index) {
    var indices = splitIndex(index);
    var itemGroup = this._collectionWidget.option('items')[indices.group].items;
    itemGroup.splice(indices.item, 1);
  },
  getKeysByItems: function getKeysByItems(items) {
    var plainItems = [];
    var i;
    for (i = 0; i < items.length; i++) {
      if (items[i] && items[i].items) {
        plainItems = plainItems.concat(items[i].items);
      } else {
        plainItems.push(items[i]);
      }
    }
    var result = [];
    for (i = 0; i < plainItems.length; i++) {
      result.push(this._collectionWidget.keyOf(plainItems[i]));
    }
    return result;
  },
  getIndexByKey: function getIndexByKey(key, items) {
    var groups = items || this._collectionWidget.option('items');
    var index = -1;
    var that = this;
    each(groups, function (groupIndex, group) {
      if (!group.items) return;
      each(group.items, function (itemIndex, item) {
        var itemKey = that._collectionWidget.keyOf(item);
        if (that._equalKeys(itemKey, key)) {
          index = {
            group: groupIndex,
            item: itemIndex
          };
          return false;
        }
      });
      if (index !== -1) {
        return false;
      }
    });
    return index;
  },
  _getGroups: function _getGroups(items) {
    var dataController = this._collectionWidget._dataController;
    var group = dataController.group();
    if (group) {
      return storeHelper.queryByOptions(query(items), {
        group: group
      }).toArray();
    }
    return this._collectionWidget.option('items');
  },
  getItemsByKeys: function getItemsByKeys(keys, items) {
    var result = [];
    var groups = this._getGroups(items);
    var groupItemByKeyMap = {};
    var getItemMeta = key => {
      var index = this.getIndexByKey(key, groups);
      var group = index && groups[index.group];
      if (!group) return;
      return {
        groupKey: group.key,
        item: group.items[index.item]
      };
    };
    each(keys, function (_, key) {
      var itemMeta = getItemMeta(key);
      if (!itemMeta) return;
      var groupKey = itemMeta.groupKey;
      var item = itemMeta.item;
      var selectedGroup = groupItemByKeyMap[groupKey];
      if (!selectedGroup) {
        selectedGroup = {
          key: groupKey,
          items: []
        };
        groupItemByKeyMap[groupKey] = selectedGroup;
        result.push(selectedGroup);
      }
      selectedGroup.items.push(item);
    });
    return result;
  },
  moveItemAtIndexToIndex: function moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    var items = this._collectionWidget.option('items');
    var movingIndices = splitIndex(movingIndex);
    var destinationIndices = splitIndex(destinationIndex);
    var movingItemGroup = items[movingIndices.group].items;
    var destinationItemGroup = items[destinationIndices.group].items;
    var movedItemData = movingItemGroup[movingIndices.item];
    movingItemGroup.splice(movingIndices.item, 1);
    destinationItemGroup.splice(destinationIndices.item, 0, movedItemData);
  },
  _isItemIndex: function _isItemIndex(index) {
    return index && isNumeric(index.group) && isNumeric(index.item);
  },
  _getNormalizedItemIndex: function _getNormalizedItemIndex(itemElement) {
    var $item = $(itemElement);
    var $group = $item.closest('.' + LIST_GROUP_CLASS);
    if (!$group.length) {
      return -1;
    }
    return combineIndex({
      group: this._groupElements().index($group),
      item: this._groupItemElements($group).index($item)
    });
  },
  _normalizeItemIndex: function _normalizeItemIndex(index) {
    return combineIndex(index);
  },
  _denormalizeItemIndex: function _denormalizeItemIndex(index) {
    return splitIndex(index);
  },
  _getItemByNormalizedIndex: function _getItemByNormalizedIndex(index) {
    var indices = splitIndex(index);
    var $group = this._groupElements().eq(indices.group);
    return this._groupItemElements($group).eq(indices.item);
  },
  _itemsFromSameParent: function _itemsFromSameParent(firstIndex, secondIndex) {
    return splitIndex(firstIndex).group === splitIndex(secondIndex).group;
  }
});
export default GroupedEditStrategy;
