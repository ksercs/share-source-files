!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/parentAutoCalculation.tests.js"], ["jquery","ui/gantt","core/utils/extend","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/parentAutoCalculation.tests.js", ["jquery", "ui/gantt", "core/utils/extend", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      extend,
      Consts,
      showTaskEditDialog,
      data,
      getGanttViewCore,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      extend = $__m.extend;
    }, function($__m) {
      Consts = $__m.Consts;
      showTaskEditDialog = $__m.showTaskEditDialog;
      data = $__m.data;
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
      QUnit.module('Parent auto calculation', moduleConfig, function() {
        test('render', function(assert) {
          var options = {
            tasks: {dataSource: data.tasks},
            validation: {autoUpdateParentTasks: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var $stripLines = this.$element.find(Consts.PARENT_TASK_SELECTOR);
          assert.ok($stripLines.length > 0, 'parent tasks has className');
        });
        test('first load data', function(assert) {
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
          var options = {
            tasks: {dataSource: tasks},
            validation: {autoUpdateParentTasks: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var dataToCheck = [];
          this.instance._onParentTasksRecalculated = function(data) {
            dataToCheck = data;
          };
          getGanttViewCore(this.instance).viewModel.updateModel(true);
          this.clock.tick(10);
          assert.equal(dataToCheck.length, 3, 'length');
          assert.equal(dataToCheck[0].start, start, 'parent 0 start date');
          assert.equal(dataToCheck[0].end, end, 'parent 0 end date');
          assert.ok(dataToCheck[0].progress > 0, 'parent 0 progress eq 0');
          assert.equal(dataToCheck[1].start, start, 'parent 1 start date');
          assert.equal(dataToCheck[1].end, end, 'parent 1 end date');
          assert.ok(dataToCheck[1].progress > 0, 'parent 1 progress eq 0');
          assert.equal(dataToCheck[2].start, start, 'child start date');
          assert.equal(dataToCheck[2].end, end, 'child 1 end date');
          assert.equal(dataToCheck[2].progress, 50, 'child progress');
        });
        test('mode changing', function(assert) {
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
          var options = {tasks: {dataSource: tasks}};
          this.createInstance(options);
          var dataToCheck = [];
          this.instance._onParentTasksRecalculated = function(data) {
            dataToCheck = data;
          };
          this.clock.tick(10);
          var $parentTasks = this.$element.find(Consts.PARENT_TASK_SELECTOR);
          assert.equal(dataToCheck.length, 0, 'length');
          assert.equal($parentTasks.length, 0, 'parent tasks exists');
          this.instance.option('validation.autoUpdateParentTasks', true);
          this.clock.tick(10);
          $parentTasks = this.$element.find(Consts.PARENT_TASK_SELECTOR);
          assert.equal($parentTasks.length, 2, 'parent tasks not exists');
          assert.equal(dataToCheck.length, 3, 'length');
          assert.equal(dataToCheck[0].start, start, 'parent 0 start date');
          assert.equal(dataToCheck[0].end, end, 'parent 0 end date');
          assert.ok(dataToCheck[0].progress > 0, 'parent 0 progress eq 0');
          assert.equal(dataToCheck[1].start, start, 'parent 1 start date');
          assert.equal(dataToCheck[1].end, end, 'parent 1 end date');
          assert.ok(dataToCheck[1].progress > 0, 'parent 1 progress eq 0');
          assert.equal(dataToCheck[2].start, start, 'child start date');
          assert.equal(dataToCheck[2].end, end, 'child 1 end date');
          assert.equal(dataToCheck[2].progress, 50, 'child progress');
          dataToCheck = [];
          this.instance.option('validation.autoUpdateParentTasks', false);
          this.clock.tick(10);
          $parentTasks = this.$element.find(Consts.PARENT_TASK_SELECTOR);
          assert.equal(dataToCheck.length, 0, 'length');
          assert.equal($parentTasks.length, 0, 'parent tasks exists');
        });
        test('custom fields load', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'idKey': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0,
            'customField': 'test0'
          }, {
            'idKey': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 0,
            'customField': 'test1'
          }, {
            'idKey': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50,
            'customField': 'test2'
          }];
          var options = {
            tasks: {
              dataSource: tasks,
              keyExpr: 'idKey'
            },
            validation: {autoUpdateParentTasks: true},
            columns: [{
              dataField: 'customField',
              caption: 'custom'
            }]
          };
          this.createInstance(options);
          this.clock.tick(10);
          var customCellText0 = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).first().find('td').first().text();
          var customCellText1 = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).eq(1).find('td').first().text();
          var customCellText2 = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).last().find('td').first().text();
          assert.equal(customCellText0, 'test0', 'custom fields text not shown');
          assert.equal(customCellText1, 'test1', 'custom fields text not shown');
          assert.equal(customCellText2, 'test2', 'custom fields text not shown');
        });
        test('edit title (T891411)', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'idKey': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0,
            'customField': 'test0'
          }, {
            'idKey': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 0,
            'customField': 'test1'
          }, {
            'idKey': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50,
            'customField': 'test2'
          }];
          var options = {
            tasks: {
              dataSource: tasks,
              keyExpr: 'idKey'
            },
            editing: {enabled: true},
            validation: {autoUpdateParentTasks: true}
          };
          this.createInstance(options);
          this.instance.option('selectedRowKey', 1);
          this.clock.tick(10);
          showTaskEditDialog(this.instance);
          this.clock.tick(10);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          var $inputs = $dialog.find(Consts.INPUT_TEXT_EDITOR_SELECTOR);
          assert.equal($inputs.eq(0).val(), tasks[0].title, 'title text is shown');
          var testTitle = 'text';
          var titleTextBox = $dialog.find('.dx-textbox').eq(0).dxTextBox('instance');
          titleTextBox.option('value', testTitle);
          var $okButton = $dialog.find('.dx-popup-bottom').find('.dx-button').eq(0);
          $okButton.trigger('dxclick');
          this.clock.tick(10);
          var firstTreeListTitleText = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).first().find('td').eq(2).text();
          assert.equal(firstTreeListTitleText, testTitle, 'title text was modified');
        });
        test('onTaskUpdated is triggered when auto update parents on', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var values;
          var tasks = [{
            'my_id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 10
          }, {
            'my_id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 20
          }, {
            'my_id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 40
          }, {
            'my_id': 4,
            'parentId': 2,
            'title': 'Determine project scope 2',
            'start': start,
            'end': end,
            'progress': 80
          }];
          var tasksCount = tasks.length;
          var options = {
            tasks: {
              keyExpr: 'my_id',
              dataSource: tasks
            },
            editing: {enabled: true},
            validation: {autoUpdateParentTasks: true}
          };
          this.createInstance(options);
          this.instance.option('onTaskUpdated', function(e) {
            values = e.values;
          });
          this.clock.tick(10);
          this.instance.deleteTask(4);
          this.clock.tick(500);
          assert.equal(tasks.length, tasksCount - 1, 'task was deleted');
          assert.equal(tasks[2].progress, values.progress, 'onTaskUpdated is triggrered');
        });
        test('onTaskUpdated is triggered after child is updated when auto update parents on', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var values;
          var tasks = [{
            'my_id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 10
          }, {
            'my_id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 20
          }, {
            'my_id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 40
          }, {
            'my_id': 4,
            'parentId': 2,
            'title': 'Determine project scope 2',
            'start': start,
            'end': end,
            'progress': 80
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
          this.instance.option('onTaskUpdated', function(e) {
            values = e.values;
          });
          this.clock.tick(10);
          this.instance.updateTask(4, {'end': new Date('2020-02-20')});
          this.clock.tick(500);
          assert.notDeepEqual(tasks[2].end, values.end, 'onTaskUpdated is triggrered');
        });
        test('onTaskUpdated for parents is triggered and data source updated (T1034724)', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var updated = {};
          var tasks = [{
            'my_id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 10
          }, {
            'my_id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-20'),
            'progress': 20
          }, {
            'my_id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 40
          }, {
            'my_id': 4,
            'parentId': 2,
            'title': 'Determine project scope 2',
            'start': start,
            'end': end,
            'progress': 80
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
          this.instance.option('onTaskUpdated', function(e) {
            if (!updated[e.key]) {
              updated[e.key] = {};
            }
            extend(updated[e.key], e.values);
          });
          this.clock.tick(10);
          var newEnd = new Date('2020-02-27');
          this.instance.updateTask(4, {'end': newEnd});
          this.clock.tick(500);
          assert.equal(updated['4'].end, newEnd, 'event triggered for child');
          assert.equal(updated['2'].end, newEnd, 'event triggered for parent');
          assert.equal(tasks[1].end, newEnd, 'parent updated in data source');
          assert.equal(tasks[3].end, newEnd, 'parent updated in data source');
        });
        test('collapse all on content ready (T1109231)', function(assert) {
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
            'start': new Date('2019-02-19'),
            'end': new Date('2019-02-26'),
            'progress': 50
          }];
          var options = {
            tasks: {dataSource: tasks},
            validation: {autoUpdateParentTasks: true},
            onContentReady: function(e) {
              e.component.collapseAll();
            }
          };
          this.createInstance(options);
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/gantt","core/utils/extend","../../../helpers/ganttHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/gantt"), require("core/utils/extend"), require("../../../helpers/ganttHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=parentAutoCalculation.tests.js.map