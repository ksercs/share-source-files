!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/series/points/pie_point.js"], ["../../../core/utils/extend","./symbol_point","../../core/utils","../../../core/utils/type","../../components/consts"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/series/points/pie_point.js", ["../../../core/utils/extend", "./symbol_point", "../../core/utils", "../../../core/utils/type", "../../components/consts"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _extend2 = $__require("../../../core/utils/extend");
  var _symbol_point = _interopRequireDefault($__require("./symbol_point"));
  var _utils = $__require("../../core/utils");
  var _type = $__require("../../../core/utils/type");
  var _consts = _interopRequireDefault($__require("../../components/consts"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _extend = _extend2.extend;
  var _round = Math.round;
  var _sqrt = Math.sqrt;
  var _acos = Math.acos;
  var DEG = 180 / Math.PI;
  var _abs = Math.abs;
  var RADIAL_LABEL_INDENT = _consts.default.radialLabelIndent;
  var _default = _extend({}, _symbol_point.default, {
    _updateData: function _updateData(data, argumentChanged) {
      var that = this;
      _symbol_point.default._updateData.call(this, data);
      if (argumentChanged || !(0, _type.isDefined)(that._visible)) {
        that._visible = true;
      }
      that.minValue = that.initialMinValue = that.originalMinValue = (0, _type.isDefined)(data.minValue) ? data.minValue : 0;
    },
    animate: function animate(complete, duration, delay) {
      var that = this;
      that.graphic.animate({
        x: that.centerX,
        y: that.centerY,
        outerRadius: that.radiusOuter,
        innerRadius: that.radiusInner,
        startAngle: that.toAngle,
        endAngle: that.fromAngle
      }, {
        delay: delay,
        partitionDuration: duration
      }, complete);
    },
    correctPosition: function correctPosition(correction) {
      var that = this;
      that.correctRadius(correction);
      that.correctLabelRadius(correction.radiusOuter + RADIAL_LABEL_INDENT);
      that.centerX = correction.centerX;
      that.centerY = correction.centerY;
    },
    correctRadius: function correctRadius(correction) {
      this.radiusInner = correction.radiusInner;
      this.radiusOuter = correction.radiusOuter;
    },
    correctLabelRadius: function correctLabelRadius(radiusLabels) {
      this.radiusLabels = radiusLabels;
    },
    correctValue: function correctValue(correction, percent, base) {
      var that = this;
      that.value = (base || that.normalInitialValue) + correction;
      that.minValue = correction;
      that.percent = percent;
      that._label.setDataField('percent', percent);
    },
    _updateLabelData: function _updateLabelData() {
      this._label.setData(this._getLabelFormatObject());
    },
    _getShiftLabelCoords: function _getShiftLabelCoords() {
      var that = this;
      var bBox = that._label.getBoundingRect();
      var coord = that._getLabelCoords(that._label);
      var visibleArea = that._getVisibleArea();
      if (that._isLabelDrawingWithoutPoints) {
        return that._checkLabelPosition(coord, bBox, visibleArea);
      } else {
        return that._getLabelExtraCoord(coord, that._checkVerticalLabelPosition(coord, bBox, visibleArea), bBox);
      }
    },
    _getLabelPosition: function _getLabelPosition(options) {
      return options.position;
    },
    getAnnotationCoords: function getAnnotationCoords(location) {
      return this._getElementCoords(location !== 'edge' ? 'inside' : 'outside', this.radiusOuter, 0);
    },
    _getElementCoords: function _getElementCoords(position, elementRadius, radialOffset) {
      var bBox = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      var that = this;
      var angleFunctions = (0, _utils.getCosAndSin)(that.middleAngle);
      var radiusInner = that.radiusInner;
      var radiusOuter = that.radiusOuter;
      var columnsPosition = position === 'columns';
      var rad;
      var x;
      if (position === 'inside') {
        rad = radiusInner + (radiusOuter - radiusInner) / 2 + radialOffset;
        x = that.centerX + rad * angleFunctions.cos - bBox.width / 2;
      } else {
        rad = elementRadius + radialOffset;
        if (angleFunctions.cos > 0.1 || columnsPosition && angleFunctions.cos >= 0) {
          x = that.centerX + rad * angleFunctions.cos;
        } else if (angleFunctions.cos < -0.1 || columnsPosition && angleFunctions.cos < 0) {
          x = that.centerX + rad * angleFunctions.cos - bBox.width;
        } else {
          x = that.centerX + rad * angleFunctions.cos - bBox.width / 2;
        }
      }
      return {
        x: x,
        y: _round(that.centerY - rad * angleFunctions.sin - bBox.height / 2)
      };
    },
    _getLabelCoords: function _getLabelCoords(label) {
      var that = this;
      var bBox = label.getBoundingRect();
      var options = label.getLayoutOptions();
      var position = that._getLabelPosition(options);
      return that._getElementCoords(position, that.radiusLabels, options.radialOffset, bBox);
    },
    _correctLabelCoord: function _correctLabelCoord(coord, moveLabelsFromCenter) {
      var that = this;
      var label = that._label;
      var bBox = label.getBoundingRect();
      var labelWidth = bBox.width;
      var options = label.getLayoutOptions();
      var visibleArea = that._getVisibleArea();
      var rightBorderX = visibleArea.maxX - labelWidth;
      var leftBorderX = visibleArea.minX;
      var angleOfPoint = (0, _utils.normalizeAngle)(that.middleAngle);
      var centerX = that.centerX;
      var connectorOffset = options.connectorOffset;
      var x = coord.x;
      if (options.position === 'columns') {
        if (angleOfPoint <= 90 || angleOfPoint >= 270) {
          x = rightBorderX;
        } else {
          x = leftBorderX;
        }
        coord.x = x;
      } else if (options.position !== 'inside' && moveLabelsFromCenter) {
        if (angleOfPoint <= 90 || angleOfPoint >= 270) {
          if (x - connectorOffset < centerX) {
            x = centerX + connectorOffset;
          }
        } else {
          if (x + labelWidth + connectorOffset > centerX) {
            x = centerX - labelWidth - connectorOffset;
          }
        }
        coord.x = x;
      }
      return coord;
    },
    drawLabel: function drawLabel() {
      this.translate();

      // this function is called for drawing labels without points for checking size of labels
      this._isLabelDrawingWithoutPoints = true;
      this._drawLabel();
      this._isLabelDrawingWithoutPoints = false;
    },
    updateLabelCoord: function updateLabelCoord(moveLabelsFromCenter) {
      var that = this;
      var bBox = that._label.getBoundingRect();
      var coord = that._correctLabelCoord(bBox, moveLabelsFromCenter);
      coord = that._checkHorizontalLabelPosition(coord, bBox, that._getVisibleArea());
      that._label.shift(_round(coord.x), _round(bBox.y));
    },
    _checkVerticalLabelPosition: function _checkVerticalLabelPosition(coord, box, visibleArea) {
      var x = coord.x;
      var y = coord.y;
      if (coord.y + box.height > visibleArea.maxY) {
        y = visibleArea.maxY - box.height;
      } else if (coord.y < visibleArea.minY) {
        y = visibleArea.minY;
      }
      return {
        x: x,
        y: y
      };
    },
    _getLabelExtraCoord: function _getLabelExtraCoord(coord, shiftCoord, box) {
      return coord.y !== shiftCoord.y ? (0, _utils.getVerticallyShiftedAngularCoords)({
        x: coord.x,
        y: coord.y,
        width: box.width,
        height: box.height
      }, shiftCoord.y - coord.y, {
        x: this.centerX,
        y: this.centerY
      }) : coord;
    },
    _checkHorizontalLabelPosition: function _checkHorizontalLabelPosition(coord, box, visibleArea) {
      var x = coord.x;
      var y = coord.y;
      if (coord.x + box.width > visibleArea.maxX) {
        x = visibleArea.maxX - box.width;
      } else if (coord.x < visibleArea.minX) {
        x = visibleArea.minX;
      }
      return {
        x: x,
        y: y
      };
    },
    applyWordWrap: function applyWordWrap(moveLabelsFromCenter) {
      var that = this;
      var label = that._label;
      var box = label.getBoundingRect();
      var visibleArea = that._getVisibleArea();
      var position = label.getLayoutOptions().position;
      var width = box.width;
      var rowCountChanged = false;
      if (position === 'columns' && that.series.index > 0) {
        width = visibleArea.maxX - that.centerX - that.radiusLabels;
      } else if (position === 'inside') {
        if (width > visibleArea.maxX - visibleArea.minX) {
          width = visibleArea.maxX - visibleArea.minX;
        }
      } else {
        if (moveLabelsFromCenter && box.x < that.centerX && box.width + box.x > that.centerX) {
          width = Math.floor((visibleArea.maxX - visibleArea.minX) / 2);
        } else if (box.x + width > visibleArea.maxX) {
          width = visibleArea.maxX - box.x;
        } else if (box.x < visibleArea.minX) {
          width = box.x + width - visibleArea.minX;
        }
      }
      if (width < box.width) {
        rowCountChanged = label.fit(width);
      }
      return rowCountChanged;
    },
    setLabelTrackerData: function setLabelTrackerData() {
      this._label.setTrackerData(this);
    },
    _checkLabelPosition: function _checkLabelPosition(coord, bBox, visibleArea) {
      coord = this._checkHorizontalLabelPosition(coord, bBox, visibleArea);
      return this._checkVerticalLabelPosition(coord, bBox, visibleArea);
    },
    _getLabelConnector: function _getLabelConnector() {
      var that = this;
      var rad = that.radiusOuter;
      var seriesStyle = that._options.styles.normal;
      var strokeWidthBy2 = seriesStyle['stroke-width'] / 2;
      var borderWidth = that.series.getOptions().containerBackgroundColor === seriesStyle.stroke ? _round(strokeWidthBy2) : _round(-strokeWidthBy2);
      var angleFunctions = (0, _utils.getCosAndSin)(_round(that.middleAngle));
      return {
        x: _round(that.centerX + (rad - borderWidth) * angleFunctions.cos),
        y: _round(that.centerY - (rad - borderWidth) * angleFunctions.sin),
        angle: that.middleAngle
      };
    },
    _drawMarker: function _drawMarker(renderer, group, animationEnabled, firstDrawing) {
      var that = this;
      var radiusOuter = that.radiusOuter;
      var radiusInner = that.radiusInner;
      var fromAngle = that.fromAngle;
      var toAngle = that.toAngle;
      if (animationEnabled) {
        radiusInner = radiusOuter = 0;
        if (!firstDrawing) {
          fromAngle = toAngle = that.shiftedAngle;
        }
      }
      that.graphic = renderer.arc(that.centerX, that.centerY, radiusInner, radiusOuter, toAngle, fromAngle).attr({
        'stroke-linejoin': 'round'
      }).smartAttr(that._getStyle()).data({
        'chart-data-point': that
      }).sharp().append(group);
    },
    getTooltipParams: function getTooltipParams() {
      var that = this;
      var angleFunctions = (0, _utils.getCosAndSin)(that.middleAngle);
      var radiusInner = that.radiusInner;
      var radiusOuter = that.radiusOuter;
      return {
        x: that.centerX + (radiusInner + (radiusOuter - radiusInner) / 2) * angleFunctions.cos,
        y: that.centerY - (radiusInner + (radiusOuter - radiusInner) / 2) * angleFunctions.sin,
        offset: 0
      };
    },
    _translate: function _translate() {
      var that = this;
      var angle = that.shiftedAngle || 0;
      var value = that.value;
      var minValue = that.minValue;
      var translator = that._getValTranslator();
      that.fromAngle = translator.translate(minValue) + angle;
      that.toAngle = translator.translate(value) + angle;
      that.middleAngle = translator.translate((value - minValue) / 2 + minValue) + angle;
      if (!that.isVisible()) {
        that.middleAngle = that.toAngle = that.fromAngle = that.fromAngle || angle;
      }
    },
    getMarkerVisibility: function getMarkerVisibility() {
      return true;
    },
    _updateMarker: function _updateMarker(animationEnabled, style, _, callback) {
      var that = this;
      if (!animationEnabled) {
        style = _extend({
          x: that.centerX,
          y: that.centerY,
          outerRadius: that.radiusOuter,
          innerRadius: that.radiusInner,
          startAngle: that.toAngle,
          endAngle: that.fromAngle
        }, style);
      }
      that.graphic.smartAttr(style).sharp();
      callback && callback();
    },
    getLegendStyles: function getLegendStyles() {
      return this._styles.legendStyles;
    },
    isInVisibleArea: function isInVisibleArea() {
      return true;
    },
    hide: function hide() {
      var that = this;
      if (that._visible) {
        that._visible = false;
        that.hideTooltip();
        that._options.visibilityChanged();
      }
    },
    show: function show() {
      var that = this;
      if (!that._visible) {
        that._visible = true;
        that._options.visibilityChanged();
      }
    },
    setInvisibility: function setInvisibility() {
      this._label.draw(false);
    },
    isVisible: function isVisible() {
      return this._visible;
    },
    _getFormatObject: function _getFormatObject(tooltip) {
      var formatObject = _symbol_point.default._getFormatObject.call(this, tooltip);
      var percent = this.percent;
      formatObject.percent = percent;
      formatObject.percentText = tooltip.formatValue(percent, 'percent');
      return formatObject;
    },
    getColor: function getColor() {
      return this._styles.normal.fill;
    },
    coordsIn: function coordsIn(x, y) {
      var that = this;
      var lx = x - that.centerX;
      var ly = y - that.centerY;
      var r = _sqrt(lx * lx + ly * ly);
      var fromAngle = that.fromAngle % 360;
      var toAngle = that.toAngle % 360;
      var angle;
      if (r < that.radiusInner || r > that.radiusOuter || r === 0) {
        return false;
      }
      angle = _acos(lx / r) * DEG * (ly > 0 ? -1 : 1);
      if (angle < 0) {
        angle += 360;
      }
      if (fromAngle === toAngle && _abs(that.toAngle - that.fromAngle) > 1E-4) {
        return true;
      } else {
        return fromAngle >= toAngle ? angle <= fromAngle && angle >= toAngle : !(angle >= fromAngle && angle <= toAngle);
      }
    }
  });
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/extend","./symbol_point","../../core/utils","../../../core/utils/type","../../components/consts"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/extend"), require("./symbol_point"), require("../../core/utils"), require("../../../core/utils/type"), require("../../components/consts"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pie_point.js.map