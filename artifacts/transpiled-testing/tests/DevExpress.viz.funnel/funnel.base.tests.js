!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.funnel/funnel.base.tests.js"], ["jquery","./commonParts/common.js","viz/core/renderers/renderer","viz/palette","viz/themes"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.funnel/funnel.base.tests.js', ['jquery', './commonParts/common.js', 'viz/core/renderers/renderer', 'viz/palette', 'viz/themes'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const common = $__require('./commonParts/common.js');
    const createFunnel = common.createFunnel;
    const environment = common.environment;
    const stubAlgorithm = common.stubAlgorithm;
    const rendererModule = $__require('viz/core/renderers/renderer');
    const paletteModule = $__require('viz/palette');
    const themeModule = $__require('viz/themes');

    themeModule.registerTheme({
        name: 'test-theme',
        funnel: {
            item: {
                border: {
                    visible: true,
                    color: 'green'
                }
            }
        } }, 'generic.light');

    QUnit.module('Initialization', environment);

    QUnit.test('Create empty widget', function (assert) {
        const funnel = createFunnel({});

        assert.ok(funnel);
        assert.equal(rendererModule.Renderer.firstCall.args[0].cssClass, 'dxf dxf-funnel', 'rootClass prefix rootClass');
        assert.equal(this.itemsGroup().append.lastCall.args[0], this.renderer.root, 'items group added to root');
    });

    QUnit.test('Default size', function (assert) {
        $('#test-container').hide();
        const funnel = createFunnel({});

        assert.deepEqual(funnel.getSize(), { width: 400, height: 400 });
    });

    QUnit.test('Base funnel not fail when tooltip api is called', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 1 }]
        });

        funnel.getAllItems()[0].showTooltip();
        funnel.hideTooltip();

        assert.ok(funnel);
    });

    QUnit.module('DataSource processing', $.extend({}, environment, {
        beforeEach: function () {
            environment.beforeEach.call(this);
        }
    }));

    QUnit.test('Get values by valueField', function (assert) {
        createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 10 }, { value: 5 }]
        });

        assert.ok(stubAlgorithm.normalizeValues.calledOnce);
        assert.equal(stubAlgorithm.normalizeValues.lastCall.args[0][0].value, 10);
        assert.equal(stubAlgorithm.normalizeValues.lastCall.args[0][1].value, 5);
    });

    QUnit.test('Skip not valid values', function (assert) {
        createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: '10' }, { value: 0 }, { value: null }, { value: undefined }, { value: NaN }, { value: -1 }]
        });
        const args = stubAlgorithm.normalizeValues.lastCall.args[0];

        assert.equal(args.length, 3);
        assert.equal(args[0].value, 10);
        assert.equal(args[1].value, 0);
        assert.equal(args[2].value, 0);
    });

    QUnit.test('Sort dataSource by default', function (assert) {
        createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }, { value: 10 }, { value: 5 }],
            valueField: 'value'
        });

        const args = stubAlgorithm.normalizeValues.lastCall.args[0];

        assert.equal(args[0].value, 10);
        assert.equal(args[1].value, 5);
        assert.equal(args[2].value, 1);
    });

    QUnit.test('Disable sorting', function (assert) {
        createFunnel({
            algorithm: 'stub',
            sortData: false,
            dataSource: [{ value: 1 }, { value: 10 }, { value: 5 }],
            valueField: 'value'
        });

        const args = stubAlgorithm.normalizeValues.lastCall.args[0];

        assert.equal(args[0].value, 1);
        assert.equal(args[1].value, 10);
        assert.equal(args[2].value, 5);
    });

    QUnit.test('Use colors from dataSource', function (assert) {
        stubAlgorithm.normalizeValues.returns([1, 1]);
        stubAlgorithm.getFigures.returns([[1], [1]]);
        createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 10, color: 'green' }, { value: 1, color: 'red' }],
            colorField: 'color'
        });

        const items = this.items();

        assert.equal(items[0].smartAttr.lastCall.args[0].fill, 'green');
        assert.equal(items[1].smartAttr.lastCall.args[0].fill, 'red');
    });

    QUnit.test('Correct values if each value is zero', function (assert) {
        createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 0 }, { value: 0 }]
        });

        const values = stubAlgorithm.normalizeValues.lastCall.args[0].map(function (item) {
            return item.value;
        });

        assert.deepEqual(values, []);
    });

    QUnit.test('Data source with invalid value fields and items are not created, warning is fired', function (assert) {
        const spy = sinon.stub();
        createFunnel({
            algorithm: 'stub',
            valueField: 'val1',
            dataSource: [{ val: 2 }, { val: 3 }],
            onIncidentOccurred: spy
        });

        assert.ok(spy.called);
        assert.equal(spy.getCall(0).args[0].target.id, 'E2005');
        assert.equal(spy.getCall(0).args[0].target.text, 'The value field "val1" is absent in the data source or all its values are negative');
        assert.equal(spy.getCall(0).args[0].target.type, 'error');
        assert.equal(spy.getCall(0).args[0].target.widget, 'dxFunnel');
    });

    QUnit.test('Empty data source, warning shouldn\'t fire', function (assert) {
        const spy = sinon.stub();
        createFunnel({
            algorithm: 'stub',
            dataSource: [],
            onIncidentOccurred: spy
        });

        assert.ok(!spy.called);
    });

    QUnit.test('Data source with negative values', function (assert) {
        const spy = sinon.stub();
        createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: -2 }, { value: -3 }],
            onIncidentOccurred: spy
        });

        assert.ok(spy.called);
        assert.equal(spy.getCall(0).args[0].target.id, 'E2005');
        assert.equal(spy.getCall(0).args[0].target.text, 'The value field "value" is absent in the data source or all its values are negative');
    });

    QUnit.test('Pass dataItem to funnel item', function (assert) {
        stubAlgorithm.normalizeValues.returns([1]);
        stubAlgorithm.getFigures.returns([[1]]);

        const dataSource = [{ val: 1, value: 5, argument: 'One', color: 'red' }];
        const funnel = createFunnel({
            algorithm: 'stub',
            dataSource: dataSource,
            valueField: 'value',
            argumentField: 'argument',
            colorField: 'color'
        });

        funnel.option({
            valueField: 'val'
        });

        const items = funnel.getAllItems();

        assert.deepEqual(items[0].data, dataSource[0]);
    });

    QUnit.module('Drawing', $.extend({}, environment, {
        beforeEach: function () {
            environment.beforeEach.call(this);
            $('#test-container').css({
                width: 1000,
                height: 400
            });
        }
    }));

    QUnit.test('Draw Items', function (assert) {
        stubAlgorithm.normalizeValues.returns([1, 1]);
        stubAlgorithm.getFigures.returns([[0, 0, 0.5, 0, 0, 0.5, 0.5, 0.5], [0.5, 0.5, 1, 0.5, 0.5, 1, 1, 1]]);

        createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }, { value: 1 }]
        });

        const items = this.items();

        assert.equal(items.length, 2);
        assert.equal(this.itemsGroup().clear.callCount, 1);

        assert.equal(this.renderer.path.args[0][1], 'area');
        assert.deepEqual(items[0].attr.firstCall.args[0].points, [0, 0, 500, 0, 0, 200, 500, 200]);
        assert.deepEqual(items[1].attr.firstCall.args[0].points, [500, 200, 1000, 200, 500, 400, 1000, 400]);
    });

    QUnit.test('Draw Items, inverted chart', function (assert) {
        stubAlgorithm.normalizeValues.returns([1, 1]);
        stubAlgorithm.getFigures.returns([[0, 0, 0.5, 0, 0, 0.5, 0.5, 0.5], [0.5, 0.5, 1, 0.5, 0.5, 1, 1, 1]]);

        createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }, { value: 1 }],
            inverted: true
        });

        const items = this.items();

        assert.equal(items.length, 2);
        assert.equal(this.itemsGroup().clear.callCount, 1);

        assert.deepEqual(items[0].attr.firstCall.args[0].points, [0, 400, 500, 400, 0, 200, 500, 200]);
        assert.deepEqual(items[1].attr.firstCall.args[0].points, [500, 200, 1000, 200, 500, 0, 1000, 0]);
    });

    QUnit.test('Resize', function (assert) {
        stubAlgorithm.normalizeValues.returns([1, 1]);
        stubAlgorithm.getFigures.returns([[1, 1]]);

        const funnel = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }]
        });
        this.itemsGroup().clear.reset();

        funnel.option('size', { width: 900, height: 600 });

        const items = this.items();

        assert.equal(items.length, 1);
        assert.equal(this.itemsGroup().clear.callCount, 1);
        assert.deepEqual(items[0].attr.firstCall.args[0].points, [900, 600]);
    });

    QUnit.test('palette', function (assert) {
        sinon.spy(paletteModule, 'createPalette');

        stubAlgorithm.normalizeValues.returns([1, 1]);
        stubAlgorithm.getFigures.returns([[1], [1], [1]]);

        createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }, { value: 1 }, { value: 1 }],
            palette: ['green', 'red'],
            paletteExtensionMode: 'blend'
        });

        const items = this.items();

        assert.deepEqual(items[0].smartAttr.lastCall.args[0].fill, 'green');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].fill, 'red');
        assert.deepEqual(items[2].smartAttr.lastCall.args[0].fill, '#804000');

        assert.deepEqual(paletteModule.createPalette.lastCall.args[1], {
            count: 3,
            useHighlight: true,
            extensionMode: 'blend'
        }, 'useHighlight');

        // teardown
        paletteModule.createPalette.restore();
    });

    QUnit.test('Funnel fires drawn event', function (assert) {
        const drawn = sinon.spy();
        createFunnel({
            dataSource: [{ value: 1 }],
            onDrawn: drawn
        });

        assert.equal(drawn.callCount, 1);
    });

    QUnit.test('Funnel fires once drawn event if asynchronus dataSource ', function (assert) {
        const drawn = sinon.spy();
        const d = $.Deferred();

        createFunnel({
            dataSource: {
                load: function () {
                    return d;
                }
            },
            onDrawn: drawn
        });

        d.resolve([{ value: 1 }]);

        assert.equal(drawn.callCount, 2);
    });

    QUnit.module('Update options', environment);

    QUnit.test('Update styles of items', function (assert) {
        stubAlgorithm.normalizeValues.returns([1, 1]);
        stubAlgorithm.getFigures.returns([[1], [1]]);

        const funnel = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }, { value: 1 }]
        });

        funnel.option({ item: { border: { visible: true, width: 3, color: 'red' } } });

        const items = this.items();

        assert.deepEqual(items[0].smartAttr.lastCall.args[0]['stroke-width'], 3);
        assert.deepEqual(items[0].smartAttr.lastCall.args[0]['stroke'], 'red');

        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 3);
        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke'], 'red');
    });

    QUnit.test('Update value field', function (assert) {
        stubAlgorithm.normalizeValues.returns([1]);
        stubAlgorithm.getFigures.returns([[1]]);

        const funnel = createFunnel({
            algorithm: 'stub',
            dataSource: [{ val: 1, value: 5, argument: 'One', color: 'red' }],
            valueField: 'value',
            argumentField: 'argument',
            colorField: 'color'
        });

        funnel.option({
            valueField: 'val'
        });

        const items = funnel.getAllItems();

        assert.equal(items[0].value, 1);
        assert.equal(items[0].argument, 'One');
        assert.equal(items[0].color, 'red');
    });

    QUnit.test('Update argument field', function (assert) {
        stubAlgorithm.normalizeValues.returns([1]);
        stubAlgorithm.getFigures.returns([[1]]);

        const funnel = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1, argument: 'One', arg: 'Two', color: 'red' }],
            valueField: 'value',
            argumentField: 'argument',
            colorField: 'color'
        });

        funnel.option({
            argumentField: 'arg'
        });

        const items = funnel.getAllItems();

        assert.equal(items[0].value, 1);
        assert.equal(items[0].argument, 'Two');
        assert.equal(items[0].color, 'red');
    });

    QUnit.test('Update color field', function (assert) {
        stubAlgorithm.normalizeValues.returns([1]);
        stubAlgorithm.getFigures.returns([[1]]);

        const funnel = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1, argument: 'One', color1: 'red', color2: 'green' }],
            valueField: 'value',
            argumentField: 'argument',
            colorField: 'color1'
        });

        funnel.option({
            colorField: 'color2'
        });

        const items = funnel.getAllItems();

        assert.equal(items[0].data.value, 1);
        assert.equal(items[0].data.argument, 'One');
        assert.equal(items[0].color, 'green');
    });

    QUnit.test('Update inverted option', function (assert) {
        stubAlgorithm.normalizeValues.returns([1, 1]);
        stubAlgorithm.getFigures.returns([[0, 0, 0.5, 0, 0, 0.5, 0.5, 0.5], [0.5, 0.5, 1, 0.5, 0.5, 1, 1, 1]]);

        const funnel = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }, { value: 1 }],
            inverted: true
        });
        funnel.option({ inverted: false });

        const items = this.items();

        assert.equal(items.length, 2);
        assert.equal(this.itemsGroup().clear.callCount, 2);

        assert.deepEqual(items[0].attr.firstCall.args[0].points, [0, 0, 500, 0, 0, 200, 500, 200]);
        assert.deepEqual(items[1].attr.firstCall.args[0].points, [500, 200, 1000, 200, 500, 400, 1000, 400]);
    });

    QUnit.test('Update palette', function (assert) {
        sinon.spy(paletteModule, 'createPalette');

        stubAlgorithm.normalizeValues.returns([1, 1]);
        stubAlgorithm.getFigures.returns([[1], [1]]);

        const funnel = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }, { value: 1 }],
            palette: ['red', 'blue']
        });

        funnel.option({ palette: ['green', 'orange'] });

        const items = this.items();

        assert.deepEqual(items[0].smartAttr.lastCall.args[0].fill, 'green');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].fill, 'orange');
    });

    QUnit.test('Update paletteExtenstionMode', function (assert) {
        stubAlgorithm.normalizeValues.returns([1, 1, 1]);
        stubAlgorithm.getFigures.returns([[1], [1], [1]]);

        const funnel = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }, { value: 1 }, { value: 1 }],
            palette: ['green', 'red']
        });

        funnel.option({ paletteExtensionMode: 'alternate' });

        const items = this.items();

        assert.deepEqual(items[0].smartAttr.lastCall.args[0].fill, 'green');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].fill, 'red');
        assert.deepEqual(items[2].smartAttr.lastCall.args[0].fill, '#32b232');
    });

    QUnit.test('SortData option', function (assert) {
        stubAlgorithm.normalizeValues.returns([1, 1]);
        stubAlgorithm.getFigures.returns([[1], [1]]);

        const funnel = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }, { value: 10 }],
            palette: ['red', 'blue'],
            sortData: true
        });

        funnel.option({ sortData: false });

        const items = funnel.getAllItems();

        assert.equal(items[0].data.value, 1);
        assert.equal(items[1].data.value, 10);
    });

    QUnit.test('Recreate items if theme changed', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 1 }]
        });

        funnel.option({
            theme: 'test-theme'
        });

        assert.equal(this.items()[0].smartAttr.lastCall.args[0].stroke, 'green');
    });

    QUnit.module('Items', environment);

    QUnit.test('Creation', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two', color: '#234234' }]
        });
        const items = funnel.getAllItems();

        assert.equal(items[0].data.value, 10);
        assert.equal(items[0].data.argument, 'One');
        assert.equal(items[0].percent, 1);

        assert.equal(items[1].data.value, 5);
        assert.equal(items[1].data.argument, 'Two');
        assert.equal(items[1].percent, 0.5);
    });

    QUnit.test('Normal style', function (assert) {
        createFunnel({
            dataSource: [{ value: 10, argument: 'One', color: '#123123' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                }
            }
        });
        const items = this.items();

        assert.equal(items[0].smartAttr.lastCall.args[0].fill, '#123123');
        assert.deepEqual(items[0].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(items[0].smartAttr.lastCall.args[0]['stroke-width'], 2);

        assert.equal(items[1].smartAttr.lastCall.args[0].fill, '#234234');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 2);
    });

    QUnit.test('Normal style, border is not visible', function (assert) {
        createFunnel({
            dataSource: [{ value: 10, argument: 'One', color: '#123123' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: false,
                    color: '#ffffff',
                    width: 2
                }
            }
        });
        const items = this.items();

        assert.equal(items[0].smartAttr.lastCall.args[0].fill, '#123123');
        assert.deepEqual(items[0].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(items[0].smartAttr.lastCall.args[0]['stroke-width'], 0);

        assert.equal(items[1].smartAttr.lastCall.args[0].fill, '#234234');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 0);
    });

    QUnit.test('Hover style', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                },
                hoverStyle: {
                    border: {
                        visible: true,
                        color: '#123123',
                        width: 3
                    },
                    hatching: {
                        direction: 'left'
                    }
                }
            }
        });

        funnel.getAllItems()[1].hover(true);

        const items = this.items();

        assert.equal(items[1].smartAttr.lastCall.args[0].fill, '#234234');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].stroke, '#123123');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 3);
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].hatching, {
            direction: 'left',
            opacity: 0.75,
            step: 6,
            width: 2
        });
    });

    QUnit.test('Funnel does not fire drawn event on hover', function (assert) {
        const drawn = sinon.spy();
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }],
            onDrawn: drawn
        });

        drawn.reset();

        funnel.getAllItems()[0].hover(true);

        assert.equal(drawn.callCount, 0);
    });

    QUnit.test('Clear hover of item', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                },
                hoverStyle: {
                    border: {
                        visible: true,
                        color: '#123123',
                        width: 3
                    },
                    hatching: {
                        direction: 'left'
                    }
                }
            }
        });
        const item = funnel.getAllItems()[1];

        item.hover(true);
        item.hover(false);

        const items = this.items();

        assert.equal(items[1].smartAttr.lastCall.args[0].fill, '#234234');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 2);
        assert.ok(!items[1].smartAttr.lastCall.args[0].hatching);
    });

    QUnit.test('Inherit border from normal style if hoverStyle.border option is not set', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                }
            }
        });
        const item = funnel.getAllItems()[1];

        item.hover(true);

        const items = this.items();

        assert.deepEqual(items[1].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 2);
    });

    QUnit.test('Border for hoverStyle can be disabled', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                },
                hoverStyle: {
                    border: {
                        visible: false
                    }
                }
            }
        });
        const item = funnel.getAllItems()[1];

        item.hover(true);

        const items = this.items();

        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 0);
    });

    QUnit.test('hover changed event', function (assert) {
        const hoverChanged = sinon.spy();
        const funnel = createFunnel({
            dataSource: [{ value: 10 }, { value: 5 }],
            onHoverChanged: hoverChanged
        });
        const item = funnel.getAllItems()[0];

        item.hover(true);

        assert.ok(hoverChanged.calledOnce);
        assert.strictEqual(hoverChanged.lastCall.args[0].item, item);
    });

    QUnit.test('hover changed event after hover second item', function (assert) {
        const hoverChanged = sinon.spy();
        const funnel = createFunnel({
            dataSource: [{ value: 10 }, { value: 5 }, { value: 5 }],
            onHoverChanged: hoverChanged
        });
        const item = funnel.getAllItems()[0];

        item.hover(true);
        hoverChanged.reset();

        funnel.getAllItems()[1].hover(true);

        assert.equal(hoverChanged.callCount, 2);
    });

    QUnit.test('Hover item two times, hover changed event should fire only one time', function (assert) {
        const hoverChanged = sinon.spy();
        const funnel = createFunnel({
            dataSource: [{ value: 10 }, { value: 5 }, { value: 5 }],
            onHoverChanged: hoverChanged
        });
        const item = funnel.getAllItems()[0];

        item.hover(true);
        item.hover(true);

        assert.equal(hoverChanged.callCount, 1);
    });

    QUnit.test('Unhover item if it is not hovered, hover changed event shouldn\'t fire', function (assert) {
        const hoverChanged = sinon.spy();
        const funnel = createFunnel({
            dataSource: [{ value: 10 }, { value: 5 }, { value: 5 }],
            onHoverChanged: hoverChanged
        });
        const item = funnel.getAllItems()[0];

        item.hover(false);

        assert.equal(hoverChanged.callCount, 0);
    });

    QUnit.test('disable hover', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }],
            hoverEnabled: false
        });
        const items = funnel.getAllItems();

        items[0].hover(true);

        assert.ok(!items[0].isHovered());
    });

    QUnit.test('Selection', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                },
                selectionStyle: {
                    border: {
                        visible: true,
                        color: '#123123',
                        width: 3
                    }
                }
            }
        });

        funnel.getAllItems()[1].select(true);
        const items = this.items();

        assert.equal(items[1].smartAttr.lastCall.args[0].fill, '#234234');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].stroke, '#123123');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 3);
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].hatching, {
            opacity: 0.5,
            step: 6,
            width: 2,
            direction: 'right'
        });
    });

    QUnit.test('Can select an item in onDrawn enven', function (assert) {
        createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                },
                selectionStyle: {
                    border: {
                        visible: true,
                        color: '#123123',
                        width: 3
                    }
                }
            },
            onDrawn: function (e) {
                e.component.getAllItems()[1].select(true);
            }
        });

        const item = this.items()[1];

        assert.equal(item.smartAttr.lastCall.args[0].fill, '#234234');
        assert.deepEqual(item.smartAttr.lastCall.args[0].stroke, '#123123');
        assert.deepEqual(item.smartAttr.lastCall.args[0]['stroke-width'], 3);
        assert.deepEqual(item.smartAttr.lastCall.args[0].hatching, {
            opacity: 0.5,
            step: 6,
            width: 2,
            direction: 'right'
        });
    });

    QUnit.test('Inherit border for selection style if selection.border option is not set', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                }
            }
        });

        funnel.getAllItems()[1].select(true);
        const items = this.items();

        assert.deepEqual(items[1].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 2);
    });

    QUnit.test('Border for selection style can be disabled', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                },
                selectionStyle: {
                    border: {
                        visible: false
                    }
                }
            }
        });

        funnel.getAllItems()[1].select(true);
        const items = this.items();

        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 0);
    });

    QUnit.test('Single selection', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two' }]
        });

        funnel.getAllItems()[1].select(true);
        funnel.getAllItems()[0].select(true);

        assert.equal(funnel.getAllItems()[0].isSelected(), true);
        assert.equal(funnel.getAllItems()[1].isSelected(), false);
    });

    QUnit.test('Multiple selection', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two' }],
            selectionMode: 'multiple'
        });

        funnel.getAllItems()[1].select(true);
        funnel.getAllItems()[0].select(true);

        assert.equal(funnel.getAllItems()[0].isSelected(), true);
        assert.equal(funnel.getAllItems()[1].isSelected(), true);
    });

    QUnit.test('disable selection', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }],
            selectionMode: 'none'
        });

        funnel.getAllItems()[0].select(true);

        assert.equal(funnel.getAllItems()[0].isSelected(), false);
    });

    QUnit.test('selection changed event', function (assert) {
        const spy = sinon.spy();
        const funnel = createFunnel({
            dataSource: [{ value: 10 }, { value: 5 }],
            onSelectionChanged: spy
        });
        const item = funnel.getAllItems()[0];

        item.select(true);

        assert.ok(spy.calledOnce);
        assert.strictEqual(spy.lastCall.args[0].item, item);
    });

    QUnit.test('selection changed event in single mode fire only for selected element and unselected', function (assert) {
        const spy = sinon.spy();
        const funnel = createFunnel({
            dataSource: [{ value: 10 }, { value: 5 }, { value: 5 }],
            onSelectionChanged: spy,
            selectionMode: 'single'
        });
        const item = funnel.getAllItems()[0];

        item.select(true);
        spy.reset();
        funnel.getAllItems()[1].select(true);

        assert.equal(spy.callCount, 2);
    });

    QUnit.test('Select item two times, selection changed event should fire only one time', function (assert) {
        const selectChanged = sinon.spy();
        const funnel = createFunnel({
            dataSource: [{ value: 10 }, { value: 5 }, { value: 5 }],
            onSelectionChanged: selectChanged
        });
        const item = funnel.getAllItems()[0];

        item.select(true);
        item.select(true);

        assert.equal(selectChanged.callCount, 1);
    });

    QUnit.test('Unselect item if it is not selected, selection changed event shouldn\'t fire', function (assert) {
        const selectChanged = sinon.spy();
        const funnel = createFunnel({
            dataSource: [{ value: 10 }, { value: 5 }, { value: 5 }],
            onSelectionChanged: selectChanged
        });
        const item = funnel.getAllItems()[0];

        item.select(false);

        assert.equal(selectChanged.callCount, 0);
    });

    QUnit.test('Clear selection', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                },
                selectionStyle: {
                    border: {
                        visible: true,
                        color: '#123123',
                        width: 3
                    }
                }
            }
        });

        funnel.getAllItems()[1].select(true);
        funnel.getAllItems()[1].select(false);
        const items = this.items();

        assert.equal(items[1].smartAttr.lastCall.args[0].fill, '#234234');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 2);
        assert.ok(!items[1].smartAttr.lastCall.args[0].hatching);
    });

    QUnit.test('Clear selection of all elements', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One', color: '#987987' }, { value: 5, argument: 'Two', color: '#234234' }],
            item: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                },
                selectionStyle: {
                    border: {
                        visible: true,
                        color: '#123123',
                        width: 3
                    }
                }
            }
        });

        funnel.getAllItems()[0].select(true);
        funnel.getAllItems()[1].select(true);
        funnel.clearSelection();

        const items = this.items();

        assert.equal(items[0].smartAttr.lastCall.args[0].fill, '#987987');
        assert.deepEqual(items[0].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(items[0].smartAttr.lastCall.args[0]['stroke-width'], 2);
        assert.ok(!items[0].smartAttr.lastCall.args[0].hatching);

        assert.equal(items[1].smartAttr.lastCall.args[0].fill, '#234234');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0]['stroke-width'], 2);
        assert.ok(!items[1].smartAttr.lastCall.args[0].hatching);
    });

    QUnit.test('Select and hover item', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two', color: '#234234' }]
        });

        funnel.getAllItems()[1].select(true);
        funnel.getAllItems()[1].hover(true);
        const items = this.items();

        assert.equal(items[1].smartAttr.lastCall.args[0].fill, '#234234');
        assert.deepEqual(items[1].smartAttr.lastCall.args[0].hatching, {
            opacity: 0.5,
            step: 6,
            width: 2,
            direction: 'right'
        });
    });

    QUnit.test('getColor method', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One', color: '#987987' }, { value: 5, argument: 'Two', color: '#234234' }]
        });
        const items = funnel.getAllItems();

        assert.equal(items[0].getColor(), '#987987');
        assert.equal(items[1].getColor(), '#234234');
    });

    QUnit.test('isHovered method', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two' }]
        });
        const items = funnel.getAllItems();

        items[1].hover(true);

        assert.ok(items[1].isHovered());
        assert.ok(!items[0].isHovered());
    });

    QUnit.test('isSelected method', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two' }]
        });
        const items = funnel.getAllItems();

        items[1].select(true);

        assert.ok(items[1].isSelected());
        assert.ok(!items[0].isSelected());
    });

    QUnit.test('isHovered method after hover and select', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two' }]
        });
        const items = funnel.getAllItems();

        items[1].hover(true);
        items[1].select(true);

        assert.ok(items[1].isHovered());
    });

    QUnit.test('isSelected method after hover and select', function (assert) {
        const funnel = createFunnel({
            dataSource: [{ value: 10, argument: 'One' }, { value: 5, argument: 'Two' }]
        });
        const items = funnel.getAllItems();

        items[1].hover(true);
        items[1].select(true);

        assert.ok(items[1].isSelected());
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","./commonParts/common.js","viz/core/renderers/renderer","viz/palette","viz/themes"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("./commonParts/common.js"), require("viz/core/renderers/renderer"), require("viz/palette"), require("viz/themes"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=funnel.base.tests.js.map