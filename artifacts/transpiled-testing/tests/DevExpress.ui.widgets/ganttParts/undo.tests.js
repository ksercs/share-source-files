!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/undo.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/undo.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      Consts,
      getGanttViewCore,
      test,
      tasks,
      dependencies,
      resources,
      resourceAssignments,
      data,
      options,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
      getGanttViewCore = $__m.getGanttViewCore;
    }],
    execute: function() {
      var $__5;
      (($__5 = QUnit, test = $__5.test, $__5));
      tasks = [{
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
      dependencies = [{
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
      resources = [{
        'id': 1,
        'text': 'Management'
      }, {
        'id': 2,
        'text': 'Project Manager'
      }, {
        'id': 3,
        'text': 'Deployment Team'
      }];
      resourceAssignments = [{
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
      moduleConfig = {
        beforeEach: function() {
          var $__4 = this;
          data = {
            tasks: tasks.slice(),
            dependencies: dependencies.slice(),
            resources: resources.slice(),
            resourceAssignments: resourceAssignments.slice()
          };
          options = {
            tasks: {dataSource: data.tasks},
            dependencies: {dataSource: data.dependencies},
            resources: {dataSource: data.resources},
            resourceAssignments: {dataSource: data.resourceAssignments},
            toolbar: {items: ['undo', 'redo']},
            editing: {enabled: true}
          };
          this.createInstance = function(settings) {
            $__4.instance = $__4.$element.dxGantt(settings).dxGantt('instance');
          };
          this.$element = $('#gantt');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        },
        fireRedo: function() {
          getGanttViewCore(this.instance).commandManager.commands[7].execute();
        }
      };
      QUnit.module('Undo tests (T1099868)', moduleConfig, function() {
        test('task insert', function(assert) {
          this.createInstance(options);
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
          var $items = this.$element.find(Consts.TOOLBAR_ITEM_SELECTOR);
          assert.equal($items.length, 2, 'All items were rendered');
          assert.equal($items.last().children().children().attr('aria-label'), 'dx-gantt-i dx-gantt-i-redo', 'Last button is redo button');
          var $undo = $items.first();
          $undo.children().first().trigger('dxclick');
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount, 'new task removed');
          this.fireRedo();
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount + 1, 'new task restored');
        });
        test('task delete', function(assert) {
          this.createInstance(options);
          this.clock.tick(10);
          var tasksCount = data.tasks.length;
          var taskToDelete = data.tasks[tasksCount - 1];
          this.instance.deleteTask(taskToDelete.id);
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount - 1, 'new task was deleted');
          var $items = this.$element.find(Consts.TOOLBAR_ITEM_SELECTOR);
          var $undo = $items.first();
          $undo.children().first().trigger('dxclick');
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount, 'task restored');
          this.fireRedo();
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount - 1, 'task restored');
        });
        test('insertDependency', function(assert) {
          this.createInstance(options);
          this.clock.tick(10);
          var count = data.dependencies.length;
          var dependencyData = {
            'predecessorId': 2,
            'successorId': 4,
            'type': 0
          };
          this.instance.insertDependency(dependencyData);
          this.clock.tick(10);
          assert.equal(data.dependencies.length, count + 1, 'new dependency was  created');
          var $items = this.$element.find(Consts.TOOLBAR_ITEM_SELECTOR);
          var $undo = $items.first();
          $undo.children().first().trigger('dxclick');
          this.clock.tick(10);
          assert.equal(data.dependencies.length, count, 'dependency removed');
          this.fireRedo();
          this.clock.tick(10);
          assert.equal(data.dependencies.length, count + 1, 'dependency restored');
        });
        test('deleteDependency', function(assert) {
          this.createInstance(options);
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
          var $items = this.$element.find(Consts.TOOLBAR_ITEM_SELECTOR);
          var $undo = $items.first();
          $undo.children().first().trigger('dxclick');
          this.clock.tick(10);
          assert.equal(data.dependencies.length, count, 'dependency restored');
          this.fireRedo();
          this.clock.tick(10);
          assert.equal(data.dependencies.length, count - 1, 'dependency removed');
        });
        test('deleteResource + unassign', function(assert) {
          this.createInstance(options);
          this.clock.tick(10);
          var count = data.resources.length;
          var resourceToDelete = data.resources[1];
          var assignmentCount = data.resourceAssignments.length;
          var assignmentToDelete = data.resourceAssignments.filter(function(a) {
            return a.resourceId === resourceToDelete.id;
          }).length;
          this.instance.deleteResource(resourceToDelete.id);
          this.clock.tick(10);
          assert.equal(data.resources.length, count - 1, 'resources was deleted');
          assert.equal(data.resourceAssignments.length, assignmentCount - assignmentToDelete, 'resources was unassigned');
          var $items = this.$element.find(Consts.TOOLBAR_ITEM_SELECTOR);
          var $undo = $items.first();
          $undo.children().first().trigger('dxclick');
          this.clock.tick(10);
          assert.equal(data.resources.length, count, 'resource restored');
          assert.equal(data.resourceAssignments.length, assignmentCount, 'assignments restored');
          assert.equal(data.resources[data.resources.length - 1].id, data.resourceAssignments[data.resourceAssignments.length - 1].resourceId, 'checl restored key');
          this.fireRedo();
          this.clock.tick(10);
          assert.equal(data.resources.length, count - 1, 'resources was deleted');
          assert.equal(data.resourceAssignments.length, assignmentCount - assignmentToDelete, 'resources was unassigned');
        });
        test('task delete with relations', function(assert) {
          this.createInstance(options);
          this.clock.tick(10);
          var tasksCount = data.tasks.length;
          var taskToDelete = data.tasks[5];
          var dependencyCount = data.dependencies.length;
          var assignmentCount = data.resourceAssignments.length;
          var assignmentToDelete = data.resourceAssignments.filter(function(a) {
            return a.taskId === taskToDelete.id;
          }).length;
          var dependenciesToDelete = data.dependencies.filter(function(d) {
            return d.predecessorId === taskToDelete.id || d.successorId === taskToDelete.id;
          }).length;
          this.instance.deleteTask(taskToDelete.id);
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount - 1, 'new task was deleted');
          assert.equal(data.resourceAssignments.length, assignmentCount - assignmentToDelete, 'tasks was unassigned');
          assert.equal(data.dependencies.length, dependencyCount - dependenciesToDelete, 'dependency deleted');
          var $items = this.$element.find(Consts.TOOLBAR_ITEM_SELECTOR);
          var $undo = $items.first();
          $undo.children().first().trigger('dxclick');
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount, 'task restored');
          assert.equal(data.resourceAssignments.length, assignmentCount, 'assignments restored');
          assert.equal(data.dependencies.length, dependencyCount, 'dependency restored');
          assert.equal(data.tasks[data.tasks.length - 1].id, data.resourceAssignments[data.resourceAssignments.length - 1].taskId, 'check assignment restored key');
          assert.equal(data.tasks[data.tasks.length - 1].id, data.dependencies[data.dependencies.length - 1].successorId, 'check dependency restored task key');
          this.fireRedo();
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount - 1, 'new task was deleted');
          assert.equal(data.resourceAssignments.length, assignmentCount - assignmentToDelete, 'tasks was unassigned');
          assert.equal(data.dependencies.length, dependencyCount - dependenciesToDelete, 'dependency deleted');
        });
        test('task delete with relations and children', function(assert) {
          this.createInstance(options);
          this.clock.tick(10);
          var tasksCount = data.tasks.length;
          var taskToDelete = data.tasks[1];
          var oldTasks = data.tasks.slice();
          var dependencyCount = data.dependencies.length;
          var assignmentCount = data.resourceAssignments.length;
          this.instance.deleteTask(taskToDelete.id);
          this.clock.tick(10);
          assert.equal(data.tasks.length, 1, 'task deleted with children');
          assert.ok(data.resourceAssignments.length < assignmentCount, 'tasks was unassigned');
          assert.ok(data.dependencies.length < dependencyCount, 'dependency deleted');
          var $items = this.$element.find(Consts.TOOLBAR_ITEM_SELECTOR);
          var $undo = $items.first();
          $undo.children().first().trigger('dxclick');
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount, 'tasks restored');
          assert.equal(data.resourceAssignments.length, assignmentCount, 'assignments restored');
          assert.equal(data.dependencies.length, dependencyCount, 'dependency restored');
          assert.equal(data.tasks[1].title, oldTasks[1].title, 'check data');
          assert.equal(data.tasks[2].title, oldTasks[2].title, 'check data');
          assert.equal(data.tasks[3].title, oldTasks[3].title, 'check data');
          assert.notEqual(data.tasks[1].id, oldTasks[1].id, 'check key');
          this.fireRedo();
          this.clock.tick(10);
          assert.equal(data.tasks.length, 1, 'task deleted with children');
          assert.ok(data.resourceAssignments.length < assignmentCount, 'tasks was unassigned');
          assert.ok(data.dependencies.length < dependencyCount, 'dependency deleted');
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
//# sourceMappingURL=undo.tests.js.map