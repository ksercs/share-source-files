/**
* DevExtreme (bundles/__internal/viz/m_pie_chart.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _common = require("../../core/utils/common");
var _extend2 = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _consts = _interopRequireDefault(require("../../viz/components/consts"));
var _annotations = require("../../viz/core/annotations");
var _center_template = require("../../viz/core/center_template");
var _utils = require("../../viz/core/utils");
var _range = require("../../viz/translators/range");
var _translator1d = require("../../viz/translators/translator1d");
var _m_base_chart = require("./chart_components/m_base_chart");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var states = _consts.default.states;
var seriesSpacing = _consts.default.pieSeriesSpacing;
var OPTIONS_FOR_REFRESH_SERIES = ['startAngle', 'innerRadius', 'segmentsDirection', 'type'];
var NORMAL_STATE = states.normalMark;
var HOVER_STATE = states.hoverMark;
var SELECTED_STATE = states.selectedMark;
var MAX_RESOLVE_ITERATION_COUNT = 5;
var LEGEND_ACTIONS = [states.resetItem, states.applyHover, states.applySelected, states.applySelected];
function shiftInColumnFunction(box, length) {
  return {
    x: box.x,
    y: box.y - length
  };
}
function dividePoints(series, points) {
  return series.getVisiblePoints().reduce(function (r, point) {
    var angle = (0, _utils.normalizeAngle)(point.middleAngle);
    (angle <= 90 || angle >= 270 ? r.right : r.left).push(point);
    return r;
  }, points || {
    left: [],
    right: []
  });
}
function resolveOverlappedLabels(points, shiftCallback, inverseDirection, canvas) {
  var overlapped = false;
  if (inverseDirection) {
    points.left.reverse();
    points.right.reverse();
  }
  overlapped = _m_base_chart.overlapping.resolveLabelOverlappingInOneDirection(points.left, canvas, false, false, shiftCallback);
  return _m_base_chart.overlapping.resolveLabelOverlappingInOneDirection(points.right, canvas, false, false, shiftCallback) || overlapped;
}
function getLegendItemAction(points) {
  var state = NORMAL_STATE;
  points.forEach(function (point) {
    var _a;
    var seriesOptions = (_a = point.series) === null || _a === void 0 ? void 0 : _a.getOptions();
    var pointState = point.fullState;
    if ((seriesOptions === null || seriesOptions === void 0 ? void 0 : seriesOptions.hoverMode) === 'none') {
      pointState &= ~HOVER_STATE;
    }
    if ((seriesOptions === null || seriesOptions === void 0 ? void 0 : seriesOptions.selectionMode) === 'none') {
      pointState &= ~SELECTED_STATE;
    }
    state |= pointState;
  });
  return LEGEND_ACTIONS[state];
}
function correctPercentValue(value) {
  if ((0, _type.isNumeric)(value)) {
    if (value > 1) {
      value = 1;
    } else if (value < 0) {
      value = 0;
    }
  } else {
    value = undefined;
  }
  return value;
}
var pieSizeEqualizer = function () {
  function equalize(group, allPies) {
    var pies = allPies.filter(function (p) {
      return p._isVisible() && p.getSizeGroup() === group;
    });
    var minRadius = Math.min.apply(null, pies.map(function (p) {
      return p.getSizeGroupLayout().radius;
    }));
    var minPie = pies.filter(function (p) {
      return p.getSizeGroupLayout().radius === minRadius;
    });
    pies.forEach(function (p) {
      return p.render({
        force: true,
        sizeGroupLayout: minPie.length ? minPie[0].getSizeGroupLayout() : {}
      });
    });
  }
  function removeFromList(list, item) {
    return list.filter(function (li) {
      return li !== item;
    });
  }
  function addToList(list, item) {
    return removeFromList(list, item).concat(item);
  }
  var pies = [];
  var timers = {};
  return {
    queue(pie) {
      var group = pie.getSizeGroup();
      pies = addToList(pies, pie);
      clearTimeout(timers[group]);
      timers[group] = setTimeout(function () {
        equalize(group, pies);
      });
    },
    remove(pie) {
      pies = removeFromList(pies, pie);
      if (!pies.length) {
        timers = {};
      }
    }
  };
}();
var dxPieChart = _m_base_chart.BaseChart.inherit({
  _themeSection: 'pie',
  _layoutManagerOptions() {
    return (0, _extend2.extend)(true, {}, this.callBase(), {
      piePercentage: correctPercentValue(this._themeManager.getOptions('diameter')),
      minPiePercentage: correctPercentValue(this._themeManager.getOptions('minDiameter'))
    });
  },
  _optionChangesMap: {
    diameter: 'REINIT',
    minDiameter: 'REINIT',
    sizeGroup: 'REINIT'
  },
  _disposeCore() {
    pieSizeEqualizer.remove(this);
    this.callBase();
  },
  _groupSeries() {
    var _a;
    var series = this.series;
    this._groupsData = {
      groups: [{
        series,
        valueOptions: {
          valueType: 'numeric'
        }
      }],
      argumentOptions: (_a = series[0]) === null || _a === void 0 ? void 0 : _a.getOptions()
    };
  },
  getArgumentAxis() {
    return null;
  },
  _getValueAxis() {
    var translator = new _translator1d.Translator1D().setCodomain(360, 0);
    return {
      getTranslator() {
        return translator;
      },
      setBusinessRange(range) {
        translator.setDomain(range.min, range.max);
      }
    };
  },
  _populateBusinessRange() {
    this.series.map(function (series) {
      var range = new _range.Range();
      range.addRange(series.getRangeData().val);
      series.getValueAxis().setBusinessRange(range);
      return range;
    });
  },
  _specialProcessSeries() {
    (0, _iterator.each)(this.series, function (_, singleSeries) {
      singleSeries.arrangePoints();
    });
  },
  _checkPaneName() {
    return true;
  },
  _processSingleSeries(singleSeries) {
    this.callBase(singleSeries);
    singleSeries.arrangePoints();
  },
  _handleSeriesDataUpdated() {
    var maxPointCount = 0;
    this.series.forEach(function (s) {
      maxPointCount = Math.max(s.getPointsCount(), maxPointCount);
    });
    this.series.forEach(function (s) {
      s.setMaxPointsCount(maxPointCount);
    });
    this.callBase();
  },
  _getLegendOptions(item) {
    var legendItem = this.callBase(item);
    var legendData = legendItem.legendData;
    legendData.argument = item.argument;
    legendData.argumentIndex = item.argumentIndex;
    legendData.points = [item];
    return legendItem;
  },
  _getLegendTargets() {
    var _this = this;
    var itemsByArgument = {};
    (this.series || []).forEach(function (series) {
      series.getPoints().forEach(function (point) {
        var argument = point.argument.valueOf();
        var index = series.getPointsByArg(argument).indexOf(point);
        var key = argument.valueOf().toString() + index;
        itemsByArgument[key] = itemsByArgument[key] || [];
        var argumentCount = itemsByArgument[key].push(point);
        point.index = itemsByArgument[key][argumentCount - 2] ? itemsByArgument[key][argumentCount - 2].index : Object.keys(itemsByArgument).length - 1;
        point.argumentIndex = index;
      });
    });
    var items = [];
    (0, _iterator.each)(itemsByArgument, function (_, points) {
      points.forEach(function (point, index) {
        if (index === 0) {
          items.push(_this._getLegendOptions(point));
          return;
        }
        var item = items[items.length - 1];
        item.legendData.points.push(point);
        if (!item.visible) {
          item.visible = point.isVisible();
        }
      });
    });
    return items;
  },
  _getLayoutTargets() {
    return [{
      canvas: this._canvas
    }];
  },
  _getLayoutSeries(series, drawOptions) {
    var layout;
    var canvas = this._canvas;
    var drawnLabels = false;
    layout = this.layoutManager.applyPieChartSeriesLayout(canvas, series, true);
    series.forEach(function (singleSeries) {
      singleSeries.correctPosition(layout, canvas);
      drawnLabels = singleSeries.drawLabelsWOPoints() || drawnLabels;
    });
    if (drawnLabels) {
      layout = this.layoutManager.applyPieChartSeriesLayout(canvas, series, drawOptions.hideLayoutLabels);
    }
    series.forEach(function (singleSeries) {
      singleSeries.hideLabels();
    });
    this._sizeGroupLayout = {
      x: layout.centerX,
      y: layout.centerY,
      radius: layout.radiusOuter,
      drawOptions
    };
    return layout;
  },
  _getLayoutSeriesForEqualPies(series, sizeGroupLayout) {
    var canvas = this._canvas;
    var layout = this.layoutManager.applyEqualPieChartLayout(series, sizeGroupLayout);
    series.forEach(function (s) {
      s.correctPosition(layout, canvas);
      s.drawLabelsWOPoints();
    });
    this.layoutManager.correctPieLabelRadius(series, layout, canvas);
    return layout;
  },
  _updateSeriesDimensions(drawOptions) {
    var visibleSeries = this._getVisibleSeries();
    var lengthVisibleSeries = visibleSeries.length;
    var innerRad;
    var delta;
    var layout;
    var sizeGroupLayout = drawOptions.sizeGroupLayout;
    if (lengthVisibleSeries) {
      layout = sizeGroupLayout ? this._getLayoutSeriesForEqualPies(visibleSeries, sizeGroupLayout) : this._getLayoutSeries(visibleSeries, drawOptions);
      delta = (layout.radiusOuter - layout.radiusInner - seriesSpacing * (lengthVisibleSeries - 1)) / lengthVisibleSeries;
      innerRad = layout.radiusInner;
      this._setGeometry(layout);
      visibleSeries.forEach(function (singleSeries) {
        singleSeries.correctRadius({
          radiusInner: innerRad,
          radiusOuter: innerRad + delta
        });
        innerRad += delta + seriesSpacing;
      });
    }
  },
  _renderSeries(drawOptions, isRotated, isLegendInside) {
    this._calculateSeriesLayout(drawOptions, isRotated);
    if (!drawOptions.sizeGroupLayout && this.getSizeGroup()) {
      pieSizeEqualizer.queue(this);
      this._clearCanvas();
      return;
    }
    this._renderSeriesElements(drawOptions, isLegendInside);
  },
  _getCenter() {
    return this._center;
  },
  getInnerRadius() {
    return this._innerRadius;
  },
  _getLegendCallBack() {
    var _this2 = this;
    var legend = this._legend;
    var items = this._getLegendTargets().map(function (i) {
      return i.legendData;
    });
    return function (target) {
      items.forEach(function (data) {
        var points = [];
        var callback = legend.getActionCallback({
          index: data.id
        });
        _this2.series.forEach(function (series) {
          var seriesPoints = series.getPointsByKeys(data.argument, data.argumentIndex);
          points.push.apply(points, seriesPoints);
        });
        if (target && target.argument === data.argument && target.argumentIndex === data.argumentIndex) {
          points.push(target);
        }
        callback(getLegendItemAction(points));
      });
    };
  },
  _locateLabels(resolveLabelOverlapping) {
    var iterationCount = 0;
    var labelsWereOverlapped;
    var wordWrapApplied;
    do {
      wordWrapApplied = this._adjustSeriesLabels(resolveLabelOverlapping === 'shift');
      labelsWereOverlapped = this._resolveLabelOverlapping(resolveLabelOverlapping);
    } while ((labelsWereOverlapped || wordWrapApplied) && ++iterationCount < MAX_RESOLVE_ITERATION_COUNT);
  },
  _adjustSeriesLabels(moveLabelsFromCenter) {
    return this.series.reduce(function (r, s) {
      return s.adjustLabels(moveLabelsFromCenter) || r;
    }, false);
  },
  _applyExtraSettings: _common.noop,
  _resolveLabelOverlappingShift() {
    var _this3 = this;
    var inverseDirection = this.option('segmentsDirection') === 'anticlockwise';
    var seriesByPosition = this.series.reduce(function (r, s) {
      (r[s.getOptions().label.position] || r.outside).push(s);
      return r;
    }, {
      inside: [],
      columns: [],
      outside: []
    });
    var labelsOverlapped = false;
    var shiftFunction = function shiftFunction(box, length) {
      return (0, _utils.getVerticallyShiftedAngularCoords)(box, -length, _this3._center);
    };
    if (seriesByPosition.inside.length > 0) {
      var pointsToResolve = seriesByPosition.inside.reduce(function (r, singleSeries) {
        var visiblePoints = singleSeries.getVisiblePoints();
        return visiblePoints.reduce(function (r, point) {
          r.left.push(point);
          return r;
        }, r);
      }, {
        left: [],
        right: []
      });
      labelsOverlapped = resolveOverlappedLabels(pointsToResolve, shiftInColumnFunction, inverseDirection, this._canvas) || labelsOverlapped;
    }
    labelsOverlapped = seriesByPosition.columns.reduce(function (r, singleSeries) {
      return resolveOverlappedLabels(dividePoints(singleSeries), shiftInColumnFunction, inverseDirection, _this3._canvas) || r;
    }, labelsOverlapped);
    if (seriesByPosition.outside.length > 0) {
      labelsOverlapped = resolveOverlappedLabels(seriesByPosition.outside.reduce(function (r, singleSeries) {
        return dividePoints(singleSeries, r);
      }, null), shiftFunction, inverseDirection, this._canvas) || labelsOverlapped;
    }
    return labelsOverlapped;
  },
  _setGeometry(_ref) {
    var x = _ref.centerX,
      y = _ref.centerY,
      radiusInner = _ref.radiusInner;
    this._center = {
      x,
      y
    };
    this._innerRadius = radiusInner;
  },
  _disposeSeries() {
    this.callBase.apply(this, arguments);
    this._abstractSeries = null;
  },
  _legendDataField: 'point',
  _legendItemTextField: 'argument',
  _applyPointMarkersAutoHiding: _common.noop,
  _renderTrackers: _common.noop,
  _trackerType: 'PieTracker',
  _createScrollBar: _common.noop,
  _updateAxesLayout: _common.noop,
  _applyClipRects: _common.noop,
  _appendAdditionalSeriesGroups: _common.noop,
  _prepareToRender: _common.noop,
  _isLegendInside: _common.noop,
  _renderAxes: _common.noop,
  _shrinkAxes: _common.noop,
  _isRotated: _common.noop,
  _seriesPopulatedHandlerCore: _common.noop,
  _reinitAxes: _common.noop,
  _correctAxes: _common.noop,
  _getExtraOptions() {
    return {
      startAngle: this.option('startAngle'),
      innerRadius: this.option('innerRadius'),
      segmentsDirection: this.option('segmentsDirection'),
      type: this.option('type')
    };
  },
  getSizeGroup() {
    return this._themeManager.getOptions('sizeGroup');
  },
  getSizeGroupLayout() {
    return this._sizeGroupLayout || {};
  }
});
(0, _iterator.each)(OPTIONS_FOR_REFRESH_SERIES, function (_, name) {
  dxPieChart.prototype._optionChangesMap[name] = 'REFRESH_SERIES_DATA_INIT';
});
dxPieChart.addPlugin(_center_template.plugins.pieChart);
dxPieChart.addPlugin(_annotations.plugins.core);
dxPieChart.addPlugin(_annotations.plugins.pieChart);
(0, _component_registrator.default)('dxPieChart', dxPieChart);
var _default = dxPieChart;
exports.default = _default;
