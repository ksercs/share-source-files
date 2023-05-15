!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/series/points/base_point.js"], ["../../components/consts","./symbol_point","./bar_point","./bubble_point","./pie_point","./range_symbol_point","./range_bar_point","./candlestick_point","./stock_point","./polar_point","../../core/utils","../../../core/utils/extend","../../../core/utils/type","../../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/series/points/base_point.js", ["../../components/consts", "./symbol_point", "./bar_point", "./bubble_point", "./pie_point", "./range_symbol_point", "./range_bar_point", "./candlestick_point", "./stock_point", "./polar_point", "../../core/utils", "../../../core/utils/extend", "../../../core/utils/type", "../../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.Point = Point;
  var _consts = _interopRequireDefault($__require("../../components/consts"));
  var _symbol_point = _interopRequireDefault($__require("./symbol_point"));
  var _bar_point = _interopRequireDefault($__require("./bar_point"));
  var _bubble_point = _interopRequireDefault($__require("./bubble_point"));
  var _pie_point = _interopRequireDefault($__require("./pie_point"));
  var _range_symbol_point = _interopRequireDefault($__require("./range_symbol_point"));
  var _range_bar_point = _interopRequireDefault($__require("./range_bar_point"));
  var _candlestick_point = _interopRequireDefault($__require("./candlestick_point"));
  var _stock_point = _interopRequireDefault($__require("./stock_point"));
  var _polar_point = $__require("./polar_point");
  var _utils = $__require("../../core/utils");
  var _extend2 = $__require("../../../core/utils/extend");
  var _type = $__require("../../../core/utils/type");
  var _common = $__require("../../../core/utils/common");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var mixins = {};
  var _extend = _extend2.extend;
  var statesConsts = _consts.default.states;
  var SYMBOL_POINT = 'symbolPoint';
  var POLAR_SYMBOL_POINT = 'polarSymbolPoint';
  var BAR_POINT = 'barPoint';
  var POLAR_BAR_POINT = 'polarBarPoint';
  var PIE_POINT = 'piePoint';
  var SELECTED_STATE = statesConsts.selectedMark;
  var HOVER_STATE = statesConsts.hoverMark;
  var NORMAL_STATE = statesConsts.normalMark;
  var HOVER = statesConsts.hover;
  var NORMAL = statesConsts.normal;
  var SELECTION = statesConsts.selection;
  var pointTypes = {
    chart: {
      'scatter': SYMBOL_POINT,
      'line': SYMBOL_POINT,
      'spline': SYMBOL_POINT,
      'stepline': SYMBOL_POINT,
      'stackedline': SYMBOL_POINT,
      'fullstackedline': SYMBOL_POINT,
      'stackedspline': SYMBOL_POINT,
      'fullstackedspline': SYMBOL_POINT,
      'stackedsplinearea': SYMBOL_POINT,
      'fullstackedsplinearea': SYMBOL_POINT,
      'area': SYMBOL_POINT,
      'splinearea': SYMBOL_POINT,
      'steparea': SYMBOL_POINT,
      'stackedarea': SYMBOL_POINT,
      'fullstackedarea': SYMBOL_POINT,
      'rangearea': 'rangeSymbolPoint',
      'bar': BAR_POINT,
      'stackedbar': BAR_POINT,
      'fullstackedbar': BAR_POINT,
      'rangebar': 'rangeBarPoint',
      'bubble': 'bubblePoint',
      'stock': 'stockPoint',
      'candlestick': 'candlestickPoint'
    },
    pie: {
      'pie': PIE_POINT,
      'doughnut': PIE_POINT,
      'donut': PIE_POINT
    },
    polar: {
      'scatter': POLAR_SYMBOL_POINT,
      'line': POLAR_SYMBOL_POINT,
      'area': POLAR_SYMBOL_POINT,
      'bar': POLAR_BAR_POINT,
      'stackedbar': POLAR_BAR_POINT
    }
  };
  function isNoneMode(mode) {
    return (0, _utils.normalizeEnum)(mode) === 'none';
  }
  function Point(series, dataItem, options) {
    this.fullState = NORMAL_STATE;
    this.series = series;
    this.update(dataItem, options);
    this._viewCounters = {
      hover: 0,
      selection: 0
    };
    this._emptySettings = {
      fill: null,
      stroke: null,
      dashStyle: null,
      filter: null
    };
  }
  mixins.symbolPoint = _symbol_point.default;
  mixins.barPoint = _bar_point.default;
  mixins.bubblePoint = _bubble_point.default;
  mixins.piePoint = _pie_point.default;
  mixins.rangeSymbolPoint = _range_symbol_point.default;
  mixins.rangeBarPoint = _range_bar_point.default;
  mixins.candlestickPoint = _candlestick_point.default;
  mixins.stockPoint = _stock_point.default;
  mixins.polarSymbolPoint = _polar_point.polarSymbolPoint;
  mixins.polarBarPoint = _polar_point.polarBarPoint;
  Point.prototype = {
    constructor: Point,
    getColor: function getColor() {
      if (!this.hasValue() && !this._styles.usePointCustomOptions) {
        this.series.customizePoint(this, this._dataItem);
      }
      return this._styles.normal.fill || this.series.getColor();
    },
    _getStyle: function _getStyle() {
      return this._styles[this._currentStyle || 'normal'];
    },
    update: function update(dataItem, options) {
      this.updateOptions(options);
      this.updateData(dataItem);
    },
    updateData: function updateData(dataItem) {
      var that = this;
      var argumentWasChanged = that.argument !== dataItem.argument;
      that.argument = that.initialArgument = that.originalArgument = dataItem.argument;
      that.tag = dataItem.tag;
      that.index = dataItem.index;
      that._dataItem = dataItem;
      that.data = dataItem.data;
      that.lowError = dataItem.lowError;
      that.highError = dataItem.highError;
      that.aggregationInfo = dataItem.aggregationInfo;
      that._updateData(dataItem, argumentWasChanged);
      !that.hasValue() && that.setInvisibility();
      that._fillStyle();
      that._updateLabelData();
    },
    deleteMarker: function deleteMarker() {
      var that = this;
      if (that.graphic) {
        that.graphic.dispose();
      }
      that.graphic = null;
    },
    draw: function draw(renderer, groups, animationEnabled, firstDrawing) {
      var that = this;
      if (that._needDeletingOnDraw || that.series.autoHidePointMarkers && !that.isSelected()) {
        that.deleteMarker();
        that._needDeletingOnDraw = false;
      }
      if (that._needClearingOnDraw) {
        that.clearMarker();
        that._needClearingOnDraw = false;
      }
      if (!that._hasGraphic()) {
        that.getMarkerVisibility() && !that.series.autoHidePointMarkers && that._drawMarker(renderer, groups.markers, animationEnabled, firstDrawing);
      } else {
        that._updateMarker(animationEnabled, this._getStyle(), groups.markers);
      }
      that._drawLabel();
      that._drawErrorBar(renderer, groups.errorBars, animationEnabled);
      return that;
    },
    _getViewStyle: function _getViewStyle() {
      var state = NORMAL_STATE;
      var fullState = this.fullState;
      var styles = [NORMAL, HOVER, SELECTION, SELECTION];
      if (this._viewCounters.hover) {
        state |= HOVER_STATE;
      }
      if (this._viewCounters.selection) {
        state |= SELECTED_STATE;
      }
      if (isNoneMode(this.getOptions().selectionMode)) {
        fullState &= ~SELECTED_STATE;
      }
      if (isNoneMode(this.getOptions().hoverMode)) {
        fullState &= ~HOVER_STATE;
      }
      state |= fullState;
      return styles[state];
    },
    applyView: function applyView(legendCallback) {
      var that = this;
      var style = that._getViewStyle();
      that._currentStyle = style;
      if (!that.graphic && that.getMarkerVisibility() && that.series.autoHidePointMarkers && (style === SELECTION || style === HOVER)) {
        that._drawMarker(that.series.getRenderer(), that.series.getMarkersGroup());
      }
      if (that.graphic) {
        if (that.series.autoHidePointMarkers && style !== SELECTION && style !== HOVER) {
          that.deleteMarker();
        } else {
          if (style === 'normal') {
            that.clearMarker();
          } else {
            that.graphic.toForeground();
          }
          that._updateMarker(true, that._styles[style], undefined, legendCallback);
        }
      }
    },
    setView: function setView(style) {
      this._viewCounters[style]++;
      this.applyView();
    },
    resetView: function resetView(style) {
      var viewCounters = this._viewCounters;
      --viewCounters[style];
      if (viewCounters[style] < 0) {
        // T661080
        viewCounters[style] = 0;
      }
      this.applyView();
    },
    releaseHoverState: function releaseHoverState() {
      var that = this;
      if (that.graphic && !that.isSelected()) {
        that.graphic.toBackground();
      }
    },
    select: function select() {
      this.series.selectPoint(this);
    },
    clearSelection: function clearSelection() {
      this.series.deselectPoint(this);
    },
    hover: function hover() {
      this.series.hoverPoint(this);
    },
    clearHover: function clearHover() {
      this.series.clearPointHover();
    },
    showTooltip: function showTooltip() {
      this.series.showPointTooltip(this);
    },
    hideTooltip: function hideTooltip() {
      this.series.hidePointTooltip(this);
    },
    _checkLabelsChanging: function _checkLabelsChanging(oldType, newType) {
      var isNewRange = ~newType.indexOf('range');
      var isOldRange = ~oldType.indexOf('range');
      return isOldRange && !isNewRange || !isOldRange && isNewRange;
    },
    updateOptions: function updateOptions(newOptions) {
      if (!newOptions) {
        return;
      }
      var that = this;
      var oldOptions = that._options;
      var widgetType = newOptions.widgetType;
      var oldType = oldOptions && oldOptions.type;
      var newType = newOptions.type;
      var newPointTypeMixin = pointTypes[widgetType][newType];
      if (oldType !== newType) {
        that._needDeletingOnDraw = true;
        that._needClearingOnDraw = false;
        if (oldType) {
          that._checkLabelsChanging(oldType, newType) && that.deleteLabel();
          that._resetType(mixins[pointTypes[oldType]]);
        }
        that._setType(mixins[newPointTypeMixin]);
      } else {
        that._needDeletingOnDraw = that._checkSymbol(oldOptions, newOptions);
        that._needClearingOnDraw = that._checkCustomize(oldOptions, newOptions);
      }
      that._options = newOptions;
      that._fillStyle();
      that._updateLabelOptions(newPointTypeMixin);
    },
    translate: function translate() {
      if (this.hasValue()) {
        this._translate();
        this.translated = true;
      }
    },
    _checkCustomize: function _checkCustomize(oldOptions, newOptions) {
      return oldOptions.styles.usePointCustomOptions && !newOptions.styles.usePointCustomOptions;
    },
    _getCustomLabelVisibility: function _getCustomLabelVisibility() {
      return this._styles.useLabelCustomOptions ? !!this._options.label.visible : null;
    },
    getBoundingRect: function getBoundingRect() {
      return this._getGraphicBBox();
    },
    _resetType: function _resetType(methods) {
      for (var methodName in methods) {
        delete this[methodName];
      }
    },
    _setType: function _setType(methods) {
      for (var methodName in methods) {
        this[methodName] = methods[methodName];
      }
    },
    isInVisibleArea: function isInVisibleArea() {
      return this.inVisibleArea;
    },
    isSelected: function isSelected() {
      return !!(this.fullState & SELECTED_STATE);
    },
    isHovered: function isHovered() {
      return !!(this.fullState & HOVER_STATE);
    },
    getOptions: function getOptions() {
      return this._options;
    },
    animate: function animate(complete, settings, partitionDuration) {
      if (!this.graphic) {
        complete && complete();
        return;
      }
      this.graphic.animate(settings, {
        partitionDuration: partitionDuration
      }, complete);
    },
    getCoords: function getCoords(min) {
      var that = this;
      if (!min) {
        return {
          x: that.x,
          y: that.y
        };
      }
      if (!that._options.rotated) {
        return {
          x: that.x,
          y: that.minY + (that.y - that.minY ? 0 : 1)
        };
      }
      return {
        x: that.minX - (that.x - that.minX ? 0 : 1),
        y: that.y
      };
    },
    getDefaultCoords: function getDefaultCoords() {
      var that = this;
      return !that._options.rotated ? {
        x: that.x,
        y: that.defaultY
      } : {
        x: that.defaultX,
        y: that.y
      };
    },
    setDefaultCoords: function setDefaultCoords() {
      var coords = this.getDefaultCoords();
      this.x = coords.x;
      this.y = coords.y;
    },
    _getVisibleArea: function _getVisibleArea() {
      return this.series.getVisibleArea();
    },
    _getArgTranslator: function _getArgTranslator() {
      return this.series.getArgumentAxis().getTranslator();
    },
    _getValTranslator: function _getValTranslator() {
      return this.series.getValueAxis().getTranslator();
    },
    isArgumentCorrect: function isArgumentCorrect() {
      return this.series._argumentChecker(this.argument);
    },
    isValueCorrect: function isValueCorrect() {
      var valueChecker = this.series._valueChecker;
      return valueChecker(this.getMinValue()) && valueChecker(this.getMaxValue());
    },
    hasValue: function hasValue() {
      return this.value !== null && this.minValue !== null && this.isArgumentCorrect() && this.isValueCorrect();
    },
    hasCoords: _common.noop,
    correctPosition: _common.noop,
    correctRadius: _common.noop,
    correctLabelRadius: _common.noop,
    getCrosshairData: _common.noop,
    getPointRadius: _common.noop,
    _populatePointShape: _common.noop,
    _checkSymbol: _common.noop,
    getMarkerCoords: _common.noop,
    hide: _common.noop,
    show: _common.noop,
    hideMarker: _common.noop,
    setInvisibility: _common.noop,
    clearVisibility: _common.noop,
    isVisible: _common.noop,
    resetCorrection: _common.noop,
    correctValue: _common.noop,
    resetValue: _common.noop,
    setPercentValue: _common.noop,
    correctCoordinates: _common.noop,
    coordsIn: _common.noop,
    getTooltipParams: _common.noop,
    applyWordWrap: _common.noop,
    setLabelTrackerData: _common.noop,
    updateLabelCoord: _common.noop,
    drawLabel: _common.noop,
    correctLabelPosition: _common.noop,
    getMinValue: _common.noop,
    getMaxValue: _common.noop,
    _drawErrorBar: _common.noop,
    getMarkerVisibility: _common.noop,
    dispose: function dispose() {
      var that = this;
      that.deleteMarker();
      that.deleteLabel();
      that._errorBar && this._errorBar.dispose();
      that._options = that._styles = that.series = that._errorBar = null;
    },
    getTooltipFormatObject: function getTooltipFormatObject(tooltip, stackPoints) {
      var that = this;
      var tooltipFormatObject = that._getFormatObject(tooltip);
      var sharedTooltipValuesArray = [];
      var tooltipStackPointsFormatObject = [];
      if (stackPoints) {
        stackPoints.forEach(function (point) {
          if (!point.isVisible()) return;
          var formatObject = point._getFormatObject(tooltip);
          tooltipStackPointsFormatObject.push(formatObject);
          sharedTooltipValuesArray.push(formatObject.seriesName + ': ' + formatObject.valueText);
        });
        _extend(tooltipFormatObject, {
          points: tooltipStackPointsFormatObject,
          valueText: sharedTooltipValuesArray.join('\n'),
          stackName: that.series.getStackName() || null
        });
      }
      var aggregationInfo = that.aggregationInfo;
      if (aggregationInfo) {
        var axis = that.series.getArgumentAxis();
        var rangeText = axis.formatRange(aggregationInfo.intervalStart, aggregationInfo.intervalEnd, aggregationInfo.aggregationInterval, tooltip.getOptions().argumentFormat);
        if (rangeText) {
          tooltipFormatObject.valueText += "\n".concat(rangeText);
        }
      }
      return tooltipFormatObject;
    },
    setHole: function setHole(holeValue, position) {
      var that = this;
      var minValue = isFinite(that.minValue) ? that.minValue : 0;
      if ((0, _type.isDefined)(holeValue)) {
        if (position === 'left') {
          that.leftHole = that.value - holeValue;
          that.minLeftHole = minValue - holeValue;
        } else {
          that.rightHole = that.value - holeValue;
          that.minRightHole = minValue - holeValue;
        }
      }
    },
    resetHoles: function resetHoles() {
      this.leftHole = null;
      this.minLeftHole = null;
      this.rightHole = null;
      this.minRightHole = null;
    },
    getLabel: function getLabel() {
      return this._label;
    },
    getLabels: function getLabels() {
      return [this._label];
    },
    getCenterCoord: function getCenterCoord() {
      return {
        x: this.x,
        y: this.y
      };
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../components/consts","./symbol_point","./bar_point","./bubble_point","./pie_point","./range_symbol_point","./range_bar_point","./candlestick_point","./stock_point","./polar_point","../../core/utils","../../../core/utils/extend","../../../core/utils/type","../../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../components/consts"), require("./symbol_point"), require("./bar_point"), require("./bubble_point"), require("./pie_point"), require("./range_symbol_point"), require("./range_bar_point"), require("./candlestick_point"), require("./stock_point"), require("./polar_point"), require("../../core/utils"), require("../../../core/utils/extend"), require("../../../core/utils/type"), require("../../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=base_point.js.map