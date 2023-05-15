!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/workSpace.month.tests.js"], ["core/utils/size","core/utils/resize_callbacks","generic_light.css!","jquery","ui/scheduler/workspaces/ui.scheduler.work_space_month","ui/scheduler/workspaces/helpers/positionHelper"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/workSpace.month.tests.js", ["core/utils/size", "core/utils/resize_callbacks", "generic_light.css!", "jquery", "ui/scheduler/workspaces/ui.scheduler.work_space_month", "ui/scheduler/workspaces/helpers/positionHelper"], function($__export) {
  "use strict";
  var getOuterWidth,
      getOuterHeight,
      resizeCallbacks,
      $,
      getGroupWidth,
      CELL_CLASS,
      test,
      skip,
      module,
      testStart;
  return {
    setters: [function($__m) {
      getOuterWidth = $__m.getOuterWidth;
      getOuterHeight = $__m.getOuterHeight;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      getGroupWidth = $__m.getGroupWidth;
    }],
    execute: function() {
      var $__4;
      CELL_CLASS = 'dx-scheduler-date-table-cell';
      (($__4 = QUnit, test = $__4.test, skip = $__4.skip, module = $__4.module, testStart = $__4.testStart, $__4));
      testStart(function() {
        $('#qunit-fixture').html('<div class="dx-scheduler"><div id="scheduler-work-space"></div></div>');
      });
      module('Work Space Month', function() {
        module('Default', {beforeEach: function() {
            this.instance = $('#scheduler-work-space').dxSchedulerWorkSpaceMonth({}).dxSchedulerWorkSpaceMonth('instance');
          }}, function() {
          [true, false].forEach(function(renovateRender) {
            test(("Scheduler all day panel is invisible on month view after switching showAllDayPanel option when renovateRender is " + renovateRender), function(assert) {
              this.instance.option('renovateRender', renovateRender);
              this.instance.option('showAllDayPanel', false);
              this.instance.option('showAllDayPanel', true);
              var $allDayPanel = this.instance.$element().find('.dx-scheduler-all-day-table-cell');
              assert.equal($allDayPanel.length, 0, 'allDay panel is invisible');
            });
            test(("Scheduler all day title is invisible on month view after switching showAllDayPanel option when renovateRender is " + renovateRender), function(assert) {
              this.instance.option('renovateRender', renovateRender);
              this.instance.option('showAllDayPanel', false);
              this.instance.option('showAllDayPanel', true);
              var $allDayTitle = this.instance.$element().find('.dx-scheduler-all-day-title');
              assert.equal($allDayTitle.length, 0, 'All-day title is invisible');
            });
          });
          skip('Work space should find cell coordinates by date', function(assert) {
            var $element = this.instance.$element();
            this.instance.option('firstDayOfWeek', 1);
            this.instance.option('currentDate', new Date(2015, 2, 4));
            var coords = this.instance.positionHelper.getCoordinatesByDate(new Date(2015, 2, 5, 0, 0));
            var expectedCoordinates = $element.find('.dx-scheduler-date-table tbody td').eq(10).position();
            assert.roughEqual(coords.top, Math.floor(expectedCoordinates.top), 1.001, 'Cell coordinates are right');
            assert.roughEqual(coords.left, expectedCoordinates.left, 0.01, 'Cell coordinates are right');
          });
          skip('Work space should find cell coordinates by date depend on start day hour', function(assert) {
            var $element = this.instance.$element();
            this.instance.option('currentDate', new Date(2015, 2, 4));
            this.instance.option('firstDayOfWeek', 7);
            this.instance.option('startDayHour', 5);
            var coords = this.instance.positionHelper.getCoordinatesByDate(new Date(2015, 2, 5, 6, 0));
            assert.roughEqual(coords.top, $element.find('.dx-scheduler-date-table tbody td').eq(4).position().top, 1, 'Cell coordinates are right');
            assert.roughEqual(coords.left, $element.find('.dx-scheduler-date-table tbody td').eq(4).position().left, 0.01, 'Cell coordinates are right');
          });
          skip('Work space should find cell coordinates by date depend on end day hour', function(assert) {
            var $element = this.instance.$element();
            this.instance.option('currentDate', new Date(2015, 2, 4));
            this.instance.option('firstDayOfWeek', 7);
            this.instance.option('endDayHour', 10);
            var coords = this.instance.positionHelper.getCoordinatesByDate(new Date(2015, 2, 5, 6, 0));
            assert.roughEqual(coords.top, $element.find('.dx-scheduler-date-table tbody td').eq(4).position().top, 1, 'Cell coordinates are right');
            assert.roughEqual(coords.left, $element.find('.dx-scheduler-date-table tbody td').eq(4).position().left, 0.01, 'Cell coordinates are right');
          });
          test('Get date range', function(assert) {
            this.instance.option('firstDayOfWeek', 1);
            this.instance.option('currentDate', new Date(2018, 8, 5));
            assert.deepEqual(this.instance.getDateRange(), [new Date(2018, 7, 27, 0, 0), new Date(2018, 9, 7, 23, 59)], 'Range is OK');
          });
          test('Get date range when startDayHour & endDayHour are specified', function(assert) {
            this.instance.option({
              firstDayOfWeek: 1,
              currentDate: new Date(2015, 2, 16),
              startDayHour: 8,
              endDayHour: 20
            });
            this.instance.option('currentDate', new Date(2015, 2, 16));
            assert.deepEqual(this.instance.getDateRange(), [new Date(2015, 1, 23, 8, 0), new Date(2015, 3, 5, 19, 59)], 'Range is OK');
          });
          test('Each cell should contain jQuery dxCellData depend on start day hour', function(assert) {
            this.instance.option({
              currentDate: new Date(2015, 2, 16),
              firstDayOfWeek: 1,
              startDayHour: 5,
              renovateRender: false
            });
            var $cell = this.instance.$element().find('.' + CELL_CLASS).eq(0);
            assert.deepEqual($cell.data('dxCellData'), {
              startDate: new Date(2015, 1, 23, 5, 0),
              endDate: new Date(2015, 1, 24, 0, 0),
              groupIndex: 0
            });
          });
          test('Each cell should contain jQuery dxCellData depend on end day hour', function(assert) {
            this.instance.option({
              currentDate: new Date(2015, 2, 16),
              firstDayOfWeek: 1,
              endDayHour: 10,
              renovateRender: false
            });
            var $cell = this.instance.$element().find('.' + CELL_CLASS).eq(0);
            assert.deepEqual($cell.data('dxCellData'), {
              startDate: new Date(2015, 1, 23, 0, 0),
              endDate: new Date(2015, 1, 23, 10, 0),
              groupIndex: 0
            });
          });
          test('Each cell should contain jQuery dxCellData depend on fractional hoursInterval', function(assert) {
            this.instance.option({
              currentDate: new Date(2015, 2, 16),
              firstDayOfWeek: 1,
              hoursInterval: 2.1666666666666665,
              endDayHour: 5,
              renovateRender: false
            });
            var $cell = this.instance.$element().find('.' + CELL_CLASS).eq(0);
            assert.deepEqual($cell.data('dxCellData'), {
              startDate: new Date(2015, 1, 23, 0, 0),
              endDate: new Date(2015, 1, 23, 5, 0),
              groupIndex: 0
            });
          });
          [true, false].forEach(function(renovateRender) {
            test(("WorkSpace should calculate max left position when renovateRender is " + renovateRender), function(assert) {
              this.instance.option({
                currentDate: new Date(2015, 2, 16),
                firstDayOfWeek: 1,
                renovateRender: renovateRender
              });
              var $lastCell = this.instance.$element().find('.dx-scheduler-date-table').find('td').eq(6);
              assert.equal(Math.round(this.instance.getMaxAllowedPosition()), Math.round($lastCell.position().left + getOuterWidth($lastCell)), 'Max left position is correct');
            });
            test(("Grouped work space should calculate max left position when renovateRender is " + renovateRender), function(assert) {
              var $__3 = this;
              this.instance.option({
                currentDate: new Date(2015, 2, 16),
                firstDayOfWeek: 1,
                groups: [{
                  name: 'one',
                  items: [{
                    id: 1,
                    text: 'a'
                  }, {
                    id: 2,
                    text: 'b'
                  }]
                }, {
                  name: 'two',
                  items: [{
                    id: 1,
                    text: 'c'
                  }, {
                    id: 2,
                    text: 'd'
                  }]
                }],
                renovateRender: renovateRender
              });
              var $cells = this.instance.$element().find('.dx-scheduler-date-table tr').first().find('td');
              var $firstGroupLastCell = $cells.eq(6);
              var $secondGroupLastCell = $cells.eq(13);
              var $thirdGroupLastCell = $cells.eq(20);
              var $fourthGroupLastCell = $cells.eq(27);
              var expectedResult = [$firstGroupLastCell.position().left + $firstGroupLastCell.get(0).getBoundingClientRect().width, $secondGroupLastCell.position().left + $secondGroupLastCell.get(0).getBoundingClientRect().width, $thirdGroupLastCell.position().left + $thirdGroupLastCell.get(0).getBoundingClientRect().width, $fourthGroupLastCell.position().left + $fourthGroupLastCell.get(0).getBoundingClientRect().width];
              var actualResult = [0, 1, 2, 3].map(function(groupIndex) {
                return $__3.instance.getMaxAllowedPosition(groupIndex);
              });
              assert.deepEqual(actualResult, expectedResult, 'Max left positions are correct');
            });
          });
          test('Group width calculation', function(assert) {
            this.instance.option('groups', [{
              name: 'one',
              items: [{
                id: 1,
                text: 'a'
              }]
            }]);
            this.instance.option('width', 600);
            var groupWidth = getGroupWidth(0, this.instance.viewDataProvider, {
              intervalCount: this.instance.option('intervalCount'),
              currentDate: this.instance.option('currentDate'),
              viewType: this.instance.type,
              hoursInterval: this.instance.option('hoursInterval'),
              startDayHour: this.instance.option('startDayHour'),
              endDayHour: this.instance.option('endDayHour'),
              isVirtualScrolling: this.instance.isVirtualScrolling(),
              rtlEnabled: this.instance.option('rtlEnabled'),
              DOMMetaData: this.instance.getDOMElementsMetaData()
            });
            assert.roughEqual(groupWidth, 597, 1.01, 'Group width is OK');
          });
          test('Get cell count to last view dates', function(assert) {
            this.instance.option('renovateRender', false);
            this.instance.option({
              currentDate: new Date(2016, 2, 14, 0, 0),
              startDayHour: 5,
              firstDayOfWeek: 1
            });
            var $cell = this.instance._getCells().eq(14);
            assert.deepEqual($cell.data('dxCellData'), {
              startDate: new Date(2016, 2, 14, 5, 0),
              endDate: new Date(2016, 2, 15, 0, 0),
              groupIndex: 0
            }, 'data of the cell is right');
          });
          test('Cells have right cellData in horizontal grouped WorkSpace Month view', function(assert) {
            this.instance.option({
              currentDate: new Date(2018, 2, 1),
              groupOrientation: 'vertical',
              groups: [{
                name: 'one',
                items: [{
                  id: 1,
                  text: 'a'
                }, {
                  id: 2,
                  text: 'b'
                }]
              }],
              renovateRender: false
            });
            var firstCellData = this.instance.$element().find('.dx-scheduler-date-table-cell').eq(0).data('dxCellData');
            var secondCellData = this.instance.$element().find('.dx-scheduler-date-table-cell').eq(51).data('dxCellData');
            assert.deepEqual(firstCellData.startDate, new Date(2018, 1, 25, 0), 'cell has right startDate');
            assert.deepEqual(firstCellData.endDate, new Date(2018, 1, 26, 0), 'cell has right endtDate');
            assert.deepEqual(secondCellData.startDate, new Date(2018, 2, 6, 0), 'cell has right startDate');
            assert.deepEqual(secondCellData.endDate, new Date(2018, 2, 7, 0), 'cell has right endtDate');
          });
        });
        skip('it with grouping by date', {beforeEach: function() {
            this.instance = $('#scheduler-work-space').dxSchedulerWorkSpaceMonth({
              currentDate: new Date(2018, 2, 1),
              groupByDate: true,
              showCurrentTimeIndicator: false,
              groups: [{
                name: 'one',
                items: [{
                  id: 1,
                  text: 'a'
                }, {
                  id: 2,
                  text: 'b'
                }]
              }]
            }).dxSchedulerWorkSpaceMonth('instance');
          }}, function() {
          test('Work space should find cell coordinates by date, groupByDate = true', function(assert) {
            var $element = this.instance.$element();
            this.instance.option('currentDate', new Date(2015, 2, 4));
            var coords = this.instance.positionHelper.getCoordinatesByDate(new Date(2015, 2, 4), 1, false);
            assert.roughEqual(coords.top, $element.find('.dx-scheduler-date-table tbody td').eq(7).position().top, 1.1, 'Top cell coordinates are right');
            assert.roughEqual(coords.left, $element.find('.dx-scheduler-date-table tbody td').eq(7).position().left, 1.1, 'Left cell coordinates are right');
            assert.roughEqual(coords.hMax, 998, 1.1, 'hMax is right');
            coords = this.instance.positionHelper.getCoordinatesByDate(new Date(2015, 2, 21), 0, false);
            assert.roughEqual(coords.top, $element.find('.dx-scheduler-date-table tbody td').eq(40).position().top, 1.1, 'Top cell coordinates are right');
            assert.roughEqual(coords.left, $element.find('.dx-scheduler-date-table tbody td').eq(40).position().left, 1.1, 'Left cell coordinates are right');
            assert.roughEqual(coords.hMax, 998, 1.1, 'hMax is right');
          });
        });
        module('it with horizontal grouping', {beforeEach: function() {
            this.instance = $('#scheduler-work-space').dxSchedulerWorkSpaceMonth({
              currentDate: new Date(2018, 2, 1),
              groupOrientation: 'vertical',
              crossScrollingEnabled: true,
              groups: [{
                name: 'one',
                items: [{
                  id: 1,
                  text: 'a'
                }, {
                  id: 2,
                  text: 'b'
                }]
              }]
            }).dxSchedulerWorkSpaceMonth('instance');
          }}, function() {
          test('Group table content should have right height', function(assert) {
            var $groupHeaderContents = this.instance.$element().find('.dx-scheduler-group-header');
            resizeCallbacks.fire();
            assert.roughEqual(getOuterHeight($groupHeaderContents.eq(0)), 449, 5, 'Group header content height is OK');
            assert.roughEqual(getOuterHeight($groupHeaderContents.eq(1)), 449, 5, 'Group header content height is OK');
          });
          test('Group width calculation', function(assert) {
            this.instance.option('groups', [{
              name: 'one',
              items: [{
                id: 1,
                text: 'a'
              }]
            }]);
            this.instance.option('width', 600);
            var groupWidth = getGroupWidth(0, this.instance.viewDataProvider, {
              intervalCount: this.instance.option('intervalCount'),
              currentDate: this.instance.option('currentDate'),
              viewType: this.instance.type,
              hoursInterval: this.instance.option('hoursInterval'),
              startDayHour: this.instance.option('startDayHour'),
              endDayHour: this.instance.option('endDayHour'),
              isVirtualScrolling: this.instance.isVirtualScrolling(),
              rtlEnabled: this.instance.option('rtlEnabled'),
              DOMMetaData: this.instance.getDOMElementsMetaData()
            });
            assert.equal(groupWidth, 525, 'Group width is OK');
          });
          test('Tables should not be rerendered if dimension was changed and horizontal scrolling is disabled', function(assert) {
            this.instance.option('crossScrollingEnabled', false);
            var stub = sinon.stub(this.instance, '_setTableSizes');
            resizeCallbacks.fire();
            assert.notOk(stub.calledOnce, 'Tables weren\'t updated');
          });
        });
        module('it with intervalCount', {beforeEach: function() {
            this.createInstance = function(options) {
              this.instance = $('#scheduler-work-space').dxSchedulerWorkSpaceMonth(options).dxSchedulerWorkSpaceMonth('instance');
            };
          }}, function() {
          test('WorkSpace Month view cells have right cellData with view option intervalCount & startDate < currentDate', function(assert) {
            this.createInstance({
              intervalCount: 3,
              currentDate: new Date(2017, 4, 25),
              startDate: new Date(2017, 0, 15),
              renovateRender: false
            });
            var firstCellData = this.instance.$element().find('.dx-scheduler-date-table-cell').eq(0).data('dxCellData');
            var secondCellData = this.instance.$element().find('.dx-scheduler-date-table-cell').eq(35).data('dxCellData');
            var thirdCellData = this.instance.$element().find('.dx-scheduler-date-table-cell').last().data('dxCellData');
            assert.deepEqual(firstCellData.startDate, new Date(2017, 2, 26, 0), 'cell has right startDate');
            assert.deepEqual(firstCellData.endDate, new Date(2017, 2, 27, 0), 'cell has right endtDate');
            assert.deepEqual(secondCellData.startDate, new Date(2017, 3, 30, 0), 'cell has right startDate');
            assert.deepEqual(secondCellData.endDate, new Date(2017, 4, 1, 0), 'cell has right endtDate');
            assert.deepEqual(thirdCellData.startDate, new Date(2017, 6, 1, 0), 'cell has right startDate');
            assert.deepEqual(thirdCellData.endDate, new Date(2017, 6, 2, 0), 'cell has right endtDate');
          });
          test('WorkSpace Month view cells have right cellData with view option intervalCount & startDate > currentDate', function(assert) {
            this.createInstance({
              intervalCount: 3,
              currentDate: new Date(2017, 1, 15),
              startDate: new Date(2017, 5, 15),
              renovateRender: false
            });
            var firstCellData = this.instance.$element().find('.dx-scheduler-date-table-cell').eq(0).data('dxCellData');
            var secondCellData = this.instance.$element().find('.dx-scheduler-date-table-cell').eq(35).data('dxCellData');
            var thirdCellData = this.instance.$element().find('.dx-scheduler-date-table-cell').last().data('dxCellData');
            assert.deepEqual(firstCellData.startDate, new Date(2016, 10, 27, 0), 'cell has right startDate');
            assert.deepEqual(firstCellData.endDate, new Date(2016, 10, 28, 0), 'cell has right endtDate');
            assert.deepEqual(secondCellData.startDate, new Date(2017, 0, 1, 0), 'cell has right startDate');
            assert.deepEqual(secondCellData.endDate, new Date(2017, 0, 2, 0), 'cell has right endtDate');
            assert.deepEqual(thirdCellData.startDate, new Date(2017, 2, 4, 0), 'cell has right startDate');
            assert.deepEqual(thirdCellData.endDate, new Date(2017, 2, 5, 0), 'cell has right endtDate');
          });
          test('WorkSpace Month view cells have right cellData with view option intervalCount & startDate = currentDate', function(assert) {
            this.createInstance({
              intervalCount: 3,
              currentDate: new Date(2017, 6, 15),
              startDate: new Date(2017, 5, 15),
              renovateRender: false
            });
            var firstCellData = this.instance.$element().find('.dx-scheduler-date-table-cell').eq(0).data('dxCellData');
            var secondCellData = this.instance.$element().find('.dx-scheduler-date-table-cell').eq(35).data('dxCellData');
            var thirdCellData = this.instance.$element().find('.dx-scheduler-date-table-cell').last().data('dxCellData');
            assert.deepEqual(firstCellData.startDate, new Date(2017, 4, 28, 0), 'cell has right startDate');
            assert.deepEqual(firstCellData.endDate, new Date(2017, 4, 29, 0), 'cell has right endtDate');
            assert.deepEqual(secondCellData.startDate, new Date(2017, 6, 2, 0), 'cell has right startDate');
            assert.deepEqual(secondCellData.endDate, new Date(2017, 6, 3, 0), 'cell has right endtDate');
            assert.deepEqual(thirdCellData.startDate, new Date(2017, 8, 2, 0), 'cell has right startDate');
            assert.deepEqual(thirdCellData.endDate, new Date(2017, 8, 3, 0), 'cell has right endtDate');
          });
          test('Get date range', function(assert) {
            this.createInstance({
              intervalCount: 3,
              currentDate: new Date(2017, 5, 26)
            });
            assert.deepEqual(this.instance.getDateRange(), [new Date(2017, 4, 28, 0, 0), new Date(2017, 8, 2, 23, 59)], 'Range is OK');
            this.instance.option('intervalCount', 4);
            assert.deepEqual(this.instance.getDateRange(), [new Date(2017, 4, 28, 0, 0), new Date(2017, 8, 30, 23, 59)], 'Range is OK');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","core/utils/resize_callbacks","generic_light.css!","jquery","ui/scheduler/workspaces/ui.scheduler.work_space_month","ui/scheduler/workspaces/helpers/positionHelper"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("core/utils/resize_callbacks"), require("generic_light.css!"), require("jquery"), require("ui/scheduler/workspaces/ui.scheduler.work_space_month"), require("ui/scheduler/workspaces/helpers/positionHelper"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=workSpace.month.tests.js.map