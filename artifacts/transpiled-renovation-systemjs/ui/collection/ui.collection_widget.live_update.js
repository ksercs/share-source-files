!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/collection/ui.collection_widget.live_update.js"], ["../../core/renderer","./ui.collection_widget.edit","../../core/utils/extend","../../core/utils/iterator","../../data/array_utils","../../data/utils","../../core/utils/deferred","../../core/utils/array_compare","../../core/dom_adapter","../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/collection/ui.collection_widget.live_update.js", ["../../core/renderer", "./ui.collection_widget.edit", "../../core/utils/extend", "../../core/utils/iterator", "../../data/array_utils", "../../data/utils", "../../core/utils/deferred", "../../core/utils/array_compare", "../../core/dom_adapter", "../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _uiCollection_widget = _interopRequireDefault($__require("./ui.collection_widget.edit"));
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _array_utils = $__require("../../data/array_utils");
  var _utils = $__require("../../data/utils");
  var _deferred = $__require("../../core/utils/deferred");
  var _array_compare = $__require("../../core/utils/array_compare");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _common = $__require("../../core/utils/common");
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var PRIVATE_KEY_FIELD = '__dx_key__';
  var _default = _uiCollection_widget.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        repaintChangesOnly: false
      });
    },
    ctor: function ctor() {
      var _this = this,
          _this$_dataController;
      this.callBase.apply(this, arguments);
      this._customizeStoreLoadOptions = function (e) {
        var dataController = _this._dataController;
        if (dataController.getDataSource() && !_this._dataController.isLoaded()) {
          _this._correctionIndex = 0;
        }
        if (_this._correctionIndex && e.storeLoadOptions) {
          e.storeLoadOptions.skip += _this._correctionIndex;
        }
      }, (_this$_dataController = this._dataController) === null || _this$_dataController === void 0 ? void 0 : _this$_dataController.on('customizeStoreLoadOptions', this._customizeStoreLoadOptions);
    },
    reload: function reload() {
      this._correctionIndex = 0;
    },
    _init: function _init() {
      this.callBase();
      this._refreshItemsCache();
      this._correctionIndex = 0;
    },
    _findItemElementByKey: function _findItemElementByKey(key) {
      var _this2 = this;
      var result = (0, _renderer.default)();
      var keyExpr = this.key();
      this.itemElements().each(function (_, item) {
        var $item = (0, _renderer.default)(item);
        var itemData = _this2._getItemData($item);
        if (keyExpr ? (0, _utils.keysEqual)(keyExpr, _this2.keyOf(itemData), key) : _this2._isItemEquals(itemData, key)) {
          result = $item;
          return false;
        }
      });
      return result;
    },
    _dataSourceChangedHandler: function _dataSourceChangedHandler(newItems, e) {
      if (e !== null && e !== void 0 && e.changes) {
        this._modifyByChanges(e.changes);
      } else {
        this.callBase(newItems, e);
        this._refreshItemsCache();
      }
    },
    _isItemEquals: function _isItemEquals(item1, item2) {
      if (item1 && item1[PRIVATE_KEY_FIELD]) {
        item1 = item1.data;
      }
      try {
        return JSON.stringify(item1) === JSON.stringify(item2);
      } catch (e) {
        return item1 === item2;
      }
    },
    _isItemStrictEquals: function _isItemStrictEquals(item1, item2) {
      return this._isItemEquals(item1, item2);
    },
    _shouldAddNewGroup: function _shouldAddNewGroup(changes, items) {
      var result = false;
      if (this.option('grouped')) {
        if (!changes.length) {
          result = true;
        }
        (0, _iterator.each)(changes, function (i, change) {
          if (change.type === 'insert') {
            result = true;
            (0, _iterator.each)(items, function (_, item) {
              if (change.data.key !== undefined && change.data.key === item.key) {
                result = false;
                return false;
              }
            });
          }
        });
      }
      return result;
    },
    _partialRefresh: function _partialRefresh() {
      var _this3 = this;
      if (this.option('repaintChangesOnly')) {
        var keyOf = function keyOf(data) {
          if (data && data[PRIVATE_KEY_FIELD] !== undefined) {
            return data[PRIVATE_KEY_FIELD];
          }
          return _this3.keyOf(data);
        };
        var result = (0, _array_compare.findChanges)(this._itemsCache, this._editStrategy.itemsGetter(), keyOf, this._isItemStrictEquals.bind(this));
        if (result && this._itemsCache.length && !this._shouldAddNewGroup(result, this._itemsCache)) {
          this._modifyByChanges(result, true);
          this._renderEmptyMessage();
          return true;
        } else {
          this._refreshItemsCache();
        }
      }
      return false;
    },
    _refreshItemsCache: function _refreshItemsCache() {
      if (this.option('repaintChangesOnly')) {
        var items = this._editStrategy.itemsGetter();
        try {
          this._itemsCache = (0, _extend.extend)(true, [], items);
          if (!this.key()) {
            this._itemsCache = this._itemsCache.map(function (itemCache, index) {
              var _ref;
              return _ref = {}, _defineProperty(_ref, PRIVATE_KEY_FIELD, items[index]), _defineProperty(_ref, "data", itemCache), _ref;
            });
          }
        } catch (e) {
          this._itemsCache = (0, _extend.extend)([], items);
        }
      }
    },
    _dispose: function _dispose() {
      this._dataController.off('customizeStoreLoadOptions', this._customizeStoreLoadOptions);
      this.callBase();
    },
    _updateByChange: function _updateByChange(keyInfo, items, change, isPartialRefresh) {
      var _this4 = this;
      if (isPartialRefresh) {
        this._renderItem(change.index, change.data, null, this._findItemElementByKey(change.key));
      } else {
        var changedItem = items[(0, _array_utils.indexByKey)(keyInfo, items, change.key)];
        if (changedItem) {
          (0, _array_utils.update)(keyInfo, items, change.key, change.data).done(function () {
            _this4._renderItem(items.indexOf(changedItem), changedItem, null, _this4._findItemElementByKey(change.key));
          });
        }
      }
    },
    _insertByChange: function _insertByChange(keyInfo, items, change, isPartialRefresh) {
      var _this5 = this;
      (0, _deferred.when)(isPartialRefresh || (0, _array_utils.insert)(keyInfo, items, change.data, change.index)).done(function () {
        var _change$index;
        _this5._beforeItemElementInserted(change);
        var $itemContainer = _this5._getItemContainer(change.data);
        _this5._renderItem((_change$index = change.index) !== null && _change$index !== void 0 ? _change$index : items.length, change.data, $itemContainer);
        _this5._afterItemElementInserted();
        _this5._correctionIndex++;
      });
    },
    _getItemContainer: function _getItemContainer(changeData) {
      return this._itemContainer();
    },
    _updateSelectionAfterRemoveByChange: function _updateSelectionAfterRemoveByChange(removeIndex) {
      var selectedIndex = this.option('selectedIndex');
      if (selectedIndex > removeIndex) {
        this.option('selectedIndex', selectedIndex - 1);
      } else if (selectedIndex === removeIndex && this.option('selectedItems').length === 1) {
        this.option('selectedItems', []);
      } else {
        this._normalizeSelectedItems();
      }
    },
    _beforeItemElementInserted: function _beforeItemElementInserted(change) {
      var selectedIndex = this.option('selectedIndex');
      if (change.index <= selectedIndex) {
        this.option('selectedIndex', selectedIndex + 1);
      }
    },
    _afterItemElementInserted: _common.noop,
    _removeByChange: function _removeByChange(keyInfo, items, change, isPartialRefresh) {
      var _this6 = this;
      var index = isPartialRefresh ? change.index : (0, _array_utils.indexByKey)(keyInfo, items, change.key);
      var removedItem = isPartialRefresh ? change.oldItem : items[index];
      if (removedItem) {
        var $removedItemElement = this._findItemElementByKey(change.key);
        var deletedActionArgs = this._extendActionArgs($removedItemElement);
        this._waitDeletingPrepare($removedItemElement).done(function () {
          if (isPartialRefresh) {
            _this6._updateIndicesAfterIndex(index - 1);
            _this6._afterItemElementDeleted($removedItemElement, deletedActionArgs);
            _this6._updateSelectionAfterRemoveByChange(index);
          } else {
            _this6._deleteItemElementByIndex(index);
            _this6._afterItemElementDeleted($removedItemElement, deletedActionArgs);
          }
        });
        this._correctionIndex--;
      }
    },
    _modifyByChanges: function _modifyByChanges(changes, isPartialRefresh) {
      var _this7 = this;
      var items = this._editStrategy.itemsGetter();
      var keyInfo = {
        key: this.key.bind(this),
        keyOf: this.keyOf.bind(this)
      };
      var dataController = this._dataController;
      var paginate = dataController.paginate();
      var group = dataController.group();
      if (paginate || group) {
        changes = changes.filter(function (item) {
          return item.type !== 'insert' || item.index !== undefined;
        });
      }
      changes.forEach(function (change) {
        return _this7["_".concat(change.type, "ByChange")](keyInfo, items, change, isPartialRefresh);
      });
      this._renderedItemsCount = items.length;
      this._refreshItemsCache();
      this._fireContentReadyAction();
    },
    _appendItemToContainer: function _appendItemToContainer($container, $itemFrame, index) {
      var nextSiblingElement = $container.children(this._itemSelector()).get(index);
      _dom_adapter.default.insertElement($container.get(0), $itemFrame.get(0), nextSiblingElement);
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'items':
          {
            var isItemsUpdated = this._partialRefresh(args.value);
            if (!isItemsUpdated) {
              this.callBase(args);
            }
            break;
          }
        case 'dataSource':
          if (!this.option('repaintChangesOnly') || !args.value) {
            this.option('items', []);
          }
          this.callBase(args);
          break;
        case 'repaintChangesOnly':
          break;
        default:
          this.callBase(args);
      }
    }
  });
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","./ui.collection_widget.edit","../../core/utils/extend","../../core/utils/iterator","../../data/array_utils","../../data/utils","../../core/utils/deferred","../../core/utils/array_compare","../../core/dom_adapter","../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("./ui.collection_widget.edit"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("../../data/array_utils"), require("../../data/utils"), require("../../core/utils/deferred"), require("../../core/utils/array_compare"), require("../../core/dom_adapter"), require("../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.collection_widget.live_update.js.map