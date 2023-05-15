!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.constants.js"], ["ui/scroll_view/ui.scrollable.simulated"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.constants.js", ["ui/scroll_view/ui.scrollable.simulated"], function($__export) {
  "use strict";
  var simulatedStrategy,
      SCROLLABLE_CLASS,
      SCROLLABLE_CONTAINER_CLASS,
      SCROLLABLE_WRAPPER_CLASS,
      SCROLLABLE_CONTENT_CLASS,
      SCROLLABLE_SCROLLBAR_CLASS,
      SCROLLABLE_SCROLL_CLASS,
      SCROLLABLE_SCROLL_CONTENT_CLASS,
      SCROLLBAR_VERTICAL_CLASS,
      SCROLLBAR_HORIZONTAL_CLASS,
      SCROLLABLE_NATIVE_CLASS,
      SCROLLABLE_SIMULATED_CLASS,
      SCROLLABLE_SCROLLBARS_HIDDEN,
      SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE,
      SCROLLABLE_DISABLED_CLASS,
      SCROLLABLE_SCROLLBAR_ACTIVE_CLASS,
      RTL_CLASS,
      SCROLLBAR_HOVERABLE_CLASS,
      FRAME_DURATION,
      ACCELERATION,
      MIN_VELOCITY_LIMIT,
      calculateInertiaDistance,
      RESIZE_WAIT_TIMEOUT;
  return {
    setters: [function($__m) {
      simulatedStrategy = $__m.default;
    }],
    execute: function() {
      SCROLLABLE_CLASS = 'dx-scrollable';
      $__export("SCROLLABLE_CLASS", SCROLLABLE_CLASS);
      SCROLLABLE_CONTAINER_CLASS = 'dx-scrollable-container';
      $__export("SCROLLABLE_CONTAINER_CLASS", SCROLLABLE_CONTAINER_CLASS);
      SCROLLABLE_WRAPPER_CLASS = 'dx-scrollable-wrapper';
      $__export("SCROLLABLE_WRAPPER_CLASS", SCROLLABLE_WRAPPER_CLASS);
      SCROLLABLE_CONTENT_CLASS = 'dx-scrollable-content';
      $__export("SCROLLABLE_CONTENT_CLASS", SCROLLABLE_CONTENT_CLASS);
      SCROLLABLE_SCROLLBAR_CLASS = 'dx-scrollable-scrollbar';
      $__export("SCROLLABLE_SCROLLBAR_CLASS", SCROLLABLE_SCROLLBAR_CLASS);
      SCROLLABLE_SCROLL_CLASS = 'dx-scrollable-scroll';
      $__export("SCROLLABLE_SCROLL_CLASS", SCROLLABLE_SCROLL_CLASS);
      SCROLLABLE_SCROLL_CONTENT_CLASS = 'dx-scrollable-scroll-content';
      $__export("SCROLLABLE_SCROLL_CONTENT_CLASS", SCROLLABLE_SCROLL_CONTENT_CLASS);
      SCROLLBAR_VERTICAL_CLASS = 'dx-scrollbar-vertical';
      $__export("SCROLLBAR_VERTICAL_CLASS", SCROLLBAR_VERTICAL_CLASS);
      SCROLLBAR_HORIZONTAL_CLASS = 'dx-scrollbar-horizontal';
      $__export("SCROLLBAR_HORIZONTAL_CLASS", SCROLLBAR_HORIZONTAL_CLASS);
      SCROLLABLE_NATIVE_CLASS = 'dx-scrollable-native';
      $__export("SCROLLABLE_NATIVE_CLASS", SCROLLABLE_NATIVE_CLASS);
      SCROLLABLE_SIMULATED_CLASS = 'dx-scrollable-simulated';
      $__export("SCROLLABLE_SIMULATED_CLASS", SCROLLABLE_SIMULATED_CLASS);
      SCROLLABLE_SCROLLBARS_HIDDEN = 'dx-scrollable-scrollbars-hidden';
      $__export("SCROLLABLE_SCROLLBARS_HIDDEN", SCROLLABLE_SCROLLBARS_HIDDEN);
      SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = 'dx-scrollable-scrollbars-alwaysvisible';
      $__export("SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE", SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE);
      SCROLLABLE_DISABLED_CLASS = 'dx-scrollable-disabled';
      $__export("SCROLLABLE_DISABLED_CLASS", SCROLLABLE_DISABLED_CLASS);
      SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = 'dx-scrollable-scrollbar-active';
      $__export("SCROLLABLE_SCROLLBAR_ACTIVE_CLASS", SCROLLABLE_SCROLLBAR_ACTIVE_CLASS);
      RTL_CLASS = 'dx-rtl';
      $__export("RTL_CLASS", RTL_CLASS);
      SCROLLBAR_HOVERABLE_CLASS = 'dx-scrollbar-hoverable';
      $__export("SCROLLBAR_HOVERABLE_CLASS", SCROLLBAR_HOVERABLE_CLASS);
      FRAME_DURATION = simulatedStrategy.FRAME_DURATION;
      $__export("FRAME_DURATION", FRAME_DURATION);
      ACCELERATION = simulatedStrategy.ACCELERATION;
      $__export("ACCELERATION", ACCELERATION);
      MIN_VELOCITY_LIMIT = simulatedStrategy.MIN_VELOCITY_LIMIT;
      $__export("MIN_VELOCITY_LIMIT", MIN_VELOCITY_LIMIT);
      calculateInertiaDistance = function(distance, duration) {
        var velocity = FRAME_DURATION * distance / duration;
        var result = 0;
        while (Math.abs(velocity) > MIN_VELOCITY_LIMIT) {
          result += velocity;
          velocity = velocity * ACCELERATION;
        }
        return result;
      };
      $__export("calculateInertiaDistance", calculateInertiaDistance);
      RESIZE_WAIT_TIMEOUT = 50;
      $__export("RESIZE_WAIT_TIMEOUT", RESIZE_WAIT_TIMEOUT);
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/scroll_view/ui.scrollable.simulated"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/scroll_view/ui.scrollable.simulated"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollable.constants.js.map