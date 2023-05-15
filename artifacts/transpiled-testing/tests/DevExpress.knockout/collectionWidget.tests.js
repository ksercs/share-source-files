!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.knockout/collectionWidget.tests.js"], ["jquery","knockout","core/component_registrator","ui/collection/ui.collection_widget.edit","../../helpers/executeAsyncMock.js","integration/knockout"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.knockout/collectionWidget.tests.js', ['jquery', 'knockout', 'core/component_registrator', 'ui/collection/ui.collection_widget.edit', '../../helpers/executeAsyncMock.js', 'integration/knockout'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const ko = $__require('knockout');
    const registerComponent = $__require('core/component_registrator');
    const CollectionWidget = $__require('ui/collection/ui.collection_widget.edit');
    const executeAsyncMock = $__require('../../helpers/executeAsyncMock.js');

    $__require('integration/knockout');

    const moduleWithoutCsp = QUnit.urlParams['nocsp'] ? QUnit.module : QUnit.module.skip;

    QUnit.testStart(function () {
        const markup = '<div id="cmp"></div>\
        <div id="cmp-with-template">\
            <div data-options="dxTemplate : { name: \'testTemplate\' } ">\
                First Template\
            </div>\
        </div>\
        \
        <div id="cmp-ko" data-bind="dxTestComponent: { items: items }">\
            <div data-options="dxTemplate : { name: \'item\' } ">\
                <div data-bind="text: $parent.text"></div>\
            </div>\
        </div>\
        \
        <div id="cmp-with-zero-template">\
            <div data-options="dxTemplate: {name: \'0\'}">zero</div>\
        </div>\
        \
        <div id="container-with-jq-template" data-bind="dxTestComponent: { items: items }">\
            <div data-options="dxTemplate : { name: \'firstTemplate\' } ">\
                First Template\
            </div>\
            <div data-options="dxTemplate : { name: \'secondTemplate\' } ">\
                Second Template\
            </div>\
        </div>\
        \
        <div id="container-with-ko-template" data-bind="dxTestComponent: { items: items }">\
            <div data-options="dxTemplate : { name: \'firstTemplate\' } ">\
                First: <span data-bind="text: text"></span>\
            </div>\
            <div data-options="dxTemplate : { name: \'secondTemplate\' } ">\
                Second: <span data-bind="text: text"></span>\
            </div>\
        </div>\
        \
        <div id="container-with-ko-template-and-item-index" data-bind="dxTestComponent: { items: items }">\
            <div data-options="dxTemplate : { name: \'item\' } ">\
                $index: <span data-bind="text: $index"></span>\
            </div>\
        </div>\
        \
        <div id="container-with-nested-container" data-bind="dxTestComponent: { dataSource: [{}] }">\
            <div data-options="dxTemplate : { name: \'item\' } ">\
                <div data-bind="dxTestComponent: { dataSource: [], noDataText: \'No Data\' }"></div>\
            </div>\
        </div>\
        \
        <script type="text/html" id="externalTemplate">\
            Test\
        </script>\
        \
        <script type="text/html" id="externalTemplateNoRootElement">\
            Outer text <div>Test</div>\
        </script>\
        \
        <div id="container-with-items-in-markup" data-bind="dxTestComponent: {}">\
            <div data-options="dxItem: { text: \'1\' }"></div>\
            <div data-options="dxItem: { text: \'2\' }"></div>\
            <div data-options="dxItem: { text: \'3\' }"></div>\
        </div>\
        \
        <div id="container-with-items-with-template" data-bind="dxTestComponent: {}">\
            <div data-options="dxItem: { }">1</div>\
            <div data-options="dxItem: { }">2</div>\
        </div>\
        \
        <div id="container-with-items-and-custom-template" data-bind="dxTestComponent: {}">\
            <div data-options="dxTemplate: { name: \'custom\' }">custom</div>\
            <div data-options="dxItem: { template: \'custom\' }">1</div>\
        </div>\
        \
        <div id="container-with-items-in-markup-and-items-in-options" data-bind="dxTestComponent: { items: items }">\
            <div data-options="dxItem: { text: \'1\' }"></div>\
            <div data-options="dxItem: { text: \'2\' }"></div>\
            <div data-options="dxItem: { text: \'3\' }"></div>\
        </div>\
        \
        <div id="ko-selecting-case" data-bind="dxTestComponent: { items: items, selectedItems: selectedItems, selectionMode: selectionMode }"></div>';

        $('#qunit-fixture').html(markup);
    });

    const ITEM_CLASS = 'dx-item';
    const EMPTY_MESSAGE_CLASS = 'dx-empty-message';
    const ITEM_SELECTED_CLASS = 'dx-item-selected';

    const TestComponent = CollectionWidget.inherit({

        NAME: 'TestComponent',

        _activeStateUnit: '.item',

        _itemClass: function () {
            return 'item';
        },

        _itemDataKey: function () {
            return '123';
        },

        _itemContainer: function () {
            return this.$element();
        }

    });

    moduleWithoutCsp('render', {
        beforeEach: function () {
            this.element = $('#cmp');
            this.clock = sinon.useFakeTimers();
        },
        afterEach: function () {
            executeAsyncMock.teardown();
            this.clock.restore();
        }
    });

    QUnit.test('item specifies its template', function (assert) {
        registerComponent('dxTestComponent', TestComponent);

        try {
            const items = [{ template: 'custom', text: 'customText' }, { template: 'nonExistent', text: 'nonExistentText' }];

            const $markup = $('<div id=\'container\'>' + '   <div data-bind=\'dxTestComponent: { items: items }\'>' + '       <div data-options="dxTemplate: { name: \'custom\' }">CustomTemplate</div>' + '       <div data-options="dxTemplate: { name: \'item\' }">Item</div>' + '   </div>' + '</div>').appendTo($('#qunit-fixture'));

            ko.applyBindings({ items: items }, $markup.get(0));

            const itemElements = $markup.find('.item');
            assert.equal(itemElements.length, 2);
            assert.equal(itemElements.eq(0).text(), 'CustomTemplate', 'custom item.template');
            assert.equal(itemElements.eq(1).text(), 'nonExistent', 'render template name if template does not exists');
        } finally {
            delete ko.bindingHandlers['dxTestComponent'];
            delete $.fn['dxTestComponent'];
        }
    });

    QUnit.test('item specifies non existent template', function (assert) {
        registerComponent('dxTestComponent', TestComponent);

        try {
            const items = [{ text: 'test', template: 'custom' }];

            const $markup = $('<div id=\'container\'>' + '   <div data-bind=\'dxTestComponent: { items: items }\'>' + '   </div>' + '</div>').appendTo($('#qunit-fixture'));

            ko.applyBindings({ items: items }, $markup.get(0));

            const itemElements = $markup.find('.item');
            assert.equal(itemElements.length, 1);
            assert.equal(itemElements.eq(0).text(), 'custom');
        } finally {
            delete ko.bindingHandlers['dxTestComponent'];
            delete $.fn['dxTestComponent'];
        }
    });

    QUnit.test('Q556417 - NoDataItem shouldn\'t be removed for nested CollectionWidget', function (assert) {
        const $element = $('#container-with-nested-container');

        try {
            registerComponent('dxTestComponent', TestComponent);

            ko.applyBindings({}, $element.get(0));

            const $noData = $element.find('.' + EMPTY_MESSAGE_CLASS);
            assert.equal($noData.length, 1, 'nodata element rendered for nested component without items');
        } finally {
            delete ko.bindingHandlers['dxTestComponent'];
            delete $.fn['dxTestComponent'];
        }
    });

    QUnit.test('render items with multiple templates, ko scenario', function (assert) {
        try {
            const $element = $('#container-with-ko-template');
            const testSet = ['First: book', 'Second: pen', 'eraser', 'abc', 'pencil', 'First: liner'];

            registerComponent('dxTestComponent', TestComponent);

            ko.applyBindings({
                items: [{
                    text: 'book',
                    template: 'firstTemplate'
                }, {
                    text: 'pen',
                    template: 'secondTemplate'
                }, {
                    text: 'eraser' // no template - use default
                }, {
                    text: 'note', // not defined template - render template name
                    template: 'abc'
                }, {
                    text: 'pencil', // null-defined template - use default
                    template: null
                }, {
                    text: 'liner',
                    template: 'firstTemplate'
                }]
            }, $element.get(0));

            const $items = $element.find('.item');
            assert.equal($items.length, testSet.length, 'quantity of a test set items and rendered items are equal');

            $items.each(function (index) {
                assert.equal($.trim($(this).text()), testSet[index]);
            });
        } finally {
            delete ko.bindingHandlers['dxTestComponent'];
            delete $.fn['dxTestComponent'];
        }
    });

    QUnit.test('$index is available in markup (T542335)', function (assert) {
        try {
            const $element = $('#container-with-ko-template-and-item-index');

            registerComponent('dxTestComponent', TestComponent);

            ko.applyBindings({
                items: [{ text: 'text1' }, { text: 'text2' }]
            }, $element.get(0));

            const $items = $element.find('.item');

            assert.equal($.trim($items.eq(0).text()), '$index: 0');
            assert.equal($.trim($items.eq(1).text()), '$index: 1');
        } finally {
            delete ko.bindingHandlers['dxTestComponent'];
            delete $.fn['dxTestComponent'];
        }
    });

    moduleWithoutCsp('items via markup', {
        beforeEach: function () {
            registerComponent('dxTestComponent', TestComponent);
        },
        afterEach: function () {
            delete ko.bindingHandlers['dxTestComponent'];
            delete $.fn['dxTestComponent'];
        }
    });

    QUnit.test('define items in markup', function (assert) {
        const $component = $('#container-with-items-in-markup');
        ko.applyBindings({}, $component.get(0));

        const component = $component.dxTestComponent('instance');
        const expectedItems = [{ text: '1' }, { text: '2' }, { text: '3' }];

        assert.deepEqual(component.option('items'), expectedItems, 'items fetched');

        const $items = $component.find('.item');
        assert.equal($items.length, 3, 'rendered 3 items');
        assert.equal($component.text(), '123', 'items rendered');
    });

    QUnit.test('items in markup with templates', function (assert) {
        const $component = $('#container-with-items-with-template');
        ko.applyBindings({}, $component.get(0));

        const component = $component.dxTestComponent('instance');
        const items = component.option('items');
        assert.equal(items.length, 2, '2 items fetched');
        assert.ok(items[0].template, 'template defined');
        assert.ok(items[1].template, 'template defined');
        assert.notEqual(items[0].template, items[1].template, 'templates are different');

        const $items = $component.find('.item');
        assert.equal($items.length, 2, 'rendered 2 items');
        assert.equal($items.eq(0).text(), '1', 'items rendered');
        assert.equal($items.eq(1).text(), '2', 'items rendered');
    });

    QUnit.test('item uses custom template', function (assert) {
        const $component = $('#container-with-items-and-custom-template');
        ko.applyBindings({}, $component.get(0));

        assert.equal($.trim($component.text()), 'custom');
    });

    QUnit.test('option items has higher priority than items in markup', function (assert) {
        const $component = $('#container-with-items-in-markup-and-items-in-options');
        const items = [1, 2, 3];

        ko.applyBindings({ items: items }, $component.get(0));

        const component = $component.dxTestComponent('instance');

        assert.equal(component.option('items'), items, 'items replaced');
    });

    QUnit.test('$parent should be correct for collection item', function (assert) {
        const vm = {
            text: 'parent',
            items: [{ 'nonsense': true }]
        };

        const $markup = $('#cmp-ko');
        ko.applyBindings(vm, $markup.get(0));

        const $item = $markup.find('.dx-item');
        assert.equal($.trim($item.text()), 'parent');
    });

    moduleWithoutCsp('deleting MVVM support', {
        beforeEach: function () {
            registerComponent('dxTestComponent', TestComponent);
        },
        afterEach: function () {
            $.fn['TestComponent'] = null;
        }
    });

    moduleWithoutCsp('selecting MVVM support', {
        beforeEach: function () {
            registerComponent('dxTestComponent', TestComponent);
        },
        afterEach: function () {
            $.fn['TestComponent'] = null;
        }
    });

    QUnit.test('selectedItems option should contain correct items', function (assert) {
        const items = [{ a: 0 }, { a: 1 }, { a: 2 }];
        const $element = $('#ko-selecting-case');

        const vm = {
            items: items,
            selectedItems: ko.observableArray([]),
            selectionMode: 'multiple'
        };

        ko.applyBindings(vm, $element[0]);

        const instance = $element.dxTestComponent('instance');

        const item = function (index) {
            return $element.find('.' + ITEM_CLASS).eq(index);
        };

        instance.selectItem(item(0));
        instance.selectItem(item(1));
        instance.selectItem(item(2));
        instance.unselectItem(item(1));
        instance.deleteItem(item(2));

        assert.deepEqual(vm.selectedItems(), [{ a: 0 }], 'correct items present');
    });

    QUnit.test('items should be selected when widget rendered', function (assert) {
        const items = [{ a: 0 }, { a: 1 }, { a: 2 }];
        const $element = $('#ko-selecting-case');

        const vm = {
            items: items,
            selectedItems: ko.observableArray([items[0], items[2]]),
            selectionMode: 'multiple'
        };

        ko.applyBindings(vm, $element[0]);

        const item = function (index) {
            return $element.find('.' + ITEM_CLASS).eq(index);
        };

        assert.deepEqual(vm.selectedItems(), [{ a: 0 }, { a: 2 }], 'correct items selected');
        assert.equal(item(0).hasClass(ITEM_SELECTED_CLASS), true, 'first selected');
        assert.equal(item(2).hasClass(ITEM_SELECTED_CLASS), true, 'third selected');
    });

    QUnit.test('component should respond on outside selectedItems changes', function (assert) {
        const items = [{ a: 0 }, { a: 1 }];
        const $element = $('#ko-selecting-case');

        const vm = {
            items: items,
            selectedItems: ko.observableArray([]),
            selectionMode: 'multiple'
        };
        ko.applyBindings(vm, $element[0]);

        let selectionChangeFired = 0;
        const instance = $element.dxTestComponent('instance');
        instance.option('onSelectionChanged', function () {
            selectionChangeFired++;
        });

        const $items = $element.find('.' + ITEM_CLASS);

        vm.selectedItems([items[0], items[1]]);
        vm.selectedItems([items[1]]);

        assert.equal($items.eq(0).hasClass(ITEM_SELECTED_CLASS), false, 'first unselected');
        assert.equal($items.eq(1).hasClass(ITEM_SELECTED_CLASS), true, 'second selected');
        assert.strictEqual(selectionChangeFired, 2, 'onSelectionChanged action fired once for each selectedItems change');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","knockout","core/component_registrator","ui/collection/ui.collection_widget.edit","../../helpers/executeAsyncMock.js","integration/knockout"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("knockout"), require("core/component_registrator"), require("ui/collection/ui.collection_widget.edit"), require("../../helpers/executeAsyncMock.js"), require("integration/knockout"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=collectionWidget.tests.js.map