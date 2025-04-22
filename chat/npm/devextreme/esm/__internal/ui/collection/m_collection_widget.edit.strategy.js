/**
* DevExtreme (esm/__internal/ui/collection/m_collection_widget.edit.strategy.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Class from '../../../core/class';
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
import { equalByValue } from '../../../core/utils/common';
import { isRenderer } from '../../../core/utils/type';
class EditStrategy extends Class.inherit({}) {
  constructor(collectionWidget) {
    super();
    this._collectionWidget = collectionWidget;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIndexByItemData(value) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItemDataByIndex(index) {
    Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getKeysByItems(items) {
    Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItemsByKeys(keys, items) {
    Class.abstract();
  }
  itemsGetter() {
    Class.abstract();
  }
  getKeyByIndex(index) {
    const resultIndex = this._denormalizeItemIndex(index);
    return this.getKeysByItems([this.getItemDataByIndex(resultIndex)])[0];
  }
  _equalKeys(key1, key2) {
    if (this._collectionWidget._isKeySpecified()) {
      return equalByValue(key1, key2);
    }
    return key1 === key2;
  }
  beginCache() {
    this._cache = {};
  }
  endCache() {
    this._cache = null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIndexByKey(key) {
    return Class.abstract();
  }
  getNormalizedIndex(value) {
    if (this._isNormalizedItemIndex(value)) {
      return value;
    }
    if (this._isItemIndex(value)) {
      return this._normalizeItemIndex(value);
    }
    if (this._isNode(value)) {
      return this._getNormalizedItemIndex(value);
    }
    return this._normalizeItemIndex(this.getIndexByItemData(value));
  }
  getIndex(value) {
    if (this._isNormalizedItemIndex(value)) {
      return this._denormalizeItemIndex(value);
    }
    if (this._isItemIndex(value)) {
      return value;
    }
    if (this._isNode(value)) {
      return this._denormalizeItemIndex(this._getNormalizedItemIndex(value));
    }
    return this.getIndexByItemData(value);
  }
  getItemElement(value) {
    if (this._isNormalizedItemIndex(value)) {
      return this._getItemByNormalizedIndex(value);
    }
    if (this._isItemIndex(value)) {
      return this._getItemByNormalizedIndex(this._normalizeItemIndex(value));
    }
    if (this._isNode(value)) {
      // @ts-expect-error ts-error
      return $(value);
    }
    const normalizedItemIndex = this._normalizeItemIndex(this.getIndexByItemData(value));
    return this._getItemByNormalizedIndex(normalizedItemIndex);
  }
  _isNode(el) {
    return domAdapter.isNode(el && isRenderer(el) ? el.get(0) : el);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteItemAtIndex(index) {
    Class.abstract();
  }
  itemPlacementFunc(movingIndex, destinationIndex) {
    return this._itemsFromSameParent(movingIndex, destinationIndex) && movingIndex < destinationIndex ? 'after' : 'before';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    Class.abstract();
  }
  // eslint-disable-next-line class-methods-use-this
  _isNormalizedItemIndex(index) {
    return typeof index === 'number' && Math.round(index) === index;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  _isItemIndex(index) {
    return Class.abstract();
  }
  _getNormalizedItemIndex(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _normalizeItemIndex(index) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  _denormalizeItemIndex(index) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getItemByNormalizedIndex(value) {
    return Class.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _itemsFromSameParent(movingIndex, destinationIndex) {
    return Class.abstract();
  }
}
export default EditStrategy;
