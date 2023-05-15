!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.gauges/circularNeedle.tests.js"], ["../../helpers/vizMocks.js","viz/gauges/circular_indicators","viz/translators/translator1d"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.gauges/circularNeedle.tests.js', ['../../helpers/vizMocks.js', 'viz/gauges/circular_indicators', 'viz/translators/translator1d'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const circularIndicatorsModule = $__require('viz/gauges/circular_indicators');
    const Translator1D = $__require('viz/translators/translator1d').Translator1D;

    QUnit.module('RectangleNeedle', {
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
            this.needle = new circularIndicatorsModule['rectangleneedle']({ renderer: this.renderer, translator: translator, owner: this.owner, tracker, className: 'root-class' });
            this.layout = {
                x: 200,
                y: 100,
                radius: 80
            };
            this.options = {
                indentFromCenter: 9,
                width: 4,
                color: 'black',
                containerBackgroundColor: 'green',
                spindleSize: 12,
                spindleGapSize: 8,
                currentValue: 25
            };
        }
    });

    QUnit.test('measure', function (assert) {
        assert.deepEqual(this.needle.render({ indentFromCenter: 10 }).measure({ radius: 100 }), { max: 100 });
        assert.deepEqual(this.needle.render({ indentFromCenter: -10 }).measure({ radius: 100 }), { max: 100, inverseHorizontalOffset: 10, inverseVerticalOffset: 10 });
    });

    //  B254470
    QUnit.test('measure (string-like numbers)', function (assert) {
        assert.deepEqual(this.needle.render({ indentFromCenter: '10' }).measure({ radius: 100 }), { max: 100 });
        assert.deepEqual(this.needle.render({ indentFromCenter: '-10' }).measure({ radius: 100 }), { max: 100, inverseHorizontalOffset: 10, inverseVerticalOffset: 10 });
    });

    QUnit.test('render', function (assert) {
        this.needle.render(this.options).resize(this.layout);

        assert.strictEqual(this.needle._renderer, this.renderer, '_renderer');
        assert.strictEqual(this.needle._owner, this.owner, '_owner');

        assert.ok(this.needle._rootElement, '_rootElement');
        assert.deepEqual(this.needle._rootElement._stored_settings, { 'class': 'root-class', fill: 'black' }, '_rootElement settings');

        assert.ok(this.needle._element, '_element');
        assert.strictEqual(this.needle._element.parent, this.needle._rootElement, '_element parent');
        assert.deepEqual(this.needle._element._stored_settings, { points: [198, 91, 198, 20, 202, 20, 202, 91], type: 'area' }, '_element settings');

        assert.ok(this.needle._spindleOuter, '_spindleOuter');
        assert.ok(this.needle._spindleInner, '_spindleInner');
        assert.strictEqual(this.needle._spindleOuter.parent, this.needle._rootElement, '_spindleOuter parent');
        assert.strictEqual(this.needle._spindleInner.parent, this.needle._rootElement, '_spindleInner parent');
        assert.deepEqual(this.needle._spindleOuter._stored_settings, { cx: 200, cy: 100, r: 6, 'class': 'dxg-spindle-border' }, '_spindleOuter settings');
        assert.deepEqual(this.needle._spindleInner._stored_settings, { cx: 200, cy: 100, r: 4, fill: 'green', 'class': 'dxg-spindle-hole' }, '_spindleInner settings');

        assert.ok(this.needle._trackerElement, '_trackerElement');
        assert.deepEqual(this.needle._trackerElement._stored_settings, { points: [190, 20, 190, 91, 210, 91, 210, 20], type: 'area' }, '_tracker settings');

        assert.deepEqual(this.needle._rootElement.rotate.firstCall.args, [-45, 200, 100], 'rotation');
        assert.deepEqual(this.needle._trackerElement.rotate.firstCall.args, [-45, 200, 100], 'trackerElement rotation');
    });

    QUnit.test('not valid width (not rendered)', function (assert) {
        this.options.width = -1;
        assert.ok(!this.needle.render(this.options).enabled);
    });

    QUnit.test('not valid indentFromCenter (not rendered)', function (assert) {
        this.options.indentFromCenter = 90;
        assert.ok(!this.needle.render(this.options).resize(this.layout).visible);
    });

    QUnit.test('not valid radius (not rendered)', function (assert) {
        assert.ok(!this.needle.render(this.options).resize({ radius: -1 }).visible);
    });

    QUnit.test('getTooltipParameters', function (assert) {
        const x = 200 + Math.cos(Math.PI * 0.75) * 44.5;
        const y = 100 - Math.sin(Math.PI * 0.75) * 44.5;
        assert.deepEqual(this.needle.render(this.options).resize(this.layout).getTooltipParameters(), { x: x, y: y, offset: 2, color: 'black', value: 25 });
    });

    QUnit.test('render. when offset is defined', function (assert) {
        this.options.offset = 10;

        this.needle.render(this.options).resize(this.layout);

        assert.deepEqual(this.needle._element._stored_settings, { points: [198, 91, 198, 30, 202, 30, 202, 91], type: 'area' }, '_element settings');
    });

    QUnit.test('Dicrease offsets and spindle size if radius is less than beginAdaptingAtRadius', function (assert) {
        this.options.beginAdaptingAtRadius = 160;
        this.options.offset = 10;

        this.needle.render(this.options).resize(this.layout);

        assert.deepEqual(this.needle._element._stored_settings, { points: [198, 96, 198, 25, 202, 25, 202, 96], type: 'area' }, '_element settings');
        assert.deepEqual(this.needle._spindleOuter._stored_settings, { cx: 200, cy: 100, r: 3, 'class': 'dxg-spindle-border' }, '_spindleOuter settings');
        assert.deepEqual(this.needle._spindleInner._stored_settings, { cx: 200, cy: 100, r: 2, fill: 'green', 'class': 'dxg-spindle-hole' }, '_spindleInner settings');

        assert.deepEqual(this.needle._trackerElement._stored_settings, { points: [190, 25, 190, 96, 210, 96, 210, 25], type: 'area' }, '_tracker settings');
    });

    QUnit.test('Do not dicrease offsets and spindle size if radius is greater than beginAdaptingAtRadius', function (assert) {
        this.options.beginAdaptingAtRadius = 60;

        this.needle.render(this.options).resize(this.layout);

        assert.deepEqual(this.needle._element._stored_settings, { points: [198, 91, 198, 20, 202, 20, 202, 91], type: 'area' }, '_element settings');
        assert.deepEqual(this.needle._spindleOuter._stored_settings, { cx: 200, cy: 100, r: 6, 'class': 'dxg-spindle-border' }, '_spindleOuter settings');
        assert.deepEqual(this.needle._spindleInner._stored_settings, { cx: 200, cy: 100, r: 4, fill: 'green', 'class': 'dxg-spindle-hole' }, '_spindleInner settings');
    });

    QUnit.test('getTooltipParameters when dicresed offsets', function (assert) {
        const x = 200 + Math.cos(Math.PI * 0.75) * 42;
        const y = 100 - Math.sin(Math.PI * 0.75) * 42;
        this.options.beginAdaptingAtRadius = 160;

        assert.deepEqual(this.needle.render(this.options).resize(this.layout).getTooltipParameters(), { x: x, y: y, offset: 2, color: 'black', value: 25 });
    });

    QUnit.test('not valid (offsets too big)', function (assert) {
        this.options.offset = 40;
        this.options.indentFromCenter = 40;
        assert.ok(!this.needle.render(this.options).resize(this.layout).visible);
    });

    QUnit.test('valid (offsets is dicreased if beginAdaptingAtRadius is set)', function (assert) {
        this.options.offset = 40;
        this.options.indentFromCenter = 40;
        this.options.beginAdaptingAtRadius = 160;
        assert.ok(this.needle.render(this.options).resize(this.layout).visible);
    });

    QUnit.module('TriangleNeedle', {
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
            this.needle = new circularIndicatorsModule['triangleneedle']({ renderer: this.renderer, translator,
                owner: this.owner, tracker: tracker, className: 'root-class' });
            this.layout = {
                x: 200,
                y: 100,
                radius: 80
            };
            this.options = {
                indentFromCenter: 9,
                width: 4,
                color: 'black',
                containerBackgroundColor: 'red',
                spindleSize: 10,
                currentValue: 25
            };
        }
    });

    QUnit.test('measure', function (assert) {
        assert.deepEqual(this.needle.render({ indentFromCenter: 10 }).measure({ radius: 100 }), { max: 100 });
        assert.deepEqual(this.needle.render({ indentFromCenter: -10 }).measure({ radius: 100 }), { max: 100, inverseHorizontalOffset: 10, inverseVerticalOffset: 10 });
    });

    //  B254470
    QUnit.test('measure (string-like numbers)', function (assert) {
        assert.deepEqual(this.needle.render({ indentFromCenter: '10' }).measure({ radius: 100 }), { max: 100 });
        assert.deepEqual(this.needle.render({ indentFromCenter: '-10' }).measure({ radius: 100 }), { max: 100, inverseHorizontalOffset: 10, inverseVerticalOffset: 10 });
    });

    QUnit.test('render', function (assert) {
        this.needle.render(this.options).resize(this.layout);

        assert.strictEqual(this.needle._renderer, this.renderer, '_renderer');
        assert.strictEqual(this.needle._owner, this.owner, '_owner');

        assert.ok(this.needle._rootElement, '_rootElement');
        assert.deepEqual(this.needle._rootElement._stored_settings, { 'class': 'root-class', fill: 'black' }, '_rootElement settings');

        assert.ok(this.needle._element, '_element');
        assert.strictEqual(this.needle._element.parent, this.needle._rootElement, '_element parent');
        assert.deepEqual(this.needle._element._stored_settings, { points: [198, 91, 200, 20, 202, 91], type: 'area' }, '_element settings');

        assert.ok(this.needle._spindleOuter, '_spindleOuter');
        assert.ok(this.needle._spindleInner, '_spindleInner');
        assert.strictEqual(this.needle._spindleOuter.parent, this.needle._rootElement, '_spindleOuter parent');
        assert.strictEqual(this.needle._spindleInner.parent, this.needle._rootElement, '_spindleInner parent');
        assert.deepEqual(this.needle._spindleOuter._stored_settings, { cx: 200, cy: 100, r: 5, 'class': 'dxg-spindle-border' }, '_spindleOuter settings');
        assert.deepEqual(this.needle._spindleInner._stored_settings, { cx: 200, cy: 100, r: 0, fill: 'red', 'class': 'dxg-spindle-hole' }, '_spindleInner settings');

        assert.ok(this.needle._trackerElement, '_trackerElement');
        assert.deepEqual(this.needle._trackerElement._stored_settings, { points: [190, 20, 190, 91, 210, 91, 210, 20], type: 'area' }, '_tracker settings');

        assert.deepEqual(this.needle._rootElement.rotate.firstCall.args, [-45, 200, 100], 'rotation');
        assert.deepEqual(this.needle._trackerElement.rotate.firstCall.args, [-45, 200, 100], 'trackerElement rotation');
    });

    QUnit.test('not valid width (not rendered)', function (assert) {
        this.options.width = -1;
        assert.ok(!this.needle.render(this.options).enabled);
    });

    QUnit.test('not valid indentFromCenter (not rendered)', function (assert) {
        this.options.indentFromCenter = 90;
        assert.ok(!this.needle.render(this.options).resize(this.layout).visible);
    });

    QUnit.test('not valid radius (not rendered)', function (assert) {
        assert.ok(!this.needle.render(this.options).resize({ radius: -1 }).visible);
    });

    QUnit.test('getTooltipParameters', function (assert) {
        const x = 200 + Math.cos(Math.PI * 0.75) * 44.5;
        const y = 100 - Math.sin(Math.PI * 0.75) * 44.5;
        assert.deepEqual(this.needle.render(this.options).resize(this.layout).getTooltipParameters(), { x: x, y: y, offset: 2, color: 'black', value: 25 });
    });

    QUnit.test('Dicrease offsets and spindle size if radius is less than beginAdaptingAtRadius', function (assert) {
        this.options.beginAdaptingAtRadius = 160;

        this.needle.render(this.options).resize(this.layout);

        assert.deepEqual(this.needle._element._stored_settings, { points: [198, 96, 200, 20, 202, 96], type: 'area' }, '_element settings');
    });

    QUnit.module('TwoColorRectangleNeedle', {
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
            this.needle = new circularIndicatorsModule['twocolorneedle']({ renderer: this.renderer,
                translator, owner: this.owner, tracker: tracker, className: 'root-class' });
            this.layout = {
                x: 200,
                y: 100,
                radius: 80
            };
            this.options = {
                indentFromCenter: 9,
                width: 4,
                space: 3,
                secondFraction: 0.25,
                color: 'black',
                containerBackgroundColor: 'grey',
                secondColor: 'white',
                spindleSize: 8,
                spindleGapSize: 9,
                currentValue: 25
            };
        }
    });

    QUnit.test('measure', function (assert) {
        assert.deepEqual(this.needle.render({ indentFromCenter: 10 }).measure({ radius: 100 }), { max: 100 });
        assert.deepEqual(this.needle.render({ indentFromCenter: -10 }).measure({ radius: 100 }), { max: 100, inverseHorizontalOffset: 10, inverseVerticalOffset: 10 });
    });

    //  B254470
    QUnit.test('measure (string-like numbers)', function (assert) {
        assert.deepEqual(this.needle.render({ indentFromCenter: '10' }).measure({ radius: 100 }), { max: 100 });
        assert.deepEqual(this.needle.render({ indentFromCenter: '-10' }).measure({ radius: 100 }), { max: 100, inverseHorizontalOffset: 10, inverseVerticalOffset: 10 });
    });

    QUnit.test('render', function (assert) {
        this.needle.render(this.options).resize(this.layout);

        assert.strictEqual(this.needle._renderer, this.renderer, '_renderer');
        assert.strictEqual(this.needle._owner, this.owner, '_owner');

        assert.ok(this.needle._rootElement, '_rootElement');
        assert.deepEqual(this.needle._rootElement._stored_settings, { 'class': 'root-class', fill: 'black' }, '_rootElement settings');

        assert.ok(this.needle._firstElement, '_firstElement');
        assert.strictEqual(this.needle._firstElement.parent, this.needle._rootElement, '_firstElement parent');
        assert.deepEqual(this.needle._firstElement._stored_settings, { points: [198, 91, 198, 40.75, 202, 40.75, 202, 91], type: 'area' }, '_firstElement settings');

        assert.ok(this.needle._spaceElement, '_spaceElement');
        assert.strictEqual(this.needle._spaceElement.parent, this.needle._rootElement, '_spaceElement parent');
        assert.deepEqual(this.needle._spaceElement._stored_settings, { points: [198, 40.75, 198, 37.75, 202, 37.75, 202, 40.75], fill: 'grey', 'class': 'dxg-hole', type: 'area' }, '_spaceElement settings');

        assert.ok(this.needle._secondElement, '_secondElement');
        assert.strictEqual(this.needle._secondElement.parent, this.needle._rootElement, '_secondElement parent');
        assert.deepEqual(this.needle._secondElement._stored_settings, { points: [198, 37.75, 198, 20, 202, 20, 202, 37.75], fill: 'white', 'class': 'dxg-part', type: 'area' }, '_secondElement settings');

        assert.ok(this.needle._spindleOuter, '_spindleOuter');
        assert.ok(this.needle._spindleInner, '_spindleInner');
        assert.strictEqual(this.needle._spindleOuter.parent, this.needle._rootElement, '_spindleOuter parent');
        assert.strictEqual(this.needle._spindleInner.parent, this.needle._rootElement, '_spindleInner parent');
        assert.deepEqual(this.needle._spindleOuter._stored_settings, { cx: 200, cy: 100, r: 4, 'class': 'dxg-spindle-border' }, '_spindleOuter settings');
        assert.deepEqual(this.needle._spindleInner._stored_settings, { cx: 200, cy: 100, r: 4, fill: 'grey', 'class': 'dxg-spindle-hole' }, '_spindleInner settings');

        assert.ok(this.needle._trackerElement, '_trackerElement');
        assert.deepEqual(this.needle._trackerElement._stored_settings, { points: [190, 20, 190, 91, 210, 91, 210, 20], type: 'area' }, '_tracker settings');

        assert.deepEqual(this.needle._rootElement.rotate.firstCall.args, [-45, 200, 100], 'rotation');
        assert.deepEqual(this.needle._trackerElement.rotate.firstCall.args, [-45, 200, 100], 'trackerElement rotation');
    });

    QUnit.test('not valid width (not rendered)', function (assert) {
        this.options.width = -1;
        assert.ok(!this.needle.render(this.options).enabled);
    });

    QUnit.test('not valid indentFromCenter (not rendered)', function (assert) {
        this.options.indentFromCenter = 90;
        assert.ok(!this.needle.render(this.options).resize(this.layout).visible);
    });

    QUnit.test('not valid radius (not rendered)', function (assert) {
        this.options.radius = -1;
        assert.ok(!this.needle.render(this.options).resize({ radius: -1 }).visible);
    });

    // T209992
    QUnit.test('marginal secondFraction', function (assert) {
        this.options.secondFraction = 0;
        this.needle.render(this.options).resize(this.layout);
        assert.deepEqual(this.needle._firstElement._stored_settings.points, [198, 91, 198, 20, 202, 20, 202, 91], '_firstElement points');
        assert.deepEqual(this.needle._secondElement._stored_settings.points, [198, 20, 198, 20, 202, 20, 202, 20], '_secondElement points');
    });

    //  B253863
    QUnit.test('not valid secondFraction', function (assert) {
        this.options.secondFraction = 1.5;
        this.needle.render(this.options).resize(this.layout);
        assert.deepEqual(this.needle._firstElement._stored_settings.points, [198, 91, 198, 91, 202, 91, 202, 91], '_firstElement points');
        assert.deepEqual(this.needle._secondElement._stored_settings.points, [198, 91, 198, 20, 202, 20, 202, 91], '_secondElement points');
    });

    QUnit.test('getTooltipParameters', function (assert) {
        const x = 200 + Math.cos(Math.PI * 0.75) * 44.5;
        const y = 100 - Math.sin(Math.PI * 0.75) * 44.5;
        assert.deepEqual(this.needle.render(this.options).resize(this.layout).getTooltipParameters(), { x: x, y: y, offset: 2, color: 'black', value: 25 });
    });

    QUnit.test('Dicrease offsets and spindle size if radius is less than beginAdaptingAtRadius', function (assert) {
        this.options.beginAdaptingAtRadius = 160;

        this.needle.render(this.options).resize(this.layout);

        assert.deepEqual(this.needle._firstElement._stored_settings, { points: [198, 96, 198, 42, 202, 42, 202, 96], type: 'area' }, '_firstElement settings');
        assert.deepEqual(this.needle._secondElement._stored_settings, { points: [198, 39, 198, 20, 202, 20, 202, 39], fill: 'white', 'class': 'dxg-part', type: 'area' }, '_secondElement settings');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/vizMocks.js","viz/gauges/circular_indicators","viz/translators/translator1d"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/vizMocks.js"), require("viz/gauges/circular_indicators"), require("viz/translators/translator1d"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=circularNeedle.tests.js.map