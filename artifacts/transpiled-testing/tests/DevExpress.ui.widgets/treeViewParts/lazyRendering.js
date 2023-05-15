!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/lazyRendering.js"], ["../../../helpers/TreeViewTestHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/lazyRendering.js", ["../../../helpers/TreeViewTestHelper.js"], function($__export) {
  "use strict";
  var TreeViewTestWrapper,
      createInstance;
  return {
    setters: [function($__m) {
      TreeViewTestWrapper = $__m.default;
    }],
    execute: function() {
      createInstance = function(options) {
        return new TreeViewTestWrapper(options);
      };
      QUnit.module('Lazy rendering');
      QUnit.test('Render treeView with special symbols in id', function(assert) {
        var sampleId = '!/#$%&\'()*+,./:;<=>?@[\\]^`{|}~__';
        var $treeView = initTree({items: [{
            id: sampleId,
            text: 'Item 1'
          }]});
        var $item = $treeView.find('.' + internals.NODE_CLASS);
        var item = $treeView.dxTreeView('option', 'items')[0];
        assert.ok($item.attr('data-item-id').length);
        assert.equal(sampleId, $treeView.dxTreeView('instance')._getNodeByElement($item).id);
        assert.equal(sampleId, item.id);
      });
      QUnit.test('Only root nodes should be rendered by default', function(assert) {
        var $treeView = initTree({items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 3,
              text: 'Item 3'
            }]
          }, {
            id: 2,
            text: 'Item 2'
          }]});
        var items = $treeView.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 2);
      });
      ['!/#$%&\'()"+./:;<=>?@[]^`{|}~\\,', '____2______.jpg', 'E:\\test\\[gsdfgfd]  |  \'[some__file]', '!@#$%^&*()_+', 1, 2.18, Number(3), true, 0, 'Egsdfgfd]\0\r\n\b', '!/#$%' + String.fromCharCode(10) + String.fromCharCode(13) + String.fromCharCode(0), 'سلام دنیا'].forEach(function(testId) {
        QUnit.test(("Nodes expanding should work with special charactes in id - " + testId), function(assert) {
          var treeView = createInstance({
            dataSource: [{
              id: testId,
              text: 'item1',
              selected: false,
              expanded: false
            }, {
              id: testId + 'item1_1',
              parentId: testId,
              text: 'item1_1',
              selected: false,
              expanded: false
            }],
            dataStructure: 'plain',
            rootValue: -1,
            keyExpr: 'id',
            height: 500
          });
          var parentItem = treeView.getElement().find('[aria-level="1"]');
          var childItem = treeView.getElement().find('[aria-level="2"]');
          assert.equal(childItem.length, 0);
          treeView.instance.expandItem(parentItem);
          childItem = treeView.getElement().find('[aria-level="2"]');
          assert.equal(childItem.length, 1);
          assert.equal(treeView.hasInvisibleClass(childItem), false);
        });
        QUnit.test(("Nodes selection should work with special charactes in id - " + testId), function(assert) {
          var treeView = createInstance({
            dataSource: [{
              id: testId,
              text: 'item1',
              selected: false,
              expanded: true
            }, {
              id: testId + 'item1_1',
              parentId: testId,
              text: 'item1_1',
              selected: false,
              expanded: true
            }],
            dataStructure: 'plain',
            rootValue: -1,
            keyExpr: 'id',
            showCheckBoxesMode: 'normal',
            height: 500
          });
          treeView.checkSelectedNodes([]);
          var elem = treeView.getElement().find('[aria-level="1"]');
          treeView.instance.selectItem(elem);
          treeView.checkSelectedNodes([0, 1]);
        });
        QUnit.test(("Search should work with special charactes in the nodes ids - " + testId), function(assert) {
          var treeView = createInstance({
            dataSource: [{
              id: testId,
              text: 'item1',
              selected: false,
              expanded: false
            }, {
              id: testId + 'item1_1',
              parentId: testId,
              text: 'item1_1',
              selected: false,
              expanded: false
            }, {
              id: 'item2',
              text: 'item2',
              selected: false,
              expanded: false
            }],
            dataStructure: 'plain',
            rootValue: -1,
            keyExpr: 'id',
            searchEnabled: true,
            height: 500
          });
          var parentItem = treeView.getElement().find('[aria-label="item1"]');
          var childItem = treeView.getElement().find('[aria-label="item1_1"]');
          var anotherItem = treeView.getElement().find('[aria-label="item2"]');
          assert.equal(parentItem.length, 1);
          assert.equal(childItem.length, 0);
          assert.equal(anotherItem.length, 1);
          treeView.instance.option('searchValue', '1_1');
          parentItem = treeView.getElement().find('[aria-label="item1"]');
          assert.equal(parentItem.length, 1);
          assert.equal(treeView.hasInvisibleClass(parentItem), false);
          childItem = treeView.getElement().find('[aria-label="item1_1"]');
          assert.equal(childItem.length, 1);
          assert.equal(treeView.hasInvisibleClass(childItem), false);
          anotherItem = treeView.getElement().find('[aria-label="item2"]');
          assert.equal(anotherItem.length, 0);
        });
      });
      QUnit.test('Nested item should be rendered after click on toggle visibility icon', function(assert) {
        var $treeView = initTree({items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 3,
              text: 'Item 3'
            }]
          }, {
            id: 2,
            text: 'Item 2'
          }]});
        $treeView.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).trigger('dxclick');
        var items = $treeView.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 3);
      });
      QUnit.test('Nested item should be rendered when expandItem method was called', function(assert) {
        var $treeView = initTree({items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 3,
              text: 'Item 3'
            }]
          }, {
            id: 2,
            text: 'Item 2'
          }]});
        $treeView.dxTreeView('instance').expandItem($treeView.find('.' + internals.ITEM_CLASS).eq(0).get(0));
        var items = $treeView.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 3);
      });
      QUnit.test('Selection should work correctly for nested items', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 3,
              text: 'Item 3'
            }]
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'normal'
        });
        var treeView = $treeView.dxTreeView('instance');
        var firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0).get(0);
        treeView.selectItem(firstItem);
        treeView.expandItem(firstItem);
        var items = $treeView.find('.dx-checkbox-checked');
        assert.equal(items.length, 2);
      });
      QUnit.test('Unselection should work correctly for nested items', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            selected: true,
            items: [{
              id: 3,
              text: 'Item 3',
              selected: true
            }]
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'normal'
        });
        var treeView = $treeView.dxTreeView('instance');
        var firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0).get(0);
        treeView.unselectItem(firstItem);
        treeView.expandItem(firstItem);
        var items = $treeView.find('.dx-checkbox-checked');
        assert.equal(items.length, 0);
      });
      QUnit.test('\'selectAll\' should have correct state on initialization', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            selected: true,
            items: [{
              id: 3,
              text: 'Item 3',
              selected: true
            }]
          }, {
            id: 2,
            text: 'Item 2',
            selected: true
          }],
          showCheckBoxesMode: 'selectAll'
        });
        assert.strictEqual($treeView.find('.dx-treeview-select-all-item').dxCheckBox('instance').option('value'), true);
      });
      QUnit.test('\'selectAll\' should work correctly when nested items are not rendered', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 3,
              text: 'Item 3'
            }]
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'selectAll'
        });
        var $selectAllItem = $treeView.find('.dx-treeview-select-all-item');
        $selectAllItem.trigger('dxclick');
        var items = $treeView.find('.dx-treeview-node-container .dx-checkbox-checked');
        assert.strictEqual($selectAllItem.dxCheckBox('instance').option('value'), true);
        assert.equal(items.length, 2);
      });
      QUnit.test('\'selectAll\' should work correctly when nested items are rendered', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 3,
              text: 'Item 3'
            }]
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'selectAll'
        });
        var $selectAllItem = $treeView.find('.dx-treeview-select-all-item');
        $treeView.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).trigger('dxclick');
        $selectAllItem.trigger('dxclick');
        var items = $treeView.find('.dx-treeview-node-container .dx-checkbox-checked');
        assert.strictEqual($selectAllItem.dxCheckBox('instance').option('value'), true);
        assert.equal(items.length, 3);
      });
      QUnit.test('\'selectAll\' should work correctly when nested items are rendered after click on \'selectAll\' item', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 3,
              text: 'Item 3'
            }]
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'selectAll'
        });
        var $selectAllItem = $treeView.find('.dx-treeview-select-all-item');
        $selectAllItem.trigger('dxclick');
        $treeView.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).trigger('dxclick');
        var items = $treeView.find('.dx-treeview-node-container .dx-checkbox-checked');
        assert.strictEqual($selectAllItem.dxCheckBox('instance').option('value'), true);
        assert.equal(items.length, 3);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../helpers/TreeViewTestHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../helpers/TreeViewTestHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=lazyRendering.js.map