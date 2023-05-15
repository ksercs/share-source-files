!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/common.options.tests.js"], ["core/utils/size","core/config","core/devices","data/custom_store","data/data_source/data_source","events/visibility_change","jquery","ui/scheduler/workspaces/ui.scheduler.work_space_day","ui/widget/ui.errors","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","../../helpers/scheduler/helpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/common.options.tests.js", ["core/utils/size", "core/config", "core/devices", "data/custom_store", "data/data_source/data_source", "events/visibility_change", "jquery", "ui/scheduler/workspaces/ui.scheduler.work_space_day", "ui/widget/ui.errors", "../../helpers/keyboardMock.js", "../../helpers/pointerMock.js", "../../helpers/scheduler/helpers.js"], function($__export) {
  "use strict";
  var getOuterHeight,
      config,
      devices,
      CustomStore,
      DataSource,
      triggerHidingEvent,
      triggerShownEvent,
      $,
      dxSchedulerWorkSpaceDay,
      errors,
      keyboardMock,
      pointerMock,
      createWrapper,
      initTestMarkup,
      checkDate;
  return {
    setters: [function($__m) {
      getOuterHeight = $__m.getOuterHeight;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      triggerHidingEvent = $__m.triggerHidingEvent;
      triggerShownEvent = $__m.triggerShownEvent;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dxSchedulerWorkSpaceDay = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
    }],
    execute: function() {
      initTestMarkup();
      checkDate = function(instance, assert) {
        var workSpace = instance.getWorkSpace();
        var workSpaceCurrentDate = workSpace.option('currentDate');
        var header = instance.getHeader();
        var headerCurrentDate = header.option('currentDate');
        assert.ok(workSpaceCurrentDate instanceof Date, 'date is instance of Date constructor');
        assert.equal(workSpaceCurrentDate.getFullYear(), 2015, 'Year is OK');
        assert.equal(workSpaceCurrentDate.getMonth(), 4, 'Month is OK');
        assert.equal(workSpaceCurrentDate.getDate(), 13, 'Date is OK');
        assert.ok(headerCurrentDate instanceof Date, 'date is instance of Date constructor');
        assert.equal(headerCurrentDate.getFullYear(), 2015, 'Year is OK');
        assert.equal(headerCurrentDate.getMonth(), 4, 'Month is OK');
        assert.equal(headerCurrentDate.getDate(), 13, 'Date is OK');
      };
      QUnit.module('Options', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          sinon.spy(errors, 'log');
        },
        afterEach: function() {
          this.clock.restore();
          errors.log.restore();
        }
      }, function() {
        QUnit.test('Data expressions should be recompiled on optionChanged', function(assert) {
          var scheduler = createWrapper();
          var repaintStub = sinon.stub(scheduler.instance, 'repaint');
          try {
            scheduler.instance.option({
              'startDateExpr': '_startDate',
              'endDateExpr': '_endDate',
              'startDateTimeZoneExpr': '_startDateTimeZone',
              'endDateTimeZoneExpr': '_endDateTimeZone',
              'textExpr': '_text',
              'descriptionExpr': '_description',
              'allDayExpr': '_allDay',
              'recurrenceRuleExpr': '_recurrenceRule',
              'recurrenceExceptionExpr': '_recurrenceException',
              'disabledExpr': '_disabled'
            });
            var data = {
              startDate: new Date(2017, 2, 22),
              endDate: new Date(2017, 2, 23),
              startDateTimeZone: 'America/Los_Angeles',
              endDateTimeZone: 'America/Los_Angeles',
              text: 'a',
              description: 'b',
              allDay: true,
              recurrenceRule: 'abc',
              recurrenceException: 'def',
              disabled: false
            };
            var appointment = {
              _startDate: data.startDate,
              _endDate: data.endDate,
              _startDateTimeZone: data.startDateTimeZone,
              _endDateTimeZone: data.endDateTimeZone,
              _text: data.text,
              _description: data.description,
              _allDay: data.allDay,
              _recurrenceRule: data.recurrenceRule,
              _recurrenceException: data.recurrenceException,
              _disabled: data.disabled
            };
            var dataAccessors = scheduler.instance._dataAccessors;
            $.each(dataAccessors.getter, function(name, getter) {
              assert.equal(dataAccessors.getter[name](appointment), data[name], 'getter for ' + name + ' is OK');
            });
            $.each(dataAccessors.setter, function(name, getter) {
              dataAccessors.setter[name](appointment, 'xyz');
              assert.equal(appointment['_' + name], 'xyz', 'setter for ' + name + ' is OK');
            });
          } finally {
            repaintStub.restore();
          }
        });
        QUnit.test('Data expressions should be recompiled on optionChanged and passed to appointmentDataProvider', function(assert) {
          var instance = createWrapper().instance;
          var repaintStub = sinon.stub(instance, 'repaint');
          try {
            var appointmentDataProvider = instance.appointmentDataProvider;
            instance.option({
              'startDateExpr': '_startDate',
              'endDateExpr': '_endDate',
              'startDateTimeZoneExpr': '_startDateTimeZone',
              'endDateTimeZoneExpr': '_endDateTimeZone',
              'textExpr': '_text',
              'descriptionExpr': '_description',
              'allDayExpr': '_allDay',
              'recurrenceRuleExpr': '_recurrenceRule',
              'recurrenceExceptionExpr': '_recurrenceException'
            });
            var dataAccessors = instance._dataAccessors;
            assert.deepEqual(dataAccessors.getter, appointmentDataProvider.dataAccessors.getter, 'dataAccessors getters were passed to appointmentDataProvider');
            assert.deepEqual(dataAccessors.setter, appointmentDataProvider.dataAccessors.setter, 'dataAccessors setters were passed to appointmentDataProvider');
            assert.deepEqual(dataAccessors.expr, appointmentDataProvider.dataAccessors.expr, 'dataExpressions were passed to appointmentDataProvider');
            assert.deepEqual(dataAccessors.resources, appointmentDataProvider.dataAccessors.resources, 'resources were passed to appointmentDataProvider');
          } finally {
            repaintStub.restore();
          }
        });
        QUnit.test('Appointment should be rendered correctly after expression changing', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              text: 'a',
              StartDate: new Date(2015, 6, 8, 8, 0),
              endDate: new Date(2015, 6, 8, 17, 0),
              allDay: true
            }],
            currentDate: new Date(2015, 6, 8)
          });
          scheduler.instance.option('startDateExpr', 'StartDate');
          this.clock.tick(10);
          assert.equal(scheduler.instance.$element().find('.dx-scheduler-appointment').length, 1, 'Appointment is rendered');
        });
        QUnit.test('Sheduler should be repainted after data expression option changing', function(assert) {
          var scheduler = createWrapper();
          var repaintStub = sinon.stub(scheduler.instance, 'repaint');
          try {
            scheduler.instance.option({
              'startDateExpr': '_startDate',
              'endDateExpr': '_endDate',
              'startDateTimeZoneExpr': '_startDateTimeZone',
              'endDateTimeZoneExpr': '_endDateTimeZone',
              'textExpr': '_text',
              'descriptionExpr': '_description',
              'allDayExpr': '_allDay',
              'recurrenceRuleExpr': '_recurrenceRule',
              'recurrenceExceptionExpr': '_recurrenceException'
            });
            assert.equal(repaintStub.callCount, 9, 'Scheduler was repainted');
          } finally {
            repaintStub.restore();
          }
        });
        QUnit.test('Sheduler should have correct default template after data expression option changing', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              text: 'a',
              TEXT: 'New Text',
              startDate: new Date(2015, 6, 8, 8, 0),
              endDate: new Date(2015, 6, 8, 17, 0),
              allDay: true
            }],
            currentDate: new Date(2015, 6, 8)
          });
          scheduler.instance.option({textExpr: 'TEXT'});
          assert.equal(scheduler.instance.$element().find('.dx-scheduler-appointment-title').eq(0).text(), 'New Text', 'Appointment template is correct');
        });
        QUnit.test('Changing of \'currentView\' option after initializing should work correctly', function(assert) {
          var scheduler = createWrapper({
            currentDate: new Date(2018, 0, 30),
            views: ['day', 'week'],
            currentView: 'week',
            onInitialized: function(e) {
              e.component.option('currentView', 'day');
            }
          });
          assert.ok(scheduler.instance.getWorkSpace() instanceof dxSchedulerWorkSpaceDay, 'correct view');
        });
        QUnit.test('It should be possible to init currentDate as timestamp', function(assert) {
          var scheduler = createWrapper({currentDate: 1431515985596});
          checkDate(scheduler.instance, assert);
        });
        QUnit.test('It should be possible to change currentDate using timestamp', function(assert) {
          var scheduler = createWrapper();
          scheduler.instance.option('currentDate', 1431515985596);
          checkDate(scheduler.instance, assert);
        });
        QUnit.test('Custom store should be loaded only once on the first rendering', function(assert) {
          var counter = 0;
          createWrapper({dataSource: new DataSource({store: new CustomStore({load: function() {
                  var d = $.Deferred();
                  setTimeout(function() {
                    d.resolve([]);
                    counter++;
                  }, 100);
                  return d.promise();
                }})})});
          this.clock.tick(200);
          assert.equal(counter, 1);
        });
        QUnit.test('Custom store should be loaded only once on dataSource option change', function(assert) {
          var counter = 0;
          var scheduler = createWrapper();
          scheduler.instance.option('dataSource', new DataSource({store: new CustomStore({load: function() {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve([]);
                  counter++;
                }, 100);
                return d.promise();
              }})}));
          this.clock.tick(200);
          assert.equal(counter, 1);
        });
        QUnit.test('allowAllDayResize option should be updated when current view is changed', function(assert) {
          var scheduler = createWrapper({currentView: 'day'});
          assert.notOk(scheduler.instance.getAppointmentsInstance().option('allowAllDayResize'));
          scheduler.instance.option('currentView', 'week');
          assert.ok(scheduler.instance.getAppointmentsInstance().option('allowAllDayResize'));
        });
        QUnit.test('allowAllDayResize option should depend on intervalCount', function(assert) {
          var scheduler = createWrapper({
            views: [{
              type: 'week',
              name: 'WEEK'
            }, {
              type: 'day',
              name: 'DAY'
            }, {
              type: 'day',
              name: 'DAY1',
              intervalCount: 3
            }],
            currentView: 'DAY'
          });
          assert.notOk(scheduler.instance.getAppointmentsInstance().option('allowAllDayResize'));
          scheduler.instance.option('currentView', 'DAY1');
          assert.ok(scheduler.instance.getAppointmentsInstance().option('allowAllDayResize'));
        });
        QUnit.test('showAllDayPanel option value = true on init', function(assert) {
          var scheduler = createWrapper();
          assert.equal(scheduler.instance.option('showAllDayPanel'), true, 'showAllDayPanel option value is right on init');
        });
        QUnit.test('showCurrentTimeIndicator should have right default', function(assert) {
          var scheduler = createWrapper();
          assert.equal(scheduler.instance.option('showCurrentTimeIndicator'), true, 'showCurrentTimeIndicator option value is right on init');
        });
        QUnit.test('customizeDateNavigatorText should be passed to header & navigator', function(assert) {
          var scheduler = createWrapper({
            currentView: 'week',
            currentDate: new Date(2017, 10, 25),
            customizeDateNavigatorText: function() {
              return 'abc';
            },
            views: ['week']
          });
          assert.equal(scheduler.header.navigator.caption.getText(), 'abc', 'option is passed correctly');
        });
        QUnit.test('groupByDate option should be passed to workSpace', function(assert) {
          var scheduler = createWrapper({
            currentView: 'week',
            groupByDate: false
          });
          var workSpaceWeek = scheduler.instance.getWorkSpace();
          assert.equal(workSpaceWeek.option('groupByDate'), false, 'workspace has correct groupByDate');
          scheduler.instance.option('groupByDate', true);
          assert.equal(workSpaceWeek.option('groupByDate'), true, 'workspace has correct groupByDate');
        });
        QUnit.test('showCurrentTimeIndicator option should be passed to workSpace', function(assert) {
          var scheduler = createWrapper({
            currentView: 'week',
            showCurrentTimeIndicator: false
          });
          var workSpaceWeek = scheduler.instance.getWorkSpace();
          assert.equal(workSpaceWeek.option('showCurrentTimeIndicator'), false, 'workspace has correct showCurrentTimeIndicator');
          scheduler.instance.option('showCurrentTimeIndicator', true);
          assert.equal(workSpaceWeek.option('showCurrentTimeIndicator'), true, 'workspace has correct showCurrentTimeIndicator');
        });
        QUnit.test('indicatorTime option should be passed to workSpace', function(assert) {
          var scheduler = createWrapper({
            currentView: 'week',
            indicatorTime: new Date(2017, 8, 19)
          });
          var workSpaceWeek = scheduler.instance.getWorkSpace();
          assert.deepEqual(workSpaceWeek.option('indicatorTime'), new Date(2017, 8, 19), 'workspace has correct indicatorTime');
          scheduler.instance.option('indicatorTime', new Date(2017, 8, 20));
          assert.deepEqual(workSpaceWeek.option('indicatorTime'), new Date(2017, 8, 20), 'workspace has correct indicatorTime');
        });
        QUnit.test('indicatorUpdateInterval should have right default', function(assert) {
          var scheduler = createWrapper({currentView: 'week'});
          assert.equal(scheduler.instance.option('indicatorUpdateInterval'), 300000, 'workspace has correct indicatorUpdateInterval');
        });
        QUnit.test('indicatorUpdateInterval option should be passed to workSpace', function(assert) {
          var scheduler = createWrapper({
            currentView: 'week',
            indicatorUpdateInterval: 2000
          });
          var workSpaceWeek = scheduler.instance.getWorkSpace();
          assert.equal(workSpaceWeek.option('indicatorUpdateInterval'), 2000, 'workspace has correct indicatorUpdateInterval');
          scheduler.instance.option('indicatorUpdateInterval', 3000);
          assert.equal(workSpaceWeek.option('indicatorUpdateInterval'), 3000, 'workspace has correct indicatorUpdateInterval');
        });
        QUnit.test('shadeUntilCurrentTime should have right default', function(assert) {
          var scheduler = createWrapper({currentView: 'week'});
          assert.equal(scheduler.instance.option('shadeUntilCurrentTime'), false, 'workspace has correct shadeUntilCurrentTime');
        });
        QUnit.test('shadeUntilCurrentTime option should be passed to workSpace', function(assert) {
          var scheduler = createWrapper({
            currentView: 'week',
            shadeUntilCurrentTime: false
          });
          var workSpaceWeek = scheduler.instance.getWorkSpace();
          assert.equal(workSpaceWeek.option('shadeUntilCurrentTime'), false, 'workspace has correct shadeUntilCurrentTime');
          scheduler.instance.option('shadeUntilCurrentTime', true);
          assert.equal(workSpaceWeek.option('shadeUntilCurrentTime'), true, 'workspace has correct shadeUntilCurrentTime');
        });
        QUnit.test('appointments should be repainted after scheduler dimensions changing', function(assert) {
          var data = [{
            id: 1,
            text: 'abc',
            startDate: new Date(2015, 1, 9, 10),
            endDate: new Date(2015, 1, 9, 10, 30)
          }];
          var scheduler = createWrapper({
            currentDate: new Date(2015, 1, 9),
            currentView: 'month',
            dataSource: data,
            height: 500,
            width: 800
          });
          var initialAppointmentHeight = getOuterHeight(scheduler.instance.$element().find('.dx-scheduler-appointment').eq(0));
          scheduler.instance.option('height', 200);
          this.clock.tick(10);
          assert.notEqual(getOuterHeight(scheduler.instance.$element().find('.dx-scheduler-appointment').eq(0)), initialAppointmentHeight, 'Appointment was repainted');
        });
        QUnit.test('appointments should be repainted after scheduler hiding/showing and dimensions changing', function(assert) {
          var data = [{
            id: 1,
            text: 'abc',
            startDate: new Date(2015, 1, 9, 10),
            endDate: new Date(2015, 1, 9, 10, 30)
          }];
          var scheduler = createWrapper({
            currentDate: new Date(2015, 1, 9),
            currentView: 'month',
            dataSource: data,
            maxAppointmentsPerCell: 2,
            height: 500,
            width: 800
          });
          var initialAppointmentHeight = getOuterHeight(scheduler.instance.$element().find('.dx-scheduler-appointment').eq(0));
          triggerHidingEvent($('#scheduler'));
          $('#scheduler').hide();
          scheduler.instance.option('height', 400);
          $('#scheduler').show();
          triggerShownEvent($('#scheduler'));
          this.clock.tick(10);
          assert.notEqual(getOuterHeight(scheduler.instance.$element().find('.dx-scheduler-appointment').eq(0)), initialAppointmentHeight, 'Appointment was repainted');
        });
        QUnit.test('view.intervalCount is passed to workspace & header', function(assert) {
          var scheduler = createWrapper({
            currentView: 'week',
            views: [{
              type: 'week',
              name: 'Week',
              intervalCount: 3
            }]
          });
          var workSpaceWeek = scheduler.instance.getWorkSpace();
          var header = scheduler.instance.getHeader();
          assert.equal(workSpaceWeek.option('intervalCount'), 3, 'workspace has correct count');
          assert.equal(header.option('intervalCount'), 3, 'header has correct count');
        });
        QUnit.test('view.intervalCount is passed to workspace & header, currentView is set by view.name', function(assert) {
          var scheduler = createWrapper({
            currentView: 'WEEK1',
            views: [{
              type: 'day',
              name: 'DAY1',
              intervalCount: 5
            }, {
              type: 'week',
              name: 'WEEK1',
              intervalCount: 3
            }]
          });
          var workSpaceWeek = scheduler.instance.getWorkSpace();
          var header = scheduler.instance.getHeader();
          assert.equal(workSpaceWeek.option('intervalCount'), 3, 'workspace has correct count');
          assert.equal(header.option('intervalCount'), 3, 'header has correct count');
        });
        QUnit.test('view.intervalCount is passed to workspace & header, currentView is set by view.type', function(assert) {
          var views = [{
            type: 'day',
            name: 'DAY1',
            intervalCount: 5
          }, {
            type: 'week',
            name: 'WEEK1',
            intervalCount: 3
          }];
          var scheduler = createWrapper({
            currentView: 'week',
            views: views,
            useDropDownViewSwitcher: false
          });
          var workSpaceWeek = scheduler.instance.getWorkSpace();
          var header = scheduler.instance.getHeader();
          assert.equal(workSpaceWeek.option('intervalCount'), 3, 'workspace has correct count');
          assert.equal(header.option('intervalCount'), 3, 'header has correct count');
        });
        QUnit.test('view.startDate is passed to workspace & header', function(assert) {
          var date = new Date(2017, 3, 4);
          var scheduler = createWrapper({
            currentView: 'week',
            currentDate: new Date(2017, 2, 10),
            views: [{
              type: 'week',
              name: 'Week',
              intervalCount: 3,
              startDate: date
            }]
          });
          var workSpaceWeek = scheduler.instance.getWorkSpace();
          var header = scheduler.instance.getHeader();
          assert.deepEqual(workSpaceWeek.option('startDate'), date, 'workspace has correct startDate');
          assert.deepEqual(header.option('startDate'), date, 'header has correct startDate');
        });
        QUnit.test('view.groupByDate is passed to workspace', function(assert) {
          var scheduler = createWrapper({
            currentView: 'Week',
            views: [{
              type: 'week',
              name: 'Week',
              groupByDate: true
            }, {
              type: 'day',
              name: 'Day',
              groupByDate: false
            }]
          });
          var workSpace = scheduler.instance.getWorkSpace();
          assert.ok(workSpace.option('groupByDate'), 'workspace has correct groupByDate');
          scheduler.instance.option('currentView', 'day');
          workSpace = scheduler.instance.getWorkSpace();
          assert.notOk(workSpace.option('groupByDate'), 'workspace has correct groupByDate');
        });
        QUnit.test('maxAppointmentsPerCell should have correct default', function(assert) {
          var scheduler = createWrapper({
            currentView: 'Week',
            views: [{
              type: 'week',
              name: 'Week'
            }]
          });
          assert.equal(scheduler.instance.option('maxAppointmentsPerCell'), 'auto', 'Default Option value is right');
        });
        QUnit.test('cellDuration is passed to workspace', function(assert) {
          var scheduler = createWrapper({
            currentView: 'week',
            cellDuration: 60
          });
          var workSpaceWeek = scheduler.instance.getWorkSpace();
          assert.equal(workSpaceWeek.option('hoursInterval') * 60, scheduler.instance.option('cellDuration'), 'workspace has correct cellDuration');
          scheduler.instance.option('cellDuration', 20);
          assert.equal(workSpaceWeek.option('hoursInterval') * 60, scheduler.instance.option('cellDuration'), 'workspace has correct cellDuration after change');
        });
        QUnit.test('accessKey is passed to workspace', function(assert) {
          var scheduler = createWrapper({
            currentView: 'month',
            accessKey: 'o'
          });
          var workSpaceMonth = scheduler.instance.getWorkSpace();
          assert.equal(workSpaceMonth.option('accessKey'), scheduler.instance.option('accessKey'), 'workspace has correct accessKey');
          scheduler.instance.option('accessKey', 'k');
          assert.equal(workSpaceMonth.option('accessKey'), scheduler.instance.option('accessKey'), 'workspace has correct accessKey afterChange');
        });
        QUnit.test('the \'width\' option should be passed to work space on option changed if horizontal scrolling is enabled', function(assert) {
          var scheduler = createWrapper();
          scheduler.instance.option('crossScrollingEnabled', true);
          scheduler.instance.option('width', 777);
          assert.equal(scheduler.instance.getWorkSpace().option('width'), 777, 'option is OK');
        });
        QUnit.test('the \'width\' option should not be passed to work space on option changed if horizontal scrolling is not enabled', function(assert) {
          var scheduler = createWrapper();
          scheduler.instance.option('crossScrollingEnabled', false);
          scheduler.instance.option('width', 777);
          assert.strictEqual(scheduler.instance.getWorkSpace().option('width'), undefined, 'option is OK');
        });
        QUnit.test('Editing default option value', function(assert) {
          var defaultEditing = {
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            allowResizing: true,
            allowDragging: true,
            allowTimeZoneEditing: false
          };
          if (devices.real().platform !== 'generic') {
            defaultEditing.allowDragging = false;
            defaultEditing.allowResizing = false;
          }
          var scheduler = createWrapper();
          var editing = scheduler.instance.option('editing');
          assert.deepEqual(editing, defaultEditing);
        });
        QUnit.test('Scheduler should be repainted after currentTime indication toggling', function(assert) {
          var scheduler = createWrapper({
            showCurrentTimeIndicator: true,
            currentDate: new Date(2017, 11, 18),
            indicatorTime: new Date(2017, 11, 18, 16, 45),
            views: ['timelineWeek'],
            view: 'timelineWeek'
          });
          var repaintStub = sinon.stub(scheduler.instance, 'repaint');
          scheduler.instance.option('showCurrentTimeIndicator', false);
          assert.ok(repaintStub.calledOnce, 'Sheduler was repainted');
        });
        QUnit.test('Appointment popup form should be recreated after changing resources', function(assert) {
          var resources = [{
            fieldExpr: 'TestResources',
            dataSource: [{
              text: 'Test-01',
              id: 0
            }]
          }];
          var scheduler = createWrapper({
            currentDate: new Date(2017, 11, 18),
            indicatorTime: new Date(2017, 11, 18, 16, 45),
            views: ['timelineWeek'],
            view: 'timelineWeek'
          });
          var spyAppointmentPopupForm = sinon.spy(scheduler.instance, '_createAppointmentPopupForm');
          scheduler.instance.option('resources', resources);
          assert.ok(spyAppointmentPopupForm.calledOnce, 'Appointment form was recreated');
        });
        QUnit.test('Filter options should be updated when dataSource is changed', function(assert) {
          var scheduler = createWrapper({
            currentDate: new Date(2016, 2, 15),
            views: ['week'],
            currentView: 'week',
            dataSource: [{
              startDate: new Date(2016, 2, 15, 1).toString(),
              endDate: new Date(2016, 2, 15, 2).toString()
            }]
          });
          assert.equal(scheduler.instance.$element().find('.dx-scheduler-appointment').length, 1, 'Appointment is rendered');
          scheduler.instance.option('dataSource', [{
            startDate: new Date(2016, 2, 15, 1).toString(),
            endDate: new Date(2016, 2, 15, 2).toString()
          }, {
            startDate: new Date(2016, 2, 15, 3).toString(),
            endDate: new Date(2016, 2, 15, 4).toString()
          }]);
          assert.equal(scheduler.instance.$element().find('.dx-scheduler-appointment').length, 2, 'Appointments are rendered');
        });
        QUnit.test('Appointments should be deleted from DOM when needed', function(assert) {
          var scheduler = createWrapper({
            currentDate: new Date(2016, 2, 15),
            views: ['week', 'month'],
            currentView: 'week',
            dataSource: [{
              startDate: new Date(2016, 2, 15, 1).toString(),
              endDate: new Date(2016, 2, 15, 2).toString()
            }]
          });
          assert.equal(scheduler.instance.$element().find('.dx-scheduler-appointment').length, 1, 'Appointment is rendered');
          scheduler.instance.option('currentDate', new Date(2016, 2, 23));
          scheduler.instance.option('currentView', 'month');
          scheduler.instance.option('currentView', 'week');
          assert.equal(scheduler.instance.$element().find('.dx-scheduler-appointment').length, 0, 'Appointments were removed');
        });
        ['virtual', 'standard'].forEach(function(scrollingMode) {
          QUnit.test(("selectedCellData option should be updated after view changing when scrolling is " + scrollingMode), function(assert) {
            var scheduler = createWrapper({
              currentDate: new Date(2018, 4, 10),
              views: ['week', 'month'],
              currentView: 'week',
              focusStateEnabled: true,
              scrolling: {mode: scrollingMode},
              width: 600
            });
            var keyboard = keyboardMock(scheduler.instance.getWorkSpace().$element());
            var cell = scheduler.workSpace.getCell(7);
            pointerMock(cell).start().click();
            keyboard.keyDown('down', {shiftKey: true});
            assert.deepEqual(scheduler.instance.option('selectedCellData'), [{
              startDate: new Date(2018, 4, 6, 0, 30),
              endDate: new Date(2018, 4, 6, 1),
              allDay: false,
              groups: undefined,
              groupIndex: 0
            }, {
              startDate: new Date(2018, 4, 6, 1),
              endDate: new Date(2018, 4, 6, 1, 30),
              allDay: false,
              groups: undefined,
              groupIndex: 0
            }], 'correct cell data');
            scheduler.instance.option('currentView', 'month');
            assert.deepEqual(scheduler.instance.option('selectedCellData'), [], 'selectedCellData was cleared');
          });
          QUnit.test(("selectedCellData option should be updated after currentDate changing when scrolling is " + scrollingMode), function(assert) {
            var scheduler = createWrapper({
              currentDate: new Date(2018, 4, 10),
              views: ['week', 'month'],
              currentView: 'week',
              focusStateEnabled: true,
              scrolling: {mode: scrollingMode},
              width: 600
            });
            var keyboard = keyboardMock(scheduler.instance.getWorkSpace().$element());
            var cell = scheduler.workSpace.getCell(7);
            pointerMock(cell).start().click();
            keyboard.keyDown('down', {shiftKey: true});
            assert.deepEqual(scheduler.instance.option('selectedCellData'), [{
              startDate: new Date(2018, 4, 6, 0, 30),
              endDate: new Date(2018, 4, 6, 1),
              allDay: false,
              groups: undefined,
              groupIndex: 0
            }, {
              startDate: new Date(2018, 4, 6, 1),
              endDate: new Date(2018, 4, 6, 1, 30),
              allDay: false,
              groups: undefined,
              groupIndex: 0
            }], 'correct cell data');
            scheduler.instance.option('currentDate', new Date(2018, 5, 10));
            assert.deepEqual(scheduler.instance.option('selectedCellData'), [], 'selectedCellData was cleared');
          });
        });
        QUnit.test('Multiple reloading should be avoided after some options changing (T656320)', function(assert) {
          var counter = 0;
          var scheduler = createWrapper();
          scheduler.instance.option('dataSource', new DataSource({store: new CustomStore({load: function() {
                counter++;
                return [];
              }})}));
          assert.equal(counter, 1, 'Data source was reloaded after dataSource option changing');
          scheduler.instance.beginUpdate();
          scheduler.instance.option('startDayHour', 10);
          scheduler.instance.option('endDayHour', 18);
          scheduler.instance.endUpdate();
          assert.equal(counter, 2, 'Data source was reloaded one more time after some options changing');
        });
        QUnit.test('Multiple reloading should be avoided after repaint (T737181)', function(assert) {
          var counter = 0;
          var scheduler = createWrapper();
          scheduler.instance.option('dataSource', new DataSource({store: new CustomStore({load: function() {
                counter++;
                return [];
              }})}));
          assert.equal(counter, 1, 'Data source was reloaded after dataSource option changing');
          scheduler.instance.repaint();
          assert.equal(counter, 1, 'Data source was not reloaded after repaint');
        });
        QUnit.test('Multiple reloading should be avoided after some currentView options changing (T656320)', function(assert) {
          var counter = 0;
          var resourceCounter = 0;
          var scheduler = createWrapper({
            dataSource: new DataSource({store: new CustomStore({load: function() {
                  counter++;
                  return [];
                }})}),
            groups: ['owner.id'],
            resources: [{
              fieldExpr: 'owner.id',
              dataSource: new DataSource({store: new CustomStore({load: function() {
                    var d = $.Deferred();
                    setTimeout(function() {
                      resourceCounter++;
                      assert.equal(counter, resourceCounter - 1);
                      d.resolve([{
                        id: 1,
                        text: 'text'
                      }]);
                    }, 100);
                    return d.promise();
                  }})})
            }]
          });
          this.clock.tick(100);
          assert.equal(resourceCounter, 1, 'Resources was reloaded after dataSource option changing');
          scheduler.instance.beginUpdate();
          scheduler.instance.option('currentView', 'timelineDay');
          scheduler.instance.option('currentView', 'timelineMonth');
          scheduler.instance.endUpdate();
          this.clock.tick(100);
          assert.equal(resourceCounter, 2, 'Resources was reloaded one more time after dataSource option changing');
        });
        [{
          startDayHour: 0,
          endDayHour: 0
        }, {
          startDayHour: 2,
          endDayHour: 0
        }].forEach(function(dayHours) {
          QUnit.test(("Generate error if option changed to startDayHour: " + dayHours.startDayHour + " >= endDayHour: " + dayHours.endDayHour), function(assert) {
            var scheduler = createWrapper({
              currentDate: new Date(2015, 4, 24),
              views: ['day'],
              currentView: 'day',
              startDayHour: 8,
              endDayHour: 12
            });
            assert.throws(function() {
              scheduler.instance.option('startDayHour', dayHours.startDayHour);
              scheduler.instance.option('endDayHour', dayHours.endDayHour);
            }, function(e) {
              return /E1058/.test(e.message);
            }, 'E1058 Error message');
          });
          QUnit.test(("Generate error if workSpace option changed to startDayHour: " + dayHours.startDayHour + " >= endDayHour: " + dayHours.endDayHour), function(assert) {
            var scheduler = createWrapper({
              currentDate: new Date(2015, 4, 24),
              views: [{
                name: 'day',
                type: 'day'
              }],
              currentView: 'day',
              startDayHour: 8,
              endDayHour: 12
            });
            assert.throws(function() {
              var instance = scheduler.instance;
              instance.option('views[0].startDayHour', dayHours.startDayHour);
              instance.option('views[0].endDayHour', dayHours.endDayHour);
            }, function(e) {
              return /E1058/.test(e.message);
            }, 'E1058 Error message');
          });
          QUnit.test(("Generate error if currentView changed to view.startDayHour: " + dayHours.startDayHour + " >= view.endDayHour: " + dayHours.endDayHour), function(assert) {
            var scheduler = createWrapper({
              currentDate: new Date(2015, 4, 24),
              dataSource: [{
                startDate: new Date(2015, 4, 24, 0),
                endDate: new Date(2015, 4, 24, 2),
                allDay: true
              }],
              views: [{
                name: 'day',
                type: 'day'
              }, {
                name: 'week',
                type: 'week',
                startDayHour: dayHours.startDayHour,
                endDayHour: dayHours.endDayHour
              }],
              currentView: 'day',
              startDayHour: 8,
              endDayHour: 12
            });
            assert.throws(function() {
              scheduler.instance.option('currentView', 'week');
            }, function(e) {
              return /E1058/.test(e.message);
            }, 'E1058 Error message');
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
          QUnit.test(("Options changing, generate warning if cellDuration: " + config.cellDuration + " could not divide the range from startDayHour: " + config.startDayHour + " to the endDayHour: " + config.endDayHour + " into even intervals"), function(assert) {
            var scheduler = createWrapper({
              currentDate: new Date(2015, 4, 24),
              views: ['day'],
              currentView: 'day',
              startDayHour: 8,
              endDayHour: 12
            });
            scheduler.instance.option({
              startDayHour: config.startDayHour,
              endDayHour: config.endDayHour,
              cellDuration: config.cellDuration
            });
            assert.equal(errors.log.callCount, 1, 'warning has been called once');
            assert.equal(errors.log.getCall(0).args[0], 'W1015', 'warning has correct error id');
          });
        });
        [{currentView: 'WEEK1'}, {currentView: 'WEEK2'}].forEach(function(view) {
          QUnit.test(("View changing, generate warning if cellDuration: " + config.cellDuration + " could not divide the range from startDayHour: " + config.startDayHour + " to the endDayHour: " + config.endDayHour + " into even intervals"), function(assert) {
            var scheduler = createWrapper({
              currentDate: new Date(2015, 4, 24),
              views: ['day', {
                type: 'week',
                name: 'WEEK1',
                cellDuration: 7
              }, {
                type: 'week',
                name: 'WEEK2',
                cellDuration: 95
              }],
              currentView: 'day',
              startDayHour: 8,
              endDayHour: 24
            });
            scheduler.instance.option('currentView', view.currentView);
            assert.equal(errors.log.callCount, 1, 'warning has been called once');
            assert.equal(errors.log.getCall(0).args[0], 'W1015', 'warning has correct error id');
          });
        });
        QUnit.test('Data source should not be loaded on option change if it is already being loaded (T916558)', function(assert) {
          var dataSource = new DataSource({store: []});
          var scheduler = createWrapper({
            currentDate: new Date(2015, 4, 24),
            views: ['day', 'workWeek', {type: 'week'}],
            currentView: 'day',
            dataSource: dataSource
          });
          var initMarkupSpy = sinon.spy(scheduler.instance, '_initMarkup');
          var reloadDataSourceSpy = sinon.spy(scheduler.instance, '_reloadDataSource');
          var nextDataSource = new DataSource({store: new CustomStore({load: function() {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve([]);
                }, 300);
                return d.promise();
              }})});
          scheduler.instance.option({'dataSource': nextDataSource});
          scheduler.instance.option({
            'views[2].intervalCount': 2,
            'views[2].startDate': new Date()
          });
          this.clock.tick(400);
          assert.ok(initMarkupSpy.calledTwice, 'Init markup was called on the second and third option change');
          assert.ok(reloadDataSourceSpy.calledOnce, '_reloadDataSource was not called on init mark up');
        });
        QUnit.test('It should be possible to change views option when view names are specified (T995794)', function(assert) {
          var baseViews = [{
            type: 'day',
            name: 'Custom Day'
          }, {
            type: 'week',
            name: 'Custom Week'
          }];
          var timelineViews = [{
            type: 'timelineDay',
            name: 'Custom Timeline Day'
          }, {
            type: 'timelineWeek',
            name: 'Custom Timeline Week'
          }];
          var scheduler = createWrapper({
            views: baseViews,
            currentView: 'Custom Week'
          });
          scheduler.instance.option('views', timelineViews);
          assert.equal(scheduler.workSpace.getCells().length, 48, 'Everything is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","core/config","core/devices","data/custom_store","data/data_source/data_source","events/visibility_change","jquery","ui/scheduler/workspaces/ui.scheduler.work_space_day","ui/widget/ui.errors","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","../../helpers/scheduler/helpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("core/config"), require("core/devices"), require("data/custom_store"), require("data/data_source/data_source"), require("events/visibility_change"), require("jquery"), require("ui/scheduler/workspaces/ui.scheduler.work_space_day"), require("ui/widget/ui.errors"), require("../../helpers/keyboardMock.js"), require("../../helpers/pointerMock.js"), require("../../helpers/scheduler/helpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=common.options.tests.js.map