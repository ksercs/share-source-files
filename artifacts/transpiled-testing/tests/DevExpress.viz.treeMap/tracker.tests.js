!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.treeMap/tracker.tests.js"], ["./commonParts/common.js","../../helpers/vizMocks.js","jquery","viz/tree_map/tracker","viz/core/tooltip","events/click","events/pointer","viz/tree_map/tree_map"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.treeMap/tracker.tests.js', ['./commonParts/common.js', '../../helpers/vizMocks.js', 'jquery', 'viz/tree_map/tracker', 'viz/core/tooltip', 'events/click', 'events/pointer', 'viz/tree_map/tree_map'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const common = $__require('./commonParts/common.js');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const $ = $__require('jquery');

    const trackerModule = $__require('viz/tree_map/tracker');
    const tooltipModule = $__require('viz/core/tooltip');
    const clickEventName = $__require('events/click').name;
    const pointerEvents = $__require('events/pointer');

    const dxTreeMap = $__require('viz/tree_map/tree_map');

    dxTreeMap.addPlugin({
        name: 'tracker-test',
        init: function () {
            this._renderer.root.element = $('<div id=\'root\'>').appendTo('#test-container')[0];
        },
        dispose() {}
    });

    // Actually testing "data" applying is bad because it is totally internal part. But it allows to test events in a slightly simple way -
    // by triggering events on custom divs with data. Otherwise we would have to create widgets with real renderers, search the DOM for
    // a required element and trigger event on it. Of course it is more correct but also more "heavy" way.
    QUnit.module('Elements data', common.environment);

    QUnit.test('Tiles', function (assert) {
        common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }]
        });

        assert.deepEqual(this.tile(0).data.lastCall.args, [trackerModule._TESTS_dataKey, 1], 'tile 1');
        assert.deepEqual(this.tile(1).data.lastCall.args, [trackerModule._TESTS_dataKey, 2], 'tile 2');
        assert.deepEqual(this.tile(2).data.lastCall.args, [trackerModule._TESTS_dataKey, 3], 'tile 3');
    });

    QUnit.test('Headers and tiles', function (assert) {
        common.createWidget({
            dataSource: [{
                items: [{ value: 1 }]
            }, {
                items: [{ value: 2 }, { value: 3 }]
            }]
        });

        assert.strictEqual(this.tile(0).stub('data').lastCall, null, 'tile 1 outer');
        assert.deepEqual(this.tile(1).data.lastCall.args, [trackerModule._TESTS_dataKey, 1], 'tile 1 inner');
        assert.deepEqual(this.tile(2).data.lastCall.args, [trackerModule._TESTS_dataKey, 2], 'tile 1-1');
        assert.strictEqual(this.tile(3).stub('data').lastCall, null, 'tile 2 outer');
        assert.deepEqual(this.tile(4).data.lastCall.args, [trackerModule._TESTS_dataKey, 3], 'tile 2 inner');
        assert.deepEqual(this.tile(5).data.lastCall.args, [trackerModule._TESTS_dataKey, 4], 'tile 2-1');
        assert.deepEqual(this.tile(6).data.lastCall.args, [trackerModule._TESTS_dataKey, 5], 'tile 2-2');
    });

    QUnit.test('Labels', function (assert) {
        common.createWidget({
            dataSource: [{ value: 1, name: 'T1' }, { value: 2, name: 'T2' }]
        });

        assert.deepEqual(this.renderer.text.returnValues[1].data.lastCall.args, [trackerModule._TESTS_dataKey, 1], 'text 1');
        assert.deepEqual(this.renderer.text.returnValues[2].data.lastCall.args, [trackerModule._TESTS_dataKey, 2], 'text 2');
    });

    QUnit.test('Header labels', function (assert) {
        common.createWidget({
            dataSource: [{
                name: 'T1',
                items: [{ value: 1, name: 'T11' }]
            }, {
                name: 'T2',
                items: [{ value: 2, name: 'T21' }, { value: 3, name: 'T22' }]
            }]
        });

        assert.deepEqual(this.renderer.text.returnValues[1].data.lastCall.args, [trackerModule._TESTS_dataKey, 1], 'text 1');
        assert.deepEqual(this.renderer.text.returnValues[2].data.lastCall.args, [trackerModule._TESTS_dataKey, 2], 'text 1-1');
        assert.deepEqual(this.renderer.text.returnValues[3].data.lastCall.args, [trackerModule._TESTS_dataKey, 3], 'text 2');
        assert.deepEqual(this.renderer.text.returnValues[4].data.lastCall.args, [trackerModule._TESTS_dataKey, 4], 'text 2-1');
        assert.deepEqual(this.renderer.text.returnValues[5].data.lastCall.args, [trackerModule._TESTS_dataKey, 5], 'text 2-2');
    });

    QUnit.test('Two widgets do not have data intersection', function (assert) {
        const renderer1 = common.createRenderer();
        $('<div>').css({ width: 600, height: 400 }).appendTo('#qunit-fixture').dxTreeMap({
            dataSource: [{ value: 1 }, { value: 2 }]
        });
        const renderer2 = common.createRenderer();
        $('<div>').css({ width: 600, height: 400 }).appendTo('#qunit-fixture').dxTreeMap({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }]
        });

        assert.notStrictEqual(renderer1.simpleRect.returnValues[0].data.lastCall.args[0], renderer2.simpleRect.returnValues[0].data.lastCall.args[0]);
    });

    const environment = {
        beforeEach: function () {
            common.environment.beforeEach.apply(this, arguments);
            this.renderer.root.element = $('<div>').appendTo('#test-container')[0];
        },

        trigger: function (name, data, options) {
            const $target = $('<div>').appendTo(this.renderer.root.element);
            $target[0][trackerModule._TESTS_dataKey] = data;
            $target.trigger($.Event(name, options));
        }
    };

    QUnit.module('Events', environment);

    QUnit.test('Default is prevented and propagation is stopped on down', function (assert) {
        common.createWidget({
            dataSource: [{ value: 1 }]
        });
        const $target = $('<div>').appendTo(this.renderer.root.element);
        const $event = $.Event(pointerEvents.down);
        $target[0][trackerModule._TESTS_dataKey] = 1;

        $target.trigger($event);

        assert.strictEqual($event.isPropagationStopped(), false, 'propagation'); // T396917
        assert.strictEqual($event.isDefaultPrevented(), false, 'default'); // T633107
    });

    QUnit.test('Click', function (assert) {
        this.renderer.offsetTemplate = { left: 40, top: 30 };
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            onClick: spy
        });

        this.trigger(clickEventName, 2, { pageX: 400, pageY: 300 });

        assert.strictEqual(spy.callCount, 1, 'call count');
        assert.strictEqual(spy.lastCall.args[0].node, widget.getRootNode().getChild(1), 'node');
        assert.deepEqual(spy.lastCall.args[0].coords, [360, 270], 'coords');
    });

    QUnit.test('Click tile with \'interactWithGroup\' option', function (assert) {
        this.renderer.offsetTemplate = { left: 40, top: 30 };
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{
                items: [{
                    value: 1
                }]
            }, {
                items: [{
                    value: 2
                }, {
                    value: 3
                }]
            }],
            interactWithGroup: true,
            onClick: spy
        });

        this.trigger(clickEventName, 3, { pageX: 400, pageY: 300 });

        assert.strictEqual(spy.callCount, 1, 'call count');
        assert.strictEqual(spy.lastCall.args[0].node, widget.getRootNode().getChild(1), 'node');
        assert.deepEqual(spy.lastCall.args[0].coords, [360, 270], 'coords');
    });

    QUnit.test('Click tile with \'interactWithGroup\' when parent is not shown', function (assert) {
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{
                value: 1
            }, {
                value: 2
            }],
            interactWithGroup: true,
            onClick: spy
        });

        this.trigger(clickEventName, 1, {});

        assert.strictEqual(spy.callCount, 1, 'call count');
        assert.strictEqual(spy.lastCall.args[0].node, widget.getRootNode().getChild(0), 'node');
    });

    QUnit.test('Hover on', function (assert) {
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            onHoverChanged: spy
        });

        this.trigger(pointerEvents.move, 2);

        assert.strictEqual(spy.callCount, 1, 'call count');
        assert.strictEqual(spy.lastCall.args[0].node, widget.getRootNode().getChild(1), 'node');
        assert.strictEqual(widget.getRootNode().getChild(1).isHovered(), true, 'state');
    });

    QUnit.test('Hover off', function (assert) {
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            onHoverChanged: spy
        });
        this.trigger(pointerEvents.move, 2);
        spy.reset();

        this.trigger(pointerEvents.move, 1);

        assert.strictEqual(spy.callCount, 2, 'call count');
        assert.strictEqual(spy.getCall(0).args[0].node, widget.getRootNode().getChild(1), 'event 1 - node');
        assert.strictEqual(widget.getRootNode().getChild(1).isHovered(), false, 'state 1');
        assert.strictEqual(spy.getCall(1).args[0].node, widget.getRootNode().getChild(0), 'event 2 - node');
        assert.strictEqual(widget.getRootNode().getChild(0).isHovered(), true, 'state 2');
    });

    QUnit.test('Hover on / touch', function (assert) {
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            onHoverChanged: spy
        });

        this.trigger(pointerEvents.down, 2);

        assert.strictEqual(spy.callCount, 1, 'call count');
        assert.strictEqual(spy.lastCall.args[0].node, widget.getRootNode().getChild(1), 'node');
        assert.strictEqual(widget.getRootNode().getChild(1).isHovered(), true, 'state');
    });

    QUnit.test('Hovering same element several times does not cause hover changes', function (assert) {
        const spy = sinon.spy();
        common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            onHoverChanged: spy
        });
        this.trigger(pointerEvents.move, 2);
        spy.reset();

        this.trigger(pointerEvents.move, 2);
        this.trigger(pointerEvents.move, 2);
        this.trigger(pointerEvents.move, 2);

        assert.strictEqual(spy.callCount, 0, 'call count');
    });

    QUnit.test('Hovering unknown element turns current hover off', function (assert) {
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            onHoverChanged: spy
        });
        this.trigger(pointerEvents.move, 2);
        spy.reset();

        this.trigger(pointerEvents.move, 'test');

        assert.strictEqual(spy.callCount, 1, 'call count');
        assert.strictEqual(spy.lastCall.args[0].node, widget.getRootNode().getChild(1), 'event - node');
        assert.strictEqual(widget.getRootNode().getChild(1).isHovered(), false, 'state');
    });

    QUnit.test('Hover with \'interactWithGroup\' option', function (assert) {
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{
                items: [{
                    value: 1
                }]
            }, {
                items: [{
                    value: 2
                }, {
                    value: 3
                }]
            }],
            interactWithGroup: true,
            onHoverChanged: spy
        });

        this.trigger(pointerEvents.move, 3);

        assert.strictEqual(spy.callCount, 1, 'call count');
        assert.strictEqual(spy.lastCall.args[0].node, widget.getRootNode().getChild(1), 'node');
        assert.strictEqual(widget.getRootNode().getChild(1).isHovered(), true, 'state');
    });

    QUnit.module('Tooltip', $.extend({}, environment, {
        beforeEach: function () {
            environment.beforeEach.apply(this, arguments);
            this.renderer.offsetTemplate = { left: 40, top: 30 };
            this.tooltip = new vizMocks.Tooltip();
            this.tooltip.stub('isEnabled').returns(true);
            this.tooltip.stub('show').returns(true);
            this.__Tooltip = tooltipModule.Tooltip;
            tooltipModule.DEBUG_set_tooltip(common.returnValue(this.tooltip));
        },

        afterEach: function () {
            tooltipModule.DEBUG_set_tooltip(this.__Tooltip);
        }
    }));

    QUnit.test('Tooltip is shown on hover', function (assert) {
        const root = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            tooltip: {
                enabled: true
            }
        }).getRootNode();

        this.trigger(pointerEvents.move, 2, { pageX: 300, pageY: 200 });

        assert.deepEqual(this.tooltip.show.lastCall.args[0].node, root.getChild(1), 'show');
        assert.deepEqual(this.tooltip.show.lastCall.args[1], { x: 300, y: 200, offset: 0 });
    });

    QUnit.test('Tooltip is not shown on hover if tooltip disabled', function (assert) {
        common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            tooltip: {
                enabled: false
            }
        }).getRootNode();

        this.trigger(pointerEvents.move, 2, { pageX: 300, pageY: 200 });

        assert.ok(!this.tooltip.show.called);
    });

    QUnit.test('Tooltip is shown on touch', function (assert) {
        const root = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            tooltip: {
                enabled: true
            }
        }).getRootNode();

        this.trigger(pointerEvents.down, 2, { pageX: 300, pageY: 200 });

        assert.deepEqual(this.tooltip.show.lastCall.args[0].node, root.getChild(1), 'show');
        assert.deepEqual(this.tooltip.show.lastCall.args[1], { x: 300, y: 200, offset: 0 });
    });

    QUnit.test('Hovering same element several times does not cause several tooltip shows', function (assert) {
        const root = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            tooltip: {
                enabled: true
            }
        }).getRootNode();
        root.getChild(1).showTooltip();
        this.tooltip.show.reset();

        this.trigger(pointerEvents.move, 2, { pageX: 200, pageY: 100 });
        this.trigger(pointerEvents.move, 2, { pageX: 210, pageY: 120 });
        this.trigger(pointerEvents.move, 2, { pageX: 220, pageY: 140 });

        assert.strictEqual(this.tooltip.show.callCount, 0, 'show');
        assert.deepEqual(this.tooltip.move.lastCall.args, [220, 140, 0], 'move');
    });

    QUnit.test('Hovering unknown element hides tooltip', function (assert) {
        const root = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }],
            tooltip: {
                enabled: true
            }
        }).getRootNode();
        root.getChild(1).showTooltip();

        this.trigger(pointerEvents.move, 'test');

        assert.deepEqual(this.tooltip.hide.lastCall.args, [], 'hide');
    });

    QUnit.test('Show tooltip with \'interactWithGroup\' option', function (assert) {
        const root = common.createWidget({
            dataSource: [{
                items: [{
                    value: 1
                }]
            }, {
                items: [{
                    value: 2
                }, {
                    value: 3
                }]
            }],
            interactWithGroup: true,
            tooltip: {
                enabled: true
            }
        }).getRootNode();

        this.trigger(pointerEvents.move, 3);

        assert.deepEqual(this.tooltip.show.lastCall.args[0].node, root.getChild(1), 'show');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./commonParts/common.js","../../helpers/vizMocks.js","jquery","viz/tree_map/tracker","viz/core/tooltip","events/click","events/pointer","viz/tree_map/tree_map"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./commonParts/common.js"), require("../../helpers/vizMocks.js"), require("jquery"), require("viz/tree_map/tracker"), require("viz/core/tooltip"), require("events/click"), require("events/pointer"), require("viz/tree_map/tree_map"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tracker.tests.js.map