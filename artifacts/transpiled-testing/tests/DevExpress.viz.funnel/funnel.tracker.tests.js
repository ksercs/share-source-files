!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.funnel/funnel.tracker.tests.js"], ["jquery","./commonParts/common.js","viz/funnel/tracker","events/click","events/pointer","viz/series/points/label","../../helpers/vizMocks.js","viz/funnel/label","viz/components/legend","viz/funnel/funnel"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.funnel/funnel.tracker.tests.js', ['jquery', './commonParts/common.js', 'viz/funnel/tracker', 'events/click', 'events/pointer', 'viz/series/points/label', '../../helpers/vizMocks.js', 'viz/funnel/label', 'viz/components/legend', 'viz/funnel/funnel'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const common = $__require('./commonParts/common.js');
    const createFunnel = common.createFunnel;
    const environment = common.environment;
    const trackerModule = $__require('viz/funnel/tracker');
    const clickEventName = $__require('events/click').name;
    const pointerEvents = $__require('events/pointer');
    const labelModule = $__require('viz/series/points/label');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const Label = labelModule.Label;
    const stubLabel = vizMocks.stubClass(Label);
    const labels = $__require('viz/funnel/label');
    const legendModule = $__require('viz/components/legend');
    const Legend = legendModule.Legend;
    const stubLegend = vizMocks.stubClass(Legend);

    const dxFunnel = $__require('viz/funnel/funnel');
    dxFunnel.addPlugin({
        name: 'tracker-test',
        init: function () {
            this._renderer.root.element = $('<div id=\'root\'>').appendTo('#test-container')[0];
        },
        dispose() {}
    });
    dxFunnel.addPlugin(trackerModule.plugin);
    dxFunnel.addPlugin(labels.plugin);
    dxFunnel.addPlugin(legendModule.plugin);

    const trackerEnvironment = $.extend({}, environment, {
        beforeEach: function () {
            const that = this;
            common.environment.beforeEach.apply(this, arguments);
            this.legend = new stubLegend();
            sinon.stub(labelModule, 'Label').callsFake(function () {
                const stub = new stubLabel();
                stub.stub('getBoundingRect').returns({
                    width: 0,
                    height: 0
                });
                return stub;
            });

            legendModule._setLegend(sinon.spy(function () {
                that.legend.stub('getTemplatesGroups').returns([]);
                that.legend.stub('getTemplatesDef').returns([]);
                return that.legend;
            }));
            this.itemGroupNumber = 1;
        },

        afterEach: function () {
            environment.afterEach.call(this);
            labelModule.Label.restore();
            legendModule._setLegend(Legend);
        },

        trigger: function (name, data, options) {
            const $target = $('<div>').appendTo(this.renderer.root.element);
            $target[0][trackerModule._TESTS_dataKey] = data;
            $target.trigger($.Event(name, options));
        }
    });

    QUnit.module('Initialization', trackerEnvironment);

    QUnit.test('Set data for items', function (assert) {
        createFunnel({
            dataSource: [{ value: 1 }, { value: 2 }]
        });

        const items = this.items();

        assert.equal(items.length, 2);
        assert.deepEqual(items[0].data.lastCall.args, [trackerModule._TESTS_dataKey, 0]);
        assert.deepEqual(items[1].data.lastCall.args, [trackerModule._TESTS_dataKey, 1]);
    });

    QUnit.module('Events', trackerEnvironment);

    QUnit.test('Hover on. Get item by tracker data', function (assert) {
        const widget = createFunnel({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }]
        });

        this.trigger(pointerEvents.move, 2);

        assert.strictEqual(widget.getAllItems()[0].isHovered(), false, 'state');
        assert.strictEqual(widget.getAllItems()[1].isHovered(), false, 'state');
        assert.strictEqual(widget.getAllItems()[2].isHovered(), true, 'state');
    });

    QUnit.test('Hover off', function (assert) {
        const widget = createFunnel({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }]
        });
        this.trigger(pointerEvents.move, 2);

        this.trigger(pointerEvents.move, 1);

        assert.strictEqual(widget.getAllItems()[1].isHovered(), true, 'state 1');
        assert.strictEqual(widget.getAllItems()[2].isHovered(), false, 'state 2');
    });

    QUnit.test('Hover on. Legend item', function (assert) {
        const widget = createFunnel({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }]
        });

        this.legend.stub('coordsIn').withArgs(97, 45).returns(true);
        this.legend.stub('getItemByCoord').withArgs(97, 45).returns({ id: 2 });

        this.trigger(pointerEvents.move, null, {
            pageX: 100,
            pageY: 50
        });

        assert.strictEqual(widget.getAllItems()[0].isHovered(), false, 'state');
        assert.strictEqual(widget.getAllItems()[1].isHovered(), false, 'state');
        assert.strictEqual(widget.getAllItems()[2].isHovered(), true, 'state');
    });

    QUnit.test('Hover on. Label item', function (assert) {
        const widget = createFunnel({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            label: {
                visible: true
            }
        });

        labelModule.Label.getCall(2).returnValue.stub('getBoundingRect').returns({
            x: 90,
            y: 40,
            width: 20,
            height: 10
        });

        this.trigger(pointerEvents.move, null, {
            pageX: 100,
            pageY: 50
        });

        assert.strictEqual(widget.getAllItems()[0].isHovered(), false, 'state');
        assert.strictEqual(widget.getAllItems()[1].isHovered(), false, 'state');
        assert.strictEqual(widget.getAllItems()[2].isHovered(), true, 'state');
    });

    QUnit.test('No hover any items if no data', function (assert) {
        const widget = createFunnel({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }]
        });

        this.legend.stub('coordsIn').withArgs(97, 45).returns(false);

        this.trigger(pointerEvents.move, null, {
            pageX: 100,
            pageY: 50
        });

        assert.strictEqual(widget.getAllItems()[0].isHovered(), false, 'state');
        assert.strictEqual(widget.getAllItems()[1].isHovered(), false, 'state');
        assert.strictEqual(widget.getAllItems()[2].isHovered(), false, 'state');
    });

    QUnit.test('Click', function (assert) {
        this.renderer.offsetTemplate = { left: 40, top: 30 };
        const spy = sinon.spy();
        const widget = createFunnel({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            onItemClick: spy
        });

        this.trigger(clickEventName, 2, { pageX: 400, pageY: 300 });

        assert.strictEqual(spy.callCount, 1, 'call count');
        assert.strictEqual(spy.lastCall.args[0].item, widget.getAllItems()[2], 'item');
    });

    QUnit.test('Legend click', function (assert) {
        this.renderer.offsetTemplate = { left: 40, top: 30 };
        const itemClick = sinon.spy();
        const spy = sinon.spy();
        const widget = createFunnel({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            onItemClick: itemClick,
            onLegendClick: spy
        });

        this.legend.stub('coordsIn').withArgs(60, 20).returns(true);
        this.legend.stub('getItemByCoord').withArgs(60, 20).returns({ id: 2 });

        this.trigger(clickEventName, null, { pageX: 100, pageY: 50 });

        assert.ok(!itemClick.called);
        assert.strictEqual(spy.callCount, 1, 'call count');
        assert.strictEqual(spy.lastCall.args[0].item, widget.getAllItems()[2], 'item');
    });

    QUnit.module('Tooltip', trackerEnvironment);

    QUnit.test('Show tooltip on hovered item', function (assert) {
        const widget = createFunnel({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            tooltip: {
                enabled: true
            }
        });

        sinon.spy(widget.getAllItems()[2], 'showTooltip');

        this.trigger(pointerEvents.move, 2);

        assert.ok(widget.getAllItems()[2].showTooltip.called);
    });

    QUnit.test('Show tooltip on hovered inside label item', function (assert) {
        const widget = createFunnel({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            label: {
                visible: true,
                position: 'inside'
            },
            tooltip: {
                enabled: true
            }
        });

        sinon.spy(widget.getAllItems()[2], 'showTooltip');

        labelModule.Label.getCall(2).returnValue.stub('getBoundingRect').returns({
            x: 90,
            y: 40,
            width: 20,
            height: 10
        });

        this.trigger(pointerEvents.move, null, {
            pageX: 100,
            pageY: 50
        });

        assert.ok(widget.getAllItems()[2].showTooltip.called);
    });

    QUnit.test('Do not show tooltip on hovered outside label item', function (assert) {
        const widget = createFunnel({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            label: {
                visible: true,
                position: 'columns'
            },
            tooltip: {
                enabled: true
            }
        });

        sinon.spy(widget.getAllItems()[2], 'showTooltip');

        labelModule.Label.getCall(2).returnValue.stub('getBoundingRect').returns({
            x: 90,
            y: 40,
            width: 20,
            height: 10
        });

        this.trigger(pointerEvents.move, null, {
            pageX: 100,
            pageY: 50
        });

        assert.ok(!widget.getAllItems()[2].showTooltip.called);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","./commonParts/common.js","viz/funnel/tracker","events/click","events/pointer","viz/series/points/label","../../helpers/vizMocks.js","viz/funnel/label","viz/components/legend","viz/funnel/funnel"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("./commonParts/common.js"), require("viz/funnel/tracker"), require("events/click"), require("events/pointer"), require("viz/series/points/label"), require("../../helpers/vizMocks.js"), require("viz/funnel/label"), require("viz/components/legend"), require("viz/funnel/funnel"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=funnel.tracker.tests.js.map