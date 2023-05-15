!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/editApi.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/editApi.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      Consts,
      options,
      data,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
      options = $__m.options;
      data = $__m.data;
    }],
    execute: function() {
      var $__3;
      (($__3 = QUnit, test = $__3.test, $__3));
      moduleConfig = {
        beforeEach: function() {
          var $__2 = this;
          this.createInstance = function(settings) {
            $__2.instance = $__2.$element.dxGantt(settings).dxGantt('instance');
          };
          this.$element = $('#gantt');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      QUnit.module('Edit api', moduleConfig, function() {
        test('task insert', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var taskData = {
            title: 'My text',
            start: new Date('2019-02-23'),
            end: new Date('2019-02-23'),
            parentId: 2
          };
          var tasksCount = data.tasks.length;
          this.instance.insertTask(taskData);
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount + 1, 'new task was created in ds');
          var createdTask = data.tasks[data.tasks.length - 1];
          assert.equal(createdTask.title, taskData.title, 'new task title is right');
          assert.equal(createdTask.start, taskData.start, 'new task start is right');
          assert.equal(createdTask.end, taskData.end, 'new task end is right');
          assert.equal(createdTask.parentId, taskData.parentId, 'new task parentId is right');
        });
        test('task insert to root', function(assert) {
          var myTasks = [{
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
          }];
          var options = {
            tasks: {dataSource: myTasks},
            editing: {enabled: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var data = {
            title: 'My text',
            start: new Date('2019-02-23'),
            end: new Date('2019-02-23'),
            parentId: 0
          };
          var tasksCount = myTasks.length;
          this.instance.insertTask(data);
          this.clock.tick(10);
          assert.equal(myTasks.length, tasksCount + 1, 'new task was created in ds');
          var createdTask = myTasks[myTasks.length - 1];
          assert.equal(createdTask.parentId, data.parentId, 'new task parentId is right');
        });
        test('task delete', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var tasksCount = data.tasks.length;
          var taskToDelete = data.tasks[tasksCount - 1];
          this.instance.deleteTask(taskToDelete.id);
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount - 1, 'new task was deleted');
          var removedTask = data.tasks.filter(function(t) {
            return t.id === taskToDelete.id;
          })[0];
          assert.equal(removedTask, undefined, 'task was removed');
        });
        test('taskUpdate', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var taskToUpdate = data.tasks[0];
          var taskData = {
            title: 'New',
            start: new Date('2019-02-25'),
            end: new Date('2019-02-26'),
            progress: 73
          };
          this.instance.updateTask(taskToUpdate.id, taskData);
          this.clock.tick(10);
          assert.equal(taskToUpdate.title, taskData.title, 'task title is updated');
          assert.equal(taskToUpdate.start, taskData.start, 'new task start is updated');
          assert.equal(taskToUpdate.end, taskData.end, 'new task end is updated');
          assert.equal(taskToUpdate.progress, taskData.progress, 'new task progress is updated');
        });
        test('taskUpdate with custom and core fields', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          var task = {
            Id: 1,
            ParentId: 0,
            ItemName: 'custom text',
            CustomText: 'test',
            SprintStartDate: new Date('2019-02-11T05:00:00.000Z'),
            SprintEndDate: new Date('2019-02-14T05:00:00.000Z'),
            TaskColor: 'red',
            TaskProgress: 31
          };
          var tasksMap = {
            dataSource: [task],
            keyExpr: 'Id',
            parentIdExpr: 'ParentId',
            titleExpr: 'ItemName',
            startExpr: 'SprintStartDate',
            colorExpr: 'TaskColor',
            endExpr: 'SprintEndDate',
            progressExpr: 'TaskProgress'
          };
          this.instance.option('tasks', tasksMap);
          this.instance.option('columns', [{
            dataField: 'CustomText',
            caption: 'Task'
          }]);
          this.clock.tick(10);
          var data = {
            ItemName: 'New',
            CustomText: 'new text'
          };
          this.instance.updateTask(task.Id, data);
          this.clock.tick(10);
          assert.equal(task.ItemName, data.ItemName, 'task title is updated');
          assert.equal(task.CustomText, data.CustomText, 'task cust field  is updated');
        });
        test('update task color and title in auto parent mode (T976669, T978287)', function(assert) {
          var tasks = [{
            Id: 1,
            ParentId: 0,
            ItemName: 'custom text 1',
            SprintStartDate: new Date('2019-02-11T05:00:00.000Z'),
            SprintEndDate: new Date('2019-02-14T05:00:00.000Z'),
            TaskColor: 'red',
            TaskProgress: 31
          }, {
            Id: 2,
            ParentId: 1,
            ItemName: 'custom text 2',
            SprintStartDate: new Date('2019-02-11T05:00:00.000Z'),
            SprintEndDate: new Date('2019-02-14T05:00:00.000Z'),
            TaskColor: 'red',
            TaskProgress: 31
          }];
          var tasksMap = {
            dataSource: tasks,
            keyExpr: 'Id',
            parentIdExpr: 'ParentId',
            titleExpr: 'ItemName',
            startExpr: 'SprintStartDate',
            colorExpr: 'TaskColor',
            endExpr: 'SprintEndDate',
            progressExpr: 'TaskProgress'
          };
          var options = {
            tasks: tasksMap,
            editing: {enabled: true},
            validation: {autoUpdateParentTasks: true},
            columns: [{
              dataField: 'ItemName',
              caption: 'Task'
            }]
          };
          this.createInstance(options);
          this.clock.tick(10);
          var data = {
            ItemName: 'New',
            TaskColor: 'yellow'
          };
          this.instance.updateTask(1, data);
          this.clock.tick(10);
          var firstTreeListTitleText = $(this.instance._treeList.getCellElement(0, 0)).text();
          assert.equal(firstTreeListTitleText, data.ItemName, 'title text was modified');
          assert.equal(tasks[0].ItemName, data.ItemName, 'task title is updated');
          assert.equal(tasks[0].TaskColor, data.TaskColor, 'task color  is updated');
        });
        test('taskUpdate with only custom field', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          var values;
          var task = {
            Id: 1,
            ParentId: 0,
            ItemName: 'custom text',
            CustomText: 'test',
            SprintStartDate: new Date('2019-02-11T05:00:00.000Z'),
            SprintEndDate: new Date('2019-02-14T05:00:00.000Z'),
            TaskColor: 'red',
            TaskProgress: 31
          };
          var tasksMap = {
            dataSource: [task],
            keyExpr: 'Id',
            parentIdExpr: 'ParentId',
            titleExpr: 'ItemName',
            startExpr: 'SprintStartDate',
            colorExpr: 'TaskColor',
            endExpr: 'SprintEndDate',
            progressExpr: 'TaskProgress'
          };
          this.instance.option('tasks', tasksMap);
          this.instance.option('onTaskUpdated', function(e) {
            values = e.values;
          });
          this.instance.option('columns', [{
            dataField: 'CustomText',
            caption: 'Task'
          }]);
          this.clock.tick(10);
          var data = {CustomText: 'new text'};
          this.instance.updateTask(task.Id, data);
          this.clock.tick(300);
          assert.equal(task.CustomText, data.CustomText, 'task cust field  is updated');
          assert.equal(task.CustomText, values.CustomText, 'onTaskUpdated is triggrered');
        });
        test('insertDependency', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var count = data.dependencies.length;
          var dependencyData = {
            'predecessorId': 2,
            'successorId': 4,
            'type': 0
          };
          this.instance.insertDependency(dependencyData);
          this.clock.tick(10);
          assert.equal(data.dependencies.length, count + 1, 'new dependency was not created');
          var createdDependency = data.dependencies[data.dependencies.length - 1];
          assert.equal(createdDependency.predecessorId, dependencyData.predecessorId, 'new predecessorId is right');
          assert.equal(createdDependency.successorId, dependencyData.successorId, 'new successorId is right');
          assert.equal(createdDependency.type, dependencyData.type, 'new type is right');
        });
        test('insertDependency with validation (T1034713)', function(assert) {
          this.createInstance(options.allSourcesOptions);
          var dependencies = [];
          this.instance.option('dependencies', {dataSource: dependencies});
          this.instance.option('editing.enabled', true);
          this.instance.option('validation.validateDependencies', true);
          this.instance.option('validation.autoUpdateParentTasks', true);
          this.clock.tick(10);
          var count = dependencies.length;
          var dependencyData = {
            'predecessorId': 2,
            'successorId': 4,
            'type': 0
          };
          this.instance.insertDependency(dependencyData);
          this.clock.tick(10);
          assert.equal(dependencies.length, count, 'new dependency was not created');
          dependencyData = {
            'predecessorId': 6,
            'successorId': 7,
            'type': 0
          };
          this.instance.insertDependency(dependencyData);
          this.clock.tick(10);
          assert.equal(dependencies.length, count + 1, 'new dependency was created');
          var createdDependency = dependencies[dependencies.length - 1];
          assert.equal(createdDependency.predecessorId, dependencyData.predecessorId, 'new predecessorId is right');
          assert.equal(createdDependency.successorId, dependencyData.successorId, 'new successorId is right');
          assert.equal(createdDependency.type, dependencyData.type, 'new type is right');
        });
        test('deleteDependency', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var count = data.dependencies.length;
          var dependencyToDelete = data.dependencies[count - 1];
          this.instance.deleteDependency(dependencyToDelete.id);
          this.clock.tick(10);
          var $confirmDialog = $('body').find(Consts.POPUP_SELECTOR);
          var $yesButton = $confirmDialog.find('.dx-popup-bottom').find('.dx-button').eq(0);
          $yesButton.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(data.dependencies.length, count - 1, 'new dependency was deleted');
          var removedDependency = data.dependencies.filter(function(t) {
            return t.id === dependencyToDelete.id;
          })[0];
          assert.equal(removedDependency, undefined, 'dependency was removed');
        });
        test('insertResource + onResourceInserted', function(assert) {
          var values;
          var keyExists = false;
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('onResourceInserted', function(e) {
            values = e.values;
            keyExists = !!e.key;
          });
          this.clock.tick(10);
          var resourcesCount = data.resources.length;
          var assignmentsCount = data.resourceAssignments.length;
          var resourceData = {text: 'My text'};
          this.instance.insertResource(resourceData, [2]);
          this.clock.tick(10);
          assert.equal(data.resources.length, resourcesCount + 1, 'new resource was created');
          assert.equal(data.resourceAssignments.length, assignmentsCount + 1, 'new assignment was created');
          var newResource = data.resources[data.resources.length - 1];
          assert.equal(newResource.text, 'My text', 'new resource text is right');
          var newAssignment = data.resourceAssignments[data.resourceAssignments.length - 1];
          assert.equal(newAssignment.resourceId, newResource.id, 'new assignment resource id is right');
          assert.equal(newAssignment.taskId, 2, 'new assignment task id is right');
          assert.ok(keyExists, 'key created');
          assert.equal(values.text, resourceData.text, 'new task title is right');
        });
        test('insertResource (T959410)', function(assert) {
          var assignedValues;
          var assigningValues;
          var resKey;
          var assignmentKey;
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('onResourceAssigning', function(e) {
            assigningValues = e.values;
          });
          this.instance.option('onResourceInserted', function(e) {
            resKey = e.key;
          });
          this.instance.option('onResourceAssigned', function(e) {
            assignedValues = e.values;
            assignmentKey = !!e.key;
          });
          this.clock.tick(10);
          var data = {text: 'My text'};
          this.instance.insertResource(data, [2]);
          this.clock.tick(10);
          assert.ok(assignmentKey, 'key created');
          assert.equal(assigningValues.taskId, 2, 'assigning task key');
          assert.equal(assigningValues.resourceId, resKey, 'assigning resource key');
          assert.equal(assignedValues.taskId, 2, 'assigned task key');
          assert.equal(assignedValues.resourceId, resKey, 'assigned resource key');
        });
        test('insertResource + assignResourceToTask (T959410)', function(assert) {
          var assignedValues;
          var assigningValues;
          var resKey;
          var assignmentKey;
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('onResourceAssigning', function(e) {
            assigningValues = e.values;
          });
          this.instance.option('onResourceInserted', function(e) {
            resKey = e.key;
          });
          this.instance.option('onResourceAssigned', function(e) {
            assignedValues = e.values;
            assignmentKey = !!e.key;
          });
          this.clock.tick(10);
          var data = {text: 'My text'};
          this.instance.insertResource(data);
          this.clock.tick(200);
          this.instance.assignResourceToTask(resKey, 2);
          this.clock.tick(200);
          assert.ok(assignmentKey, 'key created');
          assert.equal(assigningValues.taskId, 2, 'assigning task key');
          assert.equal(assigningValues.resourceId, resKey, 'assigning resource key');
          assert.equal(assignedValues.taskId, 2, 'assigned task key');
          assert.equal(assignedValues.resourceId, resKey, 'assigned resource key');
        });
        test('deleteResource + onResourceDeleted', function(assert) {
          var key;
          var values;
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('onResourceDeleted', function(e) {
            key = e.key;
            values = e.values;
          });
          this.clock.tick(10);
          var count = data.resources.length;
          var resourceToDelete = data.resources[count - 1];
          this.instance.deleteResource(resourceToDelete.id);
          this.clock.tick(10);
          assert.equal(data.resources.length, count - 1, 'resources was deleted');
          var removedResource = data.resources.filter(function(t) {
            return t.id === resourceToDelete.id;
          })[0];
          assert.equal(removedResource, undefined, 'dependency was removed');
          assert.equal(key, resourceToDelete.id, 'check key');
          assert.equal(values.text, resourceToDelete.text, 'check key');
        });
        test('assignResourceToTask', function(assert) {
          var values;
          var keyExists = false;
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('onResourceAssigned', function(e) {
            values = e.values;
            keyExists = !!e.key;
          });
          this.clock.tick(10);
          var count = data.resourceAssignments.length;
          var taskToAssign = data.tasks[data.tasks.length - 1];
          var resourceToAssign = data.resources[data.resources.length - 1];
          this.instance.assignResourceToTask(resourceToAssign.id, taskToAssign.id);
          this.clock.tick(10);
          assert.equal(data.resourceAssignments.length, count + 1, 'resource was assigned');
          var newAssignment = data.resourceAssignments[data.resourceAssignments.length - 1];
          assert.equal(newAssignment.resourceId, resourceToAssign.id, 'new assignment resource id is right');
          assert.equal(newAssignment.taskId, taskToAssign.id, 'new assignment task id is right');
          assert.ok(keyExists, 'key created');
          assert.equal(values.resourceId, resourceToAssign.id, 'new resource id in event');
          assert.equal(values.taskId, taskToAssign.id, 'new task id in event');
        });
        test('unassignResourceFromTask', function(assert) {
          var values;
          var key;
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('onResourceUnassigned', function(e) {
            values = e.values;
            key = e.key;
          });
          this.clock.tick(10);
          var count = data.resourceAssignments.length;
          var toDelete = data.resourceAssignments[count - 1];
          this.instance.unassignResourceFromTask(toDelete.resourceId, toDelete.taskId);
          this.clock.tick(10);
          assert.equal(data.resourceAssignments.length, count - 1, 'resource was not deassigned');
          var removedAssignment = data.resourceAssignments.filter(function(t) {
            return t.id === toDelete.id;
          })[0];
          assert.equal(removedAssignment, undefined, 'assigmnent was removed');
          assert.equal(key, toDelete.id, 'check key');
          assert.equal(values.resourceId, toDelete.resourceId, 'resource id in event');
          assert.equal(values.taskId, toDelete.taskId, 'task id in event');
        });
        test('unassignAllResourcesFromTask', function(assert) {
          var values;
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('onResourceUnassigned', function(e) {
            values = e.values;
          });
          this.clock.tick(10);
          var count = data.resourceAssignments.length;
          var toDelete = data.resourceAssignments[count - 1];
          this.instance.unassignAllResourcesFromTask(toDelete.taskId);
          this.clock.tick(10);
          assert.equal(data.resourceAssignments.length, count - 2, 'resources were deassigned');
          var removedAssignments = data.resourceAssignments.filter(function(t) {
            return t.taskId === toDelete.taskId;
          });
          assert.equal(removedAssignments.length, 0, 'assigmnents were removed');
          assert.equal(values.taskId, toDelete.taskId, 'task id in event');
        });
        test('getTaskData', function(assert) {
          this.createInstance(options.allSourcesOptions);
          var task = {
            Id: 1,
            ParentId: 0,
            ItemName: 'custom text',
            SprintStartDate: new Date('2019-02-11T05:00:00.000Z'),
            SprintEndDate: new Date('2019-02-14T05:00:00.000Z'),
            TaskColor: 'red',
            TaskProgress: 31
          };
          var tasksMap = {
            dataSource: [task],
            keyExpr: 'Id',
            parentIdExpr: 'ParentId',
            titleExpr: 'ItemName',
            startExpr: 'SprintStartDate',
            colorExpr: 'TaskColor',
            endExpr: 'SprintEndDate',
            progressExpr: 'TaskProgress'
          };
          this.instance.option('tasks', tasksMap);
          this.clock.tick(10);
          var taskData = this.instance.getTaskData(1);
          assert.equal(taskData['ItemName'], task['ItemName'], 'title');
          assert.equal(taskData['SprintStartDate'], task['SprintStartDate'], 'start');
          assert.equal(taskData['SprintEndDate'], task['SprintEndDate'], 'end');
          assert.equal(taskData['TaskProgress'], task['TaskProgress'], 'progress');
        });
        test('getDependencyData', function(assert) {
          var dependency = {
            Id: 1,
            PredecessorTask: 1,
            SuccessorTask: 4,
            DependencyType: 0
          };
          var dependencyMap = {
            dataSource: [dependency],
            keyExpr: 'Id',
            predecessorIdExpr: 'PredecessorTask',
            successorIdExpr: 'SuccessorTask',
            typeExpr: 'DependencyType'
          };
          this.createInstance(options.tasksOnlyOptions);
          this.instance.option('dependencies', dependencyMap);
          this.clock.tick(10);
          var dependencyData = this.instance.getDependencyData(1);
          this.clock.tick(10);
          assert.equal(dependencyData['PredecessorTask'], dependency['PredecessorTask'], 'PredecessorTask');
          assert.equal(dependencyData['SuccessorTask'], dependency['SuccessorTask'], 'SuccessorTask');
          assert.equal(dependencyData['DependencyType'], dependency['DependencyType'], 'DependencyType');
        });
        test('getResourceData', function(assert) {
          this.createInstance(options.allSourcesOptions);
          var resource = {
            Id: 1,
            ResourceText: 'My text',
            ResourceColor: 'black'
          };
          var resourceMap = {
            dataSource: [resource],
            keyExpr: 'Id',
            textExpr: 'ResourceText',
            colorExpr: 'ResourceColor'
          };
          this.instance.option('resources', resourceMap);
          this.clock.tick(10);
          var resourceData = this.instance.getResourceData(1);
          assert.equal(resourceData['ResourceText'], resource['ResourceText'], 'ResourceText');
          assert.equal(resourceData['ResourceColor'], resource['ResourceColor'], 'ResourceColor');
        });
        test('getResourceAssignmentData', function(assert) {
          this.createInstance(options.allSourcesOptions);
          var assignment = {
            Id: 1,
            TaskKey: 1,
            ResourceKey: 2
          };
          var assignmentMap = {
            dataSource: [assignment],
            keyExpr: 'Id',
            taskIdExpr: 'TaskKey',
            resourceIdExpr: 'ResourceKey'
          };
          this.instance.option('resourceAssignments', assignmentMap);
          this.clock.tick(10);
          var assignmentData = this.instance.getResourceAssignmentData(1);
          assert.equal(assignmentData['TaskKey'], assignment['TaskKey'], 'TaskKey');
          assert.equal(assignmentData['ResourceKey'], assignment['ResourceKey'], 'ResourceKey');
        });
        test('getTaskResources', function(assert) {
          this.createInstance(options.allSourcesOptions);
          var resources = [{
            Id: 1,
            ResourceText: 'My text',
            ResourceColor: 'black'
          }, {
            Id: 2,
            ResourceText: 'My text2',
            ResourceColor: 'black'
          }];
          var resourceMap = {
            dataSource: resources,
            keyExpr: 'Id',
            textExpr: 'ResourceText',
            colorExpr: 'ResourceColor'
          };
          var assignments = [{
            Id: 1,
            TaskKey: 1,
            ResourceKey: 1
          }, {
            Id: 2,
            TaskKey: 1,
            ResourceKey: 2
          }];
          var assignmentMap = {
            dataSource: assignments,
            keyExpr: 'Id',
            taskIdExpr: 'TaskKey',
            resourceIdExpr: 'ResourceKey'
          };
          this.instance.option('resources', resourceMap);
          this.instance.option('resourceAssignments', assignmentMap);
          this.clock.tick(10);
          var taskResources = this.instance.getTaskResources(1);
          assert.equal(taskResources.length, 2, 'length');
          assert.equal(taskResources[0]['ResourceText'], resources[0]['ResourceText'], 'ResourceText 1');
          assert.equal(taskResources[1]['ResourceText'], resources[1]['ResourceText'], 'ResourceText 2');
        });
        test('getVisibleKeys', function(assert) {
          var my_tasks = [{
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
          }];
          var my_dependencies = [{
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
          }];
          var my_resources = [{
            'id': 1,
            'text': 'Management'
          }, {
            'id': 2,
            'text': 'Project Manager'
          }, {
            'id': 3,
            'text': 'Deployment Team'
          }];
          var my_resourceAssignments = [{
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
          }];
          var my_allSourcesOptions = {
            tasks: {dataSource: my_tasks},
            dependencies: {dataSource: my_dependencies},
            resources: {dataSource: my_resources},
            resourceAssignments: {dataSource: my_resourceAssignments}
          };
          this.createInstance(my_allSourcesOptions);
          this.clock.tick(10);
          assert.equal(this.instance.getVisibleTaskKeys().length, my_tasks.length, 'task keys');
          assert.equal(this.instance.getVisibleDependencyKeys().length, my_dependencies.length, 'dependencies keys');
          assert.equal(this.instance.getVisibleResourceKeys().length, my_resources.length, 'resources keys');
          assert.equal(this.instance.getVisibleResourceAssignmentKeys().length, my_resourceAssignments.length, 'resource assignments keys');
          this.instance.option('tasks', {dataSource: []});
          this.instance.option('dependencies', {dataSource: []});
          this.instance.option('resources', {dataSource: []});
          this.instance.option('resourceAssignments', {dataSource: []});
          this.clock.tick(10);
          assert.equal(this.instance.getVisibleTaskKeys().length, 0, 'task keys');
          assert.equal(this.instance.getVisibleDependencyKeys().length, 0, 'dependencies keys');
          assert.equal(this.instance.getVisibleResourceKeys().length, 0, 'resources keys');
          assert.equal(this.instance.getVisibleResourceAssignmentKeys().length, 0, 'resource assignments keys');
        });
        test('double task insert - check infinite loop on selection (T980191)', function(assert) {
          var myTasks = [{
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
          }];
          var options = {
            tasks: {dataSource: myTasks},
            editing: {enabled: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var data = {
            title: 'My text',
            start: new Date('2019-02-23'),
            end: new Date('2019-02-23'),
            parentId: 2
          };
          var tasksCount = myTasks.length;
          this.instance.insertTask(data);
          this.instance.insertTask(data);
          this.clock.tick(10);
          assert.equal(myTasks.length, tasksCount + 2, 'new task was created in ds');
        });
        test('taskUpdate with only custom field and update custom field in onTaskUpdating should trigger onTaskUpdated', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          var values = {};
          var task = {
            Id: 1,
            ParentId: 0,
            ItemName: 'custom text',
            CustomText: 'test',
            SprintStartDate: new Date('2019-02-11T05:00:00.000Z'),
            SprintEndDate: new Date('2019-02-14T05:00:00.000Z'),
            TaskColor: 'red',
            TaskProgress: 31
          };
          var tasksMap = {
            dataSource: [task],
            keyExpr: 'Id',
            parentIdExpr: 'ParentId',
            titleExpr: 'ItemName',
            startExpr: 'SprintStartDate',
            colorExpr: 'TaskColor',
            endExpr: 'SprintEndDate',
            progressExpr: 'TaskProgress'
          };
          this.instance.option('tasks', tasksMap);
          this.instance.option('onTaskUpdated', function(e) {
            values = e.values;
          });
          this.instance.option('columns', [{
            dataField: 'CustomText',
            caption: 'Task'
          }]);
          this.clock.tick(10);
          var onTaskUpdatingText = 'new custom text';
          this.instance.option('onTaskUpdating', function(e) {
            e.newValues['CustomText'] = onTaskUpdatingText;
          });
          this.clock.tick(10);
          var data = {CustomText: 'new text'};
          this.instance.updateTask(task.Id, data);
          this.clock.tick(300);
          var taskData = this.instance.getTaskData(1);
          assert.equal(taskData.CustomText, onTaskUpdatingText, 'task cust field  is updated');
          assert.equal(values.CustomText, onTaskUpdatingText, 'onTaskUpdated is triggrered');
        });
        test('updateTask with empty or standard data should not raise Updating event (T1034933)', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          var task = {
            Id: 1,
            ParentId: 0,
            ItemName: 'custom text',
            CustomText: 'test',
            SprintStartDate: new Date('2019-02-11T05:00:00.000Z'),
            SprintEndDate: new Date('2019-02-14T05:00:00.000Z'),
            TaskColor: 'red',
            TaskProgress: 31
          };
          var tasksMap = {
            dataSource: [task],
            keyExpr: 'Id',
            parentIdExpr: 'ParentId',
            titleExpr: 'ItemName',
            startExpr: 'SprintStartDate',
            colorExpr: 'TaskColor',
            endExpr: 'SprintEndDate',
            progressExpr: 'TaskProgress'
          };
          this.instance.option('tasks', tasksMap);
          this.clock.tick(10);
          var receivedValues;
          this.instance.option('onTaskUpdating', function(e) {
            receivedValues = e.newValues;
          });
          this.clock.tick(10);
          this.instance.updateTask(task.Id);
          this.clock.tick(300);
          assert.notOk(receivedValues);
          this.instance.updateTask(task.Id, {});
          this.clock.tick(300);
          assert.notOk(receivedValues);
          this.instance.updateTask(task.Id, {TaskProgress: task.TaskProgress});
          this.clock.tick(300);
          assert.notOk(receivedValues);
          this.instance.updateTask(task.Id, {ItemName: task.ItemName});
          this.clock.tick(300);
          assert.notOk(receivedValues);
          this.instance.updateTask(task.Id, {SprintStartDate: task.SprintStartDate});
          this.clock.tick(300);
          assert.notOk(receivedValues);
          this.instance.updateTask(task.Id, {
            TaskProgress: task.TaskProgress,
            ItemName: 'myText'
          });
          this.clock.tick(300);
          assert.ok(receivedValues);
          assert.notOk(receivedValues['SprintStartDate']);
          assert.notOk(receivedValues['SprintEndDate']);
          assert.notOk(receivedValues['TaskColor']);
          assert.notOk(receivedValues['TaskProgress']);
          assert.equal(receivedValues['ItemName'], 'myText');
        });
        test('updateTask with custom data - check Updating cancel', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          var updatingEventTriggered = false;
          var updatedEventTriggered = false;
          var task = {
            Id: 1,
            ParentId: 0,
            ItemName: 'custom text',
            CustomText: 'test',
            SprintStartDate: new Date('2019-02-11T05:00:00.000Z'),
            SprintEndDate: new Date('2019-02-14T05:00:00.000Z'),
            TaskColor: 'red',
            TaskProgress: 31
          };
          var tasksMap = {
            dataSource: [task],
            keyExpr: 'Id',
            parentIdExpr: 'ParentId',
            titleExpr: 'ItemName',
            startExpr: 'SprintStartDate',
            colorExpr: 'TaskColor',
            endExpr: 'SprintEndDate',
            progressExpr: 'TaskProgress'
          };
          this.instance.option('tasks', tasksMap);
          this.instance.option('onTaskUpdated', function(e) {
            updatedEventTriggered = true;
          });
          this.instance.option('columns', [{
            dataField: 'CustomText',
            caption: 'Task'
          }]);
          this.clock.tick(10);
          this.instance.option('onTaskUpdating', function(e) {
            updatingEventTriggered = true;
            e.cancel = true;
          });
          this.clock.tick(10);
          var data = {CustomText: 'new text'};
          this.instance.updateTask(task.Id, data);
          this.clock.tick(300);
          assert.ok(updatingEventTriggered, 'Updating event raised');
          assert.notOk(updatedEventTriggered, 'onTaskUpdated is not triggrered');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/gantt"), require("../../../helpers/ganttHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=editApi.tests.js.map