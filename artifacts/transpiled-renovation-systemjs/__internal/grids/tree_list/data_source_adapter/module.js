!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/tree_list/data_source_adapter/module.js"], ["../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/iterator","../../../../core/utils/data","../../../../core/utils/extend","../../../../data/array_utils","../../../../data/array_store","../../../../data/query","../../../../core/utils/deferred","../../../../data/store_helper","../../../../ui/grid_core/ui.grid_core.data_source_adapter","../../../../ui/grid_core/ui.grid_core.utils","../../../../ui/widget/ui.errors","../module_core"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/tree_list/data_source_adapter/module.js", ["../../../../core/utils/common", "../../../../core/utils/type", "../../../../core/utils/iterator", "../../../../core/utils/data", "../../../../core/utils/extend", "../../../../data/array_utils", "../../../../data/array_store", "../../../../data/query", "../../../../core/utils/deferred", "../../../../data/store_helper", "../../../../ui/grid_core/ui.grid_core.data_source_adapter", "../../../../ui/grid_core/ui.grid_core.utils", "../../../../ui/widget/ui.errors", "../module_core"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _common = $__require("../../../../core/utils/common");
  var _type = $__require("../../../../core/utils/type");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _data = $__require("../../../../core/utils/data");
  var _extend = $__require("../../../../core/utils/extend");
  var _array_utils = $__require("../../../../data/array_utils");
  var _array_store = _interopRequireDefault($__require("../../../../data/array_store"));
  var _query = _interopRequireDefault($__require("../../../../data/query"));
  var _deferred = $__require("../../../../core/utils/deferred");
  var _store_helper = _interopRequireDefault($__require("../../../../data/store_helper"));
  var _uiGrid_core = _interopRequireDefault($__require("../../../../ui/grid_core/ui.grid_core.data_source_adapter"));
  var _uiGrid_core2 = _interopRequireDefault($__require("../../../../ui/grid_core/ui.grid_core.utils"));
  var _ui = _interopRequireDefault($__require("../../../../ui/widget/ui.errors"));
  var _module_core = _interopRequireDefault($__require("../module_core"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var queryByOptions = _store_helper.default.queryByOptions;
  var DEFAULT_KEY_EXPRESSION = 'id';
  var isFullBranchFilterMode = function isFullBranchFilterMode(that) {
    return that.option('filterMode') === 'fullBranch';
  };
  var DataSourceAdapterTreeList = _uiGrid_core.default.inherit(function () {
    var getChildKeys = function getChildKeys(that, keys) {
      var childKeys = [];
      keys.forEach(function (key) {
        var node = that.getNodeByKey(key);
        node && node.children.forEach(function (child) {
          childKeys.push(child.key);
        });
      });
      return childKeys;
    };
    return {
      _createKeyGetter: function _createKeyGetter() {
        var keyExpr = this.getKeyExpr();
        return (0, _data.compileGetter)(keyExpr);
      },
      _createKeySetter: function _createKeySetter() {
        var keyExpr = this.getKeyExpr();
        if ((0, _type.isFunction)(keyExpr)) {
          return keyExpr;
        }
        return (0, _data.compileSetter)(keyExpr);
      },
      createParentIdGetter: function createParentIdGetter() {
        return (0, _data.compileGetter)(this.option('parentIdExpr'));
      },
      createParentIdSetter: function createParentIdSetter() {
        var parentIdExpr = this.option('parentIdExpr');
        if ((0, _type.isFunction)(parentIdExpr)) {
          return parentIdExpr;
        }
        return (0, _data.compileSetter)(parentIdExpr);
      },
      _createItemsGetter: function _createItemsGetter() {
        return (0, _data.compileGetter)(this.option('itemsExpr'));
      },
      _createHasItemsGetter: function _createHasItemsGetter() {
        var hasItemsExpr = this.option('hasItemsExpr');
        return hasItemsExpr && (0, _data.compileGetter)(hasItemsExpr);
      },
      _createHasItemsSetter: function _createHasItemsSetter() {
        var hasItemsExpr = this.option('hasItemsExpr');
        if ((0, _type.isFunction)(hasItemsExpr)) {
          return hasItemsExpr;
        }
        return hasItemsExpr && (0, _data.compileSetter)(hasItemsExpr);
      },
      _updateIndexByKeyObject: function _updateIndexByKeyObject(items) {
        var that = this;
        that._indexByKey = {};
        (0, _iterator.each)(items, function (index, item) {
          that._indexByKey[item.key] = index;
        });
      },
      _calculateHasItems: function _calculateHasItems(node, options) {
        var that = this;
        var parentIds = options.storeLoadOptions.parentIds;
        var hasItems;
        var isFullBranch = isFullBranchFilterMode(that);
        if (that._hasItemsGetter && (parentIds || !options.storeLoadOptions.filter || isFullBranch)) {
          hasItems = that._hasItemsGetter(node.data);
        }
        if (hasItems === undefined) {
          if (!that._isChildrenLoaded[node.key] && options.remoteOperations.filtering && (parentIds || isFullBranch)) {
            hasItems = true;
          } else if (options.loadOptions.filter && !options.remoteOperations.filtering && isFullBranch) {
            hasItems = node.children.length;
          } else {
            hasItems = node.hasChildren;
          }
        }
        return !!hasItems;
      },
      _fillVisibleItemsByNodes: function _fillVisibleItemsByNodes(nodes, options, result) {
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].visible) {
            result.push(nodes[i]);
          }
          if ((this.isRowExpanded(nodes[i].key, options) || !nodes[i].visible) && nodes[i].hasChildren && nodes[i].children.length) {
            this._fillVisibleItemsByNodes(nodes[i].children, options, result);
          }
        }
      },
      _convertItemToNode: function _convertItemToNode(item, rootValue, nodeByKey) {
        var key = this._keyGetter(item);
        var parentId = this._parentIdGetter(item);
        parentId = (0, _type.isDefined)(parentId) ? parentId : rootValue;
        var parentNode = nodeByKey[parentId] = nodeByKey[parentId] || {
          key: parentId,
          children: []
        };
        var node = nodeByKey[key] = nodeByKey[key] || {
          key: key,
          children: []
        };
        node.data = item;
        node.parent = parentNode;
        return node;
      },
      _createNodesByItems: function _createNodesByItems(items, visibleItems) {
        var that = this;
        var rootValue = that.option('rootValue');
        var visibleByKey = {};
        var nodeByKey = that._nodeByKey = {};
        var i;
        if (visibleItems) {
          for (i = 0; i < visibleItems.length; i++) {
            visibleByKey[this._keyGetter(visibleItems[i])] = true;
          }
        }
        for (i = 0; i < items.length; i++) {
          var node = that._convertItemToNode(items[i], rootValue, nodeByKey);
          if (node.key === undefined) {
            return;
          }
          node.visible = !visibleItems || !!visibleByKey[node.key];
          if (node.parent) {
            node.parent.children.push(node);
          }
        }
        var rootNode = nodeByKey[rootValue] || {
          key: rootValue,
          children: []
        };
        rootNode.level = -1;
        return rootNode;
      },
      _convertDataToPlainStructure: function _convertDataToPlainStructure(data, parentId, result) {
        var key;
        if (this._itemsGetter && !data.isConverted) {
          result = result || [];
          for (var i = 0; i < data.length; i++) {
            var item = (0, _array_utils.createObjectWithChanges)(data[i]);
            key = this._keyGetter(item);
            if (key === undefined) {
              key = result.length + 1;
              this._keySetter(item, key);
            }
            this._parentIdSetter(item, parentId === undefined ? this.option('rootValue') : parentId);
            result.push(item);
            var childItems = this._itemsGetter(item);
            if (childItems && childItems.length) {
              this._convertDataToPlainStructure(childItems, key, result);
              var itemsExpr = this.option('itemsExpr');
              if (!(0, _type.isFunction)(itemsExpr)) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete item[itemsExpr];
              }
            }
          }
          result.isConverted = true;
          return result;
        }
        return data;
      },
      _createIdFilter: function _createIdFilter(field, keys) {
        var parentIdFilters = [];
        for (var i = 0; i < keys.length; i++) {
          parentIdFilters.push([field, '=', keys[i]]);
        }
        return _uiGrid_core2.default.combineFilters(parentIdFilters, 'or');
      },
      _customizeRemoteOperations: function _customizeRemoteOperations(options, operationTypes) {
        this.callBase.apply(this, arguments);
        options.remoteOperations.paging = false;
        var expandVisibleNodes = false;
        if (this.option('autoExpandAll')) {
          options.remoteOperations.sorting = false;
          options.remoteOperations.filtering = false;
          if ((!this._lastLoadOptions || operationTypes.filtering && !options.storeLoadOptions.filter) && !options.isCustomLoading) {
            expandVisibleNodes = true;
          }
        }
        if (!options.isCustomLoading) {
          this._isReload = this._isReload || operationTypes.reload;
          if (!options.cachedStoreData) {
            this._isChildrenLoaded = {};
            if (this._isReload) {
              this._nodeByKey = {};
            }
          }
          if (this.option('expandNodesOnFiltering') && (operationTypes.filtering || this._isReload && options.storeLoadOptions.filter)) {
            if (options.storeLoadOptions.filter) {
              expandVisibleNodes = true;
            } else {
              options.collapseVisibleNodes = true;
            }
          }
        }
        options.expandVisibleNodes = expandVisibleNodes;
      },
      _getParentIdsToLoad: function _getParentIdsToLoad(parentIds) {
        var parentIdsToLoad = [];
        for (var i = 0; i < parentIds.length; i++) {
          var node = this.getNodeByKey(parentIds[i]);
          if (!node || node.hasChildren && !node.children.length) {
            parentIdsToLoad.push(parentIds[i]);
          }
        }
        return parentIdsToLoad;
      },
      _handleCustomizeStoreLoadOptions: function _handleCustomizeStoreLoadOptions(options) {
        var rootValue = this.option('rootValue');
        var parentIdExpr = this.option('parentIdExpr');
        var parentIds = options.storeLoadOptions.parentIds;
        if (parentIds) {
          options.isCustomLoading = false;
        }
        this.callBase.apply(this, arguments);
        if (options.remoteOperations.filtering && !options.isCustomLoading) {
          if (isFullBranchFilterMode(this) && options.cachedStoreData || !options.storeLoadOptions.filter) {
            var expandedRowKeys = options.collapseVisibleNodes ? [] : this.option('expandedRowKeys');
            parentIds = [rootValue].concat(expandedRowKeys).concat(parentIds || []);
            var parentIdsToLoad = options.data ? this._getParentIdsToLoad(parentIds) : parentIds;
            if (parentIdsToLoad.length) {
              options.cachedPagingData = undefined;
              options.data = undefined;
              options.mergeStoreLoadData = true;
              options.delay = this.option('loadingTimeout'); // T991320
            }

            options.storeLoadOptions.parentIds = parentIdsToLoad;
            options.storeLoadOptions.filter = this._createIdFilter(parentIdExpr, parentIdsToLoad);
          }
        }
      },
      _generateInfoToLoad: function _generateInfoToLoad(data, needChildren) {
        var that = this;
        var key;
        var keyMap = {};
        var resultKeyMap = {};
        var resultKeys = [];
        var rootValue = that.option('rootValue');
        var i;
        for (i = 0; i < data.length; i++) {
          key = needChildren ? that._parentIdGetter(data[i]) : that._keyGetter(data[i]);
          keyMap[key] = true;
        }
        for (i = 0; i < data.length; i++) {
          key = needChildren ? that._keyGetter(data[i]) : that._parentIdGetter(data[i]);
          var needToLoad = needChildren ? that.isRowExpanded(key) : key !== rootValue;
          if (!keyMap[key] && !resultKeyMap[key] && needToLoad) {
            resultKeyMap[key] = true;
            resultKeys.push(key);
          }
        }
        return {
          keyMap: resultKeyMap,
          keys: resultKeys
        };
      },
      _loadParentsOrChildren: function _loadParentsOrChildren(data, options, needChildren) {
        var _this = this;
        var that = this;
        var filter;
        var needLocalFiltering;
        var _that$_generateInfoTo = that._generateInfoToLoad(data, needChildren),
            keys = _that$_generateInfoTo.keys,
            keyMap = _that$_generateInfoTo.keyMap;
        // @ts-expect-error
        var d = new _deferred.Deferred();
        var isRemoteFiltering = options.remoteOperations.filtering;
        var maxFilterLengthInRequest = that.option('maxFilterLengthInRequest');
        var loadOptions = isRemoteFiltering ? options.storeLoadOptions : options.loadOptions;
        function concatLoadedData(loadedData) {
          if (isRemoteFiltering) {
            that._cachedStoreData = that._cachedStoreData.concat(loadedData);
          }
          return data.concat(loadedData);
        }
        if (!keys.length) {
          return d.resolve(data);
        }
        var cachedNodes = keys.map(function (id) {
          return _this.getNodeByKey(id);
        }).filter(function (node) {
          return node && node.data;
        });
        if (cachedNodes.length === keys.length) {
          if (needChildren) {
            cachedNodes = cachedNodes.reduce(function (result, node) {
              return result.concat(node.children);
            }, []);
          }
          if (cachedNodes.length) {
            return that._loadParentsOrChildren(concatLoadedData(cachedNodes.map(function (node) {
              return node.data;
            })), options, needChildren);
          }
        }
        var keyExpr = needChildren ? that.option('parentIdExpr') : that.getKeyExpr();
        filter = that._createIdFilter(keyExpr, keys);
        var filterLength = encodeURI(JSON.stringify(filter)).length;
        if (filterLength > maxFilterLengthInRequest) {
          filter = function filter(itemData) {
            return keyMap[needChildren ? that._parentIdGetter(itemData) : that._keyGetter(itemData)];
          };
          needLocalFiltering = isRemoteFiltering;
        }
        loadOptions = (0, _extend.extend)({}, loadOptions, {
          filter: !needLocalFiltering ? filter : null
        });
        var store = options.fullData ? new _array_store.default(options.fullData) : that._dataSource.store();
        that.loadFromStore(loadOptions, store).done(function (loadedData) {
          if (loadedData.length) {
            if (needLocalFiltering) {
              loadedData = (0, _query.default)(loadedData).filter(filter).toArray();
            }
            that._loadParentsOrChildren(concatLoadedData(loadedData), options, needChildren).done(d.resolve).fail(d.reject);
          } else {
            d.resolve(data);
          }
        }).fail(d.reject);
        return d;
      },
      _loadParents: function _loadParents(data, options) {
        return this._loadParentsOrChildren(data, options);
      },
      _loadChildrenIfNeed: function _loadChildrenIfNeed(data, options) {
        if (isFullBranchFilterMode(this)) {
          return this._loadParentsOrChildren(data, options, true);
        }
        return (0, _deferred.when)(data);
      },
      _updateHasItemsMap: function _updateHasItemsMap(options) {
        var parentIds = options.storeLoadOptions.parentIds;
        if (parentIds) {
          for (var i = 0; i < parentIds.length; i++) {
            this._isChildrenLoaded[parentIds[i]] = true;
          }
        }
      },
      _getKeyInfo: function _getKeyInfo() {
        return {
          key: function key() {
            return 'key';
          },
          keyOf: function keyOf(data) {
            return data.key;
          }
        };
      },
      _processChanges: function _processChanges(changes) {
        var _this2 = this;
        var processedChanges = [];
        changes.forEach(function (change) {
          if (change.type === 'insert') {
            processedChanges = processedChanges.concat(_this2._applyInsert(change));
          } else if (change.type === 'remove') {
            processedChanges = processedChanges.concat(_this2._applyRemove(change));
          } else if (change.type === 'update') {
            processedChanges.push({
              type: change.type,
              key: change.key,
              data: {
                data: change.data
              }
            });
          }
        });
        return processedChanges;
      },
      _handleChanging: function _handleChanging(e) {
        var _this3 = this;
        this.callBase.apply(this, arguments);
        var processChanges = function processChanges(changes) {
          var changesToProcess = changes.filter(function (item) {
            return item.type === 'update';
          });
          return _this3._processChanges(changesToProcess);
        };
        e.postProcessChanges = processChanges;
      },
      _applyBatch: function _applyBatch(changes) {
        var processedChanges = this._processChanges(changes);
        this.callBase(processedChanges);
      },
      _setHasItems: function _setHasItems(node, value) {
        var hasItemsSetter = this._hasItemsSetter;
        node.hasChildren = value;
        if (hasItemsSetter && node.data) {
          hasItemsSetter(node.data, value);
        }
      },
      _applyInsert: function _applyInsert(change) {
        var that = this;
        var baseChanges = [];
        var parentId = that.parentKeyOf(change.data);
        var parentNode = that.getNodeByKey(parentId);
        if (parentNode) {
          var rootValue = that.option('rootValue');
          var node = that._convertItemToNode(change.data, rootValue, that._nodeByKey);
          node.hasChildren = false;
          node.level = parentNode.level + 1;
          node.visible = true;
          parentNode.children.push(node);
          that._isChildrenLoaded[node.key] = true;
          that._setHasItems(parentNode, true);
          if ((!parentNode.parent || that.isRowExpanded(parentNode.key)) && change.index !== undefined) {
            var index = that.items().indexOf(parentNode) + 1;
            index += change.index >= 0 ? Math.min(change.index, parentNode.children.length) : parentNode.children.length;
            baseChanges.push({
              type: change.type,
              data: node,
              index: index
            });
          }
        }
        return baseChanges;
      },
      _needToCopyDataObject: function _needToCopyDataObject() {
        return false;
      },
      _applyRemove: function _applyRemove(change) {
        var baseChanges = [];
        var node = this.getNodeByKey(change.key);
        var parentNode = node && node.parent;
        if (parentNode) {
          var index = parentNode.children.indexOf(node);
          if (index >= 0) {
            parentNode.children.splice(index, 1);
            if (!parentNode.children.length) {
              this._setHasItems(parentNode, false);
            }
            baseChanges.push(change);
            baseChanges = baseChanges.concat(this.getChildNodeKeys(change.key).map(function (key) {
              return {
                type: change.type,
                key: key
              };
            }));
          }
        }
        return baseChanges;
      },
      _handleDataLoaded: function _handleDataLoaded(options) {
        var data = options.data = this._convertDataToPlainStructure(options.data);
        if (!options.remoteOperations.filtering && options.loadOptions.filter) {
          options.fullData = queryByOptions((0, _query.default)(options.data), {
            sort: options.loadOptions && options.loadOptions.sort
          }).toArray();
        }
        this._updateHasItemsMap(options);
        this.callBase(options);
        if (data.isConverted && this._cachedStoreData) {
          this._cachedStoreData.isConverted = true;
        }
      },
      _fillNodes: function _fillNodes(nodes, options, expandedRowKeys, level) {
        var isFullBranch = isFullBranchFilterMode(this);
        level = level || 0;
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          var needToExpand = false;
          // node.hasChildren = false;
          this._fillNodes(nodes[i].children, options, expandedRowKeys, level + 1);
          node.level = level;
          node.hasChildren = this._calculateHasItems(node, options);
          if (node.visible && node.hasChildren) {
            if (isFullBranch) {
              if (node.children.filter(function (node) {
                return node.visible;
              }).length) {
                needToExpand = true;
              } else if (node.children.length) {
                _module_core.default.foreachNodes(node.children, function (node) {
                  node.visible = true;
                });
              }
            } else {
              needToExpand = true;
            }
            if (options.expandVisibleNodes && needToExpand) {
              expandedRowKeys.push(node.key);
            }
          }
          if (node.visible || node.hasChildren) {
            node.parent.hasChildren = true;
          }
        }
      },
      _processTreeStructure: function _processTreeStructure(options, visibleItems) {
        var data = options.data;
        var parentIds = options.storeLoadOptions.parentIds;
        var expandedRowKeys = [];
        if (parentIds && parentIds.length || this._isReload) {
          if (options.fullData && options.fullData.length > options.data.length) {
            data = options.fullData;
            visibleItems = visibleItems || options.data;
          }
          this._rootNode = this._createNodesByItems(data, visibleItems);
          if (!this._rootNode) {
            // @ts-expect-error
            options.data = new _deferred.Deferred().reject(_ui.default.Error('E1046', this.getKeyExpr()));
            return;
          }
          this._fillNodes(this._rootNode.children, options, expandedRowKeys);
          this._isNodesInitializing = true;
          if (options.collapseVisibleNodes || expandedRowKeys.length) {
            this.option('expandedRowKeys', expandedRowKeys);
          }
          this._isReload = false;
          this.executeAction('onNodesInitialized', {
            root: this._rootNode
          });
          this._isNodesInitializing = false;
        }
        var resultData = [];
        this._fillVisibleItemsByNodes(this._rootNode.children, options, resultData);
        options.data = resultData;
        this._totalItemsCount = resultData.length;
      },
      _handleDataLoadedCore: function _handleDataLoadedCore(options) {
        var that = this;
        var data = options.data;
        var callBase = that.callBase;
        var filter = options.storeLoadOptions.filter || options.loadOptions.filter;
        var filterMode = that.option('filterMode');
        var visibleItems;
        var parentIds = options.storeLoadOptions.parentIds;
        var needLoadParents = filter && (!parentIds || !parentIds.length) && filterMode !== 'standard';
        if (!options.isCustomLoading) {
          if (needLoadParents) {
            // @ts-expect-error
            var d = options.data = new _deferred.Deferred();
            if (filterMode === 'matchOnly') {
              visibleItems = data;
            }
            return that._loadParents(data, options).done(function (data) {
              that._loadChildrenIfNeed(data, options).done(function (data) {
                options.data = data;
                that._processTreeStructure(options, visibleItems);
                callBase.call(that, options);
                d.resolve(options.data);
              });
            }).fail(d.reject);
          }
          that._processTreeStructure(options);
        }
        that.callBase(options);
      },
      _handlePush: function _handlePush(_ref) {
        var changes = _ref.changes;
        var reshapeOnPush = this._dataSource._reshapeOnPush;
        var isNeedReshape = reshapeOnPush && !!changes.length;
        if (isNeedReshape) {
          this._isReload = true;
        }
        changes.forEach(function (change) {
          var _a;
          (_a = change.index) !== null && _a !== void 0 ? _a : change.index = -1;
        });
        this.callBase.apply(this, arguments);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      init: function init(dataSource, remoteOperations) {
        this.callBase.apply(this, arguments);
        var dataStructure = this.option('dataStructure');
        this._keyGetter = this._createKeyGetter();
        this._parentIdGetter = this.createParentIdGetter();
        this._hasItemsGetter = this._createHasItemsGetter();
        this._hasItemsSetter = this._createHasItemsSetter();
        if (dataStructure === 'tree') {
          this._itemsGetter = this._createItemsGetter();
          this._keySetter = this._createKeySetter();
          this._parentIdSetter = this.createParentIdSetter();
        }
        this._nodeByKey = {};
        this._isChildrenLoaded = {};
        this._totalItemsCount = 0;
        this.createAction('onNodesInitialized');
      },
      getKeyExpr: function getKeyExpr() {
        var store = this.store();
        var key = store && store.key();
        var keyExpr = this.option('keyExpr');
        if ((0, _type.isDefined)(key) && (0, _type.isDefined)(keyExpr)) {
          if (!(0, _common.equalByValue)(key, keyExpr)) {
            throw _ui.default.Error('E1044');
          }
        }
        return key || keyExpr || DEFAULT_KEY_EXPRESSION;
      },
      keyOf: function keyOf(data) {
        return this._keyGetter && this._keyGetter(data);
      },
      parentKeyOf: function parentKeyOf(data) {
        return this._parentIdGetter && this._parentIdGetter(data);
      },
      getRootNode: function getRootNode() {
        return this._rootNode;
      },
      totalItemsCount: function totalItemsCount() {
        return this._totalItemsCount + this._totalCountCorrection;
      },
      isRowExpanded: function isRowExpanded(key, cache) {
        if (cache) {
          var isExpandedByKey = cache.isExpandedByKey;
          if (!isExpandedByKey) {
            isExpandedByKey = cache.isExpandedByKey = {};
            this.option('expandedRowKeys').forEach(function (key) {
              isExpandedByKey[key] = true;
            });
          }
          return !!isExpandedByKey[key];
        }
        var indexExpandedNodeKey = _uiGrid_core2.default.getIndexByKey(key, this.option('expandedRowKeys'), null);
        return indexExpandedNodeKey >= 0;
      },
      _changeRowExpandCore: function _changeRowExpandCore(key) {
        var expandedRowKeys = this.option('expandedRowKeys').slice();
        var indexExpandedNodeKey = _uiGrid_core2.default.getIndexByKey(key, expandedRowKeys, null);
        if (indexExpandedNodeKey < 0) {
          expandedRowKeys.push(key);
        } else {
          expandedRowKeys.splice(indexExpandedNodeKey, 1);
        }
        this.option('expandedRowKeys', expandedRowKeys);
      },
      changeRowExpand: function changeRowExpand(key) {
        this._changeRowExpandCore(key);
        // @ts-expect-error
        return this._isNodesInitializing ? new _deferred.Deferred().resolve() : this.load();
      },
      getNodeByKey: function getNodeByKey(key) {
        if (this._nodeByKey) {
          return this._nodeByKey[key];
        }
      },
      getNodeLeafKeys: function getNodeLeafKeys() {
        var that = this;
        var result = [];
        var keys = that._rootNode ? [that._rootNode.key] : [];
        keys.forEach(function (key) {
          var node = that.getNodeByKey(key);
          node && _module_core.default.foreachNodes([node], function (childNode) {
            !childNode.children.length && result.push(childNode.key);
          });
        });
        return result;
      },
      getChildNodeKeys: function getChildNodeKeys(parentKey) {
        var node = this.getNodeByKey(parentKey);
        var childrenKeys = [];
        node && _module_core.default.foreachNodes(node.children, function (childNode) {
          childrenKeys.push(childNode.key);
        });
        return childrenKeys;
      },
      loadDescendants: function loadDescendants(keys, childrenOnly) {
        var that = this;
        // @ts-expect-error
        var d = new _deferred.Deferred();
        var remoteOperations = that.remoteOperations();
        if ((0, _type.isDefined)(keys)) {
          keys = Array.isArray(keys) ? keys : [keys];
        } else {
          keys = that.getNodeLeafKeys();
        }
        if (!remoteOperations.filtering || !keys.length) {
          return d.resolve();
        }
        var loadOptions = that._dataSource._createStoreLoadOptions();
        loadOptions.parentIds = keys;
        that.load(loadOptions).done(function () {
          if (!childrenOnly) {
            var childKeys = getChildKeys(that, keys);
            if (childKeys.length) {
              that.loadDescendants(childKeys, childrenOnly).done(d.resolve).fail(d.reject);
              return;
            }
          }
          d.resolve();
        }).fail(d.reject);
        return d.promise();
      },
      forEachNode: function forEachNode() {
        var nodes = [];
        var callback;
        if (arguments.length === 1) {
          // eslint-disable-next-line prefer-destructuring
          callback = arguments[0];
          var rootNode = this.getRootNode();
          nodes = rootNode && rootNode.children || [];
        } else if (arguments.length === 2) {
          // eslint-disable-next-line prefer-destructuring
          callback = arguments[1];
          // eslint-disable-next-line prefer-destructuring
          nodes = arguments[0];
          nodes = Array.isArray(nodes) ? nodes : [nodes];
        }
        _module_core.default.foreachNodes(nodes, callback);
      }
    };
  }());
  var _default = {
    extend: function extend(extender) {
      DataSourceAdapterTreeList = DataSourceAdapterTreeList.inherit(extender);
    },
    create: function create(component) {
      return new DataSourceAdapterTreeList(component);
    }
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/iterator","../../../../core/utils/data","../../../../core/utils/extend","../../../../data/array_utils","../../../../data/array_store","../../../../data/query","../../../../core/utils/deferred","../../../../data/store_helper","../../../../ui/grid_core/ui.grid_core.data_source_adapter","../../../../ui/grid_core/ui.grid_core.utils","../../../../ui/widget/ui.errors","../module_core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/common"), require("../../../../core/utils/type"), require("../../../../core/utils/iterator"), require("../../../../core/utils/data"), require("../../../../core/utils/extend"), require("../../../../data/array_utils"), require("../../../../data/array_store"), require("../../../../data/query"), require("../../../../core/utils/deferred"), require("../../../../data/store_helper"), require("../../../../ui/grid_core/ui.grid_core.data_source_adapter"), require("../../../../ui/grid_core/ui.grid_core.utils"), require("../../../../ui/widget/ui.errors"), require("../module_core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map