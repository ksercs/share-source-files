/**
* DevExtreme (cjs/viz/series/bubble_series.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.chart = void 0;
var _line_series = require("./line_series");
var _scatter_series = require("./scatter_series");
var _area_series = require("./area_series");
var _bar_series = require("./bar_series");
var _extend2 = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _common = require("../../core/utils/common");
var lineSeries = _line_series.chart.line;
var areaSeries = _area_series.chart.area;
var chartBarSeries = _bar_series.chart.bar;
var polarBarSeries = _bar_series.polar.bar;
var _extend = _extend2.extend;
var _each = _iterator.each;
var _noop = _common.noop;
var chart = {};
exports.chart = chart;
chart.bubble = _extend({}, _scatter_series.chart, {
  _calculateErrorBars: _noop,
  _getMainColor: chartBarSeries._getMainColor,
  _createPointStyles: chartBarSeries._createPointStyles,
  _updatePointsVisibility: chartBarSeries._updatePointsVisibility,
  _getOptionsForPoint: chartBarSeries._getOptionsForPoint,
  _applyMarkerClipRect: lineSeries._applyElementsClipRect,
  _parsePointStyle: polarBarSeries._parsePointStyle,
  _createLegendState: areaSeries._createLegendState,
  _getColorId: areaSeries._getColorId,
  _setMarkerGroupSettings: polarBarSeries._setMarkerGroupSettings,
  areErrorBarsVisible: _noop,
  _createErrorBarGroup: _noop,
  _checkData: function _checkData(data, skippedFields) {
    return _scatter_series.chart._checkData.call(this, data, skippedFields, {
      value: this.getValueFields()[0],
      size: this.getSizeField()
    });
  },
  _getPointDataSelector: function _getPointDataSelector(data, options) {
    var sizeField = this.getSizeField();
    var baseGetter = _scatter_series.chart._getPointDataSelector.call(this);
    return function (data) {
      var pointData = baseGetter(data);
      pointData.size = data[sizeField];
      return pointData;
    };
  },
  _aggregators: {
    avg(_ref, series) {
      var data = _ref.data,
        intervalStart = _ref.intervalStart,
        intervalEnd = _ref.intervalEnd;
      if (!data.length) {
        return;
      }
      var valueField = series.getValueFields()[0];
      var sizeField = series.getSizeField();
      var aggregate = data.reduce(function (result, item) {
        result[0] += item[valueField];
        result[1] += item[sizeField];
        result[2]++;
        return result;
      }, [0, 0, 0]);
      return {
        [valueField]: aggregate[0] / aggregate[2],
        [sizeField]: aggregate[1] / aggregate[2],
        [series.getArgumentField()]: series._getIntervalCenter(intervalStart, intervalEnd)
      };
    }
  },
  getValueFields: function getValueFields() {
    return [this._options.valueField || 'val'];
  },
  getSizeField: function getSizeField() {
    return this._options.sizeField || 'size';
  },
  _animate: function _animate() {
    var that = this;
    var lastPointIndex = that._drawnPoints.length - 1;
    var labelsGroup = that._labelsGroup;
    var labelAnimFunc = function labelAnimFunc() {
      labelsGroup && labelsGroup.animate({
        opacity: 1
      }, {
        duration: that._defaultDuration
      });
    };
    _each(that._drawnPoints || [], function (i, p) {
      p.animate(i === lastPointIndex ? labelAnimFunc : undefined, {
        r: p.bubbleSize,
        translateX: p.x,
        translateY: p.y
      });
    });
  },
  _patchMarginOptions: function _patchMarginOptions(options) {
    options.processBubbleSize = true;
    return options;
  }
});
