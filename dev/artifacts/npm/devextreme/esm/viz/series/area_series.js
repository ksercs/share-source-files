/**
* DevExtreme (esm/viz/series/area_series.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// there are area, steparea, stackedarea, fullstackedarea, splinearea
import { clone } from '../../core/utils/object';
import { extend } from '../../core/utils/extend';
import { chart as scatterSeries } from './scatter_series';
import { chart as lineSeriesChart, polar as lineSeriesPolar } from './line_series';
var chartLineSeries = lineSeriesChart.line;
var polarLineSeries = lineSeriesPolar.line;
import { map as _map, extractColor } from '../core/utils';
var _extend = extend;
var calculateBezierPoints = lineSeriesChart['spline']._calculateBezierPoints;
var chart = {};
var polar = {};
var baseAreaMethods = {
  _createBorderElement: chartLineSeries._createMainElement,
  _createLegendState: function _createLegendState(styleOptions, defaultColor) {
    return {
      fill: extractColor(styleOptions.color) || defaultColor,
      opacity: styleOptions.opacity,
      hatching: styleOptions.hatching,
      filter: styleOptions.highlight
    };
  },
  _getColorId: function _getColorId(options) {
    var _options$color;
    return (_options$color = options.color) === null || _options$color === void 0 ? void 0 : _options$color.fillId;
  },
  getValueRangeInitialValue: function getValueRangeInitialValue() {
    if (this.valueAxisType !== 'logarithmic' && this.valueType !== 'datetime' && this.showZero !== false) {
      return 0;
    } else {
      return scatterSeries.getValueRangeInitialValue.call(this);
    }
  },
  _getDefaultSegment: function _getDefaultSegment(segment) {
    var defaultSegment = chartLineSeries._getDefaultSegment(segment);
    defaultSegment.area = defaultSegment.line.concat(defaultSegment.line.slice().reverse());
    return defaultSegment;
  },
  _updateElement: function _updateElement(element, segment, animate, complete) {
    var lineParams = {
      points: segment.line
    };
    var areaParams = {
      points: segment.area
    };
    var borderElement = element.line;
    if (animate) {
      borderElement && borderElement.animate(lineParams);
      element.area.animate(areaParams, {}, complete);
    } else {
      borderElement && borderElement.attr(lineParams);
      element.area.attr(areaParams);
    }
  },
  _removeElement: function _removeElement(element) {
    element.line && element.line.remove();
    element.area.remove();
  },
  _drawElement: function _drawElement(segment) {
    return {
      line: this._bordersGroup && this._createBorderElement(segment.line, {
        'stroke-width': this._styles.normal.border['stroke-width']
      }).append(this._bordersGroup),
      area: this._createMainElement(segment.area).append(this._elementsGroup)
    };
  },
  _applyStyle: function _applyStyle(style) {
    var that = this;
    that._elementsGroup && that._elementsGroup.smartAttr(style.elements);
    that._bordersGroup && that._bordersGroup.attr(style.border);
    (that._graphics || []).forEach(function (graphic) {
      graphic.line && graphic.line.attr({
        'stroke-width': style.border['stroke-width']
      }).sharp();
    });
  },
  _parseStyle: function _parseStyle(options, defaultColor, defaultBorderColor) {
    var _options$highlight;
    var borderOptions = options.border || {};
    var borderStyle = chartLineSeries._parseLineOptions(borderOptions, defaultBorderColor);
    borderStyle.stroke = borderOptions.visible && borderStyle['stroke-width'] ? borderStyle.stroke : 'none';
    borderStyle['stroke-width'] = borderStyle['stroke-width'] || 1;
    return {
      border: borderStyle,
      elements: {
        stroke: 'none',
        fill: extractColor(options.color) || defaultColor,
        hatching: options.hatching,
        opacity: options.opacity,
        filter: (_options$highlight = options.highlight) !== null && _options$highlight !== void 0 ? _options$highlight : null
      }
    };
  },
  _areBordersVisible: function _areBordersVisible() {
    var options = this._options;
    return options.border.visible || options.hoverStyle.border.visible || options.selectionStyle.border.visible;
  },
  _createMainElement: function _createMainElement(points, settings) {
    return this._renderer.path(points, 'area').attr(settings);
  },
  _getTrackerSettings: function _getTrackerSettings(segment) {
    return {
      'stroke-width': segment.singlePointSegment ? this._defaultTrackerWidth : 0
    };
  },
  _getMainPointsFromSegment: function _getMainPointsFromSegment(segment) {
    return segment.area;
  }
};
function createAreaPoints(points) {
  return _map(points, function (pt) {
    return pt.getCoords();
  }).concat(_map(points.slice().reverse(), function (pt) {
    return pt.getCoords(true);
  }));
}
var areaSeries = chart['area'] = _extend({}, chartLineSeries, baseAreaMethods, {
  _prepareSegment(points, rotated) {
    var that = this;
    var processedPoints = that._processSinglePointsAreaSegment(points, rotated);
    var areaPoints = createAreaPoints(processedPoints);
    var argAxis = that.getArgumentAxis();
    if (argAxis.getAxisPosition) {
      var argAxisPosition = argAxis.getAxisPosition();
      var axisOptions = argAxis.getOptions();
      var edgeOffset = (!rotated ? -1 : 1) * Math.round(axisOptions.width / 2);
      if (axisOptions.visible) {
        areaPoints.forEach((p, i) => {
          if (p) {
            var index = points.length === 1 ? 0 : i < points.length ? i : areaPoints.length - 1 - i;
            rotated && p.x === points[index].defaultX && p.x === argAxisPosition - argAxis.getAxisShift() && (p.x += edgeOffset);
            !rotated && p.y === points[index].defaultY && p.y === argAxisPosition - argAxis.getAxisShift() && (p.y += edgeOffset);
          }
        });
      }
    }
    return {
      line: processedPoints,
      area: areaPoints,
      singlePointSegment: processedPoints !== points
    };
  },
  _processSinglePointsAreaSegment: function _processSinglePointsAreaSegment(points, rotated) {
    if (points && points.length === 1) {
      var p = points[0];
      var p1 = clone(p);
      p1[rotated ? 'y' : 'x'] += 1;
      p1.argument = null;
      return [p, p1];
    }
    return points;
  }
});
polar['area'] = _extend({}, polarLineSeries, baseAreaMethods, {
  _prepareSegment: function _prepareSegment(points, rotated, lastSegment) {
    lastSegment && polarLineSeries._closeSegment.call(this, points);
    return areaSeries._prepareSegment.call(this, points);
  },
  _processSinglePointsAreaSegment: function _processSinglePointsAreaSegment(points) {
    return lineSeriesPolar.line._prepareSegment.call(this, points).line;
  }
});
chart['steparea'] = _extend({}, areaSeries, {
  _prepareSegment: function _prepareSegment(points, rotated) {
    var stepLineSeries = lineSeriesChart['stepline'];
    points = areaSeries._processSinglePointsAreaSegment(points, rotated);
    return areaSeries._prepareSegment.call(this, stepLineSeries._calculateStepLinePoints.call(this, points), rotated);
  },
  getSeriesPairCoord: lineSeriesChart['stepline'].getSeriesPairCoord
});
chart['splinearea'] = _extend({}, areaSeries, {
  _areaPointsToSplineAreaPoints: function _areaPointsToSplineAreaPoints(areaPoints) {
    var previousMiddlePoint = areaPoints[areaPoints.length / 2 - 1];
    var middlePoint = areaPoints[areaPoints.length / 2];
    areaPoints.splice(areaPoints.length / 2, 0, {
      x: previousMiddlePoint.x,
      y: previousMiddlePoint.y
    }, {
      x: middlePoint.x,
      y: middlePoint.y
    });
  },
  _prepareSegment: function _prepareSegment(points, rotated) {
    var processedPoints = areaSeries._processSinglePointsAreaSegment(points, rotated);
    var areaSegment = areaSeries._prepareSegment.call(this, calculateBezierPoints(processedPoints, rotated));
    this._areaPointsToSplineAreaPoints(areaSegment.area);
    areaSegment.singlePointSegment = processedPoints !== points;
    return areaSegment;
  },
  _getDefaultSegment: function _getDefaultSegment(segment) {
    var areaDefaultSegment = areaSeries._getDefaultSegment(segment);
    this._areaPointsToSplineAreaPoints(areaDefaultSegment.area);
    return areaDefaultSegment;
  },
  _createMainElement: function _createMainElement(points, settings) {
    return this._renderer.path(points, 'bezierarea').attr(settings);
  },
  _createBorderElement: lineSeriesChart['spline']._createMainElement,
  getSeriesPairCoord: lineSeriesChart['spline'].getSeriesPairCoord,
  _getNearestPoints: lineSeriesChart['spline']._getNearestPoints,
  _getBezierPoints: lineSeriesChart['spline']._getBezierPoints,
  obtainCubicBezierTCoef: lineSeriesChart['spline'].obtainCubicBezierTCoef
});
export { chart, polar };
