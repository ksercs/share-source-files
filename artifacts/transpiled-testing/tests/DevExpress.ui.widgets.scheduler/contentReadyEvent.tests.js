!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/contentReadyEvent.tests.js"], ["../../helpers/scheduler/helpers.js","jquery","animation/translator","data/data_source/data_source","data/custom_store","animation/fx","ui/scheduler/ui.scheduler","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/contentReadyEvent.tests.js", ["../../helpers/scheduler/helpers.js", "jquery", "animation/translator", "data/data_source/data_source", "data/custom_store", "animation/fx", "ui/scheduler/ui.scheduler", "generic_light.css!"], function($__export) {
  "use strict";
  var SchedulerTestWrapper,
      initTestMarkup,
      $,
      translator,
      DataSource,
      CustomStore,
      fx,
      createScheduler,
      moduleConfig;
  return {
    setters: [function($__m) {
      SchedulerTestWrapper = $__m.SchedulerTestWrapper;
      initTestMarkup = $__m.initTestMarkup;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      translator = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      initTestMarkup();
      createScheduler = function(options) {
        var data = [{
          text: 'Task 1',
          startDate: new Date(2015, 1, 9, 1, 0),
          endDate: new Date(2015, 1, 9, 2, 0)
        }, {
          text: 'Task 2',
          startDate: new Date(2015, 1, 9, 11, 0),
          endDate: new Date(2015, 1, 9, 12, 0)
        }];
        var defaultOption = {dataSource: data};
        var instance = $('#scheduler').dxScheduler($.extend(defaultOption, options)).dxScheduler('instance');
        return new SchedulerTestWrapper(instance);
      };
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
      QUnit.module('onContentReady event', moduleConfig, function() {
        QUnit.test('contentReady action should rise after change dataSource', function(assert) {
          var dataSource1 = [{
            text: '1',
            startDate: new Date(2016, 2, 15, 1),
            endDate: new Date(2016, 2, 15, 2)
          }];
          var dataSource2 = [{
            text: '2',
            startDate: new Date(2016, 2, 15, 1),
            endDate: new Date(2016, 2, 15, 2)
          }];
          var contentReadyCount = 0;
          var scheduler = createScheduler({
            onContentReady: function(e) {
              return contentReadyCount++;
            },
            views: ['week'],
            currentView: 'week',
            currentDate: new Date(2016, 2, 15, 1)
          });
          assert.equal(contentReadyCount, 1, 'contentReady should be rise after first init control');
          scheduler.option('dataSource', dataSource1);
          assert.equal(scheduler.appointments.getTitleText(), '1', 'Appointment should be render');
          assert.equal(contentReadyCount, 2, 'contentReady should be rise after set dataSource');
          scheduler.option('dataSource', dataSource2);
          assert.equal(scheduler.appointments.getTitleText(), '2', 'Appointment should be re-render');
          assert.equal(contentReadyCount, 3, 'contentReady should be rise after change dataSource');
        });
        QUnit.test('contentReady action should rise after call repaint', function(assert) {
          var contentReadyCount = 0;
          var scheduler = createScheduler({onContentReady: function(e) {
              return contentReadyCount++;
            }});
          assert.equal(contentReadyCount, 1, 'contentReady should be rise after first init control');
          scheduler.instance.repaint();
          assert.equal(contentReadyCount, 2, 'contentReady should be rise after call repaint');
        });
        QUnit.test('contentReady action should rise on first init, data source load and after call repaint method', function(assert) {
          var contentReadyCount = 0;
          var dataSource = new DataSource({store: new CustomStore({load: function() {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve([{
                    text: 'appointment',
                    startDate: new Date(2016, 2, 15, 1),
                    endDate: new Date(2016, 2, 15, 2)
                  }]);
                }, 100);
                return d.promise();
              }})});
          var scheduler = createScheduler({
            dataSource: dataSource,
            onContentReady: function(e) {
              return contentReadyCount++;
            }
          });
          assert.equal(contentReadyCount, 0, 'contentReady should be rise after first init control');
          this.clock.tick(200);
          assert.equal(contentReadyCount, 1, 'contentReady should be rise after dataSource loaded');
          scheduler.instance.repaint();
          assert.equal(contentReadyCount, 2, 'contentReady should be rise after call repaint');
        });
        QUnit.test('contentReady action should rise even if dataSource isn\'t set', function(assert) {
          var contentReadyCount = 0;
          createScheduler({onContentReady: function(e) {
              return contentReadyCount++;
            }});
          assert.equal(contentReadyCount, 1, 'contentReady is fired');
        });
        QUnit.test('contentReady action should rise at the right time', function(assert) {
          var done = assert.async();
          this.clock.restore();
          var dataSource = new DataSource({store: new CustomStore({load: function() {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve([{
                    startDate: new Date(2016, 2, 15, 1).toString(),
                    endDate: new Date(2016, 2, 15, 2).toString()
                  }]);
                }, 100);
                return d.promise();
              }})});
          var scheduler = createScheduler({
            currentDate: new Date(2016, 2, 15),
            views: ['week'],
            currentView: 'week',
            width: 800,
            dataSource: dataSource,
            onContentReady: function(e) {
              var element = e.component;
              var $header = element.getHeader().$element();
              var $workSpace = element.getWorkSpace().$element();
              var appointmentPosition = translator.locate(scheduler.appointments.getAppointment());
              assert.equal($header.length, 1, 'Header is rendered');
              assert.equal($workSpace.length, 1, 'Work Space is rendered');
              assert.equal(scheduler.appointments.getAppointmentCount(), 1, 'Appointment is rendered');
              assert.roughEqual(appointmentPosition.top, 100, 2.001, 'Appointment top is OK');
              assert.roughEqual(appointmentPosition.left, 199, 1.001, 'Appointment left is OK');
              done();
            }
          });
        });
        QUnit.test('contentReady action should rise when appointment is added', function(assert) {
          var scheduler = createScheduler({
            currentDate: new Date(2016, 2, 15),
            views: ['week'],
            currentView: 'week',
            width: 800,
            dataSource: []
          });
          scheduler.instance.option('onContentReady', function(e) {
            var appointmentPosition = translator.locate(scheduler.appointments.getAppointment());
            assert.equal(scheduler.appointments.getAppointmentCount(), 1, 'Appointment is rendered');
            assert.roughEqual(appointmentPosition.top, 100, 2.001, 'Appointment top is OK');
            assert.roughEqual(appointmentPosition.left, 199, 1.001, 'Appointment left is OK');
          });
          scheduler.instance.addAppointment({
            startDate: new Date(2016, 2, 15, 1).toString(),
            endDate: new Date(2016, 2, 15, 2).toString()
          });
        });
        QUnit.test('contentReady action should rise when appointment is updated', function(assert) {
          var appointment = {
            startDate: new Date(2016, 2, 15, 1).toString(),
            endDate: new Date(2016, 2, 15, 2).toString()
          };
          var scheduler = createScheduler({
            currentDate: new Date(2016, 2, 15),
            views: ['week'],
            currentView: 'week',
            width: 800,
            dataSource: [appointment]
          });
          scheduler.instance.option('onContentReady', function(e) {
            var appointmentPosition = translator.locate(scheduler.appointments.getAppointment());
            assert.equal(scheduler.appointments.getAppointmentCount(), 1, 'Appointment is rendered');
            assert.roughEqual(appointmentPosition.top, 150, 2.001, 'Appointment top is OK');
            assert.roughEqual(appointmentPosition.left, 199, 1.001, 'Appointment left is OK');
          });
          scheduler.instance.updateAppointment(appointment, {startDate: new Date(2016, 2, 15, 1, 30).toString()});
        });
        QUnit.test('contentReady action should rise when appointment is deleted', function(assert) {
          var appointment = {
            startDate: new Date(2016, 2, 15, 1).toString(),
            endDate: new Date(2016, 2, 15, 2).toString()
          };
          var scheduler = createScheduler({
            currentDate: new Date(2016, 2, 15),
            views: ['week'],
            currentView: 'week',
            width: 800,
            dataSource: [appointment]
          });
          scheduler.instance.option('onContentReady', function(e) {
            return assert.equal(scheduler.appointments.getAppointmentCount(), 0, 'Appointment is not rendered');
          });
          scheduler.instance.deleteAppointment(appointment);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/scheduler/helpers.js","jquery","animation/translator","data/data_source/data_source","data/custom_store","animation/fx","ui/scheduler/ui.scheduler","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/scheduler/helpers.js"), require("jquery"), require("animation/translator"), require("data/data_source/data_source"), require("data/custom_store"), require("animation/fx"), require("ui/scheduler/ui.scheduler"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=contentReadyEvent.tests.js.map