/**
* DevExtreme (cjs/ui/selection/selection.strategy.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _query = _interopRequireDefault(require("../../data/query"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var SelectionStrategy = /*#__PURE__*/function () {
  function SelectionStrategy(options) {
    this.options = options;
    this._setOption('disabledItemKeys', []);
    this._clearItemKeys();
  }
  var _proto = SelectionStrategy.prototype;
  _proto._clearItemKeys = function _clearItemKeys() {
    this._setOption('addedItemKeys', []);
    this._setOption('removedItemKeys', []);
    this._setOption('removedItems', []);
    this._setOption('addedItems', []);
  };
  _proto.validate = function validate() {};
  _proto._setOption = function _setOption(name, value) {
    this.options[name] = value;
  };
  _proto.onSelectionChanged = function onSelectionChanged() {
    var addedItemKeys = this.options.addedItemKeys;
    var removedItemKeys = this.options.removedItemKeys;
    var addedItems = this.options.addedItems;
    var removedItems = this.options.removedItems;
    var selectedItems = this.options.selectedItems;
    var selectedItemKeys = this.options.selectedItemKeys;
    var onSelectionChanged = this.options.onSelectionChanged || _common.noop;
    this._clearItemKeys();
    onSelectionChanged({
      selectedItems: selectedItems,
      selectedItemKeys: selectedItemKeys,
      addedItemKeys: addedItemKeys,
      removedItemKeys: removedItemKeys,
      addedItems: addedItems,
      removedItems: removedItems
    });
  };
  _proto.equalKeys = function equalKeys(key1, key2) {
    if (this.options.equalByReference) {
      if ((0, _type.isObject)(key1) && (0, _type.isObject)(key2)) {
        return key1 === key2;
      }
    }
    return (0, _common.equalByValue)(key1, key2);
  };
  _proto.getSelectableItems = function getSelectableItems(items) {
    return items.filter(function (item) {
      return !(item !== null && item !== void 0 && item.disabled);
    });
  };
  _proto._clearSelection = function _clearSelection(keys, preserve, isDeselect, isSelectAll) {
    keys = keys || [];
    keys = Array.isArray(keys) ? keys : [keys];
    this.validate();
    return this.selectedItemKeys(keys, preserve, isDeselect, isSelectAll);
  };
  _proto._removeTemplateProperty = function _removeTemplateProperty(remoteFilter) {
    var _this = this;
    if (Array.isArray(remoteFilter)) {
      return remoteFilter.map(function (f) {
        return _this._removeTemplateProperty(f);
      });
    }
    if ((0, _type.isObject)(remoteFilter)) {
      delete remoteFilter.template;
    }
    return remoteFilter;
  };
  _proto._loadFilteredData = function _loadFilteredData(remoteFilter, localFilter, select, isSelectAll) {
    var filterLength = encodeURI(JSON.stringify(this._removeTemplateProperty(remoteFilter))).length;
    var needLoadAllData = this.options.maxFilterLengthInRequest && filterLength > this.options.maxFilterLengthInRequest;
    var deferred = new _deferred.Deferred();
    var loadOptions = {
      filter: needLoadAllData ? undefined : remoteFilter,
      select: needLoadAllData ? this.options.dataFields() : select || this.options.dataFields()
    };
    if (remoteFilter && remoteFilter.length === 0) {
      deferred.resolve([]);
    } else {
      this.options.load(loadOptions).done(function (items) {
        var filteredItems = (0, _type.isPlainObject)(items) ? items.data : items;
        if (localFilter && !isSelectAll) {
          filteredItems = filteredItems.filter(localFilter);
        } else if (needLoadAllData) {
          filteredItems = (0, _query.default)(filteredItems).filter(remoteFilter).toArray();
        }
        deferred.resolve(filteredItems);
      }).fail(deferred.reject.bind(deferred));
    }
    return deferred;
  };
  _proto.updateSelectedItemKeyHash = function updateSelectedItemKeyHash(keys) {
    for (var i = 0; i < keys.length; i++) {
      var keyHash = (0, _common.getKeyHash)(keys[i]);
      if (!(0, _type.isObject)(keyHash)) {
        this.options.keyHashIndices[keyHash] = this.options.keyHashIndices[keyHash] || [];
        var keyIndices = this.options.keyHashIndices[keyHash];
        keyIndices.push(i);
      }
    }
  };
  _proto._isAnyItemSelected = function _isAnyItemSelected(items) {
    for (var i = 0; i < items.length; i++) {
      if (this.options.isItemSelected(items[i])) {
        return undefined;
      }
    }
    return false;
  };
  _proto._getFullSelectAllState = function _getFullSelectAllState() {
    var items = this.options.plainItems();
    var dataFilter = this.options.filter();
    var selectedItems = this.options.ignoreDisabledItems ? this.options.selectedItems : this.options.selectedItems.filter(function (item) {
      return !(item !== null && item !== void 0 && item.disabled);
    });
    if (dataFilter) {
      selectedItems = (0, _query.default)(selectedItems).filter(dataFilter).toArray();
    }
    var selectedItemsLength = selectedItems.length;
    var disabledItemsLength = items.length - this.getSelectableItems(items).length;
    if (!selectedItemsLength) {
      return this._isAnyItemSelected(items);
    }
    if (selectedItemsLength >= this.options.totalCount() - disabledItemsLength) {
      return true;
    }
    return undefined;
  };
  _proto._getVisibleSelectAllState = function _getVisibleSelectAllState() {
    var items = this.getSelectableItems(this.options.plainItems());
    var hasSelectedItems = false;
    var hasUnselectedItems = false;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemData = this.options.getItemData(item);
      var key = this.options.keyOf(itemData);
      if (this.options.isSelectableItem(item)) {
        if (this.isItemKeySelected(key)) {
          hasSelectedItems = true;
        } else {
          hasUnselectedItems = true;
        }
      }
    }
    if (hasSelectedItems) {
      return !hasUnselectedItems ? true : undefined;
    } else {
      return false;
    }
  };
  return SelectionStrategy;
}();
exports.default = SelectionStrategy;
module.exports = exports.default;
module.exports.default = exports.default;
