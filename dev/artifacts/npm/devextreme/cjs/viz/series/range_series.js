/**
* DevExtreme (cjs/viz/series/range_series.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.chart = void 0;
var _extend2 = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _utils = require("../core/utils");
var _common = require("../../core/utils/common");
var _scatter_series = require("./scatter_series");
var _bar_series = require("./bar_series");
var _area_series = require("./area_series");
// there are rangebar, rangearea

var _extend = _extend2.extend;
var barSeries = _bar_series.chart.bar;
var areaSeries = _area_series.chart.area;
var chart = {};
exports.chart = chart;
var baseRangeSeries = {
  areErrorBarsVisible: _common.noop,
  _createErrorBarGroup: _common.noop,
  _checkData: function _checkData(data, skippedFields) {
    var valueFields = this.getValueFields();
    return _scatter_series.chart._checkData.call(this, data, skippedFields, {
      minValue: valueFields[0],
      value: valueFields[1]
    }) && data.minValue === data.minValue;
  },
  getValueRangeInitialValue: _scatter_series.chart.getValueRangeInitialValue,
  _getPointDataSelector: function _getPointDataSelector(data) {
    var _this = this;
    var valueFields = this.getValueFields();
    var val1Field = valueFields[0];
    var val2Field = valueFields[1];
    var tagField = this.getTagField();
    var argumentField = this.getArgumentField();
    return function (data) {
      return {
        tag: data[tagField],
        minValue: _this._processEmptyValue(data[val1Field]),
        value: _this._processEmptyValue(data[val2Field]),
        argument: data[argumentField],
        data: data
      };
    };
  },
  _defaultAggregator: 'range',
  _aggregators: {
    range(_ref, series) {
      var intervalStart = _ref.intervalStart,
        intervalEnd = _ref.intervalEnd,
        data = _ref.data;
      if (!data.length) {
        return;
      }
      var valueFields = series.getValueFields();
      var val1Field = valueFields[0];
      var val2Field = valueFields[1];
      var result = data.reduce(function (result, item) {
        var val1 = item[val1Field];
        var val2 = item[val2Field];
        if (!(0, _type.isDefined)(val1) || !(0, _type.isDefined)(val2)) {
          return result;
        }
        result[val1Field] = Math.min(result[val1Field], Math.min(val1, val2));
        result[val2Field] = Math.max(result[val2Field], Math.max(val1, val2));
        return result;
      }, {
        [val1Field]: Infinity,
        [val2Field]: -Infinity,
        [series.getArgumentField()]: series._getIntervalCenter(intervalStart, intervalEnd)
      });
      if (!isFinite(result[val1Field]) || !isFinite(result[val2Field])) {
        if (data.filter(function (i) {
          return i[val1Field] === null && i[val2Field] === null;
        }).length === data.length) {
          result[val1Field] = result[val2Field] = null;
        } else {
          return;
        }
      }
      return result;
    }
  },
  getValueFields: function getValueFields() {
    return [this._options.rangeValue1Field || 'val1', this._options.rangeValue2Field || 'val2'];
  },
  getSeriesPairCoord(coord, isArgument) {
    var oppositeCoord = null;
    var rotated = this._options.rotated;
    var isOpposite = !isArgument && !rotated || isArgument && rotated;
    var coordName = isOpposite ? 'vy' : 'vx';
    var minCoordName = rotated ? 'minX' : 'minY';
    var oppositeCoordName = isOpposite ? 'vx' : 'vy';
    var points = this.getPoints();
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      var tmpCoord = void 0;
      if (isArgument) {
        tmpCoord = p.getCenterCoord()[coordName[1]] === coord ? p[oppositeCoordName] : undefined;
      } else {
        var coords = [Math.min(p[coordName], p[minCoordName]), Math.max(p[coordName], p[minCoordName])];
        tmpCoord = coord >= coords[0] && coord <= coords[1] ? p[oppositeCoordName] : undefined;
      }
      if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
        oppositeCoord = tmpCoord;
        break;
      }
    }
    return oppositeCoord;
  }
};
chart['rangebar'] = _extend({}, barSeries, baseRangeSeries);
chart['rangearea'] = _extend({}, areaSeries, {
  _drawPoint: function _drawPoint(options) {
    var point = options.point;
    if (point.isInVisibleArea()) {
      point.clearVisibility();
      point.draw(this._renderer, options.groups);
      this._drawnPoints.push(point);
      if (!point.visibleTopMarker) {
        point.hideMarker('top');
      }
      if (!point.visibleBottomMarker) {
        point.hideMarker('bottom');
      }
    } else {
      point.setInvisibility();
    }
  },
  _prepareSegment: function _prepareSegment(points, rotated) {
    var processedPoints = this._processSinglePointsAreaSegment(points, rotated);
    var processedMinPointsCoords = (0, _utils.map)(processedPoints, function (pt) {
      return pt.getCoords(true);
    });
    return {
      line: processedPoints,
      bottomLine: processedMinPointsCoords,
      area: (0, _utils.map)(processedPoints, function (pt) {
        return pt.getCoords();
      }).concat(processedMinPointsCoords.slice().reverse()),
      singlePointSegment: processedPoints !== points
    };
  },
  _getDefaultSegment: function _getDefaultSegment(segment) {
    var defaultSegment = areaSeries._getDefaultSegment.call(this, segment);
    defaultSegment.bottomLine = defaultSegment.line;
    return defaultSegment;
  },
  _removeElement: function _removeElement(element) {
    areaSeries._removeElement.call(this, element);
    element.bottomLine && element.bottomLine.remove();
  },
  _drawElement: function _drawElement(segment, group) {
    var that = this;
    var drawnElement = areaSeries._drawElement.call(that, segment, group);
    drawnElement.bottomLine = that._bordersGroup && that._createBorderElement(segment.bottomLine, {
      'stroke-width': that._styles.normal.border['stroke-width']
    }).append(that._bordersGroup);
    return drawnElement;
  },
  _applyStyle: function _applyStyle(style) {
    var that = this;
    var elementsGroup = that._elementsGroup;
    var bordersGroup = that._bordersGroup;
    elementsGroup && elementsGroup.smartAttr(style.elements);
    bordersGroup && bordersGroup.attr(style.border);
    (that._graphics || []).forEach(function (graphic) {
      graphic.line && graphic.line.attr({
        'stroke-width': style.border['stroke-width']
      });
      graphic.bottomLine && graphic.bottomLine.attr({
        'stroke-width': style.border['stroke-width']
      });
    });
  },
  _updateElement: function _updateElement(element, segment, animate, complete) {
    var bottomLineParams = {
      points: segment.bottomLine
    };
    var bottomBorderElement = element.bottomLine;
    areaSeries._updateElement.apply(this, arguments);
    if (bottomBorderElement) {
      animate ? bottomBorderElement.animate(bottomLineParams) : bottomBorderElement.attr(bottomLineParams);
    }
  }
}, baseRangeSeries);
