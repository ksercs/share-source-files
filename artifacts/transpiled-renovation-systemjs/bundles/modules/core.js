!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/bundles/modules/core.js"], ["../../core/utils/window","../../core/errors","../../exporter","../../excel_exporter","../../pdf_exporter","../../core/version","../../core/class","../../core/dom_component","../../core/component","../../core/component_registrator","../../core/devices","../../color","../../animation/frame","../../mobile/init_mobile_viewport/init_mobile_viewport","../../time_zone_utils","../../core/utils/extend","../../events/visibility_change","../../core/utils/dom","../../core/utils/common","../../core/utils/queue","../../core/utils/date","../../core/utils/browser","../../core/utils/inflector","../../core/utils/iterator","../../core/utils/ready_callbacks","../../core/utils/resize_callbacks","../../core/utils/console","../../core/utils/string","../../core/utils/support","../../core/utils/ajax","../../core/utils/view_port","../../mobile/hide_top_overlay","../../format_helper","../../core/config","../../animation/presets/presets","../../animation/fx","../../animation/transition_executor/transition_executor","../../events","../../events/click","../../events/utils","../../events/gesture/emitter.gesture","../../localization","../../core/templates/template_base","../../core/templates/template_engine_registry"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled-renovation/bundles/modules/core.js', ['../../core/utils/window', '../../core/errors', '../../exporter', '../../excel_exporter', '../../pdf_exporter', '../../core/version', '../../core/class', '../../core/dom_component', '../../core/component', '../../core/component_registrator', '../../core/devices', '../../color', '../../animation/frame', '../../mobile/init_mobile_viewport/init_mobile_viewport', '../../time_zone_utils', '../../core/utils/extend', '../../events/visibility_change', '../../core/utils/dom', '../../core/utils/common', '../../core/utils/queue', '../../core/utils/date', '../../core/utils/browser', '../../core/utils/inflector', '../../core/utils/iterator', '../../core/utils/ready_callbacks', '../../core/utils/resize_callbacks', '../../core/utils/console', '../../core/utils/string', '../../core/utils/support', '../../core/utils/ajax', '../../core/utils/view_port', '../../mobile/hide_top_overlay', '../../format_helper', '../../core/config', '../../animation/presets/presets', '../../animation/fx', '../../animation/transition_executor/transition_executor', '../../events', '../../events/click', '../../events/utils', '../../events/gesture/emitter.gesture', '../../localization', '../../core/templates/template_base', '../../core/templates/template_engine_registry'], true, function ($__require, exports, module) {
  "use strict";

  /* eslint-disable import/no-commonjs */

  var global = this || self,
      GLOBAL = global;
  var windowUtils = $__require('../../core/utils/window');
  var window = windowUtils.getWindow();
  var DevExpress = window.DevExpress = window.DevExpress || {};
  var errors = DevExpress.errors = $__require('../../core/errors');
  if (DevExpress._DEVEXTREME_BUNDLE_INITIALIZED) {
    throw errors.Error('E0024');
  }
  DevExpress._DEVEXTREME_BUNDLE_INITIALIZED = true;
  DevExpress.clientExporter = $__require('../../exporter');
  DevExpress.excelExporter = $__require('../../excel_exporter');
  DevExpress.pdfExporter = $__require('../../pdf_exporter');
  DevExpress.VERSION = $__require('../../core/version').version;
  DevExpress.Class = $__require('../../core/class');
  DevExpress.DOMComponent = $__require('../../core/dom_component');
  DevExpress.Component = $__require('../../core/component').Component;
  DevExpress.registerComponent = $__require('../../core/component_registrator');
  DevExpress.devices = $__require('../../core/devices');
  DevExpress.Color = $__require('../../color');
  var animationFrame = $__require('../../animation/frame');

  /**
   * @name utils
   * @namespace DevExpress
   */
  DevExpress.utils = {};
  DevExpress.utils.requestAnimationFrame = animationFrame.requestAnimationFrame;
  DevExpress.utils.cancelAnimationFrame = animationFrame.cancelAnimationFrame;
  DevExpress.utils.initMobileViewport = $__require('../../mobile/init_mobile_viewport/init_mobile_viewport').initMobileViewport;
  DevExpress.utils.getTimeZones = $__require('../../time_zone_utils').getTimeZones;

  // TODO: MODULARITY: Remove this
  DevExpress.utils.extendFromObject = $__require('../../core/utils/extend').extendFromObject;
  DevExpress.utils.triggerShownEvent = $__require('../../events/visibility_change').triggerShownEvent;
  DevExpress.utils.triggerHidingEvent = $__require('../../events/visibility_change').triggerHidingEvent;
  DevExpress.utils.resetActiveElement = $__require('../../core/utils/dom').resetActiveElement;
  DevExpress.utils.findBestMatches = $__require('../../core/utils/common').findBestMatches;
  DevExpress.createQueue = $__require('../../core/utils/queue').create;
  DevExpress.utils.dom = $__require('../../core/utils/dom');
  DevExpress.utils.common = $__require('../../core/utils/common');
  DevExpress.utils.date = $__require('../../core/utils/date');
  DevExpress.utils.browser = $__require('../../core/utils/browser');
  DevExpress.utils.inflector = $__require('../../core/utils/inflector');
  DevExpress.utils.iterator = $__require('../../core/utils/iterator');
  DevExpress.utils.readyCallbacks = $__require('../../core/utils/ready_callbacks');
  DevExpress.utils.resizeCallbacks = $__require('../../core/utils/resize_callbacks');
  DevExpress.utils.console = $__require('../../core/utils/console');
  DevExpress.utils.string = $__require('../../core/utils/string');
  DevExpress.utils.support = $__require('../../core/utils/support');
  DevExpress.utils.ajax = $__require('../../core/utils/ajax');
  DevExpress.viewPort = $__require('../../core/utils/view_port').value;
  DevExpress.hideTopOverlay = $__require('../../mobile/hide_top_overlay');
  DevExpress.formatHelper = $__require('../../format_helper');
  DevExpress.config = $__require('../../core/config');
  DevExpress.animationPresets = $__require('../../animation/presets/presets').presets;
  DevExpress.fx = $__require('../../animation/fx');
  DevExpress.TransitionExecutor = $__require('../../animation/transition_executor/transition_executor').TransitionExecutor;
  DevExpress.AnimationPresetCollection = $__require('../../animation/presets/presets').PresetCollection;
  DevExpress.events = $__require('../../events');
  DevExpress.events.click = $__require('../../events/click');
  DevExpress.events.utils = $__require('../../events/utils');
  DevExpress.events.GestureEmitter = $__require('../../events/gesture/emitter.gesture');
  DevExpress.localization = $__require('../../localization');
  DevExpress.templateRendered = $__require('../../core/templates/template_base').renderedCallbacks;
  DevExpress.setTemplateEngine = $__require('../../core/templates/template_engine_registry').setTemplateEngine;
  module.exports = DevExpress;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/window","../../core/errors","../../exporter","../../excel_exporter","../../pdf_exporter","../../core/version","../../core/class","../../core/dom_component","../../core/component","../../core/component_registrator","../../core/devices","../../color","../../animation/frame","../../mobile/init_mobile_viewport/init_mobile_viewport","../../time_zone_utils","../../core/utils/extend","../../events/visibility_change","../../core/utils/dom","../../core/utils/common","../../core/utils/queue","../../core/utils/date","../../core/utils/browser","../../core/utils/inflector","../../core/utils/iterator","../../core/utils/ready_callbacks","../../core/utils/resize_callbacks","../../core/utils/console","../../core/utils/string","../../core/utils/support","../../core/utils/ajax","../../core/utils/view_port","../../mobile/hide_top_overlay","../../format_helper","../../core/config","../../animation/presets/presets","../../animation/fx","../../animation/transition_executor/transition_executor","../../events","../../events/click","../../events/utils","../../events/gesture/emitter.gesture","../../localization","../../core/templates/template_base","../../core/templates/template_engine_registry"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/window"), require("../../core/errors"), require("../../exporter"), require("../../excel_exporter"), require("../../pdf_exporter"), require("../../core/version"), require("../../core/class"), require("../../core/dom_component"), require("../../core/component"), require("../../core/component_registrator"), require("../../core/devices"), require("../../color"), require("../../animation/frame"), require("../../mobile/init_mobile_viewport/init_mobile_viewport"), require("../../time_zone_utils"), require("../../core/utils/extend"), require("../../events/visibility_change"), require("../../core/utils/dom"), require("../../core/utils/common"), require("../../core/utils/queue"), require("../../core/utils/date"), require("../../core/utils/browser"), require("../../core/utils/inflector"), require("../../core/utils/iterator"), require("../../core/utils/ready_callbacks"), require("../../core/utils/resize_callbacks"), require("../../core/utils/console"), require("../../core/utils/string"), require("../../core/utils/support"), require("../../core/utils/ajax"), require("../../core/utils/view_port"), require("../../mobile/hide_top_overlay"), require("../../format_helper"), require("../../core/config"), require("../../animation/presets/presets"), require("../../animation/fx"), require("../../animation/transition_executor/transition_executor"), require("../../events"), require("../../events/click"), require("../../events/utils"), require("../../events/gesture/emitter.gesture"), require("../../localization"), require("../../core/templates/template_base"), require("../../core/templates/template_engine_registry"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=core.js.map