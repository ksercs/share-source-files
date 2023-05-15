!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/workSpaceWithHorizontalScroll.tests.js"], ["core/utils/size","core/devices","events/visibility_change","generic_light.css!","jquery","ui/scheduler/ui.scheduler"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/workSpaceWithHorizontalScroll.tests.js", ["core/utils/size", "core/devices", "events/visibility_change", "generic_light.css!", "jquery", "ui/scheduler/ui.scheduler"], function($__export) {
  "use strict";
  var getOuterWidth,
      devices,
      triggerHidingEvent,
      triggerResizeEvent,
      triggerShownEvent,
      $;
  return {
    setters: [function($__m) {
      getOuterWidth = $__m.getOuterWidth;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      triggerHidingEvent = $__m.triggerHidingEvent;
      triggerResizeEvent = $__m.triggerResizeEvent;
      triggerShownEvent = $__m.triggerShownEvent;
    }, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        $('#qunit-fixture').html('<div class="dx-scheduler"><div id="scheduler-work-space"></div></div>');
      });
      QUnit.module('Vertical Workspace with horizontal scrollbar', {beforeEach: function() {
          this.instance = $('#scheduler-work-space').dxSchedulerWorkSpaceWeek({
            crossScrollingEnabled: true,
            width: 100
          }).dxSchedulerWorkSpaceWeek('instance');
        }}, function() {
        QUnit.test('Header scrollable should contain header panel, all-day container and all-day panel', function(assert) {
          triggerResizeEvent(this.instance.$element());
          var headerScrollable = this.instance.$element().find('.dx-scheduler-header-scrollable').dxScrollable('instance');
          var scrollableContent = headerScrollable.$content();
          assert.equal(scrollableContent.find('.dx-scheduler-header-panel').length, 1, 'Header panel exists');
          assert.equal(scrollableContent.find('.dx-scheduler-all-day-appointments').length, 1, 'All-day container exists');
          assert.equal(scrollableContent.find('.dx-scheduler-all-day-panel').length, 1, 'All-day panel exists');
        });
        QUnit.test('Date table scrollable should contain date table', function(assert) {
          triggerResizeEvent(this.instance.$element());
          var dateTableScrollable = this.instance.$element().find('.dx-scheduler-date-table-scrollable').dxScrollable('instance');
          var scrollableContent = dateTableScrollable.$content();
          assert.equal(scrollableContent.find('.dx-scheduler-date-table').length, 1, 'Date table exists');
        });
        QUnit.test('Date table scrollable should have right config', function(assert) {
          var dateTableScrollable = this.instance.$element().find('.dx-scheduler-date-table-scrollable').dxScrollable('instance');
          var device = devices.current();
          var expectedShowScrollbarOption = 'onHover';
          if (device.phone || device.tablet) {
            expectedShowScrollbarOption = 'onScroll';
          }
          assert.equal(dateTableScrollable.option('direction'), 'both', 'Direction is OK');
          assert.equal(dateTableScrollable.option('showScrollbar'), expectedShowScrollbarOption, 'showScrollbar is OK');
          assert.strictEqual(dateTableScrollable.option('bounceEnabled'), false, 'bounceEnabled is OK');
          assert.strictEqual(dateTableScrollable.option('updateManually'), true, 'updateManually is OK');
        });
        QUnit.test('Header scrollable should update position if date scrollable position is changed', function(assert) {
          var done = assert.async();
          var $element = this.instance.$element();
          var $cells = $element.find('.dx-scheduler-date-table-cell');
          $cells.get(0).style.width = '100px';
          this.instance.option('width', 500);
          var headerScrollable = $element.find('.dx-scheduler-header-scrollable').dxScrollable('instance');
          var dateTableScrollable = $element.find('.dx-scheduler-date-table-scrollable').dxScrollable('instance');
          triggerHidingEvent($element);
          triggerShownEvent($element);
          dateTableScrollable.scrollTo({left: 100});
          setTimeout(function() {
            assert.equal(headerScrollable.scrollLeft(), 100, 'Scroll position is OK');
            done();
          });
        });
        QUnit.test('Date table scrollable should update position if header scrollable position is changed', function(assert) {
          var $element = this.instance.$element();
          var $cells = $element.find('.dx-scheduler-date-table-cell');
          $cells.get(0).style.width = '100px';
          this.instance.option('width', 500);
          var headerScrollable = $element.find('.dx-scheduler-header-scrollable').dxScrollable('instance');
          var dateTableScrollable = $element.find('.dx-scheduler-date-table-scrollable').dxScrollable('instance');
          triggerHidingEvent($element);
          triggerShownEvent($element);
          headerScrollable.scrollTo({left: 100});
          assert.equal(dateTableScrollable.scrollLeft(), 100, 'Scroll position is OK');
        });
        QUnit.test('the \'getCellIndexByCoordinates\' method should return a right result', function(assert) {
          this.instance.option('width', 500);
          var $element = this.instance.$element();
          triggerHidingEvent($element);
          triggerShownEvent($element);
          var index = this.instance.getCellIndexByCoordinates({
            left: 85,
            top: 55
          });
          assert.equal(index, 8, 'Index is OK');
        });
        QUnit.test('Header panel, all-day panel, date table should have a correct width', function(assert) {
          this.instance.option('width', 400);
          var $element = this.instance.$element();
          triggerHidingEvent($element);
          triggerShownEvent($element);
          var headerPanelWidth = getOuterWidth($element.find('.dx-scheduler-header-panel'));
          var allDayTableWidth = getOuterWidth($element.find('.dx-scheduler-all-day-table'));
          var dateTableWidth = getOuterWidth($element.find('.dx-scheduler-date-table'));
          assert.equal(headerPanelWidth, 525, 'Width is OK');
          assert.equal(allDayTableWidth, 525, 'Width is OK');
          assert.equal(dateTableWidth, 525, 'Width is OK');
        });
        QUnit.test('Header panel, all-day panel, date table should have a correct width if cell is larger than 75px', function(assert) {
          var $element = this.instance.$element();
          var $cells = $element.find('.dx-scheduler-date-table-cell');
          $cells.get(0).style.width = '300px';
          triggerHidingEvent($element);
          triggerShownEvent($element);
          var headerPanelWidth = getOuterWidth($element.find('.dx-scheduler-header-panel'));
          var allDayTableWidth = getOuterWidth($element.find('.dx-scheduler-all-day-table'));
          var dateTableWidth = getOuterWidth($element.find('.dx-scheduler-date-table'));
          assert.equal(headerPanelWidth, 2100, 'Width is OK');
          assert.equal(allDayTableWidth, 2100, 'Width is OK');
          assert.equal(dateTableWidth, 2100, 'Width is OK');
        });
        QUnit.test('Header panel, all-day panel, date table should always take all work space width', function(assert) {
          var $element = this.instance.$element();
          this.instance.option('width', 1000);
          this.instance.option('width', 600);
          triggerHidingEvent($element);
          triggerShownEvent($element);
          var headerPanelWidth = getOuterWidth($element.find('.dx-scheduler-header-panel'));
          var allDayTableWidth = getOuterWidth($element.find('.dx-scheduler-all-day-table'));
          var dateTableWidth = getOuterWidth($element.find('.dx-scheduler-date-table'));
          assert.roughEqual(headerPanelWidth, 896, 5, 'Width of the header panel is OK');
          assert.roughEqual(allDayTableWidth, 896, 5, 'Width of the allDay table is OK');
          assert.roughEqual(dateTableWidth, 896, 5, 'Width of the date table is OK');
        });
        QUnit.test('Workspace tables width should not be less than element width', function(assert) {
          var $element = this.instance.$element();
          $element.css('width', 1000);
          sinon.stub(this.instance, '_getWorkSpaceWidth').returns(50);
          triggerHidingEvent($element);
          triggerShownEvent($element);
          var headerPanelWidth = getOuterWidth($element.find('.dx-scheduler-header-panel'));
          var allDayTableWidth = getOuterWidth($element.find('.dx-scheduler-all-day-table'));
          var dateTableWidth = getOuterWidth($element.find('.dx-scheduler-date-table'));
          var expectedWidth = 1000 - this.instance.getTimePanelWidth();
          assert.equal(headerPanelWidth, expectedWidth, 'Width is OK');
          assert.equal(allDayTableWidth, expectedWidth, 'Width is OK');
          assert.equal(dateTableWidth, expectedWidth, 'Width is OK');
        });
      });
      QUnit.module('Vertical Workspace with horizontal scrollbar, groupOrientation = vertical', {beforeEach: function() {
          this.instance = $('#scheduler-work-space').dxSchedulerWorkSpaceWeek({
            groupOrientation: 'vertical',
            crossScrollingEnabled: true,
            startDayHour: 8,
            showAllDayPanel: true,
            endDayHour: 20,
            groups: [{
              name: 'a',
              items: [{
                id: 1,
                text: 'a.1'
              }, {
                id: 2,
                text: 'a.2'
              }]
            }]
          }).dxSchedulerWorkSpaceWeek('instance');
        }}, function() {
        QUnit.test('Header scrollable should contain header panel, groupOrientation = vertical', function(assert) {
          triggerResizeEvent(this.instance.$element());
          var headerScrollable = this.instance.$element().find('.dx-scheduler-header-scrollable').dxScrollable('instance');
          var scrollableContent = headerScrollable.$content();
          assert.equal(scrollableContent.find('.dx-scheduler-header-panel').length, 1, 'Header panel exists');
        });
        QUnit.test('Date table scrollable should contain date table, all-day container and all-day tables, groupOrientation = vertical', function(assert) {
          triggerResizeEvent(this.instance.$element());
          var dateTableScrollable = this.instance.$element().find('.dx-scheduler-date-table-scrollable').dxScrollable('instance');
          var scrollableContent = dateTableScrollable.$content();
          assert.equal(scrollableContent.find('.dx-scheduler-date-table').length, 1, 'Date table exists');
          assert.equal(scrollableContent.find('.dx-scheduler-all-day-appointments').length, 1, 'All-day container exists');
          assert.equal(scrollableContent.find('.dx-scheduler-date-table').length, 1, 'All-day panel exists');
        });
        QUnit.test('SideBar scrollable should contain timePanel and groupTable, groupOrientation = vertical', function(assert) {
          triggerResizeEvent(this.instance.$element());
          var sidebarScrollable = this.instance.$element().find('.dx-scheduler-sidebar-scrollable').dxScrollable('instance');
          var scrollableContent = sidebarScrollable.$content();
          assert.equal(scrollableContent.find('.dx-scheduler-time-panel').length, 1, 'Time panel exists');
          assert.equal(scrollableContent.find('.dx-scheduler-work-space-vertical-group-table').length, 1, 'Group table exists');
        });
        QUnit.test('the \'getCellIndexByCoordinates\' method should return a right result, groupOrientation = vertical', function(assert) {
          var $element = this.instance.$element();
          triggerHidingEvent($element);
          triggerShownEvent($element);
          var index = this.instance.getCellIndexByCoordinates({
            left: 85,
            top: 55
          });
          assert.equal(index, 7, 'Index is OK');
        });
        QUnit.test('Header panel and date table should have a correct width, groupOrientation = vertical', function(assert) {
          var $element = this.instance.$element();
          triggerHidingEvent($element);
          triggerShownEvent($element);
          var headerPanelWidth = getOuterWidth($element.find('.dx-scheduler-header-panel'), true);
          var dateTableWidth = getOuterWidth($element.find('.dx-scheduler-date-table'), true);
          assert.roughEqual(headerPanelWidth, 797, 1.01, 'Width is OK');
          assert.roughEqual(dateTableWidth, 797, 1.01, 'Width is OK');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","core/devices","events/visibility_change","generic_light.css!","jquery","ui/scheduler/ui.scheduler"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("core/devices"), require("events/visibility_change"), require("generic_light.css!"), require("jquery"), require("ui/scheduler/ui.scheduler"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=workSpaceWithHorizontalScroll.tests.js.map