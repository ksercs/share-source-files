!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core/range.tests.js"], ["viz/translators/range"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.core/range.tests.js', ['viz/translators/range'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const rangeModule = $__require('viz/translators/range');

    QUnit.module('Life cycle');

    QUnit.test('Create empty', function (assert) {
        // act
        const range = new rangeModule.Range();

        // assert
        assert.ok(range);
        assert.strictEqual(range.min, undefined);
        assert.strictEqual(range.max, undefined);
        assert.strictEqual(range.minVisible, undefined);
        assert.strictEqual(range.maxVisible, undefined);
        assert.strictEqual(range.startCategories, undefined);
        assert.strictEqual(range.endCategories, undefined);
        assert.strictEqual(range.containsConstantLine, undefined);
    });

    QUnit.test('Create with range', function (assert) {
        // act
        const range = new rangeModule.Range({
            min: 0,
            max: 100,
            minVisible: 10,
            maxVisible: 90,
            isValueRange: true,
            alwaysCorrectMin: false
        });

        // assert
        assert.ok(range);
        assert.strictEqual(range.min, 0);
        assert.strictEqual(range.max, 100);
        assert.strictEqual(range.minVisible, 10);
        assert.strictEqual(range.maxVisible, 90);
        assert.strictEqual(range.isValueRange, true);
        assert.strictEqual(range.alwaysCorrectMin, false);
    });

    QUnit.module('Add range. Numeric', {
        beforeEach: function () {
            this.createRange = function (rangeData) {
                this.range = new rangeModule.Range(rangeData);
            };
        }
    });

    QUnit.test('Merge invert', function (assert) {
        const that = this;

        const checkRules = function (rangeInverted, otherRangeInverted, expected) {
            // arrange
            that.createRange({ invert: rangeInverted });

            // act
            const returnValue = that.range.addRange({ invert: otherRangeInverted });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.strictEqual(that.range.invert, expected);
        };

        checkRules(true, true, true);
        checkRules(false, true, true);
        checkRules(true, false, true);
        checkRules(false, false, false);
    });

    QUnit.test('Merge containsConstantLine', function (assert) {
        const that = this;

        const checkRules = function (value, otherValue, expected) {
            // arrange
            that.createRange({ containsConstantLine: value });

            // act
            const returnValue = that.range.addRange({ containsConstantLine: otherValue });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.strictEqual(that.range.containsConstantLine, expected);
        };

        checkRules(true, true, true);
        checkRules(false, true, true);
        checkRules(true, false, true);
        checkRules(false, false, false);
    });

    QUnit.test('Merge axis type', function (assert) {
        const that = this;

        const checkRules = function (rangeAxisType, otherRangeAxisType, expected) {
            // arrange
            that.createRange({ axisType: rangeAxisType });

            // act
            const returnValue = that.range.addRange({ axisType: otherRangeAxisType });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.strictEqual(that.range.axisType, expected);
        };

        checkRules('continuous', 'discrete', 'continuous');
        checkRules(undefined, 'discrete', 'discrete');
        checkRules('continuous', undefined, 'continuous');
        checkRules(undefined, undefined, undefined);
    });

    QUnit.test('Merge data type', function (assert) {
        const that = this;

        const checkRules = function (rangeDataType, otherRangeDataType, expected) {
            // arrange
            that.createRange({ dataType: rangeDataType });

            // act
            const returnValue = that.range.addRange({ dataType: otherRangeDataType });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.strictEqual(that.range.dataType, expected);
        };

        checkRules('numeric', 'numeric', 'numeric');
        checkRules(undefined, 'datetime', 'datetime');
        checkRules('string', undefined, 'string');
        checkRules(undefined, undefined, undefined);
    });

    QUnit.test('Merge isSpacedMargin', function (assert) {
        const that = this;

        const checkRules = function (isSpacedMargin, otherIsSpacedMargin, expected) {
            // arrange
            that.createRange({ isSpacedMargin: isSpacedMargin });

            // act
            const returnValue = that.range.addRange({ isSpacedMargin: otherIsSpacedMargin });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.strictEqual(that.range.isSpacedMargin, expected);
        };

        checkRules(true, true, true);
        checkRules(false, true, true);
        checkRules(true, false, true);
        checkRules(false, false, false);
    });

    QUnit.test('Merge base', function (assert) {
        const that = this;

        const checkRules = function (rangeAxisType, rangeBase, otherRangeBase, expected) {
            // arrange
            that.createRange({
                axisType: rangeAxisType,
                base: rangeBase
            });

            // act
            const returnValue = that.range.addRange({ base: otherRangeBase });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.strictEqual(that.range.base, expected);
        };

        checkRules('logarithmic', 10, 2, 10);
        checkRules('logarithmic', undefined, 2, 2);
        checkRules('logarithmic', 10, undefined, 10);
        checkRules('logarithmic', undefined, undefined, undefined);
        checkRules('continuous', 10, 2, undefined);
    });

    QUnit.test('Merge min', function (assert) {
        const that = this;

        const checkRules = function (rangeMin, otherRangeMin, expected) {
            // arrange
            that.createRange({ min: rangeMin });

            // act
            const returnValue = that.range.addRange({ min: otherRangeMin });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.strictEqual(that.range.min, expected);
        };

        checkRules(10, 2, 2);
        checkRules(10, 20, 10);
        checkRules(10, undefined, 10);
        checkRules(undefined, 2, 2);
        checkRules(undefined, undefined, undefined);
    });

    QUnit.test('Merge minVisible', function (assert) {
        const that = this;

        const checkRules = function (rangeMinVisible, otherRangeMinVisible, expected) {
            // arrange
            that.createRange({ minVisible: rangeMinVisible });

            // act
            const returnValue = that.range.addRange({ minVisible: otherRangeMinVisible });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.strictEqual(that.range.minVisible, expected);
        };

        checkRules(10, 2, 2);
        checkRules(10, 20, 10);
        checkRules(10, undefined, 10);
        checkRules(undefined, 2, 2);
        checkRules(undefined, undefined, undefined);
    });

    QUnit.test('Merge max', function (assert) {
        const that = this;

        const checkRules = function (rangeMax, otherRangeMax, expected) {
            // arrange
            that.createRange({ max: rangeMax });

            // act
            const returnValue = that.range.addRange({ max: otherRangeMax });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.strictEqual(that.range.max, expected);
        };

        checkRules(10, 2, 10);
        checkRules(10, 20, 20);
        checkRules(10, undefined, 10);
        checkRules(undefined, 2, 2);
        checkRules(undefined, undefined, undefined);
    });

    QUnit.test('Merge maxVisible', function (assert) {
        const that = this;

        const checkRules = function (rangeMaxVisible, otherRangeMaxVisible, expected) {
            // arrange
            that.createRange({ maxVisible: rangeMaxVisible });

            // act
            const returnValue = that.range.addRange({ maxVisible: otherRangeMaxVisible });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.strictEqual(that.range.maxVisible, expected);
        };

        checkRules(10, 2, 10);
        checkRules(10, 20, 20);
        checkRules(10, undefined, 10);
        checkRules(undefined, 2, 2);
        checkRules(undefined, undefined, undefined);
    });

    QUnit.test('Merge interval', function (assert) {
        const that = this;

        const checkRules = function (rangeInterval, otherRangeInterval, expected) {
            // arrange
            that.createRange({ interval: rangeInterval });

            // act
            const returnValue = that.range.addRange({ interval: otherRangeInterval });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.strictEqual(that.range.interval, expected);
        };

        checkRules(10, 2, 2);
        checkRules(10, 20, 10);
        checkRules(10, undefined, 10);
        checkRules(undefined, 2, 2);
        checkRules(undefined, undefined, undefined);
    });

    QUnit.test('Merge categories', function (assert) {
        const that = this;

        const checkRules = function (rangeCategories, otherRangeCategories, expected, message) {
            // arrange
            that.createRange({ categories: rangeCategories });

            // act
            const returnValue = that.range.addRange({ categories: otherRangeCategories });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.deepEqual(that.range.categories, expected, message);
        };

        checkRules(['a', 'b'], undefined, ['a', 'b'], 'No other');
        checkRules(undefined, ['a', 'b'], ['a', 'b'], 'From scratch');
        checkRules(['a', 'b'], ['a', 'b'], ['a', 'b'], 'Nothing new');
        checkRules(['a', 'b'], ['c', 'd'], ['a', 'b', 'c', 'd'], 'Add all new');
        checkRules(['a', 'b', 'c'], ['d', 'b', 'e'], ['a', 'b', 'c', 'd', 'e'], 'Add some new');
    });

    QUnit.module('Add range. DateTime', {
        beforeEach: function () {
            this.createRange = function (rangeData) {
                this.range = new rangeModule.Range(rangeData);
            };
        }
    });

    QUnit.test('Merge min', function (assert) {
        const that = this;

        const checkRules = function (rangeMin, otherRangeMin, expected) {
            // arrange
            that.createRange({ min: rangeMin });

            // act
            const returnValue = that.range.addRange({ min: otherRangeMin });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.deepEqual(that.range.min, expected);
        };

        checkRules(new Date(2010, 0), new Date(2002, 0), new Date(2002, 0));
        checkRules(new Date(2010, 0), new Date(2020, 0), new Date(2010, 0));
        checkRules(new Date(2010, 0), undefined, new Date(2010, 0));
        checkRules(undefined, new Date(2002, 0), new Date(2002, 0));
        checkRules(undefined, undefined, undefined);
    });

    QUnit.test('Merge minVisible', function (assert) {
        const that = this;

        const checkRules = function (rangeMinVisible, otherRangeMinVisible, expected) {
            // arrange
            that.createRange({ minVisible: rangeMinVisible });

            // act
            const returnValue = that.range.addRange({ minVisible: otherRangeMinVisible });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.deepEqual(that.range.minVisible, expected);
        };

        checkRules(new Date(2010, 0), new Date(2002, 0), new Date(2002, 0));
        checkRules(new Date(2010, 0), new Date(2020, 0), new Date(2010, 0));
        checkRules(new Date(2010, 0), undefined, new Date(2010, 0));
        checkRules(undefined, new Date(2002, 0), new Date(2002, 0));
        checkRules(undefined, undefined, undefined);
    });

    QUnit.test('Merge max', function (assert) {
        const that = this;

        const checkRules = function (rangeMax, otherRangeMax, expected) {
            // arrange
            that.createRange({ max: rangeMax });

            // act
            const returnValue = that.range.addRange({ max: otherRangeMax });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.deepEqual(that.range.max, expected);
        };

        checkRules(new Date(2010, 0), new Date(2002, 0), new Date(2010, 0));
        checkRules(new Date(2010, 0), new Date(2020, 0), new Date(2020, 0));
        checkRules(new Date(2010, 0), undefined, new Date(2010, 0));
        checkRules(undefined, new Date(2002, 0), new Date(2002, 0));
        checkRules(undefined, undefined, undefined);
    });

    QUnit.test('Merge maxVisible', function (assert) {
        const that = this;

        const checkRules = function (rangeMaxVisible, otherRangeMaxVisible, expected) {
            // arrange
            that.createRange({ maxVisible: rangeMaxVisible });

            // act
            const returnValue = that.range.addRange({ maxVisible: otherRangeMaxVisible });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.deepEqual(that.range.maxVisible, expected);
        };

        checkRules(new Date(2010, 0), new Date(2002, 0), new Date(2010, 0));
        checkRules(new Date(2010, 0), new Date(2020, 0), new Date(2020, 0));
        checkRules(new Date(2010, 0), undefined, new Date(2010, 0));
        checkRules(undefined, new Date(2002, 0), new Date(2002, 0));
        checkRules(undefined, undefined, undefined);
    });

    QUnit.test('Merge categories', function (assert) {
        const that = this;

        const checkRules = function (rangeCategories, otherRangeCategories, expected, message) {
            // arrange
            that.createRange({ categories: rangeCategories, dataType: 'datetime' });

            // act
            const returnValue = that.range.addRange({ categories: otherRangeCategories });

            // assert
            assert.strictEqual(that.range, returnValue);
            assert.deepEqual(that.range.categories, expected, message);
        };

        checkRules([new Date(2007, 0), new Date(2008, 0)], undefined, [new Date(2007, 0), new Date(2008, 0)], 'No other');
        checkRules(undefined, [new Date(2007, 0), new Date(2008, 0)], [new Date(2007, 0), new Date(2008, 0)], 'From scratch');
        checkRules([new Date(2007, 0), new Date(2008, 0)], [new Date(2007, 0), new Date(2008, 0)], [new Date(2007, 0), new Date(2008, 0)], 'Nothing new');
        checkRules([new Date(2007, 0), new Date(2008, 0)], [new Date(2009, 0), new Date(2010, 0)], [new Date(2007, 0), new Date(2008, 0), new Date(2009, 0), new Date(2010, 0)], 'Add all new');
        checkRules([new Date(2007, 0), new Date(2008, 0), new Date(2009, 0)], [new Date(2010, 0), new Date(2008, 0), new Date(2011, 0)], [new Date(2007, 0), new Date(2008, 0), new Date(2009, 0), new Date(2010, 0), new Date(2011, 0)], 'Add some new');
    });

    QUnit.module('Add range. Extend by visible range. Numeric', {
        beforeEach: function () {
            this.createRange = function (rangeData) {
                this.range = new rangeModule.Range(rangeData);
            };

            this.checkRanges = function (assert, expected) {
                assert.strictEqual(this.range.min, expected.min, 'Min');
                assert.strictEqual(this.range.minVisible, expected.minVisible, 'MinVisible');
                assert.strictEqual(this.range.maxVisible, expected.maxVisible, 'MaxVisible');
                assert.strictEqual(this.range.max, expected.max, 'Max');

                this.checkRangeBounds(assert);
            };

            this.checkRangeBounds = function (assert) {
                assert.ok(this.range.min <= this.range.max, 'Min should be less than Max');
                assert.ok(this.range.maxVisible === undefined || this.range.maxVisible !== undefined && this.range.maxVisible <= this.range.max, 'MaxVisible should be less than Max (or undefined)');
                assert.ok(this.range.minVisible === undefined || this.range.minVisible !== undefined && this.range.minVisible >= this.range.min, 'MinVisible should be greater than Min (or undefined)');
            };
        }
    });

    QUnit.test('min < minVisible, maxVisible < max', function (assert) {
        // arrange
        this.createRange({
            min: 10,
            max: 100
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: 20,
            maxVisible: 80
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: 10,
            minVisible: 20,
            maxVisible: 80,
            max: 100
        });
    });

    QUnit.test('minVisible < min, maxVisible < max', function (assert) {
        // arrange
        this.createRange({
            min: 10,
            max: 100
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: 5,
            maxVisible: 80
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: 5,
            minVisible: 5,
            maxVisible: 80,
            max: 100
        });
    });

    QUnit.test('min < minVisible, max < maxVisible', function (assert) {
        // arrange
        this.createRange({
            min: 10,
            max: 100
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: 20,
            maxVisible: 110
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: 10,
            minVisible: 20,
            maxVisible: 110,
            max: 110
        });
    });

    QUnit.test('minVisible < min, max < maxVisible', function (assert) {
        // arrange
        this.createRange({
            min: 10,
            max: 100
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: 5,
            maxVisible: 110
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: 5,
            minVisible: 5,
            maxVisible: 110,
            max: 110
        });
    });

    QUnit.test('min < max < minVisible < maxVisible', function (assert) {
        // arrange
        this.createRange({
            min: 10,
            max: 100
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: 110,
            maxVisible: 130
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: 10,
            minVisible: 110,
            maxVisible: 130,
            max: 130
        });
    });

    QUnit.test('min < max < minVisible, maxVisible = undefined', function (assert) {
        // arrange
        this.createRange({
            min: 10,
            max: 100
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: 110
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: 10,
            minVisible: 110,
            max: 110
        });
    });

    QUnit.test('minVisible < maxVisible < min < max', function (assert) {
        // arrange
        this.createRange({
            min: 10,
            max: 100
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: 1,
            maxVisible: 5
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: 1,
            minVisible: 1,
            maxVisible: 5,
            max: 100
        });
    });

    QUnit.test('minVisible = undefined, maxVisible < min < max', function (assert) {
        // arrange
        this.createRange({
            min: 10,
            max: 100
        });

        // act
        const returnValue = this.range.addRange({
            maxVisible: 5
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: 5,
            maxVisible: 5,
            max: 100
        });
    });

    QUnit.module('Add range. Extend by visible range. DateTime', {
        beforeEach: function () {
            this.createRange = function (rangeData) {
                this.range = new rangeModule.Range(rangeData);
            };

            this.checkRanges = function (assert, expected) {
                assert.deepEqual(this.range.min, expected.min, 'Min');
                assert.deepEqual(this.range.minVisible, expected.minVisible, 'MinVisible');
                assert.deepEqual(this.range.maxVisible, expected.maxVisible, 'MaxVisible');
                assert.deepEqual(this.range.max, expected.max, 'Max');

                this.checkRangeBounds(assert);
            };

            this.checkRangeBounds = function (assert) {
                assert.ok(this.range.min <= this.range.max, 'Min should be less than Max');
                assert.ok(this.range.maxVisible === undefined || this.range.maxVisible !== undefined && this.range.maxVisible <= this.range.max, 'MaxVisible should be less than Max (or undefined)');
                assert.ok(this.range.minVisible === undefined || this.range.minVisible !== undefined && this.range.minVisible >= this.range.min, 'MinVisible should be greater than Min (or undefined)');
            };
        }
    });

    QUnit.test('min < minVisible, maxVisible < max', function (assert) {
        // arrange
        this.createRange({
            min: new Date(10000),
            max: new Date(100000)
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: new Date(20000),
            maxVisible: new Date(80000)
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: new Date(10000),
            minVisible: new Date(20000),
            maxVisible: new Date(80000),
            max: new Date(100000)
        });
    });

    QUnit.test('minVisible < min, maxVisible < max', function (assert) {
        // arrange
        this.createRange({
            min: new Date(10000),
            max: new Date(100000)
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: new Date(5000),
            maxVisible: new Date(80000)
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: new Date(5000),
            minVisible: new Date(5000),
            maxVisible: new Date(80000),
            max: new Date(100000)
        });
    });

    QUnit.test('min < minVisible, max < maxVisible', function (assert) {
        // arrange
        this.createRange({
            min: new Date(10000),
            max: new Date(100000)
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: new Date(20000),
            maxVisible: new Date(110000)
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: new Date(10000),
            minVisible: new Date(20000),
            maxVisible: new Date(110000),
            max: new Date(110000)
        });
    });

    QUnit.test('minVisible < min, max < maxVisible', function (assert) {
        // arrange
        this.createRange({
            min: new Date(10000),
            max: new Date(100000)
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: new Date(5000),
            maxVisible: new Date(110000)
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: new Date(5000),
            minVisible: new Date(5000),
            maxVisible: new Date(110000),
            max: new Date(110000)
        });
    });

    QUnit.test('min < max < minVisible < maxVisible', function (assert) {
        // arrange
        this.createRange({
            min: new Date(10000),
            max: new Date(100000)
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: new Date(110000),
            maxVisible: new Date(130000)
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: new Date(10000),
            minVisible: new Date(110000),
            maxVisible: new Date(130000),
            max: new Date(130000)
        });
    });

    QUnit.test('min < max < minVisible, maxVisible = undefined', function (assert) {
        // arrange
        this.createRange({
            min: new Date(10000),
            max: new Date(100000)
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: new Date(110000)
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: new Date(10000),
            minVisible: new Date(110000),
            max: new Date(110000)
        });
    });

    QUnit.test('minVisible < maxVisible < min < max', function (assert) {
        // arrange
        this.createRange({
            min: new Date(10000),
            max: new Date(100000)
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: new Date(1000),
            maxVisible: new Date(5000)
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: new Date(1000),
            minVisible: new Date(1000),
            maxVisible: new Date(5000),
            max: new Date(100000)
        });
    });

    QUnit.test('minVisible = undefined, maxVisible < min < max', function (assert) {
        // arrange
        this.createRange({
            min: new Date(10000),
            max: new Date(100000)
        });

        // act
        const returnValue = this.range.addRange({
            maxVisible: new Date(5000)
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: new Date(5000),
            maxVisible: new Date(5000),
            max: new Date(100000)
        });
    });

    QUnit.module('Add range. Extend by visible range. Special cases for RS. Min/max undefined. Numeric', {
        beforeEach: function () {
            this.createRange = function (rangeData) {
                this.range = new rangeModule.Range(rangeData);
            };

            this.checkRanges = function (assert, expected) {
                assert.strictEqual(this.range.min, expected.min, 'Min');
                assert.strictEqual(this.range.minVisible, expected.minVisible, 'MinVisible');
                assert.strictEqual(this.range.maxVisible, expected.maxVisible, 'MaxVisible');
                assert.strictEqual(this.range.max, expected.max, 'Max');

                this.checkRangeBounds(assert);
            };

            this.checkRangeBounds = function (assert) {
                assert.ok(this.range.min === undefined || this.range.max === undefined, 'Min or max should be undefined');
                assert.ok(this.range.max === undefined || this.range.max !== undefined && this.range.maxVisible <= this.range.max, 'MaxVisible should be less than Max (or undefined)');
                assert.ok(this.range.min === undefined || this.range.min !== undefined && this.range.minVisible >= this.range.min, 'MinVisible should be greater than Min (or undefined)');
            };
        }
    });

    QUnit.test('min = undefined, minVisible/max/maxVisible != undefined', function (assert) {
        // arrange
        this.createRange({
            max: 100
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: 10,
            maxVisible: 100
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            minVisible: 10,
            maxVisible: 100,
            max: 100
        });
    });

    QUnit.test('min/minVisible/maxVisible != undefined, max = undefined', function (assert) {
        // arrange
        this.createRange({
            min: 10
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: 20,
            maxVisible: 100
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: 10,
            minVisible: 20,
            maxVisible: 100
        });
    });

    QUnit.module('Add range. Extend by visible range. Special cases for RS. Min/max undefined. DateTime', {
        beforeEach: function () {
            this.createRange = function (rangeData) {
                this.range = new rangeModule.Range(rangeData);
            };

            this.checkRanges = function (assert, expected) {
                assert.deepEqual(this.range.min, expected.min, 'Min');
                assert.deepEqual(this.range.minVisible, expected.minVisible, 'MinVisible');
                assert.deepEqual(this.range.maxVisible, expected.maxVisible, 'MaxVisible');
                assert.deepEqual(this.range.max, expected.max, 'Max');

                this.checkRangeBounds(assert);
            };

            this.checkRangeBounds = function (assert) {
                assert.ok(this.range.min === undefined || this.range.max === undefined, 'Min or max should be undefined');
                assert.ok(this.range.max === undefined || this.range.max !== undefined && this.range.maxVisible <= this.range.max, 'MaxVisible should be less than Max (or undefined)');
                assert.ok(this.range.min === undefined || this.range.min !== undefined && this.range.minVisible >= this.range.min, 'MinVisible should be greater than Min (or undefined)');
            };
        }
    });

    QUnit.test('min = undefined, minVisible/max/maxVisible != undefined', function (assert) {
        // arrange
        this.createRange({
            max: new Date(100000)
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: new Date(10000),
            maxVisible: new Date(100000)
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            minVisible: new Date(10000),
            maxVisible: new Date(100000),
            max: new Date(100000)
        });
    });

    QUnit.test('min/minVisible/maxVisible != undefined, max = undefined', function (assert) {
        // arrange
        this.createRange({
            min: new Date(10000)
        });

        // act
        const returnValue = this.range.addRange({
            minVisible: new Date(20000),
            maxVisible: new Date(100000)
        });

        // assert
        assert.strictEqual(this.range, returnValue);
        this.checkRanges(assert, {
            min: new Date(10000),
            minVisible: new Date(20000),
            maxVisible: new Date(100000)
        });
    });

    QUnit.module('isEmpty functionality', {
        beforeEach: function () {
            this.createRange = function (rangeData) {
                this.range = new rangeModule.Range(rangeData);
            };
        }
    });

    QUnit.test('Empty', function (assert) {
        // arrange
        this.createRange();

        // act/assert
        assert.equal(this.range.isEmpty(), true);
    });

    QUnit.test('With min and without max', function (assert) {
        // arrange
        this.createRange({ min: 0 });

        // act/assert
        assert.equal(this.range.isEmpty(), true);
    });

    QUnit.test('Without min and with max', function (assert) {
        // arrange
        this.createRange({ max: 10 });

        // act/assert
        assert.equal(this.range.isEmpty(), true);
    });

    QUnit.test('With min and max', function (assert) {
        // arrange
        this.createRange({ min: 0, max: 10 });

        // act/assert
        assert.equal(this.range.isEmpty(), false);
    });

    QUnit.test('With categories', function (assert) {
        // arrange
        this.createRange({});

        // act
        this.range.addRange({ categories: ['a', 'b'] });

        // assert
        assert.equal(this.range.isEmpty(), false);
    });

    QUnit.test('With categories that is empty', function (assert) {
        // arrange
        this.createRange({ categories: [] });

        // act/assert
        assert.equal(this.range.isEmpty(), true);
    });

    QUnit.module('Correct Zero level functionality', {
        beforeEach: function () {
            function createRange(rangeData) {
                return new rangeModule.Range(rangeData);
            }

            function checkRangeBounds(assert, range, originalRange) {
                assert.ok(range.minVisible <= range.maxVisible, 'MinVisible should be less than MaxVisible');
                assert.ok(range.min <= range.minVisible, 'Min should be less than MinVisible');
                assert.ok(range.maxVisible <= range.max, 'MaxVisible should be less than Max');

                assert.ok(range.min <= originalRange.min, 'Min should be less than or equal to Original Min');
                assert.ok(range.max >= originalRange.max, 'Max should be greater than or equal to Original Max');
            }

            this.checkRanges = function (assert, template, expected) {
                // arrange
                const range = createRange(template);

                // act
                range.correctValueZeroLevel();

                // assert
                assert.equal(range.min.valueOf(), expected.min, 'min');
                assert.equal(range.max.valueOf(), expected.max, 'max');
                assert.equal(range.minVisible.valueOf(), expected.minVisible, 'minVisible');
                assert.equal(range.maxVisible.valueOf(), expected.maxVisible, 'maxVisible');
                checkRangeBounds(assert, range, template);
            };
        }
    });

    QUnit.test('min > 0, max > 0, minVisible > 0, maxVisible > 0', function (assert) {
        this.checkRanges(assert, {
            min: 10,
            max: 100,
            minVisible: 20,
            maxVisible: 80
        }, {
            min: 0,
            max: 100,
            minVisible: 0,
            maxVisible: 80
        });
    });

    QUnit.test('min < 0, max < 0, minVisible < 0, maxVisible < 0', function (assert) {
        this.checkRanges(assert, {
            min: -100,
            max: -10,
            minVisible: -80,
            maxVisible: -20
        }, {
            min: -100,
            max: 0,
            minVisible: -80,
            maxVisible: 0
        });
    });

    QUnit.test('min < 0, max = 0, minVisible < 0, maxVisible = 0', function (assert) {
        this.checkRanges(assert, {
            min: -100,
            max: 0,
            minVisible: -80,
            maxVisible: 0
        }, {
            min: -100,
            max: 0,
            minVisible: -80,
            maxVisible: 0
        });
    });

    QUnit.test('min = 0, max > 0, minVisible = 0, maxVisible > 0', function (assert) {
        this.checkRanges(assert, {
            min: 0,
            max: 100,
            minVisible: 0,
            maxVisible: 80
        }, {
            min: 0,
            max: 100,
            minVisible: 0,
            maxVisible: 80
        });
    });

    QUnit.test('min < 0, max > 0, minVisible < 0, maxVisible > 0', function (assert) {
        this.checkRanges(assert, {
            min: -100,
            max: 100,
            minVisible: -80,
            maxVisible: 80
        }, {
            min: -100,
            max: 100,
            minVisible: -80,
            maxVisible: 80
        });
    });

    QUnit.module('discrete zooming');

    QUnit.test('min/max categories after create range with min and max categories', function (assert) {
        // arrange,act
        const range = new rangeModule.Range({ minVisible: 'someStartCategories', maxVisible: 'someEndCategories', axisType: 'discrete' });

        // arrange
        assert.strictEqual(range.minVisible, 'someStartCategories');
        assert.strictEqual(range.maxVisible, 'someEndCategories');
    });

    QUnit.test('min/max categories after call add range (create without min/max categories)', function (assert) {
        // arrange
        const range = new rangeModule.Range({ axisType: 'discrete' });

        // act
        range.addRange({ minVisible: 'someStartCategories', maxVisible: 'someEndCategories' });

        // assert
        assert.strictEqual(range.minVisible, 'someStartCategories');
        assert.strictEqual(range.maxVisible, 'someEndCategories');
    });

    QUnit.test('min/max categories after call add range (create with min/max categories)', function (assert) {
        // arrange
        const range = new rangeModule.Range({ minVisible: 'someStartCategories', maxVisible: 'someEndCategories', axisType: 'discrete' });

        // act
        range.addRange({ minVisible: 'anotherStartCategories', maxVisible: 'someEndCategories' });

        // assert
        assert.strictEqual(range.minVisible, 'someStartCategories');
        assert.strictEqual(range.maxVisible, 'someEndCategories');
    });

    // T888028
    QUnit.test('Ignote minVisible/maxVisible for discrete scale', function (assert) {
        // arrange
        const range = new rangeModule.Range({ minVisible: 'a2', min: 'a2', maxVisible: '', max: '', axisType: 'discrete', categories: ['a1', 'a2', 'a3', '', 'a5'] });

        // act
        range.addRange({});

        // assert
        assert.strictEqual(range.minVisible, 'a2');
        assert.strictEqual(range.maxVisible, undefined);
        assert.strictEqual(range.min, 'a2');
        assert.strictEqual(range.max, '');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["viz/translators/range"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("viz/translators/range"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=range.tests.js.map