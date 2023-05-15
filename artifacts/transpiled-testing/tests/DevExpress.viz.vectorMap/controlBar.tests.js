!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.vectorMap/controlBar.tests.js"], ["jquery","core/utils/common","../../helpers/vizMocks.js","viz/vector_map/control_bar/control_bar"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.vectorMap/controlBar.tests.js', ['jquery', 'core/utils/common', '../../helpers/vizMocks.js', 'viz/vector_map/control_bar/control_bar'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const controlBarModule = $__require('viz/vector_map/control_bar/control_bar');

    function returnValue(value) {
        return function () {
            return value;
        };
    }

    const environment = {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.projection = {
                on: sinon.stub().returns(noop),
                isInvertible: returnValue(true)
            };
            this.tracker = {
                on: sinon.stub().returns(noop)
            };
            this.layoutControl = {
                addItem: sinon.spy(),
                removeItem: sinon.spy()
            };
            this.container = { tag: 'container' };
            this.controlBar = new controlBarModule.ControlBar({
                container: this.container,
                renderer: this.renderer,
                layoutControl: this.layoutControl,
                projection: this.projection,
                tracker: this.tracker
            });
            this.root = this.renderer.g.getCall(0).returnValue;
            this.zoomDrag = this.renderer.rect.getCall(7).returnValue;
            this.zoomDragTracker = this.renderer.rect.getCall(6).returnValue;
            this.zoomLine = this.renderer.path.getCall(6).returnValue;
            this.updateLayout = this.controlBar.updateLayout = sinon.spy();
        },

        afterEach: function () {
            this.controlBar.dispose();
        }
    };

    QUnit.module('Common', environment);

    QUnit.test('Elements are created in constructor', function (assert) {
        assert.deepEqual(this.root.linkOn.lastCall.args, [this.container, 'control-bar'], 'root is linked to container');
        assert.deepEqual(this.root.attr.lastCall.args, [{ 'class': 'dxm-control-bar' }], 'root settings');
        assert.deepEqual(this.layoutControl.addItem.lastCall.args, [this.controlBar], 'added to layout');
        const projectionHandlers = this.projection.on.lastCall.args[0];
        assert.strictEqual(typeof projectionHandlers['engine'], 'function', 'subscribed to projection.engine');
        assert.strictEqual(typeof projectionHandlers['zoom'], 'function', 'subscribed to projection.zoom');
        assert.strictEqual(typeof projectionHandlers['max-zoom'], 'function', 'subscribed to projection.max-zoom');
        const trackerHandlers = this.tracker.on.lastCall.args[0];
        assert.strictEqual(typeof trackerHandlers['start'], 'function', 'subscribed to tracker.start');
        assert.strictEqual(typeof trackerHandlers['move'], 'function', 'subscribed to tracker.move');
        assert.strictEqual(typeof trackerHandlers['end'], 'function', 'subscribed to tracker.end');
    });

    QUnit.test('Elements are destroyed on dispose', function (assert) {
        this.controlBar.dispose();
        this.controlBar.dispose = noop;

        assert.deepEqual(this.root.linkRemove.lastCall.args, [], 'root is removed');
        assert.deepEqual(this.root.linkOff.lastCall.args, [], 'root is unlinked');
        assert.deepEqual(this.layoutControl.removeItem.lastCall.args, [this.controlBar], 'removed from layout');
    });

    QUnit.test('Groups settings', function (assert) {
        assert.deepEqual(this.renderer.g.getCall(1).returnValue.attr.lastCall.args, [{
            'class': 'dxm-pan-control'
        }], 'elements group settings');
        assert.deepEqual(this.renderer.g.getCall(2).returnValue.attr.lastCall.args, [{
            'class': 'dxm-zoom-bar'
        }], 'elements group settings');
        assert.deepEqual(this.renderer.g.getCall(3).returnValue.attr.lastCall.args, [{
            'stroke-width': 0, stroke: 'none', fill: '#000000', opacity: 0.0001
        }], 'trackers group settings');
        assert.deepEqual(this.renderer.g.getCall(4).returnValue.attr.lastCall.args, [{
            'stroke-width': 0, stroke: 'none', fill: '#000000', opacity: 0.0001
        }], 'trackers group settings');
        assert.deepEqual(this.renderer.g.getCall(3).returnValue.css.lastCall.args, [{
            cursor: 'pointer'
        }], 'trackers group styles');
        assert.deepEqual(this.renderer.g.getCall(4).returnValue.css.lastCall.args, [{
            cursor: 'pointer'
        }], 'trackers group styles');
    });

    QUnit.test('Set options', function (assert) {
        this.controlBar.setOptions({ borderWidth: 5, color: '#ffffff', borderColor: '#bcbcbc', opacity: 0.4 });

        assert.deepEqual(this.renderer.g.getCall(1).returnValue.attr.lastCall.args, [{ 'stroke-width': 5, stroke: '#bcbcbc', fill: '#ffffff', 'fill-opacity': 0.4 }], 'settings');
    });

    QUnit.test('Elements settings', function (assert) {
        const elementsPan = this.renderer.g.firstCall.returnValue.children[0].children;
        const elementsZoom = this.renderer.g.firstCall.returnValue.children[1].children;

        assert.deepEqual(elementsPan[0]._stored_settings, { cx: 0, cy: 0, r: 29 }, 'big circle');
        assert.deepEqual(elementsPan[1]._stored_settings, { cx: 0, cy: 0, r: 5, fill: 'none' }, 'reset button');
        assert.deepEqual(elementsPan[2]._stored_settings, { points: [-5, -15, 0, -20, 5, -15], type: 'line', 'stroke-linecap': 'square', fill: 'none' }, 'move N button');
        assert.deepEqual(elementsPan[3]._stored_settings, { points: [15, -5, 20, 0, 15, 5], type: 'line', 'stroke-linecap': 'square', fill: 'none' }, 'move E button');
        assert.deepEqual(elementsPan[4]._stored_settings, { points: [5, 15, 0, 20, -5, 15], type: 'line', 'stroke-linecap': 'square', fill: 'none' }, 'move S button');
        assert.deepEqual(elementsPan[5]._stored_settings, { points: [-15, 5, -20, 0, -15, -5], type: 'line', 'stroke-linecap': 'square', fill: 'none' }, 'move W button');
        assert.deepEqual(elementsZoom[0]._stored_settings, { cx: 0, cy: 66, r: 14 }, 'zoom in circle');
        assert.deepEqual(elementsZoom[1]._stored_settings, { points: [[-5.5, 66, 5.5, 66], [0, 60.5, 0, 71.5]], type: 'area' }, 'zoom in button');
        assert.deepEqual(elementsZoom[2]._stored_settings, { cx: 0, cy: 227, r: 14 }, 'zoom out circle');
        assert.deepEqual(elementsZoom[3]._stored_settings, { points: [-5.5, 227, 5.5, 227], type: 'area' }, 'zoom out button');
        assert.deepEqual(elementsZoom[4]._stored_settings, { points: [], type: 'line' }, 'zoom line');
        assert.deepEqual(elementsZoom[5]._stored_settings, { x: -10, y: 201, width: 20, height: 8 }, 'zoom drag');
    });

    QUnit.test('Trackers settings', function (assert) {
        const trackersPan = this.renderer.g.firstCall.returnValue.children[2].children;
        const trackersZoom = this.renderer.g.firstCall.returnValue.children[3].children;

        assert.deepEqual(trackersPan[0]._stored_settings, { x: -8, y: -8, width: 16, height: 16 }, 'reset button');
        assert.deepEqual(trackersPan[1]._stored_settings, { x: -8, y: -28, width: 16, height: 16 }, 'move N button');
        assert.deepEqual(trackersPan[2]._stored_settings, { x: 12, y: -8, width: 16, height: 16 }, 'move E button');
        assert.deepEqual(trackersPan[3]._stored_settings, { x: -8, y: 12, width: 16, height: 16 }, 'move S button');
        assert.deepEqual(trackersPan[4]._stored_settings, { x: -28, y: -8, width: 16, height: 16 }, 'move W button');
        assert.deepEqual(trackersZoom[0]._stored_settings, { cx: 0, cy: 66, r: 14 }, 'zoom in button');
        assert.deepEqual(trackersZoom[1]._stored_settings, { cx: 0, cy: 227, r: 14 }, 'zoom out button');
        assert.deepEqual(trackersZoom[2]._stored_settings, { x: -2, y: 86.5, width: 4, height: 121 }, 'zoom drag line');
        assert.deepEqual(trackersZoom[2]._stored_styles, { cursor: 'default' }, 'zoom drag line styles');
        assert.deepEqual(trackersZoom[3]._stored_settings, { x: -10, y: 201.5, width: 20, height: 8 }, 'zoom drag');
    });

    QUnit.test('Root appending and removing on set options', function (assert) {
        const updateLayout = this.updateLayout;
        const linkAppend = this.root.stub('linkAppend');
        const linkRemove = this.root.stub('linkRemove');
        this.controlBar.setInteraction({});

        reset();
        this.controlBar.setOptions({});
        assert.deepEqual(linkAppend.lastCall.args, [], 'appended');
        assert.deepEqual(updateLayout.lastCall.args, [], 'layout');

        reset();
        this.controlBar.setOptions({ enabled: false });
        assert.deepEqual(linkRemove.lastCall.args, [], 'removed');
        assert.deepEqual(updateLayout.lastCall.args, [], 'layout');

        reset();
        this.controlBar.setOptions({ enabled: true });
        assert.deepEqual(linkAppend.lastCall.args, [], 'appended');
        assert.deepEqual(updateLayout.lastCall.args, [], 'layout');

        function reset() {
            updateLayout.reset();
            linkAppend.reset();
            linkRemove.reset();
        }
    });

    QUnit.test('Root appending and removing on set interaction', function (assert) {
        const updateLayout = this.updateLayout;
        const linkAppend = this.root.stub('linkAppend');
        const linkRemove = this.root.stub('linkRemove');
        this.controlBar.setOptions({});

        reset();
        this.controlBar.setInteraction({});
        assert.deepEqual(linkAppend.lastCall.args, [], 'appended');
        assert.deepEqual(updateLayout.lastCall.args, [], 'layout');

        reset();
        this.controlBar.setInteraction({ centeringEnabled: false, zoomingEnabled: false });
        assert.deepEqual(linkRemove.lastCall.args, [], 'removed');
        assert.deepEqual(updateLayout.lastCall.args, [], 'layout');

        reset();
        this.controlBar.setInteraction({ zoomingEnabled: false });
        assert.deepEqual(linkAppend.lastCall.args, [], 'appended');
        assert.deepEqual(updateLayout.lastCall.args, [], 'layout');

        reset();
        this.controlBar.setInteraction({ centeringEnabled: false });
        assert.deepEqual(linkAppend.lastCall.args, [], 'appended');
        assert.deepEqual(updateLayout.lastCall.args, [], 'layout');

        function reset() {
            updateLayout.reset();
            linkAppend.reset();
            linkRemove.reset();
        }
    });

    QUnit.test('Root appending and removing on projection event', function (assert) {
        const updateLayout = this.updateLayout;
        const linkAppend = this.root.stub('linkAppend');
        const linkRemove = this.root.stub('linkRemove');
        this.controlBar.setOptions({});
        this.controlBar.setInteraction({});

        reset();
        this.projection.on.lastCall.args[0].engine();
        assert.deepEqual(linkAppend.lastCall.args, [], 'appended');
        assert.deepEqual(updateLayout.lastCall.args, [], 'layout');

        reset();
        this.projection.isInvertible = returnValue(false);
        this.projection.on.lastCall.args[0].engine();
        assert.deepEqual(linkRemove.lastCall.args, [], 'removed');
        assert.deepEqual(updateLayout.lastCall.args, [], 'layout');

        function reset() {
            updateLayout.reset();
            linkAppend.reset();
            linkRemove.reset();
        }
    });

    QUnit.test('zoomDrag at bottom position', function (assert) {
        this.controlBar.setOptions({});
        this.controlBar.setInteraction({});
        this.projection.getZoomScalePartition = returnValue(10);
        this.projection.getScaledZoom = returnValue(0);

        this.projection.on.lastCall.args[0]['max-zoom']();

        assert.deepEqual(this.zoomDrag.attr.lastCall.args, [{ translateY: 0 }], 'zoomDrag position');
        assert.deepEqual(this.zoomDragTracker.attr.lastCall.args, [{ translateY: 0 }], 'zoomDragTracker position');
        assert.deepEqual(this.zoomLine.attr.lastCall.args, [{
            points: [[0, 88.5, 0, 201.5], [0, 205.5, 0, 205.5]]
        }], 'zoomLine points');
    });

    QUnit.test('zoomDrag at top position', function (assert) {
        this.controlBar.setOptions({});
        this.controlBar.setInteraction({});
        this.projection.getZoomScalePartition = returnValue(10);
        this.projection.getScaledZoom = returnValue(10);

        this.projection.on.lastCall.args[0]['max-zoom']();

        assert.deepEqual(this.zoomDrag.attr.lastCall.args, [{ translateY: -117 }], 'zoomDrag position');
        assert.deepEqual(this.zoomDragTracker.attr.lastCall.args, [{ translateY: -117 }], 'zoomDragTracker position');
        assert.deepEqual(this.zoomLine.attr.lastCall.args, [{
            points: [[0, 88.5, 0, 88.5], [0, 92.5, 0, 205.5]]
        }], 'zoomLine points');
    });

    QUnit.test('zoomDrag at intermediate position', function (assert) {
        this.controlBar.setOptions({});
        this.controlBar.setInteraction({});
        this.projection.getZoomScalePartition = returnValue(10);
        this.projection.getScaledZoom = returnValue(4);

        this.projection.on.lastCall.args[0]['max-zoom']();

        assert.deepEqual(this.zoomDrag.attr.lastCall.args, [{ translateY: -47 }], 'zoomDrag position');
        assert.deepEqual(this.zoomDragTracker.attr.lastCall.args, [{ translateY: -47 }], 'zoomDragTracker position');
        assert.deepEqual(this.zoomLine.attr.lastCall.args, [{
            points: [[0, 88.5, 0, 154.5], [0, 162.5, 0, 205.5]]
        }], 'zoomLine points');
    });

    QUnit.test('zoomDrag movement', function (assert) {
        this.controlBar.setOptions({});
        this.controlBar.setInteraction({});
        this.projection.getZoomScalePartition = returnValue(10);
        this.projection.getScaledZoom = returnValue(0);
        this.projection.on.lastCall.args[0]['max-zoom']();

        this.projection.getScaledZoom = returnValue(7);
        this.projection.on.lastCall.args[0]['zoom']();

        assert.deepEqual(this.zoomDrag.attr.lastCall.args, [{ translateY: -82 }], 'zoomDrag position');
        assert.deepEqual(this.zoomDragTracker.attr.lastCall.args, [{ translateY: -82 }], 'zoomDragTracker position');
        assert.deepEqual(this.zoomLine.attr.lastCall.args, [{
            points: [[0, 88.5, 0, 119.5], [0, 127.5, 0, 205.5]]
        }], 'zoomLine points');
    });

    QUnit.test('Layout options - 1', function (assert) {
        this.controlBar.setInteraction({});
        this.controlBar.setOptions({});

        assert.deepEqual(this.controlBar.getLayoutOptions(), {
            width: 61, height: 274,
            horizontalAlignment: 'left',
            verticalAlignment: 'top'
        });
    });

    QUnit.test('Layout options - 2', function (assert) {
        this.controlBar.setInteraction({});
        this.controlBar.setOptions({ margin: 5, horizontalAlignment: 'RIGHT', verticalAlignment: 'Bottom' });

        assert.deepEqual(this.controlBar.getLayoutOptions(), {
            width: 71, height: 284,
            horizontalAlignment: 'right',
            verticalAlignment: 'bottom'
        });
    });

    QUnit.test('Layout option - disabled', function (assert) {
        this.controlBar.setOptions({ enabled: false });
        this.controlBar.setInteraction({});

        assert.strictEqual(this.controlBar.getLayoutOptions(), null);
    });

    QUnit.test('Controlbar option panVisible - false', function (assert) {
        this.controlBar.setOptions({ panVisible: false });
        this.controlBar.setInteraction({});

        assert.strictEqual(this.renderer.g.getCall(1).returnValue.css.lastCall.args[0].display, 'none');
        assert.strictEqual(this.renderer.g.getCall(3).returnValue.css.lastCall.args[0].display, 'none');
    });

    QUnit.test('Controlbar option zoomVisible - false', function (assert) {
        this.controlBar.setOptions({ zoomVisible: false });
        this.controlBar.setInteraction({});

        assert.strictEqual(this.renderer.g.getCall(2).returnValue.css.lastCall.args[0].display, 'none');
        assert.strictEqual(this.renderer.g.getCall(4).returnValue.css.lastCall.args[0].display, 'none');
    });

    QUnit.test('Layout options - no interaction', function (assert) {
        this.controlBar.setOptions({});
        this.controlBar.setInteraction({ centeringEnabled: false, zoomingEnabled: false });

        assert.strictEqual(this.controlBar.getLayoutOptions(), null);
    });

    QUnit.test('Layout options - projection is not invertible', function (assert) {
        this.controlBar.setOptions({});
        this.controlBar.setInteraction({});
        this.projection.isInvertible = returnValue(false);
        this.projection.on.lastCall.args[0].engine();

        assert.strictEqual(this.controlBar.getLayoutOptions(), null);
    });

    QUnit.test('resize', function (assert) {
        this.controlBar.setInteraction({});
        this.controlBar.setOptions({});

        this.controlBar.resize({});

        assert.deepEqual(this.root.attr.lastCall.args, [{ visibility: null }]);
    });

    QUnit.test('resize - hide', function (assert) {
        this.controlBar.setInteraction({});
        this.controlBar.setOptions({});

        this.controlBar.resize(null);

        assert.deepEqual(this.root.attr.lastCall.args, [{ visibility: 'hidden' }]);
    });

    QUnit.test('resize - when disabled', function (assert) {
        this.controlBar.setInteraction({});
        this.controlBar.setOptions({ enabled: false });
        this.root.attr.reset();

        this.controlBar.resize({});

        assert.strictEqual(this.root.attr.lastCall, null);
    });

    QUnit.test('locate - 1', function (assert) {
        this.controlBar.setInteraction({});
        this.controlBar.setOptions({});

        this.controlBar.locate(100, 200);

        assert.deepEqual(this.root.attr.lastCall.args, [{ translateX: 130.5, translateY: 230.5 }]);
    });

    QUnit.test('locate - 2', function (assert) {
        this.controlBar.setInteraction({});
        this.controlBar.setOptions({ margin: 15 });

        this.controlBar.locate(100, 50);

        assert.deepEqual(this.root.attr.lastCall.args, [{ translateX: 145.5, translateY: 95.5 }]);
    });

    QUnit.module('Commands - general', {
        beforeEach: function () {
            environment.beforeEach.apply(this, arguments);
            this.controlBar.setInteraction({});
            this.controlBar.setOptions({});
            const test = this;
            this.commandType = function () {
                test.command = this;
                this.args = $.makeArray(arguments);
                this.update = sinon.spy();
                this.finish = sinon.spy();
            };
            this.commandType.flags = 3;
            controlBarModule._TESTS_stubCommandToTypeMap({
                'test-command': this.commandType
            });
        },

        afterEach: function () {
            controlBarModule._TESTS_restoreCommandToTypeMap();
            environment.afterEach.apply(this, arguments);
        },

        triggerTrackerEvent: function (name, arg) {
            this.tracker.on.lastCall.args[0][name](arg);
        }
    });

    QUnit.test('Command is created on processStart', function (assert) {
        const arg = { data: { name: 'control-bar', index: 'test-command', tag: 'tag' } };

        this.triggerTrackerEvent('start', arg);

        assert.deepEqual(this.command.args, [this.controlBar, 'test-command', arg], 'arguments');
    });

    QUnit.test('Command is not created if disabled', function (assert) {
        this.controlBar.setOptions({ enabled: false });

        this.triggerTrackerEvent('start', { data: { name: 'control-bar', index: 'test-command', tag: 'tag' } });

        assert.strictEqual(this.command, undefined);
    });

    QUnit.test('Command is not created if flags do not match', function (assert) {
        this.commandType.flags = 4;

        this.triggerTrackerEvent('start', { data: { name: 'control-bar', index: 'test-command', tag: 'tag' } });

        assert.strictEqual(this.command, undefined);
    });

    QUnit.test('Command is not created if data.name does not match', function (assert) {
        this.triggerTrackerEvent('start', { data: { name: 'other', index: 'test-command', tag: 'tag' } });

        assert.strictEqual(this.command, undefined);
    });

    QUnit.test('Command is updated on processMove', function (assert) {
        const arg = { data: { name: 'some-name', index: 'some-command', tag: 'tag' } };
        this.triggerTrackerEvent('start', { data: { name: 'control-bar', index: 'test-command', tag: 'tag' } });

        this.triggerTrackerEvent('move', arg);

        assert.deepEqual(this.command.update.lastCall.args, ['some-command', arg]);
    });

    QUnit.test('Command is finished on processEnd', function (assert) {
        this.triggerTrackerEvent('start', { data: { name: 'control-bar', index: 'test-command', tag: 'tag' } });

        this.triggerTrackerEvent('end');

        assert.deepEqual(this.command.finish.lastCall.args, []);
    });

    QUnit.test('Command is finished on setOptions', function (assert) {
        this.triggerTrackerEvent('start', { data: { name: 'control-bar', index: 'test-command', tag: 'tag' } });

        this.controlBar.setOptions({});

        assert.deepEqual(this.command.finish.lastCall.args, []);
    });

    QUnit.test('Command is finished on setInteraction', function (assert) {
        this.triggerTrackerEvent('start', { data: { name: 'control-bar', index: 'test-command', tag: 'tag' } });

        this.controlBar.setInteraction({});

        assert.deepEqual(this.command.finish.lastCall.args, []);
    });

    const commandsEnvironment = {
        beforeEach: function () {
            environment.beforeEach.apply(this, arguments);
            this.controlBar.setInteraction({});
            this.controlBar.setOptions({});
            const projection = this.projection;
            projection.getZoomScalePartition = returnValue(10);
            projection.getScaledZoom = returnValue(4);
            $.each(this.projectionMethods, function (_, name) {
                projection[name] = sinon.spy();
            });
            projection.on.lastCall.args[0]['max-zoom']();
            this.clock = sinon.useFakeTimers();
        },

        afterEach: function () {
            this.clock.restore();
            environment.afterEach.apply(this, arguments);
        },

        tick: function (timeout) {
            this.clock.tick(timeout);
        },

        trigger: function (name, command, extra) {
            this.tracker.on.lastCall.args[0][name]($.extend({ data: { name: 'control-bar', index: command } }, extra));
        }
    };

    QUnit.module('Command - reset', $.extend({}, commandsEnvironment, {
        projectionMethods: ['setCenter', 'setZoom']
    }));

    QUnit.test('Reset callback is invoked if "start" then "end" occurs on "reset" button', function (assert) {
        this.trigger('start', 'command-reset');
        this.trigger('end');

        assert.deepEqual(this.projection.setCenter.lastCall.args, [null], 'center is reset');
        assert.deepEqual(this.projection.setZoom.lastCall.args, [null], 'zoom is reset');
    });

    QUnit.test('Reset callback is not invoked if after "start" then "move" occurs on other area', function (assert) {
        this.trigger('start', 'command-reset');
        this.trigger('move', 'test');
        this.trigger('end');

        assert.strictEqual(this.projection.setCenter.lastCall, null, 'center is not reset');
        assert.strictEqual(this.projection.setZoom.lastCall, null, 'zoom is not reset');
    });

    QUnit.test('Reset callback is not invoked when centering and zooming are disabled', function (assert) {
        this.controlBar.setInteraction({ centeringEnabled: false, zoomingEnabled: false });

        this.trigger('start', 'command-reset');
        this.trigger('end');

        assert.strictEqual(this.projection.setCenter.lastCall, null, 'center is not reset');
        assert.strictEqual(this.projection.setZoom.lastCall, null, 'zoom is not reset');
    });

    QUnit.test('Reset callback when only centering is disabled', function (assert) {
        this.controlBar.setInteraction({ centeringEnabled: false });

        this.trigger('start', 'command-reset');
        this.trigger('end');

        assert.strictEqual(this.projection.setCenter.lastCall, null, 'center is not reset');
        assert.deepEqual(this.projection.setZoom.lastCall.args, [null], 'zoom is reset');
    });

    QUnit.test('Reset callback when only zooming is disabled', function (assert) {
        this.controlBar.setInteraction({ zoomingEnabled: false });

        this.trigger('start', 'command-reset');
        this.trigger('end');

        assert.deepEqual(this.projection.setCenter.lastCall.args, [null], 'center is reset');
        assert.strictEqual(this.projection.setZoom.lastCall, null, 'zoom is not reset');
    });

    QUnit.module('Command - move', $.extend({}, commandsEnvironment, {
        projectionMethods: ['beginMoveCenter', 'endMoveCenter', 'moveCenter']
    }));

    QUnit.test('Move callback is invoked if "start" then "end" occurs on "move-up" button', function (assert) {
        this.trigger('start', 'command-move-up');
        this.tick(80);
        this.trigger('end');

        assert.strictEqual(this.projection.beginMoveCenter.callCount, 1, 'begin move center');
        assert.strictEqual(this.projection.endMoveCenter.callCount, 1, 'end move center');
        assert.strictEqual(this.projection.moveCenter.callCount, 1, 'move center');
        assert.deepEqual(this.projection.moveCenter.getCall(0).args, [[0, -10]], 'move 1');
    });

    QUnit.test('Move callback is invoked if "start" then "end" occurs on "move-right" button', function (assert) {
        this.trigger('start', 'command-move-right');
        this.tick(150);
        this.trigger('end');

        assert.strictEqual(this.projection.beginMoveCenter.callCount, 1, 'begin move center');
        assert.strictEqual(this.projection.endMoveCenter.callCount, 1, 'end move center');
        assert.strictEqual(this.projection.moveCenter.callCount, 2, 'move center');
        assert.deepEqual(this.projection.moveCenter.getCall(0).args, [[10, 0]], 'move 1');
        assert.deepEqual(this.projection.moveCenter.getCall(1).args, [[10, 0]], 'move 2');
    });

    QUnit.test('Move callback is invoked if "start" then "end" occurs on "move-down" button', function (assert) {
        this.trigger('start', 'command-move-down');
        this.tick(200);
        this.trigger('end');

        assert.strictEqual(this.projection.beginMoveCenter.callCount, 1, 'begin move center');
        assert.strictEqual(this.projection.endMoveCenter.callCount, 1, 'end move center');
        assert.strictEqual(this.projection.moveCenter.callCount, 3, 'move center');
        assert.deepEqual(this.projection.moveCenter.getCall(0).args, [[0, 10]], 'move 1');
        assert.deepEqual(this.projection.moveCenter.getCall(1).args, [[0, 10]], 'move 2');
        assert.deepEqual(this.projection.moveCenter.getCall(2).args, [[0, 10]], 'move 3');
    });

    QUnit.test('Move callback is invoked if "start" then "end" occurs on "move-left" button', function (assert) {
        this.trigger('start', 'command-move-left');
        this.tick(310);
        this.trigger('end');

        assert.strictEqual(this.projection.beginMoveCenter.callCount, 1, 'begin move center');
        assert.strictEqual(this.projection.endMoveCenter.callCount, 1, 'end move center');
        assert.strictEqual(this.projection.moveCenter.callCount, 4, 'move center');
        assert.deepEqual(this.projection.moveCenter.getCall(0).args, [[-10, 0]], 'move 1');
        assert.deepEqual(this.projection.moveCenter.getCall(1).args, [[-10, 0]], 'move 2');
        assert.deepEqual(this.projection.moveCenter.getCall(2).args, [[-10, 0]], 'move 3');
        assert.deepEqual(this.projection.moveCenter.getCall(3).args, [[-10, 0]], 'move 4');
    });

    QUnit.test('Move callback is aborted if "move" occurs on non command area', function (assert) {
        this.trigger('start', 'command-move-up');
        this.tick(110);
        this.trigger('move', 'test');
        this.tick(200);
        this.trigger('end');

        assert.strictEqual(this.projection.beginMoveCenter.callCount, 1, 'begin move center');
        assert.strictEqual(this.projection.endMoveCenter.callCount, 1, 'end move center');
        assert.strictEqual(this.projection.moveCenter.callCount, 2, 'move center');
        assert.deepEqual(this.projection.moveCenter.getCall(0).args, [[0, -10]], 'move 1');
        assert.deepEqual(this.projection.moveCenter.getCall(1).args, [[0, -10]], 'move 2');
    });

    QUnit.test('Move callback is not invoked if centering is disabled', function (assert) {
        this.controlBar.setInteraction({ centeringEnabled: false });
        this.trigger('start', 'command-move-up');
        this.tick(100);
        this.trigger('end');

        assert.strictEqual(this.projection.beginMoveCenter.callCount, 0, 'begin move center');
        assert.strictEqual(this.projection.endMoveCenter.callCount, 0, 'end move center');
        assert.strictEqual(this.projection.moveCenter.callCount, 0, 'move center');
    });

    QUnit.module('Command - zoom button', $.extend({}, commandsEnvironment, {
        projectionMethods: ['setScaledZoom']
    }));

    QUnit.test('Zoom callback is invoked if "start" then "end" occurs on "zoom-in" button', function (assert) {
        this.trigger('start', 'command-zoom-in');
        this.tick(80);
        this.trigger('end');

        assert.strictEqual(this.projection.setScaledZoom.callCount, 1, 'set zoom');
        assert.deepEqual(this.projection.setScaledZoom.getCall(0).args, [5], 'zoom 1');
    });

    QUnit.test('Zoom callback is invoked if "start" then "end" occurs on "zoom-out" button', function (assert) {
        this.trigger('start', 'command-zoom-out');
        this.tick(150);
        this.trigger('end');

        assert.strictEqual(this.projection.setScaledZoom.callCount, 1, 'set zoom');
        assert.deepEqual(this.projection.setScaledZoom.getCall(0).args, [2], 'zoom 1');
    });

    QUnit.test('Zoom callback is aborted if "move" occurs on non command area', function (assert) {
        this.trigger('start', 'command-zoom-in');
        this.tick(80);
        this.trigger('move', 'test');
        this.tick(200);
        this.trigger('end');

        assert.strictEqual(this.projection.setScaledZoom.callCount, 1, 'set zoom');
        assert.deepEqual(this.projection.setScaledZoom.getCall(0).args, [5], 'zoom 1');
    });

    QUnit.test('Zoom callback is not invoked if zooming is disabled', function (assert) {
        this.controlBar.setInteraction({ zoomingEnabled: false });
        this.trigger('start', 'command-zoom-in');
        this.tick(80);
        this.trigger('end');

        assert.strictEqual(this.projection.setScaledZoom.callCount, 0, 'set zoom');
    });

    QUnit.module('Command - zoom drag', $.extend({}, commandsEnvironment, {
        projectionMethods: ['setScaledZoom']
    }));

    QUnit.test('Zoom callback is invoked if "start" then "move" then "end" occurs on "drag"', function (assert) {
        this.trigger('start', 'command-zoom-drag', { y: 50 });
        this.trigger('move', 'test', { y: 42 });
        this.trigger('move', 'test', { y: 28 });
        this.trigger('end');

        assert.strictEqual(this.projection.setScaledZoom.callCount, 1, 'set zoom');
        assert.deepEqual(this.projection.setScaledZoom.getCall(0).args, [6], 'zoom 1');
    });

    QUnit.test('Zoom callback is not invoked if zooming is disabled', function (assert) {
        this.controlBar.setInteraction({ zoomingEnabled: false });
        this.trigger('start', 'command-zoom-drag', { y: 50 });
        this.trigger('move', 'test', { y: 42 });
        this.trigger('move', 'test', { y: 28 });
        this.trigger('end');

        assert.strictEqual(this.projection.setScaledZoom.callCount, 0, 'set zoom');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","../../helpers/vizMocks.js","viz/vector_map/control_bar/control_bar"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("../../helpers/vizMocks.js"), require("viz/vector_map/control_bar/control_bar"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=controlBar.tests.js.map