!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/grid_core/master_detail/module.js"], ["../../../../core/utils/size","../../../../core/renderer","../../../../core/utils/common","../../../../core/utils/iterator","../../../../core/utils/type","../../../../core/utils/deferred","../module_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/grid_core/master_detail/module.js", ["../../../../core/utils/size", "../../../../core/renderer", "../../../../core/utils/common", "../../../../core/utils/iterator", "../../../../core/utils/type", "../../../../core/utils/deferred", "../module_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.masterDetailModule = void 0;
  var _size = $__require("../../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _common = $__require("../../../../core/utils/common");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _type = $__require("../../../../core/utils/type");
  var _deferred = $__require("../../../../core/utils/deferred");
  var _module_utils = _interopRequireDefault($__require("../module_utils"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // @ts-expect-error

  var MASTER_DETAIL_CELL_CLASS = 'dx-master-detail-cell';
  var MASTER_DETAIL_ROW_CLASS = 'dx-master-detail-row';
  var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
  var ROW_LINES_CLASS = 'dx-row-lines';
  var masterDetailModule = {
    defaultOptions: function defaultOptions() {
      return {
        masterDetail: {
          enabled: false,
          autoExpandAll: false,
          template: null
        }
      };
    },
    extenders: {
      controllers: {
        columns: {
          _getExpandColumnsCore: function _getExpandColumnsCore() {
            var expandColumns = this.callBase();
            if (this.option('masterDetail.enabled')) {
              expandColumns.push({
                type: 'detailExpand',
                cellTemplate: _module_utils.default.getExpandCellTemplate()
              });
            }
            return expandColumns;
          }
        },
        data: function () {
          var initMasterDetail = function initMasterDetail(that) {
            that._expandedItems = [];
            that._isExpandAll = that.option('masterDetail.autoExpandAll');
          };
          return {
            init: function init() {
              var that = this;
              initMasterDetail(that);
              that.callBase();
            },
            expandAll: function expandAll(groupIndex) {
              var that = this;
              if (groupIndex < 0) {
                that._isExpandAll = true;
                that._expandedItems = [];
                that.updateItems();
              } else {
                that.callBase.apply(that, arguments);
              }
            },
            collapseAll: function collapseAll(groupIndex) {
              var that = this;
              if (groupIndex < 0) {
                that._isExpandAll = false;
                that._expandedItems = [];
                that.updateItems();
              } else {
                that.callBase.apply(that, arguments);
              }
            },
            isRowExpanded: function isRowExpanded(key) {
              var that = this;
              var expandIndex = _module_utils.default.getIndexByKey(key, that._expandedItems);
              if (Array.isArray(key)) {
                return that.callBase.apply(that, arguments);
              }
              return !!(that._isExpandAll ^ (expandIndex >= 0 && that._expandedItems[expandIndex].visible));
            },
            _getRowIndicesForExpand: function _getRowIndicesForExpand(key) {
              var rowIndex = this.getRowIndexByKey(key);
              return [rowIndex, rowIndex + 1];
            },
            _changeRowExpandCore: function _changeRowExpandCore(key) {
              var that = this;
              var result;
              if (Array.isArray(key)) {
                result = that.callBase.apply(that, arguments);
              } else {
                var expandIndex = _module_utils.default.getIndexByKey(key, that._expandedItems);
                if (expandIndex >= 0) {
                  var visible = that._expandedItems[expandIndex].visible;
                  that._expandedItems[expandIndex].visible = !visible;
                } else {
                  that._expandedItems.push({
                    key: key,
                    visible: true
                  });
                }
                that.updateItems({
                  changeType: 'update',
                  rowIndices: that._getRowIndicesForExpand(key)
                });
                // @ts-expect-error
                result = new _deferred.Deferred().resolve();
              }
              return result;
            },
            _processDataItem: function _processDataItem(data, options) {
              var that = this;
              var dataItem = that.callBase.apply(that, arguments);
              dataItem.isExpanded = that.isRowExpanded(dataItem.key);
              if (options.detailColumnIndex === undefined) {
                options.detailColumnIndex = -1;
                (0, _iterator.each)(options.visibleColumns, function (index, column) {
                  if (column.command === 'expand' && !(0, _type.isDefined)(column.groupIndex)) {
                    options.detailColumnIndex = index;
                    return false;
                  }
                  return undefined;
                });
              }
              if (options.detailColumnIndex >= 0) {
                dataItem.values[options.detailColumnIndex] = dataItem.isExpanded;
              }
              return dataItem;
            },
            _processItems: function _processItems(items, change) {
              var that = this;
              var changeType = change.changeType;
              var result = [];
              items = that.callBase.apply(that, arguments);
              if (changeType === 'loadingAll') {
                return items;
              }
              if (changeType === 'refresh') {
                that._expandedItems = (0, _common.grep)(that._expandedItems, function (item) {
                  return item.visible;
                });
              }
              (0, _iterator.each)(items, function (index, item) {
                result.push(item);
                var expandIndex = _module_utils.default.getIndexByKey(item.key, that._expandedItems);
                if (item.rowType === 'data' && (item.isExpanded || expandIndex >= 0) && !item.isNewRow) {
                  result.push({
                    visible: item.isExpanded,
                    rowType: 'detail',
                    key: item.key,
                    data: item.data,
                    values: []
                  });
                }
              });
              return result;
            },
            optionChanged: function optionChanged(args) {
              var that = this;
              var isEnabledChanged;
              var isAutoExpandAllChanged;
              if (args.name === 'masterDetail') {
                args.name = 'dataSource';
                // eslint-disable-next-line default-case
                switch (args.fullName) {
                  case 'masterDetail':
                    {
                      var value = args.value || {};
                      var previousValue = args.previousValue || {};
                      isEnabledChanged = value.enabled !== previousValue.enabled;
                      isAutoExpandAllChanged = value.autoExpandAll !== previousValue.autoExpandAll;
                      break;
                    }
                  case 'masterDetail.template':
                    {
                      initMasterDetail(that);
                      break;
                    }
                  case 'masterDetail.enabled':
                    isEnabledChanged = true;
                    break;
                  case 'masterDetail.autoExpandAll':
                    isAutoExpandAllChanged = true;
                    break;
                }
                if (isEnabledChanged || isAutoExpandAllChanged) {
                  initMasterDetail(that);
                }
              }
              that.callBase(args);
            }
          };
        }(),
        resizing: {
          fireContentReadyAction: function fireContentReadyAction() {
            this.callBase.apply(this, arguments);
            this._updateParentDataGrids(this.component.$element());
          },
          _updateParentDataGrids: function _updateParentDataGrids($element) {
            var _this = this;
            var $masterDetailRow = $element.closest(".".concat(MASTER_DETAIL_ROW_CLASS));
            if ($masterDetailRow.length) {
              (0, _deferred.when)(this._updateMasterDataGrid($masterDetailRow, $element)).done(function () {
                _this._updateParentDataGrids($masterDetailRow.parent());
              });
            }
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _updateMasterDataGrid: function _updateMasterDataGrid($masterDetailRow, $detailElement) {
            var masterRowOptions = (0, _renderer.default)($masterDetailRow).data('options');
            var masterDataGrid = (0, _renderer.default)($masterDetailRow).closest(".".concat(this.getWidgetContainerClass())).parent().data('dxDataGrid');
            if (masterRowOptions && masterDataGrid) {
              return this._updateMasterDataGridCore(masterDataGrid, masterRowOptions);
            }
          },
          _updateMasterDataGridCore: function _updateMasterDataGridCore(masterDataGrid, masterRowOptions) {
            var d = (0, _deferred.Deferred)();
            if (masterDataGrid.getView('rowsView').isFixedColumns()) {
              this._updateFixedMasterDetailGrids(masterDataGrid, masterRowOptions.rowIndex, (0, _renderer.default)(masterRowOptions.rowElement)).done(d.resolve);
            } else {
              if (masterDataGrid.option('scrolling.useNative') === true) {
                masterDataGrid.updateDimensions().done(function () {
                  return d.resolve(true);
                });
                return;
              }
              var scrollable = masterDataGrid.getScrollable();
              if (scrollable) {
                // T607490
                scrollable === null || scrollable === void 0 ? void 0 : scrollable.update().done(function () {
                  return d.resolve();
                });
              } else {
                d.resolve();
              }
            }
            return d.promise();
          },
          _updateFixedMasterDetailGrids: function _updateFixedMasterDetailGrids(masterDataGrid, masterRowIndex, $detailElement) {
            var _this2 = this;
            var d = (0, _deferred.Deferred)();
            var $rows = (0, _renderer.default)(masterDataGrid.getRowElement(masterRowIndex));
            var $tables = (0, _renderer.default)(masterDataGrid.getView('rowsView').getTableElements());
            var rowsNotEqual = ($rows === null || $rows === void 0 ? void 0 : $rows.length) === 2 && (0, _size.getHeight)($rows.eq(0)) !== (0, _size.getHeight)($rows.eq(1));
            var tablesNotEqual = ($tables === null || $tables === void 0 ? void 0 : $tables.length) === 2 && (0, _size.getHeight)($tables.eq(0)) !== (0, _size.getHeight)($tables.eq(1));
            if (rowsNotEqual || tablesNotEqual) {
              var detailElementWidth = (0, _size.getWidth)($detailElement);
              masterDataGrid.updateDimensions().done(function () {
                var isDetailHorizontalScrollCanBeShown = _this2.option('columnAutoWidth') && masterDataGrid.option('scrolling.useNative') === true;
                var isDetailGridWidthChanged = isDetailHorizontalScrollCanBeShown && detailElementWidth !== (0, _size.getWidth)($detailElement);
                if (isDetailHorizontalScrollCanBeShown && isDetailGridWidthChanged) {
                  _this2.updateDimensions().done(function () {
                    return d.resolve(true);
                  });
                } else {
                  d.resolve(true);
                }
              });
              return d.promise();
            }
            return (0, _deferred.Deferred)().resolve();
          },
          _toggleBestFitMode: function _toggleBestFitMode(isBestFit) {
            this.callBase.apply(this, arguments);
            if (this.option('masterDetail.template')) {
              var $rowsTable = this._rowsView.getTableElement();
              if ($rowsTable) {
                $rowsTable.find('.dx-master-detail-cell').css('maxWidth', isBestFit ? 0 : '');
              }
            }
          }
        }
      },
      views: {
        rowsView: function () {
          return {
            _getCellTemplate: function _getCellTemplate(options) {
              var that = this;
              var column = options.column;
              var editingController = that.getController('editing');
              var isEditRow = editingController && editingController.isEditRow(options.rowIndex);
              var template;
              if (column.command === 'detail' && !isEditRow) {
                template = that.option('masterDetail.template') || {
                  allowRenderToDetachedContainer: false,
                  render: that._getDefaultTemplate(column)
                };
              } else {
                template = that.callBase.apply(that, arguments);
              }
              return template;
            },
            _isDetailRow: function _isDetailRow(row) {
              return row && row.rowType && row.rowType.indexOf('detail') === 0;
            },
            _createRow: function _createRow(row) {
              var $row = this.callBase.apply(this, arguments);
              if (row && this._isDetailRow(row)) {
                this.option('showRowLines') && $row.addClass(ROW_LINES_CLASS);
                $row.addClass(MASTER_DETAIL_ROW_CLASS);
                if ((0, _type.isDefined)(row.visible)) {
                  $row.toggle(row.visible);
                }
              }
              return $row;
            },
            _renderCells: function _renderCells($row, options) {
              var row = options.row;
              var $detailCell;
              var visibleColumns = this._columnsController.getVisibleColumns();
              if (row.rowType && this._isDetailRow(row)) {
                if (this._needRenderCell(0, options.columnIndices)) {
                  $detailCell = this._renderCell($row, {
                    value: null,
                    row: row,
                    rowIndex: row.rowIndex,
                    column: {
                      command: 'detail'
                    },
                    columnIndex: 0,
                    change: options.change
                  });
                  $detailCell.addClass(CELL_FOCUS_DISABLED_CLASS).addClass(MASTER_DETAIL_CELL_CLASS).attr('colSpan', visibleColumns.length);
                }
              } else {
                this.callBase.apply(this, arguments);
              }
            }
          };
        }()
      }
    }
  };
  exports.masterDetailModule = masterDetailModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/size","../../../../core/renderer","../../../../core/utils/common","../../../../core/utils/iterator","../../../../core/utils/type","../../../../core/utils/deferred","../module_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/size"), require("../../../../core/renderer"), require("../../../../core/utils/common"), require("../../../../core/utils/iterator"), require("../../../../core/utils/type"), require("../../../../core/utils/deferred"), require("../module_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map