!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core/translator1D.tests.js"], ["viz/translators/translator1d"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.core/translator1D.tests.js', ['viz/translators/translator1d'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const Translator1D = $__require('viz/translators/translator1d').Translator1D;

    const EPSILON = 1E-8;

    QUnit.module('Translator1D');

    QUnit.test('Instance type', function (assert) {
        const translator = new Translator1D();
        assert.ok(translator instanceof Translator1D);
    });

    QUnit.test('construction', function (assert) {
        const translator = new Translator1D();
        assert.deepEqual(translator.getDomain(), [NaN, NaN], 'domain');
        assert.deepEqual(translator.getCodomain(), [NaN, NaN], 'codomain');
        assert.equal(translator.inverted, false, 'inverted');
    });

    QUnit.test('setDomain', function (assert) {
        const translator = new Translator1D();

        translator.setDomain();
        assert.deepEqual(translator.getDomain(), [NaN, NaN], 'no arguments');

        translator.setDomain('test', {});
        assert.deepEqual(translator.getDomain(), [NaN, NaN], 'not valid arguments');

        translator.setDomain('20', '30');
        assert.deepEqual(translator.getDomain(), [20, 30], 'string-like arguments');

        translator.setDomain(1, 2);
        assert.deepEqual(translator.getDomain(), [1, 2], 'arguments');
    });

    QUnit.test('setCodomain', function (assert) {
        const translator = new Translator1D();

        translator.setCodomain();
        assert.deepEqual(translator.getCodomain(), [NaN, NaN], 'no arguments');

        translator.setCodomain('test', {});
        assert.deepEqual(translator.getCodomain(), [NaN, NaN], 'not valid arguments');

        translator.setCodomain('20', '30');
        assert.deepEqual(translator.getCodomain(), [20, 30], 'string-like arguments');

        translator.setCodomain(1, 2);
        assert.deepEqual(translator.getCodomain(), [1, 2], 'arguments');
    });

    QUnit.test('State getters', function (assert) {
        const translator = new Translator1D();
        translator.setDomain(1, 2).setCodomain(10, 20);

        assert.strictEqual(translator.getDomainStart(), 1, 'domain start');
        assert.strictEqual(translator.getDomainEnd(), 2, 'domain end');
        assert.strictEqual(translator.getCodomainStart(), 10, 'codomain start');
        assert.strictEqual(translator.getCodomainEnd(), 20, 'codomain end');
        assert.strictEqual(translator.getDomainRange(), 1, 'domain range');
        assert.strictEqual(translator.getCodomainRange(), 10, 'codomain range');
    });

    QUnit.test('translate', function (assert) {
        const translator = new Translator1D();
        translator.setDomain(0, 100).setCodomain(180, 0);

        assert.roughEqual(translator.translate(0), 180, EPSILON, '0');
        assert.roughEqual(translator.translate('25'), 135, EPSILON, '25');
        assert.roughEqual(translator.translate(50), 90, EPSILON, '50');
        assert.roughEqual(translator.translate('75'), 45, EPSILON, '75');
        assert.roughEqual(translator.translate(100), 0, EPSILON, '100');
        assert.roughEqual(translator.translate(100 / 180), 179, EPSILON, '100 / 180');
        assert.roughEqual(translator.translate(17900 / 180), 1, EPSILON, '17900 / 180');
    });

    QUnit.test('translate.inverted', function (assert) {
        const translator = new Translator1D();
        translator.setDomain(0, 100).setCodomain(180, 0).setInverted(true);

        assert.roughEqual(translator.translate(0), 0, EPSILON, '0');
        assert.roughEqual(translator.translate('25'), 45, EPSILON, '25');
        assert.roughEqual(translator.translate(50), 90, EPSILON, '50');
        assert.roughEqual(translator.translate('75'), 135, EPSILON, '75');
        assert.roughEqual(translator.translate(100), 180, EPSILON, '100');
        assert.roughEqual(translator.translate(100 / 180), 1, EPSILON, '100 / 180');
        assert.roughEqual(translator.translate(17900 / 180), 179, EPSILON, '17900 / 180');
    });

    QUnit.test('translate - out of ranges', function (assert) {
        const translator = new Translator1D();
        translator.setDomain(0, 100).setCodomain(180, 0);

        assert.ok(isNaN(translator.translate(-1)), '-1');
        assert.ok(isNaN(translator.translate(101)), '101');
        assert.ok(isNaN(translator.translate(1000)), '1000');
    });

    QUnit.test('translate - not numbers', function (assert) {
        const translator = new Translator1D();
        translator.setDomain(0, 100).setCodomain(180, 0);

        assert.ok(isNaN(translator.translate(undefined)), 'undefined');
        assert.ok(isNaN(translator.translate(NaN)), 'NaN');
        assert.ok(isNaN(translator.translate('A')), 'A');
        assert.ok(isNaN(translator.translate({})), '{}');
    });

    QUnit.test('adjust', function (assert) {
        const translator = new Translator1D();
        translator.setDomain(0, 100).setCodomain(180, 0);

        assert.strictEqual(translator.adjust(0), 0, '0');
        assert.strictEqual(translator.adjust(50), 50, '50');
        assert.strictEqual(translator.adjust(100), 100, '100');
        assert.strictEqual(translator.adjust(-1), 0, '-1');
        assert.strictEqual(translator.adjust(101), 100, '101');
        assert.strictEqual(translator.adjust(-10), 0, '-10');
        assert.strictEqual(translator.adjust(1000), 100, '1000');
    });

    QUnit.test('adjust - not numbers', function (assert) {
        const translator = new Translator1D();
        translator.setDomain(0, 100).setCodomain(180, 0);

        assert.ok(isNaN(translator.adjust('A')), 'A');
        assert.ok(isNaN(translator.adjust({})), '{}');
        assert.ok(isNaN(translator.adjust(undefined)), 'undefined');
        assert.ok(isNaN(translator.adjust(NaN)), 'NaN');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["viz/translators/translator1d"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("viz/translators/translator1d"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=translator1D.tests.js.map