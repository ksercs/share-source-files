/**
* DevExtreme (cjs/viz/series/points/label.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.Label = Label;
var _format_helper = _interopRequireDefault(require("../../../format_helper"));
var _utils = require("../../core/utils");
var _iterator = require("../../../core/utils/iterator");
var _extend = require("../../../core/utils/extend");
var _display_format_parser = require("../helpers/display_format_parser");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _format = _format_helper.default.format;
var _math = Math;
var _round = _math.round;
var _floor = _math.floor;
var _abs = _math.abs;
var CONNECTOR_LENGTH = 12;
var LABEL_BACKGROUND_PADDING_X = 8;
var LABEL_BACKGROUND_PADDING_Y = 4;
function getClosestCoord(point, coords) {
  var closestDistance = Infinity;
  var closestCoord;
  (0, _iterator.each)(coords, function (_, coord) {
    var x = point[0] - coord[0];
    var y = point[1] - coord[1];
    var distance = x * x + y * y;
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCoord = coord;
    }
  });
  return [_floor(closestCoord[0]), _floor(closestCoord[1])];
}
function getCrossCoord(rect, coord, indexOffset) {
  return (coord - rect[0 + indexOffset]) / (rect[2 + indexOffset] - rect[0 + indexOffset]) * (rect[3 - indexOffset] - rect[1 - indexOffset]) + rect[1 - indexOffset];
}

// We could always conside center of label as label point (with appropriate connector path clipping). In that case we do not depend neither on background nor on rotation.

var barPointStrategy = {
  isLabelInside: function isLabelInside(labelPoint, figure) {
    var xc = labelPoint.x + labelPoint.width / 2;
    var yc = labelPoint.y + labelPoint.height / 2;
    return figure.x <= xc && xc <= figure.x + figure.width && figure.y <= yc && yc <= figure.y + figure.height;
  },
  prepareLabelPoints: function prepareLabelPoints(bBox, rotatedBBox, isHorizontal, angle, figureCenter) {
    var x1 = rotatedBBox.x;
    var xc = x1 + rotatedBBox.width / 2;
    var x2 = x1 + rotatedBBox.width - 1;
    var y1 = rotatedBBox.y;
    var yc = y1 + rotatedBBox.height / 2;
    var y2 = y1 + rotatedBBox.height - 1;
    var labelPoints;
    var isRectangular = _abs(angle) % 90 === 0;
    if (figureCenter[0] > x1 && figureCenter[0] < x2) {
      if (isRectangular) {
        labelPoints = [[figureCenter[0], _abs(figureCenter[1] - y1) < _abs(figureCenter[1] - y2) ? y1 : y2]];
      } else {
        labelPoints = [[figureCenter[0], getCrossCoord([x1, y1, x2, y2], figureCenter[0], 0)]];
      }
    } else if (figureCenter[1] > y1 && figureCenter[1] < y2) {
      if (isRectangular) {
        labelPoints = [[_abs(figureCenter[0] - x1) < _abs(figureCenter[0] - x2) ? x1 : x2, figureCenter[1]]];
      } else {
        labelPoints = [[getCrossCoord([x1, y1, x2, y2], figureCenter[1], 1), figureCenter[1]]];
      }
    } else {
      if (isRectangular) {
        labelPoints = [[x1, y1], [isHorizontal ? x1 : xc, isHorizontal ? yc : y1], [x2, y1], [x1, y2], [isHorizontal ? x2 : xc, isHorizontal ? yc : y2], [x2, y2]];
      } else {
        labelPoints = [[xc, yc]];
      }
    }
    return labelPoints;
  },
  isHorizontal: function isHorizontal(bBox, figure) {
    return bBox.x > figure.x + figure.width || bBox.x + bBox.width < figure.x;
  },
  getFigureCenter: function getFigureCenter(figure) {
    return [_floor(figure.x + figure.width / 2), _floor(figure.y + figure.height / 2)];
  },
  findFigurePoint: function findFigurePoint(figure, labelPoint) {
    var figureCenter = barPointStrategy.getFigureCenter(figure);
    var point = getClosestCoord(labelPoint, [[figure.x, figureCenter[1]], [figureCenter[0], figure.y + figure.height], [figure.x + figure.width, figureCenter[1]], [figureCenter[0], figure.y]]);
    return point;
  },
  adjustPoints: function adjustPoints(points) {
    var lineIsVertical = _abs(points[1] - points[3]) <= 1;
    var lineIsHorizontal = _abs(points[0] - points[2]) <= 1;
    if (lineIsHorizontal) {
      points[0] = points[2];
    }
    if (lineIsVertical) {
      points[1] = points[3];
    }
    return points;
  }
};
var symbolPointStrategy = {
  isLabelInside: function isLabelInside() {
    return false;
  },
  prepareLabelPoints: barPointStrategy.prepareLabelPoints,
  isHorizontal: function isHorizontal(bBox, figure) {
    return bBox.x > figure.x + figure.r || bBox.x + bBox.width < figure.x - figure.r;
  },
  getFigureCenter: function getFigureCenter(figure) {
    return [figure.x, figure.y];
  },
  findFigurePoint: function findFigurePoint(figure, labelPoint) {
    var angle = Math.atan2(figure.y - labelPoint[1], labelPoint[0] - figure.x);
    return [_round(figure.x + figure.r * Math.cos(angle)), _round(figure.y - figure.r * Math.sin(angle))];
  },
  adjustPoints: barPointStrategy.adjustPoints
};
var piePointStrategy = {
  isLabelInside: function isLabelInside(_0, _1, isOutside) {
    return !isOutside;
  },
  prepareLabelPoints: function prepareLabelPoints(bBox, rotatedBBox, isHorizontal, angle) {
    var xl = bBox.x;
    var xr = xl + bBox.width;
    var xc = xl + _round(bBox.width / 2);
    var yt = bBox.y;
    var yb = yt + bBox.height;
    var yc = yt + _round(bBox.height / 2);
    var points = [[[xl, yt], [xr, yt]], [[xr, yt], [xr, yb]], [[xr, yb], [xl, yb]], [[xl, yb], [xl, yt]]];
    var cosSin = (0, _utils.getCosAndSin)(angle);
    if (angle === 0) {
      points = isHorizontal ? [[xl, yc], [xr, yc]] : [[xc, yt], [xc, yb]];
    } else {
      points = points.map(function (pair) {
        return pair.map(function (point) {
          return [_round((point[0] - xc) * cosSin.cos + (point[1] - yc) * cosSin.sin + xc), _round(-(point[0] - xc) * cosSin.sin + (point[1] - yc) * cosSin.cos + yc)];
        });
      }).reduce(function (r, pair) {
        var point1x = pair[0][0];
        var point1y = pair[0][1];
        var point2x = pair[1][0];
        var point2y = pair[1][1];
        if (isHorizontal) {
          if (point1y >= yc && yc >= point2y || point1y <= yc && yc <= point2y) {
            r.push([(yc - point1y) * (point2x - point1x) / (point2y - point1y) + point1x, yc]);
          }
        } else {
          if (point1x >= xc && xc >= point2x || point1x <= xc && xc <= point2x) {
            r.push([xc, (xc - point1x) * (point2y - point1y) / (point2x - point1x) + point1y]);
          }
        }
        return r;
      }, []);
    }
    return points;
  },
  isHorizontal: function isHorizontal(bBox, figure) {
    return bBox.x > figure.x || figure.x > bBox.x + bBox.width;
  },
  getFigureCenter: symbolPointStrategy.getFigureCenter,
  findFigurePoint: function findFigurePoint(figure, labelPoint, isHorizontal) {
    if (!isHorizontal) {
      return [figure.x, figure.y];
    }
    var labelX = labelPoint[0];
    var x = _round(figure.x + (figure.y - labelPoint[1]) / Math.tan((0, _utils.degreesToRadians)(figure.angle)));
    var points = [figure.x, figure.y, x, labelPoint[1]];
    if (!(figure.x <= x && x <= labelX) && !(labelX <= x && x <= figure.x)) {
      if (_abs(figure.x - labelX) < CONNECTOR_LENGTH) {
        points = [figure.x, figure.y];
      } else if (figure.x <= labelX) {
        points[2] = figure.x + CONNECTOR_LENGTH;
      } else {
        points[2] = figure.x - CONNECTOR_LENGTH;
      }
    }
    return points;
  },
  adjustPoints: function adjustPoints(points) {
    return points;
  }
};
function selectStrategy(figure) {
  return figure.angle !== undefined && piePointStrategy || figure.r !== undefined && symbolPointStrategy || barPointStrategy;
}
function disposeItem(obj, field) {
  obj[field] && obj[field].dispose();
  obj[field] = null;
}
function checkBackground(background) {
  return background && (background.fill && background.fill !== 'none' || background['stroke-width'] > 0 && background.stroke && background.stroke !== 'none');
}
function checkConnector(connector) {
  return connector && connector['stroke-width'] > 0 && connector.stroke && connector.stroke !== 'none';
}
function formatText(data, options) {
  var format = options.format;
  data.valueText = _format(data.value, format);
  data.argumentText = _format(data.argument, options.argumentFormat);
  if (data.percent !== undefined) {
    data.percentText = _format(data.percent, {
      type: 'percent',
      precision: format && format.percentPrecision
    });
  }
  if (data.total !== undefined) {
    data.totalText = _format(data.total, format);
  }
  if (data.openValue !== undefined) {
    data.openValueText = _format(data.openValue, format);
  }
  if (data.closeValue !== undefined) {
    data.closeValueText = _format(data.closeValue, format);
  }
  if (data.lowValue !== undefined) {
    data.lowValueText = _format(data.lowValue, format);
  }
  if (data.highValue !== undefined) {
    data.highValueText = _format(data.highValue, format);
  }
  if (data.reductionValue !== undefined) {
    data.reductionValueText = _format(data.reductionValue, format);
  }
  return options.customizeText ? options.customizeText.call(data, data) : options.displayFormat ? (0, _display_format_parser.processDisplayFormat)(options.displayFormat, data) : data.valueText;
}
function Label(renderSettings) {
  this._renderer = renderSettings.renderer;
  this._container = renderSettings.labelsGroup;
  this._point = renderSettings.point;
  this._strategy = renderSettings.strategy;
  this._rowCount = 1;
}
Label.prototype = {
  constructor: Label,
  setColor: function setColor(color) {
    this._color = color;
  },
  setOptions: function setOptions(options) {
    this._options = options;
  },
  setData: function setData(data) {
    this._data = data;
  },
  setDataField: function setDataField(fieldName, fieldValue) {
    // Is this laziness really required?
    this._data = this._data || {};
    this._data[fieldName] = fieldValue;
  },
  getData: function getData() {
    return this._data;
  },
  setFigureToDrawConnector: function setFigureToDrawConnector(figure) {
    this._figure = figure;
  },
  dispose: function dispose() {
    var that = this;
    disposeItem(that, '_group');
    that._data = that._options = that._textContent = that._visible = that._insideGroup = that._text = that._background = that._connector = that._figure = null;
  },
  // The following method is required because we support partial visibility for labels
  // entire labels group can be hidden and any particular label can be visible at the same time
  // in order to do that label must have visibility:"visible" attribute
  _setVisibility: function _setVisibility(value, state) {
    this._group && this._group.attr({
      visibility: value
    });
    this._visible = state;
  },
  isVisible: function isVisible() {
    return this._visible;
  },
  hide: function hide(holdInvisible) {
    this._holdVisibility = !!holdInvisible;
    this._hide();
  },
  _hide: function _hide() {
    this._setVisibility('hidden', false);
  },
  show: function show(holdVisible) {
    var correctPosition = !this._drawn;
    if (this._point.hasValue()) {
      this._holdVisibility = !!holdVisible;
      this._show();
      correctPosition && this._point.correctLabelPosition(this);
    }
  },
  _show: function _show() {
    var that = this;
    var renderer = that._renderer;
    var container = that._container;
    var options = that._options || {};
    var text = that._textContent = formatText(that._data, options) || null;
    if (text) {
      if (!that._group) {
        that._group = renderer.g().append(container);
        that._insideGroup = renderer.g().append(that._group);
        that._text = renderer.text('', 0, 0).append(that._insideGroup);
      }
      that._text.css(options.attributes ? (0, _utils.patchFontOptions)(options.attributes.font) : {});
      if (checkBackground(options.background)) {
        that._background = that._background || renderer.rect().append(that._insideGroup).toBackground();
        that._background.attr(options.background);
        // The following is because "this._options" is shared between all labels and so cannot be modified
        that._color && that._background.attr({
          fill: that._color
        });
      } else {
        disposeItem(that, '_background');
      }
      if (checkConnector(options.connector)) {
        that._connector = that._connector || renderer.path([], 'line').sharp().append(that._group).toBackground();
        that._connector.attr(options.connector);
        // The following is because "this._options" is shared between all labels and so cannot be modified
        that._color && that._connector.attr({
          stroke: that._color
        });
      } else {
        disposeItem(that, '_connector');
      }
      that._text.attr({
        text: text,
        align: options.textAlignment,
        'class': options.cssClass
      });
      that._updateBackground(that._text.getBBox());
      that._setVisibility('visible', true);
      that._drawn = true;
    } else {
      that._hide();
    }
  },
  _getLabelVisibility: function _getLabelVisibility(isVisible) {
    return this._holdVisibility ? this.isVisible() : isVisible;
  },
  draw: function draw(isVisible) {
    if (this._getLabelVisibility(isVisible)) {
      this._show();
      this._point && this._point.correctLabelPosition(this);
    } else {
      this._drawn = false;
      this._hide();
    }
    return this;
  },
  _updateBackground: function _updateBackground(bBox) {
    var that = this;
    if (that._background) {
      bBox.x -= LABEL_BACKGROUND_PADDING_X;
      bBox.y -= LABEL_BACKGROUND_PADDING_Y;
      bBox.width += 2 * LABEL_BACKGROUND_PADDING_X;
      bBox.height += 2 * LABEL_BACKGROUND_PADDING_Y;
      that._background.attr(bBox);
    }
    that._bBoxWithoutRotation = (0, _extend.extend)({}, bBox);
    var rotationAngle = that._options.rotationAngle || 0;
    that._insideGroup.rotate(rotationAngle, bBox.x + bBox.width / 2, bBox.y + bBox.height / 2);
    // Angle is transformed from svg to right-handed cartesian space
    bBox = (0, _utils.rotateBBox)(bBox, [bBox.x + bBox.width / 2, bBox.y + bBox.height / 2], -rotationAngle);
    that._bBox = bBox;
  },
  getFigureCenter() {
    var figure = this._figure;
    var strategy = this._strategy || selectStrategy(figure);
    return strategy.getFigureCenter(figure);
  },
  _getConnectorPoints: function _getConnectorPoints() {
    var that = this;
    var figure = that._figure;
    var options = that._options;
    var strategy = that._strategy || selectStrategy(figure);
    var bBox = that._shiftBBox(that._bBoxWithoutRotation);
    var rotatedBBox = that.getBoundingRect();
    var labelPoint;
    var points = [];
    var isHorizontal;
    if (!strategy.isLabelInside(bBox, figure, options.position !== 'inside')) {
      isHorizontal = strategy.isHorizontal(bBox, figure);
      var figureCenter = that.getFigureCenter();
      points = strategy.prepareLabelPoints(bBox, rotatedBBox, isHorizontal, -options.rotationAngle || 0, figureCenter);
      labelPoint = getClosestCoord(figureCenter, points);
      points = strategy.findFigurePoint(figure, labelPoint, isHorizontal);
      points = points.concat(labelPoint);
    }
    return strategy.adjustPoints(points);
  },
  // TODO: Should not be called when not invisible (check for "_textContent" is to be removed)
  fit: function fit(maxWidth) {
    var padding = this._background ? 2 * LABEL_BACKGROUND_PADDING_X : 0;
    var rowCountChanged = false;
    if (this._text) {
      var result = this._text.setMaxSize(maxWidth - padding, undefined, this._options);
      var rowCount = result.rowCount;
      if (rowCount === 0) {
        rowCount = 1;
      }
      if (rowCount !== this._rowCount) {
        rowCountChanged = true;
        this._rowCount = rowCount;
      }
      result.textIsEmpty && disposeItem(this, '_background');
    }
    this._updateBackground(this._text.getBBox());
    return rowCountChanged;
  },
  resetEllipsis: function resetEllipsis() {
    this._text && this._text.restoreText();
    this._updateBackground(this._text.getBBox());
  },
  setTrackerData: function setTrackerData(point) {
    this._text.data({
      'chart-data-point': point
    });
    this._background && this._background.data({
      'chart-data-point': point
    });
  },
  hideInsideLabel: function hideInsideLabel(coords) {
    return this._point.hideInsideLabel(this, coords);
  },
  getPoint() {
    return this._point;
  },
  // TODO: Should not be called when not invisible (check for "_textContent" is to be removed)
  shift: function shift(x, y) {
    var that = this;
    if (that._textContent) {
      that._insideGroup.attr({
        translateX: that._x = _round(x - that._bBox.x),
        translateY: that._y = _round(y - that._bBox.y)
      });
      if (that._connector) {
        that._connector.attr({
          points: that._getConnectorPoints()
        });
      }
    }
    return that;
  },
  // TODO: Should not be called when not invisible (check for "_textContent" is to be removed)
  getBoundingRect: function getBoundingRect() {
    return this._shiftBBox(this._bBox);
  },
  _shiftBBox: function _shiftBBox(bBox) {
    return this._textContent ? {
      x: bBox.x + this._x,
      y: bBox.y + this._y,
      width: bBox.width,
      height: bBox.height
    } : {};
  },
  getLayoutOptions: function getLayoutOptions() {
    var options = this._options;
    return {
      alignment: options.alignment,
      background: checkBackground(options.background),
      horizontalOffset: options.horizontalOffset,
      verticalOffset: options.verticalOffset,
      radialOffset: options.radialOffset,
      position: options.position,
      connectorOffset: (checkConnector(options.connector) ? CONNECTOR_LENGTH : 0) + (checkBackground(options.background) ? LABEL_BACKGROUND_PADDING_X : 0)
    };
  }
};
