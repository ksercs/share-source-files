!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/markup.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js","localization"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/markup.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js", "localization"], function($__export) {
  "use strict";
  var $,
      Consts,
      data,
      options,
      localization,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
      data = $__m.data;
      options = $__m.options;
    }, function($__m) {
      localization = $__m.default;
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
      QUnit.module('Markup', moduleConfig, function() {
        test('should render treeList', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          var treeListElements = this.$element.find(Consts.TREELIST_SELECTOR);
          assert.strictEqual(treeListElements.length, 1);
        });
        test('should render task wrapper for each task', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var elements = this.$element.find(Consts.TASK_WRAPPER_SELECTOR);
          assert.equal(elements.length, data.tasks.length - 1);
        });
        test('should render dependencies', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var element = this.$element.find(Consts.TASK_ARROW_SELECTOR);
          assert.equal(element.length, data.dependencies.length);
        });
        test('should render resources', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var element = this.$element.find(Consts.TASK_RESOURCES_SELECTOR);
          assert.equal(element.length, data.resourceAssignments.length);
        });
        test('row heights', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var treeListRowElement = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).last().get(0);
          var ganttViewRowElement = this.$element.find(Consts.GANTT_VIEW_ROW_SELECTOR).get(0);
          assert.roughEqual(treeListRowElement.getBoundingClientRect().height, ganttViewRowElement.getBoundingClientRect().height, 0.01, 'row heights are equal');
        });
        test('auto height', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var initHeight = this.$element.height();
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.ok(initHeight > this.$element.height(), 'collapsed height');
        });
        test('fixed height', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('height', 800);
          this.clock.tick(10);
          var initHeight = this.$element.height();
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.roughEqual(initHeight, this.$element.height(), 1, 'collapsed height');
        });
        test('invalid start or end dates', function(assert) {
          var customTasks = [{
            'id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-03-26'),
            'progress': 0
          }, {
            'id': 2,
            'parentId': 1,
            'title': 'Scope 0',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-23'),
            'progress': 0
          }, {
            'id': 3,
            'parentId': 1,
            'title': 'Scope 1',
            'start': null,
            'end': new Date('2019-02-23'),
            'progress': 0
          }, {
            'id': 4,
            'parentId': 2,
            'title': 'Scope 2',
            'start': new Date('2019-02-21'),
            'end': null,
            'progress': 50
          }, {
            'id': 5,
            'parentId': 2,
            'title': 'Scope 3',
            'start': null,
            'end': null,
            'progress': 25
          }];
          var customDependencies = [{
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
          }];
          var options = {
            tasks: {dataSource: customTasks},
            dependencies: {dataSource: customDependencies}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var treeListElements = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR);
          assert.strictEqual(treeListElements.length, 5);
          var taskElements = this.$element.find(Consts.TASK_WRAPPER_SELECTOR);
          assert.equal(taskElements.length, 2);
          var dependenciesElements = this.$element.find(Consts.TASK_ARROW_SELECTOR);
          assert.equal(dependenciesElements.length, 1);
          assert.equal(this.instance.getVisibleTaskKeys().length, 2, 'task keys');
          assert.equal(this.instance.getVisibleDependencyKeys().length, 1, 'dependencies keys');
        });
        test('add task to empty gantt - row height', function(assert) {
          var testTasks = [];
          this.createInstance({tasks: {dataSource: testTasks}});
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var data = {
            start: new Date('2019-02-21'),
            end: new Date('2019-02-22'),
            title: 'New',
            progress: 0,
            parentId: '0'
          };
          this.instance.insertTask(data);
          this.clock.tick(10);
          $('.dx-gantt .dx-row').css({height: '63px'});
          this.instance._sizeHelper.updateGanttRowHeights();
          assert.equal(testTasks.length, 1, 'first new task was created in ds');
          var rowHeight = this.instance._getGanttViewOption('rowHeight');
          var treeListRowElement = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).last().get(0);
          var treeListRowElementHeight = treeListRowElement.getBoundingClientRect().height;
          assert.roughEqual(treeListRowElementHeight, rowHeight, 1.1, 'row heights are equal');
          this.instance.insertTask(data);
          this.clock.tick(10);
          $('.dx-gantt .dx-row').css({height: '63px'});
          this.instance._sizeHelper.updateGanttRowHeights();
          this.clock.tick(10);
          assert.equal(testTasks.length, 2, 'second new task was created in ds');
          rowHeight = this.instance._getGanttViewOption('rowHeight');
          treeListRowElement = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).last().get(0);
          treeListRowElementHeight = treeListRowElement.getBoundingClientRect().height;
          assert.roughEqual(treeListRowElementHeight, rowHeight, 0.1, 'row heights are equal');
        });
        test('new added task should be selected', function(assert) {
          var testTasks = [{
            id: 1,
            start: new Date('2021-04-21'),
            end: new Date('2021-04-22'),
            title: 'New',
            progress: 0,
            parentId: '0'
          }, {
            id: 2,
            start: new Date('2021-04-21'),
            end: new Date('2021-04-22'),
            title: 'New',
            progress: 0,
            parentId: '0'
          }];
          this.createInstance({tasks: {dataSource: testTasks}});
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var data = {
            start: new Date('2021-04-21'),
            end: new Date('2021-04-22'),
            title: 'New',
            progress: 0,
            parentId: '0'
          };
          this.instance.insertTask(data);
          this.clock.tick(10);
          assert.equal(testTasks.length, 3, 'first new task was created in ds');
          var selectedTask = this.$element.find(Consts.TASK_SELECTED_SELECTOR);
          var selectedTaskIndex = selectedTask.eq(0).attr('task-index');
          assert.equal(selectedTaskIndex, 2, 'first new added task is selected');
          this.instance.insertTask(data);
          this.clock.tick(10);
          selectedTask = this.$element.find(Consts.TASK_SELECTED_SELECTOR);
          selectedTaskIndex = selectedTask.eq(0).attr('task-index');
          assert.equal(selectedTaskIndex, 3, 'second new added task is selected');
        });
        test('24 format check (T1130809)', function(assert) {
          localization.locale('fr');
          var my_options = {
            tasks: {dataSource: data.tasks},
            scaleType: 'hours',
            onScaleCellPrepared: function(e) {
              var scaleElement = $(e.scaleElement);
              if (e.scaleIndex === 0) {
                assert.equal(!!scaleElement.text().match(/am|pm/i), false, 'correct format');
              }
            }
          };
          this.createInstance(my_options);
          this.clock.tick(10);
        });
        test('12 format check (T1130809)', function(assert) {
          localization.locale('en-US');
          var my_options = {
            tasks: {dataSource: data.tasks},
            scaleType: 'hours',
            onScaleCellPrepared: function(e) {
              var scaleElement = $(e.scaleElement);
              if (e.scaleIndex === 0) {
                assert.equal(!!scaleElement.text().match(/am|pm/i), true, 'correct format');
              }
            }
          };
          this.createInstance(my_options);
          this.clock.tick(10);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/gantt","../../../helpers/ganttHelpers.js","localization"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/gantt"), require("../../../helpers/ganttHelpers.js"), require("localization"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=markup.tests.js.map