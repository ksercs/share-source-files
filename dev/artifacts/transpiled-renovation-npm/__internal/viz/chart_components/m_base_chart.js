"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overlapping = exports.BaseChart = void 0;
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _index = require("../../../events/utils/index");
var _layout_manager = require("../../../viz/chart_components/layout_manager");
var trackerModule = _interopRequireWildcard(require("../../../viz/chart_components/tracker"));
var _chart_theme_manager = require("../../../viz/components/chart_theme_manager");
var _data_validator = require("../../../viz/components/data_validator");
var _legend = require("../../../viz/components/legend");
var _data_source = require("../../../viz/core/data_source");
var _export = require("../../../viz/core/export");
var _loading_indicator = require("../../../viz/core/loading_indicator");
var _title = require("../../../viz/core/title");
var _tooltip = require("../../../viz/core/tooltip");
var _utils = require("../../../viz/core/utils");
var _base_series = require("../../../viz/series/base_series");
var _m_base_widget = _interopRequireDefault(require("../core/m_base_widget"));
var _rolling_stock = require("./rolling_stock");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-expect-error

// PLUGINS_SECTION

var isArray = Array.isArray;
var REINIT_REFRESH_ACTION = '_reinit';
var REINIT_DATA_SOURCE_REFRESH_ACTION = '_updateDataSource';
var DATA_INIT_REFRESH_ACTION = '_dataInit';
var FORCE_RENDER_REFRESH_ACTION = '_forceRender';
var RESIZE_REFRESH_ACTION = '_resize';
var ACTIONS_BY_PRIORITY = [REINIT_REFRESH_ACTION, REINIT_DATA_SOURCE_REFRESH_ACTION, DATA_INIT_REFRESH_ACTION, FORCE_RENDER_REFRESH_ACTION, RESIZE_REFRESH_ACTION];
var DEFAULT_OPACITY = 0.3;
var REFRESH_SERIES_DATA_INIT_ACTION_OPTIONS = ['series', 'commonSeriesSettings', 'dataPrepareSettings', 'seriesSelectionMode', 'pointSelectionMode', 'synchronizeMultiAxes', 'resolveLabelsOverlapping'];
var REFRESH_SERIES_FAMILIES_ACTION_OPTIONS = ['minBubbleSize', 'maxBubbleSize', 'barGroupPadding', 'barGroupWidth', 'negativesAsZeroes', 'negativesAsZeros' // misspelling case
];

var FORCE_RENDER_REFRESH_ACTION_OPTIONS = ['adaptiveLayout', 'crosshair', 'resolveLabelOverlapping', 'adjustOnZoom', 'stickyHovering'];
var FONT = 'font';
function checkHeightRollingStock(rollingStocks, stubCanvas) {
  var canvasSize = stubCanvas.end - stubCanvas.start;
  var size = 0;
  rollingStocks.forEach(function (rollingStock) {
    size += rollingStock.getBoundingRect().width;
  });
  while (canvasSize < size) {
    size -= findAndKillSmallValue(rollingStocks);
  }
}
function findAndKillSmallValue(rollingStocks) {
  var smallestObject = rollingStocks.reduce(function (prev, rollingStock, index) {
    if (!rollingStock) return prev;
    var value = rollingStock.value();
    return value < prev.value ? {
      value,
      rollingStock,
      index
    } : prev;
  }, {
    rollingStock: undefined,
    value: Infinity,
    index: undefined
  });
  smallestObject.rollingStock.getLabels()[0].draw(false);
  var _smallestObject$rolli = smallestObject.rollingStock.getBoundingRect(),
    width = _smallestObject$rolli.width;
  rollingStocks[smallestObject.index] = null;
  return width;
}
function checkStackOverlap(rollingStocks) {
  var i;
  var j;
  var iLength;
  var jLength;
  var overlap = false;
  for (i = 0, iLength = rollingStocks.length - 1; i < iLength; i++) {
    for (j = i + 1, jLength = rollingStocks.length; j < jLength; j++) {
      if (i !== j && checkStacksOverlapping(rollingStocks[i], rollingStocks[j], true)) {
        overlap = true;
        break;
      }
    }
    if (overlap) break;
  }
  return overlap;
}
function resolveLabelOverlappingInOneDirection(points, canvas, isRotated, isInverted, shiftFunction) {
  var customSorting = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {
    return 0;
  };
  var rollingStocks = [];
  var stubCanvas = {
    start: isRotated ? canvas.left : canvas.top,
    end: isRotated ? canvas.width - canvas.right : canvas.height - canvas.bottom
  };
  var hasStackedSeries = false;
  var sortRollingStocks;
  points.forEach(function (p) {
    if (!p) return;
    hasStackedSeries = hasStackedSeries || p.series.isStackedSeries() || p.series.isFullStackedSeries();
    p.getLabels().forEach(function (l) {
      if (l.isVisible()) {
        rollingStocks.push(new _rolling_stock.RollingStock(l, isRotated, shiftFunction));
      }
    });
  });
  if (hasStackedSeries) {
    if (Number(!isRotated) ^ Number(isInverted)) {
      rollingStocks.reverse();
    }
    sortRollingStocks = isInverted ? rollingStocks : sortRollingStocksByValue(rollingStocks);
  } else {
    var rollingStocksTmp = rollingStocks.slice();
    sortRollingStocks = rollingStocks.sort(function (a, b) {
      return customSorting(a, b) || a.getInitialPosition() - b.getInitialPosition() || rollingStocksTmp.indexOf(a) - rollingStocksTmp.indexOf(b);
    });
  }
  if (!checkStackOverlap(sortRollingStocks)) return false;
  checkHeightRollingStock(sortRollingStocks, stubCanvas);
  prepareOverlapStacks(sortRollingStocks);
  sortRollingStocks.reverse();
  moveRollingStock(sortRollingStocks, stubCanvas);
  return true;
}
function checkStacksOverlapping(firstRolling, secondRolling, inTwoSides) {
  if (!firstRolling || !secondRolling) return;
  var firstRect = firstRolling.getBoundingRect();
  var secondRect = secondRolling.getBoundingRect();
  var oppositeOverlapping = inTwoSides ? firstRect.oppositeStart <= secondRect.oppositeStart && firstRect.oppositeEnd > secondRect.oppositeStart || secondRect.oppositeStart <= firstRect.oppositeStart && secondRect.oppositeEnd > firstRect.oppositeStart : true;
  return firstRect.end > secondRect.start && oppositeOverlapping;
}
function sortRollingStocksByValue(rollingStocks) {
  var positiveRollingStocks = [];
  var negativeRollingStocks = [];
  rollingStocks.forEach(function (stock) {
    if (stock.value() > 0) {
      positiveRollingStocks.push(stock);
    } else {
      negativeRollingStocks.unshift(stock);
    }
  });
  return positiveRollingStocks.concat(negativeRollingStocks);
}
function prepareOverlapStacks(rollingStocks) {
  var root;
  for (var i = 0; i < rollingStocks.length - 1; i += 1) {
    var currentRollingStock = root || rollingStocks[i];
    if (checkStacksOverlapping(currentRollingStock, rollingStocks[i + 1])) {
      currentRollingStock.toChain(rollingStocks[i + 1]);
      rollingStocks[i + 1] = null;
      root = currentRollingStock;
    } else {
      root = rollingStocks[i + 1] || currentRollingStock;
    }
  }
}
function rollingStocksIsOut(rollingStock, canvas) {
  return rollingStock.getBoundingRect().end > canvas.end;
}
function moveRollingStock(rollingStocks, canvas) {
  for (var i = 0; i < rollingStocks.length; i += 1) {
    var currentRollingStock = rollingStocks[i];
    var shouldSetCanvas = true;
    if (currentRollingStock !== null && rollingStocksIsOut(currentRollingStock, canvas)) {
      var currentBBox = currentRollingStock.getBoundingRect();
      for (var j = i + 1; j < rollingStocks.length; j += 1) {
        var nextRollingStock = rollingStocks[j];
        if (nextRollingStock) {
          var nextBBox = nextRollingStock.getBoundingRect();
          if (nextBBox.end > currentBBox.start - (currentBBox.end - canvas.end)) {
            nextRollingStock.toChain(currentRollingStock);
            shouldSetCanvas = false;
            break;
          }
        }
      }
    }
    if (shouldSetCanvas) {
      currentRollingStock === null || currentRollingStock === void 0 ? void 0 : currentRollingStock.setRollingStockInCanvas(canvas);
    }
  }
}
function getLegendFields(name) {
  return {
    nameField: "".concat(name, "Name"),
    colorField: "".concat(name, "Color"),
    indexField: "".concat(name, "Index")
  };
}
function getLegendSettings(legendDataField) {
  var formatObjectFields = getLegendFields(legendDataField);
  return {
    getFormatObject(data) {
      var res = {};
      res[formatObjectFields.indexField] = data.id;
      res[formatObjectFields.colorField] = data.states.normal.fill;
      res[formatObjectFields.nameField] = data.text;
      return res;
    },
    textField: formatObjectFields.nameField
  };
}
function checkOverlapping(firstRect, secondRect) {
  return (firstRect.x <= secondRect.x && secondRect.x <= firstRect.x + firstRect.width || firstRect.x >= secondRect.x && firstRect.x <= secondRect.x + secondRect.width) && (firstRect.y <= secondRect.y && secondRect.y <= firstRect.y + firstRect.height || firstRect.y >= secondRect.y && firstRect.y <= secondRect.y + secondRect.height);
}
var overlapping = {
  resolveLabelOverlappingInOneDirection
};
exports.overlapping = overlapping;
var BaseChart = _m_base_widget.default.inherit({
  _eventsMap: {
    onSeriesClick: {
      name: 'seriesClick'
    },
    onPointClick: {
      name: 'pointClick'
    },
    onArgumentAxisClick: {
      name: 'argumentAxisClick'
    },
    onLegendClick: {
      name: 'legendClick'
    },
    onSeriesSelectionChanged: {
      name: 'seriesSelectionChanged'
    },
    onPointSelectionChanged: {
      name: 'pointSelectionChanged'
    },
    onSeriesHoverChanged: {
      name: 'seriesHoverChanged'
    },
    onPointHoverChanged: {
      name: 'pointHoverChanged'
    },
    onDone: {
      name: 'done',
      actionSettings: {
        excludeValidators: ['disabled']
      }
    },
    onZoomStart: {
      name: 'zoomStart'
    },
    onZoomEnd: {
      name: 'zoomEnd'
    }
  },
  _fontFields: ["legend.".concat(FONT), "legend.title.".concat(FONT), "legend.title.subtitle.".concat(FONT), "commonSeriesSettings.label.".concat(FONT)],
  _rootClassPrefix: 'dxc',
  _rootClass: 'dxc-chart',
  _initialChanges: ['INIT'],
  _themeDependentChanges: ['REFRESH_SERIES_REINIT'],
  _getThemeManagerOptions() {
    var themeOptions = this.callBase.apply(this, arguments);
    themeOptions.options = this.option();
    return themeOptions;
  },
  _createThemeManager() {
    var chartOption = this.option();
    var themeManager = new _chart_theme_manager.ThemeManager(this._getThemeManagerOptions());
    themeManager.setTheme(chartOption.theme, chartOption.rtlEnabled);
    return themeManager;
  },
  _initCore() {
    this._canvasClipRect = this._renderer.clipRect();
    this._createHtmlStructure();
    this._createLegend();
    this._createTracker();
    this._needHandleRenderComplete = true;
    this.layoutManager = new _layout_manager.LayoutManager();
    this._createScrollBar();
    _events_engine.default.on(this._$element, 'contextmenu', function (event) {
      if ((0, _index.isTouchEvent)(event) || (0, _index.isPointerEvent)(event)) {
        event.preventDefault();
      }
    });
    _events_engine.default.on(this._$element, 'MSHoldVisual', function (event) {
      event.preventDefault();
    });
  },
  // Common functionality is overridden because Chart has its own layout logic.
  // Nevertheless common logic should be used.
  _getLayoutItems: _common.noop,
  _layoutManagerOptions() {
    return this._themeManager.getOptions('adaptiveLayout');
  },
  _reinit() {
    (0, _utils.setCanvasValues)(this._canvas);
    this._reinitAxes();
    this._requestChange(['DATA_SOURCE', 'DATA_INIT', 'CORRECT_AXIS', 'FULL_RENDER']);
  },
  _correctAxes: _common.noop,
  _createHtmlStructure() {
    var _this = this;
    var renderer = this._renderer;
    var root = renderer.root;
    var createConstantLinesGroup = function createConstantLinesGroup() {
      // TODO: Must be created in the same place where used (advanced chart)
      return renderer.g().attr({
        class: 'dxc-constant-lines-group'
      }).linkOn(root, 'constant-lines');
    };
    this._constantLinesGroup = {
      dispose() {
        this.under.dispose();
        this.above.dispose();
      },
      linkOff() {
        this.under.linkOff();
        this.above.linkOff();
      },
      clear() {
        this.under.linkRemove().clear();
        this.above.linkRemove().clear();
      },
      linkAppend() {
        this.under.linkAppend();
        this.above.linkAppend();
      }
    };
    this._labelsAxesGroup = renderer.g().attr({
      class: 'dxc-elements-axes-group'
    });
    var appendLabelsAxesGroup = function appendLabelsAxesGroup() {
      _this._labelsAxesGroup.linkOn(root, 'elements');
    };
    this._backgroundRect = renderer.rect().attr({
      fill: 'gray',
      opacity: 0.0001
    }).append(root);
    this._panesBackgroundGroup = renderer.g().attr({
      class: 'dxc-background'
    }).append(root);
    this._stripsGroup = renderer.g().attr({
      class: 'dxc-strips-group'
    }).linkOn(root, 'strips'); // TODO: Must be created in the same place where used (advanced chart)
    this._gridGroup = renderer.g().attr({
      class: 'dxc-grids-group'
    }).linkOn(root, 'grids'); // TODO: Must be created in the same place where used (advanced chart)
    this._panesBorderGroup = renderer.g().attr({
      class: 'dxc-border'
    }).linkOn(root, 'border'); // TODO: Must be created in the same place where used (chart)
    this._axesGroup = renderer.g().attr({
      class: 'dxc-axes-group'
    }).linkOn(root, 'axes'); // TODO: Must be created in the same place where used (advanced chart)
    this._executeAppendBeforeSeries(appendLabelsAxesGroup);
    this._stripLabelAxesGroup = renderer.g().attr({
      class: 'dxc-strips-labels-group'
    }).linkOn(root, 'strips-labels'); // TODO: Must be created in the same place where used (advanced chart)
    this._constantLinesGroup.under = createConstantLinesGroup();
    this._seriesGroup = renderer.g().attr({
      class: 'dxc-series-group'
    }).linkOn(root, 'series');
    this._executeAppendAfterSeries(appendLabelsAxesGroup);
    this._constantLinesGroup.above = createConstantLinesGroup();
    this._scaleBreaksGroup = renderer.g().attr({
      class: 'dxc-scale-breaks'
    }).linkOn(root, 'scale-breaks');
    this._labelsGroup = renderer.g().attr({
      class: 'dxc-labels-group'
    }).linkOn(root, 'labels');
    this._crosshairCursorGroup = renderer.g().attr({
      class: 'dxc-crosshair-cursor'
    }).linkOn(root, 'crosshair');
    this._legendGroup = renderer.g().attr({
      class: 'dxc-legend',
      'clip-path': this._getCanvasClipRectID()
    }).linkOn(root, 'legend').linkAppend(root).enableLinks();
    this._scrollBarGroup = renderer.g().attr({
      class: 'dxc-scroll-bar'
    }).linkOn(root, 'scroll-bar');
  },
  _executeAppendBeforeSeries() {},
  _executeAppendAfterSeries() {},
  _disposeObjectsInArray(propName, fieldNames) {
    (this[propName] || []).forEach(function (item) {
      if (fieldNames && item) {
        fieldNames.forEach(function (field) {
          var _a;
          (_a = item[field]) === null || _a === void 0 ? void 0 : _a.dispose();
        });
      } else {
        item === null || item === void 0 ? void 0 : item.dispose();
      }
    });
    this[propName] = null;
  },
  _disposeCore() {
    var _this2 = this;
    var disposeObject = function disposeObject(propName) {
      // TODO: What is the purpose of the `if` check in a private function?
      if (_this2[propName]) {
        _this2[propName].dispose();
        _this2[propName] = null;
      }
    };
    var unlinkGroup = function unlinkGroup(name) {
      _this2[name].linkOff();
    };
    var disposeObjectsInArray = this._disposeObjectsInArray;
    this._renderer.stopAllAnimations();
    disposeObjectsInArray.call(this, 'series');
    disposeObject('_tracker');
    disposeObject('_crosshair');
    this.layoutManager = this._userOptions = this._canvas = this._groupsData = null;
    unlinkGroup('_stripsGroup');
    unlinkGroup('_gridGroup');
    unlinkGroup('_axesGroup');
    unlinkGroup('_constantLinesGroup');
    unlinkGroup('_stripLabelAxesGroup');
    unlinkGroup('_panesBorderGroup');
    unlinkGroup('_seriesGroup');
    unlinkGroup('_labelsGroup');
    unlinkGroup('_crosshairCursorGroup');
    unlinkGroup('_legendGroup');
    unlinkGroup('_scrollBarGroup');
    unlinkGroup('_scaleBreaksGroup');
    disposeObject('_canvasClipRect');
    disposeObject('_panesBackgroundGroup');
    disposeObject('_backgroundRect');
    disposeObject('_stripsGroup');
    disposeObject('_gridGroup');
    disposeObject('_axesGroup');
    disposeObject('_constantLinesGroup');
    disposeObject('_stripLabelAxesGroup');
    disposeObject('_panesBorderGroup');
    disposeObject('_seriesGroup');
    disposeObject('_labelsGroup');
    disposeObject('_crosshairCursorGroup');
    disposeObject('_legendGroup');
    disposeObject('_scrollBarGroup');
    disposeObject('_scaleBreaksGroup');
  },
  _getAnimationOptions() {
    return this._themeManager.getOptions('animation');
  },
  _getDefaultSize() {
    return {
      width: 400,
      height: 400
    };
  },
  // TODO: Theme manager should stop knowing about user options then this method can be removed
  _getOption(name) {
    return this._themeManager.getOptions(name);
  },
  _applySize(rect) {
    this._rect = rect.slice();
    if (!this._changes.has('FULL_RENDER')) {
      this._processRefreshData(RESIZE_REFRESH_ACTION);
    }
  },
  // _resize: function () {
  //    if (this._updateLockCount) {// T244164
  //        this._processRefreshData(RESIZE_REFRESH_ACTION);
  //    } else {
  //        this._render(this.__renderOptions || { animate: false, isResize: true });
  //    }
  // },
  _resize() {
    this._doRender(this.__renderOptions || {
      animate: false,
      isResize: true
    });
  },
  _trackerType: 'ChartTracker',
  _createTracker() {
    // eslint-disable-next-line import/namespace
    this._tracker = new trackerModule[this._trackerType]({
      seriesGroup: this._seriesGroup,
      renderer: this._renderer,
      tooltip: this._tooltip,
      legend: this._legend,
      eventTrigger: this._eventTrigger
    });
  },
  _getTrackerSettings() {
    return (0, _extend.extend)({
      chart: this
    }, this._getSelectionModes());
  },
  _getSelectionModes() {
    var themeManager = this._themeManager;
    return {
      seriesSelectionMode: themeManager.getOptions('seriesSelectionMode'),
      pointSelectionMode: themeManager.getOptions('pointSelectionMode')
    };
  },
  _updateTracker(trackerCanvases) {
    this._tracker.update(this._getTrackerSettings());
    this._tracker.setCanvases({
      left: 0,
      right: this._canvas.width,
      top: 0,
      bottom: this._canvas.height
    }, trackerCanvases);
  },
  _createCanvasFromRect(rect) {
    var currentCanvas = this._canvas;
    return (0, _utils.setCanvasValues)({
      left: rect[0],
      top: rect[1],
      right: currentCanvas.width - rect[2],
      bottom: currentCanvas.height - rect[3],
      width: currentCanvas.width,
      height: currentCanvas.height
    });
  },
  _doRender(_options) {
    if (this._canvas.width === 0 && this._canvas.height === 0) return;
    this._resetIsReady(); // T207606
    var drawOptions = this._prepareDrawOptions(_options);
    var recreateCanvas = drawOptions.recreateCanvas;
    // T207665
    this._preserveOriginalCanvas();
    // T207665
    if (recreateCanvas) {
      this.__currentCanvas = this._canvas;
    } else {
      this._canvas = this.__currentCanvas;
    }
    recreateCanvas && this._updateCanvasClipRect(this._canvas);
    this._canvas = this._createCanvasFromRect(this._rect);
    this._renderer.stopAllAnimations(true);
    this._cleanGroups();
    var startTime = new Date();
    this._renderElements(drawOptions);
    this._lastRenderingTime = Number(new Date()) - Number(startTime);
  },
  _preserveOriginalCanvas() {
    this.__originalCanvas = this._canvas;
    this._canvas = (0, _extend.extend)({}, this._canvas); // NOTE: Instance of the original canvas must be preserved
  },

  _layoutAxes: _common.noop,
  _renderElements(drawOptions) {
    var _this3 = this;
    var preparedOptions = this._prepareToRender(drawOptions);
    var isRotated = this._isRotated();
    var isLegendInside = this._isLegendInside();
    var trackerCanvases = [];
    var dirtyCanvas = (0, _extend.extend)({}, this._canvas);
    var argBusinessRange;
    var zoomMinArg;
    var zoomMaxArg;
    this._renderer.lock();
    if (drawOptions.drawLegend && this._legend) {
      this._legendGroup.linkAppend();
    }
    this.layoutManager.setOptions(this._layoutManagerOptions());
    var layoutTargets = this._getLayoutTargets();
    this._layoutAxes(function (needSpace) {
      var axisDrawOptions = needSpace ? (0, _extend.extend)({}, drawOptions, {
        animate: false,
        recreateCanvas: true
      }) : drawOptions;
      var canvas = _this3._renderAxes(axisDrawOptions, preparedOptions);
      _this3._shrinkAxes(needSpace, canvas);
    });
    this._applyClipRects(preparedOptions);
    this._appendSeriesGroups();
    this._createCrosshairCursor();
    layoutTargets.forEach(function (_ref) {
      var canvas = _ref.canvas;
      trackerCanvases.push({
        left: canvas.left,
        right: canvas.width - canvas.right,
        top: canvas.top,
        bottom: canvas.height - canvas.bottom
      });
    });
    if (this._scrollBar) {
      argBusinessRange = this._argumentAxes[0].getTranslator().getBusinessRange();
      if (argBusinessRange.axisType === 'discrete' && argBusinessRange.categories && argBusinessRange.categories.length <= 1 || argBusinessRange.axisType !== 'discrete' && argBusinessRange.min === argBusinessRange.max) {
        zoomMinArg = zoomMaxArg = undefined;
      } else {
        zoomMinArg = argBusinessRange.minVisible;
        zoomMaxArg = argBusinessRange.maxVisible;
      }
      this._scrollBar.init(argBusinessRange, !this._argumentAxes[0].getOptions().valueMarginsEnabled).setPosition(zoomMinArg, zoomMaxArg);
    }
    this._updateTracker(trackerCanvases);
    this._updateLegendPosition(drawOptions, isLegendInside);
    this._applyPointMarkersAutoHiding();
    this._renderSeries(drawOptions, isRotated, isLegendInside);
    this._renderGraphicObjects();
    this._renderer.unlock();
  },
  _updateLegendPosition: _common.noop,
  _createCrosshairCursor: _common.noop,
  _appendSeriesGroups() {
    this._seriesGroup.linkAppend();
    this._labelsGroup.linkAppend();
    this._appendAdditionalSeriesGroups();
  },
  _renderSeries(drawOptions, isRotated, isLegendInside) {
    this._calculateSeriesLayout(drawOptions, isRotated);
    this._renderSeriesElements(drawOptions, isLegendInside);
  },
  _calculateSeriesLayout(drawOptions, isRotated) {
    drawOptions.hideLayoutLabels = this.layoutManager.needMoreSpaceForPanesCanvas(this._getLayoutTargets(), isRotated) && !this._themeManager.getOptions('adaptiveLayout').keepLabels;
    this._updateSeriesDimensions(drawOptions);
  },
  _getArgFilter() {
    return function () {
      return true;
    };
  },
  _getValFilter() {
    return function () {
      return true;
    };
  },
  _getPointsToAnimation(series) {
    var _this4 = this;
    var argViewPortFilter = this._getArgFilter();
    return series.map(function (s) {
      var valViewPortFilter = _this4._getValFilter(s);
      return s.getPoints().filter(function (p) {
        return p.getOptions().visible && argViewPortFilter(p.argument) && (valViewPortFilter(p.getMinValue(true)) || valViewPortFilter(p.getMaxValue(true)));
      }).length;
    });
  },
  _renderSeriesElements(drawOptions, isLegendInside) {
    var _this5 = this;
    var series = this.series;
    var resolveLabelOverlapping = this._themeManager.getOptions('resolveLabelOverlapping');
    var pointsToAnimation = this._getPointsToAnimation(series);
    series.forEach(function (singleSeries, index) {
      _this5._applyExtraSettings(singleSeries, drawOptions);
      var animationEnabled = drawOptions.animate && pointsToAnimation[index] <= drawOptions.animationPointsLimit && _this5._renderer.animationEnabled();
      singleSeries.draw(animationEnabled, drawOptions.hideLayoutLabels, _this5._getLegendCallBack(singleSeries));
    });
    if (resolveLabelOverlapping === 'none') {
      this._adjustSeriesLabels(false);
    } else {
      this._locateLabels(resolveLabelOverlapping);
    }
    this._renderTrackers(isLegendInside);
    this._tracker.repairTooltip();
    this._renderExtraElements();
    this._clearCanvas();
    this._seriesElementsDrawn = true;
  },
  _changesApplied() {
    if (this._seriesElementsDrawn) {
      this._seriesElementsDrawn = false;
      this._drawn();
      this._renderCompleteHandler();
    }
  },
  _locateLabels(resolveLabelOverlapping) {
    this._resolveLabelOverlapping(resolveLabelOverlapping);
  },
  _renderExtraElements() {},
  _clearCanvas() {
    // T207665, T336349, T503616
    this._canvas = this.__originalCanvas;
  },
  _resolveLabelOverlapping(resolveLabelOverlapping) {
    var func;
    switch (resolveLabelOverlapping) {
      case 'stack':
        func = this._resolveLabelOverlappingStack;
        break;
      case 'hide':
        func = this._resolveLabelOverlappingHide;
        break;
      case 'shift':
        func = this._resolveLabelOverlappingShift;
        break;
      default:
        break;
    }
    return (0, _type.isFunction)(func) && func.call(this);
  },
  _getVisibleSeries() {
    return (0, _common.grep)(this.getAllSeries(), function (series) {
      return series.isVisible();
    });
  },
  _resolveLabelOverlappingHide() {
    var labels = [];
    var currentLabel;
    var nextLabel;
    var currentLabelRect;
    var nextLabelRect;
    var i;
    var j;
    var points;
    var series = this._getVisibleSeries();
    for (i = 0; i < series.length; i++) {
      points = series[i].getVisiblePoints();
      for (j = 0; j < points.length; j++) {
        labels.push.apply(labels, points[j].getLabels());
      }
    }
    for (i = 0; i < labels.length; i++) {
      currentLabel = labels[i];
      if (!currentLabel.isVisible()) {
        continue;
      }
      currentLabelRect = currentLabel.getBoundingRect();
      for (j = i + 1; j < labels.length; j++) {
        nextLabel = labels[j];
        nextLabelRect = nextLabel.getBoundingRect();
        if (checkOverlapping(currentLabelRect, nextLabelRect)) {
          nextLabel.draw(false);
        }
      }
    }
  },
  _cleanGroups() {
    this._stripsGroup.linkRemove().clear(); // TODO: Must be removed in the same place where appended (advanced chart)
    this._gridGroup.linkRemove().clear(); // TODO: Must be removed in the same place where appended (advanced chart)
    this._axesGroup.linkRemove().clear(); // TODO: Must be removed in the same place where appended (advanced chart)
    this._constantLinesGroup.clear(); // TODO: Must be removed in the same place where appended (advanced chart)
    this._stripLabelAxesGroup.linkRemove().clear(); // TODO: Must be removed in the same place where appended (advanced chart)
    // that._seriesGroup.linkRemove().clear();
    this._labelsGroup.linkRemove().clear();
    this._crosshairCursorGroup.linkRemove().clear();
    this._scaleBreaksGroup.linkRemove().clear();
  },
  _allowLegendInsidePosition() {
    return false;
  },
  _createLegend() {
    var legendSettings = getLegendSettings(this._legendDataField);
    this._legend = new _legend.Legend({
      renderer: this._renderer,
      widget: this,
      group: this._legendGroup,
      backgroundClass: 'dxc-border',
      itemGroupClass: 'dxc-item',
      titleGroupClass: 'dxc-title',
      textField: legendSettings.textField,
      getFormatObject: legendSettings.getFormatObject,
      allowInsidePosition: this._allowLegendInsidePosition()
    });
    this._updateLegend();
    this._layout.add(this._legend);
  },
  _updateLegend() {
    var themeManager = this._themeManager;
    var legendOptions = themeManager.getOptions('legend');
    var legendData = this._getLegendData();
    legendOptions.containerBackgroundColor = themeManager.getOptions('containerBackgroundColor');
    legendOptions._incidentOccurred = this._incidentOccurred; // TODO: Why is `_` used?
    this._legend.update(legendData, legendOptions, themeManager.theme('legend').title);
    this._change(['LAYOUT']);
  },
  _prepareDrawOptions(drawOptions) {
    var animationOptions = this._getAnimationOptions();
    var options = (0, _extend.extend)({}, {
      force: false,
      adjustAxes: true,
      drawLegend: true,
      drawTitle: true,
      animate: animationOptions.enabled,
      animationPointsLimit: animationOptions.maxPointCountSupported
    }, drawOptions, this.__renderOptions); // NOTE: This is to support `render` method options
    if (!(0, _type.isDefined)(options.recreateCanvas)) {
      options.recreateCanvas = options.adjustAxes && options.drawLegend && options.drawTitle;
    }
    return options;
  },
  _processRefreshData(newRefreshAction) {
    var currentRefreshActionPosition = ACTIONS_BY_PRIORITY.indexOf(this._currentRefreshData);
    var newRefreshActionPosition = ACTIONS_BY_PRIORITY.indexOf(newRefreshAction);
    if (!this._currentRefreshData || currentRefreshActionPosition >= 0 && newRefreshActionPosition < currentRefreshActionPosition) {
      this._currentRefreshData = newRefreshAction;
      // this._invalidate();
    }

    this._requestChange(['REFRESH']);
  },
  _getLegendData() {
    return (0, _utils.map)(this._getLegendTargets(), function (item) {
      var legendData = item.legendData;
      var style = item.getLegendStyles;
      var opacity = style.normal.opacity;
      if (!item.visible) {
        if (!(0, _type.isDefined)(opacity) || opacity > DEFAULT_OPACITY) {
          opacity = DEFAULT_OPACITY;
        }
        legendData.textOpacity = DEFAULT_OPACITY;
      }
      var opacityStyle = {
        opacity
      };
      legendData.states = {
        hover: (0, _extend.extend)({}, style.hover, opacityStyle),
        selection: (0, _extend.extend)({}, style.selection, opacityStyle),
        normal: (0, _extend.extend)({}, style.normal, opacityStyle)
      };
      return legendData;
    });
  },
  _getLegendOptions(item) {
    return {
      legendData: {
        text: item[this._legendItemTextField],
        id: item.index,
        visible: true
      },
      getLegendStyles: item.getLegendStyles(),
      visible: item.isVisible()
    };
  },
  _disposeSeries(seriesIndex) {
    var _a;
    if (this.series) {
      if ((0, _type.isDefined)(seriesIndex)) {
        this.series[seriesIndex].dispose();
        this.series.splice(seriesIndex, 1);
      } else {
        this.series.forEach(function (s) {
          return s.dispose();
        });
        this.series.length = 0;
      }
    }
    if (!((_a = this.series) === null || _a === void 0 ? void 0 : _a.length)) {
      this.series = [];
    }
  },
  _disposeSeriesFamilies() {
    (this.seriesFamilies || []).forEach(function (family) {
      family.dispose();
    });
    this.seriesFamilies = null;
    this._needHandleRenderComplete = true;
  },
  _optionChanged(arg) {
    this._themeManager.resetOptions(arg.name);
    this.callBase.apply(this, arguments);
  },
  _applyChanges() {
    this._themeManager.update(this._options.silent());
    this.callBase.apply(this, arguments);
  },
  _optionChangesMap: {
    animation: 'ANIMATION',
    dataSource: 'DATA_SOURCE',
    palette: 'PALETTE',
    paletteExtensionMode: 'PALETTE',
    legend: 'FORCE_DATA_INIT',
    seriesTemplate: 'FORCE_DATA_INIT',
    export: 'FORCE_RENDER',
    valueAxis: 'AXES_AND_PANES',
    argumentAxis: 'AXES_AND_PANES',
    commonAxisSettings: 'AXES_AND_PANES',
    panes: 'AXES_AND_PANES',
    commonPaneSettings: 'AXES_AND_PANES',
    defaultPane: 'AXES_AND_PANES',
    containerBackgroundColor: 'AXES_AND_PANES',
    rotated: 'ROTATED',
    autoHidePointMarkers: 'REFRESH_SERIES_REINIT',
    customizePoint: 'REFRESH_SERIES_REINIT',
    customizeLabel: 'REFRESH_SERIES_REINIT',
    scrollBar: 'SCROLL_BAR'
  },
  _optionChangesOrder: ['ROTATED', 'PALETTE', 'REFRESH_SERIES_REINIT', 'USE_SPIDER_WEB', 'AXES_AND_PANES', 'INIT', 'REINIT', 'DATA_SOURCE', 'REFRESH_SERIES_DATA_INIT', 'DATA_INIT', 'FORCE_DATA_INIT', 'REFRESH_AXES', 'CORRECT_AXIS'],
  _customChangesOrder: ['ANIMATION', 'REFRESH_SERIES_FAMILIES', 'FORCE_FIRST_DRAWING', 'FORCE_DRAWING', 'FORCE_RENDER', 'VISUAL_RANGE', 'SCROLL_BAR', 'REINIT', 'REFRESH', 'FULL_RENDER'],
  _change_ANIMATION() {
    this._renderer.updateAnimationOptions(this._getAnimationOptions());
  },
  _change_DATA_SOURCE() {
    this._needHandleRenderComplete = true;
    this._updateDataSource();
  },
  _change_PALETTE() {
    this._themeManager.updatePalette();
    this._refreshSeries('DATA_INIT');
  },
  _change_REFRESH_SERIES_DATA_INIT() {
    this._refreshSeries('DATA_INIT');
  },
  _change_DATA_INIT() {
    if ((!this.series || this.needToPopulateSeries) && !this._changes.has('FORCE_DATA_INIT')) {
      this._dataInit();
    }
  },
  _change_FORCE_DATA_INIT() {
    this._dataInit();
  },
  _change_REFRESH_SERIES_FAMILIES() {
    this._processSeriesFamilies();
    this._populateBusinessRange();
    this._processRefreshData(FORCE_RENDER_REFRESH_ACTION);
  },
  _change_FORCE_RENDER() {
    this._processRefreshData(FORCE_RENDER_REFRESH_ACTION);
  },
  _change_AXES_AND_PANES() {
    this._refreshSeries('INIT');
  },
  _change_ROTATED() {
    this._createScrollBar();
    this._refreshSeries('INIT');
  },
  _change_REFRESH_SERIES_REINIT() {
    this._refreshSeries('INIT');
  },
  _change_REFRESH_AXES() {
    (0, _utils.setCanvasValues)(this._canvas);
    this._reinitAxes();
    this._requestChange(['CORRECT_AXIS', 'FULL_RENDER']);
  },
  _change_SCROLL_BAR() {
    this._createScrollBar();
    this._processRefreshData(FORCE_RENDER_REFRESH_ACTION);
  },
  _change_REINIT() {
    this._processRefreshData(REINIT_REFRESH_ACTION);
  },
  _change_FORCE_DRAWING() {
    this._resetComponentsAnimation();
  },
  _change_FORCE_FIRST_DRAWING() {
    this._resetComponentsAnimation(true);
  },
  _resetComponentsAnimation(isFirstDrawing) {
    this.series.forEach(function (s) {
      s.resetApplyingAnimation(isFirstDrawing);
    });
    this._resetAxesAnimation(isFirstDrawing);
  },
  _resetAxesAnimation: _common.noop,
  _refreshSeries(actionName) {
    this.needToPopulateSeries = true;
    this._requestChange([actionName]);
  },
  _change_CORRECT_AXIS() {
    this._correctAxes();
  },
  _doRefresh() {
    var methodName = this._currentRefreshData;
    if (methodName) {
      this._currentRefreshData = null;
      this._renderer.stopAllAnimations(true);
      this[methodName]();
    }
  },
  _updateCanvasClipRect(canvas) {
    var width = Math.max(canvas.width - canvas.left - canvas.right, 0);
    var height = Math.max(canvas.height - canvas.top - canvas.bottom, 0);
    this._canvasClipRect.attr({
      x: canvas.left,
      y: canvas.top,
      width,
      height
    });
    this._backgroundRect.attr({
      x: canvas.left,
      y: canvas.top,
      width,
      height
    });
  },
  _getCanvasClipRectID() {
    return this._canvasClipRect.id;
  },
  _dataSourceChangedHandler() {
    if (this._changes.has('INIT')) {
      this._requestChange(['DATA_INIT']);
    } else {
      this._requestChange(['FORCE_DATA_INIT']);
    }
  },
  _dataInit() {
    this._dataSpecificInit(true);
  },
  _processSingleSeries(singleSeries) {
    singleSeries.createPoints(false);
  },
  _handleSeriesDataUpdated() {
    var _this6 = this;
    if (this._getVisibleSeries().some(function (s) {
      return s.useAggregation();
    })) {
      this._populateMarginOptions();
    }
    this.series.forEach(function (s) {
      return _this6._processSingleSeries(s);
    }, this);
  },
  _dataSpecificInit(needRedraw) {
    if (!this.series || this.needToPopulateSeries) {
      this.series = this._populateSeries();
    }
    this._repopulateSeries();
    this._seriesPopulatedHandlerCore();
    this._populateBusinessRange();
    this._tracker.updateSeries(this.series, this._changes.has('INIT'));
    this._updateLegend();
    if (needRedraw) {
      this._requestChange(['FULL_RENDER']);
    }
    // needRedraw && that._forceRender();
  },

  _forceRender() {
    this._doRender({
      force: true
    });
  },
  _repopulateSeries() {
    var themeManager = this._themeManager;
    var data = this._dataSourceItems();
    var dataValidatorOptions = themeManager.getOptions('dataPrepareSettings');
    var seriesTemplate = themeManager.getOptions('seriesTemplate');
    if (seriesTemplate) {
      this._populateSeries(data);
    }
    this._groupSeries();
    var parsedData = (0, _data_validator.validateData)(data, this._groupsData, this._incidentOccurred, dataValidatorOptions);
    themeManager.resetPalette();
    this.series.forEach(function (singleSeries) {
      singleSeries.updateData(parsedData[singleSeries.getArgumentField()]);
    });
    this._handleSeriesDataUpdated();
  },
  _renderCompleteHandler() {
    var allSeriesInited = true;
    if (this._needHandleRenderComplete) {
      this.series.forEach(function (s) {
        allSeriesInited = allSeriesInited && s.canRenderCompleteHandle();
      });
      if (allSeriesInited) {
        this._needHandleRenderComplete = false;
        this._eventTrigger('done', {
          target: this
        });
      }
    }
  },
  _dataIsReady() {
    // In order to support scenario when chart is created without "dataSource" and it is considered
    // as data is being loaded the check for state of "dataSource" option is added
    return (0, _type.isDefined)(this.option('dataSource')) && this._dataIsLoaded();
  },
  _populateSeriesOptions(data) {
    var _this7 = this;
    var themeManager = this._themeManager;
    var seriesTemplate = themeManager.getOptions('seriesTemplate');
    var seriesOptions = seriesTemplate ? (0, _utils.processSeriesTemplate)(seriesTemplate, data || []) : this.option('series');
    var allSeriesOptions = isArray(seriesOptions) ? seriesOptions : seriesOptions ? [seriesOptions] : [];
    var extraOptions = this._getExtraOptions();
    var particularSeriesOptions;
    var seriesTheme;
    var seriesThemes = [];
    var seriesVisibilityChanged = function seriesVisibilityChanged(target) {
      _this7._specialProcessSeries();
      _this7._populateBusinessRange(target && target.getValueAxis(), true);
      _this7._renderer.stopAllAnimations(true);
      _this7._updateLegend();
      _this7._requestChange(['FULL_RENDER']);
    };
    for (var i = 0; i < allSeriesOptions.length; i++) {
      particularSeriesOptions = (0, _extend.extend)(true, {}, allSeriesOptions[i], extraOptions);
      if (!(0, _type.isDefined)(particularSeriesOptions.name) || particularSeriesOptions.name === '') {
        particularSeriesOptions.name = "Series ".concat((i + 1).toString());
      }
      particularSeriesOptions.rotated = this._isRotated();
      particularSeriesOptions.customizePoint = themeManager.getOptions('customizePoint');
      particularSeriesOptions.customizeLabel = themeManager.getOptions('customizeLabel');
      particularSeriesOptions.visibilityChanged = seriesVisibilityChanged;
      particularSeriesOptions.incidentOccurred = this._incidentOccurred;
      seriesTheme = themeManager.getOptions('series', particularSeriesOptions, allSeriesOptions.length);
      if (this._checkPaneName(seriesTheme)) {
        seriesThemes.push(seriesTheme);
      }
    }
    return seriesThemes;
  },
  _populateSeries(data) {
    var _this8 = this;
    var _a;
    var seriesBasis = [];
    var incidentOccurred = this._incidentOccurred;
    var seriesThemes = this._populateSeriesOptions(data);
    var particularSeries;
    var disposeSeriesFamilies = false;
    this.needToPopulateSeries = false;
    seriesThemes.forEach(function (theme) {
      var _a;
      var findSeries = function findSeries(s) {
        return s.name === theme.name && !seriesBasis.map(function (sb) {
          return sb.series;
        }).includes(s);
      };
      var curSeries = (_a = _this8.series) === null || _a === void 0 ? void 0 : _a.find(findSeries);
      if (curSeries && curSeries.type === theme.type) {
        seriesBasis.push({
          series: curSeries,
          options: theme
        });
      } else {
        seriesBasis.push({
          options: theme
        });
        disposeSeriesFamilies = true;
      }
    });
    ((_a = this.series) === null || _a === void 0 ? void 0 : _a.length) !== 0 && this._tracker.clearHover();
    (0, _iterator.reverseEach)(this.series, function (index, series) {
      if (!seriesBasis.some(function (s) {
        return series === s.series;
      })) {
        _this8._disposeSeries(index);
        disposeSeriesFamilies = true;
      }
    });
    !disposeSeriesFamilies && (disposeSeriesFamilies = seriesBasis.some(function (sb) {
      return sb.series.name !== seriesThemes[sb.series.index].name;
    }));
    this.series = [];
    disposeSeriesFamilies && this._disposeSeriesFamilies();
    this._themeManager.resetPalette();
    var eventPipe = function eventPipe(data) {
      _this8.series.forEach(function (currentSeries) {
        currentSeries.notify(data);
      });
    };
    seriesBasis.forEach(function (basis) {
      var _a, _b;
      var seriesTheme = basis.options;
      var argumentAxis = (_b = (_a = _this8._argumentAxes) === null || _a === void 0 ? void 0 : _a.filter(function (a) {
        return a.pane === seriesTheme.pane;
      })[0]) !== null && _b !== void 0 ? _b : _this8.getArgumentAxis();
      var renderSettings = {
        commonSeriesModes: _this8._getSelectionModes(),
        argumentAxis,
        valueAxis: _this8._getValueAxis(seriesTheme.pane, seriesTheme.axis)
      };
      if (basis.series) {
        particularSeries = basis.series;
        particularSeries.updateOptions(seriesTheme, renderSettings);
      } else {
        particularSeries = new _base_series.Series((0, _extend.extend)({
          renderer: _this8._renderer,
          seriesGroup: _this8._seriesGroup,
          labelsGroup: _this8._labelsGroup,
          eventTrigger: _this8._eventTrigger,
          eventPipe,
          incidentOccurred
        }, renderSettings), seriesTheme);
      }
      if (!particularSeries.isUpdated) {
        incidentOccurred('E2101', [seriesTheme.type]);
      } else {
        particularSeries.index = _this8.series.length;
        _this8.series.push(particularSeries);
      }
    });
    return this.series;
  },
  getStackedPoints(point) {
    var stackName = point.series.getStackName();
    return this._getVisibleSeries().reduce(function (stackPoints, series) {
      if (!(0, _type.isDefined)(series.getStackName()) || !(0, _type.isDefined)(stackName) || stackName === series.getStackName()) {
        stackPoints = stackPoints.concat(series.getPointsByArg(point.argument));
      }
      return stackPoints;
    }, []);
  },
  // API
  getAllSeries: function getAllSeries() {
    return (this.series || []).slice();
  },
  getSeriesByName: function getSeriesByName(name) {
    var found = (this.series || []).find(function (singleSeries) {
      return singleSeries.name === name;
    });
    return found || null;
  },
  getSeriesByPos: function getSeriesByPos(pos) {
    return (this.series || [])[pos];
  },
  clearSelection: function clearSelection() {
    this._tracker.clearSelection();
  },
  hideTooltip() {
    this._tracker._hideTooltip();
  },
  clearHover() {
    this._tracker.clearHover();
  },
  render(renderOptions) {
    this.__renderOptions = renderOptions;
    this.__forceRender = renderOptions && renderOptions.force;
    this.callBase.apply(this, arguments);
    this.__renderOptions = this.__forceRender = null;
    return this;
  },
  refresh() {
    this._disposeSeries();
    this._disposeSeriesFamilies();
    this._requestChange(['CONTAINER_SIZE', 'REFRESH_SERIES_REINIT']);
  },
  _getMinSize() {
    var adaptiveLayout = this._layoutManagerOptions();
    return [adaptiveLayout.width, adaptiveLayout.height];
  },
  _change_REFRESH() {
    if (!this._changes.has('INIT')) {
      this._doRefresh();
    } else {
      this._currentRefreshData = null;
    }
  },
  _change_FULL_RENDER() {
    this._forceRender();
  },
  _change_INIT() {
    this._reinit();
  },
  _stopCurrentHandling() {
    this._tracker.stopCurrentHandling();
  }
});
exports.BaseChart = BaseChart;
REFRESH_SERIES_DATA_INIT_ACTION_OPTIONS.forEach(function (name) {
  BaseChart.prototype._optionChangesMap[name] = 'REFRESH_SERIES_DATA_INIT';
});
FORCE_RENDER_REFRESH_ACTION_OPTIONS.forEach(function (name) {
  BaseChart.prototype._optionChangesMap[name] = 'FORCE_RENDER';
});
REFRESH_SERIES_FAMILIES_ACTION_OPTIONS.forEach(function (name) {
  BaseChart.prototype._optionChangesMap[name] = 'REFRESH_SERIES_FAMILIES';
});
BaseChart.addPlugin(_export.plugin);
BaseChart.addPlugin(_title.plugin);
BaseChart.addPlugin(_data_source.plugin);
BaseChart.addPlugin(_tooltip.plugin);
BaseChart.addPlugin(_loading_indicator.plugin);
// These are charts specifics on using title - they cannot be omitted because of charts custom layout.
// eslint-disable-next-line
var _change_TITLE = BaseChart.prototype._change_TITLE;
BaseChart.prototype._change_TITLE = function () {
  _change_TITLE.apply(this, arguments);
  this._change(['FORCE_RENDER']);
};