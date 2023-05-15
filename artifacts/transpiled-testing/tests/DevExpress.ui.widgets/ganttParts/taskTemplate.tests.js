!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/taskTemplate.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/taskTemplate.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
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
      QUnit.module('Task Template', moduleConfig, function() {
        test('common', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          var taskText = this.$element.find(Consts.TASK_SELECTOR)[0].textContent;
          var taskTitle = data.tasks[0].title;
          assert.equal(taskText.indexOf(taskTitle), 0, 'Default task works correctly');
        });
        test('custom text', function(assert) {
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
            'title': 'Scope',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-23'),
            'progress': 0
          }, {
            'id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-26'),
            'progress': 50
          }];
          var customTaskText = 'TestTaskText';
          var customTaskFunction = function(item, container) {
            return customTaskText;
          };
          var options = {
            tasks: {dataSource: customTasks},
            taskContentTemplate: customTaskFunction
          };
          this.createInstance(options);
          this.clock.tick(10);
          var elements = this.$element.find(Consts.TASK_WRAPPER_SELECTOR);
          assert.equal(elements.length, customTasks.length, 'Should render task wrapper for each task');
          this.clock.tick(10);
          var taskText = this.$element.find(Consts.TASK_WRAPPER_SELECTOR).first().text();
          assert.equal(taskText, customTaskText, 'Custom task text works correctly');
        });
        test('custom jQuery', function(assert) {
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
            'title': 'Scope',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-23'),
            'progress': 0
          }, {
            'id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-26'),
            'progress': 50
          }];
          var customTaskText = 'TestCustomTooltipJQuery';
          var customTaskFunction = $('<div>' + customTaskText + '</div>');
          var options = {
            tasks: {dataSource: customTasks},
            taskContentTemplate: customTaskFunction
          };
          this.createInstance(options);
          this.clock.tick(10);
          var taskText = this.$element.find(Consts.TASK_WRAPPER_SELECTOR).first().text();
          assert.equal(taskText, customTaskText, 'Custom template with jQuery works correctly');
        });
        test('check default settings', function(assert) {
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
            'title': 'Scope',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-23'),
            'progress': 0
          }, {
            'id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-26'),
            'progress': 50
          }, {
            'id': 4,
            'parentId': 2,
            'title': 'Project scope 1',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-26'),
            'progress': 50
          }];
          var customTaskText = 'TestTaskText';
          var customTaskFunction = function(item, container) {
            assert.ok(item.taskData, 'item.taskData');
            assert.ok(item.cellSize, 'item.cellSize');
            assert.ok(item.taskHTML, 'item.taskHTML');
            assert.ok(item.taskPosition, 'item.taskPosition');
            assert.ok(item.taskSize, 'item.taskSize');
            assert.notOk(item.isMilestone, 'item.isMilestone');
            assert.ok(item.taskResources, 'item.taskResources');
            if (item.taskData.id === 3 || item.taskData.id === 4) {
              return;
            }
            return customTaskText;
          };
          var options = {
            tasks: {dataSource: customTasks},
            taskContentTemplate: customTaskFunction
          };
          this.createInstance(options);
          this.clock.tick(10);
          var taskWrapperElements = this.$element.find(Consts.TASK_WRAPPER_SELECTOR);
          var taskText = taskWrapperElements[1].textContent;
          assert.equal(taskText, customTaskText, 'Custom task text works correctly');
          assert.equal(this.instance.getVisibleTaskKeys().length, 2, 'task keys');
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
//# sourceMappingURL=taskTemplate.tests.js.map