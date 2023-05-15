!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui/dialog.tests.js"], ["jquery","core/config","core/devices","ui/dialog","core/utils/dom","ui/widget/ui.errors","animation/fx","../../helpers/keyboardMock.js","core/utils/view_port","core/dom_adapter"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui/dialog.tests.js", ["jquery", "core/config", "core/devices", "ui/dialog", "core/utils/dom", "ui/widget/ui.errors", "animation/fx", "../../helpers/keyboardMock.js", "core/utils/view_port", "core/dom_adapter"], function($__export) {
  "use strict";
  var $,
      config,
      devices,
      alert,
      confirm,
      custom,
      domUtils,
      errors,
      fx,
      keyboardMock,
      viewPort,
      domAdapter,
      module,
      test,
      testInActiveWindow,
      ANIMATION_TIMEOUT,
      DIALOG_WRAPPER_CLASS,
      DIALOG_CLASS,
      POPUP_CLASS,
      DIALOG_BUTTON_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      alert = $__m.alert;
      confirm = $__m.confirm;
      custom = $__m.custom;
    }, function($__m) {
      domUtils = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      viewPort = $__m.value;
    }, function($__m) {
      domAdapter = $__m.default;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, module = $__4.module, test = $__4.test, testInActiveWindow = $__4.testInActiveWindow, $__4));
      ANIMATION_TIMEOUT = 500;
      DIALOG_WRAPPER_CLASS = 'dx-dialog-wrapper';
      DIALOG_CLASS = 'dx-dialog';
      POPUP_CLASS = 'dx-popup';
      DIALOG_BUTTON_CLASS = 'dx-dialog-button';
      module('dialog', {
        beforeEach: function() {
          var $__3 = this;
          viewPort('#qunit-fixture');
          fx.off = true;
          this.title = 'Title here';
          this.messageHtml = '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>';
          this.getDialogElement = function() {
            return $(("." + DIALOG_CLASS));
          };
          this.dialog = function() {
            return $(("." + DIALOG_WRAPPER_CLASS));
          };
          this.thereIsDialog = function() {
            return $__3.dialog().length === 1;
          };
          this.thereIsNoDialog = function() {
            return $__3.dialog().length === 0;
          };
          this.clickButton = function(index) {
            index = index || 0;
            $__3.dialog().find(("." + DIALOG_BUTTON_CLASS)).eq(index).trigger('dxclick');
          };
          this.isPopupDraggable = function() {
            return $(("." + POPUP_CLASS)).dxPopup('instance').option('dragEnabled');
          };
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        test('should remove its markup after hiding by escape (T1154325)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          custom({
            messageHtml: 'text',
            buttons: [{
              type: 'default',
              text: 'Ok'
            }]
          }).show();
          var dialogButton = this.dialog().find(("." + DIALOG_BUTTON_CLASS));
          var keyboard = keyboardMock(dialogButton);
          keyboard.keyDown('esc');
          var $dialog = this.getDialogElement();
          assert.strictEqual($dialog.length, 0, 'dialog markup is removed');
        });
        test('should remove its markup after hide method call', function(assert) {
          var $__5 = custom({messageHtml: 'text'}),
              show = $__5.show,
              hide = $__5.hide;
          show();
          hide();
          var $dialog = this.getDialogElement();
          assert.strictEqual($dialog.length, 0, 'dialog markup is removed');
        });
        module('with animation', {
          beforeEach: function() {
            fx.off = false;
            this.clock = sinon.useFakeTimers();
          },
          afterEach: function() {
            this.clock.restore();
          }
        }, function() {
          test('should remove its markup after hiding by escape only after hiding animation is finished', function(assert) {
            if (devices.real().deviceType !== 'desktop') {
              assert.ok(true, 'desktop specific test');
              return;
            }
            custom({
              messageHtml: 'text',
              buttons: [{
                type: 'default',
                text: 'Ok'
              }]
            }).show();
            var dialogButton = this.dialog().find(("." + DIALOG_BUTTON_CLASS));
            var keyboard = keyboardMock(dialogButton);
            keyboard.keyDown('esc');
            assert.strictEqual(this.getDialogElement().length, 1, 'dialog markup is not removed immediately');
            this.clock.tick(ANIMATION_TIMEOUT);
            assert.strictEqual(this.getDialogElement().length, 0, 'dialog markup is removed after animation is finished');
          });
          test('should remove its markup after hide method call only after hiding animation is finished', function(assert) {
            var $__5 = custom({messageHtml: 'text'}),
                show = $__5.show,
                hide = $__5.hide;
            show();
            hide();
            assert.strictEqual(this.getDialogElement().length, 1, 'dialog markup is not removed immediately');
            this.clock.tick(ANIMATION_TIMEOUT);
            assert.strictEqual(this.getDialogElement().length, 0, 'dialog markup is removed after animation is finished');
          });
        });
        test('dialog show/hide by Escape (T686065)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          alert();
          assert.ok(this.thereIsDialog());
          keyboardMock(this.dialog().find(("." + DIALOG_BUTTON_CLASS)).get(0)).keyDown('esc');
          assert.ok(this.thereIsNoDialog());
        });
        test('dialog show/hide', function(assert) {
          var instance;
          var options = {
            title: this.title,
            messageHtml: this.messageHtml
          };
          var result = 'DialogResultValue';
          var afterHide = function(value) {
            assert.equal(value, result, 'Dialog\'s deferred object were resolved with right value.');
          };
          assert.ok(this.thereIsNoDialog(), 'Dialog is not shown.');
          instance = custom(options);
          instance.show().done(afterHide);
          assert.ok(this.thereIsDialog(), 'Dialog is shown.');
          instance.hide(result);
          assert.ok(this.thereIsNoDialog(), 'Dialog is not shown after \'hide\' was called.');
          instance = custom(options);
          instance.show();
          assert.ok(this.thereIsDialog(), 'Dialog is shown.');
          this.clickButton();
          assert.ok(this.thereIsNoDialog(), 'Dialog is not shown after button was clicked.');
        });
        testInActiveWindow('first button in dialog obtained focus on shown', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'focus is absent on mobile devices');
            return;
          }
          alert('Sample message', 'Alert');
          assert.equal($('.dx-dialog-wrapper').find('.dx-state-focused').length, 1, 'button obtained focus');
        });
        test('dialog content', function(assert) {
          var options = {
            title: this.title,
            messageHtml: this.messageHtml
          };
          var instance = custom(options);
          instance.show();
          assert.equal(this.dialog().find('.dx-popup-title').text(), this.title, 'Actual title is equal to expected.');
          assert.equal((this.dialog().find('.dx-dialog-message').html() || '').toLowerCase(), this.messageHtml.toLowerCase(), 'Actual message is equal to expected.');
          instance.hide();
          assert.ok(this.thereIsNoDialog(), 'Dialog is not shown.');
        });
        test('dialog content without title', function(assert) {
          var options = {
            title: this.title,
            messageHtml: this.messageHtml,
            showTitle: false
          };
          var instance = custom(options);
          instance.show();
          assert.equal(this.dialog().find('.dx-popup-title').length, 0, 'Actual title is equal not expected.');
        });
        test('popup drag enabled', function(assert) {
          var $__3 = this;
          var testPopupDrag = function(dialogDragEnabled, expectedPopupDragEnabled, message) {
            var options = {
              title: $__3.title,
              messageHtml: $__3.messageHtml,
              dragEnabled: dialogDragEnabled
            };
            var instance = custom(options);
            instance.show();
            assert.equal($__3.isPopupDraggable(), expectedPopupDragEnabled, message);
            instance.hide();
          };
          testPopupDrag(true, true, 'drag was not enabled');
          testPopupDrag(false, false, 'drag was not disabled');
          testPopupDrag(undefined, true, 'drag was not enabled');
        });
        test('alert dialog without title should not be draggable', function(assert) {
          var $__3 = this;
          var testPopupDrag = function(showTitle, expectedPopupDragEnabled, message) {
            alert($__3.messageHtml, 'alert title', showTitle);
            assert.equal($__3.isPopupDraggable(), expectedPopupDragEnabled, message);
            $__3.clickButton();
          };
          testPopupDrag(true, true, 'drag was not enabled');
          testPopupDrag(false, false, 'drag was not disabled');
          testPopupDrag(undefined, true, 'drag was not enabled');
        });
        test('confirm dialog without title should not be draggable', function(assert) {
          var $__3 = this;
          var testPopupDrag = function(showTitle, expectedPopupDragEnabled, message) {
            confirm($__3.messageHtml, 'confirm title', showTitle);
            assert.equal($__3.isPopupDraggable(), expectedPopupDragEnabled, message);
            $__3.clickButton();
          };
          testPopupDrag(true, true, 'drag was not enabled');
          testPopupDrag(false, false, 'drag was not disabled');
          testPopupDrag(undefined, true, 'drag was not enabled');
        });
        test('dialog buttons', function(assert) {
          var actual;
          var expected = 'ButtonReturnValue#2';
          var options = {
            title: this.title,
            messageHtml: this.messageHtml,
            buttons: [{
              text: 'ButtonCaption#1',
              onClick: function() {
                return 'ButtonReturnValue#1';
              }
            }, {
              text: 'ButtonCaption#2',
              onClick: function() {
                return 'ButtonReturnValue#2';
              }
            }]
          };
          assert.ok(this.thereIsNoDialog(), 'Dialog is not shown.');
          var instance = custom(options);
          instance.show().done(function(value) {
            return actual = value;
          });
          assert.ok(this.thereIsDialog(), 'Dialog is shown.');
          assert.equal(this.dialog().find(("." + DIALOG_BUTTON_CLASS)).length, 2, 'There are two custom buttons.');
          this.clickButton(1);
          assert.equal(actual, expected, 'Actual value is equal to expected.');
          assert.ok(this.thereIsNoDialog(), 'Dialog is not shown.');
        });
        test('alert dialog', function(assert) {
          assert.ok(this.thereIsNoDialog(), 'Dialog is not shown.');
          alert(this.messageHtml, this.title);
          assert.ok(this.thereIsDialog(), 'Dialog is shown.');
          assert.equal(this.dialog().find('.dx-popup-title').text(), this.title, 'Dialog default title is used.');
          var $bottom = this.dialog().find('.dx-popup-bottom');
          assert.equal($bottom.length, 1, 'Dialog bottom is rendered');
          assert.equal($bottom.find('.dx-button').length, 1, 'Dialog has button');
          this.clickButton();
          assert.ok(this.thereIsNoDialog(), 'Dialog is not shown.');
        });
        test('confirm dialog', function(assert) {
          var actual;
          assert.ok(this.thereIsNoDialog(), 'Dialog is not shown.');
          confirm(this.messageHtml, this.title).done(function(value) {
            return actual = value;
          });
          this.clickButton();
          assert.strictEqual(actual, true, 'Confirm result value is equal to expected.');
          assert.ok(this.thereIsNoDialog(), 'Dialog is not shown.');
        });
        test('dialog overlay content has \'dx-rtl\' class when RTL is enabled', function(assert) {
          config({rtlEnabled: true});
          confirm(this.messageHtml, this.title);
          assert.ok($('.dx-overlay-content').hasClass('dx-rtl'), '\'dx-rlt\' class is present');
          config({rtlEnabled: false});
        });
        test('should show \'W1013\' warning if deprecated \'message\' option is used', function(assert) {
          var originalLog = errors.log;
          var warning = null;
          errors.log = function(loggedWarning) {
            return warning = loggedWarning;
          };
          try {
            custom({message: 'message'});
            assert.strictEqual(warning, 'W1013');
          } finally {
            errors.log = originalLog;
          }
        });
        test('dialog should reset active element on showing', function(assert) {
          var options = {
            title: 'title',
            messageHtml: 'message'
          };
          var resetActiveElementStub = sinon.stub(domUtils, 'resetActiveElement');
          try {
            var instance = custom(options);
            instance.show();
            assert.equal(resetActiveElementStub.callCount, 1);
            instance.hide();
          } finally {
            resetActiveElementStub.reset();
          }
        });
        test('it should be possible to redefine popup option in the dialog', function(assert) {
          custom({
            title: 'Test Title',
            popupOptions: {
              customOption: 'Test',
              title: 'Popup title',
              height: 300
            }
          }).show();
          var popup = $(("." + POPUP_CLASS)).dxPopup('instance');
          assert.equal(popup.option('customOption'), 'Test', 'custom option is defined');
          assert.equal(popup.option('title'), 'Popup title', 'user option is redefined');
          assert.equal(popup.option('height'), 300, 'default option is redefined');
        });
        test('it should apply correct arguments to the button \'onClick\' handler', function(assert) {
          var clickStub = sinon.stub();
          custom({buttons: [{
              text: 'Test',
              onClick: clickStub
            }]}).show();
          this.clickButton(0);
          var clickArgs = clickStub.lastCall.args[0];
          assert.ok(Object.prototype.hasOwnProperty.call(clickArgs, 'component'));
          assert.ok(Object.prototype.hasOwnProperty.call(clickArgs, 'event'));
          assert.strictEqual(clickArgs.component.NAME, 'dxButton');
        });
        test('dragAndResizeContainer should be window by default (T1120202)', function(assert) {
          custom({
            title: 'title',
            messageHtml: 'message',
            showTitle: true
          }).show();
          var popup = $(("." + POPUP_CLASS)).dxPopup('instance');
          var dragAndResizeArea = popup.option().dragAndResizeArea;
          assert.strictEqual(dragAndResizeArea, window, 'dragAndResizeArea is not specified');
        });
        test('container should be equal to the root element by default', function(assert) {
          custom({
            title: 'title',
            messageHtml: 'message',
            showTitle: true
          }).show();
          var popup = $(("." + POPUP_CLASS)).dxPopup('instance');
          var container = popup.option().container;
          assert.strictEqual(container.get(0), $(("." + DIALOG_CLASS)).get(0), 'container is a root element');
        });
      });
      QUnit.module('width on android', {
        beforeEach: function() {
          viewPort('#qunit-fixture');
          fx.off = true;
          this.realDevice = devices.real();
          devices.real({platform: 'android'});
          this.dialog = custom();
          this.documentStub = sinon.stub(domAdapter, 'getDocumentElement');
          this.getDialogElement = function() {
            return $(("." + DIALOG_WRAPPER_CLASS + " .dx-overlay-content"));
          };
        },
        afterEach: function() {
          devices.real(this.realDevice);
          this.documentStub.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('should be 80% for portrait orientation', function(assert) {
          this.documentStub.returns({
            clientWidth: 200,
            clientHeight: 500
          });
          this.dialog.show();
          var $dialog = this.getDialogElement();
          assert.strictEqual($dialog.width(), 160, 'width is correct');
        });
        QUnit.test('should be 60% for landscape orientation', function(assert) {
          this.documentStub.returns({
            clientWidth: 600,
            clientHeight: 500
          });
          this.dialog.show();
          var $dialog = this.getDialogElement();
          assert.strictEqual($dialog.width(), 360, 'width is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/config","core/devices","ui/dialog","core/utils/dom","ui/widget/ui.errors","animation/fx","../../helpers/keyboardMock.js","core/utils/view_port","core/dom_adapter"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/config"), require("core/devices"), require("ui/dialog"), require("core/utils/dom"), require("ui/widget/ui.errors"), require("animation/fx"), require("../../helpers/keyboardMock.js"), require("core/utils/view_port"), require("core/dom_adapter"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dialog.tests.js.map