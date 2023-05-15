!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.localization/localization.custom.tests.js"], ["localization/number","localization/date"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.localization/localization.custom.tests.js', ['localization/number', 'localization/date'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const numberLocalization = $__require('localization/number');
    const dateLocalization = $__require('localization/date');

    QUnit.module('Custom date names', {
        beforeEach: function () {
            dateLocalization.inject({
                getMonthNames: function (format, type) {
                    if (format === 'wide' && type === 'standalone') {
                        return ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
                    }
                    if (format === 'wide' && type === 'format') {
                        return ['января', 'февраля', 'марта', 'апреля', 'май', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
                    }
                    return this.callBase(format, type);
                },
                getPeriodNames: function () {
                    return ['a. m.', 'p. m.'];
                }
            });
        },
        afterEach: function () {
            dateLocalization.resetInjection();
        }
    });

    QUnit.test('format LDML pattern with month name', function (assert) {
        assert.equal(dateLocalization.format(new Date(2015, 2, 1), 'd MMMM'), '1 марта');
        assert.equal(dateLocalization.format(new Date(2015, 2, 1), 'LLLL y'), 'март 2015');
    });

    QUnit.test('parse LDML pattern with month name', function (assert) {
        assert.deepEqual(dateLocalization.parse('1 марта 2015', 'd MMMM y'), new Date(2015, 2, 1));
        assert.deepEqual(dateLocalization.parse('1 марта 2015', 'd MMM y'), new Date(2015, 2, 1));
        assert.deepEqual(dateLocalization.parse('март 2015', 'LLLL y'), new Date(2015, 2, 1));
        assert.deepEqual(dateLocalization.parse('март 2015', 'LLL y'), new Date(2015, 2, 1));
    });

    QUnit.test('parse predefined formats with month name', function (assert) {
        assert.deepEqual(dateLocalization.parse('Sunday, марта 1, 2015', 'longdate'), new Date(2015, 2, 1));
        assert.deepEqual(dateLocalization.parse('Wrongday, марта 1, 2015', 'longdate'), new Date(2015, 2, 1));
        assert.deepEqual(dateLocalization.parse('март 2015', 'monthAndYear'), new Date(2015, 2, 1));
        assert.deepEqual(dateLocalization.parse('марта 8', 'monthAndDay'), new Date(new Date().getFullYear(), 2, 8));
        assert.deepEqual(dateLocalization.parse('март 8', 'monthAndDay'), new Date(new Date().getFullYear(), 2, 8));
        assert.deepEqual(dateLocalization.parse('март', 'month').getMonth(), 2);
        assert.deepEqual(dateLocalization.parse('марта', 'month').getMonth(), 2);
    });

    QUnit.test('parse predefined formats with period name', function (assert) {
        assert.deepEqual(dateLocalization.parse('1:23 p. m.', 'shortTime').getHours(), 13);
        assert.deepEqual(dateLocalization.parse('11/11/2015, 1:23 p. m.', 'shortDateShortTime').getHours(), 13);
    });

    QUnit.module('Custom digits', {
        beforeEach: function () {
            numberLocalization.inject({
                format: function (value, format) {
                    if (format === 'decimal' && value === 90) {
                        return '٩٠';
                    }
                    return this.callBase.apply(this, arguments);
                }
            });
        },
        afterEach: function () {
            numberLocalization.resetInjection();
        }
    });

    QUnit.test('format date by LDML pattern', function (assert) {
        const date = new Date(2015, 2, 3, 4, 5, 6, 789);
        assert.equal(dateLocalization.format(date, 'dd/MM/yyyy'), '٠٣/٠٣/٢٠١٥');
        assert.equal(dateLocalization.format(date, 'HH:mm:ss'), '٠٤:٠٥:٠٦');
        assert.equal(dateLocalization.format(date, 'SSS'), '٧٨٩');
    });

    QUnit.test('format date by predefined format', function (assert) {
        const date = new Date(2015, 2, 3, 4, 5, 6, 789);
        assert.equal(dateLocalization.format(date, 'shortDate'), '٣/٣/٢٠١٥');
        assert.equal(dateLocalization.format(date, 'millisecond'), '٧٨٩');
    });

    QUnit.test('parse date by LDML pattern', function (assert) {
        assert.deepEqual(dateLocalization.parse('٠٣/٠٥/٢٠١٥', 'dd/MM/yyyy'), new Date(2015, 4, 3));
        assert.deepEqual(dateLocalization.parse('٧٨٩', 'SSS').getMilliseconds(), 789);
    });

    QUnit.test('parse date by predefined format', function (assert) {
        assert.deepEqual(dateLocalization.parse('٠٥/٠٣/٢٠١٥', 'shortDate'), new Date(2015, 4, 3));
        assert.deepEqual(dateLocalization.parse('٧٨٩', 'millisecond').getMilliseconds(), 789);
    });

    QUnit.test('format number by LDML pattern', function (assert) {
        assert.equal(numberLocalization.format(1234.5, '#,##0.00'), '١,٢٣٤.٥٠');
    });

    QUnit.test('parse number by LDML pattern', function (assert) {
        assert.equal(numberLocalization.parse('١,٢٣٤.٥٠', '#,#0.00'), 1234.5);
    });

    QUnit.test('parse negative number in rtl mode', function (assert) {
        assert.equal(numberLocalization.parse('\u061C-١٢٣'), -123);
    });

    QUnit.module('Custom minimumGroupingDigits', {
        beforeEach: function () {
            numberLocalization.inject({
                format: function (value, format) {
                    if (format === 'fixedPoint') {
                        if (value === 1000) {
                            return '1000';
                        }
                        if (value === 10000) {
                            return '10 000';
                        }
                    }
                    return this.callBase.apply(this, arguments);
                }
            });
        },
        afterEach: function () {
            numberLocalization.resetInjection();
        }
    });

    QUnit.test('getThousandsSeparator', function (assert) {
        assert.equal(numberLocalization.getThousandsSeparator(), ' ');
    });

    QUnit.test('format number', function (assert) {
        assert.equal(numberLocalization.format(1234.5, '#,##0.00'), '1 234.50');
    });

    QUnit.test('format number with unlimitedIntegerDigits flag (for dashbords)', function (assert) {
        assert.equal(numberLocalization.format(0, { type: '0', unlimitedIntegerDigits: true }), '0');
        assert.equal(numberLocalization.format(12345.6, { type: '0', unlimitedIntegerDigits: true }), '12346');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["localization/number","localization/date"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("localization/number"), require("localization/date"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=localization.custom.tests.js.map