!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/editDataSources.tests.js"], ["jquery","data/data_source/data_source","data/custom_store","data/array_store","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/editDataSources.tests.js", ["jquery", "data/data_source/data_source", "data/custom_store", "data/array_store", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      DataSource,
      CustomStore,
      ArrayStore,
      Consts,
      getGanttViewCore,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
      getGanttViewCore = $__m.getGanttViewCore;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, test = $__4.test, $__4));
      moduleConfig = {
        beforeEach: function() {
          var $__3 = this;
          this.createInstance = function(settings) {
            $__3.instance = $__3.$element.dxGantt(settings).dxGantt('instance');
          };
          this.$element = $('#gantt');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      QUnit.module('Edit data sources (T887281)', moduleConfig, function() {
        test('array, auto update parents on', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'my_id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'my_id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 0
          }, {
            'my_id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50
          }];
          var options = {
            tasks: {
              keyExpr: 'my_id',
              dataSource: tasks
            },
            editing: {enabled: true},
            validation: {autoUpdateParentTasks: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var updatedTaskId = 3;
          var updatedStart = new Date('2019-02-21');
          getGanttViewCore(this.instance).commandManager.updateTaskCommand.execute(updatedTaskId.toString(), {start: updatedStart});
          this.instance._ganttTreeList.updateDataSource();
          this.clock.tick(10);
          var updatedTask = tasks.filter(function(t) {
            return t.my_id === updatedTaskId;
          })[0];
          assert.equal(updatedTask.start, updatedStart, 'new task start is updated');
        });
        test('array, auto update parents off', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'my_id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'my_id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 0
          }, {
            'my_id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50
          }];
          var options = {
            tasks: {
              keyExpr: 'my_id',
              dataSource: tasks
            },
            editing: {enabled: true},
            validation: {autoUpdateParentTasks: false}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var updatedTaskId = 3;
          var updatedStart = new Date('2019-02-21');
          getGanttViewCore(this.instance).commandManager.updateTaskCommand.execute(updatedTaskId.toString(), {start: updatedStart});
          this.instance._ganttTreeList.updateDataSource();
          this.clock.tick(10);
          var updatedTask = tasks.filter(function(t) {
            return t.my_id === updatedTaskId;
          })[0];
          assert.equal(updatedTask.start, updatedStart, 'new task start is updated');
        });
        test('user data source with load/update, auto update parents on', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'my_id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'my_id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 0
          }, {
            'my_id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50
          }];
          var ds = new DataSource({
            key: 'my_id',
            load: function(loadOptions) {
              return tasks;
            },
            update: function(key, values) {
              var row = {};
              var k = this.key();
              for (var i = 0; i < tasks.length; i++) {
                var r = tasks[i];
                if (r[k] === key) {
                  row = r;
                  break;
                }
              }
              for (var val in values) {
                row[val] = values[val];
              }
            }
          });
          var options = {
            tasks: {
              keyExpr: 'my_id',
              dataSource: ds
            },
            editing: {enabled: true},
            validation: {autoUpdateParentTasks: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var updatedTaskId = 3;
          var updatedStart = new Date('2019-02-21');
          getGanttViewCore(this.instance).commandManager.updateTaskCommand.execute(updatedTaskId.toString(), {start: updatedStart});
          this.instance._ganttTreeList.updateDataSource();
          this.clock.tick(10);
          var updatedTask = tasks.filter(function(t) {
            return t.my_id === updatedTaskId;
          })[0];
          assert.equal(updatedTask.start, updatedStart, 'new task start is updated');
        });
        test('user data source with load/update, auto update parents off', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'my_id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'my_id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 0
          }, {
            'my_id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50
          }];
          var ds = new DataSource({
            key: 'my_id',
            load: function(loadOptions) {
              return tasks;
            },
            update: function(key, values) {
              var row = {};
              var k = this.key();
              for (var i = 0; i < tasks.length; i++) {
                var r = tasks[i];
                if (r[k] === key) {
                  row = r;
                  break;
                }
              }
              for (var val in values) {
                row[val] = values[val];
              }
            }
          });
          var options = {
            tasks: {
              keyExpr: 'my_id',
              dataSource: ds
            },
            editing: {enabled: true},
            validation: {autoUpdateParentTasks: false}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var updatedTaskId = 3;
          var updatedStart = new Date('2019-02-21');
          getGanttViewCore(this.instance).commandManager.updateTaskCommand.execute(updatedTaskId.toString(), {start: updatedStart});
          this.instance._ganttTreeList.updateDataSource();
          this.clock.tick(10);
          var updatedTask = tasks.filter(function(t) {
            return t.my_id === updatedTaskId;
          })[0];
          assert.equal(updatedTask.start, updatedStart, 'new task start is updated');
        });
        test('user custom store with load/update, auto update parents on', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'my_id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'my_id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 0
          }, {
            'my_id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50
          }];
          var ds = new CustomStore({
            key: 'my_id',
            load: function(loadOptions) {
              return tasks;
            },
            update: function(key, values) {
              var row = {};
              var k = this.key();
              for (var i = 0; i < tasks.length; i++) {
                var r = tasks[i];
                if (r[k] === key) {
                  row = r;
                  break;
                }
              }
              for (var val in values) {
                row[val] = values[val];
              }
            }
          });
          var options = {
            tasks: {
              keyExpr: 'my_id',
              dataSource: ds
            },
            editing: {enabled: true},
            validation: {autoUpdateParentTasks: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var updatedTaskId = 3;
          var updatedStart = new Date('2019-02-21');
          getGanttViewCore(this.instance).commandManager.updateTaskCommand.execute(updatedTaskId.toString(), {start: updatedStart});
          this.instance._ganttTreeList.updateDataSource();
          this.clock.tick(10);
          var updatedTask = tasks.filter(function(t) {
            return t.my_id === updatedTaskId;
          })[0];
          assert.equal(updatedTask.start, updatedStart, 'new task start is updated');
        });
        test('user dcustom store with load/update, auto update parents off', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'my_id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'my_id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 0
          }, {
            'my_id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50
          }];
          var ds = new CustomStore({
            key: 'my_id',
            load: function(loadOptions) {
              return tasks;
            },
            update: function(key, values) {
              var row = {};
              var k = this.key();
              for (var i = 0; i < tasks.length; i++) {
                var r = tasks[i];
                if (r[k] === key) {
                  row = r;
                  break;
                }
              }
              for (var val in values) {
                row[val] = values[val];
              }
            }
          });
          var options = {
            tasks: {
              keyExpr: 'my_id',
              dataSource: ds
            },
            editing: {enabled: true},
            validation: {autoUpdateParentTasks: false}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var updatedTaskId = 3;
          var updatedStart = new Date('2019-02-21');
          getGanttViewCore(this.instance).commandManager.updateTaskCommand.execute(updatedTaskId.toString(), {start: updatedStart});
          this.instance._ganttTreeList.updateDataSource();
          this.clock.tick(10);
          var updatedTask = tasks.filter(function(t) {
            return t.my_id === updatedTaskId;
          })[0];
          assert.equal(updatedTask.start, updatedStart, 'new task start is updated');
        });
        test('remove task when filtering (T1015311)', function(assert) {
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
          }, {
            'id': 4,
            'parentId': 3,
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
          var tasksDataSource = new DataSource({
            store: new ArrayStore({
              data: tasks,
              key: 'id'
            }),
            paginate: false,
            filter: ['id', '<', 5]
          });
          this.createInstance({
            tasks: {dataSource: tasksDataSource},
            editing: {enabled: true}
          });
          this.clock.tick(10);
          assert.equal(this.instance._treeList.getVisibleRows().length, 4, 'tasks filtered');
          this.instance.deleteTask('4');
          this.clock.tick(10);
          assert.equal(this.instance._treeList.getVisibleRows().length, 3, 'tasks removed');
        });
        test('check render for ds with delay T1024748', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 0
          }, {
            'id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50
          }];
          var ds = new CustomStore({
            key: 'id',
            load: function(loadOptions) {
              var d = $.Deferred();
              setTimeout(function() {
                d.resolve(tasks);
              }, 100);
              return d.promise();
            }
          });
          var options = {
            tasks: {dataSource: ds},
            columns: [{
              dataField: 'title',
              caption: 'Subject'
            }, {
              dataField: 'start',
              caption: 'Start'
            }, {
              dataField: 'end',
              caption: 'End Date'
            }],
            editing: {enabled: true},
            validation: {autoUpdateParentTasks: true}
          };
          this.createInstance(options);
          this.clock.tick(300);
          var titleText = $(this.instance._treeList.getCellElement(0, 0)).text();
          assert.equal(titleText, tasks[0].title, 'title cell text is right');
          this.clock.tick(200);
          var taskText = this.$element.find(Consts.TASK_WRAPPER_SELECTOR).first().text();
          assert.equal(taskText, tasks[0].title, 'Custom task text works correctly');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","data/data_source/data_source","data/custom_store","data/array_store","ui/gantt","../../../helpers/ganttHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("data/data_source/data_source"), require("data/custom_store"), require("data/array_store"), require("ui/gantt"), require("../../../helpers/ganttHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=editDataSources.tests.js.map