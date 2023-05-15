!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/virtual_scrolling.integration.tests.js"], ["jquery","core/utils/window","generic_light.css!","data/data_source/data_source","../../helpers/scheduler/helpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/virtual_scrolling.integration.tests.js", ["jquery", "core/utils/window", "generic_light.css!", "data/data_source/data_source", "../../helpers/scheduler/helpers.js"], function($__export) {
  "use strict";
  var $,
      getWindow,
      DataSource,
      createWrapper,
      initTestMarkup,
      isDesktopEnvironment,
      asyncScrollTest,
      asyncWrapper,
      supportedViews,
      testStart,
      module,
      test;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      getWindow = $__m.getWindow;
    }, function($__m) {}, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
      isDesktopEnvironment = $__m.isDesktopEnvironment;
      asyncScrollTest = $__m.asyncScrollTest;
      asyncWrapper = $__m.asyncWrapper;
    }],
    execute: function() {
      var $__4;
      supportedViews = ['day', 'week', 'workWeek', 'month'];
      (($__4 = QUnit, testStart = $__4.testStart, module = $__4.module, $__4));
      test = function(description, callback) {
        var testFunc = !isDesktopEnvironment() ? QUnit.skip : QUnit.test;
        return testFunc(description, callback);
      };
      testStart(function() {
        return initTestMarkup();
      });
      module('Virtual scrolling integration', function() {
        module('Initialization', function() {
          supportedViews.forEach(function(viewName) {
            test(("Virtual scrolling should have default cell sizes in \"" + viewName + "\" view"), function(assert) {
              var instance = createWrapper({
                views: [{type: viewName}],
                currentView: viewName,
                scrolling: {
                  mode: 'virtual',
                  orientation: 'both'
                },
                height: 400,
                width: 600
              }).instance;
              var virtualScrollingDispatcher = instance.getWorkSpace().virtualScrollingDispatcher;
              assert.ok(virtualScrollingDispatcher.rowHeight > 0, 'Cell height is present');
              assert.ok(virtualScrollingDispatcher.cellWidth > 0, 'Cell width is present');
            });
            module('Options', function() {
              test(("viewport sizes should be correct if height and width are not set in \"" + viewName + "\" view"), function(assert) {
                var instance = createWrapper({
                  views: [{type: viewName}],
                  scrolling: {
                    mode: 'virtual',
                    orientation: 'both'
                  },
                  currentView: viewName
                }).instance;
                var virtualScrollingDispatcher = instance.getWorkSpace().virtualScrollingDispatcher;
                var $__7 = virtualScrollingDispatcher,
                    viewportHeight = $__7.viewportHeight,
                    viewportWidth = $__7.viewportWidth;
                assert.equal(viewportHeight, window.innerHeight, 'viewportHeight is correct');
                assert.equal(viewportWidth, window.innerWidth, 'viewportWidth is correct');
              });
              test(("pageSize should be correct if height and width are not set in \"" + viewName + "\" view"), function(assert) {
                var instance = createWrapper({
                  views: [{type: viewName}],
                  scrolling: {
                    mode: 'virtual',
                    orientation: 'both'
                  },
                  currentView: viewName
                }).instance;
                var virtualScrollingDispatcher = instance.getWorkSpace().virtualScrollingDispatcher;
                instance.getWorkSpace().renderer.getRenderTimeout = function() {
                  return -1;
                };
                var verticalPageSize = virtualScrollingDispatcher.verticalVirtualScrolling.pageSize;
                var horizontalPageSize = virtualScrollingDispatcher.horizontalVirtualScrolling.pageSize;
                var $__9 = getWindow(),
                    innerHeight = $__9.innerHeight,
                    innerWidth = $__9.innerWidth;
                var cellHeight = virtualScrollingDispatcher.verticalVirtualScrolling.itemSize;
                var expectedVerticalPageSize = Math.ceil(innerHeight / cellHeight);
                assert.equal(verticalPageSize, expectedVerticalPageSize, 'Vertical page size is correct');
                var cellWidth = virtualScrollingDispatcher.horizontalVirtualScrolling.itemSize;
                var expectedHorizontalPageSize = Math.ceil(innerWidth / cellWidth);
                assert.equal(horizontalPageSize, expectedHorizontalPageSize, 'Horizontal page size is correct');
              });
              [{
                orientation: undefined,
                crossScrollingEnabled: true
              }, {
                orientation: 'vertical',
                crossScrollingEnabled: false
              }, {
                orientation: 'horizontal',
                crossScrollingEnabled: true
              }, {
                orientation: 'both',
                crossScrollingEnabled: true
              }].forEach(function($__5) {
                var $__6 = $__5,
                    orientation = $__6.orientation,
                    crossScrollingEnabled = $__6.crossScrollingEnabled;
                test(("crossScrollingEnabled should be set correctly if scrolling orientation is \"" + orientation + "\" in \"" + viewName + "\" view"), function(assert) {
                  var instance = createWrapper({
                    views: [{type: viewName}],
                    scrolling: {
                      mode: 'virtual',
                      orientation: orientation
                    },
                    currentView: viewName
                  }).instance;
                  var workspace = instance.getWorkSpace();
                  assert.equal(workspace.option('crossScrollingEnabled'), crossScrollingEnabled, 'crossScrollingEnabled is correct');
                });
              });
              test(("scheduler should correctly change scrolling orientation in \"" + viewName + "\""), function(assert) {
                var scheduler = createWrapper({
                  views: [viewName],
                  scrolling: {
                    mode: 'virtual',
                    orientation: 'vertical'
                  },
                  currentView: viewName
                });
                scheduler.instance.option('scrolling', {
                  mode: 'virtual',
                  orientation: 'both'
                });
                var headerScrollable = scheduler.workSpace.getHeaderScrollable();
                var sideBarScrollable = scheduler.workSpace.getSideBarScrollable();
                assert.equal(headerScrollable.length, 1, 'Header scrollable exists');
                assert.equal(sideBarScrollable.length, 1, 'Header scrollable exists');
              });
              test(("scheduler should correctly change scrolling orientation in \"" + viewName + "\" when changing a view's option"), function(assert) {
                var scheduler = createWrapper({
                  views: [{type: viewName}],
                  scrolling: {
                    mode: 'virtual',
                    orientation: 'vertical'
                  },
                  currentView: viewName
                });
                scheduler.instance.option('views[0].scrolling', {
                  mode: 'virtual',
                  orientation: 'both'
                });
                var headerScrollable = scheduler.workSpace.getHeaderScrollable();
                var sideBarScrollable = scheduler.workSpace.getSideBarScrollable();
                assert.equal(headerScrollable.length, 1, 'Header scrollable exists');
                assert.equal(sideBarScrollable.length, 1, 'Header scrollable exists');
              });
            });
          });
          test('appointment render timeout should be initialized correctly', function(assert) {
            var instance = createWrapper({
              views: supportedViews,
              currentView: 'day',
              dataSource: [],
              scrolling: {mode: 'virtual'},
              height: 400
            }).instance;
            var workspace = instance.getWorkSpace();
            assert.equal(workspace.renderer.getRenderTimeout(), 15, 'appointment render timeout is correct');
          });
        });
        module('AppointmentSettings', {beforeEach: function() {
            this.createInstance = function(options) {
              this.scheduler = createWrapper(options);
              this.scheduler.instance.getWorkSpace().renderer.getRenderTimeout = function() {
                return -1;
              };
            };
          }}, function() {
          module('Week view', function() {
            module('Vertical virtual scroll', function() {
              [{
                showAllDayPanel: true,
                steps: [{
                  y: 0,
                  appointmentRects: [{
                    left: -9824,
                    top: -9689,
                    height: 500
                  }, {
                    left: -9749,
                    top: -9839,
                    height: 50
                  }, {
                    left: -9299,
                    top: -9689,
                    height: 500
                  }, {
                    left: -9224,
                    top: -9839,
                    height: 50
                  }]
                }, {
                  y: 1000,
                  appointmentRects: [{
                    left: -9824,
                    top: -10039,
                    height: 850
                  }, {
                    left: -9749,
                    top: -10839,
                    height: 50
                  }, {
                    left: -9299,
                    top: -10039,
                    height: 850
                  }, {
                    left: -9224,
                    top: -10839,
                    height: 50
                  }]
                }, {
                  y: 2200,
                  appointmentRects: [{
                    left: -9824,
                    top: -10151,
                    height: 650
                  }, {
                    left: -9749,
                    top: -11901,
                    height: 50
                  }, {
                    left: -9299,
                    top: -10151,
                    height: 650
                  }, {
                    left: -9224,
                    top: -11901,
                    height: 50
                  }]
                }]
              }, {
                showAllDayPanel: false,
                steps: [{
                  y: 0,
                  appointmentRects: [{
                    left: -9824,
                    top: -9712,
                    height: 500
                  }, {
                    left: -9749,
                    top: -9862,
                    height: 50
                  }, {
                    left: -9299,
                    top: -9712,
                    height: 500
                  }, {
                    left: -9224,
                    top: -9862,
                    height: 50
                  }]
                }, {
                  y: 1000,
                  appointmentRects: [{
                    left: -9824,
                    top: -10062,
                    height: 850
                  }, {
                    left: -9749,
                    top: -10862,
                    height: 50
                  }, {
                    left: -9299,
                    top: -10062,
                    height: 850
                  }, {
                    left: -9224,
                    top: -10862,
                    height: 50
                  }]
                }, {
                  y: 2200,
                  appointmentRects: [{
                    left: -9824,
                    top: -10149,
                    height: 650
                  }, {
                    left: -9749,
                    top: -11899,
                    height: 50
                  }, {
                    left: -9299,
                    top: -10149,
                    height: 650
                  }, {
                    left: -9224,
                    top: -11899,
                    height: 50
                  }]
                }]
              }].forEach(function(option) {
                test(("Long appointment should be rendered correctly if horizontal grouping, and showAllDayPanel is " + option.showAllDayPanel), function(assert) {
                  var $__3 = this;
                  var data = [{
                    startDate: new Date(2020, 9, 12, 1, 30),
                    endDate: new Date(2020, 9, 13, 0, 30),
                    priorityId: 1
                  }, {
                    startDate: new Date(2020, 9, 12, 1, 30),
                    endDate: new Date(2020, 9, 13, 0, 30),
                    priorityId: 2
                  }];
                  this.createInstance({
                    dataSource: data,
                    currentView: 'week',
                    currentDate: new Date(2020, 9, 12),
                    groups: ['priorityId'],
                    resources: [{
                      fieldExpr: 'priorityId',
                      allowMultiple: false,
                      dataSource: [{id: 1}, {id: 2}]
                    }],
                    scrolling: {mode: 'virtual'},
                    showAllDayPanel: option.showAllDayPanel,
                    height: 500,
                    width: 800
                  });
                  var instance = this.scheduler.instance;
                  var workspace = instance.getWorkSpace();
                  var scrollable = workspace.getScrollable();
                  workspace.renderer.getRenderTimeout = function() {
                    return -1;
                  };
                  return asyncWrapper(assert, function(promise) {
                    option.steps.forEach(function(step) {
                      promise = asyncScrollTest(assert, promise, function() {
                        assert.equal($__3.scheduler.appointments.getAppointmentCount(), step.appointmentRects.length, ("Appointment count is correct if scrollY: " + step.y));
                        step.appointmentRects.forEach(function(expectedRect, index) {
                          var appointmentRect = $__3.scheduler.appointments.getAppointment(index).get(0).getBoundingClientRect();
                          assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment part #" + index + " left is correct"));
                          assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment part #" + index + " top is correct"));
                          assert.roughEqual(appointmentRect.height, expectedRect.height, 2.01, ("appointment part #" + index + " height is correct"));
                        });
                      }, scrollable, {top: step.y});
                    });
                    return promise;
                  });
                });
              });
              [{
                showAllDayPanel: true,
                steps: [{
                  y: 0,
                  appointmentRects: [{
                    left: -9749,
                    top: -9839,
                    height: 650
                  }, {
                    left: -9224,
                    top: -9839,
                    height: 650
                  }]
                }, {
                  y: 1000,
                  appointmentRects: [{
                    left: -9824,
                    top: -9689,
                    height: 500
                  }, {
                    left: -9749,
                    top: -10839,
                    height: 1050
                  }, {
                    left: -9299,
                    top: -9689,
                    height: 500
                  }, {
                    left: -9224,
                    top: -10839,
                    height: 1050
                  }]
                }, {
                  y: 2200,
                  appointmentRects: [{
                    left: -9824,
                    top: -10151,
                    height: 650
                  }, {
                    left: -9749,
                    top: -11901,
                    height: 1050
                  }, {
                    left: -9299,
                    top: -10151,
                    height: 650
                  }, {
                    left: -9224,
                    top: -11901,
                    height: 1050
                  }]
                }]
              }, {
                showAllDayPanel: false,
                steps: [{
                  y: 0,
                  appointmentRects: [{
                    left: -9749,
                    top: -9862,
                    height: 650
                  }, {
                    left: -9224,
                    top: -9862,
                    height: 650
                  }]
                }, {
                  y: 1000,
                  appointmentRects: [{
                    left: -9824,
                    top: -9712,
                    height: 500
                  }, {
                    left: -9749,
                    top: -10862,
                    height: 1050
                  }, {
                    left: -9299,
                    top: -9712,
                    height: 500
                  }, {
                    left: -9224,
                    top: -10862,
                    height: 1050
                  }]
                }, {
                  y: 2200,
                  appointmentRects: [{
                    left: -9824,
                    top: -10149,
                    height: 650
                  }, {
                    left: -9749,
                    top: -11899,
                    height: 1050
                  }, {
                    left: -9299,
                    top: -10149,
                    height: 650
                  }, {
                    left: -9224,
                    top: -11899,
                    height: 1050
                  }]
                }]
              }].forEach(function(option) {
                test(("Long appointment part should be rendered correctly without render the main part if horizontal grouping and showAllDayPanel is " + option.showAllDayPanel), function(assert) {
                  var $__3 = this;
                  var data = [{
                    startDate: new Date(2020, 9, 12, 11, 30),
                    endDate: new Date(2020, 9, 13, 10, 30),
                    priorityId: 1
                  }, {
                    startDate: new Date(2020, 9, 12, 11, 30),
                    endDate: new Date(2020, 9, 13, 10, 30),
                    priorityId: 2
                  }];
                  this.createInstance({
                    dataSource: data,
                    currentView: 'week',
                    currentDate: new Date(2020, 9, 12),
                    groups: ['priorityId'],
                    resources: [{
                      fieldExpr: 'priorityId',
                      allowMultiple: false,
                      dataSource: [{id: 1}, {id: 2}]
                    }],
                    scrolling: {mode: 'virtual'},
                    showAllDayPanel: option.showAllDayPanel,
                    height: 500,
                    width: 800
                  });
                  var instance = this.scheduler.instance;
                  var workspace = instance.getWorkSpace();
                  var scrollable = workspace.getScrollable();
                  workspace.renderer.getRenderTimeout = function() {
                    return -1;
                  };
                  return asyncWrapper(assert, function(promise) {
                    option.steps.forEach(function(step) {
                      promise = asyncScrollTest(assert, promise, function() {
                        assert.equal($__3.scheduler.appointments.getAppointmentCount(), step.appointmentRects.length, ("Appointment count is correct if scrollY: " + step.y));
                        step.appointmentRects.forEach(function(expectedRect, index) {
                          var appointmentRect = $__3.scheduler.appointments.getAppointment(index).get(0).getBoundingClientRect();
                          assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment part #" + index + " left is correct"));
                          assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment part #" + index + " top is correct"));
                          assert.roughEqual(appointmentRect.height, expectedRect.height, 2.01, ("appointment part #" + index + " height is correct"));
                        });
                      }, scrollable, {y: step.y});
                    });
                    return promise;
                  });
                });
              });
              test('Appointment with multiple resources should be rendered correctly if vertical grouping', function(assert) {
                var $__3 = this;
                var data = [{
                  startDate: new Date(2020, 9, 12, 1, 30),
                  endDate: new Date(2020, 9, 12, 22, 30),
                  priorityId: [1, 2]
                }];
                this.createInstance({
                  dataSource: data,
                  views: [{
                    type: 'week',
                    groupOrientation: 'vertical'
                  }],
                  currentView: 'week',
                  currentDate: new Date(2020, 9, 12),
                  groups: ['priorityId'],
                  resources: [{
                    fieldExpr: 'priorityId',
                    allowMultiple: true,
                    dataSource: [{id: 1}, {id: 2}]
                  }],
                  scrolling: {mode: 'virtual'},
                  height: 500,
                  width: 800
                });
                var instance = this.scheduler.instance;
                var workspace = instance.getWorkSpace();
                var scrollable = workspace.getScrollable();
                workspace.renderer.getRenderTimeout = function() {
                  return -1;
                };
                return asyncWrapper(assert, function(promise) {
                  [{
                    y: 0,
                    appointmentRects: [{
                      left: -9713,
                      top: -9692,
                      height: 450
                    }]
                  }, {
                    y: 1000,
                    appointmentRects: [{
                      left: -9713,
                      top: -10092,
                      height: 850
                    }]
                  }, {
                    y: 2500,
                    appointmentRects: [{
                      left: -9713,
                      top: -9742,
                      height: 500
                    }]
                  }, {
                    y: 4500,
                    appointmentRects: [{
                      left: -9713,
                      top: -10142,
                      height: 500
                    }]
                  }].forEach(function(option) {
                    promise = asyncScrollTest(assert, promise, function() {
                      assert.equal($__3.scheduler.appointments.getAppointmentCount(), option.appointmentRects.length, ("Appointment count is correct when scrollOffset: " + option.y));
                      option.appointmentRects.forEach(function(expectedRect, index) {
                        var appointmentRect = $__3.scheduler.appointments.getAppointment(index).get(0).getBoundingClientRect();
                        assert.roughEqual(appointmentRect.left, expectedRect.left, 1.01, ("Appointemnt#" + index + " left is correct"));
                        assert.roughEqual(appointmentRect.top, expectedRect.top, 1.01, 'Appointemnt#${index} top is correct');
                        assert.roughEqual(appointmentRect.height, expectedRect.height, 1.01, 'Appointemnt#${index} height is correct');
                      });
                    }, scrollable, {y: option.y});
                  });
                  return promise;
                });
              });
              test('Appointment with multiple resources should be rendered correctly if horizontal grouping', function(assert) {
                var $__3 = this;
                var data = [{
                  startDate: new Date(2020, 9, 12, 1, 30),
                  endDate: new Date(2020, 9, 12, 22, 30),
                  priorityId: [1, 2]
                }];
                this.createInstance({
                  dataSource: data,
                  currentView: 'week',
                  currentDate: new Date(2020, 9, 12),
                  groups: ['priorityId'],
                  resources: [{
                    fieldExpr: 'priorityId',
                    allowMultiple: true,
                    dataSource: [{id: 1}, {id: 2}]
                  }],
                  scrolling: {mode: 'virtual'},
                  height: 500,
                  width: 800
                });
                var instance = this.scheduler.instance;
                var workspace = instance.getWorkSpace();
                var scrollable = workspace.getScrollable();
                workspace.renderer.getRenderTimeout = function() {
                  return -1;
                };
                return asyncWrapper(assert, function(promise) {
                  [{
                    y: 0,
                    appointmentRects: [{
                      left: -9824,
                      top: -9689,
                      height: 500
                    }, {
                      left: -9299,
                      top: -9689,
                      height: 500
                    }]
                  }, {
                    y: 1000,
                    appointmentRects: [{
                      left: -9824,
                      top: -10039,
                      height: 850
                    }, {
                      left: -9299,
                      top: -10039,
                      height: 850
                    }]
                  }, {
                    y: 2100,
                    appointmentRects: [{
                      left: -9824,
                      top: -10151,
                      height: 500
                    }, {
                      left: -9299,
                      top: -10151,
                      height: 500
                    }]
                  }].forEach(function(option) {
                    promise = asyncScrollTest(assert, promise, function() {
                      assert.equal(option.appointmentRects.length, $__3.scheduler.appointments.getAppointmentCount(), ("Appointment count is correct when offsetY: " + option.y));
                      option.appointmentRects.forEach(function(expectedRect, index) {
                        var appointmentRect = $__3.scheduler.appointments.getAppointment(index).get(0).getBoundingClientRect();
                        assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment part #" + index + " left is correct"));
                        assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment part #" + index + " top is correct"));
                        assert.roughEqual(appointmentRect.height, expectedRect.height, 2.01, ("appointment part #" + index + " height is correct"));
                      });
                    }, scrollable, {y: option.y});
                  });
                  return promise;
                });
              });
              [undefined, 'FREQ=DAILY'].forEach(function(recurrenceRule) {
                test(("Appointments should contains groupIndex if recurrenceRule: " + recurrenceRule), function(assert) {
                  this.createInstance({
                    currentDate: new Date(2015, 2, 2),
                    currentView: 'week',
                    scrolling: {
                      mode: 'virtual',
                      orientation: 'both'
                    },
                    dataSource: [{
                      startDate: new Date(2015, 2, 2, 0),
                      endDate: new Date(2015, 2, 2, 0, 30),
                      recurrenceRule: recurrenceRule
                    }],
                    height: 400
                  });
                  var instance = this.scheduler.instance;
                  var layoutManager = instance.getLayoutManager();
                  var settings = layoutManager._positionMap[0][0];
                  assert.equal(settings.groupIndex, 0, 'groupIndex is correct');
                });
              });
              [{
                showAllDayPanel: true,
                steps: [{
                  offset: {
                    x: 0,
                    y: 0
                  },
                  appointmentRects: [{
                    left: -9714,
                    top: -9693,
                    height: 450
                  }, {
                    left: -9629,
                    top: -9843,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 0,
                    y: 2300
                  },
                  appointmentRects: [{
                    left: -9714,
                    top: -10093,
                    height: 350
                  }, {
                    left: -9629,
                    top: -12143,
                    height: 50
                  }, {
                    left: -9714,
                    top: -9543,
                    height: 300
                  }, {
                    left: -9629,
                    top: -9693,
                    height: 50
                  }]
                }]
              }, {
                showAllDayPanel: false,
                steps: [{
                  offset: {
                    x: 0,
                    y: 0
                  },
                  appointmentRects: [{
                    left: -9714,
                    top: -9741,
                    height: 500
                  }, {
                    left: -9629,
                    top: -9891,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 0,
                    y: 2300
                  },
                  appointmentRects: [{
                    left: -9714,
                    top: -10091,
                    height: 300
                  }, {
                    left: -9629,
                    top: -12191,
                    height: 50
                  }, {
                    left: -9714,
                    top: -9641,
                    height: 400
                  }, {
                    left: -9629,
                    top: -9791,
                    height: 50
                  }]
                }]
              }].forEach(function($__5) {
                var $__6 = $__5,
                    showAllDayPanel = $__6.showAllDayPanel,
                    steps = $__6.steps;
                test(("Long appointment should be rendered correctly if vertical grouping and showAllDayPanel is " + showAllDayPanel), function(assert) {
                  var $__3 = this;
                  var data = [{
                    startDate: new Date(2020, 9, 12, 1, 30),
                    endDate: new Date(2020, 9, 13, 0, 30),
                    priorityId: 1
                  }, {
                    startDate: new Date(2020, 9, 12, 1, 30),
                    endDate: new Date(2020, 9, 13, 0, 30),
                    priorityId: 2
                  }];
                  this.createInstance({
                    dataSource: data,
                    views: [{
                      type: 'week',
                      groupOrientation: 'vertical'
                    }],
                    currentView: 'week',
                    currentDate: new Date(2020, 9, 12),
                    groups: ['priorityId'],
                    resources: [{
                      fieldExpr: 'priorityId',
                      allowMultiple: false,
                      dataSource: [{id: 1}, {id: 2}]
                    }],
                    scrolling: {
                      mode: 'virtual',
                      orientation: 'vertical'
                    },
                    showAllDayPanel: showAllDayPanel,
                    height: 500,
                    width: 800
                  });
                  var instance = this.scheduler.instance;
                  var workspace = instance.getWorkSpace();
                  var scrollable = workspace.getScrollable();
                  workspace.renderer.getRenderTimeout = function() {
                    return -1;
                  };
                  return asyncWrapper(assert, function(promise) {
                    steps.forEach(function($__8) {
                      var $__9 = $__8,
                          offset = $__9.offset,
                          appointmentRects = $__9.appointmentRects;
                      promise = asyncScrollTest(assert, promise, function() {
                        var appointmentCount = $__3.scheduler.appointments.getAppointmentCount();
                        assert.equal(appointmentCount, appointmentRects.length, ("Appointment count is correct if scrollX: " + offset.x + ", scrollY: " + offset.y));
                        appointmentRects.forEach(function(expectedRect, index) {
                          var appointmentRect = $__3.scheduler.appointments.getAppointment(index).get(0).getBoundingClientRect();
                          assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment part #" + index + " left is correct"));
                          assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment part #" + index + " top is correct"));
                          assert.roughEqual(appointmentRect.height, expectedRect.height, 2.01, ("appointment part #" + index + " height is correct"));
                        });
                      }, scrollable, offset);
                    });
                    return promise;
                  });
                });
              });
              [{
                showAllDayPanel: true,
                steps: [{
                  y: 0,
                  appointmentRects: [{
                    left: -9628,
                    top: -9843,
                    height: 600
                  }]
                }, {
                  y: 1000,
                  appointmentRects: [{
                    left: -9713,
                    top: -9693,
                    height: 450
                  }, {
                    left: -9628,
                    top: -10843,
                    height: 1050
                  }]
                }, {
                  y: 2200,
                  appointmentRects: [{
                    left: -9713,
                    top: -10093,
                    height: 450
                  }, {
                    left: -9628,
                    top: -12043,
                    height: 1050
                  }, {
                    left: -9628,
                    top: -9593,
                    height: 350
                  }]
                }]
              }, {
                showAllDayPanel: false,
                steps: [{
                  y: 0,
                  appointmentRects: [{
                    left: -9628,
                    top: -9891,
                    height: 650
                  }]
                }, {
                  y: 1000,
                  appointmentRects: [{
                    left: -9713,
                    top: -9741,
                    height: 500
                  }, {
                    left: -9628,
                    top: -10891,
                    height: 1050
                  }]
                }, {
                  y: 2200,
                  appointmentRects: [{
                    left: -9713,
                    top: -10091,
                    height: 400
                  }, {
                    left: -9628,
                    top: -12091,
                    height: 1050
                  }, {
                    left: -9628,
                    top: -9691,
                    height: 450
                  }]
                }]
              }].forEach(function(option) {
                test(("Long appointment part should be rendered correctly without render main part if vertical grouping and showAllDayPanel is " + option.showAllDayPanel), function(assert) {
                  var $__3 = this;
                  var data = [{
                    startDate: new Date(2020, 9, 12, 11, 30),
                    endDate: new Date(2020, 9, 13, 10, 30),
                    priorityId: 1
                  }, {
                    startDate: new Date(2020, 9, 12, 11, 30),
                    endDate: new Date(2020, 9, 13, 10, 30),
                    priorityId: 2
                  }];
                  this.createInstance({
                    dataSource: data,
                    views: [{
                      type: 'week',
                      groupOrientation: 'vertical'
                    }],
                    currentView: 'week',
                    currentDate: new Date(2020, 9, 12),
                    groups: ['priorityId'],
                    resources: [{
                      fieldExpr: 'priorityId',
                      allowMultiple: false,
                      dataSource: [{id: 1}, {id: 2}]
                    }],
                    scrolling: {mode: 'virtual'},
                    showAllDayPanel: option.showAllDayPanel,
                    height: 500,
                    width: 800
                  });
                  var instance = this.scheduler.instance;
                  var workspace = instance.getWorkSpace();
                  var scrollable = workspace.getScrollable();
                  workspace.renderer.getRenderTimeout = function() {
                    return -1;
                  };
                  return asyncWrapper(assert, function(promise) {
                    option.steps.forEach(function(step) {
                      promise = asyncScrollTest(assert, promise, function() {
                        assert.equal($__3.scheduler.appointments.getAppointmentCount(), step.appointmentRects.length, ("Appointment count is correct if scrollY: " + step.y));
                        step.appointmentRects.forEach(function(expectedRect, index) {
                          var appointmentRect = $__3.scheduler.appointments.getAppointment(index).get(0).getBoundingClientRect();
                          assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment part #" + index + " left is correct"));
                          assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment part #" + index + " top is correct"));
                          assert.roughEqual(appointmentRect.height, expectedRect.height, 2.01, ("appointment part #" + index + " height is correct"));
                        });
                      }, scrollable, {top: step.y});
                    });
                    return promise;
                  });
                });
              });
            });
            module('Both virtual scroll orientations', function() {
              [{
                showAllDayPanel: true,
                steps: [{
                  offset: {
                    x: 0,
                    y: 0
                  },
                  appointmentRects: [{
                    left: -9874,
                    top: -9689,
                    height: 500
                  }, {
                    left: -9799,
                    top: -9839,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 0,
                    y: 1000
                  },
                  appointmentRects: [{
                    left: -9874,
                    top: -10039,
                    height: 850
                  }, {
                    left: -9799,
                    top: -10839,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 0,
                    y: 2200
                  },
                  appointmentRects: [{
                    left: -9874,
                    top: -10150,
                    height: 650
                  }, {
                    left: -9799,
                    top: -11900,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 520,
                    y: 0
                  },
                  appointmentRects: [{
                    left: -9869,
                    top: -9689,
                    height: 500
                  }, {
                    left: -9794,
                    top: -9839,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 520,
                    y: 1000
                  },
                  appointmentRects: [{
                    left: -9869,
                    top: -10038,
                    height: 850
                  }, {
                    left: -9794,
                    top: -10839,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 520,
                    y: 2200
                  },
                  appointmentRects: [{
                    left: -9869,
                    top: -10150,
                    height: 650
                  }, {
                    left: -9794,
                    top: -11900,
                    height: 50
                  }]
                }]
              }, {
                showAllDayPanel: false,
                steps: [{
                  offset: {
                    x: 0,
                    y: 0
                  },
                  appointmentRects: [{
                    left: -9874,
                    top: -9712,
                    height: 500
                  }, {
                    left: -9799,
                    top: -9862,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 0,
                    y: 1000
                  },
                  appointmentRects: [{
                    left: -9874,
                    top: -10062,
                    height: 850
                  }, {
                    left: -9799,
                    top: -10862,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 0,
                    y: 2200
                  },
                  appointmentRects: [{
                    left: -9874,
                    top: -10149,
                    height: 650
                  }, {
                    left: -9799,
                    top: -11899,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 520,
                    y: 0
                  },
                  appointmentRects: [{
                    left: -9869,
                    top: -9712,
                    height: 500
                  }, {
                    left: -9794,
                    top: -9862,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 520,
                    y: 1000
                  },
                  appointmentRects: [{
                    left: -9869,
                    top: -10062,
                    height: 850
                  }, {
                    left: -9794,
                    top: -10862,
                    height: 50
                  }]
                }, {
                  offset: {
                    x: 520,
                    y: 2200
                  },
                  appointmentRects: [{
                    left: -9869,
                    top: -10149,
                    height: 650
                  }, {
                    left: -9794,
                    top: -11899,
                    height: 50
                  }]
                }]
              }].forEach(function($__5) {
                var $__6 = $__5,
                    showAllDayPanel = $__6.showAllDayPanel,
                    steps = $__6.steps;
                test(("Long appointment should be rendered correctly if horizontal grouping, and showAllDayPanel is " + showAllDayPanel), function(assert) {
                  var $__3 = this;
                  var data = [{
                    startDate: new Date(2020, 9, 12, 1, 30),
                    endDate: new Date(2020, 9, 13, 0, 30),
                    priorityId: 1
                  }, {
                    startDate: new Date(2020, 9, 12, 1, 30),
                    endDate: new Date(2020, 9, 13, 0, 30),
                    priorityId: 2
                  }];
                  this.createInstance({
                    dataSource: data,
                    currentView: 'week',
                    currentDate: new Date(2020, 9, 12),
                    groups: ['priorityId'],
                    resources: [{
                      fieldExpr: 'priorityId',
                      allowMultiple: false,
                      dataSource: [{id: 1}, {id: 2}]
                    }],
                    scrolling: {
                      mode: 'virtual',
                      orientation: 'both'
                    },
                    showAllDayPanel: showAllDayPanel,
                    height: 500,
                    width: 300
                  });
                  var instance = this.scheduler.instance;
                  var workspace = instance.getWorkSpace();
                  var scrollable = workspace.getScrollable();
                  workspace.renderer.getRenderTimeout = function() {
                    return -1;
                  };
                  return asyncWrapper(assert, function(promise) {
                    steps.forEach(function($__8) {
                      var $__9 = $__8,
                          appointmentRects = $__9.appointmentRects,
                          offset = $__9.offset;
                      promise = asyncScrollTest(assert, promise, function() {
                        assert.equal($__3.scheduler.appointments.getAppointmentCount(), appointmentRects.length, ("Appointment count is correct if scrollX: " + offset.x + ", scrollY: " + offset.y));
                        appointmentRects.forEach(function(expectedRect, index) {
                          var appointmentRect = $__3.scheduler.appointments.getAppointment(index).get(0).getBoundingClientRect();
                          assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment part #" + index + " left is correct"));
                          assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment part #" + index + " top is correct"));
                          assert.roughEqual(appointmentRect.height, expectedRect.height, 2.01, ("appointment part #" + index + " height is correct"));
                        });
                      }, scrollable, offset);
                    });
                    return promise;
                  });
                });
              });
              test('Appointment with multiple resources should be rendered correctly if horizontal grouping', function(assert) {
                var $__3 = this;
                var data = [{
                  startDate: new Date(2020, 9, 12, 1, 30),
                  endDate: new Date(2020, 9, 12, 22, 30),
                  priorityId: [1, 2]
                }];
                this.createInstance({
                  dataSource: data,
                  currentView: 'week',
                  currentDate: new Date(2020, 9, 12),
                  groups: ['priorityId'],
                  resources: [{
                    fieldExpr: 'priorityId',
                    allowMultiple: true,
                    dataSource: [{id: 1}, {id: 2}]
                  }],
                  scrolling: {
                    mode: 'virtual',
                    orientation: 'both'
                  },
                  height: 500,
                  width: 300
                });
                var instance = this.scheduler.instance;
                var workspace = instance.getWorkSpace();
                var scrollable = workspace.getScrollable();
                workspace.renderer.getRenderTimeout = function() {
                  return -1;
                };
                return asyncWrapper(assert, function(promise) {
                  [{
                    offset: {
                      x: 0,
                      y: 0
                    },
                    appointmentRects: [{
                      left: -9874,
                      top: -9689,
                      height: 500
                    }]
                  }, {
                    offset: {
                      x: 0,
                      y: 1000
                    },
                    appointmentRects: [{
                      left: -9874,
                      top: -10039,
                      height: 850
                    }]
                  }, {
                    offset: {
                      x: 0,
                      y: 2100
                    },
                    appointmentRects: [{
                      left: -9874,
                      top: -10151,
                      height: 500
                    }]
                  }, {
                    offset: {
                      x: 520,
                      y: 0
                    },
                    appointmentRects: [{
                      left: -9869,
                      top: -9689,
                      height: 500
                    }]
                  }, {
                    offset: {
                      x: 520,
                      y: 1000
                    },
                    appointmentRects: [{
                      left: -9869,
                      top: -10039,
                      height: 850
                    }]
                  }, {
                    offset: {
                      x: 520,
                      y: 2100
                    },
                    appointmentRects: [{
                      left: -9869,
                      top: -10151,
                      height: 500
                    }]
                  }].forEach(function($__6) {
                    var $__7 = $__6,
                        offset = $__7.offset,
                        appointmentRects = $__7.appointmentRects;
                    promise = asyncScrollTest(assert, promise, function() {
                      assert.equal(appointmentRects.length, $__3.scheduler.appointments.getAppointmentCount(), ("Appointment count is correct when offsetX: " + offset.x + ", offsetY: " + offset.y));
                      appointmentRects.forEach(function(expectedRect, index) {
                        var appointmentRect = $__3.scheduler.appointments.getAppointment(index).get(0).getBoundingClientRect();
                        assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment part #" + index + " left is correct"));
                        assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment part #" + index + " top is correct"));
                        assert.roughEqual(appointmentRect.height, expectedRect.height, 2.01, ("appointment part #" + index + " height is correct"));
                      });
                    }, scrollable, offset);
                  });
                  return promise;
                });
              });
            });
            ['horizontal', 'vertical'].forEach(function(groupOrientation) {
              test(("A long appointment should be correctly croped if Week view  and \"" + groupOrientation + "\" group orientation"), function(assert) {
                var longAppointment = {
                  startDate: new Date(2015, 2, 4, 0, 10),
                  endDate: new Date(2015, 2, 4, 23, 50)
                };
                this.createInstance({
                  currentDate: new Date(2015, 2, 4),
                  scrolling: {mode: 'virtual'},
                  views: [{
                    type: 'week',
                    groupOrientation: groupOrientation
                  }],
                  currentView: 'week',
                  dataSource: [longAppointment],
                  height: 400
                });
                var instance = this.scheduler.instance;
                var workspace = instance.getWorkSpace();
                var viewDataProvider = workspace.viewDataProvider;
                var scrollable = workspace.getScrollable();
                workspace.renderer.getRenderTimeout = function() {
                  return -1;
                };
                return asyncWrapper(assert, function(promise) {
                  [1000, 1050, 1100, 1200, 1250, 1300, 1350, 1400, 1500, 2000].forEach(function(scrollY) {
                    promise = asyncScrollTest(assert, promise, function() {
                      var layoutManager = instance.getLayoutManager();
                      var settings = layoutManager._positionMap[0][0];
                      assert.equal(settings.groupIndex, 0, ("group index is correct when scrolled to " + scrollY));
                      var startViewDate = viewDataProvider.findGroupCellStartDate(settings.groupIndex, settings.info.appointment.startDate, settings.info.appointment.endDate);
                      assert.deepEqual(settings.info.appointment.startDate, startViewDate, 'start date is correct');
                    }, scrollable, {y: scrollY});
                  });
                  return promise;
                });
              });
            });
          });
          module('Supported views', function() {
            supportedViews.forEach(function(viewName) {
              test(("Grouped appointment should contains correct groupIndex if \"" + viewName + "\" view has vertical group orientation"), function(assert) {
                this.createInstance({
                  currentDate: new Date(2015, 2, 2),
                  views: [{
                    type: viewName,
                    groupOrientation: 'vertical'
                  }],
                  currentView: viewName,
                  scrolling: {mode: 'virtual'},
                  groups: ['resourceId0'],
                  resources: [{
                    fieldExpr: 'resourceId0',
                    dataSource: [{id: 0}]
                  }],
                  dataSource: [{
                    startDate: new Date(2015, 2, 2, 0),
                    endDate: new Date(2015, 2, 2, 0, 30),
                    resourceId0: 0
                  }],
                  height: 400,
                  width: 800
                });
                var instance = this.scheduler.instance;
                var layoutManager = instance.getLayoutManager();
                var settings = layoutManager._positionMap[0][0];
                assert.equal(settings.groupIndex, 0, 'groupIndex is correct');
              });
              test(("Grouped appointment should contains correct groupIndex if \"" + viewName + "\" view has horizontal group orientation"), function(assert) {
                this.createInstance({
                  currentDate: new Date(2015, 2, 2),
                  views: [{
                    type: viewName,
                    groupOrientation: 'horizontal'
                  }],
                  currentView: viewName,
                  scrolling: {mode: 'virtual'},
                  groups: ['resourceId0'],
                  resources: [{
                    fieldExpr: 'resourceId0',
                    dataSource: [{id: 0}, {id: 1}]
                  }],
                  dataSource: [{
                    startDate: new Date(2015, 2, 2, 0),
                    endDate: new Date(2015, 2, 2, 0, 30),
                    resourceId0: 1
                  }],
                  height: 400,
                  width: 800
                });
                var instance = this.scheduler.instance;
                var layoutManager = instance.getLayoutManager();
                var settings = layoutManager._positionMap[0][0];
                assert.equal(settings.groupIndex, 1, 'groupIndex is correct');
              });
              test(("Grouped allDay appointment should contains correct groupIndex if \"" + viewName + "\" view has vertical group orientation"), function(assert) {
                this.createInstance({
                  currentDate: new Date(2015, 2, 2),
                  scrolling: {mode: 'virtual'},
                  views: [{
                    type: viewName,
                    groupOrientation: 'vertical'
                  }],
                  currentView: viewName,
                  groups: ['resourceId0'],
                  resources: [{
                    fieldExpr: 'resourceId0',
                    dataSource: [{id: 0}]
                  }],
                  dataSource: [{
                    startDate: new Date(2015, 2, 2),
                    endDate: new Date(2015, 2, 2),
                    resourceId0: 0,
                    allDay: true
                  }],
                  height: 400
                });
                var instance = this.scheduler.instance;
                var layoutManager = instance.getLayoutManager();
                var settings = layoutManager._positionMap[0][0];
                assert.equal(settings.groupIndex, 0, 'groupIndex is correct');
              });
            });
          });
          module('Recurrent appoitnments', function() {
            test('it should have correct settings in vertical group orientation', function(assert) {
              var data = [{
                text: 'Test0',
                priorityId: 1,
                startDate: new Date(2020, 9, 7, 0, 0),
                endDate: new Date(2020, 9, 7, 0, 15),
                recurrenceRule: 'FREQ=HOURLY'
              }, {
                text: 'Test1',
                priorityId: 2,
                startDate: new Date(2020, 9, 7, 0, 0),
                endDate: new Date(2020, 9, 7, 1, 15),
                recurrenceRule: 'FREQ=HOURLY'
              }];
              var instance = createWrapper({
                dataSource: data,
                views: [{
                  type: 'day',
                  groupOrientation: 'vertical'
                }],
                currentView: 'day',
                scrolling: {mode: 'virtual'},
                currentDate: new Date(2020, 9, 7),
                groups: ['priorityId'],
                resources: [{
                  fieldExpr: 'priorityId',
                  dataSource: [{id: 1}, {id: 2}]
                }],
                height: 600
              }).instance;
              instance.getWorkSpace().renderer.getRenderTimeout = function() {
                return -1;
              };
              var scrollable = instance.getWorkSpace().getScrollable();
              return asyncWrapper(assert, function(promise) {
                [{
                  offset: {y: 0},
                  expectedSettings: [{
                    groupIndex: 0,
                    topPositions: [50, 150, 250, 350, 450, 550, 650, 750]
                  }]
                }, {
                  offset: {y: 2000},
                  expectedSettings: [{
                    groupIndex: 0,
                    topPositions: [1750, 1850, 1950, 2050, 2150, 2250, 2350]
                  }, {
                    groupIndex: 1,
                    topPositions: [2500, 2600, 2700]
                  }]
                }, {
                  offset: {y: 4000},
                  expectedSettings: [{
                    groupIndex: 1,
                    topPositions: [3750, 3800, 3900, 4000, 4100, 4200, 4300, 4400, 4500, 4600, 4700]
                  }]
                }].forEach(function($__5) {
                  var $__6 = $__5,
                      offset = $__6.offset,
                      expectedSettings = $__6.expectedSettings;
                  promise = asyncScrollTest(assert, promise, function() {
                    instance.filteredItems.forEach(function(dataItem, index) {
                      var layoutManager = instance.getLayoutManager();
                      var appointmentRenderingStrategy = layoutManager.getRenderingStrategyInstance();
                      var settings = appointmentRenderingStrategy.generateAppointmentSettings(dataItem);
                      var $__7 = expectedSettings[index],
                          groupIndex = $__7.groupIndex,
                          topPositions = $__7.topPositions;
                      assert.equal(settings.length, topPositions.length, 'Settings amount is correct');
                      topPositions.forEach(function(top, index) {
                        assert.equal(settings[index].groupIndex, groupIndex, ("Appointment groupIndex \"" + groupIndex + "\" is correct for offsetY: " + offset.y));
                        assert.equal(settings[index].top, top, ("Appointment top position \"" + top + "\" is correct for offsetY: " + offset.y));
                      });
                    });
                  }, scrollable, offset);
                });
                return promise;
              });
            });
            test('it should not have duplicates in horizontal group orientation', function(assert) {
              var data = [{
                text: 'Test0',
                priorityId: [1, 2],
                startDate: new Date(2020, 10, 2, 9, 30),
                endDate: new Date(2020, 10, 2, 11, 45),
                recurrenceRule: 'FREQ=DAILY'
              }, {
                text: 'Test1',
                priorityId: [1, 2],
                startDate: new Date(2020, 10, 2, 13, 30),
                endDate: new Date(2020, 10, 2, 16, 45),
                recurrenceRule: 'FREQ=DAILY'
              }];
              var scheduler = createWrapper({
                dataSource: data,
                views: [{
                  type: 'day',
                  cellDuration: 15,
                  intervalCount: 2
                }],
                currentView: 'day',
                currentDate: new Date(2020, 10, 2),
                startDayHour: 9,
                groups: ['priorityId'],
                resources: [{
                  fieldExpr: 'priorityId',
                  allowMultiple: false,
                  dataSource: [{id: 1}, {id: 2}]
                }],
                height: 600,
                width: 800,
                scrolling: {mode: 'virtual'}
              });
              var instance = scheduler.instance;
              instance.getWorkSpace().renderer.getRenderTimeout = function() {
                return -1;
              };
              var scrollable = instance.getWorkSpace().getScrollable();
              return asyncWrapper(assert, function(promise) {
                [{
                  offsetY: 0,
                  expected: [[{
                    groupIndex: 0,
                    left: 0,
                    top: 100,
                    height: 450
                  }, {
                    groupIndex: 0,
                    left: 175,
                    top: 100,
                    height: 450
                  }, {
                    groupIndex: 1,
                    left: 350,
                    top: 100,
                    height: 450
                  }, {
                    groupIndex: 1,
                    left: 525,
                    top: 100,
                    height: 450
                  }], []]
                }, {
                  offsetY: 500,
                  expected: [[{
                    groupIndex: 0,
                    left: 0,
                    top: 250,
                    height: 300
                  }, {
                    groupIndex: 0,
                    left: 175,
                    top: 250,
                    height: 300
                  }, {
                    groupIndex: 1,
                    left: 350,
                    top: 250,
                    height: 300
                  }, {
                    groupIndex: 1,
                    left: 525,
                    top: 250,
                    height: 300
                  }], [{
                    groupIndex: 0,
                    left: 0,
                    top: 900,
                    height: 400
                  }, {
                    groupIndex: 0,
                    left: 175,
                    top: 900,
                    height: 400
                  }, {
                    groupIndex: 1,
                    left: 350,
                    top: 900,
                    height: 400
                  }, {
                    groupIndex: 1,
                    left: 525,
                    top: 900,
                    height: 400
                  }]]
                }, {
                  offsetY: 900,
                  expected: [[], [{
                    groupIndex: 0,
                    left: 0,
                    top: 900,
                    height: 650
                  }, {
                    groupIndex: 0,
                    left: 175,
                    top: 900,
                    height: 650
                  }, {
                    groupIndex: 1,
                    left: 350,
                    top: 900,
                    height: 650
                  }, {
                    groupIndex: 1,
                    left: 525,
                    top: 900,
                    height: 650
                  }]]
                }, {
                  offsetY: 500,
                  expected: [[{
                    groupIndex: 0,
                    left: 0,
                    top: 250,
                    height: 300
                  }, {
                    groupIndex: 0,
                    left: 175,
                    top: 250,
                    height: 300
                  }, {
                    groupIndex: 1,
                    left: 350,
                    top: 250,
                    height: 300
                  }, {
                    groupIndex: 1,
                    left: 525,
                    top: 250,
                    height: 300
                  }], [{
                    groupIndex: 0,
                    left: 0,
                    top: 900,
                    height: 400
                  }, {
                    groupIndex: 0,
                    left: 175,
                    top: 900,
                    height: 400
                  }, {
                    groupIndex: 1,
                    left: 350,
                    top: 900,
                    height: 400
                  }, {
                    groupIndex: 1,
                    left: 525,
                    top: 900,
                    height: 400
                  }]]
                }].forEach(function($__6) {
                  var $__7 = $__6,
                      offsetY = $__7.offsetY,
                      expected = $__7.expected;
                  promise = asyncScrollTest(assert, promise, function() {
                    var items = instance._appointments.option('items');
                    assert.equal(items.length, expected.length, ("Appointments amount is correct for offsetY=" + offsetY));
                    expected.forEach(function(expect, index) {
                      var settings = items[index].settings;
                      assert.equal(settings.length, expect.length, ("Appointment settings amount " + settings.length + " is correct"));
                      settings.forEach(function(setting, index) {
                        var $__9 = expect[index],
                            left = $__9.left,
                            top = $__9.top,
                            groupIndex = $__9.groupIndex,
                            height = $__9.height;
                        assert.equal(setting.groupIndex, groupIndex, ("Settings groupIndex " + setting.groupIndex + " is correct"));
                        assert.roughEqual(setting.top, top, 1.01, ("Settings top " + setting.top + " is correct"));
                        assert.roughEqual(setting.left, left, 1.01, ("Settings left " + setting.left + " is correct"));
                        assert.equal(setting.height, height, ("Settings height " + setting.height + " is correct"));
                      });
                    });
                  }, scrollable, {y: offsetY});
                });
                return promise;
              });
            });
            test('Recurrent all day appoitment with multiple resources should be rendered correctly if horizontal grouping', function(assert) {
              var $__3 = this;
              this.createInstance({
                dataSource: [{
                  text: 'allDay recurrent',
                  startDate: new Date(2021, 8, 6, 9, 30),
                  endDate: new Date(2021, 8, 6, 11, 30),
                  priorityId: [1, 3, 5, 9, 12],
                  recurrenceRule: 'FREQ=DAILY',
                  allDay: true
                }],
                currentView: 'week',
                startDayHour: 9,
                endDayHour: 18,
                currentDate: new Date(2021, 8, 6),
                groups: ['priorityId'],
                resources: [{
                  fieldExpr: 'priorityId',
                  allowMultiple: true,
                  dataSource: [{
                    id: 1,
                    label: 'rc_1'
                  }, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}, {id: 13}, {id: 14}, {id: 15}, {id: 16}]
                }],
                scrolling: {
                  mode: 'virtual',
                  orientation: 'both'
                },
                height: 600,
                width: 800
              });
              var instance = this.scheduler.instance;
              var scrollable = instance.getWorkSpaceScrollable();
              instance.getWorkSpace().renderer.getRenderTimeout = function() {
                return -1;
              };
              return asyncWrapper(assert, function(promise) {
                [{
                  offset: {x: 0},
                  appointmentRects: [{
                    left: -9824,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9749,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9674,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9599,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9524,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9449,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -8774,
                    top: -9864,
                    height: 25,
                    width: 75
                  }]
                }, {
                  offset: {x: 500},
                  appointmentRects: [{
                    left: -10324,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -10249,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -10174,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -10099,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -10024,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9949,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9274,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9199,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9124,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9049,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -8974,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -8899,
                    top: -9864,
                    height: 25,
                    width: 75
                  }]
                }, {
                  offset: {x: 1000},
                  appointmentRects: [{
                    left: -9774,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9699,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9624,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9549,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9474,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9399,
                    top: -9864,
                    height: 25,
                    width: 75
                  }]
                }, {
                  offset: {x: 1500},
                  appointmentRects: [{
                    left: -10274,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -10199,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -10124,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -10049,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9974,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9899,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9224,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9149,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9074,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -8999,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -8924,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -8849,
                    top: -9864,
                    height: 25,
                    width: 75
                  }]
                }, {
                  offset: {x: 2000},
                  appointmentRects: [{
                    left: -9724,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9649,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9574,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9499,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9424,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9349,
                    top: -9864,
                    height: 25,
                    width: 75
                  }]
                }, {
                  offset: {x: 4200},
                  appointmentRects: [{
                    left: -9824,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9749,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9674,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9599,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9524,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9449,
                    top: -9864,
                    height: 25,
                    width: 75
                  }]
                }, {
                  offset: {x: 5700},
                  appointmentRects: [{
                    left: -9749,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9674,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9599,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9524,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9449,
                    top: -9864,
                    height: 25,
                    width: 75
                  }, {
                    left: -9374,
                    top: -9864,
                    height: 25,
                    width: 75
                  }]
                }, {
                  offset: {x: 7000},
                  appointmentRects: []
                }].forEach(function($__6) {
                  var $__7 = $__6,
                      offset = $__7.offset,
                      appointmentRects = $__7.appointmentRects;
                  promise = asyncScrollTest(assert, promise, function() {
                    assert.equal(appointmentRects.length, $__3.scheduler.appointments.getAppointmentCount(), ("Appointment count is correct when offsetX: " + offset.x));
                    appointmentRects.forEach(function(expectedRect, index) {
                      var appointmentRect = $__3.scheduler.appointments.getAppointment(index).get(0).getBoundingClientRect();
                      assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment part #" + index + " left is correct"));
                      assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment part #" + index + " top is correct"));
                      assert.roughEqual(appointmentRect.height, expectedRect.height, 2.01, ("appointment part #" + index + " height is correct"));
                      assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, ("appointment part #" + index + " width is correct"));
                    });
                  }, scrollable, offset, 200);
                });
                return promise;
              });
            });
          });
          test('A vertically grouped long recurrent appointment should not have duplicates', function(assert) {
            var data = [{
              text: 'Website Re-Design Plan',
              priorityId: [1, 2],
              startDate: new Date(2020, 10, 2, 9, 30),
              endDate: new Date(2020, 10, 2, 11, 45),
              recurrenceRule: 'FREQ=DAILY'
            }];
            var scheduler = createWrapper({
              dataSource: data,
              views: [{
                type: 'day',
                groupOrientation: 'vertical',
                cellDuration: 15,
                intervalCount: 2
              }],
              currentView: 'day',
              currentDate: new Date(2020, 10, 2),
              startDayHour: 9,
              endDayHour: 13,
              groups: ['priorityId'],
              resources: [{
                fieldExpr: 'priorityId',
                allowMultiple: false,
                dataSource: [{id: 1}, {id: 2}]
              }],
              height: 600,
              scrolling: {mode: 'virtual'}
            });
            var instance = scheduler.instance;
            instance.getWorkSpace().renderer.getRenderTimeout = function() {
              return -1;
            };
            var scrollable = instance.getWorkSpace().getScrollable();
            return asyncWrapper(assert, function(promise) {
              [{
                offsetY: 0,
                expected: [{
                  groupIndex: 0,
                  top: 150,
                  height: 450
                }, {
                  groupIndex: 0,
                  top: 150,
                  height: 450
                }]
              }, {
                offsetY: 550,
                expected: [{
                  groupIndex: 0,
                  top: 300,
                  height: 300
                }, {
                  groupIndex: 0,
                  top: 300,
                  height: 300
                }, {
                  groupIndex: 1,
                  top: 1000,
                  height: 350
                }, {
                  groupIndex: 1,
                  top: 1000,
                  height: 350
                }]
              }, {
                offsetY: 950,
                expected: [{
                  groupIndex: 1,
                  top: 1000,
                  height: 450
                }, {
                  groupIndex: 1,
                  top: 1000,
                  height: 450
                }]
              }, {
                offsetY: 590,
                expected: [{
                  groupIndex: 0,
                  top: 300,
                  height: 300
                }, {
                  groupIndex: 0,
                  top: 300,
                  height: 300
                }, {
                  groupIndex: 1,
                  top: 1000,
                  height: 350
                }, {
                  groupIndex: 1,
                  top: 1000,
                  height: 350
                }]
              }].forEach(function(option) {
                var $__6 = option,
                    offsetY = $__6.offsetY,
                    expected = $__6.expected;
                promise = asyncScrollTest(assert, promise, function() {
                  var items = instance._appointments.option('items');
                  assert.equal(items.length, 1, ("Appointments amount is correct for offsetY=" + offsetY));
                  var settings = items[0].settings;
                  assert.equal(settings.length, expected.length, ("Appointment settings amount " + settings.length + " is correct"));
                  settings.forEach(function(setting, index) {
                    var $__8 = expected[index],
                        top = $__8.top,
                        groupIndex = $__8.groupIndex,
                        height = $__8.height;
                    assert.equal(setting.groupIndex, groupIndex, ("Settings groupIndex " + setting.groupIndex + " is correct"));
                    assert.equal(setting.top, top, ("Settings top " + setting.top + " is correct"));
                    assert.equal(setting.height, height, ("Settings height " + setting.height + " is correct"));
                  });
                }, scrollable, {y: offsetY});
              });
              return promise;
            });
          });
        });
        module('Appointment filtering', function() {
          module('Init', function() {
            ['vertical', 'horizontal'].forEach(function(groupOrientation) {
              test(("Should be filtered correctly when groupOrientation: " + groupOrientation), function(assert) {
                var data = [{
                  startDate: new Date(2016, 9, 5, 0, 0),
                  endDate: new Date(2016, 9, 5, 0, 30),
                  text: 'test_00'
                }, {
                  startDate: new Date(2016, 9, 5, 2),
                  endDate: new Date(2016, 9, 5, 3),
                  text: 'test_01'
                }, {
                  startDate: new Date(2016, 9, 5, 4),
                  endDate: new Date(2016, 9, 5, 4, 1),
                  text: 'test_02'
                }, {
                  startDate: new Date(2016, 9, 5, 12),
                  endDate: new Date(2016, 9, 5, 13),
                  text: 'test_03'
                }, {
                  startDate: new Date(2016, 9, 5, 18),
                  endDate: new Date(2016, 9, 5, 20),
                  text: 'test_04'
                }];
                var instance = createWrapper({
                  dataSource: data,
                  currentDate: new Date(2016, 9, 5),
                  views: [{
                    type: 'day',
                    groupOrientation: groupOrientation
                  }],
                  currentView: 'day',
                  scrolling: {
                    mode: 'virtual',
                    orientation: 'vertical'
                  },
                  height: 400
                }).instance;
                var filteredItems = instance.filteredItems;
                assert.equal(filteredItems.length, 3, 'Filtered items length is correct');
                assert.deepEqual(filteredItems[0], data[0], 'Filtered item 0 is correct');
                assert.deepEqual(filteredItems[1], data[1], 'Filtered item 1 is correct');
                assert.deepEqual(filteredItems[2], data[2], 'Filtered item 2 is correct');
              });
              test(("Should be filtered correctly with resources when groupOrientation: " + groupOrientation), function(assert) {
                var data = [{
                  startDate: new Date(2016, 9, 5, 0, 0),
                  endDate: new Date(2016, 9, 5, 0, 30),
                  resourceId0: 0,
                  text: 'test_00'
                }, {
                  startDate: new Date(2016, 9, 5, 2),
                  endDate: new Date(2016, 9, 5, 3),
                  resourceId0: 1,
                  text: 'test_01'
                }, {
                  startDate: new Date(2016, 9, 5, 4),
                  endDate: new Date(2016, 9, 5, 4, 1),
                  resourceId0: 0,
                  text: 'test_02'
                }, {
                  startDate: new Date(2016, 9, 5, 12),
                  endDate: new Date(2016, 9, 5, 13),
                  resourceId0: 1,
                  text: 'test_03'
                }, {
                  startDate: new Date(2016, 9, 5, 18),
                  endDate: new Date(2016, 9, 5, 20),
                  resourceId0: 0,
                  text: 'test_04'
                }];
                var instance = createWrapper({
                  dataSource: data,
                  currentDate: new Date(2016, 9, 5),
                  views: [{
                    type: 'day',
                    groupOrientation: groupOrientation
                  }],
                  currentView: 'day',
                  scrolling: {mode: 'virtual'},
                  resources: [{
                    fieldExpr: 'resourceId0',
                    dataSource: [{
                      text: 'Rc0_0',
                      id: 0,
                      color: '#727bd2'
                    }, {
                      text: 'Rc0_1',
                      id: 1,
                      color: '#32c9ed'
                    }],
                    label: 'Resource0'
                  }],
                  height: 400
                }).instance;
                var filteredItems = instance.filteredItems;
                assert.equal(filteredItems.length, 3, 'Filtered items length is correct');
                assert.deepEqual(filteredItems[0], data[0], 'Filtered item 0 is correct');
                assert.deepEqual(filteredItems[1], data[1], 'Filtered item 1 is correct');
                assert.deepEqual(filteredItems[2], data[2], 'Filtered item 2 is correct');
              });
            });
            test('Grouped appointments should be filtered correctly when groupOrientation: "vertical"', function(assert) {
              var data = [{
                startDate: new Date(2016, 9, 5, 0, 0),
                endDate: new Date(2016, 9, 5, 0, 30),
                resourceId0: 0,
                text: 'test_00'
              }, {
                startDate: new Date(2016, 9, 5, 2),
                endDate: new Date(2016, 9, 5, 3),
                resourceId0: 1,
                text: 'test_01'
              }, {
                startDate: new Date(2016, 9, 5, 4),
                endDate: new Date(2016, 9, 5, 4, 1),
                resourceId0: 0,
                text: 'test_02'
              }, {
                startDate: new Date(2016, 9, 5, 12),
                endDate: new Date(2016, 9, 5, 13),
                resourceId0: 1,
                text: 'test_03'
              }, {
                startDate: new Date(2016, 9, 5, 18),
                endDate: new Date(2016, 9, 5, 20),
                resourceId0: 0,
                text: 'test_04'
              }];
              var instance = createWrapper({
                dataSource: data,
                currentDate: new Date(2016, 9, 5),
                views: [{
                  type: 'day',
                  groupOrientation: 'vertical'
                }],
                currentView: 'day',
                scrolling: {mode: 'virtual'},
                groups: ['resourceId0'],
                resources: [{
                  fieldExpr: 'resourceId0',
                  dataSource: [{
                    text: 'Rc0_0',
                    id: 0,
                    color: '#727bd2'
                  }, {
                    text: 'Rc0_1',
                    id: 1,
                    color: '#32c9ed'
                  }],
                  label: 'Resource0'
                }],
                height: 400,
                width: 800
              }).instance;
              var filteredItems = instance.filteredItems;
              assert.equal(filteredItems.length, 2, 'Filtered items length is correct');
              assert.deepEqual(filteredItems[0], data[0], 'Filtered item 0 is correct');
              assert.deepEqual(filteredItems[1], data[2], 'Filtered item 1 is correct');
            });
            test('Grouped appointments should be filtered correctly when groupOrientation: "horizontal"', function(assert) {
              var data = [{
                startDate: new Date(2016, 9, 5, 0, 0),
                endDate: new Date(2016, 9, 5, 0, 30),
                resourceId0: 0,
                text: 'test_00'
              }, {
                startDate: new Date(2016, 9, 5, 2),
                endDate: new Date(2016, 9, 5, 3),
                resourceId0: 1,
                text: 'test_01'
              }, {
                startDate: new Date(2016, 9, 5, 4),
                endDate: new Date(2016, 9, 5, 4, 1),
                resourceId0: 0,
                text: 'test_02'
              }, {
                startDate: new Date(2016, 9, 5, 12),
                endDate: new Date(2016, 9, 5, 13),
                resourceId0: 1,
                text: 'test_03'
              }, {
                startDate: new Date(2016, 9, 5, 18),
                endDate: new Date(2016, 9, 5, 20),
                resourceId0: 0,
                text: 'test_04'
              }];
              var instance = createWrapper({
                dataSource: data,
                currentDate: new Date(2016, 9, 5),
                views: [{
                  type: 'day',
                  groupOrientation: 'horizontal'
                }],
                currentView: 'day',
                scrolling: {mode: 'virtual'},
                groups: ['resourceId0'],
                resources: [{
                  fieldExpr: 'resourceId0',
                  dataSource: [{
                    text: 'Rc0_0',
                    id: 0,
                    color: '#727bd2'
                  }, {
                    text: 'Rc0_1',
                    id: 1,
                    color: '#32c9ed'
                  }],
                  label: 'Resource0'
                }],
                height: 400,
                width: 800
              }).instance;
              var filteredItems = instance.filteredItems;
              assert.equal(filteredItems.length, 3, 'Filtered items length is correct');
              assert.deepEqual(filteredItems[0], data[0], 'Filtered item 0 is correct');
              assert.deepEqual(filteredItems[1], data[1], 'Filtered item 1 is correct');
              assert.deepEqual(filteredItems[2], data[2], 'Filtered item 2 is correct');
            });
            test('Recurrent appointments should be filtered correctly in vertical group orientation', function(assert) {
              var data = [{
                text: 'Test0',
                priorityId: 1,
                startDate: new Date(2020, 9, 7, 0, 0),
                endDate: new Date(2020, 9, 7, 0, 15),
                recurrenceRule: 'FREQ=HOURLY'
              }, {
                text: 'Test1',
                priorityId: 2,
                startDate: new Date(2020, 9, 7, 0, 0),
                endDate: new Date(2020, 9, 7, 1, 15),
                recurrenceRule: 'FREQ=HOURLY'
              }];
              var instance = createWrapper({
                dataSource: data,
                views: [{
                  type: 'day',
                  groupOrientation: 'vertical'
                }],
                currentView: 'day',
                scrolling: {mode: 'virtual'},
                currentDate: new Date(2020, 9, 7),
                groups: ['priorityId'],
                resources: [{
                  fieldExpr: 'priorityId',
                  dataSource: [{id: 1}, {id: 2}]
                }],
                height: 600
              }).instance;
              instance.getWorkSpace().renderer.getRenderTimeout = function() {
                return -1;
              };
              var scrollable = instance.getWorkSpace().getScrollable();
              return asyncWrapper(assert, function(promise) {
                [{
                  offsetY: 0,
                  expectedDataIndices: [0]
                }, {
                  offsetY: 500,
                  expectedDataIndices: [0]
                }, {
                  offsetY: 1000,
                  expectedDataIndices: [0]
                }, {
                  offsetY: 2000,
                  expectedDataIndices: [0, 1]
                }, {
                  offsetY: 2500,
                  expectedDataIndices: [0, 1]
                }, {
                  offsetY: 4000,
                  expectedDataIndices: [1]
                }, {
                  offsetY: 4500,
                  expectedDataIndices: [1]
                }].forEach(function(option) {
                  promise = asyncScrollTest(assert, promise, function() {
                    var filteredItems = instance.filteredItems;
                    var expectedDataIndices = option.expectedDataIndices;
                    assert.equal(filteredItems.length, expectedDataIndices.length, 'Filtered items length is correct');
                    expectedDataIndices.forEach(function(dataIndex, index) {
                      assert.deepEqual(filteredItems[index], data[dataIndex], ("Filtered item \"" + index + "\" is correct"));
                    });
                  }, scrollable, {y: option.offsetY});
                });
                return promise;
              });
            });
          });
          module('Scrolling', {beforeEach: function() {
              this.data = [{
                startDate: new Date(2016, 9, 5, 0, 0),
                endDate: new Date(2016, 9, 5, 0, 30),
                resourceId0: 0,
                text: 'test_00'
              }, {
                startDate: new Date(2016, 9, 5, 2),
                endDate: new Date(2016, 9, 5, 3),
                resourceId0: 1,
                text: 'test_10'
              }, {
                startDate: new Date(2016, 9, 5, 4, 0),
                endDate: new Date(2016, 9, 5, 4, 1),
                resourceId0: 0,
                text: 'test_01'
              }, {
                startDate: new Date(2016, 9, 5, 12),
                endDate: new Date(2016, 9, 5, 13),
                resourceId0: 1,
                text: 'test_11'
              }, {
                startDate: new Date(2016, 9, 5, 18),
                endDate: new Date(2016, 9, 5, 20),
                resourceId0: 0,
                text: 'test_02'
              }, {
                startDate: new Date(2016, 9, 5, 13),
                endDate: new Date(2016, 9, 5, 23),
                resourceId0: 0,
                text: 'test_03'
              }];
              this.createInstance = function(options) {
                options = options || {};
                options = $.extend(false, {
                  dataSource: this.data,
                  currentDate: new Date(2016, 9, 5),
                  views: [{
                    type: 'day',
                    groupOrientation: 'vertical'
                  }],
                  currentView: 'day',
                  scrolling: {
                    mode: 'virtual',
                    orientation: 'both'
                  },
                  height: 400
                }, options);
                this.instance = createWrapper(options).instance;
                this.instance.getWorkSpace().renderer.getRenderTimeout = function() {
                  return -1;
                };
              };
            }}, function() {
            module('Vertical grouping', function() {
              test('Scroll Down', function(assert) {
                var $__3 = this;
                this.createInstance();
                var instance = (this).instance;
                return asyncWrapper(assert, function(promise) {
                  [{
                    offset: {y: 0},
                    expectedIndices: [0, 1, 2]
                  }, {
                    offset: {y: 300},
                    expectedIndices: [1, 2]
                  }, {
                    offset: {y: 900},
                    expectedIndices: [3, 5]
                  }, {
                    offset: {y: 1700},
                    expectedIndices: [4, 5]
                  }, {
                    offset: {y: 2400},
                    expectedIndices: [4, 5]
                  }].forEach(function($__6) {
                    var $__7 = $__6,
                        offset = $__7.offset,
                        expectedIndices = $__7.expectedIndices;
                    var scrollable = instance.getWorkSpaceScrollable();
                    promise = asyncScrollTest(assert, promise, function() {
                      var filteredItems = $__3.instance.filteredItems;
                      assert.equal(filteredItems.length, expectedIndices.length, 'Filtered items length is correct');
                      filteredItems.forEach(function(_, index) {
                        var expected = $__3.data[expectedIndices[index]];
                        assert.deepEqual(filteredItems[index], expected, ("Filtered item \"" + index + "\" is correct"));
                      });
                    }, scrollable, offset);
                  });
                  return promise;
                });
              });
              test('Scroll Up', function(assert) {
                var $__3 = this;
                this.createInstance();
                var instance = (this).instance;
                return asyncWrapper(assert, function(promise) {
                  [{
                    y: 2400,
                    expectedIndices: [4, 5]
                  }, {
                    y: 1700,
                    expectedIndices: [4, 5]
                  }, {
                    y: 900,
                    expectedIndices: [3, 5]
                  }, {
                    y: 300,
                    expectedIndices: [1, 2]
                  }, {
                    y: 0,
                    expectedIndices: [0, 1, 2]
                  }].forEach(function(option) {
                    var expectedIndices = option.expectedIndices;
                    var scrollable = instance.getWorkSpaceScrollable();
                    promise = asyncScrollTest(assert, promise, function() {
                      var filteredItems = $__3.instance.filteredItems;
                      assert.equal(filteredItems.length, expectedIndices.length, ("Filtered items length is correct if scrollOffset: " + option.y));
                      filteredItems.forEach(function(_, index) {
                        var expected = $__3.data[expectedIndices[index]];
                        assert.deepEqual(filteredItems[index], expected, ("Filtered item \"" + index + "\" is correct"));
                      });
                    }, scrollable, {y: option.y});
                  });
                  return promise;
                });
              });
              test('Scroll Down if groups and resources', function(assert) {
                var $__3 = this;
                this.createInstance({
                  groups: ['resourceId0'],
                  resources: [{
                    fieldExpr: 'resourceId0',
                    dataSource: [{
                      text: 'Rc0_0',
                      id: 0,
                      color: '#727bd2'
                    }, {
                      text: 'Rc0_1',
                      id: 1,
                      color: '#32c9ed'
                    }, {
                      text: 'Rc0_2',
                      id: 2,
                      color: '#52c9ed'
                    }],
                    label: 'Resource0'
                  }]
                });
                var instance = (this).instance;
                return asyncWrapper(assert, function(promise) {
                  [{
                    y: 0,
                    expectedIndices: [0, 2]
                  }, {
                    y: 300,
                    expectedIndices: [2]
                  }, {
                    y: 900,
                    expectedIndices: [5]
                  }, {
                    y: 1700,
                    expectedIndices: [4, 5]
                  }, {
                    y: 2400,
                    expectedIndices: [1, 5]
                  }, {
                    y: 2700,
                    expectedIndices: [1]
                  }, {
                    y: 3000,
                    expectedIndices: []
                  }, {
                    y: 3300,
                    expectedIndices: [3]
                  }, {
                    y: 4300,
                    expectedIndices: []
                  }].forEach(function(option) {
                    var expectedIndices = option.expectedIndices;
                    var scrollable = instance.getWorkSpaceScrollable();
                    promise = asyncScrollTest(assert, promise, function() {
                      var filteredItems = $__3.instance.filteredItems;
                      assert.equal(filteredItems.length, expectedIndices.length, ("ScrollY: " + option.y + ". Filtered items length is correct"));
                      filteredItems.forEach(function(_, index) {
                        var expected = $__3.data[expectedIndices[index]];
                        assert.deepEqual(filteredItems[index], expected, ("Filtered item \"" + index + "\" is correct"));
                      });
                    }, scrollable, {y: option.y});
                  });
                  return promise;
                });
              });
              test('Next day appointments should be filtered', function(assert) {
                var $__3 = this;
                this.createInstance({
                  groups: ['resourceId0'],
                  dataSource: [{
                    startDate: new Date(2016, 9, 6, 23),
                    endDate: new Date(2016, 9, 6, 23, 23),
                    resourceId0: 0,
                    text: 'test_00'
                  }, {
                    startDate: new Date(2016, 9, 6, 23),
                    endDate: new Date(2016, 9, 6, 23, 23),
                    resourceId0: 1,
                    text: 'test_10'
                  }],
                  resources: [{
                    fieldExpr: 'resourceId0',
                    dataSource: [{
                      text: 'Rc0_0',
                      id: 0,
                      color: '#727bd2'
                    }, {
                      text: 'Rc0_1',
                      id: 1,
                      color: '#32c9ed'
                    }],
                    label: 'Resource0'
                  }]
                });
                var instance = (this).instance;
                return asyncWrapper(assert, function(promise) {
                  var scrollable = instance.getWorkSpaceScrollable();
                  [0, 300, 900, 1700, 2400, 2700, 3000, 3300, 4300].forEach(function(scrollY) {
                    promise = asyncScrollTest(assert, promise, function() {
                      var filteredItems = $__3.instance.filteredItems;
                      assert.equal(filteredItems.length, 0, ("scrollY: " + scrollY + ", filtered items length is correct "));
                    }, scrollable, {y: scrollY});
                  });
                  return promise;
                });
              });
              test('All day appointment should be rendered correctly on the next page', function(assert) {
                var $__3 = this;
                var data = [{
                  startDate: new Date(2020, 9, 12, 9, 30),
                  endDate: new Date(2020, 9, 12, 10, 30),
                  allDay: true,
                  priorityId: 2
                }];
                this.createInstance({
                  dataSource: data,
                  views: [{
                    type: 'week',
                    groupOrientation: 'vertical'
                  }],
                  currentView: 'week',
                  currentDate: new Date(2020, 9, 12),
                  startDayHour: 9,
                  endDayHour: 16,
                  groups: ['priorityId'],
                  resources: [{
                    fieldExpr: 'priorityId',
                    allowMultiple: false,
                    dataSource: [{id: 1}, {id: 2}]
                  }],
                  height: 500,
                  width: 600
                });
                var scrollable = this.instance.getWorkSpace().getScrollable();
                return asyncWrapper(assert, function(promise) {
                  return asyncScrollTest(assert, promise, function() {
                    var filteredItems = $__3.instance.filteredItems;
                    assert.equal(filteredItems.length, 1, 'Filtered items length is correct');
                    assert.deepEqual(filteredItems[0], data[0], 'Filtered item is correct');
                  }, scrollable, {y: 600});
                });
              });
            });
            module('Horizontal grouping', {beforeEach: function() {
                this.data = [{
                  startDate: new Date(2016, 9, 5, 0, 0),
                  endDate: new Date(2016, 9, 5, 0, 30),
                  resourceId0: 0,
                  text: 'test_00'
                }, {
                  startDate: new Date(2016, 9, 5, 11),
                  endDate: new Date(2016, 9, 5, 12),
                  resourceId0: 1,
                  text: 'test_01'
                }, {
                  startDate: new Date(2016, 9, 5, 1, 30),
                  endDate: new Date(2016, 9, 5, 2, 30),
                  resourceId0: 2,
                  text: 'test_02'
                }, {
                  startDate: new Date(2016, 9, 5, 11, 30),
                  endDate: new Date(2016, 9, 5, 12, 30),
                  resourceId0: 3,
                  text: 'test_03'
                }, {
                  startDate: new Date(2016, 9, 5, 18),
                  endDate: new Date(2016, 9, 5, 20),
                  resourceId0: 4,
                  text: 'test_04'
                }, {
                  startDate: new Date(2016, 9, 5, 13),
                  endDate: new Date(2016, 9, 5, 23),
                  resourceId0: 5,
                  text: 'test_05'
                }, {
                  startDate: new Date(2016, 9, 5, 13),
                  endDate: new Date(2016, 9, 5, 23),
                  resourceId0: 6,
                  text: 'test_06'
                }, {
                  startDate: new Date(2016, 9, 5, 13),
                  endDate: new Date(2016, 9, 5, 23),
                  resourceId0: 7,
                  text: 'test_07'
                }, {
                  startDate: new Date(2016, 9, 5, 13),
                  endDate: new Date(2016, 9, 5, 23),
                  resourceId0: 8,
                  text: 'test_08'
                }, {
                  startDate: new Date(2016, 9, 5, 13),
                  endDate: new Date(2016, 9, 5, 23),
                  resourceId0: 9,
                  text: 'test_09'
                }, {
                  startDate: new Date(2016, 9, 5, 13),
                  endDate: new Date(2016, 9, 5, 23),
                  resourceId0: 10,
                  text: 'test_10'
                }];
                this.createInstance = function(options) {
                  options = options || {};
                  options = $.extend(false, {
                    dataSource: this.data,
                    currentDate: new Date(2016, 9, 5),
                    views: [{type: 'day'}],
                    currentView: 'day',
                    scrolling: {
                      mode: 'virtual',
                      orientation: 'both'
                    },
                    groups: ['resourceId0'],
                    resources: [{
                      fieldExpr: 'resourceId0',
                      dataSource: [{
                        text: 'Rc0_0',
                        id: 0
                      }, {
                        text: 'Rc0_1',
                        id: 1
                      }, {
                        text: 'Rc0_3',
                        id: 2
                      }, {
                        text: 'Rc0_4',
                        id: 3
                      }, {
                        text: 'Rc0_5',
                        id: 4
                      }, {
                        text: 'Rc0_6',
                        id: 5
                      }, {
                        text: 'Rc0_7',
                        id: 6
                      }, {
                        text: 'Rc0_8',
                        id: 7
                      }, {
                        text: 'Rc0_9',
                        id: 8
                      }, {
                        text: 'Rc0_10',
                        id: 9
                      }, {
                        text: 'Rc0_11',
                        id: 10
                      }]
                    }],
                    height: 400,
                    width: 600
                  }, options);
                  this.scheduler = createWrapper(options);
                  this.instance = this.scheduler.instance;
                  this.instance.getWorkSpace().renderer.getRenderTimeout = function() {
                    return -1;
                  };
                };
              }}, function() {
              module('Regular appointmens', function() {
                test('Scroll Right', function(assert) {
                  var $__3 = this;
                  var $style = $('<style nonce="qunit-test">');
                  var styleBefore = $style.text();
                  $style.text('#scheduler .dx-scheduler-cell-sizes-horizontal { width: 200px } ').appendTo('head');
                  this.createInstance();
                  var instance = (this).instance;
                  return asyncWrapper(assert, function(promise) {
                    [{
                      offset: {
                        x: 0,
                        y: 0
                      },
                      expectedIndices: [0, 2],
                      appointmentRects: [{
                        left: -9899,
                        top: -9878,
                        height: 50
                      }, {
                        left: -9499,
                        top: -9728,
                        height: 100
                      }]
                    }, {
                      offset: {
                        x: 300,
                        y: 0
                      },
                      expectedIndices: [0, 2],
                      appointmentRects: [{
                        left: -10199,
                        top: -9878,
                        height: 50
                      }, {
                        left: -9799,
                        top: -9728,
                        height: 100
                      }]
                    }, {
                      offset: {
                        x: 900,
                        y: 0
                      },
                      expectedIndices: [],
                      appointmentRects: []
                    }, {
                      offset: {
                        x: 0,
                        y: 1100
                      },
                      expectedIndices: [1, 3],
                      appointmentRects: [{
                        left: -9699,
                        top: -9878,
                        height: 100
                      }, {
                        left: -9299,
                        top: -9828,
                        height: 100
                      }]
                    }, {
                      offset: {
                        x: 300,
                        y: 1100
                      },
                      expectedIndices: [1, 3],
                      appointmentRects: [{
                        left: -9999,
                        top: -9878,
                        height: 100
                      }, {
                        left: -9599,
                        top: -9828,
                        height: 100
                      }]
                    }, {
                      offset: {
                        x: 1700,
                        y: 1100
                      },
                      expectedIndices: [7, 8, 9, 10],
                      appointmentRects: [{
                        left: -10199,
                        top: -9678,
                        height: 300
                      }, {
                        left: -9999,
                        top: -9678,
                        height: 300
                      }, {
                        left: -9799,
                        top: -9678,
                        height: 300
                      }, {
                        left: -9599,
                        top: -9678,
                        height: 300
                      }]
                    }].forEach(function($__6) {
                      var $__7 = $__6,
                          offset = $__7.offset,
                          expectedIndices = $__7.expectedIndices,
                          appointmentRects = $__7.appointmentRects;
                      var scrollable = instance.getWorkSpaceScrollable();
                      promise = asyncScrollTest(assert, promise, function() {
                        assert.ok(true, ("Scroll to x: " + offset.x + ", y: " + offset.y));
                        var filteredItems = $__3.instance.filteredItems;
                        assert.equal(filteredItems.length, expectedIndices.length, 'Filtered items length is correct');
                        filteredItems.forEach(function(_, index) {
                          var expected = $__3.data[expectedIndices[index]];
                          assert.deepEqual(filteredItems[index], expected, ("Filtered item \"" + index + "\" is correct"));
                          var expectedRect = appointmentRects[index];
                          var appointmentRect = $__3.scheduler.appointments.getAppointment(index).get(0).getBoundingClientRect();
                          assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment part #" + index + " left is correct"));
                          assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment part #" + index + " top is correct"));
                          assert.roughEqual(appointmentRect.height, expectedRect.height, 2.01, ("appointment part #" + index + " height is correct"));
                        });
                      }, scrollable, offset);
                    });
                    return promise;
                  }).finally(function() {
                    $style.text(styleBefore);
                  });
                });
              });
              module('Recurrent appointments', function() {
                module('Multiple resources', function() {
                  test('Scroll Right recurrent appointment with multiple resources', function(assert) {
                    var scheduler = createWrapper({
                      height: 600,
                      width: 600,
                      dataSource: [{
                        text: 'Website Re-Design Plan',
                        startDate: new Date(2021, 8, 6, 9, 30),
                        endDate: new Date(2021, 8, 6, 11, 30),
                        resourceId: [1, 3, 5],
                        recurrenceRule: 'FREQ=DAILY'
                      }],
                      views: [{
                        type: 'week',
                        name: 'Work Week',
                        groupOrientation: 'horizontal'
                      }],
                      startDayHour: 9,
                      endDayHour: 18,
                      currentView: 'Work Week',
                      scrolling: {
                        mode: 'virtual',
                        orientation: 'both'
                      },
                      currentDate: new Date(2021, 8, 6),
                      groups: ['resourceId'],
                      resources: [{
                        fieldExpr: 'resourceId',
                        dataSource: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}],
                        allowMultiple: true
                      }]
                    });
                    scheduler.instance.getWorkSpace().renderer.getRenderTimeout = function() {
                      return -1;
                    };
                    return asyncWrapper(assert, function(promise) {
                      [{
                        offset: {x: 0},
                        appointmentRects: [{
                          left: -9824,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9749,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9674,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9599,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9524,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9449,
                          top: -9788,
                          height: 200
                        }]
                      }, {
                        offset: {x: 300},
                        appointmentRects: [{
                          left: -10124,
                          top: -9788,
                          height: 200
                        }, {
                          left: -10049,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9974,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9899,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9824,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9749,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9074,
                          top: -9788,
                          height: 200
                        }]
                      }, {
                        offset: {x: 1100},
                        appointmentRects: [{
                          left: -9874,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9799,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9724,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9649,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9574,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9499,
                          top: -9788,
                          height: 200
                        }]
                      }, {
                        offset: {x: 2100},
                        appointmentRects: [{
                          left: -9824,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9749,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9674,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9599,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9524,
                          top: -9788,
                          height: 200
                        }, {
                          left: -9449,
                          top: -9788,
                          height: 200
                        }]
                      }].forEach(function($__5) {
                        var $__6 = $__5,
                            offset = $__6.offset,
                            appointmentRects = $__6.appointmentRects;
                        var scrollable = scheduler.instance.getWorkSpaceScrollable();
                        promise = asyncScrollTest(assert, promise, function() {
                          assert.ok(true, ("Scroll to x: " + offset.x));
                          assert.equal(scheduler.appointments.getAppointmentCount(), appointmentRects.length, 'Appointment amount is correct');
                          scheduler.appointments.getAppointments().each(function(index, appointment) {
                            var appointmentRect = appointment.getBoundingClientRect();
                            var expectedRect = appointmentRects[index];
                            assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment #" + index + " left is correct"));
                            assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment #" + index + " top is correct"));
                            assert.roughEqual(appointmentRect.height, expectedRect.height, 2.01, ("appointment #" + index + " height is correct"));
                          });
                        }, scrollable, offset);
                      });
                      return promise;
                    });
                  });
                });
              });
            });
          });
        });
        module('Appointment rendering', {before: function() {
            this.createInstance = function(options) {
              this.scheduler = createWrapper(options);
              this.instance = this.scheduler.instance;
              this.instance.getWorkSpace().renderer.getRenderTimeout = function() {
                return -1;
              };
            };
          }}, function() {
          [{
            groupOrientation: 'horizontal',
            expectedReducers: ['head', 'tail', 'head', 'head', 'tail', 'head']
          }, {
            groupOrientation: 'vertical',
            expectedReducers: ['head', 'tail', 'head']
          }].forEach(function(option) {
            test(("Reccurrent appointment should not have a reducer icon if " + option.groupOrientation + " group orientation"), function(assert) {
              this.createInstance({
                dataSource: [{
                  text: 'Appointment 1',
                  startDate: new Date(2020, 10, 6, 9, 30),
                  endDate: new Date(2020, 10, 7, 9, 20),
                  recurrenceRule: 'FREQ=DAILY',
                  ownerId: [1, 2]
                }],
                currentDate: new Date(2020, 10, 5),
                views: [{
                  type: 'day',
                  groupOrientation: option.groupOrientation,
                  cellDuration: 5,
                  intervalCount: 3
                }],
                currentView: 'day',
                groups: ['ownerId'],
                startDayHour: 9,
                endDayHour: 16,
                resources: [{
                  field: 'ownerId',
                  dataSource: [{
                    id: 1,
                    text: 'one'
                  }, {
                    id: 2,
                    text: 'two'
                  }]
                }],
                scrolling: {mode: 'virtual'},
                width: 800
              });
              var expectedReducers = option.expectedReducers;
              var appointments = this.scheduler.instance.getAppointmentsInstance();
              var settings = appointments.option('items')[0].settings;
              assert.equal(settings.length, expectedReducers.length, 'Appointment settings amount is correct');
              expectedReducers.forEach(function(expected, i) {
                assert.equal(settings[i].appointmentReduced, expected, ("Part \"" + i + "\" has correct reducer state"));
              });
            });
          });
          ['vertical', 'horizontal'].forEach(function(groupOrientation) {
            ['vertical', 'horizontal', 'both'].forEach(function(scrollOrientation) {
              test(("Created appointments should be fully repainted in \"" + groupOrientation + "\" group orientation and \"" + scrollOrientation + "\" scroll orientation"), function(assert) {
                this.createInstance({
                  currentDate: new Date(2015, 2, 2),
                  dataSource: [],
                  views: [{
                    type: 'week',
                    groupOrientation: groupOrientation,
                    cellDuration: 30
                  }],
                  currentView: 'week',
                  scrolling: {
                    mode: 'virtual',
                    orientation: scrollOrientation
                  },
                  groups: ['priorityId'],
                  resources: [{
                    fieldExpr: 'priorityId',
                    dataSource: [{id: 0}, {id: 1}]
                  }],
                  height: 400,
                  width: 600
                });
                var instance = this.scheduler.instance;
                instance.addAppointment({
                  startDate: new Date(2015, 2, 2, 1),
                  endDate: new Date(2015, 2, 2, 1, 30),
                  priorityId: 0
                });
                instance.addAppointment({
                  startDate: new Date(2015, 2, 2, 1, 30),
                  endDate: new Date(2015, 2, 2, 2),
                  priorityId: 0
                });
                assert.equal(this.scheduler.appointments.getAppointmentCount(), 2, 'Appointments rendered correctly');
              });
            });
          });
          QUnit.test('DataSource items should be passed to the appointments collection after wrap by layout manager', function(assert) {
            var $__3 = this;
            var data = new DataSource({store: [{
                text: 'Task 1',
                startDate: new Date(2015, 1, 9, 1, 0),
                endDate: new Date(2015, 1, 9, 2, 0)
              }, {
                text: 'Task 2',
                startDate: new Date(2015, 1, 9, 11, 0),
                endDate: new Date(2015, 1, 9, 12, 0)
              }]});
            this.createInstance({
              currentView: 'day',
              dataSource: data,
              currentDate: new Date(2015, 1, 9),
              scrolling: {
                mode: 'virtual',
                orientation: 'both'
              },
              height: 500,
              width: 600
            });
            var dataSourceItems = this.instance.option('dataSource').items();
            var appointmentsItems = this.instance.getAppointmentsInstance().option('items');
            assert.equal(appointmentsItems.length, 1, 'Items length is correct');
            assert.equal(appointmentsItems[0].itemData, dataSourceItems[0], 'Item is correct');
            var workspace = this.instance.getWorkSpace();
            var scrollable = workspace.getScrollable();
            workspace.renderer.getRenderTimeout = function() {
              return -1;
            };
            return asyncWrapper(assert, function(promise) {
              return asyncScrollTest(assert, promise, function() {
                appointmentsItems = $__3.instance.getAppointmentsInstance().option('items');
                assert.equal(appointmentsItems.length, 2, 'Items length is correct');
                assert.deepEqual(appointmentsItems[0].itemData, dataSourceItems[1], 'Item0 is correct');
                assert.notOk(appointmentsItems[0].needRepaint, 'Item0 should be repainted');
                assert.notOk(appointmentsItems[0].needRemove, 'Item0 should not be removed');
                assert.deepEqual(appointmentsItems[1].itemData, dataSourceItems[0], 'Item1 is correct');
                assert.notOk(appointmentsItems[1].needRepaint, 'Item1 should be repainted');
                assert.ok(appointmentsItems[1].needRemove, 'Item1 should not be removed');
              }, scrollable, {y: 1000});
            });
          });
          [{
            appointment: {
              text: 'a',
              startDate: new Date(2021, 1, 1, 9),
              endDate: new Date(2021, 1, 1, 10),
              humanId: 18
            },
            groupByDate: false,
            scrollCoordinates: {x: 9500},
            expectedAppointmentCount: 1
          }, {
            appointment: {
              text: 'b',
              startDate: new Date(2021, 1, 1, 9),
              endDate: new Date(2021, 1, 1, 10),
              humanId: 0
            },
            groupByDate: false,
            scrollCoordinates: {x: 9500},
            expectedAppointmentCount: 0
          }, {
            appointment: {
              text: 'c',
              startDate: new Date(2021, 1, 1, 9),
              endDate: new Date(2021, 1, 1, 10),
              humanId: 18
            },
            groupByDate: true,
            scrollCoordinates: {x: 3000},
            expectedAppointmentCount: 1
          }].forEach(function($__5) {
            var $__6 = $__5,
                appointment = $__6.appointment,
                groupByDate = $__6.groupByDate,
                scrollCoordinates = $__6.scrollCoordinates,
                expectedAppointmentCount = $__6.expectedAppointmentCount;
            test(("After scrolling appointment count in DOM should be " + expectedAppointmentCount + "\n            when groupByDate is " + groupByDate), function(assert) {
              var resources = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}, {id: 13}, {id: 14}, {id: 15}, {id: 16}, {id: 17}, {id: 18}, {id: 19}];
              var scheduler = createWrapper({
                height: 600,
                width: 600,
                currentDate: new Date(2021, 1, 2),
                dataSource: [appointment],
                views: [{
                  type: 'month',
                  groupOrientation: 'horizontal'
                }],
                currentView: 'month',
                scrolling: {mode: 'virtual'},
                groups: ['humanId'],
                resources: [{
                  fieldExpr: 'humanId',
                  dataSource: resources
                }],
                groupByDate: groupByDate
              });
              var workspace = scheduler.instance.getWorkSpace();
              var scrollable = workspace.getScrollable();
              workspace.renderer.getRenderTimeout = function() {
                return -1;
              };
              return asyncWrapper(assert, function(promise) {
                promise = asyncScrollTest(assert, promise, function() {
                  var appointmentCount = scheduler.appointmentList.length;
                  assert.equal(appointmentCount, expectedAppointmentCount, 'DOM contain right count of appoinments');
                }, scrollable, scrollCoordinates);
                return promise;
              });
            });
          });
        });
        module('CSS customization', function() {
          module('Vertical orientation', function() {
            supportedViews.forEach(function(viewName) {
              test(("Cell height should be correct in \"" + viewName + "\" view"), function(assert) {
                var $style = $('<style nonce="qunit-test">');
                var styleBefore = $style.text();
                $style.text('#scheduler .dx-scheduler-cell-sizes-vertical { height: 80px } ').appendTo('head');
                var instance = createWrapper({
                  views: [{type: viewName}],
                  currentView: viewName,
                  scrolling: {
                    mode: 'virtual',
                    orientation: 'vertical'
                  },
                  height: 400
                }).instance;
                var virtualScrollingDispatcher = instance.getWorkSpace().virtualScrollingDispatcher;
                assert.equal(virtualScrollingDispatcher.rowHeight, 80, 'Cell height is correct');
                $style.text(styleBefore);
              });
            });
          });
          module('Horizontal orientation', function() {
            supportedViews.forEach(function(viewName) {
              test(("Cell width should be correct in \"" + viewName + "\" view"), function(assert) {
                var $style = $('<style nonce="qunit-test">');
                var styleBefore = $style.text();
                $style.text('#scheduler .dx-scheduler-cell-sizes-horizontal { width: 120px } ').appendTo('head');
                var instance = createWrapper({
                  views: [{
                    type: viewName,
                    intervalCount: 10
                  }],
                  currentView: viewName,
                  scrolling: {
                    mode: 'virtual',
                    orientation: 'horizontal'
                  },
                  crossScrollingEnabled: true,
                  height: 400,
                  width: 600
                }).instance;
                var virtualScrollingDispatcher = instance.getWorkSpace().virtualScrollingDispatcher;
                assert.equal(virtualScrollingDispatcher.cellWidth, 120, 'Cell width is correct');
                $style.text(styleBefore);
              });
            });
          });
        });
        module('Markup', function() {
          [true, false].forEach(function(showAllDayPanel) {
            test(("MonthView's groupPanel and dateTable should have correct height when showAllDayPanel: \"" + showAllDayPanel + "\" and vertical grouping is used"), function(assert) {
              var workSpace = createWrapper({
                views: [{
                  type: 'month',
                  groupOrientation: 'vertical'
                }],
                currentView: 'month',
                currentDate: new Date(2020, 11, 29),
                groups: ['priorityId'],
                resources: [{
                  fieldExpr: 'priorityId',
                  allowMultiple: false,
                  dataSource: [{id: 1}, {id: 2}]
                }],
                height: 500,
                showAllDayPanel: showAllDayPanel
              }).workSpace;
              var cellHeight = workSpace.getCellHeight();
              var calculatedHeight = 12 * cellHeight;
              var dateTableHeight = workSpace.getDateTable().outerHeight();
              var groupPanelHeight = workSpace.groups.getVerticalGroupPanel().outerHeight();
              assert.equal(dateTableHeight, calculatedHeight, 'Correct dateTable height');
              assert.equal(groupPanelHeight, calculatedHeight, 'Correct groupPanel height');
            });
          });
          test('AllDayPanel should have correct height if all day appointments out of viewport', function(assert) {
            var workSpace = createWrapper({
              height: 600,
              width: 800,
              currentDate: new Date(2021, 8, 6),
              dataSource: [{
                text: 'Test',
                startDate: new Date(2021, 8, 11, 9, 30),
                resourceId: [5],
                allDay: true
              }],
              startDayHour: 9,
              endDayHour: 18,
              currentView: 'week',
              scrolling: {
                mode: 'virtual',
                type: 'both'
              },
              groups: ['resourceId'],
              resources: [{
                fieldExpr: 'resourceId',
                dataSource: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
              }]
            }).workSpace;
            assert.equal(workSpace.getAllDayCellHeight(), 75, 'AllDayPanel height is correct');
          });
          QUnit.test('WorkSpace elements should have correct height when there are a log of groups in timeline month', function(assert) {
            var scheduler = createWrapper({
              views: ['timelineMonth'],
              currentView: 'timelineMonth',
              currentDate: new Date(2021, 2, 6),
              scrolling: {
                mode: 'virtual',
                type: 'both'
              },
              groups: ['resourceId'],
              resources: [{
                fieldExpr: 'resourceId',
                dataSource: [{
                  id: 1,
                  text: '1'
                }, {
                  id: 2,
                  text: '2'
                }, {
                  id: 3,
                  text: '3'
                }, {
                  id: 4,
                  text: '4'
                }, {
                  id: 5,
                  text: '5'
                }, {
                  id: 6,
                  text: '6'
                }, {
                  id: 7,
                  text: '7'
                }, {
                  id: 8,
                  text: '8'
                }, {
                  id: 9,
                  text: '9'
                }, {
                  id: 10,
                  text: '10'
                }, {
                  id: 11,
                  text: '11'
                }, {
                  id: 12,
                  text: '12'
                }, {
                  id: 13,
                  text: '13'
                }, {
                  id: 14,
                  text: '14'
                }, {
                  id: 15,
                  text: '15'
                }, {
                  id: 16,
                  text: '16'
                }]
              }],
              height: 500,
              width: 800
            });
            var groupPanelHeight = scheduler.workSpace.groups.getGroupsContainer().outerHeight();
            assert.equal(groupPanelHeight, 800, 'GroupPanel height is correct');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/window","generic_light.css!","data/data_source/data_source","../../helpers/scheduler/helpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/window"), require("generic_light.css!"), require("data/data_source/data_source"), require("../../helpers/scheduler/helpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=virtual_scrolling.integration.tests.js.map