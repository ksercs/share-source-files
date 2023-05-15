!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.funnel/funnel.tooltip.tests.js"], ["jquery","./commonParts/common.js","../../helpers/vizMocks.js","viz/core/tooltip","viz/funnel/tooltip","viz/funnel/funnel"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.funnel/funnel.tooltip.tests.js', ['jquery', './commonParts/common.js', '../../helpers/vizMocks.js', 'viz/core/tooltip', 'viz/funnel/tooltip', 'viz/funnel/funnel'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const common = $__require('./commonParts/common.js');
    const createFunnel = common.createFunnel;
    const environment = common.environment;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const tooltipModule = $__require('viz/core/tooltip');
    const funnelTooltip = $__require('viz/funnel/tooltip');
    const dxFunnel = $__require('viz/funnel/funnel');
    const tooltipOrig = tooltipModule.Tooltip;

    dxFunnel.addPlugin(funnelTooltip.plugin);

    const tooltipEnvironment = $.extend({}, environment, {
        beforeEach: function () {
            const that = this;

            environment.beforeEach.apply(this, arguments);

            common.stubAlgorithm.getFigures.returns([[0, 0, 1, 0, 0, 1, 1, 1]]);
            common.stubAlgorithm.normalizeValues.returns([0.2, 0.5, 0.3]);

            $('#test-container').css({
                width: 800,
                height: 600
            });
            this.renderer.offsetTemplate = { left: 40, top: 30 };
            this.tooltip = new vizMocks.Tooltip();
            this.tooltip.stub('isEnabled').returns(true);
            this.tooltip.stub('show').returns(true);
            this.tooltip.stub('formatValue').returns('formatted');

            tooltipModule.DEBUG_set_tooltip(sinon.spy(function () {
                return that.tooltip;
            }));
        },
        afterEach: function () {
            environment.afterEach.call(this);
            tooltipModule.DEBUG_set_tooltip(tooltipOrig);
        }
    });

    QUnit.module('Tooltip', tooltipEnvironment);

    QUnit.test('Show tooltip', function (assert) {
        const widget = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }]
        });
        const testItem = widget.getAllItems()[0];

        this.tooltip.stub('formatValue').withArgs(0.2, 'percent').returns('percent-formatted');

        testItem.showTooltip();

        assert.deepEqual(this.tooltip.show.lastCall.args[0], {
            value: 1,
            valueText: 'formatted',
            percent: 0.2,
            percentText: 'percent-formatted',
            item: testItem
        }, 'show arg0');
        assert.deepEqual(this.tooltip.show.lastCall.args[1], { x: 440, y: 330, offset: 0 }, 'show arg1');
        assert.equal(this.tooltip.formatValue.args[0][0], 1);
    });

    QUnit.test('Show tooltip, async render', function (assert) {
        this.tooltip.stub('show').returns(undefined);
        const widget = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }]
        });
        const testItem = widget.getAllItems()[0];

        testItem.showTooltip();

        this.tooltip.show.lastCall.args[4](true);
        assert.ok(!this.tooltip.hide.called);
    });

    QUnit.test('Hide tooltip if it does not render, async render', function (assert) {
        this.tooltip.stub('show').returns(undefined);
        const widget = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }]
        });
        const testItem = widget.getAllItems()[0];

        testItem.showTooltip();

        assert.ok(!this.tooltip.hide.called);

        this.tooltip.show.lastCall.args[4](false);
        assert.ok(this.tooltip.hide.called);
    });

    QUnit.test('Only move tooltip if it shown on item', function (assert) {
        const widget = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }]
        });

        widget.getAllItems()[0].showTooltip();

        this.tooltip.show.reset();

        widget.getAllItems()[0].showTooltip([100, 100]);

        assert.ok(!this.tooltip.show.called);
        assert.deepEqual(this.tooltip.move.lastCall.args, [100, 100, 0], 'move');
    });

    QUnit.test('Show tooltip on different items', function (assert) {
        common.stubAlgorithm.getFigures.returns([[1], [1]]);
        const widget = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }, { value: 2 }]
        });
        const testItem = widget.getAllItems()[1];

        widget.getAllItems()[0].showTooltip();

        this.tooltip.stub('formatValue').withArgs(0.5, 'percent').returns('percent-formatted');

        this.tooltip.show.reset();

        testItem.showTooltip([100, 100]);

        assert.deepEqual(this.tooltip.show.lastCall.args[0], {
            value: 1,
            valueText: 'formatted',
            percentText: 'percent-formatted',
            percent: 0.5,
            item: testItem
        }, 'show arg0');
        assert.deepEqual(this.tooltip.show.lastCall.args[1], { x: 100, y: 100, offset: 0 }, 'show arg1');
    });

    QUnit.test('Hide tooltip', function (assert) {
        const widget = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }]
        });

        widget.getAllItems()[0].showTooltip();

        widget.hideTooltip();

        assert.ok(this.tooltip.hide.called);
    });

    QUnit.test('Tooltip is hidden when data source is updated', function (assert) {
        const widget = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }]
        });

        widget.getAllItems()[0].showTooltip();

        widget.option({
            dataSource: [{ value: 2 }]
        });

        assert.ok(this.tooltip.hide.called);
    });

    QUnit.test('Recalculate coords on resize', function (assert) {
        const widget = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }]
        });

        widget.getAllItems()[0].showTooltip();

        widget.option({
            size: {
                width: 300,
                height: 200
            }
        });

        assert.deepEqual(this.tooltip.move.lastCall.args, [190, 130, 0], 'move');
        assert.ok(!this.tooltip.hide.called);
    });

    QUnit.test('Customize tooltip', function (assert) {
        const widget = createFunnel({
            algorithm: 'stub',
            dataSource: [{ value: 1 }]
        });

        widget.getAllItems()[0].showTooltip();

        assert.equal(this.tooltip.update.args[0][0].customizeTooltip({ valueText: 'value', item: { argument: 'argument' } }).text, 'argument value');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","./commonParts/common.js","../../helpers/vizMocks.js","viz/core/tooltip","viz/funnel/tooltip","viz/funnel/funnel"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("./commonParts/common.js"), require("../../helpers/vizMocks.js"), require("viz/core/tooltip"), require("viz/funnel/tooltip"), require("viz/funnel/funnel"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=funnel.tooltip.tests.js.map