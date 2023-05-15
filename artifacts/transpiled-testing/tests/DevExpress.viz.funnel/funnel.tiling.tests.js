!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.funnel/funnel.tiling.tests.js"], ["./commonParts/common.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.funnel/funnel.tiling.tests.js', ['./commonParts/common.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const common = $__require('./commonParts/common.js');
    const createFunnel = common.createFunnel;
    const environment = common.environment;

    QUnit.module('Algorithms', environment);

    QUnit.test('Funnel. Normalize values', function (assert) {
        const funnel = createFunnel({
            dataSource: [{
                value: 430
            }, {
                value: 201
            }, {
                value: 300
            }, {
                value: 45
            }]
        });
        const items = funnel.getAllItems();

        assert.equal(items.length, 4);
        assert.equal(items[0].percent, 1);
        assert.roughEqual(items[1].percent, 0.69, 0.01);
        assert.roughEqual(items[2].percent, 0.46, 0.01);
        assert.roughEqual(items[3].percent, 0.1, 0.01);
    });

    QUnit.test('Funnel. Drawing', function (assert) {
        createFunnel({
            dataSource: [{
                value: 430
            }, {
                value: 201
            }, {
                value: 300
            }, {
                value: 45
            }]
        });

        const items = this.items();

        assert.equal(items.length, 4);
        assert.checkItem(items[0].attr.firstCall.args[0].points, [0, 0, 1000, 0, 848.8, 100, 151.1, 100]);
        assert.checkItem(items[1].attr.firstCall.args[0].points, [151.1, 100, 848.8, 100, 733.7, 200, 266.2, 200]);
        assert.checkItem(items[2].attr.firstCall.args[0].points, [266.2, 200, 733.7, 200, 552.3, 300, 447.6, 300]);
        assert.checkItem(items[3].attr.firstCall.args[0].points, [447.6, 300, 552.3, 300, 552.3, 400, 447.6, 400]);
    });

    QUnit.test('Pyramid. Normalize values', function (assert) {
        const funnel = createFunnel({
            algorithm: 'dynamicHeight',
            dataSource: [{
                value: 430
            }, {
                value: 201
            }, {
                value: 300
            }, {
                value: 45
            }]
        });
        const items = funnel.getAllItems();

        assert.equal(items.length, 4);
        assert.roughEqual(items[0].percent, 0.44, 0.01);
        assert.roughEqual(items[1].percent, 0.3, 0.01);
        assert.roughEqual(items[2].percent, 0.2, 0.01);
        assert.roughEqual(items[3].percent, 0.04, 0.01);
    });

    QUnit.test('Pyramid. Drawing', function (assert) {
        createFunnel({
            algorithm: 'dynamicHeight',
            dataSource: [{
                value: 430
            }, {
                value: 201
            }, {
                value: 300
            }, {
                value: 45
            }]
        });
        const items = this.items();

        assert.equal(items.length, 4);
        assert.checkItem(items[0].attr.firstCall.args[0].points, [0, 0, 1000, 0, 779.7, 176.2, 220.2, 176.2]);
        assert.checkItem(items[1].attr.firstCall.args[0].points, [220.2, 176.2, 779.7, 176.2, 626, 299.1, 373.9, 299.1]);
        assert.checkItem(items[2].attr.firstCall.args[0].points, [373.9, 299.1, 626, 299.1, 523, 381.5, 476.9, 381.5]);
        assert.checkItem(items[3].attr.firstCall.args[0].points, [476.9, 381.5, 523, 381.5, 500, 400, 500, 400]);
    });

    QUnit.test('Normalize algorithm name', function (assert) {
        createFunnel({
            algorithm: 'dynamicHeIGht',
            dataSource: [{
                value: 430
            }, {
                value: 201
            }, {
                value: 300
            }, {
                value: 45
            }]
        });
        const items = this.items();

        assert.equal(items.length, 4);
        assert.checkItem(items[0].attr.firstCall.args[0].points, [0, 0, 1000, 0, 779.7, 176.2, 220.2, 176.2]);
        assert.checkItem(items[1].attr.firstCall.args[0].points, [220.2, 176.2, 779.7, 176.2, 626, 299.1, 373.9, 299.1]);
        assert.checkItem(items[2].attr.firstCall.args[0].points, [373.9, 299.1, 626, 299.1, 523, 381.5, 476.9, 381.5]);
        assert.checkItem(items[3].attr.firstCall.args[0].points, [476.9, 381.5, 523, 381.5, 500, 400, 500, 400]);
    });

    QUnit.test('Pyramid. Drawing with neckWidth', function (assert) {
        createFunnel({
            algorithm: 'dynamicHeight',
            neckWidth: 0.2,
            dataSource: [{
                value: 430
            }, {
                value: 201
            }, {
                value: 300
            }, {
                value: 45
            }]
        });
        const items = this.items();

        assert.equal(items.length, 4);
        assert.checkItem(items[0].attr.firstCall.args[0].points, [0, 0, 1000, 0, 823.7, 176.2, 176.2, 176.2]);
        assert.checkItem(items[1].attr.firstCall.args[0].points, [176.2, 176.2, 823.7, 176.2, 700.8, 299.1, 299.1, 299.1]);
        assert.checkItem(items[2].attr.firstCall.args[0].points, [299.1, 299.1, 700.8, 299.1, 618.4, 381.5, 381.5, 381.5]);
        assert.checkItem(items[3].attr.firstCall.args[0].points, [381.5, 381.5, 618.4, 381.5, 600, 400, 400, 400]);
    });

    QUnit.test('Pyramid. Drawing with neckHeight', function (assert) {
        createFunnel({
            algorithm: 'dynamicHeight',
            neckWidth: 0.2,
            neckHeight: 0.18,
            dataSource: [{
                value: 430
            }, {
                value: 201
            }, {
                value: 300
            }, {
                value: 45
            }]
        });

        const items = this.items();

        assert.equal(items.length, 4);
        assert.checkItem(items[0].attr.firstCall.args[0].points, [0, 0, 1000, 0, 785, 176.2, 214.9, 176.2]);
        assert.checkItem(items[1].attr.firstCall.args[0].points, [214.9, 176.2, 785, 176.2, 635.1, 299.1, 364.8, 299.1]);
        assert.checkItem(items[2].attr.firstCall.args[0].points, [364.8, 299.1, 635.1, 299.1, 600, 328, 600, 381.5, 400, 381.5, 400, 328]);
        assert.checkItem(items[3].attr.firstCall.args[0].points, [400, 381.5, 600, 381.5, 600, 400, 400, 400]);
    });

    QUnit.test('Pyramid. Update neckWidth and neckHeight', function (assert) {
        const funnel = createFunnel({
            algorithm: 'dynamicHeight',
            neckWidth: 0.2,
            neckHeight: 0.18,
            dataSource: [{
                value: 430
            }, {
                value: 201
            }, {
                value: 300
            }, {
                value: 45
            }]
        });

        funnel.option({ neckWidth: 0.3, neckHeight: 0.4 });

        const items = this.items();

        assert.equal(items.length, 4);
        assert.checkItem(items[0].attr.firstCall.args[0].points, [0, 0, 1000, 0, 743, 176.2, 257, 176.2]);
        assert.checkItem(items[1].attr.firstCall.args[0].points, [257, 176.2, 743, 176.2, 650, 240, 650, 299.1, 350, 299.1, 350, 240]);
        assert.checkItem(items[2].attr.firstCall.args[0].points, [350, 299.1, 650, 299.1, 650, 381.5, 350, 381.5]);
        assert.checkItem(items[3].attr.firstCall.args[0].points, [350, 381.5, 650, 381.5, 650, 400, 350, 400]);
    });

    QUnit.test('Update option from funnel to pyramid', function (assert) {
        const funnel = createFunnel({
            dataSource: [{
                value: 430
            }, {
                value: 201
            }, {
                value: 300
            }, {
                value: 45
            }]
        });

        funnel.option({ algorithm: 'dynamicHeight' });

        const items = this.items();

        assert.equal(items.length, 4);
        assert.checkItem(items[0].attr.firstCall.args[0].points, [0, 0, 1000, 0, 779.7, 176.2, 220.2, 176.2]);
        assert.checkItem(items[1].attr.firstCall.args[0].points, [220.2, 176.2, 779.7, 176.2, 626, 299.1, 373.9, 299.1]);
        assert.checkItem(items[2].attr.firstCall.args[0].points, [373.9, 299.1, 626, 299.1, 523, 381.5, 476.9, 381.5]);
        assert.checkItem(items[3].attr.firstCall.args[0].points, [476.9, 381.5, 523, 381.5, 500, 400, 500, 400]);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./commonParts/common.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./commonParts/common.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=funnel.tiling.tests.js.map