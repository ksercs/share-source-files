"use strict";

exports.default = void 0;
var _iterator = require("../../core/utils/iterator");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _extend = require("../../core/utils/extend");
var _object = require("../../core/utils/object");
var _base_gauge = require("./base_gauge");
var _common = require("./common");
var _utils = require("../core/utils");
var linearIndicators = _interopRequireWildcard(require("./linear_indicators"));
var _linear_range_container = _interopRequireDefault(require("./linear_range_container"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _max = Math.max;
var _min = Math.min;
var _round = Math.round;
var dxLinearGauge = _common.dxGauge.inherit({
  _rootClass: 'dxg-linear-gauge',
  _factoryMethods: {
    rangeContainer: 'createLinearRangeContainer',
    indicator: 'createLinearIndicator'
  },
  _gridSpacingFactor: 25,
  _scaleTypes: {
    type: 'xyAxes',
    drawingType: 'linear'
  },
  _getTicksOrientation: function _getTicksOrientation(scaleOptions) {
    return scaleOptions.isHorizontal ? scaleOptions.verticalOrientation : scaleOptions.horizontalOrientation;
  },
  _getThemeManagerOptions() {
    var options = this.callBase.apply(this, arguments);
    options.subTheme = '_linear';
    return options;
  },
  _getInvertedState() {
    return !this._area.vertical && this.option('rtlEnabled');
  },
  _prepareScaleSettings: function _prepareScaleSettings() {
    var scaleOptions = this.callBase();
    scaleOptions.inverted = this._getInvertedState();
    return scaleOptions;
  },
  _updateScaleTickIndent: function _updateScaleTickIndent(scaleOptions) {
    var indentFromTick = scaleOptions.label.indentFromTick;
    var length = scaleOptions.tick.length;
    var textParams = this._scale.measureLabels((0, _extend.extend)({}, this._canvas));
    var verticalTextCorrection = scaleOptions.isHorizontal ? textParams.height + textParams.y : 0;
    var isIndentPositive = indentFromTick > 0;
    var orientation;
    var textCorrection;
    var tickCorrection;
    if (scaleOptions.isHorizontal) {
      orientation = isIndentPositive ? {
        center: 0.5,
        top: 0,
        bottom: 1
      } : {
        center: 0.5,
        top: 1,
        bottom: 0
      };
      tickCorrection = length * orientation[scaleOptions.verticalOrientation];
      textCorrection = textParams.y;
    } else {
      orientation = isIndentPositive ? {
        center: 0.5,
        left: 0,
        right: 1
      } : {
        center: 0.5,
        left: 1,
        right: 0
      };
      tickCorrection = length * orientation[scaleOptions.horizontalOrientation];
      textCorrection = -textParams.width;
    }
    scaleOptions.label.indentFromAxis = -indentFromTick + (isIndentPositive ? -tickCorrection + textCorrection : tickCorrection - verticalTextCorrection);
    this._scale.updateOptions(scaleOptions);
  },
  _shiftScale: function _shiftScale(layout, scaleOptions) {
    var that = this;
    var canvas = (0, _extend.extend)({}, that._canvas);
    var isHorizontal = scaleOptions.isHorizontal;
    var scale = that._scale;
    canvas[isHorizontal ? 'left' : 'top'] = that._area[isHorizontal ? 'startCoord' : 'endCoord'];
    canvas[isHorizontal ? 'right' : 'bottom'] = canvas[isHorizontal ? 'width' : 'height'] - that._area[isHorizontal ? 'endCoord' : 'startCoord'];
    scale.draw(canvas);
    scale.shift({
      left: -layout.x,
      top: -layout.y
    });
  },
  _setupCodomain: function _setupCodomain() {
    var that = this;
    var geometry = that.option('geometry') || {};
    var vertical = (0, _utils.normalizeEnum)(geometry.orientation) === 'vertical';
    var initialStartCoord = -100;
    var initialEndCoord = 100;
    that._area = {
      vertical: vertical,
      x: 0,
      y: 0,
      startCoord: initialStartCoord,
      endCoord: initialEndCoord
    };
    that._rangeContainer.vertical = vertical;
    that._translator.setInverted(that._getInvertedState());
    that._translator.setCodomain(initialStartCoord, initialEndCoord);
  },
  _getScaleLayoutValue: function _getScaleLayoutValue() {
    return this._area[this._area.vertical ? 'x' : 'y'];
  },
  _getTicksCoefficients: function _getTicksCoefficients(options) {
    var coefs = {
      inner: 0,
      outer: 1
    };
    if (this._area.vertical) {
      if (options.horizontalOrientation === 'left') {
        coefs.inner = 1;
        coefs.outer = 0;
      } else if (options.horizontalOrientation === 'center') {
        coefs.inner = coefs.outer = 0.5;
      }
    } else {
      if (options.verticalOrientation === 'top') {
        coefs.inner = 1;
        coefs.outer = 0;
      } else if (options.verticalOrientation === 'center') {
        coefs.inner = coefs.outer = 0.5;
      }
    }
    return coefs;
  },
  _correctScaleIndents: function _correctScaleIndents(result, indentFromTick, textParams) {
    var vertical = this._area.vertical;
    if (indentFromTick >= 0) {
      result.max += indentFromTick + textParams[vertical ? 'width' : 'height'];
    } else {
      result.min -= -indentFromTick + textParams[vertical ? 'width' : 'height'];
    }
    result.indent = textParams[vertical ? 'height' : 'width'] / 2;
  },
  _measureMainElements: function _measureMainElements(elements, scaleMeasurement) {
    var that = this;
    var x = that._area.x;
    var y = that._area.y;
    var minBound = 1000;
    var maxBound = 0;
    var indent = 0;
    var scale = that._scale;
    (0, _iterator.each)(elements.concat(scale), function (_, element) {
      var bounds = element.measure ? element.measure({
        x: x + element.getOffset(),
        y: y + element.getOffset()
      }) : scaleMeasurement;
      bounds.max !== undefined && (maxBound = _max(maxBound, bounds.max));
      bounds.min !== undefined && (minBound = _min(minBound, bounds.min));
      bounds.indent > 0 && (indent = _max(indent, bounds.indent));
    });
    return {
      minBound: minBound,
      maxBound: maxBound,
      indent: indent
    };
  },
  _applyMainLayout: function _applyMainLayout(elements, scaleMeasurement) {
    var that = this;
    var measurements = that._measureMainElements(elements, scaleMeasurement);
    var area = that._area;
    var rect;
    var offset;
    if (area.vertical) {
      rect = selectRectBySizes(that._innerRect, {
        width: measurements.maxBound - measurements.minBound
      });
      offset = (rect.left + rect.right) / 2 - (measurements.minBound + measurements.maxBound) / 2;
      area.startCoord = rect.bottom - measurements.indent;
      area.endCoord = rect.top + measurements.indent;
      area.x = _round(area.x + offset);
    } else {
      rect = selectRectBySizes(that._innerRect, {
        height: measurements.maxBound - measurements.minBound
      });
      offset = (rect.top + rect.bottom) / 2 - (measurements.minBound + measurements.maxBound) / 2;
      area.startCoord = rect.left + measurements.indent;
      area.endCoord = rect.right - measurements.indent;
      area.y = _round(area.y + offset);
    }
    that._translator.setCodomain(area.startCoord, area.endCoord);
    that._innerRect = rect;
  },
  _getElementLayout: function _getElementLayout(offset) {
    return {
      x: _round(this._area.x + offset),
      y: _round(this._area.y + offset)
    };
  },
  _getApproximateScreenRange: function _getApproximateScreenRange() {
    var that = this;
    var area = that._area;
    var s = area.vertical ? that._canvas.height : that._canvas.width;
    s > area.totalSize && (s = area.totalSize);
    s = s * 0.8;
    return s;
  },
  _getDefaultSize: function _getDefaultSize() {
    var geometry = this.option('geometry') || {};
    if (geometry.orientation === 'vertical') {
      return {
        width: 100,
        height: 300
      };
    } else {
      return {
        width: 300,
        height: 100
      };
    }
  },
  _factory: (0, _object.clone)(_base_gauge.BaseGauge.prototype._factory)
});
function selectRectBySizes(srcRect, sizes, margins) {
  var rect = (0, _extend.extend)({}, srcRect);
  var step;
  margins = margins || {};
  if (sizes) {
    rect.left += margins.left || 0;
    rect.right -= margins.right || 0;
    rect.top += margins.top || 0;
    rect.bottom -= margins.bottom || 0;
    if (sizes.width > 0) {
      step = (rect.right - rect.left - sizes.width) / 2;
      if (step > 0) {
        rect.left += step;
        rect.right -= step;
      }
    }
    if (sizes.height > 0) {
      step = (rect.bottom - rect.top - sizes.height) / 2;
      if (step > 0) {
        rect.top += step;
        rect.bottom -= step;
      }
    }
  }
  return rect;
}

///#DEBUG
dxLinearGauge._TESTS_selectRectBySizes = selectRectBySizes;
///#ENDDEBUG

var indicators = dxLinearGauge.prototype._factory.indicators = {};
dxLinearGauge.prototype._factory.createIndicator = (0, _common.createIndicatorCreator)(indicators);

/* eslint-disable import/namespace */
indicators._default = linearIndicators._default;
indicators['rectangle'] = linearIndicators['rectangle'];
indicators['rhombus'] = linearIndicators['rhombus'];
indicators['circle'] = linearIndicators['circle'];
indicators['trianglemarker'] = linearIndicators['trianglemarker'];
indicators['textcloud'] = linearIndicators['textcloud'];
indicators['rangebar'] = linearIndicators['rangebar'];
/* eslint-enable import/namespace */

dxLinearGauge.prototype._factory.RangeContainer = _linear_range_container.default;
(0, _component_registrator.default)('dxLinearGauge', dxLinearGauge);
var _default = dxLinearGauge;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;