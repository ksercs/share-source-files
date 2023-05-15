!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/hierarchical_collection/ui.data_converter.js"], ["../../core/class","../../core/utils/extend","../../ui/widget/ui.errors","../../core/utils/iterator","../../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/hierarchical_collection/ui.data_converter.js", ["../../core/class", "../../core/utils/extend", "../../ui/widget/ui.errors", "../../core/utils/iterator", "../../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _extend = $__require("../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("../../ui/widget/ui.errors"));
  var _iterator = $__require("../../core/utils/iterator");
  var _type = $__require("../../core/utils/type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DataConverter = _class.default.inherit({
    ctor: function ctor() {
      this._dataStructure = [];
      this._itemsCount = 0;
      this._visibleItemsCount = 0;
    },
    _indexByKey: {},
    _convertItemsToNodes: function _convertItemsToNodes(items, parentKey) {
      var that = this;
      (0, _iterator.each)(items, function (_, item) {
        var parentId = (0, _type.isDefined)(parentKey) ? parentKey : that._getParentId(item);
        var node = that._convertItemToNode(item, parentId);
        that._dataStructure.push(node);
        that._checkForDuplicateId(node.internalFields.key);
        that._indexByKey[node.internalFields.key] = that._dataStructure.length - 1;
        if (that._itemHasChildren(item)) {
          that._convertItemsToNodes(that._dataAccessors.getters.items(item), node.internalFields.key);
        }
      });
    },
    _checkForDuplicateId: function _checkForDuplicateId(key) {
      if ((0, _type.isDefined)(this._indexByKey[key])) {
        throw _ui.default.Error('E1040', key);
      }
    },
    _getParentId: function _getParentId(item) {
      return this._dataType === 'plain' ? this._dataAccessors.getters.parentKey(item) : undefined;
    },
    _itemHasChildren: function _itemHasChildren(item) {
      if (this._dataType === 'plain') {
        return;
      }
      var items = this._dataAccessors.getters.items(item);
      return items && items.length;
    },
    _getUniqueKey: function _getUniqueKey(item) {
      var keyGetter = this._dataAccessors.getters.key;
      var itemKey = keyGetter(item);
      var isCorrectKey = keyGetter && (itemKey || itemKey === 0) && (0, _type.isPrimitive)(itemKey);
      return isCorrectKey ? itemKey : this.getItemsCount();
    },
    _convertItemToNode: function _convertItemToNode(item, parentKey) {
      this._itemsCount++;
      item.visible !== false && this._visibleItemsCount++;
      var that = this;
      var node = {
        internalFields: {
          disabled: that._dataAccessors.getters.disabled(item, {
            defaultValue: false
          }),
          expanded: that._dataAccessors.getters.expanded(item, {
            defaultValue: false
          }),
          selected: that._dataAccessors.getters.selected(item, {
            defaultValue: false
          }),
          key: that._getUniqueKey(item),
          parentKey: (0, _type.isDefined)(parentKey) ? parentKey : that._rootValue,
          item: that._makeObjectFromPrimitive(item),
          childrenKeys: []
        }
      };
      (0, _extend.extend)(node, item);
      delete node.items;
      return node;
    },
    setChildrenKeys: function setChildrenKeys() {
      var that = this;
      (0, _iterator.each)(this._dataStructure, function (_, node) {
        if (node.internalFields.parentKey === that._rootValue) return;
        var parent = that.getParentNode(node);
        parent && parent.internalFields.childrenKeys.push(node.internalFields.key);
      });
    },
    _makeObjectFromPrimitive: function _makeObjectFromPrimitive(item) {
      if ((0, _type.isPrimitive)(item)) {
        var key = item;
        item = {};
        this._dataAccessors.setters.key(item, key);
      }
      return item;
    },
    _convertToPublicNode: function _convertToPublicNode(node, parent) {
      if (!node) {
        return null;
      }
      var publicNode = {
        text: this._dataAccessors.getters.display(node),
        key: node.internalFields.key,
        selected: node.internalFields.selected,
        expanded: node.internalFields.expanded,
        disabled: node.internalFields.disabled,
        parent: parent || null,
        itemData: node.internalFields.item,
        children: [],
        items: []
      };
      if (publicNode.parent) {
        publicNode.parent.children.push(publicNode);
        publicNode.parent.items.push(publicNode);
      }
      return publicNode;
    },
    convertToPublicNodes: function convertToPublicNodes(data, parent) {
      if (!data.length) return [];
      var that = this;
      var publicNodes = [];
      (0, _iterator.each)(data, function (_, node) {
        node = (0, _type.isPrimitive)(node) ? that._getByKey(node) : node;
        var publicNode = that._convertToPublicNode(node, parent);
        publicNode.children = that.convertToPublicNodes(node.internalFields.childrenKeys, publicNode);
        publicNodes.push(publicNode);
        node.internalFields.publicNode = publicNode;
      });
      return publicNodes;
    },
    setDataAccessors: function setDataAccessors(accessors) {
      this._dataAccessors = accessors;
    },
    _getByKey: function _getByKey(key) {
      return this._dataStructure[this.getIndexByKey(key)] || null;
    },
    getParentNode: function getParentNode(node) {
      return this._getByKey(node.internalFields.parentKey);
    },
    getByKey: function getByKey(data, key) {
      if (key === null || key === undefined) {
        return null;
      }
      var result = null;
      var that = this;
      var getByKey = function getByKey(data, key) {
        (0, _iterator.each)(data, function (_, element) {
          var currentElementKey = element.internalFields && element.internalFields.key || that._dataAccessors.getters.key(element);
          if (currentElementKey.toString() === key.toString()) {
            result = element;
            return false;
          }
        });
        return result;
      };
      return getByKey(data, key);
    },
    getItemsCount: function getItemsCount() {
      return this._itemsCount;
    },
    getVisibleItemsCount: function getVisibleItemsCount() {
      return this._visibleItemsCount;
    },
    updateIndexByKey: function updateIndexByKey() {
      var that = this;
      this._indexByKey = {};
      (0, _iterator.each)(this._dataStructure, function (index, node) {
        that._checkForDuplicateId(node.internalFields.key);
        that._indexByKey[node.internalFields.key] = index;
      });
    },
    updateChildrenKeys: function updateChildrenKeys() {
      this._indexByKey = {};
      this.removeChildrenKeys();
      this.updateIndexByKey();
      this.setChildrenKeys();
    },
    removeChildrenKeys: function removeChildrenKeys() {
      this._indexByKey = {};
      (0, _iterator.each)(this._dataStructure, function (index, node) {
        node.internalFields.childrenKeys = [];
      });
    },
    getIndexByKey: function getIndexByKey(key) {
      return this._indexByKey[key];
    },
    createPlainStructure: function createPlainStructure(items, rootValue, dataType) {
      this._itemsCount = 0;
      this._visibleItemsCount = 0;
      this._rootValue = rootValue;
      this._dataType = dataType;
      this._indexByKey = {};
      this._convertItemsToNodes(items);
      this.setChildrenKeys();
      return this._dataStructure;
    }
  });
  var _default = DataConverter;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/class","../../core/utils/extend","../../ui/widget/ui.errors","../../core/utils/iterator","../../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/class"), require("../../core/utils/extend"), require("../../ui/widget/ui.errors"), require("../../core/utils/iterator"), require("../../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.data_converter.js.map