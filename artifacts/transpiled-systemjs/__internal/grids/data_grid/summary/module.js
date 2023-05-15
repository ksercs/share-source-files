!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/data_grid/summary/module.js"], ["../../../../core/renderer","../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/iterator","../../../../core/utils/extend","../../../../core/utils/data","../../../../localization/message","../../../../ui/grid_core/ui.grid_core.columns_view","../../../../data/query","../../../../data/store_helper","../../../../data/utils","../../../../ui/widget/ui.errors","../module_aggregate_calculator","../module_data_source_adapter","../module_core"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/data_grid/summary/module.js", ["../../../../core/renderer", "../../../../core/utils/common", "../../../../core/utils/type", "../../../../core/utils/iterator", "../../../../core/utils/extend", "../../../../core/utils/data", "../../../../localization/message", "../../../../ui/grid_core/ui.grid_core.columns_view", "../../../../data/query", "../../../../data/store_helper", "../../../../data/utils", "../../../../ui/widget/ui.errors", "../module_aggregate_calculator", "../module_data_source_adapter", "../module_core"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.renderSummaryCell = exports.FooterView = void 0;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _common = $__require("../../../../core/utils/common");
  var _type = $__require("../../../../core/utils/type");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _extend = $__require("../../../../core/utils/extend");
  var _data = $__require("../../../../core/utils/data");
  var _message = _interopRequireDefault($__require("../../../../localization/message"));
  var _uiGrid_core = $__require("../../../../ui/grid_core/ui.grid_core.columns_view");
  var _query = _interopRequireDefault($__require("../../../../data/query"));
  var _store_helper = _interopRequireDefault($__require("../../../../data/store_helper"));
  var _utils = $__require("../../../../data/utils");
  var _ui = _interopRequireDefault($__require("../../../../ui/widget/ui.errors"));
  var _module_aggregate_calculator = _interopRequireDefault($__require("../module_aggregate_calculator"));
  var _module_data_source_adapter = _interopRequireDefault($__require("../module_data_source_adapter"));
  var _module_core = _interopRequireDefault($__require("../module_core"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // @ts-expect-error

  var DATAGRID_TOTAL_FOOTER_CLASS = 'dx-datagrid-total-footer';
  var DATAGRID_SUMMARY_ITEM_CLASS = 'dx-datagrid-summary-item';
  var DATAGRID_TEXT_CONTENT_CLASS = 'dx-datagrid-text-content';
  var DATAGRID_GROUP_FOOTER_CLASS = 'dx-datagrid-group-footer';
  var DATAGRID_GROUP_TEXT_CONTENT_CLASS = 'dx-datagrid-group-text-content';
  var DATAGRID_NOWRAP_CLASS = 'dx-datagrid-nowrap';
  var DATAGRID_FOOTER_ROW_CLASS = 'dx-footer-row';
  var DATAGRID_GROUP_FOOTER_ROW_TYPE = 'groupFooter';
  var DATAGRID_TOTAL_FOOTER_ROW_TYPE = 'totalFooter';
  var renderSummaryCell = function renderSummaryCell(cell, options) {
    var $cell = (0, _renderer.default)(cell);
    var column = options.column;
    var summaryItems = options.summaryItems;
    var $summaryItems = [];
    if (!column.command && summaryItems) {
      for (var i = 0; i < summaryItems.length; i++) {
        var summaryItem = summaryItems[i];
        $summaryItems.push((0, _renderer.default)('<div>').css('textAlign', summaryItem.alignment || column.alignment).addClass(DATAGRID_SUMMARY_ITEM_CLASS).addClass(DATAGRID_TEXT_CONTENT_CLASS).addClass(summaryItem.cssClass).toggleClass(DATAGRID_GROUP_TEXT_CONTENT_CLASS, options.rowType === 'group').text(_module_core.default.getSummaryText(summaryItem, options.summaryTexts)));
      }
      $cell.append($summaryItems);
    }
  };
  exports.renderSummaryCell = renderSummaryCell;
  var getSummaryCellOptions = function getSummaryCellOptions(that, options) {
    var summaryTexts = that.option('summary.texts') || {};
    return {
      totalItem: options.row,
      summaryItems: options.row.summaryCells[options.columnIndex],
      summaryTexts: summaryTexts
    };
  };
  var getGroupAggregates = function getGroupAggregates(data) {
    return data.summary || data.aggregates || [];
  };
  var recalculateWhileEditing = function recalculateWhileEditing(that) {
    return that.option('summary.recalculateWhileEditing');
  };
  var FooterView = _uiGrid_core.ColumnsView.inherit(function () {
    return {
      _getRows: function _getRows() {
        return this._dataController.footerItems();
      },
      _getCellOptions: function _getCellOptions(options) {
        return (0, _extend.extend)(this.callBase(options), getSummaryCellOptions(this, options));
      },
      _renderCellContent: function _renderCellContent($cell, options) {
        renderSummaryCell($cell, options);
        this.callBase.apply(this, arguments);
      },
      _renderCore: function _renderCore(change) {
        var needUpdateScrollLeft = false;
        var totalItem = this._dataController.footerItems()[0];
        if (!change || !change.columnIndices) {
          this.element().empty().addClass(DATAGRID_TOTAL_FOOTER_CLASS).toggleClass(DATAGRID_NOWRAP_CLASS, !this.option('wordWrapEnabled'));
          needUpdateScrollLeft = true;
        }
        if (totalItem && totalItem.summaryCells && totalItem.summaryCells.length) {
          this._updateContent(this._renderTable({
            change: change
          }), change);
          needUpdateScrollLeft && this._updateScrollLeftPosition();
        }
      },
      _updateContent: function _updateContent($newTable, change) {
        var _this = this;
        if (change && change.changeType === 'update' && change.columnIndices) {
          return this.waitAsyncTemplates().done(function () {
            var $row = _this.getTableElement().find('.dx-row');
            var $newRow = $newTable.find('.dx-row');
            _this._updateCells($row, $newRow, change.columnIndices[0]);
          });
        }
        return this.callBase.apply(this, arguments);
      },
      _rowClick: function _rowClick(e) {
        var item = this._dataController.footerItems()[e.rowIndex] || {};
        this.executeAction('onRowClick', (0, _extend.extend)({}, e, item));
      },
      _columnOptionChanged: function _columnOptionChanged(e) {
        var optionNames = e.optionNames;
        if (e.changeTypes.grouping) return;
        if (optionNames.width || optionNames.visibleWidth) {
          this.callBase(e);
        }
      },
      _handleDataChanged: function _handleDataChanged(e) {
        var changeType = e.changeType;
        if (e.changeType === 'update' && e.repaintChangesOnly) {
          if (!e.totalColumnIndices) {
            this.render();
          } else if (e.totalColumnIndices.length) {
            this.render(null, {
              changeType: 'update',
              columnIndices: [e.totalColumnIndices]
            });
          }
        } else if (changeType === 'refresh' || changeType === 'append' || changeType === 'prepend') {
          this.render();
        }
      },
      _createRow: function _createRow(row) {
        var $row = this.callBase.apply(this, arguments);
        if (row.rowType === DATAGRID_TOTAL_FOOTER_ROW_TYPE) {
          $row.addClass(DATAGRID_FOOTER_ROW_CLASS);
        }
        return $row;
      },
      getHeight: function getHeight() {
        return this.getElementHeight();
      },
      isVisible: function isVisible() {
        return !!this._dataController.footerItems().length;
      }
    };
  }());
  exports.FooterView = FooterView;
  var SummaryDataSourceAdapterExtender = function () {
    function forEachGroup(groups, groupCount, callback, path) {
      path = path || [];
      for (var i = 0; i < groups.length; i++) {
        path.push(groups[i].key);
        if (groupCount === 1) {
          callback(path, groups[i].items);
        } else {
          forEachGroup(groups[i].items, groupCount - 1, callback, path);
        }
        path.pop();
      }
    }
    return {
      init: function init() {
        this.callBase.apply(this, arguments);
        this._totalAggregates = [];
        this._summaryGetter = _common.noop;
      },
      summaryGetter: function summaryGetter(_summaryGetter) {
        if (!arguments.length) {
          return this._summaryGetter;
        }
        if ((0, _type.isFunction)(_summaryGetter)) {
          this._summaryGetter = _summaryGetter;
        }
      },
      summary: function summary(_summary) {
        if (!arguments.length) {
          return this._summaryGetter();
        }
        this._summaryGetter = function () {
          return _summary;
        };
      },
      totalAggregates: function totalAggregates() {
        return this._totalAggregates;
      },
      isLastLevelGroupItemsPagingLocal: function isLastLevelGroupItemsPagingLocal() {
        var summary = this.summary();
        var sortByGroupsInfo = summary && summary.sortByGroups();
        return sortByGroupsInfo && sortByGroupsInfo.length;
      },
      sortLastLevelGroupItems: function sortLastLevelGroupItems(items, groups, paths) {
        var groupedItems = _store_helper.default.multiLevelGroup((0, _query.default)(items), groups).toArray();
        var result = [];
        paths.forEach(function (path) {
          forEachGroup(groupedItems, groups.length, function (itemsPath, items) {
            if (path.toString() === itemsPath.toString()) {
              result = result.concat(items);
            }
          });
        });
        return result;
      }
    };
  }();
  var SummaryDataSourceAdapterClientExtender = function () {
    var applyAddedData = function applyAddedData(data, insertedData, groupLevel) {
      if (groupLevel) {
        return applyAddedData(data, insertedData.map(function (item) {
          return {
            items: [item]
          };
        }, groupLevel - 1));
      }
      return data.concat(insertedData);
    };
    var applyRemovedData = function applyRemovedData(data, removedData, groupLevel) {
      if (groupLevel) {
        return data.map(function (data) {
          var updatedData = {};
          var updatedItems = applyRemovedData(data.items || [], removedData, groupLevel - 1);
          Object.defineProperty(updatedData, 'aggregates', {
            get: function get() {
              return data.aggregates;
            },
            set: function set(value) {
              data.aggregates = value;
            }
          });
          return (0, _extend.extend)(updatedData, data, {
            items: updatedItems
          });
        });
      }
      return data.filter(function (data) {
        return removedData.indexOf(data) < 0;
      });
    };
    var calculateAggregates = function calculateAggregates(that, summary, data, groupLevel) {
      var calculator;
      if (recalculateWhileEditing(that)) {
        var editingController = that.getController('editing');
        if (editingController) {
          var insertedData = editingController.getInsertedData();
          if (insertedData.length) {
            data = applyAddedData(data, insertedData, groupLevel);
          }
          var removedData = editingController.getRemovedData();
          if (removedData.length) {
            data = applyRemovedData(data, removedData, groupLevel);
          }
        }
      }
      if (summary) {
        calculator = new _module_aggregate_calculator.default({
          totalAggregates: summary.totalAggregates,
          groupAggregates: summary.groupAggregates,
          data: data,
          groupLevel: groupLevel
        });
        calculator.calculate();
      }
      return calculator ? calculator.totalAggregates() : [];
    };
    var sortGroupsBySummaryCore = function sortGroupsBySummaryCore(items, groups, sortByGroups) {
      if (!items || !groups.length) return items;
      var group = groups[0];
      var sorts = sortByGroups[0];
      var query;
      if (group && sorts && sorts.length) {
        query = (0, _query.default)(items);
        (0, _iterator.each)(sorts, function (index) {
          if (index === 0) {
            query = query.sortBy(this.selector, this.desc);
          } else {
            query = query.thenBy(this.selector, this.desc);
          }
        });
        query.enumerate().done(function (sortedItems) {
          items = sortedItems;
        });
      }
      groups = groups.slice(1);
      sortByGroups = sortByGroups.slice(1);
      if (groups.length && sortByGroups.length) {
        (0, _iterator.each)(items, function () {
          this.items = sortGroupsBySummaryCore(this.items, groups, sortByGroups);
        });
      }
      return items;
    };
    var sortGroupsBySummary = function sortGroupsBySummary(data, group, summary) {
      var sortByGroups = summary && summary.sortByGroups && summary.sortByGroups();
      if (sortByGroups && sortByGroups.length) {
        return sortGroupsBySummaryCore(data, group, sortByGroups);
      }
      return data;
    };
    return {
      _customizeRemoteOperations: function _customizeRemoteOperations(options) {
        var summary = this.summary();
        if (summary) {
          if (options.remoteOperations.summary) {
            if (!options.isCustomLoading || options.storeLoadOptions.isLoadingAll) {
              if (options.storeLoadOptions.group) {
                if (options.remoteOperations.grouping) {
                  options.storeLoadOptions.groupSummary = summary.groupAggregates;
                } else if (summary.groupAggregates.length) {
                  options.remoteOperations.paging = false;
                }
              }
              options.storeLoadOptions.totalSummary = summary.totalAggregates;
            }
          } else if (summary.totalAggregates.length || summary.groupAggregates.length && options.storeLoadOptions.group) {
            options.remoteOperations.paging = false;
          }
        }
        this.callBase.apply(this, arguments);
        var cachedExtra = options.cachedData.extra;
        if (cachedExtra && cachedExtra.summary && !options.isCustomLoading) {
          options.storeLoadOptions.totalSummary = undefined;
        }
      },
      _handleDataLoadedCore: function _handleDataLoadedCore(options) {
        var _a, _b;
        var that = this;
        var groups = (0, _utils.normalizeSortingInfo)(options.storeLoadOptions.group || options.loadOptions.group || []);
        var remoteOperations = options.remoteOperations || {};
        var summary = that.summaryGetter()(remoteOperations);
        if (!options.isCustomLoading || options.storeLoadOptions.isLoadingAll) {
          if (remoteOperations.summary) {
            if (!remoteOperations.paging && groups.length && summary) {
              if (!remoteOperations.grouping) {
                calculateAggregates(that, {
                  groupAggregates: summary.groupAggregates
                }, options.data, groups.length);
              }
              options.data = sortGroupsBySummary(options.data, groups, summary);
            }
          } else if (!remoteOperations.paging && summary) {
            var operationTypes = options.operationTypes || {};
            var hasOperations = Object.keys(operationTypes).some(function (type) {
              return operationTypes[type];
            });
            if (!hasOperations || !((_b = (_a = options.cachedData) === null || _a === void 0 ? void 0 : _a.extra) === null || _b === void 0 ? void 0 : _b.summary) || groups.length && summary.groupAggregates.length) {
              var totalAggregates = calculateAggregates(that, summary, options.data, groups.length);
              options.extra = (0, _type.isPlainObject)(options.extra) ? options.extra : {};
              options.extra.summary = totalAggregates;
              if (options.cachedData) {
                options.cachedData.extra = options.extra;
              }
            }
            options.data = sortGroupsBySummary(options.data, groups, summary);
          }
        }
        if (!options.isCustomLoading) {
          that._totalAggregates = options.extra && options.extra.summary || that._totalAggregates;
        }
        that.callBase(options);
      }
    };
  }();
  _module_data_source_adapter.default.extend(SummaryDataSourceAdapterExtender);
  _module_data_source_adapter.default.extend(SummaryDataSourceAdapterClientExtender);
  _module_core.default.registerModule('summary', {
    defaultOptions: function defaultOptions() {
      return {
        summary: {
          groupItems: undefined,
          totalItems: undefined,
          calculateCustomSummary: undefined,
          skipEmptyValues: true,
          recalculateWhileEditing: false,
          texts: {
            sum: _message.default.format('dxDataGrid-summarySum'),
            sumOtherColumn: _message.default.format('dxDataGrid-summarySumOtherColumn'),
            min: _message.default.format('dxDataGrid-summaryMin'),
            minOtherColumn: _message.default.format('dxDataGrid-summaryMinOtherColumn'),
            max: _message.default.format('dxDataGrid-summaryMax'),
            maxOtherColumn: _message.default.format('dxDataGrid-summaryMaxOtherColumn'),
            avg: _message.default.format('dxDataGrid-summaryAvg'),
            avgOtherColumn: _message.default.format('dxDataGrid-summaryAvgOtherColumn'),
            count: _message.default.format('dxDataGrid-summaryCount')
          }
        },
        sortByGroupSummaryInfo: undefined
      };
    },
    views: {
      footerView: FooterView
    },
    extenders: {
      controllers: {
        data: function () {
          return {
            _isDataColumn: function _isDataColumn(column) {
              return column && (!(0, _type.isDefined)(column.groupIndex) || column.showWhenGrouped);
            },
            _isGroupFooterVisible: function _isGroupFooterVisible() {
              var groupItems = this.option('summary.groupItems') || [];
              for (var i = 0; i < groupItems.length; i++) {
                var groupItem = groupItems[i];
                var column = this._columnsController.columnOption(groupItem.showInColumn || groupItem.column);
                if (groupItem.showInGroupFooter && this._isDataColumn(column)) {
                  return true;
                }
              }
              return false;
            },
            _processGroupItems: function _processGroupItems(items, groupCount, options) {
              var data = options && options.data;
              var result = this.callBase.apply(this, arguments);
              if (options) {
                if (options.isGroupFooterVisible === undefined) {
                  options.isGroupFooterVisible = this._isGroupFooterVisible();
                }
                if (data && data.items && options.isGroupFooterVisible && (options.collectContinuationItems || !data.isContinuationOnNextPage)) {
                  result.push({
                    rowType: DATAGRID_GROUP_FOOTER_ROW_TYPE,
                    key: options.path.slice(),
                    data: data,
                    groupIndex: options.path.length - 1,
                    values: []
                  });
                }
              }
              return result;
            },
            _processGroupItem: function _processGroupItem(groupItem, options) {
              var that = this;
              if (!options.summaryGroupItems) {
                options.summaryGroupItems = that.option('summary.groupItems') || [];
              }
              if (groupItem.rowType === 'group') {
                var groupColumnIndex = -1;
                var afterGroupColumnIndex = -1;
                (0, _iterator.each)(options.visibleColumns, function (visibleIndex) {
                  var prevColumn = options.visibleColumns[visibleIndex - 1];
                  if (groupItem.groupIndex === this.groupIndex) {
                    groupColumnIndex = this.index;
                  }
                  if (visibleIndex > 0 && prevColumn.command === 'expand' && this.command !== 'expand') {
                    afterGroupColumnIndex = this.index;
                  }
                });
                groupItem.summaryCells = this._calculateSummaryCells(options.summaryGroupItems, getGroupAggregates(groupItem.data), options.visibleColumns, function (summaryItem, column) {
                  if (summaryItem.showInGroupFooter) {
                    return -1;
                  }
                  if (summaryItem.alignByColumn && column && !(0, _type.isDefined)(column.groupIndex) && column.index !== afterGroupColumnIndex) {
                    return column.index;
                  }
                  return groupColumnIndex;
                }, true);
              }
              if (groupItem.rowType === DATAGRID_GROUP_FOOTER_ROW_TYPE) {
                groupItem.summaryCells = this._calculateSummaryCells(options.summaryGroupItems, getGroupAggregates(groupItem.data), options.visibleColumns, function (summaryItem, column) {
                  return summaryItem.showInGroupFooter && that._isDataColumn(column) ? column.index : -1;
                });
              }
              return groupItem;
            },
            _calculateSummaryCells: function _calculateSummaryCells(summaryItems, aggregates, visibleColumns, calculateTargetColumnIndex, isGroupRow) {
              var that = this;
              var summaryCells = [];
              var summaryCellsByColumns = {};
              (0, _iterator.each)(summaryItems, function (summaryIndex, summaryItem) {
                var column = that._columnsController.columnOption(summaryItem.column);
                var showInColumn = summaryItem.showInColumn && that._columnsController.columnOption(summaryItem.showInColumn) || column;
                var columnIndex = calculateTargetColumnIndex(summaryItem, showInColumn);
                if (columnIndex >= 0) {
                  if (!summaryCellsByColumns[columnIndex]) {
                    summaryCellsByColumns[columnIndex] = [];
                  }
                  var aggregate = aggregates[summaryIndex];
                  if (aggregate === aggregate) {
                    var valueFormat;
                    if ((0, _type.isDefined)(summaryItem.valueFormat)) {
                      valueFormat = summaryItem.valueFormat;
                    } else if (summaryItem.summaryType !== 'count') {
                      valueFormat = _module_core.default.getFormatByDataType(column && column.dataType);
                    }
                    summaryCellsByColumns[columnIndex].push((0, _extend.extend)({}, summaryItem, {
                      value: (0, _type.isString)(aggregate) && column && column.deserializeValue ? column.deserializeValue(aggregate) : aggregate,
                      valueFormat: valueFormat,
                      columnCaption: column && column.index !== columnIndex ? column.caption : undefined
                    }));
                  }
                }
              });
              if (!(0, _type.isEmptyObject)(summaryCellsByColumns)) {
                visibleColumns.forEach(function (column, visibleIndex) {
                  var prevColumn = visibleColumns[visibleIndex - 1];
                  var columnIndex = isGroupRow && ((prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.command) === 'expand' || column.command === 'expand') ? prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.index : column.index;
                  summaryCells.push(summaryCellsByColumns[columnIndex] || []);
                });
              }
              return summaryCells;
            },
            _getSummaryCells: function _getSummaryCells(summaryTotalItems, totalAggregates) {
              var that = this;
              var columnsController = that._columnsController;
              return that._calculateSummaryCells(summaryTotalItems, totalAggregates, columnsController.getVisibleColumns(), function (summaryItem, column) {
                return that._isDataColumn(column) ? column.index : -1;
              });
            },
            _updateItemsCore: function _updateItemsCore(change) {
              var that = this;
              var summaryCells;
              var dataSource = that._dataSource;
              var footerItems = that._footerItems;
              var oldSummaryCells = footerItems && footerItems[0] && footerItems[0].summaryCells;
              var summaryTotalItems = that.option('summary.totalItems');
              that._footerItems = [];
              if (dataSource && summaryTotalItems && summaryTotalItems.length) {
                var totalAggregates = dataSource.totalAggregates();
                summaryCells = that._getSummaryCells(summaryTotalItems, totalAggregates);
                if (change && change.repaintChangesOnly && oldSummaryCells) {
                  change.totalColumnIndices = summaryCells.map(function (summaryCell, index) {
                    if (JSON.stringify(summaryCell) !== JSON.stringify(oldSummaryCells[index])) {
                      return index;
                    }
                    return -1;
                  }).filter(function (index) {
                    return index >= 0;
                  });
                }
                if (summaryCells.length) {
                  that._footerItems.push({
                    rowType: DATAGRID_TOTAL_FOOTER_ROW_TYPE,
                    summaryCells: summaryCells
                  });
                }
              }
              that.callBase(change);
            },
            _prepareUnsavedDataSelector: function _prepareUnsavedDataSelector(selector) {
              var that = this;
              if (recalculateWhileEditing(that)) {
                var editingController = that.getController('editing');
                if (editingController) {
                  return function (data) {
                    data = editingController.getUpdatedData(data);
                    return selector(data);
                  };
                }
              }
              return selector;
            },
            _prepareAggregateSelector: function _prepareAggregateSelector(selector, aggregator) {
              selector = this._prepareUnsavedDataSelector(selector);
              if (aggregator === 'avg' || aggregator === 'sum') {
                return function (data) {
                  var value = selector(data);
                  return (0, _type.isDefined)(value) ? Number(value) : value;
                };
              }
              return selector;
            },
            _getAggregates: function _getAggregates(summaryItems, remoteOperations) {
              var that = this;
              var columnsController = that.getController('columns');
              var calculateCustomSummary = that.option('summary.calculateCustomSummary');
              var commonSkipEmptyValues = that.option('summary.skipEmptyValues');
              return (0, _iterator.map)(summaryItems || [], function (summaryItem) {
                var column = columnsController.columnOption(summaryItem.column);
                var calculateCellValue = column && column.calculateCellValue ? column.calculateCellValue.bind(column) : (0, _data.compileGetter)(column ? column.dataField : summaryItem.column);
                var aggregator = summaryItem.summaryType || 'count';
                var skipEmptyValues = (0, _type.isDefined)(summaryItem.skipEmptyValues) ? summaryItem.skipEmptyValues : commonSkipEmptyValues;
                if (remoteOperations) {
                  return {
                    selector: summaryItem.column,
                    summaryType: aggregator
                  };
                }
                var selector = that._prepareAggregateSelector(calculateCellValue, aggregator);
                if (aggregator === 'custom') {
                  if (!calculateCustomSummary) {
                    _ui.default.log('E1026');
                    calculateCustomSummary = function calculateCustomSummary() {};
                  }
                  var options = {
                    component: that.component,
                    name: summaryItem.name
                  };
                  calculateCustomSummary(options);
                  options.summaryProcess = 'calculate';
                  aggregator = {
                    seed: function seed(groupIndex) {
                      options.summaryProcess = 'start';
                      options.totalValue = undefined;
                      options.groupIndex = groupIndex;
                      delete options.value;
                      calculateCustomSummary(options);
                      return options.totalValue;
                    },
                    step: function step(totalValue, value) {
                      options.summaryProcess = 'calculate';
                      options.totalValue = totalValue;
                      options.value = value;
                      calculateCustomSummary(options);
                      return options.totalValue;
                    },
                    finalize: function finalize(totalValue) {
                      options.summaryProcess = 'finalize';
                      options.totalValue = totalValue;
                      delete options.value;
                      calculateCustomSummary(options);
                      return options.totalValue;
                    }
                  };
                }
                return {
                  selector: selector,
                  aggregator: aggregator,
                  skipEmptyValues: skipEmptyValues
                };
              });
            },
            _addSortInfo: function _addSortInfo(sortByGroups, groupColumn, selector, sortOrder) {
              if (groupColumn) {
                var groupIndex = groupColumn.groupIndex;
                sortOrder = sortOrder || groupColumn.sortOrder;
                if ((0, _type.isDefined)(groupIndex)) {
                  sortByGroups[groupIndex] = sortByGroups[groupIndex] || [];
                  sortByGroups[groupIndex].push({
                    selector: selector,
                    desc: sortOrder === 'desc'
                  });
                }
              }
            },
            _findSummaryItem: function _findSummaryItem(summaryItems, name) {
              var summaryItemIndex = -1;
              var getFullName = function getFullName(summaryItem) {
                var summaryType = summaryItem.summaryType;
                var column = summaryItem.column;
                return summaryType && column && "".concat(summaryType, "_").concat(column);
              };
              if ((0, _type.isDefined)(name)) {
                // @ts-expect-error
                (0, _iterator.each)(summaryItems || [], function (index) {
                  if (this.name === name || index === name || this.summaryType === name || this.column === name || getFullName(this) === name) {
                    summaryItemIndex = index;
                    return false;
                  }
                });
              }
              return summaryItemIndex;
            },
            _getSummarySortByGroups: function _getSummarySortByGroups(sortByGroupSummaryInfo, groupSummaryItems) {
              var that = this;
              var columnsController = that._columnsController;
              var groupColumns = columnsController.getGroupColumns();
              var sortByGroups = [];
              if (!groupSummaryItems || !groupSummaryItems.length) return;
              (0, _iterator.each)(sortByGroupSummaryInfo || [], function () {
                var sortOrder = this.sortOrder;
                var groupColumn = this.groupColumn;
                var summaryItemIndex = that._findSummaryItem(groupSummaryItems, this.summaryItem);
                if (summaryItemIndex < 0) return;
                var selector = function selector(data) {
                  return getGroupAggregates(data)[summaryItemIndex];
                };
                if ((0, _type.isDefined)(groupColumn)) {
                  groupColumn = columnsController.columnOption(groupColumn);
                  that._addSortInfo(sortByGroups, groupColumn, selector, sortOrder);
                } else {
                  (0, _iterator.each)(groupColumns, function (groupIndex, groupColumn) {
                    that._addSortInfo(sortByGroups, groupColumn, selector, sortOrder);
                  });
                }
              });
              return sortByGroups;
            },
            _createDataSourceAdapterCore: function _createDataSourceAdapterCore(dataSource, remoteOperations) {
              var that = this;
              var dataSourceAdapter = this.callBase(dataSource, remoteOperations);
              dataSourceAdapter.summaryGetter(function (currentRemoteOperations) {
                return that._getSummaryOptions(currentRemoteOperations || remoteOperations);
              });
              return dataSourceAdapter;
            },
            _getSummaryOptions: function _getSummaryOptions(remoteOperations) {
              var that = this;
              var groupSummaryItems = that.option('summary.groupItems');
              var totalSummaryItems = that.option('summary.totalItems');
              var sortByGroupSummaryInfo = that.option('sortByGroupSummaryInfo');
              var groupAggregates = that._getAggregates(groupSummaryItems, remoteOperations && remoteOperations.grouping && remoteOperations.summary);
              var totalAggregates = that._getAggregates(totalSummaryItems, remoteOperations && remoteOperations.summary);
              var sortByGroups = function sortByGroups() {
                return that._getSummarySortByGroups(sortByGroupSummaryInfo, groupSummaryItems);
              };
              if (groupAggregates.length || totalAggregates.length) {
                return {
                  groupAggregates: groupAggregates,
                  totalAggregates: totalAggregates,
                  sortByGroups: sortByGroups
                };
              }
              return undefined;
            },
            publicMethods: function publicMethods() {
              var methods = this.callBase();
              methods.push('getTotalSummaryValue');
              return methods;
            },
            getTotalSummaryValue: function getTotalSummaryValue(summaryItemName) {
              var summaryItemIndex = this._findSummaryItem(this.option('summary.totalItems'), summaryItemName);
              var aggregates = this._dataSource.totalAggregates();
              if (aggregates.length && summaryItemIndex > -1) {
                return aggregates[summaryItemIndex];
              }
            },
            optionChanged: function optionChanged(args) {
              if (args.name === 'summary' || args.name === 'sortByGroupSummaryInfo') {
                args.name = 'dataSource';
              }
              this.callBase(args);
            },
            init: function init() {
              this._footerItems = [];
              this.callBase();
            },
            footerItems: function footerItems() {
              return this._footerItems;
            }
          };
        }(),
        editing: function () {
          return {
            _refreshSummary: function _refreshSummary() {
              if (recalculateWhileEditing(this) && !this.isSaving()) {
                this._dataController.refresh({
                  load: true,
                  changesOnly: true
                });
              }
            },
            _addChange: function _addChange(params) {
              var result = this.callBase.apply(this, arguments);
              if (params.type) {
                this._refreshSummary();
              }
              return result;
            },
            _removeChange: function _removeChange() {
              var result = this.callBase.apply(this, arguments);
              this._refreshSummary();
              return result;
            },
            cancelEditData: function cancelEditData() {
              var result = this.callBase.apply(this, arguments);
              this._refreshSummary();
              return result;
            }
          };
        }()
      },
      views: {
        rowsView: function () {
          return {
            _createRow: function _createRow(row) {
              var $row = this.callBase.apply(this, arguments);
              row && $row.addClass(row.rowType === DATAGRID_GROUP_FOOTER_ROW_TYPE ? DATAGRID_GROUP_FOOTER_CLASS : '');
              return $row;
            },
            _renderCells: function _renderCells($row, options) {
              this.callBase.apply(this, arguments);
              if (options.row.rowType === 'group' && options.row.summaryCells && options.row.summaryCells.length) {
                this._renderGroupSummaryCells($row, options);
              }
            },
            _hasAlignByColumnSummaryItems: function _hasAlignByColumnSummaryItems(columnIndex, options) {
              return !(0, _type.isDefined)(options.columns[columnIndex].groupIndex) && options.row.summaryCells[columnIndex].length;
            },
            _getAlignByColumnCellCount: function _getAlignByColumnCellCount(groupCellColSpan, options) {
              var alignByColumnCellCount = 0;
              for (var i = 1; i < groupCellColSpan; i++) {
                var columnIndex = options.row.summaryCells.length - i;
                alignByColumnCellCount = this._hasAlignByColumnSummaryItems(columnIndex, options) ? i : alignByColumnCellCount;
              }
              return alignByColumnCellCount;
            },
            _renderGroupSummaryCells: function _renderGroupSummaryCells($row, options) {
              var $groupCell = $row.children().last();
              var groupCellColSpan = Number($groupCell.attr('colSpan')) || 1;
              var alignByColumnCellCount = this._getAlignByColumnCellCount(groupCellColSpan, options);
              this._renderGroupSummaryCellsCore($groupCell, options, groupCellColSpan, alignByColumnCellCount);
            },
            _renderGroupSummaryCellsCore: function _renderGroupSummaryCellsCore($groupCell, options, groupCellColSpan, alignByColumnCellCount) {
              if (alignByColumnCellCount > 0) {
                $groupCell.attr('colSpan', groupCellColSpan - alignByColumnCellCount);
                for (var i = 0; i < alignByColumnCellCount; i++) {
                  var columnIndex = options.columns.length - alignByColumnCellCount + i;
                  this._renderCell($groupCell.parent(), (0, _extend.extend)({
                    column: options.columns[columnIndex],
                    columnIndex: this._getSummaryCellIndex(columnIndex, options.columns)
                  }, options));
                }
              }
            },
            _getSummaryCellIndex: function _getSummaryCellIndex(columnIndex) {
              return columnIndex;
            },
            _getCellTemplate: function _getCellTemplate(options) {
              if (!options.column.command && !(0, _type.isDefined)(options.column.groupIndex) && options.summaryItems && options.summaryItems.length) {
                return renderSummaryCell;
              }
              return this.callBase(options);
            },
            _getCellOptions: function _getCellOptions(options) {
              var that = this;
              var parameters = that.callBase(options);
              if (options.row.summaryCells) {
                return (0, _extend.extend)(parameters, getSummaryCellOptions(that, options));
              }
              return parameters;
            }
          };
        }()
      }
    }
  });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/iterator","../../../../core/utils/extend","../../../../core/utils/data","../../../../localization/message","../../../../ui/grid_core/ui.grid_core.columns_view","../../../../data/query","../../../../data/store_helper","../../../../data/utils","../../../../ui/widget/ui.errors","../module_aggregate_calculator","../module_data_source_adapter","../module_core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../core/utils/common"), require("../../../../core/utils/type"), require("../../../../core/utils/iterator"), require("../../../../core/utils/extend"), require("../../../../core/utils/data"), require("../../../../localization/message"), require("../../../../ui/grid_core/ui.grid_core.columns_view"), require("../../../../data/query"), require("../../../../data/store_helper"), require("../../../../data/utils"), require("../../../../ui/widget/ui.errors"), require("../module_aggregate_calculator"), require("../module_data_source_adapter"), require("../module_core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map