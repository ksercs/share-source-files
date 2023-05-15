!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.treeMap/tiling.tests.js"], ["./commonParts/common.js","jquery","viz/tree_map/tiling.squarified","viz/tree_map/tiling.strip","viz/tree_map/tiling.slice_and_dice","viz/tree_map/tiling.rotated_slice_and_dice"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.treeMap/tiling.tests.js', ['./commonParts/common.js', 'jquery', 'viz/tree_map/tiling.squarified', 'viz/tree_map/tiling.strip', 'viz/tree_map/tiling.slice_and_dice', 'viz/tree_map/tiling.rotated_slice_and_dice'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const common = $__require('./commonParts/common.js');
    const $ = $__require('jquery');
    const environment = {
        beforeEach: common.environment.beforeEach,

        create: function (options) {
            return common.createWidget($.extend(true, {
                tile: {
                    border: {
                        width: 0
                    }
                },
                group: {
                    padding: 0,
                    border: { width: 0 }
                }
            }, options));
        },

        checkLayout: function (assert, expected) {
            const tiles = this.renderer.simpleRect.returnValues;
            $.each(expected, function (i, data) {
                assert.checkTile(tiles[i].attr.lastCall.args[0], data, 'tile ' + i);
            });
        }
    };

    $__require('viz/tree_map/tiling.squarified');
    $__require('viz/tree_map/tiling.strip');
    $__require('viz/tree_map/tiling.slice_and_dice');
    $__require('viz/tree_map/tiling.rotated_slice_and_dice');

    QUnit.module('Algorithms', environment);

    QUnit.test('Squarified', function (assert) {
        this.create({
            dataSource: [{
                value: 4
            }, {
                value: 2
            }, {
                value: 6
            }, {
                value: 3
            }, {
                value: 2
            }, {
                value: 6
            }, {
                value: 1
            }]
        });

        this.checkLayout(assert, [[300, 0, 471, 233], [300, 233, 420, 400], [0, 0, 300, 200], [471, 0, 600, 233], [420, 233, 540, 400], [0, 200, 300, 400], [540, 233, 600, 400]]);
    });

    QUnit.test('Squarified / marginal case when available space is empty', function (assert) {
        this.create({
            dataSource: [{
                value: 1000
            }, {
                value: 0.001
            }, {
                value: 0.001
            }]
        });

        this.checkLayout(assert, [[0, 0, 600, 400], [600, 0, 600, 400], [600, 0, 600, 400]]);
    });

    QUnit.test('Squarified / some values are zeros', function (assert) {
        this.create({
            dataSource: [{
                value: 1
            }, {}, {
                value: 2
            }, {}]
        });

        this.checkLayout(assert, [[400, 0, 600, 400], [400, 400, 600, 400], [0, 0, 400, 400], [400, 400, 600, 400]]);
    });

    QUnit.test('Strip', function (assert) {
        this.create({
            layoutAlgorithm: 'strip',
            dataSource: [{
                value: 4
            }, {
                value: 2
            }, {
                value: 6
            }, {
                value: 3
            }, {
                value: 2
            }, {
                value: 6
            }, {
                value: 1
            }]
        });

        this.checkLayout(assert, [[300, 0, 475, 229], [475, 0, 600, 160], [0, 0, 300, 200], [300, 229, 475, 400], [475, 160, 600, 320], [0, 200, 300, 400], [475, 320, 600, 400]]);
    });

    QUnit.test('Strip / some values are zeros', function (assert) {
        this.create({
            layoutAlgorithm: 'strip',
            dataSource: [{
                value: 1
            }, {}, {
                value: 2
            }, {}]
        });

        this.checkLayout(assert, [[400, 0, 600, 400], [600, 0, 600, 0], [0, 0, 400, 400], [600, 0, 600, 0]]);
    });

    QUnit.test('Custom', function (assert) {
        this.create({
            layoutAlgorithm: function (data) {
                const y1 = data.rect[1] + 100;
                const y2 = data.rect[3] - 100;
                let x = data.rect[0];
                const delta = data.rect[2] - data.rect[0];
                $.each(data.items, function (_, item) {
                    item.rect = [x, y1, x += delta * item.value / data.sum, y2];
                });
            },
            dataSource: [{
                value: 4
            }, {
                value: 2
            }, {
                value: 6
            }, {
                value: 3
            }, {
                value: 2
            }, {
                value: 6
            }, {
                value: 1
            }]
        });

        this.checkLayout(assert, [[0, 100, 100, 300], [100, 100, 150, 300], [150, 100, 300, 300], [300, 100, 375, 300], [375, 100, 425, 300], [425, 100, 575, 300], [575, 100, 600, 300]]);
    });

    QUnit.test('Slice & dice algorithm. one level', function (assert) {
        this.create({
            layoutAlgorithm: 'sliceAndDice',
            dataSource: [{ value: 1 }, { value: 2 }, { value: 2 }]
        });

        this.checkLayout(assert, [[0, 0, 120, 400], [120, 0, 360, 400], [360, 0, 600, 400]]);
    });

    QUnit.test('slice and dice algorithm. multiple levels 1', function (assert) {
        this.create({
            layoutAlgorithm: 'sliceAndDice',
            dataSource: [{
                value: 6
            }, {
                value: 2
            }, {
                items: [{
                    value: 4
                }, {
                    value: 4
                }]
            }],
            group: {
                headerHeight: 0
            }
        });

        this.checkLayout(assert, [[0, 0, 225, 400], [225, 0, 300, 400], [300, 0, 600, 400], [300, 0, 600, 0], [300, 0, 600, 200], [300, 200, 600, 400]]);
    });

    QUnit.test('slice and dice algorithm. multiple levels 2', function (assert) {
        this.create({
            layoutAlgorithm: 'sliceAndDice',
            dataSource: [{
                value: 2
            }, {
                items: [{
                    value: 2
                }, {
                    items: [{
                        value: 1
                    }, {
                        value: 3
                    }]
                }]
            }],
            group: {
                headerHeight: 0
            }
        });

        this.checkLayout(assert, [[0, 0, 150, 400], [150, 0, 600, 400], [150, 0, 600, 0], [150, 0, 600, 133], [150, 133, 600, 400], [150, 133, 600, 133], [150, 133, 263, 400], [263, 133, 600, 400]]);
    });

    QUnit.test('Slice and dice / some values are zeros', function (assert) {
        this.create({
            layoutAlgorithm: 'sliceanddice',
            dataSource: [{
                value: 1
            }, {}, {
                value: 2
            }, {}]
        });

        this.checkLayout(assert, [[0, 0, 200, 400], [200, 0, 200, 400], [200, 0, 600, 400], [600, 0, 600, 400]]);
    });

    QUnit.test('Rotated sliceAndDice', function (assert) {
        this.create({
            layoutAlgorithm: 'rotatedSliceAndDice',
            dataSource: [{ name: 'item_1', value: 2 }, { name: 'item_2', value: 3 }]
        });

        this.checkLayout(assert, [[0, 0, 600, 160], [0, 160, 600, 400]]);
    });

    QUnit.module('algorithmDirections', environment);

    QUnit.test('leftBottomRightTop', function (assert) {
        this.create({
            size: { width: 100, height: 100 },
            dataSource: [{ value: 10 }, { value: 7 }, { value: 3 }],
            layoutDirection: 'leftBottomRightTop'
        });

        this.checkLayout(assert, [[0, 0, 50, 100], [50, 30, 100, 100], [50, 0, 100, 30]]);
    });

    QUnit.test('rightBottomLeftTop', function (assert) {
        this.create({
            size: { width: 100, height: 100 },
            dataSource: [{ value: 10 }, { value: 7 }, { value: 3 }],
            layoutDirection: 'rightBottomLeftTop'
        });

        this.checkLayout(assert, [[50, 0, 100, 100], [0, 30, 50, 100], [0, 0, 50, 30]]);
    });

    QUnit.test('rightTopLeftBottom', function (assert) {
        this.create({
            size: { width: 100, height: 100 },
            dataSource: [{ value: 10 }, { value: 7 }, { value: 3 }],
            layoutDirection: 'rightTopLeftBottom'
        });

        this.checkLayout(assert, [[50, 0, 100, 100], [0, 0, 50, 70], [0, 70, 50, 100]]);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./commonParts/common.js","jquery","viz/tree_map/tiling.squarified","viz/tree_map/tiling.strip","viz/tree_map/tiling.slice_and_dice","viz/tree_map/tiling.rotated_slice_and_dice"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./commonParts/common.js"), require("jquery"), require("viz/tree_map/tiling.squarified"), require("viz/tree_map/tiling.strip"), require("viz/tree_map/tiling.slice_and_dice"), require("viz/tree_map/tiling.rotated_slice_and_dice"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tiling.tests.js.map