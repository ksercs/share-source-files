!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/scroll_view/common/consts.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled-renovation/renovation/ui/scroll_view/common/consts.js', [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.VALIDATE_WHEEL_TIMEOUT = exports.TopPocketState = exports.ShowScrollbarMode = exports.SCROLL_LINE_HEIGHT = exports.SCROLLVIEW_TOP_POCKET_CLASS = exports.SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = exports.SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = exports.SCROLLVIEW_REACHBOTTOM_CLASS = exports.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = exports.SCROLLVIEW_PULLDOWN_TEXT_CLASS = exports.SCROLLVIEW_PULLDOWN_READY_CLASS = exports.SCROLLVIEW_PULLDOWN_LOADING_CLASS = exports.SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = exports.SCROLLVIEW_PULLDOWN_IMAGE_CLASS = exports.SCROLLVIEW_PULLDOWN = exports.SCROLLVIEW_CONTENT_CLASS = exports.SCROLLVIEW_BOTTOM_POCKET_CLASS = exports.SCROLLABLE_WRAPPER_CLASS = exports.SCROLLABLE_SIMULATED_CLASS = exports.SCROLLABLE_SCROLL_CONTENT_CLASS = exports.SCROLLABLE_SCROLL_CLASS = exports.SCROLLABLE_SCROLLBAR_SIMULATED = exports.SCROLLABLE_SCROLLBAR_CLASS = exports.SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = exports.SCROLLABLE_SCROLLBARS_HIDDEN = exports.SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = exports.SCROLLABLE_DISABLED_CLASS = exports.SCROLLABLE_CONTENT_CLASS = exports.SCROLLABLE_CONTAINER_CLASS = exports.PULLDOWN_ICON_CLASS = exports.KEY_CODES = exports.HOVER_ENABLED_STATE = exports.HIDE_SCROLLBAR_TIMEOUT = exports.DIRECTION_VERTICAL = exports.DIRECTION_HORIZONTAL = exports.DIRECTION_BOTH = void 0;
  var SCROLL_LINE_HEIGHT = 40;
  exports.SCROLL_LINE_HEIGHT = SCROLL_LINE_HEIGHT;
  var DIRECTION_VERTICAL = 'vertical';
  exports.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
  var DIRECTION_HORIZONTAL = 'horizontal';
  exports.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
  var DIRECTION_BOTH = 'both';
  exports.DIRECTION_BOTH = DIRECTION_BOTH;
  var SCROLLABLE_SIMULATED_CLASS = 'dx-scrollable-simulated';
  exports.SCROLLABLE_SIMULATED_CLASS = SCROLLABLE_SIMULATED_CLASS;
  var SCROLLABLE_CONTENT_CLASS = 'dx-scrollable-content';
  exports.SCROLLABLE_CONTENT_CLASS = SCROLLABLE_CONTENT_CLASS;
  var SCROLLABLE_WRAPPER_CLASS = 'dx-scrollable-wrapper';
  exports.SCROLLABLE_WRAPPER_CLASS = SCROLLABLE_WRAPPER_CLASS;
  var SCROLLABLE_CONTAINER_CLASS = 'dx-scrollable-container';
  exports.SCROLLABLE_CONTAINER_CLASS = SCROLLABLE_CONTAINER_CLASS;
  var SCROLLABLE_DISABLED_CLASS = 'dx-scrollable-disabled';
  exports.SCROLLABLE_DISABLED_CLASS = SCROLLABLE_DISABLED_CLASS;
  var SCROLLABLE_SCROLLBAR_SIMULATED = 'dx-scrollable-scrollbar-simulated';
  exports.SCROLLABLE_SCROLLBAR_SIMULATED = SCROLLABLE_SCROLLBAR_SIMULATED;
  var SCROLLABLE_SCROLLBARS_HIDDEN = 'dx-scrollable-scrollbars-hidden';
  exports.SCROLLABLE_SCROLLBARS_HIDDEN = SCROLLABLE_SCROLLBARS_HIDDEN;
  var SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = 'dx-scrollable-scrollbars-alwaysvisible';
  exports.SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE;
  var SCROLLABLE_SCROLLBAR_CLASS = 'dx-scrollable-scrollbar';
  exports.SCROLLABLE_SCROLLBAR_CLASS = SCROLLABLE_SCROLLBAR_CLASS;
  var SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = 'dx-scrollable-scrollbar-active';
  exports.SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = SCROLLABLE_SCROLLBAR_ACTIVE_CLASS;
  var SCROLLABLE_SCROLL_CLASS = 'dx-scrollable-scroll';
  exports.SCROLLABLE_SCROLL_CLASS = SCROLLABLE_SCROLL_CLASS;
  var SCROLLABLE_SCROLL_CONTENT_CLASS = 'dx-scrollable-scroll-content';
  exports.SCROLLABLE_SCROLL_CONTENT_CLASS = SCROLLABLE_SCROLL_CONTENT_CLASS;
  var HOVER_ENABLED_STATE = 'dx-scrollbar-hoverable';
  exports.HOVER_ENABLED_STATE = HOVER_ENABLED_STATE;
  var SCROLLVIEW_CONTENT_CLASS = 'dx-scrollview-content';
  exports.SCROLLVIEW_CONTENT_CLASS = SCROLLVIEW_CONTENT_CLASS;
  var SCROLLVIEW_TOP_POCKET_CLASS = 'dx-scrollview-top-pocket';
  exports.SCROLLVIEW_TOP_POCKET_CLASS = SCROLLVIEW_TOP_POCKET_CLASS;
  var SCROLLVIEW_PULLDOWN = 'dx-scrollview-pull-down';
  exports.SCROLLVIEW_PULLDOWN = SCROLLVIEW_PULLDOWN;
  var SCROLLVIEW_PULLDOWN_LOADING_CLASS = 'dx-scrollview-pull-down-loading';
  exports.SCROLLVIEW_PULLDOWN_LOADING_CLASS = SCROLLVIEW_PULLDOWN_LOADING_CLASS;
  var SCROLLVIEW_PULLDOWN_READY_CLASS = 'dx-scrollview-pull-down-ready';
  exports.SCROLLVIEW_PULLDOWN_READY_CLASS = SCROLLVIEW_PULLDOWN_READY_CLASS;
  var SCROLLVIEW_PULLDOWN_IMAGE_CLASS = 'dx-scrollview-pull-down-image';
  exports.SCROLLVIEW_PULLDOWN_IMAGE_CLASS = SCROLLVIEW_PULLDOWN_IMAGE_CLASS;
  var SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = 'dx-scrollview-pull-down-indicator';
  exports.SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = SCROLLVIEW_PULLDOWN_INDICATOR_CLASS;
  var SCROLLVIEW_PULLDOWN_TEXT_CLASS = 'dx-scrollview-pull-down-text';
  exports.SCROLLVIEW_PULLDOWN_TEXT_CLASS = SCROLLVIEW_PULLDOWN_TEXT_CLASS;
  var SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = 'dx-scrollview-pull-down-text-visible';
  exports.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS;
  var PULLDOWN_ICON_CLASS = 'dx-icon-pulldown';
  exports.PULLDOWN_ICON_CLASS = PULLDOWN_ICON_CLASS;
  var SCROLLVIEW_BOTTOM_POCKET_CLASS = 'dx-scrollview-bottom-pocket';
  exports.SCROLLVIEW_BOTTOM_POCKET_CLASS = SCROLLVIEW_BOTTOM_POCKET_CLASS;
  var SCROLLVIEW_REACHBOTTOM_CLASS = 'dx-scrollview-scrollbottom';
  exports.SCROLLVIEW_REACHBOTTOM_CLASS = SCROLLVIEW_REACHBOTTOM_CLASS;
  var SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = 'dx-scrollview-scrollbottom-indicator';
  exports.SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS;
  var SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = 'dx-scrollview-scrollbottom-text';
  exports.SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = SCROLLVIEW_REACHBOTTOM_TEXT_CLASS;
  var TopPocketState = {
    STATE_RELEASED: 0,
    STATE_READY: 1,
    STATE_REFRESHING: 2,
    STATE_LOADING: 3,
    STATE_TOUCHED: 4,
    STATE_PULLED: 5
  };
  exports.TopPocketState = TopPocketState;
  var ShowScrollbarMode = {
    HOVER: 'onHover',
    ALWAYS: 'always',
    NEVER: 'never',
    SCROLL: 'onScroll'
  };
  exports.ShowScrollbarMode = ShowScrollbarMode;
  var KEY_CODES = {
    PAGE_UP: 'pageUp',
    PAGE_DOWN: 'pageDown',
    END: 'end',
    HOME: 'home',
    LEFT: 'leftArrow',
    UP: 'upArrow',
    RIGHT: 'rightArrow',
    DOWN: 'downArrow'
  };
  exports.KEY_CODES = KEY_CODES;
  var VALIDATE_WHEEL_TIMEOUT = 500;
  exports.VALIDATE_WHEEL_TIMEOUT = VALIDATE_WHEEL_TIMEOUT;
  var HIDE_SCROLLBAR_TIMEOUT = 500;
  exports.HIDE_SCROLLBAR_TIMEOUT = HIDE_SCROLLBAR_TIMEOUT;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=consts.js.map