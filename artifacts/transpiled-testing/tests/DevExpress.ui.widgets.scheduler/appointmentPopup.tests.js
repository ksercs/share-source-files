!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/appointmentPopup.tests.js"], ["generic_light.css!","../../helpers/scheduler/helpers.js","jquery","core/devices","ui/select_box","animation/fx","data/data_source/data_source","core/utils/resize_callbacks","localization/message","ui/scheduler/appointmentPopup/form","core/utils/date","ui/scheduler/ui.scheduler","ui/switch"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/appointmentPopup.tests.js", ["generic_light.css!", "../../helpers/scheduler/helpers.js", "jquery", "core/devices", "ui/select_box", "animation/fx", "data/data_source/data_source", "core/utils/resize_callbacks", "localization/message", "ui/scheduler/appointmentPopup/form", "core/utils/date", "ui/scheduler/ui.scheduler", "ui/switch"], function($__export) {
  "use strict";
  var initTestMarkup,
      createWrapper,
      isDesktopEnvironment,
      $,
      devices,
      SelectBox,
      fx,
      DataSource,
      resizeCallbacks,
      messageLocalization,
      APPOINTMENT_FORM_GROUP_NAMES,
      toMs,
      module,
      test,
      APPOINTMENT_POPUP_WIDTH,
      APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE,
      checkFormWithRecurrenceEditor,
      createInstance,
      moduleOptions,
      defaultData,
      createScheduler,
      setWindowWidth,
      resetWindowWidth,
      moduleConfig;
  return {
    setters: [function($__m) {}, function($__m) {
      initTestMarkup = $__m.initTestMarkup;
      createWrapper = $__m.createWrapper;
      isDesktopEnvironment = $__m.isDesktopEnvironment;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      SelectBox = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      messageLocalization = $__m.default;
    }, function($__m) {
      APPOINTMENT_FORM_GROUP_NAMES = $__m.APPOINTMENT_FORM_GROUP_NAMES;
    }, function($__m) {
      toMs = $__m.dateToMilliseconds;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__2;
      (($__2 = QUnit, module = $__2.module, test = $__2.test, $__2));
      APPOINTMENT_POPUP_WIDTH = 485;
      APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE = 970;
      checkFormWithRecurrenceEditor = function(assert, instance, visibility) {
        var width = visibility === true ? APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE : APPOINTMENT_POPUP_WIDTH;
        var colSpan = visibility === true ? 1 : 2;
        var form = instance.getAppointmentDetailsForm();
        assert.equal(form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence).visible, visibility, ("Recurrence Editor is " + (visibility === true ? 'visible' : 'not visible')));
        assert.equal(form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Main).colSpan, colSpan, 'colSpan of main group is correct');
        assert.equal(form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence).colSpan, colSpan, 'colSpan of recurrence group is correct');
        assert.equal(instance._appointmentPopup.popup.option('maxWidth'), width, 'maxWidth of popup is correct');
      };
      createInstance = function(options) {
        var defaultOption = {
          dataSource: [],
          maxAppointmentsPerCell: 2
        };
        return createWrapper($.extend(defaultOption, options));
      };
      moduleOptions = {
        beforeEach: function() {
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
          fx.off = false;
        }
      };
      defaultData = [{
        text: 'recurrent-app',
        startDate: new Date(2017, 4, 1, 9, 30),
        endDate: new Date(2017, 4, 1, 11),
        recurrenceRule: 'FREQ=DAILY;COUNT=5'
      }, {
        text: 'common-app',
        startDate: new Date(2017, 4, 9, 9, 30),
        endDate: new Date(2017, 4, 9, 11)
      }];
      createScheduler = function() {
        var options = arguments[0] !== (void 0) ? arguments[0] : {};
        var defaultOption = {
          dataSource: defaultData,
          views: ['month'],
          currentView: 'month',
          currentDate: new Date(2017, 4, 25),
          firstDayOfWeek: 1,
          startDayHour: 9,
          height: 600,
          width: 600
        };
        return createWrapper($.extend(defaultOption, options));
      };
      setWindowWidth = function(width) {
        Object.defineProperty(document.documentElement, 'clientWidth', {
          get: function() {
            return width;
          },
          configurable: true
        });
      };
      resetWindowWidth = function() {
        return delete document.documentElement.clientWidth;
      };
      QUnit.testStart(function() {
        return initTestMarkup();
      });
      moduleConfig = {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      };
      QUnit.module('Appointment popup form', moduleConfig, function() {
        test('Original appointment\'s fields shouldn\'t fill if used fieldExpr', function(assert) {
          var data = [];
          var textExpValue = 'Subject';
          var scheduler = createScheduler({
            dataSource: data,
            views: ['week'],
            currentView: 'week',
            currentDate: new Date(2021, 4, 27),
            textExpr: textExpValue,
            onAppointmentAdded: function($__3) {
              var appointmentData = $__3.appointmentData;
              assert.strictEqual(appointmentData[textExpValue], 'qwerty', 'Mapped text property should be fill on onAppointmentAdded event');
              assert.strictEqual(appointmentData.text, undefined, 'Original text property should be undefined on onAppointmentAdded event');
            },
            height: 600
          });
          scheduler.instance.showAppointmentPopup();
          scheduler.appointmentForm.setSubject('qwerty', textExpValue);
          scheduler.appointmentPopup.clickDoneButton();
          assert.strictEqual(data[0].Subject, 'qwerty', 'Mapped text property should be fill');
          assert.strictEqual(data[0].text, undefined, 'Original text property should be undefined');
        });
        QUnit.test('Recurrence form should work properly if recurrenceRule property mapped recurrenceRuleExpr', function(assert) {
          var scheduler = createScheduler({
            dataSource: [{
              text: 'Watercolor Landscape',
              startDate: new Date(2017, 4, 1, 9, 30),
              endDate: new Date(2017, 4, 1, 11),
              customRecurrenceRule: 'FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10'
            }],
            views: ['month'],
            currentView: 'month',
            currentDate: new Date(2017, 4, 25),
            recurrenceRuleExpr: 'customRecurrenceRule',
            height: 600
          });
          scheduler.appointments.dblclick(0);
          scheduler.appointmentPopup.dialog.clickEditSeries();
          var form = scheduler.instance._appointmentPopup.form.form;
          assert.ok(form.getEditor('repeat').option('value'), 'repeat checkbox should be checked');
          assert.ok(form.option('items')[1].visible, 'recurrence form should be visible');
          scheduler.instance._appointmentPopup.popup.hide();
          scheduler.instance.showAppointmentPopup();
          assert.notOk(form.getEditor('repeat').option('value'), 'repeat checkbox should be unchecked if empty form');
          assert.notOk(form.option('items')[1].visible, 'recurrence form should be invisible if empty form');
        });
        QUnit.test('showAppointmentPopup method should be work properly with no argument', function(assert) {
          var cases = [function() {
            var appointmentText = 'app';
            var textEditor = scheduler.appointmentForm.getEditor('text');
            var startDateEditor = scheduler.appointmentForm.getEditor('startDate');
            var endDateEditor = scheduler.appointmentForm.getEditor('endDate');
            textEditor.option('value', appointmentText);
            startDateEditor.option('value', new Date(2017, 4, 22, 9, 30));
            endDateEditor.option('value', new Date(2017, 4, 22, 9, 45));
            scheduler.appointmentPopup.clickDoneButton();
            assert.equal(scheduler.appointments.find(appointmentText).length, 1, 'new appointment should be created with base options');
          }, function() {
            var appointmentText = 'app';
            var textEditor = scheduler.appointmentForm.getEditor('text');
            var startDateEditor = scheduler.appointmentForm.getEditor('startDate');
            var endDateEditor = scheduler.appointmentForm.getEditor('endDate');
            textEditor.option('value', appointmentText);
            startDateEditor.option('value', new Date(2017, 4, 22, 9, 30));
            endDateEditor.option('value', new Date(2017, 4, 22, 9, 45));
            scheduler.appointmentPopup.clickCancelButton();
            assert.equal(scheduler.appointments.getAppointmentCount(), 0, 'new appointment shouldn\'t created');
          }, function() {
            var appointmentText = 'all day app';
            var textEditor = scheduler.appointmentForm.getEditor('text');
            var startDateEditor = scheduler.appointmentForm.getEditor('startDate');
            var endDateEditor = scheduler.appointmentForm.getEditor('endDate');
            var visibilityChangedEditor = scheduler.appointmentForm.getEditor('visibilityChanged');
            textEditor.option('value', appointmentText);
            startDateEditor.option('value', new Date(2017, 4, 22, 10, 30));
            endDateEditor.option('value', new Date(2017, 4, 22, 10, 45));
            visibilityChangedEditor.option('value', true);
            scheduler.appointmentPopup.clickDoneButton();
            assert.equal(scheduler.appointments.find(appointmentText).length, 21, 'recurrence appointments should be created');
          }];
          var scheduler = createScheduler();
          cases.forEach(function(testCase) {
            scheduler.option('dataSource', []);
            scheduler.instance.showAppointmentPopup();
            testCase();
          });
        });
        QUnit.test('Appointment popup form should have two named groups', function(assert) {
          var scheduler = createScheduler({dataSource: []});
          var data = {
            text: 'appointment',
            startDate: new Date(2017, 4, 1, 9, 30),
            endDate: new Date(2017, 4, 1, 11)
          };
          scheduler.instance.showAppointmentPopup(data);
          var form = scheduler.instance.getAppointmentDetailsForm();
          assert.equal(form.option('items')[0].name, APPOINTMENT_FORM_GROUP_NAMES.Main, 'first group name is correct');
          assert.equal(form.option('items')[1].name, APPOINTMENT_FORM_GROUP_NAMES.Recurrence, 'second group name is correct');
        });
        QUnit.test('Appointment popup should be with correct dates after change allDay switch and w/o saving (T832711)', function(assert) {
          var scheduler = createScheduler({dataSource: []});
          var data = {
            text: 'all day apo',
            startDate: new Date(2017, 4, 1, 9, 30),
            endDate: new Date(2017, 4, 1, 11),
            allDay: true
          };
          scheduler.instance.showAppointmentPopup(data);
          var allDayEditor = scheduler.appointmentForm.getEditor('allDay');
          allDayEditor.option('value', false);
          scheduler.appointmentPopup.clickCancelButton();
          scheduler.instance.showAppointmentPopup(data);
          assert.deepEqual(scheduler.appointmentForm.getEditor('startDate').option('value'), data.startDate);
          assert.deepEqual(scheduler.appointmentForm.getEditor('endDate').option('value'), data.endDate);
        });
        QUnit.test('onAppointmentFormOpening event should pass e.popup argument', function(assert) {
          var data = [{
            text: 'Website Re-Design Plan',
            startDate: new Date(2017, 4, 22, 9, 30),
            endDate: new Date(2017, 4, 22, 11, 30)
          }];
          var scheduler = createScheduler({
            dataSource: data,
            onAppointmentFormOpening: function(e) {
              assert.equal(e.popup.NAME, 'dxPopup', 'e.popup should be instance of dxPopup');
              e.popup.option('showTitle', true);
              e.popup.option('title', 'Information');
            }
          });
          scheduler.appointments.dblclick();
          assert.equal(scheduler.appointmentPopup.getPopupTitleElement().length, 1, 'title should be visible, after set dxPopup property on onAppointmentFormOpening');
        });
        QUnit.test('onAppointmentFormOpening event should handle e.cancel value', function(assert) {
          var data = [{
            text: 'Website Re-Design Plan',
            startDate: new Date(2017, 4, 22, 9, 30),
            endDate: new Date(2017, 4, 22, 11, 30)
          }];
          var scheduler = createScheduler({dataSource: data});
          var testCases = [{
            expected: true,
            handler: undefined,
            text: 'appointment popup should visible in default setting case'
          }, {
            expected: false,
            handler: function(e) {
              return e.cancel = true;
            },
            text: 'appointment popup should prevent visible in \'e.cancel = true\' case'
          }, {
            expected: true,
            handler: function(e) {
              return e.cancel = false;
            },
            text: 'appointment popup should visible in \'e.cancel = false\' case'
          }];
          testCases.forEach(function($__3) {
            var $__4 = $__3,
                handler = $__4.handler,
                expected = $__4.expected,
                text = $__4.text;
            scheduler.option('onAppointmentFormOpening', handler);
            scheduler.appointments.dblclick();
            assert.equal(scheduler.appointmentPopup.isVisible(), expected, text + ' if call from UI');
            scheduler.instance._appointmentPopup.popup.option('visible', false);
            scheduler.instance.showAppointmentPopup(data[0]);
            assert.equal(scheduler.appointmentPopup.isVisible(), expected, text + ' if call showAppointmentPopup method');
            scheduler.instance._appointmentPopup.popup.option('visible', false);
          });
        });
        QUnit.test('Appointment popup shouldn\'t render recurrence editor, if previous was with recurrence', function(assert) {
          var scheduler = createScheduler();
          scheduler.appointments.dblclick();
          scheduler.appointmentPopup.dialog.clickEditSeries();
          assert.ok(scheduler.appointmentPopup.form.isRecurrenceEditorVisible(), 'Recurrence editor should visible');
          assert.equal(scheduler.appointmentPopup.form.getSubject(), 'recurrent-app', 'Subject should equal selected recurrence appointment');
          scheduler.appointmentPopup.clickCancelButton();
          scheduler.appointments.dblclick(5);
          assert.notOk(scheduler.appointmentPopup.form.isRecurrenceEditorVisible(), 'Recurrence editor shouldn\'t visible');
          assert.equal(scheduler.appointmentPopup.form.getSubject(), 'common-app', 'Subject in form should equal selected common appointment');
        });
        QUnit.test('Appointment popup should work properly', function(assert) {
          var NEW_EXPECTED_SUBJECT = 'NEW SUBJECT';
          var scheduler = createScheduler();
          var appointmentPopup = scheduler.appointmentPopup;
          assert.notOk(appointmentPopup.isVisible(), 'Appointment popup should be invisible in on init');
          scheduler.appointments.click(scheduler.appointments.getAppointmentCount() - 1);
          scheduler.tooltip.clickOnItem();
          appointmentPopup.form.setSubject(NEW_EXPECTED_SUBJECT);
          assert.ok(appointmentPopup.isVisible(), 'Appointment popup should be visible after showAppointmentPopup method');
          appointmentPopup.clickDoneButton();
          var dataItem = scheduler.instance.option('dataSource')[1];
          assert.equal(Object.keys(dataItem).length, 3, 'In appointment properties shouldn\'t added excess properties');
          assert.equal(dataItem.text, NEW_EXPECTED_SUBJECT, ("Text property of appointment should be changed on " + NEW_EXPECTED_SUBJECT));
          scheduler.appointments.click(0);
          scheduler.tooltip.clickOnItem();
          appointmentPopup.dialog.clickEditSeries();
          assert.ok(appointmentPopup.form.isRecurrenceEditorVisible(), 'Recurrence editor should be visible after click on recurrence appointment');
          assert.equal(appointmentPopup.form.getSubject(), defaultData[0].text, 'Subject in form should equal selected appointment');
        });
        QUnit.test('Recurrence repeat-end editor should have default \'never\' value after reopening appointment popup', function(assert) {
          var firstAppointment = {
            startDate: new Date(2015, 1, 9),
            endDate: new Date(2015, 1, 9, 1),
            text: 'caption 1'
          };
          var secondAppointment = {
            startDate: new Date(2015, 1, 9),
            endDate: new Date(2015, 1, 9, 1),
            text: 'caption 2'
          };
          var scheduler = createScheduler();
          scheduler.instance.showAppointmentPopup(firstAppointment);
          var form = scheduler.instance.getAppointmentDetailsForm();
          var visibilityChanged = form.getEditor('visibilityChanged');
          visibilityChanged.option('value', true);
          var repeatEndEditor = form.getEditor('recurrenceRule').getEditorByField('repeatEnd');
          repeatEndEditor.option('value', 'count');
          scheduler.appointmentPopup.clickDoneButton();
          scheduler.instance.showAppointmentPopup(secondAppointment);
          form = scheduler.instance.getAppointmentDetailsForm();
          visibilityChanged = form.getEditor('visibilityChanged');
          visibilityChanged.option('value', true);
          assert.strictEqual(repeatEndEditor.option('value'), 'never', 'Repeat-type editor value is ok');
        });
        QUnit.test('Update appointment if CustomStore', function(assert) {
          var done = assert.async();
          var data = [{
            startDate: new Date(2015, 4, 24, 9),
            endDate: new Date(2015, 4, 24, 11)
          }];
          var scheduler = createScheduler({
            views: ['day'],
            dataSource: {
              key: 'id',
              load: function() {
                return data;
              },
              update: function(key, values) {
                return new Promise(function(resolve) {
                  setTimeout(function() {
                    var appointmentData = data.filter(function(item) {
                      return item.id === key;
                    })[0];
                    $.extend(appointmentData, values);
                    scheduler.instance.repaint();
                    resolve();
                    done();
                  }, 200);
                });
              }
            },
            currentDate: new Date(2015, 4, 24),
            startDayHour: 8,
            endDayHour: 18
          });
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 4, 24, 9),
            endDate: new Date(2015, 4, 24, 11),
            text: 'Subject'
          });
          scheduler.appointmentForm.setSubject('New Subject');
          var deferred = scheduler.appointmentPopup.saveAppointmentData();
          assert.notOk(scheduler.appointmentPopup.getInstance()._tryLockSaveChanges(), 'Save changes already locked');
          assert.ok(scheduler.appointmentPopup.hasLoadPanel(), 'has load panel');
          deferred.done(function() {
            assert.notOk(scheduler.appointmentPopup.hasLoadPanel(), 'has no load panel');
            assert.equal(scheduler.appointments.getTitleText(0), 'New Subject', 'Subject is correct');
          });
        });
        QUnit.test('Insert appointment if CustomStore', function(assert) {
          var done = assert.async();
          var data = [];
          var scheduler = createScheduler({
            views: ['day'],
            dataSource: {
              key: 'id',
              load: function() {
                return data;
              },
              insert: function(appointmentData) {
                return new Promise(function(resolve) {
                  setTimeout(function() {
                    appointmentData.id = data.length;
                    data.push(appointmentData);
                    resolve();
                    done();
                  }, 200);
                });
              }
            },
            currentDate: new Date(2015, 4, 24),
            startDayHour: 8,
            endDayHour: 18
          });
          scheduler.instance.showAppointmentPopup();
          scheduler.appointmentForm.setSubject('New Subject');
          scheduler.appointmentForm.setStartDate(new Date(2015, 4, 24, 9));
          scheduler.appointmentForm.setEndDate(new Date(2015, 4, 24, 11));
          var deferred = scheduler.appointmentPopup.saveAppointmentData();
          assert.ok(scheduler.appointmentPopup.hasLoadPanel(), 'has load panel');
          deferred.done(function() {
            assert.notOk(scheduler.appointmentPopup.hasLoadPanel(), 'has no load panel');
            assert.equal(scheduler.appointments.getTitleText(0), 'New Subject', 'Subject is correct');
          });
        });
        [true, false].forEach(function(cancel) {
          QUnit.test(("onAppointmentUpdating and e.cancel=" + cancel + " (T907281)"), function(assert) {
            var data = [{
              startDate: new Date(2015, 4, 24, 9),
              endDate: new Date(2015, 4, 24, 11),
              text: 'Subject'
            }];
            var scheduler = createScheduler({
              views: ['day'],
              dataSource: data,
              currentDate: new Date(2015, 4, 24),
              startDayHour: 8,
              endDayHour: 18,
              onAppointmentUpdating: function(e) {
                return e.cancel = cancel;
              }
            });
            scheduler.instance.showAppointmentPopup(data[0]);
            scheduler.appointmentForm.setSubject('New Subject');
            scheduler.appointmentPopup.saveAppointmentData();
            assert.notOk(scheduler.appointmentPopup.hasLoadPanel(), 'Has no load panel');
            var subject = cancel ? 'Subject' : 'New Subject';
            assert.equal(scheduler.appointments.getTitleText(0), subject, 'Subject is correct');
          });
          QUnit.test(("onAppointmentAdding and e.cancel=" + cancel), function(assert) {
            var scheduler = createScheduler({
              views: ['day'],
              dataSource: [],
              currentDate: new Date(2015, 4, 24),
              startDayHour: 8,
              endDayHour: 18,
              onAppointmentAdding: function(e) {
                return e.cancel = cancel;
              }
            });
            scheduler.instance.showAppointmentPopup();
            scheduler.appointmentForm.setStartDate(new Date(2015, 4, 24, 9));
            scheduler.appointmentForm.setEndDate(new Date(2015, 4, 24, 11));
            scheduler.appointmentForm.setSubject('New Subject');
            scheduler.appointmentPopup.saveAppointmentData();
            assert.notOk(scheduler.appointmentPopup.hasLoadPanel(), 'Has no load panel');
            var subject = cancel ? '' : 'New Subject';
            assert.equal(scheduler.appointments.getTitleText(0), subject, 'Subject is correct');
          });
          QUnit.test(("onAppointmentDeleting and e.cancel=" + cancel), function(assert) {
            var clock = sinon.useFakeTimers();
            var data = [{
              text: 'Some Text',
              startDate: new Date(2015, 4, 24, 9),
              endDate: new Date(2015, 4, 24, 11)
            }];
            var scheduler = createScheduler({
              views: ['day'],
              dataSource: data,
              currentDate: new Date(2015, 4, 24),
              startDayHour: 8,
              endDayHour: 18,
              onAppointmentDeleting: function(e) {
                return e.cancel = cancel;
              }
            });
            scheduler.instance.deleteAppointment(data[0]);
            clock.tick(10);
            assert.notOk(scheduler.appointmentPopup.hasLoadPanel(), 'Has no load panel');
            var subject = cancel ? 'Some Text' : '';
            assert.equal(scheduler.appointments.getTitleText(0), subject, 'Subject is correct');
            clock.restore();
          });
        });
        QUnit.module('toolbar', function() {
          [true, false].forEach(function(allowUpdatingValue) {
            var data = [{
              text: 'Website Re-Design Plan',
              startDate: new Date(2017, 4, 22, 9, 30),
              endDate: new Date(2017, 4, 22, 11, 30),
              disabled: true
            }, {
              text: 'Book Flights to San Fran for Sales Trip',
              startDate: new Date(2017, 4, 22, 12, 0),
              endDate: new Date(2017, 4, 22, 13, 0)
            }];
            QUnit.test(("done button visibility in case allowUpdatingValue = " + allowUpdatingValue), function(assert) {
              var scheduler = createWrapper({
                dataSource: data,
                views: ['week'],
                currentView: 'week',
                currentDate: new Date(2017, 4, 25),
                editing: {allowUpdating: allowUpdatingValue}
              });
              var assertText = ("done button visibility should be equal to = " + allowUpdatingValue);
              for (var i = 0; i < scheduler.appointments.getAppointmentCount(); i++) {
                scheduler.appointments.dblclick(i);
                assert.equal(scheduler.appointmentPopup.getDoneButton().length > 0, allowUpdatingValue, assertText);
                scheduler.appointmentPopup.clickCancelButton();
              }
            });
          });
          QUnit.test('toolbar should be re-rendered after change editing option', function(assert) {
            var scheduler = createWrapper({
              dataSource: [],
              views: ['week'],
              currentView: 'week',
              currentDate: new Date(2017, 4, 25),
              editing: {allowUpdating: true}
            });
            var dataObj = {
              text: 'a',
              startDate: new Date(2015, 5, 15, 10),
              endDate: new Date(2015, 5, 15, 11)
            };
            scheduler.instance.showAppointmentPopup(dataObj);
            assert.ok(scheduler.appointmentPopup.getDoneButton().length > 0, '"done" button should be visible');
            scheduler.option('editing', {allowUpdating: false});
            scheduler.instance.showAppointmentPopup(dataObj);
            assert.notOk(scheduler.appointmentPopup.getDoneButton().length > 0, '"done" button shouldn\'t be visible after set allowUpdating option to false');
            scheduler.instance.showAppointmentPopup();
            assert.ok(scheduler.appointmentPopup.getDoneButton().length > 0, '"done" button should be visible in case \'create new appointment\'');
          });
        });
      });
      if (isDesktopEnvironment()) {
        QUnit.module('Appointment Popup and Recurrence Editor visibility', {
          beforeEach: function() {
            fx.off = true;
            setWindowWidth(1000);
          },
          afterEach: function() {
            fx.off = false;
            resetWindowWidth();
          }
        });
        QUnit.test('Recurrence editor container should be visible if recurrence rule was set', function(assert) {
          var scheduler = createScheduler();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2018, 5, 18),
            endDate: Date(2018, 5, 18),
            text: 'a',
            recurrenceRule: 'FREQ=WEEKLY'
          });
          $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
          checkFormWithRecurrenceEditor(assert, scheduler.instance, true);
        });
        QUnit.test('Recurrence editor container should be visible after changing its visibility value', function(assert) {
          var scheduler = createScheduler();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2018, 5, 18),
            endDate: Date(2018, 5, 18),
            text: 'a'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          checkFormWithRecurrenceEditor(assert, scheduler.instance, false);
          form.getEditor('visibilityChanged').option('value', true);
          checkFormWithRecurrenceEditor(assert, scheduler.instance, true);
          form.getEditor('visibilityChanged').option('value', false);
          checkFormWithRecurrenceEditor(assert, scheduler.instance, false);
        });
        QUnit.test('Popup should show or not show reccurence editor after many opening with different data', function(assert) {
          var scheduler = createScheduler();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2018, 5, 18),
            endDate: Date(2018, 5, 18),
            text: 'a'
          });
          checkFormWithRecurrenceEditor(assert, scheduler.instance, false);
          scheduler.instance._appointmentPopup.popup.hide();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2018, 5, 18),
            endDate: Date(2018, 5, 18),
            text: 'b',
            recurrenceRule: 'FREQ=WEEKLY'
          });
          $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
          checkFormWithRecurrenceEditor(assert, scheduler.instance, true);
          scheduler.instance._appointmentPopup.popup.hide();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2018, 5, 18),
            endDate: Date(2018, 5, 18),
            text: 'c'
          });
          checkFormWithRecurrenceEditor(assert, scheduler.instance, false);
        });
        QUnit.test('Popup should show or not to show reccurence editor after many opening with and change visibility', function(assert) {
          var scheduler = createScheduler();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2018, 5, 18),
            endDate: Date(2018, 5, 18),
            text: 'a'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          form.getEditor('visibilityChanged').option('value', true);
          scheduler.instance._appointmentPopup.popup.hide();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2018, 5, 18),
            endDate: Date(2018, 5, 18),
            text: 'b',
            recurrenceRule: 'FREQ=WEEKLY'
          });
          $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
          checkFormWithRecurrenceEditor(assert, scheduler.instance, true);
        });
        QUnit.test('Popup should not contain recurrence editor, if recurrenceRuleExpr is null', function(assert) {
          var scheduler = createScheduler();
          var appointment = {
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption',
            recurrenceRule: 'FREQ=YEARLY'
          };
          scheduler.instance.option('recurrenceRuleExpr', null);
          scheduler.instance.showAppointmentPopup(appointment);
          var form = scheduler.instance.getAppointmentDetailsForm();
          assert.ok(!form.getEditor(null), 'Editor is not rendered');
          assert.equal(scheduler.instance._appointmentPopup.popup.option('maxWidth'), APPOINTMENT_POPUP_WIDTH);
          assert.equal(form.option('items')[0].colSpan, 2, 'colSpan of main group');
          scheduler.instance.option('recurrenceRuleExpr', 'recurrenceRule');
          scheduler.instance.showAppointmentPopup(appointment);
          $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
          checkFormWithRecurrenceEditor(assert, scheduler.instance, true, APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE, 1);
        });
        QUnit.test('Popup should not contain recurrence editor, if recurrenceRuleExpr is \'\'', function(assert) {
          var scheduler = createScheduler();
          var appointment = {
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption',
            recurrenceRule: 'FREQ=YEARLY'
          };
          scheduler.instance.option('recurrenceRuleExpr', '');
          scheduler.instance.showAppointmentPopup(appointment);
          var form = scheduler.instance.getAppointmentDetailsForm();
          assert.ok(!form.getEditor(null), 'Editor is not rendered');
          assert.equal(scheduler.instance._appointmentPopup.popup.option('maxWidth'), APPOINTMENT_POPUP_WIDTH);
          assert.equal(form.option('items')[0].colSpan, 2, 'colSpan of main group');
        });
        QUnit.test('Multiple showing appointment popup for recurrence appointments and after update options should work correct', function(assert) {
          var scheduler = createScheduler();
          scheduler.instance.showAppointmentPopup({
            text: 'Appointment 1',
            startDate: new Date(2017, 4, 1, 9, 30),
            endDate: new Date(2017, 4, 1, 11)
          });
          scheduler.instance.hideAppointmentPopup(true);
          scheduler.instance.option('recurrenceEditMode', 'series');
          scheduler.instance.showAppointmentPopup({
            text: 'Appointment 2',
            startDate: new Date(2017, 4, 1, 9, 30),
            endDate: new Date(2017, 4, 1, 11),
            recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TH'
          });
          checkFormWithRecurrenceEditor(assert, scheduler.instance, true);
        });
      }
      QUnit.module('Appointment Popup Content', moduleOptions, function() {
        QUnit.test('appointmentPopup should not prevent mouse/touch events by default (T968188)', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2)
          });
          var appointmentPopupOptions = scheduler.instance._appointmentPopup.popup.option();
          assert.strictEqual(appointmentPopupOptions.enableBodyScroll, false, 'enable body scroll');
          assert.strictEqual(appointmentPopupOptions.preventScrollEvents, false, 'prevent scroll events');
        });
        QUnit.test('showAppointmentPopup method with passed a recurrence appointment should render popup(T698732)', function(assert) {
          var appointments = [{
            text: 'TEST_TEXT',
            startDate: new Date(2017, 4, 1, 9, 30),
            endDate: new Date(2017, 4, 1, 11),
            recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TH;COUNT=10'
          }];
          var scheduler = createInstance({
            dataSource: appointments,
            currentDate: new Date(2017, 4, 25),
            startDayHour: 9
          });
          scheduler.instance.showAppointmentPopup(appointments[0], false);
          var popupChoiceAppointmentEdit = $('.dx-popup-normal.dx-resizable').not('.dx-state-invisible');
          assert.equal(popupChoiceAppointmentEdit.length, 1, 'Popup with choice edit mode is rendered');
          popupChoiceAppointmentEdit.find('.dx-popup-bottom .dx-button:eq(1)').trigger('dxclick');
          assert.equal($('.dx-scheduler-appointment-popup').length, 2, 'Appointment popup is rendered');
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateBox = form.getEditor('startDate');
          var endDateBox = form.getEditor('endDate');
          assert.equal(startDateBox.option('value').valueOf(), appointments[0].startDate.valueOf(), 'Value in start dateBox valid');
          assert.equal(endDateBox.option('value').valueOf(), appointments[0].endDate.valueOf(), 'Value in end dateBox valid');
        });
        QUnit.test('showAppointmentPopup should render a popup only once', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2)
          });
          assert.equal($('.dx-scheduler-appointment-popup').length, 2, 'Popup is rendered');
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2)
          });
          assert.equal($('.dx-scheduler-appointment-popup').length, 2, 'Popup is rendered');
        });
        QUnit.test('showAppointmentPopup should work correctly after scheduler repainting', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2)
          });
          assert.equal($('.dx-scheduler-appointment-popup').length, 2, 'Popup is rendered');
          scheduler.instance.repaint();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2)
          });
          assert.equal($('.dx-scheduler-appointment-popup').length, 2, 'Popup is rendered');
        });
        QUnit.test('changing editing should work correctly after showing popup', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2)
          });
          scheduler.instance.hideAppointmentPopup(true);
          scheduler.instance.option('editing.allowUpdating', false);
          scheduler.instance.option('editing.allowUpdating', true);
          assert.ok(true, 'OK');
        });
        QUnit.test('hideAppointmentPopup should hide a popup', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2)
          });
          assert.equal($('.dx-scheduler-appointment-popup').length, 2, 'Popup is rendered');
          scheduler.instance.hideAppointmentPopup();
          assert.equal($('.dx-scheduler-appointment-popup').length, 1, 'Popup is hidden');
        });
        QUnit.test('hideAppointmentPopup should hide a popup and save changes', function(assert) {
          var scheduler = createInstance({
            currentDate: new Date(2016, 9, 10),
            currentView: 'month'
          });
          scheduler.instance.showAppointmentPopup({
            text: '1',
            startDate: new Date(2016, 9, 10),
            endDate: new Date(2016, 9, 11)
          }, true);
          assert.equal($('.dx-scheduler-appointment-popup').length, 2, 'Popup is rendered');
          scheduler.instance.hideAppointmentPopup(true);
          assert.equal($('.dx-scheduler-appointment-popup').length, 1, 'Popup is hidden');
          assert.equal($('.dx-scheduler-appointment').length, 1, 'appointment is created');
        });
        QUnit.test('showAppointmentPopup should render a popup form only once', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2),
            text: 'appointment 1'
          });
          var $form = $('.dx-scheduler-appointment-popup').find('.dx-form').not('.dx-recurrence-editor-container');
          assert.equal($form.length, 1, 'Form was rendered');
          scheduler.instance.hideAppointmentPopup();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2),
            text: 'appointment 2'
          });
          assert.equal($form.find('.dx-textbox').eq(0).dxTextBox('instance').option('text'), 'appointment 2', 'Form data is correct');
        });
        QUnit.test('popup should have right height', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2),
            text: 'appointment 1'
          });
          var popup = scheduler.instance._appointmentPopup.popup;
          assert.equal(popup.option('height'), 'auto', 'popup has correct height');
          assert.equal(popup.option('maxHeight'), '100%', 'popup has correct max-height');
        });
        QUnit.test('showAppointmentPopup should render a popup content only once', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2),
            text: 'appointment 1'
          });
          var popup = scheduler.instance._appointmentPopup.popup;
          var contentReadyCalled = 0;
          popup.option('onContentReady', function() {
            contentReadyCalled++;
          });
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2),
            text: 'appointment 2'
          });
          assert.equal(contentReadyCalled, 0, 'Content wasn\'t rerendered');
        });
        QUnit.test('Popup should contain editors and components with right dx-rtl classes and rtlEnabled option value', function(assert) {
          var scheduler = createWrapper({rtlEnabled: true});
          scheduler.instance.showAppointmentPopup({});
          var $innerSwitch = $('.dx-scheduler-appointment-popup .dx-switch').eq(0);
          assert.ok($innerSwitch.hasClass('dx-rtl'), 'Inner editor has dx-rtl class');
          assert.equal($innerSwitch.dxSwitch('instance').option('rtlEnabled'), true, 'rtlEnabled option value is right');
        });
        QUnit.test('Popup should contains start datebox with right value', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption'
          });
          var $popupContent = $('.dx-scheduler-appointment-popup .dx-popup-content');
          var $dateBox = $popupContent.find('.dx-datebox').eq(0);
          assert.equal($dateBox.length, 1, 'Start date box is rendered');
          assert.deepEqual($dateBox.dxDateBox('instance').option('value'), new Date(2015, 1, 1, 1), 'value is right');
        });
        QUnit.test('Calendar of the start datebox should have right firstDayOfWeek value', function(assert) {
          if (devices.current().deviceType === 'desktop') {
            var scheduler = createInstance({firstDayOfWeek: 4});
            scheduler.instance.showAppointmentPopup({
              startDate: new Date(2015, 1, 1, 1),
              endDate: new Date(2015, 1, 1, 2),
              text: 'caption'
            });
            var $popupContent = $('.dx-scheduler-appointment-popup .dx-popup-content');
            var startDateBox = $popupContent.find('.dx-datebox').eq(0).dxDateBox('instance');
            startDateBox.open();
            var calendar = startDateBox._popup.$content().find('.dx-calendar').dxCalendar('instance');
            assert.equal(calendar.option('firstDayOfWeek'), 4, 'firstDayOfWeek is right');
          } else {
            assert.ok(true, 'It doesn\'t make sense on mobile devices');
          }
        });
        QUnit.test('Popup should contains end datebox with right value', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption'
          });
          var $popupContent = $('.dx-scheduler-appointment-popup .dx-popup-content');
          var $dateBox = $popupContent.find('.dx-datebox').eq(1);
          assert.equal($dateBox.length, 1, 'End datebox is rendered');
          assert.deepEqual($dateBox.dxDateBox('instance').option('value'), new Date(2015, 1, 1, 2), 'value is right');
        });
        QUnit.test('Calendar of the end datebox should have right firstDayOfWeek value', function(assert) {
          if (devices.current().deviceType === 'desktop') {
            var scheduler = createInstance({firstDayOfWeek: 4});
            scheduler.instance.showAppointmentPopup({
              startDate: new Date(2015, 1, 1, 1),
              endDate: new Date(2015, 1, 1, 2),
              text: 'caption'
            });
            var $popupContent = $('.dx-scheduler-appointment-popup .dx-popup-content');
            var endDateBox = $popupContent.find('.dx-datebox').eq(1).dxDateBox('instance');
            endDateBox.open();
            var calendar = endDateBox._popup.$content().find('.dx-calendar').dxCalendar('instance');
            assert.equal(calendar.option('firstDayOfWeek'), 4, 'firstDayOfWeek is right');
          } else {
            assert.ok(true, 'It doesn\'t make sense on mobile devices');
          }
        });
        QUnit.test('Changing startDateBox value should change endDateBox value if needed', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 3),
            text: 'caption'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateBox = form.getEditor('startDate');
          var endDateBox = form.getEditor('endDate');
          startDateBox.option('value', new Date(2015, 1, 4));
          assert.deepEqual(endDateBox.option('value'), new Date(2015, 1, 6), 'endDate value is right');
          startDateBox.option('value', new Date(2015, 1, 3));
          assert.deepEqual(endDateBox.option('value'), new Date(2015, 1, 6), 'endDate value is right');
        });
        QUnit.test('Changing startDateBox value should change endDateBox value if needed(when startDate and endDate are strings)', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: '1/1/2015',
            endDate: '1/3/2015',
            text: 'caption'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateBox = form.getEditor('startDate');
          var endDateBox = form.getEditor('endDate');
          startDateBox.option('value', new Date(2015, 1, 4));
          assert.deepEqual(endDateBox.option('value'), new Date(2015, 1, 6), 'endDate value is right');
          startDateBox.option('value', new Date(2015, 1, 3));
          assert.deepEqual(endDateBox.option('value'), new Date(2015, 1, 6), 'endDate value is right');
        });
        QUnit.test('startDateBox value should be valid', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 3),
            text: 'caption'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateBox = form.getEditor('startDate');
          startDateBox.option('value', undefined);
          assert.deepEqual(startDateBox.option('value'), new Date(2015, 1, 1), 'startDate value is initial value');
        });
        QUnit.test('Changing endDateBox value should change startDateBox value if needed', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 10),
            endDate: new Date(2015, 1, 13),
            text: 'caption'
          });
          var $popupContent = $('.dx-scheduler-appointment-popup .dx-popup-content');
          var startDateBox = $popupContent.find('.dx-datebox').eq(0).dxDateBox('instance');
          var endDateBox = $popupContent.find('.dx-datebox').eq(1).dxDateBox('instance');
          endDateBox.option('value', new Date(2015, 1, 9));
          assert.deepEqual(startDateBox.option('value'), new Date(2015, 1, 6), 'startDate value is right');
          endDateBox.option('value', new Date(2015, 1, 10));
          assert.deepEqual(startDateBox.option('value'), new Date(2015, 1, 6), 'startDate value is right');
        });
        QUnit.test('Changing endDateBox value should change startDateBox value if needed(when startDate and endDate are strings)', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: '1/10/2015',
            endDate: '1/13/2015',
            text: 'caption'
          });
          var $popupContent = $('.dx-scheduler-appointment-popup .dx-popup-content');
          var startDateBox = $popupContent.find('.dx-datebox').eq(0).dxDateBox('instance');
          var endDateBox = $popupContent.find('.dx-datebox').eq(1).dxDateBox('instance');
          endDateBox.option('value', new Date(2015, 0, 9));
          assert.deepEqual(startDateBox.option('value'), new Date(2015, 0, 6), 'startDate value is right');
          endDateBox.option('value', new Date(2015, 0, 10));
          assert.deepEqual(startDateBox.option('value'), new Date(2015, 0, 6), 'startDate value is right');
        });
        QUnit.test('endDateBox value should be valid', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 3),
            text: 'caption'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var endDateBox = form.getEditor('endDate');
          endDateBox.option('value', undefined);
          assert.deepEqual(endDateBox.option('value'), new Date(2015, 1, 3), 'endDate value is initial value');
        });
        QUnit.test('Popup should contains caption textbox with right value', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var textBox = form.getEditor('text');
          assert.equal(textBox.$element().length, 1, 'Caption text is rendered');
          assert.equal(textBox.option('value'), 'caption', 'value is right');
        });
        QUnit.test('Confirm dialog should be shown when showAppointmentPopup for recurrence appointment was called', function(assert) {
          var scheduler = createInstance({});
          var startDate = new Date(2015, 1, 1, 1);
          scheduler.instance.showAppointmentPopup({
            startDate: startDate,
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption',
            recurrenceRule: 'FREQ=YEARLY'
          });
          assert.ok($('.dx-dialog').length, 'Dialog was shown');
          $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
        });
        QUnit.test('Recurrence Editor should have right freq editor value if recurrence rule was set on init', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2018, 5, 18),
            endDate: Date(2018, 5, 18),
            text: 'a',
            recurrenceRule: 'FREQ=WEEKLY'
          });
          $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
          var form = scheduler.instance.getAppointmentDetailsForm();
          var recurrenceEditor = form.getEditor('recurrenceRule');
          var freqEditor = recurrenceEditor.getEditorByField('freq');
          assert.equal(freqEditor.option('value'), 'weekly', 'value is right');
        });
        QUnit.test('Popup should contain recurrence editor with right config', function(assert) {
          var scheduler = createInstance({
            recurrenceEditMode: 'series',
            firstDayOfWeek: 5
          });
          var startDate = new Date(2015, 1, 1, 1);
          scheduler.instance.showAppointmentPopup({
            startDate: startDate,
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption',
            recurrenceRule: 'FREQ=YEARLY'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var recurrenceEditor = form.getEditor('recurrenceRule');
          assert.equal(recurrenceEditor.option('value'), 'FREQ=YEARLY', 'value is right');
          assert.deepEqual(recurrenceEditor.option('startDate'), startDate, 'startDate value is right');
          assert.equal(recurrenceEditor.option('firstDayOfWeek'), 5, 'firstDayOfWeek value is right');
        });
        QUnit.test('Recurrence editor should change value if freq editor value changed', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2018, 5, 18),
            endDate: Date(2018, 5, 18),
            text: 'a',
            recurrenceRule: 'FREQ=WEEKLY'
          });
          $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
          var form = scheduler.instance.getAppointmentDetailsForm();
          var recurrenceEditor = form.getEditor('recurrenceRule');
          var freqEditor = recurrenceEditor.getEditorByField('freq');
          freqEditor.option('value', 'daily');
          assert.equal(recurrenceEditor.option('value'), 'FREQ=DAILY', 'recEditor has right value');
        });
        QUnit.test('Recurrence editor should has right startDate after form items change', function(assert) {
          var scheduler = createInstance({onAppointmentFormOpening: function(e) {
              var items = e.form.option('items');
              items.push({
                dataField: 'location',
                editorType: 'dxTextBox',
                label: {text: 'Location'}
              });
              e.form.option('items', items);
            }});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2016, 5, 4),
            endDate: new Date(2016, 5, 5),
            recurrenceRule: 'FREQ=WEEKLY'
          });
          $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
          var form = scheduler.instance.getAppointmentDetailsForm();
          var recEditor = form.getEditor('recurrenceRule');
          assert.deepEqual(recEditor.option('startDate'), new Date(2016, 5, 4), 'startDate is ok');
        });
        QUnit.test('Popup should contains description editor', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption',
            description: 'First task of this day'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var descriptionEditor = form.getEditor('description');
          assert.equal(descriptionEditor.$element().length, 1, 'Description editor is rendered');
          assert.equal(descriptionEditor.option('value'), 'First task of this day', 'value is right');
        });
        QUnit.test('Popup should contains allDay editor', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption',
            description: 'First task of this day',
            allDay: true
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var allDayEditor = form.getEditor('allDay');
          assert.equal(allDayEditor.option('value'), true, 'value is right');
        });
        QUnit.test('allDay changing should switch date & type in editors', function(assert) {
          var scheduler = createInstance({startDayHour: 5});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 6),
            endDate: new Date(2015, 1, 2, 7),
            text: 'caption',
            description: 'First task of this day'
          });
          var $popupContent = $('.dx-scheduler-appointment-popup .dx-popup-content');
          var $allDayEditor = $popupContent.find('.dx-switch').eq(0);
          var allDayEditor = $allDayEditor.dxSwitch('instance');
          allDayEditor.option('value', true);
          var startDate = $popupContent.find('.dx-datebox').eq(0).dxDateBox('instance');
          var endDate = $popupContent.find('.dx-datebox').eq(1).dxDateBox('instance');
          assert.deepEqual(startDate.option('value'), new Date(2015, 1, 1), 'value is right');
          assert.equal(startDate.option('type'), 'date', 'type is right');
          assert.deepEqual(endDate.option('value'), new Date(2015, 1, 1), 'value is right');
          assert.equal(endDate.option('type'), 'date', 'type is right');
          allDayEditor.option('value', false);
          assert.equal(startDate.option('type'), 'datetime', 'type is right after turning off allDay');
          assert.equal(endDate.option('type'), 'datetime', 'type is right after turning off allDay');
          assert.deepEqual(startDate.option('value'), new Date(2015, 1, 1, 5), 'startdate is OK');
          assert.deepEqual(endDate.option('value'), new Date(2015, 1, 1, 5, 30), 'enddate is OK');
        });
        QUnit.test('allDay changing should switch only type in editors, if startDate is undefined', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            text: 'test appointment',
            allDay: true
          }, true, null);
          var $popupContent = $('.dx-scheduler-appointment-popup .dx-popup-content');
          var $allDayEditor = $popupContent.find('.dx-switch').eq(0);
          var allDayEditor = $allDayEditor.dxSwitch('instance');
          allDayEditor.option('value', false);
          var startDate = $popupContent.find('.dx-datebox').eq(0).dxDateBox('instance');
          var endDate = $popupContent.find('.dx-datebox').eq(1).dxDateBox('instance');
          assert.equal(startDate.option('type'), 'datetime', 'type is right');
          assert.equal(endDate.option('type'), 'datetime', 'type is right');
          assert.deepEqual(startDate.option('value'), null, 'value is right');
          assert.deepEqual(endDate.option('value'), null, 'value is right');
          allDayEditor.option('value', true);
          assert.equal(startDate.option('type'), 'date', 'type is right after turning off allDay');
          assert.equal(endDate.option('type'), 'date', 'type is right after turning off allDay');
          assert.deepEqual(startDate.option('value'), null, 'startdate is OK');
          assert.deepEqual(endDate.option('value'), null, 'enddate is OK');
        });
        QUnit.test('There are no exceptions when select date on the appointment popup, startDate > endDate', function(assert) {
          var scheduler = createInstance({});
          var date = new Date();
          scheduler.instance.showAppointmentPopup({
            allDay: true,
            text: '',
            startDate: date,
            endDate: date,
            recurrence: null,
            recurrenceException: null
          });
          var $popupContent = $('.dx-scheduler-appointment-popup .dx-popup-content');
          var startDate = $popupContent.find('.dx-datebox').eq(0).dxDateBox('instance');
          var dateToTest = new Date();
          dateToTest.setDate(date.getDate() + 5);
          startDate.option('value', dateToTest);
          assert.ok(true, 'There are no exceptions');
        });
        QUnit.test('There are no exceptions when select date on the appointment popup,startDate < endDate', function(assert) {
          var scheduler = createInstance({});
          var date = new Date();
          scheduler.instance.showAppointmentPopup({
            allDay: true,
            text: '',
            startDate: date,
            endDate: date,
            recurrence: null,
            recurrenceException: null
          });
          var $popupContent = $('.dx-scheduler-appointment-popup .dx-popup-content');
          var endDate = $popupContent.find('.dx-datebox').eq(1).dxDateBox('instance');
          var dateToTest = new Date();
          dateToTest.setDate(date.getDate() - 5);
          endDate.option('value', dateToTest);
          assert.ok(true, 'There are no exceptions');
        });
        QUnit.test('There are no exceptions when select date on the appointment popup,if dates are undefined', function(assert) {
          var scheduler = createInstance({});
          var date = new Date();
          scheduler.instance.showAppointmentPopup({
            allDay: true,
            text: '',
            recurrence: null,
            recurrenceException: null
          }, true, null);
          var $popupContent = $('.dx-scheduler-appointment-popup .dx-popup-content');
          var startDate = $popupContent.find('.dx-datebox').eq(0).dxDateBox('instance');
          var endDate = $popupContent.find('.dx-datebox').eq(1).dxDateBox('instance');
          var dateToTest = new Date();
          dateToTest.setDate(date.getDate() - 5);
          startDate.option('value', date);
          endDate.option('value', dateToTest);
          assert.ok(true, 'There are no exceptions');
        });
        QUnit.test('Validate works always before done click', function(assert) {
          var data = new DataSource({store: this.tasks});
          var scheduler = createInstance({dataSource: data});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var validation = sinon.stub(form, 'validate');
          $('.dx-scheduler-appointment-popup .dx-popup-done').trigger('dxclick');
          assert.ok(validation.calledOnce);
        });
        QUnit.test('Load panel should not be shown if validation is fail', function(assert) {
          var scheduler = createInstance({
            dataSource: {store: this.tasks},
            maxAppointmentsPerCell: 2,
            onAppointmentFormOpening: function(data) {
              var form = data.form;
              form.option('items', [{
                name: 'description',
                dataField: 'description',
                editorType: 'dxTextArea',
                validationRules: [{
                  type: 'required',
                  message: 'Login is required'
                }]
              }]);
            }
          });
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption'
          });
          scheduler.appointmentPopup.clickDoneButton();
          assert.notOk(scheduler.appointmentPopup.hasLoadPanel());
        });
        QUnit.test('Done button default configuration should be correct', function(assert) {
          var scheduler = createInstance({
            onAppointmentFormOpening: function(e) {
              var popup = e.component._appointmentPopup.popup;
              var buttons = popup.option('toolbarItems');
              var doneButton = buttons[0];
              assert.equal(doneButton.options.text, messageLocalization.format('Done'), 'done button text is ok');
            },
            onAppointmentAdding: function(e) {
              e.cancel = true;
            }
          });
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption'
          });
          scheduler.appointmentPopup.clickDoneButton();
        });
        QUnit.test('Done button custom configuration should be correct', function(assert) {
          var scheduler = createInstance({
            dataSource: new DataSource({store: this.tasks}),
            onAppointmentFormOpening: function(e) {
              var popup = e.component._appointmentPopup.popup;
              var buttons = popup.option('toolbarItems');
              buttons[0].options = {text: 'Text 1'};
              popup.option('toolbarItems', buttons);
            },
            onAppointmentAdding: function(e) {
              e.cancel = true;
            }
          });
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption'
          });
          assert.notOk(scheduler.appointmentPopup.hasLoadPanel(), 'has no load panel');
          var doneButtonInstance = scheduler.appointmentPopup.getDoneButton().dxButton('instance');
          assert.equal(doneButtonInstance.option('text'), 'Text 1', 'done button text is ok');
          scheduler.appointmentPopup.clickDoneButton();
          assert.notOk(scheduler.appointmentPopup.isVisible());
        });
        QUnit.test('Load panel should be hidden if event validation fail', function(assert) {
          var scheduler = createInstance({
            dataSource: new DataSource({store: this.tasks}),
            onAppointmentFormAdding: function(e) {
              e.cancel = true;
            }
          });
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption'
          });
          assert.notOk(scheduler.appointmentPopup.hasLoadPanel(), 'has no load panel');
          scheduler.appointmentPopup.clickDoneButton();
          assert.notOk(scheduler.appointmentPopup.isVisible());
        });
        QUnit.test('Load panel should be hidden at the second appointment form opening', function(assert) {
          var task = {
            startDate: new Date(2017, 1, 1),
            endDate: new Date(2017, 1, 1, 0, 10),
            text: 'caption'
          };
          var scheduler = createInstance({dataSource: [task]});
          scheduler.instance.showAppointmentPopup(task);
          scheduler.appointmentPopup.clickDoneButton();
          scheduler.instance.showAppointmentPopup(task);
          assert.notOk(scheduler.appointmentPopup.hasLoadPanel(), 'has no load panel');
        });
        QUnit.test('startDateBox & endDateBox should have required validation rules', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          assert.deepEqual(form.itemOption((APPOINTMENT_FORM_GROUP_NAMES.Main + ".startDate")).validationRules, [{type: 'required'}]);
          assert.deepEqual(form.itemOption((APPOINTMENT_FORM_GROUP_NAMES.Main + ".endDate")).validationRules, [{type: 'required'}]);
        });
        QUnit.test('Changes shouldn\'t be saved if form is invalid', function(assert) {
          var data = new DataSource({store: this.tasks});
          var scheduler = createInstance({dataSource: data});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption'
          }, true);
          var form = scheduler.instance.getAppointmentDetailsForm();
          var addingAppointment = sinon.stub(scheduler.instance, 'addAppointment');
          sinon.stub(form, 'validate').returns({isValid: false});
          $('.dx-scheduler-appointment-popup .dx-popup-done').trigger('dxclick');
          assert.notOk(addingAppointment.calledOnce);
        });
        QUnit.test('Appointment popup should contain resources and recurrence editor', function(assert) {
          var rooms = [{
            text: 'Room Test',
            id: 4
          }];
          var scheduler = createInstance({resources: [{
              label: 'Room',
              fieldExpr: 'roomId',
              dataSource: rooms
            }]});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2),
            roomId: 4,
            recurrenceRule: 'FREQ=WEEKLY'
          });
          $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
          var form = scheduler.instance.getAppointmentDetailsForm();
          var items = form.option('items');
          assert.equal(items.length, 2, 'Main group and recurrence editor added');
          assert.equal(items[0].items.length, 7, 'Count of editors with resources is correct');
          assert.equal(items[0].items[6].label.text, 'Room', 'Recources is the last element in the main group of editors');
        });
      });
      QUnit.module('Appointment Popup', moduleOptions, function() {
        QUnit.test('focus is called on popup hiding', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 2)
          });
          var spy = sinon.spy(scheduler.instance, 'focus');
          $('.dx-scheduler-appointment-popup .dx-overlay-content .dx-popup-cancel').trigger('dxclick');
          assert.ok(spy.calledOnce, 'focus is called');
        });
        QUnit.test('Multiple showing appointment popup for recurrence appointments should work correctly', function(assert) {
          var scheduler = createInstance({});
          scheduler.instance.showAppointmentPopup({
            text: 'Appointment 1',
            startDate: new Date(2017, 4, 1, 9, 30),
            endDate: new Date(2017, 4, 1, 11)
          });
          scheduler.instance.hideAppointmentPopup(true);
          scheduler.instance.option('recurrenceEditMode', 'series');
          scheduler.instance.showAppointmentPopup({
            text: 'Appointment 2',
            startDate: new Date(2017, 4, 1, 9, 30),
            endDate: new Date(2017, 4, 1, 11),
            recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TH;COUNT=10'
          });
          var popup = scheduler.instance._appointmentPopup.popup;
          var $buttonGroup = $(popup.$content()).find('.dx-buttongroup');
          assert.deepEqual($buttonGroup.eq(0).dxButtonGroup('instance').option('selectedItemKeys'), ['MO', 'TH'], 'Right buttons was checked');
        });
        QUnit.test('Appointment popup will render even if no appointmentData is provided (T734413)', function(assert) {
          var currentDate = new Date(2020, 2, 4);
          var cellDuration = 60;
          var scheduler = createInstance({
            currentDate: currentDate,
            cellDuration: cellDuration
          });
          scheduler.instance.showAppointmentPopup({}, true);
          scheduler.instance.hideAppointmentPopup(true);
          scheduler.instance.showAppointmentPopup({}, true);
          var $__3 = scheduler.appointmentForm.getFormInstance().option('formData'),
              startDate = $__3.startDate,
              endDate = $__3.endDate;
          var appointmentPopup = scheduler.appointmentPopup;
          assert.equal(startDate.getTime(), currentDate.getTime(), 'startDate is currentDate in Appointment Form');
          assert.equal(endDate.getTime(), new Date(currentDate.getTime() + cellDuration * toMs('minute')).getTime(), 'endDate is currentDate + cellDuration in Appointment Form');
          assert.ok(appointmentPopup.isVisible(), 'Popup is rendered');
          var $popup = appointmentPopup.getPopup();
          var $startDate = $popup.find('input[name=\'startDate\']')[0];
          var $endDate = $popup.find('input[name=\'endDate\']')[0];
          assert.equal($startDate.value, '2020-03-04T00:00:00', 'startDate is specified');
          assert.equal($endDate.value, '2020-03-04T01:00:00', 'endDate is specified');
        });
        QUnit.test('Appointment popup will render with currentDate on showAppointmentPopup with no arguments', function(assert) {
          var currentDate = new Date(2020, 2, 4);
          var cellDuration = 60;
          var scheduler = createInstance({
            currentDate: currentDate,
            cellDuration: cellDuration
          });
          scheduler.instance.showAppointmentPopup();
          var $__3 = scheduler.appointmentForm.getFormInstance().option('formData'),
              startDate = $__3.startDate,
              endDate = $__3.endDate;
          var appointmentPopup = scheduler.appointmentPopup;
          assert.equal(startDate.getTime(), currentDate.getTime(), 'startDate is currentDate in Appointment Form');
          assert.equal(endDate.getTime(), new Date(currentDate.getTime() + cellDuration * toMs('minute')).getTime(), 'endDate is currentDate + cellDuration in Appointment Form');
          assert.ok(appointmentPopup.isVisible(), 'Popup is rendered');
          var $popup = appointmentPopup.getPopup();
          var $startDate = $popup.find('input[name=\'startDate\']')[0];
          var $endDate = $popup.find('input[name=\'endDate\']')[0];
          assert.equal($startDate.value, '2020-03-04T00:00:00', 'startDate is specified');
          assert.equal($endDate.value, '2020-03-04T01:00:00', 'endDate is specified');
        });
        QUnit.test('Appointment form will have right dates on multiple openings (T727713)', function(assert) {
          var appointments = [{
            text: 'Appointment1',
            startDate: new Date(2017, 4, 2, 8, 30),
            endDate: new Date(2017, 4, 2, 11)
          }, {
            text: 'Appointment2',
            startDate: new Date(2017, 4, 1, 10),
            endDate: new Date(2017, 4, 1, 11)
          }];
          var scheduler = createInstance({
            dataSource: appointments,
            currentView: 'week',
            views: ['week'],
            currentDate: new Date(2017, 4, 1)
          });
          scheduler.instance.option();
          scheduler.instance.showAppointmentPopup(appointments[1], false);
          var formData = scheduler.appointmentForm.getFormInstance().option('formData');
          assert.deepEqual(formData.startDate, appointments[1].startDate, 'First opening appointment form has right startDate');
          assert.deepEqual(formData.endDate, appointments[1].endDate, 'First opening appointment form has right endDate');
          scheduler.instance.hideAppointmentPopup();
          var form = scheduler.instance.getAppointmentDetailsForm();
          var formDataChangedCount = 0;
          form.option('onOptionChanged', function(args) {
            if (args.name === 'formData')
              formDataChangedCount++;
          });
          scheduler.appointments.dblclick(0);
          formData = scheduler.appointmentForm.getFormInstance().option('formData');
          assert.deepEqual(formData.startDate, appointments[0].startDate, 'Second opening appointment form has right startDate');
          assert.deepEqual(formData.endDate, appointments[0].endDate, 'Second opening appointment form has right endDate');
          assert.equal(formDataChangedCount, 1, 'Form data changed one time');
        });
        QUnit.test('The vertical scroll bar is shown when an appointment popup fill to a small window\'s height', function(assert) {
          var scheduler = createInstance({
            currentDate: new Date(2015, 1, 1),
            currentView: 'day',
            dataSource: []
          });
          scheduler.instance.showAddAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 1, 1),
            allDay: true
          });
          var popup = scheduler.appointmentPopup;
          popup.setPopupHeight(300);
          assert.ok(popup.hasVerticalScroll(), 'The popup has the vertical scrolling');
        });
        QUnit.test('The resize event of appointment popup is triggered the the window is resize', function(assert) {
          var scheduler = createInstance({
            currentDate: new Date(2015, 1, 1),
            currentView: 'day',
            dataSource: []
          });
          scheduler.instance.showAddAppointmentPopup({
            startDate: new Date(2015, 1, 1),
            endDate: new Date(2015, 1, 1, 1),
            allDay: true
          });
          var $popup = scheduler.appointmentPopup.getPopupInstance().$element();
          var isResizeEventTriggered;
          $($popup).on('dxresize', function() {
            isResizeEventTriggered = true;
          });
          resizeCallbacks.fire();
          assert.ok(isResizeEventTriggered, 'The resize event of popup is triggered');
        });
        QUnit.test('Popup should not be closed until the valid value is typed', function(assert) {
          var startDate = new Date(2015, 1, 1, 1);
          var validValue = 'Test';
          var done = assert.async();
          var scheduler = createInstance({onAppointmentFormOpening: function(data) {
              var items = data.form.option('items');
              items[0].items[0].validationRules = [{
                type: 'async',
                validationCallback: function(params) {
                  var d = $.Deferred();
                  setTimeout(function() {
                    d.resolve(params.value === validValue);
                  }, 10);
                  return d.promise();
                }
              }];
              data.form.option('items', items);
            }});
          scheduler.instance.showAppointmentPopup({
            startDate: startDate,
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption'
          });
          scheduler.appointmentForm.setSubject('caption1');
          scheduler.appointmentPopup.saveAppointmentData().done(function() {
            assert.equal(scheduler.appointmentForm.getInvalidEditorsCount.call(scheduler), 1, 'the only invalid editor is displayed in the form');
            scheduler.appointmentForm.setSubject(validValue);
            scheduler.appointmentPopup.saveAppointmentData().done(function() {
              assert.notOk(scheduler.appointmentPopup.getPopupInstance().option('visible'), 'the form is closed');
              done();
            });
          });
          assert.equal(scheduler.appointmentForm.getPendingEditorsCount.call(scheduler), 1, 'the only pending editor is displayed in the form');
        });
      });
      module('Timezone Editors', moduleOptions, function() {
        test('Popup should not contain startDateTimeZone editor by default', function(assert) {
          var scheduler = createInstance();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption',
            description: 'First task of this day',
            allDay: true
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateTimezoneEditor = form.getEditor('startDateTimeZone');
          assert.notOk(startDateTimezoneEditor, 'StartDateTZ editor isn\'t visible by default');
        });
        test('Popup should not contain endDateTimeZone editor by default', function(assert) {
          var scheduler = createInstance();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption',
            description: 'First task of this day',
            allDay: true
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var endDateTimeZoneEditor = form.getEditor('endDateTimeZone');
          assert.notOk(endDateTimeZoneEditor, 'EndDateTZ editor isn\'t visible by default');
        });
        test('It should be possible to render startDateTimeZone editor on appt form', function(assert) {
          var scheduler = createInstance({onAppointmentFormOpening: function(e) {
              e.form.itemOption((APPOINTMENT_FORM_GROUP_NAMES.Main + ".startDateTimeZone"), {visible: true});
            }});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption',
            description: 'First task of this day',
            allDay: true
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateTimezoneEditor = form.getEditor('startDateTimeZone');
          assert.ok(startDateTimezoneEditor instanceof SelectBox, 'Editor is SelectBox');
          assert.equal(startDateTimezoneEditor.option('value'), null, 'Value is correct');
        });
        test('It should be possible to render endDateTimeZone editor on appt form', function(assert) {
          var scheduler = createInstance({onAppointmentFormOpening: function(e) {
              e.form.itemOption((APPOINTMENT_FORM_GROUP_NAMES.Main + ".endDateTimeZone"), {visible: true});
            }});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption',
            description: 'First task of this day',
            allDay: true
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var endDateTimezoneEditor = form.getEditor('endDateTimeZone');
          assert.ok(endDateTimezoneEditor instanceof SelectBox, 'Editor is SelectBox');
          assert.equal(endDateTimezoneEditor.option('value'), null, 'Value is correct');
        });
        test('timeZone editors should have correct options', function(assert) {
          var scheduler = createInstance({onAppointmentFormOpening: function(e) {
              e.form.itemOption((APPOINTMENT_FORM_GROUP_NAMES.Main + ".startDateTimeZone"), {visible: true});
              e.form.itemOption((APPOINTMENT_FORM_GROUP_NAMES.Main + ".endDateTimeZone"), {visible: true});
            }});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2015, 1, 1, 1),
            endDate: new Date(2015, 1, 1, 2),
            text: 'caption',
            description: 'First task of this day',
            allDay: true
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateTimezoneEditor = form.getEditor('startDateTimeZone');
          var endDateTimezoneEditor = form.getEditor('startDateTimeZone');
          [startDateTimezoneEditor, endDateTimezoneEditor].forEach(function(editor) {
            assert.equal(editor.option('displayExpr'), 'title', 'displayExpr is correct');
            assert.equal(editor.option('valueExpr'), 'id', 'valueExpr is correct');
            assert.strictEqual(editor.option('searchEnabled'), true, 'searchEnabled is correct');
            assert.equal(editor.option('placeholder'), 'No timezone', 'placeholder is correct');
            assert.ok(editor.option('dataSource') instanceof DataSource, 'editor has dataSource');
            assert.equal(editor.option('dataSource')._paginate, true, 'paging is enabled');
            assert.equal(editor.option('dataSource')._pageSize, 10, 'pageSize is correct');
          });
        });
        QUnit.test('timeZone editors should have correct value & display value on init', function(assert) {
          var scheduler = createInstance({editing: {allowTimeZoneEditing: true}});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2020, 1, 1, 1),
            startDateTimeZone: 'Europe/Paris',
            endDate: new Date(2020, 1, 1, 2),
            text: 'test_text'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateTimezoneEditor = form.getEditor('startDateTimeZone');
          var endDateTimezoneEditor = form.getEditor('startDateTimeZone');
          [startDateTimezoneEditor, endDateTimezoneEditor].forEach(function(editor) {
            assert.equal(editor.option('value'), 'Europe/Paris', 'value is ok');
            assert.equal(editor.option('displayValue'), '(GMT +01:00) Europe - Paris', 'displayValue is ok');
          });
        });
        QUnit.test('timeZone editor should have correct display value for timezones with different offsets ', function(assert) {
          var scheduler = createInstance({editing: {allowTimeZoneEditing: true}});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2020, 1, 1, 1),
            endDate: new Date(2020, 1, 1, 2),
            text: 'test_text'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateTimezoneEditor = form.getEditor('startDateTimeZone');
          startDateTimezoneEditor.option('value', 'Etc/UTC');
          assert.equal(startDateTimezoneEditor.option('displayValue'), '(GMT +00:00) Etc - UTC', 'displayValue is ok');
          startDateTimezoneEditor.option('value', 'America/Los_Angeles');
          assert.equal(startDateTimezoneEditor.option('displayValue'), '(GMT -08:00) America - Los Angeles', 'displayValue is ok');
        });
        QUnit.test('timeZone editor display value for timeZone with DST should depend on date', function(assert) {
          var scheduler = createInstance({editing: {allowTimeZoneEditing: true}});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2020, 1, 1, 1),
            startDateTimeZone: 'Europe/Paris',
            endDate: new Date(2020, 1, 1, 2),
            text: 'test_text'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateTimezoneEditor = form.getEditor('startDateTimeZone');
          assert.equal(startDateTimezoneEditor.option('displayValue'), '(GMT +01:00) Europe - Paris', 'displayValue is ok');
          scheduler.instance._appointmentPopup.popup.hide();
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2020, 5, 1, 1),
            startDateTimeZone: 'Europe/Paris',
            endDate: new Date(2020, 5, 1, 2),
            text: 'test_text'
          });
          form = scheduler.instance.getAppointmentDetailsForm();
          startDateTimezoneEditor = form.getEditor('startDateTimeZone');
          assert.equal(startDateTimezoneEditor.option('displayValue'), '(GMT +02:00) Europe - Paris', 'displayValue is ok, DST');
        });
        QUnit.test('dataSource of timezoneEditor should be filtered', function(assert) {
          var scheduler = createInstance({
            editing: {allowTimeZoneEditing: true},
            onAppointmentFormOpening: function(e) {
              var startDateTimezoneEditor = e.form.getEditor('startDateTimeZone');
              var dataSource = startDateTimezoneEditor.option('dataSource');
              dataSource.paginate(false);
              dataSource.filter(['id', 'contains', 'Pacific']);
              startDateTimezoneEditor.option('opened', true);
            }
          });
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2020, 1, 1, 1),
            endDate: new Date(2020, 1, 1, 2),
            text: 'test_text'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateTimezoneEditor = form.getEditor('startDateTimeZone');
          assert.equal(startDateTimezoneEditor.option('items').length, 46, 'Items are filtered');
        });
        test('startDateTimeZone and endDateTimeZone editor should be rendered with allowTimeZoneEditing option', function(assert) {
          var scheduler = createInstance({editing: {allowTimeZoneEditing: true}});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2020, 1, 1, 1),
            endDate: new Date(2020, 1, 1, 2),
            text: 'test_text'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateTimezoneEditor = form.getEditor('startDateTimeZone');
          var endDateTimezoneEditor = form.getEditor('endDateTimeZone');
          assert.ok(startDateTimezoneEditor.option('visible'), 'startDateTimeZone editor is visible');
          assert.ok(endDateTimezoneEditor.option('visible'), 'endDateTimeZone editor is visible');
          assert.equal(startDateTimezoneEditor.option('value'), null, 'startDateTimeZone editor value should be null');
          assert.equal(endDateTimezoneEditor.option('value'), null, 'endDateTimeZone editor value should be null');
        });
        test('Change value in startDateTimeZone editor should trigger change value in endDateTimeZone editor if allowTimeZoneEditing: true', function(assert) {
          var scheduler = createInstance({editing: {allowTimeZoneEditing: true}});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2020, 1, 1, 1),
            endDate: new Date(2020, 1, 1, 2),
            text: 'test_text'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateTimezoneEditor = form.getEditor('startDateTimeZone');
          var endDateTimezoneEditor = form.getEditor('endDateTimeZone');
          startDateTimezoneEditor.option('value', 'Africa/Cairo');
          assert.equal(startDateTimezoneEditor.option('value'), 'Africa/Cairo', 'startDateTimeZone editor value should be "Africa/Cairo"');
          assert.equal(endDateTimezoneEditor.option('value'), 'Africa/Cairo', 'endDateTimeZone editor value should be "Africa/Cairo"');
        });
        test('Change value in endDateTimeZone editor shouldn\'t trigger change value in startDateTimeZone editor if allowTimeZoneEditing: true', function(assert) {
          var scheduler = createInstance({editing: {allowTimeZoneEditing: true}});
          scheduler.instance.showAppointmentPopup({
            startDate: new Date(2020, 1, 1, 1),
            endDate: new Date(2020, 1, 1, 2),
            text: 'test_text'
          });
          var form = scheduler.instance.getAppointmentDetailsForm();
          var startDateTimezoneEditor = form.getEditor('startDateTimeZone');
          var endDateTimezoneEditor = form.getEditor('endDateTimeZone');
          startDateTimezoneEditor.option('value', 'Asia/Pyongyang');
          endDateTimezoneEditor.option('value', 'Africa/Cairo');
          assert.equal(startDateTimezoneEditor.option('value'), 'Asia/Pyongyang', 'startDateTimeZone editor value should be "Africa/Cairo"');
          assert.equal(endDateTimezoneEditor.option('value'), 'Africa/Cairo', 'endDateTimeZone editor value should be "Africa/Cairo"');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","../../helpers/scheduler/helpers.js","jquery","core/devices","ui/select_box","animation/fx","data/data_source/data_source","core/utils/resize_callbacks","localization/message","ui/scheduler/appointmentPopup/form","core/utils/date","ui/scheduler/ui.scheduler","ui/switch"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("../../helpers/scheduler/helpers.js"), require("jquery"), require("core/devices"), require("ui/select_box"), require("animation/fx"), require("data/data_source/data_source"), require("core/utils/resize_callbacks"), require("localization/message"), require("ui/scheduler/appointmentPopup/form"), require("core/utils/date"), require("ui/scheduler/ui.scheduler"), require("ui/switch"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=appointmentPopup.tests.js.map