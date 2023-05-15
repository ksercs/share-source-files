!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/gauges/circular_indicators.js"], ["./base_indicators","../core/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/gauges/circular_indicators.js", ["./base_indicators", "../core/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.twocolorneedle = exports.triangleneedle = exports.trianglemarker = exports.textcloud = exports.rectangleneedle = exports.rangebar = exports._default = void 0;
  var _base_indicators = $__require("./base_indicators");
  var _utils = $__require("../core/utils");
  var _Number = Number;
  var _getCosAndSin = _utils.getCosAndSin;
  var _convertAngleToRendererSpace = _utils.convertAngleToRendererSpace;
  function correctRadius(layout, size) {
    if (layout && layout.radius - size <= 0) {
      layout.radius = size + 1;
    }
    return layout;
  }
  var SimpleIndicator = _base_indicators.BaseIndicator.inherit({
    _move: function _move() {
      var that = this;
      var options = that._options;
      var angle = _convertAngleToRendererSpace(that._actualPosition);
      that._rootElement.rotate(angle, options.x, options.y);
      that._trackerElement && that._trackerElement.rotate(angle, options.x, options.y);
    },
    _isEnabled: function _isEnabled() {
      return this._options.width > 0;
    },
    _isVisible: function _isVisible(layout) {
      return layout.radius - _Number(this._options.indentFromCenter) > 0;
    },
    _getTrackerSettings: function _getTrackerSettings() {
      var options = this._options;
      var radius = this._getRadius();
      var indentFromCenter = this._getIndentFromCenter();
      var x = options.x;
      var y = options.y - (radius + indentFromCenter) / 2;
      var width = options.width / 2;
      var length = (radius - indentFromCenter) / 2;
      width > 10 || (width = 10);
      length > 10 || (length = 10);
      return {
        points: [x - width, y - length, x - width, y + length, x + width, y + length, x + width, y - length]
      };
    },
    _render: function _render() {
      var that = this;
      that._renderPointer();
    },
    _clearPointer: function _clearPointer() {
      delete this._element;
    },
    _clear: function _clear() {
      this._clearPointer();
    },
    _getIndentFromCenter: function _getIndentFromCenter(radius) {
      return Number(this._options.indentFromCenter) || 0;
    },
    _getRadius: function _getRadius() {
      return 0;
    },
    measure: function measure(layout) {
      var result = {
        max: layout.radius
      };
      if (this._options.indentFromCenter < 0) {
        result.inverseHorizontalOffset = result.inverseVerticalOffset = -_Number(this._options.indentFromCenter);
      }
      return result;
    },
    getTooltipParameters: function getTooltipParameters() {
      var options = this._options;
      var cosSin = _getCosAndSin(this._actualPosition);
      var r = (this._getRadius() + this._getIndentFromCenter()) / 2;
      return {
        x: options.x + cosSin.cos * r,
        y: options.y - cosSin.sin * r,
        value: this._currentValue,
        color: options.color,
        offset: options.width / 2
      };
    }
  });
  var NeedleIndicator = SimpleIndicator.inherit({
    _isVisible: function _isVisible(layout) {
      var indentFromCenter = this._adjustOffset(Number(this._options.indentFromCenter), layout.radius);
      var offset = this._adjustOffset(Number(this._options.offset), layout.radius);
      return layout.radius - indentFromCenter - offset > 0;
    },
    getOffset: function getOffset() {
      return 0;
    },
    _adjustOffset: function _adjustOffset(value, radius) {
      var minRadius = Number(this._options.beginAdaptingAtRadius);
      var diff = radius / minRadius;
      if (diff < 1) {
        value = Math.floor(value * diff);
      }
      return value || 0;
    },
    _getIndentFromCenter: function _getIndentFromCenter(radius) {
      return this._adjustOffset(Number(this._options.indentFromCenter), this._options.radius);
    },
    _getRadius: function _getRadius() {
      var options = this._options;
      return options.radius - this._adjustOffset(Number(options.offset), options.radius);
    },
    _renderSpindle: function _renderSpindle() {
      var that = this;
      var options = that._options;
      var radius = options.radius;
      var spindleSize = this._adjustOffset(_Number(options.spindleSize) / 2, radius) * 2;
      var gapSize = this._adjustOffset(_Number(options.spindleGapSize) / 2, radius) * 2 || 0;
      if (gapSize > 0) {
        gapSize = gapSize <= spindleSize ? gapSize : spindleSize;
      }
      if (spindleSize > 0) {
        that._spindleOuter = that._spindleOuter || that._renderer.circle().append(that._rootElement);
        that._spindleInner = that._spindleInner || that._renderer.circle().append(that._rootElement);
        that._spindleOuter.attr({
          'class': 'dxg-spindle-border',
          cx: options.x,
          cy: options.y,
          r: spindleSize / 2
        });
        that._spindleInner.attr({
          'class': 'dxg-spindle-hole',
          cx: options.x,
          cy: options.y,
          r: gapSize / 2,
          fill: options.containerBackgroundColor
        });
      }
    },
    _render: function _render() {
      var that = this;
      that.callBase();
      that._renderSpindle();
    },
    _clear: function _clear() {
      this.callBase();
      delete this._spindleOuter;
      delete this._spindleInner;
    }
  });
  var rectangleNeedle = NeedleIndicator.inherit({
    _renderPointer: function _renderPointer() {
      var that = this;
      var options = that._options;
      var y2 = options.y - this._getRadius();
      var y1 = options.y - this._getIndentFromCenter();
      var x1 = options.x - options.width / 2;
      var x2 = x1 + _Number(options.width);
      that._element = that._element || that._renderer.path([], 'area').append(that._rootElement);
      that._element.attr({
        points: [x1, y1, x1, y2, x2, y2, x2, y1]
      });
    }
  });
  exports.rectangleneedle = exports._default = rectangleNeedle;
  var triangleNeedle = NeedleIndicator.inherit({
    _renderPointer: function _renderPointer() {
      var that = this;
      var options = that._options;
      var y2 = options.y - this._getRadius();
      var y1 = options.y - this._getIndentFromCenter();
      var x1 = options.x - options.width / 2;
      var x2 = options.x + options.width / 2;
      that._element = that._element || that._renderer.path([], 'area').append(that._rootElement);
      that._element.attr({
        points: [x1, y1, options.x, y2, x2, y1]
      });
    }
  });
  exports.triangleneedle = triangleNeedle;
  var twoColorNeedle = NeedleIndicator.inherit({
    _renderPointer: function _renderPointer() {
      var that = this;
      var options = that._options;
      var x1 = options.x - options.width / 2;
      var x2 = options.x + options.width / 2;
      var y4 = options.y - this._getRadius();
      var y1 = options.y - this._getIndentFromCenter();
      var fraction = _Number(options.secondFraction) || 0;
      var y2;
      var y3;
      //  B253863
      if (fraction >= 1) {
        y2 = y3 = y1;
      } else if (fraction <= 0) {
        y2 = y3 = y4;
      } else {
        y3 = y4 + (y1 - y4) * fraction;
        y2 = y3 + _Number(options.space);
      }
      that._firstElement = that._firstElement || that._renderer.path([], 'area').append(that._rootElement);
      that._spaceElement = that._spaceElement || that._renderer.path([], 'area').append(that._rootElement);
      that._secondElement = that._secondElement || that._renderer.path([], 'area').append(that._rootElement);
      that._firstElement.attr({
        points: [x1, y1, x1, y2, x2, y2, x2, y1]
      });
      that._spaceElement.attr({
        points: [x1, y2, x1, y3, x2, y3, x2, y2],
        'class': 'dxg-hole',
        fill: options.containerBackgroundColor
      });
      that._secondElement.attr({
        points: [x1, y3, x1, y4, x2, y4, x2, y3],
        'class': 'dxg-part',
        fill: options.secondColor
      });
    },
    _clearPointer: function _clearPointer() {
      delete this._firstElement;
      delete this._secondElement;
      delete this._spaceElement;
    }
  });

  // The following is from circularMarker.js
  exports.twocolorneedle = twoColorNeedle;
  var triangleMarker = SimpleIndicator.inherit({
    _isEnabled: function _isEnabled() {
      return this._options.length > 0 && this._options.width > 0;
    },
    _isVisible: function _isVisible(layout) {
      return true;
    },
    resize: function resize(layout) {
      return this.callBase(correctRadius(layout, 0));
    },
    _render: function _render() {
      var that = this;
      var options = that._options;
      var x = options.x;
      var y1 = options.y - options.radius;
      var dx = options.width / 2 || 0;
      var y2 = y1 - _Number(options.length);
      that._element = that._element || that._renderer.path([], 'area').append(that._rootElement);
      var settings = {
        points: [x, y1, x - dx, y2, x + dx, y2],
        stroke: 'none',
        'stroke-width': 0,
        'stroke-linecap': 'square'
      };
      if (options.space > 0) {
        settings['stroke-width'] = Math.min(options.space, options.width / 4) || 0;
        settings.stroke = settings['stroke-width'] > 0 ? options.containerBackgroundColor || 'none' : 'none';
      }
      that._element.attr(settings).sharp();
    },
    _clear: function _clear() {
      delete this._element;
    },
    _getTrackerSettings: function _getTrackerSettings() {
      var options = this._options;
      var x = options.x;
      var y = options.y - options.radius - options.length / 2;
      var width = options.width / 2;
      var length = options.length / 2;
      width > 10 || (width = 10);
      length > 10 || (length = 10);
      return {
        points: [x - width, y - length, x - width, y + length, x + width, y + length, x + width, y - length]
      };
    },
    measure: function measure(layout) {
      return {
        min: layout.radius,
        max: layout.radius + _Number(this._options.length)
      };
    },
    getTooltipParameters: function getTooltipParameters() {
      var options = this._options;
      var cosSin = _getCosAndSin(this._actualPosition);
      var r = options.radius + options.length / 2;
      var parameters = this.callBase();
      parameters.x = options.x + cosSin.cos * r;
      parameters.y = options.y - cosSin.sin * r;
      parameters.offset = options.length / 2;
      return parameters;
    }
  });
  exports.trianglemarker = triangleMarker;
  var textCloud = _base_indicators.BaseTextCloudMarker.inherit({
    _isEnabled: function _isEnabled() {
      return true;
    },
    _isVisible: function _isVisible(layout) {
      return true;
    },
    resize: function resize(layout) {
      return this.callBase(correctRadius(layout, 0));
    },
    _getTextCloudOptions: function _getTextCloudOptions() {
      var that = this;
      var cosSin = _getCosAndSin(that._actualPosition);
      var nAngle = (0, _utils.normalizeAngle)(that._actualPosition);
      return {
        x: that._options.x + cosSin.cos * that._options.radius,
        y: that._options.y - cosSin.sin * that._options.radius,
        type: nAngle > 270 ? 'left-top' : nAngle > 180 ? 'top-right' : nAngle > 90 ? 'right-bottom' : 'bottom-left'
      };
    },
    measure: function measure(layout) {
      var that = this;
      var arrowLength = _Number(that._options.arrowLength) || 0;
      that._measureText();
      var verticalOffset = that._textFullHeight + arrowLength;
      var horizontalOffset = that._textFullWidth + arrowLength;
      return {
        min: layout.radius,
        max: layout.radius,
        horizontalOffset: horizontalOffset,
        verticalOffset: verticalOffset,
        inverseHorizontalOffset: horizontalOffset,
        inverseVerticalOffset: verticalOffset
      };
    }
  });

  // The following is from circularRangeBar.js
  exports.textcloud = textCloud;
  var rangeBar = _base_indicators.BaseRangeBar.inherit({
    _isEnabled: function _isEnabled() {
      return this._options.size > 0;
    },
    _isVisible: function _isVisible(layout) {
      return true;
    },
    resize: function resize(layout) {
      return this.callBase(correctRadius(layout, _Number(this._options.size)));
    },
    _createBarItem: function _createBarItem() {
      return this._renderer.arc().attr({
        'stroke-linejoin': 'round'
      }).append(this._rootElement);
    },
    _createTracker: function _createTracker() {
      return this._renderer.arc().attr({
        'stroke-linejoin': 'round'
      });
    },
    _setBarSides: function _setBarSides() {
      var that = this;
      that._maxSide = that._options.radius;
      that._minSide = that._maxSide - _Number(that._options.size);
    },
    _getSpace: function _getSpace() {
      var options = this._options;
      return options.space > 0 ? options.space * 180 / options.radius / Math.PI : 0;
    },
    _isTextVisible: function _isTextVisible() {
      var options = this._options.text || {};
      return options.indent > 0;
    },
    _setTextItemsSides: function _setTextItemsSides() {
      var that = this;
      var options = that._options;
      var indent = _Number(options.text.indent);
      that._lineFrom = options.y - options.radius;
      that._lineTo = that._lineFrom - indent;
      that._textRadius = options.radius + indent;
    },
    _getPositions: function _getPositions() {
      var that = this;
      var basePosition = that._basePosition;
      var actualPosition = that._actualPosition;
      var mainPosition1;
      var mainPosition2;
      if (basePosition >= actualPosition) {
        mainPosition1 = basePosition;
        mainPosition2 = actualPosition;
      } else {
        mainPosition1 = actualPosition;
        mainPosition2 = basePosition;
      }
      return {
        start: that._startPosition,
        end: that._endPosition,
        main1: mainPosition1,
        main2: mainPosition2,
        back1: Math.min(mainPosition1 + that._space, that._startPosition),
        back2: Math.max(mainPosition2 - that._space, that._endPosition)
      };
    },
    _buildItemSettings: function _buildItemSettings(from, to) {
      var that = this;
      return {
        x: that._options.x,
        y: that._options.y,
        innerRadius: that._minSide,
        outerRadius: that._maxSide,
        startAngle: to,
        endAngle: from
      };
    },
    _updateTextPosition: function _updateTextPosition() {
      var that = this;
      var cosSin = _getCosAndSin(that._actualPosition);
      var x = that._options.x + that._textRadius * cosSin.cos;
      var y = that._options.y - that._textRadius * cosSin.sin;
      x += cosSin.cos * that._textWidth * 0.6;
      y -= cosSin.sin * that._textHeight * 0.6;
      that._text.attr({
        x: x,
        y: y + that._textVerticalOffset
      });
    },
    _updateLinePosition: function _updateLinePosition() {
      var that = this;
      var x = that._options.x;
      var x1;
      var x2;
      if (that._basePosition > that._actualPosition) {
        x1 = x - 2;
        x2 = x;
      } else if (that._basePosition < that._actualPosition) {
        x1 = x;
        x2 = x + 2;
      } else {
        x1 = x - 1;
        x2 = x + 1;
      }
      that._line.attr({
        points: [x1, that._lineFrom, x1, that._lineTo, x2, that._lineTo, x2, that._lineFrom]
      }).rotate(_convertAngleToRendererSpace(that._actualPosition), x, that._options.y).sharp();
    },
    _getTooltipPosition: function _getTooltipPosition() {
      var that = this;
      var cosSin = _getCosAndSin((that._basePosition + that._actualPosition) / 2);
      var r = (that._minSide + that._maxSide) / 2;
      return {
        x: that._options.x + cosSin.cos * r,
        y: that._options.y - cosSin.sin * r
      };
    },
    measure: function measure(layout) {
      var that = this;
      var result = {
        min: layout.radius - _Number(that._options.size),
        max: layout.radius
      };
      that._measureText();
      if (that._hasText) {
        result.max += _Number(that._options.text.indent);
        result.horizontalOffset = that._textWidth;
        result.verticalOffset = that._textHeight;
      }
      return result;
    }
  });

  /* eslint-disable spellcheck/spell-checker */
  exports.rangebar = rangeBar;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./base_indicators","../core/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./base_indicators"), require("../core/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=circular_indicators.js.map