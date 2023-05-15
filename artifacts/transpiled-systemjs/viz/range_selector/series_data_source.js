!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/range_selector/series_data_source.js"], ["../series/base_series","../core/series_family","../../core/utils/type","../../core/utils/extend","../../core/utils/iterator","../core/utils","../translators/range","../components/data_validator","../components/chart_theme_manager"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/range_selector/series_data_source.js", ["../series/base_series", "../core/series_family", "../../core/utils/type", "../../core/utils/extend", "../../core/utils/iterator", "../core/utils", "../translators/range", "../components/data_validator", "../components/chart_theme_manager"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.SeriesDataSource = void 0;
  var _base_series = $__require("../series/base_series");
  var _series_family = $__require("../core/series_family");
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _utils = $__require("../core/utils");
  var _range = $__require("../translators/range");
  var _data_validator = $__require("../components/data_validator");
  var _chart_theme_manager = $__require("../components/chart_theme_manager");
  var createThemeManager = function createThemeManager(chartOptions) {
    return new _chart_theme_manager.ThemeManager({
      options: chartOptions,
      themeSection: 'rangeSelector.chart',
      fontFields: ['commonSeriesSettings.label.font']
    });
  };
  var processSeriesFamilies = function processSeriesFamilies(series, minBubbleSize, maxBubbleSize, barOptions, negativesAsZeroes) {
    var families = [];
    var types = [];
    (0, _iterator.each)(series, function (i, item) {
      if (!types.includes(item.type)) {
        types.push(item.type);
      }
    });
    (0, _iterator.each)(types, function (_, type) {
      var family = new _series_family.SeriesFamily({
        type: type,
        minBubbleSize: minBubbleSize,
        maxBubbleSize: maxBubbleSize,
        barGroupPadding: barOptions.barGroupPadding,
        barGroupWidth: barOptions.barGroupWidth,
        negativesAsZeroes: negativesAsZeroes
      });
      family.add(series);
      family.adjustSeriesValues();
      families.push(family);
    });
    return families;
  };
  var SeriesDataSource = function SeriesDataSource(options) {
    var that = this;
    var themeManager = that._themeManager = createThemeManager(options.chart);
    themeManager.setTheme(options.chart.theme);
    var topIndent = themeManager.getOptions('topIndent');
    var bottomIndent = themeManager.getOptions('bottomIndent');
    that._indent = {
      top: topIndent >= 0 && topIndent < 1 ? topIndent : 0,
      bottom: bottomIndent >= 0 && bottomIndent < 1 ? bottomIndent : 0
    };
    that._valueAxis = themeManager.getOptions('valueAxisRangeSelector') || {};
    that._hideChart = false;
    that._series = that._calculateSeries(options);
    that._seriesFamilies = [];
  };
  exports.SeriesDataSource = SeriesDataSource;
  SeriesDataSource.prototype = {
    constructor: SeriesDataSource,
    _calculateSeries: function _calculateSeries(options) {
      var that = this;
      var series = [];
      var particularSeriesOptions;
      var seriesTheme;
      var data = options.dataSource || [];
      var parsedData;
      var chartThemeManager = that._themeManager;
      var seriesTemplate = chartThemeManager.getOptions('seriesTemplate');
      var allSeriesOptions = seriesTemplate ? (0, _utils.processSeriesTemplate)(seriesTemplate, data) : options.chart.series;
      var dataSourceField;
      var valueAxis = that._valueAxis;
      var i;
      var newSeries;
      var groupsData;
      if (options.dataSource && !allSeriesOptions) {
        dataSourceField = options.dataSourceField || 'arg';
        allSeriesOptions = {
          argumentField: dataSourceField,
          valueField: dataSourceField
        };
        that._hideChart = true;
      }
      allSeriesOptions = Array.isArray(allSeriesOptions) ? allSeriesOptions : allSeriesOptions ? [allSeriesOptions] : [];
      for (i = 0; i < allSeriesOptions.length; i++) {
        particularSeriesOptions = (0, _extend.extend)(true, {}, allSeriesOptions[i]);
        particularSeriesOptions.rotated = false;
        seriesTheme = chartThemeManager.getOptions('series', particularSeriesOptions, allSeriesOptions.length);
        seriesTheme.argumentField = seriesTheme.argumentField || options.dataSourceField; // B253068
        if (!seriesTheme.name) {
          seriesTheme.name = 'Series ' + (i + 1).toString();
        }
        if (data && data.length > 0) {
          // TODO
          newSeries = new _base_series.Series({
            renderer: options.renderer,
            argumentAxis: options.argumentAxis,
            valueAxis: options.valueAxis,
            incidentOccurred: options.incidentOccurred
          }, seriesTheme);
          series.push(newSeries);
        }
      }
      if (series.length) {
        groupsData = {
          groups: [{
            series: series,
            valueAxis: options.valueAxis,
            valueOptions: {
              type: valueAxis.type,
              valueType: dataSourceField ? options.valueType : valueAxis.valueType
            }
          }],
          argumentOptions: {
            categories: options.categories,
            argumentType: options.valueType,
            type: options.axisType
          }
        };
        parsedData = (0, _data_validator.validateData)(data, groupsData, options.incidentOccurred, chartThemeManager.getOptions('dataPrepareSettings'));
        that.argCategories = groupsData.categories;
        for (i = 0; i < series.length; i++) {
          series[i].updateData(parsedData[series[i].getArgumentField()]);
        }
      }
      return series;
    },
    createPoints: function createPoints() {
      if (this._series.length === 0) {
        return;
      }
      var series = this._series;
      var viewport = new _range.Range();
      var axis = series[0].getArgumentAxis();
      var themeManager = this._themeManager;
      var negativesAsZeroes = themeManager.getOptions('negativesAsZeroes');
      var negativesAsZeros = themeManager.getOptions('negativesAsZeros'); // misspelling case

      series.forEach(function (s) {
        viewport.addRange(s.getArgumentRange());
      });
      axis.getTranslator().updateBusinessRange(viewport);
      series.forEach(function (s) {
        s.createPoints();
      });
      this._seriesFamilies = processSeriesFamilies(series, themeManager.getOptions('minBubbleSize'), themeManager.getOptions('maxBubbleSize'), {
        barGroupPadding: themeManager.getOptions('barGroupPadding'),
        barGroupWidth: themeManager.getOptions('barGroupWidth')
      }, (0, _type.isDefined)(negativesAsZeroes) ? negativesAsZeroes : negativesAsZeros);
    },
    adjustSeriesDimensions: function adjustSeriesDimensions() {
      (0, _iterator.each)(this._seriesFamilies, function (_, family) {
        family.adjustSeriesDimensions();
      });
    },
    getBoundRange: function getBoundRange() {
      var that = this;
      var rangeData;
      var valueAxis = that._valueAxis;
      var valRange = new _range.Range({
        min: valueAxis.min,
        minVisible: valueAxis.min,
        max: valueAxis.max,
        maxVisible: valueAxis.max,
        axisType: valueAxis.type,
        base: valueAxis.logarithmBase
      });
      var argRange = new _range.Range({});
      var rangeYSize;
      var rangeVisibleSizeY;
      var minIndent;
      var maxIndent;
      (0, _iterator.each)(that._series, function (_, series) {
        rangeData = series.getRangeData();
        valRange.addRange(rangeData.val);
        argRange.addRange(rangeData.arg);
      });
      if (!valRange.isEmpty() && !argRange.isEmpty()) {
        minIndent = valueAxis.inverted ? that._indent.top : that._indent.bottom;
        maxIndent = valueAxis.inverted ? that._indent.bottom : that._indent.top;
        rangeYSize = valRange.max - valRange.min;
        rangeVisibleSizeY = ((0, _type.isNumeric)(valRange.maxVisible) ? valRange.maxVisible : valRange.max) - ((0, _type.isNumeric)(valRange.minVisible) ? valRange.minVisible : valRange.min);
        // B253717
        if ((0, _type.isDate)(valRange.min)) {
          valRange.min = new Date(valRange.min.valueOf() - rangeYSize * minIndent);
        } else {
          valRange.min -= rangeYSize * minIndent;
        }
        if ((0, _type.isDate)(valRange.max)) {
          valRange.max = new Date(valRange.max.valueOf() + rangeYSize * maxIndent);
        } else {
          valRange.max += rangeYSize * maxIndent;
        }
        if ((0, _type.isNumeric)(rangeVisibleSizeY)) {
          valRange.maxVisible = valRange.maxVisible ? valRange.maxVisible + rangeVisibleSizeY * maxIndent : undefined;
          valRange.minVisible = valRange.minVisible ? valRange.minVisible - rangeVisibleSizeY * minIndent : undefined;
        }
        valRange.invert = valueAxis.inverted;
      }
      return {
        arg: argRange,
        val: valRange
      };
    },
    getMarginOptions: function getMarginOptions(canvas) {
      var bubbleSize = Math.min(canvas.width, canvas.height) * this._themeManager.getOptions('maxBubbleSize');
      return this._series.reduce(function (marginOptions, series) {
        var seriesOptions = series.getMarginOptions();
        if (seriesOptions.processBubbleSize === true) {
          seriesOptions.size = bubbleSize;
        }
        return (0, _utils.mergeMarginOptions)(marginOptions, seriesOptions);
      }, {});
    },
    getSeries: function getSeries() {
      return this._series;
    },
    isEmpty: function isEmpty() {
      return this.getSeries().length === 0;
    },
    isShowChart: function isShowChart() {
      return !this._hideChart;
    },
    getCalculatedValueType: function getCalculatedValueType() {
      var series = this._series[0];
      return series === null || series === void 0 ? void 0 : series.argumentType;
    },
    getThemeManager: function getThemeManager() {
      return this._themeManager;
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../series/base_series","../core/series_family","../../core/utils/type","../../core/utils/extend","../../core/utils/iterator","../core/utils","../translators/range","../components/data_validator","../components/chart_theme_manager"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../series/base_series"), require("../core/series_family"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("../core/utils"), require("../translators/range"), require("../components/data_validator"), require("../components/chart_theme_manager"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=series_data_source.js.map