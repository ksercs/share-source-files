/**
* DevExtreme (esm/viz/axes/polar_axes.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { map as _map, convertPolarToXY, convertXYToPolar, normalizeAngle, getVizRangeObject, getCosAndSin, getDistance } from '../core/utils';
import { isDefined } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import constants from './axes_constants';
import xyAxes from './xy_axes';
import { tick } from './tick';
import { calculateCanvasMargins, measureLabels } from './axes_utils';
import { noop as _noop } from '../../core/utils/common';
var {
  PI,
  abs,
  atan,
  round
} = Math;
var _min = Math.min;
var _max = Math.max;
var xyAxesLinear = xyAxes.linear;
var HALF_PI_ANGLE = 90;
function getPolarQuarter(angle) {
  var quarter;
  angle = normalizeAngle(angle);
  if (angle >= 315 && angle <= 360 || angle < 45 && angle >= 0) {
    quarter = 1;
  } else if (angle >= 45 && angle < 135) {
    quarter = 2;
  } else if (angle >= 135 && angle < 225) {
    quarter = 3;
  } else if (angle >= 225 && angle < 315) {
    quarter = 4;
  }
  return quarter;
}
var circularAxes = {
  _calculateValueMargins(ticks) {
    var {
      minVisible,
      maxVisible
    } = this._getViewportRange();
    if (ticks && ticks.length > 1) {
      minVisible = minVisible < ticks[0].value ? minVisible : ticks[0].value;
      maxVisible = minVisible > ticks[ticks.length - 1].value ? maxVisible : ticks[ticks.length - 1].value;
    }
    return {
      minValue: minVisible,
      maxValue: maxVisible
    };
  },
  applyMargins() {
    var margins = this._calculateValueMargins(this._majorTicks);
    var br = this._translator.getBusinessRange();
    br.addRange({
      minVisible: margins.minValue,
      maxVisible: margins.maxValue,
      interval: this._calculateRangeInterval(br.interval)
    });
    this._translator.updateBusinessRange(br);
  },
  _getTranslatorOptions: function _getTranslatorOptions() {
    return {
      isHorizontal: true,
      conversionValue: true,
      addSpiderCategory: this._getSpiderCategoryOption(),
      stick: this._getStick()
    };
  },
  getCenter: function getCenter() {
    return this._center;
  },
  getRadius: function getRadius() {
    return this._radius;
  },
  getAngles: function getAngles() {
    var options = this._options;
    return [options.startAngle, options.endAngle];
  },
  _updateRadius(canvas) {
    var rad = _min(canvas.width - canvas.left - canvas.right, canvas.height - canvas.top - canvas.bottom) / 2;
    this._radius = rad < 0 ? 0 : rad;
  },
  _updateCenter: function _updateCenter(canvas) {
    this._center = {
      x: canvas.left + (canvas.width - canvas.right - canvas.left) / 2,
      y: canvas.top + (canvas.height - canvas.top - canvas.bottom) / 2
    };
  },
  _processCanvas: function _processCanvas(canvas) {
    this._updateRadius(canvas);
    this._updateCenter(canvas);
    return {
      left: 0,
      right: 0,
      width: this._getScreenDelta()
    };
  },
  _createAxisElement: function _createAxisElement() {
    return this._renderer.circle();
  },
  _updateAxisElementPosition: function _updateAxisElementPosition() {
    var center = this.getCenter();
    this._axisElement.attr({
      cx: center.x,
      cy: center.y,
      r: this.getRadius()
    });
  },
  _boundaryTicksVisibility: {
    min: true
  },
  _getSpiderCategoryOption: function _getSpiderCategoryOption() {
    // TODO rename spider
    return this._options.firstPointOnStartAngle;
  },
  _validateOptions(options) {
    var that = this;
    var originValue = options.originValue;
    var wholeRange = options.wholeRange = {};
    var period = options.period;
    if (isDefined(originValue)) {
      originValue = that.validateUnit(originValue);
    }
    if (period > 0 && options.argumentType === constants.numeric) {
      originValue = originValue || 0;
      wholeRange.endValue = originValue + period;
      that._viewport = getVizRangeObject([originValue, wholeRange.endValue]);
    }
    if (isDefined(originValue)) {
      wholeRange.startValue = originValue;
    }
  },
  getMargins() {
    var tickOptions = this._options.tick;
    var tickOuterLength = _max(tickOptions.visible ? tickOptions.length / 2 + tickOptions.shift : 0, 0);
    var radius = this.getRadius();
    var {
      x,
      y
    } = this._center;
    var labelBoxes = this._majorTicks.map(t => t.label && t.label.getBBox()).filter(b => b);
    var canvas = extend({}, this._canvas, {
      left: x - radius,
      top: y - radius,
      right: this._canvas.width - (x + radius),
      bottom: this._canvas.height - (y + radius)
    });
    var margins = calculateCanvasMargins(labelBoxes, canvas);
    Object.keys(margins).forEach(k => margins[k] = margins[k] < tickOuterLength ? tickOuterLength : margins[k]);
    return margins;
  },
  _updateLabelsPosition() {
    var that = this;
    measureLabels(that._majorTicks);
    that._adjustLabelsCoord(0, 0, true);
    that._checkBoundedLabelsOverlapping(this._majorTicks, this._majorTicks.map(t => t.labelBBox));
  },
  _setVisualRange: _noop,
  applyVisualRangeSetter: _noop,
  _getStick: function _getStick() {
    return this._options.firstPointOnStartAngle || this._options.type !== constants.discrete;
  },
  _getTranslatedCoord: function _getTranslatedCoord(value, offset) {
    return this._translator.translate(value, offset) - HALF_PI_ANGLE;
  },
  _getCanvasStartEnd: function _getCanvasStartEnd() {
    return {
      start: 0 - HALF_PI_ANGLE,
      end: 360 - HALF_PI_ANGLE
    };
  },
  _getStripGraphicAttributes: function _getStripGraphicAttributes(fromAngle, toAngle) {
    var center = this.getCenter();
    var angle = this.getAngles()[0];
    var r = this.getRadius();
    return {
      x: center.x,
      y: center.y,
      innerRadius: 0,
      outerRadius: r,
      startAngle: -toAngle - angle,
      endAngle: -fromAngle - angle
    };
  },
  _createStrip: function _createStrip(coords) {
    return this._renderer.arc(coords.x, coords.y, coords.innerRadius, coords.outerRadius, coords.startAngle, coords.endAngle);
  },
  _getStripLabelCoords: function _getStripLabelCoords(from, to) {
    var that = this;
    var coords = that._getStripGraphicAttributes(from, to);
    var angle = coords.startAngle + (coords.endAngle - coords.startAngle) / 2;
    var cosSin = getCosAndSin(angle);
    var halfRad = that.getRadius() / 2;
    var center = that.getCenter();
    var x = round(center.x + halfRad * cosSin.cos);
    var y = round(center.y - halfRad * cosSin.sin);
    return {
      x: x,
      y: y,
      align: constants.center
    };
  },
  _getConstantLineGraphicAttributes: function _getConstantLineGraphicAttributes(value) {
    var center = this.getCenter();
    var r = this.getRadius();
    return {
      points: [center.x, center.y, center.x + r, center.y]
    };
  },
  _createConstantLine: function _createConstantLine(value, attr) {
    return this._createPathElement(this._getConstantLineGraphicAttributes(value).points, attr);
  },
  _rotateConstantLine(line, value) {
    var {
      x,
      y
    } = this.getCenter();
    line.rotate(value + this.getAngles()[0], x, y);
  },
  _getConstantLineLabelsCoords: function _getConstantLineLabelsCoords(value) {
    var that = this;
    var cosSin = getCosAndSin(-value - that.getAngles()[0]);
    var halfRad = that.getRadius() / 2;
    var center = that.getCenter();
    var x = round(center.x + halfRad * cosSin.cos);
    var y = round(center.y - halfRad * cosSin.sin);
    return {
      x: x,
      y: y
    };
  },
  _checkAlignmentConstantLineLabels: _noop,
  _adjustDivisionFactor: function _adjustDivisionFactor(val) {
    return val * 180 / (this.getRadius() * PI);
  },
  _getScreenDelta: function _getScreenDelta() {
    var angles = this.getAngles();
    return abs(angles[0] - angles[1]);
  },
  _getTickMarkPoints: function _getTickMarkPoints(coords, length, _ref) {
    var {
      shift = 0
    } = _ref;
    var center = this.getCenter();
    var corrections = {
      inside: -1,
      center: -0.5,
      outside: 0
    };
    var radiusWithTicks = this.getRadius() + length * corrections[this._options.tickOrientation || 'center'];
    return [center.x + radiusWithTicks + shift, center.y, center.x + radiusWithTicks + length + shift, center.y];
  },
  _getLabelAdjustedCoord: function _getLabelAdjustedCoord(tick, _offset, _maxWidth, checkCanvas) {
    var that = this;
    var labelCoords = tick.labelCoords;
    var labelY = labelCoords.y;
    var labelAngle = labelCoords.angle;
    var cosSin = getCosAndSin(labelAngle);
    var cos = cosSin.cos;
    var sin = cosSin.sin;
    var box = tick.labelBBox;
    var halfWidth = box.width / 2;
    var halfHeight = box.height / 2;
    var indentFromAxis = that._options.label.indentFromAxis || 0;
    var x = labelCoords.x + indentFromAxis * cos;
    var y = labelY + (labelY - box.y - halfHeight) + indentFromAxis * sin;
    var shiftX = 0;
    var shiftY = 0;
    switch (getPolarQuarter(labelAngle)) {
      case 1:
        shiftX = halfWidth;
        shiftY = halfHeight * sin;
        break;
      case 2:
        shiftX = halfWidth * cos;
        shiftY = halfHeight;
        break;
      case 3:
        shiftX = -halfWidth;
        shiftY = halfHeight * sin;
        break;
      case 4:
        shiftX = halfWidth * cos;
        shiftY = -halfHeight;
        break;
    }
    if (checkCanvas) {
      var canvas = that._canvas;
      var boxShiftX = x - labelCoords.x + shiftX;
      var boxShiftY = y - labelCoords.y + shiftY;
      if (box.x + boxShiftX < canvas.originalLeft) {
        shiftX -= box.x + boxShiftX - canvas.originalLeft;
      }
      if (box.x + box.width + boxShiftX > canvas.width - canvas.originalRight) {
        shiftX -= box.x + box.width + boxShiftX - (canvas.width - canvas.originalRight);
      }
      if (box.y + boxShiftY < canvas.originalTop) {
        shiftY -= box.y + boxShiftY - canvas.originalTop;
      }
      if (box.y + box.height + boxShiftY > canvas.height - canvas.originalBottom) {
        shiftY -= box.y + box.height + boxShiftY - (canvas.height - canvas.originalBottom);
      }
    }
    return {
      x: x + shiftX,
      y: y + shiftY
    };
  },
  _getGridLineDrawer: function _getGridLineDrawer() {
    var that = this;
    return function (tick, gridStyle) {
      var center = that.getCenter();
      return that._createPathElement(that._getGridPoints().points, gridStyle).rotate(tick.coords.angle, center.x, center.y);
    };
  },
  _getGridPoints: function _getGridPoints() {
    var r = this.getRadius();
    var center = this.getCenter();
    return {
      points: [center.x, center.y, center.x + r, center.y]
    };
  },
  _getTranslatedValue: function _getTranslatedValue(value, offset) {
    var startAngle = this.getAngles()[0];
    var angle = this._translator.translate(value, -offset);
    var coords = convertPolarToXY(this.getCenter(), startAngle, angle, this.getRadius());
    return {
      x: coords.x,
      y: coords.y,
      angle: this.getTranslatedAngle(angle)
    };
  },
  _getAdjustedStripLabelCoords: function _getAdjustedStripLabelCoords(strip) {
    var box = strip.labelBBox;
    return {
      translateY: strip.label.attr('y') - box.y - box.height / 2
    };
  },
  coordsIn: function coordsIn(x, y) {
    return convertXYToPolar(this.getCenter(), x, y).r > this.getRadius();
  },
  _rotateTick: function _rotateTick(element, coords) {
    var center = this.getCenter();
    element.rotate(coords.angle, center.x, center.y);
  },
  _validateOverlappingMode: function _validateOverlappingMode(mode) {
    return constants.validateOverlappingMode(mode);
  },
  _validateDisplayMode: function _validateDisplayMode() {
    return 'standard';
  },
  _getStep: function _getStep(boxes) {
    var that = this;
    var radius = that.getRadius() + (that._options.label.indentFromAxis || 0);
    var maxLabelBox = boxes.reduce(function (prevValue, box) {
      var curValue = prevValue;
      if (prevValue.width < box.width) {
        curValue.width = box.width;
      }
      if (prevValue.height < box.height) {
        curValue.height = box.height;
      }
      return curValue;
    }, {
      width: 0,
      height: 0
    });
    var angle1 = abs(2 * atan(maxLabelBox.height / (2 * radius - maxLabelBox.width)) * 180 / PI);
    var angle2 = abs(2 * atan(maxLabelBox.width / (2 * radius - maxLabelBox.height)) * 180 / PI);
    return constants.getTicksCountInRange(that._majorTicks, 'angle', _max(angle1, angle2));
  },
  _checkBoundedLabelsOverlapping: function _checkBoundedLabelsOverlapping(majorTicks, boxes, mode) {
    var labelOpt = this._options.label;
    mode = mode || this._validateOverlappingMode(labelOpt.overlappingBehavior);
    if (mode !== 'hide') {
      return;
    }
    var lastVisibleLabelIndex = majorTicks.reduce((lastVisibleLabelIndex, tick, index) => tick.label ? index : lastVisibleLabelIndex, null);
    if (!lastVisibleLabelIndex) {
      return;
    }
    if (constants.areLabelsOverlap(boxes[0], boxes[lastVisibleLabelIndex], labelOpt.minSpacing, constants.center)) {
      labelOpt.hideFirstOrLast === 'first' ? majorTicks[0].removeLabel() : majorTicks[lastVisibleLabelIndex].removeLabel();
    }
  },
  shift: function shift(margins) {
    this._axisGroup.attr({
      translateX: margins.right,
      translateY: margins.bottom
    });
    this._axisElementsGroup.attr({
      translateX: margins.right,
      translateY: margins.bottom
    });
  },
  getTranslatedAngle(angle) {
    var startAngle = this.getAngles()[0];
    return angle + startAngle - HALF_PI_ANGLE;
  }
};
export var circular = circularAxes;
export var circularSpider = extend({}, circularAxes, {
  _createAxisElement: function _createAxisElement() {
    return this._renderer.path([], 'area');
  },
  _updateAxisElementPosition: function _updateAxisElementPosition() {
    this._axisElement.attr({
      points: _map(this.getSpiderTicks(), function (tick) {
        return {
          x: tick.coords.x,
          y: tick.coords.y
        };
      })
    });
  },
  _getStick: function _getStick() {
    return true;
  },
  _getSpiderCategoryOption: function _getSpiderCategoryOption() {
    return true;
  },
  getSpiderTicks: function getSpiderTicks() {
    var that = this;
    var ticks = that.getFullTicks();
    that._spiderTicks = ticks.map(tick(that, that.renderer, {}, {}, that._getSkippedCategory(ticks), true));
    that._spiderTicks.forEach(function (tick) {
      tick.initCoords();
    });
    return that._spiderTicks;
  },
  _getStripGraphicAttributes: function _getStripGraphicAttributes(fromAngle, toAngle) {
    var center = this.getCenter();
    var spiderTicks = this.getSpiderTicks();
    var firstTick;
    var lastTick;
    var nextTick;
    var tick;
    var points = [];
    var i = 0;
    var len = spiderTicks.length;
    while (i < len) {
      tick = spiderTicks[i].coords;
      if (tick.angle >= fromAngle && tick.angle <= toAngle) {
        if (!firstTick) {
          firstTick = (spiderTicks[i - 1] || spiderTicks[spiderTicks.length - 1]).coords;
          points.push((tick.x + firstTick.x) / 2, (tick.y + firstTick.y) / 2);
        }
        points.push(tick.x, tick.y);
        nextTick = (spiderTicks[i + 1] || spiderTicks[0]).coords;
        lastTick = {
          x: (tick.x + nextTick.x) / 2,
          y: (tick.y + nextTick.y) / 2
        };
      }
      i++;
    }
    points.push(lastTick.x, lastTick.y);
    points.push(center.x, center.y);
    return {
      points: points
    };
  },
  _createStrip: function _createStrip(_ref2) {
    var {
      points
    } = _ref2;
    return this._renderer.path(points, 'area');
  },
  _getTranslatedCoord: function _getTranslatedCoord(value, offset) {
    return this._translator.translate(value, offset) - HALF_PI_ANGLE;
  },
  _setTickOffset: function _setTickOffset() {
    this._tickOffset = false;
  }
});
export var linear = {
  _resetMargins() {
    this._reinitTranslator(this._getViewportRange());
  },
  _getStick: xyAxesLinear._getStick,
  _getSpiderCategoryOption: _noop,
  _getTranslatorOptions: function _getTranslatorOptions() {
    return {
      isHorizontal: true,
      stick: this._getStick()
    };
  },
  getRadius: circularAxes.getRadius,
  getCenter: circularAxes.getCenter,
  getAngles: circularAxes.getAngles,
  _updateRadius: circularAxes._updateRadius,
  _updateCenter: circularAxes._updateCenter,
  _processCanvas(canvas) {
    this._updateRadius(canvas);
    this._updateCenter(canvas);
    return {
      left: 0,
      right: 0,
      startPadding: canvas.startPadding,
      endPadding: canvas.endPadding,
      width: this.getRadius()
    };
  },
  _createAxisElement: xyAxesLinear._createAxisElement,
  _updateAxisElementPosition: function _updateAxisElementPosition() {
    var centerCoord = this.getCenter();
    this._axisElement.attr({
      points: [centerCoord.x, centerCoord.y, centerCoord.x + this.getRadius(), centerCoord.y]
    }).rotate(this.getAngles()[0] - HALF_PI_ANGLE, centerCoord.x, centerCoord.y);
  },
  _getScreenDelta: function _getScreenDelta() {
    return this.getRadius();
  },
  _getTickMarkPoints: function _getTickMarkPoints(coords, length) {
    return [coords.x - length / 2, coords.y, coords.x + length / 2, coords.y];
  },
  _getLabelAdjustedCoord: function _getLabelAdjustedCoord(tick) {
    var that = this;
    var labelCoords = tick.labelCoords;
    var labelY = labelCoords.y;
    var cosSin = getCosAndSin(labelCoords.angle);
    var indentFromAxis = that._options.label.indentFromAxis || 0;
    var box = tick.labelBBox;
    var x = labelCoords.x - abs(indentFromAxis * cosSin.sin) + abs(box.width / 2 * cosSin.cos) - box.width / 2;
    var y = labelY + (labelY - box.y) - abs(box.height / 2 * cosSin.sin) + abs(indentFromAxis * cosSin.cos);
    return {
      x: x,
      y: y
    };
  },
  _getGridLineDrawer: function _getGridLineDrawer() {
    var that = this;
    return function (tick, gridStyle) {
      var grid = that._getGridPoints(tick.coords);
      return that._renderer.circle(grid.cx, grid.cy, grid.r).attr(gridStyle).sharp();
    };
  },
  _getGridPoints: function _getGridPoints(coords) {
    var pos = this.getCenter();
    var radius = getDistance(pos.x, pos.y, coords.x, coords.y);
    if (radius > this.getRadius()) {
      return {
        cx: null,
        cy: null,
        r: null
      };
    }
    return {
      cx: pos.x,
      cy: pos.y,
      r: radius
    };
  },
  _getTranslatedValue: function _getTranslatedValue(value, offset) {
    var startAngle = this.getAngles()[0];
    var xy = convertPolarToXY(this.getCenter(), startAngle, 0, this._translator.translate(value, offset));
    return {
      x: xy.x,
      y: xy.y,
      angle: startAngle - HALF_PI_ANGLE
    };
  },
  _getTranslatedCoord: function _getTranslatedCoord(value, offset) {
    return this._translator.translate(value, offset);
  },
  _getCanvasStartEnd() {
    var invert = this.getTranslator().getBusinessRange().invert;
    var coords = [0, this.getRadius()];
    invert && coords.reverse();
    return {
      start: coords[0],
      end: coords[1]
    };
  },
  _getStripGraphicAttributes: function _getStripGraphicAttributes(fromPoint, toPoint) {
    var center = this.getCenter();
    return {
      x: center.x,
      y: center.y,
      innerRadius: fromPoint,
      outerRadius: toPoint
    };
  },
  _createStrip: function _createStrip(attrs) {
    return this._renderer.arc(attrs.x, attrs.y, attrs.innerRadius, attrs.outerRadius, 0, 360);
  },
  _getAdjustedStripLabelCoords: circularAxes._getAdjustedStripLabelCoords,
  _getStripLabelCoords: function _getStripLabelCoords(from, to) {
    var that = this;
    var labelPos = from + (to - from) / 2;
    var center = that.getCenter();
    var y = round(center.y - labelPos);
    return {
      x: center.x,
      y: y,
      align: constants.center
    };
  },
  _getConstantLineGraphicAttributes: function _getConstantLineGraphicAttributes(value) {
    var center = this.getCenter();
    return {
      cx: center.x,
      cy: center.y,
      r: value
    };
  },
  _createConstantLine: function _createConstantLine(value, attr) {
    var attrs = this._getConstantLineGraphicAttributes(value);
    return this._renderer.circle(attrs.cx, attrs.cy, attrs.r).attr(attr).sharp();
  },
  _getConstantLineLabelsCoords: function _getConstantLineLabelsCoords(value) {
    var that = this;
    var center = that.getCenter();
    var y = round(center.y - value);
    return {
      x: center.x,
      y: y
    };
  },
  _checkAlignmentConstantLineLabels: _noop,
  _rotateTick: function _rotateTick(element, coords, isGridLine) {
    !isGridLine && element.rotate(coords.angle + HALF_PI_ANGLE, coords.x, coords.y);
  },
  _validateOverlappingMode: circularAxes._validateOverlappingMode,
  _validateDisplayMode: circularAxes._validateDisplayMode,
  _getStep: function _getStep(boxes) {
    var quarter = getPolarQuarter(this.getAngles()[0]);
    var spacing = this._options.label.minSpacing;
    var func = quarter === 2 || quarter === 4 ? function (box) {
      return box.width + spacing;
    } : function (box) {
      return box.height;
    };
    var maxLabelLength = boxes.reduce((prevValue, box) => _max(prevValue, func(box)), 0);
    return constants.getTicksCountInRange(this._majorTicks, quarter === 2 || quarter === 4 ? 'x' : 'y', maxLabelLength);
  }
};
export var linearSpider = extend({}, linear, {
  _createPathElement: function _createPathElement(points, attr) {
    return this._renderer.path(points, 'area').attr(attr).sharp();
  },
  setSpiderTicks: function setSpiderTicks(ticks) {
    this._spiderTicks = ticks;
  },
  _getGridLineDrawer: function _getGridLineDrawer() {
    var that = this;
    return function (tick, gridStyle) {
      return that._createPathElement(that._getGridPoints(tick.coords).points, gridStyle);
    };
  },
  _getGridPoints: function _getGridPoints(coords) {
    var pos = this.getCenter();
    var radius = getDistance(pos.x, pos.y, coords.x, coords.y);
    return this._getGridPointsByRadius(radius);
  },
  _getGridPointsByRadius: function _getGridPointsByRadius(radius) {
    var pos = this.getCenter();
    if (radius > this.getRadius()) {
      return {
        points: null
      };
    }
    return {
      points: _map(this._spiderTicks, function (tick) {
        var cosSin = getCosAndSin(tick.coords.angle);
        return {
          x: round(pos.x + radius * cosSin.cos),
          y: round(pos.y + radius * cosSin.sin)
        };
      })
    };
  },
  _getStripGraphicAttributes: function _getStripGraphicAttributes(fromPoint, toPoint) {
    var innerPoints = this._getGridPointsByRadius(toPoint).points;
    var outerPoints = this._getGridPointsByRadius(fromPoint).points;
    return {
      points: [outerPoints, innerPoints.reverse()]
    };
  },
  _createStrip: circularSpider._createStrip,
  _getConstantLineGraphicAttributes: function _getConstantLineGraphicAttributes(value) {
    return this._getGridPointsByRadius(value);
  },
  _createConstantLine: function _createConstantLine(value, attr) {
    return this._createPathElement(this._getConstantLineGraphicAttributes(value).points, attr);
  }
});
