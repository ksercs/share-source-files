!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/common.events.tests.js"], ["animation/fx","color","core/config","core/utils/common","core/utils/resize_callbacks","core/utils/type","data/data_source/data_source","jquery","ui/scheduler/ui.scheduler","../../helpers/scheduler/helpers.js","core/utils/deferred"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/common.events.tests.js", ["animation/fx", "color", "core/config", "core/utils/common", "core/utils/resize_callbacks", "core/utils/type", "data/data_source/data_source", "jquery", "ui/scheduler/ui.scheduler", "../../helpers/scheduler/helpers.js", "core/utils/deferred"], function($__export) {
  "use strict";
  var fx,
      Color,
      config,
      noop,
      resizeCallbacks,
      isRenderer,
      DataSource,
      $,
      dxScheduler,
      createWrapper,
      initTestMarkup,
      Deferred;
  return {
    setters: [function($__m) {
      fx = $__m.default;
    }, function($__m) {
      Color = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dxScheduler = $__m.default;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }],
    execute: function() {
      initTestMarkup();
      QUnit.module('Events', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          fx.off = true;
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('onAppointmentRendered', function(assert) {
          var renderedSpy = sinon.spy(noop);
          var appointments = [{
            startDate: new Date(2015, 1, 9, 16),
            endDate: new Date(2015, 1, 9, 17),
            text: 'caption'
          }];
          var dataSource = new DataSource({store: appointments});
          var scheduler = createWrapper({
            dataSource: dataSource,
            onAppointmentRendered: renderedSpy,
            currentDate: new Date(2015, 1, 9)
          });
          var args = renderedSpy.getCall(0).args[0];
          assert.ok(renderedSpy.calledOnce, 'onAppointmentRendered was called');
          assert.deepEqual(args.component, scheduler.instance, 'component is scheduler instance');
          assert.deepEqual($(args.element).get(0), scheduler.instance.$element().get(0), 'element is $scheduler');
          assert.deepEqual(args.appointmentData, appointments[0], 'appointment is OK');
          assert.deepEqual($(args.appointmentElement).get(0), scheduler.instance.$element().find('.dx-scheduler-appointment').get(0), 'appointment element is OK');
        });
        QUnit.test('onAppointmentRendered should called on each recurrence', function(assert) {
          var renderedSpy = sinon.spy(noop);
          var appointments = [{
            startDate: new Date(2015, 1, 9, 16),
            endDate: new Date(2015, 1, 9, 17),
            text: 'caption',
            recurrenceRule: 'FREQ=DAILY;COUNT=2'
          }];
          var dataSource = new DataSource({store: appointments});
          createWrapper({
            currentView: 'week',
            dataSource: dataSource,
            onAppointmentRendered: renderedSpy,
            currentDate: new Date(2015, 1, 9)
          });
          assert.ok(renderedSpy.calledTwice, 'onAppointmentRendered was called twice');
        });
        QUnit.test('onAppointmentRendered should updated correctly', function(assert) {
          var scheduler = createWrapper({
            dataSource: new DataSource({store: [{
                startDate: new Date(2015, 1, 9, 16),
                endDate: new Date(2015, 1, 9, 17),
                text: 'caption'
              }]}),
            onAppointmentRendered: function() {
              return 1;
            },
            currentDate: new Date(2015, 1, 9)
          });
          scheduler.instance.option('onAppointmentRendered', function() {
            return 2;
          });
          var appointmentsCollection = scheduler.instance.getAppointmentsInstance();
          assert.equal(appointmentsCollection.option('onItemRendered')(), 2, 'option is updated correctly');
        });
        QUnit.test('onAppointmentRendered should fires when appointment is completely rendered', function(assert) {
          createWrapper({
            editing: {
              allowResizing: true,
              allowDragging: true
            },
            dataSource: new DataSource({store: [{
                startDate: new Date(2015, 1, 9, 16),
                endDate: new Date(2015, 1, 9, 17),
                text: 'caption',
                groupId: 1,
                recurrenceRule: 'FREQ=DAILY;INTERVAL=2'
              }]}),
            resources: [{
              field: 'groupId',
              dataSource: [{
                text: 'a',
                id: 1,
                color: '#ff0000'
              }]
            }],
            onAppointmentRendered: function(args) {
              var $appointment = $(args.appointmentElement);
              assert.equal(new Color($appointment.css('backgroundColor')).toHex(), '#ff0000', 'Resource color is applied');
              assert.ok($appointment.attr('data-groupid-1'), 'Resource data attribute is defined');
              assert.ok($appointment.hasClass('dx-scheduler-appointment-recurrence'), 'Recurrent class is defined');
              assert.ok($appointment.hasClass('dx-resizable'), 'Resizable class is defined');
            },
            currentDate: new Date(2015, 1, 9)
          });
        });
        QUnit.test('onAppointmentRendered should fires when appointment is completely rendered(month view)', function(assert) {
          assert.expect(2);
          createWrapper({
            dataSource: new DataSource({store: [{
                startDate: new Date(2015, 1, 10),
                endDate: new Date(2015, 1, 20),
                text: 'caption'
              }]}),
            views: ['month'],
            currentView: 'month',
            maxAppointmentsPerCell: 1,
            onAppointmentRendered: function(args) {
              assert.equal($(args.appointmentElement).find('.dx-scheduler-appointment-reduced-icon').length, 1, 'Appointment reduced icon is applied');
            },
            currentDate: new Date(2015, 1, 9)
          });
        });
        QUnit.test('onAppointmentRendered should contain information about all recurring appts', function(assert) {
          createWrapper({
            dataSource: new DataSource([{
              startDate: new Date(2015, 1, 9, 16),
              endDate: new Date(2015, 1, 9, 17),
              text: 'caption',
              recurrenceRule: 'FREQ=DAILY'
            }]),
            onAppointmentRendered: function(e) {
              var targetedAppointmentData = e.targetedAppointmentData;
              var appointmentIndex = $(e.appointmentElement).index();
              assert.equal(targetedAppointmentData.startDate.getTime(), new Date(2015, 1, 9 + appointmentIndex, 16).getTime(), 'Start date is OK');
              assert.equal(targetedAppointmentData.endDate.getTime(), new Date(2015, 1, 9 + appointmentIndex, 17).getTime(), 'End date is OK');
            },
            currentDate: new Date(2015, 1, 9),
            views: ['week'],
            currentView: 'week'
          });
        });
        QUnit.test('onAppointmentRendered should fires only for rerendered appointments', function(assert) {
          assert.expect(2);
          var scheduler = createWrapper({
            dataSource: new DataSource({store: [{
                startDate: new Date(2015, 1, 10),
                endDate: new Date(2015, 1, 11),
                text: 'caption1'
              }]}),
            views: ['month'],
            currentView: 'month',
            height: 600,
            onAppointmentRendered: function(args) {
              assert.ok(true, 'Appointment was rendered');
            },
            currentDate: new Date(2015, 1, 9)
          });
          scheduler.instance.addAppointment({
            startDate: new Date(2015, 1, 12, 10),
            endDate: new Date(2015, 1, 13, 20),
            text: 'caption2'
          });
          this.clock.tick(10);
        });
        QUnit.test('All appointments should be rerendered after cellDuration changed', function(assert) {
          assert.expect(6);
          var scheduler = createWrapper({
            dataSource: new DataSource({store: [{
                startDate: new Date(2015, 1, 10),
                endDate: new Date(2015, 1, 11),
                text: 'caption1'
              }, {
                startDate: new Date(2015, 1, 12, 10),
                endDate: new Date(2015, 1, 13, 20),
                text: 'caption2'
              }]}),
            views: ['timelineWeek'],
            currentView: 'timelineWeek',
            cellDuration: 60,
            onAppointmentRendered: function(args) {
              assert.ok(true, 'Appointment was rendered');
            },
            currentDate: new Date(2015, 1, 9)
          });
          var appointments = scheduler.instance.getAppointmentsInstance();
          var initialItems = appointments.option('items');
          scheduler.instance.option('cellDuration', 100);
          this.clock.tick(10);
          var changedItems = appointments.option('items');
          assert.notDeepEqual(initialItems[0].settings, changedItems[0].settings, 'Item\'s settings were changed');
          assert.notDeepEqual(initialItems[1].settings, changedItems[1].settings, 'Item\'s settings were changed');
        });
        QUnit.test('targetedAppointmentData should return correct allDay appointmentData', function(assert) {
          createWrapper({
            dataSource: new DataSource([{
              startDate: new Date(2015, 1, 9),
              endDate: new Date(2015, 1, 10),
              allDay: true,
              text: 'All day appointment'
            }]),
            onAppointmentRendered: function(e) {
              var targetedAppointmentData = e.targetedAppointmentData;
              assert.equal(targetedAppointmentData.startDate.getTime(), new Date(2015, 1, 9).getTime(), 'Start date is OK');
              assert.equal(targetedAppointmentData.endDate.getTime(), new Date(2015, 1, 10).getTime(), 'End date is OK');
            },
            currentDate: new Date(2015, 1, 9),
            views: ['week'],
            currentView: 'week'
          });
        });
        QUnit.test('onAppointmentRendered should contain information about all recurring appts on agenda view', function(assert) {
          createWrapper({
            dataSource: new DataSource([{
              startDate: new Date(2015, 1, 9, 16),
              endDate: new Date(2015, 1, 9, 17),
              text: 'caption',
              recurrenceRule: 'FREQ=DAILY'
            }]),
            onAppointmentRendered: function(e) {
              var targetedAppointmentData = e.targetedAppointmentData;
              var appointmentIndex = $(e.appointmentElement).index();
              assert.equal(targetedAppointmentData.startDate.getTime(), new Date(2015, 1, 9 + appointmentIndex, 16).getTime(), 'Start date is OK');
              assert.equal(targetedAppointmentData.endDate.getTime(), new Date(2015, 1, 9 + appointmentIndex, 17).getTime(), 'End date is OK');
            },
            currentDate: new Date(2015, 1, 9),
            views: ['agenda'],
            currentView: 'agenda'
          });
        });
        QUnit.test('agenda should be rendered correctly after changing groups on view changing(T847884)', function(assert) {
          var priorityData = [{
            text: 'Low Priority',
            id: 1,
            color: '#1e90ff'
          }, {
            text: 'High Priority',
            id: 2,
            color: '#ff9747'
          }];
          var scheduler = createWrapper({
            dataSource: [{
              text: 'Upgrade Personal Computers',
              priorityId: 1,
              startDate: new Date(2018, 4, 21, 9),
              endDate: new Date(2018, 4, 21, 11, 30)
            }],
            views: ['week', 'agenda'],
            onOptionChanged: function(e) {
              if (e.name === 'currentView') {
                e.component._customUpdate = true;
                e.component.beginUpdate();
                e.component.option('groups', []);
              }
              if (e.name === 'groups' && e.component._customUpdate === true) {
                e.component._customUpdate = false;
                e.component.endUpdate();
              }
            },
            currentView: 'week',
            currentDate: new Date(2018, 4, 21),
            groups: ['priorityId'],
            resources: [{
              fieldExpr: 'priorityId',
              allowMultiple: false,
              dataSource: priorityData,
              label: 'Priority'
            }]
          });
          scheduler.instance.option('currentView', 'agenda');
          assert.ok(true, 'currentView was changed to agenda correctly');
        });
        QUnit.test('onAppointmentRendered should not contain information about particular appt resources if there are not groups(T413561)', function(assert) {
          var resourcesSpy = sinon.spy(dxScheduler.prototype, 'setTargetedAppointmentResources');
          createWrapper({
            dataSource: new DataSource([{
              startDate: new Date(2015, 1, 9, 16),
              endDate: new Date(2015, 1, 9, 17),
              text: 'caption',
              recurrenceRule: 'FREQ=YEARLY'
            }]),
            currentDate: new Date(2015, 1, 9),
            views: ['week'],
            currentView: 'week'
          });
          assert.equal(resourcesSpy.callCount, 2, 'Resources aren\'t required');
        });
        QUnit.test('onAppointmentClick should fires when appointment is clicked', function(assert) {
          assert.expect(3);
          var items = [{
            startDate: new Date(2015, 2, 10),
            endDate: new Date(2015, 2, 13),
            text: 'Task caption'
          }, {
            startDate: new Date(2015, 2, 15),
            endDate: new Date(2015, 2, 20),
            text: 'Task caption'
          }];
          var scheduler = createWrapper({
            dataSource: new DataSource({store: items}),
            views: ['month'],
            currentView: 'month',
            currentDate: new Date(2015, 2, 9),
            height: 600,
            onAppointmentClick: function(e) {
              assert.deepEqual(isRenderer(e.appointmentElement), !!config().useJQuery, 'appointmentElement is correct');
              assert.deepEqual($(e.appointmentElement)[0], $item[0], 'appointmentElement is correct');
              assert.strictEqual(e.appointmentData, items[0], 'appointmentData is correct');
            }
          });
          var $item = $(scheduler.instance.$element().find('.dx-scheduler-appointment').eq(0));
          $($item).trigger('dxclick');
        });
        QUnit.test('Args of onAppointmentClick should contain data about particular appt', function(assert) {
          assert.expect(2);
          var items = [{
            text: 'Task caption',
            start: {date: new Date(2015, 2, 10, 1)},
            end: {date: new Date(2015, 2, 10, 2)},
            recurrence: {rule: 'FREQ=DAILY'}
          }];
          var scheduler = createWrapper({
            dataSource: new DataSource(items),
            views: ['week'],
            currentView: 'week',
            currentDate: new Date(2015, 2, 9),
            startDateExpr: 'start.date',
            endDateExpr: 'end.date',
            recurrenceRuleExpr: 'recurrence.rule',
            onAppointmentClick: function(e) {
              var targetedAppointmentData = e.targetedAppointmentData;
              assert.equal(targetedAppointmentData.start.date.getTime(), new Date(2015, 2, 11, 1).getTime(), 'Start date is OK');
              assert.equal(targetedAppointmentData.end.date.getTime(), new Date(2015, 2, 11, 2).getTime(), 'End date is OK');
            }
          });
          $(scheduler.instance.$element().find('.dx-scheduler-appointment').eq(1)).trigger('dxclick');
        });
        QUnit.test('Args of onAppointmentClick/Rendered should contain data about particular grouped appt', function(assert) {
          assert.expect(6);
          var items = [{
            text: 'Task caption',
            start: {date: new Date(2015, 2, 10, 1)},
            end: {date: new Date(2015, 2, 10, 2)},
            owner: {id: [1, 2]},
            priority: 1
          }];
          var scheduler = createWrapper({
            dataSource: new DataSource(items),
            groups: ['owner.id', 'priority'],
            resources: [{
              fieldExpr: 'owner.id',
              allowMultiple: true,
              dataSource: [{
                id: 1,
                text: 'A'
              }, {
                id: 2,
                text: 'B'
              }]
            }, {
              fieldExpr: 'priority',
              dataSource: [{
                id: 1,
                text: 'Low'
              }]
            }],
            views: ['week'],
            currentView: 'week',
            currentDate: new Date(2015, 2, 9),
            startDateExpr: 'start.date',
            endDateExpr: 'end.date',
            recurrenceRuleExpr: 'recurrence.rule',
            onAppointmentClick: function(e) {
              var targetedAppointmentData = e.targetedAppointmentData;
              assert.equal(targetedAppointmentData.owner.id, 2, 'Owner id is OK on click');
              assert.equal(targetedAppointmentData.priority, 1, 'Priority is OK on click');
            },
            onAppointmentRendered: function(e) {
              var targetedAppointmentData = e.targetedAppointmentData;
              var expectedOwnerId = 1;
              if ($(e.appointmentElement).index() === 1) {
                expectedOwnerId = 2;
              }
              assert.equal(targetedAppointmentData.owner.id, expectedOwnerId, 'Owner id is OK on rendered');
              assert.equal(targetedAppointmentData.priority, 1, 'Priority is OK on rendered');
            }
          });
          $(scheduler.instance.$element().find('.dx-scheduler-appointment').eq(1)).trigger('dxclick');
        });
        QUnit.test('Args of onAppointmentClick should contain data about particular grouped appt on Agenda view', function(assert) {
          assert.expect(6);
          var items = [{
            text: 'Task caption',
            start: {date: new Date(2015, 2, 10, 1)},
            end: {date: new Date(2015, 2, 10, 2)},
            owner: {id: [1, 2]},
            priority: 1
          }];
          var scheduler = createWrapper({
            dataSource: new DataSource(items),
            groups: ['owner.id', 'priority'],
            resources: [{
              fieldExpr: 'owner.id',
              allowMultiple: true,
              dataSource: [{
                id: 1,
                text: 'A'
              }, {
                id: 2,
                text: 'B'
              }]
            }, {
              fieldExpr: 'priority',
              dataSource: [{
                id: 1,
                text: 'Low'
              }]
            }],
            views: ['agenda'],
            currentView: 'agenda',
            currentDate: new Date(2015, 2, 9),
            startDateExpr: 'start.date',
            endDateExpr: 'end.date',
            recurrenceRuleExpr: 'recurrence.rule',
            onAppointmentClick: function(e) {
              var targetedAppointmentData = e.targetedAppointmentData;
              assert.equal(targetedAppointmentData.owner.id, 2, 'Owner id is OK');
              assert.equal(targetedAppointmentData.priority, 1, 'Priority is OK');
            },
            onAppointmentRendered: function(e) {
              var targetedAppointmentData = e.targetedAppointmentData;
              var expectedOwnerId = 1;
              if ($(e.appointmentElement).index() === 1) {
                expectedOwnerId = 2;
              }
              assert.equal(targetedAppointmentData.owner.id, expectedOwnerId, 'Owner id is OK on rendered');
              assert.equal(targetedAppointmentData.priority, 1, 'Priority is OK on rendered');
            }
          });
          $(scheduler.instance.$element().find('.dx-scheduler-appointment').eq(1)).trigger('dxclick');
        });
        QUnit.test('onAppointmentContextMenu should fires when appointment context menu is triggered', function(assert) {
          assert.expect(3);
          var items = [{
            startDate: new Date(2015, 2, 10),
            endDate: new Date(2015, 2, 13),
            text: 'Task caption'
          }, {
            startDate: new Date(2015, 2, 15),
            endDate: new Date(2015, 2, 20),
            text: 'Task caption'
          }];
          var scheduler = createWrapper({
            dataSource: new DataSource({store: items}),
            views: ['month'],
            currentView: 'month',
            height: 600,
            currentDate: new Date(2015, 2, 9),
            onAppointmentContextMenu: function(e) {
              assert.deepEqual(isRenderer(e.appointmentElement), !!config().useJQuery, 'appointmentElement is correct');
              assert.deepEqual($(e.appointmentElement)[0], $item[0], 'appointmentElement is correct');
              assert.strictEqual(e.appointmentData, items[0], 'appointmentData is correct');
            }
          });
          var $item = $(scheduler.instance.$element().find('.dx-scheduler-appointment').eq(0));
          $($item).trigger('dxcontextmenu');
        });
        QUnit.test('Args of onAppointmentContextMenu should contain data about particular appt', function(assert) {
          assert.expect(2);
          var items = [{
            text: 'Task caption',
            start: {date: new Date(2015, 2, 10, 1)},
            end: {date: new Date(2015, 2, 10, 2)},
            recurrence: {rule: 'FREQ=DAILY'}
          }];
          var scheduler = createWrapper({
            dataSource: new DataSource(items),
            views: ['week'],
            currentView: 'week',
            currentDate: new Date(2015, 2, 9),
            startDateExpr: 'start.date',
            endDateExpr: 'end.date',
            recurrenceRuleExpr: 'recurrence.rule',
            onAppointmentContextMenu: function(e) {
              var targetedAppointmentData = e.targetedAppointmentData;
              assert.equal(targetedAppointmentData.start.date.getTime(), new Date(2015, 2, 11, 1).getTime(), 'Start date is OK');
              assert.equal(targetedAppointmentData.end.date.getTime(), new Date(2015, 2, 11, 2).getTime(), 'End date is OK');
            }
          });
          $(scheduler.instance.$element().find('.dx-scheduler-appointment').eq(1)).trigger('dxcontextmenu');
        });
        QUnit.test('Cell click option should be passed to workSpace', function(assert) {
          var scheduler = createWrapper({
            currentView: 'month',
            onCellClick: sinon.stub().returns(1)
          });
          var workspaceMonth = scheduler.instance.getWorkSpace();
          assert.deepEqual(workspaceMonth.option('onCellClick')(), scheduler.instance.option('onCellClick')(), 'scheduler has correct onCellClick');
          scheduler.instance.option('onCellClick', sinon.stub().returns(2));
          assert.deepEqual(workspaceMonth.option('onCellClick')(), scheduler.instance.option('onCellClick')(), 'scheduler has correct onCellClick after option change');
        });
        QUnit.test('onCellContextMenu option should be passed to workSpace', function(assert) {
          var scheduler = createWrapper({
            currentView: 'month',
            onCellContextMenu: sinon.stub().returns(1)
          });
          var workspaceMonth = scheduler.instance.getWorkSpace();
          assert.deepEqual(workspaceMonth.option('onCellContextMenu')(), scheduler.instance.option('onCellContextMenu')(), 'scheduler has correct onCellContextMenu');
          scheduler.instance.option('onCellContextMenu', sinon.stub().returns(2));
          assert.deepEqual(workspaceMonth.option('onCellContextMenu')(), scheduler.instance.option('onCellContextMenu')(), 'scheduler has correct onCellContextMenu after option change');
        });
        QUnit.test('onAppointmentContextMenu option should be passed to appointments', function(assert) {
          var scheduler = createWrapper({
            currentView: 'month',
            onAppointmentContextMenu: sinon.stub().returns(1)
          });
          var appointments = scheduler.instance.getAppointmentsInstance();
          assert.deepEqual(appointments.option('onItemContextMenu')(), scheduler.instance.option('onAppointmentContextMenu')(), 'scheduler has correct onAppointmentContextMenu');
          scheduler.instance.option('onAppointmentContextMenu', sinon.stub().returns(2));
          assert.deepEqual(appointments.option('onItemContextMenu')(), scheduler.instance.option('onAppointmentContextMenu')(), 'scheduler has correct onAppointmentContextMenu after option change');
        });
        QUnit.test('onAppointmentDblClick option should be passed to appointments', function(assert) {
          var scheduler = createWrapper({
            currentView: 'month',
            onAppointmentDblClick: sinon.stub().returns(1)
          });
          var appointments = scheduler.instance.getAppointmentsInstance();
          assert.deepEqual(appointments.option('onAppointmentDblClick')(), scheduler.instance.option('onAppointmentDblClick')(), 'scheduler has correct onAppointmentDblClick');
          scheduler.instance.option('onAppointmentDblClick', sinon.stub().returns(2));
          assert.deepEqual(appointments.option('onAppointmentDblClick')(), scheduler.instance.option('onAppointmentDblClick')(), 'scheduler has correct onAppointmentDblClick after option change');
        });
        QUnit.test('onAppointmentFormOpening event should be fired while details form is opening', function(assert) {
          var stub = sinon.stub();
          var data = {
            text: 'One',
            location: 'NY'
          };
          var scheduler = createWrapper({
            currentView: 'month',
            onAppointmentFormOpening: stub
          });
          scheduler.instance.showAppointmentPopup(data);
          var args = stub.getCall(0).args[0];
          assert.ok(stub.calledOnce, 'Event was fired');
          assert.equal(args.appointmentData, data, 'Appointment data is OK');
          assert.equal(args.form, scheduler.instance.getAppointmentDetailsForm(), 'Appointment form is OK');
        });
        QUnit.test('Option changed', function(assert) {
          var scheduler = createWrapper();
          scheduler.instance.option({
            'onAppointmentAdding': function() {
              return true;
            },
            'onAppointmentAdded': function() {
              return true;
            },
            'onAppointmentUpdating': function() {
              return true;
            },
            'onAppointmentUpdated': function() {
              return true;
            },
            'onAppointmentDeleting': function() {
              return true;
            },
            'onAppointmentDeleted': function() {
              return true;
            },
            'onAppointmentFormOpening': function() {
              return true;
            },
            'onAppointmentTooltipShowing': function() {
              return true;
            }
          });
          $.each(scheduler.instance.getActions(), function(name, action) {
            assert.ok(action(), '\'' + name + '\' option is changed');
          });
        });
        QUnit.test('Workspace dimension changing should be called before appointment repainting, when scheduler was resized (T739866)', function(assert) {
          var appointment = {
            startDate: new Date(2016, 2, 15, 1).toString(),
            endDate: new Date(2016, 2, 15, 2).toString()
          };
          var scheduler = createWrapper({
            currentDate: new Date(2016, 2, 15),
            views: ['day'],
            currentView: 'day',
            width: 800,
            dataSource: [appointment]
          });
          var workspaceSpy = sinon.spy(scheduler.instance._workSpace, '_dimensionChanged');
          var appointmentsSpy = sinon.spy(scheduler.instance._appointments, '_repaintAppointments');
          resizeCallbacks.fire();
          assert.ok(appointmentsSpy.calledAfter(workspaceSpy), 'workSpace dimension changing was called before appointments repainting');
        });
        QUnit.test('ContentReady event should be fired after render completely ready (T902483)', function(assert) {
          var contentReadyFiresCount = 0;
          var scheduler = createWrapper({onContentReady: function() {
              return ++contentReadyFiresCount;
            }});
          assert.equal(contentReadyFiresCount, 1, 'contentReadyFiresCount === 1');
          scheduler.instance._workSpaceRecalculation = new Deferred();
          scheduler.instance._fireContentReadyAction();
          assert.equal(contentReadyFiresCount, 1, 'contentReadyFiresCount === 1');
          scheduler.instance._workSpaceRecalculation.resolve();
          assert.equal(contentReadyFiresCount, 2, 'contentReadyFiresCount === 2');
          scheduler.instance._workSpaceRecalculation = null;
          scheduler.instance._fireContentReadyAction();
          assert.equal(contentReadyFiresCount, 3, 'contentReadyFiresCount === 3');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["animation/fx","color","core/config","core/utils/common","core/utils/resize_callbacks","core/utils/type","data/data_source/data_source","jquery","ui/scheduler/ui.scheduler","../../helpers/scheduler/helpers.js","core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("animation/fx"), require("color"), require("core/config"), require("core/utils/common"), require("core/utils/resize_callbacks"), require("core/utils/type"), require("data/data_source/data_source"), require("jquery"), require("ui/scheduler/ui.scheduler"), require("../../helpers/scheduler/helpers.js"), require("core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=common.events.tests.js.map