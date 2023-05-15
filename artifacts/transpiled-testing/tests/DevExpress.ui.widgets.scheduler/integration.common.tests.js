!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/integration.common.tests.js"], ["../../helpers/scheduler/helpers.js","generic_light.css!","ui/scheduler/ui.scheduler"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/integration.common.tests.js", ["../../helpers/scheduler/helpers.js", "generic_light.css!", "ui/scheduler/ui.scheduler"], function($__export) {
  "use strict";
  var createWrapper,
      initTestMarkup,
      isDesktopEnvironment,
      testStart,
      module,
      test;
  return {
    setters: [function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
      isDesktopEnvironment = $__m.isDesktopEnvironment;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__3;
      (($__3 = QUnit, testStart = $__3.testStart, module = $__3.module, test = $__3.test, $__3));
      testStart(function() {
        return initTestMarkup();
      });
      if (isDesktopEnvironment()) {
        module('Scrolling', function() {
          var resourcesData = [{
            text: 'A',
            id: 1
          }, {
            text: 'B',
            id: 2
          }, {
            text: 'C',
            id: 3
          }, {
            text: 'D',
            id: 4
          }];
          var priorityData = [{
            text: 'A',
            id: 1
          }, {
            text: 'B',
            id: 2
          }, {
            text: 'C',
            id: 3
          }];
          var createScheduler = function() {
            return createWrapper({
              dataSource: [],
              views: ['timelineMonth'],
              currentView: 'timelineMonth',
              crossScrollingEnabled: true,
              groups: ['priority', 'resource'],
              resources: [{
                fieldExpr: 'priority',
                dataSource: priorityData,
                label: 'Priority'
              }, {
                fieldExpr: 'resource',
                dataSource: resourcesData,
                label: 'Resource'
              }],
              height: 580
            });
          };
          var getScrollableArray = function(scheduler) {
            var $__4 = scheduler.workSpace,
                getHeaderScrollable = $__4.getHeaderScrollable,
                getDateTableScrollable = $__4.getDateTableScrollable,
                getSideBarScrollable = $__4.getSideBarScrollable;
            return [getHeaderScrollable().dxScrollable('instance'), getDateTableScrollable().dxScrollable('instance'), getSideBarScrollable().dxScrollable('instance')];
          };
          test('Header scroll should do dateTable scroll', function(assert) {
            var $__5,
                $__6;
            var done = assert.async();
            var scheduler = createScheduler();
            var $__4 = getScrollableArray(scheduler),
                header = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value),
                dateTable = ($__6 = $__5.next()).done ? void 0 : $__6.value,
                sideBar = ($__6 = $__5.next()).done ? void 0 : $__6.value;
            header.scrollTo({left: 100});
            setTimeout(function() {
              assert.equal(header.scrollLeft(), 100, 'header was scrolled');
              assert.equal(dateTable.scrollTop(), 0, 'date table wasn\'t scrolled vertically');
              assert.equal(dateTable.scrollLeft(), 100, 'date table was scrolled horizontally');
              assert.equal(sideBar.scrollTop(), 0, 'sidebar wasn\'t scrolled');
              done();
            });
          });
          test('DateTable vertical scroll should do sidebar scroll', function(assert) {
            var $__5,
                $__6;
            var done = assert.async();
            var scheduler = createScheduler();
            var $__4 = getScrollableArray(scheduler),
                header = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value),
                dateTable = ($__6 = $__5.next()).done ? void 0 : $__6.value,
                sideBar = ($__6 = $__5.next()).done ? void 0 : $__6.value;
            dateTable.scrollTo({top: 100});
            setTimeout(function() {
              assert.equal(header.scrollLeft(), 0, 'header wasn\'t scrolled');
              assert.equal(dateTable.scrollTop(), 100, 'date table was scrolled vertically');
              assert.equal(dateTable.scrollLeft(), 0, 'date table wasn\'t scrolled horizontally');
              assert.equal(sideBar.scrollTop(), 100, 'sidebar was scrolled');
              done();
            });
          });
          test('DateTable horizontal scroll should do header scroll', function(assert) {
            var $__5,
                $__6;
            var done = assert.async();
            var scheduler = createScheduler();
            var $__4 = getScrollableArray(scheduler),
                header = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value),
                dateTable = ($__6 = $__5.next()).done ? void 0 : $__6.value,
                sideBar = ($__6 = $__5.next()).done ? void 0 : $__6.value;
            dateTable.scrollTo({left: 100});
            setTimeout(function() {
              assert.equal(header.scrollLeft(), 100, 'header was scrolled');
              assert.equal(dateTable.scrollTop(), 0, 'date table wasn\'t scrolled vertically');
              assert.equal(dateTable.scrollLeft(), 100, 'date table was scrolled horizontally');
              assert.equal(sideBar.scrollTop(), 0, 'sidebar wasn\'t scrolled');
              done();
            });
          });
          test('DateTable vertical & horizontal scroll should do sidebar & header scroll', function(assert) {
            var $__5,
                $__6;
            var done = assert.async();
            var scheduler = createScheduler();
            var $__4 = getScrollableArray(scheduler),
                header = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value),
                dateTable = ($__6 = $__5.next()).done ? void 0 : $__6.value,
                sideBar = ($__6 = $__5.next()).done ? void 0 : $__6.value;
            dateTable.scrollTo({
              left: 100,
              top: 100
            });
            setTimeout(function() {
              assert.equal(header.scrollLeft(), 100, 'header was scrolled');
              assert.equal(dateTable.scrollTop(), 100, 'date table was scrolled vertically');
              assert.equal(dateTable.scrollLeft(), 100, 'date table was scrolled horizontally');
              assert.equal(sideBar.scrollTop(), 100, 'sidebar was scrolled');
              done();
            });
          });
          test('Sidebar scroll should call dateTable scroll', function(assert) {
            var $__5,
                $__6;
            var done = assert.async();
            var scheduler = createScheduler();
            var $__4 = getScrollableArray(scheduler),
                header = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value),
                dateTable = ($__6 = $__5.next()).done ? void 0 : $__6.value,
                sideBar = ($__6 = $__5.next()).done ? void 0 : $__6.value;
            sideBar.scrollTo({top: 100});
            setTimeout(function() {
              assert.equal(header.scrollLeft(), 0, 'header wasn\'t scrolled');
              assert.equal(dateTable.scrollTop(), 100, 'date table was scrolled vertically');
              assert.equal(dateTable.scrollLeft(), 0, 'date table wasn\'t scrolled horizontally');
              assert.equal(sideBar.scrollTop(), 100, 'sidebar was scrolled');
              done();
            });
          });
        });
      }
      module('Views:startDate property', function() {
        module('Month', function() {
          test('if set startDate shouldn\'t throw exception(T828646)', function(assert) {
            var data = [{
              text: 'Google AdWords Strategy',
              startDate: new Date(2019, 10, 1, 9, 0, 0),
              endDate: new Date(2019, 10, 1, 10, 30, 0)
            }, {
              text: 'New Brochures',
              startDate: new Date(2019, 11, 1, 11, 30, 0),
              endDate: new Date(2019, 11, 1, 14, 15, 0)
            }];
            var scheduler = createWrapper({
              dataSource: data,
              views: [{
                type: 'month',
                startDate: new Date(2019, 9, 30)
              }],
              currentView: 'month',
              currentDate: new Date(2019, 10, 1),
              height: 580
            });
            var navigator = scheduler.header.navigator;
            assert.equal(scheduler.appointments.find(data[0].text).length, 1, ("appointment '" + data[0].text + "' should render"));
            assert.equal(scheduler.appointments.find(data[1].text).length, 1, ("appointment '" + data[1].text + "' should render"));
            assert.equal(scheduler.workSpace.getCell(1, 3).children().text(), '06', 'cell date should be equal 6');
            navigator.nextButton.click();
            assert.equal(scheduler.appointments.find(data[0].text).length, 0, ("appointment '" + data[0].text + "' shouldn't render after change navigator on next month"));
            assert.equal(scheduler.appointments.find(data[1].text).length, 1, ("appointment '" + data[1].text + "' should render after change navigator on next month"));
            assert.equal(scheduler.workSpace.getCell(1, 3).children().text(), '11', 'cell date should be equal 11 after change navigator on next month');
            navigator.prevButton.click();
            navigator.prevButton.click();
            assert.equal(scheduler.appointments.find(data[0].text).length, 1, ("appointment '" + data[0].text + "' should render after change navigator on two months ago"));
            assert.equal(scheduler.appointments.find(data[1].text).length, 0, ("appointment '" + data[1].text + "' shouldn't render after change navigator two months ago"));
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/scheduler/helpers.js","generic_light.css!","ui/scheduler/ui.scheduler"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/scheduler/helpers.js"), require("generic_light.css!"), require("ui/scheduler/ui.scheduler"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=integration.common.tests.js.map