!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.useNative.tests.js"], ["jquery","renovation/ui/scroll_view/utils/get_translate_values","animation/frame","../../../helpers/pointerMock.js","ui/scroll_view/ui.scrollable","generic_light.css!","./scrollable.constants.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.useNative.tests.js", ["jquery", "renovation/ui/scroll_view/utils/get_translate_values", "animation/frame", "../../../helpers/pointerMock.js", "ui/scroll_view/ui.scrollable", "generic_light.css!", "./scrollable.constants.js"], function($__export) {
  "use strict";
  var $,
      getTranslateValues,
      animationFrame,
      pointerMock,
      Scrollable,
      SCROLLABLE_CONTAINER_CLASS,
      SCROLLABLE_CONTENT_CLASS,
      SCROLLABLE_SCROLLBAR_CLASS,
      SCROLLABLE_SCROLL_CLASS,
      SCROLLBAR_VERTICAL_CLASS,
      SCROLLBAR_HORIZONTAL_CLASS,
      SCROLLABLE_NATIVE_CLASS,
      RESIZE_WAIT_TIMEOUT,
      moduleConfig,
      getScrollOffset,
      isRenovatedScrollable;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      getTranslateValues = $__m.getTranslateValues;
    }, function($__m) {
      animationFrame = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      Scrollable = $__m.default;
    }, function($__m) {}, function($__m) {
      SCROLLABLE_CONTAINER_CLASS = $__m.SCROLLABLE_CONTAINER_CLASS;
      SCROLLABLE_CONTENT_CLASS = $__m.SCROLLABLE_CONTENT_CLASS;
      SCROLLABLE_SCROLLBAR_CLASS = $__m.SCROLLABLE_SCROLLBAR_CLASS;
      SCROLLABLE_SCROLL_CLASS = $__m.SCROLLABLE_SCROLL_CLASS;
      SCROLLBAR_VERTICAL_CLASS = $__m.SCROLLBAR_VERTICAL_CLASS;
      SCROLLBAR_HORIZONTAL_CLASS = $__m.SCROLLBAR_HORIZONTAL_CLASS;
      SCROLLABLE_NATIVE_CLASS = $__m.SCROLLABLE_NATIVE_CLASS;
      RESIZE_WAIT_TIMEOUT = $__m.RESIZE_WAIT_TIMEOUT;
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
      QUnit.module('useNative', moduleConfig);
      QUnit.test('scrollable render', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({useNative: true});
        assert.ok($scrollable.hasClass(SCROLLABLE_NATIVE_CLASS), 'dx-scrollable-native class attached');
      });
      QUnit.test('simulated scroll does not work when using native', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({useNative: true});
        var mouse = pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start();
        var distance = -10;
        var startLocation = getScrollOffset($scrollable);
        mouse.down().move(0, distance).up();
        var location = getScrollOffset($scrollable);
        assert.equal(location.top, startLocation.top, 'scroll does not move');
      });
      QUnit.test('scroll action fired for simulated scroller during native scroll', function(assert) {
        assert.expect(1);
        this.clock.restore();
        var done = assert.async();
        var $scrollable = $('#scrollable').dxScrollable({
          inertiaEnabled: false,
          useNative: false
        });
        $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS).scrollTop(10);
        setTimeout(function() {
          assert.equal($scrollable.dxScrollable('instance').scrollOffset().top, 10, 'scroll action fired with right offset');
          done();
        }, RESIZE_WAIT_TIMEOUT);
      });
      QUnit.test('scroll action fired when scrollable scrolling', function(assert) {
        assert.expect(2);
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: true,
          onScroll: function() {
            assert.ok(true, 'scroll fired');
          }
        });
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        var pointer = pointerMock($container).start().wheel(10);
        $container.scrollTop(10);
        pointer.wheel(10);
      });
      QUnit.test('scroll action should be fired when scroll location does not changed', function(assert) {
        assert.expect(2);
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: true,
          onScroll: function() {
            assert.ok(true, 'scroll fired');
          }
        });
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        pointerMock($container).start().wheel(0).wheel(0);
      });
      QUnit.test('scrollBy', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({useNative: true});
        var instance = $scrollable.dxScrollable('instance');
        instance.scrollBy(10);
        assert.equal(instance.scrollTop(), 10, 'container has correctly position');
        instance.scrollBy(20);
        assert.equal(instance.scrollTop(), 30, 'container has correctly position');
      });
      QUnit.test('scrollTo', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({useNative: true});
        var instance = $scrollable.dxScrollable('instance');
        $scrollable.dxScrollable('scrollTo', 10);
        assert.equal(instance.scrollTop(), 10, 'container has correctly position');
        $scrollable.dxScrollable('scrollTo', 20);
        assert.equal(instance.scrollTop(), 20, 'container has correctly position');
      });
      QUnit.test('useSimulatedScrollbar = false do not create scrollbars when useNative true', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: true,
          useSimulatedScrollbar: false
        });
        assert.equal($scrollable.find('.' + SCROLLABLE_SCROLLBAR_CLASS).length, 0);
      });
      QUnit.test('useSimulatedScrollbar = true create scrollbars when useNative true', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: true,
          useSimulatedScrollbar: true
        });
        assert.equal($scrollable.find('.' + SCROLLABLE_SCROLLBAR_CLASS).length, 1);
      });
      QUnit.test('useSimulatedScrollbar = false remove old scrollbars when useNative true', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: true,
          useSimulatedScrollbar: true
        });
        $scrollable.dxScrollable('option', 'useSimulatedScrollbar', false);
        assert.equal($scrollable.find('.' + SCROLLABLE_SCROLLBAR_CLASS).length, 0);
      });
      QUnit.test('simulatedScrollbar direction', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: true,
          useSimulatedScrollbar: true
        });
        assert.equal($scrollable.find('.' + SCROLLBAR_VERTICAL_CLASS).length, 1, 'vertical scrollbar was been added');
        assert.equal($scrollable.find('.' + SCROLLBAR_HORIZONTAL_CLASS).length, 0, 'horizontal scrollbar was not been added');
        $scrollable.dxScrollable('option', 'direction', 'horizontal');
        assert.equal($scrollable.find('.' + SCROLLBAR_VERTICAL_CLASS).length, 0, 'vertical scrollbar was not been added');
        assert.equal($scrollable.find('.' + SCROLLBAR_HORIZONTAL_CLASS).length, 1, 'horizontal scrollbar was been added');
        $scrollable.dxScrollable('option', 'direction', 'both');
        assert.equal($scrollable.find('.' + SCROLLBAR_VERTICAL_CLASS).length, 1, 'vertical scrollbar was been added');
        assert.equal($scrollable.find('.' + SCROLLBAR_HORIZONTAL_CLASS).length, 1, 'horizontal scrollbar was been added');
      });
      QUnit.test('simulatedScrollbar visibility', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: true,
          useSimulatedScrollbar: true
        });
        var $scroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        assert.equal($scroll.hasClass('dx-state-invisible'), true, 'on start thumb is hidden');
        pointerMock($container).start().wheel(10);
        assert.equal($scroll.hasClass('dx-state-invisible'), isRenovatedScrollable ? true : false, 'after move thumb is visible');
      });
      QUnit.test('scrollbar height calculated correctly when simulatedScrollbar is true', function(assert) {
        var containerHeight = 50;
        var contentHeight = 100;
        var onUpdatedHandler = sinon.spy();
        var scrollHeight = (containerHeight / contentHeight) * containerHeight;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: true,
          useSimulatedScrollbar: true,
          onUpdated: onUpdatedHandler
        });
        var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var $scroll = $scrollable.find('.' + SCROLLABLE_SCROLL_CLASS);
        $container.height(containerHeight);
        $content.height(contentHeight);
        onUpdatedHandler.reset();
        $scrollable.dxScrollable('instance').update();
        assert.strictEqual(onUpdatedHandler.callCount, 1, 'onUpdatedHandler.callCount');
        assert.equal($scroll.outerHeight(), scrollHeight, 'scrollbar height calculated correctly');
      });
      QUnit.test('moving scrollable moves scrollbar', function(assert) {
        var containerHeight = 50;
        var contentHeight = 100;
        var distance = 10;
        var scrollbarDistance = distance * (containerHeight / contentHeight);
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: true,
          useSimulatedScrollbar: true
        });
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        var $scroll = $scrollable.find('.' + SCROLLABLE_SCROLL_CLASS);
        $container.height(containerHeight);
        $content.height(contentHeight);
        $scrollable.dxScrollable('instance').update();
        $scrollable.dxScrollable('scrollTo', 2 * distance);
        $container.trigger('scroll');
        var location = getTranslateValues($scroll.get(0));
        assert.equal(location.top, 2 * scrollbarDistance, 'scrollbar follows pointer everytime');
      });
      QUnit.test('scrollbar appears for simulated scrolling even when useSimulatedScrollbar is false', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          useSimulatedScrollbar: false,
          inertiaEnabled: false
        });
        var $scroll = $scrollable.find(("." + SCROLLBAR_VERTICAL_CLASS + " .dx-scrollable-scroll"));
        assert.equal($scroll.hasClass('dx-state-invisible'), true, 'scrollbar is hidden before scrolling');
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().move(0, -1);
        assert.equal($scroll.hasClass('dx-state-invisible'), false, 'scrollbar is shown during scrolling');
      });
      QUnit.test('scrollOffset', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({useNative: true});
        var instance = $scrollable.dxScrollable('instance');
        instance.scrollTo(10);
        assert.deepEqual(instance.scrollOffset(), {
          top: 10,
          left: 0
        }, 'scrollOffset is correct');
      });
      QUnit.test('scrollHeight', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({useNative: true});
        var $content = $('.' + SCROLLABLE_CONTENT_CLASS, $scrollable);
        $content.css('padding', '10px');
        assert.equal($scrollable.dxScrollable('scrollHeight'), $content.outerHeight(), 'scroll height equals to content height');
      });
      QUnit.test('clientHeight', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({useNative: true});
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        assert.equal($scrollable.dxScrollable('clientHeight'), $container.height(), 'client height equals to container height');
      });
      QUnit.test('scrollWidth', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({useNative: true});
        var $content = $('.' + SCROLLABLE_CONTENT_CLASS, $scrollable);
        assert.equal($scrollable.dxScrollable('scrollWidth'), $content.width(), 'scroll width equals to content width');
      });
      QUnit.test('clientWidth', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({useNative: true});
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        $container.css({overflowY: 'hidden'});
        assert.equal($scrollable.dxScrollable('clientWidth'), $container.width(), 'client width equals to container width');
      });
      QUnit.test('scroll reachedTop true only at the top', function(assert) {
        var currentScrollTopState = true;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: true,
          onScroll: function(e) {
            assert.equal(e.reachedLeft, undefined, 'reached left is not defined');
            assert.equal(e.reachedRight, undefined, 'reached right is not defined');
            assert.equal(e.reachedTop, currentScrollTopState, 'reached top is correct');
          }
        });
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        $container.trigger('scroll');
        currentScrollTopState = false;
        $scrollable.dxScrollable('scrollTo', 1);
        $container.trigger('scroll');
        currentScrollTopState = true;
        $scrollable.dxScrollable('scrollTo', 0);
        $container.trigger('scroll');
      }), QUnit.test('scroll reachedBottom true only at the bottom', function(assert) {
        var currentScrollBottomState = false;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: true,
          onScroll: function(e) {
            assert.equal(e.reachedLeft, undefined, 'reached left is not defined');
            assert.equal(e.reachedRight, undefined, 'reached right is not defined');
            assert.equal(e.reachedBottom, currentScrollBottomState, 'reached bottom is correct');
          }
        });
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        var $content = $('.' + SCROLLABLE_CONTENT_CLASS, $scrollable);
        var containerSize = $container.prop('clientHeight');
        var contentSize = $content.outerHeight();
        $container.trigger('scroll');
        currentScrollBottomState = true;
        $scrollable.dxScrollable('scrollTo', contentSize - containerSize);
        $container.trigger('scroll');
        currentScrollBottomState = false;
        $scrollable.dxScrollable('scrollTo', contentSize - containerSize - 1);
        $container.trigger('scroll');
      });
      QUnit.test('scroll reachedLeft true only at the left border', function(assert) {
        var currentScrollLeftState = true;
        var $scrollable = $('#scrollable').width(100);
        $scrollable.children().width(200);
        $scrollable.dxScrollable({
          useNative: true,
          direction: 'horizontal',
          onScroll: function(e) {
            assert.equal(e.reachedLeft, currentScrollLeftState, 'reached left is correct');
            assert.equal(e.reachedTop, undefined, 'reached top is not defined');
            assert.equal(e.reachedBottom, undefined, 'reached bottom is not defined');
          }
        });
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        $container.trigger('scroll');
        currentScrollLeftState = false;
        $scrollable.dxScrollable('scrollTo', 1);
        $container.trigger('scroll');
        currentScrollLeftState = true;
        $scrollable.dxScrollable('scrollTo', 0);
        $container.trigger('scroll');
      });
      QUnit.test('scroll reachedRight true only at the right border', function(assert) {
        var currentScrollLeftState = false;
        var $scrollable = $('#scrollable').width(100);
        $scrollable.children().width(200);
        $scrollable.dxScrollable({
          useNative: true,
          direction: 'horizontal',
          onScroll: function(e) {
            assert.equal(e.reachedRight, currentScrollLeftState, 'reached right is correct');
            assert.equal(e.reachedTop, undefined, 'reached top is not defined');
            assert.equal(e.reachedBottom, undefined, 'reached bottom is not defined');
          }
        });
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        var $content = $('.' + SCROLLABLE_CONTENT_CLASS, $scrollable);
        var containerSize = $container.prop('clientWidth');
        var contentSize = $content.outerWidth();
        $container.trigger('scroll');
        currentScrollLeftState = true;
        $scrollable.dxScrollable('scrollTo', contentSize - containerSize);
        $container.trigger('scroll');
        currentScrollLeftState = false;
        $scrollable.dxScrollable('scrollTo', contentSize - containerSize - 1);
        $container.trigger('scroll');
      });
      QUnit.test('scroll args are correct', function(assert) {
        var top = true;
        var left = true;
        var right = false;
        var bottom = false;
        var lastScrollEventArgs;
        var $scrollable = $('#scrollable').width(100);
        $scrollable.children().width(200);
        $scrollable.dxScrollable({
          useNative: true,
          direction: 'both',
          onScroll: function(e) {
            lastScrollEventArgs = e;
          }
        });
        var checkLastScrollEvent = function() {
          assert.equal(lastScrollEventArgs.reachedTop, top, 'reached top is correct');
          assert.equal(lastScrollEventArgs.reachedRight, right, 'reached right is correct');
          assert.equal(lastScrollEventArgs.reachedBottom, bottom, 'reached bottom is correct');
          assert.equal(lastScrollEventArgs.reachedLeft, left, 'reached left is correct');
        };
        var $container = $('.' + SCROLLABLE_CONTAINER_CLASS, $scrollable);
        var containerWidth = $container.prop('clientWidth');
        var contentWidth = $container.prop('scrollWidth');
        var containerHeight = $container.prop('clientHeight');
        var contentHeight = $container.prop('scrollHeight');
        assert.ok(!lastScrollEventArgs, 'scroll was not triggered on start');
        $container.trigger('scroll');
        checkLastScrollEvent();
        top = false;
        $scrollable.dxScrollable('scrollTo', {
          left: 0,
          top: 1
        });
        $container.trigger('scroll');
        checkLastScrollEvent();
        left = false;
        $scrollable.dxScrollable('scrollTo', {
          left: 1,
          top: 1
        });
        $container.trigger('scroll');
        checkLastScrollEvent();
        bottom = true;
        $scrollable.dxScrollable('scrollTo', {
          left: 1,
          top: contentHeight - containerHeight
        });
        $container.trigger('scroll');
        checkLastScrollEvent();
        right = true;
        $scrollable.dxScrollable('scrollTo', {
          left: contentWidth - containerWidth,
          top: contentHeight - containerHeight
        });
        $container.trigger('scroll');
        checkLastScrollEvent();
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","renovation/ui/scroll_view/utils/get_translate_values","animation/frame","../../../helpers/pointerMock.js","ui/scroll_view/ui.scrollable","generic_light.css!","./scrollable.constants.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("renovation/ui/scroll_view/utils/get_translate_values"), require("animation/frame"), require("../../../helpers/pointerMock.js"), require("ui/scroll_view/ui.scrollable"), require("generic_light.css!"), require("./scrollable.constants.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollable.useNative.tests.js.map