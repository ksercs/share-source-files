!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.events/hover.tests.js"], ["jquery","core/devices","events/hover"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.ui.events/hover.tests.js', ['jquery', 'core/devices', 'events/hover'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const devices = $__require('core/devices');
    const hoverEvents = $__require('events/hover');

    QUnit.testStart(function () {
        const markup = '<div id="container" class="container">\
            <div id="element" class="element"></div>\
            <div id="second-element"></div>\
        </div>\
        <div class="container">\
            <div class="element"></div>\
        </div>';

        $('#qunit-fixture').html(markup);
    });

    const POINTER_ENTER = 'dxpointerenter';
    const POINTER_LEAVE = 'dxpointerleave';

    QUnit.module('hover', {
        beforeEach: function () {
            this.$element = $('#element');
        }
    });

    QUnit.test('hover start', function (assert) {
        let hoverStartFired = 0;
        const $element = this.$element;

        $element.on(hoverEvents.start, function () {
            hoverStartFired++;
        });

        $element.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [] }));

        assert.equal(hoverStartFired, 1);
    });

    QUnit.test('hover end', function (assert) {
        let hoverEndFired = 0;
        const $element = this.$element;

        $element.on(hoverEvents.end, function () {
            hoverEndFired++;
        });

        $element.trigger($.Event(POINTER_LEAVE, { which: 1, pointers: [] }));

        assert.equal(hoverEndFired, 1);
    });

    QUnit.test('hover start/end', function (assert) {
        let hoverStartFired = 0;
        let hoverEndFired = 0;
        const $element = this.$element;

        $element.on(hoverEvents.start, function () {
            hoverStartFired++;
        }).on(hoverEvents.end, function () {
            hoverEndFired++;
        });

        $element.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [] }));
        assert.equal(hoverStartFired, 1);
        assert.equal(hoverEndFired, 0);

        $element.trigger($.Event(POINTER_LEAVE, { which: 1, pointers: [] }));
        assert.equal(hoverStartFired, 1);
        assert.equal(hoverEndFired, 1);
    });

    QUnit.test('hover event with two delegated subscriptions on the same element (T430275)', function (assert) {
        let firstSubscription = 0;
        let secondSubscription = 0;
        const $element = this.$element;
        const $secondElement = $('#second-element');
        const $container = $('#container');

        $container.on(hoverEvents.start, '#element', function () {
            firstSubscription++;
        }).on(hoverEvents.start, '#second-element', function () {
            secondSubscription++;
        });

        $container.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [], target: $element[0] }));
        $container.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [], target: $secondElement[0] }));

        assert.equal(firstSubscription, 1);
        assert.equal(secondSubscription, 1);
    });

    QUnit.test('hover event with two delegated subscriptions on the same element fire after remove one of them', function (assert) {
        let subscription = 0;
        let removedSubscription = 0;
        const $element = this.$element;
        const $secondElement = $('#second-element');
        const $container = $('#container');
        const subscriptionToRemove = function () {
            removedSubscription++;
        };

        $container.on(hoverEvents.start, '#element', subscriptionToRemove).on(hoverEvents.start, '#second-element', function () {
            subscription++;
        }).off(hoverEvents.start, '#element', subscriptionToRemove);

        $container.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [], target: $element[0] }));
        $container.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [], target: $secondElement[0] }));

        assert.equal(removedSubscription, 0);
        assert.equal(subscription, 1);
    });

    QUnit.test('hover event fires twice after updating delegated subscription', function (assert) {
        let hoverEventFired = 0;
        const $element = this.$element;
        const $container = $('#container');
        const subscriptionToRemove = function () {
            hoverEventFired++;
        };

        $container.on(hoverEvents.start, '#element', subscriptionToRemove).off(hoverEvents.start, '#element', subscriptionToRemove).on(hoverEvents.start, '#element', subscriptionToRemove);

        $container.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [], target: $element[0] }));

        assert.equal(hoverEventFired, 1);
    });

    QUnit.test('hover start/end teardown', function (assert) {
        let hoverStartFired = 0;
        let hoverEndFired = 0;
        const $element = this.$element;

        $element.on(hoverEvents.start, function () {
            hoverStartFired++;
        }).on(hoverEvents.end, function () {
            hoverEndFired++;
        }).off(hoverEvents.start).off(hoverEvents.end);

        $element.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [] }));
        $element.trigger($.Event(POINTER_LEAVE, { which: 1, pointers: [] }));
        assert.equal(hoverStartFired, 0);
        assert.equal(hoverEndFired, 0);
    });

    QUnit.test('hover start/end refresh', function (assert) {
        let hoverStartFired = 0;
        let hoverEndFired = 0;
        const $element = this.$element;

        $element.on(hoverEvents.start, function () {
            hoverStartFired++;
        }).on(hoverEvents.end, function () {
            hoverEndFired++;
        }).off(hoverEvents.start).off(hoverEvents.end).on(hoverEvents.start, function () {
            hoverStartFired++;
        }).on(hoverEvents.end, function () {
            hoverEndFired++;
        });

        $element.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [] }));
        $element.trigger($.Event(POINTER_LEAVE, { which: 1, pointers: [] }));
        assert.equal(hoverStartFired, 1);
        assert.equal(hoverEndFired, 1);
    });

    QUnit.test('hover end fired after teardown start', function (assert) {
        let hoverStartFired = 0;
        let hoverEndFired = 0;
        const $element = this.$element;

        $element.on(hoverEvents.start, function () {
            hoverStartFired++;
        }).on(hoverEvents.end, function () {
            hoverEndFired++;
        }).off(hoverEvents.start);

        $element.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [] }));
        $element.trigger($.Event(POINTER_LEAVE, { which: 1, pointers: [] }));
        assert.equal(hoverStartFired, 0);
        assert.equal(hoverEndFired, 1);
    });

    QUnit.test('hover events does not fire unexpectedly after update multiple subscriptions on multiple elements (T450286)', function (assert) {
        let hoverFired = 0;
        const $container = $('.container');
        const selector = '.element';
        const subscription = hoverEvents.start + ' ' + hoverEvents.end;

        $container.on(subscription, selector, function () {
            hoverFired++;
        }).off(subscription).on(subscription, selector, function () {
            hoverFired++;
        });

        const $firstContainer = $container.eq(0);
        const $secondContainer = $container.eq(1);
        const firstElement = $firstContainer.find(selector)[0];
        const secondElement = $secondContainer.find(selector)[0];

        $firstContainer.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [], target: firstElement }));
        $firstContainer.trigger($.Event(POINTER_LEAVE, { which: 1, pointers: [], target: firstElement }));
        $secondContainer.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [], target: secondElement }));
        $secondContainer.trigger($.Event(POINTER_LEAVE, { which: 1, pointers: [], target: secondElement }));

        assert.equal(hoverFired, 4);
    });

    QUnit.test('add and remove several hover delegated subscriptions from one element work correct', function (assert) {
        let hoverFired = 0;
        const handlerToRemove1 = function () {
            hoverFired++;
        };
        const handlerToRemove2 = function () {
            hoverFired++;
        };
        const handlerToProcess = function () {
            hoverFired++;
        };
        const $container = $('#container');
        const selector = '#element';

        $container.on(hoverEvents.start, selector, handlerToRemove1).on(hoverEvents.start, selector, handlerToRemove2).on(hoverEvents.start, selector, handlerToProcess).off(hoverEvents.start, selector, handlerToRemove1).off(hoverEvents.start, selector, handlerToRemove2);

        $container.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [], target: $(selector)[0] }));

        assert.equal(hoverFired, 1);
    });

    QUnit.test('prevent hover on touch device', function (assert) {
        let hoverStartFired = 0;
        let hoverEndFired = 0;
        const $element = this.$element;

        $element.on(hoverEvents.start, function () {
            hoverStartFired++;
        }).on(hoverEvents.end, function () {
            hoverEndFired++;
        });

        $element.trigger($.Event(POINTER_ENTER, { which: 1, pointerType: 'touch', pointers: [] }));
        assert.equal(hoverStartFired, 0);
        assert.equal(hoverEndFired, 0);

        $element.trigger($.Event(POINTER_LEAVE, { which: 1, pointerType: 'touch', pointers: [] }));
        assert.equal(hoverStartFired, 0);
        assert.equal(hoverEndFired, 0);
    });

    QUnit.test('hover should be prevented in simulator', function (assert) {
        sinon.stub(devices, 'isSimulator', function () {
            return true;
        });

        try {
            let hoverStartFired = 0;
            let hoverEndFired = 0;
            const $element = this.$element;

            $element.on(hoverEvents.start, function () {
                hoverStartFired++;
            }).on(hoverEvents.end, function () {
                hoverEndFired++;
            });

            $element.trigger($.Event(POINTER_ENTER, { which: 1, pointers: [] }));
            assert.equal(hoverStartFired, 0);
            assert.equal(hoverEndFired, 0);

            $element.trigger($.Event(POINTER_LEAVE, { which: 1, pointers: [] }));
            assert.equal(hoverStartFired, 0);
            assert.equal(hoverEndFired, 0);
        } finally {
            devices.isSimulator.restore();
        }
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","events/hover"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("events/hover"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=hover.tests.js.map