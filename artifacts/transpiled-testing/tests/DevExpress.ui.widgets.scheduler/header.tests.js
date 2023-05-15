!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/header.tests.js"], ["jquery","../../helpers/scheduler/helpers.js","ui/themes","ui/scheduler/header/utils"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/header.tests.js", ["jquery", "../../helpers/scheduler/helpers.js", "ui/themes", "ui/scheduler/header/utils"], function($__export) {
  "use strict";
  var $,
      createWrapper,
      initTestMarkup,
      testStart,
      test,
      module,
      themes,
      getCaption;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {
      getCaption = $__m.getCaption;
    }],
    execute: function() {
      var $__2;
      (($__2 = QUnit, testStart = $__2.testStart, test = $__2.test, module = $__2.module, $__2));
      testStart(function() {
        return initTestMarkup();
      });
      test('should have navigator and view switcher in basic configuration', function(assert) {
        var scheduler = createWrapper({
          views: ['day'],
          currentView: 'day'
        });
        assert.ok(scheduler.header.navigator, 'Navigator is in DOM');
        assert.ok(scheduler.header.viewSwitcher, 'View switcher is in DOM');
      });
      test('should have correct deafult views', function(assert) {
        var scheduler = createWrapper({'useDropDownViewSwitcher': false});
        assert.equal(scheduler.header.viewSwitcher.getText(), 'DayWeek', 'view switcher should have correct views');
      });
      test('should rerender after useDropDownViewSwitcher option changes', function(assert) {
        var scheduler = createWrapper({
          currentView: 'month',
          views: ['day', 'month']
        });
        scheduler.option('useDropDownViewSwitcher', true);
        assert.equal(scheduler.header.viewSwitcher.getText(), 'Month', 'Drop down view switcher displayed');
      });
      module('Meterial theme', {
        beforeEach: function() {
          this.origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          themes.isMaterial = this.origIsMaterial;
        }
      }, function() {
        test('should have navigator, viewSwitcher and dropDown viewSwitcher', function(assert) {
          var scheduler = createWrapper({
            views: ['day'],
            currentView: 'day'
          });
          var navigatorCount = scheduler.header.navigator.getElement().length;
          var viewSwitcherCount = scheduler.header.viewSwitcher.getElement().length;
          var dropDownButtonCount = scheduler.header.viewSwitcher.dropDownButton.getElement().length;
          assert.equal(navigatorCount, 1, 'Navigator is in DOM');
          assert.equal(viewSwitcherCount, 1, 'View switcher is in DOM');
          assert.equal(dropDownButtonCount, 1, 'Drop down button is in DOM');
        });
      });
      module('Toolbar config', function() {
        test('should rerender after items configuration changes', function(assert) {
          var scheduler = createWrapper({
            currentView: 'month',
            views: ['month']
          });
          var headerInstance = scheduler.instance._header;
          var stub = sinon.stub(headerInstance, '_render');
          scheduler.option('toolbar', []);
          assert.ok(stub.calledOnce, 'Render method is called');
        });
        test('should render default items with swapped positions', function(assert) {
          var scheduler = createWrapper({
            currentView: 'month',
            views: ['month'],
            toolbar: [{
              location: 'before',
              defaultElement: 'viewSwitcher'
            }, {
              location: 'after',
              defaultElement: 'dateNavigator'
            }]
          });
          var viewSwitcher = scheduler.header.viewSwitcher.getElement();
          var dateNavigator = scheduler.header.navigator.getElement();
          assert.equal(viewSwitcher.length, 1, 'viewSwitcher disaplayed');
          assert.equal(dateNavigator.length, 1, 'dateNavigator disaplayed');
        });
        test('should not display viewSwitcher and dateNavigator', function(assert) {
          var scheduler = createWrapper({
            currentView: 'month',
            views: ['month'],
            toolbar: []
          });
          var viewSwitcherCount = scheduler.header.viewSwitcher.getElement().length;
          var dateNavigatorCount = scheduler.header.navigator.getElement().length;
          assert.equal(viewSwitcherCount, 0, 'viewSwitcher not disaplayed');
          assert.equal(dateNavigatorCount, 0, 'dateNavigator not disaplayed');
        });
        test('should display custom today button', function(assert) {
          var scheduler = createWrapper({
            currentDate: new Date(2020, 6, 7),
            currentView: 'month',
            views: ['month'],
            toolbar: [{defaultElement: 'dateNavigator'}, {
              location: 'after',
              widget: 'dxButton',
              options: {
                text: 'Today',
                elementAttr: {class: 'today-button'},
                onClick: function() {
                  scheduler.option('currentDate', new Date());
                }
              }
            }]
          });
          var todayButton = $('.today-button');
          todayButton.trigger('dxclick');
          var captionOptions = {
            startDate: new Date(),
            endDate: new Date(),
            step: 'month',
            date: new Date(),
            firstDayOfWeek: 0,
            intervalCount: 1
          };
          var todayCaption = getCaption(captionOptions);
          assert.equal(scheduler.header.navigator.getText(), todayCaption.text, 'Current date is changed');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/scheduler/helpers.js","ui/themes","ui/scheduler/header/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/scheduler/helpers.js"), require("ui/themes"), require("ui/scheduler/header/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=header.tests.js.map