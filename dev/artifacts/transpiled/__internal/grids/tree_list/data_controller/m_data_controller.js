"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataController = void 0;
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _m_data_controller = require("../../../grids/grid_core/data_controller/m_data_controller");
var _m_data_source_adapter = _interopRequireDefault(require("../data_source_adapter/m_data_source_adapter"));
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DataController = _m_data_controller.dataControllerModule.controllers.data.inherit(function () {
  return {
    _getDataSourceAdapter() {
      return _m_data_source_adapter.default;
    },
    _getNodeLevel(node) {
      var level = -1;
      while (node.parent) {
        if (node.visible) {
          level++;
        }
        node = node.parent;
      }
      return level;
    },
    _generateDataItem(node, options) {
      return {
        rowType: 'data',
        node,
        key: node.key,
        data: node.data,
        isExpanded: this.isRowExpanded(node.key, options),
        level: this._getNodeLevel(node)
      };
    },
    _loadOnOptionChange() {
      this._dataSource.load();
    },
    _isItemEquals(item1, item2) {
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
    init() {
      this.createAction('onRowExpanding');
      this.createAction('onRowExpanded');
      this.createAction('onRowCollapsing');
      this.createAction('onRowCollapsed');
      this.callBase.apply(this, arguments);
    },
    keyOf(data) {
      var dataSource = this._dataSource;
      if (dataSource) {
        return dataSource.keyOf(data);
      }
    },
    key() {
      var dataSource = this._dataSource;
      if (dataSource) {
        return dataSource.getKeyExpr();
      }
    },
    publicMethods() {
      return this.callBase().concat(['expandRow', 'collapseRow', 'isRowExpanded', 'getRootNode', 'getNodeByKey', 'loadDescendants', 'forEachNode']);
    },
    changeRowExpand(key) {
      var _this = this;
      if (this._dataSource) {
        var args = {
          key
        };
        var isExpanded = this.isRowExpanded(key);
        this.executeAction(isExpanded ? 'onRowCollapsing' : 'onRowExpanding', args);
        if (!args.cancel) {
          return this._dataSource.changeRowExpand(key).done(function () {
            _this.executeAction(isExpanded ? 'onRowCollapsed' : 'onRowExpanded', args);
          });
        }
      }
      // @ts-expect-error
      return new _deferred.Deferred().resolve();
    },
    isRowExpanded(key, cache) {
      return this._dataSource && this._dataSource.isRowExpanded(key, cache);
    },
    expandRow(key) {
      if (!this.isRowExpanded(key)) {
        return this.changeRowExpand(key);
      }
      // @ts-expect-error
      return new _deferred.Deferred().resolve();
    },
    collapseRow(key) {
      if (this.isRowExpanded(key)) {
        return this.changeRowExpand(key);
      }
      // @ts-expect-error
      return new _deferred.Deferred().resolve();
    },
    getRootNode() {
      return this._dataSource && this._dataSource.getRootNode();
    },
    optionChanged(args) {
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
          if (this._dataSource && !this._dataSource._isNodesInitializing && !(0, _common.equalByValue)(args.value, args.previousValue)) {
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
    getNodeByKey(key) {
      if (!this._dataSource) {
        return;
      }
      return this._dataSource.getNodeByKey(key);
    },
    getChildNodeKeys(parentKey) {
      if (!this._dataSource) {
        return;
      }
      return this._dataSource.getChildNodeKeys(parentKey);
    },
    loadDescendants(keys, childrenOnly) {
      if (!this._dataSource) {
        return;
      }
      return this._dataSource.loadDescendants(keys, childrenOnly);
    },
    forEachNode() {
      this._dataSource.forEachNode.apply(this, arguments);
    }
  };
}());
exports.DataController = DataController;
_m_core.default.registerModule('data', {
  defaultOptions() {
    return (0, _extend.extend)({}, _m_data_controller.dataControllerModule.defaultOptions(), {
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