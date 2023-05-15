!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/appointment.resources.tests.js"], ["animation/fx","data/data_source/data_source","../../helpers/scheduler/helpers.js","ui/scheduler/ui.scheduler","ui/switch","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/appointment.resources.tests.js", ["animation/fx", "data/data_source/data_source", "../../helpers/scheduler/helpers.js", "ui/scheduler/ui.scheduler", "ui/switch", "generic_light.css!"], function($__export) {
  "use strict";
  var fx,
      DataSource,
      initTestMarkup,
      createWrapper,
      module,
      test,
      APPOINTMENT_CLASS;
  return {
    setters: [function($__m) {
      fx = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      initTestMarkup = $__m.initTestMarkup;
      createWrapper = $__m.createWrapper;
    }, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__4;
      (($__4 = QUnit, module = $__4.module, test = $__4.test, $__4));
      QUnit.testStart(function() {
        return initTestMarkup();
      });
      APPOINTMENT_CLASS = 'dx-scheduler-appointment';
      module('Integration: Appointment resources', {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        ['standard', 'virtual'].forEach(function(scrollingMode) {
          module(("Scrolling mode " + scrollingMode), function() {
            test('Task with resources should contain a right data attr', function(assert) {
              var data = new DataSource({store: [{
                  text: 'Item 1',
                  ownerId: 2,
                  roomId: 1,
                  startDate: new Date(2015, 1, 8),
                  endDate: new Date(2015, 1, 8, 0, 30)
                }, {
                  text: 'Item 2',
                  ownerId: [1, 2],
                  startDate: new Date(2015, 1, 9),
                  endDate: new Date(2015, 1, 9, 0, 30)
                }, {
                  text: 'Item 3',
                  startDate: new Date(2015, 1, 9)
                }]});
              var scheduler = createWrapper({
                currentDate: new Date(2015, 1, 9),
                currentView: 'week',
                resources: [{
                  field: 'ownerId',
                  dataSource: [{
                    id: 1,
                    text: 'a',
                    color: 'red'
                  }, {
                    id: 2,
                    text: 'b',
                    color: 'green'
                  }]
                }, {
                  field: 'roomId',
                  dataSource: [{
                    id: 1,
                    text: 'c',
                    color: 'blue'
                  }, {
                    id: 2,
                    text: 'd',
                    color: 'white'
                  }]
                }],
                dataSource: data,
                width: 700,
                height: 600,
                scrolling: {mode: scrollingMode}
              });
              this.clock.tick(300);
              scheduler.instance.focus();
              var tasks = scheduler.instance.$element().find('.' + APPOINTMENT_CLASS);
              assert.ok(tasks.eq(0).attr('data-ownerid-2'));
              assert.ok(tasks.eq(0).attr('data-roomid-1'));
              assert.ok(tasks.eq(1).attr('data-ownerid-1'));
              assert.ok(tasks.eq(1).attr('data-ownerid-2'));
              assert.ok(!tasks.eq(2).attr('data-ownerid-1'));
              assert.ok(!tasks.eq(2).attr('data-ownerid-2'));
              assert.ok(!tasks.eq(2).attr('data-roomid-1'));
              assert.ok(!tasks.eq(2).attr('data-roomid-2'));
            });
            test('Task with resources should contain a right data attr if field contains a space', function(assert) {
              var data = new DataSource({store: [{
                  text: 'Item 1',
                  'owner  Id': 2,
                  startDate: new Date(2015, 1, 8),
                  endDate: new Date(2015, 1, 8, 0, 30)
                }]});
              var scheduler = createWrapper({
                currentDate: new Date(2015, 1, 9),
                currentView: 'week',
                resources: [{
                  field: 'owner  Id',
                  dataSource: [{
                    id: 1,
                    text: 'a',
                    color: 'red'
                  }, {
                    id: 2,
                    text: 'b',
                    color: 'green'
                  }]
                }],
                dataSource: data,
                width: 700,
                height: 600,
                scrolling: {mode: scrollingMode}
              });
              this.clock.tick(300);
              scheduler.instance.focus();
              var tasks = scheduler.instance.$element().find('.' + APPOINTMENT_CLASS);
              assert.ok(tasks.eq(0).attr('data-owner__32____32__id-2'));
            });
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["animation/fx","data/data_source/data_source","../../helpers/scheduler/helpers.js","ui/scheduler/ui.scheduler","ui/switch","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("animation/fx"), require("data/data_source/data_source"), require("../../helpers/scheduler/helpers.js"), require("ui/scheduler/ui.scheduler"), require("ui/switch"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=appointment.resources.tests.js.map