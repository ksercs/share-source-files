/**
* DevExtreme (esm/viz/series/points/range_symbol_point.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { each } from '../../../core/utils/iterator';
import { extend } from '../../../core/utils/extend';
import { noop } from '../../../core/utils/common';
import { Label } from './label';
import symbolPoint from './symbol_point';
var _extend = extend;
import { isDefined as _isDefined } from '../../../core/utils/type';
var _math = Math;
var _abs = _math.abs;
var _min = _math.min;
var _max = _math.max;
var _round = _math.round;
var DEFAULT_IMAGE_WIDTH = 20;
var DEFAULT_IMAGE_HEIGHT = 20;
export default _extend({}, symbolPoint, {
  deleteLabel: function deleteLabel() {
    var that = this;
    that._topLabel.dispose();
    that._topLabel = null;
    that._bottomLabel.dispose();
    that._bottomLabel = null;
  },
  hideMarker: function hideMarker(type) {
    var graphic = this.graphic;
    var marker = graphic && graphic[type + 'Marker'];
    var label = this['_' + type + 'Label'];
    if (marker && marker.attr('visibility') !== 'hidden') {
      marker.attr({
        visibility: 'hidden'
      });
    }
    label.draw(false);
  },
  setInvisibility: function setInvisibility() {
    this.hideMarker('top');
    this.hideMarker('bottom');
  },
  clearVisibility: function clearVisibility() {
    var that = this;
    var graphic = that.graphic;
    var topMarker = graphic && graphic.topMarker;
    var bottomMarker = graphic && graphic.bottomMarker;
    if (topMarker && topMarker.attr('visibility')) {
      topMarker.attr({
        visibility: null
      });
    }
    if (bottomMarker && bottomMarker.attr('visibility')) {
      bottomMarker.attr({
        visibility: null
      });
    }
  },
  clearMarker: function clearMarker() {
    var that = this;
    var graphic = that.graphic;
    var topMarker = graphic && graphic.topMarker;
    var bottomMarker = graphic && graphic.bottomMarker;
    var emptySettings = that._emptySettings;
    topMarker && topMarker.attr(emptySettings);
    bottomMarker && bottomMarker.attr(emptySettings);
  },
  _getLabelPosition: function _getLabelPosition(markerType) {
    var position;
    var labelsInside = this._options.label.position === 'inside';
    if (!this._options.rotated) {
      position = markerType === 'top' ^ labelsInside ? 'top' : 'bottom';
    } else {
      position = markerType === 'top' ^ labelsInside ? 'right' : 'left';
    }
    return position;
  },
  _getLabelMinFormatObject: function _getLabelMinFormatObject() {
    var that = this;
    return {
      index: 0,
      argument: that.initialArgument,
      value: that.initialMinValue,
      seriesName: that.series.name,
      originalValue: that.originalMinValue,
      originalArgument: that.originalArgument,
      point: that
    };
  },
  _updateLabelData: function _updateLabelData() {
    var maxFormatObject = this._getLabelFormatObject();
    maxFormatObject.index = 1;
    this._topLabel.setData(maxFormatObject);
    this._bottomLabel.setData(this._getLabelMinFormatObject());
  },
  _updateLabelOptions: function _updateLabelOptions() {
    var that = this;
    var options = this._options.label;
    (!that._topLabel || !that._bottomLabel) && that._createLabel();
    that._topLabel.setOptions(options);
    that._bottomLabel.setOptions(options);
  },
  _createLabel: function _createLabel() {
    var options = {
      renderer: this.series._renderer,
      labelsGroup: this.series._labelsGroup,
      point: this
    };
    this._topLabel = new Label(options);
    this._bottomLabel = new Label(options);
  },
  _getGraphicBBox: function _getGraphicBBox(location) {
    var options = this._options;
    var images = this._getImage(options.image);
    var image = location === 'top' ? this._checkImage(images.top) : this._checkImage(images.bottom);
    var bBox;
    var coord = this._getPositionFromLocation(location);
    if (options.visible) {
      bBox = image ? this._getImageBBox(coord.x, coord.y) : this._getSymbolBBox(coord.x, coord.y, options.styles.normal.r);
    } else {
      bBox = {
        x: coord.x,
        y: coord.y,
        width: 0,
        height: 0
      };
    }
    return bBox;
  },
  _getPositionFromLocation: function _getPositionFromLocation(location) {
    var x;
    var y;
    var isTop = location === 'top';
    if (!this._options.rotated) {
      x = this.x;
      y = isTop ? _min(this.y, this.minY) : _max(this.y, this.minY);
    } else {
      x = isTop ? _max(this.x, this.minX) : _min(this.x, this.minX);
      y = this.y;
    }
    return {
      x: x,
      y: y
    };
  },
  _checkOverlay: function _checkOverlay(bottomCoord, topCoord, topValue) {
    return bottomCoord < topCoord + topValue;
  },
  _getOverlayCorrections: function _getOverlayCorrections(topCoords, bottomCoords) {
    var rotated = this._options.rotated;
    var coordSelector = !rotated ? 'y' : 'x';
    var valueSelector = !rotated ? 'height' : 'width';
    var visibleArea = this.series.getValueAxis().getVisibleArea();
    var minBound = visibleArea[0];
    var maxBound = visibleArea[1];
    var delta = _round((topCoords[coordSelector] + topCoords[valueSelector] - bottomCoords[coordSelector]) / 2);
    var coord1 = topCoords[coordSelector] - delta;
    var coord2 = bottomCoords[coordSelector] + delta;
    if (coord1 < minBound) {
      delta = minBound - coord1;
      coord1 += delta;
      coord2 += delta;
    } else if (coord2 + bottomCoords[valueSelector] > maxBound) {
      delta = maxBound - coord2 - bottomCoords[valueSelector];
      coord1 += delta;
      coord2 += delta;
    }
    return {
      coord1: coord1,
      coord2: coord2
    };
  },
  _checkLabelsOverlay: function _checkLabelsOverlay(topLocation) {
    var that = this;
    var topCoords = that._topLabel.getBoundingRect();
    var bottomCoords = that._bottomLabel.getBoundingRect();
    var corrections = {};
    if (!that._options.rotated) {
      if (topLocation === 'top') {
        if (this._checkOverlay(bottomCoords.y, topCoords.y, topCoords.height)) {
          corrections = this._getOverlayCorrections(topCoords, bottomCoords);
          that._topLabel.shift(topCoords.x, corrections.coord1);
          that._bottomLabel.shift(bottomCoords.x, corrections.coord2);
        }
      } else {
        if (this._checkOverlay(topCoords.y, bottomCoords.y, bottomCoords.height)) {
          corrections = this._getOverlayCorrections(bottomCoords, topCoords);
          that._topLabel.shift(topCoords.x, corrections.coord2);
          that._bottomLabel.shift(bottomCoords.x, corrections.coord1);
        }
      }
    } else {
      if (topLocation === 'top') {
        if (this._checkOverlay(topCoords.x, bottomCoords.x, bottomCoords.width)) {
          corrections = this._getOverlayCorrections(bottomCoords, topCoords);
          that._topLabel.shift(corrections.coord2, topCoords.y);
          that._bottomLabel.shift(corrections.coord1, bottomCoords.y);
        }
      } else {
        if (this._checkOverlay(bottomCoords.x, topCoords.x, topCoords.width)) {
          corrections = this._getOverlayCorrections(topCoords, bottomCoords);
          that._topLabel.shift(corrections.coord1, topCoords.y);
          that._bottomLabel.shift(corrections.coord2, bottomCoords.y);
        }
      }
    }
  },
  _drawLabel: function _drawLabel() {
    var that = this;
    var labels = [];
    var notInverted = that._options.rotated ? that.x >= that.minX : that.y < that.minY;
    var customVisibility = that._getCustomLabelVisibility();
    var topLabel = that._topLabel;
    var bottomLabel = that._bottomLabel;
    topLabel.pointPosition = notInverted ? 'top' : 'bottom';
    bottomLabel.pointPosition = notInverted ? 'bottom' : 'top';
    if ((that.series.getLabelVisibility() || customVisibility) && that.hasValue() && customVisibility !== false) {
      that.visibleTopMarker !== false && labels.push(topLabel);
      that.visibleBottomMarker !== false && labels.push(bottomLabel);
      each(labels, function (_, label) {
        label.draw(true);
      });
      that._checkLabelsOverlay(that._topLabel.pointPosition);
    } else {
      topLabel.draw(false);
      bottomLabel.draw(false);
    }
  },
  _getImage: function _getImage(imageOption) {
    var image = {};
    if (_isDefined(imageOption)) {
      if (typeof imageOption === 'string') {
        image.top = image.bottom = imageOption;
      } else {
        image.top = {
          url: typeof imageOption.url === 'string' ? imageOption.url : imageOption.url && imageOption.url.rangeMaxPoint,
          width: typeof imageOption.width === 'number' ? imageOption.width : imageOption.width && imageOption.width.rangeMaxPoint,
          height: typeof imageOption.height === 'number' ? imageOption.height : imageOption.height && imageOption.height.rangeMaxPoint
        };
        image.bottom = {
          url: typeof imageOption.url === 'string' ? imageOption.url : imageOption.url && imageOption.url.rangeMinPoint,
          width: typeof imageOption.width === 'number' ? imageOption.width : imageOption.width && imageOption.width.rangeMinPoint,
          height: typeof imageOption.height === 'number' ? imageOption.height : imageOption.height && imageOption.height.rangeMinPoint
        };
      }
    }
    return image;
  },
  _checkSymbol: function _checkSymbol(oldOptions, newOptions) {
    var that = this;
    var oldSymbol = oldOptions.symbol;
    var newSymbol = newOptions.symbol;
    var symbolChanged = oldSymbol === 'circle' && newSymbol !== 'circle' || oldSymbol !== 'circle' && newSymbol === 'circle';
    var oldImages = that._getImage(oldOptions.image);
    var newImages = that._getImage(newOptions.image);
    var topImageChanged = that._checkImage(oldImages.top) !== that._checkImage(newImages.top);
    var bottomImageChanged = that._checkImage(oldImages.bottom) !== that._checkImage(newImages.bottom);
    return symbolChanged || topImageChanged || bottomImageChanged;
  },
  _getSettingsForTwoMarkers: function _getSettingsForTwoMarkers(style) {
    var that = this;
    var options = that._options;
    var settings = {};
    var x = options.rotated ? _min(that.x, that.minX) : that.x;
    var y = options.rotated ? that.y : _min(that.y, that.minY);
    var radius = style.r;
    var points = that._populatePointShape(options.symbol, radius);
    settings.top = _extend({
      translateX: x + that.width,
      translateY: y,
      r: radius
    }, style);
    settings.bottom = _extend({
      translateX: x,
      translateY: y + that.height,
      r: radius
    }, style);
    if (points) {
      settings.top.points = settings.bottom.points = points;
    }
    return settings;
  },
  _hasGraphic: function _hasGraphic() {
    return this.graphic && this.graphic.topMarker && this.graphic.bottomMarker;
  },
  _drawOneMarker: function _drawOneMarker(renderer, markerType, imageSettings, settings) {
    var that = this;
    var graphic = that.graphic;
    if (graphic[markerType]) {
      that._updateOneMarker(markerType, settings);
    } else {
      graphic[markerType] = that._createMarker(renderer, graphic, imageSettings, settings);
    }
  },
  _drawMarker: function _drawMarker(renderer, group, animationEnabled, firstDrawing, style) {
    var that = this;
    var settings = that._getSettingsForTwoMarkers(style || that._getStyle());
    var image = that._getImage(that._options.image);
    if (that._checkImage(image.top)) {
      settings.top = that._getImageSettings(settings.top, image.top);
    }
    if (that._checkImage(image.bottom)) {
      settings.bottom = that._getImageSettings(settings.bottom, image.bottom);
    }
    that.graphic = that.graphic || renderer.g().append(group);
    that.visibleTopMarker && that._drawOneMarker(renderer, 'topMarker', image.top, settings.top);
    that.visibleBottomMarker && that._drawOneMarker(renderer, 'bottomMarker', image.bottom, settings.bottom);
  },
  _getSettingsForTracker: function _getSettingsForTracker(radius) {
    var that = this;
    var rotated = that._options.rotated;
    return {
      translateX: rotated ? _min(that.x, that.minX) - radius : that.x - radius,
      translateY: rotated ? that.y - radius : _min(that.y, that.minY) - radius,
      width: that.width + 2 * radius,
      height: that.height + 2 * radius
    };
  },
  isInVisibleArea: function isInVisibleArea() {
    var that = this;
    var rotated = that._options.rotated;
    var argument = !rotated ? that.x : that.y;
    var maxValue = !rotated ? _max(that.minY, that.y) : _max(that.minX, that.x);
    var minValue = !rotated ? _min(that.minY, that.y) : _min(that.minX, that.x);
    var tmp;
    var visibleTopMarker;
    var visibleBottomMarker;
    var visibleRangeArea = true;
    var visibleArgArea = that.series.getArgumentAxis().getVisibleArea();
    var visibleValArea = that.series.getValueAxis().getVisibleArea();
    var notVisibleByArg = visibleArgArea[1] < argument || visibleArgArea[0] > argument;
    var notVisibleByVal = visibleValArea[0] > minValue && visibleValArea[0] > maxValue || visibleValArea[1] < minValue && visibleValArea[1] < maxValue;
    if (notVisibleByArg || notVisibleByVal) {
      visibleTopMarker = visibleBottomMarker = visibleRangeArea = false;
    } else {
      visibleTopMarker = visibleValArea[0] <= minValue && visibleValArea[1] > minValue;
      visibleBottomMarker = visibleValArea[0] < maxValue && visibleValArea[1] >= maxValue;
      if (rotated) {
        tmp = visibleTopMarker;
        visibleTopMarker = visibleBottomMarker;
        visibleBottomMarker = tmp;
      }
    }
    that.visibleTopMarker = visibleTopMarker;
    that.visibleBottomMarker = visibleBottomMarker;
    return visibleRangeArea;
  },
  getTooltipParams: function getTooltipParams() {
    var that = this;
    var x;
    var y;
    var rotated = that._options.rotated;
    var minValue = !rotated ? _min(that.y, that.minY) : _min(that.x, that.minX);
    var side = !rotated ? 'height' : 'width';
    var visibleArea = that._getVisibleArea();
    var minVisible = rotated ? visibleArea.minX : visibleArea.minY;
    var maxVisible = rotated ? visibleArea.maxX : visibleArea.maxY;
    var min = _max(minVisible, minValue);
    var max = _min(maxVisible, minValue + that[side]);
    if (!rotated) {
      x = that.x;
      y = min + (max - min) / 2;
    } else {
      y = that.y;
      x = min + (max - min) / 2;
    }
    return {
      x: x,
      y: y,
      offset: 0
    };
  },
  _translate: function _translate() {
    var that = this;
    var rotated = that._options.rotated;
    symbolPoint._translate.call(that);
    that.height = rotated ? 0 : _abs(that.minY - that.y);
    that.width = rotated ? _abs(that.x - that.minX) : 0;
  },
  hasCoords: function hasCoords() {
    return symbolPoint.hasCoords.call(this) && !(this.minX === null || this.minY === null);
  },
  _updateData: function _updateData(data) {
    var that = this;
    symbolPoint._updateData.call(that, data);
    that.minValue = that.initialMinValue = that.originalMinValue = data.minValue;
  },
  _getImageSettings: function _getImageSettings(settings, image) {
    return {
      href: image.url || image.toString(),
      width: image.width || DEFAULT_IMAGE_WIDTH,
      height: image.height || DEFAULT_IMAGE_HEIGHT,
      translateX: settings.translateX,
      translateY: settings.translateY
    };
  },
  getCrosshairData: function getCrosshairData(x, y) {
    var that = this;
    var rotated = that._options.rotated;
    var minX = that.minX;
    var minY = that.minY;
    var vx = that.vx;
    var vy = that.vy;
    var value = that.value;
    var minValue = that.minValue;
    var argument = that.argument;
    var coords = {
      axis: that.series.axis,
      x: vx,
      y: vy,
      yValue: value,
      xValue: argument
    };
    if (rotated) {
      coords.yValue = argument;
      if (_abs(vx - x) < _abs(minX - x)) {
        coords.xValue = value;
      } else {
        coords.x = minX;
        coords.xValue = minValue;
      }
    } else {
      if (_abs(vy - y) >= _abs(minY - y)) {
        coords.y = minY;
        coords.yValue = minValue;
      }
    }
    return coords;
  },
  _updateOneMarker: function _updateOneMarker(markerType, settings) {
    this.graphic && this.graphic[markerType] && this.graphic[markerType].attr(settings);
  },
  _updateMarker: function _updateMarker(animationEnabled, style) {
    this._drawMarker(undefined, undefined, false, false, style);
  },
  _getFormatObject: function _getFormatObject(tooltip) {
    var that = this;
    var initialMinValue = that.initialMinValue;
    var initialValue = that.initialValue;
    var initialArgument = that.initialArgument;
    var minValue = tooltip.formatValue(initialMinValue);
    var value = tooltip.formatValue(initialValue);
    return {
      argument: initialArgument,
      argumentText: tooltip.formatValue(initialArgument, 'argument'),
      valueText: minValue + ' - ' + value,
      rangeValue1Text: minValue,
      rangeValue2Text: value,
      rangeValue1: initialMinValue,
      rangeValue2: initialValue,
      seriesName: that.series.name,
      point: that,
      originalMinValue: that.originalMinValue,
      originalValue: that.originalValue,
      originalArgument: that.originalArgument
    };
  },
  getLabel: function getLabel() {
    return [this._topLabel, this._bottomLabel];
  },
  getLabels: function getLabels() {
    return [this._topLabel, this._bottomLabel];
  },
  getBoundingRect: noop,
  coordsIn: function coordsIn(x, y) {
    var trackerRadius = this._storeTrackerR();
    var xCond = x >= this.x - trackerRadius && x <= this.x + trackerRadius;
    var yCond = y >= this.y - trackerRadius && y <= this.y + trackerRadius;
    if (this._options.rotated) {
      return yCond && (xCond || x >= this.minX - trackerRadius && x <= this.minX + trackerRadius);
    } else {
      return xCond && (yCond || y >= this.minY - trackerRadius && y <= this.minY + trackerRadius);
    }
  },
  getMaxValue: function getMaxValue() {
    if (this.series.valueAxisType !== 'discrete') {
      return this.minValue > this.value ? this.minValue : this.value;
    }
    return this.value;
  },
  getMinValue: function getMinValue() {
    if (this.series.valueAxisType !== 'discrete') {
      return this.minValue < this.value ? this.minValue : this.value;
    }
    return this.minValue;
  }
});
