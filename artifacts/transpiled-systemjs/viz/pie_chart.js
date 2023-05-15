!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/pie_chart.js"], ["./components/consts","./core/utils","../core/utils/extend","../core/utils/type","../core/utils/iterator","./translators/range","../core/component_registrator","./chart_components/base_chart","../core/utils/common","./translators/translator1d","./core/annotations","./core/center_template"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/pie_chart.js", ["./components/consts", "./core/utils", "../core/utils/extend", "../core/utils/type", "../core/utils/iterator", "./translators/range", "../core/component_registrator", "./chart_components/base_chart", "../core/utils/common", "./translators/translator1d", "./core/annotations", "./core/center_template"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _consts = _interopRequireDefault($__require("./components/consts"));
  var _utils = $__require("./core/utils");
  var _extend2 = $__require("../core/utils/extend");
  var _type = $__require("../core/utils/type");
  var _iterator = $__require("../core/utils/iterator");
  var _range = $__require("./translators/range");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _base_chart = $__require("./chart_components/base_chart");
  var _common = $__require("../core/utils/common");
  var _translator1d = $__require("./translators/translator1d");
  var _annotations = $__require("./core/annotations");
  var _center_template = $__require("./core/center_template");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var states = _consts.default.states;
  var seriesSpacing = _consts.default.pieSeriesSpacing;
  var OPTIONS_FOR_REFRESH_SERIES = ['startAngle', 'innerRadius', 'segmentsDirection', 'type'];
  var NORMAL_STATE = states.normalMark;
  var HOVER_STATE = states.hoverMark;
  var SELECTED_STATE = states.selectedMark;
  var MAX_RESOLVE_ITERATION_COUNT = 5;
  var LEGEND_ACTIONS = [states.resetItem, states.applyHover, states.applySelected, states.applySelected];
  function getLegendItemAction(points) {
    var state = NORMAL_STATE;
    points.forEach(function (point) {
      var _point$series;
      var seriesOptions = (_point$series = point.series) === null || _point$series === void 0 ? void 0 : _point$series.getOptions();
      var pointState = point.fullState;
      if ((seriesOptions === null || seriesOptions === void 0 ? void 0 : seriesOptions.hoverMode) === 'none') {
        pointState &= ~HOVER_STATE;
      }
      if ((seriesOptions === null || seriesOptions === void 0 ? void 0 : seriesOptions.selectionMode) === 'none') {
        pointState &= ~SELECTED_STATE;
      }
      state = state | pointState;
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
      queue: function queue(pie) {
        var group = pie.getSizeGroup();
        pies = addToList(pies, pie);
        clearTimeout(timers[group]);
        timers[group] = setTimeout(function () {
          equalize(group, pies);
        });
      },
      remove: function remove(pie) {
        pies = removeFromList(pies, pie);
        if (!pies.length) {
          timers = {};
        }
      }
    };
  }();
  var dxPieChart = _base_chart.BaseChart.inherit({
    _themeSection: 'pie',
    _layoutManagerOptions: function _layoutManagerOptions() {
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
    _disposeCore: function _disposeCore() {
      pieSizeEqualizer.remove(this);
      this.callBase();
    },
    _groupSeries: function _groupSeries() {
      var series = this.series;
      this._groupsData = {
        groups: [{
          series: series,
          valueOptions: {
            valueType: 'numeric'
          }
        }],
        argumentOptions: series[0] && series[0].getOptions()
      };
    },
    getArgumentAxis: function getArgumentAxis() {
      return null;
    },
    _getValueAxis: function _getValueAxis() {
      var translator = new _translator1d.Translator1D().setCodomain(360, 0);
      return {
        getTranslator: function getTranslator() {
          return translator;
        },
        setBusinessRange: function setBusinessRange(range) {
          translator.setDomain(range.min, range.max);
        }
      };
    },
    _populateBusinessRange: function _populateBusinessRange() {
      this.series.map(function (series) {
        var range = new _range.Range();
        range.addRange(series.getRangeData().val);
        series.getValueAxis().setBusinessRange(range);
        return range;
      });
    },
    _specialProcessSeries: function _specialProcessSeries() {
      (0, _iterator.each)(this.series, function (_, singleSeries) {
        singleSeries.arrangePoints();
      });
    },
    _checkPaneName: function _checkPaneName() {
      return true;
    },
    _processSingleSeries: function _processSingleSeries(singleSeries) {
      this.callBase(singleSeries);
      singleSeries.arrangePoints();
    },
    _handleSeriesDataUpdated: function _handleSeriesDataUpdated() {
      var maxPointCount = 0;
      this.series.forEach(function (s) {
        maxPointCount = Math.max(s.getPointsCount(), maxPointCount);
      });
      this.series.forEach(function (s) {
        s.setMaxPointsCount(maxPointCount);
      });
      this.callBase();
    },
    _getLegendOptions: function _getLegendOptions(item) {
      var legendItem = this.callBase(item);
      var legendData = legendItem.legendData;
      legendData.argument = item.argument;
      legendData.argumentIndex = item.argumentIndex;
      legendData.points = [item];
      return legendItem;
    },
    _getLegendTargets: function _getLegendTargets() {
      var that = this;
      var itemsByArgument = {};
      (that.series || []).forEach(function (series) {
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
            items.push(that._getLegendOptions(point));
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
    _getLayoutTargets: function _getLayoutTargets() {
      return [{
        canvas: this._canvas
      }];
    },
    _getLayoutSeries: function _getLayoutSeries(series, drawOptions) {
      var that = this;
      var layout;
      var canvas = that._canvas;
      var drawnLabels = false;
      layout = that.layoutManager.applyPieChartSeriesLayout(canvas, series, true);
      series.forEach(function (singleSeries) {
        singleSeries.correctPosition(layout, canvas);
        drawnLabels = singleSeries.drawLabelsWOPoints() || drawnLabels;
      });
      if (drawnLabels) {
        layout = that.layoutManager.applyPieChartSeriesLayout(canvas, series, drawOptions.hideLayoutLabels);
      }
      series.forEach(function (singleSeries) {
        singleSeries.hideLabels();
      });
      that._sizeGroupLayout = {
        x: layout.centerX,
        y: layout.centerY,
        radius: layout.radiusOuter,
        drawOptions: drawOptions
      };
      return layout;
    },
    _getLayoutSeriesForEqualPies: function _getLayoutSeriesForEqualPies(series, sizeGroupLayout) {
      var canvas = this._canvas;
      var layout = this.layoutManager.applyEqualPieChartLayout(series, sizeGroupLayout);
      series.forEach(function (s) {
        s.correctPosition(layout, canvas);
        s.drawLabelsWOPoints();
      });
      this.layoutManager.correctPieLabelRadius(series, layout, canvas);
      return layout;
    },
    _updateSeriesDimensions: function _updateSeriesDimensions(drawOptions) {
      var that = this;
      var visibleSeries = that._getVisibleSeries();
      var lengthVisibleSeries = visibleSeries.length;
      var innerRad;
      var delta;
      var layout;
      var sizeGroupLayout = drawOptions.sizeGroupLayout;
      if (lengthVisibleSeries) {
        layout = sizeGroupLayout ? that._getLayoutSeriesForEqualPies(visibleSeries, sizeGroupLayout) : that._getLayoutSeries(visibleSeries, drawOptions);
        delta = (layout.radiusOuter - layout.radiusInner - seriesSpacing * (lengthVisibleSeries - 1)) / lengthVisibleSeries;
        innerRad = layout.radiusInner;
        that._setGeometry(layout);
        visibleSeries.forEach(function (singleSeries) {
          singleSeries.correctRadius({
            radiusInner: innerRad,
            radiusOuter: innerRad + delta
          });
          innerRad += delta + seriesSpacing;
        });
      }
    },
    _renderSeries: function _renderSeries(drawOptions, isRotated, isLegendInside) {
      this._calculateSeriesLayout(drawOptions, isRotated);
      if (!drawOptions.sizeGroupLayout && this.getSizeGroup()) {
        pieSizeEqualizer.queue(this);
        this._clearCanvas();
        return;
      }
      this._renderSeriesElements(drawOptions, isLegendInside);
    },
    _getCenter: function _getCenter() {
      return this._center;
    },
    getInnerRadius: function getInnerRadius() {
      return this._innerRadius;
    },
    _getLegendCallBack: function _getLegendCallBack() {
      var that = this;
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
          that.series.forEach(function (series) {
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
    _locateLabels: function _locateLabels(resolveLabelOverlapping) {
      var iterationCount = 0;
      var labelsWereOverlapped;
      var wordWrapApplied;
      do {
        wordWrapApplied = this._adjustSeriesLabels(resolveLabelOverlapping === 'shift');
        labelsWereOverlapped = this._resolveLabelOverlapping(resolveLabelOverlapping);
      } while ((labelsWereOverlapped || wordWrapApplied) && ++iterationCount < MAX_RESOLVE_ITERATION_COUNT);
    },
    _adjustSeriesLabels: function _adjustSeriesLabels(moveLabelsFromCenter) {
      return this.series.reduce(function (r, s) {
        return s.adjustLabels(moveLabelsFromCenter) || r;
      }, false);
    },
    _applyExtraSettings: _common.noop,
    _resolveLabelOverlappingShift: function _resolveLabelOverlappingShift() {
      var that = this;
      var inverseDirection = that.option('segmentsDirection') === 'anticlockwise';
      var seriesByPosition = that.series.reduce(function (r, s) {
        (r[s.getOptions().label.position] || r.outside).push(s);
        return r;
      }, {
        inside: [],
        columns: [],
        outside: []
      });
      var labelsOverlapped = false;
      if (seriesByPosition.inside.length > 0) {
        labelsOverlapped = resolve(seriesByPosition.inside.reduce(function (r, singleSeries) {
          return singleSeries.getVisiblePoints().reduce(function (r, point) {
            r.left.push(point);
            return r;
          }, r);
        }, {
          left: [],
          right: []
        }), shiftInColumnFunction) || labelsOverlapped;
      }
      labelsOverlapped = seriesByPosition.columns.reduce(function (r, singleSeries) {
        return resolve(dividePoints(singleSeries), shiftInColumnFunction) || r;
      }, labelsOverlapped);
      if (seriesByPosition.outside.length > 0) {
        labelsOverlapped = resolve(seriesByPosition.outside.reduce(function (r, singleSeries) {
          return dividePoints(singleSeries, r);
        }, null), shiftFunction) || labelsOverlapped;
      }
      return labelsOverlapped;
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
      function resolve(points, shiftCallback) {
        var overlapped = false;
        if (inverseDirection) {
          points.left.reverse();
          points.right.reverse();
        }
        overlapped = _base_chart.overlapping.resolveLabelOverlappingInOneDirection(points.left, that._canvas, false, false, shiftCallback);
        return _base_chart.overlapping.resolveLabelOverlappingInOneDirection(points.right, that._canvas, false, false, shiftCallback) || overlapped;
      }
      function shiftFunction(box, length) {
        return (0, _utils.getVerticallyShiftedAngularCoords)(box, -length, that._center);
      }
      function shiftInColumnFunction(box, length) {
        return {
          x: box.x,
          y: box.y - length
        };
      }
    },
    _setGeometry: function _setGeometry(_ref) {
      var x = _ref.centerX,
          y = _ref.centerY,
          radiusInner = _ref.radiusInner;
      this._center = {
        x: x,
        y: y
      };
      this._innerRadius = radiusInner;
    },
    _disposeSeries: function _disposeSeries(seriesIndex) {
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
    _getExtraOptions: function _getExtraOptions() {
      var that = this;
      return {
        startAngle: that.option('startAngle'),
        innerRadius: that.option('innerRadius'),
        segmentsDirection: that.option('segmentsDirection'),
        type: that.option('type')
      };
    },
    getSizeGroup: function getSizeGroup() {
      return this._themeManager.getOptions('sizeGroup');
    },
    getSizeGroupLayout: function getSizeGroupLayout() {
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
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./components/consts","./core/utils","../core/utils/extend","../core/utils/type","../core/utils/iterator","./translators/range","../core/component_registrator","./chart_components/base_chart","../core/utils/common","./translators/translator1d","./core/annotations","./core/center_template"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./components/consts"), require("./core/utils"), require("../core/utils/extend"), require("../core/utils/type"), require("../core/utils/iterator"), require("./translators/range"), require("../core/component_registrator"), require("./chart_components/base_chart"), require("../core/utils/common"), require("./translators/translator1d"), require("./core/annotations"), require("./core/center_template"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pie_chart.js.map