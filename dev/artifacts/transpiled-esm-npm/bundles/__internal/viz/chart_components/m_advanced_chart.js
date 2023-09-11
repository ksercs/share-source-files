"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedChart = void 0;
var _common = require("../../../core/utils/common");
var _extend2 = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _base_axis = require("../../../viz/axes/base_axis");
var _series_family = require("../../../viz/core/series_family");
var _utils = require("../../../viz/core/utils");
var _range_data_calculator = _interopRequireDefault(require("../../../viz/series/helpers/range_data_calculator"));
var _range = require("../../../viz/translators/range");
var _m_base_chart = require("./m_base_chart");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var isArray = Array.isArray;
var DEFAULT_AXIS_NAME = 'defaultAxisName';
var FONT = 'font';
var COMMON_AXIS_SETTINGS = 'commonAxisSettings';
var DEFAULT_PANE_NAME = 'default';
var VISUAL_RANGE = 'VISUAL_RANGE';
function prepareAxis(axisOptions) {
  if (isArray(axisOptions)) {
    return axisOptions.length === 0 ? [{}] : axisOptions;
  }
  return [axisOptions];
}
function processBubbleMargin(marginOptions, bubbleSize) {
  if (marginOptions.processBubbleSize) {
    marginOptions.size = bubbleSize;
  }
  return marginOptions;
}
function estimateBubbleSize(size, panesCount, maxSize, rotated) {
  var width = rotated ? size.width / panesCount : size.width;
  var height = rotated ? size.height : size.height / panesCount;
  return Math.min(width, height) * maxSize;
}
function setAxisVisualRangeByOption(arg, axis, isDirectOption, index) {
  var options;
  var visualRange;
  if (isDirectOption) {
    visualRange = arg.value;
    options = {
      skipEventRising: true
    };
    var wrappedVisualRange = wrapVisualRange(arg.fullName, visualRange);
    if (wrappedVisualRange) {
      options = {
        allowPartialUpdate: true
      };
      visualRange = wrappedVisualRange;
    }
  } else {
    visualRange = ((0, _type.isDefined)(index) ? arg.value[index] : arg.value).visualRange;
  }
  axis.visualRange(visualRange, options);
}
function getAxisTypes(groupsData, axis, isArgumentAxes) {
  if (isArgumentAxes) {
    return {
      argumentAxisType: groupsData.argumentAxisType,
      argumentType: groupsData.argumentType
    };
  }
  var _groupsData$groups$fi = groupsData.groups.find(function (g) {
      return g.valueAxis === axis;
    }),
    valueAxisType = _groupsData$groups$fi.valueAxisType,
    valueType = _groupsData$groups$fi.valueType;
  return {
    valueAxisType,
    valueType
  };
}
function wrapVisualRange(fullName, value) {
  var pathElements = fullName.split('.');
  var destElem = pathElements.at(-1);
  if (destElem === 'endValue' || destElem === 'startValue') {
    return {
      [destElem]: value
    };
  }
  return undefined;
}
var AdvancedChart = _m_base_chart.BaseChart.inherit({
  _fontFields: ["".concat(COMMON_AXIS_SETTINGS, ".label.").concat(FONT), "".concat(COMMON_AXIS_SETTINGS, ".title.").concat(FONT)],
  _partialOptionChangesMap: {
    visualRange: VISUAL_RANGE,
    _customVisualRange: VISUAL_RANGE,
    strips: 'REFRESH_AXES',
    constantLines: 'REFRESH_AXES'
  },
  _partialOptionChangesPath: {
    argumentAxis: ['strips', 'constantLines', 'visualRange', '_customVisualRange'],
    valueAxis: ['strips', 'constantLines', 'visualRange', '_customVisualRange']
  },
  _initCore() {
    this._panesClipRects = {};
    this.callBase();
  },
  _disposeCore() {
    var disposeObjectsInArray = this._disposeObjectsInArray;
    var panesClipRects = this._panesClipRects;
    this.callBase();
    disposeObjectsInArray.call(panesClipRects, 'fixed');
    disposeObjectsInArray.call(panesClipRects, 'base');
    disposeObjectsInArray.call(panesClipRects, 'wide');
    this._panesClipRects = null;
    this._labelsAxesGroup.linkOff();
    this._labelsAxesGroup.dispose();
    this._labelsAxesGroup = null;
  },
  _dispose() {
    var disposeObjectsInArray = this._disposeObjectsInArray;
    this.callBase();
    this.panes = null;
    if (this._legend) {
      this._legend.dispose();
      this._legend = null;
    }
    disposeObjectsInArray.call(this, 'panesBackground');
    disposeObjectsInArray.call(this, 'seriesFamilies');
    this._disposeAxes();
  },
  _createPanes() {
    this._cleanPanesClipRects('fixed');
    this._cleanPanesClipRects('base');
    this._cleanPanesClipRects('wide');
  },
  _cleanPanesClipRects(clipArrayName) {
    var clipArray = this._panesClipRects[clipArrayName];
    (clipArray || []).forEach(function (clipRect) {
      clipRect === null || clipRect === void 0 ? void 0 : clipRect.dispose();
    });
    this._panesClipRects[clipArrayName] = [];
  },
  _getElementsClipRectID(paneName) {
    var clipShape = this._panesClipRects.fixed[this._getPaneIndex(paneName)];
    return clipShape === null || clipShape === void 0 ? void 0 : clipShape.id;
  },
  _getPaneIndex(paneName) {
    var name = paneName || DEFAULT_PANE_NAME;
    return this.panes.findIndex(function (pane) {
      return pane.name === name;
    });
  },
  _updateSize() {
    this.callBase();
    (0, _utils.setCanvasValues)(this._canvas);
  },
  _reinitAxes() {
    this.panes = this._createPanes();
    this._populateAxes();
    this._axesReinitialized = true;
  },
  _populateAxes() {
    var _this = this;
    var panes = this.panes;
    var rotated = this._isRotated();
    var argumentAxesOptions = prepareAxis(this.option('argumentAxis') || {})[0];
    var valueAxisOption = this.option('valueAxis');
    var valueAxesOptions = prepareAxis(valueAxisOption || {});
    var argumentAxesPopulatedOptions = [];
    var valueAxesPopulatedOptions = [];
    var axisNames = [];
    var valueAxesCounter = 0;
    var paneWithNonVirtualAxis;
    var crosshairMargins = this._getCrosshairMargins();
    function getNextAxisName() {
      var name = DEFAULT_AXIS_NAME + String(valueAxesCounter);
      valueAxesCounter += 1;
      return name;
    }
    if (rotated) {
      paneWithNonVirtualAxis = argumentAxesOptions.position === 'right' ? panes[panes.length - 1].name : panes[0].name;
    } else {
      paneWithNonVirtualAxis = argumentAxesOptions.position === 'top' ? panes[0].name : panes[panes.length - 1].name;
    }
    argumentAxesPopulatedOptions = (0, _utils.map)(panes, function (pane) {
      var virtual = pane.name !== paneWithNonVirtualAxis;
      return _this._populateAxesOptions('argumentAxis', argumentAxesOptions, {
        pane: pane.name,
        name: null,
        optionPath: 'argumentAxis',
        crosshairMargin: rotated ? crosshairMargins.x : crosshairMargins.y
      }, rotated, virtual);
    });
    valueAxesOptions.forEach(function (axisOptions, priority) {
      var _a;
      var axisPanes = [];
      var name = axisOptions.name;
      if (name && axisNames.includes(name)) {
        _this._incidentOccurred('E2102');
        return;
      }
      if (name) {
        axisNames.push(name);
      }
      if (axisOptions.pane) {
        axisPanes.push(axisOptions.pane);
      }
      if ((_a = axisOptions.panes) === null || _a === void 0 ? void 0 : _a.length) {
        axisPanes = axisPanes.concat(axisOptions.panes.slice(0));
      }
      axisPanes = (0, _utils.unique)(axisPanes);
      if (!axisPanes.length) {
        axisPanes.push(undefined);
      }
      axisPanes.forEach(function (pane) {
        var optionPath = isArray(valueAxisOption) ? "valueAxis[".concat(String(priority), "]") : 'valueAxis';
        valueAxesPopulatedOptions.push(_this._populateAxesOptions('valueAxis', axisOptions, {
          name: name || getNextAxisName(),
          pane,
          priority,
          optionPath,
          crosshairMargin: rotated ? crosshairMargins.y : crosshairMargins.x
        }, rotated));
      });
    });
    this._redesignAxes(argumentAxesPopulatedOptions, true, paneWithNonVirtualAxis);
    this._redesignAxes(valueAxesPopulatedOptions, false);
  },
  _redesignAxes(options, isArgumentAxes, paneWithNonVirtualAxis) {
    var _this2 = this;
    var axesBasis = [];
    var axes = isArgumentAxes ? this._argumentAxes : this._valueAxes;
    options.forEach(function (opt) {
      var curAxes = axes === null || axes === void 0 ? void 0 : axes.filter(function (a) {
        return a.name === opt.name && (!(0, _type.isDefined)(opt.pane) && _this2.panes.some(function (p) {
          return p.name === a.pane;
        }) || a.pane === opt.pane);
      });
      if (curAxes === null || curAxes === void 0 ? void 0 : curAxes.length) {
        curAxes.forEach(function (axis) {
          var axisTypes = getAxisTypes(_this2._groupsData, axis, isArgumentAxes); // T891599
          axis.updateOptions(opt);
          if (isArgumentAxes) {
            axis.setTypes(axisTypes.argumentAxisType, axisTypes.argumentType, 'argumentType');
          } else {
            axis.setTypes(axisTypes.valueAxisType, axisTypes.valueType, 'valueType');
          }
          axis.validate();
          axesBasis.push({
            axis
          });
        });
      } else {
        axesBasis.push({
          options: opt
        });
      }
    });
    if (axes) {
      (0, _iterator.reverseEach)(axes, function (index, axis) {
        if (!axesBasis.some(function (basis) {
          return basis.axis && basis.axis === axis;
        })) {
          _this2._disposeAxis(index, isArgumentAxes);
        }
      });
    } else if (isArgumentAxes) {
      axes = this._argumentAxes = [];
    } else {
      axes = this._valueAxes = [];
    }
    axesBasis.forEach(function (basis) {
      var axis = basis.axis;
      if (basis.axis && isArgumentAxes) {
        basis.axis.isVirtual = basis.axis.pane !== paneWithNonVirtualAxis;
      } else if (basis.options) {
        axis = _this2._createAxis(isArgumentAxes, basis.options, isArgumentAxes ? basis.options.pane !== paneWithNonVirtualAxis : undefined);
        axes.push(axis);
      }
      axis.applyVisualRangeSetter(_this2._getVisualRangeSetter());
    });
  },
  _disposeAxis(index, isArgumentAxis) {
    var axes = isArgumentAxis ? this._argumentAxes : this._valueAxes;
    var axis = axes[index];
    if (!axis) return;
    axis.dispose();
    axes.splice(index, 1);
  },
  _disposeAxes() {
    var disposeObjectsInArray = this._disposeObjectsInArray;
    disposeObjectsInArray.call(this, '_argumentAxes');
    disposeObjectsInArray.call(this, '_valueAxes');
  },
  _appendAdditionalSeriesGroups() {
    this._crosshairCursorGroup.linkAppend();
    // this._legendGroup.linkAppend();
    if (this._scrollBar) {
      // TODO: Must be appended in the same place where removed (chart)
      this._scrollBarGroup.linkAppend();
    }
  },
  _getLegendTargets() {
    var _this3 = this;
    return (this.series || []).map(function (s) {
      var item = _this3._getLegendOptions(s);
      item.legendData.series = s;
      if (!s.getOptions().showInLegend) {
        item.legendData.visible = false;
      }
      return item;
    });
  },
  _legendItemTextField: 'name',
  _seriesPopulatedHandlerCore() {
    this._processSeriesFamilies();
    this._processValueAxisFormat();
  },
  _renderTrackers() {
    for (var i = 0; i < this.series.length; i += 1) {
      this.series[i].drawTrackers();
    }
    // TODO we don't need it
    // if (that._legend) {
    //    legendHasInsidePosition && that._legendGroup.append(that._renderer.root);
    // }
  },

  _specialProcessSeries() {
    this._processSeriesFamilies();
  },
  _processSeriesFamilies() {
    var _this4 = this;
    var _a;
    var types = [];
    var families = [];
    var paneSeries;
    var themeManager = this._themeManager;
    var negativesAsZeroes = themeManager.getOptions('negativesAsZeroes');
    var negativesAsZeros = themeManager.getOptions('negativesAsZeros'); // misspelling case
    var familyOptions = {
      minBubbleSize: themeManager.getOptions('minBubbleSize'),
      maxBubbleSize: themeManager.getOptions('maxBubbleSize'),
      barGroupPadding: themeManager.getOptions('barGroupPadding'),
      barGroupWidth: themeManager.getOptions('barGroupWidth'),
      negativesAsZeroes: (0, _type.isDefined)(negativesAsZeroes) ? negativesAsZeroes : negativesAsZeros
    };
    if ((_a = this.seriesFamilies) === null || _a === void 0 ? void 0 : _a.length) {
      this.seriesFamilies.forEach(function (family) {
        family.updateOptions(familyOptions);
        family.adjustSeriesValues();
      });
      return;
    }
    this.series.forEach(function (item) {
      if (!types.includes(item.type)) {
        types.push(item.type);
      }
    });
    this._getLayoutTargets().forEach(function (pane) {
      paneSeries = _this4._getSeriesForPane(pane.name);
      types.forEach(function (type) {
        var family = new _series_family.SeriesFamily({
          type,
          pane: pane.name,
          minBubbleSize: familyOptions.minBubbleSize,
          maxBubbleSize: familyOptions.maxBubbleSize,
          barGroupPadding: familyOptions.barGroupPadding,
          barGroupWidth: familyOptions.barGroupWidth,
          negativesAsZeroes: familyOptions.negativesAsZeroes,
          rotated: _this4._isRotated()
        });
        family.add(paneSeries);
        family.adjustSeriesValues();
        families.push(family);
      });
    });
    this.seriesFamilies = families;
  },
  _updateSeriesDimensions() {
    var seriesFamilies = this.seriesFamilies || [];
    for (var i = 0; i < seriesFamilies.length; i += 1) {
      var family = seriesFamilies[i];
      family.updateSeriesValues();
      family.adjustSeriesDimensions();
    }
  },
  _getLegendCallBack(series) {
    var _a;
    return (_a = this._legend) === null || _a === void 0 ? void 0 : _a.getActionCallback(series);
  },
  _appendAxesGroups() {
    this._stripsGroup.linkAppend();
    this._gridGroup.linkAppend();
    this._axesGroup.linkAppend();
    this._labelsAxesGroup.linkAppend();
    this._constantLinesGroup.linkAppend();
    this._stripLabelAxesGroup.linkAppend();
    this._scaleBreaksGroup.linkAppend();
  },
  _populateMarginOptions() {
    var _this5 = this;
    var bubbleSize = estimateBubbleSize(this.getSize(), this.panes.length, this._themeManager.getOptions('maxBubbleSize'), this._isRotated());
    var argumentMarginOptions = {};
    this._valueAxes.forEach(function (valueAxis) {
      var groupSeries = _this5.series.filter(function (series) {
        return series.getValueAxis() === valueAxis;
      });
      var marginOptions = {};
      groupSeries.forEach(function (series) {
        if (series.isVisible()) {
          var seriesMarginOptions = processBubbleMargin(series.getMarginOptions(), bubbleSize);
          marginOptions = (0, _utils.mergeMarginOptions)(marginOptions, seriesMarginOptions);
          argumentMarginOptions = (0, _utils.mergeMarginOptions)(argumentMarginOptions, seriesMarginOptions);
        }
      });
      valueAxis.setMarginOptions(marginOptions);
    });
    this._argumentAxes.forEach(function (a) {
      return a.setMarginOptions(argumentMarginOptions);
    });
  },
  _populateBusinessRange(updatedAxis, keepRange) {
    var _this6 = this;
    var rotated = this._isRotated();
    var series = this._getVisibleSeries();
    var argRanges = {};
    var commonArgRange = new _range.Range({
      rotated: !!rotated
    });
    var getPaneName = function getPaneName(axis) {
      return axis.pane || DEFAULT_PANE_NAME;
    };
    this.panes.forEach(function (p) {
      argRanges[p.name] = new _range.Range({
        rotated: !!rotated
      });
    });
    this._valueAxes.forEach(function (valueAxis) {
      var groupRange = new _range.Range({
        rotated: !!rotated,
        pane: valueAxis.pane,
        axis: valueAxis.name
      });
      var groupSeries = series.filter(function (series) {
        return series.getValueAxis() === valueAxis;
      });
      groupSeries.forEach(function (series) {
        var seriesRange = series.getRangeData();
        groupRange.addRange(seriesRange.val);
        argRanges[getPaneName(valueAxis)].addRange(seriesRange.arg);
      });
      if (!updatedAxis || updatedAxis && groupSeries.length && valueAxis === updatedAxis) {
        valueAxis.setGroupSeries(groupSeries);
        valueAxis.setBusinessRange(groupRange, _this6._axesReinitialized || keepRange, _this6._argumentAxes[0]._lastVisualRangeUpdateMode);
      }
    });
    if (!updatedAxis || updatedAxis && series.length) {
      Object.keys(argRanges).forEach(function (p) {
        return commonArgRange.addRange(argRanges[p]);
      });
      var commonInterval = commonArgRange.interval;
      this._argumentAxes.forEach(function (a) {
        var _a;
        var currentInterval = (_a = argRanges[getPaneName(a)].interval) !== null && _a !== void 0 ? _a : commonInterval; // T956425
        a.setBusinessRange(new _range.Range(_extends(_extends({}, commonArgRange), {
          interval: currentInterval
        })), _this6._axesReinitialized, undefined, _this6._groupsData.categories);
      });
    }
    this._populateMarginOptions();
  },
  getArgumentAxis() {
    return (this._argumentAxes || []).find(function (a) {
      return !a.isVirtual;
    });
  },
  getValueAxis(name) {
    var _this7 = this;
    return (this._valueAxes || []).find((0, _type.isDefined)(name) ? function (a) {
      return a.name === name;
    } : function (a) {
      return a.pane === _this7.defaultPane;
    });
  },
  _getGroupsData() {
    var _this8 = this;
    var groups = [];
    this._valueAxes.forEach(function (axis) {
      groups.push({
        series: _this8.series.filter(function (series) {
          return series.getValueAxis() === axis;
        }),
        valueAxis: axis,
        valueOptions: axis.getOptions()
      });
    });
    return {
      groups,
      argumentAxes: this._argumentAxes,
      argumentOptions: this._argumentAxes[0].getOptions()
    };
  },
  _groupSeries() {
    this._correctValueAxes(false);
    this._groupsData = this._getGroupsData();
  },
  _processValueAxisFormat() {
    var axesWithFullStackedFormat = [];
    this.series.forEach(function (series) {
      var axis = series.getValueAxis();
      if (series.isFullStackedSeries()) {
        axis.setPercentLabelFormat();
        axesWithFullStackedFormat.push(axis);
      }
    });
    this._valueAxes.forEach(function (axis) {
      if (!axesWithFullStackedFormat.includes(axis)) {
        axis.resetAutoLabelFormat(); // B239299
      }
    });
  },

  _populateAxesOptions(typeSelector, userOptions, axisOptions, rotated, virtual) {
    var preparedUserOptions = this._prepareStripsAndConstantLines(typeSelector, userOptions, rotated);
    var options = (0, _extend2.extend)(true, {}, preparedUserOptions, axisOptions, this._prepareAxisOptions(typeSelector, preparedUserOptions, rotated));
    if (virtual) {
      options.visible = false;
      options.tick.visible = false;
      options.minorTick.visible = false;
      options.label.visible = false;
      options.title = {};
    }
    return options;
  },
  _getValFilter(series) {
    return _range_data_calculator.default.getViewPortFilter(series.getValueAxis().visualRange() || {});
  },
  _createAxis(isArgumentAxes, options, virtual) {
    var _this9 = this;
    var typeSelector = isArgumentAxes ? 'argumentAxis' : 'valueAxis';
    var renderingSettings = (0, _extend2.extend)({
      renderer: this._renderer,
      incidentOccurred: this._incidentOccurred,
      eventTrigger: this._eventTrigger,
      axisClass: isArgumentAxes ? 'arg' : 'val',
      widgetClass: 'dxc',
      stripsGroup: this._stripsGroup,
      stripLabelAxesGroup: this._stripLabelAxesGroup,
      constantLinesGroup: this._constantLinesGroup,
      scaleBreaksGroup: this._scaleBreaksGroup,
      axesContainerGroup: this._axesGroup,
      labelsAxesGroup: this._labelsAxesGroup,
      gridGroup: this._gridGroup,
      isArgumentAxis: isArgumentAxes,
      getTemplate: function getTemplate(template) {
        return _this9._getTemplate(template);
      }
    }, this._getAxisRenderingOptions(typeSelector));
    var axis = new _base_axis.Axis(renderingSettings);
    axis.updateOptions(options);
    axis.isVirtual = virtual;
    return axis;
  },
  _applyVisualRangeByVirtualAxes() {
    return false;
  },
  _applyCustomVisualRangeOption(axis, range) {
    if (axis.getOptions().optionPath) {
      this._parseVisualRangeOption("".concat(axis.getOptions().optionPath, ".visualRange"), range);
    }
  },
  _getVisualRangeSetter() {
    var _this10 = this;
    return function (axis, _ref) {
      var skipEventRising = _ref.skipEventRising,
        range = _ref.range;
      _this10._applyCustomVisualRangeOption(axis, range);
      axis.setCustomVisualRange(range);
      axis.skipEventRising = skipEventRising;
      if (!_this10._applyVisualRangeByVirtualAxes(axis, range)) {
        if (_this10._applyingChanges) {
          _this10._change_VISUAL_RANGE();
        } else {
          _this10._requestChange([VISUAL_RANGE]);
        }
      }
    };
  },
  _getTrackerSettings() {
    return (0, _extend2.extend)(this.callBase(), {
      argumentAxis: this.getArgumentAxis()
    });
  },
  _prepareStripsAndConstantLines(typeSelector, userOptions, rotated) {
    userOptions = this._themeManager.getOptions(typeSelector, userOptions, rotated);
    if (userOptions.strips) {
      userOptions.strips.forEach(function (line, i) {
        userOptions.strips[i] = (0, _extend2.extend)(true, {}, userOptions.stripStyle, line);
      });
    }
    if (userOptions.constantLines) {
      userOptions.constantLines.forEach(function (line, i) {
        userOptions.constantLines[i] = (0, _extend2.extend)(true, {}, userOptions.constantLineStyle, line);
      });
    }
    return userOptions;
  },
  refresh() {
    this._disposeAxes();
    this.callBase();
  },
  _layoutAxes(drawAxes) {
    drawAxes();
    var needSpace = this.checkForMoreSpaceForPanesCanvas();
    if (needSpace) {
      var rect = this._rect.slice();
      var size = this._layout.backward(rect, rect, [needSpace.width, needSpace.height]);
      needSpace.width = Math.max(0, size[0]);
      needSpace.height = Math.max(0, size[1]);
      this._canvas = this._createCanvasFromRect(rect);
      drawAxes(needSpace);
    }
  },
  checkForMoreSpaceForPanesCanvas() {
    return this.layoutManager.needMoreSpaceForPanesCanvas(this._getLayoutTargets(), this._isRotated());
  },
  _parseVisualRangeOption(fullName, value) {
    var _this11 = this;
    var _a;
    var name = fullName.split(/[.[]/)[0];
    var index = fullName.match(/\d+/g);
    index = (0, _type.isDefined)(index) ? parseInt(index[0], 10) : index;
    if (fullName.indexOf('visualRange') > 0) {
      if ((0, _type.type)(value) !== 'object') {
        value = (_a = wrapVisualRange(fullName, value)) !== null && _a !== void 0 ? _a : value;
      }
      this._setCustomVisualRange(name, index, value);
    } else if (((0, _type.type)(value) === 'object' || isArray(value)) && name.indexOf('Axis') > 0 && JSON.stringify(value).indexOf('visualRange') > 0) {
      if ((0, _type.isDefined)(value.visualRange)) {
        this._setCustomVisualRange(name, index, value.visualRange);
      } else if (isArray(value)) {
        value.forEach(function (a, i) {
          if ((0, _type.isDefined)(a.visualRange)) {
            _this11._setCustomVisualRange(name, i, a.visualRange);
          }
        });
      }
    }
  },
  _setCustomVisualRange(axesName, index, value) {
    var options = this._options.silent(axesName);
    if (!options) {
      return;
    }
    if (!(0, _type.isDefined)(index)) {
      options._customVisualRange = value;
    } else {
      options[index]._customVisualRange = value;
    }
    this._axesReinitialized = true;
  },
  _raiseZoomEndHandlers() {
    this._valueAxes.forEach(function (axis) {
      return axis.handleZoomEnd();
    });
  },
  _setOptionsByReference() {
    this.callBase();
    (0, _extend2.extend)(this._optionsByReference, {
      'valueAxis.visualRange': true
    });
  },
  _notifyOptionChanged(option, value) {
    this.callBase.apply(this, arguments);
    if (!this._optionChangedLocker) {
      this._parseVisualRangeOption(option, value);
    }
  },
  _notifyVisualRange() {
    var _this12 = this;
    this._valueAxes.forEach(function (axis) {
      var axisPath = axis.getOptions().optionPath;
      if (axisPath) {
        var path = "".concat(axisPath, ".visualRange");
        var visualRange = (0, _utils.convertVisualRangeObject)(axis.visualRange(), !isArray(_this12.option(path)));
        if (!axis.skipEventRising || !(0, _utils.rangesAreEqual)(visualRange, _this12.option(path))) {
          if (!_this12.option(axisPath) && axisPath !== 'valueAxis') {
            _this12.option(axisPath, {
              name: axis.name,
              visualRange
            });
          } else {
            _this12.option(path, visualRange);
          }
        } else {
          axis.skipEventRising = null;
        }
      }
    });
  },
  _notify() {
    this.callBase();
    this._axesReinitialized = false;
    if (this.option('disableTwoWayBinding') !== true) {
      // for dashboards T732396
      this.skipOptionsRollBack = true; // T1037806
      this._notifyVisualRange();
      this.skipOptionsRollBack = false;
    }
  },
  _getAxesForScaling() {
    return this._valueAxes;
  },
  _getAxesByOptionPath(arg, isDirectOption, optionName) {
    var sourceAxes = this._getAxesForScaling();
    var axes = [];
    if (isDirectOption) {
      var axisPath;
      if (arg.fullName) {
        axisPath = arg.fullName.slice(0, arg.fullName.indexOf('.'));
      }
      axes = sourceAxes.filter(function (a) {
        return a.getOptions().optionPath === axisPath;
      });
    } else if ((0, _type.type)(arg.value) === 'object') {
      axes = sourceAxes.filter(function (a) {
        return a.getOptions().optionPath === arg.name;
      });
    } else if (isArray(arg.value)) {
      arg.value.forEach(function (v, index) {
        var axis = sourceAxes.filter(function (a) {
          return a.getOptions().optionPath === "".concat(arg.name, "[").concat(index, "]");
        })[0];
        if ((0, _type.isDefined)(v[optionName]) && (0, _type.isDefined)(axis)) {
          axes[index] = axis;
        }
      });
    }
    return axes;
  },
  _optionChanged(arg) {
    if (!this._optionChangedLocker) {
      var optionName = 'visualRange';
      var axes;
      var isDirectOption = arg.fullName.indexOf(optionName) > 0 ? true : this.getPartialChangeOptionsName(arg).indexOf(optionName) > -1 ? false : undefined;
      if ((0, _type.isDefined)(isDirectOption)) {
        axes = this._getAxesByOptionPath(arg, isDirectOption, optionName);
        if (axes) {
          if (axes.length > 1 || isArray(arg.value)) {
            axes.forEach(function (a, index) {
              return setAxisVisualRangeByOption(arg, a, isDirectOption, index);
            });
          } else if (axes.length === 1) {
            setAxisVisualRangeByOption(arg, axes[0], isDirectOption);
          }
        }
      }
    }
    this.callBase(arg);
  },
  _change_VISUAL_RANGE() {
    this._recreateSizeDependentObjects(false);
    if (!this._changes.has('FULL_RENDER')) {
      var resizePanesOnZoom = this.option('resizePanesOnZoom');
      this._doRender({
        force: true,
        drawTitle: false,
        drawLegend: false,
        adjustAxes: resizePanesOnZoom !== null && resizePanesOnZoom !== void 0 ? resizePanesOnZoom : this.option('adjustAxesOnZoom') || false,
        animate: false
      });
      this._raiseZoomEndHandlers();
    }
  },
  // API
  resetVisualRange() {
    var _this13 = this;
    this._valueAxes.forEach(function (axis) {
      axis.resetVisualRange(false); // T602156
      _this13._applyCustomVisualRangeOption(axis);
    });
    this._requestChange([VISUAL_RANGE]);
  },
  _getCrosshairMargins() {
    return {
      x: 0,
      y: 0
    };
  },
  _legendDataField: 'series',
  _adjustSeriesLabels: _common.noop,
  _correctValueAxes: _common.noop
});
exports.AdvancedChart = AdvancedChart;