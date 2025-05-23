/**
* DevExtreme (esm/ui/selection/selection.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import deferredStrategy from './selection.strategy.deferred';
import standardStrategy from './selection.strategy.standard';
import { extend } from '../../core/utils/extend';
import { noop } from '../../core/utils/common';
import { isDefined } from '../../core/utils/type';
import { Deferred, when } from '../../core/utils/deferred';
export default class Selection {
  constructor(options) {
    this.options = extend(this._getDefaultOptions(), options, {
      selectedItemKeys: options.selectedKeys || []
    });
    this._selectionStrategy = this.options.deferred ? new deferredStrategy(this.options) : new standardStrategy(this.options);
    this._focusedItemIndex = -1;
    if (!this.options.equalByReference) {
      this._selectionStrategy.updateSelectedItemKeyHash(this.options.selectedItemKeys);
    }
  }
  _getDefaultOptions() {
    return {
      allowNullValue: false,
      deferred: false,
      equalByReference: false,
      mode: 'multiple',
      selectedItems: [],
      selectionFilter: [],
      maxFilterLengthInRequest: 0,
      onSelectionChanged: noop,
      key: noop,
      keyOf: function keyOf(item) {
        return item;
      },
      load: function load() {
        return new Deferred().resolve([]);
      },
      totalCount: function totalCount() {
        return -1;
      },
      isSelectableItem: function isSelectableItem() {
        return true;
      },
      isItemSelected: function isItemSelected() {
        return false;
      },
      getItemData: function getItemData(item) {
        return item;
      },
      dataFields: noop,
      filter: noop
    };
  }
  validate() {
    this._selectionStrategy.validate();
  }
  getSelectedItemKeys() {
    return this._selectionStrategy.getSelectedItemKeys();
  }
  getSelectedItems() {
    return this._selectionStrategy.getSelectedItems();
  }
  selectionFilter(value) {
    if (value === undefined) {
      return this.options.selectionFilter;
    }
    var filterIsChanged = this.options.selectionFilter !== value && JSON.stringify(this.options.selectionFilter) !== JSON.stringify(value);
    this.options.selectionFilter = value;
    filterIsChanged && this.onSelectionChanged();
  }
  setSelection(keys, updatedKeys) {
    return this.selectedItemKeys(keys, false, false, false, updatedKeys);
  }
  select(keys) {
    return this.selectedItemKeys(keys, true);
  }
  deselect(keys) {
    return this.selectedItemKeys(keys, true, true);
  }
  selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys) {
    var _keys;
    var that = this;
    keys = (_keys = keys) !== null && _keys !== void 0 ? _keys : [];
    keys = Array.isArray(keys) ? keys : [keys];
    that.validate();
    return this._selectionStrategy.selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys);
  }
  clearSelection() {
    return this.selectedItemKeys([]);
  }
  _addSelectedItem(itemData, key) {
    this._selectionStrategy.addSelectedItem(key, itemData);
  }
  _removeSelectedItem(key) {
    this._selectionStrategy.removeSelectedItem(key);
  }
  _setSelectedItems(keys, items) {
    this._selectionStrategy.setSelectedItems(keys, items);
  }
  onSelectionChanged() {
    this._selectionStrategy.onSelectionChanged();
  }
  changeItemSelection(itemIndex, keys, setFocusOnly) {
    var _this$options$allowLo, _this$options;
    var isSelectedItemsChanged;
    var items = this.options.plainItems();
    var item = items[itemIndex];
    var deferred;
    var allowLoadByRange = (_this$options$allowLo = (_this$options = this.options).allowLoadByRange) === null || _this$options$allowLo === void 0 ? void 0 : _this$options$allowLo.call(_this$options);
    var indexOffset;
    var focusedItemNotInLoadedRange = false;
    var shiftFocusedItemNotInLoadedRange = false;
    var itemIsNotInLoadedRange = index => index >= 0 && !items.filter(it => it.loadIndex === index).length;
    if (allowLoadByRange && isDefined(item)) {
      indexOffset = item.loadIndex - itemIndex;
      itemIndex = item.loadIndex;
      focusedItemNotInLoadedRange = itemIsNotInLoadedRange(this._focusedItemIndex);
      if (isDefined(this._shiftFocusedItemIndex)) {
        shiftFocusedItemNotInLoadedRange = itemIsNotInLoadedRange(this._shiftFocusedItemIndex);
      }
    }
    if (!this.isSelectable() || !this.isDataItem(item)) {
      return false;
    }
    var itemData = this.options.getItemData(item);
    var itemKey = this.options.keyOf(itemData);
    keys = keys || {};
    if (keys.shift && this.options.mode === 'multiple' && this._focusedItemIndex >= 0) {
      if (focusedItemNotInLoadedRange || shiftFocusedItemNotInLoadedRange) {
        isSelectedItemsChanged = itemIndex !== this._shiftFocusedItemIndex || this._focusedItemIndex !== this._shiftFocusedItemIndex;
        if (isSelectedItemsChanged) {
          deferred = this.changeItemSelectionWhenShiftKeyInVirtualPaging(itemIndex);
        }
      } else {
        isSelectedItemsChanged = this.changeItemSelectionWhenShiftKeyPressed(itemIndex, items, indexOffset);
      }
    } else if (keys.control) {
      this._resetItemSelectionWhenShiftKeyPressed();
      if (!setFocusOnly) {
        var isSelected = this._selectionStrategy.isItemDataSelected(itemData);
        if (this.options.mode === 'single') {
          this.clearSelectedItems();
        }
        if (isSelected) {
          this._removeSelectedItem(itemKey);
        } else {
          this._addSelectedItem(itemData, itemKey);
        }
      }
      isSelectedItemsChanged = true;
    } else {
      this._resetItemSelectionWhenShiftKeyPressed();
      var isKeysEqual = this._selectionStrategy.equalKeys(this.options.selectedItemKeys[0], itemKey);
      if (this.options.selectedItemKeys.length !== 1 || !isKeysEqual) {
        this._setSelectedItems([itemKey], [itemData]);
        isSelectedItemsChanged = true;
      }
    }
    if (isSelectedItemsChanged) {
      when(deferred).done(() => {
        this._focusedItemIndex = itemIndex;
        !setFocusOnly && this.onSelectionChanged();
      });
      return true;
    }
  }
  isDataItem(item) {
    return this.options.isSelectableItem(item);
  }
  isSelectable() {
    return this.options.mode === 'single' || this.options.mode === 'multiple';
  }
  isItemDataSelected(data) {
    return this._selectionStrategy.isItemDataSelected(data, {
      checkPending: true
    });
  }
  isItemSelected(arg, options) {
    return this._selectionStrategy.isItemKeySelected(arg, options);
  }
  _resetItemSelectionWhenShiftKeyPressed() {
    delete this._shiftFocusedItemIndex;
  }
  _resetFocusedItemIndex() {
    this._focusedItemIndex = -1;
  }
  changeItemSelectionWhenShiftKeyInVirtualPaging(loadIndex) {
    var loadOptions = this.options.getLoadOptions(loadIndex, this._focusedItemIndex, this._shiftFocusedItemIndex);
    var deferred = new Deferred();
    var indexOffset = loadOptions.skip;
    this.options.load(loadOptions).done(items => {
      this.changeItemSelectionWhenShiftKeyPressed(loadIndex, items, indexOffset);
      deferred.resolve();
    });
    return deferred.promise();
  }
  changeItemSelectionWhenShiftKeyPressed(itemIndex, items, indexOffset) {
    var isSelectedItemsChanged = false;
    var itemIndexStep;
    var indexOffsetDefined = isDefined(indexOffset);
    var index = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
    var keyOf = this.options.keyOf;
    var focusedItem = items[index];
    var focusedData = this.options.getItemData(focusedItem);
    var focusedKey = keyOf(focusedData);
    var isFocusedItemSelected = focusedItem && this.isItemDataSelected(focusedData);
    if (!isDefined(this._shiftFocusedItemIndex)) {
      this._shiftFocusedItemIndex = this._focusedItemIndex;
    }
    var data;
    var itemKey;
    var startIndex;
    var endIndex;
    if (this._shiftFocusedItemIndex !== this._focusedItemIndex) {
      itemIndexStep = this._focusedItemIndex < this._shiftFocusedItemIndex ? 1 : -1;
      startIndex = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
      endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
      for (index = startIndex; index !== endIndex; index += itemIndexStep) {
        if (indexOffsetDefined || this.isDataItem(items[index])) {
          itemKey = keyOf(this.options.getItemData(items[index]));
          this._removeSelectedItem(itemKey);
          isSelectedItemsChanged = true;
        }
      }
    }
    if (itemIndex !== this._shiftFocusedItemIndex) {
      itemIndexStep = itemIndex < this._shiftFocusedItemIndex ? 1 : -1;
      startIndex = indexOffsetDefined ? itemIndex - indexOffset : itemIndex;
      endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
      for (index = startIndex; index !== endIndex; index += itemIndexStep) {
        if (indexOffsetDefined || this.isDataItem(items[index])) {
          data = this.options.getItemData(items[index]);
          itemKey = keyOf(data);
          this._addSelectedItem(data, itemKey);
          isSelectedItemsChanged = true;
        }
      }
    }
    if ((indexOffsetDefined || this.isDataItem(focusedItem)) && !isFocusedItemSelected) {
      this._addSelectedItem(focusedData, focusedKey);
      isSelectedItemsChanged = true;
    }
    return isSelectedItemsChanged;
  }
  clearSelectedItems() {
    this._setSelectedItems([], []);
  }
  selectAll(isOnePage) {
    this._resetFocusedItemIndex();
    if (isOnePage) {
      return this._onePageSelectAll(false);
    } else {
      return this.selectedItemKeys([], true, false, true);
    }
  }
  deselectAll(isOnePage) {
    this._resetFocusedItemIndex();
    if (isOnePage) {
      return this._onePageSelectAll(true);
    } else {
      return this.selectedItemKeys([], true, true, true);
    }
  }
  _onePageSelectAll(isDeselect) {
    var items = this._selectionStrategy.getSelectableItems(this.options.plainItems());
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (this.isDataItem(item)) {
        var itemData = this.options.getItemData(item);
        var itemKey = this.options.keyOf(itemData);
        var isSelected = this.isItemSelected(itemKey);
        if (!isSelected && !isDeselect) {
          this._addSelectedItem(itemData, itemKey);
        }
        if (isSelected && isDeselect) {
          this._removeSelectedItem(itemKey);
        }
      }
    }
    this.onSelectionChanged();
    return new Deferred().resolve();
  }
  getSelectAllState(visibleOnly) {
    return this._selectionStrategy.getSelectAllState(visibleOnly);
  }
  loadSelectedItemsWithFilter() {
    return this._selectionStrategy.loadSelectedItemsWithFilter();
  }
}
