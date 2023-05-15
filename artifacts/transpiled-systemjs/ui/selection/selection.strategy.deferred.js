!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/selection/selection.strategy.deferred.js"], ["../../core/utils/type","./selection.strategy","../widget/ui.errors","../../data/query","../../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/selection/selection.strategy.deferred.js", ["../../core/utils/type", "./selection.strategy", "../widget/ui.errors", "../../data/query", "../../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _type = $__require("../../core/utils/type");
  var _selection = _interopRequireDefault($__require("./selection.strategy"));
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _query = _interopRequireDefault($__require("../../data/query"));
  var _deferred = $__require("../../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _default = _selection.default.inherit({
    getSelectedItems: function getSelectedItems() {
      return this._loadFilteredData(this.options.selectionFilter);
    },
    getSelectedItemKeys: function getSelectedItemKeys() {
      var d = new _deferred.Deferred();
      var that = this;
      var key = this.options.key();
      var select = (0, _type.isString)(key) ? [key] : key;
      this._loadFilteredData(this.options.selectionFilter, null, select).done(function (items) {
        var keys = items.map(function (item) {
          return that.options.keyOf(item);
        });
        d.resolve(keys);
      }).fail(d.reject);
      return d.promise();
    },
    selectedItemKeys: function selectedItemKeys(keys, preserve, isDeselect, isSelectAll) {
      if (isSelectAll) {
        var filter = this.options.filter();
        var needResetSelectionFilter = !filter || JSON.stringify(filter) === JSON.stringify(this.options.selectionFilter) && isDeselect;
        if (needResetSelectionFilter) {
          this._setOption('selectionFilter', isDeselect ? [] : null);
        } else {
          this._addSelectionFilter(isDeselect, filter, isSelectAll);
        }
      } else {
        if (!preserve) {
          this._setOption('selectionFilter', []);
        }
        for (var i = 0; i < keys.length; i++) {
          if (isDeselect) {
            this.removeSelectedItem(keys[i]);
          } else {
            this.addSelectedItem(keys[i], isSelectAll, !preserve);
          }
        }
      }
      this.onSelectionChanged();
      return new _deferred.Deferred().resolve();
    },
    setSelectedItems: function setSelectedItems(keys) {
      this._setOption('selectionFilter', null);
      for (var i = 0; i < keys.length; i++) {
        this.addSelectedItem(keys[i]);
      }
    },
    isItemDataSelected: function isItemDataSelected(itemData) {
      return this.isItemKeySelected(itemData);
    },
    isItemKeySelected: function isItemKeySelected(itemData) {
      var selectionFilter = this.options.selectionFilter;
      if (!selectionFilter) {
        return true;
      }
      return !!(0, _query.default)([itemData]).filter(selectionFilter).toArray().length;
    },
    _getKeyExpr: function _getKeyExpr() {
      var keyField = this.options.key();
      if (Array.isArray(keyField) && keyField.length === 1) {
        return keyField[0];
      }
      return keyField;
    },
    _normalizeKey: function _normalizeKey(key) {
      var keyExpr = this.options.key();
      if (Array.isArray(keyExpr) && keyExpr.length === 1) {
        return key[keyExpr[0]];
      }
      return key;
    },
    _getFilterByKey: function _getFilterByKey(key) {
      var keyField = this._getKeyExpr();
      var filter = [keyField, '=', this._normalizeKey(key)];
      if (Array.isArray(keyField)) {
        filter = [];
        for (var i = 0; i < keyField.length; i++) {
          filter.push([keyField[i], '=', key[keyField[i]]]);
          if (i !== keyField.length - 1) {
            filter.push('and');
          }
        }
      }
      return filter;
    },
    addSelectedItem: function addSelectedItem(key, isSelectAll, skipFilter) {
      var filter = this._getFilterByKey(key);
      this._addSelectionFilter(false, filter, isSelectAll, skipFilter);
    },
    removeSelectedItem: function removeSelectedItem(key) {
      var filter = this._getFilterByKey(key);
      this._addSelectionFilter(true, filter);
    },
    validate: function validate() {
      var key = this.options.key;
      if (key && key() === undefined) {
        throw _ui.default.Error('E1042', 'Deferred selection');
      }
    },
    _findSubFilter: function _findSubFilter(selectionFilter, filter) {
      if (!selectionFilter) return -1;
      var filterString = JSON.stringify(filter);
      for (var index = 0; index < selectionFilter.length; index++) {
        var subFilter = selectionFilter[index];
        if (subFilter && JSON.stringify(subFilter) === filterString) {
          return index;
        }
      }
      return -1;
    },
    _isLastSubFilter: function _isLastSubFilter(selectionFilter, filter) {
      if (selectionFilter && filter) {
        return this._findSubFilter(selectionFilter, filter) === selectionFilter.length - 1 || this._findSubFilter([selectionFilter], filter) === 0;
      }
      return false;
    },
    _addFilterOperator: function _addFilterOperator(selectionFilter, filterOperator) {
      if (selectionFilter.length > 1 && (0, _type.isString)(selectionFilter[1]) && selectionFilter[1] !== filterOperator) {
        selectionFilter = [selectionFilter];
      }
      if (selectionFilter.length) {
        selectionFilter.push(filterOperator);
      }
      return selectionFilter;
    },
    _denormalizeFilter: function _denormalizeFilter(filter) {
      if (filter && (0, _type.isString)(filter[0])) {
        filter = [filter];
      }
      return filter;
    },
    _isOnlyNegativeFiltersLeft: function _isOnlyNegativeFiltersLeft(filters) {
      return filters.every(function (filterItem, i) {
        if (i % 2 === 0) {
          return Array.isArray(filterItem) && filterItem[0] === '!';
        } else {
          return filterItem === 'and';
        }
      });
    },
    _addSelectionFilter: function _addSelectionFilter(isDeselect, filter, isSelectAll, skipFilter) {
      var _selectionFilter;
      var that = this;
      var currentFilter = isDeselect ? ['!', filter] : filter;
      var currentOperation = isDeselect ? 'and' : 'or';
      var needAddFilter = true;
      var selectionFilter = that.options.selectionFilter || [];
      selectionFilter = that._denormalizeFilter(selectionFilter);
      if ((_selectionFilter = selectionFilter) !== null && _selectionFilter !== void 0 && _selectionFilter.length && !skipFilter) {
        var removedIndex = that._removeSameFilter(selectionFilter, filter, isDeselect, isSelectAll);
        var filterIndex = that._removeSameFilter(selectionFilter, filter, !isDeselect);
        var shouldCleanFilter = isDeselect && (removedIndex !== -1 || filterIndex !== -1) && this._isOnlyNegativeFiltersLeft(selectionFilter);
        if (shouldCleanFilter) {
          selectionFilter = [];
        }
        var isKeyOperatorsAfterRemoved = this._isKeyFilter(filter) && this._hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex);
        needAddFilter = filter.length && !isKeyOperatorsAfterRemoved;
      }
      if (needAddFilter) {
        selectionFilter = that._addFilterOperator(selectionFilter, currentOperation);
        selectionFilter.push(currentFilter);
      }
      selectionFilter = that._normalizeFilter(selectionFilter);
      that._setOption('selectionFilter', !isDeselect && !selectionFilter.length ? null : selectionFilter);
    },
    _normalizeFilter: function _normalizeFilter(filter) {
      if (filter && filter.length === 1) {
        filter = filter[0];
      }
      return filter;
    },
    _removeFilterByIndex: function _removeFilterByIndex(filter, filterIndex, isSelectAll) {
      var operation = filter[1];
      if (filterIndex > 0) {
        filter.splice(filterIndex - 1, 2);
      } else {
        filter.splice(filterIndex, 2);
      }
      if (isSelectAll && operation === 'and') {
        filter.splice(0, filter.length);
      }
    },
    _isSimpleKeyFilter: function _isSimpleKeyFilter(filter, key) {
      return filter.length === 3 && filter[0] === key && filter[1] === '=';
    },
    _isKeyFilter: function _isKeyFilter(filter) {
      if (filter.length === 2 && filter[0] === '!') {
        return this._isKeyFilter(filter[1]);
      }
      var keyField = this._getKeyExpr();
      if (Array.isArray(keyField)) {
        if (filter.length !== keyField.length * 2 - 1) {
          return false;
        }
        for (var i = 0; i < keyField.length; i++) {
          if (i > 0 && filter[i * 2 - 1] !== 'and') {
            return false;
          }
          if (!this._isSimpleKeyFilter(filter[i * 2], keyField[i])) {
            return false;
          }
        }
        return true;
      }
      return this._isSimpleKeyFilter(filter, keyField);
    },
    _hasKeyFiltersOnlyStartingFromIndex: function _hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex) {
      if (filterIndex >= 0) {
        for (var i = filterIndex; i < selectionFilter.length; i++) {
          if (typeof selectionFilter[i] !== 'string' && !this._isKeyFilter(selectionFilter[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    },
    _removeSameFilter: function _removeSameFilter(selectionFilter, filter, inverted, isSelectAll) {
      filter = inverted ? ['!', filter] : filter;
      if (JSON.stringify(filter) === JSON.stringify(selectionFilter)) {
        selectionFilter.splice(0, selectionFilter.length);
        return 0;
      }
      var filterIndex = this._findSubFilter(selectionFilter, filter);
      if (filterIndex >= 0) {
        this._removeFilterByIndex(selectionFilter, filterIndex, isSelectAll);
        return filterIndex;
      } else {
        for (var i = 0; i < selectionFilter.length; i++) {
          if (Array.isArray(selectionFilter[i]) && selectionFilter[i].length > 2) {
            var _filterIndex = this._removeSameFilter(selectionFilter[i], filter, false, isSelectAll);
            if (_filterIndex >= 0) {
              if (!selectionFilter[i].length) {
                this._removeFilterByIndex(selectionFilter, i, isSelectAll);
              } else if (selectionFilter[i].length === 1) {
                selectionFilter[i] = selectionFilter[i][0];
              }
              return _filterIndex;
            }
          }
        }
        return -1;
      }
    },
    getSelectAllState: function getSelectAllState() {
      var filter = this.options.filter();
      var selectionFilter = this.options.selectionFilter;
      if (!selectionFilter) return true;
      if (!selectionFilter.length) return false;
      if (!filter || !filter.length) return undefined;
      selectionFilter = this._denormalizeFilter(selectionFilter);
      if (this._isLastSubFilter(selectionFilter, filter)) {
        return true;
      }
      if (this._isLastSubFilter(selectionFilter, ['!', filter])) {
        return false;
      }
      return undefined;
    }
  });
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","./selection.strategy","../widget/ui.errors","../../data/query","../../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("./selection.strategy"), require("../widget/ui.errors"), require("../../data/query"), require("../../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=selection.strategy.deferred.js.map