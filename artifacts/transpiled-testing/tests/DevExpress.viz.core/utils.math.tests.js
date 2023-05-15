!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core/utils.math.tests.js"], ["viz/core/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.core/utils.math.tests.js', ['viz/core/utils'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const vizUtils = $__require('viz/core/utils');

    const EPSILON = 1E-8;
    const PI = Math.PI;

    const format = function () {
        const args = arguments;
        const toString = function (arg) {
            if (arg === null) return 'null';
            if (arg === undefined) return 'undefined';
            return arg.toString();
        };
        return args[0].replace(/{(\d+)}/g, function (match, i) {
            return toString(args[i + 1]);
        });
    };

    QUnit.module('Angular utils');

    QUnit.test('normalizeAngle', function (assert) {
        const testNormalizeAngle = function (arg, expected) {
            const actual = vizUtils.normalizeAngle(arg);
            assert.roughEqual(actual, expected, EPSILON, format('{0} -> {1} ({2})', arg, actual, expected));
        };

        testNormalizeAngle(0, 0);
        testNormalizeAngle(360, 0);
        testNormalizeAngle(-360, 0);
        testNormalizeAngle(1, 1);
        testNormalizeAngle(-1, 359);
        testNormalizeAngle(-270, 90);
        testNormalizeAngle(1815, 15);
        testNormalizeAngle(-1785, 15);
        testNormalizeAngle(1.234, 1.234);
        testNormalizeAngle(360.234, 0.234);
        testNormalizeAngle(-0.766, 359.234);
        testNormalizeAngle(3600.1234567, 0.1234567);
    });

    QUnit.test('convertAngleToRendererSpace', function (assert) {
        const testConvertAngleToRendererSpace = function (angle, expected) {
            const actual = vizUtils.convertAngleToRendererSpace(angle);
            assert.strictEqual(actual, expected, format('{0} -> {1} ({2})', angle, actual, expected));
        };

        testConvertAngleToRendererSpace(0, 90);
        testConvertAngleToRendererSpace(90, 0);
        testConvertAngleToRendererSpace(180, -90);

        testConvertAngleToRendererSpace(270, -180);
        testConvertAngleToRendererSpace(269, -179);
        testConvertAngleToRendererSpace(271, -181);

        testConvertAngleToRendererSpace(89, 1);
        testConvertAngleToRendererSpace(91, -1);

        testConvertAngleToRendererSpace(3600, -3510);
        testConvertAngleToRendererSpace(-3420, 3510);
        testConvertAngleToRendererSpace(-90, 180);
        testConvertAngleToRendererSpace(-91, 181);
        testConvertAngleToRendererSpace(-89, 179);
        testConvertAngleToRendererSpace(180, -90);
    });

    QUnit.test('degreesToRadians', function (assert) {
        const testDegreesToRadians = function (value, expected) {
            const actual = vizUtils.degreesToRadians(value);
            assert.roughEqual(actual, expected, EPSILON, format('{0} -> {1} ({2})', value, actual, expected));
        };

        testDegreesToRadians(0, 0);
        testDegreesToRadians(90, PI / 2);
        testDegreesToRadians(180, PI);
        testDegreesToRadians(270, PI * 3 / 2);

        testDegreesToRadians(1, PI / 180);
        testDegreesToRadians(359, PI * 359 / 180);
        testDegreesToRadians(-24, PI * -24 / 180);
    });

    QUnit.test('getCosAndSin', function (assert) {
        const testGetCosAndSin = function (value, expectedCos, expectedSin) {
            const actual = vizUtils.getCosAndSin(value);
            assert.roughEqual(actual.cos, expectedCos, EPSILON, format('{0} -> {1} ({2}) (cos)', value, actual.cos, expectedCos));
            assert.roughEqual(actual.sin, expectedSin, EPSILON, format('{0} -> {1} ({2}) (sin)', value, actual.sin, expectedSin));
        };
        const cos = Math.cos;
        const sin = Math.sin;

        testGetCosAndSin(0, cos(0), sin(0));
        testGetCosAndSin(90, cos(PI / 2), sin(PI / 2));
        testGetCosAndSin(135, cos(PI * 3 / 4), sin(PI * 3 / 4));
        testGetCosAndSin(-30, cos(-PI / 6), sin(-PI / 6));
        testGetCosAndSin(765, cos(PI * 17 / 4), sin(PI * 17 / 4));
    });

    QUnit.test('getDistance', function (assert) {
        assert.equal(vizUtils.getDistance(0, 0, 3, 4), 5, 'egypt triangle');
        assert.equal(vizUtils.getDistance(3, 4, 0, 0), 5, 'egypt triangle');
        assert.equal(vizUtils.getDistance(20, 20, 10, 10), Math.sqrt(200));
    });

    QUnit.module('Number utils');

    QUnit.test('getDecimalOrder', function (assert) {
        assert.strictEqual(vizUtils.getDecimalOrder(0), 0, '0');
        assert.strictEqual(vizUtils.getDecimalOrder(3.1), 0, '3.1');
        assert.strictEqual(vizUtils.getDecimalOrder(0.5), -1, '-0.5');
        assert.strictEqual(vizUtils.getDecimalOrder(10), 1, '10');
        assert.strictEqual(vizUtils.getDecimalOrder(100.4), 2, '100.4');
        assert.strictEqual(vizUtils.getDecimalOrder(0.0001), -4, '0.0001');
        assert.strictEqual(vizUtils.getDecimalOrder(1.3E50), 50, '1.3E50');

        assert.strictEqual(vizUtils.getDecimalOrder(-23), 1, '-23');
        assert.strictEqual(vizUtils.getDecimalOrder(-0.003), -3, '-0.003');
        assert.strictEqual(vizUtils.getDecimalOrder(-1E50), 50, '-1E50');
        assert.strictEqual(vizUtils.getDecimalOrder(-1E-300), -300, '-1E-300');

        assert.strictEqual(vizUtils.getDecimalOrder('56'), 1, '"56"');
        assert.strictEqual(vizUtils.getDecimalOrder('123.3'), 2, '"123.3"');
        assert.strictEqual(vizUtils.getDecimalOrder('-0.000045'), -5, '"-0.000045"');

        assert.strictEqual(vizUtils.getDecimalOrder(null), 0, 'null');

        assert.ok(isNaN(vizUtils.getDecimalOrder(undefined)), 'undefined');
        assert.ok(isNaN(vizUtils.getDecimalOrder('test')), '"test"');
        assert.ok(isNaN(vizUtils.getDecimalOrder({})), '{}');
    });

    QUnit.test('getDecimalOrder - extremal cases', function (assert) {
        let x = -30;
        for (; x <= 30; ++x) {
            assert.strictEqual(vizUtils.getDecimalOrder(Math.pow(10, x)), x, '1E' + x.toString());
        }
    });

    function testGetAppropriateFormat(assert, start, end, count, expectedFormat, expectedPrecision, message) {
        const actual = vizUtils.getAppropriateFormat(start, end, count);
        const expected = { type: expectedFormat, precision: expectedPrecision };
        const extraMessage = start.toString() + ' to ' + end.toString() + ' as ' + count.toString();
        assert.deepEqual(actual, expected, message ? message + ' (' + extraMessage + ')' : extraMessage);
    }

    //  B232087
    QUnit.test('getAppropriateFormat - [0, 10]', function (assert) {
        testGetAppropriateFormat(assert, 0, 10, 2, 'fixedPoint', 0);
        testGetAppropriateFormat(assert, 0, 10, 10, 'fixedPoint', 0);

        testGetAppropriateFormat(assert, 0, 10, 16, 'fixedPoint', 1);
        testGetAppropriateFormat(assert, 0, 10, 71, 'fixedPoint', 1);
        testGetAppropriateFormat(assert, 0, 10, 100, 'fixedPoint', 1);

        testGetAppropriateFormat(assert, 0, 10, 350, 'fixedPoint', 2);
        testGetAppropriateFormat(assert, 0, 10, 500, 'fixedPoint', 2);
        testGetAppropriateFormat(assert, 0, 10, 1000, 'fixedPoint', 2);

        testGetAppropriateFormat(assert, 0, 10, 1050, 'fixedPoint', 3);
        testGetAppropriateFormat(assert, 0, 10, 9300, 'fixedPoint', 3);
        testGetAppropriateFormat(assert, 0, 10, 10000, 'fixedPoint', 3);

        testGetAppropriateFormat(assert, 0, 10, 20000, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 0, 10, 70000, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 0, 10, 100000, 'fixedPoint', 4);

        //  //  extremal case
        testGetAppropriateFormat(assert, 0, 10, 2E5, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 0, 10, 2E8, 'fixedPoint', 4);
    });

    //  B232087
    QUnit.test('getAppropriateFormat - [3000, 10000]', function (assert) {
        testGetAppropriateFormat(assert, 3000, 10000, 20, 'fixedPoint', 0);
        testGetAppropriateFormat(assert, 3000, 10000, 900, 'fixedPoint', 0);
        testGetAppropriateFormat(assert, 3000, 10000, 7000, 'fixedPoint', 0);

        testGetAppropriateFormat(assert, 3000, 10000, 8000, 'fixedPoint', 1);
        testGetAppropriateFormat(assert, 3000, 10000, 50000, 'fixedPoint', 1);
        testGetAppropriateFormat(assert, 3000, 10000, 70000, 'fixedPoint', 1);

        testGetAppropriateFormat(assert, 3000, 10000, 1E5, 'fixedPoint', 2);
        testGetAppropriateFormat(assert, 3000, 10000, 4E5, 'fixedPoint', 2);
        testGetAppropriateFormat(assert, 3000, 10000, 7E5, 'fixedPoint', 2);

        testGetAppropriateFormat(assert, 3000, 10000, 2E6, 'fixedPoint', 3);
        testGetAppropriateFormat(assert, 3000, 10000, 7E6, 'fixedPoint', 3);

        testGetAppropriateFormat(assert, 3000, 10000, 5E7, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 3000, 10000, 7E7, 'fixedPoint', 4);

        //  extremal case
        testGetAppropriateFormat(assert, 3000, 10000, 1E10, 'fixedPoint', 4);
    });

    //  B232087
    QUnit.test('getAppropriateFormat - [0.1, 1.3]', function (assert) {
        testGetAppropriateFormat(assert, 0.1, 1.3, 6, 'fixedPoint', 1);
        testGetAppropriateFormat(assert, 0.1, 1.3, 12, 'fixedPoint', 1);

        testGetAppropriateFormat(assert, 0.1, 1.3, 20, 'fixedPoint', 2);
        testGetAppropriateFormat(assert, 0.1, 1.3, 61, 'fixedPoint', 2);
        testGetAppropriateFormat(assert, 0.1, 1.3, 120, 'fixedPoint', 2);

        testGetAppropriateFormat(assert, 0.1, 1.3, 150, 'fixedPoint', 3);
        testGetAppropriateFormat(assert, 0.1, 1.3, 600, 'fixedPoint', 3);
        testGetAppropriateFormat(assert, 0.1, 1.3, 1200, 'fixedPoint', 3);

        testGetAppropriateFormat(assert, 0.1, 1.3, 3000, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 0.1, 1.3, 9000, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 0.1, 1.3, 12000, 'fixedPoint', 4);

        //  extremal case
        testGetAppropriateFormat(assert, 0.1, 1.3, 13000, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 0.1, 1.3, 50000, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 0.1, 1.3, 1E5, 'fixedPoint', 4);
    });

    //  B232087
    QUnit.test('getAppropriateFormat - [0.001, 0.009]', function (assert) {
        testGetAppropriateFormat(assert, 0.001, 0.009, 5, 'fixedPoint', 3);
        testGetAppropriateFormat(assert, 0.001, 0.009, 8, 'fixedPoint', 3);

        testGetAppropriateFormat(assert, 0.001, 0.009, 10, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 0.001, 0.009, 37, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 0.001, 0.009, 80, 'fixedPoint', 4);

        //  extremal case
        testGetAppropriateFormat(assert, 0.001, 0.009, 100, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 0.001, 0.009, 800, 'fixedPoint', 4);
        testGetAppropriateFormat(assert, 0.001, 0.009, 10000, 'fixedPoint', 4);
    });

    //  B232087
    QUnit.test('getAppropriateFormat - [0, 1E+5]', function (assert) {
        testGetAppropriateFormat(assert, 0, 1E+5, 5, 'exponential', 0);
        testGetAppropriateFormat(assert, 0, 1E+5, 10, 'exponential', 0);

        testGetAppropriateFormat(assert, 0, 1E+5, 20, 'exponential', 1);
        testGetAppropriateFormat(assert, 0, 1E+5, 100, 'exponential', 1);

        testGetAppropriateFormat(assert, 0, 1E+5, 200, 'exponential', 2);
        testGetAppropriateFormat(assert, 0, 1E+5, 700, 'exponential', 2);
        testGetAppropriateFormat(assert, 0, 1E+5, 1000, 'exponential', 2);

        testGetAppropriateFormat(assert, 0, 1E+5, 5000, 'exponential', 3);
        testGetAppropriateFormat(assert, 0, 1E+5, 10000, 'exponential', 3);

        //  extremal case
        testGetAppropriateFormat(assert, 0, 1E+5, 20000, 'exponential', 3);
        testGetAppropriateFormat(assert, 0, 1E+5, 100000, 'exponential', 3);
    });

    //  B232087
    QUnit.test('getAppropriateFormat - [0.1E-6, 1.1E-6]', function (assert) {
        testGetAppropriateFormat(assert, 0.1E-6, 1.1E-6, 7, 'exponential', 0);
        testGetAppropriateFormat(assert, 0.1E-6, 1.1E-6, 10, 'exponential', 0);

        testGetAppropriateFormat(assert, 0.1E-6, 1.1E-6, 50, 'exponential', 1);
        testGetAppropriateFormat(assert, 0.1E-6, 1.1E-6, 100, 'exponential', 1);

        testGetAppropriateFormat(assert, 0.1E-6, 1.1E-6, 300, 'exponential', 2);
        testGetAppropriateFormat(assert, 0.1E-6, 1.1E-6, 1000, 'exponential', 2);

        testGetAppropriateFormat(assert, 0.1E-6, 1.1E-6, 4230, 'exponential', 3);
        testGetAppropriateFormat(assert, 0.1E-6, 1.1E-6, 10000, 'exponential', 3);

        //  extremal case
        testGetAppropriateFormat(assert, 0.1E-6, 1.1E-6, 80000, 'exponential', 3);
        testGetAppropriateFormat(assert, 0.1E-6, 1.1E-6, 100000, 'exponential', 3);
    });

    QUnit.test('getLog', function (assert) {
        assert.roughEqual(vizUtils.getLog(10, 10), 1, 1E-8);
        assert.roughEqual(vizUtils.getLog(1, 10), 0, 1E-8);

        assert.roughEqual(vizUtils.getLog(16, 2), 4, 1E-8);
        assert.roughEqual(vizUtils.getLog(1, 2), 0, 1E-8);

        assert.deepEqual(vizUtils.getLog(-10, 10), NaN);
        assert.deepEqual(vizUtils.getLog(0, 10), NaN);
        assert.deepEqual(vizUtils.getLog(undefined, 10), NaN);

        assert.deepEqual(vizUtils.getLog(-10, 0), NaN);
        assert.deepEqual(vizUtils.getLog(10, -10), NaN);
        assert.deepEqual(vizUtils.getLog(10, undefined), NaN);
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
//# sourceMappingURL=utils.math.tests.js.map