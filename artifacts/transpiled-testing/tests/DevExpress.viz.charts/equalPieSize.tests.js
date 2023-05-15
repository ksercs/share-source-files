!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/equalPieSize.tests.js"], ["jquery","../../helpers/vizMocks.js","./chartParts/commons.js","viz/components/data_validator","viz/chart_components/layout_manager","viz/pie_chart","../../helpers/chartMocks.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.charts/equalPieSize.tests.js', ['jquery', '../../helpers/vizMocks.js', './chartParts/commons.js', 'viz/components/data_validator', 'viz/chart_components/layout_manager', 'viz/pie_chart', '../../helpers/chartMocks.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;

    const $ = $__require('jquery');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const commons = $__require('./chartParts/commons.js');
    const dataValidatorModule = $__require('viz/components/data_validator');
    const layoutManagerModule = $__require('viz/chart_components/layout_manager');
    const dxPieChart = $__require('viz/pie_chart');
    const chartMocks = $__require('../../helpers/chartMocks.js');
    const MockSeries = chartMocks.MockSeries;
    const MockPoint = chartMocks.MockPoint;
    const insertMockFactory = chartMocks.insertMockFactory;
    const restoreMockFactory = chartMocks.restoreMockFactory;
    const resetMockFactory = chartMocks.resetMockFactory;

    function getContainer(hidden) {
        const div = $('<div>').appendTo('#qunit-fixture');
        hidden && div.hide();
        return div;
    }

    function getPieChecker(x, y, r, assert, done) {
        return function (e) {
            assert.strictEqual(e.component.layoutManager.applyEqualPieChartLayout.lastCall.args[0][0], e.component.series[0]);
            assert.deepEqual(e.component.layoutManager.applyEqualPieChartLayout.lastCall.args[1], {
                drawOptions: {
                    adjustAxes: true,
                    animate: true,
                    animationPointsLimit: 300,
                    drawLegend: true,
                    drawTitle: true,
                    force: true,
                    hideLayoutLabels: true,
                    recreateCanvas: true
                },
                x: x,
                y: y,
                radius: r
            });

            done();
        };
    }

    function setupMocks() {
        insertMockFactory();

        this.stubPoints = [new MockPoint({ argument: 'First', value: 10, visible: true }), new MockPoint({ argument: 'Second', value: 11, visible: true }), new MockPoint({ argument: 'Third', value: 12, visible: true })];
    }

    function checkCorrectPosition(assert, correctPos, x, y, outer, inner, canvas) {
        assert.equal(correctPos[0].centerX, x, 'centerX');
        assert.equal(correctPos[0].centerY, y, 'centerY');
        assert.equal(correctPos[0].radiusOuter, outer, 'radiusOuter');
        assert.equal(correctPos[0].radiusInner, inner, 'radiusInner');
        assert.deepEqual(correctPos[1], canvas, 'canvas');
    }

    const dataSourceTemplate = [{ cat: 'First', val: 100 }, { cat: 'Second', val: 200 }, { cat: 'Third', val: 300 }];

    commons.rendererModule.Renderer = sinon.spy(function (parameters) {
        return new vizMocks.Renderer(parameters);
    });

    const environment = {
        beforeEach: function () {
            setupMocks.call(this);

            this.originalLayoutManagerCtor = layoutManagerModule.LayoutManager;
            this.LayoutManager = sinon.stub(layoutManagerModule, 'LayoutManager');

            this.validateData = sinon.stub(dataValidatorModule, 'validateData').callsFake(function (data) {
                return { arg: data || [] };
            });
        },
        afterEach: function () {
            this.LayoutManager.restore();
            this.validateData.restore();

            commons.resetModules();
            resetMockFactory();
            restoreMockFactory();
        },
        createPieChart: function (options, layout, minLayout) {
            this._pieCounter = this._pieCounter || 0;

            const layoutManager = sinon.createStubInstance(this.originalLayoutManagerCtor);
            layoutManager.needMoreSpaceForPanesCanvas.returns(true);
            layoutManager.applyPieChartSeriesLayout.returns(layout);
            layoutManager.applyEqualPieChartLayout.returns(minLayout);

            this.LayoutManager.onCall(this._pieCounter++).returns(layoutManager);

            return new dxPieChart(getContainer(options.hidden), options);
        }
    };

    QUnit.module('Get layout from LayoutManagers', environment);

    QUnit.test('Create pies without groups. Get individual layout', function (assert) {
        const done = assert.async(2);

        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));
        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));

        this.createPieChart({
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: checkPie(done, 100, 200, 300, 0)
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} });
        this.createPieChart({
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: checkPie(done, 150, 250, 200, 0)
        }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });

        function checkPie(done, x, y, rOuter, rInner) {
            return function (e) {
                const series = e.component.series[0];

                assert.equal(series.drawLabelsWOPoints.callCount, 1);
                checkCorrectPosition(assert, series.correctPosition.lastCall.args, x, y, rOuter, rInner, e.component.DEBUG_canvas);
                assert.equal(series.correctRadius.lastCall.args[0].radiusOuter, rOuter, 'correction radiusOuter');
                assert.equal(series.correctRadius.lastCall.args[0].radiusInner, rInner, 'correction radiusInner');
                assert.equal(series.draw.callCount, 1);
                done();
            };
        }
    });

    QUnit.test('Create pies with group. Get common layout', function (assert) {
        const done = assert.async(2);

        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));
        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));

        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: checkPie(done, 150, 250, 200, 0)
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });
        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: checkPie(done, 150, 250, 200, 0)
        }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });

        function checkPie(done, x, y, rOuter, rInner) {
            return function (e) {
                const series = e.component.series[0];

                assert.equal(series.drawLabelsWOPoints.callCount, 2);
                checkCorrectPosition(assert, series.correctPosition.lastCall.args, x, y, rOuter, rInner, e.component.DEBUG_canvas);
                assert.ok(series.drawLabelsWOPoints.lastCall.calledAfter(series.correctPosition.lastCall));
                assert.equal(series.correctRadius.lastCall.args[0].radiusOuter, rOuter, 'correction radiusOuter');
                assert.equal(series.correctRadius.lastCall.args[0].radiusInner, rInner, 'correction radiusInner');
                assert.deepEqual(e.component.layoutManager.correctPieLabelRadius.lastCall.args, [e.component.series, e.component.layoutManager.applyEqualPieChartLayout.lastCall.returnValue, e.component.DEBUG_canvas]);
                assert.equal(series.draw.callCount, 1);
                done();
            };
        }
    });

    QUnit.module('Pass common layout to LayoutManagers', environment);

    QUnit.test('Create pies without groups. Do not ask for common layout', function (assert) {
        const done = assert.async(2);

        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));
        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));

        this.createPieChart({
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: checkPie
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} });
        this.createPieChart({
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: checkPie
        }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });

        function checkPie(e) {
            assert.equal(e.component.layoutManager.applyEqualPieChartLayout.callCount, 0);
            done();
        }
    });

    QUnit.test('Create pies with same group. Ask for common layout', function (assert) {
        const checkPie = getPieChecker(150, 250, 200, assert, assert.async(2));

        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));
        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));

        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: checkPie
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });
        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: checkPie
        }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });
    });

    QUnit.test('Create pies with same group, but one pie is hidden. Do not ask hidden pie for its layout', function (assert) {
        const done = assert.async(1);
        const checkPie = getPieChecker(150, 250, 200, assert, done);

        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));
        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));

        this.createPieChart({
            hidden: true,
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: done
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} });
        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: checkPie
        }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });
    });

    QUnit.test('Create two sets of pies with different groups. Ask corresponding common layout', function (assert) {
        const done = assert.async(4);

        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));
        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));
        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));
        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));

        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: getPieChecker(150, 250, 200, assert, done)
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });
        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: getPieChecker(150, 250, 200, assert, done)
        }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });

        this.createPieChart({
            sizeGroup: 'group2',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: getPieChecker(200, 300, 100, assert, done)
        }, { radiusInner: 0, radiusOuter: 100, centerX: 200, centerY: 300, canvas: {} }, { radiusInner: 0, radiusOuter: 100, centerX: 200, centerY: 300, canvas: {} });
        this.createPieChart({
            sizeGroup: 'group2',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: getPieChecker(200, 300, 100, assert, done)
        }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });
    });

    QUnit.test('Have pies with group. Add new pie to the same group. Ask common layout for all pies', function (assert) {
        const checkPie = getPieChecker(200, 300, 100, assert, assert.async(3));

        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));
        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));
        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));

        const skipFirstCallAndCreateNewPie = function (that) {
            let firstCall = true;
            return function (e) {
                if (firstCall) {
                    that.createPieChart({
                        sizeGroup: 'group1',
                        dataSource: dataSourceTemplate,
                        series: [{}],
                        onDrawn: checkPie
                    }, { radiusInner: 0, radiusOuter: 100, centerX: 200, centerY: 300, canvas: {} }, { radiusInner: 0, radiusOuter: 100, centerX: 200, centerY: 300, canvas: {} });
                } else {
                    checkPie(e);
                }
                firstCall = false;
            };
        };

        const skipFirstCall = function () {
            let skipped = false;
            return function (e) {
                skipped && checkPie(e);
                skipped = true;
            };
        }();

        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: skipFirstCallAndCreateNewPie(this)
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });
        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: skipFirstCall
        }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });
    });

    QUnit.module('Misc', environment);

    QUnit.test('Have pies with group. Change group of one pie. Redraw only changed pie', function (assert) {
        const done = assert.async(2);
        assert.expect(0);

        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));

        const changeGroupOnFirstCall = function () {
            let firstCall = true;
            return function (e) {
                if (firstCall) {
                    e.component.option('sizeGroup', 'group2');
                }
                done();
                firstCall = false;
            };
        }();

        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: changeGroupOnFirstCall
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });
    });

    QUnit.test('Do not touch disposed pies', function (assert) {
        const done = assert.async(3);
        assert.expect(0);

        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));
        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));

        const killPieAndChangeGroupOnFirstCall = function (pieToKill) {
            let firstCall = true;
            return function (e) {
                if (firstCall) {
                    pieToKill.$element().remove();
                    e.component.option('sizeGroup', 'group2');
                }
                done();
                firstCall = false;
            };
        };

        const pie1 = this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: done
        }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });

        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: killPieAndChangeGroupOnFirstCall(pie1)
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });
    });

    QUnit.test('Create pies with group. Series should be animated', function (assert) {
        const done = assert.async(1);

        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));

        this.createPieChart({
            sizeGroup: 'group1',
            dataSource: dataSourceTemplate,
            series: [{}],
            onDrawn: check
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });

        function check(e) {
            assert.ok(e.component.series[0].wasAnimated);
            done();
        }
    });

    QUnit.test('Hide labes after first measuring render', function (assert) {
        const series1 = new MockSeries({ points: this.stubPoints });
        chartMocks.seriesMockData.series.push(series1);

        series1.drawLabelsWOPoints = sinon.spy(function () {
            return true;
        });

        chartMocks.seriesMockData.series.push(new MockSeries({ points: this.stubPoints }));

        const pie = this.createPieChart({
            dataSource: dataSourceTemplate,
            series: [{}]
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} }, { radiusInner: 0, radiusOuter: 200, centerX: 150, centerY: 250, canvas: {} });

        const series = pie.series[0];

        assert.equal(pie.layoutManager.applyPieChartSeriesLayout.callCount, 2);
        assert.equal(series.drawLabelsWOPoints.callCount, 1);
        assert.equal(series.hideLabels.callCount, 1);
        assert.ok(series.hideLabels.lastCall.calledAfter(pie.layoutManager.applyPieChartSeriesLayout.lastCall));
    });

    QUnit.test('Create pie with group but w/o series. Do not ask for common layout. T602149', function (assert) {
        const done = assert.async();

        this.createPieChart({
            sizeGroup: 'group1',
            onDrawn: checkPie
        }, { radiusInner: 0, radiusOuter: 300, centerX: 100, centerY: 200, canvas: {} });

        function checkPie(e) {
            assert.equal(e.component.layoutManager.applyEqualPieChartLayout.callCount, 0);
            done();
        }
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","./chartParts/commons.js","viz/components/data_validator","viz/chart_components/layout_manager","viz/pie_chart","../../helpers/chartMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("./chartParts/commons.js"), require("viz/components/data_validator"), require("viz/chart_components/layout_manager"), require("viz/pie_chart"), require("../../helpers/chartMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=equalPieSize.tests.js.map