import _extends from "@babel/runtime/helpers/esm/extends";
import eventsEngine from '../../../common/core/events/core/events_engine';
import { DataSource } from '../../../common/data/data_source/data_source';
import { normalizeLoadResult } from '../../../common/data/data_source/utils';
import $ from '../../../core/renderer';
import { noop } from '../../../core/utils/common';
import { compileGetter } from '../../../core/utils/data';
import { Deferred,
// @ts-expect-error ts-error
fromPromise, when } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { isDefined } from '../../../core/utils/type';
import errors from '../../../ui/widget/ui.errors';
import BaseCollectionWidget from '../../ui/collection/collection_widget.base';
import PlainEditStrategy from '../../ui/collection/m_collection_widget.edit.strategy.plain';
import Selection from '../../ui/selection/m_selection';
const ITEM_DELETING_DATA_KEY = 'dxItemDeleting';
const SELECTED_ITEM_CLASS = 'dx-item-selected';
export const NOT_EXISTING_INDEX = -1;
const indexExists = index => index !== NOT_EXISTING_INDEX;
class CollectionWidget extends BaseCollectionWidget {
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      selectedItem: true
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      selectionMode: 'none',
      selectionRequired: false,
      selectByClick: true,
      selectedItems: [],
      selectedItemKeys: [],
      maxFilterLengthInRequest: 1500,
      keyExpr: null,
      selectedIndex: NOT_EXISTING_INDEX,
      focusOnSelectedItem: true,
      selectedItem: null,
      onSelectionChanging: null,
      onSelectionChanged: null,
      onItemReordered: null,
      onItemDeleting: null,
      onItemDeleted: null
    });
  }
  ctor(element, options) {
    this._userOptions = options || {};
    super.ctor(element, options);
  }
  _init() {
    this._initEditStrategy();
    super._init();
    this._initKeyGetter();
    this._initActions();
    this._initSelectionModule();
  }
  _initKeyGetter() {
    // @ts-expect-error ts-error
    this._keyGetter = compileGetter(this.option('keyExpr'));
  }
  _selectedItemClass() {
    return SELECTED_ITEM_CLASS;
  }
  // eslint-disable-next-line class-methods-use-this
  _getActionsList() {
    return ['onSelectionChanging', 'onSelectionChanged'];
  }
  _initActions() {
    this._actions = {};
    const actions = this._getActionsList();
    actions.forEach(action => {
      this._actions[action] = this._createActionByOption(action, {
        excludeValidators: ['disabled', 'readOnly']
      }) ?? noop;
    });
  }
  _getKeysByItems(selectedItems) {
    return this._editStrategy.getKeysByItems(selectedItems);
  }
  _getItemsByKeys(selectedItemKeys, selectedItems) {
    return this._editStrategy.getItemsByKeys(selectedItemKeys, selectedItems);
  }
  _getKeyByIndex(index) {
    return this._editStrategy.getKeyByIndex(index);
  }
  _getIndexByKey(key) {
    return this._editStrategy.getIndexByKey(key);
  }
  _getIndexByItemData(itemData) {
    return this._editStrategy.getIndexByItemData(itemData);
  }
  _isKeySpecified() {
    // @ts-expect-error ts-error
    return !!this._dataController.key();
  }
  _getCombinedFilter() {
    // @ts-expect-error ts-error
    return this._dataController.filter();
  }
  key() {
    const {
      keyExpr
    } = this.option();
    if (keyExpr) return keyExpr;
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._dataController.key();
  }
  keyOf(item) {
    let key = item;
    if (this.option('keyExpr')) {
      // @ts-expect-error ts-error
      key = this._keyGetter(item);
      // @ts-expect-error ts-error
    } else if (this._dataController.store()) {
      // @ts-expect-error ts-error
      key = this._dataController.keyOf(item);
    }
    return key;
  }
  // eslint-disable-next-line class-methods-use-this
  _nullValueSelectionSupported() {
    return false;
  }
  _initSelectionModule() {
    const that = this;
    const {
      itemsGetter
    } = this._editStrategy;
    this._selection = new Selection({
      allowNullValue: this._nullValueSelectionSupported(),
      mode: this.option('selectionMode'),
      maxFilterLengthInRequest: this.option('maxFilterLengthInRequest'),
      equalByReference: !this._isKeySpecified(),
      onSelectionChanging: args => {
        var _this$_actions$onSele, _this$_actions;
        const isSelectionChanged = args.addedItemKeys.length || args.removedItemKeys.length;
        if (!this._rendered || !isSelectionChanged) {
          return;
        }
        const selectionChangingArgs = {
          removedItems: args.removedItems,
          addedItems: args.addedItems,
          cancel: false
        };
        (_this$_actions$onSele = (_this$_actions = this._actions).onSelectionChanging) === null || _this$_actions$onSele === void 0 || _this$_actions$onSele.call(_this$_actions, selectionChangingArgs);
        args.cancel = selectionChangingArgs.cancel;
      },
      onSelectionChanged: args => {
        if (args.addedItemKeys.length || args.removedItemKeys.length) {
          this.option('selectedItems', this._getItemsByKeys(args.selectedItemKeys, args.selectedItems));
          this._updateSelectedItems(args);
        }
      },
      filter: this._getCombinedFilter.bind(this),
      totalCount: () => {
        const {
          items
        } = this.option();
        // @ts-expect-error ts-error
        const totalCount = this._dataController.totalCount();
        return totalCount >= 0 ? totalCount
        // @ts-expect-error ts-error
        : this._getItemsCount(items);
      },
      key: this.key.bind(this),
      keyOf: this.keyOf.bind(this),
      load(options) {
        var _dataController$loadO;
        // @ts-expect-error ts-error
        const dataController = that._dataController;
        options.customQueryParams = (_dataController$loadO = dataController.loadOptions()) === null || _dataController$loadO === void 0 ? void 0 : _dataController$loadO.customQueryParams;
        options.userData = dataController.userData();
        if (dataController.store()) {
          return dataController.loadFromStore(options).done(loadResult => {
            if (that._disposed) {
              return;
            }
            // @ts-expect-error
            const items = normalizeLoadResult(loadResult).data;
            dataController.applyMapFunction(items);
          });
        }
        return Deferred().resolve(this.plainItems());
      },
      // @ts-expect-error ts-error
      dataFields: () => this._dataController.select(),
      plainItems: itemsGetter.bind(this._editStrategy)
    });
  }
  _getItemsCount(items) {
    // @ts-expect-error ts-error
    // eslint-disable-next-line no-return-assign
    return items.reduce((itemsCount, item) => itemsCount += item.items
    // @ts-expect-error ts-error
    ? this._getItemsCount(item.items) : 1, 0);
  }
  _initEditStrategy() {
    this._editStrategy = new PlainEditStrategy(this);
  }
  _getSelectedItemIndices(keys) {
    const indices = [];
    keys = keys || this._selection.getSelectedItemKeys();
    this._editStrategy.beginCache();
    each(keys, (_, key) => {
      const selectedIndex = this._getIndexByKey(key);
      if (indexExists(selectedIndex)) {
        indices.push(selectedIndex);
      }
    });
    this._editStrategy.endCache();
    return indices;
  }
  _initMarkup() {
    this._rendering = true;
    // @ts-expect-error ts-error
    if (!this._dataController.isLoading()) {
      this._syncSelectionOptions().done(() => this._normalizeSelectedItems());
    }
    super._initMarkup();
  }
  _render() {
    super._render();
    this._rendering = false;
  }
  _fireContentReadyAction() {
    this._rendering = false;
    this._rendered = true;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    super._fireContentReadyAction();
  }
  _syncSelectionOptions(byOption) {
    byOption = byOption ?? this._chooseSelectOption();
    let selectedItem;
    let selectedIndex;
    let selectedItemKeys;
    let selectedItems;
    // eslint-disable-next-line default-case
    switch (byOption) {
      case 'selectedIndex':
        selectedItem = this._editStrategy.getItemDataByIndex(this.option('selectedIndex'));
        if (isDefined(selectedItem)) {
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
        if (isDefined(selectedItem)) {
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
          const selectedItemIndex = this._getIndexByKey(selectedItemKeys[0]);
          if (!indexExists(selectedItemIndex)) {
            return this._syncSelectionOptions('selectedIndex');
          }
        }
        return this._selection.setSelection(selectedItemKeys);
    }
    return Deferred().resolve().promise();
  }
  _chooseSelectOption() {
    let optionName = 'selectedIndex';
    const isOptionDefined = name => {
      const optionValue = this.option(name);
      // @ts-expect-error ts-error
      const length = isDefined(optionValue) && optionValue.length;
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return length || name in this._userOptions;
    };
    if (isOptionDefined('selectedItems')) {
      optionName = 'selectedItems';
    } else if (isOptionDefined('selectedItem')) {
      optionName = 'selectedItem';
    } else if (isOptionDefined('selectedItemKeys')) {
      optionName = 'selectedItemKeys';
    }
    return optionName;
  }
  _compareKeys(oldKeys, newKeys) {
    if (oldKeys.length !== newKeys.length) {
      return false;
    }
    for (let i = 0; i < newKeys.length; i++) {
      if (oldKeys[i] !== newKeys[i]) {
        return false;
      }
    }
    return true;
  }
  _normalizeSelectedItems() {
    const {
      selectionMode,
      selectedItems,
      items
    } = this.option();
    if (selectionMode === 'none') {
      this._setOptionWithoutOptionChange('selectedItems', []);
      this._syncSelectionOptions('selectedItems');
    } else if (selectionMode === 'single') {
      const newSelection = selectedItems ?? [];
      if (newSelection.length > 1 || !newSelection.length && this.option('selectionRequired') && items !== null && items !== void 0 && items.length) {
        var _normalizedSelection;
        const currentSelection = this._selection.getSelectedItems();
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        let normalizedSelection = newSelection[0] === undefined ? currentSelection[0] : newSelection[0];
        if (normalizedSelection === undefined) {
          // eslint-disable-next-line prefer-destructuring
          normalizedSelection = this._editStrategy.itemsGetter()[0];
        }
        if (this.option('grouped') && (_normalizedSelection = normalizedSelection) !== null && _normalizedSelection !== void 0 && _normalizedSelection.items) {
          normalizedSelection.items = [normalizedSelection.items[0]];
        }
        this._selection.setSelection(this._getKeysByItems([normalizedSelection]));
        this._setOptionWithoutOptionChange('selectedItems', [normalizedSelection]);
        return this._syncSelectionOptions('selectedItems');
      }
      this._selection.setSelection(this._getKeysByItems(newSelection));
    } else {
      const newKeys = this._getKeysByItems(this.option('selectedItems'));
      const oldKeys = this._selection.getSelectedItemKeys();
      if (!this._compareKeys(oldKeys, newKeys)) {
        this._selection.setSelection(newKeys);
      }
    }
    return Deferred().resolve().promise();
  }
  _itemClickHandler(e, args, config) {
    let itemSelectPromise = Deferred().resolve();
    this._createAction(e => {
      itemSelectPromise = this._itemSelectHandler(e.event) ?? itemSelectPromise;
    }, {
      validatingTargetName: 'itemElement'
    })({
      itemElement: $(e.currentTarget),
      event: e
    });
    itemSelectPromise.always(() => {
      super._itemClickHandler(e, args, config);
    });
  }
  _itemSelectHandler(e, shouldIgnoreSelectByClick) {
    if (!shouldIgnoreSelectByClick && !this.option('selectByClick')) {
      return;
    }
    const $itemElement = e.currentTarget;
    if (this.isItemSelected($itemElement)) {
      this.unselectItem(e.currentTarget);
    } else {
      const itemSelectPromise = this.selectItem(e.currentTarget);
      // @ts-expect-error ts-error
      // eslint-disable-next-line consistent-return
      return itemSelectPromise === null || itemSelectPromise === void 0 ? void 0 : itemSelectPromise.promise();
    }
  }
  _selectedItemElement(index) {
    return this._itemElements().eq(index);
  }
  _postprocessRenderItem(args) {
    const {
      selectionMode
    } = this.option();
    if (selectionMode !== 'none') {
      const $itemElement = $(args.itemElement);
      // @ts-expect-error ts-error
      const normalizedItemIndex = this._editStrategy.getNormalizedIndex($itemElement);
      const isItemSelected = this._isItemSelected(normalizedItemIndex);
      this._processSelectableItem($itemElement, isItemSelected);
    }
  }
  _processSelectableItem($itemElement, isSelected) {
    $itemElement.toggleClass(this._selectedItemClass(), isSelected);
    this._setAriaSelectionAttribute($itemElement, String(isSelected));
  }
  _updateSelectedItems(args) {
    const {
      addedItemKeys,
      removedItemKeys
    } = args;
    if (this._rendered && (addedItemKeys.length || removedItemKeys.length)) {
      if (!this._rendering) {
        const addedSelection = [];
        const removedSelection = [];
        this._editStrategy.beginCache();
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < addedItemKeys.length; i += 1) {
          const normalizedIndex = this._getIndexByKey(addedItemKeys[i]);
          // @ts-expect-error ts-error
          addedSelection.push(normalizedIndex);
          this._addSelection(normalizedIndex);
        }
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < removedItemKeys.length; i += 1) {
          const normalizedIndex = this._getIndexByKey(removedItemKeys[i]);
          // @ts-expect-error ts-error
          removedSelection.push(normalizedIndex);
          this._removeSelection(normalizedIndex);
        }
        this._editStrategy.endCache();
        this._updateSelection(addedSelection, removedSelection);
      }
      this._actions.onSelectionChanged({
        addedItems: args.addedItems,
        removedItems: args.removedItems
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  _updateSelection(addedSelection, removedSelection) {}
  _setAriaSelectionAttribute($target, value) {
    this.setAria('selected', value, $target);
  }
  _getFocusedElementIndex() {
    const {
      focusOnSelectedItem
    } = this.option();
    return focusOnSelectedItem ? this._getFlatIndex() : super._getFocusedElementIndex();
  }
  _getFlatIndex() {
    const {
      selectedIndex = NOT_EXISTING_INDEX
    } = this.option();
    return selectedIndex;
  }
  _removeSelection(normalizedIndex) {
    const $itemElement = this._editStrategy.getItemElement(normalizedIndex);
    if (indexExists(normalizedIndex)) {
      this._processSelectableItem($itemElement, false);
      // @ts-expect-error ts-error
      eventsEngine.triggerHandler($itemElement, 'stateChanged', false);
    }
  }
  _addSelection(normalizedIndex) {
    const $itemElement = this._editStrategy.getItemElement(normalizedIndex);
    if (indexExists(normalizedIndex)) {
      this._processSelectableItem($itemElement, true);
      // @ts-expect-error ts-error
      eventsEngine.triggerHandler($itemElement, 'stateChanged', true);
    }
  }
  _isItemSelected(index) {
    const key = this._getKeyByIndex(index);
    return this._selection.isItemSelected(key, {
      checkPending: true
    });
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'selectionMode':
        this._invalidate();
        break;
      case 'dataSource':
        if (!args.value || Array.isArray(args.value) && !args.value.length) {
          this.option('selectedItemKeys', []);
        }
        super._optionChanged(args);
        break;
      case 'selectedIndex':
      case 'selectedItem':
      case 'selectedItems':
      case 'selectedItemKeys':
        this._syncSelectionOptions(args.name).done(() => this._normalizeSelectedItems());
        break;
      case 'keyExpr':
        this._initKeyGetter();
        break;
      case 'selectionRequired':
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._normalizeSelectedItems();
        break;
      case 'onSelectionChanging':
      case 'onSelectionChanged':
        this._initActions();
        break;
      case 'selectByClick':
      case 'onItemDeleting':
      case 'onItemDeleted':
      case 'onItemReordered':
      case 'maxFilterLengthInRequest':
        break;
      case 'focusOnSelectedItem':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clearSelectedItems() {
    this._setOptionWithoutOptionChange('selectedItems', []);
    this._syncSelectionOptions('selectedItems');
  }
  _waitDeletingPrepare($itemElement) {
    if ($itemElement.data(ITEM_DELETING_DATA_KEY)) {
      return Deferred().resolve().promise();
    }
    $itemElement.data(ITEM_DELETING_DATA_KEY, true);
    const deferred = Deferred();
    const deletingActionArgs = {
      cancel: false
    };
    const deletePromise = this._itemEventHandler($itemElement, 'onItemDeleting', deletingActionArgs, {
      excludeValidators: ['disabled', 'readOnly']
    });
    // eslint-disable-next-line func-names
    when(deletePromise).always(function (value) {
      // @ts-expect-error ts-error
      const deletePromiseExists = !deletePromise;
      // @ts-expect-error ts-error
      const deletePromiseResolved = !deletePromiseExists && deletePromise.state() === 'resolved';
      const argumentsSpecified = !!arguments.length;
      const shouldDelete = deletePromiseExists || deletePromiseResolved && !argumentsSpecified || deletePromiseResolved && value;
      when(fromPromise(deletingActionArgs.cancel)).always(() => {
        $itemElement.data(ITEM_DELETING_DATA_KEY, false);
      }).done(cancel => {
        if (shouldDelete && !cancel) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .fail(deferred.reject);
    });
    return deferred.promise();
  }
  _deleteItemFromDS($item) {
    // @ts-expect-error ts-error
    const dataController = this._dataController;
    const deferred = Deferred();
    const disabledState = this.option('disabled');
    const dataStore = dataController.store();
    if (!dataStore) {
      return Deferred().resolve().promise();
    }
    if (!dataStore.remove) {
      throw errors.Error('E1011');
    }
    this.option('disabled', true);
    dataStore.remove(dataController.keyOf(this._getItemData($item))).done(key => {
      if (key !== undefined) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).fail(() => {
      deferred.reject();
    });
    deferred.always(() => {
      this.option('disabled', disabledState);
    });
    return deferred;
  }
  _tryRefreshLastPage() {
    const deferred = Deferred();
    // @ts-expect-error ts-error
    if (this._isLastPage() || this.option('grouped')) {
      deferred.resolve();
    } else {
      this._refreshLastPage().done(() => {
        deferred.resolve();
      });
    }
    return deferred.promise();
  }
  _refreshLastPage() {
    this._expectLastItemLoading();
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._dataController.load();
  }
  _updateSelectionAfterDelete(index) {
    const key = this._getKeyByIndex(index);
    this._selection.deselect([key]);
  }
  _updateIndicesAfterIndex(index) {
    const itemElements = this._itemElements();
    for (let i = index + 1; i < itemElements.length; i += 1) {
      $(itemElements[i]).data(this._itemIndexKey(), i - 1);
    }
  }
  _simulateOptionChange(optionName) {
    var _this$_optionChangedA;
    const optionValue = this.option(optionName);
    if (optionValue instanceof DataSource) {
      return;
    }
    (_this$_optionChangedA = this._optionChangedAction) === null || _this$_optionChangedA === void 0 || _this$_optionChangedA.call(this, {
      name: optionName,
      fullName: optionName,
      value: optionValue
    });
  }
  isItemSelected(itemElement) {
    return this._isItemSelected(this._editStrategy.getNormalizedIndex(itemElement));
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  selectItem(itemElement) {
    const {
      selectionMode
    } = this.option();
    if (selectionMode === 'none') return Deferred().resolve();
    const itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
    if (!indexExists(itemIndex)) {
      return Deferred().resolve();
    }
    const key = this._getKeyByIndex(itemIndex);
    if (this._selection.isItemSelected(key)) {
      return Deferred().resolve();
    }
    if (selectionMode === 'single') {
      return this._selection.setSelection([key]);
    }
    const {
      selectedItemKeys
    } = this.option();
    return this._selection.setSelection([...(selectedItemKeys ?? []), key], [key]);
  }
  unselectItem(itemElement) {
    const itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
    if (!indexExists(itemIndex)) {
      return;
    }
    const selectedItemKeys = this._selection.getSelectedItemKeys();
    if (this.option('selectionRequired') && selectedItemKeys.length <= 1) {
      return;
    }
    const key = this._getKeyByIndex(itemIndex);
    if (!this._selection.isItemSelected(key, {
      checkPending: true
    })) {
      return;
    }
    this._selection.deselect([key]);
  }
  _deleteItemElementByIndex(index) {
    this._updateSelectionAfterDelete(index);
    this._updateIndicesAfterIndex(index);
    this._editStrategy.deleteItemAtIndex(index);
  }
  _afterItemElementDeleted($item, deletedActionArgs) {
    // @ts-expect-error ts-error
    const changingOption = this._dataController.getDataSource() ? 'dataSource' : 'items';
    this._simulateOptionChange(changingOption);
    this._itemEventHandler($item, 'onItemDeleted', deletedActionArgs, {
      beforeExecute() {
        $item.remove();
      },
      excludeValidators: ['disabled', 'readOnly']
    });
    this._renderEmptyMessage();
  }
  deleteItem(itemElement) {
    const deferred = Deferred();
    const $item = this._editStrategy.getItemElement(itemElement);
    const index = this._editStrategy.getNormalizedIndex(itemElement);
    const itemResponseWaitClass = this._itemResponseWaitClass();
    if (indexExists(index)) {
      // @ts-expect-error ts-error
      this._waitDeletingPrepare($item).done(() => {
        $item.addClass(itemResponseWaitClass);
        const deletedActionArgs = this._extendActionArgs($item);
        // @ts-expect-error ts-error
        this._deleteItemFromDS($item).done(() => {
          this._deleteItemElementByIndex(index);
          this._afterItemElementDeleted($item, deletedActionArgs);
          // @ts-expect-error ts-error
          this._tryRefreshLastPage().done(() => {
            // @ts-expect-error ts-error
            deferred.resolveWith(this);
          });
        }).fail(() => {
          $item.removeClass(itemResponseWaitClass);
          // @ts-expect-error ts-error
          deferred.rejectWith(this);
        });
      }).fail(() => {
        // @ts-expect-error ts-error
        deferred.rejectWith(this);
      });
    } else {
      // @ts-expect-error ts-error
      deferred.rejectWith(this);
    }
    return deferred.promise();
  }
  reorderItem(itemElement, toItemElement) {
    const deferred = Deferred();
    const strategy = this._editStrategy;
    const $movingItem = strategy.getItemElement(itemElement);
    const $destinationItem = strategy.getItemElement(toItemElement);
    const movingIndex = strategy.getNormalizedIndex(itemElement);
    const destinationIndex = strategy.getNormalizedIndex(toItemElement);
    // @ts-expect-error ts-error
    const changingOption = this._dataController.getDataSource() ? 'dataSource' : 'items';
    const canMoveItems = indexExists(movingIndex) && indexExists(destinationIndex) && movingIndex !== destinationIndex;
    if (canMoveItems) {
      // @ts-expect-error ts-error
      deferred.resolveWith(this);
    } else {
      // @ts-expect-error ts-error
      deferred.rejectWith(this);
    }
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return deferred.promise().done(() => {
      $destinationItem[strategy.itemPlacementFunc(movingIndex, destinationIndex)]($movingItem);
      strategy.moveItemAtIndexToIndex(movingIndex, destinationIndex);
      this._updateIndicesAfterIndex(movingIndex);
      this.option('selectedItems', this._getItemsByKeys(this._selection.getSelectedItemKeys(), this._selection.getSelectedItems()));
      if (changingOption === 'items') {
        this._simulateOptionChange(changingOption);
      }
      this._itemEventHandler($movingItem, 'onItemReordered', {
        fromIndex: strategy.getIndex(movingIndex),
        toIndex: strategy.getIndex(destinationIndex)
      }, {
        excludeValidators: ['disabled', 'readOnly']
      });
    });
  }
}
export default CollectionWidget;