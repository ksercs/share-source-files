/**
* DevExtreme (cjs/__internal/ui/collection/m_collection_widget.edit.strategy.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _class = _interopRequireDefault(require("../../../core/class"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditStrategy extends _class.default.inherit({}) {
  constructor(collectionWidget) {
    super();
    this._collectionWidget = collectionWidget;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIndexByItemData(value) {
    return _class.default.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItemDataByIndex(index) {
    _class.default.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getKeysByItems(items) {
    _class.default.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItemsByKeys(keys, items) {
    _class.default.abstract();
  }
  itemsGetter() {
    _class.default.abstract();
  }
  getKeyByIndex(index) {
    const resultIndex = this._denormalizeItemIndex(index);
    return this.getKeysByItems([this.getItemDataByIndex(resultIndex)])[0];
  }
  _equalKeys(key1, key2) {
    if (this._collectionWidget._isKeySpecified()) {
      return (0, _common.equalByValue)(key1, key2);
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
    return _class.default.abstract();
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
      return (0, _renderer.default)(value);
    }
    const normalizedItemIndex = this._normalizeItemIndex(this.getIndexByItemData(value));
    return this._getItemByNormalizedIndex(normalizedItemIndex);
  }
  _isNode(el) {
    return _dom_adapter.default.isNode(el && (0, _type.isRenderer)(el) ? el.get(0) : el);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteItemAtIndex(index) {
    _class.default.abstract();
  }
  itemPlacementFunc(movingIndex, destinationIndex) {
    return this._itemsFromSameParent(movingIndex, destinationIndex) && movingIndex < destinationIndex ? 'after' : 'before';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    _class.default.abstract();
  }
  // eslint-disable-next-line class-methods-use-this
  _isNormalizedItemIndex(index) {
    return typeof index === 'number' && Math.round(index) === index;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  _isItemIndex(index) {
    return _class.default.abstract();
  }
  _getNormalizedItemIndex(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value) {
    return _class.default.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _normalizeItemIndex(index) {
    return _class.default.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  _denormalizeItemIndex(index) {
    return _class.default.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getItemByNormalizedIndex(value) {
    return _class.default.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _itemsFromSameParent(movingIndex, destinationIndex) {
    return _class.default.abstract();
  }
}
var _default = exports.default = EditStrategy;
