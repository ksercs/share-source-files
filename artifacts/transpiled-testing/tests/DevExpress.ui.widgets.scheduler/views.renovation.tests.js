!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/views.renovation.tests.js"], ["generic_light.css!","jquery","../../helpers/scheduler/helpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/views.renovation.tests.js", ["generic_light.css!", "jquery", "../../helpers/scheduler/helpers.js"], function($__export) {
  "use strict";
  var $,
      createWrapper,
      initTestMarkup,
      testStart,
      module,
      test;
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, testStart = $__4.testStart, module = $__4.module, test = $__4.test, $__4));
      testStart(function() {
        return initTestMarkup();
      });
      module('Renovated Views', function() {
        ['week', 'timelineWeek'].forEach(function(currentView) {
          test(("Group panel should not disappear on current date option change in " + currentView), function(assert) {
            var scheduler = createWrapper({
              currentView: currentView,
              views: [currentView],
              groups: ['resourceId'],
              resources: [{
                fieldExpr: 'resourceId',
                dataSource: [{
                  id: 1,
                  text: '1'
                }, {
                  id: 2,
                  text: '2'
                }]
              }],
              currentDate: new Date(2021, 1, 20),
              renovateRender: true
            });
            assert.equal(scheduler.workSpace.groups.getGroupHeaders().length, 2, 'Correct number of group headers');
            scheduler.instance.option('currentDate', new Date(2022, 1, 20));
            assert.equal(scheduler.workSpace.groups.getGroupHeaders().length, 2, 'Correct number of group headers');
          });
        });
        ['week', 'timelineWeek', 'timelineMonth'].forEach(function(currentView) {
          test(("Shader should be cleaned on options change in " + currentView), function(assert) {
            var scheduler = createWrapper({
              currentView: currentView,
              views: [currentView],
              groups: ['resourceId'],
              currentDate: new Date(2020, 1, 20),
              shadeUntilCurrentTime: true,
              renovateRender: true
            });
            var shader = scheduler.workSpace.getShader();
            assert.equal(shader.length, 1, 'Shader is rendered');
            scheduler.instance.option('currentDate', new Date(2019, 1, 1));
            shader = scheduler.workSpace.getShader();
            assert.equal(shader.length, 1, 'Shader is updated');
          });
        });
        test('Virtual scrolling should be applied when renovated render is used', function(assert) {
          var scheduler = createWrapper({
            views: [{
              type: 'week',
              intervalCount: 5
            }],
            currentView: 'week',
            width: 500,
            height: 500,
            renovateRender: true
          });
          var virtualCells = scheduler.workSpace.getVirtualCells();
          assert.equal(virtualCells.length, 0, 'There are no virtual cells');
          scheduler.instance.option('scrolling', {
            mode: 'virtual',
            orientation: 'both'
          });
          virtualCells = scheduler.workSpace.getVirtualCells();
          assert.ok(virtualCells.length > 0, 'Virtual cells have been rendered');
        });
        [{
          view: 'day',
          cellCount: 1
        }, {
          view: 'week',
          cellCount: 7
        }].forEach(function($__5) {
          var $__6 = $__5,
              view = $__6.view,
              cellCount = $__6.cellCount;
          test(("It should be possible to change showAllDayPanel in runtime in " + view), function(assert) {
            var scheduler = createWrapper({
              views: [view],
              currentView: view,
              showAllDayPanel: false,
              renovateRender: true
            });
            scheduler.instance.option('showAllDayPanel', true);
            assert.equal(scheduler.workSpace.getAllDayCells().length, cellCount, 'Correct number of cells');
          });
        });
        ['timelineDay', 'timelineWeek', 'timelineMonth'].forEach(function(view) {
          test((view + "'s cells should have correct height when current date changes"), function(assert) {
            var scheduler = createWrapper({
              views: [view],
              currentView: view,
              crossScrollingEnabled: true,
              renovateRender: true,
              height: 600,
              currentDate: new Date(2020, 0, 1)
            });
            var cellHeight = scheduler.workSpace.getCellHeight();
            scheduler.option('currentDate', 2021, 0, 1);
            var cellHeightAfterCurrentDateChange = scheduler.workSpace.getCellHeight();
            assert.equal(cellHeightAfterCurrentDateChange, cellHeight, 'Correct cell hieght');
          });
        });
        [{
          groupOrientation: 'horizontal',
          groupByDate: true,
          cellCount: 7,
          testDescription: 'Header cells in timeline\'s week row should have correct texts when grouping by date is used'
        }, {
          groupOrientation: 'horizontal',
          groupByDate: false,
          cellCount: 14,
          testDescription: 'Header cells in timeline\'s week row should have correct texts when horizontal grouping is used'
        }, {
          groupOrientation: 'vertical',
          groupByDate: false,
          cellCount: 7,
          testDescription: 'Header cells in timeline\'s week row should have correct texts when vertical grouping is used'
        }].forEach(function($__5) {
          var $__6 = $__5,
              groupByDate = $__6.groupByDate,
              groupOrientation = $__6.groupOrientation,
              cellCount = $__6.cellCount,
              testDescription = $__6.testDescription;
          test(testDescription, function(assert) {
            var scheduler = createWrapper({
              height: 500,
              views: [{
                type: 'timelineWeek',
                groupOrientation: groupOrientation
              }],
              currentView: 'timelineWeek',
              currentDate: new Date(2021, 6, 21),
              startDayHour: 9,
              endDayHour: 10,
              groups: ['resourceId'],
              resources: [{
                fieldExpr: 'resourceId',
                dataSource: [{
                  id: 1,
                  text: '1'
                }, {
                  id: 2,
                  text: '2'
                }]
              }],
              groupByDate: groupByDate
            });
            var dateHeaderCells = scheduler.workSpace.getWeekDayHeaderPanelCells();
            assert.equal(dateHeaderCells.length, cellCount, 'Correct number of cells');
            var texts = ['Sun 18', 'Mon 19', 'Tue 20', 'Wed 21', 'Thu 22', 'Fri 23', 'Sat 24'];
            dateHeaderCells.each(function(index) {
              var text = texts[index % 7];
              assert.equal($(this).text(), text, 'Correct text');
            });
          });
        });
        QUnit.test('Time panel scrollable should update position if date scrollable position is changed', function(assert) {
          var done = assert.async();
          var scheduler = createWrapper({
            views: ['week'],
            currentView: 'week',
            crossScrollingEnabled: true,
            height: 400
          });
          var timePanelScrollable = scheduler.workSpace.getSideBarScrollable().dxScrollable('instance');
          var dateTableScrollable = scheduler.workSpace.getDateTableScrollable().dxScrollable('instance');
          dateTableScrollable.scrollTo({top: 100});
          setTimeout(function() {
            assert.equal(timePanelScrollable.scrollTop(), 100, 'Scroll position is OK');
            done();
          }, 100);
        });
        QUnit.test('Date table scrollable should update position if time panel position is changed', function(assert) {
          var done = assert.async();
          var scheduler = createWrapper({
            views: ['week'],
            currentView: 'week',
            crossScrollingEnabled: true,
            height: 400
          });
          var timePanelScrollable = scheduler.workSpace.getSideBarScrollable().dxScrollable('instance');
          var dateTableScrollable = scheduler.workSpace.getDateTableScrollable().dxScrollable('instance');
          timePanelScrollable.scrollTo({top: 100});
          setTimeout(function() {
            assert.equal(dateTableScrollable.scrollTop(), 100, 'Scroll position is OK');
            done();
          }, 100);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","jquery","../../helpers/scheduler/helpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("jquery"), require("../../helpers/scheduler/helpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=views.renovation.tests.js.map