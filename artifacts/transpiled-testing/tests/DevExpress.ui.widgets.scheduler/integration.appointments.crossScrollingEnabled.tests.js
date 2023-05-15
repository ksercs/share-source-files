!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/integration.appointments.crossScrollingEnabled.tests.js"], ["jquery","animation/translator","animation/fx","../../helpers/pointerMock.js","core/devices","../../helpers/scheduler/helpers.js","ui/scheduler/ui.scheduler","ui/switch","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/integration.appointments.crossScrollingEnabled.tests.js", ["jquery", "animation/translator", "animation/fx", "../../helpers/pointerMock.js", "core/devices", "../../helpers/scheduler/helpers.js", "ui/scheduler/ui.scheduler", "ui/switch", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      translator,
      fx,
      pointerMock,
      devices,
      initTestMarkup,
      createWrapper,
      module,
      test,
      config;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      translator = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      initTestMarkup = $__m.initTestMarkup;
      createWrapper = $__m.createWrapper;
    }, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__2;
      QUnit.testStart(function() {
        return initTestMarkup();
      });
      (($__2 = QUnit, module = $__2.module, test = $__2.test, $__2));
      config = {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      };
      module('crossScrollingEnabled = true', config, function() {
        var isMobile = devices.current().deviceType !== 'desktop';
        test('Appointments should be rendered on the same line after navigating to the next month(T804721)', function(assert) {
          var expectedTop = 26;
          var views = ['timelineMonth', 'timelineWeek'];
          var data = [{
            text: 'Event 1',
            recurrenceRule: 'FREQ=DAILY',
            startDate: new Date(2019, 1, 1, 14, 0),
            endDate: new Date(2019, 1, 1, 12, 30)
          }];
          var scheduler = createWrapper({
            dataSource: data,
            views: views,
            currentView: views[0],
            currentDate: new Date(2019, 2, 1),
            crossScrollingEnabled: true,
            height: 600
          });
          var testTopPosition = function(view, navigatorDate) {
            scheduler.appointments.getAppointments().each(function(index, element) {
              var currentTop = translator.locate($(element)).top;
              assert.equal(currentTop, expectedTop, ("current appointment top position should be equal " + expectedTop + " in " + view + " type, " + navigatorDate + " date"));
            });
          };
          views.forEach(function(view) {
            var navigator = scheduler.header.navigator;
            scheduler.option('currentView', view);
            testTopPosition(view, navigator.caption.getElement());
            navigator.nextButton.click();
            testTopPosition(view, navigator.caption.getElement());
            navigator.nextButton.click();
            testTopPosition(view, navigator.caption.getElement());
            navigator.prevButton.click();
            testTopPosition(view, navigator.caption.getElement());
            navigator.prevButton.click();
            testTopPosition(view, navigator.caption.getElement());
          });
        });
        test('Appointment should have correct position while vertical dragging', function(assert) {
          var scheduler = createWrapper({
            currentDate: new Date(2015, 6, 10),
            _draggingMode: 'default',
            editing: true,
            views: ['month'],
            currentView: 'month',
            dataSource: [{
              text: 'a',
              startDate: new Date(2015, 6, 10, 0),
              endDate: new Date(2015, 6, 10, 0, 30),
              ownerId: 1
            }],
            groups: ['ownerId'],
            resources: [{
              field: 'ownerId',
              dataSource: [{
                id: 1,
                text: 'one'
              }, {
                id: 2,
                text: 'two'
              }, {
                id: 3,
                text: 'three'
              }, {
                id: 4,
                text: 'four'
              }]
            }],
            width: 800,
            height: 600,
            crossScrollingEnabled: true
          });
          var $appointment = scheduler.appointments.getAppointment();
          var dragDistance = -50;
          var pointer = pointerMock($appointment).start();
          var startPosition = $appointment.offset();
          pointer.down().move(0, dragDistance);
          var $draggedAppointment = $(scheduler.appointments.getAppointment().get(0)).parent();
          var currentPosition = translator.locate($draggedAppointment);
          assert.roughEqual(startPosition.top, currentPosition.top - dragDistance, 1.001, 'Appointment position is correct');
          pointer.up();
        });
        test('Appointments should be repainted if the \'crossScrollingEnabled\' is changed', function(assert) {
          var scheduler = createWrapper({
            currentDate: new Date(2015, 6, 10),
            dataSource: [{
              text: 'a',
              startDate: new Date(2015, 6, 10, 0),
              endDate: new Date(2015, 6, 10, 4),
              ownerId: 1
            }],
            crossScrollingEnabled: true
          });
          var appointmentsInstance = scheduler.instance.getAppointmentsInstance();
          var items = appointmentsInstance.option('items');
          scheduler.option('crossScrollingEnabled', false);
          assert.notDeepEqual(appointmentsInstance.option('items'), items, 'Appointments are repainted');
        });
        if (!isMobile) {
          test('Month appointment inside grouped view should have a right resizable area after horizontal scroll end', function(assert) {
            var scheduler = createWrapper({
              currentDate: new Date(2015, 6, 10),
              views: ['month'],
              editing: true,
              currentView: 'month',
              dataSource: [{
                text: 'a',
                startDate: new Date(2015, 6, 10, 0),
                endDate: new Date(2015, 6, 10, 0, 30),
                ownerId: 1
              }],
              groups: ['ownerId'],
              resources: [{
                field: 'ownerId',
                dataSource: [{
                  id: 1,
                  text: 'one'
                }, {
                  id: 2,
                  text: 'two'
                }, {
                  id: 3,
                  text: 'three'
                }, {
                  id: 4,
                  text: 'four'
                }]
              }],
              width: 800,
              height: 600,
              crossScrollingEnabled: true
            });
            var scrollOffset = 100;
            var $appointment = scheduler.appointments.getAppointment();
            var initialResizableAreaLeft = $appointment.dxResizable('instance').option('area').left;
            var initialResizableAreaRight = $appointment.dxResizable('instance').option('area').right;
            var scrollable = scheduler.workSpace.getDateTableScrollable().dxScrollable('instance');
            scrollable.scrollTo({
              left: scrollOffset,
              top: 0
            });
            assert.equal($appointment.dxResizable('instance').option('area').left, initialResizableAreaLeft - scrollOffset);
            assert.equal($appointment.dxResizable('instance').option('area').right, initialResizableAreaRight - scrollOffset);
          });
          test('Appointment should have correct position while horizontal dragging', function(assert) {
            var dragDistance = 150;
            var scheduler = createWrapper({
              height: 500,
              _draggingMode: 'default',
              editing: true,
              currentDate: new Date(2015, 1, 9),
              currentView: 'week',
              dataSource: [{
                text: 'a',
                startDate: new Date(2015, 1, 9, 1),
                endDate: new Date(2015, 1, 9, 1, 30)
              }]
            });
            var $appointment = scheduler.appointments.getAppointment();
            var pointer = pointerMock($appointment).start();
            var startPosition = $appointment.offset();
            pointer.down().move(dragDistance, 0);
            var $draggedAppointment = $(scheduler.appointments.getAppointment().get(0)).parent();
            var currentPosition = translator.locate($draggedAppointment);
            assert.roughEqual(startPosition.left, currentPosition.left - dragDistance, 2, 'Appointment position is correct');
            pointer.up();
          });
          test('Appointment should have correct position while horizontal dragging, crossScrollingEnabled = true (T732885)', function(assert) {
            var scheduler = createWrapper({
              height: 500,
              _draggingMode: 'default',
              editing: true,
              currentDate: new Date(2015, 1, 9),
              currentView: 'week',
              dataSource: [{
                text: 'a',
                startDate: new Date(2015, 1, 9, 1),
                endDate: new Date(2015, 1, 9, 1, 30)
              }],
              crossScrollingEnabled: true
            });
            var $appointment = scheduler.appointments.getAppointment();
            var dragDistance = 150;
            var pointer = pointerMock($appointment).start();
            var startPosition = $appointment.offset();
            pointer.down().move(dragDistance, 0);
            var $draggedAppointment = $(scheduler.appointments.getAppointment().get(0)).parent();
            var currentPosition = translator.locate($draggedAppointment);
            assert.roughEqual(startPosition.left, currentPosition.left - dragDistance, 2, 'Appointment position is correct');
            pointer.up();
          });
          test('Appointment should have correct position while horizontal dragging in scrolled date table', function(assert) {
            var scheduler = createWrapper({
              height: 500,
              width: 800,
              _draggingMode: 'default',
              editing: true,
              currentDate: new Date(2015, 1, 9),
              currentView: 'week',
              groups: ['room'],
              resources: [{
                field: 'room',
                dataSource: [{
                  id: 1,
                  text: '1'
                }, {
                  id: 2,
                  text: '2'
                }, {
                  id: 3,
                  text: '3'
                }]
              }],
              dataSource: [{
                text: 'a',
                startDate: new Date(2015, 1, 9, 1),
                endDate: new Date(2015, 1, 9, 1, 30),
                room: 2
              }],
              crossScrollingEnabled: true
            });
            var $appointment = scheduler.appointments.getAppointment();
            var scrollable = scheduler.instance.getWorkSpace().$element().find('.dx-scrollable').dxScrollable('instance');
            var startPosition = $appointment.offset();
            scrollable.scrollTo({
              left: 400,
              top: 0
            });
            var pointer = pointerMock($appointment).start();
            pointer.down().move(100, 0);
            var $draggedAppointment = $(scheduler.appointments.getAppointment().get(0)).parent();
            var currentPosition = translator.locate($draggedAppointment);
            assert.equal(currentPosition.left, startPosition.left - 400 + 100, 'Appointment position is correct');
            pointer.up();
          });
        }
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/translator","animation/fx","../../helpers/pointerMock.js","core/devices","../../helpers/scheduler/helpers.js","ui/scheduler/ui.scheduler","ui/switch","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/translator"), require("animation/fx"), require("../../helpers/pointerMock.js"), require("core/devices"), require("../../helpers/scheduler/helpers.js"), require("ui/scheduler/ui.scheduler"), require("ui/switch"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=integration.appointments.crossScrollingEnabled.tests.js.map