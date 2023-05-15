!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/integration.dstAppointments.tests.js"], ["../../helpers/scheduler/helpers.js","localization/date","animation/fx","core/utils/date","ui/scheduler/utils.timeZone","ui/scheduler/ui.scheduler","generic_light.css!","core/devices"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/integration.dstAppointments.tests.js", ["../../helpers/scheduler/helpers.js", "localization/date", "animation/fx", "core/utils/date", "ui/scheduler/utils.timeZone", "ui/scheduler/ui.scheduler", "generic_light.css!", "core/devices"], function($__export) {
  "use strict";
  var initTestMarkup,
      createWrapper,
      dateLocalization,
      fx,
      toMs,
      timeZoneUtils,
      devices,
      isDeviceDesktop,
      moduleConfig;
  return {
    setters: [function($__m) {
      initTestMarkup = $__m.initTestMarkup;
      createWrapper = $__m.createWrapper;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      toMs = $__m.dateToMilliseconds;
    }, function($__m) {
      timeZoneUtils = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {
      devices = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        return initTestMarkup();
      });
      isDeviceDesktop = function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'skip this test on mobile devices');
          return false;
        }
        return true;
      };
      moduleConfig = {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      };
      QUnit.skip('DST/STD for recurrence appointments, T804886 and T856624', moduleConfig, function() {
        QUnit.test('Any recurrence appt part should be rendered correctly if recurrence starts in STD and ends in DST in custom timezone, appointment timezone is set (T804886)', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              text: 'Daily meeting',
              startDate: '2019-03-01T09:00:00+01:00',
              endDate: '2019-03-01T12:00:00+01:00',
              recurrenceRule: 'FREQ=DAILY',
              startDateTimeZone: 'Europe/Paris',
              endDateTimeZone: 'Europe/Paris'
            }],
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2019, 2, 1),
            startDayHour: 0,
            height: 600,
            timeZone: 'America/Montreal',
            dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ssx'
          });
          var targetCell = scheduler.workSpace.getCell(6);
          var appointment = scheduler.appointments.getAppointment(0);
          assert.equal(appointment.position().top, targetCell.position().top, 'Recurrence appointment part is rendered in right cell');
          assert.equal(appointment.outerHeight(), targetCell.outerHeight() * 6, 'Recurrence appointment part has right size');
          assert.equal(scheduler.appointments.getDateText(0), '3:00 AM - 6:00 AM', 'Dates and time were displayed correctly in appointment before time changing in custom timezone');
          scheduler.instance.option('currentDate', new Date(2019, 2, 14));
          targetCell = scheduler.workSpace.getCell(8);
          appointment = scheduler.appointments.getAppointment(0);
          assert.equal(appointment.position().top, targetCell.position().top, 'Recurrence appointment part is rendered in right cell');
          assert.equal(appointment.outerHeight(), targetCell.outerHeight() * 6, 'Recurrence appointment part has right size');
          assert.equal(scheduler.appointments.getDateText(0), '4:00 AM - 7:00 AM', 'Dates and time were displayed correctly in appointment after time changing in custom timezone');
          scheduler.instance.option('currentDate', new Date(2019, 3, 2));
          targetCell = scheduler.workSpace.getCell(6);
          appointment = scheduler.appointments.getAppointment(0);
          assert.equal(appointment.position().top, targetCell.position().top, 'Recurrence appointment part is rendered in right cell');
          assert.equal(appointment.outerHeight(), targetCell.outerHeight() * 6, 'Recurrence appointment part has right size');
          assert.equal(scheduler.appointments.getDateText(0), '3:00 AM - 6:00 AM', 'Dates and time were displayed correctly in appointment after time changing in appointment timezone');
        });
        QUnit.test('Any recurrence appt part should have correct tooltip and popup if recurrence starts in STD and ends in DST in custom timezone, appointment timezone is set (T804886)', function(assert) {
          if (!isDeviceDesktop(assert)) {
            return;
          }
          var scheduler = createWrapper({
            dataSource: [{
              text: 'Daily meeting',
              startDate: '2019-03-01T09:00:00+01:00',
              endDate: '2019-03-01T12:00:00+01:00',
              recurrenceRule: 'FREQ=DAILY',
              startDateTimeZone: 'Europe/Paris',
              endDateTimeZone: 'Europe/Paris'
            }],
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2019, 2, 1),
            startDayHour: 0,
            height: 600,
            timeZone: 'America/Montreal',
            dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ssx'
          });
          var startDateEditor;
          var endDateEditor;
          scheduler.appointments.click(0);
          assert.equal(scheduler.tooltip.getDateText(), '3:00 AM - 6:00 AM', 'Dates and time were displayed correctly in tooltip before time changing in custom timezone');
          scheduler.tooltip.clickOnItem();
          scheduler.appointmentPopup.dialog.clickEditAppointment();
          startDateEditor = scheduler.appointmentForm.getEditor('startDate');
          endDateEditor = scheduler.appointmentForm.getEditor('endDate');
          assert.equal(startDateEditor.option('text'), '3/1/2019, 3:00 AM', 'Start Date is displayed correctly in appointment popup form before time changing in custom timezone');
          assert.equal(endDateEditor.option('text'), '3/1/2019, 6:00 AM', 'End Date is displayed correctly in appointment popup form before time changing in custom timezone');
          scheduler.appointmentPopup.clickCancelButton();
          scheduler.instance.option('currentDate', new Date(2019, 2, 14));
          scheduler.appointments.click(0);
          assert.equal(scheduler.tooltip.getDateText(), '4:00 AM - 7:00 AM', 'Dates and time were displayed correctly in tooltip after time changing in custom timezone');
          scheduler.tooltip.clickOnItem();
          scheduler.appointmentPopup.dialog.clickEditAppointment();
          startDateEditor = scheduler.appointmentForm.getEditor('startDate');
          endDateEditor = scheduler.appointmentForm.getEditor('endDate');
          assert.equal(startDateEditor.option('text'), '3/14/2019, 4:00 AM', 'Start Date is displayed correctly in appointment popup form before time changing in custom timezone');
          assert.equal(endDateEditor.option('text'), '3/14/2019, 7:00 AM', 'End Date is displayed correctly in appointment popup form before time changing in custom timezone');
          scheduler.appointmentPopup.clickCancelButton();
          scheduler.instance.option('currentDate', new Date(2019, 3, 2));
          scheduler.appointments.click(0);
          assert.equal(scheduler.tooltip.getDateText(), '3:00 AM - 6:00 AM', 'Dates and time were displayed correctly in tooltip after time changing in appointment timezone');
          scheduler.tooltip.clickOnItem();
          scheduler.appointmentPopup.dialog.clickEditAppointment();
          startDateEditor = scheduler.appointmentForm.getEditor('startDate');
          endDateEditor = scheduler.appointmentForm.getEditor('endDate');
          assert.equal(startDateEditor.option('text'), '4/2/2019, 3:00 AM', 'Start Date is displayed correctly in appointment popup form before time changing in custom timezone');
          assert.equal(endDateEditor.option('text'), '4/2/2019, 6:00 AM', 'End Date is displayed correctly in appointment popup form before time changing in custom timezone');
        });
        QUnit.test('Recurrence appt part at the time of DST should be rendered correctly if recurrence starts in STD and ends in DST in custom timezone, appointment timezone is set (T804886)', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              text: 'Daily meeting',
              startDate: '2019-03-01T09:00:00+01:00',
              endDate: '2019-03-01T12:00:00+01:00',
              recurrenceRule: 'FREQ=DAILY',
              startDateTimeZone: 'Europe/Paris',
              endDateTimeZone: 'Europe/Paris'
            }],
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2019, 2, 10),
            startDayHour: 0,
            height: 600,
            timeZone: 'America/Montreal',
            dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ssx'
          });
          var targetCell = scheduler.workSpace.getCell(8);
          var appointment = scheduler.appointments.getAppointment(0);
          assert.equal(appointment.position().top, targetCell.position().top, 'Recurrence appointment part is rendered in right cell');
          assert.equal(appointment.outerHeight(), targetCell.outerHeight() * 6, 'Recurrence appointment part has right size');
          assert.equal(scheduler.appointments.getDateText(0), '4:00 AM - 7:00 AM', 'Dates and time were displayed correctly in appointment after time changing in custom timezone');
          scheduler.instance.option('currentDate', new Date(2019, 2, 31));
          targetCell = scheduler.workSpace.getCell(6);
          appointment = scheduler.appointments.getAppointment(0);
          assert.equal(appointment.position().top, targetCell.position().top, 'Recurrence appointment part is rendered in right cell');
          assert.equal(appointment.outerHeight(), targetCell.outerHeight() * 6, 'Recurrence appointment part has right size');
          assert.equal(scheduler.appointments.getDateText(0), '3:00 AM - 6:00 AM', 'Dates and time were displayed correctly in appointment after time changing in appointment timezone');
          scheduler.appointments.click(0);
          assert.equal(scheduler.tooltip.getDateText(), '3:00 AM - 6:00 AM', 'Dates and time were displayed correctly in tooltip after time changing in appointment timezone');
        });
        QUnit.test('Recurrence appt part at the time of DST should have correct tooltip and popup if recurrence starts in STD and ends in DST in custom timezone, appointment timezone is set (T804886)', function(assert) {
          if (!isDeviceDesktop(assert)) {
            return;
          }
          var scheduler = createWrapper({
            dataSource: [{
              text: 'Daily meeting',
              startDate: '2019-03-01T09:00:00+01:00',
              endDate: '2019-03-01T12:00:00+01:00',
              recurrenceRule: 'FREQ=DAILY',
              startDateTimeZone: 'Europe/Paris',
              endDateTimeZone: 'Europe/Paris'
            }],
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2019, 2, 10),
            startDayHour: 0,
            height: 600,
            timeZone: 'America/Montreal',
            dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ssx'
          });
          var startDateEditor;
          var endDateEditor;
          scheduler.appointments.click(0);
          assert.equal(scheduler.tooltip.getDateText(), '4:00 AM - 7:00 AM', 'Dates and time were displayed correctly after time changing in custom timezone');
          scheduler.tooltip.clickOnItem();
          scheduler.appointmentPopup.dialog.clickEditAppointment();
          startDateEditor = scheduler.appointmentForm.getEditor('startDate');
          endDateEditor = scheduler.appointmentForm.getEditor('endDate');
          assert.equal(startDateEditor.option('text'), '3/10/2019, 4:00 AM', 'Start Date is displayed correctly in appointment popup form after time changing in custom timezone');
          assert.equal(endDateEditor.option('text'), '3/10/2019, 7:00 AM', 'End Date is displayed correctly in appointment popup form after time changing in custom timezone');
          scheduler.appointmentPopup.clickCancelButton();
          scheduler.instance.option('currentDate', new Date(2019, 2, 31));
          scheduler.appointments.click(0);
          assert.equal(scheduler.tooltip.getDateText(), '3:00 AM - 6:00 AM', 'Dates and time were displayed correctly in tooltip after time changing in appointment timezone');
          scheduler.tooltip.clickOnItem();
          scheduler.appointmentPopup.dialog.clickEditAppointment();
          startDateEditor = scheduler.appointmentForm.getEditor('startDate');
          endDateEditor = scheduler.appointmentForm.getEditor('endDate');
          assert.equal(startDateEditor.option('text'), '3/31/2019, 3:00 AM', 'Start Date is displayed correctly in appointment popup form before time changing in appointment timezone');
          assert.equal(endDateEditor.option('text'), '3/31/2019, 6:00 AM', 'End Date is displayed correctly in appointment popup form before time changing in appointment timezone');
          scheduler.appointmentPopup.clickCancelButton();
        });
        QUnit.test('Recurrence appt part should be rendered correctly if recurrence starts in STD and ends in DST in custom timezone', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              text: 'Daily meeting',
              startDate: '2019-03-01T09:00:00+01:00',
              endDate: '2019-03-01T12:00:00+01:00',
              recurrenceRule: 'FREQ=DAILY'
            }],
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2019, 2, 5),
            startDayHour: 0,
            height: 600,
            timeZone: 'America/Montreal',
            dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ssx'
          });
          var targetCell = scheduler.workSpace.getCell(6);
          var appointment = scheduler.appointments.getAppointment(0);
          assert.equal(appointment.position().top, targetCell.position().top, 'Recurrence appointment part is rendered in right cell');
          assert.equal(appointment.outerHeight(), targetCell.outerHeight() * 6, 'Recurrence appointment part has right size');
          scheduler.instance.option('currentDate', new Date(2019, 3, 1));
          targetCell = scheduler.workSpace.getCell(6);
          appointment = scheduler.appointments.getAppointment(0);
          assert.equal(appointment.position().top, targetCell.position().top, 'Recurrence appointment part is rendered in right cell');
          assert.equal(appointment.outerHeight(), targetCell.outerHeight() * 6, 'Recurrence appointment part has right size');
        });
        QUnit.test('Recurrence appt part should be rendered correctly if recurrence starts in STD and ends in DST, appointment timezone is set', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              text: 'Daily meeting',
              startDate: '2019-03-01T09:00:00+01:00',
              endDate: '2019-03-01T12:00:00+01:00',
              recurrenceRule: 'FREQ=DAILY',
              startDateTimeZone: 'Europe/Paris',
              endDateTimeZone: 'Europe/Paris'
            }],
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2019, 2, 30),
            startDayHour: 0,
            height: 600,
            dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ssx'
          });
          var appointmentPosition = scheduler.appointments.getAppointment(0).position().top;
          scheduler.instance.option('currentDate', new Date(2019, 3, 1));
          var appointment = scheduler.appointments.getAppointment(0);
          assert.equal(appointment.position().top, appointmentPosition, 'Recurrence appointment part positions are the same and independent of time changing');
        });
        QUnit.test('Recurrence appt part at the time of DST-end should be rendered correctly if recurrence starts in DST and ends in STD in custom timezone, appointment timezone is set (T804886)', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              text: 'Daily meeting',
              startDate: '2019-03-01T09:00:00+01:00',
              endDate: '2019-03-01T12:00:00+01:00',
              recurrenceRule: 'FREQ=DAILY',
              startDateTimeZone: 'Europe/Paris',
              endDateTimeZone: 'Europe/Paris'
            }],
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2019, 9, 27),
            startDayHour: 0,
            height: 600,
            timeZone: 'America/Montreal',
            dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ssx'
          });
          var targetCell = scheduler.workSpace.getCell(8);
          var appointment = scheduler.appointments.getAppointment(0);
          assert.equal(appointment.position().top, targetCell.position().top, 'Recurrence appointment part is rendered in right cell');
          assert.equal(appointment.outerHeight(), targetCell.outerHeight() * 6, 'Recurrence appointment part has right size');
          assert.equal(scheduler.appointments.getDateText(0), '4:00 AM - 7:00 AM', 'Dates and time were displayed correctly in appointment after time changing in custom timezone');
          scheduler.instance.option('currentDate', new Date(2019, 10, 3));
          targetCell = scheduler.workSpace.getCell(6);
          appointment = scheduler.appointments.getAppointment(0);
          assert.equal(appointment.position().top, targetCell.position().top, 'Recurrence appointment part is rendered in right cell');
          assert.equal(appointment.outerHeight(), targetCell.outerHeight() * 6, 'Recurrence appointment part has right size');
          assert.equal(scheduler.appointments.getDateText(0), '3:00 AM - 6:00 AM', 'Dates and time were displayed correctly in appointment after time changing in appointment timezone');
        });
        QUnit.test('Recurrence appt part at the time of DST-end should have correct tooltip and popup if recurrence starts in DST and ends in STD in custom timezone, appointment timezone is set (T804886)', function(assert) {
          if (!isDeviceDesktop(assert)) {
            return;
          }
          var scheduler = createWrapper({
            dataSource: [{
              text: 'Daily meeting',
              startDate: '2019-03-01T09:00:00+01:00',
              endDate: '2019-03-01T12:00:00+01:00',
              recurrenceRule: 'FREQ=DAILY',
              startDateTimeZone: 'Europe/Paris',
              endDateTimeZone: 'Europe/Paris'
            }],
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2019, 9, 27),
            startDayHour: 0,
            height: 600,
            timeZone: 'America/Montreal',
            dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ssx'
          });
          var startDateEditor;
          var endDateEditor;
          scheduler.appointments.click(0);
          assert.equal(scheduler.tooltip.getDateText(), '4:00 AM - 7:00 AM', 'Dates and time were displayed correctly after time changing in custom timezone');
          scheduler.tooltip.clickOnItem();
          scheduler.appointmentPopup.dialog.clickEditAppointment();
          startDateEditor = scheduler.appointmentForm.getEditor('startDate');
          endDateEditor = scheduler.appointmentForm.getEditor('endDate');
          assert.equal(startDateEditor.option('text'), '10/27/2019, 4:00 AM', 'Start Date is displayed correctly in appointment popup form after time changing in custom timezone');
          assert.equal(endDateEditor.option('text'), '10/27/2019, 7:00 AM', 'End Date is displayed correctly in appointment popup form after time changing in custom timezone');
          scheduler.appointmentPopup.clickCancelButton();
          scheduler.instance.option('currentDate', new Date(2019, 10, 3));
          scheduler.appointments.click(0);
          assert.equal(scheduler.tooltip.getDateText(), '3:00 AM - 6:00 AM', 'Dates and time were displayed correctly in tooltip after time changing in appointment timezone');
          scheduler.tooltip.clickOnItem();
          scheduler.appointmentPopup.dialog.clickEditAppointment();
          startDateEditor = scheduler.appointmentForm.getEditor('startDate');
          endDateEditor = scheduler.appointmentForm.getEditor('endDate');
          assert.equal(startDateEditor.option('text'), '11/3/2019, 3:00 AM', 'Start Date is displayed correctly in appointment popup form before time changing in appointment timezone');
          assert.equal(endDateEditor.option('text'), '11/3/2019, 6:00 AM', 'End Date is displayed correctly in appointment popup form before time changing in appointment timezone');
          scheduler.appointmentPopup.clickCancelButton();
        });
        QUnit.test('Scheduler - Fix - Recurrent appointment settings generator should consider daylight saving time (T985142)', function(assert) {
          var scheduler;
          try {
            scheduler = createWrapper({
              dataSource: [{
                startDate: '2021-03-28T10:00:00.000Z',
                endDate: '2021-03-29T10:00:00.000Z',
                startDateTimeZone: 'Europe/Paris',
                endDateTimeZone: 'Europe/Paris',
                recurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=1'
              }],
              views: ['day'],
              currentView: 'day',
              currentDate: new Date(2021, 2, 27),
              height: 600,
              timeZone: 'Pacific/Tahiti'
            });
            assert.equal(scheduler.appointments.getAppointmentCount(), 1, 'Appoitment count is correct');
            var appointmentSettings = scheduler.instance.getAppointmentsInstance().option('items')[0];
            assert.deepEqual({
              appointment: {
                startDate: new Date('2021-03-27T22:00:00.000Z'),
                endDate: new Date('2021-03-28T22:00:00.000Z'),
                source: {
                  startDate: new Date('2021-03-28T10:00:00.000Z'),
                  endDate: new Date('2021-03-29T10:00:00.000Z')
                }
              },
              sourceAppointment: {
                startDate: new Date('2021-03-28T10:00:00.000Z'),
                endDate: new Date('2021-03-29T10:00:00.000Z')
              }
            }, appointmentSettings.settings[0].info, 'Appoitment settings is correct');
          } catch (e) {
            assert.ok(false, e.Message);
          }
        });
      });
      QUnit.skip('Appointments with DST/STD cases', moduleConfig, function() {
        var getDeltaTz = function(schedulerTz, date) {
          return schedulerTz * toMs('hour') + date.getTimezoneOffset() * toMs('minute');
        };
        QUnit.test('Appointment wich started in DST and ended in STD time should have correct start & end dates', function(assert) {
          var startDate = new Date(1541311200000);
          var endDate = new Date(1541319000000);
          var scheduler = createWrapper({
            currentDate: new Date(2018, 10, 4),
            views: ['week'],
            currentView: 'week',
            dataSource: [{
              text: 'DST',
              startDate: startDate,
              endDate: endDate
            }],
            timeZone: 'America/Chicago'
          });
          var deltaTzStart = getDeltaTz(-5, startDate);
          var deltaTzEnd = getDeltaTz(-6, endDate);
          var startDateByTz = new Date(startDate.setHours(startDate.getHours() + deltaTzStart / toMs('hour')));
          var endDateByTz = new Date(endDate.setHours(endDate.getHours() + deltaTzEnd / toMs('hour')));
          var resultDateText = (dateLocalization.format(startDateByTz, 'shorttime') + " - " + dateLocalization.format(endDateByTz, 'shorttime'));
          assert.equal(scheduler.appointments.getTitleText(), 'DST', 'Text is correct on init');
          assert.equal(scheduler.appointments.getDateText(), resultDateText, 'Date is correct on init');
        });
        QUnit.test('Appointment wich started in STD and ended in DST time should have correct start & end dates', function(assert) {
          var startDate = new Date(1520748000000);
          var endDate = new Date(1520751600000);
          var scheduler = createWrapper({
            currentDate: new Date(2018, 2, 11),
            views: ['timelineDay'],
            currentView: 'timelineDay',
            dataSource: [{
              text: 'DST',
              startDate: startDate,
              endDate: endDate
            }],
            timeZone: 'America/New_York'
          });
          var deltaTzStart = getDeltaTz(-5, startDate);
          var deltaTzEnd = getDeltaTz(-4, endDate);
          var startDateByTz = new Date(startDate.setHours(startDate.getHours() + deltaTzStart / toMs('hour')));
          var endDateByTz = new Date(endDate.setHours(endDate.getHours() + deltaTzEnd / toMs('hour')));
          var resultDateText = (dateLocalization.format(startDateByTz, 'shorttime') + " - " + dateLocalization.format(endDateByTz, 'shorttime'));
          assert.equal(scheduler.appointments.getTitleText(), 'DST', 'Text is correct on init');
          assert.equal(scheduler.appointments.getDateText(), resultDateText, 'Date is correct on init');
        });
        QUnit.test('Second recurring appointment wich started in STD and ended in DST time should have correct start & end dates & position', function(assert) {
          var startDate = new Date(1520748000000);
          var endDate = new Date(1520751600000);
          var scheduler = createWrapper({
            currentDate: new Date(2018, 2, 12),
            views: ['timelineDay'],
            currentView: 'timelineDay',
            dataSource: [{
              text: 'DST',
              startDate: startDate,
              endDate: endDate,
              recurrenceRule: 'FREQ=DAILY'
            }],
            timeZone: 'America/New_York'
          });
          assert.equal(scheduler.appointments.getTitleText(), 'DST', 'Text is correct on init');
          assert.equal(scheduler.appointments.getDateText(), '1:00 AM - 2:00 AM', 'Start Date is correct on init');
          assert.roughEqual(scheduler.appointments.getAppointment(0).outerWidth(), scheduler.workSpace.getCellWidth() * 2, 2, 'Appointment width is correct');
        });
        QUnit.test('Appointment which started in DST and ended in STD time should have right width, timeline view', function(assert) {
          var startDate = new Date(2018, 10, 4, 1);
          var endDate = new Date(2018, 10, 4, 3);
          var currentDate = new Date(2018, 10, 4);
          var scheduler = createWrapper({
            views: ['timelineWeek'],
            currentView: 'timelineWeek',
            cellDuration: 60,
            currentDate: currentDate,
            dataSource: [{
              text: 'DST',
              startDate: startDate,
              endDate: endDate
            }]
          });
          var duration = (endDate - startDate) / toMs('hour');
          var tzDiff = (startDate.getTimezoneOffset() - endDate.getTimezoneOffset()) / 60;
          assert.roughEqual(scheduler.appointments.getAppointment(0).outerWidth(), scheduler.workSpace.getCellWidth() * (duration + tzDiff), 2.001, 'Appt width is correct on the day of the time ajusting');
        });
        QUnit.test('Second recurring appointment should have right width if previous appt started in STD and ended in DST, timeline view', function(assert) {
          var startDate = new Date(1520758800000);
          var endDate = new Date(1520762400000);
          var currentDate = new Date(2018, 2, 12);
          var scheduler = createWrapper({
            currentDate: currentDate,
            views: ['timelineDay'],
            currentView: 'timelineDay',
            dataSource: [{
              text: 'DST',
              startDate: startDate,
              endDate: endDate,
              recurrenceRule: 'FREQ=DAILY'
            }],
            cellDuration: 60,
            timeZone: 'America/New_York'
          });
          scheduler.instance.option('currentDate', scheduler.instance.fire('convertDateByTimezone', currentDate, -5));
          var duration = (endDate - startDate) / toMs('hour');
          assert.roughEqual(scheduler.appointments.getAppointment(0).outerWidth(), scheduler.workSpace.getCellWidth() * duration, 2.001, 'Appt width is correct after the day of the time ajusting');
        });
        QUnit.test('Appointment should be rendered correctly if end date appointment coincided translation on STD', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              text: 'November 4',
              startDate: new Date(2018, 10, 4, 18, 0),
              endDate: new Date(2018, 10, 5, 0, 0)
            }],
            views: ['month'],
            currentView: 'month',
            currentDate: new Date(2018, 10, 1),
            firstDayOfWeek: 0,
            cellDuration: 60,
            height: 800
          });
          assert.roughEqual(scheduler.appointments.getAppointment(0).outerWidth(), scheduler.workSpace.getCellWidth(), 2.001, 'Appointment width is correct after translation from STD');
        });
        QUnit.test('Recurrence exception should not be rendered if exception goes after adjusting AEST-> AEDT (T619455)', function(assert) {
          var tzOffsetStub = sinon.stub(timeZoneUtils, 'getClientTimezoneOffset').returns(-39600000);
          try {
            var scheduler = createWrapper({
              dataSource: [{
                text: 'Recruiting students',
                startDate: new Date(2018, 2, 30, 10, 0),
                endDate: new Date(2018, 2, 30, 11, 0),
                recurrenceRule: 'FREQ=DAILY',
                recurrenceException: '20180401T100000'
              }],
              views: ['month'],
              currentView: 'month',
              currentDate: new Date(2018, 2, 30),
              timeZone: 'Australia/Sydney',
              height: 600
            });
            assert.equal(scheduler.appointments.getAppointmentCount(), 8, 'correct number of the events');
            scheduler.instance.option('currentView', 'day');
            scheduler.instance.option('currentDate', new Date(2018, 3, 1));
            assert.notOk(scheduler.appointments.getAppointmentCount(), 'event is an exception');
          } finally {
            tzOffsetStub.restore();
          }
        });
        QUnit.test('Recurrence exception should be adjusted by scheduler timezone after deleting of the single appt', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              text: 'Recruiting students',
              startDate: new Date(2018, 2, 26, 10, 0),
              endDate: new Date(2018, 2, 26, 11, 0),
              recurrenceRule: 'FREQ=DAILY'
            }],
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2018, 3, 1),
            timeZone: 'Australia/Sydney',
            recurrenceEditMode: 'occurrence'
          });
          scheduler.appointments.click();
          this.clock.tick(300);
          scheduler.tooltip.clickOnDeleteButton();
          assert.equal(scheduler.appointments.getAppointmentCount(), 0, 'Appointment was deleted');
        });
        QUnit.test('Recurrence exception should be adjusted by appointment timezone after deleting of the single appt', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              text: 'Recruiting students',
              startDate: new Date(2018, 2, 26, 10, 0),
              endDate: new Date(2018, 2, 26, 11, 0),
              recurrenceRule: 'FREQ=DAILY',
              startDateTimeZone: 'Australia/Canberra',
              endDateTimeZone: 'Australia/Canberra'
            }],
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2018, 3, 1),
            recurrenceEditMode: 'occurrence'
          });
          scheduler.appointments.click();
          this.clock.tick(300);
          scheduler.tooltip.clickOnDeleteButton();
          assert.equal(scheduler.appointments.getAppointmentCount(), 0, 'Appointment was deleted');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/scheduler/helpers.js","localization/date","animation/fx","core/utils/date","ui/scheduler/utils.timeZone","ui/scheduler/ui.scheduler","generic_light.css!","core/devices"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/scheduler/helpers.js"), require("localization/date"), require("animation/fx"), require("core/utils/date"), require("ui/scheduler/utils.timeZone"), require("ui/scheduler/ui.scheduler"), require("generic_light.css!"), require("core/devices"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=integration.dstAppointments.tests.js.map