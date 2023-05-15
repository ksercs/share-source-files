!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/hierarchical_collection/ui.data_adapter.js"], ["../../core/class","../../core/utils/common","../../core/utils/iterator","../../core/utils/type","../../core/utils/extend","../../ui/widget/ui.errors","../../ui/widget/ui.search_box_mixin","../../ui/text_box","../../data/query","../../data/store_helper","./ui.data_converter"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/hierarchical_collection/ui.data_adapter.js", ["../../core/class", "../../core/utils/common", "../../core/utils/iterator", "../../core/utils/type", "../../core/utils/extend", "../../ui/widget/ui.errors", "../../ui/widget/ui.search_box_mixin", "../../ui/text_box", "../../data/query", "../../data/store_helper", "./ui.data_converter"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _common = $__require("../../core/utils/common");
  var _iterator = $__require("../../core/utils/iterator");
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("../../ui/widget/ui.errors"));
  var _ui2 = _interopRequireDefault($__require("../../ui/widget/ui.search_box_mixin"));
  var _text_box = _interopRequireDefault($__require("../../ui/text_box"));
  var _query = _interopRequireDefault($__require("../../data/query"));
  var _store_helper = _interopRequireDefault($__require("../../data/store_helper"));
  var _ui3 = _interopRequireDefault($__require("./ui.data_converter"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var EXPANDED = 'expanded';
  var SELECTED = 'selected';
  var DISABLED = 'disabled';
  _ui2.default.setEditorClass(_text_box.default);
  var DataAdapter = _class.default.inherit({
    ctor: function ctor(options) {
      this.options = {};
      (0, _extend.extend)(this.options, this._defaultOptions(), options);
      this.options.dataConverter.setDataAccessors(this.options.dataAccessors);
      this._selectedNodesKeys = [];
      this._expandedNodesKeys = [];
      this._dataStructure = [];
      this._createInternalDataStructure();
      this.getTreeNodes();
    },
    setOption: function setOption(name, value) {
      this.options[name] = value;
      if (name === 'recursiveSelection') {
        this._updateSelection();
      }
    },
    _defaultOptions: function _defaultOptions() {
      return {
        dataAccessors: undefined,
        items: [],
        multipleSelection: true,
        recursiveSelection: false,
        recursiveExpansion: false,
        rootValue: 0,
        searchValue: '',
        dataType: 'tree',
        searchMode: 'contains',
        dataConverter: new _ui3.default(),
        onNodeChanged: _common.noop,
        sort: null
      };
    },
    _createInternalDataStructure: function _createInternalDataStructure() {
      this._initialDataStructure = this.options.dataConverter.createPlainStructure(this.options.items, this.options.rootValue, this.options.dataType);
      this._dataStructure = this.options.searchValue.length ? this.search(this.options.searchValue) : this._initialDataStructure;
      this.options.dataConverter._dataStructure = this._dataStructure;
      this._updateSelection();
      this._updateExpansion();
    },
    _updateSelection: function _updateSelection() {
      if (this.options.recursiveSelection) {
        this._setChildrenSelection();
        this._setParentSelection();
      }
      this._selectedNodesKeys = this._updateNodesKeysArray(SELECTED);
    },
    _updateExpansion: function _updateExpansion(key) {
      if (this.options.recursiveExpansion) {
        key ? this._updateOneBranch(key) : this._setParentExpansion();
      }
      this._expandedNodesKeys = this._updateNodesKeysArray(EXPANDED);
    },
    _updateNodesKeysArray: function _updateNodesKeysArray(property) {
      var that = this;
      var array = [];
      (0, _iterator.each)(that._getDataBySelectionMode(), function (_, node) {
        if (!that._isNodeVisible(node)) {
          return;
        }
        if (node.internalFields[property]) {
          if (property === EXPANDED || that.options.multipleSelection) {
            array.push(node.internalFields.key);
          } else {
            array.length && that.toggleSelection(array[0], false, true);
            array = [node.internalFields.key];
          }
        }
      });
      return array;
    },
    _getDataBySelectionMode: function _getDataBySelectionMode() {
      return this.options.multipleSelection ? this.getData() : this.getFullData();
    },
    _isNodeVisible: function _isNodeVisible(node) {
      return node.internalFields.item.visible !== false;
    },
    _getByKey: function _getByKey(data, key) {
      return data === this._dataStructure ? this.options.dataConverter._getByKey(key) : this.options.dataConverter.getByKey(data, key);
    },
    _setChildrenSelection: function _setChildrenSelection() {
      var that = this;
      (0, _iterator.each)(this._dataStructure, function (_, node) {
        if (!node.internalFields.childrenKeys.length) {
          return;
        }
        var isSelected = node.internalFields.selected;
        isSelected === true && that._toggleChildrenSelection(node, isSelected);
      });
    },
    _setParentSelection: function _setParentSelection() {
      var that = this;
      (0, _iterator.each)(this._dataStructure, function (_, node) {
        var parent = that.options.dataConverter.getParentNode(node);
        if (parent && node.internalFields.parentKey !== that.options.rootValue) {
          that._iterateParents(node, function (parent) {
            var newParentState = that._calculateSelectedState(parent);
            that._setFieldState(parent, SELECTED, newParentState);
          });
        }
      });
    },
    _setParentExpansion: function _setParentExpansion() {
      var that = this;
      (0, _iterator.each)(this._dataStructure, function (_, node) {
        if (!node.internalFields.expanded) {
          return;
        }
        that._updateOneBranch(node.internalFields.key);
      });
    },
    _updateOneBranch: function _updateOneBranch(key) {
      var that = this;
      var node = this.getNodeByKey(key);
      that._iterateParents(node, function (parent) {
        that._setFieldState(parent, EXPANDED, true);
      });
    },
    _iterateChildren: function _iterateChildren(node, recursive, callback, processedKeys) {
      if (!(0, _type.isFunction)(callback)) {
        return;
      }
      var that = this;
      var nodeKey = node.internalFields.key;
      processedKeys = processedKeys || [];
      if (processedKeys.indexOf(nodeKey) === -1) {
        processedKeys.push(nodeKey);
        (0, _iterator.each)(node.internalFields.childrenKeys, function (_, key) {
          var child = that.getNodeByKey(key);
          callback(child);
          if (child.internalFields.childrenKeys.length && recursive) {
            that._iterateChildren(child, recursive, callback, processedKeys);
          }
        });
      }
    },
    _iterateParents: function _iterateParents(node, callback, processedKeys) {
      if (node.internalFields.parentKey === this.options.rootValue || !(0, _type.isFunction)(callback)) {
        return;
      }
      processedKeys = processedKeys || [];
      var key = node.internalFields.key;
      if (processedKeys.indexOf(key) === -1) {
        processedKeys.push(key);
        var parent = this.options.dataConverter.getParentNode(node);
        if (parent) {
          callback(parent);
          if (parent.internalFields.parentKey !== this.options.rootValue) {
            this._iterateParents(parent, callback, processedKeys);
          }
        }
      }
    },
    _calculateSelectedState: function _calculateSelectedState(node) {
      var itemsCount = node.internalFields.childrenKeys.length;
      var selectedItemsCount = 0;
      var invisibleItemsCount = 0;
      var result = false;
      for (var i = 0; i <= itemsCount - 1; i++) {
        var childNode = this.getNodeByKey(node.internalFields.childrenKeys[i]);
        var isChildInvisible = childNode.internalFields.item.visible === false;
        var childState = childNode.internalFields.selected;
        if (isChildInvisible) {
          invisibleItemsCount++;
          continue;
        }
        if (childState) {
          selectedItemsCount++;
        } else if (childState === undefined) {
          selectedItemsCount += 0.5;
        }
      }
      if (selectedItemsCount) {
        result = selectedItemsCount === itemsCount - invisibleItemsCount ? true : undefined;
      }
      return result;
    },
    _toggleChildrenSelection: function _toggleChildrenSelection(node, state) {
      var that = this;
      this._iterateChildren(node, true, function (child) {
        if (that._isNodeVisible(child)) {
          that._setFieldState(child, SELECTED, state);
        }
      });
    },
    _setFieldState: function _setFieldState(node, field, state) {
      if (node.internalFields[field] === state) {
        return;
      }
      node.internalFields[field] = state;
      if (node.internalFields.publicNode) {
        node.internalFields.publicNode[field] = state;
      }
      this.options.dataAccessors.setters[field](node.internalFields.item, state);
      this.options.onNodeChanged(node);
    },
    _markChildren: function _markChildren(keys) {
      var that = this;
      (0, _iterator.each)(keys, function (_, key) {
        var index = that.getIndexByKey(key);
        var node = that.getNodeByKey(key);
        that._dataStructure[index] = 0;
        node.internalFields.childrenKeys.length && that._markChildren(node.internalFields.childrenKeys);
      });
    },
    _removeNode: function _removeNode(key) {
      var node = this.getNodeByKey(key);
      this._dataStructure[this.getIndexByKey(key)] = 0;
      this._markChildren(node.internalFields.childrenKeys);
      var that = this;
      var counter = 0;
      var items = (0, _extend.extend)([], this._dataStructure);
      (0, _iterator.each)(items, function (index, item) {
        if (!item) {
          that._dataStructure.splice(index - counter, 1);
          counter++;
        }
      });
    },
    _addNode: function _addNode(item) {
      var dataConverter = this.options.dataConverter;
      var node = dataConverter._convertItemToNode(item, this.options.dataAccessors.getters.parentKey(item));
      this._dataStructure = this._dataStructure.concat(node);
      this._initialDataStructure = this._initialDataStructure.concat(node);
      dataConverter._dataStructure = dataConverter._dataStructure.concat(node);
    },
    _updateFields: function _updateFields() {
      this.options.dataConverter.updateChildrenKeys();
      this._updateSelection();
      this._updateExpansion();
    },
    getSelectedNodesKeys: function getSelectedNodesKeys() {
      return this._selectedNodesKeys;
    },
    getExpandedNodesKeys: function getExpandedNodesKeys() {
      return this._expandedNodesKeys;
    },
    getData: function getData() {
      return this._dataStructure;
    },
    getFullData: function getFullData() {
      return this._initialDataStructure;
    },
    getNodeByItem: function getNodeByItem(item) {
      var result = null;
      (0, _iterator.each)(this._dataStructure, function (_, node) {
        if (node.internalFields.item === item) {
          result = node;
          return false;
        }
      });
      return result;
    },
    getNodesByItems: function getNodesByItems(items) {
      var that = this;
      var nodes = [];
      (0, _iterator.each)(items, function (_, item) {
        var node = that.getNodeByItem(item);
        node && nodes.push(node);
      });
      return nodes;
    },
    getNodeByKey: function getNodeByKey(key, data) {
      return this._getByKey(data || this._getDataBySelectionMode(), key);
    },
    getTreeNodes: function getTreeNodes() {
      return this.options.dataConverter.convertToPublicNodes(this.getRootNodes());
    },
    getItemsCount: function getItemsCount() {
      return this.options.dataConverter.getItemsCount();
    },
    getVisibleItemsCount: function getVisibleItemsCount() {
      return this.options.dataConverter.getVisibleItemsCount();
    },
    getPublicNode: function getPublicNode(node) {
      return node.internalFields.publicNode;
    },
    getRootNodes: function getRootNodes() {
      return this.getChildrenNodes(this.options.rootValue);
    },
    getChildrenNodes: function getChildrenNodes(parentKey) {
      return (0, _query.default)(this._dataStructure, {
        langParams: this.options.langParams
      }).filter(['internalFields.parentKey', parentKey]).toArray();
    },
    getIndexByKey: function getIndexByKey(key) {
      return this.options.dataConverter.getIndexByKey(key);
    },
    addItem: function addItem(item) {
      this._addNode(item);
      this._updateFields();
    },
    removeItem: function removeItem(key) {
      this._removeNode(key);
      this._updateFields();
    },
    toggleSelection: function toggleSelection(key, state, selectRecursive) {
      var isSingleModeUnselect = this._isSingleModeUnselect(state);
      var node = this._getByKey(selectRecursive || isSingleModeUnselect ? this._initialDataStructure : this._dataStructure, key);
      this._setFieldState(node, SELECTED, state);
      if (this.options.recursiveSelection && !selectRecursive) {
        state ? this._setChildrenSelection() : this._toggleChildrenSelection(node, state);
        this._setParentSelection();
      }
      this._selectedNodesKeys = this._updateNodesKeysArray(SELECTED);
    },
    _isSingleModeUnselect: function _isSingleModeUnselect(selectionState) {
      return !this.options.multipleSelection && !selectionState;
    },
    toggleNodeDisabledState: function toggleNodeDisabledState(key, state) {
      var node = this.getNodeByKey(key);
      this._setFieldState(node, DISABLED, state);
    },
    toggleSelectAll: function toggleSelectAll(state) {
      if (!(0, _type.isDefined)(state)) {
        return;
      }
      var that = this;
      var lastSelectedKey = that._selectedNodesKeys[that._selectedNodesKeys.length - 1];
      var dataStructure = that._isSingleModeUnselect(state) ? this._initialDataStructure : this._dataStructure;
      (0, _iterator.each)(dataStructure, function (index, node) {
        if (!that._isNodeVisible(node)) {
          return;
        }
        that._setFieldState(node, SELECTED, state);
      });
      that._selectedNodesKeys = that._updateNodesKeysArray(SELECTED);
      if (!state && that.options.selectionRequired) {
        that.toggleSelection(lastSelectedKey, true);
      }
    },
    isAllSelected: function isAllSelected() {
      if (this.getSelectedNodesKeys().length) {
        return this.getSelectedNodesKeys().length === this.getVisibleItemsCount() ? true : undefined;
      } else {
        return false;
      }
    },
    toggleExpansion: function toggleExpansion(key, state) {
      var node = this.getNodeByKey(key);
      this._setFieldState(node, EXPANDED, state);
      if (state) {
        this._updateExpansion(key);
      }
      this._expandedNodesKeys = this._updateNodesKeysArray(EXPANDED);
    },
    isFiltered: function isFiltered(item) {
      return !this.options.searchValue.length || !!this._filterDataStructure(this.options.searchValue, [item]).length;
    },
    _createCriteria: function _createCriteria(selector, value, operation) {
      var searchFilter = [];
      if (!Array.isArray(selector)) {
        return [selector, operation, value];
      }
      (0, _iterator.each)(selector, function (i, item) {
        searchFilter.push([item, operation, value], 'or');
      });
      searchFilter.pop();
      return searchFilter;
    },
    _filterDataStructure: function _filterDataStructure(filterValue, dataStructure) {
      var selector = this.options.searchExpr || this.options.dataAccessors.getters.display;
      var operation = _ui2.default.getOperationBySearchMode(this.options.searchMode);
      var criteria = this._createCriteria(selector, filterValue, operation);
      dataStructure = dataStructure || this._initialDataStructure;
      return (0, _query.default)(dataStructure, {
        langParams: this.options.langParams
      }).filter(criteria).toArray();
    },
    search: function search(searchValue) {
      var that = this;
      var matches = this._filterDataStructure(searchValue);
      var dataConverter = this.options.dataConverter;
      function lookForParents(matches, index) {
        var length = matches.length;
        while (index < length) {
          var node = matches[index];
          if (node.internalFields.parentKey === that.options.rootValue) {
            index++;
            continue;
          }
          var parent = dataConverter.getParentNode(node);
          if (!parent) {
            _ui.default.log('W1007', node.internalFields.parentKey, node.internalFields.key);
            index++;
            continue;
          }
          if (!parent.internalFields.expanded) {
            that._setFieldState(parent, EXPANDED, true);
          }
          if (matches.includes(parent)) {
            index++;
            continue;
          }
          matches.splice(index, 0, parent);
          lookForParents(matches, index);
        }
      }
      lookForParents(matches, 0);
      if (this.options.sort) {
        matches = _store_helper.default.queryByOptions((0, _query.default)(matches), {
          sort: this.options.sort,
          langParams: this.options.langParams
        }).toArray();
      }
      dataConverter._indexByKey = {};
      (0, _iterator.each)(matches, function (index, node) {
        node.internalFields.childrenKeys = [];
        dataConverter._indexByKey[node.internalFields.key] = index;
      });
      dataConverter._dataStructure = matches;
      dataConverter.setChildrenKeys();
      return dataConverter._dataStructure;
    }
  });
  var _default = DataAdapter;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/class","../../core/utils/common","../../core/utils/iterator","../../core/utils/type","../../core/utils/extend","../../ui/widget/ui.errors","../../ui/widget/ui.search_box_mixin","../../ui/text_box","../../data/query","../../data/store_helper","./ui.data_converter"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/class"), require("../../core/utils/common"), require("../../core/utils/iterator"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../../ui/widget/ui.errors"), require("../../ui/widget/ui.search_box_mixin"), require("../../ui/text_box"), require("../../data/query"), require("../../data/store_helper"), require("./ui.data_converter"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.data_adapter.js.map