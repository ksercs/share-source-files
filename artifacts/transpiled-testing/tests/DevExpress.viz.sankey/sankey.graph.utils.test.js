!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.sankey/sankey.graph.utils.test.js"], ["viz/sankey/graph","./commonParts/common.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.sankey/sankey.graph.utils.test.js', ['viz/sankey/graph', './commonParts/common.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const logicModule = $__require('viz/sankey/graph');
    const common = $__require('./commonParts/common.js');
    const environment = common.environment;

    const noCycle0 = [['A', 'B', 2], ['B', 'C', 2], ['C', 'D', 2], ['D', 'F', 2]];
    const noCycle1 = [['A', 'B', 2], ['B', 'C1', 2], ['B', 'C2', 2], ['C1', 'D', 2], ['C2', 'D', 2], ['D', 'F', 2]];
    const noCycle2 = [['A', 'X', 2], ['A', 'Y', 1], ['A', 'Z', 3], ['B', 'X', 5], ['B', 'Z', 2], ['C', 'Z', 1], ['C', 'N', 1], ['C', 'M', 1], ['B', 'M', 2], ['M', 'X', 2], ['M', 'Y', 2], ['N', 'X', 4], ['N', 'Y', 3]];
    const noCycle3 = [['A', 'B', 2], ['A', 'C', 1], ['A', 'D', 3], ['A', 'E', 5], ['B', 'D', 2], ['C', 'D', 1], ['C', 'E', 1], ['D', 'E', 1]];

    const cycle1 = [['A', 'B', 2], ['B', 'C', 2], ['C', 'A', 2]];
    const cycle2 = [['A', 'B', 2], ['B', 'C1', 2], ['B', 'C2', 2], ['C1', 'D', 2], ['C2', 'D', 2], ['D', 'A', 2]];
    const cycle3 = [['A', 'B', 2], ['B', 'C1', 2], ['C1', 'D', 2], ['C1', 'A', 2], ['D', 'F', 2]];
    const cycle4 = [['A', 'B', 1], ['B', 'C', 1], ['C', 'D', 1], ['D', 'E', 1], ['E', 'F', 1], ['C', 'C1', 1], ['C1', 'C2', 1], ['C2', 'B', 1]];
    const cycle5 = [['A', 'X', 1], ['A', 'Y', 1], ['A', 'M', 1], ['A', 'N', 1], ['N', 'X', 1], ['M', 'X', 1], ['N', 'Y', 1], ['M', 'Y', 1], ['N', 'A', 1]];

    QUnit.module('Graph utils', environment);

    QUnit.test('Vertices extracting from links', function (assert) {
        let links = [['A', 'B', 2], ['B', 'C', 2]];
        let vertices = logicModule.getVertices(links);
        assert.deepEqual(['A', 'B', 'C'], vertices);

        links = [['A', 'B', 2]];
        vertices = logicModule.getVertices(links);
        assert.deepEqual(['A', 'B'], vertices);

        links = [['A', 'B', 2], ['B', 'C', 2], ['C', 'A', 2]];
        vertices = logicModule.getVertices(links);
        assert.deepEqual(['A', 'B', 'C'], vertices);

        links = [['A', 'B', 2], ['B', 'C', 2], ['C', 'D', 2]];
        vertices = logicModule.getVertices(links);
        assert.deepEqual(['A', 'B', 'C', 'D'], vertices);

        links = [['A', 'B', 2], ['B', 'A', 2]];
        vertices = logicModule.getVertices(links);
        assert.deepEqual(['A', 'B'], vertices);
    });

    QUnit.test('Adjacent vertices extracting from links', function (assert) {
        let links = [['A', 'B', 2], ['B', 'C', 2], ['C', 'D', 2]];
        let vertices = logicModule.getAdjacentVertices(links, 'A');

        assert.deepEqual(['B'], vertices);

        links = [['A', 'B', 2], ['B', 'C', 2], ['C', 'D', 2]];
        vertices = logicModule.getAdjacentVertices(links, 'B');
        assert.deepEqual(['C'], vertices);

        links = [['A', 'B', 2], ['A', 'C', 2], ['A', 'D', 2]];
        vertices = logicModule.getAdjacentVertices(links, 'A');
        assert.deepEqual(['B', 'C', 'D'], vertices);

        vertices = logicModule.getAdjacentVertices([['A', 'X', 1], ['A', 'Y', 1], ['A', 'M', 1], ['A', 'N', 1], ['N', 'X', 1], ['M', 'X', 1], ['N', 'Y', 1], ['M', 'Y', 1], ['N', 'A', 1]], 'N');
        assert.deepEqual(['X', 'Y', 'A'], vertices);
    });

    QUnit.test('Reverse adjacent vertices extracting from links', function (assert) {
        let links = [['A', 'B', 2], ['B', 'C', 2], ['C', 'D', 2]];
        let vertices = logicModule.getReverseAdjacentVertices(links, 'A');

        assert.deepEqual([], vertices);

        links = [['A', 'B', 2], ['B', 'C', 2], ['C', 'D', 2]];
        vertices = logicModule.getReverseAdjacentVertices(links, 'B');
        assert.deepEqual(['A'], vertices);

        links = [['A', 'Z', 2], ['B', 'Z', 2], ['C', 'Z', 2]];
        vertices = logicModule.getReverseAdjacentVertices(links, 'Z');
        assert.deepEqual(['A', 'B', 'C'], vertices);

        vertices = logicModule.getReverseAdjacentVertices([['A', 'X', 1], ['A', 'Y', 1], ['A', 'M', 1], ['A', 'N', 1], ['N', 'X', 1], ['M', 'X', 1], ['N', 'Y', 1], ['M', 'Y', 1], ['N', 'A', 1]], 'N');
        assert.deepEqual(['A'], vertices);
    });

    QUnit.test('Cycle detection', function (assert) {
        assert.equal(logicModule.struct.hasCycle(noCycle1), false);
        assert.equal(logicModule.struct.hasCycle(noCycle2), false);
        assert.equal(logicModule.struct.hasCycle(noCycle3), false);

        assert.equal(logicModule.struct.hasCycle(cycle1), true);
        assert.equal(logicModule.struct.hasCycle(cycle2), true);
        assert.equal(logicModule.struct.hasCycle(cycle3), true);
        assert.equal(logicModule.struct.hasCycle(cycle4), true);
        assert.equal(logicModule.struct.hasCycle(cycle5), true);
    });

    QUnit.test('maxOfArray, no callback', function (assert) {
        assert.equal(logicModule.routines.maxOfArray([5, 7, 1, 9, 8, 2, 3]), 9);
        assert.equal(logicModule.routines.maxOfArray([5]), 5);
    });

    QUnit.test('maxOfArray, callback', function (assert) {
        assert.deepEqual(logicModule.routines.maxOfArray([{ val: 5 }, { val: 7 }, { val: 1 }, { val: 9 }, { val: 8 }, { val: 2 }, { val: 3 }], function (item) {
            return item.val;
        }), 9);
    });

    QUnit.test('Toposort and computing longest paths in graph', function (assert) {
        let vertices;
        let expected;

        logicModule.struct.hasCycle(noCycle0);
        vertices = logicModule.struct.computeLongestPaths(noCycle0);
        expected = { A: 0, B: 1, C: 2, D: 3, F: 4 };
        assert.deepEqual(vertices.length, 5);
        vertices.forEach(function (vertex) {
            assert.equal(vertex.lp, expected[vertex.name]);
        });

        logicModule.struct.hasCycle(noCycle1);
        vertices = logicModule.struct.computeLongestPaths(noCycle1);
        expected = { A: 0, B: 1, C1: 2, C2: 2, D: 3, F: 4 };
        assert.deepEqual(vertices.length, 6);
        vertices.forEach(function (vertex) {
            assert.equal(vertex.lp, expected[vertex.name]);
        });

        logicModule.struct.hasCycle(noCycle2);
        vertices = logicModule.struct.computeLongestPaths(noCycle2);
        expected = { A: 0, B: 0, C: 0, M: 1, N: 1, X: 2, Y: 2, Z: 1 };
        assert.deepEqual(vertices.length, 8);
        vertices.forEach(function (vertex) {
            assert.equal(vertex.lp, expected[vertex.name]);
        });
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["viz/sankey/graph","./commonParts/common.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("viz/sankey/graph"), require("./commonParts/common.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=sankey.graph.utils.test.js.map