/**
* DevExtreme (cjs/ui/collection/ui.collection_widget.edit.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _uiCollection_widget = _interopRequireDefault(require("./ui.collection_widget.base"));
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _uiCollection_widgetEditStrategy = _interopRequireDefault(require("./ui.collection_widget.edit.strategy.plain"));
var _data = require("../../core/utils/data");
var _data_source = require("../../data/data_source/data_source");
var _utils = require("../../data/data_source/utils");
var _selection = _interopRequireDefault(require("../selection/selection"));
var _deferred = require("../../core/utils/deferred");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ITEM_DELETING_DATA_KEY = 'dxItemDeleting';
var NOT_EXISTING_INDEX = -1;
var indexExists = function indexExists(index) {
  return index !== NOT_EXISTING_INDEX;
};
var CollectionWidget = _uiCollection_widget.default.inherit({
  _setOptionsByReference: function _setOptionsByReference() {
    this.callBase();
    (0, _extend.extend)(this._optionsByReference, {
      selectedItem: true
    });
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      /**
      * @name CollectionWidgetOptions.selectionMode
      * @type string
      * @default 'none'
      * @acceptValues 'multiple'|'single'|'all'|'none'
      * @hidden
      */
      selectionMode: 'none',
      /**
      * @name CollectionWidgetOptions.selectionRequired
      * @type boolean
      * @default false
      * @hidden
      */
      selectionRequired: false,
      selectByClick: true,
      selectedItems: [],
      selectedItemKeys: [],
      maxFilterLengthInRequest: 1500,
      keyExpr: null,
      selectedIndex: NOT_EXISTING_INDEX,
      selectedItem: null,
      onSelectionChanged: null,
      /**
      * @section Utils
      * @default null
      * @name CollectionWidgetOptions.onItemReordered
      * @type function(e)
      * @type_function_param1 e:object
      * @type_function_param1_field1 component:this
      * @type_function_param1_field2 element:DxElement
      * @type_function_param1_field3 model:object
      * @type_function_param1_field4 itemData:object
      * @type_function_param1_field5 itemElement:DxElement
      * @type_function_param1_field6 itemIndex:number | object
      * @type_function_param1_field7 fromIndex:number
      * @type_function_param1_field8 toIndex:number
      * @action
      * @hidden
      */
      onItemReordered: null,
      /**
      * @section Utils
      * @default null
      * @name CollectionWidgetOptions.onItemDeleting
      * @type function(e)
      * @type_function_param1 e:object
      * @type_function_param1_field1 component:this
      * @type_function_param1_field2 element:DxElement
      * @type_function_param1_field3 model:object
      * @type_function_param1_field4 itemData:object
      * @type_function_param1_field5 itemElement:DxElement
      * @type_function_param1_field6 itemIndex:number | object
      * @type_function_param1_field7 cancel:boolean | Promise<void>
      * @action
      * @hidden
      */
      onItemDeleting: null,
      /**
      * @section Utils
      * @default null
      * @name CollectionWidgetOptions.onItemDeleted
      * @type function(e)
      * @type_function_param1 e:object
      * @type_function_param1_field1 component:this
      * @type_function_param1_field2 element:DxElement
      * @type_function_param1_field3 model:object
      * @type_function_param1_field4 itemData:object
      * @type_function_param1_field5 itemElement:DxElement
      * @type_function_param1_field6 itemIndex:number | object
      * @action
      * @hidden
      */
      onItemDeleted: null
    });
  },
  ctor: function ctor(element, options) {
    this._userOptions = options || {};
    this.callBase(element, options);
  },
  _init: function _init() {
    this._initEditStrategy();
    this.callBase();
    this._initKeyGetter();
    this._initSelectionModule();
  },
  _initKeyGetter: function _initKeyGetter() {
    this._keyGetter = (0, _data.compileGetter)(this.option('keyExpr'));
  },
  _getKeysByItems: function _getKeysByItems(selectedItems) {
    return this._editStrategy.getKeysByItems(selectedItems);
  },
  _getItemsByKeys: function _getItemsByKeys(selectedItemKeys, selectedItems) {
    return this._editStrategy.getItemsByKeys(selectedItemKeys, selectedItems);
  },
  _getKeyByIndex: function _getKeyByIndex(index) {
    return this._editStrategy.getKeyByIndex(index);
  },
  _getIndexByKey: function _getIndexByKey(key) {
    return this._editStrategy.getIndexByKey(key);
  },
  _getIndexByItemData: function _getIndexByItemData(itemData) {
    return this._editStrategy.getIndexByItemData(itemData);
  },
  _isKeySpecified: function _isKeySpecified() {
    return !!this._dataController.key();
  },
  _getCombinedFilter: function _getCombinedFilter() {
    return this._dataController.filter();
  },
  key: function key() {
    if (this.option('keyExpr')) return this.option('keyExpr');
    return this._dataController.key();
  },
  keyOf: function keyOf(item) {
    var key = item;
    if (this.option('keyExpr')) {
      key = this._keyGetter(item);
    } else if (this._dataController.store()) {
      key = this._dataController.keyOf(item);
    }
    return key;
  },
  _nullValueSelectionSupported: function _nullValueSelectionSupported() {
    return false;
  },
  _initSelectionModule: function _initSelectionModule() {
    var that = this;
    var itemsGetter = that._editStrategy.itemsGetter;
    this._selection = new _selection.default({
      allowNullValue: this._nullValueSelectionSupported(),
      mode: this.option('selectionMode'),
      maxFilterLengthInRequest: this.option('maxFilterLengthInRequest'),
      equalByReference: !this._isKeySpecified(),
      onSelectionChanged: function onSelectionChanged(args) {
        if (args.addedItemKeys.length || args.removedItemKeys.length) {
          that.option('selectedItems', that._getItemsByKeys(args.selectedItemKeys, args.selectedItems));
          that._updateSelectedItems(args);
        }
      },
      filter: that._getCombinedFilter.bind(that),
      totalCount: function totalCount() {
        var items = that.option('items');
        var totalCount = that._dataController.totalCount();
        return totalCount >= 0 ? totalCount : that._getItemsCount(items);
      },
      key: that.key.bind(that),
      keyOf: that.keyOf.bind(that),
      load: function load(options) {
        var _dataController$loadO;
        var dataController = that._dataController;
        options.customQueryParams = (_dataController$loadO = dataController.loadOptions()) === null || _dataController$loadO === void 0 ? void 0 : _dataController$loadO.customQueryParams;
        options.userData = dataController.userData();
        if (dataController.store()) {
          return dataController.loadFromStore(options).done(function (loadResult) {
            if (that._disposed) {
              return;
            }
            var items = (0, _utils.normalizeLoadResult)(loadResult).data;
            dataController.applyMapFunction(items);
          });
        } else {
          return new _deferred.Deferred().resolve(this.plainItems());
        }
      },
      dataFields: function dataFields() {
        return that._dataController.select();
      },
      plainItems: itemsGetter.bind(that._editStrategy)
    });
  },
  _getItemsCount: function _getItemsCount(items) {
    var _this = this;
    return items.reduce(function (itemsCount, item) {
      return itemsCount += item.items ? _this._getItemsCount(item.items) : 1;
    }, 0);
  },
  _initEditStrategy: function _initEditStrategy() {
    var Strategy = _uiCollection_widgetEditStrategy.default;
    this._editStrategy = new Strategy(this);
  },
  _getSelectedItemIndices: function _getSelectedItemIndices(keys) {
    var that = this;
    var indices = [];
    keys = keys || this._selection.getSelectedItemKeys();
    that._editStrategy.beginCache();
    (0, _iterator.each)(keys, function (_, key) {
      var selectedIndex = that._getIndexByKey(key);
      if (indexExists(selectedIndex)) {
        indices.push(selectedIndex);
      }
    });
    that._editStrategy.endCache();
    return indices;
  },
  _initMarkup: function _initMarkup() {
    var _this2 = this;
    this._rendering = true;
    if (!this._dataController.isLoading()) {
      this._syncSelectionOptions().done(function () {
        return _this2._normalizeSelectedItems();
      });
    }
    this.callBase();
  },
  _render: function _render() {
    this.callBase();
    this._rendering = false;
  },
  _fireContentReadyAction: function _fireContentReadyAction() {
    this._rendering = false;
    this._rendered = true;
    this.callBase.apply(this, arguments);
  },
  _syncSelectionOptions: function _syncSelectionOptions(byOption) {
    byOption = byOption || this._chooseSelectOption();
    var selectedItem;
    var selectedIndex;
    var selectedItemKeys;
    var selectedItems;
    switch (byOption) {
      case 'selectedIndex':
        selectedItem = this._editStrategy.getItemDataByIndex(this.option('selectedIndex'));
        if ((0, _type.isDefined)(selectedItem)) {
          this._setOptionWithoutOptionChange('selectedItems', [selectedItem]);
          this._setOptionWithoutOptionChange('selectedItem', selectedItem);
          this._setOptionWithoutOptionChange('selectedItemKeys', this._editStrategy.getKeysByItems([selectedItem]));
        } else {
          this._setOptionWithoutOptionChange('selectedItems', []);
          this._setOptionWithoutOptionChange('selectedItemKeys', []);
          this._setOptionWithoutOptionChange('selectedItem', null);
        }
        break;
      case 'selectedItems':
        selectedItems = this.option('selectedItems') || [];
        selectedIndex = selectedItems.length ? this._editStrategy.getIndexByItemData(selectedItems[0]) : NOT_EXISTING_INDEX;
        if (this.option('selectionRequired') && !indexExists(selectedIndex)) {
          return this._syncSelectionOptions('selectedIndex');
        }
        this._setOptionWithoutOptionChange('selectedItem', selectedItems[0]);
        this._setOptionWithoutOptionChange('selectedIndex', selectedIndex);
        this._setOptionWithoutOptionChange('selectedItemKeys', this._editStrategy.getKeysByItems(selectedItems));
        break;
      case 'selectedItem':
        selectedItem = this.option('selectedItem');
        selectedIndex = this._editStrategy.getIndexByItemData(selectedItem);
        if (this.option('selectionRequired') && !indexExists(selectedIndex)) {
          return this._syncSelectionOptions('selectedIndex');
        }
        if ((0, _type.isDefined)(selectedItem)) {
          this._setOptionWithoutOptionChange('selectedItems', [selectedItem]);
          this._setOptionWithoutOptionChange('selectedIndex', selectedIndex);
          this._setOptionWithoutOptionChange('selectedItemKeys', this._editStrategy.getKeysByItems([selectedItem]));
        } else {
          this._setOptionWithoutOptionChange('selectedItems', []);
          this._setOptionWithoutOptionChange('selectedItemKeys', []);
          this._setOptionWithoutOptionChange('selectedIndex', NOT_EXISTING_INDEX);
        }
        break;
      case 'selectedItemKeys':
        selectedItemKeys = this.option('selectedItemKeys');
        if (this.option('selectionRequired')) {
          var selectedItemIndex = this._getIndexByKey(selectedItemKeys[0]);
          if (!indexExists(selectedItemIndex)) {
            return this._syncSelectionOptions('selectedIndex');
          }
        }
        return this._selection.setSelection(selectedItemKeys);
    }
    return new _deferred.Deferred().resolve().promise();
  },
  _chooseSelectOption: function _chooseSelectOption() {
    var optionName = 'selectedIndex';
    var isOptionDefined = function (optionName) {
      var optionValue = this.option(optionName);
      var length = (0, _type.isDefined)(optionValue) && optionValue.length;
      return length || optionName in this._userOptions;
    }.bind(this);
    if (isOptionDefined('selectedItems')) {
      optionName = 'selectedItems';
    } else if (isOptionDefined('selectedItem')) {
      optionName = 'selectedItem';
    } else if (isOptionDefined('selectedItemKeys')) {
      optionName = 'selectedItemKeys';
    }
    return optionName;
  },
  _compareKeys: function _compareKeys(oldKeys, newKeys) {
    if (oldKeys.length !== newKeys.length) {
      return false;
    }
    for (var i = 0; i < newKeys.length; i++) {
      if (oldKeys[i] !== newKeys[i]) {
        return false;
      }
    }
    return true;
  },
  _normalizeSelectedItems: function _normalizeSelectedItems() {
    if (this.option('selectionMode') === 'none') {
      this._setOptionWithoutOptionChange('selectedItems', []);
      this._syncSelectionOptions('selectedItems');
    } else if (this.option('selectionMode') === 'single') {
      var newSelection = this.option('selectedItems');
      if (newSelection.length > 1 || !newSelection.length && this.option('selectionRequired') && this.option('items') && this.option('items').length) {
        var currentSelection = this._selection.getSelectedItems();
        var normalizedSelection = newSelection[0] === undefined ? currentSelection[0] : newSelection[0];
        if (normalizedSelection === undefined) {
          normalizedSelection = this._editStrategy.itemsGetter()[0];
        }
        if (this.option('grouped') && normalizedSelection && normalizedSelection.items) {
          normalizedSelection.items = [normalizedSelection.items[0]];
        }
        this._selection.setSelection(this._getKeysByItems([normalizedSelection]));
        this._setOptionWithoutOptionChange('selectedItems', [normalizedSelection]);
        return this._syncSelectionOptions('selectedItems');
      } else {
        this._selection.setSelection(this._getKeysByItems(newSelection));
      }
    } else {
      var newKeys = this._getKeysByItems(this.option('selectedItems'));
      var oldKeys = this._selection.getSelectedItemKeys();
      if (!this._compareKeys(oldKeys, newKeys)) {
        this._selection.setSelection(newKeys);
      }
    }
    return new _deferred.Deferred().resolve().promise();
  },
  _itemClickHandler: function _itemClickHandler(e) {
    var _arguments = arguments,
      _this3 = this;
    var itemSelectPromise = new _deferred.Deferred().resolve();
    var callBase = this.callBase;
    this._createAction(function (e) {
      var _this$_itemSelectHand;
      itemSelectPromise = (_this$_itemSelectHand = this._itemSelectHandler(e.event)) !== null && _this$_itemSelectHand !== void 0 ? _this$_itemSelectHand : itemSelectPromise;
    }.bind(this), {
      validatingTargetName: 'itemElement'
    })({
      itemElement: (0, _renderer.default)(e.currentTarget),
      event: e
    });
    itemSelectPromise.always(function () {
      callBase.apply(_this3, _arguments);
    });
  },
  _itemSelectHandler: function _itemSelectHandler(e) {
    var _itemSelectPromise;
    var itemSelectPromise;
    if (!this.option('selectByClick')) {
      return;
    }
    var $itemElement = e.currentTarget;
    if (this.isItemSelected($itemElement)) {
      this.unselectItem(e.currentTarget);
    } else {
      itemSelectPromise = this.selectItem(e.currentTarget);
    }
    return (_itemSelectPromise = itemSelectPromise) === null || _itemSelectPromise === void 0 ? void 0 : _itemSelectPromise.promise();
  },
  _selectedItemElement: function _selectedItemElement(index) {
    return this._itemElements().eq(index);
  },
  _postprocessRenderItem: function _postprocessRenderItem(args) {
    if (this.option('selectionMode') !== 'none') {
      var $itemElement = (0, _renderer.default)(args.itemElement);
      var normalizedItemIndex = this._editStrategy.getNormalizedIndex($itemElement);
      var isItemSelected = this._isItemSelected(normalizedItemIndex);
      this._processSelectableItem($itemElement, isItemSelected);
    }
  },
  _processSelectableItem: function _processSelectableItem($itemElement, isSelected) {
    $itemElement.toggleClass(this._selectedItemClass(), isSelected);
    this._setAriaSelectionAttribute($itemElement, String(isSelected));
  },
  _updateSelectedItems: function _updateSelectedItems(args) {
    var that = this;
    var addedItemKeys = args.addedItemKeys;
    var removedItemKeys = args.removedItemKeys;
    if (that._rendered && (addedItemKeys.length || removedItemKeys.length)) {
      var selectionChangePromise = that._selectionChangePromise;
      if (!that._rendering) {
        var addedSelection = [];
        var normalizedIndex;
        var removedSelection = [];
        that._editStrategy.beginCache();
        for (var i = 0; i < addedItemKeys.length; i++) {
          normalizedIndex = that._getIndexByKey(addedItemKeys[i]);
          addedSelection.push(normalizedIndex);
          that._addSelection(normalizedIndex);
        }
        for (var _i = 0; _i < removedItemKeys.length; _i++) {
          normalizedIndex = that._getIndexByKey(removedItemKeys[_i]);
          removedSelection.push(normalizedIndex);
          that._removeSelection(normalizedIndex);
        }
        that._editStrategy.endCache();
        that._updateSelection(addedSelection, removedSelection);
      }
      (0, _deferred.when)(selectionChangePromise).done(function () {
        that._fireSelectionChangeEvent(args.addedItems, args.removedItems);
      });
    }
  },
  _fireSelectionChangeEvent: function _fireSelectionChangeEvent(addedItems, removedItems) {
    this._createActionByOption('onSelectionChanged', {
      excludeValidators: ['disabled', 'readOnly']
    })({
      addedItems: addedItems,
      removedItems: removedItems
    });
  },
  _updateSelection: _common.noop,
  _setAriaSelectionAttribute: function _setAriaSelectionAttribute($target, value) {
    this.setAria('selected', value, $target);
  },
  _removeSelection: function _removeSelection(normalizedIndex) {
    var $itemElement = this._editStrategy.getItemElement(normalizedIndex);
    if (indexExists(normalizedIndex)) {
      this._processSelectableItem($itemElement, false);
      _events_engine.default.triggerHandler($itemElement, 'stateChanged', false);
    }
  },
  _addSelection: function _addSelection(normalizedIndex) {
    var $itemElement = this._editStrategy.getItemElement(normalizedIndex);
    if (indexExists(normalizedIndex)) {
      this._processSelectableItem($itemElement, true);
      _events_engine.default.triggerHandler($itemElement, 'stateChanged', true);
    }
  },
  _isItemSelected: function _isItemSelected(index) {
    var key = this._getKeyByIndex(index);
    return this._selection.isItemSelected(key, {
      checkPending: true
    });
  },
  _optionChanged: function _optionChanged(args) {
    var _this4 = this;
    switch (args.name) {
      case 'selectionMode':
        this._invalidate();
        break;
      case 'dataSource':
        if (!args.value || Array.isArray(args.value) && !args.value.length) {
          this.option('selectedItemKeys', []);
        }
        this.callBase(args);
        break;
      case 'selectedIndex':
      case 'selectedItem':
      case 'selectedItems':
      case 'selectedItemKeys':
        this._syncSelectionOptions(args.name).done(function () {
          return _this4._normalizeSelectedItems();
        });
        break;
      case 'keyExpr':
        this._initKeyGetter();
        break;
      case 'selectionRequired':
        this._normalizeSelectedItems();
        break;
      case 'selectByClick':
      case 'onSelectionChanged':
      case 'onItemDeleting':
      case 'onItemDeleted':
      case 'onItemReordered':
      case 'maxFilterLengthInRequest':
        break;
      default:
        this.callBase(args);
    }
  },
  _clearSelectedItems: function _clearSelectedItems() {
    this._setOptionWithoutOptionChange('selectedItems', []);
    this._syncSelectionOptions('selectedItems');
  },
  _waitDeletingPrepare: function _waitDeletingPrepare($itemElement) {
    if ($itemElement.data(ITEM_DELETING_DATA_KEY)) {
      return new _deferred.Deferred().resolve().promise();
    }
    $itemElement.data(ITEM_DELETING_DATA_KEY, true);
    var deferred = new _deferred.Deferred();
    var deletingActionArgs = {
      cancel: false
    };
    var deletePromise = this._itemEventHandler($itemElement, 'onItemDeleting', deletingActionArgs, {
      excludeValidators: ['disabled', 'readOnly']
    });
    (0, _deferred.when)(deletePromise).always(function (value) {
      var deletePromiseExists = !deletePromise;
      var deletePromiseResolved = !deletePromiseExists && deletePromise.state() === 'resolved';
      var argumentsSpecified = !!arguments.length;
      var shouldDelete = deletePromiseExists || deletePromiseResolved && !argumentsSpecified || deletePromiseResolved && value;
      (0, _deferred.when)((0, _deferred.fromPromise)(deletingActionArgs.cancel)).always(function () {
        $itemElement.data(ITEM_DELETING_DATA_KEY, false);
      }).done(function (cancel) {
        shouldDelete && !cancel ? deferred.resolve() : deferred.reject();
      }).fail(deferred.reject);
    }.bind(this));
    return deferred.promise();
  },
  _deleteItemFromDS: function _deleteItemFromDS($item) {
    var dataController = this._dataController;
    var deferred = new _deferred.Deferred();
    var disabledState = this.option('disabled');
    var dataStore = dataController.store();
    if (!dataStore) {
      return new _deferred.Deferred().resolve().promise();
    }
    if (!dataStore.remove) {
      throw _ui.default.Error('E1011');
    }
    this.option('disabled', true);
    dataStore.remove(dataController.keyOf(this._getItemData($item))).done(function (key) {
      if (key !== undefined) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).fail(function () {
      deferred.reject();
    });
    deferred.always(function () {
      this.option('disabled', disabledState);
    }.bind(this));
    return deferred;
  },
  _tryRefreshLastPage: function _tryRefreshLastPage() {
    var deferred = new _deferred.Deferred();
    if (this._isLastPage() || this.option('grouped')) {
      deferred.resolve();
    } else {
      this._refreshLastPage().done(function () {
        deferred.resolve();
      });
    }
    return deferred.promise();
  },
  _refreshLastPage: function _refreshLastPage() {
    this._expectLastItemLoading();
    return this._dataController.load();
  },
  _updateSelectionAfterDelete: function _updateSelectionAfterDelete(index) {
    var key = this._getKeyByIndex(index);
    this._selection.deselect([key]);
  },
  _updateIndicesAfterIndex: function _updateIndicesAfterIndex(index) {
    var itemElements = this._itemElements();
    for (var i = index + 1; i < itemElements.length; i++) {
      (0, _renderer.default)(itemElements[i]).data(this._itemIndexKey(), i - 1);
    }
  },
  _simulateOptionChange: function _simulateOptionChange(optionName) {
    var optionValue = this.option(optionName);
    if (optionValue instanceof _data_source.DataSource) {
      return;
    }
    this._optionChangedAction({
      name: optionName,
      fullName: optionName,
      value: optionValue
    });
  },
  /**
  * @name CollectionWidget.isItemSelected
  * @publicName isItemSelected(itemElement)
  * @param1 itemElement:Element
  * @return boolean
  * @hidden
  */
  isItemSelected: function isItemSelected(itemElement) {
    return this._isItemSelected(this._editStrategy.getNormalizedIndex(itemElement));
  },
  /**
  * @name CollectionWidget.selectItem
  * @publicName selectItem(itemElement)
  * @param1 itemElement:Element
  * @hidden
  */
  selectItem: function selectItem(itemElement) {
    if (this.option('selectionMode') === 'none') return;
    var itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
    if (!indexExists(itemIndex)) {
      return;
    }
    var key = this._getKeyByIndex(itemIndex);
    if (this._selection.isItemSelected(key)) {
      return;
    }
    if (this.option('selectionMode') === 'single') {
      return this._selection.setSelection([key]);
    } else {
      var selectedItemKeys = this.option('selectedItemKeys') || [];
      return this._selection.setSelection([].concat(_toConsumableArray(selectedItemKeys), [key]), [key]);
    }
  },
  /**
  * @name CollectionWidget.unselectItem
  * @publicName unselectItem(itemElement)
  * @param1 itemElement:Element
  * @hidden
  */
  unselectItem: function unselectItem(itemElement) {
    var itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
    if (!indexExists(itemIndex)) {
      return;
    }
    var selectedItemKeys = this._selection.getSelectedItemKeys();
    if (this.option('selectionRequired') && selectedItemKeys.length <= 1) {
      return;
    }
    var key = this._getKeyByIndex(itemIndex);
    if (!this._selection.isItemSelected(key, {
      checkPending: true
    })) {
      return;
    }
    this._selection.deselect([key]);
  },
  _deleteItemElementByIndex: function _deleteItemElementByIndex(index) {
    this._updateSelectionAfterDelete(index);
    this._updateIndicesAfterIndex(index);
    this._editStrategy.deleteItemAtIndex(index);
  },
  _afterItemElementDeleted: function _afterItemElementDeleted($item, deletedActionArgs) {
    var changingOption = this._dataController.getDataSource() ? 'dataSource' : 'items';
    this._simulateOptionChange(changingOption);
    this._itemEventHandler($item, 'onItemDeleted', deletedActionArgs, {
      beforeExecute: function beforeExecute() {
        $item.remove();
      },
      excludeValidators: ['disabled', 'readOnly']
    });
    this._renderEmptyMessage();
  },
  /**
  * @name CollectionWidget.deleteItem
  * @publicName deleteItem(itemElement)
  * @param1 itemElement:Element
  * @return Promise<void>
  * @hidden
  */
  deleteItem: function deleteItem(itemElement) {
    var that = this;
    var deferred = new _deferred.Deferred();
    var $item = this._editStrategy.getItemElement(itemElement);
    var index = this._editStrategy.getNormalizedIndex(itemElement);
    var itemResponseWaitClass = this._itemResponseWaitClass();
    if (indexExists(index)) {
      this._waitDeletingPrepare($item).done(function () {
        $item.addClass(itemResponseWaitClass);
        var deletedActionArgs = that._extendActionArgs($item);
        that._deleteItemFromDS($item).done(function () {
          that._deleteItemElementByIndex(index);
          that._afterItemElementDeleted($item, deletedActionArgs);
          that._tryRefreshLastPage().done(function () {
            deferred.resolveWith(that);
          });
        }).fail(function () {
          $item.removeClass(itemResponseWaitClass);
          deferred.rejectWith(that);
        });
      }).fail(function () {
        deferred.rejectWith(that);
      });
    } else {
      deferred.rejectWith(that);
    }
    return deferred.promise();
  },
  /**
  * @name CollectionWidget.reorderItem
  * @publicName reorderItem(itemElement, toItemElement)
  * @param1 itemElement:Element
  * @param2 toItemElement:Element
  * @return Promise<void>
  * @hidden
  */
  reorderItem: function reorderItem(itemElement, toItemElement) {
    var deferred = new _deferred.Deferred();
    var that = this;
    var strategy = this._editStrategy;
    var $movingItem = strategy.getItemElement(itemElement);
    var $destinationItem = strategy.getItemElement(toItemElement);
    var movingIndex = strategy.getNormalizedIndex(itemElement);
    var destinationIndex = strategy.getNormalizedIndex(toItemElement);
    var changingOption = this._dataController.getDataSource() ? 'dataSource' : 'items';
    var canMoveItems = indexExists(movingIndex) && indexExists(destinationIndex) && movingIndex !== destinationIndex;
    if (canMoveItems) {
      deferred.resolveWith(this);
    } else {
      deferred.rejectWith(this);
    }
    return deferred.promise().done(function () {
      $destinationItem[strategy.itemPlacementFunc(movingIndex, destinationIndex)]($movingItem);
      strategy.moveItemAtIndexToIndex(movingIndex, destinationIndex);
      this._updateIndicesAfterIndex(movingIndex);
      that.option('selectedItems', that._getItemsByKeys(that._selection.getSelectedItemKeys(), that._selection.getSelectedItems()));
      if (changingOption === 'items') {
        that._simulateOptionChange(changingOption);
      }
      that._itemEventHandler($movingItem, 'onItemReordered', {
        fromIndex: strategy.getIndex(movingIndex),
        toIndex: strategy.getIndex(destinationIndex)
      }, {
        excludeValidators: ['disabled', 'readOnly']
      });
    });
  }
});
var _default = CollectionWidget;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
