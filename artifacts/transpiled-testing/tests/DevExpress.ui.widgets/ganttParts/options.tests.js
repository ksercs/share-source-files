!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/options.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/options.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
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
      QUnit.module('Options', moduleConfig, function() {
        test('taskListWidth', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          this.instance.option('width', 1000);
          var treeListWrapperElement = this.$element.find(Consts.TREELIST_WRAPPER_SELECTOR);
          var splitterWrapper = this.$element.find(Consts.SPLITTER_WRAPPER_SELECTOR);
          var ganttWrapperElement = this.$element.find(Consts.GANTT_VIEW_SELECTOR);
          var splitterOffset = this.instance._splitter._getSplitterOffset();
          this.instance.option('taskListWidth', 300);
          assert.roughEqual(treeListWrapperElement.width(), 300, 3, '300px');
          assert.roughEqual(parseFloat(splitterWrapper.css('left')), 300, 3, 'splitter position 300');
          assert.roughEqual(ganttWrapperElement.width(), 700, 3, '700px');
          this.instance.option('taskListWidth', '400px');
          assert.equal(treeListWrapperElement.width(), 400, '500px');
          assert.equal(parseFloat(splitterWrapper.css('left')), 400 - splitterOffset, 'splitter position 400');
          assert.roughEqual(ganttWrapperElement.width(), 600, 3, '600px');
          this.instance.option('taskListWidth', '10%');
          assert.roughEqual(treeListWrapperElement.width(), 100, 1, '100px');
          assert.roughEqual(parseFloat(splitterWrapper.css('left')), 100 - splitterOffset, 1, 'splitter position 100');
          assert.roughEqual(ganttWrapperElement.width(), 900, 3, '900px');
        });
        test('showResources', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_RESOURCES_SELECTOR).length, data.resourceAssignments.length);
          this.instance.option('showResources', false);
          assert.equal(this.$element.find(Consts.TASK_RESOURCES_SELECTOR).length, 0);
          this.instance.option('showResources', true);
          assert.equal(this.$element.find(Consts.TASK_RESOURCES_SELECTOR).length, data.resourceAssignments.length);
        });
        test('showDependencies', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_ARROW_SELECTOR).length, data.dependencies.length);
          this.instance.option('showDependencies', false);
          assert.equal(this.$element.find(Consts.TASK_ARROW_SELECTOR).length, 0);
          this.instance.option('showDependencies', true);
          assert.equal(this.$element.find(Consts.TASK_ARROW_SELECTOR).length, data.dependencies.length);
        });
        test('taskTitlePosition', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var milestoneCount = data.tasks.reduce(function(count, t) {
            return t.start.getTime() === t.end.getTime() ? count + 1 : count;
          }, 0);
          assert.equal(this.$element.find(Consts.TASK_TITLE_IN_SELECTOR).length, data.tasks.length - milestoneCount);
          assert.equal(this.$element.find(Consts.TASK_TITLE_OUT_SELECTOR).length, 0);
          this.instance.option('taskTitlePosition', 'none');
          assert.equal(this.$element.find(Consts.TASK_TITLE_IN_SELECTOR).length, 0);
          assert.equal(this.$element.find(Consts.TASK_TITLE_OUT_SELECTOR).length, 0);
          this.instance.option('taskTitlePosition', 'outside');
          assert.equal(this.$element.find(Consts.TASK_TITLE_IN_SELECTOR).length, 0);
          assert.equal(this.$element.find(Consts.TASK_TITLE_OUT_SELECTOR).length, data.tasks.length);
        });
        test('expr', function(assert) {
          var tasksDS = [{
            'i': 1,
            'pid': 0,
            't': 'Software Development',
            's': new Date('2019-02-21T05:00:00.000Z'),
            'e': new Date('2019-07-04T12:00:00.000Z'),
            'p': 31,
            'c': 'rgb(255, 0, 0)'
          }, {
            'i': 2,
            'pid': 1,
            't': 'Scope',
            's': new Date('2019-02-21T05:00:00.000Z'),
            'e': new Date('2019-02-26T09:00:00.000Z'),
            'p': 60
          }, {
            'i': 3,
            'pid': 2,
            't': 'Determine project scope',
            's': new Date('2019-02-21T05:00:00.000Z'),
            'e': new Date('2019-02-21T09:00:00.000Z'),
            'p': 100
          }];
          var dependenciesDS = [{
            'i': 0,
            'pid': 1,
            'sid': 2,
            't': 0
          }];
          var resourcesDS = [{
            'i': 1,
            't': 'Management',
            'c': 'rgb(0, 255, 0)'
          }];
          var resourceAssignmentsDS = [{
            'i': 0,
            'tid': 3,
            'rid': 1
          }];
          var options = {
            tasks: {
              dataSource: tasksDS,
              keyExpr: 'i',
              parentIdExpr: 'pid',
              startExpr: 's',
              endExpr: 'e',
              progressExpr: 'p',
              titleExpr: 't',
              colorExpr: 'c'
            },
            dependencies: {
              dataSource: dependenciesDS,
              keyExpr: 'i',
              predecessorIdExpr: 'pid',
              successorIdExpr: 'sid',
              typeExpr: 't'
            },
            resources: {
              dataSource: resourcesDS,
              keyExpr: 'i',
              textExpr: 't',
              colorExpr: 'c'
            },
            resourceAssignments: {
              dataSource: resourceAssignmentsDS,
              keyExpr: 'i',
              taskIdExpr: 'tid',
              resourceIdExpr: 'rid'
            },
            columns: ['t']
          };
          this.createInstance(options);
          this.clock.tick(10);
          var taskWrapperElements = this.$element.find(Consts.TASK_WRAPPER_SELECTOR);
          assert.equal(taskWrapperElements.length, tasksDS.length);
          var firstTitle = taskWrapperElements.first().children().children().first().text();
          assert.equal(firstTitle, tasksDS[0].t);
          var firstElementBackgroundColor = taskWrapperElements.first().children().css('background-color');
          assert.equal(firstElementBackgroundColor, tasksDS[0].c);
          var firstProgressElement = taskWrapperElements.first().children().children().last();
          assert.ok(firstProgressElement.width() > 0);
          var $firstTreeListRowText = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).first().find('.dx-treelist-text-content').first().text();
          assert.equal($firstTreeListRowText, tasksDS[0].t, 'treeList has title text');
          var dependencyElements = this.$element.find(Consts.TASK_ARROW_SELECTOR);
          assert.equal(dependencyElements.length, dependenciesDS.length);
          var resourceElements = this.$element.find(Consts.TASK_RESOURCES_SELECTOR);
          assert.equal(resourceElements.length, resourceAssignmentsDS.length);
          assert.equal(resourceElements.first().text(), resourcesDS[0].t);
          assert.equal(resourceElements.first().css('background-color'), resourcesDS[0].c);
        });
        test('columns', function(assert) {
          var options = {
            tasks: {dataSource: data.tasks},
            columns: [{
              dataField: 'title',
              caption: 'Subject'
            }, {
              dataField: 'start',
              caption: 'Start Date'
            }]
          };
          this.createInstance(options);
          this.clock.tick(10);
          var $treeListHeaderRow = this.$element.find(Consts.TREELIST_HEADER_ROW_SELECTOR);
          assert.equal($treeListHeaderRow.children().length, 2, 'treeList has 2 columns');
          assert.equal($treeListHeaderRow.children().eq(0).text(), 'Subject', 'first column title is checked');
          assert.equal($treeListHeaderRow.children().eq(1).text(), 'Start Date', 'second column title is checked');
          this.instance.option('columns[0].visible', false);
          $treeListHeaderRow = this.$element.find(Consts.TREELIST_HEADER_ROW_SELECTOR);
          assert.equal($treeListHeaderRow.children().length, 1, 'treeList has 1 visible columns');
          assert.equal($treeListHeaderRow.children().eq(0).text(), 'Start Date', 'first visible column title is checked');
          this.instance.option('columns', [{
            dataField: 'title',
            caption: 'Task'
          }]);
          $treeListHeaderRow = this.$element.find(Consts.TREELIST_HEADER_ROW_SELECTOR);
          assert.equal($treeListHeaderRow.children().length, 1, 'treeList has 1 columns');
          assert.equal($treeListHeaderRow.children().eq(0).text(), 'Task', 'first column title is checked');
        });
        test('selectedRowKey', function(assert) {
          var selectedRowKey = 2;
          var options = {
            tasks: {dataSource: data.tasks},
            selectedRowKey: selectedRowKey
          };
          this.createInstance(options);
          this.clock.tick(10);
          var treeListSelectedRowKeys = this.instance._treeList.option('selectedRowKeys');
          assert.equal(treeListSelectedRowKeys.length, 1, 'only one treeList row is selected');
          assert.equal(treeListSelectedRowKeys, selectedRowKey, 'second treeList row is selected');
          this.instance.option('selectedRowKey', undefined);
          assert.equal(this.$element.find(Consts.SELECTION_SELECTOR).length, 0);
          this.instance.option('selectedRowKey', 1);
          assert.equal(this.$element.find(Consts.SELECTION_SELECTOR).length, 1);
          this.instance.option('selectedRowKey', undefined);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.SELECTION_SELECTOR).length, 0);
        });
        test('allowSelection', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          this.instance.option('selectedRowKey', 1);
          assert.equal(this.$element.find(Consts.SELECTION_SELECTOR).length, 1);
          this.instance.option('allowSelection', false);
          assert.equal(this.$element.find(Consts.SELECTION_SELECTOR).length, 0);
        });
        test('showRowLines', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          assert.ok(this.$element.find(Consts.GANTT_VIEW_HORIZONTAL_BORDER_SELECTOR).length > 0, 'ganttView has borders by default');
          assert.equal(this.instance._treeList.option('showRowLines'), true, 'treeList has borders by default');
          this.instance.option('showRowLines', false);
          assert.equal(this.$element.find(Consts.GANTT_VIEW_HORIZONTAL_BORDER_SELECTOR).length, 0, 'ganttView has no borders');
          assert.equal(this.instance._treeList.option('showRowLines'), false, 'treeList has no borders');
          this.instance.option('showRowLines', true);
          assert.ok(this.$element.find(Consts.GANTT_VIEW_HORIZONTAL_BORDER_SELECTOR).length > 0, 'ganttView has borders');
          assert.equal(this.instance._treeList.option('showRowLines'), true, 'treeList has borders');
        });
        test('editing', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var coreEditingSettings = getGanttViewCore(this.instance).settings.editing;
          assert.equal(coreEditingSettings.enabled, false, 'editing is prohibited by default');
          assert.equal(coreEditingSettings.allowTaskInsert, true, 'task adding allowed by default');
          assert.equal(coreEditingSettings.allowTaskDelete, true, 'task deleting allowed by default');
          assert.equal(coreEditingSettings.allowTaskUpdate, true, 'task updating allowed by default');
          assert.equal(coreEditingSettings.allowDependencyInsert, true, 'dependency adding allowed by default');
          assert.equal(coreEditingSettings.allowDependencyDelete, true, 'dependency deleting allowed by default');
          assert.equal(coreEditingSettings.allowResourceInsert, true, 'resource adding allowed by default');
          assert.equal(coreEditingSettings.allowResourceDelete, true, 'resource deleting allowed by default');
          assert.equal(coreEditingSettings.allowResourceUpdate, true, 'resource updating allowed by default');
          this.instance.option('editing', {
            enabled: true,
            allowTaskAdding: false,
            allowTaskDeleting: false,
            allowTaskUpdating: false,
            allowDependencyAdding: false,
            allowDependencyDeleting: false,
            allowResourceAdding: false,
            allowResourceDeleting: false,
            allowResourceUpdating: false,
            allowTaskResourceUpdating: false
          });
          coreEditingSettings = getGanttViewCore(this.instance).settings.editing;
          assert.equal(coreEditingSettings.enabled, true, 'editing allowed');
          assert.equal(coreEditingSettings.allowTaskInsert, false, 'task adding is prohibited');
          assert.equal(coreEditingSettings.allowTaskDelete, false, 'task deleting is prohibited');
          assert.equal(coreEditingSettings.allowTaskUpdate, false, 'task updating is prohibited');
          assert.equal(coreEditingSettings.allowDependencyInsert, false, 'dependency adding is prohibited');
          assert.equal(coreEditingSettings.allowDependencyDelete, false, 'dependency deleting is prohibited');
          assert.equal(coreEditingSettings.allowResourceInsert, false, 'resource adding is prohibited');
          assert.equal(coreEditingSettings.allowResourceDelete, false, 'resource deleting is prohibited');
          assert.equal(coreEditingSettings.allowResourceUpdate, false, 'resource updating is prohibited');
          assert.equal(coreEditingSettings.allowTaskResourceUpdate, false, 'task resource updating is prohibited');
          this.instance.option('editing.enabled', false);
          coreEditingSettings = getGanttViewCore(this.instance).settings.editing;
          assert.equal(coreEditingSettings.enabled, false, 'editing is prohibited');
        });
        test('scaleType', function(assert) {
          var $__3 = this;
          var isHeaderContainsText = function(text) {
            return $__3.$element.find('.dx-gantt-tsa').eq(1).find('.dx-gantt-si').text().indexOf(text) > -1;
          };
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          assert.ok(isHeaderContainsText('January'), 'is months scale type (auto)');
          this.instance.option('scaleType', 'minutes');
          assert.ok(isHeaderContainsText('30'), 'is minutes scale type');
          this.instance.option('scaleType', 'hours');
          assert.ok(isHeaderContainsText('9:00 PM'), 'is hours scale type');
          this.instance.option('scaleType', 'days');
          assert.ok(isHeaderContainsText('Sat, 23 Feb'), 'is days scale type');
          this.instance.option('scaleType', 'weeks');
          assert.ok(isHeaderContainsText('Sun, 20 Jan - Sat, 26 Jan'), 'is weeks scale type');
          this.instance.option('scaleType', 'months');
          assert.ok(isHeaderContainsText('January'), 'is months scale type');
          this.instance.option('scaleType', 'quarters');
          assert.ok(isHeaderContainsText('Q1'), 'is quarters scale type');
          this.instance.option('scaleType', 'years');
          assert.ok(isHeaderContainsText('2008'), 'is years scale type');
          this.instance.option('tasks.dataSource', [{
            'id': 0,
            'title': 't',
            'start': '2019-02-21',
            'end': '2019-02-26'
          }]);
          assert.ok(isHeaderContainsText('2008'), 'is still years scale type');
          this.instance.option('scaleType', 'auto');
          assert.ok(isHeaderContainsText('Sun, 10 Feb'), 'is days scale type (auto)');
        });
        test('calculateCellValue for key', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.instance.option('columns', [{dataField: 'id'}]);
          this.clock.tick(10);
          var columns = this.instance._treeList.getVisibleColumns();
          assert.strictEqual(columns.length, 1);
          assert.strictEqual(columns[0].calculateCellValue({id: '54'}), '54', 'number');
          assert.strictEqual(columns[0].calculateCellValue({id: '54a'}), '54a', 'pseudo guid');
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
//# sourceMappingURL=options.tests.js.map