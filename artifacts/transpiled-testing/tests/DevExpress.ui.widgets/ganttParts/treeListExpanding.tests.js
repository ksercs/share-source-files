!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/treeListExpanding.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/treeListExpanding.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      Consts,
      test,
      tasks,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, test = $__4.test, $__4));
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
      QUnit.module('Expand state T1105252', moduleConfig, function() {
        test('check state after task edit', function(assert) {
          var options = {
            tasks: {dataSource: tasks.slice()},
            editing: {enabled: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
          this.clock.tick(10);
          this.instance.updateTask(1, {progress: tasks[0].progress + 1});
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
        });
        test('check state after datasource update (T1125635)', function(assert) {
          var options = {
            tasks: {dataSource: tasks.slice()},
            editing: {enabled: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
          this.clock.tick(10);
          this.instance.option('tasks', {dataSource: tasks.slice()});
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
        });
        test('check state after datasource update with 1 parent level (T1125635)', function(assert) {
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
            'parentId': 1,
            'title': 'Determine project scope',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-02-21T09:00:00.000Z'),
            'progress': 100
          }, {
            'id': 4,
            'parentId': 1,
            'title': 'Secure project sponsorship',
            'start': new Date('2019-02-21T10:00:00.000Z'),
            'end': new Date('2019-02-22T09:00:00.000Z'),
            'progress': 100
          }];
          var options = {
            tasks: {dataSource: my_tasks},
            editing: {enabled: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
          this.clock.tick(10);
          this.instance.option('tasks', {dataSource: my_tasks.slice(0, my_tasks.length)});
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
        });
        test('check state after datasource update with changed task inside collapsed (T1151048)', function(assert) {
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
            'parentId': 1,
            'title': 'Determine project scope',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-02-21T09:00:00.000Z'),
            'progress': 100
          }, {
            'id': 4,
            'parentId': 1,
            'title': 'Secure project sponsorship',
            'start': new Date('2019-02-21T10:00:00.000Z'),
            'end': new Date('2019-02-22T09:00:00.000Z'),
            'progress': 100
          }];
          var options = {
            tasks: {dataSource: my_tasks},
            editing: {enabled: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
          this.clock.tick(10);
          this.instance.option('tasks', {dataSource: my_tasks.slice(0, my_tasks.length - 1)});
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 3);
          assert.equal(this.instance._treeList.getVisibleRows().length, 3);
        });
        test('check state after datasource update with dynamically added tasks in source  (T1151048)', function(assert) {
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
            'parentId': 1,
            'title': 'Determine project scope',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-02-21T09:00:00.000Z'),
            'progress': 100
          }, {
            'id': 4,
            'parentId': 1,
            'title': 'Secure project sponsorship',
            'start': new Date('2019-02-21T10:00:00.000Z'),
            'end': new Date('2019-02-22T09:00:00.000Z'),
            'progress': 100
          }];
          var options = {
            tasks: {dataSource: my_tasks},
            editing: {enabled: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
          this.clock.tick(10);
          my_tasks.push({
            'id': 5,
            'parentId': 0,
            'title': 'New task 1',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          });
          my_tasks.push({
            'id': 6,
            'parentId': 5,
            'title': 'New task 2',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          });
          my_tasks.push({
            'id': 7,
            'parentId': 6,
            'title': 'New task 3',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          });
          this.instance.option('tasks', {dataSource: my_tasks});
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 4);
          assert.equal(this.instance._treeList.getVisibleRows().length, 4);
        });
        test('check state after datasource update with dynamically added tasks in source without collapse  (T1151048)', function(assert) {
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
            'parentId': 1,
            'title': 'Determine project scope',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-02-21T09:00:00.000Z'),
            'progress': 100
          }, {
            'id': 4,
            'parentId': 1,
            'title': 'Secure project sponsorship',
            'start': new Date('2019-02-21T10:00:00.000Z'),
            'end': new Date('2019-02-22T09:00:00.000Z'),
            'progress': 100
          }];
          var options = {
            tasks: {dataSource: my_tasks},
            editing: {enabled: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 4);
          assert.equal(this.instance._treeList.getVisibleRows().length, 4);
          this.clock.tick(10);
          my_tasks.push({
            'id': 5,
            'parentId': 0,
            'title': 'New task 1',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          });
          my_tasks.push({
            'id': 6,
            'parentId': 5,
            'title': 'New task 2',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          });
          my_tasks.push({
            'id': 7,
            'parentId': 6,
            'title': 'New task 3',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          });
          this.instance.option('tasks', {dataSource: my_tasks});
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 7);
          assert.equal(this.instance._treeList.getVisibleRows().length, 7);
        });
        test('check state after datasource update with dynamically added tasks in source and change hierarchy  (T1151048)', function(assert) {
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
            'parentId': 1,
            'title': 'Determine project scope',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-02-21T09:00:00.000Z'),
            'progress': 100
          }, {
            'id': 4,
            'parentId': 1,
            'title': 'Secure project sponsorship',
            'start': new Date('2019-02-21T10:00:00.000Z'),
            'end': new Date('2019-02-22T09:00:00.000Z'),
            'progress': 100
          }];
          var options = {
            tasks: {dataSource: my_tasks},
            editing: {enabled: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 4);
          assert.equal(this.instance._treeList.getVisibleRows().length, 4);
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
          this.clock.tick(10);
          var new_tasks = [{
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
            'parentId': 1,
            'title': 'Determine project scope',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-02-21T09:00:00.000Z'),
            'progress': 100
          }, {
            'id': 4,
            'parentId': 1,
            'title': 'Secure project sponsorship',
            'start': new Date('2019-02-21T10:00:00.000Z'),
            'end': new Date('2019-02-22T09:00:00.000Z'),
            'progress': 100
          }, {
            'id': 5,
            'parentId': 1,
            'title': 'New task 1',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          }, {
            'id': 6,
            'parentId': 0,
            'title': 'New task 2',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          }, {
            'id': 7,
            'parentId': 6,
            'title': 'New task 3',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          }];
          this.instance.option('tasks', {dataSource: new_tasks});
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 7);
          assert.equal(this.instance._treeList.getVisibleRows().length, 7);
        });
        test('check state after change task order in datasource (T1151048)', function(assert) {
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
            'parentId': 3,
            'title': 'Secure project sponsorship',
            'start': new Date('2019-02-21T10:00:00.000Z'),
            'end': new Date('2019-02-22T09:00:00.000Z'),
            'progress': 100
          }];
          var options = {
            tasks: {dataSource: my_tasks},
            editing: {enabled: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 4);
          assert.equal(this.instance._treeList.getVisibleRows().length, 4);
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
          this.clock.tick(10);
          var new_tasks = [{
            'id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          }, {
            'id': 3,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-02-26T09:00:00.000Z'),
            'progress': 60
          }, {
            'id': 2,
            'parentId': 3,
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
          }];
          this.instance.option('tasks', {dataSource: new_tasks});
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 4);
          assert.equal(this.instance._treeList.getVisibleRows().length, 4);
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
//# sourceMappingURL=treeListExpanding.tests.js.map