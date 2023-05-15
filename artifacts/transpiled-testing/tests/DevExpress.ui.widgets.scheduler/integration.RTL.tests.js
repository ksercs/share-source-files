!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/integration.RTL.tests.js"], ["animation/fx","../../helpers/scheduler/helpers.js","animation/translator","ui/scheduler/ui.scheduler","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/integration.RTL.tests.js", ["animation/fx", "../../helpers/scheduler/helpers.js", "animation/translator", "ui/scheduler/ui.scheduler", "generic_light.css!"], function($__export) {
  "use strict";
  var fx,
      createWrapper,
      initTestMarkup,
      isDesktopEnvironment,
      translator,
      test,
      module,
      moduleConfig;
  return {
    setters: [function($__m) {
      fx = $__m.default;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
      isDesktopEnvironment = $__m.isDesktopEnvironment;
    }, function($__m) {
      translator = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__4;
      (($__4 = QUnit, test = $__4.test, module = $__4.module, $__4));
      initTestMarkup();
      moduleConfig = {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      };
      module('RTL', moduleConfig, function() {
        if (isDesktopEnvironment()) {
          test('Appointment should have correct position with multiple resources if rtlEnabled is true (T803275)', function(assert) {
            var views = ['month', 'week', 'day'];
            var expectedValues = {
              month: [{
                top: 260,
                left: 599
              }, {
                top: 260,
                left: 250
              }],
              week: [{
                top: 0,
                left: 539
              }, {
                top: 0,
                left: 241
              }],
              day: [{
                top: 0,
                left: 324
              }, {
                top: 0,
                left: 25
              }]
            };
            var scheduler = createWrapper({
              views: views,
              currentView: views[0],
              rtlEnabled: true,
              dataSource: [{
                text: 'Apt1',
                roomId: [1, 2],
                startDate: new Date(2017, 4, 22),
                endDate: new Date(2017, 4, 22, 1, 30)
              }],
              currentDate: new Date(2017, 4, 22),
              groups: ['roomId'],
              resources: [{
                fieldExpr: 'roomId',
                dataSource: [{
                  text: 'Room 1',
                  id: 1
                }, {
                  text: 'Room 2',
                  id: 2
                }]
              }],
              width: 700,
              height: 600
            });
            views.forEach(function(view) {
              var getAppointment = scheduler.appointments.getAppointment;
              var expectedValue = expectedValues[view];
              scheduler.option('currentView', view);
              [getAppointment(0), getAppointment(1)].forEach(function(appointment, index) {
                var position = translator.locate(appointment);
                assert.roughEqual(Math.round(position.left), expectedValue[index].left, 3.01, ("left position of " + index + " appointment should be correct in " + view + " view"));
                assert.roughEqual(Math.round(position.top), expectedValue[index].top, 3.01, ("top position of " + index + " appointment should be correct in " + view + " view"));
              });
            });
          });
        }
        module('Task positions', function() {
          var createScheduler = function(view) {
            return createWrapper({
              currentView: view,
              currentDate: new Date(2015, 1, 9),
              height: 600,
              dataSource: [{
                text: 'Task 1',
                startDate: new Date(2015, 1, 9, 1, 0),
                endDate: new Date(2015, 1, 9, 2, 0)
              }],
              rtlEnabled: true
            });
          };
          test('Day view', function(assert) {
            var scheduler = createScheduler('day');
            var cell = scheduler.workSpace.getCell(8);
            var appointment = scheduler.appointments.getAppointment();
            assert.roughEqual(appointment.position().left + appointment.outerWidth(), cell.position().left + cell.outerWidth(), 1.1, 'task position is correct');
          });
          test('Week view', function(assert) {
            var scheduler = createScheduler('week');
            var cell = scheduler.workSpace.getCell(1);
            var appointment = scheduler.appointments.getAppointment();
            assert.roughEqual(Math.round(appointment.position().left + appointment.outerWidth()), Math.round(cell.position().left + cell.outerWidth()), 1.1, 'task position is correct');
          });
          test('Month view', function(assert) {
            var scheduler = createScheduler('month');
            var cell = scheduler.workSpace.getCell(1);
            var appointment = scheduler.appointments.getAppointment();
            assert.roughEqual(appointment.position().left + appointment.outerWidth(), cell.position().left + cell.outerWidth(), 1.1, 'task position is correct');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["animation/fx","../../helpers/scheduler/helpers.js","animation/translator","ui/scheduler/ui.scheduler","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("animation/fx"), require("../../helpers/scheduler/helpers.js"), require("animation/translator"), require("ui/scheduler/ui.scheduler"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=integration.RTL.tests.js.map