!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.data/odataCommonOData.tests.js"], ["jquery","data/odata/utils","core/guid"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.data/odataCommonOData.tests.js', ['jquery', 'data/odata/utils', 'core/guid'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const converters = $__require('data/odata/utils').keyConverters;
    const interpretJsonFormat = $__require('data/odata/utils').OData__internals.interpretJsonFormat;
    const Guid = $__require('core/guid');

    QUnit.module('OData 2');
    QUnit.test('key converters', function (assert) {
        assert.equal(converters.String(1), '1', 'string');
        assert.equal(converters.String('foo'), 'foo', 'string');
        assert.equal(converters.Int32(1), 1, 'Int32');
        assert.equal(converters.Int32(1.1), 1, 'Int32');
        assert.equal(converters.Int64(1).valueOf(), '1L', 'Int64');
        assert.equal(converters.Int64('1').valueOf(), '1L', 'Int64');
        assert.equal(converters.Guid('00000000000000000000000000000000').valueOf(), '00000000-0000-0000-0000-000000000000', 'Guid');
        assert.equal(converters.Boolean(), false, 'Boolean');
        assert.equal(converters.Boolean(1), true, 'Boolean');
        assert.equal(converters.Boolean(0), false, 'Boolean');
        assert.equal(converters.Boolean(true), true, 'Boolean');
        assert.equal(converters.Boolean(false), false, 'Boolean');
        assert.equal(converters.Single(1).valueOf(), '1f', 'Single');
        assert.equal(converters.Single(1.1).valueOf(), '1.1f', 'Single');
        assert.equal(converters.Single(-1.1).valueOf(), '-1.1f', 'Single');
        assert.equal(converters.Decimal(1).valueOf(), '1m', 'Decimal');
        assert.equal(converters.Decimal(1.1).valueOf(), '1.1m', 'Decimal');
        assert.equal(converters.Decimal(-1.1).valueOf(), '-1.1m', 'Decimal');
    });

    QUnit.test('error', function (assert) {
        const e = {
            error: {
                message: 'Something goes wrong'
            }
        };

        const r = interpretJsonFormat(e, 'success');

        assert.ok(r.error);
        assert.equal(r.error.message, 'Something goes wrong');
    });

    QUnit.test('list', function (assert) {
        const a = {
            d: {
                results: [1, 2, 3]
            }
        };

        const r = interpretJsonFormat(a, 'success');

        assert.ok(r.data);
        assert.deepEqual(r.data, [1, 2, 3]);
    });

    QUnit.test('single', function (assert) {
        const a = {
            d: { foo: 'bar' }
        };

        const r = interpretJsonFormat(a, 'success');

        assert.ok(r.data);
        assert.deepEqual(r.data, { foo: 'bar' });
    });

    QUnit.test('count', function (assert) {
        const a1 = {
            d: { results: [1, 2, 4], __count: '3' }
        };
        const a2 = {
            d: { results: [1, 2, 4], __count: 3 }
        };
        const a3 = {
            d: { results: [1, 2, 4], __count: 'StringValue' }
        };
        const a4 = {
            d: { results: [1, 2, 4] }
        };

        const t1 = interpretJsonFormat(a1, 'success');
        const t2 = interpretJsonFormat(a2, 'success');
        const t3 = interpretJsonFormat(a3, 'success');
        const t4 = interpretJsonFormat(a4, 'success');

        assert.equal(t1.count, 3);
        assert.equal($.type(t1.count), 'number');

        assert.equal(t2.count, 3);
        assert.equal($.type(t2.count), 'number');

        assert.ok(!t3.count);
        assert.ok(!t4.count);
    });

    QUnit.module('OData 3');
    QUnit.test('error', function (assert) {
        const e = {
            'odata.error': {
                message: 'Something goes wrong'
            }
        };

        const r = interpretJsonFormat(e, 'success');

        assert.ok(r.error);
        assert.equal(r.error.message, 'Something goes wrong');
    });

    QUnit.module('OData 4');
    QUnit.test('key converters', function (assert) {
        assert.equal(converters.String(1), '1', 'string');
        assert.equal(converters.String('foo'), 'foo', 'string');
        assert.equal(converters.Int32(1), 1, 'Int32');
        assert.equal(converters.Int32(1.1), 1, 'Int32');
        assert.equal(converters.Int64(1).valueOf(), '1L', 'Int64');
        assert.equal(converters.Int64('1').valueOf(), '1L', 'Int64');
        assert.equal(converters.Guid('00000000000000000000000000000000').valueOf(), '00000000-0000-0000-0000-000000000000', 'Guid');
        assert.equal(converters.Boolean(), false, 'Boolean');
        assert.equal(converters.Boolean(1), true, 'Boolean');
        assert.equal(converters.Boolean(0), false, 'Boolean');
        assert.equal(converters.Boolean(true), true, 'Boolean');
        assert.equal(converters.Boolean(false), false, 'Boolean');
        assert.equal(converters.Single(1).valueOf(), '1f', 'Single');
        assert.equal(converters.Single(1.1).valueOf(), '1.1f', 'Single');
        assert.equal(converters.Single(-1.1).valueOf(), '-1.1f', 'Single');
        assert.equal(converters.Decimal(1).valueOf(), '1m', 'Decimal');
        assert.equal(converters.Decimal(1.1).valueOf(), '1.1m', 'Decimal');
        assert.equal(converters.Decimal(-1.1).valueOf(), '-1.1m', 'Decimal');
    });

    QUnit.test('error', function (assert) {
        const e = {
            '@odata.error': {
                message: 'Something goes wrong'
            }
        };

        const r = interpretJsonFormat(e, 'success');

        assert.ok(r.error);
        assert.equal(r.error.message, 'Something goes wrong');
    });

    QUnit.test('list', function (assert) {
        const a = {
            value: [1, 2, 3]
        };

        const r = interpretJsonFormat(a, 'success');

        assert.ok(r.data);
        assert.deepEqual(r.data, [1, 2, 3]);
    });

    QUnit.test('single', function (assert) {
        const a = { foo: 'bar' };

        const r = interpretJsonFormat(a, 'success');

        assert.ok(r.data);
        assert.deepEqual(r.data, { foo: 'bar' });
    });

    QUnit.test('count', function (assert) {
        const a1 = { value: [1, 2, 4], '@odata.count': '3' };
        const a2 = { value: [1, 2, 4], '@odata.count': 3 };
        const a3 = { value: [1, 2, 4], '@odata.count': 'StringValue' };
        const a4 = { value: [1, 2, 4] };

        const t1 = interpretJsonFormat(a1, 'success');
        const t2 = interpretJsonFormat(a2, 'success');
        const t3 = interpretJsonFormat(a3, 'success');
        const t4 = interpretJsonFormat(a4, 'success');

        assert.equal(t1.count, 3);
        assert.equal($.type(t1.count), 'number');

        assert.equal(t2.count, 3);
        assert.equal($.type(t2.count), 'number');

        assert.ok(!t3.count);
        assert.ok(!t4.count);
    });

    QUnit.module('Guids');
    QUnit.test('Should parse guids', function (assert) {
        const guid1 = '6fd3d2c5-904d-4e6f-a302-3e277ef36630';
        const guid2 = '27309478-e811-4205-a23f-cfc0e63b4daf';

        const r = interpretJsonFormat({
            'value': {
                key: guid1,
                property: new Guid(guid2).valueOf()
            }
        }, 'success');

        assert.ok(r.data.key instanceof Guid);
        assert.ok(r.data.property instanceof Guid);

        assert.equal(r.data.key.valueOf(), guid1);
        assert.equal(r.data.property.valueOf(), guid2);
    });

    QUnit.module('Primitives');
    QUnit.test('OData 2 & 3', function (assert) {
        // NOTE: http://www.odata.org/documentation/odata-version-2-0/json-format/#RepresentingPrimitiveProperties

        function interpret(value) {
            const result = interpretJsonFormat({ d: { results: value } }, 'success');
            return result.data;
        }

        assert.strictEqual(interpret(0), 0, 'Zero');

        assert.strictEqual(interpret(1), 1, 'Positive integer');
        assert.strictEqual(interpret(-1), -1, 'Negative integer');

        assert.strictEqual(interpret(1.1), 1.1, 'Positive float');
        assert.strictEqual(interpret(-1.1), -1.1, 'Negative float');

        assert.strictEqual(interpret(true), true, 'true');
        assert.strictEqual(interpret(false), false, 'false');

        assert.strictEqual(interpret(''), '', 'Empty string');
        assert.strictEqual(interpret('string'), 'string', 'Non-empty string');
    });

    QUnit.test('OData 4', function (assert) {
        function interpret(value) {
            const result = interpretJsonFormat({ value: value }, 'success');
            return result.data;
        }

        assert.strictEqual(interpret(0), 0, 'Zero');

        assert.strictEqual(interpret(1), 1, 'Positive integer');
        assert.strictEqual(interpret(-1), -1, 'Negative integer');

        assert.strictEqual(interpret(1.1), 1.1, 'Positive float');
        assert.strictEqual(interpret(-1.1), -1.1, 'Negative float');

        assert.strictEqual(interpret(true), true, 'true');
        assert.strictEqual(interpret(false), false, 'false');

        assert.strictEqual(interpret(''), '', 'Empty string');
        assert.strictEqual(interpret('string'), 'string', 'Non-empty string');
    });

    QUnit.module('Dates');
    QUnit.test('All formats', function (assert) {
        function parseDate(date) {
            return interpretJsonFormat({ d: date }, 'success').data.d.getTime();
        }

        assert.equal(parseDate('/Date(-777807300000)/'), new Date(1945, 4, 9, 14, 25, 0, 0).getTime());
        assert.equal(parseDate('/Date(-777807300000-10)/'), new Date(1945, 4, 9, 14, 15, 0, 0).getTime());
        assert.equal(parseDate('/Date(-777807300000+10)/'), new Date(1945, 4, 9, 14, 35, 0, 0).getTime());

        assert.equal(parseDate('1945-05-09T14:25:12'), new Date(1945, 4, 9, 14, 25, 12, 0).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.1'), new Date(1945, 4, 9, 14, 25, 12, 100).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.12'), new Date(1945, 4, 9, 14, 25, 12, 120).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.123'), new Date(1945, 4, 9, 14, 25, 12, 123).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.1234567'), new Date(1945, 4, 9, 14, 25, 12, 123).getTime());

        assert.equal(parseDate('1945-05-09T14:25:12Z'), new Date(1945, 4, 9, 14, 25, 12, 0).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.1Z'), new Date(1945, 4, 9, 14, 25, 12, 100).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.12Z'), new Date(1945, 4, 9, 14, 25, 12, 120).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.123Z'), new Date(1945, 4, 9, 14, 25, 12, 123).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.1234567Z'), new Date(1945, 4, 9, 14, 25, 12, 123).getTime());

        assert.equal(parseDate('1945-05-09T14:25:12-01'), new Date(1945, 4, 9, 14, 25, 12, 0).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12+01'), new Date(1945, 4, 9, 14, 25, 12, 0).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12-0110'), new Date(1945, 4, 9, 14, 25, 12, 0).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12+0110'), new Date(1945, 4, 9, 14, 25, 12, 0).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12-01:10'), new Date(1945, 4, 9, 14, 25, 12, 0).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12+01:10'), new Date(1945, 4, 9, 14, 25, 12, 0).getTime());

        assert.equal(parseDate('1945-05-09T14:25:12.123-01'), new Date(1945, 4, 9, 14, 25, 12, 123).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.123+01'), new Date(1945, 4, 9, 14, 25, 12, 123).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.123-0110'), new Date(1945, 4, 9, 14, 25, 12, 123).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.123+0110'), new Date(1945, 4, 9, 14, 25, 12, 123).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.123-01:10'), new Date(1945, 4, 9, 14, 25, 12, 123).getTime());
        assert.equal(parseDate('1945-05-09T14:25:12.123+01:10'), new Date(1945, 4, 9, 14, 25, 12, 123).getTime());
    });

    QUnit.test('OData 2', function (assert) {
        // arrange
        const scalarResponse = { d: { results: '/Date(-777807300000)/' } };
        const singleResponse = { d: { date: '/Date(-777807300000)/' } };
        const collectionResponse = {
            d: [{ date: '/Date(-777807300000)/' }, { date: '/Date(-777807300000+10)/' }, { date: '/Date(-777807300000-10)/' }]
        };

        // act
        const scalarResult = interpretJsonFormat(scalarResponse, 'success');
        const singleResult = interpretJsonFormat(singleResponse, 'success');
        const collectionResult = interpretJsonFormat(collectionResponse, 'success');

        // assert
        assert.equal(scalarResult.data.getTime(), new Date(1945, 4, 9, 14, 25, 0, 0).getTime());

        assert.equal(singleResult.data.date.getTime(), new Date(1945, 4, 9, 14, 25, 0, 0).getTime());

        assert.equal(collectionResult.data[0].date.getTime(), new Date(1945, 4, 9, 14, 25, 0, 0).getTime());
        assert.equal(collectionResult.data[1].date.getTime(), new Date(1945, 4, 9, 14, 35, 0, 0).getTime(), 'with positive offset');
        assert.equal(collectionResult.data[2].date.getTime(), new Date(1945, 4, 9, 14, 15, 0, 0).getTime(), 'with negative offset');
    });

    QUnit.test('OData 3', function (assert) {
        // arrange
        const scalarResponse = { value: '1945-05-09T14:25:00' };
        const singleResponse = { value: { date: '1945-05-09T14:25:00' } };
        const collectionResponse = {
            value: [{ date: '1945-05-09T14:25:00' }, { date: '1945-05-09T14:25:00.73' }]
        };

        // act
        const scalarResult = interpretJsonFormat(scalarResponse, 'success');
        const singleResult = interpretJsonFormat(singleResponse, 'success');
        const collectionResult = interpretJsonFormat(collectionResponse, 'success');

        // assert
        assert.equal(scalarResult.data.getTime(), new Date(1945, 4, 9, 14, 25, 0, 0).getTime());

        assert.equal(singleResult.data.date.getTime(), new Date(1945, 4, 9, 14, 25, 0, 0).getTime());

        assert.equal(collectionResult.data[0].date.getTime(), new Date(1945, 4, 9, 14, 25, 0, 0).getTime());
        assert.equal(collectionResult.data[1].date.getTime(), new Date(1945, 4, 9, 14, 25, 0, 730).getTime(), 'with ms');
    });

    QUnit.test('OData 4', function (assert) {
        // arrange
        const scalarResponse = { value: '1945-05-09T14:25:00Z' };
        const singleResponse = { value: { date: '1945-05-09T14:25:00Z' } };
        const collectionResponse = {
            value: [{ date: '1945-05-09T14:25:00Z' }, { date: '1945-05-09T14:25:00.73Z' }]
        };

        // act
        const scalarResult = interpretJsonFormat(scalarResponse, 'success');
        const singleResult = interpretJsonFormat(singleResponse, 'success');
        const collectionResult = interpretJsonFormat(collectionResponse, 'success');

        // assert
        assert.equal(scalarResult.data.getTime(), new Date(1945, 4, 9, 14, 25, 0, 0).getTime());

        assert.equal(singleResult.data.date.getTime(), new Date(1945, 4, 9, 14, 25, 0, 0).getTime());

        assert.equal(collectionResult.data[0].date.getTime(), new Date(1945, 4, 9, 14, 25, 0, 0).getTime());
        assert.equal(collectionResult.data[1].date.getTime(), new Date(1945, 4, 9, 14, 25, 0, 730).getTime(), 'with ms');
    });

    QUnit.test('T211239: ODataStore doesn\'t parse second fraction properly', function (assert) {
        const interpret = function (dateStr) {
            return interpretJsonFormat({ value: [{ date: dateStr }] }, 'success');
        };

        const r1 = interpret('2015-01-30T08:35:46.1686789Z');
        assert.equal(r1.data[0].date.getTime(), new Date(2015, 0, 30, 8, 35, 46, 168).getTime());

        const r2 = interpret('2015-01-30T08:35:46.1Z');
        assert.equal(r2.data[0].date.getTime(), new Date(2015, 0, 30, 8, 35, 46, 100).getTime());

        const r3 = interpret('2015-01-30T08:35:46.01Z');
        assert.equal(r3.data[0].date.getTime(), new Date(2015, 0, 30, 8, 35, 46, 10).getTime());

        const r4 = interpret('2015-01-30T08:35:46.011Z');
        assert.equal(r4.data[0].date.getTime(), new Date(2015, 0, 30, 8, 35, 46, 11).getTime());

        const r5 = interpret('2015-01-30T08:35:46.001Z');
        assert.equal(r5.data[0].date.getTime(), new Date(2015, 0, 30, 8, 35, 46, 1).getTime());
    });

    QUnit.test('T345624: The parseISO8601 function returns incorrect data for February 29 in a leap year', function (assert) {
        const r = interpretJsonFormat({
            value: [{ date: '2016-02-29T23:59:59.999Z' }]
        }, 'success');

        assert.equal(r.data[0].date.getTime(), new Date(2016, 1, 29, 23, 59, 59, 999).getTime());
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","data/odata/utils","core/guid"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("data/odata/utils"), require("core/guid"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=odataCommonOData.tests.js.map