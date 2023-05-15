!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.gauges/linearRangeBar.tests.js"], ["../../helpers/vizMocks.js","viz/gauges/linear_indicators","viz/translators/translator1d"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.gauges/linearRangeBar.tests.js', ['../../helpers/vizMocks.js', 'viz/gauges/linear_indicators', 'viz/translators/translator1d'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* global currentTest */

    const vizMocks = $__require('../../helpers/vizMocks.js');
    const linearIndicatorsModule = $__require('viz/gauges/linear_indicators');
    const Translator1D = $__require('viz/translators/translator1d').Translator1D;

    QUnit.module('LinearRangeBar', {
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
            this.rangeBar = new linearIndicatorsModule['rangebar']({ renderer: this.renderer, translator: translator, owner: this.owner, tracker, className: 'root-class' });
            this.layout = {
                x: 200,
                y: 100
            };
            this.options = {
                size: 12,
                color: 'black',
                backgroundColor: 'white',
                containerBackgroundColor: 'grey',
                space: 3,
                text: {
                    indent: 9,
                    format: {
                        type: 'fixedPoint',
                        precision: 1
                    },
                    font: {
                        family: 'Font'
                    }
                },
                baseValue: 50,
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

    function render(rangeBar, options) {
        rangeBar.render(options).resize(currentTest().layout);
    }

    QUnit.test('measure - without text', function (assert) {
        delete this.options.text.indent;

        assert.deepEqual(this.rangeBar.render(this.options).measure({ y: 100 }), { min: 88, max: 100, indent: undefined }, 'horizontal, top');

        this.options.verticalOrientation = 'bottom';
        assert.deepEqual(this.rangeBar.render(this.options).measure({ y: 100 }), { min: 100, max: 112, indent: undefined }, 'horizontal, bottom');

        this.options.vertical = true;
        assert.deepEqual(this.rangeBar.render(this.options).measure({ x: 200 }), { min: 188, max: 200, indent: undefined }, 'vertical, left');

        this.options.horizontalOrientation = 'right';
        assert.deepEqual(this.rangeBar.render(this.options).measure({ x: 200 }), { min: 200, max: 212, indent: undefined }, 'vertical, right');
    });

    QUnit.test('measure - with text, positive indent', function (assert) {
        assert.deepEqual(this.rangeBar.render(this.options).measure({ y: 100 }), { min: 88, max: 125, indent: 20 }, 'horizontal, top');

        this.options.verticalOrientation = 'bottom';
        assert.deepEqual(this.rangeBar.render(this.options).measure({ y: 100 }), { min: 100, max: 137, indent: 20 }, 'horizontal, bottom');

        this.options.vertical = true;
        assert.deepEqual(this.rangeBar.render(this.options).measure({ x: 200 }), { min: 188, max: 249, indent: 8 }, 'vertical, left');

        this.options.horizontalOrientation = 'right';
        assert.deepEqual(this.rangeBar.render(this.options).measure({ x: 200 }), { min: 200, max: 261, indent: 8 }, 'vertical, right');
    });

    QUnit.test('measure - with text, negative indent', function (assert) {
        this.options.text.indent = -9;

        assert.deepEqual(this.rangeBar.render(this.options).measure({ y: 100 }), { min: 63, max: 100, indent: 20 }, 'horizontal, top');

        this.options.verticalOrientation = 'bottom';
        assert.deepEqual(this.rangeBar.render(this.options).measure({ y: 100 }), { min: 75, max: 112, indent: 20 }, 'horizontal, bottom');

        this.options.vertical = true;
        assert.deepEqual(this.rangeBar.render(this.options).measure({ x: 200 }), { min: 139, max: 200, indent: 8 }, 'vertical, left');

        this.options.horizontalOrientation = 'right';
        assert.deepEqual(this.rangeBar.render(this.options).measure({ x: 200 }), { min: 151, max: 212, indent: 8 }, 'vertical, right');
    });

    //  B254470
    QUnit.test('measure (string-like numbers)', function (assert) {
        this.options.size = String(this.options.size);
        this.options.text.indent = String(this.options.text.indent);
        assert.deepEqual(this.rangeBar.render(this.options).measure({ y: 100 }), { min: 88, max: 125, indent: 20 }, 'horizontal, top');

        this.options.verticalOrientation = 'bottom';
        assert.deepEqual(this.rangeBar.render(this.options).measure({ y: 100 }), { min: 100, max: 137, indent: 20 }, 'horizontal, bottom');

        this.options.vertical = true;
        assert.deepEqual(this.rangeBar.render(this.options).measure({ x: 200 }), { min: 188, max: 249, indent: 8 }, 'vertical, left');

        this.options.horizontalOrientation = 'right';
        assert.deepEqual(this.rangeBar.render(this.options).measure({ x: 200 }), { min: 200, max: 261, indent: 8 }, 'vertical, right');
    });

    function checkBars(assert, vertical, a1, a2, p1, p2, p3, p4, space, mainColor, backColor, spaceColor) {
        assert.strictEqual(this.rangeBar._renderer, this.renderer, '_renderer');
        assert.strictEqual(this.rangeBar._owner, this.owner, '_owner');

        assert.ok(this.rangeBar._backItem1, '_backItem1');
        assert.ok(this.rangeBar._backItem2, '_backItem2');
        assert.ok(this.rangeBar._spaceItem1, '_spaceItem1');
        assert.ok(this.rangeBar._spaceItem2, '_spaceItem2');
        assert.ok(this.rangeBar._mainItem, '_mainItem');

        assert.strictEqual(this.rangeBar._backItem1.parent, this.rangeBar._rootElement, '_backItem1 parent');
        assert.strictEqual(this.rangeBar._backItem2.parent, this.rangeBar._rootElement, '_backItem2 parent');
        assert.strictEqual(this.rangeBar._spaceItem1.parent, this.rangeBar._rootElement, '_spaceItem1 parent');
        assert.strictEqual(this.rangeBar._spaceItem2.parent, this.rangeBar._rootElement, '_spaceItem2 parent');
        assert.strictEqual(this.rangeBar._mainItem.parent, this.rangeBar._rootElement, '_mainItem parent');

        mainColor = mainColor || this.options.color;
        backColor = backColor || this.options.backgroundColor;
        spaceColor = spaceColor || this.options.containerBackgroundColor;

        assert.deepEqual(this.rangeBar._rootElement._stored_settings, { 'class': 'root-class', fill: mainColor }, 'root group settings');
        assert.deepEqual(this.rangeBar._backItem1._stored_settings, {
            points: vertical ? [a1, p1, a1, p2 - space, a2, p2 - space, a2, p1] : [p1, a1, p1, a2, p2 - space, a2, p2 - space, a1],
            'class': 'dxg-back-bar', fill: backColor,
            type: 'area'
        }, '_backItem1 settings');
        assert.deepEqual(this.rangeBar._backItem2._stored_settings, {
            points: vertical ? [a1, p3 + space, a1, p4, a2, p4, a2, p3 + space] : [p3 + space, a1, p3 + space, a2, p4, a2, p4, a1],
            'class': 'dxg-back-bar', fill: backColor,
            type: 'area'
        }, '_backItem2 settings');
        assert.deepEqual(this.rangeBar._spaceItem1._stored_settings, {
            points: vertical ? [a1, p2 - space, a1, p2, a2, p2, a2, p2 - space] : [p2 - space, a1, p2 - space, a2, p2, a2, p2, a1],
            'class': 'dxg-space-bar', fill: spaceColor,
            type: 'area'
        }, '_spaceItem1 settings');
        assert.deepEqual(this.rangeBar._spaceItem2._stored_settings, {
            points: vertical ? [a1, p3, a1, p3 + space, a2, p3 + space, a2, p3] : [p3, a1, p3, a2, p3 + space, a2, p3 + space, a1],
            'class': 'dxg-space-bar', fill: spaceColor,
            type: 'area'
        }, '_spaceItem2 settings');
        assert.deepEqual(this.rangeBar._mainItem._stored_settings, {
            points: vertical ? [a1, p2, a1, p3, a2, p3, a2, p2] : [p2, a1, p2, a2, p3, a2, p3, a1],
            'class': 'dxg-main-bar',
            type: 'area'
        }, '_mainItem settings');
    }

    QUnit.test('render - horizontal, top', function (assert) {
        delete this.options.text.indent;
        render(this.rangeBar, this.options);
        checkBars.call(this, assert, false, 88, 100, 300, 325, 350, 400, 3);
    });

    QUnit.test('render - horizontal, bottom', function (assert) {
        delete this.options.text.indent;
        this.options.verticalOrientation = 'bottom';
        render(this.rangeBar, this.options);
        checkBars.call(this, assert, false, 100, 112, 300, 325, 350, 400, 3);
    });

    QUnit.test('render - vertical, left', function (assert) {
        delete this.options.text.indent;
        this.options.vertical = true;
        render(this.rangeBar, this.options);
        checkBars.call(this, assert, true, 188, 200, 300, 325, 350, 400, 3);
    });

    QUnit.test('render - vertical, right', function (assert) {
        delete this.options.text.indent;
        this.options.horizontalOrientation = 'right';
        this.options.vertical = true;
        render(this.rangeBar, this.options);
        checkBars.call(this, assert, true, 200, 212, 300, 325, 350, 400, 3);
    });

    QUnit.test('render - currentValue and baseValue are reversed', function (assert) {
        delete this.options.text.indent;
        this.options.currentValue = 75;
        render(this.rangeBar, this.options);
        checkBars.call(this, assert, false, 88, 100, 300, 350, 375, 400, 3);
    });

    QUnit.test('render - horizontal, top, with text', function (assert) {
        render(this.rangeBar, this.options);

        checkBars.call(this, assert, false, 88, 100, 300, 325, 350, 400, 3);

        assert.ok(this.rangeBar._text, '_text');
        assert.strictEqual(this.rangeBar._text.parent, this.rangeBar._rootElement, '_text parent');

        assert.ok(this.rangeBar._line, '_line');
        assert.strictEqual(this.rangeBar._line.parent, this.rangeBar._rootElement, '_line parent');

        assert.deepEqual(this.rangeBar._text._stored_settings, { x: 325, y: 119, 'class': 'dxg-text', align: 'center', text: '25.0' }, '_text settings');
        assert.deepEqual(this.rangeBar._text._stored_styles, { 'font-family': 'Font', fill: 'black' }, '_text font style');

        assert.deepEqual(this.rangeBar._line._stored_settings, {
            points: [325, 100, 325, 109, 327, 109, 327, 100],
            'class': 'dxg-main-bar',
            type: 'line',
            'stroke-linecap': 'square'
        }, '_line settings');
        assert.equal(this.rangeBar._line.sharp.callCount, 1, '_line is sharped');
        assert.ok(this.rangeBar._line.sharp.lastCall.calledAfter(this.rangeBar._line.attr.lastCall), '_line is sharped');
    });

    QUnit.test('render - horizontal, bottom, with text', function (assert) {
        this.options.text.indent = -9;
        this.options.verticalOrientation = 'bottom';
        render(this.rangeBar, this.options);

        checkBars.call(this, assert, false, 100, 112, 300, 325, 350, 400, 3);

        assert.ok(this.rangeBar._text, '_text');
        assert.strictEqual(this.rangeBar._text.parent, this.rangeBar._rootElement, '_text parent');

        assert.ok(this.rangeBar._line, '_line');
        assert.strictEqual(this.rangeBar._line.parent, this.rangeBar._rootElement, '_line parent');

        assert.deepEqual(this.rangeBar._text._stored_settings, { x: 325, y: 85, 'class': 'dxg-text', align: 'center', text: '25.0' }, '_text settings');
        assert.deepEqual(this.rangeBar._text._stored_styles, { 'font-family': 'Font', fill: 'black' }, '_text font style');

        assert.deepEqual(this.rangeBar._line._stored_settings, {
            points: [325, 100, 325, 91, 327, 91, 327, 100],
            'class': 'dxg-main-bar',
            type: 'line',
            'stroke-linecap': 'square'
        }, '_line settings');
        assert.equal(this.rangeBar._line.sharp.callCount, 1, '_line is sharped');
        assert.ok(this.rangeBar._line.sharp.lastCall.calledAfter(this.rangeBar._line.attr.lastCall), '_line is sharped');
    });

    QUnit.test('render - vertical, left, with text', function (assert) {
        this.options.vertical = true;
        render(this.rangeBar, this.options);

        checkBars.call(this, assert, true, 188, 200, 300, 325, 350, 400, 3);

        assert.ok(this.rangeBar._text, '_text');
        assert.strictEqual(this.rangeBar._text.parent, this.rangeBar._rootElement, '_text parent');

        assert.ok(this.rangeBar._line, '_line');
        assert.strictEqual(this.rangeBar._line.parent, this.rangeBar._rootElement, '_line parent');

        assert.deepEqual(this.rangeBar._text._stored_settings, { x: 211, y: 327, 'class': 'dxg-text', align: 'left', text: '25.0' }, '_text settings');
        assert.deepEqual(this.rangeBar._text._stored_styles, { 'font-family': 'Font', fill: 'black' }, '_text font style');

        assert.deepEqual(this.rangeBar._line._stored_settings, {
            points: [200, 325, 200, 327, 209, 327, 209, 325],
            'class': 'dxg-main-bar',
            type: 'line',
            'stroke-linecap': 'square'
        }, '_line settings');
        assert.equal(this.rangeBar._line.sharp.callCount, 1, '_line is sharped');
        assert.ok(this.rangeBar._line.sharp.lastCall.calledAfter(this.rangeBar._line.attr.lastCall), '_line is sharped');
    });

    QUnit.test('render - vertical, right, with text', function (assert) {
        this.options.text.indent = -9;
        this.options.vertical = true;
        this.options.horizontalOrientation = 'right';
        render(this.rangeBar, this.options);

        checkBars.call(this, assert, true, 200, 212, 300, 325, 350, 400, 3);

        assert.ok(this.rangeBar._text, '_text');
        assert.strictEqual(this.rangeBar._text.parent, this.rangeBar._rootElement, '_text parent');

        assert.ok(this.rangeBar._line, '_line');
        assert.strictEqual(this.rangeBar._line.parent, this.rangeBar._rootElement, '_line parent');

        assert.deepEqual(this.rangeBar._text._stored_settings, { x: 189, y: 327, 'class': 'dxg-text', align: 'right', text: '25.0' }, '_text settings');
        assert.deepEqual(this.rangeBar._text._stored_styles, { 'font-family': 'Font', fill: 'black' }, '_text font style');

        assert.deepEqual(this.rangeBar._line._stored_settings, {
            points: [200, 325, 200, 327, 191, 327, 191, 325],
            'class': 'dxg-main-bar',
            type: 'line',
            'stroke-linecap': 'square'
        }, '_line settings');
        assert.equal(this.rangeBar._line.sharp.callCount, 1, '_line is sharped');
        assert.ok(this.rangeBar._line.sharp.lastCall.calledAfter(this.rangeBar._line.attr.lastCall), '_line is sharped');
    });

    QUnit.test('render - currentValue and baseValue are reversed, with text', function (assert) {
        this.options.currentValue = 75;
        render(this.rangeBar, this.options);

        checkBars.call(this, assert, false, 88, 100, 300, 350, 375, 400, 3);

        assert.ok(this.rangeBar._text, '_text');
        assert.strictEqual(this.rangeBar._text.parent, this.rangeBar._rootElement, '_text parent');

        assert.ok(this.rangeBar._line, '_line');
        assert.strictEqual(this.rangeBar._line.parent, this.rangeBar._rootElement, '_line parent');

        assert.deepEqual(this.rangeBar._text._stored_settings, { x: 375, y: 119, 'class': 'dxg-text', align: 'center', text: '75.0' }, '_text settings');
        assert.deepEqual(this.rangeBar._text._stored_styles, { 'font-family': 'Font', fill: 'black' }, '_text font style');

        assert.deepEqual(this.rangeBar._line._stored_settings, {
            points: [373, 100, 373, 109, 375, 109, 375, 100],
            'class': 'dxg-main-bar',
            type: 'line',
            'stroke-linecap': 'square'
        }, '_line settings');
        assert.equal(this.rangeBar._line.sharp.callCount, 1, '_line is sharped');
        assert.ok(this.rangeBar._line.sharp.lastCall.calledAfter(this.rangeBar._line.attr.lastCall), '_line is sharped');
    });

    QUnit.test('text color - taken from color', function (assert) {
        render(this.rangeBar, this.options);
        assert.strictEqual(this.rangeBar._text._stored_styles.fill, 'black');
    });

    QUnit.test('text color - taken from font', function (assert) {
        this.options.text.font.color = 'yellow';
        render(this.rangeBar, this.options);
        assert.strictEqual(this.rangeBar._text._stored_styles.fill, 'yellow');
    });

    QUnit.test('only positive space is valid - zero', function (assert) {
        this.options.space = 0;
        render(this.rangeBar, this.options);
        checkBars.call(this, assert, false, 88, 100, 300, 325, 350, 400, 0, 'black', 'white', 'none');
    });

    QUnit.test('only positive space is valid - negative', function (assert) {
        this.options.space = -2;
        render(this.rangeBar, this.options);
        checkBars.call(this, assert, false, 88, 100, 300, 325, 350, 400, 0, 'black', 'white', 'none');
    });

    QUnit.test('only positive space is valid - not a number', function (assert) {
        this.options.space = 'test';
        render(this.rangeBar, this.options);
        checkBars.call(this, assert, false, 88, 100, 300, 325, 350, 400, 0, 'black', 'white', 'none');
    });

    QUnit.test('text is visible when indent is not zero - zero', function (assert) {
        this.options.text.indent = 0;
        render(this.rangeBar, this.options);
        assert.ok(!this.rangeBar._text, '_text');
        assert.ok(!this.rangeBar._line, '_line');
    });

    QUnit.test('text is visible when indent is positive - not a number', function (assert) {
        this.options.text.indent = 'test';
        render(this.rangeBar, this.options);
        assert.ok(!this.rangeBar._text, '_text');
        assert.ok(!this.rangeBar._line, '_line');
    });

    QUnit.test('if no background then no space', function (assert) {
        this.options.backgroundColor = 'none';
        render(this.rangeBar, this.options);
        checkBars.call(this, assert, false, 88, 100, 300, 325, 350, 400, 0, 'black', 'none', 'none');
    });

    QUnit.test('not valid size (not rendered)', function (assert) {
        this.options.size = -1;
        render(this.rangeBar, this.options);
        assert.ok(!this.rangeBar._rootElement.parent);
    });

    QUnit.test('getTooltipParameters', function (assert) {
        render(this.rangeBar, this.options);
        const parameters = this.rangeBar.getTooltipParameters();
        assert.strictEqual(parameters.color, 'black', 'color');
        assert.strictEqual(parameters.value, 25, 'value');
        assert.strictEqual(parameters.offset, 0, 'offset');
        assert.roughEqual(parameters.x, 337.5, 0.01, 'x');
        assert.roughEqual(parameters.y, 94, 0.01, 'y');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/vizMocks.js","viz/gauges/linear_indicators","viz/translators/translator1d"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/vizMocks.js"), require("viz/gauges/linear_indicators"), require("viz/translators/translator1d"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=linearRangeBar.tests.js.map