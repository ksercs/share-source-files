!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.vectorMap/mapLayer.collection.tests.js"], ["core/utils/common","../../helpers/vizMocks.js","viz/vector_map/map_layer","core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.vectorMap/mapLayer.collection.tests.js', ['core/utils/common', '../../helpers/vizMocks.js', 'viz/vector_map/map_layer', 'core/utils/deferred'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const noop = $__require('core/utils/common').noop;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const mapLayerModule = $__require('viz/vector_map/map_layer');
    const DeferredModule = $__require('core/utils/deferred');
    let StubMapLayer;

    QUnit.module('Basic', {
        beforeEach: function () {
            const that = this;
            that.readyCallbacks = [];
            StubMapLayer = vizMocks.stubClass(mapLayerModule._TESTS_MapLayer, null, {
                $constructor: function () {
                    this.proxy = { name: arguments[2] };
                    StubMapLayer.items.push(this);
                    const readyCallback = new DeferredModule.Deferred();
                    that.readyCallbacks.push(readyCallback);
                    this.getDataReadyCallback = function () {
                        return readyCallback;
                    };
                }
            });
            StubMapLayer.items = [];
            mapLayerModule._TESTS_stub_MapLayer(StubMapLayer);

            this.params = {
                renderer: new vizMocks.Renderer(),
                dataKey: 'data-key',
                tracker: {
                    on: sinon.spy(function () {
                        return noop;
                    }),
                    reset: sinon.spy()
                },
                eventTrigger: sinon.spy(),
                dataReady: sinon.spy()
            };
            this.target = new mapLayerModule.MapLayerCollection(this.params);
        },

        afterEach: function () {
            this.target.dispose();
        }
    });

    QUnit.test('Construct', function (assert) {
        const renderer = this.params.renderer;
        const container = renderer.g.lastCall.returnValue;
        const id = renderer.clipRect.lastCall.returnValue.id;

        assert.deepEqual(renderer.clipRect.lastCall.args, [], 'clip rect is created');
        assert.deepEqual(renderer.rect.lastCall.args, [], 'background is created');
        assert.deepEqual(renderer.rect.lastCall.returnValue.attr.lastCall.args, [{ 'class': 'dxm-background' }], 'background settings');
        assert.deepEqual(renderer.rect.lastCall.returnValue.data.lastCall.args, ['data-key', { name: 'background' }], 'background data');
        assert.deepEqual(renderer.g.lastCall.args, [], 'container is created');
        assert.deepEqual(container.attr.lastCall.args, [{ 'class': 'dxm-layers', 'clip-path': id }], 'container settings');
        assert.deepEqual(container.append.lastCall.args, [renderer.root], 'container is appended to container');
        assert.deepEqual(container.enableLinks.lastCall.args, [], 'links are enabled');
        const trackerHandlers = this.params.tracker.on.lastCall.args[0];
        assert.strictEqual(typeof trackerHandlers['click'], 'function', 'tracker.click');
        assert.strictEqual(typeof trackerHandlers['hover-on'], 'function', 'tracker.hover-on');
        assert.strictEqual(typeof trackerHandlers['hover-off'], 'function', 'tracker.hover-off');
    });

    QUnit.test('Destruct', function (assert) {
        this.target.dispose();
        this.target.dispose = noop;

        assert.deepEqual(this.params.renderer.clipRect.lastCall.returnValue.dispose.lastCall.args, [], 'clip rect is disposed');
    });

    QUnit.test('Set rect', function (assert) {
        this.target.setBackgroundOptions({ borderWidth: 5 });

        this.target.setRect([10, 20, 400, 300]);

        assert.deepEqual(this.params.renderer.rect.lastCall.returnValue.attr.lastCall.args, [{ x: 10, y: 20, width: 400, height: 300 }], 'background');
        assert.deepEqual(this.params.renderer.clipRect.lastCall.returnValue.attr.lastCall.args, [{ x: 15, y: 25, width: 390, height: 290 }], 'clip rect');
    });

    QUnit.test('Set background options', function (assert) {
        this.target.setRect([20, 30, 200, 100]);

        this.target.setBackgroundOptions({ borderWidth: 3, borderColor: 'green', color: 'red' });

        assert.deepEqual(this.params.renderer.rect.lastCall.returnValue.attr.lastCall.args, [{ stroke: 'green', 'stroke-width': 3, fill: 'red' }], 'background');
        assert.deepEqual(this.params.renderer.clipRect.lastCall.returnValue.attr.lastCall.args, [{ x: 23, y: 33, width: 194, height: 94 }], 'clip rect');
    });

    QUnit.test('Click layer', function (assert) {
        this.target.setOptions([{ name: 'layer-1' }, { name: 'layer-2' }]);

        this.params.tracker.on.lastCall.args[0]['click']({
            x: 10, y: 20,
            $event: { tag: 'event' },
            data: { name: 'layer-1', index: 'test-index' }
        });

        assert.deepEqual(StubMapLayer.items[0].raiseClick.lastCall.args, ['test-index', { tag: 'event', x: 7, y: 15 }], 'click');
    });

    QUnit.test('Click background', function (assert) {
        this.target.setOptions([{ name: 'layer-1' }, { name: 'layer-2' }]);

        this.params.tracker.on.lastCall.args[0]['click']({
            x: 10, y: 20,
            $event: { tag: 'event' },
            data: { name: 'background' }
        });

        assert.deepEqual(this.params.eventTrigger.lastCall.args, ['click', { event: { tag: 'event', x: 7, y: 15 } }], 'click');
    });

    QUnit.test('Hover on layer', function (assert) {
        this.target.setOptions([{ name: 'layer-1' }, { name: 'layer-2' }]);

        this.params.tracker.on.lastCall.args[0]['hover-on']({
            data: { name: 'layer-2', index: 'test-index' }
        });

        assert.deepEqual(StubMapLayer.items[1].hoverItem.lastCall.args, ['test-index', true], 'hover');
    });

    QUnit.test('Hover on not layer', function (assert) {
        this.target.setOptions([{ name: 'layer-1' }, { name: 'layer-2' }]);

        this.params.tracker.on.lastCall.args[0]['hover-on']({
            data: { name: 'test', index: 'test-index' }
        });

        assert.ok(true, 'no errors');
    });

    QUnit.test('Hover off layer', function (assert) {
        this.target.setOptions([{ name: 'layer-1' }, { name: 'layer-2' }]);

        this.params.tracker.on.lastCall.args[0]['hover-off']({
            data: { name: 'layer-2', index: 'test-index' }
        });

        assert.deepEqual(StubMapLayer.items[1].hoverItem.lastCall.args, ['test-index', false], 'hover');
    });

    QUnit.test('Hover off not layer', function (assert) {
        this.target.setOptions([{ name: 'layer-1' }, { name: 'layer-2' }]);

        this.params.tracker.on.lastCall.args[0]['hover-off']({
            data: { name: 'test', index: 'test-index' }
        });

        assert.ok(true, 'no errors');
    });

    // T657155
    QUnit.test('Items collection should be empty after updating to empty array', function (assert) {
        this.target.setOptions([{ name: 'layer-1' }, { name: 'layer-2' }]);

        this.target.setOptions([]);

        assert.strictEqual(this.target.items().length, 0);
    });

    // T660942
    QUnit.test('Update hovered layer', function (assert) {
        this.target.setOptions([{ name: 'layer-2' }]);
        this.params.tracker.reset.reset();

        this.target.setOptions([{ name: 'layer-1' }, { name: 'layer-2' }]);

        assert.strictEqual(this.params.tracker.reset.callCount, 1);
    });

    QUnit.test('Data is not ready', function (assert) {
        this.target.setOptions([{ name: 'layer-1' }, { name: 'layer-2' }]);

        assert.strictEqual(this.params.dataReady.callCount, 0);
    });

    QUnit.test('Data is ready', function (assert) {
        this.target.setOptions([{ name: 'layer-1' }, { name: 'layer-2' }]);

        this.readyCallbacks.forEach(rc => rc.resolve());

        assert.strictEqual(this.params.dataReady.callCount, 1);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/common","../../helpers/vizMocks.js","viz/vector_map/map_layer","core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/common"), require("../../helpers/vizMocks.js"), require("viz/vector_map/map_layer"), require("core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=mapLayer.collection.tests.js.map