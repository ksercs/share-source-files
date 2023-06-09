import { extend } from '../../core/utils/extend';
import { Deferred } from '../../core/utils/deferred';
import treeListCore from './ui.tree_list.core';
import { equalByValue } from '../../core/utils/common';
import dataSourceAdapterProvider from './ui.tree_list.data_source_adapter';
import { dataControllerModule } from '../grid_core/ui.grid_core.data_controller';
export var DataController = dataControllerModule.controllers.data.inherit(function () {
  return {
    _getDataSourceAdapter: function _getDataSourceAdapter() {
      return dataSourceAdapterProvider;
    },
    _getNodeLevel: function _getNodeLevel(node) {
      var level = -1;
      while (node.parent) {
        if (node.visible) {
          level++;
        }
        node = node.parent;
      }
      return level;
    },
    _generateDataItem: function _generateDataItem(node, options) {
      return {
        rowType: 'data',
        node: node,
        key: node.key,
        data: node.data,
        isExpanded: this.isRowExpanded(node.key, options),
        level: this._getNodeLevel(node)
      };
    },
    _loadOnOptionChange: function _loadOnOptionChange() {
      this._dataSource.load();
    },
    _isItemEquals: function _isItemEquals(item1, item2) {
      if (!this.callBase.apply(this, arguments)) {
        return false;
      }
      if (item1.node && item2.node && item1.node.hasChildren !== item2.node.hasChildren) {
        return false;
      }
      if (item1.level !== item2.level || item1.isExpanded !== item2.isExpanded) {
        return false;
      }
      return true;
    },
    init: function init() {
      this.createAction('onRowExpanding');
      this.createAction('onRowExpanded');
      this.createAction('onRowCollapsing');
      this.createAction('onRowCollapsed');
      this.callBase.apply(this, arguments);
    },
    keyOf: function keyOf(data) {
      var dataSource = this._dataSource;
      if (dataSource) {
        return dataSource.keyOf(data);
      }
    },
    key: function key() {
      var dataSource = this._dataSource;
      if (dataSource) {
        return dataSource.getKeyExpr();
      }
    },
    publicMethods: function publicMethods() {
      return this.callBase().concat(['expandRow', 'collapseRow', 'isRowExpanded', 'getRootNode', 'getNodeByKey', 'loadDescendants', 'forEachNode']);
    },
    changeRowExpand: function changeRowExpand(key) {
      if (this._dataSource) {
        var args = {
          key: key
        };
        var isExpanded = this.isRowExpanded(key);
        this.executeAction(isExpanded ? 'onRowCollapsing' : 'onRowExpanding', args);
        if (!args.cancel) {
          return this._dataSource.changeRowExpand(key).done(() => {
            this.executeAction(isExpanded ? 'onRowCollapsed' : 'onRowExpanded', args);
          });
        }
      }
      return new Deferred().resolve();
    },
    isRowExpanded: function isRowExpanded(key, cache) {
      return this._dataSource && this._dataSource.isRowExpanded(key, cache);
    },
    expandRow: function expandRow(key) {
      if (!this.isRowExpanded(key)) {
        return this.changeRowExpand(key);
      }
      return new Deferred().resolve();
    },
    collapseRow: function collapseRow(key) {
      if (this.isRowExpanded(key)) {
        return this.changeRowExpand(key);
      }
      return new Deferred().resolve();
    },
    getRootNode: function getRootNode() {
      return this._dataSource && this._dataSource.getRootNode();
    },
    optionChanged: function optionChanged(args) {
      switch (args.name) {
        case 'rootValue':
        case 'parentIdExpr':
        case 'itemsExpr':
        case 'filterMode':
        case 'expandNodesOnFiltering':
        case 'autoExpandAll':
        case 'hasItemsExpr':
        case 'dataStructure':
          this._columnsController.reset();
          this._items = [];
          this._refreshDataSource();
          args.handled = true;
          break;
        case 'expandedRowKeys':
        case 'onNodesInitialized':
          if (this._dataSource && !this._dataSource._isNodesInitializing && !equalByValue(args.value, args.previousValue)) {
            this._loadOnOptionChange();
          }
          args.handled = true;
          break;
        case 'maxFilterLengthInRequest':
          args.handled = true;
          break;
        default:
          this.callBase(args);
      }
    },
    getNodeByKey: function getNodeByKey(key) {
      if (!this._dataSource) {
        return;
      }
      return this._dataSource.getNodeByKey(key);
    },
    getChildNodeKeys: function getChildNodeKeys(parentKey) {
      if (!this._dataSource) {
        return;
      }
      return this._dataSource.getChildNodeKeys(parentKey);
    },
    loadDescendants: function loadDescendants(keys, childrenOnly) {
      if (!this._dataSource) {
        return;
      }
      return this._dataSource.loadDescendants(keys, childrenOnly);
    },
    forEachNode: function forEachNode() {
      this._dataSource.forEachNode.apply(this, arguments);
    }
  };
}());
treeListCore.registerModule('data', {
  defaultOptions: function defaultOptions() {
    return extend({}, dataControllerModule.defaultOptions(), {
      itemsExpr: 'items',
      parentIdExpr: 'parentId',
      rootValue: 0,
      dataStructure: 'plain',
      expandedRowKeys: [],
      filterMode: 'withAncestors',
      expandNodesOnFiltering: true,
      autoExpandAll: false,
      onNodesInitialized: null,
      maxFilterLengthInRequest: 1500,
      paging: {
        enabled: false
      }
    });
  },
  controllers: {
    data: DataController
  }
});