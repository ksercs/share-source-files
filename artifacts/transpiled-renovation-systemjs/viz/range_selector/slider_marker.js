!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/range_selector/slider_marker.js"], ["../core/utils","./common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/range_selector/slider_marker.js", ["../core/utils", "./common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _utils = $__require("../core/utils");
  var _common = $__require("./common");
  var POINTER_SIZE = _common.consts.pointerSize;
  var SLIDER_MARKER_UPDATE_DELAY = 75;
  function SliderMarker(renderer, root, isLeftPointer) {
    var that = this;
    that._isLeftPointer = isLeftPointer;
    that._isOverlapped = false;
    that._group = renderer.g().attr({
      'class': 'slider-marker'
    }).append(root);
    that._area = renderer.path(null, 'area').append(that._group);
    that._label = renderer.text().attr({
      align: 'left'
    }).append(that._group);
    that._tracker = renderer.rect().attr({
      'class': 'slider-marker-tracker',
      fill: '#000000',
      opacity: 0.0001
    }).css({
      cursor: 'pointer'
    }).append(that._group);
    that._border = renderer.rect(0, 0, 1, 0);
  }
  SliderMarker.prototype = {
    constructor: SliderMarker,
    _getRectSize: function _getRectSize(textSize) {
      return {
        width: Math.round(2 * this._paddingLeftRight + textSize.width),
        height: Math.round(2 * this._paddingTopBottom + textSize.height)
      };
    },
    _getTextSize: function _getTextSize() {
      var textSize = this._label.getBBox();
      if (!this._textHeight && isFinite(textSize.height)) {
        this._textHeight = textSize.height;
      }
      return {
        width: textSize.width,
        height: this._textHeight,
        y: textSize.y
      };
    },
    _getAreaPointsInfo: function _getAreaPointsInfo(textSize) {
      var that = this;
      var rectSize = that._getRectSize(textSize);
      var rectWidth = rectSize.width;
      var rectHeight = rectSize.height;
      var rectLeftBorder = -rectWidth;
      var rectRightBorder = 0;
      var pointerRightPoint = POINTER_SIZE;
      var pointerCenterPoint = 0;
      var pointerLeftPoint = -POINTER_SIZE;
      var position = that._position;
      var isLeft = that._isLeftPointer;
      var correctCloudBorders = function correctCloudBorders() {
        rectLeftBorder++;
        rectRightBorder++;
        pointerRightPoint++;
        pointerCenterPoint++;
        pointerLeftPoint++;
      };
      var checkPointerBorders = function checkPointerBorders() {
        if (pointerRightPoint > rectRightBorder) {
          pointerRightPoint = rectRightBorder;
        } else {
          if (pointerLeftPoint < rectLeftBorder) {
            pointerLeftPoint = rectLeftBorder;
          }
        }
        isLeft && correctCloudBorders();
      };
      var borderPosition = position;
      if (isLeft) {
        if (position > that._range[1] - rectWidth) {
          rectRightBorder = -position + that._range[1];
          rectLeftBorder = rectRightBorder - rectWidth;
          checkPointerBorders();
          borderPosition += rectLeftBorder;
        } else {
          rectLeftBorder = pointerLeftPoint = 0;
          rectRightBorder = rectWidth;
        }
      } else {
        if (position - that._range[0] < rectWidth) {
          rectLeftBorder = -(position - that._range[0]);
          rectRightBorder = rectLeftBorder + rectWidth;
          checkPointerBorders();
          borderPosition += rectRightBorder;
        } else {
          pointerRightPoint = 0;
          correctCloudBorders();
        }
      }
      that._borderPosition = borderPosition;
      return {
        offset: rectLeftBorder,
        isCut: (!isLeft || pointerCenterPoint !== pointerLeftPoint) && (isLeft || pointerCenterPoint !== pointerRightPoint),
        points: [rectLeftBorder, 0, rectRightBorder, 0, rectRightBorder, rectHeight, pointerRightPoint, rectHeight, pointerCenterPoint, rectHeight + POINTER_SIZE, pointerLeftPoint, rectHeight, rectLeftBorder, rectHeight]
      };
    },
    _update: function _update() {
      var that = this;
      var textSize;
      clearTimeout(that._timeout);
      that._label.attr({
        text: that._text || ''
      });
      var currentTextSize = that._getTextSize();
      var rectSize = that._getRectSize(currentTextSize);
      textSize = that._textSize || currentTextSize;
      textSize = that._textSize = currentTextSize.width > textSize.width || currentTextSize.height > textSize.height ? currentTextSize : textSize;
      that._timeout = setTimeout(function () {
        updateSliderMarker(currentTextSize, rectSize);
        that._textSize = currentTextSize;
      }, SLIDER_MARKER_UPDATE_DELAY);
      function updateSliderMarker(size, rectSize) {
        rectSize = rectSize || that._getRectSize(size);
        that._group.attr({
          translateY: -(rectSize.height + POINTER_SIZE)
        });
        var pointsData = that._getAreaPointsInfo(size);
        var points = pointsData.points;
        var offset = pointsData.offset;
        that._area.attr({
          points: points
        });
        that._border.attr({
          x: that._isLeftPointer ? points[0] - 1 : points[2],
          height: pointsData.isCut ? rectSize.height : rectSize.height + POINTER_SIZE
        });
        that._tracker.attr({
          translateX: offset,
          width: rectSize.width,
          height: rectSize.height + POINTER_SIZE
        });
        that._label.attr({
          translateX: that._paddingLeftRight + offset,
          translateY: rectSize.height / 2 - (size.y + size.height / 2)
        });
      }
      updateSliderMarker(textSize);
    },
    setText: function setText(value) {
      this._text = value;
    },
    setPosition: function setPosition(position) {
      this._position = position;
      this._update();
    },
    applyOptions: function applyOptions(options, screenRange) {
      var that = this;
      that._range = screenRange;
      that._paddingLeftRight = options.paddingLeftRight;
      that._paddingTopBottom = options.paddingTopBottom;
      that._textHeight = null;
      that._colors = [options.invalidRangeColor, options.color];
      that._area.attr({
        fill: options.color
      });
      that._border.attr({
        fill: options.borderColor
      });
      that._label.css((0, _utils.patchFontOptions)(options.font));
      that._update();
    },
    getTracker: function getTracker() {
      return this._tracker;
    },
    setValid: function setValid(isValid) {
      this._area.attr({
        fill: this._colors[Number(isValid)]
      });
    },
    setColor: function setColor(color) {
      this._area.attr({
        fill: color
      });
    },
    dispose: function dispose() {
      clearTimeout(this._timeout);
    },
    setOverlapped: function setOverlapped(isOverlapped) {
      var that = this;
      if (that._isOverlapped !== isOverlapped) {
        if (isOverlapped) {
          that._border.append(that._group);
        } else {
          that._isOverlapped && that._border.remove();
        }
        that._isOverlapped = isOverlapped;
      }
    },
    getBorderPosition: function getBorderPosition() {
      return this._borderPosition;
    }
  };
  var _default = SliderMarker;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils","./common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils"), require("./common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=slider_marker.js.map