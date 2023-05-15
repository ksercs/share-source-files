!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/integration.adaptivity.tests.js"], ["jquery","animation/fx","../../helpers/scheduler/helpers.js","../../helpers/scheduler/data.js","core/utils/resize_callbacks","core/devices","ui/switch","generic_light.css!","ui/scheduler/ui.scheduler"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/integration.adaptivity.tests.js", ["jquery", "animation/fx", "../../helpers/scheduler/helpers.js", "../../helpers/scheduler/data.js", "core/utils/resize_callbacks", "core/devices", "ui/switch", "generic_light.css!", "ui/scheduler/ui.scheduler"], function($__export) {
  "use strict";
  var $,
      fx,
      createWrapper,
      initTestMarkup,
      isDesktopEnvironment,
      TOOLBAR_TOP_LOCATION,
      TOOLBAR_BOTTOM_LOCATION,
      getSimpleDataArray,
      resizeCallbacks,
      devices,
      testStart,
      test,
      module,
      createInstance,
      moduleConfig,
      setWindowWidth,
      resetWindowWidth;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
      isDesktopEnvironment = $__m.isDesktopEnvironment;
      TOOLBAR_TOP_LOCATION = $__m.TOOLBAR_TOP_LOCATION;
      TOOLBAR_BOTTOM_LOCATION = $__m.TOOLBAR_BOTTOM_LOCATION;
    }, function($__m) {
      getSimpleDataArray = $__m.getSimpleDataArray;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__2;
      (($__2 = QUnit, testStart = $__2.testStart, test = $__2.test, module = $__2.module, $__2));
      testStart(function() {
        return initTestMarkup();
      });
      createInstance = function(options) {
        var defaultOption = {
          dataSource: getSimpleDataArray(),
          views: ['agenda', 'day', 'week', 'workWeek', 'month'],
          currentView: 'month',
          currentDate: new Date(2017, 4, 25),
          startDayHour: 9,
          height: 600,
          adaptivityEnabled: true
        };
        return createWrapper($.extend(defaultOption, options));
      };
      moduleConfig = {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      };
      setWindowWidth = function(width) {
        Object.defineProperty(document.documentElement, 'clientWidth', {
          get: function() {
            return width;
          },
          configurable: true
        });
      };
      resetWindowWidth = function() {
        return delete document.documentElement.clientWidth;
      };
      module('Mobile tooltip', moduleConfig, function() {
        test('Tooltip should be render scroll, if count of items in list is a lot', function(assert) {
          var MAX_TOOLTIP_HEIGHT = 250;
          var isDesktop = devices.real().deviceType === 'desktop';
          var scheduler = createInstance();
          var $__3 = scheduler,
              tooltip = $__3.tooltip,
              appointments = $__3.appointments;
          assert.notOk(tooltip.isVisible(), 'On page load tooltip should be invisible');
          appointments.compact.click();
          if (isDesktop) {
            assert.notOk(tooltip.hasScrollbar(), 'Tooltip contained 3 items shouldn\'t render scroll bar');
          } else {
            assert.ok(tooltip.getOverlayContentElement().height() < MAX_TOOLTIP_HEIGHT, 'Tooltip contained 3 items shouldn\'t render scroll bar');
          }
          appointments.compact.click(appointments.compact.getLastButtonIndex());
          if (isDesktop) {
            assert.ok(tooltip.hasScrollbar(), 'Tooltip contained 4 items should render scroll bar');
          } else {
            assert.equal(tooltip.getOverlayContentElement().height(), MAX_TOOLTIP_HEIGHT, 'Tooltip contained 3 items shouldn\'t render scroll bar');
          }
        });
        test('Title in mobile tooltip should equals title of cell appointments in month view', function(assert) {
          var scheduler = createInstance();
          assert.notOk(scheduler.tooltip.isVisible(), 'On page load tooltip should be invisible');
          for (var i = 0; i < scheduler.appointments.getAppointmentCount(); i++) {
            scheduler.appointments.click(i);
            assert.ok(scheduler.tooltip.isVisible(), 'Tooltip should be visible after click on appointment');
            assert.equal(scheduler.tooltip.getTitleText(), scheduler.appointments.getTitleText(i), 'Title in tooltip should be equal with appointment');
          }
        });
        test('Tooltip should hide after execute actions', function(assert) {
          var scheduler = createInstance();
          var initialDataCount = scheduler.instance.option('dataSource').length;
          assert.notOk(scheduler.tooltip.isVisible(), 'On page load tooltip should be invisible');
          scheduler.appointments.compact.click();
          assert.ok(scheduler.tooltip.isVisible(), 'Tooltip should be visible after click on appointment');
          scheduler.tooltip.clickOnItem();
          assert.ok(scheduler.appointmentPopup.isVisible(), 'Appointment popup should be visible after click on item in tooltip');
          assert.notOk(scheduler.tooltip.isVisible(), 'Tooltip should be hide after showing Appointment popup');
          scheduler.appointmentPopup.clickCancelButton();
          scheduler.appointments.compact.click();
          assert.ok(scheduler.tooltip.isVisible(), 'Tooltip should be visible after click on appointment');
          scheduler.tooltip.clickOnDeleteButton();
          assert.notOk(scheduler.tooltip.isVisible(), 'Tooltip should be hide after click on remove button in tooltip');
          assert.equal(scheduler.instance.option('dataSource').length, initialDataCount - 1, 'Appointment should delete form dataSource after click on delete button in tooltip');
        });
        test('appointmentTooltipTemplate method should pass valid arguments and render valid html markup', function(assert) {
          var templateCallCount = 0;
          var TOOLTIP_TEMPLATE_MARKER_CLASS_NAME = 'appointment-tooltip-template-marker';
          var scheduler = createInstance({appointmentTooltipTemplate: function(model, index, contentElement) {
              assert.equal(model.targetedAppointmentData.text, model.appointmentData.text, 'targetedAppointmentData should be not empty');
              assert.equal(index, templateCallCount, 'Index should be correct pass in template callback');
              assert.equal($(contentElement).length, 1, 'contentElement should be DOM element');
              templateCallCount++;
              return $('<div />').addClass(TOOLTIP_TEMPLATE_MARKER_CLASS_NAME).text(("template item index - " + index));
            }});
          var checkItemTemplate = function(index) {
            assert.ok(scheduler.tooltip.checkItemElementHtml(index, ("<div class=\"" + TOOLTIP_TEMPLATE_MARKER_CLASS_NAME + "\">")), 'Template should contain valid custom css class ');
            assert.ok(scheduler.tooltip.checkItemElementHtml(index, ("template item index - " + index)), 'Template should render valid content dependent on item index');
          };
          scheduler.appointments.compact.click();
          checkItemTemplate(0);
          checkItemTemplate(1);
          checkItemTemplate(2);
          assert.ok(scheduler.tooltip.isVisible(), 'Tooltip should be visible after click on appointment');
          templateCallCount = 0;
          scheduler.appointments.compact.click(scheduler.appointments.compact.getLastButtonIndex());
          checkItemTemplate(0);
          checkItemTemplate(1);
          checkItemTemplate(2);
          checkItemTemplate(3);
        });
      });
      if (isDesktopEnvironment()) {
        module('Appointment form on desktop', {
          beforeEach: function() {
            fx.off = true;
          },
          afterEach: function() {
            fx.off = false;
            resetWindowWidth();
          }
        }, function() {
          test('Items has layout with one column when the form\'s width < 600px', function(assert) {
            var scheduler = createInstance();
            setWindowWidth(500);
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            assert.ok(scheduler.appointmentForm.hasFormSingleColumn(), 'Appointment form has single column');
          });
          test('Items with recurrence editor has layout with one column when the form\'s width < 600px', function(assert) {
            var scheduler = createInstance();
            setWindowWidth(500);
            scheduler.option('dataSource', [{
              startDate: new Date(2015, 1, 1),
              endDate: new Date(2015, 1, 2),
              recurrenceRule: 'FREQ=WEEKLY'
            }]);
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
            assert.ok(scheduler.appointmentForm.hasFormSingleColumn(), 'Appointment form has single column');
          });
          test('Items has layout with non-one column when the form\'s width > 600px', function(assert) {
            var scheduler = createInstance();
            setWindowWidth(700);
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            assert.notOk(scheduler.appointmentForm.hasFormSingleColumn(), 'Appointment form has not single column');
          });
          test('Items with recurrence editor has layout with non-one column when the form\'s width > 600px', function(assert) {
            var scheduler = createInstance();
            setWindowWidth(700);
            scheduler.option('dataSource', [{
              startDate: new Date(2015, 1, 1),
              endDate: new Date(2015, 1, 2),
              recurrenceRule: 'FREQ=WEEKLY'
            }]);
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
            assert.notOk(scheduler.appointmentForm.hasFormSingleColumn(), 'Appointment form has not single column');
          });
          test('Items has layout with one column when the form\'s width < 600px on window resizing', function(assert) {
            var scheduler = createInstance();
            setWindowWidth(700);
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            setWindowWidth(500);
            resizeCallbacks.fire();
            assert.ok(scheduler.appointmentForm.hasFormSingleColumn(), 'Appointment form has single column');
          });
          test('Items has layout with non-one column when the form\'s width > 600px on window resizing', function(assert) {
            var scheduler = createInstance();
            setWindowWidth(500);
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            setWindowWidth(700);
            resizeCallbacks.fire();
            assert.notOk(scheduler.appointmentForm.hasFormSingleColumn(), 'Appointment form has not single column');
          });
        });
      }
      if (!isDesktopEnvironment()) {
        module('Appointment form on mobile', {
          beforeEach: function() {
            fx.off = true;
            setWindowWidth(800);
          },
          afterEach: function() {
            fx.off = false;
            resetWindowWidth();
          }
        }, function() {
          test('Items has layout with one column', function(assert) {
            var scheduler = createInstance();
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            assert.ok(scheduler.appointmentForm.hasFormSingleColumn(), 'Appointment form has single column');
          });
        });
      }
      if (isDesktopEnvironment()) {
        module('Appointment popup size, desktop', {
          beforeEach: function() {
            fx.off = true;
          },
          afterEach: function() {
            fx.off = false;
            resetWindowWidth();
          }
        }, function() {
          test('The fullscreen mode is enabled of popup when window\'s width < 1000px', function(assert) {
            setWindowWidth(900);
            var scheduler = createInstance();
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            var popup = scheduler.appointmentPopup.getPopupInstance();
            assert.ok(popup.option('fullScreen'), 'The fullscreen mode is enabled');
            assert.equal(popup.option('maxWidth'), '100%', 'maxWidth');
          });
          test('The fullscreen mode is disabled of popup when window\'s width > 1000px', function(assert) {
            setWindowWidth(1001);
            var scheduler = createInstance();
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            var popup = scheduler.appointmentPopup.getPopupInstance();
            assert.notOk(popup.option('fullScreen'), 'The fullscreen mode is disabled');
            assert.equal(popup.option('maxWidth'), 485, 'maxWidth');
          });
          test('The fullscreen mode is disabled of popup when window\'s width > 1000px, with recurrence editor', function(assert) {
            setWindowWidth(1001);
            var scheduler = createInstance();
            scheduler.option('dataSource', [{
              startDate: new Date(2015, 1, 1),
              endDate: new Date(2015, 1, 2),
              recurrenceRule: 'FREQ=WEEKLY'
            }]);
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
            var popup = scheduler.appointmentPopup.getPopupInstance();
            assert.notOk(popup.option('fullScreen'), 'The fullscreen mode is disabled');
            assert.equal(popup.option('maxWidth'), 970, 'maxWidth');
          });
          test('The fullscreen mode is enabled of popup when the window\'s width < 1000px by resizing the window', function(assert) {
            setWindowWidth(1001);
            var scheduler = createInstance();
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            var popup = scheduler.appointmentPopup.getPopupInstance();
            setWindowWidth(767);
            resizeCallbacks.fire();
            assert.ok(popup.option('fullScreen'), 'The fullscreen mode is enabled');
            assert.equal(popup.option('maxWidth'), '100%', 'maxWidth');
          });
          test('The fullscreen mode is disabled of popup when the window\'s width > 1000px by resizing the window', function(assert) {
            setWindowWidth(799);
            var scheduler = createInstance();
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            var popup = scheduler.appointmentPopup.getPopupInstance();
            setWindowWidth(1001);
            resizeCallbacks.fire();
            assert.notOk(popup.option('fullScreen'), 'The fullscreen mode is disabled');
            assert.equal(popup.option('maxWidth'), 485, 'maxWidth');
          });
        });
      }
      if (!isDesktopEnvironment()) {
        module('Appointment popup size, mobile', {
          beforeEach: function() {
            fx.off = true;
          },
          afterEach: function() {
            fx.off = false;
            resetWindowWidth();
          }
        }, function() {
          test('The fullscreen mode is enabled of popup when window\'s width < 500px', function(assert) {
            setWindowWidth(499);
            var scheduler = createInstance();
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            var popup = scheduler.appointmentPopup.getPopupInstance();
            assert.ok(popup.option('fullScreen'), 'The fullscreen mode is enabled');
            assert.equal(popup.option('maxWidth'), '100%', 'maxWidth');
          });
          test('The fullscreen mode is disabled of popup when window\'s width > 500px', function(assert) {
            setWindowWidth(501);
            var scheduler = createInstance();
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            var popup = scheduler.appointmentPopup.getPopupInstance();
            assert.notOk(popup.option('fullScreen'), 'The fullscreen mode is disabled');
            assert.equal(popup.option('maxWidth'), 350, 'maxWidth');
          });
          test('The fullscreen mode is disabled of popup when window\'s width > 500px, with recurrence editor', function(assert) {
            setWindowWidth(501);
            var scheduler = createInstance();
            scheduler.option('dataSource', [{
              startDate: new Date(2015, 1, 1),
              endDate: new Date(2015, 1, 2),
              recurrenceRule: 'FREQ=WEEKLY'
            }]);
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            $('.dx-dialog-buttons .dx-button').eq(0).trigger('dxclick');
            var popup = scheduler.appointmentPopup.getPopupInstance();
            assert.notOk(popup.option('fullScreen'), 'The fullscreen mode is disabled');
            assert.equal(popup.option('maxWidth'), 350, 'maxWidth');
          });
        });
      }
      module('Appointment popup buttons', moduleConfig, function() {
        var SECTION_AFTER = 'after';
        var SECTION_BEFORE = 'before';
        var DONE_BUTTON = 'done';
        var CANCEL_BUTTON = 'cancel';
        test('Buttons location of the top toolbar for the iOs device', function(assert) {
          this.realDeviceMock = sinon.stub(devices, 'current').returns({platform: 'ios'});
          try {
            var scheduler = createInstance();
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            var popup = scheduler.appointmentPopup;
            assert.ok(popup.hasToolbarButtonsInSection(TOOLBAR_TOP_LOCATION, SECTION_BEFORE, [CANCEL_BUTTON]), 'the \'Cancel\' button is located inside the \'before\' section');
            assert.ok(popup.hasToolbarButtonsInSection(TOOLBAR_TOP_LOCATION, SECTION_AFTER, [DONE_BUTTON]), 'the \'Done\' button is located inside the \'after\' section');
          } finally {
            this.realDeviceMock.restore();
          }
        });
        test('Buttons location of the top toolbar for the desktop', function(assert) {
          this.realDeviceMock = sinon.stub(devices, 'current').returns({platform: 'generic'});
          try {
            var scheduler = createInstance();
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            var popup = scheduler.appointmentPopup;
            assert.ok(popup.hasToolbarButtonsInSection(TOOLBAR_BOTTOM_LOCATION, SECTION_AFTER, [DONE_BUTTON, CANCEL_BUTTON]), 'the \'Cancel\' and \'Done\' buttons are located in the \'after\' section');
          } finally {
            this.realDeviceMock.restore();
          }
        });
        test('Buttons location of the top toolbar for the android device', function(assert) {
          this.realDeviceMock = sinon.stub(devices, 'current').returns({platform: 'android'});
          try {
            var scheduler = createInstance();
            scheduler.appointments.compact.click();
            scheduler.tooltip.clickOnItem();
            var popup = scheduler.appointmentPopup;
            assert.ok(popup.hasToolbarButtonsInSection(TOOLBAR_BOTTOM_LOCATION, SECTION_AFTER, [CANCEL_BUTTON, DONE_BUTTON]), 'the \'Cancel\' and \'Done\' buttons are located in the \'after\' section');
          } finally {
            this.realDeviceMock.restore();
          }
        });
      }), module('View switcher', moduleConfig, function() {
        if (!isDesktopEnvironment()) {
          var config = {
            beforeEach: function() {
              fx.off = true;
              $('head').append('<meta  id="viewport" name="viewport" content="width=device-width, initial-scale=1">');
            },
            afterEach: function() {
              fx.off = false;
              $('#viewport').remove();
            }
          };
          module('mobile environment', config, function() {
            test('label of view name shouldn\'t be visible on mobile in case width < 450px', function(assert) {
              var scheduler = createInstance();
              assert.notOk(scheduler.viewSwitcher.getLabel().is(':visible'), 'label of view name shouldn\'t be visible');
            });
          });
        }
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","../../helpers/scheduler/helpers.js","../../helpers/scheduler/data.js","core/utils/resize_callbacks","core/devices","ui/switch","generic_light.css!","ui/scheduler/ui.scheduler"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("../../helpers/scheduler/helpers.js"), require("../../helpers/scheduler/data.js"), require("core/utils/resize_callbacks"), require("core/devices"), require("ui/switch"), require("generic_light.css!"), require("ui/scheduler/ui.scheduler"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=integration.adaptivity.tests.js.map