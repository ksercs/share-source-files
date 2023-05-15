!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/core/layout.js"], ["./utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/core/layout.js", ["./utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _utils = $__require("./utils");
  var _min = Math.min;
  var _max = Math.max;
  var _round = Math.round;
  var ALIGN_START = 0;
  var ALIGN_MIDDLE = 1;
  var ALIGN_END = 2;
  var horizontalAlignmentMap = {
    left: ALIGN_START,
    center: ALIGN_MIDDLE,
    right: ALIGN_END
  };
  var verticalAlignmentMap = {
    top: ALIGN_START,
    center: ALIGN_MIDDLE,
    bottom: ALIGN_END
  };
  var sideMap = {
    horizontal: 0,
    vertical: 1
  };
  var slicersMap = {};
  var BBOX_CEIL_CORRECTION = 2;
  slicersMap[ALIGN_START] = function (a, b, size) {
    return [a, _min(b, a + size)];
  };
  slicersMap[ALIGN_MIDDLE] = function (a, b, size) {
    return [_max(a, (a + b - size) / 2), _min(b, (a + b + size) / 2)];
  };
  slicersMap[ALIGN_END] = function (a, b, size) {
    return [_max(a, b - size), b];
  };
  function pickValue(value, map, defaultValue) {
    var val = (0, _utils.normalizeEnum)(value);
    return val in map ? map[val] : defaultValue;
  }
  function normalizeLayoutOptions(options) {
    var side = pickValue(options.side, sideMap, 1);
    var alignment = [pickValue(options.horizontalAlignment, horizontalAlignmentMap, ALIGN_MIDDLE), pickValue(options.verticalAlignment, verticalAlignmentMap, ALIGN_START)];
    return {
      side: side,
      primary: bringToEdge(alignment[side]),
      secondary: alignment[1 - side],
      weak: options.weak,
      priority: options.priority || 0,
      header: options.header,
      position: options.position
    };
  }
  function bringToEdge(primary) {
    return primary < 2 ? 0 : 2;
  }
  function getConjugateSide(side) {
    return 1 - side;
  }
  function getSlice(alignment, a, b, size) {
    return slicersMap[alignment](a, b, size);
  }
  function getShrink(alignment, size) {
    return (alignment > 0 ? -1 : +1) * size;
  }
  function processForward(item, rect, minSize) {
    var side = item.side;
    var size = item.element.measure([rect[2] - rect[0], rect[3] - rect[1]]);
    var minSide = item.position === 'indside' ? 0 : minSize[side];
    var isValid = size[side] < rect[2 + side] - rect[side] - minSide;
    if (isValid) {
      if (item.position !== 'inside') {
        rect[item.primary + side] += getShrink(item.primary, size[side]);
      }
      item.size = size;
    }
    return isValid;
  }
  function processRectBackward(item, rect, alignmentRect) {
    var primarySide = item.side;
    var secondarySide = getConjugateSide(primarySide);
    var itemRect = [];
    var secondary = getSlice(item.secondary, alignmentRect[secondarySide], alignmentRect[2 + secondarySide], item.size[secondarySide]);
    itemRect[primarySide] = _round(itemRect[2 + primarySide] = rect[item.primary + primarySide] + (item.position === 'inside' ? getShrink(item.primary, item.size[primarySide]) : 0));
    itemRect[item.primary + primarySide] = _round(rect[item.primary + primarySide] - getShrink(item.primary, item.size[primarySide]));
    if (item.position !== 'inside') {
      rect[item.primary + primarySide] = itemRect[item.primary + primarySide];
    }
    itemRect[secondarySide] = _round(secondary[0]);
    itemRect[2 + secondarySide] = _round(secondary[1]);
    return itemRect;
  }
  function processBackward(item, rect, alignmentRect, fitRect, size, targetRect) {
    var itemRect = processRectBackward(item, rect, alignmentRect);
    var itemFitRect = processRectBackward(item, fitRect, fitRect);
    if (size[item.side] > 0) {
      size[item.side] -= item.size[item.side];
      targetRect[item.primary + item.side] = itemRect[item.primary + item.side];
      item.element.freeSpace();
    } else {
      item.element.move(itemRect, itemFitRect);
    }
  }
  function Layout() {
    this._targets = [];
  }
  Layout.prototype = {
    constructor: Layout,
    dispose: function dispose() {
      this._targets = null;
    },
    add: function add(target) {
      this._targets.push(target);
    },
    // Note on possible improvement.
    // "createTargets" part depends on options of a target while the following cycle depends on container size - those areas do not intersect.
    // When any of options are changed targets have to be recreated and cycle has to be executed. But when container size is changed there is no
    // need to recreate targets - only cycle has to be executed.
    forward: function forward(targetRect, minSize) {
      var rect = targetRect.slice();
      var targets = createTargets(this._targets);
      var i;
      var ii = targets.length;
      var cache = [];
      for (i = 0; i < ii; ++i) {
        if (processForward(targets[i], rect, minSize)) {
          cache.push(targets[i]);
        } else {
          targets[i].element.freeSpace();
        }
      }
      this._cache = cache.reverse();
      return rect;
    },
    backward: function backward(targetRect, alignmentRect) {
      var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0];
      var backwardRect = targetRect.slice();
      var fitRect = targetRect.slice();
      var targets = this._cache;
      var targetSide = 0;
      var target;
      var i;
      var ii = targets.length;
      for (i = 0; i < ii; ++i) {
        target = targets[i];
        if (target.side !== targetSide) {
          backwardRect = targetRect.slice();
        }
        processBackward(target, backwardRect, alignmentRect, fitRect, size, targetRect);
        targetSide = target.side;
      }
      return size;
    }
  };
  function createTargets(targets) {
    var i;
    var ii = targets.length;
    var collection = [];
    var layout;
    for (i = 0; i < ii; ++i) {
      layout = targets[i].layoutOptions();
      if (layout) {
        layout = normalizeLayoutOptions(layout);
        layout.element = targets[i];
        collection.push(layout);
      }
    }
    collection.sort(function (a, b) {
      return b.side - a.side || a.priority - b.priority;
    });
    collection = processWeakItems(collection);
    return collection;
  }
  function processWeakItems(collection) {
    var weakItem = collection.filter(function (item) {
      return item.weak === true;
    })[0];
    var headerItem;
    if (weakItem) {
      headerItem = collection.filter(function (item) {
        return weakItem.primary === item.primary && item.side === weakItem.side && item !== weakItem;
      })[0];
    }
    if (weakItem && headerItem) {
      return [makeHeader(headerItem, weakItem)].concat(collection.filter(function (item) {
        return !(item === headerItem || item === weakItem);
      }));
    }
    return collection;
  }
  function processBackwardHeaderRect(element, rect) {
    var rectCopy = rect.slice();
    var itemRect = processRectBackward(element, rectCopy, rectCopy);
    itemRect[element.side] = rect[element.side];
    itemRect[2 + element.side] = rect[2 + element.side];
    return itemRect;
  }
  function makeHeader(header, weakElement) {
    var side = header.side;
    var primary = header.primary;
    var secondary = header.secondary;
    return {
      side: side,
      primary: primary,
      secondary: secondary,
      priority: 0,
      element: {
        measure: function measure(targetSize) {
          var result = targetSize.slice();
          var weakSize = weakElement.element.measure(targetSize.slice());
          targetSize[primary] -= weakSize[primary];
          var headerSize = header.element.measure(targetSize.slice());
          result[side] = weakSize[side] = headerSize[side] = Math.max(headerSize[side], weakSize[side]);
          weakElement.size = weakSize;
          header.size = headerSize;
          return result;
        },
        move: function move(rect, fitRect) {
          if (fitRect[2] - fitRect[0] < header.size[0] + weakElement.size[0] - BBOX_CEIL_CORRECTION) {
            this.freeSpace();
            return;
          }
          var weakRect = processBackwardHeaderRect(weakElement, fitRect);
          fitRect[2 + weakElement.primary] = weakRect[weakElement.primary];
          var headerFitReact = processBackwardHeaderRect(header, fitRect);
          if (fitRect[2 + weakElement.primary] < rect[2 + weakElement.primary] && header.size[header.primary] > rect[2 + header.primary] - rect[header.primary]) {
            rect[2 + weakElement.primary] = fitRect[2 + weakElement.primary];
          }
          var headerRect = processBackwardHeaderRect(header, rect);
          if (headerRect[2 + weakElement.primary] > fitRect[2 + weakElement.primary]) {
            rect[2 + weakElement.primary] = fitRect[2 + weakElement.primary];
            headerRect = processBackwardHeaderRect(header, rect);
          }
          weakElement.element.move(weakRect);
          header.element.move(headerRect, headerFitReact);
        },
        freeSpace: function freeSpace() {
          header.element.freeSpace();
          weakElement.element.freeSpace();
        }
      }
    };
  }
  var _default = Layout;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=layout.js.map