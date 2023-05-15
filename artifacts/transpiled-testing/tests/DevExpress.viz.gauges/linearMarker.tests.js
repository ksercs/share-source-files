!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.gauges/linearMarker.tests.js"], ["../../helpers/vizMocks.js","viz/gauges/linear_indicators","viz/gauges/base_indicators","viz/translators/translator1d"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.gauges/linearMarker.tests.js', ['../../helpers/vizMocks.js', 'viz/gauges/linear_indicators', 'viz/gauges/base_indicators', 'viz/translators/translator1d'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const linearIndicatorsModule = $__require('viz/gauges/linear_indicators');
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
            const translator = new Translator1D(0, 100, 300, 400);
            this.marker = new linearIndicatorsModule['trianglemarker']({ renderer: this.renderer,
                translator: translator, owner: this.owner, tracker, className: 'root-class' });
            this.layout = {
                x: 200,
                y: 100
            };
            this.options = {
                length: 20,
                width: 8,
                color: 'black',
                currentValue: 25
            };
        }
    });

    QUnit.test('measure', function (assert) {
        assert.deepEqual(this.marker.render({ length: 10, width: 4 }).measure({ y: 100 }), { min: 90, max: 100 }, 'horizontal, top');
        assert.deepEqual(this.marker.render({ length: 10, width: 4, verticalOrientation: 'bottom' }).measure({ y: 100 }), { min: 100, max: 110 }, 'horizontal, bottom');
        assert.deepEqual(this.marker.render({ length: 10, width: 4, vertical: true }).measure({ x: 200 }), { min: 190, max: 200 }, 'vertical, left');
        assert.deepEqual(this.marker.render({ length: 10, width: 4, vertical: true, horizontalOrientation: 'right' }).measure({ x: 200 }), { min: 200, max: 210 }, 'vertical, right');
    });

    //  B254470
    QUnit.test('measure (string-like numbers)', function (assert) {
        assert.deepEqual(this.marker.render({ length: '10', width: '4' }).measure({ y: 100 }), { min: 90, max: 100 }, 'horizontal, top');
        assert.deepEqual(this.marker.render({ length: '10', width: '4', verticalOrientation: 'bottom' }).measure({ y: 100 }), { min: 100, max: 110 }, 'horizontal, bottom');
        assert.deepEqual(this.marker.render({ length: '10', width: '4', vertical: true }).measure({ x: 200 }), { min: 190, max: 200 }, 'vertical, left');
        assert.deepEqual(this.marker.render({ length: '10', width: '4', vertical: true, horizontalOrientation: 'right' }).measure({ x: 200 }), { min: 200, max: 210 }, 'vertical, right');
    });

    QUnit.test('render - horizontal, top', function (assert) {
        this.marker.render(this.options).resize(this.layout);

        assert.strictEqual(this.marker._renderer, this.renderer, '_renderer');
        assert.strictEqual(this.marker._owner, this.owner, '_owner');

        assert.ok(this.marker._rootElement, '_rootElement');
        assert.deepEqual(this.marker._rootElement._stored_settings, { 'class': 'root-class', fill: 'black' }, '_rootElement settings');

        assert.ok(this.marker._element, '_element');
        assert.strictEqual(this.marker._element.parent, this.marker._rootElement, '_element parent');
        assert.deepEqual(this.marker._element._stored_settings, { points: [300, 100, 296, 80, 304, 80], stroke: 'none', 'stroke-width': 0, 'stroke-linecap': 'square', type: 'area' }, '_element settings');
        assert.equal(this.marker._element.sharp.callCount, 1, '_element is sharped');
        assert.ok(this.marker._element.sharp.lastCall.calledAfter(this.marker._element.attr.lastCall), '_element is sharped');

        assert.ok(this.marker._trackerElement, '_trackerElement');
        assert.deepEqual(this.marker._trackerElement._stored_settings, { points: [290, 100, 290, 80, 310, 80, 310, 100], type: 'area' }, '_tracker settings');

        assert.deepEqual(this.marker._rootElement.move.firstCall.args, [25, 0], 'movement');
        assert.deepEqual(this.marker._trackerElement.move.firstCall.args, [25, 0], 'trackerElement movement');
    });

    QUnit.test('render - horizontal, bottom', function (assert) {
        this.options.verticalOrientation = 'bottom';
        this.marker.render(this.options).resize(this.layout);

        assert.strictEqual(this.marker._renderer, this.renderer, '_renderer');
        assert.strictEqual(this.marker._owner, this.owner, '_owner');

        assert.ok(this.marker._rootElement, '_rootElement');
        assert.deepEqual(this.marker._rootElement._stored_settings, { 'class': 'root-class', fill: 'black' }, '_rootElement settings');

        assert.ok(this.marker._element, '_element');
        assert.strictEqual(this.marker._element.parent, this.marker._rootElement, '_element parent');
        assert.deepEqual(this.marker._element._stored_settings, { points: [300, 100, 296, 120, 304, 120], stroke: 'none', 'stroke-width': 0, 'stroke-linecap': 'square', type: 'area' }, '_element settings');
        assert.equal(this.marker._element.sharp.callCount, 1, '_element is sharped');
        assert.ok(this.marker._element.sharp.lastCall.calledAfter(this.marker._element.attr.lastCall), '_element is sharped');

        assert.ok(this.marker._trackerElement, '_trackerElement');
        assert.deepEqual(this.marker._trackerElement._stored_settings, { points: [290, 100, 290, 120, 310, 120, 310, 100], type: 'area' }, '_tracker settings');

        assert.deepEqual(this.marker._rootElement.move.firstCall.args, [25, 0], 'movement');
        assert.deepEqual(this.marker._trackerElement.move.firstCall.args, [25, 0], 'trackerElement movement');
    });

    QUnit.test('render - vertical, left', function (assert) {
        this.options.vertical = true;
        this.marker.render(this.options).resize(this.layout);

        assert.strictEqual(this.marker._renderer, this.renderer, '_renderer');
        assert.strictEqual(this.marker._owner, this.owner, '_owner');

        assert.ok(this.marker._rootElement, '_rootElement');
        assert.deepEqual(this.marker._rootElement._stored_settings, { 'class': 'root-class', fill: 'black' }, '_rootElement settings');

        assert.ok(this.marker._element, '_element');
        assert.strictEqual(this.marker._element.parent, this.marker._rootElement, '_element parent');
        assert.deepEqual(this.marker._element._stored_settings, { points: [200, 300, 180, 296, 180, 304], stroke: 'none', 'stroke-width': 0, 'stroke-linecap': 'square', type: 'area' }, '_element settings');
        assert.equal(this.marker._element.sharp.callCount, 1, '_element is sharped');
        assert.ok(this.marker._element.sharp.lastCall.calledAfter(this.marker._element.attr.lastCall), '_element is sharped');

        assert.ok(this.marker._trackerElement, '_trackerElement');
        assert.deepEqual(this.marker._trackerElement._stored_settings, { points: [200, 310, 180, 310, 180, 290, 200, 290], type: 'area' }, '_tracker settings');

        assert.deepEqual(this.marker._rootElement.move.firstCall.args, [0, 25], 'movement');
        assert.deepEqual(this.marker._trackerElement.move.firstCall.args, [0, 25], 'trackerElement movement');
    });

    QUnit.test('render - vertical, right', function (assert) {
        this.options.vertical = true;
        this.options.horizontalOrientation = 'right';
        this.marker.render(this.options).resize(this.layout);

        assert.strictEqual(this.marker._renderer, this.renderer, '_renderer');
        assert.strictEqual(this.marker._owner, this.owner, '_owner');

        assert.ok(this.marker._rootElement, '_rootElement');
        assert.deepEqual(this.marker._rootElement._stored_settings, { 'class': 'root-class', fill: 'black' }, '_rootElement settings');

        assert.ok(this.marker._element, '_element');
        assert.strictEqual(this.marker._element.parent, this.marker._rootElement, '_element parent');
        assert.deepEqual(this.marker._element._stored_settings, { points: [200, 300, 220, 296, 220, 304], stroke: 'none', 'stroke-width': 0, 'stroke-linecap': 'square', type: 'area' }, '_element settings');
        assert.equal(this.marker._element.sharp.callCount, 1, '_element is sharped');
        assert.ok(this.marker._element.sharp.lastCall.calledAfter(this.marker._element.attr.lastCall), '_element is sharped');

        assert.ok(this.marker._trackerElement, '_trackerElement');
        assert.deepEqual(this.marker._trackerElement._stored_settings, { points: [200, 310, 220, 310, 220, 290, 200, 290], type: 'area' }, '_tracker settings');

        assert.deepEqual(this.marker._rootElement.move.firstCall.args, [0, 25], 'movement');
        assert.deepEqual(this.marker._trackerElement.move.firstCall.args, [0, 25], 'trackerElement movement');
    });

    QUnit.test('render - with background', function (assert) {
        this.options.space = 1;
        this.options.containerBackgroundColor = 'white';
        this.marker.render(this.options).resize(this.layout);

        assert.deepEqual(this.marker._element._stored_settings, { points: [300, 100, 296, 80, 304, 80], stroke: 'white', 'stroke-width': 1, 'stroke-linecap': 'square', type: 'area' }, '_element settings');
        assert.equal(this.marker._element.sharp.callCount, 1, '_element is sharped');
        assert.ok(this.marker._element.sharp.lastCall.calledAfter(this.marker._element.attr.lastCall), '_element is sharped');
    });

    QUnit.test('render - background size is limited', function (assert) {
        this.options.space = 5;
        this.options.containerBackgroundColor = 'white';
        this.marker.render(this.options).resize(this.layout);

        assert.deepEqual(this.marker._element._stored_settings, { points: [300, 100, 296, 80, 304, 80], stroke: 'white', 'stroke-width': 2, 'stroke-linecap': 'square', type: 'area' }, '_element settings');
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

    QUnit.test('getTooltipParameters - horizontal, top', function (assert) {
        assert.deepEqual(this.marker.render(this.options).resize(this.layout).getTooltipParameters(), { x: 325, y: 90, offset: 10, color: 'black', value: 25 });
    });

    QUnit.test('getTooltipParameters - horizontal, bottom', function (assert) {
        this.options.verticalOrientation = 'bottom';
        assert.deepEqual(this.marker.render(this.options).resize(this.layout).getTooltipParameters(), { x: 325, y: 110, offset: 10, color: 'black', value: 25 });
    });

    QUnit.test('getTooltipParameters - vertical, left', function (assert) {
        this.options.vertical = true;
        assert.deepEqual(this.marker.render(this.options).resize(this.layout).getTooltipParameters(), { x: 190, y: 325, offset: 10, color: 'black', value: 25 });
    });

    QUnit.test('getTooltipParameters - vertical, right', function (assert) {
        this.options.vertical = true;
        this.options.horizontalOrientation = 'right';
        assert.deepEqual(this.marker.render(this.options).resize(this.layout).getTooltipParameters(), { x: 210, y: 325, offset: 10, color: 'black', value: 25 });
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
            const translator = new Translator1D(0, 100, 300, 400);
            this.marker = new linearIndicatorsModule['textcloud']({ renderer: this.renderer, translator: translator, owner: this.owner, tracker, className: 'root-class' });
            this.layout = {
                x: 200,
                y: 100
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
                    font: { color: 'someColor', size: 'someSize' }
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

    //  B254470
    QUnit.test('measure', function (assert) {
        this.options.arrowLength = String(this.options.arrowLength);
        this.options.horizontalOffset = String(this.options.horizontalOffset);
        this.options.verticalOffset = String(this.options.verticalOffset);

        assert.deepEqual(this.marker.render(this.options).measure({ y: 100 }), { min: 73, max: 100, indent: 0 }, 'horizontal, top');

        this.options.verticalOrientation = 'bottom';
        assert.deepEqual(this.marker.render(this.options).measure({ y: 100 }), { min: 100, max: 127, indent: 0 }, 'horizontal, bottom');

        this.options.vertical = true;
        assert.deepEqual(this.marker.render(this.options).measure({ x: 200 }), { min: 141, max: 200, indent: 0 }, 'vertical, left');

        this.options.horizontalOrientation = 'right';
        assert.deepEqual(this.marker.render(this.options).measure({ x: 200 }), { min: 200, max: 259, indent: 0 }, 'vertical, right');
    });

    //  B254470
    QUnit.test('measure (string-like numbers)', function (assert) {
        assert.deepEqual(this.marker.render(this.options).measure({ y: 100 }), { min: 73, max: 100, indent: 0 }, 'horizontal, top');

        this.options.verticalOrientation = 'bottom';
        assert.deepEqual(this.marker.render(this.options).measure({ y: 100 }), { min: 100, max: 127, indent: 0 }, 'horizontal, bottom');

        this.options.vertical = true;
        assert.deepEqual(this.marker.render(this.options).measure({ x: 200 }), { min: 141, max: 200, indent: 0 }, 'vertical, left');

        this.options.horizontalOrientation = 'right';
        assert.deepEqual(this.marker.render(this.options).measure({ x: 200 }), { min: 200, max: 259, indent: 0 }, 'vertical, right');
    });

    QUnit.test('render - horizontal, top', function (assert) {
        const tc = getTextCloudInfo({
            x: 325,
            y: 100,
            tailLength: 3,
            type: 'left-bottom',
            cloudWidth: 56,
            cloudHeight: 24
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
        assert.deepEqual(this.marker._text._stored_styles, { fill: 'someColor', 'font-size': 'someSize' }, '_text font style');
    });

    QUnit.test('render - horizontal, bottom', function (assert) {
        const tc = getTextCloudInfo({
            x: 325,
            y: 100,
            cloudWidth: 56,
            cloudHeight: 24,
            tailLength: 3,
            type: 'left-top'
        });

        this.options.verticalOrientation = 'bottom';
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
        assert.deepEqual(this.marker._text._stored_styles, { fill: 'someColor', 'font-size': 'someSize' }, '_text font style');
    });

    QUnit.test('render - vertical, left', function (assert) {
        const tc = getTextCloudInfo({
            x: 200,
            y: 325,
            cloudWidth: 56,
            cloudHeight: 24,
            tailLength: 3,
            type: 'bottom-right'
        });

        this.options.vertical = true;
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
        assert.deepEqual(this.marker._text._stored_styles, { fill: 'someColor', 'font-size': 'someSize' }, '_text font style');
    });

    QUnit.test('render - vertical, right', function (assert) {
        const tc = getTextCloudInfo({
            x: 200,
            y: 325,
            cloudWidth: 56,
            cloudHeight: 24,
            tailLength: 3,
            type: 'bottom-left'
        });

        this.options.vertical = true;
        this.options.horizontalOrientation = 'right';
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
        assert.deepEqual(this.marker._text._stored_styles, { fill: 'someColor', 'font-size': 'someSize' }, '_text font style');
    });

    QUnit.test('_getTextCloudOptions - horizontal, top', function (assert) {
        this.marker._options = { y: 90 };
        this.marker._actualPosition = 100;
        this.marker._inverted = false;

        assert.deepEqual(this.marker._getTextCloudOptions(), { x: 100, y: 90, type: 'right-bottom' });
    });

    QUnit.test('_getTextCloudOptions - horizontal, bottom', function (assert) {
        this.marker._options = { y: 90 };
        this.marker._actualPosition = 100;
        this.marker._inverted = true;

        assert.deepEqual(this.marker._getTextCloudOptions(), { x: 100, y: 90, type: 'right-top' });
    });

    QUnit.test('_getTextCloudOptions - vertical, left', function (assert) {
        this.marker._options = { x: 90 };
        this.marker._actualPosition = 100;
        this.marker.vertical = true;
        this.marker._inverted = false;

        assert.deepEqual(this.marker._getTextCloudOptions(), { x: 90, y: 100, type: 'top-right' });
    });

    QUnit.test('_getTextCloudOptions - vertical, left. inverted', function (assert) {
        this.marker._options = { x: 90 };
        this.marker._actualPosition = 100;
        this.marker.vertical = true;
        this.marker._inverted = true;

        assert.deepEqual(this.marker._getTextCloudOptions(), { x: 90, y: 100, type: 'top-left' });
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/vizMocks.js","viz/gauges/linear_indicators","viz/gauges/base_indicators","viz/translators/translator1d"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/vizMocks.js"), require("viz/gauges/linear_indicators"), require("viz/gauges/base_indicators"), require("viz/translators/translator1d"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=linearMarker.tests.js.map