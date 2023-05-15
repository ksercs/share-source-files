!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/grid_core/sorting/module.js"], ["../../../../core/renderer","../../../../events/core/events_engine","../../../../events/click","../../../../core/utils/type","../../../../core/utils/extend","../../../../ui/grid_core/ui.grid_core.sorting_mixin","../../../../localization/message","../../../../events/utils/index"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/grid_core/sorting/module.js", ["../../../../core/renderer", "../../../../events/core/events_engine", "../../../../events/click", "../../../../core/utils/type", "../../../../core/utils/extend", "../../../../ui/grid_core/ui.grid_core.sorting_mixin", "../../../../localization/message", "../../../../events/utils/index"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sortingModule = void 0;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../../../events/core/events_engine"));
  var _click = $__require("../../../../events/click");
  var _type = $__require("../../../../core/utils/type");
  var _extend = $__require("../../../../core/utils/extend");
  var _uiGrid_core = _interopRequireDefault($__require("../../../../ui/grid_core/ui.grid_core.sorting_mixin"));
  var _message = _interopRequireDefault($__require("../../../../localization/message"));
  var _index = $__require("../../../../events/utils/index");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var COLUMN_HEADERS_VIEW_NAMESPACE = 'dxDataGridColumnHeadersView';
  var ColumnHeadersViewSortingExtender = (0, _extend.extend)({}, _uiGrid_core.default, {
    _createRow: function _createRow(row) {
      var _this = this;
      var $row = this.callBase(row);
      if (row.rowType === 'header') {
        _events_engine.default.on($row, (0, _index.addNamespace)(_click.name, COLUMN_HEADERS_VIEW_NAMESPACE), 'td', this.createAction(function (e) {
          _this._processHeaderAction(e.event, $row);
        }));
      }
      return $row;
    },
    _processHeaderAction: function _processHeaderAction(event, $row) {
      if ((0, _renderer.default)(event.currentTarget).parent().get(0) !== $row.get(0)) {
        return;
      }
      var that = this;
      var keyName = null;
      var $cellElementFromEvent = (0, _renderer.default)(event.currentTarget);
      var rowIndex = $cellElementFromEvent.parent().index();
      var columnIndex = -1;
      // eslint-disable-next-line array-callback-return
      [].slice.call(that.getCellElements(rowIndex)).some(function ($cellElement, index) {
        if ($cellElement === $cellElementFromEvent.get(0)) {
          columnIndex = index;
          return true;
        }
        return undefined;
      });
      var visibleColumns = that._columnsController.getVisibleColumns(rowIndex);
      var column = visibleColumns[columnIndex];
      var editingController = that.getController('editing');
      var editingMode = that.option('editing.mode');
      var isCellEditing = editingController && editingController.isEditing() && (editingMode === 'batch' || editingMode === 'cell');
      if (isCellEditing || !that._isSortableElement((0, _renderer.default)(event.target))) {
        return;
      }
      if (column && !(0, _type.isDefined)(column.groupIndex) && !column.command) {
        if (event.shiftKey) {
          keyName = 'shift';
        } else if ((0, _index.isCommandKeyPressed)(event)) {
          keyName = 'ctrl';
        }
        setTimeout(function () {
          that._columnsController.changeSortOrder(column.index, keyName);
        });
      }
    },
    _renderCellContent: function _renderCellContent($cell, options) {
      var that = this;
      var column = options.column;
      if (!column.command && options.rowType === 'header') {
        that._applyColumnState({
          name: 'sort',
          rootElement: $cell,
          column: column,
          showColumnLines: that.option('showColumnLines')
        });
      }
      this.callBase.apply(this, arguments);
    },
    _columnOptionChanged: function _columnOptionChanged(e) {
      var changeTypes = e.changeTypes;
      if (changeTypes.length === 1 && changeTypes.sorting) {
        this._updateIndicators('sort');
        return;
      }
      this.callBase(e);
    },
    optionChanged: function optionChanged(args) {
      var that = this;
      switch (args.name) {
        case 'sorting':
          that._invalidate();
          args.handled = true;
          break;
        default:
          that.callBase(args);
      }
    }
  });
  var HeaderPanelSortingExtender = (0, _extend.extend)({}, _uiGrid_core.default, {
    _createGroupPanelItem: function _createGroupPanelItem($rootElement, groupColumn) {
      var that = this;
      var $item = that.callBase.apply(that, arguments);
      _events_engine.default.on($item, (0, _index.addNamespace)(_click.name, 'dxDataGridHeaderPanel'), that.createAction(function () {
        that._processGroupItemAction(groupColumn.index);
      }));
      that._applyColumnState({
        name: 'sort',
        rootElement: $item,
        column: {
          alignment: that.option('rtlEnabled') ? 'right' : 'left',
          allowSorting: groupColumn.allowSorting,
          sortOrder: groupColumn.sortOrder === 'desc' ? 'desc' : 'asc'
        },
        showColumnLines: true
      });
      return $item;
    },
    _processGroupItemAction: function _processGroupItemAction(groupColumnIndex) {
      var _this2 = this;
      setTimeout(function () {
        return _this2.getController('columns').changeSortOrder(groupColumnIndex);
      });
    },
    optionChanged: function optionChanged(args) {
      var that = this;
      switch (args.name) {
        case 'sorting':
          that._invalidate();
          args.handled = true;
          break;
        default:
          that.callBase(args);
      }
    }
  });
  var sortingModule = {
    defaultOptions: function defaultOptions() {
      return {
        sorting: {
          mode: 'single',
          ascendingText: _message.default.format('dxDataGrid-sortingAscendingText'),
          descendingText: _message.default.format('dxDataGrid-sortingDescendingText'),
          clearText: _message.default.format('dxDataGrid-sortingClearText'),
          showSortIndexes: true
        }
      };
    },
    extenders: {
      views: {
        columnHeadersView: ColumnHeadersViewSortingExtender,
        headerPanel: HeaderPanelSortingExtender
      }
    }
  };
  exports.sortingModule = sortingModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../events/core/events_engine","../../../../events/click","../../../../core/utils/type","../../../../core/utils/extend","../../../../ui/grid_core/ui.grid_core.sorting_mixin","../../../../localization/message","../../../../events/utils/index"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../events/core/events_engine"), require("../../../../events/click"), require("../../../../core/utils/type"), require("../../../../core/utils/extend"), require("../../../../ui/grid_core/ui.grid_core.sorting_mixin"), require("../../../../localization/message"), require("../../../../events/utils/index"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map