!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.gauges/common.tests.js"], ["jquery","core/utils/common","core/class","core/component_registrator","core/utils/resize_callbacks","core/utils/object","../../helpers/vizMocks.js","viz/gauges/common","viz/palette","viz/axes/base_axis","viz/core/loading_indicator","viz/core/tooltip","viz/translators/range","viz/translators/translator1d","viz/core/renderers/renderer","viz/gauges/theme_manager"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.gauges/common.tests.js', ['jquery', 'core/utils/common', 'core/class', 'core/component_registrator', 'core/utils/resize_callbacks', 'core/utils/object', '../../helpers/vizMocks.js', 'viz/gauges/common', 'viz/palette', 'viz/axes/base_axis', 'viz/core/loading_indicator', 'viz/core/tooltip', 'viz/translators/range', 'viz/translators/translator1d', 'viz/core/renderers/renderer', 'viz/gauges/theme_manager'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* global createTestContainer, currentTest */

    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const Class = $__require('core/class');
    const registerComponent = $__require('core/component_registrator');
    const resizeCallbacks = $__require('core/utils/resize_callbacks');
    const objectUtils = $__require('core/utils/object');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const dxGauge = $__require('viz/gauges/common').dxGauge;
    const createPalette = $__require('viz/palette').createPalette;
    const axisModule = $__require('viz/axes/base_axis');
    const loadingIndicatorModule = $__require('viz/core/loading_indicator');
    const tooltipModule = $__require('viz/core/tooltip');
    const rangeModule = $__require('viz/translators/range');
    const translator1DModule = $__require('viz/translators/translator1d');
    const rendererModule = $__require('viz/core/renderers/renderer');
    const stubRange = vizMocks.stubClass(rangeModule.Range);
    const themeManagerModule = $__require('viz/gauges/theme_manager');

    $('<div id="test-container">').appendTo('#qunit-fixture');

    sinon.stub(rangeModule, 'Range').callsFake(function (parameters) {
        return new stubRange(parameters);
    });

    const dxTestGauge = dxGauge.inherit({
        NAME: 'dxTestGauge',
        _scaleTypes: {
            type: 'testAxes',
            drawingType: 'testDrawing'
        },

        _getDefaultSize: function () {
            return { width: 101, height: 202 };
        },
        _updateScaleTickIndent: function () {},
        _setupCodomain: function () {
            this._area = { startCoord: 1, endCoord: 2 };
            this.position = 0;
            this._translator.setCodomain(1000, 2000);
        },
        _gridSpacingFactor: 0,
        _setOrientation: noop,
        _shiftScale: noop,
        _getTicksOrientation: function () {
            return 'center';
        },
        _getScaleLayoutValue: noop,
        _getTicksCoefficients: function () {
            return { inner: 0, outer: 1 };
        },
        _correctScaleIndents: noop,
        _getElementLayout: function (offset) {
            return { position: Math.round(offset + this.position) };
        },

        _applyMainLayout: function () {
            this._area.startCoord = 1000;
            this._area.endCoord = 2000;
            this.position = 400;
        },

        _getApproximateScreenRange: function () {
            return this.option('approximateScreenRange') || 0;
        }
    });

    const factory = dxTestGauge.prototype._factory = objectUtils.clone(dxGauge.prototype._factory);

    registerComponent('dxTestGauge', dxTestGauge);

    const StubTooltip = vizMocks.Tooltip;
    tooltipModule.Tooltip = function (parameters) {
        return new StubTooltip(parameters);
    };

    sinon.stub(axisModule, 'Axis', function (parameters) {
        return new vizMocks.Axis(parameters);
    });

    themeManagerModule.ThemeManager = vizMocks.stubClass(themeManagerModule.ThemeManager, {
        theme: function () {
            return {};
        },
        themeName: function () {
            return 'theme-name';
        },
        createPalette: function (palette) {
            return createPalette(palette);
        },
        setTheme: function () {
            vizMocks.forceThemeOptions(this);
        }
    });

    const TestElement = Class.inherit({
        ctor: function (parameters) {
            this.parameters = parameters;
            this.renderer = parameters.renderer;
            this.translator = parameters.translator;
            this.container = parameters.container;
            this.owner = parameters.owner;
            this.incidentOccurred = parameters.incidentOccurred;
            this.tracker = parameters.tracker;
            this.root = this.renderer.g().attr({ 'class': parameters.className });
        },

        dispose: function () {
            this.disposed = true;
            delete this.root;
            return true;
        },

        clean: function () {
            this.root.remove();
            return this;
        },

        render: function (options) {
            this.options = options;
            this.enabled = true;
            this.owner && this.root.append(this.owner);
            return this;
        },

        getOffset: function () {
            return this.options.offset;
        },

        resize: function (options) {
            $.extend(this.options, options);
        },

        measure: function () {}
    });

    const TestPointerElement = TestElement.inherit({
        render: function () {
            this.callBase.apply(this, arguments);
            this._currentValue = Number(this.options.currentValue);
            return this;
        },

        value: function (val) {
            this.valueCalls = this.valueCalls || [];
            this.valueCalls.push(val);
            if (arguments.length) {
                val = Number(val);
                if (Number(this._currentValue) !== val && isFinite(this.translator.translate(val))) {
                    this.previousValue = Number(this._currentValue);
                    this._currentValue = val;
                }
                return this;
            }
            return this._currentValue;
        }
    });

    function combineOptions(gauge, name, options) {
        return $.extend(true, {}, gauge._themeManager.theme()[name], options);
    }

    factory.RangeContainer = function (parameters) {
        parameters.className = 'test-range-container';
        const rangeContainer = new TestElement(parameters);
        rangeContainer.getColorForValue = sinon.stub();
        return rangeContainer;
    };

    factory.createIndicator = function (parameters, type) {
        const pointer = new TestPointerElement(parameters);
        pointer.type = type;
        return pointer;
    };

    loadingIndicatorModule.DEBUG_set_LoadingIndicator(function (parameters) {
        return new vizMocks.LoadingIndicator(parameters);
    });

    sinon.stub(rendererModule, 'Renderer').callsFake(function () {
        return currentTest().renderer;
    });

    const environment = {
        beforeEach: function () {
            vizMocks.stubIncidentOccurredCreation();
            rangeModule.Range.reset();
            axisModule.Axis.reset();
            this.renderer = new vizMocks.Renderer();
            this.container = $(createTestContainer('#test-container', { width: '800px', height: '600px' }));
        },
        createTestGauge: function (options) {
            return new dxTestGauge(this.container, $.extend(true, {}, {
                scale: {
                    label: {
                        overlappingBehavior: 'hide',
                        indentFromTick: 10
                    },
                    minorTick: {},
                    tick: {}
                }
            }, options));
        },
        afterEach: function () {
            vizMocks.restoreIncidentOccurredCreation();
            this.container.remove();
            delete this.container;
        }
    };

    QUnit.module('Gauge - main elements rendering (on stubs)', environment);

    QUnit.test('Scale is rendered', function (assert) {
        this.createTestGauge({
            scale: {
                startValue: 10,
                endValue: 20,
                customTicks: [1, 2, 3],
                tick: {
                    length: 8,
                    color: '#123456',
                    width: 2,
                    visible: true
                },
                tickInterval: 4,
                customMinorTicks: [4, 5, 6],
                minorTick: {
                    length: 8,
                    color: '#654321',
                    width: 1,
                    visible: false
                },
                minorTickInterval: 2,
                hideFirstTick: true,
                hideFirstLabel: false,
                hideLastTick: true,
                hideLastLabel: false
            }
        });

        const scale = axisModule.Axis.getCall(0).returnValue;
        const scaleGroup = this.renderer.g.getCall(6).returnValue;
        const labelsAxesGroup = this.renderer.g.getCall(7).returnValue;
        const axisArguments = axisModule.Axis.getCall(0).args[0];

        assert.deepEqual(axisArguments.renderer, this.renderer, 'scale params: renderer');
        assert.deepEqual(axisArguments.axesContainerGroup, scaleGroup, 'scale params: group');
        assert.deepEqual(axisArguments.labelsAxesGroup, labelsAxesGroup, 'scale params: labels');
        assert.deepEqual(axisArguments.axisType, 'testAxes', 'scale params: type');
        assert.deepEqual(axisArguments.drawingType, 'testDrawing', 'scale params: drawingType');
        assert.deepEqual(axisArguments.widgetClass, 'dxg', 'scale params: dxg');

        assert.deepEqual(scale.updateOptions.getCall(0).args[0], {
            customTicks: [1, 2, 3],
            customMinorTicks: [4, 5, 6],
            axisDivisionFactor: 0,
            minorAxisDivisionFactor: 5,
            numberMultipliers: [1, 2, 5],
            endValue: 20,
            hideFirstLabel: false,
            hideFirstTick: true,
            hideLastLabel: false,
            hideLastTick: true,
            inverted: false,
            isHorizontal: true,
            label: {
                indentFromAxis: 0,
                indentFromTick: 10,
                overlappingBehavior: 'hide'
            },
            max: 20,
            min: 10,
            minorTick: {
                color: '#654321',
                length: 8,
                visible: false,
                width: 1
            },
            minorTickInterval: 2,
            startValue: 10,
            tick: {
                color: '#123456',
                length: 8,
                visible: true,
                width: 2
            },
            tickInterval: 4,
            forceUserTickInterval: 1,
            tickOrientation: 'center',
            startAngle: -910,
            endAngle: -1910,
            skipViewportExtending: true
        }, 'scale updating');
        assert.equal(scale.draw.callCount, 1, 'scale drawing');
        assert.equal(scaleGroup.linkAppend.callCount, 1, 'scale group appending');
    });

    QUnit.test('overlappingBehavior option is hide', function (assert) {
        this.createTestGauge({
            scale: {
                label: {
                    overlappingBehavior: 'hide'
                }
            }
        });
        assert.deepEqual(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(0).args[0].label.overlappingBehavior, 'hide');
    });

    QUnit.test('overlappingBehavior option is none', function (assert) {
        this.createTestGauge({
            scale: {
                label: {
                    overlappingBehavior: 'none'
                }
            }
        });
        assert.deepEqual(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(0).args[0].label.overlappingBehavior, 'none');
    });

    QUnit.test('hideFirstOrLast option in label option', function (assert) {
        this.createTestGauge({
            scale: {
                label: {
                    hideFirstOrLast: 'hideFirstOrLast'
                }
            }
        });
        assert.deepEqual(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(0).args[0].label.hideFirstOrLast, 'hideFirstOrLast');
    });

    QUnit.test('Use range colors for scale', function (assert) {
        const gauge = this.createTestGauge({
            scale: {
                label: {
                    useRangeColors: true
                }
            },
            rangeContainer: {
                palette: 'pastel',
                ranges: [{ startValue: 50, endValue: 90 }, { startValue: 90, endValue: 130 }, { startValue: 130, endValue: 150 }]
            }
        });

        axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(0).args[0].label.customizeColor.call({ value: 'test' }, { value: 'test' });

        assert.equal(gauge._rangeContainer.getColorForValue.callCount, 1, 'ranges');
        assert.deepEqual(gauge._rangeContainer.getColorForValue.getCall(0).args[0], 'test', 'args');
    });

    QUnit.test('Range container is rendered', function (assert) {
        const gauge = this.createTestGauge({
            rangeContainer: {
                offset: -5,
                backgroundColor: 'grey',
                palette: 'test'
            }
        });
        const target = gauge._rangeContainer;

        assert.ok(target, 'instance');
        assert.ok(target instanceof TestElement, 'instance type');

        assert.strictEqual(target.renderer, gauge._renderer, 'renderer is passed');
        assert.strictEqual(target.translator, gauge._translator, 'translator is passed');
        assert.strictEqual(target.container, gauge._renderer.root, 'root element is passed');
        assert.strictEqual(target.parameters.themeManager, gauge._themeManager, 'themeManager is passed');

        assert.ok(target.root, 'root');
        assert.strictEqual(target.root.attr.getCall(0).args[0]['class'], 'test-range-container', 'style class for root');
        assert.deepEqual(target.options, combineOptions(gauge, 'rangeContainer', { position: 395, offset: -5, backgroundColor: 'grey', palette: 'test' }), 'options are passed');
    });

    //  B250275
    QUnit.test('Palette for range container - name', function (assert) {
        const gauge = this.createTestGauge({
            rangeContainer: {
                palette: 'test-palette'
            }
        });
        assert.strictEqual(gauge._rangeContainer.options.palette, 'test-palette');
    });

    //  B250275
    QUnit.test('Palette for range container - long array', function (assert) {
        const gauge = this.createTestGauge({
            rangeContainer: {
                palette: ['p1', 'p2', 'p3', 'p4', 'p5']
            }
        });
        assert.deepEqual(gauge._rangeContainer.options.palette, ['p1', 'p2', 'p3', 'p4', 'p5']);
    });

    //  B250275
    QUnit.test('Palette for range container - short array', function (assert) {
        const gauge = this.createTestGauge({
            rangeContainer: {
                palette: ['p1', 'p2']
            }
        });
        assert.deepEqual(gauge._rangeContainer.options.palette, ['p1', 'p2']);
    });

    QUnit.test('Value indicator is rendered', function (assert) {
        const gauge = this.createTestGauge({
            animation: {
                enabled: true,
                duration: 100
            },
            containerBackgroundColor: 'white',
            scale: { startValue: 10, endValue: 100 },
            valueIndicator: {
                type: 'RECTANGLENEEDLE',
                offset: 20,
                color: 'black'
            },
            value: 45
        });
        const target = gauge._valueIndicator;

        assert.ok(target, 'instance');
        assert.ok(target instanceof TestElement, 'instance type');

        assert.strictEqual(target.renderer, gauge._renderer, 'renderer is passed');
        assert.strictEqual(target.translator, gauge._translator, 'translator is passed');
        assert.strictEqual(target.owner, gauge._renderer.root, 'root element is passed');
        assert.strictEqual(target.tracker, gauge._tracker, 'tracker is passed');

        assert.ok(target.root, 'root');
        assert.strictEqual(target.root.attr.getCall(0).args[0]['class'], 'dxg-value-indicator', 'style class for root');

        const defaultOptions = combineOptions(gauge, 'valueIndicator');
        delete target.options.vertical;
        assert.deepEqual(target.options, $.extend(true, {}, defaultOptions._default, defaultOptions['rectangle'], {
            offset: 20, position: 420,
            animation: {
                duration: 100,
                easing: 'easeOutCubic'
            },
            containerBackgroundColor: 'white',
            type: 'rectangleneedle',
            color: 'black',
            baseValue: 10, currentValue: 10
        }), 'options are passed');
        assert.strictEqual(target.previousValue, 10, 'value is set');
        assert.strictEqual(target.value(), 45, 'value is set');
    });

    QUnit.test('Subvalue indicators are rendered', function (assert) {
        const gauge = this.createTestGauge({
            animation: {
                enabled: true,
                duration: 50
            },
            containerBackgroundColor: 'green',
            scale: { startValue: -100, endValue: -500 },
            subvalueIndicator: {
                type: 'TRIANGLEMARKER',
                offset: -15,
                color: 'red'
            },
            subvalues: [-400, -300, -200]
        });

        const defaultOptions = combineOptions(gauge, 'subvalueIndicator');

        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators.length, 3, 'count');
        $.each(gauge._subvalueIndicatorsSet._indicators, function (i, target) {
            assert.ok(target, 'instance');
            assert.ok(target instanceof TestElement, 'instance type');

            assert.strictEqual(target.renderer, gauge._renderer, 'renderer is passed');
            assert.strictEqual(target.translator, gauge._translator, 'translator is passed');

            const subvalueIndicatorsContainer = gauge._renderer.g.getCall(8).returnValue;
            assert.strictEqual(target.owner, subvalueIndicatorsContainer, 'root element is passed');
            assert.deepEqual(subvalueIndicatorsContainer.attr.firstCall.args[0], { class: 'dxg-subvalue-indicators' });
            assert.strictEqual(subvalueIndicatorsContainer.linkOn.callCount, 1);
            assert.strictEqual(subvalueIndicatorsContainer.linkOn.firstCall.args[0], gauge._renderer.root);
            assert.strictEqual(subvalueIndicatorsContainer.linkOn.firstCall.args[1], 'valueIndicator');
            assert.strictEqual(subvalueIndicatorsContainer.enableLinks.callCount, 1);
            assert.strictEqual(subvalueIndicatorsContainer.linkAppend.callCount, 1);

            assert.strictEqual(target.tracker, gauge._tracker, 'tracker is passed');

            assert.ok(target.root, 'root');
            assert.strictEqual(target.root.attr.getCall(0).args[0]['class'], 'dxg-subvalue-indicator', 'style class for root');

            delete target.options.vertical;
            assert.deepEqual(target.options, $.extend(true, {}, defaultOptions._default, defaultOptions['triangle'], {
                position: 385, offset: -15,
                animation: {
                    duration: 50,
                    easing: 'easeOutCubic'
                },
                containerBackgroundColor: 'green',
                type: 'trianglemarker',
                color: 'red',
                baseValue: -500, currentValue: -500,
                vertical: undefined
            }), 'options are passed');
            assert.strictEqual(target.previousValue, -500, 'value is set');
            assert.strictEqual(target.value(), [-400, -300, -200][i], 'value is set');
        });
        assert.strictEqual(gauge._themeManager.stub('createPalette').called, false);
    });

    QUnit.test('Use sample indicator instance for getting offset', function (assert) {
        sinon.stub(TestElement.prototype, 'getOffset').returns(0);

        const gauge = this.createTestGauge({
            animation: {
                enabled: true,
                duration: 50
            },
            containerBackgroundColor: 'green',
            scale: { startValue: -100, endValue: -500 },
            subvalueIndicator: {
                type: 'TRIANGLEMARKER',
                offset: -15,
                color: 'red'
            },
            subvalues: [-400]
        });

        assert.deepEqual(gauge._subvalueIndicatorsSet._indicators[0].options.position, 400);

        TestElement.prototype.getOffset.restore();
    });

    QUnit.test('Subvalue indicators can be not rendered', function (assert) {
        const gauge = this.createTestGauge({
            scale: { startValue: -100, endValue: -500 },
            subvalueIndicator: {
                type: 'triangle',
                offset: -15,
                color: 'red'
            }
        });

        assert.ok(!gauge._subvalueIndicatorsSet, 'sub pointers are not rendered');
    });

    QUnit.test('Value indicators are rendered in hard mode', function (assert) {
        const gauge = this.createTestGauge({
            animation: {
                enabled: true,
                duration: 50
            },
            containerBackgroundColor: 'green',
            scale: { startValue: -50, endValue: 1000 },
            valueIndicators: [{ value: 10, type: 'rectangleneedle', offset: 10, color: 'red' }, { value: 20, type: 'RangeBar', offset: 20, color: 'blue', text: {} }, { value: 30, type: 'textCloud', offset: 5, color: 'yellow', text: {} }]
        });

        const defaultOptions = combineOptions(gauge, 'valueIndicators');

        assert.strictEqual(gauge._valueIndicators.length, 3, 'count');
        $.each(gauge._valueIndicators, function (i, target) {
            assert.ok(target, 'instance');
            assert.ok(target instanceof TestElement, 'instance type');

            assert.strictEqual(target.renderer, gauge._renderer, 'renderer is passed');
            assert.strictEqual(target.translator, gauge._translator, 'translator is passed');
            assert.strictEqual(target.owner, gauge._renderer.root, 'root element is passed');
            assert.strictEqual(target.tracker, gauge._tracker, 'tracker is passed');

            assert.ok(target.root, 'root');
        });
        delete gauge._valueIndicators[0].options.vertical;
        assert.deepEqual(gauge._valueIndicators[0].options, $.extend(true, {}, defaultOptions._default, defaultOptions['rectangleneedle'], {
            color: 'red', baseValue: -50, currentValue: -50, value: 10, type: 'rectangleneedle', position: 410, offset: 10,
            animation: {
                duration: 50,
                easing: 'easeOutCubic'
            },
            containerBackgroundColor: 'green'
        }), 'value indicator 1 options');
        assert.strictEqual(gauge._valueIndicators[0].previousValue, -50, 'value is set - 1');
        assert.strictEqual(gauge._valueIndicators[0].value(), 10, 'value is set - 1');
        delete gauge._valueIndicators[1].options.vertical;
        assert.deepEqual(gauge._valueIndicators[1].options, $.extend(true, {}, defaultOptions._default, defaultOptions['rangebar'], {
            color: 'blue', baseValue: -50, currentValue: -50, value: 20, type: 'rangebar', position: 420, offset: 20,
            text: { format: { type: 'fixedPoint', precision: 0 } },
            animation: {
                duration: 50,
                easing: 'easeOutCubic'
            },
            containerBackgroundColor: 'green'
        }), 'value indicator 2 options');
        assert.strictEqual(gauge._valueIndicators[1].previousValue, -50, 'value is set - 2');
        assert.strictEqual(gauge._valueIndicators[1].value(), 20, 'value is set - 2');
        delete gauge._valueIndicators[2].options.vertical;
        assert.deepEqual(gauge._valueIndicators[2].options, $.extend(true, {}, defaultOptions._default, defaultOptions['textcloud'], {
            color: 'yellow', baseValue: -50, currentValue: -50, value: 30, type: 'textcloud', position: 405, offset: 5,
            text: { format: { type: 'fixedPoint', precision: 0 } },
            animation: {
                duration: 50,
                easing: 'easeOutCubic'
            },
            containerBackgroundColor: 'green'
        }), 'value indicator 3 options');
        assert.strictEqual(gauge._valueIndicators[2].previousValue, -50, 'value is set - 3');
        assert.strictEqual(gauge._valueIndicators[2].value(), 30, 'value is set - 3');
        assert.strictEqual(typeof gauge.indicatorValue, 'function', 'indicatorValue method is available');
    });

    QUnit.test('Value indicators are rendered - not valid types', function (assert) {
        const __createIndicator = factory.createIndicator;
        try {
            factory.createIndicator = function (parameters, type) {
                if (type === 'test') {
                    return __createIndicator(parameters, 'rangebar');
                }
                return null;
            };
            const gauge = this.createTestGauge({
                valueIndicators: [{ value: 10, type: 1 }, { value: 20 }, { value: 30, type: 'test' }, { value: 40, type: 'trianglemarker' }]
            });

            assert.strictEqual(gauge._valueIndicators.length, 1, 'count');
            assert.strictEqual(gauge._valueIndicators[0].value(), 30, 'value');
        } finally {
            factory.createIndicator = __createIndicator;
        }
    });

    QUnit.module('Gauge - general parts creation', environment);

    QUnit.test('Translator is set', function (assert) {
        const gauge = this.createTestGauge();
        assert.ok(gauge._translator, 'translator');
        assert.ok(gauge._translator instanceof translator1DModule.Translator1D, 'instance of Translator1D');
        assert.strictEqual(gauge._translator.getDomainStart(), 0, 'domain start');
        assert.strictEqual(gauge._translator.getDomainEnd(), 100, 'domain end');
        assert.strictEqual(gauge._translator.getCodomainStart(), 1000, 'codomain start');
        assert.strictEqual(gauge._translator.getCodomainEnd(), 2000, 'codomain end');
    });

    QUnit.test('Translator with settings', function (assert) {
        const gauge = this.createTestGauge({
            scale: { startValue: 100, endValue: '200' }
        });
        assert.strictEqual(gauge._translator.getDomainStart(), 100, 'domain start');
        assert.strictEqual(gauge._translator.getDomainEnd(), 200, 'domain end');
        assert.strictEqual(gauge._translator.getCodomainStart(), 1000, 'codomain start');
        assert.strictEqual(gauge._translator.getCodomainEnd(), 2000, 'codomain end');
    });

    QUnit.test('Translator with not valid settings', function (assert) {
        const gauge = this.createTestGauge({
            scale: { startValue: 500, endValue: 'test' }
        });
        assert.strictEqual(gauge._translator.getDomainStart(), 500, 'domain start');
        assert.strictEqual(gauge._translator.getDomainEnd(), 100, 'domain end');
        assert.strictEqual(gauge._translator.getCodomainStart(), 1000, 'codomain start');
        assert.strictEqual(gauge._translator.getCodomainEnd(), 2000, 'codomain end');
    });

    QUnit.module('Gauge - scale initialization', environment);

    QUnit.test('startValue < endValue', function (assert) {
        this.createTestGauge({
            scale: {
                startValue: 10,
                endValue: 20
            }
        });

        const scale = axisModule.Axis.getCall(0).returnValue;
        const updateOptions = scale.updateOptions.getCall(0).args[0];
        const setBusinessRange = scale.setBusinessRange.getCall(0).args[0];

        assert.strictEqual(updateOptions.min, 10);
        assert.strictEqual(updateOptions.max, 20);
        assert.deepEqual(setBusinessRange, {
            axisType: 'continuous',
            dataType: 'numeric',
            min: 10,
            max: 20,
            invert: false
        });
    });

    QUnit.test('startValue > endValue', function (assert) {
        this.createTestGauge({
            scale: {
                startValue: 20,
                endValue: 10
            }
        });

        const scale = axisModule.Axis.getCall(0).returnValue;
        const updateOptions = scale.updateOptions.getCall(0).args[0];
        const setBusinessRange = scale.setBusinessRange.getCall(0).args[0];

        assert.strictEqual(updateOptions.min, 10);
        assert.strictEqual(updateOptions.max, 20);
        assert.deepEqual(setBusinessRange, {
            axisType: 'continuous',
            dataType: 'numeric',
            min: 10,
            max: 20,
            invert: true
        });
    });

    QUnit.module('Gauge - resizing', {
        beforeEach: function () {
            environment.beforeEach.apply(this, arguments);
            dxTestGauge.prototype._debug_rendered = function () {
                this.renderCount = (this.renderCount || 0) + 1;
                this.rendered && this.rendered();
            };
        },
        createTestGauge: environment.createTestGauge,
        afterEach: function () {
            delete dxTestGauge.prototype._debug_rendered;
            environment.afterEach.apply(this, arguments);
        }
    });

    QUnit.test('Resizable by default', function (assert) {
        assert.expect(2);
        const done = assert.async();
        const gauge = this.createTestGauge({ redrawOnResize: 'windowOnly' });
        gauge.rendered = function () {
            assert.strictEqual(gauge.renderCount, 2, 'render count');
            assert.deepEqual(gauge._DEBUG_rootRect, [0, 0, 400, 200], 'resized');
            done();
        };

        this.container.css({ width: 400, height: 200 });
        resizeCallbacks.fire();
    });

    QUnit.test('Value indicators are not moved on resize', function (assert) {
        assert.expect(4);
        const done = assert.async();
        const gauge = this.createTestGauge({
            value: 10,
            subvalues: [20, 30]
        });
        gauge.rendered = function () {
            assert.strictEqual(gauge.renderCount, 2, 'render count');
            assert.ok(!gauge._valueIndicator.previousValue, 'main pointer is not moved');
            assert.ok(!gauge._subvalueIndicatorsSet._indicators[0].previousValue, 'sub pointers are not moved');
            assert.ok(!gauge._subvalueIndicatorsSet._indicators[1].previousValue, 'sub pointers are not moved');
            done();
        };
        delete gauge._valueIndicator.previousValue;
        delete gauge._subvalueIndicatorsSet._indicators[0].previousValue;
        delete gauge._subvalueIndicatorsSet._indicators[1].previousValue;

        this.container.css({ width: 200, height: 100 });
        gauge.render();
    });

    //  B252892
    QUnit.test('Value indicators preserve their value on resize', function (assert) {
        assert.expect(4);
        const done = assert.async();
        const gauge = this.createTestGauge({
            value: 10,
            subvalues: [20, 30]
        });
        gauge.rendered = function () {
            assert.strictEqual(gauge.renderCount, 2, 'render count');
            assert.strictEqual(gauge._valueIndicator.value(), 10, 'main pointer');
            assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[0].value(), 20, 'sub pointer 1');
            assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[1].value(), 30, 'sub pointer 2');
            done();
        };
        delete gauge._valueIndicator.previousValue;
        delete gauge._subvalueIndicatorsSet._indicators[0].previousValue;
        delete gauge._subvalueIndicatorsSet._indicators[1].previousValue;

        this.container.css({ width: 200, height: 100 });
        gauge.render();
    });

    //  B252892
    QUnit.test('Value indicators preserve their value on resize (hard mode)', function (assert) {
        assert.expect(4);
        const done = assert.async();
        const gauge = this.createTestGauge({
            valueIndicators: [{ value: 10 }, { value: 20 }, { value: 30 }]
        });
        gauge.rendered = function () {
            assert.strictEqual(gauge.renderCount, 2, 'render count');
            assert.strictEqual(gauge._valueIndicators[0].value(), 10, 'value indicator 1');
            assert.strictEqual(gauge._valueIndicators[1].value(), 20, 'value indicator 2');
            assert.strictEqual(gauge._valueIndicators[2].value(), 30, 'value indicator 3');
            done();
        };

        this.container.css({ width: 200, height: 100 });
        gauge.render();
    });

    //  B253559
    QUnit.test('Animation settings are preserved on resize', function (assert) {
        assert.expect(4);
        const done = assert.async();
        const gauge = this.createTestGauge({
            value: 10,
            subvalues: [20, 30]
        });
        gauge.rendered = function () {
            assert.strictEqual(gauge.renderCount, 2, 'render count');
            assert.ok(gauge._valueIndicator.options.animation, 'main pointer');
            assert.ok(gauge._subvalueIndicatorsSet._indicators[0].options.animation, 'sub pointer 1');
            assert.ok(gauge._subvalueIndicatorsSet._indicators[1].options.animation, 'sub pointer 2');
            done();
        };
        delete gauge._valueIndicator.previousValue;
        delete gauge._subvalueIndicatorsSet._indicators[0].previousValue;
        delete gauge._subvalueIndicatorsSet._indicators[1].previousValue;

        this.container.css({ width: 200, height: 100 });
        gauge.render();
    });

    //  B253559
    QUnit.test('Animation settings are preserved on resize (hard mode)', function (assert) {
        assert.expect(4);
        const done = assert.async();
        const gauge = this.createTestGauge({
            valueIndicators: [{ value: 10 }, { value: 20 }, { value: 30 }]
        });
        gauge.rendered = function () {
            assert.strictEqual(gauge.renderCount, 2, 'render count');
            assert.ok(gauge._valueIndicators[0].options.animation, 'value indicator 1');
            assert.ok(gauge._valueIndicators[1].options.animation, 'value indicator 2');
            assert.ok(gauge._valueIndicators[2].options.animation, 'value indicator 3');
            done();
        };

        this.container.css({ width: 200, height: 100 });
        gauge.render();
    });

    //  B238220
    QUnit.test('Translator is not recreated on resize', function (assert) {
        assert.expect(1);
        const done = assert.async();
        const gauge = this.createTestGauge();
        const translator = gauge._translator;
        gauge.rendered = function () {
            assert.strictEqual(gauge._translator, translator, 'not recreated');
            done();
        };

        this.container.css({ width: 200, height: 100 });
        gauge.render();
    });

    QUnit.module('Gauge - options processing', environment);

    QUnit.test('Can set value to null', function (assert) {
        const gauge = this.createTestGauge({
            value: null
        });

        assert.strictEqual(gauge.value(), null);
    });

    //  B232788
    QUnit.test('Less ranges in range container', function (assert) {
        const gauge = this.createTestGauge({
            rangeContainer: {
                ranges: [{ startValue: 0, endValue: 10, color: 'red' }, { startValue: 20, endValue: 30, color: 'yellow' }, { startValue: 40, endValue: 50, color: 'green' }]
            }
        });
        gauge.option({
            rangeContainer: {
                width: 9,
                ranges: [{ startValue: 5, endValue: 10, color: 'blue' }, { startValue: 15, endValue: 20, color: 'orange' }]
            }
        });

        assert.deepEqual(gauge.option('rangeContainer'), {
            width: 9,
            ranges: [{ startValue: 5, endValue: 10, color: 'blue' }, { startValue: 15, endValue: 20, color: 'orange' }]
        });
    });

    //  B232788
    QUnit.test('More ranges in range container', function (assert) {
        const gauge = this.createTestGauge({
            rangeContainer: {
                ranges: [{ startValue: 0, endValue: 10, color: 'red' }, { startValue: 20, endValue: 30, color: 'yellow' }, { startValue: 40, endValue: 50, color: 'green' }]
            }
        });
        gauge.option({
            rangeContainer: {
                width: 9,
                ranges: [{ startValue: 5, endValue: 10, color: 'blue' }, { startValue: 15, endValue: 20, color: 'orange' }, { startValue: 25, endValue: 30, color: 'purple' }, { startValue: 35, endValue: 40, color: 'magenta' }]
            }
        });

        assert.deepEqual(gauge.option('rangeContainer'), {
            width: 9,
            ranges: [{ startValue: 5, endValue: 10, color: 'blue' }, { startValue: 15, endValue: 20, color: 'orange' }, { startValue: 25, endValue: 30, color: 'purple' }, { startValue: 35, endValue: 40, color: 'magenta' }]
        });
    });

    //  B232788
    QUnit.test('Ranges in range container are not changed', function (assert) {
        const gauge = this.createTestGauge({
            rangeContainer: {
                ranges: [{ startValue: 0, endValue: 10, color: 'red' }, { startValue: 20, endValue: 30, color: 'yellow' }, { startValue: 40, endValue: 50, color: 'green' }]
            }
        });
        gauge.option({ rangeContainer: { width: 9 } });

        assert.deepEqual(gauge.option('rangeContainer'), {
            width: 9,
            ranges: [{ startValue: 0, endValue: 10, color: 'red' }, { startValue: 20, endValue: 30, color: 'yellow' }, { startValue: 40, endValue: 50, color: 'green' }]
        });
    });

    //  B232788
    QUnit.test('Less ranges in range container (direct assignment)', function (assert) {
        const gauge = this.createTestGauge({
            rangeContainer: {
                ranges: [{ startValue: 0, endValue: 10, color: 'red' }, { startValue: 20, endValue: 30, color: 'yellow' }, { startValue: 40, endValue: 50, color: 'green' }]
            }
        });
        gauge.option('rangeContainer.ranges', [{ startValue: 5, endValue: 10, color: 'blue' }, { startValue: 15, endValue: 20, color: 'orange' }]);

        assert.deepEqual(gauge.option('rangeContainer'), {
            ranges: [{ startValue: 5, endValue: 10, color: 'blue' }, { startValue: 15, endValue: 20, color: 'orange' }]
        });
    });

    //  B232788
    QUnit.test('More ranges in range container (direct assignment)', function (assert) {
        const gauge = this.createTestGauge({
            rangeContainer: {
                ranges: [{ startValue: 0, endValue: 10, color: 'red' }, { startValue: 20, endValue: 30, color: 'yellow' }, { startValue: 40, endValue: 50, color: 'green' }]
            }
        });
        gauge.option('rangeContainer.ranges', [{ startValue: 5, endValue: 10, color: 'blue' }, { startValue: 15, endValue: 20, color: 'orange' }, { startValue: 25, endValue: 30, color: 'purple' }, { startValue: 35, endValue: 40, color: 'magenta' }]);

        assert.deepEqual(gauge.option('rangeContainer'), {
            ranges: [{ startValue: 5, endValue: 10, color: 'blue' }, { startValue: 15, endValue: 20, color: 'orange' }, { startValue: 25, endValue: 30, color: 'purple' }, { startValue: 35, endValue: 40, color: 'magenta' }]
        });
    });

    QUnit.test('Force the tickInterval option', function (assert) {
        const gauge = this.createTestGauge({});
        const scale = axisModule.Axis.getCall(0).returnValue;

        gauge.option({
            scale: {
                tickInterval: 0.5
            }
        });

        assert.notOk(scale.updateOptions.getCall(0).args[0].forceUserTickInterval);
        assert.ok(scale.updateOptions.getCall(1).args[0].forceUserTickInterval);
        assert.equal(scale.updateOptions.getCall(1).args[0].tickInterval, 0.5);
    });

    QUnit.test('The axisDivisionFactor option has higher priority than the tickInterval option', function (assert) {
        const gauge = this.createTestGauge({});
        const scale = axisModule.Axis.getCall(0).returnValue;

        gauge.option({
            scale: {
                scaleDivisionFactor: 30,
                tickInterval: 0.5
            }
        });

        assert.notOk(scale.updateOptions.getCall(0).args[0].forceUserTickInterval);
        assert.notOk(scale.updateOptions.getCall(1).args[0].forceUserTickInterval);
        assert.equal(scale.updateOptions.getCall(1).args[0].axisDivisionFactor, 30);
    });

    //  B232788
    QUnit.test('Less custom tick values for scale', function (assert) {
        const gauge = this.createTestGauge({
            scale: {
                customTicks: [10, 20, 30]
            }
        });
        gauge.option({
            scale: {
                startValue: 50,
                tickInterval: 9,
                customTicks: [11, 21],
                minorTick: {
                    tickInterval: 4
                }
            }
        });

        assert.deepEqual(gauge.option('scale').customTicks, [11, 21]);
        assert.strictEqual(gauge.option('scale').minorTick.tickInterval, 4);
    });

    //  B232788
    QUnit.test('More custom tick values for scale', function (assert) {
        const gauge = this.createTestGauge({
            scale: {}
        });
        gauge.option({
            scale: {
                endValue: 50,
                majorTick: {
                    tickInterval: 9
                },
                minorTick: {
                    tickInterval: 4
                }
            }
        });

        assert.strictEqual(gauge.option('scale').majorTick.tickInterval, 9);

        assert.strictEqual(gauge.option('scale').minorTick.tickInterval, 4);
    });

    //  B232788
    QUnit.test('Custom tick values in scale are not changed', function (assert) {
        const gauge = this.createTestGauge({});
        gauge.option({
            scale: {
                majorTick: {
                    tickInterval: 9
                },
                minorTick: {
                    tickInterval: 4
                }
            }
        });

        assert.strictEqual(gauge.option('scale').majorTick.tickInterval, 9);

        assert.strictEqual(gauge.option('scale').minorTick.tickInterval, 4);
    });

    QUnit.test('Animation', function (assert) {
        const gauge = this.createTestGauge({
            animation: {
                duration: 500
            }
        });

        assert.deepEqual(gauge._valueIndicator.options.animation, {
            easing: 'easeOutCubic',
            duration: 500
        });
    });

    QUnit.module('Gauge - value changing', environment);

    QUnit.test('value - get', function (assert) {
        const gauge = this.createTestGauge({
            value: 30
        });
        assert.strictEqual(gauge.value(), 30);
    });

    QUnit.test('value - set', function (assert) {
        const gauge = this.createTestGauge({
            value: 30
        });
        delete gauge._valueIndicator.previousValue;

        gauge.value(50);

        assert.strictEqual(gauge._valueIndicator.valueCalls[1], 50, 'value indicator');
        assert.strictEqual(gauge.value(), 50, 'method result');
        assert.strictEqual(gauge.option('value'), 50, 'option value');
    });

    QUnit.test('value - set, out of range', function (assert) {
        const gauge = this.createTestGauge({
            value: 30
        });
        delete gauge._valueIndicator.previousValue;

        gauge.value(150);

        assert.strictEqual(gauge._valueIndicator.valueCalls[1], 150, 'value indicator');
        assert.strictEqual(gauge.value(), 150, 'method result');
        assert.strictEqual(gauge.option('value'), 150, 'option value');
    });

    QUnit.test('value - set, not valid', function (assert) {
        const gauge = this.createTestGauge({
            value: 30
        });
        delete gauge._valueIndicator.previousValue;

        gauge.value('test');

        assert.strictEqual(gauge._valueIndicator.valueCalls[1], 30, 'value indicator');
        assert.strictEqual(gauge.value(), 30, 'method result');
        assert.strictEqual(gauge.option('value'), 30, 'option value');
    });

    QUnit.test('subvalues - get', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3]
        });
        assert.deepEqual(gauge.subvalues(), [1, 2, 3]);
    });

    QUnit.test('subvalues - get / initialized with number', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: 10
        });
        assert.deepEqual(gauge.subvalues(), [10]);
    });

    QUnit.test('subvalues - get / not initialized', function (assert) {
        const gauge = this.createTestGauge({});
        assert.strictEqual(gauge.subvalues(), undefined);
    });

    QUnit.test('subvalues - get / initialized with null', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: null
        });
        assert.strictEqual(gauge.subvalues(), undefined);
    });

    QUnit.test('subvalues - set', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3]
        });

        gauge.subvalues([10, 20, 30]);

        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[0].valueCalls[1], 10, 'subvalue indicator 1');
        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[1].valueCalls[1], 20, 'subvalue indicator 2');
        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[2].valueCalls[1], 30, 'subvalue indicator 3');
        assert.deepEqual(gauge.subvalues(), [10, 20, 30], 'method result');
        assert.deepEqual(gauge.option('subvalues'), [10, 20, 30], 'option value');
    });

    QUnit.test('subvalues - set, number', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3]
        });

        gauge.subvalues(4);

        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[0].valueCalls[1], 4, 'subvalue indicator 1');
        assert.deepEqual(gauge.subvalues(), [4], 'method result');
        assert.deepEqual(gauge.option('subvalues'), [4], 'option value');
    });

    QUnit.test('subvalues - set, out of range', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3]
        });

        gauge.subvalues([10, 120, 30]);

        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[0].valueCalls[1], 10, 'subvalue indicator 1');
        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[1].valueCalls[1], 120, 'subvalue indicator 2');
        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[2].valueCalls[1], 30, 'subvalue indicator 3');
        assert.deepEqual(gauge.subvalues(), [10, 120, 30], 'method result');
        assert.deepEqual(gauge.option('subvalues'), [10, 120, 30], 'option value');
    });

    QUnit.test('subvalues - set, not valid', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3]
        });

        gauge.subvalues({ a: 'A', b: 'B' });

        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[0].valueCalls[1], 1, 'subvalue indicator 1');
        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[1].valueCalls[1], 2, 'subvalue indicator 2');
        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[2].valueCalls[1], 3, 'subvalue indicator 3');
        assert.deepEqual(gauge.subvalues(), [1, 2, 3], 'method result');
        assert.deepEqual(gauge.option('subvalues'), [1, 2, 3], 'option value');
    });

    QUnit.test('subvalues - set, when they is not defined on initialization', function (assert) {
        const gauge = this.createTestGauge();

        gauge.subvalues([1, 2, 3]);

        assert.deepEqual(gauge.subvalues(), [1, 2, 3], 'method result');
        assert.deepEqual(gauge.option('subvalues'), [1, 2, 3], 'option value');
    });

    QUnit.test('set subvalues - null', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [1]
        });

        gauge.subvalues(null);

        assert.deepEqual(gauge.subvalues(), [1], 'method result');
        assert.deepEqual(gauge.option('subvalues'), [1], 'option value');
    });

    QUnit.test('subvalues - set, less values', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3]
        });

        gauge.subvalues([10, 20]);

        assert.deepEqual(gauge.subvalues(), [10, 20], 'method result');
        assert.deepEqual(gauge.option('subvalues'), [10, 20], 'option value');
        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators.length, 2, 'subvalue indicators count');
    });

    QUnit.test('subvalues - set, more values', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3]
        });

        gauge.subvalues([10, 20, 30, 40]);

        assert.deepEqual(gauge.subvalues(), [10, 20, 30, 40], 'method result');
        assert.deepEqual(gauge.option('subvalues'), [10, 20, 30, 40], 'option value');
        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators.length, 4, 'subvalue indicators count');

        assert.strictEqual(gauge._subvalueIndicatorsSet._indicators[3].previousValue, 0, 'new subvalue indicator is moved');
    });

    //  B252197
    QUnit.test('subvalues - set, when initialized with empty array', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: []
        });

        gauge.subvalues([10, 20]);

        assert.deepEqual(gauge.subvalues(), [10, 20], 'method result');
        assert.deepEqual(gauge.option('subvalues'), [10, 20], 'option value');
    });

    QUnit.test('indicatorValue - get', function (assert) {
        const gauge = this.createTestGauge({
            valueIndicators: [{ value: 10 }, { value: 20 }]
        });

        assert.strictEqual(gauge.indicatorValue(0), 10, 'value 1');
        assert.strictEqual(gauge.indicatorValue(1), 20, 'value 2');
        assert.strictEqual(gauge.indicatorValue('test'), undefined, 'not valid');
        assert.strictEqual(gauge.indicatorValue(4), undefined, 'not valid');
    });

    QUnit.test('indicatorValue - set', function (assert) {
        const gauge = this.createTestGauge({
            valueIndicators: [{ value: 10 }, { value: 20 }]
        });

        gauge.indicatorValue(0, 50);
        gauge.indicatorValue(1, '60');
        gauge.indicatorValue('test', 70);
        gauge.indicatorValue(4, 80);

        assert.strictEqual(gauge.indicatorValue(0), 50, 'value 1');
        assert.strictEqual(gauge.indicatorValue(1), 60, 'value 2');
        assert.strictEqual(gauge._valueIndicators[0].value(), 50, 'value indicator 1');
        assert.strictEqual(gauge._valueIndicators[1].value(), 60, 'value indicator 1');
    });

    QUnit.test('indicatorValue - set, not valid', function (assert) {
        const gauge = this.createTestGauge({
            valueIndicators: [{ value: 10 }, { value: 20 }]
        });

        gauge.indicatorValue(0, 'test');
        gauge.indicatorValue(1, [1, 2]);

        assert.strictEqual(gauge.indicatorValue(0), 10, 'value 1');
        assert.strictEqual(gauge.indicatorValue(1), 20, 'value 2');
        assert.strictEqual(gauge._valueIndicators[0].value(), 10, 'value indicator 1');
        assert.strictEqual(gauge._valueIndicators[1].value(), 20, 'value indicator 1');
    });

    QUnit.test('indicatorValue - not in hard mode', function (assert) {
        const gauge = this.createTestGauge();

        assert.strictEqual(gauge.valueIndicator, undefined, 'method is not available');
    });

    QUnit.module('Gauge - options changing support', environment);

    QUnit.test('value option', function (assert) {
        const gauge = this.createTestGauge({
            value: 50
        });

        gauge.option('value', 60);

        assert.strictEqual(gauge.option('value'), 60, 'option value');
        assert.strictEqual(gauge.value(), 60, 'method result');
        // TODO: check that gauge was not rerendered
    });

    QUnit.test('value option, out of range', function (assert) {
        const gauge = this.createTestGauge({
            value: 50
        });

        gauge.option('value', 160);

        assert.strictEqual(gauge.option('value'), 160, 'option value');
        assert.strictEqual(gauge.value(), 160, 'method result');
        // TODO: check that gauge was not rerendered
    });

    QUnit.test('value option, not valid', function (assert) {
        const gauge = this.createTestGauge({
            value: 50
        });

        gauge.option('value', 'test');

        assert.strictEqual(gauge.option('value'), 50, 'option value');
        assert.strictEqual(gauge.value(), 50, 'method result');
    });

    QUnit.test('subvalues option', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [10, 20]
        });

        gauge.option('subvalues', [30, 40]);

        assert.deepEqual(gauge.option('subvalues'), [30, 40], 'option value');
        assert.deepEqual(gauge.subvalues(), [30, 40], 'method result');
        // TODO: check that gauge was not rerendered
    });

    QUnit.test('subvalues option, less values', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [10, 20, 30]
        });

        gauge.option('subvalues', [40, 50]);

        assert.deepEqual(gauge.option('subvalues'), [40, 50], 'option value');
        assert.deepEqual(gauge.subvalues(), [40, 50], 'method result');
        // TODO: check that gauge was not rerendered
    });

    QUnit.test('subvalues option, more values', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [10, 20, 30]
        });

        gauge.option('subvalues', [40, 50, 60, 70]);

        assert.deepEqual(gauge.option('subvalues'), [40, 50, 60, 70], 'option value');
        assert.deepEqual(gauge.subvalues(), [40, 50, 60, 70], 'method result');
        // TODO: check that gauge was not rerendered
    });

    QUnit.test('subvalues option, out of range', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [10, 20]
        });

        gauge.option('subvalues', [130, 40]);

        assert.deepEqual(gauge.option('subvalues'), [130, 40], 'option value');
        assert.deepEqual(gauge.subvalues(), [130, 40], 'method result');
        // TODO: check that gauge was not rerendered
    });

    QUnit.test('subvalues option, not valid', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [10, 20]
        });

        gauge.option('subvalues', { a: 'A', b: 'B' });

        assert.deepEqual(gauge.option('subvalues'), [10, 20], 'option value');
        assert.deepEqual(gauge.subvalues(), [10, 20], 'method result');
        // TODO: check that gauge was not rerendered
    });

    //  B251763
    QUnit.test('subvalues option, when subvalues are not defined on initialization', function (assert) {
        const gauge = this.createTestGauge();

        gauge.option('subvalues', [10, 20]);

        assert.deepEqual(gauge.option('subvalues'), [10, 20], 'option value');
        assert.deepEqual(gauge.subvalues(), [10, 20], 'method result');
    });

    //  B252197
    QUnit.test('subvalues option, when initialized with empty array', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: []
        });

        gauge.option('subvalues', [1, 2, 3]);

        assert.deepEqual(gauge.option('subvalues'), [1, 2, 3], 'option value');
        assert.deepEqual(gauge.subvalues(), [1, 2, 3], 'method result');
    });

    QUnit.module('Palette for subvalueIndicators', environment);

    QUnit.test('subvalueIndicator with empty palette', function (assert) {
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3], subvalueIndicator: {
                palette: [],
                color: 'someColor'
            }
        });
        $.each(gauge._subvalueIndicatorsSet._indicators, function (index, item) {
            assert.strictEqual(item.options.color, 'someColor');
        });
        assert.strictEqual(gauge._themeManager.createPalette.callCount, 1);
        assert.deepEqual(gauge._themeManager.createPalette.firstCall.args, [[]]);
    });

    QUnit.test('palette longer count of indicators', function (assert) {
        const customPalette = ['color1', 'color2', 'color3', 'color4'];
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3],
            subvalueIndicator: {
                palette: customPalette
            }
        });

        $.each(gauge._subvalueIndicatorsSet._indicators, function (index, item) {
            assert.strictEqual(item.options.color, customPalette[index]);
        });
        assert.strictEqual(gauge._themeManager.createPalette.callCount, 1);
        assert.deepEqual(gauge._themeManager.createPalette.firstCall.args, [customPalette]);
    });

    QUnit.test('count of indicators longer palette', function (assert) {
        const customPalette = ['color1', 'color2', 'color3', 'color4'];
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3, 4, 5, 6, 7],
            subvalueIndicator: {
                palette: customPalette
            }
        });

        $.each(gauge._subvalueIndicatorsSet._indicators, function (index, item) {
            assert.strictEqual(item.options.color, customPalette[index % customPalette.length]);
        });
        assert.strictEqual(gauge._themeManager.createPalette.callCount, 1);
        assert.deepEqual(gauge._themeManager.createPalette.firstCall.args, [customPalette]);
    });

    QUnit.test('palette after remove some subvalues', function (assert) {
        const customPalette = ['color1', 'color2'];
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3, 4, 5],
            subvalueIndicator: {
                palette: customPalette
            }
        });

        gauge.subvalues([1, 2, 3]);

        assert.equal(gauge._subvalueIndicatorsSet._indicators.length, 3);
        $.each(gauge._subvalueIndicatorsSet._indicators, function (index, item) {
            assert.strictEqual(item.options.color, customPalette[index % customPalette.length]);
        });
        assert.strictEqual(gauge._themeManager.createPalette.callCount, 1);
        assert.deepEqual(gauge._themeManager.createPalette.firstCall.args, [customPalette]);
    });

    QUnit.test('palette after add some subvalues', function (assert) {
        const customPalette = ['color1', 'color2'];
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3, 4],
            subvalueIndicator: {
                palette: customPalette
            }
        });

        gauge.subvalues([1, 2, 3, 4, 5, 6]);

        assert.equal(gauge._subvalueIndicatorsSet._indicators.length, 6);
        $.each(gauge._subvalueIndicatorsSet._indicators, function (index, item) {
            assert.strictEqual(item.options.color, customPalette[index % customPalette.length]);
        });
        assert.strictEqual(gauge._themeManager.createPalette.callCount, 1);
        assert.deepEqual(gauge._themeManager.createPalette.firstCall.args, [customPalette]);
    });

    QUnit.test('palette after double add subvalues', function (assert) {
        const customPalette = ['color1', 'color2'];
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3, 4],
            subvalueIndicator: {
                palette: customPalette
            }
        });

        gauge.subvalues([1, 2, 3, 4, 5]);
        gauge.subvalues([1, 2, 3, 4, 5, 6]);

        assert.equal(gauge._subvalueIndicatorsSet._indicators.length, 6);
        $.each(gauge._subvalueIndicatorsSet._indicators, function (index, item) {
            assert.strictEqual(item.options.color, customPalette[index % customPalette.length]);
        });
    });

    QUnit.test('remove palette', function (assert) {
        const customPalette = ['color1', 'color2'];
        const gauge = this.createTestGauge({
            subvalues: [1, 2, 3],
            subvalueIndicator: {
                palette: customPalette,
                color: 'someColor',
                defaultPalette: null // For test only, there is no such option
            }
        });

        gauge.option('subvalueIndicator', { palette: null });

        $.each(gauge._subvalueIndicatorsSet._indicators, function (index, item) {
            assert.strictEqual(item.options.color, 'someColor');
        });
        assert.strictEqual(gauge._themeManager.createPalette.callCount, 1);
        assert.deepEqual(gauge._themeManager.createPalette.firstCall.args, [customPalette]);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","core/class","core/component_registrator","core/utils/resize_callbacks","core/utils/object","../../helpers/vizMocks.js","viz/gauges/common","viz/palette","viz/axes/base_axis","viz/core/loading_indicator","viz/core/tooltip","viz/translators/range","viz/translators/translator1d","viz/core/renderers/renderer","viz/gauges/theme_manager"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("core/class"), require("core/component_registrator"), require("core/utils/resize_callbacks"), require("core/utils/object"), require("../../helpers/vizMocks.js"), require("viz/gauges/common"), require("viz/palette"), require("viz/axes/base_axis"), require("viz/core/loading_indicator"), require("viz/core/tooltip"), require("viz/translators/range"), require("viz/translators/translator1d"), require("viz/core/renderers/renderer"), require("viz/gauges/theme_manager"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=common.tests.js.map