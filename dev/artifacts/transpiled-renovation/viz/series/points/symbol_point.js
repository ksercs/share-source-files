"use strict";

exports.default = void 0;
var _extend2 = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _common = require("../../../core/utils/common");
var _window = require("../../../core/utils/window");
var _label = require("./label");
var _type = require("../../../core/utils/type");
var _utils = require("../../core/utils");
var window = (0, _window.getWindow)();
var _extend = _extend2.extend;
var _math = Math;
var _round = _math.round;
var _floor = _math.floor;
var _ceil = _math.ceil;
var DEFAULT_IMAGE_WIDTH = 20;
var DEFAULT_IMAGE_HEIGHT = 20;
var LABEL_OFFSET = 10;
var CANVAS_POSITION_DEFAULT = 'canvas_position_default';
function getSquareMarkerCoords(radius) {
  return [-radius, -radius, radius, -radius, radius, radius, -radius, radius, -radius, -radius];
}
function getPolygonMarkerCoords(radius) {
  var r = _ceil(radius); // T100386
  return [-r, 0, 0, -r, r, 0, 0, r, -r, 0];
}
function getCrossMarkerCoords(radius) {
  var r = _ceil(radius); // T100386
  var floorHalfRadius = _floor(r / 2);
  var ceilHalfRadius = _ceil(r / 2);
  return [-r, -floorHalfRadius, -floorHalfRadius, -r, 0, -ceilHalfRadius, floorHalfRadius, -r, r, -floorHalfRadius, ceilHalfRadius, 0, r, floorHalfRadius, floorHalfRadius, r, 0, ceilHalfRadius, -floorHalfRadius, r, -r, floorHalfRadius, -ceilHalfRadius, 0];
}
function getTriangleDownMarkerCoords(radius) {
  return [-radius, -radius, radius, -radius, 0, radius, -radius, -radius];
}
function getTriangleUpMarkerCoords(radius) {
  return [-radius, radius, radius, radius, 0, -radius, -radius, radius];
}
var _default = {
  deleteLabel: function deleteLabel() {
    this._label.dispose();
    this._label = null;
  },
  _hasGraphic: function _hasGraphic() {
    return this.graphic;
  },
  clearVisibility: function clearVisibility() {
    var that = this;
    var graphic = that.graphic;
    if (graphic && graphic.attr('visibility')) {
      graphic.attr({
        visibility: null
      });
    }
  },
  isVisible: function isVisible() {
    return this.inVisibleArea && this.series.isVisible();
  },
  setInvisibility: function setInvisibility() {
    var that = this;
    var graphic = that.graphic;
    if (graphic && graphic.attr('visibility') !== 'hidden') {
      graphic.attr({
        visibility: 'hidden'
      });
    }
    that._errorBar && that._errorBar.attr({
      visibility: 'hidden'
    });
    that._label.draw(false);
  },
  clearMarker: function clearMarker() {
    var graphic = this.graphic;
    graphic && graphic.attr(this._emptySettings);
  },
  _createLabel: function _createLabel() {
    this._label = new _label.Label({
      renderer: this.series._renderer,
      labelsGroup: this.series._labelsGroup,
      point: this
    });
  },
  _calculateVisibility: function _calculateVisibility(x, y) {
    var _this$_getVisibleArea = this._getVisibleArea(),
      minX = _this$_getVisibleArea.minX,
      maxX = _this$_getVisibleArea.maxX,
      minY = _this$_getVisibleArea.minY,
      maxY = _this$_getVisibleArea.maxY;
    this.inVisibleArea = minX <= x && maxX >= x && minY <= y && maxY >= y;
  },
  _updateLabelData: function _updateLabelData() {
    this._label.setData(this._getLabelFormatObject());
  },
  _updateLabelOptions: function _updateLabelOptions() {
    !this._label && this._createLabel();
    this._label.setOptions(this._options.label);
  },
  _checkImage: function _checkImage(image) {
    return (0, _type.isDefined)(image) && (typeof image === 'string' || (0, _type.isDefined)(image.url));
  },
  _fillStyle: function _fillStyle() {
    this._styles = this._options.styles;
  },
  _checkSymbol: function _checkSymbol(oldOptions, newOptions) {
    var oldSymbol = oldOptions.symbol;
    var newSymbol = newOptions.symbol;
    var symbolChanged = oldSymbol === 'circle' && newSymbol !== 'circle' || oldSymbol !== 'circle' && newSymbol === 'circle';
    var imageChanged = this._checkImage(oldOptions.image) !== this._checkImage(newOptions.image);
    return !!(symbolChanged || imageChanged);
  },
  _populatePointShape: function _populatePointShape(symbol, radius) {
    switch (symbol) {
      case 'square':
        return getSquareMarkerCoords(radius);
      case 'polygon':
        return getPolygonMarkerCoords(radius);
      case 'triangle':
      case 'triangleDown':
        return getTriangleDownMarkerCoords(radius);
      case 'triangleUp':
        return getTriangleUpMarkerCoords(radius);
      case 'cross':
        return getCrossMarkerCoords(radius);
    }
  },
  hasCoords: function hasCoords() {
    return this.x !== null && this.y !== null;
  },
  correctValue: function correctValue(correction) {
    var that = this;
    var axis = that.series.getValueAxis();
    if (that.hasValue()) {
      that.value = that.properValue = axis.validateUnit(that.initialValue.valueOf() + correction.valueOf());
      that.minValue = axis.validateUnit(correction);
    }
  },
  resetCorrection: function resetCorrection() {
    this.value = this.properValue = this.initialValue;
    this.minValue = CANVAS_POSITION_DEFAULT;
  },
  resetValue: function resetValue() {
    var that = this;
    if (that.hasValue()) {
      that.value = that.properValue = that.initialValue = 0;
      that.minValue = 0;
      that._label.setDataField('value', that.value);
    }
  },
  _getTranslates: function _getTranslates(animationEnabled) {
    var translateX = this.x;
    var translateY = this.y;
    if (animationEnabled) {
      if (this._options.rotated) {
        translateX = this.defaultX;
      } else {
        translateY = this.defaultY;
      }
    }
    return {
      x: translateX,
      y: translateY
    };
  },
  _createImageMarker: function _createImageMarker(renderer, settings, options) {
    var width = options.width || DEFAULT_IMAGE_WIDTH;
    var height = options.height || DEFAULT_IMAGE_HEIGHT;
    return renderer.image(-_round(width * 0.5), -_round(height * 0.5), width, height, options.url ? options.url.toString() : options.toString(), 'center').attr({
      translateX: settings.translateX,
      translateY: settings.translateY,
      visibility: settings.visibility
    });
  },
  _createSymbolMarker: function _createSymbolMarker(renderer, pointSettings) {
    var marker;
    var symbol = this._options.symbol;
    if (symbol === 'circle') {
      delete pointSettings.points;
      marker = renderer.circle().attr(pointSettings);
    } else if (symbol === 'square' || symbol === 'polygon' || symbol === 'triangle' || symbol === 'triangleDown' || symbol === 'triangleUp' || symbol === 'cross') {
      marker = renderer.path([], 'area').attr(pointSettings).sharp();
    }
    return marker;
  },
  _createMarker: function _createMarker(renderer, group, image, settings) {
    var that = this;
    var marker = that._checkImage(image) ? that._createImageMarker(renderer, settings, image) : that._createSymbolMarker(renderer, settings);
    if (marker) {
      marker.data({
        'chart-data-point': that
      }).append(group);
    }
    return marker;
  },
  _getSymbolBBox: function _getSymbolBBox(x, y, r) {
    return {
      x: x - r,
      y: y - r,
      width: r * 2,
      height: r * 2
    };
  },
  _getImageBBox: function _getImageBBox(x, y) {
    var image = this._options.image;
    var width = image.width || DEFAULT_IMAGE_WIDTH;
    var height = image.height || DEFAULT_IMAGE_HEIGHT;
    return {
      x: x - _round(width / 2),
      y: y - _round(height / 2),
      width: width,
      height: height
    };
  },
  _getGraphicBBox: function _getGraphicBBox() {
    var that = this;
    var options = that._options;
    var x = that.x;
    var y = that.y;
    var bBox;
    if (options.visible) {
      bBox = that._checkImage(options.image) ? that._getImageBBox(x, y) : that._getSymbolBBox(x, y, options.styles.normal.r);
    } else {
      bBox = {
        x: x,
        y: y,
        width: 0,
        height: 0
      };
    }
    return bBox;
  },
  hideInsideLabel: _common.noop,
  _getShiftLabelCoords: function _getShiftLabelCoords(label) {
    var coord = this._addLabelAlignmentAndOffset(label, this._getLabelCoords(label));
    return this._checkLabelPosition(label, coord);
  },
  _drawLabel: function _drawLabel() {
    var that = this;
    var customVisibility = that._getCustomLabelVisibility();
    var label = that._label;
    var isVisible = that._showForZeroValues() && that.hasValue() && customVisibility !== false && (that.series.getLabelVisibility() || customVisibility);
    label.draw(!!isVisible);
  },
  correctLabelPosition: function correctLabelPosition(label) {
    var that = this;
    var coord = that._getShiftLabelCoords(label);
    if (!that.hideInsideLabel(label, coord)) {
      label.setFigureToDrawConnector(that._getLabelConnector(label.pointPosition));
      label.shift(_round(coord.x), _round(coord.y));
    }
  },
  _showForZeroValues: function _showForZeroValues() {
    return true;
  },
  _getLabelConnector: function _getLabelConnector(pointPosition) {
    var bBox = this._getGraphicBBox(pointPosition);
    var w2 = bBox.width / 2;
    var h2 = bBox.height / 2;
    // This is to make label connector end at the center of point; "width" and "height" are required by the path building algorithm
    // TODO: When path building algorithm is updated remove "width" and "height"
    return {
      x: bBox.x + w2,
      y: bBox.y + h2,
      r: this._options.visible ? Math.max(w2, h2) : 0
    };
  },
  _getPositionFromLocation: function _getPositionFromLocation() {
    return {
      x: this.x,
      y: this.y
    };
  },
  _isPointInVisibleArea: function _isPointInVisibleArea(visibleArea, graphicBBox) {
    return visibleArea.minX <= graphicBBox.x + graphicBBox.width && visibleArea.maxX >= graphicBBox.x && visibleArea.minY <= graphicBBox.y + graphicBBox.height && visibleArea.maxY >= graphicBBox.y;
  },
  _checkLabelPosition: function _checkLabelPosition(label, coord) {
    var that = this;
    var visibleArea = that._getVisibleArea();
    var labelBBox = label.getBoundingRect();
    var graphicBBox = that._getGraphicBBox(label.pointPosition);
    var fullGraphicBBox = that._getGraphicBBox();
    var isInside = label.getLayoutOptions().position === 'inside';
    var offset = LABEL_OFFSET;
    if (that._isPointInVisibleArea(visibleArea, fullGraphicBBox)) {
      if (!that._options.rotated) {
        if (visibleArea.minX > coord.x) {
          coord.x = visibleArea.minX;
        }
        if (visibleArea.maxX < coord.x + labelBBox.width) {
          coord.x = visibleArea.maxX - labelBBox.width;
        }
        if (visibleArea.minY > coord.y) {
          coord.y = isInside ? visibleArea.minY : graphicBBox.y + graphicBBox.height + offset;
        }
        if (visibleArea.maxY < coord.y + labelBBox.height) {
          coord.y = isInside ? visibleArea.maxY - labelBBox.height : graphicBBox.y - labelBBox.height - offset;
        }
      } else {
        if (visibleArea.minX > coord.x) {
          coord.x = isInside ? visibleArea.minX : graphicBBox.x + graphicBBox.width + offset;
        }
        if (visibleArea.maxX < coord.x + labelBBox.width) {
          coord.x = isInside ? visibleArea.maxX - labelBBox.width : graphicBBox.x - offset - labelBBox.width;
        }
        if (visibleArea.minY > coord.y) {
          coord.y = visibleArea.minY;
        }
        if (visibleArea.maxY < coord.y + labelBBox.height) {
          coord.y = visibleArea.maxY - labelBBox.height;
        }
      }
    }
    return coord;
  },
  _addLabelAlignmentAndOffset: function _addLabelAlignmentAndOffset(label, coord) {
    var labelBBox = label.getBoundingRect();
    var labelOptions = label.getLayoutOptions();
    if (!this._options.rotated) {
      if (labelOptions.alignment === 'left') {
        coord.x += labelBBox.width / 2;
      } else if (labelOptions.alignment === 'right') {
        coord.x -= labelBBox.width / 2;
      }
    }
    coord.x += labelOptions.horizontalOffset;
    coord.y += labelOptions.verticalOffset;
    return coord;
  },
  _getLabelCoords: function _getLabelCoords(label) {
    return this._getLabelCoordOfPosition(label, this._getLabelPosition(label.pointPosition));
  },
  _getLabelCoordOfPosition: function _getLabelCoordOfPosition(label, position) {
    var that = this;
    var labelBBox = label.getBoundingRect();
    var graphicBBox = that._getGraphicBBox(label.pointPosition);
    var offset = LABEL_OFFSET;
    var centerY = graphicBBox.height / 2 - labelBBox.height / 2;
    var centerX = graphicBBox.width / 2 - labelBBox.width / 2;
    var x = graphicBBox.x;
    var y = graphicBBox.y;
    switch (position) {
      case 'left':
        x -= labelBBox.width + offset;
        y += centerY;
        break;
      case 'right':
        x += graphicBBox.width + offset;
        y += centerY;
        break;
      case 'top':
        x += centerX;
        y -= labelBBox.height + offset;
        break;
      case 'bottom':
        x += centerX;
        y += graphicBBox.height + offset;
        break;
      case 'inside':
        x += centerX;
        y += centerY;
        break;
    }
    return {
      x: x,
      y: y
    };
  },
  _drawMarker: function _drawMarker(renderer, group, animationEnabled) {
    var that = this;
    var options = that._options;
    var translates = that._getTranslates(animationEnabled);
    var style = that._getStyle();
    that.graphic = that._createMarker(renderer, group, options.image, _extend({
      translateX: translates.x,
      translateY: translates.y,
      points: that._populatePointShape(options.symbol, style.r)
    }, style));
  },
  _getErrorBarSettings: function _getErrorBarSettings() {
    return {
      visibility: 'visible'
    };
  },
  _getErrorBarBaseEdgeLength() {
    return this.getPointRadius() * 2;
  },
  _drawErrorBar: function _drawErrorBar(renderer, group) {
    if (!this._options.errorBars) {
      return;
    }
    var that = this;
    var options = that._options;
    var errorBarOptions = options.errorBars;
    var points = [];
    var settings;
    var pos = that._errorBarPos;
    var high = that._highErrorCoord;
    var low = that._lowErrorCoord;
    var displayMode = (0, _utils.normalizeEnum)(errorBarOptions.displayMode);
    var isHighDisplayMode = displayMode === 'high';
    var isLowDisplayMode = displayMode === 'low';
    var highErrorOnly = (isHighDisplayMode || !(0, _type.isDefined)(low)) && (0, _type.isDefined)(high) && !isLowDisplayMode;
    var lowErrorOnly = (isLowDisplayMode || !(0, _type.isDefined)(high)) && (0, _type.isDefined)(low) && !isHighDisplayMode;
    var edgeLength = errorBarOptions.edgeLength;
    if (edgeLength <= 1 && edgeLength > 0) {
      edgeLength = this._getErrorBarBaseEdgeLength() * errorBarOptions.edgeLength;
    }
    edgeLength = _floor(parseInt(edgeLength) / 2);
    highErrorOnly && (low = that._baseErrorBarPos);
    lowErrorOnly && (high = that._baseErrorBarPos);
    if (displayMode !== 'none' && (0, _type.isDefined)(high) && (0, _type.isDefined)(low) && (0, _type.isDefined)(pos)) {
      !lowErrorOnly && points.push([pos - edgeLength, high, pos + edgeLength, high]);
      points.push([pos, high, pos, low]);
      !highErrorOnly && points.push([pos + edgeLength, low, pos - edgeLength, low]);
      options.rotated && (0, _iterator.each)(points, function (_, p) {
        p.reverse();
      });
      settings = that._getErrorBarSettings(errorBarOptions);
      if (!that._errorBar) {
        that._errorBar = renderer.path(points, 'line').attr(settings).append(group);
      } else {
        settings.points = points;
        that._errorBar.attr(settings);
      }
    } else {
      that._errorBar && that._errorBar.attr({
        visibility: 'hidden'
      });
    }
  },
  getTooltipParams: function getTooltipParams() {
    var that = this;
    var graphic = that.graphic;
    return {
      x: that.x,
      y: that.y,
      offset: graphic ? graphic.getBBox().height / 2 : 0
    };
  },
  setPercentValue: function setPercentValue(absTotal, total, leftHoleTotal, rightHoleTotal) {
    var that = this;
    var valuePercent = that.value / absTotal || 0;
    var minValuePercent = that.minValue / absTotal || 0;
    var percent = valuePercent - minValuePercent;
    that._label.setDataField('percent', percent);
    that._label.setDataField('total', total);
    if (that.series.isFullStackedSeries() && that.hasValue()) {
      if (that.leftHole) {
        that.leftHole /= absTotal - leftHoleTotal;
        that.minLeftHole /= absTotal - leftHoleTotal;
      }
      if (that.rightHole) {
        that.rightHole /= absTotal - rightHoleTotal;
        that.minRightHole /= absTotal - rightHoleTotal;
      }
      that.value = that.properValue = valuePercent;
      that.minValue = !minValuePercent ? that.minValue : minValuePercent;
    }
  },
  _storeTrackerR: function _storeTrackerR() {
    var that = this;
    var navigator = window.navigator;
    var r = that._options.styles.normal.r;
    ///#DEBUG
    navigator = that.__debug_navigator || navigator;
    that.__debug_browserNavigator = navigator;
    ///#ENDDEBUG
    var minTrackerSize = (0, _window.hasProperty)('ontouchstart') || navigator.msPointerEnabled && navigator.msMaxTouchPoints || navigator.pointerEnabled && navigator.maxTouchPoints ? 20 : 6;
    that._options.trackerR = r < minTrackerSize ? minTrackerSize : r;
    return that._options.trackerR;
  },
  _translateErrorBars: function _translateErrorBars() {
    var that = this;
    var options = that._options;
    var rotated = options.rotated;
    var errorBars = options.errorBars;
    var translator = that._getValTranslator();
    if (!errorBars) {
      return;
    }
    (0, _type.isDefined)(that.lowError) && (that._lowErrorCoord = translator.translate(that.lowError));
    (0, _type.isDefined)(that.highError) && (that._highErrorCoord = translator.translate(that.highError));
    that._errorBarPos = _floor(rotated ? that.vy : that.vx);
    that._baseErrorBarPos = errorBars.type === 'stdDeviation' ? that._lowErrorCoord + (that._highErrorCoord - that._lowErrorCoord) / 2 : rotated ? that.vx : that.vy;
  },
  _translate: function _translate() {
    var that = this;
    var valTranslator = that._getValTranslator();
    var argTranslator = that._getArgTranslator();
    if (that._options.rotated) {
      that.vx = that.x = valTranslator.translate(that.value);
      that.vy = that.y = argTranslator.translate(that.argument);
      that.minX = valTranslator.translate(that.minValue);
      that.defaultX = valTranslator.translate(CANVAS_POSITION_DEFAULT);
    } else {
      that.vy = that.y = valTranslator.translate(that.value);
      that.vx = that.x = argTranslator.translate(that.argument);
      that.minY = valTranslator.translate(that.minValue);
      that.defaultY = valTranslator.translate(CANVAS_POSITION_DEFAULT);
    }
    that._translateErrorBars();
    that._calculateVisibility(that.x, that.y);
  },
  _updateData: function _updateData(data) {
    var that = this;
    that.value = that.properValue = that.initialValue = that.originalValue = data.value;
    that.minValue = that.initialMinValue = that.originalMinValue = (0, _type.isDefined)(data.minValue) ? data.minValue : CANVAS_POSITION_DEFAULT;
  },
  _getImageSettings: function _getImageSettings(image) {
    return {
      href: image.url || image.toString(),
      width: image.width || DEFAULT_IMAGE_WIDTH,
      height: image.height || DEFAULT_IMAGE_HEIGHT
    };
  },
  getCrosshairData: function getCrosshairData() {
    var that = this;
    var r = that._options.rotated;
    var value = that.properValue;
    var argument = that.argument;
    return {
      x: that.vx,
      y: that.vy,
      xValue: r ? value : argument,
      yValue: r ? argument : value,
      axis: that.series.axis
    };
  },
  getPointRadius: function getPointRadius() {
    var style = this._getStyle();
    var options = this._options;
    var r = style.r;
    var extraSpace;
    var symbol = options.symbol;
    var isSquare = symbol === 'square';
    var isTriangle = symbol === 'triangle' || symbol === 'triangleDown' || symbol === 'triangleUp';
    if (options.visible && !options.image && r) {
      extraSpace = style['stroke-width'] / 2;
      return (isSquare || isTriangle ? 1.4 * r : r) + extraSpace;
    }
    return 0;
  },
  _updateMarker: function _updateMarker(animationEnabled, style) {
    var that = this;
    var options = that._options;
    var settings;
    var image = options.image;
    var visibility = !that.isVisible() ? {
      visibility: 'hidden'
    } : {};
    if (that._checkImage(image)) {
      settings = _extend({}, {
        visibility: style.visibility
      }, visibility, that._getImageSettings(image));
    } else {
      settings = _extend({}, style, visibility, {
        points: that._populatePointShape(options.symbol, style.r)
      });
    }
    if (!animationEnabled) {
      settings.translateX = that.x;
      settings.translateY = that.y;
    }
    that.graphic.attr(settings).sharp();
  },
  _getLabelFormatObject: function _getLabelFormatObject() {
    var that = this;
    return {
      argument: that.initialArgument,
      value: that.initialValue,
      originalArgument: that.originalArgument,
      originalValue: that.originalValue,
      seriesName: that.series.name,
      lowErrorValue: that.lowError,
      highErrorValue: that.highError,
      point: that
    };
  },
  _getLabelPosition: function _getLabelPosition() {
    var rotated = this._options.rotated;
    if (this.initialValue > 0) {
      return rotated ? 'right' : 'top';
    } else {
      return rotated ? 'left' : 'bottom';
    }
  },
  _getFormatObject: function _getFormatObject(tooltip) {
    var that = this;
    var labelFormatObject = that._label.getData();
    return _extend({}, labelFormatObject, {
      argumentText: tooltip.formatValue(that.initialArgument, 'argument'),
      valueText: tooltip.formatValue(that.initialValue)
    }, (0, _type.isDefined)(labelFormatObject.percent) ? {
      percentText: tooltip.formatValue(labelFormatObject.percent, 'percent')
    } : {}, (0, _type.isDefined)(labelFormatObject.total) ? {
      totalText: tooltip.formatValue(labelFormatObject.total)
    } : {});
  },
  getMarkerVisibility: function getMarkerVisibility() {
    return this._options.visible;
  },
  coordsIn: function coordsIn(x, y) {
    var trackerRadius = this._storeTrackerR();
    return x >= this.x - trackerRadius && x <= this.x + trackerRadius && y >= this.y - trackerRadius && y <= this.y + trackerRadius;
  },
  getMinValue: function getMinValue(noErrorBar) {
    var errorBarOptions = this._options.errorBars;
    if (errorBarOptions && !noErrorBar) {
      var displayMode = errorBarOptions.displayMode;
      var lowValue = displayMode !== 'high' && (0, _type.isDefined)(this.lowError) ? this.lowError : this.value;
      var highValue = displayMode !== 'low' && (0, _type.isDefined)(this.highError) ? this.highError : this.value;
      return lowValue < highValue ? lowValue : highValue;
    } else {
      return this.value;
    }
  },
  getMaxValue: function getMaxValue(noErrorBar) {
    var errorBarOptions = this._options.errorBars;
    if (errorBarOptions && !noErrorBar) {
      var displayMode = errorBarOptions.displayMode;
      var lowValue = displayMode !== 'high' && (0, _type.isDefined)(this.lowError) ? this.lowError : this.value;
      var highValue = displayMode !== 'low' && (0, _type.isDefined)(this.highError) ? this.highError : this.value;
      return lowValue > highValue ? lowValue : highValue;
    } else {
      return this.value;
    }
  }
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;