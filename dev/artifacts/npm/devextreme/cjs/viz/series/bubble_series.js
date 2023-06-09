/**
* DevExtreme (cjs/viz/series/bubble_series.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
    avg: function avg(_ref, series) {
      var _ref2;
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
      return _ref2 = {}, _defineProperty(_ref2, valueField, aggregate[0] / aggregate[2]), _defineProperty(_ref2, sizeField, aggregate[1] / aggregate[2]), _defineProperty(_ref2, series.getArgumentField(), series._getIntervalCenter(intervalStart, intervalEnd)), _ref2;
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
