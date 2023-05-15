!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/series/stacked_series.js"], ["../../core/utils/common","../../core/utils/extend","../../core/utils/iterator","./area_series","./bar_series","./line_series","../core/utils","../../core/utils/object"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/series/stacked_series.js", ["../../core/utils/common", "../../core/utils/extend", "../../core/utils/iterator", "./area_series", "./bar_series", "./line_series", "../core/utils", "../../core/utils/object"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.polar = exports.chart = void 0;
  var _common = $__require("../../core/utils/common");
  var _extend2 = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _area_series = $__require("./area_series");
  var _bar_series = $__require("./bar_series");
  var _line_series = $__require("./line_series");
  var _utils = $__require("../core/utils");
  var _object = $__require("../../core/utils/object");
  // there stackedline, fullstackedline, stackedbar, fullstackedbar, stackedarea, fullstackedarea

  var chartAreaSeries = _area_series.chart.area;
  var chartBarSeries = _bar_series.chart.bar;
  var baseStackedSeries = {
    _calculateErrorBars: _common.noop,
    _updateOptions: function _updateOptions(options) {
      this._stackName = 'axis_' + (options.axis || 'default');
    }
  };
  var chart = {};
  exports.chart = chart;
  var polar = {};
  exports.polar = polar;
  chart['stackedline'] = (0, _extend2.extend)({}, _line_series.chart.line, baseStackedSeries, {});
  chart['stackedspline'] = (0, _extend2.extend)({}, _line_series.chart['spline'], baseStackedSeries, {});
  chart['fullstackedline'] = (0, _extend2.extend)({}, _line_series.chart.line, baseStackedSeries, {
    getValueRangeInitialValue: _area_series.chart.area.getValueRangeInitialValue
  });
  chart['fullstackedspline'] = (0, _extend2.extend)({}, _line_series.chart['spline'], baseStackedSeries, {
    getValueRangeInitialValue: _area_series.chart.area.getValueRangeInitialValue
  });
  var stackedBar = chart['stackedbar'] = (0, _extend2.extend)({}, chartBarSeries, baseStackedSeries, {
    _updateOptions: function _updateOptions(options) {
      baseStackedSeries._updateOptions.call(this, options);
      this._stackName = this._stackName + '_stack_' + (options.stack || 'default');
    }
  });
  chart['fullstackedbar'] = (0, _extend2.extend)({}, chartBarSeries, baseStackedSeries, {
    _updateOptions: stackedBar._updateOptions
  });
  function clonePoint(point, value, minValue, position) {
    point = (0, _object.clone)(point);
    point.value = value;
    point.minValue = minValue;
    point.translate();
    point.argument = point.argument + position;
    return point;
  }
  function preparePointsForStackedAreaSegment(points) {
    var i = 0;
    var p;
    var result = [];
    var array;
    var len = points.length;
    while (i < len) {
      p = points[i];
      array = [p];
      if (p.leftHole) {
        array = [clonePoint(p, p.leftHole, p.minLeftHole, 'left'), p];
      }
      if (p.rightHole) {
        array.push(clonePoint(p, p.rightHole, p.minRightHole, 'right'));
      }
      result.push(array);
      i++;
    }
    return [].concat.apply([], result);
  }
  chart['stackedarea'] = (0, _extend2.extend)({}, chartAreaSeries, baseStackedSeries, {
    _prepareSegment: function _prepareSegment(points, rotated) {
      return chartAreaSeries._prepareSegment.call(this, preparePointsForStackedAreaSegment(points), rotated);
    },
    _appendInGroup: function _appendInGroup() {
      this._group.append(this._extGroups.seriesGroup).toBackground();
    }
  });
  function getPointsByArgFromPrevSeries(prevSeries, argument) {
    var result;
    while (!result && prevSeries) {
      result = prevSeries._segmentByArg && prevSeries._segmentByArg[argument]; // T357324
      prevSeries = prevSeries._prevSeries;
    }
    return result;
  }
  chart['stackedsplinearea'] = (0, _extend2.extend)({}, _area_series.chart['splinearea'], baseStackedSeries, {
    _prepareSegment: function _prepareSegment(points, rotated) {
      var that = this;
      var areaSegment;
      points = preparePointsForStackedAreaSegment(points);
      if (!this._prevSeries || points.length === 1) {
        areaSegment = _area_series.chart['splinearea']._prepareSegment.call(this, points, rotated);
      } else {
        var forwardPoints = _line_series.chart.spline._calculateBezierPoints(points, rotated);
        var backwardPoints = (0, _utils.map)(points, function (p) {
          var point = p.getCoords(true);
          point.argument = p.argument;
          return point;
        });
        var prevSeriesForwardPoints = [];
        var pointByArg = {};
        var i = 0;
        var len = that._prevSeries._segments.length;
        while (i < len) {
          prevSeriesForwardPoints = prevSeriesForwardPoints.concat(that._prevSeries._segments[i].line);
          i++;
        }
        (0, _iterator.each)(prevSeriesForwardPoints, function (_, p) {
          if (p.argument !== null) {
            var argument = p.argument.valueOf();
            if (!pointByArg[argument]) {
              pointByArg[argument] = [p];
            } else {
              pointByArg[argument].push(p);
            }
          }
        });
        that._prevSeries._segmentByArg = pointByArg;
        backwardPoints = _line_series.chart.spline._calculateBezierPoints(backwardPoints, rotated);
        (0, _iterator.each)(backwardPoints, function (i, p) {
          var argument = p.argument.valueOf();
          var prevSeriesPoints;
          if (i % 3 === 0) {
            prevSeriesPoints = pointByArg[argument] || getPointsByArgFromPrevSeries(that._prevSeries, argument);
            if (prevSeriesPoints) {
              backwardPoints[i - 1] && prevSeriesPoints[0] && (backwardPoints[i - 1] = prevSeriesPoints[0]);
              backwardPoints[i + 1] && (backwardPoints[i + 1] = prevSeriesPoints[2] || p);
            }
          }
        });
        areaSegment = {
          line: forwardPoints,
          area: forwardPoints.concat(backwardPoints.reverse())
        };
        that._areaPointsToSplineAreaPoints(areaSegment.area);
      }
      return areaSegment;
    },
    _appendInGroup: chart['stackedarea']._appendInGroup
  });
  chart['fullstackedarea'] = (0, _extend2.extend)({}, chartAreaSeries, baseStackedSeries, {
    _prepareSegment: chart['stackedarea']._prepareSegment,
    _appendInGroup: chart['stackedarea']._appendInGroup
  });
  chart['fullstackedsplinearea'] = (0, _extend2.extend)({}, _area_series.chart['splinearea'], baseStackedSeries, {
    _prepareSegment: chart['stackedsplinearea']._prepareSegment,
    _appendInGroup: chart['stackedarea']._appendInGroup
  });
  polar['stackedbar'] = (0, _extend2.extend)({}, _bar_series.polar.bar, baseStackedSeries, {});
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/common","../../core/utils/extend","../../core/utils/iterator","./area_series","./bar_series","./line_series","../core/utils","../../core/utils/object"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/common"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("./area_series"), require("./bar_series"), require("./line_series"), require("../core/utils"), require("../../core/utils/object"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=stacked_series.js.map