!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.rangeSelector/common.part1.tests.js"], ["jquery","viz/range_selector/tracker","data/data_source/data_source","viz/range_selector/series_data_source","./rangeSelectorParts/commons.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.rangeSelector/common.part1.tests.js', ['jquery', 'viz/range_selector/tracker', 'data/data_source/data_source', 'viz/range_selector/series_data_source', './rangeSelectorParts/commons.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const trackerModule = $__require('viz/range_selector/tracker');
    const DataSource = $__require('data/data_source/data_source').DataSource;
    const seriesDataSourceModule = $__require('viz/range_selector/series_data_source');
    const commons = $__require('./rangeSelectorParts/commons.js');

    QUnit.module('Basic', commons.environment);

    QUnit.test('Renderer', function (assert) {
        this.createWidget();

        assert.deepEqual(this.renderer.root.css.lastCall.args, [{ 'touch-action': 'pan-y' }], 'root settings');
    });

    // B219560
    QUnit.test('startValue equals endValue', function (assert) {
        this.createWidget({
            scale: {
                startValue: 1,
                endValue: 1
            }
        });

        const options = this.axis.updateOptions.lastCall.args[0];
        assert.strictEqual(options.startValue, undefined, 'start value');
        assert.strictEqual(options.endValue, undefined, 'end value');
    });

    // T282809
    QUnit.test('one category', function (assert) {
        this.createWidget({
            scale: {
                categories: ['q1']
            }
        });

        const options = this.axis.updateOptions.lastCall.args[0];
        assert.strictEqual(options.startValue, 'q1', 'start value');
        assert.strictEqual(options.endValue, 'q1', 'end value');
    });

    QUnit.test('Pass containerBackgroundColor to scale', function (assert) {
        this.createWidget({
            containerBackgroundColor: 'red'
        });

        const options = this.axis.updateOptions.lastCall.args[0];
        assert.deepEqual(options.containerColor, 'red');
    });

    QUnit.test('default selected range', function (assert) {
        this.createWidget({
            scale: {
                startValue: 2,
                endValue: 50
            }
        });

        const options = this.axis.updateOptions.lastCall.args[0];
        assert.strictEqual(options.startValue, 2);
        assert.strictEqual(options.endValue, 50);
    });

    QUnit.test('format when tickInterval is not defined', function (assert) {
        this.createWidget({
            scale: {
                startValue: new Date(2010, 2, 23),
                endValue: new Date(2010, 5, 10),
                tickInterval: null,
                marker: {
                    visible: true
                }
            }
        });

        assert.strictEqual(this.axis.updateOptions.lastCall.args[0].label.format, 'day', 'date time format');
    });

    // T152860
    QUnit.test('no format value with empty data', function (assert) {
        this.createWidget({
            scale: {
                label: {
                    format: {
                        format: 'monthYear',
                        dateType: 'full'
                    }
                },
                minorTickInterval: 'month',
                tickInterval: 'month'
            },
            sliderMarker: {
                format: {
                    format: 'monthYear',
                    dateType: 'full'
                }
            }
        });

        assert.equal(this.axis.setBusinessRange.lastCall.args[0].isEmpty(), true);
    });

    QUnit.test('rangeSelector info callback on small tick interval', function (assert) {
        this.createWidget({
            scale: {
                startValue: 0,
                endValue: 10000,
                tickInterval: 1
            }
        });

        assert.equal(this.axis.updateOptions.lastCall.args[0].tickInterval, 1000);
    });

    QUnit.test('initialize with numeric inverted scale', function (assert) {
        this.createWidget({
            scale: {
                startValue: 50,
                endValue: 2,
                tickInterval: 2
            }
        });

        const range = this.axis.setBusinessRange.lastCall.args[0];
        assert.ok(range.invert, 'invert');
        assert.equal(range.min, 2, 'min');
        assert.equal(range.max, 50, 'max');
    });

    QUnit.test('initialize with dateTime inverted scale', function (assert) {
        this.createWidget({
            scale: {
                startValue: new Date(2012, 1, 1),
                endValue: new Date(2010, 5, 1)
            }
        });

        const range = this.axis.setBusinessRange.lastCall.args[0];
        assert.ok(range.invert, 'invert');
        assert.deepEqual(range.min, new Date(2010, 5, 1), 'min');
        assert.deepEqual(range.max, new Date(2012, 1, 1), 'max');
    });

    QUnit.test('initialize with logarithmic axis', function (assert) {
        this.createWidget({
            scale: {
                startValue: 1,
                endValue: 10,
                type: 'logarithmic',
                logarithmBase: 10
            }
        });

        const range = this.axis.setBusinessRange.lastCall.args[0];
        assert.equal(range.min, 1, 'min');
        assert.equal(range.max, 10, 'max');
        assert.equal(range.axisType, 'logarithmic', 'axisType');
        assert.equal(range.base, 10, 'base');
    });

    QUnit.test('Pass series dataType to range', function (assert) {
        this.seriesDataSource.stub('getBoundRange').returns({
            arg: new commons.StubRange(),
            val: new commons.StubRange()
        });
        this.seriesDataSource.stub('getCalculatedValueType').returns('datetime');

        this.createWidget({
            dataSource: [{}],
            chart: {
                series: [{}]
            },
            scale: {}
        });

        const range = this.axis.setBusinessRange.lastCall.args[0];
        assert.equal(range.addRange.firstCall.args[0].dataType, 'datetime');
    });

    // T153827
    QUnit.test('correct sliders place holder size by values', function (assert) {
        this.createWidget({
            scale: {
                startValue: 0,
                endValue: 500000,
                minorTickInterval: 2000
            }
        });

        assert.deepEqual(this.rangeView.update.lastCall.args[2], { left: 0, top: 0, width: 299, height: 24, right: 0, bottom: 0 });
    });

    QUnit.test('Tracker creation', function (assert) {
        const spy = sinon.spy(trackerModule, 'Tracker');
        this.createWidget();

        assert.deepEqual(spy.lastCall.args, [{ renderer: this.renderer, controller: this.slidersController }]);
    });

    QUnit.test('Tracker options', function (assert) {
        this.createWidget({
            behavior: {
                moveSelectedRangeByClick: 'value-1',
                manualRangeSelectionEnabled: 'value-2'
            }
        });

        assert.deepEqual(this.tracker.update.lastCall.args, [true, {
            moveSelectedRangeByClick: 'value-1',
            manualRangeSelectionEnabled: 'value-2'
        }]);
    });

    QUnit.module('DataSource', commons.environment);

    QUnit.test('Creation', function (assert) {
        this.seriesDataSource.stub('getBoundRange').returns({
            arg: new commons.StubRange(),
            val: new commons.StubRange()
        });
        const widget = this.createWidget({ dataSource: [1, 2, 3] });
        const ds = widget.getDataSource();

        assert.ok(ds instanceof DataSource);
        assert.deepEqual(ds.items(), [1, 2, 3]);
    });

    QUnit.module('isReady', $.extend({}, commons.environment, {
        beforeEach: function () {
            commons.environment.beforeEach.apply(this, arguments);
            this.seriesDataSource.stub('isShowChart').returns(true);
            this.seriesDataSource.stub('getBoundRange').returns({
                arg: new commons.StubRange(),
                val: new commons.StubRange()
            });
        }
    }));

    QUnit.test('dataSource is not loaded', function (assert) {
        const ds = new DataSource();
        ds.isLoaded = sinon.stub().returns(false);
        const rangeSelector = this.createWidget({ dataSource: ds });

        assert.strictEqual(rangeSelector.isReady(), false, 'ready state');
        assert.ok(!this.renderer.stub('onEndAnimation').called, 'end animation');
    });

    QUnit.test('dataSource is loaded', function (assert) {
        const ds = new DataSource();
        ds.isLoaded = sinon.stub().returns(true);
        const rangeSelector = this.createWidget({ dataSource: ds });

        assert.strictEqual(rangeSelector.isReady(), false, 'ready state before end animation');
        this.renderer.onEndAnimation.lastCall.args[0]();
        assert.strictEqual(rangeSelector.isReady(), true, 'ready state after end animation');
    });

    QUnit.test('Update axis canvas before create series dataSorce', function (assert) {
        const spy = sinon.spy(seriesDataSourceModule, 'SeriesDataSource');
        this.seriesDataSource.stub('getBoundRange').returns({
            arg: new commons.StubRange(),
            val: new commons.StubRange()
        });

        this.createWidget({
            dataSource: [{}],
            chart: {}
        });

        const argumentAxis = spy.lastCall.args[0].argumentAxis;

        assert.deepEqual(argumentAxis.getTranslator().update.firstCall.args[0].isEmpty(), true);
        assert.deepEqual(argumentAxis.getTranslator().update.firstCall.args[1], {
            height: 150,
            left: 0,
            top: 0,
            width: 300
        });
        assert.deepEqual(argumentAxis.getTranslator().update.firstCall.args[2], { isHorizontal: true });
        assert.ok(argumentAxis.getTranslator().update.firstCall.calledBefore(spy.firstCall));
    });

    QUnit.test('Pass all scale options to axis on first update', function (assert) {
        this.createWidget({
            dataSource: [{}],
            chart: {},
            scale: {
                someOptions: true
            }
        });

        const options = this.axis.updateOptions.secondCall.args[0];
        assert.strictEqual(options.someOptions, true);
    });
    QUnit.module('logarithmic type', commons.environment);

    QUnit.test('scale. logarithmic type', function (assert) {
        this.createWidget({
            scale: {
                startValue: 0.001,
                endValue: 1000,
                type: 'logarithmic',
                logarithmBase: 2
            }
        });

        const options = this.axis.updateOptions.lastCall.args[0];
        assert.strictEqual(options.startValue, 0.001);
        assert.strictEqual(options.endValue, 1000);
        assert.strictEqual(options.type, 'logarithmic');
        assert.strictEqual(options.logarithmBase, 2);
    });

    QUnit.test('scale. not valid logarithmBase, less than zero', function (assert) {
        const spy = sinon.spy();
        this.createWidget({
            scale: {
                startValue: 0.001,
                endValue: 1000,
                type: 'logarithmic',
                logarithmBase: -10
            },
            onIncidentOccurred: spy
        });

        const options = this.axis.updateOptions.lastCall.args[0];
        assert.strictEqual(options.startValue, 0.001);
        assert.strictEqual(options.endValue, 1000);
        assert.strictEqual(options.type, 'logarithmic');
        assert.strictEqual(options.logarithmBase, 10);
        assert.strictEqual(spy.getCall(0).args[0].target.id, 'E2104', 'incident');
    });

    QUnit.test('scale. not valid logarithmBase, equal zero', function (assert) {
        const spy = sinon.spy();
        this.createWidget({
            scale: {
                startValue: 0.001,
                endValue: 1000,
                type: 'logarithmic',
                logarithmBase: 0
            },
            onIncidentOccurred: spy
        });

        const options = this.axis.updateOptions.lastCall.args[0];
        assert.strictEqual(options.startValue, 0.001);
        assert.strictEqual(options.endValue, 1000);
        assert.strictEqual(options.type, 'logarithmic');
        assert.strictEqual(options.logarithmBase, 10);
        assert.strictEqual(spy.getCall(0).args[0].target.id, 'E2104', 'incident');
    });

    QUnit.test('scale. not valid logarithmBase, string', function (assert) {
        const spy = sinon.spy();
        this.createWidget({
            scale: {
                startValue: 0.001,
                endValue: 1000,
                type: 'logarithmic',
                logarithmBase: 'base'
            },
            onIncidentOccurred: spy
        });

        const options = this.axis.updateOptions.lastCall.args[0];
        assert.strictEqual(options.startValue, 0.001);
        assert.strictEqual(options.endValue, 1000);
        assert.strictEqual(options.type, 'logarithmic');
        assert.strictEqual(options.logarithmBase, 10);
        assert.strictEqual(spy.getCall(0).args[0].target.id, 'E2104', 'incident');
    });

    QUnit.test('valueAxis. logarithmic type', function (assert) {
        const spy = sinon.spy(seriesDataSourceModule, 'SeriesDataSource');
        this.seriesDataSource.stub('getBoundRange').returns({
            arg: new commons.StubRange(),
            val: new commons.StubRange()
        });
        this.createWidget({
            dataSource: [{}],
            chart: {
                valueAxis: {
                    type: 'logarithmic',
                    logarithmBase: 2
                }
            }
        });

        const obj = spy.lastCall.args[0].chart.valueAxis;
        assert.strictEqual(obj.type, 'logarithmic', 'type');
        assert.strictEqual(obj.logarithmBase, 2, 'logarithmic base');
    });

    QUnit.test('valueAxis. not valid logarithmBase', function (assert) {
        const spy = sinon.spy(seriesDataSourceModule, 'SeriesDataSource');
        this.seriesDataSource.stub('isShowChart').returns(true);
        this.seriesDataSource.stub('getBoundRange').returns({
            arg: new commons.StubRange(),
            val: new commons.StubRange()
        });
        this.seriesDataSource.getThemeManager = function () {
            const themeManager = new commons.StubThemeManager();
            themeManager.getOptions = sinon.stub().withArgs('valueAxis').returns({ logarithmBase: 2 });
            return themeManager;
        };
        const incidentOccurred = sinon.spy();
        this.createWidget({
            dataSource: [],
            chart: {
                series: {},
                valueAxis: {
                    type: 'logarithmic',
                    logarithmBase: -2
                }
            },
            onIncidentOccurred: incidentOccurred
        });

        const obj = spy.lastCall.args[0].chart.valueAxis;
        assert.deepEqual(obj.type, 'logarithmic');
        assert.deepEqual(obj.logarithmBase, 2);
        assert.strictEqual(incidentOccurred.getCall(0).args[0].target.id, 'E2104', 'incident');
    });

    QUnit.module('discrete type', commons.environment);

    QUnit.test('scale. discrete type', function (assert) {
        this.createWidget({
            scale: {
                startValue: 'a2',
                endValue: 'a4',
                type: 'discrete'
            }
        });

        const options = this.axis.updateOptions.lastCall.args[0];
        assert.equal(options.type, 'discrete');
        assert.equal(options.startValue, 'a2');
        assert.equal(options.endValue, 'a4');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","viz/range_selector/tracker","data/data_source/data_source","viz/range_selector/series_data_source","./rangeSelectorParts/commons.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("viz/range_selector/tracker"), require("data/data_source/data_source"), require("viz/range_selector/series_data_source"), require("./rangeSelectorParts/commons.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=common.part1.tests.js.map