!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.utils/utils.formatHelper.tests.js"], ["format_helper"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.utils/utils.formatHelper.tests.js', ['format_helper'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const formatHelper = $__require('format_helper');
    const getDateFormatByTickInterval = formatHelper.getDateFormatByTickInterval;

    function checkDateWithFormat(date, format, expected, assert) {
        assert.equal(formatHelper.format(date, format), expected, 'Check formatted date');
    }

    QUnit.module('Get Date Format by ticks', {
        beforeEach: function () {
            this.getDateFormatByTicks = function (ticks) {
                return formatHelper.getDateFormatByTicks(ticks);
            };
        }
    });

    QUnit.test('short date and hour, minute, second', function (assert) {
        const date = new Date(2010, 5, 3, 4, 11, 34, 0);
        const format = this.getDateFormatByTicks([date]);

        checkDateWithFormat(date, format, '6/3/2010 4:11:34 AM', assert);
    });

    QUnit.test('short date and hour, minute, millisecond', function (assert) {
        const date = new Date(2010, 5, 3, 4, 0, 0, 770);
        const format = this.getDateFormatByTicks([date]);

        checkDateWithFormat(date, format, '6/3/2010 4:00 AM 770', assert);
    });

    QUnit.test('short date and hour, minute', function (assert) {
        const date = new Date(2010, 5, 3, 4, 11, 0, 0);
        const format = this.getDateFormatByTicks([date]);

        checkDateWithFormat(date, format, '6/3/2010 4:11 AM', assert);
    });

    QUnit.test('short date', function (assert) {
        const date = new Date(2010, 5, 3);
        const format = this.getDateFormatByTicks([date]);

        checkDateWithFormat(date, format, '6/3/2010', assert);
    });

    QUnit.test('Hour, minute, second', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 11, 41);
        const date2 = new Date(2010, 2, 3, 4, 21, 44);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, '4:11:41 AM', assert);
    });

    QUnit.test('Millisecond', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 2, 3, 4, 11, 41, 50);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, '033', assert);
    });

    QUnit.test('Hour, minute', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 11, 44);
        const date2 = new Date(2010, 2, 3, 4, 21, 44);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, '4:11 AM', assert);
    });

    QUnit.test('Day and hour, minute', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 54, 44);
        const date2 = new Date(2010, 2, 4, 8, 1, 44);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, 'Wednesday, 3 4:54 AM', assert);
    });

    QUnit.test('Day and hour, minute, second', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 54, 44);
        const date2 = new Date(2010, 2, 4, 8, 1, 10);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, 'Wednesday, 3 4:54:44 AM', assert);
    });

    QUnit.test('Day', function (assert) {
        const date1 = new Date(2010, 2, 3);
        const date2 = new Date(2010, 2, 11);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, 'Wednesday, 3', assert);
    });

    QUnit.test('Month and day, hour, minute, second', function (assert) {
        const date1 = new Date(2010, 2, 30, 1, 23, 12);
        const date2 = new Date(2010, 3, 2, 3, 53, 15);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, 'March 30 1:23:12 AM', assert);
    });

    QUnit.test('Month and day, hour, minute', function (assert) {
        const date1 = new Date(2010, 2, 30, 1, 23, 12);
        const date2 = new Date(2010, 3, 2, 3, 53, 12);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, 'March 30 1:23 AM', assert);
    });

    QUnit.test('Month and day', function (assert) {
        const date1 = new Date(2010, 2, 30);
        const date2 = new Date(2010, 3, 2);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, 'March 30', assert);
    });

    QUnit.test('Month', function (assert) {
        const date1 = new Date(2010, 2, 30);
        const date2 = new Date(2010, 3, 30);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, 'March', assert);
    });

    QUnit.test('Year, month, day, hour, minute, second', function (assert) {
        const date1 = new Date(2010, 2, 30, 3, 34, 23);
        const date2 = new Date(2012, 3, 2, 5, 45, 21);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, '3/30/2010 3:34:23 AM', assert);
    });

    QUnit.test('Year, month, day, hour, minute', function (assert) {
        const date1 = new Date(2010, 2, 30, 3, 34, 23);
        const date2 = new Date(2012, 3, 2, 5, 45, 23);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, '3/30/2010 3:34 AM', assert);
    });

    QUnit.test('Year, month, day', function (assert) {
        const date1 = new Date(2010, 2, 30, 3, 34, 23);
        const date2 = new Date(2012, 3, 2, 3, 34, 23);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, '3/30/2010', assert);
    });

    QUnit.test('Year, month', function (assert) {
        const date1 = new Date(2010, 2, 30, 3, 34, 23);
        const date2 = new Date(2012, 3, 30, 3, 34, 23);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, 'March 2010', assert);
    });

    QUnit.test('Year', function (assert) {
        const date1 = new Date(2010, 2, 30);
        const date2 = new Date(2012, 2, 30);
        const format = this.getDateFormatByTicks([date1, date2]);

        checkDateWithFormat(date1, format, '2010', assert);
    });

    QUnit.module('Get Date Format by Tick Interval');

    QUnit.test('Year delta, no tickInterval', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 11, 41, 33);
        const date2 = new Date(2011, 2, 3, 4, 21, 44, 12);
        const format = getDateFormatByTickInterval(date1, date2, 0);

        checkDateWithFormat(date1, format, '3/3/2010 4:11:41 AM', assert);
    });

    QUnit.test('Month delta, no tickInterval', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 3, 3, 4, 21, 44, 12);
        const format = getDateFormatByTickInterval(date1, date2, 0);

        checkDateWithFormat(date1, format, 'March 3 4:11:41 AM', assert);
    });

    QUnit.test('Day delta, no tickInterval', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 2, 10, 4, 21, 44, 12);
        const format = getDateFormatByTickInterval(date1, date2, 0);

        checkDateWithFormat(date1, format, 'Wednesday, 3 4:11:41 AM', assert);
    });

    QUnit.test('Hour delta, no tickInterval', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 2, 3, 8, 21, 44, 12);
        const format = getDateFormatByTickInterval(date1, date2, 0);

        checkDateWithFormat(date1, format, '4:11:41 AM', assert);
    });

    QUnit.test('Minute delta, no tickInterval', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 2, 3, 4, 21, 44, 12);
        const format = getDateFormatByTickInterval(date1, date2, 0);

        checkDateWithFormat(date1, format, '4:11:41 AM', assert);
    });

    QUnit.test('Second delta, no tickInterval', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 2, 3, 4, 11, 44, 12);
        const format = getDateFormatByTickInterval(date1, date2, 0);

        checkDateWithFormat(date1, format, '4:11:41 AM', assert);
    });

    QUnit.test('tickInterval as object', function (assert) {
        const date1 = new Date(2010, 2, 3, 4, 11, 41, 33);
        const date2 = new Date(2011, 2, 3, 4, 21, 44, 12);
        const format = getDateFormatByTickInterval(date1, date2, { month: 2, days: 5 });

        checkDateWithFormat(date1, format, 'March 2010', assert);
    });

    QUnit.test('Year delta, custom tickInterval', function (assert) {
        const date1 = new Date(2010, 3, 3, 4, 11, 41, 33);
        const date2 = new Date(2011, 3, 3, 4, 21, 44, 12);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2 2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'month'), 'April 2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'week'), '4/3/2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'day'), '4/3/2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hour'), '4/3/2010 4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minute'), '4/3/2010 4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'second'), '4/3/2010 4:11:41 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'millisecond'), '4/3/2010 4:11:41 AM 033', assert);
    });

    QUnit.test('Month delta, custom tickInterval', function (assert) {
        const date1 = new Date(2010, 3, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 4, 3, 4, 21, 44, 12);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'month'), 'April', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'week'), 'April 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'day'), 'April 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hour'), 'April 3 4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minute'), 'April 3 4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'second'), 'April 3 4:11:41 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'millisecond'), 'April 3 4:11:41 AM 033', assert);
    });

    QUnit.test('Day delta, custom tickInterval', function (assert) {
        const date1 = new Date(2010, 3, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 3, 10, 4, 21, 44, 12);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'month'), 'April', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'week'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'day'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hour'), 'Saturday, 3 4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minute'), 'Saturday, 3 4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'second'), 'Saturday, 3 4:11:41 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'millisecond'), 'Saturday, 3 4:11:41 AM 033', assert);
    });

    QUnit.test('Hour delta, custom tickInterval', function (assert) {
        const date1 = new Date(2010, 3, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 3, 3, 8, 21, 44, 12);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'month'), 'April', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'week'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'day'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hour'), '4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minute'), '4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'second'), '4:11:41 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'millisecond'), '4:11:41 AM 033', assert);
    });

    QUnit.test('Minute delta, custom tickInterval', function (assert) {
        const date1 = new Date(2010, 3, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 3, 3, 4, 21, 44, 12);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'month'), 'April', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'week'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'day'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hour'), '4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minute'), '4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'second'), '4:11:41 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'millisecond'), '4:11:41 AM 033', assert);
    });

    QUnit.test('Second delta, custom tickInterval', function (assert) {
        const date1 = new Date(2010, 3, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 3, 3, 4, 11, 44, 12);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'month'), 'April', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'week'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'day'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hour'), '4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minute'), '4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'second'), '4:11:41 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'millisecond'), '4:11:41 AM 033', assert);
    });

    QUnit.test('Millisecond delta, custom tickInterval', function (assert) {
        const date1 = new Date(2010, 3, 3, 4, 11, 41, 33);
        const date2 = new Date(2010, 3, 3, 4, 11, 41, 50);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'month'), 'April', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'week'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'day'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hour'), '4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minute'), '4:11 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'second'), '4:11:41 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'millisecond'), '033', assert);
    });

    // B230770
    QUnit.test('Year delta when maxDate at start year', function (assert) {
        const date1 = new Date(2010, 3, 3);
        const date2 = new Date(2011, 0, 1);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'month'), 'April', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'week'), 'April 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'day'), 'April 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hour'), 'April 3 12:00 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minute'), 'April 3 12:00 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'second'), 'April 3 12:00:00 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'millisecond'), 'April 3 12:00:00 AM 000', assert);
    });

    QUnit.test('Year delta when maxDate at start year. inverted', function (assert) {
        const date1 = new Date(2011, 0, 1);
        const date2 = new Date(2010, 3, 3);

        checkDateWithFormat(date2, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date2, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2', assert);
        checkDateWithFormat(date2, getDateFormatByTickInterval(date1, date2, 'month'), 'April', assert);
        checkDateWithFormat(date2, getDateFormatByTickInterval(date1, date2, 'week'), 'April 3', assert);
        checkDateWithFormat(date2, getDateFormatByTickInterval(date1, date2, 'day'), 'April 3', assert);
        checkDateWithFormat(date2, getDateFormatByTickInterval(date1, date2, 'hour'), 'April 3 12:00 AM', assert);
        checkDateWithFormat(date2, getDateFormatByTickInterval(date1, date2, 'minute'), 'April 3 12:00 AM', assert);
        checkDateWithFormat(date2, getDateFormatByTickInterval(date1, date2, 'second'), 'April 3 12:00:00 AM', assert);
        checkDateWithFormat(date2, getDateFormatByTickInterval(date1, date2, 'millisecond'), 'April 3 12:00:00 AM 000', assert);
    });

    QUnit.test('Month delta when maxDate at start month', function (assert) {
        const date1 = new Date(2010, 3, 3);
        const date2 = new Date(2010, 4, 1);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'month'), 'April', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'week'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'day'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hour'), 'Saturday, 3 12:00 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minute'), 'Saturday, 3 12:00 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'second'), 'Saturday, 3 12:00:00 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'millisecond'), 'Saturday, 3 12:00:00 AM 000', assert);
    });

    QUnit.test('Day delta when maxDate at start day', function (assert) {
        const date1 = new Date(2010, 3, 3, 8, 22);
        const date2 = new Date(2010, 3, 4);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'month'), 'April', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'week'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'day'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hour'), '8:22 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minute'), '8:22 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'second'), '8:22:00 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'millisecond'), '8:22:00 AM 000', assert);
    });

    QUnit.test('second delta when maxDate at start second', function (assert) {
        const date1 = new Date(2010, 3, 3, 8, 22, 30, 333);
        const date2 = new Date(2010, 3, 3, 8, 22, 31);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'year'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'quarter'), 'Q2', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'month'), 'April', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'week'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'day'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hour'), '8:22 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minute'), '8:22 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'second'), '8:22:30 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'millisecond'), '333', assert);
    });

    QUnit.test('Case insensitive', function (assert) {
        const date1 = new Date(2010, 3, 3, 8, 22, 30, 333);
        const date2 = new Date(2010, 3, 3, 8, 22, 31);

        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'yEar'), '2010', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'qUarter'), 'Q2', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'moNth'), 'April', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'wEek'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'daY'), 'Saturday, 3', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'hOur'), '8:22 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'minUte'), '8:22 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'seCond'), '8:22:30 AM', assert);
        checkDateWithFormat(date1, getDateFormatByTickInterval(date1, date2, 'miLLisecond'), '333', assert);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["format_helper"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("format_helper"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.formatHelper.tests.js.map