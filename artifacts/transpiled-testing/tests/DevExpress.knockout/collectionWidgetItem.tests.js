!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.knockout/collectionWidgetItem.tests.js"], ["jquery","knockout","core/component_registrator","ui/collection/ui.collection_widget.edit","ui/collection/item","integration/knockout"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.knockout/collectionWidgetItem.tests.js', ['jquery', 'knockout', 'core/component_registrator', 'ui/collection/ui.collection_widget.edit', 'ui/collection/item', 'integration/knockout'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const ko = $__require('knockout');
    const registerComponent = $__require('core/component_registrator');
    const CollectionWidget = $__require('ui/collection/ui.collection_widget.edit');
    const CollectionWidgetItem = $__require('ui/collection/item');

    $__require('integration/knockout');

    const moduleWithoutCsp = QUnit.urlParams['nocsp'] ? QUnit.module : QUnit.module.skip;

    const FIXTURE_ELEMENT = $('<div id=qunit-fixture></div>').appendTo('body');

    moduleWithoutCsp('observables', {
        beforeEach: function () {
            const TestCollectionItem = this.TestCollectionItem = CollectionWidgetItem.inherit({
                _renderWatchers: function () {
                    this._startWatcher('value', this._renderValue.bind(this));
                },
                _renderValue: function (value) {
                    this._$element.data('value', value);
                },
                value: function (value) {
                    this._renderValue(value);
                }
            });

            const TestCollection = this.TestCollection = CollectionWidget.inherit({
                _getDefaultOptions: function () {
                    return $.extend(this.callBase(), {
                        valueExpr: 'value'
                    });
                }
            });
            TestCollection.ItemClass = TestCollectionItem;

            registerComponent('dxTestCollection', TestCollection);
        }
    });

    QUnit.test('item should correctly watch changes', function (assert) {
        const $markup = $('<div></div>').attr('data-bind', 'dxTestCollection: { items: items, itemTemplate: function() {} }').appendTo(FIXTURE_ELEMENT);

        const vm = { items: ko.observableArray([]) };
        ko.applyBindings(vm, $markup[0]);

        vm.items.push({ value: ko.observable(1) });
        const $item = this.TestCollection.getInstance($markup).itemElements().eq(0);
        assert.equal($item.data('value'), 1, 'value changed');

        vm.items()[0].value(2);
        assert.equal($item.data('value'), 2, 'value changed');
    });

    QUnit.test('item should correctly watch changes in nested observable', function (assert) {
        const $markup = $('<div></div>').attr('data-bind', 'dxTestCollection: { items: items, itemTemplate: function() {} }').appendTo(FIXTURE_ELEMENT);

        const vm = { items: ko.observableArray([]) };
        ko.applyBindings(vm, $markup[0]);

        vm.items.push(ko.observable({ value: ko.observable(1) }));
        const $item = this.TestCollection.getInstance($markup).itemElements().eq(0);
        assert.equal($item.data('value'), 1, 'value changed');

        vm.items()[0]().value(2);
        assert.equal($item.data('value'), 2, 'value changed');
    });

    QUnit.test('item should correctly watch changes if whole item is observable', function (assert) {
        const $markup = $('<div></div>').attr('data-bind', 'dxTestCollection: { items: items, itemTemplate: function() {} }').appendTo(FIXTURE_ELEMENT);

        const vm = { items: ko.observableArray([]) };
        ko.applyBindings(vm, $markup[0]);

        vm.items.push(ko.observable({ value: 1 }));
        const $item = this.TestCollection.getInstance($markup).itemElements().eq(0);
        assert.equal($item.data('value'), 1, 'value changed');

        vm.items()[0]({ value: 2 });
        assert.equal($item.data('value'), 2, 'value changed');
    });

    QUnit.test('item should correctly watch changes for complex expressions', function (assert) {
        const $markup = $('<div></div>').attr('data-bind', 'dxTestCollection: { items: items, itemTemplate: function() {}, valueExpr: valueExpr }').appendTo(FIXTURE_ELEMENT);

        const vm = {
            items: ko.observableArray([]),
            valueExpr: function (data) {
                return data.value() + 1;
            }
        };
        ko.applyBindings(vm, $markup[0]);

        vm.items.push({ value: ko.observable(1) });
        const $item = this.TestCollection.getInstance($markup).itemElements().eq(0);
        assert.equal($item.data('value'), 2, 'value changed');

        vm.items()[0].value(2);
        assert.equal($item.data('value'), 3, 'value changed');
    });

    QUnit.test('item should not watch changes for not observables', function (assert) {
        const $markup = $('<div></div>').attr('data-bind', 'dxTestCollection: { items: items, itemTemplate: function() {} }').appendTo(FIXTURE_ELEMENT);

        const vm = { items: ko.observableArray([{ value: 1 }]) };
        ko.applyBindings(vm, $markup[0]);
        const $item = this.TestCollection.getInstance($markup).itemElements().eq(0);

        vm.items()[0].value = 2;
        assert.equal($item.data('value'), 1, 'value not changed');
    });

    QUnit.test('item should not be rerendered', function (assert) {
        const $markup = $('<div></div>').attr('data-bind', 'dxTestCollection: { items: items, itemTemplate: function() {} }').appendTo(FIXTURE_ELEMENT);

        const vm = { items: ko.observableArray([{ value: ko.observable(1) }]) };
        ko.applyBindings(vm, $markup[0]);

        const $item = this.TestCollection.getInstance($markup).itemElements().eq(0);
        $item.data('rendered', true);

        vm.items()[0].value(2);
        assert.equal($item.data('rendered'), true, 'item not rerendered');
    });

    QUnit.test('item should not leak watchers', function (assert) {
        const $markup = $('<div></div>').attr('data-bind', 'dxTestCollection: { items: items, itemTemplate: function() {} }').appendTo(FIXTURE_ELEMENT);

        const item = ko.observable({ value: ko.observable(1) });
        const vm = { items: ko.observableArray([item]) };
        ko.applyBindings(vm, $markup[0]);

        const $item = this.TestCollection.getInstance($markup).itemElements().eq(0);
        $item.data('rendered', true);

        vm.items([]);

        item().value(2);
        assert.notEqual($item.data('value'), 2, 'value not changed through nested observers');

        item({ value: 2 });
        assert.notEqual($item.data('value'), 2, 'value not changed through global observer');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","knockout","core/component_registrator","ui/collection/ui.collection_widget.edit","ui/collection/item","integration/knockout"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("knockout"), require("core/component_registrator"), require("ui/collection/ui.collection_widget.edit"), require("ui/collection/item"), require("integration/knockout"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=collectionWidgetItem.tests.js.map