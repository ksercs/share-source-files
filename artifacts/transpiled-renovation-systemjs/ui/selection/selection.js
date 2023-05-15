!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/selection/selection.js"], ["../../core/class","./selection.strategy.deferred","./selection.strategy.standard","../../core/utils/extend","../../core/utils/common","../../core/utils/type","../../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/selection/selection.js", ["../../core/class", "./selection.strategy.deferred", "./selection.strategy.standard", "../../core/utils/extend", "../../core/utils/common", "../../core/utils/type", "../../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _selectionStrategy = _interopRequireDefault($__require("./selection.strategy.deferred"));
  var _selectionStrategy2 = _interopRequireDefault($__require("./selection.strategy.standard"));
  var _extend = $__require("../../core/utils/extend");
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _deferred = $__require("../../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _default = _class.default.inherit({
    ctor: function ctor(options) {
      this.options = (0, _extend.extend)(this._getDefaultOptions(), options, {
        selectedItemKeys: options.selectedKeys || []
      });
      this._selectionStrategy = this.options.deferred ? new _selectionStrategy.default(this.options) : new _selectionStrategy2.default(this.options);
      this._focusedItemIndex = -1;
      if (!this.options.equalByReference) {
        this._selectionStrategy.updateSelectedItemKeyHash(this.options.selectedItemKeys);
      }
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return {
        allowNullValue: false,
        deferred: false,
        equalByReference: false,
        mode: 'multiple',
        selectedItems: [],
        selectionFilter: [],
        maxFilterLengthInRequest: 0,
        onSelectionChanged: _common.noop,
        key: _common.noop,
        keyOf: function keyOf(item) {
          return item;
        },
        load: function load() {
          return new _deferred.Deferred().resolve([]);
        },
        totalCount: function totalCount() {
          return -1;
        },
        isSelectableItem: function isSelectableItem() {
          return true;
        },
        isItemSelected: function isItemSelected() {
          return false;
        },
        getItemData: function getItemData(item) {
          return item;
        },
        dataFields: _common.noop,
        filter: _common.noop
      };
    },
    validate: function validate() {
      this._selectionStrategy.validate();
    },
    getSelectedItemKeys: function getSelectedItemKeys() {
      return this._selectionStrategy.getSelectedItemKeys();
    },
    getSelectedItems: function getSelectedItems() {
      return this._selectionStrategy.getSelectedItems();
    },
    selectionFilter: function selectionFilter(value) {
      if (value === undefined) {
        return this.options.selectionFilter;
      }
      var filterIsChanged = this.options.selectionFilter !== value && JSON.stringify(this.options.selectionFilter) !== JSON.stringify(value);
      this.options.selectionFilter = value;
      filterIsChanged && this.onSelectionChanged();
    },
    setSelection: function setSelection(keys, updatedKeys) {
      return this.selectedItemKeys(keys, false, false, false, updatedKeys);
    },
    select: function select(keys) {
      return this.selectedItemKeys(keys, true);
    },
    deselect: function deselect(keys) {
      return this.selectedItemKeys(keys, true, true);
    },
    selectedItemKeys: function selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys) {
      var _keys;
      var that = this;
      keys = (_keys = keys) !== null && _keys !== void 0 ? _keys : [];
      keys = Array.isArray(keys) ? keys : [keys];
      that.validate();
      return this._selectionStrategy.selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys);
    },
    clearSelection: function clearSelection() {
      return this.selectedItemKeys([]);
    },
    _addSelectedItem: function _addSelectedItem(itemData, key) {
      this._selectionStrategy.addSelectedItem(key, itemData);
    },
    _removeSelectedItem: function _removeSelectedItem(key) {
      this._selectionStrategy.removeSelectedItem(key);
    },
    _setSelectedItems: function _setSelectedItems(keys, items) {
      this._selectionStrategy.setSelectedItems(keys, items);
    },
    onSelectionChanged: function onSelectionChanged() {
      this._selectionStrategy.onSelectionChanged();
    },
    changeItemSelection: function changeItemSelection(itemIndex, keys, setFocusOnly) {
      var _this$options$allowLo,
          _this$options,
          _this = this;
      var isSelectedItemsChanged;
      var items = this.options.plainItems();
      var item = items[itemIndex];
      var deferred;
      var allowLoadByRange = (_this$options$allowLo = (_this$options = this.options).allowLoadByRange) === null || _this$options$allowLo === void 0 ? void 0 : _this$options$allowLo.call(_this$options);
      var indexOffset;
      var focusedItemNotInLoadedRange = false;
      var shiftFocusedItemNotInLoadedRange = false;
      var itemIsNotInLoadedRange = function itemIsNotInLoadedRange(index) {
        return index >= 0 && !items.filter(function (it) {
          return it.loadIndex === index;
        }).length;
      };
      if (allowLoadByRange) {
        indexOffset = item.loadIndex - itemIndex;
        itemIndex = item.loadIndex;
        focusedItemNotInLoadedRange = itemIsNotInLoadedRange(this._focusedItemIndex);
        if ((0, _type.isDefined)(this._shiftFocusedItemIndex)) {
          shiftFocusedItemNotInLoadedRange = itemIsNotInLoadedRange(this._shiftFocusedItemIndex);
        }
      }
      if (!this.isSelectable() || !this.isDataItem(item)) {
        return false;
      }
      var itemData = this.options.getItemData(item);
      var itemKey = this.options.keyOf(itemData);
      keys = keys || {};
      if (keys.shift && this.options.mode === 'multiple' && this._focusedItemIndex >= 0) {
        if (focusedItemNotInLoadedRange || shiftFocusedItemNotInLoadedRange) {
          isSelectedItemsChanged = itemIndex !== this._shiftFocusedItemIndex || this._focusedItemIndex !== this._shiftFocusedItemIndex;
          if (isSelectedItemsChanged) {
            deferred = this.changeItemSelectionWhenShiftKeyInVirtualPaging(itemIndex);
          }
        } else {
          isSelectedItemsChanged = this.changeItemSelectionWhenShiftKeyPressed(itemIndex, items, indexOffset);
        }
      } else if (keys.control) {
        this._resetItemSelectionWhenShiftKeyPressed();
        if (!setFocusOnly) {
          var isSelected = this._selectionStrategy.isItemDataSelected(itemData);
          if (this.options.mode === 'single') {
            this.clearSelectedItems();
          }
          if (isSelected) {
            this._removeSelectedItem(itemKey);
          } else {
            this._addSelectedItem(itemData, itemKey);
          }
        }
        isSelectedItemsChanged = true;
      } else {
        this._resetItemSelectionWhenShiftKeyPressed();
        var isKeysEqual = this._selectionStrategy.equalKeys(this.options.selectedItemKeys[0], itemKey);
        if (this.options.selectedItemKeys.length !== 1 || !isKeysEqual) {
          this._setSelectedItems([itemKey], [itemData]);
          isSelectedItemsChanged = true;
        }
      }
      if (isSelectedItemsChanged) {
        (0, _deferred.when)(deferred).done(function () {
          _this._focusedItemIndex = itemIndex;
          !setFocusOnly && _this.onSelectionChanged();
        });
        return true;
      }
    },
    isDataItem: function isDataItem(item) {
      return this.options.isSelectableItem(item);
    },
    isSelectable: function isSelectable() {
      return this.options.mode === 'single' || this.options.mode === 'multiple';
    },
    isItemDataSelected: function isItemDataSelected(data) {
      return this._selectionStrategy.isItemDataSelected(data, {
        checkPending: true
      });
    },
    isItemSelected: function isItemSelected(arg, options) {
      return this._selectionStrategy.isItemKeySelected(arg, options);
    },
    _resetItemSelectionWhenShiftKeyPressed: function _resetItemSelectionWhenShiftKeyPressed() {
      delete this._shiftFocusedItemIndex;
    },
    _resetFocusedItemIndex: function _resetFocusedItemIndex() {
      this._focusedItemIndex = -1;
    },
    changeItemSelectionWhenShiftKeyInVirtualPaging: function changeItemSelectionWhenShiftKeyInVirtualPaging(loadIndex) {
      var _this2 = this;
      var loadOptions = this.options.getLoadOptions(loadIndex, this._focusedItemIndex, this._shiftFocusedItemIndex);
      var deferred = new _deferred.Deferred();
      var indexOffset = loadOptions.skip;
      this.options.load(loadOptions).done(function (items) {
        _this2.changeItemSelectionWhenShiftKeyPressed(loadIndex, items, indexOffset);
        deferred.resolve();
      });
      return deferred.promise();
    },
    changeItemSelectionWhenShiftKeyPressed: function changeItemSelectionWhenShiftKeyPressed(itemIndex, items, indexOffset) {
      var isSelectedItemsChanged = false;
      var itemIndexStep;
      var indexOffsetDefined = (0, _type.isDefined)(indexOffset);
      var index = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
      var keyOf = this.options.keyOf;
      var focusedItem = items[index];
      var focusedData = this.options.getItemData(focusedItem);
      var focusedKey = keyOf(focusedData);
      var isFocusedItemSelected = focusedItem && this.isItemDataSelected(focusedData);
      if (!(0, _type.isDefined)(this._shiftFocusedItemIndex)) {
        this._shiftFocusedItemIndex = this._focusedItemIndex;
      }
      var data;
      var itemKey;
      var startIndex;
      var endIndex;
      if (this._shiftFocusedItemIndex !== this._focusedItemIndex) {
        itemIndexStep = this._focusedItemIndex < this._shiftFocusedItemIndex ? 1 : -1;
        startIndex = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
        endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
        for (index = startIndex; index !== endIndex; index += itemIndexStep) {
          if (indexOffsetDefined || this.isDataItem(items[index])) {
            itemKey = keyOf(this.options.getItemData(items[index]));
            this._removeSelectedItem(itemKey);
            isSelectedItemsChanged = true;
          }
        }
      }
      if (itemIndex !== this._shiftFocusedItemIndex) {
        itemIndexStep = itemIndex < this._shiftFocusedItemIndex ? 1 : -1;
        startIndex = indexOffsetDefined ? itemIndex - indexOffset : itemIndex;
        endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
        for (index = startIndex; index !== endIndex; index += itemIndexStep) {
          if (indexOffsetDefined || this.isDataItem(items[index])) {
            data = this.options.getItemData(items[index]);
            itemKey = keyOf(data);
            this._addSelectedItem(data, itemKey);
            isSelectedItemsChanged = true;
          }
        }
      }
      if ((indexOffsetDefined || this.isDataItem(focusedItem)) && !isFocusedItemSelected) {
        this._addSelectedItem(focusedData, focusedKey);
        isSelectedItemsChanged = true;
      }
      return isSelectedItemsChanged;
    },
    clearSelectedItems: function clearSelectedItems() {
      this._setSelectedItems([], []);
    },
    selectAll: function selectAll(isOnePage) {
      this._resetFocusedItemIndex();
      if (isOnePage) {
        return this._onePageSelectAll(false);
      } else {
        return this.selectedItemKeys([], true, false, true);
      }
    },
    deselectAll: function deselectAll(isOnePage) {
      this._resetFocusedItemIndex();
      if (isOnePage) {
        return this._onePageSelectAll(true);
      } else {
        return this.selectedItemKeys([], true, true, true);
      }
    },
    _onePageSelectAll: function _onePageSelectAll(isDeselect) {
      var items = this._selectionStrategy.getSelectableItems(this.options.plainItems());
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (this.isDataItem(item)) {
          var itemData = this.options.getItemData(item);
          var itemKey = this.options.keyOf(itemData);
          var isSelected = this.isItemSelected(itemKey);
          if (!isSelected && !isDeselect) {
            this._addSelectedItem(itemData, itemKey);
          }
          if (isSelected && isDeselect) {
            this._removeSelectedItem(itemKey);
          }
        }
      }
      this.onSelectionChanged();
      return new _deferred.Deferred().resolve();
    },
    getSelectAllState: function getSelectAllState(visibleOnly) {
      return this._selectionStrategy.getSelectAllState(visibleOnly);
    }
  });
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/class","./selection.strategy.deferred","./selection.strategy.standard","../../core/utils/extend","../../core/utils/common","../../core/utils/type","../../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/class"), require("./selection.strategy.deferred"), require("./selection.strategy.standard"), require("../../core/utils/extend"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=selection.js.map