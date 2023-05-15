!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/keyboardNavigation.tests.js"], ["animation/fx","jquery","../../helpers/keyboardMock.js","../../helpers/scheduler/helpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/keyboardNavigation.tests.js", ["animation/fx", "jquery", "../../helpers/keyboardMock.js", "../../helpers/scheduler/helpers.js"], function($__export) {
  "use strict";
  var fx,
      $,
      keyboardMock,
      createWrapper,
      initTestMarkup;
  return {
    setters: [function($__m) {
      fx = $__m.default;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
    }],
    execute: function() {
      initTestMarkup();
      QUnit.module('Keyboard Navigation', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          fx.off = true;
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('Focus options should be passed to scheduler parts', function(assert) {
          var scheduler = createWrapper({
            focusStateEnabled: true,
            tabIndex: 1,
            currentView: 'day'
          });
          var header = scheduler.instance.getHeader();
          var workspace = scheduler.instance.getWorkSpace();
          var appointments = scheduler.instance.getAppointmentsInstance();
          assert.equal(scheduler.instance.$element().attr('tabindex'), null, 'scheduler has no tabIndex');
          assert.equal(header.option('focusStateEnabled'), true, 'header has correct focusStateEnabled');
          assert.equal(workspace.option('focusStateEnabled'), true, 'workspace has correct focusStateEnabled');
          assert.equal(appointments.option('focusStateEnabled'), true, 'appointments has correct focusStateEnabled');
          assert.equal(header.option('tabIndex'), 1, 'header has correct tabIndex');
          assert.equal(workspace.option('tabIndex'), 1, 'workspace has correct tabIndex');
          assert.equal(appointments.option('tabIndex'), 1, 'appointments has correct tabIndex');
        });
        QUnit.test('Focus options should be passed to scheduler parts after option changed', function(assert) {
          var scheduler = createWrapper({
            focusStateEnabled: true,
            tabIndex: 1,
            currentView: 'day'
          });
          var header = scheduler.instance.getHeader();
          var workspace = scheduler.instance.getWorkSpace();
          var appointments = scheduler.instance.getAppointmentsInstance();
          scheduler.instance.option('tabIndex', 2);
          assert.equal(header.option('tabIndex'), 2, 'header has correct tabIndex');
          assert.equal(workspace.option('tabIndex'), 2, 'workspace has correct tabIndex');
          assert.equal(appointments.option('tabIndex'), 2, 'appointments has correct tabIndex');
          scheduler.instance.option('focusStateEnabled', false);
          assert.equal(header.option('focusStateEnabled'), false, 'header has correct focusStateEnabled');
          assert.equal(workspace.option('focusStateEnabled'), false, 'workspace has correct focusStateEnabled');
          assert.equal(appointments.option('focusStateEnabled'), false, 'appointments has correct focusStateEnabled');
        });
        QUnit.test('AllowMultipleCellSelection option should be passed to scheduler workspace', function(assert) {
          var scheduler = createWrapper({
            focusStateEnabled: true,
            allowMultipleCellSelection: false
          });
          var workspace = scheduler.instance.getWorkSpace();
          assert.equal(workspace.option('allowMultipleCellSelection'), false, 'allowMultipleCellSelection');
          scheduler.instance.option('allowMultipleCellSelection', true);
          assert.equal(workspace.option('allowMultipleCellSelection'), true, 'allowMultipleCellSelection');
        });
        QUnit.test('focusedStateEnabled option value should be passed to ddAppointments', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              startDate: new Date(2015, 4, 24, 9, 10),
              endDate: new Date(2015, 4, 24, 11, 1),
              allDay: true,
              text: 'Task 1'
            }, {
              startDate: new Date(2015, 4, 24, 9, 10),
              endDate: new Date(2015, 4, 24, 11, 1),
              allDay: true,
              text: 'Task 2'
            }, {
              startDate: new Date(2015, 4, 24, 9, 10),
              endDate: new Date(2015, 4, 24, 11, 1),
              allDay: true,
              text: 'Task 3'
            }],
            currentDate: new Date(2015, 4, 24),
            views: ['month'],
            currentView: 'month',
            focusStateEnabled: false
          });
          scheduler.appointments.compact.click();
          assert.notOk(scheduler.instance._appointmentTooltip._list.option('focusStateEnabled'), 'focusStateEnabled was passed correctly');
          scheduler.instance._appointmentTooltip.hide();
          scheduler.instance.option('focusStateEnabled', true);
          scheduler.appointments.compact.click();
          assert.ok(scheduler.instance._appointmentTooltip._list.option('focusStateEnabled'), 'focusStateEnabled was passed correctly');
        });
        QUnit.test('Workspace navigation by arrows should work correctly with opened dropDown appointments', function(assert) {
          var scheduler = createWrapper({
            dataSource: [{
              startDate: new Date(2015, 4, 24, 9, 10),
              endDate: new Date(2015, 4, 24, 11, 1),
              allDay: true,
              text: 'Task 1'
            }, {
              startDate: new Date(2015, 4, 24, 9, 10),
              endDate: new Date(2015, 4, 24, 11, 1),
              allDay: true,
              text: 'Task 2'
            }, {
              startDate: new Date(2015, 4, 24, 9, 10),
              endDate: new Date(2015, 4, 24, 11, 1),
              allDay: true,
              text: 'Task 3'
            }],
            currentDate: new Date(2015, 4, 24),
            views: ['month'],
            currentView: 'month',
            focusStateEnabled: true
          });
          var $workSpace = scheduler.instance.getWorkSpace().$element();
          var keyboard = keyboardMock($workSpace);
          $(scheduler.instance.$element().find('.dx-scheduler-appointment-collector')).trigger('dxclick');
          keyboard.keyDown('down');
          keyboard.keyDown('up');
          keyboard.keyDown('right');
          keyboard.keyDown('left');
          assert.ok(true, 'Scheduler works correctly');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["animation/fx","jquery","../../helpers/keyboardMock.js","../../helpers/scheduler/helpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("animation/fx"), require("jquery"), require("../../helpers/keyboardMock.js"), require("../../helpers/scheduler/helpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=keyboardNavigation.tests.js.map