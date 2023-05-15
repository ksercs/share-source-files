!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.vectorMap/layout.tests.js"], ["jquery","viz/vector_map/layout"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.vectorMap/layout.tests.js', ['jquery', 'viz/vector_map/layout'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const layoutModule = $__require('viz/vector_map/layout');

    QUnit.module('LayoutControl', {
        beforeEach: function () {
            this.widget = {
                resolveItemsDeferred: sinon.spy()
            };
            this.layoutControl = new layoutModule.LayoutControl(this.widget);
        },
        afterEach: function () {
            this.layoutControl.dispose();
        },
        createItem: function (extraFunctions) {
            return {
                resize: sinon.spy(),
                getLayoutOptions: sinon.stub(),
                locate: sinon.spy(),
                getTemplatesGroups: extraFunctions && extraFunctions.getTemplatesGroups,
                getTemplatesDef: extraFunctions && extraFunctions.getTemplatesDef
            };
        }
    });

    QUnit.test('instance type', function (assert) {
        assert.ok(this.layoutControl instanceof layoutModule.LayoutControl);
    });

    QUnit.test('add item', function (assert) {
        const item = this.createItem();

        this.layoutControl.addItem(item);

        assert.strictEqual(typeof item.updateLayout, 'function');
    });

    QUnit.test('remove item', function (assert) {
        const item = this.createItem();
        this.layoutControl.addItem(item);

        this.layoutControl.removeItem(item);

        assert.strictEqual(item.updateLayout, null);
    });

    QUnit.test('setSize', function (assert) {
        const item1 = this.createItem();
        const item2 = this.createItem();
        const item3 = this.createItem();
        this.layoutControl.addItem(item1);
        this.layoutControl.addItem(item2);
        this.layoutControl.addItem(item3);
        item1.getLayoutOptions.returns({
            width: 100, height: 50,
            horizontalAlignment: 'left',
            verticalAlignment: 'top'
        });
        item2.getLayoutOptions.returns({
            width: 80, height: 70,
            horizontalAlignment: 'right',
            verticalAlignment: 'bottom'
        });
        item3.getLayoutOptions.returns({
            width: 120, height: 30,
            horizontalAlignment: 'center',
            verticalAlignment: 'top'
        });

        this.layoutControl.setSize({ left: 10, right: 20, top: 30, bottom: 40, width: 800, height: 600 });

        assert.deepEqual(item1.resize.lastCall.args, [{ left: 10, right: 20, top: 30, bottom: 40, width: 800, height: 600 }], 'resize - 0');
        assert.deepEqual(item1.getLayoutOptions.lastCall.args, [], 'getLayoutOptions - 0');
        assert.deepEqual(item1.locate.lastCall.args, [10, 30], 'locate - 0');
        assert.deepEqual(item2.resize.lastCall.args, [{ left: 10, right: 20, top: 30, bottom: 40, width: 800, height: 600 }], 'resize - 1');
        assert.deepEqual(item2.getLayoutOptions.lastCall.args, [], 'getLayoutOptions - 1');
        assert.deepEqual(item2.locate.lastCall.args, [730, 560], 'locate - 1');
        assert.deepEqual(item3.resize.lastCall.args, [{ left: 10, right: 20, top: 30, bottom: 40, width: 800, height: 600 }], 'resize - 2');
        assert.deepEqual(item3.getLayoutOptions.lastCall.args, [], 'getLayoutOptions - 2');
        assert.deepEqual(item3.locate.lastCall.args, [350, 30], 'locate - 2');
    });

    QUnit.test('setSize / not rendered', function (assert) {
        const item1 = this.createItem();
        const item2 = this.createItem();
        const item3 = this.createItem();
        this.layoutControl.addItem(item1);
        this.layoutControl.addItem(item2);
        this.layoutControl.addItem(item3);
        item1.getLayoutOptions.returns(null);
        item2.getLayoutOptions.returns(null);
        item3.getLayoutOptions.returns(null);

        this.layoutControl.setSize({ left: 10, right: 20, top: 30, bottom: 40, width: 800, height: 600 });

        $.each([item1, item2, item3], function (i, item) {
            assert.deepEqual(item.resize.lastCall.args, [{ left: 10, right: 20, top: 30, bottom: 40, width: 800, height: 600 }], 'resize - ' + i);
            assert.deepEqual(item.getLayoutOptions.lastCall.args, [], 'getLayoutOptions - ' + i);
            assert.strictEqual(item.locate.lastCall, null, 'locate - ' + i);
        });
    });

    QUnit.test('calling updateLayout from item', function (assert) {
        const item1 = this.createItem();
        const item2 = this.createItem();
        const item3 = this.createItem();
        this.layoutControl.addItem(item1);
        this.layoutControl.addItem(item2);
        this.layoutControl.addItem(item3);
        this.layoutControl.setSize({ left: 10, right: 20, top: 30, bottom: 40, width: 800, height: 600 });
        item1.getLayoutOptions.returns({
            width: 100, height: 50,
            horizontalAlignment: 'left',
            verticalAlignment: 'top'
        });
        item2.getLayoutOptions.returns({
            width: 80, height: 70,
            horizontalAlignment: 'right',
            verticalAlignment: 'bottom'
        });
        item3.getLayoutOptions.returns({
            width: 120, height: 30,
            horizontalAlignment: 'center',
            verticalAlignment: 'top'
        });

        item1.updateLayout();

        $.each([item1, item2, item3], function (i, item) {
            assert.deepEqual(item.getLayoutOptions.lastCall.args, [], 'getLayoutOptions - ' + i);
        });
        assert.deepEqual(item1.locate.lastCall.args, [10, 30], 'locate - 0');
        assert.deepEqual(item2.locate.lastCall.args, [730, 560], 'locate - 1');
        assert.deepEqual(item3.locate.lastCall.args, [350, 30], 'locate - 2');
    });

    QUnit.test('should call resolveItemsDeferred with the item with `getTemplatesGroups` and `getTemplatesDef`', function (assert) {
        const getTemplatesGroups = sinon.spy();
        const getTemplatesDef = sinon.spy();
        const item1 = this.createItem();
        const item2 = this.createItem();
        const item3 = this.createItem({ getTemplatesGroups: getTemplatesGroups, getTemplatesDef: getTemplatesDef });
        this.layoutControl.addItem(item1);
        this.layoutControl.addItem(item2);
        this.layoutControl.addItem(item3);

        this.layoutControl.setSize({ left: 10, right: 20, top: 30, bottom: 40, width: 800, height: 600 });

        item3.updateLayout();

        assert.deepEqual(this.widget.resolveItemsDeferred.getCall(0).args[0], [item3]);
    });

    QUnit.test('setSize / suspended', function (assert) {
        const item1 = this.createItem();
        const item2 = this.createItem();
        const item3 = this.createItem();
        this.layoutControl.addItem(item1);
        this.layoutControl.addItem(item2);
        this.layoutControl.addItem(item3);

        this.layoutControl.suspend();
        this.layoutControl.setSize({ left: 10, right: 20, top: 30, bottom: 40, width: 800, height: 600 });

        $.each([item1, item2, item3], function (i, item) {
            assert.strictEqual(item.resize.lastCall, null, 'resize - ' + i);
            assert.strictEqual(item.getLayoutOptions.lastCall, null, 'getLayoutOptions - ' + i);
            assert.strictEqual(item.locate.lastCall, null, 'locate - ' + i);
        });
    });

    QUnit.test('updateLayout / suspended', function (assert) {
        const item1 = this.createItem();
        const item2 = this.createItem();
        const item3 = this.createItem();
        this.layoutControl.addItem(item1);
        this.layoutControl.addItem(item2);
        this.layoutControl.addItem(item3);
        item1.getLayoutOptions.returns({ horizontalAlignment: 'left', verticalAlignment: 'top' });
        item2.getLayoutOptions.returns({ horizontalAlignment: 'left', verticalAlignment: 'top' });
        item3.getLayoutOptions.returns({ horizontalAlignment: 'left', verticalAlignment: 'top' });
        this.layoutControl.setSize({ left: 10, right: 20, top: 30, bottom: 40, width: 800, height: 600 });

        this.layoutControl.suspend();
        item1.updateLayout();

        $.each([item1, item2, item3], function (i, item) {
            assert.strictEqual(item.resize.callCount, 1, 'resize - ' + i);
            assert.strictEqual(item.getLayoutOptions.callCount, 1, 'getLayoutOptions - ' + i);
            assert.strictEqual(item.locate.callCount, 1, 'locate - ' + i);
        });
    });

    QUnit.module('Layout', {
        doTest: function (assert, itemDefs, size, expected, message) {
            const widget = {
                resolveItemsDeferred: sinon.spy()
            };
            const layoutControl = new layoutModule.LayoutControl(widget);
            const items = $.map(itemDefs, function (def) {
                const parts = def.split('-');
                const item = {
                    getLayoutOptions: function () {
                        return { horizontalAlignment: parts[0], verticalAlignment: parts[1], width: Number(parts[2]), height: Number(parts[3]) };
                    },
                    resize: function (size) {
                        if (size === null) {
                            this.location = null;
                        }
                    },
                    locate: function (x, y) {
                        this.location = [x, y];
                    }
                };
                layoutControl.addItem(item);
                return item;
            });
            layoutControl.setSize({ left: 0, right: 0, top: 0, bottom: 0, width: size[0], height: size[1] });
            const result = [];
            $.each(items, function (_, item) {
                layoutControl.removeItem(item);
                result.push(item.location);
            });
            layoutControl.dispose();
            assert.deepEqual(result, expected, message);
        }
    });

    QUnit.test('common', function (assert) {
        this.doTest(assert, ['left-top-100-50', 'right-bottom-80-70', 'center-top-60-30'], [300, 200], [[0, 0], [220, 130], [120, 0]]);
    });

    QUnit.test('space of neighbour empty cell is occupied / horizontal', function (assert) {
        this.doTest(assert, ['left-top-100-50', 'right-top-50-30'], [200, 100], [[0, 0], [150, 0]], 'edge');
        this.doTest(assert, ['center-bottom-100-20', 'center-top-40-30'], [200, 100], [[50, 80], [80, 0]], 'center');
    });

    QUnit.test('space of neighbour empty cell is occupied / vertical', function (assert) {
        this.doTest(assert, ['right-bottom-50-100'], [150, 150], [[100, 50]], 'edge');
    });

    QUnit.test('free space of neighbour non empty cell is occupied / horizontal', function (assert) {
        this.doTest(assert, ['left-bottom-80-40', 'center-bottom-40-10'], [200, 100], [[0, 60], [80, 90]], 'edge');
        this.doTest(assert, ['right-top-40-10', 'center-top-80-40'], [200, 100], [[160, 0], [53, 0]], 'center');
        this.doTest(assert, ['left-bottom-60-20', 'center-bottom-80-30'], [200, 100], [[0, 80], [67, 70]], 'center, left shifted');
        this.doTest(assert, ['center-top-80-30', 'right-top-60-20'], [200, 100], [[53, 0], [140, 0]], 'center, right shifter');
    });

    QUnit.test('free space of neighbour non empty cell is occupied / vertical', function (assert) {
        this.doTest(assert, ['left-top-20-70', 'left-bottom-60-20'], [200, 100], [[0, 0], [0, 80]]);
    });

    QUnit.test('item is hidden / horizontal', function (assert) {
        this.doTest(assert, ['left-top-100-20', 'center-top-60-20'], [200, 100], [null, [70, 0]]);
    });

    QUnit.test('item is hidden / vertical', function (assert) {
        this.doTest(assert, ['center-top-40-40', 'center-bottom-20-80'], [200, 100], [[80, 0], null]);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","viz/vector_map/layout"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("viz/vector_map/layout"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=layout.tests.js.map