!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.knockout/list.tests.js"], ["inferno","jquery","knockout","../../helpers/executeAsyncMock.js","ui/list","integration/knockout","generic_light.css!"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.knockout/list.tests.js', ['inferno', 'jquery', 'knockout', '../../helpers/executeAsyncMock.js', 'ui/list', 'integration/knockout', 'generic_light.css!'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    // eslint-disable-next-line spellcheck/spell-checker
    const { rerender } = $__require('inferno');
    const $ = $__require('jquery');
    const ko = $__require('knockout');
    const executeAsyncMock = $__require('../../helpers/executeAsyncMock.js');

    $__require('ui/list');
    $__require('integration/knockout');

    $__require('generic_light.css!');

    const moduleWithoutCsp = QUnit.urlParams['nocsp'] ? QUnit.module : QUnit.module.skip;

    QUnit.testStart(function () {
        const markup = '<div id="list"></div>\
        <div id="templated-list">\
            <div data-options="dxTemplate: { name: \'item\' }">Item Template</div>\
        </div>\
        <div id="groupedListContainer">\
            <div data-bind="dxList: { grouped: true, items: groups }">\
                <div data-options="dxTemplate: { name: \'custom\' }">Custom Group Template</div>\
                <div data-options="dxTemplate: { name: \'group\' }">Group Template</div>\
                <div data-options="dxTemplate: { name: \'item\' }">Item Template</div>\
            </div>\
        </div>\
        <div id="testListContentReady">\
            <div id="listContentReady" data-bind="dxList: { useNativeScrolling: false, dataSource: dataSource, onContentReady: onContentReady }"></div>\
        </div>\
        <div id="koSelectingList" data-bind="dxList: { items: items, grouped: grouped, editEnabled: editEnabled, selectedItems: selectedItems, selectionMode: selectionMode }"></div>';

        $('#qunit-fixture').html(markup);
    });

    const LIST_CLASS = 'dx-list';
    const LIST_ITEM_CLASS = 'dx-list-item';
    const LIST_ITEM_SELECTED_CLASS = 'dx-list-item-selected';

    const toSelector = function (cssClass) {
        return '.' + cssClass;
    };

    const moduleSetup = {
        beforeEach: function () {
            executeAsyncMock.setup();

            this.element = $('#list');

            this.clock = sinon.useFakeTimers();
        },
        afterEach: function () {
            executeAsyncMock.teardown();

            this.clock.restore();
        }
    };

    moduleWithoutCsp('rendering', moduleSetup);

    QUnit.test('default with ko approach', function (assert) {
        const vm = {
            items: [0, 1]
        };

        const $element = this.element;

        $element.attr('data-bind', 'dxList: {items: items}');

        ko.applyBindings(vm, $element.get(0));

        assert.ok($element.hasClass(LIST_CLASS));

        const items = $element.find(toSelector(LIST_ITEM_CLASS));
        assert.equal(items.length, 2);
        assert.ok(items.eq(0).hasClass(LIST_ITEM_CLASS));
        assert.ok(items.eq(1).hasClass(LIST_ITEM_CLASS));
        assert.equal($.trim(items.text()), '01', 'all items rendered');
    });

    moduleWithoutCsp('regressions', moduleSetup);

    QUnit.test('scrollView size updated on onContentReady (B253584)', function (assert) {
        this.clock.restore();
        const done = assert.async();

        let scrollView;
        const itemHeight = 20;

        const vm = {
            dataSource: {
                store: [1, 2, 3, 4, 5],
                paginate: false
            },
            onContentReady: function (e) {
                setTimeout(() => {
                    scrollView = $(e.element).dxScrollView('instance');
                    // eslint-disable-next-line spellcheck/spell-checker
                    rerender();
                    scrollView.scrollTo(itemHeight);

                    assert.equal(scrollView.scrollOffset().top, itemHeight, 'scroll view scrolled correctly');

                    done();
                }, 50);
            }
        };

        $('#listContentReady').height(50);

        ko.applyBindings(vm, $('#testListContentReady').get(0));
    });

    QUnit.test('observableArray.push must refresh', function (assert) {
        const vm = {
            data: ko.observableArray([1])
        };

        this.element.attr('data-bind', 'dxList: { dataSource: data }');
        ko.applyBindings(vm, this.element[0]);

        assert.equal(this.element.find(toSelector(LIST_ITEM_CLASS)).length, 1);
        assert.equal(this.element.dxList('instance').option('items').length, 1);

        vm.data.push(2);
        assert.equal(this.element.find(toSelector(LIST_ITEM_CLASS)).length, 2);
        assert.equal(this.element.dxList('instance').option('items').length, 2);
    });

    QUnit.test('B233222. List - group header uses item template', function (assert) {
        const vm = {
            groups: [{ key: 'simple', items: ['1', '2', '3'] }, { template: 'custom', key: 'custom', items: ['1', '2', '3'] }, { template: 'nonExistent', key: 'nonExistent', items: ['1', '2', '3'] }]
        };

        ko.applyBindings(vm, $('#groupedListContainer').get(0));

        const $list = $('#groupedListContainer').find('.dx-list');
        const $headers = $list.find('.dx-list-group-header');

        assert.equal($headers.eq(0).text(), 'Group Template', 'group template');
        assert.equal($headers.eq(1).text(), 'Custom Group Template', 'custom group.template');
        assert.equal($headers.eq(2).text(), 'nonExistent', 'default list group template when custom group.template was not found');
    });

    moduleWithoutCsp('deleting in grouped list MVVM support');

    QUnit.test('deleteItem should correctly be handled by ko subscriptions with isolated items', function (assert) {
        assert.expect(2);

        const items = [{
            key: 1,
            items: ko.observableArray([1, 2, 3])
        }, {
            key: 2,
            items: ko.observableArray([1, 2, 3])
        }];

        items[0].items.subscribe(function () {
            assert.ok('first group subscription triggered');
        });
        items[1].items.subscribe(function () {
            assert.ok('second group subscription triggered');
        });

        const $list = $('#templated-list').dxList({
            items: items,
            grouped: true
        });
        const list = $list.dxList('instance');

        list.deleteItem({ group: 0, item: 0 });
        list.deleteItem({ group: 1, item: 0 });
    });

    moduleWithoutCsp('selecting MVVM support');

    QUnit.test('grouped list should respond on outside selectedItems changes', function (assert) {
        const items = [{
            key: 'first',
            items: [{ a: 0 }, { a: 1 }]
        }, {
            key: 'second',
            items: [{ a: 3 }, { a: 4 }]
        }];
        const $list = $('#koSelectingList');
        const vm = {
            items: items,
            grouped: true,
            editEnabled: true,
            selectedItems: ko.observableArray([]),
            selectionMode: 'multiple'
        };
        ko.applyBindings(vm, $list[0]);

        let selectActionFired = 0;
        let unselectActionFired = 0;
        const list = $list.dxList('instance');
        list.option('onSelectionChanged', function (args) {
            selectActionFired += args.addedItems.length;
            unselectActionFired += args.removedItems.length;
        });

        const $items = $list.find(toSelector(LIST_ITEM_CLASS));

        vm.selectedItems([{
            key: 'second',
            items: [items[1].items[1]]
        }, {
            key: 'first',
            items: [items[0].items[0]]
        }]);
        vm.selectedItems([{
            key: 'second',
            items: [items[1].items[1]]
        }]);

        assert.equal($items.eq(0).hasClass(LIST_ITEM_SELECTED_CLASS), false, 'first in first group unselected');
        assert.equal($items.eq(3).hasClass(LIST_ITEM_SELECTED_CLASS), true, 'second in second group selected');
        assert.strictEqual(selectActionFired, 2, 'select action called on first and on last only once');
        assert.strictEqual(unselectActionFired, 1, 'select action called only on first');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","jquery","knockout","../../helpers/executeAsyncMock.js","ui/list","integration/knockout","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("jquery"), require("knockout"), require("../../helpers/executeAsyncMock.js"), require("ui/list"), require("integration/knockout"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=list.tests.js.map