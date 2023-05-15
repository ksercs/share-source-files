!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.dynamic.tests.js"], ["jquery","renovation/ui/scroll_view/utils/get_translate_values","animation/frame","core/utils/resize_callbacks","../../../helpers/pointerMock.js","generic_light.css!","./scrollable.constants.js","ui/scroll_view/ui.scrollable"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.dynamic.tests.js", ["jquery", "renovation/ui/scroll_view/utils/get_translate_values", "animation/frame", "core/utils/resize_callbacks", "../../../helpers/pointerMock.js", "generic_light.css!", "./scrollable.constants.js", "ui/scroll_view/ui.scrollable"], function($__export) {
  "use strict";
  var $,
      getTranslateValues,
      animationFrame,
      resizeCallbacks,
      pointerMock,
      SCROLLABLE_CONTAINER_CLASS,
      SCROLLABLE_CONTENT_CLASS,
      calculateInertiaDistance,
      Scrollable,
      INERTIA_TIMEOUT,
      GESTURE_LOCK_KEY,
      isRenovatedScrollable,
      moduleConfig,
      getScrollOffset;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      getTranslateValues = $__m.getTranslateValues;
    }, function($__m) {
      animationFrame = $__m.default;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {}, function($__m) {
      SCROLLABLE_CONTAINER_CLASS = $__m.SCROLLABLE_CONTAINER_CLASS;
      SCROLLABLE_CONTENT_CLASS = $__m.SCROLLABLE_CONTENT_CLASS;
      calculateInertiaDistance = $__m.calculateInertiaDistance;
    }, function($__m) {
      Scrollable = $__m.default;
    }],
    execute: function() {
      INERTIA_TIMEOUT = 100;
      GESTURE_LOCK_KEY = 'dxGestureLock';
      isRenovatedScrollable = !!Scrollable.IS_RENOVATED_WIDGET;
      moduleConfig = {
        beforeEach: function() {
          var markup = "\n            <style nonce=\"qunit-test\">\n                #scrollable {\n                    height: 50px;\n                    width: 50px;\n                }\n                #scrollable .content1 {\n                    height: 100px;\n                    width: 100px;\n                }\n            </style>\n            <div id=\"scrollable\">\n                <div class=\"content1\"></div>\n                <div class=\"content2\"></div>\n            </div>";
          $('#qunit-fixture').html(markup);
          this.clock = sinon.useFakeTimers();
          this._originalRequestAnimationFrame = animationFrame.requestAnimationFrame;
          animationFrame.requestAnimationFrame = function(callback) {
            callback();
          };
        },
        afterEach: function() {
          this.clock.restore();
          animationFrame.requestAnimationFrame = this._originalRequestAnimationFrame;
        }
      };
      getScrollOffset = function($scrollable) {
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        var location = getTranslateValues($content.get(0));
        return {
          top: location.top - $container.scrollTop(),
          left: location.left - $container.scrollLeft()
        };
      };
      QUnit.module('dynamic', moduleConfig);
      QUnit.test('moving scrollable moves content', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({useNative: false});
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        var location;
        var distance = -10;
        mouse.down().move(0, distance);
        location = getScrollOffset($scrollable);
        assert.equal(location.top, distance, 'scroll follows pointer');
        mouse.move(0, distance);
        location = getScrollOffset($scrollable);
        assert.equal(location.top, 2 * distance, 'scroll follows pointer everytime');
        mouse.up();
      });
      QUnit.test('inertia', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          onEnd: function() {
            location = getScrollOffset($scrollable);
            assert.ok(location.top < distance, 'was inertia');
          }
        });
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        var location;
        var distance = -10;
        mouse.down().wait(10).move(0, distance).up();
      });
      QUnit.test('inertia calc distance', function(assert) {
        assert.expect(1);
        var contentHeight = 9000;
        var moveDistance = -10;
        var moveDuration = 10;
        var inertiaDistance = calculateInertiaDistance(moveDistance, moveDuration);
        var distance = moveDistance + inertiaDistance;
        var $scrollable = $('#scrollable');
        $scrollable.find('.content1').height(contentHeight);
        $scrollable.dxScrollable({
          useNative: false,
          onEnd: function() {
            var location = getScrollOffset($scrollable);
            assert.equal(Math.round(location.top), Math.round(distance), 'distance was calculated correctly');
          }
        });
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var mouse = pointerMock($content);
        mouse.start().down().wait(moveDuration).move(0, moveDistance).up();
      });
      QUnit.test('no inertia when gesture end is deferred', function(assert) {
        assert.expect(1);
        var scrollableHeight = 50;
        var $scrollable = $('#scrollable');
        $scrollable.height(scrollableHeight);
        $scrollable.find('.content1').height(2 * scrollableHeight);
        $scrollable.dxScrollable({
          useNative: false,
          onEnd: function() {
            var location = getScrollOffset($scrollable);
            assert.equal(Math.round(location.top), Math.round(moveDistance), 'no inertia');
          }
        });
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var mouse = pointerMock($content);
        var moveDistance = -10;
        var moveDuration = 10;
        mouse.start().down().wait(moveDuration).move(0, moveDistance).wait(INERTIA_TIMEOUT + 1).up();
      });
      QUnit.test('gesture prevent when scrollable is full and bounce enabled false', function(assert) {
        var $scrollable = $('#scrollable').height(1000);
        $scrollable.wrapInner('<div>').children().height(10);
        $scrollable.dxScrollable({
          useNative: false,
          bounceEnabled: false,
          direction: 'vertical'
        });
        pointerMock($scrollable).start().down().move(0, -10);
        assert.ok(!$scrollable.data(GESTURE_LOCK_KEY), 'gesture was prevented');
      });
      QUnit.test('stop inertia on click', function(assert) {
        assert.expect(1);
        animationFrame.requestAnimationFrame = function(callback) {
          setTimeout(callback, 0);
        };
        var moveDistance = -10;
        var moveDuration = 10;
        var inertiaDistance = calculateInertiaDistance(moveDistance, moveDuration);
        var distance = moveDistance + inertiaDistance;
        var $scrollable = $('#scrollable').dxScrollable({useNative: false});
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        mouse.down().wait(moveDuration).move(0, moveDistance).up();
        mouse.down().up();
        this.clock.tick(10);
        var location = getScrollOffset($scrollable);
        assert.notEqual(Math.round(location.top), Math.round(distance), 'scroll was stopped');
      });
      QUnit.test('scrollbar is hidden on stop', function(assert) {
        assert.expect(1);
        animationFrame.requestAnimationFrame = function(callback) {
          setTimeout(callback, 0);
        };
        var $scrollable = $('#scrollable').dxScrollable({
          showScrollbar: 'onScroll',
          useNative: false
        });
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        mouse.down().wait(10).move(0, -10).up();
        this.clock.tick(100);
        var $scroll = $scrollable.find('.dx-scrollable-scroll');
        assert.ok($scroll.hasClass('dx-state-invisible'), 'scroll was hidden');
      });
      QUnit.test('bounce top', function(assert) {
        assert.expect(1);
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          onEnd: function() {
            var location = getScrollOffset($scrollable);
            assert.equal(location.top, 0, 'content bounced back');
          }
        });
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        mouse.down().wait(10).move(0, 10).up();
      });
      QUnit.test('bounce bottom', function(assert) {
        assert.expect(1);
        var scrollableHeight = 50;
        var $scrollable = $('#scrollable');
        $scrollable.height(scrollableHeight);
        $scrollable.find('.content1').height(2 * scrollableHeight);
        $scrollable.dxScrollable({
          useNative: false,
          onEnd: function() {
            var location = getScrollOffset($scrollable);
            var height = $scrollable.height() - $content.height();
            assert.equal(location.top, height, 'content bounced back');
          },
          inertiaEnabled: false
        });
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var mouse = pointerMock($content);
        mouse.start().down().move(0, -scrollableHeight - 10).up();
      });
      QUnit.test('bounce up', function(assert) {
        var done = assert.async();
        assert.expect(1);
        var scroll = 0;
        animationFrame.requestAnimationFrame = function(callback) {
          setTimeout(callback, 0);
        };
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          onEnd: function() {
            assert.ok(scroll > 1, 'Scroll action fired on bounced');
            done();
          },
          onScroll: function() {
            scroll++;
          },
          inertiaEnabled: false
        });
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        mouse.down().move(0, 100).up();
        this.clock.tick(100);
      });
      QUnit.test('stop bounce on click', function(assert) {
        assert.expect(1);
        animationFrame.requestAnimationFrame = function(callback) {
          setTimeout(callback, 0);
        };
        var moveDistance = -10;
        var moveDuration = 10;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          onEnd: function() {
            assert.ok(isRenovatedScrollable ? true : false, 'shouldn\'t fire end action');
          }
        });
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var mouse = pointerMock($content);
        mouse.start().down().wait(moveDuration).move(0, moveDistance).up().down();
        this.clock.tick(10);
        var location = getScrollOffset($scrollable);
        assert.notEqual(location.top, 0, 'bounced stopped');
      });
      QUnit.test('stop inertia bounce on after mouse up', function(assert) {
        assert.expect(1);
        animationFrame.requestAnimationFrame = function(callback) {
          setTimeout(callback, 0);
        };
        var moveDistance = -10;
        var moveDuration = 10;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          onEnd: function() {
            assert.ok(isRenovatedScrollable ? true : false, 'scroll complete shouldn`t be fired');
          }
        });
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var mouse = pointerMock($content);
        mouse.start().down().wait(moveDuration).move(0, moveDistance).up();
        mouse.down();
        this.clock.tick(10);
        var location = getScrollOffset($scrollable);
        assert.notEqual(location.top, 0, 'bounced stopped');
      });
      QUnit.test('bounce elastic', function(assert) {
        assert.expect(2);
        var moveDistance = 10;
        var wasFirstMove = false;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          inertiaEnabled: false,
          onScroll: function() {
            if (wasFirstMove) {
              var location = getScrollOffset($scrollable);
              assert.ok(location.top > 0, 'bounced exists');
              assert.ok(location.top < 2 * moveDistance, 'bounced elastic');
            } else {
              wasFirstMove = true;
            }
          }
        });
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        mouse.down().move(0, moveDistance).move(0, moveDistance);
      });
      QUnit.test('inertia calc distance out of bounds', function(assert) {
        assert.expect(1);
        var moveDistance = 10;
        var moveDuration = 10;
        var inertiaDistance = calculateInertiaDistance(moveDistance, moveDuration);
        var distance = (-1.5 * moveDistance) + (0.1 * moveDistance) + moveDistance + inertiaDistance;
        var $scrollable = $('#scrollable');
        $scrollable.dxScrollable({
          useNative: false,
          onBounce: function() {
            var location = getScrollOffset($scrollable);
            assert.ok(Math.round(location.top) < Math.round(distance), 'distance was calculated wrong');
          },
          onEnd: function() {}
        });
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        mouse.down().move(0, -1.5 * moveDistance).wait(300).move(0, 0.1 * moveDistance).wait(moveDuration).move(0, moveDistance).up();
      });
      QUnit.test('bounce is disabled', function(assert) {
        assert.expect(1);
        var moveDistance = 100;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          bounceEnabled: false,
          inertiaEnabled: false,
          onBounce: function() {
            assert.ok(false, 'bounce action was not fired');
          }
        });
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        mouse.down().move(0, moveDistance);
        var location = getScrollOffset($scrollable);
        assert.equal(location.top, 0, 'content is not moving');
      });
      QUnit.test('inertia stopped on the bound when bounce is disabled', function(assert) {
        var done = assert.async();
        assert.expect(1);
        var moveDistance = 10;
        var $scrollable = $('#scrollable');
        $scrollable.dxScrollable({
          useNative: false,
          bounceEnabled: false,
          onBounce: function() {
            assert.ok(false, 'bounce action was not fired');
          },
          onEnd: function() {
            var location = getScrollOffset($scrollable);
            assert.equal(location.top, 0, 'content stopped on the bound');
            done();
          }
        });
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        mouse.down().move(0, -1.5 * moveDistance).wait(300).move(0, 0.1 * moveDistance).wait(10).move(0, moveDistance).up();
        this.clock.tick(10);
      });
      QUnit.test('inertia is stopped when bound is reached', function(assert) {
        var moveDistance = 10;
        var lastLocation = (-1.5 * moveDistance) + (0.1 * moveDistance) + moveDistance;
        var $scrollable = $('#scrollable');
        $scrollable.dxScrollable({
          useNative: false,
          bounceEnabled: false,
          onScroll: function() {
            var location = getScrollOffset($scrollable);
            assert.notEqual(location.top, lastLocation || -1, 'content position is changed on each scroll step');
            lastLocation = location.top;
          }
        });
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var mouse = pointerMock($content);
        mouse.start().down().move(0, -1.5 * moveDistance).wait(200).move(0, 0.1 * moveDistance).wait(10).move(0, moveDistance).up();
      });
      QUnit.test('velocity calculated correctly when content height less than container height', function(assert) {
        var moveDistance = 10;
        var $scrollable = $('#scrollable').height(500);
        $scrollable.dxScrollable({
          useNative: false,
          onScroll: function() {
            var location = getScrollOffset($scrollable);
            assert.ok(location.top >= 0, 'content location calculated right');
          }
        });
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var mouse = pointerMock($content).start();
        mouse.down().move(0, moveDistance).up();
      });
      [true, false].forEach(function(useNative) {
        QUnit.test(("window resize should call update, useNative: " + useNative), function(assert) {
          var $scrollable = $('#scrollable');
          var updateHandler = sinon.spy();
          $scrollable.dxScrollable({
            useNative: true,
            onUpdated: updateHandler
          });
          updateHandler.reset();
          resizeCallbacks.fire();
          assert.equal(updateHandler.callCount, 1, 'onUpdate handler was fired once');
        });
        QUnit.test(("scrollable should have correct scrollPosition when content is not cropped by overflow hidden, useNative: " + useNative), function(assert) {
          var $scrollable = $('#scrollable').height(50).width(50);
          $scrollable.dxScrollable({
            useNative: useNative,
            direction: 'both',
            scrollByContent: true,
            useSimulatedScrollbar: true
          });
          var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
          $content.children().eq(0).css({
            width: '100px',
            height: '100px'
          });
          $content.children().eq(1).css({
            width: '300px',
            height: '300px',
            position: 'absolute',
            top: 0,
            left: 0
          });
          $content.css({
            height: '100px',
            width: '100px'
          });
          $scrollable.dxScrollable('instance').scrollTo({
            top: 250,
            left: 250
          });
          $scrollable.dxScrollable('instance').update();
          $scrollable.dxScrollable('instance').scrollTo({
            top: 250,
            left: 250
          });
          assert.equal($scrollable.dxScrollable('instance').scrollTop(), 250);
          assert.equal($scrollable.dxScrollable('instance').scrollLeft(), 250);
        });
        QUnit.test(("scrollable should have correct scrollPosition when content is cropped by overflow hidden, useNative: " + useNative), function(assert) {
          var $scrollable = $('#scrollable').height(50).width(50);
          var scrollable = $scrollable.dxScrollable({
            useNative: useNative,
            direction: 'both',
            scrollByContent: true,
            useSimulatedScrollbar: true
          }).dxScrollable('instance');
          var $content = $(scrollable.content());
          $content.children().eq(0).css({
            width: '100px',
            height: '100px'
          });
          $content.children().eq(1).css({
            width: '300px',
            height: '300px',
            position: 'absolute',
            top: 0,
            left: 0
          });
          $content.css({
            height: '100px',
            width: '100px',
            overflow: 'hidden'
          });
          $scrollable.dxScrollable('instance').scrollTo({
            top: 250,
            left: 250
          });
          $scrollable.dxScrollable('instance').update();
          $scrollable.dxScrollable('instance').scrollTo({
            top: 250,
            left: 250
          });
          assert.equal($scrollable.dxScrollable('instance').scrollTop(), 50);
          assert.equal($scrollable.dxScrollable('instance').scrollLeft(), 50);
        });
      });
      QUnit.test('scrollable prevents anchor events', function(assert) {
        var $input = $('<input>').css('height', '40px');
        var scrollable = $('#scrollable').append($input).dxScrollable({useNative: false}).dxScrollable('instance');
        $input.focus().css('height', 'auto');
        var scrollPosition = scrollable.scrollTop();
        $input.parent().append($('<input>'));
        assert.strictEqual(scrollable.scrollTop(), scrollPosition, 'Scrollable save content position');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","renovation/ui/scroll_view/utils/get_translate_values","animation/frame","core/utils/resize_callbacks","../../../helpers/pointerMock.js","generic_light.css!","./scrollable.constants.js","ui/scroll_view/ui.scrollable"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("renovation/ui/scroll_view/utils/get_translate_values"), require("animation/frame"), require("core/utils/resize_callbacks"), require("../../../helpers/pointerMock.js"), require("generic_light.css!"), require("./scrollable.constants.js"), require("ui/scroll_view/ui.scrollable"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollable.dynamic.tests.js.map