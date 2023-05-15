!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/virtual_scrolling.timeline.tests.js"], ["generic_light.css!","../../helpers/scheduler/helpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/virtual_scrolling.timeline.tests.js", ["generic_light.css!", "../../helpers/scheduler/helpers.js"], function($__export) {
  "use strict";
  var createWrapper,
      initTestMarkup,
      isDesktopEnvironment,
      asyncScrollTest,
      asyncWrapper,
      testStart,
      module,
      test,
      printOffset;
  return {
    setters: [function($__m) {}, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
      isDesktopEnvironment = $__m.isDesktopEnvironment;
      asyncScrollTest = $__m.asyncScrollTest;
      asyncWrapper = $__m.asyncWrapper;
    }],
    execute: function() {
      var $__3;
      (($__3 = QUnit, testStart = $__3.testStart, module = $__3.module, $__3));
      test = function(description, callback) {
        var testFunc = !isDesktopEnvironment() ? QUnit.skip : QUnit.test;
        return testFunc(description, callback);
      };
      printOffset = function(offset) {
        return [offset.x >= 0 ? ("offset.x: " + offset.x) : '', offset.y >= 0 ? ("offset.y: " + offset.y) : ''].join(',');
      };
      testStart(function() {
        return initTestMarkup();
      });
      module('Virtual scrolling timelines', function() {
        module('Appointments', function() {
          module('timelineDay', function() {
            test('multiday appointment should be rendered correctly', function(assert) {
              var data = [{
                text: 'Appt-001',
                startDate: new Date(2021, 1, 2, 15, 45),
                endDate: new Date(2021, 1, 3, 10, 15)
              }];
              var scheduler = createWrapper({
                dataSource: data,
                views: [{
                  type: 'timelineDay',
                  intervalCount: 2
                }],
                currentView: 'timelineDay',
                currentDate: new Date(2021, 1, 2),
                firstDayOfWeek: 0,
                startDayHour: 8,
                endDayHour: 20,
                cellDuration: 30,
                scrolling: {
                  mode: 'virtual',
                  orientation: 'both'
                },
                width: 800,
                height: 600
              });
              var scrollable = scheduler.instance.getWorkSpaceScrollable();
              return asyncWrapper(assert, function(promise) {
                [{
                  offset: {x: 0},
                  expectedRects: []
                }, {
                  offset: {x: 2200},
                  expectedRects: [{
                    left: -9099,
                    top: -9827,
                    width: 300
                  }]
                }, {
                  offset: {x: 3200},
                  expectedRects: [{
                    left: -10099,
                    top: -9827,
                    width: 1300
                  }]
                }, {
                  offset: {x: 4200},
                  expectedRects: [{
                    left: -10399,
                    top: -9827,
                    width: 1600
                  }]
                }, {
                  offset: {x: 5200},
                  expectedRects: [{
                    left: -10399,
                    top: -9827,
                    width: 900
                  }]
                }, {
                  offset: {x: 6200},
                  expectedRects: []
                }].forEach(function($__4) {
                  var $__5 = $__4,
                      offset = $__5.offset,
                      expectedRects = $__5.expectedRects;
                  promise = asyncScrollTest(assert, promise, function() {
                    assert.ok(true, printOffset(offset));
                    var appointments = scheduler.appointments;
                    assert.equal(expectedRects.length, appointments.getAppointmentCount(), 'Appointment amount is correct');
                    expectedRects.forEach(function(expectedRect, index) {
                      var appointmentRect = appointments.getAppointment(index).get(0).getBoundingClientRect();
                      assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, 'appointment left is correct');
                      assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, 'appointment top is correct');
                      assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, 'appointment width is correct');
                    });
                  }, scrollable, offset);
                });
                return promise;
              });
            });
          });
          module('Vertical grouping', function() {
            module('timelineDay', function() {
              test('appointments should be rendered correctly', function(assert) {
                var data = [{
                  text: 'Appt-001',
                  ownerId: [3],
                  startDate: new Date(2021, 1, 2, 10, 0),
                  endDate: new Date(2021, 1, 2, 13, 0),
                  priority: 1
                }, {
                  text: 'Appt-002',
                  ownerId: [2],
                  startDate: new Date(2021, 1, 2, 12, 0),
                  endDate: new Date(2021, 1, 2, 15, 45),
                  priority: 1
                }, {
                  text: 'Appt-003',
                  ownerId: [3],
                  startDate: new Date(2021, 1, 2, 15, 45),
                  endDate: new Date(2021, 1, 3, 10, 15),
                  priority: 2
                }, {
                  text: 'Appt-004',
                  ownerId: [2, 1],
                  startDate: new Date(2021, 1, 2, 20, 0),
                  endDate: new Date(2021, 1, 3, 6, 0),
                  priority: 1
                }];
                var scheduler = createWrapper({
                  dataSource: data,
                  views: [{
                    type: 'timelineDay',
                    intervalCount: 2
                  }],
                  currentView: 'timelineDay',
                  currentDate: new Date(2021, 1, 2),
                  firstDayOfWeek: 0,
                  startDayHour: 0,
                  endDayHour: 24,
                  cellDuration: 20,
                  resources: [{
                    fieldExpr: 'ownerId',
                    allowMultiple: true,
                    dataSource: [{id: 1}, {id: 2}, {id: 3}],
                    label: 'Owner'
                  }, {
                    fieldExpr: 'priority',
                    allowMultiple: false,
                    dataSource: [{id: 1}, {id: 2}, {id: 3}],
                    label: 'Priority'
                  }],
                  groups: ['ownerId'],
                  scrolling: {
                    mode: 'virtual',
                    orientation: 'horizontal'
                  },
                  width: 800,
                  height: 600
                });
                var scrollable = scheduler.instance.getWorkSpaceScrollable();
                return asyncWrapper(assert, function(promise) {
                  [{
                    offset: {x: 0},
                    expectedRects: []
                  }, {
                    offset: {x: 5200},
                    expectedRects: [{
                      left: -9099,
                      top: -9528,
                      width: 400
                    }]
                  }, {
                    offset: {x: 6200},
                    expectedRects: [{
                      left: -10099,
                      top: -9528,
                      width: 1400
                    }, {
                      left: -8899,
                      top: -9677,
                      width: 200
                    }]
                  }, {
                    offset: {x: 7200},
                    expectedRects: [{
                      left: -10299,
                      top: -9528,
                      width: 1000
                    }, {
                      left: -9899,
                      top: -9677,
                      width: 1200
                    }]
                  }, {
                    offset: {x: 8200},
                    expectedRects: [{
                      left: -10299,
                      top: -9677,
                      width: 1650
                    }]
                  }, {
                    offset: {x: 9200},
                    expectedRects: [{
                      left: -10299,
                      top: -9677,
                      width: 650
                    }, {
                      left: -9649,
                      top: -9528,
                      width: 950
                    }]
                  }, {
                    offset: {x: 10200},
                    expectedRects: [{
                      left: -10299,
                      top: -9528,
                      width: 1600
                    }]
                  }, {
                    offset: {x: 12000},
                    expectedRects: [{
                      left: -10299,
                      top: -9528,
                      width: 1600
                    }, {
                      left: -9899,
                      top: -9827,
                      width: 1200
                    }, {
                      left: -9899,
                      top: -9677,
                      width: 1200
                    }]
                  }, {
                    offset: {x: 13000},
                    expectedRects: [{
                      left: -10299,
                      top: -9528,
                      width: 1600
                    }, {
                      left: -10299,
                      top: -9827,
                      width: 1600
                    }, {
                      left: -10299,
                      top: -9677,
                      width: 1600
                    }]
                  }, {
                    offset: {x: 14000},
                    expectedRects: [{
                      left: -10299,
                      top: -9528,
                      width: 1600
                    }, {
                      left: -10299,
                      top: -9827,
                      width: 1600
                    }, {
                      left: -10299,
                      top: -9677,
                      width: 1600
                    }]
                  }, {
                    offset: {x: 15000},
                    expectedRects: [{
                      left: -10299,
                      top: -9528,
                      width: 1600
                    }, {
                      left: -10299,
                      top: -9827,
                      width: 1600
                    }, {
                      left: -10299,
                      top: -9677,
                      width: 1600
                    }]
                  }, {
                    offset: {x: 17000},
                    expectedRects: [{
                      left: -10299,
                      top: -9528,
                      width: 1600
                    }, {
                      left: -10299,
                      top: -9827,
                      width: 1400
                    }, {
                      left: -10299,
                      top: -9677,
                      width: 1400
                    }]
                  }, {
                    offset: {x: 17500},
                    expectedRects: [{
                      left: -10399,
                      top: -9528,
                      width: 1600
                    }, {
                      left: -10399,
                      top: -9827,
                      width: 1000
                    }, {
                      left: -10399,
                      top: -9677,
                      width: 1000
                    }]
                  }, {
                    offset: {x: 18000},
                    expectedRects: [{
                      left: -10299,
                      top: -9528,
                      width: 1600
                    }, {
                      left: -10299,
                      top: -9827,
                      width: 400
                    }, {
                      left: -10299,
                      top: -9677,
                      width: 400
                    }]
                  }, {
                    offset: {x: 19000},
                    expectedRects: [{
                      left: -10299,
                      top: -9528,
                      width: 1600
                    }]
                  }, {
                    offset: {x: 20000},
                    expectedRects: [{
                      left: -10299,
                      top: -9528,
                      width: 950
                    }]
                  }, {
                    offset: {x: 20500},
                    expectedRects: [{
                      left: -10399,
                      top: -9528,
                      width: 550
                    }]
                  }, {
                    offset: {x: 20800},
                    expectedRects: [{
                      left: -10299,
                      top: -9528,
                      width: 150
                    }]
                  }, {
                    offset: {x: 21200},
                    expectedRects: []
                  }].forEach(function($__4) {
                    var $__5 = $__4,
                        offset = $__5.offset,
                        expectedRects = $__5.expectedRects;
                    promise = asyncScrollTest(assert, promise, function() {
                      assert.ok(true, printOffset(offset));
                      var appointments = scheduler.appointments;
                      assert.equal(expectedRects.length, appointments.getAppointmentCount(), 'Appointment amount is correct');
                      expectedRects.forEach(function(expectedRect, index) {
                        var appointmentRect = appointments.getAppointment(index).get(0).getBoundingClientRect();
                        assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, ("appointment#" + index + " left is correct"));
                        assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, ("appointment#" + index + " top is correct"));
                        assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, ("appointment#" + index + " width is correct"));
                      });
                    }, scrollable, offset);
                  });
                  return promise;
                });
              });
            });
            module('timelineWeek', function() {
              test('multiday appointment should be rendered correctly in timelineWeek view with grouping', function(assert) {
                var scheduler = createWrapper({
                  height: 600,
                  width: 800,
                  dataSource: [{
                    startDate: new Date(2021, 8, 5, 9),
                    endDate: new Date(2021, 8, 11, 10),
                    resourceId: 1
                  }],
                  views: [{
                    type: 'timelineWeek',
                    groupOrientation: 'vertical',
                    intervalCount: 2
                  }],
                  startDayHour: 9,
                  endDayHour: 18,
                  currentView: 'timelineWeek',
                  scrolling: {
                    mode: 'virtual',
                    orientation: 'both'
                  },
                  showAllDayPanel: false,
                  currentDate: new Date(2021, 8, 6),
                  groups: ['resourceId'],
                  resources: [{
                    fieldExpr: 'resourceId',
                    dataSource: [{id: 0}, {id: 1}]
                  }]
                });
                var scrollable = scheduler.instance.getWorkSpaceScrollable();
                return asyncWrapper(assert, function(promise) {
                  [{
                    offset: {x: 0},
                    expectedRects: [{
                      left: -9899,
                      top: -9603,
                      width: 1200
                    }]
                  }, {
                    offset: {x: 10000},
                    expectedRects: [{
                      left: -10299,
                      top: -9603,
                      width: 1600
                    }]
                  }, {
                    offset: {x: 20000},
                    expectedRects: [{
                      left: -10299,
                      top: -9603,
                      width: 1600
                    }]
                  }, {
                    offset: {x: 21700},
                    expectedRects: [{
                      left: -10399,
                      top: -9603,
                      width: 800
                    }]
                  }, {
                    offset: {x: 23000},
                    expectedRects: []
                  }].forEach(function($__4) {
                    var $__5 = $__4,
                        offset = $__5.offset,
                        expectedRects = $__5.expectedRects;
                    promise = asyncScrollTest(assert, promise, function() {
                      assert.ok(true, printOffset(offset));
                      var appointments = scheduler.appointments;
                      assert.equal(expectedRects.length, appointments.getAppointmentCount(), 'Appointment amount is correct');
                      expectedRects.forEach(function(expectedRect, index) {
                        var appointmentRect = appointments.getAppointment(index).get(0).getBoundingClientRect();
                        assert.roughEqual(appointmentRect.left, expectedRect.left, 2.01, 'appointment left is correct');
                        assert.roughEqual(appointmentRect.top, expectedRect.top, 2.01, 'appointment top is correct');
                        assert.roughEqual(appointmentRect.width, expectedRect.width, 2.01, 'appointment width is correct');
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
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","../../helpers/scheduler/helpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("../../helpers/scheduler/helpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=virtual_scrolling.timeline.tests.js.map