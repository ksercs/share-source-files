!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/chart.part2.tests.js"], ["jquery","./chartParts/commons.js","viz/core/utils","../../helpers/chartMocks.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.charts/chart.part2.tests.js', ['jquery', './chartParts/commons.js', 'viz/core/utils', '../../helpers/chartMocks.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const commons = $__require('./chartParts/commons.js');
    const vizUtils = $__require('viz/core/utils');
    const chartMocks = $__require('../../helpers/chartMocks.js');
    const MockSeries = chartMocks.MockSeries;
    const commonMethodsForTests = chartMocks.commonMethodsForTests;

    $__require('../../helpers/chartMocks.js');

    $('<div id="chartContainer">').appendTo('#qunit-fixture');

    QUnit.module('dxChart Business Ranges', commons.environment);

    QUnit.test('Pass rotation info to Business range (rotated = true)', function (assert) {
        const chart = this.createChart({
            rotated: true,
            argumentAxis: { mockRange: {} }
        });
        assert.strictEqual(chart.getValueAxis().setBusinessRange.lastCall.args[0].rotated, true);
        assert.strictEqual(chart._argumentAxes[0].setBusinessRange.lastCall.args[0].rotated, true);
    });

    QUnit.test('Pass rotation info to Business range (rotated = false)', function (assert) {
        const chart = this.createChart({
            argumentAxis: { mockRange: {} }
        });

        assert.strictEqual(chart.getValueAxis().setBusinessRange.lastCall.args[0].rotated, false);
        assert.strictEqual(chart._argumentAxes[0].setBusinessRange.lastCall.args[0].rotated, false);
    });

    QUnit.test('Calculate business range for continuous without indent', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: 0,
                    max: 10
                }
            }
        }));
        const chart = this.createChart({
            series: {
                type: 'line'
            },
            valueAxis: {
                minValueMargin: 0,
                maxValueMargin: 0,
                mockRange: {
                    minValueMargin: 0,
                    maxValueMargin: 0,
                    minValueMarginPriority: 50,
                    maxValueMarginPriority: 50
                }
            }
        });
        assert.ok(!chart._argumentAxes[0].setBusinessRange.lastCall.args[0].categories);
        assert.ok(!chart.getValueAxis().setBusinessRange.lastCall.args[0].categories);
        assert.equal(chart.getValueAxis().setBusinessRange.lastCall.args[0].min, 0);
        assert.equal(chart.getValueAxis().setBusinessRange.lastCall.args[0].max, 10);
    });

    QUnit.test('Calculate business range for continuous with default indent', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: -1,
                    max: 9
                }
            }
        }));
        const chart = this.createChart({
            series: {
                type: 'line'
            }
        });

        const range = chart.getValueAxis().setBusinessRange.lastCall.args[0];
        assert.ok(!chart._argumentAxes[0].setBusinessRange.lastCall.args[0].categories);
        assert.ok(!range.categories);
        assert.equal(range.min, -1);
        assert.equal(range.max, 9);
    });

    QUnit.test('Calculate business range for categories from Axis and continuous values from Series', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({
            range: {
                val: {
                    min: -1,
                    max: 9
                }
            }
        }));
        const chart = this.createChart({
            series: {
                type: 'line'
            }
        });

        assert.equal(chart.getValueAxis().setBusinessRange.lastCall.args[0].min, -1);
        assert.equal(chart.getValueAxis().setBusinessRange.lastCall.args[0].max, 9);
    });

    QUnit.test('Two ranges for two panes - data from series, indents from common axis', function (assert) {
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
                // doesn't matter as range goes from predefined series above
                pane: 'topPane',
                type: 'line'
            }, {
                // doesn't matter as range goes from predefined series above
                pane: 'otherPane',
                type: 'line'
            }],
            valueAxis: {
                minValueMargin: 0,
                maxValueMargin: 0,
                mockRange: {
                    minValueMargin: 0,
                    maxValueMargin: 0,
                    minValueMarginPriority: 50,
                    maxValueMarginPriority: 50
                }
            },
            panes: [{
                name: 'topPane',
                position: 'top'
            }, {
                name: 'otherPane'
            }]

        });
        // assert

        const range1 = chart._valueAxes[0].setBusinessRange.lastCall.args[0];
        assertRange(assert, range1, {
            pane: 'topPane',
            min: 0,
            max: 10
        });

        const range2 = chart._valueAxes[1].setBusinessRange.lastCall.args[0];
        assertRange(assert, range2, {
            pane: 'otherPane',
            min: 101,
            max: 151
        });
    });

    QUnit.test('Two Series, one of them is not visible', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({ visible: false, range: { arg: { categories: ['A', 'B', 'C'] } } }));
        chartMocks.seriesMockData.series.push(new MockSeries({ range: { arg: { categories: ['D', 'E', 'F'] } } }));

        const chart = this.createChart({
            dataSource: [{ arg: 'A', val: 1 }, { arg: 'B', val: 2 }, { arg: 'C', val: 3 }, { arg: 'D', val: 1 }, { arg: 'E', val: 2 }, { arg: 'F', val: 3 }],
            series: [{ type: 'line' }, { type: 'line' }]
        });

        assert.deepEqual(chart._argumentAxes[0].setBusinessRange.lastCall.args[0].categories, ['D', 'E', 'F']);
    });

    const assertRange = commonMethodsForTests.assertRange;

    // /////////////////////////////////////////////////////
    // ////      Canvas creation
    // /////////////////////////////////////////////////////
    QUnit.module('dxChart Canvas', commons.environment);

    QUnit.test('Canvas creation from options', function (assert) {

        const chartOptions = {
            left: 80,
            right: 90,
            top: 4,
            bottom: 80
        };
        const stubSeries = new MockSeries();
        chartMocks.seriesMockData.series.push(stubSeries);
        const chart = this.createChart({
            margin: chartOptions,
            series: [{ type: 'line' }]
        });

        assert.ok(chart._canvas);
        assert.equal(chart._canvas.width, 300);
        assert.equal(chart._canvas.height, 150);
        assert.equal(chart._canvas.left, 80);
        assert.equal(chart._canvas.right, 90);
        assert.equal(chart._canvas.top, 4);
        assert.equal(chart._canvas.bottom, 80);
    });

    QUnit.test('Canvas creation from default', function (assert) {
        const chart = this.createChart({});

        assert.ok(chart._canvas);
        // get it from container"s width and height
        assert.equal(chart._canvas.width, 300);
        assert.equal(chart._canvas.height, 150, 'True height of container');
        // get it from default canvas" settings
    });

    QUnit.test('Canvas creation, default container size', function (assert) {
        const css = { width: this.$container.width(), height: this.$container.height() };
        this.$container.css('height', 0);
        const chart = this.createChart({});

        assert.ok(chart._canvas);
        assert.equal(chart._canvas.width, css.width);
        assert.equal(chart._canvas.height, 400);
    });

    QUnit.test('Canvas creation, default conteiner size, zoom of the browser is not 100% (T916363)', function (assert) {
        this.$container.css({ height: '0.3px', width: '0.2px' });
        const chart = this.createChart({});

        assert.ok(chart._canvas);
        assert.equal(chart._canvas.width, 400);
        assert.equal(chart._canvas.height, 400);
    });

    QUnit.test('Canvas creation, zero container width', function (assert) {
        this.$container.css({ width: '0px', height: '100px' });
        const chart = this.createChart({});

        assert.ok(chart._canvas);
        assert.equal(chart._canvas.width, 400);
        assert.equal(chart._canvas.height, 100);
    });

    QUnit.test('Canvas creation, zero container size', function (assert) {
        this.$container.css({ width: '0px', height: '0px' });
        const chart = this.createChart({});

        // assert.ok(chart.canvas);
        assert.ok(chart._canvas);
    });

    QUnit.test('Canvas creation, custom container size', function (assert) {
        const css = { width: this.$container.width(), height: this.$container.height() };

        const chart = this.createChart({
            size: { width: 555, height: 445 }
        });

        assert.ok(chart._canvas);
        assert.equal(chart._canvas.width, 555);
        assert.equal(chart._canvas.height, 445);
        assert.equal(this.$container.width(), css.width);
        assert.equal(this.$container.height(), css.height);
    });

    QUnit.test('Canvas creation, custom negative width option', function (assert) {
        const css = { width: this.$container.width(), height: this.$container.height() };

        const chart = this.createChart({
            size: { width: -100, height: 445 }
        });

        // assert.ok(chart.canvas);
        // assert.equal(chart.canvas.width, 0);
        // assert.equal(chart.canvas.height, 445);
        assert.ok(chart._canvas);
        assert.equal(this.$container.width(), css.width);
        assert.equal(this.$container.height(), css.height);
    });

    QUnit.test('Canvas creation, custom negative height option', function (assert) {
        const css = { width: this.$container.width(), height: this.$container.height() };

        const chart = this.createChart({
            size: { width: 555, height: -445 }
        });

        // assert.ok(chart.canvas);
        // assert.equal(chart.canvas.width, 555);
        // assert.equal(chart.canvas.height, 0);
        assert.ok(chart._canvas);
        assert.equal(this.$container.width(), css.width);
        assert.equal(this.$container.height(), css.height);
    });

    QUnit.test('Canvas creation, custom container size with zero width and height', function (assert) {
        const chart = this.createChart({
            size: { width: 0, height: 0 }
        });

        assert.ok(chart._canvas);
    });

    QUnit.test('Canvas creation from options merged with default', function (assert) {

        const chartOptions = {
            // width: 800,
            // height: 800,
            left: 80,
            right: 0,
            top: 0,
            bottom: 0
        };
        const chart = this.createChart({
            margin: chartOptions
        });

        assert.ok(chart._canvas);
        assert.equal(chart._canvas.width, 300);
        assert.equal(chart._canvas.height, 150);
        assert.equal(chart._canvas.left, 80);
        assert.equal(chart._canvas.right, 0);
        assert.equal(chart._canvas.top, 0);
        assert.equal(chart._canvas.bottom, 0);
    });

    QUnit.test('Single pane canvas creation from default', function (assert) {
        const chart = this.createChart({});

        assert.ok(chart.panes);
        assert.strictEqual(chart.panes.length, 1, 'Two panes exists');
        assert.ok(chart.layoutManager, 'layoutManager created');
        assert.ok(vizUtils.updatePanesCanvases.called, 'Panes were created');

        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][0].name, 'default', 'Default pane was created with no options');
    });

    QUnit.test('Two panes canvas creation', function (assert) {
        const chart = this.createChart({
            panes: [{
                name: 'topPane'
            }, {
                name: 'bottomPane'
            }]
        });

        assert.ok(chart.panes);
        assert.strictEqual(chart.panes.length, 2, 'Single pane exists');
        assert.ok(chart.layoutManager, 'layoutManager created');
        assert.ok(vizUtils.updatePanesCanvases.called, 'Panes were created');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][0].name, 'topPane', 'Top pane from user options');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][1].name, 'bottomPane', 'Bottom pane from user options');
    });

    QUnit.test('Two panes canvas creation. All Border visible', function (assert) {
        const chart = this.createChart({
            commonPaneSettings: {
                border: {
                    visible: true
                }
            },
            panes: [{
                name: 'topPane'
            }, {
                name: 'bottomPane'
            }]
        });
        assert.ok(chart.panes);
        assert.strictEqual(chart.panes.length, 2, 'Single pane exists');
        assert.ok(chart.layoutManager, 'layoutManager created');
        assert.ok(vizUtils.updatePanesCanvases.called, 'Panes were created');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][0].name, 'topPane', 'Top pane from user options');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][1].name, 'bottomPane', 'Bottom pane from user options');
    });

    QUnit.test('Two panes canvas creation. Top Border visible', function (assert) {
        const chart = this.createChart({
            panes: [{
                name: 'topPane',
                border: {
                    visible: true
                }
            }, {
                name: 'bottomPane'
            }]
        });
        assert.ok(chart.panes);
        assert.strictEqual(chart.panes.length, 2, 'Single pane exists');
        assert.ok(chart.layoutManager, 'layoutManager created');
        assert.ok(vizUtils.updatePanesCanvases.called, 'Panes were created');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][0].name, 'topPane', 'Top pane from user options');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][1].name, 'bottomPane', 'Bottom pane from user options');
    });

    QUnit.test('Two panes canvas creation. Bottom Border visible', function (assert) {
        const chart = this.createChart({
            panes: [{
                name: 'topPane'

            }, {
                name: 'bottomPane',
                border: {
                    visible: true
                }
            }]
        });
        assert.ok(chart.panes);
        assert.strictEqual(chart.panes.length, 2, 'Single pane exists');
        assert.ok(chart.layoutManager, 'layoutManager created');
        assert.ok(vizUtils.updatePanesCanvases.called, 'Panes were created');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][0].name, 'topPane', 'Top pane from user options');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][1].name, 'bottomPane', 'Bottom pane from user options');
    });

    QUnit.test('Two panes canvas creation. Top Border visible. Rotated', function (assert) {
        const chart = this.createChart({
            rotated: true,
            panes: [{
                name: 'topPane',
                border: {
                    visible: true
                }
            }, {
                name: 'bottomPane'
            }]
        });
        assert.ok(chart.panes);
        assert.strictEqual(chart.panes.length, 2, 'Single pane exists');
        assert.ok(chart.layoutManager, 'layoutManager created');
        assert.ok(vizUtils.updatePanesCanvases.called, 'Panes were created');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][0].name, 'bottomPane', 'Top pane from user options');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][1].name, 'topPane', 'Bottom pane from user options');
    });

    QUnit.test('Two panes canvas creation. Bottom Border visible. Rotated', function (assert) {
        const chart = this.createChart({
            rotated: true,
            panes: [{
                name: 'topPane'

            }, {
                name: 'bottomPane',
                border: {
                    visible: true
                }
            }]
        });
        assert.ok(chart.panes);
        assert.strictEqual(chart.panes.length, 2, 'Single pane exists');
        assert.ok(chart.layoutManager, 'layoutManager created');
        assert.ok(vizUtils.updatePanesCanvases.called, 'Panes were created');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][0].name, 'bottomPane', 'Top pane from user options');
        assert.strictEqual(vizUtils.updatePanesCanvases.lastCall.args[0][1].name, 'topPane', 'Bottom pane from user options');
    });
    // /////////////////////////////////////////////////////
    // ////      Panes creation
    // /////////////////////////////////////////////////////
    QUnit.module('Panes creation', commons.environment);

    QUnit.test('by default - default pane created', function (assert) {
        const chart = this.createChart({});

        assert.equal(chart.panes.length, 1);
        assert.equal(chart.panes[0].name, 'default');
    });

    QUnit.test('panes is empty object - default pane created', function (assert) {
        const chart = this.createChart({
            panes: {}
        });

        assert.equal(chart.panes.length, 1);
        assert.equal(chart.panes[0].name, 'default0');
    });

    QUnit.test('panes is object - pane created', function (assert) {
        const chart = this.createChart({
            panes: { name: 'my new pane' }
        });

        assert.equal(chart.panes.length, 1);
        assert.equal(chart.panes[0].name, 'my new pane');
    });

    QUnit.test('panes is empty array - default pane created', function (assert) {
        const chart = this.createChart({
            panes: []
        });

        assert.equal(chart.panes.length, 1);
        assert.equal(chart.panes[0].name, 'default');
    });

    QUnit.test('panes is array with one object - pane created', function (assert) {
        const chart = this.createChart({
            panes: [{ name: 'my new pane' }]
        });

        assert.equal(chart.panes.length, 1);
        assert.equal(chart.panes[0].name, 'my new pane');
    });

    QUnit.test('panes is array with two object - two panes created', function (assert) {
        const chart = this.createChart({
            panes: [{ name: 'my new pane 1' }, { name: 'my new pane 2' }]
        });

        assert.equal(chart.panes.length, 2);
        assert.equal(chart.panes[0].name, 'my new pane 1');
        assert.equal(chart.panes[1].name, 'my new pane 2');
    });

    QUnit.test('panes specified without names - panes created with default names', function (assert) {
        const chart = this.createChart({
            panes: [{ someOption: 'some value' }, { someOption: 'some value' }]
        });

        assert.equal(chart.panes.length, 2);
        assert.equal(chart.panes[0].name, 'default0');
        assert.equal(chart.panes[1].name, 'default1');
    });

    QUnit.test('Define range intervals for each pane', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({ range: { arg: { min: 0, max: 100, interval: 10 } } }));
        chartMocks.seriesMockData.series.push(new MockSeries({ range: { arg: { min: 50, max: 150, interval: 50 } } }));

        const chart = this.createChart({
            dataSource: [],
            panes: [{ name: 'p1' }, { name: 'p2' }],
            series: [{ type: 'line', pane: 'p1' }, { type: 'line', pane: 'p2' }]
        });

        assert.deepEqual(chart._argumentAxes[0].setBusinessRange.lastCall.args[0].interval, 10);
        assert.deepEqual(chart._argumentAxes[1].setBusinessRange.lastCall.args[0].interval, 50);
    });

    QUnit.test('Define common range interval for panes', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({ range: { arg: { min: 0, max: 100, interval: 10 } } }));
        chartMocks.seriesMockData.series.push(new MockSeries({ range: { arg: { min: 50, max: 150, interval: undefined } } }));

        const chart = this.createChart({
            dataSource: [],
            panes: [{ name: 'p1' }, { name: 'p2' }],
            series: [{ type: 'line', pane: 'p1' }, { type: 'line', pane: 'p2' }]
        });

        assert.deepEqual(chart._argumentAxes[0].setBusinessRange.lastCall.args[0].interval, 10);
        assert.deepEqual(chart._argumentAxes[1].setBusinessRange.lastCall.args[0].interval, 10);
    });

    QUnit.module('Panes creation. defaultPane', commons.environment);

    QUnit.test('single pane - defaultPane is only pane', function (assert) {
        const chart = this.createChart({});

        assert.strictEqual(chart.defaultPane, 'default');
    });

    QUnit.test('multiple panes - defaultPane is the last pane', function (assert) {
        const chart = this.createChart({
            panes: [{ name: 'pane 1' }, { name: 'pane 2' }]
        });

        assert.strictEqual(chart.defaultPane, 'pane 2');
    });

    QUnit.test('defaultPane specified, there is pane with givenName - defaultPane is that pane', function (assert) {
        const chart = this.createChart({
            defaultPane: 'pane 1',
            panes: [{ name: 'pane 1' }, { name: 'pane 2' }]
        });

        assert.strictEqual(chart.defaultPane, 'pane 1');
    });

    QUnit.test('defaultPane specified, no panes with givenName - defaultPane is the last pane', function (assert) {
        const chart = this.createChart({
            defaultPane: 'some pane name',
            panes: [{ name: 'pane 1' }, { name: 'pane 2' }]
        });

        assert.strictEqual(chart.defaultPane, 'pane 2');
    });

    QUnit.module('Merge marginOptions', commons.environment);

    QUnit.test('Pass merged marginOptions to axes', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({
            marginOptions: {
                checkInterval: false,
                size: 8,
                percentStick: true
            }
        }));

        chartMocks.seriesMockData.series.push(new MockSeries({
            marginOptions: {
                checkInterval: true,
                size: 5,
                percentStick: false
            }
        }));

        const chart = this.createChart({
            series: [{}, {}]
        });

        assert.deepEqual(chart.getValueAxis().setMarginOptions.lastCall.args[0], {
            size: 8,
            checkInterval: true,
            percentStick: true,
            sizePointNormalState: 0
        });

        assert.deepEqual(chart._argumentAxes[0].setMarginOptions.lastCall.args[0], {
            size: 8,
            checkInterval: true,
            percentStick: true,
            sizePointNormalState: 0
        });
    });

    QUnit.test('Merge options witout size', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({}));

        const chart = this.createChart({
            series: [{}]
        });

        assert.deepEqual(chart.getValueAxis().setMarginOptions.lastCall.args[0].size, 0);
    });

    QUnit.test('Pass merged marginOptions to axes when two value axis', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({
            marginOptions: {
                checkInterval: false,
                size: 8,
                percentStick: false
            }
        }));

        chartMocks.seriesMockData.series.push(new MockSeries({
            marginOptions: {
                checkInterval: true,
                size: 5,
                percentStick: true
            }
        }));

        const chart = this.createChart({
            series: [{
                axis: 'axis1'
            }, {
                axis: 'axis2'
            }],
            valueAxis: [{
                name: 'axis1'
            }, {
                name: 'axis2'
            }]
        });

        assert.deepEqual(chart.getValueAxis('axis1').setMarginOptions.lastCall.args[0], {
            checkInterval: false,
            size: 8,
            percentStick: false,
            sizePointNormalState: 0
        });

        assert.deepEqual(chart.getValueAxis('axis2').setMarginOptions.lastCall.args[0], {
            checkInterval: true,
            size: 5,
            percentStick: true,
            sizePointNormalState: 0
        });

        assert.deepEqual(chart.getArgumentAxis().setMarginOptions.lastCall.args[0], {
            size: 8,
            checkInterval: true,
            percentStick: true,
            sizePointNormalState: 0
        });
    });

    QUnit.test('Process margin for bubble', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({
            marginOptions: {
                processBubbleSize: true
            }
        }));

        const chart = this.createChart({
            series: [{}],
            panes: [{
                name: 'pane1'
            }, {
                name: 'pane2'
            }],
            maxBubbleSize: 0.2,
            size: {
                width: 1000,
                height: 800
            }
        });

        assert.deepEqual(chart.getValueAxis().setMarginOptions.lastCall.args[0].size, 80);
    });

    QUnit.test('Process margin for bubble. Rotated chart', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({
            marginOptions: {
                processBubbleSize: true
            }
        }));

        const chart = this.createChart({
            series: [{}],
            rotated: true,
            panes: [{
                name: 'pane1'
            }, {
                name: 'pane2'
            }],
            maxBubbleSize: 0.2,
            size: {
                width: 1000,
                height: 800
            }
        });

        assert.deepEqual(chart.getValueAxis().setMarginOptions.lastCall.args[0].size, 100);
    });

    QUnit.test('pointSize merging', function (assert) {
        chartMocks.seriesMockData.series.push(new MockSeries({
            marginOptions: {
                checkInterval: false,
                size: 8,
                percentStick: true,
                sizePointNormalState: 8
            }
        }));

        chartMocks.seriesMockData.series.push(new MockSeries({
            marginOptions: {
                checkInterval: true,
                size: 5,
                percentStick: false,
                sizePointNormalState: 5
            }
        }));

        const chart = this.createChart({
            series: [{}, {}]
        });

        assert.deepEqual(chart._argumentAxes[0].setMarginOptions.lastCall.args[0], {
            size: 8,
            checkInterval: true,
            percentStick: true,
            sizePointNormalState: 8
        });
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
//# sourceMappingURL=chart.part2.tests.js.map