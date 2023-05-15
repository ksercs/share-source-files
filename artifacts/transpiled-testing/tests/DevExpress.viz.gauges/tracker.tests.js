!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.gauges/tracker.tests.js"], ["jquery","core/utils/common","../../helpers/vizMocks.js","viz/gauges/tracker","events/pointer"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.gauges/tracker.tests.js', ['jquery', 'core/utils/common', '../../helpers/vizMocks.js', 'viz/gauges/tracker', 'events/pointer'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const Tracker = $__require('viz/gauges/tracker');
    const pointerEvents = $__require('events/pointer');

    QUnit.module('Tracker', {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.root = new vizMocks.Element();
            this.tracker = new Tracker({ renderer: this.renderer, container: this.root });
        },
        afterEach: function () {
            this.tracker.dispose();
        }
    });

    QUnit.test('Group is created on construction', function (assert) {
        assert.deepEqual(this.renderer.g.firstCall.returnValue.attr.lastCall.args, [{ 'class': 'dxg-tracker', fill: '#000000', opacity: 0.0001, stroke: 'none', 'stroke-width': 0 }], 'root settings');
        assert.deepEqual(this.renderer.g.firstCall.returnValue.linkOn.lastCall.args, [this.root, { name: 'tracker', after: 'peripheral' }], 'root is linked to container');
    });

    QUnit.test('Group is destroyed on dispose', function (assert) {
        this.tracker.dispose();
        this.tracker.dispose = noop; // To prevent failure on `afterEach`
        assert.deepEqual(this.renderer.g.firstCall.returnValue.linkOff.lastCall.args, [], 'root is unlinked');
    });

    QUnit.test('Group is appended to root on activation', function (assert) {
        this.tracker.activate();
        assert.deepEqual(this.renderer.g.firstCall.returnValue.linkAppend.lastCall.args, [], 'root is appended');
    });

    QUnit.test('Group removed on deactivation', function (assert) {
        this.tracker.deactivate();
        assert.deepEqual(this.renderer.g.firstCall.returnValue.linkRemove.lastCall.args, [], 'root is removed');
        assert.deepEqual(this.renderer.g.firstCall.returnValue.clear.lastCall.args, [], 'root is cleared');
    });

    QUnit.test('Element is appended to group on attach', function (assert) {
        const element = this.renderer.path([], 'area');
        const target = {};
        const info = {};

        this.tracker.attach(element, target, info);

        assert.strictEqual(element.parent, this.tracker._element, 'element is appended');
        assert.deepEqual(element.data.lastCall.args, [{ 'gauge-data-target': target, 'gauge-data-info': info }]);
    });

    QUnit.test('Element is detached from group on detach', function (assert) {
        const element = this.renderer.path([], 'area');

        this.tracker.attach(element, {}, {}).detach(element);

        assert.ok(!element.parent, 'element is detached');
    });

    const tooltipEnvironment = {
        beforeEach: function () {
            Tracker._DEBUG_reset();
            this.renderer = new vizMocks.Renderer();
            this.renderer.draw(document.createElement('div'));
            this.root = this.renderer.g().append(this.renderer.root);
            this.tracker = new Tracker({ renderer: this.renderer, container: this.root });
            const test = this;
            this.tracker.setTooltipState(true).setCallbacks({
                'tooltip-show': function () {
                    return test.onTooltipShow ? test.onTooltipShow.apply(test, arguments) : true;
                },
                'tooltip-hide': function () {
                    test.onTooltipHide && test.onTooltipHide.apply(test, arguments);
                }
            });
            this.trigger = function (name, element, x, y) {
                const event = $.Event(name);
                event.target = $(element.element).get(0);
                event.pageX = x;
                event.pageY = y;
                $(this.tracker._element.element).trigger(event);
            };

            this.clock = sinon.useFakeTimers();
        },
        afterEach: function () {
            this.clock.restore();
            this.tracker.dispose();
        }
    };

    QUnit.module('Tracker - tooltip events', tooltipEnvironment);

    QUnit.test('"Show" is raised on mouseover after delay', function (assert) {
        const element = this.renderer.path([], 'area');
        const target = {};
        const info = {};
        this.tracker.attach(element, target, info);
        element.element['gauge-data-target'] = target; // emulate data attachment
        element.element['gauge-data-info'] = info; // emulate data attachment
        this.onTooltipShow = sinon.spy(function () {
            return true;
        });

        this.trigger(pointerEvents.move, element);

        assert.strictEqual(this.onTooltipShow.callCount, 1);
        assert.strictEqual(this.onTooltipShow.firstCall.args[0], target, 'target');
        assert.strictEqual(this.onTooltipShow.firstCall.args[1], info, 'info');
    });

    QUnit.test('"Show" is not raised until mousemove occurs', function (assert) {
        const element = this.renderer.path([], 'area');
        const target = {};
        const info = {};
        this.tracker.attach(element, target, info);
        element.element['gauge-data-target'] = target; // emulate data attachment
        element.element['gauge-data-info'] = info; // emulate data attachment
        this.onTooltipShow = sinon.spy(function () {
            return true;
        });
        this.trigger(pointerEvents.move, element, 5, 5);

        this.trigger(pointerEvents.move, element, 10, 5);
        this.trigger(pointerEvents.move, element, 10, 20);
        this.trigger(pointerEvents.move, element, 30, 10);
        this.trigger(pointerEvents.move, element, 40, 5);

        assert.strictEqual(this.onTooltipShow.callCount, 1);
    });

    QUnit.test('"Show" is raised when small mousemove occurs', function (assert) {
        const element = this.renderer.path([], 'area');
        const target = {};
        const info = {};
        this.tracker.attach(element, target, info);
        element.element['gauge-data-target'] = target; // emulate data attachment
        element.element['gauge-data-info'] = info; // emulate data attachment
        this.onTooltipShow = sinon.spy(function () {
            return true;
        });
        this.trigger(pointerEvents.move, element, 5, 5);

        this.trigger(pointerEvents.move, element, 8, 5);
        this.trigger(pointerEvents.move, element, 8, 1);
        this.trigger(pointerEvents.move, element, 4, 3);
        this.trigger(pointerEvents.move, element, 7, 5);

        assert.strictEqual(this.onTooltipShow.callCount, 1);
    });

    QUnit.test('"Hide" is raised on mousewheel without delay', function (assert) {
        const that = this;
        const element = this.renderer.path([], 'area');
        this.tracker.attach(element);
        this.onTooltipHide = sinon.spy(function () {
            return true;
        });
        this.trigger(pointerEvents.move, element);

        that.trigger('dxmousewheel', element);

        assert.strictEqual(this.tracker._DEBUG_hideTooltipTimeoutSet, 0, 'timeout is not set');
        assert.strictEqual(this.onTooltipHide.callCount, 1);
    });

    QUnit.test('"Hide" is raised on mouseout after delay', function (assert) {
        const that = this;
        const element = this.renderer.path([], 'area');
        this.tracker.attach(element);
        this.onTooltipShow = sinon.spy(function () {
            that.trigger(pointerEvents.out, element);
            return true;
        });
        this.onTooltipHide = sinon.spy(function () {
            return true;
        });
        this.trigger(pointerEvents.move, element);
        this.clock.tick(this.tracker.TOOLTIP_HIDE_DELAY);

        assert.strictEqual(this.tracker._DEBUG_hideTooltipTimeoutSet, 1, 'timeout is set');
        assert.strictEqual(this.onTooltipShow.callCount, 1);
        assert.strictEqual(this.onTooltipHide.callCount, 1);
    });

    QUnit.test('"Hide" is not raised if tooltip is not shown', function (assert) {
        const element = this.renderer.path([], 'area');
        this.tracker.attach(element);
        this.onTooltipHide = sinon.spy(function () {
            return true;
        });

        this.trigger(pointerEvents.out, element);
        this.clock.tick(this.tracker.TOOLTIP_HIDE_DELAY);

        assert.strictEqual(this.tracker._DEBUG_hideTooltipTimeoutSet, 1, 'timeout is set');
        assert.strictEqual(this.onTooltipHide.callCount, 0);
    });

    QUnit.test('"Hide" is not raised if mouseover occurs after mouseout', function (assert) {
        const element = this.renderer.path([], 'area');
        this.tracker.attach(element);

        this.onTooltipHide = sinon.spy(function () {
            return true;
        });

        this.trigger(pointerEvents.move, element);
        this.trigger(pointerEvents.out, element);
        this.trigger(pointerEvents.move, element);

        this.clock.tick(this.tracker.TOOLTIP_HIDE_DELAY);

        assert.strictEqual(this.tracker._DEBUG_hideTooltipTimeoutSet, 1, 'timeout is set');
        assert.strictEqual(this.tracker._DEBUG_hideTooltipTimeoutCleared, 1, 'timeout is cleared');

        assert.strictEqual(this.onTooltipHide.callCount, 0);
    });

    QUnit.test('"Show" is raised after delay on mouseover on other element if tooltip is shown', function (assert) {
        assert.expect(2);
        const element1 = this.renderer.path([], 'area');
        const target1 = {};
        const element2 = this.renderer.path([], 'area');
        const target2 = {};
        this.tracker.attach(element1, target1).attach(element2, target2);
        element1.element['gauge-data-target'] = target1; // emulate data attachment
        element2.element['gauge-data-target'] = target2; // emulate data attachment
        this.onTooltipShow = function (tar) {
            assert.strictEqual(tar, target1, 'target 1');

            this.onTooltipShow = function (tar) {
                assert.strictEqual(tar, target2, 'target 2');
                return true;
            };
            return true;
        };

        this.trigger(pointerEvents.move, element1);
        this.trigger(pointerEvents.move, element2);
    });

    QUnit.test('"Hide" is raised after delay on mouseover then mouseout on other element if tooltip is shown', function (assert) {
        assert.expect(1);
        const element1 = this.renderer.path([], 'area');
        const element2 = this.renderer.path([], 'area');
        this.tracker.attach(element1).attach(element2);
        this.onTooltipHide = function () {
            assert.strictEqual(this.tracker._DEBUG_hideTooltipTimeoutSet, 1, 'timeout is set');
        };
        this.trigger(pointerEvents.move, element1);
        this.trigger(pointerEvents.move, element2);
        this.trigger(pointerEvents.out, element2);
        this.clock.tick(this.tracker.TOOLTIP_HIDE_DELAY);
    });

    QUnit.test('"Show" is not raised on mouseout then mouseover if tooltip is shown', function (assert) {
        assert.expect(3);
        const element = this.renderer.path([], 'area');
        this.tracker.attach(element);
        this.onTooltipShow = function () {
            this.onTooltipShow = function () {
                assert.ok(false, 'This is not expected to happen!');
                return true;
            };

            return true;
        };
        this.trigger(pointerEvents.move, element);
        this.trigger(pointerEvents.out, element);
        this.trigger(pointerEvents.move, element);
        assert.strictEqual(this.tracker._DEBUG_hideTooltipTimeoutCleared, 1, 'show timeout is cleared');
        assert.strictEqual(this.tracker._DEBUG_hideTooltipTimeoutSet, 1, 'hide timeout is set');
        assert.strictEqual(this.tracker._DEBUG_hideTooltipTimeoutCleared, 1, 'hide timeout is cleared');
    });

    const tooltipTouchEnvironment = {
        beforeEach: function () {
            tooltipEnvironment.beforeEach.apply(this, arguments);
            this.triggerDocument = function (name, element) {
                const event = $.Event(name);
                event.target = element ? $(element.element).get(0) : null;
                event.changedTouches = [{}]; //  Because of ui.events.js
                event.touches = [];
                $(window.document).trigger(event);
            };
            const _trigger = this.trigger;
            this.trigger = function () {
                _trigger.apply(this, arguments);
                this.triggerDocument.apply(this, arguments); //  Bubbling emulation
            };
        },
        afterEach: tooltipEnvironment.afterEach
    };

    QUnit.module('Tracker - tooltip touch events', tooltipTouchEnvironment);

    QUnit.test('"Show" is raised on touchstart', function (assert) {
        assert.expect(2);
        const element = this.renderer.path([], 'area');
        const target = {};
        const info = {};
        this.tracker.attach(element, target, info);
        element.element['gauge-data-target'] = target; // emulate data attachment
        element.element['gauge-data-info'] = info; // emulate data attachment
        this.onTooltipShow = function (tar, inf) {
            assert.strictEqual(tar, target, 'target');
            assert.strictEqual(inf, info, 'info');
            return true;
        };

        this.trigger(pointerEvents.down, element);
    });

    QUnit.test('"Hide" is raised on touchstart outside the element', function (assert) {
        assert.expect(1);
        const element = this.renderer.path([], 'area');
        this.tracker.attach(element);
        this.onTooltipShow = function () {
            this.trigger(pointerEvents.up, element);
            this.triggerDocument(pointerEvents.down);
            return true;
        };
        this.onTooltipHide = function () {
            assert.strictEqual(this.tracker._DEBUG_hideTooltipTimeoutSet, 1, 'timeout is set');
        };
        this.trigger(pointerEvents.down, element);
        this.clock.tick(this.tracker.TOOLTIP_HIDE_DELAY);
    });

    QUnit.test('"Hide" is raised after delay on touchstart then touchend on other element if tooltip is shown', function (assert) {
        assert.expect(1);
        const element1 = this.renderer.path([], 'area');
        const element2 = this.renderer.path([], 'area');
        this.tracker.attach(element1, element2);
        element1.element['gauge-data-target'] = element2; // emulate data attachment
        this.onTooltipShow = function () {
            this.onTooltipShow = function () {
                this.trigger(pointerEvents.up, element1);
                return true;
            };
            this.trigger(pointerEvents.up, element1);
            this.trigger(pointerEvents.down, element2);
            return true;
        };
        this.onTooltipHide = function () {
            assert.strictEqual(this.tracker._DEBUG_hideTooltipTimeoutSet, 1, 'timeout is set');
        };
        this.trigger(pointerEvents.down, element1);
        this.clock.tick(this.tracker.TOOLTIP_HIDE_DELAY);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","../../helpers/vizMocks.js","viz/gauges/tracker","events/pointer"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("../../helpers/vizMocks.js"), require("viz/gauges/tracker"), require("events/pointer"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tracker.tests.js.map