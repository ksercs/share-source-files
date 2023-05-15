!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.gauges/baseIndicator.tests.js"], ["core/utils/common","../../helpers/vizMocks.js","viz/gauges/base_indicators","viz/core/renderers/animation","viz/translators/translator1d"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.gauges/baseIndicator.tests.js', ['core/utils/common', '../../helpers/vizMocks.js', 'viz/gauges/base_indicators', 'viz/core/renderers/animation', 'viz/translators/translator1d'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const noop = $__require('core/utils/common').noop;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const BaseIndicator = $__require('viz/gauges/base_indicators').BaseIndicator;
    const animation = $__require('viz/core/renderers/animation');
    const translator1DModule = $__require('viz/translators/translator1d');

    const BaseIndicatorTester = BaseIndicator.inherit({
        _isEnabled: function () {
            return 'enabled' in this ? !!this.enabled : true;
        },

        _isVisible: function () {
            return 'visible' in this ? !!this.visible : true;
        },

        _render: function () {
            this._element = this._element || this._renderer.g().append(this._rootElement);
        },

        _clear: function () {
            delete this._element;
        },

        _move: function () {
            this._element.attr({ value: this._actualValue, position: this._actualPosition });
        },

        _getTrackerPoints: function () {
            return { tag: 'tracker-points' };
        }
    });

    const environment = {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.patchRenderer();
            this.owner = new vizMocks.Element().attr({ 'class': 'test-root' }).append(this.renderer.root);
            this.tracker = {
                attach: function (element) {
                    this.attached = element;
                },
                detach: function (element) {
                    this.detached = element;
                }
            };
            this.target = new BaseIndicatorTester({
                renderer: this.renderer,
                translator: new translator1DModule.Translator1D(0, 100, 200, 300),
                owner: this.owner,
                tracker: this.tracker,
                className: 'root-class'
            });
        },
        afterEach: function () {
            this.target.dispose();
            this.renderer.dispose();
        },
        patchRenderer: noop
    };

    QUnit.module('BaseIndicator - rendering', environment);

    QUnit.test('Init', function (assert) {
        assert.deepEqual(this.renderer.g.firstCall.returnValue.attr.lastCall.args, [{ 'class': 'root-class' }], 'root settings');
        assert.deepEqual(this.renderer.g.firstCall.returnValue.linkOn.lastCall.args, [this.owner, { name: 'value-indicator', after: 'core' }], 'root is linked to container');
        assert.deepEqual(this.renderer.path.firstCall.args, [[], 'area'], 'tracker');
    });

    QUnit.test('Dispose', function (assert) {
        this.target.dispose();
        this.target.dispose = noop;
        assert.deepEqual(this.renderer.g.firstCall.returnValue.linkOff.lastCall.args, [], 'root is unlinked');
    });

    QUnit.test('Render', function (assert) {
        const target = this.target;
        target.render({ currentValue: 10, color: 'green' }).resize();

        assert.ok(target._rootElement, '_rootElement');
        assert.deepEqual(target._rootElement._stored_settings, { 'class': 'root-class', fill: 'green' }, '_rootElement settings');

        assert.ok(target._trackerElement, '_trackerElement');
        assert.deepEqual(target._trackerElement._stored_settings, { points: [], type: 'area' }, '_trackerElement settings');
        assert.strictEqual(this.tracker.attached, target._trackerElement, 'tracker is attached');

        assert.ok(target._element, '_element');
        assert.strictEqual(target._element.parent, target._rootElement, '_element parent');
        assert.deepEqual(target._element._stored_settings, { value: 10, position: 210 }, '_element settings');

        assert.deepEqual(this.renderer.g.firstCall.returnValue.linkAppend.lastCall.args, [], 'root is appended to container');
    });

    QUnit.test('Custom color', function (assert) {
        const target = this.target;
        target.render({ currentValue: 10, color: { fillId: 'id_color' } }).resize();

        assert.ok(target._rootElement, '_rootElement');
        assert.deepEqual(target._rootElement._stored_settings, { 'class': 'root-class', fill: 'id_color' }, '_rootElement settings');
    });

    QUnit.test('Render then clean', function (assert) {
        const target = this.target;
        target.render({ currentValue: 10 }).clean();

        assert.ok(this.tracker.detached, 'tracker is detached');
        assert.ok(!target._element, '_element');

        assert.deepEqual(this.renderer.g.firstCall.returnValue.linkRemove.lastCall.args, [], 'root is removed from container');
    });

    QUnit.test('Render when not enabled', function (assert) {
        const target = this.target;
        target.enabled = false;
        target.render({ currentValue: 10 });

        assert.ok(!this.tracker.attached, 'tracker is not attached');
        assert.ok(!target._element, '_element');

        assert.strictEqual(this.renderer.g.firstCall.returnValue.stub('linkAppend').lastCall, null, 'root is not appended to container');
    });

    QUnit.test('Render then render again', function (assert) {
        const target = this.target;
        target.render({ currentValue: 10 });

        target.clean();
        target.enabled = true;
        target.render({ currentValue: 20 });

        assert.strictEqual(this.tracker.attached, target._trackerElement, 'tracker is attached');

        assert.strictEqual(this.renderer.g.firstCall.returnValue.linkAppend.callCount, 2, 'root is appended to container');
    });

    //  B236758
    QUnit.test('Render when "currentValue" option is out of ranges (left)', function (assert) {
        const target = this.target;
        target.render({ currentValue: -500 }).resize();
        assert.deepEqual(target._element._stored_settings, { value: 0, position: 200 }, '_element settings');
    });

    //  B236758
    QUnit.test('Render when "currentValue" option is out of ranges (right)', function (assert) {
        const target = this.target;
        target.render({ currentValue: 500 }).resize();
        assert.deepEqual(target._element._stored_settings, { value: 100, position: 300 }, '_element settings');
    });

    QUnit.module('BaseIndicator - read/write value', environment);

    QUnit.test('Read - empty options', function (assert) {
        this.target.render({}).resize();
        assert.ok(isNaN(this.target.value()), 'value');
        assert.ok(isNaN(this.target._element._stored_settings.value), 'state');
    });

    QUnit.test('Read - not valid options', function (assert) {
        this.target.render({ currentValue: 'test' }).resize();
        assert.ok(isNaN(this.target.value()), 'value');
        assert.ok(isNaN(this.target._element._stored_settings.value), 'state');
    });

    QUnit.test('Read', function (assert) {
        this.target.render({ currentValue: 30 }).resize();
        assert.strictEqual(this.target.value(), 30, 'value');
        assert.strictEqual(this.target._element._stored_settings.value, 30, 'state');
    });

    QUnit.test('Read - when not enabled', function (assert) {
        this.target.enabled = false;
        this.target.render({ currentValue: '25' });
        assert.strictEqual(this.target.value(), 25, 'value');
        assert.ok(!this.target._element, 'state');
    });

    QUnit.test('Write - not valid value', function (assert) {
        this.target.render({ currentValue: 10 }).resize();
        this.target.value('test');
        assert.strictEqual(this.target.value(), 10, 'value');
        assert.strictEqual(this.target._element._stored_settings.value, 10, 'state');
    });

    //  B236758
    QUnit.test('Write - value is out of ranges (left)', function (assert) {
        this.target.render({ currentValue: '20' }).resize();
        this.target.value(-50);
        assert.strictEqual(this.target.value(), 0, 'value');
        assert.strictEqual(this.target._element._stored_settings.value, 0, 'state');
    });

    //  B236758
    QUnit.test('Write - value is out of ranges (right)', function (assert) {
        this.target.render({ currentValue: '20' }).resize();
        this.target.value(200);
        assert.strictEqual(this.target.value(), 100, 'value');
        assert.strictEqual(this.target._element._stored_settings.value, 100, 'state');
    });

    QUnit.test('Write - value is equal to current value', function (assert) {
        this.target.render({ currentValue: 30 }).resize();
        this.target.value('30');
        assert.strictEqual(this.target.value(), 30, 'value');
        assert.strictEqual(this.target._element._stored_settings.value, 30, 'state');
    });

    QUnit.test('Write', function (assert) {
        this.target.render({ currentValue: 40 }).resize();
        this.target.value(50);
        assert.strictEqual(this.target.value(), 50, 'value');
        assert.strictEqual(this.target._element._stored_settings.value, 50, 'state');
    });

    QUnit.test('Write - when not enabled', function (assert) {
        this.target.enabled = false;
        this.target.render({ currentValue: 75 });
        this.target.value('85');
        assert.strictEqual(this.target.value(), 85, 'value');
        assert.ok(!this.target._element, 'state');
    });

    //  B219848
    QUnit.test('Write - several times called (B219848)', function (assert) {
        this.target.render({ currentValue: 0 }).resize();
        this.target.value(1).value(2).value(3).value(4).value(5);
        assert.strictEqual(this.target.value(), 5, 'value');
        assert.strictEqual(this.target._element._stored_settings.value, 5, 'state');
    });

    QUnit.test('Hide indicator with null value', function (assert) {
        this.target.render({ currentValue: '20' }).resize();

        this.target.value(null);

        assert.strictEqual(this.target.value(), null);
        assert.strictEqual(this.renderer.g.firstCall.returnValue.attr.lastCall.args[0].visibility, 'hidden');
    });

    QUnit.test('Show indicator with not-null value', function (assert) {
        this.target.render({ currentValue: '20' }).resize();

        this.target.value(0);

        assert.strictEqual(this.renderer.g.firstCall.returnValue.attr.lastCall.args[0].visibility, null);
    });

    QUnit.module('BaseIndicator - animation', {
        beforeEach: function () {
            this.animationController = new animation.AnimationController();
            environment.beforeEach.apply(this, arguments);
            this.target.render({ currentValue: 50, animation: { enabled: true, duration: 50 } }).resize();
        },
        afterEach: function () {
            this.target.clean();
            this.animationController.dispose();
            environment.afterEach.apply(this, arguments);
        },
        patchRenderer: function () {
            const that = this;
            const _createGroup = that.renderer.stub('g');
            const animationController = this.animationController;

            this.renderer.g = function () {
                const group = _createGroup.apply(this, arguments);

                group.animate = function (properties, options) {
                    const that = this;
                    const _originalStep = options.step;
                    const _originalComplete = options.complete;

                    options.step = function (pos) {
                        _originalStep && _originalStep.apply(this, arguments);
                        group.animateStep && group.animateStep.call(group, pos);
                    };
                    options.complete = function () {
                        _originalComplete && _originalComplete.apply(this, arguments);
                        group.animateComplete && group.animateComplete.call(group);
                    };
                    animationController.animateElement(this, properties, options);
                    return that;
                };
                group.stopAnimation = function () {
                    this.animation && this.animation.stop();
                    return this;
                };
                return group;
            };
        }
    });

    QUnit.testInActiveWindow('Value is changed', function (assert) {
        const done = assert.async();
        const target = this.target;
        target._rootElement.animateComplete = function () {
            assert.strictEqual(target._element._stored_settings.value, 60, 'state after animation');
            assert.expect(3);
            done();
        };
        target.value(60);
        assert.strictEqual(target.value(), 60, 'value is changed immediately');
        assert.strictEqual(target._element._stored_settings.value, 50, 'state before animation');
    });

    QUnit.testInActiveWindow('Value is changed during running animation', function (assert) {
        const done = assert.async();
        const target = this.target;
        target._rootElement.animateStep = function (pos) {
            if (pos > 0.5) {
                delete target._rootElement.animateStep;
                target._pos = pos;
                target.value('10');
                assert.strictEqual(target.value(), 10, 'value is changed 2nd time');
            }
        };
        target._rootElement.animateComplete = function () {
            delete target._rootElement.animateStep;
            assert.roughEqual(target._element._stored_settings.value, 50 + 10 * target._pos, 1E-4, 'state after 1st animation');
            target._rootElement.animateComplete = function () {
                assert.strictEqual(target._element._stored_settings.value, 10, 'state after 2nd animation');
                assert.expect(4);
                done();
            };
        };
        target.value(60);
        assert.strictEqual(target.value(), 60, 'value is changed 1st time');
    });

    QUnit.testInActiveWindow('Clean during running animation', function (assert) {
        const done = assert.async();
        const target = this.target;
        target._rootElement.animateStep = function (pos) {
            if (pos > 0.5) {
                target.clean();
                assert.ok(!target._element, 'cleared');
                assert.expect(2);
                setTimeout(function () {
                    done();
                }, 30);
            }
        };
        target.value('100');
        assert.strictEqual(target.value(), 100, 'value is changed');
    });

    QUnit.testInActiveWindow('Element state is changed during animation', function (assert) {
        const done = assert.async();
        const target = this.target;
        let count = 0;
        target._rootElement.animateStep = function (pos) {
            if (pos > 0) {
                ++count;
                assert.roughEqual(target._element._stored_settings.value, 50 * (1 - pos), 1E-4, 'state is changed');
            }
        };
        target._rootElement.animateComplete = function () {
            assert.strictEqual(target._element._stored_settings.value, 0, 'state after animation');
            assert.expect(2 + count);
            done();
        };
        target.value(0);
        assert.strictEqual(target.value(), 0, 'value is changed');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/common","../../helpers/vizMocks.js","viz/gauges/base_indicators","viz/core/renderers/animation","viz/translators/translator1d"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/common"), require("../../helpers/vizMocks.js"), require("viz/gauges/base_indicators"), require("viz/core/renderers/animation"), require("viz/translators/translator1d"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=baseIndicator.tests.js.map