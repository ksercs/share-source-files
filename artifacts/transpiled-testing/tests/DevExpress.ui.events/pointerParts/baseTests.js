!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.events/pointerParts/baseTests.js"], ["jquery","core/utils/common","events/pointer/base","events/core/event_registrator","../../../helpers/eventHelper.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.ui.events/pointerParts/baseTests.js', ['jquery', 'core/utils/common', 'events/pointer/base', 'events/core/event_registrator', '../../../helpers/eventHelper.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const BaseStrategy = $__require('events/pointer/base');
    const registerEvent = $__require('events/core/event_registrator');
    const special = $__require('../../../helpers/eventHelper.js').special;

    const BubbledTestEventMap = {
        'dxpointerdown': 'testdown',
        'dxpointermove': 'testmove',
        'dxpointerup': 'testup',
        'dxpointercancel': 'testcancel'
    };

    const NoBubbledTestEventMap = {
        'dxpointerenter': 'testenter',
        'dxpointerleave': 'testleave'
    };

    const TestEventMap = $.extend({}, BubbledTestEventMap, NoBubbledTestEventMap);

    QUnit.module('base events', {
        beforeEach: function () {
            this.clock = sinon.useFakeTimers();

            $.each(TestEventMap, function (pointerEvent, originalEvents) {
                if (special[pointerEvent]) {
                    special[pointerEvent].dispose.apply(undefined);
                }
                registerEvent(pointerEvent, new BaseStrategy(pointerEvent, originalEvents));
            });
        },

        afterEach: function () {
            this.clock.restore();
        }
    });

    $.each({
        'dxpointerdown': [0, 1, 1, 1],
        'dxpointermove': [0, 0, 1, 1],
        'dxpointerup': [0, 0, 0, 1]
    }, function (eventName, assertions) {
        QUnit.test('\'' + eventName + '\' event triggers', function (assert) {
            let triggered = 0;

            const $element = $('#element');
            $element.on(eventName, function (e) {
                triggered++;
                assert.strictEqual(e.target, $element[0]);
            });

            assert.equal(triggered, assertions[0]);

            $element.trigger('testdown');
            assert.equal(triggered, assertions[1]);

            $element.trigger('testmove');
            assert.equal(triggered, assertions[2]);

            $element.trigger('testup');
            assert.equal(triggered, assertions[3]);
        });
    });

    $.each(TestEventMap, function (pointerEvent, originalEvent) {
        QUnit.test('\'' + pointerEvent + '\' event should be prevented if original event was prevented', function (assert) {
            const $element = $('#element');

            $element.on(originalEvent, function (e) {
                e.preventDefault();
            });

            $element.on(pointerEvent, function (e) {
                assert.strictEqual(e.isDefaultPrevented(), true, '\'' + pointerEvent + '\' event was prevented');
            });

            $element.trigger(originalEvent);
        });
    });

    $.each(NoBubbledTestEventMap, function (pointerEvent, originalEvent) {
        QUnit.test('\'' + pointerEvent + '\' event should not bubble', function (assert) {
            const $element = $('#element');
            let counter = 0;
            $(document).on(originalEvent, function (e) {
                counter++;
            });

            $element.on(pointerEvent, function (e) {
                assert.strictEqual(counter, 0, '\'' + pointerEvent + '\' did not bubble');
            });

            $element.trigger(originalEvent);

            $(document).off(originalEvent);
        });

        QUnit.test('\'' + pointerEvent + '\' event should have delegated subscriptions', function (assert) {
            const $element = $('#element');

            $element.on(pointerEvent, '#delegated', function (e) {
                assert.strictEqual(e.originalEvent.delegateTarget.id, 'element', '\'' + pointerEvent + '\'  have subscription');
            });

            $element.children('#delegated').trigger(originalEvent);
        });
    });

    $.each(BubbledTestEventMap, function (pointerEvent, originalEvent) {
        QUnit.test('\'' + pointerEvent + '\' event should bubble', function (assert) {
            const $element = $('#element');
            let counter = 0;
            $(document).on(originalEvent, function (e) {
                counter++;
            });

            $element.on(pointerEvent, function (e) {
                assert.strictEqual(counter, 1, '\'' + pointerEvent + '\' bubbled');
            });

            $element.trigger(originalEvent);

            $(document).off(originalEvent);
        });

        QUnit.test('\'' + pointerEvent + '\' event should not have delegated subscriptions', function (assert) {
            const $element = $('#element');

            $element.on(pointerEvent, '#delegated', function (e) {
                assert.strictEqual(e.originalEvent.delegateTarget.id, undefined, '\'' + pointerEvent + '\' not have subscription');
            });

            $element.children('#delegated').trigger(originalEvent);
        });
    });

    QUnit.test('event trigger order', function (assert) {
        const LOG = [];
        const log = function (e) {
            LOG.push(e.type);
        };

        const $element = $('#element');
        $element.on('testdown testup', log).on('dxpointerdown dxpointerup', log).on('testdown testup', log);

        $element.trigger('testdown').trigger('testup');

        assert.deepEqual(LOG, ['testdown', 'testdown', 'dxpointerdown', 'testup', 'testup', 'dxpointerup']);
    });

    QUnit.test('pointer events should unsubscribe on .off method', function (assert) {
        const $element = $('#element');
        const getEvents = function () {
            return $.map($._data($element.get(0), 'events') || [], function (i) {
                return i;
            });
        };

        assert.equal(getEvents().length, 0);

        $element.on('dxpointerdown dxpointermove dxpointerup', noop).off('dxpointerdown dxpointermove dxpointerup');

        assert.equal(getEvents().length, 0);
    });

    QUnit.test('one pointer event should not unsubscribe another events', function (assert) {
        assert.expect(1);

        const $element = $('#element');

        $element.on('dxpointerdown dxpointerup', function (e) {
            assert.equal(e.type, 'dxpointerup');
        }).off('dxpointerdown');

        $element.trigger('dxpointerdown');
        $element.trigger('dxpointerup');
    });

    QUnit.test('empty original event should not unsubscribe the whole namespace', function (assert) {
        assert.expect(1);

        const element = document.getElementById('element');
        const $element = $(element);

        const handlerSpy = sinon.spy();
        $element.on('any.dxPointerEvents', handlerSpy);

        const strategy = new BaseStrategy('other', '');
        strategy.noBubble = true;
        strategy.teardown($element);

        $element.trigger('any.dxPointerEvents');

        assert.ok(handlerSpy.calledOnce, 'handlers for \'.dxPointerEvents\' remain');
    });

    QUnit.test('event is triggered one time after refresh', function (assert) {
        assert.expect(1);

        const $element = $('#element');

        $element.on('dxpointerdown', function (e) {
            assert.ok(true);
        }).off('dxpointerdown').on('dxpointerdown', function (e) {
            assert.ok(true);
        });

        $element.trigger('dxpointerdown');
    });

    QUnit.test('pointer event base strategy should have \'setup\' implementation, because jQuery adds a browser event via addEventListener/attachEvent otherwise (T208653)', function (assert) {
        assert.ok($.isFunction(new BaseStrategy('', '').setup));
    });

    QUnit.test('pointer events should correctly unsubscribe events with target', function (assert) {
        const $element = $('#element');
        const getEvents = function () {
            return $.map($._data($element.get(0), 'events') || [], function (i) {
                return i;
            });
        };

        assert.equal(getEvents().length, 0);

        $element.on('dxpointerenter dxpointerleave', '#target1', noop).on('dxpointerenter dxpointerleave', '#target2', noop).off('dxpointerenter dxpointerleave', '#target1').off('dxpointerenter dxpointerleave', '#target2');

        assert.equal(getEvents().length, 0);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","events/pointer/base","events/core/event_registrator","../../../helpers/eventHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("events/pointer/base"), require("events/core/event_registrator"), require("../../../helpers/eventHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=baseTests.js.map