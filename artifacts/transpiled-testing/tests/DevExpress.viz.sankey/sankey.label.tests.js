!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.sankey/sankey.label.tests.js"], ["jquery","./commonParts/common.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.sankey/sankey.label.tests.js', ['jquery', './commonParts/common.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const common = $__require('./commonParts/common.js');
    const createSankey = common.createSankey;
    const environment = common.environment;

    QUnit.module('Node labels', environment);

    QUnit.test('Create label group on initialization', function (assert) {
        createSankey({});

        const labelsGroup = this.labelsGroup();
        assert.equal(labelsGroup.append.lastCall.args[0], this.renderer.root);
        assert.equal(labelsGroup.attr.lastCall.args[0].class, 'dxs-labels');
    });

    QUnit.test('Create labels', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                visible: true
            }
        });
        const labelsGroup = this.labelsGroup();
        const labels = this.labels();
        const that = this;

        assert.ok(labelsGroup.clear.called);
        assert.equal(labels.length, 3);
        assert.equal(that.renderer.text.callCount, 3);

        labels.forEach(function (label) {
            assert.equal(label.renderer, that.renderer, 'renderer');
            assert.equal(label.append.callCount, 1, 'appended once');
            assert.equal(label.children[0].attr.callCount, 2, 'Two calls: setting all attrs and adjusting x,y coordinates');
        });

        assert.equal(that.renderer.text.getCall(0).args[0], 'A');
        assert.equal(that.renderer.text.getCall(1).args[0], 'B');
        assert.equal(that.renderer.text.getCall(2).args[0], 'Z');
    });

    QUnit.test('If no labels present', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                visible: false
            }
        });
        const labelsGroup = this.labelsGroup();
        const labels = this.labels();

        assert.ok(labelsGroup.clear.called);
        assert.equal(labels.length, 0);
    });

    QUnit.test('Create labels with styles', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                visible: true,
                border: {
                    visible: true,
                    color: 'white',
                    width: 10,
                    opacity: 0.2
                },
                font: {
                    color: 'red',
                    weight: 400,
                    size: 26
                }
            }
        });
        const label = this.label(0);
        const css = label.css.firstCall.args[0];
        const attrs = label.attr.firstCall.args[0];

        assert.deepEqual(css, {
            fill: 'red',
            cursor: 'default',
            'font-family': '\'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana, sans-serif',
            'font-size': 26,
            'font-weight': 400
        });
        assert.equal(attrs.stroke, 'white');
        assert.equal(attrs['stroke-opacity'], 0.2);
        assert.equal(attrs['stroke-width'], 10);
    });

    QUnit.test('Create labels with styles and invisible borders', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                visible: true,
                border: {
                    visible: false,
                    color: 'white',
                    width: 10,
                    opacity: 0.2
                }
            }
        });
        const attrs = this.label(0).attr.firstCall.args[0];
        const haveAttrsOwnProperty = Object.prototype.hasOwnProperty.bind(attrs);

        assert.equal(haveAttrsOwnProperty('stroke-width'), false);
        assert.equal(haveAttrsOwnProperty('stroke-opacity'), false);
        assert.equal(haveAttrsOwnProperty('stroke'), false);
    });

    QUnit.test('Create labels with styles and invisible borders if border width is 0', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                visible: true,
                border: {
                    visible: true,
                    color: 'white',
                    width: 0,
                    opacity: 0.2
                }
            }
        });
        const attrs = this.label(0).attr.firstCall.args[0];
        const haveAttrsOwnProperty = Object.prototype.hasOwnProperty.bind(attrs);

        assert.equal(haveAttrsOwnProperty('stroke-width'), false);
        assert.equal(haveAttrsOwnProperty('stroke-opacity'), false);
        assert.equal(haveAttrsOwnProperty('stroke'), false);
    });

    QUnit.test('Label color if useNodeColors set to true', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                useNodeColors: true
            }
        });
        const nodes = this.nodes();

        assert.equal(nodes[0].attr.lastCall.args[0].fill, this.label(0).css.firstCall.args[0].fill);
        assert.equal(nodes[1].attr.lastCall.args[0].fill, this.label(1).css.firstCall.args[0].fill);
        assert.equal(nodes[2].attr.lastCall.args[0].fill, this.label(2).css.firstCall.args[0].fill);
    });

    QUnit.test('Labels customize text', function (assert) {

        const customizeText = function (node) {
            return 'test text ' + node.title;
        };

        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                customizeText: customizeText
            }
        });

        assert.equal(this.renderer.text.getCall(0).args[0], 'test text A');
        assert.equal(this.renderer.text.getCall(1).args[0], 'test text B');
        assert.equal(this.renderer.text.getCall(2).args[0], 'test text Z');
    });

    QUnit.test('Labels alignment through cascades', function (assert) {
        createSankey({
            dataSource: [{ source: 'Node 1', target: 'Node 3', weight: 1 }, { source: 'Node 2', target: 'Node 3', weight: 1 }]
        });

        const nodes = this.nodes();

        assert.equal(this.label(0).attr.lastCall.args[0].translateX, 22, 'Alignment in first cascade');
        assert.equal(this.label(1).attr.lastCall.args[0].translateX, 22, 'Alignment in first cascade');
        assert.equal(this.label(2).attr.lastCall.args[0].translateX, 956, 'Alignment in last cascade');

        assert.ok(nodes[0].attr.firstCall.args[0].x < this.label(0).attr.lastCall.args[0].translateX, 'First cascade');
        assert.ok(nodes[1].attr.firstCall.args[0].x < this.label(1).attr.lastCall.args[0].translateX, 'First cascade');
        assert.ok(nodes[2].attr.firstCall.args[0].x > this.label(2).attr.lastCall.args[0].translateX, 'Last cascade');
    });

    QUnit.test('Labels alignment through cascades with rtlEnabled', function (assert) {
        createSankey({
            rtlEnabled: true,
            dataSource: [{ source: 'Node 1', target: 'Node 3', weight: 1 }, { source: 'Node 2', target: 'Node 3', weight: 1 }]
        });

        const nodes = this.nodes();

        assert.equal(this.label(0).attr.lastCall.args[0].translateX, 22, 'Alignment in first cascade');
        assert.equal(this.label(1).attr.lastCall.args[0].translateX, 22, 'Alignment in first cascade');
        assert.equal(this.label(2).attr.lastCall.args[0].translateX, 956, 'Alignment in last cascade');

        assert.ok(nodes[0].attr.firstCall.args[0].x < this.label(0).attr.lastCall.args[0].translateX, 'First cascade');
        assert.ok(nodes[1].attr.firstCall.args[0].x < this.label(1).attr.lastCall.args[0].translateX, 'First cascade');
        assert.ok(nodes[2].attr.firstCall.args[0].x > this.label(2).attr.lastCall.args[0].translateX, 'Last cascade');
    });

    QUnit.test('Labels offsets', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                horizontalOffset: 0,
                verticalOffset: 0
            }
        });

        const x = this.labels().map(function (label) {
            return label.children[0].attr.lastCall.args[0].translateX;
        });
        const y = this.labels().map(function (label) {
            return label.children[0].attr.lastCall.args[0].translateY;
        });

        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                horizontalOffset: 20,
                verticalOffset: 30
            }
        });

        const xOffset = this.labels().map(function (label) {
            return label.children[0].attr.lastCall.args[0].translateX;
        });
        const yOffset = this.labels().map(function (label) {
            return label.children[0].attr.lastCall.args[0].translateY;
        });
        const xDifference = [xOffset[0] - x[0], xOffset[1] - x[1], xOffset[2] - x[2]];
        const yDifference = [yOffset[0] - y[0], yOffset[1] - y[1], yOffset[2] - y[2]];

        assert.deepEqual(xDifference, [20, 20, -20], 'horizontal offset applied'); // labels in last cascade are moved to other side (-10)
        assert.deepEqual(yDifference, [30, 30, 30], 'vertical offset applied');
    });

    // T669620
    QUnit.test('Label drawing on bottom border of widget', function (assert) {
        this.renderer.bBoxTemplate = sinon.stub();
        this.renderer.bBoxTemplate.onCall(7).returns({ x: 1, y: -10, width: 20, height: 10 });
        this.renderer.bBoxTemplate.returns({ x: 1, y: 2, width: 20, height: 10 });

        createSankey({
            dataSource: [{ target: 't1', source: 's1', weight: 20 }, { target: 't2', source: 's1', weight: 30 }, { target: 't3', source: 's1', weight: 0.1 }],
            size: {
                width: 800,
                height: 400
            }
        });

        assert.equal(this.label(3).attr.lastCall.args[0].translateY, 400, 'Alignment of bottom label');
    });

    // T669620
    QUnit.test('Label drawing on top border of widget', function (assert) {
        createSankey({
            dataSource: [{ target: 't3', source: 's1', weight: 0.1 }, { target: 't1', source: 's1', weight: 20 }, { target: 't2', source: 's1', weight: 30 }],
            size: {
                width: 800,
                height: 400
            }
        });

        assert.equal(this.label(1).attr.lastCall.args[0].translateY, -2, 'Alignment of top label');
    });

    QUnit.module('Node labels. Adaptive layout', $.extend({}, environment, {
        beforeEach: function () {
            environment.beforeEach.call(this);
            $('#test-container').css({
                width: 300
            });
        }
    }));

    QUnit.test('Shown labels if container size bigger than adaptiveLayout', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                visible: true
            },
            adaptiveLayout: {
                width: 150,
                keepLabels: false
            }
        });

        assert.ok(this.labelsGroup().clear.called);
        assert.equal(this.labels().length, this.nodes().length);
    });

    QUnit.test('Hide labels if container size smaller than adaptiveLayout', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                visible: true
            },
            adaptiveLayout: {
                width: 600,
                keepLabels: false
            }
        });

        assert.ok(this.labelsGroup().clear.called);
        assert.equal(this.labels().length, 0);
    });

    QUnit.test('Show labels if keepLabels is true and container size is smaller than adaptiveLayout', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                visible: true
            },
            adaptiveLayout: {
                width: 600,
                keepLabels: true
            }
        });

        assert.equal(this.labels().length, 3);
    });

    QUnit.test('Show labels if keepLabels is true and widget size is smaller than adaptiveLayout', function (assert) {
        createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                visible: true
            },
            adaptiveLayout: {
                width: 300,
                keepLabels: true
            },
            size: {
                width: 400
            }
        });

        assert.equal(this.labels().length, 3);
    });

    QUnit.test('Show hidden labels', function (assert) {
        const sankey = createSankey({
            dataSource: [{ source: 'A', target: 'Z', weight: 1 }, { source: 'B', target: 'Z', weight: 1 }],
            label: {
                visible: true
            },
            adaptiveLayout: {
                width: 500,
                keepLabels: false
            }
        });

        sankey.option({
            size: {
                width: 600
            }
        });
        assert.equal(this.labels().length, 3);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","./commonParts/common.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("./commonParts/common.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=sankey.label.tests.js.map