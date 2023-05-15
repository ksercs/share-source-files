!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.editing_constants.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.editing_constants.js', [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.VIEWPORT_TOP_NEW_ROW_POSITION = exports.VIEWPORT_BOTTOM_NEW_ROW_POSITION = exports.TARGET_COMPONENT_NAME = exports.ROW_SELECTED_CLASS = exports.ROW_CLASS = exports.ROW_BASED_MODES = exports.PAGE_TOP_NEW_ROW_POSITION = exports.PAGE_BOTTOM_NEW_ROW_POSITION = exports.MODES_WITH_DELAYED_FOCUS = exports.LAST_NEW_ROW_POSITION = exports.FOCUSABLE_ELEMENT_SELECTOR = exports.FIRST_NEW_ROW_POSITION = exports.EDIT_MODE_ROW = exports.EDIT_MODE_POPUP = exports.EDIT_MODE_FORM = exports.EDIT_MODE_CELL = exports.EDIT_MODE_BATCH = exports.EDIT_MODES = exports.EDIT_FORM_CLASS = exports.EDITOR_CELL_CLASS = exports.EDITORS_INPUT_SELECTOR = exports.EDITING_POPUP_OPTION_NAME = exports.EDITING_FORM_OPTION_NAME = exports.EDITING_EDITROWKEY_OPTION_NAME = exports.EDITING_EDITCOLUMNNAME_OPTION_NAME = exports.DATA_EDIT_DATA_REMOVE_TYPE = exports.DATA_EDIT_DATA_INSERT_TYPE = exports.CELL_MODIFIED_CLASS = void 0;
  var EDITOR_CELL_CLASS = 'dx-editor-cell';
  exports.EDITOR_CELL_CLASS = EDITOR_CELL_CLASS;
  var ROW_CLASS = 'dx-row';
  exports.ROW_CLASS = ROW_CLASS;
  var CELL_MODIFIED_CLASS = 'dx-cell-modified';
  exports.CELL_MODIFIED_CLASS = CELL_MODIFIED_CLASS;
  var ROW_SELECTED_CLASS = 'dx-selection';
  exports.ROW_SELECTED_CLASS = ROW_SELECTED_CLASS;
  var EDIT_FORM_CLASS = 'edit-form';
  exports.EDIT_FORM_CLASS = EDIT_FORM_CLASS;
  var DATA_EDIT_DATA_INSERT_TYPE = 'insert';
  exports.DATA_EDIT_DATA_INSERT_TYPE = DATA_EDIT_DATA_INSERT_TYPE;
  var DATA_EDIT_DATA_REMOVE_TYPE = 'remove';
  exports.DATA_EDIT_DATA_REMOVE_TYPE = DATA_EDIT_DATA_REMOVE_TYPE;
  var EDITING_POPUP_OPTION_NAME = 'editing.popup';
  exports.EDITING_POPUP_OPTION_NAME = EDITING_POPUP_OPTION_NAME;
  var EDITING_FORM_OPTION_NAME = 'editing.form';
  exports.EDITING_FORM_OPTION_NAME = EDITING_FORM_OPTION_NAME;
  var EDITING_EDITROWKEY_OPTION_NAME = 'editing.editRowKey';
  exports.EDITING_EDITROWKEY_OPTION_NAME = EDITING_EDITROWKEY_OPTION_NAME;
  var EDITING_EDITCOLUMNNAME_OPTION_NAME = 'editing.editColumnName';
  exports.EDITING_EDITCOLUMNNAME_OPTION_NAME = EDITING_EDITCOLUMNNAME_OPTION_NAME;
  var TARGET_COMPONENT_NAME = 'targetComponent';
  exports.TARGET_COMPONENT_NAME = TARGET_COMPONENT_NAME;
  var EDITORS_INPUT_SELECTOR = 'input:not([type=\'hidden\'])';
  exports.EDITORS_INPUT_SELECTOR = EDITORS_INPUT_SELECTOR;
  var FOCUSABLE_ELEMENT_SELECTOR = '[tabindex], ' + EDITORS_INPUT_SELECTOR;
  exports.FOCUSABLE_ELEMENT_SELECTOR = FOCUSABLE_ELEMENT_SELECTOR;
  var EDIT_MODE_BATCH = 'batch';
  exports.EDIT_MODE_BATCH = EDIT_MODE_BATCH;
  var EDIT_MODE_ROW = 'row';
  exports.EDIT_MODE_ROW = EDIT_MODE_ROW;
  var EDIT_MODE_CELL = 'cell';
  exports.EDIT_MODE_CELL = EDIT_MODE_CELL;
  var EDIT_MODE_FORM = 'form';
  exports.EDIT_MODE_FORM = EDIT_MODE_FORM;
  var EDIT_MODE_POPUP = 'popup';
  exports.EDIT_MODE_POPUP = EDIT_MODE_POPUP;
  var FIRST_NEW_ROW_POSITION = 'first';
  exports.FIRST_NEW_ROW_POSITION = FIRST_NEW_ROW_POSITION;
  var LAST_NEW_ROW_POSITION = 'last';
  exports.LAST_NEW_ROW_POSITION = LAST_NEW_ROW_POSITION;
  var PAGE_BOTTOM_NEW_ROW_POSITION = 'pageBottom';
  exports.PAGE_BOTTOM_NEW_ROW_POSITION = PAGE_BOTTOM_NEW_ROW_POSITION;
  var PAGE_TOP_NEW_ROW_POSITION = 'pageTop';
  exports.PAGE_TOP_NEW_ROW_POSITION = PAGE_TOP_NEW_ROW_POSITION;
  var VIEWPORT_BOTTOM_NEW_ROW_POSITION = 'viewportBottom';
  exports.VIEWPORT_BOTTOM_NEW_ROW_POSITION = VIEWPORT_BOTTOM_NEW_ROW_POSITION;
  var VIEWPORT_TOP_NEW_ROW_POSITION = 'viewportTop';
  exports.VIEWPORT_TOP_NEW_ROW_POSITION = VIEWPORT_TOP_NEW_ROW_POSITION;
  var EDIT_MODES = [EDIT_MODE_BATCH, EDIT_MODE_ROW, EDIT_MODE_CELL, EDIT_MODE_FORM, EDIT_MODE_POPUP];
  exports.EDIT_MODES = EDIT_MODES;
  var ROW_BASED_MODES = [EDIT_MODE_ROW, EDIT_MODE_FORM, EDIT_MODE_POPUP];
  exports.ROW_BASED_MODES = ROW_BASED_MODES;
  var MODES_WITH_DELAYED_FOCUS = [EDIT_MODE_ROW, EDIT_MODE_FORM];
  exports.MODES_WITH_DELAYED_FOCUS = MODES_WITH_DELAYED_FOCUS;
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
//# sourceMappingURL=ui.grid_core.editing_constants.js.map