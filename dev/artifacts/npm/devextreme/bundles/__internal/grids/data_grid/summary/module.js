/**
* DevExtreme (bundles/__internal/grids/data_grid/summary/module.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterView = exports.renderSummaryCell = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var common_1 = require("../../../../core/utils/common");
var type_1 = require("../../../../core/utils/type");
var iterator_1 = require("../../../../core/utils/iterator");
var extend_1 = require("../../../../core/utils/extend");
var data_1 = require("../../../../core/utils/data");
var message_1 = __importDefault(require("../../../../localization/message"));
var ui_grid_core_columns_view_1 = require("../../../../ui/grid_core/ui.grid_core.columns_view");
var query_1 = __importDefault(require("../../../../data/query"));
var store_helper_1 = __importDefault(require("../../../../data/store_helper"));
// @ts-expect-error
var utils_1 = require("../../../../data/utils");
var ui_errors_1 = __importDefault(require("../../../../ui/widget/ui.errors"));
var module_aggregate_calculator_1 = __importDefault(require("../module_aggregate_calculator"));
var module_data_source_adapter_1 = __importDefault(require("../module_data_source_adapter"));
var module_core_1 = __importDefault(require("../module_core"));
var DATAGRID_TOTAL_FOOTER_CLASS = 'dx-datagrid-total-footer';
var DATAGRID_SUMMARY_ITEM_CLASS = 'dx-datagrid-summary-item';
var DATAGRID_TEXT_CONTENT_CLASS = 'dx-datagrid-text-content';
var DATAGRID_GROUP_FOOTER_CLASS = 'dx-datagrid-group-footer';
var DATAGRID_GROUP_TEXT_CONTENT_CLASS = 'dx-datagrid-group-text-content';
var DATAGRID_NOWRAP_CLASS = 'dx-datagrid-nowrap';
var DATAGRID_FOOTER_ROW_CLASS = 'dx-footer-row';
var DATAGRID_GROUP_FOOTER_ROW_TYPE = 'groupFooter';
var DATAGRID_TOTAL_FOOTER_ROW_TYPE = 'totalFooter';
var renderSummaryCell = function (cell, options) {
    var $cell = renderer_1.default(cell);
    var column = options.column;
    var summaryItems = options.summaryItems;
    var $summaryItems = [];
    if (!column.command && summaryItems) {
        for (var i = 0; i < summaryItems.length; i++) {
            var summaryItem = summaryItems[i];
            $summaryItems.push(renderer_1.default('<div>')
                .css('textAlign', summaryItem.alignment || column.alignment)
                .addClass(DATAGRID_SUMMARY_ITEM_CLASS)
                .addClass(DATAGRID_TEXT_CONTENT_CLASS)
                .addClass(summaryItem.cssClass)
                .toggleClass(DATAGRID_GROUP_TEXT_CONTENT_CLASS, options.rowType === 'group')
                .text(module_core_1.default.getSummaryText(summaryItem, options.summaryTexts)));
        }
        $cell.append($summaryItems);
    }
};
exports.renderSummaryCell = renderSummaryCell;
var getSummaryCellOptions = function (that, options) {
    var summaryTexts = that.option('summary.texts') || {};
    return {
        totalItem: options.row,
        summaryItems: options.row.summaryCells[options.columnIndex],
        summaryTexts: summaryTexts,
    };
};
var getGroupAggregates = function (data) {
    return data.summary || data.aggregates || [];
};
var recalculateWhileEditing = function (that) {
    return that.option('summary.recalculateWhileEditing');
};
exports.FooterView = ui_grid_core_columns_view_1.ColumnsView.inherit((function () {
    return {
        _getRows: function () {
            return this._dataController.footerItems();
        },
        _getCellOptions: function (options) {
            return extend_1.extend(this.callBase(options), getSummaryCellOptions(this, options));
        },
        _renderCellContent: function ($cell, options) {
            exports.renderSummaryCell($cell, options);
            this.callBase.apply(this, arguments);
        },
        _renderCore: function (change) {
            var needUpdateScrollLeft = false;
            var totalItem = this._dataController.footerItems()[0];
            if (!change || !change.columnIndices) {
                this.element()
                    .empty()
                    .addClass(DATAGRID_TOTAL_FOOTER_CLASS)
                    .toggleClass(DATAGRID_NOWRAP_CLASS, !this.option('wordWrapEnabled'));
                needUpdateScrollLeft = true;
            }
            if (totalItem && totalItem.summaryCells && totalItem.summaryCells.length) {
                this._updateContent(this._renderTable({ change: change }), change);
                needUpdateScrollLeft && this._updateScrollLeftPosition();
            }
        },
        _updateContent: function ($newTable, change) {
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
        _rowClick: function (e) {
            var item = this._dataController.footerItems()[e.rowIndex] || {};
            this.executeAction('onRowClick', extend_1.extend({}, e, item));
        },
        _columnOptionChanged: function (e) {
            var optionNames = e.optionNames;
            if (e.changeTypes.grouping)
                return;
            if (optionNames.width || optionNames.visibleWidth) {
                this.callBase(e);
            }
        },
        _handleDataChanged: function (e) {
            var changeType = e.changeType;
            if (e.changeType === 'update' && e.repaintChangesOnly) {
                if (!e.totalColumnIndices) {
                    this.render();
                }
                else if (e.totalColumnIndices.length) {
                    this.render(null, { changeType: 'update', columnIndices: [e.totalColumnIndices] });
                }
            }
            else if (changeType === 'refresh' || changeType === 'append' || changeType === 'prepend') {
                this.render();
            }
        },
        _createRow: function (row) {
            var $row = this.callBase.apply(this, arguments);
            if (row.rowType === DATAGRID_TOTAL_FOOTER_ROW_TYPE) {
                $row.addClass(DATAGRID_FOOTER_ROW_CLASS);
            }
            return $row;
        },
        getHeight: function () {
            return this.getElementHeight();
        },
        isVisible: function () {
            return !!this._dataController.footerItems().length;
        },
    };
})());
var SummaryDataSourceAdapterExtender = (function () {
    function forEachGroup(groups, groupCount, callback, path) {
        path = path || [];
        for (var i = 0; i < groups.length; i++) {
            path.push(groups[i].key);
            if (groupCount === 1) {
                callback(path, groups[i].items);
            }
            else {
                forEachGroup(groups[i].items, groupCount - 1, callback, path);
            }
            path.pop();
        }
    }
    return {
        init: function () {
            this.callBase.apply(this, arguments);
            this._totalAggregates = [];
            this._summaryGetter = common_1.noop;
        },
        summaryGetter: function (summaryGetter) {
            if (!arguments.length) {
                return this._summaryGetter;
            }
            if (type_1.isFunction(summaryGetter)) {
                this._summaryGetter = summaryGetter;
            }
        },
        summary: function (summary) {
            if (!arguments.length) {
                return this._summaryGetter();
            }
            this._summaryGetter = function () { return summary; };
        },
        totalAggregates: function () {
            return this._totalAggregates;
        },
        isLastLevelGroupItemsPagingLocal: function () {
            var summary = this.summary();
            var sortByGroupsInfo = summary && summary.sortByGroups();
            return sortByGroupsInfo && sortByGroupsInfo.length;
        },
        sortLastLevelGroupItems: function (items, groups, paths) {
            var groupedItems = store_helper_1.default.multiLevelGroup(query_1.default(items), groups).toArray();
            var result = [];
            paths.forEach(function (path) {
                forEachGroup(groupedItems, groups.length, function (itemsPath, items) {
                    if (path.toString() === itemsPath.toString()) {
                        result = result.concat(items);
                    }
                });
            });
            return result;
        },
    };
}());
var SummaryDataSourceAdapterClientExtender = (function () {
    var applyAddedData = function (data, insertedData, groupLevel) {
        if (groupLevel) {
            return applyAddedData(data, insertedData.map(function (item) { return ({ items: [item] }); }, groupLevel - 1));
        }
        return data.concat(insertedData);
    };
    var applyRemovedData = function (data, removedData, groupLevel) {
        if (groupLevel) {
            return data.map(function (data) {
                var updatedData = {};
                var updatedItems = applyRemovedData(data.items || [], removedData, groupLevel - 1);
                Object.defineProperty(updatedData, 'aggregates', {
                    get: function () { return data.aggregates; },
                    set: function (value) {
                        data.aggregates = value;
                    },
                });
                return extend_1.extend(updatedData, data, { items: updatedItems });
            });
        }
        return data.filter(function (data) { return removedData.indexOf(data) < 0; });
    };
    var calculateAggregates = function (that, summary, data, groupLevel) {
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
            calculator = new module_aggregate_calculator_1.default({
                totalAggregates: summary.totalAggregates,
                groupAggregates: summary.groupAggregates,
                data: data,
                groupLevel: groupLevel,
            });
            calculator.calculate();
        }
        return calculator ? calculator.totalAggregates() : [];
    };
    var sortGroupsBySummaryCore = function (items, groups, sortByGroups) {
        if (!items || !groups.length)
            return items;
        var group = groups[0];
        var sorts = sortByGroups[0];
        var query;
        if (group && sorts && sorts.length) {
            query = query_1.default(items);
            iterator_1.each(sorts, function (index) {
                if (index === 0) {
                    query = query.sortBy(this.selector, this.desc);
                }
                else {
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
            iterator_1.each(items, function () {
                this.items = sortGroupsBySummaryCore(this.items, groups, sortByGroups);
            });
        }
        return items;
    };
    var sortGroupsBySummary = function (data, group, summary) {
        var sortByGroups = summary && summary.sortByGroups && summary.sortByGroups();
        if (sortByGroups && sortByGroups.length) {
            return sortGroupsBySummaryCore(data, group, sortByGroups);
        }
        return data;
    };
    return {
        _customizeRemoteOperations: function (options) {
            var summary = this.summary();
            if (summary) {
                if (options.remoteOperations.summary) {
                    if (!options.isCustomLoading || options.storeLoadOptions.isLoadingAll) {
                        if (options.storeLoadOptions.group) {
                            if (options.remoteOperations.grouping) {
                                options.storeLoadOptions.groupSummary = summary.groupAggregates;
                            }
                            else if (summary.groupAggregates.length) {
                                options.remoteOperations.paging = false;
                            }
                        }
                        options.storeLoadOptions.totalSummary = summary.totalAggregates;
                    }
                }
                else if (summary.totalAggregates.length || (summary.groupAggregates.length && options.storeLoadOptions.group)) {
                    options.remoteOperations.paging = false;
                }
            }
            this.callBase.apply(this, arguments);
            var cachedExtra = options.cachedData.extra;
            if (cachedExtra && cachedExtra.summary && !options.isCustomLoading) {
                options.storeLoadOptions.totalSummary = undefined;
            }
        },
        _handleDataLoadedCore: function (options) {
            var _a, _b;
            var that = this;
            var groups = utils_1.normalizeSortingInfo(options.storeLoadOptions.group || options.loadOptions.group || []);
            var remoteOperations = options.remoteOperations || {};
            var summary = that.summaryGetter()(remoteOperations);
            if (!options.isCustomLoading || options.storeLoadOptions.isLoadingAll) {
                if (remoteOperations.summary) {
                    if (!remoteOperations.paging && groups.length && summary) {
                        if (!remoteOperations.grouping) {
                            calculateAggregates(that, { groupAggregates: summary.groupAggregates }, options.data, groups.length);
                        }
                        options.data = sortGroupsBySummary(options.data, groups, summary);
                    }
                }
                else if (!remoteOperations.paging && summary) {
                    var operationTypes_1 = options.operationTypes || {};
                    var hasOperations = Object.keys(operationTypes_1).some(function (type) { return operationTypes_1[type]; });
                    if (!hasOperations || !((_b = (_a = options.cachedData) === null || _a === void 0 ? void 0 : _a.extra) === null || _b === void 0 ? void 0 : _b.summary) || groups.length && summary.groupAggregates.length) {
                        var totalAggregates = calculateAggregates(that, summary, options.data, groups.length);
                        options.extra = type_1.isPlainObject(options.extra) ? options.extra : {};
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
        },
    };
}());
module_data_source_adapter_1.default.extend(SummaryDataSourceAdapterExtender);
module_data_source_adapter_1.default.extend(SummaryDataSourceAdapterClientExtender);
module_core_1.default.registerModule('summary', {
    defaultOptions: function () {
        return {
            summary: {
                groupItems: undefined,
                totalItems: undefined,
                calculateCustomSummary: undefined,
                skipEmptyValues: true,
                recalculateWhileEditing: false,
                texts: {
                    sum: message_1.default.format('dxDataGrid-summarySum'),
                    sumOtherColumn: message_1.default.format('dxDataGrid-summarySumOtherColumn'),
                    min: message_1.default.format('dxDataGrid-summaryMin'),
                    minOtherColumn: message_1.default.format('dxDataGrid-summaryMinOtherColumn'),
                    max: message_1.default.format('dxDataGrid-summaryMax'),
                    maxOtherColumn: message_1.default.format('dxDataGrid-summaryMaxOtherColumn'),
                    avg: message_1.default.format('dxDataGrid-summaryAvg'),
                    avgOtherColumn: message_1.default.format('dxDataGrid-summaryAvgOtherColumn'),
                    count: message_1.default.format('dxDataGrid-summaryCount'),
                },
            },
            sortByGroupSummaryInfo: undefined,
        };
    },
    views: {
        footerView: exports.FooterView,
    },
    extenders: {
        controllers: {
            data: (function () {
                return {
                    _isDataColumn: function (column) {
                        return column && (!type_1.isDefined(column.groupIndex) || column.showWhenGrouped);
                    },
                    _isGroupFooterVisible: function () {
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
                    _processGroupItems: function (items, groupCount, options) {
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
                                    values: [],
                                });
                            }
                        }
                        return result;
                    },
                    _processGroupItem: function (groupItem, options) {
                        var that = this;
                        if (!options.summaryGroupItems) {
                            options.summaryGroupItems = that.option('summary.groupItems') || [];
                        }
                        if (groupItem.rowType === 'group') {
                            var groupColumnIndex_1 = -1;
                            var afterGroupColumnIndex_1 = -1;
                            iterator_1.each(options.visibleColumns, function (visibleIndex) {
                                var prevColumn = options.visibleColumns[visibleIndex - 1];
                                if (groupItem.groupIndex === this.groupIndex) {
                                    groupColumnIndex_1 = this.index;
                                }
                                if (visibleIndex > 0 && prevColumn.command === 'expand' && this.command !== 'expand') {
                                    afterGroupColumnIndex_1 = this.index;
                                }
                            });
                            groupItem.summaryCells = this._calculateSummaryCells(options.summaryGroupItems, getGroupAggregates(groupItem.data), options.visibleColumns, function (summaryItem, column) {
                                if (summaryItem.showInGroupFooter) {
                                    return -1;
                                }
                                if (summaryItem.alignByColumn && column && !type_1.isDefined(column.groupIndex) && (column.index !== afterGroupColumnIndex_1)) {
                                    return column.index;
                                }
                                return groupColumnIndex_1;
                            }, true);
                        }
                        if (groupItem.rowType === DATAGRID_GROUP_FOOTER_ROW_TYPE) {
                            groupItem.summaryCells = this._calculateSummaryCells(options.summaryGroupItems, getGroupAggregates(groupItem.data), options.visibleColumns, function (summaryItem, column) { return (summaryItem.showInGroupFooter && that._isDataColumn(column) ? column.index : -1); });
                        }
                        return groupItem;
                    },
                    _calculateSummaryCells: function (summaryItems, aggregates, visibleColumns, calculateTargetColumnIndex, isGroupRow) {
                        var that = this;
                        var summaryCells = [];
                        var summaryCellsByColumns = {};
                        iterator_1.each(summaryItems, function (summaryIndex, summaryItem) {
                            var column = that._columnsController.columnOption(summaryItem.column);
                            var showInColumn = summaryItem.showInColumn && that._columnsController.columnOption(summaryItem.showInColumn) || column;
                            var columnIndex = calculateTargetColumnIndex(summaryItem, showInColumn);
                            if (columnIndex >= 0) {
                                if (!summaryCellsByColumns[columnIndex]) {
                                    summaryCellsByColumns[columnIndex] = [];
                                }
                                var aggregate = aggregates[summaryIndex];
                                if (aggregate === aggregate) {
                                    var valueFormat = void 0;
                                    if (type_1.isDefined(summaryItem.valueFormat)) {
                                        valueFormat = summaryItem.valueFormat;
                                    }
                                    else if (summaryItem.summaryType !== 'count') {
                                        valueFormat = module_core_1.default.getFormatByDataType(column && column.dataType);
                                    }
                                    summaryCellsByColumns[columnIndex].push(extend_1.extend({}, summaryItem, {
                                        value: type_1.isString(aggregate) && column && column.deserializeValue ? column.deserializeValue(aggregate) : aggregate,
                                        valueFormat: valueFormat,
                                        columnCaption: column && column.index !== columnIndex ? column.caption : undefined,
                                    }));
                                }
                            }
                        });
                        if (!type_1.isEmptyObject(summaryCellsByColumns)) {
                            visibleColumns.forEach(function (column, visibleIndex) {
                                var prevColumn = visibleColumns[visibleIndex - 1];
                                var columnIndex = isGroupRow && ((prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.command) === 'expand' || column.command === 'expand') ? prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.index : column.index;
                                summaryCells.push(summaryCellsByColumns[columnIndex] || []);
                            });
                        }
                        return summaryCells;
                    },
                    _getSummaryCells: function (summaryTotalItems, totalAggregates) {
                        var that = this;
                        var columnsController = that._columnsController;
                        return that._calculateSummaryCells(summaryTotalItems, totalAggregates, columnsController.getVisibleColumns(), function (summaryItem, column) { return (that._isDataColumn(column) ? column.index : -1); });
                    },
                    _updateItemsCore: function (change) {
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
                                }).filter(function (index) { return index >= 0; });
                            }
                            if (summaryCells.length) {
                                that._footerItems.push({
                                    rowType: DATAGRID_TOTAL_FOOTER_ROW_TYPE,
                                    summaryCells: summaryCells,
                                });
                            }
                        }
                        that.callBase(change);
                    },
                    _prepareUnsavedDataSelector: function (selector) {
                        var that = this;
                        if (recalculateWhileEditing(that)) {
                            var editingController_1 = that.getController('editing');
                            if (editingController_1) {
                                return function (data) {
                                    data = editingController_1.getUpdatedData(data);
                                    return selector(data);
                                };
                            }
                        }
                        return selector;
                    },
                    _prepareAggregateSelector: function (selector, aggregator) {
                        selector = this._prepareUnsavedDataSelector(selector);
                        if (aggregator === 'avg' || aggregator === 'sum') {
                            return function (data) {
                                var value = selector(data);
                                return type_1.isDefined(value) ? Number(value) : value;
                            };
                        }
                        return selector;
                    },
                    _getAggregates: function (summaryItems, remoteOperations) {
                        var that = this;
                        var columnsController = that.getController('columns');
                        var calculateCustomSummary = that.option('summary.calculateCustomSummary');
                        var commonSkipEmptyValues = that.option('summary.skipEmptyValues');
                        return iterator_1.map(summaryItems || [], function (summaryItem) {
                            var column = columnsController.columnOption(summaryItem.column);
                            var calculateCellValue = column && column.calculateCellValue ? column.calculateCellValue.bind(column) : data_1.compileGetter(column ? column.dataField : summaryItem.column);
                            var aggregator = summaryItem.summaryType || 'count';
                            var skipEmptyValues = type_1.isDefined(summaryItem.skipEmptyValues) ? summaryItem.skipEmptyValues : commonSkipEmptyValues;
                            if (remoteOperations) {
                                return {
                                    selector: summaryItem.column,
                                    summaryType: aggregator,
                                };
                            }
                            var selector = that._prepareAggregateSelector(calculateCellValue, aggregator);
                            if (aggregator === 'custom') {
                                if (!calculateCustomSummary) {
                                    ui_errors_1.default.log('E1026');
                                    calculateCustomSummary = function () { };
                                }
                                var options_1 = {
                                    component: that.component,
                                    name: summaryItem.name,
                                };
                                calculateCustomSummary(options_1);
                                options_1.summaryProcess = 'calculate';
                                aggregator = {
                                    seed: function (groupIndex) {
                                        options_1.summaryProcess = 'start';
                                        options_1.totalValue = undefined;
                                        options_1.groupIndex = groupIndex;
                                        delete options_1.value;
                                        calculateCustomSummary(options_1);
                                        return options_1.totalValue;
                                    },
                                    step: function (totalValue, value) {
                                        options_1.summaryProcess = 'calculate';
                                        options_1.totalValue = totalValue;
                                        options_1.value = value;
                                        calculateCustomSummary(options_1);
                                        return options_1.totalValue;
                                    },
                                    finalize: function (totalValue) {
                                        options_1.summaryProcess = 'finalize';
                                        options_1.totalValue = totalValue;
                                        delete options_1.value;
                                        calculateCustomSummary(options_1);
                                        return options_1.totalValue;
                                    },
                                };
                            }
                            return {
                                selector: selector,
                                aggregator: aggregator,
                                skipEmptyValues: skipEmptyValues,
                            };
                        });
                    },
                    _addSortInfo: function (sortByGroups, groupColumn, selector, sortOrder) {
                        if (groupColumn) {
                            var groupIndex = groupColumn.groupIndex;
                            sortOrder = sortOrder || groupColumn.sortOrder;
                            if (type_1.isDefined(groupIndex)) {
                                sortByGroups[groupIndex] = sortByGroups[groupIndex] || [];
                                sortByGroups[groupIndex].push({
                                    selector: selector,
                                    desc: sortOrder === 'desc',
                                });
                            }
                        }
                    },
                    _findSummaryItem: function (summaryItems, name) {
                        var summaryItemIndex = -1;
                        var getFullName = function (summaryItem) {
                            var summaryType = summaryItem.summaryType;
                            var column = summaryItem.column;
                            return summaryType && column && summaryType + "_" + column;
                        };
                        if (type_1.isDefined(name)) {
                            // @ts-expect-error
                            iterator_1.each(summaryItems || [], function (index) {
                                if (this.name === name || index === name || this.summaryType === name || this.column === name || getFullName(this) === name) {
                                    summaryItemIndex = index;
                                    return false;
                                }
                            });
                        }
                        return summaryItemIndex;
                    },
                    _getSummarySortByGroups: function (sortByGroupSummaryInfo, groupSummaryItems) {
                        var that = this;
                        var columnsController = that._columnsController;
                        var groupColumns = columnsController.getGroupColumns();
                        var sortByGroups = [];
                        if (!groupSummaryItems || !groupSummaryItems.length)
                            return;
                        iterator_1.each(sortByGroupSummaryInfo || [], function () {
                            var sortOrder = this.sortOrder;
                            var groupColumn = this.groupColumn;
                            var summaryItemIndex = that._findSummaryItem(groupSummaryItems, this.summaryItem);
                            if (summaryItemIndex < 0)
                                return;
                            var selector = function (data) {
                                return getGroupAggregates(data)[summaryItemIndex];
                            };
                            if (type_1.isDefined(groupColumn)) {
                                groupColumn = columnsController.columnOption(groupColumn);
                                that._addSortInfo(sortByGroups, groupColumn, selector, sortOrder);
                            }
                            else {
                                iterator_1.each(groupColumns, function (groupIndex, groupColumn) {
                                    that._addSortInfo(sortByGroups, groupColumn, selector, sortOrder);
                                });
                            }
                        });
                        return sortByGroups;
                    },
                    _createDataSourceAdapterCore: function (dataSource, remoteOperations) {
                        var that = this;
                        var dataSourceAdapter = this.callBase(dataSource, remoteOperations);
                        dataSourceAdapter.summaryGetter(function (currentRemoteOperations) { return that._getSummaryOptions(currentRemoteOperations || remoteOperations); });
                        return dataSourceAdapter;
                    },
                    _getSummaryOptions: function (remoteOperations) {
                        var that = this;
                        var groupSummaryItems = that.option('summary.groupItems');
                        var totalSummaryItems = that.option('summary.totalItems');
                        var sortByGroupSummaryInfo = that.option('sortByGroupSummaryInfo');
                        var groupAggregates = that._getAggregates(groupSummaryItems, remoteOperations && remoteOperations.grouping && remoteOperations.summary);
                        var totalAggregates = that._getAggregates(totalSummaryItems, remoteOperations && remoteOperations.summary);
                        var sortByGroups = function () {
                            return that._getSummarySortByGroups(sortByGroupSummaryInfo, groupSummaryItems);
                        };
                        if (groupAggregates.length || totalAggregates.length) {
                            return {
                                groupAggregates: groupAggregates,
                                totalAggregates: totalAggregates,
                                sortByGroups: sortByGroups,
                            };
                        }
                    },
                    publicMethods: function () {
                        var methods = this.callBase();
                        methods.push('getTotalSummaryValue');
                        return methods;
                    },
                    getTotalSummaryValue: function (summaryItemName) {
                        var summaryItemIndex = this._findSummaryItem(this.option('summary.totalItems'), summaryItemName);
                        var aggregates = this._dataSource.totalAggregates();
                        if (aggregates.length && summaryItemIndex > -1) {
                            return aggregates[summaryItemIndex];
                        }
                    },
                    optionChanged: function (args) {
                        if (args.name === 'summary' || args.name === 'sortByGroupSummaryInfo') {
                            args.name = 'dataSource';
                        }
                        this.callBase(args);
                    },
                    init: function () {
                        this._footerItems = [];
                        this.callBase();
                    },
                    footerItems: function () {
                        return this._footerItems;
                    },
                };
            }()),
            editing: (function () {
                return {
                    _refreshSummary: function () {
                        if (recalculateWhileEditing(this) && !this.isSaving()) {
                            this._dataController.refresh({
                                load: true,
                                changesOnly: true,
                            });
                        }
                    },
                    _addChange: function (params) {
                        var result = this.callBase.apply(this, arguments);
                        if (params.type) {
                            this._refreshSummary();
                        }
                        return result;
                    },
                    _removeChange: function () {
                        var result = this.callBase.apply(this, arguments);
                        this._refreshSummary();
                        return result;
                    },
                    cancelEditData: function () {
                        var result = this.callBase.apply(this, arguments);
                        this._refreshSummary();
                        return result;
                    },
                };
            }()),
        },
        views: {
            rowsView: (function () {
                return {
                    _createRow: function (row) {
                        var $row = this.callBase.apply(this, arguments);
                        row && $row.addClass(row.rowType === DATAGRID_GROUP_FOOTER_ROW_TYPE ? DATAGRID_GROUP_FOOTER_CLASS : '');
                        return $row;
                    },
                    _renderCells: function ($row, options) {
                        this.callBase.apply(this, arguments);
                        if (options.row.rowType === 'group' && options.row.summaryCells && options.row.summaryCells.length) {
                            this._renderGroupSummaryCells($row, options);
                        }
                    },
                    _hasAlignByColumnSummaryItems: function (columnIndex, options) {
                        return !type_1.isDefined(options.columns[columnIndex].groupIndex) && options.row.summaryCells[columnIndex].length;
                    },
                    _getAlignByColumnCellCount: function (groupCellColSpan, options) {
                        var alignByColumnCellCount = 0;
                        for (var i = 1; i < groupCellColSpan; i++) {
                            var columnIndex = options.row.summaryCells.length - i;
                            alignByColumnCellCount = this._hasAlignByColumnSummaryItems(columnIndex, options) ? i : alignByColumnCellCount;
                        }
                        return alignByColumnCellCount;
                    },
                    _renderGroupSummaryCells: function ($row, options) {
                        var $groupCell = $row.children().last();
                        var groupCellColSpan = Number($groupCell.attr('colSpan')) || 1;
                        var alignByColumnCellCount = this._getAlignByColumnCellCount(groupCellColSpan, options);
                        this._renderGroupSummaryCellsCore($groupCell, options, groupCellColSpan, alignByColumnCellCount);
                    },
                    _renderGroupSummaryCellsCore: function ($groupCell, options, groupCellColSpan, alignByColumnCellCount) {
                        if (alignByColumnCellCount > 0) {
                            $groupCell.attr('colSpan', groupCellColSpan - alignByColumnCellCount);
                            for (var i = 0; i < alignByColumnCellCount; i++) {
                                var columnIndex = options.columns.length - alignByColumnCellCount + i;
                                this._renderCell($groupCell.parent(), extend_1.extend({ column: options.columns[columnIndex], columnIndex: this._getSummaryCellIndex(columnIndex, options.columns) }, options));
                            }
                        }
                    },
                    _getSummaryCellIndex: function (columnIndex) {
                        return columnIndex;
                    },
                    _getCellTemplate: function (options) {
                        if (!options.column.command && !type_1.isDefined(options.column.groupIndex) && options.summaryItems && options.summaryItems.length) {
                            return exports.renderSummaryCell;
                        }
                        return this.callBase(options);
                    },
                    _getCellOptions: function (options) {
                        var that = this;
                        var parameters = that.callBase(options);
                        if (options.row.summaryCells) {
                            return extend_1.extend(parameters, getSummaryCellOptions(that, options));
                        }
                        return parameters;
                    },
                };
            }()),
        },
    },
});
