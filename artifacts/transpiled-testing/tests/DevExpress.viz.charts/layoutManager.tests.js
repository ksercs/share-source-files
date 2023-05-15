!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/layoutManager.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/series/points/label","viz/chart_components/layout_manager","viz/core/layout_element"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.charts/layoutManager.tests.js', ['jquery', '../../helpers/vizMocks.js', 'viz/series/points/label', 'viz/chart_components/layout_manager', 'viz/core/layout_element'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const labelModule = $__require('viz/series/points/label');
    const layoutManagerModule = $__require('viz/chart_components/layout_manager');
    const layoutElementModule = $__require('viz/core/layout_element');

    const canvasTemplate = {
        width: 1000,
        height: 400,
        top: 10,
        bottom: 20,
        left: 30,
        right: 40
    };
    let canvas;
    const LayoutElement = vizMocks.stubClass(layoutElementModule.LayoutElement);

    const environment = {
        beforeEach: function () {
            this.canvas = {
                left: 0, right: 10, width: 110,
                top: 0, bottom: 10, height: 110
            };
            this.commonBBox = { height: 20, width: 20 };
        },
        afterEach: function () {},
        createLayoutManager: function (options) {
            const layoutManager = new layoutManagerModule.LayoutManager();
            layoutManager.setOptions(options || { width: 10, height: 10 });
            return layoutManager;
        },
        createLayoutElement: function (opt) {
            const options = $.extend({}, this.commonBBox, opt);
            const layoutElement = new LayoutElement(options);

            layoutElement.stub('getLayoutOptions').returns(options);
            layoutElement.stub('position').returnsThis();

            return layoutElement;
        }
    };

    function setupCanvas() {
        canvas = $.extend(true, {}, canvasTemplate);
    }
    function createLayoutManager(options) {
        const layoutManager = new layoutManagerModule.LayoutManager(options);
        layoutManager.setOptions(options || { width: 160, height: 160 });
        return layoutManager;
    }

    function getStubSeries(type, innerRadius, points) {
        const stubSeries = new vizMocks.Series();

        stubSeries.type = type;

        stubSeries.stub('getVisiblePoints').returns(points || [createFakePointsWithStubLabels({}, true, false)]);
        stubSeries.correctLabelRadius = sinon.stub();
        stubSeries.setVisibleArea = sinon.stub();
        stubSeries.innerRadius = innerRadius;
        return [stubSeries];
    }

    function getNStubSeries(type, innerRadius, arrPoints) {
        let stubSeries = [];
        for (let i = 0; i < arrPoints.length; i++) {
            stubSeries = stubSeries.concat(getStubSeries(type, innerRadius, arrPoints[i]));
        }
        return stubSeries;
    }

    function createFakePointsWithStubLabels(bBox, isVisible, hasText, options) {
        const stubLabel = sinon.createStubInstance(labelModule.Label);
        const fakePoint = {
            _label: stubLabel
        };

        stubLabel.getBoundingRect.returns(bBox || {});
        stubLabel.isVisible.returns(hasText);
        stubLabel.getLayoutOptions.returns({ position: options && options.position || 'outside' });

        return fakePoint;
    }

    function checkLayout(assert, layout, canvas, inner, outer) {
        assert.strictEqual(layout.centerX, Math.floor((canvas.width - canvas.left - canvas.right) / 2 + canvas.left), 'centerX');
        assert.strictEqual(layout.centerY, Math.floor((canvas.height - canvas.top - canvas.bottom) / 2 + canvas.top), 'centerY');
        assert.strictEqual(layout.radiusInner, inner, 'radiusInner');
        assert.strictEqual(layout.radiusOuter, outer, 'radiusOuter');
    }

    QUnit.module('Lifecycle', environment);

    QUnit.test('create layout manager', function (assert) {
        assert.ok(this.createLayoutManager() instanceof layoutManagerModule.LayoutManager);
    });

    QUnit.module('Pie series', {
        beforeEach: setupCanvas
    });

    QUnit.test('Simple pie. RadiusOuter equal height of canvas', function (assert) {
        const series = getStubSeries('pie');
        const layoutManager = createLayoutManager();
        const inner = 0;
        const outer = (canvas.height - canvas.top - canvas.bottom) / 2;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Simple pie. RadiusOuter equal width of canvas', function (assert) {
        const series = getStubSeries('pie');
        const layoutManager = createLayoutManager();
        const inner = 0;
        const outer = (canvasTemplate.height - canvas.left - canvas.right) / 2;

        canvas.width = canvasTemplate.height;
        canvas.height = canvasTemplate.width;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Simple pie - vertical canvas. width and height odd ', function (assert) {
        const series = getStubSeries('doughnut');
        const layoutManager = createLayoutManager();
        const inner = 111;
        const outer = 223;

        canvas.width = 517;
        canvas.height = 517;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Simple donut - innerRadius is not number', function (assert) {
        const series = getStubSeries('donut', 'str');
        const layoutManager = createLayoutManager();
        const inner = 82;
        const outer = 165;

        canvas.width = canvasTemplate.height;
        canvas.height = canvasTemplate.width;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Simple donut - innerRadius is valid number', function (assert) {
        const series = getStubSeries('donut', '0.7');
        const layoutManager = createLayoutManager();
        const inner = 115;
        const outer = 165;

        canvas.width = canvasTemplate.height;
        canvas.height = canvasTemplate.width;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('simple pie with diameter', function (assert) {
        const series = getStubSeries('pie');
        const layoutManager = createLayoutManager({ piePercentage: 0.4 });
        const inner = 0;
        const outer = 80;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('simple donut with diameter', function (assert) {
        const series = getStubSeries('donut');
        const layoutManager = createLayoutManager({ piePercentage: 0.4 });
        const inner = 40;
        const outer = 80;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.module('PieChart. Calculate radius charts with labels', {
        beforeEach: setupCanvas
    });

    QUnit.test('Nearest label topLeft', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points = [CFPWSL({ x: 350, y: 100, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.6 });
        const inner = 0;
        const outer = 129;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Nearest label topRight', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points = [CFPWSL({ x: 650, y: 100, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.7 });
        const inner = 0;
        const outer = 146;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Nearest label topCenter', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points = [CFPWSL({ x: 490, y: 0, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.7 });
        const inner = 0;
        const outer = 155;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Nearest label CenterLeft', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points = [CFPWSL({ x: 300, y: 190, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.7 });
        const inner = 0;
        const outer = 155;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Nearest label CenterRight', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points = [CFPWSL({ x: 650, y: 190, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.6 });
        const inner = 0;
        const outer = 125;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Nearest label BottomLeft', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points = [CFPWSL({ x: 350, y: 300, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.6 });
        const inner = 0;
        const outer = 141;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Nearest label BottomRight', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points = [CFPWSL({ x: 570, y: 350, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.6 });
        const inner = 0;
        const outer = 142;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Nearest label BottomCenter', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points = [CFPWSL({ x: 490, y: 350, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.6 });
        const inner = 0;
        const outer = 125;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Calculate of nearest label', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points = [CFPWSL({ x: 570, y: 350, width: 10, height: 10 }, true, true), CFPWSL({ x: 490, y: 350, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.6 });
        const inner = 0;
        const outer = 125;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Calculate of visible point with label with text', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points = [CFPWSL({ x: 570, y: 350, width: 10, height: 10 }, false, true), CFPWSL({ x: 490, y: 350, width: 10, height: 10 }, true, false), CFPWSL({ x: 490, y: 0, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.7 });
        const inner = 0;
        const outer = 142;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('Nearest label BottomLeft label closer then 0.7 R', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points = [CFPWSL({ x: 450, y: 190, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.7 });
        const inner = 0;
        const outer = 129;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
    });

    QUnit.test('piePercentage was not set && hideLabels was set', function (assert) {
        const points = [createFakePointsWithStubLabels({ x: 450, y: 190, width: 10, height: 10 }, true, true)];
        const series = getStubSeries('pie', null, points);
        const layoutManager = createLayoutManager({});
        const inner = 0;
        const outer = 185;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series, true), canvas, inner, outer);
    });

    QUnit.module('Multi series pie', {
        beforeEach: setupCanvas
    });

    QUnit.test('2 series, labels are fit in canvas', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points1 = [CFPWSL({ x: 400, y: 300, width: 15, height: 10 }, true, true)];
        const points2 = [CFPWSL({ x: 400, y: 300, width: 10, height: 10 }, true, true)];
        const series = getNStubSeries('pie', null, [points1, points2]);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.7 });
        const inner = 0;
        const outer = 129;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
        assert.equal(series[0].correctLabelRadius.callCount, 1);
        assert.equal(series[0].correctLabelRadius.args[0][0], 159);
        assert.equal(series[0].setVisibleArea.callCount, 1);
        assert.deepEqual(series[0].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 320,
            right: 330,
            top: 10,
            width: 1000
        });

        assert.equal(series[1].correctLabelRadius.callCount, 1);
        assert.equal(series[1].correctLabelRadius.args[0][0], 184);
        assert.equal(series[1].setVisibleArea.callCount, 1);
        assert.deepEqual(series[1].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 300,
            right: 310,
            top: 10,
            width: 1000
        });
    });

    QUnit.test('2 series, labels are not fit in canvas', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points1 = [CFPWSL({ x: 400, y: 300, width: 60, height: 10 }, true, true)];
        const points2 = [CFPWSL({ x: 400, y: 300, width: 65, height: 10 }, true, true)];
        const series = getNStubSeries('pie', null, [points1, points2]);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.7 });
        const inner = 0;
        const outer = 80;

        canvas.width = 300;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
        assert.equal(series[0].correctLabelRadius.callCount, 1);
        assert.equal(series[0].correctLabelRadius.args[0][0], 110);
        assert.equal(series[0].setVisibleArea.callCount, 1);
        assert.deepEqual(series[0].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 32,
            right: 42,
            top: 10,
            width: 300
        });

        assert.equal(series[1].correctLabelRadius.callCount, 1);
        assert.equal(series[1].correctLabelRadius.args[0][0], 112);
        assert.equal(series[1].setVisibleArea.callCount, 1);
        assert.deepEqual(series[1].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 30,
            right: 40,
            top: 10,
            width: 300
        });
    });

    QUnit.test('2 series, labels are not fit in canvas, check margins', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points1 = [CFPWSL({ x: 400, y: 300, width: 50, height: 10 }, true, true)];
        const points2 = [CFPWSL({ x: 400, y: 300, width: 40, height: 10 }, true, true)];
        const series = getNStubSeries('pie', null, [points1, points2]);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.7 });
        const inner = 0;
        const outer = 129;

        canvas.width = 569;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
        assert.equal(series[0].correctLabelRadius.callCount, 1);
        assert.equal(series[0].correctLabelRadius.args[0][0], 159);
        assert.equal(series[0].setVisibleArea.callCount, 1);
        assert.deepEqual(series[0].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 75,
            right: 85,
            top: 10,
            width: 569
        });

        assert.equal(series[1].correctLabelRadius.callCount, 1);
        assert.equal(series[1].correctLabelRadius.args[0][0], 159 + 45);
        assert.equal(series[1].setVisibleArea.callCount, 1);
        assert.deepEqual(series[1].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 30,
            right: 40,
            top: 10,
            width: 569
        });
    });

    QUnit.test('2 series, diameter is set, labels are not fit in canvas', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points1 = [CFPWSL({ x: 400, y: 300, width: 60, height: 10 }, true, true)];
        const points2 = [CFPWSL({ x: 400, y: 300, width: 65, height: 10 }, true, true)];
        const series = getNStubSeries('pie', null, [points1, points2]);
        const layoutManager = createLayoutManager({ piePercentage: 0.5 });
        const inner = 0;
        const outer = 75;

        canvas.width = 300;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
        assert.equal(series[0].correctLabelRadius.callCount, 1);
        assert.equal(series[0].correctLabelRadius.args[0][0], 105);
        assert.equal(series[0].setVisibleArea.callCount, 1);
        assert.deepEqual(series[0].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 35,
            right: 45,
            top: 10,
            width: 300
        });

        assert.equal(series[1].correctLabelRadius.callCount, 1);
        assert.equal(series[1].correctLabelRadius.args[0][0], 110);
        assert.equal(series[1].setVisibleArea.callCount, 1);
        assert.deepEqual(series[1].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 30,
            right: 40,
            top: 10,
            width: 300
        });
    });

    QUnit.test('2 series, first series has lables inside', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points1 = [CFPWSL({ x: 400, y: 300, width: 15, height: 10 }, true, true, { position: 'inside' })];
        const points2 = [CFPWSL({ x: 400, y: 300, width: 10, height: 10 }, true, true)];
        const series = getNStubSeries('pie', null, [points1, points2]);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.7 });
        const inner = 0;
        const outer = 129;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
        assert.equal(series[0].correctLabelRadius.callCount, 0);
        assert.equal(series[0].setVisibleArea.callCount, 0);

        assert.equal(series[1].correctLabelRadius.callCount, 1);
        assert.equal(series[1].correctLabelRadius.args[0][0], 159);
        assert.equal(series[1].setVisibleArea.callCount, 1);
        assert.deepEqual(series[1].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 325,
            right: 335,
            top: 10,
            width: 1000
        });
    });

    QUnit.test('3 series, labels one of the series have inside position', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points1 = [CFPWSL({ x: 400, y: 300, width: 10, height: 10 }, true, true)];
        const points2 = [CFPWSL({ x: 400, y: 300, width: 10, height: 10 }, true, true, { position: 'inside' })];
        const points3 = [CFPWSL({ x: 400, y: 300, width: 10, height: 10 }, true, true)];
        const series = getNStubSeries('pie', null, [points1, points2, points3]);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.7 });
        const inner = 0;
        const outer = 129;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
        assert.equal(series[0].correctLabelRadius.callCount, 1);
        assert.equal(series[0].correctLabelRadius.args[0][0], 159);
        assert.equal(series[0].setVisibleArea.callCount, 1);
        assert.deepEqual(series[0].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 325,
            right: 335,
            top: 10,
            width: 1000
        });

        assert.equal(series[1].correctLabelRadius.callCount, 0);
        assert.equal(series[1].setVisibleArea.callCount, 0);

        assert.equal(series[2].correctLabelRadius.callCount, 1);
        assert.equal(series[2].correctLabelRadius.args[0][0], 179);
        assert.equal(series[2].setVisibleArea.callCount, 1);
        assert.deepEqual(series[2].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 305,
            right: 315,
            top: 10,
            width: 1000
        });
    });

    QUnit.test('3 series, labels one of the series have inside position, not fit in canvas', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points1 = [CFPWSL({ x: 400, y: 300, width: 50, height: 10 }, true, true)];
        const points2 = [CFPWSL({ x: 400, y: 300, width: 30, height: 10 }, true, true, { position: 'inside' })];
        const points3 = [CFPWSL({ x: 400, y: 300, width: 50, height: 10 }, true, true)];
        const series = getNStubSeries('pie', null, [points1, points2, points3]);
        const layoutManager = createLayoutManager({ minPiePercentage: 0.7 });
        const inner = 0;
        const outer = 80;

        canvas.width = 300;

        checkLayout(assert, layoutManager.applyPieChartSeriesLayout(canvas, series), canvas, inner, outer);
        assert.equal(series[0].correctLabelRadius.callCount, 1);
        assert.equal(series[0].correctLabelRadius.args[0][0], 110);
        assert.equal(series[0].setVisibleArea.callCount, 1);
        assert.deepEqual(series[0].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 32,
            right: 42,
            top: 10,
            width: 300
        });

        assert.equal(series[1].correctLabelRadius.callCount, 0);
        assert.equal(series[1].setVisibleArea.callCount, 0);

        assert.equal(series[2].correctLabelRadius.callCount, 1);
        assert.equal(series[2].correctLabelRadius.args[0][0], 112);
        assert.equal(series[2].setVisibleArea.callCount, 1);
        assert.deepEqual(series[2].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 30,
            right: 40,
            top: 10,
            width: 300
        });
    });

    QUnit.test('correctPieLabelRadius', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points1 = [CFPWSL({ x: 400, y: 300, width: 15, height: 10 }, true, true)];
        const points2 = [CFPWSL({ x: 400, y: 300, width: 10, height: 10 }, true, true)];
        const series = getNStubSeries('pie', null, [points1, points2]);
        const layoutManager = createLayoutManager({});

        layoutManager.correctPieLabelRadius(series, { radiusOuter: 129, centerX: 500 }, canvas);

        assert.equal(series[0].correctLabelRadius.callCount, 1);
        assert.equal(series[0].correctLabelRadius.args[0][0], 159);
        assert.equal(series[0].setVisibleArea.callCount, 1);
        assert.deepEqual(series[0].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 326,
            right: 326,
            top: 10,
            width: 1000
        });

        assert.equal(series[1].correctLabelRadius.callCount, 1);
        assert.equal(series[1].correctLabelRadius.args[0][0], 184);
        assert.equal(series[1].setVisibleArea.callCount, 1);
        assert.deepEqual(series[1].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 306,
            right: 306,
            top: 10,
            width: 1000
        });
    });

    QUnit.test('correctPieLabelRadius when labels are not fit in canvas', function (assert) {
        const CFPWSL = createFakePointsWithStubLabels;
        const points1 = [CFPWSL({ x: 400, y: 300, width: 30, height: 10 }, true, true)];
        const points2 = [CFPWSL({ x: 400, y: 300, width: 35, height: 10 }, true, true)];
        const series = getNStubSeries('pie', null, [points1, points2]);
        const layoutManager = createLayoutManager({});

        canvas.width = 300;

        layoutManager.correctPieLabelRadius(series, { radiusOuter: 80, centerX: 150 }, canvas);

        assert.equal(series[0].correctLabelRadius.callCount, 1);
        assert.equal(series[0].correctLabelRadius.args[0][0], 110);
        assert.equal(series[0].setVisibleArea.callCount, 1);
        assert.deepEqual(series[0].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 35,
            right: 35,
            top: 10,
            width: 300
        });

        assert.equal(series[1].correctLabelRadius.callCount, 1);
        assert.equal(series[1].correctLabelRadius.args[0][0], 115);
        assert.equal(series[1].setVisibleArea.callCount, 1);
        assert.deepEqual(series[1].setVisibleArea.args[0][0], {
            bottom: 20,
            height: 400,
            left: 30,
            right: 30,
            top: 10,
            width: 300
        });
    });

    QUnit.module('Layout for equal pie charts', {
        beforeEach: setupCanvas
    });

    QUnit.test('Pie - inner radius is 0', function (assert) {
        const series = getStubSeries('pie');
        const layoutManager = createLayoutManager();

        assert.deepEqual(layoutManager.applyEqualPieChartLayout(series, { x: 100, y: 200, radius: 300 }), {
            centerX: 100,
            centerY: 200,
            radiusInner: 0,
            radiusOuter: 300
        });
    });

    QUnit.test('Donut - inner radius is calculated', function (assert) {
        const series = getStubSeries('donut', '0.5');
        const layoutManager = createLayoutManager();

        assert.deepEqual(layoutManager.applyEqualPieChartLayout(series, { x: 100, y: 200, radius: 300 }), {
            centerX: 100,
            centerY: 200,
            radiusInner: 150,
            radiusOuter: 300
        });
    });

    QUnit.module('check need space panes canvas');

    QUnit.test('space sufficiently', function (assert) {
        const panes = [{ canvas: { width: 200, left: 10, right: 20, height: 300, top: 30, bottom: 40 } }];
        const layoutManager = createLayoutManager();

        const updateSide = layoutManager.needMoreSpaceForPanesCanvas(panes);

        assert.equal(updateSide, false);
    });

    QUnit.test('need width space', function (assert) {
        const panes = [{ canvas: { width: 200, left: 40, right: 20, height: 300, top: 30, bottom: 40 } }];
        const layoutManager = createLayoutManager();

        const updateSide = layoutManager.needMoreSpaceForPanesCanvas(panes);

        assert.deepEqual(updateSide, {
            height: 0,
            width: 20
        });
    });

    QUnit.test('need height space', function (assert) {
        const panes = [{ canvas: { width: 200, left: 10, right: 20, height: 300, top: 130, bottom: 40 } }];
        const layoutManager = createLayoutManager();

        const updateSide = layoutManager.needMoreSpaceForPanesCanvas(panes);

        assert.deepEqual(updateSide, {
            height: 30,
            width: 0
        });
    });

    QUnit.test('need both side space', function (assert) {
        const panes = [{ canvas: { width: 200, left: 10, right: 50, height: 300, top: 130, bottom: 40 } }];
        const layoutManager = createLayoutManager();

        const updateSide = layoutManager.needMoreSpaceForPanesCanvas(panes);

        assert.deepEqual(updateSide, {
            height: 30,
            width: 20
        });
    });

    QUnit.test('for several panes', function (assert) {
        const panes = [{ canvas: { width: 200, left: 10, right: 50, height: 300, top: 130, bottom: 40 } }, { canvas: { width: 200, left: 10, right: 20, height: 300, top: 30, bottom: 40 } }];
        const layoutManager = createLayoutManager();

        const updateSide = layoutManager.needMoreSpaceForPanesCanvas(panes);

        assert.deepEqual(updateSide, {
            height: 30,
            width: 20
        });
    });

    QUnit.test('for several rotated panes', function (assert) {
        const panes = [{ canvas: { width: 200, left: 10, right: 50, height: 300, top: 130, bottom: 40 } }, { canvas: { width: 300, left: 145, right: 20, height: 300, top: 130, bottom: 40 } }];
        const layoutManager = createLayoutManager();

        const updateSide = layoutManager.needMoreSpaceForPanesCanvas(panes, true);

        assert.deepEqual(updateSide, {
            height: 30,
            width: 45
        });
    });

    QUnit.test('space with radius', function (assert) {
        const panes = [{ canvas: { width: 500, left: 110, right: 50, height: 500, top: 130, bottom: 40 } }];
        const layoutManager = createLayoutManager({ piePercentage: 0.7 });

        const updateSide = layoutManager.needMoreSpaceForPanesCanvas(panes, false);

        assert.deepEqual(updateSide, { height: 20, width: 10 });
    });

    QUnit.module('Layout legend inside', environment);

    QUnit.test('position legend, vertical, bottom', function (assert) {
        const LE = this.createLayoutElement({ position: { horizontal: 'center', vertical: 'bottom' }, cutSide: 'vertical', cutLayoutSide: 'bottom' });
        const LM = this.createLayoutManager();

        LM.layoutInsideLegend(LE, this.canvas);

        assert.deepEqual(LE.position.getCall(0).args[0], {
            of: new layoutElementModule.WrapperLayoutElement(null, { x: 0, y: 0, width: 100, height: 80 }),
            my: { horizontal: 'center', vertical: 'top' },
            at: { horizontal: 'center', vertical: 'bottom' }
        });
    });

    QUnit.test('position legend, horizontal, left', function (assert) {
        const LE = this.createLayoutElement({ position: { horizontal: 'left', vertical: 'top' }, cutSide: 'horizontal', cutLayoutSide: 'left' });
        const LM = this.createLayoutManager();

        LM.layoutInsideLegend(LE, this.canvas);

        assert.deepEqual(LE.position.getCall(0).args[0], {
            of: new layoutElementModule.WrapperLayoutElement(null, { x: 20, y: 0, width: 80, height: 100 }),
            my: { horizontal: 'right', vertical: 'top' },
            at: { horizontal: 'left', vertical: 'top' }
        });
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/series/points/label","viz/chart_components/layout_manager","viz/core/layout_element"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/series/points/label"), require("viz/chart_components/layout_manager"), require("viz/core/layout_element"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=layoutManager.tests.js.map