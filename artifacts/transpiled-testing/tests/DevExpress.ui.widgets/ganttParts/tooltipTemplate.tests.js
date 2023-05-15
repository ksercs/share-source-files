!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/tooltipTemplate.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/tooltipTemplate.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      Consts,
      options,
      data,
      getGanttViewCore,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
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
      QUnit.module('Tooltip Template', moduleConfig, function() {
        test('common', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          var ganttCore = getGanttViewCore(this.instance);
          ganttCore.taskEditController.show(0);
          ganttCore.taskEditController.showTaskInfo(0, 0);
          this.clock.tick(10);
          var tooltip = this.$element.find(Consts.TOOLTIP_SELECTOR);
          var tooltipText = tooltip.text();
          var taskTitle = data.tasks[0].title;
          assert.equal(tooltipText.indexOf(taskTitle), 0, 'Default tooltip works correctly');
          ganttCore.taskEditController.tooltip.showProgress(10, 10);
          tooltipText = tooltip.text();
          assert.notEqual(tooltipText.indexOf(10), -1, 'Default progress tooltip works correctly');
          ganttCore.taskEditController.tooltip.showTime(data.tasks[0].start, data.tasks[0].end);
          tooltipText = tooltip.text();
          assert.notEqual(tooltipText.indexOf('Start'), -1, 'Default time tooltip works correctly 1');
          assert.notEqual(tooltipText.indexOf('End'), -1, 'Default time tooltip works correctly 2');
        });
        test('custom text', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          var customTooltipText = 'TestTooltipText';
          var customTooltipFunction = function(item, container) {
            return customTooltipText;
          };
          var customTimeTooltipText = 'TestTimeTooltipText';
          var customTimeTooltipFunction = function(item, container) {
            return customTimeTooltipText;
          };
          var customProgressTooltipText = 'TestProgressTooltipText';
          var customProgressTooltipFunction = function(item, container) {
            return customProgressTooltipText;
          };
          this.clock.tick(10);
          this.instance.option('taskTooltipContentTemplate', customTooltipFunction);
          this.instance.option('taskTimeTooltipContentTemplate', customTimeTooltipFunction);
          this.instance.option('taskProgressTooltipContentTemplate', customProgressTooltipFunction);
          this.clock.tick(10);
          var ganttCore = getGanttViewCore(this.instance);
          ganttCore.taskEditController.show(0);
          ganttCore.taskEditController.showTaskInfo(0, 0);
          this.clock.tick(10);
          var tooltip = this.$element.find(Consts.TOOLTIP_SELECTOR);
          var tooltipText = tooltip.text();
          assert.equal(tooltipText, customTooltipText, 'Custom template text works correctly');
          ganttCore.taskEditController.tooltip.showProgress(10, 10);
          tooltipText = tooltip.text();
          assert.equal(tooltipText, customProgressTooltipText, 'Custom progress template text works correctly');
          ganttCore.taskEditController.tooltip.showTime(data.tasks[0].start, data.tasks[0].end);
          tooltipText = tooltip.text();
          assert.equal(tooltipText, customTimeTooltipText, 'Custom time template text works correctly');
        });
        test('custom jQuery', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          var customTooltipText = 'TestCustomTooltipJQuery';
          var customTooltipJQuery = $('<div>' + customTooltipText + '</div>');
          var customTimeTooltipText = 'TestCustomTimeTooltipJQuery';
          var customTimeTooltipJQuery = $('<div>' + customTimeTooltipText + '</div>');
          var customProgressTooltipText = 'TestCustomProgressTooltipJQuery';
          var customProgressTooltipJQuery = $('<div>' + customProgressTooltipText + '</div>');
          this.clock.tick(10);
          this.instance.option('taskTooltipContentTemplate', customTooltipJQuery);
          this.instance.option('taskTimeTooltipContentTemplate', customTimeTooltipJQuery);
          this.instance.option('taskProgressTooltipContentTemplate', customProgressTooltipJQuery);
          this.clock.tick(10);
          var ganttCore = getGanttViewCore(this.instance);
          ganttCore.taskEditController.show(0);
          ganttCore.taskEditController.showTaskInfo(0, 0);
          this.clock.tick(10);
          var tooltip = this.$element.find(Consts.TOOLTIP_SELECTOR);
          var tooltipText = tooltip.text();
          assert.equal(tooltipText, customTooltipText, 'Custom template with jQuery works correctly');
          ganttCore.taskEditController.tooltip.showProgress(10, 10);
          tooltipText = tooltip.text();
          assert.equal(tooltipText, customProgressTooltipText, 'Custom progress template text works correctly');
          ganttCore.taskEditController.tooltip.showTime(data.tasks[0].start, data.tasks[0].end);
          tooltipText = tooltip.text();
          assert.equal(tooltipText, customTimeTooltipText, 'Custom time template text works correctly');
        });
        test('different tooltips for tasks', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          var customTooltipText = 'TestTooltipText';
          var customTooltipFunction = function(task, container) {
            if (task.id === 3 || task.id === 4) {
              return customTooltipText;
            }
            return;
          };
          this.clock.tick(10);
          this.instance.option('taskTooltipContentTemplate', customTooltipFunction);
          this.clock.tick(10);
          var ganttCore = getGanttViewCore(this.instance);
          this.clock.tick(10);
          ganttCore.taskEditController.show(1);
          ganttCore.taskEditController.showTaskInfo(0, 0);
          this.clock.tick(10);
          var tooltipDisplayStyle = this.$element.find(Consts.TOOLTIP_SELECTOR)[0].style.display;
          assert.equal(tooltipDisplayStyle, 'none', 'Empty content template doesnt show tooltip');
          ganttCore.taskEditController.tooltip.hide();
          this.clock.tick(10);
          ganttCore.taskEditController.show(2);
          ganttCore.taskEditController.showTaskInfo(0, 0);
          this.clock.tick(10);
          var tooltipText = this.$element.find(Consts.TOOLTIP_SELECTOR).text();
          assert.equal(tooltipText, customTooltipText, 'Custom template text works correctly');
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
//# sourceMappingURL=tooltipTemplate.tests.js.map