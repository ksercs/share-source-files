"use strict";

exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _object = require("../../core/utils/object");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _base_gauge = require("./base_gauge");
var _common = require("./common");
var _utils = require("../core/utils");
var _center_template = require("../core/center_template");
var circularIndicators = _interopRequireWildcard(require("./circular_indicators"));
var _circular_range_container = _interopRequireDefault(require("./circular_range_container"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _isFinite = isFinite;
var _normalizeAngle = _utils.normalizeAngle;
var _getCosAndSin = _utils.getCosAndSin;
var _abs = Math.abs;
var _max = Math.max;
var _min = Math.min;
var _round = Math.round;
var _each = _iterator.each;
var PI = Math.PI;
function getSides(startAngle, endAngle) {
  var startCosSin = _getCosAndSin(startAngle);
  var endCosSin = _getCosAndSin(endAngle);
  var startCos = startCosSin.cos;
  var startSin = startCosSin.sin;
  var endCos = endCosSin.cos;
  var endSin = endCosSin.sin;
  return {
    left: startSin <= 0 && endSin >= 0 || startSin <= 0 && endSin <= 0 && startCos <= endCos || startSin >= 0 && endSin >= 0 && startCos >= endCos ? -1 : _min(startCos, endCos, 0),
    right: startSin >= 0 && endSin <= 0 || startSin >= 0 && endSin >= 0 && startCos >= endCos || startSin <= 0 && endSin <= 0 && startCos <= endCos ? 1 : _max(startCos, endCos, 0),
    up: startCos <= 0 && endCos >= 0 || startCos <= 0 && endCos <= 0 && startSin >= endSin || startCos >= 0 && endCos >= 0 && startSin <= endSin ? -1 : -_max(startSin, endSin, 0),
    down: startCos >= 0 && endCos <= 0 || startCos >= 0 && endCos >= 0 && startSin <= endSin || startCos <= 0 && endCos <= 0 && startSin >= endSin ? 1 : -_min(startSin, endSin, 0)
  };
}
var dxCircularGauge = _common.dxGauge.inherit({
  _rootClass: 'dxg-circular-gauge',
  _factoryMethods: {
    rangeContainer: 'createCircularRangeContainer',
    indicator: 'createCircularIndicator'
  },
  _gridSpacingFactor: 17,
  _scaleTypes: {
    type: 'polarAxes',
    drawingType: 'circular'
  },
  _getThemeManagerOptions() {
    var options = this.callBase.apply(this, arguments);
    options.subTheme = '_circular';
    return options;
  },
  _updateScaleTickIndent: function _updateScaleTickIndent(scaleOptions) {
    var indentFromTick = scaleOptions.label.indentFromTick;
    var length = scaleOptions.tick.visible ? scaleOptions.tick.length : 0;
    var textParams = this._scale.measureLabels((0, _extend.extend)({}, this._canvas));
    var scaleOrientation = scaleOptions.orientation;
    var tickCorrection = length;
    var indentFromAxis = indentFromTick;
    if (indentFromTick >= 0) {
      if (scaleOrientation === 'outside') {
        indentFromAxis += tickCorrection;
      } else if (scaleOrientation === 'center') {
        indentFromAxis += tickCorrection / 2;
      }
    } else {
      var labelCorrection = _max(textParams.width, textParams.height);
      indentFromAxis -= labelCorrection;
      if (scaleOrientation === 'inside') {
        indentFromAxis -= tickCorrection;
      } else if (scaleOrientation === 'center') {
        indentFromAxis -= tickCorrection / 2;
      }
    }
    scaleOptions.label.indentFromAxis = indentFromAxis;
    this._scale.updateOptions(scaleOptions);
  },
  _setupCodomain: function _setupCodomain() {
    var that = this;
    var geometry = that.option('geometry') || {};
    var startAngle = geometry.startAngle;
    var endAngle = geometry.endAngle;
    var sides;
    startAngle = _isFinite(startAngle) ? _normalizeAngle(startAngle) : 225;
    endAngle = _isFinite(endAngle) ? _normalizeAngle(endAngle) : -45;
    if (_abs(startAngle - endAngle) < 1) {
      endAngle -= 360;
      sides = {
        left: -1,
        up: -1,
        right: 1,
        down: 1
      };
    } else {
      startAngle < endAngle && (endAngle -= 360);
      sides = getSides(startAngle, endAngle);
    }
    that._area = {
      x: 0,
      y: 0,
      radius: 100,
      startCoord: startAngle,
      endCoord: endAngle,
      sides: sides
    };
    that._translator.setCodomain(startAngle, endAngle);
  },
  _getCenter: function _getCenter() {
    return this._getElementLayout();
  },
  _shiftScale: function _shiftScale(layout) {
    var scale = this._scale;
    var canvas = scale.getCanvas();
    canvas.width = canvas.height = layout.radius * 2;
    scale.draw(canvas);
    var centerCoords = scale.getCenter();
    scale.shift({
      right: layout.x - centerCoords.x,
      bottom: layout.y - centerCoords.y
    });
  },
  _getScaleLayoutValue: function _getScaleLayoutValue() {
    return this._area.radius;
  },
  _getTicksOrientation: function _getTicksOrientation(scaleOptions) {
    return scaleOptions.orientation;
  },
  _getTicksCoefficients: function _getTicksCoefficients(options) {
    var coefs = {
      inner: 0,
      outer: 1
    };
    if (options.orientation === 'inside') {
      coefs.inner = 1;
      coefs.outer = 0;
    } else if (options.orientation === 'center') {
      coefs.inner = coefs.outer = 0.5;
    }
    return coefs;
  },
  _correctScaleIndents: function _correctScaleIndents(result, indentFromTick, textParams) {
    if (indentFromTick >= 0) {
      result.horizontalOffset = indentFromTick + textParams.width;
      result.verticalOffset = indentFromTick + textParams.height;
    } else {
      result.horizontalOffset = result.verticalOffset = 0;
      result.min -= -indentFromTick + _max(textParams.width, textParams.height);
    }
    result.inverseHorizontalOffset = textParams.width / 2;
    result.inverseVerticalOffset = textParams.height / 2;
  },
  _measureMainElements: function _measureMainElements(elements, scaleMeasurement) {
    var that = this;
    var radius = that._area.radius;
    var maxRadius = 0;
    var minRadius = Infinity;
    var maxHorizontalOffset = 0;
    var maxVerticalOffset = 0;
    var maxInverseHorizontalOffset = 0;
    var maxInverseVerticalOffset = 0;
    var scale = that._scale;
    _each(elements.concat(scale), function (_, element) {
      var bounds = element.measure ? element.measure({
        radius: radius - element.getOffset()
      }) : scaleMeasurement;
      bounds.min > 0 && (minRadius = _min(minRadius, bounds.min));
      bounds.max > 0 && (maxRadius = _max(maxRadius, bounds.max));
      bounds.horizontalOffset > 0 && (maxHorizontalOffset = _max(maxHorizontalOffset, bounds.max + bounds.horizontalOffset));
      bounds.verticalOffset > 0 && (maxVerticalOffset = _max(maxVerticalOffset, bounds.max + bounds.verticalOffset));
      bounds.inverseHorizontalOffset > 0 && (maxInverseHorizontalOffset = _max(maxInverseHorizontalOffset, bounds.inverseHorizontalOffset));
      bounds.inverseVerticalOffset > 0 && (maxInverseVerticalOffset = _max(maxInverseVerticalOffset, bounds.inverseVerticalOffset));
    });
    maxHorizontalOffset = _max(maxHorizontalOffset - maxRadius, 0);
    maxVerticalOffset = _max(maxVerticalOffset - maxRadius, 0);
    return {
      minRadius: minRadius,
      maxRadius: maxRadius,
      horizontalMargin: maxHorizontalOffset,
      verticalMargin: maxVerticalOffset,
      inverseHorizontalMargin: maxInverseHorizontalOffset,
      inverseVerticalMargin: maxInverseVerticalOffset
    };
  },
  _applyMainLayout: function _applyMainLayout(elements, scaleMeasurement) {
    var measurements = this._measureMainElements(elements, scaleMeasurement);
    var area = this._area;
    var sides = area.sides;
    var margins = {
      left: (sides.left < -0.1 ? measurements.horizontalMargin : measurements.inverseHorizontalMargin) || 0,
      right: (sides.right > 0.1 ? measurements.horizontalMargin : measurements.inverseHorizontalMargin) || 0,
      top: (sides.up < -0.1 ? measurements.verticalMargin : measurements.inverseVerticalMargin) || 0,
      bottom: (sides.down > 0.1 ? measurements.verticalMargin : measurements.inverseVerticalMargin) || 0
    };
    var rect = selectRectByAspectRatio(this._innerRect, (sides.down - sides.up) / (sides.right - sides.left), margins);
    var radius = _min(getWidth(rect) / (sides.right - sides.left), getHeight(rect) / (sides.down - sides.up));
    radius = radius - measurements.maxRadius + area.radius;
    var x = rect.left - getWidth(rect) * sides.left / (sides.right - sides.left);
    var y = rect.top - getHeight(rect) * sides.up / (sides.down - sides.up);
    area.x = _round(x);
    area.y = _round(y);
    area.radius = radius;
    rect.left -= margins.left;
    rect.right += margins.right;
    rect.top -= margins.top;
    rect.bottom += margins.bottom;
    this._innerRect = rect;
  },
  _getElementLayout: function _getElementLayout() {
    var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return {
      x: this._area.x,
      y: this._area.y,
      radius: _round(this._area.radius - offset)
    };
  },
  _getApproximateScreenRange: function _getApproximateScreenRange() {
    var that = this;
    var area = that._area;
    var r = _min(that._canvas.width / (area.sides.right - area.sides.left), that._canvas.height / (area.sides.down - area.sides.up));
    r > area.totalRadius && (r = area.totalRadius);
    r = 0.8 * r;
    return -that._translator.getCodomainRange() * r * PI / 180;
  },
  _getDefaultSize: function _getDefaultSize() {
    return {
      width: 300,
      height: 300
    };
  },
  _factory: (0, _object.clone)(_base_gauge.BaseGauge.prototype._factory)
});
function getWidth(rect) {
  return rect.right - rect.left;
}
function getHeight(rect) {
  return rect.bottom - rect.top;
}
function selectRectByAspectRatio(srcRect, aspectRatio, margins) {
  var rect = (0, _extend.extend)({}, srcRect);
  var selfAspectRatio;
  var width = 0;
  var height = 0;
  margins = margins || {};
  if (aspectRatio > 0) {
    rect.left += margins.left || 0;
    rect.right -= margins.right || 0;
    rect.top += margins.top || 0;
    rect.bottom -= margins.bottom || 0;
    if (getWidth(rect) > 0 && getHeight(rect) > 0) {
      selfAspectRatio = getHeight(rect) / getWidth(rect);
      if (selfAspectRatio > 1) {
        aspectRatio < selfAspectRatio ? width = getWidth(rect) : height = getHeight(rect);
      } else {
        aspectRatio > selfAspectRatio ? height = getHeight(rect) : width = getWidth(rect);
      }
      width > 0 || (width = height / aspectRatio);
      height > 0 || (height = width * aspectRatio);
      width = (getWidth(rect) - width) / 2;
      height = (getHeight(rect) - height) / 2;
      rect.left += width;
      rect.right -= width;
      rect.top += height;
      rect.bottom -= height;
    } else {
      rect.left = rect.right = (rect.left + rect.right) / 2;
      rect.top = rect.bottom = (rect.top + rect.bottom) / 2;
    }
  }
  return rect;
}

///#DEBUG
dxCircularGauge._TESTS_selectRectByAspectRatio = selectRectByAspectRatio;
///#ENDDEBUG

var indicators = dxCircularGauge.prototype._factory.indicators = {};
dxCircularGauge.prototype._factory.createIndicator = (0, _common.createIndicatorCreator)(indicators);

/* eslint-disable import/namespace */
indicators._default = circularIndicators._default;
indicators['rectangleneedle'] = circularIndicators['rectangleneedle'];
indicators['triangleneedle'] = circularIndicators['triangleneedle'];
indicators['twocolorneedle'] = circularIndicators['twocolorneedle'];
indicators['trianglemarker'] = circularIndicators['trianglemarker'];
indicators['textcloud'] = circularIndicators['textcloud'];
indicators['rangebar'] = circularIndicators['rangebar'];
/* eslint-enable import/namespace */

dxCircularGauge.prototype._factory.RangeContainer = _circular_range_container.default;
(0, _component_registrator.default)('dxCircularGauge', dxCircularGauge);
dxCircularGauge.addPlugin(_center_template.plugins.gauge);
var _default = dxCircularGauge;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;