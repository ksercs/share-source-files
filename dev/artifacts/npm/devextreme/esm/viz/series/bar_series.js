/**
* DevExtreme (esm/viz/series/bar_series.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../core/utils/extend';
import { each } from '../../core/utils/iterator';
import * as scatterSeries from './scatter_series';
import { chart as areaChart } from './area_series';
var areaSeries = areaChart.area;
import { convertPolarToXY, extractColor } from '../core/utils';
var chartSeries = scatterSeries.chart;
var polarSeries = scatterSeries.polar;
import { isDefined as _isDefined } from '../../core/utils/type';
var _extend = extend;
var _each = each;
var chart = {};
var polar = {};
var baseBarSeriesMethods = {
  _createLegendState: function _createLegendState(styleOptions, defaultColor) {
    return {
      fill: extractColor(styleOptions.color) || defaultColor,
      hatching: styleOptions.hatching,
      filter: styleOptions.highlight
    };
  },
  _getColorId: areaSeries._getColorId,
  _parsePointStyle: function _parsePointStyle(style, defaultColor, defaultBorderColor) {
    var color = extractColor(style.color) || defaultColor;
    var base = chartSeries._parsePointStyle.call(this, style, color, defaultBorderColor);
    base.fill = color;
    base.hatching = style.hatching;
    base.filter = style.highlight;
    base.dashStyle = style.border && style.border.dashStyle || 'solid';
    delete base.r;
    return base;
  },
  _applyMarkerClipRect: function _applyMarkerClipRect(settings) {
    settings['clip-path'] = null;
  },
  _setGroupsSettings: function _setGroupsSettings(animationEnabled, firstDrawing) {
    var that = this;
    var settings = {};
    chartSeries._setGroupsSettings.apply(that, arguments);
    if (animationEnabled && firstDrawing) {
      settings = this._getAffineCoordOptions();
    } else if (!animationEnabled) {
      settings = {
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0
      };
    }
    that._markersGroup.attr(settings);
  },
  _drawPoint: function _drawPoint(options) {
    options.hasAnimation = options.hasAnimation && !options.firstDrawing;
    options.firstDrawing = false;
    chartSeries._drawPoint.call(this, options);
  },
  _getMainColor: function _getMainColor() {
    return this._options.mainSeriesColor;
  },
  _createPointStyles: function _createPointStyles(pointOptions) {
    var _pointOptions$color;
    var that = this;
    var mainColor = extractColor(pointOptions.color, true) || that._getMainColor();
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
      selection: that._parsePointStyle(selectionStyle, colorId || mainColor, mainColor)
    };
  },
  _updatePointsVisibility: function _updatePointsVisibility() {
    var visibility = this._options.visible;
    each(this._points, function (_, point) {
      point._options.visible = visibility;
    });
  },
  _getOptionsForPoint: function _getOptionsForPoint() {
    return this._options;
  },
  _animate: function _animate(firstDrawing) {
    var that = this;
    var complete = function complete() {
      that._animateComplete();
    };
    var animateFunc = function animateFunc(drawnPoints, complete) {
      var lastPointIndex = drawnPoints.length - 1;
      _each(drawnPoints || [], function (i, point) {
        point.animate(i === lastPointIndex ? complete : undefined, point.getMarkerCoords());
      });
    };
    that._animatePoints(firstDrawing, complete, animateFunc);
  },
  getValueRangeInitialValue: areaSeries.getValueRangeInitialValue,
  _patchMarginOptions: function _patchMarginOptions(options) {
    var _this$getArgumentAxis;
    options.checkInterval = !this.useAggregation() || ((_this$getArgumentAxis = this.getArgumentAxis()) === null || _this$getArgumentAxis === void 0 ? void 0 : _this$getArgumentAxis.aggregatedPointBetweenTicks());
    return options;
  },
  _defaultAggregator: 'sum',
  _defineDrawingState() {},
  usePointsToDefineAutoHiding() {
    return false;
  }
};
chart.bar = _extend({}, chartSeries, baseBarSeriesMethods, {
  _getAffineCoordOptions: function _getAffineCoordOptions() {
    var rotated = this._options.rotated;
    var direction = rotated ? 'X' : 'Y';
    var settings = {
      scaleX: rotated ? 0.001 : 1,
      scaleY: rotated ? 1 : 0.001
    };
    settings['translate' + direction] = this.getValueAxis().getTranslator().translate('canvas_position_default');
    return settings;
  },
  _animatePoints: function _animatePoints(firstDrawing, complete, animateFunc) {
    var that = this;
    that._markersGroup.animate({
      scaleX: 1,
      scaleY: 1,
      translateY: 0,
      translateX: 0
    }, undefined, complete);
    if (!firstDrawing) {
      animateFunc(that._drawnPoints, complete);
    }
  },
  checkSeriesViewportCoord(axis, coord) {
    if (!chartSeries.checkSeriesViewportCoord.call(this)) {
      return false;
    }
    if (axis.isArgumentAxis) {
      return true;
    }
    var translator = axis.getTranslator();
    var range = this.getViewport();
    var min = translator.translate(range.categories ? range.categories[0] : range.min);
    var max = translator.translate(range.categories ? range.categories[range.categories.length - 1] : range.max);
    var rotated = this.getOptions().rotated;
    var inverted = axis.getOptions().inverted;
    return rotated && !inverted || !rotated && inverted ? coord >= min && coord <= max : coord >= max && coord <= min;
  },
  getSeriesPairCoord(coord, isArgument) {
    var oppositeCoord = null;
    var {
      rotated
    } = this._options;
    var isOpposite = !isArgument && !rotated || isArgument && rotated;
    var coordName = isOpposite ? 'vy' : 'vx';
    var oppositeCoordName = isOpposite ? 'vx' : 'vy';
    var points = this.getPoints();
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      var tmpCoord = void 0;
      if (isArgument) {
        tmpCoord = p.getCenterCoord()[coordName[1]] === coord ? p[oppositeCoordName] : undefined;
      } else {
        tmpCoord = p[coordName] === coord ? p[oppositeCoordName] : undefined;
      }
      if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
        oppositeCoord = tmpCoord;
        break;
      }
    }
    return oppositeCoord;
  }
});
polar.bar = _extend({}, polarSeries, baseBarSeriesMethods, {
  _animatePoints: function _animatePoints(firstDrawing, complete, animateFunc) {
    animateFunc(this._drawnPoints, complete);
  },
  _setGroupsSettings: chartSeries._setGroupsSettings,
  _drawPoint: function _drawPoint(point, groups, animationEnabled) {
    chartSeries._drawPoint.call(this, point, groups, animationEnabled);
  },
  _parsePointStyle: function _parsePointStyle(style) {
    var base = baseBarSeriesMethods._parsePointStyle.apply(this, arguments);
    base.opacity = style.opacity;
    return base;
  },
  _createGroups: chartSeries._createGroups,
  _setMarkerGroupSettings: function _setMarkerGroupSettings() {
    var that = this;
    var markersSettings = that._createPointStyles(that._getMarkerGroupOptions()).normal;
    markersSettings['class'] = 'dxc-markers';
    that._applyMarkerClipRect(markersSettings);
    var groupSettings = _extend({}, markersSettings);
    delete groupSettings.opacity; // T110796
    that._markersGroup.attr(groupSettings);
  },
  getSeriesPairCoord(params, isArgument) {
    var coords = null;
    var paramName = isArgument ? 'argument' : 'radius';
    var points = this.getVisiblePoints();
    var argAxis = this.getArgumentAxis();
    var startAngle = argAxis.getAngles()[0];
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      var tmpPoint = _isDefined(p[paramName]) && _isDefined(params[paramName]) && p[paramName].valueOf() === params[paramName].valueOf() ? convertPolarToXY(argAxis.getCenter(), startAngle, -argAxis.getTranslatedAngle(p.angle), p.radius) : undefined;
      if (_isDefined(tmpPoint)) {
        coords = tmpPoint;
        break;
      }
    }
    return coords;
  },
  _createLegendState: areaSeries._createLegendState
});
export { chart, polar };
