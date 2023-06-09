"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportController = exports.DataProvider = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var class_1 = __importDefault(require("../../../../core/class"));
var type_1 = require("../../../../core/utils/type");
var extend_1 = require("../../../../core/utils/extend");
var position_1 = require("../../../../core/utils/position");
var ui_grid_core_export_1 = require("../../../../ui/grid_core/ui.grid_core.export");
// import { export as clientExport, excel } from '../../../../exporter';
var string_1 = require("../../../../core/utils/string");
var message_1 = __importDefault(require("../../../../localization/message"));
require("../../../../ui/button");
require("../../../../ui/drop_down_button");
var list_light_1 = __importDefault(require("../../../../ui/list_light"));
var deferred_1 = require("../../../../core/utils/deferred");
var module_core_1 = __importDefault(require("../module_core"));
var DATAGRID_EXPORT_MENU_CLASS = 'dx-datagrid-export-menu';
var DATAGRID_EXPORT_BUTTON_CLASS = 'dx-datagrid-export-button';
var DATAGRID_EXPORT_TOOLBAR_BUTTON_NAME = 'exportButton';
var DATAGRID_EXPORT_ICON = 'export';
var DATAGRID_EXPORT_EXCEL_ICON = 'xlsxfile';
var DATAGRID_EXPORT_SELECTED_ICON = 'exportselected';
var DATAGRID_PDF_EXPORT_ICON = 'pdffile';
exports.DataProvider = class_1.default.inherit({
    ctor: function (exportController, initialColumnWidthsByColumnIndex, selectedRowsOnly) {
        this._exportController = exportController;
        this._initialColumnWidthsByColumnIndex = initialColumnWidthsByColumnIndex;
        this._selectedRowsOnly = selectedRowsOnly;
    },
    _getGroupValue: function (item) {
        var key = item.key, data = item.data, rowType = item.rowType, groupIndex = item.groupIndex, summaryCells = item.summaryCells;
        var groupColumn = this._options.groupColumns[groupIndex];
        var value = module_core_1.default.getDisplayValue(groupColumn, groupColumn.deserializeValue ? groupColumn.deserializeValue(key[groupIndex]) : key[groupIndex], data, rowType);
        var result = groupColumn.caption + ": " + module_core_1.default.formatValue(value, groupColumn);
        if (summaryCells && summaryCells[0] && summaryCells[0].length) {
            result += " " + module_core_1.default.getGroupRowSummaryText(summaryCells[0], this._options.summaryTexts);
        }
        return result;
    },
    _correctCellIndex: function (cellIndex) {
        return cellIndex;
    },
    _initOptions: function () {
        var exportController = this._exportController;
        var groupColumns = exportController._columnsController.getGroupColumns();
        this._options = {
            columns: exportController._getColumns(this._initialColumnWidthsByColumnIndex),
            groupColumns: groupColumns,
            items: this._selectedRowsOnly || exportController._selectionOnly ? exportController._getSelectedItems() : exportController._getAllItems(),
            isHeadersVisible: exportController.option('showColumnHeaders'),
            summaryTexts: exportController.option('summary.texts'),
            rtlEnabled: exportController.option('rtlEnabled'),
        };
    },
    getHeaderStyles: function () {
        return [
            { bold: true, alignment: 'center' },
            { bold: true, alignment: 'left' },
            { bold: true, alignment: 'right' },
        ];
    },
    getGroupRowStyle: function () {
        return {
            bold: true,
            alignment: position_1.getDefaultAlignment(this._options.rtlEnabled),
        };
    },
    getColumnStyles: function () {
        var columnStyles = [];
        this.getColumns().forEach(function (column) {
            columnStyles.push({
                alignment: column.alignment || 'left',
                format: column.format,
                dataType: column.dataType,
            });
        });
        return columnStyles;
    },
    getStyles: function () {
        return __spreadArray(__spreadArray(__spreadArray([], this.getHeaderStyles()), this.getColumnStyles()), [this.getGroupRowStyle()]);
    },
    _getTotalCellStyleId: function (cellIndex) {
        var _a;
        var alignment = ((_a = this.getColumns()[cellIndex]) === null || _a === void 0 ? void 0 : _a.alignment) || 'right';
        return this.getHeaderStyles().map(function (style) { return style.alignment; }).indexOf(alignment);
    },
    getStyleId: function (rowIndex, cellIndex) {
        if (rowIndex < this.getHeaderRowCount()) {
            return 0;
        }
        if (this.isTotalCell(rowIndex - this.getHeaderRowCount(), cellIndex)) {
            return this._getTotalCellStyleId(cellIndex);
        }
        if (this.isGroupRow(rowIndex - this.getHeaderRowCount())) {
            return this.getHeaderStyles().length + this.getColumns().length;
        }
        return cellIndex + this.getHeaderStyles().length;
    },
    getColumns: function (getColumnsByAllRows) {
        var columns = this._options.columns;
        return getColumnsByAllRows ? columns : columns[columns.length - 1];
    },
    getColumnsWidths: function () {
        var columns = this.getColumns();
        return type_1.isDefined(columns)
            ? columns.map(function (c) { return c.width; })
            : undefined;
    },
    getRowsCount: function () {
        return this._options.items.length + this.getHeaderRowCount();
    },
    getHeaderRowCount: function () {
        if (this.isHeadersVisible()) {
            return this._options.columns.length - 1;
        }
        return 0;
    },
    isGroupRow: function (rowIndex) {
        return rowIndex < this._options.items.length && this._options.items[rowIndex].rowType === 'group';
    },
    getGroupLevel: function (rowIndex) {
        var item = this._options.items[rowIndex - this.getHeaderRowCount()];
        var groupIndex = item && item.groupIndex;
        if (item && item.rowType === 'totalFooter') {
            return 0;
        }
        return type_1.isDefined(groupIndex) ? groupIndex : this._options.groupColumns.length;
    },
    getCellType: function (rowIndex, cellIndex) {
        var columns = this.getColumns();
        if (rowIndex < this.getHeaderRowCount()) {
            return 'string';
        }
        rowIndex -= this.getHeaderRowCount();
        if (cellIndex < columns.length) {
            var item = this._options.items.length && this._options.items[rowIndex];
            var column = columns[cellIndex];
            if (item && item.rowType === 'data') {
                if (isFinite(item.values[this._correctCellIndex(cellIndex)]) && !type_1.isDefined(column.customizeText)) {
                    return type_1.isDefined(column.lookup) ? column.lookup.dataType : column.dataType;
                }
            }
            return 'string';
        }
    },
    ready: function () {
        var that = this;
        that._initOptions();
        var options = that._options;
        return deferred_1.when(options.items).done(function (items) {
            options.items = items;
        }).fail(function () {
            options.items = [];
        });
    },
    _convertFromGridGroupSummaryItems: function (gridGroupSummaryItems) {
        if (type_1.isDefined(gridGroupSummaryItems) && gridGroupSummaryItems.length > 0) {
            return gridGroupSummaryItems.map(function (item) { return ({ value: item.value, name: item.name }); });
        }
    },
    getCellData: function (rowIndex, cellIndex, isExcelJS) {
        var value;
        var column;
        var result = { cellSourceData: {}, value: value };
        var columns = this.getColumns();
        var correctedCellIndex = this._correctCellIndex(cellIndex);
        if (rowIndex < this.getHeaderRowCount()) {
            var columnsRow = this.getColumns(true)[rowIndex];
            column = columnsRow[cellIndex];
            result.cellSourceData.rowType = 'header';
            result.cellSourceData.column = column && column.gridColumn;
            result.value = column && column.caption;
        }
        else {
            rowIndex -= this.getHeaderRowCount();
            var item = this._options.items.length && this._options.items[rowIndex];
            if (item) {
                var itemValues = item.values;
                result.cellSourceData.rowType = item.rowType;
                result.cellSourceData.column = columns[cellIndex] && columns[cellIndex].gridColumn;
                switch (item.rowType) {
                    case 'groupFooter':
                    case 'totalFooter':
                        if (correctedCellIndex < itemValues.length) {
                            value = itemValues[correctedCellIndex];
                            if (type_1.isDefined(value)) {
                                result.cellSourceData.value = value.value;
                                result.cellSourceData.totalSummaryItemName = value.name;
                                result.value = module_core_1.default.getSummaryText(value, this._options.summaryTexts);
                            }
                            else {
                                result.cellSourceData.value = undefined;
                            }
                        }
                        break;
                    case 'group':
                        result.cellSourceData.groupIndex = item.groupIndex;
                        if (cellIndex < 1) {
                            result.cellSourceData.column = this._options.groupColumns[item.groupIndex];
                            result.cellSourceData.value = item.key[item.groupIndex];
                            result.cellSourceData.groupSummaryItems = this._convertFromGridGroupSummaryItems(item.summaryCells[0]);
                            result.value = this._getGroupValue(item);
                        }
                        else {
                            var summaryItems = item.values[correctedCellIndex];
                            if (Array.isArray(summaryItems)) {
                                result.cellSourceData.groupSummaryItems = this._convertFromGridGroupSummaryItems(summaryItems);
                                value = '';
                                for (var i = 0; i < summaryItems.length; i++) {
                                    value += (i > 0 ? isExcelJS ? '\n' : ' \n ' : '') + module_core_1.default.getSummaryText(summaryItems[i], this._options.summaryTexts);
                                }
                                result.value = value;
                            }
                            else {
                                result.cellSourceData.value = undefined;
                            }
                        }
                        break;
                    default:
                        column = columns[cellIndex];
                        if (column) {
                            var value_1 = itemValues[correctedCellIndex];
                            var displayValue = module_core_1.default.getDisplayValue(column, value_1, item.data, item.rowType); // from 'ui.grid_core.rows.js: _getCellOptions'
                            if (!isFinite(displayValue) || type_1.isDefined(column.customizeText)) { // similar to 'ui.grid_core.rows.js: _getCellOptions'
                                if (isExcelJS && type_1.isDefined(column.customizeText) && column.customizeText === this._exportController._columnsController.getCustomizeTextByDataType('boolean')) {
                                    result.value = displayValue;
                                }
                                else {
                                    result.value = module_core_1.default.formatValue(displayValue, column);
                                }
                            }
                            else {
                                result.value = displayValue;
                            }
                            result.cellSourceData.value = value_1;
                        }
                        result.cellSourceData.data = item.data;
                }
            }
        }
        return result;
    },
    isHeadersVisible: function () {
        return this._options.isHeadersVisible;
    },
    isTotalCell: function (rowIndex, cellIndex) {
        var items = this._options.items;
        var item = items[rowIndex];
        var correctCellIndex = this._correctCellIndex(cellIndex);
        var isSummaryAlignByColumn = item.summaryCells && item.summaryCells[correctCellIndex] && item.summaryCells[correctCellIndex].length > 0 && item.summaryCells[correctCellIndex][0].alignByColumn;
        return item && item.rowType === 'groupFooter' || item.rowType === 'totalFooter' || isSummaryAlignByColumn;
    },
    getCellMerging: function (rowIndex, cellIndex) {
        var columns = this._options.columns;
        var column = columns[rowIndex] && columns[rowIndex][cellIndex];
        return column ? {
            colspan: (column.exportColspan || 1) - 1,
            rowspan: (column.rowspan || 1) - 1,
        } : { colspan: 0, rowspan: 0 };
    },
    getFrozenArea: function () {
        var that = this;
        return { x: 0, y: that.getHeaderRowCount() };
    },
});
exports.ExportController = module_core_1.default.ViewController.inherit({}).inherit({
    _getEmptyCell: function () {
        return {
            caption: '',
            colspan: 1,
            rowspan: 1,
        };
    },
    _updateColumnWidth: function (column, width) {
        column.width = width;
    },
    _getColumns: function (initialColumnWidthsByColumnIndex) {
        var result = [];
        var i;
        var columns;
        var columnsController = this._columnsController;
        var rowCount = columnsController.getRowCount();
        for (i = 0; i <= rowCount; i++) {
            var currentHeaderRow = [];
            columns = columnsController.getVisibleColumns(i, true);
            var columnWidthsByColumnIndex = void 0;
            if (i === rowCount) {
                if (this._updateLockCount) {
                    columnWidthsByColumnIndex = initialColumnWidthsByColumnIndex;
                }
                else {
                    var columnWidths = this._getColumnWidths(this._headersView, this._rowsView);
                    if (columnWidths && columnWidths.length) {
                        columnWidthsByColumnIndex = {};
                        for (var i_1 = 0; i_1 < columns.length; i_1++) {
                            columnWidthsByColumnIndex[columns[i_1].index] = columnWidths[i_1];
                        }
                    }
                }
            }
            for (var j = 0; j < columns.length; j++) {
                var column = extend_1.extend({}, columns[j], {
                    dataType: columns[j].dataType === 'datetime' ? 'date' : columns[j].dataType,
                    gridColumn: columns[j],
                });
                if (this._needColumnExporting(column)) {
                    var currentColspan = this._calculateExportColspan(column);
                    if (type_1.isDefined(currentColspan)) {
                        column.exportColspan = currentColspan;
                    }
                    if (columnWidthsByColumnIndex) {
                        this._updateColumnWidth(column, columnWidthsByColumnIndex[column.index]);
                    }
                    currentHeaderRow.push(column);
                }
            }
            result.push(currentHeaderRow);
        }
        columns = result[rowCount];
        result = ui_grid_core_export_1.prepareItems(result.slice(0, -1), this._getEmptyCell());
        result.push(columns);
        return result;
    },
    _calculateExportColspan: function (column) {
        var _this = this;
        if (!column.isBand) {
            return;
        }
        var childColumns = this._columnsController.getChildrenByBandColumn(column.index, true);
        if (!type_1.isDefined(childColumns)) {
            return;
        }
        return childColumns.reduce(function (result, childColumn) {
            if (_this._needColumnExporting(childColumn)) {
                return result + (_this._calculateExportColspan(childColumn) || 1);
            }
            return result;
        }, 0);
    },
    _needColumnExporting: function (column) {
        return !column.command && (column.allowExporting || column.allowExporting === undefined);
    },
    _getFooterSummaryItems: function (summaryCells, isTotal) {
        var result = [];
        var estimatedItemsCount = 1;
        var i = 0;
        do {
            var values = [];
            for (var j = 0; j < summaryCells.length; j++) {
                var summaryCell = summaryCells[j];
                var itemsLength = summaryCell.length;
                if (estimatedItemsCount < itemsLength) {
                    estimatedItemsCount = itemsLength;
                }
                values.push(summaryCell[i]);
            }
            result.push({ values: values, rowType: isTotal ? 'totalFooter' : 'groupFooter' });
        } while (i++ < estimatedItemsCount - 1);
        return result;
    },
    _hasSummaryGroupFooters: function () {
        var groupItems = this.option('summary.groupItems');
        if (type_1.isDefined(groupItems)) {
            for (var i = 0; i < groupItems.length; i++) {
                if (groupItems[i].showInGroupFooter) {
                    return true;
                }
            }
        }
        return false;
    },
    _getItemsWithSummaryGroupFooters: function (sourceItems) {
        var result = [];
        var beforeGroupFooterItems = [];
        var groupFooterItems = [];
        for (var i = 0; i < sourceItems.length; i++) {
            var item = sourceItems[i];
            if (item.rowType === 'groupFooter') {
                groupFooterItems = this._getFooterSummaryItems(item.summaryCells);
                result = result.concat(beforeGroupFooterItems, groupFooterItems);
                beforeGroupFooterItems = [];
            }
            else {
                beforeGroupFooterItems.push(item);
            }
        }
        return result.length ? result : beforeGroupFooterItems;
    },
    _updateGroupValuesWithSummaryByColumn: function (sourceItems) {
        var _a;
        var summaryValues = [];
        for (var i = 0; i < sourceItems.length; i++) {
            var item = sourceItems[i];
            var summaryCells = item.summaryCells;
            if (item.rowType === 'group' && summaryCells && summaryCells.length > 1) {
                var groupColumnCount = item.values.length;
                for (var j = 1; j < summaryCells.length; j++) {
                    for (var k = 0; k < summaryCells[j].length; k++) {
                        var summaryItem = summaryCells[j][k];
                        if (summaryItem && summaryItem.alignByColumn) {
                            if (!Array.isArray(summaryValues[j - groupColumnCount])) {
                                summaryValues[j - groupColumnCount] = [];
                            }
                            summaryValues[j - groupColumnCount].push(summaryItem);
                        }
                    }
                }
                if (summaryValues.length > 0) {
                    (_a = item.values).push.apply(_a, summaryValues);
                    summaryValues = [];
                }
            }
        }
    },
    _processUnExportedItems: function (items) {
        var columns = this._columnsController.getVisibleColumns(null, true);
        var groupColumns = this._columnsController.getGroupColumns();
        var values;
        var summaryCells;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var isCommand = false;
            values = [];
            summaryCells = [];
            for (var j = 0; j < columns.length; j++) {
                var column = columns[j];
                isCommand || (isCommand = ['detailExpand', 'buttons'].includes(column.type));
                if (this._needColumnExporting(column)) {
                    if (item.values) {
                        if (item.rowType === 'group' && !values.length) {
                            values.push(item.key[item.groupIndex]);
                        }
                        else {
                            values.push(item.values[j]);
                        }
                    }
                    if (item.summaryCells) {
                        if (item.rowType === 'group' && !summaryCells.length) {
                            var index = j - groupColumns.length + item.groupIndex;
                            summaryCells.push(item.summaryCells[isCommand ? index : index + 1]);
                        }
                        else {
                            summaryCells.push(item.summaryCells[j]);
                        }
                    }
                }
            }
            if (values.length) {
                item.values = values;
            }
            if (summaryCells.length) {
                item.summaryCells = summaryCells;
            }
        }
    },
    _getAllItems: function (data) {
        var that = this;
        // @ts-expect-error
        var d = new deferred_1.Deferred();
        var dataController = this.getController('data');
        var footerItems = dataController.footerItems();
        var totalItem = footerItems.length && footerItems[0];
        var summaryTotalItems = that.option('summary.totalItems');
        var summaryCells;
        deferred_1.when(data).done(function (data) {
            dataController.loadAll(data).done(function (sourceItems, totalAggregates) {
                that._updateGroupValuesWithSummaryByColumn(sourceItems);
                if (that._hasSummaryGroupFooters()) {
                    sourceItems = that._getItemsWithSummaryGroupFooters(sourceItems);
                }
                summaryCells = totalItem && totalItem.summaryCells;
                if (type_1.isDefined(totalAggregates) && summaryTotalItems) {
                    summaryCells = that._getSummaryCells(summaryTotalItems, totalAggregates);
                }
                var summaryItems = totalItem && that._getFooterSummaryItems(summaryCells, true);
                if (summaryItems) {
                    sourceItems = sourceItems.concat(summaryItems);
                }
                that._processUnExportedItems(sourceItems);
                d.resolve(sourceItems);
            }).fail(d.reject);
        }).fail(d.reject);
        return d;
    },
    _getSummaryCells: function (summaryTotalItems, totalAggregates) {
        var dataController = this.getController('data');
        var columnsController = dataController._columnsController;
        return dataController._calculateSummaryCells(summaryTotalItems, totalAggregates, columnsController.getVisibleColumns(null, true), function (summaryItem, column) { return (dataController._isDataColumn(column) ? column.index : -1); });
    },
    _getSelectedItems: function () {
        var selectionController = this.getController('selection');
        var selectedRowData = selectionController.getSelectedRowsData();
        return this._getAllItems(selectedRowData);
    },
    _getColumnWidths: function (headersView, rowsView) {
        return headersView && headersView.isVisible() ? headersView.getColumnWidths() : rowsView.getColumnWidths();
    },
    init: function () {
        this._columnsController = this.getController('columns');
        this._rowsView = this.getView('rowsView');
        this._headersView = this.getView('columnHeadersView');
        this.createAction('onExporting', { excludeValidators: ['disabled', 'readOnly'] });
    },
    callbackNames: function () {
        return ['selectionOnlyChanged'];
    },
    getDataProvider: function (selectedRowsOnly) {
        var columnWidths = this._getColumnWidths(this._headersView, this._rowsView);
        var initialColumnWidthsByColumnIndex;
        if (columnWidths && columnWidths.length) {
            initialColumnWidthsByColumnIndex = {};
            var columnsLastRowVisibleColumns = this._columnsController.getVisibleColumns(this._columnsController.getRowCount(), true);
            for (var i = 0; i < columnsLastRowVisibleColumns.length; i++) {
                initialColumnWidthsByColumnIndex[columnsLastRowVisibleColumns[i].index] = columnWidths[i];
            }
        }
        return new exports.DataProvider(this, initialColumnWidthsByColumnIndex, selectedRowsOnly);
    },
    exportTo: function (selectedRowsOnly, format) {
        this._selectionOnly = selectedRowsOnly;
        var onExporting = this.getAction('onExporting');
        var eventArgs = {
            rtlEnabled: this.option('rtlEnabled'),
            selectedRowsOnly: !!selectedRowsOnly,
            format: format,
            fileName: 'DataGrid',
            cancel: false,
        };
        type_1.isFunction(onExporting) && onExporting(eventArgs);
    },
    publicMethods: function () {
        return ['getDataProvider'];
    },
    selectionOnly: function (value) {
        if (type_1.isDefined(value)) {
            this._isSelectedRows = value;
            this.selectionOnlyChanged.fire();
        }
        else {
            return this._isSelectedRows;
        }
    },
});
module_core_1.default.registerModule('export', {
    defaultOptions: function () {
        return {
            export: {
                enabled: false,
                fileName: 'DataGrid',
                formats: ['xlsx'],
                allowExportSelectedData: false,
                texts: {
                    exportTo: message_1.default.format('dxDataGrid-exportTo'),
                    exportAll: message_1.default.format('dxDataGrid-exportAll'),
                    exportSelectedRows: message_1.default.format('dxDataGrid-exportSelectedRows'),
                },
            },
        };
    },
    controllers: {
        export: exports.ExportController,
    },
    extenders: {
        controllers: {
            editing: {
                callbackNames: function () {
                    var callbackList = this.callBase();
                    return type_1.isDefined(callbackList) ? callbackList.push('editingChanged') : ['editingChanged'];
                },
                _updateEditButtons: function () {
                    this.callBase();
                    this.editingChanged.fire(this.hasChanges());
                },
            },
        },
        views: {
            headerPanel: {
                _getToolbarItems: function () {
                    var items = this.callBase();
                    var exportButton = this._getExportToolbarButton();
                    if (exportButton) {
                        items.push(exportButton);
                        this._correctItemsPosition(items);
                    }
                    return items;
                },
                _getExportToolbarButton: function () {
                    var _this = this;
                    var items = this._getExportToolbarItems();
                    if (items.length === 0) {
                        return null;
                    }
                    var toolbarButtonOptions = {
                        name: DATAGRID_EXPORT_TOOLBAR_BUTTON_NAME,
                        location: 'after',
                        locateInMenu: 'auto',
                        sortIndex: 30,
                        options: { items: items },
                    };
                    if (items.length === 1) {
                        var widgetOptions = __assign(__assign({}, items[0]), { hint: items[0].text, elementAttr: {
                                class: DATAGRID_EXPORT_BUTTON_CLASS,
                            } });
                        toolbarButtonOptions.widget = 'dxButton';
                        toolbarButtonOptions.showText = 'inMenu';
                        toolbarButtonOptions.options = widgetOptions;
                    }
                    else {
                        var widgetOptions = {
                            icon: DATAGRID_EXPORT_ICON,
                            displayExpr: 'text',
                            items: items,
                            hint: this.option('export.texts.exportTo'),
                            elementAttr: {
                                class: DATAGRID_EXPORT_BUTTON_CLASS,
                            },
                            dropDownOptions: {
                                width: 'auto',
                                _wrapperClassExternal: DATAGRID_EXPORT_MENU_CLASS,
                            },
                        };
                        toolbarButtonOptions.options = widgetOptions;
                        toolbarButtonOptions.widget = 'dxDropDownButton';
                        toolbarButtonOptions.menuItemTemplate = function (_data, _index, container) {
                            _this._createComponent(renderer_1.default(container), list_light_1.default, { items: items });
                        };
                    }
                    return toolbarButtonOptions;
                },
                _getExportToolbarItems: function () {
                    var _this = this;
                    var _a;
                    var exportOptions = this.option('export');
                    var texts = this.option('export.texts');
                    var formats = (_a = this.option('export.formats')) !== null && _a !== void 0 ? _a : [];
                    if (!exportOptions.enabled) {
                        return [];
                    }
                    var items = [];
                    formats.forEach(function (formatType) {
                        var formatName = formatType.toUpperCase();
                        var exportAllIcon = DATAGRID_EXPORT_ICON;
                        var exportSelectedIcon = DATAGRID_EXPORT_SELECTED_ICON;
                        if (formatType === 'xlsx') {
                            formatName = 'Excel';
                            exportAllIcon = DATAGRID_EXPORT_EXCEL_ICON;
                        }
                        if (formatType === 'pdf') {
                            exportAllIcon = DATAGRID_PDF_EXPORT_ICON;
                        }
                        items.push({
                            text: string_1.format(texts.exportAll, formatName),
                            icon: exportAllIcon,
                            onClick: function () {
                                _this._exportController.exportTo(false, formatType);
                            },
                        });
                        if (exportOptions.allowExportSelectedData) {
                            items.push({
                                text: string_1.format(texts.exportSelectedRows, formatName),
                                icon: exportSelectedIcon,
                                onClick: function () {
                                    _this._exportController.exportTo(true, formatType);
                                },
                            });
                        }
                    });
                    return items;
                },
                _correctItemsPosition: function (items) {
                    items.sort(function (itemA, itemB) { return itemA.sortIndex - itemB.sortIndex; });
                },
                _isExportButtonVisible: function () {
                    return this.option('export.enabled');
                },
                optionChanged: function (args) {
                    this.callBase(args);
                    if (args.name === 'export') {
                        args.handled = true;
                        this._invalidate();
                    }
                },
                init: function () {
                    var that = this;
                    this.callBase();
                    this._exportController = this.getController('export');
                    this._editingController = this.getController('editing');
                    this._editingController.editingChanged.add(function (hasChanges) {
                        that.setToolbarItemDisabled('exportButton', hasChanges);
                    });
                },
                isVisible: function () {
                    return this.callBase() || this._isExportButtonVisible();
                },
            },
        },
    },
});