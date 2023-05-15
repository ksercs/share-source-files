!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.math.tests.js"], ["core/utils/math"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.core/utils.math.tests.js', ['core/utils/math'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const mathUtils = $__require('core/utils/math');
    const adjust = mathUtils.adjust;

    QUnit.test('fitIntoRange', function (assert) {
        const value = 10;
        const min = 5;
        const max = 15;

        assert.equal(mathUtils.fitIntoRange(value, min, max), 10, 'Returned value is right');
    });

    QUnit.test('fitIntoRange, when value < min', function (assert) {
        const value = 3;
        const min = 5;
        const max = 15;

        assert.equal(mathUtils.fitIntoRange(value, min, max), 5, 'Returned value is right');
    });

    QUnit.test('fitIntoRange, when value > max', function (assert) {
        const value = 20;
        const min = 5;
        const max = 15;

        assert.equal(mathUtils.fitIntoRange(value, min, max), 15, 'Returned value is right');
    });

    QUnit.test('fitIntoRange, when value < min, max = undefined', function (assert) {
        const value = 3;
        const min = 5;

        assert.equal(mathUtils.fitIntoRange(value, min, undefined), 5, 'Returned value is right');
    });

    QUnit.test('fitIntoRange, when value > max, min = undefined', function (assert) {
        const value = 15;
        const max = 10;

        assert.equal(mathUtils.fitIntoRange(value, undefined, max), 10, 'Returned value is right');
    });

    QUnit.test('fitIntoRange, when min = 0', function (assert) {
        const value = -5;
        const min = 0;
        const max = 15;

        assert.equal(mathUtils.fitIntoRange(value, min, max), 0, 'Returned value is right');
    });

    QUnit.test('fitIntoRange, when max = 0', function (assert) {
        const value = 5;
        const min = -10;
        const max = 0;

        assert.equal(mathUtils.fitIntoRange(value, min, max), 0, 'Returned value is right');
    });

    QUnit.test('adjust', function (assert) {
        assert.strictEqual(adjust(1.1 + 0.1, 0.1), 1.2, 'adjusting numbers with floating point');
        assert.strictEqual(adjust(1.1 + 1e-4, 1e-4), 1.1001, 'adjusting numbers in exponential notation');
        assert.strictEqual(adjust(1.1e-8 + 1.23456789e-8, 1.23456789e-8), 2.33456789e-8, 'adjusting numbers with precision above 7');
        assert.strictEqual(adjust(3e-8), 3e-8, 'checking adjust numbers in exponential notation (Edge, precision=0)');
        assert.strictEqual(adjust(1.1e-8), 1.1e-8, 'checking adjust numbers in exponential notation (Edge, precision=1)');
        assert.strictEqual(adjust(1.03e-8), 1.03e-8, 'checking adjust numbers in exponential notation (Edge, precision=2)');
        assert.strictEqual(adjust(1.211e-7), 1.211e-7, 'checking adjust numbers in exponential notation (Edge, precision=3)');
        assert.strictEqual(adjust(1.3e-16 - 1.1e-16), 2e-17, 'checking adjust numbers in exponential notation (Edge, exponent < -15)');
        assert.strictEqual(adjust(1.182667 + 5e-7, 5e-7), 1.1826675, 'number in non exponential notation & tickInterval in exponential notation');
        assert.strictEqual(adjust(5000000070121.669), 5000000070121.669, 'adjusting big numbers');
        assert.strictEqual(adjust(10000000000.1 + 0.2), 10000000000.3);
        assert.strictEqual(adjust(1.000001, 0.000001), 1.000001);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/math"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/math"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.math.tests.js.map