!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/gantt/ui.gantt.model_changes_listener.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled-renovation/ui/gantt/ui.gantt.model_changes_listener.js', [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.ModelChangesListener = void 0;
  var GANTT_TASKS = 'tasks';
  var GANTT_DEPENDENCIES = 'dependencies';
  var GANTT_RESOURCES = 'resources';
  var GANTT_RESOURCE_ASSIGNMENTS = 'resourceAssignments';
  var ModelChangesListener = {
    create: function create(gantt) {
      return {
        // IModelChangesListener
        NotifyTaskCreated: function NotifyTaskCreated(task, callback, errorCallback) {
          gantt._onRecordInserted(GANTT_TASKS, task, callback);
        },
        NotifyTaskRemoved: function NotifyTaskRemoved(taskId, errorCallback, task) {
          gantt._onRecordRemoved(GANTT_TASKS, taskId, task);
        },
        NotifyTaskUpdated: function NotifyTaskUpdated(taskId, newValues, errorCallback) {
          gantt._onRecordUpdated(GANTT_TASKS, taskId, newValues);
        },
        NotifyParentTaskUpdated: function NotifyParentTaskUpdated(task, errorCallback) {
          gantt._onParentTaskUpdated(task);
        },
        NotifyDependencyInserted: function NotifyDependencyInserted(dependency, callback, errorCallback) {
          gantt._onRecordInserted(GANTT_DEPENDENCIES, dependency, callback);
        },
        NotifyDependencyRemoved: function NotifyDependencyRemoved(dependencyId, errorCallback, dependency) {
          gantt._onRecordRemoved(GANTT_DEPENDENCIES, dependencyId, dependency);
        },
        NotifyResourceCreated: function NotifyResourceCreated(resource, callback, errorCallback) {
          gantt._onRecordInserted(GANTT_RESOURCES, resource, callback);
        },
        NotifyResourceRemoved: function NotifyResourceRemoved(resourceId, errorCallback, resource) {
          gantt._onRecordRemoved(GANTT_RESOURCES, resourceId, resource);
        },
        NotifyResourceAssigned: function NotifyResourceAssigned(assignment, callback, errorCallback) {
          gantt._onRecordInserted(GANTT_RESOURCE_ASSIGNMENTS, assignment, callback);
        },
        NotifyResourceUnassigned: function NotifyResourceUnassigned(assignmentId, errorCallback, assignment) {
          gantt._onRecordRemoved(GANTT_RESOURCE_ASSIGNMENTS, assignmentId, assignment);
        },
        NotifyParentDataRecalculated: function NotifyParentDataRecalculated(data) {
          gantt._onParentTasksRecalculated(data);
        },
        NotifyTaskCreating: function NotifyTaskCreating(args) {
          gantt._actionsManager.raiseInsertingAction(GANTT_TASKS, args);
        },
        NotifyTaskRemoving: function NotifyTaskRemoving(args) {
          gantt._actionsManager.raiseDeletingAction(GANTT_TASKS, args);
        },
        NotifyTaskUpdating: function NotifyTaskUpdating(args) {
          gantt._actionsManager.raiseUpdatingAction(GANTT_TASKS, args);
        },
        NotifyTaskMoving: function NotifyTaskMoving(args) {
          gantt._actionsManager.raiseUpdatingAction(GANTT_TASKS, args, gantt._actionsManager.getTaskMovingAction());
        },
        NotifyTaskEditDialogShowing: function NotifyTaskEditDialogShowing(args) {
          gantt._actionsManager.raiseTaskEditDialogShowingAction(args);
        },
        NotifyResourceManagerDialogShowing: function NotifyResourceManagerDialogShowing(args) {
          gantt._actionsManager.raiseResourceManagerDialogShowingAction(args);
        },
        NotifyDependencyInserting: function NotifyDependencyInserting(args) {
          gantt._actionsManager.raiseInsertingAction(GANTT_DEPENDENCIES, args);
        },
        NotifyDependencyRemoving: function NotifyDependencyRemoving(args) {
          gantt._actionsManager.raiseDeletingAction(GANTT_DEPENDENCIES, args);
        },
        NotifyResourceCreating: function NotifyResourceCreating(args) {
          gantt._actionsManager.raiseInsertingAction(GANTT_RESOURCES, args);
        },
        NotifyResourceRemoving: function NotifyResourceRemoving(args) {
          gantt._actionsManager.raiseDeletingAction(GANTT_RESOURCES, args);
        },
        NotifyResourceAssigning: function NotifyResourceAssigning(args) {
          gantt._actionsManager.raiseInsertingAction(GANTT_RESOURCE_ASSIGNMENTS, args);
        },
        // eslint-disable-next-line spellcheck/spell-checker
        NotifyResourceUnassigning: function NotifyResourceUnassigning(args) {
          gantt._actionsManager.raiseDeletingAction(GANTT_RESOURCE_ASSIGNMENTS, args);
        },
        NotifyScaleCellPrepared: function NotifyScaleCellPrepared(args) {
          gantt._actionsManager.raiseScaleCellPreparedAction(args);
        },
        NotifyGanttViewUpdated: function NotifyGanttViewUpdated() {
          gantt._onGanttViewCoreUpdated();
        }
      };
    }
  };
  exports.ModelChangesListener = ModelChangesListener;
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
//# sourceMappingURL=ui.gantt.model_changes_listener.js.map