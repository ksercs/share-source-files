/**
* DevExtreme (cjs/__internal/grids/pivot_grid/chart_integration/module.js)
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
exports.ChartIntegrationMixin = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var extend_1 = require("../../../../core/utils/extend");
var iterator_1 = require("../../../../core/utils/iterator");
var module_widget_utils_1 = require("../module_widget_utils");
var FORMAT_DICTIONARY = {
    number: 'numeric',
    date: 'datetime',
};
var UNBIND_KEY = 'dxPivotGridUnbinding';
function getFormattedValue(path, fields) {
    var value = [];
    var lastFieldIndex = fields.length - 1;
    iterator_1.each(path, function (i, item) {
        value.push(item.text || module_widget_utils_1.formatValue(item.value, fields[lastFieldIndex - i]));
    });
    return value.reverse();
}
function getExpandedLevel(node) {
    var level = 0;
    module_widget_utils_1.foreachTree(node, function (members) {
        level = Math.max(level, members.length - 1);
    });
    return level;
}
function processDataCell(processCellArgs, processCell) {
    var chartDataItem = processCellArgs.chartDataItem;
    var processedCell = processCell && processCell(processCellArgs);
    if (processedCell) {
        chartDataItem = extend_1.extend({}, chartDataItem, processedCell.chartDataItem);
        processedCell = extend_1.extend({}, processCellArgs, processedCell, {
            chartDataItem: chartDataItem,
        });
        return processedCell;
    }
    return processCellArgs;
}
function createChartDataSource(pivotGridDataSource, mapOptions, axisDictionary) {
    var data = pivotGridDataSource.getData();
    var dataSource = [];
    var dataFields = pivotGridDataSource.getAreaFields('data');
    var rowFields = pivotGridDataSource.getAreaFields('row');
    var columnFields = pivotGridDataSource.getAreaFields('column');
    var columnElements = [{ index: data.grandTotalColumnIndex, children: data.columns }];
    var rowElements = [{ index: data.grandTotalRowIndex, children: data.rows }];
    var rowLevel = getExpandedLevel(rowElements);
    var columnLevel = getExpandedLevel(columnElements);
    var measureIndex;
    var dataField;
    var rowMemberIndex;
    var rowVisibility;
    var rowPathFormatted;
    var rowPath;
    var columnMemberIndex;
    var columnVisibility;
    var columnPath;
    var columnPathFormatted;
    function createDataItem() {
        var dataCell = (data.values[rowMemberIndex] || [])[columnMemberIndex] || [];
        var value = dataCell[measureIndex];
        var axis;
        var processCellArgs = {
            rowPath: rowPath,
            maxRowLevel: rowLevel,
            rowPathFormatted: rowPathFormatted,
            rowFields: rowFields,
            columnPathFormatted: columnPathFormatted,
            maxColumnLevel: columnLevel,
            columnPath: columnPath,
            columnFields: columnFields,
            dataFields: dataFields,
            dataIndex: measureIndex,
            dataValues: dataCell,
            visible: columnVisibility && rowVisibility,
        };
        var seriesName = (mapOptions.inverted ? columnPathFormatted : rowPathFormatted).join(' - ');
        var argument = (mapOptions.inverted ? rowPathFormatted : columnPathFormatted).join('/');
        if (dataFields.length > 1) {
            if (mapOptions.putDataFieldsInto === 'args' || mapOptions.putDataFieldsInto === 'both') {
                argument += " | " + dataField.caption;
            }
            if (mapOptions.putDataFieldsInto !== 'args') {
                seriesName += " | " + dataField.caption;
                if (mapOptions.dataFieldsDisplayMode !== 'singleAxis') {
                    axis = dataField.caption;
                }
            }
        }
        processCellArgs.chartDataItem = {
            val: value === undefined ? null : value,
            series: seriesName,
            arg: argument,
        };
        processCellArgs = processDataCell(processCellArgs, mapOptions.processCell);
        if (processCellArgs.visible) {
            axisDictionary[processCellArgs.chartDataItem.series] = axisDictionary[processCellArgs.chartDataItem.series] || axis;
            dataSource.push(processCellArgs.chartDataItem);
        }
    }
    function foreachRowColumn(callBack) {
        module_widget_utils_1.foreachTree(rowElements, function (rowMembers) {
            rowMemberIndex = rowMembers[0].index;
            rowMembers = rowMembers.slice(0, rowMembers.length - 1);
            rowVisibility = rowLevel === rowMembers.length;
            rowPath = module_widget_utils_1.createPath(rowMembers);
            rowPathFormatted = getFormattedValue(rowMembers, rowFields);
            if (rowPath.length === 0) {
                rowPathFormatted = [mapOptions.grandTotalText];
            }
            module_widget_utils_1.foreachTree(columnElements, function (columnMembers) {
                columnMemberIndex = columnMembers[0].index;
                columnMembers = columnMembers.slice(0, columnMembers.length - 1);
                columnVisibility = columnLevel === columnMembers.length;
                columnPath = module_widget_utils_1.createPath(columnMembers);
                columnPathFormatted = getFormattedValue(columnMembers, columnFields);
                if (columnPath.length === 0) {
                    columnPathFormatted = [mapOptions.grandTotalText];
                }
                callBack();
            });
        });
    }
    function foreachDataField(callback) {
        iterator_1.each(dataFields, function (index, field) {
            dataField = field;
            measureIndex = index;
            callback();
        });
    }
    if (mapOptions.alternateDataFields === false) {
        foreachDataField(function () {
            foreachRowColumn(createDataItem);
        });
    }
    else {
        foreachRowColumn(function () {
            foreachDataField(createDataItem);
        });
    }
    return dataSource;
}
function createValueAxisOptions(dataSource, options) {
    var dataFields = dataSource.getAreaFields('data');
    if (options.putDataFieldsInto !== 'args' && options.dataFieldsDisplayMode !== 'singleAxis' || dataFields.length === 1) {
        var valueAxisSettings_1 = [];
        iterator_1.each(dataFields, function (_, dataField) {
            var valueAxisOptions = {
                name: dataField.caption,
                title: dataField.caption,
                valueType: FORMAT_DICTIONARY[dataField.dataType] || dataField.dataType,
                label: { format: dataField.format },
            };
            if (dataField.customizeText) {
                valueAxisOptions.label.customizeText = function (formatObject) {
                    return dataField.customizeText.call(dataField, formatObject);
                };
            }
            if (options.dataFieldsDisplayMode === 'splitPanes') {
                valueAxisOptions.pane = dataField.caption;
            }
            valueAxisSettings_1.push(valueAxisOptions);
        });
        return valueAxisSettings_1;
    }
    return [{}];
}
function createPanesOptions(dataSource, options) {
    var panes = [];
    var dataFields = dataSource.getAreaFields('data');
    if (dataFields.length > 1 && options.dataFieldsDisplayMode === 'splitPanes' && options.putDataFieldsInto !== 'args') {
        iterator_1.each(dataFields, function (_, dataField) {
            panes.push({
                name: dataField.caption,
            });
        });
    }
    if (!panes.length) {
        panes.push({});
    }
    return panes;
}
function createChartOptions(dataSource, options) {
    var customizeSeries = options.customizeSeries;
    var customizeChart = options.customizeChart;
    var chartOptions = {
        valueAxis: createValueAxisOptions(dataSource, options),
        panes: createPanesOptions(dataSource, options),
    };
    var axisDictionary = {};
    if (customizeChart) {
        chartOptions = extend_1.extend(true, {}, chartOptions, customizeChart(chartOptions));
    }
    chartOptions.dataSource = createChartDataSource(dataSource, options, axisDictionary);
    chartOptions.seriesTemplate = {
        nameField: 'series',
        customizeSeries: function (seriesName) {
            var seriesOptions = {};
            if (options.dataFieldsDisplayMode === 'splitPanes') {
                seriesOptions.pane = axisDictionary[seriesName];
            }
            else if (options.dataFieldsDisplayMode !== 'singleAxis') {
                seriesOptions.axis = axisDictionary[seriesName];
            }
            if (customizeSeries) {
                seriesOptions = extend_1.extend(seriesOptions, customizeSeries(seriesName, seriesOptions));
            }
            return seriesOptions;
        },
    };
    return chartOptions;
}
function getChartInstance(chartElement) {
    if (!chartElement) {
        return false;
    }
    if (chartElement.NAME) {
        return chartElement.NAME === 'dxChart' && chartElement;
    }
    var element = renderer_1.default(chartElement);
    return element.data('dxChart') && element.dxChart('instance');
}
function removeBinding(chart) {
    var unbind = chart.$element().data(UNBIND_KEY);
    unbind && unbind();
}
var ChartIntegrationMixin = {
    bindChart: function (chart, integrationOptions) {
        integrationOptions = extend_1.extend({}, integrationOptions);
        var that = this;
        var updateChart = function () {
            integrationOptions.grandTotalText = that.option('texts.grandTotal');
            var chartOptions = createChartOptions(that.getDataSource(), integrationOptions);
            chart.option(chartOptions);
        };
        chart = getChartInstance(chart);
        if (!chart) {
            return null;
        }
        removeBinding(chart);
        that.on('changed', updateChart);
        updateChart();
        var disposeBinding = function () {
            chart.$element().removeData(UNBIND_KEY);
            that.off('changed', updateChart);
        };
        chart.on('disposing', disposeBinding);
        this.on('disposing', disposeBinding);
        chart.$element().data(UNBIND_KEY, disposeBinding);
        return disposeBinding;
    },
};
exports.ChartIntegrationMixin = ChartIntegrationMixin;
exports.default = { ChartIntegrationMixin: ChartIntegrationMixin };
