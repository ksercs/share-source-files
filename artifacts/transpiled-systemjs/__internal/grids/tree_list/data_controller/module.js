!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/tree_list/data_controller/module.js"], ["../../../../core/utils/extend","../../../../core/utils/deferred","../../../../core/utils/common","../../../../ui/grid_core/ui.grid_core.data_controller","../module_core","../data_source_adapter/module"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/tree_list/data_controller/module.js", ["../../../../core/utils/extend", "../../../../core/utils/deferred", "../../../../core/utils/common", "../../../../ui/grid_core/ui.grid_core.data_controller", "../module_core", "../data_source_adapter/module"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataController = void 0;
  var _extend = $__require("../../../../core/utils/extend");
  var _deferred = $__require("../../../../core/utils/deferred");
  var _common = $__require("../../../../core/utils/common");
  var _uiGrid_core = $__require("../../../../ui/grid_core/ui.grid_core.data_controller");
  var _module_core = _interopRequireDefault($__require("../module_core"));
  var _module = _interopRequireDefault($__require("../data_source_adapter/module"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DataController = _uiGrid_core.dataControllerModule.controllers.data.inherit(function () {
    return {
      _getDataSourceAdapter: function _getDataSourceAdapter() {
        return _module.default;
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
        var _this = this;
        if (this._dataSource) {
          var args = {
            key: key
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
      isRowExpanded: function isRowExpanded(key, cache) {
        return this._dataSource && this._dataSource.isRowExpanded(key, cache);
      },
      expandRow: function expandRow(key) {
        if (!this.isRowExpanded(key)) {
          return this.changeRowExpand(key);
        }
        // @ts-expect-error
        return new _deferred.Deferred().resolve();
      },
      collapseRow: function collapseRow(key) {
        if (this.isRowExpanded(key)) {
          return this.changeRowExpand(key);
        }
        // @ts-expect-error
        return new _deferred.Deferred().resolve();
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
  exports.DataController = DataController;
  _module_core.default.registerModule('data', {
    defaultOptions: function defaultOptions() {
      return (0, _extend.extend)({}, _uiGrid_core.dataControllerModule.defaultOptions(), {
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/extend","../../../../core/utils/deferred","../../../../core/utils/common","../../../../ui/grid_core/ui.grid_core.data_controller","../module_core","../data_source_adapter/module"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/extend"), require("../../../../core/utils/deferred"), require("../../../../core/utils/common"), require("../../../../ui/grid_core/ui.grid_core.data_controller"), require("../module_core"), require("../data_source_adapter/module"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map