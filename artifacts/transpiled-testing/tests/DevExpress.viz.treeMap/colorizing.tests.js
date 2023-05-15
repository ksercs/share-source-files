!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.treeMap/colorizing.tests.js"], ["./commonParts/common.js","viz/tree_map/colorizing.discrete","viz/tree_map/colorizing.gradient","viz/tree_map/colorizing.range"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.treeMap/colorizing.tests.js', ['./commonParts/common.js', 'viz/tree_map/colorizing.discrete', 'viz/tree_map/colorizing.gradient', 'viz/tree_map/colorizing.range'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const common = $__require('./commonParts/common.js');

    $__require('viz/tree_map/colorizing.discrete');
    $__require('viz/tree_map/colorizing.gradient');
    $__require('viz/tree_map/colorizing.range');

    QUnit.module('Coloring', common.environment);

    QUnit.test('Discrete', function (assert) {
        common.createWidget({
            dataSource: [{
                value: 1
            }, {
                value: 2
            }, {
                value: 3
            }, {
                value: 4
            }, {
                value: 5
            }],
            colorizer: {
                type: 'Discrete',
                palette: ['#020202', '#060606', '#0a0a0a'],
                paletteExtensionMode: 'alternate'
            }
        });

        assert.strictEqual(this.tile(0).attr.getCall(0).args[0].fill, '#020202', 'tile 1');
        assert.strictEqual(this.tile(1).attr.getCall(0).args[0].fill, '#060606', 'tile 2');
        assert.strictEqual(this.tile(2).attr.getCall(0).args[0].fill, '#0a0a0a', 'tile 3');
        assert.strictEqual(this.tile(3).attr.getCall(0).args[0].fill, '#000000', 'tile 4');
        assert.strictEqual(this.tile(4).attr.getCall(0).args[0].fill, '#383838', 'tile 5');
    });

    QUnit.test('Discrete. Pass correct leafs count to palette', function (assert) {
        common.createWidget({
            dataSource: [{
                value: 10,
                items: [{ value: 1 }, { value: 2 }, { value: 3 }]
            }, {
                value: 5,
                items: [{ value: 1 }, { value: 2 }]
            }, {
                value: 3,
                items: [{ value: 1 }]
            }],
            colorizer: {
                type: 'Discrete',
                palette: ['green', 'red']
            }
        });

        assert.strictEqual(this.tile(2).attr.getCall(0).args[0].fill, 'green', 'tile 1');
        assert.strictEqual(this.tile(3).attr.getCall(0).args[0].fill, 'red', 'tile 2');
        assert.strictEqual(this.tile(4).attr.getCall(0).args[0].fill, '#804000', 'tile 3');

        assert.strictEqual(this.tile(7).attr.getCall(0).args[0].fill, 'green', 'tile 4');
        assert.strictEqual(this.tile(8).attr.getCall(0).args[0].fill, 'red', 'tile 5');

        assert.strictEqual(this.tile(11).attr.getCall(0).args[0].fill, 'green', 'tile 6');
    });

    QUnit.test('Gradient', function (assert) {
        common.createWidget({
            dataSource: [{
                value: 1, col: 10
            }, {
                value: 2
            }, {
                value: 3, col: 20
            }, {
                value: 4, col: 30
            }, {
                value: 5, col: 50
            }],
            colorizer: {
                type: 'Gradient',
                palette: ['#020202', '#0a0a0a'],
                range: [0, 40],
                colorCodeField: 'col'
            }
        });

        assert.strictEqual(this.tile(0).attr.getCall(0).args[0].fill, '#040404', 'tile 1');
        assert.strictEqual(this.tile(1).attr.getCall(0).args[0].fill, '#5f8b95', 'tile 2');
        assert.strictEqual(this.tile(2).attr.getCall(0).args[0].fill, '#060606', 'tile 3');
        assert.strictEqual(this.tile(3).attr.getCall(0).args[0].fill, '#080808', 'tile 4');
        assert.strictEqual(this.tile(4).attr.getCall(0).args[0].fill, '#5f8b95', 'tile 5');
    });

    QUnit.test('Gradient without range', function (assert) {
        common.createWidget({
            dataSource: [{
                value: 1, col: 10
            }, {
                value: 2
            }, {
                value: 3, col: 20
            }, {
                col: 50,
                items: [{
                    value: 1, col: 2
                }, {
                    value: 2, col: 10
                }, {
                    value: 3, col: 8
                }]
            }],
            colorizer: {
                type: 'Gradient',
                palette: ['#020202', '#0a0a0a'],
                colorCodeField: 'col'
            }
        });

        assert.strictEqual(this.tile(0).attr.getCall(0).args[0].fill, '#020202', 'tile 1');
        assert.strictEqual(this.tile(1).attr.getCall(0).args[0].fill, '#5f8b95', 'tile 2');
        assert.strictEqual(this.tile(2).attr.getCall(0).args[0].fill, '#040404', 'tile 3');
        assert.strictEqual(this.tile(5).attr.getCall(0).args[0].fill, '#020202', 'tile 4-1');
        assert.strictEqual(this.tile(6).attr.getCall(0).args[0].fill, '#0a0a0a', 'tile 4-2');
        assert.strictEqual(this.tile(7).attr.getCall(0).args[0].fill, '#080808', 'tile 4-3');
    });

    QUnit.test('Range', function (assert) {
        common.createWidget({
            dataSource: [{
                value: 1, col: 10
            }, {
                value: 2, col: 38
            }, {
                value: 3, col: 20
            }, {
                value: 4, col: 30
            }, {
                value: 5, col: 50
            }, {
                value: 6, col: 40
            }],
            colorizer: {
                type: 'Range',
                palette: ['#020202', '#060606', '#080808'],
                range: [0, 20, 35, 40],
                colorCodeField: 'col'
            }
        });

        assert.strictEqual(this.tile(0).attr.getCall(0).args[0].fill, '#020202', 'tile 1');
        assert.strictEqual(this.tile(1).attr.getCall(0).args[0].fill, '#080808', 'tile 2');
        assert.strictEqual(this.tile(2).attr.getCall(0).args[0].fill, '#060606', 'tile 3');
        assert.strictEqual(this.tile(3).attr.getCall(0).args[0].fill, '#060606', 'tile 4');
        assert.strictEqual(this.tile(4).attr.getCall(0).args[0].fill, '#5f8b95', 'tile 5');
        assert.strictEqual(this.tile(5).attr.getCall(0).args[0].fill, '#080808', 'tile 6');
    });

    QUnit.test('Discrete group', function (assert) {
        common.createWidget({
            dataSource: [{ items: [{ value: 1 }, { value: 2 }] }, { items: [{ value: 1 }, { value: 2 }] }],
            colorizer: {
                type: 'Discrete',
                palette: ['#020202', '#060606', '#0a0a0a'],
                colorizeGroups: true,
                paletteExtensionMode: 'alternate'
            }
        });

        assert.strictEqual(this.tile(2).attr.getCall(0).args[0].fill, '#020202', 'tile 1');
        assert.strictEqual(this.tile(3).attr.getCall(0).args[0].fill, '#020202', 'tile 2');
        assert.strictEqual(this.tile(6).attr.getCall(0).args[0].fill, '#060606', 'tile 3');
        assert.strictEqual(this.tile(7).attr.getCall(0).args[0].fill, '#060606', 'tile 4');
    });

    QUnit.test('Discrete group. Pass correct group count to palette', function (assert) {
        common.createWidget({
            dataSource: [{ items: [{ value: 1 }, { value: 2 }] }, { items: [{ value: 1 }, { value: 2 }] }, { items: [{ value: 1 }, { value: 2 }] }],
            colorizer: {
                type: 'Discrete',
                palette: ['red', 'green'],
                colorizeGroups: true
            }
        });

        assert.strictEqual(this.tile(2).attr.getCall(0).args[0].fill, 'red', 'tile 1');
        assert.strictEqual(this.tile(3).attr.getCall(0).args[0].fill, 'red', 'tile 2');
        assert.strictEqual(this.tile(6).attr.getCall(0).args[0].fill, 'green', 'tile 3');
        assert.strictEqual(this.tile(7).attr.getCall(0).args[0].fill, 'green', 'tile 4');
        assert.strictEqual(this.tile(10).attr.getCall(0).args[0].fill, '#804000', 'tile 5');
        assert.strictEqual(this.tile(11).attr.getCall(0).args[0].fill, '#804000', 'tile 6');
    });

    QUnit.test('Gradient group', function (assert) {
        common.createWidget({
            dataSource: [{
                col: 1,
                items: [{ value: 1, col: 5 }, { value: 2, col: 3 }]
            }, {
                col: 3,
                value: 5
            }, {
                col: 5,
                items: [{ value: 1, col: 1 }]
            }],
            tile: {
                color: 'grey'
            },
            colorizer: {
                type: 'Gradient',
                palette: ['#020202', '#040404'],
                range: [1, 5],
                colorCodeField: 'col',
                colorizeGroups: true
            }
        });

        assert.strictEqual(this.tile(2).attr.getCall(0).args[0].fill, '#020202', 'tile 1-1');
        assert.strictEqual(this.tile(3).attr.getCall(0).args[0].fill, '#020202', 'tile 1-2');
        assert.strictEqual(this.tile(4).attr.getCall(0).args[0].fill, 'grey', 'tile 2');
        assert.strictEqual(this.tile(7).attr.getCall(0).args[0].fill, '#040404', 'tile 3-1');
    });

    QUnit.test('Range group', function (assert) {
        common.createWidget({
            dataSource: [{
                col: 1,
                items: [{ value: 1, col: 5 }, { value: 2, col: 3 }]
            }, {
                col: 3,
                value: 5
            }, {
                col: 5,
                items: [{ value: 1, col: 1 }]
            }],
            tile: {
                color: 'grey'
            },
            colorizer: {
                type: 'Range',
                palette: ['#020202', '#040404'],
                range: [0, 3, 5],
                colorCodeField: 'col',
                colorizeGroups: true
            }
        });

        assert.strictEqual(this.tile(2).attr.getCall(0).args[0].fill, '#020202', 'tile 1-1');
        assert.strictEqual(this.tile(3).attr.getCall(0).args[0].fill, '#020202', 'tile 1-2');
        assert.strictEqual(this.tile(4).attr.getCall(0).args[0].fill, 'grey', 'tile 2');
        assert.strictEqual(this.tile(7).attr.getCall(0).args[0].fill, '#040404', 'tile 3-1');
    });

    QUnit.test('Complex discrete group', function (assert) {
        common.createWidget({
            dataSource: [{
                items: [{
                    value: 1
                }, {
                    items: [{
                        value: 2
                    }, {
                        value: 3
                    }]
                }]
            }, {
                value: 4
            }, {
                items: [{
                    items: [{
                        value: 5
                    }, {
                        value: 6
                    }]
                }, {
                    value: 7
                }]
            }],
            colorizer: {
                colorizeGroups: true,
                palette: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'],
                paletteExtensionMode: 'alternate'
            }
        });

        assert.strictEqual(this.tile(2).attr.getCall(0).args[0].fill, 'c2', 'tile 1-2');
        assert.strictEqual(this.tile(5).attr.getCall(0).args[0].fill, 'c4', 'tile 1-2-1');
        assert.strictEqual(this.tile(6).attr.getCall(0).args[0].fill, 'c4', 'tile 1-2-2');
        assert.strictEqual(this.tile(7).attr.getCall(0).args[0].fill, 'c1', 'tile 2');
        assert.strictEqual(this.tile(12).attr.getCall(0).args[0].fill, 'c5', 'tile 3-1-1');
        assert.strictEqual(this.tile(13).attr.getCall(0).args[0].fill, 'c5', 'tile 3-1-2');
        assert.strictEqual(this.tile(14).attr.getCall(0).args[0].fill, 'c3', 'tile 3-2');
    });

    QUnit.test('Using value as color code', function (assert) {
        common.createWidget({
            dataSource: [{
                val: 1
            }, {
                val: 2
            }, {
                val: 3
            }],
            valueField: 'val',
            colorizer: {
                type: 'gradient',
                palette: ['#020202', '#040404'],
                range: [1, 3]
            }
        });

        assert.strictEqual(this.tile(0).attr.getCall(0).args[0].fill, '#020202', 'tile 1');
        assert.strictEqual(this.tile(1).attr.getCall(0).args[0].fill, '#030303', 'tile 2');
        assert.strictEqual(this.tile(2).attr.getCall(0).args[0].fill, '#040404', 'tile 3');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./commonParts/common.js","viz/tree_map/colorizing.discrete","viz/tree_map/colorizing.gradient","viz/tree_map/colorizing.range"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./commonParts/common.js"), require("viz/tree_map/colorizing.discrete"), require("viz/tree_map/colorizing.gradient"), require("viz/tree_map/colorizing.range"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=colorizing.tests.js.map