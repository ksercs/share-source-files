!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.vectorMap/map.elementsInteraction.tests.js"], ["jquery","core/utils/common","./vectorMapParts/commons.js","viz/vector_map/map_layer","viz/vector_map/projection.main","core/utils/resize_callbacks","core/utils/size","../../helpers/vizMocks.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.vectorMap/map.elementsInteraction.tests.js', ['jquery', 'core/utils/common', './vectorMapParts/commons.js', 'viz/vector_map/map_layer', 'viz/vector_map/projection.main', 'core/utils/resize_callbacks', 'core/utils/size', '../../helpers/vizMocks.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const commons = $__require('./vectorMapParts/commons.js');
    const mapLayerModule = $__require('viz/vector_map/map_layer');
    const projectionModule = $__require('viz/vector_map/projection.main');
    const resizeCallbacks = $__require('core/utils/resize_callbacks');
    const { implementationsMap } = $__require('core/utils/size');
    const vizMocks = $__require('../../helpers/vizMocks.js');

    QUnit.module('Map - projection events', $.extend({}, commons.environment, {
        beforeEach: function () {
            commons.environment.beforeEach.apply(this, arguments);
            this.layerCollection.stub('items').returns([]);
            this.tracker.on = sinon.stub().returns(noop);
        }
    }));

    QUnit.test('On center', function (assert) {
        const onCenterChanged = sinon.spy();
        const spy = sinon.spy(projectionModule, 'Projection');
        this.createMap({ onCenterChanged: onCenterChanged });

        spy.lastCall.args[0].centerChanged('test-center');

        assert.deepEqual(onCenterChanged.lastCall.args[0].center, 'test-center');
    });

    QUnit.test('On zoom', function (assert) {
        const onZoomFactorChanged = sinon.spy();
        const spy = sinon.spy(projectionModule, 'Projection');
        this.createMap({ onZoomFactorChanged: onZoomFactorChanged });

        spy.lastCall.args[0].zoomChanged('test-zoom');

        assert.deepEqual(onZoomFactorChanged.lastCall.args[0].zoomFactor, 'test-zoom');
    });

    QUnit.module('Map - event trigger interaction', $.extend({}, commons.environment, {
        createMap: function () {
            const spy = sinon.spy(mapLayerModule, 'MapLayerCollection');
            commons.environment.createMap.apply(this, arguments);
            this.eventTrigger = spy.lastCall.args[0].eventTrigger;
        },

        trigger: function () {
            this.eventTrigger.apply(this.eventTrigger, arguments);
        }
    }));

    const environmentForSize = $.extend({}, commons.environment, {
        beforeEach: function () {
            commons.environment.beforeEach.apply(this, arguments);
            this.layerCollection.stub('items').returns([]);
            vizMocks.stubIncidentOccurredCreation();
            this.tracker.on = sinon.stub().returns(noop);
        },

        afterEach: function () {
            vizMocks.restoreIncidentOccurredCreation();
            commons.environment.afterEach.apply(this, arguments);
        },

        setContainerSize: function (width, height) {
            implementationsMap.getWidth = commons.returnValue(width);
            implementationsMap.getHeight = commons.returnValue(height);
        },

        checkSizes: function (assert, expected) {
            assert.deepEqual(this.layerCollection.setRect.lastCall.args, [[expected.left, expected.top, expected.width, expected.height]], 'layer collection');
            assert.deepEqual(this.projection.setSize.lastCall.args, [expected], 'projection');
            assert.deepEqual(this.layoutControl.setSize.lastCall.args, [expected], 'layout');
        }
    });

    QUnit.module('Map - size', environmentForSize);

    QUnit.test('Option is not defined, container has no sizes', function (assert) {
        this.setContainerSize(0, 0);

        this.createMap();

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 800, height: 400 });
    });

    QUnit.test('Option is not defined, container has sizes', function (assert) {
        this.setContainerSize(350, 130);

        this.createMap();

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 350, height: 130 });
    });

    QUnit.test('Option is not defined, container has not all sizes', function (assert) {
        this.setContainerSize(200, 0);

        this.createMap();

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 200, height: 400 });
    });

    QUnit.test('Option is not valid, container has no sizes', function (assert) {
        this.setContainerSize(0, 0);

        this.createMap({ size: { width: 'test', height: -5 } });

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 });
    });

    QUnit.test('Option is partially not valid, container has sizes', function (assert) {
        this.setContainerSize(400, 300);

        this.createMap({ size: { width: 500, height: 'a' } });

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 500, height: 300 });
    });

    QUnit.test('Option is valid', function (assert) {
        this.setContainerSize(400, 300);

        this.createMap({ size: { width: '1000', height: '700' } });

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 1000, height: 700 });
    });

    QUnit.test('Option is zeros', function (assert) {
        this.setContainerSize(400, 300);

        this.createMap({ size: { width: 0, height: 0 } });

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 });
    });

    QUnit.test('With top title without export menu', function (assert) {
        this.setContainerSize(400, 300);
        this.title.stub('layoutOptions').returns({ horizontalAlignment: 'left', verticalAlignment: 'top' });
        this.title.stub('measure').returns([200, 50]);
        this.createMap();

        this.checkSizes(assert, { left: 0, right: 0, top: 50, bottom: 0, width: 400, height: 250 });
        assert.deepEqual(this.title.measure.lastCall.args, [[400, 300]], 'title - measure');
        assert.deepEqual(this.title.move.lastCall.args[0], [0, 0, 200, 50], 'title - move');
    });

    QUnit.test('With top title with export menu', function (assert) {
        this.setContainerSize(400, 300);
        this.title.stub('layoutOptions').returns({ horizontalAlignment: 'left', verticalAlignment: 'top' });
        this.title.stub('measure').returns([200, 50]);
        this.exportMenu.stub('layoutOptions').returns({ horizontalAlignment: 'right', verticalAlignment: 'top', weak: true });
        this.exportMenu.stub('measure').returns([40, 40]);

        this.createMap({
            'export': {
                enabled: true
            }
        });

        this.checkSizes(assert, { left: 0, right: 0, top: 50, bottom: 0, width: 400, height: 250 });
        assert.deepEqual(this.title.measure.lastCall.args, [[360, 300]], 'title - measure');
        assert.deepEqual(this.title.move.lastCall.args, [[0, 0, 200, 50], [0, 0, 200, 50]], 'title - move');
        assert.deepEqual(this.exportMenu.measure.lastCall.args, [[400, 300]], 'export menu - measure');
        assert.deepEqual(this.exportMenu.move.lastCall.args, [[360, 0, 400, 50]], 'export menu - move');
    });

    QUnit.test('With bottom title and exportMenu', function (assert) {
        this.setContainerSize(400, 300);
        this.title.stub('layoutOptions').returns({ horizontalAlignment: 'center', verticalAlignment: 'bottom' });
        this.title.stub('measure').returns([200, 50]);
        this.exportMenu.stub('layoutOptions').returns({ horizontalAlignment: 'left', verticalAlignment: 'top', weak: true });
        this.exportMenu.stub('measure').returns([40, 40]);

        this.createMap({
            'export': {
                enabled: true
            }
        });

        this.checkSizes(assert, { left: 0, right: 0, top: 40, bottom: 0, width: 400, height: 210 });
        assert.deepEqual(this.title.measure.lastCall.args[0], [400, 260], 'title - measure');
        assert.deepEqual(this.title.move.lastCall.args[0], [100, 250, 300, 300], 'title - move');
        assert.deepEqual(this.exportMenu.measure.lastCall.args, [[400, 300]], 'export menu - measure');
        assert.deepEqual(this.exportMenu.move.lastCall.args[0], [0, 0, 40, 40], 'export menu - move');
    });

    QUnit.module('Map - resizing', $.extend({}, environmentForSize, {
        beforeEach: function () {
            environmentForSize.beforeEach.apply(this, arguments);
            this.layerCollection.stub('items').returns([]);
            this.clock = sinon.useFakeTimers();
        },

        afterEach: function () {
            this.clock.restore();
            environmentForSize.afterEach.apply(this, arguments);
        },

        emulateResize: function () {
            resizeCallbacks.fire();
            this.clock.tick(100);
        }
    }));

    QUnit.test('Not resized if container size is not changed', function (assert) {
        this.setContainerSize(400, 200);
        this.createMap();

        this.emulateResize();

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 400, height: 200 });
    });

    QUnit.test('Resized if container size is changed', function (assert) {
        this.setContainerSize(400, 200);
        this.createMap({ redrawOnResize: 'windowOnly' });
        this.setContainerSize(500, 100);

        this.emulateResize();

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 500, height: 100 });
    });

    QUnit.test('Not resized if container size is changed but size option is defined', function (assert) {
        this.setContainerSize(400, 200);
        this.createMap({ size: { width: 300, height: 500 } });
        this.setContainerSize(500, 100);

        this.emulateResize();

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 300, height: 500 });
    });

    QUnit.test('Resizing via *render* method - resized', function (assert) {
        this.setContainerSize(400, 200);
        this.createMap();
        this.setContainerSize(300, 500);

        this.map.render();

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 300, height: 500 });
    });

    QUnit.test('Resizing via *render* method - not resized', function (assert) {
        this.setContainerSize(400, 200);
        this.createMap();

        this.map.render();

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 400, height: 200 });
    });

    QUnit.test('resize via option', function (assert) {
        this.createMap();
        const invalidate = sinon.stub(this.map, '_invalidate');

        this.map.option('size', { width: 100, height: 200 });

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 100, height: 200 });
        assert.strictEqual(invalidate.lastCall, null, 'not invalidated');
    });

    QUnit.test('Resized with top title', function (assert) {
        this.setContainerSize(400, 200);
        this.title.stub('layoutOptions').returns({ horizontalAlignment: 'left', verticalAlignment: 'top' });
        this.title.stub('measure').returns([500, 50]);

        this.createMap({ redrawOnResize: 'windowOnly' });
        this.setContainerSize(500, 100);

        this.emulateResize();

        this.checkSizes(assert, { left: 0, right: 0, top: 50, bottom: 0, width: 500, height: 50 });
    });

    QUnit.test('Resized with bottom title', function (assert) {
        this.setContainerSize(400, 200);
        this.title.stub('layoutOptions').returns({ horizontalAlignment: 'left', verticalAlignment: 'bottom' });
        this.title.stub('measure').returns([500, 50]);

        this.createMap({ redrawOnResize: 'windowOnly' });
        this.setContainerSize(500, 100);

        this.emulateResize();

        this.checkSizes(assert, { left: 0, right: 0, top: 0, bottom: 0, width: 500, height: 50 });
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","./vectorMapParts/commons.js","viz/vector_map/map_layer","viz/vector_map/projection.main","core/utils/resize_callbacks","core/utils/size","../../helpers/vizMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("./vectorMapParts/commons.js"), require("viz/vector_map/map_layer"), require("viz/vector_map/projection.main"), require("core/utils/resize_callbacks"), require("core/utils/size"), require("../../helpers/vizMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=map.elementsInteraction.tests.js.map