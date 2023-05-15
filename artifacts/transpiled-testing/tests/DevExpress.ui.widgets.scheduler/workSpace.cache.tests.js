!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/workSpace.cache.tests.js"], ["core/utils/resize_callbacks","generic_light.css!","jquery","ui/scheduler/workspaces/ui.scheduler.work_space_week"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/workSpace.cache.tests.js", ["core/utils/resize_callbacks", "generic_light.css!", "jquery", "ui/scheduler/workspaces/ui.scheduler.work_space_week"], function($__export) {
  "use strict";
  var resizeCallbacks,
      $,
      test,
      module,
      testStart;
  return {
    setters: [function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {}],
    execute: function() {
      var $__3;
      (($__3 = QUnit, test = $__3.test, module = $__3.module, testStart = $__3.testStart, $__3));
      testStart(function() {
        $('#qunit-fixture').html('<div class="dx-scheduler"><div id="scheduler-work-space"></div></div>');
      });
      module('Work Space cellData Cache', {beforeEach: function() {
          this.instance = $('#scheduler-work-space').dxSchedulerWorkSpaceWeek({}).dxSchedulerWorkSpaceWeek('instance');
        }}, function() {
        test('Workspace should be able to cache cellData', function(assert) {
          var cache;
          var $cell = {
            startDate: 2015,
            endDate: 2016
          };
          var getCellDataStub = sinon.stub(this.instance, 'getCellData').returns($cell);
          var cellCoordinates = {
            rowIndex: 1,
            columnIndex: 0
          };
          try {
            this.instance.setCellDataCache(cellCoordinates, 0, $cell);
            cache = this.instance.cache;
            assert.deepEqual(cache.get('{"rowIndex":1,"columnIndex":0,"groupIndex":0}'), {
              startDate: 2015,
              endDate: 2016
            }, 'Cache is OK');
          } finally {
            getCellDataStub.restore();
          }
        });
        test('CellData cache set correct alias', function(assert) {
          var $cell = {
            startDate: 2015,
            endDate: 2016
          };
          var getCellDataStub = sinon.stub(this.instance, 'getCellData').returns($cell);
          try {
            var appointment = {
              rowIndex: 1,
              columnIndex: 0,
              groupIndex: 0
            };
            var geometry = {
              top: 10,
              left: 10
            };
            var aliasKey = JSON.stringify({
              top: geometry.top,
              left: geometry.left
            });
            this.instance.setCellDataCache(appointment, 0, $cell);
            this.instance.setCellDataCacheAlias(appointment, geometry);
            var cacheData = this.instance.cache.get(aliasKey);
            assert.deepEqual(cacheData, {
              'endDate': 2016,
              'startDate': 2015
            }, 'Cache Data Alias is OK');
          } finally {
            getCellDataStub.restore();
          }
        });
        test('getCellDataByCoordinates return cached cell data', function(assert) {
          var appointment = {
            rowIndex: 1,
            columnIndex: 0,
            groupIndex: 0
          };
          var geometry = {
            top: 10,
            left: 10
          };
          var aliasKey = JSON.stringify({
            top: geometry.top,
            left: geometry.left
          });
          var $cell = {
            startDate: 2015,
            endDate: 2016
          };
          var getCellDataStub = sinon.stub(this.instance, 'getCellData').returns($cell);
          var aliasCellCache = sinon.spy(this.instance.cache, 'get').withArgs(aliasKey);
          try {
            this.instance.setCellDataCache(appointment, 0, $cell);
            this.instance.setCellDataCacheAlias(appointment, geometry);
            var cellData = this.instance.getCellDataByCoordinates({
              top: 10,
              left: 10
            });
            assert.ok(getCellDataStub.calledOnce, 'getCellData called once');
            assert.ok(aliasCellCache.calledOnce, 'getCellDataByCoordinates called aliasCellCache once');
            assert.deepEqual(aliasCellCache.getCall(0).returnValue, {
              'endDate': 2016,
              'startDate': 2015
            }, 'aliasCellCache return correct cellData object');
            assert.deepEqual(cellData, {
              'endDate': 2016,
              'startDate': 2015
            }, 'getCellDataByCoordinates returns correct cellData object');
          } finally {
            getCellDataStub.restore();
          }
        });
        test('Work space should return correct cell data if option changed (cleanCellDataCache)', function(assert) {
          var workSpace = this.instance;
          var $element = this.instance.$element();
          var appointment = {
            columnIndex: 0,
            rowIndex: 0,
            groupIndex: 0
          };
          var geometry = {
            top: 10,
            left: 20
          };
          var testDataList = [{
            optionName: 'currentDate',
            optionValue: new Date(2016, 4, 12),
            cellDataCompare: {
              allDay: false,
              startDate: new Date(2016, 4, 8),
              endDate: new Date(2016, 4, 8, 0, 30),
              groupIndex: 0
            }
          }, {
            optionName: 'hoursInterval',
            optionValue: 0.3,
            cellDataCompare: {
              allDay: false,
              startDate: new Date(2016, 4, 8),
              endDate: new Date(2016, 4, 8, 0, 18),
              groupIndex: 0
            }
          }, {
            optionName: 'firstDayOfWeek',
            optionValue: 3,
            cellDataCompare: {
              allDay: false,
              startDate: new Date(2016, 4, 11),
              endDate: new Date(2016, 4, 11, 0, 18, 0),
              groupIndex: 0
            }
          }, {
            optionName: 'groups',
            optionValue: [{
              name: 'one',
              items: [{
                id: 1,
                text: 'a'
              }, {
                id: 2,
                text: 'b'
              }]
            }],
            cellDataCompare: {
              allDay: false,
              startDate: new Date(2016, 4, 11),
              endDate: new Date(2016, 4, 11, 0, 18, 0),
              groups: {one: 1},
              groupIndex: 0
            }
          }, {
            optionName: 'startDayHour',
            optionValue: 2,
            cellDataCompare: {
              allDay: false,
              startDate: new Date(2016, 4, 11, 2),
              endDate: new Date(2016, 4, 11, 2, 18, 0),
              groups: {one: 1},
              groupIndex: 0
            }
          }, {
            optionName: 'endDayHour',
            optionValue: 23,
            cellDataCompare: {
              allDay: false,
              startDate: new Date(2016, 4, 11, 2),
              endDate: new Date(2016, 4, 11, 2, 18),
              groups: {one: 1},
              groupIndex: 0
            }
          }];
          workSpace.option('currentDate', new Date(2016, 3, 12));
          testDataList.forEach(function(testData) {
            var $firstCell = $element.find('.dx-scheduler-date-table-cell').first();
            workSpace.setCellDataCache(appointment, 0, $firstCell);
            workSpace.setCellDataCacheAlias(appointment, geometry);
            workSpace.option(testData.optionName, testData.optionValue);
            assert.ok($.isEmptyObject(workSpace.cache.size), ("Cell data cache was cleared after " + testData.optionName + " option changing"));
            var cellData = workSpace.getCellDataByCoordinates(geometry);
            assert.deepEqual(cellData, testData.cellDataCompare, ("Cell data cache was cleared after " + testData.optionName + " option changing"));
          });
        });
        test('Cell data cache should be cleared when dimensions were changed', function(assert) {
          var workSpace = this.instance;
          var $element = this.instance.$element();
          var appointment = {
            columnIndex: 0,
            rowIndex: 0,
            groupIndex: 0
          };
          var geometry = {
            top: 10,
            left: 120
          };
          var $firstCell = $element.find('.dx-scheduler-date-table-cell').first();
          workSpace.setCellDataCache(appointment, 0, $firstCell);
          workSpace.setCellDataCacheAlias(appointment, geometry);
          resizeCallbacks.fire();
          var cache = workSpace.cache;
          assert.equal(cache.size, 1, 'Cache has no cell data');
          assert.ok(cache.get('cellElementsMeta'), 'Has cached cell sizes');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/resize_callbacks","generic_light.css!","jquery","ui/scheduler/workspaces/ui.scheduler.work_space_week"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/resize_callbacks"), require("generic_light.css!"), require("jquery"), require("ui/scheduler/workspaces/ui.scheduler.work_space_week"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=workSpace.cache.tests.js.map