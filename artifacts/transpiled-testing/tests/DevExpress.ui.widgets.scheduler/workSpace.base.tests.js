!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/workSpace.base.tests.js"], ["core/utils/date","core/utils/resize_callbacks","generic_light.css!","jquery","localization/date","ui/scheduler/workspaces/ui.scheduler.work_space_day","ui/scheduler/workspaces/ui.scheduler.work_space_week","ui/scheduler/workspaces/ui.scheduler.work_space_month","ui/scheduler/workspaces/ui.scheduler.timeline_day","ui/scheduler/workspaces/ui.scheduler.timeline_week","ui/scheduler/workspaces/ui.scheduler.timeline_month"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/workSpace.base.tests.js", ["core/utils/date", "core/utils/resize_callbacks", "generic_light.css!", "jquery", "localization/date", "ui/scheduler/workspaces/ui.scheduler.work_space_day", "ui/scheduler/workspaces/ui.scheduler.work_space_week", "ui/scheduler/workspaces/ui.scheduler.work_space_month", "ui/scheduler/workspaces/ui.scheduler.timeline_day", "ui/scheduler/workspaces/ui.scheduler.timeline_week", "ui/scheduler/workspaces/ui.scheduler.timeline_month"], function($__export) {
  "use strict";
  var dateUtils,
      resizeCallbacks,
      $,
      dateLocalization,
      test,
      module;
  return {
    setters: [function($__m) {
      dateUtils = $__m.default;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__2;
      (($__2 = QUnit, test = $__2.test, module = $__2.module, $__2));
      module('Work Space Base', {beforeEach: function() {
          $('#qunit-fixture').html("\n            <div class=\"dx-scheduler\">\n                <div id=\"scheduler-work-space\">\n                </div>\n            </div>\n        ");
        }}, function() {
        test('Workspace week should set first day by firstDayOfWeek option if it is setted and this is different in localization', function(assert) {
          var dateLocalizationSpy = sinon.spy(dateLocalization, 'firstDayOfWeekIndex');
          $('#scheduler-work-space').dxSchedulerWorkSpaceWeek({
            views: ['week'],
            currentView: 'week',
            currentDate: new Date(2017, 4, 25),
            firstDayOfWeek: 0
          }).dxSchedulerWorkSpaceWeek('instance');
          assert.notOk(dateLocalizationSpy.called, 'dateLocalization.firstDayOfWeekIndex wasn\'t called');
        });
        [{
          viewName: 'Day',
          view: 'dxSchedulerWorkSpaceDay'
        }, {
          viewName: 'Week',
          view: 'dxSchedulerWorkSpaceWeek'
        }, {
          viewName: 'Month',
          view: 'dxSchedulerWorkSpaceMonth'
        }, {
          viewName: 'Timeline Day',
          view: 'dxSchedulerTimelineDay'
        }, {
          viewName: 'Timeline Week',
          view: 'dxSchedulerTimelineWeek'
        }, {
          viewName: 'Timeline Month',
          view: 'dxSchedulerTimelineMonth'
        }].forEach(function($__3) {
          var $__4 = $__3,
              viewName = $__4.viewName,
              view = $__4.view;
          QUnit.module(viewName, {beforeEach: function() {
              this.instance = $('#scheduler-work-space')[view]({})[view]('instance');
            }}, function() {
            test('Scheduler workspace should have a right default intervalCount and startDate', function(assert) {
              assert.equal(this.instance.option('intervalCount'), 1, 'dxSchedulerWorkSpace intervalCount is right');
              assert.deepEqual(this.instance.option('startDate'), null, 'dxSchedulerWorkSpace startDate is right');
            });
            if (viewName === 'Day' || viewName === 'Week') {
              test('Scheduler workspace scrollables should be updated after allDayExpanded option changed', function(assert) {
                this.instance.option('allDayExpanded', false);
                var stub = sinon.stub(this.instance, '_updateScrollable');
                this.instance.option('allDayExpanded', true);
                assert.ok(stub.calledOnce, 'Scrollables were updated');
              });
              test('Scheduler workspace scrollables should be updated after endDayHour option changed if allDayPanel is hided', function(assert) {
                this.instance.option('showAllDayPanel', false);
                this.instance.option('endDayHour', 18);
                var stub = sinon.stub(this.instance, '_updateScrollable');
                this.instance.option('endDayHour', 24);
                assert.ok(stub.calledOnce, 'Scrollables were updated');
              });
              test('getWorkSpaceMinWidth should work correctly after width changing', function(assert) {
                this.instance.option('crossScrollingEnabled', true);
                this.instance.option('width', 400);
                assert.equal(this.instance.getWorkSpaceMinWidth(), 300, 'minWidth is ok');
                this.instance.option('width', 900);
                assert.equal(this.instance.getWorkSpaceMinWidth(), 800, 'minWidth is ok');
              });
            }
            test('Tables should be rerendered if dimension was changed and horizontal scrolling is enabled', function(assert) {
              this.instance.option('crossScrollingEnabled', true);
              var stub = sinon.stub(this.instance, '_setTableSizes');
              resizeCallbacks.fire();
              assert.ok(stub.calledOnce, 'Tables were updated');
            });
            test('Tables should not be rerendered if dimension was changed and horizontal scrolling isn\'t enabled', function(assert) {
              this.instance.option('crossScrollingEnabled', false);
              var stub = sinon.stub(this.instance, '_setTableSizes');
              resizeCallbacks.fire();
              assert.equal(stub.callCount, 0, 'Tables were not updated');
            });
            test('Tables should be rerendered if width was changed and horizontal scrolling is enabled', function(assert) {
              var stub = sinon.stub(this.instance, '_setTableSizes');
              this.instance.option('crossScrollingEnabled', true);
              this.instance.option('width', 777);
              assert.ok(stub.calledOnce, 'Tables were updated');
            });
            test('Tables should not be rerendered if width was changed and horizontal scrolling isn\'t enabled', function(assert) {
              var stub = sinon.stub(this.instance, '_setTableSizes');
              this.instance.option('crossScrollingEnabled', false);
              this.instance.option('width', 777);
              assert.equal(stub.callCount, 0, 'Tables were not updated');
            });
            test('dateUtils.getTimezonesDifference should be called when calculating interval between dates', function(assert) {
              var stub = sinon.stub(dateUtils, 'getTimezonesDifference');
              var minDate = new Date('Thu Mar 10 2016 00:00:00 GMT-0500');
              var maxDate = new Date('Mon Mar 15 2016 00:00:00 GMT-0400');
              this.instance._getIntervalBetween(minDate, maxDate, true);
              assert.ok(stub.calledOnce, 'getTimezonesDifference was called');
              dateUtils.getTimezonesDifference.restore();
            });
            test('Global cache should be cleared on dimension changed', function(assert) {
              var spy = sinon.spy(this.instance.cache, 'clear');
              this.instance.cache.set('test', 'value');
              this.instance._dimensionChanged();
              assert.ok(spy.callCount > 0, 'Cache clear was invoked');
              spy.restore();
            });
            test('Global cache should be cleared on _cleanView', function(assert) {
              var spy = sinon.spy(this.instance.cache, 'clear');
              this.instance.cache.set('test', 'value');
              this.instance._cleanView();
              assert.ok(spy.callCount > 0, 'Cache clear was invoked');
              assert.notOk(this.instance.cache.size, 'Global cache is empty');
              spy.restore();
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
    define(["core/utils/date","core/utils/resize_callbacks","generic_light.css!","jquery","localization/date","ui/scheduler/workspaces/ui.scheduler.work_space_day","ui/scheduler/workspaces/ui.scheduler.work_space_week","ui/scheduler/workspaces/ui.scheduler.work_space_month","ui/scheduler/workspaces/ui.scheduler.timeline_day","ui/scheduler/workspaces/ui.scheduler.timeline_week","ui/scheduler/workspaces/ui.scheduler.timeline_month"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/date"), require("core/utils/resize_callbacks"), require("generic_light.css!"), require("jquery"), require("localization/date"), require("ui/scheduler/workspaces/ui.scheduler.work_space_day"), require("ui/scheduler/workspaces/ui.scheduler.work_space_week"), require("ui/scheduler/workspaces/ui.scheduler.work_space_month"), require("ui/scheduler/workspaces/ui.scheduler.timeline_day"), require("ui/scheduler/workspaces/ui.scheduler.timeline_week"), require("ui/scheduler/workspaces/ui.scheduler.timeline_month"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=workSpace.base.tests.js.map