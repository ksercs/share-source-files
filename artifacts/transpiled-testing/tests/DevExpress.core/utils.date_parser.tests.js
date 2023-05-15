!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.date_parser.tests.js"], ["core/utils/date_serialization","core/config"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.core/utils.date_parser.tests.js', ['core/utils/date_serialization', 'core/config'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const dateSerialization = $__require('core/utils/date_serialization');
    const config = $__require('core/config');

    QUnit.module('Default DX Formats');

    QUnit.test('date parsing with number format', function (assert) {
        const value = new Date(2017, 0, 20);
        const numberValue = value.getTime();

        const parsedDate = dateSerialization.dateParser(numberValue);

        assert.equal(parsedDate, numberValue);
    });

    QUnit.test('date parsing with yyyy/MM/dd format', function (assert) {
        const value = new Date(2017, 0, 20);
        const stringValue = '2017/01/20';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy/MM/dd HH:mm:ss format', function (assert) {
        const value = new Date(2017, 0, 20, 11, 26);
        const stringValue = '2017/01/20 11:26:00';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.module('ISO8601 Time Formats');

    QUnit.test('date parsing with yyyy-MM-dd', function (assert) {
        const value = new Date(2017, 0, 20);
        const stringValue = '2017-01-20';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh', function (assert) {
        const value = new Date(2017, 0, 20, 11);
        const stringValue = '2017-01-20T11';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm', function (assert) {
        const value = new Date(2017, 0, 20, 11, 12);
        const stringValue = '2017-01-20T11:12';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm:ss', function (assert) {
        const value = new Date(2017, 0, 20, 11, 12, 13);
        const stringValue = '2017-01-20T11:12:13';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm:ss.SSS', function (assert) {
        const value = new Date(2017, 0, 20, 11, 12, 13, 789);
        const stringValue = '2017-01-20T11:12:13.789';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm:ss.SSSSSS', function (assert) {
        const value = new Date(2017, 0, 20, 11, 12, 13, 123);
        const stringValue = '2017-01-20T11:12:13.123456';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.getTime(), value.getTime());
    });

    QUnit.test('date parsing if the year is below \'0100\' (T1025085)', function (assert) {
        const stringValue = '0021-01-20T01:00:00';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.getFullYear(), 21);
    });

    QUnit.module('ISO8601 Time Only Formats', {
        beforeEach: function () {
            this.defaultForceIsoDateParsing = config().forceIsoDateParsing;
            config().forceIsoDateParsing = true;
        },
        afterEach: function () {
            config().forceIsoDateParsing = this.defaultForceIsoDateParsing;
        }
    });

    QUnit.test('date parsing with hh:mm', function (assert) {
        const value = new Date(0, 0, 0, 11, 12);
        const stringValue = '11:12';

        const parsedDate = dateSerialization.deserializeDate(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with hh:mm:ss', function (assert) {
        const value = new Date(0, 0, 0, 11, 12, 13);
        const stringValue = '11:12:13';

        const parsedDate = dateSerialization.deserializeDate(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.module('UTC Time Formats with designator(Z)');

    QUnit.test('date parsing with yyyy-MM-ddThhZ', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 11));
        const stringValue = '2017-01-20T11Z';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mmZ', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 11, 12));
        const stringValue = '2017-01-20T11:12Z';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm:ssZ', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 11, 12, 13));
        const stringValue = '2017-01-20T11:12:13Z';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm:ss.SSSZ', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 11, 12, 13, 100));
        const stringValue = '2017-01-20T11:12:13.1Z';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
        assert.equal(parsedDate.toISOString(), value.toISOString());
    });

    QUnit.module('UTC Time Formats with plus(-) timezone');

    QUnit.test('date parsing with yyyy-MM-ddThh-hh', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 12));
        const stringValue = '2017-01-20T11-01';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThhZ-hh:mm', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 12, 30));
        const stringValue = '2017-01-20T11-01:30';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm-hh', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 12, 12));
        const stringValue = '2017-01-20T11:12-01';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm-hh:mm', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 12, 42));
        const stringValue = '2017-01-20T11:12-01:30';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm:ss-hh', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 12, 12, 13));
        const stringValue = '2017-01-20T11:12:13-01';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm:ss-hh:mm', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 12, 42, 13));
        const stringValue = '2017-01-20T11:12:13-01:30';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.module('UTC Time Formats with minus(+) timezone');

    QUnit.test('date parsing with yyyy-MM-ddThh+hh', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 10));
        const stringValue = '2017-01-20T11+01';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh+hh:mm', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 9, 30));
        const stringValue = '2017-01-20T11+01:30';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm+hh', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 10, 12));
        const stringValue = '2017-01-20T11:12+01';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm+hh:mm', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 9, 42));
        const stringValue = '2017-01-20T11:12+01:30';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm:ss+hh', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 10, 12, 13));
        const stringValue = '2017-01-20T11:12:13+01';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });

    QUnit.test('date parsing with yyyy-MM-ddThh:mm:ss+hh:mm', function (assert) {
        const value = new Date(Date.UTC(2017, 0, 20, 9, 42, 13));
        const stringValue = '2017-01-20T11:12:13+01:30';

        const parsedDate = dateSerialization.dateParser(stringValue);

        assert.equal(parsedDate.toString(), value.toString());
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/date_serialization","core/config"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/date_serialization"), require("core/config"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.date_parser.tests.js.map