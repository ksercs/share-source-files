/**
* DevExtreme (bundles/__internal/viz/m_chart.js)
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
var _math = require("../../core/utils/math");
var _size = require("../../core/utils/size");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _crosshair = require("../../viz/chart_components/crosshair");
var _layout_manager = require("../../viz/chart_components/layout_manager");
var _multi_axes_synchronizer = _interopRequireDefault(require("../../viz/chart_components/multi_axes_synchronizer"));
var _scroll_bar = require("../../viz/chart_components/scroll_bar");
var _shutter_zoom = _interopRequireDefault(require("../../viz/chart_components/shutter_zoom"));
var _zoom_and_pan = _interopRequireDefault(require("../../viz/chart_components/zoom_and_pan"));
var _annotations = require("../../viz/core/annotations");
var _utils = require("../../viz/core/utils");
var _range_data_calculator = _interopRequireDefault(require("../../viz/series/helpers/range_data_calculator"));
var _range = require("../../viz/translators/range");
var _utils2 = require("../../viz/utils");
var _m_advanced_chart = require("./chart_components/m_advanced_chart");
var _m_base_chart = require("./chart_components/m_base_chart");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } // @ts-expect-error
var DEFAULT_PANE_NAME = 'default';
var VISUAL_RANGE = 'VISUAL_RANGE';
var DEFAULT_PANES = [{
  name: DEFAULT_PANE_NAME,
  border: {}
}];
var DISCRETE = 'discrete';
var isArray = Array.isArray;
function getFirstAxisNameForPane(axes, paneName, defaultPane) {
  var result;
  for (var i = 0; i < axes.length; i += 1) {
    if (axes[i].pane === paneName || axes[i].pane === undefined && paneName === defaultPane) {
      result = axes[i].name;
      break;
    }
  }
  if (!result) {
    result = axes[0].name;
  }
  return result;
}
function changeVisibilityAxisGrids(axis, gridVisibility, minorGridVisibility) {
  var gridOpt = axis.getOptions().grid;
  var minorGridOpt = axis.getOptions().minorGrid;
  gridOpt.visible = gridVisibility;
  minorGridOpt && (minorGridOpt.visible = minorGridVisibility);
}
function hideGridsOnNonFirstValueAxisForPane(axesForPane) {
  var axisShown = false;
  var hiddenStubAxis = [];
  var minorGridVisibility = axesForPane.some(function (axis) {
    var minorGridOptions = axis.getOptions().minorGrid;
    return minorGridOptions === null || minorGridOptions === void 0 ? void 0 : minorGridOptions.visible;
  });
  var gridVisibility = axesForPane.some(function (axis) {
    var gridOptions = axis.getOptions().grid;
    return gridOptions === null || gridOptions === void 0 ? void 0 : gridOptions.visible;
  });
  if (axesForPane.length > 1) {
    axesForPane.forEach(function (axis) {
      var gridOpt = axis.getOptions().grid;
      if (axisShown) {
        changeVisibilityAxisGrids(axis, false, false);
      } else if (gridOpt === null || gridOpt === void 0 ? void 0 : gridOpt.visible) {
        if (axis.getTranslator().getBusinessRange().isEmpty()) {
          changeVisibilityAxisGrids(axis, false, false);
          hiddenStubAxis.push(axis);
        } else {
          axisShown = true;
          changeVisibilityAxisGrids(axis, gridVisibility, minorGridVisibility);
        }
      }
    });
    if (!axisShown && hiddenStubAxis.length) {
      changeVisibilityAxisGrids(hiddenStubAxis[0], gridVisibility, minorGridVisibility);
    }
  }
}
function findAxisOptions(valueAxes, valueAxesOptions, axisName) {
  var result;
  var axInd;
  for (axInd = 0; axInd < valueAxesOptions.length; axInd += 1) {
    if (valueAxesOptions[axInd].name === axisName) {
      result = valueAxesOptions[axInd];
      result.priority = axInd;
      break;
    }
  }
  if (!result) {
    for (axInd = 0; axInd < valueAxes.length; axInd += 1) {
      if (valueAxes[axInd].name === axisName) {
        result = valueAxes[axInd].getOptions();
        result.priority = valueAxes[axInd].priority;
        break;
      }
    }
  }
  return result;
}
function findAxis(paneName, axisName, axes) {
  var axisByName = axes.find(function (axis) {
    return axis.name === axisName && axis.pane === paneName;
  });
  if (axisByName) {
    return axisByName;
  }
  if (paneName) {
    return findAxis(undefined, axisName, axes);
  }
}
function compareAxes(a, b) {
  return a.priority - b.priority;
}
// checks if pane with provided name exists in this panes array
function doesPaneExist(panes, paneName) {
  var found = false;
  (0, _iterator.each)(panes, function (_, pane) {
    if (pane.name === paneName) {
      found = true;
      return false;
    }
    return undefined;
  });
  return found;
}
// utilities used in axes rendering
function accumulate(field, src1, src2, auxSpacing) {
  var val1 = src1[field] || 0;
  var val2 = src2[field] || 0;
  return val1 + val2 + (val1 && val2 ? auxSpacing : 0);
}
function pickMax(field, src1, src2) {
  return pickMaxValue(src1[field], src2[field]);
}
function pickMaxValue(val1, val2) {
  return Math.max(val1 || 0, val2 || 0);
}
function getAxisMargins(axis) {
  return axis.getMargins();
}
function getHorizontalAxesMargins(axes, getMarginsFunc) {
  return axes.reduce(function (margins, axis) {
    var _a;
    var axisMargins = getMarginsFunc(axis);
    var paneMargins = margins.panes[axis.pane] = margins.panes[axis.pane] || {};
    var spacing = axis.getMultipleAxesSpacing();
    paneMargins.top = accumulate('top', paneMargins, axisMargins, spacing);
    paneMargins.bottom = accumulate('bottom', paneMargins, axisMargins, spacing);
    paneMargins.left = pickMax('left', paneMargins, axisMargins);
    paneMargins.right = pickMax('right', paneMargins, axisMargins);
    margins.top = pickMax('top', paneMargins, margins);
    margins.bottom = pickMax('bottom', paneMargins, margins);
    margins.left = pickMax('left', paneMargins, margins);
    margins.right = pickMax('right', paneMargins, margins);
    var orthogonalAxis = (_a = axis.getOrthogonalAxis) === null || _a === void 0 ? void 0 : _a.call(axis);
    var shouldResetPositionMargin = (orthogonalAxis === null || orthogonalAxis === void 0 ? void 0 : orthogonalAxis.customPositionIsAvailable()) && (!axis.customPositionIsBoundaryOrthogonalAxis() || !orthogonalAxis.customPositionEqualsToPredefined());
    if (shouldResetPositionMargin) {
      margins[orthogonalAxis.getResolvedBoundaryPosition()] = 0;
    }
    return margins;
  }, {
    panes: {}
  });
}
function getVerticalAxesMargins(axes) {
  return axes.reduce(function (margins, axis) {
    var axisMargins = axis.getMargins();
    var paneMargins = margins.panes[axis.pane] = margins.panes[axis.pane] || {};
    var spacing = axis.getMultipleAxesSpacing();
    paneMargins.top = pickMax('top', paneMargins, axisMargins);
    paneMargins.bottom = pickMax('bottom', paneMargins, axisMargins);
    paneMargins.left = accumulate('left', paneMargins, axisMargins, spacing);
    paneMargins.right = accumulate('right', paneMargins, axisMargins, spacing);
    margins.top = pickMax('top', paneMargins, margins);
    margins.bottom = pickMax('bottom', paneMargins, margins);
    margins.left = pickMax('left', paneMargins, margins);
    margins.right = pickMax('right', paneMargins, margins);
    return margins;
  }, {
    panes: {}
  });
}
function performActionOnAxes(axes, action, actionArgument1, actionArgument2, actionArgument3) {
  axes.forEach(function (axis) {
    axis[action](actionArgument1 === null || actionArgument1 === void 0 ? void 0 : actionArgument1[axis.pane], (actionArgument2 === null || actionArgument2 === void 0 ? void 0 : actionArgument2[axis.pane]) || actionArgument2, actionArgument3);
  });
}
function shrinkCanvases(isRotated, canvases, sizes, verticalMargins, horizontalMargins) {
  function getMargin(side, margins, pane) {
    var m = !(isRotated ? ['left', 'right'] : ['top', 'bottom']).includes(side) ? margins : margins.panes[pane] || {};
    return m[side];
  }
  function getMaxMargin(side, margins1, margins2, pane) {
    return pickMaxValue(getMargin(side, margins1, pane), getMargin(side, margins2, pane));
  }
  var getOriginalField = function getOriginalField(field) {
    return "original".concat(field[0].toUpperCase()).concat(field.slice(1));
  };
  function shrink(canvases, paneNames, sizeField, startMargin, endMargin, oppositeMargins) {
    paneNames = paneNames.sort(function (p1, p2) {
      return canvases[p2][startMargin] - canvases[p1][startMargin];
    });
    paneNames.forEach(function (pane) {
      var canvas = canvases[pane];
      oppositeMargins.forEach(function (margin) {
        canvas[margin] = canvas[getOriginalField(margin)] + getMaxMargin(margin, verticalMargins, horizontalMargins, pane);
      });
    });
    var firstPane = canvases[paneNames[0]];
    var initialEmptySpace = firstPane[sizeField] - firstPane[getOriginalField(endMargin)] - canvases[paneNames.at(-1)][getOriginalField(startMargin)];
    var emptySpace = paneNames.reduce(function (space, paneName) {
      var maxStartMargin = getMaxMargin(startMargin, verticalMargins, horizontalMargins, paneName);
      var maxEndMargin = getMaxMargin(endMargin, verticalMargins, horizontalMargins, paneName);
      return space - maxStartMargin - maxEndMargin;
    }, initialEmptySpace) - _utils.PANE_PADDING * (paneNames.length - 1);
    emptySpace -= Object.keys(sizes).reduce(function (prev, key) {
      var currentHeight = !(0, _utils.isRelativeHeightPane)(sizes[key]) ? sizes[key].height : 0;
      return prev + currentHeight;
    }, 0);
    var initialOffset = firstPane[sizeField] - firstPane[getOriginalField(endMargin)] - (emptySpace < 0 ? emptySpace : 0);
    paneNames.reduce(function (offset, pane) {
      var canvas = canvases[pane];
      var paneSize = sizes[pane];
      offset -= getMaxMargin(endMargin, verticalMargins, horizontalMargins, pane);
      canvas[endMargin] = firstPane[sizeField] - offset;
      offset -= !(0, _utils.isRelativeHeightPane)(paneSize) ? paneSize.height : Math.floor(emptySpace * paneSize.height);
      canvas[startMargin] = offset;
      offset -= getMaxMargin(startMargin, verticalMargins, horizontalMargins, pane) + _utils.PANE_PADDING;
      return offset;
    }, initialOffset);
  }
  var paneNames = Object.keys(canvases);
  if (!isRotated) {
    shrink(canvases, paneNames, 'height', 'top', 'bottom', ['left', 'right']);
  } else {
    shrink(canvases, paneNames, 'width', 'left', 'right', ['top', 'bottom']);
  }
  return canvases;
}
function drawAxesWithTicks(axes, condition, canvases, panesBorderOptions) {
  if (condition) {
    performActionOnAxes(axes, 'createTicks', canvases);
    _multi_axes_synchronizer.default.synchronize(axes);
  }
  performActionOnAxes(axes, 'draw', !condition && canvases, panesBorderOptions);
}
function shiftAxis(side1, side2) {
  var shifts = {};
  return function (axis) {
    if (!axis.customPositionIsAvailable() || axis.customPositionEqualsToPredefined()) {
      var shift = shifts[axis.pane] = shifts[axis.pane] || {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      };
      var spacing = axis.getMultipleAxesSpacing();
      var margins = axis.getMargins();
      axis.shift(shift);
      shift[side1] = accumulate(side1, shift, margins, spacing);
      shift[side2] = accumulate(side2, shift, margins, spacing);
    } else {
      axis.shift({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      });
    }
  };
}
function getCommonSize(side, margins) {
  var size = 0;
  var paneMargins;
  Object.keys(margins.panes).forEach(function (pane) {
    paneMargins = margins.panes[pane];
    size += side === 'height' ? paneMargins.top + paneMargins.bottom : paneMargins.left + paneMargins.right;
  });
  return size;
}
function checkUsedSpace(sizeShortage, side, axes, getMarginFunc) {
  var size = 0;
  if (sizeShortage[side] > 0) {
    size = getCommonSize(side, getMarginFunc(axes, getAxisMargins));
    performActionOnAxes(axes, 'hideTitle');
    sizeShortage[side] -= size - getCommonSize(side, getMarginFunc(axes, getAxisMargins));
  }
  if (sizeShortage[side] > 0) {
    performActionOnAxes(axes, 'hideOuterElements');
  }
}
function axisAnimationEnabled(drawOptions, pointsToAnimation) {
  var pointsCount = pointsToAnimation.reduce(function (sum, count) {
    return sum + count;
  }, 0) / pointsToAnimation.length;
  return drawOptions.animate && pointsCount <= drawOptions.animationPointsLimit;
}
function collectMarkersInfoBySeries(allSeries, filteredSeries, argAxis) {
  var series = [];
  var overloadedSeries = {};
  var argVisualRange = argAxis.visualRange();
  var argTranslator = argAxis.getTranslator();
  var argViewPortFilter = _range_data_calculator.default.getViewPortFilter(argVisualRange || {});
  filteredSeries.forEach(function (s) {
    var valAxis = s.getValueAxis();
    var valVisualRange = valAxis.getCanvasRange();
    var valTranslator = valAxis.getTranslator();
    var seriesIndex = allSeries.indexOf(s);
    var valViewPortFilter = _range_data_calculator.default.getViewPortFilter(valVisualRange || {});
    overloadedSeries[seriesIndex] = {};
    filteredSeries.forEach(function (sr) {
      overloadedSeries[seriesIndex][allSeries.indexOf(sr)] = 0;
    });
    var seriesPoints = [];
    var pointsInViewport = s.getPoints().filter(function (p) {
      return p.getOptions().visible && argViewPortFilter(p.argument) && (valViewPortFilter(p.getMinValue(true)) || valViewPortFilter(p.getMaxValue(true)));
    });
    pointsInViewport.forEach(function (p) {
      var tp = {
        seriesIndex,
        argument: p.argument,
        value: p.getMaxValue(true),
        size: p.bubbleSize || p.getOptions().size,
        x: undefined,
        y: undefined
      };
      if (p.getMinValue(true) !== p.getMaxValue(true)) {
        var mp = (0, _extend2.extend)({}, tp);
        mp.value = p.getMinValue(true);
        mp.x = argTranslator.to(mp.argument, 1);
        mp.y = valTranslator.to(mp.value, 1);
        seriesPoints.push(mp);
      }
      tp.x = argTranslator.to(tp.argument, 1);
      tp.y = valTranslator.to(tp.value, 1);
      seriesPoints.push(tp);
    });
    overloadedSeries[seriesIndex].pointsCount = seriesPoints.length;
    overloadedSeries[seriesIndex].total = 0;
    overloadedSeries[seriesIndex].continuousSeries = 0;
    series.push({
      name: s.name,
      index: seriesIndex,
      points: seriesPoints
    });
  });
  return {
    series,
    overloadedSeries
  };
}
var isOverlay = function isOverlay(currentPoint, overlayPoint, pointRadius) {
  var pointHitsLeftBorder = overlayPoint.x - pointRadius <= currentPoint.x;
  var pointHitsRightBorder = overlayPoint.x + pointRadius >= currentPoint.x;
  var pointHitsTopBorder = overlayPoint.y - pointRadius <= currentPoint.y;
  var pointHitsBottomBorder = overlayPoint.y + pointRadius >= currentPoint.y;
  var isPointOverlappedHorizontally = pointHitsLeftBorder && pointHitsRightBorder;
  var isPointOverlappedVertically = pointHitsTopBorder && pointHitsBottomBorder;
  return isPointOverlappedHorizontally && isPointOverlappedVertically;
};
var isPointOverlapped = function isPointOverlapped(currentPoint, points, skipSamePointsComparing) {
  var radiusPoint = currentPoint.getOptions().size / 2;
  for (var i = 0; i < points.length; i += 1) {
    if (!skipSamePointsComparing) {
      var isXCoordinateSame = points[i].x === currentPoint.x;
      var isYCoordinateSame = points[i].y === currentPoint.y;
      if (isXCoordinateSame && isYCoordinateSame) {
        continue;
      }
    }
    if (isOverlay(currentPoint, points[i], radiusPoint)) {
      return true;
    }
  }
  return false;
};
function fastHidingPointMarkersByArea(canvas, markersInfo, series) {
  var area = canvas.width * canvas.height;
  var seriesPoints = markersInfo.series;
  var _loop = function _loop(i) {
    var currentSeries = series.filter(function (s) {
      return s.name === seriesPoints[i].name;
    })[0];
    var points = seriesPoints[i].points;
    var pointSize = points.length ? points[0].size : 0;
    var pointsArea = pointSize * pointSize * points.length;
    if (currentSeries.autoHidePointMarkersEnabled() && pointsArea >= area / seriesPoints.length) {
      var index = seriesPoints[i].index;
      currentSeries.autoHidePointMarkers = true;
      seriesPoints.splice(i, 1);
      series.splice(series.indexOf(currentSeries), 1);
      markersInfo.overloadedSeries[index] = null;
    }
  };
  for (var i = seriesPoints.length - 1; i >= 0; i -= 1) {
    _loop(i);
  }
}
function updateMarkersInfo(points, overloadedSeries) {
  var isContinuousSeries = false;
  for (var i = 0; i < points.length - 1; i += 1) {
    var curPoint = points[i];
    var size = curPoint.size;
    if ((0, _type.isDefined)(curPoint.x) && (0, _type.isDefined)(curPoint.y)) {
      for (var j = i + 1; j < points.length; j += 1) {
        var nextPoint = points[j];
        var nextX = nextPoint === null || nextPoint === void 0 ? void 0 : nextPoint.x;
        var nextY = nextPoint === null || nextPoint === void 0 ? void 0 : nextPoint.y;
        if (!(0, _type.isDefined)(nextX) || Math.abs(curPoint.x - nextX) >= size) {
          isContinuousSeries = isContinuousSeries && j !== i + 1;
          break;
        } else {
          var distance = (0, _type.isDefined)(nextX) && (0, _type.isDefined)(nextY) && Math.sqrt(Math.pow(curPoint.x - nextX, 2) + Math.pow(curPoint.y - nextY, 2));
          if (distance && distance < size) {
            overloadedSeries[curPoint.seriesIndex][nextPoint.seriesIndex] += 1;
            overloadedSeries[curPoint.seriesIndex].total += 1;
            if (!isContinuousSeries) {
              overloadedSeries[curPoint.seriesIndex].continuousSeries += 1;
              isContinuousSeries = true;
            }
          }
        }
      }
    }
  }
}
// utilities used in axes rendering
var dxChart = _m_advanced_chart.AdvancedChart.inherit({
  _themeSection: 'chart',
  _fontFields: ['crosshair.label.font'],
  _initCore() {
    this.paneAxis = {};
    this.callBase();
  },
  _init() {
    this._containerInitialHeight = (0, _window.hasWindow)() ? (0, _size.getHeight)(this._$element) : 0;
    this.callBase();
  },
  _correctAxes() {
    this._correctValueAxes(true);
  },
  _setDeprecatedOptions() {
    this.callBase();
    (0, _extend2.extend)(this._deprecatedOptions, {
      'argumentAxis.aggregateByCategory': {
        since: '23.1',
        message: 'Use the aggregation.enabled property'
      }
    });
  },
  _getExtraOptions: _common.noop,
  _createPanes() {
    var panes = this.option('panes');
    var panesNameCounter = 0;
    var defaultPane;
    if (!panes || isArray(panes) && !panes.length) {
      panes = DEFAULT_PANES;
    }
    this.callBase();
    defaultPane = this.option('defaultPane');
    panes = (0, _extend2.extend)(true, [], isArray(panes) ? panes : [panes]);
    (0, _iterator.each)(panes, function (_, pane) {
      pane.name = !(0, _type.isDefined)(pane.name) ? DEFAULT_PANE_NAME + panesNameCounter++ : pane.name;
    });
    if ((0, _type.isDefined)(defaultPane)) {
      if (!doesPaneExist(panes, defaultPane)) {
        this._incidentOccurred('W2101', [defaultPane]);
        defaultPane = panes[panes.length - 1].name;
      }
    } else {
      defaultPane = panes[panes.length - 1].name;
    }
    this.defaultPane = defaultPane;
    panes = this._isRotated() ? panes.reverse() : panes;
    return panes;
  },
  _getAxisRenderingOptions() {
    return {
      axisType: 'xyAxes',
      drawingType: 'linear'
    };
  },
  _prepareAxisOptions(typeSelector, userOptions, rotated) {
    return {
      isHorizontal: typeSelector === 'argumentAxis' !== rotated,
      containerColor: this._themeManager.getOptions('containerBackgroundColor')
    };
  },
  _checkPaneName(seriesTheme) {
    var paneList = (0, _utils.map)(this.panes, function (pane) {
      return pane.name;
    });
    seriesTheme.pane = seriesTheme.pane || this.defaultPane;
    return paneList.includes(seriesTheme.pane);
  },
  _initCustomPositioningAxes() {
    var _this = this;
    var argumentAxis = this.getArgumentAxis();
    var valueAxisName = argumentAxis.getOptions().customPositionAxis;
    var valueAxis = this._valueAxes.find(function (v) {
      return v.pane === argumentAxis.pane && (!valueAxisName || valueAxisName === v.name);
    });
    this._valueAxes.forEach(function (v) {
      if (argumentAxis !== v.getOrthogonalAxis()) {
        v.getOrthogonalAxis = function () {
          return argumentAxis;
        };
        v.customPositionIsBoundaryOrthogonalAxis = function () {
          return argumentAxis.customPositionIsBoundary();
        };
      }
    });
    if ((0, _type.isDefined)(valueAxis) && valueAxis !== argumentAxis.getOrthogonalAxis()) {
      argumentAxis.getOrthogonalAxis = function () {
        return valueAxis;
      };
      argumentAxis.customPositionIsBoundaryOrthogonalAxis = function () {
        return _this._valueAxes.some(function (v) {
          return v.customPositionIsBoundary();
        });
      };
    } else if ((0, _type.isDefined)(argumentAxis.getOrthogonalAxis()) && !(0, _type.isDefined)(valueAxis)) {
      argumentAxis.getOrthogonalAxis = _common.noop;
    }
  },
  _getAllAxes() {
    return this._argumentAxes.concat(this._valueAxes);
  },
  _resetAxesAnimation(isFirstDrawing, isHorizontal) {
    var axes;
    if ((0, _type.isDefined)(isHorizontal)) {
      axes = isHorizontal ^ this._isRotated() ? this._argumentAxes : this._valueAxes;
    } else {
      axes = this._getAllAxes();
    }
    axes.forEach(function (a) {
      a.resetApplyingAnimation(isFirstDrawing);
    });
  },
  _axesBoundaryPositioning() {
    var allAxes = this._getAllAxes();
    var boundaryStateChanged = false;
    allAxes.forEach(function (a) {
      if (!a.customPositionIsAvailable()) {
        return;
      }
      var prevBoundaryState = a.customPositionIsBoundary();
      a._customBoundaryPosition = a.getCustomBoundaryPosition();
      boundaryStateChanged = boundaryStateChanged || prevBoundaryState !== a.customPositionIsBoundary();
    });
    return boundaryStateChanged;
  },
  _getCrosshairMargins() {
    var crosshairOptions = this._getCrosshairOptions() || {};
    var crosshairEnabled = crosshairOptions.enabled;
    var margins = (0, _crosshair.getMargins)();
    var horizontalLabel = (0, _extend2.extend)(true, {}, crosshairOptions.label, crosshairOptions.horizontalLine.label);
    var verticalLabel = (0, _extend2.extend)(true, {}, crosshairOptions.label, crosshairOptions.verticalLine.label);
    return {
      x: crosshairEnabled && crosshairOptions.horizontalLine.visible && horizontalLabel.visible ? margins.x : 0,
      y: crosshairEnabled && crosshairOptions.verticalLine.visible && verticalLabel.visible ? margins.y : 0
    };
  },
  _getValueAxis(paneName, axisName) {
    var valueAxes = this._valueAxes;
    var valueAxisOptions = this.option('valueAxis') || {};
    var valueAxesOptions = isArray(valueAxisOptions) ? valueAxisOptions : [valueAxisOptions];
    var rotated = this._isRotated();
    var crosshairMargins = this._getCrosshairMargins();
    var axisOptions;
    var axis;
    axisName = axisName || getFirstAxisNameForPane(valueAxes, paneName, this.defaultPane);
    axis = findAxis(paneName, axisName, valueAxes);
    if (!axis) {
      axisOptions = findAxisOptions(valueAxes, valueAxesOptions, axisName);
      if (!axisOptions) {
        this._incidentOccurred('W2102', [axisName]);
        axisOptions = {
          name: axisName,
          priority: valueAxes.length
        };
      }
      axis = this._createAxis(false, this._populateAxesOptions('valueAxis', axisOptions, {
        pane: paneName,
        name: axisName,
        optionPath: isArray(valueAxisOptions) ? "valueAxis[".concat(axisOptions.priority, "]") : 'valueAxis',
        crosshairMargin: rotated ? crosshairMargins.y : crosshairMargins.x
      }, rotated));
      axis.applyVisualRangeSetter(this._getVisualRangeSetter());
      valueAxes.push(axis);
    }
    axis.setPane(paneName);
    return axis;
  },
  _correctValueAxes(needHideGrids) {
    var _this2 = this;
    var synchronizeMultiAxes = this._themeManager.getOptions('synchronizeMultiAxes');
    var valueAxes = this._valueAxes;
    var paneWithAxis = {};
    this.series.forEach(function (series) {
      var axis = series.getValueAxis();
      paneWithAxis[axis.pane] = true;
    });
    this.panes.forEach(function (pane) {
      var paneName = pane.name;
      if (!paneWithAxis[paneName]) {
        _this2._getValueAxis(paneName); // creates an value axis if there is no one for pane
      }

      if (needHideGrids && synchronizeMultiAxes) {
        hideGridsOnNonFirstValueAxisForPane(valueAxes.filter(function (axis) {
          return axis.pane === paneName;
        }));
      }
    });
    this._valueAxes = valueAxes.filter(function (axis) {
      if (!axis.pane) {
        axis.setPane(_this2.defaultPane);
      }
      var paneExists = doesPaneExist(_this2.panes, axis.pane);
      if (!paneExists) {
        axis.dispose();
        axis = null;
      }
      return paneExists;
    }).sort(compareAxes);
    var defaultAxis = this.getValueAxis();
    this._valueAxes.forEach(function (axis) {
      var _axis$getOptions = axis.getOptions(),
        optionPath = _axis$getOptions.optionPath;
      if (optionPath) {
        var axesWithSamePath = _this2._valueAxes.filter(function (a) {
          return a.getOptions().optionPath === optionPath;
        });
        if (axesWithSamePath.length > 1) {
          if (axesWithSamePath.some(function (a) {
            return a === defaultAxis;
          })) {
            axesWithSamePath.forEach(function (a) {
              if (a !== defaultAxis) {
                a.getOptions().optionPath = null;
              }
            });
          } else {
            axesWithSamePath.forEach(function (a, i) {
              if (i !== 0) {
                a.getOptions().optionPath = null;
              }
            });
          }
        }
      }
    });
  },
  _getSeriesForPane(paneName) {
    var paneSeries = [];
    (0, _iterator.each)(this.series, function (_, oneSeries) {
      if (oneSeries.pane === paneName) {
        paneSeries.push(oneSeries);
      }
    });
    return paneSeries;
  },
  _createPanesBorderOptions() {
    var commonBorderOptions = this._themeManager.getOptions('commonPaneSettings').border;
    var panesBorderOptions = {};
    this.panes.forEach(function (pane) {
      panesBorderOptions[pane.name] = (0, _extend2.extend)(true, {}, commonBorderOptions, pane.border);
    });
    return panesBorderOptions;
  },
  _createScrollBar() {
    var _a;
    var scrollBarOptions = this._themeManager.getOptions('scrollBar') || {};
    var scrollBarGroup = this._scrollBarGroup;
    if (scrollBarOptions.visible) {
      scrollBarOptions.rotated = this._isRotated();
      this._scrollBar = (this._scrollBar || new _scroll_bar.ScrollBar(this._renderer, scrollBarGroup)).update(scrollBarOptions);
    } else {
      scrollBarGroup.linkRemove();
      (_a = this._scrollBar) === null || _a === void 0 ? void 0 : _a.dispose();
      this._scrollBar = null;
    }
  },
  _executeAppendAfterSeries(append) {
    append();
  },
  _prepareToRender() {
    var panesBorderOptions = this._createPanesBorderOptions();
    this._createPanesBackground();
    this._appendAxesGroups();
    this._adjustViewport();
    return panesBorderOptions;
  },
  _adjustViewport() {
    var adjustOnZoom = this._themeManager.getOptions('adjustOnZoom');
    if (!adjustOnZoom) {
      return;
    }
    this._valueAxes.forEach(function (axis) {
      return axis.adjust();
    });
  },
  _recreateSizeDependentObjects(isCanvasChanged) {
    var _this3 = this;
    var series = this._getVisibleSeries();
    var useAggregation = series.some(function (s) {
      return s.useAggregation();
    });
    var zoomChanged = this._isZooming();
    if (!useAggregation) {
      return;
    }
    this._argumentAxes.forEach(function (axis) {
      axis.updateCanvas(_this3._canvas, true);
    });
    series.forEach(function (series) {
      if (series.useAggregation() && (isCanvasChanged || zoomChanged || !series._useAllAggregatedPoints)) {
        series.createPoints();
      }
    });
    this._processSeriesFamilies();
  },
  _isZooming() {
    var argumentAxis = this.getArgumentAxis();
    if (!(argumentAxis === null || argumentAxis === void 0 ? void 0 : argumentAxis.getTranslator())) {
      return false;
    }
    var businessRange = argumentAxis.getTranslator().getBusinessRange();
    var zoomRange = argumentAxis.getViewport();
    var min = zoomRange ? zoomRange.min : 0;
    var max = zoomRange ? zoomRange.max : 0;
    if (businessRange.axisType === 'logarithmic') {
      min = (0, _utils.getLog)(min, businessRange.base);
      max = (0, _utils.getLog)(max, businessRange.base);
    }
    var viewportDistance = businessRange.axisType === DISCRETE ? (0, _utils.getCategoriesInfo)(businessRange.categories, min, max).categories.length : Math.abs(max - min);
    var precision = (0, _math.getPrecision)(viewportDistance);
    precision = precision > 1 ? Math.pow(10, precision - 2) : 1;
    var zoomChanged = Math.round((this._zoomLength - viewportDistance) * precision) / precision !== 0;
    this._zoomLength = viewportDistance;
    return zoomChanged;
  },
  _handleSeriesDataUpdated() {
    var _this4 = this;
    var viewport = new _range.Range();
    this.series.forEach(function (s) {
      viewport.addRange(s.getArgumentRange());
    });
    this._argumentAxes.forEach(function (axis) {
      axis.updateCanvas(_this4._canvas, true);
      axis.setBusinessRange(viewport, _this4._axesReinitialized);
    });
    this.callBase();
  },
  _isLegendInside() {
    return this._legend && this._legend.getPosition() === 'inside';
  },
  _isRotated() {
    return this._themeManager.getOptions('rotated');
  },
  _getLayoutTargets() {
    return this.panes;
  },
  _applyClipRects(panesBorderOptions) {
    this._drawPanesBorders(panesBorderOptions);
    this._createClipRectsForPanes();
    this._applyClipRectsForAxes();
    this._fillPanesBackground();
  },
  _updateLegendPosition(drawOptions, legendHasInsidePosition) {
    if (drawOptions.drawLegend && this._legend && legendHasInsidePosition) {
      var panes = this.panes;
      var newCanvas = (0, _extend2.extend)({}, panes[0].canvas);
      var layoutManager = new _layout_manager.LayoutManager();
      newCanvas.right = panes[panes.length - 1].canvas.right;
      newCanvas.bottom = panes[panes.length - 1].canvas.bottom;
      layoutManager.layoutInsideLegend(this._legend, newCanvas);
    }
  },
  _allowLegendInsidePosition() {
    return true;
  },
  _applyExtraSettings(series) {
    var paneIndex = this._getPaneIndex(series.pane);
    var panesClipRects = this._panesClipRects;
    var wideClipRect = panesClipRects.wide[paneIndex];
    series.setClippingParams(panesClipRects.base[paneIndex].id, wideClipRect === null || wideClipRect === void 0 ? void 0 : wideClipRect.id, this._getPaneBorderVisibility(paneIndex));
  },
  _updatePanesCanvases(drawOptions) {
    if (!drawOptions.recreateCanvas) {
      return;
    }
    (0, _utils.updatePanesCanvases)(this.panes, this._canvas, this._isRotated());
  },
  _normalizePanesHeight() {
    (0, _utils.normalizePanesHeight)(this.panes);
  },
  _renderScaleBreaks() {
    this._valueAxes.concat(this._argumentAxes).forEach(function (axis) {
      axis.drawScaleBreaks();
    });
  },
  _getArgFilter() {
    return _range_data_calculator.default.getViewPortFilter(this.getArgumentAxis().visualRange() || {});
  },
  _hidePointsForSingleSeriesIfNeeded(series) {
    var seriesPoints = series.getPoints();
    var overlappedPointsCount = 0;
    for (var i = 0; i < seriesPoints.length; i += 1) {
      var currentPoint = seriesPoints[i];
      var overlappingPoints = seriesPoints.slice(i + 1);
      overlappedPointsCount += Number(isPointOverlapped(currentPoint, overlappingPoints));
      if (overlappedPointsCount > seriesPoints.length / 2) {
        series.autoHidePointMarkers = true;
        break;
      }
    }
  },
  _applyAutoHidePointMarkers(filteredSeries) {
    var overlappingPoints = [];
    var overlappedPointsCalculator = function overlappedPointsCalculator(pointsCount, currentPoint) {
      return pointsCount + isPointOverlapped(currentPoint, overlappingPoints, true);
    };
    for (var i = filteredSeries.length - 1; i >= 0; i -= 1) {
      var currentSeries = filteredSeries[i];
      if (!currentSeries.autoHidePointMarkersEnabled()) {
        continue;
      }
      currentSeries.autoHidePointMarkers = false;
      this._hidePointsForSingleSeriesIfNeeded(currentSeries);
      if (!currentSeries.autoHidePointMarkers) {
        var seriesPoints = currentSeries.getPoints();
        var overlappingPointsCount = seriesPoints.reduce(overlappedPointsCalculator, 0);
        if (overlappingPointsCount < seriesPoints.length) {
          overlappingPoints = overlappingPoints.concat(seriesPoints);
        } else {
          currentSeries.autoHidePointMarkers = true;
        }
      }
    }
  },
  _applyPointMarkersAutoHiding() {
    var _this5 = this;
    var allSeries = this.series;
    if (!this._themeManager.getOptions('autoHidePointMarkers')) {
      allSeries.forEach(function (s) {
        s.autoHidePointMarkers = false;
      });
      return;
    }
    this.panes.forEach(function (_ref) {
      var borderCoords = _ref.borderCoords,
        name = _ref.name;
      var series = allSeries.filter(function (s) {
        return s.pane === name && s.usePointsToDefineAutoHiding();
      });
      series.forEach(function (singleSeries) {
        singleSeries.prepareCoordinatesForPoints();
      });
      var argAxis = _this5.getArgumentAxis();
      var markersInfo = collectMarkersInfoBySeries(allSeries, series, argAxis);
      fastHidingPointMarkersByArea(borderCoords, markersInfo, series);
      if (markersInfo.series.length) {
        var argVisualRange = argAxis.visualRange();
        var argAxisIsDiscrete = argAxis.getOptions().type === DISCRETE;
        var sortingCallback = argAxisIsDiscrete ? function (p1, p2) {
          return argVisualRange.categories.indexOf(p1.argument) - argVisualRange.categories.indexOf(p2.argument);
        } : function (p1, p2) {
          return p1.argument - p2.argument;
        };
        var points = [];
        markersInfo.series.forEach(function (s) {
          points = points.concat(s.points);
        });
        points.sort(sortingCallback);
        updateMarkersInfo(points, markersInfo.overloadedSeries);
        _this5._applyAutoHidePointMarkers(series);
      }
    });
  },
  _renderAxes(drawOptions, panesBorderOptions) {
    var _this6 = this;
    function calculateTitlesWidth(axes) {
      return axes.map(function (axis) {
        if (!axis.getTitle) return 0;
        var title = axis.getTitle();
        return title ? title.bBox.width : 0;
      });
    }
    var rotated = this._isRotated();
    var synchronizeMultiAxes = this._themeManager.getOptions('synchronizeMultiAxes');
    var scrollBar = this._scrollBar ? [this._scrollBar] : [];
    var extendedArgAxes = this._isArgumentAxisBeforeScrollBar() ? this._argumentAxes.concat(scrollBar) : scrollBar.concat(this._argumentAxes);
    var verticalAxes = rotated ? this._argumentAxes : this._valueAxes;
    var verticalElements = rotated ? extendedArgAxes : this._valueAxes;
    var horizontalAxes = rotated ? this._valueAxes : this._argumentAxes;
    var horizontalElements = rotated ? this._valueAxes : extendedArgAxes;
    var allAxes = verticalAxes.concat(horizontalAxes);
    var allElements = allAxes.concat(scrollBar);
    var verticalAxesFirstDrawing = verticalAxes.some(function (v) {
      return v.isFirstDrawing();
    });
    this._normalizePanesHeight();
    this._updatePanesCanvases(drawOptions);
    var panesCanvases = this.panes.reduce(function (canvases, pane) {
      canvases[pane.name] = (0, _extend2.extend)({}, pane.canvas);
      return canvases;
    }, {});
    var paneSizes = this.panes.reduce(function (sizes, pane) {
      sizes[pane.name] = {
        height: pane.height,
        unit: pane.unit
      };
      return sizes;
    }, {});
    var cleanPanesCanvases = (0, _extend2.extend)(true, {}, panesCanvases);
    this._initCustomPositioningAxes();
    var needCustomAdjustAxes = this._axesBoundaryPositioning();
    if (!drawOptions.adjustAxes && !needCustomAdjustAxes) {
      drawAxesWithTicks(verticalAxes, !rotated && synchronizeMultiAxes, panesCanvases, panesBorderOptions);
      drawAxesWithTicks(horizontalAxes, rotated && synchronizeMultiAxes, panesCanvases, panesBorderOptions);
      performActionOnAxes(allAxes, 'prepareAnimation');
      this._renderScaleBreaks();
      horizontalAxes.forEach(function (a) {
        return a.resolveOverlappingForCustomPositioning(verticalAxes);
      });
      verticalAxes.forEach(function (a) {
        return a.resolveOverlappingForCustomPositioning(horizontalAxes);
      });
      return false;
    }
    if (needCustomAdjustAxes) {
      allAxes.forEach(function (a) {
        return a.customPositionIsAvailable() && a.shift({
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        });
      });
    }
    if (this._scrollBar) {
      this._scrollBar.setPane(this.panes);
    }
    var vAxesMargins = {
      panes: {},
      left: 0,
      right: 0
    };
    var hAxesMargins = getHorizontalAxesMargins(horizontalElements, function (axis) {
      return axis.estimateMargins(panesCanvases[axis.pane]);
    });
    panesCanvases = shrinkCanvases(rotated, panesCanvases, paneSizes, vAxesMargins, hAxesMargins);
    var drawAxesAndSetCanvases = function drawAxesAndSetCanvases(isHorizontal) {
      var axes = isHorizontal ? horizontalAxes : verticalAxes;
      var condition = (isHorizontal ? rotated : !rotated) && synchronizeMultiAxes;
      drawAxesWithTicks(axes, condition, panesCanvases, panesBorderOptions);
      if (isHorizontal) {
        hAxesMargins = getHorizontalAxesMargins(horizontalElements, getAxisMargins);
      } else {
        vAxesMargins = getVerticalAxesMargins(verticalElements);
      }
      panesCanvases = shrinkCanvases(rotated, panesCanvases, paneSizes, vAxesMargins, hAxesMargins);
    };
    drawAxesAndSetCanvases(false);
    drawAxesAndSetCanvases(true);
    if (!this._changesApplying && this._estimateTickIntervals(verticalAxes, panesCanvases)) {
      drawAxesAndSetCanvases(false);
    }
    var oldTitlesWidth = calculateTitlesWidth(verticalAxes);
    var visibleSeries = this._getVisibleSeries();
    var pointsToAnimation = this._getPointsToAnimation(visibleSeries);
    var axesIsAnimated = axisAnimationEnabled(drawOptions, pointsToAnimation);
    performActionOnAxes(allElements, 'updateSize', panesCanvases, axesIsAnimated);
    horizontalElements.forEach(shiftAxis('top', 'bottom'));
    verticalElements.forEach(shiftAxis('left', 'right'));
    this._renderScaleBreaks();
    this.panes.forEach(function (pane) {
      (0, _extend2.extend)(pane.canvas, panesCanvases[pane.name]);
    });
    this._valueAxes.forEach(function (axis) {
      axis.setInitRange();
    });
    verticalAxes.forEach(function (axis, i) {
      var _a;
      if ((_a = axis.hasWrap) === null || _a === void 0 ? void 0 : _a.call(axis)) {
        var title = axis.getTitle();
        var newTitleWidth = title ? title.bBox.width : 0;
        var offset = newTitleWidth - oldTitlesWidth[i];
        if (axis.getOptions().position === 'right') {
          vAxesMargins.right += offset;
        } else {
          vAxesMargins.left += offset;
          _this6.panes.forEach(function (_ref2) {
            var name = _ref2.name;
            vAxesMargins.panes[name].left += offset;
          });
        }
        panesCanvases = shrinkCanvases(rotated, panesCanvases, paneSizes, vAxesMargins, hAxesMargins);
        performActionOnAxes(allElements, 'updateSize', panesCanvases, false, false);
        oldTitlesWidth = calculateTitlesWidth(verticalAxes);
      }
    });
    if (verticalAxes.some(function (v) {
      return v.customPositionIsAvailable() && v.getCustomPosition() !== v._axisPosition;
    })) {
      axesIsAnimated && this._resetAxesAnimation(verticalAxesFirstDrawing, false);
      performActionOnAxes(verticalAxes, 'updateSize', panesCanvases, axesIsAnimated);
    }
    horizontalAxes.forEach(function (a) {
      return a.resolveOverlappingForCustomPositioning(verticalAxes);
    });
    verticalAxes.forEach(function (a) {
      return a.resolveOverlappingForCustomPositioning(horizontalAxes);
    });
    return cleanPanesCanvases;
  },
  _getExtraTemplatesItems() {
    var allAxes = (this._argumentAxes || []).concat(this._valueAxes || []);
    var elements = this._collectTemplatesFromItems(allAxes);
    return {
      items: elements.items,
      groups: elements.groups,
      launchRequest() {
        allAxes.forEach(function (a) {
          a.setRenderedState(true);
        });
      },
      doneRequest() {
        allAxes.forEach(function (a) {
          a.setRenderedState(false);
        });
      }
    };
  },
  _estimateTickIntervals(axes, canvases) {
    return axes.some(function (axis) {
      return axis.estimateTickInterval(canvases[axis.pane]);
    });
  },
  checkForMoreSpaceForPanesCanvas() {
    var rotated = this._isRotated();
    var panesAreCustomSized = this.panes.filter(function (p) {
      return p.unit;
    }).length === this.panes.length;
    var needSpace = false;
    if (panesAreCustomSized) {
      var needHorizontalSpace = 0;
      var needVerticalSpace = 0;
      if (rotated) {
        var argAxisRightMargin = this.getArgumentAxis().getMargins().right;
        var rightPanesIndent = Math.min.apply(Math, _toConsumableArray(this.panes.map(function (p) {
          return p.canvas.right;
        })));
        needHorizontalSpace = this._canvas.right + argAxisRightMargin - rightPanesIndent;
      } else {
        var argAxisBottomMargin = this.getArgumentAxis().getMargins().bottom;
        var bottomPanesIndent = Math.min.apply(Math, _toConsumableArray(this.panes.map(function (p) {
          return p.canvas.bottom;
        })));
        needVerticalSpace = this._canvas.bottom + argAxisBottomMargin - bottomPanesIndent;
      }
      needSpace = needHorizontalSpace > 0 || needVerticalSpace > 0 ? {
        width: needHorizontalSpace,
        height: needVerticalSpace
      } : false;
      if (needVerticalSpace !== 0) {
        var realSize = this.getSize();
        var customSize = this.option('size');
        var container = this._$element[0];
        var containerHasStyledHeight = !!parseInt(container.style.height, 10) || this._containerInitialHeight !== 0;
        if (!rotated && !(customSize === null || customSize === void 0 ? void 0 : customSize.height) && !containerHasStyledHeight) {
          this._forceResize(realSize.width, realSize.height + needVerticalSpace);
          needSpace = false;
        }
      }
    } else {
      needSpace = this.layoutManager.needMoreSpaceForPanesCanvas(this._getLayoutTargets(), rotated, function (pane) {
        return {
          width: rotated && !!pane.unit,
          height: !rotated && !!pane.unit
        };
      });
    }
    return needSpace;
  },
  _forceResize(width, height) {
    this._renderer.resize(width, height);
    this._updateSize();
    this._setContentSize();
    this._preserveOriginalCanvas();
    this._updateCanvasClipRect(this._canvas);
  },
  _shrinkAxes(sizeShortage, panesCanvases) {
    if (!sizeShortage || !panesCanvases) {
      return;
    }
    this._renderer.stopAllAnimations(true);
    var rotated = this._isRotated();
    var scrollBar = this._scrollBar ? [this._scrollBar] : [];
    var extendedArgAxes = this._isArgumentAxisBeforeScrollBar() ? this._argumentAxes.concat(scrollBar) : scrollBar.concat(this._argumentAxes);
    var verticalAxes = rotated ? extendedArgAxes : this._valueAxes;
    var horizontalAxes = rotated ? this._valueAxes : extendedArgAxes;
    var allAxes = verticalAxes.concat(horizontalAxes);
    if (sizeShortage.width || sizeShortage.height) {
      checkUsedSpace(sizeShortage, 'height', horizontalAxes, getHorizontalAxesMargins);
      checkUsedSpace(sizeShortage, 'width', verticalAxes, getVerticalAxesMargins);
      performActionOnAxes(allAxes, 'updateSize', panesCanvases);
      var paneSizes = this.panes.reduce(function (sizes, pane) {
        sizes[pane.name] = {
          height: pane.height,
          unit: pane.unit
        };
        return sizes;
      }, {});
      panesCanvases = shrinkCanvases(rotated, panesCanvases, paneSizes, getVerticalAxesMargins(verticalAxes), getHorizontalAxesMargins(horizontalAxes, getAxisMargins));
      performActionOnAxes(allAxes, 'updateSize', panesCanvases);
      horizontalAxes.forEach(shiftAxis('top', 'bottom'));
      verticalAxes.forEach(shiftAxis('left', 'right'));
      this.panes.forEach(function (pane) {
        return (0, _extend2.extend)(pane.canvas, panesCanvases[pane.name]);
      });
    }
  },
  _isArgumentAxisBeforeScrollBar() {
    var _a;
    var argumentAxis = this.getArgumentAxis();
    if (this._scrollBar) {
      var argAxisPosition = argumentAxis.getResolvedBoundaryPosition();
      var argAxisLabelPosition = (_a = argumentAxis.getOptions().label) === null || _a === void 0 ? void 0 : _a.position;
      var scrollBarPosition = this._scrollBar.getOptions().position;
      return argumentAxis.hasNonBoundaryPosition() || scrollBarPosition === argAxisPosition && argAxisLabelPosition !== scrollBarPosition;
    }
    return false;
  },
  _getPanesParameters() {
    var panes = this.panes;
    var params = [];
    for (var i = 0; i < panes.length; i += 1) {
      if (this._getPaneBorderVisibility(i)) {
        params.push({
          coords: panes[i].borderCoords,
          clipRect: this._panesClipRects.fixed[i]
        });
      }
    }
    return params;
  },
  _createCrosshairCursor() {
    var options = this._themeManager.getOptions('crosshair') || {};
    var argumentAxis = this.getArgumentAxis();
    var axes = this._isRotated() ? [this._valueAxes, [argumentAxis]] : [[argumentAxis], this._valueAxes];
    var parameters = {
      canvas: this._getCommonCanvas(),
      panes: this._getPanesParameters(),
      axes
    };
    if (!(options === null || options === void 0 ? void 0 : options.enabled)) {
      return;
    }
    if (this._crosshair) {
      this._crosshair.update(options, parameters);
    } else {
      this._crosshair = new _crosshair.Crosshair(this._renderer, options, parameters, this._crosshairCursorGroup);
    }
    this._crosshair.render();
  },
  _getCommonCanvas() {
    var commonCanvas;
    var panes = this.panes;
    for (var i = 0; i < panes.length; i += 1) {
      var canvas = panes[i].canvas;
      if (!commonCanvas) {
        // TODO
        commonCanvas = (0, _extend2.extend)({}, canvas);
      } else {
        commonCanvas.right = canvas.right;
        commonCanvas.bottom = canvas.bottom;
      }
    }
    return commonCanvas;
  },
  _createPanesBackground() {
    var defaultBackgroundColor = this._themeManager.getOptions('commonPaneSettings').backgroundColor;
    var renderer = this._renderer;
    var rects = [];
    this._panesBackgroundGroup.clear();
    for (var i = 0; i < this.panes.length; i += 1) {
      var backgroundColor = this.panes[i].backgroundColor || defaultBackgroundColor;
      if (!backgroundColor || backgroundColor === 'none') {
        rects.push(null);
        continue;
      }
      var rect = renderer.rect(0, 0, 0, 0).attr({
        fill: (0, _utils.extractColor)(backgroundColor),
        'stroke-width': 0
      }).append(this._panesBackgroundGroup);
      rects.push(rect);
    }
    this.panesBackground = rects;
  },
  _fillPanesBackground() {
    var _this7 = this;
    (0, _iterator.each)(this.panes, function (i, pane) {
      var bc = pane.borderCoords;
      if (_this7.panesBackground[i] !== null) {
        _this7.panesBackground[i].attr({
          x: bc.left,
          y: bc.top,
          width: bc.width,
          height: bc.height
        });
      }
    });
  },
  _calcPaneBorderCoords(pane) {
    var canvas = pane.canvas;
    var bc = pane.borderCoords = pane.borderCoords || {};
    bc.left = canvas.left;
    bc.top = canvas.top;
    bc.right = canvas.width - canvas.right;
    bc.bottom = canvas.height - canvas.bottom;
    bc.width = Math.max(bc.right - bc.left, 0);
    bc.height = Math.max(bc.bottom - bc.top, 0);
  },
  _drawPanesBorders(panesBorderOptions) {
    var _this8 = this;
    var rotated = this._isRotated();
    this._panesBorderGroup.linkRemove().clear();
    (0, _iterator.each)(this.panes, function (i, pane) {
      var borderOptions = panesBorderOptions[pane.name];
      var attr = {
        fill: 'none',
        stroke: borderOptions.color,
        'stroke-opacity': borderOptions.opacity,
        'stroke-width': borderOptions.width,
        dashStyle: borderOptions.dashStyle,
        'stroke-linecap': 'square'
      };
      _this8._calcPaneBorderCoords(pane, rotated);
      if (!borderOptions.visible) {
        return;
      }
      var bc = pane.borderCoords;
      var segmentRectParams = (0, _utils2.prepareSegmentRectPoints)(bc.left, bc.top, bc.width, bc.height, borderOptions);
      _this8._renderer.path(segmentRectParams.points, segmentRectParams.pathType).attr(attr).append(_this8._panesBorderGroup);
    });
    this._panesBorderGroup.linkAppend();
  },
  _createClipRect(clipArray, index, left, top, width, height) {
    var clipRect = clipArray[index];
    if (!clipRect) {
      clipRect = this._renderer.clipRect(left, top, width, height);
      clipArray[index] = clipRect;
    } else {
      clipRect.attr({
        x: left,
        y: top,
        width,
        height
      });
    }
  },
  _createClipRectsForPanes() {
    var _this9 = this;
    var canvas = this._canvas;
    (0, _iterator.each)(this.panes, function (i, pane) {
      var needWideClipRect = false;
      var bc = pane.borderCoords;
      var left = bc.left;
      var top = bc.top;
      var width = bc.width;
      var height = bc.height;
      var panesClipRects = _this9._panesClipRects;
      _this9._createClipRect(panesClipRects.fixed, i, left, top, width, height);
      _this9._createClipRect(panesClipRects.base, i, left, top, width, height);
      (0, _iterator.each)(_this9.series, function (_, series) {
        if (series.pane === pane.name && (series.isFinancialSeries() || series.areErrorBarsVisible())) {
          needWideClipRect = true;
        }
      });
      if (needWideClipRect) {
        if (_this9._isRotated()) {
          top = 0;
          height = canvas.height;
        } else {
          left = 0;
          width = canvas.width;
        }
        _this9._createClipRect(panesClipRects.wide, i, left, top, width, height);
      } else {
        panesClipRects.wide[i] = null;
      }
    });
  },
  _applyClipRectsForAxes() {
    var axes = this._getAllAxes();
    var chartCanvasClipRectID = this._getCanvasClipRectID();
    for (var i = 0; i < axes.length; i += 1) {
      var elementsClipRectID = this._getElementsClipRectID(axes[i].pane);
      axes[i].applyClipRects(elementsClipRectID, chartCanvasClipRectID);
    }
  },
  _getPaneBorderVisibility(paneIndex) {
    var _a;
    var commonPaneBorderVisible = this._themeManager.getOptions('commonPaneSettings').border.visible;
    var pane = this.panes[paneIndex];
    var paneVisibility = (_a = pane === null || pane === void 0 ? void 0 : pane.border) === null || _a === void 0 ? void 0 : _a.visible;
    return paneVisibility === undefined ? commonPaneBorderVisible : paneVisibility;
  },
  _getCanvasForPane(paneName) {
    var _a;
    return (_a = this.panes.find(function (pane) {
      return pane.name === paneName;
    })) === null || _a === void 0 ? void 0 : _a.canvas;
  },
  _getTrackerSettings() {
    return (0, _extend2.extend)(this.callBase(), {
      chart: this,
      rotated: this._isRotated(),
      crosshair: this._getCrosshairOptions().enabled ? this._crosshair : null,
      stickyHovering: this._themeManager.getOptions('stickyHovering')
    });
  },
  _resolveLabelOverlappingStack() {
    var _this10 = this;
    var isRotated = this._isRotated();
    var shiftDirection = isRotated ? function (box, length) {
      return {
        x: box.x - length,
        y: box.y
      };
    } : function (box, length) {
      return {
        x: box.x,
        y: box.y - length
      };
    };
    var processor = function processor(a, b) {
      var coordPosition = isRotated ? 1 : 0;
      var figureCenter1 = a.labels[0].getFigureCenter()[coordPosition];
      var figureCenter12 = b.labels[0].getFigureCenter()[coordPosition];
      if (figureCenter1 - figureCenter12 === 0) {
        var translator = a.labels[0].getPoint().series.getValueAxis().getTranslator();
        var direction = translator.isInverted() ? -1 : 1;
        return (a.value() - b.value()) * direction;
      }
      return 0;
    };
    (0, _iterator.each)(this._getStackPoints(), function (_, stacks) {
      (0, _iterator.each)(stacks, function (_, points) {
        var isInverted = points[0].series.getValueAxis().getOptions().inverted;
        _m_base_chart.overlapping.resolveLabelOverlappingInOneDirection(points, _this10._getCommonCanvas(), isRotated, isInverted, shiftDirection, processor);
      });
    });
  },
  _getStackPoints() {
    var stackPoints = {};
    var visibleSeries = this._getVisibleSeries();
    (0, _iterator.each)(visibleSeries, function (_, singleSeries) {
      var points = singleSeries.getPoints();
      var stackName = singleSeries.getStackName() || null;
      (0, _iterator.each)(points, function (_, point) {
        var argument = point.argument;
        if (!stackPoints[argument]) {
          stackPoints[argument] = {};
        }
        if (!stackPoints[argument][stackName]) {
          stackPoints[argument][stackName] = [];
        }
        stackPoints[argument][stackName].push(point);
      });
    });
    return stackPoints;
  },
  _getCrosshairOptions() {
    return this._getOption('crosshair');
  },
  // API
  zoomArgument(min, max) {
    if (!this._initialized || !(0, _type.isDefined)(min) && !(0, _type.isDefined)(max)) {
      return;
    }
    this.getArgumentAxis().visualRange([min, max]);
  },
  resetVisualRange() {
    var _this11 = this;
    var axes = this._argumentAxes;
    var nonVirtualArgumentAxis = this.getArgumentAxis();
    axes.forEach(function (axis) {
      axis.resetVisualRange(nonVirtualArgumentAxis !== axis);
      _this11._applyCustomVisualRangeOption(axis);
    });
    this.callBase();
  },
  // T218011 for dashboards
  getVisibleArgumentBounds() {
    var translator = this._argumentAxes[0].getTranslator();
    var range = translator.getBusinessRange();
    var isDiscrete = range.axisType === DISCRETE;
    var categories = range.categories;
    return {
      minVisible: isDiscrete ? range.minVisible || categories[0] : range.minVisible,
      maxVisible: isDiscrete ? range.maxVisible || categories[categories.length - 1] : range.maxVisible
    };
  },
  _change_FULL_RENDER() {
    this.callBase();
    if (this._changes.has(VISUAL_RANGE)) {
      this._raiseZoomEndHandlers();
    }
  },
  _getAxesForScaling() {
    return [this.getArgumentAxis()].concat(this._valueAxes);
  },
  _applyVisualRangeByVirtualAxes(axis, range) {
    if (axis.isArgumentAxis) {
      if (axis !== this.getArgumentAxis()) {
        return true;
      }
      this._argumentAxes.filter(function (a) {
        return a !== axis;
      }).forEach(function (a) {
        return a.visualRange(range, {
          start: true,
          end: true
        });
      });
    }
    return false;
  },
  _raiseZoomEndHandlers() {
    this._argumentAxes.forEach(function (axis) {
      return axis.handleZoomEnd();
    });
    this.callBase();
  },
  _setOptionsByReference() {
    this.callBase();
    (0, _extend2.extend)(this._optionsByReference, {
      'argumentAxis.visualRange': true
    });
  },
  option() {
    var option = this.callBase.apply(this, arguments);
    var valueAxis = this._options.silent('valueAxis');
    if ((0, _type.type)(valueAxis) === 'array') {
      for (var i = 0; i < valueAxis.length; i += 1) {
        var optionPath = "valueAxis[".concat(i, "].visualRange");
        this._optionsByReference[optionPath] = true;
      }
    }
    return option;
  },
  _notifyVisualRange() {
    var argAxis = this._argumentAxes[0];
    var argumentVisualRange = (0, _utils.convertVisualRangeObject)(argAxis.visualRange(), !isArray(this.option('argumentAxis.visualRange')));
    if (!argAxis.skipEventRising || !(0, _utils.rangesAreEqual)(argumentVisualRange, this.option('argumentAxis.visualRange'))) {
      this.option('argumentAxis.visualRange', argumentVisualRange);
    } else {
      argAxis.skipEventRising = null;
    }
    this.callBase();
  }
});
dxChart.addPlugin(_shutter_zoom.default);
dxChart.addPlugin(_zoom_and_pan.default);
dxChart.addPlugin(_annotations.plugins.core);
dxChart.addPlugin(_annotations.plugins.chart);
(0, _component_registrator.default)('dxChart', dxChart);
var _default = dxChart;
exports.default = _default;
