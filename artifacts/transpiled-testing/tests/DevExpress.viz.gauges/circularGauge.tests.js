!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.gauges/circularGauge.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/circular_gauge","viz/axes/base_axis","core/class","viz/core/renderers/renderer"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.gauges/circularGauge.tests.js', ['jquery', '../../helpers/vizMocks.js', 'viz/circular_gauge', 'viz/axes/base_axis', 'core/class', 'viz/core/renderers/renderer'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* global createTestContainer */

    const $ = $__require('jquery');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const dxCircularGauge = $__require('viz/circular_gauge');
    const factory = dxCircularGauge.prototype._factory;
    const axisModule = $__require('viz/axes/base_axis');
    const Class = $__require('core/class');
    const rendererModule = $__require('viz/core/renderers/renderer');

    $('<div id="test-container">').appendTo('#qunit-fixture');

    factory.RangeContainer = function (parameters) {
        parameters.className = 'test-range-container';
        const item = new TestElement(parameters);
        item.measure = function (layout) {
            return {
                min: layout.radius,
                max: layout.radius + this.options.size
            };
        };
        return item;
    };

    factory.createIndicator = function (parameters) {
        const item = new TestPointerElement(parameters);
        if (parameters.className === 'dxg-value-indicator') {
            item.measure = function (layout) {
                return {
                    max: layout.radius,
                    inverseHorizontalOffset: this.options.inverseHorizontalOffset,
                    inverseVerticalOffset: this.options.inverseVerticalOffset
                };
            };
        } else if (parameters.className === 'dxg-subvalue-indicator') {
            item.measure = function (layout) {
                return {
                    min: layout.radius,
                    max: layout.radius + this.options.size,
                    horizontalOffset: this.options.horizontalOffset,
                    verticalOffset: this.options.verticalOffset
                };
            };
        }
        return item;
    };

    const TestElement = Class.inherit({
        ctor: function (parameters) {
            this.renderer = parameters.renderer;
            this.translator = parameters.translator;
            this.container = parameters.container;
            this.owner = parameters.owner;
            this.incidentOccurred = parameters.incidentOccurred;
            this.tracker = parameters.tracker;
            this.className = parameters.className;
            this.root = this.renderer.g().attr({ 'class': parameters.className });
        },

        dispose: function () {
            this.disposed = true;
            return this;
        },

        render: function (options) {
            this.root = this.root || this.renderer.g().attr({ 'class': this.className });
            this.options = this._options = options;
            this.enabled = true;
            this.root.append(this.owner || this.container);
            return this;
        },

        clean: function () {
            if (this.root) {
                this.root.remove();
                delete this.root;
            }
            return this;
        },

        getOffset: function () {
            return Number(this.options.offset) || 0;
        },

        resize: function (layout) {
            $.extend(this.options, layout);
        }
    });

    const TestPointerElement = TestElement.inherit({
        value: function (val) {
            if (arguments.length) {
                val = Number(val);
                if (Number(this.options.currentValue) !== val && isFinite(this.translator.translate(val))) {
                    this.previousValue = Number(this.options.currentValue);
                    this.options.currentValue = val;
                }
                return this;
            }
            return this.options ? Number(this.options.currentValue) : NaN;
        }
    });

    (function circularGauge() {
        rendererModule.Renderer = sinon.stub();

        sinon.stub(axisModule, 'Axis', function (parameters) {
            const axis = new vizMocks.Axis(parameters);
            axis.measureLabels = sinon.stub().returns({
                width: 30,
                height: 15
            });
            axis.getOptions = sinon.stub().returns({
                tick: { length: 5 },
                minorTick: {},
                label: {}
            });
            axis.stub('getCanvas').returns({});
            axis.getCenter = sinon.stub().returns({ x: 100, y: 100 });
            return axis;
        });

        const environment = {
            beforeEach: function () {
                this.renderer = new vizMocks.Renderer();
                this.container = $(createTestContainer('#test-container', { width: '800px', height: '600px' }));
                rendererModule.Renderer.onCall(0).returns(this.renderer);
                const tooltipRender = new vizMocks.Renderer();
                rendererModule.Renderer.onCall(1).returns(tooltipRender);
            },
            afterEach: function () {
                this.renderer = null;
                axisModule.Axis.reset();
                rendererModule.Renderer.reset();
            }
        };
        const canvas = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 800,
            height: 600
        };

        QUnit.module('General', environment);

        QUnit.test('Gauge creation', function (assert) {
            new dxCircularGauge(this.container, {});

            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.strictEqual(rendererModule.Renderer.firstCall.args[0]['cssClass'], 'dxg dxg-circular-gauge', 'root class');

            assert.ok(scale.setBusinessRange.lastCall.args[0], 'range for scale');
            assert.deepEqual(scale.draw.getCall(0).args[0], canvas, 'canvas for scale');

            assert.deepEqual(scale.updateOptions.getCall(0).args[0].startAngle, -135, 'start angle');
            assert.deepEqual(scale.updateOptions.getCall(0).args[0].endAngle, 135, 'end angle');
        });

        QUnit.test('Ticks indent with positive value. Outside orientation of ticks', function (assert) {
            new dxCircularGauge(this.container, {
                scale: {
                    orientation: 'outside',
                    label: {
                        indentFromTick: 10
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, 15, 'indent');
        });

        // T677202
        QUnit.test('Default ticks indent when they are invisible', function (assert) {
            new dxCircularGauge(this.container, {
                scale: {
                    tick: {
                        length: 50,
                        visible: false
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, 10, 'indent');
        });

        QUnit.test('Ticks indent with positive value. Inside orientation of ticks', function (assert) {
            new dxCircularGauge(this.container, {
                scale: {
                    orientation: 'inside',
                    label: {
                        indentFromTick: 10
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, 10, 'indent');
        });

        QUnit.test('Ticks indent with positive value. Center orientation of ticks', function (assert) {
            new dxCircularGauge(this.container, {
                scale: {
                    orientation: 'center',
                    label: {
                        indentFromTick: 10
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, 12.5, 'indent');
        });

        QUnit.test('Ticks indent with negative value. Outside orientation of ticks', function (assert) {
            new dxCircularGauge(this.container, {
                scale: {
                    orientation: 'outside',
                    label: {
                        indentFromTick: -10
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, -40, 'indent');
        });

        QUnit.test('Ticks indent with negative value. Inside orientation of ticks', function (assert) {
            new dxCircularGauge(this.container, {
                scale: {
                    orientation: 'inside',
                    label: {
                        indentFromTick: -10
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, -45, 'indent');
        });

        QUnit.test('Ticks indent with negative value. Center orientation of ticks', function (assert) {
            new dxCircularGauge(this.container, {
                scale: {
                    orientation: 'center',
                    label: {
                        indentFromTick: -10
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, -42.5, 'indent');
        });

        QUnit.test('Ticks indent with zero value', function (assert) {
            new dxCircularGauge(this.container, {
                scale: {
                    label: {
                        indentFromTick: 0
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, 5, 'indent');
        });

        QUnit.module('dxCircularGauge - positioning of elements', {
            beforeEach: function () {
                environment.beforeEach.apply(this, arguments);
                this.check = function (assert, options, expected) {
                    const gauge = new dxCircularGauge(this.container, $.extend(true, {
                        scale: {
                            size: 10,
                            horizontalOffset: 23,
                            verticalOffset: 18,
                            inverseHorizontalOffset: 17,
                            inverseVerticalOffset: 12
                        },
                        rangeContainer: {
                            offset: 20,
                            size: 8
                        },
                        valueIndicator: {
                            offset: 30,
                            inverseHorizontalOffset: 15,
                            inverseVerticalOffset: 14
                        },
                        subvalueIndicator: {
                            offset: -5,
                            size: 12,
                            horizontalOffset: 19,
                            verticalOffset: 20
                        },
                        value: 50,
                        subvalues: [10, 20]
                    }, options));

                    assert.strictEqual(gauge._translator.getCodomainStart(), expected.start, 'translator codomain start');
                    assert.strictEqual(gauge._translator.getCodomainEnd(), expected.end, 'translator codomain end');

                    assert.strictEqual(gauge._rangeContainer._options.x, expected.x, 'range container x');
                    assert.strictEqual(gauge._rangeContainer._options.y, expected.y, 'range container y');
                    assert.strictEqual(gauge._rangeContainer._options.radius, expected.radius - 20, 'range container radius');

                    assert.strictEqual(gauge._valueIndicator.options.x, expected.x, 'main pointer x');
                    assert.strictEqual(gauge._valueIndicator.options.y, expected.y, 'main pointer y');
                    assert.strictEqual(gauge._valueIndicator.options.radius, expected.radius - 30, 'main pointer radius');

                    assert.strictEqual(gauge._subvalueIndicatorsSet._options.x, expected.x, 'sub pointers set x');
                    assert.strictEqual(gauge._subvalueIndicatorsSet._options.y, expected.y, 'sub pointers set y');
                    assert.strictEqual(gauge._subvalueIndicatorsSet._options.radius, expected.radius + 5, 'sub pointers set radius');

                    const scale = axisModule.Axis.getCall(0).returnValue;
                    assert.deepEqual(scale.shift.getCall(0).args, [{ right: expected.x - 100, bottom: expected.y - 100 }], 'shift scale');
                    assert.equal(scale.draw.callCount, 2, 'draw scale');
                    assert.equal(scale.measureLabels.callCount, 2, 'measure labels of scale');
                    assert.deepEqual(scale.measureLabels.getCall(0).args[0], canvas);
                    assert.deepEqual(scale.measureLabels.getCall(1).args[0], canvas);
                    assert.deepEqual(scale.draw.lastCall.args[0], {
                        width: expected.radius * 2,
                        height: expected.radius * 2
                    }, 'new radius');
                };
            },
            afterEach: function () {
                environment.afterEach.apply(this, arguments);
            }
        });

        QUnit.test('Default', function (assert) {
            this.check(assert, null, { x: 400, y: 348, radius: 311, start: 225, end: -45 });
        });

        QUnit.test('Half circle - up', function (assert) {
            this.check(assert, {
                geometry: { startAngle: '180', endAngle: '0' }
            }, { x: 400, y: 489, radius: 355, start: 180, end: 0 });
        });

        QUnit.test('Half circle - down', function (assert) {
            this.check(assert, {
                geometry: { startAngle: 0, endAngle: 180 }
            }, { x: 400, y: 111, radius: 355, start: 0, end: -180 });
        });

        QUnit.test('Half circle - left', function (assert) {
            this.check(assert, {
                geometry: { startAngle: -90, endAngle: 90 }
            }, { x: 547, y: 300, radius: 263, start: 270, end: 90 });
        });

        QUnit.test('Half circle - right', function (assert) {
            this.check(assert, {
                geometry: { startAngle: 90, endAngle: '-90' }
            }, { x: 254, y: 300, radius: 263, start: 90, end: -90 });
        });

        QUnit.test('Quarter circle - I', function (assert) {
            this.check(assert, {
                geometry: { startAngle: '90', endAngle: 360 }
            }, { x: 111, y: 586, radius: 549, start: 90, end: 0 });
        });

        QUnit.test('Quarter circle - II', function (assert) {
            this.check(assert, {
                geometry: { startAngle: '-180', endAngle: '-270' }
            }, { x: 690, y: 586, radius: 549, start: 180, end: 90 });
        });

        QUnit.test('Quarter circle - III', function (assert) {
            this.check(assert, {
                geometry: { startAngle: -90, endAngle: 180 }
            }, { x: 690, y: 14, radius: 549, start: 270, end: 180 });
        });

        QUnit.test('Quarter circle - IV', function (assert) {
            this.check(assert, {
                geometry: { startAngle: '720', endAngle: 270 }
            }, { x: 111, y: 14, radius: 549, start: 0, end: -90 });
        });

        QUnit.test('Full circle', function (assert) {
            this.check(assert, {
                geometry: { startAngle: 0, endAngle: 0 }
            }, { x: 400, y: 300, radius: 263, start: 0, end: -360 });
        });

        QUnit.test('[150; -80]', function (assert) {
            this.check(assert, {
                geometry: { startAngle: 150, endAngle: '-80' }
            }, { x: 381, y: 302, radius: 265, start: 150, end: -80 });
        });

        QUnit.test('[90; 180]', function (assert) {
            this.check(assert, {
                geometry: { startAngle: 90, endAngle: 180 }
            }, { x: 400, y: 300, radius: 263, start: 90, end: -180 });
        });

        QUnit.test('[-20; 160]', function (assert) {
            this.check(assert, {
                geometry: { startAngle: '-20', endAngle: '160' }
            }, { x: 412, y: 174, radius: 367, start: 340, end: 160 });
        });

        QUnit.test('[test, undefined] (validation)', function (assert) {
            this.check(assert, {
                geometry: { startAngle: 'test', endAngle: undefined }
            }, { x: 400, y: 348, radius: 311, start: 225, end: -45 });
        });

        QUnit.test('[{}, 90] (validation)', function (assert) {
            this.check(assert, {
                geometry: { startAngle: {}, endAngle: 90 }
            }, { x: 571, y: 348, radius: 311, start: 225, end: 90 });
        });

        QUnit.test('[-80, a] (validation)', function (assert) {
            this.check(assert, {
                geometry: { startAngle: -80, endAngle: 'a' }
            }, { x: 400, y: 300, radius: 263, start: 280, end: -45 });
        });

        //  B232105
        QUnit.test('Offset validation', function (assert) {
            const gauge = new dxCircularGauge(this.container, {
                scale: {
                    size: 10,
                    horizontalOffset: 23,
                    verticalOffset: 18,
                    inverseHorizontalOffset: 17,
                    inverseVerticalOffset: 12
                },
                rangeContainer: {
                    offset: 'test',
                    size: 8
                },
                valueIndicator: {
                    offset: {},
                    inverseHorizontalOffset: 15,
                    inverseVerticalOffset: 14
                },
                subvalueIndicator: {
                    offset: [],
                    size: 12,
                    horizontalOffset: 19,
                    verticalOffset: 20
                },
                value: 50,
                subvalues: [10, 20]
            });
            const x = 400;
            const y = 348;
            const radius = 316;

            assert.strictEqual(gauge._rangeContainer._options.x, x, 'range container x');
            assert.strictEqual(gauge._rangeContainer._options.y, y, 'range container y');
            assert.strictEqual(gauge._rangeContainer._options.radius, radius, 'range container radius');

            assert.strictEqual(gauge._valueIndicator.options.x, x, 'main pointer x');
            assert.strictEqual(gauge._valueIndicator.options.y, y, 'main pointer y');
            assert.strictEqual(gauge._valueIndicator.options.radius, radius, 'main pointer radius');

            assert.strictEqual(gauge._subvalueIndicatorsSet._options.x, x, 'sub pointers set x');
            assert.strictEqual(gauge._subvalueIndicatorsSet._options.y, y, 'sub pointers set y');
            assert.strictEqual(gauge._subvalueIndicatorsSet._options.radius, radius, 'sub pointers set radius');
        });

        //  B238939, B238978
        QUnit.test('[123; 123]', function (assert) {
            this.check(assert, {
                geometry: { startAngle: 123, endAngle: 123 }
            }, { x: 400, y: 300, radius: 263, start: 123, end: -237 });
        });

        QUnit.test('Default after apply subvalues', function (assert) {
            const gauge = new dxCircularGauge(this.container, {
                scale: {
                    size: 10,
                    horizontalOffset: 23,
                    verticalOffset: 18,
                    inverseHorizontalOffset: 17,
                    inverseVerticalOffset: 12
                },
                rangeContainer: {
                    offset: 20,
                    size: 8
                },
                valueIndicator: {
                    offset: 30,
                    inverseHorizontalOffset: 15,
                    inverseVerticalOffset: 14
                },
                subvalueIndicator: {
                    offset: -5,
                    size: 12,
                    horizontalOffset: 19,
                    verticalOffset: 20
                },
                value: 50
            });

            gauge.option('subvalues', [10, 20]);

            const expected = { x: 400, y: 348, radius: 311, start: 225, end: -45 };

            assert.strictEqual(gauge._translator.getCodomainStart(), expected.start, 'translator codomain start');
            assert.strictEqual(gauge._translator.getCodomainEnd(), expected.end, 'translator codomain end');

            assert.strictEqual(gauge._rangeContainer._options.x, expected.x, 'range container x');
            assert.strictEqual(gauge._rangeContainer._options.y, expected.y, 'range container y');
            assert.strictEqual(gauge._rangeContainer._options.radius, expected.radius - 20, 'range container radius');

            assert.strictEqual(gauge._valueIndicator.options.x, expected.x, 'main pointer x');
            assert.strictEqual(gauge._valueIndicator.options.y, expected.y, 'main pointer y');
            assert.strictEqual(gauge._valueIndicator.options.radius, expected.radius - 30, 'main pointer radius');

            assert.strictEqual(gauge._subvalueIndicatorsSet._options.x, expected.x, 'sub pointers set x');
            assert.strictEqual(gauge._subvalueIndicatorsSet._options.y, expected.y, 'sub pointers set y');
            assert.strictEqual(gauge._subvalueIndicatorsSet._options.radius, expected.radius + 5, 'sub pointers set radius');

            const scale = axisModule.Axis.getCall(0).returnValue;
            assert.deepEqual(scale.shift.getCall(1).args, [{ right: expected.x - 100, bottom: expected.y - 100 }], 'shift scale');
            assert.equal(scale.draw.callCount, 6, 'draw scale');
            assert.equal(scale.measureLabels.callCount, 6, 'measure labels of scale');
            assert.deepEqual(scale.measureLabels.getCall(0).args[0], canvas);
            assert.deepEqual(scale.measureLabels.getCall(1).args[0], canvas);
            assert.deepEqual(scale.measureLabels.getCall(2).args[0], canvas);
            assert.deepEqual(scale.measureLabels.getCall(3).args[0], canvas);
            assert.deepEqual(scale.measureLabels.getCall(4).args[0], canvas);
            assert.deepEqual(scale.measureLabels.getCall(5).args[0], canvas);
            assert.deepEqual(scale.draw.getCall(1).args[0], {
                width: expected.radius * 2,
                height: expected.radius * 2
            }, 'new radius');
            assert.deepEqual(gauge._canvas, canvas, 'gauge canvas is not changed');
        });

        QUnit.module('Center Template', environment);

        QUnit.test('Should create group for center template on widget creating', function (assert) {
            const centerTemplate = sinon.stub();
            const gauge = new dxCircularGauge(this.container, { centerTemplate });

            const centerTemplateGroup = gauge._renderer.g.getCall(10).returnValue;

            assert.deepEqual(centerTemplateGroup.attr.args[0][0], { class: 'dxg-hole-template' });
            assert.deepEqual(centerTemplateGroup.linkOn.args[0][0], gauge._renderer.root);
            assert.strictEqual(centerTemplateGroup.linkOn.args[0][1], 'center-template');
            assert.ok(centerTemplateGroup.linkAppend.called);
        });

        QUnit.test('Should render center template in group on widget creating', function (assert) {
            const centerTemplate = sinon.stub();
            const gauge = new dxCircularGauge(this.container, { centerTemplate });

            const centerTemplateGroup = gauge._renderer.g.getCall(10).returnValue;

            assert.deepEqual(centerTemplateGroup.css.args[0][0], {
                cursor: 'default',
                fill: '#767676',
                'font-family': '\'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana, sans-serif',
                'font-size': 12,
                'font-weight': 400
            }, 'styles applied on group');
            assert.deepEqual(centerTemplateGroup.attr.args[1][0], { visibility: 'hidden' }, 'group was hidden on start render');
            assert.deepEqual(centerTemplateGroup.attr.args[2][0], { visibility: 'visible' }, 'group start visible after render');
            assert.strictEqual(centerTemplate.callCount, 1, 'template function is called');
            assert.deepEqual(centerTemplateGroup.move.args[0], [389, 340], 'group was moved to center');
        });

        QUnit.test('Should render center template on option update', function (assert) {
            const firstCenterTemplate = sinon.stub();
            const secondCenterTemplate = sinon.stub();
            const gauge = new dxCircularGauge(this.container, { centerTemplate: firstCenterTemplate });

            const centerTemplateGroup = gauge._renderer.g.getCall(10).returnValue;
            centerTemplateGroup.clear.reset();

            gauge.option('centerTemplate', secondCenterTemplate);

            assert.ok(centerTemplateGroup.clear.called, 'group was cleared');
            assert.strictEqual(secondCenterTemplate.callCount, 1, 'new template function is called');
        });

        QUnit.test('Should rerender center template on value update', function (assert) {
            const centerTemplate = sinon.stub();
            const gauge = new dxCircularGauge(this.container, { centerTemplate: centerTemplate, value: 10 });

            const centerTemplateGroup = this.renderer.g.getCall(10).returnValue;
            centerTemplateGroup.clear.reset();
            centerTemplate.reset();

            gauge.option('value', 13);

            assert.ok(centerTemplateGroup.clear.called, 'group was cleared');
            assert.strictEqual(centerTemplate.callCount, 1, 'new template function is called');
        });

        QUnit.test('Should rerender center template on subvalues update', function (assert) {
            const centerTemplate = sinon.stub();
            const gauge = new dxCircularGauge(this.container, { centerTemplate: centerTemplate, subvalues: [3, 4] });

            const centerTemplateGroup = this.renderer.g.getCall(10).returnValue;
            centerTemplateGroup.clear.reset();
            centerTemplate.reset();

            gauge.option('subvalues', [5]);

            assert.ok(centerTemplateGroup.clear.called, 'group was cleared');
            assert.strictEqual(centerTemplate.callCount, 1, 'new template function is called');
        });

        QUnit.module('Disposing', environment);

        QUnit.test('Disposing', function (assert) {
            const gauge = new dxCircularGauge(this.container, {});
            const group = gauge._renderer.g.getCall(8).returnValue;

            this.container.remove();

            assert.strictEqual(group.linkOff.callCount, 1);
        });

        QUnit.test('Should dispose center template on remove container', function (assert) {
            const centerTemplate = sinon.stub();
            const gauge = new dxCircularGauge(this.container, { centerTemplate });

            const centerTemplateGroup = gauge._renderer.g.getCall(10).returnValue;

            this.container.remove();

            assert.ok(centerTemplateGroup.linkOff.called);
            assert.ok(centerTemplateGroup.dispose.called);
        });
    })();
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/circular_gauge","viz/axes/base_axis","core/class","viz/core/renderers/renderer"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/circular_gauge"), require("viz/axes/base_axis"), require("core/class"), require("viz/core/renderers/renderer"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=circularGauge.tests.js.map