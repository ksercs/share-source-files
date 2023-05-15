!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/grid_core/keyboard_navigation/const.js"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/grid_core/keyboard_navigation/const.js", [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WIDGET_CLASS = exports.VIRTUAL_ROW_CLASS = exports.ROW_CLASS = exports.ROWS_VIEW_CLASS = exports.REVERT_BUTTON_CLASS = exports.NON_FOCUSABLE_ELEMENTS_SELECTOR = exports.MASTER_DETAIL_ROW_CLASS = exports.MASTER_DETAIL_CELL_CLASS = exports.INTERACTIVE_ELEMENTS_SELECTOR = exports.HEADER_ROW_CLASS = exports.GROUP_ROW_CLASS = exports.GROUP_FOOTER_CLASS = exports.FUNCTIONAL_KEYS = exports.FREESPACE_ROW_CLASS = exports.FOCUS_TYPE_ROW = exports.FOCUS_TYPE_CELL = exports.FOCUS_STATE_CLASS = exports.FAST_EDITING_DELETE_KEY = exports.EDIT_MODE_FORM = exports.EDIT_FORM_ITEM_CLASS = exports.EDIT_FORM_CLASS = exports.EDITOR_CELL_CLASS = exports.DROPDOWN_EDITOR_OVERLAY_CLASS = exports.DATEBOX_WIDGET_NAME = exports.DATA_ROW_CLASS = exports.COMMAND_SELECT_CLASS = exports.COMMAND_EXPAND_CLASS = exports.COMMAND_EDIT_CLASS = exports.COMMAND_CELL_SELECTOR = exports.COLUMN_HEADERS_VIEW = exports.CELL_FOCUS_DISABLED_CLASS = exports.ATTRIBUTES = void 0;
  var ATTRIBUTES = {
    ariaColIndex: 'aria-colindex',
    dragCell: 'dx-drag-cell'
  };
  exports.ATTRIBUTES = ATTRIBUTES;
  var ROWS_VIEW_CLASS = 'rowsview';
  exports.ROWS_VIEW_CLASS = ROWS_VIEW_CLASS;
  var EDIT_FORM_CLASS = 'edit-form';
  exports.EDIT_FORM_CLASS = EDIT_FORM_CLASS;
  var GROUP_FOOTER_CLASS = 'group-footer';
  exports.GROUP_FOOTER_CLASS = GROUP_FOOTER_CLASS;
  var ROW_CLASS = 'dx-row';
  exports.ROW_CLASS = ROW_CLASS;
  var DATA_ROW_CLASS = 'dx-data-row';
  exports.DATA_ROW_CLASS = DATA_ROW_CLASS;
  var GROUP_ROW_CLASS = 'dx-group-row';
  exports.GROUP_ROW_CLASS = GROUP_ROW_CLASS;
  var HEADER_ROW_CLASS = 'dx-header-row';
  exports.HEADER_ROW_CLASS = HEADER_ROW_CLASS;
  var EDIT_FORM_ITEM_CLASS = 'edit-form-item';
  exports.EDIT_FORM_ITEM_CLASS = EDIT_FORM_ITEM_CLASS;
  var MASTER_DETAIL_ROW_CLASS = 'dx-master-detail-row';
  exports.MASTER_DETAIL_ROW_CLASS = MASTER_DETAIL_ROW_CLASS;
  var FREESPACE_ROW_CLASS = 'dx-freespace-row';
  exports.FREESPACE_ROW_CLASS = FREESPACE_ROW_CLASS;
  var VIRTUAL_ROW_CLASS = 'dx-virtual-row';
  exports.VIRTUAL_ROW_CLASS = VIRTUAL_ROW_CLASS;
  var MASTER_DETAIL_CELL_CLASS = 'dx-master-detail-cell';
  exports.MASTER_DETAIL_CELL_CLASS = MASTER_DETAIL_CELL_CLASS;
  var EDITOR_CELL_CLASS = 'dx-editor-cell';
  exports.EDITOR_CELL_CLASS = EDITOR_CELL_CLASS;
  var DROPDOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
  exports.DROPDOWN_EDITOR_OVERLAY_CLASS = DROPDOWN_EDITOR_OVERLAY_CLASS;
  var COMMAND_EXPAND_CLASS = 'dx-command-expand';
  exports.COMMAND_EXPAND_CLASS = COMMAND_EXPAND_CLASS;
  var COMMAND_SELECT_CLASS = 'dx-command-select';
  exports.COMMAND_SELECT_CLASS = COMMAND_SELECT_CLASS;
  var COMMAND_EDIT_CLASS = 'dx-command-edit';
  exports.COMMAND_EDIT_CLASS = COMMAND_EDIT_CLASS;
  var COMMAND_CELL_SELECTOR = '[class^=dx-command]';
  exports.COMMAND_CELL_SELECTOR = COMMAND_CELL_SELECTOR;
  var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
  exports.CELL_FOCUS_DISABLED_CLASS = CELL_FOCUS_DISABLED_CLASS;
  var DATEBOX_WIDGET_NAME = 'dxDateBox';
  exports.DATEBOX_WIDGET_NAME = DATEBOX_WIDGET_NAME;
  var FOCUS_STATE_CLASS = 'dx-state-focused';
  exports.FOCUS_STATE_CLASS = FOCUS_STATE_CLASS;
  var WIDGET_CLASS = 'dx-widget';
  exports.WIDGET_CLASS = WIDGET_CLASS;
  var REVERT_BUTTON_CLASS = 'dx-revert-button';
  exports.REVERT_BUTTON_CLASS = REVERT_BUTTON_CLASS;
  var FAST_EDITING_DELETE_KEY = 'delete';
  exports.FAST_EDITING_DELETE_KEY = FAST_EDITING_DELETE_KEY;
  var INTERACTIVE_ELEMENTS_SELECTOR = 'input:not([type=\'hidden\']), textarea, a, select, button, [tabindex], .dx-checkbox';
  exports.INTERACTIVE_ELEMENTS_SELECTOR = INTERACTIVE_ELEMENTS_SELECTOR;
  var NON_FOCUSABLE_ELEMENTS_SELECTOR = "".concat(INTERACTIVE_ELEMENTS_SELECTOR, ", .dx-dropdowneditor-icon");
  exports.NON_FOCUSABLE_ELEMENTS_SELECTOR = NON_FOCUSABLE_ELEMENTS_SELECTOR;
  var EDIT_MODE_FORM = 'form';
  exports.EDIT_MODE_FORM = EDIT_MODE_FORM;
  var FOCUS_TYPE_ROW = 'row';
  exports.FOCUS_TYPE_ROW = FOCUS_TYPE_ROW;
  var FOCUS_TYPE_CELL = 'cell';
  exports.FOCUS_TYPE_CELL = FOCUS_TYPE_CELL;
  var COLUMN_HEADERS_VIEW = 'columnHeadersView';
  exports.COLUMN_HEADERS_VIEW = COLUMN_HEADERS_VIEW;
  var FUNCTIONAL_KEYS = ['shift', 'control', 'alt'];
  exports.FUNCTIONAL_KEYS = FUNCTIONAL_KEYS;
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
//# sourceMappingURL=const.js.map