!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/pivot_grid/chart_integration/module.js"], ["../../../../core/renderer","../../../../core/utils/extend","../../../../core/utils/iterator","../module_widget_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/pivot_grid/chart_integration/module.js", ["../../../../core/renderer", "../../../../core/utils/extend", "../../../../core/utils/iterator", "../module_widget_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.ChartIntegrationMixin = void 0;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _extend = $__require("../../../../core/utils/extend");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _module_widget_utils = $__require("../module_widget_utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var FORMAT_DICTIONARY = {
    number: 'numeric',
    date: 'datetime'
  };
  var UNBIND_KEY = 'dxPivotGridUnbinding';
  function getFormattedValue(path, fields) {
    var value = [];
    var lastFieldIndex = fields.length - 1;
    (0, _iterator.each)(path, function (i, item) {
      value.push(item.text || (0, _module_widget_utils.formatValue)(item.value, fields[lastFieldIndex - i]));
    });
    return value.reverse();
  }
  function getExpandedLevel(node) {
    var level = 0;
    (0, _module_widget_utils.foreachTree)(node, function (members) {
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
        chartDataItem: chartDataItem
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
      (0, _module_widget_utils.foreachTree)(rowElements, function (rowMembers) {
        rowMemberIndex = rowMembers[0].index;
        rowMembers = rowMembers.slice(0, rowMembers.length - 1);
        rowVisibility = rowLevel === rowMembers.length;
        rowPath = (0, _module_widget_utils.createPath)(rowMembers);
        rowPathFormatted = getFormattedValue(rowMembers, rowFields);
        if (rowPath.length === 0) {
          rowPathFormatted = [mapOptions.grandTotalText];
        }
        (0, _module_widget_utils.foreachTree)(columnElements, function (columnMembers) {
          columnMemberIndex = columnMembers[0].index;
          columnMembers = columnMembers.slice(0, columnMembers.length - 1);
          columnVisibility = columnLevel === columnMembers.length;
          columnPath = (0, _module_widget_utils.createPath)(columnMembers);
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
    var _customizeSeries = options.customizeSeries;
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
      customizeSeries: function customizeSeries(seriesName) {
        var seriesOptions = {};
        if (options.dataFieldsDisplayMode === 'splitPanes') {
          seriesOptions.pane = axisDictionary[seriesName];
        } else if (options.dataFieldsDisplayMode !== 'singleAxis') {
          seriesOptions.axis = axisDictionary[seriesName];
        }
        if (_customizeSeries) {
          seriesOptions = (0, _extend.extend)(seriesOptions, _customizeSeries(seriesName, seriesOptions));
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
    bindChart: function bindChart(chart, integrationOptions) {
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
    ChartIntegrationMixin: ChartIntegrationMixin
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../core/utils/extend","../../../../core/utils/iterator","../module_widget_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../core/utils/extend"), require("../../../../core/utils/iterator"), require("../module_widget_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map