!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/common.initialization.tests.js"], ["animation/fx","data/data_source/data_source","events/visibility_change","jquery","ui/scheduler/appointments/dataProvider/appointmentDataProvider","ui/widget/ui.errors","../../helpers/scheduler/helpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/common.initialization.tests.js", ["animation/fx", "data/data_source/data_source", "events/visibility_change", "jquery", "ui/scheduler/appointments/dataProvider/appointmentDataProvider", "ui/widget/ui.errors", "../../helpers/scheduler/helpers.js"], function($__export) {
  "use strict";
  var fx,
      DataSource,
      triggerHidingEvent,
      triggerShownEvent,
      $,
      AppointmentDataProvider,
      errors,
      createWrapper,
      initTestMarkup;
  return {
    setters: [function($__m) {
      fx = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      triggerHidingEvent = $__m.triggerHidingEvent;
      triggerShownEvent = $__m.triggerShownEvent;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      AppointmentDataProvider = $__m.AppointmentDataProvider;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
    }],
    execute: function() {
      initTestMarkup();
      QUnit.module('Initialization', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          sinon.spy(errors, 'log');
          fx.off = true;
          this.tasks = [{
            text: 'Task 1',
            startDate: new Date(2015, 1, 9, 1, 0),
            endDate: new Date(2015, 1, 9, 2, 0)
          }, {
            text: 'Task 2',
            startDate: new Date(2015, 1, 9, 11, 0),
            endDate: new Date(2015, 1, 9, 12, 0)
          }];
        },
        afterEach: function() {
          errors.log.restore();
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('Scheduler should have task model instance', function(assert) {
          var data = new DataSource({store: this.tasks});
          var instance = createWrapper({dataSource: data}).instance;
          assert.ok(instance.appointmentDataProvider instanceof AppointmentDataProvider, 'Task model is initialized on scheduler init');
          assert.ok(instance.appointmentDataProvider.dataSource instanceof DataSource, 'Task model has data source instance');
        });
        QUnit.test('Scheduler should work correctly when wrong timeZone was set', function(assert) {
          createWrapper({timeZone: 'Wrong/timeZone'});
          assert.ok(true, 'Widget works correctly');
        });
        QUnit.test('Scheduler shouldn\'t have paginate in default DataSource', function(assert) {
          var instance = createWrapper({dataSource: this.tasks}).instance;
          assert.notOk(instance.appointmentDataProvider.dataSource.paginate(), 'Paginate is false');
        });
        QUnit.test('Rendering inside invisible element', function(assert) {
          var scheduler = createWrapper();
          try {
            triggerHidingEvent($('#scheduler'));
            $('#scheduler').hide();
            scheduler.instance.option({
              dataSource: [{
                text: 'a',
                startDate: new Date(2015, 6, 8, 8, 0),
                endDate: new Date(2015, 6, 8, 17, 0),
                allDay: true
              }],
              currentDate: new Date(2015, 6, 8)
            });
          } finally {
            $('#scheduler').show();
            triggerShownEvent($('#scheduler'));
            this.clock.tick(10);
            assert.equal(scheduler.instance.$element().find('.dx-scheduler-appointment').length, 1, 'Appointment is rendered');
          }
        });
        QUnit.test('Data expressions should be compiled on init', function(assert) {
          var scheduler = createWrapper();
          var dataAccessors = scheduler.instance._dataAccessors;
          $.each(['startDate', 'endDate', 'startDateTimeZone', 'endDateTimeZone', 'text', 'description', 'allDay', 'recurrenceRule', 'recurrenceException'], function(_, field) {
            assert.ok($.isFunction(dataAccessors.getter[field]), '\'' + field + '\' getter is OK');
            assert.ok($.isFunction(dataAccessors.setter[field]), '\'' + field + '\' setter is OK');
          });
        });
        QUnit.test('RecurrenceRule expression should not be compiled, if recurrenceRuleExpr = null', function(assert) {
          var scheduler = createWrapper({
            'startDateExpr': '_startDate',
            'endDateExpr': '_endDate',
            'textExpr': '_text',
            'descriptionExpr': '_description',
            'allDayExpr': '_allDay',
            'recurrenceRuleExpr': null
          });
          var dataAccessors = scheduler.instance._dataAccessors;
          assert.strictEqual(dataAccessors.getter.recurrenceRule, undefined, 'getter for recurrenceRule is OK');
          assert.strictEqual(dataAccessors.setter.recurrenceRule, undefined, 'setter for recurrenceRule is OK');
        });
        QUnit.test('appointmentCollectorTemplate rendering args should be correct', function(assert) {
          createWrapper({
            dataSource: [{
              startDate: new Date(2015, 4, 24, 9, 10),
              endDate: new Date(2015, 4, 24, 11, 1),
              recurrenceRule: 'FREQ=DAILY;COUNT=2',
              allDay: true,
              text: 'Task 1'
            }, {
              startDate: new Date(2015, 4, 24, 9, 10),
              endDate: new Date(2015, 4, 24, 11, 1),
              allDay: true,
              recurrenceRule: 'FREQ=DAILY;COUNT=2',
              text: 'Task 2'
            }],
            maxAppointmentsPerCell: 1,
            currentDate: new Date(2015, 4, 24),
            views: ['month'],
            appointmentCollectorTemplate: function(data) {
              assert.equal(data.appointmentCount, 1, 'Appointments count is OK');
              assert.strictEqual(data.isCompact, false, 'Compact flag is ok');
            },
            currentView: 'month'
          });
        });
        [{
          startDayHour: 0,
          endDayHour: 0
        }, {
          startDayHour: 2,
          endDayHour: 0
        }].forEach(function(dayHours) {
          QUnit.test(("Generate error if startDayHour: " + dayHours.startDayHour + " >= endDayHour: " + dayHours.endDayHour), function(assert) {
            assert.throws(function() {
              createWrapper({
                currentDate: new Date(2015, 4, 24),
                views: ['day'],
                currentView: 'day',
                startDayHour: dayHours.startDayHour,
                endDayHour: dayHours.endDayHour
              });
            }, function(e) {
              return /E1058/.test(e.message);
            }, 'E1058 Error message');
            this.clock.tick(1000);
          });
        });
        [{
          startDayHour: 0,
          endDayHour: 24,
          cellDuration: 95
        }, {
          startDayHour: 8,
          endDayHour: 24,
          cellDuration: 90
        }].forEach(function(config) {
          QUnit.test(("Generate warning if cellDuration: " + config.cellDuration + " could not divide the range from startDayHour: " + config.startDayHour + " to the endDayHour: " + config.endDayHour + " into even intervals"), function(assert) {
            createWrapper({
              currentDate: new Date(2015, 4, 24),
              views: ['day'],
              currentView: 'day',
              startDayHour: config.startDayHour,
              endDayHour: config.endDayHour,
              cellDuration: config.cellDuration
            });
            assert.equal(errors.log.callCount, 1, 'warning has been called once');
            assert.equal(errors.log.getCall(0).args[0], 'W1015', 'warning has correct error id');
          });
        });
        [{
          startDayHour: 0,
          endDayHour: 24,
          cellDuration: 60
        }, {
          startDayHour: 8,
          endDayHour: 24,
          cellDuration: 10
        }].forEach(function(config) {
          QUnit.test(("Warning should not be generated if cellDuration: " + config.cellDuration + " could divide the range from startDayHour: " + config.startDayHour + " to the endDayHour: " + config.endDayHour + " into even intervals"), function(assert) {
            createWrapper({
              currentDate: new Date(2015, 4, 24),
              views: ['day'],
              currentView: 'day',
              startDayHour: config.startDayHour,
              endDayHour: config.endDayHour,
              cellDuration: config.cellDuration
            });
            assert.equal(errors.log.callCount, 0, 'there are not any warnings');
          });
        });
        QUnit.test('Header panel should be visible in "Day" view with intervalCount > 1 if crossScrollingEnabled: true, showAllDayPanel: false (T895058)', function(assert) {
          var scheduler = createWrapper({
            dataSource: [],
            views: [{
              type: 'day',
              intervalCount: 2
            }],
            crossScrollingEnabled: true,
            showAllDayPanel: false
          });
          var headerScrollableHeight = scheduler.workSpace.getHeaderScrollable().height();
          var headerHeight = scheduler.header.getElement().height();
          assert.ok(headerScrollableHeight >= headerHeight, 'HeaderScrollable height is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["animation/fx","data/data_source/data_source","events/visibility_change","jquery","ui/scheduler/appointments/dataProvider/appointmentDataProvider","ui/widget/ui.errors","../../helpers/scheduler/helpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("animation/fx"), require("data/data_source/data_source"), require("events/visibility_change"), require("jquery"), require("ui/scheduler/appointments/dataProvider/appointmentDataProvider"), require("ui/widget/ui.errors"), require("../../helpers/scheduler/helpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=common.initialization.tests.js.map