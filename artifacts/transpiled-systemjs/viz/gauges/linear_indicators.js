!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/gauges/linear_indicators.js"], ["./base_indicators","../core/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/gauges/linear_indicators.js", ["./base_indicators", "../core/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.trianglemarker = exports.textcloud = exports.rhombus = exports.rectangle = exports.rangebar = exports.circle = exports._default = void 0;
  var _base_indicators = $__require("./base_indicators");
  var _utils = $__require("../core/utils");
  var _Number = Number;
  var SimpleIndicator = _base_indicators.BaseIndicator.inherit({
    _move: function _move() {
      var that = this;
      var delta = that._actualPosition - that._zeroPosition;
      that._rootElement.move(that.vertical ? 0 : delta, that.vertical ? delta : 0);
      that._trackerElement && that._trackerElement.move(that.vertical ? 0 : delta, that.vertical ? delta : 0);
    },
    _isEnabled: function _isEnabled() {
      this.vertical = this._options.vertical;
      return this._options.length > 0 && this._options.width > 0;
    },
    _isVisible: function _isVisible() {
      return true;
    },
    _getTrackerSettings: function _getTrackerSettings() {
      var options = this._options;
      var x1;
      var x2;
      var y1;
      var y2;
      var width = options.width / 2;
      var length = options.length / 2;
      var p = this._zeroPosition;
      width > 10 || (width = 10);
      length > 10 || (length = 10);
      if (this.vertical) {
        x1 = options.x - length;
        x2 = options.x + length;
        y1 = p + width;
        y2 = p - width;
      } else {
        x1 = p - width;
        x2 = p + width;
        y1 = options.y + length;
        y2 = options.y - length;
      }
      return {
        points: [x1, y1, x1, y2, x2, y2, x2, y1]
      };
    },
    _render: function _render() {
      var that = this;
      that._zeroPosition = that._translator.getCodomainStart();
    },
    _clear: function _clear() {
      delete this._element;
    },
    measure: function measure(layout) {
      var p = this.vertical ? layout.x : layout.y;
      return {
        min: p - this._options.length / 2,
        max: p + this._options.length / 2
      };
    },
    getTooltipParameters: function getTooltipParameters() {
      var that = this;
      var options = that._options;
      var p = that._actualPosition;
      var parameters = {
        x: p,
        y: p,
        value: that._currentValue,
        color: options.color,
        offset: options.width / 2
      };
      that.vertical ? parameters.x = options.x : parameters.y = options.y;
      return parameters;
    }
  });
  var rectangle = SimpleIndicator.inherit({
    _render: function _render() {
      var that = this;
      var options = that._options;
      var x1;
      var x2;
      var y1;
      var y2;
      that.callBase();
      var p = that._zeroPosition;
      if (that.vertical) {
        x1 = options.x - options.length / 2;
        x2 = options.x + options.length / 2;
        y1 = p + options.width / 2;
        y2 = p - options.width / 2;
      } else {
        x1 = p - options.width / 2;
        x2 = p + options.width / 2;
        y1 = options.y + options.length / 2;
        y2 = options.y - options.length / 2;
      }
      that._element = that._element || that._renderer.path([], 'area').append(that._rootElement);
      that._element.attr({
        points: [x1, y1, x1, y2, x2, y2, x2, y1]
      });
    }
  });
  exports.rectangle = rectangle;
  var rhombus = SimpleIndicator.inherit({
    _render: function _render() {
      var that = this;
      var options = that._options;
      var x;
      var y;
      var dx;
      var dy;
      that.callBase();
      if (that.vertical) {
        x = options.x;
        y = that._zeroPosition;
        dx = options.length / 2 || 0;
        dy = options.width / 2 || 0;
      } else {
        x = that._zeroPosition;
        y = options.y;
        dx = options.width / 2 || 0;
        dy = options.length / 2 || 0;
      }
      that._element = that._element || that._renderer.path([], 'area').append(that._rootElement);
      that._element.attr({
        points: [x - dx, y, x, y - dy, x + dx, y, x, y + dy]
      });
    }
  });
  exports.rhombus = rhombus;
  var circle = SimpleIndicator.inherit({
    _render: function _render() {
      var that = this;
      var options = that._options;
      var x;
      var y;
      that.callBase();
      if (that.vertical) {
        x = options.x;
        y = that._zeroPosition;
      } else {
        x = that._zeroPosition;
        y = options.y;
      }
      var r = options.length / 2 || 0;
      that._element = that._element || that._renderer.circle().append(that._rootElement);
      that._element.attr({
        cx: x,
        cy: y,
        r: r
      });
    }
  });

  // The following is from linearMarker.js
  exports.circle = circle;
  var triangleMarker = SimpleIndicator.inherit({
    _isEnabled: function _isEnabled() {
      var that = this;
      that.vertical = that._options.vertical;
      that._inverted = that.vertical ? (0, _utils.normalizeEnum)(that._options.horizontalOrientation) === 'right' : (0, _utils.normalizeEnum)(that._options.verticalOrientation) === 'bottom';
      return that._options.length > 0 && that._options.width > 0;
    },
    _isVisible: function _isVisible() {
      return true;
    },
    _render: function _render() {
      var that = this;
      var options = that._options;
      var x1;
      var x2;
      var y1;
      var y2;
      var settings = {
        stroke: 'none',
        'stroke-width': 0,
        'stroke-linecap': 'square'
      };
      that.callBase();
      if (that.vertical) {
        x1 = options.x;
        y1 = that._zeroPosition;
        x2 = x1 + _Number(that._inverted ? options.length : -options.length);
        settings.points = [x1, y1, x2, y1 - options.width / 2, x2, y1 + options.width / 2];
      } else {
        y1 = options.y;
        x1 = that._zeroPosition;
        y2 = y1 + _Number(that._inverted ? options.length : -options.length);
        settings.points = [x1, y1, x1 - options.width / 2, y2, x1 + options.width / 2, y2];
      }
      if (options.space > 0) {
        settings['stroke-width'] = Math.min(options.space, options.width / 4) || 0;
        settings.stroke = settings['stroke-width'] > 0 ? options.containerBackgroundColor || 'none' : 'none';
      }
      that._element = that._element || that._renderer.path([], 'area').append(that._rootElement);
      that._element.attr(settings).sharp();
    },
    _getTrackerSettings: function _getTrackerSettings() {
      var that = this;
      var options = that._options;
      var width = options.width / 2;
      var length = _Number(options.length);
      var x1;
      var x2;
      var y1;
      var y2;
      var result;
      width > 10 || (width = 10);
      length > 20 || (length = 20);
      if (that.vertical) {
        x1 = options.x;
        x2 = x1 + (that._inverted ? length : -length);
        y1 = that._zeroPosition + width;
        y2 = that._zeroPosition - width;
        result = [x1, y1, x2, y1, x2, y2, x1, y2];
      } else {
        y1 = options.y;
        y2 = y1 + (that._inverted ? length : -length);
        x1 = that._zeroPosition - width;
        x2 = that._zeroPosition + width;
        result = [x1, y1, x1, y2, x2, y2, x2, y1];
      }
      return {
        points: result
      };
    },
    measure: function measure(layout) {
      var that = this;
      var length = _Number(that._options.length);
      var minBound;
      var maxBound;
      if (that.vertical) {
        minBound = maxBound = layout.x;
        if (that._inverted) {
          maxBound = minBound + length;
        } else {
          minBound = maxBound - length;
        }
      } else {
        minBound = maxBound = layout.y;
        if (that._inverted) {
          maxBound = minBound + length;
        } else {
          minBound = maxBound - length;
        }
      }
      return {
        min: minBound,
        max: maxBound
      };
    },
    getTooltipParameters: function getTooltipParameters() {
      var that = this;
      var options = that._options;
      var s = (that._inverted ? options.length : -options.length) / 2;
      var parameters = that.callBase();
      that.vertical ? parameters.x += s : parameters.y += s;
      parameters.offset = options.length / 2;
      return parameters;
    }
  });
  exports.trianglemarker = triangleMarker;
  var textCloud = _base_indicators.BaseTextCloudMarker.inherit({
    _isEnabled: function _isEnabled() {
      var that = this;
      that.vertical = that._options.vertical;
      that._inverted = that.vertical ? (0, _utils.normalizeEnum)(that._options.horizontalOrientation) === 'right' : (0, _utils.normalizeEnum)(that._options.verticalOrientation) === 'bottom';
      return true;
    },
    _isVisible: function _isVisible() {
      return true;
    },
    _getTextCloudOptions: function _getTextCloudOptions() {
      var that = this;
      var x = that._actualPosition;
      var y = that._actualPosition;
      var type;
      if (that.vertical) {
        x = that._options.x;
        type = that._inverted ? 'top-left' : 'top-right';
      } else {
        y = that._options.y;
        type = that._inverted ? 'right-top' : 'right-bottom';
      }
      return {
        x: x,
        y: y,
        type: type
      };
    },
    measure: function measure(layout) {
      var that = this;
      var minBound;
      var maxBound;
      var arrowLength = _Number(that._options.arrowLength) || 0;
      that._measureText();
      if (that.vertical) {
        if (that._inverted) {
          minBound = layout.x;
          maxBound = layout.x + arrowLength + that._textFullWidth;
        } else {
          minBound = layout.x - arrowLength - that._textFullWidth;
          maxBound = layout.x;
        }
      } else {
        if (that._inverted) {
          minBound = layout.y;
          maxBound = layout.y + arrowLength + that._textFullHeight;
        } else {
          minBound = layout.y - arrowLength - that._textFullHeight;
          maxBound = layout.y;
        }
      }
      return {
        min: minBound,
        max: maxBound,
        indent: 0
      };
    },
    _correctCloudType: function _correctCloudType(type, _ref, _ref2) {
      var x = _ref.x,
          y = _ref.y;
      var width = _ref2.width,
          height = _ref2.height;
      if (type === 'right-top' || type === 'right-bottom') {
        if (x - width < this._translator.getCodomainStart()) {
          type = "left-".concat(type.split('-')[1]);
        }
      } else if (type === 'top-left' || type === 'top-right') {
        if (y + height > this._translator.getCodomainStart()) {
          type = "bottom-".concat(type.split('-')[1]);
        }
      }
      return type;
    }
  });

  // The following is from linearRangeBar.js
  exports.textcloud = textCloud;
  var rangeBar = _base_indicators.BaseRangeBar.inherit({
    _isEnabled: function _isEnabled() {
      var that = this;
      that.vertical = that._options.vertical;
      that._inverted = that.vertical ? (0, _utils.normalizeEnum)(that._options.horizontalOrientation) === 'right' : (0, _utils.normalizeEnum)(that._options.verticalOrientation) === 'bottom';
      return that._options.size > 0;
    },
    _isVisible: function _isVisible() {
      return true;
    },
    _createBarItem: function _createBarItem() {
      return this._renderer.path([], 'area').append(this._rootElement);
    },
    _createTracker: function _createTracker() {
      return this._renderer.path([], 'area');
    },
    _setBarSides: function _setBarSides() {
      var that = this;
      var options = that._options;
      var size = _Number(options.size);
      var minSide;
      var maxSide;
      if (that.vertical) {
        if (that._inverted) {
          minSide = options.x;
          maxSide = options.x + size;
        } else {
          minSide = options.x - size;
          maxSide = options.x;
        }
      } else {
        if (that._inverted) {
          minSide = options.y;
          maxSide = options.y + size;
        } else {
          minSide = options.y - size;
          maxSide = options.y;
        }
      }
      that._minSide = minSide;
      that._maxSide = maxSide;
      that._minBound = minSide;
      that._maxBound = maxSide;
    },
    _getSpace: function _getSpace() {
      var options = this._options;
      return options.space > 0 ? _Number(options.space) : 0;
    },
    _isTextVisible: function _isTextVisible() {
      var textOptions = this._options.text || {};
      return textOptions.indent > 0 || textOptions.indent < 0;
    },
    _getTextAlign: function _getTextAlign() {
      return this.vertical ? this._options.text.indent > 0 ? 'left' : 'right' : 'center';
    },
    _setTextItemsSides: function _setTextItemsSides() {
      var that = this;
      var indent = _Number(that._options.text.indent);
      if (indent > 0) {
        that._lineStart = that._maxSide;
        that._lineEnd = that._maxSide + indent;
        that._textPosition = that._lineEnd + (that.vertical ? 2 : that._textHeight / 2);
        that._maxBound = that._textPosition + (that.vertical ? that._textWidth : that._textHeight / 2);
      } else if (indent < 0) {
        that._lineStart = that._minSide;
        that._lineEnd = that._minSide + indent;
        that._textPosition = that._lineEnd - (that.vertical ? 2 : that._textHeight / 2);
        that._minBound = that._textPosition - (that.vertical ? that._textWidth : that._textHeight / 2);
      }
    },
    _getPositions: function _getPositions() {
      var that = this;
      var startPosition = that._startPosition;
      var endPosition = that._endPosition;
      var space = that._space;
      var basePosition = that._basePosition;
      var actualPosition = that._actualPosition;
      var mainPosition1;
      var mainPosition2;
      var backPosition1;
      var backPosition2;
      if (startPosition < endPosition) {
        if (basePosition < actualPosition) {
          mainPosition1 = basePosition;
          mainPosition2 = actualPosition;
        } else {
          mainPosition1 = actualPosition;
          mainPosition2 = basePosition;
        }
        backPosition1 = mainPosition1 - space;
        backPosition2 = mainPosition2 + space;
      } else {
        if (basePosition > actualPosition) {
          mainPosition1 = basePosition;
          mainPosition2 = actualPosition;
        } else {
          mainPosition1 = actualPosition;
          mainPosition2 = basePosition;
        }
        backPosition1 = mainPosition1 + space;
        backPosition2 = mainPosition2 - space;
      }
      return {
        start: startPosition,
        end: endPosition,
        main1: mainPosition1,
        main2: mainPosition2,
        back1: backPosition1,
        back2: backPosition2
      };
    },
    _buildItemSettings: function _buildItemSettings(from, to) {
      var that = this;
      var side1 = that._minSide;
      var side2 = that._maxSide;
      var points = that.vertical ? [side1, from, side1, to, side2, to, side2, from] : [from, side1, from, side2, to, side2, to, side1];
      return {
        points: points
      };
    },
    _updateTextPosition: function _updateTextPosition() {
      var that = this;
      that._text.attr(that.vertical ? {
        x: that._textPosition,
        y: that._actualPosition + that._textVerticalOffset
      } : {
        x: that._actualPosition,
        y: that._textPosition + that._textVerticalOffset
      });
    },
    _updateLinePosition: function _updateLinePosition() {
      var that = this;
      var actualPosition = that._actualPosition;
      var side1;
      var side2;
      var points;
      if (that.vertical) {
        if (that._basePosition >= actualPosition) {
          side1 = actualPosition;
          side2 = actualPosition + 2;
        } else {
          side1 = actualPosition - 2;
          side2 = actualPosition;
        }
        points = [that._lineStart, side1, that._lineStart, side2, that._lineEnd, side2, that._lineEnd, side1];
      } else {
        if (that._basePosition <= actualPosition) {
          side1 = actualPosition - 2;
          side2 = actualPosition;
        } else {
          side1 = actualPosition;
          side2 = actualPosition + 2;
        }
        points = [side1, that._lineStart, side1, that._lineEnd, side2, that._lineEnd, side2, that._lineStart];
      }
      that._line.attr({
        points: points
      }).sharp();
    },
    _getTooltipPosition: function _getTooltipPosition() {
      var that = this;
      var crossCenter = (that._minSide + that._maxSide) / 2;
      var alongCenter = (that._basePosition + that._actualPosition) / 2;
      return that.vertical ? {
        x: crossCenter,
        y: alongCenter
      } : {
        x: alongCenter,
        y: crossCenter
      };
    },
    measure: function measure(layout) {
      var that = this;
      var size = _Number(that._options.size);
      var textIndent = _Number(that._options.text.indent);
      var minBound;
      var maxBound;
      var indent;
      that._measureText();
      if (that.vertical) {
        minBound = maxBound = layout.x;
        if (that._inverted) {
          maxBound = maxBound + size;
        } else {
          minBound = minBound - size;
        }
        if (that._hasText) {
          indent = that._textHeight / 2;
          if (textIndent > 0) {
            maxBound += textIndent + that._textWidth;
          }
          if (textIndent < 0) {
            minBound += textIndent - that._textWidth;
          }
        }
      } else {
        minBound = maxBound = layout.y;
        if (that._inverted) {
          maxBound = maxBound + size;
        } else {
          minBound = minBound - size;
        }
        if (that._hasText) {
          indent = that._textWidth / 2;
          if (textIndent > 0) {
            maxBound += textIndent + that._textHeight;
          }
          if (textIndent < 0) {
            minBound += textIndent - that._textHeight;
          }
        }
      }
      return {
        min: minBound,
        max: maxBound,
        indent: indent
      };
    }
  });
  /* eslint-disable spellcheck/spell-checker */
  exports.rangebar = exports._default = rangeBar;
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
//# sourceMappingURL=linear_indicators.js.map