!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/ganttHelpers.js"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/helpers/ganttHelpers.js", [], function($__export) {
  "use strict";
  var Consts,
      data,
      options,
      getGanttViewCore,
      showTaskEditDialog,
      getTask,
      getDependencyElements;
  return {
    setters: [],
    execute: function() {
      Consts = {
        TREELIST_SELECTOR: '.dx-treelist',
        TREELIST_DATA_ROW_SELECTOR: '.dx-data-row',
        TREELIST_WRAPPER_SELECTOR: '.dx-gantt-treelist-wrapper',
        TREELIST_HEADER_ROW_SELECTOR: '.dx-header-row',
        TREELIST_FILTER_ROW_SELECTOR: '.dx-treelist-filter-row',
        GANTT_VIEW_SELECTOR: '.dx-gantt-view',
        GANTT_VIEW_ROW_SELECTOR: '.dx-gantt-altRow',
        TASK_WRAPPER_SELECTOR: '.dx-gantt-taskWrapper',
        TASK_SELECTED_SELECTOR: '.dx-gantt-selectedTask',
        TASK_RESOURCES_SELECTOR: '.dx-gantt-taskRes',
        TASK_ARROW_SELECTOR: '.dx-gantt-arrow',
        TASK_TITLE_IN_SELECTOR: '.dx-gantt-titleIn',
        TASK_TITLE_OUT_SELECTOR: '.dx-gantt-titleOut',
        TREELIST_EXPANDED_SELECTOR: '.dx-treelist-expanded',
        TREELIST_COLLAPSED_SELECTOR: '.dx-treelist-collapsed',
        SELECTION_SELECTOR: '.dx-gantt-sel',
        SPLITTER_WRAPPER_SELECTOR: '.dx-splitter-wrapper',
        SPLITTER_SELECTOR: '.dx-splitter',
        POPUP_SELECTOR: '.dx-popup-normal',
        GANTT_VIEW_HORIZONTAL_BORDER_SELECTOR: '.dx-gantt-hb',
        TIME_MARKER_SELECTOR: '.dx-gantt-tm',
        TIME_INTERVAL_SELECTOR: '.dx-gantt-ti',
        OVERLAY_WRAPPER_SELECTOR: '.dx-overlay-wrapper',
        CONTEXT_MENU_SELECTOR: '.dx-context-menu',
        CONTEXT_MENU_ITEM_SELECTOR: '.dx-menu-item-text',
        INPUT_TEXT_EDITOR_SELECTOR: '.dx-texteditor-input',
        RADIO_BUTTON_SELECTOR: '.dx-radiobutton',
        TOOLBAR_ITEM_SELECTOR: '.dx-toolbar-item',
        PARENT_TASK_SELECTOR: '.dx-gantt-parent',
        TOOLBAR_SEPARATOR_SELECTOR: '.dx-gantt-toolbar-separator',
        TOOLTIP_SELECTOR: '.dx-gantt-task-edit-tooltip',
        TASK_SELECTOR: '.dx-gantt-task',
        TASK_EDIT_WRAPPER: '.dx-gantt-task-edit-wrapper'
      };
      $__export("Consts", Consts);
      data = {
        tasks: [{
          'id': 1,
          'parentId': 0,
          'title': 'Software Development',
          'start': new Date('2019-02-21T05:00:00.000Z'),
          'end': new Date('2019-07-04T12:00:00.000Z'),
          'progress': 31,
          'color': 'red'
        }, {
          'id': 2,
          'parentId': 1,
          'title': 'Scope',
          'start': new Date('2019-02-21T05:00:00.000Z'),
          'end': new Date('2019-02-26T09:00:00.000Z'),
          'progress': 60
        }, {
          'id': 3,
          'parentId': 2,
          'title': 'Determine project scope',
          'start': new Date('2019-02-21T05:00:00.000Z'),
          'end': new Date('2019-02-21T09:00:00.000Z'),
          'progress': 100
        }, {
          'id': 4,
          'parentId': 2,
          'title': 'Secure project sponsorship',
          'start': new Date('2019-02-21T10:00:00.000Z'),
          'end': new Date('2019-02-22T09:00:00.000Z'),
          'progress': 100
        }, {
          'id': 5,
          'parentId': 2,
          'title': 'Define preliminary resources',
          'start': new Date('2019-02-22T10:00:00.000Z'),
          'end': new Date('2019-02-25T09:00:00.000Z'),
          'progress': 60
        }, {
          'id': 6,
          'parentId': 2,
          'title': 'Secure core resources',
          'start': new Date('2019-02-25T10:00:00.000Z'),
          'end': new Date('2019-02-26T09:00:00.000Z'),
          'progress': 0
        }, {
          'id': 7,
          'parentId': 2,
          'title': 'Scope complete',
          'start': new Date('2019-02-26T09:00:00.000Z'),
          'end': new Date('2019-02-26T09:00:00.000Z'),
          'progress': 0
        }],
        dependencies: [{
          'id': 0,
          'predecessorId': 1,
          'successorId': 2,
          'type': 0
        }, {
          'id': 1,
          'predecessorId': 2,
          'successorId': 3,
          'type': 0
        }, {
          'id': 2,
          'predecessorId': 3,
          'successorId': 4,
          'type': 0
        }, {
          'id': 3,
          'predecessorId': 4,
          'successorId': 5,
          'type': 0
        }, {
          'id': 4,
          'predecessorId': 5,
          'successorId': 6,
          'type': 0
        }, {
          'id': 5,
          'predecessorId': 6,
          'successorId': 7,
          'type': 0
        }],
        resources: [{
          'id': 1,
          'text': 'Management'
        }, {
          'id': 2,
          'text': 'Project Manager'
        }, {
          'id': 3,
          'text': 'Deployment Team'
        }],
        resourceAssignments: [{
          'id': 0,
          'taskId': 3,
          'resourceId': 1
        }, {
          'id': 1,
          'taskId': 4,
          'resourceId': 1
        }, {
          'id': 2,
          'taskId': 5,
          'resourceId': 2
        }, {
          'id': 3,
          'taskId': 6,
          'resourceId': 2
        }, {
          'id': 4,
          'taskId': 6,
          'resourceId': 3
        }]
      };
      $__export("data", data);
      options = {
        tasksOnlyOptions: {tasks: {dataSource: data.tasks}},
        allSourcesOptions: {
          tasks: {dataSource: data.tasks},
          dependencies: {dataSource: data.dependencies},
          resources: {dataSource: data.resources},
          resourceAssignments: {dataSource: data.resourceAssignments}
        }
      };
      $__export("options", options);
      getGanttViewCore = function(gantt) {
        return gantt._ganttView._ganttViewCore;
      };
      $__export("getGanttViewCore", getGanttViewCore);
      showTaskEditDialog = function(gantt) {
        var ganttCore = getGanttViewCore(gantt);
        var task = ganttCore.viewModel.tasks.items[0];
        ganttCore.commandManager.showTaskEditDialog.execute(task);
      };
      $__export("showTaskEditDialog", showTaskEditDialog);
      getTask = function(mainElement, index) {
        return mainElement.find(("[task-index=\"" + index + "\"]"));
      };
      $__export("getTask", getTask);
      getDependencyElements = function(mainElement, internalId) {
        return mainElement.find(("[dependency-id=\"" + internalId + "\"]"));
      };
      $__export("getDependencyElements", getDependencyElements);
    }
  };
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
//# sourceMappingURL=ganttHelpers.js.map