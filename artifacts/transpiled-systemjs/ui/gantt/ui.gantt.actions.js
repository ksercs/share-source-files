!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/gantt/ui.gantt.actions.js"], ["../../core/renderer","../../core/element"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/gantt/ui.gantt.actions.js", ["../../core/renderer", "../../core/element"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.GanttActionsManager = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _element = $__require("../../core/element");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  /* eslint-disable spellcheck/spell-checker */
  var Actions = {
    onContextMenuPreparing: 'onContextMenuPreparing',
    onCustomCommand: 'onCustomCommand',
    onDependencyDeleted: 'onDependencyDeleted',
    onDependencyDeleting: 'onDependencyDeleting',
    onDependencyInserted: 'onDependencyInserted',
    onDependencyInserting: 'onDependencyInserting',
    onResourceAssigned: 'onResourceAssigned',
    onResourceAssigning: 'onResourceAssigning',
    onResourceDeleted: 'onResourceDeleted',
    onResourceDeleting: 'onResourceDeleting',
    onResourceInserted: 'onResourceInserted',
    onResourceInserting: 'onResourceInserting',
    onResourceManagerDialogShowing: 'onResourceManagerDialogShowing',
    onResourceUnassigned: 'onResourceUnassigned',
    onResourceUnassigning: 'onResourceUnassigning',
    onSelectionChanged: 'onSelectionChanged',
    onTaskClick: 'onTaskClick',
    onTaskDblClick: 'onTaskDblClick',
    onTaskDeleted: 'onTaskDeleted',
    onTaskDeleting: 'onTaskDeleting',
    onTaskEditDialogShowing: 'onTaskEditDialogShowing',
    onTaskInserted: 'onTaskInserted',
    onTaskInserting: 'onTaskInserting',
    onTaskMoving: 'onTaskMoving',
    onTaskUpdated: 'onTaskUpdated',
    onTaskUpdating: 'onTaskUpdating',
    onScaleCellPrepared: 'onScaleCellPrepared'
  };
  var GANTT_TASKS = 'tasks';
  var GANTT_DEPENDENCIES = 'dependencies';
  var GANTT_RESOURCES = 'resources';
  var GANTT_RESOURCE_ASSIGNMENTS = 'resourceAssignments';
  var GANTT_NEW_TASK_CACHE_KEY = 'gantt_new_task_key';
  var GanttActionsManager = /*#__PURE__*/function () {
    function GanttActionsManager(gantt) {
      this._gantt = gantt;
      this._mappingHelper = gantt._mappingHelper;
      this._customFieldsManager = gantt._customFieldsManager;
    }
    var _proto = GanttActionsManager.prototype;
    _proto._createActionByOption = function _createActionByOption(optionName) {
      return this._gantt._createActionByOption(optionName);
    };
    _proto._getTaskData = function _getTaskData(key) {
      return this._gantt.getTaskData(key);
    };
    _proto._convertCoreToMappedData = function _convertCoreToMappedData(optionName, coreData) {
      return this._mappingHelper.convertCoreToMappedData(optionName, coreData);
    };
    _proto._convertMappedToCoreData = function _convertMappedToCoreData(optionName, mappedData) {
      return this._mappingHelper.convertMappedToCoreData(optionName, mappedData);
    };
    _proto._convertMappedToCoreFields = function _convertMappedToCoreFields(optionName, fields) {
      return this._mappingHelper.convertMappedToCoreFields(optionName, fields);
    };
    _proto._convertCoreToMappedFields = function _convertCoreToMappedFields(optionName, fields) {
      return this._mappingHelper.convertCoreToMappedFields(optionName, fields);
    };
    _proto._saveCustomFieldsDataToCache = function _saveCustomFieldsDataToCache(key, data) {
      var forceUpdateOnKeyExpire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var isCustomFieldsUpdateOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this._customFieldsManager.saveCustomFieldsDataToCache(key, data, forceUpdateOnKeyExpire, isCustomFieldsUpdateOnly);
    };
    _proto.createTaskDblClickAction = function createTaskDblClickAction() {
      this._taskDblClickAction = this._createActionByOption(Actions.onTaskDblClick);
    };
    _proto.taskDblClickAction = function taskDblClickAction(args) {
      if (!this._taskDblClickAction) {
        this.createTaskDblClickAction();
      }
      this._taskDblClickAction(args);
    };
    _proto.raiseTaskDblClickAction = function raiseTaskDblClickAction(key, event) {
      var args = {
        cancel: false,
        data: this._getTaskData(key),
        event: event,
        key: key
      };
      this.taskDblClickAction(args);
      return !args.cancel;
    };
    _proto.createTaskClickAction = function createTaskClickAction() {
      this._taskClickAction = this._createActionByOption(Actions.onTaskClick);
    };
    _proto.taskClickAction = function taskClickAction(args) {
      if (!this._taskClickAction) {
        this.createTaskClickAction();
      }
      this._taskClickAction(args);
    };
    _proto.raiseTaskClickAction = function raiseTaskClickAction(key, event) {
      var args = {
        key: key,
        event: event,
        data: this._getTaskData(key)
      };
      this.taskClickAction(args);
    };
    _proto.createSelectionChangedAction = function createSelectionChangedAction() {
      this._selectionChangedAction = this._createActionByOption(Actions.onSelectionChanged);
    };
    _proto.selectionChangedAction = function selectionChangedAction(args) {
      if (!this._selectionChangedAction) {
        this.createSelectionChangedAction();
      }
      this._selectionChangedAction(args);
    };
    _proto.raiseSelectionChangedAction = function raiseSelectionChangedAction(selectedRowKey) {
      this.selectionChangedAction({
        selectedRowKey: selectedRowKey
      });
    };
    _proto.createCustomCommandAction = function createCustomCommandAction() {
      this._customCommandAction = this._createActionByOption(Actions.onCustomCommand);
    };
    _proto.customCommandAction = function customCommandAction(args) {
      if (!this._customCommandAction) {
        this.createCustomCommandAction();
      }
      this._customCommandAction(args);
    };
    _proto.raiseCustomCommand = function raiseCustomCommand(commandName) {
      this.customCommandAction({
        name: commandName
      });
    };
    _proto.createContextMenuPreparingAction = function createContextMenuPreparingAction() {
      this._contextMenuPreparingAction = this._createActionByOption(Actions.onContextMenuPreparing);
    };
    _proto.contextMenuPreparingAction = function contextMenuPreparingAction(args) {
      if (!this._contextMenuPreparingAction) {
        this.createContextMenuPreparingAction();
      }
      this._contextMenuPreparingAction(args);
    };
    _proto.raiseContextMenuPreparing = function raiseContextMenuPreparing(options) {
      this.contextMenuPreparingAction(options);
    };
    _proto._getInsertingAction = function _getInsertingAction(optionName) {
      switch (optionName) {
        case GANTT_TASKS:
          return this._getTaskInsertingAction();
        case GANTT_DEPENDENCIES:
          return this._getDependencyInsertingAction();
        case GANTT_RESOURCES:
          return this._getResourceInsertingAction();
        case GANTT_RESOURCE_ASSIGNMENTS:
          return this._getResourceAssigningAction();
      }
      return function () {};
    };
    _proto.raiseInsertingAction = function raiseInsertingAction(optionName, coreArgs) {
      var action = this._getInsertingAction(optionName);
      if (action) {
        var args = {
          cancel: false,
          values: this._convertCoreToMappedData(optionName, coreArgs.values)
        };
        action(args);
        coreArgs.cancel = args.cancel;
        coreArgs.values = this._convertMappedToCoreData(optionName, args.values);
        if (optionName === GANTT_TASKS) {
          this._saveCustomFieldsDataToCache(GANTT_NEW_TASK_CACHE_KEY, args.values);
        }
      }
    };
    _proto.createTaskInsertingAction = function createTaskInsertingAction() {
      this._taskInsertingAction = this._createActionByOption(Actions.onTaskInserting);
    };
    _proto.taskInsertingAction = function taskInsertingAction(args) {
      var action = this._getTaskInsertingAction();
      action(args);
    };
    _proto._getTaskInsertingAction = function _getTaskInsertingAction() {
      if (!this._taskInsertingAction) {
        this.createTaskInsertingAction();
      }
      return this._taskInsertingAction;
    };
    _proto.createDependencyInsertingAction = function createDependencyInsertingAction() {
      this._dependencyInsertingAction = this._createActionByOption(Actions.onDependencyInserting);
    };
    _proto.dependencyInsertingAction = function dependencyInsertingAction(args) {
      var action = this._getDependencyInsertingAction();
      action(args);
    };
    _proto._getDependencyInsertingAction = function _getDependencyInsertingAction() {
      if (!this._dependencyInsertingAction) {
        this.createDependencyInsertingAction();
      }
      return this._dependencyInsertingAction;
    };
    _proto.createResourceInsertingAction = function createResourceInsertingAction() {
      this._resourceInsertingAction = this._createActionByOption(Actions.onResourceInserting);
    };
    _proto.resourceInsertingAction = function resourceInsertingAction(args) {
      var action = this._getResourceInsertingAction();
      action(args);
    };
    _proto._getResourceInsertingAction = function _getResourceInsertingAction() {
      if (!this._resourceInsertingAction) {
        this.createResourceInsertingAction();
      }
      return this._resourceInsertingAction;
    };
    _proto.createResourceAssigningAction = function createResourceAssigningAction() {
      this._resourceAssigningAction = this._createActionByOption(Actions.onResourceAssigning);
    };
    _proto.resourceAssigningAction = function resourceAssigningAction(args) {
      var action = this._getResourceAssigningAction();
      action(args);
    };
    _proto._getResourceAssigningAction = function _getResourceAssigningAction() {
      if (!this._resourceAssigningAction) {
        this.createResourceAssigningAction();
      }
      return this._resourceAssigningAction;
    };
    _proto._getInsertedAction = function _getInsertedAction(optionName) {
      switch (optionName) {
        case GANTT_TASKS:
          return this._getTaskInsertedAction();
        case GANTT_DEPENDENCIES:
          return this._getDependencyInsertedAction();
        case GANTT_RESOURCES:
          return this._getResourceInsertedAction();
        case GANTT_RESOURCE_ASSIGNMENTS:
          return this._getResourceAssignedAction();
      }
      return function () {};
    };
    _proto.raiseInsertedAction = function raiseInsertedAction(optionName, data, key) {
      var action = this._getInsertedAction(optionName);
      if (action) {
        var args = {
          values: data,
          key: key
        };
        action(args);
      }
    };
    _proto.createTaskInsertedAction = function createTaskInsertedAction() {
      this._taskInsertedAction = this._createActionByOption(Actions.onTaskInserted);
    };
    _proto.taskInsertedAction = function taskInsertedAction(args) {
      var action = this._getTaskInsertedAction();
      action(args);
    };
    _proto._getTaskInsertedAction = function _getTaskInsertedAction() {
      if (!this._taskInsertedAction) {
        this.createTaskInsertedAction();
      }
      return this._taskInsertedAction;
    };
    _proto.createDependencyInsertedAction = function createDependencyInsertedAction() {
      this._dependencyInsertedAction = this._createActionByOption(Actions.onDependencyInserted);
    };
    _proto.dependencyInsertedAction = function dependencyInsertedAction(args) {
      var action = this._getDependencyInsertedAction();
      action(args);
    };
    _proto._getDependencyInsertedAction = function _getDependencyInsertedAction() {
      if (!this._dependencyInsertedAction) {
        this.createDependencyInsertedAction();
      }
      return this._dependencyInsertedAction;
    };
    _proto.createResourceInsertedAction = function createResourceInsertedAction() {
      this._resourceInsertedAction = this._createActionByOption(Actions.onResourceInserted);
    };
    _proto.resourceInsertedAction = function resourceInsertedAction(args) {
      var action = this._getResourceInsertedAction();
      action(args);
    };
    _proto._getResourceInsertedAction = function _getResourceInsertedAction() {
      if (!this._resourceInsertedAction) {
        this.createResourceInsertedAction();
      }
      return this._resourceInsertedAction;
    };
    _proto.createResourceAssignedAction = function createResourceAssignedAction() {
      this._resourceAssignedAction = this._createActionByOption(Actions.onResourceAssigned);
    };
    _proto.resourceAssignedAction = function resourceAssignedAction(args) {
      var action = this._getResourceAssignedAction();
      action(args);
    };
    _proto._getResourceAssignedAction = function _getResourceAssignedAction() {
      if (!this._resourceAssignedAction) {
        this.createResourceAssignedAction();
      }
      return this._resourceAssignedAction;
    };
    _proto._getDeletingAction = function _getDeletingAction(optionName) {
      switch (optionName) {
        case GANTT_TASKS:
          return this._getTaskDeletingAction();
        case GANTT_DEPENDENCIES:
          return this._getDependencyDeletingAction();
        case GANTT_RESOURCES:
          return this._getResourceDeletingAction();
        case GANTT_RESOURCE_ASSIGNMENTS:
          return this._getResourceUnassigningAction();
      }
      return function () {};
    };
    _proto.raiseDeletingAction = function raiseDeletingAction(optionName, coreArgs) {
      var action = this._getDeletingAction(optionName);
      if (action) {
        var args = {
          cancel: false,
          key: coreArgs.key,
          values: this._convertCoreToMappedData(optionName, coreArgs.values)
        };
        action(args);
        coreArgs.cancel = args.cancel;
      }
    };
    _proto.createTaskDeletingAction = function createTaskDeletingAction() {
      this._taskDeletingAction = this._createActionByOption(Actions.onTaskDeleting);
    };
    _proto.taskDeletingAction = function taskDeletingAction(args) {
      var action = this._getTaskDeletingAction();
      action(args);
    };
    _proto._getTaskDeletingAction = function _getTaskDeletingAction() {
      if (!this._taskDeletingAction) {
        this.createTaskDeletingAction();
      }
      return this._taskDeletingAction;
    };
    _proto.createDependencyDeletingAction = function createDependencyDeletingAction() {
      this._dependencyDeletingAction = this._createActionByOption(Actions.onDependencyDeleting);
    };
    _proto.dependencyDeletingAction = function dependencyDeletingAction(args) {
      var action = this._getDependencyDeletingAction();
      action(args);
    };
    _proto._getDependencyDeletingAction = function _getDependencyDeletingAction() {
      if (!this._dependencyDeletingAction) {
        this.createDependencyDeletingAction();
      }
      return this._dependencyDeletingAction;
    };
    _proto.createResourceDeletingAction = function createResourceDeletingAction() {
      this._resourceDeletingAction = this._createActionByOption(Actions.onResourceDeleting);
    };
    _proto.resourceDeletingAction = function resourceDeletingAction(args) {
      var action = this._getResourceDeletingAction();
      action(args);
    };
    _proto._getResourceDeletingAction = function _getResourceDeletingAction() {
      if (!this._resourceDeletingAction) {
        this.createResourceDeletingAction();
      }
      return this._resourceDeletingAction;
    };
    _proto.createResourceUnassigningAction = function createResourceUnassigningAction() {
      this._resourceUnassigningAction = this._createActionByOption(Actions.onResourceUnassigning);
    };
    _proto.resourceUnassigningAction = function resourceUnassigningAction(args) {
      var action = this._getResourceUnassigningAction();
      action(args);
    };
    _proto._getResourceUnassigningAction = function _getResourceUnassigningAction() {
      if (!this._resourceUnassigningAction) {
        this.createResourceUnassigningAction();
      }
      return this._resourceUnassigningAction;
    };
    _proto._getDeletedAction = function _getDeletedAction(optionName) {
      switch (optionName) {
        case GANTT_TASKS:
          return this._getTaskDeletedAction();
        case GANTT_DEPENDENCIES:
          return this._getDependencyDeletedAction();
        case GANTT_RESOURCES:
          return this._getResourceDeletedAction();
        case GANTT_RESOURCE_ASSIGNMENTS:
          return this._getResourceUnassignedAction();
      }
      return function () {};
    };
    _proto.raiseDeletedAction = function raiseDeletedAction(optionName, key, data) {
      var action = this._getDeletedAction(optionName);
      if (action) {
        var args = {
          key: key,
          values: data
        };
        action(args);
      }
    };
    _proto.createTaskDeletedAction = function createTaskDeletedAction() {
      this._taskDeletedAction = this._createActionByOption(Actions.onTaskDeleted);
    };
    _proto.taskDeletedAction = function taskDeletedAction(args) {
      var action = this._getTaskDeletedAction();
      action(args);
    };
    _proto._getTaskDeletedAction = function _getTaskDeletedAction() {
      if (!this._taskDeletedAction) {
        this.createTaskDeletedAction();
      }
      return this._taskDeletedAction;
    };
    _proto.createDependencyDeletedAction = function createDependencyDeletedAction() {
      this._dependencyDeletedAction = this._createActionByOption(Actions.onDependencyDeleted);
    };
    _proto.dependencyDeletedAction = function dependencyDeletedAction(args) {
      var action = this._getDependencyDeletedAction();
      action(args);
    };
    _proto._getDependencyDeletedAction = function _getDependencyDeletedAction() {
      if (!this._dependencyDeletedAction) {
        this.createDependencyDeletedAction();
      }
      return this._dependencyDeletedAction;
    };
    _proto.createResourceDeletedAction = function createResourceDeletedAction() {
      this._resourceDeletedAction = this._createActionByOption(Actions.onResourceDeleted);
    };
    _proto.resourceDeletedAction = function resourceDeletedAction(args) {
      var action = this._getResourceDeletedAction();
      action(args);
    };
    _proto._getResourceDeletedAction = function _getResourceDeletedAction() {
      if (!this._resourceDeletedAction) {
        this.createResourceDeletedAction();
      }
      return this._resourceDeletedAction;
    };
    _proto.createResourceUnassignedAction = function createResourceUnassignedAction() {
      this._resourceUnassignedAction = this._createActionByOption(Actions.onResourceUnassigned);
    };
    _proto.resourceUnassignedAction = function resourceUnassignedAction(args) {
      var action = this._getResourceUnassignedAction();
      action(args);
    };
    _proto._getResourceUnassignedAction = function _getResourceUnassignedAction() {
      if (!this._resourceUnassignedAction) {
        this.createResourceUnassignedAction();
      }
      return this._resourceUnassignedAction;
    };
    _proto._getUpdatingAction = function _getUpdatingAction(optionName) {
      switch (optionName) {
        case GANTT_TASKS:
          return this._getTaskUpdatingAction();
      }
      return function () {};
    };
    _proto.raiseUpdatingAction = function raiseUpdatingAction(optionName, coreArgs, action) {
      action = action || this._getUpdatingAction(optionName);
      if (action) {
        var isTaskUpdating = optionName === GANTT_TASKS;
        var args = {
          cancel: false,
          key: coreArgs.key,
          newValues: this._convertCoreToMappedData(optionName, coreArgs.newValues),
          values: isTaskUpdating ? this._getTaskData(coreArgs.key) : this._convertCoreToMappedData(optionName, coreArgs.values)
        };
        if (isTaskUpdating && this._customFieldsManager.cache.hasData(args.key)) {
          this._customFieldsManager.addCustomFieldsDataFromCache(args.key, args.newValues);
        }
        action(args);
        coreArgs.cancel = args.cancel;
        coreArgs.newValues = this._convertMappedToCoreData(optionName, args.newValues);
        if (isTaskUpdating) {
          if (args.cancel) {
            this._customFieldsManager.resetCustomFieldsDataCache(args.key);
          } else {
            var forceUpdateOnKeyExpire = !Object.keys(coreArgs.newValues).length;
            this._saveCustomFieldsDataToCache(args.key, args.newValues, forceUpdateOnKeyExpire);
          }
        }
      }
    };
    _proto.createTaskUpdatingAction = function createTaskUpdatingAction() {
      this._taskUpdatingAction = this._createActionByOption(Actions.onTaskUpdating);
    };
    _proto.taskUpdatingAction = function taskUpdatingAction(args) {
      var action = this._getTaskUpdatingAction();
      action(args);
    };
    _proto._getTaskUpdatingAction = function _getTaskUpdatingAction() {
      if (!this._taskUpdatingAction) {
        this.createTaskUpdatingAction();
      }
      return this._taskUpdatingAction;
    };
    _proto._getUpdatedAction = function _getUpdatedAction(optionName) {
      switch (optionName) {
        case GANTT_TASKS:
          return this._getTaskUpdatedAction();
      }
      return function () {};
    };
    _proto.raiseUpdatedAction = function raiseUpdatedAction(optionName, data, key) {
      var action = this._getUpdatedAction(optionName);
      if (action) {
        var args = {
          values: data,
          key: key
        };
        action(args);
      }
    };
    _proto.createTaskUpdatedAction = function createTaskUpdatedAction() {
      this._taskUpdatedAction = this._createActionByOption(Actions.onTaskUpdated);
    };
    _proto.taskUpdatedAction = function taskUpdatedAction(args) {
      var action = this._getTaskUpdatedAction();
      action(args);
    };
    _proto._getTaskUpdatedAction = function _getTaskUpdatedAction() {
      if (!this._taskUpdatedAction) {
        this.createTaskUpdatedAction();
      }
      return this._taskUpdatedAction;
    };
    _proto.createTaskEditDialogShowingAction = function createTaskEditDialogShowingAction() {
      this._taskEditDialogShowingAction = this._createActionByOption(Actions.onTaskEditDialogShowing);
    };
    _proto.taskEditDialogShowingAction = function taskEditDialogShowingAction(args) {
      var action = this._getTaskEditDialogShowingAction();
      action(args);
    };
    _proto._getTaskEditDialogShowingAction = function _getTaskEditDialogShowingAction() {
      if (!this._taskEditDialogShowingAction) {
        this.createTaskEditDialogShowingAction();
      }
      return this._taskEditDialogShowingAction;
    };
    _proto.raiseTaskEditDialogShowingAction = function raiseTaskEditDialogShowingAction(coreArgs) {
      var action = this._getTaskEditDialogShowingAction();
      if (action) {
        var args = {
          cancel: false,
          key: coreArgs.key,
          values: this._convertCoreToMappedData(GANTT_TASKS, coreArgs.values),
          readOnlyFields: this._convertCoreToMappedFields(GANTT_TASKS, coreArgs.readOnlyFields),
          hiddenFields: this._convertCoreToMappedFields(GANTT_TASKS, coreArgs.hiddenFields)
        };
        action(args);
        coreArgs.cancel = args.cancel;
        coreArgs.values = this._convertMappedToCoreData(GANTT_TASKS, args.values);
        coreArgs.readOnlyFields = this._convertMappedToCoreFields(GANTT_TASKS, args.readOnlyFields);
        coreArgs.hiddenFields = this._convertMappedToCoreFields(GANTT_TASKS, args.hiddenFields);
      }
    };
    _proto.createResourceManagerDialogShowingAction = function createResourceManagerDialogShowingAction() {
      this._resourceManagerDialogShowingAction = this._createActionByOption(Actions.onResourceManagerDialogShowing);
    };
    _proto.resourceManagerDialogShowingAction = function resourceManagerDialogShowingAction(args) {
      var action = this._getResourceManagerDialogShowingAction();
      action(args);
    };
    _proto._getResourceManagerDialogShowingAction = function _getResourceManagerDialogShowingAction() {
      if (!this._resourceManagerDialogShowingAction) {
        this.createResourceManagerDialogShowingAction();
      }
      return this._resourceManagerDialogShowingAction;
    };
    _proto.raiseResourceManagerDialogShowingAction = function raiseResourceManagerDialogShowingAction(coreArgs) {
      var _this = this;
      var action = this._getResourceManagerDialogShowingAction();
      if (action) {
        var mappedResources = coreArgs.values.resources.items.map(function (r) {
          return _this._convertMappedToCoreData(GANTT_RESOURCES, r);
        });
        var args = {
          cancel: false,
          values: mappedResources
        };
        action(args);
        coreArgs.cancel = args.cancel;
      }
    };
    _proto.createTaskMovingAction = function createTaskMovingAction() {
      this._taskMovingAction = this._createActionByOption(Actions.onTaskMoving);
    };
    _proto.taskMovingAction = function taskMovingAction(args) {
      var action = this.getTaskMovingAction();
      action(args);
    };
    _proto.getTaskMovingAction = function getTaskMovingAction() {
      if (!this._taskMovingAction) {
        this.createTaskMovingAction();
      }
      return this._taskMovingAction;
    };
    _proto.getScaleCellPreparedAction = function getScaleCellPreparedAction() {
      if (!this._scaleCellPreparedAction) {
        this.createScaleCellPreparedAction();
      }
      return this._scaleCellPreparedAction;
    };
    _proto.createScaleCellPreparedAction = function createScaleCellPreparedAction() {
      this._scaleCellPreparedAction = this._createActionByOption(Actions.onScaleCellPrepared);
    };
    _proto.raiseScaleCellPreparedAction = function raiseScaleCellPreparedAction(data) {
      var action = this.getScaleCellPreparedAction();
      if (action) {
        var args = {
          scaleIndex: data.scaleIndex,
          scaleType: this._getScaleType(data.scaleType),
          scaleElement: (0, _element.getPublicElement)((0, _renderer.default)(data.scaleElement)),
          separatorElement: (0, _element.getPublicElement)((0, _renderer.default)(data.separatorElement)),
          startDate: new Date(data.start),
          endDate: new Date(data.end)
        };
        action(args);
      }
    };
    _proto._getScaleType = function _getScaleType(viewType) {
      switch (viewType) {
        case 0:
          return 'minutes';
        case 1:
          return 'hours';
        case 2:
          return 'sixHours';
        case 3:
          return 'days';
        case 4:
          return 'weeks';
        case 5:
          return 'months';
        case 6:
          return 'quarters';
        case 7:
          return 'years';
        case 8:
          return 'fiveYears';
        default:
          return undefined;
      }
    };
    return GanttActionsManager;
  }();
  exports.GanttActionsManager = GanttActionsManager;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/element"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/element"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.gantt.actions.js.map