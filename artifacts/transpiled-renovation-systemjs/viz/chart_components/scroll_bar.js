!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/chart_components/scroll_bar.js"], ["../../events/core/events_engine","../../events/utils/index","../../core/utils/extend","../translators/translator2d","../../core/utils/type","../../core/utils/common","../../events/drag"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/chart_components/scroll_bar.js", ["../../events/core/events_engine", "../../events/utils/index", "../../core/utils/extend", "../translators/translator2d", "../../core/utils/type", "../../core/utils/common", "../../events/drag"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.ScrollBar = void 0;
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _index = $__require("../../events/utils/index");
  var _extend = $__require("../../core/utils/extend");
  var _translator2d = $__require("../translators/translator2d");
  var _type = $__require("../../core/utils/type");
  var _common = $__require("../../core/utils/common");
  var _drag = $__require("../../events/drag");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _min = Math.min;
  var _max = Math.max;
  var MIN_SCROLL_BAR_SIZE = 2;
  var ScrollBar = function ScrollBar(renderer, group) {
    this._translator = new _translator2d.Translator2D({}, {}, {});
    this._scroll = renderer.rect().append(group);
    this._addEvents();
  };
  exports.ScrollBar = ScrollBar;
  function _getXCoord(canvas, pos, offset, width) {
    var x = 0;
    if (pos === 'right') {
      x = canvas.width - canvas.right + offset;
    } else if (pos === 'left') {
      x = canvas.left - offset - width;
    }
    return x;
  }
  function _getYCoord(canvas, pos, offset, width) {
    var y = 0;
    if (pos === 'top') {
      y = canvas.top - offset;
    } else if (pos === 'bottom') {
      y = canvas.height - canvas.bottom + width + offset;
    }
    return y;
  }
  ScrollBar.prototype = {
    _addEvents: function _addEvents() {
      var _this = this;
      var scrollElement = this._scroll.element;
      _events_engine.default.on(scrollElement, _drag.start, function (e) {
        (0, _index.fireEvent)({
          type: 'dxc-scroll-start',
          originalEvent: e,
          target: scrollElement
        });
      });
      _events_engine.default.on(scrollElement, _drag.move, function (e) {
        var dX = -e.offset.x * _this._scale;
        var dY = -e.offset.y * _this._scale;
        var lx = _this._offset - (_this._layoutOptions.vertical ? dY : dX) / _this._scale;
        _this._applyPosition(lx, lx + _this._translator.canvasLength / _this._scale);
        (0, _index.fireEvent)({
          type: 'dxc-scroll-move',
          originalEvent: e,
          target: scrollElement,
          offset: {
            x: dX,
            y: dY
          }
        });
      });
      _events_engine.default.on(scrollElement, _drag.end, function (e) {
        (0, _index.fireEvent)({
          type: 'dxc-scroll-end',
          originalEvent: e,
          target: scrollElement,
          offset: {
            x: -e.offset.x * _this._scale,
            y: -e.offset.y * _this._scale
          }
        });
      });
    },
    update: function update(options) {
      var that = this;
      var position = options.position;
      var isVertical = options.rotated;
      var defaultPosition = isVertical ? 'right' : 'top';
      var secondaryPosition = isVertical ? 'left' : 'bottom';
      if (position !== defaultPosition && position !== secondaryPosition) {
        position = defaultPosition;
      }
      that._scroll.attr({
        rotate: !options.rotated ? -90 : 0,
        rotateX: 0,
        rotateY: 0,
        fill: options.color,
        width: options.width,
        opacity: options.opacity
      });
      that._layoutOptions = {
        width: options.width,
        offset: options.offset,
        vertical: isVertical,
        position: position
      };
      return that;
    },
    init: function init(range, stick) {
      var that = this;
      var isDiscrete = range.axisType === 'discrete';
      that._translateWithOffset = isDiscrete && !stick && 1 || 0;
      that._translator.update((0, _extend.extend)({}, range, {
        minVisible: null,
        maxVisible: null,
        visibleCategories: null
      }, isDiscrete && {
        min: null,
        max: null
      } || {}), that._canvas, {
        isHorizontal: !that._layoutOptions.vertical,
        stick: stick
      });
      return that;
    },
    getOptions: function getOptions() {
      return this._layoutOptions;
    },
    setPane: function setPane(panes) {
      var position = this._layoutOptions.position;
      var pane;
      if (position === 'left' || position === 'top') {
        pane = panes[0];
      } else {
        pane = panes[panes.length - 1];
      }
      this.pane = pane.name;
      return this;
    },
    updateSize: function updateSize(canvas) {
      this._canvas = (0, _extend.extend)({}, canvas);
      var options = this._layoutOptions;
      var pos = options.position;
      var offset = options.offset;
      var width = options.width;
      this._scroll.attr({
        translateX: _getXCoord(canvas, pos, offset, width),
        translateY: _getYCoord(canvas, pos, offset, width)
      });
    },
    getMultipleAxesSpacing: function getMultipleAxesSpacing() {
      return 0;
    },
    estimateMargins: function estimateMargins() {
      return this.getMargins();
    },
    getMargins: function getMargins() {
      var options = this._layoutOptions;
      var margins = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      margins[options.position] = options.width + options.offset;
      return margins;
    },
    shift: function shift(margins) {
      var _that$_scroll$attr, _that$_scroll$attr2;
      var that = this;
      var options = that._layoutOptions;
      var side = options.position;
      var isVertical = options.vertical;
      var attr = {
        translateX: (_that$_scroll$attr = that._scroll.attr('translateX')) !== null && _that$_scroll$attr !== void 0 ? _that$_scroll$attr : 0,
        translateY: (_that$_scroll$attr2 = that._scroll.attr('translateY')) !== null && _that$_scroll$attr2 !== void 0 ? _that$_scroll$attr2 : 0
      };
      var shift = margins[side];
      attr[isVertical ? 'translateX' : 'translateY'] += (side === 'left' || side === 'top' ? -1 : 1) * shift;
      that._scroll.attr(attr);
    },
    // Axis like functions
    hideTitle: _common.noop,
    hideOuterElements: _common.noop,
    // Axis like functions

    setPosition: function setPosition(min, max) {
      var that = this;
      var translator = that._translator;
      var minPoint = (0, _type.isDefined)(min) ? translator.translate(min, -that._translateWithOffset) : translator.translate('canvas_position_start');
      var maxPoint = (0, _type.isDefined)(max) ? translator.translate(max, that._translateWithOffset) : translator.translate('canvas_position_end');
      that._offset = _min(minPoint, maxPoint);
      that._scale = translator.getScale(min, max);
      that._applyPosition(_min(minPoint, maxPoint), _max(minPoint, maxPoint));
    },
    customPositionIsAvailable: function customPositionIsAvailable() {
      return false;
    },
    dispose: function dispose() {
      this._scroll.dispose();
      this._scroll = this._translator = null;
    },
    _applyPosition: function _applyPosition(x1, x2) {
      var that = this;
      var visibleArea = that._translator.getCanvasVisibleArea();
      x1 = _max(x1, visibleArea.min);
      x1 = _min(x1, visibleArea.max);
      x2 = _min(x2, visibleArea.max);
      x2 = _max(x2, visibleArea.min);
      var height = Math.abs(x2 - x1);
      that._scroll.attr({
        y: x1,
        height: height < MIN_SCROLL_BAR_SIZE ? MIN_SCROLL_BAR_SIZE : height
      });
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../events/core/events_engine","../../events/utils/index","../../core/utils/extend","../translators/translator2d","../../core/utils/type","../../core/utils/common","../../events/drag"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../events/core/events_engine"), require("../../events/utils/index"), require("../../core/utils/extend"), require("../translators/translator2d"), require("../../core/utils/type"), require("../../core/utils/common"), require("../../events/drag"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scroll_bar.js.map