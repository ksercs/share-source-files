!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.gauges/circularMarker.tests.js"], ["core/utils/common","../../helpers/vizMocks.js","viz/gauges/circular_indicators","viz/gauges/base_indicators","viz/translators/translator1d"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.gauges/circularMarker.tests.js', ['core/utils/common', '../../helpers/vizMocks.js', 'viz/gauges/circular_indicators', 'viz/gauges/base_indicators', 'viz/translators/translator1d'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const noop = $__require('core/utils/common').noop;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const circularIndicatorsModule = $__require('viz/gauges/circular_indicators');
    const getTextCloudInfo = $__require('viz/gauges/base_indicators').getTextCloudInfo;
    const Translator1D = $__require('viz/translators/translator1d').Translator1D;

    QUnit.module('TriangleMarker', {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.owner = this.renderer.g();
            const tracker = {
                attach: function (arg) {
                    this.attached = arg;
                },
                detach: function (arg) {
                    this.detached = arg;
                }
            };
            const translator = new Translator1D(0, 100, 180, 0);
            this.marker = new circularIndicatorsModule['trianglemarker']({ renderer: this.renderer, translator: translator, owner: this.owner, tracker: tracker, className: 'root-class' });
            this.layout = {
                x: 200,
                y: 100,
                radius: 80
            };
            this.options = {
                length: 12,
                width: 8,
                color: 'black',
                currentValue: 25
            };
        }
    });

    QUnit.test('measure', function (assert) {
        assert.deepEqual(this.marker.render({ length: 10 }).measure({ radius: 100 }), { min: 100, max: 110 });
    });

    //  B254470
    QUnit.test('measure (string-like numbers)', function (assert) {
        assert.deepEqual(this.marker.render({ length: '10' }).measure({ radius: 100 }), { min: 100, max: 110 });
    });

    QUnit.test('render', function (assert) {
        this.marker.render(this.options).resize(this.layout);

        assert.strictEqual(this.marker._renderer, this.renderer, '_renderer');
        assert.strictEqual(this.marker._owner, this.owner, '_owner');

        assert.ok(this.marker._rootElement, '_rootElement');
        assert.deepEqual(this.marker._rootElement._stored_settings, { 'class': 'root-class', fill: 'black' }, '_rootElement settings');

        assert.ok(this.marker._element, '_element');
        assert.strictEqual(this.marker._element.parent, this.marker._rootElement, '_element parent');
        assert.deepEqual(this.marker._element._stored_settings, { points: [200, 20, 196, 8, 204, 8], stroke: 'none', 'stroke-width': 0, 'stroke-linecap': 'square', type: 'area' }, '_element settings');
        assert.equal(this.marker._element.sharp.callCount, 1, '_element is sharped');
        assert.ok(this.marker._element.sharp.lastCall.calledAfter(this.marker._element.attr.lastCall), '_element is sharped');

        assert.ok(this.marker._trackerElement, '_trackerElement');
        assert.deepEqual(this.marker._trackerElement._stored_settings, { points: [190, 4, 190, 24, 210, 24, 210, 4], type: 'area' }, '_tracker settings');

        assert.deepEqual(this.marker._rootElement.rotate.firstCall.args, [-45, 200, 100], 'rotation');
        assert.deepEqual(this.marker._trackerElement.rotate.firstCall.args, [-45, 200, 100], 'trackerElement rotation');
    });

    QUnit.test('render - with background', function (assert) {
        this.options.space = 1;
        this.options.containerBackgroundColor = 'white';
        this.marker.render(this.options).resize(this.layout);
        assert.deepEqual(this.marker._element._stored_settings, { points: [200, 20, 196, 8, 204, 8], stroke: 'white', 'stroke-width': 1, 'stroke-linecap': 'square', type: 'area' }, '_element settings');
        assert.equal(this.marker._element.sharp.callCount, 1, '_element is sharped');
        assert.ok(this.marker._element.sharp.lastCall.calledAfter(this.marker._element.attr.lastCall), '_element is sharped');
    });

    QUnit.test('render - background size is limited', function (assert) {
        this.options.space = 5;
        this.options.containerBackgroundColor = 'white';
        this.marker.render(this.options).resize(this.layout);
        assert.deepEqual(this.marker._element._stored_settings, { points: [200, 20, 196, 8, 204, 8], stroke: 'white', 'stroke-width': 2, 'stroke-linecap': 'square', type: 'area' }, '_element settings');
        assert.equal(this.marker._element.sharp.callCount, 1, '_element is sharped');
        assert.ok(this.marker._element.sharp.lastCall.calledAfter(this.marker._element.attr.lastCall), '_element is sharped');
    });

    QUnit.test('not valid length (not rendered)', function (assert) {
        this.options.length = 0;
        assert.ok(!this.marker.render(this.options).enabled);
    });

    QUnit.test('not valid width (not rendered)', function (assert) {
        this.options.width = -2;
        assert.ok(!this.marker.render(this.options).enabled);
    });

    QUnit.test('not valid radius. min radius check', function (assert) {
        this.options.x = 10;
        this.options.y = 10;
        this.options.width = 4;
        this.options.length = 5;
        this.options.radius = 0;

        assert.ok(this.marker.render(this.options).resize({ radius: 0 }).visible);
        assert.deepEqual(this.renderer.path.lastCall.returnValue.attr.lastCall.args[0].points, [10, 9, 8, 4, 12, 4]);
    });

    QUnit.test('getTooltipParameters', function (assert) {
        const x = 200 + Math.cos(Math.PI * 0.75) * 86;
        const y = 100 - Math.sin(Math.PI * 0.75) * 86;
        assert.deepEqual(this.marker.render(this.options).resize(this.layout).getTooltipParameters(), { x: x, y: y, offset: 6, color: 'black', value: 25 });
    });

    QUnit.module('TextCloudMarker', {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.owner = this.renderer.g();
            const tracker = {
                attach: function (arg) {
                    this.attached = arg;
                },
                detach: function (arg) {
                    this.detached = arg;
                }
            };
            const translator = new Translator1D(0, 100, 180, 0);
            this.marker = new circularIndicatorsModule['textcloud']({ renderer: this.renderer, translator: translator, owner: this.owner, tracker, className: 'root-class', notifiers: { dirty: noop, ready: noop, changed: noop } });
            this.layout = {
                x: 200,
                y: 100,
                radius: 80
            };
            this.options = {
                arrowLength: 3,
                horizontalOffset: 8,
                verticalOffset: 4,
                color: 'black',
                text: {
                    format: {
                        type: 'fixedPoint',
                        precision: 1
                    },
                    font: { color: 'fontColor', size: 'fontSize' }
                },
                currentValue: 25
            };
            const baseCreateText = this.renderer.stub('text');
            this.renderer.text = sinon.spy(function () {
                const text = baseCreateText.apply(this, arguments);
                text.getBBox = sinon.spy(function () {
                    return { x: -20, y: -10, width: 40, height: 16 };
                });
                return text;
            });
        }
    });

    QUnit.test('measure', function (assert) {
        assert.deepEqual(this.marker.render(this.options).measure({ radius: 80 }), {
            min: 80,
            max: 80,
            horizontalOffset: 59,
            inverseHorizontalOffset: 59,
            verticalOffset: 27,
            inverseVerticalOffset: 27
        });
    });

    //  B254470
    QUnit.test('measure (string-like numbers)', function (assert) {
        this.options.arrowLength = String(this.options.arrowLength);
        this.options.horizontalOffset = String(this.options.horizontalOffset);
        this.options.verticalOffset = String(this.options.verticalOffset);
        assert.deepEqual(this.marker.render(this.options).measure({ radius: 80 }), {
            min: 80,
            max: 80,
            horizontalOffset: 59,
            inverseHorizontalOffset: 59,
            verticalOffset: 27,
            inverseVerticalOffset: 27
        });
    });

    QUnit.test('render', function (assert) {
        const tc = getTextCloudInfo({
            x: 200 + 80 * Math.cos(Math.PI * 3 / 4),
            y: 100 - 80 * Math.sin(Math.PI * 3 / 4),
            cloudWidth: 56,
            cloudHeight: 24,
            tailLength: 3,
            type: 'right-bottom'
        });

        this.marker.render(this.options).resize(this.layout);

        assert.strictEqual(this.marker._renderer, this.renderer, '_renderer');
        assert.strictEqual(this.marker._owner, this.owner, '_owner');

        assert.ok(this.marker._rootElement, '_rootElement');
        assert.deepEqual(this.marker._rootElement._stored_settings, { 'class': 'root-class', fill: 'black' }, '_rootElement settings');

        assert.ok(this.marker._cloud, '_cloud');
        assert.strictEqual(this.marker._cloud.parent, this.marker._rootElement, '_cloud parent');
        assert.deepEqual(this.marker._cloud._stored_settings, { points: tc.points, type: 'area' }, '_cloud settings');

        assert.ok(this.marker._text, '_text');
        assert.strictEqual(this.marker._text.parent, this.marker._rootElement, '_text parent');
        assert.deepEqual(this.marker._text._stored_settings, { x: tc.cx, y: tc.cy + 2, align: 'center', text: '25.0' }, '_text settings');
        assert.deepEqual(this.marker._text._stored_styles, { fill: 'fontColor', 'font-size': 'fontSize' }, '_text font styles');
    });

    // T346511
    QUnit.test('change value when container is invisible', function (assert) {
        this.marker.render(this.options).resize(this.layout);
        this.marker._text.getBBox = function () {
            return { x: 0, y: 0, width: 0, height: 0 };
        };

        this.marker.value(30);

        assert.strictEqual(this.marker._text._stored_settings.x, 129, 'text x');
        assert.strictEqual(this.marker._text._stored_settings.y, 22, 'text y');
    });

    QUnit.test('_getTextCloudOptions - 1 quarter', function (assert) {
        this.marker._actualPosition = 72;
        this.marker._options = { x: 100, y: 90, radius: 40 };

        assert.deepEqual(this.marker._getTextCloudOptions(), {
            x: 100 + 40 * Math.cos(0.4 * Math.PI),
            y: 90 - 40 * Math.sin(0.4 * Math.PI),
            type: 'bottom-left'
        });
    });

    QUnit.test('_getTextCloudOptions - 2 quarter', function (assert) {
        this.marker._actualPosition = 126;
        this.marker._options = { x: 100, y: 90, radius: 40 };

        assert.deepEqual(this.marker._getTextCloudOptions(), {
            x: 100 + 40 * Math.cos(0.7 * Math.PI),
            y: 90 - 40 * Math.sin(0.7 * Math.PI),
            type: 'right-bottom'
        });
    });

    QUnit.test('_getTextCloudOptions - 3 quarter', function (assert) {
        this.marker._actualPosition = 234;
        this.marker._options = { x: 100, y: 90, radius: 40 };

        assert.deepEqual(this.marker._getTextCloudOptions(), {
            x: 100 + 40 * Math.cos(1.3 * Math.PI),
            y: 90 - 40 * Math.sin(1.3 * Math.PI),
            type: 'top-right'
        });
    });

    QUnit.test('_getTextCloudOptions - 4 quarter', function (assert) {
        this.marker._actualPosition = 324;
        this.marker._options = { x: 100, y: 90, radius: 40 };

        assert.deepEqual(this.marker._getTextCloudOptions(), {
            x: 100 + 40 * Math.cos(1.8 * Math.PI),
            y: 90 - 40 * Math.sin(1.8 * Math.PI),
            type: 'left-top'
        });
    });

    QUnit.test('not valid radius. min radius check', function (assert) {
        this.options.radius = -1;
        this.options.x = 10;
        this.options.y = 10;

        assert.ok(this.marker.render(this.options).resize({ radius: -1 }).visible);
        assert.deepEqual(this.renderer.path.lastCall.returnValue.attr.lastCall.args[0].points, [9, 9, 9, -18, -47, -18, -47, 6, 6, 6]);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/common","../../helpers/vizMocks.js","viz/gauges/circular_indicators","viz/gauges/base_indicators","viz/translators/translator1d"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/common"), require("../../helpers/vizMocks.js"), require("viz/gauges/circular_indicators"), require("viz/gauges/base_indicators"), require("viz/translators/translator1d"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=circularMarker.tests.js.map