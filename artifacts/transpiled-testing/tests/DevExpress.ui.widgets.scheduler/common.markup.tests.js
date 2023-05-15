!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/common.markup.tests.js"], ["animation/fx","ui/scheduler/ui.scheduler","data/data_source/data_source","core/utils/date","ui/scheduler/appointments/dataProvider/appointmentDataProvider","../../helpers/scheduler/helpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/common.markup.tests.js", ["animation/fx", "ui/scheduler/ui.scheduler", "data/data_source/data_source", "core/utils/date", "ui/scheduler/appointments/dataProvider/appointmentDataProvider", "../../helpers/scheduler/helpers.js"], function($__export) {
  "use strict";
  var fx,
      dxScheduler,
      DataSource,
      dateUtils,
      AppointmentDataProvider,
      createWrapper,
      initTestMarkup,
      checkDateTime,
      tasks,
      moduleConfig;
  return {
    setters: [function($__m) {
      fx = $__m.default;
    }, function($__m) {
      dxScheduler = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      dateUtils = $__m.default;
    }, function($__m) {
      AppointmentDataProvider = $__m.AppointmentDataProvider;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
    }],
    execute: function() {
      QUnit.testStart(function() {
        initTestMarkup();
      });
      checkDateTime = function(assert, actualDate, expectedDate, messagePrefix) {
        assert.equal(actualDate.getHours(), expectedDate.getHours(), messagePrefix + 'Hours\'re OK');
        assert.equal(actualDate.getMinutes(), expectedDate.getMinutes(), messagePrefix + 'Minutes\'re OK');
        assert.equal(actualDate.getSeconds(), expectedDate.getSeconds(), messagePrefix + 'Seconds\'re OK');
        assert.equal(actualDate.getMilliseconds(), expectedDate.getMilliseconds(), messagePrefix + 'Milliseconds\'re OK');
      };
      tasks = [{
        text: 'Task 1',
        startDate: new Date(2015, 1, 9, 1, 0),
        endDate: new Date(2015, 1, 9, 2, 0)
      }, {
        text: 'Task 2',
        startDate: new Date(2015, 1, 9, 11, 0),
        endDate: new Date(2015, 1, 9, 12, 0)
      }];
      moduleConfig = {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          fx.off = true;
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      };
      QUnit.module('Scheduler markup', moduleConfig, function() {
        QUnit.test('Scheduler should be initialized', function(assert) {
          var scheduler = createWrapper();
          assert.ok(scheduler.instance instanceof dxScheduler, 'Scheduler was initialized');
        });
        QUnit.test('Scheduler should have a right css classes', function(assert) {
          var scheduler = createWrapper();
          assert.ok(scheduler.instance.$element().hasClass('dx-scheduler'), 'Scheduler has \'dx-scheduler\' css class');
          assert.ok(scheduler.instance.$element().hasClass('dx-widget'), 'Scheduler has \'dx-widget\' css class');
        });
        QUnit.test('Scheduler should not fail when dataSource is set', function(assert) {
          var data = new DataSource({store: tasks});
          var instance = createWrapper({
            dataSource: data,
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2015, 1, 9)
          }).instance;
          assert.ok(instance.appointmentDataProvider instanceof AppointmentDataProvider, 'Task model is initialized on scheduler init');
          assert.ok(instance.appointmentDataProvider.dataSource instanceof DataSource, 'Task model has data source instance');
        });
        QUnit.test('Scheduler should not fail when dataSource is set, timelineView', function(assert) {
          var data = new DataSource({store: tasks});
          var instance = createWrapper({
            dataSource: data,
            views: ['timelineDay'],
            currentView: 'timelineDay',
            currentDate: new Date(2015, 1, 9)
          }).instance;
          assert.ok(instance.appointmentDataProvider instanceof AppointmentDataProvider, 'Task model is initialized on scheduler init');
          assert.ok(instance.appointmentDataProvider.dataSource instanceof DataSource, 'Task model has data source instance');
        });
        QUnit.test('Scheduler should not fail when dataSource is set, timelineWeek', function(assert) {
          var data = new DataSource({store: tasks});
          var instance = createWrapper({
            dataSource: data,
            views: ['timelineWeek'],
            currentView: 'timelineWeek',
            currentDate: new Date(2015, 1, 9)
          }).instance;
          assert.ok(instance.appointmentDataProvider instanceof AppointmentDataProvider, 'Task model is initialized on scheduler init');
          assert.ok(instance.appointmentDataProvider.dataSource instanceof DataSource, 'Task model has data source instance');
        });
        QUnit.test('Scheduler should not fail when dataSource is set, agenda', function(assert) {
          var data = new DataSource({store: tasks});
          var instance = createWrapper({
            dataSource: data,
            views: ['agenda'],
            currentView: 'agenda',
            currentDate: new Date(2015, 1, 9)
          }).instance;
          assert.ok(instance.appointmentDataProvider instanceof AppointmentDataProvider, 'Task model is initialized on scheduler init');
          assert.ok(instance.appointmentDataProvider.dataSource instanceof DataSource, 'Task model has data source instance');
        });
        QUnit.test('Header & work space currentDate should not contain information about hours, minutes, seconds', function(assert) {
          var scheduler = createWrapper();
          var currentDate = scheduler.instance.option('currentDate');
          var header = scheduler.instance.getHeader();
          var workSpace = scheduler.instance.getWorkSpace();
          var headerCurrentDate = header.option('currentDate');
          var workSpaceCurrentDate = workSpace.option('currentDate');
          checkDateTime(assert, headerCurrentDate, dateUtils.trimTime(currentDate), 'header date');
          checkDateTime(assert, workSpaceCurrentDate, dateUtils.trimTime(currentDate), 'work space date');
          scheduler.instance.option('currentDate', new Date(2015, 1, 1, 10, 10, 10, 10));
          currentDate = scheduler.instance.option('currentDate');
          headerCurrentDate = header.option('currentDate'), workSpaceCurrentDate = workSpace.option('currentDate');
          checkDateTime(assert, currentDate, new Date(2015, 1, 1, 10, 10, 10, 10), 'current date: ');
          checkDateTime(assert, headerCurrentDate, new Date(2015, 1, 1), 'header date: ');
          checkDateTime(assert, workSpaceCurrentDate, new Date(2015, 1, 1), 'work space date ');
        });
      });
      QUnit.module('Scheduler with config', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Scheduler should not fail when crossScrollingEnabled is set', function(assert) {
          var scheduler = createWrapper();
          assert.strictEqual(scheduler.instance.getWorkSpace().option('crossScrollingEnabled'), false, 'option is OK');
          scheduler.instance.option('crossScrollingEnabled', true);
          assert.strictEqual(scheduler.instance.getWorkSpace().option('crossScrollingEnabled'), true, 'option is OK');
        });
        QUnit.test('Scheduler should not fail when crossScrollingEnabled is set, agenda view', function(assert) {
          createWrapper({
            crossScrollingEnabled: true,
            currentView: 'agenda'
          });
          assert.ok(true, 'Widget was successfully initialized');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["animation/fx","ui/scheduler/ui.scheduler","data/data_source/data_source","core/utils/date","ui/scheduler/appointments/dataProvider/appointmentDataProvider","../../helpers/scheduler/helpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("animation/fx"), require("ui/scheduler/ui.scheduler"), require("data/data_source/data_source"), require("core/utils/date"), require("ui/scheduler/appointments/dataProvider/appointmentDataProvider"), require("../../helpers/scheduler/helpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=common.markup.tests.js.map