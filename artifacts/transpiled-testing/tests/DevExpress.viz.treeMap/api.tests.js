!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.treeMap/api.tests.js"], ["./commonParts/common.js","viz/tree_map/api"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.treeMap/api.tests.js', ['./commonParts/common.js', 'viz/tree_map/api'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const common = $__require('./commonParts/common.js');

    $__require('viz/tree_map/api');

    QUnit.module('Basics', common.environment);

    QUnit.test('root', function (assert) {
        const root = common.createWidget().getRootNode();

        assert.strictEqual(root.getParent(), null, 'parent');
        assert.strictEqual(root.getChildrenCount(), 0, 'count');
        assert.deepEqual(root.getAllChildren(), [], 'nodes');
    });

    QUnit.test('elements / one level', function (assert) {
        const root = common.createWidget({
            dataSource: [{ value: 1 }, { value: 2 }]
        }).getRootNode();

        assert.strictEqual(root.getChildrenCount(), 2, 'root count');
        assert.deepEqual(root.getAllChildren(), [root.getChild(0), root.getChild(1)], 'nodes');
        assert.strictEqual(root.getChild(0).getParent(), root, 'tile 1');
        assert.strictEqual(root.getChild(1).getParent(), root, 'tile 2');
    });

    QUnit.test('elements / two levels', function (assert) {
        const root = common.createWidget({
            dataSource: [{
                items: [{ value: 1 }]
            }, {
                items: [{ value: 2 }, { value: 3 }]
            }]
        }).getRootNode();

        assert.strictEqual(root.getChild(0).getChild(0).getParent(), root.getChild(0), 'tile 1-1');
        assert.strictEqual(root.getChild(1).getChild(0).getParent(), root.getChild(1), 'tile 2-1');
        assert.strictEqual(root.getChild(1).getChild(1).getParent(), root.getChild(1), 'tile 2-2');
    });

    QUnit.test('all nodes', function (assert) {
        const widget = common.createWidget({
            dataSource: [{
                items: [{ value: 1 }]
            }, {
                items: [{ value: 2 }, { value: 3 }]
            }]
        });
        const root = widget.getRootNode();

        assert.deepEqual(root.getAllNodes(), [root.getChild(0), root.getChild(0).getChild(0), root.getChild(1), root.getChild(1).getChild(0), root.getChild(1).getChild(1)], 'all nodes');
    });

    QUnit.test('root fields', function (assert) {
        const root = common.createWidget().getRootNode();

        assert.strictEqual(root.level, -1, 'root level');
        assert.strictEqual(root.index, -1, 'root index');
        assert.deepEqual(root.data, {}, 'root data');
    });

    QUnit.test('elements fields', function (assert) {
        const dataSource = [{
            items: [{ value: 1 }]
        }, {
            items: [{ value: 2 }, { value: 3 }]
        }];
        const root = common.createWidget({ dataSource: dataSource }).getRootNode();

        assert.strictEqual(root.getChild(0).level, 0, 'tile 1 - level');
        assert.strictEqual(root.getChild(0).index, 0, 'tile 1 - index');
        assert.strictEqual(root.getChild(0).data, dataSource[0], 'tile 1 - data');

        assert.strictEqual(root.getChild(1).level, 0, 'tile 2 - level');
        assert.strictEqual(root.getChild(1).index, 1, 'tile 2 - index');
        assert.strictEqual(root.getChild(1).data, dataSource[1], 'tile 2 - data');

        assert.strictEqual(root.getChild(0).getChild(0).level, 1, 'tile 1-1 - level');
        assert.strictEqual(root.getChild(0).getChild(0).index, 0, 'tile 1-1 - index');
        assert.strictEqual(root.getChild(0).getChild(0).data, dataSource[0].items[0], 'tile 1-1 - data');

        assert.strictEqual(root.getChild(1).getChild(0).level, 1, 'tile 2-1 - level');
        assert.strictEqual(root.getChild(1).getChild(0).index, 0, 'tile 2-1 - index');
        assert.strictEqual(root.getChild(1).getChild(0).data, dataSource[1].items[0], 'tile 2-1 - data');

        assert.strictEqual(root.getChild(1).getChild(1).level, 1, 'tile 2-2 - level');
        assert.strictEqual(root.getChild(1).getChild(1).index, 1, 'tile 2-2 - index');
        assert.strictEqual(root.getChild(1).getChild(1).data, dataSource[1].items[1], 'tile 2-2 - data');
    });

    QUnit.test('isLeaf and isActive', function (assert) {
        const root = common.createWidget({
            dataSource: [{
                items: [{ value: 1 }]
            }, {
                items: [{ value: 2 }, { value: 3 }]
            }]
        }).getRootNode();

        assert.strictEqual(root.isLeaf(), false, 'root - leaf check');
        assert.strictEqual(root.isActive(), false, 'root - active check');
        assert.strictEqual(root.getChild(0).isLeaf(), false, 'tile 1 - leaf check');
        assert.strictEqual(root.getChild(0).isActive(), true, 'tile 1 - active check');
        assert.strictEqual(root.getChild(1).getChild(1).isLeaf(), true, 'tile 2-2 - leaf check');
        assert.strictEqual(root.getChild(1).getChild(1).isActive(), true, 'tile 2-2 - active check');
    });

    QUnit.test('isLeaf and isActive with max depth', function (assert) {
        const root = common.createWidget({
            dataSource: [{
                items: [{ value: 1 }]
            }, {
                items: [{ value: 2 }, { value: 3 }]
            }],
            maxDepth: 1
        }).getRootNode();

        assert.strictEqual(root.isLeaf(), false, 'root - leaf check');
        assert.strictEqual(root.isActive(), false, 'root - active check');
        assert.strictEqual(root.getChild(0).isLeaf(), true, 'tile 1 - leaf check');
        assert.strictEqual(root.getChild(0).isActive(), true, 'tile 1 - active check');
        assert.strictEqual(root.getChild(1).getChild(1).isLeaf(), true, 'tile 2-2 - leaf check');
        assert.strictEqual(root.getChild(1).getChild(1).isActive(), false, 'tile 2-2 - active check');
    });

    QUnit.test('get value and label', function (assert) {
        const root = common.createWidget({
            dataSource: [{
                value: 1, name: 'Text 1'
            }, {
                value: 2
            }]
        }).getRootNode();

        assert.strictEqual(root.value(), 3, 'root - value');
        assert.strictEqual(root.label(), null, 'root - label');
        assert.strictEqual(root.getChild(0).value(), 1, 'node 1 - value');
        assert.strictEqual(root.getChild(0).label(), 'Text 1', 'node 1 - label');
        assert.strictEqual(root.getChild(1).value(), 2, 'node 2 - value');
        assert.strictEqual(root.getChild(1).label(), null, 'node 2 - label');
    });

    QUnit.test('Update values - batch update (non completed)', function (assert) {
        const widget = common.createWidget({
            dataSource: [{
                value: 1
            }, {
                value: 2
            }]
        });
        const root = widget.getRootNode();
        this.resetTilesAttr();

        widget.beginUpdate();
        root.getChild(0).value(3);
        root.getChild(1).value(3);

        assert.strictEqual(root.value(), 6, 'root - value');
        assert.strictEqual(root.getChild(0).value(), 3, 'node 1 - value');
        assert.strictEqual(root.getChild(1).value(), 3, 'node 2 - value');
        let i;
        for (i = 0; i < this.tileCount(); ++i) {
            assert.strictEqual(this.tile(i).attr.callCount, 0, 'node ' + (i + 1) + ' - settings are not updated');
        }
    });

    QUnit.test('Update values - batch update (completed)', function (assert) {
        const widget = common.createWidget({
            dataSource: [{
                value: 1
            }, {
                value: 2
            }]
        });
        this.resetTilesAttr();

        widget.beginUpdate();
        widget.getRootNode().getChild(0).value(3);
        widget.getRootNode().getChild(1).value(3);
        widget.endUpdate();

        let i;
        for (i = 0; i < this.tileCount(); ++i) {
            assert.strictEqual(this.tile(i).attr.callCount, 1, 'node ' + (i + 1) + ' - settings are updated');
        }
    });

    QUnit.test('Update values - non batch update', function (assert) {
        const widget = common.createWidget({
            dataSource: [{
                value: 1
            }, {
                value: 2
            }]
        });
        this.resetTilesAttr();

        widget.getRootNode().getChild(0).value(3);
        widget.getRootNode().getChild(1).value(3);

        let i;
        for (i = 0; i < this.tileCount(); ++i) {
            assert.strictEqual(this.tile(i).attr.callCount, 2, 'node ' + (i + 1) + ' - settings are updated');
        }
    });

    QUnit.test('Update labels', function (assert) {
        const widget = common.createWidget({
            dataSource: [{
                value: 1, name: 'old 1'
            }, {
                value: 2, name: 'old 2'
            }]
        });
        this.renderer.text.reset();

        widget.beginUpdate();
        widget.getRootNode().getChild(0).label('new 1');
        widget.getRootNode().getChild(1).label('new 2');
        widget.endUpdate();

        assert.strictEqual(this.renderer.text.callCount, 2, 'text count');
        let i;
        for (i = 0; i < 2; ++i) {
            assert.strictEqual(this.renderer.text.returnValues[i].attr.callCount, 1, 'node ' + (i + 1) + ' - settings call count');
        }
        assert.deepEqual(this.renderer.text.getCall(0).args, ['new 1'], 'node 1 text');
        assert.deepEqual(this.renderer.text.getCall(1).args, ['new 2'], 'node 2 text');
        assert.deepEqual(this.renderer.text.returnValues[0].move.getCall(0).args, [404, 2], 'node 1 position correction');
        assert.deepEqual(this.renderer.text.returnValues[1].move.getCall(0).args, [4, 2], 'node 2 position correction');
    });

    QUnit.test('Reset nodes', function (assert) {
        const widget = common.createWidget({
            dataSource: [{
                value: 1, name: 'Text 1'
            }, {
                value: 2, name: 'Text 2'
            }]
        });
        const root = widget.getRootNode();

        widget.resetNodes();

        assert.notStrictEqual(widget.getRootNode(), root, 'nodes are updated');
    });

    QUnit.test('Customize node / tile', function (assert) {
        const widget = common.createWidget({
            dataSource: [{
                value: 1
            }, {
                value: 2
            }]
        });
        this.tile(1).attr.reset();
        this.renderer.text.reset();

        widget.getRootNode().getChild(1).data.name = 'Hello';
        widget.getRootNode().getChild(1).customize({
            color: 'red',
            label: {
                font: {
                    color: 'red'
                }
            }
        });

        assert.strictEqual(this.tile(1).attr.callCount, 1, 'tile settings call count');
        assert.strictEqual(this.tile(1).attr.lastCall.args[0].fill, 'red', 'tile settings');
        assert.strictEqual(this.renderer.text.returnValues[0].css.lastCall.args[0].fill, 'red', 'label settings');
    });

    QUnit.test('Customize node / group', function (assert) {
        const widget = common.createWidget({
            dataSource: [{
                items: [{
                    value: 1
                }]
            }, {
                items: [{
                    value: 2
                }]
            }]
        });
        this.tile(3).attr.reset();
        this.tile(4).attr.reset();
        this.renderer.text.reset();

        widget.getRootNode().getChild(1).data.name = 'Hello';
        widget.getRootNode().getChild(1).customize({
            border: { color: 'blue' },
            color: 'red',
            label: {
                font: {
                    color: 'red'
                }
            }
        });

        assert.strictEqual(this.tile(3).attr.callCount, 1, 'tile outer settings call count');
        assert.strictEqual(this.tile(4).attr.callCount, 1, 'tile inner settings call count');
        assert.strictEqual(this.tile(3).attr.lastCall.args[0].stroke, 'blue', 'tile outer settings');
        assert.strictEqual(this.tile(4).attr.lastCall.args[0].fill, 'red', 'tile inner settings');
        assert.strictEqual(this.renderer.text.returnValues[0].css.lastCall.args[0].fill, 'red', 'label settings');
    });

    QUnit.test('Customize / changes are accumulated', function (assert) {
        const node = common.createWidget({
            dataSource: [{
                value: 1
            }, {
                value: 2
            }]
        }).getRootNode().getChild(1);
        node.data.name = 'Hello';
        node.customize({
            color: 'red',
            label: {
                font: {
                    color: 'red'
                }
            }
        });
        this.tile(1).attr.reset();
        this.renderer.text.reset();

        node.customize({
            border: { color: 'black' },
            label: {
                font: {
                    size: 20
                }
            }
        });

        assert.strictEqual(this.tile(1).attr.callCount, 1, 'tile settings call count');
        assert.strictEqual(this.tile(1).attr.lastCall.args[0].fill, 'red', 'tile settings');
        assert.strictEqual(this.tile(1).attr.lastCall.args[0].stroke, 'black', 'tile settings');
        assert.strictEqual(this.renderer.text.returnValues[0].css.lastCall.args[0].fill, 'red', 'label settings');
        assert.strictEqual(this.renderer.text.returnValues[0].css.lastCall.args[0]['font-size'], 20, 'label settings');
    });

    QUnit.test('Nodes initialized event', function (assert) {
        const spy = sinon.spy();
        const widget = common.createWidget({
            dataSource: [{
                value: 1
            }, {
                value: 2
            }],
            onNodesInitialized: spy
        });

        assert.strictEqual(spy.callCount, 1, 'events count');
        assert.strictEqual(spy.lastCall.args[0].root, widget.getRootNode(), 'event arg - root');
    });

    QUnit.test('Reset customization', function (assert) {
        const root = common.createWidget({
            dataSource: [{
                value: 1
            }, {
                value: 2
            }],
            onNodesInitialized: function (e) {
                e.root.getChild(0).customize({ color: 'red' });
            }
        }).getRootNode();
        this.tile(0).attr.reset();

        root.getChild(0).resetCustomization();

        assert.strictEqual(this.tile(0).attr.lastCall.args[0].fill, '#1db2f5', 'settings');
    });

    QUnit.test('Nodes rendering event', function (assert) {
        common.createWidget({
            dataSource: [{
                items: [{
                    items: [{
                        items: [{
                            value: 1
                        }]
                    }, {
                        value: 2
                    }]
                }]
            }, {
                value: 3
            }],
            maxDepth: 2,
            onNodesRendering: function (e) {
                const root = e.node;
                assert.strictEqual(root.getChild(0).getChild(0).isLeaf(), true, 'tile 1-1');
                assert.strictEqual(root.getChild(0).isLeaf(), false, 'tile 1');
                assert.strictEqual(root.getChild(1).isLeaf(), true, 'tile 2');
                assert.strictEqual(root.getChild(0).getChild(0).getChild(0).isActive(), false, 'tile 1-1-1');
            }
        });
    });

    QUnit.test('Customize - disabled labels', function (assert) {
        const root = common.createWidget({
            dataSource: [{
                value: 1, name: 'Tile 1'
            }],
            tile: {
                label: { visible: false }
            }
        }).getRootNode();
        this.renderer.text.reset();

        root.getChild(0).customize({
            label: {
                font: { color: 'red' }
            }
        });

        assert.strictEqual(this.renderer.text.callCount, 0, 'no texts');
    });

    QUnit.test('Customize - hide label', function (assert) {
        const root = common.createWidget({
            dataSource: [{
                value: 1, name: 'Tile 1'
            }]
        }).getRootNode();
        this.renderer.text.reset();

        root.getChild(0).customize({
            label: { visible: false }
        });

        assert.strictEqual(this.renderer.text.callCount, 0, 'no texts');
    });

    QUnit.test('Customize - show initially hidden label', function (assert) {
        const root = common.createWidget({
            dataSource: [{
                value: 1, name: 'Tile 1'
            }],
            tile: {
                label: { visible: false }
            }
        }).getRootNode();
        this.renderer.text.reset();

        root.getChild(0).customize({
            label: { visible: true }
        });

        assert.strictEqual(this.renderer.text.callCount, 1, 'texts count');
        assert.deepEqual(this.renderer.text.getCall(0).args, ['Tile 1'], 'text');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./commonParts/common.js","viz/tree_map/api"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./commonParts/common.js"), require("viz/tree_map/api"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=api.tests.js.map