!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/diagram/diagram.items_option.js"], ["../../core/utils/extend","../../core/component","../../data_helper"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/diagram/diagram.items_option.js", ["../../core/utils/extend", "../../core/component", "../../data_helper"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _extend = $__require("../../core/utils/extend");
  var _component = $__require("../../core/component");
  var _data_helper = _interopRequireDefault($__require("../../data_helper"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
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
          key: key,
          data: data,
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
          key: key,
          data: data,
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
          key: key,
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
      if (_typeof(key) === 'object') {
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
      if (_typeof(storeKey) === 'object') {
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../../core/component","../../data_helper"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../../core/component"), require("../../data_helper"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=diagram.items_option.js.map