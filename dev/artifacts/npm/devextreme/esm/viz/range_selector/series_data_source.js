/**
* DevExtreme (esm/viz/range_selector/series_data_source.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Series } from '../series/base_series';
import { SeriesFamily } from '../core/series_family';
import { isNumeric, isDate, isDefined } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { each } from '../../core/utils/iterator';
import { mergeMarginOptions, processSeriesTemplate } from '../core/utils';
import { Range } from '../translators/range';
import { validateData } from '../components/data_validator';
import { ThemeManager as ChartThemeManager } from '../components/chart_theme_manager';
var createThemeManager = function createThemeManager(chartOptions) {
  return new ChartThemeManager({
    options: chartOptions,
    themeSection: 'rangeSelector.chart',
    fontFields: ['commonSeriesSettings.label.font']
  });
};
var processSeriesFamilies = function processSeriesFamilies(series, minBubbleSize, maxBubbleSize, barOptions, negativesAsZeroes) {
  var families = [];
  var types = [];
  each(series, function (i, item) {
    if (!types.includes(item.type)) {
      types.push(item.type);
    }
  });
  each(types, function (_, type) {
    var family = new SeriesFamily({
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
export var SeriesDataSource = function SeriesDataSource(options) {
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
    var allSeriesOptions = seriesTemplate ? processSeriesTemplate(seriesTemplate, data) : options.chart.series;
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
      particularSeriesOptions = extend(true, {}, allSeriesOptions[i]);
      particularSeriesOptions.rotated = false;
      seriesTheme = chartThemeManager.getOptions('series', particularSeriesOptions, allSeriesOptions.length);
      seriesTheme.argumentField = seriesTheme.argumentField || options.dataSourceField; // B253068
      if (!seriesTheme.name) {
        seriesTheme.name = 'Series ' + (i + 1).toString();
      }
      if (data && data.length > 0) {
        // TODO
        newSeries = new Series({
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
      parsedData = validateData(data, groupsData, options.incidentOccurred, chartThemeManager.getOptions('dataPrepareSettings'));
      that.argCategories = groupsData.categories;
      for (i = 0; i < series.length; i++) {
        series[i].updateData(parsedData[series[i].getArgumentField()]);
      }
    }
    return series;
  },
  createPoints() {
    if (this._series.length === 0) {
      return;
    }
    var series = this._series;
    var viewport = new Range();
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
    }, isDefined(negativesAsZeroes) ? negativesAsZeroes : negativesAsZeros);
  },
  adjustSeriesDimensions: function adjustSeriesDimensions() {
    each(this._seriesFamilies, function (_, family) {
      family.adjustSeriesDimensions();
    });
  },
  getBoundRange: function getBoundRange() {
    var that = this;
    var rangeData;
    var valueAxis = that._valueAxis;
    var valRange = new Range({
      min: valueAxis.min,
      minVisible: valueAxis.min,
      max: valueAxis.max,
      maxVisible: valueAxis.max,
      axisType: valueAxis.type,
      base: valueAxis.logarithmBase
    });
    var argRange = new Range({});
    var rangeYSize;
    var rangeVisibleSizeY;
    var minIndent;
    var maxIndent;
    each(that._series, function (_, series) {
      rangeData = series.getRangeData();
      valRange.addRange(rangeData.val);
      argRange.addRange(rangeData.arg);
    });
    if (!valRange.isEmpty() && !argRange.isEmpty()) {
      minIndent = valueAxis.inverted ? that._indent.top : that._indent.bottom;
      maxIndent = valueAxis.inverted ? that._indent.bottom : that._indent.top;
      rangeYSize = valRange.max - valRange.min;
      rangeVisibleSizeY = (isNumeric(valRange.maxVisible) ? valRange.maxVisible : valRange.max) - (isNumeric(valRange.minVisible) ? valRange.minVisible : valRange.min);
      // B253717
      if (isDate(valRange.min)) {
        valRange.min = new Date(valRange.min.valueOf() - rangeYSize * minIndent);
      } else {
        valRange.min -= rangeYSize * minIndent;
      }
      if (isDate(valRange.max)) {
        valRange.max = new Date(valRange.max.valueOf() + rangeYSize * maxIndent);
      } else {
        valRange.max += rangeYSize * maxIndent;
      }
      if (isNumeric(rangeVisibleSizeY)) {
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
      return mergeMarginOptions(marginOptions, seriesOptions);
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
