!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/sparklines/sparkline.js"], ["./base_sparkline","../components/data_validator","../series/base_series","../core/utils","../../core/utils/type","../../core/component_registrator","../core/data_source"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/sparklines/sparkline.js", ["./base_sparkline", "../components/data_validator", "../series/base_series", "../core/utils", "../../core/utils/type", "../../core/component_registrator", "../core/data_source"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _base_sparkline = _interopRequireDefault($__require("./base_sparkline"));
  var _data_validator = $__require("../components/data_validator");
  var _base_series = $__require("../series/base_series");
  var _utils = $__require("../core/utils");
  var _type = $__require("../../core/utils/type");
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _data_source = $__require("../core/data_source");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MIN_BAR_WIDTH = 1;
  var MAX_BAR_WIDTH = 50;
  var DEFAULT_BAR_INTERVAL = 4;
  var DEFAULT_CANVAS_WIDTH = 250;
  var DEFAULT_CANVAS_HEIGHT = 30;
  var DEFAULT_POINT_BORDER = 2;
  var ALLOWED_TYPES = {
    'line': true,
    'spline': true,
    'stepline': true,
    'area': true,
    'steparea': true,
    'splinearea': true,
    'bar': true,
    'winloss': true
  };
  var _math = Math;
  var _abs = _math.abs;
  var _round = _math.round;
  var _max = _math.max;
  var _min = _math.min;
  var _isFinite = isFinite;
  var _Number = Number;
  var _String = String;
  function findMinMax(data, valField) {
    var firstItem = data[0] || {};
    var firstValue = firstItem[valField] || 0;
    var min = firstValue;
    var max = firstValue;
    var minIndexes = [0];
    var maxIndexes = [0];
    var dataLength = data.length;
    var value;
    var i;
    for (i = 1; i < dataLength; i++) {
      value = data[i][valField];
      if (value < min) {
        min = value;
        minIndexes = [i];
      } else if (value === min) {
        minIndexes.push(i);
      }
      if (value > max) {
        max = value;
        maxIndexes = [i];
      } else if (value === max) {
        maxIndexes.push(i);
      }
    }
    if (max === min) {
      minIndexes = maxIndexes = [];
    }
    return {
      minIndexes: minIndexes,
      maxIndexes: maxIndexes
    };
  }
  function parseNumericDataSource(data, argField, valField, ignoreEmptyPoints) {
    return (0, _utils.map)(data, function (dataItem, index) {
      var item = null;
      var isDataNumber;
      var value;
      if (dataItem !== undefined) {
        item = {};
        isDataNumber = _isFinite(dataItem);
        item[argField] = isDataNumber ? _String(index) : dataItem[argField];
        value = isDataNumber ? dataItem : dataItem[valField];
        item[valField] = value === null ? ignoreEmptyPoints ? undefined : value : _Number(value);
        item = item[argField] !== undefined && item[valField] !== undefined ? item : null;
      }
      return item;
    });
  }
  function parseWinlossDataSource(data, argField, valField, target) {
    var lowBarValue = -1;
    var zeroBarValue = 0;
    var highBarValue = 1;
    var delta = 0.0001;
    return (0, _utils.map)(data, function (dataItem) {
      var item = {};
      item[argField] = dataItem[argField];
      if (_abs(dataItem[valField] - target) < delta) {
        item[valField] = zeroBarValue;
      } else if (dataItem[valField] > target) {
        item[valField] = highBarValue;
      } else {
        item[valField] = lowBarValue;
      }
      return item;
    });
  }
  function selectPointColor(color, options, index, pointIndexes) {
    if (index === pointIndexes.first || index === pointIndexes.last) {
      color = options.firstLastColor;
    }
    if ((pointIndexes.min || []).indexOf(index) >= 0) {
      color = options.minColor;
    }
    if ((pointIndexes.max || []).indexOf(index) >= 0) {
      color = options.maxColor;
    }
    return color;
  }
  function createLineCustomizeFunction(pointIndexes, options) {
    return function () {
      var color = selectPointColor(undefined, options, this.index, pointIndexes);
      return color ? {
        visible: true,
        border: {
          color: color
        }
      } : {};
    };
  }
  function createBarCustomizeFunction(pointIndexes, options, winlossData) {
    return function () {
      var index = this.index;
      var isWinloss = options.type === 'winloss';
      var target = isWinloss ? options.winlossThreshold : 0;
      var value = isWinloss ? winlossData[index][options.valueField] : this.value;
      var positiveColor = isWinloss ? options.winColor : options.barPositiveColor;
      var negativeColor = isWinloss ? options.lossColor : options.barNegativeColor;
      return {
        color: selectPointColor(value >= target ? positiveColor : negativeColor, options, index, pointIndexes)
      };
    };
  }
  var dxSparkline = _base_sparkline.default.inherit({
    _rootClassPrefix: 'dxsl',
    _rootClass: 'dxsl-sparkline',
    _themeSection: 'sparkline',
    _defaultSize: {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT
    },
    _initCore: function _initCore() {
      this.callBase();
      this._createSeries();
    },
    _initialChanges: ['DATA_SOURCE'],
    _dataSourceChangedHandler: function _dataSourceChangedHandler() {
      this._requestChange(['UPDATE']);
    },
    _updateWidgetElements: function _updateWidgetElements() {
      this._updateSeries();
      this.callBase();
    },
    _disposeWidgetElements: function _disposeWidgetElements() {
      var that = this;
      that._series && that._series.dispose();
      that._series = that._seriesGroup = that._seriesLabelGroup = null;
    },
    _cleanWidgetElements: function _cleanWidgetElements() {
      this._seriesGroup.remove();
      this._seriesLabelGroup.remove();
      this._seriesGroup.clear();
      this._seriesLabelGroup.clear();
      this._series.removeGraphicElements();
      this._series.removePointElements();
      this._series.removeBordersGroup();
    },
    _drawWidgetElements: function _drawWidgetElements() {
      if (this._dataIsLoaded()) {
        this._drawSeries();
        this._drawn();
      }
    },
    _getCorrectCanvas: function _getCorrectCanvas() {
      var options = this._allOptions;
      var canvas = this._canvas;
      var halfPointSize = options.pointSize && Math.ceil(options.pointSize / 2) + DEFAULT_POINT_BORDER;
      var type = options.type;
      if (type !== 'bar' && type !== 'winloss' && (options.showFirstLast || options.showMinMax)) {
        return {
          width: canvas.width,
          height: canvas.height,
          left: canvas.left + halfPointSize,
          right: canvas.right + halfPointSize,
          top: canvas.top + halfPointSize,
          bottom: canvas.bottom + halfPointSize
        };
      }
      return canvas;
    },
    _prepareOptions: function _prepareOptions() {
      var that = this;
      that._allOptions = that.callBase();
      that._allOptions.type = (0, _utils.normalizeEnum)(that._allOptions.type);
      if (!ALLOWED_TYPES[that._allOptions.type]) {
        that._allOptions.type = 'line';
      }
    },
    _createHtmlElements: function _createHtmlElements() {
      this._seriesGroup = this._renderer.g().attr({
        'class': 'dxsl-series'
      });
      this._seriesLabelGroup = this._renderer.g().attr({
        'class': 'dxsl-series-labels'
      });
    },
    _createSeries: function _createSeries() {
      this._series = new _base_series.Series({
        renderer: this._renderer,
        seriesGroup: this._seriesGroup,
        labelsGroup: this._seriesLabelGroup,
        argumentAxis: this._argumentAxis,
        valueAxis: this._valueAxis,
        incidentOccurred: this._incidentOccurred
      }, {
        widgetType: 'chart',
        type: 'line'
      });
    },
    ///#DEBUG
    getSeriesOptions: function getSeriesOptions() {
      return this._series.getOptions();
    },
    ///#ENDDEBUG

    _updateSeries: function _updateSeries() {
      var that = this;
      var singleSeries = that._series;
      that._prepareDataSource();
      var seriesOptions = that._prepareSeriesOptions();
      singleSeries.updateOptions(seriesOptions);
      var groupsData = {
        groups: [{
          series: [singleSeries]
        }]
      };
      groupsData.argumentOptions = {
        type: seriesOptions.type === 'bar' ? 'discrete' : undefined
      };
      that._simpleDataSource = (0, _data_validator.validateData)(that._simpleDataSource, groupsData, that._incidentOccurred, {
        checkTypeForAllData: false,
        convertToAxisDataType: true,
        sortingMethod: true
      })[singleSeries.getArgumentField()];
      seriesOptions.customizePoint = that._getCustomizeFunction();
      singleSeries.updateData(that._simpleDataSource);
      singleSeries.createPoints();
      that._groupsDataCategories = groupsData.categories;
    },
    _optionChangesMap: {
      dataSource: 'DATA_SOURCE'
    },
    _optionChangesOrder: ['DATA_SOURCE'],
    _change_DATA_SOURCE: function _change_DATA_SOURCE() {
      this._updateDataSource();
    },
    _prepareDataSource: function _prepareDataSource() {
      var that = this;
      var options = that._allOptions;
      var argField = options.argumentField;
      var valField = options.valueField;
      var dataSource = that._dataSourceItems() || [];
      var data = parseNumericDataSource(dataSource, argField, valField, that.option('ignoreEmptyPoints'));
      if (options.type === 'winloss') {
        that._winlossDataSource = data;
        that._simpleDataSource = parseWinlossDataSource(data, argField, valField, options.winlossThreshold);
      } else {
        that._simpleDataSource = data;
      }
    },
    _prepareSeriesOptions: function _prepareSeriesOptions() {
      var that = this;
      var options = that._allOptions;
      var type = options.type === 'winloss' ? 'bar' : options.type;
      return {
        visible: true,
        argumentField: options.argumentField,
        valueField: options.valueField,
        color: options.lineColor,
        width: options.lineWidth,
        widgetType: 'chart',
        name: '',
        type: type,
        opacity: type.indexOf('area') !== -1 ? that._allOptions.areaOpacity : undefined,
        point: {
          size: options.pointSize,
          symbol: options.pointSymbol,
          border: {
            visible: true,
            width: DEFAULT_POINT_BORDER
          },
          color: options.pointColor,
          visible: false,
          hoverStyle: {
            border: {}
          },
          selectionStyle: {
            border: {}
          }
        },
        border: {
          color: options.lineColor,
          width: options.lineWidth,
          visible: type !== 'bar'
        }
      };
    },
    _getCustomizeFunction: function _getCustomizeFunction() {
      var that = this;
      var options = that._allOptions;
      var dataSource = that._winlossDataSource || that._simpleDataSource;
      var drawnPointIndexes = that._getExtremumPointsIndexes(dataSource);
      var customizeFunction;
      if (options.type === 'winloss' || options.type === 'bar') {
        customizeFunction = createBarCustomizeFunction(drawnPointIndexes, options, that._winlossDataSource);
      } else {
        customizeFunction = createLineCustomizeFunction(drawnPointIndexes, options);
      }
      return customizeFunction;
    },
    _getExtremumPointsIndexes: function _getExtremumPointsIndexes(data) {
      var that = this;
      var options = that._allOptions;
      var lastIndex = data.length - 1;
      var indexes = {};
      that._minMaxIndexes = findMinMax(data, options.valueField);
      if (options.showFirstLast) {
        indexes.first = 0;
        indexes.last = lastIndex;
      }
      if (options.showMinMax) {
        indexes.min = that._minMaxIndexes.minIndexes;
        indexes.max = that._minMaxIndexes.maxIndexes;
      }
      return indexes;
    },
    _getStick: function _getStick() {
      return {
        stick: this._series.type !== 'bar'
      };
    },
    _updateRange: function _updateRange() {
      var that = this;
      var series = that._series;
      var type = series.type;
      var isBarType = type === 'bar';
      var isWinlossType = type === 'winloss';
      var DEFAULT_VALUE_RANGE_MARGIN = 0.15;
      var DEFAULT_ARGUMENT_RANGE_MARGIN = 0.1;
      var WINLOSS_MAX_RANGE = 1;
      var WINLOSS_MIN_RANGE = -1;
      var rangeData = series.getRangeData();
      var minValue = that._allOptions.minValue;
      var hasMinY = (0, _type.isDefined)(minValue) && _isFinite(minValue);
      var maxValue = that._allOptions.maxValue;
      var hasMaxY = (0, _type.isDefined)(maxValue) && _isFinite(maxValue);
      var argCoef;
      var valCoef = (rangeData.val.max - rangeData.val.min) * DEFAULT_VALUE_RANGE_MARGIN;
      if (isBarType || isWinlossType || type === 'area') {
        if (rangeData.val.min !== 0) {
          rangeData.val.min -= valCoef;
        }
        if (rangeData.val.max !== 0) {
          rangeData.val.max += valCoef;
        }
      } else {
        rangeData.val.min -= valCoef;
        rangeData.val.max += valCoef;
      }
      if (hasMinY || hasMaxY) {
        if (hasMinY && hasMaxY) {
          rangeData.val.minVisible = _min(minValue, maxValue);
          rangeData.val.maxVisible = _max(minValue, maxValue);
        } else {
          rangeData.val.minVisible = hasMinY ? _Number(minValue) : undefined;
          rangeData.val.maxVisible = hasMaxY ? _Number(maxValue) : undefined;
        }
        if (isWinlossType) {
          rangeData.val.minVisible = hasMinY ? _max(rangeData.val.minVisible, WINLOSS_MIN_RANGE) : undefined;
          rangeData.val.maxVisible = hasMaxY ? _min(rangeData.val.maxVisible, WINLOSS_MAX_RANGE) : undefined;
        }
      }
      if (series.getPoints().length > 1) {
        if (isBarType) {
          argCoef = (rangeData.arg.max - rangeData.arg.min) * DEFAULT_ARGUMENT_RANGE_MARGIN;
          rangeData.arg.min = rangeData.arg.min - argCoef;
          rangeData.arg.max = rangeData.arg.max + argCoef;
        }
      }
      rangeData.arg.categories = that._groupsDataCategories;
      that._ranges = rangeData;
    },
    _getBarWidth: function _getBarWidth(pointsCount) {
      var that = this;
      var canvas = that._canvas;
      var intervalWidth = pointsCount * DEFAULT_BAR_INTERVAL;
      var rangeWidth = canvas.width - canvas.left - canvas.right - intervalWidth;
      var width = _round(rangeWidth / pointsCount);
      if (width < MIN_BAR_WIDTH) {
        width = MIN_BAR_WIDTH;
      }
      if (width > MAX_BAR_WIDTH) {
        width = MAX_BAR_WIDTH;
      }
      return width;
    },
    _correctPoints: function _correctPoints() {
      var that = this;
      var seriesType = that._allOptions.type;
      var seriesPoints = that._series.getPoints();
      var pointsLength = seriesPoints.length;
      var barWidth;
      var i;
      if (seriesType === 'bar' || seriesType === 'winloss') {
        barWidth = that._getBarWidth(pointsLength);
        for (i = 0; i < pointsLength; i++) {
          seriesPoints[i].correctCoordinates({
            width: barWidth,
            offset: 0
          });
        }
      }
    },
    _drawSeries: function _drawSeries() {
      var that = this;
      if (that._simpleDataSource.length > 0) {
        that._correctPoints();
        that._series.draw();
        that._seriesGroup.append(that._renderer.root);
      }
    },
    _isTooltipEnabled: function _isTooltipEnabled() {
      return !!this._simpleDataSource.length;
    },
    _getTooltipData: function _getTooltipData() {
      var that = this;
      var options = that._allOptions;
      var dataSource = that._winlossDataSource || that._simpleDataSource;
      var tooltip = that._tooltip;
      if (dataSource.length === 0) {
        return {};
      }
      var minMax = that._minMaxIndexes;
      var valueField = options.valueField;
      var first = dataSource[0][valueField];
      var last = dataSource[dataSource.length - 1][valueField];
      var min = (0, _type.isDefined)(minMax.minIndexes[0]) ? dataSource[minMax.minIndexes[0]][valueField] : first;
      var max = (0, _type.isDefined)(minMax.maxIndexes[0]) ? dataSource[minMax.maxIndexes[0]][valueField] : first;
      var formattedFirst = tooltip.formatValue(first);
      var formattedLast = tooltip.formatValue(last);
      var formattedMin = tooltip.formatValue(min);
      var formattedMax = tooltip.formatValue(max);
      var customizeObject = {
        firstValue: formattedFirst,
        lastValue: formattedLast,
        minValue: formattedMin,
        maxValue: formattedMax,
        originalFirstValue: first,
        originalLastValue: last,
        originalMinValue: min,
        originalMaxValue: max,
        valueText: ['Start:', formattedFirst, 'End:', formattedLast, 'Min:', formattedMin, 'Max:', formattedMax]
      };
      if (options.type === 'winloss') {
        customizeObject.originalThresholdValue = options.winlossThreshold;
        customizeObject.thresholdValue = tooltip.formatValue(options.winlossThreshold);
      }
      return customizeObject;
    }
  });
  (0, _utils.map)(['lineColor', 'lineWidth', 'areaOpacity', 'minColor', 'maxColor', 'barPositiveColor', 'barNegativeColor', 'winColor', 'lessColor', 'firstLastColor', 'pointSymbol', 'pointColor', 'pointSize', 'type', 'argumentField', 'valueField', 'winlossThreshold', 'showFirstLast', 'showMinMax', 'ignoreEmptyPoints', 'minValue', 'maxValue'], function (name) {
    dxSparkline.prototype._optionChangesMap[name] = 'OPTIONS';
  });
  (0, _component_registrator.default)('dxSparkline', dxSparkline);
  var _default = dxSparkline; // PLUGINS_SECTION
  exports.default = _default;
  dxSparkline.addPlugin(_data_source.plugin);
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./base_sparkline","../components/data_validator","../series/base_series","../core/utils","../../core/utils/type","../../core/component_registrator","../core/data_source"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./base_sparkline"), require("../components/data_validator"), require("../series/base_series"), require("../core/utils"), require("../../core/utils/type"), require("../../core/component_registrator"), require("../core/data_source"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=sparkline.js.map