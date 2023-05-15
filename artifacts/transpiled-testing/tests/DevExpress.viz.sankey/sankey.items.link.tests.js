!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.sankey/sankey.items.link.tests.js"], ["./commonParts/common.js","viz/themes"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.sankey/sankey.items.link.tests.js', ['./commonParts/common.js', 'viz/themes'], true, function ($__require, exports, module) {
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
        }
    }, 'generic.light');

    QUnit.module('Items: links', environment);

    QUnit.test('Creation', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }]
        });
        const links = sankey.getAllLinks();

        assert.equal(links[0].connection.source, 'A');
        assert.equal(links[0].connection.target, 'Z');
        assert.equal(links[0].connection.weight, 1);

        assert.equal(links[1].connection.source, 'B');
        assert.equal(links[1].connection.target, 'Z');
        assert.equal(links[1].connection.weight, 1);
    });

    QUnit.test('Color from options applied to all links', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            link: {
                color: '#aabbcc'
            }
        });

        assert.deepEqual(this.link(0)[0].smartAttr.lastCall.args[0].fill, '#aabbcc');
        assert.deepEqual(this.link(1)[0].smartAttr.lastCall.args[0].fill, '#aabbcc');
    });

    QUnit.test('Normal style, border is not visible', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            link: {
                border: {
                    visible: false,
                    color: '#ffeedd',
                    width: 2
                }
            }
        });

        const base = this.link(0)[0];
        assert.deepEqual(base.smartAttr.lastCall.args[0].stroke, '#ffeedd');
        assert.deepEqual(base.smartAttr.lastCall.args[0]['stroke-width'], 0);

        assert.deepEqual(base.smartAttr.lastCall.args[0].stroke, '#ffeedd');
        assert.deepEqual(base.smartAttr.lastCall.args[0]['stroke-width'], 0);
    });

    QUnit.test('Hover style', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            link: {
                color: '#432432',
                opacity: 0.1,
                border: {
                    visible: true,
                    color: '#ffeedd',
                    width: 2
                },
                hoverStyle: {
                    color: '#654654',
                    opacity: 0.75,
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

        const overlay = this.link(1)[0];
        const base = this.link(1)[1];
        assert.equal(overlay.smartAttr.lastCall.args[0].opacity, 0, 'overlay element is invisible');
        assert.equal(base.smartAttr.lastCall.args[0].opacity, 0.1, 'base element is visible');
        assert.equal(base.smartAttr.lastCall.args[0].fill, '#432432');

        sankey.getAllLinks()[1].hover(true);

        assert.equal(overlay.smartAttr.lastCall.args[0].opacity, 0.75, 'overlay visible');
        assert.equal(base.smartAttr.lastCall.args[0].opacity, 0), 'base invisible';

        assert.equal(overlay.smartAttr.lastCall.args[0].fill, '#654654');
        assert.equal(overlay.smartAttr.lastCall.args[0].stroke, '#aabbcc');
        assert.equal(overlay.smartAttr.lastCall.args[0]['stroke-width'], 3);
        assert.equal(overlay.smartAttr.lastCall.args[0]['stroke-opacity'], 0.1);
        assert.deepEqual(overlay.smartAttr.lastCall.args[0].hatching, {
            direction: 'left',
            opacity: 0.75,
            step: 6,
            width: 2
        });
    });

    QUnit.test('Sankey does not fire drawn event on link hover', function (assert) {
        const drawn = sinon.spy();
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            onDrawn: drawn
        });

        drawn.reset();

        sankey.getAllLinks()[0].hover(true);

        assert.equal(drawn.callCount, 0);
    });

    QUnit.test('Clear hover of item', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            link: {
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
        const link = sankey.getAllLinks()[1];

        link.hover(true);
        link.hover(false);

        const overlay = this.link(1)[0];
        const base = this.link(1)[1];

        assert.equal(base.smartAttr.lastCall.args[0].opacity, 0.3, 'base element visible');
        assert.equal(base.smartAttr.lastCall.args[0].fill, '#111111');
        assert.equal(base.smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.equal(base.smartAttr.lastCall.args[0]['stroke-width'], 2);
        assert.ok(!base.smartAttr.lastCall.args[0].hatching);

        assert.equal(overlay.smartAttr.lastCall.args[0].opacity, 0, 'overlay element invisible');
    });

    QUnit.test('Inherit border from normal style if hoverStyle.border option is not set', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            link: {
                color: '#234234',
                border: {
                    visible: true,
                    color: '#ffffff',
                    width: 2,
                    opacity: 0.4
                }
            }
        });
        const link = sankey.getAllLinks()[1];

        link.hover(true);

        const overlay = this.link(1)[0];
        const base = this.link(1)[1];

        assert.equal(base.smartAttr.lastCall.args[0].opacity, 0, 'base invisible');
        assert.equal(overlay.smartAttr.lastCall.args[0].opacity, 0.5, 'overlay visible');
        assert.equal(overlay.smartAttr.lastCall.args[0].fill, '#234234');
        assert.equal(overlay.smartAttr.lastCall.args[0].stroke, '#ffffff');
        assert.equal(overlay.smartAttr.lastCall.args[0]['stroke-width'], 2);
        assert.equal(overlay.smartAttr.lastCall.args[0]['stroke-opacity'], 0.4);
    });

    QUnit.test('Border for hoverStyle can be disabled', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            link: {
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
        const link = sankey.getAllLinks()[1];

        link.hover(true);

        const overlay = this.link(1)[0];
        const base = this.link(1)[1];

        assert.deepEqual(base.smartAttr.lastCall.args[0].opacity, 0);
        assert.deepEqual(overlay.smartAttr.lastCall.args[0].opacity, 0.5);
        assert.deepEqual(overlay.smartAttr.lastCall.args[0]['stroke-width'], 0);
    });

    QUnit.test('hover changed event', function (assert) {
        const hoverChanged = sinon.spy();
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            onLinkHoverChanged: hoverChanged
        });
        const link = sankey.getAllLinks()[0];

        link.hover(true);

        assert.ok(hoverChanged.calledOnce);
        assert.strictEqual(hoverChanged.lastCall.args[0].target, link);
    });

    QUnit.test('hover changed event after hover second item', function (assert) {
        const hoverChanged = sinon.spy();
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            onLinkHoverChanged: hoverChanged
        });
        const link = sankey.getAllLinks()[0];

        link.hover(true);
        hoverChanged.reset();

        sankey.getAllLinks()[1].hover(true);

        assert.equal(hoverChanged.callCount, 2);
    });

    QUnit.test('Hover item two times, hover changed event should fire only one time', function (assert) {
        const hoverChanged = sinon.spy();
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            onLinkHoverChanged: hoverChanged
        });
        const link = sankey.getAllLinks()[0];

        link.hover(true);
        link.hover(true);

        assert.equal(hoverChanged.callCount, 1);
    });

    QUnit.test('Unhover item if it is not hovered, hover changed event shouldn\'t fire', function (assert) {
        const hoverChanged = sinon.spy();
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            onLinkHoverChanged: hoverChanged
        });
        const link = sankey.getAllLinks()[0];

        link.hover(false);

        assert.equal(hoverChanged.callCount, 0);
    });

    QUnit.test('disable hover', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }],
            hoverEnabled: false
        });
        const links = sankey.getAllLinks();

        links[0].hover(true);

        assert.ok(!links[0].isHovered());
    });

    QUnit.test('isHovered method', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }]
        });
        const links = sankey.getAllLinks();

        links[1].hover(true);

        assert.ok(links[1].isHovered());
        assert.ok(!links[0].isHovered());
    });

    QUnit.test('links colorMode \'source\'', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            link: {
                colorMode: 'source'
            }
        });
        const nodes = this.nodes();

        sankey.getAllLinks().forEach(function (linkItem) {
            const node = find(nodes, function (node) {
                return node.attr.firstCall.args[0]._name === linkItem.connection.source;
            });
            assert.equal(node.smartAttr.firstCall.args[0].fill, linkItem.color);
        });
    });

    QUnit.test('links colorMode \'source\' with fixed color of nodes', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            node: {
                color: '#aabbcc'
            },
            link: {
                colorMode: 'source'
            }
        });

        assert.equal(this.link(0)[0].smartAttr.firstCall.args[0].fill, '#aabbcc');
        assert.equal(this.link(1)[0].smartAttr.firstCall.args[0].fill, '#aabbcc');
    });

    QUnit.test('links colorMode \'target\'', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            link: {
                colorMode: 'target'
            }
        });
        const nodes = this.nodes();

        sankey.getAllLinks().forEach(function (linkItem) {
            const node = find(nodes, function (node) {
                return node.attr.firstCall.args[0]._name === linkItem.connection.target;
            });
            assert.equal(node.smartAttr.firstCall.args[0].fill, linkItem.color);
        });
    });

    QUnit.test('links colorMode \'target\' with fixed color of nodes', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            node: {
                color: '#aabbcc'
            },
            link: {
                colorMode: 'target'
            }
        });

        assert.equal(this.link(0)[0].smartAttr.firstCall.args[0].fill, '#aabbcc');
        assert.equal(this.link(1)[0].smartAttr.firstCall.args[0].fill, '#aabbcc');
    });

    QUnit.test('links style when adjacent node is hovered', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }, { source: 'C', target: 'Z', weight: 1 }],
            node: {
                color: '#aabbcc'
            },
            link: {
                color: '#112233',
                hoverStyle: {
                    color: '#ffeedd'
                }
            }
        });

        sankey.getAllNodes()[0].hover(true);
        assert.equal(this.link(0)[0].smartAttr.lastCall.args[0].opacity, 0.5);
        assert.equal(this.link(0)[0].smartAttr.lastCall.args[0].fill, '#ffeedd');
        assert.equal(this.link(0)[1].smartAttr.lastCall.args[0].opacity, 0);

        assert.equal(this.link(1)[0].smartAttr.lastCall.args[0].opacity, 0);
        assert.equal(this.link(1)[1].smartAttr.lastCall.args[0].opacity, 0.3);
        assert.equal(this.link(1)[1].smartAttr.lastCall.args[0].fill, '#112233');

        assert.equal(this.link(2)[0].smartAttr.lastCall.args[0].opacity, 0);
        assert.equal(this.link(2)[1].smartAttr.lastCall.args[0].opacity, 0.3);
        assert.equal(this.link(2)[1].smartAttr.lastCall.args[0].fill, '#112233');

        sankey.getAllNodes()[0].hover(false);
        sankey.getAllNodes()[1].hover(true);
        assert.equal(this.link(0)[0].smartAttr.lastCall.args[0].opacity, 0);
        assert.equal(this.link(0)[1].smartAttr.lastCall.args[0].opacity, 0.3);
        assert.equal(this.link(0)[1].smartAttr.lastCall.args[0].fill, '#112233');

        assert.equal(this.link(1)[0].smartAttr.lastCall.args[0].opacity, 0.5);
        assert.equal(this.link(1)[0].smartAttr.lastCall.args[0].fill, '#ffeedd');
        assert.equal(this.link(1)[1].smartAttr.lastCall.args[0].opacity, 0);

        assert.equal(this.link(2)[0].smartAttr.lastCall.args[0].opacity, 0);
        assert.equal(this.link(2)[1].smartAttr.lastCall.args[0].opacity, 0.3);
        assert.equal(this.link(2)[1].smartAttr.lastCall.args[0].fill, '#112233');

        sankey.getAllNodes()[1].hover(false);
        sankey.getAllNodes()[2].hover(true);
        assert.equal(this.link(0)[0].smartAttr.lastCall.args[0].opacity, 0);
        assert.equal(this.link(0)[1].smartAttr.lastCall.args[0].opacity, 0.3);
        assert.equal(this.link(0)[1].smartAttr.lastCall.args[0].fill, '#112233');

        assert.equal(this.link(1)[0].smartAttr.lastCall.args[0].opacity, 0);
        assert.equal(this.link(1)[1].smartAttr.lastCall.args[0].opacity, 0.3);
        assert.equal(this.link(1)[1].smartAttr.lastCall.args[0].fill, '#112233');

        assert.equal(this.link(2)[0].smartAttr.lastCall.args[0].opacity, 0.5);
        assert.equal(this.link(2)[0].smartAttr.lastCall.args[0].fill, '#ffeedd');
        assert.equal(this.link(2)[1].smartAttr.lastCall.args[0].opacity, 0);
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
//# sourceMappingURL=sankey.items.link.tests.js.map