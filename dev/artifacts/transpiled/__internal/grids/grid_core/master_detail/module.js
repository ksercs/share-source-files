"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.masterDetailModule = void 0;
var size_1 = require("../../../../core/utils/size");
var renderer_1 = __importDefault(require("../../../../core/renderer"));
// @ts-expect-error
var common_1 = require("../../../../core/utils/common");
var iterator_1 = require("../../../../core/utils/iterator");
var type_1 = require("../../../../core/utils/type");
var deferred_1 = require("../../../../core/utils/deferred");
var module_utils_1 = __importDefault(require("../module_utils"));
var MASTER_DETAIL_CELL_CLASS = 'dx-master-detail-cell';
var MASTER_DETAIL_ROW_CLASS = 'dx-master-detail-row';
var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
var ROW_LINES_CLASS = 'dx-row-lines';
exports.masterDetailModule = {
    defaultOptions: function () {
        return {
            masterDetail: {
                enabled: false,
                autoExpandAll: false,
                template: null,
            },
        };
    },
    extenders: {
        controllers: {
            columns: {
                _getExpandColumnsCore: function () {
                    var expandColumns = this.callBase();
                    if (this.option('masterDetail.enabled')) {
                        expandColumns.push({
                            type: 'detailExpand',
                            cellTemplate: module_utils_1.default.getExpandCellTemplate(),
                        });
                    }
                    return expandColumns;
                },
            },
            data: (function () {
                var initMasterDetail = function (that) {
                    that._expandedItems = [];
                    that._isExpandAll = that.option('masterDetail.autoExpandAll');
                };
                return {
                    init: function () {
                        var that = this;
                        initMasterDetail(that);
                        that.callBase();
                    },
                    expandAll: function (groupIndex) {
                        var that = this;
                        if (groupIndex < 0) {
                            that._isExpandAll = true;
                            that._expandedItems = [];
                            that.updateItems();
                        }
                        else {
                            that.callBase.apply(that, arguments);
                        }
                    },
                    collapseAll: function (groupIndex) {
                        var that = this;
                        if (groupIndex < 0) {
                            that._isExpandAll = false;
                            that._expandedItems = [];
                            that.updateItems();
                        }
                        else {
                            that.callBase.apply(that, arguments);
                        }
                    },
                    isRowExpanded: function (key) {
                        var that = this;
                        var expandIndex = module_utils_1.default.getIndexByKey(key, that._expandedItems);
                        if (Array.isArray(key)) {
                            return that.callBase.apply(that, arguments);
                        }
                        return !!(that._isExpandAll ^ (expandIndex >= 0 && that._expandedItems[expandIndex].visible));
                    },
                    _getRowIndicesForExpand: function (key) {
                        var rowIndex = this.getRowIndexByKey(key);
                        return [rowIndex, rowIndex + 1];
                    },
                    _changeRowExpandCore: function (key) {
                        var that = this;
                        var result;
                        if (Array.isArray(key)) {
                            result = that.callBase.apply(that, arguments);
                        }
                        else {
                            var expandIndex = module_utils_1.default.getIndexByKey(key, that._expandedItems);
                            if (expandIndex >= 0) {
                                var visible = that._expandedItems[expandIndex].visible;
                                that._expandedItems[expandIndex].visible = !visible;
                            }
                            else {
                                that._expandedItems.push({ key: key, visible: true });
                            }
                            that.updateItems({
                                changeType: 'update',
                                rowIndices: that._getRowIndicesForExpand(key),
                            });
                            // @ts-expect-error
                            result = new deferred_1.Deferred().resolve();
                        }
                        return result;
                    },
                    _processDataItem: function (data, options) {
                        var that = this;
                        var dataItem = that.callBase.apply(that, arguments);
                        dataItem.isExpanded = that.isRowExpanded(dataItem.key);
                        if (options.detailColumnIndex === undefined) {
                            options.detailColumnIndex = -1;
                            iterator_1.each(options.visibleColumns, function (index, column) {
                                if (column.command === 'expand' && !type_1.isDefined(column.groupIndex)) {
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
                    _processItems: function (items, change) {
                        var that = this;
                        var changeType = change.changeType;
                        var result = [];
                        items = that.callBase.apply(that, arguments);
                        if (changeType === 'loadingAll') {
                            return items;
                        }
                        if (changeType === 'refresh') {
                            that._expandedItems = common_1.grep(that._expandedItems, function (item) { return item.visible; });
                        }
                        iterator_1.each(items, function (index, item) {
                            result.push(item);
                            var expandIndex = module_utils_1.default.getIndexByKey(item.key, that._expandedItems);
                            if (item.rowType === 'data' && (item.isExpanded || expandIndex >= 0) && !item.isNewRow) {
                                result.push({
                                    visible: item.isExpanded,
                                    rowType: 'detail',
                                    key: item.key,
                                    data: item.data,
                                    values: [],
                                });
                            }
                        });
                        return result;
                    },
                    optionChanged: function (args) {
                        var that = this;
                        var isEnabledChanged;
                        var isAutoExpandAllChanged;
                        if (args.name === 'masterDetail') {
                            args.name = 'dataSource';
                            // eslint-disable-next-line default-case
                            switch (args.fullName) {
                                case 'masterDetail': {
                                    var value = args.value || {};
                                    var previousValue = args.previousValue || {};
                                    isEnabledChanged = value.enabled !== previousValue.enabled;
                                    isAutoExpandAllChanged = value.autoExpandAll !== previousValue.autoExpandAll;
                                    break;
                                }
                                case 'masterDetail.template': {
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
                    },
                };
            }()),
            resizing: {
                fireContentReadyAction: function () {
                    this.callBase.apply(this, arguments);
                    this._updateParentDataGrids(this.component.$element());
                },
                _updateParentDataGrids: function ($element) {
                    var _this = this;
                    var $masterDetailRow = $element.closest("." + MASTER_DETAIL_ROW_CLASS);
                    if ($masterDetailRow.length) {
                        deferred_1.when(this._updateMasterDataGrid($masterDetailRow, $element)).done(function () {
                            _this._updateParentDataGrids($masterDetailRow.parent());
                        });
                    }
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _updateMasterDataGrid: function ($masterDetailRow, $detailElement) {
                    var masterRowOptions = renderer_1.default($masterDetailRow).data('options');
                    var masterDataGrid = renderer_1.default($masterDetailRow).closest("." + this.getWidgetContainerClass()).parent().data('dxDataGrid');
                    if (masterRowOptions && masterDataGrid) {
                        return this._updateMasterDataGridCore(masterDataGrid, masterRowOptions);
                    }
                },
                _updateMasterDataGridCore: function (masterDataGrid, masterRowOptions) {
                    var d = deferred_1.Deferred();
                    if (masterDataGrid.getView('rowsView').isFixedColumns()) {
                        this._updateFixedMasterDetailGrids(masterDataGrid, masterRowOptions.rowIndex, renderer_1.default(masterRowOptions.rowElement))
                            .done(d.resolve);
                    }
                    else {
                        if (masterDataGrid.option('scrolling.useNative') === true) {
                            masterDataGrid.updateDimensions().done(function () { return d.resolve(true); });
                            return;
                        }
                        var scrollable = masterDataGrid.getScrollable();
                        if (scrollable) {
                            // T607490
                            scrollable === null || scrollable === void 0 ? void 0 : scrollable.update().done(function () { return d.resolve(); });
                        }
                        else {
                            d.resolve();
                        }
                    }
                    return d.promise();
                },
                _updateFixedMasterDetailGrids: function (masterDataGrid, masterRowIndex, $detailElement) {
                    var _this = this;
                    var d = deferred_1.Deferred();
                    var $rows = renderer_1.default(masterDataGrid.getRowElement(masterRowIndex));
                    var $tables = renderer_1.default(masterDataGrid.getView('rowsView').getTableElements());
                    var rowsNotEqual = ($rows === null || $rows === void 0 ? void 0 : $rows.length) === 2 && size_1.getHeight($rows.eq(0)) !== size_1.getHeight($rows.eq(1));
                    var tablesNotEqual = ($tables === null || $tables === void 0 ? void 0 : $tables.length) === 2 && size_1.getHeight($tables.eq(0)) !== size_1.getHeight($tables.eq(1));
                    if (rowsNotEqual || tablesNotEqual) {
                        var detailElementWidth_1 = size_1.getWidth($detailElement);
                        masterDataGrid.updateDimensions().done(function () {
                            var isDetailHorizontalScrollCanBeShown = _this.option('columnAutoWidth') && masterDataGrid.option('scrolling.useNative') === true;
                            var isDetailGridWidthChanged = isDetailHorizontalScrollCanBeShown && detailElementWidth_1 !== size_1.getWidth($detailElement);
                            if (isDetailHorizontalScrollCanBeShown && isDetailGridWidthChanged) {
                                _this.updateDimensions().done(function () { return d.resolve(true); });
                            }
                            else {
                                d.resolve(true);
                            }
                        });
                        return d.promise();
                    }
                    return deferred_1.Deferred().resolve();
                },
                _toggleBestFitMode: function (isBestFit) {
                    this.callBase.apply(this, arguments);
                    if (this.option('masterDetail.template')) {
                        var $rowsTable = this._rowsView.getTableElement();
                        if ($rowsTable) {
                            $rowsTable
                                .find('.dx-master-detail-cell')
                                .css('maxWidth', isBestFit ? 0 : '');
                        }
                    }
                },
            },
        },
        views: {
            rowsView: (function () {
                return {
                    _getCellTemplate: function (options) {
                        var that = this;
                        var column = options.column;
                        var editingController = that.getController('editing');
                        var isEditRow = editingController && editingController.isEditRow(options.rowIndex);
                        var template;
                        if (column.command === 'detail' && !isEditRow) {
                            template = that.option('masterDetail.template') || { allowRenderToDetachedContainer: false, render: that._getDefaultTemplate(column) };
                        }
                        else {
                            template = that.callBase.apply(that, arguments);
                        }
                        return template;
                    },
                    _isDetailRow: function (row) {
                        return row && row.rowType && row.rowType.indexOf('detail') === 0;
                    },
                    _createRow: function (row) {
                        var $row = this.callBase.apply(this, arguments);
                        if (row && this._isDetailRow(row)) {
                            this.option('showRowLines') && $row.addClass(ROW_LINES_CLASS);
                            $row.addClass(MASTER_DETAIL_ROW_CLASS);
                            if (type_1.isDefined(row.visible)) {
                                $row.toggle(row.visible);
                            }
                        }
                        return $row;
                    },
                    _renderCells: function ($row, options) {
                        var row = options.row;
                        var $detailCell;
                        var visibleColumns = this._columnsController.getVisibleColumns();
                        if (row.rowType && this._isDetailRow(row)) {
                            if (this._needRenderCell(0, options.columnIndices)) {
                                $detailCell = this._renderCell($row, {
                                    value: null,
                                    row: row,
                                    rowIndex: row.rowIndex,
                                    column: { command: 'detail' },
                                    columnIndex: 0,
                                    change: options.change,
                                });
                                $detailCell
                                    .addClass(CELL_FOCUS_DISABLED_CLASS)
                                    .addClass(MASTER_DETAIL_CELL_CLASS)
                                    .attr('colSpan', visibleColumns.length);
                            }
                        }
                        else {
                            this.callBase.apply(this, arguments);
                        }
                    },
                };
            }()),
        },
    },
};