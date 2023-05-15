!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.gauges/linearGauge.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/linear_gauge","viz/axes/base_axis","core/class","viz/core/renderers/renderer"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.gauges/linearGauge.tests.js', ['jquery', '../../helpers/vizMocks.js', 'viz/linear_gauge', 'viz/axes/base_axis', 'core/class', 'viz/core/renderers/renderer'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* global createTestContainer */

    const $ = $__require('jquery');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const dxLinearGauge = $__require('viz/linear_gauge');
    const factory = dxLinearGauge.prototype._factory;
    const axisModule = $__require('viz/axes/base_axis');
    const Class = $__require('core/class');
    const rendererModule = $__require('viz/core/renderers/renderer');

    $('<div id="test-container">').appendTo('#qunit-fixture');

    factory.RangeContainer = function (parameters) {
        parameters.className = 'test-range-container';
        const item = new TestElement(parameters);
        item.measure = function (layout) {
            return {
                min: this.vertical ? layout.x : layout.y,
                max: (this.vertical ? layout.x : layout.y) + this.options.size
            };
        };
        return item;
    };

    factory.createIndicator = function (parameters) {
        const item = new TestPointerElement(parameters);
        if (parameters.className === 'dxg-value-indicator') {
            item.measure = function (layout) {
                return {
                    min: (this.vertical ? layout.x : layout.y) - this.options.size / 2,
                    max: (this.vertical ? layout.x : layout.y) + this.options.size / 2
                };
            };
        } else if (parameters.className === 'dxg-subvalue-indicator') {
            item.measure = function (layout) {
                return {
                    min: this.vertical ? layout.x : layout.y,
                    max: (this.vertical ? layout.x : layout.y) + this.options.size,
                    indent: this.options.indent
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
            this.options = options;
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

    (function linearGauge() {
        rendererModule.Renderer = sinon.stub();

        sinon.stub(axisModule, 'Axis', function (parameters) {
            const axis = new vizMocks.Axis(parameters);
            axis.measureLabels = sinon.stub().returns({
                width: 30,
                height: 15,
                y: -15
            });
            axis.getOptions = sinon.stub().returns({
                tick: {},
                minorTick: {},
                label: {}
            });
            return axis;
        });

        const environment = {
            beforeEach: function () {
                this.renderer = new vizMocks.Renderer();
                this.container = $(createTestContainer('#test-container', { width: '800px', height: '600px' }));
                rendererModule.Renderer.onCall(0).returns(this.renderer);
                const tooltipRenderer = new vizMocks.Renderer();
                rendererModule.Renderer.onCall(1).returns(tooltipRenderer);
            },
            afterEach: function () {
                this.container.remove();
                axisModule.Axis.reset();
                rendererModule.Renderer.reset();
                this.renderer = null;
                delete this.container;
            }
        };

        QUnit.module('General', environment);

        QUnit.test('Gauge creation', function (assert) {
            new dxLinearGauge(this.container, {});

            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.strictEqual(rendererModule.Renderer.firstCall.args[0]['cssClass'], 'dxg dxg-linear-gauge', 'root class');
            assert.ok(scale.setBusinessRange.lastCall.args[0], 'range passed to scale');
            assert.deepEqual(scale.draw.getCall(0).args[0], { bottom: 0, top: 0, left: 0, right: 0, height: 600, width: 800 }, 'canvas passed to scale');
        });

        QUnit.test('Ticks indent with negative value. Horizontal. Top vertical orientation of ticks', function (assert) {
            new dxLinearGauge(this.container, {
                geometry: {
                    orientation: 'horizontal'
                },
                scale: {
                    verticalOrientation: 'top',
                    label: {
                        indentFromTick: -10
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, 15, 'indent');
        });

        QUnit.test('Ticks indent with negative value. Horizontal. Bottom vertical orientation of ticks', function (assert) {
            new dxLinearGauge(this.container, {
                geometry: {
                    orientation: 'horizontal'
                },
                scale: {
                    verticalOrientation: 'bottom',
                    label: {
                        indentFromTick: -10
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, 10, 'indent');
        });

        QUnit.test('Ticks indent with zero value', function (assert) {
            new dxLinearGauge(this.container, {
                scale: {
                    label: {
                        indentFromTick: 0
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, 0, 'indent');
        });

        QUnit.test('Ticks indent with positive value. Horizontal', function (assert) {
            new dxLinearGauge(this.container, {
                geometry: {
                    orientation: 'horizontal'
                },
                scale: {
                    label: {
                        indentFromTick: 10
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, -30, 'indent');
        });

        QUnit.test('Ticks indent with positive value. Vertical', function (assert) {
            new dxLinearGauge(this.container, {
                geometry: {
                    orientation: 'vertical'
                },
                scale: {
                    label: {
                        indentFromTick: 10
                    }
                }
            });

            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].label.indentFromAxis, -45, 'indent');
        });

        QUnit.test('Pass correct base value into indicator', function (assert) {
            const gauge = new dxLinearGauge(this.container, {
                scale: {
                    startValue: -1000,
                    endValue: 1000
                },
                valueIndicator: {
                    type: 'rangebar',
                    baseValue: 0
                },
                value: 50
            });

            assert.strictEqual(gauge._valueIndicator.options.baseValue, 0);
        });

        QUnit.test('Pass correct \'invert\' value into scale, when startValue < endValue and rtlEnabled = true', function (assert) {
            new dxLinearGauge(this.container, {
                rtlEnabled: true,
                scale: {
                    startValue: -1000,
                    endValue: 1000
                },
                value: 50
            });

            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.strictEqual(scale.setBusinessRange.lastCall.args[0].invert, true, 'invert passed to scale');
        });

        QUnit.test('Pass correct \'invert\' value into scale, when startValue > endValue and rtlEnabled = true', function (assert) {
            new dxLinearGauge(this.container, {
                rtlEnabled: true,
                scale: {
                    startValue: 1000,
                    endValue: -1000
                },
                value: 50
            });

            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.strictEqual(scale.setBusinessRange.lastCall.args[0].invert, false, 'XOR invert passed to scale');
        });

        QUnit.module('HorizontalGauge - positioning of elements', environment);

        QUnit.test('Default', function (assert) {
            const gauge = new dxLinearGauge(this.container, {
                scale: {
                    size: 10,
                    label: {
                        indentFromAxis: 10
                    }
                },
                rangeContainer: {
                    offset: 20,
                    size: 8
                },
                valueIndicator: {
                    offset: 30,
                    size: 16
                },
                subvalueIndicator: {
                    offset: -5,
                    size: 12,
                    indent: 17
                },
                value: 50,
                subvalues: [10, 20]
            });

            assert.strictEqual(gauge._translator.getCodomainStart(), 17, 'translator codomain start');
            assert.strictEqual(gauge._translator.getCodomainEnd(), 783, 'translator codomain end');

            assert.strictEqual(gauge._rangeContainer.options.y, 314, 'range container y');

            assert.strictEqual(gauge._valueIndicator.options.y, 324, 'main pointer y');

            assert.strictEqual(gauge._subvalueIndicatorsSet._options.y, 289, 'sub pointers set y');

            const scale = axisModule.Axis.getCall(0).returnValue;
            assert.deepEqual(scale.shift.getCall(0).args, [{ left: 0, top: -294 }], 'shift scale');
            assert.equal(scale.draw.callCount, 2, 'draw scale');
            assert.equal(scale.measureLabels.callCount, 2, 'measure labels of scale');
            assert.deepEqual(scale.measureLabels.getCall(0).args[0], {
                bottom: 0,
                height: 600,
                left: 0,
                right: 0,
                top: 0,
                width: 800
            });
            assert.deepEqual(scale.measureLabels.getCall(1).args[0], {
                bottom: 0,
                height: 600,
                left: 0,
                right: 0,
                top: 0,
                width: 800
            });
            assert.deepEqual(scale.draw.lastCall.args[0], {
                bottom: 0,
                height: 600,
                left: 17,
                right: 17,
                top: 0,
                width: 800
            }, 'new canvas for scale');
        });

        QUnit.test('Scale vertical orientation = top', function (assert) {
            new dxLinearGauge(this.container, {
                geometry: {
                    orientation: 'horizontal'
                },
                scale: {
                    size: 10,
                    verticalOrientation: 'top'
                },
                rangeContainer: {
                    offset: 20,
                    size: 8
                },
                valueIndicator: {
                    offset: 30,
                    size: 16
                },
                subvalueIndicator: {
                    offset: -5,
                    size: 12,
                    indent: 17
                }
            });
            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.deepEqual(scale.shift.getCall(0).args, [{ left: 0, top: -296 }], 'scale shifting');
            assert.deepEqual(scale.draw.lastCall.args[0], {
                bottom: 0,
                height: 600,
                left: 15,
                right: 15,
                top: 0,
                width: 800
            }, 'new canvas for scale');
        });

        QUnit.test('Scale vertical orientation = bottom', function (assert) {
            new dxLinearGauge(this.container, {
                geometry: {
                    orientation: 'horizontal'
                },
                scale: {
                    size: 10,
                    verticalOrientation: 'bottom'
                },
                rangeContainer: {
                    offset: 20,
                    size: 8
                },
                valueIndicator: {
                    offset: 30,
                    size: 16
                },
                subvalueIndicator: {
                    offset: -5,
                    size: 12,
                    indent: 17
                }
            });
            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.deepEqual(scale.shift.getCall(0).args, [{ left: 0, top: -294 }], 'scale shifting');
            assert.deepEqual(scale.draw.lastCall.args[0], {
                bottom: 0,
                height: 600,
                left: 15,
                right: 15,
                top: 0,
                width: 800
            }, 'new canvas for scale');
        });

        //  B232105
        QUnit.test('Offset validation', function (assert) {
            const gauge = new dxLinearGauge(this.container, {
                scale: {
                    size: 10,
                    label: {
                        indentFromAxis: 10
                    }
                },
                rangeContainer: {
                    offset: 'test',
                    size: 8
                },
                valueIndicator: {
                    offset: {},
                    size: 16
                },
                subvalueIndicator: {
                    offset: [],
                    size: 12,
                    indent: 17
                },
                value: 50,
                subvalues: [10, 20]
            });
            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.strictEqual(gauge._translator.getCodomainStart(), 17, 'translator codomain start');
            assert.strictEqual(gauge._translator.getCodomainEnd(), 783, 'translator codomain end');

            assert.deepEqual(scale.shift.getCall(0).args, [{ left: 0, top: -307 }], 'scale shifting');
            assert.deepEqual(scale.draw.lastCall.args[0], {
                bottom: 0,
                height: 600,
                left: 17,
                right: 17,
                top: 0,
                width: 800
            }, 'new canvas for scale');

            assert.strictEqual(gauge._rangeContainer.options.y, 307, 'range container y');
            assert.strictEqual(gauge._valueIndicator.options.y, 307, 'main pointer y');
            assert.strictEqual(gauge._subvalueIndicatorsSet._options.y, 307, 'sub pointers set y');
        });

        // T569322
        QUnit.test('Indents of labels', function (assert) {
            new dxLinearGauge(this.container, {
                scale: {
                    startValue: 0,
                    endValue: 30
                }
            });
            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.strictEqual(scale.updateOptions.lastCall.calledAfter(scale.setBusinessRange.lastCall), true);
        });

        QUnit.test('Pass the rtlEnabled option to the axis and translator', function (assert) {
            const gauge = new dxLinearGauge(this.container, {
                rtlEnabled: true,
                scale: {
                    startValue: -1000,
                    endValue: 1000
                },
                value: 100
            });

            assert.strictEqual(gauge._translator.inverted, true, 'translator rtlEnabled');
            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].inverted, true, 'axis rtlEnabled');
        });

        QUnit.module('VerticalGauge - positioning of elements', environment);

        QUnit.test('Default', function (assert) {
            const gauge = new dxLinearGauge(this.container, {
                geometry: {
                    orientation: 'vertical'
                },
                scale: {
                    size: 10
                },
                rangeContainer: {
                    offset: 20,
                    size: 8
                },
                valueIndicator: {
                    offset: 30,
                    size: 16
                },
                subvalueIndicator: {
                    offset: -5,
                    size: 12,
                    indent: 17
                },
                value: 50,
                subvalues: [10, 20]
            });

            assert.strictEqual(gauge._translator.getCodomainStart(), 583, 'translator codomain start');
            assert.strictEqual(gauge._translator.getCodomainEnd(), 17, 'translator codomain end');

            const scale = axisModule.Axis.getCall(0).returnValue;
            assert.deepEqual(scale.shift.getCall(0).args, [{ left: -401, top: 0 }], 'shift scale');
            assert.equal(scale.draw.callCount, 2, 'draw scale');
            assert.equal(scale.measureLabels.callCount, 2, 'measure labels of scale');
            assert.deepEqual(scale.measureLabels.getCall(0).args[0], {
                bottom: 0,
                height: 600,
                left: 0,
                right: 0,
                top: 0,
                width: 800
            });
            assert.deepEqual(scale.measureLabels.getCall(1).args[0], {
                bottom: 0,
                height: 600,
                left: 0,
                right: 0,
                top: 0,
                width: 800
            });
            assert.deepEqual(scale.draw.lastCall.args[0], {
                bottom: 17,
                height: 600,
                left: 0,
                right: 0,
                top: 17,
                width: 800
            }, 'new canvas for scale');

            assert.strictEqual(gauge._rangeContainer.options.x, 421, 'range container x');

            assert.strictEqual(gauge._valueIndicator.options.x, 431, 'main pointer x');

            assert.strictEqual(gauge._subvalueIndicatorsSet._options.x, 396, 'sub pointers set x');
        });

        QUnit.test('Scale horizontal orientation = left', function (assert) {
            new dxLinearGauge(this.container, {
                geometry: {
                    orientation: 'vertical'
                },
                scale: {
                    size: 10,
                    horizontalOrientation: 'left'
                },
                rangeContainer: {
                    offset: 20,
                    size: 8
                },
                valueIndicator: {
                    offset: 30,
                    size: 16
                },
                subvalueIndicator: {
                    offset: -5,
                    size: 12,
                    indent: 17
                }
            });
            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.deepEqual(scale.shift.getCall(0).args, [{ left: -404, top: 0 }], 'scale shifting');
            assert.deepEqual(scale.draw.lastCall.args[0], {
                bottom: 7.5,
                height: 600,
                left: 0,
                right: 0,
                top: 7.5,
                width: 800
            }, 'new canvas for scale');
        });

        QUnit.test('Scale horizontal orientation = center', function (assert) {
            new dxLinearGauge(this.container, {
                geometry: {
                    orientation: 'vertical'
                },
                scale: {
                    size: 10,
                    horizontalOrientation: 'center'
                },
                rangeContainer: {
                    offset: 20,
                    size: 8
                },
                valueIndicator: {
                    offset: 30,
                    size: 16
                },
                subvalueIndicator: {
                    offset: -5,
                    size: 12,
                    indent: 17
                }
            });
            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.deepEqual(scale.shift.getCall(0).args, [{ left: -402, top: 0 }], 'scale shifting');
            assert.deepEqual(scale.draw.lastCall.args[0], {
                bottom: 7.5,
                height: 600,
                left: 0,
                right: 0,
                top: 7.5,
                width: 800
            }, 'new canvas for scale');
        });

        QUnit.test('Scale horizontal orientation = right', function (assert) {
            new dxLinearGauge(this.container, {
                geometry: {
                    orientation: 'vertical'
                },
                scale: {
                    size: 10,
                    horizontalOrientation: 'right'
                },
                rangeContainer: {
                    offset: 20,
                    size: 8
                },
                valueIndicator: {
                    offset: 30,
                    size: 16
                },
                subvalueIndicator: {
                    offset: -5,
                    size: 12,
                    indent: 17
                }
            });
            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.deepEqual(scale.shift.getCall(0).args, [{ left: -401, top: 0 }], 'scale shifting');
            assert.deepEqual(scale.draw.lastCall.args[0], {
                bottom: 7.5,
                height: 600,
                left: 0,
                right: 0,
                top: 7.5,
                width: 800
            }, 'new canvas for scale');
        });

        //  B232105
        QUnit.test('Offset validation', function (assert) {
            const gauge = new dxLinearGauge(this.container, {
                geometry: { orientation: 'vertical' },
                scale: {
                    size: 10,
                    indent: 23
                },
                rangeContainer: {
                    offset: 'test',
                    size: 8
                },
                valueIndicator: {
                    offset: {},
                    size: 16
                },
                subvalueIndicator: {
                    offset: [],
                    size: 12,
                    indent: 17
                },
                value: 50,
                subvalues: [10, 20]
            });
            const scale = axisModule.Axis.getCall(0).returnValue;

            assert.strictEqual(gauge._translator.getCodomainStart(), 583, 'translator codomain start');
            assert.strictEqual(gauge._translator.getCodomainEnd(), 17, 'translator codomain end');

            assert.deepEqual(scale.shift.getCall(0).args, [{ left: -414, top: 0 }], 'scale shifting');
            assert.deepEqual(scale.draw.lastCall.args[0], {
                bottom: 17,
                height: 600,
                left: 0,
                right: 0,
                top: 17,
                width: 800
            }, 'new canvas for scale');

            assert.strictEqual(gauge._rangeContainer.options.x, 414, 'range container x');

            assert.strictEqual(gauge._valueIndicator.options.x, 414, 'main pointer x');

            assert.strictEqual(gauge._subvalueIndicatorsSet._options.x, 414, 'sub pointers set x');
        });

        QUnit.test('Don\'t pass the rtlEnabled option to the axis and translator', function (assert) {
            const gauge = new dxLinearGauge(this.container, {
                rtlEnabled: true,
                geometry: { orientation: 'vertical' }
            });

            assert.strictEqual(gauge._translator.inverted, false, 'vertical translator rtlEnabled');
            assert.equal(axisModule.Axis.getCall(0).returnValue.updateOptions.getCall(1).args[0].inverted, false, 'axis rtlEnabled');
        });
    })();
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/linear_gauge","viz/axes/base_axis","core/class","viz/core/renderers/renderer"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/linear_gauge"), require("viz/axes/base_axis"), require("core/class"), require("viz/core/renderers/renderer"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=linearGauge.tests.js.map