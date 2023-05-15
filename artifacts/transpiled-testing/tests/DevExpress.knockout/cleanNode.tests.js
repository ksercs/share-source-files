!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.knockout/cleanNode.tests.js"], ["integration/knockout","jquery","knockout","core/element_data"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.knockout/cleanNode.tests.js', ['integration/knockout', 'jquery', 'knockout', 'core/element_data'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    $__require('integration/knockout');

    const $ = $__require('jquery');
    const ko = $__require('knockout');
    const dataUtils = $__require('core/element_data');

    const moduleWithoutCsp = QUnit.urlParams['nocsp'] ? QUnit.module : QUnit.module.skip;

    const FIXTURE_ELEMENT = $('#qunit-fixture');

    const setTestData = function ($element) {
        dataUtils.data($element.get(0), '__test_key__', { key: 'value' });
        ko.utils.domData.set($element.get(0), '__test_key__', { key: 'value ' });
        dataUtils.data($element.get(0), 'dxKoCreation', true);
    };

    const hasKOTestData = function ($element) {
        return ko.utils.domData.get($element.get(0), '__test_key__');
    };

    const hasJQueryTestData = function ($element) {
        return dataUtils.data($element.get(0), '__test_key__');
    };

    const checkHasNoTestData = function ($element, assert) {
        assert.ok(!hasKOTestData($element), 'element has no KO data');
        assert.ok(!hasJQueryTestData($element), 'element has no $ data');
    };

    moduleWithoutCsp('clean data on node removing', {
        beforeEach: function () {
            this.$element = $('<div>').appendTo(FIXTURE_ELEMENT);
        },
        afterEach: function () {
            this.$element.remove();
        }
    });

    QUnit.test('by $.remove', function (assert) {
        setTestData(this.$element);
        this.$element.remove();
        checkHasNoTestData(this.$element, assert);
    });

    QUnit.test('by $.empty', function (assert) {
        const $childElement = $('<div>').appendTo(this.$element);

        setTestData($childElement);
        this.$element.empty();
        checkHasNoTestData($childElement, assert);
    });

    QUnit.test('by $.html', function (assert) {
        const $childElement = $('<div>').appendTo(this.$element);

        setTestData($childElement);
        this.$element.html('123');
        checkHasNoTestData($childElement, assert);
    });

    // T266920
    QUnit.test('by $.replaceWith', function (assert) {
        const $childElement = $('<div>').appendTo(this.$element);

        setTestData($childElement);
        this.$element.replaceWith($('<div>'));
        checkHasNoTestData($childElement, assert);
    });

    QUnit.test('by ko.cleanNode', function (assert) {
        const $childElement = $('<div>').appendTo(this.$element);

        setTestData($childElement);
        ko.cleanNode(this.$element.get(0));
        checkHasNoTestData($childElement, assert);
    });

    QUnit.test('by ko.removeNode', function (assert) {
        const $childElement = $('<div>').appendTo(this.$element);

        setTestData($childElement);
        ko.removeNode(this.$element.get(0));
        checkHasNoTestData(this.$element, assert);
    });

    if ($.fn.jquery[0] !== '1') {
        QUnit.test('by ko.removeNode - cleanNode & cleanData should be called once per node', function (assert) {
            const markup = $('<div id=\'i0\'>0' + '<div id=\'i00\'>00</div>' + '<div id=\'i01\'>01' + '<div id=\'010\'>010</div>' + '</div>' + '</div>').appendTo(this.$element);
            setTestData(this.$element);

            markup.find('*').addBack().each(function () {
                dataUtils.data(this, 'dxTestData', true);
                ko.utils.domData.set(this, 'dxTestData', true);
            });

            const cleanDataLog = [];
            const dataUtilsStrategy = dataUtils.getDataStrategy();
            const originalCleanData = dataUtilsStrategy.cleanData;

            dataUtilsStrategy.cleanData = function (nodes) {
                cleanDataLog.push.apply(cleanDataLog, nodes);
                return originalCleanData.apply(this, arguments);
            };

            const domDataClearLog = [];
            const originalDomDataClear = ko.utils.domData.clear;
            ko.utils.domData.clear = function (node) {
                domDataClearLog.push(node);
                return originalDomDataClear.apply(this, arguments);
            };

            ko.removeNode(markup.get(0));
            assert.equal(cleanDataLog.length, 4, '$.cleanData should be called 4 times for each node');
            assert.equal(domDataClearLog.length, 4, 'ko.utils.domData.clear should be called 4 times once for each node');

            markup.find('*').addBack().each(function () {
                assert.ok(!$(this).data('dxTestData'));
                assert.ok(!ko.utils.domData.get(this, 'dxTestData'));
                assert.ok(!('cleanedByKo' in $(this).get(0)));
                assert.ok(!('cleanedByJquery' in $(this).get(0)));
            });

            dataUtilsStrategy.cleanData = originalCleanData;
            ko.utils.domData.clear = originalDomDataClear;
        });

        QUnit.test('by $.remove - cleanNode & cleanData should be called once per node', function (assert) {
            const markup = $('<div id=\'i0\'>0' + '<div id=\'i00\'>00</div>' + '<div id=\'i01\'>01' + '<div id=\'010\'>010</div>' + '</div>' + '</div>').appendTo(this.$element);
            setTestData(this.$element);

            markup.find('*').addBack().each(function () {
                dataUtils.data($(this)[0], 'dxTestData', true);
                ko.utils.domData.set(this, 'dxTestData', true);
            });
            const cleanDataLog = [];
            const dataUtilsStrategy = dataUtils.getDataStrategy();
            const originalCleanData = dataUtilsStrategy.cleanData;

            dataUtilsStrategy.cleanData = function (nodes) {
                cleanDataLog.push.apply(cleanDataLog, nodes);
                return originalCleanData.apply(this, arguments);
            };

            const domDataClearLog = [];
            const originalDomDataClear = ko.utils.domData.clear;
            ko.utils.domData.clear = function (node) {
                domDataClearLog.push(node);
                return originalDomDataClear.apply(this, arguments);
            };

            markup.remove();

            assert.equal(cleanDataLog.length, 4, '$.cleanData should be called 4 times for each node');
            assert.equal(domDataClearLog.length, 4, 'ko.utils.domData.clear should be called 4 times once for each node');

            markup.find('*').addBack().each(function () {
                assert.ok(!dataUtils.data($(this)[0], 'dxTestData'));
                assert.ok(!ko.utils.domData.get(this, 'dxTestData'));
                assert.ok(!('cleanedByKo' in $(this).get(0)));
                assert.ok(!('cleanedByJquery' in $(this).get(0)));
            });

            dataUtilsStrategy.cleanData = originalCleanData;
            ko.utils.domData.clear = originalDomDataClear;
        });
    }

    QUnit.test('by $.remove - second dom element removing should lead to data disposing', function (assert) {
        const $element = this.$element.data('test1', true).remove().appendTo(FIXTURE_ELEMENT);
        setTestData(this.$element);

        $element.data('test2', true);
        ko.utils.domData.set($element.get(0), 'test2', true);

        $element.remove();

        assert.ok(!$.hasData($element));
        assert.ok(!ko.utils.domData.get($element.get(0), 'test2'));
    });

    QUnit.test('by ko.removeNode - second dom element removing should lead to data disposing', function (assert) {
        const $element = this.$element.data('test1', true);
        setTestData(this.$element);

        ko.utils.domData.set($element.get(0), 'test1', true);
        ko.removeNode($element.get(0));

        $element.appendTo(FIXTURE_ELEMENT);

        $element.data('test2', true);
        ko.utils.domData.set($element.get(0), 'test2', true);

        ko.removeNode($element.get(0));

        assert.ok(!$.hasData($element));
        assert.ok(!ko.utils.domData.get($element.get(0), 'test2'));
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["integration/knockout","jquery","knockout","core/element_data"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("integration/knockout"), require("jquery"), require("knockout"), require("core/element_data"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=cleanNode.tests.js.map