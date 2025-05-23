/**
* DevExtreme (cjs/ui/diagram/diagram.items_option.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _extend = require("../../core/utils/extend");
var _component = require("../../core/component");
var _data_helper = _interopRequireDefault(require("../../data_helper"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var ItemsOptionBase = _component.Component.inherit({}).include(_data_helper.default);
var ItemsOption = /*#__PURE__*/function (_ItemsOptionBase) {
  _inheritsLoose(ItemsOption, _ItemsOptionBase);
  function ItemsOption(diagramWidget) {
    var _this;
    _this = _ItemsOptionBase.call(this) || this;
    _this._diagramWidget = diagramWidget;
    _this._resetCache();
    return _this;
  }
  var _proto = ItemsOption.prototype;
  _proto._dataSourceChangedHandler = function _dataSourceChangedHandler(newItems, e) {
    this._resetCache();
    this._items = newItems.map(function (item) {
      return (0, _extend.extend)(true, {}, item);
    });
    this._dataSourceItems = newItems.slice();
    if (e && e.changes) {
      var internalChanges = e.changes.filter(function (change) {
        return change.internalChange;
      });
      var externalChanges = e.changes.filter(function (change) {
        return !change.internalChange;
      });
      if (internalChanges.length) {
        this._reloadContentByChanges(internalChanges, false);
      }
      if (externalChanges.length) {
        this._reloadContentByChanges(externalChanges, true);
      }
    } else {
      this._diagramWidget._onDataSourceChanged();
    }
  };
  _proto._dataSourceLoadingChangedHandler = function _dataSourceLoadingChangedHandler(isLoading) {
    if (isLoading && !this._dataSource.isLoaded()) {
      this._diagramWidget._showLoadingIndicator();
    } else {
      this._diagramWidget._hideLoadingIndicator();
    }
  };
  _proto._prepareData = function _prepareData(dataObj) {
    for (var key in dataObj) {
      if (!Object.prototype.hasOwnProperty.call(dataObj, key)) continue;
      if (dataObj[key] === undefined) {
        dataObj[key] = null;
      }
    }
    return dataObj;
  };
  _proto.insert = function insert(data, callback, errorCallback) {
    var _this2 = this;
    this._resetCache();
    var store = this._getStore();
    store.insert(this._prepareData(data)).done(function (data, key) {
      store.push([{
        type: 'insert',
        key,
        data,
        internalChange: true
      }]);
      if (callback) {
        callback(data);
      }
      _this2._resetCache();
    }).fail(function (error) {
      if (errorCallback) {
        errorCallback(error);
      }
      _this2._resetCache();
    });
  };
  _proto.update = function update(key, data, callback, errorCallback) {
    var store = this._getStore();
    var storeKey = this._getStoreKey(store, key, data);
    store.update(storeKey, this._prepareData(data)).done(function (data, key) {
      store.push([{
        type: 'update',
        key,
        data,
        internalChange: true
      }]);
      if (callback) {
        callback(key, data);
      }
    }).fail(function (error) {
      if (errorCallback) {
        errorCallback(error);
      }
    });
  };
  _proto.remove = function remove(key, data, callback, errorCallback) {
    var _this3 = this;
    this._resetCache();
    var store = this._getStore();
    var storeKey = this._getStoreKey(store, key, data);
    store.remove(storeKey).done(function (key) {
      store.push([{
        type: 'remove',
        key,
        internalChange: true
      }]);
      if (callback) {
        callback(key);
      }
      _this3._resetCache();
    }).fail(function (error) {
      if (errorCallback) {
        errorCallback(error);
      }
      _this3._resetCache();
    });
  };
  _proto.findItem = function findItem(itemKey) {
    if (!this._items) {
      return null;
    }
    return this._getItemByKey(itemKey);
  };
  _proto.getItems = function getItems() {
    return this._items;
  };
  _proto.hasItems = function hasItems() {
    return !!this._items;
  };
  _proto._reloadContentByChanges = function _reloadContentByChanges(changes, isExternalChanges) {
    var _this4 = this;
    changes = changes.map(function (change) {
      return (0, _extend.extend)(change, {
        internalKey: _this4._getInternalKey(change.key)
      });
    });
    this._diagramWidget._reloadContentByChanges(changes, isExternalChanges);
  };
  _proto._getItemByKey = function _getItemByKey(key) {
    this._ensureCache();
    var cache = this._cache;
    var index = this._getIndexByKey(key);
    return cache.items[index];
  };
  _proto._getIndexByKey = function _getIndexByKey(key) {
    this._ensureCache();
    var cache = this._cache;
    if (typeof key === 'object') {
      for (var i = 0, length = cache.keys.length; i < length; i++) {
        if (cache.keys[i] === key) return i;
      }
    } else {
      var keySet = cache.keySet || cache.keys.reduce(function (accumulator, key, index) {
        accumulator[key] = index;
        return accumulator;
      }, {});
      if (!cache.keySet) {
        cache.keySet = keySet;
      }
      return keySet[key];
    }
    return -1;
  };
  _proto._ensureCache = function _ensureCache() {
    var cache = this._cache;
    if (!cache.keys) {
      cache.keys = [];
      cache.items = [];
      this._fillCache(cache, this._items);
    }
  };
  _proto._fillCache = function _fillCache(cache, items) {
    var _this5 = this;
    if (!items || !items.length) return;
    var keyExpr = this._getKeyExpr();
    if (keyExpr) {
      items.forEach(function (item) {
        cache.keys.push(keyExpr(item));
        cache.items.push(item);
      });
    }
    var itemsExpr = this._getItemsExpr();
    if (itemsExpr) {
      items.forEach(function (item) {
        return _this5._fillCache(cache, itemsExpr(item));
      });
    }
    var containerChildrenExpr = this._getContainerChildrenExpr();
    if (containerChildrenExpr) {
      items.forEach(function (item) {
        return _this5._fillCache(cache, containerChildrenExpr(item));
      });
    }
  };
  _proto._getKeyExpr = function _getKeyExpr() {
    throw 'Not Implemented';
  };
  _proto._getItemsExpr = function _getItemsExpr() {};
  _proto._getContainerChildrenExpr = function _getContainerChildrenExpr() {};
  _proto._initDataSource = function _initDataSource() {
    _ItemsOptionBase.prototype._initDataSource.call(this);
    this._dataSource && this._dataSource.paginate(false);
  };
  _proto._dataSourceOptions = function _dataSourceOptions() {
    return {
      paginate: false
    };
  };
  _proto._getStore = function _getStore() {
    return this._dataSource && this._dataSource.store();
  };
  _proto._getStoreKey = function _getStoreKey(store, internalKey, data) {
    var storeKey = store.keyOf(data);
    if (storeKey === data) {
      var keyExpr = this._getKeyExpr();
      this._dataSourceItems.forEach(function (item) {
        if (keyExpr(item) === internalKey) storeKey = item;
      });
    }
    return storeKey;
  };
  _proto._getInternalKey = function _getInternalKey(storeKey) {
    if (typeof storeKey === 'object') {
      var keyExpr = this._getKeyExpr();
      return keyExpr(storeKey);
    }
    return storeKey;
  };
  _proto._resetCache = function _resetCache() {
    this._cache = {};
  };
  return ItemsOption;
}(ItemsOptionBase);
var _default = ItemsOption;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
