/**
* DevExtreme (cjs/viz/series/pie_series.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.pie = exports.doughnut = exports.donut = void 0;
var _common = require("../../core/utils/common");
var _iterator = require("../../core/utils/iterator");
var _scatter_series = require("./scatter_series");
var _utils = require("../core/utils");
var _extend2 = require("../../core/utils/extend");
var _bar_series = require("./bar_series");
// there are pie, doughnut

var chartScatterSeries = _scatter_series.chart;
var barSeries = _bar_series.chart.bar;
var _extend = _extend2.extend;
var _each = _iterator.each;
var _noop = _common.noop;
var _map = _utils.map;
var _isFinite = isFinite;
var _max = Math.max;
var ANIMATION_DURATION = 0.7;
var INSIDE = 'inside';
var pie = _extend({}, barSeries, {
  _setGroupsSettings: function _setGroupsSettings() {
    chartScatterSeries._setGroupsSettings.apply(this, arguments);
    this._labelsGroup.attr({
      'pointer-events': null
    });
  },
  _createErrorBarGroup: _noop,
  _drawPoint: function _drawPoint(options) {
    var point = options.point;
    var legendCallback = this._legendCallback;
    chartScatterSeries._drawPoint.call(this, options);
    !point.isVisible() && point.setInvisibility();
    point.isSelected() && legendCallback();
  },
  _getOldPoint: function _getOldPoint(data, oldPointsByArgument, index) {
    var point = (this._points || [])[index];
    if (point) {
      oldPointsByArgument[point.argument.valueOf()] = oldPointsByArgument[point.argument.valueOf()].filter(function (p) {
        return p !== point;
      });
    }
    return point;
  },
  adjustLabels: function adjustLabels(moveLabelsFromCenter) {
    return (this._points || []).reduce(function (r, p) {
      if (p._label.isVisible()) {
        p.setLabelTrackerData();
        r = p.applyWordWrap(moveLabelsFromCenter) || r;
        p.updateLabelCoord(moveLabelsFromCenter);
        return r;
      }
    }, false);
  },
  _applyElementsClipRect: _noop,
  getColor: _noop,
  areErrorBarsVisible: _noop,
  drawLabelsWOPoints: function drawLabelsWOPoints() {
    var that = this;
    if (that._options.label.position === INSIDE) {
      return false;
    }
    that._labelsGroup.append(that._extGroups.labelsGroup);
    (that._points || []).forEach(function (point) {
      point.drawLabel();
    });
    return true;
  },
  getPointsCount: function getPointsCount() {
    var _this = this;
    return this._data.filter(function (d) {
      return _this._checkData(d);
    }).length;
  },
  setMaxPointsCount: function setMaxPointsCount(count) {
    this._pointsCount = count;
  },
  _getCreatingPointOptions: function _getCreatingPointOptions(data, dataIndex) {
    return this._getPointOptions(data, dataIndex);
  },
  _updateOptions: function _updateOptions(options) {
    this.labelSpace = 0;
    this.innerRadius = this.type === 'pie' ? 0 : options.innerRadius;
  },
  _checkData: function _checkData(data, skippedFields) {
    var base = barSeries._checkData.call(this, data, skippedFields, {
      value: this.getValueFields()[0]
    });
    return this._options.paintNullPoints ? base : base && data.value !== null;
  },
  _createGroups: chartScatterSeries._createGroups,
  _setMarkerGroupSettings: function _setMarkerGroupSettings() {
    this._markersGroup.attr({
      'class': 'dxc-markers'
    });
  },
  _getMainColor(data, point) {
    var pointsByArg = this.getPointsByArg(data.argument);
    var argumentIndex = point ? pointsByArg.indexOf(point) : pointsByArg.length;
    return this._options.mainSeriesColor(data.argument, argumentIndex, this._pointsCount);
  },
  _getPointOptions: function _getPointOptions(data) {
    return this._parsePointOptions(this._preparePointOptions(), this._options.label, data);
  },
  _getRangeData: function _getRangeData() {
    return this._rangeData;
  },
  _createPointStyles: function _createPointStyles(pointOptions, data, point) {
    var _pointOptions$color;
    var that = this;
    var mainColor = (0, _utils.extractColor)(pointOptions.color, true) || that._getMainColor(data, point);
    var colorId = (_pointOptions$color = pointOptions.color) === null || _pointOptions$color === void 0 ? void 0 : _pointOptions$color.fillId;
    var hoverStyle = pointOptions.hoverStyle || {};
    var selectionStyle = pointOptions.selectionStyle || {};
    if (colorId) {
      that._turnOffHatching(hoverStyle, selectionStyle);
    }
    return {
      labelColor: mainColor,
      normal: that._parsePointStyle(pointOptions, mainColor, mainColor),
      hover: that._parsePointStyle(hoverStyle, colorId || mainColor, mainColor),
      selection: that._parsePointStyle(selectionStyle, colorId || mainColor, mainColor),
      legendStyles: {
        normal: that._createLegendState(pointOptions, mainColor),
        hover: that._createLegendState(hoverStyle, colorId || mainColor),
        selection: that._createLegendState(selectionStyle, colorId || mainColor)
      }
    };
  },
  _getArrangeMinShownValue: function _getArrangeMinShownValue(points, total) {
    var minSegmentSize = this._options.minSegmentSize;
    var totalMinSegmentSize = 0;
    var totalNotMinValues = 0;
    total = total || points.length;
    _each(points, function (_, point) {
      if (point.isVisible()) {
        if (point.normalInitialValue < minSegmentSize * total / 360) {
          totalMinSegmentSize += minSegmentSize;
        } else {
          totalNotMinValues += point.normalInitialValue;
        }
      }
    });
    return totalMinSegmentSize < 360 ? minSegmentSize * totalNotMinValues / (360 - totalMinSegmentSize) : 0;
  },
  _applyArrangeCorrection: function _applyArrangeCorrection(points, minShownValue, total) {
    var options = this._options;
    var isClockWise = options.segmentsDirection !== 'anticlockwise';
    var shiftedAngle = _isFinite(options.startAngle) ? (0, _utils.normalizeAngle)(options.startAngle) : 0;
    var minSegmentSize = options.minSegmentSize;
    var percent;
    var correction = 0;
    var zeroTotalCorrection = 0;
    if (total === 0) {
      total = points.filter(function (el) {
        return el.isVisible();
      }).length;
      zeroTotalCorrection = 1;
    }
    _each(isClockWise ? points : points.concat([]).reverse(), function (_, point) {
      var val = point.isVisible() ? zeroTotalCorrection || point.normalInitialValue : 0;
      var updatedZeroValue;
      if (minSegmentSize && point.isVisible() && val < minShownValue) {
        updatedZeroValue = minShownValue;
      }
      percent = val / total;
      point.correctValue(correction, percent, zeroTotalCorrection + (updatedZeroValue || 0));
      point.shiftedAngle = shiftedAngle;
      correction = correction + (updatedZeroValue || val);
    });
    this._rangeData = {
      val: {
        min: 0,
        max: correction
      }
    };
  },
  _removePoint: function _removePoint(point) {
    var points = this.getPointsByArg(point.argument);
    points.splice(points.indexOf(point), 1); // T485210
    point.dispose();
  },
  arrangePoints: function arrangePoints() {
    var that = this;
    var originalPoints = that._points || [];
    var minSegmentSize = that._options.minSegmentSize;
    var minShownValue;
    var isAllPointsNegative = true;
    var i = 0;
    var len = originalPoints.length;
    while (i < len && isAllPointsNegative) {
      isAllPointsNegative = originalPoints[i].value <= 0;
      i++;
    }
    var points = that._points = _map(originalPoints, function (point) {
      if (point.value === null || !isAllPointsNegative && point.value < 0) {
        that._removePoint(point);
        return null;
      } else {
        return point;
      }
    });
    var maxValue = points.reduce(function (max, p) {
      return _max(max, Math.abs(p.initialValue));
    }, 0);
    points.forEach(function (p) {
      p.normalInitialValue = p.initialValue / (maxValue !== 0 ? maxValue : 1);
    });
    var total = points.reduce(function (total, point) {
      return total + (point.isVisible() ? point.normalInitialValue : 0);
    }, 0);
    if (minSegmentSize) {
      minShownValue = this._getArrangeMinShownValue(points, total);
    }
    that._applyArrangeCorrection(points, minShownValue, total);
  },
  correctPosition: function correctPosition(correction, canvas) {
    _each(this._points, function (_, point) {
      point.correctPosition(correction);
    });
    this.setVisibleArea(canvas);
  },
  correctRadius: function correctRadius(correction) {
    this._points.forEach(function (point) {
      point.correctRadius(correction);
    });
  },
  correctLabelRadius: function correctLabelRadius(labelRadius) {
    this._points.forEach(function (point) {
      point.correctLabelRadius(labelRadius);
    });
  },
  setVisibleArea: function setVisibleArea(canvas) {
    this._visibleArea = {
      minX: canvas.left,
      maxX: canvas.width - canvas.right,
      minY: canvas.top,
      maxY: canvas.height - canvas.bottom
    };
  },
  _applyVisibleArea: _noop,
  _animate: function _animate(firstDrawing) {
    var that = this;
    var points = that._points;
    var pointsCount = points && points.length;
    var completeFunc = function completeFunc() {
      that._animateComplete();
    };
    var animatePoint;
    if (firstDrawing) {
      animatePoint = function animatePoint(p, i) {
        p.animate(i === pointsCount - 1 ? completeFunc : undefined, ANIMATION_DURATION, (1 - ANIMATION_DURATION) * i / (pointsCount - 1));
      };
    } else {
      animatePoint = function animatePoint(p, i) {
        p.animate(i === pointsCount - 1 ? completeFunc : undefined);
      };
    }
    points.forEach(animatePoint);
  },
  getVisiblePoints: function getVisiblePoints() {
    return _map(this._points, function (p) {
      return p.isVisible() ? p : null;
    });
  },
  getPointsByKeys: function getPointsByKeys(arg, argumentIndex) {
    var pointsByArg = this.getPointsByArg(arg);
    return pointsByArg[argumentIndex] && [pointsByArg[argumentIndex]] || [];
  }
});
exports.pie = pie;
var doughnut = pie;
exports.doughnut = doughnut;
var donut = pie;
exports.donut = donut;
