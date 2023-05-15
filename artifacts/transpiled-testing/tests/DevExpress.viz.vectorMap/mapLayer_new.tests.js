!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.vectorMap/mapLayer_new.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/core/loading_indicator","viz/core/title","viz/vector_map/projection","viz/vector_map/control_bar/control_bar","viz/vector_map/legend","viz/core/tooltip","viz/vector_map/tooltip_viewer","data/data_source/data_source","viz/core/export","viz/core/renderers/renderer","viz/vector_map/vector_map"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.vectorMap/mapLayer_new.tests.js', ['jquery', '../../helpers/vizMocks.js', 'viz/core/loading_indicator', 'viz/core/title', 'viz/vector_map/projection', 'viz/vector_map/control_bar/control_bar', 'viz/vector_map/legend', 'viz/core/tooltip', 'viz/vector_map/tooltip_viewer', 'data/data_source/data_source', 'viz/core/export', 'viz/core/renderers/renderer', 'viz/vector_map/vector_map'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const loadingIndicatorModule = $__require('viz/core/loading_indicator');
    const titleModule = $__require('viz/core/title');
    const projectionEnginesModule = $__require('viz/vector_map/projection');
    const controlBarModule = $__require('viz/vector_map/control_bar/control_bar');
    const legendModule = $__require('viz/vector_map/legend');
    const tooltipModule = $__require('viz/core/tooltip');
    const tooltipViewerModule = $__require('viz/vector_map/tooltip_viewer');
    const DataSource = $__require('data/data_source/data_source').DataSource;
    const exportMenuModule = $__require('viz/core/export'); // TODO maybe if you test layer - you should create exact layer?
    const rendererModule = $__require('viz/core/renderers/renderer');

    $__require('viz/vector_map/vector_map');

    $('#qunit-fixture').append('<div id="container"></div>');

    $('#container').css({
        width: '1200px',
        height: '600px'
    });

    titleModule.DEBUG_set_title(vizMocks.stubClass(titleModule.Title, {}));
    tooltipModule.DEBUG_set_tooltip(vizMocks.stubClass(tooltipModule.Tooltip));
    exportMenuModule.DEBUG_set_ExportMenu(vizMocks.stubClass(exportMenuModule.ExportMenu)); // TODO maybe if you test layer - you should create exact layer?
    loadingIndicatorModule.DEBUG_set_LoadingIndicator(vizMocks.stubClass(loadingIndicatorModule.LoadingIndicator));
    controlBarModule.ControlBar = vizMocks.stubClass(controlBarModule.ControlBar);
    legendModule.LegendsControl = vizMocks.stubClass(legendModule.LegendsControl);
    tooltipViewerModule.TooltipViewer = vizMocks.stubClass(tooltipViewerModule.TooltipViewer);

    const simpleProjection = projectionEnginesModule.projection({
        aspectRatio: 4 / 3,

        to: function (coordinates) {
            return [(coordinates[0] - 200) / 200, (coordinates[1] - 150) / 150];
        },

        from: function (coordinates) {
            return [(coordinates[0] + 1) * 200, (coordinates[1] + 1) * 150];
        }
    });

    const createData = function (featureType, items) {
        return {
            type: 'FeatureCollection',
            features: $.map(items, function (item) {
                return {
                    type: 'Feature',
                    geometry: {
                        type: featureType,
                        coordinates: item.coordinates ? item.coordinates : item
                    },
                    properties: item.properties || {}
                };
            })
        };
    };

    const environment = {
        beforeEach: function () {
            const renderer = this.renderer = new vizMocks.Renderer();
            rendererModule.Renderer = function () {
                return renderer;
            };
        },

        createLayer: function (options) {
            return $('#container').dxVectorMap({
                projection: simpleProjection,
                layers: options
            }).dxVectorMap('instance').getLayers()[0];
        },

        getArea: function (index) {
            return this.renderer.path.getCall(0 + index).returnValue;
        },

        getLine: function (index) {
            return this.renderer.path.getCall(0 + index).returnValue;
        },

        getMarker: function (index) {
            return this.renderer.g.getCall(3 + index).returnValue;
        },

        getLabel: function (index) {
            return this.renderer.text.getCall(index).returnValue;
        }
    };

    QUnit.module('Elements positioning', environment);

    QUnit.test('Areas (Polygon)', function (assert) {
        this.createLayer({
            dataSource: createData('Polygon', [[[[100, 50], [200, 50], [200, 200], [100, 200]]], [[[200, 100], [400, 0], [400, 300]], [[0, 0], [0, 300], [400, 300], [400, 0]]], []])
        });

        assert.strictEqual(this.getArea(0).attr.getCall(1).args[0]['class'], 'dxm-area', 'type');
        assert.deepEqual(this.getArea(0).attr.getCall(0).args, [{
            points: [[400, 500, 600, 500, 600, 200, 400, 200]]
        }], 'area 1 (simple)');
        assert.deepEqual(this.getArea(1).attr.getCall(0).args, [{
            points: [[600, 400, 1000, 600, 1000, 0], [200, 600, 200, 0, 1000, 0, 1000, 600]]
        }], 'area 2 (complex)');
        assert.deepEqual(this.getArea(2).attr.getCall(0).args, [{
            points: []
        }], 'area 3 (degenerate)');
    });

    QUnit.test('Areas (Multipolygon)', function (assert) {
        this.createLayer({
            dataSource: createData('MultiPolygon', [[[[[100, 50], [200, 50], [200, 200], [100, 200]]]], [[[[200, 100], [400, 0], [400, 300]]], [[[0, 0], [0, 300], [400, 300], [400, 0]], [[200, 100], [300, 100], [250, 200]]]], []])
        });

        assert.strictEqual(this.getArea(0).attr.getCall(1).args[0]['class'], 'dxm-area', 'type');
        assert.deepEqual(this.getArea(0).attr.getCall(0).args, [{
            points: [[400, 500, 600, 500, 600, 200, 400, 200]]
        }], 'area 1 (simple)');
        assert.deepEqual(this.getArea(1).attr.getCall(0).args, [{
            points: [[600, 400, 1000, 600, 1000, 0], [200, 600, 200, 0, 1000, 0, 1000, 600], [600, 400, 800, 400, 700, 200]]
        }], 'area 2 (complex)');
        assert.deepEqual(this.getArea(2).attr.getCall(0).args, [{
            points: []
        }], 'area 3 (degenerate)');
    });

    QUnit.test('Areas (simple data source)', function (assert) {
        this.createLayer({
            dataSource: [{
                coordinates: [[[100, 50], [200, 50], [200, 200], [100, 200]]]
            }, {
                coordinates: [[[200, 100], [400, 0], [400, 300]], [[0, 0], [0, 300], [400, 300], [400, 0]]]
            }, { coordinates: [] }]
        });

        assert.strictEqual(this.getArea(0).attr.getCall(1).args[0]['class'], 'dxm-area', 'type');
        assert.deepEqual(this.getArea(0).attr.getCall(0).args, [{
            points: [[400, 500, 600, 500, 600, 200, 400, 200]]
        }], 'area 1 (simple)');
        assert.deepEqual(this.getArea(1).attr.getCall(0).args, [{
            points: [[600, 400, 1000, 600, 1000, 0], [200, 600, 200, 0, 1000, 0, 1000, 600]]
        }], 'area 2 (complex)');
        assert.deepEqual(this.getArea(2).attr.getCall(0).args, [{
            points: []
        }], 'area 3 (degenerate)');
    });

    QUnit.test('Lines (LineString)', function (assert) {
        this.createLayer({
            dataSource: createData('LineString', [[[100, 200], [300, 300], [400, 0]], []])
        });

        assert.strictEqual(this.getArea(0).attr.getCall(1).args[0]['class'], 'dxm-line', 'type');
        assert.deepEqual(this.getLine(0).attr.getCall(0).args, [{
            points: [[400, 200, 800, 0, 1000, 600]]
        }], 'line 1 (common)');
        assert.deepEqual(this.getLine(1).attr.getCall(0).args, [{
            points: [[]] // TODO: Investigate
        }], 'line 2 (degenerate)');
    });

    QUnit.test('Lines (MultiPoint)', function (assert) {
        this.createLayer({
            dataSource: createData('MultiPoint', [[[100, 200], [300, 300], [400, 0]], []])
        });

        assert.strictEqual(this.getArea(0).attr.getCall(1).args[0]['class'], 'dxm-line', 'type');
        assert.deepEqual(this.getLine(0).attr.getCall(0).args, [{
            points: [[400, 200, 800, 0, 1000, 600]]
        }], 'line 1 (common)');
        assert.deepEqual(this.getLine(1).attr.getCall(0).args, [{
            points: [[]] // TODO: Investigate
        }], 'line 2 (degenerate)');
    });

    QUnit.test('Lines (MultiLineString)', function (assert) {
        this.createLayer({
            dataSource: createData('MultiLineString', [[[[100, 50], [200, 50], [200, 200], [100, 200]]], [[[200, 100], [400, 0], [400, 300]], [[0, 0], [0, 300], [400, 300], [400, 0]]], []])
        });

        assert.strictEqual(this.getArea(0).attr.getCall(1).args[0]['class'], 'dxm-line', 'type');
        assert.deepEqual(this.getLine(0).attr.getCall(0).args, [{
            points: [[400, 500, 600, 500, 600, 200, 400, 200]]
        }], 'line 1 (simple)');
        assert.deepEqual(this.getLine(1).attr.getCall(0).args, [{
            points: [[600, 400, 1000, 600, 1000, 0], [200, 600, 200, 0, 1000, 0, 1000, 600]]
        }], 'line 2 (complex)');
        assert.deepEqual(this.getLine(2).attr.getCall(0).args, [{
            points: []
        }], 'line 3 (degenerate)');
    });

    QUnit.test('Lines (simple data source)', function (assert) {
        this.createLayer({
            dataSource: [{ coordinates: [[100, 200], [300, 300], [400, 0]] }, { coordinates: [] }]
        });

        assert.strictEqual(this.getArea(0).attr.getCall(1).args[0]['class'], 'dxm-line', 'type');
        assert.deepEqual(this.getLine(0).attr.getCall(0).args, [{
            points: [[400, 200, 800, 0, 1000, 600]]
        }], 'line 1 (common)');
        assert.deepEqual(this.getLine(1).attr.getCall(0).args, [{
            points: [[] // TODO: Investigate (should be points: [])
            ]
        }], 'line 2 (degenerate)');
    });

    QUnit.test('Markers (Point)', function (assert) {
        this.createLayer({
            dataSource: createData('Point', [[0, 100], [200, 200], []])
        });

        assert.strictEqual(this.getMarker(0).attr.getCall(1).args[0]['class'], 'dxm-marker', 'type');
        assert.deepEqual(this.getMarker(0).attr.getCall(0).args, [{ translateX: 200, translateY: 400 }], 'Marker 1 (common)');
        assert.deepEqual(this.getMarker(1).attr.getCall(0).args, [{ translateX: 600, translateY: 200 }], 'Marker 2 (common)');
        assert.deepEqual(this.getMarker(2).attr.getCall(0).args, [{ translateX: NaN, translateY: NaN }], 'Marker 3 (degenerate)');
    });

    QUnit.test('Markers (simple data source)', function (assert) {
        this.createLayer({
            dataSource: [{ coordinates: [0, 100] }, { coordinates: [200, 200] }, { coordinates: [] }]
        });

        assert.strictEqual(this.getMarker(0).attr.getCall(1).args[0]['class'], 'dxm-marker', 'type');
        assert.deepEqual(this.getMarker(0).attr.getCall(0).args, [{ translateX: 200, translateY: 400 }], 'Marker 1 (common)');
        assert.deepEqual(this.getMarker(1).attr.getCall(0).args, [{ translateX: 600, translateY: 200 }], 'Marker 2 (common)');
        assert.deepEqual(this.getMarker(2).attr.getCall(0).args, [{ translateX: NaN, translateY: NaN }], 'Marker 3 (degenerate)');
    });

    QUnit.test('Area labels', function (assert) {
        this.renderer.bBoxTemplate = { x: 0, y: -15, width: 40, height: 20 };
        this.createLayer({
            dataSource: createData('Polygon', [{
                coordinates: [[[200, 100], [400, 100], [400, 150], [300, 200]]],
                properties: { text: 'Item 1' }
            }, {
                coordinates: [[[100, 50], [100, 150], [200, 150], [200, 50], [100, 50]], [[200, 200], [200, 220], [240, 220], [240, 200]]],
                properties: { text: 'Item 2' }
            }, {
                coordinates: [[[100, 100], [300, 100], [100, 100]] // T344899
                ],
                properties: { text: 'Item 3' }
            }, {
                coordinates: [], // T344899
                properties: { text: 'Item 4' }
            }]),
            label: {
                enabled: true,
                dataField: 'text'
            }
        });

        assert.deepEqual(getLabelPosition(this.getLabel(0)), [853, 353], 'label 1');
        assert.deepEqual(getLabelPosition(this.getLabel(1)), [500, 400], 'label 2');
        assert.deepEqual(getLabelPosition(this.getLabel(2)), [NaN, NaN], 'label 3 (degenerate)');
        assert.deepEqual(getLabelPosition(this.getLabel(3)), [NaN, NaN], 'label 4 (degenerate)');

        function getLabelPosition(label) {
            const arg = label.attr.getCall(1).args[0];
            return [Math.round(arg.translateX), Math.round(arg.translateY)];
        }
    });

    QUnit.test('Line labels', function (assert) {
        this.createLayer({
            dataSource: createData('LineString', [{
                coordinates: [[100, 200], [300, 300], [400, 0]],
                properties: { text: 'Item 1' }
            }, {
                coordinates: [], // T344899
                properties: { text: 'Item 2' }
            }]),
            label: {
                enabled: true,
                dataField: 'text'
            }
        });

        assert.deepEqual(getLabelPosition(this.getLabel(0)), [842, 125], 'label 1');
        assert.deepEqual(getLabelPosition(this.getLabel(1)), [NaN, NaN], 'label 2 (degenerate)');

        function getLabelPosition(label) {
            const arg = label.attr.getCall(1).args[0];
            return [Math.round(arg.translateX), Math.round(arg.translateY)];
        }
    });

    QUnit.module('Layers management', {
        beforeEach: function () {
            const renderer = this.renderer = new vizMocks.Renderer();
            rendererModule.Renderer = function () {
                return renderer;
            };
        },

        createLayers: function (options) {
            return $('#container').dxVectorMap({
                layers: options
            }).dxVectorMap('instance');
        }
    });

    QUnit.test('Array option', function (assert) {
        const map = this.createLayers([{ name: 'layer-a' }, {}, { name: 'layer-b' }, {}]);

        const layers = map.getLayers();
        assert.strictEqual(layers.length, 4, 'count');
        assert.strictEqual(layers[0].name, 'layer-a', 'layer 1 name');
        assert.strictEqual(layers[1].name, 'map-layer-1', 'layer 2 name');
        assert.strictEqual(layers[2].name, 'layer-b', 'layer 3 name');
        assert.strictEqual(layers[3].name, 'map-layer-3', 'layer 4 name');
    });

    QUnit.test('Object option', function (assert) {
        const map = this.createLayers({
            name: 'layer'
        });

        const layers = map.getLayers();
        assert.strictEqual(layers.length, 1, 'count');
        assert.strictEqual(layers[0].name, 'layer', 'layer 1 name');
    });

    QUnit.test('Empty option', function (assert) {
        const map = this.createLayers();

        assert.deepEqual(map.getLayers(), []);
    });

    QUnit.test('Change option - increase layers count', function (assert) {
        const map = this.createLayers([{ name: 'layer-1' }, { name: 'layer-2' }]);

        map.option('layers', [{}, {}, { name: 'layer-3' }]);

        const layers = map.getLayers();
        assert.strictEqual(layers.length, 3, 'count');
        assert.strictEqual(layers[0].name, 'map-layer-0', 'layer 1 name');
        assert.strictEqual(layers[1].name, 'map-layer-1', 'layer 2 name');
        assert.strictEqual(layers[2].name, 'layer-3', 'layer 3 name');
    });

    QUnit.test('Change option - decrease layers count', function (assert) {
        const map = this.createLayers([{ name: 'layer-1' }, { name: 'layer-2' }, { name: 'layer-3' }]);

        map.option('layers', [{}, {}]);

        const layers = map.getLayers();
        assert.strictEqual(layers.length, 2, 'count');
        assert.strictEqual(layers[0].name, 'map-layer-0', 'layer 1 name');
        assert.strictEqual(layers[1].name, 'map-layer-1', 'layer 2 name');
    });

    QUnit.test('Change name of one layer', function (assert) {
        const map = this.createLayers([{ name: 'layer-1' }, { name: 'layer-2' }, { name: 'layer-3' }]);

        const oldLayers = map.getLayers();
        map.option('layers', [{ name: 'layer-1' }, { name: 'new_layer-2' }, { name: 'layer-3' }]);

        const updatedLayers = map.getLayers();

        updatedLayers.forEach(function (l, i) {
            assert.notStrictEqual(l, oldLayers[i]);
        });
    });

    QUnit.test('Layers shouldn\'t be created on updating when name not set', function (assert) {
        const map = this.createLayers([{ color: 'some_color_1' }]);

        const oldLayer = map.getLayers()[0];
        map.option('layers', [{ color: 'some_color_1' }]);

        assert.strictEqual(map.getLayers()[0], oldLayer);
    });

    QUnit.test('No crush on updating when on of layer in null', function (assert) {
        const map = this.createLayers([{ color: 'some_color_1' }]);

        map.option('layers', [null]);

        assert.strictEqual(map.getLayers().length, 1);
    });

    QUnit.test('Get layer by name', function (assert) {
        const map = this.createLayers([{ name: 'layer-a' }, {}, { name: 'layer-b' }]);

        const layers = map.getLayers();
        assert.strictEqual(map.getLayerByName('layer-a'), layers[0], 'layer 1');
        assert.strictEqual(map.getLayerByName('map-layer-1'), layers[1], 'layer 2');
        assert.strictEqual(map.getLayerByName('layer-b'), layers[2], 'layer 3');
        assert.strictEqual(map.getLayerByName('test'), null, 'unknown name');
    });

    QUnit.test('Get layer by index', function (assert) {
        const map = this.createLayers([{}, {}, {}]);

        const layers = map.getLayers();
        assert.strictEqual(map.getLayerByIndex(0), layers[0], 'layer 1');
        assert.strictEqual(map.getLayerByIndex(1), layers[1], 'layer 2');
        assert.strictEqual(map.getLayerByIndex(2), layers[2], 'layer 3');
        assert.strictEqual(map.getLayerByIndex(3), null, 'not valid index');
    });

    QUnit.test('Change layer name', function (assert) {
        const map = this.createLayers([{ name: 'layer-1' }, {}]);

        map.option('layers', [{ name: 'layer-2' }, {}]);

        assert.ok(map.getLayerByName('layer-2'), 'get by new name');
        assert.ok(!map.getLayerByName('layer-1'), 'get by old name');
        const layers = map.getLayers();
        assert.strictEqual(layers.length, 2, 'count');
        assert.strictEqual(layers[0].name, 'layer-2', 'layer 1 name');
        assert.strictEqual(layers[1].name, 'map-layer-1', 'layer 2 name');
    });

    QUnit.test('getDataSource method', function (assert) {
        const map = this.createLayers({
            dataSource: createData('Polygon', [[[[100, 50], [200, 50], [200, 200], [100, 200]]], [[[200, 100], [400, 0], [400, 300]], [[0, 0], [0, 300], [400, 300], [400, 0]]], []])
        });

        assert.ok(map.getLayers()[0].getDataSource() instanceof DataSource);
    });

    QUnit.test('Bounds calculation. polygon', function (assert) {
        const map = this.createLayers({
            dataSource: createData('Polygon', [[[[100, 50], [200, 50], [200, 200], [100, 200]]], [[[200, 100], [400, 0], [400, 300]], [[0, 0], [0, 300], [400, 300], [400, 0]]], []])
        });

        const bounds = map.getLayers()[0].getBounds();

        assert.deepEqual(bounds, [0, 0, 400, 300]);
    });

    QUnit.test('Bounds calculation. multipolygon', function (assert) {
        const map = this.createLayers({
            dataSource: createData('MultiPolygon', [[[[[50, 0], [3, 10]]]]])
        });

        const bounds = map.getLayers()[0].getBounds();

        assert.deepEqual(bounds, [3, 0, 50, 10]);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/core/loading_indicator","viz/core/title","viz/vector_map/projection","viz/vector_map/control_bar/control_bar","viz/vector_map/legend","viz/core/tooltip","viz/vector_map/tooltip_viewer","data/data_source/data_source","viz/core/export","viz/core/renderers/renderer","viz/vector_map/vector_map"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/core/loading_indicator"), require("viz/core/title"), require("viz/vector_map/projection"), require("viz/vector_map/control_bar/control_bar"), require("viz/vector_map/legend"), require("viz/core/tooltip"), require("viz/vector_map/tooltip_viewer"), require("data/data_source/data_source"), require("viz/core/export"), require("viz/core/renderers/renderer"), require("viz/vector_map/vector_map"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=mapLayer_new.tests.js.map