/**
* DevExtreme (cjs/viz/gauges/common.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.createIndicatorCreator = createIndicatorCreator;
exports.dxGauge = void 0;
var _base_gauge = require("./base_gauge");
var _type = require("../../core/utils/type");
var _extend2 = require("../../core/utils/extend");
var _base_axis = require("../axes/base_axis");
var _utils = require("../core/utils");
var _common = require("../../core/utils/common");
var _isArray = Array.isArray;
var _isFinite = isFinite;
var _Number = Number;
var _min = Math.min;
var _max = Math.max;
var _extend = _extend2.extend;
var SHIFT_ANGLE = 90;
var OPTION_VALUE = 'value';
var OPTION_SUBVALUES = 'subvalues';
var DEFAULT_MINOR_AXIS_DIVISION_FACTOR = 5;
var DEFAULT_NUMBER_MULTIPLIERS = [1, 2, 5];
function processValue(value, fallbackValue) {
  if (value === null) {
    return value;
  }
  return _isFinite(value) ? _Number(value) : fallbackValue;
}
function parseArrayOfNumbers(arg) {
  return _isArray(arg) ? arg : (0, _type.isNumeric)(arg) ? [arg] : null;
}
var dxGauge = _base_gauge.BaseGauge.inherit({
  _initCore: function _initCore() {
    var that = this;
    var renderer = that._renderer;
    that._setupValue(that.option(OPTION_VALUE));
    that.__subvalues = parseArrayOfNumbers(that.option(OPTION_SUBVALUES));
    that._setupSubvalues(that.__subvalues);
    selectMode(that);
    that.callBase.apply(that, arguments);
    that._rangeContainer = new that._factory.RangeContainer({
      renderer: renderer,
      container: renderer.root,
      translator: that._translator,
      themeManager: that._themeManager
    });
    that._initScale();
    that._subvalueIndicatorContainer = that._renderer.g().attr({
      class: 'dxg-subvalue-indicators'
    }).linkOn(that._renderer.root, 'valueIndicator').enableLinks();
  },
  _fontFields: ['scale.label.font', 'valueIndicators.rangebar.text.font', 'valueIndicators.textcloud.text.font', 'indicator.text.font'],
  _initScale: function _initScale() {
    var that = this;
    that._scaleGroup = that._renderer.g().attr({
      'class': 'dxg-scale'
    }).linkOn(that._renderer.root, 'scale');
    that._labelsAxesGroup = that._renderer.g().attr({
      'class': 'dxg-scale-elements'
    }).linkOn(that._renderer.root, 'scale-elements');
    that._scale = new _base_axis.Axis({
      incidentOccurred: that._incidentOccurred,
      renderer: that._renderer,
      axesContainerGroup: that._scaleGroup,
      labelsAxesGroup: that._labelsAxesGroup,
      axisType: that._scaleTypes.type,
      drawingType: that._scaleTypes.drawingType,
      widgetClass: 'dxg',
      getTemplate() {}
    });
  },
  _disposeCore: function _disposeCore() {
    var that = this;
    that.callBase.apply(that, arguments);
    that._scale.dispose();
    that._scaleGroup.linkOff();
    that._labelsAxesGroup.linkOff();
    that._rangeContainer.dispose();
    that._disposeValueIndicators();
    that._subvalueIndicatorContainer.linkOff();
    that._scale = that._scaleGroup = that._labelsAxesGroup = that._rangeContainer = null;
  },
  _disposeValueIndicators: function _disposeValueIndicators() {
    var that = this;
    that._valueIndicator && that._valueIndicator.dispose();
    that._subvalueIndicatorsSet && that._subvalueIndicatorsSet.dispose();
    that._valueIndicator = that._subvalueIndicatorsSet = null;
  },
  _setupDomainCore: function _setupDomainCore() {
    var that = this;
    var scaleOption = that.option('scale') || {};
    var startValue = that.option('startValue');
    var endValue = that.option('endValue');
    startValue = (0, _type.isNumeric)(startValue) ? _Number(startValue) : (0, _type.isNumeric)(scaleOption.startValue) ? _Number(scaleOption.startValue) : 0;
    endValue = (0, _type.isNumeric)(endValue) ? _Number(endValue) : (0, _type.isNumeric)(scaleOption.endValue) ? _Number(scaleOption.endValue) : 100;
    that._baseValue = startValue < endValue ? startValue : endValue;
    that._translator.setDomain(startValue, endValue);
  },
  _cleanContent: function _cleanContent() {
    var that = this;
    that._rangeContainer.clean();
    that._cleanValueIndicators();
  },
  _measureScale: function _measureScale(scaleOptions) {
    var that = this;
    var majorTick = scaleOptions.tick;
    var majorTickEnabled = majorTick.visible && majorTick.length > 0 && majorTick.width > 0;
    var minorTick = scaleOptions.minorTick;
    var minorTickEnabled = minorTick.visible && minorTick.length > 0 && minorTick.width > 0;
    var label = scaleOptions.label;
    var indentFromTick = Number(label.indentFromTick);
    if (!majorTickEnabled && !minorTickEnabled && !label.visible) {
      return {};
    }
    var textParams = that._scale.measureLabels((0, _extend2.extend)({}, that._canvas));
    var layoutValue = that._getScaleLayoutValue();
    var result = {
      min: layoutValue,
      max: layoutValue
    };
    var coefs = that._getTicksCoefficients(scaleOptions);
    var innerCoef = coefs.inner;
    var outerCoef = coefs.outer;
    if (majorTickEnabled) {
      result.min = _min(result.min, layoutValue - innerCoef * majorTick.length);
      result.max = _max(result.max, layoutValue + outerCoef * majorTick.length);
    }
    if (minorTickEnabled) {
      result.min = _min(result.min, layoutValue - innerCoef * minorTick.length);
      result.max = _max(result.max, layoutValue + outerCoef * minorTick.length);
    }
    label.visible && that._correctScaleIndents(result, indentFromTick, textParams);
    return result;
  },
  _renderContent: function _renderContent() {
    var that = this;
    var scaleOptions = that._prepareScaleSettings();
    that._rangeContainer.render(_extend(that._getOption('rangeContainer'), {
      vertical: that._area.vertical
    }));
    that._renderScale(scaleOptions);
    that._subvalueIndicatorContainer.linkAppend();
    var elements = (0, _utils.map)([that._rangeContainer].concat(that._prepareValueIndicators()), function (element) {
      return element && element.enabled ? element : null;
    });
    that._applyMainLayout(elements, that._measureScale(scaleOptions));
    elements.forEach(function (element) {
      return element.resize(that._getElementLayout(element.getOffset()));
    });
    that._shiftScale(that._getElementLayout(0), scaleOptions);
    that._beginValueChanging();
    that._updateActiveElements();
    that._endValueChanging();
  },
  _prepareScaleSettings: function _prepareScaleSettings() {
    var that = this;
    var userOptions = that.option('scale');
    var scaleOptions = (0, _extend2.extend)(true, {}, that._themeManager.theme('scale'), userOptions);
    scaleOptions.label.indentFromAxis = 0;
    scaleOptions.isHorizontal = !that._area.vertical;
    scaleOptions.forceUserTickInterval |= (0, _type.isDefined)(userOptions) && (0, _type.isDefined)(userOptions.tickInterval) && !(0, _type.isDefined)(userOptions.scaleDivisionFactor);
    scaleOptions.axisDivisionFactor = scaleOptions.scaleDivisionFactor || that._gridSpacingFactor;
    scaleOptions.minorAxisDivisionFactor = scaleOptions.minorScaleDivisionFactor || DEFAULT_MINOR_AXIS_DIVISION_FACTOR;
    scaleOptions.numberMultipliers = DEFAULT_NUMBER_MULTIPLIERS;
    scaleOptions.tickOrientation = that._getTicksOrientation(scaleOptions);
    if (scaleOptions.label.useRangeColors) {
      scaleOptions.label.customizeColor = function () {
        return that._rangeContainer.getColorForValue(this.value);
      };
    }
    return scaleOptions;
  },
  _renderScale: function _renderScale(scaleOptions) {
    var that = this;
    var bounds = that._translator.getDomain();
    var startValue = bounds[0];
    var endValue = bounds[1];
    var angles = that._translator.getCodomain();
    var invert = !!(startValue > endValue ^ scaleOptions.inverted);
    var min = _min(startValue, endValue);
    var max = _max(startValue, endValue);
    scaleOptions.min = min;
    scaleOptions.max = max;
    scaleOptions.startAngle = SHIFT_ANGLE - angles[0];
    scaleOptions.endAngle = SHIFT_ANGLE - angles[1];
    scaleOptions.skipViewportExtending = true;
    scaleOptions.inverted = invert;
    that._scale.updateOptions(scaleOptions);
    that._scale.setBusinessRange({
      axisType: 'continuous',
      dataType: 'numeric',
      min: min,
      max: max,
      invert: invert
    });
    that._updateScaleTickIndent(scaleOptions);
    that._scaleGroup.linkAppend();
    that._labelsAxesGroup.linkAppend();
    that._scale.draw((0, _extend2.extend)({}, that._canvas));
  },
  _updateIndicatorSettings: function _updateIndicatorSettings(settings) {
    var that = this;
    settings.currentValue = settings.baseValue = _isFinite(that._translator.translate(settings.baseValue)) ? _Number(settings.baseValue) : that._baseValue;
    settings.vertical = that._area.vertical;
    if (settings.text && !settings.text.format) {
      settings.text.format = that._defaultFormatOptions;
    }
  },
  _prepareIndicatorSettings: function _prepareIndicatorSettings(options, defaultTypeField) {
    var that = this;
    var theme = that._themeManager.theme('valueIndicators');
    var type = (0, _utils.normalizeEnum)(options.type || that._themeManager.theme(defaultTypeField));
    var settings = _extend(true, {}, theme._default, theme[type], options);
    settings.type = type;
    settings.animation = that._animationSettings;
    settings.containerBackgroundColor = that._containerBackgroundColor;
    that._updateIndicatorSettings(settings);
    return settings;
  },
  _cleanValueIndicators: function _cleanValueIndicators() {
    this._valueIndicator && this._valueIndicator.clean();
    this._subvalueIndicatorsSet && this._subvalueIndicatorsSet.clean();
  },
  _prepareValueIndicators: function _prepareValueIndicators() {
    var that = this;
    that._prepareValueIndicator();
    that.__subvalues !== null && that._prepareSubvalueIndicators();
    return [that._valueIndicator, that._subvalueIndicatorsSet];
  },
  _updateActiveElements: function _updateActiveElements() {
    this._updateValueIndicator();
    this._updateSubvalueIndicators();
  },
  _prepareValueIndicator: function _prepareValueIndicator() {
    var that = this;
    var target = that._valueIndicator;
    var settings = that._prepareIndicatorSettings(that.option('valueIndicator') || {}, 'valueIndicatorType');
    if (target && target.type !== settings.type) {
      target.dispose();
      target = null;
    }
    if (!target) {
      target = that._valueIndicator = that._createIndicator(settings.type, that._renderer.root, 'dxg-value-indicator', 'value-indicator');
    }
    target.render(settings);
  },
  _createSubvalueIndicatorsSet: function _createSubvalueIndicatorsSet() {
    var that = this;
    var root = that._subvalueIndicatorContainer;
    return new ValueIndicatorsSet({
      createIndicator: function createIndicator(type, i) {
        return that._createIndicator(type, root, 'dxg-subvalue-indicator', 'subvalue-indicator', i);
      },
      createPalette: function createPalette(palette) {
        return that._themeManager.createPalette(palette);
      }
    });
  },
  _prepareSubvalueIndicators: function _prepareSubvalueIndicators() {
    var that = this;
    var target = that._subvalueIndicatorsSet;
    var settings = that._prepareIndicatorSettings(that.option('subvalueIndicator') || {}, 'subvalueIndicatorType');
    if (!target) {
      target = that._subvalueIndicatorsSet = that._createSubvalueIndicatorsSet();
    }
    var isRecreate = settings.type !== target.type;
    target.type = settings.type;
    var dummy = that._createIndicator(settings.type, that._renderer.root);
    if (dummy) {
      dummy.dispose();
      target.render(settings, isRecreate);
    }
  },
  _setupValue: function _setupValue(value) {
    this.__value = processValue(value, this.__value);
  },
  _setupSubvalues: function _setupSubvalues(subvalues) {
    var vals = subvalues === undefined ? this.__subvalues : parseArrayOfNumbers(subvalues);
    var i;
    var ii;
    var list;
    if (vals === null) return;
    for (i = 0, ii = vals.length, list = []; i < ii; ++i) {
      list.push(processValue(vals[i], this.__subvalues[i]));
    }
    this.__subvalues = list;
  },
  _updateValueIndicator: function _updateValueIndicator() {
    var that = this;
    that._valueIndicator && that._valueIndicator.value(that.__value, that._noAnimation);
  },
  _updateSubvalueIndicators: function _updateSubvalueIndicators() {
    var that = this;
    that._subvalueIndicatorsSet && that._subvalueIndicatorsSet.values(that.__subvalues, that._noAnimation);
  },
  value: function value(arg) {
    if (arg !== undefined) {
      this._changeValue(arg);
      return this;
    }
    return this.__value;
  },
  subvalues: function subvalues(arg) {
    if (arg !== undefined) {
      this._changeSubvalues(arg);
      return this;
    }
    return this.__subvalues !== null ? this.__subvalues.slice() : undefined;
  },
  _changeValue: function _changeValue(value) {
    this._setupValue(value);
    this._beginValueChanging();
    this._updateValueIndicator();
    this._updateExtraElements();
    if (this.__value !== this.option(OPTION_VALUE)) {
      this.option(OPTION_VALUE, this.__value);
    }
    this._endValueChanging();
  },
  _changeSubvalues: function _changeSubvalues(subvalues) {
    if (this.__subvalues !== null) {
      this._setupSubvalues(subvalues);
      this._beginValueChanging();
      this._updateSubvalueIndicators();
      this._updateExtraElements();
      this._endValueChanging();
    } else {
      this.__subvalues = parseArrayOfNumbers(subvalues);
      this._setContentSize();
      this._renderContent();
    }
    if (!(0, _base_gauge.compareArrays)(this.__subvalues, this.option(OPTION_SUBVALUES))) {
      this.option(OPTION_SUBVALUES, this.__subvalues);
    }
  },
  _optionChangesMap: {
    scale: 'DOMAIN',
    rangeContainer: 'MOSTLY_TOTAL',
    valueIndicator: 'MOSTLY_TOTAL',
    subvalueIndicator: 'MOSTLY_TOTAL',
    containerBackgroundColor: 'MOSTLY_TOTAL',
    value: 'VALUE',
    subvalues: 'SUBVALUES',
    valueIndicators: 'MOSTLY_TOTAL'
  },
  _customChangesOrder: ['VALUE', 'SUBVALUES'],
  _change_VALUE: function _change_VALUE() {
    this._changeValue(this.option(OPTION_VALUE));
  },
  _change_SUBVALUES: function _change_SUBVALUES() {
    this._changeSubvalues(this.option(OPTION_SUBVALUES));
  },
  _applyMainLayout: null,
  _getElementLayout: null,
  _createIndicator: function _createIndicator(type, owner, className, trackerType, trackerIndex, _strict) {
    var that = this;
    var indicator = that._factory.createIndicator({
      renderer: that._renderer,
      translator: that._translator,
      owner: owner,
      tracker: that._tracker,
      className: className
    }, type, _strict);
    if (indicator) {
      indicator.type = type;
      indicator._trackerInfo = {
        type: trackerType,
        index: trackerIndex
      };
    }
    return indicator;
  },
  _getApproximateScreenRange: null
});
exports.dxGauge = dxGauge;
function valueGetter(arg) {
  return arg ? arg.value : null;
}
function setupValues(that, fieldName, optionItems) {
  var currentValues = that[fieldName];
  var newValues = _isArray(optionItems) ? (0, _utils.map)(optionItems, valueGetter) : [];
  var i = 0;
  var ii = newValues.length;
  var list = [];
  for (; i < ii; ++i) {
    list.push(processValue(newValues[i], currentValues[i]));
  }
  that[fieldName] = list;
}
function selectMode(gauge) {
  if (gauge.option(OPTION_VALUE) === undefined && gauge.option(OPTION_SUBVALUES) === undefined) {
    if (gauge.option('valueIndicators') !== undefined) {
      disableDefaultMode(gauge);
      selectHardMode(gauge);
    }
  }
}
function disableDefaultMode(that) {
  that.value = that.subvalues = _common.noop;
  that._setupValue = that._setupSubvalues = that._updateValueIndicator = that._updateSubvalueIndicators = null;
}
function selectHardMode(that) {
  that._indicatorValues = [];
  setupValues(that, '_indicatorValues', that.option('valueIndicators'));
  that._valueIndicators = [];
  var _applyMostlyTotalChange = that._applyMostlyTotalChange;
  that._applyMostlyTotalChange = function () {
    setupValues(this, '_indicatorValues', this.option('valueIndicators'));
    _applyMostlyTotalChange.call(this);
  };
  that._updateActiveElements = updateActiveElements_hardMode;
  that._prepareValueIndicators = prepareValueIndicators_hardMode;
  that._disposeValueIndicators = disposeValueIndicators_hardMode;
  that._cleanValueIndicators = cleanValueIndicators_hardMode;
  that.indicatorValue = indicatorValue_hardMode;
}
function updateActiveElements_hardMode() {
  var that = this;
  that._valueIndicators.forEach(function (valueIndicator) {
    valueIndicator.value(that._indicatorValues[valueIndicator.index], that._noAnimation);
  });
}
function prepareValueIndicators_hardMode() {
  var that = this;
  var valueIndicators = that._valueIndicators || [];
  var userOptions = that.option('valueIndicators');
  var optionList = [];
  var i = 0;
  var ii;
  for (ii = _isArray(userOptions) ? userOptions.length : 0; i < ii; ++i) {
    optionList.push(userOptions[i]);
  }
  for (ii = valueIndicators.length; i < ii; ++i) {
    optionList.push(null);
  }
  var newValueIndicators = [];
  optionList.forEach(function (userSettings, i) {
    var valueIndicator = valueIndicators[i];
    if (!userSettings) {
      valueIndicator && valueIndicator.dispose();
      return;
    }
    var settings = that._prepareIndicatorSettings(userSettings, 'valueIndicatorType');
    if (valueIndicator && valueIndicator.type !== settings.type) {
      valueIndicator.dispose();
      valueIndicator = null;
    }
    if (!valueIndicator) {
      valueIndicator = that._createIndicator(settings.type, that._renderer.root, 'dxg-value-indicator', 'value-indicator', i, true);
    }
    if (valueIndicator) {
      valueIndicator.index = i;
      valueIndicator.render(settings);
      newValueIndicators.push(valueIndicator);
    }
  });
  that._valueIndicators = newValueIndicators;
  return that._valueIndicators;
}
function disposeValueIndicators_hardMode() {
  this._valueIndicators.forEach(function (valueIndicator) {
    return valueIndicator.dispose();
  });
  this._valueIndicators = null;
}
function cleanValueIndicators_hardMode() {
  this._valueIndicators.forEach(function (valueIndicator) {
    return valueIndicator.clean();
  });
}
function indicatorValue_hardMode(index, value) {
  return accessPointerValue(this, this._valueIndicators, this._indicatorValues, index, value);
}
function accessPointerValue(that, pointers, values, index, value) {
  if (value !== undefined) {
    if (values[index] !== undefined) {
      values[index] = processValue(value, values[index]);
      pointers[index] && pointers[index].value(values[index]);
    }
    return that;
  } else {
    return values[index];
  }
}
function ValueIndicatorsSet(parameters) {
  this._parameters = parameters;
  this._indicators = [];
}
ValueIndicatorsSet.prototype = {
  constructor: ValueIndicatorsSet,
  dispose: function dispose() {
    var that = this;
    that._indicators.forEach(function (indicator) {
      return indicator.dispose();
    });
    that._parameters = that._options = that._indicators = that._colorPalette = that._palette = null;
    return that;
  },
  clean: function clean() {
    var that = this;
    that._sample && that._sample.clean().dispose();
    that._indicators.forEach(function (indicator) {
      return indicator.clean();
    });
    that._sample = that._options = that._palette = null;
    return that;
  },
  render: function render(options, isRecreate) {
    var that = this;
    that._options = options;
    that._sample = that._parameters.createIndicator(that.type);
    that._sample.render(options);
    that.enabled = that._sample.enabled;
    that._palette = (0, _type.isDefined)(options.palette) ? that._parameters.createPalette(options.palette) : null;
    if (that.enabled) {
      that._generatePalette(that._indicators.length);
      that._indicators = (0, _utils.map)(that._indicators, function (indicator, i) {
        if (isRecreate) {
          indicator.dispose();
          indicator = that._parameters.createIndicator(that.type, i);
        }
        indicator.render(that._getIndicatorOptions(i));
        return indicator;
      });
    }
    return that;
  },
  getOffset: function getOffset() {
    return this._sample.getOffset();
  },
  resize: function resize(layout) {
    var that = this;
    that._layout = layout;
    that._indicators.forEach(function (indicator) {
      return indicator.resize(layout);
    });
    return that;
  },
  measure: function measure(layout) {
    return this._sample.measure(layout);
  },
  _getIndicatorOptions: function _getIndicatorOptions(index) {
    var result = this._options;
    if (this._colorPalette) {
      result = _extend({}, result, {
        color: this._colorPalette[index]
      });
    }
    return result;
  },
  _generatePalette: function _generatePalette(count) {
    var that = this;
    var colors = null;
    if (that._palette) {
      that._palette.reset();
      colors = that._palette.generateColors(count, {
        repeat: true
      });
    }
    that._colorPalette = colors;
  },
  _adjustIndicatorsCount: function _adjustIndicatorsCount(count) {
    var that = this;
    var indicators = that._indicators;
    var i;
    var ii;
    var indicator;
    var indicatorsLen = indicators.length;
    if (indicatorsLen > count) {
      for (i = count, ii = indicatorsLen; i < ii; ++i) {
        indicators[i].clean().dispose();
      }
      that._indicators = indicators.slice(0, count);
      that._generatePalette(indicators.length);
    } else if (indicatorsLen < count) {
      that._generatePalette(count);
      for (i = indicatorsLen, ii = count; i < ii; ++i) {
        indicator = that._parameters.createIndicator(that.type, i);
        indicator.render(that._getIndicatorOptions(i)).resize(that._layout);
        indicators.push(indicator);
      }
    }
  },
  values: function values(arg, _noAnimation) {
    var that = this;
    if (!that.enabled) return;
    if (arg !== undefined) {
      if (!_isArray(arg)) {
        arg = _isFinite(arg) ? [Number(arg)] : null;
      }
      if (arg) {
        that._adjustIndicatorsCount(arg.length);
        that._indicators.forEach(function (indicator, i) {
          return indicator.value(arg[i], _noAnimation);
        });
      }
      return that;
    }
    return (0, _utils.map)(that._indicators, function (indicator) {
      return indicator.value();
    });
  }
};
function createIndicatorCreator(indicators) {
  return function (parameters, type, _strict) {
    var indicatorType = indicators[(0, _utils.normalizeEnum)(type)] || !_strict && indicators._default;
    return indicatorType ? new indicatorType(parameters) : null;
  };
}
