!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.main.tests.js"], ["animation/frame","renovation/ui/scroll_view/utils/get_translate_values","generic_light.css!","core/devices","core/utils/dom","core/utils/style","core/utils/support","events/visibility_change","jquery","mobile/init_mobile_viewport","ui/scroll_view/ui.scrollable","../../../helpers/pointerMock.js","./scrollable.constants.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.main.tests.js", ["animation/frame", "renovation/ui/scroll_view/utils/get_translate_values", "generic_light.css!", "core/devices", "core/utils/dom", "core/utils/style", "core/utils/support", "events/visibility_change", "jquery", "mobile/init_mobile_viewport", "ui/scroll_view/ui.scrollable", "../../../helpers/pointerMock.js", "./scrollable.constants.js"], function($__export) {
  "use strict";
  var animationFrame,
      getTranslateValues,
      devices,
      domUtils,
      styleUtils,
      support,
      triggerHidingEvent,
      triggerShownEvent,
      $,
      initMobileViewport,
      Scrollable,
      pointerMock,
      calculateInertiaDistance,
      RESIZE_WAIT_TIMEOUT,
      SCROLLABLE_CLASS,
      SCROLLABLE_CONTAINER_CLASS,
      SCROLLABLE_CONTENT_CLASS,
      SCROLLABLE_DISABLED_CLASS,
      SCROLLABLE_SCROLLBARS_HIDDEN,
      SCROLLABLE_SCROLLBAR_CLASS,
      SCROLLABLE_SCROLL_CLASS,
      SCROLLABLE_WRAPPER_CLASS,
      SCROLLBAR_HOVERABLE_CLASS,
      moduleConfig,
      getScrollOffset,
      isRenovatedScrollable,
      testDefaultValue,
      nativeScrollable,
      simulatedScrollable,
      testBlurInNativeScrolling;
  return {
    setters: [function($__m) {
      animationFrame = $__m.default;
    }, function($__m) {
      getTranslateValues = $__m.getTranslateValues;
    }, function($__m) {}, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      domUtils = $__m.default;
    }, function($__m) {
      styleUtils = $__m.default;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {
      triggerHidingEvent = $__m.triggerHidingEvent;
      triggerShownEvent = $__m.triggerShownEvent;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      initMobileViewport = $__m.default;
    }, function($__m) {
      Scrollable = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      calculateInertiaDistance = $__m.calculateInertiaDistance;
      RESIZE_WAIT_TIMEOUT = $__m.RESIZE_WAIT_TIMEOUT;
      SCROLLABLE_CLASS = $__m.SCROLLABLE_CLASS;
      SCROLLABLE_CONTAINER_CLASS = $__m.SCROLLABLE_CONTAINER_CLASS;
      SCROLLABLE_CONTENT_CLASS = $__m.SCROLLABLE_CONTENT_CLASS;
      SCROLLABLE_DISABLED_CLASS = $__m.SCROLLABLE_DISABLED_CLASS;
      SCROLLABLE_SCROLLBARS_HIDDEN = $__m.SCROLLABLE_SCROLLBARS_HIDDEN;
      SCROLLABLE_SCROLLBAR_CLASS = $__m.SCROLLABLE_SCROLLBAR_CLASS;
      SCROLLABLE_SCROLL_CLASS = $__m.SCROLLABLE_SCROLL_CLASS;
      SCROLLABLE_WRAPPER_CLASS = $__m.SCROLLABLE_WRAPPER_CLASS;
      SCROLLBAR_HOVERABLE_CLASS = $__m.SCROLLBAR_HOVERABLE_CLASS;
    }],
    execute: function() {
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
      isRenovatedScrollable = !!Scrollable.IS_RENOVATED_WIDGET;
      QUnit.module('markup', moduleConfig);
      QUnit.test('scrollable render', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({});
        var $wrapper = $scrollable.children().eq(0);
        var $container = $wrapper.children().eq(0);
        var $content = $container.children().eq(0);
        assert.ok($scrollable.hasClass(SCROLLABLE_CLASS), 'dx-scrollable class attached');
        assert.ok($wrapper.hasClass(SCROLLABLE_WRAPPER_CLASS), 'dx-scrollable-wrapper class attached');
        assert.ok($container.hasClass(SCROLLABLE_CONTAINER_CLASS), 'dx-scrollable-container class attached');
        assert.ok($content.hasClass(SCROLLABLE_CONTENT_CLASS), 'dx-scrollable-content class attached');
        assert.equal($content.children().length, 2, 'content was moved');
        assert.ok($content.children().eq(0).hasClass('content1'));
        assert.ok($content.children().eq(1).hasClass('content2'));
      });
      QUnit.module('horizontal direction', moduleConfig);
      QUnit.test('horizontal moving scrollable moves content', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          direction: 'horizontal'
        });
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        var location;
        var distance = -10;
        mouse.down().move(distance, 0);
        location = getScrollOffset($scrollable);
        assert.equal(location.left, distance, 'scroll follows pointer in horizontal direction');
        mouse.move(distance, 0);
        location = getScrollOffset($scrollable);
        assert.equal(location.left, 2 * distance, 'scroll follows pointer everytime in horizontal direction');
        mouse.up();
      });
      QUnit.test('horizontal inertia calc distance', function(assert) {
        var done = assert.async();
        assert.expect(1);
        var contentWidth = 9000;
        var moveDistance = -10;
        var moveDuration = 10;
        var inertiaDistance = calculateInertiaDistance(moveDistance, moveDuration);
        var distance = moveDistance + inertiaDistance;
        var $scrollable = $('#scrollable');
        $scrollable.find('.content1').width(contentWidth);
        $scrollable.dxScrollable({
          useNative: false,
          direction: 'horizontal',
          onEnd: function() {
            var location = getScrollOffset($scrollable);
            assert.equal(Math.round(location.left), Math.round(distance), 'distance was calculated correctly');
            done();
          }
        });
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        mouse.down().wait(moveDuration).move(moveDistance, 0).up();
        this.clock.tick(10);
      });
      QUnit.test('reset unused position after change direction', function(assert) {
        var contentWidth = 1000;
        var containerWidth = 100;
        var $scrollable = $('#scrollable').width(containerWidth);
        $scrollable.wrapInner('<div>').children().width(contentWidth);
        var scrollable = $scrollable.dxScrollable({
          useNative: false,
          inertiaEnabled: false,
          direction: 'horizontal'
        }).dxScrollable('instance');
        scrollable.scrollTo(contentWidth);
        scrollable.option('direction', 'vertical');
        assert.equal(scrollable.scrollLeft(), 0, 'left position was reset after change direction');
      });
      QUnit.module('both directions', moduleConfig);
      QUnit.test('bounce problem', function(assert) {
        assert.expect(2);
        var $scrollable = $('#scrollable');
        $scrollable.dxScrollable({
          useNative: false,
          direction: 'both',
          onEnd: function() {
            var location = getScrollOffset($scrollable);
            assert.equal(location.top, 0, 'content bounced back');
            assert.equal(location.left, 0, 'content bounced back');
          }
        });
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().move(10, 10).up();
      });
      QUnit.test('both direction option', function(assert) {
        var $scrollable = $('#scrollable');
        $scrollable.children().width(1000).height(1000);
        $scrollable.dxScrollable({
          useNative: false,
          direction: 'vertical',
          onEnd: function() {
            var location = getScrollOffset($scrollable);
            assert.equal(location.top, -10, 'content in correct position');
            assert.equal(location.left, -10, 'content left in correct position');
          }
        });
        $scrollable.dxScrollable('option', 'direction', 'both');
        var $content = $('.' + SCROLLABLE_CONTENT_CLASS, $scrollable);
        pointerMock($content).start().down().move(-10, -10).wait(1000).up();
      });
      QUnit.test('no bounce when innercontent more then content', function(assert) {
        var $scrollable = $('#scrollable');
        var $fixture = $('#qunit-fixture');
        $('<div>').width(300).appendTo($fixture).append($scrollable);
        $('<div>').width(500).appendTo($scrollable);
        $scrollable.dxScrollable({
          useNative: false,
          direction: 'horizontal',
          inertiaEnabled: false,
          onEnd: function() {
            var location = getScrollOffset($scrollable);
            assert.equal(location.left, -200, 'scrollable in right position');
          }
        });
        var $content = $('.' + SCROLLABLE_CONTENT_CLASS, $scrollable);
        var mouse = pointerMock($content);
        mouse.start().down().move(-200).up();
      });
      QUnit.test('no scrolling by content during scrolling by thumb', function(assert) {
        var $scrollable = $('#scrollable').height(50).width(50);
        var distance = 10;
        $scrollable.children().width(100).height(100);
        $scrollable.dxScrollable({
          useNative: false,
          direction: 'both',
          scrollByThumb: true,
          scrollByContent: false,
          inertiaEnabled: false,
          bounceEnabled: false,
          showScrollbar: 'always'
        });
        var $scrollbarHorizontal = $scrollable.find('.dx-scrollbar-horizontal .' + SCROLLABLE_SCROLL_CLASS);
        pointerMock($scrollbarHorizontal).start().down().move(distance, -distance);
        var scrollableOffset = $scrollable.dxScrollable('scrollOffset');
        assert.equal(scrollableOffset.top, 0, 'vertical offset was not changed');
      });
      QUnit.test('content selection should be allowed during scrolling by thumb', function(assert) {
        var $scrollable = $('#scrollable').height(50).width(50);
        var distance = 10;
        $scrollable.children().width(100).height(100);
        $scrollable.dxScrollable({
          useNative: false,
          direction: 'both',
          scrollByThumb: true,
          scrollByContent: false,
          inertiaEnabled: false,
          bounceEnabled: false,
          showScrollbar: 'always'
        });
        $(document).on('dxpointermove.TEST', function(e) {
          assert.ok(!e.isDefaultPrevented(), 'default should not be prevented');
        });
        pointerMock($scrollable.children()).start().down().move(distance, -distance);
        $(document).off('.TEST');
      });
      QUnit.test('reset unused position after change direction (both)', function(assert) {
        var contentWidth = 1000;
        var containerWidth = 100;
        var $scrollable = $('#scrollable').width(containerWidth);
        $scrollable.wrapInner('<div>').children().width(contentWidth);
        var scrollable = $scrollable.dxScrollable({
          useNative: false,
          inertiaEnabled: false,
          direction: 'both'
        }).dxScrollable('instance');
        scrollable.scrollTo({
          left: contentWidth,
          top: 10
        });
        scrollable.option('direction', 'vertical');
        assert.equal(scrollable.scrollLeft(), 0, 'left position was reset after change direction');
        assert.equal(scrollable.scrollTop(), 10, 'top position was not reset after change direction');
      });
      QUnit.module('Hoverable interaction', {beforeEach: function() {
          var markup = "\n            <style nonce=\"qunit-test\">\n                #scrollable {\n                    height: 50px;\n                    width: 50px;\n                }\n                #scrollable .content1 {\n                    height: 100px;\n                    width: 100px;\n                }\n            </style>\n            <div id=\"scrollable\">\n                <div class=\"content1\"></div>\n                <div class=\"content2\"></div>\n            </div>";
          $('#qunit-fixture').html(markup);
        }}, function() {
        [false, true].forEach(function(disabled) {
          [false, true].forEach(function(onInitialize) {
            ['vertical', 'horizontal'].forEach(function(direction) {
              ['onScroll', 'onHover', 'always', 'never'].forEach(function(showScrollbarMode) {
                QUnit.test(("ScrollBar hoverable - disabled: " + disabled + ", showScrollbar: " + showScrollbarMode + ", direction: " + direction + ", onInitialize: " + onInitialize), function(assert) {
                  var $scrollable = $('#scrollable').dxScrollable({
                    useNative: false,
                    useSimulatedScrollbar: true,
                    showScrollbar: showScrollbarMode,
                    direction: direction,
                    disabled: onInitialize ? disabled : false,
                    scrollByThumb: true
                  });
                  if (!onInitialize) {
                    $scrollable.dxScrollable('instance').option('disabled', disabled);
                  }
                  var $scrollBar = $scrollable.find(("." + SCROLLABLE_SCROLLBAR_CLASS));
                  var isScrollbarHoverable = (showScrollbarMode === 'onHover' || showScrollbarMode === 'always');
                  assert.strictEqual($scrollBar.hasClass(SCROLLBAR_HOVERABLE_CLASS), isScrollbarHoverable, ("scrollbar hasn't " + SCROLLBAR_HOVERABLE_CLASS));
                  assert.strictEqual($scrollable.hasClass(SCROLLABLE_DISABLED_CLASS), disabled ? true : false, 'scrollable-disabled-class');
                  assert.strictEqual($scrollBar.css('pointer-events'), disabled ? 'none' : 'auto', 'pointer-events');
                });
              });
            });
          });
        });
      });
      QUnit.module('initViewport integration', moduleConfig);
      QUnit.test('initViewport with disabled panning doesn\'t lock native scrolling', function(assert) {
        assert.expect(1);
        var $scrollable = $('#scrollable').dxScrollable({useNative: true});
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS));
        try {
          initMobileViewport({
            allowZoom: true,
            allowPan: false
          });
          $(document).on('dxpointermove.initViewportIntegration', function(e) {
            assert.equal(e.isDefaultPrevented(), false, 'dxpointermove was not prevented');
          });
          mouse.start('touch').down().move(1, 1);
        } finally {
          initMobileViewport({
            allowZoom: true,
            allowPan: true
          });
          $(document).off('.initViewportIntegration');
        }
      });
      QUnit.test('initViewport disables panning for non-native scrolling', function(assert) {
        assert.expect(1);
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          inertiaEnabled: false
        });
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS));
        var originalSupportTouch;
        try {
          originalSupportTouch = support.touch;
          support.touch = true;
          initMobileViewport({
            allowZoom: true,
            allowPan: false
          });
          $(document).on('dxpointermove.initViewportIntegration', function(e) {
            assert.equal(e.isDefaultPrevented(), true, 'dxpointermove was prevented');
          });
          mouse.start('touch').down().move(1, 1);
        } finally {
          support.touch = originalSupportTouch;
          initMobileViewport({
            allowZoom: true,
            allowPan: true
          });
          $(document).off('.initViewportIntegration');
        }
      });
      QUnit.test('dxpointermove is prevented when scrolling is disabled (Q574378)', function(assert) {
        var $scrollable = $('#scrollable');
        $scrollable.find('.content1').height(50);
        $scrollable.height('auto').wrapInner('<div>').children().height(50);
        $scrollable.dxScrollable({useNative: true});
        var originalSupportTouch;
        try {
          originalSupportTouch = support.touch;
          support.touch = true;
          initMobileViewport({
            allowZoom: true,
            allowPan: false
          });
          $(document).on('dxpointermove.initViewportIntegration', function(e) {
            assert.equal(e.isDefaultPrevented(), true, 'dxpointermove was prevented on non win10 devices');
          });
          pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start('touch').down().move(0, 1);
        } finally {
          support.touch = originalSupportTouch;
          initMobileViewport({
            allowZoom: true,
            allowPan: true
          });
          $(document).off('.initViewportIntegration');
        }
      });
      QUnit.module('events integration', moduleConfig);
      QUnit.test('scrollable returns to bound and prevent other gestures', function(assert) {
        var $scrollable = $('#scrollable');
        var $scrollableInner = $('<div>').appendTo($scrollable).dxScrollable({
          useNative: false,
          bounceEnabled: true,
          direction: 'horizontal'
        });
        $scrollable.dxScrollable({
          useNative: false,
          bounceEnabled: true,
          direction: 'vertical'
        });
        pointerMock($scrollable).start().down().move(0, 10);
        pointerMock($scrollableInner).start().down().move(10, 0).up();
        this.clock.tick(1000);
        assert.equal($scrollable.dxScrollable('scrollTop'), 0);
      });
      QUnit.test('scrollable locking', function(assert) {
        var $scrollable = $('#scrollable');
        var $scrollableWrapper = $scrollable.wrap('<div>').parent();
        var scrollable = $scrollable.dxScrollable({
          direction: 'vertical',
          useNative: false
        }).dxScrollable('instance');
        $scrollableWrapper.on('dxscroll', function() {
          assert.ok(true, 'scrollable is locked');
        });
        scrollable._lock();
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().move(0, 10).up();
        this.clock.tick(1000);
      });
      QUnit.module('regression', moduleConfig);
      QUnit.test('B250273 - dxList: showScrollbar option does not work on device.', function(assert) {
        var $scrollable = $('#scrollable');
        $scrollable.dxScrollable({
          useNative: true,
          showScrollbar: 'never',
          useSimulatedScrollbar: true
        });
        assert.equal($scrollable.hasClass(SCROLLABLE_SCROLLBARS_HIDDEN), true, 'scrollable has class scrollbars_disabled');
        assert.equal($scrollable.find('.' + SCROLLABLE_SCROLLBAR_CLASS).length, 0);
        $scrollable.dxScrollable('option', 'showScrollbar', 'onScroll');
        assert.equal($scrollable.hasClass(SCROLLABLE_SCROLLBARS_HIDDEN), false, 'scrollable has not class scrollbars_disabled');
        assert.equal($scrollable.find('.' + SCROLLABLE_SCROLLBAR_CLASS).length, 1);
        $scrollable.dxScrollable('option', 'showScrollbar', 'never');
        assert.equal($scrollable.hasClass(SCROLLABLE_SCROLLBARS_HIDDEN), true, 'scrollable has class scrollbars_disabled');
        assert.equal($scrollable.find('.' + SCROLLABLE_SCROLLBAR_CLASS).length, 0);
      });
      QUnit.test('simulated scrollable should stop animators on disposing', function(assert) {
        if (isRenovatedScrollable) {
          assert.ok(true);
          return;
        }
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          direction: 'both'
        });
        var scrollable = $scrollable.dxScrollable('instance');
        scrollable.scrollTo({
          left: 999,
          top: 999
        });
        $scrollable.remove();
        var scrollers = scrollable._strategy._scrollers;
        var verticalScroller = scrollers['vertical'];
        var horizontalScroller = scrollers['horizontal'];
        assert.ok(verticalScroller._inertiaAnimator._isStopped());
        assert.ok(horizontalScroller._inertiaAnimator._isStopped());
        assert.ok(verticalScroller._bounceAnimator._isStopped());
        assert.ok(horizontalScroller._bounceAnimator._isStopped());
      });
      QUnit.module('scrollers interaction', moduleConfig);
      QUnit.test('scrolling component with content size equal to container size nested in another component causes outer component scrolling', function(assert) {
        assert.expect(1);
        var onScrollHandler = sinon.spy();
        $('#scrollable').dxScrollable({
          useNative: false,
          bounceEnabled: true,
          inertiaEnabled: false,
          onScroll: onScrollHandler
        });
        var $scrollableNested = $('.content1').dxScrollable({
          useNative: false,
          bounceEnabled: false
        });
        pointerMock($scrollableNested).start().down().wheel(0, -1);
        assert.equal(onScrollHandler.callCount, 1, 'scroll action fired for external dxScrollable');
      });
      QUnit.test('disabled scrollable nested in another scrollable causes outer component scrolling (B238642)', function(assert) {
        assert.expect(1);
        var onScrollHandler = sinon.spy();
        $('#scrollable').dxScrollable({
          useNative: false,
          bounceEnabled: true,
          inertiaEnabled: false,
          scrollByContent: true,
          onScroll: onScrollHandler
        });
        var $scrollableNested = $('.content1').dxScrollable({disabled: true});
        pointerMock($scrollableNested).start().down().wheel(0, -1);
        assert.equal(onScrollHandler.callCount, 1, 'scroll action fired for external dxScrollable');
      });
      QUnit.module('scrollByContent', moduleConfig);
      QUnit.test('should not reset current scroll position after change scrollByContent option', function(assert) {
        var $scrollable = $('#scrollable');
        var scrollable = $scrollable.dxScrollable({
          height: 50,
          useNative: false,
          inertiaEnabled: false,
          direction: 'both',
          scrollByContent: true,
          bounceEnabled: false
        }).dxScrollable('instance');
        var pointer = pointerMock($(scrollable.content()));
        pointer.start().down().move(-20, -10);
        assert.deepEqual(scrollable.scrollOffset(), {
          top: 10,
          left: 20
        }, 'scrollable.scrollOffset()');
        scrollable.option('scrollByContent', false);
        assert.deepEqual(scrollable.scrollOffset(), {
          top: 10,
          left: 20
        }, 'scrollable.scrollOffset()');
        pointer.start().down().move(-10, -10);
        scrollable.option('scrollByContent', true);
        assert.deepEqual(scrollable.scrollOffset(), {
          top: 10,
          left: 20
        }, 'scrollable.scrollOffset()');
        pointer.start().down().move(-10, -10);
        assert.deepEqual(scrollable.scrollOffset(), {
          top: 20,
          left: 30
        }, 'scrollable.scrollOffset()');
      });
      QUnit.module('default value nativeScrollable', {
        beforeEach: function() {
          moduleConfig.beforeEach.call(this);
          this.originalRealDevice = devices.real();
          this.originalCurrentDevice = devices.current();
          this.originalSupportNativeScrolling = support.nativeScrolling;
          support.nativeScrolling = true;
        },
        afterEach: function() {
          moduleConfig.afterEach.call(this);
          devices.real(this.originalRealDevice);
          devices.current(this.originalCurrentDevice);
          support.nativeScrolling = this.originalSupportNativeScrolling;
        }
      });
      testDefaultValue = function(realDevice, currentDevice, realVersion) {
        devices.real({
          platform: realDevice,
          version: realVersion
        });
        devices.current({platform: currentDevice});
        $('#scrollable').dxScrollable({});
        return $('#scrollable').dxScrollable('option', 'useNative');
      };
      nativeScrollable = [{
        real: 'ios',
        current: 'ios'
      }, {
        real: 'ios',
        current: 'generic'
      }, {
        real: 'ios',
        current: 'desktop'
      }, {
        real: 'android',
        current: 'android',
        version: [4]
      }, {
        real: 'android',
        current: 'generic',
        version: [4]
      }, {
        real: 'ios',
        current: 'android'
      }, {
        real: 'android',
        current: 'ios',
        version: [4]
      }];
      $.each(nativeScrollable, function() {
        var devices = this;
        QUnit.test('real: ' + devices.real + '; current: ' + devices.current, function(assert) {
          assert.ok(testDefaultValue(devices.real, devices.current, devices.version));
        });
      });
      QUnit.module('default value simulatedScrollable', {
        beforeEach: function() {
          moduleConfig.beforeEach.call(this);
          this.originalRealDevice = devices.real();
          this.originalCurrentDevice = devices.current();
          this.originalSupportNativeScrolling = support.nativeScrolling;
          support.nativeScrolling = false;
        },
        afterEach: function() {
          moduleConfig.afterEach.call(this);
          devices.real(this.originalRealDevice);
          devices.current(this.originalCurrentDevice);
          support.nativeScrolling = this.originalSupportNativeScrolling;
        }
      });
      simulatedScrollable = [{
        real: 'android',
        current: 'android',
        version: [3]
      }, {
        real: 'android',
        current: 'android',
        version: [2]
      }, {
        real: 'generic',
        current: 'ios'
      }, {
        real: 'generic',
        current: 'android'
      }, {
        real: 'generic',
        current: 'generic'
      }, {
        real: 'generic',
        current: 'desktop'
      }];
      $.each(simulatedScrollable, function() {
        var devices = this;
        QUnit.test('real: ' + devices.real + '; current: ' + devices.current, function(assert) {
          assert.ok(!testDefaultValue(devices.real, devices.current, devices.version));
        });
      });
      QUnit.test('useNative false in simulator', function(assert) {
        var windowSelf;
        var forceDevice;
        try {
          windowSelf = window.self;
          forceDevice = window.top['dx-force-device'];
          window.self = {};
          window.top['dx-force-device'] = 'iPhone';
          assert.ok(!testDefaultValue('generic', 'generic'));
        } finally {
          window.self = windowSelf;
          if (forceDevice) {
            window.top['dx-force-device'] = forceDevice;
          } else {
            try {
              delete window.top['dx-force-device'];
            } catch (e) {}
          }
        }
      });
      QUnit.module('active element blurring', {
        beforeEach: function() {
          moduleConfig.beforeEach.call(this);
          this.originalRealDevice = devices.real();
          this.originalCurrentDevice = devices.current();
          this.originalResetActiveElement = domUtils.resetActiveElement;
          this.resetCount = 0;
          domUtils.resetActiveElement = $.proxy(function() {
            this.resetCount++;
          }, this);
        },
        afterEach: function() {
          moduleConfig.afterEach.call(this);
          devices.real(this.originalRealDevice);
          devices.current(this.originalCurrentDevice);
          domUtils.resetActiveElement = this.originalResetActiveElement;
        }
      });
      testBlurInNativeScrolling = function(platform, shouldBeBlurred) {
        QUnit.testInActiveWindow(platform + ': active element should' + (shouldBeBlurred ? '' : ' not') + ' be blurred (B250228)', function(assert) {
          if (!/webkit/i.exec(navigator.userAgent)) {
            assert.ok(true, 'this test run only in webkit');
            return;
          }
          var $innerInput;
          try {
            devices.real({platform: platform});
            var $element = $('#scrollable');
            $innerInput = $('<input>').appendTo($element);
            $element.dxScrollable();
            var elementPointer = pointerMock($element.find('.' + SCROLLABLE_CONTAINER_CLASS));
            $innerInput.focus();
            elementPointer.start().down().move(0, 10);
            if (shouldBeBlurred) {
              assert.equal(this.resetCount, 1, 'inner input was blurred');
            } else {
              assert.equal(this.resetCount, 0, 'inner input was not blurred');
            }
            elementPointer.up();
          } finally {
            $innerInput.remove();
          }
        });
      };
      testBlurInNativeScrolling('ios', true);
      testBlurInNativeScrolling('android');
      testBlurInNativeScrolling('desktop');
      QUnit.testInActiveWindow('scrollable should not reset active element outside (B250228)', function(assert) {
        if (!/webkit/i.exec(navigator.userAgent)) {
          assert.ok(true, 'this test run only in webkit');
          return;
        }
        var $outerInput;
        try {
          var $element = $('#scrollable');
          var elementPointer = pointerMock($element);
          $outerInput = $('<input>').appendTo('#qunit-fixture');
          $element.dxScrollable();
          $outerInput.focus();
          elementPointer.start().down().move(0, 10);
          assert.equal(this.resetCount, 0, 'outer input was not blurred');
          elementPointer.up();
        } finally {
          $outerInput.remove();
        }
      });
      QUnit.module('visibility events integration', {beforeEach: function() {
          var markup = "\n        <style nonce=\"qunit-test\">\n            #scrollable {\n                height: 50px;\n                width: 50px;\n            }\n            #scrollable .content1 {\n                height: 100px;\n                width: 100px;\n            }\n        </style>\n        <div id=\"scrollable\">\n            <div class=\"content1\"></div>\n            <div class=\"content2\"></div>\n        </div>";
          $('#qunit-fixture').html(markup);
        }});
      QUnit.test('scroll should save position on dxhiding and restore on dxshown', function(assert) {
        var done = assert.async();
        var $scrollable = $('#scrollable');
        var scrollable = $scrollable.dxScrollable({
          useNative: false,
          direction: 'both'
        }).dxScrollable('instance');
        scrollable.scrollTo({
          left: 10,
          top: 20
        });
        triggerHidingEvent($scrollable);
        $scrollable.hide();
        setTimeout(function() {
          scrollable.scrollTo({
            left: 0,
            top: 0
          });
          $scrollable.show();
          setTimeout(function() {
            triggerShownEvent($scrollable);
            assert.deepEqual(scrollable.scrollOffset(), {
              left: 10,
              top: 20
            }, 'scroll position restored after dxshown');
            done();
          }, RESIZE_WAIT_TIMEOUT);
        }, RESIZE_WAIT_TIMEOUT);
      });
      QUnit.test('scroll should restore on second dxshown', function(assert) {
        var $scrollable = $('#scrollable');
        var scrollable = $scrollable.dxScrollable({
          useNative: false,
          direction: 'both'
        }).dxScrollable('instance');
        scrollable.scrollTo({
          left: 10,
          top: 20
        });
        triggerHidingEvent($scrollable);
        triggerShownEvent($scrollable);
        scrollable.scrollTo({
          left: 1,
          top: 1
        });
        triggerShownEvent($scrollable);
        assert.deepEqual(scrollable.scrollOffset(), {
          left: 1,
          top: 1
        }, 'scroll position was not changed');
      });
      if (styleUtils.styleProp('touchAction')) {
        QUnit.module('nested scrolling in Edge');
        QUnit.test('touch-action none should be present on not stretched list', function(assert) {
          var $content = $('<div>').width(100).height(100);
          var $scrollable = $('<div>').width(50).height(50);
          $scrollable.append($content).appendTo('#qunit-fixture');
          $scrollable = $scrollable.dxScrollable({
            useNative: false,
            direction: 'both',
            bounceEnabled: false
          });
          var scrollable = $scrollable.dxScrollable('instance');
          var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
          assert.equal($container.css('touchAction'), 'none');
          $content.width(50).height(100);
          scrollable.update();
          assert.equal($container.css('touchAction'), 'pan-x');
          $content.width(100).height(50);
          scrollable.update();
          assert.equal($container.css('touchAction'), 'pan-y');
          $content.width(50).height(50);
          scrollable.update();
          assert.notEqual($container.css('touchAction'), 'none');
        });
      }
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["animation/frame","renovation/ui/scroll_view/utils/get_translate_values","generic_light.css!","core/devices","core/utils/dom","core/utils/style","core/utils/support","events/visibility_change","jquery","mobile/init_mobile_viewport","ui/scroll_view/ui.scrollable","../../../helpers/pointerMock.js","./scrollable.constants.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("animation/frame"), require("renovation/ui/scroll_view/utils/get_translate_values"), require("generic_light.css!"), require("core/devices"), require("core/utils/dom"), require("core/utils/style"), require("core/utils/support"), require("events/visibility_change"), require("jquery"), require("mobile/init_mobile_viewport"), require("ui/scroll_view/ui.scrollable"), require("../../../helpers/pointerMock.js"), require("./scrollable.constants.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollable.main.tests.js.map