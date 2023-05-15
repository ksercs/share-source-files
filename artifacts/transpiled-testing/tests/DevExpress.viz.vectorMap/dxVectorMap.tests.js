!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.vectorMap/dxVectorMap.tests.js"], ["jquery","core/utils/common","./vectorMapParts/commons.js","viz/core/renderers/renderer","viz/vector_map/projection.main","viz/vector_map/control_bar/control_bar","viz/vector_map/gesture_handler","viz/vector_map/tracker","viz/vector_map/data_exchanger","viz/vector_map/legend","viz/vector_map/layout","viz/vector_map/map_layer","viz/vector_map/tooltip_viewer","../../helpers/vizMocks.js","core/utils/type","viz/core/plaque","viz/vector_map/vector_map"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.vectorMap/dxVectorMap.tests.js', ['jquery', 'core/utils/common', './vectorMapParts/commons.js', 'viz/core/renderers/renderer', 'viz/vector_map/projection.main', 'viz/vector_map/control_bar/control_bar', 'viz/vector_map/gesture_handler', 'viz/vector_map/tracker', 'viz/vector_map/data_exchanger', 'viz/vector_map/legend', 'viz/vector_map/layout', 'viz/vector_map/map_layer', 'viz/vector_map/tooltip_viewer', '../../helpers/vizMocks.js', 'core/utils/type', 'viz/core/plaque', 'viz/vector_map/vector_map'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const commons = $__require('./vectorMapParts/commons.js');
    const rendererModule = $__require('viz/core/renderers/renderer');
    const projectionModule = $__require('viz/vector_map/projection.main');
    const controlBarModule = $__require('viz/vector_map/control_bar/control_bar');
    const gestureHandlerModule = $__require('viz/vector_map/gesture_handler');
    const trackerModule = $__require('viz/vector_map/tracker');
    const dataExchangerModule = $__require('viz/vector_map/data_exchanger');
    const legendModule = $__require('viz/vector_map/legend');
    const layoutModule = $__require('viz/vector_map/layout');
    const mapLayerModule = $__require('viz/vector_map/map_layer');
    const tooltipViewerModule = $__require('viz/vector_map/tooltip_viewer');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const typeUtils = $__require('core/utils/type');
    const plaqueModule = $__require('viz/core/plaque');

    $__require('viz/vector_map/vector_map');

    const stubLayersEnvironment = $.extend({}, commons.environment, {
        beforeEach: function () {
            commons.environment.beforeEach.apply(this, arguments);
            this.layerCollection.stub('items').returns([]);
            this.tracker.on = sinon.stub().returns(noop);
            sinon.stub(plaqueModule, 'Plaque').returns({ draw: sinon.stub(), hitTest: sinon.stub(), clear: sinon.stub() });
        },
        afterEach: function () {
            plaqueModule.Plaque.restore();
        }
    });

    QUnit.module('Map - elements', stubLayersEnvironment);

    QUnit.test('Renderer', function (assert) {
        const spy = sinon.spy(rendererModule, 'Renderer');

        this.createMap({ pathModified: 'path-modified' });

        assert.deepEqual(spy.lastCall.args, [{ cssClass: 'dxm dxm-vector-map', container: this.$container[0], pathModified: 'path-modified' }], 'renderer is created');
        assert.deepEqual(this.renderer.resize.firstCall.args, [400, 300], 'renderer is resized');
    });

    QUnit.test('Root', function (assert) {
        this.createMap();

        assert.strictEqual(this.renderer.root.attr.callCount, 2);
        assert.deepEqual(this.renderer.root.attr.getCall(0).args, [{ align: 'center', cursor: 'default' }], 'root settings');
    });

    QUnit.test('Background', function (assert) {
        this.themeManager.theme.withArgs('background').returns({ borderWidth: 3, borderColor: 'red' });

        this.createMap({
            background: { borderWidth: 2, color: 'green' }
        });
        vizMocks.forceThemeOptions(this.themeManager);

        assert.deepEqual(this.layerCollection.setBackgroundOptions.lastCall.args, [{ color: 'green', borderColor: 'red', borderWidth: 2 }], 'options');
    });

    QUnit.test('Layer collection', function (assert) {
        const spy = sinon.spy(mapLayerModule, 'MapLayerCollection');

        this.createMap({
            layers: [{ tag: 'layer-1', dataSource: 'data-1' }, { tag: 'layer-2', dataSource: 'data-2' }]
        });
        vizMocks.forceThemeOptions(this.themeManager);

        assert.strictEqual(spy.lastCall.args.length, 1, 'parameters count');
        const arg = spy.lastCall.args[0];
        assert.strictEqual(arg.renderer, this.renderer, 'parameter - renderer');
        assert.strictEqual(arg.projection, this.projection, 'parameter - projection');
        assert.strictEqual(arg.themeManager, this.themeManager, 'parameter - theme manager');
        assert.strictEqual(arg.tracker, this.tracker, 'parameter - tracker');
        assert.strictEqual(arg.dataExchanger, this.dataExchanger, 'parameter - data exchanger');
        assert.strictEqual(arg.dataKey, 'vectormap-data-1', 'parameter - dataKey');
        assert.ok(typeUtils.isFunction(arg.dataReady));
        assert.strictEqual(typeof arg.eventTrigger, 'function', 'parameter - event trigger');
        assert.strictEqual(typeof arg.notifyDirty, 'function', 'parameter - notify dirty');
        assert.strictEqual(typeof arg.notifyReady, 'function', 'parameter - notify ready');
        assert.deepEqual(this.layerCollection.setOptions.getCall(0).args, [[{ tag: 'layer-1', dataSource: 'data-1' }, { tag: 'layer-2', dataSource: 'data-2' }]], 'data is passed');
        assert.deepEqual(this.layerCollection.setOptions.getCall(1).args, [[{ tag: 'layer-1', dataSource: 'data-1' }, { tag: 'layer-2', dataSource: 'data-2' }]], 'options are passed');
        assert.ok(this.renderer.lock.getCall(0).calledBefore(this.layerCollection.setOptions.getCall(0)), 'data is passed inside the renderer lock');
        assert.ok(this.renderer.unlock.getCall(0).calledAfter(this.layerCollection.setOptions.getCall(0)), 'data is passed inside the renderer lock');
        assert.strictEqual(this.projection.setBounds.callCount, 1);
    });

    QUnit.test('Set bounds when data ready called. Without bounds in options', function (assert) {
        const spy = sinon.spy(mapLayerModule, 'MapLayerCollection');
        const layers = [{
            proxy: { tag: 'p1', getBounds: function () {
                    return [0, 0, 10, 10];
                } },
            getData: function () {
                return { count: function () {
                        return 0;
                    } };
            }
        }, {
            proxy: { tag: 'p2', getBounds: function () {
                    return [-200, -10, 10, 10];
                } },
            getData: function () {
                return { count: function () {
                        return 0;
                    } };
            }
        }];

        this.layerCollection.stub('items').returns(layers);

        this.createMap({
            getBoundsFromData: true,
            layers: layers
        });

        spy.lastCall.args[0].dataReady();

        assert.strictEqual(this.projection.setBounds.callCount, 2);
        assert.deepEqual(this.projection.setBounds.lastCall.args, [[-200, 10, 10, -10]]);
    });

    QUnit.test('Projection by data. Default bounds are include common bounds', function (assert) {
        const spy = sinon.spy(mapLayerModule, 'MapLayerCollection');
        const layers = [{
            proxy: { tag: 'p1', getBounds: function () {
                    return [0, 0, 10, 10];
                } },
            getData: function () {
                return { count: function () {
                        return 0;
                    } };
            }
        }, {
            proxy: { tag: 'p2', getBounds: function () {
                    return [-60, -10, 10, 10];
                } },
            getData: function () {
                return { count: function () {
                        return 0;
                    } };
            }
        }];

        this.layerCollection.stub('items').returns(layers);

        this.createMap({
            layers: layers
        });

        spy.lastCall.args[0].dataReady();

        assert.strictEqual(this.projection.setEngine.callCount, 1);
    });

    QUnit.test('Projection by data. Without projection in options', function (assert) {
        const spy = sinon.spy(mapLayerModule, 'MapLayerCollection');
        const layers = [{
            proxy: { tag: 'p1', getBounds: function () {
                    return [0, 0, 10, 10];
                } },
            getData: function () {
                return { count: function () {
                        return 0;
                    } };
            }
        }, {
            proxy: { tag: 'p2', getBounds: function () {
                    return [-200, -10, 10, 10];
                } },
            getData: function () {
                return { count: function () {
                        return 0;
                    } };
            }
        }];

        this.layerCollection.stub('items').returns(layers);

        this.createMap({
            layers: layers
        });

        spy.lastCall.args[0].dataReady();

        assert.strictEqual(this.projection.setEngine.callCount, 2);
        assert.deepEqual(this.projection.setEngine.lastCall.args[0].to([-200, -10]), [-1, -1]);
        assert.deepEqual(this.projection.setEngine.lastCall.args[0].from([-1, -1]), [-200, -10]);
    });

    QUnit.test('Projection by data. Projection in options', function (assert) {
        const spy = sinon.spy(mapLayerModule, 'MapLayerCollection');
        const layers = [{
            proxy: { tag: 'p1', getBounds: function () {
                    return [0, 0, 10, 10];
                } },
            getData: function () {
                return { count: function () {
                        return 0;
                    } };
            }
        }, {
            proxy: { tag: 'p2', getBounds: function () {
                    return [-200, -10, 10, 10];
                } },
            getData: function () {
                return { count: function () {
                        return 0;
                    } };
            }
        }];

        this.layerCollection.stub('items').returns(layers);

        this.createMap({
            layers: layers,
            projection: {}
        });

        spy.lastCall.args[0].dataReady();
        assert.strictEqual(this.projection.setEngine.callCount, 1);
    });

    QUnit.test('Bounds by data. Empty bbox', function (assert) {
        const spy = sinon.spy(mapLayerModule, 'MapLayerCollection');
        const layers = [];

        this.layerCollection.stub('items').returns(layers);

        this.createMap({
            getBoundsFromData: true,
            layers: layers
        });

        spy.lastCall.args[0].dataReady();

        assert.strictEqual(this.projection.setBounds.callCount, 2);
        assert.deepEqual(this.projection.setBounds.lastCall.args[0], [undefined, undefined, undefined, undefined]);
    });

    QUnit.test('Set bounds when data ready called. With bounds in options', function (assert) {
        const spy = sinon.spy(mapLayerModule, 'MapLayerCollection');
        const layers = [{
            proxy: { tag: 'p1', getBounds: function () {
                    return [0, 0, 10, 10];
                } },
            getData: function () {
                return { count: function () {
                        return 0;
                    } };
            }
        }, {
            proxy: { tag: 'p2', getBounds: function () {
                    return [-200, -10, 10, 10];
                } },
            getData: function () {
                return { count: function () {
                        return 0;
                    } };
            }
        }];

        this.layerCollection.stub('items').returns(layers);

        this.createMap({
            getBoundsFromData: true,
            bounds: [10, 10, 10, 10],
            layers: [{ tag: 'layer-1', dataSource: 'data-1' }]
        });

        spy.lastCall.args[0].dataReady();

        assert.strictEqual(this.projection.setBounds.callCount, 1);
    });

    QUnit.test('Layer collection - object option', function (assert) {
        this.createMap({
            layers: { tag: 'layer', dataSource: 'data' }
        });
        vizMocks.forceThemeOptions(this.themeManager);

        assert.deepEqual(this.layerCollection.setOptions.getCall(0).args, [{ tag: 'layer', dataSource: 'data' }], 'data is passed');
        assert.deepEqual(this.layerCollection.setOptions.getCall(1).args, [{ tag: 'layer', dataSource: 'data' }], 'options are passed');
    });

    QUnit.test('Projection', function (assert) {
        const spy = sinon.spy(projectionModule, 'Projection');

        this.createMap({
            projection: 'projection',
            bounds: 'bounds',
            center: 'center',
            zoomFactor: 'zoom-factor',
            maxZoomFactor: 'max-zoom-factor'
        });

        assert.strictEqual(spy.lastCall.args.length, 1, 'created');

        assert.deepEqual(this.projection.setEngine.lastCall.args, ['projection'], 'setEngine is called');
        assert.deepEqual(this.projection.setBounds.lastCall.args, ['bounds'], 'setBounds is called');
        assert.deepEqual(this.projection.setMaxZoom.lastCall.args, ['max-zoom-factor'], 'setMaxZoom is called');
        assert.deepEqual(this.projection.setZoom.lastCall.args, ['zoom-factor'], 'setZoom is called');
        assert.deepEqual(this.projection.setCenter.lastCall.args, ['center'], 'setCenter is called');
        assert.deepEqual(this.projection.setSize.lastCall.args[0], { bottom: 0, height: 300, left: 0, right: 0, top: 0, width: 400 }, 'setSize is called');

        assert.strictEqual(typeof spy.lastCall.args[0].centerChanged, 'function', 'centerChanged');
        assert.strictEqual(typeof spy.lastCall.args[0].zoomChanged, 'function', 'zoomChanged');
    });

    QUnit.test('DataExchanger', function (assert) {
        const spy = sinon.spy(dataExchangerModule, 'DataExchanger');

        this.createMap();

        assert.deepEqual(spy.lastCall.args, [], 'created');
    });

    QUnit.test('GestureHandler', function (assert) {
        const spy = sinon.spy(gestureHandlerModule, 'GestureHandler');

        this.createMap({
            panningEnabled: 1,
            zoomingEnabled: 0
        });
        vizMocks.forceThemeOptions(this.themeManager);

        assert.deepEqual(spy.lastCall.args, [{
            projection: this.projection,
            renderer: this.renderer,
            tracker: this.tracker
        }], 'created');

        assert.deepEqual(this.gestureHandler.setInteraction.lastCall.args, [{ centeringEnabled: true, zoomingEnabled: false }], 'setInteraction is called');
    });

    QUnit.test('LayoutControl', function (assert) {
        const spy = sinon.spy(layoutModule, 'LayoutControl');

        const map = this.createMap({ layers: {} });

        assert.deepEqual(spy.lastCall.args, [map], 'created');
        assert.ok(this.layoutControl.suspend.getCall(0).calledBefore(this.controlBar.setOptions.lastCall), 'suspend');

        assert.ok(this.layoutControl.resume.getCall(0).calledBefore(this.layerCollection.setOptions.lastCall), 'resume');
        assert.ok(this.layoutControl.resume.getCall(0).calledAfter(this.controlBar.setOptions.getCall(0)), 'resume');

        assert.equal(this.layoutControl.resume.callCount, 1);
        assert.equal(this.controlBar.setOptions.callCount, 1);
    });

    QUnit.test('Tracker', function (assert) {
        const spy = sinon.spy(trackerModule, 'Tracker');

        this.createMap({
            touchEnabled: 0,
            wheelEnabled: 1
        });
        vizMocks.forceThemeOptions(this.themeManager);

        assert.deepEqual(spy.lastCall.args, [{
            root: this.renderer.root,
            projection: this.projection,
            dataKey: 'vectormap-data-1'
        }], 'created');

        assert.deepEqual(this.tracker.setOptions.lastCall.args, [{ touchEnabled: 0, wheelEnabled: 1 }], 'setOptions is called');
    });

    QUnit.test('Control bar', function (assert) {
        const spy = sinon.spy(controlBarModule, 'ControlBar');
        this.themeManager.theme.withArgs('controlBar').returns({ theme: 'control-bar' });

        this.createMap({
            controlBar: { tag: 'option' },
            panningEnabled: 0,
            zoomingEnabled: 1
        });
        vizMocks.forceThemeOptions(this.themeManager);

        assert.deepEqual(spy.lastCall.args, [{
            renderer: this.renderer,
            container: this.renderer.root,
            layoutControl: this.layoutControl,
            projection: this.projection,
            tracker: this.tracker,
            dataKey: 'vectormap-data-1'
        }], 'created');

        assert.deepEqual(this.controlBar.setInteraction.lastCall.args, [{ centeringEnabled: false, zoomingEnabled: true }], 'setInteraction is called');
        assert.deepEqual(this.controlBar.setOptions.lastCall.args, [{ theme: 'control-bar', tag: 'option' }], 'setOptions is called');
    });

    QUnit.test('Legends', function (assert) {
        const spy = sinon.spy(legendModule, 'LegendsControl');

        const map = this.createMap({
            legends: {
                option: 'option'
            }
        });
        vizMocks.forceThemeOptions(this.themeManager);

        assert.deepEqual(spy.lastCall.args, [{
            renderer: this.renderer,
            widget: map,
            container: this.renderer.root,
            layoutControl: this.layoutControl,
            dataExchanger: this.dataExchanger,
            themeManager: this.themeManager,
            notifyDirty: spy.lastCall.args[0].notifyDirty,
            notifyReady: spy.lastCall.args[0].notifyReady
        }], 'created');
        assert.deepEqual(this.legendsControl.setOptions.lastCall.args, [{ option: 'option' }], 'setOptions is called');
    });

    QUnit.test('TooltipViewer', function (assert) {
        const spy = sinon.spy(tooltipViewerModule, 'TooltipViewer');

        this.createMap();

        assert.deepEqual(spy.lastCall.args, [{
            tracker: this.tracker,
            layerCollection: this.layerCollection,
            tooltip: this.tooltip
        }], 'created');
    });

    QUnit.test('Disposing', function (assert) {
        this.createMap();

        this.$container.remove(); // Force disposing
        assert.ok(this.renderer.dispose.called, 'renderer is disposed');

        assert.deepEqual(this.themeManager.dispose.lastCall.args, [], 'theme manager is disposed');
        assert.deepEqual(this.projection.dispose.lastCall.args, [], 'projection is disposed');
        assert.deepEqual(this.dataExchanger.dispose.lastCall.args, [], 'data exchanger is disposed');
        assert.deepEqual(this.layerCollection.dispose.lastCall.args, [], 'layer collection is disposed');
        assert.deepEqual(this.tracker.dispose.lastCall.args, [], 'tracker is disposed');
        assert.deepEqual(this.controlBar.dispose.lastCall.args, [], 'control bar is disposed');
        assert.deepEqual(this.gestureHandler.dispose.lastCall.args, [], 'gesture handler is disposed');
        assert.deepEqual(this.legendsControl.dispose.lastCall.args, [], 'legends control is disposed');
        assert.deepEqual(this.tooltipViewer.dispose.lastCall.args, [], 'tooltip viewer is disposed');
        assert.deepEqual(this.layoutControl.dispose.lastCall.args, [], 'layout control is disposed');
    });

    // T127469
    QUnit.test('Disposing - elements cleaning order', function (assert) {
        this.createMap();

        this.$container.remove(); // Force disposing

        const methods = $.map([this.tracker, this.layerCollection, this.controlBar, this.legendsControl], function (obj) {
            return obj.stub('clean');
        });
        try {
            sinon.assert.callOrder.apply(null, methods);
            assert.ok(true);
        } catch (e) {
            assert.ok(false);
        }
    });

    // T127469
    QUnit.test('Disposing - elements disposing order', function (assert) {
        this.createMap();

        this.$container.remove(); // Force disposing

        const methods = $.map([this.controlBar, this.gestureHandler, this.tracker, this.legendsControl, this.layerCollection, this.layoutControl, this.tooltipViewer, this.dataExchanger, this.projection], function (obj) {
            return obj.stub('dispose');
        });
        try {
            sinon.assert.callOrder.apply(null, methods);
            assert.ok(true);
        } catch (e) {
            assert.ok(false);
        }
    });

    QUnit.module('Annotations', stubLayersEnvironment);

    QUnit.test('Should created group for annotations', function (assert) {
        this.createMap();

        assert.equal(this.renderer.g.returnValues[1].attr.args[0][0]['class'], 'dxm-annotations');
        assert.equal(this.renderer.g.returnValues[1].css.args[0][0]['text-anchor'], 'start');
        assert.ok(this.renderer.g.returnValues[1].linkAppend.called);
        assert.deepEqual(this.renderer.g.returnValues[1].linkOn.args[0], [this.renderer.root, 'annotations']);
    });

    QUnit.test('Should created group for annotations before controll bar and legend', function (assert) {
        const spyLegend = sinon.spy(legendModule, 'LegendsControl');
        const spyControlBar = sinon.spy(controlBarModule, 'ControlBar');
        this.createMap();

        assert.ok(this.renderer.g.returnValues[1].attr.calledBefore(spyControlBar));
        assert.ok(this.renderer.g.returnValues[1].attr.calledBefore(spyLegend));
    });

    QUnit.test('Should be rendered', function (assert) {
        this.createMap({ annotations: [{ type: 'text' }] });

        assert.equal(plaqueModule.Plaque.lastCall.args[0].type, 'text');
        assert.deepEqual(plaqueModule.Plaque.returnValues[0].draw.lastCall.args[0], {
            canvas: undefined,
            offsetX: undefined,
            offsetY: undefined
        });
    });

    QUnit.test('With map coordinates', function (assert) {
        this.projection.getCanvas = sinon.stub().returns('canvas');
        this.projection.toScreenPoint = function (value) {
            return value;
        };
        this.createMap({ annotations: [{ type: 'text', text: 'annotation text', coordinates: [20, 40], offsetX: 2, offsetY: 3 }] });

        assert.deepEqual(plaqueModule.Plaque.lastCall.args[0].type, 'text');
        assert.deepEqual(plaqueModule.Plaque.lastCall.args[0].text, 'annotation text');
        assert.deepEqual(plaqueModule.Plaque.lastCall.args[4], true, 'bounding annotation');
        assert.deepEqual(plaqueModule.Plaque.returnValues[0].draw.lastCall.args[0], {
            canvas: 'canvas',
            offsetX: 2,
            offsetY: 3,
            x: 20,
            y: 40
        });
    });

    QUnit.test('With pixel coordinates', function (assert) {
        this.projection.getCanvas = sinon.stub().returns('canvas');
        this.projection.toScreenPoint = function (value) {
            return value;
        };
        this.createMap({ annotations: [{ type: 'text', text: 'annotation text', x: 40, y: 50, offsetX: 2, offsetY: 3 }] });

        assert.deepEqual(plaqueModule.Plaque.lastCall.args[0].type, 'text');
        assert.deepEqual(plaqueModule.Plaque.lastCall.args[0].text, 'annotation text');
        assert.deepEqual(plaqueModule.Plaque.lastCall.args[4], false, 'not bounding annotation');
        assert.deepEqual(plaqueModule.Plaque.returnValues[0].draw.lastCall.args[0], {
            canvas: 'canvas',
            offsetX: 2,
            offsetY: 3
        });
    });

    QUnit.test('Should subscribe on change move and zoom events', function (assert) {
        this.createMap({ annotations: [{ type: 'text' }] });

        assert.ok(this.tracker.on.args[0][0].move);
        assert.ok(this.tracker.on.args[0][0].zoom);

        // render after move
        this.tracker.on.args[0][0].move();

        assert.ok(plaqueModule.Plaque.callCount, 1);
        assert.ok(plaqueModule.Plaque.returnValues[0].draw.callCount, 1);

        // render after zoom
        this.tracker.on.args[0][0].zoom();

        assert.ok(plaqueModule.Plaque.callCount, 2);
        assert.ok(plaqueModule.Plaque.returnValues[0].draw.callCount, 2);

        // render after change zoom by control bar
        this.tracker.on.args[0][0].end();
        assert.ok(plaqueModule.Plaque.callCount, 3);
        assert.ok(plaqueModule.Plaque.returnValues[0].draw.callCount, 3);
    });

    QUnit.test('Annotation should be re-render after update size', function (assert) {
        this.createMap({ annotations: [{ type: 'text', text: 'annotation' }] });

        this.map.option('size', { width: 300, height: 400 });

        assert.equal(plaqueModule.Plaque.callCount, 2);
        assert.equal(plaqueModule.Plaque.returnValues[0].draw.callCount, 2);
        assert.equal(plaqueModule.Plaque.returnValues[0].clear.callCount, 1);
    });

    QUnit.module('Map - API', stubLayersEnvironment);

    QUnit.test('Applying bounds by data', function (assert) {
        const layers = [{
            proxy: {
                tag: 'p1',
                getBounds: function () {
                    return [0, 0, 10, 10];
                }
            },
            getData: function () {
                return { count: function () {
                        return 0;
                    } };
            }
        }, {
            proxy: {
                tag: 'p2',
                getBounds: function () {
                    return [-10, -10, 10, 10];
                }
            },
            getData: function () {
                return {
                    count: function () {
                        return 0;
                    }
                };
            }
        }];
        const spy = sinon.spy(mapLayerModule, 'MapLayerCollection');
        this.createMap({
            getBoundsFromData: true
        });
        this.layerCollection.stub('items').returns(layers);

        spy.lastCall.args[0].dataReady();

        assert.deepEqual(this.projection.setBounds.lastCall.args[0], [-10, 10, 10, -10]);
    });

    QUnit.test('getLayers', function (assert) {
        const layers = [{ proxy: { tag: 'p1' } }, { proxy: { tag: 'p2' } }, { proxy: { tag: 'p3' } }];
        this.createMap();
        this.layerCollection.stub('items').returns(layers);

        assert.deepEqual(this.map.getLayers(), [{ tag: 'p1' }, { tag: 'p2' }, { tag: 'p3' }], 'return value');
        assert.deepEqual(this.layerCollection.items.lastCall.args, [], 'layer collection');
    });

    QUnit.test('getLayerByIndex', function (assert) {
        this.createMap();
        this.layerCollection.stub('byIndex').withArgs(1).returns({ proxy: { tag: 'p' } });

        assert.deepEqual(this.map.getLayerByIndex(1), { tag: 'p' });
        assert.strictEqual(this.map.getLayerByIndex(2), null);
    });

    QUnit.test('getLayerByName', function (assert) {
        this.createMap();
        this.layerCollection.stub('byName').withArgs('n').returns({ proxy: { tag: 'p' } });

        assert.deepEqual(this.map.getLayerByName('n'), { tag: 'p' });
        assert.strictEqual(this.map.getLayerByIndex('m'), null);
    });

    QUnit.test('clearSelection', function (assert) {
        const arg = { tag: 'arg' };
        const spy1 = sinon.spy();
        const spy2 = sinon.spy();
        const spy3 = sinon.spy();
        this.createMap();
        this.layerCollection.stub('items').returns([{ clearSelection: spy1 }, { clearSelection: spy2 }, { clearSelection: spy3 }]);

        this.map.clearSelection(arg);

        assert.deepEqual(spy1.lastCall.args, [arg]);
        assert.deepEqual(spy2.lastCall.args, [arg]);
        assert.deepEqual(spy3.lastCall.args, [arg]);
    });

    QUnit.test('center - getter', function (assert) {
        this.createMap();
        this.projection.stub('getCenter').returns('test-center');

        assert.strictEqual(this.map.center(), 'test-center');
    });

    QUnit.test('center - setter', function (assert) {
        this.createMap();

        this.map.center('test-center');

        assert.deepEqual(this.projection.setCenter.lastCall.args, ['test-center']);
    });

    QUnit.test('zoomFactor - getter', function (assert) {
        this.createMap();
        this.projection.stub('getZoom').returns('test-zoom');

        assert.strictEqual(this.map.zoomFactor(), 'test-zoom');
    });

    QUnit.test('zoomFactor - setter', function (assert) {
        this.createMap();

        this.map.zoomFactor('test-zoom');

        assert.deepEqual(this.projection.setZoom.lastCall.args, ['test-zoom']);
    });

    QUnit.test('viewport - getter', function (assert) {
        this.createMap();
        this.projection.stub('getViewport').returns('test-viewport');

        assert.strictEqual(this.map.viewport(), 'test-viewport');
    });

    QUnit.test('viewport - setter', function (assert) {
        this.createMap();

        this.map.viewport('test-viewport');

        assert.deepEqual(this.projection.setViewport.lastCall.args, ['test-viewport']);
    });

    QUnit.test('convertCoordinates / array arguments', function (assert) {
        const coords = { tag: 'coords' };
        this.createMap();
        this.projection.stub('fromScreenPoint').returns(coords);

        assert.deepEqual(this.map.convertCoordinates([10, 20]), coords, 'result');
        assert.deepEqual(this.projection.fromScreenPoint.lastCall.args, [[10, 20]], 'projection is called');
    });

    QUnit.test('convertCoordinates / scalar arguments', function (assert) {
        const coords = { tag: 'coords' };
        this.createMap();
        this.projection.stub('fromScreenPoint').returns(coords);

        assert.deepEqual(this.map.convertCoordinates(10, 20), coords, 'result');
        assert.deepEqual(this.projection.fromScreenPoint.lastCall.args, [[10, 20]], 'projection is called');
    });

    QUnit.test('convertToGeo', function (assert) {
        const coords = { tag: 'coords' };
        this.createMap();
        this.projection.stub('fromScreenPoint').returns(coords);

        assert.deepEqual(this.map.convertToGeo(10, 20), coords, 'result');
        assert.deepEqual(this.projection.fromScreenPoint.lastCall.args, [[10, 20]], 'projection is called');
    });

    QUnit.test('convertToXY', function (assert) {
        const coords = { tag: 'coords' };
        this.createMap();
        this.projection.stub('toScreenPoint').returns(coords);

        assert.deepEqual(this.map.convertToXY(10, 20), coords, 'result');
        assert.deepEqual(this.projection.toScreenPoint.lastCall.args, [[10, 20]], 'projection is called');
    });

    QUnit.module('Map - option changing', $.extend({}, stubLayersEnvironment, {
        createMap: function () {
            commons.environment.createMap.apply(this, arguments);
            this.invalidate = sinon.spy(this.map, '_invalidate');
        }
    }));

    QUnit.test('"center" option', function (assert) {
        this.createMap();

        this.map.option('center', 'test-center');

        assert.deepEqual(this.projection.setCenter.lastCall.args, ['test-center'], 'projection is called');
        assert.strictEqual(this.invalidate.lastCall, null, 'not invalidated');
    });

    QUnit.test('"zoomFactor" option', function (assert) {
        this.createMap();

        this.map.option('zoomFactor', 'test-zoom');

        assert.deepEqual(this.projection.setZoom.lastCall.args, ['test-zoom'], 'projection is called');
        assert.strictEqual(this.invalidate.lastCall, null, 'not invalidated');
    });

    QUnit.test('\'layers\' option', function (assert) {
        const layers = { tag: 'layers' };
        this.createMap();

        this.map.option('layers', layers);

        assert.deepEqual(this.layerCollection.setOptions.lastCall.args, [layers], 'layer collection');
        assert.strictEqual(this.invalidate.lastCall, null, 'not invalidated');
    });

    QUnit.test('"maxZoomFactor" option', function (assert) {
        this.createMap();

        this.map.option('maxZoomFactor', 'max-zoom-factor');

        assert.deepEqual(this.projection.setMaxZoom.lastCall.args, ['max-zoom-factor'], 'projection is called');
        assert.strictEqual(this.invalidate.lastCall, null, 'not invalidated');
    });

    QUnit.test('\'projection\' option', function (assert) {
        this.createMap();

        this.map.option('projection', 'projection');

        assert.deepEqual(this.projection.setEngine.lastCall.args, ['projection'], 'projection is called');
        assert.strictEqual(this.invalidate.lastCall, null, 'not invalidated');
    });

    QUnit.test('"bounds" option', function (assert) {
        this.createMap();

        this.map.option('bounds', 'bounds');

        assert.deepEqual(this.projection.setBounds.lastCall.args, ['bounds'], 'projection is called');
        assert.strictEqual(this.invalidate.lastCall, null, 'not invalidated');
    });

    QUnit.test('"background" option', function (assert) {
        this.createMap();
        this.themeManager.theme.withArgs('background').returns({ borderWidth: 10, borderColor: 'red' });

        this.map.option('background', { color: 'green', borderColor: 'blue' });

        assert.deepEqual(this.layerCollection.setBackgroundOptions.lastCall.args, [{ borderWidth: 10, borderColor: 'blue', color: 'green' }], 'options');
        assert.strictEqual(this.invalidate.lastCall, null, 'not invalidated');
    });

    QUnit.test('"legends" options', function (assert) {
        this.createMap();

        this.map.option('legends', { option: 'option' });

        assert.deepEqual(this.legendsControl.setOptions.lastCall.args, [{ option: 'option' }], 'settings');
        assert.strictEqual(this.invalidate.lastCall, null, 'not invalidated');
    });

    QUnit.test('"controlBar" option', function (assert) {
        this.createMap();
        this.themeManager.stub('theme').withArgs('controlBar').returns({ theme: 'theme' });

        this.map.option('controlBar', { option: 'option' });

        assert.deepEqual(this.controlBar.setOptions.lastCall.args, [{ option: 'option', theme: 'theme' }], 'settings');
        assert.strictEqual(this.invalidate.lastCall, null, 'not invalidated');
    });

    QUnit.test('"touchEnabled" option', function (assert) {
        this.createMap({
            touchEnabled: 'touch-enabled',
            wheelEnabled: 'wheel-enabled'
        });

        this.map.option('touchEnabled', 'touch-enabled-2');

        assert.deepEqual(this.tracker.setOptions.lastCall.args, [{ touchEnabled: 'touch-enabled-2', wheelEnabled: 'wheel-enabled' }], 'tracker settings');
        assert.deepEqual(this.themeManager.theme.withArgs('touchEnabled').callCount, 2, 'theme');
    });

    QUnit.test('"wheelEnabled" option', function (assert) {
        this.createMap({
            touchEnabled: 'touch-enabled',
            wheelEnabled: 'wheel-enabled'
        });

        this.map.option('wheelEnabled', 'wheel-enabled-2');

        assert.deepEqual(this.tracker.setOptions.lastCall.args, [{ touchEnabled: 'touch-enabled', wheelEnabled: 'wheel-enabled-2' }], 'tracker settings');
        assert.deepEqual(this.themeManager.theme.withArgs('wheelEnabled').callCount, 2, 'theme');
    });

    QUnit.test('"panningEnabled" option', function (assert) {
        this.createMap();

        this.map.option('panningEnabled', 0);

        assert.deepEqual(this.controlBar.setInteraction.lastCall.args, [{ centeringEnabled: false, zoomingEnabled: true }], 'control bar settings');
        assert.deepEqual(this.gestureHandler.setInteraction.lastCall.args, [{ centeringEnabled: false, zoomingEnabled: true }], 'gesture handler settings');
        assert.deepEqual(this.themeManager.theme.withArgs('panningEnabled').callCount, 2, 'theme');
    });

    QUnit.test('"zoomingEnabled" option', function (assert) {
        this.createMap();

        this.map.option('zoomingEnabled', 0);

        assert.deepEqual(this.controlBar.setInteraction.lastCall.args, [{ centeringEnabled: true, zoomingEnabled: false }], 'control bar settings');
        assert.deepEqual(this.gestureHandler.setInteraction.lastCall.args, [{ centeringEnabled: true, zoomingEnabled: false }], 'gesture handler settings');
        assert.deepEqual(this.themeManager.theme.withArgs('zoomingEnabled').callCount, 2, 'theme');
    });

    QUnit.test('`Annotations` option', function (assert) {
        this.createMap({ annotations: [{ type: 'text', text: 'annotation' }] });

        this.map.option('annotations', [{ type: 'text', text: 'updates annotation' }]);

        assert.deepEqual(plaqueModule.Plaque.lastCall.args[0], { type: 'text', text: 'updates annotation' });
        assert.equal(plaqueModule.Plaque.returnValues[0].draw.callCount, 2);
        assert.equal(plaqueModule.Plaque.returnValues[0].clear.callCount, 1);
    });

    QUnit.module('Map - preventing option merging', stubLayersEnvironment);

    QUnit.test('\'layers\' array option', function (assert) {
        this.createMap({
            layers: [{
                a: 'layer-1',
                dataSource: { tag: 'data-1' }
            }, {
                a: 'layer-2',
                dataSource: { tag: 'data-2' }
            }]
        });

        this.map.option('layers', [{
            b: 'layer-2-2',
            dataSource: { tag2: 'data-2-2' }
        }]);

        assert.deepEqual(this.map.option('layers'), [{
            b: 'layer-2-2',
            dataSource: { tag2: 'data-2-2' }
        }]);
    });

    QUnit.test('\'layers\' object option', function (assert) {
        this.createMap({
            layers: {
                a: 'layer-1',
                dataSource: { tag: 'data-1' }
            }
        });

        this.map.option('layers', {
            b: 'layer-2-2',
            dataSource: { tag2: 'data-2-2' }
        });

        assert.deepEqual(this.map.option('layers'), {
            a: 'layer-1', b: 'layer-2-2',
            dataSource: { tag2: 'data-2-2' }
        });
    });

    QUnit.test('\'layers[i]\' option', function (assert) {
        this.createMap({
            layers: [{
                a: 'layer-1',
                dataSource: { tag: 'data-1' }
            }, {
                a: 'layer-2',
                dataSource: { tag: 'data-2' }
            }]
        });

        this.map.option('layers[1]', {
            b: 'layer-2-2',
            dataSource: { tag2: 'data-2-2' }
        });

        assert.deepEqual(this.map.option('layers'), [{
            a: 'layer-1',
            dataSource: { tag: 'data-1' }
        }, {
            a: 'layer-2', b: 'layer-2-2',
            dataSource: { tag2: 'data-2-2' }
        }]);
    });

    QUnit.test('\'layers[i].dataSource\' option', function (assert) {
        this.createMap({
            layers: [{
                a: 'layer-1',
                dataSource: { tag: 'data-1' }
            }, {
                a: 'layer-2',
                dataSource: { tag: 'data-2' }
            }]
        });

        this.map.option('layers[1].dataSource', { tag2: 'data-2-2' });

        assert.deepEqual(this.map.option('layers'), [{
            a: 'layer-1',
            dataSource: { tag: 'data-1' }
        }, {
            a: 'layer-2',
            dataSource: { tag2: 'data-2-2' }
        }]);
    });

    QUnit.test('\'layers.dataSource\' option', function (assert) {
        this.createMap({
            layers: {
                a: 'layer-1',
                dataSource: { tag: 'data-1' }
            }
        });

        this.map.option('layers.dataSource', { tag2: 'data-1-1' });

        assert.deepEqual(this.map.option('layers'), {
            a: 'layer-1',
            dataSource: { tag2: 'data-1-1' }
        });
    });

    QUnit.test('\'layer\' array option - same instance', function (assert) {
        this.createMap({
            layers: [{
                a: 'layer-1',
                dataSource: { tag: 'data-1' }
            }, {
                a: 'layer-2',
                dataSource: { tag: 'data-2' }
            }]
        });

        const layers = this.map.option('layers');
        layers[1].b = 'layer-2-2';
        layers[1].dataSource = { tag2: 'data-2-2' };
        this.map.option('layers', layers);

        assert.deepEqual(this.map.option('layers'), [{
            a: 'layer-1',
            dataSource: { tag: 'data-1' }
        }, {
            a: 'layer-2', b: 'layer-2-2',
            dataSource: { tag2: 'data-2-2' }
        }]);
    });

    QUnit.test('\'layers\' object option - same instance', function (assert) {
        this.createMap({
            layers: {
                a: 'layer-1',
                dataSource: { tag: 'data-1' }
            }
        });

        const layers = this.map.option('layers');
        layers.b = 'layer-2-2';
        layers.dataSource = { tag2: 'data-2-2' };
        this.map.option('layers', layers);

        assert.deepEqual(this.map.option('layers'), {
            a: 'layer-1', b: 'layer-2-2',
            dataSource: { tag2: 'data-2-2' }
        });
    });

    QUnit.test('\'layers[i]\' option - same instance', function (assert) {
        this.createMap({
            layers: [{
                a: 'layer-1',
                dataSource: { tag: 'data-1' }
            }, {
                a: 'layer-2',
                dataSource: { tag: 'data-2' }
            }]
        });

        const layer = this.map.option('layers[1]');
        layer.b = 'layer-2-2';
        layer.dataSource = { tag2: 'data-2-2' };
        this.map.option('layers[1]', layer);

        assert.deepEqual(this.map.option('layers'), [{
            a: 'layer-1',
            dataSource: { tag: 'data-1' }
        }, {
            a: 'layer-2', b: 'layer-2-2',
            dataSource: { tag2: 'data-2-2' }
        }]);
    });

    QUnit.module('Map - life cycle', stubLayersEnvironment);

    //  B250883
    QUnit.test('Rerender when data source was not defined', function (assert) {
        this.$container.dxVectorMap().dxVectorMap('instance').render();
        assert.ok(true, 'There must be no errors');
    });

    //  B250883
    QUnit.test('Option changing when data source was not defined', function (assert) {
        this.$container.dxVectorMap().dxVectorMap('instance').option('test-option', 100);
        assert.ok(true, 'There must be no errors');
    });

    //  B250883
    QUnit.test('Immediate rerender when render is async', function (assert) {
        /* global ROOT_URL */
        this.$container.dxVectorMap({
            mapData: ROOT_URL + 'some-address',
            markers: ROOT_URL + 'some-address-2'
        }).dxVectorMap('instance').render();
        assert.ok(true, 'There must be no errors');
    });

    //  B250883
    QUnit.test('Immediate option changing when render is async', function (assert) {
        this.$container.dxVectorMap({
            mapData: ROOT_URL + 'some-address',
            markers: ROOT_URL + 'some-address-2'
        }).dxVectorMap('instance').option('test-option', 100);
        assert.ok(true, 'There must be no errors');
    });

    QUnit.module('drawn', stubLayersEnvironment);

    QUnit.test('call drawn after layer collection ready', function (assert) {
        const onDrawn = sinon.spy();
        const spy = sinon.spy(mapLayerModule, 'MapLayerCollection');
        this.createMap({
            onDrawn: onDrawn
        });
        onDrawn.reset();
        const notifyDirty = spy.lastCall.args[0].notifyDirty;
        const notifyReady = spy.lastCall.args[0].notifyReady;

        notifyDirty();
        notifyDirty();
        notifyReady();
        assert.strictEqual(onDrawn.callCount, 0);

        notifyReady();
        assert.strictEqual(onDrawn.callCount, 1);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","./vectorMapParts/commons.js","viz/core/renderers/renderer","viz/vector_map/projection.main","viz/vector_map/control_bar/control_bar","viz/vector_map/gesture_handler","viz/vector_map/tracker","viz/vector_map/data_exchanger","viz/vector_map/legend","viz/vector_map/layout","viz/vector_map/map_layer","viz/vector_map/tooltip_viewer","../../helpers/vizMocks.js","core/utils/type","viz/core/plaque","viz/vector_map/vector_map"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("./vectorMapParts/commons.js"), require("viz/core/renderers/renderer"), require("viz/vector_map/projection.main"), require("viz/vector_map/control_bar/control_bar"), require("viz/vector_map/gesture_handler"), require("viz/vector_map/tracker"), require("viz/vector_map/data_exchanger"), require("viz/vector_map/legend"), require("viz/vector_map/layout"), require("viz/vector_map/map_layer"), require("viz/vector_map/tooltip_viewer"), require("../../helpers/vizMocks.js"), require("core/utils/type"), require("viz/core/plaque"), require("viz/vector_map/vector_map"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dxVectorMap.tests.js.map