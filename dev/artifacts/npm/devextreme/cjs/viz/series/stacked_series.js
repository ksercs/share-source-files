/**
* DevExtreme (cjs/viz/series/stacked_series.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.polar = exports.chart = void 0;
var _common = require("../../core/utils/common");
var _extend2 = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _area_series = require("./area_series");
var _bar_series = require("./bar_series");
var _line_series = require("./line_series");
var _utils = require("../core/utils");
var _object = require("../../core/utils/object");
// there stackedline, fullstackedline, stackedbar, fullstackedbar, stackedarea, fullstackedarea

var chartAreaSeries = _area_series.chart.area;
var chartBarSeries = _bar_series.chart.bar;
var baseStackedSeries = {
  _calculateErrorBars: _common.noop,
  _updateOptions: function _updateOptions(options) {
    this._stackName = 'axis_' + (options.axis || 'default');
  }
};
var chart = {};
exports.chart = chart;
var polar = {};
exports.polar = polar;
chart['stackedline'] = (0, _extend2.extend)({}, _line_series.chart.line, baseStackedSeries, {});
chart['stackedspline'] = (0, _extend2.extend)({}, _line_series.chart['spline'], baseStackedSeries, {});
chart['fullstackedline'] = (0, _extend2.extend)({}, _line_series.chart.line, baseStackedSeries, {
  getValueRangeInitialValue: _area_series.chart.area.getValueRangeInitialValue
});
chart['fullstackedspline'] = (0, _extend2.extend)({}, _line_series.chart['spline'], baseStackedSeries, {
  getValueRangeInitialValue: _area_series.chart.area.getValueRangeInitialValue
});
var stackedBar = chart['stackedbar'] = (0, _extend2.extend)({}, chartBarSeries, baseStackedSeries, {
  _updateOptions: function _updateOptions(options) {
    baseStackedSeries._updateOptions.call(this, options);
    this._stackName = this._stackName + '_stack_' + (options.stack || 'default');
  }
});
chart['fullstackedbar'] = (0, _extend2.extend)({}, chartBarSeries, baseStackedSeries, {
  _updateOptions: stackedBar._updateOptions
});
function clonePoint(point, value, minValue, position) {
  point = (0, _object.clone)(point);
  point.value = value;
  point.minValue = minValue;
  point.translate();
  point.argument = point.argument + position;
  return point;
}
function preparePointsForStackedAreaSegment(points) {
  var i = 0;
  var p;
  var result = [];
  var array;
  var len = points.length;
  while (i < len) {
    p = points[i];
    array = [p];
    if (p.leftHole) {
      array = [clonePoint(p, p.leftHole, p.minLeftHole, 'left'), p];
    }
    if (p.rightHole) {
      array.push(clonePoint(p, p.rightHole, p.minRightHole, 'right'));
    }
    result.push(array);
    i++;
  }
  return [].concat.apply([], result);
}
chart['stackedarea'] = (0, _extend2.extend)({}, chartAreaSeries, baseStackedSeries, {
  _prepareSegment: function _prepareSegment(points, rotated) {
    return chartAreaSeries._prepareSegment.call(this, preparePointsForStackedAreaSegment(points), rotated);
  },
  _appendInGroup: function _appendInGroup() {
    this._group.append(this._extGroups.seriesGroup).toBackground();
  }
});
function getPointsByArgFromPrevSeries(prevSeries, argument) {
  var result;
  while (!result && prevSeries) {
    result = prevSeries._segmentByArg && prevSeries._segmentByArg[argument]; // T357324
    prevSeries = prevSeries._prevSeries;
  }
  return result;
}
chart['stackedsplinearea'] = (0, _extend2.extend)({}, _area_series.chart['splinearea'], baseStackedSeries, {
  _prepareSegment: function _prepareSegment(points, rotated) {
    var that = this;
    var areaSegment;
    points = preparePointsForStackedAreaSegment(points);
    if (!this._prevSeries || points.length === 1) {
      areaSegment = _area_series.chart['splinearea']._prepareSegment.call(this, points, rotated);
    } else {
      var forwardPoints = _line_series.chart.spline._calculateBezierPoints(points, rotated);
      var backwardPoints = (0, _utils.map)(points, function (p) {
        var point = p.getCoords(true);
        point.argument = p.argument;
        return point;
      });
      var prevSeriesForwardPoints = [];
      var pointByArg = {};
      var i = 0;
      var len = that._prevSeries._segments.length;
      while (i < len) {
        prevSeriesForwardPoints = prevSeriesForwardPoints.concat(that._prevSeries._segments[i].line);
        i++;
      }
      (0, _iterator.each)(prevSeriesForwardPoints, function (_, p) {
        if (p.argument !== null) {
          var argument = p.argument.valueOf();
          if (!pointByArg[argument]) {
            pointByArg[argument] = [p];
          } else {
            pointByArg[argument].push(p);
          }
        }
      });
      that._prevSeries._segmentByArg = pointByArg;
      backwardPoints = _line_series.chart.spline._calculateBezierPoints(backwardPoints, rotated);
      (0, _iterator.each)(backwardPoints, function (i, p) {
        var argument = p.argument.valueOf();
        var prevSeriesPoints;
        if (i % 3 === 0) {
          prevSeriesPoints = pointByArg[argument] || getPointsByArgFromPrevSeries(that._prevSeries, argument);
          if (prevSeriesPoints) {
            backwardPoints[i - 1] && prevSeriesPoints[0] && (backwardPoints[i - 1] = prevSeriesPoints[0]);
            backwardPoints[i + 1] && (backwardPoints[i + 1] = prevSeriesPoints[2] || p);
          }
        }
      });
      areaSegment = {
        line: forwardPoints,
        area: forwardPoints.concat(backwardPoints.reverse())
      };
      that._areaPointsToSplineAreaPoints(areaSegment.area);
    }
    return areaSegment;
  },
  _appendInGroup: chart['stackedarea']._appendInGroup
});
chart['fullstackedarea'] = (0, _extend2.extend)({}, chartAreaSeries, baseStackedSeries, {
  _prepareSegment: chart['stackedarea']._prepareSegment,
  _appendInGroup: chart['stackedarea']._appendInGroup
});
chart['fullstackedsplinearea'] = (0, _extend2.extend)({}, _area_series.chart['splinearea'], baseStackedSeries, {
  _prepareSegment: chart['stackedsplinearea']._prepareSegment,
  _appendInGroup: chart['stackedarea']._appendInGroup
});
polar['stackedbar'] = (0, _extend2.extend)({}, _bar_series.polar.bar, baseStackedSeries, {});
