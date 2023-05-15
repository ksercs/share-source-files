!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/core/renderers/animation.js"], ["../../../animation/frame"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/core/renderers/animation.js", ["../../../animation/frame"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.Animation = Animation;
  exports.AnimationController = AnimationController;
  exports.noop = exports.easingFunctions = exports.animationSvgStep = void 0;
  var _frame = $__require("../../../animation/frame");
  var noop = function noop() {};
  exports.noop = noop;
  var easingFunctions = {
    easeOutCubic: function easeOutCubic(pos, start, end) {
      return pos === 1 ? end : (1 - Math.pow(1 - pos, 3)) * (end - start) + +start;
    },
    linear: function linear(pos, start, end) {
      return pos === 1 ? end : pos * (end - start) + +start;
    }
  };
  exports.easingFunctions = easingFunctions;
  var animationSvgStep = {
    segments: function segments(elem, params, progress, easing, currentParams) {
      var from = params.from;
      var to = params.to;
      var curSeg;
      var seg;
      var i;
      var j;
      var segments = [];
      for (i = 0; i < from.length; i++) {
        curSeg = from[i];
        seg = [curSeg[0]];
        if (curSeg.length > 1) {
          for (j = 1; j < curSeg.length; j++) {
            seg.push(easing(progress, curSeg[j], to[i][j]));
          }
        }
        segments.push(seg);
      }
      currentParams.segments = params.end && progress === 1 ? params.end : segments;
      elem.attr({
        segments: segments
      });
    },
    arc: function arc(elem, params, progress, easing) {
      var from = params.from;
      var to = params.to;
      var current = {};
      for (var i in from) {
        current[i] = easing(progress, from[i], to[i]);
      }
      elem.attr(current);
    },
    transform: function transform(elem, params, progress, easing, currentParams) {
      var from = params.from;
      var to = params.to;
      var current = {};
      for (var i in from) {
        current[i] = currentParams[i] = easing(progress, from[i], to[i]);
      }
      elem.attr(current);
    },
    base: function base(elem, params, progress, easing, currentParams, attributeName) {
      var obj = {};
      obj[attributeName] = currentParams[attributeName] = easing(progress, params.from, params.to);
      elem.attr(obj);
    },
    _: noop,
    complete: function complete(element, currentSettings) {
      element.attr(currentSettings);
    }
  };
  exports.animationSvgStep = animationSvgStep;
  function step(now) {
    var that = this;
    var animateStep = that._animateStep;
    var attrName;
    that._progress = that._calcProgress(now);
    for (attrName in that.params) {
      var anim = animateStep[attrName] || animateStep.base;
      anim(that.element, that.params[attrName], that._progress, that._easing, that._currentParams, attrName);
    }
    that.options.step && that.options.step(that._easing(that._progress, 0, 1), that._progress);
    if (that._progress === 1) return that.stop();
    return true;
  }
  function delayTick(now) {
    if (now - this._startTime >= this.delay) {
      this.tick = step;
    }
    return true;
  }
  function start(now) {
    this._startTime = now;
    this.tick = this.delay ? delayTick : step;
    return true;
  }
  function Animation(element, params, options) {
    var that = this;
    that._progress = 0;
    that.element = element;
    that.params = params;
    that.options = options;
    that.duration = options.partitionDuration ? options.duration * options.partitionDuration : options.duration;
    that.delay = options.delay && options.duration * options.delay || 0;
    that._animateStep = options.animateStep || animationSvgStep;
    that._easing = easingFunctions[options.easing] || easingFunctions['easeOutCubic'];
    that._currentParams = {};
    that.tick = start;
  }
  Animation.prototype = {
    _calcProgress: function _calcProgress(now) {
      return Math.min(1, (now - this.delay - this._startTime) / this.duration);
    },
    stop: function stop(disableComplete) {
      var that = this;
      var options = that.options;
      var animateStep = that._animateStep;
      that.stop = that.tick = noop;
      animateStep.complete && animateStep.complete(that.element, that._currentParams);
      options.complete && !disableComplete && options.complete();
    }
  };
  function AnimationController(element) {
    var that = this;
    that._animationCount = 0;
    that._timerId = null;
    that._animations = {};
    that.element = element;
  }
  AnimationController.prototype = {
    _loop: function _loop() {
      var that = this;
      var animations = that._animations;
      var activeAnimation = 0;
      var now = new Date().getTime();
      var an;
      var endAnimation = that._endAnimation;
      for (an in animations) {
        if (!animations[an].tick(now)) {
          delete animations[an];
        }
        activeAnimation++;
      }
      if (activeAnimation === 0) {
        that.stop();
        that._endAnimationTimer = endAnimation && setTimeout(function () {
          if (that._animationCount === 0) {
            endAnimation();
            that._endAnimation = null;
          }
        });
        return;
      }
      that._timerId = _frame.requestAnimationFrame.call(null, function () {
        that._loop();
      }, that.element);
    },
    addAnimation: function addAnimation(animation) {
      var that = this;
      that._animations[that._animationCount++] = animation;
      clearTimeout(that._endAnimationTimer);
      if (!that._timerId) {
        clearTimeout(that._startDelay);
        that._startDelay = setTimeout(function () {
          that._timerId = 1;
          that._loop();
        }, 0);
      }
    },
    animateElement: function animateElement(elem, params, options) {
      if (elem && params && options) {
        elem.animation && elem.animation.stop();
        this.addAnimation(elem.animation = new Animation(elem, params, options));
      }
    },
    onEndAnimation: function onEndAnimation(endAnimation) {
      this._animationCount ? this._endAnimation = endAnimation : endAnimation();
    },
    dispose: function dispose() {
      this.stop();
      this.element = null;
    },
    stop: function stop() {
      var that = this;
      that._animations = {};
      that._animationCount = 0;
      (0, _frame.cancelAnimationFrame)(that._timerId);
      clearTimeout(that._startDelay);
      clearTimeout(that._endAnimationTimer);
      that._timerId = null;
    },
    lock: function lock() {
      var an;
      var animations = this._animations;
      var unstoppable; // T261694
      var hasUnstoppableInAnimations;
      for (an in animations) {
        unstoppable = animations[an].options.unstoppable;
        hasUnstoppableInAnimations = hasUnstoppableInAnimations || unstoppable;
        if (!unstoppable) {
          animations[an].stop(true);
          delete animations[an];
        }
      }
      !hasUnstoppableInAnimations && this.stop();
    }
  };

  ///#DEBUG

  ///#ENDDEBUG
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../animation/frame"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../animation/frame"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=animation.js.map