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
exports.DataProvider = exports.PivotGridExport = exports.ExportController = void 0;
var class_1 = __importDefault(require("../../../../core/class"));
var type_1 = require("../../../../core/utils/type");
var extend_1 = require("../../../../core/utils/extend");
var iterator_1 = require("../../../../core/utils/iterator");
var window_1 = require("../../../../core/utils/window");
var position_1 = require("../../../../core/utils/position");
var format_helper_1 = __importDefault(require("../../../../format_helper"));
var number_1 = __importDefault(require("../../../../localization/number"));
var ui_grid_core_export_1 = require("../../../../ui/grid_core/ui.grid_core.export");
var deferred_1 = require("../../../../core/utils/deferred");
var DEFAULT_DATA_TYPE = 'string';
var DEFAUL_COLUMN_WIDTH = 100;
var ExportController = {
    exportTo: function () {
        var onExporting = this._createActionByOption('onExporting');
        var eventArgs = {
            rtlEnabled: this.option('rtlEnabled'),
            fileName: 'PivotGrid',
            cancel: false,
        };
        type_1.isFunction(onExporting) && onExporting(eventArgs);
    },
    _getLength: function (items) {
        var i;
        var itemCount = items[0].length;
        var cellCount = 0;
        for (i = 0; i < itemCount; i += 1) {
            cellCount += items[0][i].colspan || 1;
        }
        return cellCount;
    },
    _correctCellsInfoItemLengths: function (cellsInfo, expectedLength) {
        for (var i = 0; i < cellsInfo.length; i += 1) {
            while (cellsInfo[i].length < expectedLength) {
                cellsInfo[i].push({});
            }
        }
        return cellsInfo;
    },
    _calculateCellInfoItemLength: function (columnsRow) {
        var result = 0;
        for (var columnIndex = 0; columnIndex < columnsRow.length; columnIndex += 1) {
            result += type_1.isDefined(columnsRow[columnIndex].colspan) ? columnsRow[columnIndex].colspan : 1;
        }
        return result;
    },
    _getEmptyCell: function () {
        return {
            text: '',
            value: undefined,
            colspan: 1,
            rowspan: 1,
        };
    },
    _getAllItems: function (columnsInfo, rowsInfoItems, cellsInfo) {
        var cellIndex;
        var rowIndex;
        var correctedCellsInfo = cellsInfo;
        var rowsLength = this._getLength(rowsInfoItems);
        var headerRowsCount = columnsInfo.length;
        if (columnsInfo.length > 0
            && columnsInfo[0].length > 0
            && cellsInfo.length > 0
            && cellsInfo[0].length === 0) {
            var cellInfoItemLength = this._calculateCellInfoItemLength(columnsInfo[0]);
            if (cellInfoItemLength > 0) {
                correctedCellsInfo = this._correctCellsInfoItemLengths(cellsInfo, cellInfoItemLength);
            }
        }
        // NOTE (T1155137): If the data area is empty - fill in empty cells
        // for the correct layout of the export table
        if (correctedCellsInfo.length === 0) {
            var rowsCount = rowsInfoItems.length;
            var collapsedColumnCount = columnsInfo
                .map(function (headerRowWithColumns) { return headerRowWithColumns.filter(function (row) { return !row.expanded; }).length; })
                .reduce(function (result, collapsedCount) { return result + collapsedCount; }, 0);
            for (var rowIdx = 0; rowIdx < rowsCount; rowIdx += 1) {
                correctedCellsInfo[rowIdx] = [];
                for (var colIdx = 0; colIdx < collapsedColumnCount; colIdx += 1) {
                    correctedCellsInfo[rowIdx][colIdx] = this._getEmptyCell();
                }
            }
        }
        var sourceItems = columnsInfo.concat(correctedCellsInfo);
        for (rowIndex = 0; rowIndex < rowsInfoItems.length; rowIndex += 1) {
            for (cellIndex = rowsInfoItems[rowIndex].length - 1; cellIndex >= 0; cellIndex -= 1) {
                if (!type_1.isDefined(sourceItems[rowIndex + headerRowsCount])) {
                    sourceItems[rowIndex + headerRowsCount] = [];
                }
                sourceItems[rowIndex + headerRowsCount].splice(0, 0, extend_1.extend({}, rowsInfoItems[rowIndex][cellIndex]));
            }
        }
        sourceItems[0].splice(0, 0, extend_1.extend({}, this._getEmptyCell(), {
            alignment: position_1.getDefaultAlignment(this._options.rtlEnabled),
            colspan: rowsLength,
            rowspan: headerRowsCount,
        }));
        return ui_grid_core_export_1.prepareItems(sourceItems, this._getEmptyCell());
    },
    getDataProvider: function () {
        return new DataProvider(this);
    },
};
exports.ExportController = ExportController;
var DataProvider = class_1.default.inherit({
    ctor: function (exportController) {
        this._exportController = exportController;
    },
    ready: function () {
        this._initOptions();
        var options = this._options;
        return deferred_1.when(options.items).done(function (items) {
            var headerSize = items[0][0].rowspan;
            var columns = items[headerSize - 1];
            iterator_1.each(columns, function (_, column) {
                column.width = DEFAUL_COLUMN_WIDTH;
            });
            options.columns = columns;
            options.items = items;
        });
    },
    _initOptions: function () {
        var exportController = this._exportController;
        var dataController = exportController._dataController;
        // @ts-expect-error
        var items = new deferred_1.Deferred();
        dataController.beginLoading();
        setTimeout(function () {
            var columnsInfo = extend_1.extend(true, [], dataController.getColumnsInfo(true));
            var rowsInfoItems = extend_1.extend(true, [], dataController.getRowsInfo(true));
            var cellsInfo = dataController.getCellsInfo(true);
            items.resolve(exportController._getAllItems(columnsInfo, rowsInfoItems, cellsInfo));
            dataController.endLoading();
        });
        this._options = {
            items: items,
            rtlEnabled: exportController.option('rtlEnabled'),
            dataFields: exportController.getDataSource().getAreaFields('data'),
            rowsArea: exportController._rowsArea,
            columnsArea: exportController._columnsArea,
        };
    },
    getColumns: function () {
        return this._options.columns;
    },
    getColumnsWidths: function () {
        var colsArea = this._options.columnsArea;
        var rowsArea = this._options.rowsArea;
        var columns = this._options.columns;
        var useDefaultWidth = !window_1.hasWindow() || colsArea.option('scrolling.mode') === 'virtual' || colsArea.element().is(':hidden');
        return useDefaultWidth
            ? columns.map(function () { return DEFAUL_COLUMN_WIDTH; })
            : rowsArea.getColumnsWidth().concat(colsArea.getColumnsWidth());
    },
    getRowsCount: function () {
        return this._options.items.length;
    },
    getGroupLevel: function () {
        return 0;
    },
    getCellMerging: function (rowIndex, cellIndex) {
        var items = this._options.items;
        var item = items[rowIndex] && items[rowIndex][cellIndex];
        return item ? {
            colspan: item.colspan - 1,
            rowspan: item.rowspan - 1,
        } : { colspan: 0, rowspan: 0 };
    },
    getFrozenArea: function () {
        return { x: this.getRowAreaColCount(), y: this.getColumnAreaRowCount() };
    },
    getCellType: function (rowIndex, cellIndex) {
        var style = this.getStyles()[this.getStyleId(rowIndex, cellIndex)];
        return style && style.dataType || 'string';
    },
    getCellData: function (rowIndex, cellIndex, isExcelJS) {
        var result = {};
        var items = this._options.items;
        var item = items[rowIndex] && items[rowIndex][cellIndex] || {};
        if (isExcelJS) {
            result.cellSourceData = item;
            var areaName = this._tryGetAreaName(item, rowIndex, cellIndex);
            if (areaName) {
                result.cellSourceData.area = areaName;
            }
            result.cellSourceData.rowIndex = rowIndex;
            result.cellSourceData.columnIndex = cellIndex;
        }
        if (this.getCellType(rowIndex, cellIndex) === 'string') {
            result.value = item.text;
        }
        else {
            result.value = item.value;
        }
        if (result.cellSourceData && result.cellSourceData.isWhiteSpace) {
            result.value = '';
        }
        return result;
    },
    _tryGetAreaName: function (item, rowIndex, cellIndex) {
        if (this.isColumnAreaCell(rowIndex, cellIndex)) {
            return 'column';
        }
        if (this.isRowAreaCell(rowIndex, cellIndex)) {
            return 'row';
        }
        if (type_1.isDefined(item.dataIndex)) {
            return 'data';
        }
        return undefined;
    },
    isRowAreaCell: function (rowIndex, cellIndex) {
        return rowIndex >= this.getColumnAreaRowCount() && cellIndex < this.getRowAreaColCount();
    },
    isColumnAreaCell: function (rowIndex, cellIndex) {
        return cellIndex >= this.getRowAreaColCount() && rowIndex < this.getColumnAreaRowCount();
    },
    getColumnAreaRowCount: function () {
        return this._options.items[0][0].rowspan;
    },
    getRowAreaColCount: function () {
        return this._options.items[0][0].colspan;
    },
    getHeaderStyles: function () {
        return [
            { alignment: 'center', dataType: 'string' },
            { alignment: position_1.getDefaultAlignment(this._options.rtlEnabled), dataType: 'string' },
        ];
    },
    getDataFieldStyles: function () {
        var _this = this;
        var dataFields = this._options.dataFields;
        var dataItemStyle = { alignment: this._options.rtlEnabled ? 'left' : 'right' };
        var dataFieldStyles = [];
        if (dataFields.length) {
            dataFields.forEach(function (dataField) {
                dataFieldStyles.push(__assign(__assign({}, dataItemStyle), { format: dataField.format, dataType: _this.getCellDataType(dataField) }));
            });
            return dataFieldStyles;
        }
        return [dataItemStyle];
    },
    getStyles: function () {
        if (this._styles) {
            return this._styles;
        }
        this._styles = __spreadArray(__spreadArray([], this.getHeaderStyles()), this.getDataFieldStyles());
        return this._styles;
    },
    getCellDataType: function (field) {
        if (field && field.customizeText) {
            return 'string';
        }
        if (field.dataType) {
            return field.dataType;
        }
        if (field.format) {
            if (number_1.default.parse(format_helper_1.default.format(1, field.format)) === 1) {
                return 'number';
            }
            if (format_helper_1.default.format(new Date(), field.format)) {
                return 'date';
            }
        }
        return DEFAULT_DATA_TYPE;
    },
    getStyleId: function (rowIndex, cellIndex) {
        var items = this._options.items;
        var item = items[rowIndex] && items[rowIndex][cellIndex] || {};
        if ((cellIndex === 0 && rowIndex === 0) || this.isColumnAreaCell(rowIndex, cellIndex)) {
            return 0;
        }
        if (this.isRowAreaCell(rowIndex, cellIndex)) {
            return 1;
        }
        return this.getHeaderStyles().length + (item.dataIndex || 0);
    },
});
exports.DataProvider = DataProvider;
var PivotGridExport = {
    DEFAUL_COLUMN_WIDTH: DEFAUL_COLUMN_WIDTH,
};
exports.PivotGridExport = PivotGridExport;
exports.default = { ExportController: ExportController, PivotGridExport: PivotGridExport, DataProvider: DataProvider };