!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/integration.dateNavigator.tests.js"], ["jquery","animation/fx","ui/scheduler/ui.scheduler","generic_light.css!","../../helpers/scheduler/helpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/integration.dateNavigator.tests.js", ["jquery", "animation/fx", "ui/scheduler/ui.scheduler", "generic_light.css!", "../../helpers/scheduler/helpers.js"], function($__export) {
  "use strict";
  var $,
      fx,
      createWrapper,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {
      createWrapper = $__m.createWrapper;
    }],
    execute: function() {
      QUnit.testStart(function() {
        $('#qunit-fixture').html('<div id="scheduler">\
            <div data-options="dxTemplate: { name: \'template\' }">Task Template</div>\
            </div>');
      });
      moduleConfig = {
        beforeEach: function() {
          fx.off = true;
          this.createInstance = function(options) {
            this.instance = $('#scheduler').dxScheduler(options).dxScheduler('instance');
          };
        },
        afterEach: function() {
          fx.off = false;
        }
      };
      QUnit.module('Integration: Date navigator with min and max values', moduleConfig, function() {
        var DISABLED_CLASS_NAME = 'dx-state-disabled';
        var INIT_CURRENT_DATE = new Date(2017, 4, 25);
        var testNavigatorButtonsState = function(assert, instance, cases) {
          var $previousButton = $(instance.$element().find('.dx-scheduler-navigator-previous'));
          var $nextButton = $(instance.$element().find('.dx-scheduler-navigator-next'));
          assert.equal(instance.option('currentDate').valueOf(), INIT_CURRENT_DATE.valueOf(), 'currentDate value equal with init currentDate');
          cases.forEach(function(testCase) {
            assert.equal($previousButton.hasClass(DISABLED_CLASS_NAME), testCase.prevButtonDisable, 'the previous button has the disabled CSS class');
            assert.equal($nextButton.hasClass(DISABLED_CLASS_NAME), testCase.nextButtonDisable, 'the next button has the disabled CSS class');
            if (testCase.trigger) {
              $(testCase.trigger === 'next' ? $nextButton : $previousButton).trigger('dxclick');
            }
          });
          assert.equal(instance.option('currentDate').valueOf(), INIT_CURRENT_DATE.valueOf(), 'currentDate value is not changed');
        };
        QUnit.test('The navigator switcher should be disabled only one side in Day view mode, if currentDate property equal min property value (T714398)', function(assert) {
          this.createInstance({
            currentDate: INIT_CURRENT_DATE,
            min: '2017/05/25',
            max: '2017/05/26',
            views: ['day'],
            currentView: 'day'
          });
          testNavigatorButtonsState(assert, this.instance, [{
            prevButtonDisable: true,
            nextButtonDisable: false,
            trigger: 'next'
          }, {
            prevButtonDisable: false,
            nextButtonDisable: true,
            trigger: 'prev'
          }, {
            prevButtonDisable: true,
            nextButtonDisable: false
          }]);
        });
        QUnit.test('The navigator switcher should be disabled only one side in Day view mode, if startDayHour property is set', function(assert) {
          this.createInstance({
            currentDate: INIT_CURRENT_DATE,
            min: new Date(2017, 4, 25),
            max: new Date(2017, 4, 27),
            startDayHour: 9,
            endDayHour: 19
          });
          testNavigatorButtonsState(assert, this.instance, [{
            prevButtonDisable: true,
            nextButtonDisable: false,
            trigger: 'next'
          }, {
            prevButtonDisable: false,
            nextButtonDisable: false,
            trigger: 'next'
          }, {
            prevButtonDisable: false,
            nextButtonDisable: true,
            trigger: 'prev'
          }, {
            prevButtonDisable: false,
            nextButtonDisable: false,
            trigger: 'prev'
          }]);
        });
        QUnit.test('The navigator switcher should be disabled only one side in Day view mode, if currentDate property equal max property value', function(assert) {
          this.createInstance({
            currentDate: INIT_CURRENT_DATE,
            min: '2017/05/24',
            max: '2017/05/25',
            views: ['day'],
            currentView: 'day'
          });
          testNavigatorButtonsState(assert, this.instance, [{
            prevButtonDisable: false,
            nextButtonDisable: true,
            trigger: 'prev'
          }, {
            prevButtonDisable: true,
            nextButtonDisable: false,
            trigger: 'next'
          }, {
            prevButtonDisable: false,
            nextButtonDisable: true
          }]);
        });
        QUnit.test('The navigator switcher should be disabled only one side in Month view mode, if currentDate property equal min property value', function(assert) {
          this.createInstance({
            currentDate: INIT_CURRENT_DATE,
            min: new Date(2017, 4, 25),
            max: new Date(2017, 5, 25),
            views: ['month'],
            currentView: 'month'
          });
          testNavigatorButtonsState(assert, this.instance, [{
            prevButtonDisable: true,
            nextButtonDisable: false,
            trigger: 'next'
          }, {
            prevButtonDisable: false,
            nextButtonDisable: true,
            trigger: 'prev'
          }, {
            prevButtonDisable: true,
            nextButtonDisable: false
          }]);
        });
        QUnit.test('Previous button shouldn\'t be disabled if current date is next day after min and equal new Date()', function(assert) {
          this.createInstance({
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(),
            min: new Date()
          });
          $(this.instance.$element()).find('.dx-scheduler-navigator-next').trigger('dxclick');
          var prevButton = $(this.instance.$element()).find('.dx-scheduler-navigator-previous').dxButton('instance');
          assert.notOk(prevButton.option('disabled'), 'previous button isn\'t disabled');
        });
        QUnit.test('Next button shouldn\'t be disabled if current date is previous day before max', function(assert) {
          this.createInstance({
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2017, 11, 30),
            max: new Date(2017, 11, 31)
          });
          var nextButton = $(this.instance.$element()).find('.dx-scheduler-navigator-next').dxButton('instance');
          assert.notOk(nextButton.option('disabled'), 'next button isn\'t disabled');
        });
        QUnit.test('Min & Max options should be passed to header', function(assert) {
          this.createInstance({
            currentDate: new Date(2015, 1, 9),
            min: new Date(2015, 1, 2),
            max: new Date(2015, 1, 4)
          });
          var header = $(this.instance.$element()).find('.dx-scheduler-header').dxSchedulerHeader('instance');
          assert.deepEqual(header.option('min'), new Date(2015, 1, 2), 'min is passed');
          assert.deepEqual(header.option('max'), new Date(2015, 1, 4), 'max is passed');
          this.instance.option('min', new Date(2015, 1, 1));
          assert.deepEqual(header.option('min'), new Date(2015, 1, 1), 'min is passed after option changed');
          this.instance.option('max', new Date(2015, 1, 5));
          assert.deepEqual(header.option('max'), new Date(2015, 1, 5), 'max is passed after option changed');
        });
      });
      QUnit.module('Integration: Date navigator', moduleConfig, function() {
        QUnit.test('Click on the \'next\' button should update currentDate', function(assert) {
          this.createInstance({currentDate: new Date(2015, 1, 9)});
          $(this.instance.$element()).find('.dx-scheduler-navigator-next').trigger('dxclick');
          assert.deepEqual(this.instance.option('currentDate'), new Date(2015, 1, 10), 'New date is correct');
        });
        QUnit.test('Click on the \'next\' button should update currentDate correctly, when intervalCount & startDate', function(assert) {
          this.createInstance({
            currentDate: new Date(2015, 1, 9),
            startDayHour: 8,
            endDayHour: 20,
            views: [{
              type: 'day',
              intervalCount: 3,
              startDate: new Date(2015, 1, 11)
            }]
          });
          $(this.instance.$element().find('.dx-scheduler-navigator-next')).trigger('dxclick');
          assert.deepEqual(this.instance.option('currentDate'), new Date(2015, 1, 11, 8), 'New date is correct');
        });
        QUnit.test('Click on the \'next\' button should update firstViewDate of workspace correctly, when intervalCount & startDate', function(assert) {
          this.createInstance({
            startDayHour: 8,
            endDayHour: 20,
            currentDate: new Date(2017, 4, 1),
            views: [{
              type: 'day',
              intervalCount: 3,
              startDate: new Date(2017, 3, 30)
            }]
          });
          $(this.instance.$element().find('.dx-scheduler-navigator-next')).trigger('dxclick');
          assert.deepEqual(this.instance.getStartViewDate(), new Date(2017, 4, 3, 8, 0), 'New date is correct');
        });
        QUnit.test('Click on the \'previous\' button should update firstViewDate of workspace correctly, when intervalCount & startDate', function(assert) {
          this.createInstance({
            startDayHour: 8,
            endDayHour: 20,
            currentDate: new Date(2017, 4, 1),
            views: [{
              type: 'day',
              intervalCount: 3,
              startDate: new Date(2017, 3, 30)
            }]
          });
          $(this.instance.$element().find('.dx-scheduler-navigator-previous')).trigger('dxclick');
          assert.deepEqual(this.instance.getStartViewDate(), new Date(2017, 3, 27, 8, 0), 'New date is correct');
        });
        QUnit.test('Caption should be correct when intervalCount & startDate are set, month view', function(assert) {
          this.createInstance({
            currentDate: new Date(2018, 4, 21),
            currentView: 'month',
            views: [{
              type: 'month',
              intervalCount: 2,
              startDate: new Date(2018, 4, 21)
            }]
          });
          var $caption = this.instance.$element().find('.dx-scheduler-navigator-caption');
          assert.equal($caption.text(), 'May-Jun 2018', 'Caption is correct');
        });
        QUnit.test('Click on the \'next\' button should update currentDate correctly, when intervalCount & startDate, month view', function(assert) {
          this.createInstance({
            currentDate: new Date(2017, 5, 9),
            currentView: 'month',
            views: [{
              type: 'month',
              intervalCount: 3,
              startDate: new Date(2017, 11, 11)
            }]
          });
          $(this.instance.$element().find('.dx-scheduler-navigator-next')).trigger('dxclick');
          assert.deepEqual(this.instance.option('currentDate'), new Date(2017, 8, 1), 'New date is correct');
        });
        QUnit.test('Multiple click on the \'next\' button should update currentDate correctly when intervalCount, month view', function(assert) {
          this.createInstance({
            currentDate: new Date(2017, 8, 1),
            currentView: 'month',
            views: [{
              type: 'month',
              intervalCount: 2
            }]
          });
          var $element = this.instance.$element();
          var $caption = $element.find('.dx-scheduler-navigator-caption');
          $($element.find('.dx-scheduler-navigator-next')).trigger('dxclick').trigger('dxclick');
          assert.deepEqual(this.instance.option('currentDate'), new Date(2018, 0, 1), 'New date is correct');
          assert.equal($caption.text(), 'Jan-Feb 2018', 'Caption is correct');
        });
        QUnit.test('Multiple click on the \'next\' button should update currentDate correctly when intervalCount & startDate, month view', function(assert) {
          this.createInstance({
            currentDate: new Date(2018, 4, 21),
            currentView: 'month',
            views: [{
              type: 'month',
              intervalCount: 2,
              startDate: new Date(2018, 4, 21)
            }]
          });
          var $element = this.instance.$element();
          var $caption = $element.find('.dx-scheduler-navigator-caption');
          $($element.find('.dx-scheduler-navigator-next')).trigger('dxclick').trigger('dxclick');
          assert.deepEqual(this.instance.option('currentDate'), new Date(2018, 8, 1), 'New date is correct');
          assert.equal($caption.text(), 'Sep-Oct 2018', 'Caption is correct');
        });
        QUnit.test('Multiple click on the \'previous\' button should update currentDate correctly when intervalCount & startDate, month view', function(assert) {
          this.createInstance({
            currentDate: new Date(2018, 4, 21),
            currentView: 'month',
            views: [{
              type: 'month',
              intervalCount: 2,
              startDate: new Date(2018, 4, 21)
            }]
          });
          var $element = this.instance.$element();
          var $caption = $element.find('.dx-scheduler-navigator-caption');
          $($element.find('.dx-scheduler-navigator-previous')).trigger('dxclick').trigger('dxclick');
          assert.deepEqual(this.instance.option('currentDate'), new Date(2018, 0, 1), 'New date is correct');
          assert.equal($caption.text(), 'Jan-Feb 2018', 'Caption is correct');
        });
        QUnit.test('Multiple click on the \'next\' and \'previous\' button should update currentDate correctly, month view', function(assert) {
          this.createInstance({
            currentDate: new Date(2017, 4, 1),
            currentView: 'month',
            views: ['month']
          });
          var $nextButton = $(this.instance.$element().find('.dx-scheduler-navigator-next'));
          var $previousButton = $(this.instance.$element().find('.dx-scheduler-navigator-previous'));
          $nextButton.trigger('dxclick');
          $nextButton.trigger('dxclick');
          assert.equal(this.instance.option('currentDate').getMonth(), 6, 'New date is correct');
          $previousButton.trigger('dxclick');
          $previousButton.trigger('dxclick');
          assert.equal(this.instance.option('currentDate').getMonth(), 4, 'New date is correct');
        });
        QUnit.test('Multiple click on the \'next\' and \'previous\' button should update currentDate correctly when intervalCount, currentDate = startDate, month view', function(assert) {
          this.createInstance({
            currentDate: new Date(2017, 11, 11),
            currentView: 'month',
            views: [{
              type: 'month',
              intervalCount: 3,
              startDate: new Date(2017, 11, 11)
            }]
          });
          var $nextButton = $(this.instance.$element().find('.dx-scheduler-navigator-next'));
          var $previousButton = $(this.instance.$element().find('.dx-scheduler-navigator-previous'));
          $nextButton.trigger('dxclick');
          $nextButton.trigger('dxclick');
          $previousButton.trigger('dxclick');
          $previousButton.trigger('dxclick');
          assert.equal(this.instance.option('currentDate').getMonth(), 11, 'New date is correct');
        });
        QUnit.test('Click on the \'previous\' button should update currentDate', function(assert) {
          this.createInstance({currentDate: new Date(2015, 1, 9)});
          $(this.instance.$element()).find('.dx-scheduler-navigator-previous').trigger('dxclick');
          assert.deepEqual(this.instance.option('currentDate'), new Date(2015, 1, 8), 'New date is correct');
        });
        QUnit.test('Click on the \'previous\' button should update currentDate correctly, when intervalCount & startDate', function(assert) {
          this.createInstance({
            currentDate: new Date(2015, 1, 9),
            views: [{
              type: 'day',
              intervalCount: 3,
              startDate: new Date(2015, 1, 10)
            }]
          });
          $(this.instance.$element().find('.dx-scheduler-navigator-previous')).trigger('dxclick');
          assert.deepEqual(this.instance.option('currentDate'), new Date(2015, 1, 4), 'New date is correct');
        });
        QUnit.test('Click on the \'previous\' button should update currentDate correctly, when intervalCount & startDate, month view', function(assert) {
          this.createInstance({
            currentDate: new Date(2017, 5, 9),
            currentView: 'month',
            views: [{
              type: 'month',
              intervalCount: 3,
              startDate: new Date(2017, 11, 11)
            }]
          });
          $(this.instance.$element().find('.dx-scheduler-navigator-previous')).trigger('dxclick');
          assert.deepEqual(this.instance.option('currentDate'), new Date(2017, 2, 1), 'New date is correct');
        });
        QUnit.test('Tasks should be rerendered after click on next/prev button', function(assert) {
          this.createInstance({currentDate: new Date(2015, 1, 24)});
          var spy = sinon.spy(this.instance.appointmentDataProvider, 'filterByDate');
          try {
            $(this.instance.$element()).find('.dx-scheduler-navigator-previous').trigger('dxclick');
            assert.ok(spy.calledOnce, 'filterByDate is called');
          } finally {
            this.instance.appointmentDataProvider.filterByDate.restore();
          }
        });
        QUnit.test('Tasks should have correct position after click on next/prev button & calendar', function(assert) {
          this.createInstance({
            currentDate: new Date(2016, 0, 24),
            startDayHour: 2,
            currentView: 'day',
            firstDayOfWeek: 1,
            dataSource: [{
              startDate: new Date(2016, 0, 24, 3),
              endDate: new Date(2016, 0, 24, 4)
            }]
          });
          var $scheduler = $(this.instance.$element());
          var appointmentPosition = $scheduler.find('.dx-scheduler-appointment').position();
          $scheduler.find('.dx-scheduler-navigator-caption').trigger('dxclick');
          $('.dx-calendar td[data-value=\'2016/01/23\']').trigger('dxclick');
          $scheduler.find('.dx-scheduler-navigator-next').trigger('dxclick');
          var currentPosition = $scheduler.find('.dx-scheduler-appointment').position();
          assert.roughEqual(currentPosition.top, appointmentPosition.top, 1.001, 'position is not modified');
        });
        QUnit.test('Click on the \'next\' button should update currentDate correctly when intervalCount, month view, currentDate > 1', function(assert) {
          this.createInstance({
            currentDate: new Date(2018, 3, 21),
            currentView: 'month',
            views: [{
              type: 'month',
              intervalCount: 2
            }]
          });
          var $element = this.instance.$element();
          var $caption = $element.find('.dx-scheduler-navigator-caption');
          $($element.find('.dx-scheduler-navigator-next')).trigger('dxclick');
          assert.deepEqual(this.instance.option('currentDate'), new Date(2018, 5, 21), 'New date is correct');
          assert.equal($caption.text(), 'Jun-Jul 2018', 'Caption is correct');
        });
        QUnit.test('Calendar should be able to scroll content(T882633)', function(assert) {
          var scheduler = createWrapper();
          var navigator = scheduler.header.navigator;
          navigator.caption.click();
          assert.ok(navigator.popover.isVisible, 'navigator popup should be visible');
          if (scheduler.isDesktop) {
            assert.notOk(navigator.popover.hasScroll, 'calendar shouldn\'t wrapped in scrollable container in desktop environment');
          } else {
            assert.ok(navigator.popover.hasScroll, 'calendar should placed in scrollable container in mobile environment');
          }
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","ui/scheduler/ui.scheduler","generic_light.css!","../../helpers/scheduler/helpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("ui/scheduler/ui.scheduler"), require("generic_light.css!"), require("../../helpers/scheduler/helpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=integration.dateNavigator.tests.js.map