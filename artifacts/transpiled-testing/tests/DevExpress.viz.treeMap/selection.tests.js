!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.treeMap/selection.tests.js"], ["./commonParts/common.js","viz/tree_map/selection"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.treeMap/selection.tests.js', ['./commonParts/common.js', 'viz/tree_map/selection'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const common = $__require('./commonParts/common.js');

    $__require('viz/tree_map/selection');

    QUnit.module('Basics', common.environment);

    QUnit.test('Select tile', function (assert) {
        function onSelectionChanged(e) {
            assert.strictEqual(e.node.isSelected(), true, 'state inside callback');
        }
        const spy = sinon.spy(onSelectionChanged);
        const root = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }],
            onSelectionChanged: spy,
            tile: {
                selectionStyle: {
                    color: 'green',
                    border: { color: 'black', width: 3 }
                }
            }
        }).getRootNode();
        const tile = this.tile(0);
        tile.smartAttr.reset();

        root.getChild(0).select(true);

        assert.deepEqual(tile.smartAttr.lastCall.args, [{
            fill: 'green', stroke: 'black', 'stroke-width': 3, 'stroke-opacity': 1,
            hatching: { step: 6, width: 2, opacity: 0.5, direction: 'right' }
        }], 'settings');
        assert.strictEqual(spy.callCount, 1, 'events count');
        assert.strictEqual(spy.lastCall.args[0].node, root.getChild(0), 'event arg - node');
        assert.strictEqual(root.getChild(0).isSelected(), true, 'node state');
    });

    QUnit.test('Unselect tile', function (assert) {
        function onSelectionChanged(e) {
            assert.strictEqual(e.node.isSelected(), false, 'state inside callback');
        }
        const spy = sinon.spy(onSelectionChanged);
        const widget = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }],
            tile: {
                color: 'red',
                border: { color: 'blue', width: 2 }
            },
            colorizer: {
                type: 'none'
            }
        });
        const root = widget.getRootNode();
        const tile = this.tile(0);
        root.getChild(0).select(true);
        tile.smartAttr.reset();
        widget.on('selectionChanged', spy);

        root.getChild(0).select(false);

        assert.deepEqual(tile.smartAttr.lastCall.args, [{ fill: 'red', stroke: 'blue', 'stroke-width': 2, 'stroke-opacity': 0.2 }], 'settings');
        assert.strictEqual(spy.callCount, 1, 'events count');
        assert.strictEqual(spy.lastCall.args[0].node, root.getChild(0), 'event arg - node');
        assert.strictEqual(root.getChild(0).isSelected(), false, 'node state');
    });

    QUnit.test('Select group', function (assert) {
        const spy = sinon.spy();
        const root = common.createWidget({
            dataSource: [{
                items: [{ value: 3 }]
            }, {
                items: [{ value: 1 }, { value: 2 }]
            }],
            onSelectionChanged: spy,
            group: {
                selectionStyle: {
                    color: 'red',
                    border: { color: 'blue', width: 2 }
                }
            }
        }).getRootNode();
        const outer = this.tile(0);
        const inner = this.tile(1);
        outer.attr.reset();
        inner.smartAttr.reset();

        root.getChild(0).select(true);

        assert.deepEqual(outer.attr.lastCall.args, [{ stroke: 'blue', 'stroke-width': 2, 'stroke-opacity': undefined }], 'outer settings');
        assert.deepEqual(inner.smartAttr.lastCall.args, [{
            fill: 'red', opacity: undefined,
            hatching: { step: 6, width: 2, opacity: 0, direction: 'right' }
        }], 'inner settings');
        assert.strictEqual(spy.callCount, 1, 'events count');
        assert.strictEqual(spy.lastCall.args[0].node, root.getChild(0), 'event arg - node');
        assert.strictEqual(root.getChild(0).isSelected(), true, 'node state');
    });

    QUnit.test('Unselect group', function (assert) {
        const spy = sinon.spy();
        const root = common.createWidget({
            dataSource: [{
                items: [{ value: 3 }]
            }, {
                items: [{ value: 1 }, { value: 2 }]
            }],
            onSelectionChanged: spy,
            group: {
                color: 'green',
                border: { color: 'black', width: 3 }
            }
        }).getRootNode();
        const outer = this.tile(0);
        const inner = this.tile(1);
        root.getChild(0).select(true);
        outer.attr.reset();
        inner.smartAttr.reset();
        spy.reset();

        root.getChild(0).select(false);

        assert.deepEqual(outer.attr.lastCall.args, [{ stroke: 'black', 'stroke-width': 3, 'stroke-opacity': undefined }], 'outer settings');
        assert.deepEqual(inner.smartAttr.lastCall.args, [{ fill: 'green', opacity: undefined, hatching: undefined }], 'inner settings');
        assert.strictEqual(spy.callCount, 1, 'events count');
        assert.strictEqual(spy.lastCall.args[0].node, root.getChild(0), 'event arg - node');
        assert.strictEqual(root.getChild(0).isSelected(), false, 'node state');
    });

    QUnit.test('Select tile when another one is selected', function (assert) {
        const spy = sinon.spy();
        const root = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }],
            onSelectionChanged: spy
        }).getRootNode();
        root.getChild(0).select(true);
        spy.reset();

        root.getChild(1).select(true);

        assert.strictEqual(spy.callCount, 2, 'events count');
        assert.strictEqual(spy.getCall(0).args[0].node, root.getChild(0), 'event 1 arg - node');
        assert.strictEqual(root.getChild(0).isSelected(), false, 'state 1');
        assert.strictEqual(spy.getCall(1).args[0].node, root.getChild(1), 'event 2 arg - node');
        assert.strictEqual(root.getChild(1).isSelected(), true, 'state 2');
    });

    QUnit.test('Select tile when another one is selected - multiple selection', function (assert) {
        const spy = sinon.spy();
        const root = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }],
            onSelectionChanged: spy,
            selectionMode: 'MULTIPLE'
        }).getRootNode();
        root.getChild(0).select(true);
        spy.reset();

        root.getChild(1).select(true);

        assert.strictEqual(spy.callCount, 1, 'events count');
        assert.strictEqual(spy.lastCall.args[0].node, root.getChild(1), 'event arg - node');
        assert.strictEqual(root.getChild(1).isSelected(), true, 'state');
    });

    QUnit.test('Disabled selection', function (assert) {
        const spy = sinon.spy();
        const root = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }],
            onSelectionChanged: spy,
            selectionMode: 'NONE'
        }).getRootNode();

        root.getChild(0).select(true);

        assert.strictEqual(spy.callCount, 0, 'events count');
    });

    QUnit.test('Clear selection', function (assert) {
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }],
            onSelectionChanged: spy,
            selectionMode: 'multiple'
        });
        const root = widget.getRootNode();
        root.getChild(0).select(true);
        root.getChild(1).select(true);
        spy.reset();

        widget.clearSelection();

        assert.strictEqual(spy.callCount, 2, 'events count');
        assert.strictEqual(spy.getCall(0).args[0].node, root.getChild(0), 'event 1 arg - node');
        assert.strictEqual(root.getChild(0).isSelected(), false, 'state 1');
        assert.strictEqual(spy.getCall(1).args[0].node, root.getChild(1), 'event 2 arg - node');
        assert.strictEqual(root.getChild(1).isSelected(), false, 'state 2');
    });

    QUnit.test('Change from multiple to single', function (assert) {
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }],
            onSelectionChanged: spy,
            selectionMode: 'multiple'
        });
        const root = widget.getRootNode();
        root.getChild(1).select(true);
        root.getChild(0).select(true);
        spy.reset();

        widget.option('selectionMode', 'SINGLE');

        assert.strictEqual(spy.callCount, 1, 'events count');
        assert.strictEqual(spy.lastCall.args[0].node, root.getChild(1), 'event arg - node');
        assert.strictEqual(root.getChild(1).isSelected(), false, 'state');
    });

    QUnit.test('Change from multiple to none', function (assert) {
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }],
            onSelectionChanged: spy,
            selectionMode: 'multiple'
        });
        const root = widget.getRootNode();
        root.getChild(0).select(true);
        root.getChild(1).select(true);
        spy.reset();

        widget.option('selectionMode', 'NONE');

        assert.strictEqual(spy.callCount, 2, 'events count');
        assert.strictEqual(spy.getCall(0).args[0].node, root.getChild(0), 'event 1 arg - node');
        assert.strictEqual(root.getChild(0).isSelected(), false, 'state 1');
        assert.strictEqual(spy.getCall(1).args[0].node, root.getChild(1), 'event 2 arg - node');
        assert.strictEqual(root.getChild(1).isSelected(), false, 'state 2');
    });

    QUnit.test('Selection state is not applied until endUpdate', function (assert) {
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }],
            tile: {
                hoverStyle: {
                    color: 'red'
                }
            },
            onSelectionChanged: spy
        });
        this.tile(1).attr.reset();

        widget.beginUpdate();
        widget.getRootNode().getChild(1).select(true);

        assert.strictEqual(spy.callCount, 1, 'event');
        assert.strictEqual(this.tile(1).attr.callCount, 0, 'settings call count');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./commonParts/common.js","viz/tree_map/selection"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./commonParts/common.js"), require("viz/tree_map/selection"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=selection.tests.js.map