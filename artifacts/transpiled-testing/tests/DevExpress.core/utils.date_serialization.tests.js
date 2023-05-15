!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.date_serialization.tests.js"], ["core/utils/date_serialization","core/config"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.core/utils.date_serialization.tests.js', ['core/utils/date_serialization', 'core/config'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const dateSerialization = $__require('core/utils/date_serialization');
    const config = $__require('core/config');

    QUnit.module('date serialization tests', {
        beforeEach: function () {
            this.defaultForceIsoDateParsing = config().forceIsoDateParsing;
            config().forceIsoDateParsing = true;
        },
        afterEach: function () {
            config().forceIsoDateParsing = this.defaultForceIsoDateParsing;
        }
    });

    QUnit.test('serialization/deserialization', function (assert) {
        const date = new Date(2015, 7, 16);
        const specialDate = new Date(2015, 0, 2);
        specialDate.setFullYear(15);

        const assertData = [{
            value: date,
            serializedValue: date.valueOf()
        }, {
            value: date,
            serializedValue: '2015/08/16'
        }, {
            value: date,
            serializedValue: '2015/08/16 00:00:00'
        }, {
            value: date,
            serializedValue: '2015-08-16'
        }, {
            value: date,
            serializedValue: '2015-08-16T00:00:00',
            format: 'yyyy-MM-ddTHH:mm:ss'
        }, {
            value: new Date(21015, 7, 16, 0, 0, 0),
            serializedValue: '21015-08-16T00:00:00',
            format: 'yyyy-MM-ddTHH:mm:ss'
        }, {
            value: new Date(Date.UTC(2015, 7, 16)),
            serializedValue: '2015-08-16T00:00:00Z',
            format: 'yyyy-MM-ddTHH:mm:ssZ'
        }, {
            value: new Date(Date.UTC(2015, 7, 16, 12, 13, 14, 345)),
            serializedValue: '2015-08-16T12:13:14.345Z',
            format: 'yyyy-MM-ddTHH:mm:ss.SSSZ'
        }, {
            value: new Date(0, 0, 0, 13, 20),
            serializedValue: '13:20'
        }, {
            value: new Date(0, 0, 0, 13, 20, 15),
            serializedValue: '13:20:15'
        }, {
            value: new Date(2015, 7, 16, 15, 45, 30),
            serializedValue: '20150816T154530',
            format: 'yyyyMMddTHHmmss'
        }, {
            value: new Date(2015, 7, 16, 15, 45, 30, 345),
            serializedValue: '20150816T154530.345',
            format: 'yyyyMMddTHHmmss.SSS'
        }, {
            value: specialDate,
            serializedValue: '0015/01/02'
        }];

        assertData.forEach(function (data, index) {
            if (!data.format) {
                data.format = dateSerialization.getDateSerializationFormat(data.serializedValue);
            }

            const serializedDate = dateSerialization.serializeDate(data.value, data.format);
            const parsedDate = dateSerialization.deserializeDate(data.serializedValue);

            assert.equal(serializedDate, data.serializedValue, data.format);
            assert.equal(parsedDate.getTime(), data.value.getTime(), data.format);
        });
    });

    QUnit.test('serialization/deserialization when value is null (T420231)', function (assert) {
        const serializationFormat = dateSerialization.getDateSerializationFormat(null);
        const serializedDate = dateSerialization.serializeDate(null, serializationFormat);
        const parsedDate = dateSerialization.deserializeDate(null);

        assert.equal(serializedDate, null, 'value returned if no serialized value is specified');
        assert.equal(parsedDate, null, 'value returned if no deserialized value is specified');
    });

    QUnit.test('serialization when serializationFormat is not defined', function (assert) {
        assert.equal(dateSerialization.serializeDate(null), null, 'null value is not serialized when serializationFormat is not defined');
        assert.equal(dateSerialization.serializeDate(undefined), undefined, 'undefined value is not serialized when serializationFormat is not defined');
        assert.equal(dateSerialization.serializeDate('test'), 'test', 'string value is not serialized when serializationFormat is not defined');
        assert.equal(dateSerialization.serializeDate(undefined, ''), undefined, 'undefined value is not serialized when serializationFormat is empty string');
    });

    QUnit.test('deserializing first date (serialization format is string)', function (assert) {
        const date = new Date(1970, 0, 1);
        const value = '1970-01-01';

        const result = dateSerialization.deserializeDate(value);

        assert.deepEqual(result, date, 'date is returned');
    });

    QUnit.test('serialization ISO8601 dates', function (assert) {
        const date = new Date(2015, 3, 5, 6, 7, 25, 125);

        let timezoneOffset = -180;

        sinon.stub(date, 'getTimezoneOffset', function () {
            return timezoneOffset;
        });

        assert.equal(dateSerialization.serializeDate(null, 'yyyy-MM-dd'), null, 'null date');
        assert.equal(dateSerialization.serializeDate(date, 'yyyy-MM-dd'), '2015-04-05', '(+3:00) yyyy-MM-dd');
        assert.equal(dateSerialization.serializeDate(date, 'yyyy-MM-ddTHH:mm:ss'), '2015-04-05T06:07:25', '(+3:00) yyyy-MM-ddTHH:mm:ss');
        assert.equal(dateSerialization.serializeDate(date, 'yyyy-MM-ddTHH:mm:ss.S'), '2015-04-05T06:07:25.1', '(+3:00) yyyy-MM-ddTHH:mm:ss.S');
        assert.equal(dateSerialization.serializeDate(date, 'yyyy-MM-ddTHH:mm:ss.SSS'), '2015-04-05T06:07:25.125', '(+3:00) yyyy-MM-ddTHH:mm:ss.SSS');
        assert.equal(dateSerialization.serializeDate(date, 'yy-M-dTH:m:s'), '15-4-5T6:7:25', '(+3:00) yy-M-dTH:m:s');
        assert.equal(dateSerialization.serializeDate(date, 'y \'year\' M \'month\' d \'day\''), '2015 year 4 month 5 day', '(+3:00) y \'year\' M \'month\'d \'day\'');

        assert.equal(dateSerialization.serializeDate(new Date(Date.UTC(2015, 3, 5, 6, 7, 25, 125)), 'yyyy-MM-ddTHH:mm:ssZ'), '2015-04-05T06:07:25Z', '(+3:00) yyyy-MM-ddTHH:mm:ssZ');
        assert.equal(dateSerialization.serializeDate(date, 'Z'), 'Z', '(+3:00) Z');
        assert.equal(dateSerialization.serializeDate(date, 'ZZZZZ'), 'Z', '(+3:00) ZZZZZ');
        assert.equal(dateSerialization.serializeDate(date, 'x'), '+03', '(+3:00) x');
        assert.equal(dateSerialization.serializeDate(date, 'X'), '+03', '(+3:00) X');
        assert.equal(dateSerialization.serializeDate(date, 'xx'), '+0300', '(+3:00) xx');
        assert.equal(dateSerialization.serializeDate(date, 'XX'), '+0300', '(+3:00) XX');
        assert.equal(dateSerialization.serializeDate(date, 'xxx'), '+03:00', '(+3:00) xxx');
        assert.equal(dateSerialization.serializeDate(date, 'XXX'), '+03:00', '(+3:00) XXX');

        timezoneOffset = 210;

        assert.equal(dateSerialization.serializeDate(date, 'Z'), 'Z', '(-3:30) Z');
        assert.equal(dateSerialization.serializeDate(date, 'X'), '-0330', '(-3:30) X');
        assert.equal(dateSerialization.serializeDate(date, 'XX'), '-0330', '(-3:30) XX');
        assert.equal(dateSerialization.serializeDate(date, 'XXX'), '-03:30', '(-3:30) XXX');

        timezoneOffset = 0;

        assert.equal(dateSerialization.serializeDate(date, 'Z'), 'Z', '(0) Z');
        assert.equal(dateSerialization.serializeDate(date, 'x'), '+00', '(0) x');
        assert.equal(dateSerialization.serializeDate(date, 'X'), 'Z', '(0) X');
        assert.equal(dateSerialization.serializeDate(date, 'xx'), '+0000', '(0) xx');
        assert.equal(dateSerialization.serializeDate(date, 'XX'), 'Z', '(0) XX');
        assert.equal(dateSerialization.serializeDate(date, 'xxx'), '+00:00', '(0) xxx');
        assert.equal(dateSerialization.serializeDate(date, 'XXX'), 'Z', '(0) XXX');
    });

    QUnit.test('serialization LDML dates', function (assert) {
        const date = new Date(2015, 3, 5, 6, 7, 25, 125);
        const datePm = new Date(2015, 3, 5, 18, 7, 25, 125);
        const dateMidday = new Date(2015, 3, 5, 12);

        assert.equal(dateSerialization.serializeDate(date, 'd/M/yyyy'), '5/4/2015', 'date with numeric one letter month and date');
        assert.equal(dateSerialization.serializeDate(date, 'dd/MM/yyyy'), '05/04/2015', 'date with numeric two letter month and date');
        assert.equal(dateSerialization.serializeDate(date, 'd MMM yyyy'), '5 Apr 2015', 'date with short month');
        assert.equal(dateSerialization.serializeDate(date, 'd MMMM yyyy'), '5 April 2015', 'date with long month');
        assert.equal(dateSerialization.serializeDate(date, 'E d MMM yyyy'), 'Sun 5 Apr 2015', 'date with day of week');
        assert.equal(dateSerialization.serializeDate(date, 'yyyy Q'), '2015 2', 'date with numeric quarter');
        assert.equal(dateSerialization.serializeDate(date, 'yyyy QQQ'), '2015 Q2', 'date with short quarter');

        assert.equal(dateSerialization.serializeDate(date, 'H:mm'), '6:07', 'time with one letter hours');
        assert.equal(dateSerialization.serializeDate(date, 'HH:mm'), '06:07', 'time with two letter hours AM');
        assert.equal(dateSerialization.serializeDate(datePm, 'HH:mm'), '18:07', 'time with two letter hours PM');
        assert.equal(dateSerialization.serializeDate(date, 'h:mm a'), '6:07 AM', 'time with 12 hours format AM');
        assert.equal(dateSerialization.serializeDate(datePm, 'h:mm a'), '6:07 PM', 'time with 12 hours format PM');
        assert.equal(dateSerialization.serializeDate(dateMidday, 'h:mm a'), '12:00 PM', 'time with 12 hours format Midday');

        assert.equal(dateSerialization.serializeDate(date, 'H:mm:ss.SSS'), '6:07:25.125', 'time with seconds and millisecond');
    });

    QUnit.test('get serialization format for ISO8601 dates', function (assert) {
        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05'), 'yyyy-MM-dd');
        assert.equal(dateSerialization.getDateSerializationFormat('20150405'), 'yyyyMMdd');
        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05T06:07'), 'yyyy-MM-ddTHH:mm');
        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05T06:07:25'), 'yyyy-MM-ddTHH:mm:ss');
        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05T06:07:25.125'), 'yyyy-MM-ddTHH:mm:ss.SSS', '(+3:00) yyyy-MM-ddTHH:mm:ss.SSS');
        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05T06:07:25Z'), 'yyyy-MM-ddTHH:mm:ss\'Z\'');
        assert.equal(dateSerialization.getDateSerializationFormat('20150405T060725'), 'yyyyMMddTHHmmss');
        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05T06:07:25+03'), 'yyyy-MM-ddTHH:mm:ssx');
        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05T06:07:25+0330'), 'yyyy-MM-ddTHH:mm:ssxx');
        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05T06:07:25+03:30'), 'yyyy-MM-ddTHH:mm:ssxxx');
        assert.equal(dateSerialization.getDateSerializationFormat('12:13'), 'HH:mm');
        assert.equal(dateSerialization.getDateSerializationFormat('12:13:14'), 'HH:mm:ss');
    });

    QUnit.test('get serialization format for ISO8601 dates when forceIsoDateParsing disabled', function (assert) {
        config().forceIsoDateParsing = false;

        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05'), 'yyyy/MM/dd');
        assert.equal(dateSerialization.getDateSerializationFormat('20150405'), 'yyyy/MM/dd');
        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05T06:07'), 'yyyy/MM/dd HH:mm:ss');
        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05T06:07:25'), 'yyyy/MM/dd HH:mm:ss');
        assert.equal(dateSerialization.getDateSerializationFormat('2015-04-05T06:07:25Z'), 'yyyy/MM/dd HH:mm:ss');
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
//# sourceMappingURL=utils.date_serialization.tests.js.map