!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/chart.part4.tests.js"], ["jquery","./chartParts/commons.js","viz/core/utils","../../helpers/chartMocks.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.charts/chart.part4.tests.js', ['jquery', './chartParts/commons.js', 'viz/core/utils', '../../helpers/chartMocks.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const commons = $__require('./chartParts/commons.js');
    const vizUtils = $__require('viz/core/utils');
    const chartMocks = $__require('../../helpers/chartMocks.js');
    const MockSeries = chartMocks.MockSeries;
    const commonMethodsForTests = chartMocks.commonMethodsForTests;
    const categories = chartMocks.categories;

    $('<div id="chartContainer">').appendTo('#qunit-fixture');

    function checkRectCommon(assert, chart, i, x1, y1, w, h, attributes) {
        assert.equal(chart._renderer.rect.getCall(i).args[0], x1, 'x');
        assert.equal(chart._renderer.rect.getCall(i).args[1], y1, 'y');
        assert.equal(chart._renderer.rect.getCall(i).args[2], w, 'width');
        assert.equal(chart._renderer.rect.getCall(i).args[3], h, 'height');
        assert.deepEqual(chart._renderer.rect.getCall(i).returnValue.attr.firstCall.args[0], attributes, 'attributes');
    }

    function checkSegmentRectCommon(assert, chart, i, x1, y1, w, h, fill, dashStyle, stroke, strokeWidth, strokeOpacity, segments) {
        assert.equal(chart._renderer.path.getCall(i).args[0][0], x1, 'x');
        assert.equal(chart._renderer.path.getCall(i).args[0][1], y1, 'y');
        assert.equal(chart._renderer.path.getCall(i).args[0][2], w, 'width');
        assert.equal(chart._renderer.path.getCall(i).args[0][3], h, 'height');
        assert.equal(chart._renderer.path.getCall(i).args[1].top, segments.top, 'top segment');
        assert.equal(chart._renderer.path.getCall(i).args[1].left, segments.left, 'left segment');
        assert.equal(chart._renderer.path.getCall(i).args[1].right, segments.right, 'right segment');
        assert.equal(chart._renderer.path.getCall(i).args[1].bottom, segments.bottom, 'bottom segment');
        assert.equal(chart._renderer.path.getCall(i).returnValue.attr.firstCall.args[0].fill, fill, 'fill');
        assert.equal(chart._renderer.path.getCall(i).returnValue.attr.firstCall.args[0].dashStyle, dashStyle, 'dashStyle');
        assert.equal(chart._renderer.path.getCall(i).returnValue.attr.firstCall.args[0].stroke, stroke, 'stroke');
        assert.equal(chart._renderer.path.getCall(i).returnValue.attr.firstCall.args[0]['stroke-width'], strokeWidth, 'strokeWidth');
        assert.equal(chart._renderer.path.getCall(i).returnValue.attr.firstCall.args[0]['stroke-opacity'], strokeOpacity, 'strokeOpacity');
        assert.equal(chart._renderer.path.getCall(i).returnValue.attr.firstCall.args[0]['stroke-linecap'], 'square');
    }

    function checkAxis(assert, axes, index, name, pane, priority) {
        assert.equal(axes[index].name, name, 'Axis with index = ' + index + ' has invalid name');
        assert.equal(axes[index].pane, pane, 'Axis with index = ' + index + ' has invalid pane');
        assert.equal(axes[index].priority, priority, 'Axis with index = ' + index + ' has invalid priority');
    }

    const assertRange = commonMethodsForTests.assertRange;

    QUnit.module('Panes border. Rotated', commons.environment);

    QUnit.test('Panes border, default attributes', function (assert) {
        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            rotated: true,
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            commonPaneSettings: {
                border: { visible: true }
            }
        });

        assert.ok(chart.panes);
        assert.equal(chart.panes.length, 1);
        assert.equal(chart._renderer.path.callCount, 1);

        checkSegmentRectCommon(assert, chart, 0, 80, 10, 630, 710, 'none', 'solid', undefined, undefined, undefined, { top: true, bottom: true, left: true, right: true });
    });

    QUnit.test('Create border, custom attributes', function (assert) {
        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            rotated: true,
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            commonPaneSettings: {
                border: {
                    visible: true,
                    dashStyle: 'dash'
                }
            }
        });

        assert.ok(chart.panes);
        assert.equal(chart.panes.length, 1);
        assert.equal(chart._renderer.path.callCount, 1);

        checkSegmentRectCommon(assert, chart, 0, 80, 10, 630, 710, 'none', 'dash', undefined, undefined, undefined, { top: true, bottom: true, left: true, right: true });
    });

    QUnit.test('Create border, bottom = false', function (assert) {
        const chart = this.createChart({
            rotated: true,
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            commonPaneSettings: {
                border: {
                    visible: true,
                    bottom: false
                }
            }
        });

        assert.ok(chart.panes);
        assert.equal(chart.panes.length, 1);
        assert.equal(chart._renderer.path.callCount, 1);
        checkSegmentRectCommon(assert, chart, 0, 80, 10, 630, 710, 'none', 'solid', undefined, undefined, undefined, { top: true, bottom: false, left: true, right: true });
    });

    QUnit.test('Create two borders, with different attributes', function (assert) {
        const chart = this.createChart({
            rotated: true,
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            commonPaneSettings: {
                defaultPane: 'topPane',
                border: {
                    visible: true,
                    width: 10,
                    color: 'red'
                }
            },
            panes: [{
                name: 'topPane',
                border: {
                    color: 'green',
                    width: 5,
                    opacity: 0.4
                }
            }, {
                name: 'bottomPane',
                border: {
                    color: 'blue',
                    width: 7,
                    opacity: 0.1
                }
            }]
        });

        assert.ok(chart.panes);
        assert.equal(chart.panes.length, 2);
        assert.equal(chart._renderer.path.callCount, 2);

        checkSegmentRectCommon(assert, chart, 0, 400, 10, 310, 710, 'none', 'solid', 'blue', 7, 0.1, { top: true, bottom: true, left: true, right: true });
        checkSegmentRectCommon(assert, chart, 1, 80, 10, 310, 710, 'none', 'solid', 'green', 5, 0.4, { top: true, bottom: true, left: true, right: true });
    });

    QUnit.test('Check pass correct borderOptions to axes', function (assert) {
        const stubSeries = new MockSeries();
        const topPaneExpectedBorder = {
            visible: true,
            top: true,
            bottom: true,
            left: false,
            right: false,
            dashStyle: 'solid'
        };
        const bottomPaneExpectedBorder = {
            visible: true,
            top: false,
            bottom: false,
            left: true,
            right: true,
            dashStyle: 'solid'
        };
        chartMocks.seriesMockData.series.push(stubSeries);

        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            panes: [{
                name: 'topPane',
                border: {
                    visible: true,
                    right: false,
                    left: false
                }
            }, {
                name: 'bottomPane',
                border: {
                    visible: true,
                    top: false,
                    bottom: false
                }
            }]
        });
        const draw = function (_, borderOptions) {
            this.borderOptions = borderOptions;
        };
        chart._argumentAxes[0].draw = draw;
        chart._argumentAxes[1].draw = draw;
        chart._valueAxes[0].draw = draw;
        chart._valueAxes[1].draw = draw;
        // Act

        chart._doRender({ force: true });
        // Assert
        assert.ok(chart.panes);
        assert.equal(chart.panes.length, 2);
        assert.equal(chart._argumentAxes.length, 2);
        assert.equal(chart._valueAxes.length, 2);

        assert.equal(chart._argumentAxes[0].pane, 'topPane');
        assert.deepEqual(chart._argumentAxes[0].borderOptions, topPaneExpectedBorder);
        assert.equal(chart._argumentAxes[1].pane, 'bottomPane');
        assert.deepEqual(chart._argumentAxes[1].borderOptions, bottomPaneExpectedBorder);

        assert.equal(chart._valueAxes[1].pane, 'bottomPane');
        assert.deepEqual(chart._valueAxes[1].borderOptions, bottomPaneExpectedBorder);
        assert.equal(chart._valueAxes[0].pane, 'topPane');
        assert.deepEqual(chart._valueAxes[0].borderOptions, topPaneExpectedBorder);
    });

    QUnit.module('ClipRects', commons.environment);

    QUnit.test('Create clipRects', function (assert) {
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 }
        });

        assert.equal(chart._renderer.clipRect.callCount, 3);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        checkRectCommon(assert, chart, 0, undefined, undefined, undefined, undefined, {
            fill: 'gray',
            opacity: 0.0001
        });

        assert.deepEqual(chart._backgroundRect._stored_settings.x, 80);
        assert.deepEqual(chart._backgroundRect._stored_settings.y, 10);
        assert.deepEqual(chart._backgroundRect._stored_settings.width, 800 - 80 - 90);
        assert.deepEqual(chart._backgroundRect._stored_settings.height, 800 - 10 - 80);

        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 80);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 10);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], 800 - 80 - 90);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], 800 - 10 - 80);
        assert.equal(chart._panesClipRects.fixed.length, 1);
        assert.equal(chart._panesClipRects.fixed[0], chart._renderer.clipRect.getCall(1).returnValue);
        // TODO
        assert.ok(!chart._panesClipRects.fixed[0].stub('attr').called);

        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 80);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 10);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], 800 - 80 - 90);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], 800 - 10 - 80);
        assert.equal(chart._panesClipRects.base.length, 1);
        assert.equal(chart._panesClipRects.base[0], chart._renderer.clipRect.getCall(2).returnValue);
        // TODO
        assert.ok(!chart._panesClipRects.base[0].stub('attr').called);
    });

    QUnit.test('Create negative width and height clipRects', function (assert) {
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 500, right: 400, top: 600, bottom: 300 }
        });

        assert.equal(chart._renderer.clipRect.callCount, 1);

        assert.ok(chart._canvasClipRect);

        assert.strictEqual(chart._canvasClipRect.stub('attr').lastCall, null);
    });

    QUnit.test('Create clipRects. With financial series', function (assert) {
        const rect = {
            width: 780,
            height: 780,
            left: 60,
            right: 70,
            top: 20,
            bottom: 70,
            originalLeft: 60,
            originalRight: 70,
            originalTop: 20,
            originalBottom: 70
        };

        vizUtils.updatePanesCanvases.restore();
        sinon.stub(vizUtils, 'updatePanesCanvases').callsFake(function (panes) {
            panes[0].canvas = rect;
        });
        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: { type: 'stock' }
        });

        assert.equal(chart._renderer.clipRect.callCount, 4);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        // fixed clip rect
        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], 780 - 10 - 80);
        assert.equal(chart._panesClipRects.fixed.length, 1);
        assert.equal(chart._panesClipRects.fixed[0], chart._renderer.clipRect.getCall(1).returnValue);
        assert.ok(!chart._panesClipRects.fixed[0].stub('attr').called);

        // pane clip rect
        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], 780 - 10 - 80);
        assert.equal(chart._panesClipRects.base.length, 1);
        assert.equal(chart._panesClipRects.base[0], chart._renderer.clipRect.getCall(2).returnValue);
        assert.ok(!chart._panesClipRects.base[0].stub('attr').called);

        // financial clip rect
        assert.equal(chart._renderer.clipRect.getCall(3).args[0], 0);
        assert.equal(chart._renderer.clipRect.getCall(3).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(3).args[2], 800);
        assert.equal(chart._renderer.clipRect.getCall(3).args[3], 780 - 20 - 70);
        assert.equal(chart._panesClipRects.wide.length, 1);
        assert.equal(chart._panesClipRects.wide[0], chart._renderer.clipRect.getCall(3).returnValue);
        assert.ok(!chart._panesClipRects.wide[0].stub('attr').called);
    });

    QUnit.test('Create clipRects. With series with errorBars', function (assert) {
        const rect = {
            width: 780,
            height: 780,
            left: 60,
            right: 70,
            top: 20,
            bottom: 70,
            originalLeft: 60,
            originalRight: 70,
            originalTop: 20,
            originalBottom: 70
        };

        vizUtils.updatePanesCanvases.restore();
        sinon.stub(vizUtils, 'updatePanesCanvases').callsFake(function (panes) {
            panes[0].canvas = rect;
        });
        const stubSeries = new MockSeries({
            showInLegend: true,
            visible: true,
            errorBars: {
                visible: true
            }
        });
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: {
                type: 'line',
                errorBars: {
                    visible: true
                }
            }
        });
        assert.equal(chart._renderer.clipRect.callCount, 4);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        // fixed clip rect
        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], 780 - 10 - 80);
        assert.equal(chart._panesClipRects.fixed.length, 1);
        assert.equal(chart._panesClipRects.fixed[0], chart._renderer.clipRect.getCall(1).returnValue);
        assert.ok(!chart._panesClipRects.fixed[0].stub('attr').called);

        // pane clip rect
        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], 780 - 10 - 80);
        assert.equal(chart._panesClipRects.base.length, 1);
        assert.equal(chart._panesClipRects.base[0], chart._renderer.clipRect.getCall(2).returnValue);
        assert.ok(!chart._panesClipRects.base[0].stub('attr').called);

        // wide clip rect
        assert.equal(chart._renderer.clipRect.getCall(3).args[0], 0);
        assert.equal(chart._renderer.clipRect.getCall(3).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(3).args[2], 800);
        assert.equal(chart._renderer.clipRect.getCall(3).args[3], 780 - 20 - 70);
        assert.equal(chart._panesClipRects.wide.length, 1);
        assert.equal(chart._panesClipRects.wide[0], chart._renderer.clipRect.getCall(3).returnValue);
        assert.ok(!chart._panesClipRects.wide[0].stub('attr').called);
    });

    QUnit.test('Create clipRects. With financial series. Rotated', function (assert) {
        const rect = {
            width: 780,
            height: 780,
            left: 60,
            right: 70,
            top: 20,
            bottom: 70,
            originalLeft: 60,
            originalRight: 70,
            originalTop: 20,
            originalBottom: 70
        };
        vizUtils.updatePanesCanvases.restore();
        sinon.stub(vizUtils, 'updatePanesCanvases').callsFake(function (panes) {
            panes[0].canvas = rect;
        });
        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            rotated: true,
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: { type: 'candlestick' }
        });

        assert.equal(chart._renderer.clipRect.callCount, 4);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        // fixed clip rect
        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], 780 - 10 - 80);
        assert.equal(chart._panesClipRects.fixed.length, 1);
        assert.equal(chart._panesClipRects.fixed[0], chart._renderer.clipRect.getCall(1).returnValue);
        assert.ok(!chart._panesClipRects.fixed[0].stub('attr').called);

        // pane clip rect
        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], 780 - 10 - 80);
        assert.equal(chart._panesClipRects.base.length, 1);
        assert.equal(chart._panesClipRects.base[0], chart._renderer.clipRect.getCall(2).returnValue);
        assert.ok(!chart._panesClipRects.base[0].stub('attr').called);

        // financial clip rect
        assert.equal(chart._renderer.clipRect.getCall(3).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(3).args[1], 0);
        assert.equal(chart._renderer.clipRect.getCall(3).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(3).args[3], 800);
        assert.equal(chart._panesClipRects.wide.length, 1);
        assert.equal(chart._panesClipRects.wide[0], chart._renderer.clipRect.getCall(3).returnValue);
        assert.ok(!chart._panesClipRects.wide[0].stub('attr').called);
    });

    QUnit.test('Create clipRects. With financial series. Two panes', function (assert) {
        const rect = {
            width: 780,
            height: 780,
            left: 60,
            right: 70,
            top: 20,
            bottom: 70,
            originalLeft: 60,
            originalRight: 70,
            originalTop: 20,
            originalBottom: 70
        };
        vizUtils.updatePanesCanvases.restore();
        sinon.stub(vizUtils, 'updatePanesCanvases').callsFake(function (panes) {
            panes[0].canvas = rect;
            panes[1].canvas = rect;
        });
        const stubSeries1 = new MockSeries();
        const stubSeries2 = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries1, stubSeries2);
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: [{ type: 'candlestick', pane: 'first' }, { type: 'stock', pane: 'second' }],
            panes: [{ name: 'first' }, { name: 'second' }]
        });

        assert.equal(chart._renderer.clipRect.callCount, 7);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        // fixed clip rect for first pane
        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], (780 - 20 - 70 - 10) / 2);
        assert.equal(chart._panesClipRects.fixed[0], chart._renderer.clipRect.getCall(1).returnValue);

        // pane clip rect for first pane
        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], (780 - 20 - 70 - 10) / 2);
        assert.equal(chart._panesClipRects.base[0], chart._renderer.clipRect.getCall(2).returnValue);

        // financial clip rect for first pane
        assert.equal(chart._renderer.clipRect.getCall(3).args[0], 0);
        assert.equal(chart._renderer.clipRect.getCall(3).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(3).args[2], 800);
        assert.equal(chart._renderer.clipRect.getCall(3).args[3], (780 - 20 - 70 - 10) / 2);
        assert.equal(chart._panesClipRects.wide[0], chart._renderer.clipRect.getCall(3).returnValue);

        // fixed clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(4).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(4).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(4).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(4).args[3], (780 - 20 - 70 - 10) / 2);
        assert.equal(chart._panesClipRects.fixed[1], chart._renderer.clipRect.getCall(4).returnValue);

        // pane clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(5).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(5).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(5).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(5).args[3], (780 - 20 - 70 - 10) / 2);
        assert.equal(chart._panesClipRects.base[1], chart._renderer.clipRect.getCall(5).returnValue);

        // financial clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(6).args[0], 0);
        assert.equal(chart._renderer.clipRect.getCall(6).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(6).args[2], 800);
        assert.equal(chart._renderer.clipRect.getCall(6).args[3], (780 - 20 - 70 - 10) / 2);
        assert.equal(chart._panesClipRects.wide[1], chart._renderer.clipRect.getCall(6).returnValue);

        assert.equal(chart._panesClipRects.fixed.length, 2);
        assert.equal(chart._panesClipRects.base.length, 2);
        assert.equal(chart._panesClipRects.wide.length, 2);
    });

    QUnit.test('Create clipRects. With financial series. For second panes', function (assert) {
        const rect = {
            width: 780,
            height: 780,
            left: 60,
            right: 70,
            top: 20,
            bottom: 70,
            originalLeft: 60,
            originalRight: 70,
            originalTop: 20,
            originalBottom: 70
        };
        vizUtils.updatePanesCanvases.restore();
        sinon.stub(vizUtils, 'updatePanesCanvases').callsFake(function (panes) {
            panes[0].canvas = rect;
            panes[1].canvas = rect;
        });
        const stubSeries1 = new MockSeries();
        const stubSeries2 = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries1, stubSeries2);
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: [{ type: 'line', pane: 'first' }, { type: 'stock', pane: 'second' }],
            panes: [{ name: 'first' }, { name: 'second' }]
        });

        assert.equal(chart._renderer.clipRect.callCount, 6);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        // fixed clip rect for first pane
        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], (780 - 20 - 70 - 10) / 2);
        assert.equal(chart._panesClipRects.fixed[0], chart._renderer.clipRect.getCall(1).returnValue);

        // pane clip rect for first pane
        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], (780 - 20 - 70 - 10) / 2);
        assert.equal(chart._panesClipRects.base[0], chart._renderer.clipRect.getCall(2).returnValue);

        // fixed clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(3).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(3).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(3).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(3).args[3], (780 - 20 - 70 - 10) / 2);
        assert.equal(chart._panesClipRects.fixed[1], chart._renderer.clipRect.getCall(3).returnValue);

        // pane clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(4).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(4).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(4).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(4).args[3], (780 - 20 - 70 - 10) / 2);
        assert.equal(chart._panesClipRects.base[1], chart._renderer.clipRect.getCall(4).returnValue);

        // financial clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(5).args[0], 0);
        assert.equal(chart._renderer.clipRect.getCall(5).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(5).args[2], 800);
        assert.equal(chart._renderer.clipRect.getCall(5).args[3], (780 - 20 - 70 - 10) / 2);
        assert.equal(chart._panesClipRects.wide[1], chart._renderer.clipRect.getCall(5).returnValue);

        assert.equal(chart._panesClipRects.fixed.length, 2);
        assert.equal(chart._panesClipRects.base.length, 2);
        assert.equal(chart._panesClipRects.wide.length, 2);
        assert.strictEqual(chart._panesClipRects.wide[0], null, 'Financial clip rect for first pane should be null');
    });

    QUnit.test('T505068. Wide clip rect array length is not growing after update dataSource', function (assert) {
        const stubSeries1 = new MockSeries();
        const stubSeries2 = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries1, stubSeries2);

        const chart = this.createChart({
            series: [{ type: 'line' }]
        });

        chart.option('dataSource', []);

        assert.strictEqual(chart._panesClipRects.wide[0], null);
        assert.strictEqual(chart._panesClipRects.wide.length, 1);
    });

    QUnit.test('Create clipRects. With financial series. Two panes. Rotated', function (assert) {
        const rect = {
            width: 780,
            height: 780,
            left: 60,
            right: 70,
            top: 20,
            bottom: 70,
            originalLeft: 60,
            originalRight: 70,
            originalTop: 20,
            originalBottom: 70
        };
        vizUtils.updatePanesCanvases.restore();
        sinon.stub(vizUtils, 'updatePanesCanvases').callsFake(function (panes) {
            panes[0].canvas = rect;
            panes[1].canvas = rect;
        });
        const stubSeries1 = new MockSeries();
        const stubSeries2 = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries1, stubSeries2);
        const chart = this.createChart({
            rotated: true,
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: [{ type: 'candlestick', pane: 'first' }, { type: 'stock', pane: 'second' }],
            panes: [{ name: 'first' }, { name: 'second' }]
        });

        assert.equal(chart._renderer.clipRect.callCount, 7);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        // fixed clip rect for first pane
        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], (780 - 60 - 70 - 10) / 2);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], 780 - 20 - 70);
        assert.equal(chart._panesClipRects.fixed[0], chart._renderer.clipRect.getCall(1).returnValue);

        // pane clip rect for first pane
        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], (780 - 60 - 70 - 10) / 2);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], 780 - 20 - 70);
        assert.equal(chart._panesClipRects.base[0], chart._renderer.clipRect.getCall(2).returnValue);

        // financial clip rect for first pane
        assert.equal(chart._renderer.clipRect.getCall(3).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(3).args[1], 0);
        assert.equal(chart._renderer.clipRect.getCall(3).args[2], (780 - 60 - 70 - 10) / 2);
        assert.equal(chart._renderer.clipRect.getCall(3).args[3], 800);
        assert.equal(chart._panesClipRects.wide[0], chart._renderer.clipRect.getCall(3).returnValue);

        // fixed clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(4).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(4).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(4).args[2], (780 - 60 - 70 - 10) / 2);
        assert.equal(chart._renderer.clipRect.getCall(4).args[3], 780 - 20 - 70);
        assert.equal(chart._panesClipRects.fixed[1], chart._renderer.clipRect.getCall(4).returnValue);

        // pane clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(5).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(5).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(5).args[2], (780 - 60 - 70 - 10) / 2);
        assert.equal(chart._renderer.clipRect.getCall(5).args[3], 780 - 20 - 70);
        assert.equal(chart._panesClipRects.base[1], chart._renderer.clipRect.getCall(5).returnValue);

        // financial clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(6).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(6).args[1], 0);
        assert.equal(chart._renderer.clipRect.getCall(6).args[2], (780 - 60 - 70 - 10) / 2);
        assert.equal(chart._renderer.clipRect.getCall(6).args[3], 800);
        assert.equal(chart._panesClipRects.wide[1], chart._renderer.clipRect.getCall(6).returnValue);

        assert.equal(chart._panesClipRects.fixed.length, 2);
        assert.equal(chart._panesClipRects.base.length, 2);
        assert.equal(chart._panesClipRects.wide.length, 2);
    });

    QUnit.test('Create clipRects. With financial series. For second panes. Rotated', function (assert) {
        const rect = {
            width: 780,
            height: 780,
            left: 60,
            right: 70,
            top: 20,
            bottom: 70,
            originalLeft: 60,
            originalRight: 70,
            originalTop: 20,
            originalBottom: 70
        };
        vizUtils.updatePanesCanvases.restore();
        sinon.stub(vizUtils, 'updatePanesCanvases').callsFake(function (panes) {
            panes[0].canvas = rect;
            panes[1].canvas = rect;
        });
        const stubSeries1 = new MockSeries();
        const stubSeries2 = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries1, stubSeries2);
        const chart = this.createChart({
            rotated: true,
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: [{ type: 'candlestick', pane: 'first' }, { type: 'line', pane: 'second' }],
            panes: [{ name: 'first' }, { name: 'second' }]
        });

        assert.equal(chart._renderer.clipRect.callCount, 6);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        // fixed clip rect for first pane
        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], (780 - 60 - 70 - 10) / 2);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], 780 - 20 - 70);
        assert.equal(chart._panesClipRects.fixed[0], chart._renderer.clipRect.getCall(1).returnValue);

        // pane clip rect for first pane
        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], (780 - 60 - 70 - 10) / 2);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], 780 - 20 - 70);
        assert.equal(chart._panesClipRects.base[0], chart._renderer.clipRect.getCall(2).returnValue);

        // fixed clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(3).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(3).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(3).args[2], (780 - 60 - 70 - 10) / 2);
        assert.equal(chart._renderer.clipRect.getCall(3).args[3], 780 - 20 - 70);
        assert.equal(chart._panesClipRects.fixed[1], chart._renderer.clipRect.getCall(3).returnValue);

        // pane clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(4).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(4).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(4).args[2], (780 - 60 - 70 - 10) / 2);
        assert.equal(chart._renderer.clipRect.getCall(4).args[3], 780 - 20 - 70);
        assert.equal(chart._panesClipRects.base[1], chart._renderer.clipRect.getCall(4).returnValue);

        // financial clip rect for second pane
        assert.equal(chart._renderer.clipRect.getCall(5).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(5).args[1], 0);
        assert.equal(chart._renderer.clipRect.getCall(5).args[2], (780 - 60 - 70 - 10) / 2);
        assert.equal(chart._renderer.clipRect.getCall(5).args[3], 800);
        assert.equal(chart._panesClipRects.wide[1], chart._renderer.clipRect.getCall(5).returnValue);

        assert.equal(chart._panesClipRects.fixed.length, 2);
        assert.equal(chart._panesClipRects.base.length, 2);
        assert.equal(chart._panesClipRects.wide.length, 2);
        assert.strictEqual(chart._panesClipRects.wide[0], null, 'Financial clip rect for first pane should be null');
    });

    QUnit.test('Update clipRects', function (assert) {
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 }
        });
        chart._createClipRectsForPanes();
        assert.equal(chart._renderer.clipRect.callCount, 3);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 80);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 10);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], 800 - 80 - 90);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], 800 - 10 - 80);

        assert.equal(chart._panesClipRects.fixed.length, 1);
        assert.ok(chart._panesClipRects.fixed[0].attr.calledOnce);
        assert.equal(chart._panesClipRects.fixed[0]._stored_settings.x, 80);
        assert.equal(chart._panesClipRects.fixed[0]._stored_settings.y, 10);
        assert.equal(chart._panesClipRects.fixed[0]._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._panesClipRects.fixed[0]._stored_settings.height, 800 - 10 - 80);

        assert.equal(chart._panesClipRects.base.length, 1);
        assert.ok(chart._panesClipRects.base[0].attr.calledOnce);
        assert.equal(chart._panesClipRects.base[0]._stored_settings.x, 80);
        assert.equal(chart._panesClipRects.base[0]._stored_settings.y, 10);
        assert.equal(chart._panesClipRects.base[0]._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._panesClipRects.base[0]._stored_settings.height, 800 - 10 - 80);
    });

    QUnit.test('Update clipRects. With financial series', function (assert) {
        const rect = {
            width: 780,
            height: 780,
            left: 60,
            right: 70,
            top: 20,
            bottom: 70,
            originalLeft: 60,
            originalRight: 70,
            originalTop: 20,
            originalBottom: 70
        };
        vizUtils.updatePanesCanvases.restore();
        sinon.stub(vizUtils, 'updatePanesCanvases').callsFake(function (panes) {
            panes[0].canvas = rect;
        });

        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: { type: 'stock' }
        });

        $.each(chart._panesClipRects.base, function (i, rect) {
            delete rect.addedToRoot;
        });

        chart._createClipRectsForPanes();
        assert.equal(chart._renderer.clipRect.callCount, 4);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        // fixed clip rect
        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], 780 - 20 - 70);

        // pane clip rect
        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], 780 - 20 - 70);

        // financial clip rect
        assert.equal(chart._renderer.clipRect.getCall(3).args[0], 0);
        assert.equal(chart._renderer.clipRect.getCall(3).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(3).args[2], 800);
        assert.equal(chart._renderer.clipRect.getCall(3).args[3], 780 - 20 - 70);

        assert.equal(chart._panesClipRects.fixed.length, 1);
        assert.ok(chart._panesClipRects.fixed[0].attr.calledOnce);
        assert.equal(chart._panesClipRects.fixed[0]._stored_settings.x, 60);
        assert.equal(chart._panesClipRects.fixed[0]._stored_settings.y, 20);
        assert.equal(chart._panesClipRects.fixed[0]._stored_settings.width, 780 - 60 - 70);
        assert.equal(chart._panesClipRects.fixed[0]._stored_settings.height, 780 - 20 - 70);

        assert.equal(chart._panesClipRects.base.length, 1);
        assert.ok(chart._panesClipRects.base[0].attr.calledOnce);
        assert.equal(chart._panesClipRects.base[0]._stored_settings.x, 60);
        assert.equal(chart._panesClipRects.base[0]._stored_settings.y, 20);
        assert.equal(chart._panesClipRects.base[0]._stored_settings.width, 780 - 60 - 70);
        assert.equal(chart._panesClipRects.base[0]._stored_settings.height, 780 - 20 - 70);

        assert.equal(chart._panesClipRects.wide.length, 1);
        assert.ok(chart._panesClipRects.wide[0].attr.calledOnce);
        assert.equal(chart._panesClipRects.wide[0]._stored_settings.x, 0);
        assert.equal(chart._panesClipRects.wide[0]._stored_settings.y, 20);
        assert.equal(chart._panesClipRects.wide[0]._stored_settings.width, 800);
        assert.equal(chart._panesClipRects.wide[0]._stored_settings.height, 780 - 20 - 70);
    });

    QUnit.test('Update clipRects. After update elements & canvas', function (assert) {
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 }
        });
        const dirtyCanvas = chart.DEBUG_dirtyCanvas;

        assert.equal(chart._canvasClipRect.attr.callCount, 1);
        assert.deepEqual(chart._canvasClipRect.attr.lastCall.args, [{ x: dirtyCanvas.left, y: dirtyCanvas.top, width: dirtyCanvas.width - dirtyCanvas.left - dirtyCanvas.right, height: dirtyCanvas.height - dirtyCanvas.top - dirtyCanvas.bottom }]);
    });

    QUnit.test('Not Update clipRects and canvases. After zoomArgument', function (assert) {
        // TODO fix it
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 }
        });

        chart._canvasClipRect.attr.reset();

        chart.zoomArgument(1, 10);

        assert.ok(!chart._canvasClipRect.attr.called);
    });

    QUnit.test('Update clipRect and canvases. After force render', function (assert) {
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 }
        });

        chart._canvasClipRect.attr.reset();

        chart.render({ force: true });

        assert.ok(chart._canvasClipRect.attr.called);
    });

    QUnit.test('Update clipRects. With financial series. When start series does not contain financial series', function (assert) {
        const rect = {
            width: 780,
            height: 780,
            left: 60,
            right: 70,
            top: 20,
            bottom: 70,
            originalLeft: 60,
            originalRight: 70,
            originalTop: 20,
            originalBottom: 70
        };
        vizUtils.updatePanesCanvases.restore();
        sinon.stub(vizUtils, 'updatePanesCanvases').callsFake(function (panes) {
            panes[0].canvas = rect;
        });

        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: { type: 'stock' }
        });
        chart._panesClipRects.wide = [null];
        chart._createClipRectsForPanes();
        assert.equal(chart._renderer.clipRect.callCount, 5);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], 780 - 20 - 70);

        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], 780 - 20 - 70);

        assert.equal(chart._renderer.clipRect.getCall(3).args[0], 0);
        assert.equal(chart._renderer.clipRect.getCall(3).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(3).args[2], 800);
        assert.equal(chart._renderer.clipRect.getCall(3).args[3], 780 - 20 - 70);

        assert.equal(chart._renderer.clipRect.getCall(4).args[0], 0);
        assert.equal(chart._renderer.clipRect.getCall(4).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(4).args[2], 800);
        assert.equal(chart._renderer.clipRect.getCall(4).args[3], 780 - 20 - 70);
    });

    QUnit.test('Create clipRects with visible pane borders', function (assert) {
        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            commonPaneSettings: { border: { visible: true } }
        });

        assert.equal(chart._renderer.clipRect.callCount, 3);
        assert.equal(chart._renderer.path.callCount, 1);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 80);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 10);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], 800 - 80 - 90);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], 800 - 10 - 80);

        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 80);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 10);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], 800 - 80 - 90);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], 800 - 10 - 80);

        // TODO ???
        assert.equal(chart._renderer.path.getCall(0).args[0][0], 80);
        assert.equal(chart._renderer.path.getCall(0).args[0][1], 10);
        assert.equal(chart._renderer.path.getCall(0).args[0][2], 630);
        assert.equal(chart._renderer.path.getCall(0).args[0][3], 710);
    });

    QUnit.test('Create clipRects with visible pane borders. With financial series', function (assert) {
        const rect = {
            width: 780,
            height: 780,
            left: 60,
            right: 70,
            top: 20,
            bottom: 70,
            originalLeft: 60,
            originalRight: 70,
            originalTop: 20,
            originalBottom: 70
        };
        vizUtils.updatePanesCanvases.restore();
        sinon.stub(vizUtils, 'updatePanesCanvases').callsFake(function (panes) {
            panes[0].canvas = rect;
        });
        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: { type: 'stock' },
            commonPaneSettings: { border: { visible: true } }
        });

        assert.equal(chart._renderer.clipRect.callCount, 4);
        assert.equal(chart._renderer.path.callCount, 1);

        assert.ok(chart._canvasClipRect);
        assert.equal(chart._canvasClipRect._stored_settings.height, 800 - 10 - 80);
        assert.equal(chart._canvasClipRect._stored_settings.width, 800 - 80 - 90);
        assert.equal(chart._canvasClipRect._stored_settings.x, 80);
        assert.equal(chart._canvasClipRect._stored_settings.y, 10);

        assert.equal(chart._renderer.clipRect.getCall(1).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(1).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(1).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(1).args[3], 780 - 20 - 70);

        assert.equal(chart._renderer.clipRect.getCall(2).args[0], 60);
        assert.equal(chart._renderer.clipRect.getCall(2).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(2).args[2], 780 - 60 - 70);
        assert.equal(chart._renderer.clipRect.getCall(2).args[3], 780 - 20 - 70);

        assert.equal(chart._renderer.clipRect.getCall(3).args[0], 0);
        assert.equal(chart._renderer.clipRect.getCall(3).args[1], 20);
        assert.equal(chart._renderer.clipRect.getCall(3).args[2], 800);
        assert.equal(chart._renderer.clipRect.getCall(3).args[3], 780 - 20 - 70);

        assert.equal(chart._renderer.path.getCall(0).args[0][0], 60);
        assert.equal(chart._renderer.path.getCall(0).args[0][1], 20);
        assert.equal(chart._renderer.path.getCall(0).args[0][2], 780 - 60 - 70);
        assert.equal(chart._renderer.path.getCall(0).args[0][3], 780 - 20 - 70);
    });

    QUnit.test('Get clipRect ID for series without pane border', function (assert) {
        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: [{ type: 'line' }]
        });

        const elementsId = chart._panesClipRects.base[0].id;
        assert.equal(elementsId, chart._renderer.clipRect.getCall(2).returnValue.id);
        assert.equal(chart.series[0]['clip-path'], elementsId);
        assert.equal(chart.series[0].wideId, null);
        assert.ok(!chart.series[0].forceClipping);
    });

    QUnit.test('Get clipRect ID for series with pane border', function (assert) {
        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            commonPaneSettings: {
                border: {
                    visible: true
                }
            },
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: [{ type: 'line' }]
        });

        const elementsId = chart._panesClipRects.base[0].id;
        assert.equal(elementsId, chart._renderer.clipRect.getCall(2).returnValue.id);
        assert.equal(chart.series[0]['clip-path'], elementsId);
        assert.equal(chart.series[0].wideId, null);
        assert.ok(chart.series[0].forceClipping);
    });

    QUnit.test('Get clipRect ID for series with pane border. (one series is financial)', function (assert) {
        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        chartMocks.seriesMockData.series.push(new MockSeries());
        const chart = this.createChart({
            commonPaneSettings: {
                border: {
                    visible: true
                }
            },
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 },
            series: [{ type: 'line' }, { type: 'stock' }]
        });

        const elementsId = chart._panesClipRects.base[0].id;
        const wideId = chart._panesClipRects.wide[0].id;

        assert.equal(elementsId, chart._renderer.clipRect.getCall(2).returnValue.id);
        assert.equal(chart.series[0]['clip-path'], elementsId);
        assert.equal(chart.series[0].wideId, wideId);
        assert.ok(chart.series[0].forceClipping);

        assert.equal(wideId, chart._renderer.clipRect.getCall(3).returnValue.id);
        assert.equal(chart.series[1]['clip-path'], elementsId);
        assert.equal(chart.series[0].wideId, wideId);
        assert.ok(chart.series[1].forceClipping);
    });

    QUnit.test('Get clipRect ID of dxChart', function (assert) {
        const chart = this.createChart({
            size: { width: 800, height: 800 },
            margin: { left: 80, right: 90, top: 10, bottom: 80 }
        });

        chart._canvasClipRect.id = 'DevExpress_1';

        const id = chart._getCanvasClipRectID();
        assert.equal(id, chart._renderer.clipRect.getCall(0).returnValue.id);
    });

    QUnit.module('applyClipRect', commons.environment);

    QUnit.test('applyClipRect', function (assert) {
        const chart = this.createChart({});
        sinon.stub(chart, '_drawPanesBorders');
        sinon.stub(chart, '_createClipRectsForPanes');
        chart._panesClipRects.fixed[0].id = 'fixed.id';
        chart._canvasClipRect.id = 'canvas.clip.id';

        const stub1 = sinon.stub(chart._argumentAxes[0], 'applyClipRects');
        const stub2 = sinon.stub(chart._valueAxes[0], 'applyClipRects');

        chart._applyClipRects({});

        assert.equal(chart._argumentAxes.length, 1);
        assert.equal(chart._valueAxes.length, 1);

        assert.equal(stub1.firstCall.args[0], 'fixed.id');
        assert.equal(stub1.firstCall.args[1], 'canvas.clip.id');

        assert.equal(stub2.firstCall.args[0], 'fixed.id');
        assert.equal(stub2.firstCall.args[1], 'canvas.clip.id');
    });

    QUnit.module('MultiAxis', commons.environment);

    QUnit.test('Two axis with duplicate name', function (assert) {
        const chart = this.createChart({
            valueAxis: [{ name: 'axisName' }, { name: 'axisName' }]
        });

        assert.ok(chart._valueAxes);
        assert.equal(chart._valueAxes.length, 1);
    });

    QUnit.test('Three axis with duplicate name', function (assert) {
        const chart = this.createChart({
            valueAxis: [{
                name: 'axisName',
                pane: 'top'
            }, {
                name: 'axisName',
                pane: 'bottom'
            }, {
                name: 'axis',
                pane: 'bottom'
            }],
            panes: [{ name: 'top' }, { name: 'bottom' }]
        });

        assert.ok(chart._valueAxes);
        assert.equal(chart._valueAxes.length, 2);
    });

    QUnit.test('Three axis without names', function (assert) {
        let message = null;
        const chart = this.createChart({
            valueAxis: [{}, {}, {}],

            incidentOccurred: function (arg) {
                message = arg;
            }
        });

        assert.ok(chart._valueAxes);
        assert.equal(chart._valueAxes.length, 3);
        assert.equal(message, undefined);
    });

    QUnit.test('dxChart with two value axis check default names', function (assert) {
        // act
        const chart = this.createChart({
            valueAxis: [{}, {}]
        });

        // assert
        assert.ok(chart._valueAxes);
        const verticalAxes = chart._valueAxes;

        assert.equal(verticalAxes.length, 2, 'chart must have two value axis');
        assert.equal(verticalAxes[0].getOptions().name, 'defaultAxisName0');
        assert.equal(verticalAxes[1].getOptions().name, 'defaultAxisName1');
    });

    QUnit.test('Show all axis grid for not synchronizeMultiAxes', function (assert) {
        // act
        const chart = this.createChart({
            synchronizeMultiAxes: false,
            valueAxis: [{
                grid: {
                    visible: true
                },
                minorGrid: {
                    visible: true
                }
            }, {
                grid: {
                    visible: true
                },
                minorGrid: {
                    visible: true
                }
            }]
        });

        // assert
        assert.ok(chart._valueAxes);
        const verticalAxes = chart._valueAxes;

        assert.equal(verticalAxes.length, 2, 'chart must have two value axis');
        assert.equal(verticalAxes[0].getOptions().grid.visible, true, 'first axis grid visible');
        assert.equal(verticalAxes[1].getOptions().grid.visible, true, 'second axis grid was not killed');

        assert.equal(verticalAxes[0].getOptions().minorGrid.visible, true, 'first axis grid visible');
        assert.equal(verticalAxes[1].getOptions().minorGrid.visible, true, 'second axis grid was not killed');
    });

    QUnit.test('dxChart with two Series on one pane and different value axis', function (assert) {
        // arrange
        const stubSeries1 = new MockSeries({});
        const stubSeries2 = new MockSeries({});
        chartMocks.seriesMockData.series.push(stubSeries1);
        chartMocks.seriesMockData.series.push(stubSeries2);
        // act
        const chart = this.createChart({
            argumentAxis: {
                categories: categories
            },
            panes: [{
                name: 'pane1'
            }],
            series: [{
                pane: 'pane1',
                type: 'line'
            }, {
                pane: 'pane1',
                type: 'line'
            }],
            valueAxis: [{
                pane: 'pane1',
                maxPadding: 0.3,
                grid: {
                    visible: true
                }
            }, {
                pane: 'pane1',
                maxPadding: 0.3,
                min: 0,
                max: 30,
                grid: {
                    visible: true
                }
            }]
        });
        // assert
        assert.ok(chart.series);
        assert.equal(chart.series.length, 2);
        assert.equal(chart.series[0], stubSeries1);
        assert.equal(chart.series[1], stubSeries2);
        assert.equal(chart.series[0].pane, 'pane1', 'First series pane (explicit)');
        assert.equal(chart.series[1].pane, 'pane1', 'First series pane (implicit, from default)');
        const chartSeries = chart.series;

        assert.deepEqual(this.validateData.lastCall.args[1].groups[0].series, [chartSeries[0], chartSeries[1]]);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[1].series, []);
    });

    QUnit.test('dxChart with two Series on one pane and different value axis check Ranges', function (assert) {
        // arrange
        const stubSeries1 = new MockSeries({});
        const stubSeries2 = new MockSeries({});
        chartMocks.seriesMockData.series.push(stubSeries1);
        chartMocks.seriesMockData.series.push(stubSeries2);
        // act
        const chart = this.createChart({

            argumentAxis: {
                categories: categories
            },
            panes: [{
                name: 'pane1'
            }],
            series: [{
                pane: 'pane1',
                axis: 'axis2',
                type: 'line'
            }, {
                pane: 'pane1',
                axis: 'axis1',
                type: 'line'
            }],
            valueAxis: [{
                name: 'axis2',
                pane: 'pane1',
                maxPadding: 0.3,
                grid: {
                    visible: true
                }
            }, {
                name: 'axis1',
                pane: 'pane1',
                maxPadding: 0.3,
                min: 0,
                max: 30,
                grid: {
                    visible: true
                }
            }]
        });
        // assert
        assert.equal(chart._valueAxes.length, 2);
        const range1 = chart._valueAxes[0].setBusinessRange.lastCall.args[0];
        assert.equal(range1.pane, 'pane1');
        assert.equal(range1.axis, 'axis2');
        const range2 = chart._valueAxes[1].setBusinessRange.lastCall.args[0];
        assert.equal(range2.pane, 'pane1');
        assert.equal(range2.axis, 'axis1');
        const chartSeries = chart.series;

        assert.deepEqual(this.validateData.lastCall.args[1].groups[0].series, [chartSeries[0]]);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[1].series, [chartSeries[1]]);
    });

    QUnit.test('Two ranges for two series with two value axis on single pane', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 0,
                    max: 10
                }
            }
        }));
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 101,
                    max: 151
                }
            }
        }));
        // act
        const chart = this.createChart({
            dataSource: [{ x: 'one', y: 1 }],
            series: [{
                // doesn't matter as range goes from predefined series above
                pane: 'pane1',
                axis: 'axis1',
                type: 'line'
            }, {
                // doesn't matter as range goes from predefined series above
                pane: 'pane1',
                axis: 'axis2',
                type: 'line'
            }],
            valueAxis: [{
                name: 'axis1',
                minValueMargin: 0,
                maxValueMargin: 0,
                mockRange: {
                    minValueMargin: 0,
                    maxValueMargin: 0,
                    minValueMarginPriority: 50,
                    maxValueMarginPriority: 50
                },
                valueType: 'numeric',
                categories: [1, 2, 3],
                type: 'discrete'
            }, {
                name: 'axis2',
                minValueMargin: 0,
                maxValueMargin: 0,
                mockRange: {
                    minValueMargin: 0,
                    maxValueMargin: 0,
                    minValueMarginPriority: 50,
                    maxValueMarginPriority: 50
                },
                valueType: 'datetime',
                categories: ['a', 'b', 'c'],
                type: 'continuous'
            }],
            panes: [{
                name: 'pane1',
                position: 'top'
            }]

        });
        // assert
        assert.equal(chart._valueAxes.length, 2);

        const range1 = chart._valueAxes[0].setBusinessRange.lastCall.args[0];
        assertRange(assert, range1, {
            pane: 'pane1',
            min: 0,
            max: 10
        });

        const range2 = chart._valueAxes[1].setBusinessRange.lastCall.args[0];
        assertRange(assert, range2, {
            pane: 'pane1',
            min: 101,
            max: 151
        });
        const chartSeries = chart.series;

        assert.deepEqual(this.validateData.lastCall.args[1].groups[0].series, [chartSeries[0]]);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[1].series, [chartSeries[1]]);
    });

    QUnit.test('Two series, two value axis, one pane (check default)', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 0,
                    max: 10
                }
            }
        }));
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 101,
                    max: 151
                }
            }
        }));
        // act
        const chart = this.createChart({
            series: [{
                axis: 'axis1',
                type: 'line'
            }, {
                type: 'line'
            }],
            valueAxis: [{
                minValueMargin: 0,
                maxValueMargin: 0,
                mockRange: {
                    minValueMargin: 0,
                    maxValueMargin: 0,
                    minValueMarginPriority: 50,
                    maxValueMarginPriority: 50
                }
            }, {
                name: 'axis1',
                minValueMargin: 0,
                maxValueMargin: 0,
                mockRange: {
                    minValueMargin: 0,
                    maxValueMargin: 0,
                    minValueMarginPriority: 50,
                    maxValueMarginPriority: 50
                }
            }]
        });
        // assert
        assert.equal(chart._valueAxes.length, 2);

        const range1 = chart._valueAxes[1].setBusinessRange.lastCall.args[0];
        assertRange(assert, range1, {
            pane: 'default',
            min: 0,
            max: 10
        });

        const range2 = chart._valueAxes[0].setBusinessRange.lastCall.args[0];
        assertRange(assert, range2, {
            pane: 'default',
            min: 101,
            max: 151
        });
        const chartSeries = chart.series;
        assert.equal(chartSeries.length, 2, 'chart have two series');
        assert.equal(chartSeries[0].axis, 'axis1', 'first series was mapped to axis1 axis');
        assert.equal(chartSeries[1].getValueAxis().name, 'defaultAxisName0', 'secons series was mapped to defaultAxisName0 axis');
        const valueAxis = chart._valueAxes;
        assert.equal(valueAxis.length, 2, 'chart have two value axes');
        assert.equal(valueAxis[0].pane, 'default');
        assert.equal(valueAxis[1].pane, 'default');
        assert.equal(valueAxis[0].name, 'defaultAxisName0');
        assert.equal(valueAxis[1].name, 'axis1');

        assert.deepEqual(this.validateData.lastCall.args[1].groups[0].series, [chartSeries[1]], 'first group');
        assert.deepEqual(this.validateData.lastCall.args[1].groups[1].series, [chartSeries[0]], 'second group');
    });

    QUnit.test('dxChart with two panes and one value axis with pointer to bottom pane. Two series on different panes and single axis', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 0,
                    max: 10
                }
            }
        }));
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 101,
                    max: 151
                }
            }
        }));
        // act
        const chart = this.createChart({
            series: [{
                pane: 'top',
                axis: 'axis1',
                type: 'line'
            }, {
                pane: 'bottom',
                axis: 'axis1',
                type: 'line'
            }],
            valueAxis: [{
                name: 'axis1',
                minValueMargin: 0,
                maxValueMargin: 0,
                mockRange: {
                    minValueMargin: 0,
                    maxValueMargin: 0,
                    minValueMarginPriority: 50,
                    maxValueMarginPriority: 50
                },
                pane: 'bottom'
            }],
            panes: [{ name: 'top' }, { name: 'bottom' }]
        });
        // assert
        assert.equal(chart._valueAxes.length, 2);

        const range1 = chart._valueAxes[1].setBusinessRange.lastCall.args[0];
        assertRange(assert, range1, {
            pane: 'top',
            min: 0,
            max: 10
        });

        const range2 = chart._valueAxes[0].setBusinessRange.lastCall.args[0];
        assertRange(assert, range2, {
            pane: 'bottom',
            min: 101,
            max: 151
        });

        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 2, 'chart must has two axis');
        assert.equal(verticalAxis[0].name, 'axis1');
        assert.equal(verticalAxis[0].pane, 'bottom');
        assert.equal(verticalAxis[1].name, 'axis1');
        assert.equal(verticalAxis[1].pane, 'top');
    });

    QUnit.test('Group Series by panes and axes. One pane, one value axis, one series', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 0,
                    max: 10
                }
            }
        }));
        // act
        const chart = this.createChart({
            series: { type: 'line' },
            valueAxis: [{
                name: 'axis1'
            }]
        });
        // assert
        const chartSeries = chart.series;
        assert.equal(chartSeries.length, 1);

        assert.deepEqual(this.validateData.lastCall.args[1].groups[0].series, [chartSeries[0]]);
    });

    QUnit.test('Group Series by panes and axes. One pane, one value axis, four series', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({}), new MockSeries({}), new MockSeries({}), new MockSeries({}));
        // act
        const chart = commons.createChartInstance({
            series: [{ type: 'line' }, { type: 'line' }, { type: 'line' }, { type: 'line' }],
            valueAxis: [{
                name: 'axis1'
            }]
        }, this.$container);
        // assert
        const chartSeries = chart.series;
        assert.equal(chartSeries.length, 4);
        assert.equal(this.validateData.lastCall.args[1].groups.length, 1);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[0].series, [chartSeries[0], chartSeries[1], chartSeries[2], chartSeries[3]]);
        assert.equal(this.validateData.lastCall.args[1].argumentAxes, chart._argumentAxes);
        assert.equal(this.validateData.lastCall.args[1].groups[0].valueAxis, chart._valueAxes[0]);
        assert.equal(this.validateData.lastCall.args[1].argumentOptions, chart._argumentAxes[0].getOptions());
        assert.equal(this.validateData.lastCall.args[1].groups[0].valueOptions, chart._valueAxes[0].getOptions());
    });

    QUnit.test('Group Series by panes and axes. One pane, two value axis, three series', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({ type: 'line' }), new MockSeries({ type: 'line' }), new MockSeries({ type: 'line' }));
        // act
        const chart = this.createChart({
            series: [{ axis: 'axis2', type: 'line' }, { type: 'line' }, { type: 'line' }],
            valueAxis: [{
                name: 'axis1'
            }, {
                name: 'axis2'
            }]
        });
        // assert
        const chartSeries = chart.series;

        assert.equal(chartSeries.length, 3);
        assert.equal(this.validateData.lastCall.args[1].groups.length, 2);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[1].series, [chartSeries[0]]);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[0].series, [chartSeries[1], chartSeries[2]]);
        assert.equal(this.validateData.lastCall.args[1].groups[1].valueAxis, chart._valueAxes[1]);
        assert.equal(this.validateData.lastCall.args[1].groups[0].valueAxis, chart._valueAxes[0]);
        assert.equal(this.validateData.lastCall.args[1].argumentOptions, chart._argumentAxes[0].getOptions());
        assert.equal(this.validateData.lastCall.args[1].groups[1].valueOptions, chart._valueAxes[1].getOptions());
        assert.equal(this.validateData.lastCall.args[1].groups[0].valueOptions, chart._valueAxes[0].getOptions());
    });

    QUnit.test('Group Series by panes and axes. two pane, one value axis, three series', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({}), new MockSeries({}), new MockSeries({}));
        // act
        const chart = this.createChart({
            series: [{ pane: 'pane1', type: 'line' }, { type: 'line' }, { type: 'line' }],
            valueAxis: {},
            panes: [{ name: 'pane1' }, { name: 'pane2' }]
        });
        // assert
        const chartSeries = chart.series;
        assert.equal(chartSeries.length, 3);
        assert.equal(this.validateData.lastCall.args[1].groups.length, 2);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[0].series, [chartSeries[0]]);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[1].series, [chartSeries[1], chartSeries[2]]);
    });

    QUnit.test('Group Series by panes and axes. two pane, three value axis, three series', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({}), new MockSeries({}), new MockSeries({}));
        // act
        const chart = this.createChart({
            series: [{ pane: 'pane1', axis: 'axis1', type: 'line' }, { axis: 'axis2', pane: 'pane1', type: 'line' }, { pane: 'pane2', name: 'axis2', type: 'line' }],
            valueAxis: [{ pane: 'pane1', name: 'axis1' }, { pane: 'pane1', name: 'axis2' }, { pane: 'pane2', name: 'axis2' }],
            panes: [{ name: 'pane1' }, { name: 'pane2' }]
        });
        // assert
        const chartSeries = chart.series;

        assert.equal(chartSeries.length, 3);
        assert.equal(this.validateData.lastCall.args[1].groups.length, 3);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[0].series, [chartSeries[0]], 'first group');
        assert.deepEqual(this.validateData.lastCall.args[1].groups[2].series, [chartSeries[1]]);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[1].series, [chartSeries[2]]);
    });

    QUnit.test('Axes. Axis has no panes. no series has axis (axis2)', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 0,
                    max: 10
                }
            }
        }));
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 101,
                    max: 151
                }
            }
        }));
        // act
        const chart = this.createChart({
            series: [{
                pane: 'top',
                axis: 'axis1',
                type: 'line'
            }, {
                pane: 'bottom',
                axis: 'axis1',
                type: 'line'
            }],
            valueAxis: [{
                name: 'axis1',
                pane: 'bottom',
                type: 'line'
            }, { name: 'axis2' }],
            panes: [{ name: 'top' }, { name: 'bottom' }]
        });
        // assert
        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 3, 'chart must has three axis');

        checkAxis(assert, verticalAxis, 0, 'axis1', 'bottom', 0);
        checkAxis(assert, verticalAxis, 1, 'axis1', 'top', 0);
        checkAxis(assert, verticalAxis, 2, 'axis2', chart.defaultPane, 1);

        const chartSeries = chart.series;

        assert.deepEqual(this.validateData.lastCall.args[1].groups[1].series, [chartSeries[0]], 'first group');
        assert.deepEqual(this.validateData.lastCall.args[1].groups[0].series, [chartSeries[1]]);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[2].series, []);
    });

    QUnit.test('Axes. There are series with axis and has no pane. axis has no pane', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({}));
        chartMocks.seriesMockData.series.push(new MockSeries({}));
        // act
        const chart = this.createChart({
            series: [{
                pane: 'top',
                axis: 'axis1',
                type: 'line'
            }, {
                axis: 'axis2',
                type: 'line'
            }],
            valueAxis: [{
                name: 'axis1',
                pane: 'bottom'
            }, { name: 'axis2' }],
            panes: [{ name: 'top' }, { name: 'bottom' }]
        });
        // assert
        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 3, 'chart must has three axis');

        checkAxis(assert, verticalAxis, 0, 'axis1', 'bottom', 0);
        checkAxis(assert, verticalAxis, 1, 'axis1', 'top', 0);
        checkAxis(assert, verticalAxis, 2, 'axis2', chart.defaultPane, 1);
    });

    QUnit.test('Axes. There are series with axis and pane. axis has no pane', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({}));
        chartMocks.seriesMockData.series.push(new MockSeries({}));
        // act
        const chart = this.createChart({
            series: [{
                pane: 'top',
                axis: 'axis1',
                type: 'line'
            }, {
                axis: 'axis2',
                pane: 'top',
                type: 'line'
            }],
            valueAxis: [{
                name: 'axis1',
                pane: 'bottom',
                type: 'line'
            }, { name: 'axis2' }],
            panes: [{ name: 'top' }, { name: 'bottom' }]
        });
        // assert
        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 3, 'chart must has three axis');

        checkAxis(assert, verticalAxis, 0, 'axis1', 'bottom', 0);
        checkAxis(assert, verticalAxis, 1, 'axis1', 'top', 0);
        checkAxis(assert, verticalAxis, 2, 'axis2', 'top', 1);

        const chartSeries = chart.series;

        assert.deepEqual(this.validateData.lastCall.args[1].groups[1].series, [chartSeries[0]], 'firstGroup');
        assert.deepEqual(this.validateData.lastCall.args[1].groups[2].series, [chartSeries[1]]);
        assert.deepEqual(this.validateData.lastCall.args[1].groups[0].series, []);
    });

    QUnit.test('Axes. dxChart without series. Axis has panes', function (assert) {
        // act
        const chart = this.createChart({
            valueAxis: [{
                name: 'axis1',
                pane: 'bottom'
            }, {
                name: 'axis2',
                pane: 'top'
            }],
            panes: [{ name: 'top' }, { name: 'bottom' }]
        });
        // assert
        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 2, 'chart must has two axis');
        checkAxis(assert, verticalAxis, 0, 'axis1', 'bottom', 0);
        checkAxis(assert, verticalAxis, 1, 'axis2', 'top', 1);
    });

    QUnit.test('Axes. default axis', function (assert) {
        // act
        const chart = this.createChart({
            valueAxis: { title: { text: 'Title' } },
            panes: [{ name: 'top' }, { name: 'bottom' }]
        });
        // assert
        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 2);
        checkAxis(assert, verticalAxis, 1, 'defaultAxisName0', 'bottom', 0);
        checkAxis(assert, verticalAxis, 0, 'defaultAxisName0', 'top', 0);
        assert.equal(verticalAxis[0].getOptions().title.text, 'Title');
        assert.equal(verticalAxis[1].getOptions().title.text, 'Title');
    });

    QUnit.test('Axes. Axis with panes', function (assert) {
        // act
        const chart = this.createChart({
            valueAxis: [{
                name: 'axis1',
                panes: ['top', 'middle']
            }, { name: 'axis2' }],
            panes: [{ name: 'top' }, { name: 'middle' }, { name: 'bottom' }]
        });
        // assert
        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 3, 'chart must has three axis');
        checkAxis(assert, verticalAxis, 0, 'axis1', 'top', 0);
        checkAxis(assert, verticalAxis, 1, 'axis1', 'middle', 0);
        checkAxis(assert, verticalAxis, 2, 'axis2', 'bottom', 1);
    });

    QUnit.test('Axes. Merge old and new notations of axis panes', function (assert) {
        // act
        const chart = this.createChart({
            valueAxis: [{
                name: 'axis1',
                pane: 'toptop',
                panes: ['top', 'middle']
            }, { name: 'axis2' }],
            panes: [{ name: 'toptop' }, { name: 'top' }, { name: 'middle' }, { name: 'bottom' }]
        });
        // assert
        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 4, 'chart must has four axis');

        checkAxis(assert, verticalAxis, 0, 'axis1', 'toptop', 0);
        checkAxis(assert, verticalAxis, 1, 'axis1', 'top', 0);
        checkAxis(assert, verticalAxis, 2, 'axis1', 'middle', 0);
        checkAxis(assert, verticalAxis, 3, 'axis2', 'bottom', 1);
    });

    QUnit.test('Axes. Merge old a new notations of axis panes with duplicate.', function (assert) {
        // act
        const chart = this.createChart({
            valueAxis: [{
                name: 'axis1',
                pane: 'top',
                panes: ['top', 'middle', 'toptop', 'middle']
            }, { name: 'axis2' }],
            panes: [{ name: 'toptop' }, { name: 'top' }, { name: 'middle' }, { name: 'bottom' }]
        });
        // assert
        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 4, 'chart must has four axis');

        checkAxis(assert, verticalAxis, 0, 'axis1', 'top', 0);
        checkAxis(assert, verticalAxis, 1, 'axis1', 'middle', 0);
        checkAxis(assert, verticalAxis, 2, 'axis1', 'toptop', 0);
        checkAxis(assert, verticalAxis, 3, 'axis2', 'bottom', 1);
    });

    QUnit.test('Axes. axis has invalid pane', function (assert) {
        // act
        const chart = this.createChart({
            valueAxis: [{
                name: 'axis1',
                pane: 'top'
            }],
            panes: [{ name: 'default' }]
        });
        // assert
        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 1, 'chart must has four axis');

        checkAxis(assert, verticalAxis, 0, 'axis1', 'default', 0);
    });

    QUnit.test('Axes. axis has several panes valid and invalid', function (assert) {
        // act
        const chart = this.createChart({
            valueAxis: [{
                name: 'axis1',
                panes: ['top', 'nonsense']
            }, { pane: 'middle' }, { pane: 'bottom' }],
            panes: [{ name: 'top' }, { name: 'middle' }, { name: 'bottom' }]
        });
        // assert
        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 3, 'chart must has four axis');

        checkAxis(assert, verticalAxis, 0, 'axis1', 'top', 0);
        checkAxis(assert, verticalAxis, 1, 'defaultAxisName0', 'middle', 1);
        checkAxis(assert, verticalAxis, 2, 'defaultAxisName1', 'bottom', 2);
    });

    QUnit.test('Axes. axis has invalid panes', function (assert) {
        // act
        const chart = this.createChart({
            valueAxis: [{
                name: 'axis1',
                panes: ['nonsense1', 'nonsense2']
            }, { pane: 'top' }, { pane: 'middle' }, { pane: 'bottom' }],
            panes: [{ name: 'top' }, { name: 'middle' }, { name: 'bottom' }]
        });
        // assert
        const verticalAxis = chart._valueAxes;
        assert.ok(verticalAxis, 'chart must has vertical axis');
        assert.equal(verticalAxis.length, 3, 'chart must has four axis');

        checkAxis(assert, verticalAxis, 0, 'defaultAxisName0', 'top', 1);
        checkAxis(assert, verticalAxis, 1, 'defaultAxisName1', 'middle', 2);
        checkAxis(assert, verticalAxis, 2, 'defaultAxisName2', 'bottom', 3);
    });

    QUnit.test('Series. Series with invalid Pane', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 0,
                    max: 10
                }
            }
        }));
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 101,
                    max: 151
                }
            }
        }));
        // act
        const chart = this.createChart({
            series: [{
                type: 'line'
            }, {
                pane: 'top', type: 'line'
            }],
            panes: [{ name: 'default' }]
        });
        // assert
        const series = chart.series;
        assert.ok(series);
        assert.equal(series.length, 1);
        assert.equal(series[0].pane, chart.defaultPane);
    });

    QUnit.test('Series. Series with invalid axis', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 0,
                    max: 10
                }
            }
        }));

        // act
        const chart = this.createChart({
            dataSource: [{ x: 'one', y: 1 }],
            series: [{
                argumentField: 'x',
                valueField: 'y',
                axis: 'axis',
                type: 'line'
            }]
        });
        // assert
        const series = chart.series;
        assert.ok(series);
        assert.equal(series.length, 1);
        assert.equal(series[0].pane, chart.defaultPane);
        assert.equal(chart._valueAxes[1].name, 'axis');
    });

    QUnit.test('B251248. Break animations chart on update', function (assert) {
        const stubSeries1 = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries1);

        const chart = this.createChart({
            series: [{ type: 'line' }]
        });

        chart._renderer.stopAllAnimations = sinon.spy();
        chart.option('series', []);
        assert.equal(chart._renderer.stopAllAnimations.withArgs(true).callCount, 1);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","./chartParts/commons.js","viz/core/utils","../../helpers/chartMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("./chartParts/commons.js"), require("viz/core/utils"), require("../../helpers/chartMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=chart.part4.tests.js.map