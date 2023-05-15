import $ from '../../../../core/renderer';
import { extend } from '../../../../core/utils/extend';
import { each } from '../../../../core/utils/iterator';
import { foreachTree, formatValue, createPath } from '../module_widget_utils';
var FORMAT_DICTIONARY = {
  number: 'numeric',
  date: 'datetime'
};
var UNBIND_KEY = 'dxPivotGridUnbinding';
function getFormattedValue(path, fields) {
  var value = [];
  var lastFieldIndex = fields.length - 1;
  each(path, (i, item) => {
    value.push(item.text || formatValue(item.value, fields[lastFieldIndex - i]));
  });
  return value.reverse();
}
function getExpandedLevel(node) {
  var level = 0;
  foreachTree(node, members => {
    level = Math.max(level, members.length - 1);
  });
  return level;
}
function processDataCell(processCellArgs, processCell) {
  var {
    chartDataItem
  } = processCellArgs;
  var processedCell = processCell && processCell(processCellArgs);
  if (processedCell) {
    chartDataItem = extend({}, chartDataItem, processedCell.chartDataItem);
    processedCell = extend({}, processCellArgs, processedCell, {
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
    foreachTree(rowElements, rowMembers => {
      rowMemberIndex = rowMembers[0].index;
      rowMembers = rowMembers.slice(0, rowMembers.length - 1);
      rowVisibility = rowLevel === rowMembers.length;
      rowPath = createPath(rowMembers);
      rowPathFormatted = getFormattedValue(rowMembers, rowFields);
      if (rowPath.length === 0) {
        rowPathFormatted = [mapOptions.grandTotalText];
      }
      foreachTree(columnElements, columnMembers => {
        columnMemberIndex = columnMembers[0].index;
        columnMembers = columnMembers.slice(0, columnMembers.length - 1);
        columnVisibility = columnLevel === columnMembers.length;
        columnPath = createPath(columnMembers);
        columnPathFormatted = getFormattedValue(columnMembers, columnFields);
        if (columnPath.length === 0) {
          columnPathFormatted = [mapOptions.grandTotalText];
        }
        callBack();
      });
    });
  }
  function foreachDataField(callback) {
    each(dataFields, (index, field) => {
      dataField = field;
      measureIndex = index;
      callback();
    });
  }
  if (mapOptions.alternateDataFields === false) {
    foreachDataField(() => {
      foreachRowColumn(createDataItem);
    });
  } else {
    foreachRowColumn(() => {
      foreachDataField(createDataItem);
    });
  }
  return dataSource;
}
function createValueAxisOptions(dataSource, options) {
  var dataFields = dataSource.getAreaFields('data');
  if (options.putDataFieldsInto !== 'args' && options.dataFieldsDisplayMode !== 'singleAxis' || dataFields.length === 1) {
    var valueAxisSettings = [];
    each(dataFields, (_, dataField) => {
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
    each(dataFields, (_, dataField) => {
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
  var {
    customizeSeries
  } = options;
  var {
    customizeChart
  } = options;
  var chartOptions = {
    valueAxis: createValueAxisOptions(dataSource, options),
    panes: createPanesOptions(dataSource, options)
  };
  var axisDictionary = {};
  if (customizeChart) {
    chartOptions = extend(true, {}, chartOptions, customizeChart(chartOptions));
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
        seriesOptions = extend(seriesOptions, customizeSeries(seriesName, seriesOptions));
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
  var element = $(chartElement);
  return element.data('dxChart') && element.dxChart('instance');
}
function removeBinding(chart) {
  var unbind = chart.$element().data(UNBIND_KEY);
  unbind && unbind();
}
var ChartIntegrationMixin = {
  bindChart(chart, integrationOptions) {
    integrationOptions = extend({}, integrationOptions);
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
export default {
  ChartIntegrationMixin
};
export { ChartIntegrationMixin };