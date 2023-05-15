!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/chart.part5.tests.js"], ["jquery","core/utils/common","./chartParts/commons.js","viz/chart_components/scroll_bar","viz/chart_components/tracker","../../helpers/chartMocks.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.charts/chart.part5.tests.js', ['jquery', 'core/utils/common', './chartParts/commons.js', 'viz/chart_components/scroll_bar', 'viz/chart_components/tracker', '../../helpers/chartMocks.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const commons = $__require('./chartParts/commons.js');
    const scrollBarClassModule = $__require('viz/chart_components/scroll_bar');
    const trackerModule = $__require('viz/chart_components/tracker');
    const chartMocks = $__require('../../helpers/chartMocks.js');
    const MockSeries = chartMocks.MockSeries;
    const categories = chartMocks.categories;

    $('<div id="chartContainer">').appendTo('#qunit-fixture');

    const OldEventsName = {
        'seriesClick': 'onSeriesClick',
        'pointClick': 'onPointClick',
        'argumentAxisClick': 'onArgumentAxisClick',
        'legendClick': 'onLegendClick',
        'pointHoverChanged': 'onPointHoverChanged',
        'seriesSelectionChanged': 'onSeriesSelectionChanged',
        'pointSelectionChanged': 'onPointSelectionChanged',
        'seriesHoverChanged': 'onSeriesHoverChanged',
        'tooltipShown': 'onTooltipShown',
        'tooltipHidden': 'onTooltipHidden'
    };

    QUnit.module('Zooming', commons.environment);

    QUnit.test('chart with single value axis. Zooming with all null/undefined values', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries());
        const chart = this.createChart({
            argumentAxis: {
                argumentType: 'numeric'
            },
            series: [{
                type: 'line'
            }]
        });
        const chartRenderSpy = sinon.spy(chart, '_doRender');

        // act
        chart.zoomArgument(undefined, undefined);
        // assert
        assert.equal(chartRenderSpy.callCount, 0);
    });

    QUnit.test('chart with single value axis. Zooming with one null/undefined values', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries());
        chartMocks.seriesMockData.series.push(new MockSeries());
        const chart = this.createChart({
            argumentAxis: {
                argumentType: 'numeric'
            },
            series: [{
                type: 'line'
            }, {
                type: 'line'
            }]
        });
        const chartRenderSpy = sinon.spy(chart, '_doRender');

        // act
        chart.getArgumentAxis().applyVisualRangeSetter.lastCall.args[0](chart.getArgumentAxis(), {});

        // assert
        assert.equal(chartRenderSpy.callCount, 1);
    });

    QUnit.test('chart with single value axis. Adjust on zoom = false', function (assert) {
        const series1 = new MockSeries({});
        const series2 = new MockSeries({});

        chartMocks.seriesMockData.series.push(series1, series2);

        const chart = this.createChart({
            series: [{ type: 'line' }, { type: 'line' }],
            adjustOnZoom: false
        });
        // act

        chart.zoomArgument(10, 50);
        // assert
        assert.ok(!series1.getValueAxis().adjust.called, 'value axis are not zoomed');
    });

    QUnit.test('Chart with aggregatio and adjustOnZoom = false (T996183)', function (assert) {
        const series = new MockSeries({ aggregation: { enabled: true } });

        chartMocks.seriesMockData.series.push(series);

        const chart = this.createChart({
            series: [{ type: 'line' }],
            adjustOnZoom: false
        });

        chart.zoomArgument(10, 50);

        assert.ok(!series.getValueAxis().adjust.called, 'value axis are not zoomed');
    });

    QUnit.test('MultiAxis chart', function (assert) {
        const series1 = new MockSeries({});
        const series2 = new MockSeries({});

        chartMocks.seriesMockData.series.push(series1, series2);

        const chart = this.createChart({

            series: [{
                type: 'line',
                axis: 'axis1'
            }, {
                axis: 'axis2',
                type: 'line'
            }],
            valueAxis: [{ name: 'axis1' }, { name: 'axis1' }]
        });

        chart._valueAxes[0].adjust.reset();
        chart._valueAxes[1].adjust.reset();
        // act
        chart.getArgumentAxis().applyVisualRangeSetter.lastCall.args[0](chart.getArgumentAxis(), {});
        // assert

        assert.deepEqual(series1.getValueAxis().adjust.callCount, 1, 'axis 1 viewport adjusted');
        assert.deepEqual(series2.getValueAxis().adjust.callCount, 1, 'axis 2 viewport adjusted');
    });

    QUnit.test('Set visual range for all argument axis except original target one', function (assert) {
        const series1 = new MockSeries({});
        const series2 = new MockSeries({});

        chartMocks.seriesMockData.series.push(series1, series2);

        const chart = this.createChart({
            series: [{
                type: 'line',
                pane: 'p1'
            }, {
                pane: 'p2',
                type: 'line'
            }],
            panes: [{
                name: 'p1'
            }, {
                name: 'p2'
            }]
        });
        chart._argumentAxes[0].visualRange.reset();
        // act
        chart.getArgumentAxis().applyVisualRangeSetter.lastCall.args[0](chart.getArgumentAxis(), { range: [10, 50] });
        // assert
        assert.deepEqual(chart._argumentAxes[0].visualRange.firstCall.args[0], [10, 50]);
        assert.ok(!chart._argumentAxes[1].called);
        assert.equal(chart._argumentAxes[1], chart.getArgumentAxis());
    });

    QUnit.test('chart with single value with aggregation. Adjust on zoom = true', function (assert) {
        const series1 = new MockSeries({});

        series1.useAggregation.returns(true);
        series1.getViewport.returns({
            min: 10,
            max: 15
        });

        chartMocks.seriesMockData.series.push(series1);

        this.createChart({
            adjustOnZoom: true,
            series: [{
                type: 'line'
            }]
        });

        // assert
        assert.strictEqual(series1.getValueAxis().adjust.callCount, 1);
    });

    QUnit.test('Aggregation with min and max on argument axis, without zooming', function (assert) {
        const series1 = new MockSeries({
            range: {
                val: { min: 0, max: 1 },
                arg: { max: 100, min: 0 }
            }
        });

        series1.getViewport.returns({ min: 50, max: 60 });
        series1.useAggregation.returns(true);
        chartMocks.seriesMockData.series.push(series1);

        this.createChart({
            adjustOnZoom: true,
            series: [{
                type: 'line'
            }]
        });
        // assert
        assert.strictEqual(series1.getValueAxis().adjust.callCount, 1);
    });

    // T557040
    QUnit.test('Aggregation. One of the series without points', function (assert) {
        const series1 = new MockSeries({});
        const series2 = new MockSeries({});

        series1.useAggregation.returns(true);

        series1.getViewport.returns({
            min: 0,
            max: 15
        });

        series2.getViewport.returns({
            min: null,
            max: null
        });

        chartMocks.seriesMockData.series.push(series1, series2);

        this.createChart({
            adjustOnZoom: true,
            series: [{
                type: 'line'
            }, {}]
        });

        assert.strictEqual(series1.getValueAxis().adjust.callCount, 1);
    });

    QUnit.module('Pane synchronization', commons.environment);

    QUnit.test('simple chart with two panes', function (assert) {
        // arrange
        const stubSeries1 = new MockSeries({ range: { arg: { min: 15, max: 80 } } });
        const stubSeries2 = new MockSeries({ range: { arg: { min: 1, max: 5 } } });

        chartMocks.seriesMockData.series.push(stubSeries1);
        chartMocks.seriesMockData.series.push(stubSeries2);
        // act
        const chart = this.createChart({
            argumentAxis: {
                categories: categories
            },
            panes: [{
                name: 'top'
            }, {
                name: 'bottom'
            }],
            series: [{ pane: 'top', type: 'line' }, { pane: 'bottom', type: 'line' }],
            valueAxis: {
                maxPadding: 0.3,
                mockTickValues: [20, 40, 60, 80],
                grid: {
                    visible: true
                }
            }
        });
        // assert
        assert.ok(chart.panes);
        assert.equal(chart.panes.length, 2);

        assert.deepEqual(chart._argumentAxes[0].setBusinessRange.lastCall.args[0], chart._argumentAxes[1].setBusinessRange.lastCall.args[0]);
    });

    QUnit.test('Rotated chart with two panes', function (assert) {
        // arrange
        const stubSeries1 = new MockSeries({ range: { arg: { min: 15, max: 80 } } });
        const stubSeries2 = new MockSeries({ range: { arg: { min: 1, max: 5 } } });

        chartMocks.seriesMockData.series.push(stubSeries1);
        chartMocks.seriesMockData.series.push(stubSeries2);
        // act
        const chart = this.createChart({
            rotated: true,
            argumentAxis: {
                categories: categories
            },
            panes: [{
                name: 'top'
            }, {
                name: 'bottom'
            }],
            series: [{ pane: 'top', type: 'line' }, { pane: 'bottom', type: 'line' }],
            valueAxis: {
                mockTickValues: [20, 40, 60, 80],
                grid: {
                    visible: true
                }
            }
        });
        // assert
        assert.ok(chart.panes);
        assert.equal(chart.panes.length, 2);

        assert.deepEqual(chart._argumentAxes[0].setBusinessRange.lastCall.args[0], chart._argumentAxes[1].setBusinessRange.lastCall.args[0]);
    });

    QUnit.test('chart with one empty pane', function (assert) {
        const stubSeries1 = new MockSeries({ range: { arg: { min: 15, max: 80 }, val: { min: -1, max: 10 } } });

        chartMocks.seriesMockData.series.push(stubSeries1);
        // chartMocks.seriesMockData.series.push(stubSeries2);
        // act
        const chart = this.createChart({
            argumentAxis: {
                categories: categories
            },
            panes: [{ name: 'empty' }, { name: 'bottom' }],
            series: [{ pane: 'bottom', type: 'line' }],
            valueAxis: {
                mockTickValues: [20, 40, 60, 80]
            }
        });
        // assert
        assert.ok(chart.panes);
        assert.equal(chart.panes.length, 2);
        // assert
        assert.deepEqual(chart._argumentAxes[0].setBusinessRange.lastCall.args[0], chart._argumentAxes[1].setBusinessRange.lastCall.args[0]);

        assert.equal(chart._argumentAxes[0].setBusinessRange.lastCall.args[0].isEmpty(), false);
        assert.equal(chart._valueAxes[0].setBusinessRange.lastCall.args[0].isEmpty(), false);

        assert.equal(chart._argumentAxes[1].setBusinessRange.lastCall.args[0].isEmpty(), false);
        assert.equal(chart._valueAxes[1].setBusinessRange.lastCall.args[0].isEmpty(), true);
    });

    QUnit.test('Rotated chart with one empty pane', function (assert) {
        const stubSeries1 = new MockSeries({ range: { val: { min: 15, max: 80 }, arg: { min: -1, max: 10 } } });

        chartMocks.seriesMockData.series.push(stubSeries1);
        // act
        const chart = this.createChart({
            rotated: true,
            argumentAxis: {
                categories: categories
            },
            panes: [{ name: 'empty' }, { name: 'left' }],
            series: [{ pane: 'left', type: 'line' }],
            valueAxis: {
                mockTickValues: [20, 40, 60, 80]
            }
        });
        // assert
        assert.ok(chart.panes);
        assert.equal(chart.panes.length, 2);
        // assert
        assert.deepEqual(chart._argumentAxes[1].setBusinessRange.lastCall.args[0], chart._argumentAxes[0].setBusinessRange.lastCall.args[0], 'all argument axes have same range');

        assert.equal(chart._valueAxes[0].setBusinessRange.lastCall.args[0].isEmpty(), false);
        assert.equal(chart._argumentAxes[0].setBusinessRange.lastCall.args[0].isEmpty(), false);

        assert.equal(chart._valueAxes[1].setBusinessRange.lastCall.args[0].isEmpty(), true);
        assert.equal(chart._argumentAxes[1].setBusinessRange.lastCall.args[0].isEmpty(), false);
    });

    QUnit.test('Update axis canvas. One pane', function (assert) {
        // act
        const chart = this.createChart({});
        // assert
        assert.deepEqual(chart._argumentAxes[0].updateSize.lastCall.args[0], chart.panes[0].canvas);
        assert.deepEqual(chart._valueAxes[0].updateSize.lastCall.args[0], chart.panes[0].canvas);
    });

    QUnit.test('Update axis canvas. Two panes', function (assert) {
        // act
        const chart = this.createChart({
            panes: [{ name: 'top' }, { name: 'bottom' }],
            valueAxis: [{ pane: 'top' }, { pane: 'bottom' }, { pane: 'top' }]
        });
        // assert
        assert.deepEqual(chart._argumentAxes[0].updateSize.lastCall.args[0], chart.panes[0].canvas);
        assert.deepEqual(chart._argumentAxes[1].updateSize.lastCall.args[0], chart.panes[1].canvas);

        assert.deepEqual(chart._valueAxes[0].updateSize.lastCall.args[0], chart.panes[0].canvas, 'first value axis');
        assert.deepEqual(chart._valueAxes[1].updateSize.lastCall.args[0], chart.panes[1].canvas, 'second value axis');
        assert.deepEqual(chart._valueAxes[2].updateSize.lastCall.args[0], chart.panes[0].canvas, 'third value axis');
    });

    QUnit.module('scrollBar', commons.environment);

    QUnit.test('chart with invisible scrollBar', function (assert) {
        this.createChart({
            margin: {
                width: 100,
                height: 500
            },
            scrollBar: {
                visible: false
            }
        });
        assert.ok(!scrollBarClassModule.ScrollBar.called);
    });

    QUnit.test('chart with visible scrollBar', function (assert) {
        const chart = this.createChart({
            scrollBar: {
                visible: true
            }
        });
        const scrollBar = scrollBarClassModule.ScrollBar.lastCall.returnValue;
        const range = chart._argumentAxes[0].getTranslator().getBusinessRange();

        assert.ok(scrollBarClassModule.ScrollBar.calledOnce);
        assert.deepEqual(scrollBarClassModule.ScrollBar.lastCall.args, [chart._renderer, chart._scrollBarGroup]);
        assert.ok(scrollBar.update.calledOnce);

        assert.deepEqual(scrollBar.update.lastCall.args, [{
            rotated: false,
            visible: true
        }]);

        assert.ok(scrollBar, 'scroll bar');

        assert.ok(scrollBar.init.calledOnce);
        assert.deepEqual(scrollBar.init.lastCall.args, [range, true]);

        assert.ok(scrollBar.setPane.calledOnce);
        assert.equal(scrollBar.setPane.lastCall.args[0], chart._getLayoutTargets());

        assert.ok(scrollBar.setPosition.calledOnce);
        assert.deepEqual(scrollBar.setPosition.lastCall.args, [range.minVisible, range.maxVisible]);
        assert.ok(scrollBar.updateSize.calledOnce);
    });

    QUnit.test('chart with visible scrollBar. Rotated', function (assert) {
        const chart = this.createChart({
            rotated: true,
            scrollBar: {
                visible: true
            }
        });
        const scrollBar = scrollBarClassModule.ScrollBar.lastCall.returnValue;
        const range = chart._argumentAxes[0].getTranslator().getBusinessRange();

        assert.ok(scrollBarClassModule.ScrollBar.calledOnce);
        assert.deepEqual(scrollBarClassModule.ScrollBar.lastCall.args, [chart._renderer, chart._scrollBarGroup]);
        assert.ok(scrollBar.update.calledOnce);

        assert.deepEqual(scrollBar.update.lastCall.args, [{
            rotated: true,
            visible: true
        }]);

        assert.ok(scrollBar);

        assert.ok(scrollBar.init.calledOnce);
        assert.deepEqual(scrollBar.init.lastCall.args, [range, true]);

        assert.ok(scrollBar.setPane.calledOnce);
        assert.equal(scrollBar.setPane.lastCall.args[0], chart._getLayoutTargets());

        assert.ok(scrollBar.setPosition.calledOnce);
        assert.deepEqual(scrollBar.setPosition.lastCall.args, [range.minVisible, range.maxVisible]);
        assert.ok(scrollBar.updateSize.calledOnce);
    });

    QUnit.test('chart with visible scrollBar, argumentAxis.valueMarginsEnabled = true - init scrollBar with stick false', function (assert) {
        this.createChart({
            scrollBar: {
                visible: true
            },
            argumentAxis: {
                valueMarginsEnabled: true
            }
        });

        assert.strictEqual(scrollBarClassModule.ScrollBar.lastCall.returnValue.init.lastCall.args[1], false);
    });

    QUnit.test('T172802. Scroll bar after zooming. One categories', function (assert) {
        const chart = this.createChart({
            scrollBar: {
                visible: true
            },
            argumentAxis: {
                mockRange: {
                    axisType: 'discrete',
                    categories: ['January'],
                    minVisible: 'January',
                    maxVisible: 'January'
                }
            }
        });
        const scrollBar = scrollBarClassModule.ScrollBar.lastCall.returnValue;

        scrollBar.setPosition.reset();

        chart.getArgumentAxis().applyVisualRangeSetter.lastCall.args[0](chart.getArgumentAxis(), { startValue: 'January', endValue: 'January' });

        assert.ok(scrollBar.setPosition.calledOnce);
        assert.deepEqual(scrollBar.setPosition.lastCall.args, [undefined, undefined]);
    });

    QUnit.test('applyTheme', function (assert) {
        this.themeManager.getOptions.withArgs('scrollBar').returns({
            scrollBarThemeApplied: true,
            visible: true
        });

        const chart = this.createChart({});
        const scrollBar = scrollBarClassModule.ScrollBar.lastCall.returnValue;

        assert.ok(scrollBarClassModule.ScrollBar.calledOnce);
        assert.deepEqual(scrollBarClassModule.ScrollBar.lastCall.args, [chart._renderer, chart._scrollBarGroup]);
        assert.ok(scrollBar.update.calledOnce);

        assert.deepEqual(scrollBar.update.lastCall.args, [{
            rotated: false,
            visible: true,
            scrollBarThemeApplied: true
        }]);
    });

    QUnit.test('ScrollBar option changed', function (assert) {
        const chart = this.createChart({
            scrollBar: {
                visible: true,
                color: 'old'
            }
        });
        const scrollBar = scrollBarClassModule.ScrollBar.lastCall.returnValue;

        scrollBar.init.resetHistory();
        scrollBar.setPosition.resetHistory();

        this.themeManager.getOptions.withArgs('scrollBar').returns({
            visible: true,
            color: 'new'
        });
        // act

        chart.option('scrollBar', {
            visible: true,
            color: 'new'
        });

        const range = chart._argumentAxes[0].getTranslator().getBusinessRange();

        // assert
        assert.ok(scrollBarClassModule.ScrollBar.calledOnce);
        assert.deepEqual(scrollBarClassModule.ScrollBar.lastCall.args, [chart._renderer, chart._scrollBarGroup]);
        assert.ok(scrollBar.update.calledTwice);

        assert.deepEqual(scrollBar.update.lastCall.args, [{
            rotated: false,
            visible: true,
            color: 'new'
        }]);

        assert.equal(scrollBar.init.callCount, 1, 'scroll bar init calls');
        assert.deepEqual(scrollBar.init.lastCall.args, [range, true]);

        assert.equal(scrollBar.setPosition.callCount, 1);
        assert.deepEqual(scrollBar.setPosition.lastCall.args, [range.minVisible, range.maxVisible]);
    });

    QUnit.test('Options changed - hide scrollBar', function (assert) {
        const chart = this.createChart({
            scrollBar: {
                visible: true,
                color: 'old'
            }
        });
        const scrollBar = scrollBarClassModule.ScrollBar.lastCall.returnValue;
        scrollBar.init.reset();
        scrollBar.setPosition.reset();

        this.themeManager.getOptions.withArgs('scrollBar').returns({
            visible: false,
            color: 'new'
        });
        // act

        chart.option('scrollBar', {
            visible: false,
            color: 'new'
        });

        // assert
        assert.ok(scrollBarClassModule.ScrollBar.calledOnce);
        assert.deepEqual(scrollBarClassModule.ScrollBar.lastCall.args, [chart._renderer, chart._scrollBarGroup]);
        assert.ok(scrollBar.update.calledOnce);

        assert.equal(scrollBar.dispose.callCount, 1, 'scrollBar disposed');

        assert.ok(chart._scrollBarGroup.linkRemove.called);
    });

    QUnit.test('Options changed - show scrollBar', function (assert) {
        const chart = this.createChart({
            scrollBar: {
                visible: false,
                color: 'old'
            }
        });

        this.themeManager.getOptions.withArgs('scrollBar').returns({
            visible: true,
            color: 'new'
        });
        // act

        chart.option('scrollBar', {
            visible: true,
            color: 'new'
        });
        const scrollBar = scrollBarClassModule.ScrollBar.lastCall.returnValue;
        // assert
        assert.ok(scrollBarClassModule.ScrollBar.calledOnce);
        assert.deepEqual(scrollBarClassModule.ScrollBar.lastCall.args, [chart._renderer, chart._scrollBarGroup]);
        assert.ok(scrollBar.update.calledOnce);

        assert.deepEqual(scrollBar.update.lastCall.args, [{
            rotated: false,
            visible: true,
            color: 'new'
        }]);

        const range = chart._argumentAxes[0].getTranslator().getBusinessRange();

        assert.equal(scrollBar.init.callCount, 1, 'scroll bar init calls');
        assert.deepEqual(scrollBar.init.lastCall.args, [range, true]);

        assert.equal(scrollBar.setPosition.callCount, 1);
        assert.deepEqual(scrollBar.setPosition.lastCall.args, [range.minVisible, range.maxVisible]);
    });

    // T207760
    QUnit.test('Options changed - rotated (false->true)', function (assert) {
        // arrange
        const chart = this.createChart({
            rotated: false,
            scrollBar: {
                visible: true
            }
        });

        this.themeManager.getOptions.withArgs('rotated').returns(true);

        // act
        chart.option('rotated', true);
        const scrollBar = scrollBarClassModule.ScrollBar.lastCall.returnValue;

        // assert
        assert.deepEqual(scrollBar.update.lastCall.args, [{ rotated: true, visible: true }]);
    });

    // T207760
    QUnit.test('Options changed - rotated (true->false)', function (assert) {
        // arrange
        const chart = this.createChart({
            rotated: true,
            scrollBar: {
                visible: true
            }
        });

        this.themeManager.getOptions.withArgs('rotated').returns(false);

        // act
        chart.option('rotated', false);
        const scrollBar = scrollBarClassModule.ScrollBar.lastCall.returnValue;

        // assert
        assert.deepEqual(scrollBar.update.lastCall.args, [{ rotated: false, visible: true }]);
    });

    // T382491
    QUnit.test('empty categories in axis & continuous data', function (assert) {
        // arrange
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: { min: 0, max: 10 }, arg: { categories: [], axisType: 'continuous', min: 1, max: 3 }
            }
        }));
        const chart = this.createChart({
            dataSource: [{ x: 1, y: 3 }, { x: 3, y: 3 }],
            series: [{
                type: 'bar',
                argumentField: 'x',
                valueField: 'y'
            }],
            argumentAxis: { categories: [] },
            scrollBar: { visible: true },
            zoomAndPan: {
                argumentAxis: 'both',
                allowMouseWheel: true,
                allowTouchGestures: true
            }
        });
        const businessRange = chart._argumentAxes[0].getTranslator().getBusinessRange();

        // act
        chart.zoomArgument(1, 2);

        // assert
        assert.deepEqual(scrollBarClassModule.ScrollBar.lastCall.returnValue.setPosition.lastCall.args, [businessRange.minVisible, businessRange.maxVisible]);
    });

    QUnit.module('Map events', $.extend({}, commons.environment, {
        beforeEach: function () {
            commons.environment.beforeEach.call(this);
            this.addArgumentAxis = noop;
            this.clock = sinon.useFakeTimers();
        },
        afterEach: function () {
            commons.environment.afterEach.call(this);
            this.clock.restore();
        }
    }));

    QUnit.test('chart events', function (assert) {
        const events = {};
        const target = { isTarget: true };
        const event = { isEvent: true };
        const targetArg = { target: target, event: event, argument: 'argument' };

        $.each(OldEventsName, function (oldName, newName) {
            events[newName] = sinon.stub();
        });
        this.createChart(events);
        // acts
        $.each(OldEventsName, function (eventName) {
            trackerModule.ChartTracker.lastCall.args[0].eventTrigger(eventName, targetArg);
        });
        this.clock.tick(100);
        // assert
        $.each(events, function (eventName, callBack) {
            assert.strictEqual(callBack.callCount, 1, eventName + ' callback called');
            assert.strictEqual(callBack.lastCall.args[0].target, target, eventName + ' target is correct');
            assert.strictEqual(callBack.lastCall.args[0].event, event, eventName + ' event is correct');
            assert.strictEqual(callBack.lastCall.args[0].argument, 'argument', eventName + ' argument is correct');
        });
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","./chartParts/commons.js","viz/chart_components/scroll_bar","viz/chart_components/tracker","../../helpers/chartMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("./chartParts/commons.js"), require("viz/chart_components/scroll_bar"), require("viz/chart_components/tracker"), require("../../helpers/chartMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=chart.part5.tests.js.map