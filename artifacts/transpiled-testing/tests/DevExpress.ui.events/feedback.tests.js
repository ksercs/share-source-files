!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.events/feedback.tests.js"], ["jquery","core/utils/common","core/devices","events/core/emitter.feedback","../../helpers/pointerMock.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.ui.events/feedback.tests.js', ['jquery', 'core/utils/common', 'core/devices', 'events/core/emitter.feedback', '../../helpers/pointerMock.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const devices = $__require('core/devices');
    const feedbackEvents = $__require('events/core/emitter.feedback');
    const pointerMock = $__require('../../helpers/pointerMock.js');

    QUnit.testStart(function () {
        const markup = '<div id="container">\
            <div id="element" class="item">\
                <div id="elementContent"></div>\
            </div>\
            <div id="neighbor" class="item"></div>\
            <div id="anotherNeighbor" class="item"></div>\
        </div>';

        $('#qunit-fixture').html(markup);
    });

    QUnit.module('feedback touch', {
        beforeEach: function () {
            this.clock = sinon.useFakeTimers();
        },

        afterEach: function () {
            this.clock.restore();
        }
    });

    QUnit.test('dxactive should be fired after pointerdown with timeout', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let activeFired = 0;

        $element.on(feedbackEvents.active, { timeout: 10 }, function () {
            activeFired++;
        });

        pointer.start('touch').down();
        assert.equal(activeFired, 0, 'active does\'n fired immediately after pointerdown');
        this.clock.tick(10);
        assert.equal(activeFired, 1, 'active fired after timeout');
    });

    QUnit.test('dxinactive should be fired after pointerup with timeout', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let inactiveFired = 0;

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            inactiveFired++;
        });

        pointer.start('touch').down().up();
        assert.equal(inactiveFired, 0, 'inactive does\'n fired immediately after pointerup');
        this.clock.tick(100);
        assert.equal(inactiveFired, 1, 'inactive fired after timeout');
    });

    QUnit.test('dxactive should be fired after pointerup if active timeout is not finished', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let activeFired = 0;

        $element.on(feedbackEvents.active, { timeout: 10 }, function () {
            activeFired++;
        });

        pointer.start('touch').down().up();
        assert.equal(activeFired, 1, 'active fired immediately after pointerup');
        this.clock.tick(10);
        assert.equal(activeFired, 1, 'active does not fired after timeout');
    });

    QUnit.test('dxactive should not be fired after pointerup if active timeout is finished', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let activeFired = 0;

        $element.on(feedbackEvents.active, { timeout: 10 }, function () {
            activeFired++;
        });

        pointer.start('touch').down();
        this.clock.tick(10);
        pointer.up();
        assert.equal(activeFired, 1, 'active does not fired after timeout');
    });

    QUnit.test('dxactive should not bubble', function (assert) {
        const $element = $('#element');
        const $container = $('#container');
        const pointer = pointerMock($element);

        $container.on(feedbackEvents.active, { timeout: 10 }, function () {
            assert.ok(false, 'active fired on parent');
        });

        $element.on(feedbackEvents.active, { timeout: 10 }, function () {
            assert.ok(true, 'active fired on child');
        });

        pointer.start('touch').down();
        this.clock.tick(10);
    });

    QUnit.test('dxinactive should be fired immediately after several pointerdown', function (assert) {
        assert.expect(1);

        const $element = $('#element');
        const pointer = pointerMock($element);

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            assert.ok(true, 'inactive fired immediately');
        });

        pointer.start('touch').down().up().down();
        this.clock.tick(100);
    });

    QUnit.test('dxinactive should be fired immediately after pointerdown on another element', function (assert) {
        assert.expect(1);

        const $element = $('#element');
        const $neighbor = $('#neighbor');

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            assert.ok(true, 'inactive fired immediately');
        });
        $neighbor.on(feedbackEvents.active, noop);

        pointerMock($element).start('touch').down().up();
        pointerMock($neighbor).start('touch').down();
    });

    QUnit.test('dxactive should be fired on parent element if child was active before', function (assert) {
        assert.expect(1);

        const $element = $('#element');
        const $elementContent = $('#elementContent');

        $element.on(feedbackEvents.active, { timeout: 100 }, function () {
            assert.ok(true, 'active fired');
        });
        $elementContent.on(feedbackEvents.active, { timeout: 100 }, noop);

        pointerMock($elementContent).start('touch').down().up();
        pointerMock($element).start('touch').down();
        this.clock.tick(100);
    });

    QUnit.test('dxinactive should not be fired on parent element if child is activated', function (assert) {
        const $element = $('#element');
        const $elementContent = $('#elementContent');
        let inactiveFiredCount = 0;

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            inactiveFiredCount++;
        });
        $elementContent.on(feedbackEvents.inactive, { timeout: 100 }, noop);

        pointerMock($element).start('touch').down().up();
        pointerMock($elementContent).start('touch').down().up();
        this.clock.tick(100);
        assert.equal(inactiveFiredCount, 1, 'inactive on parent fired once');
    });

    QUnit.test('dxinactive should be fired after other dxinactive unsubscribed', function (assert) {
        assert.expect(1);

        const $element = $('#element');
        const $neighbor = $('#neighbor');
        const $anotherNeighbor = $('#anotherNeighbor');

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            assert.ok(true, 'inactive fired');
        });
        $neighbor.on(feedbackEvents.inactive, { timeout: 100 }, noop);
        $anotherNeighbor.on(feedbackEvents.inactive, { timeout: 100 }, noop);

        pointerMock($element).start('touch').down().up();
        $anotherNeighbor.off(feedbackEvents.inactive);
        pointerMock($neighbor).start('touch').down().up();
    });

    QUnit.test('dxinactive should not be fired immediately after other dxinactive unsubscribed', function (assert) {
        assert.expect(0);

        const $element = $('#element');
        const $anotherNeighbor = $('#anotherNeighbor');

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            assert.ok(false, 'inactive not fired');
        });
        $anotherNeighbor.on(feedbackEvents.inactive, { timeout: 100 }, noop);

        pointerMock($element).start('touch').down().up();
        $anotherNeighbor.off(feedbackEvents.inactive);
    });

    QUnit.module('feedback mouse', {
        beforeEach: function () {
            this.clock = sinon.useFakeTimers();
        },

        afterEach: function () {
            this.clock.restore();
        }
    });

    QUnit.test('dxactive should be fired after mousedown without timeout', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let activeFired = 0;

        $element.on(feedbackEvents.active, { timeout: 10 }, function () {
            activeFired++;
        });

        pointer.start('mouse').down();
        this.clock.tick(0);
        assert.equal(activeFired, 1, 'active fired immediately');
    });

    QUnit.test('dxinactive should be fired after mouseup without timeout', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let inactiveFired = 0;

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            inactiveFired++;
        });

        pointer.start('mouse').down().up();
        this.clock.tick(0);
        assert.equal(inactiveFired, 1, 'inactive fired immediately');
    });

    QUnit.test('dxactive should be fired on parent element if child was active before', function (assert) {
        assert.expect(1);

        const $element = $('#element');
        const $elementContent = $('#elementContent');

        $element.on(feedbackEvents.active, { timeout: 100 }, function () {
            assert.ok(true, 'active fired');
        });
        $elementContent.on(feedbackEvents.active, { timeout: 100 }, noop);

        pointerMock($elementContent).start('mouse').down().up();
        pointerMock($element).start('mouse').down();
        this.clock.tick(0);
    });

    QUnit.module('feedback simulator', {
        beforeEach: function () {
            this.clock = sinon.useFakeTimers();
            this.isSimulator = sinon.stub(devices, 'isSimulator', function () {
                return true;
            });
        },

        afterEach: function () {
            this.clock.restore();
            this.isSimulator.restore();
        }
    });

    QUnit.test('dxactive should be fired after mousedown with timeout', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let activeFired = 0;

        $element.on(feedbackEvents.active, { timeout: 10 }, function () {
            activeFired++;
        });

        pointer.start('mouse').down();
        assert.equal(activeFired, 0, 'active does\'n fired immediately after pointerdown');
        this.clock.tick(10);
        assert.equal(activeFired, 1, 'active fired after timeout');
    });

    QUnit.test('dxinactive should be fired after mouseup with timeout', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let inactiveFired = 0;

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            inactiveFired++;
        });

        pointer.start('mouse').down().up();
        assert.equal(inactiveFired, 0, 'inactive does\'n fired immediately after pointerup');
        this.clock.tick(100);
        assert.equal(inactiveFired, 1, 'inactive fired after timeout');
    });

    QUnit.module('delegated feedback touch', {
        beforeEach: function () {
            this.clock = sinon.useFakeTimers();
        },

        afterEach: function () {
            this.clock.restore();
        }
    });

    QUnit.test('dxactive should have correct currentTarget', function (assert) {
        assert.expect(1);

        const $container = $('#container');
        const $items = $container.find('.item');
        const $item = $items.eq(0);

        $container.on('dxactive', '.item', { timeout: 0 }, function (e) {
            assert.equal(e.currentTarget, $item.get(0), 'current target correct');
        });

        pointerMock($item).start('touch').down();
        this.clock.tick(0);
    });

    QUnit.test('dxinactive should have correct currentTarget', function (assert) {
        assert.expect(1);

        const $container = $('#container');
        const $items = $container.find('.item');
        const $item = $items.eq(0);

        $container.on('dxinactive', '.item', { timeout: 0 }, function (e) {
            assert.equal(e.currentTarget, $item.get(0), 'current target correct');
        });

        pointerMock($item).start('touch').down().up();
        this.clock.tick(0);
    });

    QUnit.test('dxactive should have correct currentTarget if timeout is not finished', function (assert) {
        assert.expect(1);

        const $container = $('#container');
        const $items = $container.find('.item');
        const $item = $items.eq(0);

        $container.on('dxactive', '.item', { timeout: 100 }, function (e) {
            assert.equal(e.currentTarget, $item.get(0), 'current target correct');
        });

        pointerMock($item).start('touch').down().up();
    });

    QUnit.test('dxinactive should have correct currentTarget if timeout is not finished', function (assert) {
        assert.expect(1);

        const $container = $('#container');
        const $items = $container.find('.item');
        const $item = $items.eq(0);

        $container.on(feedbackEvents.inactive, '.item', { timeout: 100 }, function (e) {
            assert.equal(e.currentTarget, $item.get(0), 'current target correct');
        });

        pointerMock($item).start('touch').down().up().down();
    });

    QUnit.test('dxinactive should have correct currentTarget if timeout is not finished and target is changed', function (assert) {
        assert.expect(1);

        const $container = $('#container');
        const $items = $container.find('.item');

        $container.on(feedbackEvents.inactive, '.item', { timeout: 100 }, function (e) {
            assert.equal(e.currentTarget, $items.eq(0).get(0), 'current target correct');
        });

        pointerMock($items.eq(0)).start('touch').down().up();
        pointerMock($items.eq(1)).start('touch').down();
    });

    QUnit.test('dxactive should be fired after remove DOM node', function (assert) {
        const $elementContent = $('#elementContent');
        const $container = $('#container');

        $container.on(feedbackEvents.active, '.item', { timeout: 10 }, function () {
            assert.ok(true, 'active fired');
        });

        pointerMock($elementContent).start('touch').down();
        $elementContent.detach();
        this.clock.tick(10);
    });

    QUnit.test('dxinactive should be fired after remove DOM node', function (assert) {
        const $elementContent = $('#elementContent');
        const $container = $('#container');

        $container.on(feedbackEvents.inactive, '.item', { timeout: 10 }, function () {
            assert.ok(true, 'inactive fired');
        });

        pointerMock($elementContent).start('touch').down().up();
        $elementContent.detach();
        this.clock.tick(10);
    });

    QUnit.module('feedback lock', {
        beforeEach: function () {
            this.clock = sinon.useFakeTimers();
        },

        afterEach: function () {
            this.clock.restore();
        }
    });

    QUnit.test('lockfeedback should not fail if active emitter not present', function (assert) {
        assert.expect(0);
        feedbackEvents.lock($.Deferred().promise());
    });

    QUnit.test('dxinactive should not be fired after timeout if event is locked', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let inactiveFired = 0;

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            inactiveFired++;
        });

        pointer.start('touch').down().up();
        this.clock.tick(99);
        feedbackEvents.lock($.Deferred());
        this.clock.tick(1);
        assert.equal(inactiveFired, 0, 'inactive not fired after timeout');
    });

    QUnit.test('dxinactive should be fired after lock released if event is locked', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let inactiveFired = 0;

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            inactiveFired++;
        });

        pointer.start('touch').down().up();
        this.clock.tick(99);
        feedbackEvents.lock($.Deferred().resolve());
        this.clock.tick(1);
        assert.equal(inactiveFired, 1, 'inactive fired after lock release');
    });

    QUnit.test('dxinactive should not be fired after timeout if event is locked during gesture', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let inactiveFired = 0;

        $element.on(feedbackEvents.active, { timeout: 0 }, noop);
        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            inactiveFired++;
        });

        pointer.start('touch').down();
        this.clock.tick(1);
        feedbackEvents.lock($.Deferred());
        pointer.up();
        this.clock.tick(100);
        assert.equal(inactiveFired, 0, 'inactive not fired after timeout');
    });

    QUnit.test('dxactive should be fired after lock immediately', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);

        $element.on(feedbackEvents.active, { timeout: 100 }, function () {
            assert.ok(true);
        });

        pointer.start('touch').down();
        feedbackEvents.lock($.Deferred());
    });

    QUnit.test('dxinactive should be fired after lock released if event is locked during gesture', function (assert) {
        const $element = $('#element');
        const pointer = pointerMock($element);
        let inactiveFired = 0;

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            inactiveFired++;
        });

        pointer.start('touch').down();
        this.clock.tick(1);
        feedbackEvents.lock($.Deferred().resolve());
        pointer.up();
        this.clock.tick(100);
        assert.equal(inactiveFired, 1, 'inactive fired after lock release');
    });

    QUnit.test('locked dxinactive should not be fired after new active emitter activate', function (assert) {
        const $element = $('#element');
        const $neighbor = $('#neighbor');
        let inactiveFired = 0;

        $element.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            inactiveFired++;
        });
        $neighbor.on(feedbackEvents.inactive, { timeout: 100 }, noop);

        pointerMock($element).start('touch').down().up();
        feedbackEvents.lock($.Deferred());
        pointerMock($neighbor).start('touch').down().up();
        assert.equal(inactiveFired, 0, 'inactive not fired');
    });

    QUnit.test('dxinactive should be fired after each lock release', function (assert) {
        const $container = $('#container');
        const $items = $container.find('.item');
        const targets = [];

        $container.on(feedbackEvents.inactive, '.item', { timeout: 100 }, function (e) {
            targets.push(e.target);
        });

        const deferred = $.Deferred();
        pointerMock($items.eq(0)).start('touch').down().up();
        feedbackEvents.lock(deferred);

        pointerMock($items.eq(1)).start('touch').down().up();
        feedbackEvents.lock(deferred);

        deferred.resolve();
        assert.deepEqual(targets, [$items[0], $items[1]], 'inactive not fired');
    });

    QUnit.test('dxinactive should be fired on child element if parent with feedback present', function (assert) {
        const $element = $('#element');
        const $elementContent = $('#elementContent');
        let inactiveFired = 0;
        const deferred = $.Deferred();

        $element.on(feedbackEvents.inactive, { timeout: 100 }, noop);
        $elementContent.on(feedbackEvents.inactive, { timeout: 100 }, function () {
            inactiveFired++;
        });

        pointerMock($elementContent).start('touch').down().up();
        feedbackEvents.lock(deferred);
        this.clock.tick(100);
        assert.equal(inactiveFired, 0, 'inactive not fired');
        deferred.resolve();
        assert.equal(inactiveFired, 1, 'inactive not fired');
    });

    QUnit.test('dxinactive should be fired after unlock neighbor element', function (assert) {
        assert.expect(1);

        const $container = $('#container');
        const $items = $container.find('.item');
        let inactiveFired = 0;
        const deferred = $.Deferred();

        $container.on(feedbackEvents.inactive, '.item', { timeout: 100 }, function (e) {
            inactiveFired++;
        });

        pointerMock($items.eq(0)).start('touch').down().up();
        feedbackEvents.lock(deferred);

        pointerMock($items.eq(1)).start('touch').down().up();

        pointerMock($items.eq(2)).start('touch').down().up();
        deferred.resolve();
        this.clock.tick(100);

        assert.equal(inactiveFired, 3, 'inactive fired');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","core/devices","events/core/emitter.feedback","../../helpers/pointerMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("core/devices"), require("events/core/emitter.feedback"), require("../../helpers/pointerMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=feedback.tests.js.map