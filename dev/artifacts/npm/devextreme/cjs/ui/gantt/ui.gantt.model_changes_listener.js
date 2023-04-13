/**
* DevExtreme (cjs/ui/gantt/ui.gantt.model_changes_listener.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

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
