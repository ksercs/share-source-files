!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/chart_components/crosshair.js"], ["../core/utils","../../core/utils/extend"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/chart_components/crosshair.js", ["../core/utils", "../../core/utils/extend"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.Crosshair = Crosshair;
  exports.getMargins = getMargins;
  var _utils = $__require("../core/utils");
  var _extend = $__require("../../core/utils/extend");
  var math = Math;
  var mathAbs = math.abs;
  var mathMin = math.min;
  var mathMax = math.max;
  var mathFloor = math.floor;
  var HORIZONTAL = 'horizontal';
  var VERTICAL = 'vertical';
  var LABEL_BACKGROUND_PADDING_X = 8;
  var LABEL_BACKGROUND_PADDING_Y = 4;
  var CENTER = 'center';
  var RIGHT = 'right';
  var LEFT = 'left';
  var TOP = 'top';
  var BOTTOM = 'bottom';
  function getMargins() {
    return {
      x: LABEL_BACKGROUND_PADDING_X,
      y: LABEL_BACKGROUND_PADDING_Y
    };
  }
  function getRectangleBBox(bBox) {
    return {
      x: bBox.x - LABEL_BACKGROUND_PADDING_X,
      y: bBox.y - LABEL_BACKGROUND_PADDING_Y,
      width: bBox.width + LABEL_BACKGROUND_PADDING_X * 2,
      height: bBox.height + LABEL_BACKGROUND_PADDING_Y * 2
    };
  }
  function getLabelCheckerPosition(x, y, isHorizontal, canvas) {
    var params = isHorizontal ? ['x', 'width', 'y', 'height', y, 0] : ['y', 'height', 'x', 'width', x, 1];
    return function (bBox, position, coord) {
      var labelCoord = {
        x: coord.x,
        y: coord.y
      };
      var rectangleBBox = getRectangleBBox(bBox);
      var delta = isHorizontal ? coord.y - bBox.y - bBox.height / 2 : coord.y - bBox.y;
      labelCoord.y = isHorizontal || !isHorizontal && position === BOTTOM ? coord.y + delta : coord.y;
      if (rectangleBBox[params[0]] < 0) {
        labelCoord[params[0]] -= rectangleBBox[params[0]];
      } else if (rectangleBBox[params[0]] + rectangleBBox[params[1]] + delta * params[5] > canvas[params[1]]) {
        labelCoord[params[0]] -= rectangleBBox[params[0]] + rectangleBBox[params[1]] + delta * params[5] - canvas[params[1]];
      }
      if (params[4] - rectangleBBox[params[3]] / 2 < 0) {
        labelCoord[params[2]] -= params[4] - rectangleBBox[params[3]] / 2;
      } else if (params[4] + rectangleBBox[params[3]] / 2 > canvas[params[3]]) {
        labelCoord[params[2]] -= params[4] + rectangleBBox[params[3]] / 2 - canvas[params[3]];
      }
      return labelCoord;
    };
  }
  function Crosshair(renderer, options, params, group) {
    var that = this;
    that._renderer = renderer;
    that._crosshairGroup = group;
    that._options = {};
    that.update(options, params);
  }
  Crosshair.prototype = {
    constructor: Crosshair,
    update: function update(options, params) {
      var that = this;
      var canvas = params.canvas;
      that._canvas = {
        top: canvas.top,
        bottom: canvas.height - canvas.bottom,
        left: canvas.left,
        right: canvas.width - canvas.right,
        width: canvas.width,
        height: canvas.height
      };
      that._axes = params.axes;
      that._panes = params.panes;
      that._prepareOptions(options, HORIZONTAL);
      that._prepareOptions(options, VERTICAL);
    },
    dispose: function dispose() {
      var that = this;
      that._renderer = that._crosshairGroup = that._options = that._axes = that._canvas = that._horizontalGroup = that._verticalGroup = that._horizontal = that._vertical = that._circle = that._panes = null;
    },
    _prepareOptions: function _prepareOptions(options, direction) {
      var lineOptions = options[direction + 'Line'];
      this._options[direction] = {
        visible: lineOptions.visible,
        line: {
          stroke: lineOptions.color || options.color,
          'stroke-width': lineOptions.width || options.width,
          dashStyle: lineOptions.dashStyle || options.dashStyle,
          opacity: lineOptions.opacity || options.opacity,
          'stroke-linecap': 'butt'
        },
        label: (0, _extend.extend)(true, {}, options.label, lineOptions.label)
      };
    },
    _createLines: function _createLines(options, sharpParam, group) {
      var lines = [];
      var canvas = this._canvas;
      var points = [canvas.left, canvas.top, canvas.left, canvas.top];
      for (var i = 0; i < 2; i++) {
        lines.push(this._renderer.path(points, 'line').attr(options).sharp(sharpParam).append(group));
      }
      return lines;
    },
    render: function render() {
      var that = this;
      var renderer = that._renderer;
      var options = that._options;
      var verticalOptions = options.vertical;
      var horizontalOptions = options.horizontal;
      var extraOptions = horizontalOptions.visible ? horizontalOptions.line : verticalOptions.line;
      var circleOptions = {
        stroke: extraOptions.stroke,
        'stroke-width': extraOptions['stroke-width'],
        dashStyle: extraOptions.dashStyle,
        opacity: extraOptions.opacity
      };
      var canvas = that._canvas;
      that._horizontal = {};
      that._vertical = {};
      that._circle = renderer.circle(canvas.left, canvas.top, 0).attr(circleOptions).append(that._crosshairGroup);
      that._horizontalGroup = renderer.g().append(that._crosshairGroup);
      that._verticalGroup = renderer.g().append(that._crosshairGroup);
      if (verticalOptions.visible) {
        that._vertical.lines = that._createLines(verticalOptions.line, 'h', that._verticalGroup);
        that._vertical.labels = that._createLabels(that._axes[0], verticalOptions, false, that._verticalGroup);
      }
      if (horizontalOptions.visible) {
        that._horizontal.lines = that._createLines(horizontalOptions.line, 'v', that._horizontalGroup);
        that._horizontal.labels = that._createLabels(that._axes[1], horizontalOptions, true, that._horizontalGroup);
      }
      that.hide();
    },
    _createLabels: function _createLabels(axes, options, isHorizontal, group) {
      var that = this;
      var canvas = that._canvas;
      var renderer = that._renderer;
      var x;
      var y;
      var text;
      var labels = [];
      var background;
      var currentLabelPos;
      var labelOptions = options.label;
      if (labelOptions.visible) {
        axes.forEach(function (axis) {
          var position = axis.getOptions().position;
          if (axis.getTranslator().getBusinessRange().isEmpty()) {
            return;
          }
          currentLabelPos = axis.getLabelsPosition();
          if (isHorizontal) {
            y = canvas.top;
            x = currentLabelPos;
          } else {
            x = canvas.left;
            y = currentLabelPos;
          }
          var align = position === TOP || position === BOTTOM ? CENTER : position === RIGHT ? LEFT : RIGHT;
          background = renderer.rect(0, 0, 0, 0).attr({
            fill: labelOptions.backgroundColor || options.line.stroke
          }).append(group);
          text = renderer.text('0', 0, 0).css((0, _utils.patchFontOptions)(options.label.font)).attr({
            align: align,
            'class': labelOptions.cssClass
          }).append(group);
          labels.push({
            text: text,
            background: background,
            axis: axis,
            options: labelOptions,
            pos: {
              coord: currentLabelPos,
              side: position
            },
            startXY: {
              x: x,
              y: y
            }
          });
        });
      }
      return labels;
    },
    _updateText: function _updateText(value, axisName, labels, point, func) {
      var that = this;
      labels.forEach(function (label) {
        var axis = label.axis;
        var coord = label.startXY;
        var textElement = label.text;
        var backgroundElement = label.background;
        var text = '';
        if (!axis.name || axis.name === axisName) {
          text = axis.getFormattedValue(value, label.options, point);
        }
        if (text) {
          textElement.attr({
            text: text,
            x: coord.x,
            y: coord.y
          });
          textElement.attr(func(textElement.getBBox(), label.pos.side, coord));
          that._updateLinesCanvas(label);
          backgroundElement.attr(getRectangleBBox(textElement.getBBox()));
        } else {
          textElement.attr({
            text: ''
          });
          backgroundElement.attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
          });
        }
      });
    },
    hide: function hide() {
      this._crosshairGroup.attr({
        visibility: 'hidden'
      });
    },
    _updateLinesCanvas: function _updateLinesCanvas(label) {
      var position = label.pos.side;
      var labelCoord = label.pos.coord;
      var coords = this._linesCanvas;
      var canvas = this._canvas;
      coords[position] = coords[position] !== canvas[position] && mathAbs(coords[position] - canvas[position]) < mathAbs(labelCoord - canvas[position]) ? coords[position] : labelCoord;
    },
    _updateLines: function _updateLines(lines, x, y, r, isHorizontal) {
      var coords = this._linesCanvas;
      var canvas = this._canvas;
      var points = isHorizontal ? [[mathMin(x - r, coords.left), canvas.top, x - r, canvas.top], [x + r, canvas.top, mathMax(coords.right, x + r), canvas.top]] : [[canvas.left, mathMin(coords.top, y - r), canvas.left, y - r], [canvas.left, y + r, canvas.left, mathMax(coords.bottom, y + r)]];
      for (var i = 0; i < 2; i++) {
        lines[i].attr({
          points: points[i]
        }).sharp(isHorizontal ? 'v' : 'h', isHorizontal ? y === canvas.bottom ? -1 : 1 : x === canvas.right ? -1 : 1);
      }
    },
    _resetLinesCanvas: function _resetLinesCanvas() {
      var canvas = this._canvas;
      this._linesCanvas = {
        left: canvas.left,
        right: canvas.right,
        top: canvas.top,
        bottom: canvas.bottom
      };
    },
    _getClipRectForPane: function _getClipRectForPane(x, y) {
      var panes = this._panes;
      var i;
      var coords;
      for (i = 0; i < panes.length; i++) {
        coords = panes[i].coords;
        if (coords.left <= x && coords.right >= x && coords.top <= y && coords.bottom >= y) {
          return panes[i].clipRect;
        }
      }
      return {
        id: null
      };
    },
    show: function show(data) {
      var that = this;
      var point = data.point;
      var pointData = point.getCrosshairData(data.x, data.y);
      var r = point.getPointRadius();
      var horizontal = that._horizontal;
      var vertical = that._vertical;
      var rad = !r ? 0 : r + 3;
      var canvas = that._canvas;
      var x = mathFloor(pointData.x);
      var y = mathFloor(pointData.y);
      if (x >= canvas.left && x <= canvas.right && y >= canvas.top && y <= canvas.bottom) {
        that._crosshairGroup.attr({
          visibility: 'visible'
        });
        that._resetLinesCanvas();
        that._circle.attr({
          cx: x,
          cy: y,
          r: rad,
          'clip-path': that._getClipRectForPane(x, y).id
        });
        if (horizontal.lines) {
          that._updateText(pointData.yValue, pointData.axis, horizontal.labels, point, getLabelCheckerPosition(x, y, true, canvas));
          that._updateLines(horizontal.lines, x, y, rad, true);
          that._horizontalGroup.attr({
            translateY: y - canvas.top
          });
        }
        if (vertical.lines) {
          that._updateText(pointData.xValue, pointData.axis, vertical.labels, point, getLabelCheckerPosition(x, y, false, canvas));
          that._updateLines(vertical.lines, x, y, rad, false);
          that._verticalGroup.attr({
            translateX: x - canvas.left
          });
        }
      } else {
        that.hide();
      }
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils","../../core/utils/extend"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils"), require("../../core/utils/extend"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=crosshair.js.map