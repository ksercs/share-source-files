/**
* DevExtreme (bundles/__internal/grids/pivot_grid/chart_integration/m_chart_integration.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ChartIntegrationMixin = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _m_widget_utils = require("../m_widget_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var FORMAT_DICTIONARY = {
  number: 'numeric',
  date: 'datetime'
};
var UNBIND_KEY = 'dxPivotGridUnbinding';
function getFormattedValue(path, fields) {
  var value = [];
  var lastFieldIndex = fields.length - 1;
  (0, _iterator.each)(path, function (i, item) {
    value.push(item.text || (0, _m_widget_utils.formatValue)(item.value, fields[lastFieldIndex - i]));
  });
  return value.reverse();
}
function getExpandedLevel(node) {
  var level = 0;
  (0, _m_widget_utils.foreachTree)(node, function (members) {
    level = Math.max(level, members.length - 1);
  });
  return level;
}
function processDataCell(processCellArgs, processCell) {
  var chartDataItem = processCellArgs.chartDataItem;
  var processedCell = processCell && processCell(processCellArgs);
  if (processedCell) {
    chartDataItem = (0, _extend.extend)({}, chartDataItem, processedCell.chartDataItem);
    processedCell = (0, _extend.extend)({}, processCellArgs, processedCell, {
      chartDataItem
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
  var columnElements = [{
    index: data.grandTotalColumnIndex,
    children: data.columns
  }];
  var rowElements = [{
    index: data.grandTotalRowIndex,
    children: data.rows
  }];
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
      rowPath,
      maxRowLevel: rowLevel,
      rowPathFormatted,
      rowFields,
      columnPathFormatted,
      maxColumnLevel: columnLevel,
      columnPath,
      columnFields,
      dataFields,
      dataIndex: measureIndex,
      dataValues: dataCell,
      visible: columnVisibility && rowVisibility
    };
    var seriesName = (mapOptions.inverted ? columnPathFormatted : rowPathFormatted).join(' - ');
    var argument = (mapOptions.inverted ? rowPathFormatted : columnPathFormatted).join('/');
    if (dataFields.length > 1) {
      if (mapOptions.putDataFieldsInto === 'args' || mapOptions.putDataFieldsInto === 'both') {
        argument += " | ".concat(dataField.caption);
      }
      if (mapOptions.putDataFieldsInto !== 'args') {
        seriesName += " | ".concat(dataField.caption);
        if (mapOptions.dataFieldsDisplayMode !== 'singleAxis') {
          axis = dataField.caption;
        }
      }
    }
    processCellArgs.chartDataItem = {
      val: value === undefined ? null : value,
      series: seriesName,
      arg: argument
    };
    processCellArgs = processDataCell(processCellArgs, mapOptions.processCell);
    if (processCellArgs.visible) {
      axisDictionary[processCellArgs.chartDataItem.series] = axisDictionary[processCellArgs.chartDataItem.series] || axis;
      dataSource.push(processCellArgs.chartDataItem);
    }
  }
  function foreachRowColumn(callBack) {
    (0, _m_widget_utils.foreachTree)(rowElements, function (rowMembers) {
      rowMemberIndex = rowMembers[0].index;
      rowMembers = rowMembers.slice(0, rowMembers.length - 1);
      rowVisibility = rowLevel === rowMembers.length;
      rowPath = (0, _m_widget_utils.createPath)(rowMembers);
      rowPathFormatted = getFormattedValue(rowMembers, rowFields);
      if (rowPath.length === 0) {
        rowPathFormatted = [mapOptions.grandTotalText];
      }
      (0, _m_widget_utils.foreachTree)(columnElements, function (columnMembers) {
        columnMemberIndex = columnMembers[0].index;
        columnMembers = columnMembers.slice(0, columnMembers.length - 1);
        columnVisibility = columnLevel === columnMembers.length;
        columnPath = (0, _m_widget_utils.createPath)(columnMembers);
        columnPathFormatted = getFormattedValue(columnMembers, columnFields);
        if (columnPath.length === 0) {
          columnPathFormatted = [mapOptions.grandTotalText];
        }
        callBack();
      });
    });
  }
  function foreachDataField(callback) {
    (0, _iterator.each)(dataFields, function (index, field) {
      dataField = field;
      measureIndex = index;
      callback();
    });
  }
  if (mapOptions.alternateDataFields === false) {
    foreachDataField(function () {
      foreachRowColumn(createDataItem);
    });
  } else {
    foreachRowColumn(function () {
      foreachDataField(createDataItem);
    });
  }
  return dataSource;
}
function createValueAxisOptions(dataSource, options) {
  var dataFields = dataSource.getAreaFields('data');
  if (options.putDataFieldsInto !== 'args' && options.dataFieldsDisplayMode !== 'singleAxis' || dataFields.length === 1) {
    var valueAxisSettings = [];
    (0, _iterator.each)(dataFields, function (_, dataField) {
      var valueAxisOptions = {
        name: dataField.caption,
        title: dataField.caption,
        valueType: FORMAT_DICTIONARY[dataField.dataType] || dataField.dataType,
        label: {
          format: dataField.format
        }
      };
      if (dataField.customizeText) {
        valueAxisOptions.label.customizeText = function (formatObject) {
          return dataField.customizeText.call(dataField, formatObject);
        };
      }
      if (options.dataFieldsDisplayMode === 'splitPanes') {
        valueAxisOptions.pane = dataField.caption;
      }
      valueAxisSettings.push(valueAxisOptions);
    });
    return valueAxisSettings;
  }
  return [{}];
}
function createPanesOptions(dataSource, options) {
  var panes = [];
  var dataFields = dataSource.getAreaFields('data');
  if (dataFields.length > 1 && options.dataFieldsDisplayMode === 'splitPanes' && options.putDataFieldsInto !== 'args') {
    (0, _iterator.each)(dataFields, function (_, dataField) {
      panes.push({
        name: dataField.caption
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
    panes: createPanesOptions(dataSource, options)
  };
  var axisDictionary = {};
  if (customizeChart) {
    chartOptions = (0, _extend.extend)(true, {}, chartOptions, customizeChart(chartOptions));
  }
  chartOptions.dataSource = createChartDataSource(dataSource, options, axisDictionary);
  chartOptions.seriesTemplate = {
    nameField: 'series',
    customizeSeries(seriesName) {
      var seriesOptions = {};
      if (options.dataFieldsDisplayMode === 'splitPanes') {
        seriesOptions.pane = axisDictionary[seriesName];
      } else if (options.dataFieldsDisplayMode !== 'singleAxis') {
        seriesOptions.axis = axisDictionary[seriesName];
      }
      if (customizeSeries) {
        seriesOptions = (0, _extend.extend)(seriesOptions, customizeSeries(seriesName, seriesOptions));
      }
      return seriesOptions;
    }
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
  var element = (0, _renderer.default)(chartElement);
  return element.data('dxChart') && element.dxChart('instance');
}
function removeBinding(chart) {
  var unbind = chart.$element().data(UNBIND_KEY);
  unbind && unbind();
}
var ChartIntegrationMixin = {
  bindChart(chart, integrationOptions) {
    integrationOptions = (0, _extend.extend)({}, integrationOptions);
    var that = this;
    var updateChart = function updateChart() {
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
    var disposeBinding = function disposeBinding() {
      chart.$element().removeData(UNBIND_KEY);
      that.off('changed', updateChart);
    };
    chart.on('disposing', disposeBinding);
    this.on('disposing', disposeBinding);
    chart.$element().data(UNBIND_KEY, disposeBinding);
    return disposeBinding;
  }
};
exports.ChartIntegrationMixin = ChartIntegrationMixin;
var _default = {
  ChartIntegrationMixin
};
exports.default = _default;
