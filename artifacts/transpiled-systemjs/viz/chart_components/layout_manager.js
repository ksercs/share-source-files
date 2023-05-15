!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/chart_components/layout_manager.js"], ["../../core/utils/type","../components/consts","../core/layout_element"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/chart_components/layout_manager.js", ["../../core/utils/type", "../components/consts", "../core/layout_element"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.LayoutManager = LayoutManager;
  var _type = $__require("../../core/utils/type");
  var _consts = _interopRequireDefault($__require("../components/consts"));
  var _layout_element = $__require("../core/layout_element");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var floor = Math.floor,
      sqrt = Math.sqrt;
  var _min = Math.min;
  var _max = Math.max;
  var DEFAULT_INNER_RADIUS = 0.5;
  var RADIAL_LABEL_INDENT = _consts.default.radialLabelIndent;
  function getNearestCoord(firstCoord, secondCoord, pointCenterCoord) {
    var nearestCoord;
    if (pointCenterCoord < firstCoord) {
      nearestCoord = firstCoord;
    } else if (secondCoord < pointCenterCoord) {
      nearestCoord = secondCoord;
    } else {
      nearestCoord = pointCenterCoord;
    }
    return nearestCoord;
  }
  function getLabelLayout(point) {
    if (point._label.isVisible() && point._label.getLayoutOptions().position !== 'inside') {
      return point._label.getBoundingRect();
    }
  }
  function getPieRadius(series, paneCenterX, paneCenterY, accessibleRadius, minR) {
    series.some(function (singleSeries) {
      return singleSeries.getVisiblePoints().reduce(function (radiusIsFound, point) {
        var labelBBox = getLabelLayout(point);
        if (labelBBox) {
          var xCoords = getNearestCoord(labelBBox.x, labelBBox.x + labelBBox.width, paneCenterX);
          var yCoords = getNearestCoord(labelBBox.y, labelBBox.y + labelBBox.height, paneCenterY);
          accessibleRadius = _min(_max(getLengthFromCenter(xCoords, yCoords, paneCenterX, paneCenterY) - RADIAL_LABEL_INDENT, minR), accessibleRadius);
          radiusIsFound = true;
        }
        return radiusIsFound;
      }, false);
    });
    return accessibleRadius;
  }
  function getSizeLabels(series) {
    return series.reduce(function (res, singleSeries) {
      var maxWidth = singleSeries.getVisiblePoints().reduce(function (width, point) {
        var labelBBox = getLabelLayout(point);
        if (labelBBox && labelBBox.width > width) {
          width = labelBBox.width;
        }
        return width;
      }, 0);
      var rWidth = maxWidth;
      if (maxWidth) {
        res.outerLabelsCount++;
        if (res.outerLabelsCount > 1) {
          maxWidth += _consts.default.pieLabelSpacing;
        }
        rWidth += _consts.default.pieLabelSpacing;
      }
      res.sizes.push(maxWidth);
      res.rSizes.push(rWidth);
      res.common += maxWidth;
      return res;
    }, {
      sizes: [],
      rSizes: [],
      common: 0,
      outerLabelsCount: 0
    });
  }
  function correctLabelRadius(labelSizes, radius, series, canvas, averageWidthLabels, centerX) {
    var curRadius;
    var i;
    var runningWidth = 0;
    var sizes = labelSizes.sizes;
    var rSizes = labelSizes.rSizes;
    for (i = 0; i < series.length; i++) {
      if (sizes[i] === 0) {
        curRadius && (curRadius += rSizes[i - 1]);
        continue;
      }
      curRadius = floor(curRadius ? curRadius + rSizes[i - 1] : radius);
      series[i].correctLabelRadius(curRadius);
      runningWidth += averageWidthLabels || sizes[i];
      rSizes[i] = averageWidthLabels || rSizes[i];
      series[i].setVisibleArea({
        left: floor(centerX - radius - runningWidth),
        right: floor(canvas.width - (centerX + radius + runningWidth)),
        top: canvas.top,
        bottom: canvas.bottom,
        width: canvas.width,
        height: canvas.height
      });
    }
  }
  function getLengthFromCenter(x, y, paneCenterX, paneCenterY) {
    return sqrt((x - paneCenterX) * (x - paneCenterX) + (y - paneCenterY) * (y - paneCenterY));
  }
  function getInnerRadius(_ref) {
    var type = _ref.type,
        innerRadius = _ref.innerRadius;
    return type === 'pie' ? 0 : (0, _type.isNumeric)(innerRadius) ? Number(innerRadius) : DEFAULT_INNER_RADIUS;
  }
  function LayoutManager() {}
  function getAverageLabelWidth(centerX, radius, canvas, sizeLabels) {
    return (centerX - radius - RADIAL_LABEL_INDENT - canvas.left) / sizeLabels.outerLabelsCount;
  }
  function getFullRadiusWithLabels(centerX, canvas, sizeLabels) {
    return centerX - canvas.left - (sizeLabels.outerLabelsCount > 0 ? sizeLabels.common + RADIAL_LABEL_INDENT : 0);
  }
  function correctAvailableRadius(availableRadius, canvas, series, minR, paneCenterX, paneCenterY) {
    var sizeLabels = getSizeLabels(series);
    var averageWidthLabels;
    var fullRadiusWithLabels = getFullRadiusWithLabels(paneCenterX, canvas, sizeLabels);
    if (fullRadiusWithLabels < minR) {
      availableRadius = minR;
      averageWidthLabels = getAverageLabelWidth(paneCenterX, availableRadius, canvas, sizeLabels);
    } else {
      availableRadius = _min(getPieRadius(series, paneCenterX, paneCenterY, availableRadius, minR), fullRadiusWithLabels);
    }
    correctLabelRadius(sizeLabels, availableRadius + RADIAL_LABEL_INDENT, series, canvas, averageWidthLabels, paneCenterX);
    return availableRadius;
  }
  function toLayoutElementCoords(canvas) {
    return new _layout_element.WrapperLayoutElement(null, {
      x: canvas.left,
      y: canvas.top,
      width: canvas.width - canvas.left - canvas.right,
      height: canvas.height - canvas.top - canvas.bottom
    });
  }
  LayoutManager.prototype = {
    constructor: LayoutManager,
    setOptions: function setOptions(options) {
      this._options = options;
    },
    applyPieChartSeriesLayout: function applyPieChartSeriesLayout(canvas, series, hideLayoutLabels) {
      var paneSpaceHeight = canvas.height - canvas.top - canvas.bottom;
      var paneSpaceWidth = canvas.width - canvas.left - canvas.right;
      var paneCenterX = paneSpaceWidth / 2 + canvas.left;
      var paneCenterY = paneSpaceHeight / 2 + canvas.top;
      var piePercentage = this._options.piePercentage;
      var availableRadius;
      var minR;
      if ((0, _type.isNumeric)(piePercentage)) {
        availableRadius = minR = piePercentage * _min(canvas.height, canvas.width) / 2;
      } else {
        availableRadius = _min(paneSpaceWidth, paneSpaceHeight) / 2;
        minR = this._options.minPiePercentage * availableRadius;
      }
      if (!hideLayoutLabels) {
        availableRadius = correctAvailableRadius(availableRadius, canvas, series, minR, paneCenterX, paneCenterY);
      }
      return {
        centerX: floor(paneCenterX),
        centerY: floor(paneCenterY),
        radiusInner: floor(availableRadius * getInnerRadius(series[0])),
        radiusOuter: floor(availableRadius)
      };
    },
    applyEqualPieChartLayout: function applyEqualPieChartLayout(series, layout) {
      var radius = layout.radius;
      return {
        centerX: floor(layout.x),
        centerY: floor(layout.y),
        radiusInner: floor(radius * getInnerRadius(series[0])),
        radiusOuter: floor(radius)
      };
    },
    correctPieLabelRadius: function correctPieLabelRadius(series, layout, canvas) {
      var sizeLabels = getSizeLabels(series);
      var averageWidthLabels;
      var radius = layout.radiusOuter + RADIAL_LABEL_INDENT;
      var availableLabelWidth = layout.centerX - canvas.left - radius;
      if (sizeLabels.common + RADIAL_LABEL_INDENT > availableLabelWidth) {
        averageWidthLabels = getAverageLabelWidth(layout.centerX, layout.radiusOuter, canvas, sizeLabels);
      }
      correctLabelRadius(sizeLabels, radius, series, canvas, averageWidthLabels, layout.centerX);
    },
    needMoreSpaceForPanesCanvas: function needMoreSpaceForPanesCanvas(panes, rotated, fixedSizeCallback) {
      var options = this._options;
      var width = options.width;
      var height = options.height;
      var piePercentage = options.piePercentage;
      var percentageIsValid = (0, _type.isNumeric)(piePercentage);
      var needHorizontalSpace = 0;
      var needVerticalSpace = 0;
      panes.forEach(function (pane) {
        var paneCanvas = pane.canvas;
        var minSize = percentageIsValid ? _min(paneCanvas.width, paneCanvas.height) * piePercentage : undefined;
        var paneSized = fixedSizeCallback ? fixedSizeCallback(pane) : {
          width: false,
          height: false
        };
        var needPaneHorizontalSpace = !paneSized.width ? (percentageIsValid ? minSize : width) - (paneCanvas.width - paneCanvas.left - paneCanvas.right) : 0;
        var needPaneVerticalSpace = !paneSized.height ? (percentageIsValid ? minSize : height) - (paneCanvas.height - paneCanvas.top - paneCanvas.bottom) : 0;
        if (rotated) {
          needHorizontalSpace += needPaneHorizontalSpace > 0 ? needPaneHorizontalSpace : 0;
          needVerticalSpace = _max(needPaneVerticalSpace > 0 ? needPaneVerticalSpace : 0, needVerticalSpace);
        } else {
          needHorizontalSpace = _max(needPaneHorizontalSpace > 0 ? needPaneHorizontalSpace : 0, needHorizontalSpace);
          needVerticalSpace += needPaneVerticalSpace > 0 ? needPaneVerticalSpace : 0;
        }
      });
      return needHorizontalSpace > 0 || needVerticalSpace > 0 ? {
        width: needHorizontalSpace,
        height: needVerticalSpace
      } : false;
    },
    layoutInsideLegend: function layoutInsideLegend(legend, canvas) {
      var inverseAlign = {
        left: 'right',
        right: 'left',
        top: 'bottom',
        bottom: 'top',
        center: 'center'
      };
      var layoutOptions = legend.getLayoutOptions();
      if (!layoutOptions) {
        return;
      }
      var position = layoutOptions.position;
      var cutSide = layoutOptions.cutSide;
      var my = {
        horizontal: position.horizontal,
        vertical: position.vertical
      };
      canvas[layoutOptions.cutLayoutSide] += layoutOptions.cutSide === 'horizontal' ? layoutOptions.width : layoutOptions.height;
      my[cutSide] = inverseAlign[my[cutSide]];
      legend.position({
        of: toLayoutElementCoords(canvas),
        my: my,
        at: position
      });
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../components/consts","../core/layout_element"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../components/consts"), require("../core/layout_element"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=layout_manager.js.map