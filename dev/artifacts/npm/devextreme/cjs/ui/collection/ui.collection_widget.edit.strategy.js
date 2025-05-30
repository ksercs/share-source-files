/**
* DevExtreme (cjs/ui/collection/ui.collection_widget.edit.strategy.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _class = _interopRequireDefault(require("../../core/class"));
var _common = require("../../core/utils/common");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _type = require("../../core/utils/type");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var abstract = _class.default.abstract;
var EditStrategy = _class.default.inherit({
  ctor: function ctor(collectionWidget) {
    this._collectionWidget = collectionWidget;
  },
  getIndexByItemData: abstract,
  getItemDataByIndex: abstract,
  getKeysByItems: abstract,
  getItemsByKeys: abstract,
  itemsGetter: abstract,
  getKeyByIndex: function getKeyByIndex(index) {
    var resultIndex = this._denormalizeItemIndex(index);
    return this.getKeysByItems([this.getItemDataByIndex(resultIndex)])[0];
  },
  _equalKeys: function _equalKeys(key1, key2) {
    if (this._collectionWidget._isKeySpecified()) {
      return (0, _common.equalByValue)(key1, key2);
    } else {
      return key1 === key2;
    }
  },
  beginCache: function beginCache() {
    this._cache = {};
  },
  endCache: function endCache() {
    this._cache = null;
  },
  getIndexByKey: abstract,
  getNormalizedIndex: function getNormalizedIndex(value) {
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
  },
  getIndex: function getIndex(value) {
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
  },
  getItemElement: function getItemElement(value) {
    if (this._isNormalizedItemIndex(value)) {
      return this._getItemByNormalizedIndex(value);
    }
    if (this._isItemIndex(value)) {
      return this._getItemByNormalizedIndex(this._normalizeItemIndex(value));
    }
    if (this._isNode(value)) {
      return (0, _renderer.default)(value);
    }
    var normalizedItemIndex = this._normalizeItemIndex(this.getIndexByItemData(value));
    return this._getItemByNormalizedIndex(normalizedItemIndex);
  },
  _isNode: function _isNode(el) {
    return _dom_adapter.default.isNode(el && (0, _type.isRenderer)(el) ? el.get(0) : el);
  },
  deleteItemAtIndex: abstract,
  itemPlacementFunc: function itemPlacementFunc(movingIndex, destinationIndex) {
    return this._itemsFromSameParent(movingIndex, destinationIndex) && movingIndex < destinationIndex ? 'after' : 'before';
  },
  moveItemAtIndexToIndex: abstract,
  _isNormalizedItemIndex: function _isNormalizedItemIndex(index) {
    return typeof index === 'number' && Math.round(index) === index;
  },
  _isItemIndex: abstract,
  _getNormalizedItemIndex: abstract,
  _normalizeItemIndex: abstract,
  _denormalizeItemIndex: abstract,
  _getItemByNormalizedIndex: abstract,
  _itemsFromSameParent: abstract
});
var _default = EditStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
