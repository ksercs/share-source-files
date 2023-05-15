!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/classes.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled-renovation/ui/scheduler/classes.js', [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.VIRTUAL_CELL_CLASS = exports.VERTICAL_GROUP_COUNT_CLASSES = exports.TIME_PANEL_CLASS = exports.REDUCED_APPOINTMENT_PARTS_CLASSES = exports.REDUCED_APPOINTMENT_ICON = exports.REDUCED_APPOINTMENT_CLASS = exports.RECURRENCE_APPOINTMENT_CLASS = exports.LAST_GROUP_CELL_CLASS = exports.HEADER_CURRENT_TIME_CELL_CLASS = exports.GROUP_ROW_CLASS = exports.GROUP_HEADER_CONTENT_CLASS = exports.FIXED_CONTAINER_CLASS = exports.FIRST_GROUP_CELL_CLASS = exports.EMPTY_APPOINTMENT_CLASS = exports.DIRECTION_APPOINTMENT_CLASSES = exports.DATE_TABLE_ROW_CLASS = exports.DATE_TABLE_CLASS = exports.APPOINTMENT_ITEM_CLASS = exports.APPOINTMENT_DRAG_SOURCE_CLASS = exports.APPOINTMENT_CONTENT_CLASSES = exports.ALL_DAY_APPOINTMENT_CLASS = exports.AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS = void 0;
  var FIXED_CONTAINER_CLASS = 'dx-scheduler-fixed-appointments';
  exports.FIXED_CONTAINER_CLASS = FIXED_CONTAINER_CLASS;
  var REDUCED_APPOINTMENT_CLASS = 'dx-scheduler-appointment-reduced';
  exports.REDUCED_APPOINTMENT_CLASS = REDUCED_APPOINTMENT_CLASS;
  var REDUCED_APPOINTMENT_ICON = 'dx-scheduler-appointment-reduced-icon';
  exports.REDUCED_APPOINTMENT_ICON = REDUCED_APPOINTMENT_ICON;
  var RECURRENCE_APPOINTMENT_CLASS = 'dx-scheduler-appointment-recurrence';
  exports.RECURRENCE_APPOINTMENT_CLASS = RECURRENCE_APPOINTMENT_CLASS;
  var EMPTY_APPOINTMENT_CLASS = 'dx-scheduler-appointment-empty';
  exports.EMPTY_APPOINTMENT_CLASS = EMPTY_APPOINTMENT_CLASS;
  var ALL_DAY_APPOINTMENT_CLASS = 'dx-scheduler-all-day-appointment';
  exports.ALL_DAY_APPOINTMENT_CLASS = ALL_DAY_APPOINTMENT_CLASS;
  var REDUCED_APPOINTMENT_PARTS_CLASSES = {
    head: 'dx-scheduler-appointment-head',
    body: 'dx-scheduler-appointment-body',
    tail: 'dx-scheduler-appointment-tail'
  };
  exports.REDUCED_APPOINTMENT_PARTS_CLASSES = REDUCED_APPOINTMENT_PARTS_CLASSES;
  var DIRECTION_APPOINTMENT_CLASSES = {
    horizontal: 'dx-scheduler-appointment-horizontal',
    vertical: 'dx-scheduler-appointment-vertical'
  };
  exports.DIRECTION_APPOINTMENT_CLASSES = DIRECTION_APPOINTMENT_CLASSES;
  var APPOINTMENT_DRAG_SOURCE_CLASS = 'dx-scheduler-appointment-drag-source';
  exports.APPOINTMENT_DRAG_SOURCE_CLASS = APPOINTMENT_DRAG_SOURCE_CLASS;
  var APPOINTMENT_ITEM_CLASS = 'dx-scheduler-appointment';
  exports.APPOINTMENT_ITEM_CLASS = APPOINTMENT_ITEM_CLASS;
  var APPOINTMENT_CONTENT_CLASSES = {
    APPOINTMENT_CONTENT_DETAILS: 'dx-scheduler-appointment-content-details',
    RECURRING_ICON: 'dx-scheduler-appointment-recurrence-icon',
    APPOINTMENT_TITLE: 'dx-scheduler-appointment-title',
    APPOINTMENT_DATE: 'dx-scheduler-appointment-content-date',
    ALL_DAY_CONTENT: 'dx-scheduler-appointment-content-allday',
    ITEM: 'dx-scheduler-appointment',
    AGENDA_MARKER: 'dx-scheduler-agenda-appointment-marker',
    AGENDA_RESOURCE_LIST: 'dx-scheduler-appointment-resource-list',
    AGENDA_RESOURCE_LIST_ITEM: 'dx-scheduler-appointment-resource-item',
    AGENDA_RESOURCE_LIST_ITEM_VALUE: 'dx-scheduler-appointment-resource-item-value'
  };
  exports.APPOINTMENT_CONTENT_CLASSES = APPOINTMENT_CONTENT_CLASSES;
  var AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS = 'dx-scheduler-last-in-date-agenda-appointment';
  exports.AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS = AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS;
  var HEADER_CURRENT_TIME_CELL_CLASS = 'dx-scheduler-header-panel-current-time-cell';
  exports.HEADER_CURRENT_TIME_CELL_CLASS = HEADER_CURRENT_TIME_CELL_CLASS;
  var VIRTUAL_CELL_CLASS = 'dx-scheduler-virtual-cell';
  exports.VIRTUAL_CELL_CLASS = VIRTUAL_CELL_CLASS;
  var TIME_PANEL_CLASS = 'dx-scheduler-time-panel';
  exports.TIME_PANEL_CLASS = TIME_PANEL_CLASS;
  var DATE_TABLE_CLASS = 'dx-scheduler-date-table';
  exports.DATE_TABLE_CLASS = DATE_TABLE_CLASS;
  var DATE_TABLE_ROW_CLASS = 'dx-scheduler-date-table-row';
  exports.DATE_TABLE_ROW_CLASS = DATE_TABLE_ROW_CLASS;
  var GROUP_ROW_CLASS = 'dx-scheduler-group-row';
  exports.GROUP_ROW_CLASS = GROUP_ROW_CLASS;
  var GROUP_HEADER_CONTENT_CLASS = 'dx-scheduler-group-header-content';
  exports.GROUP_HEADER_CONTENT_CLASS = GROUP_HEADER_CONTENT_CLASS;
  var LAST_GROUP_CELL_CLASS = 'dx-scheduler-last-group-cell';
  exports.LAST_GROUP_CELL_CLASS = LAST_GROUP_CELL_CLASS;
  var FIRST_GROUP_CELL_CLASS = 'dx-scheduler-first-group-cell';
  exports.FIRST_GROUP_CELL_CLASS = FIRST_GROUP_CELL_CLASS;
  var VERTICAL_GROUP_COUNT_CLASSES = ['dx-scheduler-group-column-count-one', 'dx-scheduler-group-column-count-two', 'dx-scheduler-group-column-count-three'];
  exports.VERTICAL_GROUP_COUNT_CLASSES = VERTICAL_GROUP_COUNT_CLASSES;
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
//# sourceMappingURL=classes.js.map