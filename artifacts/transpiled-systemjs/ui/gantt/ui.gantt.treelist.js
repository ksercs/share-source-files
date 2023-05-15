!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/gantt/ui.gantt.treelist.js"], ["../../core/utils/size","../../core/renderer","../tree_list","../../core/utils/position","../../core/utils/type","./ui.gantt.helper","../../data/data_source/data_source","../../data/array_store","../../core/utils/data","./ui.gantt.treelist.nodes_state"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/gantt/ui.gantt.treelist.js", ["../../core/utils/size", "../../core/renderer", "../tree_list", "../../core/utils/position", "../../core/utils/type", "./ui.gantt.helper", "../../data/data_source/data_source", "../../data/array_store", "../../core/utils/data", "./ui.gantt.treelist.nodes_state"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.GanttTreeList = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _tree_list = _interopRequireDefault($__require("../tree_list"));
  var _position = $__require("../../core/utils/position");
  var _type = $__require("../../core/utils/type");
  var _uiGantt = $__require("./ui.gantt.helper");
  var _data_source = $__require("../../data/data_source/data_source");
  var _array_store = _interopRequireDefault($__require("../../data/array_store"));
  var _data2 = $__require("../../core/utils/data");
  var _uiGanttTreelist = $__require("./ui.gantt.treelist.nodes_state");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var GANTT_TASKS = 'tasks';
  var GANTT_COLLAPSABLE_ROW = 'dx-gantt-collapsable-row';
  var GANTT_DEFAULT_ROW_HEIGHT = 34;
  var GanttTreeList = /*#__PURE__*/function () {
    function GanttTreeList(gantt) {
      this._gantt = gantt;
      this._$treeList = this._gantt._$treeList;
    }
    var _proto = GanttTreeList.prototype;
    _proto.getTreeList = function getTreeList() {
      var _this = this;
      var _this$_gantt$option = this._gantt.option(GANTT_TASKS),
          keyExpr = _this$_gantt$option.keyExpr,
          parentIdExpr = _this$_gantt$option.parentIdExpr;
      this._treeList = this._gantt._createComponent(this._$treeList, _tree_list.default, {
        dataSource: this.createDataSource(this._gantt._tasksRaw, keyExpr),
        keyExpr: keyExpr,
        filterSyncEnabled: true,
        parentIdExpr: parentIdExpr,
        columns: this.getColumns(),
        columnResizingMode: 'nextColumn',
        height: this._getHeight(),
        width: this._gantt.option('taskListWidth'),
        selection: {
          mode: _uiGantt.GanttHelper.getSelectionMode(this._gantt.option('allowSelection'))
        },
        selectedRowKeys: _uiGantt.GanttHelper.getArrayFromOneElement(this._gantt.option('selectedRowKey')),
        sorting: this._gantt.option('sorting'),
        filterRow: this._gantt.option('filterRow'),
        headerFilter: this._gantt.option('headerFilter'),
        scrolling: {
          showScrollbar: 'onHover',
          mode: 'virtual'
        },
        allowColumnResizing: true,
        autoExpandAll: true,
        showRowLines: this._gantt.option('showRowLines'),
        rootValue: this._gantt.option('rootValue'),
        onContentReady: function onContentReady(e) {
          _this._onContentReady(e);
        },
        onSelectionChanged: function onSelectionChanged(e) {
          _this._onSelectionChanged(e);
        },
        onRowCollapsed: function onRowCollapsed(e) {
          _this._onRowCollapsed(e);
        },
        onRowExpanded: function onRowExpanded(e) {
          _this._onRowExpanded(e);
        },
        onRowPrepared: function onRowPrepared(e) {
          _this._onRowPrepared(e);
        },
        onContextMenuPreparing: function onContextMenuPreparing(e) {
          _this._onContextMenuPreparing(e);
        },
        onRowClick: function onRowClick(e) {
          _this.onRowClick(e);
        },
        onRowDblClick: function onRowDblClick(e) {
          _this.onRowDblClick(e);
        },
        onNodesInitialized: function onNodesInitialized(e) {
          _this._onNodesInitialized(e);
        },
        _disableDeprecationWarnings: true
      });
      return this._treeList;
    };
    _proto.onAfterTreeListCreate = function onAfterTreeListCreate() {
      if (this._postponedGanttInitRequired) {
        this._initGanttOnContentReady({
          component: this._treeList
        });
        delete this._postponedGanttInitRequired;
      }
    };
    _proto._onContentReady = function _onContentReady(e) {
      var hasTreeList = !!this._treeList;
      if (hasTreeList) {
        this._initGanttOnContentReady(e);
      } else {
        this._postponedGanttInitRequired = true;
      }
      this._gantt._onTreeListContentReady(e);
    };
    _proto._initGanttOnContentReady = function _initGanttOnContentReady(e) {
      if (e.component.getDataSource()) {
        this._gantt._initGanttView();
        this._initScrollSync(e.component);
      }
      this._gantt._sortAndFilter();
      this._gantt._sizeHelper.updateGanttRowHeights();
    };
    _proto._onSelectionChanged = function _onSelectionChanged(e) {
      var selectedRowKey = e.currentSelectedRowKeys[0];
      this._gantt._setGanttViewOption('selectedRowKey', selectedRowKey);
      this._gantt._setOptionWithoutOptionChange('selectedRowKey', selectedRowKey);
      this._gantt._actionsManager.raiseSelectionChangedAction(selectedRowKey);
    };
    _proto._onRowCollapsed = function _onRowCollapsed(e) {
      this._gantt._onTreeListRowExpandChanged(e, false);
    };
    _proto._onRowExpanded = function _onRowExpanded(e) {
      this._gantt._onTreeListRowExpandChanged(e, true);
    };
    _proto._onRowPrepared = function _onRowPrepared(e) {
      if (e.rowType === 'data' && e.node.children.length > 0) {
        (0, _renderer.default)(e.rowElement).addClass(GANTT_COLLAPSABLE_ROW);
      }
    };
    _proto._onContextMenuPreparing = function _onContextMenuPreparing(e) {
      var _e$row, _e$row2;
      if (e.target === 'header') {
        return;
      }
      if (((_e$row = e.row) === null || _e$row === void 0 ? void 0 : _e$row.rowType) === 'data') {
        this.setOption('selectedRowKeys', [e.row.data[this._gantt.option('tasks.keyExpr')]]);
      }
      e.items = [];
      var info = {
        cancel: false,
        event: e.event,
        type: 'task',
        key: (_e$row2 = e.row) === null || _e$row2 === void 0 ? void 0 : _e$row2.key,
        position: {
          x: e.event.pageX,
          y: e.event.pageY
        }
      };
      this._gantt._showPopupMenu(info);
    };
    _proto._getHeight = function _getHeight() {
      if ((0, _size.getHeight)(this._$treeList)) {
        return (0, _size.getHeight)(this._$treeList);
      }
      this._gantt._hasHeight = (0, _type.isDefined)(this._gantt.option('height')) && this._gantt.option('height') !== '';
      return this._gantt._hasHeight ? '100%' : '';
    };
    _proto._initScrollSync = function _initScrollSync(treeList) {
      var _this2 = this;
      var treeListScrollable = treeList.getScrollable();
      if (treeListScrollable) {
        treeListScrollable.off('scroll');
        treeListScrollable.on('scroll', function (e) {
          _this2._onScroll(e);
        });
      }
    };
    _proto._onScroll = function _onScroll(treeListScrollView) {
      var ganttViewTaskAreaContainer = this._gantt._ganttView.getTaskAreaContainer();
      if (ganttViewTaskAreaContainer.scrollTop !== treeListScrollView.component.scrollTop()) {
        ganttViewTaskAreaContainer.scrollTop = treeListScrollView.component.scrollTop();
      }
    };
    _proto._correctRowsViewRowHeight = function _correctRowsViewRowHeight(height) {
      var view = this._treeList._views && this._treeList._views['rowsView'];
      if ((view === null || view === void 0 ? void 0 : view._rowHeight) !== height) {
        view._rowHeight = height;
      }
    };
    _proto._skipUpdateTreeListDataSource = function _skipUpdateTreeListDataSource() {
      return this._gantt.option('validation.autoUpdateParentTasks');
    };
    _proto.selectRows = function selectRows(keys) {
      this.setOption('selectedRowKeys', keys);
    };
    _proto.scrollBy = function scrollBy(scrollTop) {
      var treeListScrollable = this._treeList.getScrollable();
      if (treeListScrollable) {
        var diff = scrollTop - treeListScrollable.scrollTop();
        if (diff !== 0) {
          treeListScrollable.scrollBy({
            left: 0,
            top: diff
          });
        }
      }
    };
    _proto.updateDataSource = function updateDataSource(data) {
      var forceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var forceCustomData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!this._skipUpdateTreeListDataSource() || forceUpdate) {
        this.setDataSource(data);
      } else if (forceCustomData) {
        var _data = this._treeList.option('dataSource');
        this._gantt._onParentTasksRecalculated(_data);
      }
    };
    _proto.setDataSource = function setDataSource(data) {
      this.setOption('dataSource', this.createDataSource(data));
    };
    _proto.createDataSource = function createDataSource(data, key) {
      return data && new _data_source.DataSource({
        store: new _array_store.default({
          data: data,
          key: key || this.getOption('keyExpr')
        })
      });
    };
    _proto.onRowClick = function onRowClick(e) {
      this._gantt._actionsManager.raiseTaskClickAction(e.key, e.event);
    };
    _proto.onRowDblClick = function onRowDblClick(e) {
      if (this._gantt._actionsManager.raiseTaskDblClickAction(e.key, e.event)) {
        this._gantt._ganttView._ganttViewCore.showTaskEditDialog();
      }
    };
    _proto.saveExpandedKeys = function saveExpandedKeys() {
      var treeList = this._treeList;
      var visibleRowCount = treeList === null || treeList === void 0 ? void 0 : treeList.getVisibleRows().length;
      if (visibleRowCount > 0) {
        var nodes = this.getAllNodes();
        var keys = this.getOption('expandedRowKeys');
        var hasExpandedRows = keys && nodes.length !== visibleRowCount;
        if (hasExpandedRows) {
          var state = this.getNodesState();
          state.applyNodes(nodes, this.getOption('rootValue'));
          state.saveExpandedState(keys);
        }
      }
    };
    _proto._onNodesInitialized = function _onNodesInitialized(e) {
      var state = this.getNodesState();
      var savedKeys = state.getExpandedKeys();
      var nodes = this.getAllNodes();
      state.applyNodes(nodes, this.getOption('rootValue'));
      var expandedKeys = state.getExpandedKeys();
      if (expandedKeys) {
        this.setOption('expandedRowKeys', expandedKeys);
      }
      if (this.isExpandedStateChanged(savedKeys, expandedKeys)) {
        var expandedState = nodes.reduce(function (previous, node) {
          previous[node.key] = expandedKeys ? expandedKeys.includes(node.key) : true;
          return previous;
        }, {});
        this._gantt._ganttView.applyTasksExpandedState(expandedState);
      }
      state.clear();
    };
    _proto.getNodesState = function getNodesState() {
      if (!this._nodeState) {
        this._nodeState = new _uiGanttTreelist.GanttTreeListNodesState();
      }
      return this._nodeState;
    };
    _proto.getAllNodes = function getAllNodes() {
      var treeList = this._treeList;
      var store = treeList === null || treeList === void 0 ? void 0 : treeList.getDataSource().store();
      var keyGetter = (0, _data2.compileGetter)(store === null || store === void 0 ? void 0 : store.key());
      return store ? store._array.map(function (item) {
        return treeList.getNodeByKey(keyGetter(item));
      }) : [];
    };
    _proto.isExpandedStateChanged = function isExpandedStateChanged(keys1, keys2) {
      if (keys1 === null && keys2 === null) {
        return false;
      }
      if ((keys1 === null || keys1 === void 0 ? void 0 : keys1.length) !== (keys2 === null || keys2 === void 0 ? void 0 : keys2.length)) {
        return true;
      }
      return keys1.some(function (key, index) {
        return key !== keys2[index];
      });
    };
    _proto.getOffsetHeight = function getOffsetHeight() {
      return this._gantt._treeList._$element.get(0).offsetHeight;
    };
    _proto.getRowHeight = function getRowHeight() {
      var $row = this._treeList._$element.find('.dx-data-row');
      var height = $row.length ? (0, _position.getBoundingRect)($row.last().get(0)).height : GANTT_DEFAULT_ROW_HEIGHT;
      if (!height) {
        height = GANTT_DEFAULT_ROW_HEIGHT;
      }
      this._correctRowsViewRowHeight(height);
      return height;
    };
    _proto.getHeaderHeight = function getHeaderHeight() {
      return (0, _position.getBoundingRect)(this._treeList._$element.find('.dx-treelist-headers').get(0)).height;
    };
    _proto.getColumns = function getColumns() {
      var columns = this._gantt.option('columns');
      if (columns) {
        for (var i = 0; i < columns.length; i++) {
          var column = columns[i];
          var isKeyColumn = column.dataField === this._gantt.option("".concat(GANTT_TASKS, ".keyExpr")) || column.dataField === this._gantt.option("".concat(GANTT_TASKS, ".parentIdExpr"));
          if (isKeyColumn && !column.dataType) {
            column.dataType = 'object';
          }
        }
      }
      return columns;
    };
    _proto.getSievedItems = function getSievedItems() {
      var rootNode = this._treeList.getRootNode();
      if (!rootNode) {
        return undefined;
      }
      var resultArray = [];
      _uiGantt.GanttHelper.convertTreeToList(rootNode, resultArray);
      var getters = _uiGantt.GanttHelper.compileGettersByOption(this._gantt.option(GANTT_TASKS));
      var validatedData = this._gantt._validateSourceData(GANTT_TASKS, resultArray);
      var mappedData = validatedData.map(_uiGantt.GanttHelper.prepareMapHandler(getters));
      return mappedData;
    };
    _proto.setOption = function setOption(optionName, value) {
      this._treeList && this._treeList.option(optionName, value);
    };
    _proto.getOption = function getOption(optionName) {
      var _this$_treeList;
      return (_this$_treeList = this._treeList) === null || _this$_treeList === void 0 ? void 0 : _this$_treeList.option(optionName);
    };
    _proto.onTaskInserted = function onTaskInserted(insertedId, parentId) {
      if ((0, _type.isDefined)(parentId)) {
        var expandedRowKeys = this.getOption('expandedRowKeys');
        if (expandedRowKeys.indexOf(parentId) === -1) {
          expandedRowKeys.push(parentId);
          this.setOption('expandedRowKeys', expandedRowKeys);
        }
      }
      this.selectRows(_uiGantt.GanttHelper.getArrayFromOneElement(insertedId));
      this.setOption('focusedRowKey', insertedId);
    };
    _proto.getDataSource = function getDataSource() {
      var _this$_treeList2;
      return (_this$_treeList2 = this._treeList) === null || _this$_treeList2 === void 0 ? void 0 : _this$_treeList2.getDataSource();
    };
    return GanttTreeList;
  }();
  exports.GanttTreeList = GanttTreeList;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../tree_list","../../core/utils/position","../../core/utils/type","./ui.gantt.helper","../../data/data_source/data_source","../../data/array_store","../../core/utils/data","./ui.gantt.treelist.nodes_state"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../tree_list"), require("../../core/utils/position"), require("../../core/utils/type"), require("./ui.gantt.helper"), require("../../data/data_source/data_source"), require("../../data/array_store"), require("../../core/utils/data"), require("./ui.gantt.treelist.nodes_state"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.gantt.treelist.js.map