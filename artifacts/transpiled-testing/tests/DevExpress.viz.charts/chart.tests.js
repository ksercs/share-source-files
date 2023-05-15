!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/chart.tests.js"], ["jquery","core/utils/common","../../helpers/vizMocks.js","viz/series/base_series","viz/series/points/base_point","viz/axes/base_axis","viz/core/title","viz/components/data_validator","viz/components/legend","core/errors.js","viz/translators/range","viz/chart_components/layout_manager","data/data_source/data_source","viz/chart"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.charts/chart.tests.js', ['jquery', 'core/utils/common', '../../helpers/vizMocks.js', 'viz/series/base_series', 'viz/series/points/base_point', 'viz/axes/base_axis', 'viz/core/title', 'viz/components/data_validator', 'viz/components/legend', 'core/errors.js', 'viz/translators/range', 'viz/chart_components/layout_manager', 'data/data_source/data_source', 'viz/chart'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const seriesModule = $__require('viz/series/base_series');
    const pointModule = $__require('viz/series/points/base_point');
    const axisModule = $__require('viz/axes/base_axis');
    const titleModule = $__require('viz/core/title');
    const dataValidatorModule = $__require('viz/components/data_validator');
    const legendModule = $__require('viz/components/legend');
    const errors = $__require('core/errors.js');
    const rangeModule = $__require('viz/translators/range');
    const layoutManagerModule = $__require('viz/chart_components/layout_manager');
    const LayoutManager = vizMocks.stubClass(layoutManagerModule.LayoutManager);
    const Legend = vizMocks.Legend;
    const ChartTitle = vizMocks.Title;
    const Axis = vizMocks.stubClass(axisModule.Axis);
    const Range = vizMocks.stubClass(rangeModule.Range);
    const DataSource = $__require('data/data_source/data_source').DataSource;
    const DataSourceMock = vizMocks.stubClass(DataSource);

    $__require('viz/chart');

    const environment = {
        beforeEach: function () {
            this.options = {
                legend: {
                    visible: true
                },
                title: {
                    text: 'Title'
                }
            };

            this._stubLayoutManager();
            this._stubLegend();
            this._stubTitle();
            this._stubAxis();
            this._stubRange();
            this._stubSeriesAndPoint();
            this._stubValidateData();
        },
        afterEach: function () {
            this._restoreValidateData();
            rangeModule.Range.restore();
            axisModule.Axis.restore();
            layoutManagerModule.LayoutManager.restore();
            seriesModule.Series.restore();
            pointModule.Point.restore();

            this.Title.restore();
            this.Legend.restore();
        },
        createChart: function () {
            this.container = $('<div>');
            const chart = this.container.appendTo($('#qunit-fixture')).dxChart(this.options).dxChart('instance');

            this.layoutManagers = this.LayoutManager.returnValues;
            this.titles = this.Title.returnValues;
            this.legends = this.Legend.returnValues;
            this.axes = this.Axis.returnValues;

            return chart;
        },
        _stubLayoutManager: function () {
            this.LayoutManager = sinon.stub(layoutManagerModule, 'LayoutManager').callsFake(function () {
                return new LayoutManager(arguments);
            });
        },
        _stubLegend: function () {
            this.Legend = sinon.stub(legendModule, 'Legend').callsFake(function () {
                const legend = new Legend();
                legend.getTemplatesGroups = sinon.spy(function () {
                    return [];
                });
                legend.getTemplatesDef = sinon.spy(function () {
                    return [];
                });
                return legend;
            });
        },
        _stubTitle: function () {
            this.Title = sinon.stub(titleModule, 'Title').callsFake(function () {
                return new ChartTitle();
            });
        },
        _stubAxis: function () {
            this.Axis = sinon.stub(axisModule, 'Axis').callsFake(function () {
                const axis = new Axis();
                axis.updateOptions = sinon.spy(function (options) {
                    axis.name = options.name;
                    axis.pane = options.pane;
                });
                axis.setPane = function (pane) {
                    axis.pane = pane;
                };
                axis.adjust = noop;
                axis.estimateMargins = function () {
                    return { left: 0, top: 0, right: 0, bottom: 0 };
                };
                axis.stub('getMargins').returns({ left: 0, top: 0, right: 0, bottom: 0 });
                axis.stub('getOptions').returns({});
                axis.stub('getTemplatesGroups').returns([]);
                return axis;
            });
        },
        _stubRange: function () {
            sinon.stub(rangeModule, 'Range').callsFake(function (opt) {
                const range = new Range();
                $.extend(range, opt);
                return range;
            });
        },
        _stubSeriesAndPoint: function () {
            sinon.stub(seriesModule, 'Series').callsFake(function () {
                const series = new vizMocks.Series();

                return series;
            });

            sinon.stub(pointModule, 'Point').callsFake(function () {
                return new vizMocks.Point();
            });
        },
        _stubValidateData: function () {
            this.validateData = sinon.stub(dataValidatorModule, 'validateData');
        },
        _restoreValidateData: function () {
            this.validateData.restore();
        }
    };

    QUnit.module('Layout Manager', environment);

    QUnit.test('Create', function (assert) {
        this.createChart();

        assert.equal(this.LayoutManager.callCount, 1);
        assert.ok(this.LayoutManager.calledWithNew());
    });

    QUnit.test('Chart should have default value of the aggregateByCategory = true', function (assert) {
        this.createChart();
        const argumentAxisOptions = this.Axis.getCall(0).returnValue.updateOptions.getCall(0).args[0];

        assert.strictEqual(argumentAxisOptions.aggregateByCategory, true);
    });

    QUnit.test('Chart should be able to change the aggregateByCategory setting', function (assert) {
        this.options = {
            argumentAxis: {
                aggregateByCategory: false
            }
        };
        this.createChart();
        const axisOptions = this.Axis.getCall(0).returnValue.updateOptions.getCall(0).args[0];

        assert.strictEqual(axisOptions.aggregateByCategory, false);
    });

    QUnit.test('Chart should change the aggregateByCategory value when the value was updated', function (assert) {
        const chart = this.createChart();

        chart.option('argumentAxis', { aggregateByCategory: false });

        const axisOptions = this.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0];

        assert.strictEqual(axisOptions.aggregateByCategory, false);
    });

    QUnit.test('Should show warning if deprecated "argumentAxis.aggregateByCategory" option is used', function (assert) {
        sinon.spy(errors, 'log');

        try {
            this.options = {
                argumentAxis: {
                    aggregateByCategory: true
                }
            };
            this.createChart();

            assert.deepEqual(errors.log.lastCall.args, ['W0001', 'dxChart', 'argumentAxis.aggregateByCategory', '23.1', 'Use the aggregation.enabled property']);
        } finally {
            errors.log.restore();
        }
    });

    QUnit.test('Set adaptive layout options', function (assert) {
        this.createChart();

        assert.deepEqual(this.LayoutManager.firstCall.returnValue.setOptions.lastCall.args, [{ width: 80, height: 80, keepLabels: true }]);
    });

    QUnit.module('dxChart user options of dataValidator', environment);

    QUnit.test('dataPrepareSettings', function (assert) {
        this.options = {
            dataPrepareSettings: {
                checkTypeForAllData: true,
                convertToAxisDataType: false,
                sortingMethod: noop
            }
        };
        this.createChart();

        assert.deepEqual(this.validateData.lastCall.args[3], {
            checkTypeForAllData: true,
            convertToAxisDataType: false,
            sortingMethod: noop
        });
    });

    QUnit.test('dataPrepareSettings change', function (assert) {
        this.options = {
            dataPrepareSettings: {
                checkTypeForAllData: true,
                convertToAxisDataType: false,
                sortingMethod: noop
            }
        };
        const chart = this.createChart();

        chart.option('dataPrepareSettings', {
            checkTypeForAllData: false,
            convertToAxisDataType: true,
            sortingMethod: noop
        });

        assert.deepEqual(this.validateData.lastCall.args[3], {
            checkTypeForAllData: false,
            convertToAxisDataType: true,
            sortingMethod: noop
        });
    });

    QUnit.module('integration with dataSource', environment);

    QUnit.test('Creation dataSource', function (assert) {
        this.options = { dataSource: [{}], series: [{}] };
        const chart = this.createChart();

        assert.ok(chart.getDataSource() instanceof DataSource, 'dataSource created');
    });

    QUnit.test('Loading dataSource', function (assert) {
        this.options = { dataSource: [{}], series: [{}] };
        const chart = this.createChart();
        const ds = chart.getDataSource();

        assert.ok(ds.isLoaded(), 'data is loaded');
        assert.deepEqual(ds.items(), [{}], 'items');
    });

    QUnit.test('dataSource instance', function (assert) {
        const dataSource = new DataSourceMock();
        this.options = { dataSource: dataSource, series: [{}] };
        const chart = this.createChart();

        assert.deepEqual(chart.getDataSource(), dataSource);
    });

    QUnit.test('dataSource, paginate', function (assert) {
        const ds = [];
        for (let i = 0; i < 100; i++) {
            ds.push(i);
        }
        this.options = { dataSource: ds, series: [{}] };
        const chart = this.createChart();

        assert.equal(chart.getDataSource().isLastPage(), true, 'data on one page');
    });

    QUnit.test('null dataSource', function (assert) {
        this.options = { series: [{}] };
        const chart = this.createChart();

        assert.ok(!chart.getDataSource(), 'dataSource should not created');
    });

    QUnit.test('data initialization after load dataSource', function (assert) {
        this.options = { dataSource: [{}], series: [{}] };
        this.createChart();

        assert.equal(this.validateData.callCount, 1);
        assert.deepEqual(this.validateData.lastCall.args[0], [{}]);
    });

    QUnit.test('update dataSource after option changing', function (assert) {
        const chart = this.createChart();

        chart.option('dataSource', [{}]);
        const ds = chart.getDataSource();

        assert.ok(ds.isLoaded());
        assert.deepEqual(ds.items(), [{}]);
    });

    QUnit.test('update with null dataSource', function (assert) {
        this.options = { dataSource: [{}], series: [{}] };
        const chart = this.createChart();

        chart.option('dataSource', null);
        const ds = chart.getDataSource();

        assert.ok(!ds);
        assert.equal(this.validateData.callCount, 2);
    });

    QUnit.test('changed event', function (assert) {
        const dataSource = new DataSourceMock();
        this.options = { dataSource: dataSource, series: [{}] };
        this.createChart();

        assert.deepEqual(dataSource.on.getCall(0).args[0], 'changed');

        dataSource.on.getCall(0).args[1]();
        assert.equal(this.validateData.callCount, 2);
    });

    QUnit.test('loadError event', function (assert) {
        const dataSource = new DataSourceMock();
        this.options = { dataSource: dataSource, series: [{}] };
        this.createChart();

        assert.deepEqual(dataSource.on.getCall(1).args[0], 'loadError');

        dataSource.on.getCall(1).args[1]();
        assert.equal(this.validateData.callCount, 2);
    });

    QUnit.test('disposing', function (assert) {
        const dataSource = new DataSourceMock();
        this.options = { dataSource: dataSource, series: [{}] };
        const chart = this.createChart();

        this.container.remove();

        assert.strictEqual(chart.getDataSource(), null);
    });

    QUnit.module('API', environment);

    QUnit.test('getValueAxis. Call without name.', function (assert) {
        this.options = {
            dataSource: [{
                arg: 'January',
                val1: 4.1,
                val2: 109
            }, {
                arg: 'February',
                val1: 5.8,
                val2: 104
            }],
            panes: [{
                name: 'topPane'
            }, {
                name: 'bottomPane'
            }],
            series: [{
                pane: 'topPane',
                valueField: 'minT'
            }, {
                valueField: 'prec'
            }],
            defaultPane: 'topPane',
            valueAxis: [{
                pane: 'bottomPane',
                name: 'first'
            }, {
                pane: 'topPane',
                name: 'second'
            }, {
                pane: 'topPane',
                name: 'third'
            }],
            synchronizeMultiAxes: false
        };
        const chart = this.createChart();
        const valueAxis = chart.getValueAxis();

        assert.ok(valueAxis instanceof Axis);
        assert.strictEqual(valueAxis.name, 'second', 'first axis from default pane');
    });

    QUnit.test('getValueAxis. With name', function (assert) {
        this.options = {
            dataSource: [{
                arg: '1750',
                val1: 106000000,
                val2: 791000000
            }, {
                arg: '1800',
                val1: 107000000,
                val2: 978000000
            }],
            series: [{
                valueField: 'val1'
            }, {
                axis: 'second',
                valueField: 'val2'
            }],
            valueAxis: [{
                name: 'first'
            }, {
                name: 'second'
            }],
            synchronizeMultiAxes: false
        };
        const chart = this.createChart();
        const valueAxis = chart.getValueAxis('second');

        assert.ok(valueAxis instanceof Axis);
        assert.strictEqual(valueAxis.name, 'second');
    });

    QUnit.test('getArgumentAxis', function (assert) {
        const chart = this.createChart();
        const argumentAxis = chart.getArgumentAxis();

        assert.ok(argumentAxis instanceof Axis);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","../../helpers/vizMocks.js","viz/series/base_series","viz/series/points/base_point","viz/axes/base_axis","viz/core/title","viz/components/data_validator","viz/components/legend","core/errors.js","viz/translators/range","viz/chart_components/layout_manager","data/data_source/data_source","viz/chart"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("../../helpers/vizMocks.js"), require("viz/series/base_series"), require("viz/series/points/base_point"), require("viz/axes/base_axis"), require("viz/core/title"), require("viz/components/data_validator"), require("viz/components/legend"), require("core/errors.js"), require("viz/translators/range"), require("viz/chart_components/layout_manager"), require("data/data_source/data_source"), require("viz/chart"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=chart.tests.js.map