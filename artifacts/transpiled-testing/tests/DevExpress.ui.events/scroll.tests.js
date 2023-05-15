!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.events/scroll.tests.js"], ["jquery","core/utils/common","events/gesture/emitter.gesture.scroll","events/gesture/emitter.gesture","events/utils/index","core/devices","core/utils/version","animation/frame","../../helpers/pointerMock.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.ui.events/scroll.tests.js', ['jquery', 'core/utils/common', 'events/gesture/emitter.gesture.scroll', 'events/gesture/emitter.gesture', 'events/utils/index', 'core/devices', 'core/utils/version', 'animation/frame', '../../helpers/pointerMock.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const scrollEvents = $__require('events/gesture/emitter.gesture.scroll');
    const GestureEmitter = $__require('events/gesture/emitter.gesture');
    const eventUtils = $__require('events/utils/index');
    const devices = $__require('core/devices');
    const compareVersions = $__require('core/utils/version').compare;
    const animationFrame = $__require('animation/frame');
    const pointerMock = $__require('../../helpers/pointerMock.js');

    QUnit.testStart(function () {
        const markup = '<div id="container">\
            <div id="scrollable"></div>\
        </div>';

        $('#qunit-fixture').html(markup);
    });

    const FRAME_DURATION = Math.round(1000 / 60);
    const INERTIA_TIMEOUT = 100;
    const VELOCITY_CALC_TIMEOUT = 200;
    const TOUCH_BOUNDARY = GestureEmitter.initialTouchBoundary;

    GestureEmitter.touchBoundary(TOUCH_BOUNDARY);

    const moduleConfig = {
        beforeEach: function () {
            this.clock = sinon.useFakeTimers();
        },
        afterEach: function () {
            this.clock.restore();
        }
    };

    QUnit.module('scroll init');

    QUnit.test('dxscrollinit fired on pointer down', function (assert) {
        let fired = 0;
        let args;

        const $scrollable = $('#scrollable').on(scrollEvents.init, function (e) {
            args = e;
            fired++;
        });

        const $innerContent = $('<div>').appendTo($scrollable);

        pointerMock($innerContent).start().down();

        assert.equal(fired, 1, 'dxscrollinit fired once');
        assert.ok($scrollable.is(args.target), 'event target specified');
        assert.ok(args.originalEvent, 'original event specified');
    });

    QUnit.test('dxscrollinit is not fired on element without subscription', function (assert) {
        assert.expect(0);

        const $scrollable = $('#scrollable');
        const $after = $('<div>').insertAfter($scrollable);

        $scrollable.on(scrollEvents.init, function () {
            assert.ok(false, 'dxscrollinit fired');
        });

        pointerMock($after).start().down();
    });

    QUnit.test('dxscrollinit considers events.needSkipEvent', function (assert) {
        assert.expect(0);

        try {
            eventUtils.forceSkipEvents();

            const $scrollable = $('#scrollable').on(scrollEvents.init, function (e) {
                assert.ok(false, 'dxscrollinit fired');
            });

            pointerMock($scrollable).start().down();
        } finally {
            eventUtils.stopEventsSkipping();
        }
    });

    QUnit.test('dxscrollinit bubbling', function (assert) {
        assert.expect(1);

        const $scrollable = $('#scrollable').on(scrollEvents.init, noop);

        const $scrollableParent = $scrollable.wrap('<div>').parent();

        $scrollableParent.on(scrollEvents.init, function () {
            assert.ok(true, 'dxscrollinit bubbles');
        });

        pointerMock($scrollable).start().down();
    });

    QUnit.test('dxscrollinit canceling', function (assert) {
        assert.expect(0);

        const $scrollable = $('#scrollable').on(scrollEvents.init, function (e) {
            e.cancel = true;
        });
        $scrollable.on(scrollEvents.start, function () {
            assert.ok(false, 'scrollstart was not canceled');
        });

        pointerMock($scrollable).start().down().move();
    });

    QUnit.module('scroll start');

    QUnit.test('dxscrollstart fired on first pointer move', function (assert) {
        let fired = 0;
        let args;

        const $scrollable = $('#scrollable').on(scrollEvents.start, function (e) {
            args = e;
            fired++;
        });

        pointerMock($scrollable).start().down().move(TOUCH_BOUNDARY);

        assert.equal(fired, 1, 'dxscrollstart fired once');
        assert.ok($scrollable.is(args.target), 'event target specified');
        assert.ok(args.originalEvent, 'original event specified');
    });

    QUnit.test('dxscrollstart should not fire without start', function (assert) {
        assert.expect(0);

        const $scrollable = $('#scrollable').on(scrollEvents.start, function (e) {
            assert.ok(false, 'dxscrollstart fired');
        });

        pointerMock($scrollable).start().move();
    });

    QUnit.test('dxscrollstart fired only on first pointer move', function (assert) {
        let fired = 0;
        const $scrollable = $('#scrollable').on(scrollEvents.start, function (e) {
            fired++;
        });

        pointerMock($scrollable).start().down().move(TOUCH_BOUNDARY).move();

        assert.equal(fired, 1, 'dxscrollstart fired once');
    });

    QUnit.test('dxscrollstart canceling', function (assert) {
        assert.expect(0);

        const $scrollable = $('#scrollable').on(scrollEvents.start, function (e) {
            e.cancel = true;
        }).on(scrollEvents.move, function () {
            assert.ok(false, 'dxscroll fired for canceled event');
        });

        pointerMock($scrollable).start().down().move();
    });

    QUnit.module('scroll move');

    QUnit.test('dxscroll fired on pointer move', function (assert) {
        let fired = 0;
        let args;
        let moveEventData;

        const $scrollable = $('#scrollable').on(scrollEvents.move, function (e) {
            args = e;
            fired++;
            moveEventData = eventUtils.eventData(e.originalEvent);
        });

        pointerMock($scrollable).start().down().move(TOUCH_BOUNDARY, TOUCH_BOUNDARY);

        assert.equal(fired, 1, 'dxscroll fired once');
        assert.ok($scrollable.is(args.target), 'event target specified');
        assert.ok(args.originalEvent, 'original event specified');
        assert.deepEqual(args.delta, eventUtils.eventDelta(moveEventData, moveEventData), 'delta specified');
    });

    QUnit.test('dxscroll fired on every move', function (assert) {
        let fired = 0;
        let lastDelta;

        const $scrollable = $('#scrollable').on(scrollEvents.move, function (e) {
            lastDelta = e.delta;
            fired++;
        });

        pointerMock($scrollable).start().down().move(TOUCH_BOUNDARY, TOUCH_BOUNDARY).move(20, 20);

        assert.equal(fired, 2, 'dxscroll fired twice');
        assert.equal(lastDelta.y, 20, 'delta between move events');
    });

    QUnit.test('dxscroll canceling', function (assert) {
        let fired = 0;

        const $scrollable = $('#scrollable').on(scrollEvents.move, function (e) {
            e.cancel = true;
            fired++;
        });

        pointerMock($scrollable).start().down().move(TOUCH_BOUNDARY, TOUCH_BOUNDARY).move(20, 20);

        assert.equal(fired, 1, 'dxscroll fired once');
    });

    QUnit.module('scroll end');

    QUnit.test('dxscrollend fired on pointer end', function (assert) {
        let fired = 0;
        let args;
        const scrollDistance = 10;
        const waitTime = 10;

        const $scrollable = $('#scrollable').on(scrollEvents.end, function (e) {
            fired++;
            args = e;
        });

        pointerMock($scrollable).start().down().wait(waitTime).move(TOUCH_BOUNDARY, TOUCH_BOUNDARY).move(scrollDistance, scrollDistance).up();

        const velocity = scrollDistance * FRAME_DURATION / waitTime;

        assert.equal(fired, 1, 'dxscrollend fired once');
        assert.ok($scrollable.is(args.target), 'event target specified');
        assert.ok(args.originalEvent, 'original event specified');
        assert.deepEqual(args.velocity, { x: velocity, y: velocity }, 'velocity specified');
    });

    QUnit.test('zero velocity when gesture end is deferred', function (assert) {
        let args;

        const $scrollable = $('#scrollable').on(scrollEvents.end, function (e) {
            args = e;
        });

        pointerMock($scrollable).start().down().wait(10).move(TOUCH_BOUNDARY, TOUCH_BOUNDARY).wait(INERTIA_TIMEOUT).up();

        assert.deepEqual(args.velocity, { x: 0, y: 0 }, 'zero velocity');
    });

    QUnit.test('dxscrollend velocity calculation', function (assert) {
        let args;
        const scrollDistance = 10;
        const waitTimeout = 10;
        const halfScrollDistance = scrollDistance / 2;

        const $scrollable = $('#scrollable').on(scrollEvents.end, function (e) {
            args = e;
        });

        pointerMock($scrollable).start().down().wait(VELOCITY_CALC_TIMEOUT + 1).move(scrollDistance, scrollDistance).wait(waitTimeout).move(halfScrollDistance, halfScrollDistance).up();

        const velocity = halfScrollDistance * FRAME_DURATION / waitTimeout;
        assert.deepEqual(args.velocity, { x: velocity, y: velocity }, 'velocity is correct');
    });

    QUnit.test('pointer up stops scrolling', function (assert) {
        assert.expect(0);

        let finished = false;

        const $scrollable = $('#scrollable').on(scrollEvents.move, function (e) {
            if (finished) {
                assert.ok(false, 'dxscroll fired after pointer end');
            }
        }).on(scrollEvents.end, function (e) {
            finished = true;
        });

        pointerMock($scrollable).start().down().move().up().move();
    });

    QUnit.test('no scrolling without pointer down after pointer up', function (assert) {
        assert.expect(0);

        const $scrollable = $('#scrollable').on(scrollEvents.move, function (e) {
            assert.ok(false, 'dxscroll fired after pointer end');
        });

        pointerMock($scrollable).start().down().up().move();
    });

    QUnit.test('dxscrollend should not be fired when there was no pointer move', function (assert) {
        assert.expect(0);

        const $scrollable = $('#scrollable').on(scrollEvents.end, function (e) {
            assert.ok(false, 'dxscrollend fired there was no pointer move');
        });

        pointerMock($scrollable).start().down().up();
    });

    QUnit.module('scroll stop');

    QUnit.test('dxscrollstop fired on tap', function (assert) {
        let fired = 0;
        let args;

        const $scrollable = $('#scrollable').on(scrollEvents.stop, function (e) {
            args = e;
            fired++;
        });

        pointerMock($scrollable).start().down().up();

        assert.equal(fired, 1, 'dxscrollstop fired once');
        assert.ok($scrollable.is(args.target), 'event target specified');
        assert.ok(args.originalEvent, 'original event specified');
    });

    QUnit.module('scroll cancel');

    QUnit.test('scroll cancel fired when direction is wrong', function (assert) {
        let cancelEventCounter = 0;
        $('#container').on(scrollEvents.move, { direction: 'horizontal' }, noop);
        const $scrollable = $('#scrollable').on(scrollEvents.cancel, { direction: 'vertical' }, function () {
            cancelEventCounter++;
        });

        pointerMock($scrollable).start().down().move(TOUCH_BOUNDARY, 0);

        assert.equal(cancelEventCounter, 1, 'cancel event fired once');
    });

    QUnit.test('scroll cancel fired after set e.cancel=true', function (assert) {
        let cancelEventCounter = 0;
        const $scrollable = $('#scrollable').on(scrollEvents.init, function (e) {
            e.cancel = true;
        }).on(scrollEvents.cancel, function () {
            cancelEventCounter++;
        });

        pointerMock($scrollable).start().down();

        assert.equal(cancelEventCounter, 1, 'cancel event fired once');
    });

    QUnit.module('scroll wheel');

    QUnit.test('dxscrollwheel fired on mouse wheel', function (assert) {
        let scrollInit = 0;
        let scrollStart = 0;
        let scrollMove = 0;
        let scrollEnd = 0;
        const distance = TOUCH_BOUNDARY;

        const $scrollable = $('#scrollable').on(scrollEvents.init, {
            validate: function () {
                return true;
            }
        }, function () {
            scrollInit++;
        }).on(scrollEvents.start, function (e) {
            if (scrollInit) {
                scrollStart++;
            }
        }).on(scrollEvents.move, function () {
            if (scrollStart) {
                scrollMove++;
            }
        }).on(scrollEvents.end, function () {
            if (scrollMove) {
                scrollEnd++;
            }
        });

        pointerMock($scrollable).start().wheel(distance);

        assert.equal(scrollInit, 1, 'scrollInit fired once');
        assert.equal(scrollStart, 1, 'scrollStart fired once after scrollWheel');
        assert.equal(scrollMove, 1, 'scroll fired once after scrollStart');
        assert.equal(scrollEnd, 1, 'scrollEnd fired once after scrollMove');
    });

    QUnit.test('dxscrollwheel fires move after dxclick', function (assert) {
        let scrollStartCounter = 0;
        const $scrollable = $('#scrollable').on(scrollEvents.start, {
            validate: function () {
                return true;
            }
        }, function () {
            scrollStartCounter++;
        }).on('dxclick', noop);

        const pointer = pointerMock($scrollable).start().click();
        pointer.wheel(TOUCH_BOUNDARY);

        assert.equal(scrollStartCounter, 1, 'scrollstart was fired');
    });

    QUnit.test('dxscrollwheel did not prevent event', function (assert) {
        let isDefaultPrevented;
        const $scrollable = $('#scrollable').on(scrollEvents.move, {
            validate: function () {
                return true;
            }
        }, noop);
        $(document).on('dxmousewheel', function (e) {
            isDefaultPrevented = e.isDefaultPrevented();
        });

        pointerMock($scrollable).start().wheel(TOUCH_BOUNDARY);

        assert.strictEqual(isDefaultPrevented, false, 'dxscrollwhell was not prevented');
    });

    (function () {

        QUnit.module('wheel locker', moduleConfig);

        const wheelMove = function ($element, shiftKey) {
            pointerMock($element).start().wheel(20, { shiftKey });
        };

        const WHEEL_UNLOCK_TIMEOUT = 400;

        QUnit.test('lock should be released on only after timeout', function (assert) {
            let innerCaptured = false;

            const $inner = $('#scrollable').on(scrollEvents.move, {
                direction: 'vertical',
                validate: function () {
                    return true;
                }
            }, function () {
                innerCaptured = true;
            });

            const $outer = $('#container').on(scrollEvents.move, {
                direction: 'vertical',
                validate: function () {
                    return true;
                }
            }, noop);

            wheelMove($outer);

            this.clock.tick(WHEEL_UNLOCK_TIMEOUT - 1);
            wheelMove($inner);
            assert.ok(!innerCaptured, 'inner scroll was not captured');

            this.clock.tick(WHEEL_UNLOCK_TIMEOUT + 1);
            wheelMove($inner);
            assert.ok(innerCaptured, 'inner scroll was captured');
        });

        QUnit.test('lock should be released after direction change', function (assert) {
            let innerCaptured = false;

            const $inner = $('#scrollable').on(scrollEvents.move, {
                direction: 'horizontal',
                validate: function () {
                    return true;
                }
            }, function () {
                innerCaptured = true;
            });

            $('#container').on(scrollEvents.move, {
                direction: 'vertical',
                validate: function () {
                    return true;
                }
            }, noop);

            wheelMove($inner);
            wheelMove($inner, true);
            assert.ok(innerCaptured, 'inner scroll was captured');
        });
    })();

    (function () {

        QUnit.module('pointer locker', moduleConfig);

        const pointerMove = function ($element) {
            pointerMock($element).start().down().move(20).up();
            $element.triggerHandler('scroll');
        };

        const realDevice = devices.real();

        if (realDevice.ios && compareVersions(realDevice.version, [8]) >= 0 || realDevice.android && compareVersions(realDevice.version, [5]) >= 0) {

            QUnit.test('lock should not be released on if scroll stopped (before frame)', function (assert) {
                const done = assert.async();

                let innerCaptured = false;

                const $inner = $('#scrollable').on(scrollEvents.move, {
                    direction: 'both',
                    validate: function () {
                        return true;
                    }
                }, function () {
                    innerCaptured = true;
                });

                const $outer = $('#container').on(scrollEvents.move, {
                    direction: 'both',
                    validate: function () {
                        return true;
                    }
                }, noop);

                pointerMove($outer);
                const innerPointer = pointerMock($inner).start();
                innerPointer.down();
                animationFrame.requestAnimationFrame(function () {
                    innerPointer.move(20).up();
                    assert.ok(!innerCaptured, 'inner scroll was not captured');

                    done();
                });
            });

            QUnit.test('lock should be released on if scroll not stopped (before frame)', function (assert) {
                const done = assert.async();

                let innerCaptured = false;

                const $inner = $('#scrollable').on(scrollEvents.move, {
                    direction: 'both',
                    validate: function () {
                        return true;
                    }
                }, function () {
                    innerCaptured = true;
                });

                const $outer = $('#container').on(scrollEvents.move, {
                    direction: 'both',
                    validate: function () {
                        return true;
                    }
                }, noop);

                pointerMove($outer);
                const innerPointer = pointerMock($inner).start();

                animationFrame.requestAnimationFrame(function () {
                    innerPointer.down();
                    animationFrame.requestAnimationFrame(function () {
                        innerPointer.move(20).up();
                        assert.ok(innerCaptured, 'inner scroll was captured');

                        done();
                    });
                });
            });

            QUnit.test('lock should not be released if scroll stopped (after frame)', function (assert) {
                const done = assert.async();

                let innerCaptured = false;

                const $inner = $('#scrollable').on(scrollEvents.move, {
                    direction: 'both',
                    validate: function () {
                        return true;
                    }
                }, function () {
                    innerCaptured = true;
                });

                const $outer = $('#container').on(scrollEvents.move, {
                    direction: 'both',
                    validate: function () {
                        return true;
                    }
                }, noop);

                const innerPointer = pointerMock($inner).start();
                innerPointer.down();
                $outer.triggerHandler('scroll');
                animationFrame.requestAnimationFrame(function () {
                    innerPointer.move(20).up();
                    assert.ok(!innerCaptured, 'inner scroll was not captured');

                    done();
                });
            });

            QUnit.test('lock should be released on only if scroll stopped (after frame)', function (assert) {
                const done = assert.async();

                let innerCaptured = false;

                const $inner = $('#scrollable').on(scrollEvents.move, {
                    direction: 'both',
                    validate: function () {
                        return true;
                    }
                }, function () {
                    innerCaptured = true;
                });

                const $outer = $('#container').on(scrollEvents.move, {
                    direction: 'both',
                    validate: function () {
                        return true;
                    }
                }, noop);

                const innerPointer = pointerMock($inner).start();
                innerPointer.down();
                animationFrame.requestAnimationFrame(function () {
                    $outer.triggerHandler('scroll');
                    innerPointer.move(20).up();
                    assert.ok(innerCaptured, 'inner scroll was captured');

                    done();
                });
            });
        } else {
            const POINTER_UNLOCK_TIMEOUT = 400;

            QUnit.test('lock should be released on only after timeout', function (assert) {
                let innerCaptured = false;

                const $inner = $('#scrollable').on(scrollEvents.move, {
                    direction: 'both',
                    validate: function () {
                        return true;
                    }
                }, function () {
                    innerCaptured = true;
                });

                const $outer = $('#container').on(scrollEvents.move, {
                    direction: 'both',
                    validate: function () {
                        return true;
                    }
                }, noop);

                pointerMove($outer);

                this.clock.tick(POINTER_UNLOCK_TIMEOUT - 1);
                pointerMove($inner);
                assert.ok(!innerCaptured, 'inner scroll was not captured');

                this.clock.tick(POINTER_UNLOCK_TIMEOUT + 1);
                pointerMove($inner);
                assert.ok(innerCaptured, 'inner scroll was captured');
            });

            QUnit.test('lock should not be accepted when native mouse event is used', function (assert) {
                let innerCaptured = false;

                const $inner = $('#scrollable').on(scrollEvents.move, {
                    direction: 'both',
                    isNative: true,
                    validate: function () {
                        return true;
                    }
                }, function () {
                    innerCaptured = true;
                });

                const $outer = $('#container').on(scrollEvents.move, {
                    direction: 'both',
                    isNative: true,
                    validate: function () {
                        return true;
                    }
                }, noop);

                pointerMove($outer);

                this.clock.tick(POINTER_UNLOCK_TIMEOUT - 1);
                pointerMove($inner);

                assert.ok(innerCaptured, 'inner scroll was captured before timeout');
            });
        }
    })();
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","events/gesture/emitter.gesture.scroll","events/gesture/emitter.gesture","events/utils","core/devices","core/utils/version","animation/frame","../../helpers/pointerMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("events/gesture/emitter.gesture.scroll"), require("events/gesture/emitter.gesture"), require("events/utils"), require("core/devices"), require("core/utils/version"), require("animation/frame"), require("../../helpers/pointerMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scroll.tests.js.map