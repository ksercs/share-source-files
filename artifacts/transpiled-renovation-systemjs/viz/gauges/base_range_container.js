!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/gauges/base_range_container.js"], ["../../core/utils/iterator","./base_indicators","../../core/utils/type","../core/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/gauges/base_range_container.js", ["../../core/utils/iterator", "./base_indicators", "../../core/utils/type", "../core/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _iterator = $__require("../../core/utils/iterator");
  var _base_indicators = $__require("./base_indicators");
  var _type = $__require("../../core/utils/type");
  var _utils = $__require("../core/utils");
  var _Number = Number;
  var _isArray = Array.isArray;
  var _isFinite = isFinite;
  var BaseRangeContainer = _base_indicators.BaseElement.inherit({
    _init: function _init() {
      this._root = this._renderer.g().attr({
        'class': 'dxg-range-container'
      }).linkOn(this._container, 'range-container');
    },
    _dispose: function _dispose() {
      this._root.linkOff();
    },
    clean: function clean() {
      this._root.linkRemove().clear();
      this._options = this.enabled = null;
      return this;
    },
    _getRanges: function _getRanges() {
      var that = this;
      var options = that._options;
      var translator = that._translator;
      var totalStart = translator.getDomain()[0];
      var totalEnd = translator.getDomain()[1];
      var totalDelta = totalEnd - totalStart;
      var isValidSegment = totalDelta >= 0 ? isValidSegmentAsc : isValidSegmentDesc;
      var subtractSegment = totalDelta >= 0 ? subtractSegmentAsc : subtractSegmentDesc;
      var list = [];
      var ranges = [];
      var backgroundRanges = [{
        start: totalStart,
        end: totalEnd
      }];
      var backgroundColor = (0, _utils.extractColor)(options.backgroundColor) || 'none';
      var width = options.width || {};
      var startWidth = _Number(width > 0 ? width : width.start);
      var endWidth = _Number(width > 0 ? width : width.end);
      var deltaWidth = endWidth - startWidth;
      if (options.ranges !== undefined && !_isArray(options.ranges)) {
        return null;
      }
      if (!(startWidth >= 0 && endWidth >= 0 && startWidth + endWidth > 0)) {
        return null;
      }
      list = (_isArray(options.ranges) ? options.ranges : []).reduce(function (result, rangeOptions, i) {
        rangeOptions = rangeOptions || {};
        var start = translator.adjust(rangeOptions.startValue);
        var end = translator.adjust(rangeOptions.endValue);
        if (_isFinite(start) && _isFinite(end) && isValidSegment(start, end, rangeOptions)) {
          result.push({
            start: start,
            end: end,
            color: (0, _utils.extractColor)(rangeOptions.color),
            classIndex: i
          });
        }
        return result;
      }, []);
      var palette = that._themeManager.createPalette(options.palette, {
        type: 'indicatingSet',
        extensionMode: options.paletteExtensionMode,
        keepLastColorInEnd: true,
        count: list.length
      });
      (0, _iterator.each)(list, function (_, item) {
        var paletteColor = palette.getNextColor();
        item.color = (0, _type.isString)(item.color) && item.color || paletteColor || 'none';
        item.className = 'dxg-range dxg-range-' + item.classIndex;
        delete item.classIndex;
      });
      (0, _iterator.each)(list, function (_, item) {
        var i;
        var ii;
        var sub;
        var subs;
        var range;
        var newRanges = [];
        var newBackgroundRanges = [];
        for (i = 0, ii = ranges.length; i < ii; ++i) {
          range = ranges[i];
          subs = subtractSegment(range.start, range.end, item.start, item.end);
          (sub = subs[0]) && (sub.color = range.color) && (sub.className = range.className) && newRanges.push(sub);
          (sub = subs[1]) && (sub.color = range.color) && (sub.className = range.className) && newRanges.push(sub);
        }
        newRanges.push(item);
        ranges = newRanges;
        for (i = 0, ii = backgroundRanges.length; i < ii; ++i) {
          range = backgroundRanges[i];
          subs = subtractSegment(range.start, range.end, item.start, item.end);
          (sub = subs[0]) && newBackgroundRanges.push(sub);
          (sub = subs[1]) && newBackgroundRanges.push(sub);
        }
        backgroundRanges = newBackgroundRanges;
      });
      (0, _iterator.each)(backgroundRanges, function (_, range) {
        range.color = backgroundColor;
        range.className = 'dxg-range dxg-background-range';
        ranges.push(range);
      });
      (0, _iterator.each)(ranges, function (_, range) {
        range.startWidth = (range.start - totalStart) / totalDelta * deltaWidth + startWidth;
        range.endWidth = (range.end - totalStart) / totalDelta * deltaWidth + startWidth;
      });
      return ranges;
    },
    render: function render(options) {
      var that = this;
      that._options = options;
      that._processOptions();
      that._ranges = that._getRanges();
      if (that._ranges) {
        that.enabled = true;
        that._root.linkAppend();
      }
      return that;
    },
    resize: function resize(layout) {
      var that = this;
      that._root.clear();
      if (that._isVisible(layout)) {
        (0, _iterator.each)(that._ranges, function (_, range) {
          that._createRange(range, layout).attr({
            fill: range.color,
            'class': range.className
          }).append(that._root);
        });
      }
      return that;
    },
    _processOptions: null,
    _isVisible: null,
    _createRange: null,
    // S170193
    getColorForValue: function getColorForValue(value) {
      var color = null;
      (0, _iterator.each)(this._ranges, function (_, range) {
        if (range.start <= value && value <= range.end || range.start >= value && value >= range.end) {
          color = range.color;
          return false;
        }
      });
      return color;
    }
  });
  function subtractSegmentAsc(segmentStart, segmentEnd, otherStart, otherEnd) {
    var result;
    if (otherStart > segmentStart && otherEnd < segmentEnd) {
      result = [{
        start: segmentStart,
        end: otherStart
      }, {
        start: otherEnd,
        end: segmentEnd
      }];
    } else if (otherStart >= segmentEnd || otherEnd <= segmentStart) {
      result = [{
        start: segmentStart,
        end: segmentEnd
      }];
    } else if (otherStart <= segmentStart && otherEnd >= segmentEnd) {
      result = [];
    } else if (otherStart > segmentStart) {
      result = [{
        start: segmentStart,
        end: otherStart
      }];
    } else if (otherEnd < segmentEnd) {
      result = [{
        start: otherEnd,
        end: segmentEnd
      }];
    }
    return result;
  }
  function subtractSegmentDesc(segmentStart, segmentEnd, otherStart, otherEnd) {
    var result;
    if (otherStart < segmentStart && otherEnd > segmentEnd) {
      result = [{
        start: segmentStart,
        end: otherStart
      }, {
        start: otherEnd,
        end: segmentEnd
      }];
    } else if (otherStart <= segmentEnd || otherEnd >= segmentStart) {
      result = [{
        start: segmentStart,
        end: segmentEnd
      }];
    } else if (otherStart >= segmentStart && otherEnd <= segmentEnd) {
      result = [];
    } else if (otherStart < segmentStart) {
      result = [{
        start: segmentStart,
        end: otherStart
      }];
    } else if (otherEnd > segmentEnd) {
      result = [{
        start: otherEnd,
        end: segmentEnd
      }];
    }
    return result;
  }
  function areEqualValues(start, end, _ref) {
    var startValue = _ref.startValue,
        endValue = _ref.endValue;
    return endValue === startValue && startValue === start && end === start;
  }
  function isValidSegmentAsc(start, end, options) {
    return end - start > 0 || areEqualValues(start, end, options);
  }
  function isValidSegmentDesc(start, end, options) {
    return start - end > 0 || areEqualValues(start, end, options);
  }
  var _default = BaseRangeContainer;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/iterator","./base_indicators","../../core/utils/type","../core/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/iterator"), require("./base_indicators"), require("../../core/utils/type"), require("../core/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=base_range_container.js.map