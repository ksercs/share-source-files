!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.sankey/sankey.items.node.tests.js"], ["./commonParts/common.js","viz/themes"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.sankey/sankey.items.node.tests.js', ['./commonParts/common.js', 'viz/themes'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const common = $__require('./commonParts/common.js');
    const createSankey = common.createSankey;
    const environment = common.environment;
    const themeModule = $__require('viz/themes');
    const find = common.find;

    themeModule.registerTheme({
        name: 'test-theme',
        sankey: {
            node: {
                border: {
                    visible: true,
                    color: 'black'
                }
            }
        } }, 'generic.light');

    QUnit.module('Items: nodes', environment);

    QUnit.test('Creation', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }]
        });
        const nodes = sankey.getAllNodes();

        assert.equal(nodes[0].title, 'A');
        assert.equal(nodes[0].linksIn.length, 0);
        assert.equal(nodes[0].linksOut.length, 1);
        assert.equal(nodes[0].linksOut[0].weight, 1);
        assert.equal(nodes[0].linksOut[0].node, 'Z');

        assert.equal(nodes[1].title, 'B');
        assert.equal(nodes[1].linksIn.length, 0);
        assert.equal(nodes[1].linksOut.length, 1);
        assert.equal(nodes[1].linksOut[0].weight, 1);
        assert.equal(nodes[1].linksOut[0].node, 'Z');

        assert.equal(nodes[2].title, 'Z');
        assert.equal(nodes[2].linksIn.length, 2);
        assert.equal(nodes[2].linksIn[0].weight, 1);
        assert.equal(nodes[2].linksIn[0].node, 'A');
        assert.equal(nodes[2].linksIn[1].weight, 1);
        assert.equal(nodes[2].linksIn[1].node, 'B');
        assert.equal(nodes[2].linksOut.length, 0);
    });

    QUnit.test('Passing nodes[].rect coordinates to SVG', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }]
        });
        const nodes = sankey.getAllNodes();
        const nodesSVG = this.nodes();

        ['A', 'B', 'Z'].forEach(function (nodeName) {
            const nodeItem = find(nodes, function (n) {
                return n.title === nodeName;
            });
            const nodeSVG = find(nodesSVG, function (node) {
                return node.attr.firstCall.args[0]._name === nodeName;
            });
            assert.deepEqual(nodeSVG.attr.firstCall.args[0], nodeItem.rect, 'Node ' + nodeName + ': rectangles match');
        });
    });

    QUnit.test('Color from options applied to all nodes', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            node: {
                color: '#aabbcc'
            }
        });
        const nodes = this.nodes();

        assert.deepEqual(nodes[0].smartAttr.lastCall.args[0].fill, '#aabbcc');
        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0].fill, '#aabbcc');
    });

    QUnit.test('Normal style, border is not visible', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            node: {
                border: {
                    visible: false,
                    color: '#ffeedd',
                    width: 2
                }
            }
        });
        const nodes = this.nodes();

        assert.deepEqual(nodes[0].smartAttr.lastCall.args[0].stroke, '#ffeedd');
        assert.deepEqual(nodes[0].smartAttr.lastCall.args[0]['stroke-width'], 0);

        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0].stroke, '#ffeedd');
        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0]['stroke-width'], 0);
    });

    QUnit.test('Hover style', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            node: {
                color: '#432432',
                border: {
                    visible: true,
                    color: '#ffeedd',
                    width: 2
                },
                hoverStyle: {
                    color: '#654654',
                    border: {
                        visible: true,
                        color: '#aabbcc',
                        width: 3,
                        opacity: 0.1
                    },
                    hatching: {
                        direction: 'left'
                    }
                }
            }
        });

        sankey.getAllNodes()[1].hover(true);

        const nodes = this.nodes();

        assert.equal(nodes[1].smartAttr.lastCall.args[0].fill, '#654654');
        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0].stroke, '#aabbcc');
        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0]['stroke-width'], 3);
        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0]['stroke-opacity'], 0.1);
        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0].hatching, {
            direction: 'left',
            opacity: 0.75,
            step: 6,
            width: 2
        });
    });

    QUnit.test('Sankey does not fire drawn event on hover', function (assert) {
        const drawn = sinon.spy();
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            onDrawn: drawn
        });

        drawn.reset();

        sankey.getAllNodes()[0].hover(true);

        assert.equal(drawn.callCount, 0);
    });

    QUnit.test('Clear hover of item', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            node: {
                color: '#111111',
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                },
                hoverStyle: {
                    border: {
                        visible: true,
                        color: '#123123',
                        width: 3
                    },
                    hatching: {
                        direction: 'left'
                    }
                }
            }
        });
        const node = sankey.getAllNodes()[1];

        node.hover(true);
        node.hover(false);

        const nodes = this.nodes();

        assert.equal(nodes[1].smartAttr.lastCall.args[0].fill, '#111111');
        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0]['stroke-width'], 2);
        assert.ok(!nodes[1].smartAttr.lastCall.args[0].hatching);
    });

    QUnit.test('Inherit border from normal style if hoverStyle.border option is not set', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            node: {
                color: '#234234',
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2,
                    opacity: 0.4
                }
            }
        });
        const node = sankey.getAllNodes()[1];

        node.hover(true);

        const nodes = this.nodes();

        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0].fill, '#234234');
        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0]['stroke-width'], 2);
        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0]['stroke-opacity'], 0.4);
    });

    QUnit.test('Border for hoverStyle can be disabled', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            node: {
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2
                },
                hoverStyle: {
                    border: {
                        visible: false
                    }
                }
            }
        });
        const node = sankey.getAllNodes()[1];

        node.hover(true);

        const nodes = this.nodes();

        assert.deepEqual(nodes[1].smartAttr.lastCall.args[0]['stroke-width'], 0);
    });

    QUnit.test('hover changed event', function (assert) {
        const hoverChanged = sinon.spy();
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            onNodeHoverChanged: hoverChanged
        });
        const node = sankey.getAllNodes()[0];

        node.hover(true);

        assert.ok(hoverChanged.calledOnce);
        assert.strictEqual(hoverChanged.lastCall.args[0].target, node);
    });

    QUnit.test('hover changed event after hover second item', function (assert) {
        const hoverChanged = sinon.spy();
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            onNodeHoverChanged: hoverChanged
        });
        const node = sankey.getAllNodes()[0];

        node.hover(true);
        hoverChanged.reset();

        sankey.getAllNodes()[1].hover(true);

        assert.equal(hoverChanged.callCount, 2);
    });

    QUnit.test('Hover item two times, hover changed event should fire only one time', function (assert) {
        const hoverChanged = sinon.spy();
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            onNodeHoverChanged: hoverChanged
        });
        const node = sankey.getAllNodes()[0];

        node.hover(true);
        node.hover(true);

        assert.equal(hoverChanged.callCount, 1);
    });

    QUnit.test('Unhover item if it is not hovered, hover changed event shouldn\'t fire', function (assert) {
        const hoverChanged = sinon.spy();
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            onNodeHoverChanged: hoverChanged
        });
        const node = sankey.getAllNodes()[0];

        node.hover(false);

        assert.equal(hoverChanged.callCount, 0);
    });

    QUnit.test('disable hover', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            hoverEnabled: false
        });
        const nodes = sankey.getAllNodes();

        nodes[0].hover(true);

        assert.ok(!nodes[0].isHovered());
    });

    QUnit.test('isHovered method', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }]
        });
        const nodes = sankey.getAllNodes();

        nodes[1].hover(true);

        assert.ok(nodes[1].isHovered());
        assert.ok(!nodes[0].isHovered());
    });

    QUnit.test('Default nodes.padding option', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }]
        });
        const nodes = this.nodes();
        const nodeA = find(nodes, function (node) {
            return node.attr.firstCall.args[0]._name === 'A';
        });
        const nodeB = find(nodes, function (node) {
            return node.attr.firstCall.args[0]._name === 'B';
        });
        const yA = nodeA.attr.firstCall.args[0].y;
        const heightA = nodeA.attr.firstCall.args[0].height;
        const yB = nodeB.attr.firstCall.args[0].y;

        assert.equal(yB - (yA + heightA), 30);
    });

    QUnit.test('Applying nodes.padding option', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            node: {
                padding: 10
            }
        });
        const nodes = this.nodes();
        const nodeA = find(nodes, function (node) {
            return node.attr.firstCall.args[0]._name === 'A';
        });
        const nodeB = find(nodes, function (node) {
            return node.attr.firstCall.args[0]._name === 'B';
        });
        const yA = nodeA.attr.firstCall.args[0].y;
        const heightA = nodeA.attr.firstCall.args[0].height;
        const yB = nodeB.attr.firstCall.args[0].y;

        assert.equal(yB - (yA + heightA), 10);
    });

    QUnit.test('Updating nodes.padding option', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            node: {
                padding: 10
            }
        });
        sankey.option({ node: { padding: 50 } });

        const nodes = this.nodes();
        const nodeA = find(nodes, function (node) {
            return node.attr.firstCall.args[0]._name === 'A';
        });
        const nodeB = find(nodes, function (node) {
            return node.attr.firstCall.args[0]._name === 'B';
        });
        const yA = nodeA.attr.firstCall.args[0].y;
        const heightA = nodeA.attr.firstCall.args[0].height;
        const yB = nodeB.attr.firstCall.args[0].y;

        assert.equal(yB - (yA + heightA), 50);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./commonParts/common.js","viz/themes"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./commonParts/common.js"), require("viz/themes"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=sankey.items.node.tests.js.map