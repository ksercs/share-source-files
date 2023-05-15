!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/animation/position.js"], ["../core/utils/size","../core/renderer","../core/utils/common","../core/utils/iterator","../core/utils/window","../core/dom_adapter","../core/utils/type","../core/utils/extend","../core/utils/position","../core/utils/browser","./translator","../core/utils/support","../core/devices"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/animation/position.js", ["../core/utils/size", "../core/renderer", "../core/utils/common", "../core/utils/iterator", "../core/utils/window", "../core/dom_adapter", "../core/utils/type", "../core/utils/extend", "../core/utils/position", "../core/utils/browser", "./translator", "../core/utils/support", "../core/devices"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _common = $__require("../core/utils/common");
  var _iterator = $__require("../core/utils/iterator");
  var _window = $__require("../core/utils/window");
  var _dom_adapter = _interopRequireDefault($__require("../core/dom_adapter"));
  var _type = $__require("../core/utils/type");
  var _extend = $__require("../core/utils/extend");
  var _position = $__require("../core/utils/position");
  var _browser = _interopRequireDefault($__require("../core/utils/browser"));
  var _translator = $__require("./translator");
  var _support = $__require("../core/utils/support");
  var _devices = _interopRequireDefault($__require("../core/devices"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var horzRe = /left|right/;
  var vertRe = /top|bottom/;
  var collisionRe = /fit|flip|none/;
  var scaleRe = /scale\(.+?\)/;
  var IS_SAFARI = _browser.default.safari;
  var normalizeAlign = function normalizeAlign(raw) {
    var result = {
      h: 'center',
      v: 'center'
    };
    var pair = (0, _common.splitPair)(raw);
    if (pair) {
      (0, _iterator.each)(pair, function () {
        var w = String(this).toLowerCase();
        if (horzRe.test(w)) {
          result.h = w;
        } else if (vertRe.test(w)) {
          result.v = w;
        }
      });
    }
    return result;
  };
  var normalizeOffset = function normalizeOffset(raw) {
    return (0, _common.pairToObject)(raw);
  };
  var normalizeCollision = function normalizeCollision(raw) {
    var pair = (0, _common.splitPair)(raw);
    var h = String(pair && pair[0]).toLowerCase();
    var v = String(pair && pair[1]).toLowerCase();
    if (!collisionRe.test(h)) {
      h = 'none';
    }
    if (!collisionRe.test(v)) {
      v = h;
    }
    return {
      h: h,
      v: v
    };
  };
  var getAlignFactor = function getAlignFactor(align) {
    switch (align) {
      case 'center':
        return 0.5;
      case 'right':
      case 'bottom':
        return 1;
      default:
        return 0;
    }
  };
  var inverseAlign = function inverseAlign(align) {
    switch (align) {
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      case 'top':
        return 'bottom';
      case 'bottom':
        return 'top';
      default:
        return align;
    }
  };
  var calculateOversize = function calculateOversize(data, bounds) {
    var oversize = 0;
    if (data.myLocation < bounds.min) {
      oversize += bounds.min - data.myLocation;
    }
    if (data.myLocation > bounds.max) {
      oversize += data.myLocation - bounds.max;
    }
    return oversize;
  };
  var collisionSide = function collisionSide(direction, data, bounds) {
    if (data.myLocation < bounds.min) {
      return direction === 'h' ? 'left' : 'top';
    }
    if (data.myLocation > bounds.max) {
      return direction === 'h' ? 'right' : 'bottom';
    }
    return 'none';
  };

  // TODO: rename?
  var initMyLocation = function initMyLocation(data) {
    data.myLocation = data.atLocation + getAlignFactor(data.atAlign) * data.atSize - getAlignFactor(data.myAlign) * data.mySize + data.offset;
  };
  var collisionResolvers = {
    'fit': function fit(data, bounds) {
      var result = false;
      if (data.myLocation > bounds.max) {
        data.myLocation = bounds.max;
        result = true;
      }
      if (data.myLocation < bounds.min) {
        data.myLocation = bounds.min;
        result = true;
      }
      data.fit = result;
    },
    'flip': function flip(data, bounds) {
      data.flip = false;
      if (data.myAlign === 'center' && data.atAlign === 'center') {
        return;
      }
      if (data.myLocation < bounds.min || data.myLocation > bounds.max) {
        var inverseData = (0, _extend.extend)({}, data, {
          myAlign: inverseAlign(data.myAlign),
          atAlign: inverseAlign(data.atAlign),
          offset: -data.offset
        });
        initMyLocation(inverseData);
        inverseData.oversize = calculateOversize(inverseData, bounds);
        if (inverseData.myLocation >= bounds.min && inverseData.myLocation <= bounds.max || data.oversize > inverseData.oversize) {
          data.myLocation = inverseData.myLocation;
          data.oversize = inverseData.oversize;
          data.flip = true;
        }
      }
    },
    'flipfit': function flipfit(data, bounds) {
      this.flip(data, bounds);
      this.fit(data, bounds);
    },
    'none': function none(data) {
      data.oversize = 0;
    }
  };
  var scrollbarWidth;
  var calculateScrollbarWidth = function calculateScrollbarWidth() {
    var $scrollDiv = (0, _renderer.default)('<div>').css({
      width: 100,
      height: 100,
      overflow: 'scroll',
      position: 'absolute',
      top: -9999
    }).appendTo((0, _renderer.default)('body'));
    var result = $scrollDiv.get(0).offsetWidth - $scrollDiv.get(0).clientWidth;
    $scrollDiv.remove();
    scrollbarWidth = result;
  };
  var defaultPositionResult = {
    h: {
      location: 0,
      flip: false,
      fit: false,
      oversize: 0
    },
    v: {
      location: 0,
      flip: false,
      fit: false,
      oversize: 0
    }
  };
  var calculatePosition = function calculatePosition(what, options) {
    var $what = (0, _renderer.default)(what);
    var currentOffset = $what.offset();
    var result = (0, _extend.extend)(true, {}, defaultPositionResult, {
      h: {
        location: currentOffset.left
      },
      v: {
        location: currentOffset.top
      }
    });
    if (!options) {
      return result;
    }
    var my = normalizeAlign(options.my);
    var at = normalizeAlign(options.at);
    var of = (0, _renderer.default)(options.of).length && options.of || window;
    var offset = normalizeOffset(options.offset);
    var collision = normalizeCollision(options.collision);
    var boundary = options.boundary;
    var boundaryOffset = normalizeOffset(options.boundaryOffset);
    var h = {
      mySize: (0, _size.getOuterWidth)($what),
      myAlign: my.h,
      atAlign: at.h,
      offset: offset.h,
      collision: collision.h,
      boundaryOffset: boundaryOffset.h
    };
    var v = {
      mySize: (0, _size.getOuterHeight)($what),
      myAlign: my.v,
      atAlign: at.v,
      offset: offset.v,
      collision: collision.v,
      boundaryOffset: boundaryOffset.v
    };
    if (of.preventDefault) {
      h.atLocation = of.pageX;
      v.atLocation = of.pageY;
      h.atSize = 0;
      v.atSize = 0;
    } else {
      of = (0, _renderer.default)(of);
      if ((0, _type.isWindow)(of[0])) {
        h.atLocation = of.scrollLeft();
        v.atLocation = of.scrollTop();
        if (_devices.default.real().deviceType === 'phone' && of[0].visualViewport) {
          h.atLocation = Math.max(h.atLocation, of[0].visualViewport.offsetLeft);
          v.atLocation = Math.max(v.atLocation, of[0].visualViewport.offsetTop);
          h.atSize = of[0].visualViewport.width;
          v.atSize = of[0].visualViewport.height;
        } else {
          h.atSize = of[0].innerWidth > of[0].outerWidth ? of[0].innerWidth : (0, _size.getWidth)(of);
          v.atSize = of[0].innerHeight > of[0].outerHeight || IS_SAFARI ? of[0].innerHeight : (0, _size.getHeight)(of);
        }
      } else if (of[0].nodeType === 9) {
        h.atLocation = 0;
        v.atLocation = 0;
        h.atSize = (0, _size.getWidth)(of);
        v.atSize = (0, _size.getHeight)(of);
      } else {
        var ofRect = (0, _position.getBoundingRect)(of.get(0));
        var o = getOffsetWithoutScale(of);
        h.atLocation = o.left;
        v.atLocation = o.top;
        h.atSize = Math.max(ofRect.width, (0, _size.getOuterWidth)(of));
        v.atSize = Math.max(ofRect.height, (0, _size.getOuterHeight)(of));
      }
    }
    initMyLocation(h);
    initMyLocation(v);
    var bounds = function () {
      var win = (0, _renderer.default)(window);
      var windowWidth = (0, _size.getWidth)(win);
      var windowHeight = (0, _size.getHeight)(win);
      var left = win.scrollLeft();
      var top = win.scrollTop();
      var documentElement = _dom_adapter.default.getDocumentElement();
      var hZoomLevel = _support.touch ? documentElement.clientWidth / windowWidth : 1;
      var vZoomLevel = _support.touch ? documentElement.clientHeight / windowHeight : 1;
      if (scrollbarWidth === undefined) {
        calculateScrollbarWidth();
      }
      var boundaryWidth = windowWidth;
      var boundaryHeight = windowHeight;
      if (boundary && !(0, _type.isWindow)(boundary)) {
        var $boundary = (0, _renderer.default)(boundary);
        var boundaryPosition = $boundary.offset();
        left = boundaryPosition.left;
        top = boundaryPosition.top;
        boundaryWidth = (0, _size.getWidth)($boundary);
        boundaryHeight = (0, _size.getHeight)($boundary);
      }
      return {
        h: {
          min: left + h.boundaryOffset,
          max: left + boundaryWidth / hZoomLevel - h.mySize - h.boundaryOffset
        },
        v: {
          min: top + v.boundaryOffset,
          max: top + boundaryHeight / vZoomLevel - v.mySize - v.boundaryOffset
        }
      };
    }();
    h.oversize = calculateOversize(h, bounds.h);
    v.oversize = calculateOversize(v, bounds.v);
    h.collisionSide = collisionSide('h', h, bounds.h);
    v.collisionSide = collisionSide('v', v, bounds.v);
    if (collisionResolvers[h.collision]) {
      collisionResolvers[h.collision](h, bounds.h);
    }
    if (collisionResolvers[v.collision]) {
      collisionResolvers[v.collision](v, bounds.v);
    }
    var preciser = function preciser(number) {
      return options.precise ? number : Math.round(number);
    };
    (0, _extend.extend)(true, result, {
      h: {
        location: preciser(h.myLocation),
        oversize: preciser(h.oversize),
        fit: h.fit,
        flip: h.flip,
        collisionSide: h.collisionSide
      },
      v: {
        location: preciser(v.myLocation),
        oversize: preciser(v.oversize),
        fit: v.fit,
        flip: v.flip,
        collisionSide: v.collisionSide
      },
      precise: options.precise
    });
    return result;
  };

  // NOTE: Setting the 'element.style.transform.scale' requires the inline style when both of the conditions met:
  //       - a form contains an input with the name property set to "style";
  //       - a form contains a dx-validator (or other popup widget).
  //       T941581
  var setScaleProperty = function setScaleProperty(element, scale, transformProp, styleAttr, isEmpty) {
    var stylePropIsValid = (0, _type.isDefined)(element.style) && !_dom_adapter.default.isNode(element.style);
    if (stylePropIsValid) {
      element.style.transform = isEmpty ? transformProp.replace(scale, '') : transformProp;
    } else {
      element.setAttribute('style', isEmpty ? styleAttr.replace(scale, '') : styleAttr);
    }
  };
  var getOffsetWithoutScale = function getOffsetWithoutScale($startElement) {
    var _currentElement$getAt, _currentElement$style, _style$match;
    var $currentElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $startElement;
    var currentElement = $currentElement.get(0);
    if (!currentElement) {
      return $startElement.offset();
    }
    var style = ((_currentElement$getAt = currentElement.getAttribute) === null || _currentElement$getAt === void 0 ? void 0 : _currentElement$getAt.call(currentElement, 'style')) || '';
    var transform = (_currentElement$style = currentElement.style) === null || _currentElement$style === void 0 ? void 0 : _currentElement$style.transform;
    var scale = (_style$match = style.match(scaleRe)) === null || _style$match === void 0 ? void 0 : _style$match[0];
    var offset;
    if (scale) {
      setScaleProperty(currentElement, scale, transform, style, true);
      offset = getOffsetWithoutScale($startElement, $currentElement.parent());
      setScaleProperty(currentElement, scale, transform, style, false);
    } else {
      offset = getOffsetWithoutScale($startElement, $currentElement.parent());
    }
    return offset;
  };
  var position = function position(what, options) {
    var $what = (0, _renderer.default)(what);
    if (!options) {
      return $what.offset();
    }
    (0, _translator.resetPosition)($what, true);
    var offset = getOffsetWithoutScale($what);
    var targetPosition = options.h && options.v ? options : calculatePosition($what, options);
    var preciser = function preciser(number) {
      return options.precise ? number : Math.round(number);
    };
    (0, _translator.move)($what, {
      left: targetPosition.h.location - preciser(offset.left),
      top: targetPosition.v.location - preciser(offset.top)
    });
    return targetPosition;
  };
  var offset = function offset(element) {
    element = (0, _renderer.default)(element).get(0);
    if ((0, _type.isWindow)(element)) {
      return null;
    } else if (element && 'pageY' in element && 'pageX' in element) {
      return {
        top: element.pageY,
        left: element.pageX
      };
    }
    return (0, _renderer.default)(element).offset();
  };
  if (!position.inverseAlign) {
    position.inverseAlign = inverseAlign;
  }
  if (!position.normalizeAlign) {
    position.normalizeAlign = normalizeAlign;
  }
  var _default = {
    calculateScrollbarWidth: calculateScrollbarWidth,
    calculate: calculatePosition,
    setup: position,
    offset: offset
  };
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../core/utils/common","../core/utils/iterator","../core/utils/window","../core/dom_adapter","../core/utils/type","../core/utils/extend","../core/utils/position","../core/utils/browser","./translator","../core/utils/support","../core/devices"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../core/utils/common"), require("../core/utils/iterator"), require("../core/utils/window"), require("../core/dom_adapter"), require("../core/utils/type"), require("../core/utils/extend"), require("../core/utils/position"), require("../core/utils/browser"), require("./translator"), require("../core/utils/support"), require("../core/devices"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=position.js.map