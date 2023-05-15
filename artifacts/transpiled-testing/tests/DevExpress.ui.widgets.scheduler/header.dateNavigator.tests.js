!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/header.dateNavigator.tests.js"], ["../../helpers/scheduler/helpers.js","core/devices"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/header.dateNavigator.tests.js", ["../../helpers/scheduler/helpers.js", "core/devices"], function($__export) {
  "use strict";
  var createWrapper,
      initTestMarkup,
      testStart,
      test,
      module,
      devices;
  return {
    setters: [function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
    }, function($__m) {
      devices = $__m.default;
    }],
    execute: function() {
      var $__2;
      (($__2 = QUnit, testStart = $__2.testStart, test = $__2.test, module = $__2.module, $__2));
      testStart(function() {
        return initTestMarkup();
      });
      test('should has correct caption', function(assert) {
        var scheduler = createWrapper({
          views: ['week'],
          currentView: 'week',
          currentDate: new Date(2021, 4, 7)
        });
        assert.equal(scheduler.header.navigator.getText(), '2-8 May 2021');
      });
      test('should has correct caption(with firstDayOfWeek)', function(assert) {
        var scheduler = createWrapper({
          views: ['week'],
          currentView: 'week',
          firstDayOfWeek: 3,
          currentDate: new Date(2021, 4, 7)
        });
        assert.equal(scheduler.header.navigator.getText(), '5-11 May 2021');
      });
      test('should has correct caption(with intervalCount and startDate in view)', function(assert) {
        var scheduler = createWrapper({
          currentView: 'week',
          views: [{
            type: 'week',
            intervalCount: 3,
            startDate: new Date(2021, 4, 5)
          }],
          currentDate: new Date(2021, 4, 7)
        });
        assert.equal(scheduler.header.navigator.getText(), '2-22 May 2021');
      });
      test('should has correct caption(with agendaDuration)', function(assert) {
        var scheduler = createWrapper({
          currentView: 'agenda',
          views: [{
            type: 'agenda',
            agendaDuration: 4
          }],
          firstDayOfWeek: 3,
          currentDate: new Date(2021, 4, 7)
        });
        assert.equal(scheduler.header.navigator.getText(), '7-10 May 2021');
      });
      test('should display correct caption after changing to day view if startDate is settled in views', function(assert) {
        var scheduler = createWrapper({
          currentDate: new Date(2021, 6, 28),
          currentView: 'month',
          views: ['month', {
            type: 'day',
            intervalCount: 3,
            startDate: new Date(2021, 6, 30)
          }]
        });
        scheduler.option('currentView', 'day');
        var expectedCaption = devices.current().deviceType === 'desktop' ? '27-29 July 2021' : '27-29 Jul 2021';
        assert.equal(scheduler.header.navigator.caption.getText(), expectedCaption, 'caption must take into account startDate');
      });
      test('should display correct caption after changing to month view if startDate is settled in views', function(assert) {
        var scheduler = createWrapper({
          currentDate: new Date(2021, 6, 28),
          currentView: 'day',
          views: ['day', {
            type: 'month',
            intervalCount: 3,
            startDate: new Date(2021, 5, 30)
          }]
        });
        scheduler.option('currentView', 'month');
        assert.equal(scheduler.header.navigator.caption.getText(), 'Jun-Aug 2021', 'caption must take into account startDate');
      });
      test('should display correct caption after switching to the next week', function(assert) {
        var scheduler = createWrapper({
          currentDate: new Date(2021, 8, 22),
          views: [{
            type: 'workWeek',
            startDayHour: 10,
            endDayHour: 19
          }],
          currentView: 'workWeek'
        });
        var navigator = scheduler.header.navigator;
        navigator.nextButton.click();
        assert.equal(navigator.caption.getText(), '27 Sep-1 Oct 2021', 'caption correct');
      });
      module('Option Changing', function() {
        test('should change caption text after changing "currentView"', function(assert) {
          var scheduler = createWrapper({
            views: ['day', 'week', 'month', 'agenda'],
            currentView: 'day',
            currentDate: new Date(2021, 4, 7)
          });
          var navigator = scheduler.header.navigator;
          assert.equal(navigator.getText(), '7 May 2021', 'Correct caption for day view');
          scheduler.option('currentView', 'week');
          assert.equal(navigator.getText(), '2-8 May 2021', 'Correct caption for week view');
          scheduler.option('currentView', 'month');
          assert.equal(navigator.getText(), 'May 2021', 'Correct caption for month view');
          scheduler.option('currentView', 'agenda');
          assert.equal(navigator.getText(), '7-13 May 2021', 'Correct caption for agenda view');
        });
        test('should toggle previous and next buttons depending on "min" & "max"', function(assert) {
          var scheduler = createWrapper({
            currentDate: new Date(2021, 6, 5),
            min: new Date(2021, 6, 4),
            max: new Date(2021, 6, 6),
            views: ['day', 'week', 'month'],
            currentView: 'day'
          });
          var navigator = scheduler.header.navigator;
          assert.equal(navigator.prevButton.isDisabled(), false, 'previous button endabled');
          assert.equal(navigator.nextButton.isDisabled(), false, 'next button endabled');
          scheduler.option('currentDate', new Date(2021, 6, 4));
          assert.equal(navigator.prevButton.isDisabled(), true, 'previous button disabled');
          assert.equal(navigator.nextButton.isDisabled(), false, 'next button endabled');
          scheduler.option('currentDate', new Date(2021, 6, 6));
          assert.equal(navigator.prevButton.isDisabled(), false, 'previous button endabled');
          assert.equal(navigator.nextButton.isDisabled(), true, 'next button disabled');
        });
        test('should update caption after changing "currentDate"', function(assert) {
          var scheduler = createWrapper({
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2020, 6, 7)
          });
          scheduler.option('currentDate', new Date(2021, 4, 4));
          assert.equal(scheduler.header.navigator.getText(), '4 May 2021', 'Caption is correct');
        });
        test('should update caption after changing "currentView"', function(assert) {
          var scheduler = createWrapper({
            views: ['month', 'day'],
            currentView: 'day',
            currentDate: new Date(2021, 4, 7)
          });
          scheduler.option('currentView', 'month');
          assert.equal(scheduler.header.navigator.getText(), 'May 2021', 'Caption is correct');
        });
        test('should update caption after changing "firstDayOfWeek"', function(assert) {
          var scheduler = createWrapper({
            views: ['week'],
            currentView: 'week',
            currentDate: new Date(2021, 4, 7)
          });
          scheduler.option('firstDayOfWeek', 4);
          assert.equal(scheduler.header.navigator.getText(), '6-12 May 2021', 'Caption is correct');
        });
        test('should update caption after changing "agendaDuration"', function(assert) {
          var scheduler = createWrapper({
            views: [{
              type: 'agenda',
              agendaDuration: 5
            }],
            currentView: 'agenda',
            currentDate: new Date(2021, 4, 7)
          });
          assert.equal(scheduler.header.navigator.getText(), '7-11 May 2021', 'Caption is correct');
          scheduler.option('views', [{
            type: 'agenda',
            agendaDuration: 3
          }]);
          assert.equal(scheduler.header.navigator.getText(), '7-9 May 2021', 'Caption is correct');
        });
      });
      module('Interface Interaction', function() {
        test('should disabled previous button depending on "min"', function(assert) {
          var scheduler = createWrapper({
            currentDate: new Date(2021, 6, 5),
            min: new Date(2021, 6, 4),
            views: ['day'],
            currentView: 'day',
            height: 600
          });
          var navigator = scheduler.header.navigator;
          assert.equal(navigator.prevButton.isDisabled(), false, 'previous button is endabled');
          navigator.prevButton.click();
          assert.equal(navigator.prevButton.isDisabled(), true, 'previous button is disabled');
          navigator.nextButton.click();
          assert.equal(navigator.prevButton.isDisabled(), false, 'previous button is endabled');
        });
        test('should disabled next button depending on "max"', function(assert) {
          var scheduler = createWrapper({
            currentDate: new Date(2021, 6, 5),
            max: new Date(2021, 6, 6),
            views: ['day', 'week', 'month'],
            currentView: 'day',
            height: 600
          });
          var navigator = scheduler.header.navigator;
          assert.equal(navigator.nextButton.isDisabled(), false, 'next button is endabled');
          navigator.nextButton.click();
          assert.equal(navigator.nextButton.isDisabled(), true, 'next button is disables');
          navigator.prevButton.click();
          assert.equal(navigator.nextButton.isDisabled(), false, 'next button is enabled');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/scheduler/helpers.js","core/devices"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/scheduler/helpers.js"), require("core/devices"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=header.dateNavigator.tests.js.map