!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/header.viewSwitcher.tests.js"], ["../../helpers/scheduler/helpers.js","ui/themes","core/devices"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/header.viewSwitcher.tests.js", ["../../helpers/scheduler/helpers.js", "ui/themes", "core/devices"], function($__export) {
  "use strict";
  var createWrapper,
      initTestMarkup,
      testStart,
      test,
      module,
      themes,
      devices;
  return {
    setters: [function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }],
    execute: function() {
      var $__2;
      (($__2 = QUnit, testStart = $__2.testStart, test = $__2.test, module = $__2.module, $__2));
      testStart(function() {
        return initTestMarkup();
      });
      if (devices.current().deviceType === 'desktop') {
        test('should pass the "views" option', function(assert) {
          var scheduler = createWrapper({
            views: ['day', 'week', 'month'],
            currentView: 'day'
          });
          var viewSwitcher = scheduler.header.viewSwitcher;
          assert.equal(viewSwitcher.getButton('Day').getElement().length, 1, 'Day button displayed');
          assert.equal(viewSwitcher.getButton('Week').getElement().length, 1, 'Week button displayed');
          assert.equal(viewSwitcher.getButton('Month').getElement().length, 1, 'Month button displayed');
        });
        module('Option Changing', function() {
          test('should pass the "views" option', function(assert) {
            var scheduler = createWrapper({
              views: ['day', 'week', 'month'],
              currentView: 'day'
            });
            scheduler.option('views', [{
              type: 'week',
              name: 'WEEK'
            }, {
              type: 'day',
              name: 'dAy'
            }, {
              type: 'timelineWeek',
              name: 'TiMiLine'
            }, {type: 'week'}, 'workWeek']);
            var viewSwitcher = scheduler.header.viewSwitcher;
            assert.equal(viewSwitcher.getButton('WEEK').getElement().length, 1, '"WEEK" button has correct name');
            assert.equal(viewSwitcher.getButton('dAy').getElement().length, 1, '"dAy" button has correct name');
            assert.equal(viewSwitcher.getButton('TiMiLine').getElement().length, 1, '"TiMiLine" button has correct name');
            assert.equal(viewSwitcher.getButton('Work Week').getElement().length, 1, '"Work Week" button has correct name');
          });
          test('should select view button after changing "currentView"', function(assert) {
            var scheduler = createWrapper({
              views: [{type: 'month'}, {
                type: 'day',
                name: 'TestDay'
              }, 'week'],
              currentView: 'month'
            });
            var viewSwitcher = scheduler.header.viewSwitcher;
            assert.equal(viewSwitcher.selectedButton.getText(), 'Month', 'current view is correct');
            scheduler.option('currentView', 'week');
            assert.equal(viewSwitcher.selectedButton.getText(), 'Week', 'current view is correct');
            scheduler.option('currentView', 'TestDay');
            assert.equal(viewSwitcher.selectedButton.getText(), 'TestDay', 'current view is correct');
            scheduler.option('currentView', 'month');
            assert.equal(viewSwitcher.selectedButton.getText(), 'Month', 'current view is correct');
          });
          test('should select view button after changing "currentView" and "views"', function(assert) {
            var scheduler = createWrapper({
              views: ['day', 'week'],
              currentView: 'day',
              currentDate: new Date(2021, 6, 7)
            });
            var viewSwitcher = scheduler.header.viewSwitcher;
            scheduler.option('currentView', 'month');
            assert.equal(viewSwitcher.selectedButton.getText(), '', 'no one button is selected');
            scheduler.option('views', ['day', 'month']);
            assert.equal(viewSwitcher.selectedButton.getText(), 'Month', 'Month button is selected');
          });
          test('should save selected view button when "views" changes', function(assert) {
            var scheduler = createWrapper({
              views: ['month', 'day'],
              currentView: 'day'
            });
            var viewSwitcher = scheduler.header.viewSwitcher;
            scheduler.option('views', ['month', 'week', 'day']);
            assert.equal(viewSwitcher.selectedButton.getText(), 'Day', 'current view is Day');
          });
          test('should render dropDownButton after enabling "useDropDownViewSwitcher"', function(assert) {
            var scheduler = createWrapper({
              views: ['month', 'day'],
              currentView: 'day'
            });
            var viewSwitcher = scheduler.header.viewSwitcher;
            assert.equal(viewSwitcher.getText(), 'MonthDay', 'before option changing displayed all views');
            scheduler.option('useDropDownViewSwitcher', true);
            assert.equal(viewSwitcher.getText(), 'Day', 'after option chaning displayed only dropDownButton label');
          });
        });
        module('Selected view', function() {
          test('should be no buttons selected if the "currentView" is not set', function(assert) {
            var scheduler = createWrapper({views: ['month']});
            assert.equal(scheduler.header.viewSwitcher.selectedButton.getText(), '', 'no one element is selected');
          });
          test('should be no buttons selected if the "currentView" is not in views', function(assert) {
            var scheduler = createWrapper({
              views: ['month'],
              currentView: 'day'
            });
            assert.equal(scheduler.header.viewSwitcher.selectedButton.getText(), '', 'no one element is selected');
          });
          test('should be the selected button if "currentView" in views', function(assert) {
            var scheduler = createWrapper({
              currentView: 'month',
              views: ['month']
            });
            assert.equal(scheduler.header.viewSwitcher.selectedButton.getText(), 'Month', 'currentView button is selected');
          });
          test('should select view button after click', function(assert) {
            var scheduler = createWrapper({
              views: [{type: 'month'}, {
                type: 'day',
                name: 'TestDay'
              }, {
                type: 'workWeek',
                name: 'workWeek'
              }, 'week'],
              currentView: 'month'
            });
            var viewSwitcher = scheduler.header.viewSwitcher;
            assert.equal(viewSwitcher.selectedButton.getText(), 'Month', 'Month view button is selected');
            viewSwitcher.getButton('Week').click();
            assert.equal(viewSwitcher.selectedButton.getText(), 'Week', 'Week view button is selected');
            viewSwitcher.getButton('workWeek').click();
            assert.equal(viewSwitcher.selectedButton.getText(), 'workWeek', 'workWeek view button is selected');
            viewSwitcher.getButton('TestDay').click();
            assert.equal(viewSwitcher.selectedButton.getText(), 'TestDay', 'TestDay view button is selected');
            viewSwitcher.getButton('Month').click();
            assert.equal(viewSwitcher.selectedButton.getText(), 'Month', 'Month view button is selected');
          });
        });
      }
      module('Meterial theme', {
        beforeEach: function() {
          this.origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
        },
        afterEach: function() {
          themes.isMaterial = this.origIsMaterial;
        }
      }, function() {
        test('dropdown button should have correct label', function(assert) {
          var scheduler = createWrapper({
            currentView: 'workWeek',
            views: ['workWeek']
          });
          assert.equal(scheduler.header.viewSwitcher.getText(), 'Work Week', 'view switcher should have correct label');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/scheduler/helpers.js","ui/themes","core/devices"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/scheduler/helpers.js"), require("ui/themes"), require("core/devices"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=header.viewSwitcher.tests.js.map