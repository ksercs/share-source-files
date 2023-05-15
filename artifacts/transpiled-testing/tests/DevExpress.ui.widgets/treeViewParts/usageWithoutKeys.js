!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/usageWithoutKeys.js"], ["core/utils/common"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/usageWithoutKeys.js", ["core/utils/common"], function($__export) {
  "use strict";
  var commonUtils;
  return {
    setters: [function($__m) {
      commonUtils = $__m.default;
    }],
    execute: function() {
      QUnit.module('Usage without keys');
      QUnit.test('Keys should be generated automatically', function(assert) {
        var treeView = initTree({items: [{
            text: 'Item 1',
            items: [{text: 'Nested item 1'}, {text: 'Nested item 2'}]
          }, {text: 'Item 2'}]}).dxTreeView('instance');
        var nodes = treeView.getNodes();
        assert.equal(nodes[0].key, 1);
        assert.equal(nodes[0].items[0].key, 2);
        assert.equal(nodes[0].items[1].key, 3);
        assert.equal(nodes[1].key, 4);
      });
      QUnit.test('Keys generation should not affect source items', function(assert) {
        var treeView = initTree({items: [{
            text: 'Item 1',
            items: [{text: 'Nested item 1'}, {text: 'Nested item 2'}]
          }, {text: 'Item 2'}]}).dxTreeView('instance');
        var items = treeView.option('items');
        assert.strictEqual(items[0].id, undefined);
        assert.strictEqual(items[0].items[0].id, undefined);
        assert.strictEqual(items[0].items[1].id, undefined);
        assert.strictEqual(items[1].id, undefined);
      });
      QUnit.test('Nested items should be rendered correctly', function(assert) {
        var treeView = initTree({items: [{
            text: 'Item 1',
            items: [{text: 'Nested item 1'}, {text: 'Nested item 2'}]
          }, {text: 'Item 2'}]}).dxTreeView('instance');
        $(treeView.$element()).find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).trigger('dxclick');
        assert.equal(treeView.$element().find('.' + internals.ITEM_CLASS).length, 4);
      });
      QUnit.test('onItemSelectionChanged event should work correctly', function(assert) {
        var onItemSelectionChanged = sinon.spy(commonUtils.noop);
        var treeView = initTree({
          items: [{text: 'Item 1'}, {text: 'Item 2'}],
          showCheckBoxesMode: 'normal',
          onItemSelectionChanged: onItemSelectionChanged
        }).dxTreeView('instance');
        $(treeView.$element()).find('.dx-checkbox').eq(0).trigger('dxclick');
        var args = onItemSelectionChanged.getCall(0).args[0];
        assert.strictEqual(args.itemData.id, undefined);
        assert.equal(args.node.key, 1);
      });
      QUnit.test('Parent should be updated correctly', function(assert) {
        var treeView = initTree({
          items: [{
            text: 'Item 1',
            expanded: true,
            items: [{text: 'Nested item'}]
          }, {text: 'Item 2'}],
          showCheckBoxesMode: 'normal'
        }).dxTreeView('instance');
        $(treeView.$element()).find('.dx-checkbox').eq(1).trigger('dxclick');
        assert.ok(treeView.getNodes()[0].selected);
      });
      QUnit.test('selectItem() method', function(assert) {
        var data = [{
          text: 'Item 1',
          expanded: true,
          items: [{text: 'Nested item'}]
        }, {text: 'Item 2'}];
        var treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal'
        }).dxTreeView('instance');
        var item = treeView.$element().find('.' + internals.ITEM_CLASS).eq(1).get(0);
        treeView.selectItem(item);
        var nodes = treeView.getNodes();
        var items = treeView.option('items');
        assert.ok(nodes[0].selected);
        assert.ok(nodes[0].items[0].selected);
        assert.ok(!nodes[1].selected);
        assert.ok(items[0].selected);
        assert.ok(items[0].items[0].selected);
        assert.ok(!items[1].selected);
        assert.ok(treeView.$element().find('.dx-checkbox').eq(0).dxCheckBox('instance').option('value'));
        assert.ok(treeView.$element().find('.dx-checkbox').eq(1).dxCheckBox('instance').option('value'));
        assert.ok(!treeView.$element().find('.dx-checkbox').eq(2).dxCheckBox('instance').option('value'));
      });
      QUnit.test('unselectItem() method', function(assert) {
        var data = [{
          text: 'Item 1',
          expanded: true,
          items: [{
            text: 'Nested item',
            selected: true
          }]
        }, {text: 'Item 2'}];
        var treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal'
        }).dxTreeView('instance');
        var item = treeView.$element().find('.' + internals.ITEM_CLASS).eq(1).get(0);
        treeView.unselectItem(item);
        var nodes = treeView.getNodes();
        var items = treeView.option('items');
        assert.ok(!nodes[0].selected);
        assert.ok(!nodes[0].items[0].selected);
        assert.ok(!nodes[1].selected);
        assert.ok(!items[0].selected);
        assert.ok(!items[0].items[0].selected);
        assert.ok(!items[1].selected);
        assert.ok(!treeView.$element().find('.dx-checkbox').eq(0).dxCheckBox('instance').option('value'));
        assert.ok(!treeView.$element().find('.dx-checkbox').eq(1).dxCheckBox('instance').option('value'));
        assert.ok(!treeView.$element().find('.dx-checkbox').eq(2).dxCheckBox('instance').option('value'));
      });
      QUnit.test('expandItem() method', function(assert) {
        var data = [{
          text: 'Item 1',
          items: [{text: 'Nested item'}]
        }, {text: 'Item 2'}];
        var treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal'
        }).dxTreeView('instance');
        var item = treeView.$element().find('.' + internals.ITEM_CLASS).eq(0).get(0);
        treeView.expandItem(item);
        var nodes = treeView.getNodes();
        var items = treeView.option('items');
        assert.ok(nodes[0].expanded);
        assert.ok(!nodes[1].expanded);
        assert.ok(items[0].expanded);
        assert.ok(!items[1].expanded);
      });
      QUnit.test('expandItem method should not reset item data', function(assert) {
        var $treeView = initTree({
          items: [{
            text: 'Item 1',
            items: [{text: 'Nested item'}]
          }, {text: 'Item 2'}],
          onItemClick: function(e) {
            var el = $(e.itemElement);
            var data = el.data();
            e.component.expandItem(e.itemElement);
            assert.deepEqual(el.data(), data, 'Item data is OK');
          }
        });
        $treeView.find('.' + internals.ITEM_CLASS).eq(0).trigger('dxclick');
      });
      QUnit.test('expandItem should work with item ids and tree dataStructure', function(assert) {
        var items = [{
          text: 'Item 1',
          id: 'item-1',
          items: [{
            text: 'Nested item',
            id: 'item-1-1'
          }]
        }, {
          text: 'Item 2',
          id: 'item-2'
        }];
        var $treeView = initTree({
          items: items,
          dataStructure: 'tree'
        });
        var treeView = $treeView.dxTreeView('instance');
        treeView.expandItem('item-1');
        assert.strictEqual(items[0].expanded, true, 'item was expanded');
      });
      QUnit.test('collapseItem() method', function(assert) {
        var data = [{
          text: 'Item 1',
          expanded: true,
          items: [{text: 'Nested item'}]
        }, {text: 'Item 2'}];
        var treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal'
        }).dxTreeView('instance');
        var item = treeView.$element().find('.' + internals.ITEM_CLASS).eq(0).get(0);
        treeView.collapseItem(item);
        var nodes = treeView.getNodes();
        var items = treeView.option('items');
        assert.ok(!nodes[0].expanded);
        assert.ok(!nodes[1].expanded);
        assert.ok(!items[0].expanded);
        assert.ok(!items[1].expanded);
      });
      QUnit.test('collapseItem method should not reset item data', function(assert) {
        var $treeView = initTree({
          items: [{
            text: 'Item 1',
            items: [{text: 'Nested item'}]
          }, {text: 'Item 2'}],
          onItemClick: function(e) {
            var el = $(e.itemElement);
            var data = el.data();
            e.component.collapseItem(e.itemElement);
            assert.deepEqual(el.data(), data, 'Item data is OK');
          }
        });
        $treeView.find('.' + internals.ITEM_CLASS).eq(0).trigger('dxclick');
      });
      QUnit.test('select all items using select all checkbox', function(assert) {
        var treeView = initTree({
          items: [{
            text: 'Item 1',
            expanded: true,
            items: [{text: 'Nested item'}]
          }, {text: 'Item 2'}],
          showCheckBoxesMode: 'selectAll'
        }).dxTreeView('instance');
        $(treeView._$selectAllItem).trigger('dxclick');
        var nodes = treeView.getNodes();
        var items = treeView.option('items');
        assert.ok(nodes[0].selected);
        assert.ok(nodes[0].items[0].selected);
        assert.ok(nodes[1].selected);
        assert.ok(items[0].selected);
        assert.ok(items[0].items[0].selected);
        assert.ok(items[1].selected);
        $(treeView._$selectAllItem).trigger('dxclick');
        nodes = treeView.getNodes();
        assert.ok(!nodes[0].selected);
        assert.ok(!nodes[0].items[0].selected);
        assert.ok(!nodes[1].selected);
        assert.ok(!items[0].selected);
        assert.ok(!items[0].items[0].selected);
        assert.ok(!items[1].selected);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=usageWithoutKeys.js.map