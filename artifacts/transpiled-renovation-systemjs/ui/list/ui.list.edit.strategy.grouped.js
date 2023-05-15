!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/list/ui.list.edit.strategy.grouped.js"], ["../../core/renderer","../../core/utils/type","../../core/utils/iterator","../../data/store_helper","../../data/query","../collection/ui.collection_widget.edit.strategy.plain"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/list/ui.list.edit.strategy.grouped.js", ["../../core/renderer", "../../core/utils/type", "../../core/utils/iterator", "../../data/store_helper", "../../data/query", "../collection/ui.collection_widget.edit.strategy.plain"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _store_helper = _interopRequireDefault($__require("../../data/store_helper"));
  var _query = _interopRequireDefault($__require("../../data/query"));
  var _uiCollection_widgetEditStrategy = _interopRequireDefault($__require("../collection/ui.collection_widget.edit.strategy.plain"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var LIST_ITEM_CLASS = 'dx-list-item';
  var LIST_GROUP_CLASS = 'dx-list-group';
  var SELECTION_SHIFT = 20;
  var SELECTION_MASK = (1 << SELECTION_SHIFT) - 1;
  var combineIndex = function combineIndex(indices) {
    return (indices.group << SELECTION_SHIFT) + indices.item;
  };
  var splitIndex = function splitIndex(combinedIndex) {
    return {
      group: combinedIndex >> SELECTION_SHIFT,
      item: combinedIndex & SELECTION_MASK
    };
  };
  var GroupedEditStrategy = _uiCollection_widgetEditStrategy.default.inherit({
    _groupElements: function _groupElements() {
      return this._collectionWidget._itemContainer().find('.' + LIST_GROUP_CLASS);
    },
    _groupItemElements: function _groupItemElements($group) {
      return $group.find('.' + LIST_ITEM_CLASS);
    },
    getIndexByItemData: function getIndexByItemData(itemData) {
      var groups = this._collectionWidget.option('items');
      var index = false;
      if (!itemData) return false;
      if (itemData.items && itemData.items.length) {
        itemData = itemData.items[0];
      }
      (0, _iterator.each)(groups, function (groupIndex, group) {
        if (!group.items) return false;
        (0, _iterator.each)(group.items, function (itemIndex, item) {
          if (item !== itemData) {
            return true;
          }
          index = {
            group: groupIndex,
            item: itemIndex
          };
          return false;
        });
        if (index) {
          return false;
        }
      });
      return index;
    },
    getItemDataByIndex: function getItemDataByIndex(index) {
      var items = this._collectionWidget.option('items');
      if ((0, _type.isNumeric)(index)) {
        return this.itemsGetter()[index];
      }
      return index && items[index.group] && items[index.group].items[index.item] || null;
    },
    itemsGetter: function itemsGetter() {
      var resultItems = [];
      var items = this._collectionWidget.option('items');
      for (var i = 0; i < items.length; i++) {
        if (items[i] && items[i].items) {
          resultItems = resultItems.concat(items[i].items);
        } else {
          resultItems.push(items[i]);
        }
      }
      return resultItems;
    },
    deleteItemAtIndex: function deleteItemAtIndex(index) {
      var indices = splitIndex(index);
      var itemGroup = this._collectionWidget.option('items')[indices.group].items;
      itemGroup.splice(indices.item, 1);
    },
    getKeysByItems: function getKeysByItems(items) {
      var plainItems = [];
      var i;
      for (i = 0; i < items.length; i++) {
        if (items[i] && items[i].items) {
          plainItems = plainItems.concat(items[i].items);
        } else {
          plainItems.push(items[i]);
        }
      }
      var result = [];
      for (i = 0; i < plainItems.length; i++) {
        result.push(this._collectionWidget.keyOf(plainItems[i]));
      }
      return result;
    },
    getIndexByKey: function getIndexByKey(key, items) {
      var groups = items || this._collectionWidget.option('items');
      var index = -1;
      var that = this;
      (0, _iterator.each)(groups, function (groupIndex, group) {
        if (!group.items) return;
        (0, _iterator.each)(group.items, function (itemIndex, item) {
          var itemKey = that._collectionWidget.keyOf(item);
          if (that._equalKeys(itemKey, key)) {
            index = {
              group: groupIndex,
              item: itemIndex
            };
            return false;
          }
        });
        if (index !== -1) {
          return false;
        }
      });
      return index;
    },
    _getGroups: function _getGroups(items) {
      var dataController = this._collectionWidget._dataController;
      var group = dataController.group();
      if (group) {
        return _store_helper.default.queryByOptions((0, _query.default)(items), {
          group: group
        }).toArray();
      }
      return this._collectionWidget.option('items');
    },
    getItemsByKeys: function getItemsByKeys(keys, items) {
      var _this = this;
      var result = [];
      var groups = this._getGroups(items);
      var groupItemByKeyMap = {};
      var getItemMeta = function getItemMeta(key) {
        var index = _this.getIndexByKey(key, groups);
        var group = index && groups[index.group];
        if (!group) return;
        return {
          groupKey: group.key,
          item: group.items[index.item]
        };
      };
      (0, _iterator.each)(keys, function (_, key) {
        var itemMeta = getItemMeta(key);
        if (!itemMeta) return;
        var groupKey = itemMeta.groupKey;
        var item = itemMeta.item;
        var selectedGroup = groupItemByKeyMap[groupKey];
        if (!selectedGroup) {
          selectedGroup = {
            key: groupKey,
            items: []
          };
          groupItemByKeyMap[groupKey] = selectedGroup;
          result.push(selectedGroup);
        }
        selectedGroup.items.push(item);
      });
      return result;
    },
    moveItemAtIndexToIndex: function moveItemAtIndexToIndex(movingIndex, destinationIndex) {
      var items = this._collectionWidget.option('items');
      var movingIndices = splitIndex(movingIndex);
      var destinationIndices = splitIndex(destinationIndex);
      var movingItemGroup = items[movingIndices.group].items;
      var destinationItemGroup = items[destinationIndices.group].items;
      var movedItemData = movingItemGroup[movingIndices.item];
      movingItemGroup.splice(movingIndices.item, 1);
      destinationItemGroup.splice(destinationIndices.item, 0, movedItemData);
    },
    _isItemIndex: function _isItemIndex(index) {
      return index && (0, _type.isNumeric)(index.group) && (0, _type.isNumeric)(index.item);
    },
    _getNormalizedItemIndex: function _getNormalizedItemIndex(itemElement) {
      var $item = (0, _renderer.default)(itemElement);
      var $group = $item.closest('.' + LIST_GROUP_CLASS);
      if (!$group.length) {
        return -1;
      }
      return combineIndex({
        group: this._groupElements().index($group),
        item: this._groupItemElements($group).index($item)
      });
    },
    _normalizeItemIndex: function _normalizeItemIndex(index) {
      return combineIndex(index);
    },
    _denormalizeItemIndex: function _denormalizeItemIndex(index) {
      return splitIndex(index);
    },
    _getItemByNormalizedIndex: function _getItemByNormalizedIndex(index) {
      var indices = splitIndex(index);
      var $group = this._groupElements().eq(indices.group);
      return this._groupItemElements($group).eq(indices.item);
    },
    _itemsFromSameParent: function _itemsFromSameParent(firstIndex, secondIndex) {
      return splitIndex(firstIndex).group === splitIndex(secondIndex).group;
    }
  });
  var _default = GroupedEditStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/type","../../core/utils/iterator","../../data/store_helper","../../data/query","../collection/ui.collection_widget.edit.strategy.plain"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../../data/store_helper"), require("../../data/query"), require("../collection/ui.collection_widget.edit.strategy.plain"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.list.edit.strategy.grouped.js.map