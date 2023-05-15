!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/virtual_scrolling.monthView.tests.js"], ["generic_light.css!","jquery","core/utils/date","../../helpers/scheduler/helpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/virtual_scrolling.monthView.tests.js", ["generic_light.css!", "jquery", "core/utils/date", "../../helpers/scheduler/helpers.js"], function($__export) {
  "use strict";
  var $,
      dateUtils,
      createWrapper,
      initTestMarkup,
      asyncScrollTest,
      asyncWrapper,
      isDesktopEnvironment,
      testStart,
      module,
      test,
      printOffset;
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dateUtils = $__m.default;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
      asyncScrollTest = $__m.asyncScrollTest;
      asyncWrapper = $__m.asyncWrapper;
      isDesktopEnvironment = $__m.isDesktopEnvironment;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, testStart = $__4.testStart, module = $__4.module, $__4));
      test = function(description, callback) {
        var testFunc = !isDesktopEnvironment() ? QUnit.skip : QUnit.test;
        return testFunc(description, callback);
      };
      printOffset = function(offset) {
        return [offset.x >= 0 ? ("offset.x: " + offset.x) : '', offset.y >= 0 ? ("offset.y: " + offset.y) : ''].join(',');
      };
      testStart(function() {
        return initTestMarkup();
      });
      module('Virtual scrolling Month View', function() {
        module('Regular appointments', function() {
          test('Regular appointments should be rendered correctly if horizontal grouping', function(assert) {
            var scheduler = createWrapper({
              dataSource: [{
                text: 'Test-S00',
                startDate: new Date(2021, 0, 31, 16),
                endDate: new Date(2021, 1, 3, 17, 30),
                priority: [1, 3, 5, 7, 8]
              }],
              views: ['month'],
              currentView: 'month',
              currentDate: new Date(2021, 1, 1),
              groups: ['priority'],
              resources: [{
                fieldExpr: 'priority',
                allowMultiple: false,
                dataSource: [{
                  id: 1,
                  text: 'rc_001'
                }, {
                  id: 2,
                  text: 'rc_002'
                }, {
                  id: 3,
                  text: 'rc_003'
                }, {
                  id: 4,
                  text: 'rc_004'
                }]
              }],
              scrolling: {
                mode: 'virtual',
                orientation: 'both'
              },
              crossScrollingEnabled: true,
              width: 530,
              height: 600
            });
            var instance = scheduler.instance;
            var scrollable = instance.getWorkSpaceScrollable();
            return asyncWrapper(assert, function(promise) {
              [{
                offset: {x: 0},
                expectedRects: [{
                  left: -9999,
                  top: -9837,
                  width: 300
                }]
              }, {
                offset: {x: 1050},
                expectedRects: [{
                  left: -9999,
                  top: -9837,
                  width: 300
                }]
              }, {
                offset: {x: 2100},
                expectedRects: [{
                  left: -10371,
                  top: -9837,
                  width: 150
                }]
              }].forEach(function($__6) {
                var $__7 = $__6,
                    offset = $__7.offset,
                    expectedRects = $__7.expectedRects;
                promise = asyncScrollTest(assert, promise, function() {
                  assert.ok(true, printOffset(offset));
                  var appointments = scheduler.appointments;
                  assert.equal(expectedRects.length, appointments.getAppointmentCount(), 'Appointment amount is correct');
                  expectedRects.forEach(function(expectedRect, index) {
                    var appointmentRect = appointments.getAppointment(index).get(0).getBoundingClientRect();
                    assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, 'appointment left is correct');
                    assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, 'appointment top is correct');
                    assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, 'appointment width is correct');
                  });
                }, scrollable, offset);
              });
              return promise;
            });
          });
          test('Regular appointments should be rendered correctly if vertical grouping', function(assert) {
            var scheduler = createWrapper({
              dataSource: [{
                text: 'Test-S00',
                startDate: new Date(2021, 0, 31, 16),
                endDate: new Date(2021, 1, 3, 17, 30),
                priority: [1, 3, 5, 7, 8]
              }],
              views: [{
                type: 'month',
                groupOrientation: 'vertical'
              }],
              currentView: 'month',
              currentDate: new Date(2021, 1, 1),
              groups: ['priority'],
              resources: [{
                fieldExpr: 'priority',
                allowMultiple: false,
                dataSource: [{
                  id: 1,
                  text: 'rc_001'
                }, {
                  id: 2,
                  text: 'rc_002'
                }, {
                  id: 3,
                  text: 'rc_003'
                }, {
                  id: 4,
                  text: 'rc_004'
                }]
              }],
              scrolling: {
                mode: 'virtual',
                orientation: 'both'
              },
              width: 530,
              height: 600
            });
            var instance = scheduler.instance;
            var scrollable = instance.getWorkSpaceScrollable();
            return asyncWrapper(assert, function(promise) {
              [{
                offset: {y: 0},
                expectedRects: [{
                  left: -9899,
                  top: -9866,
                  width: 300
                }]
              }, {
                offset: {y: 900},
                expectedRects: [{
                  left: -9899,
                  top: -9866,
                  width: 300
                }]
              }, {
                offset: {y: 1800},
                expectedRects: [{
                  left: -9899,
                  top: -10274,
                  width: 300
                }]
              }].forEach(function($__6) {
                var $__7 = $__6,
                    offset = $__7.offset,
                    expectedRects = $__7.expectedRects;
                promise = asyncScrollTest(assert, promise, function() {
                  assert.ok(true, printOffset(offset));
                  var appointments = scheduler.appointments;
                  assert.equal(expectedRects.length, appointments.getAppointmentCount(), 'Appointment amount is correct');
                  expectedRects.forEach(function(expectedRect, index) {
                    var appointmentRect = appointments.getAppointment(index).get(0).getBoundingClientRect();
                    assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, 'appointment left is correct');
                    assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, 'appointment top is correct');
                    assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, 'appointment width is correct');
                  });
                }, scrollable, offset);
              });
              return promise;
            });
          });
          test('Multi week regular appointment should be rendered correctly if horizontal grouping', function(assert) {
            var scheduler = createWrapper({
              dataSource: [{
                text: 'Test-L00',
                startDate: new Date(2021, 1, 1, 16),
                endDate: new Date(2021, 1, 26, 17, 30),
                priority: [1, 3]
              }],
              views: [{
                type: 'month',
                intervalCount: 36
              }],
              currentView: 'month',
              currentDate: new Date(2021, 1, 1),
              groups: ['priority'],
              resources: [{
                fieldExpr: 'priority',
                allowMultiple: false,
                dataSource: [{
                  id: 1,
                  text: 'rc_001'
                }, {
                  id: 2,
                  text: 'rc_002'
                }, {
                  id: 3,
                  text: 'rc_003'
                }, {
                  id: 4,
                  text: 'rc_004'
                }]
              }],
              scrolling: {
                mode: 'virtual',
                orientation: 'both'
              },
              crossScrollingEnabled: true,
              width: 530,
              height: 600
            });
            var instance = scheduler.instance;
            var scrollable = instance.getWorkSpaceScrollable();
            return asyncWrapper(assert, function(promise) {
              [{
                offset: {x: 0},
                expectedRects: [{
                  left: -9924,
                  top: -9837,
                  width: 450
                }, {
                  left: -9999,
                  top: -9762,
                  width: 525
                }, {
                  left: -9999,
                  top: -9687,
                  width: 525
                }, {
                  left: -9999,
                  top: -9612,
                  width: 450
                }]
              }, {
                offset: {x: 700},
                expectedRects: [{
                  left: -10324,
                  top: -9837,
                  width: 150
                }, {
                  left: -10324,
                  top: -9762,
                  width: 150
                }, {
                  left: -10324,
                  top: -9687,
                  width: 150
                }, {
                  left: -10324,
                  top: -9612,
                  width: 75
                }, {
                  left: -9574,
                  top: -9837,
                  width: 450
                }, {
                  left: -9649,
                  top: -9762,
                  width: 525
                }, {
                  left: -9649,
                  top: -9687,
                  width: 525
                }, {
                  left: -9649,
                  top: -9612,
                  width: 450
                }]
              }, {
                offset: {x: 1050},
                expectedRects: [{
                  left: -9924,
                  top: -9837,
                  width: 450
                }, {
                  left: -9999,
                  top: -9762,
                  width: 525
                }, {
                  left: -9999,
                  top: -9687,
                  width: 525
                }, {
                  left: -9999,
                  top: -9612,
                  width: 450
                }]
              }, {
                offset: {x: 1400},
                expectedRects: [{
                  left: -10274,
                  top: -9837,
                  width: 450
                }, {
                  left: -10349,
                  top: -9762,
                  width: 525
                }, {
                  left: -10349,
                  top: -9687,
                  width: 525
                }, {
                  left: -10349,
                  top: -9612,
                  width: 450
                }]
              }].forEach(function($__6) {
                var $__7 = $__6,
                    offset = $__7.offset,
                    expectedRects = $__7.expectedRects;
                promise = asyncScrollTest(assert, promise, function() {
                  assert.ok(true, printOffset(offset));
                  var appointments = scheduler.appointments;
                  assert.equal(expectedRects.length, appointments.getAppointmentCount(), 'Appointment amount is correct');
                  expectedRects.forEach(function(expectedRect, index) {
                    var appointmentRect = appointments.getAppointment(index).get(0).getBoundingClientRect();
                    assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment#" + index + " left is correct"));
                    assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment#" + index + " top is correct"));
                    assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, ("appointment#" + index + " width is correct"));
                  });
                }, scrollable, offset);
              });
              return promise;
            });
          });
          test('Multi week regular appointment should be rendered correctly if vertical grouping', function(assert) {
            var scheduler = createWrapper({
              dataSource: [{
                text: 'Test-L00',
                startDate: new Date(2021, 1, 17, 16),
                endDate: new Date(2021, 2, 10, 17, 30),
                priority: [1, 3]
              }],
              views: [{
                type: 'month',
                groupOrientation: 'vertical'
              }],
              currentView: 'month',
              currentDate: new Date(2021, 1, 1),
              groups: ['priority'],
              resources: [{
                fieldExpr: 'priority',
                allowMultiple: false,
                dataSource: [{
                  id: 1,
                  text: 'rc_001'
                }, {
                  id: 2,
                  text: 'rc_002'
                }, {
                  id: 3,
                  text: 'rc_003'
                }, {
                  id: 4,
                  text: 'rc_004'
                }]
              }],
              scrolling: {
                mode: 'virtual',
                orientation: 'both'
              },
              crossScrollingEnabled: true,
              width: 630,
              height: 560
            });
            var instance = scheduler.instance;
            var scrollable = instance.getWorkSpaceScrollable();
            return asyncWrapper(assert, function(promise) {
              [{
                offset: {y: 0},
                expectedRects: [{
                  left: -9674,
                  top: -9716,
                  width: 303
                }, {
                  left: -9899,
                  top: -9641,
                  width: 528
                }, {
                  left: -9899,
                  top: -9566,
                  width: 528
                }, {
                  left: -9899,
                  top: -9491,
                  width: 300
                }]
              }, {
                offset: {y: 350},
                expectedRects: [{
                  left: -9674,
                  top: -10066,
                  width: 303
                }, {
                  left: -9899,
                  top: -9991,
                  width: 528
                }, {
                  left: -9899,
                  top: -9916,
                  width: 528
                }, {
                  left: -9899,
                  top: -9841,
                  width: 300
                }]
              }, {
                offset: {y: 1000},
                expectedRects: [{
                  left: -9674,
                  top: -9816,
                  width: 303
                }, {
                  left: -9899,
                  top: -9741,
                  width: 528
                }, {
                  left: -9899,
                  top: -9666,
                  width: 528
                }, {
                  left: -9899,
                  top: -9591,
                  width: 300
                }]
              }].forEach(function($__6) {
                var $__7 = $__6,
                    offset = $__7.offset,
                    expectedRects = $__7.expectedRects;
                promise = asyncScrollTest(assert, promise, function() {
                  assert.ok(true, printOffset(offset));
                  var appointments = scheduler.appointments;
                  assert.equal(expectedRects.length, appointments.getAppointmentCount(), 'Appointment amount is correct');
                  expectedRects.forEach(function(expectedRect, index) {
                    var appointmentRect = appointments.getAppointment(index).get(0).getBoundingClientRect();
                    assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment#" + index + " left is correct"));
                    assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment#" + index + " top is correct"));
                    assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, ("appointment#" + index + " width is correct"));
                  });
                }, scrollable, offset);
              });
              return promise;
            });
          });
          ['horizontal', 'vertical'].forEach(function(groupOrientation) {
            test(("Appointment should be correctly croped if Month view  and \"" + groupOrientation + "\" group orientation"), function(assert) {
              var longAppointment = {
                startDate: new Date(2015, 2, 4, 0, 10),
                endDate: new Date(2015, 2, 4, 23, 50)
              };
              var scheduler = createWrapper({
                currentDate: new Date(2015, 2, 4),
                scrolling: {mode: 'virtual'},
                views: [{
                  type: 'month',
                  groupOrientation: groupOrientation
                }],
                currentView: 'month',
                dataSource: [longAppointment],
                height: 400
              });
              var instance = scheduler.instance;
              var workspace = instance.getWorkSpace();
              var viewDataProvider = workspace.viewDataProvider;
              var scrollable = workspace.getScrollable();
              workspace.renderer.getRenderTimeout = function() {
                return -1;
              };
              return asyncWrapper(assert, function(promise) {
                [1000, 1050, 1100, 1200, 1250, 1300, 1350, 1400, 1500, 2000].forEach(function(scrollY) {
                  promise = asyncScrollTest(assert, promise, function() {
                    var layoutManager = instance.getLayoutManager();
                    var settings = layoutManager._positionMap[0][0];
                    assert.equal(settings.groupIndex, 0, ("group index is correct when scrolled to " + scrollY));
                    var startViewDate = viewDataProvider.findGroupCellStartDate(settings.groupIndex, settings.info.appointment.startDate, settings.info.appointment.endDate);
                    assert.deepEqual(dateUtils.trimTime(settings.info.appointment.startDate), startViewDate, 'start date is correct');
                  }, scrollable, {y: scrollY});
                });
                return promise;
              });
            });
          });
          module('Group by date', function() {
            test('Regular appointment should be rendered correctly if grouped by date', function(assert) {
              var resources = [{
                id: 0,
                text: 'David Carter',
                color: '#74d57b'
              }, {
                id: 1,
                text: 'Emma Lewis',
                color: '#1db2f5'
              }, {
                id: 2,
                text: 'Noah Hill',
                color: '#f5564a'
              }, {
                id: 3,
                text: 'William Bell',
                color: '#97c95c'
              }];
              var appointment = {
                text: 'Test',
                startDate: new Date('2021-02-26T12:16:00.000Z'),
                endDate: new Date('2021-02-26T15:36:00.000Z'),
                humanId: 1
              };
              var scheduler = createWrapper({
                width: 400,
                currentDate: new Date(2021, 1, 2),
                dataSource: [appointment],
                views: ['month'],
                currentView: 'month',
                scrolling: {mode: 'virtual'},
                groups: ['humanId'],
                groupByDate: true,
                resources: [{
                  fieldExpr: 'humanId',
                  allowMultiple: false,
                  dataSource: resources
                }]
              });
              var instance = scheduler.instance;
              var workspace = instance.getWorkSpace();
              var scrollable = workspace.getScrollable();
              workspace.renderer.getRenderTimeout = function() {
                return -1;
              };
              return asyncWrapper(assert, function(promise) {
                [{
                  scrollX: 1066,
                  expectedSettings: {
                    hMax: 1650,
                    left: 1575
                  }
                }, {
                  scrollX: 1300,
                  expectedSettings: {
                    hMax: 1950,
                    left: 1575
                  }
                }].forEach(function($__6) {
                  var $__7 = $__6,
                      scrollX = $__7.scrollX,
                      expectedSettings = $__7.expectedSettings;
                  promise = asyncScrollTest(assert, promise, function() {
                    var layoutManager = instance.getLayoutManager();
                    var settings = layoutManager._positionMap[0][0];
                    assert.ok(true, ("scrollX: " + scrollX));
                    assert.equal(settings.hMax, expectedSettings.hMax, 'Last group cell position is correct');
                    assert.equal(settings.left, expectedSettings.left, 'Cell left position is correct');
                  }, scrollable, {left: scrollX});
                });
                return promise;
              });
            });
          });
        });
        module('Recurrent appointments', function() {
          test('Regular recurrent appointment should be rendered correctly if horizontal grouping', function(assert) {
            var scheduler = createWrapper({
              dataSource: [{
                text: 'Test-REC00',
                startDate: new Date(2021, 1, 1, 16),
                endDate: new Date(2021, 1, 1, 17, 30),
                recurrenceRule: 'FREQ=WEEKLY;INTERVAL=2',
                priority: [1, 3]
              }],
              views: ['month'],
              currentView: 'month',
              currentDate: new Date(2021, 1, 1),
              groups: ['priority'],
              resources: [{
                fieldExpr: 'priority',
                allowMultiple: false,
                dataSource: [{
                  id: 1,
                  text: 'rc_001'
                }, {
                  id: 2,
                  text: 'rc_002'
                }, {
                  id: 3,
                  text: 'rc_003'
                }, {
                  id: 4,
                  text: 'rc_004'
                }]
              }],
              scrolling: {
                mode: 'virtual',
                orientation: 'both'
              },
              crossScrollingEnabled: true,
              width: 530,
              height: 600
            });
            var instance = scheduler.instance;
            var scrollable = instance.getWorkSpaceScrollable();
            return asyncWrapper(assert, function(promise) {
              [{
                offset: {x: 0},
                expectedRects: [{
                  left: -9924,
                  top: -9837,
                  width: 75
                }, {
                  left: -9924,
                  top: -9681,
                  width: 75
                }, {
                  left: -9924,
                  top: -9527,
                  width: 75
                }]
              }, {
                offset: {x: 1050},
                expectedRects: [{
                  left: -9924,
                  top: -9837,
                  width: 75
                }, {
                  left: -9924,
                  top: -9681,
                  width: 75
                }, {
                  left: -9924,
                  top: -9527,
                  width: 75
                }]
              }, {
                offset: {x: 2100},
                expectedRects: []
              }].forEach(function($__6) {
                var $__7 = $__6,
                    offset = $__7.offset,
                    expectedRects = $__7.expectedRects;
                promise = asyncScrollTest(assert, promise, function() {
                  assert.ok(true, printOffset(offset));
                  var appointments = scheduler.appointments;
                  assert.equal(expectedRects.length, appointments.getAppointmentCount(), 'Appointment amount is correct');
                  expectedRects.forEach(function(expectedRect, index) {
                    var appointmentRect = appointments.getAppointment(index).get(0).getBoundingClientRect();
                    assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, 'appointment left is correct');
                    assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, 'appointment top is correct');
                    assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, 'appointment width is correct');
                  });
                }, scrollable, offset);
              });
              return promise;
            });
          });
          test('Regular recurrent appointment should be rendered correctly if vertical grouping', function(assert) {
            var scheduler = createWrapper({
              dataSource: [{
                text: 'Test-REC00',
                startDate: new Date(2021, 1, 1, 16),
                endDate: new Date(2021, 1, 1, 17, 30),
                recurrenceRule: 'FREQ=WEEKLY;INTERVAL=2',
                priority: [1, 3]
              }],
              views: [{
                type: 'month',
                groupOrientation: 'vertical'
              }],
              currentView: 'month',
              currentDate: new Date(2021, 1, 1),
              groups: ['priority'],
              resources: [{
                fieldExpr: 'priority',
                allowMultiple: false,
                dataSource: [{
                  id: 1,
                  text: 'rc_001'
                }, {
                  id: 2,
                  text: 'rc_002'
                }, {
                  id: 3,
                  text: 'rc_003'
                }, {
                  id: 4,
                  text: 'rc_004'
                }]
              }],
              scrolling: {
                mode: 'virtual',
                orientation: 'both'
              },
              crossScrollingEnabled: true,
              width: 530,
              height: 560
            });
            var instance = scheduler.instance;
            var scrollable = instance.getWorkSpaceScrollable();
            return asyncWrapper(assert, function(promise) {
              [{
                offset: {y: 0},
                expectedRects: [{
                  left: -9824,
                  top: -9866,
                  width: 75
                }, {
                  left: -9824,
                  top: -9716,
                  width: 75
                }, {
                  left: -9824,
                  top: -9566,
                  width: 75
                }]
              }, {
                offset: {y: 900},
                expectedRects: [{
                  left: -9824,
                  top: -9866,
                  width: 75
                }, {
                  left: -9824,
                  top: -9716,
                  width: 75
                }, {
                  left: -9824,
                  top: -9566,
                  width: 75
                }]
              }].forEach(function($__6) {
                var $__7 = $__6,
                    offset = $__7.offset,
                    expectedRects = $__7.expectedRects;
                promise = asyncScrollTest(assert, promise, function() {
                  assert.ok(true, printOffset(offset));
                  var appointments = scheduler.appointments;
                  assert.equal(expectedRects.length, appointments.getAppointmentCount(), 'Appointment amount is correct');
                  expectedRects.forEach(function(expectedRect, index) {
                    var appointmentRect = appointments.getAppointment(index).get(0).getBoundingClientRect();
                    assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, 'appointment left is correct');
                    assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, 'appointment top is correct');
                    assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, 'appointment width is correct');
                  });
                }, scrollable, offset);
              });
              return promise;
            });
          });
          test('Multi week recurrent appointment should be rendered correctly if horizontal grouping', function(assert) {
            var scheduler = createWrapper({
              dataSource: [{
                text: 'Test-R00',
                startDate: new Date(2021, 1, 1, 16),
                endDate: new Date(2021, 1, 24, 17, 30),
                recurrenceRule: 'FREQ=MONTHLY;INTERVAL=2',
                priority: [1, 3]
              }],
              views: [{type: 'month'}],
              currentView: 'month',
              currentDate: new Date(2021, 1, 1),
              groups: ['priority'],
              resources: [{
                fieldExpr: 'priority',
                allowMultiple: false,
                dataSource: [{
                  id: 1,
                  text: 'rc_001'
                }, {
                  id: 2,
                  text: 'rc_002'
                }, {
                  id: 3,
                  text: 'rc_003'
                }, {
                  id: 4,
                  text: 'rc_004'
                }]
              }],
              scrolling: {
                mode: 'virtual',
                orientation: 'both'
              },
              crossScrollingEnabled: true,
              width: 530,
              height: 560
            });
            var instance = scheduler.instance;
            var scrollable = instance.getWorkSpaceScrollable();
            return asyncWrapper(assert, function(promise) {
              [{
                offset: {x: 0},
                expectedRects: [{
                  left: -9924,
                  top: -9837,
                  width: 450
                }, {
                  left: -9999,
                  top: -9766,
                  width: 525
                }, {
                  left: -9999,
                  top: -9695,
                  width: 525
                }, {
                  left: -9999,
                  top: -9625,
                  width: 301
                }]
              }, {
                offset: {x: 1050},
                expectedRects: [{
                  left: -9924,
                  top: -9837,
                  width: 450
                }, {
                  left: -9999,
                  top: -9766,
                  width: 525
                }, {
                  left: -9999,
                  top: -9695,
                  width: 525
                }, {
                  left: -9999,
                  top: -9625,
                  width: 301
                }]
              }, {
                offset: {x: 1300},
                expectedRects: [{
                  left: -10174,
                  top: -9837,
                  width: 450
                }, {
                  left: -10249,
                  top: -9766,
                  width: 525
                }, {
                  left: -10249,
                  top: -9695,
                  width: 525
                }, {
                  left: -10249,
                  top: -9625,
                  width: 301
                }]
              }].forEach(function($__6) {
                var $__7 = $__6,
                    offset = $__7.offset,
                    expectedRects = $__7.expectedRects;
                promise = asyncScrollTest(assert, promise, function() {
                  assert.ok(true, printOffset(offset));
                  var appointments = scheduler.appointments;
                  assert.equal(expectedRects.length, appointments.getAppointmentCount(), 'Appointment amount is correct');
                  expectedRects.forEach(function(expectedRect, index) {
                    var appointmentRect = appointments.getAppointment(index).get(0).getBoundingClientRect();
                    assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment#" + index + " left is correct"));
                    assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment#" + index + " top is correct"));
                    assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, ("appointment#" + index + " width is correct"));
                  });
                }, scrollable, offset);
              });
              return promise;
            });
          });
          test('Multi week recurrent appointment should be rendered correctly if vertical grouping', function(assert) {
            var scheduler = createWrapper({
              dataSource: [{
                text: 'Test-R00',
                startDate: new Date(2021, 1, 1, 16),
                endDate: new Date(2021, 1, 24, 17, 30),
                recurrenceRule: 'FREQ=MONTHLY;INTERVAL=2',
                priority: [1, 3]
              }],
              views: [{
                type: 'month',
                groupOrientation: 'vertical'
              }],
              currentView: 'month',
              currentDate: new Date(2021, 1, 1),
              groups: ['priority'],
              resources: [{
                fieldExpr: 'priority',
                allowMultiple: false,
                dataSource: [{
                  id: 1,
                  text: 'rc_001'
                }, {
                  id: 2,
                  text: 'rc_002'
                }, {
                  id: 3,
                  text: 'rc_003'
                }, {
                  id: 4,
                  text: 'rc_004'
                }]
              }],
              scrolling: {
                mode: 'virtual',
                orientation: 'both'
              },
              crossScrollingEnabled: true,
              width: 630,
              height: 560
            });
            var instance = scheduler.instance;
            var scrollable = instance.getWorkSpaceScrollable();
            return asyncWrapper(assert, function(promise) {
              [{
                offset: {y: 0},
                expectedRects: [{
                  left: -9824,
                  top: -9866,
                  width: 453
                }, {
                  left: -9899,
                  top: -9791,
                  width: 528
                }, {
                  left: -9899,
                  top: -9716,
                  width: 528
                }, {
                  left: -9899,
                  top: -9641,
                  width: 301
                }]
              }, {
                offset: {y: 900},
                expectedRects: [{
                  left: -9824,
                  top: -9866,
                  width: 453
                }, {
                  left: -9899,
                  top: -9791,
                  width: 528
                }, {
                  left: -9899,
                  top: -9716,
                  width: 528
                }, {
                  left: -9899,
                  top: -9641,
                  width: 301
                }]
              }, {
                offset: {y: 1100},
                expectedRects: [{
                  left: -9824,
                  top: -10066,
                  width: 453
                }, {
                  left: -9899,
                  top: -9991,
                  width: 528
                }, {
                  left: -9899,
                  top: -9916,
                  width: 528
                }, {
                  left: -9899,
                  top: -9841,
                  width: 301
                }]
              }].forEach(function($__6) {
                var $__7 = $__6,
                    offset = $__7.offset,
                    expectedRects = $__7.expectedRects;
                promise = asyncScrollTest(assert, promise, function() {
                  assert.ok(true, printOffset(offset));
                  var appointments = scheduler.appointments;
                  assert.equal(expectedRects.length, appointments.getAppointmentCount(), 'Appointment amount is correct');
                  expectedRects.forEach(function(expectedRect, index) {
                    var appointmentRect = appointments.getAppointment(index).get(0).getBoundingClientRect();
                    assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment#" + index + " left is correct"));
                    assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment#" + index + " top is correct"));
                    assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, ("appointment#" + index + " width is correct"));
                  });
                }, scrollable, offset);
              });
              return promise;
            });
          });
          test('Long appointments should be rendered correctly when style is custom', function(assert) {
            var $style = $('<style>');
            var styleBefore = $style.text();
            $style.text('#scheduler .dx-scheduler-cell-sizes-horizontal { width: 150px } ').appendTo('head');
            var scheduler = createWrapper({
              height: 600,
              currentDate: new Date(2021, 1, 2),
              dataSource: [{
                startDate: new Date(2021, 1, 7, 8),
                endDate: new Date(2021, 1, 20, 20),
                priority: 1
              }],
              views: [{
                type: 'timelineWorkWeek',
                name: 'Timeline',
                groupOrientation: 'vertical'
              }, {
                type: 'workWeek',
                groupOrientation: 'vertical'
              }, {
                type: 'month',
                groupOrientation: 'horizontal'
              }],
              currentView: 'month',
              startDayHour: 8,
              endDayHour: 20,
              scrolling: {mode: 'virtual'},
              showAllDayPanel: false,
              groups: ['priority'],
              resources: [{
                fieldExpr: 'priority',
                allowMultiple: false,
                dataSource: [{
                  id: 1,
                  text: 'rc_001'
                }, {
                  id: 2,
                  text: 'rc_002'
                }, {
                  id: 3,
                  text: 'rc_003'
                }, {
                  id: 4,
                  text: 'rc_004'
                }]
              }],
              width: 400
            });
            var appointmentCount = scheduler.appointmentList.length;
            assert.equal(appointmentCount, 2, 'Correct number of long appointment parts');
            $style.text(styleBefore);
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","jquery","core/utils/date","../../helpers/scheduler/helpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("jquery"), require("core/utils/date"), require("../../helpers/scheduler/helpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=virtual_scrolling.monthView.tests.js.map