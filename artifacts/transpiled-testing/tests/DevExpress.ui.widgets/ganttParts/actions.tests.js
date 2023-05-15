!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/actions.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/actions.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      Consts,
      data,
      options,
      getGanttViewCore,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
      data = $__m.data;
      options = $__m.options;
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
      QUnit.module('Actions', moduleConfig, function() {
        test('expand', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, data.tasks.length - 1);
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
        });
        test('collapse', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, data.tasks.length - 1);
          var collapsedElement = this.$element.find(Consts.TREELIST_COLLAPSED_SELECTOR).first();
          collapsedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, data.tasks.length - 1);
        });
        test('expand/collapse All', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          this.instance._collapseAll();
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          this.clock.tick(10);
          this.instance._expandAll();
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, data.tasks.length - 1);
        });
        test('collapse and expand after inserting', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var tasksCount = data.tasks.length;
          var newStart = new Date('2019-02-21');
          var newEnd = new Date('2019-02-22');
          var newTitle = 'New';
          var taskData = {
            start: newStart,
            end: newEnd,
            title: newTitle,
            progress: 0,
            parentId: '2'
          };
          getGanttViewCore(this.instance).commandManager.createTaskCommand.execute(taskData);
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount + 1, 'new task was created in ds');
          var createdTask = data.tasks[data.tasks.length - 1];
          assert.equal(createdTask.title, newTitle, 'new task title is right');
          assert.equal(createdTask.start, newStart, 'new task start is right');
          assert.equal(createdTask.end, newEnd, 'new task end is right');
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).eq(1);
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
          var collapsedElement = this.$element.find(Consts.TREELIST_COLLAPSED_SELECTOR).first();
          collapsedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, data.tasks.length - 1);
        });
        test('collapse and expand after inserting in auto update mode', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('validation.autoUpdateParentTasks', true);
          this.clock.tick(10);
          var tasksCount = data.tasks.length;
          var newStart = new Date('2019-02-21');
          var newEnd = new Date('2019-02-22');
          var newTitle = 'New';
          var taskData = {
            start: newStart,
            end: newEnd,
            title: newTitle,
            progress: 0,
            parentId: '2'
          };
          getGanttViewCore(this.instance).commandManager.createTaskCommand.execute(taskData);
          this.clock.tick(10);
          assert.equal(data.tasks.length, tasksCount + 1, 'new task was created in ds');
          var createdTask = data.tasks[data.tasks.length - 1];
          assert.equal(createdTask.title, newTitle, 'new task title is right');
          assert.equal(createdTask.start, newStart, 'new task start is right');
          assert.equal(createdTask.end, newEnd, 'new task end is right');
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).eq(1);
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
          var collapsedElement = this.$element.find(Consts.TREELIST_COLLAPSED_SELECTOR).first();
          collapsedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, data.tasks.length - 1);
        });
        test('collapse and check state after validation option changed (T997932)', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).eq(1);
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
          this.instance.option('validation.autoUpdateParentTasks', true);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
          var $parentTasks = this.$element.find(Consts.PARENT_TASK_SELECTOR);
          assert.ok($parentTasks.length > 0, 'parent tasks has className');
          this.instance.option('validation.autoUpdateParentTasks', false);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
          $parentTasks = this.$element.find(Consts.PARENT_TASK_SELECTOR);
          assert.strictEqual($parentTasks.length, 0, 'not parent tasks');
        });
        test('move splitter', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var splitterWrapper = this.$element.find(Consts.SPLITTER_WRAPPER_SELECTOR);
          var splitter = this.$element.find(Consts.SPLITTER_SELECTOR);
          var treeListWrapperElement = this.$element.find(Consts.TREELIST_WRAPPER_SELECTOR);
          var treeListWrapperLeftOffset = treeListWrapperElement.offset().left;
          var treeListWrapperTopOffset = treeListWrapperElement.offset().top;
          var ganttView = this.$element.find(Consts.GANTT_VIEW_SELECTOR);
          var splitterContainerWrapperWidth = $(treeListWrapperElement).parent().width();
          assert.ok(splitterWrapper, 'Splitter wrapper has been found');
          assert.ok(splitter, 'Splitter has been found');
          splitter.trigger($.Event('dxpointerdown', {pointerType: 'mouse'}));
          splitter.trigger($.Event('dxpointermove', {
            pointerType: 'mouse',
            pageX: treeListWrapperLeftOffset - parseFloat(splitter.css('margin-left')) + 100,
            pageY: treeListWrapperTopOffset + 100
          }));
          splitter.trigger($.Event('dxpointerup', {pointerType: 'mouse'}));
          assert.equal(treeListWrapperElement.width(), 100);
          assert.equal(ganttView.width(), splitterContainerWrapperWidth - 100);
          assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), 100, 'Splitter has been moved by mouse');
          splitter.trigger($.Event('dxpointerdown', {pointerType: 'touch'}));
          splitter.trigger($.Event('dxpointermove', {
            pointerType: 'touch',
            pageX: treeListWrapperLeftOffset - parseFloat(splitter.css('margin-left')) + 300,
            pageY: treeListWrapperTopOffset + 100
          }));
          splitter.trigger($.Event('dxpointerup', {pointerType: 'touch'}));
          assert.equal(treeListWrapperElement.width(), 300);
          assert.equal(ganttView.width(), splitterContainerWrapperWidth - 300);
          assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), 300, 'Splitter has been moved by touch');
          splitter.trigger($.Event('dxpointerdown'));
          splitter.trigger($.Event('dxpointermove', {
            pageX: treeListWrapperLeftOffset - parseFloat(splitter.css('margin-left')) - 10,
            pageY: treeListWrapperTopOffset + 100
          }));
          splitter.trigger($.Event('dxpointerup'));
          assert.equal(treeListWrapperElement.width(), 0);
          assert.equal(ganttView.width(), splitterContainerWrapperWidth);
          assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), 0, 'Splitter has not cross the left side');
          splitter.trigger($.Event('dxpointerdown'));
          splitter.trigger($.Event('dxpointermove', {
            pageX: splitterContainerWrapperWidth - parseFloat(splitter.css('margin-left')) + 10,
            pageY: treeListWrapperTopOffset + 100
          }));
          splitter.trigger($.Event('dxpointerup'));
          assert.equal(treeListWrapperElement.width(), splitterContainerWrapperWidth - splitter.width());
          assert.equal(ganttView.width(), splitter.width());
          assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), splitterContainerWrapperWidth - splitter.width(), 'Splitter has not cross the right side');
        });
        test('splitter should resize panels with 2 gantts (T1091934)', function(assert) {
          this.createInstance(options.allSourcesOptions);
          var $element2 = $('<div>').attr('id', 'gantt2').appendTo('#qunit-fixture');
          var instance2 = $element2.dxGantt().dxGantt('instance');
          this.clock.tick(10);
          [this.$element, $element2].forEach(function($element, index) {
            var splitterWrapper = $element.find(Consts.SPLITTER_WRAPPER_SELECTOR);
            var splitter = $element.find(Consts.SPLITTER_SELECTOR);
            var treeListWrapperElement = $element.find(Consts.TREELIST_WRAPPER_SELECTOR);
            var treeListWrapperLeftOffset = treeListWrapperElement.offset().left;
            var treeListWrapperTopOffset = treeListWrapperElement.offset().top;
            var ganttView = $element.find(Consts.GANTT_VIEW_SELECTOR);
            var splitterContainerWrapperWidth = $(treeListWrapperElement).parent().width();
            assert.ok(splitterWrapper, ("Splitter " + index + " wrapper has been found"));
            assert.ok(splitter, ("Splitter " + index + " has been found"));
            splitter.trigger($.Event('dxpointerdown', {pointerType: 'mouse'}));
            splitter.trigger($.Event('dxpointermove', {
              pointerType: 'mouse',
              pageX: treeListWrapperLeftOffset - parseFloat(splitter.css('margin-left')) + 100,
              pageY: treeListWrapperTopOffset + 100
            }));
            splitter.trigger($.Event('dxpointerup', {pointerType: 'mouse'}));
            assert.equal(treeListWrapperElement.width(), 100);
            assert.equal(ganttView.width(), splitterContainerWrapperWidth - 100);
            assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), 100, ("Splitter " + index + " has been moved by mouse"));
            splitter.trigger($.Event('dxpointerdown', {pointerType: 'touch'}));
            splitter.trigger($.Event('dxpointermove', {
              pointerType: 'touch',
              pageX: treeListWrapperLeftOffset - parseFloat(splitter.css('margin-left')) + 300,
              pageY: treeListWrapperTopOffset + 100
            }));
            splitter.trigger($.Event('dxpointerup', {pointerType: 'touch'}));
            assert.equal(treeListWrapperElement.width(), 300);
            assert.equal(ganttView.width(), splitterContainerWrapperWidth - 300);
            assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), 300, ("Splitter " + index + " has been moved by touch"));
            splitter.trigger($.Event('dxpointerdown'));
            splitter.trigger($.Event('dxpointermove', {
              pageX: treeListWrapperLeftOffset - parseFloat(splitter.css('margin-left')) - 10,
              pageY: treeListWrapperTopOffset + 100
            }));
            splitter.trigger($.Event('dxpointerup'));
            assert.equal(treeListWrapperElement.width(), 0);
            assert.equal(ganttView.width(), splitterContainerWrapperWidth);
            assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), 0, ("Splitter " + index + " has not cross the left side"));
            splitter.trigger($.Event('dxpointerdown'));
            splitter.trigger($.Event('dxpointermove', {
              pageX: splitterContainerWrapperWidth - parseFloat(splitter.css('margin-left')) + 10,
              pageY: treeListWrapperTopOffset + 100
            }));
            splitter.trigger($.Event('dxpointerup'));
            assert.equal(treeListWrapperElement.width(), splitterContainerWrapperWidth - splitter.width());
            assert.equal(ganttView.width(), splitter.width());
            assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), splitterContainerWrapperWidth - splitter.width(), ("Splitter " + index + " has not cross the right side"));
          });
          instance2.dispose();
          $element2.remove();
        });
        test('expand api', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, data.tasks.length - 1);
          this.clock.tick(10);
          this.instance.collapseAll();
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          this.clock.tick(10);
          this.instance.expandAll();
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, data.tasks.length - 1);
          this.instance.expandAllToLevel(1);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
          this.instance.expandToTask(7);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, data.tasks.length - 1);
          this.instance.expandToTask(2);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
          this.instance.expandTask(2);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, data.tasks.length - 1);
          this.instance.collapseTask(2);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
        });
        test('showResources()', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_RESOURCES_SELECTOR).length, data.resourceAssignments.length);
          this.instance.showResources(false);
          assert.equal(this.$element.find(Consts.TASK_RESOURCES_SELECTOR).length, 0);
          this.instance.showResources(true);
          assert.equal(this.$element.find(Consts.TASK_RESOURCES_SELECTOR).length, data.resourceAssignments.length);
        });
        test('showDependencies()', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_ARROW_SELECTOR).length, data.dependencies.length);
          this.instance.showDependencies(false);
          assert.equal(this.$element.find(Consts.TASK_ARROW_SELECTOR).length, 0);
          this.instance.showDependencies(true);
          assert.equal(this.$element.find(Consts.TASK_ARROW_SELECTOR).length, data.dependencies.length);
        });
        test('collapse and check state after custom field updating', function(assert) {
          var taskOptions = {
            tasks: {dataSource: [{
                'id': '1',
                'parentId': 0,
                'title': 'Software Development',
                'start': new Date('2019-02-21T05:00:00.000Z'),
                'end': new Date('2019-07-04T12:00:00.000Z'),
                'progress': 31,
                'color': 'red',
                'CustomText': 'c1'
              }, {
                'id': '2',
                'parentId': 1,
                'title': 'Scope',
                'start': new Date('2020-02-21T05:00:00.000Z'),
                'end': new Date('2020-02-26T09:00:00.000Z'),
                'progress': 60,
                'CustomText': 'c2'
              }]},
            validation: {autoUpdateParentTasks: false},
            editing: {enabled: true},
            columns: [{
              dataField: 'CustomText',
              caption: 'Task',
              visible: false
            }, {
              dataField: 'start',
              caption: 'Start'
            }, {
              dataField: 'end',
              caption: 'End'
            }]
          };
          this.createInstance(taskOptions);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
          this.instance._collapseAll();
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          var customText = 'new';
          var data = {'CustomText': customText};
          this.instance.updateTask('1', data);
          this.clock.tick(500);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
        });
        test('collapse and check state after custom field updating (autoUpdateParentTasks=true)', function(assert) {
          var taskOptions = {
            tasks: {dataSource: [{
                'id': '1',
                'parentId': 0,
                'title': 'Software Development',
                'start': new Date('2019-02-21T05:00:00.000Z'),
                'end': new Date('2019-07-04T12:00:00.000Z'),
                'progress': 31,
                'color': 'red',
                'CustomText': 'c1'
              }, {
                'id': '2',
                'parentId': 1,
                'title': 'Scope',
                'start': new Date('2020-02-21T05:00:00.000Z'),
                'end': new Date('2020-02-26T09:00:00.000Z'),
                'progress': 60,
                'CustomText': 'c2'
              }]},
            validation: {autoUpdateParentTasks: true},
            editing: {enabled: true},
            columns: [{
              dataField: 'CustomText',
              caption: 'Task',
              visible: false
            }, {
              dataField: 'start',
              caption: 'Start'
            }, {
              dataField: 'end',
              caption: 'End'
            }]
          };
          this.createInstance(taskOptions);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
          this.instance._collapseAll();
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          var customText = 'new';
          var data = {'CustomText': customText};
          this.instance.updateTask('1', data);
          this.clock.tick(500);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
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
//# sourceMappingURL=actions.tests.js.map