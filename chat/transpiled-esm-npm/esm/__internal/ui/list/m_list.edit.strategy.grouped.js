import query from '../../../common/data/query';
import storeHelper from '../../../common/data/store_helper';
import $ from '../../../core/renderer';
import { each } from '../../../core/utils/iterator';
import { isNumeric } from '../../../core/utils/type';
import EditStrategy from '../../ui/collection/m_collection_widget.edit.strategy.plain';
const LIST_ITEM_CLASS = 'dx-list-item';
const LIST_GROUP_CLASS = 'dx-list-group';
const SELECTION_SHIFT = 20;
const SELECTION_MASK = (1 << SELECTION_SHIFT) - 1;
const combineIndex = indices => (indices.group << SELECTION_SHIFT) + indices.item;
const splitIndex = combinedIndex => ({
  group: combinedIndex >> SELECTION_SHIFT,
  item: combinedIndex & SELECTION_MASK
});
class GroupedEditStrategy extends EditStrategy {
  _groupElements() {
    return this._collectionWidget._itemContainer().find(`.${LIST_GROUP_CLASS}`);
  }
  // eslint-disable-next-line class-methods-use-this
  _groupItemElements($group) {
    return $group.find(`.${LIST_ITEM_CLASS}`);
  }
  getIndexByItemData(itemData) {
    var _itemData$items;
    const groups = this._collectionWidget.option('items');
    let index = false;
    if (!itemData) return false;
    if ((_itemData$items = itemData.items) !== null && _itemData$items !== void 0 && _itemData$items.length) {
      // eslint-disable-next-line prefer-destructuring
      itemData = itemData.items[0];
    }
    // @ts-expect-error
    each(groups, (groupIndex, group) => {
      if (!group.items) return false;
      each(group.items, (itemIndex, item) => {
        if (item !== itemData) {
          return true;
        }
        // @ts-expect-error
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
  }
  getItemDataByIndex(index) {
    var _items$index$group;
    const items = this._collectionWidget.option('items');
    if (isNumeric(index)) {
      return this.itemsGetter()[index];
    }
    return index && ((_items$index$group = items[index.group]) === null || _items$index$group === void 0 ? void 0 : _items$index$group.items[index.item]) || null;
  }
  itemsGetter() {
    let resultItems = [];
    const {
      items
    } = this._collectionWidget.option();
    for (let i = 0; i < items.length; i++) {
      var _items$i;
      if ((_items$i = items[i]) !== null && _items$i !== void 0 && _items$i.items) {
        resultItems = resultItems.concat(items[i].items);
      } else {
        // @ts-expect-error
        resultItems.push(items[i]);
      }
    }
    return resultItems;
  }
  deleteItemAtIndex(index) {
    const indices = splitIndex(index);
    const itemGroup = this._collectionWidget.option('items')[indices.group].items;
    itemGroup.splice(indices.item, 1);
  }
  getKeysByItems(items) {
    let plainItems = [];
    let i;
    for (i = 0; i < items.length; i++) {
      var _items$i2;
      if ((_items$i2 = items[i]) !== null && _items$i2 !== void 0 && _items$i2.items) {
        plainItems = plainItems.concat(items[i].items);
      } else {
        // @ts-expect-error
        plainItems.push(items[i]);
      }
    }
    const result = [];
    for (i = 0; i < plainItems.length; i++) {
      // @ts-expect-error
      result.push(this._collectionWidget.keyOf(plainItems[i]));
    }
    return result;
  }
  getIndexByKey(key, items) {
    const groups = items || this._collectionWidget.option('items');
    let index = -1;
    const that = this;
    // @ts-expect-error
    each(groups, (groupIndex, group) => {
      if (!group.items) return;
      // @ts-expect-error
      each(group.items, (itemIndex, item) => {
        const itemKey = that._collectionWidget.keyOf(item);
        if (that._equalKeys(itemKey, key)) {
          // @ts-expect-error
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
  }
  _getGroups(items) {
    // @ts-expect-error
    const dataController = this._collectionWidget._dataController;
    const group = dataController.group();
    if (group) {
      // @ts-expect-error
      return storeHelper.queryByOptions(query(items), {
        group
      }).toArray();
    }
    return this._collectionWidget.option('items');
  }
  getItemsByKeys(keys, items) {
    const result = [];
    const groups = this._getGroups(items);
    const groupItemByKeyMap = {};
    const getItemMeta = key => {
      const index = this.getIndexByKey(key, groups);
      // @ts-expect-error
      const group = index && groups[index.group];
      if (!group) return;
      return {
        groupKey: group.key,
        // @ts-expect-error
        item: group.items[index.item]
      };
    };
    each(keys, (_, key) => {
      const itemMeta = getItemMeta(key);
      if (!itemMeta) return;
      const {
        groupKey
      } = itemMeta;
      const {
        item
      } = itemMeta;
      let selectedGroup = groupItemByKeyMap[groupKey];
      if (!selectedGroup) {
        selectedGroup = {
          key: groupKey,
          items: []
        };
        groupItemByKeyMap[groupKey] = selectedGroup;
        // @ts-expect-error
        result.push(selectedGroup);
      }
      selectedGroup.items.push(item);
    });
    return result;
  }
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    const items = this._collectionWidget.option('items');
    const movingIndices = splitIndex(movingIndex);
    const destinationIndices = splitIndex(destinationIndex);
    const movingItemGroup = items[movingIndices.group].items;
    const destinationItemGroup = items[destinationIndices.group].items;
    const movedItemData = movingItemGroup[movingIndices.item];
    movingItemGroup.splice(movingIndices.item, 1);
    destinationItemGroup.splice(destinationIndices.item, 0, movedItemData);
  }
  // @ts-expect-error
  // eslint-disable-next-line class-methods-use-this
  _isItemIndex(index) {
    return index && isNumeric(index.group) && isNumeric(index.item);
  }
  // @ts-expect-error
  _getNormalizedItemIndex(itemElement) {
    const $item = $(itemElement);
    const $group = $item.closest(`.${LIST_GROUP_CLASS}`);
    if (!$group.length) {
      return -1;
    }
    return combineIndex({
      group: this._groupElements().index($group),
      item: this._groupItemElements($group).index($item)
    });
  }
  // eslint-disable-next-line class-methods-use-this
  _normalizeItemIndex(index) {
    return combineIndex(index);
  }
  // eslint-disable-next-line class-methods-use-this
  _denormalizeItemIndex(index) {
    return splitIndex(index);
  }
  _getItemByNormalizedIndex(index) {
    const indices = splitIndex(index);
    const $group = this._groupElements().eq(indices.group);
    return this._groupItemElements($group).eq(indices.item);
  }
  _itemsFromSameParent(firstIndex, secondIndex) {
    return splitIndex(firstIndex).group === splitIndex(secondIndex).group;
  }
}
export default GroupedEditStrategy;