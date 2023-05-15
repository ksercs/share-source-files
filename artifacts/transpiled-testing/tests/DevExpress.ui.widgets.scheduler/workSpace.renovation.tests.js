!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/workSpace.renovation.tests.js"], ["core/utils/size","core/utils/common","generic_light.css!","jquery","../../helpers/scheduler/helpers.js","ui/scheduler/workspaces/ui.scheduler.work_space_day","ui/scheduler/workspaces/ui.scheduler.work_space_month","ui/scheduler/workspaces/ui.scheduler.work_space_week","ui/scheduler/workspaces/ui.scheduler.timeline_day","ui/scheduler/workspaces/ui.scheduler.timeline_month","ui/scheduler/workspaces/ui.scheduler.timeline_week","../../helpers/keyboardMock.js","core/utils/extend"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/workSpace.renovation.tests.js", ["core/utils/size", "core/utils/common", "generic_light.css!", "jquery", "../../helpers/scheduler/helpers.js", "ui/scheduler/workspaces/ui.scheduler.work_space_day", "ui/scheduler/workspaces/ui.scheduler.work_space_month", "ui/scheduler/workspaces/ui.scheduler.work_space_week", "ui/scheduler/workspaces/ui.scheduler.timeline_day", "ui/scheduler/workspaces/ui.scheduler.timeline_month", "ui/scheduler/workspaces/ui.scheduler.timeline_week", "../../helpers/keyboardMock.js", "core/utils/extend"], function($__export) {
  "use strict";
  var getOuterWidth,
      noop,
      $,
      supportedScrollingModes,
      keyboardMock,
      extend,
      CELL_CLASS,
      DATE_TABLE_CLASS,
      WORKSPACE_DAY,
      WORKSPACE_WEEK,
      WORKSPACE_MONTH,
      TIMELINE_DAY,
      TIMELINE_WEEK,
      TIMELINE_MONTH,
      test,
      module,
      testStart;
  return {
    setters: [function($__m) {
      getOuterWidth = $__m.getOuterWidth;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      supportedScrollingModes = $__m.supportedScrollingModes;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      extend = $__m.extend;
    }],
    execute: function() {
      var $__4;
      CELL_CLASS = 'dx-scheduler-date-table-cell';
      DATE_TABLE_CLASS = 'dx-scheduler-date-table';
      WORKSPACE_DAY = {
        class: 'dxSchedulerWorkSpaceDay',
        name: 'Day View'
      };
      WORKSPACE_WEEK = {
        class: 'dxSchedulerWorkSpaceWeek',
        name: 'Week View'
      };
      WORKSPACE_MONTH = {
        class: 'dxSchedulerWorkSpaceMonth',
        name: 'Month View'
      };
      TIMELINE_DAY = {
        class: 'dxSchedulerTimelineDay',
        name: 'Timeline Day View'
      };
      TIMELINE_WEEK = {
        class: 'dxSchedulerTimelineWeek',
        name: 'Timeline Week View'
      };
      TIMELINE_MONTH = {
        class: 'dxSchedulerTimelineMonth',
        name: 'Timeline Month View'
      };
      QUnit.dump.maxDepth = 10;
      (($__4 = QUnit, test = $__4.test, module = $__4.module, testStart = $__4.testStart, $__4));
      testStart(function() {
        $('#qunit-fixture').html('<div class="dx-scheduler"><div id="scheduler-work-space"></div></div>');
      });
      module('Renovated Render', {
        before: function() {
          this.qUnitMaxDepth = QUnit.dump.maxDepth;
          QUnit.dump.maxDepth = 10;
        },
        beforeEach: function() {
          var $__3 = this;
          this.createInstance = function() {
            var options = arguments[0] !== (void 0) ? arguments[0] : {};
            var workSpace = arguments[1] !== (void 0) ? arguments[1] : 'dxSchedulerWorkSpaceDay';
            $__3.instance = $('#scheduler-work-space')[workSpace](extend({
              renovateRender: true,
              currentDate: new Date(2020, 6, 29),
              startDayHour: 0,
              endDayHour: 1,
              focusStateEnabled: true,
              onContentReady: function(e) {
                var scrollable = e.component.getScrollable();
                scrollable.option('scrollByContent', false);
                e.component._attachTablesEvents();
              }
            }, options))[workSpace]('instance');
          };
        },
        after: function() {
          QUnit.dump.maxDepth = this.qUnitMaxDepth;
        }
      }, function() {
        module('Generate View Data', function() {
          module('Standard Scrolling', function() {
            test('should work in basic case', function(assert) {
              this.createInstance();
              this.instance.viewDataProvider.update(this.instance.generateRenderOptions());
              var $__5 = this.instance.viewDataProvider,
                  viewData = $__5.viewData,
                  viewDataMap = $__5.viewDataMap;
              var expectedViewData = {
                groupedData: [{
                  allDayPanel: [{
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    groupIndex: 0,
                    index: 0,
                    allDay: true,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 0
                  }],
                  dateTable: [{
                    cells: [{
                      startDate: new Date(2020, 6, 29, 0, 0),
                      endDate: new Date(2020, 6, 29, 0, 30),
                      allDay: false,
                      groupIndex: 0,
                      index: 0,
                      isFirstGroupCell: true,
                      isLastGroupCell: true,
                      key: 0
                    }],
                    key: 0
                  }, {
                    cells: [{
                      startDate: new Date(2020, 6, 29, 0, 30),
                      endDate: new Date(2020, 6, 29, 1, 0),
                      groupIndex: 0,
                      index: 1,
                      allDay: false,
                      isFirstGroupCell: true,
                      isLastGroupCell: true,
                      key: 1
                    }],
                    key: 1
                  }],
                  groupIndex: 0,
                  key: '0',
                  isGroupedAllDayPanel: false
                }],
                bottomVirtualRowHeight: undefined,
                isGroupedAllDayPanel: false,
                topVirtualRowHeight: undefined,
                leftVirtualCellWidth: undefined,
                rightVirtualCellWidth: undefined,
                bottomVirtualRowCount: 0,
                topVirtualRowCount: 0,
                leftVirtualCellCount: 0,
                rightVirtualCellCount: 0
              };
              var expectedViewDataMap = {
                allDayPanelMap: [{
                  cellData: {
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    allDay: true,
                    groupIndex: 0,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 0
                  },
                  position: {
                    columnIndex: 0,
                    rowIndex: 0
                  }
                }],
                dateTableMap: [[{
                  cellData: {
                    startDate: new Date(2020, 6, 29, 0, 0),
                    endDate: new Date(2020, 6, 29, 0, 30),
                    allDay: false,
                    groupIndex: 0,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 0
                  },
                  position: {
                    columnIndex: 0,
                    rowIndex: 0
                  }
                }], [{
                  cellData: {
                    startDate: new Date(2020, 6, 29, 0, 30),
                    endDate: new Date(2020, 6, 29, 1, 0),
                    allDay: false,
                    groupIndex: 0,
                    index: 1,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 1
                  },
                  position: {
                    columnIndex: 0,
                    rowIndex: 1
                  }
                }]]
              };
              assert.deepEqual(viewData, expectedViewData, 'correct view data');
              assert.deepEqual(viewDataMap, expectedViewDataMap, 'correct view data map');
            });
            test('should work with horizontal grouping', function(assert) {
              this.createInstance({groupOrientation: 'horizontal'});
              this.instance.option('groups', [{
                name: 'res',
                items: [{
                  id: 1,
                  text: 'one'
                }, {
                  id: 2,
                  text: 'two'
                }]
              }]);
              this.instance.viewDataProvider.update(this.instance.generateRenderOptions());
              var $__5 = this.instance.viewDataProvider,
                  viewData = $__5.viewData,
                  viewDataMap = $__5.viewDataMap;
              var expectedViewData = {
                groupedData: [{
                  allDayPanel: [{
                    allDay: true,
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    groups: {res: 1},
                    groupIndex: 0,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 0
                  }, {
                    allDay: true,
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    groups: {res: 2},
                    groupIndex: 1,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 1
                  }],
                  dateTable: [{
                    cells: [{
                      startDate: new Date(2020, 6, 29, 0, 0),
                      endDate: new Date(2020, 6, 29, 0, 30),
                      allDay: false,
                      groups: {res: 1},
                      groupIndex: 0,
                      index: 0,
                      isFirstGroupCell: true,
                      isLastGroupCell: true,
                      key: 0
                    }, {
                      startDate: new Date(2020, 6, 29, 0, 0),
                      endDate: new Date(2020, 6, 29, 0, 30),
                      allDay: false,
                      groups: {res: 2},
                      groupIndex: 1,
                      index: 0,
                      isFirstGroupCell: true,
                      isLastGroupCell: true,
                      key: 1
                    }],
                    key: 0
                  }, {
                    cells: [{
                      startDate: new Date(2020, 6, 29, 0, 30),
                      endDate: new Date(2020, 6, 29, 1, 0),
                      allDay: false,
                      groups: {res: 1},
                      groupIndex: 0,
                      index: 1,
                      isFirstGroupCell: true,
                      isLastGroupCell: true,
                      key: 2
                    }, {
                      startDate: new Date(2020, 6, 29, 0, 30),
                      endDate: new Date(2020, 6, 29, 1, 0),
                      allDay: false,
                      groups: {res: 2},
                      groupIndex: 1,
                      index: 1,
                      isFirstGroupCell: true,
                      isLastGroupCell: true,
                      key: 3
                    }],
                    key: 2
                  }],
                  groupIndex: 0,
                  key: '0',
                  isGroupedAllDayPanel: false
                }],
                bottomVirtualRowHeight: undefined,
                isGroupedAllDayPanel: false,
                topVirtualRowHeight: undefined,
                leftVirtualCellWidth: undefined,
                rightVirtualCellWidth: undefined,
                bottomVirtualRowCount: 0,
                topVirtualRowCount: 0,
                leftVirtualCellCount: 0,
                rightVirtualCellCount: 0
              };
              var expectedViewDataMap = {
                allDayPanelMap: [{
                  cellData: {
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    allDay: true,
                    groups: {res: 1},
                    groupIndex: 0,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 0
                  },
                  position: {
                    columnIndex: 0,
                    rowIndex: 0
                  }
                }, {
                  cellData: {
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    allDay: true,
                    groups: {res: 2},
                    groupIndex: 1,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 1
                  },
                  position: {
                    columnIndex: 1,
                    rowIndex: 0
                  }
                }],
                dateTableMap: [[{
                  cellData: {
                    startDate: new Date(2020, 6, 29, 0, 0),
                    endDate: new Date(2020, 6, 29, 0, 30),
                    allDay: false,
                    groups: {res: 1},
                    groupIndex: 0,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 0
                  },
                  position: {
                    columnIndex: 0,
                    rowIndex: 0
                  }
                }, {
                  cellData: {
                    startDate: new Date(2020, 6, 29, 0, 0),
                    endDate: new Date(2020, 6, 29, 0, 30),
                    allDay: false,
                    groups: {res: 2},
                    groupIndex: 1,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 1
                  },
                  position: {
                    columnIndex: 1,
                    rowIndex: 0
                  }
                }], [{
                  cellData: {
                    startDate: new Date(2020, 6, 29, 0, 30),
                    endDate: new Date(2020, 6, 29, 1, 0),
                    allDay: false,
                    groups: {res: 1},
                    groupIndex: 0,
                    index: 1,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 2
                  },
                  position: {
                    columnIndex: 0,
                    rowIndex: 1
                  }
                }, {
                  cellData: {
                    startDate: new Date(2020, 6, 29, 0, 30),
                    endDate: new Date(2020, 6, 29, 1, 0),
                    allDay: false,
                    groups: {res: 2},
                    groupIndex: 1,
                    index: 1,
                    isFirstGroupCell: true,
                    isLastGroupCell: true,
                    key: 3
                  },
                  position: {
                    columnIndex: 1,
                    rowIndex: 1
                  }
                }]]
              };
              assert.deepEqual(viewData, expectedViewData, 'correct view data');
              assert.deepEqual(viewDataMap, expectedViewDataMap, 'correct viewDataMap');
            });
            test('should work with grouping by date', function(assert) {
              this.createInstance({
                groupOrientation: 'horizontal',
                groupByDate: true,
                intervalCount: 2
              });
              this.instance.option('groups', [{
                name: 'res',
                items: [{
                  id: 1,
                  text: 'one'
                }, {
                  id: 2,
                  text: 'two'
                }]
              }]);
              this.instance.viewDataProvider.update(this.instance.generateRenderOptions());
              var viewData = this.instance.viewDataProvider.viewData;
              var expectedViewData = {
                groupedData: [{
                  allDayPanel: [{
                    allDay: true,
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    groups: {res: 1},
                    groupIndex: 0,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: false,
                    key: 0
                  }, {
                    allDay: true,
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    groups: {res: 2},
                    groupIndex: 1,
                    index: 0,
                    isFirstGroupCell: false,
                    isLastGroupCell: true,
                    key: 1
                  }, {
                    allDay: true,
                    startDate: new Date(2020, 6, 30),
                    endDate: new Date(2020, 6, 30),
                    groups: {res: 1},
                    groupIndex: 0,
                    index: 1,
                    isFirstGroupCell: true,
                    isLastGroupCell: false,
                    key: 2
                  }, {
                    allDay: true,
                    startDate: new Date(2020, 6, 30),
                    endDate: new Date(2020, 6, 30),
                    groups: {res: 2},
                    groupIndex: 1,
                    index: 1,
                    isFirstGroupCell: false,
                    isLastGroupCell: true,
                    key: 3
                  }],
                  dateTable: [{
                    cells: [{
                      startDate: new Date(2020, 6, 29, 0, 0),
                      endDate: new Date(2020, 6, 29, 0, 30),
                      allDay: false,
                      groups: {res: 1},
                      groupIndex: 0,
                      index: 0,
                      isFirstGroupCell: true,
                      isLastGroupCell: false,
                      key: 0
                    }, {
                      startDate: new Date(2020, 6, 29, 0, 0),
                      endDate: new Date(2020, 6, 29, 0, 30),
                      allDay: false,
                      groups: {res: 2},
                      groupIndex: 1,
                      index: 0,
                      isFirstGroupCell: false,
                      isLastGroupCell: true,
                      key: 1
                    }, {
                      startDate: new Date(2020, 6, 30, 0, 0),
                      endDate: new Date(2020, 6, 30, 0, 30),
                      allDay: false,
                      groups: {res: 1},
                      groupIndex: 0,
                      index: 1,
                      isFirstGroupCell: true,
                      isLastGroupCell: false,
                      key: 2
                    }, {
                      startDate: new Date(2020, 6, 30, 0, 0),
                      endDate: new Date(2020, 6, 30, 0, 30),
                      allDay: false,
                      groups: {res: 2},
                      groupIndex: 1,
                      index: 1,
                      isFirstGroupCell: false,
                      isLastGroupCell: true,
                      key: 3
                    }],
                    key: 0
                  }, {
                    cells: [{
                      startDate: new Date(2020, 6, 29, 0, 30),
                      endDate: new Date(2020, 6, 29, 1, 0),
                      allDay: false,
                      groups: {res: 1},
                      groupIndex: 0,
                      index: 2,
                      isFirstGroupCell: true,
                      isLastGroupCell: false,
                      key: 4
                    }, {
                      startDate: new Date(2020, 6, 29, 0, 30),
                      endDate: new Date(2020, 6, 29, 1, 0),
                      allDay: false,
                      groups: {res: 2},
                      groupIndex: 1,
                      index: 2,
                      isFirstGroupCell: false,
                      isLastGroupCell: true,
                      key: 5
                    }, {
                      startDate: new Date(2020, 6, 30, 0, 30),
                      endDate: new Date(2020, 6, 30, 1, 0),
                      allDay: false,
                      groups: {res: 1},
                      groupIndex: 0,
                      index: 3,
                      isFirstGroupCell: true,
                      isLastGroupCell: false,
                      key: 6
                    }, {
                      startDate: new Date(2020, 6, 30, 0, 30),
                      endDate: new Date(2020, 6, 30, 1, 0),
                      allDay: false,
                      groups: {res: 2},
                      groupIndex: 1,
                      index: 3,
                      isFirstGroupCell: false,
                      isLastGroupCell: true,
                      key: 7
                    }],
                    key: 4
                  }],
                  groupIndex: 0,
                  key: '0',
                  isGroupedAllDayPanel: false
                }],
                bottomVirtualRowHeight: undefined,
                isGroupedAllDayPanel: false,
                topVirtualRowHeight: undefined,
                leftVirtualCellWidth: undefined,
                rightVirtualCellWidth: undefined,
                bottomVirtualRowCount: 0,
                topVirtualRowCount: 0,
                leftVirtualCellCount: 0,
                rightVirtualCellCount: 0
              };
              assert.deepEqual(viewData, expectedViewData, 'correct view data');
            });
            test('should work with vertical grouping', function(assert) {
              this.createInstance();
              this.instance.option('groups', [{
                name: 'res',
                items: [{
                  id: 1,
                  text: 'one'
                }, {
                  id: 2,
                  text: 'two'
                }]
              }]);
              this.instance.option('groupOrientation', 'vertical');
              this.instance.viewDataProvider.update(this.instance.generateRenderOptions());
              var $__5 = this.instance.viewDataProvider,
                  viewData = $__5.viewData,
                  viewDataMap = $__5.viewDataMap;
              var expectedViewData = {groupedData: [{
                  allDayPanel: [{
                    allDay: true,
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    groups: {res: 1},
                    groupIndex: 0,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: false,
                    key: 0
                  }],
                  dateTable: [{
                    cells: [{
                      startDate: new Date(2020, 6, 29, 0, 0),
                      endDate: new Date(2020, 6, 29, 0, 30),
                      allDay: false,
                      groups: {res: 1},
                      groupIndex: 0,
                      index: 0,
                      isFirstGroupCell: true,
                      isLastGroupCell: false,
                      key: 0
                    }],
                    key: 0
                  }, {
                    cells: [{
                      startDate: new Date(2020, 6, 29, 0, 30),
                      endDate: new Date(2020, 6, 29, 1, 0),
                      allDay: false,
                      groups: {res: 1},
                      groupIndex: 0,
                      index: 1,
                      isFirstGroupCell: false,
                      isLastGroupCell: true,
                      key: 1
                    }],
                    key: 1
                  }],
                  key: '0'
                }, {
                  allDayPanel: [{
                    allDay: true,
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    groups: {res: 2},
                    groupIndex: 1,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: false,
                    key: 2
                  }],
                  dateTable: [{
                    cells: [{
                      startDate: new Date(2020, 6, 29, 0, 0),
                      endDate: new Date(2020, 6, 29, 0, 30),
                      allDay: false,
                      groups: {res: 2},
                      groupIndex: 1,
                      index: 0,
                      isFirstGroupCell: true,
                      isLastGroupCell: false,
                      key: 2
                    }],
                    key: 2
                  }, {
                    cells: [{
                      startDate: new Date(2020, 6, 29, 0, 30),
                      endDate: new Date(2020, 6, 29, 1, 0),
                      allDay: false,
                      groups: {res: 2},
                      groupIndex: 1,
                      index: 1,
                      isFirstGroupCell: false,
                      isLastGroupCell: true,
                      key: 3
                    }],
                    key: 3
                  }],
                  key: '1'
                }]};
              var expectedViewDataMap = {
                allDayPanelMap: [],
                dateTableMap: [[{
                  cellData: {
                    allDay: true,
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    groups: {res: 1},
                    groupIndex: 0,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: false,
                    key: 0
                  },
                  position: {
                    rowIndex: 0,
                    columnIndex: 0
                  }
                }], [{
                  cellData: {
                    startDate: new Date(2020, 6, 29, 0, 0),
                    endDate: new Date(2020, 6, 29, 0, 30),
                    allDay: false,
                    groups: {res: 1},
                    groupIndex: 0,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: false,
                    key: 0
                  },
                  position: {
                    rowIndex: 1,
                    columnIndex: 0
                  }
                }], [{
                  cellData: {
                    startDate: new Date(2020, 6, 29, 0, 30),
                    endDate: new Date(2020, 6, 29, 1, 0),
                    allDay: false,
                    groups: {res: 1},
                    groupIndex: 0,
                    index: 1,
                    isFirstGroupCell: false,
                    isLastGroupCell: true,
                    key: 1
                  },
                  position: {
                    rowIndex: 2,
                    columnIndex: 0
                  }
                }], [{
                  cellData: {
                    allDay: true,
                    startDate: new Date(2020, 6, 29),
                    endDate: new Date(2020, 6, 29),
                    groups: {res: 2},
                    groupIndex: 1,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: false,
                    key: 2
                  },
                  position: {
                    rowIndex: 3,
                    columnIndex: 0
                  }
                }], [{
                  cellData: {
                    startDate: new Date(2020, 6, 29, 0, 0),
                    endDate: new Date(2020, 6, 29, 0, 30),
                    allDay: false,
                    groups: {res: 2},
                    groupIndex: 1,
                    index: 0,
                    isFirstGroupCell: true,
                    isLastGroupCell: false,
                    key: 2
                  },
                  position: {
                    rowIndex: 4,
                    columnIndex: 0
                  }
                }], [{
                  cellData: {
                    startDate: new Date(2020, 6, 29, 0, 30),
                    endDate: new Date(2020, 6, 29, 1, 0),
                    allDay: false,
                    groups: {res: 2},
                    groupIndex: 1,
                    index: 1,
                    isFirstGroupCell: false,
                    isLastGroupCell: true,
                    key: 3
                  },
                  position: {
                    rowIndex: 5,
                    columnIndex: 0
                  }
                }]]
              };
              assert.deepEqual(viewData.groupedData[0].allDayPanel, expectedViewData.groupedData[0].allDayPanel, 'correct allDayPanel');
              assert.deepEqual(viewData.groupedData[0].dateTable, expectedViewData.groupedData[0].dateTable, 'correct dateTable');
              assert.deepEqual(viewData.groupedData[1].allDayPanel, expectedViewData.groupedData[1].allDayPanel, 'correct allDayPanel');
              assert.deepEqual(viewData.groupedData[1].dateTable, expectedViewData.groupedData[1].dateTable, 'correct dateTable');
              assert.deepEqual(viewDataMap, expectedViewDataMap, 'correct viewDataMap');
            });
          });
        });
        test('should generate correct data for month view', function(assert) {
          this.createInstance({
            startDayHour: 0,
            endDayHour: 0
          }, 'dxSchedulerWorkSpaceMonth');
          this.instance.viewDataProvider.update(this.instance.generateRenderOptions());
          var viewData = this.instance.viewDataProvider.viewData;
          var dateTable = viewData.groupedData[0].dateTable;
          var firstExpectedCell = {
            allDay: undefined,
            startDate: new Date(2020, 5, 28, 0, 0),
            endDate: new Date(2020, 5, 28, 0, 0),
            firstDayOfMonth: false,
            groupIndex: 0,
            index: 0,
            isFirstGroupCell: true,
            isLastGroupCell: false,
            key: 0,
            otherMonth: true,
            text: '28',
            today: false
          };
          var firstDayOfMonthCell = {
            allDay: undefined,
            startDate: new Date(2020, 6, 1, 0, 0),
            endDate: new Date(2020, 6, 1, 0, 0),
            firstDayOfMonth: false,
            groupIndex: 0,
            index: 3,
            isFirstGroupCell: false,
            isLastGroupCell: false,
            key: 3,
            otherMonth: false,
            text: '01',
            today: false
          };
          var firstDayOfNextMonthCell = {
            allDay: undefined,
            startDate: new Date(2020, 7, 1, 0, 0),
            endDate: new Date(2020, 7, 1, 0, 0),
            firstDayOfMonth: false,
            groupIndex: 0,
            index: 34,
            isFirstGroupCell: false,
            isLastGroupCell: true,
            key: 34,
            otherMonth: true,
            text: '01',
            today: false
          };
          assert.deepEqual(dateTable[0].cells[0], firstExpectedCell, 'Correct first cell');
          assert.deepEqual(dateTable[0].cells[3], firstDayOfMonthCell, 'Correct first cell of the month');
          assert.deepEqual(dateTable[4].cells[6], firstDayOfNextMonthCell, 'Correct first cell of the next month');
        });
        test('should not generate all-day panel in month view', function(assert) {
          this.createInstance({
            showAllDayPanel: true,
            startDayHour: 0,
            endDayHour: 24
          }, WORKSPACE_MONTH.class);
          this.instance.viewDataProvider.update(this.instance.generateRenderOptions(), true);
          var viewData = this.instance.viewDataProvider.viewData;
          var allDayPanel = viewData.groupedData[0].allDayPanel;
          assert.notOk(allDayPanel, 'All-day panel data was not generated');
        });
        module('getCellData', function() {
          supportedScrollingModes.forEach(function(scrollingMode) {
            test(("should return cell data in basic case if " + scrollingMode + " scrolling mode"), function(assert) {
              this.createInstance({
                showAllDayPanel: false,
                scrolling: {mode: scrollingMode}
              });
              var $cell = this.instance.$element().find(("." + CELL_CLASS)).eq(0);
              var result = this.instance.getCellData($cell);
              var expected = {
                startDate: new Date(2020, 6, 29, 0, 0),
                endDate: new Date(2020, 6, 29, 0, 30),
                allDay: false,
                groupIndex: 0
              };
              assert.deepEqual(result, expected, 'correct cell data');
            });
            test(("should return cell data when all-day-panel is enabled if " + scrollingMode + " scrolling mode"), function(assert) {
              this.createInstance({
                showAllDayPanel: true,
                scrolling: {mode: scrollingMode}
              });
              var $cell = this.instance.$element().find('.' + CELL_CLASS).eq(0);
              var result = this.instance.getCellData($cell);
              var expected = {
                startDate: new Date(2020, 6, 29, 0, 0),
                endDate: new Date(2020, 6, 29, 0, 30),
                allDay: false,
                groupIndex: 0
              };
              assert.deepEqual(result, expected, 'correct cell data');
            });
            test(("should return cell data when appointments are grouped horizontally if " + scrollingMode + " scrolling mode"), function(assert) {
              this.createInstance({
                groupOrientation: 'horizontal',
                scrolling: {mode: scrollingMode},
                width: 800
              });
              this.instance.option('groups', [{
                name: 'res',
                items: [{
                  id: 1,
                  text: 'one'
                }, {
                  id: 2,
                  text: 'two'
                }]
              }]);
              var $cell = this.instance.$element().find(("." + CELL_CLASS)).eq(1);
              var result = this.instance.getCellData($cell);
              var expected = {
                startDate: new Date(2020, 6, 29, 0, 0),
                endDate: new Date(2020, 6, 29, 0, 30),
                allDay: false,
                groups: {res: 2},
                groupIndex: 1
              };
              assert.deepEqual(result, expected, 'correct cell data');
            });
            test(("should return cell data when appointments are grouped vertically if " + scrollingMode + " scrolling mode"), function(assert) {
              this.createInstance({
                groupOrientation: 'vertical',
                showAllDayPanel: false,
                scrolling: {mode: scrollingMode}
              });
              this.instance.option('groups', [{
                name: 'res',
                items: [{
                  id: 1,
                  text: 'one'
                }, {
                  id: 2,
                  text: 'two'
                }]
              }]);
              var $cell = this.instance.$element().find('.' + CELL_CLASS).eq(1);
              var result = this.instance.getCellData($cell);
              var expected = {
                startDate: new Date(2020, 6, 29, 0, 30),
                endDate: new Date(2020, 6, 29, 1, 0),
                allDay: false,
                groups: {res: 1},
                groupIndex: 0
              };
              assert.deepEqual(result, expected, 'correct cell data');
            });
          });
        });
        test('should call onSelectedCellsClick with correct parameters', function(assert) {
          var onSelectedCellsClick = sinon.stub();
          this.createInstance({
            groupOrientation: 'vertical',
            showAllDayPanel: false,
            onSelectedCellsClick: onSelectedCellsClick
          });
          var $element = this.instance.$element();
          var keyboard = keyboardMock($element);
          $($element.find('.' + CELL_CLASS).eq(0)).trigger('focusin');
          $($element).trigger('focusin');
          keyboard.keyDown('enter');
          assert.deepEqual(onSelectedCellsClick.getCall(0).args[0], {
            allDay: false,
            startDate: new Date(2020, 6, 29, 0, 0),
            endDate: new Date(2020, 6, 29, 0, 30)
          }, 'onSelectedCellsClick has been called with correct parameters');
        });
        test('getDataByDroppableCell should work correctly', function(assert) {
          this.createInstance();
          this.instance.$element().find('.' + CELL_CLASS).eq(0).addClass('dx-scheduler-date-table-droppable-cell');
          var data = this.instance.getDataByDroppableCell();
          assert.deepEqual(data, {
            allDay: false,
            startDate: new Date(2020, 6, 29, 0, 0),
            endDate: new Date(2020, 6, 29, 0, 30),
            groups: undefined
          }, 'Cell Data is correct');
        });
        module('Renovated Components Disposing', function() {
          test('Renovated Comonents should not be disposed on currentDate change', function(assert) {
            this.createInstance({currentDate: new Date(2020, 8, 1)});
            var disposeRenovatedComponentsStub = sinon.spy(noop);
            this.instance._disposeRenovatedComponents = disposeRenovatedComponentsStub;
            this.instance.option('currentDate', new Date(2020, 8, 2));
            assert.notOk(disposeRenovatedComponentsStub.called, 'Renovated components weren\'t disposed');
          });
          test('Renovated Comonents should be disposed on showAllDayPanel change when vertical grouping is used', function(assert) {
            this.createInstance({
              showAllDayPanel: false,
              groupOrientation: 'vertical'
            });
            this.instance.option('groups', [{
              name: 'res',
              items: [{
                id: 1,
                text: 'one'
              }, {
                id: 2,
                text: 'two'
              }]
            }]);
            var disposeRenovatedComponentsStub = sinon.spy(noop);
            this.instance._disposeRenovatedComponents = disposeRenovatedComponentsStub;
            this.instance.option('showAllDayPanel', true);
            assert.ok(disposeRenovatedComponentsStub.called, 'Renovated components weren\'t disposed');
          });
          test('Renovated Comonents should be disposed on groups change', function(assert) {
            this.createInstance({groupOrientation: 'vertical'});
            var disposeRenovatedComponentsStub = sinon.spy(noop);
            this.instance._disposeRenovatedComponents = disposeRenovatedComponentsStub;
            this.instance.option('groups', [{
              name: 'res',
              items: [{
                id: 1,
                text: 'one'
              }, {
                id: 2,
                text: 'two'
              }]
            }]);
            assert.ok(disposeRenovatedComponentsStub.called, 'Renovated components weren\'t disposed');
          });
        });
        test('Workspace should not have dx-scheduler-work-space-odd-cells class when scrolling mode is "virtual"', function(assert) {
          this.createInstance({scrolling: {mode: 'virtual'}});
          assert.notOk(this.instance.$element().hasClass('dx-scheduler-work-space-odd-cells'), 'Workspace does not have odd-cells class');
        });
        test('Cells should not differ in width when crossscrolling and virtual scrolling are enabled', function(assert) {
          this.createInstance({
            scrolling: {mode: 'virtual'},
            width: 800,
            startDayHour: 0,
            endDayHour: 1,
            crossScrollingEnabled: true,
            intervalCount: 2
          });
          var $element = this.instance.$element();
          var cells = $element.find(("." + CELL_CLASS));
          var dateTableWidth = getOuterWidth($element.find(("." + DATE_TABLE_CLASS)));
          cells.each(function() {
            assert.equal(getOuterWidth($(this)), dateTableWidth / 2, 'Correct cell width');
          });
        });
        test('AllDayTable should be initialized', function(assert) {
          this.createInstance({showAllDayPanel: true}, 'dxSchedulerWorkSpaceWeek');
          assert.ok(this.instance._$allDayTable, 'All-day panel has been initialized');
        });
        [WORKSPACE_DAY, WORKSPACE_WEEK, WORKSPACE_MONTH, TIMELINE_DAY, TIMELINE_WEEK, TIMELINE_MONTH].forEach(function($__5) {
          var $__6 = $__5,
              component = $__6.class,
              name = $__6.name;
          test(("Cache should be cleared on rerender in " + name), function(assert) {
            this.createInstance({}, component);
            var cacheClearSpy = sinon.spy(this.instance.cache, 'clear');
            this.instance.renderWorkSpace();
            assert.ok(cacheClearSpy.callCount > 0, 'Cache has been cleared');
            cacheClearSpy.restore();
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","core/utils/common","generic_light.css!","jquery","../../helpers/scheduler/helpers.js","ui/scheduler/workspaces/ui.scheduler.work_space_day","ui/scheduler/workspaces/ui.scheduler.work_space_month","ui/scheduler/workspaces/ui.scheduler.work_space_week","ui/scheduler/workspaces/ui.scheduler.timeline_day","ui/scheduler/workspaces/ui.scheduler.timeline_month","ui/scheduler/workspaces/ui.scheduler.timeline_week","../../helpers/keyboardMock.js","core/utils/extend"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("core/utils/common"), require("generic_light.css!"), require("jquery"), require("../../helpers/scheduler/helpers.js"), require("ui/scheduler/workspaces/ui.scheduler.work_space_day"), require("ui/scheduler/workspaces/ui.scheduler.work_space_month"), require("ui/scheduler/workspaces/ui.scheduler.work_space_week"), require("ui/scheduler/workspaces/ui.scheduler.timeline_day"), require("ui/scheduler/workspaces/ui.scheduler.timeline_month"), require("ui/scheduler/workspaces/ui.scheduler.timeline_week"), require("../../helpers/keyboardMock.js"), require("core/utils/extend"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=workSpace.renovation.tests.js.map