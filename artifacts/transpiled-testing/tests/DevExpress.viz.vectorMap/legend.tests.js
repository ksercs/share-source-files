!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.vectorMap/legend.tests.js"], ["jquery","core/utils/common","../../helpers/vizMocks.js","viz/components/legend","viz/vector_map/legend","viz/components/chart_theme_manager"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.vectorMap/legend.tests.js', ['jquery', 'core/utils/common', '../../helpers/vizMocks.js', 'viz/components/legend', 'viz/vector_map/legend', 'viz/components/chart_theme_manager'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const coreLegendModule = $__require('viz/components/legend');
    const legendModule = $__require('viz/vector_map/legend');
    const ThemeManager = vizMocks.stubClass($__require('viz/components/chart_theme_manager').ThemeManager);

    QUnit.module('Legend', {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.container = new vizMocks.Element();
            this.addItem = sinon.stub();
            this.removeItem = sinon.stub();
            this.bind = sinon.spy();
            this.unbind = sinon.spy();
            this.notifyDirty = sinon.spy();
            this.notifyReady = sinon.spy();
            this.themeManager = new ThemeManager();

            this.themeManager.stub('theme').withArgs('legend').returns({
                title: {}
            });
            this.legend = new legendModule._TESTS_Legend({
                renderer: this.renderer,
                container: this.container,
                layoutControl: {
                    addItem: this.addItem,
                    removeItem: this.removeItem
                },
                dataExchanger: {
                    bind: this.bind,
                    unbind: this.unbind
                },
                notifyDirty: this.notifyDirty,
                notifyReady: this.notifyReady,
                themeManager: this.themeManager,
                widget: {
                    _getTemplate: function (f) {
                        this.template = {
                            render: function (arg) {
                                return f(arg.model, arg.container);
                            }
                        };
                        return this.template;
                    }
                }
            });
            this.updateLayout = this.legend.updateLayout = sinon.spy($.proxy(function () {
                this.legend.draw(50, 50);
            }, this));
            this.options = {
                visible: true,
                margin: 8,
                markerSize: 14,
                font: {
                    color: '#7F7F7F',
                    family: 'Helvetica',
                    size: 14
                },
                border: {
                    visible: false
                },
                title: {},
                position: 'outside',
                paddingLeftRight: 10,
                paddingTopBottom: 10,
                columnItemSpacing: 8,
                rowItemSpacing: 8,
                hoverMode: 'includePoints',

                source: { layer: 'test-source', grouping: 'test-field' }
            };
        },

        afterEach: function () {
            this.legend.dispose();
        },

        updateData: function (values, partition, color) {
            this.bind.lastCall.args[2]({ partition: partition || [], values: values, defaultColor: color });
        }
    });

    QUnit.test('instance type', function (assert) {
        assert.ok(this.legend instanceof legendModule._TESTS_Legend);
        assert.ok(this.legend instanceof coreLegendModule.Legend);
    });

    QUnit.test('creation', function (assert) {
        const root = this.renderer.g.lastCall.returnValue;
        assert.deepEqual(root.attr.lastCall.args, [{ 'class': 'dxm-legend' }], 'settings');
        assert.deepEqual(root.linkOn.lastCall.args, [this.container, { name: 'legend', after: 'legend-base' }], 'root is linked to container');
        assert.deepEqual(root.linkAppend.lastCall.args, [], 'root is appended');
        assert.deepEqual(this.addItem.lastCall.args, [this.legend], 'added to layout');
    });

    QUnit.test('disposing', function (assert) {
        this.legend.dispose();
        this.legend.dispose = noop; // To prevent exception on teardown

        assert.deepEqual(this.removeItem.lastCall.args, [this.legend], 'removed from layout');
        assert.strictEqual(this.unbind.lastCall, null, 'unbind');
        assert.deepEqual(this.renderer.g.lastCall.returnValue.linkRemove.lastCall.args, [], 'root is removed');
        assert.deepEqual(this.renderer.g.lastCall.returnValue.linkOff.lastCall.args, [], 'root is unlinked');
    });

    QUnit.test('disposing / with unbinding', function (assert) {
        this.legend.setOptions(this.options).dispose();
        this.legend.dispose = noop; // To prevent exception on teardown

        assert.deepEqual(this.removeItem.lastCall.args, [this.legend], 'removed from layout');
        assert.deepEqual(this.unbind.lastCall.args, ['test-source', 'test-field', this.bind.lastCall.args[2]], 'unbind');
    });

    QUnit.test('setOptions', function (assert) {
        this.legend.setOptions(this.options);

        assert.deepEqual(this.bind.lastCall.args, ['test-source', 'test-field', this.bind.lastCall.args[2]], 'bind');
        assert.deepEqual(this.updateLayout.lastCall.args, [], 'layout');
    });

    QUnit.test('setOptions / reset', function (assert) {
        this.legend.setOptions(this.options);
        this.options.source = { layer: 'test-source-2', grouping: 'test-field-2' };

        this.legend.setOptions(this.options);

        assert.deepEqual(this.unbind.lastCall.args, ['test-source', 'test-field', this.bind.lastCall.args[2]], 'unbind');
        assert.deepEqual(this.bind.lastCall.args, ['test-source-2', 'test-field-2', this.bind.lastCall.args[2]], 'bind');
    });

    QUnit.test('data callback', function (assert) {
        this.legend.setOptions(this.options);

        this.updateData([1, 2, 3]);

        assert.strictEqual(this.renderer.rect.callCount, 3, 'items');
        assert.deepEqual(this.updateLayout.lastCall.args, [], 'layout');
    });

    QUnit.test('Pass default layer color for markers', function (assert) {
        this.legend.setOptions(this.options);

        this.updateData([1, 2], [], 'default color');

        assert.strictEqual(this.renderer.rect.getCall(0).returnValue.attr.getCall(0).args[0].fill, 'default color');
        assert.strictEqual(this.renderer.rect.getCall(1).returnValue.attr.getCall(0).args[0].fill, 'default color');
    });

    QUnit.test('customizeText format object', function (assert) {
        const spy = this.options.customizeText = sinon.spy();
        this.legend.setOptions(this.options);

        this.updateData([10, 20, 30], [1, 2, 3, 4]);

        assert.strictEqual(spy.callCount, 3, 'call count');
        assert.deepEqual(spy.getCall(0).args, [{ start: 1, end: 2, index: 0, visible: true, 'test-field': 10, marker: { size: 14, state: 'normal', opacity: 1 }, states: { normal: { fill: undefined, state: 'normal', opacity: 1 }, selection: undefined, hover: undefined }, size: 14 }], 'item 1');
        assert.deepEqual(spy.getCall(1).args, [{ start: 2, end: 3, index: 1, visible: true, 'test-field': 20, marker: { size: 14, state: 'normal', opacity: 1 }, states: { normal: { fill: undefined, state: 'normal', opacity: 1 }, selection: undefined, hover: undefined }, size: 14 }], 'item 2');
        assert.deepEqual(spy.getCall(2).args, [{ start: 3, end: 4, index: 2, visible: true, 'test-field': 30, marker: { size: 14, state: 'normal', opacity: 1 }, states: { normal: { fill: undefined, state: 'normal', opacity: 1 }, selection: undefined, hover: undefined }, size: 14 }], 'item 3');
    });

    QUnit.test('default marker shapes', function (assert) {
        this.legend.setOptions(this.options);

        this.updateData([1, 2, 3]);

        assert.strictEqual(this.renderer.stub('rect').callCount, 3);
    });

    QUnit.test('circle marker shapes', function (assert) {
        this.options.markerShape = 'circle';
        this.legend.setOptions(this.options);

        this.updateData([1, 2, 3]);

        assert.strictEqual(this.renderer.circle.callCount, 3);
    });

    QUnit.test('resize', function (assert) {
        this.legend.setOptions(this.options);
        this.updateData([1, 2, 3]);

        this.legend.resize({ width: 300, height: 100 });

        assert.strictEqual(this.renderer.g.callCount, 18, 'redrawn');
        assert.strictEqual(this.notifyDirty.callCount, 1, 'notify dirty');
        assert.strictEqual(this.notifyReady.callCount, 1, 'notify ready');
    });

    QUnit.test('resize / hide', function (assert) {
        this.legend.setOptions(this.options);
        this.updateData([1, 2, 3]);

        this.legend.resize(null);

        assert.strictEqual(this.renderer.g.firstCall.returnValue.children.length, 0, 'elements are cleared');
        assert.strictEqual(this.notifyDirty.callCount, 1, 'notify dirty');
        assert.strictEqual(this.notifyReady.callCount, 1, 'notify ready');
    });

    QUnit.test('resize / when size is not set', function (assert) {
        this.legend.resize({ width: 100, height: 50 });
        assert.ok(true, 'no errors');
    });

    const StubLegend = vizMocks.stubClass(legendModule._TESTS_Legend, null, {
        $constructor: function () {
            StubLegend.items.push(this);
        }
    });

    QUnit.module('LegendsControl', {
        beforeEach: function () {
            legendModule._TESTS_stubLegendType(StubLegend);
            StubLegend.items = [];
            this.theme = sinon.stub();
            this.parameters = {
                container: new vizMocks.Element(),
                themeManager: { theme: this.theme },
                layoutControl: {
                    suspend: sinon.spy(),
                    resume: sinon.spy()
                }
            };
            this.legendsControl = new legendModule.LegendsControl(this.parameters);
        },

        afterEach: function () {
            legendModule._TESTS_restoreLegendType();
            this.legendsControl.dispose();
        }
    });

    QUnit.test('instance type', function (assert) {
        assert.ok(this.legendsControl instanceof legendModule.LegendsControl);
    });

    QUnit.test('setOptions', function (assert) {
        const options = [{ option: 1 }, { option: 2 }, { option: 3 }];
        const theme = { theme: 'theme' };
        const parameters = this.parameters;
        this.theme.returns(theme);

        this.legendsControl.setOptions(options);

        assert.strictEqual(this.theme.callCount, 1, 'theme call count');
        assert.deepEqual(this.theme.lastCall.args, ['legend'], 'theme');
        assert.strictEqual(StubLegend.items.length, 3, 'count');
        $.each(StubLegend.items, function (i, legend) {
            assert.deepEqual(legend.ctorArgs, [parameters], 'parameters ' + i);
            assert.deepEqual(legend.setOptions.lastCall.args, [$.extend({}, theme, options[i])], 'setOptions ' + i);
        });

        assert.deepEqual(parameters.layoutControl.suspend.lastCall.args, [], 'layout is suspended');
        assert.deepEqual(parameters.layoutControl.resume.lastCall.args, [], 'layout is resumed');
        assert.ok(parameters.layoutControl.suspend.lastCall.calledBefore(StubLegend.items[0].setOptions.lastCall), 'call order');
        assert.ok(parameters.layoutControl.resume.lastCall.calledAfter(StubLegend.items[2].setOptions.lastCall), 'call order');
    });

    QUnit.test('setOptions / more than before', function (assert) {
        const options = [{ option: 1 }, { option: 2 }, { option: 3 }];
        const options2 = [{ option2: 1 }, { option2: 2 }, { option2: 3 }, { option2: 4 }];
        const theme = { theme: 'theme' };
        const parameters = this.parameters;
        this.theme.returns(theme);
        this.legendsControl.setOptions(options);

        this.legendsControl.setOptions(options2);

        assert.strictEqual(this.theme.callCount, 2, 'theme call count');
        assert.deepEqual(this.theme.lastCall.args, ['legend'], 'theme');
        assert.strictEqual(StubLegend.items.length, 4, 'count');
        $.each(StubLegend.items, function (i, legend) {
            assert.deepEqual(legend.ctorArgs, [parameters], 'parameters ' + i);
            assert.deepEqual(legend.setOptions.lastCall.args, [$.extend({}, theme, options2[i])], 'setOptions ' + i);
        });
        assert.strictEqual(StubLegend.items[0].setOptions.callCount, 2, 'call count 0');
        assert.strictEqual(StubLegend.items[1].setOptions.callCount, 2, 'call count 1');
        assert.strictEqual(StubLegend.items[2].setOptions.callCount, 2, 'call count 2');
        assert.strictEqual(StubLegend.items[3].setOptions.callCount, 1, 'call count 3');
    });

    QUnit.test('setOptions / less then before', function (assert) {
        const options = [{ option: 1 }, { option: 2 }, { option: 3 }];
        const options2 = [{ option2: 1 }, { option2: 2 }];
        const theme = { theme: 'theme' };
        const parameters = this.parameters;
        this.theme.returns(theme);
        this.legendsControl.setOptions(options, theme);

        this.legendsControl.setOptions(options2, theme);

        assert.strictEqual(this.theme.callCount, 2, 'theme call count');
        assert.deepEqual(this.theme.lastCall.args, ['legend'], 'theme');
        assert.strictEqual(StubLegend.items.length, 3, 'count');
        $.each(StubLegend.items.slice(0, 2), function (i, legend) {
            assert.deepEqual(legend.ctorArgs, [parameters], 'parameters ' + i);
            assert.deepEqual(legend.setOptions.lastCall.args, [$.extend({}, theme, options2[i])], 'setOptions ' + i);
        });
        assert.strictEqual(StubLegend.items[0].setOptions.callCount, 2, 'call count 0');
        assert.strictEqual(StubLegend.items[1].setOptions.callCount, 2, 'call count 1');
        assert.strictEqual(StubLegend.items[2].setOptions.callCount, 1, 'call count 2');
        assert.deepEqual(StubLegend.items[2].dispose.lastCall.args, [], 'dispose 2');
    });

    QUnit.test('init', function (assert) {
        assert.deepEqual(this.parameters.container.virtualLink.lastCall.args, ['legend-base']);
    });

    QUnit.test('dispose', function (assert) {
        const options = [{ option: 1 }, { option: 2 }, { option: 3 }];
        this.legendsControl.setOptions(options);

        this.legendsControl.dispose();
        this.legendsControl.dispose = noop; // To prevent exception on teardown

        $.each(StubLegend.items, function (i, legend) {
            assert.deepEqual(legend.dispose.lastCall.args, [], 'dispose ' + i);
        });
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","../../helpers/vizMocks.js","viz/components/legend","viz/vector_map/legend","viz/components/chart_theme_manager"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("../../helpers/vizMocks.js"), require("viz/components/legend"), require("viz/vector_map/legend"), require("viz/components/chart_theme_manager"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=legend.tests.js.map