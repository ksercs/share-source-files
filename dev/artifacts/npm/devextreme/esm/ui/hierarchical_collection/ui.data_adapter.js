/**
* DevExtreme (esm/ui/hierarchical_collection/ui.data_adapter.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Class from '../../core/class';
import { noop } from '../../core/utils/common';
import { each } from '../../core/utils/iterator';
import { isFunction, isDefined } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import errors from '../../ui/widget/ui.errors';
import uiSearchBoxMixin from '../../ui/widget/ui.search_box_mixin';
import TextBox from '../../ui/text_box';
import query from '../../data/query';
import storeHelper from '../../data/store_helper';
import HierarchicalDataConverter from './ui.data_converter';
var EXPANDED = 'expanded';
var SELECTED = 'selected';
var DISABLED = 'disabled';
uiSearchBoxMixin.setEditorClass(TextBox);
var DataAdapter = Class.inherit({
  ctor: function ctor(options) {
    this.options = {};
    extend(this.options, this._defaultOptions(), options);
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
      dataConverter: new HierarchicalDataConverter(),
      onNodeChanged: noop,
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
    each(that._getDataBySelectionMode(), function (_, node) {
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
    each(this._dataStructure, function (_, node) {
      if (!node.internalFields.childrenKeys.length) {
        return;
      }
      var isSelected = node.internalFields.selected;
      isSelected === true && that._toggleChildrenSelection(node, isSelected);
    });
  },
  _setParentSelection: function _setParentSelection() {
    var that = this;
    each(this._dataStructure, function (_, node) {
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
    each(this._dataStructure, function (_, node) {
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
    if (!isFunction(callback)) {
      return;
    }
    var that = this;
    var nodeKey = node.internalFields.key;
    processedKeys = processedKeys || [];
    if (processedKeys.indexOf(nodeKey) === -1) {
      processedKeys.push(nodeKey);
      each(node.internalFields.childrenKeys, function (_, key) {
        var child = that.getNodeByKey(key);
        callback(child);
        if (child.internalFields.childrenKeys.length && recursive) {
          that._iterateChildren(child, recursive, callback, processedKeys);
        }
      });
    }
  },
  _iterateParents: function _iterateParents(node, callback, processedKeys) {
    if (node.internalFields.parentKey === this.options.rootValue || !isFunction(callback)) {
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
    each(keys, function (_, key) {
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
    var items = extend([], this._dataStructure);
    each(items, function (index, item) {
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
    each(this._dataStructure, function (_, node) {
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
    each(items, function (_, item) {
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
    return query(this._dataStructure, {
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
    if (!isDefined(state)) {
      return;
    }
    var that = this;
    var lastSelectedKey = that._selectedNodesKeys[that._selectedNodesKeys.length - 1];
    var dataStructure = that._isSingleModeUnselect(state) ? this._initialDataStructure : this._dataStructure;
    each(dataStructure, function (index, node) {
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
    each(selector, function (i, item) {
      searchFilter.push([item, operation, value], 'or');
    });
    searchFilter.pop();
    return searchFilter;
  },
  _filterDataStructure: function _filterDataStructure(filterValue, dataStructure) {
    var selector = this.options.searchExpr || this.options.dataAccessors.getters.display;
    var operation = uiSearchBoxMixin.getOperationBySearchMode(this.options.searchMode);
    var criteria = this._createCriteria(selector, filterValue, operation);
    dataStructure = dataStructure || this._initialDataStructure;
    return query(dataStructure, {
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
          errors.log('W1007', node.internalFields.parentKey, node.internalFields.key);
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
      matches = storeHelper.queryByOptions(query(matches), {
        sort: this.options.sort,
        langParams: this.options.langParams
      }).toArray();
    }
    dataConverter._indexByKey = {};
    each(matches, function (index, node) {
      node.internalFields.childrenKeys = [];
      dataConverter._indexByKey[node.internalFields.key] = index;
    });
    dataConverter._dataStructure = matches;
    dataConverter.setChildrenKeys();
    return dataConverter._dataStructure;
  }
});
export default DataAdapter;
