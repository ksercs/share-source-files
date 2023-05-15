!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/dataSource.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/dataSource.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      options,
      data,
      getGanttViewCore,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      options = $__m.options;
      data = $__m.data;
      getGanttViewCore = $__m.getGanttViewCore;
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
      QUnit.module('DataSources', moduleConfig, function() {
        test('inserting', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var tasksCount = data.tasks.length;
          var taskData = {
            start: new Date('2019-02-21'),
            end: new Date('2019-02-22'),
            title: 'New',
            progress: 0,
            parentId: '1'
          };
          getGanttViewCore(this.instance).commandManager.createTaskCommand.execute(taskData);
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount + 1, 'new task was created in ds');
          var createdTask = data.tasks[data.tasks.length - 1];
          assert.equal(createdTask.title, taskData.title, 'new task title is right');
          assert.equal(createdTask.start, taskData.start, 'new task start is right');
          assert.equal(createdTask.end, taskData.end, 'new task end is right');
        });
        test('updating', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var updatedTaskId = 3;
          var dataToUpdate = {
            start: new Date('2019-02-21'),
            end: new Date('2019-02-22'),
            title: 'New'
          };
          getGanttViewCore(this.instance).commandManager.updateTaskCommand.execute(updatedTaskId.toString(), dataToUpdate);
          this.clock.tick(10);
          var updatedTask = data.tasks.filter(function(t) {
            return t.id === updatedTaskId;
          })[0];
          assert.equal(updatedTask.title, dataToUpdate.title, 'task title is updated');
          assert.equal(updatedTask.start, dataToUpdate.start, 'new task start is updated');
          assert.equal(updatedTask.end, dataToUpdate.end, 'new task end is updated');
        });
        test('removing', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('selectedRowKey', 3);
          this.clock.tick(10);
          var removedTaskId = 3;
          var tasksCount = data.tasks.length;
          getGanttViewCore(this.instance).commandManager.removeTaskCommand.execute(removedTaskId.toString(), false);
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount - 1, 'tasks less');
          var removedTask = data.tasks.filter(function(t) {
            return t.id === removedTaskId;
          })[0];
          assert.equal(removedTask, undefined, 'task was removed');
          assert.equal(this.instance._treeList.getVisibleRows().length, tasksCount - 1, 'tree list row removed');
        });
        test('delayed loading', function(assert) {
          this.createInstance({
            tasks: {dataSource: []},
            validation: {autoUpdateParentTasks: true}
          });
          this.clock.tick(10);
          this.instance.option('tasks.dataSource', data.tasks);
          this.clock.tick(10);
          assert.equal(this.instance._treeList.option('expandedRowKeys').length, 2, 'each task is loaded and expanded');
        });
        test('incorrect tasks data', function(assert) {
          var failTasks = [{
            'id': 1,
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
            'parentId': 200,
            'title': 'Secure project sponsorship',
            'start': new Date('2019-02-21T10:00:00.000Z'),
            'end': new Date('2019-02-22T09:00:00.000Z'),
            'progress': 100
          }, {
            'id': 5,
            'parentId': 4,
            'title': 'Define preliminary resources',
            'start': new Date('2019-02-22T10:00:00.000Z'),
            'end': new Date('2019-02-25T09:00:00.000Z'),
            'progress': 60
          }];
          this.createInstance({
            tasks: {dataSource: failTasks},
            validation: {autoUpdateParentTasks: true}
          });
          this.clock.tick(10);
          var keys = this.instance.getVisibleTaskKeys();
          assert.equal(keys.length, 3, 'incorrect keys filtered');
          assert.equal(keys[0], 1, 'correct key');
          assert.equal(keys[1], 2, 'correct key');
          assert.equal(keys[2], 3, 'correct key');
          this.instance.option('validation.autoUpdateParentTasks', false);
          this.clock.tick(10);
          keys = this.instance.getVisibleTaskKeys();
          assert.equal(keys.length, 3, 'incorrect keys filtered');
          assert.equal(keys[0], 1, 'correct key');
          assert.equal(keys[1], 2, 'correct key');
          assert.equal(keys[2], 3, 'correct key');
        });
        test('inserting - check treeList', function(assert) {
          var columns = [{
            dataField: 'title',
            caption: 'Subject'
          }, {
            dataField: 'progress',
            caption: 'progress'
          }, {
            dataField: 'end',
            caption: 'End Date'
          }];
          this.createInstance(options.allSourcesOptions);
          this.instance.option('columns', columns);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var taskData = {
            start: new Date('2019-02-21'),
            end: new Date('2019-02-22'),
            title: 'New',
            progress: 22,
            parentId: '1'
          };
          getGanttViewCore(this.instance).commandManager.createTaskCommand.execute(taskData);
          this.clock.tick(10);
          var titleText = $(this.instance._treeList.getCellElement(data.tasks.length - 1, 0)).text();
          var progress = $(this.instance._treeList.getCellElement(data.tasks.length - 1, 1)).text();
          var endDate = new Date($(this.instance._treeList.getCellElement(data.tasks.length - 1, 2)).text());
          assert.equal(titleText, taskData.title, 'new task title is right');
          assert.equal(progress, taskData.progress, 'new task progress is right');
          assert.ok(endDate - taskData.end < 1, 'new task end is right');
        });
        test('updating - check treeList', function(assert) {
          var tasks = [{
            'id': 1,
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
          }];
          this.createInstance({
            tasks: {dataSource: tasks},
            editing: {enabled: true},
            columns: [{
              dataField: 'title',
              caption: 'Subject'
            }, {
              dataField: 'start',
              caption: 'Start'
            }, {
              dataField: 'end',
              caption: 'End Date'
            }]
          });
          this.clock.tick(10);
          var data = {
            start: new Date('2019-02-21'),
            end: new Date('2019-02-22'),
            title: 'New'
          };
          this.instance.updateTask(tasks[2].id, data);
          this.clock.tick(10);
          var titleText = $(this.instance._treeList.getCellElement(2, 0)).text();
          var startDate = new Date($(this.instance._treeList.getCellElement(2, 1)).text());
          var endDate = new Date($(this.instance._treeList.getCellElement(2, 2)).text());
          assert.equal(titleText, data.title, 'new task title is right');
          assert.ok(startDate - data.start < 1, 'new task start is right');
          assert.ok(endDate - data.end < 1, 'new task end is right');
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
//# sourceMappingURL=dataSource.tests.js.map