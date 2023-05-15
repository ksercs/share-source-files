!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/toast.tests.js"], ["core/utils/size","jquery","../../helpers/pointerMock.js","animation/fx","core/utils/view_port","ui/toast","core/devices.js","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/toast.tests.js", ["core/utils/size", "jquery", "../../helpers/pointerMock.js", "animation/fx", "core/utils/view_port", "ui/toast", "core/devices.js", "generic_light.css!"], function($__export) {
  "use strict";
  var getWidth,
      getHeight,
      getOuterHeight,
      getOuterWidth,
      $,
      pointerMock,
      fx,
      setViewPort,
      Toast,
      devices,
      TOAST_CLASS,
      TOAST_CLASS_PREFIX,
      TOAST_WRAPPER_CLASS,
      TOAST_CONTENT_CLASS,
      TOAST_MESSAGE_CLASS,
      TOAST_ICON_CLASS,
      moduleConfig,
      viewPort;
  return {
    setters: [function($__m) {
      getWidth = $__m.getWidth;
      getHeight = $__m.getHeight;
      getOuterHeight = $__m.getOuterHeight;
      getOuterWidth = $__m.getOuterWidth;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      setViewPort = $__m.value;
    }, function($__m) {
      Toast = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {}],
    execute: function() {
      TOAST_CLASS = 'dx-toast';
      TOAST_CLASS_PREFIX = TOAST_CLASS + '-';
      TOAST_WRAPPER_CLASS = TOAST_CLASS_PREFIX + 'wrapper';
      TOAST_CONTENT_CLASS = TOAST_CLASS_PREFIX + 'content';
      TOAST_MESSAGE_CLASS = TOAST_CLASS_PREFIX + 'message';
      TOAST_ICON_CLASS = TOAST_CLASS_PREFIX + 'icon';
      moduleConfig = {
        beforeEach: function() {
          this.$element = $('#toast');
          this.instance = new Toast(this.$element);
          this.clock = sinon.useFakeTimers();
          fx.off = true;
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      };
      viewPort = null;
      QUnit.testStart(function() {
        viewPort = $('#qunit-fixture').addClass('dx-viewport');
        setViewPort(viewPort);
        var markup = '<div id="toast"></div>\
        <div id="firstToast"></div>\
        <div id="secondToast"></div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('general', moduleConfig, function() {
        QUnit.test('render', function(assert) {
          this.instance.show();
          var $content = this.instance.$content();
          var $wrapper = this.instance.$wrapper();
          assert.ok(this.$element.hasClass(TOAST_CLASS));
          assert.ok($wrapper.hasClass(TOAST_WRAPPER_CLASS));
          assert.ok($content.hasClass(TOAST_CONTENT_CLASS));
          assert.ok(getWidth($content) < getWidth($(window)));
          assert.ok(getHeight($content) < getHeight($(window)));
        });
        QUnit.test('default template', function(assert) {
          var $content = this.instance.$content();
          this.instance.option({
            message: 'test42',
            type: 'Error'
          });
          this.instance.show();
          assert.ok($content.children().eq(0).hasClass(TOAST_ICON_CLASS));
          assert.ok($content.children().eq(1).hasClass(TOAST_MESSAGE_CLASS));
          assert.ok($content.hasClass(TOAST_CLASS_PREFIX + 'error'));
          assert.equal($content.text(), 'test42');
        });
        QUnit.test('position', function(assert) {
          this.instance.option({
            message: 'test42',
            position: {
              my: 'bottom center',
              at: 'bottom center',
              offset: '0 0'
            }
          });
          fx.off = true;
          this.instance.show();
          var $content = this.instance.$content();
          assert.roughEqual($content.offset().top + getOuterHeight($content), getHeight($(window)), 1.01);
        });
        QUnit.test('position on mobile devices', function(assert) {
          if (devices.real().deviceType !== 'phone') {
            assert.ok(true, 'not mobile device');
            return;
          }
          var done = assert.async();
          fx.off = false;
          this.instance = this.$element.dxToast({onShown: function(e) {
              var $content = e.component.$content();
              assert.roughEqual($content.offset().top + getOuterHeight($content), window.visualViewport.height, 1.01);
              assert.roughEqual(getOuterWidth($content), window.visualViewport.width, 1.01);
              done();
            }}).dxToast('instance');
          this.instance.show();
          this.clock.tick(5000);
        });
        QUnit.test('displayTime', function(assert) {
          var shown = 0;
          var hidden = 0;
          this.instance.option({
            'displayTime': 100,
            'animation.show.duration': 20,
            'animation.hide.duration': 30,
            'onShown': function() {
              shown++;
            },
            'onHiding': function() {
              hidden++;
            }
          });
          this.instance.show();
          this.clock.tick(50);
          assert.equal(shown, 1);
          assert.equal(hidden, 0);
          this.clock.tick(50);
          assert.equal(shown, 1);
          assert.equal(hidden, 1);
        });
        QUnit.test('should not hide previous Toasts on new Toast showing (T1153204)', function(assert) {
          var $first = $('#firstToast');
          var $second = $('#secondToast');
          var first = $first.dxToast().dxToast('instance');
          var second = $second.dxToast().dxToast('instance');
          first.show();
          assert.equal($('.dx-toast-content').filter(':visible').length, 1, 'the first toast is visible');
          second.show();
          assert.equal($('.dx-toast-content').filter(':visible').length, 2, 'both toasts are visible');
        });
        QUnit.test('toast should repeat trying to close after hiding is cancelled (T1156504)', function(assert) {
          var hidingCallCount = 0;
          var displayTime = 500;
          this.instance.option({
            displayTime: displayTime,
            onHiding: function(e) {
              if (hidingCallCount === 0) {
                e.cancel = true;
              }
              hidingCallCount += 1;
            }
          });
          this.instance.show();
          this.clock.tick(displayTime);
          assert.strictEqual(hidingCallCount, 1, 'toast tried to close after displayTime');
          assert.strictEqual(this.instance.option('visible'), true, 'hiding was cancelled');
          this.clock.tick(displayTime);
          assert.strictEqual(hidingCallCount, 2, 'toast tried to close after displayTime repeatedly');
          assert.strictEqual(this.instance.option('visible'), false, 'toast was hidden');
        });
      });
      QUnit.module('API', moduleConfig, function() {
        QUnit.test('show/hide', function(assert) {
          fx.off = true;
          var instance = this.instance;
          instance.option({
            displayTime: 50,
            animation: {
              type: 'fade',
              duration: 0,
              to: 1
            }
          });
          instance.show().done(function() {
            assert.ok(instance.$content().is(':visible'));
          });
        });
      });
      QUnit.module('regression', moduleConfig, function() {
        QUnit.test('change message in runtime', function(assert) {
          this.instance.option({message: 'test42'});
          this.instance.show();
          this.instance.hide();
          this.instance.option({message: 'test43'});
          this.instance.show();
          assert.equal(this.instance.$content().text(), 'test43');
        });
        QUnit.test('B238416', function(assert) {
          assert.expect(2);
          var instance = this.instance;
          instance.option({animation: {
              show: {
                from: {opacity: 0},
                to: {opacity: 1}
              },
              hide: {
                from: {opacity: 1},
                to: {opacity: 0}
              }
            }});
          instance.show().done(function() {
            var $content = instance.$content();
            assert.equal($content.css('opacity'), '1');
            instance.hide().done(function() {
              assert.equal($content.css('opacity'), '0');
            });
          });
        });
        QUnit.test('animation option should not contain window object if it was not set (T228805)', function(assert) {
          var instance = this.instance;
          var animationConfig = {
            show: {
              type: 'pop',
              from: {
                opacity: 1,
                scale: 0
              },
              to: {scale: 1}
            },
            hide: {
              type: 'pop',
              from: {scale: 1},
              to: {scale: 0}
            }
          };
          instance.option('animation', animationConfig);
          instance.show();
          assert.equal(animationConfig.show.to.position.of, null);
          instance.option('animation.show.to.position.of', window);
          assert.equal(animationConfig.show.to.position.of, window);
        });
      });
      QUnit.module('overlay integration', moduleConfig, function() {
        ['closeOnOutsideClick', 'hideOnOutsideClick'].forEach(function(closeOnOutsideClickOptionName) {
          QUnit.test(("toast should be closed on outside click if " + closeOnOutsideClickOptionName + " is true"), function(assert) {
            this.instance.option(closeOnOutsideClickOptionName, true);
            this.instance.show();
            $('#qunit-fixture').trigger('dxpointerdown');
            assert.equal(this.instance.option('visible'), false, 'toast was hidden should be hiding');
          });
          QUnit.test(("toast does not prevent " + closeOnOutsideClickOptionName + " handler of other overlays"), function(assert) {
            var $__2;
            var $overlay = $('<div>').appendTo(viewPort);
            var overlay = $overlay.dxOverlay(($__2 = {}, Object.defineProperty($__2, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__2)).dxOverlay('instance');
            overlay.show();
            this.instance.show();
            $('#qunit-fixture').trigger('dxpointerdown');
            assert.equal(overlay.option('visible'), false, 'dxOverlay should be hiding');
          });
        });
        QUnit.test('it should be possible to select a message in the toast by the mouse', function(assert) {
          assert.expect(1);
          var $toast = $('#toast').dxToast({
            shading: true,
            visible: true
          });
          var $shader = $toast.dxToast('$content').closest('.dx-overlay-shader');
          $($shader).on('dxdrag', function(e) {
            assert.equal(e.isDefaultPrevented(), false, 'touchmove is not prevented');
          });
          var event = $.Event('dxdrag', {originalEvent: $.Event('dxpointermove', {originalEvent: $.Event('touchmove')})});
          $($shader).trigger(event);
        });
        QUnit.test('toast should stay opened after change content template', function(assert) {
          var toast = $('#toast').dxToast({visible: true}).dxToast('instance');
          var hideSpy = sinon.spy(toast, 'hide');
          toast.option('contentTemplate', function() {
            return $('<div>');
          });
          this.clock.tick(10);
          assert.equal(hideSpy.callCount, 0, 'Toast didn\'t hide');
        });
      });
      QUnit.module('base z-index', function() {
        QUnit.test('toast should have base z-index greater than overlay', function(assert) {
          Toast.baseZIndex(10000);
          var $toast = $('#toast').dxToast({visible: true});
          var $content = $toast.dxToast('instance').$content();
          assert.equal($content.css('zIndex'), 18001, 'toast\'s z-index is correct');
        });
      });
      QUnit.module('close events handling', function() {
        QUnit.test('closeOnSwipe option', function(assert) {
          var $element = $('#toast').dxToast({visible: true});
          var instance = $element.dxToast('instance');
          var pointer = pointerMock($('.dx-toast-content'));
          pointer.start().swipe(-0.5);
          assert.ok(!instance.option('visible'), 'toast should hide on swipe');
          instance.option('closeOnSwipe', false);
          instance.option('visible', true);
          pointer.swipe(-0.5);
          assert.ok(instance.option('visible'), 'toast should not hide on swipe');
        });
        QUnit.test('closeOnClick option', function(assert) {
          var $element = $('#toast').dxToast({visible: true});
          var instance = $element.dxToast('instance');
          var $content = $('.dx-toast-content');
          $($content).trigger('dxclick');
          assert.ok(instance.option('visible'), 'toast should not hide on click if option is false');
          instance.option('closeOnClick', true);
          $($content).trigger('dxclick');
          assert.ok(!instance.option('visible'), 'toast should hide on click if option is true');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria role', function(assert) {
          var $element = $('#toast').dxToast({
            message: 'test',
            animation: {}
          });
          var instance = $element.dxToast('instance');
          instance.show();
          var $message = instance.$content().find('.' + TOAST_MESSAGE_CLASS);
          assert.equal($message.attr('role'), 'alert', 'role for toast message is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","jquery","../../helpers/pointerMock.js","animation/fx","core/utils/view_port","ui/toast","core/devices.js","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("jquery"), require("../../helpers/pointerMock.js"), require("animation/fx"), require("core/utils/view_port"), require("ui/toast"), require("core/devices.js"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=toast.tests.js.map