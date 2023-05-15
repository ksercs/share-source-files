!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/series/points/polar_point.js"], ["../../../core/utils/extend","./symbol_point","./bar_point","./pie_point","../../../core/utils/type","../../core/utils","../../components/consts"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/series/points/polar_point.js", ["../../../core/utils/extend", "./symbol_point", "./bar_point", "./pie_point", "../../../core/utils/type", "../../core/utils", "../../components/consts"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.polarSymbolPoint = exports.polarBarPoint = void 0;
  var _extend2 = $__require("../../../core/utils/extend");
  var _symbol_point = _interopRequireDefault($__require("./symbol_point"));
  var _bar_point = _interopRequireDefault($__require("./bar_point"));
  var _pie_point = _interopRequireDefault($__require("./pie_point"));
  var _type = $__require("../../../core/utils/type");
  var _utils = $__require("../../core/utils");
  var _consts = _interopRequireDefault($__require("../../components/consts"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _extend = _extend2.extend;
  var _math = Math;
  var _max = _math.max;
  var RADIAL_LABEL_INDENT = _consts.default.radialLabelIndent;
  var ERROR_BARS_ANGLE_OFFSET = 90;
  var CANVAS_POSITION_START = 'canvas_position_start';
  var CANVAS_POSITION_END = 'canvas_position_end';
  var CANVAS_POSITION_DEFAULT = 'canvas_position_default';
  var polarSymbolPoint = _extend({}, _symbol_point.default, {
    _getLabelCoords: _pie_point.default._getLabelCoords,
    _getElementCoords: _pie_point.default._getElementCoords,
    _moveLabelOnCanvas: function _moveLabelOnCanvas(coord, visibleArea, labelBBox) {
      var x = coord.x;
      var y = coord.y;
      if (visibleArea.minX > x) {
        x = visibleArea.minX;
      }
      if (visibleArea.maxX < x + labelBBox.width) {
        x = visibleArea.maxX - labelBBox.width;
      }
      if (visibleArea.minY > y) {
        y = visibleArea.minY;
      }
      if (visibleArea.maxY < y + labelBBox.height) {
        y = visibleArea.maxY - labelBBox.height;
      }
      return {
        x: x,
        y: y
      };
    },
    _getLabelPosition: function _getLabelPosition() {
      return 'outside';
    },
    _getCoords: function _getCoords(argument, value) {
      var axis = this.series.getValueAxis();
      var startAngle = axis.getAngles()[0];
      var angle = this._getArgTranslator().translate(argument);
      var radius = this._getValTranslator().translate(value);
      var coords = (0, _utils.convertPolarToXY)(axis.getCenter(), axis.getAngles()[0], angle, radius);
      coords.angle = angle + startAngle - 90, coords.radius = radius;
      return coords;
    },
    _translate: function _translate() {
      var that = this;
      var center = that.series.getValueAxis().getCenter();
      var coord = that._getCoords(that.argument, that.value);
      var translator = that._getValTranslator();
      var maxRadius = translator.isInverted() ? translator.translate(CANVAS_POSITION_START) : translator.translate(CANVAS_POSITION_END);
      var normalizedRadius = (0, _type.isDefined)(coord.radius) && coord.radius >= 0 ? coord.radius : null;
      that.vx = (0, _utils.normalizeAngle)(coord.angle);
      that.vy = that.radiusOuter = that.radiusLabels = normalizedRadius;
      that.radiusLabels += RADIAL_LABEL_INDENT;
      that.radius = normalizedRadius;
      that.middleAngle = -coord.angle;
      that.angle = -coord.angle;
      that.x = coord.x;
      that.y = coord.y;
      that.defaultX = that.centerX = center.x;
      that.defaultY = that.centerY = center.y;
      that._translateErrorBars();
      that.inVisibleArea = that._checkRadiusForVisibleArea(normalizedRadius, maxRadius);
    },
    _checkRadiusForVisibleArea: function _checkRadiusForVisibleArea(radius, maxRadius) {
      return (0, _type.isDefined)(radius) && radius <= maxRadius;
    },
    _translateErrorBars: function _translateErrorBars() {
      var that = this;
      var errorBars = that._options.errorBars;
      var translator = that._getValTranslator();
      if (!errorBars) {
        return;
      }
      (0, _type.isDefined)(that.lowError) && (that._lowErrorCoord = that.centerY - translator.translate(that.lowError));
      (0, _type.isDefined)(that.highError) && (that._highErrorCoord = that.centerY - translator.translate(that.highError));
      that._errorBarPos = that.centerX;
      that._baseErrorBarPos = errorBars.type === 'stdDeviation' ? that._lowErrorCoord + (that._highErrorCoord - that._lowErrorCoord) / 2 : that.centerY - that.radius;
    },
    _getTranslates: function _getTranslates(animationEnabled) {
      return animationEnabled ? this.getDefaultCoords() : {
        x: this.x,
        y: this.y
      };
    },
    getDefaultCoords: function getDefaultCoords() {
      var cosSin = (0, _utils.getCosAndSin)(-this.angle);
      var radius = this._getValTranslator().translate(CANVAS_POSITION_DEFAULT);
      var x = this.defaultX + radius * cosSin.cos;
      var y = this.defaultY + radius * cosSin.sin;
      return {
        x: x,
        y: y
      };
    },
    _addLabelAlignmentAndOffset: function _addLabelAlignmentAndOffset(label, coord) {
      return coord;
    },
    _checkLabelPosition: function _checkLabelPosition(label, coord) {
      var that = this;
      var visibleArea = that._getVisibleArea();
      var graphicBBox = that._getGraphicBBox();
      if (that._isPointInVisibleArea(visibleArea, graphicBBox)) {
        coord = that._moveLabelOnCanvas(coord, visibleArea, label.getBoundingRect());
      }
      return coord;
    },
    _getErrorBarSettings: function _getErrorBarSettings(errorBarOptions, animationEnabled) {
      var settings = _symbol_point.default._getErrorBarSettings.call(this, errorBarOptions, animationEnabled);
      settings.rotate = ERROR_BARS_ANGLE_OFFSET - this.angle;
      settings.rotateX = this.centerX;
      settings.rotateY = this.centerY;
      return settings;
    },
    getCoords: function getCoords(min) {
      return min ? this.getDefaultCoords() : {
        x: this.x,
        y: this.y
      };
    }
  });
  exports.polarSymbolPoint = polarSymbolPoint;
  var polarBarPoint = _extend({}, _bar_point.default, {
    _translateErrorBars: polarSymbolPoint._translateErrorBars,
    _getErrorBarSettings: polarSymbolPoint._getErrorBarSettings,
    _moveLabelOnCanvas: polarSymbolPoint._moveLabelOnCanvas,
    _getLabelCoords: _pie_point.default._getLabelCoords,
    _getElementCoords: _pie_point.default._getElementCoords,
    _getLabelConnector: _pie_point.default._getLabelConnector,
    getTooltipParams: _pie_point.default.getTooltipParams,
    _getLabelPosition: _pie_point.default._getLabelPosition,
    _getCoords: polarSymbolPoint._getCoords,
    _translate: function _translate() {
      var that = this;
      var translator = that._getValTranslator();
      var businessRange = translator.getBusinessRange();
      var maxRadius = translator.isInverted() ? translator.translate(CANVAS_POSITION_START) : translator.translate(CANVAS_POSITION_END);
      that.radiusInner = translator.translate(that.minValue);
      polarSymbolPoint._translate.call(that);
      if (that.radiusInner === null) {
        that.radiusInner = that.radius = maxRadius;
      } else if (that.radius === null) {
        that.radius = that.value >= businessRange.minVisible ? maxRadius : 0;
      } else if (that.radius > maxRadius) {
        that.radius = maxRadius;
      }
      that.radiusOuter = that.radiusLabels = _max(that.radiusInner, that.radius);
      that.radiusLabels += RADIAL_LABEL_INDENT;
      that.radiusInner = that.defaultRadius = _math.min(that.radiusInner, that.radius);
      that.middleAngle = that.angle = -(0, _utils.normalizeAngle)(that.middleAngleCorrection - that.angle);
    },
    _checkRadiusForVisibleArea: function _checkRadiusForVisibleArea(radius) {
      return (0, _type.isDefined)(radius) || this._getValTranslator().translate(this.minValue) > 0;
    },
    _getErrorBarBaseEdgeLength: function _getErrorBarBaseEdgeLength() {
      var coord = this.getMarkerCoords();
      return _math.PI * coord.outerRadius * _math.abs(coord.startAngle - coord.endAngle) / 180;
    },
    getMarkerCoords: function getMarkerCoords() {
      return {
        x: this.centerX,
        y: this.centerY,
        outerRadius: this.radiusOuter,
        innerRadius: this.defaultRadius,
        startAngle: this.middleAngle - this.interval / 2,
        endAngle: this.middleAngle + this.interval / 2
      };
    },
    _drawMarker: function _drawMarker(renderer, group, animationEnabled) {
      var that = this;
      var styles = that._getStyle();
      var coords = that.getMarkerCoords();
      var innerRadius = coords.innerRadius;
      var outerRadius = coords.outerRadius;
      var start = that._getCoords(that.argument, CANVAS_POSITION_DEFAULT);
      var x = coords.x;
      var y = coords.y;
      if (animationEnabled) {
        innerRadius = 0;
        outerRadius = 0;
        x = start.x;
        y = start.y;
      }
      that.graphic = renderer.arc(x, y, innerRadius, outerRadius, coords.startAngle, coords.endAngle).attr(styles).data({
        'chart-data-point': that
      }).append(group);
    },
    _checkLabelPosition: function _checkLabelPosition(label, coord) {
      var that = this;
      var visibleArea = that._getVisibleArea();
      var angleFunctions = (0, _utils.getCosAndSin)(that.middleAngle);
      var x = that.centerX + that.defaultRadius * angleFunctions.cos;
      var y = that.centerY - that.defaultRadius * angleFunctions.sin;
      if (x > visibleArea.minX && x < visibleArea.maxX && y > visibleArea.minY && y < visibleArea.maxY) {
        coord = that._moveLabelOnCanvas(coord, visibleArea, label.getBoundingRect());
      }
      return coord;
    },
    _addLabelAlignmentAndOffset: function _addLabelAlignmentAndOffset(label, coord) {
      return coord;
    },
    correctCoordinates: function correctCoordinates(correctOptions) {
      this.middleAngleCorrection = correctOptions.offset;
      this.interval = correctOptions.width;
    },
    coordsIn: function coordsIn(x, y) {
      var val = (0, _utils.convertXYToPolar)(this.series.getValueAxis().getCenter(), x, y);
      var coords = this.getMarkerCoords();
      var isBetweenAngles = coords.startAngle < coords.endAngle ? -val.phi >= coords.startAngle && -val.phi <= coords.endAngle : -val.phi <= coords.startAngle && -val.phi >= coords.endAngle;
      return val.r >= coords.innerRadius && val.r <= coords.outerRadius && isBetweenAngles;
    }
  });
  exports.polarBarPoint = polarBarPoint;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/extend","./symbol_point","./bar_point","./pie_point","../../../core/utils/type","../../core/utils","../../components/consts"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/extend"), require("./symbol_point"), require("./bar_point"), require("./pie_point"), require("../../../core/utils/type"), require("../../core/utils"), require("../../components/consts"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=polar_point.js.map