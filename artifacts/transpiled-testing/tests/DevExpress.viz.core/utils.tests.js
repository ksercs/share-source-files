!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core/utils.tests.js"], ["viz/core/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.core/utils.tests.js', ['viz/core/utils'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const utils = $__require('viz/core/utils');

    QUnit.module('decreaseGaps', {
        beforeEach: function () {
            this.decreaseGaps = utils.decreaseGaps;
        }
    });

    QUnit.test('decrease one value', function (assert) {
        const margin = { top: 10 };
        const decrease = this.decreaseGaps(margin, ['top'], 7);

        assert.equal(margin.top, 3);
        assert.equal(decrease, 0);
    });

    QUnit.test('decrease two value', function (assert) {
        const margin = { top: 10, bottom: 10 };
        const decrease = this.decreaseGaps(margin, ['top', 'bottom'], 8);

        assert.equal(margin.top, 6);
        assert.equal(margin.bottom, 6);
        assert.equal(decrease, 0);
    });

    QUnit.test('One value zero', function (assert) {
        const margin = { top: 10, bottom: 0 };
        const decrease = this.decreaseGaps(margin, ['top', 'bottom'], 2);

        assert.equal(margin.top, 8);
        assert.equal(margin.bottom, 0);
        assert.equal(decrease, 0);
    });

    QUnit.test('One value less decrease value', function (assert) {
        const margin = { top: 10, bottom: 1 };
        const decrease = this.decreaseGaps(margin, ['top', 'bottom'], 3);

        assert.equal(margin.top, 8);
        assert.equal(margin.bottom, 0);
        assert.equal(decrease, 0);
    });

    QUnit.test('Sum margin less decrease', function (assert) {
        const margin = { top: 5, bottom: 12 };
        const decrease = this.decreaseGaps(margin, ['top', 'bottom'], 30);

        assert.equal(margin.top, 0);
        assert.equal(margin.bottom, 0);
        assert.equal(decrease, 13);
    });

    QUnit.test('three value', function (assert) {
        const margin = { top: 5, bottom: 12, left: 30 };
        const decrease = this.decreaseGaps(margin, ['top', 'bottom', 'left'], 30);

        assert.equal(margin.top, 0);
        assert.equal(margin.bottom, 0);
        assert.equal(margin.left, 17);
        assert.equal(decrease, 0);
    });

    QUnit.test('value round', function (assert) {
        const margin = { top: 10, bottom: 10 };
        const decrease = this.decreaseGaps(margin, ['top', 'bottom'], 5);

        assert.equal(margin.top, 7);
        assert.equal(margin.bottom, 7);
        assert.equal(decrease, -1);
    });

    QUnit.module('Other');

    QUnit.test('parseScalar', function (assert) {
        assert.strictEqual(utils.parseScalar(undefined, 0), 0);
        assert.strictEqual(utils.parseScalar(undefined, true), true);
        assert.strictEqual(utils.parseScalar(null, true), null);
        assert.strictEqual(utils.parseScalar(1, 'a'), 1);
    });

    QUnit.test('enumParser', function (assert) {
        const parser = utils.enumParser(['one', 'Two', 'THREE']);
        assert.strictEqual(parser('ONE', 'four'), 'one', 'ONE');
        assert.strictEqual(parser('ONE1', 'four'), 'four', 'ONE1');
        assert.strictEqual(parser('thREE', 'four'), 'three', 'thREE');
    });

    QUnit.test('convertPolarToXY', function (assert) {
        assert.deepEqual(utils.convertPolarToXY({ x: 0, y: 0 }, 0, 10, 20), { x: 3, y: -20 });
        assert.deepEqual(utils.convertPolarToXY({ x: 10, y: 20 }, 20, 10, 20), { x: 20, y: 3 });
        assert.deepEqual(utils.convertPolarToXY({ x: 0, y: 0 }, 40, 100, 250), { x: 161, y: 192 });
        assert.deepEqual(utils.convertPolarToXY({ x: 10, y: 20 }, 90, 100, 250), { x: -33, y: 266 });
    });

    QUnit.test('convertXYToPolar', function (assert) {
        assert.deepEqual(utils.convertXYToPolar({ x: 0, y: 0 }, 10, 20), { phi: 63, r: 22 });
        assert.deepEqual(utils.convertXYToPolar({ x: 10, y: 20 }, 10, 20), { phi: 0, r: 0 });
        assert.deepEqual(utils.convertXYToPolar({ x: 0, y: 0 }, 100, 200), { phi: 63, r: 224 });
        assert.deepEqual(utils.convertXYToPolar({ x: 10, y: 20 }, 100, 200), { phi: 63, r: 201 });
    });

    QUnit.test('map', function (assert) {
        function check(array, callback, expected, messages) {
            assert.deepEqual(utils.map(array, callback), expected, messages);
        }

        check([], function (el, i) {
            return el * i + 2;
        }, [], 'empty array');
        check([1, 2, 3], function (el, i) {
            return el * i + 2;
        }, [2, 4, 8], 'non-empty array');
        check([1, 2, 3, 4, 5, 6], function (el) {
            return el % 2 ? el : null;
        }, [1, 3, 5], 'callback w/ null');
        check([1, 2, 3, 4, 5, 6], function (el) {
            return el % 2 ? el : undefined;
        }, [1, undefined, 3, undefined, 5, undefined], 'callback w/ undefined');
    });

    QUnit.test('unique', function (assert) {
        assert.deepEqual(utils.unique([1, 2, 3, 4, 5, 5, 6, 7, 6, 2, 8, 9, 1, 3, 1]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    QUnit.module('Patch font options');

    QUnit.test('Param is empty/undefined', function (assert) {
        assert.deepEqual(utils.patchFontOptions(), {});
        assert.deepEqual(utils.patchFontOptions({}), {});
    });

    QUnit.test('Check options are processed', function (assert) {
        const options = { font: { size: 14, family: 'FontFamily', weight: 300, color: 'red' } };

        const fontOptions = utils.patchFontOptions(options.font);

        assert.deepEqual(options.font, { size: 14, family: 'FontFamily', weight: 300, color: 'red' });

        assert.deepEqual(fontOptions, {
            'font-size': 14,
            'font-family': 'FontFamily',
            'font-weight': 300,
            fill: 'red'
        });
    });

    QUnit.test('Check exceptions', function (assert) {
        const options = { font: { color: '#767676', cursor: 'default', opacity: 0.3, size: 14 } };

        const fontOptions = utils.patchFontOptions(options.font);

        assert.deepEqual(options.font, { color: '#767676', cursor: 'default', opacity: 0.3, size: 14 });

        assert.deepEqual(fontOptions, {
            'font-size': 14,
            fill: 'rgba(118,118,118,0.3)',
            cursor: 'default',
            opacity: null
        });
    });

    QUnit.module('utils graphic', {
        beforeEach: function () {
            this.categories = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'];
        },

        afterEach: function () {
            this.categories = null;
        },

        getMockRenderer: function (elem) {
            return {
                root: {
                    element: elem
                }
            };
        }
    });

    QUnit.test('getCategoriesInfo. Empty categories', function (assert) {
        // arrange,act
        const info = utils.getCategoriesInfo([]);

        // assert
        assert.deepEqual(info, {
            categories: []
        });
    });

    QUnit.test('getCategoriesInfo (no inverted)', function (assert) {
        // arrange,act
        const info = utils.getCategoriesInfo(this.categories, 'a3', 'a5');

        // assert
        assert.deepEqual(info, {
            start: 'a3',
            end: 'a5',
            inverted: false,
            categories: ['a3', 'a4', 'a5']
        });
    });

    QUnit.test('getCategoriesInfo (inverted)', function (assert) {
        // arrange,act
        const info = utils.getCategoriesInfo(this.categories, 'a5', 'a3');

        // assert
        assert.deepEqual(info, {
            start: 'a5',
            end: 'a3',
            inverted: true,
            categories: ['a3', 'a4', 'a5']
        });
    });

    QUnit.test('getCategoriesInfo. start categories is not set', function (assert) {
        // arrange,act
        const info = utils.getCategoriesInfo(this.categories, undefined, 'a3');

        // assert
        assert.deepEqual(info, {
            categories: ['a1', 'a2', 'a3'],
            end: 'a3',
            start: 'a1',
            inverted: false
        });
    });

    QUnit.test('getCategoriesInfo. end categories is not set', function (assert) {
        // arrange,act
        const info = utils.getCategoriesInfo(this.categories, 'a3', undefined);

        // assert
        assert.deepEqual(info, {
            categories: ['a3', 'a4', 'a5', 'a6', 'a7'],
            start: 'a3',
            end: 'a7',
            inverted: false
        });
    });

    QUnit.test('getCategoriesInfo. categories is not contains start categories', function (assert) {
        // arrange,act
        const info = utils.getCategoriesInfo(this.categories, 'someCategories', 'a3');

        // assert
        assert.deepEqual(info, {
            categories: ['a1', 'a2', 'a3'],
            end: 'a3',
            start: 'a1',
            inverted: false
        });
    });

    QUnit.test('getCategoriesInfo. categories is not contains end categories', function (assert) {
        // arrange,act
        const info = utils.getCategoriesInfo(this.categories, 'a5', 'someCategories');

        // assert
        assert.deepEqual(info, {
            categories: ['a5', 'a6', 'a7'],
            end: 'a7',
            start: 'a5',
            inverted: false
        });
    });

    QUnit.module('Layout canvas utils', {
        beforeEach: function () {
            this.canvas = {
                width: 1000,
                height: 400,
                top: 10,
                bottom: 20,
                left: 30,
                right: 40
            };
        }
    });

    QUnit.test('Normalize pane weight', function (assert) {
        const defSingle = [{ name: 'default' }];
        utils.normalizePanesHeight(defSingle);

        assert.deepEqual(defSingle, [{
            name: 'default',
            height: 1,
            unit: 0
        }], 'Default for single pane');

        const defFew = [{ name: 'default1' }, { name: 'default2' }];
        utils.normalizePanesHeight(defFew);

        assert.deepEqual(defFew, [{
            name: 'default1',
            height: 0.5,
            unit: 0
        }, {
            name: 'default2',
            height: 0.5,
            unit: 0
        }], 'Default for a few panes');

        const simpleMultiPane = [{ name: 'pane1', height: 0.6 }, { name: 'pane2' }, { name: 'pane3' }];
        utils.normalizePanesHeight(simpleMultiPane);

        assert.deepEqual(simpleMultiPane, [{
            name: 'pane1',
            height: 0.6,
            unit: 0
        }, {
            name: 'pane2',
            height: 0.2,
            unit: 0
        }, {
            name: 'pane3',
            height: 0.2,
            unit: 0
        }], 'Simple multipane (with unknown weight)');

        const incorrectMultiPane = [{ name: 'pane1', height: 'abc' }, { name: 'pane2', height: -150 }];
        utils.normalizePanesHeight(incorrectMultiPane);

        assert.deepEqual(incorrectMultiPane, [{
            name: 'pane1',
            height: 0.5,
            unit: 0
        }, {
            name: 'pane2',
            height: 0.5,
            unit: 0
        }], 'Simple multipane (with incorrect weight/height)');

        const underWeightMultiPane = [{ name: 'pane1', height: 0.2 }, { name: 'pane2', height: 0.3 }];
        utils.normalizePanesHeight(underWeightMultiPane);

        assert.deepEqual(underWeightMultiPane, [{
            name: 'pane1',
            height: 0.4,
            unit: 0
        }, {
            name: 'pane2',
            height: 0.6,
            unit: 0
        }], 'Underweight of pane height');

        const overWeightMultiPane = [{ name: 'pane1', height: 0.4 }, { name: 'pane2', height: 0.4 }, { name: 'pane3' }, { name: 'pane4', height: 0.4 }];
        utils.normalizePanesHeight(overWeightMultiPane);

        assert.deepEqual(overWeightMultiPane, [{
            name: 'pane1',
            height: 0.25,
            unit: 0
        }, {
            name: 'pane2',
            height: 0.25,
            unit: 0
        }, {
            name: 'pane3',
            height: 0.25,
            unit: 0
        }, {
            name: 'pane4',
            height: 0.25,
            unit: 0
        }], 'Overweight of pane height (with unknown weight)');
    });

    QUnit.test('Normalize pane weight (percentages)', function (assert) {
        const simple = [{ name: 'perc', height: '60%' }, { name: 'pane' }];
        utils.normalizePanesHeight(simple);

        assert.deepEqual(simple, [{
            name: 'perc',
            height: 0.6,
            unit: 2
        }, {
            name: 'pane',
            height: 0.4,
            unit: 0
        }], 'Simple example');

        const overWeight = [{ name: 'perc', height: '60%' }, { name: 'over', height: '140%' }];
        utils.normalizePanesHeight(overWeight);

        assert.deepEqual(overWeight, [{
            name: 'perc',
            height: 0.3,
            unit: 2
        }, {
            name: 'over',
            height: 0.7,
            unit: 2
        }], 'Overweight of pane height');
    });

    QUnit.test('Normalize pane height (pixels)', function (assert) {
        const panes = [{ name: 'pane1', height: 300 }, { name: 'pane2', height: '400px' }];
        utils.normalizePanesHeight(panes);

        assert.deepEqual(panes, [{
            name: 'pane1',
            height: 300,
            unit: 1
        }, {
            name: 'pane2',
            height: 400,
            unit: 1
        }]);
    });

    QUnit.test('setCanvasValues', function (assert) {
        const canvas = { top: 11, bottom: 22, left: 33, right: 44 };

        utils.setCanvasValues(canvas);

        assert.equal(canvas.top, 11);
        assert.equal(canvas.bottom, 22);
        assert.equal(canvas.left, 33);
        assert.equal(canvas.right, 44);
        assert.equal(canvas.originalTop, 11);
        assert.equal(canvas.originalBottom, 22);
        assert.equal(canvas.originalLeft, 33);
        assert.equal(canvas.originalRight, 44);
    });

    QUnit.test('Single pane - main case (no specific options provided)', function (assert) {
        const pane = { name: 'default' };

        utils.setCanvasValues(this.canvas);
        utils.normalizePanesHeight([pane]);
        utils.updatePanesCanvases([pane], this.canvas);

        assert.ok(pane.canvas, 'Canvas added to pane');
        assert.notEqual(this.canvas, pane.canvas, 'Pane canvas should not reference the main object in memory');

        assert.strictEqual(this.canvas.left, 30, 'No change of main canvas on left margin');
        assert.strictEqual(this.canvas.right, 40, 'No change of main canvas  on right margin');
        assert.strictEqual(this.canvas.top, 10, 'No change of main canvas on top margin');
        assert.strictEqual(this.canvas.bottom, 20, 'No change of main canvas on bottom margin');

        assert.strictEqual(pane.canvas.left, this.canvas.left, 'Pane Canvas Left margin should be equal to main canvas');
        assert.strictEqual(pane.canvas.right, this.canvas.right, 'Pane Canvas Right margin should be equal to main canvas');
        assert.strictEqual(pane.canvas.top, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(pane.canvas.bottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');

        assert.strictEqual(pane.canvas.originalLeft, this.canvas.left, 'Pane Canvas Left margin should be equal to main canvas');
        assert.strictEqual(pane.canvas.originalRight, this.canvas.right, 'Pane Canvas Right margin should be equal to main canvas');
        assert.strictEqual(pane.canvas.originalTop, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(pane.canvas.originalBottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');
    });

    QUnit.test('Two equal panes - vertical alignment', function (assert) {
        const topPane = {
            name: 'topPane'
        };
        const bottomPane = {
            name: 'bottomPane'
        };
        const chartCanvasHeight = this.canvas.height - this.canvas.top - this.canvas.bottom;
        const panePadding = 10;
        const expectedPaneHeight = (chartCanvasHeight - panePadding) / 2;

        utils.setCanvasValues(this.canvas);
        utils.normalizePanesHeight([topPane, bottomPane]);
        utils.updatePanesCanvases([topPane, bottomPane], this.canvas);

        assert.ok(topPane.canvas, 'Canvas added to pane');
        assert.notEqual(this.canvas, topPane.canvas, 'Pane canvas should not reference the main object in memory');

        assert.ok(bottomPane.canvas, 'Canvas added to pane');
        assert.notEqual(this.canvas, bottomPane.canvas, 'Pane canvas should not reference the main object in memory');

        // top pane - height 180, margin top - 10, margin bottom - 210
        assert.strictEqual(topPane.canvas.left, this.canvas.left, 'Pane Canvas Left margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.right, this.canvas.right, 'Pane Canvas Right margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.top, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.bottom, this.canvas.bottom + expectedPaneHeight + panePadding, 'Pane Canvas Bottom margin should change');

        assert.strictEqual(topPane.canvas.originalLeft, this.canvas.left, 'Pane Canvas Left margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.originalRight, this.canvas.right, 'Pane Canvas Right margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.originalTop, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.originalBottom, this.canvas.bottom + expectedPaneHeight + panePadding, 'Pane Canvas Bottom margin should change');

        // bottom pane - height 180, margin top - 200, margin bottom - 20
        assert.strictEqual(bottomPane.canvas.left, this.canvas.left, 'Pane Canvas Left margin should be equal to main canvas');
        assert.strictEqual(bottomPane.canvas.right, this.canvas.right, 'Pane Canvas Right margin should be equal to main canvas');
        assert.strictEqual(bottomPane.canvas.top, this.canvas.top + expectedPaneHeight + panePadding, 'Pane Canvas Top margin should change');
        assert.strictEqual(bottomPane.canvas.bottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');

        assert.strictEqual(bottomPane.canvas.originalLeft, this.canvas.left, 'Pane Canvas Left margin should be equal to main canvas');
        assert.strictEqual(bottomPane.canvas.originalRight, this.canvas.right, 'Pane Canvas Right margin should be equal to main canvas');
        assert.strictEqual(bottomPane.canvas.originalTop, this.canvas.top + expectedPaneHeight + panePadding, 'Pane Canvas Top margin should change');
        assert.strictEqual(bottomPane.canvas.originalBottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');
    });

    QUnit.test('Two not equal panes - vertical alignment (weight)', function (assert) {
        const topPane = {
            name: 'topPane',
            height: 0.7
        };
        const bottomPane = {
            name: 'bottomPane'
        };
        const chartCanvasHeight = this.canvas.height - this.canvas.top - this.canvas.bottom;
        const panePadding = 10;
        const expectedBottomPaneHeight = (chartCanvasHeight - panePadding) * 0.3;
        const expectedTopPaneHeight = (chartCanvasHeight - panePadding) * 0.7;

        utils.setCanvasValues(this.canvas);
        utils.normalizePanesHeight([topPane, bottomPane]);
        utils.updatePanesCanvases([topPane, bottomPane], this.canvas);

        assert.strictEqual(topPane.canvas.top, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.bottom, this.canvas.bottom + expectedBottomPaneHeight + panePadding, 'Pane Canvas Bottom margin should change');

        assert.strictEqual(topPane.canvas.originalTop, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.originalBottom, this.canvas.bottom + expectedBottomPaneHeight + panePadding, 'Pane Canvas Bottom margin should change');

        assert.strictEqual(bottomPane.canvas.top, this.canvas.top + expectedTopPaneHeight + panePadding, 'Pane Canvas Top margin should change');
        assert.strictEqual(bottomPane.canvas.bottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');

        assert.strictEqual(bottomPane.canvas.originalTop, this.canvas.top + expectedTopPaneHeight + panePadding, 'Pane Canvas Top margin should change');
        assert.strictEqual(bottomPane.canvas.originalBottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');
    });

    QUnit.test('Two not equal panes - vertical alignment (pixels)', function (assert) {
        const expectedBottomPaneHeight = 220;
        const topPane = {
            name: 'topPane'
        };
        const bottomPane = {
            name: 'bottomPane',
            height: expectedBottomPaneHeight
        };
        const chartCanvasHeight = this.canvas.height - this.canvas.top - this.canvas.bottom;
        const panePadding = 10;
        const expectedTopPaneHeight = chartCanvasHeight - panePadding - expectedBottomPaneHeight;

        utils.setCanvasValues(this.canvas);
        utils.normalizePanesHeight([topPane, bottomPane]);
        utils.updatePanesCanvases([topPane, bottomPane], this.canvas);

        assert.strictEqual(topPane.canvas.top, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.bottom, this.canvas.bottom + expectedBottomPaneHeight + panePadding, 'Pane Canvas Bottom margin should change');

        assert.strictEqual(topPane.canvas.originalTop, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.originalBottom, this.canvas.bottom + expectedBottomPaneHeight + panePadding, 'Pane Canvas Bottom margin should change');

        assert.strictEqual(bottomPane.canvas.top, this.canvas.top + expectedTopPaneHeight + panePadding, 'Pane Canvas Top margin should change');
        assert.strictEqual(bottomPane.canvas.bottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');

        assert.strictEqual(bottomPane.canvas.originalTop, this.canvas.top + expectedTopPaneHeight + panePadding, 'Pane Canvas Top margin should change');
        assert.strictEqual(bottomPane.canvas.originalBottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');
    });

    QUnit.test('Two not equal panes - vertical alignment (both panes sized by pixels)', function (assert) {
        const expectedBottomPaneHeight = 200;
        const expectedTopPaneHeight = 160;
        const topPane = {
            name: 'topPane',
            height: expectedTopPaneHeight
        };
        const bottomPane = {
            name: 'bottomPane',
            height: expectedBottomPaneHeight
        };
        const panePadding = 10;

        utils.setCanvasValues(this.canvas);
        utils.normalizePanesHeight([topPane, bottomPane]);
        utils.updatePanesCanvases([topPane, bottomPane], this.canvas);

        assert.strictEqual(topPane.canvas.top, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.bottom, this.canvas.bottom + expectedBottomPaneHeight + panePadding, 'Pane Canvas Bottom margin should change');

        assert.strictEqual(topPane.canvas.originalTop, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(topPane.canvas.originalBottom, this.canvas.bottom + expectedBottomPaneHeight + panePadding, 'Pane Canvas Bottom margin should change');

        assert.strictEqual(bottomPane.canvas.top, this.canvas.top + expectedTopPaneHeight + panePadding, 'Pane Canvas Top margin should change');
        assert.strictEqual(bottomPane.canvas.bottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');

        assert.strictEqual(bottomPane.canvas.originalTop, this.canvas.top + expectedTopPaneHeight + panePadding, 'Pane Canvas Top margin should change');
        assert.strictEqual(bottomPane.canvas.originalBottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');
    });

    QUnit.test('Two equal panes - rotated, horizontal alignment', function (assert) {
        const leftPane = {
            name: 'leftPane',
            height: 1
        };
        const rightPane = {
            name: 'rightPane',
            height: 1
        };
        const chartCanvasWidth = this.canvas.width - this.canvas.left - this.canvas.right;
        const panePadding = 10;
        const expectedPaneWidth = (chartCanvasWidth - panePadding) / 2;

        utils.setCanvasValues(this.canvas);
        utils.normalizePanesHeight([leftPane, rightPane]);
        utils.updatePanesCanvases([leftPane, rightPane], this.canvas, true);

        assert.ok(rightPane.canvas, 'Canvas added to pane');
        assert.notEqual(this.canvas, rightPane.canvas, 'Pane canvas should not reference the main object in memory');

        assert.ok(leftPane.canvas, 'Canvas added to pane');
        assert.notEqual(this.canvas, leftPane.canvas, 'Pane canvas should not reference the main object in memory');
        // top pane - width 460, margin left - 30, margin right - 40
        assert.strictEqual(leftPane.canvas.left, this.canvas.left, 'Pane Canvas Left margin should be equal to main canvas');
        assert.strictEqual(leftPane.canvas.right, this.canvas.right + expectedPaneWidth + panePadding, 'Pane Canvas Right margin should change');
        assert.strictEqual(leftPane.canvas.top, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(leftPane.canvas.bottom, this.canvas.bottom, 'Pane Canvas Bottom margin should change');

        assert.strictEqual(leftPane.canvas.originalLeft, this.canvas.left, 'Pane Canvas Left margin should be equal to main canvas');
        assert.strictEqual(leftPane.canvas.originalRight, this.canvas.right + expectedPaneWidth + panePadding, 'Pane Canvas Right margin should change');
        assert.strictEqual(leftPane.canvas.originalTop, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(leftPane.canvas.originalBottom, this.canvas.bottom, 'Pane Canvas Bottom margin should change');

        // bottom pane - width 460, margin left - 200, margin right - 40
        assert.strictEqual(rightPane.canvas.left, this.canvas.left + expectedPaneWidth + panePadding, 'Pane Canvas Left margin should change');
        assert.strictEqual(rightPane.canvas.right, this.canvas.right, 'Pane Canvas Right margin should be equal to main canvas');
        assert.strictEqual(rightPane.canvas.top, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(rightPane.canvas.bottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');

        assert.strictEqual(rightPane.canvas.originalLeft, this.canvas.left + expectedPaneWidth + panePadding, 'Pane Canvas Left margin should change');
        assert.strictEqual(rightPane.canvas.originalRight, this.canvas.right, 'Pane Canvas Right margin should be equal to main canvas');
        assert.strictEqual(rightPane.canvas.originalTop, this.canvas.top, 'Pane Canvas Top margin should be equal to main canvas');
        assert.strictEqual(rightPane.canvas.originalBottom, this.canvas.bottom, 'Pane Canvas Bottom margin should be equal to main canvas');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["viz/core/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("viz/core/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.tests.js.map