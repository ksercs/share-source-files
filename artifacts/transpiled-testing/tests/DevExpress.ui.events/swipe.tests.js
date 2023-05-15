!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.events/swipe.tests.js"], ["jquery","core/utils/common","events/swipe","core/utils/math","core/utils/dom","core/action","core/devices","events/gesture/emitter.gesture","../../helpers/pointerMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.events/swipe.tests.js", ["jquery", "core/utils/common", "events/swipe", "core/utils/math", "core/utils/dom", "core/action", "core/devices", "events/gesture/emitter.gesture", "../../helpers/pointerMock.js"], function($__export) {
  "use strict";
  var $,
      noop,
      swipeEvents,
      mathUtils,
      domUtils,
      Action,
      devices,
      GestureEmitter,
      pointerMock,
      TOUCH_BOUNDARY,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      swipeEvents = $__m.default;
    }, function($__m) {
      mathUtils = $__m.default;
    }, function($__m) {
      domUtils = $__m.default;
    }, function($__m) {
      Action = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      GestureEmitter = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="container">\
            <div id="element"></div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      TOUCH_BOUNDARY = GestureEmitter.initialTouchBoundary;
      GestureEmitter.touchBoundary(TOUCH_BOUNDARY);
      moduleConfig = {
        beforeEach: function() {
          this.element = $('<div></div>').appendTo('body');
          this.mouse = pointerMock(this.element);
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.element.remove();
          this.clock.restore();
        }
      };
      $.each(['horizontal', 'vertical'], function(_, direction) {
        var prepareMoveCoord = function(x, y) {
          if (direction === 'horizontal') {
            return [x, y];
          }
          if (direction === 'vertical') {
            return [y, x];
          }
        };
        QUnit.module(direction, moduleConfig);
        QUnit.test('swipe update event', function(assert) {
          var element = this.element;
          var mouse = this.mouse;
          var updateHistory = [];
          element.on(swipeEvents.swipe, {
            itemSizeFunc: function() {
              return 1000;
            },
            direction: direction
          }, function(e) {
            assert.strictEqual(e.target, element[0]);
            updateHistory.push(e.offset);
          });
          mouse.start().down().move(prepareMoveCoord(500 + TOUCH_BOUNDARY, 0)).move(prepareMoveCoord(250, 0));
          assert.deepEqual(updateHistory, [0.5, 0.75]);
        });
        function testSwipeEndEvent(testName, pixelOffset, expectedItemOffset) {
          QUnit.test(testName, function(assert) {
            var element = this.element;
            var mouse = this.mouse;
            var updateCount = 0;
            var itemSize = 1000;
            element.on(swipeEvents.swipe, {
              itemSizeFunc: function() {
                return itemSize;
              },
              direction: direction
            }, function() {
              updateCount++;
            }).on(swipeEvents.end, function(e) {
              assert.strictEqual(e.target, element[0]);
              assert.equal(e.offset, pixelOffset / itemSize);
              assert.equal(e.targetOffset, expectedItemOffset);
              assert.equal(updateCount, 1);
            });
            mouse.start().down().move(prepareMoveCoord(pixelOffset + mathUtils.sign(pixelOffset) * TOUCH_BOUNDARY, 0)).up();
          });
        }
        testSwipeEndEvent('swipe for 2 items', 1600, 2);
        testSwipeEndEvent('swipe for -1 items', -900, -1);
        QUnit.test('fast swipe', function(assert) {
          var mouse = this.mouse;
          var targetOffset;
          this.element.on(swipeEvents.end, {
            itemSizeFunc: function() {
              return 1000;
            },
            direction: direction
          }, function(e) {
            targetOffset = e.targetOffset;
          });
          mouse.start().down().move(prepareMoveCoord(100 + TOUCH_BOUNDARY, 0)).up();
          assert.equal(targetOffset, 1, 'instant single move, not rolled back');
          mouse.start().down().wait(100).move(prepareMoveCoord(1 + TOUCH_BOUNDARY, 0)).up();
          assert.equal(targetOffset, 1, 'short fast single move, not rolled back');
          mouse.start().down().move(prepareMoveCoord(100 + TOUCH_BOUNDARY, 0)).wait(5000).up();
          assert.equal(targetOffset, 0, 'single move, delay before end, rolled back');
          mouse.start().down().move(prepareMoveCoord(50 + TOUCH_BOUNDARY, 0)).wait(10).move(prepareMoveCoord(50, 0)).up();
          assert.equal(targetOffset, 1, 'fast swipe, not rolled back');
          mouse.start().down().move(prepareMoveCoord(50 + TOUCH_BOUNDARY, 0)).wait(5000).move(prepareMoveCoord(50, 0)).up();
          assert.equal(targetOffset, 1, 'slow swipe, rolled back');
          mouse.start().down().move(prepareMoveCoord(33 + TOUCH_BOUNDARY, 0)).wait(5000).move(prepareMoveCoord(33, 0)).wait(10).move(prepareMoveCoord(33, 0)).up();
          assert.equal(targetOffset, 1, 'slow then fast, not rolled back');
          mouse.start().down().move(prepareMoveCoord(33 + TOUCH_BOUNDARY, 0)).wait(10).move(prepareMoveCoord(33, 0)).wait(5000).move(prepareMoveCoord(33, 0)).up();
          assert.equal(targetOffset, 1, 'fast then slow, rolled back');
          this.clock.restore();
        });
        QUnit.test('max offsets', function(assert) {
          var offsetHistory = [];
          this.element.on(swipeEvents.start, {
            itemSizeFunc: function() {
              return 100;
            },
            direction: direction
          }, function(e) {
            e.maxLeftOffset = 1;
            e.maxRightOffset = 1;
            e.maxTopOffset = 1;
            e.maxBottomOffset = 1;
          }).on(swipeEvents.swipe, function(e) {
            offsetHistory.push(e.offset);
          }).on(swipeEvents.end, function(e) {
            offsetHistory.push(e.targetOffset);
          });
          this.mouse.start().down().move(prepareMoveCoord(-400 - TOUCH_BOUNDARY, 0)).up().start().down().move(prepareMoveCoord(400 + TOUCH_BOUNDARY, 0)).up();
          assert.deepEqual(offsetHistory, [-2, -1, 2, 1]);
        });
      });
      QUnit.module('behaviour', moduleConfig);
      QUnit.test('swipe should not be crashed if element deleted at swiping', function(assert) {
        assert.expect(0);
        this.anotherElement = $('<div></div>').appendTo('body');
        try {
          this.element.on(swipeEvents.swipe, noop);
          this.anotherElement.on(swipeEvents.swipe, noop);
          this.mouse.start().down().move(-50);
          this.element.remove();
          this.anotherMouse = pointerMock(this.anotherElement);
          this.anotherMouse.move(-50).up();
        } finally {
          this.anotherElement.remove();
        }
      });
      QUnit.test('swipe event handler should not stop working on the element if another element was removed', function(assert) {
        var $children = $('<div></div><div></div>');
        var called = 0;
        $children.appendTo(this.element).on(swipeEvents.swipe, function() {
          called++;
        });
        $.cleanData($children.eq(0));
        pointerMock($children.eq(1)).start().down().move(-100).up();
        assert.equal(called, 1);
      });
      QUnit.test('swipe ignores wheel', function(assert) {
        assert.expect(0);
        this.element.on(swipeEvents.swipe, function() {
          assert.ok(false, 'dxswipe fired');
        });
        pointerMock(this.element).wheel();
      });
      QUnit.module('blur', {
        beforeEach: function() {
          moduleConfig.beforeEach.call(this);
          this.originalRealDevice = devices.real;
          this.originalCurrentDevice = devices.current();
          this.originalResetActiveElement = domUtils.resetActiveElement;
          this.resetCount = 0;
          domUtils.resetActiveElement = $.proxy(function() {
            this.resetCount++;
          }, this);
        },
        afterEach: function() {
          moduleConfig.afterEach.call(this);
          devices.real = this.originalRealDevice;
          devices.current(this.originalCurrentDevice);
          domUtils.resetActiveElement = this.originalResetActiveElement;
        }
      });
      QUnit.testInActiveWindow('swiper should reset active element inside (B250228)', function(assert) {
        if (!/webkit/i.exec(navigator.userAgent)) {
          assert.ok(true, 'this test run only in webkit');
          return;
        }
        var $innerInput = $('<input>').appendTo(this.element);
        var originalDevice;
        try {
          originalDevice = devices.real();
          devices.real({platform: 'ios'});
          this.element.on(swipeEvents.swipe, noop);
          $innerInput.focus();
          this.element.trigger($.Event('dxpointerdown', {
            pointerType: 'mouse',
            pageX: 0,
            pageY: 0,
            pointers: [0]
          })).trigger($.Event('dxpointermove', {
            pointerType: 'mouse',
            pageX: 100,
            pageY: 0,
            pointers: [0]
          })).trigger($.Event('dxpointerup', {
            pointerType: 'mouse',
            pointers: []
          }));
          assert.equal(this.resetCount, 1, 'inner input was blurred');
        } finally {
          $innerInput.remove();
          devices.real(originalDevice);
        }
      });
      QUnit.testInActiveWindow('swiper should not reset active element outside (B250228)', function(assert) {
        if (!/webkit/i.exec(navigator.userAgent)) {
          assert.ok(true, 'this test run only in webkit');
          return;
        }
        var $outerInput = $('<input>').appendTo('#container');
        try {
          this.element.on(swipeEvents.swipe, noop);
          $outerInput.focus();
          this.element.trigger($.Event('dxpointerdown', {
            pointerType: 'mouse',
            pageX: 0,
            pageY: 0,
            pointers: [0]
          })).trigger($.Event('dxpointermove', {
            pointerType: 'mouse',
            pageX: 100,
            pageY: 0,
            pointers: [0]
          })).trigger($.Event('dxpointerup', {
            pointerType: 'mouse',
            pointers: []
          }));
          assert.equal(this.resetCount, 0, 'outer input was not blurred');
        } finally {
          $outerInput.remove();
        }
      });
      QUnit.module('subscriptions', {
        beforeEach: function() {
          this.element = $('<div class=\'el\'></div>').appendTo('body');
        },
        afterEach: function() {
          this.element.remove();
        }
      });
      QUnit.test('subscription on element should work correctly when event triggered', function(assert) {
        var subscriptionCalled = 0;
        this.element.on(swipeEvents.end, function(e) {
          subscriptionCalled++;
        });
        this.element.trigger(swipeEvents.end);
        assert.strictEqual(subscriptionCalled, 1, 'subscription called');
      });
      QUnit.test('swipe event is not bubble', function(assert) {
        var subscriptionCalled = 0;
        $('body').on(swipeEvents.end + '.testNamespace', '.el', function(e) {
          subscriptionCalled++;
        });
        this.element.trigger(swipeEvents.start).trigger(swipeEvents.swipe).trigger(swipeEvents.end);
        assert.strictEqual(subscriptionCalled, 0, 'subscription is not called');
        $('body').off('.testNamespace');
      });
      QUnit.module('hacks');
      QUnit.test('default behaviour on dxpointermove should be prevented to reduce user selection while swipe', function(assert) {
        var $element = $('#element');
        $element.on(swipeEvents.start, noop);
        $element.trigger($.Event('dxpointerdown', {
          pointerType: 'mouse',
          pageX: 200,
          pageY: 200,
          pointers: [0]
        }));
        var moveEvent = $.Event('dxpointermove', {
          pointerType: 'mouse',
          pageX: 210,
          pageY: 200,
          pointers: [0]
        });
        $element.trigger(moveEvent);
        assert.ok(moveEvent.isDefaultPrevented(), 'default prevented');
        $element.trigger($.Event('dxpointerup', {
          pointerType: 'mouse',
          pointers: []
        }));
      });
      QUnit.test('Event should not be prevented to avoid the "[Intervation] error" when event is not cancelable', function(assert) {
        var $element = $('#element');
        $element.on(swipeEvents.start, noop);
        $element.trigger($.Event('dxpointerdown', {
          pointerType: 'mouse',
          pageX: 200,
          pageY: 200,
          pointers: [0]
        }));
        var moveEvent = $.Event('dxpointermove', {
          cancelable: false,
          pointerType: 'mouse',
          pageX: 210,
          pageY: 200,
          pointers: [0]
        });
        $element.trigger(moveEvent);
        assert.strictEqual(moveEvent.isDefaultPrevented(), false, 'event is not prevented');
      });
      QUnit.module('integration', moduleConfig);
      QUnit.test('action in swipeend callback', function(assert) {
        var actionCalled = 0;
        this.element.on(swipeEvents.end, function(e) {
          return new Action(function() {
            actionCalled++;
          }).execute();
        });
        this.mouse.start().down().move(-400).up();
        assert.strictEqual(actionCalled, 1, 'action fired');
      });
      QUnit.test('body event handler should be unsubscribed if no one swipe event handler present', function(assert) {
        this.element.on(swipeEvents.swipe, noop).off(swipeEvents.swipe);
        var moveHandlers = $.grep(($._data($('body')[0], 'events') || {})['dxpointermove'] || [], function(item) {
          return item.namespace === 'dxSwipe';
        });
        assert.equal(moveHandlers.length, 0, 'handler removed');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","events/swipe","core/utils/math","core/utils/dom","core/action","core/devices","events/gesture/emitter.gesture","../../helpers/pointerMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("events/swipe"), require("core/utils/math"), require("core/utils/dom"), require("core/action"), require("core/devices"), require("events/gesture/emitter.gesture"), require("../../helpers/pointerMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=swipe.tests.js.map