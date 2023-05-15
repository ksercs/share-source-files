!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/widget/utils.ink_ripple.js"], ["../../core/utils/size","../../core/renderer"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/widget/utils.ink_ripple.js", ["../../core/utils/size", "../../core/renderer"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.hideWave = hideWave;
  exports.render = exports.initConfig = void 0;
  exports.showWave = showWave;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var INKRIPPLE_CLASS = 'dx-inkripple';
  var INKRIPPLE_WAVE_CLASS = 'dx-inkripple-wave';
  var INKRIPPLE_SHOWING_CLASS = 'dx-inkripple-showing';
  var INKRIPPLE_HIDING_CLASS = 'dx-inkripple-hiding';
  var DEFAULT_WAVE_SIZE_COEFFICIENT = 2;
  var MAX_WAVE_SIZE = 4000; // NOTE: incorrect scaling of ink with big size (T310238)
  var ANIMATION_DURATION = 300;
  var HOLD_ANIMATION_DURATION = 1000;
  var DEFAULT_WAVE_INDEX = 0;
  var initConfig = function initConfig() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var useHoldAnimation = config.useHoldAnimation,
        waveSizeCoefficient = config.waveSizeCoefficient,
        isCentered = config.isCentered,
        wavesNumber = config.wavesNumber;
    return {
      waveSizeCoefficient: waveSizeCoefficient || DEFAULT_WAVE_SIZE_COEFFICIENT,
      isCentered: isCentered || false,
      wavesNumber: wavesNumber || 1,
      durations: getDurations(useHoldAnimation !== null && useHoldAnimation !== void 0 ? useHoldAnimation : true)
    };
  };
  exports.initConfig = initConfig;
  var render = function render(args) {
    var config = initConfig(args);
    return {
      showWave: showWave.bind(this, config),
      hideWave: hideWave.bind(this, config)
    };
  };
  exports.render = render;
  var getInkRipple = function getInkRipple(element) {
    var result = element.children('.' + INKRIPPLE_CLASS);
    if (result.length === 0) {
      result = (0, _renderer.default)('<div>').addClass(INKRIPPLE_CLASS).appendTo(element);
    }
    return result;
  };
  var getWaves = function getWaves(element, wavesNumber) {
    var inkRipple = getInkRipple((0, _renderer.default)(element));
    var result = inkRipple.children('.' + INKRIPPLE_WAVE_CLASS).toArray();
    for (var i = result.length; i < wavesNumber; i++) {
      var $currentWave = (0, _renderer.default)('<div>').appendTo(inkRipple).addClass(INKRIPPLE_WAVE_CLASS);
      result.push($currentWave[0]);
    }
    return (0, _renderer.default)(result);
  };
  var getWaveStyleConfig = function getWaveStyleConfig(args, config) {
    var element = (0, _renderer.default)(config.element);
    var elementWidth = (0, _size.getOuterWidth)(element);
    var elementHeight = (0, _size.getOuterHeight)(element);
    var elementDiagonal = parseInt(Math.sqrt(elementWidth * elementWidth + elementHeight * elementHeight));
    var waveSize = Math.min(MAX_WAVE_SIZE, parseInt(elementDiagonal * args.waveSizeCoefficient));
    var left;
    var top;
    if (args.isCentered) {
      left = (elementWidth - waveSize) / 2;
      top = (elementHeight - waveSize) / 2;
    } else {
      var event = config.event;
      var position = element.offset();
      var x = event.pageX - position.left;
      var y = event.pageY - position.top;
      left = x - waveSize / 2;
      top = y - waveSize / 2;
    }
    return {
      left: left,
      top: top,
      height: waveSize,
      width: waveSize
    };
  };
  function showWave(args, config) {
    var $wave = getWaves(config.element, args.wavesNumber).eq(config.wave || DEFAULT_WAVE_INDEX);
    args.hidingTimeout && clearTimeout(args.hidingTimeout);
    hideSelectedWave($wave);
    $wave.css(getWaveStyleConfig(args, config));
    args.showingTimeout = setTimeout(showingWaveHandler.bind(this, args, $wave), 0);
  }
  function showingWaveHandler(args, $wave) {
    var durationCss = args.durations.showingScale + 'ms';
    $wave.addClass(INKRIPPLE_SHOWING_CLASS).css('transitionDuration', durationCss);
  }
  function getDurations(useHoldAnimation) {
    return {
      showingScale: useHoldAnimation ? HOLD_ANIMATION_DURATION : ANIMATION_DURATION,
      hidingScale: ANIMATION_DURATION,
      hidingOpacity: ANIMATION_DURATION
    };
  }
  function hideSelectedWave($wave) {
    $wave.removeClass(INKRIPPLE_HIDING_CLASS).css('transitionDuration', '');
  }
  function hideWave(args, config) {
    args.showingTimeout && clearTimeout(args.showingTimeout);
    var $wave = getWaves(config.element, config.wavesNumber).eq(config.wave || DEFAULT_WAVE_INDEX);
    var durations = args.durations;
    var durationCss = durations.hidingScale + 'ms, ' + durations.hidingOpacity + 'ms';
    $wave.addClass(INKRIPPLE_HIDING_CLASS).removeClass(INKRIPPLE_SHOWING_CLASS).css('transitionDuration', durationCss);
    var animationDuration = Math.max(durations.hidingScale, durations.hidingOpacity);
    args.hidingTimeout = setTimeout(hideSelectedWave.bind(this, $wave), animationDuration);
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.ink_ripple.js.map