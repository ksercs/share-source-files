!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/selection/selection.strategy.js"], ["../../data/query","../../core/utils/common","../../core/utils/type","../../core/class","../../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/selection/selection.strategy.js", ["../../data/query", "../../core/utils/common", "../../core/utils/type", "../../core/class", "../../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _query = _interopRequireDefault($__require("../../data/query"));
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _deferred = $__require("../../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _default = _class.default.inherit({
    ctor: function ctor(options) {
      this.options = options;
      this._setOption('disabledItemKeys', []);
      this._clearItemKeys();
    },
    _clearItemKeys: function _clearItemKeys() {
      this._setOption('addedItemKeys', []);
      this._setOption('removedItemKeys', []);
      this._setOption('removedItems', []);
      this._setOption('addedItems', []);
    },
    validate: _common.noop,
    _setOption: function _setOption(name, value) {
      this.options[name] = value;
    },
    onSelectionChanged: function onSelectionChanged() {
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
    },
    equalKeys: function equalKeys(key1, key2) {
      if (this.options.equalByReference) {
        if ((0, _type.isObject)(key1) && (0, _type.isObject)(key2)) {
          return key1 === key2;
        }
      }
      return (0, _common.equalByValue)(key1, key2);
    },
    getSelectableItems: function getSelectableItems(items) {
      return items.filter(function (item) {
        return !(item !== null && item !== void 0 && item.disabled);
      });
    },
    _clearSelection: function _clearSelection(keys, preserve, isDeselect, isSelectAll) {
      keys = keys || [];
      keys = Array.isArray(keys) ? keys : [keys];
      this.validate();
      return this.selectedItemKeys(keys, preserve, isDeselect, isSelectAll);
    },
    _removeTemplateProperty: function _removeTemplateProperty(remoteFilter) {
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
    },
    _loadFilteredData: function _loadFilteredData(remoteFilter, localFilter, select, isSelectAll) {
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
    },
    updateSelectedItemKeyHash: function updateSelectedItemKeyHash(keys) {
      for (var i = 0; i < keys.length; i++) {
        var keyHash = (0, _common.getKeyHash)(keys[i]);
        if (!(0, _type.isObject)(keyHash)) {
          this.options.keyHashIndices[keyHash] = this.options.keyHashIndices[keyHash] || [];
          var keyIndices = this.options.keyHashIndices[keyHash];
          keyIndices.push(i);
        }
      }
    },
    _isAnyItemSelected: function _isAnyItemSelected(items) {
      for (var i = 0; i < items.length; i++) {
        if (this.options.isItemSelected(items[i])) {
          return undefined;
        }
      }
      return false;
    },
    _getFullSelectAllState: function _getFullSelectAllState() {
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
    },
    _getVisibleSelectAllState: function _getVisibleSelectAllState() {
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
    }
  });
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../data/query","../../core/utils/common","../../core/utils/type","../../core/class","../../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../data/query"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/class"), require("../../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=selection.strategy.js.map